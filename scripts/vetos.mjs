/**
 * Listas compartidas por las dos puertas de texto: `check-i18n.mjs` (sobre el copy) y `audit-cifras.mjs` (sobre `dist/`).
 * Fuente: plan § Palabras y cifras vetadas y § Reglas editoriales; DESIGN.md; docs/marcadores/*.md (§ Lista blanca).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const MESES_ES = 'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre';
const MESES_EN = 'January|February|March|April|May|June|July|August|September|October|November|December';

/**
 * FORMAS con dígitos que no son cifras del corpus y pueden ir tecleadas (como en ParlaIbero): años de un hecho, fechas
 * de sesión, números de artículo, números de sesión y de página de una referencia, versiones, nombres de archivo…
 * Todo recuento, porcentaje o id de fila va SIEMPRE con marcador.
 */
export const FORMAS_BLANCAS = [
  /https?:\/\/[^\s<>"')]+/g,                                                   // una URL
  /\bdoi:\s*10\.\d{4,9}\/[^\s<>"',;)]+/gi, /\b10\.\d{4,9}\/[A-Z0-9/._-]+/gi,  // DOI
  /[\w.-]*\w\.(?:csv|xlsx|tab|txt|json|md|pdf|zip|ris|bib|png|svg|html|py|r|R|2replib|sqlite|gz)\b/g, // archivos
  /\b\d{1,2}(?:\s*(?:,|y|and|–|-)\s*\d{1,2})*-[IVX]{1,4}(?:-(?:1[89]\d\d))?\b/g, // 1-X-1931 · 13/14-X-1931 · 7–9-XI-1945
  /\b\d{1,2}\/\d{1,2}-[IVX]{1,4}-1[89]\d\d\b/g,
  /\b\d{2}\/\d{2}\/1[89]\d\d\b/g,                                             // Desde / Hasta del explorador: 16/03/1936
  /\b1[89]\d\d[–-]\d{2}\b/g,                                                   // rótulos de Tendencia: 1933–35, 1936–45
  new RegExp(`\\b\\d{1,2}(?:\\s*(?:y|,|–|-|al|a)\\s*\\d{1,2})*\\s+de\\s+(?:${MESES_ES})\\b`, 'gi'),  // 16 de junio · del 4 al 6 de julio
  new RegExp(`\\b\\d{1,2}(?:\\s*(?:and|,|–|-|to)\\s*\\d{1,2})*\\s+(?:${MESES_EN})\\b`, 'g'),       // 16 June · 4 to 6 July
  new RegExp(`\\b(?:${MESES_EN})\\s+\\d{1,2}\\b`, 'g'),
  /\b(?:art\.|arts\.|artículos?|articles?)\s+\d+(?:\s*(?:,|y|and|a|to|–|-)\s*\d+)*/gi,       // art. 34
  /\b(?:sesión|sesiones|session|sessions|núm\.|n\.º|nº|no\.)\s+\d+(?:\s*(?:,|y|and|a|to|–|-)\s*\d+)*/gi, // sesión 48 · sesiones 1 a 60
  /\bpp?\.\s*\d+(?:\s*[–-]\s*\d+)?/g,                                           // p. 524 · pp. 1347–1394
  /\b(?:V|v)\d+(?:\.\d+)*\b/g,                                                  // V2 · v3 · V1.1 · V2.0
  /\bCC BY \d\.\d\b/g, /\bUTF-8\b/g, /\b(?:MD5|SHA-?256|sha256|SHA-?1)\b/g, /\bISO 8601\b/g, /\bR \d\.\d(?:\.\d)?\b/g, /\bpandas \d(?:\.\d)*\b/g,
  /\b(?:1[89]\d\d|20[0-2]\d)(?:\s*[–-]\s*(?:1[89]\d\d|20[0-2]\d))?\b/g,         // años de un hecho y rótulos de legislatura
  /\b\d+(?:\.º|\.ª|º|ª)/g,                                                      // ordinales
  /\bsiglo\s+[IVXL]+\b/gi,
  /\b(?:edición|edition|ed\.)\s+0\.\d\b/gi,                                    // la edición 0.2 del sitio
];

/** Literales de las listas blancas del copy: las cadenas «…» con dígitos de las secciones «Lista blanca» de docs/marcadores/. */
export function literalesBlancos(raiz) {
  const dir = join(raiz, 'docs/marcadores');
  const out = new Set(['CC BY 4.0', 'UTF-8']);
  if (!existsSync(dir)) return [...out];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const md = readFileSync(join(dir, f), 'utf8');
    const secciones = md.split(/^## /m).filter((s) => /^\s*\d*\.?\s*Lista blanca/i.test(s));
    for (const s of secciones) for (const m of s.matchAll(/«([^»]+)»/g)) if (/\d/.test(m[1])) out.add(m[1].replace(/\*/g, ''));
  }
  return [...out];
}

/**
 * Palabras y cifras vetadas. `promesa: true` son promesas que el explorador no cumple: se admiten solo en las claves que
 * dicen lo que NO hace (`explorador.no_hace.*`, `*.limites.*`). `lengua` limita un veto a una lengua.
 */
export const VETOS = [
  // del prototipo de 1931
  { re: /\blibros? de códigos\b/i, por: 'prototipo' }, { re: /\bgrafo anotado\b/i, por: 'prototipo' },
  { re: /\bactos? afectivos?\b/i, por: 'prototipo' }, { re: /\biron[íi]a\b/i, por: 'prototipo' },
  { re: /\bhostilidad\b/i, por: 'prototipo' }, { re: /\bintensidad\b/i, por: 'prototipo' },
  { re: /\bíndice de reacción\b/i, por: 'prototipo' }, { re: /\bcodebook\b/i, por: 'prototipo', lengua: 'en' },
  { re: /\bannotated graph\b/i, por: 'prototipo' }, { re: /\baffective acts?\b/i, por: 'prototipo' },
  { re: /\breaction index\b/i, por: 'prototipo' }, { re: /\b(?:irony|hostility|intensity)\b/i, por: 'prototipo', lengua: 'en' },
  { re: /\b(?:defiende|critica|menciona)\b[^.;]*\b(?:defiende|critica|menciona)\b/i, por: 'prototipo (categorías)' },
  { re: /\b3\.874\b|\b3,874\b/, por: 'cifra del prototipo' }, { re: /\b324 oradores\b|\b324 speakers\b/i, por: 'cifra del prototipo' },
  { re: /\b90 sesiones\b|\b90 sessions\b/i, por: 'cifra del prototipo' }, { re: /\b23[.,]485\b/, por: 'cifra del prototipo' },
  { re: /\b10[.,]463\b/, por: 'cifra del prototipo' }, { re: /\b43 grupos\b|\b43 (?:thematic )?groups\b/i, por: 'cifra del prototipo' },
  // promesas que el explorador no cumple
  { re: /\beste enlace abre\b|\bthis link opens\b/i, por: 'promesa' , promesa: true },
  { re: /\bbúsqueda semántica\b|\bsemantic search\b/i, por: 'promesa', promesa: true },
  { re: /\bpor significado\b|\bby meaning\b/i, por: 'promesa', promesa: true },
  { re: /\bsemánticamente\b|\bsemantically\b/i, por: 'promesa', promesa: true },
  { re: /\bcomod[íi]n\b|\bwildcards?\b/i, por: 'promesa', promesa: true },
  { re: /\bNOT\b/, por: 'promesa (operador)', promesa: true },
  { re: /\bproximidad\b|\bproximity\b/i, por: 'promesa', promesa: true },
  { re: /\bfunciona sin conexión\b|\bworks offline\b/i, por: 'promesa (C4)', promesa: true },
  { re: /\bmismo diputado\b[^.]*\bsignificado\b|\bsame (?:deputy|member)\b[^.]*\bmeaning\b/i, por: 'promesa', promesa: true },
  // La cabecera de sesión con Diario, páginas, Presidencia o Gobierno es una promesa SOLO si se atribuye al explorador.
  { re: /\bcabecera de (?:la )?sesión\b[^.]*\b(?:Diario|páginas|Presidencia|Gobierno)\b/i, por: 'promesa', promesa: true, si: /explorador|explorer/i },
  // cifras y afirmaciones superadas
  { re: /\b34 millones\b|\b34 million\b/i, por: 'cifra superada' }, { re: /\b24 millones\b|\b24 million\b/i, por: 'cifra superada' },
  { re: /\b107[.,]000\b/, por: 'cifra superada' }, { re: /\b158 MB\b/, por: 'cifra superada (158,1 MB)' },
  { re: /\b774 diputados\b|\b774 (?:deputies|members)\b/i, por: 'cifra superada' },
  { re: /\b80 en las tres legislaturas\b/i, por: 'cifra superada (78)' }, { re: /\b94[.,]621\b/, por: 'cifra superada' },
  { re: /\b1[.,]446 diputados\b/i, por: 'cifra superada' }, { re: /\bsesión 48 entera\b/i, por: 'afirmación superada' },
  { re: /\b415 íntegras\b/i, por: 'afirmación superada' }, { re: /\belección de Martínez Barrio\b/i, por: 'afirmación superada' },
  { re: /\bcruza el eje izquierda-derecha\b/i, por: 'afirmación superada' },
  // tono de folleto
  { re: /\binnovador(?:a|es|as)?\b|\binnovative\b/i, por: 'tono' }, { re: /\bpróximamente\b|\bcoming soon\b/i, por: 'tono' },
  // «revolucionario» y «único» tienen usos legítimos («la huelga general revolucionaria», «el único mes sin sesión»):
  // avisan para que alguien mire la frase, no bloquean.
  { re: /\brevolucionari[oa]s?\b|\brevolutionary\b/i, por: 'tono', aviso: true }, { re: /\búnic[oa]s?\b/i, por: 'tono («único»)', lengua: 'es', aviso: true },
  { re: /\bunique\b/i, por: 'tono', lengua: 'en', aviso: true },
  // anglicismos innecesarios (en español)
  { re: /\b(?:tooltips?|kickers?|builds?|datasets?|landing|dashboards?|links?|online)\b/i, por: 'anglicismo', lengua: 'es' },
  { re: /\bficheros?\b/i, por: 'léxico («archivo»)', lengua: 'es' },
];

/**
 * Claves cuyo texto es literal de otra fuente y puede llevar dígitos: citas del Diario (se comprueban letra a letra contra
 * sus filas), consultas para el buscador del explorador y referencias bibliográficas (volumen, número, páginas).
 */
export const claveLiteral = (k) => /(^|\.)(cita|citas|consulta|leer|fuentes|bibliografia|referencias)(\.|$)/.test(k);

/** Rangos [inicio, fin) que cubren las formas blancas y los literales en `texto` (se buscan TODAS sobre el original). */
export function cubiertos(texto, literales) {
  const rangos = [];
  const escapaRe = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const re of [...FORMAS_BLANCAS, ...literales.map((l) => new RegExp(escapaRe(l), 'g'))]) {
    for (const m of texto.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) rangos.push([m.index, m.index + m[0].length]);
  }
  return rangos;
}
/** Dígitos de `texto` que no cubre ninguna forma ni literal: los números tecleados, con su palabra. */
export function tecleados(texto, literales) {
  const tapado = new Uint8Array(texto.length);
  for (const [a, b] of cubiertos(texto, literales)) tapado.fill(1, a, b);
  const out = [];
  for (const m of texto.matchAll(/\S*\d\S*/g)) {
    let libre = false;
    for (let i = m.index; i < m.index + m[0].length; i++) if (/\d/.test(texto[i]) && !tapado[i]) { libre = true; break; }
    if (libre) out.push(m[0]);
  }
  return out;
}

/** ¿La clave puede decir lo que el explorador NO hace? */
export const clavePuedePrometer = (k) => /^explorador\.no_hace\./.test(k) || /(^|\.)limites\./.test(k);
/** Claves exentas de un veto concreto (el verbo «defiende» en ↺ 6). */
export const EXENTAS = { 'comun.fija.contar': ['prototipo (categorías)'] };
