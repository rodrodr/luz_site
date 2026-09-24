#!/usr/bin/env node
/**
 * Auditoría de `dist/`: NINGÚN número sin procedencia llega al lector, y toda cifra dice su base.
 *
 *   node scripts/audit-cifras.mjs            (vista previa: los pendientes se listan y no fallan)
 *   STRICT=1 node scripts/audit-cifras.mjs   (publicación: los pendientes también fallan)
 *   node scripts/audit-cifras.mjs --dist=DIR
 *
 * Qué comprueba, página por página (plan § Pruebas y puertas; contrato § Cifras):
 *  0. que `dist/` esté ENTERO: con menos páginas de las que el sitio tiene, un ✓ no diría nada;
 *  1. el texto visible de <body> (cabecera y pie incluidos) no lleva dígitos fuera de un envoltorio con procedencia
 *     (`data-k`), de <code>, <pre>, <time>, de los pendientes marcados, de lo declarado exento y de la lista blanca
 *     (la de check-i18n: años de un hecho, fechas de sesión, artículos, versiones, literales de docs/marcadores/);
 *  2. todo <data> y todo `[data-k]` trae `data-base` de una base conocida (V2 · v3 · proyecto · afin · dv · explorador ·
 *     croquis); si su clave está en `src/data/cifras.json`, su `value` es el del dato y su base, la del dato;
 *  3. (retirada el 24-09-2026: la NotaBases de las ediciones. El sitio presenta la base corregida y no habla de
 *     ediciones; la base de cada cifra sigue en su `data-base`, para esta auditoría y para procedencia.csv)
 *     id (peticiones/inicio_cortes.md A.1: Inicio no cabe con ↺ 13 dentro de sus topes);
 *  4. la lista negra del prototipo de 1931 y de las cifras superadas (scripts/vetos.mjs), en el texto visible;
 *  5. ningún recurso de terceros (scripts, estilos, imágenes, fuentes, iframes): lo que hace cierta la línea de
 *     privacidad del pie;
 *  6. los pendientes (⟦…⟧ del copy o del dato, huecos de figura, pendientes del investigador) y las descripciones de
 *     más de 155 caracteres: se listan; en publicación, fallan.
 * Node puro, sin dependencias.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VETOS, literalesBlancos, tecleados } from './vetos.mjs';

const RAIZ = fileURLToPath(new URL('../', import.meta.url));
const ESTRICTO = process.env.STRICT === '1' || process.argv.includes('--strict');
const BASES = new Set(['V2', 'v3', 'proyecto', 'afin', 'dv', 'explorador', 'croquis']);
/** 21 páginas por lengua en la edición 0.1 (sin Versiones desde el 24-09-2026), más la raíz y el 404. */
const PAGINAS_MINIMAS = 21 * 2 + 2;

// ── HTML mínimo: un árbol suficiente para auditar la salida (bien formada) de Astro ──────────────
const VACIOS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const CRUDOS = new Set(['script', 'style', 'textarea', 'title']);
const EN_LINEA = new Set(['a', 'abbr', 'b', 'cite', 'code', 'data', 'em', 'i', 'mark', 'q', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'tspan', 'u', 'svg', 'use']);
const RE_ETIQUETA = /<(\/?)([a-zA-Z][^\s/>]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/y;
const RE_ATRIBUTO = /([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', laquo: '«', raquo: '»', middot: '·', hellip: '…' };
const decodifica = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (todo, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENTIDADES[e.toLowerCase()] ?? todo);
const norm = (s) => s.replace(/[\s  ]+/g, ' ').trim();

function analiza(html) {
  const raiz = { tag: '#raiz', attrs: {}, hijos: [], padre: null };
  let actual = raiz, i = 0;
  const texto = (s) => { if (s) actual.hijos.push({ tag: '#texto', texto: decodifica(s), padre: actual }); };
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) { texto(html.slice(i)); break; }
    texto(html.slice(i, lt));
    if (html.startsWith('<!--', lt)) { const f = html.indexOf('-->', lt + 4); i = f < 0 ? html.length : f + 3; continue; }
    if (html[lt + 1] === '!' || html[lt + 1] === '?') { const f = html.indexOf('>', lt); i = f < 0 ? html.length : f + 1; continue; }
    RE_ETIQUETA.lastIndex = lt;
    const m = RE_ETIQUETA.exec(html);
    if (!m) { texto('<'); i = lt + 1; continue; }
    i = lt + m[0].length;
    const tag = m[2].toLowerCase();
    if (m[1]) { let n = actual; while (n && n.tag !== tag) n = n.padre; if (n && n.padre) actual = n.padre; continue; }
    const attrs = {};
    for (const a of m[3].matchAll(RE_ATRIBUTO)) attrs[a[1].toLowerCase()] = decodifica(a[2] ?? a[3] ?? a[4] ?? '');
    const nodo = { tag, attrs, hijos: [], padre: actual };
    actual.hijos.push(nodo);
    if (VACIOS.has(tag) || /\/\s*$/.test(m[3])) continue;
    if (CRUDOS.has(tag)) {
      const fin = html.toLowerCase().indexOf(`</${tag}`, i);
      nodo.hijos.push({ tag: '#texto', texto: html.slice(i, fin < 0 ? html.length : fin), padre: nodo });
      const c = html.indexOf('>', fin); i = c < 0 ? html.length : c + 1; continue;
    }
    actual = nodo;
  }
  return raiz;
}
function busca(nodo, pred, out = []) {
  for (const h of nodo.hijos ?? []) { if (h.tag === '#texto') continue; if (pred(h)) out.push(h); busca(h, pred, out); }
  return out;
}
function textoDe(nodo, omite = () => false) {
  let s = '';
  const baja = (n) => {
    if (n.tag === '#texto') { s += n.texto; return; }
    if (['script', 'style', 'template', 'title', 'desc'].includes(n.tag)) { s += ' '; return; }
    if (omite(n)) { s += ' '; return; }
    const separa = !EN_LINEA.has(n.tag);
    if (separa) s += ' ';
    n.hijos.forEach(baja);
    if (separa) s += ' ';
  };
  baja(nodo);
  return norm(s);
}
const tieneClase = (n, c) => (n.attrs.class ?? '').split(/\s+/).includes(c);

function paginasHtml(dist) {
  const out = [];
  const anda = (dir) => {
    for (const f of readdirSync(dir)) {
      const ruta = join(dir, f);
      if (statSync(ruta).isDirectory()) anda(ruta);
      else if (f.endsWith('.html')) out.push({ ruta, rel: relative(dist, ruta).split(sep).join('/') });
    }
  };
  anda(dist);
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

// ── la auditoría ─────────────────────────────────────────────────────────────────────────────────
const RECURSO = { script: ['src'], img: ['src', 'srcset'], source: ['src', 'srcset'], video: ['src', 'poster'], audio: ['src'], iframe: ['src'], embed: ['src'], object: ['data'], use: ['href'], image: ['href'] };
const REL_QUE_CARGA = /\b(stylesheet|preload|modulepreload|prefetch|preconnect|dns-prefetch|icon|manifest)\b/i;
const EXTERNA = /^(?:https?:)?\/\//i;

function main() {
  const arg = process.argv.find((a) => a.startsWith('--dist='));
  const dist = resolve(RAIZ, arg ? arg.slice(7) : 'dist');
  if (!existsSync(dist)) { console.error('✗ No existe dist/. Compile primero: npm run build'); process.exit(1); }
  const fCifras = join(RAIZ, 'src/data/cifras.json');
  const CIFRAS = existsSync(fCifras) ? JSON.parse(readFileSync(fCifras, 'utf8')) : {};
  const LITERALES = literalesBlancos(RAIZ);
  const errores = [], avisos = [];
  const pendientes = new Map(), largas = [];
  let nDatos = 0;
  const porBase = new Map();
  const falla = (rel, msg) => errores.push(`${rel}: ${msg}`);
  const anota = (clave, rel) => { if (!pendientes.has(clave)) pendientes.set(clave, new Set()); pendientes.get(clave).add(rel); };

  const paginas = paginasHtml(dist);
  if (paginas.length < PAGINAS_MINIMAS) errores.push(`dist/ tiene ${paginas.length} páginas y el sitio son al menos ${PAGINAS_MINIMAS}: la compilación está vacía o a medias`);

  for (const { ruta, rel } of paginas) {
    const doc = analiza(readFileSync(ruta, 'utf8'));

    // 2 · cifras con su base
    for (const d of busca(doc, (n) => n.tag === 'data' || 'data-k' in n.attrs)) {
      nDatos++;
      const k = d.attrs['data-k'], base = d.attrs['data-base'] ?? '';
      if (d.tag === 'data' && !k) { falla(rel, `<data> sin data-k: «${textoDe(d)}»`); continue; }
      if (!BASES.has(base) && base !== '') { falla(rel, `[data-k="${k}"] con data-base desconocida «${base}»`); continue; }
      if (!base) { (ESTRICTO ? errores : avisos).push(`${rel}: [data-k="${k}"] sin data-base (toda cifra dice su base)`); continue; }
      porBase.set(base, (porBase.get(base) ?? 0) + 1);
      const c = CIFRAS[k];
      if (c) {
        if (c.base && c.base !== base) falla(rel, `[data-k="${k}"] dice base «${base}» y el dato es de «${c.base}»`);
        if (d.tag === 'data' && typeof c.v !== 'object' && 'value' in d.attrs && String(d.attrs.value) !== String(c.v)) falla(rel, `<data data-k="${k}"> lleva value="${d.attrs.value}" y el dato es ${c.v}`);
      }
    }
    // 6 · pendientes
    for (const m of busca(doc, (n) => n.tag === 'mark' && tieneClase(n, 'pendiente'))) anota(textoDe(m).replace(/[⟦⟧]/g, ''), rel);
    for (const n of busca(doc, (x) => 'data-todo-fig' in x.attrs)) anota(`figura ${n.attrs['data-todo-fig']}`, rel);
    for (const n of busca(doc, (x) => 'data-todo-copy' in x.attrs)) anota('copy sin sitio en la plantilla', rel);
    const desc = busca(doc, (n) => n.tag === 'meta' && n.attrs.name === 'description')[0]?.attrs.content;
    if (desc !== undefined && [...desc].length > 155) largas.push(`${rel}: la descripción tiene ${[...desc].length} caracteres (máximo 155)`);

    // 5 · recursos de terceros
    for (const n of busca(doc, (x) => x.tag in RECURSO || x.tag === 'link')) {
      const attrs = n.tag === 'link' ? (REL_QUE_CARGA.test(n.attrs.rel ?? '') ? ['href'] : []) : RECURSO[n.tag];
      for (const a of attrs) {
        const ext = (n.attrs[a] ?? '').split(',').map((u) => u.trim().split(/\s+/)[0]).filter((u) => EXTERNA.test(u));
        if (ext.length) falla(rel, `recurso de terceros en <${n.tag} ${a}>: ${ext[0]}`);
      }
    }
    for (const s of busca(doc, (n) => n.tag === 'style')) if (/(?:@import|url\()\s*['"]?(?:https?:)?\/\//i.test(s.hijos[0]?.texto ?? '')) falla(rel, '<style> carga un recurso de terceros');

    // 1 · dígitos sin procedencia, y 4 · lista negra, en el texto visible de <body>
    const body = busca(doc, (n) => n.tag === 'body')[0];
    if (!body) { falla(rel, 'la página no tiene <body>'); continue; }
    if (!busca(doc, (n) => n.tag === 'main').length) falla(rel, 'la página no tiene <main>');
    const exento = (n) => 'data-k' in n.attrs || 'data-audit-exento' in n.attrs || 'data-todo-fig' in n.attrs || 'data-todo-copy' in n.attrs
      || ['code', 'pre', 'time', 'svg'].includes(n.tag) || (n.tag === 'mark' && tieneClase(n, 'pendiente'))
      || 'data-autoria' in n.attrs; // una cita bibliográfica: autores, año, DOI, versión
    const visible = textoDe(body, exento);
    const sueltos = tecleados(visible, LITERALES);
    for (const s of sueltos.slice(0, 6)) {
      const i = visible.indexOf(s);
      (ESTRICTO ? errores : avisos).push(`${rel}: número sin procedencia «${s}» en «…${visible.slice(Math.max(0, i - 40), i + s.length + 25)}…»`);
    }
    if (sueltos.length > 6) (ESTRICTO ? errores : avisos).push(`${rel}: …y ${sueltos.length - 6} números más sin procedencia`);
    const todo = textoDe(body, (n) => 'data-audit-exento' in n.attrs);
    for (const v of VETOS) {
      if (v.aviso || v.promesa || v.lengua === 'es' && /(^|\/)en\//.test(rel) || v.lengua === 'en' && !/(^|\/)en\//.test(rel)) continue;
      if (!/prototipo|superada/.test(v.por)) continue;
      const m = todo.match(v.re);
      if (m) falla(rel, `vetado (${v.por}) «${m[0]}»`);
    }
  }

  // el resto de dist/: ninguna hoja de estilo carga nada de fuera
  const anda = (dir) => {
    for (const f of readdirSync(dir)) {
      const ruta = join(dir, f);
      if (statSync(ruta).isDirectory()) { anda(ruta); continue; }
      if (f.endsWith('.css') && /(?:@import|url\()\s*['"]?(?:https?:)?\/\//i.test(readFileSync(ruta, 'utf8'))) errores.push(`${relative(dist, ruta)}: la hoja de estilo carga un recurso de terceros`);
    }
  };
  anda(dist);

  // ── informe ──
  console.log(`audit-cifras · ${paginas.length} páginas · ${nDatos} cifras con procedencia (${[...porBase].map(([b, n]) => `${b}: ${n}`).join(' · ') || 'ninguna'})${ESTRICTO ? ' · estricto' : ''}`);
  if (pendientes.size) {
    console.log(`\n${ESTRICTO ? '✗' : '⚠'} ${pendientes.size} pendientes (copy, datos, figuras o investigador):`);
    [...pendientes].sort((a, b) => b[1].size - a[1].size).slice(0, 60).forEach(([k, p]) => console.log(`  · ${k} — ${p.size} página${p.size > 1 ? 's' : ''} (p. ej. ${[...p][0]})`));
    if (pendientes.size > 60) console.log(`  · …y ${pendientes.size - 60} más`);
    if (ESTRICTO) errores.push(`${pendientes.size} pendientes bloquean la publicación`);
  }
  if (largas.length) { console.log(`\n${ESTRICTO ? '✗' : '⚠'} Descripciones demasiado largas:`); largas.forEach((l) => console.log('  · ' + l)); if (ESTRICTO) errores.push(...largas); }
  if (avisos.length) { console.log(`\n⚠ ${avisos.length} avisos:`); avisos.slice(0, 40).forEach((a) => console.log('  ⚠ ' + a)); if (avisos.length > 40) console.log(`  ⚠ …y ${avisos.length - 40} más`); }
  if (errores.length) { console.error(`\n✗ ${errores.length} problemas:`); errores.slice(0, 80).forEach((e) => console.error('  ✗ ' + e)); process.exit(1); }
  console.log('\n✓ Toda cifra con su base; nada del prototipo; ningún recurso de terceros.');
}
main();
