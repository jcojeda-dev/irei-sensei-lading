import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol, nombre')
    .eq('id', user.id)
    .single()

  if (!perfil || perfil.rol !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <header className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-irei-sensei.png" alt="" className="h-9 w-auto" />
          <span className="text-[#c9c2b8] text-sm tracking-widest uppercase">
            Panel admin
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#9a9a9a]">
          <span>{perfil.nombre}</span>
          <form action="/auth/signout" method="post">
            <button className="hover:text-white transition-colors">
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>
      <nav className="border-b border-[#2a2a2a] px-6 flex gap-6 text-sm">
        <Link href="/admin" className="py-3 text-[#c9c2b8] hover:text-white transition-colors">
          Alumnos
        </Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}
