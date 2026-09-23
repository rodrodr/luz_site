import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { compactaCid } from './scripts/compacta-cid.mjs';
import { existsSync } from 'node:fs';

const HAY_INGLES = existsSync(new URL('./src/i18n/en.json', import.meta.url));

// El sitio vivirá en una subruta de GitHub Pages (D-21: repositorio `luz` → rodrodr.github.io/luz/). Con dominio propio
// basta cambiar estas dos variables en el despliegue: ningún enlace interno lleva la ruta escrita a mano (src/lib/rutas.ts).
const SITE = process.env.SITE_URL ?? 'https://rodrodr.github.io';
const BASE = process.env.BASE_PATH ?? '/luz';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  // Las páginas son estáticas y sin framework de cliente (D-7). La única isla es src/scripts/figuras.ts.
  build: { format: 'directory' },
  integrations: [
    // Al terminar: los atributos de ámbito de Astro, a un nombre corto (scripts/compacta-cid.mjs; presupuesto de peso.spec).
    { name: 'compacta-cid', hooks: { 'astro:build:done': ({ dir, logger }) => {
      const r = compactaCid(fileURLToPath(dir));
      logger.info(`${r.nombres} ámbitos · ${r.archivos} archivos · ${(r.ahorro / 1024).toFixed(0)} KB menos`);
    } } },
    // El catálogo de componentes (/<lengua>/componentes/) es una página de trabajo: fuera del mapa del sitio.
    // Las páginas inglesas entran cuando exista su copy (src/i18n/en.json); hasta entonces sirven el español prestado.
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } }, filter: (pagina) => !/\/componentes\/$/.test(pagina) && (HAY_INGLES || !/\/en\//.test(pagina)) }),
  ],
});
