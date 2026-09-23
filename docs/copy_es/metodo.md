# Copy ES · Método (`/[lang]/metodo/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Método», «Usar los datos» y
> «Versiones». Sigue la narrativa §12 (diez preguntas de revisor) y la plantilla G del plan. Cubre, sin resumir, los
> diez temas del encargo: la fuente, la lectura óptica con sus recuentos, la limpieza y los turnos (apartado 02), el
> reconocimiento óptico (03), la vinculación en cascada y la revisión manual (04), habla y no habla (05), la
> resegmentación v3 (06), la auditoría de fechas de la V2 (07), los atributos (08) y lo que no afirma el corpus (09).
> Marcadores: `docs/marcadores/metodo.md`. Salida de las comprobaciones: `docs/marcadores/comprobaciones_metodo_datos.txt`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `{{marcador}}`. Las líneas de código son literales (como en ParlaIbero, `<code>` y `<pre>` quedan
> fuera de la auditoría de cifras). Los textos con varios párrafos o listas se pintan con `tBloques`; los que llevan
> [corchetes] de enlace, con `tEnlaces`, y por eso ninguna clave con enlace lleva código con corchetes.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (recalculado hoy sobre las fuentes):
> 1. **«649 primeros apellidos compartidos entre 773 diputados»** (04) sale del .docx no depositado y no se reproduce:
>    los 773 diputados que intervienen tienen 538 primeros apellidos distintos. Lo sustituye una cifra comprobada: 317
>    de los 773 comparten su primer apellido con otro diputado que interviene.
> 2. **«En 584 de las 755 sesiones presidió un vicepresidente»** (04): 584 son **fechas**. Por sesión (fecha y número),
>    son 586, con 10.025 filas, según el mismo analizador de etiquetas del explorador.
> 3. **«Las 147 restantes son ministros sin escaño»** (04) es la frase del README. Leídas una a una, 123 llevan la
>    fórmula de un ministerio; las demás son de secretarios, de la Presidencia sin nombre y fórmulas dañadas. Se dice así.
> 4. **«Unos 21.000 de un documento leído»** (06): la fila 55221 son 3.733 palabras de Prieto y 21.638 de tablas y
>    «documentos complementarios del discurso» que el Diario imprime con él. No se leyeron en voz alta.
> 5. **«Unos 730 turnos rescatados»** (06): la v3 servida (sha256 `3a0d8b2d…`) tiene exactamente 735 filas de esa clase
>    (108.291 de habla − 107.556 piezas de la V2). Se usa la cifra comprobada, la misma que declara Versiones (D-25).
> 6. **La reserva LightOnOCR** no se nombra: estaba configurada, pero las 29 páginas recuperadas al reintentar las
>    recuperó GLM-OCR y las 124 restantes fueron a Tesseract. El README no nombra LLaVA (lo nombra el .docx no
>    depositado); lo que el README dice y el código no hace es la «instrucción estructurada» al modelo y Jaro-Winkler.
> 7. **Casi siempre la Presidencia** (05, 06): los bloques que la v3 separa venían de una fila de la Presidencia en el
>    67 % de los casos, y los turnos rescatados en el 66 %. El copy dice «la mayoría», con el porcentaje en marcador.
>
> **Fase 2 (corrector del copy, 22-09-2026; REVISION_FASE1 y anexo adversarial del plan):**
> - la cola de la sesión 48 usa las claves de Sesiones, `ses.s48.cola*`, con su orden en pantalla (411–415, plan R20):
>   la familia `sesion.<clave>.cola*` no existe en el exportador (P1-3);
> - números tecleados (P2-9): «la sesión 77», «la sesión 321»; «E1 Sr.» y «escriba 77» van a la lista blanca de
>   `docs/marcadores/metodo.md`, que escribe `comprobar_metodo_datos.py`;
> - la sesión 321 (H13): la V1 la fechaba el 14 de julio de 1931 porque tomó la fecha de la portada del Tomo XX
>   (`erratas_fechas_V1.csv`, `AUDITORIA_FECHAS.md`); se dice así, no «la fecha de otra»;
> - la fila (01, H21): lo que el Diario imprime entre dos fórmulas de orador **que el etiquetado reconoce**;
> - «Sobre este corpus», en el panel lateral del explorador (P2-11);
> - [Ver qué trae cada columna] en F20: el rótulo único de ese destino (P2-12).

---

## Metadatos

<!-- metodo.meta.titulo -->
Método

<!-- metodo.meta.descripcion -->
Cómo se pasó del Diario impreso a {{filas.V2}} filas, qué falló, qué es habla y qué no, y qué no afirma la base. Cada apartado se puede comprobar.

> [nota de diseño] Índice lateral con los diez apartados (`metodo.indice.*`) y banda fija (`BandaCTA`): [Descargar los
> datos] con ↺ 3 y [Abrir el explorador ↗] con «Sirve la edición v3, sin depositar; pide un ordenador» (textos de
> `comun.md`). La página lleva `<NotaBases>` (↺ 13): los apartados 03, 05 y 06 citan cifras de la v3. Gramática de
> cada apartado (plan, «Cómo se evita el amontonamiento»): antetítulo en mono con su número (`NN`, lo da
> `apartados('metodo.')` a partir de las claves; no es copy) · H2 (`.titulo`) · entrada en
> serif grande (`.entrada`) · texto (`.texto`) · figura · salvedad al margen (`.salvedad`, ≤ 40 palabras) · Pruébelo
> doble (`.pruebelo.*`).

## Índice lateral

<!-- metodo.indice.titulo -->
En esta página

<!-- metodo.indice.01 -->
Qué es una fila

<!-- metodo.indice.02 -->
Del Diario a la fila

<!-- metodo.indice.03 -->
El reconocimiento óptico

<!-- metodo.indice.04 -->
Quién habla

<!-- metodo.indice.05 -->
Habla y no habla

<!-- metodo.indice.06 -->
Dos ediciones

<!-- metodo.indice.07 -->
Fechas corregidas

<!-- metodo.indice.08 -->
Partido, familia e ideología

<!-- metodo.indice.09 -->
Lo que no afirma

<!-- metodo.indice.10 -->
Documentación

## Cabecera

<!-- metodo.antetitulo -->
Método

<!-- metodo.titulo -->
¿Cómo se hizo, y dónde puede fallar?

<!-- metodo.entrada -->
Esta página no recorre el proceso etapa por etapa. Responde lo que preguntaría un revisor, y cada apartado acaba en algo que usted puede comprobar.

<!-- metodo.entrada.2 -->
Empieza por una fila concreta: la de Clara Campoamor el 1 de octubre de 1931, el día que se votó el sufragio de las mujeres.

<!-- metodo.pruebelo.rotulo -->
Pruébelo

<!-- metodo.pruebelo.rotulo.explorador -->
En el explorador

<!-- metodo.pruebelo.rotulo.codigo -->
En Python, sobre el CSV depositado

<!-- metodo.pruebelo.carga.texto -->
Cómo se carga el CSV depositado: las líneas de código lo suponen cargado como `d`

<!-- metodo.pruebelo.carga.codigo -->
```python
import pandas as pd
d = pd.read_csv("2REP_Diaries.csv", sep=";", dtype={"rep_id": "Int64"})
```

> [nota de diseño] `metodo.pruebelo.carga.*` va una sola vez, bajo la entrada, en un `<details>` rotulado «Cómo cargar
> el CSV». Cada Pruébelo tiene dos mitades: `.consulta` (literal que copia `CopiarConsulta`; si no hay consulta, la
> clave no existe y el componente solo pinta `.explorador`) con `.explorador` (instrucción, pintada con `tEnlaces`
> cuando lleva [Abrir el explorador ↗]) y `.codigo` (bloque de código, pintado con `tBloques`). La frase ↺ 5 la pone
> `CopiarConsulta`, una vez por página. Las consultas cuentan sobre la v3 y ninguna promete un recuento en pantalla.

---

## 01 · ¿Qué es una fila?

<!-- metodo.01.titulo -->
¿Qué es una fila?

<!-- metodo.01.entrada -->
Una fila es lo que el Diario imprime entre una fórmula de orador que el etiquetado reconoce y la siguiente.

<!-- metodo.01.texto -->
La fórmula es la que abre cada turno en el papel: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». Lo que va detrás, hasta la siguiente que el etiquetado reconoce, es el texto de una fila.

Las dos filas de la figura van seguidas en la sesión del 1 de octubre de 1931. En la primera, la Presidencia dice {{fila.presidencia.nwords|letra}} palabras: «Ruego a la Cámara que guarde silencio.»

En la segunda, Clara Campoamor dice {{fila.campoamor.nwords}}. Empieza así: «Yo ruego a la Cámara que me escuche en silencio». Contar filas no es contar discurso.

El texto no está resumido ni lematizado. El orden se conserva, y el orden es información: primero la Presidencia pide silencio, después Campoamor lo pide para sí.

Cada fila lleva {{columnas.V2|letra}} columnas. Dicen la sesión y el lugar de la fila en ella, la fórmula impresa y el texto. Si se identificó al orador, añaden su diputado, su partido y su distrito.

> [nota de diseño] Aquí va **F20** (`fig.F20.*`): V2 {{fila.presidencia.id.V2|id}} y {{fila.campoamor.id.V2|id}} frente a v3
> {{fila.presidencia.id.v3|id}} y {{fila.campoamor.id.v3|id}}. Al pie de la figura, `fig.F20.enlace` → `datos/#columnas`.

<!-- metodo.01.salvedad -->
Una fila puede llevar dentro más de un turno, o un documento que nadie leyó en voz alta. Lo explica «Dos ediciones», más abajo.

<!-- metodo.01.pruebelo.consulta -->
"me escuche en silencio"

<!-- metodo.01.pruebelo.explorador -->
Busque la frase entre comillas y abra el resultado. El lector la numera «Orden {{fila.campoamor.orden.pantalla|id}} de {{sesion.1931-10-01-48.filas_v3}}»: es la misma fila, contada en la edición del explorador. [Abrir el explorador ↗]

<!-- metodo.01.pruebelo.codigo -->
```python
d[d.id.isin([5423, 5424])].T
```

---

## 02 · ¿Cómo se pasa del Diario impreso a la fila?

<!-- metodo.02.titulo -->
¿Cómo se pasa del Diario impreso a la fila?

<!-- metodo.02.entrada -->
En cinco pasos, cada uno con su cifra. Ninguno corrige a mano el texto.

<!-- metodo.02.texto -->
**La fuente.** Son {{sesiones}} números del Diario de Sesiones del Congreso, escaneados en PDF desde su archivo histórico. Suman {{paginas.total}} páginas, según el recuento de los archivos del proyecto.

**La lectura.** Cada página se convirtió en imagen y la leyó un modelo de reconocimiento óptico, GLM-OCR. Lo que falló, y cómo se recuperó, se cuenta más abajo.

**La limpieza.** Un programa quitó de cada página la cabecera corrida, con su folio y su fecha, y el folio del pie. Después recompuso las palabras partidas por guion al final de línea.

También unió en párrafos las líneas cortas de las columnas del Diario. Ninguno de estos pasos corrige erratas de lectura.

**Los turnos.** Una expresión regular busca la fórmula impresa del orador: «El Sr.», «La Sra.», «La Srta.», «Los Sres.». También admite las variantes de lectura, como «Ei Sr.» o «E1 Sr.».

Cada fórmula debe llevar al menos una palabra de {{etiquetas.filtro.letras|letra}} letras en mayúsculas. Ese filtro descartó {{etiquetas.falsos_positivos}} falsos positivos.

Quedaron {{etiquetas.n}} etiquetas de orador. El CSV tiene {{filas.V2}} filas; la diferencia de {{etiquetas.diferencia|letra}} no está documentada.

**La vinculación.** Cada fórmula se unió a un diputado, con su partido, su distrito y su ideología. Se cuenta en «Quién habla» y en «Partido, familia e ideología».

> [nota de diseño] Aquí va **F19** (`fig.F19.*`), cinco pasos en esquema horizontal numerado (apilado en el móvil),
> cada uno con su `<details>`. «Cinco pasos» es la estructura de la figura, no una cifra del corpus.

<!-- metodo.02.salvedad -->
Las páginas y los fallos de lectura salen de los archivos de trabajo del proyecto, que no están depositados.

<!-- metodo.02.pruebelo.explorador -->
Abra cualquier intervención. Bajo el nombre del diputado, «Consta en el diario como» da la fórmula impresa que abrió la fila. [Abrir el explorador ↗]

<!-- metodo.02.pruebelo.codigo -->
```python
d.speaker.value_counts().head(10)   # las fórmulas impresas más frecuentes
```

---

## 03 · ¿Qué falló en el reconocimiento óptico?

<!-- metodo.03.titulo -->
¿Qué falló en el reconocimiento óptico?

<!-- metodo.03.entrada -->
Ninguna página se quedó sin texto, pero no todas salieron a la primera.

<!-- metodo.03.texto -->
Cada página la leyó GLM-OCR, un modelo de visión que el proyecto ejecutó en sus propios equipos. Mientras el modelo escribía, un vigilante comprobaba si entraba en bucle, repitiendo el mismo texto.

Si entraba, la página se repetía con más variación. Pasó en {{ocr.bucles.paginas}} páginas.

En la primera pasada fallaron {{ocr.fallidas.paginas}} páginas. Estaban repartidas en {{ocr.fallidas.sesiones}} sesiones.

GLM-OCR recuperó {{ocr.recuperadas}} al reintentarlas. Las {{ocr.tesseract.paginas}} restantes se leyeron con Tesseract, un programa de reconocimiento clásico, con sus modelos de español moderno y antiguo.

Esas páginas de Tesseract están en {{ocr.tesseract.sesiones}} sesiones. Ninguna pasó después por una corrección automática.

<!-- metodo.03.texto.2 -->
Las erratas de lectura están en el texto y también en las fórmulas de orador: «El Sr. PERSIDENTE:», «El Sr. VICFPRESIDENTE».

Los metadatos de sesión del proyecto declaran {{ocr.incidencias|letra}} incidencias. Las dos se ven en el corpus:

- La sesión 9, del 27 de julio de 1931, acaba en un bucle: repite «Sánchez Guerra, Ossorio y Gallardo» {{ocr.bucle9.repeticiones|letra}} veces, dentro de la fila {{fila.bucle9.id.V2|id}} de la V2.
- La sesión 48, del 1 de octubre de 1931, perdió el final. Sus {{ses.s48.cola|letra}} últimas filas repiten «Pido la palabra», y la última se corta en «El Sr. Ministro de».

Esas filas son las {{ses.s48.cola.V2.desde|id}}–{{ses.s48.cola.V2.hasta|id}} de la V2 y las {{ses.s48.cola.v3.desde|id}}–{{ses.s48.cola.v3.hasta|id}} de la v3. La resegmentación de la v3 no arregla ese final.

> [nota de diseño] Orden de la plantilla: `metodo.03.texto` · ↺ `comun.fija.ocr` (destacada) · `metodo.03.texto.2`
> · cita tipográfica con el texto literal de las cinco filas finales (de `citas.json`, leído letra a letra en V2 y
> v3) · pie ↺ 8 (`comun.fija.sesion48`).

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- metodo.03.cola.rotulo -->
Las {{ses.s48.cola|letra}} últimas filas de la sesión 48, tal como están en las dos ediciones

<!-- metodo.03.salvedad -->
Estas cifras salen de los archivos de trabajo del proyecto, que no están depositados. Las incidencias constan en sus metadatos de sesión.

<!-- metodo.03.pruebelo.explorador -->
Abra la sesión corrida de cualquier intervención del 1 de octubre de 1931 y baje hasta el final. Las órdenes {{ses.s48.cola.pantalla.desde|id}} a {{ses.s48.cola.pantalla.hasta|id}} repiten la misma petición. [Abrir el explorador ↗]

<!-- metodo.03.pruebelo.codigo -->
```python
s48 = d[(d.date == "1931-10-01") & (d.num_session == 48)]
s48.tail(5)[["id", "speaker", "speech"]]
```

---

## 04 · ¿Quién habla?

<!-- metodo.04.titulo -->
¿Quién habla?

<!-- metodo.04.entrada -->
El Diario imprime el apellido del orador, casi nunca su nombre ni su partido. Unir cada fórmula a una persona es el paso más delicado.

<!-- metodo.04.texto -->
La dificultad se mide en la tabla de diputados del proyecto: {{diputados.comparten_apellido}} de los que intervienen comparten su primer apellido con otro.

Cada fórmula se buscó en la tabla de diputados del proyecto por pasos, del más estricto al más flexible:

1. los apellidos idénticos;
2. los apellidos impresos como comienzo de los completos;
3. el primer apellido;
4. un parecido aproximado entre apellidos, con un umbral de {{vinculo.umbral}};
5. el mismo parecido, sobre el primer apellido.

Si coincidían varios diputados, decidía la legislatura. La Presidencia, los vicepresidentes y los ministros se resolvieron aparte, con el contexto de cada sesión.

El README depositado llama Jaro-Winkler a ese parecido. El código usa el de la biblioteca `difflib` de Python.

Después se revisaron a mano todas las filas. La revisión corrigió {{vinculo.corregidas}} asignaciones.

Así, el {{filas.con_diputado.pct}} de las filas tiene diputado. Quedan {{filas.sin_diputado}} sin él.

El README dice que esas filas son de ministros sin escaño. Leídas una a una, {{filas.sin_diputado.ministerio}} llevan, en efecto, la fórmula de un ministerio.

Las demás son de secretarios, de la Presidencia sin nombre o de fórmulas que la lectura dañó.

**La Presidencia tiene partido.** «El Sr. PRESIDENTE:» va al diputado que presidía, con su partido y su ideología. En {{pres.vice_ses}} de las {{sesiones}} sesiones, un vicepresidente ocupó la Presidencia algún tramo.

Por eso los presidentes de la Cámara encabezan cualquier recuento de palabras sin filtrar.

<!-- metodo.04.enlace -->
[Ver quién habla más según la edición]

> [nota de diseño] `metodo.04.enlace` → `datos/versiones/#quien-habla` (F07). La cifra de
> vicepresidentes cuenta sesiones por (fecha, número); son 584 fechas (nota 2 de la cabecera).

<!-- metodo.04.salvedad -->
Quien preside ordena el debate, no lo sostiene. Para contar oradores, quite antes la Presidencia.

<!-- metodo.04.pruebelo.consulta -->
"guarde silencio"

<!-- metodo.04.pruebelo.explorador -->
Busque la frase y abra un resultado de la Presidencia. La ficha la atribuye al diputado que presidía; «Consta en el diario como» dice solo «El Sr. PRESIDENTE:». [Abrir el explorador ↗]

<!-- metodo.04.pruebelo.codigo -->
```python
d[d.rep_id.isna()].speaker.value_counts()   # las filas sin diputado
```

---

## 05 · ¿Qué es habla y qué no?

<!-- metodo.05.titulo -->
¿Qué es habla y qué no?

<!-- metodo.05.entrada -->
Una fila corta suele ser trámite; una fila larga puede no ser habla.

<!-- metodo.05.texto -->
El {{longitud.hasta50.pct}} de las filas de la V2 tiene {{longitud.umbral}} palabras o menos. La mediana es de {{longitud.mediana|letra}} palabras.

Más de la mitad de esas filas breves son de la Presidencia: el {{longitud.hasta50.presidencia.pct}}.

En el otro extremo, ordene las filas de la más larga a la más corta y tome el primer {{longitud.curva.corte|pct0}}. Ese tramo reúne el {{longitud.curva.palabras|pct1}} de las palabras.

Longitud no es importancia. Una fila breve puede ser una votación o una interrupción decisiva.

**Lo que no es habla.** El Diario imprime también lo que nadie dijo en voz alta: listas de votación, dictámenes, ruegos por escrito, tablas y el relato de la sesión.

La V2 deja ese material dentro de la fila anterior. La mayoría de las veces es la fila de quien presidía: el {{v3.comentarios.en_presidencia|pct0}}.

La v3 lo separa en {{v3.comentarios}} filas de «Comentarios del Diario». Añade además al principio de cada sesión su sumario, que la V2 no traía.

En el explorador, la casilla «Solo lo que se habla» deja fuera sumarios y comentarios. Quedan {{habla.v3}} de las {{filas.v3}} intervenciones.

La separación sigue una auditoría del proyecto. Que una fila quede como habla no prueba que todo su texto se dijera en el pleno.

> [nota de diseño] Aquí va **F10/F11** (`fig.F10.*`). Las cifras de este apartado son de la V2 salvo las de la v3,
> rotuladas en su frase; la página lleva `<NotaBases>`.

<!-- metodo.05.salvedad -->
Con la v3, la proporción de filas breves cambia: el {{longitud.hasta50.pct.v3}} tiene {{longitud.umbral}} palabras o menos. Cada figura dice qué edición cuenta.

<!-- metodo.05.pruebelo.consulta -->
"casas viejas"

<!-- metodo.05.pruebelo.explorador -->
Busque la frase dos veces, con la casilla «Solo lo que se habla» y sin ella. La diferencia son sumarios y comentarios del Diario, no habla de nadie. [Abrir el explorador ↗]

<!-- metodo.05.pruebelo.codigo -->
```python
(d.nwords <= 50).mean()   # la parte de filas breves en la V2
```

---

## 06 · ¿Por qué hay dos ediciones?

<!-- metodo.06.titulo -->
¿Por qué hay dos ediciones?

<!-- metodo.06.entrada -->
La V2 depositada tiene dos defectos de segmentación. La v3 del explorador los corrige sin cambiar una letra del texto.

<!-- metodo.06.texto -->
**Turnos enterrados.** Cuando el etiquetador no reconoció una fórmula, el turno siguiente quedó dentro de la fila anterior. La v3 rescata {{v3.turnos}} turnos.

La mayoría estaban dentro de una fila de la Presidencia: el {{v3.turnos.en_presidencia|pct0}}.

**Material impreso dentro de las filas.** Tablas, listas de votación y documentos iban en la fila de quien hablaba antes. La v3 los pasa a filas de comentarios del Diario.

Las tres filas de la figura lo enseñan.

- La fila más larga de la V2, la {{fila.prieto.id.V2|id}}, suma {{fila.prieto.nwords}} palabras a nombre de Indalecio Prieto, el 12 de julio de 1933.
- Su discurso son {{fila.prieto.habla}} palabras. El resto, {{fila.prieto.documentos}}, son tablas y «documentos complementarios» que el Diario imprime con él.
- El discurso de Manuel Azaña sobre el Estatuto de Cataluña, el 27 de mayo de 1932, va en la V2 dentro de una fila de la Presidencia, la {{fila.estatuto.id.V2|id}}.
- La v3 le da fila propia, la {{fila.estatuto.id.v3|id}}, con {{fila.estatuto.nwords.v3}} palabras.
- El discurso de Azaña del 20 de marzo de 1935 ya estaba bien en la V2: {{fila.azana1935.nwords}} palabras en una sola fila, igual en las dos ediciones.

**El texto no cambia.** Cada pieza de la v3 es un tramo literal de una fila de la V2. Juntas, en orden y con las fórmulas que se separaron, reconstruyen las {{filas.V2}} filas.

Las palabras de cada fila de la V2 se reparten entre sus piezas y suman lo mismo: {{palabras.V2}}. Lo que añade la v3 son los sumarios.

La v3 no está depositada.

<!-- metodo.06.enlace -->
[Ver adónde va cada fila de la V2]

> [nota de diseño] Aquí va **F12** (`fig.F12.*`). Orden de la plantilla: `metodo.06.texto` · F12 · ↺
> `comun.fija.ids` · `metodo.06.enlace`, que va a `datos/versiones/#destino-filas` (F18).

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- metodo.06.salvedad -->
La correspondencia fila a fila entre las dos ediciones no está publicada. Las cifras de la v3 de este apartado se leyeron en ella, con su huella.

<!-- metodo.06.pruebelo.consulta -->
"es preciso reconocer sres diputados que en esta campaña"

<!-- metodo.06.pruebelo.explorador -->
Busque la frase y abra el resultado: es Azaña, el 27 de mayo de 1932, en fila propia. En la V2, ese texto va a nombre de la Presidencia. [Abrir el explorador ↗]

<!-- metodo.06.pruebelo.codigo -->
```python
print(d.loc[d.id == 25979, "speech"].iloc[0][:400])   # Presidencia y, dentro, Azaña
```

---

## 07 · ¿Qué fechas se corrigieron?

<!-- metodo.07.titulo -->
¿Qué fechas se corrigieron?

<!-- metodo.07.entrada -->
La primera versión fechaba mal algunas sesiones. La V2 las corrigió después de auditar todas, una a una.

<!-- metodo.07.texto -->
La auditoría cruzó cuatro fuentes independientes para cada sesión:

- las cabeceras corridas de cada página impresa;
- la cabecera de la sesión, «SESIÓN CELEBRADA…»;
- las fechas que cita el propio texto;
- la secuencia de números del Diario, con el día de la semana.

Para corregir una fecha pidió dos indicios independientes, o una cabecera impresa sin ambigüedad.

Cambiaron {{fechas.sesiones|letra}} sesiones. Suman {{fechas.filas}} filas.

Solo cambian las columnas `date` y `legislature`; el texto y las demás columnas quedan igual.

Una sesión cambió también de legislatura. La sesión 77, que la V1 fechaba el 1 de junio de 1933, es del 4 de mayo de 1934.

La V1 fechaba la sesión 321 el 14 de julio de 1931: tomó la fecha de la portada del Tomo XX, que dice cuándo empezaron esas Cortes. Es del 31 de marzo de 1933.

En varias, el error venía de la cabecera de la sesión: una errata de imprenta o una cifra dañada que la lectura óptica leyó mal.

La auditoría tiene un límite: no detecta un error de fecha coherente con la secuencia.

<!-- metodo.07.enlace -->
[Ver las fechas corregidas]

> [nota de diseño] `metodo.07.enlace` → `datos/versiones/#fechas` (F25). «Cuatro fuentes» es la estructura
> del método de la auditoría (`AUDITORIA_FECHAS.md`, proyecto), no una cifra del corpus.

<!-- metodo.07.salvedad -->
El changelog depositado da los rangos de filas corregidas. La tabla de pruebas que cita, `erratas_fechas_V1.csv`, no está depositada.

<!-- metodo.07.pruebelo.explorador -->
Sin texto de búsqueda, elija la legislatura 1933-1935 y escriba 77 en «Nº de sesión». Todas sus intervenciones son del 4 de mayo de 1934. [Abrir el explorador ↗]

<!-- metodo.07.pruebelo.codigo -->
```python
d[(d.legislature == "1933-1935") & (d.num_session == 77)].date.unique()
```

---

## 08 · ¿Qué significan partido, familia e ideología?

<!-- metodo.08.titulo -->
¿Qué significan partido, familia e ideología?

<!-- metodo.08.entrada -->
Las tres columnas describen al diputado, no la fila. Vienen de la tabla de diputados del proyecto.

<!-- metodo.08.texto -->
**El partido** va por diputado y legislatura. Quien cambió de partido entre legislaturas cambia también en la base.

**La familia** agrupa partidos. En el CSV tiene {{familias.V2}} valores distintos, con variantes de grafía como «Repubicanos» o «Republicanoses».

El explorador los reduce a {{familias.v3}} familias.

**La ideología** se codifica de EI, extrema izquierda, a ED, extrema derecha, con C en el centro. Se asigna al diputado según su partido; no mide lo que dijo.

No siempre es uniforme dentro de un partido. En {{ideologia.partidos_varios|letra}} partidos conviven códigos distintos.

La CEDA, por ejemplo, es D en {{ideologia.ceda.D}} filas. Pero es CD en {{ideologia.ceda.CD}}. Y es C en {{ideologia.ceda.C}}.

«Republicanos» reúne partidos codificados desde la izquierda hasta el centro-derecha.

La Presidencia lleva el partido y la ideología de quien preside.

Quedan etiquetas pendientes de revisión por el autor:

- Diego Martínez Barrio figura en el partido AR en 1931-1933;
- la familia «Liberal», con {{familias.liberal.filas}} filas, que el explorador funde con «Liberales»;
- la Lliga, que es CD en el CSV y D en el README.

<!-- metodo.08.salvedad -->
Una categoría gruesa sirve para comparar bloques, no para clasificar a una persona.

<!-- metodo.08.pruebelo.explorador -->
Elija el partido CEDA en los filtros y despliegue la faceta Ideología. Verá más de un código. [Abrir el explorador ↗]

<!-- metodo.08.pruebelo.codigo -->
```python
d[d.party == "CEDA"].ideology.value_counts()
```

---

## 09 · ¿Qué no afirma el corpus, y cómo comparar?

<!-- metodo.09.titulo -->
¿Qué no afirma el corpus, y cómo comparar?

<!-- metodo.09.entrada -->
La base dice quién habló, cuándo y cuánto. No dice de qué, en qué tono, desde qué posición ni qué votó.

> [nota de diseño] Tras el texto, las cuatro cajas vacías de Inicio, en pequeño, con las mismas claves:
> `inicio.falta.tema` · `.tono` · `.posicion` · `.voto`. Aquí no se redactan.

<!-- metodo.09.texto -->
**Las legislaturas son desiguales.** La primera reúne el {{leg.1931-1933.palabras.pct}} de las palabras de la V2.

Compare tasas, no volúmenes: palabras por sesión, o la parte de cada grupo dentro de su legislatura.

**El voto no es una columna.** Las votaciones nominales van en el texto, como listas de nombres.

En la V2, la lista del {{voto.161-121.si}} a {{voto.161-121.no}} del 1 de octubre de 1931 va dentro de una fila de la Presidencia, la {{voto.161-121.V2|id}}.

Esa fila marca {{fila.lista.nwords}} palabras en `nwords`. Los nombres van en líneas separadas, y `nwords` solo corta por espacios (Datos, «Cinco maneras de contar “palabra”»).

**El tono no se mide.** Las acotaciones del taquígrafo, «(Rumores.)», «(Aplausos.)», están en el texto. Nadie las ha convertido en una variable de la base.

> [nota de diseño] Tras `metodo.09.texto` va ↺ `comun.fija.contar`, destacada. «Cinco maneras…» enlaza a
> `datos/#palabra`.

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

<!-- metodo.09.salvedad -->
Que el Diario lo recoja no lo hace cierto: la base transcribe lo impreso, no lo verifica.

<!-- metodo.09.pruebelo.consulta -->
"total 161"

<!-- metodo.09.pruebelo.explorador -->
Busque la frase con la casilla «Solo lo que se habla» y sin ella. Con la casilla marcada, la lista desaparece: la v3 la guarda como comentario del Diario. [Abrir el explorador ↗]

<!-- metodo.09.pruebelo.codigo -->
```python
print(d.loc[d.id == 5453, "speech"].iloc[0])   # la lista, dentro de la Presidencia
```

---

## 10 · ¿Dónde está la documentación completa?

<!-- metodo.10.titulo -->
¿Dónde está la documentación completa?

<!-- metodo.10.entrada -->
Lo depositado, lo que no lo está y lo que publica este sitio.

<!-- metodo.10.texto -->
**Depositado en Harvard Dataverse**, con la V2.0: el CSV, los changelogs en español y en inglés, y el README.

<!-- metodo.10.texto.2 -->
Su tabla de cobertura es la de la V1. Llama Jaro-Winkler al parecido entre apellidos, que el código calcula con `difflib`.

Habla de una instrucción estructurada al modelo de lectura, que el código no envía: GLM-OCR usa su propia plantilla.

Y llama exilio a las sesiones de Valencia y Barcelona. En esta base, el exilio son las sesiones de México, en 1945.

**Sin depositar.** Estas piezas del proyecto no están en Dataverse:

- la v3 que sirve el explorador;
- la correspondencia fila a fila entre la V2 y la v3;
- los metadatos de sesión: Diario, páginas, presidente titular y Gobierno;
- la tabla de diputados con la que se vinculó cada fórmula, que el README ofrece a petición.

**En este sitio:** el exportador que calcula cada cifra y un archivo, `procedencia.csv`, con la base, la fórmula y la fecha de todas.

Lo que no tiene dirección pública no se enlaza.

<!-- metodo.10.enlace -->
[De dónde sale cada cifra]

> [nota de diseño] Orden: `metodo.10.texto` · ↺ `comun.fija.readme` · `metodo.10.texto.2` · `metodo.10.enlace` →
> `datos/procedencia.csv` (el mismo destino que el pie). Sin URL pública, no se pinta nada más.

<!-- ↺ comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `comun.fija.diario` es la salvedad al margen del apartado 10.

<!-- metodo.10.pruebelo.explorador -->
Abra «Sobre este corpus», en el panel lateral del explorador. Dice qué edición sirve: la v3, sin publicar. [Abrir el explorador ↗]

<!-- metodo.10.pruebelo.codigo -->
```python
d.shape   # compárelo con el README: filas y columnas
```

---

## Figuras de Método

### F20 · Anatomía de una fila (apartado 01)

<!-- fig.F20.titulo -->
Anatomía de una fila

<!-- fig.F20.pregunta -->
¿Qué trae cada fila del CSV?

<!-- fig.F20.que_mide -->
Dos filas seguidas de la sesión del 1 de octubre de 1931, con sus {{columnas.V2}} columnas, tal como están en el CSV depositado.

<!-- fig.F20.conmutador.csv -->
Como en el CSV

<!-- fig.F20.conmutador.explorador -->
Como en el explorador

<!-- fig.F20.conmutador.leyenda -->
Ver la fila

<!-- fig.F20.nota.columna -->
{{columna}} · {{definicion}}

<!-- fig.F20.explorador.texto -->
La edición del explorador guarda las mismas filas con otro número y otro orden. Añade la fórmula y el nombre sin tildes ni mayúsculas, para buscar, y conserva la familia y la ideología tal como venían.

<!-- fig.F20.explorador.ordenes -->
En la V2, las órdenes son {{fila.presidencia.orden.V2|id}} y {{fila.campoamor.orden.V2|id}}, porque empiezan en cero. En la v3 son {{fila.presidencia.orden.v3|id}} y {{fila.campoamor.orden.v3|id}}: la sesión abre con su sumario y la v3 rescata turnos anteriores.

<!-- fig.F20.explorador.pantalla -->
La pantalla del explorador cuenta desde uno: «Orden {{fila.campoamor.orden.pantalla|id}}».

<!-- fig.F20.campo.ord -->
Posición en la sesión, en la v3. Cuenta desde cero; la pantalla, desde uno.

<!-- fig.F20.campo.speaker_fold -->
La fórmula impresa, sin tildes ni mayúsculas, para buscar.

<!-- fig.F20.campo.rep_name_fold -->
El nombre del diputado, sin tildes ni mayúsculas, para buscar.

<!-- fig.F20.campo.party_family_raw -->
La familia tal como viene en el CSV, antes de normalizar la grafía.

<!-- fig.F20.campo.ideology_raw -->
La ideología tal como viene en el CSV, con sus espacios.

<!-- fig.F20.campo.year -->
El año de la sesión, para filtrar.

<!-- fig.F20.enlace -->
[Ver qué trae cada columna]

<!-- fig.F20.texto.cortado -->
El texto sigue; aquí va solo su comienzo.

<!-- fig.F20.salvedad -->
El número de fila cambia entre ediciones; la sesión, no. La ideología de Campoamor es C porque es la de su partido, el radical.

> [nota de diseño] F20 es una tabla ARIA clave–valor, dos columnas de datos (5423 · 5424). La definición de cada
> columna **no se redacta aquí**: se reutiliza `datos.columnas.<columna>.definicion` (F32), para que las dos figuras
> digan lo mismo. `fig.F20.nota.columna` es la plantilla de la nota (`{{columna}}`, `{{definicion}}` los pone la
> isla). El texto va en cursiva y cortado con el componente de corte; `fig.F20.texto.cortado` es su rótulo, sin
> corchetes. El conmutador son radios (sin JS funciona); la vista «Como en el explorador» enseña además los campos
> `fig.F20.campo.*` y los ids v3 {{fila.presidencia.id.v3|id}} y {{fila.campoamor.id.v3|id}}.

<!-- fig.F20.alt -->
Dos filas del CSV desplegadas en sus columnas: la Presidencia pide silencio en {{fila.presidencia.nwords|letra}} palabras y Clara Campoamor empieza su discurso, de {{fila.campoamor.nwords}} palabras.

<!-- fig.F20.grupo.sesion -->
La sesión y el lugar de la fila

<!-- fig.F20.grupo.texto -->
Lo impreso

<!-- fig.F20.grupo.diputado -->
El diputado, si se identificó

<!-- fig.F20.solo_v3 -->
solo en la v3

<!-- fig.F20.tabla.col.columna -->
Columna

<!-- fig.F20.tabla.col.definicion -->
Qué dice

> [nota de diseño] Fase 2 (grupo 4): la vista «Como en el CSV» agrupa las catorce columnas en tres bandas
> (`fig.F20.grupo.*`), como las nombra `metodo.01.texto`; la vista «Como en el explorador» añade los campos de la v3,
> marcados «solo en la v3». Cada clave de columna es una marca: su nota da la definición (la de F32).

### F19 · Del Diario a la fila, en cinco pasos (apartado 02)

<!-- fig.F19.titulo -->
Del Diario a la fila, en cinco pasos

<!-- fig.F19.pregunta -->
¿Cómo se pasa de {{sesiones}} números del Diario a {{filas.V2}} filas?

<!-- fig.F19.paso1.titulo -->
Los números del Diario

<!-- fig.F19.paso1.cifra -->
{{sesiones}} números, uno por sesión

<!-- fig.F19.paso1.detalle -->
Escaneados en PDF desde el archivo histórico del Congreso. Son las sesiones de las tres legislaturas y las de México, en 1945. Base: V2.

<!-- fig.F19.paso2.titulo -->
Las páginas, leídas

<!-- fig.F19.paso2.cifra -->
{{paginas.total}} páginas

<!-- fig.F19.paso2.detalle -->
Recuento de los archivos del proyecto, no depositados. En la primera pasada fallaron {{ocr.fallidas.paginas}}; todas se recuperaron después.

<!-- fig.F19.paso3.titulo -->
Las fórmulas de orador

<!-- fig.F19.paso3.cifra -->
{{etiquetas.n}} etiquetas

<!-- fig.F19.paso3.detalle -->
Tras descartar {{etiquetas.falsos_positivos}} falsos positivos con el filtro de las mayúsculas. Cifra del README depositado.

<!-- fig.F19.paso4.titulo -->
Las filas

<!-- fig.F19.paso4.cifra -->
{{filas.V2}} filas

<!-- fig.F19.paso4.detalle -->
El CSV depositado. La diferencia de {{etiquetas.diferencia|letra}} con las etiquetas no está documentada.

<!-- fig.F19.paso5.titulo -->
El orador, identificado

<!-- fig.F19.paso5.cifra -->
{{filas.con_diputado}} filas con diputado

<!-- fig.F19.paso5.detalle -->
Tras revisar a mano todas las filas y corregir {{vinculo.corregidas}} asignaciones.

<!-- fig.F19.salvedad -->
La diferencia de {{etiquetas.diferencia|letra}} entre etiquetas y filas no está documentada. Las páginas no están depositadas.

<!-- fig.F19.alt -->
Cinco pasos en fila: los números del Diario, las páginas leídas, las fórmulas de orador, las filas y las filas con diputado identificado, cada uno con su cifra.

> [nota de diseño] Cada paso es un `<details>` cuyo `summary` lleva `.titulo` y `.cifra`; dentro, `.detalle` y el
> enlace a su apartado (ancla `#metodo-NN`: pasos 1–2 → 02, paso 2 → 03, paso 3 → 02, paso 5 → 04). Sin pestañas: la figura es su propia tabla. Base V2 + proyecto: la
> página ya lleva `<NotaBases>`, pero aquí no hay cifras v3.

### F10/F11 · Trámite frente a discurso (apartado 05)

<!-- fig.F10.titulo -->
Trámite frente a discurso

<!-- fig.F10.pregunta -->
¿Cuántas filas son breves, y cuánto texto se llevan las largas?

<!-- fig.F10.que_mide -->
Cuántas filas de la V2 caen en cada tramo de longitud, o cuántas palabras suman, separando las de la Presidencia.

<!-- fig.F10.denominador -->
Las {{filas.V2}} filas de la V2, o sus {{palabras.V2}} palabras contadas con `nwords`.

<!-- fig.F10.conmutador.leyenda -->
Contar

<!-- fig.F10.conmutador.filas -->
Filas

<!-- fig.F10.conmutador.palabras -->
Palabras

<!-- fig.F10.eje.x -->
Palabras por fila, en tramos cada vez más anchos

<!-- fig.F10.eje.y.filas -->
Filas

<!-- fig.F10.eje.y.palabras -->
Palabras

<!-- fig.F10.leyenda.presidencia -->
De la Presidencia

<!-- fig.F10.leyenda.resto -->
Del resto de oradores

<!-- fig.F10.filtro.leyenda -->
Legislatura

<!-- fig.F10.filtro.todas -->
Todas

<!-- fig.F10.nota.filas -->
{{tramo}} palabras · {{n}} de {{den}} filas · {{pres}} de la Presidencia

<!-- fig.F10.nota.palabras -->
{{tramo}} palabras · {{n}} de {{den}} palabras · {{pres}} de la Presidencia

<!-- fig.F10.tramo.mas -->
más de

<!-- fig.F10.umbral -->
Hasta {{longitud.umbral}} palabras: {{longitud.hasta50}} de {{filas.V2}} filas.

<!-- fig.F11.titulo -->
Dónde se concentran las palabras

<!-- fig.F11.que_mide -->
Qué parte de todas las palabras reúnen las filas más largas, de la más larga a la más corta.

<!-- fig.F11.eje.x -->
Filas, de la más larga a la más corta

<!-- fig.F11.eje.y -->
Parte de todas las palabras

<!-- fig.F11.punto.p10 -->
El primer {{longitud.curva.corte|pct0}} de las filas reúne el {{longitud.curva.palabras|pct1}} de las palabras.

<!-- fig.F11.punto.p20 -->
El primer {{longitud.curva.corte2|pct0}} reúne el {{longitud.curva.palabras2|pct1}}.

<!-- fig.F11.nota -->
{{pct_filas}} de las filas más largas · {{pct_palabras}} de las palabras

<!-- fig.F10.tabla.col.tramo -->
Palabras por fila

<!-- fig.F10.tabla.col.presidencia -->
Filas de la Presidencia

<!-- fig.F10.tabla.col.resto -->
Filas del resto

<!-- fig.F10.tabla.col.pal_presidencia -->
Palabras de la Presidencia

<!-- fig.F10.tabla.col.pal_resto -->
Palabras del resto

<!-- fig.F10.v3 -->
En la v3, que separa sumarios y comentarios, el {{longitud.hasta50.pct.v3}} de las filas tiene {{longitud.umbral}} palabras o menos.

<!-- fig.F10.salvedad -->
Se mide la longitud; «de trámite» es una interpretación. La Presidencia se reconoce por su fórmula impresa, con el analizador del explorador.

<!-- fig.F10.alt -->
Histograma de la longitud de las filas de la V2. La mayoría son breves y de la Presidencia; al contar palabras, la masa pasa a las filas largas.

> [nota de diseño] Diez tramos (`longitud.json`, del exportador): 0–5 · 6–10 · 11–20 · 21–50 · 51–100 · 101–300 ·
> 301–1.000 · 1.001–3.000 · 3.001–10.000 · más de 10.000; sus rótulos los escribe el componente con `fmt.n`. La
> conmutación Filas · Palabras son radios; el filtro de legislatura, radios que funcionan sin JS (`fig.F10.filtro.*`
> más los rótulos de legislatura del CSV). F11 es una curva de concentración con dos puntos anotados, sin
> deslizador. `{{tramo}}`, `{{n}}`, `{{den}}`, `{{pres}}`, `{{pct_filas}}` y `{{pct_palabras}}` los pone la isla.
> Pestañas: Gráfico · Tabla · Datos; Datos lleva ↺ 12.

### F12 · La fila más larga no es un discurso (apartado 06)

<!-- fig.F12.titulo -->
La fila más larga no es un discurso

<!-- fig.F12.pregunta -->
¿Por qué hacía falta la v3?

<!-- fig.F12.que_mide -->
Tres filas de la V2, partidas en las piezas en que las divide la v3, con las palabras de cada pieza.

<!-- fig.F12.denominador -->
Las palabras de cada fila de la V2, repartidas entre sus piezas de la v3.

<!-- fig.F12.fila.prieto -->
Prieto, 12 de julio de 1933 · fila {{fila.prieto.id.V2|id}} de la V2

<!-- fig.F12.fila.estatuto -->
Azaña, 27 de mayo de 1932 · fila {{fila.estatuto.id.V2|id}} de la V2

<!-- fig.F12.fila.azana1935 -->
Azaña, 20 de marzo de 1935 · fila {{fila.azana1935.id.V2|id}} de la V2

<!-- fig.F12.leyenda.habla -->
Habla del orador

<!-- fig.F12.leyenda.documento -->
Comentario del Diario: tablas, documentos, listas

<!-- fig.F12.leyenda.turno -->
Turno rescatado

<!-- fig.F12.leyenda.presidencia -->
Presidencia

<!-- fig.F12.nota -->
{{tipo}} · fila {{id_v3}} de la v3 · {{n}} palabras · «{{comienzo}}»

<!-- fig.F12.tabla.col.v2 -->
Fila de la V2

<!-- fig.F12.tabla.col.v3 -->
Pieza en la v3

<!-- fig.F12.tabla.col.tipo -->
Qué es

<!-- fig.F12.tabla.col.orador -->
A nombre de

<!-- fig.F12.tabla.col.palabras -->
Palabras

<!-- fig.F12.anota.prieto -->
De las {{fila.prieto.nwords}} palabras de la fila de Prieto, {{fila.prieto.documentos}} son tablas y documentos que el Diario imprime con su discurso.

<!-- fig.F12.anota.estatuto -->
El discurso de Azaña iba a nombre de la Presidencia.

<!-- fig.F12.anota.azana1935 -->
Un discurso largo de verdad: la misma fila en las dos ediciones.

<!-- fig.F12.salvedad -->
Las palabras de la v3 se reparten en proporción al texto de cada pieza. La correspondencia fila a fila no está publicada.

<!-- fig.F12.alt -->
Tres barras, una por fila de la V2. La de Prieto se parte en discurso y documentos; la del Estatuto, en Presidencia y el discurso de Azaña; la de 1935 queda entera.

> [nota de diseño] Datos de `ediciones.json › F12` (el exportador lee `mapa_v2_v3.json`, local, y la v3): V2 55221 →
> v3 61929 habla · 61930 comentario · 61931 habla · 61932 comentario; V2 25979 → v3 29041 Presidencia · 29042
> turno rescatado; V2 85330 → v3 96282. `{{tipo}}` es uno de los rótulos `fig.F12.leyenda.*`; `{{comienzo}}`, las
> primeras palabras de la pieza. Pestañas: Gráfico · Tabla · Datos (↺ 12). Base V2 → v3: `<NotaBases>`.
