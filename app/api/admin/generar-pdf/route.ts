import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { llamarMcp } from '../_mcp'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: perfil } = await supabase
    .from('perfiles').select('rol').eq('id', user.id).single()
  if (perfil?.rol !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { usuario_id } = await request.json()
  if (!usuario_id) {
    return NextResponse.json({ error: 'Falta usuario_id' }, { status: 400 })
  }

  try {
    const resultado = await llamarMcp('generar_pdf_plan', { usuario_id })
    return NextResponse.json(resultado)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
