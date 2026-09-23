/**
 * ASERTO DE CITA (plan, plantilla E, movimiento 3: «el exportador comprueba cada cita letra a letra»; contrato de la
 * fase 2). El exportador (sesiones.py) ya comprueba cada fragmento de `docs/marcadores/citas.md` en su fila V2 y en su
 * fila v3, y escribe en `citas.json › pasajes` el TRAMO de la fila que va del primer fragmento al último. Aquí, en la
 * compilación, se comprueba lo que el lector va a leer: cada trozo entre «» del copy está, letra a letra, en el tramo
 * de una cita comprobada. Lo único que el copy puede cambiar es lo que dice su cabecera: cortar con «…», insertar
 * «[sic]» y escribir “ ” donde el texto trae comillas rectas; los espacios y saltos de línea se comparan normalizados.
 * Si una cita del copy no está, la compilación FALLA (en vista previa también: una cita inventada no se pinta nunca).
 */
import { dato } from '../../lib/datos';

export interface Pasaje {
  v2: number | null; v3: number | null; orador?: string; fecha: string; fragmentos: string[]; tramo: string;
  ediciones: 'V2+v3' | 'solo_v3' | 'solo_V2'; palabras?: number | null;
}
const PASAJES = dato<{ pasajes: Record<string, Pasaje> }>('citas')?.pasajes ?? null;

/** HTML del copy → texto, SIN quitar los corchetes (el «[sic]» se reconoce aquí, no en `plano`). */
const aTexto = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
const norm = (s: string) => s.replace(/[“”«»]/g, '"').replace(/\s+/g, ' ').trim();

/** Los trozos entre «» de primer nivel (dentro puede haber “ ”). */
export function entreComillas(texto: string): string[] {
  const out: string[] = [];
  let nivel = 0, buf = '';
  for (const ch of texto) {
    if (ch === '«') { if (nivel++ === 0) { buf = ''; continue; } }
    else if (ch === '»') { if (--nivel === 0) { out.push(buf); continue; } }
    if (nivel > 0) buf += ch;
  }
  return out;
}

/** Lo que el copy puede añadir se quita: [sic], «…», las comillas de los bordes. Devuelve los trozos que deben estar. */
export function piezas(segmento: string): string[] {
  return segmento
    .replace(/\s*\[sic\]\s*/g, ' ')
    .split('…')
    .map((p) => norm(p).replace(/^["\s]+|["\s]+$/g, '').trim())
    .filter((p) => /[\p{L}\p{N}]/u.test(p));
}

/**
 * Comprueba una cita del copy (su HTML, tal como sale de `t()`) y devuelve la clave de `citas.json` que la sostiene. `preferida`: la clave
 * que nombra el pie (`cita.<clave>.V2`), que se prueba la primera. Lanza un error si no está.
 */
export function asertaCita(copyClave: string, textoPlano: string, preferida?: string | null): { clave: string; pasaje: Pasaje } | null {
  if (!PASAJES) {
    if (process.env.STRICT === '1') throw new Error('Falta src/data/citas.json: sin él no se puede comprobar ninguna cita (python3 exportador/exportar.py).');
    return null;
  }
  const trozos = entreComillas(aTexto(textoPlano)).flatMap(piezas);
  if (!trozos.length) return null;
  const candidatas = [...(preferida && PASAJES[preferida] ? [preferida] : []), ...Object.keys(PASAJES)];
  // Toda la cita en una sola cita comprobada (lo normal) o, si el copy une trozos de dos citas (dos filas o dos
  // fragmentos que citas.md registra aparte, p. ej. la Presidencia y el rótulo cortado de V2 25979), cada trozo en la suya.
  for (const k of candidatas) {
    const tramo = norm(PASAJES[k].tramo ?? '');
    if (trozos.every((p) => tramo.includes(p))) return { clave: k, pasaje: PASAJES[k] };
  }
  const donde = trozos.map((p) => candidatas.find((k) => norm(PASAJES[k].tramo ?? '').includes(p)));
  if (donde.every(Boolean)) return { clave: donde[0]!, pasaje: PASAJES[donde[0]!] };
  const falta = trozos.find((p) => !candidatas.some((k) => norm(PASAJES[k].tramo ?? '').includes(p)));
  throw new Error(`Aserto de cita: «${falta ?? trozos[0]}» (${copyClave}) no está letra a letra en ninguna cita comprobada de citas.json. `
    + 'Corrija el copy o añada la cita a docs/marcadores/citas.md (y vuelva a exportar).');
}
