import { test, expect } from '@playwright/test';

/**
 * La nota emergente de las figuras (scripts/figuras.ts) según WCAG 1.4.13 y el patrón de `tooltips`, sobre la figura de
 * muestra del catálogo (/es/componentes/#figura), que usa la misma isla que todas:
 *  · aparece al pasar el puntero, con sus tres líneas (qué · cifras · base);
 *  · se puede RECORRER: el puntero pasa de la marca a la nota y la nota sigue ahí;
 *  · es PERSISTENTE: no caduca;
 *  · se DESCARTA con Esc, sin mover el puntero ni el foco;
 *  · con el teclado: una parada por grupo, ← → Inicio Fin recorren y la región viva dice «n de N»;
 *  · con el dedo: el primer toque la abre sin navegar, trae [Cerrar la nota] y tocar fuera la cierra;
 *  · las pestañas se reflejan en el hash y un hash abre su pestaña.
 * En publicación (STRICT=1) el catálogo no existe y la prueba se salta.
 */
test.skip(process.env.STRICT === '1', 'el catálogo no se genera en publicación');
test.use({ reducedMotion: 'reduce' });

test('nota emergente · puntero: aparece, se recorre, persiste y Esc la descarta', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('es/componentes/#figura');
  const marca = page.locator('.barra-marca').first();
  await marca.scrollIntoViewIfNeeded();
  const caja = (await marca.boundingBox())!;
  await page.mouse.move(caja.x + 20, caja.y + caja.height / 2);
  const nota = page.locator('.fig-tip');
  await expect(nota).toBeVisible();
  await expect(nota.locator('.em-t')).not.toBeEmpty();
  await expect(nota.locator('.em-d')).not.toBeEmpty();
  const n = (await nota.boundingBox())!;
  await page.mouse.move(n.x + n.width / 2, n.y + n.height / 2, { steps: 8 });
  await page.waitForTimeout(600);
  await expect(nota, 'se puede recorrer con el puntero').toBeVisible();
  await page.waitForTimeout(1500);
  await expect(nota, 'no caduca').toBeVisible();
  await page.keyboard.press('Escape');
  await expect(nota, 'Esc la descarta').toBeHidden();
});

test('nota emergente · teclado: una parada, flechas, Inicio y Fin, región viva', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('es/componentes/#figura');
  const grupo = page.locator('.barras');
  await grupo.focus();
  await page.keyboard.press('ArrowRight');
  const nota = page.locator('.fig-tip');
  await expect(nota).toBeVisible();
  await expect(page.locator('[aria-live]').first()).toContainText('1 de 5');
  await page.keyboard.press('End');
  await expect(page.locator('[aria-live]').first()).toContainText('5 de 5');
  await page.keyboard.press('Escape');
  await expect(nota).toBeHidden();
  await expect(grupo, 'el foco no se mueve al cerrar').toBeFocused();
  await expect(page.locator('#cat-fig-teclado'), 'la frase del teclado se destapa con la isla').toBeVisible();
});

test('nota emergente · táctil: primer toque sin navegar, botón de cierre y toque fuera', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('es/componentes/#figura');
  const marca = page.locator('.barra-marca').nth(1);
  await marca.scrollIntoViewIfNeeded();
  await marca.tap();
  const nota = page.locator('.fig-tip');
  await expect(nota).toBeVisible();
  expect(page.url(), 'el primer toque no navega').toContain('/componentes/');
  await page.locator('.fig-tip-cierra').tap();
  await expect(nota).toBeHidden();
  await marca.tap();
  await expect(nota).toBeVisible();
  await page.tap('h1');
  await expect(nota, 'tocar fuera la cierra').toBeHidden();
  await ctx.close();
});

test('pestañas ↔ hash', async ({ page }) => {
  await page.goto('es/componentes/#figura');
  await page.locator('#cat-fig-pest-tabla').click();
  await expect(page).toHaveURL(/#cat-fig-tabla$/);
  await page.goto('es/componentes/#cat-fig-datos');
  await expect(page.locator('#cat-fig-datos')).toBeVisible();
  await expect(page.locator('#cat-fig-grafico')).toBeHidden();
});
