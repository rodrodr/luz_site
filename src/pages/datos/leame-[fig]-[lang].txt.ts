/**
 * LÉAME de cada figura con datos (plan § Figuras · Pestaña Datos): QUÉ MIDE · DENOMINADOR · SALVEDAD · BASE (huella y
 * fecha) · CITA, en texto plano, en las dos lenguas. Sale del registro `lib/figuras.ts`, del copy (`fig.<id>.*`) y del
 * sello del exportador; los archivos de datos (CSV, XLSX) los escribe el exportador en `public/datos/`.
 * Lo que aún falta se escribe ⟦así⟧ (vista previa); en publicación (STRICT=1), la compilación falla.
 * COLUMNAS: la cabecera de cada CSV de la figura, leída del archivo que escribió el exportador, con la definición de
 * cada columna si el copy la da (`fig.<id>.leame.col.<columna>`). Y dónde está la procedencia de cada cifra.
 */

/** Cabecera del CSV de una figura en `public/datos/` (la escribe el exportador); vacía si aún no existe. */
function cabecera(archivo: string): string[] {
  try {
    const linea = readFileSync(join(process.cwd(), 'public', 'datos', `${archivo}.csv`), 'utf-8').split('\n', 1)[0];
    return linea ? linea.split(',').map((c) => c.trim()) : [];
  } catch { return []; }
}
import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FIGURAS_CON_DATOS, figura, rutaDatos, paginaDe } from '../../lib/figuras';
import { plano, existe } from '../../lib/i18n';
import { huella } from '../../lib/cita';
import { esEdicion } from '../../lib/cifras';
import { url } from '../../lib/rutas';
import { LANGS, type Lang } from '../../lib/idiomas';
import { ETAPAS, PUERTAS_PUBLICADAS } from '../../lib/rutas';

export function getStaticPaths() {
  return FIGURAS_CON_DATOS.flatMap((f) => LANGS.map((lang) => ({ params: { fig: f.id, lang } })));
}

export const GET: APIRoute = ({ params, site }) => {
  const lang = params.lang as Lang;
  const f = figura(params.fig!)!;
  const p = (k: string) => (existe(k) ? plano(lang, k) : `⟦${k}⟧`);
  const primera = (k: string[], resto = '') => { const x = k.find(existe); return x ? plano(lang, x) : resto || `⟦${k[0]}⟧`; };
  const sub = { etapa: ETAPAS[0].slug, puerta: PUERTAS_PUBLICADAS[0].slug };
  const enlace = new URL(url(lang, paginaDe(f.id, sub)), site).href;
  // La base es «Luz y Taquígrafos» (una sola línea, con la huella de su archivo principal); las demás fuentes, con su sello.
  const fuentes = f.base.filter((b, i) => !esEdicion(b) || f.base.findIndex(esEdicion) === i);
  const bases = fuentes.map((b) => { const h = huella(b); return `${p(esEdicion(b) ? 'comun.sello.base' : `comun.sello.${b}`)}${h.huella ? ` · ${h.huella}` : ''}${h.fecha ? ` · ${h.fecha}` : ''}`; });
  const linea = (rotulo: string, valor: string) => `${rotulo.toUpperCase()}\n${valor}\n`;
  const cuerpo = [
    `${p(`${f.familia}.titulo`)}`,
    existe(`${f.familia}.pregunta`) ? p(`${f.familia}.pregunta`) : '',
    '',
    linea(primera(['comun.leame.que_mide'], 'Qué mide'), primera([`${f.familia}.leame.que_mide`, `${f.familia}.que_mide`])),
    linea(primera(['comun.leame.denominador'], 'Denominador'), primera([`${f.familia}.leame.denominador`, `${f.familia}.denominador`])),
    linea(primera(['comun.leame.salvedad', 'comun.fig.salvedad']), p(`${f.familia}.salvedad`)),
    linea(primera(['comun.leame.base', 'comun.fig.base']), bases.join('\n')),
    linea(primera(['comun.leame.archivos'], 'Archivos'), f.archivos.flatMap((a) => [rutaDatos(a, 'csv'), rutaDatos(a, 'xlsx')]).map((a) => a.replace(/^datos\//, '')).join('\n')),
    ...f.archivos.map((a) => { const cols = cabecera(a); return cols.length ? linea(primera(['comun.leame.columnas', 'datos.leame.columnas'], 'Columnas'), `${a}.csv\n` + cols.map((c) => existe(`${f.familia}.leame.col.${c}`) ? `${c}: ${plano(lang, `${f.familia}.leame.col.${c}`)}` : c).join('\n')) : ''; }),
    existe('datos.leame.procedencia') ? `${plano(lang, 'datos.leame.procedencia')}\n` : '',
    linea(primera(['comun.leame.cita', 'comun.cita.titulo']), `${p(`${f.familia}.titulo`)} · ${enlace}`),
    p('comun.fija.sin_formulario'),
    p('comun.fija.diario'),
  ].join('\n');
  if (process.env.STRICT === '1' && cuerpo.includes('⟦')) throw new Error(`LÉAME de ${f.id} (${lang}) con pendientes: ${cuerpo.match(/⟦[^⟧]+⟧/g)?.join(' ')}`);
  return new Response(cuerpo.replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
