# ParlaIbero como modelo: proceso, arquitectura y narrativa transferibles a Luz y Taquígrafos

Estudio hecho el 2026-09-22 sobre el código y los documentos de `/Users/rodrodr/Dropbox/Apps/parlaibero_site` y sobre
el sitio publicado (`https://rodrodr.github.io/parlaibero/es/`). Todo lo que se atribuye a ParlaIbero sale de esos
ficheros y lleva su ruta. Todo lo que se propone para Luz y Taquígrafos (LyT) es **propuesta**, no decisión, y va
marcado así.

---

## 0. En una página

1. **ParlaIbero no es una landing: es un sitio de siete plantillas** (Inicio · Países con índice y 16 fichas ·
   Metodología · Usar los datos · Para parlamentos y organismos · Explorador · 404), en tres lenguas: 68 páginas y
   502 claves × 3, según `docs/00_PLAN_landing.md`. **Inicio es solo la puerta** (≤ 700 palabras). Lo que no cabe
   ahí no se resume: **se muda a una página de profundidad** de 500 a 2.000 palabras, con su índice, sus figuras y
   sus llamadas.
2. **La narrativa se aprobó antes que el copy, y el copy antes que el primer píxel.** Hubo cinco puertas, y en cada
   una se aprobó algo concreto (§4). La puerta que importa es la 1: un documento de ≤ 1.500 palabras con tesis,
   lectores, arco y lo que no se dice, más **decisiones en forma de opciones A/B/C con su contra**.
3. **Inicio se escribe como un arco de preguntas, no como un inventario de secciones.** Son seis preguntas: dos se
   contestan con un hecho medido, dos las contesta el lector con sus manos y dos se le entregan. El método y los
   límites aparecen **pegados a la cifra que matizan**, nunca en un capítulo propio.
4. **Las figuras son interactivas, pero no dependen del JavaScript.** Se emiten como SVG en el build. Llevan
   pestañas Gráfico · Tabla · Datos, nota emergente con «n de N», teclado, un selector de medida y datos
   descargables (CSV, XLSX y LÉAME) sin formulario. La portada rota entre trece preguntas, todas con la misma
   gramática visual. El JS de cliente es una isla mínima (presupuesto: ≤ 35 KB gz).
5. **Ninguna cifra se teclea.** El copy lleva marcadores `{{clave}}`. El build los resuelve contra datos generados,
   cada cifra sale envuelta con su clave de procedencia, y una auditoría sobre `dist/` rompe el build si aparece un
   dígito sin procedencia. Este mecanismo resuelve **el problema de LyT**: distinguir siempre la V2 depositada
   (107.551 filas) de la v3 del explorador (121.700 filas). ParlaIbero ya distingue claves: P (depositado), C
   (canónico de trabajo), L (linkage) y M (monografía).
6. **Lo que se transfiere es el método, no la piel.** La paleta granate, la tipografía de ParlaIbero, la obligación
   de la AEI y el trilingüe son decisiones de ese proyecto. La regla de **no nombrar a nadie que figure en los
   datos** también lo es: en LyT, con datos de 1931-1945, esa regla es una **decisión abierta del investigador**.

---

## 1. Qué se leyó y qué se comprobó

| fichero | qué es | lectura |
|---|---|---|
| `parlaibero_site/README.md` | las tres reglas del código, cómo se actualizan datos y textos, puertas automáticas y obligaciones de la AEI | entero |
| `docs/00_PLAN_landing.md` | el plan aprobado: decisiones, reglas, arquitectura, figura de cobertura, datos, diseño, etapas y puertas, riesgos | entero |
| `docs/01_NARRATIVA_landing.md` | Puerta 1: tesis, lectores, arco de seis preguntas, apertura, lo que no se dice, cuatro decisiones | entero |
| `docs/02_COPY_es.md` | Puerta 2: el copy íntegro de las siete plantillas, con marcadores, notas de diseño y anexos A–D | entero (2.082 líneas) |
| `docs/02a_MARCADORES.md` | catálogo de marcadores con valor, fuente y clave | entero |
| `CHANGELOG.md` | lo que cambió en la Puerta 4, tras la revisión del investigador en la vista previa | entero |
| `diaries/docs/_scrollytelling/NARRATIVA_parlaibero.md` §5–§8 y `parlaibero-guion.md` §0 y §5 | las reglas editoriales «ya fijadas» que el plan hereda, y las alternativas descartadas | esas secciones |
| `src/components/*.astro`, `src/scripts/figuras.ts`, `src/config/portada.ts`, `src/pages/[lang]/*.astro` | cómo están hechas las figuras y la navegación | cabeceras y comentarios |

**Comprobado en vivo** (`curl`, 2026-09-22):

- `/es/` responde. Su navegación dice «Países · Metodología · Usar los datos · Parlamentos y organismos · Explorador».
- En la página van las trece preguntas de la apertura rotativa, de «¿Cuándo se habla de democracia en el pleno?» a
  «¿Se habla de pobreza donde más pobreza hay?». Después vienen «¿Qué hay, y desde cuándo?», «¿Quién ocupa el
  tiempo del pleno?», «¿Qué se dijo aquel día?», «Cuatro preguntas sin dueño» y «Tres años de trabajo. Una descarga.»,
  con las tres salidas.
- `/es/metodologia/`, `/usar/`, `/instituciones/`, `/explorador/`, `/paises/` y `/paises/sv/` devuelven 200.

`dist/` tiene 67 `index.html` más `404.html`, lo que encaja con las 68 páginas del plan.

---

## 2. La arquitectura

### 2.1 Mapa de rutas (`00_PLAN_landing.md`, «Páginas»; `src/pages/`)

```
/                         selector de lengua estático (lleva también la mención de la AEI)
/[lang]/                  Inicio — la puerta
/[lang]/paises/           índice: la rejilla de cobertura ES el índice
/[lang]/paises/[iso]/     16 fichas, una sola plantilla
/[lang]/metodologia/      lectura larga (≈1.500–1.800 palabras en el plan)
/[lang]/usar/             Usar los datos
/[lang]/instituciones/    Para parlamentos y organismos
/[lang]/explorador/       presentación del explorador con 7 capturas reales (añadida en la Puerta 4)
/404.html                 trilingüe apilado
/datos/…                  datos de figura (CSV/XLSX/LÉAME), imagen de figura PNG/SVG por lengua, procedencia.csv
reservadas y OCULTAS mientras estén vacías: historias/ · terminos/ (buscador tipo Ngram) · <Hueco id="scrolly">
```

La regla de las rutas reservadas es explícita: «solo se pintan si existen (nunca "próximamente")» (`00_PLAN`,
«Fuera de esta versión»).

### 2.2 Plantilla por plantilla

Recuentos de palabras. El **tope** de Inicio es el del plan, y su recuento real está en el anexo A del copy. Los
demás son **recuentos aproximados míos** sobre `02_COPY_es.lectura.md`: texto para el lector, sin notas de diseño ni
código, con metadatos y rótulos incluidos.

| plantilla | propósito | público | palabras | figuras | llamadas |
|---|---|---|---|---|---|
| **Inicio** | la puerta: se decide «en noventa segundos» (`01_NARRATIVA` §1) | los ocho lectores a la vez: seis académicos, un servicio parlamentario y un organismo. «Inicio es **uno solo**… no se separan recorridos, se unen con casos» | **≤ 700** (698 al aprobarse; ≈ 704 tras quitar nombres) · **≤ 120 de límites** (115) | apertura rotativa (FigVoz + 12 FigTermino) · rejilla de cobertura (leyenda breve) · lista de sesiones-hito | datos de la figura · ver turnos y oradoras · busque su cámara · ábrala en el explorador · tres salidas · copiar la cita |
| **Países · índice** | qué hay de cada cámara, año por año | quien compara, y quien busca su país | ≈ 280 | rejilla completa, con leyenda larga «Cómo leer la rejilla», pestañas y tabla de 10 columnas | cada fila lleva a su ficha · datos de la figura, «sin formulario» |
| **Ficha de país** ×16 | todo lo de una cámara, sin salir | quien ya eligió país | ≈ 500 por plantilla | TiraAnual (cobertura de esa cámara) · VozDecadas (su serie, con el techo común del eje) | Descargar en Dataverse (con el aviso encima) · Abrir el explorador · copiar la cita · ficha anterior/siguiente |
| **Metodología** | lo que preguntaría un revisor, con cada límite en la frase de su cifra | revisor, investigador | plan ≈ 1.500–1.800; copy «unas 1.800»; hoy ≈ 2.100 tras añadir la familia de infraestructuras y la novedad fechada | fila real desplegada (16 columnas) · esquema de 5 pasos · barra apilada + tabla por cámara · rótulo de validación en ficha mono | banda fija: Descargar los datos · Abrir el explorador · un «Pruébelo» al cierre de cada uno de los 10 apartados |
| **Usar los datos** | pasar de «quiero» a «tengo el archivo abierto» | quien va a descargar | ≈ 850 | tabla de columnas con tira de disponibilidad (16 celdas por columna) | tres salidas · Descargar en Dataverse · Copiar la cita (texto/BibTeX/RIS) · Avisar de una errata · Escribirnos |
| **Parlamentos y organismos** | dos caminos sin programar | biblioteca o servicio de un congreso · organismo internacional | ≈ 560 | — (enlaza la figura y su imagen descargable) | Descargar en Dataverse · Abrir el explorador · Descargar la tabla · Descargar la imagen · Escribirnos |
| **Explorador** | enseñar la herramienta con capturas reales | todos; sobre todo quien no programa | ≈ 1.090 | 7 capturas reales (`src/assets/explorador/`, con LÉAME) | banda fija: Abrir el explorador · Descargar en Dataverse |

**Inicio, movimiento a movimiento** (copy §2 y componentes de `src/components/inicio/`):

| # | bloque (componente) | qué dice | salvedad en la misma frase |
|---|---|---|---|
| 0 | cabecera + **franja AEI** | nombre, descriptor «Los debates del pleno, turno por turno» y la banda obligatoria | — |
| 1 | **Apertura** (`AperturaRotativa` → `Apertura`/`FigTermino`) | la pregunta sola, en h1, y debajo la figura de 16 paneles. Desde la Puerta 4 rota entre 13 preguntas en cada visita; sin JS se ve siempre la aprobada | «Mide voz, no presencia… No ordena países.» |
| 1b | **Tesis** (`Tesis`) | tesis → analogía del laboratorio → familia (PELA-USAL, Latinobarómetro, ParlaMint, Manifesto Project) → remate «Tres años de trabajo. Una descarga.» → **línea-credencial en mono**, que baja tras la tesis | — |
| 2 | **¿Qué hay, y desde cuándo?** (`Cobertura`) | rejilla país×año; «Todo lo que había. No una muestra de lo que había.» y los cinco ausentes con su motivo | «El tono dice cuánto material hay, no cuánto se debate.» |
| 3 | **¿Quién ocupa el tiempo del pleno?** (`Pleno`) | la unidad, un **fragmento literal sin nombre** (partido · cámara · fecha) y la vinculación descompuesta | «Compare por país, nunca desde la cifra agrupada.» |
| 4 | **¿Qué se dijo aquel día?** (`Sesiones`) | seis sesiones que el lector reconoce, con sus filas, y dos que caen en un hueco declarado | «Que estén no valida su contenido.» |
| 5 | **Cuatro preguntas sin dueño** (`SinDueno`) | tema · tono · posición · voto: qué existe y qué falta. «Aquí entra usted.» | — |
| 6 | **Tres años de trabajo. Una descarga.** (`Empezar` + `Salidas`) | tres salidas según lo que la persona **sabe hacer**, con el aviso del formulario encima y la cita | identificadores estables solo dentro de una edición |

### 2.3 Navegación

- **Cabecera.** Wordmark «Escalera» (`Escalera.astro`): 16 barras generadas desde `paises[]`, con el arco temporal
  de cada corpus. «Es marca, no dato» y el hueco declarado va en blanco. Al lado, el descriptor en cuerpo pequeño,
  sin cifra.
- **Pestañas de primer nivel** (sustantivos). Comprobado en vivo el 2026-09-22: la marca lleva a Inicio, y las cinco
  pestañas son Países · Metodología · Usar los datos · Parlamentos y organismos · Explorador. La última se añadió a
  petición del investigador, «a la derecha de "Parlamentos y organismos"». **En la cabecera no hay botones de
  acción**: las llamadas viven en el cuerpo, en la banda fija y en el pie.
- Con cinco pestañas, la cabecera va en una fila desde 72 rem y en dos filas por debajo: marca e idiomas arriba,
  navegación debajo (`CHANGELOG`).
- Completan la cabecera el selector de idioma (ES Español · EN English · PT Português (Brasil)), el tema
  claro/oscuro (◐) y «Saltar al contenido».
- **Índice lateral** (`IndiceLateral.astro`). En escritorio va pegajoso; en móvil es un `<details>` nativo. «Dónde
  estoy» se marca con `view-timeline`, sin JS. La numeración la pone un contador de CSS: ningún número se teclea.
- **Banda fija de acción** (`BandaCTA.astro`), en Metodología y Explorador. Lleva los dos botones y sus dos avisos
  siempre a la vista, «para que el formulario quede anunciado antes de cualquier clic». Reserva su hueco al final
  del documento para no tapar el pie.
- **Pestañas por figura** (`Pestanas.astro`): Gráfico · Tabla · Datos, hechas con tres radios y `:has()`. Sin
  `:has()`, las tres partes se leen seguidas.
- **Ficha anterior / Ficha siguiente** (`ficha/Vecinas.astro`), en el orden fijo de la rejilla.
- **Pie en orden fijo**: bloque AEI · quién · depósito y Diario · licencia · edición (Página ed. N · Datos ed. M) ·
  privacidad · enlaces. Entre los enlaces van «De dónde sale cada cifra» (→ `procedencia.csv`), «Avisar de una
  errata» (Issues) y «Escribirnos» (correo).
- **Un rótulo por destino** (copy §0.1, tabla). Por ejemplo, [Descargar los datos] lleva siempre a `/usar/` y
  [Descargar en Dataverse] siempre a un DOI.

### 2.4 El camino ligero y la escalera de descarga

**El diagnóstico** (`00_PLAN`, «Contexto»): «El embudo real es landing → Dataverse → explorador, y tiene fricción:
guestbook, CSV de 98 MB a 1,6 GB y un explorador solo en español. Un organismo internacional no descarga el corpus:
**cita una figura**. Hace falta un peldaño sin descarga.»

**La escalera, en su versión final**, decidida en la Puerta 1 (decisión 4, opción A):

| peldaño | título (lo que la persona sabe hacer) | qué recibe | fricción |
|---|---|---|---|
| 0 | **Sin programar** | los datos de cada figura (CSV + XLSX + LÉAME, y la imagen PNG/SVG con su cita y la mención de la AEI), **o** El Salvador en el explorador (98 MB, 2018–2025) | la figura, **sin formulario** («son datos agregados»); El Salvador, con formulario |
| 1 | **Con R o Python básico** | el CSV de un país, de `{{csv.min}}` a `{{csv.max}}` | formulario de Dataverse |
| 2 | **Con métodos de texto** | los 16, `{{csv.total}}`: «Es donde hay que aprender, y es aprendible.» | formulario, 16 veces |

La opción B, descartada, titulaba los peldaños por peso («unos KB, sin formulario» · «98 MB» · «hasta 1,6 GB»).
Se descartó porque «a un servicio parlamentario le habla "sin programar", no "98 MB"».

**Reglas del camino**:

- el aviso del formulario va **siempre encima** del botón, nunca en una nota emergente, y dice los cinco campos y el
  motivo, este último con redacción del investigador;
- el peso del fichero va junto a cada botón, en la unidad que ve el lector en Dataverse (KiB rotulado KB);
- la garantía se repite con la misma frase: «Se abre en su navegador; nada sale de su equipo.»;
- se enseña solo lo que existe. El cuaderno y el subconjunto de prueba «aún no existen»; la muestra multipaís queda
  «en una edición posterior».

### 2.5 Cómo están hechas las figuras interactivas

Este punto responde directamente a la queja «no hay gráficos interactivos».

| figura | archivo | qué hace | cómo sigue funcionando sin JS |
|---|---|---|---|
| **Voz por cámara** | `components/FigVoz.astro`, `viz/geom/voz.ts` | pequeños múltiplos: 16 paneles en **orden fijo** (década de entrada), nunca por valor, **sin selector de país ni ranking**. Eje Y compartido e igual en las tres medidas (palabras · turnos · oradoras), que se cambian con un control. Nota emergente «23,41 % · 4.441.241 de 18.967.908 palabras». Padrón sin auditar: **otro trazo** (discontinuo, punto hueco), «nunca solo otro color» | radios + `:has()`; la tabla y la descarga, en sus pestañas |
| **Huella de un término** (12 figuras de la portada) | `FigTermino.astro`, `config/portada.ts` | «veces por millón de palabras dichas», año a año. Es **hermana** de la figura de la voz («Rotar de pregunta no puede parecer cambiar de sitio»). Raya de referencia en la media, rótulo en el año más alto y **hito histórico por cargo, sin nombres**, siempre en el mismo sitio del panel | sin JS se ve la primera apertura; las demás viajan en `<template>` y el botón «Otra pregunta» las recorre |
| **Rejilla de cobertura** | `FigRejilla.astro`, `viz/geom/rejilla.ts` | país × año, 1976–2025. Tres estados de celda: con sesión (tono por quintiles, con los cortes impresos) · hueco declarado (papel con contorno y rango rotulado) · antes de la serie (vacía). «**La ausencia nunca es un color.**» Cada fila es un enlace a su ficha; las flechas recorren los años | la fila sigue siendo un enlace y los valores están en «Tabla» |
| **Tira de columnas** | `Columnas.astro` | 16 celdas por columna del diccionario. Codifica por **llenado**, no por tono, para que valga igual en tema claro y oscuro. La base de cada tira va escrita. En los bordes la cifra trunca: 99,9999 % no se lee «100 %» | es una tabla con `role` explícito |
| **Cobertura de una cámara** y **voz de una cámara** | `ficha/TiraAnual.astro`, `ficha/VozDecadas.astro` | la cámara contra sí misma, con el techo del eje igual al de la figura de apertura | `<title>` nativo + tabla desplegable |
| **Barra de «Quién habla»** | en `metodologia.astro` | tres partes (no puede ocupar escaño · voz colectiva · laguna nuestra) + tabla de 16 filas en el orden de la rejilla | — |

Principios técnicos, de `00_PLAN` y de las cabeceras de los componentes:

- el SVG se emite en el build, con geometría pura compartida entre el build y el cliente;
- las formas van en SVG y **todo el texto en HTML encima**, para que no encoja en el móvil y para que cada cifra
  lleve su envoltorio auditable;
- sin d3 ni GSAP en el cliente. El presupuesto es JS ≤ 35 KB gz e Inicio ≤ 300 KB; con la portada rotativa, Inicio
  pasó de 46 a 98 KB comprimidos, y el investigador lo aceptó;
- el movimiento solo se activa con `prefers-reduced-motion: no-preference` (120 ms / 240 ms / una entrada ≤ 900 ms);
- cada figura trae alt corto + descripción larga (`aria-describedby`), recorrido con teclado y región viva para el
  lector de pantalla.

---

## 3. Reglas editoriales

### 3.1 De contenido (plan, «Reglas que gobiernan el trabajo»; guion §0 y §5; narrativa §5)

| regla | formulación en ParlaIbero | ejemplo aplicado |
|---|---|---|
| **El fragmento es el argumento, no el número** | «Se abre con textos reales y se llega a los diez millones, nunca al revés» (guion, principio 1) | Inicio §2.3: la fila del frijol, literal, antes de la vinculación |
| **La escala no es portada** | «Diez millones de filas no son un argumento» (narrativa §2) | 10.091.060 filas solo en la credencial y en el pie |
| **Ninguna cifra sin su denominador** | `<Cifra tipo="pct">` exige denominador; la nota emergente dice «n de N palabras» | «De 9.868.087 turnos de habla, en el 87,05 %…» |
| **El límite va en la misma frase que la cifra** | «un límite reconocido en la misma frase que da la cifra persuade; un capítulo de disculpas se lee como si hubiera algo que esconder» (narrativa §5) | «Mide voz, no presencia. El sexo lo asignamos nosotros, con más error en mujeres…» |
| **El método aparece pegado a un hecho** | «nunca como capítulo previo a los hechos» (narrativa §5) | Metodología no recorre etapas: «Responde lo que preguntaría un revisor» |
| **La novedad, fechada y verificable** | «no hemos localizado…», con la fecha de la búsqueda y lo que sí existe al lado; sin la fecha, el bloque no se pinta | Metodología, `metodologia.novedad` |
| **Prohibido «innovador»** y equivalentes; prohibido «próximamente» | lista de palabras vetadas en `check-i18n` | — |
| **No comparar por tamaño** con otros corpus | los tamaños de ParlSpeech, etc., «no se publican: se nombra lo que existe, sin comparar tamaños» | — |
| **Europa no es vara de medir** | la frase de la literatura «no opone "Europa" a "aquí"» | — |
| **Nunca prometer tema, tono, posición ni voto** | «cajas vacías con nombre», en positivo y al final | Inicio §2.5 |
| **Mostrar antes que afirmar** | «Donde no haya demostración posible, se recorta la afirmación» (guion §0) | se retiró la tesis «lo convierte en una consulta» |
| **Las exclusiones se enseñan** | «es lo que hace creíble la palabra censal» (guion, principio 2) | los cinco ausentes, con su motivo, bajo la rejilla |
| **El lector opera al menos una affordance** | guion, principio 3 | Metodología: «Pruébelo» en cada apartado; «Abra una» en Inicio |
| **Se enseña la costura** | «Cada caso declara con qué se hizo» (guion, principio 6) | dos fragmentos R/Python que reproducen la serie de la figura |
| **La dificultad se dice** | «Un público de investigadores detecta el silencio sobre el coste de entrada» | «Aquí las variables hay que construirlas.» |
| **No se guioniza un hallazgo que no se ha corrido** | guion, principio 7 | el acto I (degradación del debate) «no está medido ni verificado: no se usa» |
| **Orden fijo, nunca por valor; sin ranking** | «No ordena países» es una frase fija | orden de la rejilla en todas las figuras y tablas |
| **La ausencia nunca es un color de dato** | huecos: papel con contorno y etiqueta | rejilla, tiras y wordmark |
| **Una salvedad dice qué no mide la figura, no qué no contiene la base** | corrección del investigador, 2026-09-21 (`config/portada.ts`) | — |
| **Ediciones e identificadores** | la única excepción al «nada de proceso», porque omitirla produce errores de uso | «Los identificadores son estables dentro de una edición, no entre ediciones.» |
| **Una sola magnitud por frase**; una sola clave de edición por bloque | `02_COPY` anexo B, nota 1; puerta del exportador | — |
| **Ningún nombre de quien figure en los datos** | directiva de ParlaIbero (§6: en LyT es decisión abierta) | eventos contados «por cargo, país y fecha» |

### 3.2 De estilo (copy §0.1, «Hoja de estilo»)

- «Usted» siempre. El proyecto dice «nosotros», nunca «el investigador».
- Una idea por unidad; **ninguna frase pasa de treinta palabras**.
- **Frases fijas** (`comun.fija.*`, marcadas ↺): una redacción, repetida idéntica en todas las páginas. Por ejemplo,
  «Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de su cámara.»
- Porcentaje con artículo («el 87,05 %»). El espacio indivisible lo pone el build.
- Género: masculino plural para el conjunto y femenino cuando ellas son el sujeto. Se desdobla **una vez por
  página**, al definir el denominador. Se prefiere «quien preside». Nunca barra, @ ni -e.
- «Diario», con mayúscula, para el registro oficial de cualquier cámara.
- Comillas «» y, dentro, “”. Raya de inciso pegada, un inciso por frase.
- **Sin jerga de taller**: reproceso, mobiliario, canónico, rampa, escalón, guestbook, dataset. «Archivo», no
  «fichero».
- Rótulos: botones con infinitivo + objeto ([Descargar los datos]); pestañas y navegación con sustantivos;
  imperativo de usted solo en prosa; **un rótulo por destino**.
- **Glosario** de una línea por término (copy §0.3). Es la fuente de las definiciones y de la traducción. Ejemplos:
  «**Hueco declarado.** Años dentro de la serie de una cámara que su repositorio no tiene…»; «**Laguna nuestra.**
  Un turno de un diputado que no logramos vincular. Es una falta nuestra, y se dice así.»

### 3.3 De cifras: «Mide, no cites»

- **Ningún número se teclea.** El copy lleva `{{clave|formato}}` (`|letra`, `|fecha_larga`, `|peso`; subcampos
  `.n` `.pct` `.den` `.pais`).
- `src/lib/cifras.ts` resuelve los marcadores contra `src/data/` y emite `<data class="cifra" data-k="clave">`.
- `scripts/audit-cifras.mjs` recorre `dist/` y falla con cualquier dígito sin envoltorio. Además recalcula cada
  valor desde `src/data/` y comprueba que el texto visible diga lo que dice `value` (README).
- **Cada valor lleva su clave de procedencia**: P depositado · L linkage · C canónico de trabajo · M monografía ·
  D DOIs · CALC · REGLA. Hay un anexo público, «¿de dónde sale este número?» (`procedencia.csv`).
- **Las discrepancias se cierran antes de escribir el copy.** Hay una tabla con cada cifra que circula con varios
  valores y la decisión tomada (`00_PLAN`, «Discrepancias»). Por ejemplo: filas 10.091.060 depositadas frente a
  10.091.210 canónicas → «depositadas (P)»; decisiones registradas 628 · 632 · 471 → «no se publica el recuento»;
  oradores 24.868 · 24.874 · 24.876 → «no viaja a Inicio hasta conciliarla».
- **Lo que no está medido en navegador no se dice como si lo estuviera.** Los tiempos del explorador se rotulan
  «hechos fuera del navegador con el mismo motor», y el bloque se puede suprimir de una pieza.

### 3.4 Antipatrones que el investigador rechazó, y por qué

| antipatrón | dónde consta | por qué se rechazó |
|---|---|---|
| **«Presentación burocrática de la base de datos»**: la pieza anterior, rechazada entera | `00_PLAN`, «Reglas» | «la primera pregunta llegaba en la pantalla 44 de 75 y el 28 % eran límites antes del primer hallazgo». El proceso de construcción ocupaba «casi un tercio antes del primer hallazgo» (narrativa §5) |
| **La escala como portada** (10.091.060 turnos, 1.634 millones de palabras) | narrativa §8 | «la escala no convence a nadie: era la portada rechazada» |
| **Una cifra de calidad como apertura** (87,05 %) | narrativa §8 | «su sitio es el segundo movimiento» |
| **Un rango entre países como apertura** (Paraguay frente a México) | narrativa §8 | «invita a leer un ranking» y a que la pieza «se lea como una base de género» |
| **Una cifra agrupada** (panel EC+ES+PT, 2,17 → 34,97 %) | `00_PLAN`, cabecera; `01_NARRATIVA` §6 | ibérica en dos tercios, con Ecuador sin auditar, y contraria a la monografía §9.9 («not from a pooled figure») |
| **Turnos como medida pública** | `01_NARRATIVA` §6 | incluyen a quien preside. En España, años veinte: 59,95 % de los turnos y 42,13 % de las palabras |
| **Sobreafirmar la tesis** («lo convierte en una consulta») | `01_NARRATIVA` §3 | «en Inicio no hay ninguna consulta»; «aquí las variables hay que construirlas» |
| **El catálogo**: seis familias de preguntas, un muro de seis tarjetas, funcionalidades en viñetas, iconos | narrativa §7; guion §5; `00_PLAN`, «Fuera»; copy («Sin iconos») | «Seis familias son un catálogo, y el catálogo es lo que usted rechazó». «Una funcionalidad pide que la admiren, una pregunta pide que la respondan» |
| **Selector de país en el hero** y **banda de cifras** | `00_PLAN`, «Fuera de esta versión» | la pregunta tiene que ser lo primero, y el selector lleva al ranking |
| **Diagrama de 13 etapas, tabla de decisiones y su recuento** | `00_PLAN`, «Metodología» | el método se cuenta en 5 pasos y lo demás se enlaza. El recuento circula con tres valores |
| **Capítulo de límites o de disculpas** | narrativa §5 | se lee como un «pliego de descargo». Tope: ≤ 120 palabras de límites en Inicio, todas en la frase de su cifra |
| **«Somos los primeros»**, sin fecha | narrativa §7–§8 | «defensiva, envejece mal». Se dice fechado: «no hemos localizado…» |
| **«Próximamente»** y ganchos vacíos a la vista | `00_PLAN`; `check-i18n` | lo que no existe no se pinta |
| **Cierre con eslogan** («Su próxima comparación empieza…») | copy §2.6, nota | «era un eslogan» |
| **«Los diputados» como genérico junto a «diputadas»** | `CHANGELOG`; `01_NARRATIVA` §6 | se leía como un contrasentido. Pasó a «los representantes» |
| **Nombres de jefes de Estado o de parlamentarios** en divulgación | copy, cabecera; README, regla 3 | directiva de ParlaIbero: los hechos se cuentan por cargo, país y fecha |
| **Reproducir textos depositados que nombran a personas** | copy §4 | se **enlazan**, con el aviso del formulario encima |
| **Afirmaciones no comprobadas sobre la herramienta** («necesita esa memoria libre») | copy, anexo D.1 | se sustituyen por lo que el código muestra de verdad: «Memoria necesaria: unos…» |
| **Citar entre comillas un rótulo que la interfaz no enseña** | `CHANGELOG` | lo destapó la retrotraducción: «Quién habla de cada tema» solo estaba en el README del explorador |
| **Una referencia bibliográfica mal leída** (Castanho Silva et al. 2025) | `01_NARRATIVA`, procedencia | medía el estilo, no cuánto se habla. Se retiró |
| **Un bloque pegajoso que monta sobre otros** | `CHANGELOG` | lo vio en la vista previa. Ahora lo vigila la prueba `tests/solapes.spec.ts` |
| **Granate reservado para lo que no es dato** | `00_PLAN`, cabecera; `CHANGELOG` | el investigador pidió los gráficos en granate (colores de la USAL). Lo interactivo se distingue por la forma: subrayado, caja, foco azul |

---

## 4. El proceso por puertas

Tabla de `00_PLAN`, «Etapas y puertas», completada con lo que dicen las cabeceras de cada documento.

| etapa | qué se produce | qué se aprueba | cómo se aprobó en ParlaIbero |
|---|---|---|---|
| **0** | repositorio con **solo `docs/`** | — | — |
| **Puerta 1 · Narrativa** | `01_NARRATIVA_landing.md`, ≤ 1.500 palabras (≈ 2.240 con la tabla de procedencia): tesis y alternativas descartadas · lectores · arco con hecho y salvedad · lo que no se dice · **decisiones A/B/C** · procedencia de cada cifra | la tesis, la apertura, la medida pública y la forma de «por dónde empezar» | cuatro decisiones escritas en la cabecera del documento. Antes, **cuatro lectores independientes y adversariales** revisaron el borrador. La narrativa **corrigió tres puntos del plan**, y el plan lo dice en su cabecera: «Prevalece la narrativa aprobada» |
| **Puerta 2 · Copy ES** | `02_COPY_es.md`: las plantillas íntegras, **con marcadores y sin diseño**, notas de diseño separadas, glosario y hoja de estilo, más `02_COPY_es.lectura.md` (GENERADO, con las cifras de hoy puestas) y `02a_MARCADORES.md` | el texto entero, los **tests de rechazo** (primera pregunta en la pantalla 1 · 0 % de límites antes del primer hallazgo · ≤ 120 palabras de límites · ≤ 700 en Inicio) y la lista de mediciones nuevas que exige | «Apruebo el copy; mantén los dos términos». **El español queda CONGELADO**: solo se toca por errata o por decisión suya |
| **3 · Datos y andamiaje** | exportador en el proyecto de datos (proyecta, no mide), Astro, componentes, figuras | — | las mediciones nuevas, «solo las que exija el copy aprobado», con su permiso |
| **Puerta 3 · Traducciones** | glosario trilingüe vinculante, EN y pt-BR | — | «si veo algo raro luego, cambiamos a posteriori» |
| **Puerta 4 · Datos y visuales** | vista previa local: Inicio, Países y una ficha a 375 y 1440 px, claro y oscuro, tres lenguas, más el diff de `src/data` | lo que ve en pantalla | sus cambios quedaron aplicados y anotados en `CHANGELOG`: el granate, «representantes», la maquetación de Instituciones, la portada rotativa con dos mediciones nuevas, «infraestructura de datos» subrayada y la **página Explorador**, que añadió él |
| **Puerta 5 · Publicación** | informe de verificación; prueba del embudo con tres personas ajenas | — | acciones **solo del investigador**: crear el repositorio, activar Pages, autorizar el `push` y los enlaces entrantes |

**Mecanismos del proceso que conviene copiar tal cual:**

1. **Cabecera de estado en cada documento.** Cada documento empieza con «✅ PUERTA N SUPERADA — fecha», las
   decisiones tomadas y lo que sigue abierto. Quien abre el archivo sabe en qué punto está.
2. **Opciones, no preguntas.** Cada decisión llega como «(a) … la recomiendo · (b) … · (c) …», cada opción con su
   contra (narrativa §8).
3. **Anexos de rendición de cuentas en el copy**:
   - A: los tests de rechazo, con su recuento real y lo que queda fuera del recuento «para que usted lo juzgue»;
   - B: los marcadores nuevos y de qué archivo sale cada uno («¿medir o proyectar?»);
   - C: las dudas que solo él puede resolver, marcadas ✅ al cerrarse;
   - D: las correcciones de los lectores que **no** se aplicaron, y por qué.
4. **«Cómo se hizo» en la cabecera del copy.** Cinco redactores, uno por plantilla; cuatro lectores (un verificador
   de cifras y código, un escéptico con los criterios de rechazo del investigador, una lectora institucional y una
   editora de estilo); un editor que funde todo en una voz; y un control automático.
5. **Ejemplos resueltos** (Uruguay, Brasil) para comprobar la concordancia de una plantilla antes de construirla,
   con las «trampas» que aparecieron al resolverla.
6. **Lo pendiente se ve.** En la vista previa, un dato pendiente sale como etiqueta amarilla `⟦clave⟧` y un texto
   sin copy como `data-todo-copy`. `STRICT=1 npm run build` falla con cualquiera de los dos.
7. **La deuda se declara.** Los textos de la portada rotativa viven fuera del copy congelado
   (`src/config/portada.ts`), marcados como «BORRADOR… NO es el copy», hasta que se muden con su clave.
8. **Puertas automáticas que bloquean el despliegue** (README):
   - `check-i18n`: claves, marcadores, números tecleados y palabras vetadas;
   - `audit-cifras`: cifras sin procedencia, nombres vetados, descripciones de más de 155 caracteres y recursos de
     terceros;
   - `check-funding`;
   - Playwright: humo (un `h1` por página, sin errores de consola, cabe en 360 px), sin JS, solapes y franja de la
     AEI.

---

## 5. Las páginas de profundidad, una a una

### 5.1 Metodología (`/metodologia/`, copy §5)

- **Forma.** Índice lateral pegajoso con 10 entradas y banda fija con [Descargar los datos] y [Abrir el
  explorador], cada botón con su aviso. Cada apartado se cierra con un **«Pruébelo.»** que lleva a un destino
  concreto.
- **Extensión.** «Unas 1.800 palabras de texto para el lector»; hoy ≈ 2.100 según mi recuento.
- **Cabecera.** Subtítulo: «Qué hay en cada fila, qué se midió y qué no se afirma.» Entradilla: «Esta página no
  recorre el proceso etapa por etapa. Responde lo que preguntaría un revisor, con cada límite en la misma frase que
  su cifra.» Detrás van la **familia** de infraestructuras de datos, cada proyecto con su verbo, y la **novedad
  fechada**, que vive aquí porque «no cabe en las 700 palabras de Inicio».

| # | apartado | contenido y frase ancla | figura | «Pruébelo» |
|---|---|---|---|---|
| 1 | Qué es una fila | la unidad es el turno tal como lo marca el Diario; 16 columnas. «El texto no está resumido ni lematizado. El orden se conserva. Y el orden es información.» «El Diario no es la sesión: es lo que cada cámara publicó de ella.» | **una fila real desplegada** en sus 16 columnas, con las dos del orador en blanco a propósito y la nota «Quién habla está en los datos. Aquí no se muestra.» | descargar El Salvador y abrirlo |
| 2 | De dieciséis tradiciones tipográficas a una tabla | **5 pasos, no 13**. «Un marcador sin reconocer entierra un turno dentro del anterior, y ningún recuento lo ve.» «Las filas las produce código determinista. El modelo de lenguaje escribió ese código y reconoció las páginas escaneadas más antiguas.» | esquema horizontal numerado, sin iconos | ver la fuente en la ficha |
| 3 | Habla y no habla | «Nada se borra del Diario.» Marca asimétrica: «Un `1` no significa "habla verificada"…» «Filtrar le corresponde a usted. Decidir por usted, no.» | — | la primera entrada de cada sesión en el explorador |
| 4 | Quién habla | vinculación bruta 87,05 % y efectiva 98,12 %, qué descuenta cada una y la descomposición de lo que falta. «La distancia entre las dos tasas es propiedad del Diario, no del procesamiento.» | barra apilada de tres partes y tabla de 16 filas **en el orden de la rejilla** | datos de la figura |
| 5 | El sexo es una variable derivada | exactitud 98,98 % (99,54 % en hombres, 97,43 % en mujeres, sobre 38.372 filas) y cinco padrones sin auditar. **Auditoría de género**: «Cuando un patrón falla, quien desaparece es, con más frecuencia, una mujer», con el caso PRESIDENTE/PRESIDENTA | — | datos de la figura de apertura |
| 6 | El reconocimiento óptico: lo que falló | el modelo de visión escribió texto propio dentro del Diario; 1.949 fragmentos retirados; «La clase está acotada, no cerrada.» «Lo que no está en el píxel no se inventa.» | — | limitaciones de Ecuador |
| 7 | Validación y revisión humana | «Fuga del filtro PASS/FLAG: 0,5 % [0,09–2,78]». Rótulo, muestra y fecha van en **un bloque indivisible**. «No es la tasa de error del archivo que usted descarga.» «"Revisado" no significa "sin defectos conocidos".» | ficha destacada en mono | limitaciones de su cámara |
| 8 | Lo que el corpus no afirma, y cómo comparar | «No trae tema, tono, posición ideológica ni voto»; `legislature` no es comparable; «tasas dentro de un país… Nunca volúmenes entre países» | — | leer el diccionario |
| 9 | Ediciones, identificadores y reproducibilidad | abre con «Quien construye sobre datos ajenos necesita saber qué se mueve y qué no.» La reproducibilidad tiene una frontera medida: «Quien cite la reproducibilidad de este corpus debe decir desde dónde.» | — | copiar la cita de su país |
| 10 | La documentación completa | «Esta página resume. Lo completo:» monografía (EN), registro de decisiones (ES) y cuatro documentos por país en tres lenguas. **Sin URL pública, no se pinta** | — | diccionario y El Salvador |

**Fuera de la página, a propósito**: el diagrama de 13 etapas, la tabla de decisiones y su recuento, y los nombres de
personas «aunque la monografía los traiga».

### 5.2 Usar los datos (`/usar/`, copy §6)

Ocho bloques, en este orden:

1. **Por dónde empezar.** «No es una matriz de encuesta. Elija por lo que ya sabe hacer.» Las tres salidas
   (`Salidas.astro`, familia `usar`). Cierre: «Dos grupos con la misma base pueden llegar a resultados distintos sin
   que ninguno se haya equivocado.»
2. **El camino, paso a paso**, en cuatro pasos: elija un país (lista con el peso de cada uno) · antes del clic (el
   formulario) · «Descargue un archivo, no los 17» · ábralo en el explorador. Se añaden los requisitos del navegador
   y los tiempos, medidos fuera del navegador y rotulados así.
3. **Qué hay en cada descarga**: 17 archivos (2 de datos + 4 documentos × 3 lenguas + 3 para programas). La nota
   de diseño corrige una errata de la monografía y exige que el build compruebe 2 + 4×3 + 3.
4. **Las columnas.** Tabla generada desde `columnas.json`; «aquí no se redacta ninguna definición». La
   disponibilidad por cámara se ve en la tira de 16 celdas. Encima, **cuatro avisos**: `sex` es derivada;
   `dm_speech` es asimétrica; `legislature` no es comparable; los identificadores son estables solo dentro de una
   edición.
5. **El padrón y su unión correcta.** «Unir por menos multiplica filas.» «Léalo por nombre de columna, nunca por
   posición». Incluye el caso de Brasil.
6. **Dos fragmentos**, en R y en Python: «Cargar un país, filtrar el habla, contar palabras por década y sexo».
   Se **volvieron a ejecutar** sobre el CSV depositado de El Salvador y reproducen la serie de la figura (23,19 % y
   35,63 %). La salvedad va dentro del código, como comentario.
7. **Cómo citar**: conjunto · colección · figura × texto · BibTeX · RIS, generadas por `lib/cita.ts` («aquí no se
   teclea ninguna»).
8. **Contacto y erratas**: «díganos dónde: país, fecha, número de sesión y lo que dice el Diario oficial».

### 5.3 Para parlamentos y organismos (`/instituciones/`, copy §7)

Dos columnas paralelas, con cuatro bloques cada una a la misma altura (pregunta · lo que se lleva · cómo usarlo bien
· cómo citar), y un cierre a ancho completo.

- **El congreso.** Pregunta: «¿Qué se dijo aquí sobre esto, quién lo dijo y de qué partido o bancada?» Planteamiento:
  «Si su Diario está en un PDF por sesión, responder cuesta una tarde.» Luego vienen tres pasos sin programar; «Lo
  que no es» («Ni registro oficial ni sustituto del Diario»); y lo que no cubre (comisiones, Senado, votaciones, año
  en curso).
- **El organismo.** Pregunta: «Tenemos los escaños por sexo. ¿Cuánto de lo que se dice en el pleno lo dicen
  mujeres?» Se lleva, sin descargar el corpus, una tabla por cámara y década con n y denominador, más la imagen.
  Siguen «Cómo leerla» y un modelo de cita de figura.
- **Cierre, «Quién lo hace»**: qué es («Una infraestructura de datos…»), quién, licencia y estabilidad.

En la Puerta 4 se corrigió la maquetación: solo va emparejada la primera fila y cada columna fluye por su cuenta.

### 5.4 Explorador (`/explorador/`, copy §8)

**Origen.** El plan dejaba **fuera** una «guía con capturas del explorador (caduca con cada reconstrucción)». El
investigador **la pidió** en la vista previa como quinta pestaña, y se aprobó el mismo día. Todo lo que afirma sale
de **un inventario del código y de la interfaz**.

**Secciones:**

1. **Cabecera.** «Busque, lea y cite lo que se dijo. Sin programar.» «No hay cuenta, ni instalación, ni servidor.»
2. **Primero, encontrar.** Cuatro preguntas a dos columnas, sin iconos: «¿Qué se dijo sobre esto?» · «¿Quién,
   cuándo, de qué grupo?» · «¿En qué momento del debate?» · «¿Cuándo se habló de esto?». Cada una responde con lo
   que la herramienta hace de verdad; por ejemplo, «No distingue tildes ni mayúsculas».
3. **Después, enfocar: las bibliotecas.** Es la sección central, con más aire. Frase destacada: «Un corpus entero no
   es una pregunta. Una biblioteca sí.» Sirve a dos trabajos: «el recorte de su tema» y «el expediente de un
   debate».
4. **Coocurrencias.** «Es un eje de temas, no un eje ideológico.» Aviso honesto: «Esta versión del explorador NO
   dibuja la red… No hay, ni se fabrica, una imagen de esa red.»
5. **Menciones.** «Dice quién habla de quién, no si lo hace a favor o en contra. Los focos no son coaliciones.» Da
   la precisión medida y dice lo que se escapa: «su señoría».
6. **Y llevárselo, citado**: CSV, documento, JSON y referencias, siempre con el DOI.
7. **Cómo empezar**, en tres pasos numerados.
8. **Lo que pide, y lo que no hace**: «No compara países en una misma pantalla… cuenta palabras, no intenciones.
   Y busca la palabra tal como la escribe».
9. **Lo que se queda en su equipo.**

**Capturas.** Son siete capturas reales, todas con El Salvador y una misma biblioteca de ejemplo («El debate sobre
el agua»). Van documentadas en un LÉAME de `src/assets/explorador/`. Cada una enlaza a su tamaño real, que es como
se amplía sin JS. «Ninguna imagen de la página enseña el texto de una intervención junto al nombre de quien la
dijo.»

### 5.5 Países (índice) y ficha

- **Índice.** El h1 repite la pregunta de Inicio («¿Qué hay, y desde cuándo?»). Luego vienen la rejilla completa,
  «Cómo leer la rejilla» (tres estados de celda y la regla del tono), la tabla de 10 columnas (con «Turnos de habla»
  porque «en República Dominicana más de la mitad de las filas no son habla»), los ausentes bajo un filete y el
  aviso «Antes de comparar países».
- **Ficha** (plantilla única).
  - Subtítulo: cámara · inicio–fin.
  - **«Hoy puede»**, las tareas. **Buscar**: «de 1985 a 2025, por texto, fecha, partido, legislatura y diputado»,
    con los filtros comprobados en el código del explorador. **Abrir una sesión que reconoce**, o la de **«Una
    sesión que no encontrará»**. **Exportar con su cita**.
  - Qué es · De dónde sale (enlaza el informe del proceso) · Cifras (lista tipográfica, con la cifra en mono
    abriendo la línea) · Voz femenina, en palabras · Antes de usarlo (cuántas limitaciones declara, con enlace) ·
    El conjunto de datos (17 archivos, el peso y «No las abra en una hoja de cálculo») · crédito · cita.
  - Las frases concuerdan en singular y en plural sin tocar el copy. Por ejemplo, no hay artículo delante de
    `{{camara}}` y ningún rótulo lleva recuento.

---

## 6. Qué se transfiere a LyT y qué no

### 6.1 Tabla

| elemento de ParlaIbero | ¿a LyT? | cómo, o por qué no |
|---|---|---|
| **Sitio multipágina** con Inicio como puerta y páginas de profundidad | **Sí** | es la respuesta directa a la queja «todo tiene que caber en una sola página y resume demasiado» |
| **Inicio ≤ 700 palabras, ≤ 120 de límites**, primera pregunta en la pantalla 1 y 0 % de límites antes del primer hallazgo | **Sí** | son tests de rechazo que se pueden contar |
| **Arco de Inicio como preguntas** (hecho medido · el lector con sus manos · entrega) | **Sí**, con preguntas propias | cada pregunta necesita un agregado medido sobre la fuente y con su clave (V2 o v3). Ninguna puede salir del prototipo de 1931 |
| **La portada** | **No se copia la de ParlaIbero** | en LyT se conserva el hemiciclo de 1936 (`landing/hero_svg.py`), que el investigador considera «perfecto». Propuesta: pregunta + figura **justo después** del hemiciclo, o una pregunta que el hemiciclo ya plantea. Lo decide él |
| **Apertura rotativa** entre varias preguntas con la misma gramática visual | **Sí, como opción** | requiere medir series de términos sobre el corpus (el equivalente a `medir_terminos.py`) y hitos por fecha **con fuente**. En ParlaIbero la pidió el investigador en la Puerta 4 |
| **Pequeños múltiplos «cada cámara contra sí misma»** | **Adaptado** | LyT tiene una sola cámara. La unidad comparable sería legislatura, periodo o minoría, siempre con denominador. Por definir y medir |
| **Rejilla de cobertura** (tres estados, «la ausencia nunca es un color») | **Sí, adaptada** | una rejilla año × mes (o legislatura × mes) de sesiones presentes, con los huecos declarados, solo si la cobertura está verificada sobre el CSV V2. La cifra de sesiones (755) consta en el README y el changelog depositados, según la memoria del proyecto; hay que recontarla antes de usarla |
| **Pestañas Gráfico · Tabla · Datos**, nota emergente «n de N», teclado, datos de figura sin formulario | **Sí** | es la respuesta a «no hay gráficos interactivos». Los tres SVG estáticos de la landing actual (`landing/graficos.py`: palabras por año, reparto ideológico por legislatura, legislaturas de Afinidades) pueden ser la primera tanda, rotulados con la base de la que salen: hoy `agregados_corpus.json` se calcula sobre la base del **explorador (v3)** |
| **SVG en build + isla mínima de JS**; sin d3/GSAP en cliente; todo funciona sin JS | **Sí** | encaja con «archivos autocontenidos y ligeros» (memoria del proyecto) |
| **Astro estático** (el mismo esqueleto que ParlaIbero) | **Decisión abierta** | reusar el esqueleto ahorra componentes (Pestanas, IndiceLateral, BandaCTA, Captura, Cita). Mantener el generador Python actual (`build_landing.py`) evita un segundo stack. Cualquiera de las dos vale si se respetan las reglas de §3.3 |
| **Marcadores `{{clave}}` + claves de procedencia + auditoría de `dist/`** | **Sí, prioritario** | resuelve la regla dura de LyT. Propuesta de claves: **V2** (depositada, 107.551 filas) · **v3** (explorador, 121.700 filas, sin depositar, ids renumerados) · **M** (documentos depositados) · **CALC**. Toda cifra de v3 lleva su rótulo, y una frase nunca mezcla las dos |
| **Tabla de discrepancias cerrada antes del copy** | **Sí** | según la memoria del proyecto, ya hay casos: 107.551 frente a 121.700; «34 millones de palabras» sin respaldo; 28.780 páginas, que solo es un recuento de ficheros; el README depositado con la cobertura de V1 y «LLaVA»/«Jaro-Winkler» donde el código usa GLM-OCR y difflib |
| **Metodología ≈ 1.500–1.800 palabras**, índice lateral, banda fija y «Pruébelo» por apartado | **Sí** | es donde LyT puede dejar de resumir: fuente, fila, paso de la fuente a la tabla, habla y no habla, quién habla, OCR, validación, lo que no afirma, ediciones (V2 frente a v3) y documentación completa. Cada apartado debe llevar un hecho verificado |
| **Fila real desplegada** en todas sus columnas | **Sí** | la landing actual ya tiene una: fila 5.424 del CSV V2, 1 de octubre de 1931, con la 5.423 encima (`landing/README.md`). Si se decide no nombrar, las columnas del orador van en blanco, como en ParlaIbero |
| **«Qué es una fila» y el esquema de pasos** (5, no 13) | **Sí** | la landing actual tiene «los nueve pasos del método» (`contenido.json › piezas`). La regla invita a reducirlos a un esquema breve y enlazar el resto |
| **Usar los datos** (escalera por destreza, camino paso a paso, qué hay en la descarga, columnas con disponibilidad, fragmentos R/Python re-ejecutados, cita en tres formatos, erratas) | **Sí** | los fragmentos deben **ejecutarse** sobre el CSV V2 depositado y reproducir una cifra de una figura. La landing actual ya comprobó dos lecturas del CSV (pandas y `read.csv`), según su README |
| **Escalera sin formulario** (peldaño 0: datos de figura) | **Sí** | falta comprobar si el conjunto de LyT en Dataverse tiene guestbook y cuánto pesa el CSV. **Sin verificar**: no se afirma hasta comprobarlo |
| **«País de prueba»** (El Salvador) | **No, tal cual** | LyT es un corpus. Solo habría peldaño de prueba si existe un subconjunto publicado. Hoy no consta: no se promete |
| **Página Explorador** con capturas reales, LÉAME de capturas y un inventario del código como fuente | **Sí, muy transferible** | y con los límites del explorador de LyT dichos en positivo y con precisión: la cabecera de sesión **no** muestra Diario, páginas, Presidencia ni Gobierno; «Mismo diputado» es **léxico (bm25)**, no semántico; **no** hay búsqueda por significado, comodín en el buscador principal, NOT ni proximidad. Las capturas se hacen sobre la versión publicada, y su pie dice que el explorador sirve la v3 |
| **Página propia para la base derivada** | **Sí** (Afinidades Elegidas) | DOI 10.7910/DVN/CGOCUS y su app. La landing actual la tiene como sección «firmas». Merece su plantilla, con su propia figura interactiva: las legislaturas de Afinidades |
| **«Para parlamentos y organismos»** | **Adaptado, decisión abierta** | los públicos de un corpus histórico son otros: historiadores, archivos y bibliotecas, docentes, periodistas y quizá el propio Congreso. El patrón de dos columnas (pregunta · lo que se lleva · cómo usarlo bien · cómo citar) sirve; los públicos los elige él |
| **Fichas por país ×16** | **Adaptado** | el análogo posible son fichas por legislatura o por etapa, con cobertura, sesiones reconocibles y cita. Solo si la segmentación está verificada |
| **«Sesiones que usted reconoce»** («Que estén no valida su contenido») y las ausentes como hueco | **Sí** | cada sesión con fecha y filas contadas sobre V2. El 1 de octubre de 1931 ya está localizado (fila 5.424). Las demás, por verificar |
| **Cuatro preguntas sin dueño** (tema, tono, posición, voto) | **Sí, con cuidado** | dicen lo que la base **no** trae anotado. En LyT hay que evitar que se lea como puerta de vuelta al prototipo (defiende/critica/menciona, actos afectivos): el prototipo no se nombra |
| **Frases fijas ↺** y **un rótulo por destino** | **Sí** | por ejemplo, una frase fija para «V2 depositada / v3 del explorador» y otra para «ante cualquier discrepancia, vale el Diario de Sesiones» |
| **Hoja de estilo y glosario** de una línea por término | **Sí** | glosario propio: Diario de Sesiones, sesión, intervención, fila, habla y no habla, Presidencia, minoría, legislatura, edición V2/v3… |
| **Novedad fechada** («no hemos localizado…») | **Sí**, si se afirma novedad | exige hacer la búsqueda y fecharla (en ParlaIbero: `docs/04_BUSQUEDA_…md`) |
| **Palabras vetadas** («innovador», «próximamente») y rutas reservadas ocultas | **Sí** | — |
| **Proceso por puertas** con documentos de estado | **Sí** | véase §6.2 |
| **Lectores adversariales** (verificador, escéptico con los criterios del investigador, lectora de otro público, editora) | **Sí** | el escéptico se escribe con los rechazos ya conocidos de LyT: nada del prototipo, nada sin verificar, nada que el explorador no haga |
| **No nombrar a nadie que figure en los datos** | **DECISIÓN ABIERTA del investigador** | en ParlaIbero es una directiva para datos contemporáneos (README, regla 3). En LyT los datos son de 1931–1945 y la landing actual ya nombra: la fila de ejemplo es de Campoamor, y el hemiciclo sigue a Gil Robles. Si decide no nombrar, el control automático de nombres (`audit-cifras` + `nombres_vetados.json`, con la exención `data-autoria`) se puede copiar tal cual. Si decide nombrar, conviene fijar **dónde** (fragmentos, sesiones-hito, capturas) y con qué regla |
| **Mención de la AEI** (franja, pie y pruebas) | **No, salvo que aplique** | es obligación de ParlaIbero por el proyecto PID2022-141706NB-C22. No consta que LyT esté bajo el mismo proyecto: hay que preguntarlo, no suponerlo |
| **Trilingüe ES/EN/pt-BR** | **No por defecto** | la regla de LyT es el español de España. Otras lenguas serían una decisión nueva; la arquitectura de claves lo permite sin rehacer nada |
| **Paleta granate (USAL), Archivo 800, Source Serif 4** | **No** | LyT mantiene su estética oscura editorial (crema sobre casi negro, oro de acento, serif cursiva de display) con tema claro. Sí se transfieren tres reglas de diseño: **cifras en mono con `tabular-nums`**, lo interactivo distinguido por la forma y no solo por el color, y el contraste AA verificado con axe en los dos temas |
| **Wordmark generado desde los datos** («Escalera») | **Opcional** | en LyT, el hemiciclo ya cumple esa función de identidad |
| **El explorador «solo en español»**, el guestbook y los pesos de 98 MB a 1,6 GB | **No** | son hechos de ParlaIbero. Los de LyT hay que medirlos |

### 6.2 Cómo quedaría el proceso para LyT (propuesta)

| puerta | documento | qué aprueba el investigador |
|---|---|---|
| **1 · Narrativa y mapa** | `01_NARRATIVA_lyt.md`, ≤ 1.500 palabras. Incluye tesis y alternativas descartadas; lectores; arco de Inicio en preguntas, cada una con su hecho **verificado y su clave (V2/v3)**; lo que no se dice (prototipo de 1931, promesas del explorador); el **mapa de páginas** con el propósito de cada una; la tabla de discrepancias; y las decisiones A/B/C | tesis · qué abre tras el hemiciclo · páginas y pestañas · públicos de la página institucional · política de nombres · qué figuras interactivas entran y qué exige medir cada una |
| **2 · Copy ES congelado** | `02_COPY_lyt.md`: todas las plantillas, con marcadores `{{clave}}` y sin diseño, más una versión de lectura generada y un catálogo de marcadores con su fuente | el texto y los tests de rechazo. Desde aquí, el copy solo se toca por errata o por decisión suya |
| **3 · Construcción** | exportador de datos (proyecta, no mide), componentes y figuras. Las mediciones nuevas, solo si el copy las exige y con su permiso | — |
| **4 · Revisión en vista previa** | Inicio y dos páginas de profundidad a 375 y 1440 px, en tema oscuro y claro | lo que ve; sus cambios se anotan en un registro de cambios |
| **5 · Publicación** | informe de verificación: cifras con procedencia, enlaces, axe, sin JS | acciones solo suyas: repositorio, Pages y enlaces desde Dataverse y desde el explorador |

**Traducción directa de las secciones de la landing actual a páginas** (propuesta). Las secciones salen de
`landing/contenido.json`, en este orden: importa · fuente · corpus · fila · método · explorador · herramientas ·
firmas · límites · datos.

| sección de hoy | página propuesta |
|---|---|
| importa | Inicio (tesis y preguntas) |
| corpus | Inicio (un movimiento) + página **El corpus** (cobertura y fichas) |
| fuente · fila · método | **Metodología** |
| límites | se reparten, **pegados a sus cifras**; ya no son una sección |
| explorador · herramientas | página **Explorador** |
| firmas | página **Afinidades Elegidas** |
| datos | **Usar los datos** + la escalera de Inicio |

### 6.3 Decisiones que solo puede tomar el investigador (LyT)

1. **Política de nombres** en divulgación: nombrar a oradores históricos, no nombrarlos o nombrarlos solo en ciertos
   bloques.
2. **Qué pregunta abre**, tras el hemiciclo o integrada en él, y si la portada rota entre varias.
3. **La lista de páginas y pestañas**, y los públicos de la página institucional.
4. **Qué cifra es la pública** cuando V2 y v3 difieren, y cómo se rotula la v3 en cada figura.
5. **Stack**: Astro, reusando el esqueleto de ParlaIbero, o el generador Python actual.
6. **Obligaciones de financiación**, si LyT está bajo un proyecto con requisitos de publicidad.
7. **Mediciones nuevas** que exigirían las figuras interactivas propuestas (series de términos, cobertura por mes,
   comparaciones por legislatura), cada una con su clave y su registro.

---

## 7. Riesgos, si se copia mal

| riesgo | cómo lo evitó ParlaIbero | aplicación a LyT |
|---|---|---|
| Rehacer la landing como «varias páginas de resumen» | cada página de profundidad tiene su propio encargo, su extensión y sus figuras; Inicio remite, no resume | fijar en la Puerta 1 el propósito y la extensión de cada página |
| Figuras bonitas sin hecho medido | «No se guioniza un hallazgo que no se ha corrido»; las mediciones nuevas, solo con permiso y registradas | ninguna figura sin su agregado verificado y su clave |
| Mezclar ediciones | una sola clave por bloque; P frente a C rotulados | V2 y v3 nunca en la misma frase sin decirlo |
| Prometer lo que la herramienta no hace | la página Explorador sale de un inventario del código; un rótulo citado mal se corrigió | inventario del explorador de LyT **antes** de escribir su página |
| Que el prototipo vuelva por la puerta de atrás | — | lista de términos vetados en el control automático del copy: defiende/critica/menciona, «acto afectivo», «intensidad», los 3.874 nodos, los 324 oradores… |
