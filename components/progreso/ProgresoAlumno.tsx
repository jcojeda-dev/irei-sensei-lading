'use client'

import { useMemo, useState } from 'react'
import GraficoLinea from './GraficoLinea'
import {
  METRICAS,
  type Medicion,
  type Metrica,
  comparar,
  detectarMeta,
  diasEntre,
  fechaCorta,
  filtrarRango,
  redondear,
  tonoDeCambio,
  valorDe,
} from '@/lib/progreso'

const RANGOS: { etiqueta: string; dias: number | null }[] = [
  { etiqueta: '1 mes', dias: 30 },
  { etiqueta: '3 meses', dias: 90 },
  { etiqueta: 'Todo', dias: null },
]

const COLOR_TONO = {
  mejora: '#3f9b5a',
  empeora: '#d9a441',
  neutro: '#9a9a9a',
  sin_dato: '#9a9a9a',
} as const

function signo(n: number) {
  return `${n > 0 ? '+' : ''}${n}`
}

export default function ProgresoAlumno({
  mediciones,
  objetivo,
}: {
  mediciones: Medicion[]
  objetivo: string | null
}) {
  const [metrica, setMetrica] = useState<Metrica>('peso')
  const [dias, setDias] = useState<number | null>(null)
  const [seleccion, setSeleccion] = useState<string | null>(null)

  const meta = detectarMeta(objetivo)
  const info = METRICAS[metrica]

  const conDato = useMemo(() => mediciones.filter((m) => valorDe(m, metrica) !== null), [mediciones, metrica])
  const visibles = useMemo(() => filtrarRango(conDato, dias), [conDato, dias])
  const puntos = visibles.map((m) => ({ fecha: m.fecha, valor: redondear(valorDe(m, metrica)!) }))

  const comparaciones = useMemo(
    () => [
      comparar(mediciones, metrica, 7, 'Vs. semana anterior', meta),
      comparar(mediciones, metrica, 15, 'Vs. 15 días atrás', meta),
      comparar(mediciones, metrica, null, 'Desde el inicio', meta),
    ],
    [mediciones, metrica, meta],
  )

  if (mediciones.length === 0) {
    return <p className="text-[#9a9a9a] text-sm">Todavía no hay mediciones registradas.</p>
  }

  const sel = puntos.find((p) => p.fecha === seleccion) ?? puntos[puntos.length - 1]
  const idxSel = puntos.findIndex((p) => p.fecha === sel?.fecha)
  const anterior = idxSel > 0 ? puntos[idxSel - 1] : null
  const difSel = sel && anterior ? redondear(sel.valor - anterior.valor) : null
  const timeline = [...conDato].reverse()

  return (
    <div className="space-y-5">
      {/* Métrica y rango */}
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Métrica">
          {(Object.keys(METRICAS) as Metrica[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={metrica === k}
              onClick={() => setMetrica(k)}
              className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                metrica === k
                  ? 'bg-[#B3211B] border-[#B3211B] text-white'
                  : 'border-[#2a2a2a] text-[#c9c2b8] hover:border-[#555]'
              }`}
            >
              {METRICAS[k].etiqueta}
            </button>
          ))}
        </div>
        <div className="flex gap-2" role="group" aria-label="Rango de fechas">
          {RANGOS.map((r) => (
            <button
              key={r.etiqueta}
              onClick={() => setDias(r.dias)}
              aria-pressed={dias === r.dias}
              className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                dias === r.dias
                  ? 'bg-[#F3EFE3] border-[#F3EFE3] text-[#14120F]'
                  : 'border-[#2a2a2a] text-[#c9c2b8] hover:border-[#555]'
              }`}
            >
              {r.etiqueta}
            </button>
          ))}
        </div>
      </div>

      {/* Comparaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {comparaciones.map((c) => (
          <div key={c.etiqueta} className="rounded-lg border border-[#2a2a2a] p-3" style={{ background: '#141414' }}>
            <p className="text-xs text-[#9a9a9a] uppercase tracking-wide">{c.etiqueta}</p>
            {c.diferencia === null ? (
              <p className="text-sm text-[#9a9a9a] mt-2">Aún sin datos para comparar</p>
            ) : (
              <>
                <p className="text-2xl font-medium mt-1" style={{ color: COLOR_TONO[c.tono] }}>
                  {signo(c.diferencia)} {info.unidad}
                </p>
                <p className="text-xs text-[#9a9a9a] mt-1">
                  Referencia: {fechaCorta(c.referencia!.fecha)} (hace {c.diasReales} días)
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Gráfico */}
      {puntos.length === 0 ? (
        <p className="text-sm text-[#9a9a9a]">No hay datos de {info.etiqueta.toLowerCase()} en este rango.</p>
      ) : (
        <div>
          <div className="flex items-baseline justify-between mb-2 min-h-[2.5rem]">
            <p className="text-sm">
              <span className="text-[#9a9a9a]">{fechaCorta(sel.fecha)}: </span>
              <span className="text-lg font-medium">
                {sel.valor} {info.unidad}
              </span>
            </p>
            {difSel !== null && (
              <p className="text-sm" style={{ color: COLOR_TONO[tonoDeCambio(metrica, difSel, meta)] }}>
                {signo(difSel)} {info.unidad} vs. la medición anterior
              </p>
            )}
          </div>
          <GraficoLinea
            puntos={puntos}
            unidad={info.unidad}
            seleccion={sel.fecha}
            onSeleccion={setSeleccion}
            descripcion={`Evolución de ${info.etiqueta.toLowerCase()}: de ${puntos[0].valor} a ${puntos[puntos.length - 1].valor} ${info.unidad}`}
          />
          {puntos.length < 2 && (
            <p className="text-xs text-[#9a9a9a] mt-2">
              Con la próxima medición podrás ver tu evolución en el gráfico.
            </p>
          )}
        </div>
      )}

      {/* Línea de tiempo */}
      <div>
        <h3 className="text-sm text-[#9a9a9a] uppercase tracking-wide mb-3">Línea de tiempo</h3>
        <ol className="relative border-l-2 border-[#2a2a2a] ml-2 space-y-3">
          {timeline.map((m, i) => {
            const previa = timeline[i + 1]
            const v = valorDe(m, metrica)!
            const dif = previa ? redondear(v - valorDe(previa, metrica)!) : null
            const activo = m.fecha === sel?.fecha
            return (
              <li key={m.fecha} className="pl-4 relative">
                <span
                  className="absolute -left-[7px] top-3 h-3 w-3 rounded-full border-2"
                  style={{ background: activo ? '#B3211B' : '#14120F', borderColor: activo ? '#F3EFE3' : '#B3211B' }}
                />
                <button
                  onClick={() => setSeleccion(m.fecha)}
                  className={`w-full text-left rounded-lg border px-3 py-2 transition-colors ${
                    activo ? 'border-[#B3211B]' : 'border-[#2a2a2a] hover:border-[#555]'
                  }`}
                  style={{ background: '#141414' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-[#9a9a9a]">
                      {fechaCorta(m.fecha)}
                      {previa && <span className="text-xs"> · {diasEntre(previa.fecha, m.fecha)} días después</span>}
                    </span>
                    {dif !== null && (
                      <span className="text-sm" style={{ color: COLOR_TONO[tonoDeCambio(metrica, dif, meta)] }}>
                        {signo(dif)} {info.unidad}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1">
                    {m.peso !== null && <span>{m.peso} kg</span>}
                    {m.grasa !== null && <span className="text-[#9a9a9a]"> · {m.grasa}% grasa</span>}
                  </p>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
