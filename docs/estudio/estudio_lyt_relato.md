# Luz y Taquígrafos · material narrativo para un sitio multipágina

Estudio preparado el 22-09-2026. Reúne lo que ya existe (landing, presentación, vídeo, memoria del proyecto y documentación del explorador), lo separa del prototipo de 1931 y lo contrasta con las dos matrices del corpus. Donde una cifra o un hecho no se pudo comprobar, se dice.

## 0. Resumen

1. **La espina aprobada funciona sin el prototipo.** Se conservan la pregunta de apertura («¿Cómo discutía una democracia que se estaba inventando?»), la fuente que nadie podía leer, la fila y el corpus que se deriva en otras bases («un corpus, muchas bases»), con el cierre «Hagan sus preguntas». Los actos III, IV, V y VII de la presentación (el libro de códigos, las cuatro preguntas sobre 1931, el tono y «cada arista guarda su cita») eran del prototipo y se caen. Su hueco lo pueden llenar cosas que el corpus entero sí contiene y que he comprobado: las votaciones nominales, las acotaciones del Diario, lo que el Diario no recoge y la fórmula «luz y taquígrafos», que los diputados usan diez veces en el propio corpus.
2. **La historia de las Cortes está en el propio corpus, y con más detalle del que usaba la landing.** He comprobado sobre los CSV las votaciones de la Constitución (368 votos, sobre 466 diputados que habían prometido), del sufragio femenino (161 a 121, en el art. 34 del proyecto), de la cuestión religiosa (178 a 59, en el art. 24 del proyecto y en una sesión que se levantó a las 7.35 de la mañana), de la Reforma agraria (318 a 19) y del Estatuto de Cataluña (314 a 24). También las nueve sesiones de la guerra, con Valencia y Sant Cugat nombrados en el texto, la de Figueres, que abrió a las 22.30, y las cinco de México, con la promesa de Martínez Barrio: «Sí, prometo».
3. **Hay que corregir tres cosas antes de volver a usarlas.**
   (a) El «35 → 23 → 7 % que cruza el **eje izquierda-derecha**» de Afinidades mide en realidad el cruce entre **tres bloques** (izquierda, centro y derecha). El cruce estricto entre izquierda y derecha es de 7,1, 2,5 y 5,8 %, que no cae de forma monótona.
   (b) El descenso de «articuladores y líderes» (del 28 al 19 %) sale de cómo se construyen los roles, por percentiles. Entre los diputados que firman, esos dos roles suman en torno al 30 % en las tres legislaturas.
   (c) La documentación del explorador atribuye el 318-19 del 9-IX-1932 al Estatuto, y ese resultado es el de la Reforma agraria.
4. **Merecen página propia** las legislaturas, contadas una a una; el Diario de Sesiones y la fórmula; las sesiones como «puertas», con dieciséis fichas listas; Afinidades Elegidas, con tres redes y la advertencia metodológica; y los límites.

---

## 1. Qué he leído, cómo he verificado y cómo marco cada afirmación

**Material leído**
- Landing actual: `/Users/rodrodr/Dropbox/Apps/aecpa2026/landing/contenido.json`, `README.md`, `agregados_corpus.json`, `datos_explorador.json`, `graficos.py` y `hero_svg.py`. Salida: `out/landing.html`.
- Presentación: `/Users/rodrodr/Dropbox/Apps/aecpa2026/lyt_src/lyt_src.html` (tarjetas y notas del ponente), `scenes/*.js`, `CONTRACT.md`, `CONTRACT_AFIN.md`, `build_lyt.py` y `README.md`. Salida: `out/presenta.html` (= `out/lyt_ultracode.html`).
- Vídeo: `/Users/rodrodr/Dropbox/Apps/aecpa2026/video/guion.md`, `guion.json` y `README.md`.
- Guion original del autor: `/Users/rodrodr/Dropbox/Apps/aecpa2026/Guion_PresentacionAECPA26.docx`, con seis diapositivas.
- Memoria: `/Users/rodrodr/.claude/projects/-Users-rodrodr-Dropbox-Apps-aecpa2026/memory/*.md`.
- Documentación del explorador, que es la fuente histórica más rica del proyecto: `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/docs/discursos_y_debates_2REP.md` (17 discursos, 16 debates, 56 sesiones, anécdotas y amenazas, bibliografía clasificada), `docs/sesiones_indice_reaccion.csv`, `tools/bibliotecas.json`, `tools/mapa_v2_v3.json` y `corpus/2REP_Diaries_v3/sessions.json`.
- Afinidades: `/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/` (datos y `pipeline_afinidades.py`), `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Coautorias/documents/METHODOLOGY.md` y la ficha de Dataverse guardada en `scratchpad/cgocus.json`.
- README depositado: `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/Luz_y_Taquigrafos_README.txt` y `Dataverse_V2_2026-09-15/changelog_es_09_2026.txt`.

**Ficheros contra los que he comprobado**
- **V2 depositada**: `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv`, md5 `360332a0ff1327671530f15eed46ac0c`, el mismo que declara Dataverse. Tiene 107.551 × 14.
- **v3 del explorador, sin depositar**: `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries_v3.csv`, md5 `e7ac5319eba741dc0dbc663fae1eb8a1`, el que declara el manifiesto del explorador. Tiene 121.700 × 14.
- Los scripts de comprobación están en `scratchpad/sitio/relato/`: `load.py`, `q.py` (búsqueda sin acentos: `python3 q.py 'patrón@AAAA-MM'`) y `v1.py`, junto con `v2.pkl`, `v3.pkl` y `sesiones_v2_resumen.csv` (las 755 sesiones de la V2 con filas, palabras y oradores distintos).

**Marcas de procedencia que uso en todo el informe**

| Marca | Qué significa |
|---|---|
| **[V2 id]** | Lo he comprobado yo sobre el CSV depositado; el id es el de la V2. |
| **[v3 id]** | Lo he comprobado sobre la matriz del explorador; el id es de la v3, renumerada. Si el hecho solo está en la v3, lo digo. |
| **[EXP]** | Consta en `discursos_y_debates_2REP.md`, con sus fuentes [A]/[I]/[D]. No lo he recomprobado salvo que lo indique. |
| **[AF]** | Lo he recalculado sobre los datos de Afinidades (`figs/afinidades/`). |
| **[SIDECAR]** | Metadatos de sesión del proyecto (`sessions.json`): Diario, páginas, Presidencia y Gobierno. No están depositados y el explorador publicado no los muestra. |
| **[EXT]** | Afirmación histórica externa al corpus: necesita respaldo bibliográfico antes de publicarse. |

---

## 2. La espina narrativa

### 2.1 Lo que el investigador ya aprobó (y de dónde viene)

**En la presentación**, según la memoria del proyecto y `lyt_src.html`, los capítulos eran estos:
1. I, «La fuente que nadie podía leer»: `hemiciclo` y `censo`.
2. II, «Del tomo a la matriz»: `tabla`.
3. III, «Dónde ocurre ahora la interpretación»: `codigo`.
4. IV, «Con el texto estructurado, el debate se vuelve medible»: `sesiones`, `oradores`, `conceptos` y `matriz`.
5. V, «El tono se mide, no se intuye»: `citas`.
6. VI, «Quién firma con quién»: `red`, `cruce`, `roles` y `puentes`.
7. VII, «Cada arista guarda su cita»: `ego`.
8. VIII, «Un corpus, muchas bases»: `derivacion`.
9. IX, «Los datos están publicados»: aplicaciones y DOI.

**En la memoria** (`narrativa-antes-que-graficos.md`) está el patrón que pide el investigador: pregunta, dato, respuesta y la frase. La historia, con tensión y resolución, va antes que el gráfico; las cifras, verificadas sobre la fuente; nada decorativo.

**En el vídeo** (`video/guion.md`, 15 pasos), el recorrido es pregunta, censo, fila, [código, sesiones, oradores, conceptos, familias, tono: prototipo], Afinidades 1931, Afinidades 1936, puentes, [Azaña-ego: prototipo], derivación y «Los datos están publicados. Hagan sus preguntas».

**En la landing rechazada**, las secciones eran: por qué importa, la fuente, el corpus, la fila, el método, el explorador, qué más hace, Afinidades, límites y datos. El investigador no rechaza el contenido, sino la compresión: «resume demasiado cosas que no debería resumir».

**En el guion original del autor** (`Guion_PresentacionAECPA26.docx`), el encuadre de partida es este: los debates parlamentarios son una fuente fundamental sobre el conflicto, la competencia ideológica y el funcionamiento de las instituciones; hay una complejidad técnica en analizar grandes volúmenes de texto, y escasean los datos, sobre todo históricos. La diapositiva 6 enumera usos: posiciones de partidos y legisladores, polarización y radicalización, redes de afinidad y antagonismo, agendas, representación territorial, dinámica parlamentaria temporal y comparada, e interoperabilidad con otros corpus.

### 2.2 Qué se cae por ser del prototipo de 1931

Todo lo de los capítulos III, IV, V y VII. Son el libro de códigos (defiende, critica, menciona), la intensidad, las seis clases de actos afectivos, las 90 sesiones y los 324 oradores del grafo, los 3.874 nodos, las 23.485 relaciones, las 10.463 citas, «la ironía casi duplica a la hostilidad», «dictadura 1/68», «Gobierno 31/51», la derecha con un 19,5 % de crítica, el ego de Azaña con 39 relaciones y los 17 grupos temáticos. También se caen el nodo «Debate constitucional de 1931» de `derivacion`, la aplicación `rodrodr.github.io/aecpa2026` y el QR «Grafo» del capítulo IX.

Dos escenas que parecían neutrales también dependen del prototipo:
- `tabla.js`: las «filas reales» son fragmentos del grafo (`data.fragmentos`, `data.oradores` y `data.timeline`), no filas del CSV.
- `tomo.js`: sus 107.000 partículas se colorean con el reparto ideológico de los 324 oradores del grafo.

Las dos hay que rehacerlas con el CSV (ver §4).

### 2.3 Frases del material que se pueden reutilizar, con su procedencia

| Frase | Dónde está | Uso en el sitio |
|---|---|---|
| «¿Cómo discutía una democracia que se estaba inventando?» | Portada y notas de la presentación; vídeo, paso 1 | Pregunta de Inicio |
| «Publicado desde el primer día, ilegible por entero» | Landing, sección «fuente» | Página del Diario |
| «nunca fue secreto, solo inabarcable» | Landing, «fuente» | Página del Diario |
| «la muestra precedía a la pregunta» | Landing, «fuente» | Tensión del relato |
| «Conserva el momento en que aquello todavía podía salir de varias maneras, y guarda la voz del que perdió la votación» | Landing, «importa» | Inicio o Historia |
| «Lo que convierte un archivo en una base de datos no es el escaneo: es esto» | Presentación, `tabla` paso 1 | Página de la fila |
| «La lectura no se elimina: se aplaza, y se hace localizable» | Presentación, `tabla` paso 2 | Página de la fila |
| «Antes que las palabras, las personas» | Presentación, `censo`; vídeo, paso 2 | Página del censo (diputados) |
| «La base permite trayectorias, no solo instantáneas» | Presentación, `censo` paso 2 | Afinidades o diputados |
| «La base central es una fuente, no un producto» | Presentación, `derivacion` | Datos |
| «La siguiente derivada es suya … Publicar una fuente es dejar ese hueco abierto» | Presentación, `derivacion` paso 3; vídeo, paso 14 | Cierre |
| «Los datos están publicados. Hagan sus preguntas.» | Presentación, capítulo IX; vídeo, paso 15 | Cierre |
| «La Cámara que se inventa una república todavía firma junta» | Presentación, `red` paso 1 | Afinidades, con la corrección de §6.3 |
| «No es una tercera foto comparable: es una Cámara cortada en dos» | Presentación, `red` paso 3 | Afinidades |
| «La República no dejó de firmar junta de golpe: la guerra partió la Cámara» | Presentación, `cruce` paso 3 | Afinidades, con matiz (§6.3) |

«La estructura no sustituye a la lectura: la indexa» es buena, pero nació para la arista del prototipo. Se puede trasladar al explorador (cada resultado devuelve al pasaje, con su § citado) siempre que no se asocie al grafo.

### 2.4 Propuesta de espina sin prototipo (para varias páginas)

Tensión: *todo se publicó, con luz y taquígrafos, y precisamente por eso nadie pudo leerlo entero*. Resolución: *la fila* (la lectura se aplaza, no se elimina) y *un corpus del que salen otras bases*. Cierre: *su pregunta*.

| Movimiento | Pregunta | Qué la responde (sin prototipo) | Página |
|---|---|---|---|
| 1 | ¿Cómo discutía una democracia que se estaba inventando? | Hemiciclo de Gil Robles (portada) y 755 sesiones entre 1931 y 1945 | Inicio |
| 2 | ¿Qué se decidía allí? | Las votaciones nominales que están en el Diario, de §3.3 a §3.7 | La Cámara (historia) |
| 3 | ¿Qué es lo que se conserva? | El Diario, la fórmula, lo que se consigna y lo que se retira (§3.1 y §3.2) | El Diario de Sesiones |
| 4 | ¿Quiénes estaban? | Censo de 1.446 fichas y 1.026 personas; 80 en las tres legislaturas [AF] | Diputados / censo |
| 5 | ¿Qué es una fila? | Campoamor, 1-X-1931 (V2 5424), y la Presidencia pidiendo silencio (V2 5423) | La fila |
| 6 | ¿Qué hay dentro, y qué no conviene sumar? | Palabras por año, legislaturas desiguales y el peso de la Presidencia | El corpus |
| 7 | ¿Cómo se lee todo esto sin programar? | Recorrido del 1-X-1931 en el explorador | Explorador |
| 8 | ¿Por dónde empiezo? | Dieciséis puertas: sesiones con ficha verificada (§5) | Sesiones / puertas |
| 9 | ¿Con quién estaban dispuestos a firmar? | Tres redes de coautoría [AF] | Afinidades Elegidas |
| 10 | ¿Qué no puede decir este corpus? | Límites, incluidos los silencios del Diario (§3.1) | Límites |
| 11 | ¿Y ahora? | DOI, cita, versiones y «la siguiente derivada es suya» | Datos |

**Qué sustituye a las «cuatro preguntas respondidas con 1931».** Propongo cuatro preguntas sobre el corpus entero, con cifras que ya están verificadas:
1. **¿Cuándo se llenaba la Cámara?** Las sesiones con más oradores distintos en la V2 son las del 25-IX-1931 (61), 8-IX-1932 (53), 13-X-1931 (52) y 7-IX-1932 (50) [V2, `sesiones_v2_resumen.csv`]. La más larga en palabras es la del 1-VII-1936, con 97.055 [V2].
2. **¿Quién hablaba?** La Presidencia pronuncia el 44,65 % de las filas de habla [v3, `datos_explorador.json`]. Por palabras y sin presidir: Royo Villanova, 534.408; Prieto, 521.742; Azaña, 490.603 [v3]. Ojo: en la V2 encabezan Besteiro (1.028.999) y Alba (1.024.975), porque se les atribuye material impreso y turnos mal segmentados [V2]. Es un buen ejemplo de por qué las versiones importan.
3. **¿Quién tenía la palabra por bloques?** La derecha y la extrema derecha pasan del 6,1 % de las palabras (1931-33) al 30,0 % (1933-35), sin contar a la Presidencia [v3, `agregados_corpus.json`].
4. **¿Cómo reaccionaba la sala?** El 16,25 % de las filas tiene al menos una acotación [v3]. La sesión con más unidades de conflicto es la del 13-X-1931 (163). Por el índice de reacción del explorador, la más crispada es la del 15-IV-1936, en el percentil 100 [V2, `sesiones_indice_reaccion.csv`].

---

## 3. Contexto histórico: lo que el sitio debe contar con amplitud

Cada apartado separa lo que está **en el corpus** (verificado por mí), lo que está **en la documentación del proyecto** y lo que es **externo** y hay que respaldar.

### 3.1 Qué es un Diario de Sesiones (página propia)

**En el corpus o en el material, verificado:**
- **Qué recoge.** Cada turno, con la fórmula impresa del orador («El Sr. APELLIDO:», que el etiquetador usa para cortar), las acotaciones entre paréntesis («Rumores», «Aplausos», «Campanilla») y las votaciones nominales con la lista de nombres. Por ejemplo, «Señores que dijeron sí: … Total, 161. Señores que dijeron no: … Total, 121» [V2 5453, v3 6110]. También el sumario de cada sesión y el material que se lee o se adjunta: dictámenes, telegramas, apéndices. En la v3 hay 755 filas SUMARIO y 12.654 COMENTARIOS [v3].
- **Hay cuatro series documentales** [SIDECAR, `datos_explorador.json › sesiones_sidecar.diarios`]:

  | Serie | Sesiones |
  |---|---:|
  | *Diario de Sesiones de las Cortes Constituyentes de la República Española* | 405 |
  | *Diario de las Sesiones de Cortes. Congreso de los Diputados* | 336 |
  | *Extracto oficial de las sesiones. Congreso de los Diputados* (las de la guerra) | 9 |
  | *Extracto oficial de las sesiones de Cortes celebradas en México (exilio)* | 5 |

  En total son 28.780 páginas PDF: 15.272, 11.177 y 2.331 por legislatura [SIDECAR]. **De la guerra y del exilio no hay Diario íntegro, sino extractos oficiales.** Los cuadernillos de México los editó B. Costa-Amic en México D. F., con paginación propia [SIDECAR, `diario_nota`; v3, sumario del 10-I-1945].
- **El Diario también deja fuera cosas, y lo dice.** La Presidencia puede ordenar que unas palabras «no constarán en el Diario de Sesiones»: hay 9 filas con esa fórmula, 5 de ellas de 1936 [v3; V2, 9]. El caso más nítido es el del 1-VII-1936. Galarza dice «¡Ah!, pero yo proclamo una cosa: la violencia...» y el Diario imprime el hueco: «(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)» [V2 106289, v3 120221]. Martínez Barrio responde: «Las palabras de S. S. … no constarán en el Diario de Sesiones» [V2 106290]. Galarza cierra: «esas palabras, que en el Diario de Sesiones no figurarán, el país las conocerá» [V2 106291].
- **Lo que el taquígrafo no transcribe no existe para ninguna medida.** Tres casos [EXP §1.3, §1.4 y §4.3]:
  - El 9-X-1934, el Diario registra «unánimes aplausos y aclamaciones» (V2 74703) y no la bofetada de Calvo Sotelo a Aguirre que cuentan otras fuentes.
  - La frase atribuida a Dolores Ibárruri el 16-VI-1936 («Este hombre ha hablado por última vez») no aparece en ninguna intervención.
  - «Tiros a la barriga» no aparece en 1933. Su primera aparición es un grito desde los escaños el 31-V-1934 [V2 70714, v3 79606; comprobado].
- **Hay reuniones que el corpus no contiene** [EXP §1.2 y §2.4]: la Diputación Permanente (Gil Robles el 15-VII-1936; París el 3-III-1939, con la carta de dimisión de Azaña), las sesiones de la Diputación Permanente en México entre 1939 y 1943 y los discursos fuera del Parlamento, como «Paz, piedad, perdón». El sumario del 10-I-1945 lo dice: «De todas estas sesiones sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos» [v3, fila SUMARIO del 10-I-1945; **solo en la v3**].
- **La fuente habla de sí misma.** El volumen de extractos de la guerra se abre con esta nota: «De la última sesión que tuvo lugar en la ciudad de Figueras … no existe dato alguno» [v3, SUMARIO del 1-X-1936; solo en la v3]. Sin embargo, el corpus contiene un *Extracto oficial* de la sesión del 1-II-1939 [v3 121446; V2 107326 y siguientes]. **Pendiente:** aclarar esa contradicción (quizá el extracto se localizó después; en la nota hay una línea ilegible por el OCR: «Rohan localizada y Febrero 1939»).
- **Los diputados citan el Diario como arma.** El 24-II-1933, Azaña se queja de que la oposición esgrime su frase de Casas Viejas «sacándola del Diario de Sesiones» [EXP, D10; V2 46544]. En total hay 1.508 filas de la V2 que mencionan el «Diario de Sesiones» (1.397 filas de habla en la v3).

**Externo, a verificar [EXT]:** la historia institucional del Diario (desde cuándo se publica, quién lo edita, cómo trabajaba el cuerpo de taquígrafos). No está en ningún material del proyecto.

### 3.2 La fórmula «luz y taquígrafos» (dentro de la página del Diario o como página propia)

**En el material:** la landing la define como «sesión abierta y transcripción literal». No da fuente del origen.

**En el corpus, verificado.** La expresión aparece en **10 filas de habla**, las mismas en la V2 y en la v3, entre 1931 y 1936. Las más elocuentes:
- **8-VI-1934.** La Presidencia recuerda que los suplicatorios «han de tratarse en sesión secreta». Se oye: «Luz y taquígrafos.» (tres palabras, con la etiqueta «El Sr. JIMÉNEZ FERNÁNDEZ», CEDA). La Presidencia responde: «no he visto quién ha interrumpido» [V2 71330, v3 80306]. Es la fórmula como lo contrario de la sesión secreta: la mejor definición en acto.
- **3-VIII-1933, Royo Villanova** (agrario): «yo soy entusiasta del Parlamento, porque aquí se liquida todo con luz y taquígrafos, como decía Maura» [V2 57506, v3 64595]. **Ojo:** es una atribución de Royo, no un dato de origen.
- **8-VII-1936, Maurín** (POUM): «Hay luz y taquígrafos, los taquígrafos recogerán eso. (El señor Comín: Pobres taquígrafos.)» [V2 106747, v3 120751].
- Las demás: Franco López, 20-VII-1931, sobre las actas electorales («fechorías, que no suelen hacerse con luz y taquígrafos»); Balbontín, 9-IV-1932, 3-V-1932 y 19-VII-1933; Calderón, 13-XI-1934, sobre el presupuesto y los suplicatorios en sesión secreta; Fuentes Pila, 29-I-1935, que la da como dicho común («suele decir que hacen falta "luz y taquígrafos"»), y Calvo Sotelo, 22-XI-1935 [v3 472, 26612, 27477, 62718, 84760, 89910 y 112827].

**Externo, a verificar [EXT]:** el origen de la expresión. Se atribuye a Antonio Maura; el propio corpus recoge esa atribución por boca de Royo Villanova. Hace falta una fuente de historia de la lengua o del parlamentarismo.

**Figura posible:** una línea de tiempo con los 10 usos, cada uno abriendo su pasaje. Son pocos y todos están comprobados.

### 3.3 Las Cortes Constituyentes (1931-1933)

**Corpus [V2]:** 405 sesiones, del 14-VII-1931 al 3-X-1933; 61.355 filas; 12,97 millones de palabras; 417 diputados que hablan. En la v3 son 68.943 filas, 61.750 de habla.

| Hecho | Estado | Procedencia |
|---|---|---|
| Apertura el 14-VII-1931. Preside la Mesa de edad Narciso Vázquez Lemus; discurso de Alcalá-Zamora como presidente del Gobierno provisional (3.715 palabras) | Verificado | V2 1-2 / v3 1-3 (en la v3, la fila 1 es el sumario) |
| Jiménez de Asúa presenta el proyecto de Constitución el 27-VIII-1931 («una constitución de izquierda») | Id verificado; cita de [EXP] | V2 2725, 5.188 palabras |
| Unamuno sobre la lengua oficial, 18-IX-1931 (Pentecostés) | Id [EXP] | V2 3664 |
| **Sufragio femenino, 1-X-1931.** Primero se rechaza una proposición socialista por 141 a 106 y después se aprueba el art. 34 «numeración antigua» en votación nominal por **161 a 121** (Victoria Kent vota no) | **Verificado** | V2 5453 / v3 6110 |
| Kent: «creo que el voto femenino debe aplazarse»; Campoamor: «Yo ruego a la Cámara que me escuche en silencio» | Verificado | V2 5419 y 5424 |
| **Cuestión religiosa.** El debate se abre el 8-X-1931 con De los Ríos (sesión que la V1 fechaba el 3-X; la V2 la corrige). Alcalá-Zamora habla el 10-X; Azaña, el 13-X | Verificado | V2 6519, 6593, 6748; changelog V2 |
| La sesión 55 empieza a las 16.30 del 13-X y «se levanta … a las siete y treinta y cinco minutos de la mañana del día 14». El «artículo 24» del proyecto se aprueba «por 178 votos contra 59» | **Verificado** | v3 7387 (sumario) y 7800 / V2 6994 |
| Que el art. 24 del proyecto sea el art. 26 de la Constitución, y que la votación supusiera la dimisión de Alcalá-Zamora y Maura y la llegada de Azaña a la presidencia del Gobierno | La dimisión y el relevo son [EXP] + [EXT]. El 14-X Azaña ya habla como «El Sr. Presidente del GOBIERNO (Azaña)» [V2 7022, verificado] | — |
| Responsabilidades de Alfonso XIII, 19-XI-1931 (Galarza acusa; Romanones defiende) | Ids [EXP]; la votación por aclamación y la ley del 26-XI son [EXT] (respaldo solo divulgativo según el propio EXP) | V2 11295, 11291 |
| **Constitución, 9-XII-1931.** «Los Sres. Diputados que han prometido en estas Cortes suman 466 … Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí» | **Verificado** | v3 15043 / V2 13531 |
| Elección del presidente de la República, 10-XII-1931 (orden del día «Elección de Presidente de la República») | Verificado que figura en el orden del día; que el elegido fuera Alcalá-Zamora es [EXT] (claro, pero no lo he leído en la fila) | v3 15137 |
| Azaña, 9-III-1932: «El centro de gravedad de la política de la República española está en el Parlamento, aquí en este salón» | Cita [EXP]; id verificado | V2 20689 |
| Ortega, 13-V-1932: el problema catalán «no se puede resolver, que sólo se puede conllevar» | **Verificado** | v3 28500 / V2 25527 |
| Azaña, Estatuto, 27-V-1932: 17.152 palabras a nombre de «El Sr. PRESIDENTE» (Besteiro) en la V2; en la v3, 17.142 a nombre de Azaña | **Verificado** | V2 25979 → v3 29042 |
| Azaña tras la Sanjurjada, 10-VIII-1932 | Id [EXP]; el golpe del 10-VIII es [EXT] | V2 32910 |
| **9-IX-1932.** Primero la Reforma agraria: «votaron en pro del proyecto de Reforma agraria 318 … y en contra, 19» («Han prometido 462; la mitad más uno, 232»). Después el **Estatuto de Cataluña: 314 a 24**, con vivas de Companys («¡Viva el pueblo español!»), Aragay («¡Viva España!») y Tapia («¡Viva nuestra Cataluña!») | **Verificado. Corrige a [EXP]**, que da 318-19 al Estatuto | v3 41627, 41628, 41629, 41630 / V2 37177-37179 |
| Casas Viejas, 2-II-1933. Azaña: «En Casas Viejas no ha ocurrido sino lo que tenía que ocurrir. (Fuertes rumores y protestas…)» | **Verificado** | V2 44922 / v3 50255 |
| «Casas viejas» en filas de habla: 102 (II-1933) y 108 (III-1933); 260 en 1933 y 34 en 1934 | Verificado | v3 |
| Ley electoral de 1933 (prima a la mayoría; el aviso de Gil Robles); el final de las Constituyentes en octubre de 1933 | Solo en la descripción de las bibliotecas L2-B21 y L2-B22 (Cabrera, *Ayer* 20, 1995) | [EXP] + [EXT] |

**Externo [EXT]:** la proclamación del 14-IV-1931; las elecciones de junio de 1931; que las mujeres votaran por primera vez en noviembre de 1933 (lo afirma [EXP] D3); la correspondencia entre la numeración del proyecto y la de la Constitución (art. 24 → 26; art. 34 → 36).

### 3.4 La legislatura elegida en 1933

**Corpus [V2]:** 276 sesiones, del 8-XII-1933 al 10-XII-1935; 40.342 filas; 9,48 millones de palabras; 390 diputados. **Rótulo:** el CSV dice «1933-1935»; Afinidades, «1933-1936». Hay que armonizarlo en el sitio y explicar por qué: las sesiones del Diario acaban el 10-XII-1935; la disolución de las Cortes es [EXT].

| Hecho | Estado | Procedencia |
|---|---|---|
| Presidencia de Santiago Alba en 274 sesiones | [SIDECAR] | `presidentes_de_la_sesion` |
| El reparto de la palabra cambia: derecha y extrema derecha, del 6 al 30 % de las palabras | Verificado | v3, `agregados_corpus.json` |
| Amnistía de abril de 1934; contratos de cultivo y retirada de ERC y del PNV (junio de 1934); reforma del Reglamento (noviembre de 1934) | Solo [EXP]: bibliotecas L2-B24, B8 y B25 | — |
| **4-VII-1934.** Prieto reconoce: «ha salido a luz alguna pistola, por lo menos la mía … he sacado la pistola después de haber visto…» | **Verificado** | v3 84039 / V2 74619 |
| 31-V-1934: primer «¡Tiros a la barriga!», como grito desde los escaños | Verificado | V2 70714 |
| 9-X-1934: la Cámara acuerda suspender las sesiones (revolución de octubre); el Diario no recoge la bofetada | [EXP] (B9, §4.3) | V2 74703 |
| Debates de noviembre de 1934 sobre octubre (Calvo Sotelo, 6-XI, 9.634 palabras) | Ids [EXP]; [EXP] advierte que no interviene ningún socialista y que el respaldo académico es el más débil de la lista | V2 74837 |
| Azaña se defiende de la acusación parlamentaria, 20-III-1935: 14.131 palabras | Id verificado; contexto (*Turquesa*, revolucionarios portugueses) de [EXP] | V2 85330 / v3 96282 |
| Estraperlo (28-X-1935) y Nombela (29-XI al 7-XII-1935); caída de Lerroux y hundimiento radical | [EXP] + [EXT] | V2 97387 … |
| La sesión del 7-XII-1935 es la segunda del corpus en palabras (89.870) y está en el percentil 96,3 del índice de reacción (Primo de Rivera interrumpe 14 veces) | Palabras verificadas [V2]; lo demás [EXP] | — |

### 3.5 La legislatura de 1936, hasta la guerra

**Corpus [V2]:** 60 sesiones del 16-III-1936 al 10-VII-1936, dentro de la etiqueta 1936-1939, que suma 74 sesiones.

| Hecho | Estado | Procedencia |
|---|---|---|
| Apertura el 16-III-1936, «Presidencia de los Sres. Carranza (Presidente de edad) y Martínez Barrio (Presidente interino)». Cierra con «¡Viva la República! ¡Viva España!» (Martínez Barrio) | Verificado | v3 114874 y 114888 |
| El incidente del «viva» negado: «el Sr. Diputado por Pontevedra Sr. Fernández-Osorio y Tafall solicitó de la Presidencia un viva a la República, negándose el Sr. Presidente…» | Verificado **solo en la v3** (fila SUMARIO del 17-III-1936). Hay que precisar a qué sesión y a qué presidente se refiere | v3 114890 |
| Comisión de Actas (Cuenca y Granada) | Controversia historiográfica viva (Álvarez Tardío y Villa García, 2017, y sus críticos) | [EXP] B12 |
| **Destitución de Alcalá-Zamora, 7-IV-1936.** Prieto: 4.796 palabras | Id verificado; la aplicación del art. 81 es [EXP] + [EXT] | V2 102323 / v3 115638 |
| **15-IV-1936**, sesión más crispada del corpus (índice de reacción 95,89; percentil 100). Ibárruri: «le quitaremos los zapatos y le pondremos las botas»; un diputado anónimo: «En la horca» | IRP verificado en el CSV del índice (calculado sobre la V2). Pasajes [EXP] (§4 bis) | V2 102493 y 102481 |
| **16-VI-1936.** Calvo Sotelo: «Señor, la vida podéis quitarme, pero más no podéis»; Casares: «haré responsable ante el país a S. S.» | Cita de Calvo Sotelo **verificada**; la de Casares, [EXP] | v3 119131 / V2 105356; V2 105330 |
| **1-VII-1936**, la sesión más larga del corpus: 125 filas y 97.055 palabras en la V2. Galarza, sus palabras «no se consignan» | **Verificado** | V2 106289-106291 |
| Última sesión ordinaria, 10-VII-1936 | Verificado (última fecha antes de la guerra) | V2 |
| Asesinato de Calvo Sotelo (13-VII) y sublevación (17-18-VII) | [EXT]. El corpus solo dice «con posterioridad al 18 de julio» (v3, SUMARIO del 1-X-1936) | — |

### 3.6 Las Cortes en guerra (1936-1939)

**Corpus:** 9 sesiones, todas publicadas como *Extracto oficial* [SIDECAR], de 20 a 66 filas cada una en la v3. Las fechas y los oradores principales están verificados [v3]:

| Fecha | Sesión | Lo verificado en el corpus | Lugar |
|---|---|---|---|
| 1-X-1936 | 61 | Largo Caballero presenta su Gobierno (839 palabras); Aguirre (732); Díaz Ramos | Madrid [EXP: «habitual en la literatura»] |
| 1-XII-1936 | 62 | Martínez Barrio agradece «al pueblo de Valencia» su Casa comunal para los servicios de la Cámara | **Valencia, verificado** (v3 121147) |
| 1-II-1937 | 63 | Largo Caballero (1.996) | Valencia [EXP] |
| 1-X-1937 y 2-X-1937 | 64-65 | Negrín (3.358 en la v3; en la V2, 6.378 a nombre del Presidente); Ibárruri y Pestaña el 2-X | Valencia [EXP] |
| 1-II-1938 | 66 | Negrín (6.937 en la v3; en la V2, 7.749 a nombre del Presidente) | Montserrat: **no aparece en el texto** [EXP/EXT] |
| 30-IX-1938 y 1-X-1938 | 67-68 | Negrín (11.312); Irujo; Trabal habla «en este histórico salón, del antiguo monasterio de San Cugat del Vallés» | **Sant Cugat, verificado** (v3 121412) |
| 1-II-1939 | 69 | Abre «a las veintidós horas treinta minutos». Martínez Barrio: «en circunstancias difíciles celebra su reunión constitucional el Parlamento de la República. Lo hacemos en un trozo de la tierra catalana…». Negrín, 5.291 palabras | Figueres: nombrado en la nota del volumen (v3). El discurso de Martínez Barrio **solo está en la v3**, dentro de la fila SUMARIO, que el filtro «Solo lo que se habla» oculta |

[EXP] añade que en Figueres se reunieron de noche, en los sótanos del castillo, por los bombardeos (Fundación Juan Negrín [I]). Para la fecha de Sant Cugat, la literatura dice 1-X-1938 y el corpus la reparte entre el 30-IX y el 1-X; hay que comprobarlo en el PDF.

### 3.7 El exilio: México, 1945

**Corpus:** 5 sesiones, cuadernillos de B. Costa-Amic [v3, sumario del 10-I-1945; SIDECAR].

| Fecha | Sesión | Verificado en el corpus |
|---|---|---|
| 10-I-1945 | 70 | «Extracto oficial de la sesión celebrada en la Ciudad de México». Preside Diego Martínez Barrio. Adhesión de los magistrados del Tribunal Supremo de la República; relación de acuerdos de la Diputación Permanente «de 2 de febrero de 1939 a 9 de enero de 1945»; lista de diputados fallecidos desde julio de 1936; discursos de Cordero Bel, Santaló, Gomariz, Galarza, Ruiz Funes y De los Ríos [v3, sumario] |
| 17-VIII-1945 | 71 | Preside Fernández Clérigo. La Secretaría de Relaciones Exteriores de México autoriza la sesión y otorga inmunidades. Carta del general Lázaro Cárdenas. «Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española … ¿Prometéis solemnemente fidelidad a la República y a la Constitución? … Sí, prometo.» [V2 107371 y 107372; v3, sumario] |
| 7-XI-1945 | 72 | Preside Jiménez de Asúa. Giral presenta el programa del Gobierno (7.446 palabras) [V2 107375]. Confianza al Gobierno «por aclamación»; saludo a la Asamblea Constituyente de Francia; gratitud a Cuba, Bolivia, Uruguay, Perú y Costa Rica; reconocimiento a México, Panamá y Guatemala, «cuyos Gobiernos han reconocido al Gobierno republicano español» [v3, sumario] |
| 8-XI-1945 y 9-XI-1945 | 73-74 | Prieto (5.622 palabras en la V2, 107446; en la v3, dividido en 121586 y 121588), Galarza y Fernández Clérigo; Jáuregui, Gordón Ordás y Suárez Picallo el 9-XI |

**Matices:**
- [EXP] dice «elección de Martínez Barrio como presidente de la República» el 17-VIII. **El Diario dice «promesa … como Presidente interino»**, y así debe escribirse.
- Que Negrín dimitiera el 17-VIII-1945 y Martínez Barrio encargara el Gobierno a Giral el 21-VIII, y que la Diputación Permanente pidiera el cese a Negrín el 27-VI-1939, es [SIDECAR `reglas.hueco_1945`] + [EXT].
- La asistencia de 142 o 135 diputados en noviembre depende de la fuente [EXP] + [EXT].

### 3.8 Cifras por legislatura para la página histórica

| | 1931-1933 | 1933-1935 | 1936-1939 |
|---|---:|---:|---:|
| Sesiones [V2] | 405 | 276 | 74 (60 + 9 de guerra + 5 de exilio) |
| Filas [V2] | 61.355 | 40.342 | 5.854 |
| Palabras [V2] | 12.966.290 | 9.476.120 | 1.893.486 |
| Diputados que hablan [V2] | 417 | 390 | 253 |
| Filas v3 (de habla) | 68.943 (61.750) | 45.930 (40.653) | 6.827 (5.888) |
| Páginas PDF [SIDECAR] | 15.272 | 11.177 | 2.331 |
| Diputados del censo [AF] | 475 | 470 | 501 |
| Medidas cofirmadas [AF] | 674 | 767 | 89 |

La tabla de cobertura del README depositado es la de la V1 y no cuadra con esto: dice 61.446, 40.251 y 5.854 filas, 754 sesiones y 428 diputados en 1931-33. Además, sitúa sesiones «en el exilio» en «Valencia, Barcelona, Mexico City»; Valencia y Barcelona no eran exilio. Dice «exile sessions, 1937-1945», cuando son de 1945. Y llama a las de 1945 reuniones «of the Republican government in exile», cuando son de las Cortes. Hay que corregirlo en el sitio y avisar al autor.

---

## 4. Escenas de la presentación reutilizables (corpus y Afinidades) y figuras nuevas

### 4.1 Escenas existentes

| Escena | Fichero | Datos | Estado | Qué hacer para el sitio |
|---|---|---|---|---|
| `hemiciclo` (portada) | `lyt_src/scenes/hemiciclo.js`; estático en `landing/hero_svg.py` → `hero_hemiciclo.svg` | `figs/data/hemiciclo_1936.json` (227 escaños; fuentes: plano del Congreso y Gil Robles, *No fue posible la paz*, p. 524); generadores en `lyt_src/hemiciclo/` | **Se conserva** (el investigador la considera «perfecta») | Interacción posible: pasar el cursor por un sector muestra la minoría. Aviso fijo: «los recuentos por color son escaños del plano, no diputados» |
| `censo` | `lyt_src/scenes/censo.js` | `figs/afinidades/data/afin_red_*.json` (nodos sin `fc`), `afin_roles.json › trayectorias` (80) | Datos reales de Afinidades | Página de diputados: 1.446 fichas, 1.026 personas, los 80 de las tres legislaturas. Contadores de la escena: 40 partidos, 52 distritos y 15 familias **del censo de Afinidades**. El explorador tiene 40 partidos y **55 distritos** (v3). Hay que decir de qué base es cada cifra |
| `tabla` | `lyt_src/scenes/tabla.js` | Ahora, `data.fragmentos` del **prototipo** | **Rehacer** | Filas reales del CSV V2: sesión 48, 1-X-1931, órdenes 21 a 26 (Kent 5419, Campoamor 5422, Presidencia 5423, Campoamor 5424) y la votación 5453. Pie: «fila N de 107.551» (no «107.000») |
| `tomo` (no está en la página actual) | `lyt_src/scenes/tomo.js` | Reparto ideológico de los 324 oradores del **prototipo** | **Rehacer** si se quiere la transición del tomo a la matriz | Colorear las 107.551 filas con `ideology` del CSV V2 (o las 121.700 de la v3, diciéndolo) |
| `red` | `lyt_src/scenes/red.js` (canvas + SVG) | `afin_red_{leg}.json`, `afin_resumen.json` | Datos reales | Página de Afinidades. **Cambiar el rótulo** «cruza el eje izquierda-derecha» por «cruza de bloque (izquierda, centro, derecha)» o calcular las dos métricas (§6.3). El sitio permite lo que la presentación no: elegir la legislatura, buscar a un diputado y ver sus coautores |
| `cruce` | `lyt_src/scenes/cruce.js` | `afin_resumen.json` | Datos reales | Mismo cambio de rótulo. Añadir la serie izquierda-derecha estricta (7,1 / 2,5 / 5,8 %) |
| `roles` | `lyt_src/scenes/roles.js` | `afin_roles.json` | Datos reales, **lectura errónea** | Quitar la lectura «los que tienden puentes caen» (§6.3). Si se conserva, que muestre roles sobre diputados activos. La cifra 1936-39 es 63 + 29 = **92**, no 93 (el contrato decía 64) |
| `puentes` | `lyt_src/scenes/puentes.js` | `afin_top.json`, `afin_red_*.json` | Datos reales | Nombres verificados (§6.2). Aviso: en 1936-39, los «dos de la derecha» son Aguirre e Irujo, del **PNV, codificado CD** |
| `derivacion` | `lyt_src/scenes/derivacion.js` | `afin_resumen` + `resumen` del **prototipo** | **Rehacer** | Quitar el nodo «Debate constitucional de 1931». Corregir «107.000 intervenciones» (107.551), **«34 millones de palabras» (sin respaldo: 24,3 M en la V2 separando por espacios; 25,4 M en la v3)** y «Versión 1.1» (la vigente es la V2.0). Tercer nodo posible: la v3 del explorador, «sin depositar» |
| `alianzas` (no está en la página) | `lyt_src/scenes/alianzas.js` | `figs/data/eda_analysis.json › alianzas` (derivado de Afinidades: 30.345, 27.172 y 5.990 díadas-medida) | Plausible, sin comprobar | Para Afinidades: pares de partidos que más firman (PRR-PRRS en 1931-33; Agrarios-CEDA y CEDA-PRR en 1933-36; AR-PSOE, AR-UR y PCE-PSOE en 1936-39). **Recalcular** desde el edgelist y el censo antes de usarlo |
| Gráficos de la landing | `landing/graficos.py` (`g_anios`, `g_ideo`, `g_firmas`) | `landing/agregados_corpus.json` (v3, habla, sin Presidencia), `afin_resumen` | SVG estáticos | Pasarlos a interactivos (año → sesiones y palabras; legislatura → ideología; Afinidades con selector) |

**No se trasladan** (prototipo): `codigo`, `sesiones` (las 90 sesiones de 1931), `oradores` (324), `conceptos`, `matriz`, `citas`, `ego` y `temas` (43 grupos, `eda_analysis.json › temas`).

### 4.2 Figuras interactivas nuevas con datos ya verificados o disponibles

1. **Las 755 sesiones, una a una.** Tira temporal con cada sesión como marca: altura según palabras u oradores distintos, color según el índice de reacción.
   - Datos: `scratchpad/sitio/relato/sesiones_v2_resumen.csv` [V2] y `2REP_Explorer/docs/sesiones_indice_reaccion.csv` (IRP, percentil, categoría y asunto; **calculado sobre la V2**, comprobado: W = 5.156 palabras el 14-VII-1931, como en la V2).
   - Las 56 sesiones seleccionadas por el proyecto (2 núcleo, 19 externas, 35 internas) se encienden como «puertas».
   - Sustituye a la escena `sesiones` del prototipo con el corpus entero.
2. **Votaciones nominales.** El 161-121, el 178-59, el 368, el 318-19 y el 314-24, con la lista de nombres del propio Diario (filas COMENTARIOS de la v3; en la V2 van dentro de filas de la Presidencia, lo que ya es un aviso sobre la V2). Hay que resolver los apellidos contra el censo, un trabajo acotado de cinco votaciones.
3. **Lo que el Diario calla.** Nueve «no constarán en el Diario», el hueco de Galarza, la bofetada que no consta y la frase que no está. Es una figura pequeña, textual y muy potente para la página del Diario.
4. **Luz y taquígrafos, diez veces.** La línea de tiempo de §3.2.
5. **Palabras por año y reparto ideológico** (ya calculados; ver 4.1).
6. **Clima de sala.** Acotaciones por clase (aplauso, conflicto, orden, neutral) por legislatura y por año [v3, `datos_explorador.json › reacciones`]. En 1931-33, el 17,96 % de las intervenciones de habla lleva alguna acotación; en 1933-35, el 17,97 %; en 1936-39, el 21,84 %.
7. **Cronología de Gobiernos y Presidencias** [SIDECAR `sessions.json`]: 22 Gobiernos y 9 presidencias de sesión, con el número de sesiones de cada uno. **Condiciones:** decir que son metadatos del proyecto que el explorador publicado aún no muestra. Hay 14 sesiones con paginación sin verificar, y el Gobierno Negrín en el exilio lleva «legitimidad discutida».
8. **Quién habla según la versión.** Besteiro y Alba en cabeza en la V2 frente a Royo, Prieto y Azaña en la v3 (§2.4). Es una figura de la página de límites o de versiones.

---

## 5. Puertas de lectura: fichas verificadas

Formato: fecha · qué pasó · ids · qué está verificado · qué falta · cómo abrirla en el explorador. Las citas son del corpus (dominio público) y conservan las erratas del OCR.

**P1. 14-VII-1931 · La Cámara se constituye.** Mesa de edad (Vázquez Lemus) y discurso de Alcalá-Zamora [V2 1-2 / v3 2-3]. En la biblioteca L2-B17, «La Cámara se constituye», está también Ortega, en la proposición de confianza: «ni el payaso, ni el tenor, ni el jabalí» (según la biblioteca; **cita sin comprobar**).

**P2. 1-X-1931 · El voto de las mujeres.**
- Kent (V2 5419 / v3 6074; 1.053 palabras) contra Campoamor (V2 5422 y 5424 / v3 6079; 1.460 palabras). La Presidencia pide silencio en siete palabras (V2 5423 / v3 6078).
- Art. 34 del proyecto: **161 a 121**, nominal (V2 5453 / v3 6110).
- La sesión tiene 395 filas y 48 oradores distintos en la V2 (415 filas en la v3) y está en el percentil 88,4 del índice de reacción [EXP].
- Búsqueda probada: `"voto femenino" | "voto de la mujer"` da 40 intervenciones de habla en 15 sesiones, 6 de Campoamor [v3, reproducido].
- Biblioteca: L2-B2 (770).
- Pendiente [EXT]: el primer voto femenino en 1933 y la equivalencia art. 34 → 36.

**P3. 13-14-X-1931 · «España ha dejado de ser católica».**
- Azaña, entonces ministro de la Guerra (V2 6748 / v3 7531; 6.009 palabras). Cita: «España ha dejado de ser católica: el problema político consiguiente es organizar el Estado en forma tal que puede [sic, por "quede"] adecuado a esta fase nueva e histórica del pueblo español.»
- La sesión dura toda la noche y se levanta a las 7.35 del 14. «Artículo 24» del proyecto: **178 a 59**.
- Es la sesión con más unidades de conflicto del corpus (163), la de más «discursos incendiarios» (13) y la tercera en oradores distintos (52) [v3; EXP; V2].
- La frase la devuelven después otros cinco diputados: Balbontín, Aizpún y Royo Villanova, este tres veces, la última el 20-XI-1934 [v3, 6 filas].
- Resuelve el pendiente de la memoria: la sesión 55 es, en efecto, el pleno de la cuestión religiosa.

**P4. 9-XII-1931 · 368 votos.** La Constitución queda aprobada con 368 votos, todos a favor, de 466 diputados que habían prometido (V2 13531 / v3 15043). Es una sesión serena: percentil 17 de reacción [EXP]. Contrasta con P3.

**P5. 13-V-1932 · «Conllevar».** Ortega (V2 25527 / v3 28500; 8.579 palabras). Campalans le responde en la misma sesión: «en la vida resolver es conllevar» (v3 28502).

**P6. 27-V-1932 · El discurso más largo, a nombre de otro.** Azaña sobre el Estatuto: en la V2, 17.152 palabras a nombre del Presidente de las Cortes (V2 25979); en la v3, 17.142 a nombre de Azaña (v3 29042), más la réplica a Royo Villanova (4.707). Resuelve las «tres horas» que dan las fuentes [EXP]. **Es la mejor puerta para explicar la diferencia entre la V2 y la v3.**

**P7. 9-IX-1932 · Dos votaciones el mismo día.** Reforma agraria, 318 a 19; Estatuto de Cataluña, 314 a 24; los vivas de Companys, Aragay y Tapia (v3 41627-41630 / V2 37177-37179). **Corrige a [EXP]** (§7).

**P8. 2-II-1933 · Casas Viejas.** «En Casas Viejas no ha ocurrido sino lo que tenía que ocurrir. (Fuertes rumores y protestas en los bancos de las minorías; contraprotestas en la mayoría.)» (V2 44922 / v3 50255). La tendencia de la expresión «casas viejas» tiene 102 filas en febrero y 108 en marzo de 1933. «Tiros a la barriga» no aparece en 1933. Biblioteca L2-B7 (943).

**P9. 3-VIII-1933 y 8-VI-1934 · «Luz y taquígrafos».** Royo Villanova, «como decía Maura» (V2 57506), y el grito contra la sesión secreta (V2 71330). Ver §3.2.

**P10. 4-VII-1934 · La pistola de Prieto.** Prieto lo admite en el Diario (V2 74619 / v3 84039); Oriol de la Puerta le contesta (v3 84041). Percentil 96,4 [EXP].

**P11. 20-III-1935 · Azaña acusado.** 14.131 palabras (V2 85330 / v3 96282); réplicas de Gil Robles y José Antonio Primo de Rivera el 21-III [EXP]. Biblioteca L2-B10.

**P12. 7-IV-1936 · Destitución de Alcalá-Zamora.** Prieto (V2 102323 / v3 115638); en el mismo debate, Ventosa, Calvo Sotelo, Portela, Gil Robles y Maura [EXP]. El art. 81 y su lectura como «pretexto» son [EXP] + [EXT].

**P13. 15-IV-1936 · La sesión más crispada.** IRP en el percentil 100 [V2, índice]. Las botas de Ibárruri y «En la horca» (V2 102493 y 102481). Es la puerta de «Anécdotas y amenazas» (L4, 54 entradas).

**P14. 16-VI-1936 y 1-VII-1936 · La antesala.**
- 16-VI: Calvo Sotelo, «la vida podéis quitarme…» (V2 105356). Casares, Ibárruri y Gil Robles.
- 1-VII: la sesión más larga del corpus (97.055 palabras) y las palabras de Galarza «no se consignan».
- Son el «núcleo» de las 56 sesiones: las dos únicas importantes a la vez para la literatura y por la reacción de la Cámara [EXP].
- La frase atribuida a Ibárruri **no está** en el Diario.

**P15. 1-II-1939 · Figueres.** Sesión nocturna (22.30); Negrín (V2 107326 / v3 121447) y el discurso de Martínez Barrio, este solo en la v3 (§3.6). Percentil 0,6 de reacción: importante y serena [EXP].

**P16. 17-VIII-1945 y 7-9-XI-1945 · México.** «Sí, prometo» (V2 107372); Giral (V2 107375); confianza por aclamación; los países que reconocen al Gobierno republicano (§3.7). Con la legislatura 1936-1939 y orden por fecha, el explorador llega a estas cinco sesiones [landing, comprobado entonces].

Las 31 bibliotecas del explorador sirven de índice temático para las puertas: el nombre y el número de cada una están en `datos_explorador.json › bibliotecas_del_proyecto`. En particular: L1 (discursos principales, 29), L2-B1 a L2-B26 (debates), L3-núcleo (309), L3-externo (2.164), L3-interno (5.585) y L4 (54).

---

## 6. Afinidades Elegidas

### 6.1 Qué es (verificado en Dataverse y en la metodología)

Es un subproducto autónomo, con DOI 10.7910/DVN/CGOCUS, CC BY 4.0 y publicación del 6-V-2026 (ficha en `scratchpad/cgocus.json`). La presentación la cita como «Versión 1.1»; la metodología dice «Versión 1.0 (abril 2026)». **Hay que confirmar el número de versión en Dataverse.**

Las medidas son «proposiciones de ley, enmiendas, ruegos colectivos, interpelaciones y otros documentos parlamentarios firmados» por dos o más diputados, extraídos de los Diarios (`METHODOLOGY.md` §1.2). Una arista une a dos diputados que firman juntos, y su peso es el número de medidas cofirmadas.

El nombre viene de la *afinidad electiva* de Goethe y Weber. «Elegidas», y no «Electivas», «subraya la agencia del firmante» y activa una segunda lectura, «las afinidades de los electos» (`METHODOLOGY.md`, «Sobre el nombre»). **Es material narrativo excelente para la cabecera de su página.**

Tres legislaturas: 1931-1933, 1933-1936 («bienio radical-cedista» en la metodología) y 1936-1939 («Frente Popular»).

La pregunta que plantea la landing: «Hablar en contra es público y barato; firmar una medida con otro exige un acuerdo previo, casi siempre fuera del acta.»

### 6.2 Cifras [AF], recalculadas sobre `figs/afinidades/`

| | 1931-33 | 1933-36 | 1936-39 |
|---|---:|---:|---:|
| Diputados en el censo | 475 | 470 | 501 |
| Firman (activos) | 454 | 446 | 316 |
| Aislados (grado 0) | 22 (14 izq., 5 der., 3 centro) | 30 (12 / 9 / 9) | **186 (86 izq., 84 der., 16 centro)** |
| Medidas | 674 | 767 | 89 |
| Firmantes por medida (media; máx.) | 8,57; 40 | 7,80; 41 | 9,42; 39 |
| Díadas distintas | 16.144 | 14.678 | 5.061 |
| Filas par × medida (peso) | 30.345 | 27.172 | 5.990 |
| Peso que cruza **de bloque** (izq./centro/der.) | 35,1 % | 23,0 % | 7,4 % |
| Peso que cruza **izquierda ↔ derecha** estricto | **7,1 %** | **2,5 %** | **5,8 %** |
| Medidas que cruzan de bloque | 64,8 % (437) | 42,2 % (324) | 24,7 % (22) |
| Medidas solo de derecha / solo de izquierda | 68 / 130 | 310 / 73 | **37 / 29** |
| Modularidad por partidos | 0,377 | 0,335 | 0,503 |
| Densidad; grado medio | 0,157; 71,1 | 0,148; 65,8 | 0,102; 32,0 |

**Diputados más transversales (los 8 primeros, por índice de transversalidad):**
- **1931-33:** Melquíades Álvarez (LD, C, 0,93), Estelrich (Lliga, CD, 0,93), Unamuno (ASR, C, 0,92), Abadal (Lliga, CD, 0,91), Santiago Alba (CD, 0,91), Palacín (ERC, I), Lladó (RI, C) y Alcalá-Zamora (DLR, CD).
- **1933-36:** Chapaprieta (RI, CD), Cano López (PRC, CD), Iranzo, Villalobos (LD), Muñoz Martínez (PRSI), Suárez Uriarte, O'Shea (D) y Matesanz (D).
- **1936-39:** Suárez Picallo (PG, CI, 0,90), Aguirre (PNV, CD, 0,88), Daniel Ortega (PCE, EI, 0,88), Pestaña (P. Sindicalista, EI, 0,87), Irujo (PNV, CD, 0,87), Comas (USC), Portela (Centro) y Rodríguez Figueroa (AR).
- De esos ocho, los codificados en la derecha (CD, D o ED) son **4, 4 y 2**, como decía la presentación. Pero los 2 de 1936 son del **PNV**, que el CSV codifica CD.

Otros datos: 80 diputados están en las tres legislaturas; en influencia, Victoria Kent (AR) encabeza 1936-39 con 0,99. Las filas del edgelist son 63.507 en local; Dataverse y la metodología dicen 63.508 (diferencia de uno, sin explicar). La metodología llama «aristas» a esos 63.508, pero son **filas par × medida**, no pares distintos. Los 94.621 «registros de coautoría» (una firma de un diputado en una medida) están en la ficha de Dataverse y no los he recontado.

### 6.3 Tres correcciones al relato de Afinidades

1. **«Cruza el eje izquierda-derecha» no es lo que mide el 35/23/7 %.** `pipeline_afinidades.py` define `BLOQUE = {EI, I, CI → izq; C → cen; CD, D, ED → der}` y cuenta como cruce **cualquier** par de bloques distintos, centro incluido. El cruce estricto entre izquierda y derecha es 7,1, 2,5 y 5,8 %: en 1936-39 es **mayor** que en 1933-36. Casi todo el cruce de 1936 es izquierda con PNV (CD). Opciones: (a) decir «cruza de bloque (izquierda, centro, derecha)» o (b) mostrar las dos series y explicar que en la Constituyente el centro cosía la Cámara y en la guerra desaparece. La (b) es mejor relato, y es verdad.
2. **Roles: el descenso de «articuladores y líderes» es un artefacto de construcción.** Los roles se asignan por percentiles dentro de cada legislatura (P25 de grado, P75 de influencia, P60 de transversalidad; `METHODOLOGY.md` §8). Entre los diputados que firman, articuladores y líderes suman un 29,8, un 30,2 y un 29,2 %. El paso del 28 al 19 % de la Cámara solo refleja los 186 aislados en el denominador. El único rol que no es percentil es «aislado» (grado 0): ese sí es un hallazgo. «La red pierde a quienes la mantenían unida» no debe volver.
3. **«De la derecha» en 1936 son Aguirre e Irujo (PNV, CD)**, del lado republicano en la guerra. La frase «la República tuvo puentes en las dos orillas mientras tuvo una Cámara entera» necesita ese matiz o hay que reformularla. Además, el README depositado pone a la Lliga en D, pero el CSV la codifica **CD** en las tres legislaturas [V2]. Es una incoherencia de documentación que conviene señalar al autor.

Otras cautelas que ya estaban en el material y deben mantenerse:
- 1936-39 no es una tercera foto comparable: son cuatro meses de Cámara y después la guerra.
- La modularidad baja en 1933 aunque se cruce menos, porque esa Cámara mezcla familias.
- Afinidades mide coautoría, no voto.

### 6.4 Qué merece página propia

**Una página de Afinidades con cuatro movimientos:**
1. Por qué firmar no es hablar, con la cita de la landing y el origen del nombre.
2. Tres redes, con la escena `red`: selector de legislatura, búsqueda de diputado y el cruce de bloque y el estricto como capas.
3. Dos cifras que no dependen de percentiles: aislados (22 → 30 → 186) y medidas de un solo bloque (37 y 29 de 89).
4. Personas: los puentes por legislatura, con nombres, y las trayectorias de los 80 (`afin_roles.json › trayectorias`: rol en cada legislatura).

Enlace a la aplicación (`rodrodr.github.io/afinidades`) y al DOI. Método en una subpágina: las métricas (grado, fuerza, Guimerà-Amaral, E-I, Blau), los roles, con el aviso del punto 2, y la proximidad observada/esperada entre familias (`afin_prox_familia.json`).

---

## 7. Discrepancias y correcciones detectadas

| # | Dónde | Qué dice | Qué es | Comprobación |
|---|---|---|---|---|
| 1 | Presentación y landing (Afinidades) | «cruza el eje izquierda-derecha» 35/23/7 % | Cruce entre tres bloques; el estricto es 7,1/2,5/5,8 % | [AF] edgelist |
| 2 | Presentación, `roles` | Articuladores y líderes «un tercio menos»; «del 28 % al 19 %» | Artefacto por percentiles; en torno al 30 % de los activos en las tres | [AF] |
| 3 | Presentación, `roles` y contrato | 64 articuladores y 93 en 1936-39 | 63 y 92 | `afin_roles.json` |
| 4 | `discursos_y_debates_2REP.md`, B5 y §4.4 | Estatuto 318-19 | 318-19 es la Reforma agraria; el Estatuto, 314-24 | [V2 37177-37178] |
| 5 | `discursos_y_debates_2REP.md`, B16 y D17 | «elección de Martínez Barrio como presidente de la República» (17-VIII-1945) | «Promesa … como Presidente interino» | [V2 107371-107372] |
| 6 | Presentación, `derivacion`, y guion original | 34 millones de palabras; 107.000 intervenciones; V1.1 | Sin respaldo; 107.551; V2.0 | Memoria + CSV |
| 7 | Presentación, `tabla` | «Filas reales» | Fragmentos del prototipo | `tabla.js` |
| 8 | README depositado | Tabla de cobertura, «exile sessions 1937-1945», «Valencia, Barcelona» como exilio, «government in exile», Lliga = D | Tabla de la V1; exilio solo en 1945; son Cortes; Lliga = CD en el CSV | README + CSV |
| 9 | Afinidades frente al corpus | «1933-1936» frente a «1933-1935» | Rótulos distintos para la misma legislatura | — |
| 10 | Censo de Afinidades frente al explorador | 52 distritos frente a 55 | Bases distintas | `censo.js` y `datos_explorador.json` |
| 11 | Volumen de extractos de guerra (fuente) | «De [Figueres] no existe dato alguno» | El corpus tiene su extracto | v3 SUMARIO del 1-X-1936 y 121446 |
| 12 | Afinidades | 63.508 aristas | 63.507 filas par × medida en local; los pares distintos suman 35.883 | [AF] |
| 13 | V2 frente a v3 | Ranking de oradores por palabras | Cambia por completo (Besteiro y Alba frente a Royo, Prieto y Azaña) | CSV |

---

## 8. Pendientes para el autor o que exigen fuente externa

1. El origen de «luz y taquígrafos» (¿Antonio Maura?) [EXT].
2. Montserrat como lugar de la sesión del 1-II-1938 (no está en el texto) y la fecha de Sant Cugat [EXT/PDF].
3. La nota del volumen de guerra sobre Figueres y la línea «Rohan localizada y Febrero 1939» (mirar el PDF).
4. El incidente del «viva» en marzo de 1936: qué sesión y qué presidente (fila SUMARIO de la v3; conviene leer el acta).
5. Las equivalencias de numeración (art. 24 del proyecto → 26; art. 34 → 36) y las consecuencias políticas (dimisiones de octubre de 1931, destitución por el art. 81) [EXT].
6. La versión de Afinidades en Dataverse (1.0 o 1.1) y la diferencia de una arista (63.507 frente a 63.508).
7. Qué hacer con los 14 turnos largos de la Presidencia pendientes de revisión en la V2 [EXP §1.1]. Afectan a cualquier recuento por orador sobre el depósito.
8. Las valoraciones retóricas «pendientes de su revisión» de [EXP] (once fichas). No deben aparecer en el sitio como juicio del proyecto.
9. Si el sitio usa metadatos del sidecar (Gobierno, Presidencia, páginas), debe decir que el explorador publicado aún no los muestra.
10. Los hechos que en [EXP] tienen solo respaldo divulgativo (B4 Alfonso XIII, B8 contratos de cultivo, B9 octubre de 1934, la sesión del 16-VI-1936 como tal) deben ir sin juicio historiográfico o con fuente académica.

---

## 9. Mapa de páginas sugerido (análogo al de ParlaIbero)

ParlaIbero (`/Users/rodrodr/Dropbox/Apps/parlaibero_site/src/pages/[lang]/`) separa `index`, `explorador`, `metodologia`, `usar`, `instituciones` y una ficha por país en `paises/[iso]`. Su Inicio es un arco de preguntas: unas contestadas con un hecho medido, otras que el lector contesta con las manos y otras que se le entregan. La traducción a Luz y Taquígrafos sería:

| Página LyT | Análogo en ParlaIbero | Contenido principal (secciones de este informe) |
|---|---|---|
| Inicio | `index` | Hemiciclo, la pregunta, las cuatro preguntas sobre el corpus entero (§2.4), tres puertas destacadas y la llamada al explorador |
| La Cámara, 1931-1945 (o una por legislatura) | — (nueva) | §3.3 a §3.8, con la tira de 755 sesiones (§4.2.1) y las votaciones (§4.2.2) |
| El Diario de Sesiones | — (nueva) | §3.1 y §3.2: qué recoge, qué calla, las cuatro series, la fórmula |
| Sesiones / puertas | `paises/[iso]` → `sesiones/[fecha]` | Las 16 fichas de §5, cada una con enlace al explorador y a su biblioteca |
| Diputados | — | Censo y trayectorias [AF]; quién habla según la versión (§4.2.8) |
| El corpus y el método | `metodologia` | Contenido de la landing (fila, nueve pasos, V2 frente a v3) sin resumir, más §7 |
| Explorador | `explorador` | Recorrido del 1-X-1931 y funciones (landing, `piezas.recorrido` y `piezas.funciones`), con lo que no hace |
| Afinidades Elegidas | — | §6 |
| Límites | parte de `metodologia` | `piezas.limites` de la landing y los silencios del Diario |
| Datos y cita | `usar` | DOI, versiones, código de lectura y «la siguiente derivada es suya» |
