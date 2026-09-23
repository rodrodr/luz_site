# Copy ES · Usar los datos (`/[lang]/datos/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Método», «Usar los datos» y
> «Versiones». Sigue la narrativa §13 y la plantilla H del plan. «Versiones» va en su propio archivo,
> `docs/copy_es/versiones.md` (el contrato decía `datos.md` para las dos; `copy2i18n.py` concatena todos los `.md`, así
> que no cambia nada para la compilación). Marcadores: `docs/marcadores/datos.md`. Los dos fragmentos se ejecutaron
> hoy sobre el CSV V2 depositado (MD5 comprobado) y la tabla de diputados de CGOCUS V1.1; salida en
> `docs/marcadores/fragmentos_salida.txt`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `{{marcador}}`. El código es literal (`<code>` y `<pre>` quedan fuera de la auditoría de cifras).
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (recalculado hoy sobre las fuentes):
> 1. **`id`: «No es el orden»** (plan, F32) ya no vale en la V2: con las fechas corregidas, el id sigue la fecha sin un
>    solo retroceso (0 de 107.550 pasos). La trampa del id es otra: solo vale dentro de la V2.
> 2. **«“34 millones” no sale de ninguna»** (salvedad de F33 en el plan) choca con la lista de cifras vetadas. La
>    salvedad dice lo mismo sin repetir la cifra.
> 3. **«No lo abra en una hoja de cálculo: 289 filas superan los 32.767 caracteres…»**: el límite de Excel es un dato
>    externo, sin base del proyecto. La frase dice «el máximo de una celda de Excel» y da la fila más larga.
> 4. **La unión con Afinidades** se probó con la tabla depositada de CGOCUS V1.1: el original
>    (`representative_metadata.csv`, MD5 `c9e66013…`, el mismo que declara Dataverse) convertido al formato `.tab` en
>    que lo sirve Dataverse. La copia de prueba mide exactamente lo que el `.tab` depositado: 156.736 bytes.
> 5. **La Presidencia en una línea de código.** El sitio la reconoce con el analizador de fórmulas del explorador. Una
>    línea de pandas se queda cerca (48.203 filas frente a 48.241) y el copy lo dice, en vez de dar una línea que no
>    reproduce la cifra.

---

## Metadatos

<!-- datos.meta.titulo -->
Usar los datos

<!-- datos.meta.descripcion -->
Por dónde empezar, cómo abrir el CSV, qué significa cada columna y dónde engaña, cómo unirlo con Afinidades Elegidas y cómo citarlo.

> [nota de diseño] Subnavegación «Usar los datos · Versiones» (`comun.md`). Índice lateral con los nueve apartados
> (`datos.indice.*`). Sin banda fija (solo Método y Explorador). La página lleva `<NotaBases>`: F33 y la decisión 4
> citan cifras de la v3. El ancla `#empezar` es el destino único de [Descargar los datos] en todo el sitio.

## Índice lateral

<!-- datos.indice.titulo -->
En esta página

<!-- datos.indice.empezar -->
Por dónde empezar

<!-- datos.indice.camino -->
El camino hasta el archivo

<!-- datos.indice.columnas -->
Las columnas

<!-- datos.indice.decisiones -->
Antes de contar

<!-- datos.indice.palabra -->
Contar «palabra»

<!-- datos.indice.unir -->
Unir con Afinidades

<!-- datos.indice.codigo -->
Dos fragmentos

<!-- datos.indice.citar -->
Cómo citar

<!-- datos.indice.erratas -->
Erratas y contacto

## Cabecera

<!-- datos.antetitulo -->
THQCMI {{dv.version}} · {{filas.V2}} filas · {{columnas.V2}} columnas · {{dv.csv.bytes|peso}}

<!-- datos.titulo -->
¿Cómo lo abro, qué significa cada columna, cómo lo uno y cómo lo cito?

<!-- datos.entrada -->
Quien descarga quiere contar. Antes conviene saber dónde engañan las columnas: el orden empieza en cero, la sesión se reinicia, la Presidencia tiene partido y la palabra se cuenta de cinco maneras.

<!-- datos.entrada.2 -->
Cada trampa va aquí con su cifra y con la línea de código que la resuelve.

---

## 1 · Por dónde empezar (`#empezar`)

<!-- datos.empezar.titulo -->
Por dónde empezar

<!-- datos.empezar.entrada -->
Elija por lo que ya sabe hacer.

<!-- datos.empezar.s1.titulo -->
Sin programar

<!-- datos.empezar.s1.texto -->
Llévese los datos de cada figura de este sitio, en CSV y en Excel, con su LÉAME y su cita. Pesan unos KB.

<!-- ↺ comun.fija.sin_formulario -->
Sin formulario: son datos agregados.

<!-- datos.empezar.s1.accion -->
[Ver los datos de cada figura]

<!-- datos.empezar.s2.titulo -->
Sin programar, con el texto

<!-- datos.empezar.s2.texto -->
Abra el explorador: trae los Diarios ya cargados. Busque, lea cada sesión como en el Diario y exporte lo que encuentre, con su cita.

<!-- datos.empezar.s2.peso -->
La primera vez descarga unos {{explorador.gz.bytes|peso_dec0}} comprimidos, sin formulario.

<!-- ↺ comun.fija.explorador -->
Sirve la edición v3, sin depositar; pide un ordenador.

<!-- ↺ comun.fija.local -->
Se abre en su navegador; lo que busca y guarda se queda en su equipo.

<!-- datos.empezar.s2.accion -->
[Abrir el explorador ↗]

<!-- datos.empezar.s3.titulo -->
Con R o Python

<!-- datos.empezar.s3.texto -->
El CSV depositado, THQCMI V2.0: {{filas.V2}} filas y {{columnas.V2}} columnas. Los dos fragmentos de esta página lo cargan, lo cuentan y lo unen.

<!-- datos.empezar.s3.peso -->
Un archivo de {{dv.csv.bytes|peso}}.

<!-- datos.empezar.s3.accion -->
[Descargar en Dataverse ↗]

<!-- datos.empezar.s4.titulo -->
Con métodos de redes

<!-- datos.empezar.s4.texto -->
Afinidades Elegidas: quién firmó con quién cada proposición, enmienda, ruego o interpelación. Es una base derivada, con su propio depósito, que se une a esta por diputado y legislatura.

<!-- datos.empezar.s4.accion -->
[Ver Afinidades Elegidas]

<!-- datos.empezar.cierre -->
Dos personas con la misma base pueden llegar a resultados distintos sin que ninguna se haya equivocado. Las decisiones de análisis son suyas, y esta página las enseña.

<!-- ↺ comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

> [nota de diseño] La escalera va en registro de calendario, sin tarjetas: cuatro peldaños a dos columnas desde 64 rem.
> Peldaño 1: `s1.*` + ↺ 12 (`comun.fija.sin_formulario`); [Ver los datos de cada figura] → `datos/versiones/#bases`
> (F35: cada figura con su base y sus archivos; `comun.boton.ver_datos_figuras`). El rótulo anterior, [Ver las figuras
> de Las Cortes], llevaba a `cortes/#calendario`, el mismo destino que [Ver el calendario completo] (REVISION_FASE1 P2-12).
> Peldaño 2: `s2.*` + `comun.fija.explorador` + `comun.fija.local` + ↺ 4 (`comun.fija.ids`); [Abrir el explorador ↗]
> → `ENLACES.explorador`.
> Peldaño 3: ↺ 3 (`comun.fija.formulario`) **encima** del botón, nunca en una nota emergente; [Descargar en Dataverse ↗]
> → `ENLACES.thqcmi` (la página del DOI). Peldaño 4: [Ver Afinidades Elegidas] → `afinidades/`; sus archivos y su
> peso viven en esa página (D-3: ninguna cifra de Afinidades sale de su página salvo la unión de F34).
> «Unos KB» no es una cifra del corpus. El tamaño recordado de la base del explorador no se da: «Recordar la base»
> no se ha podido comprobar (C4).

---

## 2 · El camino hasta el archivo (`#camino`)

<!-- datos.camino.titulo -->
El camino hasta el archivo

<!-- datos.camino.entrada -->
Tres pasos: la página del DOI, un solo archivo y una lectura con los parámetros correctos.

<!-- ↺ comun.fija.formulario.motivo -->
Con esos datos queremos saber quién usa la base y con qué fin, para poder mejorarla y comunicar novedades.

> [nota de diseño] Encima de todo, ↺ 3 (`comun.fija.formulario`). Debajo, `comun.fija.formulario.motivo`: el motivo
> del formulario que dio el investigador (D-20, cerrada el 23-09-2026), en una sola frase. El formulario **no se nombra
> por su título**, que trae una errata.

<!-- datos.camino.texto -->
**Vaya a la página del DOI.** Los botones de este sitio llevan allí, no a un archivo suelto.

**Descargue solo el CSV.** Se llama `2REP_Diaries.csv` y pesa {{dv.csv.bytes|peso}}. Los demás archivos de la versión son documentación.

**Léalo con estos parámetros.** Punto y coma como separador, UTF-8 sin marca de orden de bytes y todos los campos entre comillas dobles.

Las comillas internas van duplicadas. Cada registro acaba en CRLF, y el texto conserva sus saltos de línea dentro de las comillas.

Un campo vacío es un valor perdido. Python lo lee como `NaN`; R, como `NA` en las columnas numéricas y como texto vacío en las demás.

**Compruebe su copia.** Si la ha leído bien, debe darle las cifras de esta tabla, legislatura a legislatura. Son las que imprimen los dos fragmentos de esta página.

<!-- datos.camino.comprobar.col.legislatura -->
Legislatura

<!-- datos.camino.comprobar.col.sesiones -->
Sesiones

<!-- datos.camino.comprobar.col.filas -->
Filas

<!-- datos.camino.comprobar.col.palabras -->
Palabras (`nwords`)

<!-- datos.camino.comprobar.total -->
Las tres

<!-- datos.camino.comprobar.aria -->
Sesiones, filas y palabras de cada legislatura en el CSV depositado

<!-- datos.camino.no_trae -->
**Lo que el archivo no trae.** Ni las páginas del Diario, ni quién presidía cada sesión, ni el Gobierno. Son metadatos del proyecto, sin depositar, y el explorador tampoco los muestra.

<!-- datos.camino.accion -->
[Descargar en Dataverse ↗]

<!-- datos.camino.tabla.titulo -->
Los archivos de la versión {{dv.version}}

<!-- datos.camino.tabla.col.archivo -->
Archivo

<!-- datos.camino.tabla.col.bytes -->
Bytes

<!-- datos.camino.tabla.col.md5 -->
MD5

<!-- datos.camino.tabla.col.que -->
Qué es

<!-- datos.camino.archivo.csv -->
Los datos: una fila por turno impreso.

<!-- datos.camino.archivo.changelog_es -->
Qué cambió de la V1 a la V2, en español.

<!-- datos.camino.archivo.changelog_en -->
Lo mismo, en inglés.

<!-- datos.camino.archivo.readme -->
La documentación, en inglés. Describe la primera versión.

<!-- ↺ comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- datos.camino.integridad -->
Si quiere comprobar que su copia es la depositada, compare su MD5 con el de la tabla.

<!-- datos.camino.excel -->
**No lo abra en una hoja de cálculo.** {{csv.celdas_largas}} filas superan el máximo de caracteres de una celda de Excel. La más larga tiene {{csv.fila_mas_larga.caracteres}}.

> [nota de diseño] La tabla de comprobación (`datos.camino.comprobar.col.*`) tiene una fila por legislatura, con
> `{{leg.<leg>.sesiones}}`, `.filas` y `.palabras` (sustitución `<leg>` = 1931-1933 · 1933-1935 · 1936-1939,
> rótulos tal como están en la columna `legislature`). `datos.camino.no_trae` lleva el sello ↺ 2 de los metadatos del
> proyecto (`comun.sello.proyecto`).
>
> La tabla de archivos se genera de la instantánea de Dataverse (`dv_thqcmi.json`): nombre, `filesize` (con
> `fmt.n`, sin unidad) y MD5 completo, en mono. `datos.camino.archivo.*` describe cada archivo. [Descargar en
> Dataverse ↗] lleva ↺ 3 encima (ya está al principio de la sección, en la misma vista). Bajo la tabla, ↺ 11
> (`comun.fija.readme`), que enlaza a `datos/versiones/`.

---

## 3 · Las columnas (F32, `#columnas`)

<!-- datos.columnas.titulo -->
Las {{columnas.V2}} columnas

<!-- datos.columnas.entrada -->
Cada columna, con su definición, su valor en dos filas reales y su trampa.

<!-- datos.columnas.texto -->
Las filas de ejemplo son la {{fila.presidencia.id.V2|id}} y la {{fila.campoamor.id.V2|id}}, seguidas en la sesión del 1 de octubre de 1931. En la primera, la Presidencia pide silencio; en la segunda, Clara Campoamor empieza a hablar.

<!-- datos.columnas.id.definicion -->
Número de la fila en la V2, del uno al {{filas.V2}}, sin huecos. Sigue el orden de lectura: fecha, sesión y lugar en la sesión.

<!-- datos.columnas.id.trampa -->
Solo vale dentro de la V2. La v3 renumera: la {{fila.campoamor.id.V2|id}} es allí la {{fila.campoamor.id.v3|id}}. Para citar, dé también la fecha y el número de sesión.

<!-- datos.columnas.num_session.definicion -->
Número de la sesión dentro de su legislatura, como lo imprime el Diario.

<!-- datos.columnas.num_session.trampa -->
Vuelve a empezar en cada legislatura: la sesión 1 existe {{sesiones.num1|letra}} veces. Una sesión se identifica por la fecha y el número juntos.

<!-- datos.columnas.order.definicion -->
Lugar de la fila en su sesión.

<!-- datos.columnas.order.trampa -->
Empieza en cero. Campoamor es la {{fila.campoamor.orden.V2|id}} en la V2, la {{fila.campoamor.orden.v3|id}} en la v3 y «Orden {{fila.campoamor.orden.pantalla|id}}» en la pantalla del explorador.

<!-- datos.columnas.date.definicion -->
Fecha de la sesión, en formato AAAA-MM-DD.

<!-- datos.columnas.date.trampa -->
{{fechas.sesiones|letra}} sesiones cambiaron de fecha de la V1 a la V2. Hay {{sesiones.fechas_dobles|letra}} días con dos sesiones, así que la fecha sola no identifica una sesión.

<!-- datos.columnas.speaker.definicion -->
La fórmula impresa del orador, tal como la leyó el reconocimiento óptico.

<!-- datos.columnas.speaker.trampa -->
Solo esta columna dice el cargo: «El Sr. PRESIDENTE:», «El Sr. Ministro de HACIENDA:». Conserva las erratas de lectura, como «PERSIDENTE».

<!-- datos.columnas.speech.definicion -->
El texto de la fila, sin resumir ni corregir a mano.

<!-- datos.columnas.speech.trampa -->
Incluye acotaciones, interrupciones, documentos y listas de votación. La lista nominal del 1 de octubre de 1931 va dentro de una fila de la Presidencia, la {{voto.161-121.V2|id}}.

<!-- datos.columnas.rep_id.definicion -->
El diputado, según la tabla de diputados del proyecto.

<!-- datos.columnas.rep_id.trampa -->
Es una persona, no un escaño. La Presidencia va al diputado que preside. Hay {{filas.sin_diputado}} filas vacías, y el identificador {{rep836.id|id}} lleva dos nombres distintos, pendiente del autor.

<!-- datos.columnas.rep_name.definicion -->
Nombre completo del diputado.

<!-- datos.columnas.rep_name.trampa -->
Va sin tildes y con mayúscula en cada palabra: «Clara Campoamor Y Rodriguez». No lo copie en un texto; use la grafía del Diario o de la bibliografía.

<!-- datos.columnas.district.definicion -->
Circunscripción por la que salió elegido el diputado.

<!-- datos.columnas.district.trampa -->
Tiene {{distritos.V2}} valores. Uno, «Agrarios», es una errata en {{distritos.agrarios.filas|letra}} filas. Es el distrito electoral, no el lugar de nacimiento.

<!-- datos.columnas.party.definicion -->
Siglas del partido del diputado en esa legislatura.

<!-- datos.columnas.party.trampa -->
Va por diputado y legislatura, no por fila. «Indep.» aquí es «Independiente» en Afinidades Elegidas.

<!-- datos.columnas.party_family.definicion -->
Familia de partidos del diputado.

<!-- datos.columnas.party_family.trampa -->
Tiene {{familias.V2}} valores escritos a mano, con variantes como «Repubicanos» o «Republicanoses». Faltan en {{familias.vacias}} filas. El explorador los reduce a {{familias.v3}} familias.

<!-- datos.columnas.ideology.definicion -->
Posición del partido, de EI, extrema izquierda, a ED, extrema derecha.

<!-- datos.columnas.ideology.trampa -->
Es la del partido del diputado, no la de la persona. En {{ideologia.partidos_varios|letra}} partidos conviven códigos distintos. Además, {{ideologia.c_espacio}} filas llevan «C » con un espacio detrás.

<!-- datos.columnas.nwords.definicion -->
Palabras del texto.

<!-- datos.columnas.nwords.trampa -->
Cuenta trozos separados por el carácter espacio: un salto de línea no separa. Con `split()` salen {{palabras.split.V2}}, no {{palabras.V2}}.

<!-- datos.columnas.legislature.definicion -->
Legislatura: 1931-1933, 1933-1935 o 1936-1939.

<!-- datos.columnas.legislature.trampa -->
La segunda no se llama igual en Afinidades Elegidas. La tercera incluye las sesiones de la guerra y las de México.

> [nota de diseño] **F32** es la tabla ARIA `Columnas.astro` **sin tira de llenado**. Filas en el orden del CSV; cada
> una con ancla `#col-<columna>` (`:target` la resalta), su `.definicion`, sus valores en V2 5423 y 5424 (de
> `columnas.json`, recortados con el componente de corte) y su `.trampa` al margen. `fig.F20` reutiliza las
> `.definicion`. En `legislature.trampa` va a continuación ↺ 10 (`comun.fija.legislatura`), en pequeño. Los rótulos de
> legislatura son valores de la columna, como los años de un hecho. Bajo la tabla, `datos.columnas.speech.dentro`.

<!-- datos.columnas.speech.dentro -->
**Dentro del texto.** Los párrafos del Diario van separados por una línea en blanco. Las acotaciones del taquígrafo van entre paréntesis, como en el papel: «(Muy bien.—Aplausos.)».

Las palabras que el Diario partía con guion al final de línea están recompuestas. Las erratas de lectura, no.

<!-- ↺ comun.fija.legislatura -->
El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.

<!-- fig.F32.titulo -->
Cada columna, con su trampa

<!-- fig.F32.pregunta -->
¿Qué significa cada columna, y dónde engaña?

<!-- fig.F32.tabla.col.columna -->
Columna

<!-- fig.F32.tabla.col.definicion -->
Qué es

<!-- fig.F32.tabla.col.silencio -->
Fila {{fila.presidencia.id.V2|id}}

<!-- fig.F32.tabla.col.campoamor -->
Fila {{fila.campoamor.id.V2|id}}

<!-- fig.F32.tabla.col.trampa -->
Dónde engaña

<!-- fig.F32.vacio -->
vacío

<!-- fig.F32.tipo.entero -->
entero

<!-- fig.F32.tipo.texto -->
texto

<!-- fig.F32.tipo.fecha -->
fecha

<!-- fig.F32.vacios -->
{{n}} vacíos

<!-- fig.F32.sin_vacios -->
sin vacíos

<!-- fig.F32.distintos -->
{{n}} valores distintos

<!-- fig.F32.tabla.col.tipo -->
Tipo

<!-- fig.F32.tabla.col.vacios -->
Vacíos

<!-- fig.F32.tabla.col.distintos -->
Distintos

<!-- fig.F32.cortado -->
{{n}} caracteres en total

<!-- fig.F32.nota -->
{{columna}} · {{vacios}} vacíos de {{den}} filas

<!-- fig.F32.que_mide -->
Las {{columnas.V2}} columnas del CSV depositado: su tipo, sus celdas vacías, sus valores distintos y su valor en dos filas reales.

<!-- fig.F32.denominador -->
Las {{filas.V2}} filas de la V2.

<!-- fig.F32.salvedad -->
Definiciones del README depositado, que describe la V1, corregidas donde la V2 cambió.

<!-- fig.F32.alt -->
Tabla de las columnas del CSV depositado, con su definición, su valor en dos filas de ejemplo y su trampa.

---

## 4 · Antes de contar (`#decisiones`)

<!-- datos.decisiones.titulo -->
Antes de contar: seis decisiones que cambian el resultado

<!-- datos.decisiones.entrada -->
Ninguna tiene una respuesta correcta para todos. Cada una lleva su cifra y la línea que la aplica.

<!-- datos.decisiones.1.titulo -->
La Presidencia

<!-- datos.decisiones.1.texto -->
El {{presidencia.filas.pct}} de las filas es de la Presidencia. Se lleva el {{presidencia.palabras.pct}} de las palabras.

Para contar oradores, quítela. Consérvela si estudia cómo se dirigía el debate: quién daba la palabra, quién llamaba al orden.

El sitio la reconoce con el analizador de fórmulas del explorador, que lee también las erratas.

Una línea de pandas se le acerca: marca {{presidencia.aprox.filas}} filas. El analizador marca {{presidencia.filas}}, porque lee además fórmulas como «PERSIDENTE».

<!-- datos.decisiones.1.codigo -->
```python
pres = d.speaker.str.contains("PRESIDENTE") & ~d.speaker.str.contains("CONSEJO|GOBIERNO|REPÚBLICA")
oradores = d[~pres]
```

<!-- datos.decisiones.2.titulo -->
Filas no es discurso

<!-- datos.decisiones.2.texto -->
El {{longitud.hasta50.pct}} de las filas tiene {{longitud.umbral}} palabras o menos. Hay {{longitud.mas300}} filas de más de {{longitud.umbral300}} palabras.

Esas filas largas reúnen el {{longitud.mas300.palabras.pct}} de todas las palabras. Si estudia discursos, fije un mínimo y dígalo.

Si estudia interrupciones o trámite, las filas breves son justo su dato.

<!-- datos.decisiones.2.codigo -->
```python
largas = d[d.nwords > 300]
```

<!-- datos.decisiones.3.titulo -->
Qué es una palabra

<!-- datos.decisiones.3.texto -->
Hay otras maneras de contar que `nwords`, y cada una da otra cifra. Se explica justo debajo.

<!-- datos.decisiones.3.codigo -->
```python
d.speech.str.split().str.len().sum()   # frente a d.nwords.sum()
```

<!-- datos.decisiones.4.titulo -->
El material impreso dentro de las filas

<!-- datos.decisiones.4.texto -->
En la V2, las listas de votación, las tablas y los documentos van dentro de la fila anterior. La v3 separó {{v3.comentarios}} bloques de ese material.

La fila más larga de la V2, la {{fila.prieto.id.V2|id}}, es sobre todo tablas. Antes de elegir las filas más largas, léalas.

El explorador separa ese material con la casilla «Solo lo que se habla». El CSV depositado no lo separa.

<!-- datos.decisiones.4.codigo -->
```python
print(d.loc[d.id == 5453, "speech"].iloc[0][:600])   # una votación nominal, dentro de la Presidencia
```

<!-- datos.decisiones.5.titulo -->
Las legislaturas desiguales

<!-- datos.decisiones.5.texto -->
La primera legislatura reúne el {{leg.1931-1933.palabras.pct}} de las palabras. Compare tasas, no volúmenes: palabras por sesión, o la parte de cada grupo dentro de su legislatura.

La tasa puede invertir el orden. Por sesión, la primera legislatura suma {{leg.1931-1933.palabras_por_sesion}} palabras.

La segunda, con menos palabras en total, suma {{leg.1933-1935.palabras_por_sesion}} por sesión.

La tercera legislatura, 1936-1939, reúne tres etapas muy distintas. Para separarlas, corte por número de sesión: hasta la sesión 60, las Cortes de 1936, hasta el 10 de julio.

Las sesiones 61 a 69 son las Cortes en guerra, de octubre de 1936 a febrero de 1939. Las sesiones 70 a 74 son las de México, en 1945.

<!-- datos.decisiones.5.codigo -->
```python
d.groupby("legislature").nwords.sum() / d.nwords.sum()
etapa = pd.cut(d.num_session, [0, 60, 69, 74], labels=["1936", "guerra", "México"])
d[d.legislature == "1936-1939"].groupby(etapa).nwords.sum()
```

<!-- datos.decisiones.6.titulo -->
Los ids entre ediciones

<!-- datos.decisiones.6.texto -->
Un id de la V2 no sirve en el explorador. Para cruzar ediciones o citar, use la fecha y el número de sesión.

Para llevar al CSV algo que encontró en el explorador, busque la sesión por fecha y número. Dentro de ella, localice el comienzo del texto.

<!-- datos.decisiones.6.codigo -->
```python
d.groupby(["date", "num_session"]).ngroups   # una clave por sesión, igual en la v3
```

> [nota de diseño] Las seis decisiones van como lista numerada de seis bloques cortos (título en mono, texto y código
> en `<details>` abierto a 1.440 y cerrado en el móvil). Bajo la sexta, ↺ 4 (`comun.fija.ids`). «Seis» es la
> estructura de la sección, no una cifra del corpus. La decisión 4 cita una cifra v3: la página ya lleva `<NotaBases>`.

---

## 5 · Cinco maneras de contar «palabra» (F33, `#palabra`)

<!-- datos.palabra.titulo -->
Cinco maneras de contar «palabra»

<!-- datos.palabra.entrada -->
¿Cuántas palabras hay? Depende de qué cuente y en qué edición.

<!-- datos.palabra.texto -->
`nwords` separa por el carácter espacio. `split()` separa también por saltos de línea, y por eso da más: {{palabras.split.V2}}.

La diferencia se concentra en las listas, con un nombre por línea. En la votación nominal del 1 de octubre de 1931, `nwords` marca {{fila.lista.nwords}} palabras.

En esa misma fila, `split()` cuenta {{fila.lista.split}}.

El explorador cuenta sobre la v3, que reparte las palabras de la V2 y añade los sumarios. Su Tendencia divide por otra cifra: los tokens de su índice de búsqueda.

<!-- fig.F33.titulo -->
La misma base, cinco cifras de palabras

<!-- fig.F33.pregunta -->
¿Cuántas palabras hay?

<!-- fig.F33.nwords.rotulo -->
`nwords` · V2

<!-- fig.F33.nwords.valor -->
{{palabras.V2}}

<!-- fig.F33.nwords.def -->
La columna del CSV: trozos separados por el carácter espacio.

<!-- fig.F33.nwords.codigo -->
d.nwords.sum()

<!-- fig.F33.split.rotulo -->
`split()` · V2

<!-- fig.F33.split.valor -->
{{palabras.split.V2}}

<!-- fig.F33.split.def -->
Trozos separados por cualquier espacio en blanco, saltos de línea incluidos.

<!-- fig.F33.split.codigo -->
d.speech.str.split().str.len().sum()

<!-- fig.F33.total.rotulo -->
Todas las filas · v3

<!-- fig.F33.total.valor -->
{{palabras.v3}}

<!-- fig.F33.total.def -->
Las palabras de la V2, repartidas entre las piezas de la v3, más las de los sumarios que la V2 no traía.

<!-- fig.F33.habla.rotulo -->
Solo lo que se habla · v3

<!-- fig.F33.habla.valor -->
{{palabras.habla.v3}}

<!-- fig.F33.habla.def -->
Lo mismo sin sumarios ni comentarios del Diario: lo que cuenta el explorador con la casilla «Solo lo que se habla».

<!-- fig.F33.tendencia.rotulo -->
Tokens del índice · v3

<!-- fig.F33.tendencia.valor -->
{{palabras.tendencia.v3}}

<!-- fig.F33.tendencia.def -->
Lo que cuenta el índice de búsqueda del explorador. Es el denominador de su Tendencia.

<!-- fig.F33.eje -->
Millones de palabras

<!-- fig.F33.nota -->
{{rotulo}} · {{valor}} · {{def}}

<!-- fig.F33.tabla.col.recuento -->
Recuento

<!-- fig.F33.tabla.col.valor -->
Palabras

<!-- fig.F33.tabla.col.edicion -->
Edición

<!-- fig.F33.tabla.col.def -->
Qué cuenta

<!-- fig.F33.tabla.col.diferencia -->
Frente a `nwords`

<!-- fig.F33.que_mide -->
Palabras del corpus contadas de cinco maneras: dos sobre la edición depositada y tres sobre la del explorador.

<!-- fig.F33.denominador -->
Ninguno: son totales. Cada fila del CSV dice su edición y cómo se cuenta.

<!-- fig.F33.salvedad -->
Cada figura de este sitio dice cuál usa. Una cifra de palabras sin su definición no se compara con otra.

<!-- fig.F33.alt -->
Cinco barras horizontales con cinco recuentos de palabras: dos sobre la edición depositada y tres sobre la del explorador.

> [nota de diseño] **F33**: cinco barras horizontales con su rótulo y su valor en HTML encima; la nota emergente
> (`fig.F33.nota`) da la definición y, en las dos de la V2, la línea de código (`fig.F33.<k>.codigo`, en `<code>`).
> Las barras de la v3 llevan otro trazo y el sello «Edición del explorador» (↺ 2). Pestaña Tabla. Sin JS: la tabla.
> Una sola base por frase: `datos.palabra.texto` rotula V2 y v3 donde las compara.

---

## 6 · Unir con Afinidades Elegidas (F34, `#unir`)

<!-- datos.unir.titulo -->
Unir con Afinidades Elegidas

<!-- datos.unir.entrada -->
Afinidades Elegidas trae una ficha por diputado y legislatura. Se une a esta base por los dos, nunca solo por el diputado.

<!-- datos.unir.texto -->
La clave es el diputado, `rep_id`, que allí se llama `id_dip`, más la legislatura. Antes de unir, recodifique la segunda legislatura como la llama el censo: 1933-1935 pasa a ser 1933-1936.

Unos pocos pares de diputado y legislatura no tienen ficha en el censo de Afinidades: sus filas quedan sin atributos de Afinidades. La tabla de abajo los cuenta, con la versión de la que salen.

Si une solo por el diputado, cada fila se repite una vez por legislatura de su diputado, y cualquier suma sale inflada.

La tabla de Afinidades trae, por diputado y legislatura, su nombre, su distrito, su partido, su familia y su ideología, con los códigos de Afinidades.

No siempre coinciden con los de esta base: a veces el partido se escribe distinto, casi siempre «Indep.» frente a «Independiente».

Si usa esos atributos, diga de qué base salen.

<!-- datos.unir.archivo -->
La tabla de diputados de Afinidades Elegidas se descarga como `representative_metadata.tab`, separada por tabuladores, del depósito CGOCUS V1.1.

<!-- datos.unir.accion -->
[Descargar en Dataverse ↗]

<!-- fig.F34.titulo -->
Por diputado y legislatura, nunca solo por el diputado

<!-- fig.F34.pregunta -->
¿Cómo se une la V2 con Afinidades Elegidas sin multiplicar filas?

<!-- fig.F34.tabla.col.paso -->
Paso

<!-- fig.F34.tabla.col.resultado -->
Resultado

<!-- fig.F34.paso.recodificar -->
Recodificar la legislatura 1933-1935 como 1933-1936

<!-- fig.F34.paso.recodificar.resultado -->
Las dos bases hablan de la misma legislatura

<!-- fig.F34.paso.unir -->
Unir por diputado y legislatura

<!-- fig.F34.paso.unir.resultado -->
{{filas.V2}} filas, las mismas que antes

<!-- fig.F34.paso.casan -->
Pares de diputado y legislatura que casan

<!-- fig.F34.paso.casan.resultado -->
{{union.pares.casan}} de {{union.pares}}

<!-- fig.F34.paso.sin_ficha -->
Pares sin ficha en Afinidades

<!-- fig.F34.paso.sin_ficha.resultado -->
{{union.pares.sin_ficha}} pares, {{union.filas.sin_ficha}} filas

<!-- fig.F34.paso.mal -->
Unir solo por el diputado (mal)

<!-- fig.F34.paso.mal.resultado -->
{{union.solo_id.filas}} filas

<!-- fig.F34.paso.partido -->
Pares con otro rótulo de partido

<!-- fig.F34.paso.partido.resultado -->
{{union.pares.otro_partido}}

<!-- fig.F34.barra.v2 -->
El CSV depositado, antes de unir

<!-- fig.F34.barra.bien -->
Unido por diputado y legislatura

<!-- fig.F34.barra.mal -->
Unido solo por el diputado

<!-- fig.F34.barra.repetidas -->
{{n}} filas repetidas

<!-- fig.F34.barra.sin_ficha -->
De ellas, sin ficha en Afinidades

<!-- fig.F34.que_mide -->
Los pares de diputado y legislatura de la V2 que no tienen ficha en Afinidades Elegidas y los que la tienen con otro rótulo de partido.

<!-- fig.F34.denominador -->
Los {{union.pares}} pares de diputado y legislatura de la V2, con la legislatura recodificada como la llama el censo.

<!-- fig.F34.otros.resumen -->
Los pares con otro rótulo de partido, uno a uno

<!-- fig.F34.otros.col.v2 -->
Partido en la V2

<!-- fig.F34.otros.col.afin -->
Partido en Afinidades

<!-- fig.F34.casos.resumen -->
Los pares sin ficha, uno a uno

<!-- fig.F34.casos.col.diputado -->
Diputado

<!-- fig.F34.casos.col.legislatura -->
Legislatura

<!-- fig.F34.casos.col.filas -->
Filas

<!-- fig.F34.salvedad -->
Cifras de la versión depositada de Afinidades Elegidas, CGOCUS V1.1. Cambiarán si se deposita otra.

<!-- fig.F34.alt -->
Tabla con los pasos para unir las dos bases: recodificar la legislatura, unir por diputado y legislatura, y lo que pasa si se une solo por el diputado.

> [nota de diseño] **F34** es una tabla (no interactiva). Los pares sin ficha van en `<details>`
> (`fig.F34.casos.*`), generados por el exportador (`union.json`) con el nombre según la tabla de grafías; nunca el
> `rep_name` crudo. El `rep_id` 836, con dos nombres, **no se cita como ejemplo** (discrepancia 23). Bajo la tabla,
> ↺ 10 (`comun.fija.legislatura`) y ↺ 3 encima de [Descargar en Dataverse ↗] → `ENLACES.cgocus`. Sello: «Afinidades
> Elegidas (CGOCUS V1.1, depositada)» (↺ 2). El código de la unión está en los fragmentos (sección 7).

---

## 7 · Dos fragmentos (`#codigo`)

<!-- datos.codigo.titulo -->
Dos fragmentos, en R y en Python

<!-- datos.codigo.entrada -->
Cargan el CSV, comprueban sus filas, cuentan cada legislatura y hacen las dos uniones con Afinidades, la buena y la mala. Dan lo mismo en los dos lenguajes.

<!-- datos.codigo.reproduce -->
Reproducen cifras de este sitio: las sesiones, filas y palabras de cada legislatura, y los {{meses.con_sesion}} meses con sesión.

También reproducen febrero de 1933, el mes de Casas Viejas: {{mes.1933-02.sesiones}} sesiones. Ese mes suma {{mes.1933-02.filas}} filas.

Sus filas reúnen {{mes.1933-02.palabras}} palabras.

<!-- datos.codigo.archivos -->
Necesitan dos archivos en la misma carpeta: `2REP_Diaries.csv`, de THQCMI, y `representative_metadata.tab`, de CGOCUS. Los dos piden el formulario de Dataverse.

<!-- datos.codigo.r.rotulo -->
R, sin paquetes

<!-- datos.codigo.r -->
```r
# El CSV depositado (THQCMI V2.0): «;» de separador, UTF-8, todos los campos entre comillas.
d <- read.csv2("2REP_Diaries.csv", fileEncoding = "UTF-8")
stopifnot(nrow(d) == 107551)

# SALVEDAD. Una fila es lo que el Diario imprime entre dos fórmulas de orador, no un discurso.
# La Presidencia va a nombre de quien preside. nwords cuenta trozos separados por el carácter
# espacio. Una sesión es (date, num_session): num_session vuelve a 1 en cada legislatura.
ses <- unique(d[, c("legislature", "date", "num_session")])
t <- data.frame(sesiones = c(table(ses$legislature)),
                filas    = c(table(d$legislature)),
                palabras = c(tapply(d$nwords, d$legislature, sum)))
print(t)

mes <- substr(d$date, 1, 7)
cat("meses con sesión:", length(unique(mes)), "\n")
feb <- d[mes == "1933-02", ]
cat("febrero de 1933:", nrow(unique(feb[, c("date", "num_session")])), "sesiones,",
    nrow(feb), "filas,", sum(feb$nwords), "palabras\n")

# Afinidades Elegidas (CGOCUS V1.1): una ficha por diputado Y legislatura.
a <- read.delim("representative_metadata.tab", fileEncoding = "UTF-8")
names(a)[names(a) == "id_dip"] <- "rep_id"

# MAL: solo por el diputado. Cada fila se repite una vez por legislatura de su diputado.
mal <- merge(d, a, by = "rep_id", all.x = TRUE)
cat("unión solo por el id:", nrow(mal), "filas\n")

# BIEN: por diputado y legislatura. El censo de CGOCUS llama 1933-1936 a la que aquí es 1933-1935.
d$legislatura <- ifelse(d$legislature == "1933-1935", "1933-1936", d$legislature)
bien <- merge(d, a, by = c("rep_id", "legislatura"), all.x = TRUE)
sin <- bien[!is.na(bien$rep_id) & is.na(bien$nombre_completo), ]
cat("unión por id y legislatura:", nrow(bien), "filas;", nrow(sin), "filas y",
    nrow(unique(sin[, c("rep_id", "legislatura")])), "pares sin ficha en CGOCUS\n")
```

<!-- datos.codigo.python.rotulo -->
Python, con pandas

<!-- datos.codigo.python -->
```python
import pandas as pd

# El CSV depositado (THQCMI V2.0): «;» de separador, UTF-8, todos los campos entre comillas.
d = pd.read_csv("2REP_Diaries.csv", sep=";", dtype={"rep_id": "Int64"})
assert len(d) == 107551

# SALVEDAD. Una fila es lo que el Diario imprime entre dos fórmulas de orador, no un discurso.
# La Presidencia va a nombre de quien preside. nwords cuenta trozos separados por el carácter
# espacio. Una sesión es (date, num_session): num_session vuelve a 1 en cada legislatura.
ses = d[["legislature", "date", "num_session"]].drop_duplicates()
t = pd.DataFrame({"sesiones": ses.groupby("legislature").size(),
                  "filas": d.groupby("legislature").size(),
                  "palabras": d.groupby("legislature")["nwords"].sum()})
print(t)

mes = d["date"].str[:7]
print("meses con sesión:", mes.nunique())
feb = d[mes == "1933-02"]
print("febrero de 1933:", len(feb[["date", "num_session"]].drop_duplicates()), "sesiones,",
      len(feb), "filas,", feb["nwords"].sum(), "palabras")

# Afinidades Elegidas (CGOCUS V1.1): una ficha por diputado Y legislatura.
a = pd.read_csv("representative_metadata.tab", sep="\t").rename(columns={"id_dip": "rep_id"})

# MAL: solo por el diputado. Cada fila se repite una vez por legislatura de su diputado.
mal = d.merge(a, on="rep_id", how="left")
print("unión solo por el id:", len(mal), "filas")

# BIEN: por diputado y legislatura. El censo de CGOCUS llama 1933-1936 a la que aquí es 1933-1935.
d["legislatura"] = d["legislature"].replace({"1933-1935": "1933-1936"})
bien = d.merge(a, on=["rep_id", "legislatura"], how="left", validate="many_to_one")
sin = bien[bien["rep_id"].notna() & bien["nombre_completo"].isna()]
print("unión por id y legislatura:", len(bien), "filas;", len(sin), "filas y",
      len(sin[["rep_id", "legislatura"]].drop_duplicates()), "pares sin ficha en CGOCUS")
```

<!-- datos.codigo.copiar -->
[Copiar el código]

<!-- datos.codigo.salida.archivo -->
[Descargar la salida de los dos fragmentos]

<!-- datos.codigo.salida.rotulo -->
Salida, la misma en los dos, ejecutada el {{fragmentos.fecha|fecha_larga}}

<!-- datos.codigo.reejecuta -->
El exportador del sitio vuelve a ejecutar los dos fragmentos en cada compilación. Si su salida deja de coincidir con las cifras de estas páginas, la compilación falla.

> [nota de diseño] Los dos bloques se pintan en pestañas «R · Python» (`Pestanas`), con [Copiar] en cada una. La
> salida **no se teclea**: el exportador ejecuta estos dos bloques (los extrae de este archivo, entre las claves
> `datos.codigo.r` y `datos.codigo.python`), guarda su salida en `public/datos/fragmentos_salida.txt` con fecha,
> versiones y MD5, y la plantilla la pinta en `<pre>` bajo `datos.codigo.salida.rotulo`. Hoy corrieron con pandas
> 3.0.3 (con los avisos elevados a error) y R 4.5.2; salida en `docs/marcadores/fragmentos_salida.txt`. Las
> salvedades van dentro del código, como comentario. Los comentarios se traducen; el código, no.

---

## 8 · Cómo citar (`#citar`)

<!-- datos.citar.titulo -->
Cómo citar

<!-- datos.citar.entrada -->
Cite lo que usó y su edición. La cita de una figura lleva, además, su base y su fecha.

<!-- datos.citar.thqcmi -->
**La base.** La cita oficial de Harvard Dataverse, en texto, BibTeX o RIS. Termina en «Harvard Dataverse, V2».

<!-- datos.citar.cgocus -->
**Afinidades Elegidas.** Cópiela tal como la da Dataverse: dice «V1» y lleva un UNF, pero corresponde a la versión depositada, CGOCUS V1.1.

<!-- datos.citar.figura -->
**Una figura.** Su título, la dirección de su ancla, la edición de sus datos y la fecha de cálculo. Cada figura trae la suya en la pestaña Datos.

<!-- datos.citar.pasaje -->
**Un pasaje.** La fecha y el número de la sesión, y el id de la fila con su edición. Por ejemplo: Diario de Sesiones, 1 de octubre de 1931, sesión 48; THQCMI V2, fila {{fila.campoamor.id.V2|id}}.

<!-- datos.citar.pasaje.2 -->
Si cita el Diario impreso, añada su número y la página. El explorador no da ni lo uno ni lo otro.

<!-- datos.citar.explorador -->
**El explorador.** Diga que sirve la edición v3, sin depositar. Su cita automática dice «V2», pero sus identificadores son de la v3.

<!-- datos.citar.pestana.texto -->
Texto

<!-- datos.citar.pestana.bibtex -->
BibTeX

<!-- datos.citar.pestana.ris -->
RIS

<!-- datos.citar.copiar -->
[Copiar la cita]

<!-- datos.citar.licencia -->
Las dos bases tienen licencia CC BY 4.0: puede usar, adaptar y redistribuir los datos si cita la fuente.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] Las citas **no se teclean**: `lib/cita.ts` las toma de la instantánea de Dataverse
> (`dv_thqcmi_cita.json`, `dv_cgocus_cita.json`, ya descargadas por `exportador/instantanea.py`). Formatos de
> referencia, comprobados hoy en la API pública (`…/versions/:latest-published/citation`, `/citation/BibTeX`,
> `/citation/RIS`): texto «Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona,
> Elena; Barreto Martín, Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic,
> 1931–1945", https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2»; BibTeX `@data{DVN/THQCMI_2026, …, version =
> {V2}, …}`; RIS `TY - DATA … ET - V2 … ER -`. La de CGOCUS termina en «Harvard Dataverse, V1,
> UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]». Pestañas Texto · BibTeX · RIS y [Copiar la cita]; sin JS, las tres en
> `<details>`. El ejemplo de pasaje usa la fila de Campoamor; el número y la fecha de sesión son literales permitidos.
> ↺ 1 (`comun.fija.diario`) cierra la sección.

---

## LÉAME de las figuras de Datos y Versiones (columnas de cada CSV)

> [nota de diseño] Las lee `src/pages/datos/leame-[fig]-[lang].txt.ts`: bajo COLUMNAS, cada columna del CSV de la
> figura con su definición (`fig.<id>.leame.col.<columna>`); una columna sin clave sale solo con su nombre.

<!-- datos.leame.columnas -->
Columnas

<!-- datos.leame.procedencia -->
Cada cifra del sitio, con su base, su fórmula y su fecha, está en procedencia.csv.

<!-- fig.F32.leame.col.columna -->
Nombre de la columna en el CSV depositado.

<!-- fig.F32.leame.col.tipo -->
Entero, texto o fecha (AAAA-MM-DD).

<!-- fig.F32.leame.col.vacios -->
Filas con la celda vacía.

<!-- fig.F32.leame.col.distintos -->
Valores distintos, sin contar el vacío.

<!-- fig.F32.leame.col.filas -->
Filas del CSV depositado.

<!-- fig.F32.leame.col.fila_5423 -->
Valor en la fila {{fila.presidencia.id.V2|id}}: la Presidencia pide silencio (1 de octubre de 1931, sesión 48).

<!-- fig.F32.leame.col.fila_5424 -->
Valor en la fila {{fila.campoamor.id.V2|id}}: Clara Campoamor empieza a hablar, en la misma sesión.

<!-- fig.F33.leame.col.recuento -->
Manera de contar: nwords, split, total, habla o tendencia.

<!-- fig.F33.leame.col.palabras -->
Palabras que da ese recuento.

<!-- fig.F33.leame.col.edicion -->
Edición sobre la que se cuenta: V2 (depositada) o v3 (explorador, sin depositar).

<!-- fig.F33.leame.col.diferencia_con_nwords -->
Diferencia con la suma de la columna nwords de la V2.

<!-- fig.F33.leame.col.codigo -->
Línea de pandas que lo reproduce sobre el CSV depositado, cuando la hay.

<!-- fig.F34.leame.col.caso -->
sin_ficha: el par no tiene ficha en Afinidades Elegidas; otro_partido: la tiene, con otro rótulo de partido.

<!-- fig.F34.leame.col.rep_id -->
Identificador del diputado (rep_id en la V2, id_dip en Afinidades Elegidas).

<!-- fig.F34.leame.col.nombre -->
Nombre del diputado según la tabla de grafías del sitio.

<!-- fig.F34.leame.col.legislatura_cgocus -->
Legislatura con el rótulo del censo de Afinidades Elegidas (1933-1936 donde la V2 dice 1933-1935).

<!-- fig.F34.leame.col.filas_v2 -->
Filas de la V2 de ese par que quedan sin atributos de Afinidades.

<!-- fig.F34.leame.col.party_v2 -->
Partido más frecuente del diputado en esa legislatura, en la V2.

<!-- fig.F34.leame.col.partido_cgocus -->
Partido del diputado en esa legislatura, en Afinidades Elegidas.

---

## 9 · Erratas y contacto (`#erratas`)

<!-- datos.erratas.titulo -->
Erratas y contacto

<!-- datos.erratas.texto -->
Si encuentra un error, díganos la fecha, el número de sesión, el id de la fila con su edición y lo que dice el Diario impreso. Si no sabe por dónde empezar, escriba también.

<!-- datos.erratas.acciones -->
[Avisar de una errata] [Escribirnos]

> [nota de diseño] [Avisar de una errata] → `ENLACES.erratas`; [Escribirnos] → `hrefContacto()`. Las dos dependen de
> decisiones del investigador: D-21 (repositorio `luz`, sitio en `rodrodr.github.io/luz/`, 23-09-2026) y `contacto`
> (`src/config/enlaces.ts`). Si faltara una, `tEnlaces` marcaría el enlace sin destino y la publicación fallaría. **No se dice** en esta página: «filtre por el campo de confianza»
> (el CSV no lo tiene), el título del formulario ni que exista una muestra.
