import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const BUCKET = 'documentos-alumnos'

const ETIQUETA_TIPO: Record<string, string> = {
  dieta: 'Dieta',
  rutina: 'Rutina',
  historial_dieta: 'Dieta anterior',
  historial_rutina: 'Rutina anterior',
  otro: 'Documento',
}

/**
 * La lista sale de una consulta con la sesión del alumno (RLS): solo puede
 * ver sus propias filas. Con esas rutas ya verificadas, el servidor genera
 * enlaces temporales (10 minutos) de un bucket privado.
 */
export default async function MisDocumentos({ usuarioId }: { usuarioId: string }) {
  const supabase = await createClient()
  const { data: documentos } = await supabase
    .from('documentos_alumno')
    .select('id, tipo, titulo, ruta, creado_en')
    .eq('usuario_id', usuarioId)
    .order('creado_en', { ascending: false })

  if (!documentos || documentos.length === 0) {
    return (
      <p className="text-[#9a9a9a] text-sm">
        Todavía no hay documentos en tu carpeta. Tu entrenador subirá aquí tu
        dieta y tu rutina.
      </p>
    )
  }

  const admin = createAdminClient()
  const { data: firmados } = await admin.storage
    .from(BUCKET)
    .createSignedUrls(documentos.map((d) => d.ruta), 600)
  const enlaces: Record<string, string> = {}
  firmados?.forEach((f) => {
    if (f.path && f.signedUrl) enlaces[f.path] = f.signedUrl
  })

  return (
    <ul className="space-y-3 text-sm">
      {documentos.map((d) => (
        <li
          key={d.id}
          className="flex items-center justify-between gap-3 border-t border-[#2a2a2a] pt-3 first:border-0 first:pt-0"
        >
          <div>
            <p>{d.titulo}</p>
            <p className="text-xs text-[#9a9a9a]">
              {ETIQUETA_TIPO[d.tipo] ?? d.tipo} ·{' '}
              {new Date(d.creado_en).toLocaleDateString('es-PE', {
                timeZone: 'America/Lima',
              })}
            </p>
          </div>
          {enlaces[d.ruta] && (
            <a
              href={enlaces[d.ruta]}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-[#a3272a] hover:bg-[#8c2124] text-white text-xs
                         font-medium rounded px-3 py-2 transition-colors"
            >
              Descargar
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
