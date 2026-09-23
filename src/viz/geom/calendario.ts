/**
 * Geometría PURA del calendario F01 (plan § F01 · F16; DESIGN.md § Sistema de figuras). Sin Astro y sin DOM: recibe
 * los datos del exportador y devuelve la rejilla año × mes agrupada por etapa, con lo que cada escala necesita:
 *  · F01c (Inicio): una celda por mes, con su clase de tono (5 clases por cuantiles sin interpolar, de `calendario.json`);
 *  · F01 (Las Cortes) y F01e (fichas): dentro de cada mes, una ranura por FECHA y una barra por sesión (las dos sesiones
 *    de un mismo día son medias barras); la altura, palabras o diputados sobre el máximo de todo el corpus;
 *  · F16 (bajo cada fila de año de F01e): los tramos de presidente titular y de Gobierno, partidos por fila, con su
 *    posición en «unidades de mes» (0–12) para dibujarlos alineados con las ranuras de las barras.
 * Todas las posiciones son fracciones: el componente las convierte en CSS con `calc()` y la calle de la rejilla.
 */

export type Estado = 'sesion' | 'sin_sesion' | 'fuera' | 'salto';
export interface MesDato { mes: string; e: string | null; leg: string | null; estado: Estado; sesiones: number; filas: number; pal: number; dip: number }
export interface SesionDato {
  clave: string; f: string; s: number; e: string; filas: number; pal: number; dip: number;
  meta: { num?: number; paginas?: [number, number]; pres?: string; gob?: string; doble?: string };
}
export interface Clase { i: number; desde: number; hasta: number; meses: number }
export interface Tramo { clave: string; etapa: string; desde: string; hasta: string; primera: string; ultima: string; sesiones: number; nombre: string; corto: string; verificar: boolean }
export interface CalendarioDato {
  clases: Clase[];
  mes_max: { mes: string; palabras: number; sesiones: number; filas: number };
  escala: { palabras: number; diputados: number };
  puertas: Record<string, string>;
  tramos: { presidente: Tramo[]; gobierno: Tramo[] };
}

export interface Barra {
  s: SesionDato;
  /** Altura en palabras y en diputados, 0–1 sobre el máximo del corpus. */
  h: number; u: number;
  /** Posición dentro del mes, 0–1 (inicio y fin de su ranura; media ranura si es doble). */
  x0: number; x1: number;
  doble: boolean;
  puerta?: string;
  /** Índice de la sesión dentro de su etapa (orden cronológico): para recorrer con el teclado. */
  orden: number;
}
export interface Celda {
  mes: string; m: number; anio: number; estado: Estado; clase: number | null; dato: MesDato;
  /** Índice cronológico del mes entre los 173 (el tiempo corre: retardo --n). */
  n: number;
  barras: Barra[];
}
export interface Segmento {
  tramo: Tramo; banda: 'presidente' | 'gobierno';
  /** Inicio y fin en unidades de mes (0–12) dentro de la fila. */
  a: number; b: number;
  /** Continúa desde la fila anterior / en la fila siguiente. */
  viene: boolean; sigue: boolean;
  /** Sesiones del tramo en ESTA fila. */
  n: number;
}
export interface FilaAnio { anio: number; celdas: (Celda | null)[]; presidente: Segmento[]; gobierno: Segmento[] }
export interface Bloque { id: string; filas: FilaAnio[]; sesiones: number; palabras: number; filas_v2: number; celdas: Celda[] }
export interface Rejilla { bloques: Bloque[]; salto: { desde: string; hasta: string; n: number } | null; meses: MesDato[] }

export const ETAPAS_ORDEN = ['I', 'II', 'III', 'IV', 'V'] as const;

export function claseDe(p: number, clases: Clase[]): number {
  for (const c of clases) if (p <= c.hasta) return c.i;
  return clases[clases.length - 1].i;
}

/** La rejilla completa. `soloEtapa` recorta a una etapa (F01e). */
export function rejilla(meses: MesDato[], sesiones: SesionDato[], cal: CalendarioDato, soloEtapa?: string): Rejilla {
  const idx = new Map(meses.map((m, i) => [m.mes, i]));
  const ordenadas = [...sesiones].sort((a, b) => (a.f === b.f ? a.s - b.s : a.f < b.f ? -1 : 1));
  const porMes = new Map<string, SesionDato[]>();
  for (const s of ordenadas) {
    const k = s.f.slice(0, 7);
    if (!porMes.has(k)) porMes.set(k, []);
    porMes.get(k)!.push(s);
  }
  const bloques: Bloque[] = [];
  for (const e of ETAPAS_ORDEN) {
    if (soloEtapa && e !== soloEtapa) continue;
    const delBloque = meses.filter((m) => m.e === e);
    if (!delBloque.length) continue;
    const anios = [...new Set(delBloque.map((m) => Number(m.mes.slice(0, 4))))].sort((a, b) => a - b);
    let orden = 0;
    const celdasBloque: Celda[] = [];
    const filas: FilaAnio[] = anios.map((anio) => {
      const celdas: (Celda | null)[] = Array.from({ length: 12 }, (_, i) => {
        const k = `${anio}-${String(i + 1).padStart(2, '0')}`;
        const d = delBloque.find((m) => m.mes === k);
        if (!d) return null;
        const ses = porMes.get(k) ?? [];
        // Una ranura por FECHA: las dos sesiones de un mismo día comparten la suya, a media barra cada una.
        const fechas = [...new Set(ses.map((s) => s.f))];
        const barras: Barra[] = [];
        fechas.forEach((f, j) => {
          const del = ses.filter((s) => s.f === f);
          del.forEach((s, q) => {
            const x0 = (j + q / del.length) / fechas.length;
            const x1 = (j + (q + 1) / del.length) / fechas.length;
            barras.push({
              s, h: s.pal / cal.escala.palabras, u: s.dip / cal.escala.diputados, x0, x1,
              doble: del.length > 1, puerta: cal.puertas[s.clave], orden: orden++,
            });
          });
        });
        const c: Celda = {
          mes: k, m: i + 1, anio, estado: d.estado, clase: d.estado === 'sesion' ? claseDe(d.pal, cal.clases) : null,
          dato: d, n: idx.get(k) ?? 0, barras,
        };
        celdasBloque.push(c);
        return c;
      });
      return { anio, celdas, presidente: [], gobierno: [] };
    });
    // F16: los tramos del proyecto, partidos por fila de año y colocados en unidades de mes.
    for (const banda of ['presidente', 'gobierno'] as const) {
      for (const t of cal.tramos[banda].filter((x) => x.etapa === e)) {
        const del = filas.flatMap((fa) => fa.celdas.flatMap((c) => (c ? c.barras : [])).map((b) => ({ fa, b })))
          .filter(({ b }) => b.s.f >= t.desde && b.s.f <= t.hasta && (banda === 'presidente' ? b.s.meta.pres : b.s.meta.gob) === t.clave);
        const porFila = new Map<number, { fa: FilaAnio; bs: Barra[] }>();
        for (const x of del) {
          if (!porFila.has(x.fa.anio)) porFila.set(x.fa.anio, { fa: x.fa, bs: [] });
          porFila.get(x.fa.anio)!.bs.push(x.b);
        }
        const partes = [...porFila.values()].sort((p, q) => p.fa.anio - q.fa.anio);
        partes.forEach((p, i) => {
          const pri = p.bs[0], ult = p.bs[p.bs.length - 1];
          const mi = (b: Barra) => Number(b.s.f.slice(5, 7)) - 1;
          p.fa[banda].push({
            tramo: t, banda, a: mi(pri) + pri.x0, b: mi(ult) + ult.x1,
            viene: i > 0, sigue: i < partes.length - 1, n: p.bs.length,
          });
        });
      }
    }
    const ses = ordenadas.filter((s) => s.e === e);
    bloques.push({
      id: e, filas, celdas: celdasBloque, sesiones: ses.length,
      palabras: ses.reduce((a, s) => a + s.pal, 0), filas_v2: ses.reduce((a, s) => a + s.filas, 0),
    });
  }
  const salto = meses.filter((m) => m.estado === 'salto');
  return {
    bloques,
    salto: salto.length ? { desde: salto[0].mes, hasta: salto[salto.length - 1].mes, n: salto.length } : null,
    meses,
  };
}

/** Tramos seguidos de meses sin sesión (para la tabla: una fila por hueco, con su rango). */
export function filasTabla(meses: MesDato[], etapa?: string): ({ tipo: 'mes'; m: MesDato } | { tipo: 'hueco'; desde: string; hasta: string; n: number; estado: Estado })[] {
  const out: ({ tipo: 'mes'; m: MesDato } | { tipo: 'hueco'; desde: string; hasta: string; n: number; estado: Estado })[] = [];
  let hueco: MesDato[] = [];
  const cierra = () => {
    if (!hueco.length) return;
    out.push({ tipo: 'hueco', desde: hueco[0].mes, hasta: hueco[hueco.length - 1].mes, n: hueco.length, estado: hueco[0].estado });
    hueco = [];
  };
  for (const m of meses) {
    if (etapa && m.e !== etapa) continue;
    if (m.estado === 'sesion') { cierra(); out.push({ tipo: 'mes', m }); }
    else { if (hueco.length && hueco[hueco.length - 1].estado !== m.estado) cierra(); hueco.push(m); }
  }
  cierra();
  return out;
}

/**
 * ¿Cabe el nombre del tramo en su segmento? Se decide en la compilación para dos anchos de referencia (la fila de
 * 12 meses: desde 80 rem, desde 64 rem y en el móvil), con un ancho medio de carácter de la garamond de
 * nota. Lo que no cabe no se pinta: el nombre está en la nota y en la tabla. Se mide CON el espaciado de texto de
 * WCAG 1.4.12 (0,12 em entre letras y 0,16 em entre palabras, sobre los 12,8 px del rótulo): un nombre que solo cabe
 * con el espaciado por defecto se recortaría al aumentarlo («Negrín I», 11 px a 1.440), así que no se rotula.
 */
export function cabe(segmento: Segmento, texto: string): { ancho: boolean; medio: boolean; estrecho: boolean } {
  const w = segmento.b - segmento.a;
  const espacios = (texto.match(/\s/g) ?? []).length;
  // relleno y filete (14 px) y, si el tramo sigue en la fila siguiente, su flecha de 0,7 rem con su hueco (15 px)
  const necesita = (px: number) => texto.length * (px + 0.12 * 12.8) + espacios * 0.16 * 12.8 + 14 + (segmento.sigue ? 15 : 0);
  // anchos de mes medidos en Cortes: 52 px a 64 rem, 67 px a 80 rem, 76 px a 90 rem; en el móvil, ~24 px
  return { ancho: w * 66 >= necesita(6.6), medio: w * 51 >= necesita(6.6), estrecho: w * 24 >= necesita(6.2) };
}
