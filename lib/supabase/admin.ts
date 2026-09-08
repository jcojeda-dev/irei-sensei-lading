import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente con la SERVICE ROLE KEY: se salta RLS por completo.
 * SOLO usar en Server Components/Route Handlers ya protegidos por
 * el chequeo de rol admin (ver app/admin/layout.tsx) — nunca
 * exponer este cliente ni la key al navegador.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
