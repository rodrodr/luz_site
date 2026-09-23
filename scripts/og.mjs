#!/usr/bin/env node
/**
 * Imagen social (og:image) y favicono, desde la geometría del hemiciclo (plan § Fichas de figura · H: «la imagen social
 * sale de ella»). Escribe:
 *   public/og-es.png · public/og-en.png  (1.200 × 630: el hemiciclo, la marca y el descriptor de cada lengua)
 *   public/favicon.svg                   (el hemiciclo mínimo, tres U concéntricas, en el oro del tema oscuro)
 * Sin cifras (el hemiciclo es croquis). Las tipografías son las autoalojadas; los colores, los de src/styles/tokens.json.
 * Se pinta con Playwright: `PW_CHANNEL=chrome` (por omisión fuera de la integración continua) usa el Chrome del equipo.
 *   node scripts/og.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const RAIZ = fileURLToPath(new URL('../', import.meta.url));
const T = JSON.parse(readFileSync(join(RAIZ, 'src/styles/tokens.json'), 'utf8'));
const OSC = T.temas.oscuro;
const leeJson = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null);
const HEMI = leeJson(join(RAIZ, 'src/data/hemiciclo_1936.json')) ?? leeJson('/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/data/hemiciclo_1936.json');
const DIC = { es: leeJson(join(RAIZ, 'src/i18n/es.json')) ?? {}, en: leeJson(join(RAIZ, 'src/i18n/en.json')) ?? {} };
const texto = (lang, k) => DIC[lang][k] ?? DIC.es[k] ?? '';
mkdirSync(join(RAIZ, 'public'), { recursive: true });

// ── favicono: la marca, de una sola tinta (DESIGN.md: «i-marca», tres U concéntricas del hemiciclo) ─────────────
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 22"><g fill="none" stroke="${OSC.accent}" stroke-width="2" stroke-linecap="round"><path d="M2 1v6a14 14 0 0 0 28 0V1"/><path d="M8 1v6a8 8 0 0 0 16 0V1"/><path d="M13.2 1v6a2.8 2.8 0 0 0 5.6 0V1"/></g></svg>\n`;
writeFileSync(join(RAIZ, 'public/favicon.svg'), favicon);

if (!HEMI) { console.log('⚠ og: no hay hemiciclo_1936.json; solo se escribe el favicono'); process.exit(0); }

// ── el hemiciclo, con la misma geometría que Hemiciclo.astro (hero_svg.py) ─────────────────────────────────────────
function hemiciclo() {
  const { cx: CX, yc: YC, ytop: YTOP, wall: WALL, aisles: AISLES } = HEMI.geom;
  const upath = (R) => `M${(CX - R).toFixed(1)},${YTOP} V${YC} A${R},${R} 0 0 0 ${(CX + R).toFixed(1)},${YC} V${YTOP}`;
  const g = [`<g fill="none" stroke="${OSC.mute}" stroke-linecap="round" opacity=".8"><path d="${upath(WALL)}" stroke-width="1.6"/>`];
  for (const [, , , Rd] of HEMI.rows) g.push(`<path d="${upath(Rd)}" stroke-width="0.7"/><path d="${upath(Rd + 3)}" stroke-width="0.7"/>`);
  for (const a of AISLES) for (const [, , , Rd] of HEMI.rows) {
    const t = (a * Math.PI) / 180;
    g.push(`<g transform="translate(${(CX + Rd * Math.cos(t)).toFixed(1)},${(YC + Rd * Math.sin(t)).toFixed(1)}) rotate(${(a - 90).toFixed(1)})"><rect x="-6" y="-4" width="12" height="8" stroke-width="0.6"/></g>`);
  }
  g.push('</g>');
  if (HEMI.mesa) g.push(`<g fill="none" stroke="${OSC.mute}" stroke-width="0.9" opacity=".8">${HEMI.mesa.replace(/<!--[\s\S]*?-->/g, '').replace(/currentColor/g, OSC.mute)}</g>`);
  for (const s of HEMI.seats) {
    const col = s.g ? T.hemiciclo.oscuro[s.g] ?? 'none' : 'none';
    g.push(`<g transform="translate(${s.x},${s.y}) rotate(${s.rot})"><rect x="-6.3" y="-7.5" width="12.6" height="15" rx="2.2" fill="${col}" stroke="${OSC.bg}" stroke-width=".8"/></g>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="272 58 658 606" width="540" height="497">${g.join('')}</svg>`;
}

const fuente = (pkg, archivo) => pathToFileURL(join(RAIZ, 'node_modules/@fontsource-variable', pkg, 'files', archivo)).href;
const pagina = (lang) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Cormorant'; font-style: italic; font-weight: 300 700; src: url(${fuente('cormorant-garamond', 'cormorant-garamond-latin-wght-italic.woff2')}) format('woff2'); }
@font-face { font-family: 'EB Garamond'; font-weight: 400 800; src: url(${fuente('eb-garamond', 'eb-garamond-latin-wght-normal.woff2')}) format('woff2'); }
html, body { margin: 0; width: 1200px; height: 630px; background: ${OSC.bg}; color: ${OSC.ink}; overflow: hidden; }
.lienzo { position: relative; width: 1200px; height: 630px; display: grid; grid-template-columns: 540px 1fr; align-items: center; }
.texto { padding: 0 0 0 72px; }
.marca { display: flex; align-items: center; gap: 18px; }
.marca svg { width: 64px; height: 44px; }
h1 { font: italic 500 76px/1 'Cormorant', Georgia, serif; margin: 0; letter-spacing: -.01em; }
p { font: 400 27px/1.3 'EB Garamond', Georgia, serif; color: ${OSC['ink-2']}; margin: 26px 0 0; max-width: 420px; }
.hemi { justify-self: center; }
.filete { position: absolute; left: 72px; right: 72px; bottom: 56px; border-top: 1px solid ${OSC['hair-2']}; }
</style></head><body><div class="lienzo">
<div class="texto"><div class="marca">${favicon.replace('<svg', '<svg aria-hidden="true"')}</div>
<h1>${texto(lang, 'comun.cabecera.nombre') || 'Luz y Taquígrafos'}</h1><p>${texto(lang, 'comun.cabecera.descriptor')}</p></div>
<div class="hemi">${hemiciclo()}</div><div class="filete"></div></div></body></html>`;

const canal = process.env.PW_CHANNEL ?? (process.env.CI ? undefined : 'chrome');
const nav = await chromium.launch(canal ? { channel: canal } : {});
try {
  const pg = await nav.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const lang of ['es', 'en']) {
    await pg.setContent(pagina(lang), { waitUntil: 'load' });
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: join(RAIZ, `public/og-${lang}.png`) });
  }
  console.log('✓ og: public/og-es.png · public/og-en.png · public/favicon.svg');
} finally {
  await nav.close();
}
