import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { llamarMcp } from '../_mcp'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: perfil } = await supabase
    .from('perfiles').select('rol').eq('id', user.id).single()
  if (perfil?.rol !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  try {
    const resultado = await llamarMcp('sync_sheet_to_db', {})
    return NextResponse.json(resultado)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
