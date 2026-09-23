/**
 * Compacta los atributos de ámbito de Astro en `dist/` (integración, fase 2).
 *
 * Cada elemento de un componente con `<style>` lleva `data-astro-cid-<8 letras>` (23 caracteres), y el selector del
 * estilo, `[data-astro-cid-<8 letras>]`. En las páginas con figuras densas eran decenas de KB del presupuesto de
 * `peso.spec` (plan § Cómo se evita el amontonamiento, regla 6: «el peso mide solo el HTML sin comprimir»). Aquí se
 * renombra cada uno, en TODO `dist/` (HTML, CSS y JS a la vez), a `data-c-<n>` con un número corto y estable (orden de
 * los nombres originales): el emparejamiento atributo ↔ selector no cambia, solo su largo. Es una minificación, como
 * la de las clases en otros empaquetadores; el marcado y la cascada quedan idénticos.
 *
 *   node scripts/compacta-cid.mjs [--dist=DIR]     (lo llama astro.config.mjs al terminar la compilación)
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RE = /data-astro-cid-([a-z0-9]+)/g;
const EXT = /\.(html|css|js|mjs)$/;

function archivos(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const ruta = join(dir, f);
    if (statSync(ruta).isDirectory()) archivos(ruta, out);
    else if (EXT.test(f)) out.push(ruta);
  }
  return out;
}

export function compactaCid(dist) {
  if (!existsSync(dist)) return { archivos: 0, nombres: 0, ahorro: 0 };
  const lista = archivos(dist);
  const textos = new Map(lista.map((r) => [r, readFileSync(r, 'utf8')]));
  const nombres = new Set();
  for (const s of textos.values()) for (const m of s.matchAll(RE)) nombres.add(m[1]);
  const orden = [...nombres].sort();
  const corto = new Map(orden.map((n, i) => [n, `data-c-${i.toString(36)}`]));
  let ahorro = 0, tocados = 0;
  for (const [ruta, s] of textos) {
    if (!s.includes('data-astro-cid-')) continue;
    const nuevo = s.replace(RE, (_t, n) => corto.get(n));
    ahorro += Buffer.byteLength(s) - Buffer.byteLength(nuevo);
    writeFileSync(ruta, nuevo);
    tocados++;
  }
  return { archivos: tocados, nombres: orden.length, ahorro };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv.find((a) => a.startsWith('--dist='));
  const dist = resolve(fileURLToPath(new URL('../', import.meta.url)), arg ? arg.slice(7) : 'dist');
  const r = compactaCid(dist);
  console.log(`compacta-cid · ${r.nombres} ámbitos · ${r.archivos} archivos · ${(r.ahorro / 1024).toFixed(0)} KB menos`);
}
