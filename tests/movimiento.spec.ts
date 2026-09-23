import { test, expect } from '@playwright/test';

/**
 * Con `prefers-reduced-motion: reduce`, nada se mueve y todo se ve: ninguna animación en curso y la Cámara entera
 * (todos los escaños del hemiciclo opacos). Sin esa preferencia, la entrada del hemiciclo dura menos de 5 s (WCAG 2.2.2).
 */
test.describe('movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  for (const ruta of ['es/', 'es/cortes/', 'es/metodo/', ...(process.env.STRICT === '1' ? [] : ['es/componentes/'])]) {
    test(`nada se mueve · /${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      const enCurso = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
      expect(enCurso).toBe(0);
      if (ruta === 'es/') {
        const ocultos = await page.evaluate(() => [...document.querySelectorAll('.hemi-seats rect')].filter((r) => Number(getComputedStyle(r).opacity) < 1).length);
        expect(ocultos, 'todos los escaños se ven').toBe(0);
      }
    });
  }
});

test('la Cámara se sienta en menos de 5 s', async ({ page }) => {
  await page.goto('es/');
  const duracion = await page.evaluate(() => Math.max(0, ...document.getAnimations().map((a) => {
    const t = a.effect?.getComputedTiming();
    return Number(t?.endTime ?? 0);
  })));
  expect(duracion).toBeLessThan(5000);
});
