import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { LANGS, RUTAS } from './rutas';

/** El 404 pinta su bloque inglés solo cuando existe `en.json` (peticiones/comun-inicio.md A.8; sin él sería texto
 *  español rotulado como inglés). La prueba lo exige en cuanto haya traducción. */
const HAY_INGLES = existsSync(new URL('../src/i18n/en.json', import.meta.url));

/**
 * Humo: todas las rutas en las dos lenguas, más la raíz y el 404. Cada página responde, tiene UN h1 y un <main>, dice su
 * lengua, no deja errores en la consola y cabe en el móvil: a 360 y a 375 px, en los DOS temas (peticiones/diseno.md
 * § 6), nada asoma por la derecha (cabecera incluida), y la cabecera va en dos filas sin menú hamburguesa.
 * El catálogo de componentes (/es/componentes/) también, salvo en publicación (STRICT=1), donde no se genera.
 */
const ANCHOS = [
  { w: 360, tema: 'dark' as const }, { w: 360, tema: 'light' as const },
  { w: 375, tema: 'dark' as const }, { w: 375, tema: 'light' as const },
];

async function revisa(page: import('@playwright/test').Page, ruta: string, lang: string) {
  const errores: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  page.on('pageerror', (e) => errores.push(String(e)));
  const r = await page.goto(ruta);
  expect(r?.status(), 'la página responde').toBe(200);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('h1'), 'un solo h1 por página').toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  // La marca va UNA vez en el título (pestaña, historial, tarjeta social): el copy no la repite (PULIDO.md).
  const titulo = await page.title();
  expect(titulo.split('Luz y Taquígrafos').length - 1, `la marca, una sola vez en «${titulo}»`).toBeLessThanOrEqual(1);
  const ancho = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const recorta = (e: Element) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowX)) return true; return false; };
    const fuera = [...document.body.querySelectorAll('*')]
      .filter((e) => !e.closest('svg') || e.tagName.toLowerCase() === 'svg')
      .filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.right > vw + 1; })
      .filter((e) => !recorta(e) && !e.classList.contains('sr-only'))
      .slice(0, 5).map((e) => `<${e.tagName.toLowerCase()} class="${e.getAttribute('class') ?? ''}"> llega a ${Math.round(e.getBoundingClientRect().right)} px`);
    return { doc: document.documentElement.scrollWidth, vw, fuera };
  });
  expect(ancho.doc, 'el documento no es más ancho que la pantalla').toBeLessThanOrEqual(ancho.vw);
  expect(ancho.fuera, 'nada asoma por la derecha').toEqual([]);
  expect(errores, 'sin errores en la consola').toEqual([]);
}

for (const { w, tema } of ANCHOS) {
  test.describe(`${w} px · ${tema}`, () => {
    test.use({ viewport: { width: w, height: 780 }, colorScheme: tema });
    for (const lang of LANGS) {
      for (const ruta of RUTAS) {
        test(`humo · /${lang}/${ruta}`, async ({ page }) => {
          await revisa(page, `${lang}/${ruta}`, lang);
          if (ruta === '') {
            // La cabecera en dos filas y sin hamburguesa: las seis pestañas están a la vista.
            await expect(page.locator('.nav-sitio a')).toHaveCount(6);
            for (const a of await page.locator('.nav-sitio a').all()) await expect(a).toBeVisible();
            await expect(page.locator('header [aria-expanded]')).toHaveCount(0);
          }
        });
      }
    }
    test('humo · raíz (selector de lengua)', async ({ page }) => { await revisa(page, '', 'es'); });
    test('humo · catálogo de componentes', async ({ page }) => {
      test.skip(process.env.STRICT === '1', 'página de trabajo: no se genera en publicación');
      await revisa(page, 'es/componentes/', 'es');
    });
    test('humo · 404 (bilingüe cuando haya inglés)', async ({ page }) => {
      const r = await page.goto('404.html');
      expect(r?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('section[lang="en"]')).toHaveCount(HAY_INGLES ? 1 : 0);
    });
  });
}
