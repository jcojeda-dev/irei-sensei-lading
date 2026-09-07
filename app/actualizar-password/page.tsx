'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ActualizarPasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState(false)
  const [sesionLista, setSesionLista] = useState(false)

  useEffect(() => {
    // El link de recuperación llega con el token en el hash (#access_token=...),
    // no como cookie. Hay que leerlo manualmente y establecer la sesión.
    const hash = window.location.hash.replace(/^#/, '')
    const params = new URLSearchParams(hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ error }) => {
        if (error) {
          setError('El link de recuperación no es válido o ya expiró.')
        } else {
          setSesionLista(true)
        }
      })
    } else {
      setError('Falta el token de recuperación en el link.')
    }
  }, [])

  async function actualizar(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('No se pudo actualizar la contraseña. El link puede haber expirado.')
      setCargando(false)
      return
    }

    setListo(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <img
            src="/logo-irei-sensei.png"
            alt="Irei Sensei"
            className="h-24 w-auto mb-4"
          />
          <p className="text-[#c9c2b8] text-sm tracking-widest uppercase">
            Nueva contraseña
          </p>
        </div>

        {listo ? (
          <p className="text-center text-white">
            Contraseña actualizada. Redirigiendo…
          </p>
        ) : (
          <form onSubmit={actualizar} className="space-y-4">
            <div>
              <label className="block text-[#c9c2b8] text-sm mb-1.5" htmlFor="password">
                Nueva contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white
                           rounded px-3 py-2.5 focus:outline-none focus:border-[#a3272a]
                           transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {error && (
              <p className="text-[#e8746a] text-sm" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={cargando || !sesionLista}
              className="w-full bg-[#a3272a] hover:bg-[#8c2124] disabled:opacity-50
                         text-white font-medium rounded px-3 py-2.5 transition-colors"
            >
              {cargando
                ? 'Actualizando…'
                : sesionLista
                ? 'Actualizar contraseña'
                : 'Verificando link…'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
