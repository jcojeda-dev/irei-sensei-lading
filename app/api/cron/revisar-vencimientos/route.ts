import { NextResponse } from 'next/server'
import { llamarMcp } from '@/app/api/admin/_mcp'

export async function GET(request: Request) {
  // Vercel Cron envía automáticamente este header cuando CRON_SECRET
  // está configurado como variable de entorno, para que nadie más
  // pueda disparar este endpoint llamándolo directamente.
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const resultado = await llamarMcp('revisar_vencimientos', {})
    return NextResponse.json(resultado)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
