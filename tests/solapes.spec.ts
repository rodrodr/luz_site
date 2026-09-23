import { test, expect } from '@playwright/test';
import { RUTAS } from './rutas';

/**
 * Ningún bloque pegajoso (`position: sticky`; el índice lateral) monta sobre otro texto al desplazarse. Se RECORRE la
 * página: en reposo, con scrollY = 0, un solape no se ve. Control positivo: `CONTROL_SOLAPE=1 npx playwright test solapes`
 * hace pegajoso un párrafo y la prueba de Método TIENE que fallar.
 */
const ANCHOS = [{ width: 1100, height: 720 }, { width: 1440, height: 900 }];
for (const viewport of ANCHOS) {
  for (const ruta of RUTAS.filter((r) => ['', 'cortes/', 'cortes/1931/', 'diario/', 'metodo/', 'datos/', 'explorador/'].includes(r))) {
    test(`sin solapes · /es/${ruta} · ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(`es/${ruta}`);
      await page.evaluate(() => document.fonts.ready);
      if (process.env.CONTROL_SOLAPE) await page.addStyleTag({ content: '.lectura .seccion:nth-of-type(2) p { position: sticky; top: 1rem; }' });
      const solapes = await page.evaluate(async () => {
        const pegajosos = [...document.querySelectorAll<HTMLElement>('main *')].filter((e) => { const s = getComputedStyle(e); return s.position === 'sticky' && s.top !== 'auto' && !/^(TH|TD)$/.test(e.tagName); });
        if (!pegajosos.length) return [];
        const fijo = (e: Element | null): boolean => !!e && e !== document.body && (getComputedStyle(e).position === 'fixed' || fijo(e.parentElement));
        const textos = [...document.querySelectorAll<HTMLElement>('main :is(h2, h3, p, li, figure, table, pre, dt, dd)')].filter((e) => !fijo(e));
        const hallados = new Set<string>();
        for (let y = 0; y < document.documentElement.scrollHeight; y += 300) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => requestAnimationFrame(() => r(null)));
          for (const p of pegajosos) {
            const a = p.getBoundingClientRect();
            if (a.bottom <= 0 || a.top >= innerHeight || a.width === 0) continue;
            for (const o of textos) {
              if (p.contains(o) || o.contains(p)) continue;
              // La cabecera pegajosa de una figura sobre SUS filas es la de una tabla (como TH): F20 la usa a propósito.
              const fp = p.closest('figure.figura');
              if (fp && fp.contains(o)) continue;
              const b = o.getBoundingClientRect();
              if (!b.width || !b.height) continue;
              const ancho = Math.min(a.right, b.right, innerWidth) - Math.max(a.left, b.left, 0);
              const alto = Math.min(a.bottom, b.bottom, innerHeight) - Math.max(a.top, b.top, 0);
              if (ancho > 4 && alto > 4 && getComputedStyle(o).visibility !== 'hidden') hallados.add(`«${(p.textContent ?? '').trim().slice(0, 30)}» sobre «${(o.textContent ?? '').trim().slice(0, 30)}» (y=${y})`);
            }
          }
        }
        return [...hallados].slice(0, 5);
      });
      expect(solapes, 'ningún bloque pegajoso encima de otro texto').toEqual([]);
    });
  }
}
