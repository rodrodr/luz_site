import { test, expect } from '@playwright/test';

/** «El aplausómetro» (El Diario): sin JS, la tabla; con JS, diez frases, el veredicto y otra partida. */
test('aplausómetro · sin JS, la tabla de frases con su acotación', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('es/diario/');
  const filas = page.locator('.apl-estatico tbody tr');
  await expect(filas).toHaveCount(20);
  await expect(page.locator('.apl-juego')).toBeHidden();
  await ctx.close();
});

for (const lang of ['es', 'en'] as const) {
  test(`aplausómetro · se juega entero (${lang})`, async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${lang}/diario/`);
    const raiz = page.locator('[data-aplausos]');
    await expect(raiz.locator('.apl-estatico')).toBeHidden();
    await expect(raiz.locator('.apl-metro li')).toHaveCount(10);
    for (let k = 0; k < 10; k++) {
      await raiz.locator('.apl-op').first().click();
      await expect(raiz.locator('[data-apl-acot]')).toHaveText(/^\(.+\)$/);
      await expect(raiz.locator('.apl-op.correcta')).toHaveCount(1);
      await raiz.locator('[data-apl-siguiente]').click();
    }
    await expect(raiz.locator('[data-apl-final]')).toBeVisible();
    await expect(raiz.locator('[data-apl-veredicto]')).toHaveText(/^\(.+\)$/);
    await raiz.locator('[data-apl-otra]').click();
    await expect(raiz.locator('[data-apl-final]')).toBeHidden();
    await expect(raiz.locator('[data-apl-cuenta]')).toContainText(lang === 'es' ? 'Frase 1 de 10' : 'Sentence 1 of 10');
    await ctx.close();
  });
}
