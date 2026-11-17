// Cálculos del dashboard de avance. Funciones puras (sin acceso a datos ni DOM).

export type Medicion = {
  fecha: string // AAAA-MM-DD
  peso: number | null
  grasa: number | null // % de grasa
}

export type Metrica = 'peso' | 'grasa' | 'masa_grasa' | 'masa_magra'
export type Meta = 'bajar' | 'subir' | 'neutral'

export const METRICAS: Record<Metrica, { etiqueta: string; unidad: string; mejora: 'baja' | 'sube' | 'segun_objetivo' }> = {
  peso: { etiqueta: 'Peso', unidad: 'kg', mejora: 'segun_objetivo' },
  grasa: { etiqueta: '% de grasa', unidad: '%', mejora: 'baja' },
  masa_grasa: { etiqueta: 'Masa grasa', unidad: 'kg', mejora: 'baja' },
  masa_magra: { etiqueta: 'Masa magra', unidad: 'kg', mejora: 'sube' },
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/** Convierte filas de la base (valores que pueden venir como texto) en mediciones limpias y ordenadas. */
export function normalizarMediciones(
  filas: { fecha: string; peso_kg: unknown; porcentaje_grasa: unknown }[] | null | undefined,
): Medicion[] {
  const num = (v: unknown) => {
    const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v) : NaN
    return Number.isFinite(n) && n > 0 ? n : null
  }
  return (filas ?? [])
    .filter((f) => /^\d{4}-\d{2}-\d{2}$/.test(f.fecha))
    .map((f) => ({ fecha: f.fecha, peso: num(f.peso_kg), grasa: num(f.porcentaje_grasa) }))
    .filter((m) => m.peso !== null || m.grasa !== null)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
}

/** Valor de una métrica para una medición (null si faltan datos). */
export function valorDe(m: Medicion, metrica: Metrica): number | null {
  if (metrica === 'peso') return m.peso
  if (metrica === 'grasa') return m.grasa
  if (m.peso === null || m.grasa === null) return null
  const masaGrasa = (m.peso * m.grasa) / 100
  return metrica === 'masa_grasa' ? masaGrasa : m.peso - masaGrasa
}

export function redondear(n: number): number {
  return Math.round(n * 10) / 10
}

/** Días enteros entre dos fechas AAAA-MM-DD (sin problemas de zona horaria). */
export function diasEntre(a: string, b: string): number {
  const t = (f: string) => {
    const [y, m, d] = f.split('-').map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((t(b) - t(a)) / 86_400_000)
}

export function fechaCorta(f: string): string {
  const [y, m, d] = f.split('-').map(Number)
  return `${d} ${MESES[m - 1]}${y !== new Date().getFullYear() ? ` ${y}` : ''}`
}

/** Deduce si el objetivo es bajar o subir de peso a partir del texto libre. */
export function detectarMeta(objetivo: string | null | undefined): Meta {
  const t = (objetivo ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  if (/\b(bajar|perder|reducir|adelgazar|definir|definicion|quemar|grasa)\b/.test(t)) return 'bajar'
  if (/\b(ganar|aumentar|subir|masa|volumen|musculo|hipertrofia)\b/.test(t)) return 'subir'
  return 'neutral'
}

export type Comparacion = {
  etiqueta: string
  referencia: Medicion | null
  diferencia: number | null
  diasReales: number | null
  tono: 'mejora' | 'empeora' | 'neutro' | 'sin_dato'
}

/** ¿El cambio es bueno, malo o neutro para esta métrica y este objetivo? */
export function tonoDeCambio(metrica: Metrica, diferencia: number, meta: Meta): Comparacion['tono'] {
  if (Math.abs(diferencia) < 0.05) return 'neutro'
  const regla = METRICAS[metrica].mejora
  if (regla === 'baja') return diferencia < 0 ? 'mejora' : 'empeora'
  if (regla === 'sube') return diferencia > 0 ? 'mejora' : 'empeora'
  if (meta === 'neutral') return 'neutro'
  if (meta === 'bajar') return diferencia < 0 ? 'mejora' : 'empeora'
  return diferencia > 0 ? 'mejora' : 'empeora'
}

/**
 * Compara la última medición con la más reciente que sea de hace AL MENOS `dias` días
 * (y que tenga dato de esa métrica). `dias = null` compara contra la primera medición.
 */
export function comparar(
  mediciones: Medicion[],
  metrica: Metrica,
  dias: number | null,
  etiqueta: string,
  meta: Meta,
): Comparacion {
  const vacia: Comparacion = { etiqueta, referencia: null, diferencia: null, diasReales: null, tono: 'sin_dato' }
  const validas = mediciones.filter((m) => valorDe(m, metrica) !== null)
  if (validas.length < 2) return vacia
  const ultima = validas[validas.length - 1]
  const candidatas = validas.slice(0, -1)
  const referencia =
    dias === null
      ? candidatas[0]
      : [...candidatas].reverse().find((m) => diasEntre(m.fecha, ultima.fecha) >= dias) ?? null
  if (!referencia) return vacia
  const diferencia = redondear(valorDe(ultima, metrica)! - valorDe(referencia, metrica)!)
  return {
    etiqueta,
    referencia,
    diferencia,
    diasReales: diasEntre(referencia.fecha, ultima.fecha),
    tono: tonoDeCambio(metrica, diferencia, meta),
  }
}

/** Filtra el rango visible: últimos N días contados desde la última medición (null = todo). */
export function filtrarRango(mediciones: Medicion[], dias: number | null): Medicion[] {
  if (dias === null || mediciones.length === 0) return mediciones
  const ultima = mediciones[mediciones.length - 1].fecha
  return mediciones.filter((m) => diasEntre(m.fecha, ultima) <= dias)
}

/** Escala "bonita" para el eje Y: mínimo, máximo y marcas. */
export function escalaY(valores: number[]): { min: number; max: number; marcas: number[] } {
  let min = Math.min(...valores)
  let max = Math.max(...valores)
  if (min === max) {
    min -= 1
    max += 1
  }
  const margen = (max - min) * 0.15
  min = Math.floor(min - margen)
  max = Math.ceil(max + margen)
  const paso = Math.max(1, Math.ceil((max - min) / 4)) // marcas enteras
  max = min + paso * 4
  return { min, max, marcas: [0, 1, 2, 3, 4].map((i) => min + paso * i) }
}
