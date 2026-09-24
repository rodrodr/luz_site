import { test, expect } from '@playwright/test';

/** «¿Cuándo fue el pico?» (Explorador): sin JS, la tabla; con JS, cinco términos, la curva y la puntuación. */
test('pico · sin JS, la tabla de términos', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('es/explorador/');
  await expect(page.locator('.pic-estatico tbody tr')).toHaveCount(10);
  await expect(page.locator('.pic-juego')).toBeHidden();
  await ctx.close();
});

for (const lang of ['es', 'en'] as const) {
  test(`pico · se juega entero (${lang})`, async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${lang}/explorador/`);
    const raiz = page.locator('[data-pico]');
    await expect(raiz.locator('.pic-estatico')).toBeHidden();
    for (let k = 0; k < 5; k++) {
      await raiz.locator('[data-pic-anios] button').nth(1).click();
      await raiz.locator('[data-pic-meses] button:not([disabled])').first().click();
      await expect(raiz.locator('[data-pic-curva] rect.pico')).toHaveCount(1);
      await expect(raiz.locator('[data-pic-meses] button.pico')).toHaveCount(await raiz.locator('[data-pic-meses] button.pico').count());
      await raiz.locator('[data-pic-siguiente]').click();
    }
    await expect(raiz.locator('[data-pic-final]')).toBeVisible();
    await expect(raiz.locator('[data-pic-nivel]')).not.toBeEmpty();
    await raiz.locator('[data-pic-otra]').click();
    await expect(raiz.locator('[data-pic-cuenta]')).toContainText(lang === 'es' ? 'Término 1 de 5' : 'Term 1 of 5');
    await ctx.close();
  });
}
