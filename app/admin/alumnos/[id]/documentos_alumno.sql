-- =========================================================
-- Carpeta de documentos por alumno (dietas, rutinas, historial).
-- Ejecutar en Supabase → SQL Editor.
--
-- Seguridad:
--   * Bucket PRIVADO, solo PDF, máximo 10 MB.
--   * Sin políticas en storage.objects: nadie con la clave pública puede
--     leer ni escribir directo. Los archivos se suben con URLs firmadas que
--     solo emite el servidor a un admin, y se descargan con enlaces
--     temporales que solo emite el servidor tras revisar la propiedad.
--   * La tabla tiene RLS: el alumno solo ve sus propias filas.
-- =========================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documentos-alumnos', 'documentos-alumnos', false, 10485760, array['application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = 10485760,
      allowed_mime_types = array['application/pdf'];

create table if not exists public.documentos_alumno (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  tipo text not null check (tipo in ('dieta','rutina','historial_dieta','historial_rutina','otro')),
  titulo text not null check (char_length(titulo) between 1 and 120),
  ruta text not null unique,        -- {usuario_id}/{uuid}.pdf, generada por el servidor
  tamano_bytes integer not null check (tamano_bytes > 0),
  resumen_ia text,                  -- fase siguiente: resumen que la IA usa como contexto
  subido_por uuid references public.perfiles(id) on delete set null,
  creado_en timestamptz not null default now()
);

create index if not exists idx_documentos_alumno_usuario
  on public.documentos_alumno (usuario_id, creado_en desc);

alter table public.documentos_alumno enable row level security;

create policy "alumno ve sus documentos" on public.documentos_alumno
  for select using (
    usuario_id in (select id from public.usuarios where perfil_id = auth.uid())
    or public.es_admin()
  );

create policy "admin gestiona documentos" on public.documentos_alumno
  for all using (public.es_admin());
