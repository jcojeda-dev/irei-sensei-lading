import { createAdminClient } from '@/lib/supabase/admin'
import { marcarAtendida } from './actions'

export const dynamic = 'force-dynamic'

type Conversacion = {
  id: string
  whatsapp: string
  mensaje_alumno: string
  respuesta_ia: string
  derivar: boolean
  atendida: boolean
  creado_en: string
  usuarios: { nombre: string } | null
}

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default async function ConversacionesPage() {
  // Protegida por el chequeo de rol admin del layout.
  const supabase = createAdminClient()

  const { data } = await supabase
    .from('conversaciones')
    .select(
      'id, whatsapp, mensaje_alumno, respuesta_ia, derivar, atendida, creado_en, usuarios(nombre)'
    )
    .order('creado_en', { ascending: false })
    .limit(100)

  const conversaciones = (data ?? []) as unknown as Conversacion[]
  const pendientes = conversaciones.filter((c) => c.derivar && !c.atendida)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Conversaciones</h1>
        {pendientes.length > 0 && (
          <span className="px-3 py-1 rounded text-xs bg-[#4d3d1f] text-[#e0b96a]">
            {pendientes.length} por atender
          </span>
        )}
      </div>

      {conversaciones.length === 0 ? (
        <p className="text-[#9a9a9a]">
          Todavía no hay conversaciones. Aparecerán cuando un alumno escriba al
          WhatsApp del negocio.
        </p>
      ) : (
        <div className="space-y-3">
          {conversaciones.map((c) => (
            <div
              key={c.id}
              className={`border rounded-lg p-4 ${
                c.derivar && !c.atendida
                  ? 'border-[#e0b96a]'
                  : 'border-[#2a2a2a]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#9a9a9a] mb-3">
                <span>
                  <span className="text-white text-sm">
                    {c.usuarios?.nombre ?? 'Número no registrado'}
                  </span>{' '}
                  · +{c.whatsapp}
                </span>
                <span>{formatearFecha(c.creado_en)}</span>
              </div>

              <p className="text-sm mb-2">
                <span className="text-[#9a9a9a]">Alumno: </span>
                {c.mensaje_alumno}
              </p>
              <p className="text-sm text-[#c9c2b8]">
                <span className="text-[#9a9a9a]">IA: </span>
                {c.respuesta_ia}
              </p>

              {c.derivar && (
                <div className="mt-3 flex items-center gap-3">
                  {c.atendida ? (
                    <span className="px-2 py-1 rounded text-xs bg-[#1f4d2e] text-[#7fd99a]">
                      Atendida
                    </span>
                  ) : (
                    <>
                      <span className="px-2 py-1 rounded text-xs bg-[#4d3d1f] text-[#e0b96a]">
                        Derivada a Isamu
                      </span>
                      <form action={marcarAtendida}>
                        <input type="hidden" name="id" value={c.id} />
                        <button className="text-xs text-[#9a9a9a] hover:text-white underline">
                          Marcar como atendida
                        </button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
