'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function iniciarSesionConEmail(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos.')
      setCargando(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  async function iniciarSesionConProveedor(proveedor: 'google' | 'facebook') {
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: proveedor,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
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
            Personal Training
          </p>
        </div>

        <form onSubmit={iniciarSesionConEmail} className="space-y-4">
          <div>
            <label className="block text-[#c9c2b8] text-sm mb-1.5" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white
                         rounded px-3 py-2.5 focus:outline-none focus:border-[#a3272a]
                         transition-colors"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-[#c9c2b8] text-sm mb-1.5" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white
                         rounded px-3 py-2.5 focus:outline-none focus:border-[#a3272a]
                         transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[#e8746a] text-sm" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#a3272a] hover:bg-[#8c2124] disabled:opacity-50
                       text-white font-medium rounded px-3 py-2.5 transition-colors"
          >
            {cargando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-[#3a3a3a]" />
          <span className="text-[#6b6b6b] text-xs uppercase">o continúa con</span>
          <div className="h-px flex-1 bg-[#3a3a3a]" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => iniciarSesionConProveedor('google')}
            className="w-full bg-white hover:bg-[#f2f2f2] text-[#1a1a1a] font-medium
                       rounded px-3 py-2.5 transition-colors flex items-center
                       justify-center gap-2"
          >
            Continuar con Google
          </button>
          <button
            onClick={() => iniciarSesionConProveedor('facebook')}
            className="w-full bg-[#1877F2] hover:bg-[#1665d8] text-white font-medium
                       rounded px-3 py-2.5 transition-colors flex items-center
                       justify-center gap-2"
          >
            Continuar con Facebook
          </button>
        </div>

        <p className="text-center text-[#6b6b6b] text-sm mt-8">
          ¿No tienes cuenta?{' '}
          <a href="/registro" className="text-[#c9c2b8] hover:text-white underline">
            Regístrate
          </a>
        </p>
      </div>
    </main>
  )
}
