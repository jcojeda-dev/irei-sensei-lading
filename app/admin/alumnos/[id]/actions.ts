'use server'

import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { exigirAdmin, UUID_RE } from '@/lib/admin-guard'
import { llamarMcp } from '@/app/api/admin/_mcp'

const BUCKET = 'documentos-alumnos'
const MAX_BYTES = 10 * 1024 * 1024
const TIPOS = ['dieta', 'rutina', 'historial_dieta', 'historial_rutina', 'otro']

type Resultado<T = object> = ({ ok: true } & T) | { ok: false; error: string }

function mensajeError(e: unknown): string {
  return e instanceof Error ? e.message : 'Error desconocido'
}

/**
 * Paso 1 de la subida: el servidor decide el nombre del archivo (el cliente
 * nunca elige la ruta) y entrega un permiso de subida de un solo uso.
 */
export async function prepararSubida(
  usuarioId: string
): Promise<Resultado<{ path: string; token: string }>> {
  try {
    await exigirAdmin()
    if (!UUID_RE.test(usuarioId)) return { ok: false, error: 'Alumno no válido' }

    const admin = createAdminClient()
    const { data: alumno } = await admin
      .from('usuarios')
      .select('id')
      .eq('id', usuarioId)
      .maybeSingle()
    if (!alumno) return { ok: false, error: 'Alumno no encontrado' }

    const path = `${usuarioId}/${randomUUID()}.pdf`
    const { data, error } = await admin.storage
      .from(BUCKET)
      .createSignedUploadUrl(path)
    if (error || !data) return { ok: false, error: 'No se pudo preparar la subida' }

    return { ok: true, path, token: data.token }
  } catch (e) {
    return { ok: false, error: mensajeError(e) }
  }
}

/**
 * Paso 2: después de subir, el servidor verifica que el archivo exista, pese
 * menos de 10 MB y sea realmente un PDF (cabecera %PDF-), no solo por su
 * extensión. Si no cumple, lo borra. Recién entonces lo registra.
 */
export async function confirmarSubida(
  usuarioId: string,
  path: string,
  tipo: string,
  titulo: string
): Promise<Resultado<{ documentoId: string }>> {
  try {
    const user = await exigirAdmin()
    if (!UUID_RE.test(usuarioId)) return { ok: false, error: 'Alumno no válido' }
    const patron = new RegExp(`^${usuarioId}/[0-9a-f-]{36}\\.pdf$`, 'i')
    if (!patron.test(path)) return { ok: false, error: 'Ruta no válida' }
    if (!TIPOS.includes(tipo)) return { ok: false, error: 'Tipo no válido' }
    const tituloLimpio = titulo.trim()
    if (tituloLimpio.length < 1 || tituloLimpio.length > 120) {
      return { ok: false, error: 'El título debe tener entre 1 y 120 caracteres' }
    }

    const admin = createAdminClient()
    const { data: blob, error: errDescarga } = await admin.storage
      .from(BUCKET)
      .download(path)
    if (errDescarga || !blob) return { ok: false, error: 'No se encontró el archivo subido' }

    const cabecera = new Uint8Array(await blob.slice(0, 5).arrayBuffer())
    const esPdf = new TextDecoder().decode(cabecera) === '%PDF-'
    if (!esPdf || blob.size > MAX_BYTES || blob.size === 0) {
      await admin.storage.from(BUCKET).remove([path])
      return { ok: false, error: 'El archivo no es un PDF válido de hasta 10 MB' }
    }

    const { data: fila, error: errInsert } = await admin
      .from('documentos_alumno')
      .insert({
        usuario_id: usuarioId,
        tipo,
        titulo: tituloLimpio,
        ruta: path,
        tamano_bytes: blob.size,
        subido_por: user.id,
      })
      .select('id')
      .single()
    if (errInsert || !fila) {
      await admin.storage.from(BUCKET).remove([path])
      return { ok: false, error: 'No se pudo registrar el documento' }
    }

    // Aviso a Telegram (best-effort: si el servidor está dormido o falla, no importa).
    llamarMcp('notificar_documento_subido', { documento_id: fila.id }).catch(() => {})

    revalidatePath(`/admin/alumnos/${usuarioId}`)
    return { ok: true, documentoId: fila.id }
  } catch (e) {
    return { ok: false, error: mensajeError(e) }
  }
}

export async function eliminarDocumento(
  usuarioId: string,
  documentoId: string
): Promise<Resultado> {
  try {
    await exigirAdmin()
    if (!UUID_RE.test(usuarioId) || !UUID_RE.test(documentoId)) {
      return { ok: false, error: 'Datos no válidos' }
    }
    const admin = createAdminClient()
    const { data: doc } = await admin
      .from('documentos_alumno')
      .select('id, ruta')
      .eq('id', documentoId)
      .eq('usuario_id', usuarioId)
      .maybeSingle()
    if (!doc) return { ok: false, error: 'Documento no encontrado' }

    await admin.storage.from(BUCKET).remove([doc.ruta])
    await admin.from('documentos_alumno').delete().eq('id', doc.id)

    revalidatePath(`/admin/alumnos/${usuarioId}`)
    return { ok: true }
  } catch (e) {
    return { ok: false, error: mensajeError(e) }
  }
}

/** Avisa al alumno por WhatsApp con la plantilla aprobada de plan listo. */
export async function avisarPorWhatsapp(usuarioId: string): Promise<Resultado> {
  try {
    await exigirAdmin()
    if (!UUID_RE.test(usuarioId)) return { ok: false, error: 'Alumno no válido' }
    await llamarMcp('enviar_whatsapp', {
      usuario_id: usuarioId,
      tipo_mensaje: 'plan_enviado',
    })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: mensajeError(e) }
  }
}
