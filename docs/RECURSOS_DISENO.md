# Recursos de diseño · skills y referencias para el sitio

Fecha: 22-IX-2026. Selección final hecha a partir de cinco informes: diseño web, visualización de datos, tipografía, accesibilidad, y Astro con movimiento. Antes de instalar se volvió a leer cada SKILL.md completo y se revisaron todos sus ficheros.

## 1. Skills instaladas (8)

Todas están en `~/.claude/skills/<nombre>/` como carpetas reales, no enlaces, y son idénticas byte a byte a la copia revisada. Ninguna trae scripts: solo Markdown, más un `agents/openai.yaml` de metadatos en las tres de Krehel. No hacen peticiones de red, no piden credenciales y no contienen instrucciones sospechosas. Las únicas coincidencias de «secret», «password» o «npx» están en ejemplos de documentación.

| skill | fuente | uso en skills.sh | qué aporta a este sitio | se solapa con |
|---|---|---|---|---|
| `better-typography` | jakubkrehel/skills (7 K★) | 22,7 K | `tabular-nums` en cifras que cambian; `balance` y `pretty` en titulares y pies, nunca en la prosa larga; medida de 60–75 caracteres; no dejar que el navegador fabrique la cursiva de Cormorant; subrayado `from-font`; suelo de peso (las caras finas solo desde 28 px) | `typeset` (esta es más concreta) |
| `better-accessibility` | jakubkrehel/skills | 18,9 K | anillo `:focus-visible` de al menos 2 px, comprobado contra cada color que atraviesa (oro sobre negro y sobre crema); roving tabindex; región `status` estable; zonas de 24 px ampliadas con pseudoelemento; revisión en dos pasadas (teclado, luego lector) | `audit`, `web-design-guidelines` |
| `better-colors` | jakubkrehel/skills | — | mide cada par en **cada tema** («no se invierte, se recalcula»); tokens por rol; ninguna cifra de contraste sin medir | `colorize` (no mide) |
| `charts-graphs` | mgifford/accessibility-skills (Mike Gifford, núcleo de Drupal) | 126 | modelo por capas (título, contexto, resumen, datos, fuente) que encaja con Gráfico·Tabla·Datos; o `role="img"` atómico o estructura probada, nunca las dos; los 755 días no entran en el orden de tabulación; resumen visible, no solo en `aria-describedby`; `forced-colors` | `dataviz` (esta añade WCAG) |
| `tooltips` | mgifford/accessibility-skills | 125 | la nota emergente: aparece al pasar el ratón y al recibir el foco, Esc la cierra, se puede recorrer con el puntero, no caduca; ratón y foco se siguen por separado; `hidden` y nunca `aria-hidden` | — |
| `astro-framework` | delineas/astro-framework-agents | 2 K | rutas `[lang]`, colecciones, `astro:assets`, `<script>` sin islas | ninguna |
| `modern-css` | paulirish/dotfiles (Paul Irish) | 526 | `@view-transition` entre documentos, `animation-timeline: view()`, `light-dark()`, `text-box`, popover con anchor positioning, `@starting-style`, `linear()`; todo con `@supports` | `animate` y `typeset` (esta da la API y su soporte) |
| `emil-design-eng` | emilkowalski/skills (Sonner, Vaul) | 289,7 K | criterio de movimiento: no animar lo frecuente ni lo que se hace con teclado; nota emergente de 125–200 ms que sale desde su punto de origen; la segunda se abre sin retardo; solo se animan `transform` y `opacity` | `animate`, `gsap-*` |

**Cómo se instalaron.** El `git` de esta máquina no arranca: `xcrun` y `/usr/local/bin/git` son x86_64 y el sistema necesita arm64e. Por eso `npx skills add owner/repo` falla al clonar. Se descargaron los tarballs de GitHub, se revisaron y se instalaron desde la ruta local (forma documentada en el README del CLI):
`DISABLE_TELEMETRY=1 npx -y skills add ./<repo> --skill <nombre> -g -a claude-code -y </dev/null`
Consecuencia: `npx skills update` también fallará. Para actualizar hay que repetir el proceso: descargar, revisar e instalar desde la ruta local.

### Avisos al usarlas (dónde la skill no manda)

- **La identidad fijada manda sobre cualquier skill.** Ninguna cambia la paleta, las familias ni el tema.
- `better-typography` pide comillas inglesas. Aquí se aplican las comillas por lengua (§3): «» en español, “ ” en inglés.
- `charts-graphs` propone la paleta Okabe-Ito. Aquí solo sirve para comprobar el daltonismo, no como paleta.
- `astro-framework` está escrita para Astro 5/6, pero el proyecto usa **Astro 7.3**. Ante cualquier duda de API, manda la documentación oficial.
- **No usar `<ClientRouter />`, aunque la skill lo explique.** Se usa `@view-transition { navigation: auto }` dentro de `prefers-reduced-motion: no-preference`. Con el router, los `<script>` de las figuras se ejecutan una sola vez y dejarían de funcionar al navegar.
- `emil-design-eng` responde con un saludo si se invoca sin pregunta: hay que invocarla con una pregunta concreta. Sus partes de React, Framer Motion y arrastre no aplican aquí.

## 2. Descartadas

| skill | motivo |
|---|---|
| anthropics/skills@frontend-design | Se solapa con `impeccable:frontend-design`, que ya está instalada, y el nombre repetido confundiría al elegir skill. Su lista de «rasgos por defecto de la IA» se consulta sin instalar (§4). |
| addyosmani/web-quality-skills (@accessibility, @performance, @core-web-vitals) | Es segura, pero ya lo cubren `better-accessibility`, `audit`, `optimize` y `chrome-devtools-mcp` (a11y-debugging, debug-optimize-lcp). Sus recetas son para Next, React y Vue. |
| caylent/tufte-data-viz | Se solapa con `dataviz`. Además impone su propia paleta (#fffff8, acento #e41a1c) y cifras `onum` en las tablas, y la mitad de sus reglas son para Recharts y ECharts. |
| mblode/agent-skills@typography-audit | Tiene buenas reglas editoriales, pero el autor tiene menos reputación de la exigida y usa convenciones de EE. UU. |
| bencium@ui-typography | Se activa sola en cualquier HTML e impone comillas “ ”, titulares en negrita, dos familias y prohíbe subrayar. |
| wondelai@web-typography | Genérica y con enlaces de afiliado. La cubre `better-typography`. |
| community-access@data-visualization-accessibility | Recomienda `role="application"` y `tabindex` en cada barra, que es justo lo que las demás fuentes señalan como fallo. |
| chrisvoncsefalvay@d3-viz | La nota emergente solo funciona con ratón, usa `.html()` con datos y no genera los SVG en la compilación. |
| nexu-io@d3-visualization | Rechazada por seguridad: manda clonar un repositorio de terceros sin revisar. |
| astrolicious@astro, incluud, PatternsDev@view-transitions | Contenido escaso o pensado para React; una remite a un `llms.txt` que Astro ya retiró. |
| mgifford@svg | Opcional. Lo esencial está en `charts-graphs`. |

No instalado, a decidir por el investigador: el servidor MCP oficial de la documentación de Astro (`https://mcp.docs.astro.build/mcp`). Da la API vigente de Astro 7, pero cambia la configuración de Claude Code.

## 3. Cuándo usar cada una

| momento | skills (nuevas en **negrita**) |
|---|---|
| Plan de una página o figura | `shape` → `dataviz` (forma y color) → **`charts-graphs`** (capas y resumen) |
| Tokens y temas | **`better-colors`** (medir cada par en los dos temas) + **`modern-css`** (`light-dark()`, `color-scheme`) |
| Tipografía | **`better-typography`** + `typeset`, más las reglas españolas de abajo |
| Construir en Astro | **`astro-framework`** (rutas `[lang]`, colecciones, `<script>` sin islas) + **`modern-css`** |
| Nota emergente, pestañas y teclado | **`tooltips`** + **`better-accessibility`** (roving tabindex, APG) + **`emil-design-eng`** (tiempos y origen) |
| Movimiento | **`emil-design-eng`** (si hay que animar) → **`modern-css`** (transiciones entre páginas, animación con el scroll) → `quieter` si sobra |
| Crítica de diseño | `critique` → `bolder` o `quieter` → lista de calibración de §4 |
| Auditoría antes de cada puerta | `audit` + **`better-accessibility`** + **`charts-graphs`** (Definition of Done) + Chartability; `chrome-devtools-mcp:a11y-debugging` y Lighthouse con el navegador |
| Pulido final | `polish` + **`better-typography`** (tabla Block/Approve) + **`emil-design-eng`** (tabla Antes/Después) |

**Reglas españolas que no trae ninguna skill** (van en el CSS global):
- `:lang(es) q { quotes: "«" "»" "“" "”" "‘" "’"; }` y `:lang(en) q { quotes: "“" "”" "‘" "’"; }`.
- Espacio de no separación en `10 %`, `art. 26` y `EE. UU.`.
- Espacio fino en los millares solo desde cinco cifras (107 551), nunca en años.
- La raya de inciso no debe quedar sola a final de línea.
- Cifras `oldstyle-nums proportional-nums` en la prosa de EB Garamond y `lining-nums tabular-nums` en tablas, ejes y notas emergentes.
- Versalitas reales en las siglas: `font-variant-caps: all-small-caps; letter-spacing: .05em` (CEDA, PSOE, ERC).

## 4. Recursos web y qué aplicar en cada sitio

| recurso | idea concreta | dónde |
|---|---|---|
| OWID, rediseño de Grapher · https://ourworldindata.org/redesigning-our-interactive-data-visualizations | Anatomía fija: pestañas de vista arriba a la izquierda, controles arriba a la derecha, descargas abajo a la derecha y un enlace «Más sobre estos datos» con fuente y cita | Contrato común de todas las figuras |
| GOV.UK Tabs · https://design-system.service.gov.uk/components/tabs/ y APG Tabs · https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ | Sin JS, Gráfico, Tabla y Datos son secciones apiladas con un índice de anclas. El JS las convierte en pestañas con flechas y conserva el hash, para enlazar directamente a una pestaña | Todas las figuras |
| WCAG 1.4.13 · https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html | La nota emergente se puede cerrar, recorrer con el puntero y no desaparece sola; también aparece con el foco | F01, F26, F05, F09, F21 |
| Roselli, ARIA grid como antipatrón · https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html | F01 como `<table>` real por año o mes con enlaces, que funciona sin JS. Las flechas son una mejora progresiva con una sola parada de tabulación, nunca `role="grid"` | Calendario F01 y F01e (Inicio, Las Cortes, fichas) |
| Data Navigator (Elavsky) · https://www.frank.computer/data-navigator/ | Especificación del teclado: ←/→ día, ↑/↓ semana, AvPág/RePág mes, Intro abre. En las redes, de un nodo a sus vecinos | F01; F21 (Afinidades) |
| Chartability · https://chartability.fizz.studio/ | Auditoría rápida de 14 pruebas por tipo de figura antes de cada puerta: color nunca como única pista y marcas a 3:1 en los dos temas | Todas, empezando por F01 y F26 |
| Fossheim, elecciones noruegas 2023 · https://fossheim.io/writing/posts/dataviz-accessibility-review-norwegian-elections-2023/ | Hemiciclo: primero los totales por grupo, no escaño a escaño; partido y voto nombrados con texto; tabla equivalente | Hemiciclo H y F26 (Inicio, Sesiones, puertas) |
| Voteview · https://voteview.com/ | Un punto por diputado con su voto; forma o trama para la abstención y la ausencia; tabla buscable y CSV | F26 en la 0.2 (nombres) |
| Datawrapper, modo oscuro · https://www.datawrapper.de/blog/dark-mode-for-embedded-visualizations | Tokens de gráfico propios de cada tema (rejilla, texto, series), recalculados por contraste; el oro y el crema se ajustan a mano | Tokens de figura; tema claro |
| The Pudding · https://pudding.cool/process/how-to-make-dope-shit-part-2/ | Cada figura abre con una pregunta en cursiva de Cormorant y una respuesta de una línea: la historia antes que el dato | Fichas de figura; El Diario (F27, F28) |
| FT Visual Vocabulary · https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary | Elegir la forma por la relación: parte del todo (hemiciclo o gofre), desviación (divergentes), tiempo (líneas), flujo o red | F07, F10/F11, F12, F18, F22 |
| Rutter, *Web Typography* · https://book.webtypography.net/ ; RAE, comillas · https://www.rae.es/ortograf%C3%ADa/las-comillas | Cifras por contexto y comillas por lengua (§3); tablas alineadas a la derecha, con una sola regla bajo la cabecera | Datos (F32–F35), Versiones (F25, F18) |
| Wakamai Fondue · https://wakamaifondue.com | Comprobar en los woff2 servidos que existen `onum`, `smcp` y `c2sc` antes de escribir el CSS; lo que falta se ignora sin avisar | Fuentes (una vez) |
| Astro, fuentes · https://docs.astro.build/en/guides/fonts/ y web.dev `size-adjust` · https://web.dev/articles/css-size-adjust | Tres familias autoalojadas, `latin` y `latin-ext` (ŀ catalana), fuentes de respaldo con métricas ajustadas y precarga solo de la cursiva de la portada | Layout base; LCP del Inicio |
| Chrome, transiciones entre documentos · https://developer.chrome.com/docs/web-platform/view-transitions/cross-document ; Bramus · https://scroll-driven-animations.style/ | `view-transition-name` compartido en el título y el hemiciclo al cambiar ES↔EN; `animation-range` para la entrada de los escaños; contenido visible por defecto (Firefox y sin JS) | Inicio, selector de lengua |
| Historic Hansard · https://api.parliament.uk/historic-hansard/index.html | Direcciones estables y legibles: cada celda del calendario enlaza a un destino fijo (puerta o ancla con la fecha) | F01, rutas `/cortes/` |
| Lista de calibración de anthropics/frontend-design · https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md | La identidad ya fija el casi negro con un acento, los filetes y la mono. No añadir sobre ella los otros tics: rótulos en VERSALES sobre cada título, «→» en los enlaces, «01 / 02» sin secuencia, una palabra resaltada en el titular. La audacia, en un solo sitio: el hemiciclo | `critique` y `polish` de cada página |
