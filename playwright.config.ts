import { defineConfig, devices } from '@playwright/test';

/**
 * Las pruebas corren contra `astro preview`, es decir, contra `dist/` tal como se va a publicar: antes hay que compilar
 * (`npm run build && npm test`). El puerto NO es el de `astro dev` (4321): con un servidor de desarrollo abierto,
 * Playwright lo reutilizaría y las pruebas medirían otra cosa.
 * `baseURL` incluye la base del despliegue y acaba en barra: las pruebas navegan con rutas relativas (`es/cortes/`).
 * Navegador: fuera de la integración continua se usa el Chrome del equipo (`PW_CHANNEL=chrome`, sin descargas); en la
 * integración continua, el Chromium que instala `npx playwright install chromium`.
 */
const PUERTO = Number(process.env.PUERTO_PRUEBAS ?? 4322);
const BASE = (process.env.BASE_PATH ?? '/luz').replace(/\/$/, '');
const RAIZ = `http://localhost:${PUERTO}${BASE}/`;
const CANAL = process.env.PW_CHANNEL ?? (process.env.CI ? undefined : 'chrome');

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 6,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: { baseURL: RAIZ, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], ...(CANAL ? { channel: CANAL } : {}) } }],
  webServer: {
    command: `npm run preview -- --port ${PUERTO}`,
    url: RAIZ,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
