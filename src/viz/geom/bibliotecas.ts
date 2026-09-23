/**
 * Geometría de F17 (las bibliotecas del proyecto, en el tiempo): un eje de fechas CORTADO. De la primera sesión al último
 * mes antes del salto (1931–1939) y del primer mes tras el salto a la última sesión (1945), con el hueco de los años
 * sin sesiones reducido a una franja fija: si se dibujara a escala, seis años vacíos se comerían la mitad del ancho.
 * El corte se dibuja con trazo discontinuo (lo que la base no trae, DESIGN.md § Shapes). Todo en porcentaje del ancho.
 */
const DIA = 86400000;
const t = (iso: string) => Date.parse(iso.slice(0, 10) + 'T00:00:00Z');
/** Primer día del mes siguiente a AAAA-MM. */
const mesSiguiente = (am: string) => { const [y, m] = am.split('-').map(Number); return Date.UTC(m === 12 ? y + 1 : y, m === 12 ? 0 : m, 1); };
const inicioMes = (am: string) => { const [y, m] = am.split('-').map(Number); return Date.UTC(y, m - 1, 1); };

export interface EjeCortado {
  /** Posición de una fecha, en % del ancho (0–100). */
  x: (iso: string) => number;
  /** Rótulos de año, centrados en el tramo del año que cae dentro del eje (así el año partido de 1931 no pisa a 1932). */
  marcas: { anio: number; x: number }[];
  /** Divisiones entre años (el 1 de enero), en %. */
  cortes: number[];
  /** La franja del salto, en %. */
  salto: { x0: number; x1: number };
}

export function ejeCortado(primera: string, ultima: string, saltoDesde: string, saltoHasta: string, franja = 4): EjeCortado {
  const a0 = inicioMes(primera.slice(0, 7));
  const a1 = inicioMes(saltoDesde);           // el tramo A termina donde empieza el primer mes sin sesiones
  const b0 = mesSiguiente(saltoHasta);        // el B empieza el mes siguiente al último sin sesiones
  const b1 = mesSiguiente(ultima.slice(0, 7));
  const da = (a1 - a0) / DIA, db = (b1 - b0) / DIA;
  const util = 100 - franja;
  const wa = (util * da) / (da + db), wb = util - wa;
  const r2 = (v: number) => Math.round(v * 100) / 100;
  const xt = (v: number) => {
    if (v <= a1) return r2(((v - a0) / DIA / da) * wa);
    if (v < b0) return r2(wa + franja / 2);
    return r2(wa + franja + ((Math.min(v, b1) - b0) / DIA / db) * wb);
  };
  const x = (iso: string) => xt(t(iso));
  const marcas: { anio: number; x: number }[] = [];
  const cortes: number[] = [];
  for (const [ini, fin] of [[a0, a1], [b0, b1]]) {
    for (let y = new Date(ini).getUTCFullYear(); y <= new Date(fin - 1).getUTCFullYear(); y++) {
      const desde = Math.max(ini, Date.UTC(y, 0, 1)), hasta = Math.min(fin, Date.UTC(y + 1, 0, 1));
      if (hasta <= desde) continue;
      marcas.push({ anio: y, x: r2((xt(desde) + xt(hasta - 1)) / 2) });
      if (Date.UTC(y, 0, 1) > ini) cortes.push(xt(Date.UTC(y, 0, 1)));
    }
  }
  return { x, marcas, cortes, salto: { x0: r2(wa), x1: r2(wa + franja) } };
}

/** Altura de la espiga de una sesión (en unidades del carril): crece con la RAÍZ CUADRADA de sus entradas, para que
 *  una sesión de veinte entradas se vea junto a la de 659 (la leyenda lo dice y enseña la mayor). */
export const altura = (entradas: number, maximo: number, alto: number, minimo = 2) =>
  Math.max(minimo, Math.round(Math.sqrt(entradas / Math.max(1, maximo)) * alto * 10) / 10);
