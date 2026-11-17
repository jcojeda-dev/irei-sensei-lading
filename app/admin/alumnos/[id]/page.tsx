import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { UUID_RE } from '@/lib/admin-guard'
import SubirDocumento from './subir-documento'
import AccionesDocumento from './acciones-documento'
import ProgresoAlumno from '@/components/progreso/ProgresoAlumno'
import { normalizarMediciones } from '@/lib/progreso'

export const dynamic = 'force-dynamic'

const BUCKET = 'documentos-alumnos'

const ETIQUETA_TIPO: Record<string, string> = {
  dieta: 'Dieta',
  rutina: 'Rutina',
  historial_dieta: 'Historial · dieta',
  historial_rutina: 'Historial · rutina',
  otro: 'Otro',
}

function formatearTamano(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default async function AlumnoPage({ params }: { params: { id: string } }) {
  if (!UUID_RE.test(params.id)) notFound()

  // Protegida por el chequeo de rol admin del layout de /admin.
  const admin = createAdminClient()

  const { data: alumno } = await admin
    .from('usuarios')
    .select('id, nombre, whatsapp, plan, fecha_vencimiento, estado_membresia')
    .eq('id', params.id)
    .maybeSingle()
  if (!alumno) notFound()

  const { data: historial } = await admin
    .from('evaluaciones')
    .select('fecha, peso_kg, porcentaje_grasa, objetivo')
    .eq('usuario_id', alumno.id)
    .order('fecha', { ascending: true })
    .limit(500)
  const mediciones = normalizarMediciones(historial)
  const objetivo = [...(historial ?? [])].reverse().find((h) => h.objetivo)?.objetivo ?? null

  const { data: documentos } = await admin
    .from('documentos_alumno')
    .select('id, tipo, titulo, ruta, tamano_bytes, creado_en')
    .eq('usuario_id', alumno.id)
    .order('creado_en', { ascending: false })

  // Enlaces temporales (10 minutos) solo para esta vista del admin.
  const enlaces: Record<string, string> = {}
  if (documentos && documentos.length > 0) {
    const { data: firmados } = await admin.storage
      .from(BUCKET)
      .createSignedUrls(documentos.map((d) => d.ruta), 600)
    firmados?.forEach((f) => {
      if (f.path && f.signedUrl) enlaces[f.path] = f.signedUrl
    })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/admin" className="text-sm text-[#9a9a9a] hover:text-white">
          ← Volver a alumnos
        </Link>
        <h1 className="text-2xl font-medium mt-2">{alumno.nombre}</h1>
        <p className="text-sm text-[#9a9a9a]">
          +{alumno.whatsapp} · Plan {alumno.plan ?? '—'} · Vence{' '}
          {alumno.fecha_vencimiento ?? '—'}
        </p>
      </div>

      <div>
        <h2 className="text-sm text-[#9a9a9a] uppercase tracking-wide mb-3">Progreso</h2>
        <ProgresoAlumno mediciones={mediciones} objetivo={objetivo} />
      </div>

      <SubirDocumento usuarioId={alumno.id} />

      <div>
        <h2 className="text-sm text-[#9a9a9a] uppercase tracking-wide mb-3">
          Carpeta del alumno
        </h2>
        {!documentos || documentos.length === 0 ? (
          <p className="text-[#9a9a9a] text-sm">Todavía no hay documentos.</p>
        ) : (
          <ul className="border border-[#2a2a2a] rounded-lg divide-y divide-[#2a2a2a]">
            {documentos.map((d) => (
              <li key={d.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm">{d.titulo}</p>
                    <p className="text-xs text-[#9a9a9a]">
                      {ETIQUETA_TIPO[d.tipo] ?? d.tipo} ·{' '}
                      {new Date(d.creado_en).toLocaleDateString('es-PE', {
                        timeZone: 'America/Lima',
                      })}{' '}
                      · {formatearTamano(d.tamano_bytes)}
                    </p>
                  </div>
                  {enlaces[d.ruta] && (
                    <a
                      href={enlaces[d.ruta]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline text-[#c9c2b8] hover:text-white shrink-0"
                    >
                      Abrir PDF
                    </a>
                  )}
                </div>
                <AccionesDocumento
                  usuarioId={alumno.id}
                  documentoId={d.id}
                  puedeAvisar={d.tipo === 'dieta'}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
