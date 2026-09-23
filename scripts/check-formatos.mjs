#!/usr/bin/env node
/**
 * El formato de las cifras (src/lib/formato.ts) frente a los casos que fija el exportador en
 * `src/data/formatos.json › pruebas` ({v, t, dec?, fmt, es, en}): carácter a carácter, en las dos lenguas.
 *   node --experimental-strip-types scripts/check-formatos.mjs
 * Sin `formatos.json` (el exportador aún no lo ha escrito) avisa y sale bien.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { formatea } from '../src/lib/formato.ts';

const f = fileURLToPath(new URL('../src/data/formatos.json', import.meta.url));
if (!existsSync(f)) { console.log('⚠ check-formatos: no existe src/data/formatos.json (lo escribe el exportador)'); process.exit(0); }
const pruebas = JSON.parse(readFileSync(f, 'utf8')).pruebas ?? [];
const errores = [];
for (const p of pruebas) {
  for (const lang of ['es', 'en']) {
    const sale = formatea({ v: p.v, t: p.t, dec: p.dec }, lang, p.fmt ?? '');
    if (sale !== p[lang]) errores.push(`${JSON.stringify({ v: p.v, t: p.t, dec: p.dec, fmt: p.fmt })} ${lang}: «${sale}» ≠ «${p[lang]}»`);
  }
}
if (errores.length) { console.error(`✗ check-formatos: ${errores.length} de ${pruebas.length * 2}\n  ` + errores.join('\n  ')); process.exit(1); }
console.log(`✓ check-formatos: ${pruebas.length * 2} casos de formatos.json, carácter a carácter`);
