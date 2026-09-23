/**
 * F26 · Lo que se votó en voz alta: geometría pura (sin DOM). La compilación la usa para escribir el SVG de cada fila y
 * las posiciones (en %) de los rótulos HTML que van encima. Una escala común a todas las filas, que empieza en cero.
 *
 * Cada fila: el tramo de los síes desde 0, el de los noes a continuación y, si el Diario imprime el número de
 * diputados de la Cámara, un contorno hasta ese total y la línea de la mitad más uno. La ordinaria (sin lista) usa el
 * mismo dibujo con otro trazo: lo decide el componente.
 */
export interface Voto {
  clave: string;
  fecha: string;
  num_session: number;
  legislatura: string;
  etapa: string;
  si: number;
  no: number;
  nominal: boolean;
  v2: number;
  v3: number;
  total?: number;
  mitad?: number;
  mitad_v2?: number;
  mitad_v3?: number;
  lista_v2?: number;
  lista_v3?: number;
  puerta?: string | null;
  literal?: string;
}

/** Ancho del lienzo de una fila en unidades del viewBox (una unidad = un diputado) y su alto. */
export const ALTO = 16;

/** Tope de la escala: el mayor total (o sí + no) redondeado a la decena superior. */
export function tope(votos: Voto[]): number {
  const max = Math.max(...votos.map((v) => Math.max(v.total ?? 0, v.si + v.no)));
  return Math.ceil(max / 10) * 10;
}

/** Marcas del eje: múltiplos de 100 hasta el tope (nunca más de cinco). */
export function marcasEje(t: number): number[] {
  const paso = t > 400 ? 100 : t > 200 ? 50 : 25;
  const out: number[] = [];
  for (let v = 0; v <= t; v += paso) out.push(v);
  return out;
}

export interface GeomFila {
  si: { x: number; w: number };
  no: { x: number; w: number };
  resto?: { x: number; w: number };
  mitad?: number;
  /** Posiciones en % del ancho (para los rótulos HTML). */
  pct: { finVotos: number; total?: number; mitad?: number };
}

export function fila(v: Voto, t: number): GeomFila {
  const votos = v.si + v.no;
  const g: GeomFila = {
    si: { x: 0, w: v.si },
    no: { x: v.si, w: v.no },
    pct: { finVotos: (votos / t) * 100 },
  };
  if (v.total && v.total > votos) {
    g.resto = { x: votos, w: v.total - votos };
    g.pct.total = (v.total / t) * 100;
  }
  if (v.mitad) {
    g.mitad = v.mitad;
    g.pct.mitad = (v.mitad / t) * 100;
  }
  return g;
}
