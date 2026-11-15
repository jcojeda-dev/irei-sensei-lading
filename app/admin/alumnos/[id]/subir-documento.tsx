'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { prepararSubida, confirmarSubida } from './actions'

const BUCKET = 'documentos-alumnos'
const MAX_BYTES = 10 * 1024 * 1024

const TIPOS = [
  { valor: 'dieta', etiqueta: 'Dieta (actual)' },
  { valor: 'rutina', etiqueta: 'Rutina (actual)' },
  { valor: 'historial_dieta', etiqueta: 'Historial: dieta anterior' },
  { valor: 'historial_rutina', etiqueta: 'Historial: rutina anterior' },
  { valor: 'otro', etiqueta: 'Otro documento' },
]

export default function SubirDocumento({ usuarioId }: { usuarioId: string }) {
  const router = useRouter()
  const [tipo, setTipo] = useState('dieta')
  const [titulo, setTitulo] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(null)

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMensaje(null)

    if (!archivo) return setMensaje({ ok: false, texto: 'Elige un archivo PDF.' })
    if (archivo.type !== 'application/pdf') {
      return setMensaje({ ok: false, texto: 'Solo se permiten archivos PDF.' })
    }
    if (archivo.size > MAX_BYTES) {
      return setMensaje({ ok: false, texto: 'El archivo supera los 10 MB.' })
    }
    if (titulo.trim().length < 1) {
      return setMensaje({ ok: false, texto: 'Escribe un título.' })
    }

    setSubiendo(true)
    try {
      const prep = await prepararSubida(usuarioId)
      if (!prep.ok) throw new Error(prep.error)

      // El archivo va directo a Supabase Storage (evita el límite de tamaño de Vercel).
      const supabase = createClient()
      const { error } = await supabase.storage
        .from(BUCKET)
        .uploadToSignedUrl(prep.path, prep.token, archivo, {
          contentType: 'application/pdf',
        })
      if (error) throw new Error('No se pudo subir el archivo')

      const conf = await confirmarSubida(usuarioId, prep.path, tipo, titulo)
      if (!conf.ok) throw new Error(conf.error)

      setMensaje({ ok: true, texto: 'Documento subido correctamente.' })
      setTitulo('')
      setArchivo(null)
      ;(e.target as HTMLFormElement).reset()
      router.refresh()
    } catch (err) {
      setMensaje({
        ok: false,
        texto: err instanceof Error ? err.message : 'Error al subir el documento',
      })
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <form onSubmit={enviar} className="border border-[#2a2a2a] rounded-lg p-4 space-y-3">
      <h2 className="text-sm text-[#9a9a9a] uppercase tracking-wide">Subir documento</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="block text-[#9a9a9a] mb-1">Tipo</span>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-3 py-2"
          >
            {TIPOS.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.etiqueta}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="block text-[#9a9a9a] mb-1">Título</span>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={120}
            placeholder="Ej. Dieta de definición - octubre"
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-3 py-2"
          />
        </label>
      </div>

      <label className="text-sm block">
        <span className="block text-[#9a9a9a] mb-1">Archivo PDF (máx. 10 MB)</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          disabled={subiendo}
          className="bg-[#a3272a] hover:bg-[#8c2124] disabled:opacity-50 text-white
                     text-sm font-medium rounded px-4 py-2 transition-colors"
        >
          {subiendo ? 'Subiendo…' : 'Subir'}
        </button>
        {mensaje && (
          <span className={`text-sm ${mensaje.ok ? 'text-[#7fd99a]' : 'text-[#e07a7a]'}`}>
            {mensaje.texto}
          </span>
        )}
      </div>
    </form>
  )
}
