/**
 * Geometría de F05 · Quién tomó la palabra (grupo 2, fichas). Pura: recibe los diez primeros de una etapa
 * (`src/data/oradores_etapa.json`, que escribe `exportador/modulos/fichas.py`) y devuelve el largo de cada barra.
 * Barras desde cero, en escala lineal con el primero como 100 %: el orden es el de las palabras (fijo, sin
 * conmutador). La marca es HTML (celdas de una lista), no SVG: el texto del nombre y la cifra van en la misma fila.
 */
export interface Orador {
  puesto: number;
  rep_id: number;
  nombre: string;
  corto: string;
  partido: string | null;
  familia: string | null;
  palabras: number;
  filas: number;
  /** Palabras del diputado / palabras de habla sin Presidencia de la etapa (0–1). */
  pct: number;
}
export interface EtapaOradores { den: number; filas: number; diputados: number; diez: number; top: Orador[] }
export interface DatosOradores { base: string; definicion: string; etapas: Record<string, EtapaOradores> }

export interface BarraOrador extends Orador {
  /** Largo de la barra, de 0 a 1 (el primero es 1). */
  largo: number;
}

export function barrasOradores(e: EtapaOradores): { barras: BarraOrador[]; max: number } {
  const max = Math.max(1, ...e.top.map((o) => o.palabras));
  return { barras: e.top.map((o) => ({ ...o, largo: o.palabras / max })), max };
}
