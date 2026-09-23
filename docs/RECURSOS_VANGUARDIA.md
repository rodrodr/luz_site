# Recursos de vanguardia: movimiento y medios expresivos

Fecha: 22-09-2026. Este documento resume cinco informes de dominio (3D/WebGL, programación creativa, motores de movimiento, CSS nativo y visualización de datos). También incluye dos prototipos medidos y las skills instaladas.

**Regla de la casa.** Cada pieza se escribe primero en su estado final estático (HTML/SVG real, legible sin JS). El movimiento va dentro de `@media (prefers-reduced-motion: no-preference)` y de `@supports`. Se usa una librería solo donde la plataforma no da lo que hace falta. En cada página hay como máximo un motor de JS.

**Islas sin framework.** `client:visible` y `client:idle` solo funcionan con componentes de framework. Por eso cada pieza animada es un *custom element* (p. ej. `<lyt-diario-fila>`) que hace `import()` de su módulo cuando un IntersectionObserver lo ve. El elemento cumple estas reglas:
- pausa con `visibilitychange` y al salir de pantalla;
- DPR limitado a 1,5;
- renderiza solo cuando cambia el scroll;
- el `<canvas>` lleva `aria-hidden`, y el HTML real queda debajo.

## 1. Estrategia: cinco momentos

| # | Momento | Técnica elegida | Peso gz en el cliente | Sin JS / reduced-motion |
|---|---|---|---|---|
| 1 | **Portada: el hemiciclo de 1936** | CSS nativo: encendido escalonado por orden angular, «descenso de cámara» con `animation-timeline: scroll()` y `rotateX`, filtro por minoría con `:has()` y `@property` (**prototipo P1**) | **0 KB** | Planta SVG completa y filtro operativo (casillas nativas). Con movimiento reducido o en Firefox: planta fija |
| 2 | **De la página impresa del Diario a la fila de datos** (momento firma) | three.js r186 con WebGL2: `Points` y `ShaderMaterial`, en un solo draw call. Cada píxel de tinta viaja a un píxel de una celda de la fila; el scroll hace de *scrub* (**prototipo P2**) | three `core` 104,3 + `module` 89,9 = **194 KB** (build CDN completo; tras tree-shaking de Vite será menos, pendiente de medir) | Página y fila una junto a otra; la fila es una `<table>` HTML real |
| 3 | **Calendario de 755 sesiones → serie mensual; votaciones nominales** | Observable Plot **en el build** (SVG estático). Transición con FLIP y Web Animations API: los mismos 755 `rect`, unidos por `session_id`, pasan de la rejilla a columnas por mes. Retardo con `calc(sibling-index()*8ms)`. Anillo de votación con `conic-gradient` y `--si`/`--no` registradas con `@property` | **≈1–3 KB** de isla propia | Sin JS, SVG, `<title>` por celda y tabla en `<details>`. Con movimiento reducido, cambio instantáneo |
| 4 | **Redes de Afinidades (3 legislaturas, ~500 nodos y ~16.000 aristas)** | sigma.js 3 y graphology. ForceAtlas2 **calculado en Node**; en el cliente solo se interpolan posiciones al cambiar de legislatura: los que repiten se desplazan y los que entran o salen se funden. Los *reducers* iluminan la red de un diputado | sigma 47,2 + graphology 13,9 = **61 KB** (medido sobre los builds min de jsDelivr) | SVG póster exportado en el build, buscador accesible y lista de coautores. Con movimiento reducido, salto sin interpolar |
| 5 | **Transiciones entre páginas** | View Transitions **entre documentos nativas** (`@view-transition { navigation: auto }`) con 1–3 `view-transition-name` por navegación. Al pulsar una minoría, su bloque se convierte en la cabecera de su página; una celda del calendario se convierte en el título de la ficha. El cambio ES↔EN no se anima (tipos de transición) | **0 KB** | Navegación normal. Regla `prefers-reduced-motion` escrita a mano (sin ClientRouter) |

**Por qué esa técnica y no otra**
- **1. Portada.** Es la primera pantalla y manda el LCP, así que no lleva librería. El descenso de la planta cenital hacia la vista desde la tribuna cuenta «Luz y Taquígrafos» sin coste. Una sala 3D en three.js (`SVGLoader`, `ExtrudeGeometry` e `InstancedMesh` con 227 escaños) queda como **fase 2 opcional**: sumaría unos 194 KB a la portada y solo compensa si el giro de P1 se queda corto.
- **2. Diario → fila.** Es el único momento en que el 3D/GPU **es** el relato: la tipografía se vuelve dato, literalmente. CSS no puede mover 40.000 puntos, y Canvas 2D se ahoga por encima de unos 5.000 en móvil. Se eligió WebGL2 y no WebGPU porque ya va en todos los navegadores sin respaldo. Migrar a `three/webgpu` con TSL compute (en total unos 309 KB gz) es el siguiente paso, y la skill `webgpu-threejs-tsl` lo cubre.
- **3. Calendario.** La animación demuestra que la serie mensual está hecha de las mismas sesiones. D3 modular (≈20 KB) solo haría falta si se necesitan escalas en el cliente. GSAP Flip (9,7 KB + core 28,3 KB) no aporta nada frente a un FLIP con WAAPI de 30 líneas.
- **4. Redes.** El canvas WebGL de sigma basta con holgura para 16.000 aristas. cosmos.gl (`@cosmos.gl/graph`, MIT; **nunca** `@cosmograph/cosmos`, que es CC-BY-NC) queda en observación para un grafo conjunto mucho mayor.
- **5. Transiciones.** Son nativas y Firefox cae limpio a navegación normal. El `<ClientRouter />` de Astro añadiría JS a un sitio estático.

**GSAP 3.15** (core 28,3 KB, ScrollTrigger 18,0, SplitText 3,7, Flip 9,7; gratuito, licencia propia de Webflow, no OSI) **no entra en la fase 1**. Queda como reserva para dos casos:
- si hace falta *pin* con *scrub* en Firefox antes de que llegue allí `animation-timeline` (Interop 2026);
- si se quiere SplitText accesible en el título.

Las skills `gsap-*` siguen instaladas para ese caso.

## 2. Librerías: elegidas y descartadas

**Elegidas**
- **three.js r186**: MIT, 115,8k★. Momento 2 y posible fase 2 de la portada.
- **sigma.js 3.0.3 y graphology 0.26**: MIT.
- **Observable Plot 0.6.17** en el build (ISC).
- **Plataforma nativa**: View Transitions, `animation-timeline`, `@property`, `@starting-style`, `sibling-index()`, `:has()`, anchor positioning y Popover.

**En reserva**
- GSAP 3.15.
- Motion 13.4 (animate mini 2,3 KB según la documentación; el UMD completo mide 48,9 KB). Nunca junto con GSAP en la misma página.
- troika-three-text (54 KB): rótulos SDF si hay fase 2 3D.
- @chenglou/pretext 0.0.9 (MIT, 16 KB, versión 0.x): componer el Diario en canvas con coordenadas exactas por palabra. Es la vanguardia natural para P2 cuando haya texto real, fijando la versión.
- d3-delaunay (4,5 KB): estampillado Voronoi de un escaneo real en el build.

**Descartadas**

| Recurso | Motivo |
|---|---|
| p5.js 2.3.3 | 277–284 KB gz, LGPL, WebGPU experimental. Sirve para bocetar (skill `algorithmic-art`), no para producción; q5.js (49 KB) si hiciera falta |
| Theatre.js | Repositorio parado desde 2024 y Studio AGPL |
| Rive | ≈440 KB con WASM |
| Lottie / dotLottie | Activos de After Effects; decoración |
| deck.gl | 540 KB y sin mapas |
| 3d-force-graph | Redes 3D ilegibles |
| Lenis | Scroll suave percibido como secuestro; Safari limitado a 60/30 fps |
| scroll-timeline polyfill | Corre en el hilo principal |
| Mosaic + DuckDB-WASM | Varios MB. Solo en un futuro «Laboratorio» que se cargue al pulsar |
| OGL / regl | Mantenimiento lento; three ya estará en la página |
| VFX-JS | Shaders sobre `<img>`; riesgo de efecto decorativo. Revaluar con facsímiles reales |

## 3. Prototipos (en `docs/diseno/prototipos/`)

Se generan con `build_prototipos.py`, que usa datos reales, y se capturan con `capturar.py` (Playwright y Chromium; GPU ANGLE Metal, Apple M3 Max). Las capturas están en `prototipos/capturas/`.

**P1 · `p1_hemiciclo_portada.html`: hemiciclo de 1936, 0 KB de librería.**
- **Datos:** el SVG real `hero_hemiciclo.svg` con sus 227 escaños. El orden angular sale de `phi` en `hemiciclo_1936.json` y se escribe en el build como `--i`. La leyenda tiene 18 minorías con recuentos.
- **Capturas:** fotogramas `p1_hemiciclo_portada_0…3.png` y `_reducido_movil.png` (390 px, tema claro, sin desbordamiento horizontal).
- **FPS durante un scroll programado de 3 s: ≈120** (tope del monitor). Sin errores de consola.
- **Lo que se ve:** el encendido escalonado funciona y el filtro `:has()` responde. **Pendiente de ajuste:**
  - el giro `rotateX` se lee más como una ampliación que como un descenso;
  - al inclinarse se recortan las filas superiores.

  Hay que subir `perspective-origin`, rebajar `scale` y probar a separar la mesa presidencial en su propia capa.

**P2 · `p2_diario_a_fila.html`: de la página a la fila, three.js r186.**
- **Datos:** sesión real del **16-VI-1936**, ses. 45, DSC n.º 45, pp. 1359–1413, preside Martínez Barrio: 159 intervenciones, 48.458 palabras y 21 diputados. La fila es Gil Robles · CEDA · 5.978 palabras.
- **La página es una maqueta tipográfica:** los renglones son bloques y solo las cabeceras de orador son texto. En producción será el escaneo real del DSC, umbralizado en el build.
- **Partículas:** 40.000 en escritorio y 15.000 en móvil, un solo draw call.
- **Capturas:** fotogramas `p2_diario_a_fila_0…4.png`: página → tinta que se desprende → nube → asentamiento dorado → fila legible. Más `_reducido_movil.png`.
- **FPS: ≈120** con render bajo demanda. Sin errores.
- **Pendiente:**
  - la celda «DIARIO» se corta en el borde derecho del lienzo lógico: hay que ensanchar la rejilla o partir el texto en dos líneas;
  - en la vista estática móvil la tabla desborda en horizontal (`scrollWidth > innerWidth`): usar un layout apilado por celdas.

**Advertencia sobre los FPS:** se midieron en un M3 Max. Falta repetirlos con CPU ×4 más lenta (DevTools) y en un móvil real antes de fijar el número de partículas.

## 4. Skills

**Instaladas** (copiadas a `~/.claude/skills/<nombre>/` desde el tarball del repositorio, después de leer SKILL.md y buscar en todos los ficheros patrones de red, instalación y credenciales)

| Skill | Ruta | Contenido verificado |
|---|---|---|
| `dgreenheck/webgpu-claude-skill@webgpu-threejs-tsl` | `~/.claude/skills/webgpu-threejs-tsl/` | 9 .md y 7 .js de ejemplo o plantilla; sin scripts ejecutables ni red, solo documentación de three.js |
| `emalorenzo/three-agent-skills@three-best-practices` | `~/.claude/skills/three-best-practices/` | 29 .md (MIT); los `npm install` son texto de ejemplo |
| `emilkowalski/skills@review-animations` | `~/.claude/skills/review-animations/` | SKILL.md y STANDARDS.md; `disable-model-invocation: true` (se invoca a mano) |
| `emilkowalski/skills@find-animation-opportunities` | `~/.claude/skills/find-animation-opportunities/` | Solo lectura; propone y no implementa. Encaja con el criterio 1: rechazar la animación innecesaria |
| `anthropics/skills@algorithmic-art` | `~/.claude/skills/algorithmic-art/` | SKILL.md, plantilla .js y viewer.html; solo carga p5 1.7.0 de cdnjs. Para bocetar la tinta y los campos de flujo, no para producción |

**Ya presentes y útiles:** `modern-css`, `astro-framework`, `tooltips`, `charts-graphs`, `gsap-*`, `animate`, `emil-design-eng`.

**Descartadas**

| Skill | Motivo |
|---|---|
| `improve-animations` | Lanza un subagente en un worktree; con review/find basta |
| `nousresearch/hermes-agent@p5js` | `serve.sh` puede descargar `npx serve` |
| `hermes-agent@pretext` | Fija la 0.0.6 vía esm.sh |
| `threejs-shaders` | Redundante con TSL |
| `freshtechbro/*` | Desfasadas; dos scripts dan 404 |
| `iart-ai/particle-system` | Scripts `.sh` con Playwright; repositorio de 13★ |
| `3d-web-experience` | Se marca a sí misma `risk: critical` |
| `xanimations` | Su `.py` no está leído |
| `d3-viz` | Snyk: Warn; no leída |
| `scrollytelling` | Enfoque de marketing |

## 5. Referencias

- Codrops, WebGPU Gommage (texto MSDF que se deshace con TSL): https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/
- Codrops, SVG Map Animations on scroll: https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap/
- The Pudding, «In pursuit of democracy» (Congreso de EE. UU. como puntos): https://pudding.cool/2025/11/democracy/
- NYT, curva de tipos en 3D (el 3D al servicio de una serie): https://www.nytimes.com/interactive/2015/03/19/upshot/3d-yield-curve-economic-growth.html
- Demos nativas de Bramus: https://scroll-driven-animations.style/ y https://view-transitions.chrome.dev/
- Mike Bostock, Voronoi stippling: https://observablehq.com/@mbostock/voronoi-stippling
- Interop 2026: https://webkit.org/blog/17818/announcing-interop-2026/
