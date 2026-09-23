import { test, expect } from '@playwright/test';

/**
 * Guardas del rediseño de Inicio (23-09-2026, docs/REDISENO_23-09.md):
 *  · ni «V2» ni «v3» en Inicio, salvo en la cita oficial del depósito (Dataverse la da con su versión);
 *  · juego 1: sin JS, los radios cambian la palabra; con JS, se escribe una palabra y se compara con otra;
 *  · juego 2: sin JS, los resultados a la vista; con JS, la barra se apuesta con el teclado y se comprueba.
 */
for (const lang of ['es', 'en'] as const) {
  test(`rediseño · /${lang}/ sin ediciones fuera de la cita`, async ({ page }) => {
    await page.goto(`${lang}/`);
    const n = await page.evaluate(() => {
      const main = document.querySelector('main')!.cloneNode(true) as HTMLElement;
      main.querySelectorAll('.cita, script, style').forEach((x) => x.remove());
      return (main.textContent ?? '').match(/\b(?:V2|v3)\b/g)?.length ?? 0;
    });
    expect(n, '«V2» o «v3» en Inicio fuera de la cita').toBe(0);
  });
}

test.describe('rediseño · juegos sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('el laboratorio cambia de palabra con los radios y la apuesta enseña los resultados', async ({ page }) => {
    await page.goto('es/');
    const eco = page.locator('.lab-eco [data-w]:visible');
    await expect(eco).toHaveCount(1);
    const antes = await eco.textContent();
    await page.locator('.lab-chip').nth(1).click();
    await expect(page.locator('.lab-eco [data-w]:visible')).not.toHaveText(antes ?? '');
    await expect(page.locator('.lab-s:visible')).toHaveCount(1);
    await expect(page.locator('.ap-rango:visible')).toHaveCount(0);
    await expect(page.locator('.ap-cifras').first()).toBeVisible();
  });
});

test('rediseño · el laboratorio se juega: escribir, comparar y quitar', async ({ page }) => {
  await page.goto('es/');
  await page.locator('#laboratorio').scrollIntoViewIfNeeded();
  await expect(page.locator('.lab--vivo')).toHaveCount(1, { timeout: 15_000 });
  await page.fill('#lab-q', 'amnist');
  await expect(page.locator('#lab-sug li').first()).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('.lab-series li')).toHaveCount(1);
  await expect(page.locator('.lab-eco-vivo')).toHaveText(/amnist/i);
  await page.click('.lab-comparar');
  await page.fill('#lab-q', 'huelga');
  await page.keyboard.press('Enter');
  await expect(page.locator('.lab-series li')).toHaveCount(2);
  await expect(page.locator('.lab-dinamico > g')).toHaveCount(2);
  await page.locator('.lab-series li').nth(1).locator('button').click();
  await expect(page.locator('.lab-series li')).toHaveCount(1);
  // Con el teclado se recorre la curva y la nota dice el mes.
  await page.locator('.lab-grafico').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('.lab-nota')).toBeVisible();
  await expect(page.locator('.lab-nota b')).toHaveText(/1931/);
});

test('rediseño · la apuesta se juega con el teclado y se comprueba', async ({ page }) => {
  await page.goto('es/');
  const fila = page.locator('.ap-fila').first();
  await fila.scrollIntoViewIfNeeded();
  await expect(page.locator('.ap--juego')).toHaveCount(1);
  await expect(fila.locator('.ap-cifras')).toBeHidden();
  const rango = fila.locator('.ap-rango');
  await rango.focus();
  for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(fila).toHaveClass(/revelada/);
  await expect(fila.locator('.ap-cifras')).toBeVisible();
  await expect(fila.locator('.ap-dif')).not.toBeEmpty();
  await page.click('.ap-todas');
  await expect(page.locator('.ap-fila.revelada')).toHaveCount(await page.locator('.ap-fila').count());
  await expect(page.locator('.ap-marcador')).not.toBeEmpty();
});
