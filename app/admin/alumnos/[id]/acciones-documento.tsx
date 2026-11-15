'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { eliminarDocumento, avisarPorWhatsapp } from './actions'

export default function AccionesDocumento({
  usuarioId,
  documentoId,
  puedeAvisar,
}: {
  usuarioId: string
  documentoId: string
  puedeAvisar: boolean
}) {
  const router = useRouter()
  const [ocupado, setOcupado] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function borrar() {
    if (!window.confirm('¿Eliminar este documento? Esta acción no se puede deshacer.')) return
    setOcupado(true)
    const r = await eliminarDocumento(usuarioId, documentoId)
    setOcupado(false)
    if (r.ok) router.refresh()
    else setMensaje(r.error)
  }

  async function avisar() {
    if (!window.confirm('¿Enviar al alumno el aviso por WhatsApp de que su plan está listo?')) return
    setOcupado(true)
    const r = await avisarPorWhatsapp(usuarioId)
    setOcupado(false)
    setMensaje(r.ok ? 'Aviso enviado por WhatsApp' : r.error)
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      {puedeAvisar && (
        <button
          onClick={avisar}
          disabled={ocupado}
          className="bg-[#2a2a2a] hover:bg-[#333] disabled:opacity-50 rounded px-3 py-1"
        >
          Avisar por WhatsApp
        </button>
      )}
      <button
        onClick={borrar}
        disabled={ocupado}
        className="text-[#e07a7a] hover:underline disabled:opacity-50"
      >
        Eliminar
      </button>
      {mensaje && <span className="text-[#9a9a9a]">{mensaje}</span>}
    </div>
  )
}
