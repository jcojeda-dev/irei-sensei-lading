import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
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
    .select('nombre')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <header className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-irei-sensei.png" alt="" className="h-9 w-auto" />
          <span className="text-[#c9c2b8] text-sm tracking-widest uppercase">
            Mi panel
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#9a9a9a]">
          <span>{perfil?.nombre ?? user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="hover:text-white transition-colors">
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>
      <main className="p-6 max-w-3xl mx-auto">{children}</main>
    </div>
  )
}
