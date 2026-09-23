/**
 * F30 · La sesión, turno a turno: geometría pura (sin DOM). Una barra por fila V2, en su orden; la altura, sus palabras.
 * Quien tiene la palabra, encima de la línea; la Presidencia, debajo. La MISMA escala en todos los paneles de una
 * puerta: el ancho de un panel es el número de filas de la sesión más larga (una unidad por fila) y los altos de arriba
 * y de abajo se reparten según el máximo de cada lado, con la misma escala de palabras en los dos. La compilación escribe los `rect` y las posiciones (en %) de los
 * rótulos HTML.
 */
export interface Turno { o: number; id: number; p: number; pres: boolean; rep_id: number | null; rotulo: string; nombre?: string; corto?: string }
export interface SesionTurnos {
  clave: string; fecha: string; num: number; filas: number; palabras: number; diputados_sp: number; largas: number;
  filas_v3: number; habla_v3: number; max_palabras: number; truncadas: number[]; turnos: Turno[];
  diario_num?: number; sigla?: string; paginas?: [number, number];
}

/** Alto del viewBox (unidades): el panel se estira en CSS. */
export const ALTO = 100;
/** Alto mínimo de una barra, para que ninguna fila desaparezca (unidades del viewBox). */
const MINIMO = 0.9;

export interface Escala { ancho: number; arriba: number; abajo: number; hA: number; hB: number; hueco: number }

export function escala(sesiones: SesionTurnos[]): Escala {
  const ancho = Math.max(...sesiones.map((s) => s.turnos.length));
  const arriba = Math.max(1, ...sesiones.flatMap((s) => s.turnos.filter((t) => !t.pres).map((t) => t.p)));
  const abajo = Math.max(1, ...sesiones.flatMap((s) => s.turnos.filter((t) => t.pres).map((t) => t.p)));
  // Un respiro de 4 unidades para la línea base; el resto se reparte en proporción a cada máximo, así que arriba y
  // abajo comparten UNA sola escala de palabras por unidad. Sin piso: un piso estiraba las filas cortas de la
  // Presidencia (×2,4 en la cuestión religiosa, ×3,2 en Figueres) y las hacía parecer discursos. Cada fila conserva
  // su alto mínimo (MINIMO), así que ninguna desaparece.
  const util = ALTO - 4;
  const hB = (util * abajo) / (arriba + abajo);
  const hA = util - hB;
  return { ancho, arriba, abajo, hA, hB, hueco: 4 };
}

export interface Barra { x: number; y: number; w: number; h: number; t: Turno; i: number }

/** Las barras de una sesión. `y` es la parte de arriba del rectángulo. */
export function barras(s: SesionTurnos, e: Escala): Barra[] {
  const base = e.hA;
  const w = e.ancho > 160 ? 1 : e.ancho > 60 ? 0.8 : 0.66;
  return s.turnos.map((t, i) => {
    if (!t.pres) {
      const h = Math.max(MINIMO, (t.p / e.arriba) * e.hA);
      return { x: i + (1 - w) / 2, y: base - h, w, h, t, i };
    }
    const h = Math.max(MINIMO, (t.p / e.abajo) * e.hB);
    return { x: i + (1 - w) / 2, y: base + e.hueco, w, h, t, i };
  });
}

/** Posición (en % del alto) de un valor de palabras encima de la línea base. */
export const yArriba = (v: number, e: Escala) => ((e.hA - (v / e.arriba) * e.hA) / ALTO) * 100;
/** Posición (en % del alto) de un valor de palabras debajo de la línea base. */
export const yAbajo = (v: number, e: Escala) => ((e.hA + e.hueco + (v / e.abajo) * e.hB) / ALTO) * 100;

/** Marcas «redondas» del eje de palabras de arriba: como mucho dos líneas (más la base). */
export function marcasArriba(e: Escala): number[] {
  const bruto = e.arriba / 2;
  const mag = 10 ** Math.floor(Math.log10(bruto));
  const paso = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => p >= bruto * 0.7) ?? mag * 10;
  const out: number[] = [];
  for (let v = paso; v <= e.arriba; v += paso) out.push(v);
  return out.slice(0, 2);
}

/**
 * Hasta tres rótulos directos: las filas más largas de la puerta (de cualquier lado), separadas al menos un 16 % del
 * ancho para que no se pisen. Devuelve los índices de las barras.
 */
export function destacadas(s: SesionTurnos, e: Escala, n = 3, extra: number[] = []): number[] {
  const orden = s.turnos.map((t, i) => ({ i, p: t.p, pres: t.pres })).sort((a, b) => b.p - a.p);
  const elegidas: number[] = s.turnos.flatMap((t, i) => (extra.includes(t.id) ? [i] : []));
  for (const c of orden) {
    if (elegidas.length >= n) break;
    if (c.pres && !extra.includes(s.turnos[c.i].id)) continue;
    if (elegidas.every((j) => Math.abs(j - c.i) / e.ancho > 0.16)) elegidas.push(c.i);
  }
  return elegidas.sort((a, b) => a - b);
}
