import { test, expect } from '@playwright/test';

/** «¿Quién lo dijo?» (Sesiones): sin JS, la tabla de citas; con JS, ocho citas y el puesto en la Cámara. */
test('quién lo dijo · sin JS, la tabla de citas', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('es/cortes/sesiones/');
  expect(await page.locator('.qui-estatico tbody tr').count()).toBeGreaterThan(20);
  await expect(page.locator('.qui-juego')).toBeHidden();
  await ctx.close();
});

for (const lang of ['es', 'en'] as const) {
  test(`quién lo dijo · se juega entero (${lang})`, async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${lang}/cortes/sesiones/`);
    const raiz = page.locator('[data-quien]');
    await expect(raiz.locator('.qui-estatico')).toBeHidden();
    for (let k = 0; k < 8; k++) {
      await raiz.locator('[data-qui-op]').first().click();
      await expect(raiz.locator('.qui-op.correcta')).toHaveCount(1);
      await expect(raiz.locator('[data-qui-quien]')).not.toBeEmpty();
      await raiz.locator('[data-qui-siguiente]').click();
    }
    await expect(raiz.locator('[data-qui-final]')).toBeVisible();
    await expect(raiz.locator('[data-qui-nivel]')).not.toBeEmpty();
    await raiz.locator('[data-qui-otra]').click();
    await expect(raiz.locator('[data-qui-cuenta]')).toContainText(lang === 'es' ? 'Cita 1 de 8' : 'Quote 1 of 8');
    await ctx.close();
  });
}
