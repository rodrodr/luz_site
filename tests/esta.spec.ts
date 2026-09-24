import { test, expect } from '@playwright/test';

/** «¿Esta o esta?» (Las Cortes): sin JS, la tabla de parejas; con JS, diez parejas y el escaño. */
test('esta o esta · sin JS, la tabla de parejas', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('es/cortes/');
  await expect(page.locator('.est-estatico tbody tr')).toHaveCount(12);
  await expect(page.locator('.est-juego')).toBeHidden();
  await ctx.close();
});

for (const lang of ['es', 'en'] as const) {
  test(`esta o esta · se juega entero (${lang})`, async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${lang}/cortes/`);
    const raiz = page.locator('[data-esta]');
    await expect(raiz.locator('.est-estatico')).toBeHidden();
    for (let k = 0; k < 10; k++) {
      await raiz.locator('[data-est-firmo]').nth(k % 2).click();
      await expect(raiz.locator('.est-carta.firmada')).toHaveCount(1);
      await expect(raiz.locator('[data-est-quien]:visible')).toHaveCount(2);
      await raiz.locator('[data-est-siguiente]').click();
    }
    await expect(raiz.locator('[data-est-final]')).toBeVisible();
    await expect(raiz.locator('.est-eje .usted')).toHaveCount(1);
    await expect(raiz.locator('.est-eje .voto')).toHaveCount(10);
    await expect(raiz.locator('[data-est-p-familia]')).not.toBeEmpty();
    await raiz.locator('[data-est-otra]').click();
    await expect(raiz.locator('[data-est-cuenta]')).toContainText(lang === 'es' ? 'Pareja 1 de 10' : 'Pair 1 of 10');
    await ctx.close();
  });
}
