-- =========================================================
-- IREI SENSEI · Esquema Supabase (Postgres)
-- =========================================================

-- Extensión para UUID
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- Rol de aplicación (user / admin) sobre auth.users
-- ---------------------------------------------------------
create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  email text not null,
  whatsapp text,
  rol text not null default 'user' check (rol in ('user','admin')),
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------
-- Usuarios / alumnos (datos de negocio, 1:1 con perfiles)
-- ---------------------------------------------------------
create table public.usuarios (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid unique references public.perfiles(id) on delete set null,
  nombre text not null,
  whatsapp text not null,
  email text,
  plan text check (plan in ('hajimete','tanren','samurai')),
  fecha_inicio date,
  fecha_vencimiento date,
  estado_membresia text not null default 'sin_membresia'
    check (estado_membresia in ('activa','por_vencer','vencida','sin_membresia')),
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index idx_usuarios_vencimiento on public.usuarios(fecha_vencimiento);
create index idx_usuarios_whatsapp on public.usuarios(whatsapp);

-- ---------------------------------------------------------
-- Evaluaciones corporales
-- ---------------------------------------------------------
create table public.evaluaciones (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  fecha date not null default current_date,
  peso_kg numeric(5,2),
  porcentaje_grasa numeric(4,2),
  medidas jsonb,          -- {"cintura":80,"pecho":95,...}
  objetivo text,          -- ej. "bajar grasa", "ganar músculo"
  notas text,
  creado_en timestamptz not null default now()
);

create index idx_evaluaciones_usuario on public.evaluaciones(usuario_id, fecha desc);

-- ---------------------------------------------------------
-- Programas alimenticios generados (mensuales)
-- ---------------------------------------------------------
create table public.programas_alimenticios (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  mes date not null,               -- primer día del mes que corresponde
  contenido jsonb,                 -- plan estructurado generado por el agente
  pdf_url text,                    -- ruta en Supabase Storage
  generado_en timestamptz not null default now(),
  unique (usuario_id, mes)
);

-- ---------------------------------------------------------
-- Avance / evolución del entrenamiento
-- ---------------------------------------------------------
create table public.avance_entrenamiento (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  fecha date not null default current_date,
  sesion_notas text,
  metricas jsonb,          -- {"series":..., "peso_levantado":...}
  fotos_url text[],        -- rutas en Storage
  creado_en timestamptz not null default now()
);

create index idx_avance_usuario on public.avance_entrenamiento(usuario_id, fecha desc);

-- ---------------------------------------------------------
-- Registro de recordatorios enviados (evita duplicados)
-- ---------------------------------------------------------
create table public.recordatorios_enviados (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  tipo text not null check (tipo in ('recordatorio_15','recordatorio_5','plan_enviado')),
  fecha_envio timestamptz not null default now(),
  unique (usuario_id, tipo, fecha_envio)
);

-- =========================================================
-- ROW LEVEL SECURITY (obligatorio: cada usuario solo ve lo suyo)
-- =========================================================
alter table public.perfiles enable row level security;
alter table public.usuarios enable row level security;
alter table public.evaluaciones enable row level security;
alter table public.programas_alimenticios enable row level security;
alter table public.avance_entrenamiento enable row level security;
alter table public.recordatorios_enviados enable row level security;

-- Helper: ¿el usuario autenticado es admin?
create or replace function public.es_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.perfiles
    where id = auth.uid() and rol = 'admin'
  );
$$;

-- perfiles: cada quien ve/edita su propio perfil; admin ve todos
create policy "perfil propio" on public.perfiles
  for select using (id = auth.uid() or public.es_admin());
create policy "perfil propio update" on public.perfiles
  for update using (id = auth.uid() or public.es_admin());

-- usuarios: el alumno ve su propia fila (vía perfil_id); admin ve/edita todo
create policy "usuario ve su fila" on public.usuarios
  for select using (perfil_id = auth.uid() or public.es_admin());
create policy "admin gestiona usuarios" on public.usuarios
  for all using (public.es_admin());

-- evaluaciones / programas / avance / recordatorios: solo dueño o admin
create policy "evaluaciones propias" on public.evaluaciones
  for select using (
    usuario_id in (select id from public.usuarios where perfil_id = auth.uid())
    or public.es_admin()
  );
create policy "admin gestiona evaluaciones" on public.evaluaciones
  for all using (public.es_admin());

create policy "programas propios" on public.programas_alimenticios
  for select using (
    usuario_id in (select id from public.usuarios where perfil_id = auth.uid())
    or public.es_admin()
  );
create policy "admin gestiona programas" on public.programas_alimenticios
  for all using (public.es_admin());

create policy "avance propio" on public.avance_entrenamiento
  for select using (
    usuario_id in (select id from public.usuarios where perfil_id = auth.uid())
    or public.es_admin()
  );
create policy "admin gestiona avance" on public.avance_entrenamiento
  for all using (public.es_admin());

create policy "recordatorios solo admin" on public.recordatorios_enviados
  for all using (public.es_admin());

-- =========================================================
-- Trigger: actualizar estado_membresia y timestamp automáticamente
-- =========================================================
create or replace function public.actualizar_estado_membresia()
returns trigger language plpgsql as $$
begin
  new.actualizado_en := now();
  if new.fecha_vencimiento is null then
    new.estado_membresia := 'sin_membresia';
  elsif new.fecha_vencimiento < current_date then
    new.estado_membresia := 'vencida';
  elsif new.fecha_vencimiento <= current_date + interval '15 days' then
    new.estado_membresia := 'por_vencer';
  else
    new.estado_membresia := 'activa';
  end if;
  return new;
end;
$$;

create trigger trg_estado_membresia
  before insert or update of fecha_vencimiento on public.usuarios
  for each row execute function public.actualizar_estado_membresia();
