import { createAdminClient } from '@/lib/supabase/admin'
import AccionesAlumno from './acciones-alumno'
import BotonSincronizar from './boton-sincronizar'

const ESTILO_ESTADO: Record<string, string> = {
  activa: 'bg-[#1f4d2e] text-[#7fd99a]',
  por_vencer: 'bg-[#4d3d1f] text-[#e0b96a]',
  vencida: 'bg-[#4d1f1f] text-[#e07a7a]',
  sin_membresia: 'bg-[#2a2a2a] text-[#9a9a9a]',
}

const ETIQUETA_ESTADO: Record<string, string> = {
  activa: 'Activa',
  por_vencer: 'Por vencer',
  vencida: 'Vencida',
  sin_membresia: 'Sin membresía',
}

export default async function AdminPage() {
  // Esta página ya está protegida por el chequeo de rol admin en el
  // layout, así que usamos el cliente con service role (se salta RLS)
  // en vez de depender de las políticas de RLS aquí.
  const supabase = createAdminClient()

  const { data: usuarios } = await supabase
    .from('usuarios')
    .select('id, nombre, whatsapp, plan, fecha_vencimiento, estado_membresia')
    .order('nombre')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Alumnos</h1>
        <BotonSincronizar />
      </div>

      {!usuarios || usuarios.length === 0 ? (
        <p className="text-[#9a9a9a]">
          Todavía no hay alumnos. Sincroniza el Google Sheet para cargarlos.
        </p>
      ) : (
        <div className="border border-[#2a2a2a] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#161616] text-left text-[#9a9a9a]">
                <th className="px-4 py-3 font-normal">Nombre</th>
                <th className="px-4 py-3 font-normal">WhatsApp</th>
                <th className="px-4 py-3 font-normal">Plan</th>
                <th className="px-4 py-3 font-normal">Vencimiento</th>
                <th className="px-4 py-3 font-normal">Estado</th>
                <th className="px-4 py-3 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-t border-[#2a2a2a]">
                  <td className="px-4 py-3">{u.nombre}</td>
                  <td className="px-4 py-3 text-[#9a9a9a]">{u.whatsapp}</td>
                  <td className="px-4 py-3 text-[#9a9a9a] capitalize">
                    {u.plan ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-[#9a9a9a]">
                    {u.fecha_vencimiento ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        ESTILO_ESTADO[u.estado_membresia] ?? ESTILO_ESTADO.sin_membresia
                      }`}
                    >
                      {ETIQUETA_ESTADO[u.estado_membresia] ?? u.estado_membresia}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AccionesAlumno usuarioId={u.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
