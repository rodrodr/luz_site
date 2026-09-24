/**
 * El pintor genérico del copy: PINTA LO QUE HAYA bajo un prefijo, en el ORDEN del copy.
 *
 * Mientras cada grupo escribe su copy con su propia estructura de claves (`cortes.1931.contexto.1.a`,
 * `cortes.1936.contexto.apertura.texto`…), las plantillas no pueden conocerlas todas de antemano. Este módulo recorre
 * las claves de un prefijo en el orden en que el copy las escribió (`copy2i18n.py` conserva ese orden) y decide cómo
 * pintar cada una por su ÚLTIMO segmento:
 *   `titulo` → H3 · `consulta` → la consulta copiable (con su `filtros` y su `recuento` hermanos) · `fuentes`, `anclas`,
 *   `pie`, `nota`, `ids` → nota pequeña · `salvedad` → salvedad al margen · `accion`, `llamada`, `botones`, `enlace` →
 *   botones (cada [rótulo] recibe el destino de su rótulo único, comun.md § 3) · `cita` → cita copiable · el resto,
 *   bloques (párrafos, listas, código).
 * Lo que es de una figura (segmentos `tabla`, `col`, `leyenda`, `conmuta`, `eje`, `alt`) no se pinta aquí.
 * Tras cada clave se pintan las frases fijas y los rótulos que el copy repitió justo detrás con `↺`
 * (`src/i18n/anclas/<lang>.json`): una llamada o una salvedad fija cae donde la quiso su autor.
 *
 * Es andamiaje: cuando el dueño de una página coloca sus textos a mano, este pintor deja de usarse ahí.
 */
import { t, plano, rotulo, tBloques, tEnlaces, existe, claves, aPlano, conIcono } from './i18n';
import { escapa, marcaPendiente, type Contexto } from './cifras';
import { htmlConsulta, htmlCita } from './piezas';
import { remata } from './remata';
import { url, recurso, PAGINAS } from './rutas';
import { paginaDe } from './figuras';
import { ENLACES, hrefContacto } from '../config/enlaces';
import type { Lang } from './idiomas';

const ANCLAS_MOD = import.meta.glob<{ default: Record<string, string[]> }>('../i18n/anclas/*.json', { eager: true });
const ANCLAS: Record<string, string[]> = Object.entries(ANCLAS_MOD).find(([r]) => r.endsWith('/es.json'))?.[1].default ?? {};

/** Las frases fijas y rótulos que el copy repitió (↺) justo detrás de `clave`. */
export const anclasTras = (clave: string) => ANCLAS[clave] ?? [];

/** Destino de cada rótulo único (comun.md § 3). `null`: el destino depende de la página (lo da ella). */
export function destinoBoton(lang: Lang, clave: string, contexto = ''): string | null {
  const cgocus = /^afinidades\b/.test(contexto);
  const D: Record<string, string | null> = {
    'comun.boton.descargar': url(lang, `${PAGINAS.datos}#empezar`),
    'comun.boton.dataverse': cgocus ? ENLACES.cgocus : ENLACES.thqcmi,
    'comun.boton.explorador': ENLACES.explorador,
    'comun.boton.afinidades': contexto.includes('diputado') || contexto.includes('puentes') ? ENLACES.afinidadesDiputados : ENLACES.afinidadesRed,
    'comun.boton.ver_cortes': url(lang, PAGINAS.cortes),
    'comun.boton.ver_sesiones': url(lang, PAGINAS.sesiones),
    'comun.boton.ver_votaciones': url(lang, `${PAGINAS.sesiones}#votaciones`),
    'comun.boton.ver_diario': url(lang, PAGINAS.diario),
    'comun.boton.ver_metodo': url(lang, PAGINAS.metodo),
    'comun.boton.ver_columnas': url(lang, `${PAGINAS.datos}#columnas`),
    'comun.boton.ver_explorador': url(lang, PAGINAS.explorador),
    'comun.boton.ver_afinidades': url(lang, PAGINAS.afinidades),
    'comun.boton.ir_inicio': url(lang),
    'comun.boton.errata': ENLACES.erratas,
    'comun.boton.escribirnos': hrefContacto(),
    'comun.boton.unir': url(lang, `${PAGINAS.datos}#unir`),
    // Rótulos que la fase 1 dejó sin fila en comun.md § 3 (REVISION_FASE1 P2-12). Sus claves son la PROPUESTA del
    // andamiaje (docs/peticiones/integrador-diseno.md): cuando el copy las cree, los corchetes las encuentran solas.
    'comun.boton.ver_citar': url(lang, `${PAGINAS.datos}#citar`),
    'comun.boton.ver_procedencia': recurso('datos/procedencia.csv'),
    'comun.boton.ver_calendario': url(lang, paginaDe('F01')),
  };
  return D[clave] ?? null;
}

/**
 * Mientras el copy no les dé fila en comun.md § 3, estos corchetes se reconocen por su rótulo ESPAÑOL (sin «↗») y
 * reciben el destino de la clave propuesta. Dos rótulos para un destino se anotan como tales: el copy debe unificarlos
 * (un rótulo por destino). Cuando exista `comun.boton.<x>`, manda la clave y esta tabla sobra.
 */
const PROVISIONALES: Record<string, string> = {
  'Ver cómo citar': 'comun.boton.ver_citar',
  'De dónde sale cada cifra': 'comun.boton.ver_procedencia',
  'Where each number comes from': 'comun.boton.ver_procedencia',
  'Ver el calendario completo': 'comun.boton.ver_calendario',
  'Ver las figuras de Las Cortes': 'comun.boton.ver_calendario', // mismo destino: unificar con el anterior
  'Ver qué significa cada columna': 'comun.boton.ver_columnas', // duplica [Ver qué trae cada columna]: unificar
};

/** Rótulo visible (sin corchetes) → clave del rótulo único, para dar destino a un [corchete] del copy. */
function botonPorRotulo(lang: Lang): Map<string, string> {
  const m = new Map<string, string>();
  for (const [r, k] of Object.entries(PROVISIONALES)) m.set(r, k); // en español: en inglés, el copy traerá sus claves
  for (const k of claves('comun.boton.')) m.set(aPlano(rotulo(lang, k)), k);
  return m;
}
const FIGURA = new Set(['tabla', 'col', 'leyenda', 'conmuta', 'conmutador', 'eje', 'alt', 'meta']);
const NOTAS = new Set(['fuentes', 'anclas', 'pie', 'nota', 'ids', 'recuento_nota']);
const BOTONES = new Set(['accion', 'llamada', 'botones', 'enlace', 'enlaces', 'descargar', 'copiar', 'abrir']);

/** Da destino a los [corchetes] de un texto: los rótulos únicos, por su destino; los demás, por `destinos` en orden. */
export function conDestinos(lang: Lang, clave: string, ctx: Contexto = {}, destinos: (string | null | undefined)[] = []): string {
  const mapa = botonPorRotulo(lang);
  let i = 0;
  const html = t(lang, clave, ctx).replace(/(?<!⟦)\[([^\]⟦⟧]+)\](?!⟧)/g, (_x, etiqueta: string) => {
    const k = mapa.get(aPlano(etiqueta).replace(/\s*↗$/, ''));
    const href = (k ? destinoBoton(lang, k, clave) : null) ?? destinos[i++] ?? null;
    if (!href) return process.env.STRICT === '1'
      ? (() => { throw new Error(`«${clave}»: el enlace [${etiqueta}] no tiene destino.`); })()
      : `<mark class="pendiente" data-pendiente="destino">${etiqueta}</mark>`;
    const externo = /^https?:/.test(href);
    return `<a class="boton sec" href="${escapa(href)}"${externo ? ' rel="noopener external"' : ''}>${conIcono(etiqueta)}</a>`;
  });
  return remata(html);
}

/**
 * En un texto ya pintado, los [rótulos únicos] que el copy escribió como prosa reciben su destino. Los demás
 * corchetes —las marcas de referencia [A] e [I], p. ej.— se quedan como están.
 */
export function rotulosConDestino(lang: Lang, html: string, contexto = ''): string {
  const mapa = botonPorRotulo(lang);
  return html.replace(/(?<!⟦)\[([^\]⟦⟧]+)\](?!⟧)/g, (todo, et: string) => {
    const kb = mapa.get(aPlano(et).replace(/\s*↗$/, ''));
    const href = kb ? destinoBoton(lang, kb, contexto) : null;
    return href ? remata(`<a href="${escapa(href)}"${/^https?:/.test(href) ? ' rel="noopener external"' : ''}>${conIcono(et)}</a>`) : todo;
  });
}

/**
 * Las dos frases fijas que llevan su enlace SIN corchetes (el plan las escribe así, y así las repite el copy):
 *  · ↺ 13 termina en «Por qué hay dos →»: ese final es el enlace (con la flecha dibujada, no el carácter);
 *  · ↺ 11 termina en «…las diferencias, aquí.»: «aquí» (en inglés, «here») es el enlace.
 * Si el copy ya trae corchetes, `tEnlaces` los enlaza y esto no toca nada (petición comun-inicio A.3).
 */
export function enlaceFinal(lang: Lang, clave: string, href: string): string {
  const html = tEnlaces(lang, clave, [href]);
  if (/<a\b/.test(html)) return html;
  const a = (texto: string) => `<a href="${escapa(href)}">${texto}</a>`;
  const flecha = html.match(/^([\s\S]*?[.;:]\s+)([^.;:<>]+?)\s*→\s*(<\/span>)?\s*$/);
  if (flecha) return `${flecha[1]}${a(conIcono(`${flecha[2]} →`))}${flecha[3] ?? ''}`;
  const aqui = html.match(/^([\s\S]*\s)(aquí|here)([.]?\s*(<\/span>)?\s*)$/i);
  if (aqui) return `${aqui[1]}${a(aqui[2])}${aqui[3]}`;
  return html;
}

/** Una frase fija o un rótulo repetido con ↺, pintado en su forma: botón, sello, nota con enlace o frase. */
export function htmlFija(lang: Lang, clave: string): string {
  if (clave.startsWith('comun.boton.')) {
    const href = destinoBoton(lang, clave);
    if (!href) return `<p class="botones">${rotulo(lang, clave)}</p>`;
    return `<p class="botones">${remata(`<a class="boton sec" href="${escapa(href)}"${/^https?:/.test(href) ? ' rel="noopener external"' : ''}>${rotulo(lang, clave)}</a>`)}</p>`;
  }
  if (clave.startsWith('comun.sello.') || clave === 'comun.fija.sello.afin') {
    const base = clave.split('.').pop()!;
    return `<p class="pieza-sello"><span class="sello" data-sello="${escapa(base)}" data-base="${escapa(base)}">${t(lang, clave)}</span></p>`;
  }
  return `<p class="nota fija">${t(lang, clave)}</p>`;
}

export interface OpcionesResto {
  ctx?: Contexto;
  /** Segmentos (relativos al prefijo) que pinta otro (un componente, una figura): se saltan con todo lo que cuelga. */
  excluir?: string[];
  /** Destinos, por orden, de los [corchetes] que no son rótulos únicos. */
  destinos?: (string | null | undefined)[];
  /** Nivel de los títulos internos. */
  nivel?: 'h3' | 'h4';
}

/**
 * Pinta todas las claves bajo `prefijo.` en el orden del copy, salvo las de cabecera de sección (titulo, antetitulo,
 * entrada…, salvedad) y lo excluido. Devuelve el HTML y las claves que ha pintado.
 */
export function restoDe(lang: Lang, prefijo: string, o: OpcionesResto = {}): { html: string; pintadas: string[] } {
  const { ctx = {}, excluir = [], destinos = [], nivel = 'h3' } = o;
  const CABECERA = new Set(['titulo', 'antetitulo', 'salvedad', 'h1', 'h2']);
  // Se recorre TODO el prefijo en su orden: lo de cabecera y lo excluido no se pinta; lo que es de una figura tampoco,
  // pero las frases fijas que el copy ancló tras ello (una NotaBases tras una tabla) sí.
  const todas = claves(`${prefijo}.`, true);
  const clase = (k: string): 'pinta' | 'salta' | 'figura' => {
    const rel = k.slice(prefijo.length + 1);
    const segs = rel.split('.');
    if (segs.length === 1 && (CABECERA.has(segs[0]) || /^entrada(\.\d+)?$/.test(rel))) return 'salta';
    if (/^entrada\.\d+$/.test(rel)) return 'salta';
    if (excluir.some((x) => rel === x || rel.startsWith(x + '.'))) return 'salta';
    if (segs.some((s) => FIGURA.has(s))) return 'figura';
    return 'pinta';
  };
  const hechas = new Set<string>();
  const out: string[] = [];
  for (const k of todas) {
    const c = clase(k);
    if (c === 'figura') { for (const f of anclasTras(k)) out.push(htmlFija(lang, f)); continue; }
    if (c === 'salta') continue;
    if (hechas.has(k)) continue;
    hechas.add(k);
    const ultimo = k.split('.').pop()!;
    const hermano = (s: string) => { const h = k.replace(/\.[^.]+$/, `.${s}`); return existe(h) ? h : null; };
    if (ultimo === 'titulo') out.push(`<${nivel}>${t(lang, k, ctx)}</${nivel}>`);
    else if (ultimo === 'consulta') {
      const f = hermano('filtros'), r = hermano('recuento');
      if (f) hechas.add(f);
      if (r) hechas.add(r);
      out.push(htmlConsulta(lang, { consulta: plano(lang, k, ctx), filtros: f ? t(lang, f, ctx) : undefined, recuento: r ? t(lang, r, ctx) : undefined, aviso: false, compacta: true }));
    } else if (ultimo === 'cita') out.push(htmlCita(lang, { texto: t(lang, k, ctx), lenguaTexto: /\{\{dv\./.test(k) ? 'en' : undefined }));
    else if (NOTAS.has(ultimo) || ultimo.endsWith('_pie') || ultimo === 'recuento') out.push(`<div class="pieza-nota">${remata(tBloques(lang, k, ctx))}</div>`);
    else if (ultimo === 'salvedad') out.push(`<p class="salvedad">${t(lang, k, ctx)}</p>`);
    else if (BOTONES.has(ultimo)) out.push(`<p class="botones">${conDestinos(lang, k, ctx, destinos)}</p>`);
    else out.push(rotulosConDestino(lang, remata(tBloques(lang, k, ctx)), k));
    // Una cita literal del Diario o una referencia bibliográfica lleva sus propios números: la auditoría la exime y la
    // guarda de citas (letra a letra contra su fila) o la bibliografía (02b_BIBLIOGRAFIA.md) responden de ella.
    const rel = k.slice(prefijo.length + 1);
    const literal = /(^|\.)(cita|citas)(\.|$)/.test(rel) ? 'cita literal del Diario' : /(^|\.)(leer|fuentes|bibliografia|referencias)(\.|$)/.test(k) ? 'referencia bibliográfica' : '';
    if (literal && out.length) {
      const ultimaPieza = out[out.length - 1];
      if (literal.startsWith('cita') && ultimaPieza.startsWith('<div class="pieza-nota"')) {
        // El pie de un pasaje (V2 · v3) es una nota: se queda suelta para que la rejilla la suba al margen, a su altura.
        out[out.length - 1] = ultimaPieza.replace('<div class="pieza-nota"', `<div class="pieza-nota" data-audit-exento="${literal}"`);
      } else if (literal.startsWith('cita') && ultimo !== 'cita') {
        // Un pasaje del Diario (`….cita.<nombre>`): cursiva de libro, comilla colgada dentro de su caja (base.css › .pasaje).
        out[out.length - 1] = `<div class="pasaje" data-audit-exento="${literal}">${ultimaPieza}</div>`;
      } else out[out.length - 1] = `<div class="referencia" data-audit-exento="${literal}">${ultimaPieza}</div>`;
    }
    for (const f of anclasTras(k)) out.push(htmlFija(lang, f));
  }
  return { html: out.join('\n'), pintadas: [...hechas] };
}

/** La primera clave que exista de una lista de candidatas (p. ej. el rótulo del índice lateral), o la última como pendiente. */
export function primera(lang: Lang, candidatas: string[], ctx: Contexto = {}): string {
  const k = candidatas.find(existe);
  return k ? t(lang, k, ctx) : marcaPendiente(candidatas[0], 'copy');
}

/** Claves bajo `prefijo.` que ninguna parte de la plantilla ha pintado (para el aviso «sin sitio» de la vista previa). */
export function sinSitio(prefijo: string, usados: string[], ignorar: string[] = []): string[] {
  return claves(`${prefijo}.`, true).filter((k) => {
    const rel = k.slice(prefijo.length + 1);
    if (rel.startsWith('meta.')) return false;
    if (rel.split('.').some((s) => FIGURA.has(s))) return false;
    if (ignorar.some((x) => rel === x || rel.startsWith(x + '.'))) return false;
    return !usados.some((u) => k === u || k.startsWith(u + '.'));
  });
}

export { marcaPendiente, recurso };
