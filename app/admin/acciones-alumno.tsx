'use client'

import { useState } from 'react'

export default function AccionesAlumno({ usuarioId }: { usuarioId: string }) {
  const [cargando, setCargando] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function llamar(accion: 'generar-plan' | 'generar-pdf') {
    setCargando(accion)
    setMensaje(null)
    try {
      const res = await fetch(`/api/admin/${accion}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: usuarioId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error')
      setMensaje(accion === 'generar-pdf' ? 'PDF generado' : 'Plan generado')
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : 'Error')
    } finally {
      setCargando(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => llamar('generar-plan')}
        disabled={cargando !== null}
        className="text-xs bg-[#2a2a2a] hover:bg-[#3a3a3a] disabled:opacity-50
                   text-[#c9c2b8] rounded px-3 py-1.5 transition-colors"
      >
        {cargando === 'generar-plan' ? 'Generando…' : 'Generar plan'}
      </button>
      <button
        onClick={() => llamar('generar-pdf')}
        disabled={cargando !== null}
        className="text-xs bg-[#2a2a2a] hover:bg-[#3a3a3a] disabled:opacity-50
                   text-[#c9c2b8] rounded px-3 py-1.5 transition-colors"
      >
        {cargando === 'generar-pdf' ? 'Generando…' : 'Generar PDF'}
      </button>
      {mensaje && <span className="text-xs text-[#9a9a9a]">{mensaje}</span>}
    </div>
  )
}
