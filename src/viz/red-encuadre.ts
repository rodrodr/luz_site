/**
 * F21 · encuadre de una red y anclas de sus rótulos (revisión del director, 23-09-2026: «que la red ocupe el lienzo»).
 * Lo usan el motor (`scripts/fig-red.ts`, con las posiciones encuadradas) y la compilación (`FigRed.astro`, rótulos
 * sobre el póster sin JS, con las posiciones del exportador). Coordenadas del lienzo del exportador: x hacia la
 * derecha en [-W, W], y HACIA ABAJO en [-H, H] (W = 1,6 y H = 1: el 16:10 de la caja).
 *
 * El encuadre no cambia quién está cerca de quién: la posición de una red de fuerzas no mide nada, y los bloques y
 * sus vecinos siguen donde estaban unos respecto de otros. Hace tres cosas:
 *  · lleva la caja del 1-99 % de los que firman al marco interior (los pocos de fuera se acercan con una curva suave,
 *    sin cambiar su orden), así una red pequeña o aplastada no queda en el centro de un lienzo vacío;
 *  · deja estirar el eje corto como mucho al doble que el largo (ANIS): 1936-1939 es una banda, y sin estirar dejaba
 *    dos tercios del alto vacíos;
 *  · pone a los sueltos, por el orden de su ángulo, repartidos a igual distancia en un anillo casi rectangular
 *    (superelipse de grado 4) que ciñe el marco. La leyenda sigue siendo verdad: «en el anillo exterior».
 */
export type NodoRed = [number, string, string, string, string, number, number, number, number];

export const W = 1.6, H = 1;
const ANIS = 2;        // cuánto puede estirarse el eje corto respecto del largo
const INTERIOR = 0.72; // semiancho del marco interior (fracción de W y H) para la caja del 1-99 %
const SUAVE = 0.1;     // margen de la curva que acerca a los de fuera (en semiancho de la caja)
const ANILLO = 0.94;   // radio del anillo de los sueltos

const cuantil = (v: number[], p: number) => {
  if (!v.length) return 0;
  const s = v.slice().sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.max(0, Math.round(p * (s.length - 1))))];
};
const suave = (u: number) => (Math.abs(u) <= 1 ? u : Math.sign(u) * (1 + SUAVE * Math.tanh((Math.abs(u) - 1) / SUAVE)));

/** Puntos de la superelipse |x/a|⁴ + |y/b|⁴ = 1, a igual distancia unos de otros, empezando a la izquierda. */
function anillo(n: number, a: number, b: number): [number, number][] {
  if (!n) return [];
  const M = 720, pts: [number, number][] = [], acum = [0];
  for (let i = 0; i <= M; i++) {
    const t = Math.PI + (i / M) * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
    pts.push([a * Math.sign(c) * Math.sqrt(Math.abs(c)), b * Math.sign(s) * Math.sqrt(Math.abs(s))]);
    if (i) acum.push(acum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const L = acum[M], out: [number, number][] = [];
  let j = 0;
  for (let k = 0; k < n; k++) {
    const d = ((k + 0.5) / n) * L;
    while (j < M - 1 && acum[j + 1] < d) j++;
    const f = (d - acum[j]) / (acum[j + 1] - acum[j] || 1);
    out.push([pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f]);
  }
  return out;
}

/** Posición encuadrada de cada diputado (por id), en coordenadas del lienzo (y hacia abajo). */
export function encuadre(nodos: NodoRed[]): Map<number, [number, number]> {
  const firman = nodos.filter((n) => n[5] > 0);
  const sueltos = nodos.filter((n) => n[5] === 0);
  const xs = firman.map((n) => n[6]), ys = firman.map((n) => n[7]);
  const x0 = cuantil(xs, 0.01), x1 = cuantil(xs, 0.99), y0 = cuantil(ys, 0.01), y1 = cuantil(ys, 0.99);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, hx = Math.max((x1 - x0) / 2, 1e-3), hy = Math.max((y1 - y0) / 2, 1e-3);
  const marco = sueltos.length ? INTERIOR : INTERIOR + 0.1;
  const sx = (marco * W) / hx, sy = (marco * H) / hy, s = Math.min(sx, sy);
  const kx = Math.min(sx, s * ANIS), ky = Math.min(sy, s * ANIS);
  const pos = new Map<number, [number, number]>();
  for (const n of firman) pos.set(n[0], [suave((n[6] - cx) / hx) * hx * kx, suave((n[7] - cy) / hy) * hy * ky]);
  const angulo = (n: NodoRed) => { const t = Math.atan2(n[7] / H, n[6] / W); return t < 0 ? t + 2 * Math.PI : t; };
  // el anillo empieza a la izquierda (ángulo π) y gira como el del exportador
  const orden = sueltos.slice().sort((a, b) => ((angulo(a) - Math.PI + 2 * Math.PI) % (2 * Math.PI)) - ((angulo(b) - Math.PI + 2 * Math.PI) % (2 * Math.PI)));
  anillo(orden.length, ANILLO * W, ANILLO * H).forEach((p, i) => pos.set(orden[i][0], p));
  return pos;
}

/** Grupos de los rótulos editoriales: por ahora, solo donde la red se parte (1936-1939). */
export const ROTULOS: Record<string, { clave: string; respaldo: string; ideos: string[] }[]> = {
  1936: [
    { clave: 'fig.F21.rotulo.1936.izquierda', respaldo: 'fig.F21.leyenda.I', ideos: ['EI', 'I', 'CI'] },
    { clave: 'fig.F21.rotulo.1936.derecha', respaldo: 'fig.F21.leyenda.D', ideos: ['CD', 'D', 'ED'] },
  ],
};

/**
 * Ancla de un rótulo: en la mediana horizontal del grupo y por encima de TODO punto que firma bajo su anchura
 * (± `medio`, en unidades del lienzo), para que el rótulo no tape a nadie; nunca más de 0,3·H por encima del decil alto
 * del grupo (un componente suelto no lo aleja de su bloque) ni más arriba de −0,7·H, donde pisaría el anillo de los sueltos.
 */
export function anclaGrupo(nodos: NodoRed[], ideos: string[], pos?: Map<number, [number, number]>, medio = 0.16): [number, number] | null {
  const xy = (n: NodoRed) => pos?.get(n[0]) ?? ([n[6], n[7]] as [number, number]);
  const firman = nodos.filter((n) => n[5] > 0);
  const grupo = firman.filter((n) => ideos.includes(n[4])).map(xy);
  if (grupo.length < 3) return null;
  const x = cuantil(grupo.map((q) => q[0]), 0.5);
  const bajo = firman.map(xy).filter((q) => Math.abs(q[0] - x) <= medio).map((q) => q[1]);
  const q10 = cuantil(grupo.map((q) => q[1]), 0.1);
  const techo = Math.min(q10, ...bajo);
  // Un componente suelto y alto en la misma columna (en 1936-1939, tres firmantes de la derecha en y ≈ -0,66) subía el
  // rótulo a un vacío lejos de su bloque: como mucho 0,3 H por encima del decil alto del propio grupo (verificación 23-09).
  return [x, Math.max(techo, q10 - 0.3 * H, -0.7 * H)];
}
