import { test, expect } from '@playwright/test';

import { LANGS, RUTAS } from './rutas';

/**
 * Guardas del rediseño (23-09-2026, docs/REDISENO_23-09.md) y de la base corregida (24-09-2026):
 *  · en NINGUNA página se nombran ediciones de la base (ni «V2» ni «v3», ni «edición depositada/del explorador»), ni
 *    sus «trampas»: el sitio presenta la base corregida. Solo se exime la cita oficial del depósito, que Dataverse da
 *    con su versión, y el código;
 *  · juego 1: sin JS, los radios cambian la palabra; con JS, se escribe una palabra y se compara con otra;
 *  · juego 2: sin JS, los resultados a la vista; con JS, la barra se apuesta con el teclado y se comprueba;
 *  · «Corrija al Diario» (Método 03): sin JS, la tabla de lecturas; con JS, se corrige, llega otra, y se remata.
 */
const EDICIONES = /\b(?:V2|v3)\b|edici[oó]n (?:depositada|del explorador)|dos ediciones|deposited edition|explorer(?:'s)? edition|two editions|trampa|pitfall/gi;
for (const lang of LANGS) {
  test(`rediseño · /${lang}/ · ninguna página nombra ediciones de la base`, async ({ page }) => {
    const halladas: string[] = [];
    for (const ruta of RUTAS) {
      await page.goto(`${lang}/${ruta}`);
      const txt = await page.evaluate(() => {
        const b = document.body.cloneNode(true) as HTMLElement;
        b.querySelectorAll('.cita, script, style, code, pre, template').forEach((x) => x.remove());
        return b.textContent ?? '';
      });
      for (const m of txt.matchAll(new RegExp(EDICIONES.source, 'gi'))) halladas.push(`/${lang}/${ruta}: «${txt.slice(Math.max(0, (m.index ?? 0) - 40), (m.index ?? 0) + 40).replace(/\s+/g, ' ')}»`);
    }
    expect(halladas, 'menciones de ediciones en el texto visible').toEqual([]);
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

test.describe('rediseño · «Corrija al Diario» sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('Método 03 enseña la tabla de lecturas y el remate', async ({ page }) => {
    await page.goto('es/metodo/');
    await expect(page.locator('.err-estatico')).toBeVisible();
    await expect(page.locator('.err-tabla tbody tr')).toHaveCount(10);
    await expect(page.locator('.err-juego')).toBeHidden();
    await expect(page.locator('.err-remate')).toBeVisible();
  });
});

test.describe('rediseño · «Corrija al Diario» se juega', () => {
  test.use({ reducedMotion: 'reduce' });
  test('una pista, una corrección, otra errata, la trampa y el remate', async ({ page }) => {
    await page.goto('es/metodo/');
    const juego = page.locator('.err-juego');
    await juego.scrollIntoViewIfNeeded();
    await expect(juego).toBeVisible();
    await expect(page.locator('.err-estatico')).toBeHidden();
    await expect(page.locator('.err-remate')).toBeHidden();
    const campo = page.locator('[data-err-campo]');
    const aviso = page.locator('[data-err-aviso]');
    await expect(campo).toHaveValue('El Sr PRESIDENTE:');
    // Una corrección a medias da una pista y no avanza.
    await campo.fill('El Sr PRESIDENTE');
    await campo.press('Enter');
    await expect(aviso).toContainText('Todavía no');
    await expect(campo).toHaveAttribute('aria-invalid', 'true');
    // Cada corrección buena trae otra lectura dañada, hasta la trampa.
    let rondas = 0;
    while (await page.locator('[data-err-dejar]').isHidden()) {
      const mal = (await page.locator('[data-err-mal]').textContent()) ?? '';
      await campo.fill((await page.locator('[data-err-bien]').textContent()) ?? '');
      await campo.press('Enter');
      await expect(aviso).toContainText('Corregida');
      // La ronda siguiente llega sola, con otra lectura dañada en el campo.
      await expect(page.locator('[data-err-mal]')).not.toHaveText(mal, { timeout: 5000 });
      await expect(campo).toHaveValue((await page.locator('[data-err-mal]').textContent()) ?? '');
      if (++rondas > 12) throw new Error('el juego no llega a la trampa');
    }
    expect(rondas).toBe(9);
    await expect(page.locator('[data-err-mal]')).toHaveText('El señor PRESIDENTE:');
    await page.locator('[data-err-dejar]').click();
    await expect(aviso).toContainText('no era una errata');
    await expect(page.locator('[data-err-resumen]')).toContainText('Ha corregido');
    await expect(page.locator('.err-remate')).toBeVisible();
    // Volver a empezar.
    await page.locator('[data-err-otra]').click();
    await expect(campo).toHaveValue('El Sr PRESIDENTE:');
    // Rendirse a la primera también remata.
    await page.locator('[data-err-rendirse]').click();
    await expect(page.locator('[data-err-resumen]')).toContainText('No ha corregido ninguna');
  });
});
