/**
 * Geometría común de las figuras de Datos y Versiones (F07, F25, F33, F34, F18). Solo aritmética, sin DOM: la
 * compilación la usa para escribir posiciones en porcentaje (el dibujo es HTML y CSS; el texto va en HTML, nunca en el
 * SVG). Nada se interpola en el cliente.
 */

/** Escala lineal de un dominio [d0, d1] a un rango [r0, r1]. */
export const lineal = ([d0, d1]: [number, number], [r0, r1]: [number, number] = [0, 100]) =>
  (x: number) => (d1 === d0 ? r0 : r0 + ((x - d0) / (d1 - d0)) * (r1 - r0));

/**
 * Marcas «redondas» de un eje que empieza en cero: como mucho `n` divisiones (DESIGN.md: rejilla solo horizontal y nunca
 * más de cuatro líneas). Devuelve el tope del eje (múltiplo del paso, ≥ `max`) y las marcas intermedias.
 */
export function marcas(max: number, n = 4): { tope: number; paso: number; valores: number[] } {
  if (max <= 0) return { tope: 1, paso: 1, valores: [0] };
  const bruto = max / n;
  const mag = 10 ** Math.floor(Math.log10(bruto));
  const paso = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => p * n >= max) ?? 10 * mag;
  const tope = Math.ceil(max / paso) * paso;
  const valores: number[] = [];
  for (let v = 0; v <= tope + paso / 2; v += paso) valores.push(Math.round(v));
  return { tope, paso, valores };
}

/**
 * Marcas redondas sin desperdiciar el lienzo: el dominio acaba un 4 % por encima del máximo y solo se rotulan las
 * marcas que caben en él (la barra más larga ocupa casi todo el ancho; el eje no llega a una marca vacía).
 */
export function marcasAjustadas(max: number, n = 4): { tope: number; paso: number; valores: number[] } {
  const m = marcas(max, n);
  const tope = max * 1.04;
  return { tope, paso: m.paso, valores: m.valores.filter((v) => v <= tope) };
}

/** Días entre dos fechas ISO (AAAA-MM-DD), con signo. */
export const dias = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 864e5);

/** Escala de tiempo en porcentaje entre dos fechas ISO. */
export function tiempo(desde: string, hasta: string) {
  const t0 = Date.parse(`${desde}T00:00:00Z`);
  const t1 = Date.parse(`${hasta}T00:00:00Z`);
  return (iso: string) => ((Date.parse(`${iso.slice(0, 10)}T00:00:00Z`) - t0) / (t1 - t0)) * 100;
}

/** Primer día del año de una fecha y primer día del año siguiente al de otra: el marco de un eje de años enteros. */
export function anosQueCubren(min: string, max: string, margenMeses = 0): { desde: string; hasta: string; anos: number[] } {
  const a0 = Number(min.slice(0, 4));
  const m0 = Number(min.slice(5, 7));
  const a1 = Number(max.slice(0, 4));
  const m1 = Number(max.slice(5, 7));
  // Se abre medio año por cada lado si la primera o la última fecha caen en el centro del año.
  const desde = margenMeses && m0 > 6 ? `${a0}-07-01` : `${a0}-01-01`;
  const hasta = margenMeses && m1 <= 6 ? `${a1}-07-01` : `${a1 + 1}-01-01`;
  const anos: number[] = [];
  for (let a = a0 + (desde.endsWith('07-01') ? 1 : 0); a <= Number(hasta.slice(0, 4)); a++) if (`${a}-01-01` > desde && `${a}-01-01` <= hasta) anos.push(a);
  return { desde, hasta, anos };
}

/** Porcentaje acotado a [0, 100] con dos decimales (para `style`). */
export const pct = (x: number) => `${Math.max(0, Math.min(100, Math.round(x * 100) / 100))}%`;
