# Petición de diseño al andamiaje

- **De:** dirección de arte.
- **Para:** los dueños de `src/styles/`, `scripts/tokens.mjs`, `src/layouts/Base.astro`, los componentes genéricos y la
  isla `src/scripts/figuras.ts`.
- **Fecha:** 22-09-2026.
- **Norma:** `DESIGN.md`. Implementación de referencia, que se puede copiar: `docs/diseno/fuente/muestra.css` y
  `muestra.js`. Página: `docs/diseno/muestra.html`, que se regenera con `python3 docs/diseno/fuente/gen_muestra.py`.

No se ha tocado nada de `src/`. Cada punto dice qué cambiar, con el valor exacto. Van por orden de prioridad dentro de
cada archivo.

## 1. `src/styles/tokens.json` → `tokens.css`

1. **Nuevo `--accent-inv`**: oscuro `#7A5500`, claro `#C9A24E`. Es el oro dentro de la banda invertida: con el
   `#8C6100` actual, el oro sobre crema da 4,47:1 y no llega a AA.
2. **`--ausencia-trazo`**: oscuro `#6E7169` (3,82:1) y claro `#7D7C70` (3,77:1), en lugar de `hair-2`. La ausencia
   informa y pide 3:1 (WCAG 1.4.11).
3. **Quitar `--sombra-nota`.** El sistema no tiene sombras: la nota emergente se despega por inversión.
4. **Escala tipográfica** (sustituye a la actual; `--fs-h1` pasaba del tope de 6 rem):
   - `--fs-portada: clamp(2.55rem, 1.35rem + 5.1vw, 5.75rem)` *(nuevo)*
   - `--fs-h1: clamp(2.4rem, 1.5rem + 3.9vw, 4.75rem)`
   - `--fs-h2: clamp(1.95rem, 1.35rem + 2.5vw, 3.35rem)`
   - `--fs-h3: clamp(1.3rem, 1.12rem + .75vw, 1.72rem)`
   - `--fs-entrada: clamp(1.22rem, 1.06rem + .68vw, 1.6rem)` (renombra `--fs-lede`; mantener el alias hasta migrar)
   - `--fs-cita: clamp(1.45rem, 1.1rem + 1.45vw, 2.3rem)` *(nuevo)*
   - `--fs-grito: clamp(3.1rem, 1.3rem + 7.4vw, 6rem)` *(nuevo)*
   - `--fs-cifra: clamp(2.5rem, 1.7rem + 3.3vw, 4.4rem)`
   - `--fs-small: clamp(.92rem, .87rem + .2vw, 1.04rem)`
   - `--fs-mono: .8rem`
   - `--fs-mono-s: .75rem` *(nuevo; es el suelo: nada por debajo de 12 px, salvo los números romanos del eje del
     calendario en el móvil, a .62rem y `aria-hidden`)*
5. **Rejilla y ritmo:**
   - `--ancho: 84rem` (antes 80);
   - `--gutter: clamp(1rem, 3.4vw, 3rem)`;
   - `--col-gap: clamp(1rem, 2.2vw, 2rem)` *(nuevo)*;
   - escala `--e1 … --e9` = .25 · .5 · .75 · 1 · 1.5 · 2 · 3 · 4.5 · 7 rem *(nuevo)*;
   - `--aire: clamp(4.5rem, 2rem + 12vw, 16rem)`, que da unos 205 px a 1.440 y 77 px a 375.
6. **`--ease: cubic-bezier(.2, .7, .1, 1)`**: salida exponencial, en lugar de la curva estándar.
7. Añadir a `tokens.json` el bloque `figura` para `og.mjs` y las exportaciones:
   - `rampa-*`;
   - `ausencia-trazo`;
   - cortes de clase calculados por el exportador (no por el CSS).

## 2. `src/styles/base.css`

1. **Enlaces.** `color: inherit`, subrayado en `--accent` de `.07em` con desplazamiento `.2em`. Al pasar el puntero:
   texto en `--accent` y grosor `.12em`. El oro subraya; ya no tiñe el texto de lectura.
2. **`.kicker` → `.asiento`**:
   - `font: 400 var(--fs-mono)/1.5 var(--mono)`;
   - `color: var(--mute)`;
   - sin `text-transform` ni `letter-spacing`;
   - nunca en oro.

   Se mantiene `.kicker` como alias durante la migración y luego se borra. Su contenido es siempre un hecho con su
   base, nunca una etiqueta (DESIGN.md, «La regla del asiento»).
3. **`.boton`**:
   - `font: 560 .98rem/1.1 var(--text)`, en caja normal y sin espaciado; `min-height: 2.75rem`;
   - padding `.55em 1.15em .6em`;
   - primario: relleno oro y texto `--accent-ink`; al pasar el puntero,
     `color-mix(in oklab, var(--accent) 86%, var(--ink))`;
   - `.boton.sec`: transparente, texto `--ink`, filete `--hair-2`; al pasar el puntero, filete y texto en oro.
   - Se quita `.secundario` o queda como alias.
4. **Versalitas simuladas `.versal`**: `text-transform: uppercase; font-size: .8em; letter-spacing: .07em;
   font-weight: 560`. El woff2 servido no trae `smcp` (verificado), así que no se usa `font-variant-caps`.
5. **Comillas por lengua**: `:lang(es) q { quotes: "«" "»" "“" "”"; }` y `:lang(en) q { quotes: "“" "”" "‘" "’"; }`.
   `q` va en cursiva solo dentro de `.texto-largo`, `.registro` y `.cita-diario` (la cursiva es para lo que alguien
   dijo).
6. **Superficies del navegador**:
   - `body { caret-color: var(--accent); scrollbar-color: var(--hair-2) var(--bg); }`;
   - `::selection` ya está bien;
   - dentro de `.tesis`: `::selection { background: var(--bg); color: var(--ink); }`.
7. **`.seccion`**:
   - `padding-block: var(--aire) 0` (y la última también `--aire` abajo);
   - quitar el `border-top` entre secciones: con el aire basta;
   - la gramática es `asiento → h2 → .entrada → figura → nota → llamada`.
8. **Quitar `.salvedad` con `border-left`.** Se sustituye por dos componentes:
   - `.al-margen` en las secciones de Inicio: colocación automática en las columnas 10–12, tras su bloque;
   - `.nota-m` en las lecturas largas.

   En el móvil los dos llevan filete superior `--hair` y `padding-top: .75rem`. CSS completo en
   `muestra.css` («Nota al margen» y «cuerpo de lectura»).
9. **`.con-indice` → `.lectura`**, una rejilla de 12 columnas:
   - índice en `1 / span 3`, pegajoso a `top: 2rem`;
   - `.cuerpo` en `4 / -1`, con `grid-template-columns: repeat(9, minmax(0,1fr))`;
   - hijos del cuerpo en `1 / span 6` y `.nota-m` en `7 / -1`, de modo que la colocación automática sube la nota a la
     fila de su párrafo;
   - en el móvil, una columna.
10. **`.rejilla`**: `grid-template-columns: repeat(12, minmax(0,1fr))` desde 64 rem y una columna por debajo.
    `column-gap: var(--col-gap)`.
11. **Titulares**:
    - `h1` a `--fs-h1` con interlineado 1.02;
    - `h2` a `--fs-h2` con 1.06;
    - `.pagina-cabeza h1` hasta `13ch`;
    - encima de un H2 hay `--e8`; debajo, `--e4`.
12. **Movimiento** (todo dentro de `prefers-reduced-motion: no-preference`):
    - `.entra` se usa **una vez por página** como mucho, no en cada sección;
    - `@view-transition { navigation: auto; }`;
    - las reglas del hemiciclo y del calendario de `muestra.css`, bloque «MOVIMIENTO».
13. **Impresión**: cabecera, utilidades y pestañas de figura ocultas; los tres paneles de cada figura, visibles.

## 3. `src/layouts/Base.astro`

1. **Guion de tema en `<head>`, antes de pintar**:
   - lee `localStorage('tema')`;
   - si no hay nada guardado, sigue `prefers-color-scheme`.
   El botón nace con `hidden` y lo destapa la isla. Su `aria-label` nombra el estado al que lleva («Tema claro» o
   «Tema oscuro»). El cambio va dentro de `document.startViewTransition` si existe y no se pidió menos movimiento.
2. **Sprite de iconos dibujados** (`<svg width=0 height=0>` con `<symbol>`), copiado de `gen_muestra.py`:
   - `i-ext`: flecha diagonal;
   - `i-tema`: medio disco;
   - `i-copiar`;
   - `i-bajar`;
   - `i-marca`: tres U concéntricas del hemiciclo.

   Se retiran los caracteres ◐, ↗ y → como iconos.
3. **Favicon y marca**: `i-marca` en una tinta. Sale de la geometría y no es dato.
4. **Fuentes**:
   - `latin` y `latin-ext` de las tres familias;
   - `<link rel=preload>` solo de `cormorant-garamond-latin-wght-italic.woff2` en Inicio;
   - `@font-face` de respaldo sobre Georgia con `size-adjust` para evitar el salto de la portada.
5. «Saltar al contenido» invertido (`--ink` sobre `--bg`) y visible al recibir el foco.

## 4. Componentes genéricos (`src/components/`)

| componente | lo que pide DESIGN.md |
|---|---|
| `Cabecera.astro` | Rejilla con las áreas `marca · nav · util`, en una fila desde 72 rem. Marca: `i-marca` en oro, más «Luz y Taquígrafos» en Cormorant cursiva 1,55 rem y el descriptor a 0,9 rem `--mute`, oculto por debajo de 40 rem. Dos `<ul>` con `aria-label` («La historia», «La base»), separados por un filete `--hair-2`. Enlaces en EB Garamond 1,02 rem y `--ink-2`; el activo lleva `aria-current="page"`, tinta y `border-bottom: 2px solid var(--accent)`. ES · EN en mono `.75rem` con dianas de 44 px. Botón de tema redondo de 44 px |
| `IndiceLateral.astro` | `ol` con filete izquierdo `--hair` y número por `counter(ind, decimal-leading-zero)` en mono. El actual lleva `aria-current="location"` y un filete oro de 1 px. Los subapartados H3 van sin número. En el móvil, `<details>`; desde 64 rem, pegajoso con el `summary` oculto |
| `Pestanas.astro` | Radios nativos `.v-g/.v-t/.v-d` y paneles `[data-panel]`, con `@supports selector(:has(*))` para ocultar los no elegidos. Seleccionada: tinta y subrayado oro de 2 px. Sin `:has()`, los tres paneles apilados con un filete discontinuo. La isla sincroniza el hash |
| `NotaMargen.astro` *(nuevo)* | Props: `asiento` (mono), `n` (número de llamada) y el texto (≤ 40 palabras). Dos variantes: `al-margen` (secciones) y `nota-m` (lecturas) |
| `CitaDiario.astro` *(nuevo)* | Props: orador, cita, ids V2 y v3, palabras y `presidencia` opcional. Orador en `.versal`; cita en EB Garamond cursiva `--fs-cita` con `text-indent: -.45em`; asiento debajo. Nunca se reproduce el encabezamiento impreso |
| `FilaDatos.astro` *(nuevo)* | `dl` en rejilla de 2 columnas (4 desde 48 rem). La clave va en mono `--mute` y el valor en mono .88 rem; `speech` ocupa todo el ancho, en cursiva de libro, cortado con «[…]». Pie en mono con cuántas de las 14 columnas se enseñan |
| `Registro.astro` *(nuevo)* | Cada entrada es un `<a>` con fecha en mono (11 rem), título y recuento a la derecha. Hover: fondo `--bg-2` y subrayado oro del título. Se usa en las puertas, las sesiones de las etapas IV y V y la lista de Sesiones |
| `CifraFrase.astro` *(nuevo)* | `<data class="cifra">` en Cormorant cursiva `--fs-cifra` con `lnum`, **dentro** de un `<p>` que sigue con la salvedad; filetes entre cifras; la base va en una `NotaMargen` |
| `BandaTesis.astro` | Única en todo el sitio. Redefine `--accent: var(--accent-inv)`. El grito lleva la comilla colgada (`margin-left: -.36em`) solo desde 64 rem. Rejilla: asiento en `1/span 3`, tesis en `4/span 7` y credencial en `4/-1` |
| `Boton.astro` | Props: `variante` (`primario` · `sec`), `externo` (añade `i-ext`) y `copiar` (añade `i-copiar` y el estado «Copiada» durante 1,6 s) |
| `Pie.astro` | El orden fijo del plan. Tres columnas de 4 y la línea de ediciones a todo el ancho, en mono `.75rem` y sin `max-width`. Los títulos de columna son `<p class="pie-t">` y no `h2` pequeños, que aplanaban la jerarquía según el detector |
| `Hemiciclo.astro` | En el build, cada escaño lleva `data-b` (el bloque) y `style="--o:N"`, con N = (r − rmin)/(rmax − rmin)·900 + ((ángulo+180) mod 360)/180·160 ms. Las rutas de la estructura llevan `pathLength="1"`. La leyenda son 4 radios, uno por bloque, más «Ver todos los bloques». `.hemi { color: var(--mute) }` y la estructura al 80 %. Código en `gen_muestra.py` |

## 5. Isla de figuras (`src/scripts/figuras.ts`, ≤ 35 KB gz)

1. **Nota emergente.** Invertida (`--ink` sobre `--bg`), con tres líneas:
   - qué: EB Garamond 600, 1 rem;
   - cifras: mono .76 rem;
   - base y fuente: mono .7 rem al 72 %.

   Se posiciona así:
   - sobre la marca, acotada al ancho de la figura;
   - debajo si no cabe arriba;
   - flecha de 10 px en `--flecha`.

   Se comporta así:
   - aparece con el puntero, el foco y el toque, y Esc la cierra;
   - **se puede recorrer con el puntero**: `pointer-events: auto` sobre la nota y 150 ms de gracia antes de ocultarla,
     que es lo que falta en la muestra (WCAG 1.4.13);
   - no caduca.
2. **Plantilla, no frase.** `data-plantilla` y `data-v-*`. El número se formatea con agrupación **siempre**
   (1.843, 1.460): `Intl.NumberFormat('es-ES')` no agrupa las cifras de cuatro dígitos, así que `fmt.dato()` necesita su
   propia regla (la de la muestra es `/\B(?=(\d{3})+(?!\d))/`).
3. **Teclado.** Una parada por grupo (`tabindex=0` en la etapa); ← → recorren, más Inicio y Fin; Esc cierra. La región
   `aria-live` se escribe solo al recorrer con teclado. Nada de `role="grid"`. La marca activa lleva un contorno de 2 px
   en `--ink` con 1 px de separación.
4. **Entrada del calendario.** Solo si la figura empieza por debajo del pliegue y no se pidió menos movimiento:
   - la isla pone `.espera` y la cambia por `.entra` con un IntersectionObserver al 25 %;
   - cada celda lleva `--n` (índice cronológico del mes);
   - `transition-delay: calc(var(--n) * 7ms)`.

   Sin JS, la rejilla se ve completa.
5. **Custom elements para los momentos pesados** (`<lyt-diario-fila>`, `<lyt-red>`): `import()` al entrar en pantalla,
   con pausa fuera de ella y con `visibilitychange`, y DPR ≤ 1,5. Su peso **no** cuenta en los 35 KB de la isla; lleva
   su presupuesto propio en `tests/peso.spec.ts` (DESIGN.md, «Movimiento y medios expresivos»).
6. **Volver a enlazar al sustituir una figura** (defecto heredado de ParlaIbero) y destapar la frase «Con el
   teclado…».

## 6. Pruebas que conviene añadir

- `humo.spec`:
  - a 360 y 375 px, `scrollWidth <= innerWidth` en los dos temas;
  - la cabecera, en dos filas sin menú.
- `contraste.spec`: los pares de la tabla de DESIGN.md › Colors, en los dos temas (`apagado` nunca sobre `--bg-3`).
- `movimiento.spec`: con `reducedMotion: 'reduce'`, ninguna animación en curso y todas las celdas visibles.
- El detector de impeccable sobre `dist/es/index.html` y una ficha. Los avisos que ya se aceptan por diseño son los
  cinco que dio la muestra:
  - los filetes sin sangría del registro y del índice;
  - la banda a sangre;
  - `overflow-x: clip` en `body`;
  - el hemiciclo, que el detector toma por «ilustración» y es geometría fijada.
