/**
 * Remates de un HTML con enlaces (el que devuelve `tEnlaces`), iguales en todas las páginas:
 *  · el explorador y la app de Afinidades abren SIEMPRE en otra pestaña, y lo dicen. La frase que lo dice
 *    (`comun.enlace.otra_pestana`) vive UNA vez por página, oculta, en el pie de `Base.astro`; cada enlace la
 *    señala con `aria-describedby`;
 *  · un enlace que todavía no tiene destino no se pinta como enlace muerto: en la vista previa queda marcado como
 *    pendiente y en publicación (STRICT=1) la compilación FALLA.
 */
import { escapa } from './cifras';
import { ENLACES } from '../config/enlaces';

const ESTRICTO = process.env.STRICT === '1';

/** Destino provisional de un corchete del copy que aún no tiene URL. */
export const SIN_DESTINO = '#sin-destino';
/** id de la nota «Se abre en otra pestaña.» que pinta `Base.astro`. */
export const ID_NOTA_PESTANA = 'nota-otra-pestana';

const escapaRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const HERRAMIENTAS = [ENLACES.explorador, ENLACES.afinidades].map((u) => escapaRe(escapa(u)));
// Solo los enlaces que aún no llevan `target`: pasar dos veces por aquí no duplica atributos.
const A_HERRAMIENTA = new RegExp(`<a\\b(?![^>]*\\btarget=)([^>]*?)href="((?:${HERRAMIENTAS.join('|')})[^"]*)"`, 'g');

export const enOtraPestana = (html: string) =>
  html.replace(A_HERRAMIENTA, (_todo, antes: string, href: string) => `<a${antes}href="${href}" target="_blank" aria-describedby="${ID_NOTA_PESTANA}"`);

export function sinDestino(html: string, opcional = false): string {
  return html.replace(/\s*<a [^>]*href="#sin-destino"[^>]*>([^<]*)<\/a>/g, (_todo, etiqueta: string) => {
    if (!ESTRICTO) return ` <mark class="pendiente" data-pendiente="destino">${etiqueta}</mark>`;
    if (opcional) return '';
    throw new Error(`El enlace «${etiqueta}» no tiene destino y el copy lo exige: no se publica sin él.`);
  });
}

/**
 * Un rótulo de años («1933-1935») no se parte por el guion al final de línea: se envuelve en `.nw` (base.css), solo en
 * el texto, nunca dentro de una etiqueta (peticiones/datos.md 4; antes lo hacían a mano Datos y Versiones).
 */
export const anios = (html: string) =>
  html.replace(/(^|>)([^<]+)/g, (_x, a: string, txt: string) => a + txt.replace(/\b(1[89]\d\d)-(1[89]\d\d)\b/g, '<span class="nw">$1-$2</span>'));

export const remata = (html: string, opcional = false) => anios(sinDestino(enOtraPestana(html), opcional));
