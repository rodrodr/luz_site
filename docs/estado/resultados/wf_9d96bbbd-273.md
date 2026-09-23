# recursos-diseno-lyt (wf_9d96bbbd-273) · 6 resultados · 23-09 03:02

## Resultado 1

**Dominio: diseño de interfaz y dirección de arte editorial. Búsqueda cerrada en unos 11 minutos. No se ha instalado nada.**

Hay dos límites en lo que pude comprobar:
- **Estrellas:** la API de GitHub se quedó sin cuota a mitad del trabajo. Para `emilkowalski/skills` no tengo ni las estrellas ni las instalaciones. Las demás cifras son las de `npx skills find` y la API de GitHub.
- **Ficheros revisados:** vi la lista de ficheros de cada skill en su página de GitHub. Los SKILL.md que cito los leí enteros o por secciones, y busqué en ellos patrones de red y de credenciales.

## (1) Skills

**1. jakubkrehel/skills@better-typography: INSTALAR**
- **Datos:** 22,7 K instalaciones; el repositorio tiene 7.013 estrellas. El autor es Jakub Krehel, ingeniero de diseño conocido.
- **Qué aporta a este sitio:**
  - Números tabulares (`font-variant-numeric: tabular-nums`) en todas las cifras que cambian: recuentos de votos, las 755 sesiones, los ejes.
  - `text-wrap: balance` en los titulares de Cormorant y `pretty` en las entradillas, pero nunca en el texto largo de EB Garamond.
  - Líneas de 60 a 75 caracteres.
  - Cargar la cursiva real de Cormorant en lugar de que el navegador la simule (`font-synthesis`).
  - Subrayados que usan las medidas de la propia fuente (`from-font`) para los enlaces a los diarios.
  - `lang` es/en, que da las comillas y la partición de palabras correctas.
  - Raya corta (–) en los rangos de años, como 1931–1945.
  - Cierra con una tabla de fallos por gravedad y un veredicto Block/Approve.
- **Solapamiento:** parcial con `typeset` de impeccable, pero esta es más concreta y más fácil de comprobar punto por punto.
- **Seguridad: LIMPIA.** Solo contiene SKILL.md, cinco .md de referencia y un `agents/openai.yaml` de metadatos. No trae scripts ni hace peticiones de red.

**2. anthropics/skills@frontend-design (la versión actual): INSTALAR, pero úsala como lista de control, no para generar diseño**
- **Datos:** 912,5 K instalaciones; 177.647 estrellas. Es la versión oficial de Anthropic.
- **Qué aporta:** la versión actual añade una lista de los rasgos por defecto del diseño hecho con IA. Coincide peligrosamente con la identidad ya fijada para el sitio:
  - fondo casi negro con un único acento de color;
  - filetes finos al estilo de un periódico;
  - fuente monoespaciada en las etiquetas de datos;
  - cadenas del tipo «A · B · C», que es justo como están nombradas las pestañas «Gráfico·Tabla·Datos».

  La propia skill dice que lo que fija el encargo prevalece. Aun así, la lista sirve para no convertir la fuente mono, los puntos medios y el oro en muletillas. Su regla central encaja aquí: poner toda la audacia en un solo sitio (el hemiciclo de la portada) y mantener el resto sobrio.
- **Solapamiento:** alto con `impeccable:frontend-design`, que viene de este mismo original. Pero en la copia instalada la lista de rasgos por defecto no aparece: busqué sus términos y hubo 0 coincidencias.
- **Seguridad: LIMPIA.** Solo SKILL.md y LICENSE.txt.

**3. emilkowalski/skills@emil-design-eng: INSTALAR (opcional)**
- **Datos:** no pude verificar ni las instalaciones ni las estrellas. El autor es Emil Kowalski (Sonner, Vaul, animations.dev), una referencia en ingeniería de diseño.
- **Qué aporta:** reglas que se aplican directamente a la nota emergente del calendario y de las votaciones:
  - las notas emergentes esperan un momento antes de aparecer, pero en cuanto una está abierta, las contiguas se abren al instante;
  - las ventanas emergentes salen desde el punto que las abre;
  - las entradas se animan con `@starting-style`;
  - solo se animan `transform` y `opacity`, con la Web Animations API y respetando la preferencia de movimiento reducido.

  Lo que trata de React, arrastre y muelles no hace falta aquí.
- **Solapamiento:** parcial con `impeccable:animate` y con las skills de GSAP. Esta cubre mejor el detalle fino de la interacción.
- **Seguridad: LIMPIA.** Solo un SKILL.md de 674 líneas. Contiene enlaces de documentación (easing.dev, easings.co) y ninguna orden de red.

**4. jakubkrehel/skills@better-accessibility: INSTALAR (opcional)**
- **Datos:** 18,9 K instalaciones; mismo repositorio de 7.013 estrellas.
- **Qué aporta:**
  - comprobar el anillo de foco contra cada color que atraviesa, lo que importa con el oro sobre casi negro y otra vez en el tema claro;
  - `:focus-visible` y un anillo de al menos 2 px;
  - pestañas y figuras que siguen los patrones de W3C (ARIA APG), con flechas del teclado y un solo elemento activo en el orden de tabulación;
  - zonas pulsables de 24 px como mínimo (44 px en táctil).
- **Solapamiento:** con `impeccable:audit` y `web-design-guidelines`. Añade la revisión «dos recorridos», primero solo con teclado y luego con lector de pantalla.
- **Seguridad: LIMPIA.** Solo markdown.

**Descartadas (no instalar):**
- **bergside/awesome-design-skills@editorial:** plantilla genérica de typeui con Gelasio y tokens #111. No aporta nada.
- **wondelai/skills@web-typography:** resumen de libros con enlaces de afiliado de Amazon. Queda cubierta por la número 1.
- **ibelick/ui-skills@baseline-ui:** empuja hacia Tailwind y Base UI (React), que no encaja con Astro sin framework de cliente.
- **rampstackco@art-direction:** orientada a marca y marketing.
- **addyosmani/web-quality-skills@accessibility** (55,1 K): orientada a Lighthouse y sugiere `npm install -g axe`. Se solapa con `audit`.

## (2) Recursos web

1. **Our World in Data, rediseño de sus gráficos interactivos (Grapher)**: https://ourworldindata.org/redesigning-our-interactive-data-visualizations
   Es el modelo exacto para Gráfico·Tabla·Datos. Anatomía que se puede copiar para todas las figuras:
   - las pestañas de vista arriba a la izquierda y los controles de cada vista arriba a la derecha;
   - la descarga (SVG/PNG/CSV) abajo a la derecha;
   - un enlace del tipo «Más sobre estos datos» que abre la fuente y la cita.

   Además, sin JS la tabla debería ser lo que se muestra por defecto.
2. **Historic Hansard 1803–2005**: https://api.parliament.uk/historic-hansard/index.html
   Es la referencia de navegación de un corpus parlamentario histórico: década → año → mes → día → sesión, con direcciones legibles y permanentes, y un índice de personas. Idea: que cada celda del calendario de 755 sesiones sea un enlace real a una dirección estable (por ejemplo, `/sesiones/1936/03/10`), y que cada diputado tenga su ficha con todas sus intervenciones.
3. **Datawrapper, modo oscuro**: https://www.datawrapper.de/blog/dark-mode-for-embedded-visualizations y **guía de color para libros de estilo**: https://www.datawrapper.de/blog/colors-for-data-vis-style-guides
   En modo oscuro, los colores de las líneas de rejilla, los textos, las leyendas y las series se vuelven a calcular por contraste, no se invierten. Confirma lo que ya está decidido para el tema claro: las atenuaciones no se trasladan de un tema a otro, así que hay que definir tokens de gráfico propios para cada tema.
4. **The Pudding, «Making Internet Things, Part 2: Design»**: https://pudding.cool/process/how-to-make-dope-shit-part-2/ y el análisis de Storybench sobre cómo estructuran sus ensayos visuales: https://www.storybench.org/pudding-structures-stories-visual-essays/
   Cada gráfico responde a una pregunta y lleva el texto al lado. Encaja con la preferencia del investigador por la historia antes que el gráfico: que cada figura se abra con una pregunta en cursiva de Cormorant y una respuesta de una sola línea.
5. **Reuters Graphics, Graphics Kit y componentes**: https://reuters-graphics.github.io/docs_graphics-kit/ (y https://github.com/reuters-graphics)
   Aplicar su sistema de figuras de redacción: titular, texto explicativo, gráfico, nota y fuente como un bloque fijo que se repite, con anotaciones sobre el propio gráfico en lugar de leyendas aparte. Aviso: solo comprobé los resultados de búsqueda, no leí la documentación a fondo.

Las copias descargadas de los SKILL.md revisados están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/ui/` (ficheros `sk_*.md`).

Fuentes: [skills.sh](https://skills.sh/), [jakubkrehel/skills](https://github.com/jakubkrehel/skills), [anthropics/skills](https://github.com/anthropics/skills), [emilkowalski/skills](https://github.com/emilkowalski/skills), [OWID](https://ourworldindata.org/redesigning-our-interactive-data-visualizations), [Historic Hansard](https://api.parliament.uk/historic-hansard/index.html), [Datawrapper modo oscuro](https://www.datawrapper.de/blog/dark-mode-for-embedded-visualizations), [Datawrapper colores](https://www.datawrapper.de/blog/colors-for-data-vis-style-guides), [The Pudding](https://pudding.cool/process/how-to-make-dope-shit-part-2/), [Storybench](https://www.storybench.org/pudding-structures-stories-visual-essays/), [Reuters Graphics Kit](https://reuters-graphics.github.io/docs_graphics-kit/)

## Resultado 2

**Accesibilidad y calidad web para el sitio de Luz y Taquígrafos: skills y referencias**

He leído todo el contenido de las skills evaluadas. Descargué cada repositorio como tarball; en esta máquina `git` falla por un problema de xcrun. No he instalado nada.

## 1. Skills

**A. jakubkrehel/skills@better-accessibility, junto con su complemento better-colors del mismo repositorio.** Recomendación: **INSTALAR** las dos.
- **Uso:** 18,9K instalaciones. El repositorio tiene 7.013 estrellas, licencia MIT y se actualizó el 29-08-2026. No medí las instalaciones de better-colors.
- **Qué aporta a este sitio:**
  - Da valores exactos, no consejos genéricos. El anillo de foco usa `:focus-visible` con un perímetro de al menos 2px. Hay que comprobarlo contra cada color que toca: el oro sobre casi negro y sobre crema, y también en modo `forced-colors`.
  - Propone "roving tabindex" para los widgets compuestos: el calendario de 755 sesiones sería una sola parada de tabulación y se recorre con flechas.
  - Para anunciar la nota emergente y los cambios de pestaña, pide una región viva estable y educada (polite).
  - Las zonas de clic miden 24×24 (nivel AA), ampliables con un pseudo-elemento. Sirve para las celdas diminutas y los puntos de las votaciones.
  - El movimiento se activa solo por elección del usuario (patrón opt-in con `prefers-reduced-motion`). El contenido debe reorganizarse sin romperse a 320px de ancho.
  - Informa con severidad HIGH, MEDIUM o LOW, un veredicto Block/Approve y marca como "Not verified" lo que no pudo comprobar.
  - better-colors (contrast.md) mide cada par de colores con APCA y con WCAG 2 "en cada apariencia": un par que pasa en el tema claro puede fallar en el oscuro. Es justo el problema de tener dos temas.
- **Solapamiento:** parcial con impeccable/audit, que puntúa la accesibilidad de 0 a 4 de forma superficial, y con web-design-guidelines. Esta skill va más a fondo.
- **Seguridad:** solo Markdown y `agents/openai.yaml`. No trae scripts, no pide red ni credenciales y no tiene instrucciones sospechosas. **Segura.**

**B. addyosmani/web-quality-skills@accessibility.** Recomendación: **INSTALAR**, como lista de control de conformidad.
- **Uso:** 55,1K instalaciones. El repositorio tiene 2.822 estrellas, licencia MIT y se actualizó el 24-08-2026.
- **Qué aporta:** recorre WCAG 2.2 criterio a criterio:
  - 2.4.11, foco no tapado: importa porque la cabecera es fija.
  - 2.5.7, alternativa al arrastre: afecta a las redes de coautoría si se pueden arrastrar.
  - 2.5.8, tamaño del objetivo.
  - 3.2.6, ayuda consistente.

  Además sigue un flujo basado en pruebas con `lighthouse_audit` y `take_snapshot` del plugin chrome-devtools-mcp, que ya está instalado. Sirve para redactar la declaración de accesibilidad si el sitio se publica bajo la USAL (el RD 1112/2018 exige WCAG AA).
- **Limitación:** no trata gráficos ni SVG.
- **Solapamiento:** alto con A y con chrome-devtools-mcp:a11y-debugging, ya instalado.
- **Seguridad:** SKILL.md de 464 líneas y solo enlaces a w3.org. **Segura.**

**C. addyosmani/web-quality-skills@core-web-vitals.** Recomendación: **INSTALAR** core-web-vitals. La hermana @performance es opcional y web-quality-audit no hace falta.
- **Uso:** core-web-vitals 27K instalaciones; @performance 36,3K; web-quality-audit 27,7K. Mismo repositorio.
- **Qué aporta:**
  - El LCP (el elemento grande que tarda en pintarse) probablemente será el titular en Cormorant de la portada, así que depende de cómo cargue la fuente.
  - El CLS (saltos de maquetación) viene de fuentes de sustitución con otras métricas.
  - El INP (retraso al interactuar) se juega en las notas emergentes sobre 755 celdas: un único listener delegado.
  - Explica la precarga de la página siguiente con Speculation Rules y las View Transitions entre páginas de Astro, que deben respetar el movimiento reducido.
- **Limitación:** sus recetas por framework son para Next, React y Vue, no para Astro.
- **Solapamiento:** impeccable/optimize, gsap-performance y chrome-devtools-mcp:debug-optimize-lcp (ya instalado).
- **Seguridad:** el script `web-quality-audit/scripts/analyze.sh` solo lee: usa grep y jq, sin red y sin escribir archivos. **Segura.**

**D. community-access/accessibility-agents@data-visualization-accessibility.** Recomendación: **NO instalar.** Usar Chartability en su lugar.
- **Uso:** 133 instalaciones. El repositorio tiene 413 estrellas y licencia MIT.
- **Por qué no:** es la única skill específica de gráficos que encontré, pero es un esbozo de 38 líneas. Depende de un "router" `a11y-core`, solo devuelve JSON y está marcada `disable-model-invocation`. Además recomienda `role="application"` para los gráficos interactivos, lo que anula la navegación normal del lector de pantalla. Esa práctica va en contra de Chartability y de Watson.
- **Seguridad:** sin scripts en esa skill. Segura, pero no aporta.

**Descartada: ibelick/ui-skills@fixing-accessibility.** Tiene 18,9K instalaciones, 8.916 estrellas y es segura (solo Markdown), pero son 135 líneas de reglas que ya cubre A.

## 2. Recursos web

1. **Chartability (Frank Elavsky)**, https://chartability.fizz.studio/ y su cuaderno de auditoría en https://github.com/Chartability/POUR-CAF.
   - **Qué aplicar:** pasar la auditoría rápida de 14 pruebas (de 20 a 40 minutos) a cada tipo de figura antes del lanzamiento: calendario, votaciones, barras, líneas y red.
   - Las pruebas clave aquí:
     - Los colores de partido nunca pueden ser la única pista: añadir forma o etiqueta.
     - Las marcas del gráfico necesitan contraste de 3:1 contra el fondo en ambos temas.
     - La nota emergente tiene que ser accesible sin ratón.
     - Los datos se tienen que poder descargar: eso ya lo resuelve la pestaña Datos.

2. **Adrian Roselli, "ARIA Grid As an Anti-Pattern"**, https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html, y **"WHCM and System Colors"**, https://adrianroselli.com/2021/02/whcm-and-system-colors.html.
   - **Qué aplicar:** el calendario de 755 sesiones no debe usar `role="grid"`. Mejor una `<table>` real por año o mes, con un enlace por sesión, que funciona sin JS; las flechas se añaden como mejora progresiva.
   - En alto contraste de Windows, las marcas del SVG deben seguir distinguiéndose. Usar colores del sistema (`CanvasText`, `Highlight`) y aplicar `forced-color-adjust: none` solo donde se haya comprobado.

3. **GOV.UK Design System, componente Tabs**, https://design-system.service.gov.uk/components/tabs/, con el **patrón Tabs de las APG del W3C**, https://www.w3.org/WAI/ARIA/apg/patterns/tabs/.
   - **Qué aplicar:** sin JS, Gráfico, Tabla y Datos son tres secciones apiladas con un índice de enlaces por ancla. El JS las convierte en pestañas navegables con flechas y activación, sin perder el hash para poder compartir enlaces directos a una pestaña.

4. **W3C WAI, Understanding WCAG 2.2 1.4.13 "Content on Hover or Focus"**, https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html, y el **tutorial "Complex Images"**, https://www.w3.org/WAI/tutorials/images/complex/.
   - **Qué aplicar:** la nota emergente debe cerrarse con Esc sin mover el foco, permitir llevar el puntero encima de ella sin que desaparezca, mantenerse visible y aparecer también al recibir el foco del teclado.
   - Cada SVG lleva `role="img"` con un resumen corto que describa la tendencia y un enlace a la pestaña Tabla. Así no hay que duplicar cientos de puntos enfocables.

5. **Léonie Watson, "Accessible SVG line graphs"**, https://tink.uk/accessible-svg-line-graphs/, junto con **Sarah Fossheim**, https://fossheim.io/writing/posts/accessible-dataviz-design/. Como idea de fondo, **Olli (MIT)**: https://mitvis.github.io/olli/.
   - **Qué aplicar:** para las barras y las líneas pequeñas, el propio SVG puede exponer semántica de tabla.
   - De Olli, adoptar la jerarquía navegable (legislatura, año, mes, sesión) como listas anidadas para el calendario y la red, sin usar la librería.

6. **Rendimiento de las fuentes: Astro Fonts API**, https://docs.astro.build/en/guides/fonts/, y **web.dev "CSS size-adjust"**, https://web.dev/articles/css-size-adjust.
   - **Qué aplicar:** alojar Cormorant Garamond, EB Garamond y JetBrains Mono en el propio sitio, con subconjuntos latin y latin-ext.
   - Precargar solo la cursiva de display del titular de la portada.
   - Generar fuentes de sustitución con métricas ajustadas mediante `size-adjust`. El ojo medio de Cormorant difiere mucho de Georgia, y sin ese ajuste la página salta al cargar la fuente (CLS).
   - Para la verificación: pasar **axe-core (Deque)**, https://github.com/dequelabs/axe-core, con Playwright sobre todas las páginas generadas, en ES y EN, con los temas claro y oscuro y con el movimiento reducido emulado. Un resultado automático limpio no equivale a conformidad WCAG.

Los repositorios descargados y los resultados de búsqueda están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/`.

## Resultado 3

**Resultado: dominio Astro y movimiento sin librerías**

## (1) Skills: cuáles instalar y cuáles no

**A. `delineas/astro-framework-agents@astro-framework`: instalar (1ª prioridad)**
- **Popularidad:** 2.000 instalaciones, 44 estrellas. Es de un autor individual, así que su reputación es moderada; el contenido lo leí entero.
- **Qué aporta a este sitio:** es la única skill de Astro con material de fondo, unos 122 KB para Astro 5/6. Cubre:
  - rutas ES/EN (`prefixDefaultLocale`, idioma de respaldo, `getRelativeLocaleUrl`, colecciones por idioma);
  - imágenes con `astro:assets`;
  - las directivas `client:*`, útiles para no tener islas: un `.astro` con un `<script>` puro;
  - colecciones de contenido para las 755 sesiones.
- **Aviso:** su guía de transiciones de página usa `<ClientRouter />`. Aquí no conviene (ver la regla más abajo).
- **Solapamiento:** ninguno con lo ya instalado.
- **Seguridad:** OK. Solo hay Markdown, sin scripts. Las apariciones de «token» están en ejemplos de middleware.

**B. `paulirish/dotfiles@modern-css`: instalar (2ª prioridad), solo esa skill del repo**
- **Popularidad:** 526 instalaciones. Las estrellas no las verifiqué porque la API de GitHub me cortó por límite de peticiones. El autor es Paul Irish (Chrome DevRel), fuente de primera.
- **Qué aporta:** la referencia de CSS actual más completa sobre lo que este sitio necesita:
  - animaciones ligadas al scroll con `animation-timeline: view()/scroll()` y `animation-range`;
  - transiciones nativas entre páginas con `@view-transition { navigation: auto }` y `view-transition-class`;
  - curvas de aceleración con `linear()` y `@starting-style`;
  - `light-dark()` y `color-scheme` para el tema claro;
  - `text-wrap: balance/pretty` y `text-box-trim` para la cursiva de display;
  - anchor positioning y popover, que sirven para la nota emergente de las figuras.
- **Solapamiento:** parcial con impeccable (animate, typeset), pero esta skill da la API concreta y su estado de soporte.
- **Seguridad:** OK. Son dos `.md` (15 KB y 19 KB, uno es el guion de una charla de Adam Argyle), sin scripts. El repo trae otras skills (google-ai-search, fetch-as-markdown…) que no hay que instalar.

**C. `addyosmani/web-quality-skills@performance` (+ `@core-web-vitals`): instalar `performance`; `core-web-vitals` es opcional**
- **Popularidad:** 36.300 y 27.000 instalaciones, 2.822 estrellas.
- **Qué aporta:**
  - presupuesto de rendimiento;
  - el hemiciclo SVG como elemento de mayor pintado (LCP);
  - las tres serif sin saltos de maquetación, con `size-adjust` y precarga solo de la de display;
  - respuesta al clic en el calendario de 755 celdas con un único manejador de eventos;
  - caché de recursos con hash.
- **Solapamiento:** medio con impeccable:optimize/audit y chrome-devtools-mcp:debug-optimize-lcp. Los «arreglos rápidos por framework» cubren Next, React y Vue, no Astro.
- **Seguridad:** OK. `analyze.sh` solo lee: usa `grep` y `jq`, no toca la red ni escribe nada.

**D. `kylezantos/design-motion-principles`: opcional, baja prioridad**
- **Popularidad:** 9.900 instalaciones, 1.120 estrellas.
- **Qué aporta:**
  - **filtro de frecuencia:** no animar lo que se usa a cada rato, como la nota emergente, las pestañas o el calendario;
  - **dos criterios de dosificación:** contención para las figuras y pulido fino para la portada;
  - **modo auditoría:** detecta movimiento genérico de plantilla.
- **Solapamiento:** alto con impeccable (animate, quieter, delight), y está bastante orientada a React y Framer Motion.
- **Seguridad:** OK. Solo `.md` y `.html`; las plantillas cargan Google Fonts, que es inofensivo.

**Rechazadas:**
- **`astrolicious/agent-skills@astro`** (15.600 instalaciones, pero 14 estrellas): son 4 KB genéricos sobre la línea de comandos y los adaptadores. No trata i18n, transiciones ni imágenes. Su metadata dice «Astro Team», pero el repo no es de withastro. Remite a un `llms.txt` que Astro retiró en mayo de 2026. En su lugar conviene el servidor MCP oficial de la documentación de Astro: `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp -s user`. La URL sale de la página de Astro; el comando lo escribí de memoria.
- **`incluud/astro-agent-skills`:** 10 estrellas y contenido muy escaso.
- **`PatternsDev/skills@view-transitions`:** es React SPA, de 2023, y no trata las transiciones entre páginas.
- **`heygen-com/hyperframes@css-animations/waapi`:** es para composiciones de vídeo y ya está cubierta por hyperframes.
- **`vercel-react-view-transitions`:** es para React.
- **`iart-ai/*`:** 27 estrellas.

**Regla de arquitectura que sale de todo esto:**
- Usar transiciones nativas entre documentos con `@view-transition { navigation: auto }` dentro de `@media (prefers-reduced-motion: no-preference)`, y **no** `<ClientRouter />`.
- El motivo: el router de Astro intercepta la navegación y los scripts empaquetados se ejecutan una sola vez. Habría que reengancharlos a `astro:page-load` en cada figura (nota emergente, pestañas, teclado). Además va en contra de «sin framework de cliente».
- Las animaciones ligadas al scroll van dentro de `@supports (animation-timeline: view())`. El contenido tiene que ser visible por defecto, para que funcione en Firefox y sin JS.

**Comando no interactivo (documentado en el README del CLI, línea 111):**
```
DISABLE_TELEMETRY=1 npx -y skills add <owner/repo> --skill <nombre> -g -a claude-code -y </dev/null
```
- **Por qué fallaba:**
  - Sin el primer `-y`, npm pregunta si puede instalar el paquete y, sin terminal interactiva, aborta con «canceled».
  - Sin `--skill` y sin `-a claude-code`, el CLI abre selectores múltiples de skill y de agente.
  - `-y` salta la confirmación final.
- **Opcional:** `--copy` copia archivos reales en `~/.claude/skills` en lugar de enlaces simbólicos. Para comprobar la instalación: `npx -y skills ls -g -a claude-code`.
- **No lo probé**, porque en esta fase la consigna era no instalar nada.
- **Ejemplos:**
  - `DISABLE_TELEMETRY=1 npx -y skills add delineas/astro-framework-agents --skill astro-framework -g -a claude-code -y </dev/null`
  - `DISABLE_TELEMETRY=1 npx -y skills add paulirish/dotfiles --skill modern-css -g -a claude-code -y </dev/null`
  - `DISABLE_TELEMETRY=1 npx -y skills add addyosmani/web-quality-skills --skill performance -g -a claude-code -y </dev/null`

## (2) Recursos web

1. **Transiciones entre documentos (Chrome):** https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
   - **Qué aplicar:**
     - `@view-transition` con `types` para distinguir sesión anterior y siguiente;
     - los eventos `pageswap`/`pagereveal`;
     - `<link rel="expect" blocking="render">`, para que el hemiciclo no parpadee;
     - un `view-transition-name` compartido en el título y el hemiciclo, para que se transformen al cambiar ES↔EN.
   - **Soporte:** Chrome 126+ y Safari 18.2+. Firefox, según esa página, todavía no; allí la navegación es normal.
2. **Guía de transiciones de Astro:** https://docs.astro.build/en/guides/view-transitions/
   - Confirma que las transiciones nativas funcionan en un sitio multipágina sin JS extra, y documenta los problemas de reejecución de scripts que trae `ClientRouter`.
3. **Animaciones ligadas al scroll (Bramus):** https://scroll-driven-animations.style/
   - El visualizador de rangos de `view-timeline` sirve para ajustar `animation-range`.
   - **Qué aplicar:** entrada de los escaños del hemiciclo al hacer scroll, barra de progreso de lectura con `scroll(root)`, y cabecera que se encoge.
4. **Fuentes en Astro:** https://docs.astro.build/en/guides/fonts/
   - Autoalojar Cormorant Garamond, EB Garamond y JetBrains Mono, con fuentes de respaldo de métricas ajustadas generadas por Astro.
   - Hacer `preload` solo de la cursiva de display que aparece sin hacer scroll.
5. **i18n en Astro y su servidor MCP:** https://docs.astro.build/en/guides/internationalization/ y https://docs.astro.build/en/guides/build-with-ai/
   - **Configuración:** `defaultLocale: 'es'`, `locales: ['es','en']`, `prefixDefaultLocale: false`.
   - **Etiquetas y selector:** `hreflang` y selector de idioma que conserva la página actual, con `getRelativeLocaleUrl`.
   - **Documentación al día:** el MCP para consultar la versión vigente (Astro 6).
6. **Contexto sobre el `llms.txt` de Astro:** https://dacharycarey.com/2026/05/04/astro-removed-llms-txt/
   - Explica por qué no conviene fiarse de skills que apuntan a `llms.txt`.

Los archivos leídos quedan en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/repos/` y `.../scratchpad/sk/`.

## Resultado 4

**Visualización de datos interactiva (SVG/D3 accesible y periodística): skills y recursos para Luz y Taquígrafos**

No he instalado nada. Leí todos los SKILL.md de las candidatas, y también los scripts cuando los traían. Las copias están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/dv/`.

Una comparación previa. En esta sesión ya está disponible la skill integrada `dataviz`. No está en ~/.claude/skills, pero cubre la elección de la forma del gráfico, una fórmula de color con validador, la especificación de las marcas, la interacción y el funcionamiento en tema claro y oscuro. Es la base. Por eso solo propongo lo que añade algo encima de ella.

## (1) Skills

**1. mgifford/accessibility-skills@charts-graphs** (126 instalaciones; repo con 49 estrellas). Acompañantes: @tooltips y @svg (125 instalaciones).
- **Fuente:** Mike Gifford, referente reconocido en accesibilidad web (mantenedor de accesibilidad del núcleo de Drupal). Pocas estrellas, pero es un autor de reputación.
- **Qué aporta a este sitio:**
  - **Modelo por capas:** título, contexto, resumen visible, datos estructurados y fuente. Encaja con las pestañas Gráfico·Tabla·Datos.
  - **Qué evitar:**
    - Prohíbe un error habitual: poner `role="img"` en la raíz del SVG y `role="listitem"` en sus hijos. El lector de pantalla los ignora.
    - Prohíbe meter en el orden del tabulador cada uno de los 755 días del calendario. La alternativa es una sola parada de tabulador con navegación por flechas.
    - Prohíbe que la descripción larga viva solo en `aria-describedby`: debe ser visible.
  - **Nota emergente:** cumple WCAG 1.4.13. Se abre al pasar el ratón y al recibir el foco, se cierra con Esc, se puede recorrer con el puntero y no desaparece sola. No debe usar `aria-hidden` si alguien la referencia.
  - **Otras comprobaciones:**
    - Modo de colores forzados (`forced-colors`).
    - Reflujo a 320 px y a 400 % de zoom.
    - Tamaño mínimo de objetivo táctil: invisible y mayor que el punto visible.
    - Estado de actualización con `role="status"`.
  - La skill @svg añade el saneamiento de SVG y el orden del DOM.
- **Solapamiento:** impeccable audit y web-design-guidelines son generales. `dataviz` trata la interacción con menos detalle de WCAG. Esta skill es la que más añade.
- **Seguridad:** apta. Solo contiene SKILL.md y SYNC.md en Markdown, sin scripts ni llamadas de red. Busqué inyecciones y credenciales y no encontré nada.
- **Recomendación:** instalar charts-graphs y tooltips; svg es opcional. Salvedad: su paleta Okabe-Ito sirve solo para comprobar el daltonismo, no para sustituir los colores de Luz y Taquígrafos.

**2. caylent/tufte-data-viz@tufte-data-viz** (275 instalaciones; 221 estrellas; organización Caylent).
- **Qué aporta a este sitio:**
  - Etiquetas de datos en serif, que encaja con EB Garamond.
  - Etiquetado directo en lugar de leyenda.
  - Ejes que abarcan solo el rango de los datos.
  - Anotar lo notable sobre el propio gráfico. Por ejemplo, julio de 1936 o las Cortes en el exilio.
  - Títulos que afirman el hallazgo.
  - Pequeños múltiplos con la misma escala y sin marcos.
  - Minigráficos dentro de las tablas.
  - Movimiento de 200 a 500 ms que respeta `prefers-reduced-motion`.
  - Tema oscuro diseñado aparte, no invertido.
  - Los archivos `rules/svg-html.md` y `rules/small-multiples-sparklines.md` son aplicables tal cual.
- **Solapamiento:** parcial con `dataviz` y con scientific-visualization, que es para matplotlib. La mitad de sus reglas son para Recharts, ECharts y otras librerías, y aquí no sirven.
- **Seguridad:** apta. Declara `allowed-tools: Read, Glob, Grep`. Su único script, `_docs/generate_showcase.py`, usa matplotlib y PIL en local, sin red, y la skill no lo invoca.
- **Recomendación:** instalar con una instrucción explícita: los tokens del sitio mandan sobre su paleta fija (#fffff8, #151515, gris con acento #e41a1c). Además, en las tablas conviene `tabular-nums` en lugar de sus cifras de estilo antiguo (`onum`).

**3. Community-Access/accessibility-agents@kb-data-visualization-accessibility** (133 instalaciones; 413 estrellas).
- **Seguridad:** apta, solo Markdown.
- **Recomendación:** no instalar. Propone `role="application"`, `tabindex=0` en cada barra y elementos de lista dentro del SVG, justo lo que mgifford marca como fallos. Además devuelve resultados en JSON pensados para su propio sistema de agentes. Solo merece la pena su tabla de teclado (Inicio/Fin, arriba/abajo para cambiar de serie).

**4. anthropics/knowledge-work-plugins@data-visualization** (12,3 mil instalaciones; 25,4 mil estrellas; oficial).
- **Seguridad:** apta. Solo Markdown.
- **Recomendación:** no instalar. Está hecha para Python (matplotlib, seaborn, plotly) y no dice nada útil de SVG ni de Astro. Duplica scientific-visualization y `dataviz`.

**5. Skills de D3.**
- **chrisvoncsefalvay/claude-d3js-skill@d3-viz** (802 instalaciones; 232 estrellas). No instalar. Es D3 genérico en el cliente. Su nota emergente solo funciona con ratón y usa `.html()` con datos. La accesibilidad es mínima, carga D3 desde d3js.org y no trata el renderizado en compilación. Seguridad apta: sin scripts.
- **nexu-io/open-design@d3-visualization** (2,8 mil instalaciones). Rechazada por seguridad: no es una skill en sí, solo indica hacer `git clone` de un repo de terceros sin revisar (jiannanya/snow-d3).
- **Descartadas por irrelevantes o endebles:** owl-listener@data-visualization y aladicf@data-viz (36 estrellas, depende de su propia frontend-design). También jamditis@data-journalism, orientada a Python y a publicar en Datawrapper con clave de la API.

**Nota técnica (ninguna skill la cubre):** conviene generar los SVG en la compilación, dentro de componentes .astro. Se usarían d3-scale, d3-shape, d3-array y d3-time para el calendario, que se basa en semanas de lunes (`utcMonday`). Para las redes, d3-force con la simulación ejecutada hasta el final y una semilla fija. Así todo funciona sin JS, y el JS queda solo para la nota emergente y el teclado.

## (2) Recursos web

1. **Chartability** (Frank Elavsky), https://chartability.fizz.studio/
   - Heurísticas de auditoría para gráficos: los cuatro principios WCAG (perceptible, operable, comprensible, robusto) más tres propios: evitar lo que compromete la comprensión, no obstaculizar las ayudas técnicas y ser flexible.
   - Idea: pasar sus pruebas críticas a cada figura antes de publicar, empezando por el calendario y las votaciones.

2. **Data Navigator**, https://www.frank.computer/data-navigator/
   - Modela la navegación por teclado y lector de pantalla como un grafo, no como una lista.
   - **Calendario:** ←/→ día, ↑/↓ semana, AvPág/RePág mes, Intro abre la sesión.
   - **Votaciones:** de grupo parlamentario a diputado.
   - **Redes de coautoría:** de un nodo a sus vecinos siguiendo las aristas.
   - Todo con una sola parada de tabulador. Funciona sin framework: sirve como especificación o como librería, pendiente de evaluar.

3. **FT Visual Vocabulary**, https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary
   - Elegir la forma por la relación que se quiere mostrar.
   - **Votación nominal:** es una parte del todo, así que hemiciclo o gofre (waffle) por grupo.
   - **Disciplina de voto:** es una desviación, así que barras divergentes.
   - **Evolución:** es cambio en el tiempo.
   - **Coautoría:** es flujo o red.

4. **Sarah L. Fossheim**, revisión de accesibilidad de los gráficos electorales noruegos de 2023: https://fossheim.io/writing/posts/dataviz-accessibility-review-norwegian-elections-2023/ (introducción con D3: https://fossheim.io/writing/posts/accessible-dataviz-d3-intro/)
   - Es exactamente el caso de los hemiciclos.
   - El lector de pantalla debe anunciar primero los totales por grupo, no escaño a escaño.
   - Partido y sentido del voto se nombran con texto, no solo con color.
   - La tabla debe ser equivalente al gráfico.

5. **Datawrapper**, tema oscuro: https://www.datawrapper.de/blog/dark-mode-for-embedded-visualizations. Accesibilidad (2025): https://www.datawrapper.de/blog/better-accessibility-for-datawrapper-visualizations
   - Mantener el mismo contraste en los dos temas ajustando la luminosidad, sin invertir. Los colores saturados, como el oro y el crema, se retocan a mano.
   - Notas emergentes accesibles por teclado.
   - Texto alternativo generado a partir de los datos.
   - Un enlace «Obtener los datos», que aquí equivale a la pestaña Datos.

6. **Voteview**, https://voteview.com/
   - La referencia para votaciones nominales: un punto por parlamentario y votación, agrupado por partido, con tabla buscable debajo y CSV descargable.
   - Aplicación: un punto por diputado en su escaño del hemiciclo. El relleno indica el voto; una forma o trama distingue abstención y ausencia; cada punto enlaza a la ficha del diputado.

Fuentes: [Chartability](https://chartability.fizz.studio/), [Data Navigator](https://www.frank.computer/data-navigator/), [FT Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary), [Fossheim, elecciones noruegas 2023](https://fossheim.io/writing/posts/dataviz-accessibility-review-norwegian-elections-2023/), [Fossheim, introducción con D3](https://fossheim.io/writing/posts/accessible-dataviz-d3-intro/), [Datawrapper, tema oscuro](https://www.datawrapper.de/blog/dark-mode-for-embedded-visualizations), [Datawrapper, accesibilidad](https://www.datawrapper.de/blog/better-accessibility-for-datawrapper-visualizations), [Voteview](https://voteview.com/), [skills.sh](https://skills.sh/)

## Resultado 5

No hay ninguna skill que cubra la ortotipografía española, y ese es el hueco que importa en este sitio. Solo propongo instalar una: `jakubkrehel/skills@better-typography`. Las otras cuatro revisadas o repiten lo que ya hay instalado o chocan con la identidad fijada. No he instalado nada.

**Cómo se hizo.** Busqué en skills.sh a través de su API, porque `npx skills find` devolvía "No skills found" por el límite de 30 peticiones por minuto. Descargué cada skill candidata a la carpeta de trabajo y leí su SKILL.md y sus referencias. En los ficheros que no leí entero busqué peticiones de red, credenciales o instrucciones de instalación.

**Qué cubre ya lo instalado.** `typeset` e `impeccable/reference/typeset.md` (unas 195 líneas en total) solo mencionan `tabular-nums`. Ninguna skill instalada trata las cifras de estilo antiguo, la puntuación colgante, `text-box`, las versalitas, los espacios finos ni las comillas latinas.

## (1) Skills de tipografía

**1. `jakubkrehel/skills@better-typography`: instalar**
- **Uso:** 22 732 instalaciones; el repositorio tiene 7 013 estrellas, 256 forks y actividad el 29 de agosto de 2026.
- **Qué aporta a este sitio:**
  - Pide cargar las caras que se usan de verdad y advierte de `font-synthesis`. Si falta el archivo de la cursiva o de un peso de Cormorant, el navegador la fabrica y deforma la portada.
  - Fija un suelo de peso: por debajo de 18 px, peso 400 o más. Las caras finas quedan para 28 px en adelante, que es justo lo que pide Cormorant Garamond, fina y de alto contraste.
  - `text-box: trim-both cap alphabetic` para centrar ópticamente las pestañas Gráfico·Tabla·Datos y las etiquetas de la nota emergente.
  - `text-wrap: balance` en los titulares y `pretty` en los pies de figura.
  - Subrayado con `from-font` y `skip-ink`.
  - `tabular-nums` en las cifras que cambian (contadores del calendario, nota emergente).
  - Prefiere las propiedades CSS a las etiquetas crudas (`font-variant-numeric` en vez de `font-feature-settings`), así sobreviven al tipo de reserva.
  - Termina con una tabla de revisión que marca "Block" o "Approve".
- **Solapamiento:** parcial con `typeset` e `impeccable`. Esta es más concreta a nivel de CSS.
- **Límites:** está pensada para interfaz de producto (chuleta de Tailwind), usa comillas inglesas y desaconseja justificar. Las reglas españolas habrá que ponerlas encima.
- **Seguridad:** son 8 ficheros, todos markdown, más un `agents/openai.yaml` de 111 bytes que solo contiene metadatos. No trae scripts, ni URLs, ni instrucciones raras. Segura.

**2. `mblode/agent-skills@typography-audit`: no instalar; copiar sus reglas**
- **Uso:** 800 instalaciones y 126 estrellas. Pasa las tres auditorías de seguridad que muestra skills.sh (Agent Trust Hub, Socket y Snyk).
- **Qué aporta:** es la más editorial de todas. Tiene 78 reglas, cada una con su ejemplo incorrecto y el correcto:
  - cifras de estilo antiguo (`onum`) en la prosa y `lnum` en la interfaz;
  - `hanging-punctuation` con alternativa `@supports`;
  - espacios finos y de pelo;
  - versalitas reales, capitulares y tamaños ópticos;
  - puntos medios, diacríticos y cuándo justificar.
- **Por qué no instalarla:** la reputación del autor queda por debajo del criterio fijado. Además aplica convenciones anglosajonas (comillas de EE. UU.) y remite a skills `ui-design` que aquí no existen.
- **Seguridad:** 80 ficheros .md más un `evals.json`, sin scripts. Leí el SKILL.md y 3 reglas enteras; en el resto no aparece nada sospechoso. Inocua, pero mejor copiar a mano 8 o 10 reglas a una skill local.

**3. `bencium/bencium-marketplace@ui-typography` (Butterick destilado): no instalar**
- **Uso:** unas 3 500 instalaciones y 433 estrellas. Pasa las mismas tres auditorías.
- **Por qué no:** trae un modo que se activa solo en cualquier HTML y aplica las reglas "silenciosamente". Eso choca con la identidad del sitio:
  - impondría comillas “ ” en el texto español;
  - prohíbe subrayar;
  - pide titulares en negrita, no en cursiva, cuando aquí el display es Cormorant cursiva;
  - limita a dos familias, y el sitio usa tres;
  - fija un interlineado de 1,2 a 1,45, escaso para EB Garamond, que tiene la altura de x pequeña.
- **Qué sí sirve:** su `html-entities.md`, como consulta.
- **Seguridad:** 3 ficheros markdown; solo trae un ejemplo de `sed`. Segura, pero invasiva.

**4. `wondelai/skills@web-typography` (resume *On Web Typography* de Santa Maria): no instalar**
- **Uso:** 7 987 instalaciones y 2 241 estrellas.
- **Por qué no:** es genérica (propone emparejar Playfair con Source Sans y usar `clamp()`) y casi todo ya lo cubren `typeset` y `web-design-guidelines`. Lo único aprovechable es el presupuesto de menos de 200 KB en fuentes y los patrones de subconjunto con `unicode-range`.
- **Seguridad:** 6 ficheros markdown, sin scripts. Trae un enlace de afiliado de Amazon (`tag=wondelai00-20`), inocuo.

**Descartada:** `owl-listener/designer-skills` (2 723 estrellas; su skill `typography-scale` tiene unas 2 100 instalaciones). Ni esa ni `readable-measure` superan los 2,3 KB y son superficiales.

**Propuesta:** crear una skill local pequeña, `ortotipografia-es`, con las normas de la RAE y Wikilengua y las reglas copiadas de `typography-audit` (espacios finos, `onum`, versalitas, puntuación colgante).

## (2) Recursos web

1. **Richard Rutter, *Web Typography*, capítulo "Numerals and tables"** (Bringhurst aplicado a la web), en https://book.webtypography.net/ y el extracto en https://alistapart.com/article/web-typography-numerals/
   - Idea: `oldstyle-nums proportional-nums` en la prosa de EB Garamond.
   - `lining-nums tabular-nums` en tablas, ejes, nota emergente y la pestaña Tabla. En la pestaña Datos (JetBrains Mono) ya son tabulares.
   - Cifras alineadas a la derecha y sin bordes, solo una regla bajo la cabecera.

2. **RAE, "Las comillas"** (https://www.rae.es/ortograf%C3%ADa/las-comillas) y **Wikilengua, "Ortotipografía para la web"** (https://www.wikilengua.org/index.php/Ortotipograf%C3%ADa_para_la_web)
   - Comillas por idioma:
     `:lang(es) q { quotes: "«" "»" "“" "”" "‘" "’"; }`
     `:lang(en) q { quotes: "“" "”" "‘" "’"; }`
   - La raya de inciso no debe quedar sola a final de línea: `&NoBreak;` o `nowrap`.
   - Espacio de no separación en `10&nbsp;%`, `EE.&nbsp;UU.` y `art.&nbsp;26`.
   - Espacio fino (`&thinsp;` con `nowrap`) para los millares solo desde 5 cifras. Nunca en años ni en números de sesión.
   - `margin-right: .1em` en `em` para que la cursiva no pise la puntuación.

3. **Matthew Butterick, *Practical Typography*** (https://practicaltypography.com)
   - Fijar primero el cuerpo de texto (tipo, tamaño, interlineado, medida) y calibrar todo lo demás contra él.
   - Mayúsculas espaciadas entre un 5 y un 12 %.
   - Versalitas reales para las siglas de partido (CEDA, PSOE, ERC, PNV): `font-variant-caps: all-small-caps; letter-spacing: .05em`. Es un gesto editorial clásico que encaja con un archivo parlamentario.

4. **Fonts API de Astro 6** (estable desde marzo de 2026), con el proveedor Fontsource (https://docs.astro.build/en/guides/fonts/)
   - Sirve las tres familias desde el propio sitio, con precarga automática.
   - Genera fuentes de reserva con métricas ajustadas, lo que reduce el salto de maquetación cuando entra la serif.
   - Conviene usar los paquetes variables de Fontsource cuando existan y limitar los subconjuntos a `latin` y `latin-ext`. `latin-ext` hace falta para ŀ en apellidos catalanes; el español cabe en `latin`.

5. **Utopia.fyi**, calculadora de escala tipográfica fluida (https://utopia.fyi/type/calculator/)
   - Una sola escala con `clamp()`, por ejemplo cuerpo de 18 px en 360 px de ancho con razón 1,2, hasta 21 px en 1240 px con razón 1,333.
   - El display en Cormorant cursiva solo desde el paso +3 (28 px o más).
   - Medida de lectura entre 60 y 70 caracteres.

6. **Wakamai Fondue** (https://wakamaifondue.com)
   - Antes de escribir el CSS, comprobar qué funciones OpenType traen de verdad los woff2 servidos: `onum`, `smcp` y `c2sc` en EB Garamond, `onum` en Cormorant Garamond. Las versiones de Google Fonts y Fontsource pueden venir recortadas.
   - Una función que la fuente no trae se ignora sin avisar.

Los ficheros descargados están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/src/`: `jk/` para better-typography, `wd/` para web-typography, `tb_agent-skills/` para typography-audit y `tb_bencium-marketplace/` para ui-typography.

Fuentes:
- [jakubkrehel/skills, better-typography](https://github.com/jakubkrehel/skills/tree/main/skills/better-typography)
- [wondelai/skills, web-typography](https://github.com/wondelai/skills/blob/main/web-typography/SKILL.md)
- [skills.sh, ui-typography](https://skills.sh/bencium/bencium-marketplace/ui-typography)
- [skills.sh, typography-audit](https://skills.sh/mblode/agent-skills/typography-audit)
- [Astro, guía de fuentes](https://docs.astro.build/en/guides/fonts/)
- [Astro 6.0](https://astro.build/blog/astro-6/)
- [Rutter, Web Typography](https://book.webtypography.net/)
- [A List Apart, Numerals](https://alistapart.com/article/web-typography-numerals/)
- [RAE, comillas](https://www.rae.es/ortograf%C3%ADa/las-comillas)
- [Wikilengua, Ortotipografía para la web](https://www.wikilengua.org/index.php/Ortotipograf%C3%ADa_para_la_web)
- [Recursivos, comillas en CSS](https://recursivos.com/css/comillas/)

## Resultado 6

Installed skills (8), all as real folders in `~/.claude/skills`:

- better-typography: /Users/rodrodr/.claude/skills/better-typography
- better-accessibility: /Users/rodrodr/.claude/skills/better-accessibility
- better-colors: /Users/rodrodr/.claude/skills/better-colors
- charts-graphs: /Users/rodrodr/.claude/skills/charts-graphs
- tooltips: /Users/rodrodr/.claude/skills/tooltips
- astro-framework: /Users/rodrodr/.claude/skills/astro-framework
- modern-css: /Users/rodrodr/.claude/skills/modern-css
- emil-design-eng: /Users/rodrodr/.claude/skills/emil-design-eng

Summary:
1. I chose 8 skills from the five reports: three from jakubkrehel (typography, accessibility, colours), two from mgifford (accessible charts and tooltips), delineas for Astro, Paul Irish's modern CSS, and Emil Kowalski's interaction and motion rules.
2. I re-read every SKILL.md in full and listed every file in each skill folder. None has scripts: only Markdown, plus one metadata `openai.yaml` in each jakubkrehel skill. I found no unjustified network requests, no credential requests and no suspicious instructions. The only hits for secret, password and npx are documentation examples.
3. `npx skills add owner/repo` fails here because git won't start: xcrun and `/usr/local/bin/git` are x86_64, and the machine needs arm64e.
4. Second, documented method (local path, line 57 of the CLI README): I downloaded each GitHub tarball, reviewed it, and installed with `DISABLE_TELEMETRY=1 npx -y skills add ./<repo> --skill <name> -g -a claude-code -y </dev/null`. All 8 installed.
5. Verified: each SKILL.md is readable and its `name` matches, each installed folder is byte-for-byte identical to the copy I reviewed, and `npx skills ls -g -a claude-code` lists all 8.
6. Discarded:
   - anthropics frontend-design: overlaps with `impeccable:frontend-design`. Its list of AI design defaults is cited in the doc to read without installing.
   - addyosmani web-quality: already covered by audit, optimize and chrome-devtools-mcp.
   - tufte-data-viz: overlaps with `dataviz` and imposes its own palette.
   - typography-audit and bencium ui-typography: author reputation below the bar, or they impose English quotes and bold headlines.
   - community-access: recommends `role="application"`.
   - d3 skills: rejected for mouse-only tooltips (d3-viz) and for security (nexu-io).
7. Ways the site overrides the skills, written into the doc:
   - Spanish quotes «» instead of the English quotes `better-typography` asks for.
   - Okabe-Ito only for checking colour blindness, not as a palette.
   - The project uses Astro 7.3 but the Astro skill covers 5/6, so the official docs win on any API doubt.
   - No `<ClientRouter />`: use native cross-page `@view-transition` instead.
   - Invoke Emil's skill with a concrete question, or it only replies with a greeting.
8. New doc: /Users/rodrodr/Dropbox/Apps/luz_site/docs/RECURSOS_DISENO.md. It has tables of installed and discarded skills with reasons, a table of when to use each one (plan, tokens, typography, Astro, tooltip and keyboard, motion, critique, audit, polish), and Spanish typographic rules that no skill covers.
9. It also lists 17 web resources, each mapped to pages and figures of the plan (F01, F26, F21, H, F32–F35 and others). Examples: OWID Grapher, GOV.UK and APG tabs, WCAG 1.4.13, Roselli on ARIA grid, Data Navigator, Chartability, Fossheim, Voteview, Datawrapper dark mode, The Pudding, FT Visual Vocabulary, Rutter and the RAE, Astro Fonts, Chrome view transitions.
10. Open points:
    - `npx skills update` will also fail until git works, so updates mean repeating the download, review and local install.
    - The official Astro docs MCP is not installed, because it changes Claude Code's configuration and needs the researcher's permission.
    - The reviewed copies are in /private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/final/.
