'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegistroPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState(false)

  async function registrarConEmail(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nombre },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(
        error.message.includes('already registered')
          ? 'Ese correo ya tiene una cuenta. Intenta iniciar sesión.'
          : 'No se pudo crear la cuenta. Intenta de nuevo.'
      )
      setCargando(false)
      return
    }

    setListo(true)
    setCargando(false)
  }

  async function registrarConProveedor(proveedor: 'google' | 'facebook') {
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: proveedor,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  if (listo) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-6">
        <div className="w-full max-w-sm text-center">
          <img
            src="/logo-irei-sensei.png"
            alt="Irei Sensei"
            className="h-20 w-auto mx-auto mb-6"
          />
          <p className="text-white text-lg mb-2">Revisa tu correo</p>
          <p className="text-[#9a9a9a] text-sm">
            Te enviamos un enlace para confirmar tu cuenta. Una vez
            confirmado, podrás iniciar sesión.
          </p>
        </div>
      </main>
    )
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
            Crear cuenta
          </p>
        </div>

        <form onSubmit={registrarConEmail} className="space-y-4">
          <div>
            <label className="block text-[#c9c2b8] text-sm mb-1.5" htmlFor="nombre">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white
                         rounded px-3 py-2.5 focus:outline-none focus:border-[#a3272a]
                         transition-colors"
              placeholder="Tu nombre"
            />
          </div>

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
            <p className="text-[#6b6b6b] text-xs mt-1">
              Usa el mismo correo que le diste a tu entrenador.
            </p>
          </div>

          <div>
            <label className="block text-[#c9c2b8] text-sm mb-1.5" htmlFor="password">
              Contraseña
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
            disabled={cargando}
            className="w-full bg-[#a3272a] hover:bg-[#8c2124] disabled:opacity-50
                       text-white font-medium rounded px-3 py-2.5 transition-colors"
          >
            {cargando ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-[#3a3a3a]" />
          <span className="text-[#6b6b6b] text-xs uppercase">o continúa con</span>
          <div className="h-px flex-1 bg-[#3a3a3a]" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => registrarConProveedor('google')}
            className="w-full bg-white hover:bg-[#f2f2f2] text-[#1a1a1a] font-medium
                       rounded px-3 py-2.5 transition-colors"
          >
            Continuar con Google
          </button>
          <button
            onClick={() => registrarConProveedor('facebook')}
            className="w-full bg-[#1877F2] hover:bg-[#1665d8] text-white font-medium
                       rounded px-3 py-2.5 transition-colors"
          >
            Continuar con Facebook
          </button>
        </div>

        <p className="text-center text-[#6b6b6b] text-sm mt-8">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-[#c9c2b8] hover:text-white underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  )
}
