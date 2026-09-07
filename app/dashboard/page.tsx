import { createClient } from '@/lib/supabase/server'

const ESTILO_ESTADO: Record<string, string> = {
  activa: 'bg-[#1f4d2e] text-[#7fd99a]',
  por_vencer: 'bg-[#4d3d1f] text-[#e0b96a]',
  vencida: 'bg-[#4d1f1f] text-[#e07a7a]',
  sin_membresia: 'bg-[#2a2a2a] text-[#9a9a9a]',
}

const ETIQUETA_ESTADO: Record<string, string> = {
  activa: 'Membresía activa',
  por_vencer: 'Tu membresía está por vencer',
  vencida: 'Tu membresía venció',
  sin_membresia: 'Aún no tienes una membresía',
}

const ETIQUETA_PLAN: Record<string, string> = {
  hajimete: 'Hajimete',
  tanren: 'Tanren',
  samurai: 'Samurai',
}

function Tarjeta({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#2a2a2a] rounded-lg p-5 mb-4">
      <h2 className="text-sm text-[#9a9a9a] uppercase tracking-wide mb-3">{titulo}</h2>
      {children}
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('id, nombre, plan, fecha_vencimiento, estado_membresia')
    .eq('perfil_id', user!.id)
    .single()

  if (!usuario) {
    return (
      <p className="text-[#9a9a9a]">
        Todavía no tienes datos cargados. Habla con tu entrenador para que te
        registre en el sistema.
      </p>
    )
  }

  const { data: evaluacion } = await supabase
    .from('evaluaciones')
    .select('*')
    .eq('usuario_id', usuario.id)
    .order('fecha', { ascending: false })
    .limit(1)
    .maybeSingle()

  const mesActual = new Date().toISOString().slice(0, 7) + '-01'
  const { data: programa } = await supabase
    .from('programas_alimenticios')
    .select('pdf_url, mes')
    .eq('usuario_id', usuario.id)
    .eq('mes', mesActual)
    .maybeSingle()

  const { data: avances } = await supabase
    .from('avance_entrenamiento')
    .select('fecha, sesion_notas, metricas')
    .eq('usuario_id', usuario.id)
    .order('fecha', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-2xl font-medium mb-1">Hola, {usuario.nombre}</h1>
      <p className="text-[#9a9a9a] mb-6">
        Plan {ETIQUETA_PLAN[usuario.plan ?? ''] ?? '—'}
      </p>

      <Tarjeta titulo="Membresía">
        <span
          className={`inline-block px-3 py-1 rounded text-sm ${
            ESTILO_ESTADO[usuario.estado_membresia] ?? ESTILO_ESTADO.sin_membresia
          }`}
        >
          {ETIQUETA_ESTADO[usuario.estado_membresia] ?? usuario.estado_membresia}
        </span>
        {usuario.fecha_vencimiento && (
          <p className="text-[#9a9a9a] text-sm mt-2">
            Vence el {usuario.fecha_vencimiento}
          </p>
        )}
      </Tarjeta>

      <Tarjeta titulo="Tu evaluación">
        {evaluacion ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-[#9a9a9a]">Peso: </span>
              {evaluacion.peso_kg ?? '—'} kg
            </div>
            <div>
              <span className="text-[#9a9a9a]">% grasa: </span>
              {evaluacion.porcentaje_grasa ?? '—'}%
            </div>
            <div className="col-span-2">
              <span className="text-[#9a9a9a]">Objetivo: </span>
              {evaluacion.objetivo ?? '—'}
            </div>
          </div>
        ) : (
          <p className="text-[#9a9a9a] text-sm">Todavía no tienes una evaluación registrada.</p>
        )}
      </Tarjeta>

      <Tarjeta titulo="Programa alimenticio del mes">
        {programa?.pdf_url ? (
          <a
            href={programa.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#a3272a] hover:bg-[#8c2124] text-white
                       text-sm font-medium rounded px-4 py-2 transition-colors"
          >
            Descargar PDF
          </a>
        ) : (
          <p className="text-[#9a9a9a] text-sm">
            Tu plan de este mes aún no está listo. Tu entrenador te avisará
            por WhatsApp en cuanto lo esté.
          </p>
        )}
      </Tarjeta>

      <Tarjeta titulo="Avance de entrenamiento">
        {avances && avances.length > 0 ? (
          <ul className="space-y-3 text-sm">
            {avances.map((a, i) => (
              <li key={i} className="border-t border-[#2a2a2a] pt-3 first:border-0 first:pt-0">
                <span className="text-[#9a9a9a]">{a.fecha}</span>
                {a.sesion_notas && <p className="mt-1">{a.sesion_notas}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#9a9a9a] text-sm">Todavía no hay registros de avance.</p>
        )}
      </Tarjeta>
    </div>
  )
}
