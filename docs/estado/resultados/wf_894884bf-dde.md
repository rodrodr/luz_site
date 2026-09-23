# arsenal-diseno-web (wf_894884bf-dde) · 7 resultados · 23-09 03:02

## Resultado 1

## Sonido, háptica y microinteracción: selección verificada

**Aviso sobre las cifras.** Las versiones, fechas y licencias salen de `npm view` hoy (22-09-2026). Los pesos gz son de bundlephobia. La API de GitHub cortó por límite de uso: solo las ★ de web-haptics están comprobadas, y las marcadas con ≈ son aproximadas. No he instalado nada.

### (1) Stack recomendado

| Capa | Elección | Versión · licencia · gz | Por qué | Alternativa de vanguardia |
|---|---|---|---|---|
| Motor de audio | **Web Audio API nativa** (developer.mozilla.org/docs/Web/API/Web_Audio_API) | 0 KB | Un solo `AudioContext` con un `GainNode` maestro. `resume()` tras el primer gesto. Se programa con `currentTime`. Sirve para cualquier isla. | AudioWorklet para DSP propio |
| Sonidos de interfaz sintetizados | **ZzFX** (github.com/KilledByAPixel/ZzFX) | 1.3.2 · MIT · <1 KB (según su autor) | Clics, pops y errores generados por código, sin archivos. Los parámetros se diseñan en su web. | snd-lib 1.2.4 · MIT (snd.dev): kits de sonidos de UI hechos por diseñadores |
| Reproducción de muestras | **Howler.js** (howlerjs.com) | 2.2.4 · MIT · 9,7 KB | Sprites, pool de sonidos y fallback HTML5. Es estable, pero la última versión es de 09-2023. | Web Audio nativo con `decodeAudioData` y audio en Opus |
| Música y sonificación | **Tone.js** (tonejs.github.io) | 15.1.22 · MIT · 76,6 KB · ≈14k★ | Transporte, sintetizadores, `Tone.Draw` para sincronizar con la imagen. Es el estándar. Conviene cargarlo con import dinámico, solo cuando haga falta. | Elementary (@elemaudio/core 4.0.1, MIT), que es audio declarativo. Strudel (@strudel/web 1.3.0) es AGPL, así que solo vale para demos. |
| Forma de onda | **wavesurfer.js** | 7.12.12 · BSD-3 | Visualización y scrub de audio, bien mantenido (09-2026). | — |
| Háptica | **web-haptics** (github.com/lochie/web-haptics) | 0.0.6 · MIT · **2,8k★** · sin dependencias | Presets semánticos (success, error, selection…) y adaptadores para vanilla, React, Vue y Svelte. En escritorio no hace nada. | Propuesta WICG Web Haptics: `navigator.playHaptics(effect)` y at-rule CSS `@haptic`. Solo es una incubación temprana. |
| Háptica en iOS (riesgo) | Todas usan el truco `<input type=checkbox switch>`. Según una búsqueda web no contrastada, iOS 26.5 lo parcheó. | @haptics/vanilla 2.1.0 (MIT) dice que sigue funcionando en 26.5. ios-haptics 3.2.0 (publicado hoy). | Hay que probarlo en un dispositivo real antes de fiarse. La háptica siempre complementa, nunca sostiene la interacción. | — |
| Gestos | **Pointer Events nativos**: `setPointerCapture`, `touch-action`, `pointercancel` | 0 KB | Una sola API para ratón, táctil y lápiz. | @use-gesture/vanilla 10.3.1 (MIT, ≈9k★, sin cambios desde 03-2024). GSAP Draggable, Observer e Inertia ya están instalados vía gsap-plugins. |
| Muelles (spring) | **Motion** `animate` y `spring` (motion.dev) | 13.4.1 · MIT · 47,7 KB el paquete completo (el `animate` mínimo pesa bastante menos, sin verificar) | Muelles interrumpibles que conservan la velocidad. Gestos press, hover e inView en vanilla. | `linear()` de CSS para muelles sin JS. @react-spring/web 10.1.2 solo si el proyecto es React. |
| Estados animados complejos | **Rive** (@rive-app/canvas) | 2.43.0 · MIT | Máquinas de estado interactivas para iconos y botones, más ligeras que un vídeo. | dotLottie web 0.80.0 |

**Integración, para la fase siguiente.** La pieza que hace que todo encaje es un **bus de feedback** único: `feedback('success')` dispara el cambio visual, el sonido y la háptica en el mismo frame. Lee tres preferencias persistidas: sonido (desactivado por defecto), háptica y `prefers-reduced-motion`. Pasa por el gain maestro y por un limitador de frecuencia. Los sonidos y hápticas deberían definirse como tokens, igual que los colores.

### (2) Skills candidatas

| Skill | Instalaciones · ★ | Seguridad (leída) | Solapes | ¿Instalar? |
|---|---|---|---|---|
| **lochie/web-haptics@web-haptics** | 794 · 2,8k★ | Limpia. Es solo un SKILL.md de 141 líneas, sin scripts. Lo único que pide es `npm i web-haptics`. Incluye reglas de la guía de Apple (HIG) y antipatrones. | Ninguna de las instaladas cubre la háptica. | **Sí** |
| **dannyjpwilliams/ui-sound-design-skill@ui-sound-design** | 280 · 37★ · Socket: Warn | Aceptable. El aviso viene de `analyze-sound.mjs`, que usa `execSync` para ejecutar **ffmpeg en local** sobre un archivo que el usuario le pasa (la ruta se interpola en el shell). No hace peticiones de red ni pide credenciales. La plantilla de vista previa carga Google Fonts. Trae recetas de sonido, un vocabulario que traduce adjetivos a parámetros y reglas de auditoría de audio. | hyperframes-audio es solo para vídeo. No hay otra skill de sonido de interfaz. | **Sí**, sin ejecutar el analizador con rutas que no sean de confianza |
| wondelai/skills@microinteractions | 5,6k | Limpia. Solo documentación (el marco de Saffer). El único enlace es un afiliado de Amazon. | Solapa bastante con impeccable (animate, delight) y con emil-design-eng. | Opcional, más bien no |
| martinholovsky/claude-skills-generator@web-audio-api | 381 | Sin red según un grep. Genérica, 499 líneas. | Queda cubierta por la referencia de Web Audio de ui-sound-design. | No |
| plyght/tonejs-skill@tonejs | 269 | **No verificada**: no encontré el SKILL.md. | — | No, por ahora |
| owl-listener/designer-skills@gesture-patterns | 1,7k | Limpia pero superficial (48 líneas). | — | No |
| dylantarre/animation-principles@mobile-touch | 2,3k | No la leí. | Probable solape con animate. | No (sin verificar) |

### (3) Listón de calidad

1. **El sonido viene desactivado** y se activa desde un control visible y persistente. No suena nada antes de un gesto del usuario, y `AudioContext.state` se gestiona.
2. **Hay un solo `AudioContext`** con un gain maestro. El feedback se dispara en `pointerdown`, no en `click`, con una latencia percibida por debajo de unos 20 ms.
3. **Los sonidos de interfaz son cortos y limpios**: 30–150 ms los clics y ≤400 ms las notificaciones. El pico queda en −12 dBFS o menos. El ataque dura al menos 2 ms para evitar chasquidos, y nada satura.
4. **Nada depende solo del sonido o de la háptica.** Todo sonido o vibración acompaña a un cambio visual en el mismo frame (WCAG 1.3.3). Cualquier audio de más de 3 s se puede parar (WCAG 1.4.2).
5. **Los sonidos repetidos no cansan**: llevan una variación aleatoria de tono del ±2–5 % y un límite de disparos por segundo. La háptica se reserva para momentos con significado.
6. **Se respeta `prefers-reduced-motion`**: el muelle pasa a fundido y la háptica y el sonido tienen su propio interruptor.
7. **Los gestos tienen alternativa accesible**: equivalente de un solo puntero y sin arrastre (WCAG 2.5.1 y 2.5.7). La acción se cancela si se suelta fuera del objetivo (2.5.2). Los objetivos miden al menos 24 px, e idealmente 44 px.
8. **Los gestos no rompen el scroll**: `touch-action` está declarado, se usa `setPointerCapture` y se trata `pointercancel`. INP por debajo de 200 ms y 60 fps en transform y opacity.
9. **Las animaciones que sigue el dedo usan muelles interrumpibles** que conservan la velocidad, no tweens de duración fija.
10. **Cada componente tiene todos sus estados diseñados**: reposo, hover, focus-visible, activo, carga, éxito, error y deshabilitado.
11. **El peso está controlado**: la capa de audio de interfaz ocupa 5 KB gz o menos. Tone.js se carga en diferido. Los archivos van en Opus con fallback AAC, o en sprites.
12. **La sonificación está documentada**: el mapeo (variable a tono, tempo o paneo) tiene leyenda, controles de reproducir, pausar y scrub, y una alternativa textual.

### (4) Referencias ejemplares

Las URL de esta sección no las abrí en esta sesión.

- Chrome Music Lab, el patrón de referencia de Web Audio y Tone.js: https://musiclab.chromeexperiments.com
- Rauno Freiberg, «Invisible Details of Interaction Design»: https://rauno.me/craft/interaction-design
- Josh Comeau, un sitio con sonido cuidado en los toggles (use-sound): https://www.joshwcomeau.com
- Apple HIG, Playing haptics: https://developer.apple.com/design/human-interface-guidelines/playing-haptics
- Material Design, sonido en la interfaz: https://m2.material.io/design/sound/about-sound.html
- Propuesta WICG de la Web Haptics API: https://github.com/WICG/web-haptics

Las skills descargadas para revisarlas están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sonido/` (en `uisd/`, `wh/` y los `*.md`).

Fuentes:
- [web-haptics (GitHub)](https://github.com/lochie/web-haptics)
- [@haptics](https://haptics-web.vercel.app/)
- [ios-haptics](https://github.com/tijnjh/ios-haptics)
- [WICG web-haptics](https://github.com/WICG/web-haptics)
- [snd.dev](https://snd.dev/)
- [ZzFX (Code-Garage)](https://code-garage.com/en/blog/a-sound-generator-in-javascript-for-your-web-games-and-prototypes)
- [ui-sound-design en skills.sh](https://skills.sh/dannyjpwilliams/ui-sound-design-skill/ui-sound-design)

## Resultado 2

**Plataforma web 2025-2026 aplicada al diseño (Claude, ~12 min)**

Fuentes de las fechas: web.dev/baseline/2026, webkit.org (Safari 26.0 a 26.5) e Interop 2026. Versiones sacadas de `npm view` hoy, 2026-09-22. No pude comprobar las estrellas de GitHub porque la API agotó el límite de 60 consultas. Los pesos marcados con «~» son estimados.

## 1. Stack recomendado

**A. Funciones nativas, 0 KB, que se pueden usar ya**

Todas son Baseline salvo que se indique otra cosa:
- **`:has()`** y **CSS nesting**: Baseline desde 2023.
- **`@starting-style`**, **popover** y **`light-dark()`**: Baseline 2024.
- **`<dialog>` con `closedby`** y **Invoker Commands** (`command`/`commandfor`): Invoker Commands es Baseline desde Safari 26.2 (Chrome 135, Firefox 144). Permite abrir diálogos y popovers sin JS.
- **Anchor positioning**: Baseline en enero de 2026, con Firefox 147. Sustituye a Floating UI y Popper. Polyfill para versiones antiguas: `@oddbird/css-anchor-positioning` 0.10.2 (BSD-3, ~12 KB gz, estimado).
- **Container queries** de tamaño: Baseline 2023.
- **Container style queries**: Baseline 2026.
- **field-sizing**, **`@scope`**, **`shape()`**, **`contrast-color()`**, **`:open`**, **custom highlights** y **Navigation API**: todos Baseline 2026.
- **View Transitions en la misma página**: Baseline (Firefox 144); `:active-view-transition` es Baseline 2026.
- **AVIF**: Baseline desde enero de 2024.
- **Fuentes variables en WOFF2**, con `font-display: swap` u `optional` más métricas de reserva.

**B. Mejora progresiva: aún no son Baseline, pero no rompen nada**
- **View Transitions entre páginas** (`@view-transition{navigation:auto}`): funcionan en Chromium y Safari 18.2+. Firefox solo tiene soporte parcial en Nightly. Sin soporte, el navegador navega de forma normal.
- **Animaciones ligadas al scroll** (`animation-timeline: scroll()`/`view()`): Chrome 115+ y Safari 26. En Firefox siguen detrás de una opción de configuración. Hay que envolverlas en `@supports (animation-timeline: view())` y el estado final tiene que ser visible sin animación. El polyfill de scroll-timeline no lo recomiendo: pesa mucho. La alternativa es GSAP ScrollTrigger, que ya cubre el otro equipo.
- **Select personalizable** (`appearance: base-select`): solo Chrome/Edge 135+. Safari lo tiene en Technology Preview y Firefox en Nightly. Sin soporte queda un select nativo normal.
- **`interpolate-size: allow-keywords`** y **`calc-size()`**: solo Chromium. Sin soporte, el cambio es instantáneo.
- **Speculation Rules** (prerender): solo Chromium; Safari 26.2 lo tiene desactivado por defecto y Firefox no lo soporta. Los navegadores que no lo entienden ignoran el `<script type="speculationrules">`. Para Firefox y Safari, `quicklink` 3.0.2 (Apache-2.0, ~2 KB gz) hace de respaldo de prefetch.
- **`if()`**, **`sibling-index()`** y **`text-wrap: pretty`**: parciales; solo como adorno.

**C. Gráficos y cálculo**
- **WebGPU** funciona en Chrome, Edge, Safari 26 y Firefox (Windows 141, macOS Apple Silicon 145). Falta Firefox en Linux, y la lista Baseline 2026 de web.dev no lo incluye. La vía práctica es `three` 0.186.0 (MIT) con `WebGPURenderer` y TSL, que cae a WebGL2 automáticamente.
- De vanguardia: **TypeGPU** 0.12.5 (MIT), WGSL tipado desde TypeScript.
- **WASM**: WasmGC es Baseline y *branch hinting* es Baseline 2026. Solo tiene sentido para cálculo pesado (física, códecs), nunca para la interfaz.

**D. Build**
- **Imágenes**: `sharp` 0.35.4 (Apache-2.0), que es lo que usa `<Picture>` de Astro. Salida AVIF + WebP con `srcset`/`sizes`.
- **Fuentes**: `fontaine` 1.0.0 (MIT) genera las métricas de reserva (`size-adjust`) para que el cambio de fuente no mueva la página.
- **Control de Baseline en código**:
  - `@eslint/css` 2.0.0 con la regla `use-baseline`.
  - `stylelint-plugin-use-baseline` 1.4.6 (MIT).
  - `web-features` 3.39.0 y `baseline-browser-mapping` 2.11.25 como fuente de datos.
- **Polyfill de Invoker Commands**: `invokers-polyfill` 1.0.4 (MIT, ~2 KB gz), solo para navegadores anteriores a Safari 26.2.

**E. Verificación visual y de calidad (solo en desarrollo, 0 KB en producción)**
- **Playwright** 1.63.0 (Apache-2.0): prueba en Chromium, Firefox y WebKit, y compara capturas con `toHaveScreenshot` en varios anchos y ambos temas.
- **@axe-core/playwright** y **axe-core** 4.13.0 (MPL-2.0): comprobación WCAG 2.2 AA dentro de los tests.
- **Lighthouse** 13.5.0 (Apache-2.0).
- **unlighthouse** 0.18.1 (MIT): pasa Lighthouse a todo el sitio. `@lhci/cli` 0.15.1 no se actualiza desde junio de 2025.
- **pa11y** 10.0.0 / **pa11y-ci** 4.1.1 (LGPL-3.0): barrido de accesibilidad desde CI.
- **chrome-devtools-mcp** 1.9.0 (Apache-2.0): ya está disponible como plugin en esta sesión (trazas, análisis del LCP, Lighthouse). De vanguardia: su CLI.

## 2. Skills

| Skill | Instalaciones | Seguridad (leí el SKILL.md) | Solapes | ¿Instalar? |
|---|---|---|---|---|
| addyosmani/web-quality-skills@core-web-vitals, y del mismo repo @web-quality-audit, @performance, @accessibility, @best-practices | 27K (core-web-vitals) | Segura. Licencia MIT, solo Markdown. Menciona `npx lighthouse` y `npm i -g @axe-core/cli` como comandos opcionales. Sin credenciales ni binarios. | audit, optimize, chrome-devtools-mcp:debug-optimize-lcp | **Sí**: web-quality-audit y core-web-vitals. Las otras tres no, por solape. |
| microsoft/playwright-cli@playwright-cli | 162.7K | Segura. Es oficial de Microsoft. Pide permiso para `npx`/`npm` y propone `npm i -g @playwright/cli`, un paquete oficial. | El MCP de Playwright ya está instalado | **Sí**: gasta menos contexto que el MCP para capturas en tres motores. |
| paulirish/dotfiles@modern-css | 526 | Segura. Solo Markdown; cubre casi todo este dominio. | **Ya está instalada**: es idéntica byte a byte a `~/.claude/skills/modern-css` | No hace falta. |
| mgifford/accessibility-skills@progressive-enhancement | 112 | Segura. Solo Markdown. | better-accessibility | **Sí, con cambios**: su disparador («any web feature») es demasiado amplio y frena lo experimental. Hay que acotar la descripción. |
| chromedevtools/chrome-devtools-mcp@chrome-devtools | 7.3K | Segura. Es oficial. | Ya está como plugin (chrome-devtools-mcp:*) | No. |
| vercel-labs@vercel-react-view-transitions (129.6K), patternsdev@view-transitions (630), currents-dev@playwright-best-practices (85.2K) | ver columna | Sin leer: la ruta dio 404 o no me dio tiempo. | — | No, por ahora. |

Otro equipo ya instaló a las 18:55 modern-css, better-accessibility, better-colors, better-typography, astro-framework, emil-design-eng, tooltips y charts-graphs, aunque esta fase pedía no instalar nada.

## 3. Listón de calidad (verificable)

1. Toda función usada es Baseline, o está dentro de `@supports` o de una detección de soporte con un respaldo que funciona. Playwright en Chromium, Firefox y WebKit no muestra ninguna funcionalidad rota.
2. El contenido principal se lee y se navega con JS desactivado (apps de lectura y landings).
3. En laboratorio, con perfil móvil lento: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT < 200 ms. Lighthouse: rendimiento ≥ 90, accesibilidad 100, buenas prácticas ≥ 95.
4. axe no encuentra ninguna infracción seria ni crítica de WCAG 2.2 AA, en ambos temas y con los diálogos y popovers abiertos.
5. Los overlays son `<dialog>` o popover: Esc los cierra, el foco vuelve a su origen y `:focus-visible` se ve. No hay ningún `div` con onclick.
6. Con `prefers-reduced-motion` se desactivan las View Transitions y las animaciones de scroll. Ningún contenido depende de que la animación se ejecute.
7. Imágenes en AVIF/WebP con `width`/`height`, `srcset` y `sizes`. La imagen del LCP lleva `fetchpriority="high"` y no es lazy.
8. Como máximo dos familias tipográficas, en WOFF2 variable con subconjunto de caracteres. Métricas de reserva, así que el CLS debido a fuentes es cero.
9. Sin scroll horizontal a 320 px, y el contenido se recoloca al 400 % de zoom. Los componentes se adaptan con container queries.
10. `color-scheme` y `light-dark()`, con contraste ≥ 4,5:1 en los dos temas y un modo `forced-colors` que funciona.
11. Cero errores en consola y JS crítico ≤ 100 KB gz. WebGPU siempre con respaldo en WebGL2 y un camino sin GPU.
12. Capturas de regresión visual: 3 anchos × 2 temas × 3 motores.

## 4. Referencias ejemplares

- https://web.dev/baseline/2026 y https://web-platform-dx.github.io/web-features-explorer/
- https://webkit.org/blog/17818/announcing-interop-2026/
- https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- https://css-tricks.com/cross-document-view-transitions-part-1/
- https://developer.chrome.com/blog/a-customizable-select
- https://scroll-driven-animations.style

Los SKILL.md que leí están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/wp/`.

## Resultado 3

**Juegos web interactivos: materia prima para la fase de integración** (22 sep 2026)

Nada se instaló. Leí las skills candidatas desde tarballs guardados en la scratchpad (`.../scratchpad/games/repos/`). No hay skills.sh sobre `git` en esta máquina (`xcrun` roto), así que no hubo clones. Versiones, licencias y fechas vienen de `npm view`; el peso gz, de bundlephobia (paquete entero, antes de tree-shaking); las estrellas, de ungh.cc, porque la API de GitHub llegó a su límite.

## (1) Stack recomendado

**Motores 2D**

| Pieza | Versión · licencia · gz · ★ | Por qué | Alternativa de vanguardia |
|---|---|---|---|
| **Phaser** · https://phaser.io | 4.2.1 · MIT · 347 kB · ★40.347 | Framework completo: escenas, físicas Arcade y Matter, entrada (teclado, puntero, táctil, mando), audio, tweens, cámaras, tilemaps y escalado. La v4 (abril de 2026) trae un renderer por nodos, filtros unificados y recuperación del contexto WebGL de serie. Tiene 28 skills oficiales. | Phaser Game Agent MCP (julio de 2026). No lo evalué. |
| **PixiJS** · https://pixijs.com | 8.21.0 (17 sep 2026) · MIT · 255 kB · ★48.198 | El mejor renderer 2D: WebGPU, luego WebGL y Canvas como respaldo. Admite tree-shaking, tiene módulo de accesibilidad, DOMContainer y texturas HTML-in-Canvas (v8.18). Encaja bien en islas (`@pixi/react` 8.0.5, 39,7 kB) y en experiencias lúdicas dentro de una página. | Renderer WebGPU y exportación SVG de Graphics |
| **Kaplay** · https://kaplayjs.com | 3001.0.19 · MIT · 65 kB · ★1.802 | Microjuegos y prototipos con API funcional, muy legible para un LLM | **LittleJS** 1.19.3 · MIT · ★4.183, pensado para js13k |
| **Excalibur** · https://excaliburjs.com | 0.32.0 · BSD-2 · 142 kB · ★2.346 | Alternativa pensada para TypeScript, con ECS y física propios | — |

**3D**

| Pieza | Versión · licencia · gz · ★ | Por qué | Alternativa de vanguardia |
|---|---|---|---|
| **three.js** · https://threejs.org | 0.186.0 · MIT · 181 kB · ★115.767 | Estándar de hecho. En React se usa con R3F 9.8.0 (50,6 kB). | **WebGPURenderer + TSL**: sombreadores escritos una vez, compilados a WGSL o GLSL, con WebGL2 como respaldo automático. La r186 añade un renderer nativo de Gaussian splats. |
| **Babylon.js** · https://babylonjs.com | @babylonjs/core 9.27.1 · Apache-2.0 · 1,73 MB (tree-shakable) · ★26.096 | Motor 3D completo: Havok, Inspector, audio v2 y WebXR | **PlayCanvas** 2.22.3 · MIT · 600 kB |

**Física**

| Pieza | Versión · licencia · gz · ★ | Por qué | Alternativa de vanguardia |
|---|---|---|---|
| **Rapier** · https://rapier.rs | `@dimforge/rapier2d-compat` y `rapier3d-compat` 0.20.0 (19 sep 2026) · Apache-2.0 · 773 kB y 1.053 kB con el WASM en base64 · ★697 los bindings | Motor WASM determinista, rápido y bien mantenido | — |
| **Matter.js** | 0.20.0 · MIT · 25 kB · ★18.425 | 2D sencillo, ya integrado en Phaser. Última versión en npm: junio de 2024. | — |
| **Planck** | 1.5.0 · MIT · 46 kB | Port de Box2D, estable | **box2d3-wasm** 5.2.0 · MIT (Box2D v3) |

**Estado, audio, entrada, bucle y guardado**

| Pieza | Versión · licencia · gz · ★ | Por qué | Alternativa de vanguardia |
|---|---|---|---|
| **ECS / estado** | **koota** 0.6.6 · ISC · 10 kB · ★735 (pmndrs) | ECS ligero, de pmndrs | **bitecs** 0.4.0 · MPL-2.0 |
| **Audio** | **Howler** 2.2.4 · MIT · 9,5 kB · ★25.351 | Maduro, pero su última versión es de 2023. Con Phaser, mejor su SoundManager propio. Para efectos se usa Web Audio nativo más **ZzFX** (efectos procedurales en menos de 1 kB; no verifiqué su versión). | **Tone.js** 15.1.22 · MIT · 75 kB, para música adaptativa y generativa |
| **Entrada** | Nativa: Gamepad API, Pointer Events y `KeyboardEvent.code` (no depende de la distribución del teclado) | Una capa de *acciones* con reasignación de teclas por encima | — |
| **Bucle** | Paso fijo con acumulador y rAF solo para dibujar, interpolando entre pasos | Pausa en `visibilitychange` | OffscreenCanvas en un Worker más WebGPU |
| **Guardado** | **idb-keyval** 6.3.0 · Apache-2.0 · 0,8 kB | Esquema versionado con migraciones y `navigator.storage.persist()`. localStorage solo para ajustes. | — |
| **Depuración** | **stats-gl** 4.2.3 · MIT · 9,6 kB; **tweakpane** 4.0.5 (última versión: noviembre de 2024) | Medir fotogramas y ajustar parámetros en vivo | — |

**Para que todo funcione en armonía:**
- El motor se carga como isla con `client:visible` e `import()` dinámico, y se destruye al desmontar: sin bucles rAF, *listeners* ni memoria de GPU huérfanos.
- Dentro del canvas se usan los tweens del motor; para la interfaz DOM, GSAP o CSS, con las skills gsap-* ya instaladas.
- Las mismas variables de diseño sirven para el HUD en DOM y para el canvas.
- `prefers-reduced-motion` apaga el temblor de pantalla y los destellos.

## (2) Skills

| Skill | Instalaciones · ★ | Seguridad tras leerla | Solapes con las instaladas | ¿Instalar? |
|---|---|---|---|---|
| **phaserjs/phaser** (carpeta `skills/`, 28 skills oficiales, sincronizadas el 16 sep 2026) | No sale en el buscador de skills.sh · ★40.347 | **Segura.** Solo markdown, sin scripts. Solo enlaza a phaser.io. | Ninguno | **SÍ** |
| **pixijs/pixijs-skills@pixijs** (una skill que enruta a otras 25) | 5,4K · ★337 · oficial | **Segura.** Solo markdown. Solo enlaza a pixijs.download y pixijs.io. | Ninguno | **SÍ** |
| **MengTo/Skills@test-playable-web-games** | 877 · ★6.211 | **Segura.** 24 líneas de markdown, sin scripts. Los scripts del repo son de su web de demos y no forman parte de la skill. | Complementa `audit` y `web-design-guidelines` con control de calidad del juego: estados reproducibles con semilla y partidas cortas reales | **SÍ** |
| **MengTo/Skills@ship-web-games** | 859 | **Segura.** 23 líneas, sin scripts. | Parcial con `audit` | Opcional |
| **gamedev-skills/awesome-gamedev-agent-skills@game-feel** | Repo ★1.102 | **Segura.** 165 líneas de markdown. Su única dependencia (`pip install`) es de otra skill del repo, create-game-assets. | Conceptos buenos (temblor por «trauma», congelación al impactar, estirar y aplastar), pero con código de Godot y Unity | **SÍ, con reservas** |
| La misma colección: input-systems, save-systems, game-ui-ux | — | Seguras | Casi nada de web | NO |
| **github/awesome-copilot@game-engine** | 12,7K · ★39.263 | **Segura.** Markdown y plantillas. | Genérico, estilo MDN. Queda cubierto por las de Phaser y Pixi. | Opcional (canvas sin framework) |
| **majidmanzarpour/threejs-game-skills** (9 skills) | ~2,1–2,5K · ★2.111 | **Rechazada.** Sus scripts piden `ELEVENLABS_API_KEY`, `TRIPO_API_KEY` y `GEMINI_API_KEY`, llaman a api.elevenlabs.io y api.tripo3d.ai, y ejecutan `npx playwright install`, que descarga binarios. | — | **NO** |
| **PlayableIntelligence/game-creator** | 1,7K · ★331 | **Rechazada.** Incluye `scripts/intercept-api-key.mjs` y generadores que llaman a Meshy, WorldLabs y RetroDiffusion. | — | **NO** |
| openai/skills@develop-web-game | 1,1K | No está en HEAD del repo, así que no se puede verificar | — | NO |
| weberwang/phaser-skills y Yakoub-ai/phaser4-gamedev | ~150 · ★24 | — | Las oficiales de Phaser las sustituyen | NO |
| jeffallan/claude-skills@game-developer | 5,5K | No la leí | — | NO sin revisarla |

Los repos de three.js y Babylon no se buscaron aquí; los cubre el otro equipo.

## (3) Listón de calidad (verificable)

1. **Simulación a paso fijo**, separada del dibujado. El juego va igual a 30, 60 y 144 Hz y no se acelera en pantallas de 120 Hz.
2. **Fotogramas estables:** p95 del tiempo por fotograma ≤ 16,7 ms en un móvil medio (traza de DevTools), sin pausas del recolector de basura de más de 5 ms en partida (pools de objetos).
3. **Carga rápida:** primera entrada posible en ≤ 3 s con 4G simulada. JS inicial ≲ 500 kB gz. Atlas de sprites y texturas KTX2/Basis en 3D.
4. **Tres formas de jugar:** teclado, puntero o táctil, y mando. Controles reasignables, zonas táctiles de al menos 44 px, nada que dependa del *hover*.
5. **Respuesta en ≤ 100 ms** con imagen y sonido para cada acción. *Coyote time* y búfer de entrada donde el género lo pida. Temblor de pantalla por «trauma» y con tope.
6. **Accesibilidad:**
   - `prefers-reduced-motion` respetado y nada de más de 3 destellos por segundo (WCAG 2.3.1).
   - Volúmenes separados de música y efectos, y subtítulos.
   - Nunca información solo por color, y opciones de ayuda o dificultad.
   - Menús en DOM accesibles con teclado y lector de pantalla.
7. **Pausa automática** al ocultar la pestaña o perder el foco. El audio se desbloquea con el primer gesto y se suspende cuando la pestaña está oculta.
8. **Guardado versionado con migraciones** en IndexedDB, con autoguardado en puntos de control. Sobrevive a una recarga y se puede exportar e importar.
9. **Adaptable a cualquier pantalla:** cambios de tamaño y orientación resueltos, DPR limitado a 2 como máximo, márgenes seguros (*safe-area*).
10. **Robustez:** se recupera de la pérdida del contexto WebGL, pasa de WebGPU a WebGL2 si hace falta, y la consola queda sin errores.
11. **Pruebas reproducibles:** estados con semilla o ruta de depuración, y una prueba de humo en Playwright que carga, envía una entrada y comprueba el estado.
12. **Desmontaje limpio** de la isla: sin fugas.

## (4) Referencias ejemplares

Las últimas cinco las cito de memoria; hoy no las abrí.
- Blog de Phaser (Phaser 3 frente a 4): https://phaser.io/news/2026/05/phaser-3-vs-phaser-4
- Manual de WebGPURenderer de three.js: https://threejs.org/manual/en/webgpurenderer.html
- Glenn Fiedler, «Fix Your Timestep!»: https://gafferongames.com/post/fix_your_timestep/
- Game Accessibility Guidelines: https://gameaccessibilityguidelines.com
- Bruno Simon, la experiencia lúdica de referencia en three.js: https://bruno-simon.com
- js13kGames, excelencia con muy poco peso: https://js13kgames.com

Fuentes: [Phaser 4.1](https://phaser.io/news/2026/04/phaser-4-1-0-salusa-release) · [Phaser Game Agent MCP](https://phaser.io/news/2026/07/phaser-game-agent-mcp-setup) · [Skills de Phaser en GitHub](https://github.com/phaserjs/phaser/tree/master/skills) · [Blog de PixiJS, junio de 2026](https://pixijs.com/blog/june-2026) · [Documentación de WebGPURenderer](https://threejs.org/docs/pages/WebGPURenderer.html) · [three.js r186 y Gaussian splats](https://radiancefields.com/three.js-merges-a-native-gaussian-splat-renderer-for-webgpu-in-r186)

## Resultado 4

**Nota de verificación.** La API de GitHub estaba bloqueada por límite de peticiones, así que saqué las estrellas de la web de GitHub. Las versiones, fechas y licencias vienen del registro npm y los pesos en gz de Bundlephobia. Donde pone "n/v", el dato no está verificado.

## (1) Stack recomendado: aplicaciones de lectura y edición de texto largo

**Qué hace que todo funcione en armonía.** Todas las piezas comparten dos cosas:

- **Una capa de tokens CSS** (`--measure`, `--leading`, `--font-body`, `--theme-*`). La leen igual la página propia y el iframe de un EPUB, donde se inyectan los mismos tokens.
- **Un único modelo de posición**, el Locator de Readium: `href`, `progression`, `text{before, highlight, after}`. Ese mismo objeto sirve para el progreso, la retoma, los subrayados, los resultados de búsqueda y los enlaces profundos (`#:~:text=`).

En Astro, el contenido son páginas estáticas y cada función interactiva es una isla:

| Función | Carga | Tecnología |
|---|---|---|
| Panel de preferencias | inline en `<head>`, antes del primer pintado | vanilla |
| Anotador | `client:idle` | Recogito |
| Búsqueda | bajo demanda | Pagefind |
| Editor | `client:only`, carga diferida | Tiptap |

**CSS nativo (núcleo, sin dependencias)**
- **Medida y ajuste de línea.** `max-inline-size: 66ch`, tamaño con `clamp()` y `text-wrap: pretty` en párrafos (`balance` en títulos). Chrome 117+ y Safari 26+ lo soportan; en Firefox queda como mejora progresiva.
- **Guionado.** `hyphens: auto` con el `lang` correcto en `<html>` y en cada pasaje en otro idioma. Se completa con `hyphenate-limit-chars` y con Hyphenopoly 6.1.0 como polyfill (MIT, WASM, patrones por idioma, 2026-01).
- **Temas.** `color-scheme` + `light-dark()` + `prefers-contrast` + `prefers-reduced-motion`. Cuatro temas: claro, sepia, oscuro y negro OLED.
- **Subrayados y búsqueda.** CSS Custom Highlight API (`::highlight()`), Baseline 2025 desde Firefox 140. Marca rangos sin tocar el DOM y sirve para ambas cosas. Sustituye a mark.js, abandonado desde 2018.
- **Paginación.** Recomiendo el desplazamiento por defecto. El modo paginado se hace con CSS multicolumna (`columns` + `height: 100dvh` + `scroll-snap-type: x mandatory`), la misma técnica que foliate-js y epub.js. Vanguardia: `::scroll-button` y `::scroll-marker` para los controles de página, solo en Chrome.
- **Rendimiento en capítulos largos.** `content-visibility: auto` por capítulo.
- **Vanguardia tipográfica.** `text-box-trim` (Chrome 133, Safari 18.2) para el ritmo vertical. `font-size-adjust` (Baseline 2024) para cambiar de fuente sin alterar la altura de x. `size-adjust` en `@font-face` para que no haya saltos de maquetación.
- **Notas.** Popover API (Baseline 2024) con posicionamiento anclado de CSS; si no está disponible, @floating-ui/dom 1.8.0 (MIT, 8,2 KB gz, 2026-07). En pantallas anchas, notas al margen al estilo Tufte CSS o Gwern. Roles DPUB-ARIA `doc-noteref` y `doc-footnote`.
- **Búsqueda sin dependencias.** `Intl.Segmenter` para palabras completas + `Intl.Collator({sensitivity:'base'})` para ignorar acentos, pintando con `::highlight`. Para un sitio entero: Pagefind 1.5.2 (MIT, 2026-04), índice estático por trozos y bien integrado con Astro (peso n/v).

**Fuentes (OFL-1.1, vía @fontsource 5.3.0)**
- **Literata Variable.** Diseñada para lectura larga, eje de tamaño óptico.
- **Source Serif 4 Variable.** Tamaños ópticos.
- **Atkinson Hyperlegible Next.** Opción de alta legibilidad.
- **OpenDyslexic.** Solo como opción, no como solución. Las pruebas empíricas no la respaldan; tienen más efecto el espaciado entre letras y palabras y el interlineado, que el panel debe exponer.

**Lectores EPUB**
- **foliate-js 1.0.1** (MIT, 2025-04, 1,1k★). Módulos ES sin paso de compilación y sin dependencias obligatorias. Soporta EPUB, MOBI, AZW3, FB2, CBZ y PDF experimental. Incluye paginador por columnas, subrayados en SVG (`overlayer`), búsqueda con Intl, CFI y progreso, y TTS en SSML. Es la opción ligera para proyectos estáticos. Su README avisa de que la API "no es estable", así que hay que fijar la versión.
- **Vanguardia/estándar: Readium ts-toolkit.** @readium/navigator 2.10.2 y @readium/shared 2.5.1 (BSD-3, 2026-09-18, muy activo, 151★). Incluye decoraciones, sigue la especificación Navigator/Locator y lleva ReadiumCSS con preferencias de usuario. Es la base de Thorium Web.
- **Descartados.** epubjs 0.3.93 (sin publicaciones desde 2022). pagedjs 0.4.3 (estancado desde 2023). Vivliostyle es AGPL-3.0: solo sirve para impresión y teniendo en cuenta la licencia.

**Anotaciones**
- **@recogito/text-annotator 4.3.4** (BSD-3, 2026-09-17). Modelo parecido al W3C Web Annotation, con núcleo vanilla, envoltorio para React, extensión TEI y otra para PDF. La persistencia va por eventos (`createAnnotation`/`updateAnnotation`). Peso n/v. Creo que permite elegir el renderizador, incluido el de Custom Highlights, pero no lo he verificado.
- **Alternativa mínima.** Selection API + Custom Highlight API + anclaje por cita de texto (`TextQuoteSelector`), guardando JSON W3C. @apache-annotator/dom está parado desde 2021: úsalo solo como referencia del algoritmo.

**Edición de texto largo**
- **Tiptap 3.31.3** (MIT, 2026-09-04, 38,5k★). Sobre ProseMirror; @tiptap/core pesa 34,8 KB gz más 54,6 KB gz de prosemirror-view. Ojo: comentarios y control de cambios son de pago (Pro/Cloud).
- **Estilo iA Writer, markdown primero.** CodeMirror 6 con el lenguaje markdown y decoraciones de vista previa en vivo.
- **Vanguardia.** Lexical 0.51.0 (MIT, 62,2 KB gz, todavía antes de 1.0) y Milkdown 7.22.1.
- **Colaboración.** Yjs 13.6.32 (MIT).

**Utilidades**
- **@mozilla/readability 0.6.0** (Apache-2.0) para el modo lectura de HTML externo, siempre saneado con DOMPurify 3.4.x.
- **typograf 7.8.0** (MIT, 2026-08) para comillas «», rayas y espacios finos.
- **Enlaces a citas.** Text Fragments (`#:~:text=`), soportado en todos los navegadores desde Firefox 131.

## (2) Skills

**Recomendada: `ueberdosis/tiptap@tiptap`**
- 3,1k instalaciones; el repositorio oficial tiene 38,5k★.
- Superó las auditorías de Gen Agent Trust Hub, Socket y Snyk.
- Leí el SKILL.md completo (6,9 KB) y no tiene scripts. Su única actividad de red es leer la documentación de tiptap.dev (`.md` y `llms.txt`) y, de forma opcional, un `git clone --depth 1` del repositorio oficial en `.reference/`. No descarga binarios. `JWT_TOKEN` solo aparece como marcador en un ejemplo de Tiptap Cloud; no pide credenciales.
- **Veredicto: segura.** No se solapa con las instaladas.
- **Instalar: sí**, pero solo si el proyecto incluye un editor.

**No instalar**

| Skill | Instalaciones | Motivo |
|---|---|---|
| jezweb/claude-skills@tiptap | 489 | Repite la oficial. |
| rivet-dev/skills@collaborative-text-editor | 1,1k | Atada a la plataforma Rivet. No leída. |
| smerchek/claude-epub-skill@markdown-to-epub-converter | 652 | Produce EPUB, no lo muestra. No leída. |
| tw93/waza@read | 13,3k | Sirve para que el agente lea URLs, no para construir lectores. |
| jakubkrehel/skills@better-typography | 22,7k | Tipografía general, dominio de otro equipo; ya aparece instalada. |
| wondelai/skills@web-typography | 8k | Tipografía general, dominio de otro equipo; se solapa con better-typography. |

**Hueco en el ecosistema.** No existe ninguna skill de lectores EPUB, de anotación de texto ni de modos de lectura. Conviene escribir una propia que recoja los contratos de token y Locator descritos arriba.

## (3) Listón de calidad (verificable)

1. **Medida.** 45–75 caracteres por línea (objetivo ~66) en cualquier ancho y al menos 35 en 320 px.
2. **Zoom y reflujo.** Al 200 % y a 320 px no aparece desplazamiento horizontal (WCAG 1.4.4 y 1.4.10).
3. **Espaciado de texto.** Aguanta interlineado 1.5, párrafos 2em, letras 0.12em y palabras 0.16em sin cortar texto (WCAG 1.4.12).
4. **Contraste.** El cuerpo de texto llega a 7:1 en todos los temas, incluidos sepia y oscuro. El tema oscuro no usa #000 ni #fff puros.
5. **Idioma.** `lang` correcto en el documento y en cada pasaje en otro idioma. Guionado activo. `text-wrap: pretty` evita las líneas cortas sueltas al final de párrafo.
6. **Preferencias sin parpadeo.** Tema, tamaño, fuente e interlineado se aplican antes del primer pintado. CLS < 0,05.
7. **Retoma.** Al volver a abrir, la posición se recupera con un error de ±1 párrafo incluso tras cambiar la fuente o el ancho, porque se ancla a elemento + desplazamiento de carácter o CFI, no a `scrollY`.
8. **Anotaciones.** Se crean, editan y borran con teclado. Sobreviven al reflujo y al cambio de tema. No dependen solo del color. Se exportan en JSON W3C o Markdown.
9. **Búsqueda.** Ignora acentos ("cancion" encuentra "canción") y respeta palabras completas. Navegación con n/N y número de resultados anunciado por `aria-live`.
10. **Rendimiento.** Menos de 50 KB gz de JS en la ruta de lectura; el editor se carga aparte. LCP < 2 s en 4G. Un capítulo de 100k palabras se desplaza a 60 fps.
11. **Modo paginado.** Funciona con ←/→, AvPág/RePág, espacio y deslizamiento. No corta figuras (`break-inside: avoid`). Respeta la preferencia de movimiento reducido.
12. **Notas.** Al margen en pantallas anchas y en popover en las estrechas. Enlace de ida y vuelta. Roles DPUB-ARIA y orden lógico para lectores de pantalla.

## (4) Referencias ejemplares

- Standard Ebooks: https://standardebooks.org y su manual de estilo https://standardebooks.org/manual
- Craig Mod: https://craigmod.com
- Readwise Reader: https://readwise.io/read
- iA Writer: https://ia.net/writer (y https://ia.net/topics/the-web-is-all-about-typography-period)
- Gwern.net (notas al margen y popups): https://gwern.net
- Practical Typography: https://practicaltypography.com (referencia técnica: https://readium.org/readium-css/)

Fuentes consultadas: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API · https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap · https://github.com/johnfactotum/foliate-js · https://github.com/readium/ts-toolkit · https://github.com/recogito/text-annotator-js · https://skills.sh/ueberdosis/tiptap/tiptap

Los ficheros de trabajo están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/rd/`: las búsquedas de skills y el SKILL.md de Tiptap que leí, `tt.md`.

## Resultado 5

## (1) Stack recomendado: sistemas de diseño y componentes accesibles

Datos de npm y GitHub consultados hoy, 22-09-2026. Las estrellas se leyeron con ungh.cc; el peso se midió con gzip -9 sobre los ficheros de jsDelivr.

**Cómo encajan las piezas (una sola cadena de principio a fin):**
`tokens.json` (DTCG) → Terrazzo o Style Dictionary → `tokens.css` en `@layer tokens` (claro, oscuro y alto contraste desde un solo resolver). A partir de ahí, una de dos: Tailwind v4 `@theme inline`, que apunta a las variables semánticas, o variables propias al estilo de Open Props. Después vienen las primitivas de Every Layout en `@layer layouts` y los componentes con Base UI o React Aria (islas React) o Zag (sin framework), estilados con `[data-state]`, `[data-disabled]` y demás. Iconos Lucide.

Reglas para que todo encaje:
- Un solo espacio de nombres de tokens. No se mezclan la paleta de Open Props con la de Tailwind.
- Una sola librería de primitivas por proyecto. Nunca Radix y Base UI a la vez.
- Una sola familia de iconos.

| Pieza | Recurso · URL | Versión · licencia · ★ | Peso gz | Por qué | Alternativa de vanguardia o secundaria |
|---|---|---|---|---|---|
| Formato de tokens | W3C DTCG 2025.10: Format, Color y Resolver · https://www.designtokens.org/tr/2025.10/format/ | Primera versión estable, 28-10-2025 · repo con 2,1k★ | 0 en ejecución | Estándar neutral respecto al fabricante. Los colores son objetos con espacio de color (oklch, display-p3). Los temas se hacen con modificadores del Resolver. | — |
| Compilador de tokens | Terrazzo · https://terrazzo.app | @terrazzo/cli 2.7.1 · MIT · 458★ | 0 (se ejecuta al compilar) | Es la herramienta que cubre el DTCG completo, resolvers incluidos. | **Style Dictionary** 5.5.5 · Apache-2.0 · 4,8k★. Es la opción consolidada y multiplataforma (iOS/Android). Su v5 adopta DTCG 2025.10 como formato base, pero el soporte completo del Resolver sigue en curso (issue #1590). Ojo: el paquete npm `terrazzo` (0.7.4) es otro, el bueno es `@terrazzo/cli`. |
| Escalas fluidas | Utopia · https://utopia.fyi | utopia-core 1.6.0 · ISC · última publicación 2024 (maduro, sin cambios) | 0 (genera `clamp()`) | Tipografía y espaciado que interpolan entre dos viewports, sin breakpoints de tipo, y los pares de espacio crecen con la misma lógica. | — |
| Composición intrínseca | Every Layout · https://every-layout.dev | Libro y patrones CSS | Aprox. 1 KB | Stack, Box, Center, Cluster, Sidebar, Switcher, Cover, Grid, Frame, Reel e Imposter se adaptan al contenido sin media queries. Se combinan con container queries. | — |
| Variables CSS listas | Open Props · https://open-props.style | 1.7.23 · MIT · 5,5k★ | Completo 7,7 KB. Módulos sueltos: normalize 2,3 KB, oklch-hues 0,14 KB | Escalas de easing, sombras y tamaños ya afinadas. Se puede importar por partes. | Útil en proyectos sin Tailwind. Si hay Tailwind, sobra. |
| CSS moderno (el núcleo) | Orden de `@layer` (reset, tokens, base, layouts, components, utilities), `@scope`, `:where()` para especificidad 0, `oklch()`, color relativo `oklch(from var(--brand) calc(l - .08) c h)`, `color-mix()`, `light-dark()` + `color-scheme`, `@property` para tokens con tipo, `:has()`, container queries | Nativo | 0 | Temas y estados derivados sin JavaScript, y la cascada bajo control. | Primitivas nativas primero: `<dialog>`, `popover`, invoker commands (`commandfor`), anchor positioning. Polyfill de anclaje @oddbird/css-anchor-positioning 0.10.2 (BSD-3, 41 KB), solo si hace falta. |
| Primitivas sin framework | Zag.js · https://zagjs.com | 1.44.0 · MIT · 5,2k★ · muy activo | @zag-js/vanilla 3,8 KB + máquina de diálogo 2,75 KB | Máquinas de estado accesibles (APG) independientes del framework. Van perfectas en islas de Astro o JS puro. | Ark UI 5.39.2 (MIT, 5,4k★), que es la misma base de Zag para React, Vue, Solid y Svelte. Para posicionar sin anchor, @floating-ui/dom 1.8.0 (8,2 KB). |
| Primitivas React (por defecto) | Base UI · https://base-ui.com | @base-ui/react 1.8.0 · MIT · 11k★ | Tree-shakeable (no medido) | Estable desde el 11-12-2025. La hacen antiguos autores de Radix y es la opción por defecto de shadcn desde julio de 2026. | Ojo: `@base-ui-components/react` es el nombre antiguo. |
| Primitivas React (máxima accesibilidad e i18n) | React Aria Components · https://react-aria.adobe.com | 1.21.1 · Apache-2.0 · 15,9k★ · publicado hoy | Tree-shakeable (no medido) | La mejor en accesibilidad, internacionalización, selectores de fecha, arrastrar y soltar, e interacción táctil y por teclado. | Radix (`radix-ui` 1.6.7, 19,3k★): mantenido, pero ya no es la opción por defecto. Headless UI 2.2.10 (28,7k★): último push en abril de 2026 y catálogo corto, no recomendado como primera opción. |
| Componentes React con código propio | shadcn/ui · https://ui.shadcn.com | CLI `shadcn` 4.21.0 · MIT · 124k★ | Solo lo que se añade | Copia el código al proyecto, usa tokens semánticos y se apoya en Base UI o Radix. | — |
| Utilidades | Tailwind CSS v4 · https://tailwindcss.com | 4.3.3 · MIT · 97,6k★ | Solo las clases usadas (JIT) | Configuración en CSS (`@theme`), paleta oklch y conexión directa con las variables DTCG. | @tailwindcss/browser (71 KB) solo para prototipos, nunca en producción. |
| Iconos | Lucide · https://lucide.dev | 1.47.0 · ISC · 24,7k★ · publicado el 17-09-2026 | SVG por icono, tree-shakeable | Trazo uniforme, `currentColor`, muy mantenido. | **Phosphor** (MIT, 7,5k★): seis pesos (thin a fill y duotone), pero sus paquetes npm no se publican desde 2025 y su CSS de fuente pesa 12 KB por peso; mejor usarlo en SVG. Iconify + @iconify/tailwind4 1.2.3 da acceso unificado a muchas familias. |
| Color y contraste (al compilar) | colorjs.io · https://colorjs.io | 0.7.1 · MIT | 0 en ejecución | Genera rampas oklch y comprueba contraste WCAG 2 y APCA en CI. | @material/material-color-utilities 0.4.0 (HCT, Apache-2.0). |

**Temas claro y oscuro (receta):**
- Los modificadores de tema salen del mismo resolver DTCG.
- En CSS: `:root{color-scheme:light dark}`, tokens con `light-dark()` y la anulación con `[data-theme=light|dark]`.
- Un script en línea antes del primer pintado evita el FOUC.
- Además: `prefers-contrast: more` y `forced-colors: active` con `CanvasText` y `Highlight`.

## (2) Skills (leí el SKILL.md y los scripts de cada una; no instalé nada)

Las estrellas de las skills no se pudieron comprobar porque la API de GitHub devolvió límite de peticiones. Pongo las estrellas del repo cuando las conozco.

| Skill | Instalaciones | Seguridad | Solapes | ¿Instalar? |
|---|---|---|---|---|
| **ilikescience/design-tokens-skill@design-tokens** | 150 | **Segura.** Solo md y fixtures json (tokens primitivos, semánticos, temas claro/oscuro, resolver). Lo único que sugiere es `npm i -D @terrazzo/cli`. | Parcial con impeccable (tokens genéricos) y better-colors. Es la única que cubre DTCG 2025.10, el módulo Color y el Resolver. | **SÍ** (global) |
| **shadcn/ui@shadcn** (oficial) | 271,7K · repo 124k★ | **Segura, con matiz.** Al cargarse ejecuta `!npx shadcn@latest info --json` y `allowed-tools` queda limitado al CLI de shadcn. Solo usa la red para npm y el registro de shadcn, lo cual está justificado. | Ninguno | **SÍ, pero a nivel de proyecto** y solo en proyectos React con `components.json`. |
| **react-aria.adobe.com@react-aria** (oficial Adobe, URI well-known) | 2,4K | **Segura.** Apache-2.0, solo documentación por componente y test-utils. | Ninguno | **SÍ, a nivel de proyecto** cuando se use React Aria. |
| shadcn/ui@migrate-radix-to-base | 17,8K | Oficial, segura | — | Solo si hay que migrar un proyecto shadcn existente de Radix a Base UI. |
| anthropics/knowledge-work-plugins@design-system | 3,7K | Segura (solo md) | Alto con impeccable (audit, extract, normalize) | NO |
| wshobson/agents@design-system-patterns | 14,6K | Segura (md) | Genérica. Alto solape con impeccable y design-taste | NO |
| nextlevelbuilder/ui-ux-pro-max-skill@design-system | 31K | Incluye `fetch-background.py`, que hace scraping de Pexels y Unsplash, y generación de diapositivas. Red injustificada para un sistema de diseño y fuera de alcance. | — | **NO** |
| arvindrk/extract-design-system | 129,4K | Exige `npx playwright install chromium`, que **descarga un binario**, y ejecuta un paquete npm de terceros. | impeccable:extract | **NO (rechazada)** |
| jezweb/claude-skills@tailwind-v4-shadcn | 2,7K | No verificable: la ruta del SKILL.md dio 404 | — | Sin veredicto |

Las skills que acaban de instalar otros equipos (better-colors, better-accessibility, better-typography, modern-css, tooltips) cubren color, accesibilidad y CSS. Con las tres de arriba no hace falta ninguna más para sistemas de diseño.

## (3) Listón de calidad (se puede verificar)

1. **Una sola fuente de verdad.** Un grep encuentra 0 literales hex, rgb o px de color, espacio o radio fuera de los ficheros de tokens.
2. **Tres niveles: primitivo, semántico y de componente.** Los componentes solo referencian tokens semánticos.
3. **Temas.** Claro, oscuro y alto contraste salen del mismo resolver. Se cambian sin recargar y sin FOUC, se respeta `prefers-color-scheme` con anulación manual persistente y `forced-colors` es legible.
4. **Contraste validado por script en CI, en ambos temas.** Texto al menos 4,5:1; texto grande, componentes y foco al menos 3:1 (WCAG 2.2 AA). APCA como comprobación secundaria.
5. **Tipografía y espaciado fluidos con Utopia.** El reflow funciona de 320 px a 2560 px sin scroll horizontal y a zoom del 400% (WCAG 1.4.10).
6. **Maquetación intrínseca.** Primitivas de Every Layout más container queries. Los componentes responden a su contenedor, no al viewport.
7. **Cascada bajo control.** Orden de `@layer` declarado una sola vez, cero `!important`, especificidad de componentes como máximo (0,1,0) mediante `:where()` o `@scope`.
8. **Nada de ARIA hecho a mano.** Solo elementos nativos o primitivas contrastadas (Base UI, React Aria, Zag). Se cumplen los patrones de teclado de APG y axe-core da 0 infracciones.
9. **Foco y objetivos.** `:focus-visible` con token de al menos 2 px y contraste 3:1, sin quedar tapado (2.4.11). Objetivos táctiles de al menos 24×24 px (2.5.8).
10. **Movimiento con tokens.** Duraciones y curvas son tokens y `prefers-reduced-motion` se respeta.
11. **Iconos coherentes.** Una sola familia, trazo y peso únicos, tamaño en `em` alineado al texto. Los decorativos llevan `aria-hidden` y los que significan algo tienen nombre accesible.
12. **Peso.** Tokens, base y componentes suman menos de ~30 KB gz. Solo hay JS en islas interactivas (`client:visible`) y 0 JS en componentes de presentación. Hay una página viva con todos los estados (hover, focus, active, disabled, invalid, loading) en ambos temas.

## (4) Referencias ejemplares

- Every Layout: https://every-layout.dev
- Utopia: https://utopia.fyi
- GOV.UK Design System (referencia en accesibilidad): https://design-system.service.gov.uk
- React Aria / Spectrum 2: https://react-aria.adobe.com
- Open Props: https://open-props.style
- shadcn/ui y Base UI: https://ui.shadcn.com y https://base-ui.com

**Fuentes:**
- [DTCG, primera versión estable](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [DTCG Format 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- [Style Dictionary, issue #1590](https://github.com/style-dictionary/style-dictionary/issues/1590)
- [Style Dictionary y DTCG](https://styledictionary.com/info/dtcg/)
- [Terrazzo](https://terrazzo.app/docs/)
- [shadcn, julio de 2026: Base UI por defecto](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)
- [Radix frente a Base UI](https://www.shadcndeck.com/blog/radix-vs-base-ui)

Los ficheros de trabajo (SKILL.md descargados y resultados de búsqueda) están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/ds/`.

## Resultado 6

(1) STACK RECOMENDADO: LANDING PAGES Y PÁGINAS DE PRODUCTO

Versiones y licencias tomadas del registro npm el 22-09-2026. El peso gz lo medí en bundlephobia solo cuando digo "medido"; el resto son estimaciones marcadas con ≈. Dejo fuera las piezas que cubren otros equipos (Astro, motores de movimiento, three.js, CSS nativo, tipografía, a11y) y solo digo dónde encajan.

Esqueleto y entrega
- La página base es HTML estático generado por Astro. Solo el JS de las islas que lo necesitan, con `client:visible` o `client:idle`. En el héroe no se hidrata nada.
- La hoja crítica va en línea (≤14 KB). Una sola llamada a la acción principal por pantalla. La vista de móvil se hace primero.

Imagen (lo que más pesa en el LCP)
- sharp 0.35.4, Apache-2.0, solo en compilación, 0 KB en cliente. https://sharp.pixelplumbing.com
  - Genera AVIF + WebP y un `srcset` con `sizes` real.
  - Por qué: AVIF suele pesar entre un 30 y un 50 % menos que JPEG a la misma calidad.
- @unpic/astro 1.0.2 y unpic 4.2.2, MIT, 0 KB en cliente. https://unpic.pics
  - Imágenes responsive a partir de la URL del CDN, con `width`/`height` siempre (CLS cero).
- La imagen LCP del héroe lleva `fetchpriority="high"`, sin `loading=lazy` y con `<link rel=preload imagesrcset>` cuando la descubre el CSS. El resto va con `loading=lazy decoding=async`.
- thumbhash 0.1.1, MIT, ≈1 KB. https://github.com/evanw/thumbhash
  - Marcador de posición de unos 25 bytes que conserva el color y la relación de aspecto. Sustituye con ventaja a BlurHash.
  - Alternativa: @unpic/placeholder 0.1.2 (color dominante en CSS, 0 JS).

Vídeo
- En el héroe, `<video autoplay muted loop playsinline preload="none" poster=…>` con fuentes AV1 → H.264 (ffmpeg, CRF, ≤2–3 MB) y `prefers-reduced-motion`, que muestra el póster fijo.
  - Regla: el póster es el candidato LCP, no el vídeo.
- lite-youtube-embed 0.3.4, Apache-2.0, 1,56 KB gz (medido). https://github.com/paulirish/lite-youtube-embed
  - Fachada que carga el iframe solo al hacer clic. Ahorra unos 500 KB o más.
- media-chrome 4.19.2, MIT, ≈15–20 KB gz sin verificar. https://github.com/muxinc/media-chrome
  - Controles como web components accesibles que se pueden tematizar. Sirve cuando el vídeo es el producto.
  - Alternativa: @mux/mux-player 3.13.4 (HLS adaptativo y analítica de QoE).

Fuentes sin salto de maquetación
- fontaine 1.0.0, MIT, 0 KB en cliente. https://github.com/unjs/fontaine
  - Genera `@font-face` de reserva con `size-adjust`/`ascent-override` para que no haya CLS al cambiar de fuente.
  - Alternativa: @capsizecss/core 4.1.3 (MIT), recorte del espacio sobrante del texto para alinear en rejilla.
- @fontsource-variable/*, OFL, autoalojado. Precarga solo el subconjunto latino de la fuente del titular.

Movimiento de entrada
- CSS nativo más View Transitions para lo esencial, y GSAP 3 con SplitText y ScrollTrigger, ya instalados (gsap-*), para la coreografía del héroe.
- Las reglas de LCP y CLS del movimiento están en el listón de calidad (3).
- Vanguardia: @rive-app/canvas-lite 2.43.0, MIT, ≈80 KB gz sin verificar. https://rive.app
  - Héroes interactivos con máquina de estados, mucho más ligeros que un vídeo o que Lottie.
  - Se carga con `client:visible` detrás de un póster fijo.
  - Alternativa clásica: @lottiefiles/dotlottie-web 0.80.0 (MIT, WASM). lottie-web 5.13.0 está en mantenimiento.

Medición
- web-vitals 6.2.2, Apache-2.0, 3,3 KB gz (medido). https://github.com/GoogleChrome/web-vitals
  - Datos de usuarios reales (RUM) de LCP, INP y CLS, con atribución.
- Umbral en CI: Lighthouse CI o Unlighthouse con presupuesto LCP ≤2,5 s p75 en 4G y CLS ≤0,1.
- Diagnóstico: la skill ya instalada chrome-devtools-mcp:debug-optimize-lcp, más CrUX y PageSpeed Insights.

Pruebas A/B sin romper el diseño
- Principio: nada de snippets "anti-parpadeo" en el cliente, que ocultan el `<body>` y destrozan el LCP.
  - Las variantes se deciden en el edge o al compilar: Astro genera `/v/a` y `/v/b` estáticas, y el middleware de Netlify, Vercel o Cloudflare lee o asigna la cookie y reescribe la ruta.
  - Las variantes solo cambian copy y tokens, nunca la maquetación ni el sistema de diseño.
- GrowthBook: SDK @growthbook/growthbook 1.7.0, MIT, ≈10 KB gz sin verificar. https://www.growthbook.io
  - Plataforma de código abierto con estadística bayesiana y frecuentista, CUPED y SRM checks.
  - Su SDK puede evaluar en el edge.
- PostHog (posthog-js 1.434.9, Apache-2.0/MIT): experimentos, analítica y grabaciones. Pesa mucho: cárgalo en diferido y no lo metas en el camino crítico.
- Vanguardia: flags evaluadas en el edge con el estándar OpenFeature.

Datos estructurados y prueba social verificable
- JSON-LD `Product`/`Offer`/`AggregateRating` solo con datos reales.
- Cada testimonio lleva nombre, cargo, foto y enlace a la fuente (G2, caso publicado). Cada logo de cliente tiene permiso.
- Cada cifra lleva nota al pie con su fuente y fecha.

(2) MEJORES SKILLS

Leí todos los SKILL.md que valoro. No instalé nada: solo descargué los repositorios al scratchpad para leerlos.

1. coreyhaines31/marketingskills
   - Repositorio: 51,2k estrellas, MIT, 473 commits, v2.0. Tiene 70 skills con unos 5 M de instalaciones en total.
   - Ojo: algunas skills han cambiado de nombre y los alias antiguos siguen apareciendo en skills.sh: page-cro → cro, ab-test-setup → ab-testing, pricing-strategy → pricing.
   - Seguridad: los skills son Markdown puro (SKILL.md, references y evals). No tienen scripts, peticiones de red ni credenciales.
     - El repo sí incluye `tools/clis/*.js`, que son clientes de API de terceros (Optimizely, Hotjar, Mixpanel…). No forman parte de estos skills y no hay que ejecutarlos.
   - Veredicto: SEGURA.

   | Skill | Instalaciones | Instalar | Comentario |
   |---|---|---|---|
   | copywriting | 205,8K | Sí | Claridad antes que ingenio, beneficio antes que característica, lenguaje del cliente. Incluye "Honest over sensational": prohíbe estadísticas y testimonios inventados. |
   | cro | 70,7K; alias page-cro 58,2K | Sí | Análisis por orden de impacto: propuesta de valor en 5 s, titular, llamada a la acción, prueba social y objeciones. |
   | ab-testing | 61,6K; alias ab-test-setup 52,8K | Sí | Hipótesis, tamaño de muestra, métricas de guarda, el problema de mirar resultados antes de tiempo. |
   | copy-editing | 129,2K | Sí | Revisión del copy existente. |
   | pricing | 63,9K | Opcional | Útil para páginas de precios; trae una disección de páginas de precios. |
   | marketing-psychology | 146,5K | Con reserva | Pide aplicarla "éticamente", pero sugiere preseleccionar la opción de salida ("opt-out") en suscripciones. Eso choca con el RGPD y con las normas de consumo de la UE, así que el integrador debe anular esa línea. |

   - Solapes: clarify (impeccable) cubre el microcopy de interfaz, no la persuasión. critique y audit cubren el diseño, no la conversión. Son complementarias.
   - Leen un `.agents/product-marketing.md` de contexto. Conviene crearlo por proyecto.

2. addyosmani/web-quality-skills@core-web-vitals (27K instalaciones) y @performance
   - Repositorio: 2,8k estrellas, MIT, 2026.
   - Seguridad: `web-quality-audit/scripts/analyze.sh` es un analizador de HTML de solo lectura (grep + jq), sin red ni escritura. Veredicto: SEGURA.
   - Solapes: coincide en parte con audit y optimize (impeccable) y con debug-optimize-lcp. Esta aporta un método de LCP/INP/CLS con datos de campo frente a datos de laboratorio, con referencias por métrica.
   - Instalar: sí core-web-vitals y performance. No accessibility ni seo, que son terreno de otro equipo.

3. autonnel/autonnel-skills@landing-page-conversion-audit (62,7K instalaciones, Apache-2.0, 122 líneas)
   - Seguridad: Markdown sin scripts. Pero en las líneas 105-122 promociona el producto del propio autor y anima a descargar y ejecutar en local su constructor de embudos, con postbacks a Facebook, TikTok y Google. Veredicto: SEGURA CON RESERVA.
   - El contenido es bueno: exige nombrar elemento, fallo y cambio; limita lo que se puede afirmar según los datos disponibles; y pide testimonios atribuibles.
   - Instalar: no tal cual. Si se instala, hay que quitar el bloque promocional. Se solapa con cro.

4. Descartadas sin instalar
   - 101-skills/superpowers@landing-page-design (23,5K) y sus copias qu-skills, magentosh, skills-shell e its-a-skill-issue: copias del mismo skill en varias cuentas, con procedencia dudosa.
   - onewave-ai/claude-skills@landing-page-copywriter (6,3K): la cubre copywriting.
   - samber/cc-skills@copywriting-cta (2,4K) y miqdadbadjuber/anti-slop@antislop-copywriting (2,5K): de nicho, no las leí a fondo.

Las búsquedas en skills.sh y en la API de GitHub llegaron al límite de peticiones durante la sesión (30 por minuto en skills.sh), así que hubo menos consultas de las previstas.

(3) LISTÓN DE CALIDAD, VERIFICABLE

1. En 5 segundos se entiende qué es, para quién es y la acción principal. Se comprueba con una prueba de 5 segundos o con una lectura del héroe en frío.
2. Hay una sola acción principal por pantalla. Su texto describe el resultado ("Empieza gratis", no "Enviar") y es visible sin hacer scroll a 375×667.
3. Rendimiento en datos de campo, p75 móvil: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1. Lighthouse móvil ≥90 en Rendimiento y Accesibilidad.
4. La imagen o el póster LCP es AVIF/WebP con `srcset`/`sizes` y `fetchpriority=high`, sin lazy. En el héroe no hay JS que bloquee el pintado. Peso inicial ≤ 1 MB, JS del héroe ≤ 50 KB gz.
5. Toda cifra, logo y testimonio es verificable: nombre, cargo y fuente o enlace, con fecha. No hay contadores falsos, urgencia inventada ni casillas premarcadas.
6. Precios: el precio total con impuestos se ve antes del pago. Las diferencias entre planes están en una tabla accesible (`<table>` con `scope`). La cancelación está tan visible como el alta.
7. La dirección de arte es propia y coherente: una tipografía display con carácter, una paleta en tokens y una escala de espaciado. Nada de "aspecto de plantilla de IA" (lo comprueban critique y antipatrones).
8. Movimiento de entrada: la animación de entrada no retrasa el LCP ni mueve la maquetación (solo `transform`/`opacity`). Dura menos de 800 ms y `prefers-reduced-motion` la reduce a un fundido o a nada.
9. Accesibilidad: WCAG 2.2 AA (contraste ≥4,5:1, foco visible, objetivos ≥24 px, landmarks). El vídeo lleva subtítulos y control de pausa.
10. La estructura de persuasión sigue un orden: problema → propuesta → prueba → cómo funciona → objeciones y preguntas frecuentes → acción. El mensaje del anuncio y el del héroe coinciden.
11. En las pruebas A/B no hay parpadeo: las variantes se asignan en el edge o al compilar. Cada test tiene hipótesis, métrica principal, métricas de guarda y tamaño de muestra fijados de antemano.
12. SEO y compartición: `title` y `description` únicos, Open Graph con imagen de 1200×630, JSON-LD válido solo con datos reales, y `lang` correcto.

(4) REFERENCIAS EJEMPLARES

- https://linear.app — dirección de arte oscura y editorial, movimiento de entrada contenido, producto como protagonista.
- https://stripe.com — prueba social verificable y cifras con fuente, precios claros, degradado WebGL ligero.
- https://www.apple.com/airpods-pro/ — el modelo de página de producto con scroll narrativo y vídeo/imagen secuenciados.
- https://raycast.com — héroe de producto con capturas reales y copy directo.
- Galerías de dirección de arte: https://godly.website, https://www.siteinspire.com, https://www.awwwards.com
- Guía técnica: https://web.dev/articles/optimize-lcp

Fuentes de las búsquedas: [borghei landing-page-generator](https://github.com/borghei/Claude-Skills/blob/main/marketing/landing-page-generator/SKILL.md), [leadgenjay hero-section-designer](https://github.com/leadgenjay/claude-skills/blob/main/skills/hero-section-designer/SKILL.md), [rampstackco landing-page-copy](https://github.com/rampstackco/claude-skills/blob/main/skills/landing-page-copy/SKILL.md), [skills.sh marketingskills](https://skills.sh/coreyhaines31/marketingskills), [github marketingskills](https://github.com/coreyhaines31/marketingskills), [github web-quality-skills](https://github.com/addyosmani/web-quality-skills)

Las copias descargadas para revisión están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/landing/`, en las carpetas `mk/`, `addyosmani_web-quality-skills/` y `autonnel_autonnel-skills/`.

## Resultado 7

Skills instaladas (10), todas legibles y ya registradas por Claude Code:

1. phaser — /Users/rodrodr/.claude/skills/phaser/SKILL.md (las 28 skills oficiales, intactas en topics/, con un índice escrito aquí)
2. pixijs — /Users/rodrodr/.claude/skills/pixijs/SKILL.md (índice oficial más 25 sub-skills en topics/, con los enlaces reescritos)
3. test-playable-web-games — /Users/rodrodr/.claude/skills/test-playable-web-games/SKILL.md
4. tiptap — /Users/rodrodr/.claude/skills/tiptap/SKILL.md
5. copywriting — /Users/rodrodr/.claude/skills/copywriting/SKILL.md
6. cro — /Users/rodrodr/.claude/skills/cro/SKILL.md
7. core-web-vitals — /Users/rodrodr/.claude/skills/core-web-vitals/SKILL.md
8. design-tokens — /Users/rodrodr/.claude/skills/design-tokens/SKILL.md
9. web-haptics — /Users/rodrodr/.claude/skills/web-haptics/SKILL.md
10. ui-sound-design — /Users/rodrodr/.claude/skills/ui-sound-design/SKILL.md

Documento: /Users/rodrodr/.claude/skills/_arsenal/ARSENAL.md

Resumen:
1. No usé `npx skills add`. Copié las fuentes ya revisadas, así que lo instalado es exactamente lo que se leyó. Solo descargué un repo nuevo, design-tokens (codeload de GitHub). Cada carpeta lleva un ORIGIN.md con la fuente y los cambios locales.
2. Volví a leer los SKILL.md de las 10. Phaser y Pixi los revisé con grep, sin leerlos enteros, por su tamaño: 36 y 65 ficheros markdown, sin scripts. Ninguna pide credenciales ni descarga binarios, y solo acceden a la red para leer documentación oficial o paquetes npm justificados.
3. Endurecí el analizador de ui-sound-design: interpolaba la ruta del archivo en el shell (`execSync`) y ahora pasa argumentos con `execFileSync`. Lo probé con un WAV.
4. Phaser y Pixi van agrupados en una sola skill cada uno. Así ocupan 2 entradas en la lista de skills en lugar de 54, y los enlaces entre sus temas siguen funcionando dentro de topics/.
5. core-web-vitals incluye ahora las guías de medición y de datos de usuarios reales (MEASUREMENT.md y RUM.md, que venían de la skill performance, no instalada). Así no deja enlaces rotos.
6. ARSENAL.md empieza con 10 contratos comunes para que las piezas funcionen en armonía:
   - una sola fuente de tokens (DTCG y Terrazzo), también para el canvas, el movimiento, el sonido y la háptica;
   - un orden único de `@layer`;
   - islas con `destroy()`;
   - un bus de feedback único (imagen, sonido y háptica a la vez);
   - una sola autoridad de movimiento por superficie;
   - accesibilidad, persistencia, presupuestos de rendimiento, verificación y honestidad de las cifras.
7. Incluye un mapa de qué skill manda en cada tarea, que resuelve los solapes con impeccable, las skills gsap-*, las better-*, y las de three.js y p5.js de otros equipos.
8. Para cada dominio (juegos, lectura, landing, sistemas de diseño, sonido y háptica, plataforma 2026) recoge el stack consagrado y el de vanguardia con versión y licencia, un listón verificable de 10 a 12 criterios y 6 referencias.
9. Rechacé cuatro skills por seguridad: threejs-game-skills y game-creator (claves de API, descarga de binarios), ui-ux-pro-max (scraping) y extract-design-system (descarga de binarios). Descarté otras por solape, por el cupo o por el RGPD (marketing-psychology). shadcn y react-aria quedan para instalar por proyecto.
10. Quedan para la integración: escribir una skill propia de lectura (no existe ninguna), el módulo del bus de feedback, la plantilla de isla con ciclo de vida y el contexto de marketing de cada proyecto (`.agents/product-marketing.md`). También hay que comprobar la háptica en un iPhone real y los pesos marcados como no verificados.
