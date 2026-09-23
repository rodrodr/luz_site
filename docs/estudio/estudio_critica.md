# Crítica de completitud: qué falta para diseñar con garantías el sitio multipágina de Luz y Taquígrafos

Crítica hecha el 22-09-2026 sobre los seis estudios de `scratchpad/sitio/`: `estudio_lyt_datos.md`, `estudio_lyt_explorador.md`, `estudio_lyt_relato.md`, `estudio_parla_codigo.md`, `estudio_parla_proceso.md` y `estudio_parla_vivo.md`. Los he leído enteros. Después he cerrado yo mismo los cinco huecos que más pesan, leyendo, calculando y capturando sobre las fuentes.

- **Material nuevo de esta crítica:** `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/critica/` (en adelante **`critica/`**).
- **Prototipo de 1931:** nada de lo que sigue lo usa. Tampoco lo reintroduce ninguna cifra.
- **Marcas de base:** **V2** = CSV depositado en THQCMI (107.551 filas, MD5 `360332a0…`). **v3** = matriz del explorador (121.700 filas, sin depositar, ids renumerados). **Sidecar** = `2REP_Explorer/standalone/data/sessions.json`, local y sin aplicar en la web. **CGOCUS V1.1** = Afinidades depositada. **Afin v2** = corrección local de Afinidades, sin depositar (§3.4).

---

## 0. Veredicto

1. **La base de estudio es buena y casi suficiente.**
   - **ParlaIbero está estudiado de sobra:** las 8 plantillas publicadas, el código entero, el proceso por puertas y los defectos que no conviene copiar. No hace falta volver a él.
   - **El explorador está inventariado función a función** con capturas.
   - **Hay nueve agregados reproducibles sobre la V2**, más dieciséis «puertas» con ids verificados.
2. **Faltaban cinco cosas sin las que no se podía diseñar con garantías.** Las he cerrado (§3).
   1. **Qué hay de verdad en los depósitos.** Ficheros, pesos, formulario de descarga, versiones y cita oficial. Dos informes lo daban por «sin verificar» y un tercero lo sabía de segunda mano.
   2. **Si existen enlaces profundos**, comprobado sobre el explorador publicado y sobre la app de Afinidades, que nadie había mirado.
   3. **La cobertura.** La numeración de sesiones está completa, con una rejilla mensual calculada. Y una incidencia que nadie había visto: **la sesión del 1-X-1931, el ejemplo estrella de todos los informes, termina truncada en el acta digitalizada.**
   4. **Afinidades Elegidas publicada.** App inventariada y ficheros cotejados byte a byte con CGOCUS V1.1. Además, **hay una corrección v2 de Afinidades preparada ayer (21-09-2026) y sin depositar** que mueve las cifras de la página de Afinidades.
   5. **Una tabla única de discrepancias** entre informes, cerrada donde se podía. Es lo que ParlaIbero hacía antes de escribir una línea de copy.
3. **Siete decisiones del autor bloquean la Puerta 1 (narrativa).** El resto es trabajo acotado (§4 y §5). La más importante, porque dos informes proponen lo contrario, es **sobre qué base se dibujan las figuras: V2, v3 o las dos**.

---

## 1. Qué traía cada informe y qué no

| Informe | Fuerte | Débil o ausente |
|---|---|---|
| `estudio_lyt_datos.md` | 9 JSON reproducibles con `_meta`; 25 fichas de figura; hechos para el copy con base declarada | No mira el depósito en vivo ni la app de Afinidades. No ve las incidencias del sidecar. Da por buena la presidencia única por sesión |
| `estudio_lyt_explorador.md` | Inventario (a)–(k) con 54 capturas; contraste con `investigacion.json`; errores de Menciones y del careo | Tamaño de descarga erróneo (§3.2). Propone el pie «La sesión 48 entera» sin saber que está truncada. «Recordar la base» sin probar en un navegador normal |
| `estudio_lyt_relato.md` | Historia verificada con ids V2 y v3; votaciones nominales; 16 puertas; tres correcciones a Afinidades | Toma «80 diputados en las tres legislaturas» de un derivado (son 78 en el censo, §3.4). Cita 102/108 de Casas Viejas sin la condición de filtro. No conoce la corrección v2 de Afinidades |
| `estudio_parla_codigo.md` | Arquitectura completa, reutilizable pieza a pieza, con estimación de 13,5–17 jornadas | Propone figuras sobre la **v3** (`agregados_corpus.json`, `datos_explorador.json`), en contra de lo que calcula `datos` (V2). Deja el formulario de descarga «por comprobar» |
| `estudio_parla_proceso.md` | Puertas, reglas editoriales, antipatrones rechazados y tabla de transferencia | «Falta comprobar el guestbook y el peso del CSV» (cerrado aquí). Propone «recontar las 755» (hecho aquí) |
| `estudio_parla_vivo.md` | Lectura de lector de las 8 páginas con capturas y pruebas de interacción; medida de la landing rechazada | Da para el Inicio de LyT «unas 1.500 palabras como mucho», frente al ≤ 700 de `parla_proceso` (§3.5, D-13) |

**ParlaIbero no deja huecos que importen.**
- **Lo no analizado:** el 404, las 14 fichas restantes (que son la misma plantilla), las versiones EN/PT y el `docs/04_BUSQUEDA_…` de la «novedad fechada».
- **Solo el último cuenta.** LyT no tiene una búsqueda fechada de corpus comparables. Sin ella no puede afirmar novedad al modo de ParlaIbero (hueco H-B7).

---

## 2. Inventario de huecos

Estado: **CERRADO** (hoy, con su evidencia en §3) · **ABIERTO-autor** (solo lo puede resolver Rodrigo) · **ABIERTO-trabajo** (tarea acotada, con estimación) · **ABIERTO-externo** (pide bibliografía o el PDF).

### 2.A Contradicciones entre informes

| # | Contradicción | Estado |
|---|---|---|
| A1 | **Base de las figuras.** `parla_codigo` §6.7 dibuja FigSesiones, FigAnual, FigLegislaturas y FigAcotaciones sobre la **v3**. `lyt_datos` las calcula sobre la **V2**, y `parla_vivo`/`parla_proceso` piden la V2 | ABIERTO-autor (opciones en §4, D-1) |
| A2 | **Formulario de descarga.** «Sin verificar, no se supone» (`parla_proceso`, `parla_codigo`) frente a «guestbook con errata» (`lyt_datos`) | CERRADO §3.1 |
| A3 | **Peso del CSV.** `lyt_datos` dice «158 MB, no usarlo». ParlaIbero rotula el peso en la unidad que enseña Dataverse | CERRADO §3.1 |
| A4 | **Descarga del explorador.** 110.785.413 B (`lyt_explorador`) frente a 111.733.652 B (`lyt_datos`, manifiesto) | CERRADO §3.2 |
| A5 | **«Casas viejas», febrero y marzo de 1933.** 107/112 filas (V2, regex, `lyt_datos` F03), 114/126 (v3, todas las filas, explorador por defecto) y 102/108 (v3, «Solo lo que se habla» + «aplicar filtros»). `lyt_relato` cita 102/108 sin la condición | CERRADO §3.5 (regla) |
| A6 | **Diputados en las tres legislaturas.** 80 (`lyt_relato`, escena `censo`) frente a 78 | CERRADO §3.4 |
| A7 | **Filas de coautoría.** 63.507 frente a 63.508 | CERRADO §3.4 |
| A8 | **Versión de Afinidades.** 1.0 o 1.1 | CERRADO §3.1 |
| A9 | **Sesión 48.** «La sesión 48 entera: 415 intervenciones» (pie propuesto) frente a la incidencia `truncated_end` del sidecar | CERRADO §3.3 |
| A10 | **Recuentos de facetas.** Distritos 52/54/55, partidos 39/40, familias 15/25/33, diputados 773/774/910/1.026/1.446 | CERRADO §3.5 |
| A11 | **El 318–19.** Atribuido al Estatuto en `discursos_y_debates_2REP.md`; `lyt_datos` no cotejó los hitos de la Tendencia | CERRADO §3.5: `hitos.js` publicado está bien |
| A12 | **Tope de palabras de Inicio.** ≤ 700 frente a ≈ 1.500 | CERRADO §3.5 (D-13) |
| A13 | **Presidencia por sesión.** F16 («Besteiro 401 sesiones») supone un presidente por sesión | CERRADO §3.3: en 584 sesiones preside además un vicepresidente algún tramo |
| A14 | **Partido de Martínez Barrio en 1931-33.** «AR»; el explorador lo marcó sin verificar | Verificado que la etiqueta existe (§3.4). Su corrección histórica es ABIERTO-autor/externo |

### 2.B Fuentes no leídas

| # | Fuente | Estado |
|---|---|---|
| B1 | API de Dataverse (ficheros, versiones, guestbook, cita, métricas) de THQCMI y CGOCUS | CERRADO §3.1 |
| B2 | App publicada **Afinidades Elegidas** (https://rodrodr.github.io/afinidades/) | CERRADO §3.4 |
| B3 | `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Coautorias/data/dataverse/corregido/`: corrección v2 de Afinidades del 21-09-2026 | CERRADO §3.4 (leída y cuantificada) |
| B4 | Incidencias y estado de páginas del sidecar (`incidents`, `page_status`, `warnings`) | CERRADO §3.3 |
| B5 | `2REP_Explorer/README.md` (51 KB) y `MANUAL_FUNCIONALIDADES.md` (28 KB): ningún informe dice haberlos leído | ABIERTO-trabajo (0,1 j). No bloquea: la verdad es la interfaz, ya inventariada. Sirve para detectar promesas que la web no cumple |
| B6 | `2REP_Coautorias/documents/DATAVERSE_METADATA.md` y el `00_README.txt` de CGOCUS | ABIERTO-trabajo (0,1 j) |
| B7 | Búsqueda fechada de corpus comparables (la «novedad fechada» de ParlaIbero) | ABIERTO-trabajo (0,5 j), solo si el sitio afirma novedad |
| B8 | Bibliografía para los [EXT] de `lyt_relato` §8: origen de «luz y taquígrafos», numeración art. 24→26 y 34→36, dimisiones de octubre de 1931, art. 81 | ABIERTO-externo |
| B9 | PDF de la guerra: nota de Figueres, «Rohan localizada», fecha de Sant Cugat y Montserrat | ABIERTO-externo |

### 2.C Cifras sin verificar

| # | Cifra | Estado |
|---|---|---|
| C1 | 28.780 páginas y su reparto por legislatura | CERRADO: la suma de `pdf_pages` del sidecar da 28.780 (15.272 / 11.177 / 2.331). Es un recuento local de ficheros, no depositado |
| C2 | 755 sesiones completas | CERRADO §3.3 |
| C3 | 1.820 visitas y 373 descargas | CERRADO: siguen así hoy; CGOCUS lleva 111 y 32 (§3.1) |
| C4 | «Recordar la base» y el uso sin conexión | ABIERTO-trabajo: probar en Chrome o Safari normales (0,1 j) |
| C5 | 107.556 etiquetas frente a 107.551 filas (diferencia de 5 sin explicar) | ABIERTO-autor |
| C6 | Turnos rescatados: 729, 731 o 735 | ABIERTO-autor |
| C7 | Votación de la destitución de Alcalá-Zamora (238–5, en `hitos.js`) | CERRADO: v3 115675 / V2 102358 (§3.5) |
| C8 | «1.140 en las Constituyentes» y «411 de 454» (marcadas ○ por el explorador) | ABIERTO-trabajo (minutos, sobre la v3) |
| C9 | Banco azul de Negrín I (1,3 %) y Negrín II (40,2 %) en F15 | ABIERTO-trabajo (0,25 j) |
| C10 | Fusión «Liberal» → «Liberales» (15.364 filas) | ABIERTO-autor |

### 2.D Figuras sin datos calculados

| # | Figura | Estado |
|---|---|---|
| D1 | Rejilla de cobertura mes × año (el equivalente de la rejilla de ParlaIbero) | CERRADO: `critica/cobertura_mes_v2.json` (§3.3) |
| D2 | Llenado de las 14 columnas por legislatura (el equivalente de `Columnas.astro`) | CERRADO: `critica/columnas_llenado_v2.json`. **Hallazgo de diseño:** no informa nada (§3.5) |
| D3 | **Votaciones nominales** (propuesta de `lyt_relato` §4.2.2) | ABIERTO-trabajo (1–2 j). Viabilidad medida en §3.5: 960 filas de la v3 con listas «Señores que dijeron sí», en 392 sesiones |
| D4 | Ranking completo de oradores sobre la v3 (F05) | ABIERTO-trabajo (minutos) |
| D5 | Mapa de circunscripciones (F24) | ABIERTO-trabajo. La app de Afinidades ya usa una geometría de provincias, **pero con esquema GADM y teselas de MapTiler** (§3.4): hay que aclarar la licencia antes de reutilizarla |
| D6 | F04 por legislatura | ABIERTO-trabajo (minutos) |
| D7 | «Lo que el Diario calla» (9 filas) y «Luz y taquígrafos, diez veces» | Ids en `lyt_relato` §3.1–3.2. Falta empaquetarlos (0,1 j) |
| D8 | Figuras de Afinidades (F21–F23, escenas `red`, `cruce` y `puentes`) | Datos sobre CGOCUS V1.1. **Cambian con la corrección v2** (§3.4) |
| D9 | Portada rotativa «Otra pregunta» | Hay datos (37 familias de términos). Faltan la elección de preguntas y el hito de cada una con fuente: ABIERTO-autor |

### 2.E Estado de las herramientas no capturado

| # | Estado | Estado |
|---|---|---|
| E1 | Enlaces profundos en el explorador **publicado** (no en una copia local) | CERRADO §3.2 |
| E2 | Enlaces profundos en la app de Afinidades | CERRADO §3.2 |
| E3 | Capturas oscuras «limpias» del explorador (sin ◆) | ABIERTO-trabajo (repetir `s29.py` antes de `s10.py`; 0,1 j) |
| E4 | Navegación sin texto de 1936-1939 y bibliotecas propias (notas, etiquetas, `.2replib`) | ABIERTO-trabajo (0,25 j) |

---

## 3. Los cinco huecos cerrados

### 3.1 Qué hay en los depósitos (API de Dataverse, 22-09-2026)

**Cómo.** Llamadas públicas a `api/datasets/:persistentId`, `…/versions`, `…/versions/:latest-published/citation`, `api/guestbooks/690` y `…/makeDataCount/{viewsTotal,downloadsTotal}`. Las respuestas están en `critica/dv_THQCMI.json`, `dv_THQCMI_versions.json`, `dv_CGOCUS.json` y `dv_CGOCUS_versions.json`. No he descargado ningún fichero ni he rellenado ningún formulario.

**THQCMI (Luz y Taquígrafos)**

- **Título depositado, en inglés:** «Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic, 1931–1945».
- **Versiones:**

  | Versión | Publicada | Licencia | Ficheros |
  |---|---|---|---|
  | V1.0 | 23-03-2026 | CC0 1.0 | CSV (MD5 `0a9adafe…`) + README |
  | V1.1 | 06-05-2026 | CC BY 4.0 | los mismos |
  | **V2.0** | **15-09-2026 18:33 UTC** | CC BY 4.0 | CSV nuevo + 2 changelogs + el mismo README |

- **Ficheros de la V2.0:**

  | Fichero | Bytes | MD5 | Nota |
  |---|---|---|---|
  | `2REP_Diaries.csv` | **165.785.782** | `360332a0ff1327671530f15eed46ac0c` | El mismo tamaño que el de V1.x: la corrección de fechas no cambia la longitud. No es un fichero tabular ingerido (sin UNF): Dataverse no ofrece vista previa ni subconjuntos |
  | `changelog_es_09_2026.txt` | 704 | `09658056…` | |
  | `changelog_en_09_2026.txt` | 680 | `235b312a…` | |
  | `Luz_y_Taquigrafos_README.txt` | 8.340 | `f2638800…` | **El mismo fichero desde la V1.0** (id 13628263 en las tres versiones): confirma que el README describe la V1 |

- **Formulario (guestbook 690):**
  - Se llama «Luz y Taquígrados» (sic) y está activo.
  - **Obligatorios:** nombre, correo e institución. **No obligatorio:** cargo. **Sin preguntas propias.**
  - La descarga directa por la API devuelve 400 sin formulario (probado con el README, id 13628263).
- **Cita oficial:** «Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic, 1931–1945", https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2».
- **Uso a 22-09-2026:** 1.820 visitas y 373 descargas (Make Data Count), igual que en la síntesis.
- **Qué no está depositado:** ni tabla de diputados, ni libro de códigos aparte, ni la v3, ni `mapa_v2_v3.json`, ni el sidecar.

**CGOCUS (Afinidades Elegidas)**

- **Versiones:** V1.0 y **V1.1**, las dos del 06-05-2026 (14:22 y 14:55 UTC). CC BY 4.0. El mismo guestbook 690.
- **Cita oficial:** termina en «Harvard Dataverse, **V1**, UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]». Dataverse cita la versión mayor; la vigente es la 1.1.
- **Periodo declarado:** del 14-04-1931 al 31-03-1939.
- **Ficheros:**

  | Fichero | Bytes |
  |---|---|
  | `00_README.txt` | 14.919 |
  | `2REP_coauthor_edgelist.tab` | 5.515.047 (original 4.943.485) |
  | `2REP_cosponsorship.tab` | 16.650.794 (original 16.287.135) |
  | `CODEBOOK.md` | 31.236 |
  | `METHODOLOGY.md` | 78.085 |
  | `representative_metadata.tab` | 156.736 (original 135.045) |
  | `representatives_metrics.json` | 17.748.967 |
  | `representatives_roles.json` | 84.347 |

- **Uso:** 111 visitas y 32 descargas.

**Consecuencias para el diseño**

1. **El aviso del formulario va encima de cada botón de descarga**, como en ParlaIbero: «Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución». La redacción del motivo es del autor.
2. **Peso.** Se rotula **«158,1 MB»**, que es lo que Dataverse enseña: 165.785.782 / 1.024² = 158,1, con unidades binarias rotuladas MB, como hace el formateador `|peso` de ParlaIbero. Queda sin efecto la regla de `lyt_datos` de «no usar 158 MB». Lo que sí debe evitarse es «158 MB» sin decimal ni fuente.
3. **La escalera de descarga de LyT tiene tres peldaños y ningún «país de prueba».**
   - Peldaño 0: datos de cada figura, alojados en el sitio y sin formulario.
   - Peldaño 1: un solo CSV de 158,1 MB, con formulario.
   - Peldaño 2: CGOCUS, 8 ficheros, con el mismo formulario.
4. **El README depositado es el de la V1.** Enlazarlo sin aviso contradice el sitio: tabla de cobertura V1, LLaVA, Jaro-Winkler, «exilio» en Valencia y Barcelona. O el autor lo actualiza (V2.1) o el sitio lo enlaza con la frase «describe la V1; las diferencias, aquí».
5. **Afinidades se rotula «CGOCUS V1.1», y la cita se copia tal cual («V1»).**

### 3.2 Enlaces profundos: el explorador no los tiene; Afinidades, solo por vista

**Explorador publicado.**

- **Mismo fichero que la copia local:** `critica/explorer_index_live.html`, descargado hoy, tiene el MD5 `155b10fd087f4fcac308dc628dea16ab`. Es el mismo que la copia local que usó `lyt_datos`. `etag "6ab07d95-2bc4d3"` (2.868.435 B), `last-modified: Mon, 21 Sep 2026 00:43:01 GMT`.
- **Cómo usa la URL:**
  - `location.hash` aparece **una vez**, en la prueba `#r2-navegador-no-apto` del guardián de navegadores.
  - `URLSearchParams` aparece 3 veces: en el *shim* que enruta las llamadas internas `/api/…` dentro de la página y en dos consultas internas de Coocurrencias y Menciones.
  - `location.search`, `pushState`, `replaceState`, `hashchange` y `popstate`: **0**.
- **Conclusión:** una URL no puede llevar a una búsqueda, a una intervención ni a una sesión. Se confirma, esta vez sobre lo publicado.
- **Tamaño real de la descarga del corpus** (HEAD hoy): `corpus.sqlite.gz.000/.001/.002` = 45.000.000 + 45.000.000 + 21.733.652 = **111.733.652 B**. Coincide con el manifiesto embebido (`bytes_gz`), y la base descomprimida mide 282.316.800 B.
  - La cifra de `lyt_explorador` (110.785.413) **es errónea**; seguramente midió bytes de red.
  - 282.316.800 B son 269,2 MiB, y el botón del explorador dice «≈260 MB». Es una incoherencia de la interfaz para el autor, no para el sitio.

**App de Afinidades.**

- **Qué restaura al cargar:** el código lee `#home`, `#red` y `#diputados` (no `#partidos` ni `#distritos`). También lee `#diputados/<id>` para abrir una ficha.
- **Por qué la ficha no llega a abrirse:** `showView()` ejecuta `history.replaceState(null,'','#'+viewId)` **antes** de que se carguen las métricas. El `/id` se pierde.
- **Prueba:** en un contexto limpio, `#diputados/783` y `#diputados/175` (Campoamor) acaban en `#diputados` sin ficha. Capturas: `critica/capturas_afinidades/deeplink_diputado_{783,175}.png`; guion en `critica/deep.py`.

**Consecuencias para el diseño**

- El patrón «Pruébelo» de ParlaIbero, en LyT, es **«Copiar la consulta · Abrir el explorador ↗»**, con la instrucción «pegue en el buscador (/)».
- Hacia Afinidades solo caben enlaces a `#red` o `#diputados`.
- Dos peticiones de una línea al autor lo mejorarían mucho:
  - un manejador `#q=`, `#id=` o `#sesion=` en el explorador;
  - en Afinidades, conservar el `/id` en `showView('diputados')`.

  Hasta que existan, **ningún texto del sitio puede decir «este enlace abre…»** (añadirlo a las palabras vetadas de `check-i18n`).

### 3.3 Cobertura: la numeración está completa, pero la sesión estrella está truncada

**Numeración** (V2, v3 y `diario_num` del sidecar; `critica/cobertura_mes_v2.json › _meta.numeracion`):

| Legislatura (rótulo del CSV) | Sesiones | Números | Huecos | Duplicados | Primera → última |
|---|---|---|---|---|---|
| 1931-1933 | 405 | 1–405 | 0 | 0 | 14-07-1931 → 03-10-1933 |
| 1933-1935 | 276 | 1–276 | 0 | 0 | 08-12-1933 → 10-12-1935 |
| 1936-1939 | 74 | 1–74 | 0 | 0 | 16-03-1936 → 09-11-1945 |

- **La última sesión de cada serie es la que suspende las sesiones** (v3, filas SUMARIO y COMENTARIOS).
  - 03-10-1933: «El Sr. Presidente suspende las sesiones de las Cortes».
  - 10-12-1935: «se suspenden las sesiones hasta nuevo aviso», tras la comunicación de Chapaprieta fechada el 9 de diciembre.
- **Qué se puede afirmar:** «no falta ningún número del Diario entre el primero y el último de cada serie».
- **Qué no:** que el último número del corpus sea el último publicado. Eso no está cotejado con un catálogo externo; decirlo así.

**Rejilla mensual** (`critica/cobertura_mes_v2.json`: 173 meses, de 1931-07 a 1945-11, con sesiones, filas y palabras de la V2):

| Estado | Meses | Cuáles |
|---|---|---|
| Con sesión | 64 | 53 de los 61 meses anteriores a la guerra, más 11 posteriores con las 14 sesiones |
| Sin sesión dentro de una legislatura | 5 | 1933-01 (el mes de Casas Viejas), 1934-08, 1934-09, 1935-04, 1935-08 |
| Sin sesión entre legislaturas | 3 | 1933-11, 1936-01, 1936-02 |
| Sin sesión tras julio de 1936 | 101 | Guerra y exilio; la rejilla debe comprimirlos, como hace la Tendencia |

Las causas (receso, disolución, guerra) **no se infieren del corpus**. Son rótulos externos y deben ir con fuente o no ir. Es la versión LyT de «la ausencia nunca es un color» de ParlaIbero.

**Incidencias declaradas por el sidecar** (`incidents`). Solo hay dos:

1. **27-07-1931, sesión 9:** `ocr_loop` en la página 18. «Sánchez Guerra, Ossorio y Gallardo…» aparece repetido 6 veces (id V2 976).
2. **01-10-1931, sesión 48: `truncated_end`.** «El acta digitalizada termina incompleta: la última página salió de un bucle del OCR.»
   - **V2:** las filas 5788–5792 (órdenes 390–394) repiten «El Sr. Ministro de la GOBERNACION (Maura): Pido la palabra.», y la última termina en «El Sr. Ministro de».
   - **v3:** son las filas 6460–6464 (órdenes 410–414).
   - Lo he comprobado en los dos CSV.

**Consecuencias.** La sesión del sufragio femenino es el ejemplo de todos los informes: fila 5424, lector, sesión corrida, careo y biblioteca B2. Por eso:

- **Ningún pie puede decir «la sesión 48 entera» ni «415 intervenciones íntegras»** como propiedad del Diario. «Sesión corrida íntegra» es el rótulo de la herramienta. El pie correcto es: «la sesión 48 tal como está en el corpus: 415 intervenciones; el final del acta digitalizada se perdió en el OCR».
- **Lo que interesa del ejemplo no se ve afectado:** Campoamor, Kent y la votación 161–121 (V2 5453) están mucho antes del corte.
- **Las cinco filas finales son un ejemplo excelente para la página de límites o de método.** La V2 las conserva, y la v3 también: la resegmentación no las arregla.

**Páginas:**
- 373 sesiones contiguas, 365 con verso en blanco, 3 corregidas y 14 sin verificar.
- **Las 14 sin verificar son exactamente las 14 posteriores a julio de 1936** (números 61–74).
- Así se puede decir en una frase: «páginas verificadas en todas las sesiones anteriores a la guerra».

**Presidencia por sesión (afecta a F16):**
- El sidecar guarda **un** presidente por sesión.
- En la V2, un **vicepresidente** de la Cámara ocupa la Presidencia algún tramo en **584 de 755 sesiones** (10.009 filas).
- El **Presidente de edad** preside en 3: 14-07-1931, 08-12-1933 y 16-03-1936. En la sesión 1, que el sidecar atribuye a Besteiro, Vázquez Lemus preside hasta la fila V2 9 y Besteiro solo desde la 10, tras su elección.
- **F16 debe rotularse «presidente titular de la sesión (metadatos del proyecto)»**, no «quién presidía».

### 3.4 Afinidades Elegidas: app publicada, identidad con CGOCUS y corrección v2 pendiente

**La app, inventariada hoy** (Playwright/Chromium sin interfaz, solo lectura).
- **Ficheros:** `critica/afin_capture.py`; capturas en `critica/capturas_afinidades/` (`home_1440`, `home_390`, `red_1440`, `diputados_1440`, `partidos_1440`, `distritos_1440`); inventario en `inventario.json`.
- **Versión:** `last-modified` del 06-05-2026, el mismo día que CGOCUS V1.1.
- **Qué ofrece:**
  - **Cinco vistas:** Inicio · Red de coautorías · Diputados · Partidos · Territorio. Guía de 15 pasos (driver.js), que se abre sola en las vistas de datos.
  - **Menú Exportar:** infografías PNG y CSV de aristas visibles.
  - **Red** («Todas»): 910 nodos, 34.640 aristas, densidad 0,0838 y grado medio 76,1.
    - Controles: 8 disposiciones, 5 algoritmos de comunidades (Louvain, Leiden, Walktrap, Infomap y Spectral) y *backbone* de disparidad.
    - Filtros: legislatura, ideología, partido, distrito, familia y rol. También modo ego.
  - **Partidos:** 5 comunidades (modularidad 0,442).
  - **Territorio:** coropleta del HHI por provincia con MapLibre.
- **Tema:** solo claro. Con `prefers-color-scheme: dark` el fondo sigue siendo `oklch(0.97 0.012 80)`.
- **Móvil:** cabe a 390 px (`scrollWidth` 390).
- **Recursos de terceros:** `cdn.jsdelivr.net` (Chart.js, D3, driver.js, html-to-image, MapLibre, topojson), `esm.sh`, Google Fonts y **`api.maptiler.com`, con la clave de la API en la página**.

**Los datos de la app son los depositados** (MD5 de lo que sirve la app frente al fichero original de CGOCUS V1.1):

| En la app (`data/`) | En CGOCUS | Relación |
|---|---|---|
| `coauthor_edgelist.csv` | `2REP_coauthor_edgelist.tab` | Idénticos: `b70d64da…` |
| `metricas_diputados.json` | `representatives_metrics.json` | Idénticos: `5c24a3b8…` |
| `roles_diputados.json` | `representatives_roles.json` | Idénticos: `1c9d30f9…` |
| `diputados_basico.csv` | `representative_metadata.tab` | Iguales salvo el separador («;» frente a «,»). Tamaño idéntico, 135.045 B, y contenido idéntico tras sustituir el separador |

- **63.507 frente a 63.508:** el edgelist tiene 63.507 filas más la cabecera. Queda cerrado el pendiente 6 de `lyt_relato`.
- **Cruce de bloque.** He reproducido desde el edgelist depositado las cifras de `lyt_relato`: 35,1 / 23,0 / 7,4 % de cruce de bloque y 7,1 / 2,5 / 5,8 % de cruce estricto izquierda-derecha. Se confirma su corrección 6.3.1.

**78, no 80.**
- En el censo depositado, **78** diputados están en las tres legislaturas: 78 `id_dip` con tres fichas, y lo mismo en `representatives_metrics.json`.
- Las **80** trayectorias de `figs/afinidades/data/afin_roles.json` incluyen dos que el censo no tiene en tres legislaturas pero que tienen rol en la tercera:
  - Ramón Suárez Picallo (censo: 1931-33 y 1936-39);
  - Melchor Marial Mundet (censo: 1931-33 y 1933-36).
- Son **artefactos del emparejamiento de firmas**. El segundo es justo el que corrige la v2: «deshace el falso emparejamiento de los "José María X" con Melchor MARIAL».
- El sitio debe decir **78**.

**Afirmaciones de la portada de la app que el sitio no debe repetir:**
- **«Densidad: 0.84 · Clustering: Alta».** El propio panel de la red da 0,0838 para «Todas», y por legislatura son 0,157 / 0,148 / 0,102.
- **Las «Cortes Republicanas en el exilio (1939–1945), reunidas en México y París».** El corpus solo contiene las 5 sesiones de México de 1945. Lo de París es la Diputación Permanente, que no está en el corpus.
- **Que el programa extrae «votaciones».** Ninguna base depositada las trae.
- **«AR 96 % · ERC 94 % · PSOE 91 %».** Porcentajes sin definición.

**Corrección v2 de Afinidades, sin depositar**
(`/Users/rodrodr/Dropbox/Apps/2REP/2REP_Coautorias/data/dataverse/corregido/`, 21-09-2026; `corrige_datos.py` no toca los originales)

- **Qué corrige:**
  - fechas (tres Diarios mal fechados; erratas de año como 1943 → 1933);
  - la etiqueta de legislatura en `cosponsorship` («1933-1935» → «1933-1936», 6.528 filas);
  - la fusión de nombres partidos en la inicial y el falso emparejamiento con Marial;
  - la toma de partido e ideología de la ficha;
  - la marca `excluir` en 25 filas de firma: documentos de 1914, de otra legislatura, duplicados y la Mesa de edad;
  - la marca `truncada` en las medidas con «Siguen las firmas hasta N» (1.678 filas de firma).
- **Registro:** `correcciones_log.csv` con **719 cambios** (689 seguros, 13 inferidos, 11 «revisar» y 6 probables) y `revisar_manual.csv` con **59 casos** pendientes de una persona.
- **Efecto sobre las cifras que usarán las figuras del sitio.** Lo he calculado con la misma regla de bloques que `pipeline_afinidades.py`, sobre `2REP_coauthor_edgelist_v2.csv` (65.194 filas, frente a 63.507):

  | | 1931-1933 V1.1 → v2 | 1933-1936 V1.1 → v2 | 1936-1939 V1.1 → v2 |
  |---|---|---|---|
  | Medidas | 674 → 672 | 767 → 765 | 89 → 90 |
  | Pares distintos | 16.144 → 16.367 | 14.678 → 15.180 | 5.061 → 5.176 |
  | Filas par × medida | 30.345 → 30.814 | 27.172 → 28.216 | 5.990 → 6.164 |
  | Diputados que firman | 454 → 454 | 446 → 444 | 316 → 320 |
  | Cruce de bloque | 35,1 → 35,4 % | 23,0 → 22,7 % | 7,4 → 7,1 % |
  | Cruce izquierda ↔ derecha | 7,1 → 7,6 % | 2,5 → 2,5 % | 5,8 → 5,5 % |

  - **El relato no cambia de sentido.** El cruce de bloque cae con fuerza y el estricto no es monótono.
  - **Cambian todas las cifras exactas.** Además, 8.648 filas de aristas de la v2 (el 13 %) proceden de listas de firmas truncadas en el Diario. Es una salvedad nueva que la V1.1 no declara.
- **Consecuencia.** Es el mismo problema que V2/v3, ahora en Afinidades (decisión D-3). Hasta que el autor decida, la página de Afinidades **no puede publicar cifras exactas** sin decir «CGOCUS V1.1, depositada».

**Partido de Martínez Barrio.**
- En la V2 figura como **AR** en 1931-1933 (111 filas), PRR en 1933-1935 (86) y UR en 1936-1939 (1.789). CGOCUS repite AR para 1931-33.
- Por historia general, en 1931-1933 era del Partido Radical: en la sesión 48 habla como «MINISTRO DE COMUNICACIONES» del Gobierno Provisional.
- **No lo he cotejado con una fuente histórica.** Lo marco como probable error de codificación para el autor.
- Afecta a F04, F08 y F09 (CI frente a C) y a las métricas de Afinidades.

### 3.5 Tabla de discrepancias, cerrada antes del copy

Es la tabla que ParlaIbero cerró en su `00_PLAN` («Discrepancias») antes de la Puerta 2. Columna «Regla»: lo que el copy puede decir.

| Cifra o afirmación | Valores que circulan (dónde) | Verificado hoy | Regla para el sitio |
|---|---|---|---|
| Filas | 107.551 (V2) · 121.700 (v3) · 108.291 de habla (v3) · 107.556 etiquetas | V2 y v3, recontadas por `lyt_datos` y `lyt_relato` | Dos claves distintas (`filas.V2`, `filas.v3`). Nunca «107.000», nunca 107.556 como filas |
| Palabras | 24.335.896 (V2, `nwords`) · 25.364.144 (v3 total) · 22.096.389 (v3 habla) · 25.903.736 (tokens de la Tendencia) · «25,8 millones» (Léxico) · «24 millones» (ayuda del explorador) · «34 millones» (presentación) | Las cuatro primeras, por recuento | Cada figura dice su denominador. «34 millones» queda vetado |
| Peso del CSV | «158 MB» (README) · 165.785.782 B | API | «158,1 MB», en la unidad de Dataverse, con fuente |
| Descarga del explorador | 110.785.413 B (`lyt_explorador`) · 111.733.652 B (manifiesto) | HEAD: **111.733.652** | «unos 112 MB comprimidos». Y «unos 282 MB» si se habla de la base recordada (269 MiB) |
| Sesiones | 755 · 754 (README V1) | 755; numeración completa (§3.3) | 755 en 752 fechas (3 dobles) |
| Sesión 48 | «entera», «415 íntegras» · 395 filas V2 | `truncated_end` (§3.3) | «tal como está en el corpus», con el aviso |
| «Casas viejas», II y III-1933 | 107/112 (V2, regex plegada) · 114/126 (v3, todas las filas) · 102/108 (v3, habla y filtros) | Las tres son ciertas en su base | El pie dice base y filtro. En Inicio, una sola cifra y su base |
| Diputados | 773 (V2 y v3) · 774 (faceta, con «Sin identificar») · 910 (nodos de la app, «Todas») · 1.026 personas y 1.446 fichas (CGOCUS) · 475/470/501 por legislatura (censo) · 417/390/253 que hablan (V2) | Todos recontados | «773 diputados intervienen» (V2) frente a «1.026 personas en el censo de Afinidades». Nunca 1.446 como personas |
| En las tres legislaturas | 80 (`afin_roles`, escena `censo`) · 78 (censo) | **78** (§3.4) | 78 |
| Distritos | 52 (censo y app) · 54 (V2 y v3) · 55 (faceta, con «Sin identificar») | Recontados | Base declarada |
| Partidos y familias | 39 partidos (V2/v3) · 40 (faceta y censo) · 33 familias en bruto → 25 normalizadas (explorador) · 15 (Afinidades) | Recontados | Base declarada; la normalización, enlazada |
| Oradores que más hablan | Besteiro y Alba (V2 con Presidencia) · Prieto (V2 sin Presidencia) · Royo Villanova (v3) | `lyt_datos` | Solo con base y con «sin Presidencia». Es la figura de «por qué importan las versiones» |
| Filas con acotación | 18,27 % (V2, 19.648) · 16,25 % (v3, 19.771 de 121.700) · 17,96 / 17,97 / 21,84 % (v3 habla, por legislatura) | `lyt_datos`, `datos_explorador.json` | Denominador explícito. Nunca «intensidad» |
| Turnos rescatados | 729 · 731 · 735 | Sin resolver | «Unos 730», o las tres con su documento, hasta que el autor fije una |
| Discurso de Azaña del Estatuto | 17.231 · 17.152 · 17.142 | Por fila | «Más de 17.000 palabras» |
| Coautorías | 63.507 filas · 63.508 líneas · 94.621 registros · 13.452 casos DDI · 35.883 pares por legislatura · 34.640 aristas en la app | §3.4 | «63.507 relaciones par-medida», con fuente. 94.621 queda vetado hasta que se explique |
| Cruce de bloque | «cruza el eje izquierda-derecha» 35/23/7 % (presentación) | Tres bloques; estricto 7,1/2,5/5,8 % (§3.4) | «Cruza de bloque (izquierda, centro, derecha)», más el estricto |
| Versión de Afinidades | 1.0 · 1.1 · «V1» en la cita | V1.1 | «CGOCUS V1.1», con la cita tal como la da Dataverse |
| Segunda legislatura | 1933-1935 (CSV, explorador) · 1933-1936 (CGOCUS; la v2 lo armoniza en toda la base) | — | Decisión del autor (D-6) |
| Votaciones de los hitos | 318–19 atribuido al Estatuto (`discursos_y_debates_2REP.md`) | `hitos.js` publicado: Estatuto 314–24 y Reforma agraria 318–19, **correcto**. 238–5 de la destitución, verificado (v3 115675 / V2 102358) | El sitio puede citar los hitos del explorador. El documento interno es el que está mal |
| Inicio de LyT | ≤ 700 palabras (`parla_proceso`) · ≈ 1.500 (`parla_vivo`) | El Inicio de ParlaIbero tiene 698 palabras de copy aprobadas y 1.648 visibles (cuentan rótulos, tablas y pie) | Prueba de rechazo: **≤ 700 palabras de copy** y ≤ 120 de límites |
| Páginas | 28.780 | La suma de `pdf_pages` del sidecar da 28.780 (15.272 / 11.177 / 2.331) | Solo en Método, como «recuento de los ficheros del proyecto» |
| Diputado sin tilde | «Clara Campoamor Y Rodriguez» (explorador) | — | El copy escribe los nombres con su grafía |

**Dos comprobaciones más que cambian propuestas de diseño.**

1. **El diccionario de columnas no necesita la tira de completitud de ParlaIbero**, porque en LyT no informa (`critica/columnas_llenado_v2.json`).
   - En la V2, 8 columnas están al 100 % en las tres legislaturas y las 6 del orador al 99,73–99,93 %: faltan 147 filas, ministros sin escaño.
   - Los problemas reales de las columnas son de **significado**:
     - la Presidencia va al `rep_id` de quien preside;
     - el partido se asigna por legislatura;
     - la ideología es la del partido;
     - hay 93 filas con `ideology = "C "`, con un espacio;
     - hay documentos y listas de votación dentro de filas de la Presidencia.
   - `Columnas.astro` se adapta **con notas al margen y sin tira**.
2. **Las votaciones nominales son una figura posible, y ninguna base depositada las trae.**
   - En la v3, **960 filas COMENTARIOS** contienen «Señores que dijeron sí», 870 con las dos listas. Están repartidas en **392 sesiones** (490 filas en 1931-33, 392 en 1933-35 y 78 en 1936-39).
   - En la V2, esas listas están **dentro de filas de la Presidencia**; por ejemplo, V2 102358 «El Sr. PRESIDENTE:» lleva la lista del 238–5. Es otra causa de que la Presidencia «hable» tanto en la V2.
   - Un análisis rápido encuentra 248 pares de totales «Total, N» de sí y no. El recuento de nombres se acerca al total impreso, pero no siempre cuadra; los nombres son solo apellidos, con 649 apellidos compartidos.
   - **Es viable como figura de 5 votaciones escogidas** (161–121, 178–59, 368, 318–19, 314–24 y 238–5), con los apellidos resueltos a mano: unas 1–2 jornadas. No lo es como base sin un proceso de emparejamiento propio.
   - Puede ser la figura que haga a LyT **mejor** que ParlaIbero, porque responde a una de sus «preguntas sin dueño» (el voto) con el Diario. Hay que decir que es un extracto del proyecto, no un dato depositado.

---

## 4. Decisiones del autor que bloquean la Puerta 1

Van como opciones, al modo de ParlaIbero. La recomendada va primero.

| # | Decisión | Opciones (con su contra) |
|---|---|---|
| D-1 | **Base de las figuras** | (a) **V2 por defecto y v3 solo donde la V2 distorsiona** (oradores, peso de la Presidencia, filas más largas, bibliotecas), siempre rotulada. Contra: dos bases a la vista. (b) Todo en v3. Contra: no es lo que descarga el lector y no está depositada. (c) Todo en V2. Contra: enseña a Besteiro y a Prieto inflados sin remedio |
| D-2 | **Nombres de personas** en textos, capturas y figuras | (a) Se nombra: son figuras históricas y el lector del Diario es la función estrella. (b) La regla de ParlaIbero. Contra: vacía el sitio |
| D-3 | **Afinidades: V1.1 depositada o v2 corregida** | (a) Depositar primero la v2 (CGOCUS V2.0) y construir sobre ella. (b) Publicar sobre V1.1 con su sello y cambiar al depositar. Contra: cifras que caducan en semanas |
| D-4 | **Enlaces profundos** | (a) Pedir `#q=`/`#id=`/`#sesion=` en el explorador y el arreglo de `replaceState` en Afinidades antes de publicar. (b) Diseñar con «copiar consulta» |
| D-5 | **Qué abre tras el hemiciclo, y si rota** | (a) Una pregunta con la rejilla de cobertura, que funciona como índice de las legislaturas. (b) Curvas de términos rotativas. (c) Las votaciones nominales (requiere D3) |
| D-6 | **Rótulo de la segunda legislatura** | 1933-1935 (CSV) o 1933-1936 (CGOCUS, y la v2 lo generaliza). Hay que fijar uno y una frase que explique el otro |
| D-7 | **Stack** | (a) Astro, reusando el esqueleto de ParlaIbero. (b) El generador Python actual. `parla_codigo` estima 13,5–17 jornadas para (a) |

**Decisiones que no bloquean la narrativa pero sí la publicación:**
- financiación con obligación de publicidad (AEI);
- tema por defecto y respeto de `prefers-color-scheme`;
- agrupar o no las cifras de cuatro dígitos;
- si Menciones se enseña o no;
- corregir la cita «V2» del explorador que sirve la v3;
- actualizar el README depositado (V2.1);
- la fusión «Liberal» → «Liberales»;
- el partido de Martínez Barrio en 1931-33;
- la diferencia de 5 entre etiquetas y filas;
- los 729/731/735 turnos rescatados;
- los públicos de una página «para archivos, docencia y prensa»;
- la URL definitiva: `https://rodrodr.github.io/luz/` devuelve hoy 404.

---

## 5. Lo que queda abierto, por orden de importancia

| Prioridad | Hueco | Quién | Esfuerzo |
|---|---|---|---|
| 1 | Las siete decisiones de §4 | Autor | Una sesión de revisión |
| 2 | Leer `2REP_Explorer/README.md` y `MANUAL_FUNCIONALIDADES.md` para vetar en el copy lo que prometen y la web no hace (B5) | Trabajo | 0,1 j |
| 3 | «Recordar la base» en Chrome y Safari normales antes de escribir «funciona sin conexión» (C4) | Trabajo | 0,1 j |
| 4 | Votaciones nominales: 6 votaciones escogidas con los apellidos resueltos contra el censo (D3) | Trabajo, con validación del autor | 1–2 j |
| 5 | Ranking v3 completo (D4), F04 por legislatura (D6) y revisar los extremos de Negrín en F15 (C9) | Trabajo | 0,5 j |
| 6 | Capturas oscuras limpias del explorador (E3) y navegación de 1936-39 y bibliotecas propias (E4) | Trabajo | 0,35 j |
| 7 | Licencia de la geometría de provincias (esquema GADM) o sustituirla por un mapa de rejilla (D5) | Trabajo | 0,25 j |
| 8 | Bibliografía de los [EXT] y consulta de los PDF de la guerra (B8, B9) | Autor o trabajo | variable |
| 9 | Búsqueda fechada de corpus comparables, si se quiere afirmar novedad (B7) | Trabajo | 0,5 j |

---

## 6. Ficheros de esta crítica

Todos están en `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/critica/`.

**Depósitos**
- `dv_THQCMI.json`, `dv_THQCMI_versions.json`, `dv_CGOCUS.json` y `dv_CGOCUS_versions.json`: respuestas de la API de Dataverse del 22-09-2026.

**Explorador**
- `explorer_index_live.html` y `explorer_headers.txt`: el explorador publicado hoy (MD5 `155b10fd…`).

**Cobertura y columnas**
- `cobertura_mes_v2.json`: la rejilla de 173 meses, con estado, sesiones, filas y palabras de la V2, más `_meta` con la regla de numeración.
- `columnas_llenado_v2.json`: el llenado de las 14 columnas por legislatura (V2).

**Afinidades**
- `afin_index.html` y `afin_headers.txt`: la app publicada.
- Sus ficheros de datos: `afin_coauthor_edgelist.csv`, `afin_diputados_basico.csv`, `afin_metricas_diputados.json`, `afin_roles_diputados.json` y `afin_spain_provinces_grouped.json`.
- `afin_capture.py` y `deep.py`: los guiones de captura y de la prueba del enlace a una ficha.
- `capturas_afinidades/`: 10 PNG e `inventario.json`.
