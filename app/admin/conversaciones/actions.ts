'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Las server actions son endpoints públicos: se vuelve a verificar aquí
// que quien llama es admin, sin confiar en el layout.
export async function marcarAtendida(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!UUID_RE.test(id)) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()
  if (!perfil || perfil.rol !== 'admin') return

  const admin = createAdminClient()
  await admin.from('conversaciones').update({ atendida: true }).eq('id', id)

  revalidatePath('/admin/conversaciones')
}
