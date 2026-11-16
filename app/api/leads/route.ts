import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const maxDuration = 30

const PROGRAMAS = ['hajimete', 'tanren', 'samurai', 'no_se']
const MAX_BODY_BYTES = 4096
const MAX_POR_IP = 5 // por ventana de 10 min y por instancia del servidor
const VENTANA_MS = 10 * 60 * 1000
const MAX_LEADS_POR_HORA = 60 // freno global anti-inundación

// Memoria por instancia: frena ráfagas de una misma IP. El freno global y
// el de números repetidos se hacen en la base de datos (valen para todas las instancias).
const intentos = new Map<string, number[]>()

function limpiar(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return ''
  return valor
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

function normalizarWhatsapp(valor: string): string | null {
  let digitos = valor.replace(/\D/g, '')
  if (digitos.length === 9) digitos = '51' + digitos
  return /^[0-9]{11,15}$/.test(digitos) ? digitos : null
}

function ipDe(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconocida'
}

function excedeLimitePorIp(ip: string): boolean {
  const ahora = Date.now()
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS)
  recientes.push(ahora)
  intentos.set(ip, recientes)
  if (intentos.size > 5000) intentos.clear() // evita crecer sin límite
  return recientes.length > MAX_POR_IP
}

function respuesta(estado: number, ok: boolean, error?: string) {
  return NextResponse.json(ok ? { ok: true } : { ok: false, error }, { status: estado })
}

export async function POST(request: Request) {
  // Solo se acepta desde esta misma web (los navegadores envían Origin en los POST).
  const origen = request.headers.get('origin')
  const host = request.headers.get('host')
  try {
    if (!origen || !host || new URL(origen).host !== host) {
      return respuesta(403, false, 'No permitido')
    }
  } catch {
    return respuesta(403, false, 'No permitido')
  }

  const largo = Number(request.headers.get('content-length') ?? '0')
  if (largo > MAX_BODY_BYTES) return respuesta(413, false, 'Solicitud demasiado grande')

  let cuerpo: Record<string, unknown>
  try {
    const texto = await request.text()
    if (texto.length > MAX_BODY_BYTES) return respuesta(413, false, 'Solicitud demasiado grande')
    const json = JSON.parse(texto)
    if (typeof json !== 'object' || json === null || Array.isArray(json)) throw new Error()
    cuerpo = json as Record<string, unknown>
  } catch {
    return respuesta(400, false, 'Datos no válidos')
  }

  // Campo trampa lleno = bot. Se responde "ok" sin guardar nada.
  if (limpiar(cuerpo.sitio_web, 50) !== '') return respuesta(200, true)

  if (excedeLimitePorIp(ipDe(request))) {
    return respuesta(429, false, 'Demasiados intentos. Inténtalo más tarde.')
  }

  const nombre = limpiar(cuerpo.nombre, 80)
  const objetivo = limpiar(cuerpo.objetivo, 200)
  const experiencia = limpiar(cuerpo.experiencia, 200)
  const dias = limpiar(cuerpo.dias, 100)
  const whatsapp = normalizarWhatsapp(limpiar(cuerpo.whatsapp, 30))
  const edadNum = Number.parseInt(limpiar(cuerpo.edad, 3), 10)
  const programa = PROGRAMAS.includes(String(cuerpo.programa)) ? String(cuerpo.programa) : 'no_se'

  if (nombre.length < 2 || !whatsapp || !objetivo || !experiencia || !dias) {
    return respuesta(400, false, 'Faltan datos o no son válidos')
  }
  const edad = Number.isInteger(edadNum) && edadNum >= 10 && edadNum <= 99 ? edadNum : null

  try {
    const admin = createAdminClient()

    const hace1h = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await admin
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('creado_en', hace1h)
    if ((count ?? 0) >= MAX_LEADS_POR_HORA) {
      return respuesta(429, false, 'Demasiados intentos. Inténtalo más tarde.')
    }

    // Mismo número enviado hace pocos minutos: no se duplica (pero se responde ok).
    const hace10m = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const { data: repetido } = await admin
      .from('leads')
      .select('id')
      .eq('whatsapp', whatsapp)
      .gte('creado_en', hace10m)
      .limit(1)
    if (repetido && repetido.length > 0) return respuesta(200, true)

    const { data: fila, error } = await admin
      .from('leads')
      .insert({
        nombre,
        edad,
        objetivo,
        experiencia,
        dias,
        whatsapp,
        programa,
        origen: 'formulario',
      })
      .select('id')
      .single()
    if (error || !fila) return respuesta(500, false, 'No se pudo registrar')

    // Aviso a Telegram (best-effort). Si el servidor está dormido o falla, el
    // lead ya está guardado y el cron diario reenvía los avisos pendientes.
    const base = process.env.MCP_API_URL
    const secreto = process.env.MCP_API_SECRET
    if (base && secreto) {
      try {
        await fetch(`${base.replace(/\/$/, '')}/tools/notificar_lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-MCP-Secret': secreto },
          body: JSON.stringify({ lead_id: fila.id }),
          signal: AbortSignal.timeout(20000),
        })
      } catch {
        /* se reintenta desde el cron */
      }
    }

    return respuesta(200, true)
  } catch {
    return respuesta(500, false, 'Error interno')
  }
}
