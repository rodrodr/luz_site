import { test, expect } from '@playwright/test';

/** «¿Izquierda o derecha?» (Método 07): sin JS, la tabla; con JS, seis palabras, sus barras y la puntuación. */
test('izquierda o derecha · sin JS, la tabla de tasas', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('es/metodo/');
  await expect(page.locator('.izq-estatico tbody tr')).toHaveCount(12);
  await expect(page.locator('.izq-juego')).toBeHidden();
  await ctx.close();
});

for (const lang of ['es', 'en'] as const) {
  test(`izquierda o derecha · se juega entero (${lang})`, async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${lang}/metodo/`);
    const raiz = page.locator('[data-izqder]');
    await expect(raiz.locator('.izq-estatico')).toBeHidden();
    for (let k = 0; k < 6; k++) {
      await raiz.locator('[data-izq-banco]').nth(k % 7).click();
      await expect(raiz.locator('[data-izq-barras] .fila')).toHaveCount(7);
      await expect(raiz.locator('.izq-banco.max')).toHaveCount(1);
      await raiz.locator('[data-izq-siguiente]').click();
    }
    await expect(raiz.locator('[data-izq-final]')).toBeVisible();
    await expect(raiz.locator('[data-izq-nivel]')).not.toBeEmpty();
    await raiz.locator('[data-izq-otra]').click();
    await expect(raiz.locator('[data-izq-cuenta]')).toContainText(lang === 'es' ? 'Palabra 1 de 6' : 'Word 1 of 6');
    await ctx.close();
  });
}
