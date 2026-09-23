import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { RUTAS, presupuesto } from './rutas';

/**
 * Presupuestos (plan § Cómo se evita el amontonamiento, regla 6): palabras de copy en <main> y peso del HTML, por
 * plantilla. El peso se mide COMPRIMIDO con gzip, que es lo que viaja por la red (decisión 1 del investigador,
 * 23-09-2026): el tope de cada plantilla bloquea sobre el HTML en gzip; el peso sin comprimir se anota y no bloquea. Las palabras son las que lee el lector: sin figuras, tablas, índice, código ni lo que la
 * vista previa marca como pendiente o sin sitio. Mientras el copy o las figuras no estén completos, el recuento de
 * palabras avisa y no falla (se anota); en publicación (STRICT=1), falla.
 */
const ESTRICTO = process.env.STRICT === '1';
for (const ruta of RUTAS) {
  test(`peso · /es/${ruta}`, async ({ page }) => {
    const r = await page.goto(`es/${ruta}`);
    const html = await r!.text();
    const { palabras, kb } = presupuesto(ruta);
    const crudo = Buffer.byteLength(html) / 1024;
    const gz = gzipSync(Buffer.from(html)).length / 1024;
    test.info().annotations.push({ type: 'peso', description: `${gz.toFixed(0)} KB en gzip (tope ${kb}) · ${crudo.toFixed(0)} KB sin comprimir (se informa, no bloquea)` });
    expect(gz, `el HTML comprimido con gzip pesa como mucho ${kb} KB`).toBeLessThanOrEqual(kb);
    const n = await page.evaluate(() => {
      const main = document.querySelector('main')!.cloneNode(true) as HTMLElement;
      main.querySelectorAll('.figura, .fig-hueco, table, nav, pre, code, .sin-sitio, [data-audit-exento], mark.pendiente, .hemi-fig, .consulta, .cita, script, style').forEach((x) => x.remove());
      return (main.textContent ?? '').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    });
    test.info().annotations.push({ type: 'palabras', description: `${n} de ${palabras}` });
    if (ESTRICTO) expect(n, `como mucho ${palabras} palabras de copy`).toBeLessThanOrEqual(palabras);
  });
}

test('peso · la isla de las figuras cabe en 35 KB comprimida', async () => {
  const dir = new URL('../dist/_astro/', import.meta.url);
  test.skip(!existsSync(dir), 'sin dist/');
  const { readdirSync } = await import('node:fs');
  const islas = readdirSync(dir).filter((f) => /^(figuras|Figura).*\.js$/.test(f));
  const total = islas.reduce((s, f) => s + gzipSync(readFileSync(new URL(f, dir))).length, 0);
  expect(total / 1024, 'KB gz de la isla').toBeLessThanOrEqual(35);
});
