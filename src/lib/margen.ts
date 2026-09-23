/**
 * El MARGEN VIVO de las fichas (DESIGN.md § Layout, «La regla del margen vivo»; grupo 2, fichas).
 *
 * El copy de las fichas escribe el asiento de cada hecho entre paréntesis, detrás de la frase que ancla:
 * «… con 386 votos (V2 101701 · v3 114881).» Aquí ese paréntesis sale del texto y se vuelve una NOTA AL MARGEN, con
 * una llamada volada en su lugar. El texto se lee limpio en la columna de libro y la costura (la fila de donde sale)
 * queda a su lado, en mono, como la anotaría el investigador a lápiz. En el móvil, la nota va detrás de su párrafo.
 *  · Solo se mueven los paréntesis que EMPIEZAN por «V2 » o «v3 » y llevan una cifra (`<data class="cifra">`): son
 *    ids de fila. Los demás paréntesis (una fecha, un aparte) se quedan donde están.
 *  · La cifra no se toca: sigue siendo el mismo `<data data-k data-base>` auditable, ahora dentro de la nota.
 *  · El número de la llamada y el de su nota los pone un contador de CSS (`fila-ll` / `fila-nota`): ningún dígito en el
 *    HTML (la auditoría de cifras no admite números sin procedencia) y siempre en sincronía, porque cada nota sigue a
 *    su párrafo en el documento. La llamada es decorativa (`aria-hidden`): quien usa un lector de pantalla oye la nota
 *    justo detrás del párrafo.
 */
import { escapa } from './cifras';

/** Texto plano de un trozo de HTML (sin etiquetas). */
const plano = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;| /g, ' ');

/** Posición del «)» que cierra el «(» de `desde`, sin contar los paréntesis que haya dentro de una etiqueta. */
function cierre(html: string, desde: number): number {
  let prof = 0;
  for (let i = desde; i < html.length; i++) {
    const c = html[i];
    if (c === '<') { const f = html.indexOf('>', i); if (f < 0) return -1; i = f; continue; }
    if (c === '(') prof++;
    else if (c === ')') { prof--; if (prof === 0) return i; }
  }
  return -1;
}

export interface Anotado { html: string; notas: string[] }

/** Saca al margen los paréntesis de ids de un bloque de HTML. Devuelve el bloque con sus llamadas y las notas. */
export function sacaIds(html: string): Anotado {
  const notas: string[] = [];
  let out = '';
  let i = 0;
  while (i < html.length) {
    const c = html[i];
    if (c === '<') { const f = html.indexOf('>', i); out += html.slice(i, f + 1); i = f + 1; continue; }
    if (c === '(') {
      const f = cierre(html, i);
      if (f > i) {
        const dentro = html.slice(i + 1, f);
        if (/^\s*(V2|v3)\s/.test(plano(dentro)) && /<data\b[^>]*class="cifra"/.test(dentro)) {
          notas.push(dentro.trim());
          out = out.replace(/[\s ]+$/, '');
          out += '<span class="fila-ll" aria-hidden="true"></span>';
          i = f + 1;
          continue;
        }
      }
    }
    out += c;
    i++;
  }
  return { html: out, notas };
}

/** Una nota al margen con los asientos de un bloque: una línea por fila citada, cada una con su número (CSS). */
// Una nota (role="note"), no una región complementaria: una ficha lleva decenas y llenaban la lista de regiones del
// lector de pantalla con nombres repetidos (axe landmark-unique). Su nombre lleva el primer asiento («Fila · V2 5423»).
export const notaFila = (asientos: string[], rotulo = '') =>
  `<div class="nota-m nota-fila" role="note"${rotulo ? ` aria-label="${escapa(asientos.length ? `${rotulo} · ${plano(asientos[0])}` : rotulo)}"` : ''}>`
  + asientos.map((a) => `<p class="asiento"><span class="fila-n" aria-hidden="true"></span>${a}</p>`).join('') + '</div>';

/**
 * Pinta bloques de HTML (párrafos, listas…) con su margen: cada bloque, seguido de UNA nota con sus asientos (si un
 * bloque tiene dos paréntesis de ids, lleva dos llamadas y su nota, dos líneas numeradas): así la nota nunca empuja al
 * párrafo siguiente a otra fila de la rejilla.
 */
export function conMargen(bloques: string[], rotulo = ''): string {
  return bloques.map((b) => {
    const a = sacaIds(b);
    return a.html + (a.notas.length ? notaFila(a.notas, rotulo) : '');
  }).join('\n');
}

/** Parte el HTML de `tBloques` en sus bloques de primer nivel (p, ul, ol, pre, h3, div). */
export function partes(html: string): string[] {
  const out: string[] = [];
  const re = /<(p|ul|ol|pre|h3|h4|div|blockquote)\b[^>]*>[\s\S]*?<\/\1>/g;
  let m: RegExpExecArray | null;
  let ultimo = 0;
  while ((m = re.exec(html))) {
    if (m.index > ultimo && html.slice(ultimo, m.index).trim()) out.push(html.slice(ultimo, m.index));
    out.push(m[0]);
    ultimo = re.lastIndex;
  }
  if (html.slice(ultimo).trim()) out.push(html.slice(ultimo));
  return out;
}
