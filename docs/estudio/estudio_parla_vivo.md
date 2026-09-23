# ParlaIbero publicado, leído como lo lee un lector: por qué funciona mejor que una landing de una sola página

Estudio del sitio vivo `https://rodrodr.github.io/parlaibero/es/`, hecho el 22-09-2026 con Playwright en Python (Chromium headless). Sirve de referencia para el sitio multipágina de **Luz y Taquígrafos (LyT)**.

**Capturas.** Están todas en
`/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/capturas_parla/`
(abreviado **`CAP/`** en el resto del informe; son 448 ficheros y ocupan 104 MB).

- `CAP/<página>_<ancho>_<tema>_full.png`: la página entera. Páginas: `inicio`, `paises`, `ficha_es`, `ficha_sv`, `metodologia`, `usar`, `instituciones`, `explorador`. Anchos: 1440 y 390. Temas: `light` y `dark`.
- `CAP/<página>_<ancho>_<tema>_mapa.png`: la página entera reducida y cortada en columnas para verla de un vistazo (**es lo primero que conviene abrir**).
- `CAP/<página>_<ancho>_<tema>_sNN.png`: una captura por pantalla, bajando la página de viewport en viewport (1440×900 y 390×844). Así se disparan las entradas animadas por scroll.
- `CAP/inicio_390_{light,dark}_m0..m3.png`: montajes de cuatro pantallas de móvil lado a lado.
- `CAP/interaccion/*.png`: los estados tras hover, clic y teclado (se detallan abajo).
- `CAP/lyt_landing_actual_1440_full.png`: la landing actual de LyT (`out/landing.html`), capturada para comparar.

Se miraron (leídas como imagen) todas las pantallas de 1440 claro de `inicio`, `paises`, `ficha_es`, `metodologia` (las principales), `usar` (las principales), `instituciones` y `explorador`. También los mapas de 390, las pantallas oscuras de `inicio` y de `ficha_sv`, y todas las de `interaccion/`.

**Scripts usados** (en `…/scratchpad/sitio/`):
- `probe.py`: estructura, titulares, figuras y controles.
- `capture.py`: capturas, 4 procesos en paralelo.
- `inter_home.py`, `inter_home2.py` y los bloques en línea: las interacciones.
- Salidas: `probe.json` e `inter_home_log.json`.

---

## 0. Qué hace mejor ParlaIbero (resumen en una página)

### El problema de LyT no es la cantidad de texto, es el reparto

La landing actual de LyT, medida con Playwright:
- 4.713 palabras visibles.
- 15.646 px de alto a 1440.
- 1 H1, 10 H2 y 31 H3.
- 4 SVG.
- Un único control interactivo: el botón de tema.

ParlaIbero tiene más texto en total (unas 13.400 palabras visibles solo en las 8 páginas estudiadas, sin contar las 14 fichas restantes). Pero lo reparte así:

| Página | Palabras visibles (en `<main>`) | Alto a 1440 | Figuras / tablas | Controles |
|---|---|---|---|---|
| Inicio `/es/` | 1.648 (1.468) | 10.370 px | pequeños múltiplos de 16 cámaras; rejilla de cobertura de 531 celdas; cita tipográfica; registro de 8 sesiones | tema, «Otra pregunta» (13 aperturas), pestañas Gráfico·Tabla·Datos, hover y teclado en la rejilla, «Copiar la cita» |
| Países `/es/paises/` | 579 (403) | 3.125 px | la rejilla con su leyenda «Cómo leer la rejilla»; los cinco países que faltan | pestañas; filas-enlace a 16 fichas; descarga de los datos de la figura |
| Ficha España `/es/paises/es/` | 778 (602) | 6.278 px | tira anual de barras (49 años); voz femenina por década | 2 desplegables (tabla; turnos y oradoras); copiar cita; ficha anterior/siguiente |
| Ficha El Salvador `/es/paises/sv/` | 718 | 5.987 px | ídem, con datos propios | ídem; sin «siguiente» porque es la última |
| Metodología | 2.672 (2.496) | 14.215 px | anatomía de una fila real; esquema de 5 pasos; barra apilada; tabla de vinculación con halteras; fichas ISO | índice pegajoso numerado con «dónde estoy»; banda fija de CTA; 10 «Pruébelo» |
| Usar los datos | 4.718 (4.542) | 14.242 px | barras de peso de fichero; diccionario de 16 columnas con completitud por cámara; 2 fragmentos de código | 16 desplegables de cita (texto, BibTeX, RIS, cada uno con su botón de copiar) |
| Parlamentos y organismos | 885 (709) | 4.064 px | ninguna; listas de descarga | copiar cita |
| Explorador | 1.383 (1.207) | 11.125 px | 7 capturas reales del explorador, ampliables | banda fija de CTA |

### Los ocho motivos

1. **Cada página responde a una pregunta y a un público.**
   - Inicio: *¿por qué importa?*
   - Países: *¿qué hay?*
   - Ficha: *¿qué hay de mi cámara?*
   - Metodología: *lo que preguntaría un revisor*
   - Usar: *cómo me lo llevo*
   - Instituciones: *no sé programar*
   - Explorador: *qué hace la aplicación y qué no*

   Por eso nada tiene que caber en una sola pantalla, y el Inicio puede ser una historia y no un índice.
2. **Nada se resume de más, porque cada cosa tiene su sitio donde se dice completa.** Ejemplos:
   - La tabla de vinculación, cámara por cámara, con bruta frente a efectiva (Metodología, `CAP/metodologia_1440_light_s07.png`).
   - Las 16 columnas con su completitud medida en cada cámara (Usar, `CAP/usar_1440_light_s06.png`).
   - La cita en texto, BibTeX y RIS de cada uno de los 16 conjuntos (`CAP/interaccion/usar_cita_espana_abierta.png`).

   El Inicio solo da el titular de cada una y enlaza allí: «Ver cómo se calcula» lleva a `metodologia/#apartado-4`.
3. **Las figuras son interactivas de verdad, y lo son sin ruido:**
   - hover y teclado con una nota anclada a la celda;
   - flechas que recorren los años;
   - pestañas Gráfico · Tabla · Datos;
   - una conmutación de medida (palabras · turnos · oradoras);
   - filas que son enlaces a la ficha.

   No hay deslizadores ni «dashboards»: una idea por figura.
4. **La densidad está controlada por bloque, no por página.** Cada sección tiene la misma estructura:
   1. título grotesco grande;
   2. una frase de entrada en serif grande;
   3. la figura o la lista;
   4. la salvedad al margen, en cuerpo de nota;
   5. una llamada.

   El espacio en blanco entre secciones es generoso: 200–300 px a 1440.
5. **La navegación está tejida:**
   - la rejilla lleva a las fichas y las fichas vuelven a Países;
   - las fichas tienen anterior y siguiente;
   - cada apartado de Metodología acaba en un «Pruébelo» que lleva a los datos o al explorador;
   - el pie repite «De dónde sale cada cifra», «Avisar de una errata» y «Cómo citar».
6. **La honestidad está diseñada como contenido, no como letra pequeña.** Estos bloques son de primer nivel, con su titular:
   - «Faltan cinco países. Conviene decir por qué.»
   - «Cuatro preguntas sin dueño»
   - «Lo que el corpus no afirma»
   - «Lo que pide, y lo que no hace»
7. **Hay oficio en los detalles:**
   - todas las cifras van en mono, con el separador español;
   - los umbrales de la escala van impresos;
   - la ausencia nunca es un color: se marca con contorno o raya;
   - lo interactivo se distingue por la forma (subrayado, caja, foco azul);
   - todo funciona sin JavaScript;
   - hay «Saltar al contenido»;
   - el tema oscuro tiene rampa propia.
8. **El Inicio cambia de pregunta.** Hay 13 aperturas: democracia, voz de las diputadas, criminalidad, inflación, inmigración, pandemia, terrorismo, empleo, medio ambiente, pueblos indígenas, infraestructuras, corrupción y pobreza. El botón «Otra pregunta» las recorre. Es un modo barato de enseñar que el corpus sirve para muchas preguntas sin amontonarlas.

---

## 1. Sistema común a todas las páginas

### Cabecera (`CAP/inicio_1440_light_s00.png`, `CAP/interaccion/ficha_es_390_dark_cabecera.png`)

**A 1440**, de izquierda a derecha:
- El logotipo **«Escalera»**: 16 barras, una por cámara, dibujadas con el arco temporal de su serie. El componente `Escalera.astro` lo genera desde los datos, y el favicon es el mismo dibujo.
- Wordmark «ParlaIbero» y lema en mono: «Los debates del pleno, turno por turno».
- 5 enlaces: Países · Metodología · Usar los datos · Parlamentos y organismos · Explorador. El enlace activo va subrayado en granate.
- Selector de idioma en mono: «Español» sobre caja granate, «English», «Português (Brasil)». Cada lengua lleva a la **misma página** en la otra lengua; hay `hreflang` es, en, pt-BR y x-default en todas las páginas.
- Botón de tema redondo «◐».

**A 390:**
- El idioma se reduce a ES · EN · PT, con cajas táctiles.
- Los 5 enlaces se parten en dos líneas.
- **No hay menú hamburguesa**: toda la navegación queda a la vista.

La cabecera **no es pegajosa** (`position: static`) en ninguna página, y no hay botón de «volver arriba».

### Franja de financiación

«Proyecto PID2022-141706NB-C22 financiado por:» y los logotipos de MICIU, la UE y la AEI, sobre placa blanca también en el tema oscuro.
- En Inicio va bajo la cabecera, en el primer pantallazo (`FundingNotice.astro`, variante `franja`).
- En todas las páginas va además completa en el pie.

### Botón de tema (probado con Playwright)

- El `aria-label` nombra **el estado al que lleva**: «Tema oscuro» y, tras el clic, «Tema claro».
- Cambia `data-theme` en `<html>` y lo guarda en `localStorage('tema')`.
- Sin preferencia guardada, sigue `prefers-color-scheme`. Un script en `<head>` aplica el tema antes de pintar, así que no hay parpadeo.
- Capturas: `CAP/interaccion/inicio_tema_tras_clic.png`; comparar `CAP/inicio_1440_light_s00.png` con `CAP/inicio_1440_dark_s00.png`.

### Teclado

- El **primer Tab** va a «Saltar al contenido» (`a.saltar` → `#contenido`), visible al recibir el foco (`CAP/interaccion/inicio_tab1.png`).
- Luego vienen el logotipo y los 5 enlaces, en ese orden.
- El foco es **azul** (`--focus: #1558d6`; `#9ec1ff` en oscuro) y así no se confunde con el acento granate (`CAP/interaccion/inicio_rejilla_teclado.png`: el recuadro azul rodea la fila de España).

### Pie (`CAP/inicio_1440_light_s12.png`)

En tres columnas:
1. Identidad: «ParlaIbero · Infraestructura de datos para las ciencias sociales y humanas · Instituto de Iberoamérica, Universidad de Salamanca»; los datos están en Harvard Dataverse, con 16 DOI; «Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de su cámara»; licencias CC BY 4.0 para datos y MIT para el código.
2. **Ediciones, en mono**: «Página, edición 0.1 · Datos, edición del 7 de septiembre de 2026». Luego: «Este sitio no usa cookies ni analítica»; y que el explorador no recibe el archivo, mientras que la descarga en Dataverse sí pide datos, y se avisa antes del clic.
3. Enlaces: Colección en Harvard Dataverse · Abrir el explorador · Cómo citar · De dónde sale cada cifra · Avisar de una errata · Escribirnos.

### Banda fija de llamadas (`BandaCTA.astro`)

Solo en **Metodología** y **Explorador**, las dos páginas largas donde el lector queda lejos de una acción (comprobado en las 7 páginas).
- Va fija abajo: [Descargar los datos] en caja rellena y [Abrir el explorador] en caja con filete.
- **Cada botón lleva a la vista su aviso**:
  - Descargar: «Antes de descargar, Harvard Dataverse le pedirá nombre, correo, institución, cargo y uso previsto. Nos gustaría conocer a quienes usan los datos…».
  - Explorador: «El explorador abre un país cada vez, hoy está solo en español y pide un navegador reciente».
- «Descargar» no lleva a Dataverse, sino a `usar/#empezar`: primero se elige.
- En móvil los dos botones van a media anchura, con su aviso debajo (`CAP/interaccion/metodologia_390_dark_indice_abierto.png`).

### Sistema visual (`src/styles/base.css`)

**Tipos:**
- Grotesca pesada **Archivo** para titulares, con interletra apretada.
- Serif **Source Serif 4** para la lectura.
- **JetBrains Mono para toda cifra**, rótulo de eje, fecha y *kicker*.

**Color:**
- Papel `#f7f6f3`, tinta `#1d1b18`, granate `#6a1a24`.
- El granate es a la vez acento y color del dato, por eso **lo interactivo se distingue por la forma**: enlaces subrayados, botones en caja, foco azul.
- Rampa secuencial de 5 clases.

**Medida y escala:**
- Medida de lectura de unos 38 rem: los párrafos largos miden de media 480–600 px a 1440.
- Escala tipográfica con `clamp()`: el H1 va de 2,3 rem a 6,2 rem.

**Tema oscuro:**
- Fondo `#17171a`, tinta `#e9e7e3`, acento rosa `#e89aa5`.
- **La rampa se invierte**: la clase más alta es la más clara (`#fce8ea`), de modo que «más» sigue siendo «más contraste» sobre fondo oscuro. Comparar `CAP/inicio_1440_light_s04.png` con `CAP/inicio_1440_dark_s04.png`.

**Movimiento:**
- Una única entrada (`.entra`: opacidad y 14 px) atada al scroll con `animation-timeline: view()`.
- Todo va dentro de `prefers-reduced-motion: no-preference`.
- Al imprimir se anula: «en papel no hay scroll que la traiga».

---

## 2. Página a página

### 2.1 Inicio `/es/`

**Capturas:** `CAP/inicio_1440_light_mapa.png`, `…_s00`–`s12`, `CAP/inicio_1440_dark_*`, `CAP/inicio_390_light_mapa.png`, `CAP/inicio_390_*_m0..m3.png`, `CAP/interaccion/inicio_*`.

#### Estructura, de arriba abajo

1. **Cabecera y franja AEI.**
2. **Apertura (H1 = una pregunta)** (`s00`–`s02`). Primera visita: «¿Cuándo se habla de democracia en el pleno?».
   - Bajo el H1, un antetítulo en grotesca: «Dieciséis cámaras, año a año, por cada millón de palabras dichas.»
   - **Pequeños múltiplos 4×4** (`FigTermino.astro`), uno por cámara y todos a la misma escala (0–3.000 por millón). Cada uno lleva:
     - el nombre y, debajo, el **hito del año máximo** en cuerpo pequeño («Primeras elecciones tras la dictadura», «Se aprueba la Constitución»);
     - la línea, con el punto y el rótulo del máximo en mono («2.533 · 1976»);
     - la raya de puntos de la media de las 16 (569);
     - un eje solo por décadas.
   - Leyenda en muestra: «Una cámara, año a año, todas a la misma escala…».
   - Salvedad a la derecha, en nota: «Cuenta cuántas veces se dice la palabra… El recuento no dice quién la invoca ni si es para defenderla o negarla… coincidir no es explicar.»
   - El **hallazgo** va en serif grande bajo la figura.
   - Botón «Otra pregunta» con la etiqueta «BORRADOR».
3. **Tesis en banda invertida** (`s01`–`s03`, `Tesis.astro`). Es la única banda de tinta de la página, solo tipografía.
   - Tesis: «Comparar democracias iberoamericanas por lo que se dijo en sus cámaras costaba una carrera académica por país. Ese coste ya está pagado.»
   - Párrafo de contexto, que nombra a PELA-USAL, Latinobarómetro, ParlaMint y Manifesto Project.
   - Remate en serif, desplazado a la derecha: «Tres años de trabajo. Una descarga. Eso es lo que significa infraestructura.»
   - Credencial en mono: «16 cámaras · 1976–2025 · CC BY 4.0 · 16 DOI · Universidad de Salamanca · Harvard Dataverse».
   - Nota con la referencia bibliográfica (Bäck y Debus, 2019).
4. **«¿Qué hay, y desde cuándo?»** (`s03`–`s05`, `Cobertura.astro` + `FigRejilla.astro`).
   - Frase censal en serif grande: «Todo lo que había. No una muestra de lo que había.»
   - Al margen: «Tienen sesión 527 de las 800 celdas… El tono dice cuánto material hay, no cuánto se debate.»
   - Subtítulo con filete: «Busque su cámara.»
   - Pestañas **Gráfico · Tabla · Datos**.
   - Leyenda «TURNOS DE HABLA» con **los cortes impresos**: 63 · 7.453 · 11.671 · 15.977 · 27.133 · 115.753.
   - **Rejilla** de 16 filas × 50 años (1976–2025), con columnas al margen: «Sesiones» y «Turnos de habla» en mono.
   - Los **huecos declarados**, en papel con contorno y etiqueta: «1991–2000» dentro de la fila de Argentina; «2001-2002, 2006-2007, 2011-2012» bajo la de Paraguay.
   - Después, «Faltan cinco países. Conviene decir por qué.», en tabla de tres filas con su motivo, y «Un solo criterio…».
5. **«¿Quién ocupa el tiempo del pleno?»** (`s05`–`s07`, `Pleno.astro`).
   - Entrada: «La unidad es el turno de palabra, tal como lo marca el propio Diario.»
   - Una **cita tipográfica enorme en itálica**, sin nombre: solo «PCN · Asamblea Legislativa de El Salvador · 10 de agosto de 2018». El fragmento es el argumento.
   - Debajo, el párrafo de cifras («De 9.868.087 turnos… 87,05 %… 75,35 %… 11,79 %… 12,86 %… 98,12 %»).
   - Al margen: «En Panamá, el 30,68 %… Compare **por país**, nunca desde la cifra agrupada».
6. **«¿Qué se dijo aquel día?»** (`s07`–`s08`, `Sesiones.astro`).
   - A la izquierda, en prosa: «Seis sesiones que usted reconoce están aquí… Que estén no valida su contenido… Las dos… de Paraguay, no: caen en un hueco declarado.»
   - A la derecha, un **registro en calendario**: fecha en mono, país en grotesca subrayada (es un enlace a su ficha), qué pasó y, a la derecha, las **filas** en mono granate grande («28 FILAS», «1.780 FILAS»).
   - Las dos de Paraguay van **en caja de raya discontinua, sin cifra y sin tono de error**.
   - Cierre: «Abra una: descargue ese país y búsquela por fecha en el explorador.» y «Para citar un pasaje, dé la fecha y el número de sesión, y cotéjelo con el Diario oficial.»
7. **«Cuatro preguntas sin dueño»** (`s09`, `SinDueno.astro`).
   - Entrada: «La base no trae anotación. Aquí entra usted.»
   - Cuatro **cajas vacías** con filete discontinuo, escalonadas: Tema. · Tono. · Posición. · Voto.
   - Cada caja dice abajo qué falta. El vacío es el contenido.
8. **«Tres años de trabajo. Una descarga.»** (`s10`–`s11`, `Empezar.astro` + `Salidas.astro`).
   - Entrada: «Aquí las variables hay que construirlas».
   - Aviso del formulario de Dataverse, en cita con filete.
   - **Escalera de tres peldaños** a alturas crecientes, cada uno con su peso de fichero en mono:
     - Sin programar: los datos de cada figura, sin formulario; o El Salvador, 98 MB, 2018 a 2025.
     - Con R o Python básico: un país, de 98 MB a 1,5 GB.
     - Con métodos de texto: los dieciséis, 12,3 GB.
   - Tres frases fijas: «Se abre en su navegador…», «El explorador abre un país cada vez…», «Los identificadores son estables dentro de una edición, no entre ediciones».
   - La cita de la colección, con el botón **«Copiar la cita»**.
9. **Pie.**

#### Densidad

1.648 palabras visibles, repartidas en 7 bloques. Cada bloque trae **una** idea y, como mucho, una figura; los bloques de solo texto tienen menos de 150 palabras. La rejilla ocupa ella sola casi dos pantallas.

#### Interactividad probada

**«Otra pregunta»:**
- Hay 13 aperturas: una en el DOM y 12 en `<template>`.
- Cada clic sustituye el bloque y **lleva el foco al nuevo H1** (`tabindex=-1`), de modo que el lector de pantalla oye la pregunta nueva.
- En la segunda visita, la apertura sale al azar (`localStorage 'parlaibero.portada'`).
- Capturas: `CAP/interaccion/inicio_apertura_00.png` … `_11.png`. La 01 es la de la voz de las diputadas y la 05 la de la pandemia («Las dieciséis suben el mismo año…»).

**Figura de la voz (apertura 01, `FigVoz.astro`):**
- Pestañas Gráfico · Tabla · Datos, y a la derecha «VER TURNOS Y ORADORAS» con [palabras] [turnos] [oradoras].
- Todas son **radios nativos con CSS `:has()`**, sin JavaScript. En la prueba, la flecha → sobre la pestaña enfocada pasó de Gráfico a Tabla.
- Hover sobre un punto: nota negra anclada al punto, «Portugal · 33,50 % · 4.939.918 de 14.744.562 palabras» (`CAP/interaccion/inicio_voz_hover.png`). **La nota da la cifra con su numerador y su denominador.**
- Escape la cierra, sin mover el ratón.
- **Tabla**: por país y década, el %, «De diputadas» y el denominador (`inicio_voz_pest_tabla.png`).
- **Datos**: enlaces a `voz_por_camara.csv`, `.xlsx` y `leame-…txt`, con «Sin formulario: son datos agregados», y tres rótulos en mono, QUÉ MIDE · DENOMINADOR · SALVEDAD, con su texto (`inicio_voz_pest_datos.png`).
- Las medidas cambian la figura entera (`inicio_voz_medida_turnos.png`, `…_oradoras.png`).
- Las cámaras con padrón no revisado a mano se dibujan en **línea de raya gris con puntos huecos**, y la leyenda lo explica.

**Rejilla de cobertura:**
- **Hover** sobre una celda: se dibuja un recuadro-cursor (tinta más halo de papel) y aparece la nota «Portugal · 2016 · 103 sesiones · 25.587 turnos de habla» (`CAP/interaccion/inicio_rejilla_hover.png`). La plantilla de la nota es `{pais} · {a} · {s} sesiones · {h} turnos de habla`.
- La fila entera se resalta con un fondo `--bg-2`.
- Hover sobre un hueco: «Argentina · 1991–2000 · hueco declarado» (`inicio_rejilla_hueco.png`).

**Rejilla con teclado:**
- Hay **una parada de tabulación por cámara**: cada fila es un `<a>` con `aria-label` «España, Congreso de los Diputados: de 1977 a 2025.».
- Dentro de la fila, **← → Inicio Fin** recorren los años y **Esc** cierra.
- Se probó: tres veces → dio «España · 1979 · 62 sesiones · 10.262 turnos de habla»; Fin, «2025 · 68 sesiones · 12.525»; Inicio, «1977 · 44 · 6.103».
- **El mismo texto se anuncia en una región `aria-live`.**
- La frase «Con el teclado: una parada por cámara; las flechas recorren los años.» **solo aparece cuando el script ha cargado**, porque solo entonces es verdad (`inicio_rejilla_teclado.png`).

**Rejilla: clics y pestañas:**
- Un clic en la fila lleva a `/es/paises/es/`.
- **Tabla** (`inicio_rejilla_pest_tabla.png`): una `<table>` real con País, Cámara, **Diario**, Periodo, Años con sesión, Huecos declarados, Sesiones, Filas, Turnos de habla y **DOI**, más las filas de los cinco ausentes. Nota final: «**Edición depositada: lo que devuelve cada DOI.** No todas las filas son habla; por eso van las dos columnas.»
- **Datos** (`inicio_rejilla_pest_datos.png`): `cobertura.csv/.xlsx`, `cobertura_por_ano.csv/.xlsx`, `leame-cobertura-es.txt`, y QUÉ MIDE / DENOMINADOR / SALVEDAD.

**«Copiar la cita»:**
- Copia la cita al portapapeles; se comprobó que el contenido era exactamente la cita.
- Escribe «Cita copiada.» en un `role=status` (`inicio_cita_copiada.png`).
- Sin JavaScript, el botón **no aparece**: la cita sigue siendo texto seleccionable.

**Sin JavaScript** (contexto con JavaScript desactivado):
- Se ve la primera apertura.
- Las pestañas funcionan: al pulsar Tabla se ve la tabla y el gráfico se oculta (`CAP/interaccion/sinjs_inicio_rejilla_tabla.png`).

#### Cómo evita el amontonamiento

- **Una sola banda de color en toda la página** (la tesis).
- Las **salvedades van al margen** en cuerpo de nota, no en el cuerpo principal.
- Las cifras largas van en párrafo corto, con la cifra que manda aparte.
- La figura de cobertura da «Tabla» y «Datos» **en pestañas**, no debajo.
- Las sesiones van en una lista de calendario, no en tarjetas.
- La escalera de descarga es un solo bloque con tres alturas.

#### Oficio

- «2.533 · 1976»: la cifra y el año, en mono, con punto medio.
- Los % llevan espacio antes: «87,05 %».
- Los hitos de cada panel están escritos para un lector no experto.
- «No en todas sube, y la figura no lo esconde.»
- El H1 es siempre una pregunta.
- **El contenido declara a la vista la edición que usa.**

#### Defectos observados (no copiar)

1. **Las notas emergentes se pierden al rotar la apertura.** El script de las figuras (`src/scripts/figuras.ts`, `arranca()`) se ejecuta una vez al cargar. Al sustituir la apertura con «Otra pregunta», la figura nueva no recibe `data-isla` ni sus escuchadores.
   - Comprobado: tras un clic en «Otra pregunta», `#voz` tiene `data-isla = false` y el hover no muestra nota.
   - Cargando la misma apertura de entrada, sí la muestra.
2. **«Otra pregunta» se ve sin JavaScript, pero no hace nada.** Contrasta con «Copiar la cita», que se oculta sin JavaScript.
3. **La etiqueta «BORRADOR» se ve en producción.**
4. En las capturas de página entera, los bloques `.entra` salen vacíos hasta que se hace scroll. No afecta al lector, pero sí a miniaturas e imágenes sociales.

---

### 2.2 Países `/es/paises/`

**Capturas:** `CAP/paises_1440_light_s00`–`s03`, `CAP/paises_1440_light_mapa.png`, `CAP/interaccion/paises_390_dark_rejilla.png`.

#### Estructura

1. *Kicker* «PAÍSES».
2. H1 enorme en dos líneas: «¿Qué hay, y desde cuándo?».
3. Entrada en serif grande, **desplazada a la derecha**: «Una fila por cámara y una columna por año, de 1976 a 2025: de 800 celdas, 527 tienen al menos una sesión. **Cada fila abre la ficha de su país.**»
4. Pestañas.
5. **«Cómo leer la rejilla»**: tres muestras con su frase, una para cada estado de celda.
   - Con tono: «ese año hay al menos una sesión… No quiere decir que estén todas».
   - Con contorno y etiqueta: hueco declarado.
   - Vacía: año anterior al inicio de la serie.
6. La rejilla.
7. Los cinco ausentes.
8. **[Descargar los datos de la figura]**, con «Sin formulario: son datos agregados».
9. «Antes de comparar países»: «La legislatura no significa lo mismo en dos países. Se comparan tasas dentro de un país… Entre países, solo con el denominador a la vista.»
10. Pie.

El H2 «Las dieciséis cámaras» existe, pero es solo para lectores de pantalla.

#### Densidad

579 palabras y 1 figura. Es la página más ligera, porque **la figura es el índice**: no hay lista de tarjetas de países.

#### Interactividad

- La misma rejilla que en el Inicio.
- En móvil, un toque en una celda navega a la ficha y no abre nota. El detalle queda en la pestaña Tabla.

#### Móvil

- Los nombres pasan a **código ISO** (PT, ES, EC…).
- Desaparecen las columnas Sesiones y Turnos.
- Las celdas se estrechan.
- Los ausentes se rotulan VE / CU / NI, BO, HN.
- En el tema oscuro, la leyenda añade: «La ausencia nunca lleva color.»

#### Qué enseña

Una página «catálogo» puede ser **una sola figura bien hecha**: da el índice, la cobertura y la honestidad sobre los huecos a la vez. La leyenda va **antes** de la figura, como instrucción de lectura, no como pie.

---

### 2.3 Fichas de país `/es/paises/es/` y `/es/paises/sv/`

**Capturas:** `CAP/ficha_es_1440_light_s00`–`s07`, `CAP/ficha_sv_1440_light_*`, `CAP/ficha_sv_1440_dark_s00.png` y `_s04.png`, `CAP/interaccion/ficha_es_*`.

#### Estructura fija (plantilla generada desde los datos)

- **Cabecera de ficha**:
  - miga en mono «PAÍSES / ES» (el primer tramo es un enlace);
  - H1 con el país;
  - antetítulo «Congreso de los Diputados · 1977–2025», con los años en mono;
  - a la derecha, las **letras ISO gigantes en contorno** como marca de agua, solo en escritorio.
- Secciones en dos columnas: **título grotesco a la izquierda, que queda fijo mientras se lee su contenido** (se ve en `s01`–`s04`), y contenido a la derecha a medida de lectura. Son estas:
  1. **Hoy puede** (`ficha/Tareas.astro`): lista numerada 01, 02, 03 de tareas con verbo en negrita («**Buscar** en este pleno, de 1977 a 2025, por texto, fecha, partido, legislatura y diputado»; «**Abrir una sesión que reconoce:** 23 de febrero de 1981…»; «**Exportar con su cita.**»). **Solo las tareas que ese país sostiene**: El Salvador no tiene sesión-hito y enseña dos, no tres.
  2. **Qué es**: una frase («El pleno de esta cámara, turno por turno, según su registro oficial: Diario de Sesiones…»), **la tira anual de barras** (`TiraAnual.astro`) con «TURNOS DE HABLA» y el máximo «21.272» en la esquina, el eje con los extremos y un par de años, la frase «Hay sesión todos los años, de 1977 a 2025.», un desplegable **▸ Tabla** y la nota «Edición derivada… vale el Diario de su cámara».
  3. **De dónde sale**: la fuente, su URL, «Cobertura: de 1977-07-13 a 2025-12-11. Formato de la fuente: PDF.», el aviso del formulario y el enlace «Leer el informe en Dataverse ↗», porque el informe **se enlaza y no se reproduce**.
  4. **Cifras**: tres cifras **enormes en mono** separadas por filetes. «3.559 sesiones, en 49 de 49 años. Sin ningún turno de habla, 1.» · «562.514 filas; 558.940 son turnos de habla.» · «En el 96,85 % de esos turnos sabemos qué diputado habla…». Enlace: «Ver cómo se calcula».
  5. **Voz femenina, en palabras** (`VozDecadas.astro`): línea por década con los % rotulados en cada punto, la salvedad del sexo derivado (97,43 % y 99,54 %) y un desplegable **«Ver turnos y oradoras»** que abre una tabla de tres medidas. Cada celda lleva el % y, debajo, en pequeño, «171.994 / 6.957.442».
  6. **Antes de usarlo**: «Este corpus declara cinco limitaciones, medidas una a una. Están en el documento “Limitaciones conocidas”…», con enlace. El Salvador declara «cuatro»: **el texto cambia con los datos**.
  7. **El conjunto de datos**: 17 archivos, «Las intervenciones pesan 1.009 MB. No las abra en una hoja de cálculo», [Descargar en Dataverse] relleno, [Abrir el explorador ↗] con filete, y en mono: autoría, DOI (enlace), «Edición v2.0», licencia.
  8. **Cómo citar**: la cita con filete lateral y [Copiar la cita].
- **Vecinas** (`Vecinas.astro`): ← «Portugal 1976–2025» y «Ecuador 1979–2025» →, y en el centro «PAÍSES». Van en el orden fijo de la rejilla; en la última ficha (El Salvador), el hueco de «siguiente» queda vacío.

#### Densidad

- España: 778 palabras, 2 figuras y 2 tablas plegadas.
- El Salvador: 718.
- Ninguna sección pasa de unas 100 palabras.

#### Interactividad

- Las barras de la tira llevan `<title>` nativo (49 en España), es decir, la nota del navegador. No hay nota propia ni teclado; lo compensa la tabla plegada (`CAP/interaccion/ficha_es_tira_tabla_abierta.png`).
- El desplegable de la voz: `CAP/interaccion/ficha_es_voz_turnos_abierto.png`.

#### Qué enseña

**Una plantilla fija por unidad** da al lector un mapa mental («siempre hay Hoy puede, Qué es, Cifras…») y permite decir lo específico de cada unidad sin amontonarlo en la portada. Además:
- las **tareas prometidas se recortan a lo que la unidad sostiene**;
- los documentos con nombres de personas **se enlazan y no se reproducen**.

---

### 2.4 Metodología `/es/metodologia/`

**Capturas:** `CAP/metodologia_1440_light_mapa.png`, `…_s00`–`s16`, `CAP/metodologia_390_light_mapa.png`, `CAP/interaccion/metodologia_*`.

#### Estructura

- **Arriba**:
  - H1 «Metodología».
  - Entrada a la izquierda: «Qué hay en cada fila, qué se midió y qué no se afirma.»
  - Contrato de lectura a la derecha: «Esta página no recorre el proceso etapa por etapa. **Responde lo que preguntaría un revisor, con cada límite en la misma frase que su cifra.** Cada apartado termina en algo que usted puede comprobar con sus manos.»
  - Párrafo de posición frente a PELA-USAL, Latinobarómetro, ParlaMint y Manifesto.
  - Nota fechada: «A 21 de septiembre de 2026 no hemos localizado otro corpus… Existen ParlaMint…, ParlSpeech…, ParlEE».
- **Índice lateral pegajoso** «EN ESTA PÁGINA» con 10 apartados numerados 01–10 (`IndiceLateral.astro`):
  - Lleva la numeración con contador CSS y filete vertical.
  - El apartado en lectura se marca con un **filete granate y tinta plena**, **sin JavaScript**, con `animation-timeline` por apartado (`view-timeline`).
  - Al pulsar el 05, la página salta a «El sexo es una variable derivada» y el 05 queda marcado (`CAP/interaccion/metodologia_1440_dark_indice_05.png`).
  - En móvil pasa a un `<details>` «EN ESTA PÁGINA +/–» (`metodologia_390_dark_indice_abierto.png`).
- **Los 10 apartados**, cada uno con su número en mono y un H2 grande:
  - **01 Qué es una fila**: la **anatomía de una fila real** de El Salvador (`s01`–`s02`), con las 16 columnas en tabla clave–valor, `speaker_raw` y `speaker_name` **tapados con cajas de raya** («Quién habla está en los datos. Aquí no se muestra.») y el texto en itálica cortado con «[…]» («El texto sigue: aquí va solo el comienzo.»).
  - **02 De dieciséis tradiciones tipográficas a una tabla**: un **esquema de 5 pasos** en cajas escalonadas con flechas (`s03`). En móvil se apila con flechas ↓.
  - **03 Habla y no habla.**
  - **04 Quién habla**: cifras en párrafo, **barra apilada** 75,35 % · 11,79 % (rayada) · 12,86 %, con la leyenda que da % y n debajo de cada tramo (`s06`), y la **tabla «La vinculación, cámara por cámara»** (`s07`). Esa tabla lleva país (enlace a la ficha), cámara, turnos, vinculación bruta, **haltera** de bruta (círculo hueco) a efectiva (círculo lleno) con el % efectivo y «Quien no puede ocupar escaño». Enlace a `vinculacion_por_camara.xlsx`.
  - **05 Sexo y auditoría de género**: fichas ISO con **borde continuo para las auditadas y discontinuo para las no auditadas**, y el subapartado «La auditoría de género».
  - **06 El reconocimiento óptico: lo que falló.**
  - **07 Validación y revisión humana**: caja con filete que rotula **exactamente** la cifra («Fuga del filtro PASS/FLAG: 0,5 % [0,09 %-2,78 %].»), con la muestra, la fecha de ejecución y lo que **no** sostiene («No sostiene la frase “los dieciséis validados”»).
  - **08 Lo que el corpus no afirma, y cómo comparar.**
  - **09 Ediciones, identificadores y reproducibilidad.**
  - **10 La documentación completa.**
- **Cada apartado cierra con «PRUÉBELO.»**, en mono granate, entre filetes (10 en la página). Ejemplos: «Descargue El Salvador, el archivo más pequeño (98 MB; cubre de 2018 a 2025), y ábralo en el explorador. Descargar los datos · Abrir el explorador»; «Lea las limitaciones declaradas de Ecuador… Ver la ficha de Ecuador».
- **Banda fija** abajo.

#### Densidad

2.672 palabras, pero en 10 apartados de 150–350 palabras, cada uno con **una** pieza visual como mucho.

#### Qué enseña

La metodología como **preguntas de revisor**, no como diagrama de 13 etapas (el plan del sitio lo descarta expresamente). Cada límite va **en la misma frase que su cifra**, y cada apartado **acaba en una acción comprobable**.

---

### 2.5 Usar los datos `/es/usar/`

**Capturas:** `CAP/usar_1440_light_mapa.png`, `…_s00`–`s16`, `CAP/interaccion/usar_cita_espana_abierta.png`.

#### Estructura

1. H1 «Usar los datos».
2. **Por dónde empezar**: «No es una matriz de encuesta. **Elija por lo que ya sabe hacer.**» Aviso del formulario y la escalera de tres salidas (Sin programar · Con R o Python básico · Con métodos de texto), con botones: [Abrir el explorador], [Descargar los datos de la figura], [Ver los países], [Ver los dieciséis: DOI]. Cierre: «Dos grupos con la misma base pueden llegar a resultados distintos…».
3. **El camino, paso a paso**: números enormes 1–4, cada uno con su frase en negrita.
   - «**Elija un país.** Si duda, El Salvador».
   - «**Antes del clic.**».
   - «**Descargue un archivo, no los 17.**», con una **tabla de 16 enlaces a Dataverse, cada uno con su peso en mono y una barra horizontal proporcional** (`s02`).
   - «**Ábralo en el explorador.**».
4. **Qué hay en cada descarga**: esquema en mono de los ficheros (`XX_interventions.csv`, `XX_deputies.csv`, los LÉAME en 3 lenguas…).
5. **Las 16 columnas** (`Columnas.astro`, `s05`–`s08`):
   - Número, nombre en mono y etiqueta de tipo (STRING).
   - Definición en serif.
   - «**Cuánto se pudo llenar, cámara por cámara**»: 16 cuadraditos, uno por cámara en el orden de la rejilla, que se vacían en parte o salen en raya cuando falta. Cada uno lleva `title` («España: 100,0 % de todas las filas»).
   - Al margen derecho, **notas pegadas a la columna**: «**sex es derivada.**», «**dm_speech es asimétrica.**», «**legislature no es comparable entre países**», «**Los identificadores son estables dentro de una edición…**».
6. **El padrón y su unión correcta.**
7. **Dos fragmentos**, en R y en Python (`s10`–`s11`): cargan un país, filtran el habla y cuentan palabras por década y sexo, y «**ambos reproducen su serie de la figura de apertura**». Los comentarios del código llevan la salvedad («# SALVEDAD. Esto mide voz, no presencia…»).
8. **Cómo citar**:
   - «Cite lo que usó y su edición: no todos los conjuntos van por la misma.»
   - **Un conjunto de datos**: 16 desplegables «País · ISO · v2.0» (Perú, v1.0); cada uno se abre en texto, BibTeX y RIS, **cada formato con su botón de copiar**.
   - **La colección**: texto, BibTeX y RIS.
   - **Una figura**: la cita de cada figura, con su **edición de datos y fecha** y el ancla (`…/es/#voz`, `…/es/paises/#rejilla`) más «Consultado el [fecha de su consulta]».
9. **Contacto y erratas**: «Si encuentra un error, díganos dónde: país, fecha, número de sesión y lo que dice el Diario oficial», con [Avisar de una errata] y [Escribirnos].

#### Densidad

4.718 palabras: es la página más larga. **No tiene índice lateral ni banda fija**, y es su punto débil: con 14.242 px y 8 secciones, un índice como el de Metodología ayudaría.

#### Qué enseña

La documentación de uso **no se resume**: diccionario completo, completitud medida, código que reproduce una figura del sitio y citas en tres formatos. Lo que la hace legible es:
- el orden por **tarea**;
- los desplegables para lo repetitivo (16 citas);
- las notas al margen.

---

### 2.6 Parlamentos y organismos `/es/instituciones/`

**Capturas:** `CAP/instituciones_1440_light_s00`–`s04`, `CAP/instituciones_390_*_mapa.png`.

#### Estructura

- H1 «Para parlamentos y organismos».
- Entrada: «**Dos caminos. Ninguno exige programar.**»
- **Dos columnas** separadas por un filete vertical, **una por público**, cada una abierta con su **pregunta tipo en itálica**:
  - **La biblioteca o el servicio de investigación de un congreso**: «¿Qué se dijo aquí sobre esto, quién lo dijo y de qué partido o bancada?».
    - «Si su Diario está en un PDF por sesión, responder cuesta una tarde…».
    - «**Tres pasos, sin programar**», con la lista de las 16 descargas y su peso.
    - Recuadro: «Nada sale de su equipo…».
    - «**Lo que no es**»: «Ni registro oficial ni sustituto del Diario…», y «No cubre comisiones ni Senado…».
  - **El organismo internacional**: «Tenemos los escaños por sexo. ¿Cuánto de lo que se dice en el pleno lo dicen mujeres?».
    - «**Lo que se lleva, sin descargar el corpus**»: la tabla de indicadores por cámara y década, con [Descargar la tabla] y [Descargar la imagen], más los ficheros `voz_por_camara.xlsx/.csv`, `leame-…txt`, `…png` y `…svg`.
    - «**Cómo leerla**».
    - «**Cómo citar una figura**».
- **Quién lo hace**.

#### Densidad

885 palabras.

#### Qué enseña

Una página para el público **no académico** que no lo manda a la página técnica. Arranca por **su pregunta** y le da **un producto ya hecho** (tabla e imagen con cita).

---

### 2.7 Explorador `/es/explorador/`

**Capturas:** `CAP/explorador_1440_light_mapa.png`, `…_s00`–`s13`, `CAP/explorador_390_light_mapa.png`.

#### Estructura

1. **H1 en dos tonos**: «Busque, lea y cite lo que se dijo.», en tinta, y «**Sin programar.**», en gris cálido.
   - Entrada: «El explorador es una aplicación que se abre en su navegador… No hay cuenta, ni instalación, ni servidor».
   - A la derecha, en mono: «Se abre en su navegador; nada sale de su equipo.» y [Abrir el explorador ↗].
2. **Primero, encontrar**: cuatro preguntas-H3 en dos columnas **escalonadas**. Cada una describe una función con **lo que no hace** dentro de la frase: «No distingue tildes ni mayúsculas»; «“Solo lo que se habla” deja fuera las carátulas…».
   - Nota: «Las imágenes son del explorador con El Salvador y una biblioteca sobre el debate del agua.»
   - **Captura real** de la vista de tendencia, con su pie y una flecha ↗ que abre la imagen a tamaño real en otra pestaña (`Captura.astro`).
3. **Después, enfocar: las bibliotecas**, en banda de papel oscuro `--bg-2`: «Un corpus entero no es una pregunta. **Una biblioteca sí.**», y la captura de una biblioteca abierta (`s04`).
4. **Coocurrencias: de qué se habla dentro de un debate**: capturas del tema candidato y del resumen (`s06`); «Es un eje de temas, no un eje ideológico.»
5. **Menciones: quién habla de quién**: captura de la red radial por partido (`s08`); al margen, «Dice quién habla de quién, no si lo hace a favor o en contra… acierta 87,5 % de las menciones que reconoce; las que se le escapan —“su señoría”…— no están contadas».
6. **Y llevárselo, citado**: CSV, documento legible, JSON y lista de referencias; «Hasta un pasaje copiado con el teclado se lleva su fuente».
7. **Cómo empezar**: tres pasos numerados, y la medida del tiempo de carga («El Salvador quedó listo en 3,7 s. Brasil… en 82 s. En su equipo puede tardar más.»), con [Descargar en Dataverse], [Ver los países] y [Abrir el explorador ↗].
8. **Lo que pide, y lo que no hace** (`s11`): lista con filetes.
   - «Pide un ordenador, no un teléfono… Chrome/Edge 112+, Firefox 116+, Safari 17+».
   - «No compara países en una misma pantalla. No clasifica por una lista de temas fijada de antemano ni mide el tono: cuenta palabras, no intenciones. Y busca la palabra tal como la escribe: para sus variantes, únalas.»
   - «El texto sale de la extracción automática… puede traer errores».
9. **Lo que se queda en su equipo.**
10. **Banda fija.**

#### Densidad

1.383 palabras y **7 capturas**. Cada sección es una función, con una o dos capturas y dos párrafos cortos. Las capturas llevan **placa clara con filete también en el tema oscuro**, porque son de la interfaz clara.

#### Qué enseña

La página del explorador **vende con capturas reales y límites explícitos**. Es exactamente lo que LyT necesita, con sus límites propios.

---

## 3. La landing actual de LyT frente a este modelo (medido)

`/Users/rodrodr/Dropbox/Apps/aecpa2026/out/landing.html` (captura: `CAP/lyt_landing_actual_1440_full.png`).

**Medidas:**
- 4.713 palabras y 15.646 px en **una** página.
- 10 H2 y 31 H3:
  - 9 pasos del proceso: las páginas, la lectura, la limpieza, los turnos, los oradores, los atributos, la revisión, las fechas, la resegmentación;
  - 5 verbos del explorador;
  - 11 advertencias;
  - 6 bloques de cierre.
- 4 SVG, 4 `figure`.
- Un solo control: «TEMA · CLARO».

**En términos de ParlaIbero, esa página mete en un solo documento:**
- el Inicio;
- la Metodología (los 9 pasos, comprimidos en H3 de un párrafo);
- el Explorador (5 verbos);
- «Lo que el corpus no afirma» (11 advertencias);
- «Usar los datos» (descargar, leer, citar, versiones);
- el equipo.

**Consecuencias:**
- Cada tema recibe unos pocos párrafos donde ParlaIbero le da una página: eso es lo que el investigador llama **«resume demasiado»**.
- Todo convive con la misma jerarquía: eso es lo que llama **«cluttered»**.
- **No hay ninguna figura que responda al lector**: ni nota, ni pestaña Tabla/Datos, ni filas-enlace.

---

## 4. Patrones que el sitio de LyT debería adoptar (lista priorizada)

Formato de cada punto: **patrón**. *Dónde se ve en ParlaIbero.* Cómo trasladarlo a LyT sin romper sus reglas: nada del prototipo de 1931; distinguir siempre V2 (107.551 filas) y v3 del explorador (121.700 filas, sin depositar); no prometer lo que el explorador no hace; español de España; estética oscura editorial con la portada del hemiciclo.

### Arquitectura

1. **Varias páginas, cada una una pregunta y un público.** *En todo el sitio: 5 páginas de menú, 16 fichas y el Inicio.*
   - Propuesta para LyT: Inicio · Cobertura (qué hay y desde cuándo) · fichas por unidad · Metodología · Usar los datos · El explorador · Afinidades Elegidas (base derivada).
   - El Inicio queda en unas 1.500 palabras como mucho. Todo lo técnico sale de él y **se dice completo en su página**.
2. **Inicio en seis movimientos, una idea por bloque.** *Inicio: apertura con pregunta y figura → tesis en banda invertida → cobertura → «¿quién ocupa el pleno?» con cita tipográfica → sesiones que usted reconoce → preguntas sin dueño → escalera de descarga.*
   - En LyT la portada del hemiciclo (`landing/hero_svg.py`) se conserva como apertura.
   - Debajo, **una** figura-pregunta sobre el corpus, con cifras de la V2 y su procedencia.
   - La tesis va en una sola banda de tipografía.
3. **Una plantilla fija para cada unidad de consulta, con anterior y siguiente.** *Fichas `/es/paises/es/` y `/es/paises/sv/` (Tareas, TiraAnual, VozDecadas, Vecinas).*
   - En LyT la unidad natural es la **legislatura o el periodo de sesiones**. Hay que **definirla desde las columnas de la V2**, sin suponerla.
   - Cada ficha lleva: Hoy puede · Qué es · De dónde sale (Diario) · Cifras (en V2) · Antes de usarlo · Cómo citar.
   - En «Hoy puede» solo entran las tareas que esa unidad y **el explorador publicado** sostienen de verdad.
4. **La figura de cobertura como índice navegable.** *Inicio (`#rejilla`) y `/es/paises/`: fila = enlace a la ficha; hover y teclado con la nota «{unidad} · {año} · {sesiones} · {turnos}»; tres estados de celda; leyenda «Cómo leer la rejilla» antes de la figura.*
   - En LyT, una rejilla por mes y año (1931–1945) o por legislatura y mes, con los tres estados:
     - con sesión;
     - **hueco declarado** (periodo sin Diario o sin sesiones), en contorno y con etiqueta;
     - anterior al inicio.
   - Todo se calcula sobre la V2, y la tabla declara «Edición depositada».

### Figuras

5. **Pestañas Gráfico · Tabla · Datos en cada figura, hechas con radios y `:has()`, sin JavaScript.** *Inicio: `#rejilla` y `#voz` (`Pestanas.astro`).*
   - «Datos» lleva CSV, XLSX y un LÉAME, «Sin formulario: son datos agregados», y tres rótulos: **QUÉ MIDE · DENOMINADOR · SALVEDAD**.
   - En LyT, el LÉAME de cada figura declara **qué edición usa (V2 o v3)** y su recuento de filas.
6. **Nota emergente anclada al elemento, con cifra, numerador y denominador; teclado con flechas; `aria-live`; Esc para cerrar.** *Inicio (`src/scripts/figuras.ts`).*
   - Copiar el patrón **y corregir su defecto**: volver a enlazar los escuchadores cuando se sustituye una figura (ParlaIbero los pierde tras «Otra pregunta»).
7. **Una conmutación de medida, no un panel de control.** *Apertura de la voz, en Inicio: [palabras] [turnos] [oradoras]; y el enlace «Ver turnos y oradoras».*
   - En LyT, como mucho una conmutación por figura; por ejemplo, filas frente a palabras, porque la propia landing avisa de que «contar filas no es contar discurso».
8. **Pequeños múltiplos a la misma escala, con el máximo rotulado, la media en raya de puntos y el hito del año máximo en una línea.** *Aperturas de Inicio (`FigTermino.astro`): «2.533 · 1976», «Se aprueba la Constitución».*
   - En LyT, por grupo parlamentario o por legislatura.
   - La salvedad «coincidir no es explicar» va en la misma figura.
   - Nada de anotación afectiva ni del libro de códigos de 1931.
9. **Apertura rotativa «Otra pregunta».** *Inicio: 13 preguntas en `<template>`, que llevan el foco al H1 nuevo.*
   - En LyT, varias preguntas de recuento léxico sobre el corpus, cada una con su palabra y su salvedad.
   - Hay que publicarla sin la etiqueta «BORRADOR» y ocultar el botón sin JavaScript.

### Contenido y honestidad

10. **Una página del explorador con capturas reales y «Lo que pide, y lo que no hace».** *`/es/explorador/`: 7 capturas con pie y ampliación ↗; lista de límites.*
    - En LyT tiene que decir, literalmente:
      - que la cabecera de sesión **no** muestra Diario, páginas, Presidencia ni Gobierno;
      - que «Mismo diputado» es **léxico (bm25)**, no semántico;
      - que **no** hay búsqueda por significado, ni comodín en el buscador principal, ni NOT, ni proximidad;
      - que el explorador sirve la **v3 sin depositar (121.700 filas, ids renumerados)**, no la V2.
11. **Metodología como preguntas de revisor, con índice pegajoso numerado y «dónde estoy» sin JavaScript.** *`/es/metodologia/` (`IndiceLateral.astro`, `view-timeline`); en móvil, un `<details>`.*
    - Los 9 pasos del proceso que la landing de LyT comprime en H3 pasan a apartados completos, cada uno con **una** pieza visual.
12. **«Pruébelo» al final de cada apartado.** *`/es/metodologia/`: 10 cierres en mono granate, con enlaces a descarga, ficha o explorador.*
    - En LyT: «Descargue la V2… busque tal sesión en el explorador (v3)», **diciendo que los ids no coinciden entre ediciones**.
13. **La anatomía de una fila real.** *`/es/metodologia/`, apartado 01: las 16 columnas con sus valores, los datos personales tapados con cajas de raya y el texto cortado con «[…]».*
    - En LyT, una fila de la V2 con sus columnas. Si se muestra también la v3, va al lado y rotulada, nunca mezclada.
14. **La tabla por unidad con halteras (antes → después).** *`/es/metodologia/`, apartado 04: vinculación bruta → efectiva por cámara.*
    - En LyT sirve para la identificación de oradores por legislatura, o para V2 → v3, si se verifica sobre la fuente.
    - Si una cifra no se puede verificar, se dice.
15. **Los límites como bloques con titular, no como letra pequeña.** *Inicio: «Faltan cinco países. Conviene decir por qué.» y «Cuatro preguntas sin dueño» (cajas vacías de raya); Metodología 08: «Lo que el corpus no afirma».*
    - En LyT, las 11 advertencias actuales («El texto es OCR», «La V2 arrastra errores de segmentación», «Explorador y CSV no coinciden fila a fila»…) pasan a su página, con cifra y salvedad en la misma frase.
    - «Preguntas sin dueño» dice solo lo que la base **no trae**, sin reintroducir el libro de códigos del prototipo.
16. **Sesiones que usted reconoce, en registro de calendario.** *Inicio (`Sesiones.astro`): fecha en mono, unidad enlazada, qué pasó, «N FILAS»; las que caen en un hueco, en caja de raya y sin cifra; «Que estén no valida su contenido».*
    - En LyT, sesiones célebres de 1931–1939 con su recuento **en la V2**, y la fecha para buscarlas en el explorador.
17. **Un público no académico con su propia página.** *`/es/instituciones/`: dos columnas, cada una abierta con su pregunta en itálica, un camino sin programar y «Lo que no es».*
    - En LyT, por ejemplo: archivos y bibliotecas, docencia, periodismo. Qué públicos entran es decisión del autor.

### Uso y cita

18. **Una escalera de descarga en tres peldaños con el peso de cada fichero y el aviso del formulario antes del clic.** *Inicio (`Salidas.astro`), Usar («El camino, paso a paso», con la barra proporcional al peso) y la banda fija.*
    - En LyT: datos de figura (sin formulario) → V2 depositada (107.551 filas, con su peso) → derivados (Afinidades Elegidas, doi:10.7910/DVN/CGOCUS).
19. **Un diccionario de columnas con su completitud medida y notas al margen.** *`/es/usar/`, «Las 16 columnas»: una tira de completitud por columna, `title` por celda y notas «sex es derivada».*
    - En LyT, la completitud por legislatura o por año de cada columna de la V2.
20. **Citas en texto, BibTeX y RIS, por conjunto y por figura, con la edición y la fecha de consulta.** *`/es/usar/` («Cómo citar»: un desplegable por conjunto) y `Cita.astro`: el botón aparece solo con JavaScript y escribe «Cita copiada.» en `role=status`.*
    - En LyT, citas distintas para la V2 (doi:10.7910/DVN/THQCMI), para Afinidades Elegidas y para cada figura.
21. **Código que reproduce una figura del sitio.** *`/es/usar/`, «Dos fragmentos» en R y Python: «ambos reproducen su serie de la figura de apertura», con la salvedad en un comentario.*
22. **Una banda fija con las dos llamadas y sus avisos siempre a la vista, solo en las páginas largas.** *`/es/metodologia/` y `/es/explorador/` (`BandaCTA.astro`).*
    - En LyT: [Descargar la V2] con el aviso del formulario de Dataverse, y [Abrir el explorador ↗] con «sirve la v3, sin depositar».

### Oficio y sistema

23. **Toda cifra en mono con separador español, «%» con espacio, umbrales de escala impresos, eje solo por décadas o extremos, *kickers* en mono y en mayúsculas.** *En todo el sitio (`base.css`): «2.533 · 1976», «87,05 %», «TURNOS DE HABLA 63 · 7.453 · … · 115.753».*
    - En LyT, dentro de su estética oscura: crema sobre casi negro, oro de acento y serif cursiva de display. Las cifras en mono y la cursiva reservada a «lo que alguien dijo».
24. **La ausencia nunca es un color, y lo interactivo se distingue por la forma.**
    - Raya discontinua para lo no revisado y contorno con etiqueta para los huecos.
    - Enlaces subrayados, botones en caja, foco azul distinto del acento.
    - *Dónde se ve: rejilla, `#voz`, fichas ISO de Metodología 05, registro de sesiones.*
25. **Ediciones a la vista y cierre honesto en el pie; accesibilidad y funcionamiento sin JavaScript como norma.** *Pie de todas las páginas: «Página, edición 0.1 · Datos, edición del 7 de septiembre de 2026», «De dónde sale cada cifra», «Avisar de una errata», «no usa cookies»; «Saltar al contenido»; `hreflang`; tema con `aria-label` que nombra el destino; rampa invertida en oscuro; móvil con códigos cortos, columnas que se retiran e índice plegable.*
    - En LyT, el pie dice: «Datos: V2 depositada (107.551 filas, doi:10.7910/DVN/THQCMI) · Explorador: v3 sin depositar (121.700 filas, ids renumerados)».
    - El tema oscuro necesita su propia rampa (lo claro, más intenso).

### Lo que no conviene copiar tal cual

- Las notas de la apertura rotativa se pierden al rotar (`figuras.ts` no vuelve a enlazar).
- «Otra pregunta» se ve pero no hace nada sin JavaScript.
- «BORRADOR» se ve en producción.
- En las barras de las fichas, la nota es un `<title>` nativo, sin teclado.
- «Usar los datos» (14.242 px, 8 secciones) no tiene índice lateral.
- La cabecera no es pegajosa y no hay «volver arriba» en páginas de más de 14.000 px. Es aceptable con índice y banda, no sin ellos.
