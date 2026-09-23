/**
 * Geometría de F10/F11 (Método 05, trámite frente a discurso) y F12 (Método 06, la fila más larga). Solo aritmética:
 * la compilación escribe anchos y posiciones en porcentaje; el dibujo es HTML y CSS (F10, F12) o un trazo de SVG sin
 * texto (F11). Nada se calcula en el cliente.
 */

export interface Tramo { desde: number; hasta: number | null; filas_pres: number; filas_resto: number; pal_pres: number; pal_resto: number }
export interface Bloque { filas: number; palabras: number; tramos: Tramo[] }
export type Medida = 'filas' | 'palabras';

/** Marcas redondas de un eje que empieza en cero: como mucho `n` divisiones (DESIGN.md: nunca más de cuatro). */
export function marcasEje(max: number, n = 4): { tope: number; valores: number[] } {
  if (max <= 0) return { tope: 1, valores: [0] };
  const bruto = max / n;
  const mag = 10 ** Math.floor(Math.log10(bruto));
  const paso = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => p * n >= max) ?? 10 * mag;
  const tope = Math.ceil(max / paso) * paso;
  const valores: number[] = [];
  for (let v = 0; v <= tope + paso / 2; v += paso) valores.push(Math.round(v));
  return { tope, valores };
}

export interface Barra { i: number; desde: number; hasta: number | null; pres: number; resto: number; total: number; wPres: number; wResto: number }

/** Las diez barras de un bloque en una medida, con anchos en % de un eje común (`tope`). */
export function barras(b: Bloque, medida: Medida, tope?: number): { barras: Barra[]; tope: number; valores: number[] } {
  const par = (t: Tramo) => (medida === 'filas' ? [t.filas_pres, t.filas_resto] : [t.pal_pres, t.pal_resto]);
  const max = Math.max(...b.tramos.map((t) => par(t)[0] + par(t)[1]));
  const eje = tope ? { tope, valores: marcasEje(tope).valores.filter((v) => v <= tope) } : marcasEje(max);
  return {
    ...eje,
    barras: b.tramos.map((t, i) => {
      const [p, r] = par(t);
      return { i, desde: t.desde, hasta: t.hasta, pres: p, resto: r, total: p + r, wPres: (p / eje.tope) * 100, wResto: (r / eje.tope) * 100 };
    }),
  };
}

/** La curva de concentración (F11) como trazo SVG en un lienzo de 100 × 100 (y hacia arriba). */
export function curva(puntos: [number, number][]): string {
  const pts: [number, number][] = [[0, 0], ...puntos.map(([p, v]) => [p, v * 100] as [number, number])];
  return pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(2)} ${(100 - y).toFixed(3)}`).join(' ');
}

// ── F12: el despiece de una fila V2 en sus piezas v3 ──────────────────────────────────────────────────────────────

export interface Pieza { id_v3: number; tipo: 'habla' | 'documento' | 'turno' | 'presidencia'; nwords: number; comienzo: string; orador: string; rotulo: string }
export interface FilaLarga { clave: string; id_v2: number; fecha: string; rotulo: string; orador: string; nwords: number; presidencia: boolean; piezas: Pieza[] }

/** Cada pieza con su inicio y ancho en % de la fila más larga (escala común a las tres). */
export function despiece(filas: FilaLarga[]): (FilaLarga & { w: number; segs: (Pieza & { x: number; w: number })[] })[] {
  const max = Math.max(...filas.map((f) => f.nwords));
  return filas.map((f) => {
    let x = 0;
    const segs = f.piezas.map((p) => {
      const w = (p.nwords / max) * 100;
      const s = { ...p, x, w };
      x += w;
      return s;
    });
    return { ...f, w: (f.nwords / max) * 100, segs };
  });
}
