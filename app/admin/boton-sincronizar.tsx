'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BotonSincronizar() {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function sincronizar() {
    setCargando(true)
    setMensaje(null)
    try {
      const res = await fetch('/api/admin/sync-sheet', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error al sincronizar')
      setMensaje(`Sincronizados: ${data.procesadas}. Errores: ${data.errores?.length ?? 0}`)
      router.refresh()
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : 'Error al sincronizar')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {mensaje && <span className="text-sm text-[#9a9a9a]">{mensaje}</span>}
      <button
        onClick={sincronizar}
        disabled={cargando}
        className="bg-[#a3272a] hover:bg-[#8c2124] disabled:opacity-50
                   text-white text-sm font-medium rounded px-4 py-2 transition-colors"
      >
        {cargando ? 'Sincronizando…' : 'Sincronizar Sheet'}
      </button>
    </div>
  )
}
