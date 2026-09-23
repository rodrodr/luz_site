# Contrato de construcción · edición 0.1 (22-09-2026)

**Orden del investigador (22-09-2026):** «dale duro para terminar con la máxima calidad en el menor tiempo posible».
Se adoptan **todas las opciones recomendadas** de `00_PLAN_sitio.md` («Decisiones abiertas») y se funden las
puertas 1, 2a y 2b en una sola revisión: el investigador revisará la **vista previa** (Puerta 4). Quedan como
pendientes suyos, marcados en el sitio con `data-pendiente` y listados en `config/enlaces.ts › PENDIENTES_DEL_INVESTIGADOR`:
D-3 (depositar CGOCUS V2.0: mientras tanto, **CGOCUS V1.1 con su sello**), D-4 (manejador `#q=`: mientras tanto,
[Copiar la consulta]), D-18, D-19, **D-20 (motivo del formulario)**, D-21 (URL: `rodrodr.github.io/luz/`), D-22
(revisar la tabla de grafías), D-25.

Si este contrato choca con el plan, **manda este contrato** (es posterior). Si el plan choca con la narrativa, manda
la narrativa. Nada del prototipo de 1931.

## Rutas del proyecto

| qué | dónde |
|---|---|
| Sitio | `/Users/rodrodr/Dropbox/Apps/luz_site` (Astro; `node_modules` se crea con `npm install`) |
| Plan · narrativa | `docs/00_PLAN_sitio.md` · `docs/01_NARRATIVA_sitio.md` |
| Estudio y datos ya calculados | `docs/estudio/` (informes, `datos/calc_*.py`, `critica/`, `capturas_explorador/`, `investigacion.json`) |
| Modelo | `/Users/rodrodr/Dropbox/Apps/parlaibero_site` (**solo lectura**) |
| V2 depositada | `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv` (MD5 `360332a0ff1327671530f15eed46ac0c`) |
| v3 del explorador | `/Users/rodrodr/.cache/luz_site/corpus.sqlite` (sha256 `3a0d8b2d…`) · papel de cada fila: `/Users/rodrodr/.cache/luz_site/clima/*.jsonl` · motor: `/Users/rodrodr/.cache/luz_site/motor_explorador/` |
| Metadatos del proyecto | `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json` (**solo lectura**) |
| Afinidades (CGOCUS V1.1) | `docs/estudio/critica/afin_*.csv` y `/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/data/` |
| Portada | `/Users/rodrodr/Dropbox/Apps/aecpa2026/landing/hero_svg.py` + `/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/data/hemiciclo_1936.json` |

⛔ No se escribe fuera de `luz_site/` (ni en `2REP/`, ni en `parlaibero_site/`, ni en `aecpa2026/`). El exportador vive
en **`luz_site/exportador/`** (no en `2REP_Explorer/tools/`, como decía el plan).

## Formatos compartidos

### Copy (textos)

- Fuente editable: **`docs/copy_es/*.md`**, un archivo por grupo de páginas (lo escribe su dueño):
  `comun.md` (cabecera, pie, frases fijas ↺, rótulos, glosario de interfaz, 404, raíz) · `inicio.md` · `cortes.md`
  (índice + 5 fichas) · `sesiones.md` (índice + 8 puertas) · `diario.md` · `metodo.md` · `datos.md` (Usar los datos +
  Versiones) · `explorador.md` · `afinidades.md` · `figuras.md` (rótulos, leyendas, plantillas de nota emergente y
  salvedades de cada figura).
- Formato **idéntico al de ParlaIbero** (`parlaibero_site/docs/02_COPY_es.md` y `scripts/copy2i18n.py`): claves con
  prefijo de grupo (`inicio.*`, `cortes.1931.*`, `fig.F01.*`…), marcadores `{{clave|formato}}` para **toda** cifra,
  enlaces y bloques como allí. **Ningún número tecleado** en prosa (años de un hecho, números de artículo y fechas de
  sesión se permiten como en ParlaIbero; ids de fila, recuentos y porcentajes, siempre con marcador).
- `scripts/copy2i18n.py` concatena `docs/copy_es/*.md` → `src/i18n/es.json` (y `docs/copy_en/*.md` → `en.json`).
- Cada grupo declara los marcadores que usa en **`docs/marcadores/<grupo>.md`**: `clave | valor esperado | base |
  cómo se calcula`. El exportador los implementa y **falla** si el valor calculado no es el esperado.

### Cifras

- `src/data/cifras.json`: `{ "<clave>": { "v": <número|texto>, "t": "<tipo: n|pct|peso|fecha|texto>", "base":
  "V2|v3|proyecto|afin|dv|explorador|croquis", "clave": "<letra de fuente>", "f": "<fórmula legible>", "d":
  "<AAAA-MM-DD>" } }` — la forma de ParlaIbero más `base`.
- `src/lib/cifras.ts` emite `<data class="cifra" data-k data-base value>`; en SVG, `data-k` + `data-base`.

### Exportador (`luz_site/exportador/`)

- `exportar.py` (principal): verifica huellas, ejecuta **cada módulo** de `exportador/modulos/*.py` y escribe
  `src/data/` y `public/datos/`. Cada módulo exporta `def exportar(ctx) -> dict[str, dict]` (cifras) y escribe sus
  JSON de figura. **Un módulo por dueño**: `base.py` (cifras generales, etapas, sesiones, meses, sello, jsonld, dv,
  explorador, grafías, hemiciclo) · `cortes.py` (F01, F16, F05, F09) · `sesiones.py` (F26, F30, puertas, citas) ·
  `diario.py` (F27, F28) · `metodo.py` (F19, F20, F10/F11, F12) · `datos.py` (F32, F33, F34, F25, F18, F07,
  fragmentos) · `explorador.py` (F17, F29) · `afinidades.py` (F21, F22).
- Entorno: `python3` con pandas 3 y openpyxl; `node` 22 para el motor del explorador. Reutilice
  `docs/estudio/datos/comun.py` y `calc_*.py`.
- `python3 exportador/exportar.py` debe correr completo en < 10 min; caché en `/Users/rodrodr/.cache/luz_site/`.

### Componentes y estilos

- Genéricos (dueño: **andamiaje**): `Base.astro`, `Pestanas`, `IndiceLateral`, `BandaCTA`, `SubNav`, `Captura`, `Cita`,
  `Salidas`, `NotaBases`, `CopiarConsulta`, `Sello`, `Hemiciclo`, `ficha/Vecinas`, `ficha/Tareas`, `lib/*`,
  `scripts/figuras.ts` (la isla genérica: nota emergente por `data-plantilla` + `data-v-*`, teclado ← → Inicio Fin Esc,
  toque, dianas enfocables), `styles/base.css` (tokens generados de `src/data/tokens.json`) y `styles/figuras.css`
  (solo lo común a todas las figuras).
- Figuras y plantillas de página (dueños por grupo): cada figura en su `.astro` con **estilos con ámbito** (`<style>`
  del componente), geometría en `src/viz/geom/<figura>.ts`; si una figura necesita comportamiento propio, su script
  va en `src/scripts/fig-<nombre>.ts`. **Nadie edita archivos de otro dueño**; si hace falta un cambio genérico, se
  anota en `docs/peticiones/<grupo>.md` y lo aplica la fase de integración.

## Verificación que cada dueño hace antes de terminar

`python3 exportador/exportar.py` (si tocó el exportador) · `npm run i18n` · `npm run build` sin errores · sus páginas
abren a 1.440 y 375 px en los dos temas sin desbordes ni errores de consola (Playwright en Python) · las cifras de su
copy coinciden con `src/data/cifras.json` · ninguna palabra vetada (plan, § Palabras y cifras vetadas).
