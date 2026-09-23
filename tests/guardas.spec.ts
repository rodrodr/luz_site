import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Guardas (plan § Pruebas y puertas de la compilación):
 *  · nada del prototipo de 1931 en src/data/: ningún archivo de `aecpa2026/figs/data/` salvo `hemiciclo_1936.json`
 *    (por su huella, que no depende de dónde esté el original, y por los nombres que solo usaba el prototipo);
 *  · «este enlace abre» no aparece en dist/, ni un enlace profundo al explorador mientras ENLACES_PROFUNDOS sea false;
 *  · el sello del exportador trae las huellas de las bases (V2, v3, proyecto) y coinciden con las del contrato.
 */
const RAIZ = fileURLToPath(new URL('../', import.meta.url));
const PROTOTIPO_SHA256 = new Set([
  '3577625573532435925a575df46da087679329affdbf1765210b709f008a5c65', 'e31d28ce2943c8a854a2abf192e6425c1afe9fd2dcd7fc0b08b869e8c91f4085',
  '3428bc93a1f79e6f1249326dc4f397fae2d220f11a258f12f5c9c96e02ddad53', '587004598ab4f60ed05649431ecfd054f09dee1a0616f189946027cc8663f643',
  '5b85a34b9284a3d457245b4616603999c4aa011c950f977f0b3ffa6f8561602c', 'd86d37da96225bf93391f2020c7d46ec6b8d0f6c7fd0eb0c34f8f37592bde84a',
  '5b6ff1025864719ef0609367274708ef88a7625634a8d03032074008a7351ab7', '3cdf5f2b4a73bcd5026cfef605e98f1a78e6774a7ad50d53aeeed6c70c320293',
  '927c843f85dab635be6d5011cdebcd618fd1d8a391ed03e3edc5e714464dd5e2', '6a4276c355907252baac18c3cddb0d53de07cbe241ed347de151467c82759f16',
  'd8fa88dbe5df8ae458008afda67e1c74318b88cebe98599e3049de6c79ed3f87', '8bd2b71218dc8415d4b90ddc417667de7ef66a80df3f8a44afbe29031b9ffed8',
  'abd900a7b5ce31ccb884dd9ac774a0ff66c5b0d0a9d9186c4d22cf249112bebe',
]);
const HEMICICLO_SHA256 = '54ee48fedda9f179f87ecd3c87d0cef38c17bc71cd329529cacc73707fb812c7';
const NOMBRES_PROTOTIPO = ['conceptos_top', 'eda_analysis', 'egos', 'epistemico', 'flujos', 'ideologia_x_tipo', 'persona_persona', 'personas', 'timeline', 'resumen'];

function archivos(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => { const r = join(dir, f); return statSync(r).isDirectory() ? archivos(r) : [r]; });
}

test('guardas · nada del prototipo de 1931 en src/data/', () => {
  for (const f of archivos(join(RAIZ, 'src/data'))) {
    const sha = createHash('sha256').update(readFileSync(f)).digest('hex');
    expect(PROTOTIPO_SHA256.has(sha), `${f} es un archivo del prototipo`).toBe(false);
    const nombre = f.split('/').pop()!.replace(/\.json$/, '');
    expect(NOMBRES_PROTOTIPO.includes(nombre), `${f} lleva el nombre de un archivo del prototipo`).toBe(false);
    if (nombre === 'hemiciclo_1936') expect(sha, 'el hemiciclo es el del croquis, sin tocar').toBe(HEMICICLO_SHA256);
  }
});

test('guardas · dist/ no promete lo que el explorador no hace', () => {
  const dist = join(RAIZ, 'dist');
  test.skip(!existsSync(dist), 'sin dist/ (npm run build)');
  const enlaces = readFileSync(join(RAIZ, 'src/config/enlaces.ts'), 'utf8');
  const profundos = /ENLACES_PROFUNDOS\s*=\s*true/.test(enlaces);
  for (const f of archivos(dist).filter((x) => x.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    expect(/este enlace abre|this link opens/i.test(html), `${f}: «este enlace abre»`).toBe(false);
    if (!profundos) expect(/luz_explorer\/#(?:q|sesion)=/.test(html), `${f}: enlace profundo al explorador`).toBe(false);
  }
});

test('guardas · el sello del exportador trae las huellas de las bases', () => {
  const f = join(RAIZ, 'src/data/sello.json');
  test.skip(!existsSync(f), 'el exportador aún no ha escrito sello.json');
  const s = JSON.parse(readFileSync(f, 'utf8'));
  expect(s.v2_md5, 'MD5 de la V2 depositada').toBe('360332a0ff1327671530f15eed46ac0c');
  expect(String(s.v3_sha256 ?? ''), 'sha256 de la v3 del explorador').toMatch(/^3a0d8b2d/);
  expect(String(s.proyecto_sha256 ?? ''), 'sha256 de los metadatos del proyecto').toMatch(/^b3295e99/);
});
