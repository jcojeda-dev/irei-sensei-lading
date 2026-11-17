'use client'

import { useRef } from 'react'
import { diasEntre, escalaY, fechaCorta } from '@/lib/progreso'

export type Punto = { fecha: string; valor: number }

const W = 640
const H = 260
const M = { izq: 46, der: 18, arr: 16, aba: 30 }

/** Gráfico de línea en SVG, con colores sólidos. Toca o pasa el cursor para elegir una medición. */
export default function GraficoLinea({
  puntos,
  unidad,
  seleccion,
  onSeleccion,
  descripcion,
}: {
  puntos: Punto[]
  unidad: string
  seleccion: string | null
  onSeleccion: (fecha: string) => void
  descripcion: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  if (puntos.length === 0) return null

  const { min, max, marcas } = escalaY(puntos.map((p) => p.valor))
  const t0 = puntos[0].fecha
  const total = Math.max(1, diasEntre(t0, puntos[puntos.length - 1].fecha))
  const x = (f: string) =>
    puntos.length === 1 ? (M.izq + W - M.der) / 2 : M.izq + (diasEntre(t0, f) / total) * (W - M.izq - M.der)
  const y = (v: number) => M.arr + (1 - (v - min) / (max - min)) * (H - M.arr - M.aba)

  function elegirCercano(clientX: number) {
    const caja = ref.current?.getBoundingClientRect()
    if (!caja) return
    const px = ((clientX - caja.left) / caja.width) * W
    let mejor = puntos[0]
    for (const p of puntos) if (Math.abs(x(p.fecha) - px) < Math.abs(x(mejor.fecha) - px)) mejor = p
    onSeleccion(mejor.fecha)
  }

  const etiquetasX = [puntos[0], ...(puntos.length >= 5 ? [puntos[Math.floor(puntos.length / 2)]] : []), puntos[puntos.length - 1]]
    .filter((p, i, a) => a.findIndex((q) => q.fecha === p.fecha) === i)

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto touch-pan-y select-none"
      role="img"
      aria-label={descripcion}
      onPointerDown={(e) => elegirCercano(e.clientX)}
      onPointerMove={(e) => e.buttons === 1 || e.pointerType === 'mouse' ? elegirCercano(e.clientX) : undefined}
    >
      <rect x="0" y="0" width={W} height={H} fill="#141414" rx="8" />
      {marcas.map((m) => (
        <g key={m}>
          <line x1={M.izq} x2={W - M.der} y1={y(m)} y2={y(m)} stroke="#2a2a2a" strokeWidth="1" />
          <text x={M.izq - 8} y={y(m) + 4} textAnchor="end" fontSize="11" fill="#9a9a9a">
            {m}
          </text>
        </g>
      ))}
      <text x={M.izq} y={11} fontSize="10" fill="#9a9a9a">
        {unidad}
      </text>

      {puntos.length > 1 && (
        <polyline
          points={puntos.map((p) => `${x(p.fecha)},${y(p.valor)}`).join(' ')}
          fill="none"
          stroke="#B3211B"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}

      {seleccion && puntos.some((p) => p.fecha === seleccion) && (
        <line
          x1={x(seleccion)}
          x2={x(seleccion)}
          y1={M.arr}
          y2={H - M.aba}
          stroke="#F3EFE3"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      )}

      {puntos.map((p) => {
        const activo = p.fecha === seleccion
        return (
          <circle
            key={p.fecha}
            cx={x(p.fecha)}
            cy={y(p.valor)}
            r={activo ? 7 : 4.5}
            fill={activo ? '#B3211B' : '#F3EFE3'}
            stroke={activo ? '#F3EFE3' : '#B3211B'}
            strokeWidth="2"
          />
        )
      })}

      {etiquetasX.map((p) => (
        <text key={p.fecha} x={x(p.fecha)} y={H - 9} textAnchor="middle" fontSize="11" fill="#9a9a9a">
          {fechaCorta(p.fecha)}
        </text>
      ))}
    </svg>
  )
}
