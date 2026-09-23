/**
 * Geometría del laboratorio de palabras de Inicio (juego 1; docs/REDISENO_23-09.md). Pura: la usan la compilación
 * (`components/inicio/Laboratorio.astro`, la versión sin JS con sus ocho palabras) y el navegador
 * (`scripts/laboratorio.ts`, la versión que se juega), así que las dos dibujan lo mismo.
 *
 * Datos: `public/datos/laboratorio.json` (exportador › laboratorio.py): por cada término, sus apariciones por mes,
 * contadas sobre el índice FTS5 del explorador, y los tokens de cada mes (el denominador de su Tendencia).
 *
 * Eje del tiempo: continuo de julio de 1931 a febrero de 1939 y, tras un SALTO rotulado (ningún mes con sesión entre
 * 1939 y 1944), de enero a noviembre de 1945. Dos meses con sesión se unen con una línea solo si son seguidos: un mes
 * sin sesión corta la curva (la ausencia no se dibuja como un cero). Los meses con poco texto (menos palabras que el
 * umbral normal de la Tendencia) van en trazo fino; los de menos del umbral bajo no fijan la escala.
 */
export interface Termino { m: string; s: string }
export interface LabDatos {
  _meta: { umbral_normal: number; umbral_baja: number; fecha?: string; v3_sha256?: string };
  propuestas: string[];
  meses: string[];
  tokens: number[];
  terminos: Record<string, Termino>;
}

export const W = 1000;
export const H = 300;
export const PAD = { l: 6, r: 6, t: 18, b: 30 } as const;

const abs = (m: string) => { const [y, mm] = m.split('-').map(Number); return y * 12 + (mm - 1); };
const INI = abs('1931-07');
const FIN1 = abs('1939-02');
const INI2 = abs('1945-01');
const FIN2 = abs('1945-11');
const SALTO = 6;
const TRAMO1 = FIN1 - INI + 1;
export const UNIDADES = TRAMO1 + SALTO + (FIN2 - INI2 + 1);

/** Posición en unidades de mes (el salto de 1939–1944 cuenta como SALTO meses). */
export function unidad(m: string): number {
  const a = abs(m);
  return a <= FIN1 ? a - INI : TRAMO1 + SALTO + (a - INI2);
}
const ancho = W - PAD.l - PAD.r;
export const xDe = (m: string) => PAD.l + ((unidad(m) + 0.5) * ancho) / UNIDADES;
/** Centro del salto, para su marca «//». */
export const xSalto = PAD.l + ((TRAMO1 + SALTO / 2) * ancho) / UNIDADES;
/** Las marcas de año del eje: enero de cada año del tramo continuo, más 1945. */
export const ANIOS = [{ a: 1931, x: xDe('1931-07') }].concat([1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939].map((a) => ({ a, x: xDe(`${a}-01`) })))
  .concat([{ a: 1945, x: xDe('1945-01') }]);
export const x1931 = xDe('1931-07');

/** Serie mensual desde su código (base 36, vacío = 0), con tantos valores como meses. */
export function serie(codigo: string, n: number): number[] {
  const out = codigo ? codigo.split(',').map((v) => (v ? parseInt(v, 36) : 0)) : [];
  while (out.length < n) out.push(0);
  return out;
}
export const densidades = (c: number[], tokens: number[]) => c.map((v, i) => (tokens[i] > 0 ? (v / tokens[i]) * 1e4 : 0));

/** Techo de la escala: el máximo de las series en los meses que la fijan, redondeado hacia arriba a un valor limpio. */
export function techo(series: number[][], tokens: number[], umbralBaja: number): number {
  let max = 0;
  for (const d of series) d.forEach((v, i) => { if (tokens[i] >= umbralBaja && v > max) max = v; });
  if (max <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(max));
  for (const k of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (k * p >= max) return k * p;
  return 10 * p;
}
export const yDe = (d: number, t: number) => PAD.t + (H - PAD.t - PAD.b) * (1 - Math.min(d, t) / t);

export interface Punto { i: number; mes: string; x: number; y: number; fiable: boolean; debil: boolean }
/** Dos caminos SVG (firme y fino) y los puntos de una serie. */
export function trazos(meses: string[], d: number[], tokens: number[], t: number, umbralNormal: number, umbralBaja: number) {
  const pts: Punto[] = meses.map((mes, i) => ({ i, mes, x: xDe(mes), y: yDe(d[i], t), fiable: tokens[i] >= umbralNormal, debil: tokens[i] < umbralBaja }));
  let firme = '', fino = '';
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1], b = pts[k];
    if (abs(b.mes) - abs(a.mes) !== 1) continue;           // un mes sin sesión en medio: la curva se corta
    if (a.debil || b.debil) continue;                        // un mes casi sin texto no se une a nada
    const seg = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    if (a.fiable && b.fiable) firme += seg; else fino += seg;
  }
  return { firme, fino, pts };
}

/** Nivel de cada mes para el calendario: 0 = ninguna aparición; 1–4 por la raíz de la fracción del máximo (los meses que
 *  fijan escala), para que un pico no deje todo lo demás en el primer tono. */
export function niveles(d: number[], tokens: number[], umbralBaja: number): number[] {
  let max = 0;
  d.forEach((v, i) => { if (tokens[i] >= umbralBaja && v > max) max = v; });
  return d.map((v) => (v <= 0 || max <= 0 ? 0 : Math.max(1, Math.min(4, Math.ceil(Math.sqrt(Math.min(1, v / max)) * 4)))));
}

/** El calendario: una fila por año (1931–1939 y 1945), doce columnas. `tipo`: con sesión, sin sesión o fuera del periodo. */
export function rejilla(meses: string[]) {
  const con = new Map(meses.map((m, i) => [m, i]));
  const anios = [1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1945];
  return anios.map((a) => ({
    a,
    celdas: Array.from({ length: 12 }, (_, k) => {
      const mes = `${a}-${String(k + 1).padStart(2, '0')}`;
      const x = abs(mes);
      const dentro = (x >= INI && x <= FIN1) || (x >= INI2 && x <= FIN2);
      const i = con.get(mes);
      return { mes, i: i ?? -1, tipo: i !== undefined ? 'con' : dentro ? 'sin' : 'fuera' } as const;
    }),
  }));
}

/** Plegado como el índice del explorador (`unicode61 remove_diacritics 2`): sin tildes, en minúsculas, por tokens. */
export function clave(s: string): string {
  const p = s.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase();
  return (p.match(/[\p{L}\p{N}]+/gu) ?? []).join(' ');
}

/** La consulta tal como se escribe en el buscador del explorador: la expresión, entre comillas. */
export const consulta = (forma: string) => (/\s/.test(forma.trim()) ? `"${forma.trim()}"` : forma.trim());
