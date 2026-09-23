/**
 * Geometría de F09 · Qué familias ocupan la palabra (grupo 2, fichas). Pura: recibe el reparto de una etapa
 * (`src/data/familias_etapa.json`, de `exportador/modulos/fichas.py`) y devuelve los tramos de la tira al 100 %.
 *  · Orden FIJO de familias (el del exportador: de izquierda a derecha por su posición media), igual en las cinco etapas.
 *  · Las familias por debajo del umbral (plan § F09: 1 %) se reúnen en «Otras» SOLO en la tira, al final; la tabla y la
 *    descarga las dan todas.
 *  · Cada tramo lleva su color de ideología (token `--ei … --ed`, `--nc` para «Otras» y «Sin identificar»).
 */
export type Medida = 'palabras' | 'filas';
export interface FamiliaOrden { familia: string; clave: string; posicion: number | null; color: string }
export interface FamiliaEtapa {
  familia: string;
  clave: string;
  palabras: number;
  filas: number;
  diputados: number;
  pct_palabras: number;
  pct_filas: number;
}
export interface EtapaFamilias { den_palabras: number; den_filas: number; familias: FamiliaEtapa[] }
export interface DatosFamilias { base: string; definicion: string; orden: FamiliaOrden[]; umbral_otras: number; etapas: Record<string, EtapaFamilias> }

export interface Tramo {
  clave: string;
  familia: string;
  color: string;
  /** Numerador (palabras o filas) y su parte del total (0–1). */
  n: number;
  pct: number;
  /** Inicio y ancho, en fracción de la tira. */
  x: number;
  ancho: number;
  /** Familias reunidas en «Otras» (vacío si el tramo es una familia). */
  reune: FamiliaEtapa[];
  sinIdentificar: boolean;
}

export const OTRAS = '__otras';

export function tira(d: DatosFamilias, etapa: string, medida: Medida): Tramo[] {
  const e = d.etapas[etapa];
  if (!e) return [];
  const color = new Map(d.orden.map((o) => [o.familia, o.color]));
  const val = (f: FamiliaEtapa) => (medida === 'palabras' ? f.palabras : f.filas);
  const pct = (f: FamiliaEtapa) => (medida === 'palabras' ? f.pct_palabras : f.pct_filas);
  const grandes = e.familias.filter((f) => pct(f) >= d.umbral_otras && f.familia !== 'Sin identificar');
  const reune = e.familias.filter((f) => !grandes.includes(f));
  const tramos: Omit<Tramo, 'x'>[] = grandes.map((f) => ({
    clave: f.clave, familia: f.familia, color: color.get(f.familia) ?? 'nc', n: val(f), pct: pct(f), ancho: pct(f), reune: [], sinIdentificar: false,
  }));
  if (reune.length) {
    const n = reune.reduce((s, f) => s + val(f), 0);
    const den = medida === 'palabras' ? e.den_palabras : e.den_filas;
    const soloSin = reune.length === 1 && reune[0].familia === 'Sin identificar';
    tramos.push({ clave: soloSin ? reune[0].clave : OTRAS, familia: soloSin ? reune[0].familia : OTRAS, color: 'nc', n, pct: n / den, ancho: n / den, reune: soloSin ? [] : reune, sinIdentificar: soloSin });
  }
  let x = 0;
  return tramos.map((t) => { const out = { ...t, x }; x += t.ancho; return out; });
}
