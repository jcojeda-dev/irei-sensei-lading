import { createClient } from '@/lib/supabase/server'

/**
 * Las Server Actions son endpoints públicos: no se puede confiar en que el
 * layout ya revisó el rol. Cada acción de administración llama a esto primero.
 */
export async function exigirAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()
  if (!perfil || perfil.rol !== 'admin') throw new Error('No autorizado')

  return user
}

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
