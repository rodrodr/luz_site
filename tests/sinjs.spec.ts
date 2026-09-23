import { test, expect, type Locator } from '@playwright/test';
import { LANGS } from './rutas';

/**
 * TODO funciona sin JavaScript: el JS del sitio solo añade (nota emergente, teclado, copiar, tema). Sin JS:
 *  · se lee el h1 y no hay botones inertes a la vista (los que necesitan JS nacen ocultos);
 *  · de cada figura con pestañas se llega a su TABLA marcando su radio (Pestanas: radios y :has());
 *  · F01 (Las Cortes) y F26 (Sesiones), cuando ya estén construidas, tienen una tabla de verdad, con <caption> y `scope`.
 */
test.use({ javaScriptEnabled: false });
const RUTAS = [
  { ruta: '', figuras: [] as string[] },
  { ruta: 'cortes/', figuras: ['F01'] },
  { ruta: 'cortes/1931/', figuras: ['F01'] },
  { ruta: 'cortes/sesiones/', figuras: ['F26'] },
];

async function seLlega(tabla: Locator): Promise<boolean> {
  if (await tabla.isVisible()) return true;
  const figura = tabla.locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " pestanas ")][1]');
  const radio = figura.locator('input.pest-radio[value="tabla"]');
  if (await radio.count()) await radio.first().check({ force: true });
  return tabla.isVisible();
}

for (const lang of LANGS) {
  for (const { ruta, figuras } of RUTAS) {
    test(`sin JavaScript · /${lang}/${ruta}`, async ({ page }) => {
      const r = await page.goto(`${lang}/${ruta}`);
      expect(r?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      // Ningún botón que necesite JS a la vista: [Copiar …] y el tema nacen ocultos.
      for (const b of await page.locator('button[data-copiar], button.tema').all()) await expect(b).toBeHidden();
      // Cada figura con pestañas: su tabla se alcanza.
      for (const p of await page.locator('.pestanas').all()) {
        const tabla = p.locator('[data-panel="tabla"]');
        expect(await seLlega(tabla), 'la pestaña Tabla se abre sin JS').toBe(true);
      }
      for (const id of figuras) {
        const fig = page.locator(`[data-figura="${id}"]`);
        if (!(await fig.count())) { test.info().annotations.push({ type: 'pendiente', description: `${id} aún es un hueco` }); continue; }
        const t = fig.locator('table:has(caption)');
        expect(await t.count(), `${id} tiene una tabla con <caption>`).toBeGreaterThan(0);
        expect(await t.first().locator('th[scope]').count(), 'con cabeceras con scope').toBeGreaterThan(0);
        expect(await seLlega(t.first())).toBe(true);
      }
    });
  }
}
