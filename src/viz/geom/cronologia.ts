/**
 * Geometría de las líneas de tiempo de El Diario (F27 «Luz y taquígrafos», F28 «Lo que el Diario calla»). Solo
 * aritmética, sin DOM: la compilación escribe posiciones (columna de mes, altura en la pila, nivel del rótulo) y el
 * dibujo es HTML y CSS. Nada se calcula en el cliente.
 *
 *  · La línea va por MESES, de julio de 1931 a julio de 1936 (61 meses): una columna por mes. En escritorio es una sola
 *    fila; en el móvil la misma rejilla se parte en seis años de doce meses (I–XII), como el calendario de Las Cortes.
 *  · Cada mes lleva su estado del calendario (`meses.json` de base.py): con sesión, sin sesión (contorno: la ausencia se
 *    dibuja, no se colorea) o fuera de etapa (vacío).
 *  · Las marcas de un mismo mes se apilan hacia arriba en orden cronológico.
 *  · Rótulos directos (solo escritorio): nivel por colisión, con un ancho supuesto en columnas; si no cabe en tres
 *    niveles, la marca va sin rótulo (su nota y la Tabla lo dicen todo).
 *  · La lupa de F28 va por DÍAS, del 16 de marzo al 10 de julio de 1936.
 */

export interface MesEstado { mes: string; estado: 'sesion' | 'sin_sesion' | 'fuera' | 'salto'; sesiones?: number }
export interface Evento { fecha: string; mes: string; [k: string]: unknown }

export const DESDE = '1931-07';
export const HASTA = '1936-07';
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const mesAIndice = (m: string) => Number(m.slice(0, 4)) * 12 + Number(m.slice(5, 7)) - 1;
const indiceAMes = (i: number) => `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, '0')}`;

export interface Celda {
  mes: string;
  /** Columna en escritorio, 1…61. */
  c: number;
  /** Mes del año, 1…12, y fila del año en el móvil (1931 = 1). */
  m: number;
  a: number;
  romano: string;
  anio: number;
  estado: MesEstado['estado'];
  sesiones: number;
}

export interface Marca<E extends Evento> {
  ev: E;
  celda: Celda;
  /** Posición en la pila del mes (0 = la más baja) y orden cronológico global (1…n). */
  pila: number;
  orden: number;
  /** Nivel del rótulo directo en escritorio (0…2) o null si no cabe. */
  nivel: number | null;
  /** El rótulo se ancla por la derecha (marcas del final de la línea). */
  derecha: boolean;
}

export function celdas(meses: MesEstado[]): Celda[] {
  const est = new Map(meses.map((x) => [x.mes, x]));
  const i0 = mesAIndice(DESDE);
  const i1 = mesAIndice(HASTA);
  const a0 = Number(DESDE.slice(0, 4));
  const out: Celda[] = [];
  for (let i = i0; i <= i1; i++) {
    const mes = indiceAMes(i);
    const e = est.get(mes);
    out.push({
      mes, c: i - i0 + 1, m: (i % 12) + 1, a: Math.floor(i / 12) - a0 + 1, romano: ROMANOS[i % 12], anio: Math.floor(i / 12),
      estado: e?.estado ?? 'fuera', sesiones: e?.sesiones ?? 0,
    });
  }
  return out;
}

export const nColumnas = () => mesAIndice(HASTA) - mesAIndice(DESDE) + 1;

/** Años de la línea con su primera columna (la de enero, o la de julio en 1931). */
export function anios(cs: Celda[]): { anio: number; c: number; a: number }[] {
  const out: { anio: number; c: number; a: number }[] = [];
  for (const x of cs) if (!out.some((y) => y.anio === x.anio)) out.push({ anio: x.anio, c: x.c, a: x.a });
  return out;
}

/**
 * Coloca los eventos: celda, pila y nivel de rótulo. `anchoRotulo(ev)` da el ancho supuesto del rótulo en columnas
 * (null: el evento no lleva rótulo directo).
 */
export function colocar<E extends Evento>(eventos: E[], cs: Celda[], anchoRotulo: (ev: E) => number | null, niveles = 3): Marca<E>[] {
  const porMes = new Map(cs.map((x) => [x.mes, x]));
  const orden = [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  const pilas = new Map<string, number>();
  const ocupado: [number, number][][] = Array.from({ length: niveles }, () => []);
  const total = nColumnas();
  return orden.map((ev, k) => {
    const celda = porMes.get(ev.mes);
    if (!celda) throw new Error(`cronologia: el mes ${ev.mes} está fuera de la línea (${DESDE}–${HASTA})`);
    const pila = pilas.get(ev.mes) ?? 0;
    pilas.set(ev.mes, pila + 1);
    const w = anchoRotulo(ev);
    let nivel: number | null = null;
    let derecha = false;
    if (w !== null && pila === 0) {
      derecha = celda.c + w > total;
      const tramo: [number, number] = derecha ? [celda.c - w, celda.c] : [celda.c, celda.c + w];
      for (let n = 0; n < niveles; n++) {
        if (ocupado[n].every(([a, b]) => tramo[1] <= a || tramo[0] >= b)) { nivel = n; ocupado[n].push(tramo); break; }
      }
    }
    return { ev, celda, pila, orden: k + 1, nivel, derecha };
  });
}

/** Posición en porcentaje de la columna `c` (su centro) en la línea de escritorio. */
export const xColumna = (c: number) => ((c - 0.5) / nColumnas()) * 100;

// ── la lupa: días ──────────────────────────────────────────────────────────────────────────────────────────────────

export const LUPA = { desde: '1936-03-16', hasta: '1936-07-10' };
const dia = (iso: string) => Date.parse(`${iso.slice(0, 10)}T00:00:00Z`) / 864e5;

export interface MarcaLupa<E extends Evento> { ev: E; x: number; pila: number; grupo: number }
export interface GrupoLupa { fecha: string; x: number; n: number; nivel: number }

/** Marcas de la lupa (solo las que caen dentro) y sus grupos por día, con el nivel del rótulo (dos niveles). */
export function lupa<E extends Evento>(eventos: E[], anchoPct = 13): { marcas: MarcaLupa<E>[]; grupos: GrupoLupa[]; meses: { mes: string; romano: string; x: number }[] } {
  const d0 = dia(LUPA.desde);
  const d1 = dia(LUPA.hasta);
  const x = (iso: string) => ((dia(iso) - d0 + 0.5) / (d1 - d0 + 1)) * 100;
  const dentro = eventos.filter((e) => e.fecha >= LUPA.desde && e.fecha <= LUPA.hasta).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const grupos: GrupoLupa[] = [];
  const marcas: MarcaLupa<E>[] = [];
  for (const ev of dentro) {
    let g = grupos.findIndex((y) => y.fecha === ev.fecha);
    if (g < 0) { grupos.push({ fecha: ev.fecha, x: x(ev.fecha), n: 0, nivel: 0 }); g = grupos.length - 1; }
    marcas.push({ ev, x: grupos[g].x, pila: grupos[g].n, grupo: g });
    grupos[g].n++;
  }
  // Rótulos por día en dos niveles: si el anterior del mismo nivel está a menos de `anchoPct`, sube.
  const ultimo = [-Infinity, -Infinity];
  for (const g of grupos) {
    const n = g.x - ultimo[0] >= anchoPct ? 0 : 1;
    g.nivel = n;
    ultimo[n] = g.x;
  }
  const meses: { mes: string; romano: string; x: number }[] = [];
  for (let m = 4; m <= 7; m++) {
    const iso = `1936-${String(m).padStart(2, '0')}-01`;
    meses.push({ mes: iso.slice(0, 7), romano: ROMANOS[m - 1], x: x(iso) - 0.5 / (d1 - d0 + 1) * 100 });
  }
  return { marcas, grupos, meses };
}
