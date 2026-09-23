#!/usr/bin/env node
/**
 * Puerta de los diccionarios `src/i18n/{es,en}.json` (se GENERAN del copy: `npm run i18n`).
 *
 *   node scripts/check-i18n.mjs            (vista previa: en.json puede faltar; las frases largas avisan)
 *   node scripts/check-i18n.mjs --strict   (publicación: las dos lenguas completas, y las frases largas fallan)
 *
 * Falla si:
 *  · las claves de es y en no son las mismas, o hay un valor vacío;
 *  · los marcadores `{{…}}` de una clave no son los mismos en las dos lenguas (con su formato);
 *  · un texto lleva un NÚMERO TECLEADO: dígitos fuera de un marcador, de código y de la lista blanca (años de un hecho,
 *    fechas de sesión, números de artículo, versiones; más los literales de docs/marcadores/*.md › «Lista blanca»);
 *  · aparece una palabra o una cifra vetada (plan § Palabras y cifras vetadas): el prototipo de 1931, las promesas que el
 *    explorador no cumple (salvo en `explorador.no_hace.*` y `*.limites.*`), las cifras superadas, el tono de folleto y
 *    los anglicismos innecesarios.
 * Avisa (y con --strict falla) si una frase pasa de 30 palabras.
 * Node puro, sin dependencias.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VETOS, literalesBlancos, clavePuedePrometer, claveLiteral, tecleados, EXENTAS } from './vetos.mjs';

const RAIZ = fileURLToPath(new URL('../', import.meta.url));
const LANGS = ['es', 'en'];
const ESTRICTO = process.argv.includes('--strict');
const MAX_PALABRAS = 30;

const errores = [];
const avisos = [];
const DIC = {};
for (const l of LANGS) {
  const f = join(RAIZ, `src/i18n/${l}.json`);
  if (existsSync(f)) { DIC[l] = JSON.parse(readFileSync(f, 'utf8')); continue; }
  const msg = `no existe src/i18n/${l}.json (python3 scripts/copy2i18n.py ${l})`;
  if (l === 'es' || ESTRICTO) errores.push(msg); else avisos.push(msg + ' — esa lengua se pinta con el texto español, marcado');
}
if (!DIC.es) { console.error('✗ ' + errores.join('\n✗ ')); process.exit(1); }

const LITERALES = literalesBlancos(RAIZ);
const marcadores = (s) => [...s.matchAll(/\{\{([^{}]+)\}\}/g)].map((m) => {
  const [clave, fmt = ''] = m[1].replace(/^\s*NUEVO:/, '').split('|').map((x) => x.trim());
  return { clave, fmt };
});
/** Lo que se lee: sin código, sin marcadores (cuentan como una palabra) y sin las marcas del copy. */
const legible = (s) => s.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`\n]*`/g, ' ').replace(/\{\{[^{}]*\}\}/g, '⟨m⟩').replace(/\*\*?/g, '')
  .replace(/^\s*\d+\.\s+/gm, '- ');   // los ordinales de una lista numerada del copy son forma, no cifra

for (const l of LANGS.filter((x) => DIC[x])) {
  for (const [k, v] of Object.entries(DIC[l])) {
    const aqui = `${l}:${k}`;
    if (typeof v !== 'string' || !v.trim()) { errores.push(`${aqui}: valor vacío`); continue; }
    if ((v.match(/\{\{/g) ?? []).length !== (v.match(/\}\}/g) ?? []).length) errores.push(`${aqui}: llaves de marcador sin cerrar`);

    // número tecleado
    const sueltos = claveLiteral(k) ? [] : tecleados(legible(v), LITERALES);
    if (sueltos.length) errores.push(`${aqui}: número tecleado «${sueltos.slice(0, 4).join('» «')}» — va como {{marcador}} (o, si no es una cifra, en la lista blanca de docs/marcadores/)`);

    // palabras y cifras vetadas
    const texto = legible(v).replace(/https?:\/\/\S+/g, ' ');
    for (const veto of VETOS) {
      if (veto.lengua && veto.lengua !== l) continue;
      if (veto.promesa && clavePuedePrometer(k)) continue;
      if ((EXENTAS[k] ?? []).includes(veto.por)) continue;
      if (veto.si && !veto.si.test(texto)) continue;
      const m = texto.match(veto.re);
      if (m) (veto.aviso ? avisos : errores).push(`${aqui}: ${veto.aviso ? 'revise' : 'vetado'} (${veto.por}) «${m[0]}»`);
    }

    // frases de más de 30 palabras (los bloques de código y las listas no cuentan como una frase)
    for (const frase of legible(v).split(/(?<=[.!?…])\s+|\n\s*[-*\d]+[.)]?\s+|\n{2,}/)) {
      const n = frase.split(/\s+/).filter((w) => /[\p{L}\p{N}⟨]/u.test(w)).length;
      if (n > MAX_PALABRAS) (ESTRICTO ? errores : avisos).push(`${aqui}: frase de ${n} palabras (máximo ${MAX_PALABRAS}): «${frase.slice(0, 70)}…»`);
    }
  }
}

// mismas claves y mismos marcadores en las dos lenguas
if (DIC.en) {
  const faltan = Object.keys(DIC.es).filter((k) => !(k in DIC.en));
  const sobran = Object.keys(DIC.en).filter((k) => !(k in DIC.es));
  if (faltan.length) (ESTRICTO ? errores : avisos).push(`en: faltan ${faltan.length} claves: ${faltan.slice(0, 10).join(', ')}${faltan.length > 10 ? '…' : ''}`);
  if (sobran.length) errores.push(`en: sobran ${sobran.length} claves que no están en es: ${sobran.slice(0, 10).join(', ')}`);
  for (const k of Object.keys(DIC.es)) {
    if (typeof DIC.en[k] !== 'string') continue;
    const f = (s) => [...new Set(marcadores(s).map((m) => `${m.clave}|${m.fmt}`))].sort().join(' ');
    if (f(DIC.es[k]) !== f(DIC.en[k])) errores.push(`en:${k}: marcadores distintos de es (${f(DIC.en[k])} ≠ ${f(DIC.es[k])})`);
  }
}

console.log(`check-i18n · ${LANGS.map((l) => `${l}: ${DIC[l] ? Object.keys(DIC[l]).length + ' claves' : 'sin diccionario'}`).join(' · ')}${ESTRICTO ? ' · estricto' : ''}`);
if (avisos.length) {
  console.log(`  ⚠ ${avisos.length} avisos:`);
  avisos.slice(0, 40).forEach((a) => console.log('  ⚠ ' + a));
  if (avisos.length > 40) console.log(`  ⚠ …y ${avisos.length - 40} más`);
}
if (errores.length) {
  console.error(`\n✗ ${errores.length} problemas:`);
  errores.forEach((e) => console.error('  ✗ ' + e));
  console.error('\nLos diccionarios no se editan: se corrige el copy (docs/copy_<lang>/*.md) y se regeneran con «npm run i18n».');
  process.exit(1);
}
console.log('✓ Mismas claves y marcadores; ningún número tecleado ni palabra vetada.');
