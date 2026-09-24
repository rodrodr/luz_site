# Capturas de la página «El explorador»

Capturas reales del explorador publicado de Luz y Taquígrafos, hechas el **22-09-2026** con Playwright en Python,
en un perfil de navegador **nuevo y de usar y tirar**. No hay retoques: solo recorte y reducción de tamaño. Cada recorte
se declara abajo, imagen por imagen. Nada se descargó como archivo: los diálogos de exportar se abrieron y se cerraron
sin pulsar «Descargar».

Dueño de esta carpeta: grupo **capturas** (contrato de construcción). Las peticiones a otros grupos están en
`docs/peticiones/capturas.md`.

## Con qué se hicieron

| | |
|---|---|
| Fecha y hora | 2026-09-22, de 18:48 a 18:57, hora local (UTC−3) |
| URL | https://rodrodr.github.io/luz_explorer/ · `last-modified: Mon, 21 Sep 2026 00:43:01 GMT` · `etag "6ab07d95-2bc4d3"` (2.868.435 B). Es la misma página que usó el estudio del mismo día. |
| Huella de la página | `build_id` `1857031ae8c04b3d`. La interfaz no muestra número de versión. |
| Base servida | `datos/corpus.sqlite.gz.000` · `.001` · `.002`, pedidas con `?v=3a0d8b2dea42e883`. Descomprimida: 282.316.800 B, sha256 `3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15` (la misma que `~/.cache/luz_site/corpus.sqlite`). CSV de origen que declara el panel: `2REP_Diaries_v3.csv`, sha256 `e1906abc601795860a2da5835571dc0f10b58e3679aa6867a27d68af843eb5f9`. |
| Navegador | Playwright 1.59 (Python) · Chromium 147.0.7727.15, canal `chromium` (el navegador completo, sin ventana) · perfil nuevo · `locale es-ES`, `--lang=es-ES` |
| Ventana | 1.440 × 900 px CSS, **densidad 2** (capturas en bruto de 2.880 × 1.800) |
| Salida | PNG reducidos a **1.600 px de ancho como mucho** (Lanczos). Los recortes pequeños conservan su tamaño en bruto, a densidad 2. |
| Tema y estilo | **Claro** y **Editorial**, los de por defecto. Las variantes oscuras usan el mismo cambio que el botón ◐ (`data-theme="dark"`), sobre el mismo estado. |
| Guiones | `guion/capturar.py` (fases `f1`, `f2`, `f4`, `f3`, `c4`, en ese orden) y `guion/recortar.py`. Trabajan en `~/.cache/luz_site/capturas/`, fuera del sitio. |

**Orden, para que las imágenes salgan limpias.** Las capturas de búsqueda, lector, sesión corrida, careo, Tendencia,
exportar y «Sobre este corpus» se hicieron **antes** de añadir ninguna biblioteca. Por eso no llevan el rombo ◆ que el
explorador pone a lo que ya está en una biblioteca. Las de Léxico, Coocurrencias y Menciones necesitan la biblioteca B2
y se hicieron después. Esto cierra el punto E3 de `docs/estudio/estudio_critica.md`.

## Qué hay en esta carpeta

```
explorador/
├── busqueda.png … tendencia.png   las del plan, en tema claro (las que usa la página)
├── oscuro/                    las mismas 12, con el mismo nombre, en tema oscuro
├── otras/                     7 alternativas y estados E4, en claro (+ oscuro/otras/)
├── guion/                     capturar.py · recortar.py
└── LEEME.md
```

El nombre de cada archivo es la clave de su pie en `docs/copy_es/explorador.md`: `corrida.png` lleva
`explorador.img.corrida.pie`, y así todas. `sobre.png` se retiró el 24-09-2026: enseñaba las dos ediciones.

## Las doce

| archivo | sección | px | peso | sha256 (12) |
|---|---|---|---|---|
| `busqueda.png` | 8.2 Primero, encontrar | 1600 × 1000 | 493 KB | `62a8d5619d1c` |
| `tendencia.png` | 8.2 | 1600 × 461 | 179 KB | `9e9c9b2343e2` |
| `lector.png` | 8.3 Leer como en el Diario | 1600 × 1000 | 415 KB | `75e2fb23ee33` |
| `acotaciones.png` | 8.3 | 1600 × 1427 | 860 KB | `d5fab6738b59` |
| `corrida.png` | 8.3 | 1600 × 1000 | 426 KB | `d658ecab4a44` |
| `careo.png` | 8.3 | 1600 × 1000 | 628 KB | `248f09bda8f1` |
| `bibliotecas.png` | 8.4 Después, enfocar | 1040 × 1440 | 183 KB | `b6c7af75a40f` |
| `lexico.png` | 8.4 | 1600 × 984 | 363 KB | `cf86bb59aaa2` |
| `coocurrencias.png` | 8.5 Coocurrencias | 1600 × 290 | 193 KB | `7da632374dca` |
| `menciones.png` | 8.6 Menciones (D-17: solo la matriz) | 1600 × 330 | 80 KB | `cd9a5ebc35fd` |
| `exportar.png` | 8.7 Llevárselo, citado | 1040 × 904 | 136 KB | `31c1346fe571` |

Cifras «comprobadas» quiere decir recalculadas hoy sobre la base que sirve el explorador (la v3, `corpus.sqlite`
de arriba), con SQL sobre su tabla `speeches` y su índice FTS5. Las que no se pueden recalcular fuera de la herramienta
se dicen «de la pantalla». En el copy, toda cifra va con marcador y con base **v3**.

---

### 1. `busqueda.png`

- **Qué enseña.** Una búsqueda con dos frases exactas unidas por `|`. Arriba, cómo la ha entendido el explorador; encima
  de la lista, el reparto por ideología de los resultados; en cada resultado, la frase resaltada y las insignias de sala.
  A la izquierda, el panel de filtros abierto.
- **Estado.** Consulta `"voto femenino" | "voto de la mujer"`, sin filtros («Solo lo que se habla» sin marcar), orden por
  relevancia. Ventana completa, sin recorte.
- **En pantalla y comprobado.** 40 intervenciones (20 con la primera frase, 28 con la segunda, 8 con las dos); del
  1-IX-1931 al 15-XII-1933, en 15 fechas; espectro: izquierda 18 %, centro-izquierda 38 %, centro 30 %,
  centro-derecha 8 %, derecha 8 %. Todo comprobado. El «11.9 ms» depende del equipo: no se cita.
- **Texto alternativo.** La búsqueda de «voto femenino» o «voto de la mujer» en el explorador: 40 intervenciones, su
  reparto por ideología y los resultados con la frase resaltada.
- **Pie.** `"voto femenino" | "voto de la mujer"`: 40 intervenciones, del 1 de septiembre de 1931 al 15 de diciembre de
  1933. Encima de la lista, su reparto por ideología.

### 2. `tendencia.png`

- **Qué enseña.** El panel Tendencia en el periodo de las Constituyentes. Enero de 1933 sale rayado, sin sesiones, con el
  hito 7 («Casas Viejas 10 ene 1933») dentro de la franja. La ficha del mes de febrero de 1933 está fijada.
- **Estado.** Consulta `"casas viejas"` (375 intervenciones) → tecla `t`. Métrica /10.000 palabras, **Mes**, periodo
  **Constituyentes**, suavizado no; «variantes» y «aplicar filtros» sin marcar; «hitos» marcado. La ficha se fijó con el
  teclado (Inicio y →): el marco granate es el foco del gráfico. Captura del panel solo (`#trendPanel`), sin la lista.
- **En pantalla y comprobado.** Febrero de 1933: 114 intervenciones con la frase (102 de habla más 12 de sumario y
  comentarios), 492 menciones, 2.055 intervenciones en el mes, 16 sesiones. Enero de 1933: ninguna intervención, «Sin
  sesiones». Serie entera: 1.193 menciones en 375 intervenciones. Todo comprobado.
- **De la pantalla, sin comprobar.** «598.946 palabras» en febrero y «25.903.736 palabras» del corpus son el recuento de
  la herramienta. La columna `nwords` de la misma base da 586.911 y 25.364.144. No se cita una sin decir de dónde sale
  (F33).
- **Cuidado.** La ficha tapa la curva de febrero a octubre de 1933. La leyenda enseña solo los 7 hitos del periodo, sin
  ninguno de los discutidos (§ Otras, `tendencia-todo.png`).
- **Texto alternativo.** El panel Tendencia del explorador con «casas viejas» mes a mes en las Constituyentes: enero de
  1933 rayado, sin sesiones, y la ficha de febrero de 1933 con 114 intervenciones.
- **Pie.** «Casas viejas» mes a mes en las Constituyentes: nada en enero de 1933, porque no hubo sesiones. En febrero, 114
  intervenciones, contando sumarios y comentarios. Con «Solo lo que se habla» y «aplicar filtros», 102.

### 3. `lector.png`

- **Qué enseña.** El lector: la intervención como un pliego del Diario, con el rótulo impreso, el nombre normalizado, la
  ficha, «Consta en el diario como», la capital inicial y los párrafos numerados para citar. Arriba, Discurso · Sesión
  corrida · Carear · + Biblioteca.
- **Estado.** Desde la búsqueda de `busqueda.png`, clic en Clara Campoamor, 1-X-1931, **id v3 6079**. Filtros y lista
  plegados (teclas `f` y `l`). Lector al principio. Ventana completa.
- **En pantalla y comprobado.** Sesión núm. 48, 1 de octubre de 1931; PRR; Madrid; 1.460 palabras; «Orden 30 de 415».
  El explorador numera desde 1: en la base es `ord` 29, y la sesión tiene 415 intervenciones. Comprobado.
- **Cuidado.** El texto es OCR sin corregir («ironias», «simbolo»): frase fija ↺ 7 donde toque. El nombre va sin tildes,
  como en la base.
- **Texto alternativo.** El lector del explorador con la intervención de Clara Campoamor del 1 de octubre de 1931: el
  rótulo «La señorita CAMPOAMOR», su ficha y el primer párrafo numerado.
- **Pie.** Clara Campoamor, 1 de octubre de 1931, en el lector: el rótulo del Diario, la ficha de la intervención y los
  párrafos numerados.

### 4. `acotaciones.png`

- **Qué enseña.** Las tres clases de acotación del Diario a la vez: los aplausos en verde, dentro de la frase; un gesto en
  gris, dentro de la frase; los rumores en teja, en bloque con filete.
- **Estado.** El mismo lector, desplazado hasta que «(Muy bien. Aplausos.)» queda arriba. **Recortada a la hoja**: en
  bruto, x 677–2355 e y 303–1800 (sin barra de herramientas ni márgenes grises), y reducida a 1.600 px.
- **En pantalla y comprobado.** Las acotaciones visibles son «(Muy bien. Aplausos.)», «(Señalando a los de la minoría
  radical socialista.)» y «(Rumores.)», con las clases `applause`, `neutral` y `conflict` del propio explorador.
- **Texto alternativo.** Tres párrafos de la intervención de Campoamor en el lector: una acotación de aplausos en verde, un
  gesto en gris y un bloque de rumores en teja.
- **Pie.** La misma intervención, de cerca: los aplausos en verde, un gesto en gris y los rumores en teja, como los anotó
  el Diario.
  (El pie que hoy trae el copy sigue siendo cierto, pero no nombra el verde, que esta imagen sí enseña. Sustituye a
  `c_lector_campoamor_rumores_1440` del estudio, que no lo traía.)

### 5. `corrida.png`

- **Qué enseña.** La sesión corrida (tecla `s`) con la intervención de Campoamor enmarcada en oro, «★ Intervención de
  referencia», «Ver solo este», «Ir a la referencia (#30)» y el selector «Orden 30 · CAMPOAMOR».
- **Estado.** Desde el lector del id 6079, tecla `s` y botón «Ir a la referencia». Ventana completa.
- **Fuera de la imagen, a propósito.** La cabecera de la sesión corrida dice «SESIÓN CORRIDA ÍNTEGRA» y «415
  intervenciones íntegras». La sesión 48 está truncada: en la v3, los ids 6460 a 6464 repiten «Pido la palabra.» y el
  último acaba en «El Sr. Ministro de». Comprobado.
- **Texto alternativo.** La sesión corrida del 1 de octubre de 1931 en el explorador, con la intervención de Clara
  Campoamor enmarcada en oro como intervención de referencia.
- **Pie.** La sesión corrida, con la intervención de Campoamor enmarcada en su sitio. + ↺ 8: «La sesión 48 tal como está en
  el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.»

### 6. `careo.png`

- **Qué enseña.** El careo «Misma sesión» en dos pliegos: Campoamor (★ Referencia, orden 30) frente a Victoria Kent
  («Réplica propuesta», orden 25). Arriba, las cinco propuestas con sus motivos y la nota «Heurística… No prueba que
  exista un diálogo.» En el pliego de Kent se ve la interrupción transcrita de Guerra del Río.
- **Estado.** Desde el lector del id 6079 (filtros y lista plegados), tecla `c`. Ventana completa.
- **En pantalla y comprobado.** Las cinco propuestas son Kent (orden 25, id 6074, 1.053 palabras), Guerra del Río (32, id
  6081), Castrovido (42, id 6091), el **Sumario** de la sesión (1, id 6050) y los **Comentarios del Diario** (61, id
  6110). Comprobado.
- **Texto alternativo.** El careo del explorador: a la izquierda, la intervención de Clara Campoamor; a la derecha, la de
  Victoria Kent, marcada como réplica propuesta; arriba, las cinco propuestas del explorador.
- **Pie.** Campoamor frente a Victoria Kent: una réplica propuesta, no un diálogo probado. Arriba, las demás propuestas,
  entre ellas el sumario y los comentarios del Diario.

### 7. `bibliotecas.png`

- **Qué enseña.** El diálogo «Bibliotecas del proyecto», con «Debate · Sufragio femenino» marcado y el botón «Añadir 1».
- **Estado.** Mis bibliotecas (vacía) → «Añadir bibliotecas del proyecto…» → marcar `L2-B2`. **Captura del diálogo
  solo**, a densidad 2 (1.040 × 1.440); el fondo atenuado queda fuera.
- **En pantalla y comprobado.** Se ven las diez primeras de la lista: 29 · 676 · 332 · **770** · 486 · 387 · 646 · 126 ·
  307 · 4.497. El índice que lleva la página tiene **31 bibliotecas con 24.029 entradas** (suma comprobada). La B2 son
  las intervenciones de las sesiones del 30-IX y el 1-X-1931 menos el sumario y los comentarios: 837 − 2 − 65 = 770. Comprobado.
- **Texto alternativo.** El diálogo del explorador que añade las bibliotecas preparadas por el proyecto, con la del
  sufragio femenino, de 770 intervenciones, marcada.
- **Pie.** Las bibliotecas del proyecto, en el diálogo que las añade a las suyas.

### 8. `lexico.png`

- **Qué enseña.** La pestaña Léxico de la biblioteca B2: cuatro cifras, el párrafo de método y la tabla de términos
  distintivos, con G² y log-ratio.
- **Estado.** Tras «Añadir 1», biblioteca abierta → Léxico, «Solo discurso» marcado (por defecto), panel de bibliotecas
  plegado (`f`). **Recortada por abajo** en el filete que cierra la fila «sabotaje» (en bruto, y 1772): 17 términos.
- **De la pantalla.** 69.640 palabras analizadas de 71.705; 7.565 términos distintos; TTR 0,109; G² máximo +810,9
  («mujer»); «pena de muerte» segunda, con 88. El recuento de palabras es el del índice de búsqueda («S. S.» cuenta dos):
  `nwords` da 71.095 para las mismas 770 intervenciones.
- **Comprobado.** «Pena de muerte» sale en 16 intervenciones del 30-IX-1931 y «Telefónica» en 21 del 1-X-1931: son las
  sesiones enteras.
- **Texto alternativo.** La tabla de léxico de la biblioteca del sufragio femenino en el explorador: «mujer» encabeza la
  lista y «pena de muerte» va segunda.
- **Pie.** El léxico de las sesiones del sufragio femenino, 30 de septiembre y 1 de octubre de 1931, frente al resto del
  corpus. «Pena de muerte» sale justo detrás de «mujer»: son las sesiones enteras.

### 9. `coocurrencias.png`

- **Qué enseña.** La tarjeta del tema 1 de Coocurrencias: el rótulo, sus términos en píldoras y el eje de partidos «en
  veces la media».
- **Estado.** Biblioteca B2 → Coocurrencias, parámetros por defecto (unidad Intervención, 250 términos, 10 vecinos,
  temas normal). Captura de la tarjeta sola, **recortada por abajo** antes de la línea «▸ Leer primero: …», que da
  nombres en crudo y sin tildes.
- **De la pantalla.** «mujer española · mujer · femenina»: 53 términos, 276 intervenciones (35,8 %, que es 276 de 770),
  27 % del texto, G² medio 89. Eje: ASR 0,4× … PRR 1,8×. Resumen fuera de la imagen: 9 temas, modularidad 0,7758.
- **Texto alternativo.** Un tema candidato de las sesiones del sufragio, «mujer española, mujer, femenina»: sus términos
  y un eje con los partidos según cuánto usan ese vocabulario.
- **Pie.** Un tema candidato de las sesiones del sufragio, con sus términos y los partidos según cuánto usan ese
  vocabulario.

### 10. `menciones.png`

- **Qué enseña.** La matriz «Entre partidos» de Menciones: filas, el partido de quien habla; columnas, el del
  mencionado; recuadro granate, el propio partido; columnas «Propio» y «Todas».
- **Estado.** Biblioteca B2 → Menciones, Mostrar Todas, focos normal. Captura del cuadro solo (`#menMatriz`). Por D-17
  no hay red, ni externas, ni focos.
- **De la pantalla.** Menciones por cada 10.000 palabras del partido que habla, sin sus turnos de Mesa. Resumen fuera de
  la imagen: 110 intervenciones con menciones (14 % de 770), 223 menciones de 44 oradores. No se pueden recalcular
  fuera de la herramienta.
- **Texto alternativo.** Tabla de ocho por ocho partidos: las menciones entre ellos en las sesiones del sufragio, por
  cada diez mil palabras, con la casilla propia recuadrada.
- **Pie.** Menciones entre partidos en las sesiones del sufragio, por cada diez mil palabras. La diagonal es lo que cada
  partido se nombra a sí mismo.
  (Va con el bloque de límites de 8.6.)

### 11. `exportar.png`

- **Qué enseña.** El diálogo Exportar de una búsqueda: formato CSV, «Incluir el texto completo» (marcado al abrir), la nota
  del separador y el BOM, el recuadro de la cita y el tamaño estimado.
- **Estado.** La búsqueda de `busqueda.png` (40 intervenciones) → «Exportar». Captura del diálogo solo, a densidad 2. **No
  se descargó nada.**
- **De la pantalla.** «Las 4 primeras líneas (empiezan por #) son la cita»; la cita va también en las columnas
  `fuente_cita` y `fuente_doi` de cada fila. «≈ 365 KB» es la estimación del diálogo.
- **Texto alternativo.** El diálogo de exportar del explorador: CSV con el texto completo, y un recuadro que explica que el
  archivo lleva la cita en sus cuatro primeras líneas y en cada fila.
- **Pie.** Exportar una búsqueda: el CSV lleva la cita en sus líneas de cabecera y en cada fila.

### 12. `sobre.png`

- **Qué enseña.** El panel «Sobre este corpus»: la cita que propone el explorador, que acaba en «Harvard Dataverse, V2»,
  y debajo el archivo que sirve: «2REP_Diaries_v3.csv», «v3, matriz resegmentada (local, sin publicar)».
- **Estado.** Primera visita del perfil nuevo; panel lateral → «Sobre este corpus». Captura del panel, **recortada por
  abajo** justo antes de «Construido» (en bruto, y 1487). Quedan fuera el tiempo de preparación, que depende del equipo,
  y el bloque «En este navegador» con su mensaje de error (§ Lo comprobado).
- **Comprobado.** 121.700 intervenciones y 755 sesiones en la base servida; la huella `e1906abc…` es la que declara la
  página.
- **Tamaño.** Es estrecha y alta: 291 px CSS de ancho en la herramienta. No debe estirarse a una columna ancha.
- **Texto alternativo.** El panel «Sobre este corpus» del explorador: la cita termina en «Harvard Dataverse, V2» y, debajo,
  el archivo servido es la versión v3, resegmentada y sin publicar.
- **Pie.** El panel «Sobre este corpus»: la cita dice V2, y el archivo que sirve es la v3, sin publicar.

---

## Otras capturas (`otras/`, con su oscura en `oscuro/otras/`)

No cuentan entre las doce. Quedan por si la página o una ficha las pide.

| archivo | qué enseña y estado | cuidado |
|---|---|---|
| `inicio.png` | Estado inicial, sin texto de búsqueda: «121.700 intervenciones», el espectro del corpus entero y la lista desde el sumario de la sesión 1 (14-VII-1931). Para 8.1, si se quiere. | — |
| `tendencia-todo.png` | Tendencia de `"casas viejas"` en el periodo **Todo**, sin ficha fijada: 19 hitos a la vista y «2 fuera del periodo», meses sin sesión rayados, «guerra» y «exilio» comprimidos. Es la vista que recomendaba el plan. | Su leyenda incluye «Martínez Barrio, presidente 17 ago 1945», donde el Diario dice «Presidente interino» (plan, D-12), y otros hitos sin fuente revisada. Por eso la principal es `tendencia.png`. Si se usa, con `explorador.p4.hitos`. |
| `menciones-con-titulo.png` | La misma matriz con su título «Entre partidos» y el párrafo que la explica. | El párrafo llama «tono» al color de las casillas. Choca con el límite «no mide el tono». |
| `hilo-de-la-sesion.png` | El final de la intervención de Campoamor (§ 11) y el «Hilo continuo de la sesión», órdenes 27 a 33, con el enlace «Leer la sesión corrida completa · 415 intervenciones →». | Si se usa, con ↺ 8. |
| `navegacion-guerra.png` | **E4.** Sin texto, faceta Legislatura 1936-1939 (6.827) y Desde 18/07/1936: **591 intervenciones**, en orden cronológico, desde el sumario de la sesión 61 (1-X-1936). Comprobado: 591 intervenciones en 14 sesiones (61 a 74), del 1-X-1936 al 9-XI-1945. Sirve al «Hoy puede» de las fichas IV y V. | El sumario de la sesión 61 abre con la nota de cubierta del volumen de extractos (se lee en la imagen). Es texto del corpus, no del sitio. |
| `biblioteca-propia.png` | **E4.** Esas 591, guardadas con «Guardar todo» en una biblioteca nueva, «Las Cortes en guerra (prueba)», con nota y dos etiquetas («guerra», «prueba»). Cada entrada lleva su nota, sus etiquetas, «Editar nota» y «Quitar». A la izquierda, «Importar .2replib…», «⤓ Exportar todas» y el aviso de que las bibliotecas se guardan en el navegador. | La biblioteca de prueba solo existió en el perfil de usar y tirar. |
| `exportar-biblioteca.png` | **E4.** El diálogo Exportar de esa biblioteca: 591 intervenciones, «≈ 1,7 MB» con el texto completo. Para una biblioteca, el formato `.2replib` está disponible; para una búsqueda, no. | No se descargó nada. |

## Lo comprobado sobre el explorador, de paso

- **«Recordar la base» (C4) no funcionó.** En la primera visita, con la casilla marcada de fábrica, el panel dijo: «No se
  pudo recordar la base: La base guardada no coincide con la construida y se ha borrado. Vuelva a intentarlo.» En cada
  una de las cinco cargas siguientes, el panel volvió a decir «Esta base no está recordada» y el explorador volvió a
  pedir las tres partes de la base. El estudio vio lo mismo con el Chromium
  reducido de Playwright; hoy pasa también con el Chromium completo. **No se promete** en el copy. Falta
  probarlo en un navegador con ventana (lo puede hacer el autor).
- **Tamaño de la descarga.** Los tres archivos miden 45.000.000 + 45.000.000 + 21.733.652 = **111.733.652 B** (106,6 MB
  en la unidad de Dataverse). El navegador recibió 45.011.196 + 44.043.029 + 21.731.188 = 110.785.413 B, con la
  compresión del transporte. La cifra del estudio era esta segunda; «unos 107 MB» corresponde a la primera.
- **La página no ha cambiado** desde el estudio: mismo `etag`, misma fecha y mismo `build_id`.
- **Palabras.** La herramienta cuenta 25.903.736 palabras en el corpus; la columna `nwords` de la misma base suma
  25.364.144. Es una de las maneras de contar de F33.

## Lo que no se hizo, y por qué

- **Ninguna descarga de archivo** (CSV, `.2replib`): solo se abrieron los diálogos.
- **Ninguna imagen de la red de coocurrencias**: el explorador la calcula y la exporta, pero no la dibuja.
- **Ni la red de Menciones, ni las personas externas, ni los focos** (D-17): traen errores de identificación visibles
  («Galarz», «A. Azaña»).
- **Ninguna prueba en móvil**: el estudio ya capturó que a 390 px la página se desborda; la página dice que pide un
  ordenador.

## Correspondencia con el inventario del estudio

| aquí | en `docs/estudio/capturas_explorador/` |
|---|---|
| `busqueda.png` | `b_busqueda_voto_1440` |
| `tendencia.png` | `f_tendencia_casas_viejas_constituyentes_tip` |
| `lector.png` | `c_lector_campoamor_ancho_1440` |
| `acotaciones.png` | sustituye a `c_lector_campoamor_rumores_1440` (ahora con las tres clases) |
| `corrida.png` | `d_sesion_corrida_1440` |
| `careo.png` | `e_careo_ancho_1440` |
| `bibliotecas.png` | `g_dialogo_bibliotecas_proyecto_marcada_1440` (solo el diálogo) |
| `lexico.png` | `g_lexico_sufragio_sinpanel_1440` |
| `coocurrencias.png` | `h_coocurrencias_tema1_sufragio` (sin «Leer primero») |
| `menciones.png` | `i_menciones_matriz_sufragio` |
| `exportar.png` | `j_exportar_dialogo_1440` (solo el diálogo, sin el ◆ de fondo) |
