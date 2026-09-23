#!/usr/bin/env node
/**
 * src/styles/tokens.json → src/styles/tokens.css, y @fontsource-variable → src/styles/fuentes.css (GENERADOS: no se editan).
 *
 *   node scripts/tokens.mjs            (escribe tokens.css y mide los contrastes)
 *   node scripts/tokens.mjs --check    (solo mide; no escribe)
 *
 * Tema (D-15): se sigue la preferencia del sistema y, sin preferencia, el OSCURO; el botón ◐ guarda la elección en
 * `data-theme` (light | dark) sobre <html>. Por eso `:root` lleva el oscuro, la media `prefers-color-scheme: light` lo
 * cambia salvo elección oscura, y `[data-theme]` manda sobre las dos.
 *
 * Falla si un par de texto no llega a 4,5:1 o un par gráfico a 3:1 (tokens.json › contrastes), o si las 18 minorías
 * del hemiciclo no coinciden con `src/data/hemiciclo_1936.json` cuando el exportador ya lo ha escrito.
 * Node puro, sin dependencias.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const RAIZ = fileURLToPath(new URL('../', import.meta.url));
const T = JSON.parse(readFileSync(join(RAIZ, 'src/styles/tokens.json'), 'utf8'));
const SOLO_CHECK = process.argv.includes('--check');

// ── contraste WCAG 2 ─────────────────────────────────────────────────────────────────────────────
function rgba(c) {
  const hex = c.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1);
  const m = c.match(/^rgba?\(([^)]+)\)$/i);
  if (m) { const p = m[1].split(',').map((x) => Number(x.trim())); return [p[0], p[1], p[2], p[3] ?? 1]; }
  return null;
}
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
/** Un color con alfa se mezcla con su fondo antes de medirlo. */
const sobre = (c, fondo) => [0, 1, 2].map((i) => c[i] * c[3] + fondo[i] * (1 - c[3]));
function contraste(a, b) {
  const fb = rgba(b), fa = rgba(a);
  if (!fa || !fb) return null;
  const A = fa[3] < 1 ? sobre(fa, fb) : fa;
  const [l1, l2] = [lum(A), lum(fb)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const errores = [];
const informe = [];
for (const [tema, v] of Object.entries(T.temas)) {
  for (const [clase, minimo] of [['texto', 4.5], ['grafico', 3]]) {
    for (const [a, b] of T.contrastes[clase]) {
      const r = contraste(v[a], v[b]);
      if (r === null) { errores.push(`${tema}: no se puede medir ${a} sobre ${b}`); continue; }
      informe.push(`${tema.padEnd(6)} ${clase.padEnd(7)} ${(a + ' / ' + b).padEnd(28)} ${r.toFixed(2)}:1`);
      if (r < minimo) errores.push(`${tema}: ${a} sobre ${b} da ${r.toFixed(2)}:1 (mínimo ${minimo}:1 para ${clase})`);
    }
  }
}

// ── hemiciclo: los colores del token frente a los del JSON del exportador ─────────────────────────
const hemiJson = join(RAIZ, 'src/data/hemiciclo_1936.json');
if (existsSync(hemiJson)) {
  const G = JSON.parse(readFileSync(hemiJson, 'utf8')).groups ?? {};
  for (const k of T.hemiciclo.orden) {
    if (!G[k]) { errores.push(`hemiciclo: el grupo «${k}» no está en src/data/hemiciclo_1936.json`); continue; }
    if (G[k].color?.toUpperCase() !== T.hemiciclo.oscuro[k].toUpperCase()) errores.push(`hemiciclo: --g-${k} oscuro ${T.hemiciclo.oscuro[k]} ≠ ${G[k].color} del JSON`);
    const claro = G[k].color_claro ?? G[k].color;
    if (claro.toUpperCase() !== T.hemiciclo.claro[k].toUpperCase()) errores.push(`hemiciclo: --g-${k} claro ${T.hemiciclo.claro[k]} ≠ ${claro} del JSON`);
  }
}

// ── CSS ──────────────────────────────────────────────────────────────────────────────────────────
const decl = (obj, pre = '') => Object.entries(obj).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `  --${pre}${k}: ${v};`).join('\n');
const tema = (nombre) => `${decl(T.temas[nombre])}\n${decl(T.hemiciclo[nombre], 'g-')}\n  color-scheme: ${nombre === 'oscuro' ? 'dark' : 'light'};`;

const css = `/* GENERADO por scripts/tokens.mjs desde src/styles/tokens.json — no se edita a mano. */
:root {
  --display: ${T.fuentes.display};
  --text: ${T.fuentes.texto};
  --mono: ${T.fuentes.mono};
${decl(T.medidas)}
${tema('oscuro')}
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme='dark']) {
${tema('claro').replace(/^/gm, '  ')}
  }
}
:root[data-theme='light'] {
${tema('claro')}
}
:root[data-theme='dark'] {
${tema('oscuro')}
}
`;

// ── fuentes: solo los subconjuntos latin y latin-ext de las tres familias (petición de diseño, § 3.4) ─────────
// Se extraen de las hojas de @fontsource-variable (no se copian a mano: una actualización del paquete se recoge sola).
const FUENTES = [
  ['cormorant-garamond', ['wght.css', 'wght-italic.css']],
  ['eb-garamond', ['wght.css', 'wght-italic.css']],
  ['jetbrains-mono', ['wght.css']],
];
let fuentes = '/* GENERADO por scripts/tokens.mjs: @font-face latin y latin-ext de @fontsource-variable. No se edita a mano. */\n';
for (const [pkg, hojas] of FUENTES) {
  for (const hoja of hojas) {
    const f = join(RAIZ, 'node_modules/@fontsource-variable', pkg, hoja);
    if (!existsSync(f)) { errores.push(`falta ${f} (npm install)`); continue; }
    const bloques = readFileSync(f, 'utf8').split(/(?=\/\* [\w-]+ \*\/)/).filter((b) => /-latin(-ext)?-wght/.test(b.split('\n')[0]));
    for (const b of bloques) fuentes += b.replace(/url\(\.\/files\//g, `url(../../node_modules/@fontsource-variable/${pkg}/files/`).trim() + '\n';
  }
}

if (errores.length) {
  console.error('✗ tokens:\n' + errores.map((e) => '  ✗ ' + e).join('\n'));
  process.exit(1);
}
if (!SOLO_CHECK) {
  writeFileSync(join(RAIZ, 'src/styles/tokens.css'), css);
  writeFileSync(join(RAIZ, 'src/styles/fuentes.css'), fuentes);
}
if (process.argv.includes('--informe')) console.log(informe.join('\n'));
console.log(`✓ tokens: ${informe.length} contrastes medidos en ${Object.keys(T.temas).length} temas${SOLO_CHECK ? '' : ' → src/styles/tokens.css'}`);
