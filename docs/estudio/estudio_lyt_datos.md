# Luz y Taquígrafos: datos y hechos verificables para un sitio multipágina

Estudio del 22-09-2026 para el sitio de presentación de la base de datos. Excluye por completo el prototipo de
1931 (el grafo anotado del debate constituyente, su libro de códigos, los actos afectivos y la «intensidad»).

- **Datos calculados:** 9 JSON y 9 scripts reproducibles en
  `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/datos/`.
  Ocho salen del CSV depositado (V2) y uno de la base del explorador (v3).
- **Base de partida:** `scratchpad/landing/investigacion.json` (la síntesis contrastada), más lo que he
  recalculado o comprobado yo sobre las fuentes que se citan en cada caso.

---

## 0. Cinco hechos que condicionan el diseño

1. **Hay dos corpus, y comparten la sesión como clave.** El CSV depositado (V2: 107.551 filas) y la base del
   explorador (v3, sin depositar: 121.700 filas, ids renumerados) tienen exactamente las mismas 755 claves de
   sesión `(date, num_session)`. Lo he comprobado: 755 en V2, 755 en v3 y 755 en la intersección.
   - **Consecuencia:** el sitio puede usar la sesión para unir las figuras de V2 (calendario, clima, términos)
     con las de v3 (bibliotecas).
   - **Límite:** por fila no se pueden unir sin `mapa_v2_v3.json`, que no está publicado.
2. **El explorador publicado no admite enlaces profundos.** Su `index.html` (MD5 `155b10fd…`, el mismo que el
   publicado según `investigacion.json`) no lee `location.search`, no reacciona a `location.hash` salvo para una
   prueba interna (`#r2-navegador-no-apto`) y no usa `pushState`.
   - **Consecuencia:** «clic → abre el explorador» solo puede llevar a su portada. No puede precargar una
     búsqueda, una intervención ni una sesión.
   - **Qué se puede hacer:** copiar la consulta al portapapeles y abrir el explorador con la instrucción
     «pegue en el buscador (/)». También se le puede pedir al autor un manejador `#q=` o `#id=`.
3. **En V2, «sin Presidencia» no basta para tener un ranking limpio de oradores.** Hay dos problemas.
   - **Turnos enterrados.** Hay 729 turnos de otros oradores dentro de filas ajenas, casi siempre de la
     Presidencia. Ejemplo: el discurso de Azaña del 27-05-1932 está en la fila V2 25979, a nombre de Besteiro,
     con 17.152 palabras.
   - **Documentos impresos dentro de las filas.** La fila más larga de V2, la 55221 (Prieto, 12-07-1933,
     25.371 palabras), tiene 3.733 palabras de Prieto y unas 21.638 de un documento. En la v3 son las ids
     61929–61932.
   - **Efecto en el ranking:** en V2 encabeza Prieto (554.773 palabras sin Presidencia). En v3 encabeza Royo
     Villanova (534.408, frente a 521.742 de Prieto).
   - **Consecuencia:** toda figura de oradores tiene que decir sobre qué base está hecha.
4. **Hay metadatos de sesión fiables, pero no depositados.** El sidecar `sessions.json` del explorador (sha256
   `b3295e99…`) se construyó sobre V2 y se une a V2 por rangos de id.
   - **Qué da:** Diario y sigla, páginas verificadas (741 de 755), quién preside y qué Gobierno hay en cada
     sesión.
   - **Límites:** no está en Dataverse y la web del explorador no lo aplica.
   - **Consecuencia:** el sitio puede mostrarlo si dice de dónde sale. No debe dar a entender que el explorador
     lo enseña.
5. **La guerra y el exilio casi no tienen texto.** Desde el 18-07-1936 hay 14 sesiones: 2 en 1936, 3 en 1937,
   3 en 1938, 1 en 1939 y 5 en 1945. Suman 203.167 palabras, el 0,83 % de V2.
   - **Por qué pesa:** la mayoría de las series mensuales tienen «muy baja» fiabilidad en esos meses.
   - **Consecuencia:** toda serie temporal debe comprimir los recesos y marcar la fiabilidad de cada mes.

---

## 1. Fuentes leídas y su estatus

| Fuente | Estatus | Qué aporta | Comprobación |
|---|---|---|---|
| `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv` | **Depositado** (THQCMI V2.0, 15-09-2026) | Base de todas las figuras V2 | MD5 `360332a0ff1327671530f15eed46ac0c`, igual al publicado; 107.551 × 14; `pd.read_csv(f, sep=';')` |
| `Luz_y_Taquigrafos_README.txt` | Depositado (V1.0 de 2025, no actualizado) | Esquema, escala ideológica, 755 números, 107.556 etiquetas, 367 correcciones, 99,86 % | Leído. Su tabla de cobertura es la de V1 |
| `Dataverse_V2_2026-09-15/changelog_es_09_2026.txt` | Depositado | 7 sesiones y 894 filas con la fecha corregida, con sus rangos de id | Leído; el MD5 lo comprobó la síntesis |
| `Dataverse_V2_2026-09-15/erratas_fechas_V1.csv` | Local, no depositado | Fecha de V1 y fecha corregida de las 7 sesiones | Leído |
| `scratchpad/landing/corpus/corpus.sqlite` | Copia de la base que sirve el explorador (v3, sin depositar) | Bibliotecas, contraste V2/v3 | sha256 `3a0d8b2d…` según la síntesis; he consultado las tablas `speeches` y `speeches_fts` |
| `scratchpad/landing/clima/part*.jsonl` | Derivado local (motor del explorador sobre v3) | Papel de cada fila v3 (`chair`) | 121.700 registros |
| `landing/datos_explorador.json`, `landing/agregados_corpus.json` | Derivados locales (v3) | Totales v3, reacciones v3, sidecar resumido, bibliotecas | Leídos; cuadran con mis consultas |
| `2REP_Explorer/standalone/data/sessions.json` | Local. Va embebido en la web publicada, pero no se aplica (`applied 0`) | Metadatos de sesión para V2 | Generado el 2026-09-15 para el corpus `2REP_Diaries` (V2); el sha256 coincide con `sessions.sha256` |
| `2REP_Explorer/standalone/src/engine/generated/hitos.js` | Publicado dentro de la web (Tendencia) | 21 hitos históricos con fuente | Leído con node |
| `2REP_Explorer/dist/bibliotecas/*.2replib` + `INFORME.md` | Publicados en la web («Bibliotecas del proyecto») | 31 bibliotecas y 24.029 entradas, con sus ids v3 | Recalculado: coincide con `INFORME.md` (entradas, palabras y sesiones) |
| `2REP_Explorer/docs/sesiones_indice_reaccion.csv` | Local, no publicado | Índice IRP por sesión, calculado sobre V2 (`corpus/2REP_Diaries/corpus.sqlite`) | Leído; la definición solo está en el docstring de `tools/indice_reaccion_sesiones.py` |
| `2REP_Explorer/tools/mapa_v2_v3.json` | Local, no publicado | Correspondencia entre filas V2 y piezas v3 | Usado para trazar las filas 25979, 55221 y 85330 |
| `/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/data/*.json` | Derivados de los ficheros públicos de la app Afinidades, que según el script son idénticos a CGOCUS | Red, resumen, familias, roles | Leídos. `coauthor_edgelist.csv` tiene 63.507 filas, las mismas que el DDI |
| `/Users/rodrodr/Dropbox/Apps/parlaibero_site/` | Proyecto hermano | Referencia de formato (por ejemplo, `FigTermino.astro` con `terminos.json`) | Solo el plan y la cabecera de `FigTermino` |

---

## 2. Qué he calculado (viabilidad demostrada)

**Carpeta:** `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/datos/`

**Para reproducirlo** (Python 3 con pandas 3.0.3 y node 22.22.2, los que he usado):

```
python3 calc_clima.py        # ≈10 s; 8 procesos node con el motor del explorador. Va ANTES de calc_sesiones
python3 calc_sesiones.py     # usa clima_sesiones_v2.json si existe
python3 calc_terminos.py     # ≈11 s; 8 procesos
python3 calc_oradores.py
python3 calc_reparto.py
python3 calc_longitud.py
python3 calc_gobierno.py
python3 calc_bibliotecas.py  # la única sobre la v3
```

**Piezas compartidas:**
- `comun.py`. Lee el CSV V2 y comprueba su MD5 y sus 107.551 filas.
  - **Presidencia:** `roles_presidencia()` la calcula con el propio analizador de etiquetas del explorador
    (`R2.diario.parse_speaker`, roles `chair`, `vicechair` y `chair_age`), que se llama con `motor/roles.mjs`.
  - **Familias:** `normalizar()` aplica la misma normalización que el explorador (Republicanoses → Republicanos,
    Liberal → Liberales, etc.) y quita el espacio de la ideología `"C "`, que aparece en 93 filas.
- `motor/engine.js`. Copia del motor del explorador (`worker/transformar.js`, `engine/py`, `engine/generated` y
  `engine/diario.js` de `2REP_Explorer/standalone/src`), el mismo que se usó en `landing/scripts/`.
- `motor/clima_v2.mjs`. Aplica `parse_speech` y `climate` fila a fila.
- `_cache/`. Intermedios regenerables.

| Fichero | Script | Base | Bytes (gzip) | Contenido | Cifras de control |
|---|---|---|---|---|---|
| `sesiones_v2.json` | `calc_sesiones.py` | V2 + sidecar V2 + clima | 368.673 (61.668) | 755 sesiones. Por sesión: filas, palabras, filas y palabras de la Presidencia, diputados distintos, filas de más de 300 palabras, los 3 diputados con más palabras sin Presidencia, rango de id V2, clima y `meta` (sigla, nº de Diario, páginas verificadas, presidente, Gobierno, doble sesión, avisos) | 755 sesiones; `meta` en 755; páginas en 741; mediana de 32.402 palabras por sesión; la mayor es la del 01-07-1936 (nº 54, 97.055) |
| `clima_sesiones_v2.json` | `calc_clima.py` | V2 + motor del explorador | 269.889 (41.697) | Unidades de acotación por clase y sesión, tasas por 10.000 palabras y la intervención con más conflicto (id V2, orden, orador) | 76.679 unidades: conflicto 16.611, aplauso 8.710, orden 1.443, neutral 49.915; 19.648 filas con alguna (18,27 %); 0 errores del motor |
| `clima_meses_v2.json` | `calc_clima.py` | V2 | 12.538 (2.907) | Clima por mes: unidades y tasas | 64 meses con sesión |
| `terminos_mes_v2.json` | `calc_terminos.py` | V2 | 27.471 (9.556) | 37 familias de términos curadas × 64 meses: apariciones, filas con el término, denominadores (palabras, filas, sesiones), fiabilidad del mes, reparto por ideología sin Presidencia y 3 sesiones con más apariciones | Fiabilidad: 48 meses normal, 6 baja y 10 muy baja |
| `oradores_v2.json` | `calc_oradores.py` | V2 | 404.713 (55.188) | 773 diputados, con los totales, los de Presidencia y los de sin Presidencia, por legislatura; serie mensual sin Presidencia para los 100 primeros | 147 filas sin diputado (ministros sin escaño) |
| `reparto_v2.json` | `calc_reparto.py` | V2 + censo de Afinidades | 11.527 (3.011) | Legislatura × ideología y legislatura × familia (filas y palabras: total, Presidencia y sin Presidencia; diputados distintos) y censo por ideología de CGOCUS | Presidencia: 9,2 % / 11,7 % / 10,3 % de las palabras por legislatura |
| `longitud_v2.json` | `calc_longitud.py` | V2 | 5.192 (2.217) | Histograma en 10 tramos logarítmicos por legislatura y papel, curva de concentración y las 12 filas más largas | Mediana 14; 71.550 filas ≤ 50 (66,53 %); 17.362 filas > 300 con el 86,18 % de las palabras |
| `gobierno_v2.json` | `calc_gobierno.py` | V2 + sidecar | 9.705 (2.783) | 22 Gobiernos: sesiones, palabras, palabras del banco azul (ministros y Presidente del Consejo) y 3 ministros con más palabras | Banco azul: 5.753 filas y 2.766.151 palabras (11,37 %) |
| `bibliotecas_v3.json` | `calc_bibliotecas.py` | **v3** | 27.084 (7.917) | 31 bibliotecas: entradas, palabras, fechas, sesiones `(fecha, num_session, entradas)`, % de Presidencia y 5 diputados principales | 31 bibliotecas y 24.029 entradas, igual que `INFORME.md` |

Cada JSON lleva un `_meta` con la fuente (fichero, DOI, versión, MD5), la definición de cada campo y sus
salvedades literales, listas para el pie de figura.

---

## 3. Catálogo de figuras interactivas (25)

**Cómo leer la ficha de cada figura:**
- **Estado.**
  - **CALCULADA:** el JSON existe en `sitio/datos/`.
  - **DATOS EXISTENTES:** el JSON ya está en otra carpeta del proyecto.
  - **POR CALCULAR:** el coste se estima.
- **«Explorador».** Por el hecho 2, «abrir en el explorador» significa siempre copiar la consulta y abrir la
  portada.
- **Página.** La que propongo para un sitio de 6 a 8 páginas: Inicio, El corpus, La Cámara, Oradores y partidos,
  Palabras, Método, Explorador, Afinidades y Datos.

### F01 · Calendario de las 755 sesiones
- **Pregunta.** ¿Cuándo se reunió la Cámara, cuánto se habló en cada sesión y qué pasó en ella?
- **Dato.** `sesiones_v2.json` (V2).
  - **Celdas:** una por sesión, en filas de semana y columnas de mes, o en una tira continua por legislatura.
  - **Color:** palabras (`pal`). Se puede cambiar a diputados distintos (`dip`), filas largas (`largas`),
    conflicto por 10.000 palabras (`clima`) o peso de la Presidencia (`pal_pres/pal`).
- **Granularidad.** Sesión; 3 fechas con doble sesión (19-12-1934, 08-10-1935 y 13-11-1935) se pintan como
  medias celdas.
- **Interacción.**
  - **Al pasar el cursor:** fecha, nº de sesión, palabras, diputados, los 3 oradores principales sin
    Presidencia, y, con su procedencia, Diario, páginas, presidente y Gobierno.
  - **Filtros:** legislatura; biblioteca, que resalta las sesiones de una de las 31 (ver F17).
  - **Al hacer clic:** ficha lateral de la sesión y botón «Abrir el explorador», que copia `fecha + nº de
    sesión` y explica «Filtros › Sesión».
- **Tamaño.** 369 kB (62 kB gzip). Aligerable a unos 150 kB si el clima se carga aparte.
- **Salvedades.**
  - La columna `meta` sale del sidecar local (no depositado; el explorador no lo muestra).
  - La guerra y el exilio: 14 sesiones con el 0,83 % de las palabras.
  - La legislatura 1936-1939 incluye las 5 sesiones de México de 1945.
  - Los ids V2 no sirven en el explorador.
- **Estado.** CALCULADA · **Página:** La Cámara (e Inicio en versión reducida).

### F02 · El ritmo de la Cámara: sesiones y palabras por mes, con recesos e hitos
- **Pregunta.** ¿Cuándo hubo actividad parlamentaria y cuándo silencio?
- **Dato.** `terminos_mes_v2.json › _meta.denominadores` (V2).
  - **Series:** palabras, filas y sesiones por mes.
  - **Hitos:** los 21 de `hitos.js`, cada uno con su fecha, etiqueta, tipo y fuente.
  - **Cifras de control:**
    - El mes con más sesiones es marzo de 1932 (22).
    - El de más palabras es junio de 1934 (870.822).
    - Los recesos más largos antes de la guerra: 10-12-1935 → 16-03-1936 (97 días) y 04-07-1934 → 01-10-1934
      (89).
    - El mayor salto del corpus: Figueres, 01-02-1939 → México, 10-01-1945 (2.170 días).
- **Granularidad.** Mes; 64 meses con sesión.
- **Interacción.**
  - **Al pasar el cursor:** el mes.
  - **Al hacer clic:** el mes en el calendario F01.
  - **Hitos:** conmutables y numerados, como en la Tendencia del explorador.
  - **Recesos:** tramos rayados; los huecos largos, comprimidos.
- **Tamaño.** Unos 3 kB, más 2,3 kB de hitos (gzip).
- **Salvedades.**
  - Las cifras de votación de las descripciones de algunos hitos (161–121, 178–59, 314–24, 318–19) vienen de
    Wikipedia o del blog del Congreso según `hitos.js`. No las he cotejado con el Diario, salvo el art. 26, que
    cita la sesión 55.
- **Estado.** CALCULADA (los datos ya están) · **Página:** La Cámara.

### F03 · Curvas de términos (tipo Ngram), precalculadas
- **Pregunta.** ¿Cuándo se habló de qué?
- **Dato.** `terminos_mes_v2.json` (V2): 37 familias curadas en 9 grupos.
  - **Grupos:** régimen; tierra y trabajo; territorio; religión y enseñanza; ciudadanía; orden y violencia;
    ideologías; Estado y hacienda.
  - **Qué hay en cada familia:**
    - Su expresión regular sobre el texto plegado, sin comodines abiertos.
    - Apariciones y filas por mes.
  - **Picos comprobados** (en apariciones por 10.000 palabras, solo meses de fiabilidad normal):

    | Término | Mes del pico | Por 10.000 palabras | Nota |
    |---|---|---|---|
    | divorcio | febrero de 1932 | 21,5 | 291 filas |
    | amnistía | abril de 1934 | 22,9 | |
    | Cataluña | agosto de 1932 | 18,5 | |
    | reforma agraria | julio de 1932 | 11,6 | |
    | orden público | julio de 1933 | 12,0 | |
    | Casas Viejas | febrero y marzo de 1933 | 8,4 y 7,7 | 107 y 112 filas |
    | Asturias | noviembre de 1934 | 6,8 | |
    | estraperlo / «Strauss» | octubre de 1935 | 1,7 | En el Diario se dice sobre todo «Strauss»: 40 filas en la v3, frente a 22 de «straperlo» y 0 de «estraperlo» |
    | trigo | enero de 1935 | 20,3 | |
    | voto femenino / de la mujer | diciembre de 1931 | 1,7 | 35 apariciones |
- **Granularidad.** Mes. Las métricas posibles son por 10.000 palabras, absoluta y % de filas.
- **Interacción.**
  - **Selección:** hasta 4 términos a la vez, con etiquetas o grupos.
  - **Suavizado:** 3 meses.
  - **Fiabilidad:** baja (rayado) y muy baja (hueco).
  - **Al pasar el cursor:** el mes, con numerador y denominador.
  - **Al hacer clic en el pico:** las 3 sesiones con más apariciones (`sesiones_top`), que llevan a F01.
  - **Botón «Buscar en el explorador»:** copia la expresión en la sintaxis del explorador, variantes con `|` y
    frases entre comillas. Por ejemplo, `divorcio | divorcios`.
- **Tamaño.** 27 kB (9,6 kB gzip). Para más términos: unos 0,5 kB gzip por término.
- **Salvedades.**
  - Contar una palabra no mide el tema, el tono ni la posición.
  - OCR: las formas mal leídas no cuentan.
  - V2 incluye el material impreso (≈ 9,8 % de las palabras según la auditoría de la v3).
  - Las cifras no coinciden con las de la Tendencia del explorador, que usa la v3 y tokens, no `nwords` de V2.
  - «estraperlo» necesita la variante «Strauss».
  - «voto femenino» es raro como sintagma: 20 intervenciones en la v3.
- **Estado.** CALCULADA · **Página:** Palabras (e Inicio, con un término rotatorio).

### F04 · ¿Quién dice cada término? Reparto por ideología
- **Pregunta.** ¿Qué bancos usan cada palabra?
- **Dato.** `terminos_mes_v2.json › terminos[k].por_ideologia_sin_presidencia` (V2): apariciones por ideología,
  sin Presidencia.
  - **Ejemplos:**
    - «amnistía» la dicen sobre todo las filas I (929) y CI (305).
    - «Casas Viejas», CI (604) e I (202).
    - «fascismo», EI (213) y CI (202).
- **Granularidad.** Término × ideología (7 posiciones y «sin identificar»).
- **Interacción.**
  - **Normalización:** conmutador entre valor absoluto y apariciones por 10.000 palabras de cada ideología. El
    denominador se toma de `reparto_v2.json`; para eso hay que añadir el reparto por mes o usar el de la
    legislatura.
  - **Filtro:** legislatura. Hoy no está desglosado: basta con extender `calc_terminos.py`.
- **Tamaño.** Incluido en F03; con legislaturas, unos 5 kB más.
- **Salvedades.**
  - La ideología es la del partido del orador (escala de Llamazares), no la del individuo.
  - Si no se normaliza, gana quien más habla.
  - Los ministros cuentan con su partido.
- **Estado.** CALCULADA (sin desglose por legislatura) · **Página:** Palabras.

### F05 · Ranking de oradores sin Presidencia
- **Pregunta.** ¿Quién habló más cuando no presidía?
- **Dato.** `oradores_v2.json` (V2). Para 773 diputados: `pal_sp`, `filas_sp`, `largas_sp`, `sesiones_sp` y
  `leg{…}`.
  - **Los 5 primeros en V2** (palabras sin Presidencia):

    | Puesto | Diputado | Palabras |
    |---|---|---|
    | 1 | Prieto | 554.773 |
    | 2 | Royo Villanova | 548.622 |
    | 3 | Azaña | 480.546 |
    | 4 | Guerra del Río | 289.816 |
    | 5 | Balbontín | 287.497 |
- **Granularidad.** Diputado × legislatura.
- **Interacción.**
  - **Orden:** palabras, filas, intervenciones de más de 300 palabras o sesiones.
  - **Filtros:** legislatura, familia e ideología.
  - **Búsqueda** por nombre.
  - **Conmutador «incluir la Presidencia»:** Besteiro y Alba saltan al 1.º y 2.º puesto por filas (F07).
  - **Al hacer clic:** la ficha del diputado (F06) y «copiar nombre para el explorador» (faceta Diputado).
- **Tamaño.** 405 kB (55 kB gzip). Una versión sin series mensuales baja a unos 35 kB gzip.
- **Salvedades.** Ver el hecho 3: V2 infla a Prieto con un documento y quita a Azaña su discurso del Estatuto.
  - **Opción recomendada:** ofrecer también el ranking v3 (`datos_explorador.json` solo trae el top 15).
    Calcularlo completo sobre `corpus.sqlite` + `clima` es trivial.
  - **Denominaciones:** V2 = «datos depositados»; v3 = «datos del explorador».
- **Estado.** CALCULADA (V2); v3 POR CALCULAR (minutos) · **Página:** Oradores y partidos.

### F06 · La trayectoria de un diputado, mes a mes
- **Pregunta.** ¿Cuándo intervino más cada uno?
- **Dato.** `oradores_v2.json › oradores[0..99].meses_pal_sp`: palabras sin Presidencia en los 64 meses con
  sesión, para los 100 primeros.
- **Granularidad.** Diputado × mes.
- **Interacción.**
  - **Vista:** mini-serie en la ficha.
  - **Hitos:** superpuestos (F02).
  - **Comparación** de 2 o 3 diputados.
  - **Al hacer clic en un mes:** las sesiones de ese mes en F01.
- **Tamaño.** Incluido en F05. Para los 773: unos 40 kB gzip más.
- **Salvedades.**
  - La del hecho 3.
  - Un diputado que fue ministro aparece con las palabras de su cargo, que no son Presidencia.
- **Estado.** CALCULADA (los 100 primeros) · **Página:** Oradores y partidos.

### F07 · El efecto Presidencia
- **Pregunta.** ¿Por qué Besteiro y Alba «hablan» más que nadie?
- **Dato.** `oradores_v2.json`, en V2.

  | Diputado | Filas | De ellas, como Presidencia | Palabras | De ellas, como Presidencia |
  |---|---|---|---|---|
  | Besteiro | 21.730 | 21.680 | 1.028.999 | 995.577 |
  | Alba | 14.508 | 14.240 | 1.024.975 | 937.686 |

  - **Sin Presidencia** les quedan 33.422 palabras (Besteiro) y 87.289 (Alba).
  - **Contraste con la v3:**
    - **Besteiro:** 459.111 palabras en v3, un 55,4 % menos que en V2.
    - **Alba:** 337.782 palabras, un 67,0 % menos.
    - **Negrín:** gana un 26,5 % (43.955 → 55.620).
    - Coincide con lo que dice `RESEGMENTACION.md`: −55 %, −66 % y +26,5 %.
- **Granularidad.** Diputado.
- **Interacción.**
  - **Barra doble** V2/v3 por diputado.
  - **Conmutador:** filas o palabras.
  - **Al pasar el cursor:** la frase tipo de la Presidencia; por ejemplo, la fila V2 5423: «Ruego a la Cámara
    que guarde silencio.», 7 palabras.
- **Tamaño.** Menos de 2 kB.
- **Salvedades.**
  - La v3 no está depositada.
  - En el explorador, la Presidencia sigue atribuida al rep_id de quien preside: su faceta Diputado la cuenta.
- **Estado.** CALCULADA (los datos ya están) · **Página:** Método o Datos («Cómo leer los recuentos»).

### F08 · Voz frente a censo: ¿qué ideologías hablan más de lo que pesan?
- **Pregunta.** ¿Qué parte de la palabra se llevó cada ideología, comparada con su peso en el censo de
  diputados?
- **Dato.** `reparto_v2.json`: palabras sin Presidencia por ideología frente a `censo_afinidades.por_ideologia`
  (CGOCUS).
  - **Ejemplo, 1931-1933:**

    | Ideología | % de los diputados del censo | % de las palabras |
    |---|---|---|
    | I | 33,8 | 18,1 |
    | CD | 11,6 | 20,6 |
    | CI | 25,6 | 33,3 |

  - **Ejemplo, 1933-1935:**

    | Ideología | % de los diputados del censo | % de las palabras |
    |---|---|---|
    | ED | 8,8 | 14,2 |
    | D | 23,1 | 15,8 |
- **Granularidad.** Legislatura × ideología (7 posiciones).
- **Interacción.**
  - **Forma:** diagrama de pendiente o barras pareadas.
  - **Selector** de legislatura.
  - **Al pasar el cursor:** diputados, palabras y diputados que hablan.
- **Tamaño.** 3 kB gzip.
- **Salvedades.**
  - El censo es de diputados de Afinidades, sustitutos incluidos. No son escaños.
  - Afinidades llama 1933-1936 a la legislatura que el CSV llama 1933-1935.
  - La ideología es la del partido.
  - Los ministros cuentan con su partido.
  - Es una comparación descriptiva, no una medida de influencia.
- **Estado.** CALCULADA · **Página:** Oradores y partidos.

### F09 · Reparto de la palabra por familia política, legislatura a legislatura
- **Pregunta.** ¿Cómo cambia la Cámara que habla de una legislatura a otra?
- **Dato.** `reparto_v2.json › familia` (V2). % de palabras sin Presidencia de las familias principales:

  | Legislatura | Familias principales |
  |---|---|
  | 1931-1933 | Republicanos 51,3 · Socialista 14,0 · Liberales 12,2 · Conservadores 11,7 |
  | 1933-1935 | Conservadores 27,7 · Republicanos 25,0 · Socialista 11,3 · Derecha autoritaria 7,3 |
  | 1936-1939 | Republicanos 28,4 · Conservadores 23,6 · Socialista 14,1 |
- **Granularidad.** Legislatura × familia (25 etiquetas normalizadas).
- **Interacción.**
  - **Forma:** barras apiladas al 100 % o una «marea» de tres columnas.
  - **Conmutadores:** filas o palabras; con o sin Presidencia.
  - **Al hacer clic en una familia:** la lista de sus diputados (F05 filtrada).
- **Tamaño.** Incluido en F08.
- **Salvedades.**
  - «Republicanos» mezcla centro, centro-derecha e izquierda; el propio documento de codificación lo advierte.
  - La fusión «Liberal» → «Liberales» (15.364 filas) está pendiente de revisión.
  - La tabla de diputados no está depositada.
- **Estado.** CALCULADA · **Página:** Oradores y partidos.

### F10 · Trámite frente a discurso: la longitud de las intervenciones
- **Pregunta.** ¿Cuántas intervenciones son de trámite y cuánto pesan los discursos?
- **Dato.** `longitud_v2.json › histograma`: 10 tramos logarítmicos (0-5 … > 10.000) × legislatura × papel
  (Presidencia o resto), en filas y en palabras.
  - En V2, el 66,53 % de las filas tiene ≤ 50 palabras (mediana 14).
  - De esas filas breves, el 58,17 % son de la Presidencia.
- **Granularidad.** Tramo × legislatura × papel.
- **Interacción.**
  - **Conmutador:** filas o palabras. Es el gesto que cuenta la historia: la masa se desplaza de la izquierda a
    la derecha.
  - **Filtro:** legislatura.
  - **Al pasar el cursor:** el tramo.
- **Tamaño.** 2,2 kB gzip.
- **Salvedades.**
  - `nwords` separa por espacios.
  - «De trámite» es una interpretación; lo que se mide es la longitud.
  - En la v3 son casi 7 de cada 10 (69,0 %).
- **Estado.** CALCULADA · **Página:** El corpus.

### F11 · Curva de concentración de la palabra
- **Pregunta.** ¿Cuánto texto se llevan las intervenciones largas?
- **Dato.** `longitud_v2.json › curva`: 100 puntos.
  - El 10 % de filas más largas reúne el 74,5 % de las palabras.
  - El 20 %, el 90,4 %.
  - Las 17.362 filas de más de 300 palabras, el 86,18 %.
- **Granularidad.** Percentil de filas.
- **Interacción.**
  - **Deslizador** «el x % más largo», con la cifra en vivo.
  - **Opción:** superponer la curva sin Presidencia. Requiere añadir la curva por papel, que cuesta minutos.
- **Tamaño.** Menos de 1 kB.
- **Salvedades.** Las de F10.
- **Estado.** CALCULADA · **Página:** El corpus.

### F12 · La fila más larga no es un discurso: despiece de tres filas V2 en la v3
- **Pregunta.** ¿Por qué hacía falta la v3?
- **Dato.** `longitud_v2.json › mas_largas` + `mapa_v2_v3.json`, consultado por mí.

  | Fila V2 | Qué es en V2 | En qué se convierte en la v3 |
  |---|---|---|
  | **55221** | Prieto, 12-07-1933, 25.371 palabras | Habla, 2.654 palabras (id 61929) · documento, 527 (61930) · habla, 1.079 (61931) · documento, 21.111 (61932) |
  | **25979** | Besteiro («El Sr. PRESIDENTE:»), 27-05-1932, 17.152 palabras | Presidencia, 10 palabras (29041) · turno rescatado de Azaña, 17.142 palabras (29042) |
  | **85330** | Azaña, 20-03-1935, 14.131 palabras | Intacta (id 96282): la intervención continua más larga que V2 ya tenía bien |
- **Granularidad.** Fila.
- **Interacción.** Barra horizontal de cada fila, partida en tramos por clase (habla, documento, turno) con el
  texto de arranque al pasar el cursor.
- **Tamaño.** Menos de 3 kB. Hay que extraerlo a mano, o bien con un script de 20 líneas sobre `mapa_v2_v3.json`.
- **Salvedades.**
  - `mapa_v2_v3.json` y la v3 no están publicados.
  - Las palabras de la v3 están prorrateadas.
  - Tres cifras para el discurso de Azaña: 17.231 (`AUDITORIA_SEGMENTACION.md`), 17.152 (fila V2) y 17.142
    (id v3). En el texto, mejor decir «más de 17.000».
- **Estado.** DATOS EXISTENTES (hay que empaquetarlos) · **Página:** Método.

### F13 · Clima de sala por sesión
- **Pregunta.** ¿En qué sesiones anotó el Diario más rumores, protestas y campanillas?
- **Dato.** `clima_sesiones_v2.json` (V2, con el motor del explorador).
  - **Máximo de unidades de conflicto:** 13-10-1931, sesión 55 (art. 26; «España ha dejado de ser católica»):
    163 de conflicto, 82 aplausos y 10 de orden.
  - **Siguen:**
    - 07-12-1935 (124).
    - 08-03-1934 (122).
    - 16-06-1936 (111; la intervención con más conflicto es de Calvo Sotelo, 17 unidades).
    - 15-04-1936 (110).
  - **Por densidad** (≥ 5.000 palabras): 04-04-1934, con 39,4 unidades de conflicto por 10.000 palabras.
- **Granularidad.** Sesión (y mes en `clima_meses_v2.json`).
- **Interacción.**
  - **Forma:** tira temporal de puntos (x = fecha, y = conflicto por 10.000 palabras, tamaño = palabras) o un
    color del calendario F01.
  - **Al pasar el cursor:** las 4 clases y la intervención más conflictiva (orador, orden en la sesión y
    unidades).
  - **Filtro:** legislatura.
  - **Al hacer clic:** la sesión en F01.
- **Tamaño.** 270 kB (42 kB gzip). Recortable a unos 15 kB gzip si solo se guardan las 4 clases.
- **Salvedades.**
  - La clasificación es automática y alguna acotación puede quedar mal clasificada.
  - Mide lo que anotó el taquígrafo, no el tono.
  - V2 da 76.679 unidades y la v3, 76.678: coinciden casi del todo, pero las filas con alguna acotación
    difieren (19.648 en V2 y 19.771 en la v3), porque la v3 parte filas.
  - No llamarlo «intensidad», por la confusión con el prototipo.
- **Estado.** CALCULADA · **Página:** La Cámara.

### F14 · Qué anota el taquígrafo: las acotaciones por tipo y en el tiempo
- **Pregunta.** ¿Cómo suena la Cámara en el Diario?
- **Dato.** `clima_sesiones_v2.json › _meta.por_etiqueta` (V2):

  | Acotación | Unidades |
  |---|---|
  | Interjecciones | 39.033 |
  | Rumores | 10.589 |
  | Aplausos | 8.299 |
  | Risas | 5.391 |
  | Protestas | 3.412 |
  | Voces | 2.254 |
  | Piden la palabra | 1.911 |
  | Presidencia | 1.443 |
  | Gestos | 1.241 |
  | Asentimiento | 1.173 |
  | Denegaciones | 662 |
  | Pausa | 628 |
  | Interrupciones | 356 |
  | Aprobación | 286 |

  Más `clima_meses_v2.json` para la serie mensual por clase.
- **Granularidad.** Etiqueta; clase × mes.
- **Interacción.**
  - **Forma:** barras por etiqueta, coloreadas con los colores del lector (verde, teja, ámbar y gris).
  - **Al hacer clic en una clase:** su serie mensual.
  - **Ejemplo anclado:** la fila de Campoamor (V2 5424; v3 6079): Aplausos 4, Rumores 2, Gestos 1 y Risas 1.
- **Tamaño.** 3 kB gzip.
- **Salvedades.**
  - Las etiquetas no cuadran una a una con las clases: la clase aplauso suma 8.710, pero Aplausos y Aprobación
    suman 8.585. Para las cifras publicables, usar las clases.
- **Estado.** CALCULADA · **Página:** La Cámara.

### F15 · ¿Cuánto habla el Gobierno?
- **Pregunta.** ¿Qué parte de la palabra fue del banco azul con cada Gobierno?
- **Dato.** `gobierno_v2.json`: 22 Gobiernos.
  - **Total:** 11,37 %.
  - **Gobiernos grandes:**

    | Gobierno | Sesiones | % del banco azul |
    |---|---|---|
    | Provisional | 55 | 10,2 |
    | Azaña I | 35 | 7,6 |
    | Azaña II | 262 | 11,5 |
    | Azaña III | 51 | 11,5 |
    | Lerroux II | 39 | 13,5 |
    | Lerroux III | 30 | 13,1 |
    | Samper | 39 | 10,8 |
    | Lerroux IV | 67 | 12,1 |
    | Lerroux VI | 52 | 11,7 |
    | Chapaprieta I | 18 | 9,5 |
    | Chapaprieta II | 26 | 10,1 |
    | Azaña (1936) | 27 | 11,1 |
    | Casares Quiroga | 32 | 10,9 |
- **Granularidad.** Gobierno. Ampliable a sesión.
- **Interacción.**
  - **Forma:** barras en el orden del tiempo, con anchura = sesiones.
  - **Al pasar el cursor:** los 3 ministros con más palabras.
  - **Aviso:** los Gobiernos con 1 a 3 sesiones se atenúan.
- **Tamaño.** 2,8 kB gzip.
- **Salvedades.**
  - La asignación sesión → Gobierno sale del sidecar local.
  - Solo cuenta a quien habla con la etiqueta de cargo.
  - Algunos valores extremos piden revisión antes de publicarse: Negrín I (1,3 %) y Negrín II (40,2 %), con 3
    sesiones cada uno. Pueden deberse a etiquetas no reconocidas como ministro o a documentos leídos desde el
    banco azul.
- **Estado.** CALCULADA (exploratoria) · **Página:** La Cámara.

### F16 · Presidencias y Gobiernos en el tiempo
- **Pregunta.** ¿Quién presidía la Cámara y quién gobernaba en cada sesión?
- **Dato.** `sesiones_v2.json › meta.presidente/gobierno` (sidecar).
  - **Presidentes de sesión:**

    | Presidente | Sesiones |
    |---|---|
    | Besteiro | 401 |
    | Alba | 274 |
    | Martínez Barrio | 59 |
    | Jiménez de Asúa | 14 |
    | Barnés | 3 |
    | Lara y Zárate, Casanueva, Giménez Fernández y Fernández Clérigo | 1 cada uno |

  - **Gobiernos:** 22, de Gobierno Provisional a Giral en el exilio, con los intervalos `[inicio, fin)` del
    sidecar.
- **Granularidad.** Sesión y periodo.
- **Interacción.**
  - **Forma:** dos franjas paralelas bajo el eje de F02.
  - **Al pasar el cursor:** el nombre y el intervalo.
  - **Al hacer clic:** se filtran las sesiones en F01.
- **Tamaño.** Incluido en F01, o unos 2 kB aparte.
- **Salvedades.**
  - El sidecar no está depositado.
  - Los días de cambio de Gobierno cuentan para el entrante (regla del sidecar).
  - Negrín en el exilio y el hueco de 1945 siguen una regla documentada en `reglas.hueco_1945`.
- **Estado.** CALCULADA · **Página:** La Cámara.

### F17 · Las 31 bibliotecas del proyecto, situadas en el tiempo
- **Pregunta.** ¿Qué debates y sesiones trae el explorador ya preparados, y cuándo ocurrieron?
- **Dato.** `bibliotecas_v3.json` (**v3**): 31 bibliotecas y 24.029 entradas.
  - **Grupos:** Discursos (1), Debates (26), Sesiones (3) y Anécdotas (1).
  - **La mayor:** «Reforma agraria y Sanjurjada», con 4.497 entradas, 866.704 palabras y 47 sesiones.
  - **La de más entradas:** «Sesiones más crispadas», con 5.585 entradas y 35 sesiones.
- **Granularidad.** Biblioteca × sesión.
- **Interacción.**
  - **Forma:** carriles horizontales (uno por biblioteca) sobre el eje 1931-1945; cada sesión es una marca con
    tamaño = entradas.
  - **Al hacer clic:** se resaltan sus sesiones en F01 (la clave `fecha, num_session` es común a V2 y v3), y
    se ve la ficha (descripción y 5 diputados principales sin Presidencia).
  - **Botón:** «Añadir bibliotecas del proyecto…» en el explorador, con la instrucción correspondiente.
- **Tamaño.** 27 kB (7,9 kB gzip).
- **Salvedades.**
  - Es v3, no depositada.
  - «Discursos principales» dice 17 y trae 29 intervenciones.
  - Las L3 incluyen SUMARIO y COMENTARIOS.
  - L3-interno sale del IRP, cuya definición no está publicada.
  - Los documentos de criterio (`docs/…`) dan 404 en la web.
- **Estado.** CALCULADA · **Página:** Explorador.

### F18 · De V2 a v3: dónde van las 107.551 filas
- **Pregunta.** ¿Qué diferencia hay entre lo depositado y lo que sirve el explorador?
- **Dato.** Recuento de `mapa_v2_v3.json`, recogido en `investigacion.json › cruce.contradicciones[0]`:
  - **Sumandos:** 121.700 = 107.556 piezas de habla de V2 + 735 turnos rescatados + 12.654 COMENTARIOS + 755
    SUMARIO.
  - **Piezas de habla:** 107.556 = 107.551 − 269 filas que eran solo comentario + 274 trozos que continúan tras
    un bloque.
  - **Palabras:** 25.364.144 = 24.335.896 prorrateadas + 1.028.248 de los sumarios.
- **Granularidad.** Corpus.
- **Interacción.** Diagrama Sankey con cuatro destinos; al pasar el cursor, las cifras con su fuente.
- **Tamaño.** Menos de 1 kB.
- **Salvedades.**
  - El recuento de turnos varía según el documento: 729 en `AUDITORIA_SEGMENTACION.md`, 731 en la cabecera de
    `RESEGMENTACION.md` y 735 en su tabla y en el mapa.
  - La tabla de `RESEGMENTACION.md` suma 121.695 porque omite el saldo de +5.
  - La v3 no está depositada.
- **Estado.** DATOS EXISTENTES · **Página:** Método o Datos.

### F19 · El método como embudo
- **Pregunta.** ¿Cómo se pasa de 755 PDF a 107.551 filas identificadas?
- **Dato.** Pasos, cifras y procedencia:

  | Paso | Cifras | Procedencia |
  |---|---|---|
  | Números del Diario | 755 | Depositado |
  | Páginas | 28.780 | Recuento local de `TXT_OCR/*.meta.json`; no depositado |
  | Páginas fallidas en la 1.ª pasada de OCR | 153, en 131 sesiones: 29 recuperadas y 124 con Tesseract (106 sesiones) | Recuento local |
  | Etiquetas de orador | 107.556 (tras quitar 1.532 falsos positivos) | Depositado |
  | Filas | 107.551 | Depositado; la diferencia de 5 con las etiquetas no está documentada |
  | Asignaciones corregidas a mano | 367 | Depositado |
  | Filas con diputado | 107.404 (99,86 %) | Depositado |
  | Confianza de la identificación | Alta 98,49 %, media 1,14 %, baja 0,23 % | Solo en el .docx, no depositado |
  | Fechas corregidas en V2 | 7 sesiones, 894 filas | Depositado |
- **Granularidad.** Paso.
- **Interacción.**
  - **Forma:** escalones desplegables; cada paso con su fuente y su salvedad. Recuerda a la «Escalera» de
    ParlaIbero, que no he revisado en detalle.
- **Tamaño.** Menos de 2 kB.
- **Salvedades.**
  - OCR: GLM-OCR vía Ollama, sin prompt (plantilla interna); LightOnOCR de reserva y Tesseract `spa+spa_old`
    como último recurso. No decir LLaVA.
  - Coincidencia difusa: `difflib` con corte 0,82, aunque el README dice Jaro-Winkler.
- **Estado.** DATOS EXISTENTES · **Página:** Método.

### F20 · Anatomía de una fila
- **Pregunta.** ¿Qué trae cada fila del CSV?
- **Dato.** Filas V2 5423 y 5424 (verificadas hoy sobre el CSV).
  - **5423:** 01-10-1931, sesión 48, orden 25. «El Sr. PRESIDENTE:», Besteiro, PSOE, I, Madrid, 7 palabras:
    «Ruego a la Cámara que guarde silencio.».
  - **5424:** orden 26. «La Srta. CAMPOAMOR:», Clara Campoamor y Rodríguez, PRR, C, Madrid, 1.460 palabras.
  - **En la v3** son las ids 6078 y 6079.
- **Granularidad.** Fila; las 14 columnas.
- **Interacción.** Al pasar el cursor por cada columna, su definición (README, SECTION 5) y sus valores
  perdidos (147/151). Conmutador «cómo la ve el explorador» con los campos añadidos en la v3 (`speaker_fold`,
  `party_family_raw`…).
- **Tamaño.** Unos 10 kB, por el texto.
- **Salvedades.**
  - Texto OCR.
  - La ideología de Campoamor es C porque es la de su partido (PRR).
- **Estado.** DATOS EXISTENTES · **Página:** El corpus.

### F21 · Red de coautorías de Afinidades, legislatura a legislatura
- **Pregunta.** ¿Quién firmó con quién?
- **Dato.** Los tres ficheros de red:

  | Legislatura (Afinidades) | Fichero | Tamaño | Gzip |
  |---|---|---|---|
  | 1931-1933 | `figs/afinidades/data/afin_red_1931-1933.json` | 309 kB | 74 kB |
  | 1933-1936 | `afin_red_1933-1936.json` | 293 kB | 69 kB |
  | 1936-1939 | `afin_red_1936-1939.json` | 186 kB | 36 kB |

  - **Nodos:** `x`, `y` precalculados, con familia, ideología, rol, comunidad, grado e influencia.
  - **Aristas:** `[i, j, peso]` (16.144 en 1931-1933).
- **Granularidad.** Diputado × legislatura.
- **Interacción.**
  - **Selector** de legislatura.
  - **Al pasar el cursor por un nodo:** nombre, partido y rol.
  - **Filtros:** familia o bloque.
  - **Al hacer clic:** resaltar a los vecinos.
  - **Enlace** a la app de Afinidades, que es otra web.
- **Tamaño.** 36 a 74 kB gzip por legislatura; hay que cargarlo bajo demanda.
- **Salvedades.**
  - Afinidades usa 1933-1936, no 1933-1935.
  - Es una base derivada (CGOCUS) con sus propias discrepancias: ver la sección 5.
  - La coautoría no es voto ni acuerdo ideológico.
- **Estado.** DATOS EXISTENTES · **Página:** Afinidades.

### F22 · Tres legislaturas en cifras de coautoría
- **Pregunta.** ¿Se cruzó el eje izquierda-derecha para firmar?
- **Dato.** `afin_resumen.json`:

  | Legislatura (Afinidades) | Díadas que cruzan de bloque | Diputados sin cofirma | Medidas | Modularidad por partidos |
  |---|---|---|---|---|
  | 1931-1933 | 35,1 % | 22 | 674 | 0,377 |
  | 1933-1936 | 23,0 % | 30 | 767 | 0,335 |
  | 1936-1939 | 7,4 % | 186 | 89 | 0,503 |

  - `afin_medidas.json` añade el histograma de firmantes por medida.
- **Granularidad.** Legislatura.
- **Interacción.**
  - **Forma:** tres paneles pequeños animables; ya existe en `landing/graficos.py › g_firmas()`, pero en SVG
    estático.
  - **Al pasar el cursor:** el denominador de cada cifra.
- **Tamaño.** Menos de 1 kB.
- **Salvedades.**
  - En 1936-1939 hay pocas medidas (89) y muchos diputados inactivos: la caída no es comparable sin avisarlo.
- **Estado.** DATOS EXISTENTES · **Página:** Afinidades.

### F23 · Matriz de familias: con quién colabora cada familia
- **Pregunta.** ¿Qué familias firman juntas más de lo esperable?
- **Dato.**
  - `afin_prox_familia.json`: el lift, es decir, lo observado entre lo esperado; 1 = azar.
  - `afin_familias.json`: los pesos de las díadas.
- **Granularidad.** Familia × familia × legislatura.
- **Interacción.**
  - **Forma:** mapa de calor con una escala divergente centrada en 1.
  - **Selector** de legislatura.
  - **Al pasar el cursor:** lift y peso bruto.
- **Tamaño.** 2,5 kB gzip.
- **Salvedades.**
  - Las familias de pocos diputados dan lifts extremos; por ejemplo, «Agrario × Agrario» vale 14,1 en
    1936-1939. Hay que dar el número de diputados de cada familia.
- **Estado.** DATOS EXISTENTES · **Página:** Afinidades.

### F24 · Mapa de circunscripciones: de dónde son los que hablan
- **Pregunta.** ¿Qué provincias tienen más voz en la Cámara?
- **Dato.** Columna `district` de V2 (54 distritos): filas y palabras sin Presidencia por distrito y
  legislatura.
- **Granularidad.** Circunscripción × legislatura.
- **Interacción.**
  - **Forma:** mapa de rejilla de provincias, que no necesita geometría externa, o coropleta si se incorpora
    una capa de provincias con licencia abierta.
  - **Al pasar el cursor:** los 3 diputados principales.
- **Tamaño.** Unos 10 kB (estimado).
- **Salvedades.**
  - Sin quitar la Presidencia, Madrid y Zamora salen infladas (Besteiro y Alba).
  - Circunscripción no es lugar de nacimiento.
  - Hay que conciliar nombres como «Coruña (La)».
- **Estado.** POR CALCULAR (unos 30 min) · **Página:** Oradores y partidos.

### F25 · Las 7 fechas corregidas en V2
- **Pregunta.** ¿Qué cambió de V1 a V2?
- **Dato.** El changelog depositado (rangos de id) y `erratas_fechas_V1.csv` (local): 7 sesiones y 894 filas.

  | Sesión | Fecha en V1 | Fecha corregida | Filas | Nota |
  |---|---|---|---|---|
  | 52 | 1931-10-03 | 1931-10-08 | 39 | |
  | 78 | 1931-11-25 | 1931-11-20 | 265 | |
  | 293 | 1932-02-10 | 1933-02-10 | 89 | |
  | 295 | 1932-02-15 | 1933-02-15 | 138 | |
  | 311 | 1933-03-11 | 1933-03-15 | 110 | |
  | 321 | 1931-07-14 | 1933-03-31 | 162 | Fecha tomada de la portada del Tomo XX |
  | 77 | 1933-06-01 | 1934-05-04 | 91 | También cambia la legislatura: 1931-1933 → 1933-1935 |
- **Granularidad.** Sesión.
- **Interacción.**
  - **Forma:** flechas sobre la línea de tiempo, de la fecha de V1 a la corregida.
  - **Al pasar el cursor:** la prueba (cabeceras, fechas del texto, secuencia).
- **Tamaño.** Menos de 1 kB.
- **Salvedades.**
  - `erratas_fechas_V1.csv` no está depositado, aunque el changelog remite a él; los rangos de id sí lo están.
  - La auditoría no detecta un error coherente con la secuencia.
- **Estado.** DATOS EXISTENTES · **Página:** Datos (versiones).

### Otras candidatas, con más riesgo o menos prioridad

- **IRP por sesión.**
  - **Datos:** `docs/sesiones_indice_reaccion.csv`, 755 filas, 82 kB (23 kB gzip), calculado sobre V2.
  - **Qué es:** la media de percentiles de 7 indicadores; la sesión con el valor más alto es la del 15-04-1936
    (95,89).
  - **Riesgo:** la definición no está publicada, uno de sus indicadores se llama «INT Intensidad extrema» (lo
    que choca con la regla del prototipo) y el explorador no lo muestra.
  - **Uso:** solo si el autor publica antes el método. Si no, basta con el clima (F13).
- **«Buscador de muestra».** Unas 12 consultas precalculadas sobre la v3 con su recuento real:
  - «"voto femenino"» da 20.
  - «"España ha dejado de ser católica"», 6.
  - «divorcio», 531 (454 de habla y 421 si se pide ≥ 100 palabras).
  - «reforma agraria», 2.125 (sin comillas) y 2.028 (con comillas).
  - «"estatuto de cataluña"», 724.
  - «"casas viejas"», 316 de habla.

  Enseñan la sintaxis del explorador sin prometer enlaces profundos. Datos: `investigacion.json › explorador`;
  fuente: v3.

---

## 4. Hechos verificados para el copy

**Base:** V2 = CSV depositado; v3 = base del explorador, sin depositar; «sidecar» = `sessions.json` local;
CGOCUS = Afinidades Elegidas.

**Qué he comprobado yo hoy:** las filas marcadas «recuento propio», además de lo que ya verificó la síntesis.

### 4.1 Depósito y corpus

| Cifra | Qué significa | Fuente | Base |
|---|---|---|---|
| doi:10.7910/DVN/THQCMI, **V2.0 del 15-09-2026** | Versión vigente (depósito 18-03-2026; V1.0 23-03-2026; V1.1 06-05-2026) | API de Dataverse (síntesis) | V2 |
| **CC BY 4.0** | Licencia desde la V1.1; la V1.0 salió con CC0 1.0. El texto del Diario es de dominio público | API de Dataverse; README SECTION 2 | V2 |
| **107.551** filas × **14** variables | Una fila por turno de palabra. Columnas: `id, num_session, order, date, speaker, speech, rep_id, rep_name, district, party, party_family, ideology, nwords, legislature` | README SECTION 5; recuento propio | V2 |
| **165.785.782 bytes**, MD5 `360332a0…` | Tamaño e integridad del CSV. El README dice «158 MB»; no usarlo | API; recuento propio | V2 |
| **755 sesiones** (números del Diario) en **752 fechas** | 3 fechas con doble sesión: 19-12-1934, 08-10-1935 y 13-11-1935 | README («755 issues»); changelog; recuento propio; sidecar | V2 y v3 |
| **405 / 276 / 74** sesiones | Por legislatura: 1931-1933 / 1933-1935 / 1936-1939, esta última con las 5 de 1945 | Recuento propio | V2 y v3 |
| **92 · 194 · 133 · 131 · 131 · 62 · 3 · 3 · 1 · 5** | Sesiones por año: 1931 a 1939 y 1945 | Recuento propio | V2 |
| **14-07-1931 → 09-11-1945** | Primera y última sesión: la apertura de las Constituyentes y la última de las 5 de México | Recuento propio | V2 |
| **61.355 / 40.342 / 5.854** filas | Por legislatura. El README trae las de V1: 61.446 / 40.251 / 5.854 | Recuento propio | V2 |
| **24.335.896** palabras | Suma de `nwords` (palabras separadas por espacios) | README; recuento propio | V2 |
| **12.966.290 / 9.476.120 / 1.893.486** palabras | Por legislatura | Recuento propio | V2 |
| **773** diputados | Con al menos una intervención; 649 primeros apellidos compartidos entre ellos | README; recuento propio; .docx | V2 y v3 |
| **107.404 (99,86 %)** filas con diputado; **147** sin él | Las 147 son ministros sin escaño; `party_family` falta en 151 | README SECTION 4; recuento propio | V2 |
| **367** | Asignaciones de orador corregidas en la revisión manual de todas las filas | README SECTION 4 | V2 |
| **1.532 → 107.556** | Falsos positivos eliminados y etiquetas que quedaron | README SECTION 4 | V2 |
| **7 sesiones / 894 filas** | Fechas corregidas de V1 a V2; en una, también la legislatura (ids 68678–68768) | Changelog depositado | V2 |
| **Escala de 7 posiciones (EI…ED)** | Ideología por partido. Ejemplos del .docx: EI comunistas y anarcosindicalistas; I PSOE; CI republicanos de izquierda; C PRR; CD liberales, agrarios y PNV; D CEDA y Lliga; ED carlistas, Falange y RE | README SECTION 5; .docx | V2 |
| **28.780 páginas** | Páginas de los 755 PDF. **No depositada**: solo para el método, como «recuento de los ficheros del proyecto» | `TXT_OCR/*.meta.json` (síntesis) | Local |
| **153 → 29 + 124** | Páginas fallidas en la primera pasada de OCR: 29 recuperadas al reintentar y 124 con Tesseract. No quedó ninguna sin texto | `meta.json` locales (síntesis) | Local |
| **1.820 visitas / 373 descargas** | Uso del depósito según Make Data Count a 22-09-2026. Cambia con el tiempo: fecharlo | API (síntesis; no la he vuelto a consultar) | V2 |

### 4.2 El explorador (v3)

| Cifra | Qué significa | Fuente | Base |
|---|---|---|---|
| **121.700** filas | Matriz resegmentada «local, sin publicar», con ids renumerados | Manifiesto; `corpus.sqlite` | v3 |
| **108.291** de habla | Lo que queda con «Solo lo que se habla»: 107.556 piezas de V2 + 735 turnos rescatados | Recuento (síntesis) | v3 |
| **12.654 COMENTARIOS / 755 SUMARIO** | Material impreso que no es habla y una fila de sumario por sesión | Recuento | v3 |
| **25.364.144 / 22.096.389 / 25.903.736** | Palabras totales, palabras de habla y tokens del índice (el denominador de la Tendencia) | Recuento; interfaz | v3 |
| **68.943 / 45.930 / 6.827** filas (**61.750 / 40.653 / 5.888** de habla) | Por legislatura | Recuento | v3 |
| **69,0 %** (v3) / **66,5 %** (V2) | Filas de ≤ 50 palabras. «Dos de cada tres» vale para V2; en el explorador son casi siete de cada diez | Recuento | V2 y v3 |
| **48.353 (44,65 %)** / **888.620** palabras | Filas de habla y palabras de la Presidencia en la v3 | `datos_explorador.json` | v3 |
| **729 turnos / 194.696 palabras (0,8 %)** | Turnos que V2 no separó, casi siempre dentro de la Presidencia | `AUDITORIA_SEGMENTACION.md` | V2 → v3 |
| **≈ 41 %** y **≈ 9,8 %** | Lo atribuido a la Mesa que no es habla suya, y el material que no es habla sobre el total de palabras | `AUDITORIA_COMENTARIOS.md` | V2 |
| **17.142** palabras (id 29042) | Discurso de Azaña sobre el Estatuto de Cataluña (27-05-1932), la intervención de habla más larga de la v3. En V2 está dentro de la fila 25979 (17.152) | Consulta propia | v3 y V2 |
| **111.733.652 / 282.316.800 bytes** | Base del explorador comprimida (3 trozos) y descomprimida; se guarda en el navegador y funciona sin conexión | Manifiesto | v3 |
| **19.867** | Expresiones de varias palabras detectadas (hasta 7 tokens, G² ≥ 10,83, frecuencia ≥ 20) | `datos_explorador.json` | v3 |
| **76.678** unidades / **19.771** filas (16,25 %) | Acotaciones clasificadas por el motor del explorador | `datos_explorador.json` | v3 |
| **20 · 6 · 531 · 2.125** | Resultados de «"voto femenino"», «"España ha dejado de ser católica"», «divorcio» y «reforma agraria» | FTS5 (síntesis) | v3 |
| **31 bibliotecas / 24.029 entradas** | Bibliotecas del proyecto: Discursos 1, Debates 26, Sesiones 3 y Anécdotas 1 | `INFORME.md`; recuento propio (`bibliotecas_v3.json`) | v3 |
| **21 hitos** | Hitos históricos numerados de la Tendencia, del 14-04-1931 al 07-11-1945 | `hitos.js`; leído | Web |
| **Besteiro −55,4 %, Alba −67,0 %, Negrín +26,5 %** | Cambio de palabras atribuidas entre V2 y v3 | Recuento propio | V2 → v3 |

### 4.3 Cifras nuevas calculadas hoy sobre V2

| Cifra | Qué significa | Fuente | Base |
|---|---|---|---|
| **48.241 filas (44,85 %)** · **2.491.469 palabras (10,24 %)** | Filas y palabras de la Presidencia en V2, según el `parse_speaker` del explorador. En V2 sus palabras son muchas más que en la v3 (888.620) por los turnos enterrados y los documentos | Recuento propio (`longitud_v2.json`, `reparto_v2.json`) | V2 |
| **58,17 %** | Parte de las filas de ≤ 50 palabras que son de la Presidencia | Recuento propio | V2 |
| **17.362** filas > 300 palabras = **86,18 %** de las palabras | El discurso concentra el texto | Recuento propio | V2 |
| **10 % → 74,5 %** · **20 % → 90,4 %** | Parte de las palabras que reúne el 10 % (o el 20 %) de filas más largas | Recuento propio | V2 |
| **25.371** palabras (fila 55221) | La fila más larga de V2, Prieto, 12-07-1933: 3.733 palabras de habla y ≈ 21.638 de un documento (ids v3 61929–61932) | Recuento propio + `mapa_v2_v3.json` | V2 → v3 |
| **14.131** palabras (fila 85330 / id 96282) | Azaña, 20-03-1935: la intervención continua más larga que V2 ya tenía bien segmentada | Recuento propio | V2 y v3 |
| **Prieto 554.773 · Royo Villanova 548.622 · Azaña 480.546** | Palabras sin Presidencia en V2. En la v3 el orden es Royo Villanova 534.408 · Prieto 521.742 · Azaña 490.603 | Recuento propio; `datos_explorador.json` | V2 y v3 |
| **5.753 filas / 2.766.151 palabras (11,37 %)** | Banco azul: ministros y Presidente del Consejo | `gobierno_v2.json` | V2 |
| **9,2 % / 11,7 % / 10,3 %** | Parte de las palabras que es de la Presidencia, por legislatura | `reparto_v2.json` | V2 |
| **14 sesiones / 203.167 palabras (0,83 %)** | Todo lo posterior al 18-07-1936: Cortes en guerra y exilio | Recuento propio | V2 |
| **Mediana de 32.402 palabras por sesión**; máximo el 01-07-1936 (97.055) | Tamaño de una sesión | `sesiones_v2.json` | V2 |
| **Mediana de 20 diputados** por sesión | Diputados distintos que hablan fuera de la Presidencia en cada sesión | `sesiones_v2.json` | V2 |
| **2.170 días** | Del 01-02-1939 (Figueres) al 10-01-1945 (México): el mayor salto del corpus | `sesiones_v2.json` | V2 |
| **76.679** unidades de acotación | Conflicto 16.611, aplauso 8.710, orden 1.443, neutral 49.915; 19.648 filas con alguna (18,27 %) | `clima_sesiones_v2.json` | V2 |
| **13-10-1931, sesión 55: 163** unidades de conflicto | La sesión con más rumores, protestas, voces e interrupciones anotados: el debate del art. 26. Lo mismo sale en la v3 | `clima_sesiones_v2.json`; `datos_explorador.json` | V2 y v3 |
| **755 = 755** | Las claves de sesión `(date, num_session)` son idénticas en V2 y v3 | Recuento propio | V2 y v3 |

### 4.4 Metadatos de sesión (sidecar)

| Cifra | Qué significa | Fuente | Base |
|---|---|---|---|
| **741 de 755** | Sesiones con páginas verificadas: 373 contiguas, 365 con verso en blanco y 3 corregidas; 14 sin verificar | Sidecar | V2 (local) |
| **405 · 336 · 9 · 5** | Tipos de Diario: Cortes Constituyentes (DSCCRE) · Diario de las Sesiones de Cortes · Extracto oficial · Extracto de México | Sidecar | V2 (local) |
| **9** presidentes de sesión (Besteiro 401, Alba 274, Martínez Barrio 59, Jiménez de Asúa 14…) y **22** Gobiernos | Quién presidió y quién gobernó | Sidecar | V2 (local) |

### 4.5 Afinidades Elegidas (CGOCUS)

| Cifra | Qué significa | Fuente | Base |
|---|---|---|---|
| doi:10.7910/DVN/CGOCUS, **V1.1**, CC BY 4.0 | Subproyecto de LyT; su app está en rodrodr.github.io/afinidades | API (síntesis) | CGOCUS |
| **1.026** diputados / **1.446** pares diputado-legislatura / **63.507** filas de aristas | Tamaño de la red. Tras la corrección de la V1.1, 1.446 dejó de ser el número de diputados | API; DDI; `coauthor_edgelist.csv` | CGOCUS |
| **674 / 767 / 89** medidas · **35,1 / 23,0 / 7,4 %** de díadas que cruzan de bloque · **22 / 30 / 186** aislados | Las tres legislaturas | `afin_resumen.json` (del script sobre los ficheros públicos de la app) | CGOCUS |

**Para los ejemplos del copy:** las fichas del explorador que recoge la síntesis (Campoamor, sesión corrida,
careo, bibliotecas y Léxico del sufragio femenino: 373 términos, 9 temas y modularidad 0,7758) se pueden
citar. Las de Careo, Léxico y Coocurrencias vienen del informe de otro investigador y no las volví a ejecutar.
El ejemplo de Menciones no se ejecutó.

---

## 5. Lo que NO debe usarse

### 5.1 El prototipo de 1931 (excluido por regla)

- **El grafo del debate constituyente:** 90 sesiones, 3.874 nodos y 324 oradores.
- **Su libro de códigos:** posturas «defiende», «critica» y «menciona»; actos afectivos (ironía, hostilidad…);
  el grado de 0 a 1 y la validación por «intensidad».
- **Una trampa de nombre:** la diapositiva 5 del guion se titula «Afinidades elegidas» pero describe ese grafo.
  No confundirla con la red de coautorías.
- **Una palabra que evitar:** el IRP tiene un indicador «INT Intensidad extrema». No usar «intensidad» en el
  copy del clima.

### 5.2 Cifras sin respaldo o superadas

- **«34 millones de palabras».** No aparece en ninguna fuente.
- **«24 millones de palabras» referido al explorador.** Esa es la cifra de V2; la base servida tiene 25,4 M
  (22,1 M de habla).
- **«107.000 intervenciones».** Redondeo del guion; decir 107.551.
- **La tabla de cobertura del README depositado** (61.446 / 40.251, 275 sesiones, 754 en total, 13.003.914 /
  9.438.496 palabras). Describe la V1.
- **«158 MB».** Son 165.785.782 bytes.
- **«774 diputados».** La faceta cuenta «Sin identificar»; son 773.
- **107.556 como número de filas.** Son etiquetas; el CSV tiene 107.551, y la diferencia de 5 no está
  explicada.
- **«17 discursos principales» como número de filas.** La biblioteca L1 tiene 29 intervenciones.
- **«21 bibliotecas».** La web ofrece 31.
- **Afinidades:**
  - «94.621 coautorías» (el DDI cuenta 13.452 casos).
  - «1.446 diputados» (son pares diputado-legislatura).
  - El periodo que empieza el 14-04-1931, anterior a la primera sesión.
- **«Sin financiación específica».** Solo figura en un borrador fuera de Apps.

### 5.3 Descripciones del método que no se sostienen

- **«LLaVA» o «prompt estructurado».** El código usa glm-ocr sin prompt, LightOnOCR de reserva y Tesseract.
- **«Jaro-Winkler ≥ 0,82» sin matizar.** El código usa `difflib.get_close_matches` con corte 0,82; mejor decir
  «emparejamiento difuso».
- **«Corrección automática del texto»** (resumen de Dataverse) como paso con nombre. Es probablemente la
  limpieza y normalización, pero el README no la describe.
- **«Filtre por el campo de confianza».** El CSV no tiene esa columna.
- **«Version 1.0 · 2025», «1931–1939»** como rango del título, **«Mexico City (exile sessions, 1937-1945)»** y
  «exilio» para Valencia y Barcelona. Todo sale del README o del .docx desfasados. Las sesiones de 1937-1939
  son de las Cortes en guerra; el exilio son las 5 de 1945.
- **Los nombres de autores del README** («Fátima García Díaz», «Iván Llamazares Valduvieco»). Usar los de la
  cita de Dataverse: García-Díez, Llamazares.

### 5.4 Promesas del explorador que hoy no se cumplen

- **Cabecera de sesión** con Diario, páginas, Presidencia, Gobierno o incidencias. No se aplica
  (`applied 0 / ignored 755`), y las dobles sesiones salen como «Número de sesión dudoso».
- **«Mismo diputado» por significado.** Es léxico (bm25). Tampoco hay búsqueda semántica, comodín en el
  buscador principal (el `*` solo funciona en Tendencia, con 3 letras o más), NOT ni proximidad.
- **Enlaces profundos** («este enlace abre la búsqueda X»). No existen.
- **Que el careo prueba un diálogo, o que Menciones mide el tono.** Tampoco que su precisión del 90 % sea de
  este corpus: se midió en los 16 parlamentos de ParlaIbero.
- **«Los datos van dentro de este archivo» y «es el conjunto publicado».** Lo dicen los créditos del
  explorador; es falso para la v3.

### 5.5 Contradicciones abiertas (no resolver en el copy, o decir las dos cifras)

- **Turnos rescatados:** 729, 731 o 735 según el documento. **Palabras de no-habla:** 2.428.857 según la
  auditoría o 2.239.507 en la base.
- **Filas sin diputado en la v3:** 12.739 en `RESEGMENTACION.md` y 13.737 en la base (12.654 + 755 + 328).
- **Etiqueta de la segunda legislatura:** 1933-1935 en THQCMI y el explorador; 1933-1936 en CGOCUS.
- **Etiquetas de clima:** no cuadran una a una con las clases (Aplausos + Aprobación = 8.585 frente a 8.710 de
  la clase aplauso). Usar las clases.
- **Discurso de Azaña del Estatuto:** 17.231, 17.152 o 17.142 palabras según la fuente.
- **Fusión «Liberal» → «Liberales»** (15.364 filas): pendiente de revisión por el autor. Afecta a F05, F08 y
  F09.
- **El guestbook** se llama «Luz y Taquígrados», con errata. No citarlo literalmente.

---

## 6. Recomendaciones de datos para el sitio

1. **Sello de base en cada figura.** Poner «Datos depositados (V2)» o «Datos del explorador (v3, sin
   depositar)» en el pie, junto al MD5 o sha256 y la fecha de cálculo. El `_meta.fuente` de cada JSON ya lo
   trae.
2. **Carga por página.**
   - **Inicio:** menos de 20 kB gzip (F01 reducida y un término de F03).
   - **La Cámara:** unos 110 kB (F01, F02, F13 a F16).
   - **Oradores y partidos:** unos 60 kB (F05, F08, F09).
   - **Afinidades:** red bajo demanda, 36 a 74 kB por legislatura.
3. **Descarga de los datos de cada figura** en CSV y JSON, sin guestbook, citando THQCMI. Es lo que hace
   ParlaIbero con `public/datos/`.
4. **Explorador.** Sustituir «clic → abre el explorador» por «Copiar consulta · Abrir el explorador», con la
   sintaxis real (`"frase"`, `a | b`, `a + b`).
5. **Pendientes del autor que desbloquean figuras.**
   - Un manejador `#q=`, `#id=` o `#sesion=` en el explorador.
   - Depositar la v3 con `mapa_v2_v3.json`, para que F05, F12, F17 y F18 dejen de apoyarse en datos sin
     depositar.
   - Incorporar el sidecar de la v3 en la web.
   - Publicar la definición del IRP y los documentos `docs/` que hoy dan 404.
   - Confirmar la fusión «Liberal» → «Liberales».
   - Actualizar el README depositado (tabla de V1, LLaVA, Jaro-Winkler, versión y nombres).
6. **Lista de términos (F03).** Tratarla como texto editorial: cada familia se revisa leyendo ejemplos.
   - «estraperlo» solo funcionó al añadir «Strauss».
   - Conviene comprobar si «vasco» y «Estatuto» necesitan desambiguación.
   - El pico de «República» y «Estatuto» en noviembre de 1945 es un mes de fiabilidad baja; hay que señalarlo
     o excluirlo.
