---
name: Luz y Taquígrafos
description: Los Diarios de Sesiones del Congreso, 1931–1945, compuestos como un Diario anotado al margen.
colors:
  fondo: "#0F110E"
  fondo-2: "#161913"
  fondo-3: "#1C2019"
  tinta: "#EFE7D8"
  tinta-2: "#C9C3B4"
  apagado: "#8E8F86"
  oro: "#C9A24E"
  oro-tinta: "#0F110E"
  oro-invertido: "#7A5500"
  foco: "#9EC1FF"
  rampa-0: "#8A6705"
  rampa-1: "#A78129"
  rampa-2: "#C49D49"
  rampa-3: "#E1B966"
  rampa-4: "#FFDB91"
  ausencia-trazo: "#6E7169"
  fondo-claro: "#F6F2E9"
  fondo-2-claro: "#EFE9DB"
  fondo-3-claro: "#E6DFCD"
  tinta-claro: "#1A1C16"
  tinta-2-claro: "#45483D"
  apagado-claro: "#676A61"
  oro-claro: "#8C6100"
  oro-tinta-claro: "#F6F2E9"
  oro-invertido-claro: "#C9A24E"
  foco-claro: "#1558D6"
  rampa-0-claro: "#AC8031"
  rampa-1-claro: "#976B16"
  rampa-2-claro: "#805903"
  rampa-3-claro: "#684702"
  rampa-4-claro: "#513601"
  ausencia-trazo-claro: "#7D7C70"
typography:
  portada:
    fontFamily: "Cormorant Garamond Variable, Georgia, serif"
    fontSize: "clamp(2.55rem, 1.35rem + 5.1vw, 5.75rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.012em"
  display:
    fontFamily: "Cormorant Garamond Variable, Georgia, serif"
    fontSize: "clamp(2.4rem, 1.5rem + 3.9vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Cormorant Garamond Variable, Georgia, serif"
    fontSize: "clamp(1.95rem, 1.35rem + 2.5vw, 3.35rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  title:
    fontFamily: "EB Garamond Variable, Georgia, serif"
    fontSize: "clamp(1.3rem, 1.12rem + 0.75vw, 1.72rem)"
    fontWeight: 600
    lineHeight: 1.16
  entrada:
    fontFamily: "EB Garamond Variable, Georgia, serif"
    fontSize: "clamp(1.22rem, 1.06rem + 0.68vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.34
  cita:
    fontFamily: "EB Garamond Variable, Georgia, serif"
    fontSize: "clamp(1.45rem, 1.1rem + 1.45vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 1.26
  body:
    fontFamily: "EB Garamond Variable, Georgia, serif"
    fontSize: "clamp(1.06rem, 0.98rem + 0.38vw, 1.24rem)"
    fontWeight: 400
    lineHeight: 1.58
    fontFeature: "\"tnum\" 1"
  nota:
    fontFamily: "EB Garamond Variable, Georgia, serif"
    fontSize: "clamp(0.92rem, 0.87rem + 0.2vw, 1.04rem)"
    fontWeight: 400
    lineHeight: 1.5
  cifra:
    fontFamily: "Cormorant Garamond Variable, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.7rem + 3.3vw, 4.4rem)"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "\"lnum\" 1"
  grito:
    fontFamily: "Cormorant Garamond Variable, Georgia, serif"
    fontSize: "clamp(3.1rem, 1.3rem + 7.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  asiento:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
  dato:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  base: "2px"
  celda: "1px"
spacing:
  e1: "0.25rem"
  e2: "0.5rem"
  e3: "0.75rem"
  e4: "1rem"
  e5: "1.5rem"
  e6: "2rem"
  e7: "3rem"
  e8: "4.5rem"
  e9: "7rem"
  aire: "clamp(4.5rem, 2rem + 12vw, 16rem)"
  gutter: "clamp(1rem, 3.4vw, 3rem)"
  col-gap: "clamp(1rem, 2.2vw, 2rem)"
  medida: "38rem"
  ancho: "84rem"
components:
  boton-primario:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.oro-tinta}"
    rounded: "{rounded.base}"
    padding: "0.55em 1.15em 0.6em"
    height: "2.75rem"
  boton-secundario:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.base}"
    padding: "0.55em 1.15em 0.6em"
    height: "2.75rem"
  nota-emergente:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.fondo}"
    rounded: "{rounded.base}"
    padding: "0.55rem 0.75rem 0.6rem"
  banda-invertida:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.fondo}"
  asiento:
    textColor: "{colors.apagado}"
    typography: "{typography.asiento}"
  celda-calendario:
    rounded: "{rounded.celda}"
    height: "clamp(1.45rem, 2.4vw, 1.9rem)"
---

# Design System: Luz y Taquígrafos

> **Rediseño del 23-09-2026** (`docs/REDISENO_23-09.md`). Manda sobre lo que sigue donde choque:
> - **Inicio: «El Diario, abierto».** La misma tipografía de impreso, sin el aparato de márgenes: ni asientos V2/v3, ni
>   chapas de edición, ni salvedades. La «regla del margen vivo» queda para las citas (orador y fecha) y para la
>   documentación (Método, Datos).
> - **Figuras que se juegan** en Inicio: el laboratorio de palabras con su calendario (`components/inicio/Laboratorio.astro`),
>   «¿Cuántos votaron sí?» (`components/inicio/Apuesta.astro`) y F21 en escaparate (`FigRed escaparate`). Respuesta
>   inmediata a la mano (arrastrar, escribir, recorrer con ← →), trazos que se dibujan al elegir (≤ 900 ms, nada en bucle,
>   todo dentro de `prefers-reduced-motion: no-preference`) y un estado estático completo sin JS.
> - **Menos aire:** entre secciones de Inicio, `clamp(2.5rem, 4.5vw, 4.5rem)` de relleno (antes, `--aire` hasta 16 rem).
> - La leyenda del hemiciclo se pliega en sus cuatro bloques; las minorías aparecen al elegir uno.

<!-- Mundo establecido por el investigador (identidad fijada en PRODUCT.md, docs/00_PLAN_sitio.md § Diseño visual,
     la landing y la presentación de aecpa2026). Este documento lo documenta y lo amplía; no lo sustituye.
     Página muestra que lo enseña: docs/diseno/muestra.html (fuentes en docs/diseno/fuente/). -->

## Overview

**Creative North Star: «El Diario, anotado al margen»**

El sitio se compone como se leería un Diario de Sesiones en el que un investigador ha trabajado a lápiz. La columna
de lectura es el impreso: serif de libro, medida de libro, lo que alguien dijo en cursiva y el orador en versalitas,
como lo compuso la imprenta de las Cortes. El margen es del investigador: ahí van, en mono y en oro, el asiento de
cada frase (la fila V2 y v3 de donde sale), su base y su salvedad. Lo que en otro sitio sería una nota a pie, aquí
se ve al lado de la frase que matiza. Así la costura que PRODUCT.md exige enseñar se vuelve el rasgo que hace
reconocible el sitio.

La noche es la superficie: crema sobre casi negro, porque el lector principal (la investigadora que evalúa la base
antes de descargarla) lee largo, junto a su R o su Python, a menudo de tarde. El oro no decora: **anota**. Marca lo
activo, subraya los enlaces, numera las notas y pinta los datos. El azul solo aparece para el foco del teclado. La
ideología solo se colorea donde la figura trata de ideología. El hemiciclo de Gil Robles, trazado como el plano de
arquitectura que es, abre la portada. Es la única imagen del sitio que no es un gráfico de datos, y no se retoca.

Densidad controlada por bloque: cada sección repite la misma gramática (asiento · título · entrada · figura o lista ·
nota al margen · llamada) con mucho aire entre secciones. Nada de tarjetas, iconos, contadores ni bandas de cifras.
La profundidad vive en páginas propias. Se rechaza de forma explícita la versión anterior: pobre, amontonada, sin
figuras interactivas y demasiado resumida. También sus tics: antetítulos en mono versal y oro sobre cada título,
botones en mono de mayúsculas espaciadas y la banda de cifras.

**Key Characteristics:**
- Columna de lectura a 38 rem, con un margen vivo que lleva el asiento, la base y la salvedad de cada afirmación.
- Cormorant Garamond cursiva para la voz del sitio (títulos, marca, cifras grandes); EB Garamond para leer; EB
  Garamond cursiva solo para lo que alguien dijo; JetBrains Mono solo para datos, ids y fechas de registro.
- Oro como tinta del anotador; azul solo para el foco; ideología solo en las figuras de ideología.
- Una sola banda invertida en todo el sitio: la tesis «Luz y taquígrafos.».
- Figuras con datos reales, pestañas Gráfico · Tabla · Datos, nota emergente invertida y ausencia dibujada como contorno.
- Movimiento que cuenta algo y se hace con la plataforma: la Cámara se sienta, el tiempo corre, la tinta se vuelve fila.

## Colors

Paleta contenida: dos neutros cálidos que se invierten por tema, un oro que anota y un azul que solo señala el foco.
Los datos llevan una rampa en oro. La ideología y el hemiciclo tienen su paleta propia, acotada a sus figuras.

### Primary
- **Oro del anotador** (#C9A24E oscuro · #8C6100 claro): enlace activo en la cabecera, subrayado de los enlaces,
  número volado de las notas, numeral romano de etapa, botón primario, pestaña seleccionada y serie resaltada. Nunca
  en superficies grandes ni en el texto de lectura.
- **Oro invertido** (#7A5500 sobre la banda crema del tema oscuro · #C9A24E sobre la banda negra del claro): el oro
  dentro de la banda de la tesis. Se añade porque #8C6100 sobre #EFE7D8 da 4,47:1 y no llega a AA.

### Secondary
- **Azul de foco** (#9EC1FF oscuro · #1558D6 claro): anillo `:focus-visible` de 3 px con 3 px de separación. Es
  distinto del oro a propósito: el foco no se confunde con la anotación.

### Neutral
- **Casi negro de imprenta** (#0F110E) / **papel de Diario** (#F6F2E9): fondo.
- **Superficie de nota** (#161913 / #EFE9DB): código, filas en hover, panel de datos.
- **Banda** (#1C2019 / #E6DFCD): reservada; en el claro no admite texto `apagado` (4,1:1).
- **Crema de lectura** (#EFE7D8) / **tinta** (#1A1C16): texto principal.
- **Tinta segunda** (#C9C3B4 / #45483D): entradas atenuadas, notas al margen, pies de figura.
- **Apagado** (#8E8F86 / #676A61): asientos, ejes, fechas del registro y rótulos de columna. Solo sobre `fondo` y
  `fondo-2`.
- **Filetes** (crema al 12 % y 22 % · tinta al 14 % y 28 %): separan, nunca informan. Lo que informa usa
  `ausencia-trazo`.

### Datos
- **Rampa en oro, 5 clases** (oscuro #8A6705 → #FFDB91; claro #AC8031 → #513601). Más palabras, más contraste con el
  fondo en los dos temas. Clases por cuantiles sin interpolar, con los cortes impresos en la leyenda.
- **Ausencia** (`ausencia-trazo` #6E7169 · #7D7C70): contorno de 1 px, sin relleno. Sube desde el `hair-2` del plan
  porque la ausencia es información y pide 3:1 (WCAG 1.4.11).
- **Ideología** (`--ei --i --ci --c --cd --d --ed --nc`, del plan): solo en F09, en F26 con nombres y en F21.
- **Hemiciclo** (`--g-*`, 18 minorías de `hero_vars.css`): solo en la portada y en la imagen social.

### Contraste medido (WCAG 2.2)

| par | oscuro | claro |
|---|---|---|
| tinta / fondo | 15,44 | 15,39 |
| tinta-2 / fondo | 10,80 | 8,36 |
| apagado / fondo · / fondo-2 | 5,80 · 5,43 | 4,93 · 4,55 |
| oro / fondo · / fondo-2 | 7,92 · 7,41 | 4,91 · 4,54 |
| oro-tinta / oro (botón) | 7,92 | 4,91 |
| oro invertido / banda | 5,47 | 7,17 |
| foco / fondo | 10,41 | 5,53 |
| rampa-0 (la más baja) / fondo | 3,63 | 3,19 |
| ausencia-trazo / fondo | 3,82 | 3,77 |

### Named Rules
**La regla del lápiz.** El oro es la tinta del anotador. Si algo en oro no está marcando, enlazando o midiendo, se
quita. Nunca ocupa más del 10 % de una pantalla, salvo en el calendario, donde el oro es el dato.

**La regla del recálculo.** El claro no invierte: cada color conserva matiz y croma y baja de luminosidad hasta el
contraste exigido. Las atenuaciones (`--atenua` .18 / .28) y los contornos se calibran por tema, nunca se transportan.

**La regla del azul.** El azul es del teclado. No aparece en enlaces, datos ni decoración.

## Typography

**Display Font:** Cormorant Garamond Variable, cursiva (Georgia de respaldo)
**Body Font:** EB Garamond Variable (Georgia de respaldo)
**Label/Mono Font:** JetBrains Mono Variable (ui-monospace de respaldo)

**Character:** Una garamond de titular, alta y cursiva, que da voz al sitio, y otra de libro para leer largo. La
mono es la del registro: los números, los ids y las fechas que el lector va a copiar.

### Hierarchy
- **Portada** (Cormorant cursiva 500; clamp 2,55 → 5,75 rem; interlineado 1; medida 12 ch): solo el H1 de Inicio.
- **Display** (Cormorant cursiva 500; clamp 2,4 → 4,75 rem; 1,02; 13–16 ch): H1 de página y nombre de etapa.
- **Headline** (Cormorant cursiva 500; clamp 1,95 → 3,35 rem; 1,06; hasta 20 ch): H2 de sección, que suele ser una
  pregunta.
- **Title** (EB Garamond 600; clamp 1,3 → 1,72 rem; 1,16): H3 de los apartados largos. Baja a la garamond de libro
  para no cansar en las fichas.
- **Entrada** (EB Garamond 400; clamp 1,22 → 1,6 rem; 1,34; 34 rem): la frase grande bajo cada H2.
- **Cita del Diario** (EB Garamond cursiva 400; clamp 1,45 → 2,3 rem; 1,26; 30–32 ch): lo que alguien dijo, con la
  comilla de apertura colgada (sangría −0,45 em).
- **Body** (EB Garamond 400; clamp 1,06 → 1,24 rem, 17–20 px; 1,58; medida 38 rem, unos 68 caracteres).
- **Nota** (EB Garamond 400; clamp 0,92 → 1,04 rem; 1,5; hasta 30 rem): notas al margen, pies de figura, salvedades.
- **Cifra** (Cormorant cursiva 500; clamp 2,5 → 4,4 rem; `lnum`): las tres cifras de cada ficha, siempre dentro de
  su frase.
- **Grito** (Cormorant cursiva 500; clamp 3,1 → 6 rem; 0,98; −0,02 em): solo «Luz y taquígrafos.» en la banda.
- **Asiento** (JetBrains Mono 400; 0,8 rem; 1,5; **caja normal**, sin espaciado añadido, color `apagado`): la línea de
  registro.
- **Dato** (JetBrains Mono 400; 0,75 rem = 12 px, suelo absoluto): ejes, cortes de leyenda, totales, claves de columna.
- **Versalitas** (EB Garamond, mayúscula al 0,8 em, +0,07 em, peso 560): el orador sobre la cita y «Presidencia». Son
  **simuladas**: el woff2 de `@fontsource-variable/eb-garamond` no trae `smcp`, `c2sc`, `onum` ni `lnum` (verificado
  con fontTools). El peso variable compensa el trazo.

### Named Rules
**La regla de la cursiva.** En la garamond de lectura, la cursiva es para lo que alguien dijo: citas del Diario, el
campo `speech`, títulos que son una frase citada («España ha dejado de ser católica»). Además, por ortografía, los
títulos de obras. Nunca para enfatizar: el énfasis se hace con peso 600.

**La regla del asiento.** Donde el plan pide un «antetítulo en mono», va un asiento: un hecho con su base («V2 · 755
sesiones · 14-VII-1931 → 9-XI-1945»), en caja normal y en gris. Nunca una etiqueta de género («POR QUÉ IMPORTA»),
nunca en mayúsculas espaciadas, nunca en oro.

**La regla de la mono.** La mono aparece donde el lector copiaría o compararía: ids, fechas de registro, claves de
columna, ejes, cortes y la credencial. En la prosa, las cifras van en EB Garamond (`tabular-nums`). Los botones y la
navegación van en EB Garamond, no en mono.

**Comillas por lengua.** `:lang(es) q { quotes: "«" "»" "“" "”"; }` y `:lang(en) q { quotes: "“" "”" "‘" "’"; }`.
Espacio de no separación en «0,83 %», «p. 524» y «art. 34».

## Layout

**Rejilla editorial de 12 columnas** desde 64 rem. Ancho máximo 84 rem (1.344 px a 1.440), margen lateral
clamp(1 rem, 3,4 vw, 3 rem) (16 px en el móvil) y calle clamp(1 rem, 2,2 vw, 2 rem). Por debajo de 64 rem, una sola
columna. **La asimetría solo existe en escritorio.**

**Ritmo vertical.** Base de 4 px y escala con nombre e1–e9 (0,25 → 7 rem). Entre secciones, `--aire` = clamp(4,5 rem,
2 rem + 12 vw, 16 rem): unos 205 px a 1.440 y 77 px a 375. Encima de un título siempre hay más aire que debajo: H2
e8 arriba y e4 abajo; H3 e7 y e4.

**Gramática de sección** (todas las plantillas): asiento → H2 → entrada → figura o lista → nota al margen (≤ 40
palabras) → llamada. La nota al margen sigue a su bloque en el DOM. La colocación automática de la rejilla la sube a
la misma fila en escritorio; en el móvil va detrás.

### Esquemas por plantilla

**A · Inicio** (Persuadir y leer; ≤ 700 palabras)
```
1440 ┌ cabecera: marca+descriptor │ Las Cortes · El Diario ┃ Método · Datos · Explorador · Afinidades │ ES EN ◐ ┐
     │ col 1–5: H1 portada (4 líneas)          │ col 6–12: HEMICICLO (≈770 px de ancho)                 │
     │          entrada · [Abrir ↗] [Datos]     │           leyenda en 4 bloques-radio · pie del croquis  │
     ├──────────────── BANDA INVERTIDA a sangre: «Luz y taquígrafos.» (grito, col 1–12) ───────────────────┤
     │ col 1–3 asiento (fecha · V2/v3 · 3 palabras) │ col 4–10 tesis en entrada │ col 4–12 credencial mono │
     │ ── aire ── col 1–7 asiento · H2 · entrada                                                           │
     │ col 1–9 FIGURA F01c (barra: título │ Gráfico·Tabla·Datos)   │ col 10–12 nota al margen               │
     │ col 1–9 llamada                                                                                     │
     │ ── aire ── ¿Qué es una fila? (Presidencia · cita · fila) │ nota │ …registro de puertas │ nota │ … pie │
375  │ marca ··········· ES EN ◐ │ Las Cortes · El Diario │ ┃ Método · Datos · Explorador · Afinidades │
     │ H1 (3–4 líneas) · entrada · botones apilados · HEMICICLO a 343 px · leyenda 2×2 · pie              │
     │ banda · asiento · tesis · credencial │ H2 · entrada · figura a lo ancho · nota detrás · llamada │ …  │
```

**C · Ficha de etapa y E · puerta de lectura** (lectura histórica)
```
1440 │ miga mono «Las Cortes / I»                                      numeral romano en contorno ─┐    │
     │ H1 display (col 1–7) · asiento (fechas · sesiones · serie [proyecto]) · entrada (pregunta)  I │    │
     │ col 1–3 ÍNDICE pegajoso (01…09, «dónde estoy»)│ col 4–9 TEXTO 38 rem │ col 10–12 MARGEN          │
     │                                               │ H2 · párrafo¹        │ ¹ asiento V2 · v3 + nota  │
     │                                               │ CITA DEL DIARIO      │                           │
     │ col 4–12 FIGURA F01e (texto+margen) · F05 · F09 con NotaBases                                    │
     │ vecinas: ← etapa anterior · índice · siguiente →                                                 │
375  │ miga · H1 · asiento · entrada · <details> «En esta ficha» · texto · nota tras su párrafo · figura │
```

**G · Método, H · Datos, I · Versiones** (lectura técnica; Leer y Operar)
```
1440 │ H1 · entrada │ col 1–3 índice numerado (la secuencia informa) │ col 4–9 apartado │ col 10–12 margen   │
     │ tablas de columnas (F32) a col 4–12, cabecera pegajosa, alineación decimal a la derecha           │
     │ [Descargar los datos] y [Abrir el explorador ↗] en la BANDA FIJA inferior (solo Método y Explorador)│
375  │ índice en <details> · tablas en marco con desplazamiento propio y primera columna fija             │
```

**J · Explorador y K · Afinidades**
```
1440 │ H1 · entrada · qué hace y qué no (dos columnas: «Hoy puede» │ «No hace», con contorno discontinuo) │
     │ capturas reales en placa (col 1–8) con pie y ampliación sin JS │ margen: requisitos, peso, edición   │
     │ Afinidades: F21 red (col 1–9, lienzo 16:10) │ margen: buscador del censo, leyenda, salvedad          │
375  │ capturas a lo ancho · la red en póster SVG con [Abrir la red interactiva] · lista de coautores     │
```

### Named Rules
**La regla del margen vivo.** Toda afirmación con cifra o cita tiene su asiento en el margen (escritorio) o tras
su párrafo (móvil). Si no cabe en 40 palabras, no es una nota: es un apartado.

**La regla de una figura.** Una figura protagonista por página; dos como mucho en Las Cortes y Sesiones.

## Elevation & Depth

Plano por completo: **sin sombras**. La profundidad sale de tres recursos: los filetes (1 px), la superficie
`fondo-2` y la inversión. Lo que flota sobre el contenido (la nota emergente, «Saltar al contenido») se invierte:
fondo `tinta` y texto `fondo`. El contraste de la inversión basta para despegarlo, sin halo ni desenfoque.

### Named Rules
**La regla del papel.** Nada se levanta del papel. Si una superficie necesita sombra para leerse, le falta un filete
o sobra.

## Shapes

Esquinas de imprenta: radio de 2 px en botones, notas y código; 1 px en las celdas de datos; círculo solo en el
botón de tema (44 px). Filetes de 1 px (2 px solo para el subrayado del elemento activo). El trazo codifica: **el
contorno continuo es una ausencia medida** (mes sin sesión); **el discontinuo es lo que la base no trae o no está
revisado** (las cuatro cajas vacías de Inicio, el salto 1939–1944, lo pendiente de revisión). El hemiciclo es
geometría del plano del Congreso, con escaños de 12,6 × 15 y radio 2,2, y no se redibuja.

## Components

### Buttons
- **Forma:** caja con radio de 2 px y 44 px de alto como mínimo. Etiqueta en EB Garamond 560 a 0,98 rem, en caja
  normal, con infinitivo y objeto («Descargar los datos»).
- **Primario:** relleno oro y texto `oro-tinta`. Uno por pantalla como mucho. En la portada, la escalera de Inicio y
  la banda fija, el primario es **«Abrir el explorador»**, delante; «Descargar los datos» es secundario (decisión del
  investigador, 23-09-2026). En Datos, la descarga sigue siendo el primario de su página.
- **Secundario:** transparente, texto en tinta, filete `hair-2`. Al pasar el puntero, filete y texto en oro.
- **Externo:** añade el icono dibujado de flecha diagonal (SVG de 16 px, trazo 1,4). Nunca el carácter «↗».
- **Copiar:** secundario con icono de copia. Tras copiar, la etiqueta dice «Copiada» durante 1,6 s.

### Cabecera (seis pestañas en dos grupos)
- No es pegajosa. Marca en Cormorant cursiva 1,55 rem con el hemiciclo mínimo en oro (tres U concéntricas sacadas de
  la geometría de la planta). El descriptor va en EB Garamond 0,9 rem `apagado` y se oculta por debajo de 40 rem.
- Pestañas en EB Garamond 1,02 rem, en caja normal y color `tinta-2`: **Las Cortes · El Diario** ┃ **Método · Datos ·
  Explorador · Afinidades**. Los grupos se separan con un filete vertical `hair-2`. Activa: tinta y subrayado oro de 2 px.
  **Explorador**, la acción primaria de la cabecera, va siempre en oro y a 600 (activa, además, con su subrayado).
- Cabecera de página a **dos columnas** desde 64 rem en todas las plantillas: título y entrada en 7 de 12 columnas y, al
  margen (9-12), las chapas de las bases de la página (`CabezaPagina bases`), apoyadas abajo con un filete `hair`.
  Datos lleva ahí la descarga; Afinidades compone su propia primera vista.
- ES · EN en mono de 0,75 rem, con dianas de 44 px. Botón de tema redondo de 44 px con icono dibujado; su rótulo
  nombra el estado al que lleva.
- En una fila desde 72 rem; por debajo, marca y utilidades arriba y los dos grupos debajo. Sin menú hamburguesa; nada
  desborda a 360 px.

### Índice lateral
- Pegajoso desde 64 rem y `<details>` en el móvil. Filete izquierdo `hair`; número en mono `decimal-leading-zero`
  por contador CSS; «dónde estoy» con filete oro de 1 px y texto en tinta, calculado con `view-timeline`. Los
  subapartados H3, sin número.

### Pestañas Gráfico · Tabla · Datos
- Radios nativos y `:has()`, en la barra de la figura, a la derecha del título. Seleccionada: tinta y subrayado oro de
  2 px. Sin `:has()`, los tres paneles se leen seguidos, separados por un filete discontinuo.
- La isla añade el hash (`#f01c-tabla`) para enlazar directamente a una pestaña (patrón GOV.UK/APG).

### Notas al margen
- EB Garamond de nota, `tinta-2`, asiento en mono arriba (número de la llamada · base · ids).
- La llamada es un número volado en mono oro de 0,66 em. En escritorio, la nota ocupa la fila de su párrafo
  (columnas 10–12); en el móvil va detrás del párrafo, con filete superior.

### Cita del Diario
- Orador en versalitas simuladas `tinta-2` encima; la cita en EB Garamond cursiva de cita, con comilla colgada; el
  asiento debajo (V2 · v3 · palabras). La Presidencia, cuando precede, va en una línea pequeña, con su cita en cursiva.
- Nunca se inventa el encabezamiento impreso («El Sr. …:»): se escribe el nombre normalizado del sitio.

### Fila de datos
- Pares clave-valor en rejilla de 2 columnas (4 desde 48 rem), con filetes entre filas. La clave va en mono `apagado`
  de 0,75 rem y el valor en mono de 0,88 rem. `speech` ocupa todo el ancho, en cursiva de libro y cortado con «[…]».
- Pie en mono: cuántas de las 14 columnas se enseñan y dónde están las demás.

### Registro (puertas, sesiones)
- Una línea por entrada, toda ella un enlace: fecha en mono `apagado` (11 rem en escritorio) · qué pasó en EB
  Garamond 1,12 rem (en cursiva si es una frase citada) · recuento en mono alineado a la derecha. Hover: fondo
  `fondo-2` y subrayado oro del título. No son tarjetas.

### Cifras en frase
- La cifra en Cormorant cursiva grande, **dentro** de su frase, que sigue en cuerpo de lectura con la salvedad. Se
  apilan como un libro de registro, con filetes. La base, en el margen. No son la «banda de cifras».

### Banda invertida (tesis)
- La única del sitio. Fondo `tinta`, texto `fondo`, oro invertido. El grito, a todo lo ancho, con la comilla colgada
  desde 64 rem; asiento a la izquierda; tesis en entrada; credencial en mono con filete superior.

### Pie
- Orden fijo del plan: autores y Universidad · depósitos · frase ↺ 1 · licencias · ediciones en mono · aviso de
  cookies y Dataverse · enlaces. Tres columnas (4 + 4 + 4) y la línea de ediciones a todo el ancho. Sin financiación.

### Sistema de figuras (signature)
- **Anatomía** (orden fijo, a lo OWID): barra (código en mono `apagado` + título-pregunta en EB Garamond 600 │
  pestañas) → leyenda con los cortes impresos y la ausencia dibujada → gráfico → frase de teclado (nace oculta) →
  salvedad rotulada (primera frase en 600) → llamada. La pestaña Datos lleva la descarga y el LÉAME abreviado: QUÉ
  MIDE · DENOMINADOR · SALVEDAD · BASE (huella y fecha) · CITA.
- **Capas:** las formas en SVG (o en celdas HTML cuando la marca es una rejilla) y **todo el texto en HTML** encima,
  nunca `<text>` en el SVG. Los rótulos directos sustituyen a la leyenda siempre que quepan.
- **Ejes:** mono de 0,75 rem en `apagado`, sin línea de eje salvo la base (filete `hair-2`). Rejilla solo horizontal,
  en `hair`, y nunca por encima de 4 líneas. Los meses en números romanos (I–XII), como en las fechas del Diario.
- **Nota emergente:** invertida, radio de 2 px, flecha de 10 px hacia la marca. Tres líneas: qué (EB Garamond 600,
  1 rem) · cifras con numerador y denominador (mono 0,76 rem) · base y fuente (mono 0,7 rem al 72 %). Se escribe por
  plantilla (`data-plantilla` y `data-v-*`). Aparece al pasar el puntero, al recibir el foco y al tocar; Esc la
  cierra; se puede recorrer con el puntero sin que desaparezca (WCAG 1.4.13); no caduca. 120 ms de fundido.
- **Estados de la marca:** reposo · hover o foco (contorno de 2 px en `tinta`, con 1 px de separación) · selección
  (contorno oro de 2 px) · atenuado (`--atenua` por tema, en el resto) · ausencia (contorno `ausencia-trazo` sin
  relleno) · sin revisar (trazo discontinuo). **La ausencia nunca es un color.**
- **Teclado:** una parada por grupo (etapa, serie o legislatura); ← → recorren, Inicio y Fin, Esc. Región
  `aria-live` solo al recorrer con teclado. Nunca `role="grid"`. La base accesible es la tabla.
- **Rótulos sobre la marca:** donde un grupo se lee mejor nombrado que en la leyenda (F21, 1936-1939: los dos bloques
  de la red), EB Garamond cursiva 500 en tinta con halo del fondo y un trazo oro vertical de 0,8 rem que baja al grupo,
  por encima de todo punto bajo su anchura. Cuentan dentro del tope de tres anotaciones.
- **Anotaciones editoriales:** como mucho tres por figura. Frase completa en EB Garamond de nota, con un trazo oro de
  0,9 rem que la une a su fila o marca. Van en la columna derecha de la figura en escritorio y entre filas en el
  móvil. Solo dicen lo que el dato sostiene, con su base («El mes con más palabras: junio de 1934, 870.822 en 19
  sesiones»).
- **Leyendas:** clases con el rango impreso bajo cada muestra («1.473–53.132»). La ausencia y el salto, con su propio
  símbolo dibujado. Nunca un degradado continuo.

## Movimiento y medios expresivos

Principio: **cada pieza existe primero en su estado final estático**, legible sin JS. El movimiento vive dentro de
`@media (prefers-reduced-motion: no-preference)` y de `@supports`. Cada página lleva **un motor de JS como mucho**,
cargado por un *custom element* cuando un IntersectionObserver lo ve. Se revisa la regla del plan «ninguna librería de
animación en el cliente»: queda **abierta con cuatro condiciones**. La librería debe hacer algo que la plataforma no
hace; va solo en su página; tiene presupuesto propio; y la página está completa sin ella. Tiempos: 120 ms de puntero,
240 ms de estado, entradas de 900 ms o menos, curva `cubic-bezier(.2,.7,.1,1)` y nada en bucle. Detalle técnico y
mediciones: `docs/RECURSOS_VANGUARDIA.md`.

| momento | qué cuenta | técnica | coste gz | sin JS · movimiento reducido | accesibilidad |
|---|---|---|---|---|---|
| **1 · La Cámara se sienta** (portada) | El plano se traza y los 227 escaños se ocupan de la tribuna hacia fuera, fila a fila: la Cámara existe antes que sus palabras. | CSS puro: `stroke-dasharray` con `pathLength=1` en la planta (1,5 s) y `@keyframes` por escaño con retardo `--o` calculado en el build desde el radio y el ángulo (≤ 1,6 s en total). El «descenso de cámara» con `rotateX` de P1 queda en prueba: hoy se lee como una ampliación y recorta la mesa. **Probado en la muestra.** | 0 KB de JS; unos 3 KB de atributos | La planta completa y estática; el resalte por bloque funciona con radios y `:has()`. | SVG con `role="img"`, título y descripción; menos de 5 s y una sola vez (2.2.2 no aplica); el resalte también con teclado. |
| **2 · De la tinta a la fila** (El Diario, Método 02) | Cada mancha de tinta de una página impresa viaja a una celda de la fila: la tipografía se vuelve dato. Es el momento firma. | three.js r186, WebGL2, `Points` y `ShaderMaterial` en un solo *draw call*, con el scroll como *scrub* (prototipo P2). El escaneo real del DSC se umbraliza en el build. | ≈194 KB (sin *tree-shaking*); solo en esa página, carga diferida | La página impresa y la `<table>` de la fila, una junto a otra. Con movimiento reducido, las mismas dos piezas sin transición. | Lienzo `aria-hidden`; el HTML real debajo; pausa fuera de pantalla y con `visibilitychange`; DPR ≤ 1,5. Hay que medirlo en un móvil real antes de fijar el número de partículas. |
| **3 · El tiempo corre** (calendario F01) | Al entrar, las celdas se encienden en orden cronológico, 7 ms por mes. Los 70 meses vacíos de 1939–1944 se notan como una pausa. En Las Cortes, las mismas 755 sesiones pasan de la rejilla a la serie mensual (FLIP con WAAPI). | Isla propia: IntersectionObserver, transiciones CSS con retardo `--n` (índice del mes) y FLIP con Web Animations API. `sibling-index()` cuando haya soporte. **Probado en la muestra.** | ≈1–3 KB | Rejilla completa desde el principio: la isla solo oculta lo que aún no se ve. Con movimiento reducido, sin entrada ni transición. | La tabla es la base; una parada por etapa; nada se mueve mientras el foco está dentro. |
| **4 · Las redes se reordenan** (Afinidades, F21) | Al cambiar de legislatura, los diputados que repiten se desplazan y los que entran o salen se funden: se ve la continuidad de las coautorías. | sigma.js 3 y graphology; ForceAtlas2 calculado en Node; en el cliente solo se interpolan posiciones. | ≈61 KB, bajo demanda | Póster SVG exportado en el build, lista de coautores y buscador del censo. Con movimiento reducido, salto sin interpolar. | Buscador accesible; nombre, partido y familia en texto; foco de nodo a vecinos. |
| **Sistema · entre páginas** | Una minoría del hemiciclo se convierte en la cabecera de su página; la celda de una sesión, en el título de su puerta; las fichas vecinas se deslizan en orden cronológico. | View Transitions entre documentos nativas (`@view-transition { navigation: auto }`) con 1–3 `view-transition-name`. **Sin** `<ClientRouter />`. El cambio de tema de la muestra ya usa `startViewTransition`. | 0 KB | Navegación normal (Firefox cae limpio). Con movimiento reducido, sin transición. | El foco va al H1 de destino; ES ↔ EN no se anima. |

**En reserva, sin entrar en la 0.1:** GSAP 3.15 con ScrollTrigger (≈46 KB), solo si el momento 2 necesita *pin* con
*scrub* en Firefox antes de que llegue `animation-timeline`; Motion, nunca junto a GSAP. **Descartados:** p5.js
(≈280 KB, para bocetar), Lottie, Rive, Lenis y cualquier secuestro del scroll, y el 3D de las redes.

## Do's and Don'ts

### Do:
- **Do** poner el asiento de cada cifra y cada cita en el margen: base (V2, v3, proyecto, CGOCUS) e ids en mono.
- **Do** componer las citas como el Diario: orador en versalitas simuladas encima y la cita en cursiva de libro con
  comilla colgada.
- **Do** dibujar la ausencia como contorno `ausencia-trazo` (3:1 o más) y lo no revisado con trazo discontinuo.
- **Do** imprimir los cortes de cada clase de la rampa, con el separador de miles español (1.843) como fija el plan.
- **Do** probar cada par de color en los dos temas; `apagado` solo sobre `fondo` y `fondo-2`.
- **Do** mantener un único H1 y un H2-pregunta por sección, con más aire encima que debajo.
- **Do** dar a las dianas táctiles 44 px (24 px en las celdas de calendario, con separación, por WCAG 2.5.8).
- **Do** tematizar lo que el navegador trae: `::selection` en oro, `caret-color`, `scrollbar-color` y el foco azul.

### Don't:
- **Don't** usar antetítulos de género en MAYÚSCULAS espaciadas y oro («POR QUÉ IMPORTA»): es el tic que se rechazó.
- **Don't** usar la mono en botones, navegación ni prosa.
- **Don't** usar la cursiva para enfatizar; ni tarjetas, iconos en tesela, contadores animados o banda de cifras.
- **Don't** usar sombras, degradados, texto degradado, vidrio, grano o textura de papel falsa.
- **Don't** usar filetes de color de más de 1 px a la izquierda de notas o avisos.
- **Don't** meter texto dentro del SVG, ni color como única pista, ni un degradado continuo en la rampa.
- **Don't** retocar el hemiciclo ni ponerle cifras encima.
- **Don't** colorear por ideología fuera de F09, F26 con nombres y F21.
- **Don't** inventar el encabezamiento impreso de un orador, una cifra o una fecha: todo sale del exportador con su
  base.
- **Don't** usar glifos Unicode como iconos (◐, ↗, →). Los iconos van dibujados, con un solo trazo.
- **Don't** secuestrar el scroll, animar en bucle ni mover lo que el lector está usando con el teclado.
