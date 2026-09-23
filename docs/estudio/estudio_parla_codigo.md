# El código de ParlaIbero como arquitectura para el sitio de Luz y Taquígrafos

Estudio del repositorio `/Users/rodrodr/Dropbox/Apps/parlaibero_site` (leído entero: configuración, `Base.astro`,
`base.css`, `src/lib/*`, los 26 componentes, `src/viz/**`, las 12 rutas de `src/pages/**`, `src/scripts/figuras.ts`,
`scripts/*`, `tests/*`, los dos flujos de GitHub Actions y el `dist/` compilado el 21-09-2026). Al final, una propuesta
técnica para Luz y Taquígrafos (LyT) con la misma pila.

Todas las cifras de ParlaIbero que se citan salen del código o de `dist/` medidos hoy. Las de LyT llevan su archivo de
origen y su base: **V2 depositada** (107.551 filas, doi:10.7910/DVN/THQCMI) o **v3 del explorador** (121.700 filas,
sin depositar, ids renumerados).

---

## 0. En resumen

- **Qué es ParlaIbero técnicamente.** Astro `^7.3.3` estático, TypeScript estricto y ningún framework de cliente.
  Tipografías autoalojadas con `@fontsource-variable/*` y `@astrojs/sitemap`. Salen **68 páginas** (6 plantillas + 16
  fichas, en 3 lenguas, más la raíz y el 404) y **502 claves de texto × 3 lenguas**. El único JavaScript propio de las
  figuras es `src/scripts/figuras.ts`, que compila a **3.310 B (1.370 B con gzip)**. Hay **71 pruebas** de Playwright.
- **La idea que lo sostiene.** Cada figura se construye en el build: el SVG lleva las formas y el HTML lleva los
  rótulos y las cifras. Sin JavaScript se lee entera: las pestañas son radios con `:has()`, las tablas son tablas de
  verdad y cada fila de la rejilla es un enlace. La isla solo **añade** la nota emergente, el recorrido con el
  teclado y un enlace de conmutación.
- **Lo más valioso para LyT, más que el aspecto.**
  1. El **sistema de procedencia**: `cifras.json` → `resuelve()` → `<data class="cifra" data-k>` → `audit-cifras.mjs`,
     que vuelve a calcular cada valor sobre `dist/`.
  2. El **copy como fuente única**: `docs/02_COPY_es.md` → `copy2i18n.py` → `t()`, con un control que prohíbe
     teclear números.
  3. Las **puertas de publicación** (`STRICT=1`).

  Estas tres piezas resuelven justo las reglas duras de LyT: cifras verificadas, V2 frente a v3, nada del
  prototipo y ninguna promesa falsa. Se pueden convertir en comprobaciones automáticas.
- **Lo que no hay que copiar.**
  - La portada rotativa en borrador (`AperturaRotativa` + `FigTermino` + `config/portada.ts`). Deja Inicio en
    **820.217 B** sin comprimir, frente al presupuesto de 300 KB de su propio plan.
  - El puente `ficha/contexto.ts`, que rodea un defecto de `t()`.
  - Todo lo de la AEI, salvo que el investigador confirme que LyT tiene esa financiación.
- **Propuesta.**
  - Un sitio LyT en Astro, **solo en español y sin prefijo de idioma**, con 7 plantillas y 3 fichas de legislatura.
  - El tema oscuro editorial (oro y crema) por defecto. El hemiciclo de Gil Robles se conserva tal cual y gana una
    interacción solo con CSS.
  - Ocho figuras nuevas con el patrón Gráfico · Tabla · Datos.
  - Un exportador que escriba `src/data/` desde la V2 y desde la v3, con la huella sha256 de cada una.
  - Tres guardas específicas: V2/v3, prototipo y promesas.
  - Estimación: **unas 13,5–17 jornadas técnicas, más 2–3 de copy**. La ruta crítica son las aprobaciones del
    investigador (§6.10).

---

## 1. Cómo se hace cada figura interactiva sin framework

### 1.1 El patrón común, en cinco capas

| capa | dónde | qué hace |
|---|---|---|
| 1 · datos | `src/data/*.json` | Los escribe un exportador externo (`diaries/scripts/exportar_sitio.py`) y el sitio no los edita. Se importan como JSON tipado. |
| 2 · geometría pura | `src/viz/geom/voz.ts`, `src/viz/geom/rejilla.ts` | Funciones sin DOM, testeables: escalas, ejes, rutas, colocación de rótulos, cuantiles. La misma geometría la usan la figura del sitio, la imagen descargable (`viz/figuraVoz.ts`) y la tarjeta social (`scripts/og.mjs`, que reescribe la regla de cuantiles a propósito). |
| 3 · componente `.astro` | `src/components/Fig*.astro` | Emite en el build un `<figure data-figura>` con las formas en SVG (`aria-hidden`) y los rótulos en HTML, en posición absoluta y en **porcentaje** del lienzo (`enPorcentaje()`). Así el texto no encoge en el móvil y cada cifra lleva su envoltorio auditable (`fmt.dato()`). También hace **asertos de coherencia** que tumban el build de publicación. |
| 4 · estado sin JS | `Pestanas.astro` y los radios de las medidas | Radios de verdad más `:has()`. Sin `:has()`, los paneles se leen seguidos y la barra de pestañas se retira. |
| 5 · isla mínima | `src/scripts/figuras.ts` | Cada figura la importa con `<script>import '../scripts/figuras';</script>` y Astro la agrupa en un solo módulo (`_astro/figuras.*.js`). Es idempotente: marca con `data-isla` cada figura atendida y con `data-isla-figuras` el `<html>`. No formatea ninguna cifra, porque el build ya las dejó escritas en `data-*`. |

Tres reglas de dibujo que recorren todas las figuras:

- **La ausencia nunca es un color.** Un hueco declarado se dibuja como papel con contorno (`.rj-hueco`, `.hueco`,
  `.celda.vacia`). Una década o un año sin dato se queda vacío y **parte la línea** (`serie()` solo une posiciones
  contiguas). Nunca se pinta como un 0 %.
- **Otra categoría se marca con otro trazo, no solo con otro color.** El padrón sin auditar lleva línea discontinua,
  punto hueco y `--dato-sin-auditar`.
- **El orden es fijo y nunca por valor** (orden de `paises.json`). Ninguna figura ordena, clasifica ni tiene selector
  de país.

### 1.2 FigVoz (`src/components/FigVoz.astro`, 410 líneas, más `src/viz/geom/voz.ts`)

**Qué dibuja.** Pequeños múltiplos: 16 paneles, uno por cámara. Van en 2 columnas en el móvil y en 4 desde `48rem`.
Cada panel muestra tres series, una por medida (`palabras`, `turnos`, `oradoras`). Las medidas se leen del propio
dato: `Object.keys(Object.values(PAISES[0].voz)[0])`.

- **Ejes.**
  - El eje X es de posiciones: la unión de las décadas de todas las cámaras (`decadas()`).
  - El eje Y es el mismo en los 16 paneles y en las tres medidas: `TECHO = maximoRedondeado(...)`, con paso de 0,1.
    Así, cambiar de medida no cambia la vara de medir.
  - Hay una raya de referencia en el 50 % (`MITAD`). Solo se rotula en la primera columna de cada fila:
    `nth-child(2n+1)` en el móvil y `4n+1` en escritorio.
- **Lienzo.** `LIENZO = { ancho:160, alto:118, izq:8, der:8, arriba:24, abajo:20 }`, en unidades de viewBox. Los
  carriles de arriba y de abajo reservan sitio para los rótulos.
- **Puntos.**
  - Cada punto se dibuja dos veces: `circle.vz-punto r=2.8` es el visible (sube a `r:3.4px` por CSS desde `48rem`)
    y `circle.vz-diana r=11` es el objetivo transparente del puntero.
  - La diana lleva `data-tip` con la frase completa ya formateada, por ejemplo «Uruguay · 12,3 % · n de den
    palabras», compuesta desde `comun.fig.voz.hover`.
  - En la página compilada hay **204 dianas**.
- **Rótulos de valor.** Solo el primer y el último dato de cada serie, colocados por `colocaRotulos()`:
  - el primero va a la izquierda si delante hay dos décadas vacías; si no, encima o debajo;
  - se prefiere el lado del que **no** viene la línea, salvo que haya que apartarlo más de `APARTE_TOLERABLE = 13`;
  - un rótulo «bajo» nunca queda a caballo de la línea de base.

  Son `<span class="vz-etq vz-sobre|vz-bajo|vz-izquierda vz-inicio|vz-fin">` con fondo de papel.
- **Eje X en HTML.** Los extremos se ven siempre. Las décadas intermedias solo aparecen si el panel da de sí:
  `container-type: inline-size` + `@container (min-width: 15.5rem)`.
- **Conmutador de medidas.**
  - `<input type="radio" data-conmuta="0|1|2">` va en la ranura `barra` de las pestañas.
  - El CSS solo conoce posiciones: `.figvoz:has([data-conmuta='1']:checked) [data-m='1'] { display:block }`.
  - Sin `:has()`, el conmutador desaparece: el gráfico se queda en palabras y **las tres tablas se leen seguidas**.
- **Accesibilidad.**
  - La rejilla lleva `role="img"`, un `aria-label` corto (`comun.alt.voz.corto`) y `aria-describedby` que apunta a
    una **descripción larga oculta** (`.sr-only`), con una línea por cámara.
  - El título es un `<figcaption>`.
- **Tabla.** Una por medida, con `rowspan` por país. La década se recorta a la ventana de la cámara (`ventanaDecada()`:
  «1985–89»). Una celda sin dato se queda **vacía**, no pone 0 %.
- **Clic.** El enlace de la página «Ver turnos y oradoras» (`a[data-voz-medidas]`, `href="#voz-medidas"`) funciona
  de dos formas:
  - sin JS es un ancla al conmutador;
  - con JS, la isla marca la pestaña Gráfico y la segunda medida, y lleva el foco con
    `requestAnimationFrame(() => elegida.focus({preventScroll:true}))`.
- **Textos que falta aprobar.** `deCopy()` busca la clave y, si no existe, enseña el identificador del dato marcado
  con `data-todo-copy`. La auditoría lo lista y, en publicación, falla.

### 1.3 FigRejilla (`src/components/FigRejilla.astro`, 429 líneas, más `src/viz/geom/rejilla.ts`)

- **Qué dibuja.** Una fila por cámara y una columna por año, de 1976 a 2025: 50 columnas × 16 filas = 800 celdas, de
  las que 527 tienen sesión.
- **Cuatro estados de celda** (`rejilla()`).
  - `sesion`: tono de la clase por turnos de habla.
  - `hueco`: declarado; papel con contorno y su rango rotulado.
  - `fuera`: no se dibuja nada.
  - `sin_sesion`: año sin sesión y sin declarar. No debería existir: se cuenta aparte y **falla el build**.
- **Escala de tono.** Cinco clases por `cuantiles()` **sin interpolar**: cada corte es un valor observado (el máximo
  de la clase de abajo), para que el lector lo encuentre en el CSV. Los cortes empatados se funden. La clase es
  «cuántos cortes supera», con desigualdad estricta. Los cortes se imprimen bajo la escala; los extremos, encima.
- **Cada fila es un enlace.**
  - `<a class="rj-fila" href=ficha aria-label=alt data-pais>` da **una parada de tabulación por cámara**.
  - Dentro va un SVG `viewBox="0 0 50 1" preserveAspectRatio="none"` que se estira al ancho disponible, con
    `vector-effect: non-scaling-stroke` en todos los trazos. **Ningún texto vive dentro del SVG.**
  - Cada celda es `<rect data-celda data-x data-a data-s data-h>`, con los números ya formateados en la lengua de
    la página. Los huecos llevan `data-tip`.
  - Dos `rect.rj-cursor` (tinta y halo de papel) marcan la celda activa.
- **Nota emergente por plantilla.** La figura lleva
  `data-plantilla="{pais} · {a} · {s} sesiones · {h} turnos de habla"`, generada desde el copy con huecos, y la isla
  la rellena con `data-pais` de la fila y `data-a/s/h` de la celda. El comentario del código lo resume así: «527
  frases menos en el HTML».
- **Teclado** (solo con la isla).
  - Con el foco en una fila: `←` `→` `Inicio` `Fin` recorren los años (estado en un `WeakMap`) y `Escape` limpia.
  - `focusout` borra el cursor.
  - La frase «Con el teclado: una parada por cámara; las flechas recorren los años» nace `hidden` con
    `data-solo-isla`. La isla la enseña y la **añade al `aria-describedby`**, porque sin isla sería mentira.
- **Asertos de coherencia.** `GEO.llenas` tiene que ser igual a `cifras.json › rejilla.llenas` (527) y `GEO.total` a
  `rejilla.total` (800). Si no, `STRICT=1` lanza el error: «527 de 800» está escrito en tres páginas.
- **`completa`.**
  - Se deduce de `Astro.url.pathname`: la leyenda larga y la descarga a la vista solo se pintan en `/paises/`.
  - En Inicio el DOI de la tabla va como texto, para no añadir 16 salidas a Dataverse sin su aviso.
- **Móvil.**
  - Bajo `40rem` la fila rotula el código ISO, esconde las columnas numéricas y mide 44 px de alto (1,5rem de tira y
    2 × 0,625rem de aire).
  - La tabla de 10 columnas (`min-width: 74rem`) se desliza dentro de `.fig-desliza` (`role="region"
    tabindex="0"`), con la primera columna pegajosa.

### 1.4 Pestanas: Gráfico · Tabla · Datos (`src/components/Pestanas.astro`)

- **Rótulos.** Los tres salen de **una** clave del copy: `comun.fig.pestanas = "[Gráfico] [Tabla] [Datos]"`. Si no
  trae tres corchetes, el build lanza un error.
- **Son radios, no `role="tab"`, y es una decisión documentada.**
  - Son `<input type="radio" class="pest-radio">` con `opacity:0`, tendidos sobre su `<label>`.
  - Dan una sola parada de tabulación y las flechas cambian de pestaña de forma nativa.
  - El lector de pantalla dice «1 de 3».
  - No se fingen pestañas ARIA que sin script no sabrían moverse.
- **Paneles.**
  `.pestanas:has(> .pest-barra .pest-radio[value='tabla']:checked) > .pest-panel[data-panel='tabla']{display:block}`.
  Con `@supports not selector(:has(*))`, los tres paneles se apilan y la barra se oculta.
- **Ranuras.** `barra` (un control propio a la derecha, como las medidas de FigVoz), `grafico`, `tabla` y `datos`.
- **Estilos globales con prefijo** (`pest-`, `fig-`). El contenido llega por `slot` y la nota emergente la crea la
  isla, así que nada de eso hereda el ámbito del componente. Aquí viven `.fig-tabla`, `.fig-desliza`, `.fig-datos`,
  `.fig-leame` y `.fig-tip`.
- **Impresión.** El panel Datos se oculta al imprimir.

### 1.5 La isla (`src/scripts/figuras.ts`, 167 líneas)

- **Una sola nota para toda la página.** `div.fig-tip` (`position:fixed`, `aria-hidden="true"`) y una región
  `div.sr-only[aria-live=polite]`, creadas de forma perezosa.
- **Ancla al elemento, no al puntero.** Usa `getBoundingClientRect()` y se centra encima; se voltea debajo si no cabe
  y se ajusta dentro de la ventana con 8 px de margen. Así funciona igual con ratón que con teclado.
- **Delegación.**
  - `pointerover` sobre la figura busca `closest('[data-tip], [data-a]')`.
  - `pointerleave` oculta.
  - El anuncio a la región viva **solo** ocurre al recorrer con el teclado (`muestra(el, true)`), para no repetir
    lo que el ratón ya enseña.
- **Cierre (WCAG 1.4.13).** `Escape` en todo el documento cierra la nota. Además se oculta al desplazar y al cambiar
  el tamaño de la ventana, para que no se quede flotando.
- Sin librerías y sin formatear en el cliente.

### 1.6 Figuras de ficha y borradores

| figura | archivo | formas | interacción | sin JS |
|---|---|---|---|---|
| **TiraAnual** | `components/ficha/TiraAnual.astro` | SVG `viewBox="0 0 n 100" preserveAspectRatio="none"`, una barra por año (altura = turnos de habla sobre el máximo de la cámara; mínimo 1,5 para que un año con sesiones nunca desaparezca) y huecos discontinuos | **ninguna isla**: `<title>` nativo en cada `rect` | tabla en `<details>`; cada hueco es **una** fila con su rango, no diez filas de ceros |
| **VozDecadas** | `components/ficha/VozDecadas.astro` | SVG 100×100 estirado para la línea; los puntos y sus valores son `span` HTML | atributo `title` | tabla con las tres medidas en `<details>`, con n / den bajo cada porcentaje; comparte el techo con FigVoz |
| **FigTermino** (borrador) | `components/FigTermino.astro` | hermana de FigVoz (misma geometría), serie anual en veces por millón de palabras; rotula solo el pico y ancla un «hito» en la banda superior izquierda | ninguna, sin pestañas | — |
| **Tira de disponibilidad** | `components/Columnas.astro` | celdas CSS con `linear-gradient` de llenado (`--v`), sin SVG | atributo `title` | es una tabla ARIA (`role="table/row/cell"`), con la cifra en `.sr-only` |
| **Barra de tres partes y «pesa»** | `pages/[lang]/metodologia.astro` | SVG con `<pattern>` de trama para la voz colectiva (textura, no solo color); pesa CSS con `--a` y `--b` | ninguna | leyenda con porcentaje y n |

### 1.7 Datos descargables de cada figura

- **CSV y XLSX.** Viven en `public/datos/*.{csv,xlsx}` y los escribe el **exportador**, no el sitio. Cada CSV trae su
  procedencia en columnas (`clave`, `medido_el`). `procedencia.csv` lista **todas** las cifras con `cifra, valor,
  tipo, clave, fuente, fecha`.
- **Registro único** (`src/lib/figuras.ts`). `FIGURAS = { voz:{ancla,ruta,familia,archivos}, cobertura:{…} }` da el
  `id` de montaje de cada figura, la URL que imprime su LÉAME y la cita de la figura en «Usar» e «Instituciones».
  Así la cita y el LÉAME no pueden dar direcciones distintas.
- **LÉAME por figura y por lengua.** Lo genera `src/pages/datos/leame-[fig]-[lang].txt.ts`, un endpoint estático.
  - Toma el LÉAME tipo del copy (`comun.leame.*`: cabecera, qué mide, denominador, archivos, columnas, salvedad,
    fuente, licencia, citar, contacto) y rellena sus huecos `{{fig.*}}` con `fig.<familia>.*`.
  - Las columnas se **leen de la cabecera real del CSV**.
  - Corta las líneas a 78 columnas.
  - Usa la fecha del exportador (`sello.exportado`), no la del reloj, para que el build sea determinista.
- **Imagen de la figura.** `src/pages/datos/voz_por_camara-[lang].svg.ts` y `.png.ts`, con `viz/figuraVoz.ts`:
  - un SVG autónomo de 1.600 px de ancho con título, subtítulo, los 16 paneles con **la misma geometría**, la leyenda
    de trazos, la salvedad, la cita (con la URL y el ancla de la figura), la licencia y la mención de financiación;
  - un PNG de 2.400 px rasterizado con `sharp` (`density = 72·2400/1600`);
  - los colores se leen de `:root` en `base.css` con una expresión regular.
- **Tarjetas sociales.** `scripts/og.mjs` genera `public/og-{es,en,pt}.png` (1.200×630): la rejilla simplificada con
  la misma regla de cuantiles, el nombre y la tesis. Hay que volver a ejecutarlo cuando cambian los datos.
- **Panel «Datos» de cada figura.** Un botón con el archivo principal, la lista de los demás, la nota «Sin
  formulario: son datos agregados» y un `<dl>` con «qué mide / denominador / salvedad».

### 1.8 Tamaños (medidos en `dist/`)

| elemento | valor |
|---|---|
| Isla `figuras.*.js` | 3.310 B · **1.370 B gz** (los dos componentes la importan; el módulo es uno) |
| CSS por página | 7–21 KB sin comprimir, unos 3–4,5 KB gz por hoja (`Base`, `FundingNotice`, `FigRejilla`, `index`…) |
| Inicio `/es/` | **820.217 B · 101.042 B gz**: 12 aperturas alternativas en `<template>`, cada una con 16 paneles; 3.046 `data-k` en la página |
| Países `/es/paises/` | 129.149 B · 16.918 B gz (531 `data-celda`) |
| Metodología · Usar · ficha UY | 61.303 · 176.746 · 65.255 B (14,5 · 19,9 · 13,0 KB gz) |
| Explorador · Instituciones | 36.476 · 28.674 B (8,7 · 7,4 KB gz) |
| Datos de figura | CSV 1,6–19,7 KB · XLSX 6–17 KB · SVG ~31 KB · PNG ~333–340 KB |
| `dist/` entero | 13 MB (20 woff2; capturas en AVIF, WebP y PNG a cuatro anchos) |
| Presupuesto del propio plan (`docs/00_PLAN_landing.md`) | JS ≤ 35 KB gz · Inicio ≤ 300 KB (Inicio **lo supera** por la portada rotativa) |
| Objetivos táctiles | 2,75rem (44 px) en pestañas, radios, filas de la rejilla, enlaces del pie y botones |
| Nota emergente | `max-width: min(32rem, 100vw − 1rem)`, mono .78rem, tinta sobre papel invertido |

### 1.9 Defectos y lecciones que conviene no heredar

1. **Peso de Inicio.** `AperturaRotativa.astro` mete 12 figuras completas en `<template>`, que viajan aunque no se
   vean. En LyT: una figura por página y un presupuesto por página comprobado en CI (§6.9).
2. **FigVoz no se recorre con el teclado.** Sus dianas no son enfocables. El camino accesible a los valores es la
   pestaña Tabla más la descripción larga. Es aceptable si se dice; la rejilla sí se recorre.
3. **`t()` escapa el texto antes de resolver los marcadores.** Por eso `{{pais.<iso>.x}}` llega como
   `pais.&lt;iso&gt;.x` y no se resuelve. Hay tres rodeos:
   - `dePais()`, duplicado en `FigVoz.astro` y `FigRejilla.astro`;
   - un `Proxy` en `components/ficha/contexto.ts`;
   - `ctx.vars`, que usan los demás.

   En LyT hay que arreglarlo en origen: resolver los marcadores sobre el texto crudo y escapar solo lo de fuera.
4. **`sharp` se importa sin declararlo.** Lo usan `scripts/og.mjs` y `datos/voz_por_camara-[lang].png.ts`, pero
   `package.json` no lo declara: llega como `optionalDependencies` de astro 7.3.3 (`^0.35.4`). Hay que declararlo.
5. **El LÉAME se nombra mal.** El tipo dice «LEAME.txt: este archivo.», pero el archivo se llama
   `leame-voz_por_camara-es.txt` (`dist/datos/`).
6. **Tokens leídos con expresiones regulares.** `figuraVoz.ts` y `og.mjs` sacan los colores de `base.css`, y los
   tokens oscuros están **duplicados** (bajo `[data-theme='dark']` y bajo `@media (prefers-color-scheme: dark)`). En
   LyT, un `tokens.json` que genere el CSS y alimente las figuras exportables.
7. **Estilos copiados a mano.** `FigTermino` duplica los de `FigVoz` («si aquella cambia, esta cambia con ella»).
   Mejor un solo `figuras.css` o componentes base.

---

## 2. Cifras con procedencia y textos

### 2.1 Las cifras: de `cifras.json` al HTML

- **Datos de entrada** (`src/data/`, que escribe el exportador):
  - `cifras.json`: cada entrada tiene la forma `{ v, t, clave, f, d, dec?, cabecera? }`. `t` es el tipo (`int`,
    `pct`, `year`, `date`, `bytes`, `ratio`, `seg`, `text`, `i18n`). `clave` es el **tipo de fuente**:
    `P` (edición depositada), `L` (bloque de enlace), `C` (canónicos de trabajo), `M` (monografía), `D` (DOI) o
    `CALC`. `f` es la fuente legible (p. ej. «parlaibero.data.json → paises[]») y `d`, la fecha de medida.
    Ejemplo: `"rejilla.llenas": {"v":527,"t":"int","clave":"CALC","f":"… anual[].ses > 0 dentro de la rejilla","d":"2026-09-07"}`.
  - `paises.json`, `anual.json`, `eventos.json`, `columnas.json`, `fila_ejemplo.json`, `fragmento.json`,
    `jsonld/<iso>.json` (el depositado, tal cual) y `sello.json`
    (`{exportado, medido_el, edicion_datos, data_json_sha256, puertas: 8, avisos[]}`).
- **Resolutor** (`src/lib/cifras.ts › resuelve(marcador, lang, ctx)`).
  - **Sintaxis.** `clave|formato`, con prefijo opcional `NUEVO:`.
  - **Familias.** Una clave de `cifras.json`; `pais.<iso>.<campo>` (con `palF.<década|primera|ultima>.<pct|n|den>`);
    `evento.<iso-fecha>.<campo>`; o un dato del investigador en `config/enlaces.ts ›
    PENDIENTES_DEL_INVESTIGADOR`.
  - **Formatos.** Todos con `Intl`, **una sola vez**:
    - `useGrouping:'always'`;
    - porcentaje con espacio indivisible y `%` en español;
    - `|letra` (hasta «veintiuna», en femenino, con mayúscula a principio de frase, que decide `i18n.ts`);
    - `|fecha_larga`;
    - `|peso`, en la unidad de Dataverse (÷1.024, MB/GB).
  - **Salida.** `<data class="cifra" value="…" data-k="clave">texto</data>`. Los tipos `text` e `i18n` salen como
    texto escapado, sin envoltorio: la auditoría los reconoce porque existen **tal cual** en `src/data/`.
  - **Lo que falta.** Sin resolver, pinta `<mark class="pendiente">⟦clave⟧</mark>` en la vista previa y lanza un
    error con `STRICT=1`.
- **Cifras de componente.** `fmt.dato(v, texto, clave)` es el envoltorio para ejes, tablas y leyendas. Sus claves
  forman familias propias que la auditoría conoce: `eje.ano`, `eje.pct`, `decada.<d>`, `rejilla.umbrales`,
  `anual.<iso>.<año>.<ses|hab>`, `anual.<iso>.hab.max`, `columna.<col>.disp.<iso>`, `fila_ejemplo.<col>` y
  `termino.*`.
- **Firma visual** (`base.css`). `data.cifra` va en mono, con `tabular-nums` y `nowrap`. Dentro de un titular hereda
  la tipografía. Un número escrito en letra (`data-fmt="letra"`) es prosa y conserva el envoltorio sin la mono.

### 2.2 `scripts/audit-cifras.mjs` (743 líneas, Node puro, sin dependencias)

Recorre `dist/` y analiza cada página con un analizador HTML mínimo propio (`analiza`, `busca`, `textoDe`), que
exporta a `check-funding.mjs`. Comprueba:

0. **Que `dist/` está entero:** `paginasMinimas() = 3 × (6 + nº países) + 2`. Con la mitad de las páginas, todo lo
   demás daría un ✓ que no diría nada.
1. **Ningún dígito suelto en el texto visible de `<body>`** (cabecera y pie incluidos) fuera de `data-k`, `code`,
   `pre`, `time`, `mark.pendiente` o el `<title>` de un SVG. Se admiten:
   - las **cadenas con dígitos que existen tal cual en `src/data/`**, de la más larga a la más corta y como pieza
     entera (así «2.0» no blanquea «12.05»);
   - los literales fijos (`PID2022-141706NB-C22`, `10.13039/501100011033`, `CC BY 4.0`, `UTF-8`) y la lista del
     copy §0.2;
   - las formas URL, DOI, «Harvard Dataverse, V2» y los nombres de archivo.
2. **Cada `<data>` lleva `data-k` de una familia conocida**, y su `value` coincide con el dato. `esperados()`
   **vuelve a calcular el valor desde `src/data/` sin importar nada de `src/lib/`** («un control que comparte el
   código con lo que vigila solo puede darle la razón»). Además, `textoDice()` comprueba que el **texto a la vista**
   dice lo que dice `value`, según el tipo: dígitos, decimales, bytes → MB/GB y fecha larga.
3. **Ningún campo `speaker_*`** llega a atributos, `<script>`, JSON, JS ni cabeceras de CSV.

   **Control de nombres.** Busca n-gramas contra `.cache/nombres_vetados.json` (2 MB, local, sin versionar). Exime
   `data-autoria`, `alt` y las referencias bibliográficas. Los falsos positivos se declaran en
   `EXCEPCIONES_DE_NOMBRE`. En el CI se acredita con `sello.puertas >= 8`.
4. **Pendientes que se listan**, y que fallan en publicación: `mark.pendiente`, `data-todo-copy="clave"` y
   `data-sin-traducir`.
5. **La `meta description` no pasa de 155 caracteres.**
6. **Ningún recurso de terceros:** `script/img/source/iframe/link rel=stylesheet|preload|…`, `@import` o `url()` en
   `<style>` y en los CSS. Es lo que hace verdad la línea de privacidad.

Escapes declarados: `data-audit-exento="motivo"` (el motivo es obligatorio y el informe lista cada bloque exento) y
`data-autoria`.

### 2.3 Asertos de coherencia en el propio build

| dónde | qué asegura |
|---|---|
| `FigRejilla.astro` | celdas dibujadas = `rejilla.llenas`; total = `rejilla.total`; ningún año `sin_sesion` |
| `inicio/Pleno.astro` | el fragmento literal de `fragmento.json` es **letra por letra** el aprobado en `inicio.pleno.fragmento` |
| `usar.astro` | los archivos listados en «Qué hay en cada descarga» suman `paquete.ficheros` |
| `metodologia.astro` | `fila_ejemplo.json` trae exactamente las columnas de `columnas.json`, en su orden; `dois.rezagados` no llega vacío |
| `[lang]/index.astro` y `paises/[iso].astro` | la descripción cabe en 155 caracteres; ningún conjunto sin DOI entra en el JSON-LD |
| `Pestanas.astro`, `explorador.astro` | el copy trae tantos rótulos entre corchetes como controles pinta la página |

### 2.4 Los textos: del copy al diccionario

- **Fuente única.** `docs/02_COPY_es.md` (2.082 líneas; 542 marcas `<!-- … -->`).
  - Cada unidad empieza con `<!-- clave -->` y termina en la clave siguiente, en un encabezado, en una nota de
    diseño (`>`), en `---` o en una línea entera en negrita (rótulo editorial).
  - `↺` marca una frase fija repetida, que debe ser idéntica en todas sus apariciones.
  - Las cifras van como `{{marcador}}` y los enlaces como `[rótulo]`.
  - Las notas `> [nota de diseño]` no llegan al lector.
- **`scripts/copy2i18n.py`** genera `src/i18n/<lang>.json` y falla si una clave está vacía o si una frase fija tiene
  dos redacciones. Los JSON **no se editan a mano**.
- **API de `src/lib/i18n.ts`:**
  - `t(lang, clave, ctx)`: HTML en línea, con marcas mínimas (`**negrita**`, `*cursiva*`, `` `código` ``) y cifras
    resueltas;
  - `plano()`: para `<title>`, `alt` y `aria-*`;
  - `rotulo()`: quita los corchetes de un botón;
  - `tEnlaces(lang, clave, destinos[])`: da destino a cada `[…]` **por orden**; un corchete sin destino es
    `mark.pendiente` en la vista previa y un error en publicación;
  - `tBloques()`: párrafos, listas y bloques de código;
  - `existe()` y `claves(prefijo)`: Metodología recorre `metodologia.N.pK` sin tocar código al quitar un párrafo.

  Una clave sin traducir se pinta en español envuelta en `<span lang="es" data-sin-traducir>`, con contorno
  discontinuo en la vista previa.
- **`scripts/copy_lectura.py`** genera `docs/02_COPY_es.lectura.md`: el copy con las cifras de hoy ya puestas, para
  que el investigador lo lea sin marcadores.
- **`docs/02a_MARCADORES.md`** es el catálogo de marcadores con valor, fuente y nota. Es la especificación de lo que
  debe exportar el exportador.
- **`scripts/check-i18n.mjs`** comprueba:
  - las mismas claves y los mismos marcadores (con su formato) en las tres lenguas;
  - que no haya valores vacíos;
  - que no haya **ningún número tecleado** fuera de marcadores, código y lista blanca;
  - que no aparezca ninguna palabra vetada (`innovador`, `próximamente`…);
  - que las palabras de década («los ochenta») vayan con el marcador de esa década;
  - que no se haya colado un rótulo editorial.
- **Enlaces y remates.**
  - `src/config/enlaces.ts` reúne **todas** las URL externas y los `PENDIENTES_DEL_INVESTIGADOR`: si valen `null`,
    son marca en la vista previa y error en publicación.
  - `src/lib/remata.ts`: el explorador se abre siempre en otra pestaña y lo dice (`aria-describedby` hacia una nota
    que va **una sola vez** por página en el pie); `#sin-destino` es un pendiente o un error.
  - `src/lib/rutas.ts`: `url(lang, ruta)`, `recurso()` y `PAGINAS`. Ningún enlace interno lleva la base escrita.

---

## 3. Componentes de navegación y lectura

| componente | resuelve | cómo | sin JS |
|---|---|---|---|
| **IndiceLateral** | índice de una lectura larga (Metodología) | `<details>` nativo en el móvil; en escritorio (≥64rem) un índice pegajoso, con la altura descontada de la banda fija; numeración por contador CSS; «dónde estoy» con `view-timeline`. Contrato: cada apartado declara `view-timeline-name: --<id>` y un antepasado declara `timeline-scope` | entero; el resaltado solo donde el navegador tiene `animation-timeline` |
| **Pestanas** | una figura en tres vistas | §1.4 | paneles apilados |
| **Escalera** | la marca (wordmark) | 16 barras generadas desde `paises[]`: el arco temporal de cada corpus, con sus huecos en blanco; es marca, no dato | estática |
| **Salidas** | «Por dónde empezar», escalonado por destreza (sin programar · R o Python básico · métodos de texto) | tres peldaños que suben hacia la derecha en escritorio (`margin-top` escalonado); el aviso del formulario va **encima** de los enlaces | enlaces |
| **BandaCTA** | «Descargar los datos · Abrir el explorador», siempre a mano en lecturas largas | banda **fija** abajo, cada botón con su aviso visible; reserva su hueco con `body:has(.banda-cta){padding-bottom}` y `scroll-padding-bottom` (WCAG 2.4.11); deja de ser fija con `max-width: 21.5rem` o `max-height: 34rem` | enlaces |
| **Captura** | capturas reales de la herramienta | `<Picture>` de `astro:assets` en AVIF y WebP a 480/800/1120/1440 px con `sizes`; enlace a la versión grande (se amplía sin JS); placa clara también en tema oscuro; `alt` = pie plano; un `LEEME.md` junto a las imágenes documenta fecha, URL, versión (huella), archivo con sha256, ventana y parámetros | entero |
| **Columnas** | diccionario de columnas del archivo | tabla ARIA maquetada con rejilla CSS; por columna: nombre, tipo, definición (de `columnas.json`, por lengua) y tira de disponibilidad por cámara codificada por **llenado**, con su base escrita; ancla `#col-<nombre>` con `:target` | entero |
| **Cita** | cita copiable | texto real con `user-select: all`; el botón «Copiar la cita» nace `hidden` y lo enseña el script, que recurre a `execCommand` si no hay portapapeles; aviso `role="status"`; `data-autoria` para el control de nombres | se selecciona con un toque |
| **Vecinas** (ficha) | anterior/siguiente en orden fijo | `rel=prev/next`; en los extremos, hueco vacío; «todas» al centro | entero |
| **Tareas** (ficha) | «Hoy puede»: solo las tareas que ese país sostiene | lista con ordinal por contador CSS; una sesión en un hueco se dibuja como ausencia | entero |
| **Descarga / EnDataverse** (ficha) | ir a Dataverse sabiendo que hay formulario | aviso del formulario **siempre encima**, nunca en una nota emergente; los documentos depositados que nombran personas se **enlazan**, no se reproducen | entero |
| **inicio/Apertura, Tesis, Cobertura, Pleno, Sesiones, SinDueno, Empezar** | los seis movimientos de Inicio | rejilla editorial de 12 columnas (`.inicio .reja`, asimetrías solo en escritorio); `frases.ts` parte en `<span class="frase">` las frases cortas para apilarlas (y «piezas» para que la credencial salte entre datos y no dentro de uno); Tesis es la única banda invertida (tokens cruzados con `color-mix`); Pleno, una cita tipográfica grande en cursiva y sin nombre; SinDueno, cuatro cajas **vacías** con contorno discontinuo (lo que la base no trae) | entero |

---

## 4. Tokens, tipografías, modo claro u oscuro y movimiento

- **Tokens** (`src/styles/base.css`, 116 líneas):
  - superficies y tinta: `--bg --bg-2 --ink --ink-2 --mute --hair`;
  - acento y foco: `--accent --accent-ink --focus` (azul, porque el acento granate es también color de dato);
  - `--ausencia`;
  - rampa secuencial `--rampa-0…4`, que conserva la escalera de contraste 3,4 · 4,6 · 6,4 · 9,5 · 13,1;
  - categórica `--cat-1…6`, más `--dato --dato-sin-auditar --placa`;
  - escala tipográfica con `clamp()` (`--fs-body --fs-small --fs-h1..h3 --fs-lede`), `--gutter`,
    `--measure: 38rem`, `--ancho: 78rem`, `--radio: 2px` y `--ease`.

  Lo interactivo no se distingue por el color: los enlaces van subrayados, los botones son cajas y el foco es azul.
- **Tipografías autoalojadas.** `Base.astro` importa `@fontsource-variable/archivo/wdth.css` (titulares, eje de
  anchura 80–92 %), `source-serif-4/opsz.css` y `opsz-italic.css` (lectura; la cursiva se reserva a «lo que alguien
  dijo») y `jetbrains-mono/wght.css` (toda cifra). Salen 20 woff2 en `dist/_astro`, con `unicode-range`: solo se
  descargan los subconjuntos que se usan. Latin normal y latin cursiva de Source Serif 4 pesan 122 KB y 130 KB.
- **Tema.**
  - Un script en línea en `<head>` aplica `localStorage.tema` **antes de pintar**.
  - `:root` es claro. El oscuro se aplica con `[data-theme='dark']` o con `prefers-color-scheme: dark` si no se ha
    elegido «claro».
  - `<meta name="color-scheme" content="light dark">`.
  - El botón `◐` nace `hidden` («el sitio no enseña botones inertes») y lo destapa su script, que cambia su
    `aria-label`.
  - La banda de la AEI y las capturas van sobre `--placa` blanca también en oscuro.
- **Movimiento.** Todo va dentro de `@media (prefers-reduced-motion: no-preference)`:
  - `scroll-behavior: smooth`;
  - el botón sube 1 px;
  - la entrada única `.entra` va ligada al scroll (`animation-timeline: view()`, `animation-range: entry 0% entry 35%`),
    con `@supports not` que la anula y un `@media print` que la fuerza visible;
  - la banda CTA sube en 240 ms;
  - las transiciones de 120 ms.

  No hay ninguna librería de animación en el cliente.

---

## 5. Pruebas y puertas

| puerta | archivo | qué comprueba | cuándo bloquea |
|---|---|---|---|
| tipos | `npx astro check` | TypeScript estricto | CI |
| diccionarios | `scripts/check-i18n.mjs --strict` | §2.4 | CI |
| build de publicación | `STRICT=1 npm run build` | marcador sin resolver, clave sin traducir, pendiente del investigador, corchete sin destino, asertos de coherencia (§2.3), descripción de más de 155 caracteres | CI |
| cifras | `scripts/audit-cifras.mjs` | §2.2 | CI con `STRICT=1` (los nombres fallan siempre) |
| financiación | `scripts/check-funding.mjs` (117 líneas) | la mención de la AEI en **todas** las páginas, referencia junto a la banda en un bloque `[data-aei]`, texto completo en la lengua de la página, la referencia nunca suelta, franja antes de `<main>` en Inicio | CI |
| humo | `tests/humo.spec.ts` | 7 rutas × 3 lenguas = **21**: 200, un solo `h1`, un `main`, `lang` correcto, **nada asoma por la derecha a 360 px** (busca elementos cortados fuera de contenedores con su propio desplazamiento) y cero errores de consola | CI |
| sin JS | `tests/sinjs.spec.ts` | Inicio y Países × 3 = **6**: con `javaScriptEnabled:false`, existe una tabla con `<caption>`, `th[scope]` y todas las cámaras enlazadas, y **se llega a ella** marcando el radio de su pestaña | CI |
| solapes | `tests/solapes.spec.ts` | 7 rutas × 2 anchos (1000 y 1366) = **14**: recorre la página cada 250 px y falla si un `position: sticky` monta sobre otro texto; tiene **control positivo** (`CONTROL_SOLAPE=1` reintroduce el defecto y la prueba debe fallar) | CI |
| AEI en el primer pantallazo | `tests/aei.spec.ts` | 3 lenguas × 5 pantallas × 2 temas = **30**: la franja entera en pantalla sin desplazar, la banda cargada, sin deformar, sobre fondo claro y ningún logotipo más alto | CI |
| enlaces | `.github/workflows/enlaces.yml` | cada lunes: los 16 DOI resuelven hacia Dataverse, la colección responde por la API y el explorador responde | aviso semanal |

- **Configuración de Playwright.** Las pruebas corren contra `astro preview` en el puerto 4322, no contra el servidor
  de desarrollo, para medir lo que se publica. `baseURL` incluye la base. `PW_CHANNEL=chrome` usa el Chrome del
  equipo.
- **Orden del CI** (`deploy.yml`): `npm ci` → base de Pages → `npm run i18n` → `check-i18n --strict` →
  `astro check` → `og.mjs` → `STRICT=1 build` → `audit` → Playwright → artefacto → despliegue, **solo desde `main`**.
  En un PR se ejecuta todo menos el despliegue.

---

## 6. Propuesta de arquitectura técnica para el sitio de Luz y Taquígrafos

### 6.1 Qué resuelve el paso a varias páginas

La queja fue que todo cabía en una página, la interfaz quedaba abarrotada, no había gráficos interactivos y se
resumía lo que no debía resumirse. La arquitectura de ParlaIbero responde a cada punto:

- **Una pregunta por página y una figura protagonista por página**, a todo el ancho del contenedor, con
  Gráfico · Tabla · Datos.
- **Lecturas largas donde hace falta**: el método pasa a ser una página con índice lateral y apartados numerados,
  no un bloque de nueve pasos.
- **Plantilla por unidad** (ficha de legislatura), como la ficha de país: lo específico se explica entero en su
  sitio y no se resume en la portada.
- **Inicio como índice narrativo.** Cada movimiento es corto y remite a su página.

### 6.2 Mapa del sitio propuesto (solo español; rutas sin prefijo)

| ruta | contenido | figura protagonista | componentes reutilizados |
|---|---|---|---|
| `/` | Inicio: **hemiciclo de Gil Robles, tal cual** · la pregunta · la tesis · 4–5 movimientos que remiten a sus páginas · por dónde empezar | Hemiciclo (portada) y una versión compacta de FigSesiones | Tesis (banda), Salidas, Cita, `frases.ts` |
| `/corpus/` | qué hay y desde cuándo: tres legislaturas, sesiones, años (1931–1939 y 1945); «dos bases, dos cifras» (V2 frente a v3) | FigSesiones, FigAnual, FigLegislaturas | Pestanas, isla, NotaBases (nuevo) |
| `/legislaturas/[leg]/` (3 fichas) | plantilla única, como la ficha de país: qué puede hacer hoy · qué es (su tira de sesiones) · cifras con denominador · quién ocupa el pleno · límites · descarga · anterior/siguiente | TiraLegislatura | Tareas, Vecinas, Cita, VozDecadas → FigReparto |
| `/metodo/` | lectura larga con índice lateral: la fuente (Diarios de Sesiones) · digitalización y OCR · segmentación en intervenciones · identificación de oradores y variables · versiones V1 → V2 → v3 · **una fila real** · lo que el corpus no afirma · reproducibilidad | barra «qué es habla y qué no» (Presidencia, SUMARIO, COMENTARIOS) y la fila real | IndiceLateral, BandaCTA, el patrón de la fila de Metodología |
| `/datos/` | usar los datos: salidas por destreza · el camino hasta el DOI · qué trae la descarga · **Columnas** (14 columnas del CSV V2) · dos lecturas (pandas y `read.csv2`, ya probadas sobre el depositado) · citas en texto, BibTeX y RIS de THQCMI y CGOCUS · erratas y contacto | FigColumnas | Salidas, Columnas, Cita |
| `/explorador/` | qué hace el explorador, con **capturas reales** · cómo empezar · **lo que no hace** | capturas | Captura (con su LEEME), BandaCTA |
| `/afinidades/` | la base derivada: qué es, quién firma con quién en las tres legislaturas, DOI CGOCUS, app | FigAfinidades | Pestanas, Cita |
| `/404/` | — | — | 404 de ParlaIbero, en una sola lengua |

Solo en español, sin prefijo. Se conserva la maquinaria de i18n (claves, marcadores, `t()`) porque es la que
permite prohibir los números tecleados. Se fija `LANGS = ['es']` y el español queda **en la raíz**, para que las URL
citadas no cambien si algún día se añade `/en/`. Astro lo permite con un parámetro de resto (`src/pages/[...lang]/…`
con `lang: undefined` para el español). Hay que comprobarlo en Astro 7 al montar el andamiaje; la alternativa es un
directorio sin parámetro. El coste frente a ParlaIbero está en `rutas.ts` e `idiomas.ts`, y en quitar el selector
de idioma.

### 6.3 Árbol de directorios

```
luz_site/                        (hermano de parlaibero_site; node_modules con com.dropbox.ignored, como allí)
├── docs/        00_PLAN · 01_NARRATIVA · 02_COPY_es.md (fuente) · 02_COPY_es.lectura.md (generado) · 02a_MARCADORES.md
├── public/      datos/*.csv|xlsx (del exportador) · og.png · favicon.svg
├── src/
│   ├── data/    GENERADO: cifras.json · legislaturas.json · sesiones.json · anual.json · ideologia.json · acotaciones.json
│   │            · columnas.json · fila_ejemplo.json · fragmento.json · hemiciclo_1936.json · afinidades/*.json
│   │            · jsonld/{thqcmi,cgocus}.json · sello.json · tokens.json
│   ├── i18n/    es.json (generado)
│   ├── config/  enlaces.ts (DOI, explorador, app de Afinidades, erratas, PENDIENTES_DEL_INVESTIGADOR)
│   ├── lib/     cifras.ts · i18n.ts · idiomas.ts · rutas.ts · remata.ts · figuras.ts
│   ├── viz/geom/ voz.ts (se copia) · rejilla.ts (se copia) · calendario.ts · red.ts
│   ├── viz/     figuraExportable.ts (SVG/PNG de la figura que se lleva alguien)
│   ├── scripts/ figuras.ts (la isla, generalizada)
│   ├── components/ Hemiciclo · Fig{Sesiones,Anual,Legislaturas,Reparto,Acotaciones,Afinidades} · Pestanas · IndiceLateral
│   │               · BandaCTA · Captura · Columnas · Cita · Salidas · NotaBases · ficha/{Tareas,Vecinas,TiraLegislatura}
│   ├── styles/  base.css (tokens generados desde data/tokens.json)
│   └── pages/   index · corpus · legislaturas/[leg] · metodo · datos · explorador · afinidades · 404 · datos/leame-[fig].txt.ts · datos/[fig].{svg,png}.ts
├── scripts/     copy2i18n.py · copy_lectura.py · check-i18n.mjs · audit-cifras.mjs · og.mjs
├── tests/       humo · sinjs · solapes · peso · guardas-lyt
└── .github/workflows/ deploy.yml · enlaces.yml
```

**Exportador.** El de ParlaIbero vive en el proyecto de datos (`diaries/scripts/exportar_sitio.py`). Para LyT, su
sitio natural es junto a los constructores del explorador:
`/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/tools/`, donde están `build_corpus.py` y
`build_session_meta.py`. Proponemos `tools/exportar_sitio.py`, que:

1. Lee la **V2 depositada** (el CSV descargado del DOI THQCMI, o su copia local verificada por sha256) y la **v3
   servida** (la SQLite del explorador, sha256 `3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15`,
   según `landing/datos_explorador.json › _meta`).
2. Copia `aecpa2026/figs/data/hemiciclo_1936.json` (27.108 B). Es **el único** archivo que se toma de `figs/data/`:
   el resto de esa carpeta es el grafo del prototipo de 1931.
3. Copia `aecpa2026/figs/afinidades/data/afin_*.json` y lo compara con lo depositado en CGOCUS.
4. Escribe `src/data/` y `public/datos/` con procedencia campo a campo, además de `sello.json` con las dos huellas.

`landing/datos_explorador.json` (2.757 líneas, calculado el 22-09-2026) y `landing/agregados_corpus.json` ya
contienen buena parte de los agregados. Son el punto de partida, pero les falta la procedencia por cifra y el
agregado por sesión.

### 6.4 Qué se copia tal cual

| archivo | nota |
|---|---|
| `astro.config.mjs`, `tsconfig.json`, `playwright.config.ts`, `.gitignore`, `.claude/launch.json` | cambian `SITE_URL`/`BASE_PATH` (hoy la landing apunta de forma provisional a `/luz/`) y, en el sitemap, `i18n` pasa a una sola lengua |
| `package.json` | mismas versiones (`astro ^7.3.3`, `@astrojs/sitemap ^3.7.4`, `@playwright/test ^1.63.0`, `typescript ^5.9`) y **`sharp` declarado**; se cambian las fuentes (§6.5) |
| `src/components/Pestanas.astro` | sin cambios |
| `src/components/IndiceLateral.astro`, `Cita.astro`, `Captura.astro` | sin cambios |
| `src/lib/remata.ts`, `src/lib/figuras.ts` | el registro, con las figuras de LyT |
| `src/viz/geom/voz.ts` | `decadas`, `maximoRedondeado`, `escalaX/Y`, `serie` (parte en huecos), `colocaRotulos`, `enPorcentaje`, `conDato`: sirven para pequeños múltiplos por legislatura o por año |
| `src/viz/geom/rejilla.ts` | `cuantiles` sin interpolar, `clase` y `tramo`: base del calendario de sesiones |
| `src/pages/datos/leame-[fig]-[lang].txt.ts` | con `LANGS=['es']` |
| `scripts/copy2i18n.py` | sin cambios |
| utilidades HTML de `scripts/audit-cifras.mjs` (`analiza`, `busca`, `textoDe`, `paginasHtml`, `dirDist`, `cadenasDeLosDatos`, `textoDice`) | el `main()` se adapta (§6.5) |
| `tests/humo.spec.ts`, `tests/sinjs.spec.ts`, `tests/solapes.spec.ts` | cambian las rutas; en `sinjs`, «la tabla con todas las cámaras» pasa a «la tabla de sesiones por legislatura» |
| `.github/workflows/deploy.yml`, `enlaces.yml` | sin el paso de la AEI; `enlaces.yml` con THQCMI, CGOCUS, el explorador y la app de Afinidades |

### 6.5 Qué se adapta

1. **Tokens.**
   - Partir de la paleta ya validada de la landing actual (`landing/landing_src.html`, líneas 34–60):
     - oscuro: `--bg #0F110E --bg-2 #161913 --bg-3 #1C2019 --ink #EFE7D8 --ink-2 #C9C3B4 --mute #8E8F86
       --accent #C9A24E`;
     - claro: `--bg #F6F2E9 --bg-2 #EFE9DB --ink #1A1C16 --accent #8C6100`, más la escala ideológica
       (`--ei --i --ci --c --cd --d --ed --nc`) y las **dos paletas del hemiciclo** de
       `landing/hero_vars.css` (`--g-trad … --g-banco`).
   - **Quitar** `--def --cri --men --neg --amb --pos`, que vienen del libro de códigos del prototipo (defiende,
     critica, menciona).
   - El oscuro va en `:root`, **por defecto**, y el claro en `[data-theme='light']`. Si se respeta
     `prefers-color-scheme: light` es una decisión del investigador (§6.11).
   - Añadir lo que el sistema de ParlaIbero necesita y la landing no tiene:
     - `--focus`, distinto del oro, porque el oro es CTA y acento; el foco azul de ParlaIbero en su versión oscura,
       `#9ec1ff`, funciona sobre casi negro;
     - `--ausencia`;
     - una rampa secuencial `--rampa-0…4` en oro u ocre para el calendario, calculada con el mismo método que la
       paleta clara de la presentación (croma y matiz fijos, luminosidad escalonada, validada: memoria «tema claro»);
     - `--placa` para las capturas;
     - `--dato` (crema en oscuro, tinta en claro, para series únicas) y `--dato-2` (oro, para la serie o el elemento
       resaltado).
   - Generar el CSS desde `src/data/tokens.json`, para que `og.mjs` y la figura exportable no lean CSS con
     expresiones regulares.
   - Recordar que **las atenuaciones no se transportan entre temas**: el mismo alfa lava más sobre el papel. Hace
     falta un token `--atenua` por tema.
2. **Tipografías.** Sustituir el Google Fonts actual de la landing (Cormorant Garamond, EB Garamond, JetBrains Mono,
   que es un recurso de terceros que la auditoría rechazaría) por
   `@fontsource-variable/cormorant-garamond` (display en cursiva 500), `@fontsource-variable/eb-garamond` (lectura) y
   `@fontsource-variable/jetbrains-mono` (tablas, ejes y códigos). Los tres existen en npm (5.3.0, comprobado con
   `npm view`); los archivos de ejes y cursivas hay que confirmarlos al instalar.
   - `data.cifra`:
     - en la prosa, EB Garamond con `lining-nums tabular-nums`, porque la mono en mitad de un texto de Garamond
       rompe el tono editorial;
     - en tablas y ejes, la mono;
     - la cifra grande de una lista, en Cormorant cursiva, como `.cifras dt` hoy.
3. **`Base.astro`.**
   - Marca «Luz y Taquígrafos» en Cormorant cursiva, en lugar de la Escalera.
   - Navegación: Corpus · Legislaturas · Método · Datos · Explorador · Afinidades.
   - **Sin selector de idioma.**
   - Botón de tema con oscuro por defecto.
   - Pie: autoría, DOI THQCMI (V2.0), licencia, «Página ed. N · Datos: V2.0 depositada · explorador v3», la nota
     «ParlaIbero es un proyecto distinto» y la nota del explorador en otra pestaña.
   - Sin `FundingNotice` (§6.6).
4. **`cifras.ts` e `i18n.ts`.**
   - Familias nuevas: `leg.<id>.<campo>`, `anio.<aaaa>.<campo>`, `sesion.<fecha>.<campo>` y
     `afin.<leg>.<campo>`.
   - Un campo nuevo, **`base: 'V2' | 'v3' | 'afin' | 'proyecto'`**, que `resuelve()` emite como `data-base`.
   - Arreglar el orden de escape (§1.9.3) y **no** copiar `ficha/contexto.ts`.
   - Decidir `useGrouping`: ParlaIbero agrupa también los números de cuatro cifras («4.253»); la norma académica
     española no agrupa los de cuatro (§6.11).
5. **`audit-cifras.mjs`.**
   - `esperados()`, recalculado desde `src/data/` de LyT.
   - `paginasMinimas() = 7 plantillas + 3 fichas + 404`.
   - La **guarda V2/v3**: todo `data-k` lleva `data-base`, y toda página que pinta una cifra v3 contiene
     `<NotaBases>` (`[data-nota-bases]`), que dice en una línea cuál es la base y por qué difiere de la depositada.
   - **Vetos del prototipo** (§6.9).
   - El control de nombres queda **en suspenso** (§6.11).
6. **`check-i18n.mjs`.** Solo `es`; se mantienen los números tecleados y la lista blanca. Se amplían las palabras
   vetadas con las del prototipo y con las **promesas que el explorador no cumple**, fuera de las claves de límites
   (§6.9).
7. **`Columnas.astro`.** Las 14 columnas del CSV V2 (`id, num_session, order, date, speaker, speech, rep_id,
   rep_name, district, party, party_family, ideology, nwords, legislature`, según `datos_explorador.json ›
   columnas_csv_origen`). La tira pasa de 16 celdas a **3, una por legislatura**, con el llenado medido sobre la V2
   por el exportador.
8. **`Salidas`, `BandaCTA`, `Descarga`.** El aviso del formulario **solo** si THQCMI o CGOCUS tienen libro de
   visitas en Dataverse. Hay que comprobarlo en el depósito; no se supone.
9. **Hemiciclo.** Portar `landing/hero_svg.py` (67 líneas) a `components/Hemiciclo.astro`, que lee
   `src/data/hemiciclo_1936.json`. El dibujo no se toca: 45.533 B de SVG con escaños `data-g` y color `var(--g-*)`.
   - **Interacción sin JavaScript**, en la línea de las pestañas: 4 radios de bloque (Derechas · Centro · Izquierdas ·
     Gobierno) y una lista de minorías en la leyenda.
   - `:has(:checked)` y `:has(:hover/:focus-visible)` atenúan el resto de escaños con `--atenua`.
   - Las 18 reglas se generan en el build.
   - **Sin cifras**: los recuentos por color son escaños del plano (proyección sector a sector del croquis), no
     diputados, y la figura no puede sugerir lo contrario.
10. **`og.mjs`.** El hemiciclo más el nombre, a 1.200×630. `out/hemiciclo_1936_gil_robles.png` (513.966 B) ya
    existe como punto de partida.
11. **JSON-LD.** Un `Dataset` para THQCMI y otro para CGOCUS (el depositado, si Dataverse lo exporta), en lugar del
    `DataCatalog` de 16 conjuntos.
12. **Isla generalizada.**
    - `[data-tip]` se mantiene.
    - La plantilla pasa a ser genérica: `data-plantilla="{fecha} · {n} intervenciones · {p} palabras"` más
      `data-v-fecha`, `data-v-n`, `data-v-p` en la celda.
    - `a[data-pais]` pasa a `[data-fila]`.
    - El resto (anclaje, `Escape`, `aria-live` solo con teclado, recorrido con flechas) queda igual.

### 6.6 Qué sobra

- **Todo lo de la AEI**: `FundingNotice.astro`, `assets/aei/`, `scripts/check-funding.mjs`, `tests/aei.spec.ts` y
  la franja `franjaAEI`. Solo se incorpora si el investigador confirma que LyT tiene financiación con obligación de
  publicidad, y con qué referencia.
- **La portada rotativa en borrador**: `AperturaRotativa.astro`, `FigTermino.astro`, `config/portada.ts`,
  `data/terminos.json` y la familia `termino.*` de la auditoría.
- **Lo que es de ParlaIbero**:
  - `Escalera.astro` (las 16 cámaras);
  - el selector de tres idiomas, `03_COPY_{en,pt}.md` y el glosario trilingüe;
  - la raíz que elige lengua;
  - `instituciones.astro`, salvo que el investigador quiera una página para bibliotecas o archivos.
- **El control de nombres tal cual** (`.cache/nombres_vetados.json`, `EXCEPCIONES_DE_NOMBRE`). Obedece a una
  directiva de ParlaIbero (en divulgación no se nombra a quien figura en los datos). LyT es un corpus histórico y la
  landing actual nombra a oradores (la fila de ejemplo es Clara Campoamor). Se decide aparte (§6.11).
- **`ficha/contexto.ts`**, los `dePais()` duplicados y `inicio/Sesiones.astro` en su forma actual, que depende de
  `eventos.json`. Puede volver como «sesiones que el lector reconoce» (p. ej. el 1 de octubre de 1931), con fechas
  y filas verificadas en V2 o en v3.
- **De la landing actual**:
  - los tokens del libro de códigos;
  - Google Fonts;
  - `contenido.json` como almacén de texto. Su contenido sirve de semilla para el copy, pero hay que convertir sus
    números tecleados en marcadores.

### 6.7 Figuras propuestas para LyT (con su dato y su estado)

| figura | pregunta | dato · base · archivo | estado | interacción | cuidado |
|---|---|---|---|---|---|
| **Hemiciclo** (portada) | ¿cómo se sentaba la Cámara de 1936? | croquis de Gil Robles proyectado sobre el plano · `figs/data/hemiciclo_1936.json` | existe | resaltar por bloque y minoría, solo con CSS | escaños del plano, no diputados; nada de cifras |
| **FigSesiones** | ¿cuándo se reunió el Congreso? | una marca por sesión (755 en v3; 752 fechas distintas; 1931-07-14 → 1945-11-09), con altura o tono = palabras de habla · **v3** (SQLite del explorador) · `datos_explorador.json › totales` | **hay que exportar el agregado por sesión** (755 filas) | nota por plantilla; ← → recorren las sesiones con el foco en la fila de legislatura; tabla por legislatura | usar plantilla y `data-v-*`, no 755 frases: mismo truco que la rejilla (527 celdas) |
| **FigAnual** | ¿cuánto se habló cada año? | `agregados_corpus.json › por_anio` (`palabras_paz`, `palabras_guerra`, `sesiones`) · **v3**, filas de habla | existe | nota; tabla; CSV | en ese archivo, 1945 va como «guerra» (5 sesiones, 74.188 palabras): revisar el rótulo con el investigador |
| **FigLegislaturas** | ¿quién ocupa el pleno? | `agregados_corpus.json › ideologia_por_legislatura_sin_presidencia` (p. ej. 1931-1933: 11.444.854 palabras; 511.095 de la Presidencia, excluidas) · **v3** | existe | 3 pequeños múltiplos con la escala ideológica; conmutador «palabras / intervenciones» si el exportador trae las dos | «Sin identificar» se dibuja como ausencia, no como otra ideología |
| **Barra «qué es habla»** (Método) | ¿qué filas no son discurso? | `datos_explorador.json › tramite_y_presidencia`: 13.409 filas de documento (755 SUMARIO + 12.654 COMENTARIOS), 11,02 %; Presidencia 48.353 filas, 44,65 % de las de habla · **v3** | existe | leyenda con n y porcentaje | la Presidencia se atribuye al `rep_id` de quien preside: decirlo |
| **FigAcotaciones** | ¿cómo sonaba el pleno? | acotaciones impresas en el Diario (Aplausos, Rumores, Risas, Protestas…), por legislatura y por 10.000 palabras · `datos_explorador.json › reacciones` · **v3** | existe | tabla; conmutador por clase | **no confundir con los actos afectivos del prototipo**: son acotaciones literales del taquígrafo; rótulo propio; decisión del investigador (§6.11) |
| **FigColumnas** (Datos) | ¿cuánto trae cada columna? | llenado de las 14 columnas por legislatura, medido sobre el **CSV V2** | **hay que medirlo** (trivial) | `title` más `.sr-only` | base V2, no v3 |
| **TiraLegislatura** (ficha) | ¿cuándo se reunió esta legislatura? | subconjunto de FigSesiones · **v3**; sesiones por legislatura del *sidecar*: 405 / 276 / 74 (construido sobre la V2) | con FigSesiones | `<title>`; tabla en `<details>` | el *sidecar* **no se aplica** en el explorador publicado: sus datos pueden ir en el sitio con su fuente, pero no como algo que el explorador enseña |
| **FigAfinidades** | ¿quién firma con quién? | `figs/afinidades/data/afin_red_<leg>.json`, con posiciones `x`,`y` ya calculadas (1931-1933: 476 nodos, 16.144 aristas) y `afin_resumen.json` (475 diputados, 454 activos, 22 aislados, 674 medidas) · base **afin** | existe; **hay que cotejarlo con lo depositado en CGOCUS** | nodos en SVG con `data-tip` (partido, familia, rol) y aristas **rasterizadas** en el build (sharp) o agregadas por familia (`afin_trans_familia.json`) | 16.144 aristas en SVG son cientos de KB (la lección de los 820 KB); **la segunda legislatura se llama «1933-1936» en Afinidades y «1933-1935» en v3**: unificar antes de enlazar |
| **Fila real** (Método) | ¿qué es una fila? | fila 5.424 de la **V2** (y la 5.423 encima), #6079 en el explorador | existe | ninguna | decir que el id cambia entre V2 y v3 |

Cada figura sigue el patrón completo: geometría pura, formas en SVG, rótulos HTML con `fmt.dato`, Pestanas y panel
Datos (CSV, XLSX y LÉAME generado). Una o dos se exportan también como SVG y PNG: FigSesiones y FigLegislaturas son
las candidatas. Todas pasan por `audit-cifras`.

### 6.8 Datos: contrato del exportador

- `src/data/cifras.json` con la forma de ParlaIbero **más `base`**, `{v, t, base, clave, f, d}`. Ejemplo con la
  procedencia real de hoy:
  `"filas.v3": {"v":121700,"t":"int","base":"v3","clave":"CALC","f":"SQLite del explorador, sha256 3a0d8b2d…, tabla speeches","d":"2026-09-22"}`
  y `"filas.V2": {"v":107551,"t":"int","base":"V2","clave":"P","f":"CSV depositado THQCMI V2.0, recuento de filas","d":"…"}`.
  La fecha de la V2 se toma de su recuento, no se inventa.
- `sello.json`: `{exportado, v2_sha256, v3_sha256, v3_manifiesto, afin_version, puertas}`.
- `enlaces.yml` compara una vez por semana el manifiesto que sirve el explorador con `v3_sha256`. Si el explorador
  cambia de corpus, las cifras v3 del sitio quedan **caducadas** y lo avisa.
- `public/datos/procedencia.csv`, igual que en ParlaIbero.

### 6.9 Guardas propias de LyT, convertidas en código

| regla dura | dónde | cómo |
|---|---|---|
| distinguir V2 (107.551) de v3 (121.700) | `cifras.ts`, `audit-cifras.mjs` | `data-base` obligatorio; `<NotaBases>` en toda página con una cifra v3; ninguna clave sin `base`; `filas.V2` y `filas.v3` son claves distintas y ninguna frase del copy lleva un marcador `filas` genérico |
| nada del prototipo de 1931 | `check-i18n.mjs`, `audit-cifras.mjs`, prueba `guardas-lyt` | palabras vetadas en el copy y en `dist/`: `libro de códigos`, `grafo anotado`, `ironía`, `hostilidad`, `solidaridad`, `indignación`, `desprecio`, `entusiasmo`, `intensidad` (esta última solo en su sentido de código; ajustar la expresión); las cifras firma del prototipo (3.874 nodos, 324 oradores, 90 sesiones del debate constituyente, 23.485 relaciones) en una **lista negra de cadenas** que falla si aparecen en `dist/`; una prueba que falla si `src/data/` contiene un archivo de `figs/data/` distinto de `hemiciclo_1936.json` |
| no prometer lo que el explorador no hace | `check-i18n.mjs` | expresiones vetadas **fuera** de las claves `explorador.no_hace.*` y `limites.*`: «búsqueda semántica», «por significado», «semánticamente», «comodín», el operador «NOT», «proximidad», «Mismo diputado» junto a «significado» o «semántic-», y la cabecera de sesión con «Diario», «páginas», «Presidencia» o «Gobierno» en las claves `explorador.*`; además, capturas reales con su LEEME (URL, fecha, sha256 del corpus servido): lo que no sale en una captura no se describe |
| solo cifras verificadas | todo lo anterior y `copy_lectura.py` | ningún número tecleado (`check-i18n`); valor recalculado (`audit-cifras`); `copy_lectura.py` permite al investigador leer el copy con las cifras de hoy antes de aprobarlo |
| que la página no vuelva a abarrotarse | `tests/peso.spec.ts` (nuevo) | presupuesto por página (p. ej. ≤ 150 KB sin comprimir, salvo Corpus y Afinidades con su tope propio) y tope de palabras en `main` de Inicio, como los «tests de rechazo» del copy de ParlaIbero (Inicio ≤ 700 palabras; ≤ 120 de límites) |

### 6.10 Estimación por pieza

Unidad: la jornada de trabajo con agente, verificación incluida. La ruta crítica **no** es el código: son las
aprobaciones del investigador (narrativa, copy, vista previa), como en ParlaIbero, que pasó cuatro puertas.

| pieza | jornadas |
|---|---|
| Andamiaje: configuración, `Base.astro`, rutas sin prefijo, 404, CI, launch | 0,5 |
| Tokens (`tokens.json` → CSS), rampa oro validada, fuentes autoalojadas, tema oscuro por defecto | 0,5–1 |
| Exportador `2REP_Explorer/tools/exportar_sitio.py` (V2 + v3 con sha256, agregado por sesión, llenado de columnas, hemiciclo, Afinidades cotejado, CSV/XLSX, `procedencia.csv`, sello) | 1,5–2 |
| `cifras.ts` e `i18n.ts` adaptados: familias LyT, `base`, arreglo del escape | 0,5 |
| `audit-cifras` y `check-i18n` adaptados, con las tres guardas de LyT | 1 |
| Componentes copiados y ajustados (Pestanas, IndiceLateral, Cita, Captura, Columnas a 3 legislaturas, Salidas, BandaCTA, Vecinas, Tareas) | 1 |
| Hemiciclo como componente, con interacción solo CSS | 0,5 |
| Figuras: FigSesiones 1–1,5 · FigAnual 0,5 · FigLegislaturas 0,5–1 · barra de habla 0,25 · FigAcotaciones 0,5 (si se aprueba) · FigAfinidades 1–1,5 · TiraLegislatura 0,5 | 4,25–5,75 |
| Páginas: Inicio, Corpus, 3 fichas, Método, Datos, Explorador, Afinidades | 2 |
| Endpoints de datos (LÉAME por figura; SVG y PNG de 1–2 figuras) | 0,5 |
| Capturas reales del explorador con Playwright y su LEEME | 0,5 |
| Pruebas (humo, sin JS, solapes, peso, guardas) y CI | 0,5–0,75 |
| `og.mjs` con el hemiciclo | 0,25 |
| **Total técnico** | **≈ 13,5–17,25** |
| Narrativa y copy (`01_NARRATIVA`, `02_COPY_es.md` con marcadores, catálogo de marcadores; puertas del investigador) | 2–3, más el tiempo de revisión del investigador |

### 6.11 Decisiones que necesita el investigador (bloquean construir o publicar, no estudiar)

1. **Solo español**, con las rutas en la raíz. Se recomienda.
2. **¿Financiación con obligación de publicidad para LyT?** Si la hay, se reincorporan `FundingNotice`,
   `check-funding` y `aei.spec` con la referencia que dé. Si no, fuera.
3. **Nombres de personas.** ¿Se nombra a oradores históricos (la fila de Campoamor, los oradores más activos)?
   ParlaIbero lo prohíbe por una directiva propia. En LyT, sin decisión, no se copia el control de nombres.
4. **¿Tienen THQCMI y CGOCUS libro de visitas en Dataverse?** De eso depende el aviso del formulario.
5. **URL definitiva y repositorio.** La landing usa `https://rodrodr.github.io/luz/` como provisional.
6. **Acotaciones del Diario (FigAcotaciones).** Son del corpus, no del prototipo, pero su vecindad temática con los
   «actos afectivos» pide su visto bueno explícito y un rótulo inequívoco.
7. **Tema.** ¿Oscuro siempre por defecto, o respetar la preferencia clara del sistema?
8. **Rótulo de 1945** en las series anuales. En `agregados_corpus.json` va como «guerra».
9. **Números de cuatro cifras.** Agrupar («4.253») como ParlaIbero, o no agrupar, que es la norma habitual en español.
10. **Nombre de la segunda legislatura en Afinidades** («1933-1936») frente al del corpus v3 («1933-1935»).

### 6.12 Riesgos principales

| riesgo | mitigación |
|---|---|
| El sitio vuelve a pesar y a abarrotarse | una figura protagonista por página; `tests/peso.spec.ts`; plantillas en lugar de repetir frases (`data-plantilla`); aristas de Afinidades rasterizadas |
| Una cifra v3 se lee como si fuera la depositada | `data-base` y `<NotaBases>` obligatorios (auditoría) |
| El explorador cambia de corpus y el sitio queda desfasado | sha256 de la v3 en el sello y comprobación semanal |
| Reaparece el prototipo por arrastre de la presentación | vetos de palabras y cifras; prueba sobre `src/data/` |
| Una capacidad del explorador se describe sin existir | vetos en el copy; capturas reales con su LEEME |
| El hemiciclo se lee como un recuento de diputados | ninguna cifra en la figura; la salvedad del croquis en su pie |
