# recursos-vanguardia-lyt (wf_f87dd17c-62d) · 6 resultados · 23-09 03:02

## Resultado 1

# Visualización de datos y relato: recursos para Luz y Taquígrafos (sitio Astro estático)

Cómo obtuve las cifras: la API de GitHub dejó de responder por límite de peticiones, así que tomé las estrellas del proxy ungh.cc. Las versiones y licencias vienen del registro npm a 22-09-2026. El peso gz sale de bundlephobia (paquete completo) o, donde bundlephobia falló, de la entrada ESM de jsDelivr, que no incluye dependencias.

## (1) Los mejores recursos, cada uno ligado a un momento del sitio

**1. Observable Plot, generado en el build y no en el cliente**
- **Datos:** https://observablehq.com/plot · v0.6.17 · ISC · 5,4k★ · 125 KB gz si se envía al cliente, 0 KB si se genera en el build.
- **Momento: calendario de 755 sesiones y series por mes.**
  - Plot acepta la opción `document`, así que se puede ejecutar en el frontmatter de Astro y emitir un SVG estático con una marca `cell` por día (semanas × días, un panel por año).
  - La isla del cliente solo añade el tooltip y el enlace a cada sesión, y pesa menos de 5 KB.
  - Las series por mes van igual: SVG estático más `Plot.tip` en una isla pequeña.
- **Degradación:** sin JS se ve completo. Cada celda lleva `<title>`, y debajo hay una tabla `<details>` con el recuento por mes.
- **Riesgos:** sigue en versión 0.x, aunque es estable y la mantiene Observable. Los colores de los temas oscuro y claro deben salir de variables CSS (`currentColor` y `var(--…)`) y no quedar fijados en el SVG.

**2. D3 v7 modular, para las transiciones entre estados de un gráfico**
- **Datos:** https://d3js.org · v7.9.0 · ISC · 113,8k★. Los módulos necesarios (d3-selection 4 KB, d3-transition 3 KB, d3-scale 5 KB, d3-shape 7 KB) suman unos 20 KB gz, frente a 90 KB del paquete completo.
- **Momento: el calendario se convierte en la serie mensual.**
  - Los mismos 755 `rect`, unidos por `session_id`, pasan de la cuadrícula del calendario a columnas apiladas por mes. El lector ve que la serie mensual está hecha de esas sesiones, sin agregados abstractos.
  - La misma técnica sirve para las votaciones nominales: cada diputado es un punto que pasa del escaño en el hemiciclo a la columna Sí / No / Ausente.
- **Accesibilidad:** con `prefers-reduced-motion` el cambio es instantáneo o un fundido, y cada estado se puede alcanzar con botones accesibles por teclado.
- **Riesgos:** flubber (6,9k★, MIT) y d3-interpolate-path (BSD-3) sirven para transformar trazados, pero no se actualizan desde 2022–2023. Usarlos solo si hace falta cambiar la forma de un trazado.

**3. sigma.js + graphology, para las redes de Afinidades**
- **Datos:**
  - https://www.sigmajs.org · sigma v3.0.3 · MIT · 12,2k★ · 25 KB gz.
  - graphology v0.26.0 · MIT · 1,7k★ · 12,5 KB gz.
  - graphology-layout-forceatlas2 · 3 KB gz.
- **Momento: redes de coautoría de tres legislaturas (unos 500 nodos y 16.000 aristas), que en WebGL se mueven sin esfuerzo.**
  - Calcular ForceAtlas2 en Node durante el build y enviar posiciones fijas, sin simulación en el cliente.
  - Para cambiar de legislatura, animar las posiciones de los diputados que repiten; los que entran y salen aparecen o se desvanecen.
  - Los *reducers* de sigma permiten, al pasar el ratón, iluminar la red de un diputado y atenuar el resto con los colores de minoría del hemiciclo.
- **Accesibilidad y degradación:** el canvas es opaco para lectores de pantalla. Hacen falta un buscador de diputado accesible por teclado, una lista de sus coautores principales y un SVG estático exportado en el build como póster o `<noscript>`.
- **Carga:** con `client:visible`, y la animación desactivada con `reduced-motion`.

**4. cosmos.gl, la apuesta de futuro para redes grandes**
- **Datos:** https://github.com/cosmosgl/graph · @cosmos.gl/graph v3.4.2 · MIT · 1,3k★ · 153 KB gz · proyecto en incubación en OpenJS Foundation. La v3 renderiza con luma.gl sobre WebGL2, la misma capa que deck.gl.
- **Licencia:** el paquete antiguo `@cosmograph/cosmos` es **CC-BY-NC-4.0**. Hay que evitarlo y usar `@cosmos.gl/graph`.
- **Dónde encaja:** para 500 nodos es excesivo. Tiene sentido solo si se muestra una red mucho mayor, por ejemplo las tres legislaturas juntas o una red orador-respuesta con decenas de miles de nodos. En ese caso la simulación en GPU «se asienta» ante el lector, y el movimiento cuenta que se trata de una estructura que emerge.
- **Riesgos:** exige WebGL2 y gasta GPU y batería en el móvil. Hay que llamar a `pause()` al salir de la vista y, con `reduced-motion`, arrancar desde posiciones ya calculadas.

**5. El motor del scroll: GSAP ScrollTrigger o Scrollama, más CSS nativo como extra**
- **Datos de Scrollama:** https://github.com/russellsamora/scrollama · v3.2.0 · MIT · 6k★ · 2 KB gz · estable, último cambio en noviembre de 2025.
- **CSS nativo** (`animation-timeline: view()`): funciona en Chromium y Safari. En Firefox estable seguía detrás de un flag en la v152 y es prioridad de Interop 2026.
- **Propuesta:**
  - Un solo motor para los pasos que cambian el estado del gráfico. Si el ámbito de animación adopta GSAP ScrollTrigger (skills ya instaladas), usarlo y descartar Scrollama. No conviene tener dos sistemas de scroll.
  - CSS `animation-timeline` solo para detalles decorativos, dentro de `@supports` y `prefers-reduced-motion: no-preference`.
- **Degradación:** sin JS, los pasos se leen como texto seguido de figuras estáticas.

**6. Sonificación y accesibilidad de gráficos (vanguardia útil)**
- **Momento: botón «Escuchar la República»**, que reproduce el calendario como ritmo: un golpe por sesión, con la altura según el número de intervenciones. Opcional, con cursor visible y activado por clic, como exige además la política de autoplay.
- **Motor:** la Web Audio API nativa (0 KB) basta.
  - Tone.js v15.1.22 (MIT, 14,7k★, 75 KB gz) solo si se quiere síntesis rica.
  - Erie (`erie-web` 1.0.1, MIT, gramática de sonificación de UW) si se quiere una especificación declarativa. Es más experimental.
- **Accesibilidad:** Olli (`olli-adapters` 2.0.2, BSD-3, MIT Vis Group) genera un árbol navegable por lector de pantalla a partir del gráfico.
- **Riesgo:** convertir la sonificación en un truco. Solo se justifica si se presenta también como acceso alternativo a los datos.

**Descartados o condicionales**
- **Mosaic/vgplot + DuckDB-WASM** (v0.31.0, BSD-3, 1,4k★; duckdb-wasm v1.33, MIT): la entrada vgplot pesa 8 KB, pero el WASM de DuckDB ocupa varios MB. Solo para una página «Laboratorio» que se cargue al pulsar un botón: vistas cruzadas sobre un Parquet de intervenciones, con un pincel sobre la serie mensual que filtra calendario y oradores. Nunca en las páginas del relato. Su API aún cambia antes de la 1.0.
- **deck.gl** (v9.4.0, MIT, 14,6k★, 540 KB gz completo): no aporta nada sin mapas grandes. Para un mapa provincial bastan Plot con d3-geo.
- **three.js** (0.186, 181 KB gz): en mi ámbito solo encaja en el paso de la página impresa a la fila de datos. Con InstancedMesh, cada palabra de una página real del Diario, con sus cajas del OCR, volaría hasta su celda en la tabla. Es animación que nace de los datos y se lo paso al ámbito de animación.
- **p5.js** (v2.3.3, LGPL-2.1, 324 KB gz): pesa demasiado para este fin.

## (2) Skills

| Skill | Instalaciones / ★ | Lectura y seguridad | ¿Instalar? |
|---|---|---|---|
| `mgifford/accessibility-skills@charts-graphs` | 126 | Leí el SKILL.md entero (26 KB): solo Markdown y enlaces de referencia (W3C, MDN, ColorBrewer). Sin scripts, red ni credenciales. Cubre texto alternativo, tablas, `reduced-motion` y contraste no textual. | **Sí** |
| `chrisvoncsefalvay/claude-d3js-skill@d3-viz` | 802 / 232★ | No pude descargar el SKILL.md ni la lista de ficheros. skills.sh muestra Snyk: Warn. | **No por ahora.** Leerla antes. |
| `doodledood/claude-code-plugins@scrollytelling` | 332 / 20★ | Solo vi el resumen de skills.sh. Enfoque de marketing («400% más de interacción»), sin detalle de librerías ni de accesibilidad. | No |
| `wshobson/agents@data-storytelling` | 15K | Leído: plantilla narrativa para presentaciones de empresa. Genérica. | No |
| `anthropics/knowledge-work-plugins@data-visualization` | 12,3K | Leído: matplotlib, seaborn y plotly en Python. No sirve para web. | No |
| `nexu-io/open-design@d3-visualization` | 2,8K | Leído: 2 KB genéricos. | No |
| `duckdb/duckdb-skills@*` (oficial) | ~1,2K | No leída. | Solo si se adopta Mosaic, y leyéndola antes. |
| `solanabettercall/skills@sigma`, `@graphology`; `openai/plugins@scrollytelling-and-parallax-data-visualization` | 3–7 | Sin tracción. | No |

Las skills ya instaladas (`dataviz`, `scientific-visualization` y el conjunto `gsap-*`) cubren el resto.

## (3) Ejemplos de referencia
- The Pudding, «In pursuit of democracy»: el caso más cercano, el registro del Congreso de EE. UU. desde 1880 con un punto por cada cinco discursos. https://pudding.cool/2025/11/democracy/
- The Pudding, «The Language of Congress»: https://congress.pudding.cool/
- The Pudding, cómo implementar scrollytelling con seis librerías: https://pudding.cool/process/how-to-implement-scrollytelling/
- Andris et al., «The Rise of Partisanship…», PLOS ONE 2015: redes de cooperación por legislatura, el modelo directo para Afinidades. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0123507
- Anuncio de cosmos.gl v3 y demos de redes en GPU: https://openjsf.org/blog/cosmos-gl-v3 · demo de sigma: https://www.sigmajs.org

Fuentes: [OpenJS: cosmos.gl](https://openjsf.org/blog/introducing-cosmos-gl) · [cosmos.gl v3](https://openjsf.org/blog/cosmos-gl-v3) · [cosmosgl/graph](https://github.com/cosmosgl/graph) · [web-features: scroll-driven animations](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/) · [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) · [skills.sh d3-viz](https://skills.sh/chrisvoncsefalvay/claude-d3js-skill/d3-viz) · [skills.sh scrollytelling](https://skills.sh/doodledood/claude-code-plugins/scrollytelling) · [Pudding democracy](https://pudding.cool/2025/11/democracy/)

## Resultado 2

## Dominio 3D, WebGL y WebGPU en la web editorial

**Veredicto general.** El sitio justifica 3D o GPU en tres sitios concretos:
- la portada con el hemiciclo,
- el paso de la página impresa a la fila de datos,
- la animación del layout de las redes de coautoría.

En el calendario de 755 sesiones y en las series por mes, el 3D sería decoración. Ahí basta SVG o Canvas 2D con GSAP. Todos los pesos los medí comprimiendo con `gzip -9` el fichero de jsDelivr en la versión indicada, antes de cualquier tree-shaking.

### (1) Los mejores recursos

**1. three.js r186 con `three/webgpu` (WebGPURenderer) y TSL**
- **Datos:** https://github.com/mrdoob/three.js · npm `three@0.186.0` (8-sep-2026) · MIT · 115.767★.
- **Peso gz:** `three.core.min` 101 KB, más `three.module.min` 87 KB, suman unos 188 KB con el renderer WebGL. Con el de WebGPU, `three.webgpu.min` pesa 199 KB y el total ronda los 300 KB. Los dos builds importan el mismo `three.core.js`.
- **Estado:** desde r171 se importa sin configuración y cae solo a WebGL2 cuando falta WebGPU. WebGPU ya viene activado en Chrome/Edge, Safari 26 (macOS/iOS) y Firefox 141+ en Windows y Mac ARM. En Firefox para Android sigue pendiente.
- **Momento: portada.** El SVG del hemiciclo de 1936 se convierte en sala 3D con `SVGLoader` y `ExtrudeGeometry` (planta extruida). Los 227 escaños van en un `InstancedMesh`, que se dibuja en una sola llamada y lleva el color de cada minoría como atributo por instancia. La cámara parte de la vista cenital, que coincide con el SVG, y baja hasta la tribuna de los taquígrafos al hacer scroll con GSAP ScrollTrigger, que ya está instalado. Luego vuelve a la planta 2D. Ese viaje ilustra el título «Luz y Taquígrafos»; no es un adorno.
- **Degradación:** el SVG actual se queda siempre como póster, como versión sin JS y como capa accesible con teclado y lectores de pantalla. El `<canvas>` lleva `aria-hidden`. La isla se carga con `client:visible` o `client:idle` después del LCP y solo si se cumplen `prefers-reduced-motion: no-preference` y WebGL2. Se renderiza bajo demanda, sin bucle continuo. Se pausa con IntersectionObserver y `visibilitychange`, y el DPR se limita a 1,5.
- **Riesgos:** de 190 a 300 KB en la portada. Si se hace mal, puede leerse como un «efecto demo».

**2. Técnica: partículas de tinta que se ordenan en filas (GPGPU o morph en el vertex shader)**
- **Base:** la misma three.js. Para física se usa TSL compute con `instancedArray`. En WebGL2 basta con dos atributos (`position` y `target`) y un uniform `uProgress`.
- **Momento: la página impresa del Diario se convierte en la fila de datos.** Se toma una página real escaneada y se muestrean de 30.000 a 60.000 píxeles de tinta tras aplicar un umbral. Cada partícula tiene como destino una celda de la fila (fecha, número de sesión, orador, texto). El scroll hace de «scrub» sobre el progreso. Un ruido curl dispersa la tinta a mitad del recorrido y la asienta al llegar.
- **Coste:** mínimo para la GPU. En móvil se baja a unas 15.000 partículas.
- **Degradación:** con reduced motion o sin WebGL, un fundido entre dos estados estáticos (página y fila).
- **Referencia técnica:** el Gommage de Codrops (enero de 2026), texto MSDF que se deshace en partículas con TSL.

**3. troika-three-text**
- **Datos:** https://github.com/protectwise/troika · npm `troika-three-text@0.52.5` (jul-2026) · MIT · 1.972★ · 54 KB gz.
- **Qué hace:** texto SDF nítido dentro de la escena WebGL a partir de cualquier .woff, incluida la serif cursiva de display, con acceso a cada glifo.
- **Momentos:** los rótulos de las minorías en el hemiciclo 3D, y las celdas de destino de la fila en el recurso 2, que se componen letra a letra; por ejemplo, «Sr. Gil Robles».
- **Riesgos:** el texto dentro del canvas no es accesible, así que hay que duplicarlo en el DOM. Añade 54 KB gz a la cuenta de three.

**4. VFX-JS**
- **Datos:** https://github.com/fand/vfx-js · `@vfx-js/core@1.1.0` (jun-2026) · MIT · unas 1.150★ · 29 KB gz.
- **Qué hace:** aplica shaders WebGL a elementos `<img>` y `<video>` que ya existen en el DOM, sin montar escena. No he comprobado si también funciona con texto.
- **Momento:** los facsímiles del Diario y las fotografías de época. Al entrar en pantalla, un shader propio de tinta que se asienta, sangrado o semitono de imprenta. El `<img>` real sigue en el DOM con su alt, así que funciona sin JS y para buscadores.
- **Encaje con Astro:** una isla `client:visible`.
- **Riesgos:** evitar sus efectos predefinidos, como el glitch, que son pura decoración. La cadencia de publicación es modesta.

**5. OGL como alternativa ligera (y regl)**
- **OGL:** https://github.com/oframe/ogl · 1.0.11 · Unlicense · 4.655★ · unos 38 KB gz la librería entera · último publish en enero de 2025.
- **Uso:** si el recurso 2 o un fondo de tinta se hacen solo con un vertex morph, OGL basta. Cuesta 38 KB en lugar de unos 190 y encaja en páginas donde three no se justifica.
- **Riesgos de OGL:** no tiene WebGPU, la comunidad es menor y el ritmo de publicación es lento.
- **regl:** https://github.com/regl-project/regl · 2.1.1 · MIT · 5.581★ · 27 KB gz. Es buena para visualizaciones instanciadas, pero está en mantenimiento (último publish en noviembre de 2024).
- **Recomendación:** three por defecto; OGL solo en una página aislada.

**6. cosmos.gl: layout y render del grafo en la GPU**
- **Datos:** `@cosmos.gl/graph@3.4.2` (21-sep-2026) · MIT · 69 KB gz · https://github.com/cosmograph-org/cosmos. No pude obtener las estrellas.
- **Licencia:** el paquete antiguo `@cosmograph/cosmos` es ahora CC-BY-NC-4.0 y hay que evitarlo.
- **Momento:** las redes de coautoría (hasta unos 500 nodos y 16.000 aristas). La simulación corre en la GPU y se ve reorganizarse en vivo al pasar de la I a la II y a la III legislatura. El «enfriamiento» del layout forma parte del relato.
- **Alternativa más madura:** sigma.js v3 (https://github.com/jacomyal/sigma.js · 12.170★ · MIT · 25 KB gz), también WebGL.
- **Descartado:** 3d-force-graph (6.411★). Las redes en 3D quedan vistosas pero no se pueden leer.

**Vigilar, no usar todavía:**
- **TypeGPU** (0.12.5, MIT, 3.228★, 79 KB gz). WebGPU tipado y muy de vanguardia, pero sin respaldo WebGL.
- **p5.js 2.3.3** (LGPL-2.1, 24.024★, 277 KB gz). El renderer WebGPU es experimental. Sirve para bocetar la tinta, no para producción.
- **Lygia** (https://github.com/patriciogonzalezvivo/lygia, 3.444★). Buenas funciones de ruido para shaders, pero la licencia Prosperity exige revisar el uso.
- **Theatre.js** (12.693★). Estancado: último publish en mayo de 2024.

### (2) Skills (leí el SKILL.md de cada una; ninguna instalada)

| Skill | Instalaciones / ★ del repo | Seguridad tras leerla | ¿Instalar? |
|---|---|---|---|
| `dgreenheck/webgpu-claude-skill@webgpu-threejs-tsl` | 1,2K / 1.202★ | Solo docs, ejemplos .js y plantillas (compute, post, device loss, límites). Sin scripts, red ni credenciales. **Segura** | **Sí**: la mejor para TSL/WebGPU |
| `emalorenzo/three-agent-skills@three-best-practices` | 1,1K / 51★ | MIT. Reglas en markdown para three 0.182+ (memoria, draw calls, TSL, WebGPU, móvil, Core Web Vitals). Sin scripts. **Segura** | **Sí**: guardarraíl de rendimiento |
| `cloudai-x/threejs-skills@threejs-shaders` (y `-fundamentals`) | 10,9K y 12,1K / 3.361★ | Solo markdown y GLSL, sin scripts. **Segura**. Centrada en WebGL clásico | Opcional: solo `shaders` |
| `freshtechbro/claudedesignskills@threejs-webgl` | 3,8K / 922★ | Anuncia tres scripts; dos dan 404 y el tercero (`setup_scene.py`, generador con argparse, os y pathlib) no hace red. **Sin riesgo, pero documentación desfasada y genérica** | No |
| `iart-ai/webgl-animation-skills@particle-system` | 593 / 13★ | Scripts `.sh` que llaman a `npx playwright`. Riesgo bajo, pero ejecutan binarios y el repo es muy pequeño | No: copiar solo la idea del curl noise |
| `sickn33/agentic-awesome-skills@3d-web-experience` | 4,9K | El propio frontmatter la marca `risk: critical`, y el contenido es genérico (r3f, Spline) | No |
| `cazala/webgpu-skill@webgpu` | 803 | Solo markdown sobre WebGPU puro. Segura | No: redundante si se usa three/TSL |

### (3) Ejemplos de referencia
1. Codrops, «WebGPU Gommage Effect», texto MSDF disuelto con TSL: https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/
2. Codrops, «Interactive Text Destruction with Three.js, WebGPU and TSL»: https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/
3. NYT R&D `three-story-controls`, cámaras sobre raíles para relatos 3D (272★; sirve como patrón de coreografía, con GSAP basta): https://github.com/nytimes/three-story-controls
4. NYT, «A 3-D View of a Chart That Predicts the Economic Future: The Yield Curve» (Aisch y Cox), el 3D al servicio de una serie temporal: https://www.nytimes.com/interactive/2015/03/19/upshot/3d-yield-curve-economic-growth.html
5. Utsubo, «100 Three.js Tips» y la guía de migración a WebGPU (2026), fuente de la skill de best practices: https://www.utsubo.com/blog/threejs-best-practices-100-tips · https://www.utsubo.com/blog/webgpu-threejs-migration-guide

Fuentes adicionales:
- Estado de WebGPU en los navegadores: https://web.dev/blog/webgpu-supported-major-browsers · https://github.com/gpuweb/gpuweb/wiki/Implementation-Status
- Release r186 de three.js: https://github.com/mrdoob/three.js/releases/tag/r186
- WebGPU en p5.js 2.2: https://processingfoundation.org/blog/p5js-21-and-22-expanding-graphics-avenues-with-p5strands-improvements-and-webgpu/

Las notas de trabajo y los SKILL.md descargados están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/3d/`.

## Resultado 3

**Dominio: programación creativa y generativa. Recursos verificados el 22-09-2026.**

Cómo medí los datos: versión y licencia vienen del registro de npm. Las estrellas salen de la página de cada repositorio en GitHub. El peso gz es mi medida con `gzip -9` sobre el build de jsDelivr.

Una premisa para todo lo que sigue. Las directivas `client:visible` y `client:idle` de Astro solo funcionan con componentes de framework. En «islas sin framework» cada pieza debe ser un *custom element*, por ejemplo `<lyt-hemiciclo>`. Ese elemento carga su módulo con `import()` dinámico cuando un IntersectionObserver lo ve en pantalla. También debe:
- pausar la animación cuando la pestaña no está visible (`visibilitychange`) o la pieza sale de pantalla;
- limitar la densidad de píxeles (DPR) a 1,5 y bajar a 30 fps en móvil;
- con `prefers-reduced-motion`, pintar un solo fotograma final fijo, o un SVG/PNG generado en el build.

El HTML o SVG real siempre va debajo del canvas, que se marca como decorativo (`aria-hidden`).

## (1) Los mejores recursos

**1. Estampillado de Voronoi ponderado (técnica) con d3-delaunay 6.0.4**
- Datos: licencia ISC, 4,5 KB gz. https://github.com/d3/d3-delaunay
- Momento: el paso de la página impresa del Diario a la fila de datos.
- Propuesta: en el build (Node, determinista), el escaneo de una página se convierte en N puntos de tinta, con N igual al número de intervenciones de esa sesión. Al hacer scroll, esos puntos se desprenden del papel y viajan a su casilla del calendario de 755 sesiones o a su fila. La tipografía se vuelve, literalmente, dato.
- Coste: en el cliente solo viaja un JSON de posiciones, animado con Canvas 2D o GSAP.
- Riesgos y degradación:
  - con más de unos 5.000 puntos en móvil hay que usar Canvas y no DOM;
  - sin JS o con movimiento reducido, se muestran la página y la fila una junto a la otra.

**2. @chenglou/pretext 0.0.9**
- Datos: MIT, 50,4k★, unas 1M descargas semanales, 16 KB gz. Salió en marzo de 2026, así que es lo más de vanguardia de esta lista. https://github.com/chenglou/pretext · demos: https://www.pretext.cool/
- Qué hace: calcula saltos de línea y la posición de cada glifo sin tocar el DOM, cientos de veces más rápido que el reflow del navegador.
- Momento: la imprenta del Diario.
- Propuesta: componer en canvas un fragmento real del Diario a dos columnas, con coordenadas exactas de cada palabra. Después se anima, por ejemplo:
  - líneas que se «funden» como en una linotipia;
  - el texto que se reorganiza alrededor del escaño del orador activo;
  - palabras que vuelan a las celdas de la fila (orador, fecha, minoría, número de palabras).
- Riesgos:
  - está en 0.x y la API puede cambiar: hay que fijar la versión;
  - hay que esperar a `document.fonts.ready` antes de medir;
  - el texto en canvas no es accesible, así que el HTML real debe seguir presente.

**3. perfect-freehand 1.2.3 con trazado SVG**
- Datos: MIT, 5,7k★, 2,3 KB gz. https://github.com/steveruizok/perfect-freehand
- Trazado: GSAP DrawSVG, ahora gratuito y con skills gsap-plugins ya instaladas, o `stroke-dashoffset` en CSS.
- Momento: la escritura taquigráfica generativa.
- Propuesta: generar trazos de tipo taquigráfico a partir del texto real de una intervención. Cada sílaba se asigna a una primitiva de línea, curva o bucle, con temblor de mano por ruido y grosor que varía con la presión. El trazo se dibuja al ritmo del discurso y luego se «resuelve» en la transcripción impresa: del taquígrafo al Diario.
- Riesgos:
  - salvo que se use la tabla real del sistema Martí, hay que presentarlo como evocación, no como reproducción. Creo que las Cortes usaban el sistema Martí, pero está pendiente de verificar con fuentes;
  - con movimiento reducido se muestra solo el trazo final.

**4. Campo de flujo en Canvas 2D nativo con simplex-noise 4.0.3**
- Datos: MIT, 1,8k★, 2,0 KB gz, estable desde 2024. https://github.com/jwagner/simplex-noise.js
- Fundamento: el ensayo de Tyler Hobbs sobre campos de flujo.
- Momento: un fondo vivo del hemiciclo en la portada.
- Propuesta: partículas finas en oro y crema, con semilla fija para que el dibujo sea reproducible. Nacen de los 227 escaños con densidad según cada minoría de 1936 y fluyen por un campo de ruido *curl* anclado a los radios de la planta. Al pasar el ratón o el foco por una minoría, se iluminan solo sus hilos, y así la animación explica la composición de la Cámara.
- Coste: 2 KB más 3-4 KB de código propio. Se puede mover a OffscreenCanvas en un Worker.
- Riesgos:
  - batería en móvil: poner un tope de partículas y pausar fuera de pantalla;
  - con movimiento reducido, el SVG estático actual.

**5. q5.js 4.8.2 frente a p5.js 2.3.3, en modo instancia**
- Datos:
  - p5.js: LGPL-2.1, 24,0k★, 284 KB gz el bundle completo. Trae p5.strands (shaders), WebGPU experimental y builds modulares. https://github.com/processing/p5.js
  - q5.js: LGPL-3.0, API compatible con p5, 49 KB gz. En modo módulo usa WebGPU por defecto y recurre a Canvas2D si no hay soporte. Solo 421★, pero con publicaciones frecuentes (4.8.2 el 24-08-2026). https://github.com/q5js/q5.js
- Mi recomendación: p5 para prototipar y como lengua común (editor, comunidad, `saveCanvas` para exportar figuras al paper). En producción, q5 o Canvas nativo. Cargar p5 entero es desproporcionado.
- Momento: una lámina generativa para la página de Sesiones. Las 755 sesiones como una trama de hilos: largo según número de intervenciones, color según la presidencia, grosor según votaciones nominales. Es a la vez obra de portada de sección y figura exportable.
- Riesgos:
  - la comunidad de q5 es pequeña;
  - LGPL: sin problema mientras se use la librería sin modificar.

**Segunda línea**
- **Two.js 0.8.24** (MIT, 8,7k★, 50 KB gz, activo en agosto de 2026): un grafo de escena que dibuja igual en SVG, Canvas o WebGL. Solo compensaría si el hemiciclo necesitara morphing complejo entre 1931, 1933 y 1936. Para eso bastan el SVG nativo y GSAP.
- **Descartado: Paper.js 0.12.18** (MIT, 15,1k★, 70 KB gz). Su última versión es de julio de 2024.
- **Textura del papel y sangrado de tinta:** `feTurbulence` y `feDisplacementMap` de SVG, sin coste de librería.

## (2) Skills

**anthropics/skills@algorithmic-art**
- Datos: unas 82k instalaciones, repositorio de 177,6k★, pasa las tres auditorías de skills.sh.
- Lo que revisé: busqué en el SKILL.md (404 líneas) patrones de red, instalación y credenciales. Solo carga p5 1.7.0 desde cdnjs, sin scripts ni credenciales. No leí la plantilla `templates/viewer.html`.
- Enfoque: una «filosofía algorítmica» y semillas, pero pensada para artefactos sueltos en modo global de p5 1.x.
- **Instalar: sí**, para idear y prototipar, adaptando luego a instancia y a 2.x.

**nousresearch/hermes-agent@p5js**
- Datos: 457 instalaciones, repositorio de 248k★, pasa las tres auditorías.
- Contenido (558 líneas): modo instancia, ruido, campos de flujo, estampillado y exportación determinista a PNG/MP4 con Puppeteer y ffmpeg, que también sirve al pipeline de vídeo.
- Lo que revisé en sus scripts:
  - `setup.sh` solo comprueba y sugiere `npm install puppeteer`;
  - `serve.sh` usa `python -m http.server` o, si falta, `npx serve`, que descargaría un paquete;
  - `render.sh` y `export-frames.js` no hacen peticiones de red.
- Usa p5 1.11.3.
- **Instalar: sí, con cautela.** No ejecutar `setup.sh` ni `serve.sh` sin revisarlos.

**nousresearch/hermes-agent@pretext**
- Datos: 314 instalaciones, pasa las auditorías.
- Contenido (220 líneas): patrones creativos con plantillas. Importa desde esm.sh la versión 0.0.6, anterior a la actual 0.0.9.
- **Instalar: sí**, subiendo la versión fijada a 0.0.9.

**Rechazados:** el resto de resultados de `skills find "p5.js"` son copias de Hermes con 1 instalación cada una. Las búsquedas «generative art» y «canvas animation» no dieron nada.

## (3) Referencias

- Tyler Hobbs, «Flow Fields»: https://www.tylerxhobbs.com/words/flow-fields
- Mike Bostock, «Voronoi Stippling»: https://observablehq.com/@mbostock/voronoi-stippling
- The Coding Train, «Weighted Voronoi Stippling»: https://thecodingtrain.com/challenges/181-image-stippling
- Demos de Pretext (texto que se reorganiza alrededor de obstáculos, efectos de cursor): https://www.pretext.cool/ · https://github.com/bluedusk/awesome-pretext
- The Pudding, sobre la palabra «democracy» en el Congreso (noviembre de 2025), el análogo más cercano de texto parlamentario hecho relato: https://pudding.cool/

## Resultado 4

## Movimiento nativo de la plataforma (sin librerías) para «Luz y Taquígrafos»

Todo lo que propongo cuesta 0 KB en el cliente. La regla común es la mejora progresiva: primero se escribe el estado final estático, y el movimiento va dentro de `@supports (...)` y de `@media (prefers-reduced-motion: no-preference)`. Los datos de soporte los he comprobado hoy (22-09-2026) en web-features explorer, caniuse y los blogs de Chrome y WebKit.

### (1) Los mejores recursos

**1. View Transitions entre páginas, sin router (`@view-transition { navigation: auto }` + `view-transition-name` / `-class`)**
- **Especificación:** CSS View Transitions L2 (W3C), está en Interop 2026. La versión de una sola página es Baseline desde el 14-10-2025 (Chrome 111, Safari 18, Firefox 144).
- **Entre páginas:** Chrome/Edge 126 y Safari 18.2. Firefox todavía no lo tiene; en Firefox la página cambia de golpe, sin animación, y eso es una degradación perfecta.
- **Astro:** la última versión en npm es la 7.3.4 (MIT). Su documentación admite que `<ClientRouter />` será "cada vez más innecesario". En un sitio estático multipágina prefiero la versión nativa, porque no añade JS. `ClientRouter` sí apaga solo las animaciones con reduced-motion; con la versión nativa esa regla hay que escribirla a mano.
- **Momento concreto:** al pulsar una minoría en el hemiciclo de la portada, su grupo de escaños se transforma en la cabecera de su página. De forma parecida, una celda del calendario de 755 sesiones se convierte en el título de la ficha de esa sesión.
- **Propuesta:** darle a la celda y al título el mismo `view-transition-name: sesion-{id}`. Con `view-transition-class: minoria` se anima un grupo sin repetir reglas. Con los tipos de transición (`pagereveal`/`types`) se distingue ir de volver, o ES↔EN; en el cambio de idioma no habría movimiento.
- **Riesgos:**
  - Los nombres deben ser únicos en cada página, así que no hay que nombrar los 227 escaños.
  - Hay que limitarse a 1–3 elementos compartidos por navegación.
  - Las instantáneas son imágenes, así que conviene revisar la tipografía cursiva durante el morph.
  - Degradación: navegación normal.

**2. Animaciones ligadas al scroll (`animation-timeline: view()/scroll()`, `animation-range`)**
- **Soporte:** Chrome 115 y Safari 26. Firefox solo detrás del flag `layout.css.scroll-driven-animations.enabled`, con web-features en "Limited availability". Sigue sin Baseline, pero es foco de Interop 2026.
- **Ventaja:** con `transform` y `opacity` se animan fuera del hilo principal. Es el mejor coste para la batería de todo el dominio.
- **Momento concreto:** el paso de la página impresa del Diario a la fila de datos.
- **Propuesta:** una sección fija con `animation-range: contain`. Una franja dorada recorre el facsímil línea a línea mientras las celdas de la fila (fecha, orador, minoría) aparecen con el mismo avance del scroll. En las páginas largas, además, una barra de lectura con `scroll(root)`.
- **Degradación:** Firefox ve el estado final.
- **Polyfill:** hay uno, flackr/scroll-timeline (npm `scroll-timeline-polyfill` 1.1.0, Apache-2.0, unas 1,2k estrellas), pero no lo recomiendo. Corre en el hilo principal y exige que el CSS esté en el mismo dominio.

**Vanguardia: animaciones disparadas por el scroll (`timeline-trigger` / `animation-trigger`)**
- **Qué son:** animaciones que se reproducen una vez al cruzar un umbral, en lugar de avanzar con el scroll. Sustituyen a IntersectionObserver.
- **Soporte:** solo Chrome, que las lanzó hacia la 145/146; las fuentes se contradicen en el número exacto. Ni Safari ni Firefox las tienen.
- **Propuesta:** úsalas solo como mejora dentro de `@supports`, con un IntersectionObserver de unas pocas líneas como alternativa.

**3. `@property` (variables tipadas y animables) + `@starting-style` + `sibling-index()`**
- **Soporte:** `@property` es Baseline desde julio de 2024 y `@starting-style` desde agosto de 2024. `sibling-index()`/`sibling-count()` es Baseline desde el 18-08-2026 (Chrome 138, Safari 26.2, Firefox 154).
- **Momento concreto — votaciones nominales:** un anillo `conic-gradient` de sí, no y abstención, con variables `--si`/`--no` registradas como `<percentage>`, que se rellena al entrar en pantalla.
- **Momento concreto — cambio de legislatura:** con `@property --c { syntax: '<color>' }` los escaños cambian de color con una transición.
- **Momento concreto — contador de 755 sesiones:** una variable `<integer>` con `counter()`.
- **Momento concreto — calendario y series mensuales:** el retardo de las celdas y de las barras por mes con `calc(sibling-index() * 8ms)`, sin JS y sin reglas `nth-child`.
- **Riesgos:** un número hecho con `counter()` en un pseudoelemento no lo lee un lector de pantalla; la cifra real tiene que estar en el texto del DOM. `@property` dentro de Shadow DOM no aplica.

**4. Notas emergentes: anchor positioning + Popover API (`popover="auto"/"hint"`)**
- **Soporte:** Chrome 125, Firefox 147 (enero de 2026) y Safari 26, según caniuse y Chrome. Nota: la ficha de web-features explorer para `anchor-positioning` muestra hoy datos raros ("solo Safari 27"); probablemente amplió la definición a subfunciones nuevas. Popover es Baseline.
- **Momento concreto:** las notas del Diario, las entradas del glosario y la ficha del diputado en el hemiciclo y en la red de coautoría.
- **Propuesta:**
  - Un solo `<div popover>` reutilizado, con `position-anchor` y `position-try-fallbacks: flip-block, flip-inline` para que no se salga en móvil.
  - La capa superior, el cierre con Esc y el cierre al pulsar fuera los da el navegador.
  - Anclar a elementos internos de un SVG no está garantizado. Para los 227 escaños hay dos salidas: una capa de `<button>` HTML encima del SVG, o colocar el popover con coordenadas desde JS.
- **`interestfor` (abrir al pasar el ratón):** solo Chromium, con objeciones de WebKit; queda como adorno.
- **Polyfill:** @oddbird/css-anchor-positioning (0.10.2, BSD-3, unas 490 estrellas) es innecesario hoy. Degradación: la nota se muestra en línea o al pie.

**5. `:has()` + container queries (tamaño y estilo) + scroll-state queries**
- **Soporte:**
  - `:has()` es Baseline desde diciembre de 2023.
  - Las container queries de tamaño, desde 2023.
  - Las de estilo (`@container style(--x: y)`), Baseline desde el 19-05-2026 con Firefox 151.
  - Las scroll-state queries (`stuck`/`snapped`) solo existen en Chromium 133+.
- **Momento concreto — filtrar el hemiciclo sin JS:** `.hemiciclo:has(#f-ceda:checked) .escano:not(.ceda) { opacity: .15 }`. La leyenda son casillas nativas, así que funciona con teclado.
- **Momento concreto — figuras que se adaptan a su columna:** el calendario pasa de una rejilla de 53 semanas a una lista por meses cuando el contenedor es estrecho.
- **Momento concreto — leyenda fija del hemiciclo:** con `scroll-state(stuck: top)` se compacta al quedarse pegada. Esto es mejora pura dentro de `@supports (container-type: scroll-state)`.

**6. Tipografía editorial: `text-wrap: balance` / `pretty`**
- **Soporte:** `balance` es Baseline desde 2024. `pretty` está en Chrome 117 y Safari 26; Firefox lo ignora y no pasa nada.
- **Uso:** `balance` en los títulos en cursiva y en los pies de figura; `pretty` en los párrafos largos, para evitar palabras sueltas en la última línea.

**Herramientas de trabajo:** el panel Animations de Chrome DevTools, que ya permite inspeccionar las líneas de tiempo de scroll y las view transitions.

### (2) Skills

- **Ya presentes en `~/.claude/skills`.** Aparecieron hoy a las 18:55, instaladas por otro proceso, no por mí. Revisé los archivos: son solo `.md`, sin scripts, sin peticiones de red y sin credenciales; las coincidencias de "apiKey" y "password" son ejemplos de código.
  - **`modern-css`:** 42 menciones a view-transition, animation-timeline, anchor, `@property` y text-wrap; incluye una referencia a una charla de Adam Argyle (2025). Veredicto: segura. Instalar: ya está; usar.
  - **`astro-framework`** (autor delineas, MIT): segura; la uso para las islas y `ClientRouter`.
  - **`tooltips`** (mgifford/accessibility-skills): segura; justo la que hace falta para las notas emergentes accesibles.
- **pato-gonzalez/xanimations-skill@xanimations** (MIT). Arquitectura de animación solo con CSS: scroll-driven, scroll-state, `@property` y alternativas con reduced-motion.
  - Leí el SKILL.md: se protege contra instrucciones inyectadas, no instala librerías y solo incluye un validador local `scripts/validate_tokens.py`, que no he leído.
  - Instalaciones y estrellas: no las pude obtener (la API de GitHub y la de skills.sh estaban limitadas por uso).
  - Instalar: **sí, opcional**, después de leer ese `.py`.
- **patternsdev/skills@view-transitions:** no pude leer su SKILL.md (el enlace que probé daba 404). **No, por ahora.**
- **Descartadas:**
  - **heygen-com/hyperframes@css-animations** (74,5K instalaciones): es para composiciones de vídeo, no para la web.
  - **vercel-labs/agent-skills@react-view-transitions:** está pensada para React.
  - **dylantarre/animation-principles@css-native** (626) y **Jakubantalik/transitions.dev** `transitions-polish`: no las leí, así que **no**.
- Las ya instaladas `animate`, `impeccable` y `web-design-guidelines` cubren el criterio de diseño; las `gsap-*` son de otro dominio.

### (3) Referencias

- Demos de Bramus: https://scroll-driven-animations.style/ y https://view-transitions.chrome.dev/
- Guía de WebKit (Safari 26): https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- Disparadores CSS: https://developer.chrome.com/blog/scroll-triggered-animations
- Josh Comeau: https://www.joshwcomeau.com/animation/scroll-driven-animations/
- Trampas de las transiciones entre páginas: https://css-tricks.com/cross-document-view-transitions-part-1/
- Astro: https://docs.astro.build/en/guides/view-transitions/
- Interop 2026: https://webkit.org/blog/17818/announcing-interop-2026/
- Soporte: https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/ y https://caniuse.com/css-anchor-positioning

No he instalado nada en esta fase.

## Resultado 5

Resultados del dominio de motores de movimiento y coreografía. Revisado el 22 de septiembre de 2026. No he instalado nada.

**Cómo se obtuvieron las cifras:** las versiones y licencias vienen de npm. Las estrellas vienen de ungh.cc, porque la API de GitHub me limitó las consultas. Los pesos gz los medí yo con `gzip -9` sobre los ficheros publicados en jsDelivr, salvo los que llevan (doc), que cita la documentación oficial.

**Cuadro comparativo**

| Motor | Versión · licencia · estrellas | Peso gz en el cliente | Control |
|---|---|---|---|
| GSAP | 3.15.0 (13-04-2026) · licencia propia gratuita, no OSI · 28,6k | core 27 KB, ScrollTrigger 17, SplitText 3, DrawSVG 2, MorphSVG 9, Flip 9, ScrollSmoother 5 | Máximo: líneas de tiempo, fijado de secciones (pin), avance ligado al scroll (scrub), Flip, `easeReverse` (novedad de la 3.15) |
| Motion (motion.dev) | 13.4.1 · MIT · 33,7k | animate mini 2,3 KB (doc); animate hybrid 18 KB (doc); scroll() 5,1 KB (doc) sobre ScrollTimeline nativo; UMD completo 47 KB | Alto; sin pin ni Flip para DOM sin framework |
| anime.js | 4.5.0 · MIT · 73,0k | UMD completo 39 KB; se puede recortar por módulos | Alto: `onScroll`, `splitText`, `morphTo`, `createDrawable`, layout |
| Lenis | 1.3.26 · MIT · 16,0k | 5 KB | Solo desplazamiento suave |
| Theatre.js | 0.7.2 · core Apache-2.0, Studio AGPL-3.0 · 12,7k | core 48 KB | Editor visual de keyframes, pensado para three.js |
| Lottie | lottie-web 5.13.0 · MIT · 32,1k | completo 74 KB; «light», solo SVG, 45 KB | Reproduce ficheros de After Effects |
| dotLottie-web | 0.80.0 · MIT | 32 KB de JS + 484 KB de WASM | Igual que Lottie, más máquinas de estado |
| Rive | 2.43.0 · MIT | versión «lite»: 92 KB de JS + 348 KB de WASM | Máquinas de estado y data binding; dibuja en canvas |

Estado de mantenimiento:
- **Theatre.js:** el repositorio público no recibe cambios desde el 14-08-2024. La 1.0 se anuncia «en un repo privado».
- **lottie-web:** último push en septiembre de 2025.

### (1) Mejores recursos

**1. GSAP 3.15: ScrollTrigger, SplitText, DrawSVG, Flip y MorphSVG. Coreógrafo principal. Instalar: sí.**
- **Enlaces:** https://gsap.com, https://gsap.com/blog/3-15/ y https://gsap.com/blog/3-13/
- **Licencia y peso:** desde la 3.13 todos los plugins son gratuitos, también para uso comercial. Con los plugins necesarios pesa unos 50–60 KB gz, cargados solo en las islas con `client:visible`.
- **Paso de la página impresa a la fila de datos.** Es el momento estrella del sitio. Una sección fijada con avance ligado al scroll:
  - DrawSVG subraya en el facsímil el nombre del orador y su intervención.
  - Flip.fit traslada esos fragmentos a las celdas de una fila de la tabla (fecha, orador, minoría, palabras) mientras se atenúa el papel.
  - Al volver hacia atrás, `easeReverse` da una curva propia al retroceso.
- **Portada:** una línea de tiempo recorre los 227 escaños de izquierda a derecha según el orden del hemiciclo. SplitText revela el título en cursiva con máscara. La reescritura de SplitText es accesible: pone `aria-label` en el texto y `aria-hidden` en los fragmentos, y `autoSplit` rehace el troceado cuando cargan las fuentes.
- **Series por mes:** DrawSVG dibuja las líneas al ritmo del scroll.
- **Riesgos:**
  - La licencia no es de código abierto OSI; el dueño es Webflow.
  - El fijado de secciones en móvil y el secuestro del scroll.
- **Degradación:**
  - El SVG se sirve ya en su estado final. JS solo añade los estados iniciales cuando existe una clase `.js`.
  - `gsap.matchMedia('(prefers-reduced-motion: reduce)')` salta al final de la animación.
  - En móvil, sustituir el pin por pasos discretos.

**2. Plataforma nativa (0 KB). Instalar: sí.** Es la apuesta de vanguardia con más futuro.
- **Qué es:**
  - CSS Scroll-Driven Animations: `animation-timeline: scroll()` y `view()`. Lo soportan Chrome 115+ y Safari 26; en Firefox 152 sigue detrás de una opción. Soporte global de ~83 %. Firefox es prioridad de Interop 2026.
  - View Transitions entre documentos: Chromium y Safari 18.2+; en Firefox, vía el ClientRouter de Astro desde la versión 144.
- **Enlaces:** https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations y https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- **Uso propuesto:**
  - Un `view-transition-name` en cada grupo de escaños para que, al pulsar una minoría en la portada, el arco se transforme en la cabecera de su página.
  - El mismo mecanismo para el cambio ES/EN y para pasar del calendario a la ficha de una sesión.
  - Revelados de figuras y barra de progreso de lectura con `view()`, que corren fuera del hilo principal.
  - GSAP queda reservado para las secuencias que necesitan pin o Flip.
- **Degradación:** con `@supports` y `prefers-reduced-motion`, lo que no se soporta simplemente no se anima; la página no se rompe.
- **Riesgos:**
  - View Transitions entre documentos no es Baseline todavía.
  - Hay un presupuesto de 4 s por navegación.

**3. Motion (motion.dev) 13.4. Instalar: sí, pero solo en islas sin coreografía compleja.**
- **Enlace:** https://motion.dev/docs/animate
- **Por qué:** mini pesa 2,3 KB y usa WAAPI con aceleración por hardware. scroll() pesa 5,1 KB y usa ScrollTimeline nativo cuando existe.
- **Uso propuesto:**
  - Micro-interacciones con muelle en el filtro del calendario de las 755 sesiones.
  - El selector de legislatura de las redes de coautoría.
  - Las fichas emergentes de las votaciones nominales.
- **Regla:** GSAP o Motion en cada página, nunca los dos.
- **Riesgos:** la mayor parte del ecosistema está pensado para React.

**4. anime.js v4.5. Alternativa MIT a GSAP. Instalar: solo si la licencia importa.**
- **Enlace:** https://animejs.com
- **Por qué:** 73k estrellas. Tiene equivalentes de casi todo lo que usaríamos de GSAP: `onScroll`, `splitText`, `createDrawable`/`morphTo` y animación de layout. Se puede recortar por módulos.
- **Cuándo:** si el proyecto quiere una pila 100 % OSI, que tiene sentido en una base de datos abierta. Cubriría la portada y los dibujos de SVG.
- **Limitación:** no tiene equivalente de Flip para la transición del facsímil a la fila.
- **Riesgos:** la comunidad y la documentación son menores que las de GSAP.

**5. Lenis 1.3. Instalar: opcional, prioridad baja.**
- **Enlace:** https://github.com/darkroomengineering/lenis
- **Por qué:** 5 KB. Respeta `prefers-reduced-motion` por defecto, conserva `position: sticky` y las anclas, y se sincroniza con el ticker de ScrollTrigger.
- **Dónde:** solo en la portada y en el ensayo narrativo. En el explorador y en los paneles con scroll propio de la red hay que desactivarlo con `data-lenis-prevent`.
- **Riesgos:**
  - Safari queda limitado a 60 fps, y a 30 fps en modo de bajo consumo.
  - No funciona sobre iframes.
  - Algunos usuarios perciben el scroll suave como que la página les roba el control. Hay que medirlo antes de adoptarlo.

**Descartados por ahora:**
- **Theatre.js:** repositorio parado desde 2024 y Studio con licencia AGPL. Solo tendría sentido si se hace un hemiciclo 3D con three.js y una cámara coreografiada. Conviene esperar a la 1.0.
- **Rive:** son ~440 KB gz de runtime, y el texto dibujado en canvas no es accesible. Su data binding es interesante para el futuro, pero exige un diseñador con el editor de Rive.
- **Lottie / dotLottie:** necesitan activos de After Effects y dotLottie añade 484 KB de WASM. En este sitio serían decoración, que suspende el criterio 1.

### (2) Skills

- **greensock/gsap-skills: ya instaladas.** Siete skills oficiales (core, scrolltrigger, timeline, plugins, performance, utils, frameworks). gsap-core tiene 58,5k instalaciones. Mantener.
- **emilkowalski/skills.** Repo de 40,4k estrellas, último push el 15-09-2026. De Emil Kowalski, autor de Sonner y animations.dev.
  - **Seguridad:** leí `review-animations/SKILL.md` + `STANDARDS.md`, `improve-animations/SKILL.md` + `AUDIT.md`, `find-animation-opportunities`, `animation-vocabulary`, `animate` y `emil-design-eng`. Son solo Markdown: no hay scripts, no hacen peticiones de red (solo enlaces a easing.dev y easings.co) y no piden credenciales. `improve-animations` solo escribe en `plans/`; su modo `execute` lanza un subagente en un worktree aislado. Veredicto: **segura**.
  - **Instalar sí:**
    - `review-animations` (172,7k instalaciones).
    - `find-animation-opportunities` (131,1k). Parte de la contención: la mejor animación a veces es ninguna, que es exactamente el criterio 1.
    - `improve-animations` (144,4k).
  - **Opcional:** `animation-vocabulary` (159,9k).
  - **No:** `animate`, porque choca con el `animate` que ya está instalado. `emil-design-eng` ya aparece instalada en `~/.claude/skills/emil-design-eng`.
- **modern-css: ya instalada.** Cubre View Transitions y scroll-driven animations. No hace falta buscar otra.
- **No instalar** (no las leí; se descartan por los datos del listado):
  - `github/awesome-copilot@gsap-framer-scroll-animation` (3,7k instalaciones): redundante con las oficiales de GSAP.
  - `patricio0312rev/skills@framer-motion-animator` (10,4k): orientada a React; el sitio no usa framework.
  - `noklip-io/agent-skills@theatre-js`: solo 93 instalaciones.
  - `freshtechbro/claudedesignskills`: lottie, animejs y locomotive; sin cambios desde noviembre de 2025.
  - `heygen-com/hyperframes@*`: son para vídeo, no para web, y ya están instaladas.

### (3) Ejemplos de referencia

- **Codrops, «Creating Scroll-Driven SVG Map Animations with GSAP»** (21-05-2026). Trazado de rutas y cámara ligados al scroll; sirve de modelo para el hemiciclo como «mapa». https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap/
- **Codrops, «SVG Mask Transitions on Scroll with GSAP and ScrollTrigger»** (11-03-2026). Modelo para la transición del facsímil a la fila. https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/
- **Codrops, «From SplitText to MorphSVG: 5 Creative Demos Using Free GSAP Plugins»** (14-05-2025). https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/
- **Codrops, galería infinita con Observer, Flip y SplitText** (30-07-2026). https://tympanus.net/codrops/2026/07/30/building-an-infinite-gsap-scroll-gallery-with-parallax-and-flip-transitions/
- **Josh W. Comeau, «Scroll-Driven Animations».** Guía de la vía nativa. https://www.joshwcomeau.com/animation/scroll-driven-animations/

Mis ficheros de trabajo están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/motion_agent/`.

## Resultado 6

Instalé 5 skills, hice y capturé dos prototipos con datos reales y escribí `RECURSOS_VANGUARDIA.md`. Los dos prototipos funcionan sin errores, pero cada uno tiene defectos a la vista en las capturas (abajo).

**Skills instaladas** (descargué cada repositorio como tarball porque `git clone` falló en esta máquina, leí el SKILL.md, busqué en todos sus ficheros red, instalaciones y credenciales, y las copié; los 5 SKILL.md se leen bien):
- webgpu-threejs-tsl → /Users/rodrodr/.claude/skills/webgpu-threejs-tsl/
- three-best-practices → /Users/rodrodr/.claude/skills/three-best-practices/
- review-animations → /Users/rodrodr/.claude/skills/review-animations/ (solo se invoca a mano)
- find-animation-opportunities → /Users/rodrodr/.claude/skills/find-animation-opportunities/
- algorithmic-art → /Users/rodrodr/.claude/skills/algorithmic-art/

**Momentos elegidos:**
1. **Portada del hemiciclo:** solo CSS, 0 KB. Los escaños se encienden en orden angular, la planta «desciende» con el scroll (`animation-timeline: scroll()`) y el filtro por minoría usa `:has()` y `@property`. La sala 3D en three.js queda como fase 2 opcional.
2. **Del Diario impreso a la fila de datos:** three.js r186 en WebGL2, un solo draw call. Pesa 194 KB gz medidos sobre el build completo de jsDelivr; con tree-shaking bajará, pero no lo he medido.
3. **Calendario de 755 sesiones → serie mensual, y votaciones:** Observable Plot genera el SVG en el build; la transición usa FLIP con la Web Animations API y `sibling-index()`; el anillo de votación va con `@property`. Unos 1–3 KB.
4. **Redes de Afinidades:** sigma.js 3 y graphology, con ForceAtlas2 calculado en el build y posiciones interpoladas al cambiar de legislatura. 61 KB gz.
5. **Transiciones entre páginas:** View Transitions nativas entre documentos, 0 KB; el cambio ES/EN no se anima.

**Resumen:**
1. La regla es escribir primero el estado final en HTML/SVG y añadir el movimiento solo con `prefers-reduced-motion: no-preference` y `@supports`, con un motor de JS por página como máximo.
2. Cada pieza animada es un custom element que carga su módulo al entrar en pantalla, porque `client:visible` no funciona sin framework.
3. P1 funciona sin JS, a unos 120 FPS y sin errores. La inclinación se lee más como un zoom que como un descenso y recorta las filas superiores; hay que ajustar `perspective-origin` y `scale`.
4. P2 usa la sesión real del 16-VI-1936 (ses. 45, 159 intervenciones, 48.458 palabras; Gil Robles, CEDA, 5.978 palabras). Las capturas muestran bien la secuencia página → dispersión → fila; 40.000 partículas a unos 120 FPS.
5. La página de P2 es una maqueta tipográfica, no un facsímil: los renglones son bloques y solo las cabeceras de orador son texto. En producción hay que usar el escaneo real del Diario.
6. Otros defectos de P2: la celda «Diario» se corta por la derecha y, en móvil con movimiento reducido, la tabla estática desborda en horizontal.
7. Los FPS se midieron en un M3 Max. Faltan pruebas con CPU ralentizada y en un móvil real antes de fijar el número de partículas.
8. Pesos gz medidos: three core+module 194 KB (con WebGPU, 309), GSAP core 28,3, ScrollTrigger 18,0, Flip 9,7, SplitText 3,7, Motion completo 48,9, sigma 47,2, graphology 13,9. No pude medir pretext porque la ruta del fichero falló.
9. GSAP queda en reserva, sobre todo por si hace falta fijar secciones con scroll en Firefox. Descarto p5 para producción, Theatre, Rive, Lottie, deck.gl, Lenis y el polyfill de scroll-timeline; cosmos.gl queda en observación, y nunca con el paquete antiguo, que es de licencia no comercial.
10. Rechacé improve-animations, hermes p5js/pretext, iart particle-system, 3d-web-experience, d3-viz, xanimations y las freshtechbro, con el motivo de cada una en el documento.

Archivos:
- /Users/rodrodr/Dropbox/Apps/luz_site/docs/RECURSOS_VANGUARDIA.md
- /Users/rodrodr/Dropbox/Apps/luz_site/docs/diseno/prototipos/p1_hemiciclo_portada.html
- /Users/rodrodr/Dropbox/Apps/luz_site/docs/diseno/prototipos/p2_diario_a_fila.html
- /Users/rodrodr/Dropbox/Apps/luz_site/docs/diseno/prototipos/build_prototipos.py
- /Users/rodrodr/Dropbox/Apps/luz_site/docs/diseno/prototipos/capturar.py
- /Users/rodrodr/Dropbox/Apps/luz_site/docs/diseno/prototipos/capturas/ (p1_hemiciclo_portada_0…3.png, p2_diario_a_fila_0…4.png y una captura en móvil con movimiento reducido de cada prototipo)
