# Copy ES · Versiones (`/[lang]/datos/versiones/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Método», «Usar los datos» y
> «Versiones». Sigue la narrativa §14 y la plantilla I del plan. Marcadores: `docs/marcadores/versiones.md` (los
> implementa `exportador/modulos/datos.py`, dueño de F25, F18 y F07).
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `{{marcador}}`.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (recalculado hoy sobre las fuentes):
> 1. **F25** se comprobó comparando el CSV de la V1 depositada (MD5 `0a9adafe…`, copia local idéntica) con el de la
>    V2: solo cambian `date` (894 filas) y `legislature` (91 filas), en las siete sesiones del changelog. El texto no
>    cambia. La V1.1 no tocó el CSV (el mismo MD5 que la V1.0): solo la licencia.
> 2. **F18**: 121.700 = 107.556 piezas de habla + 735 turnos rescatados + 12.654 comentarios + 755 sumarios, leído en
>    `mapa_v2_v3.json` y en la v3 servida. Las 107.556 piezas salen de 107.282 filas de la V2 (269 filas eran solo
>    comentario) más 274 continuaciones. Se da la cifra exacta de turnos (ver `metodo.md`, nota 5).
> 3. **F07**, recalculado en la v3 servida: Besteiro −55,4 %, Alba −67,0 %, Negrín +26,5 %. El documento del proyecto
>    (`RESEGMENTACION.md`) da otros valores para Besteiro y Alba (−55 % y −66 %, sobre una versión anterior de la v3);
>    manda la v3 que sirve el explorador. Lo de Negrín se comprobó: sus cinco turnos rescatados salen de filas de la
>    Presidencia del 1-X-1937 y del 1-II-1938.
> 4. **«Hemos pedido al autor que corrija la cita del explorador»** no se escribe: D-18 se decidió (23-09-2026) como
>    aviso en la página, sin tocar el explorador. La página dice el hecho y qué hacer.

---

## Metadatos

<!-- versiones.meta.titulo -->
Versiones

<!-- versiones.meta.descripcion -->
Qué cambió en cada versión depositada, qué es la edición del explorador, adónde va cada fila y qué base usa cada figura del sitio.

> [nota de diseño] Subnavegación «Usar los datos · Versiones». Índice lateral con los seis apartados
> (`versiones.indice.*`). La página lleva `<NotaBases>`: F18 y F07 citan la v3. Los cuatro sellos (↺ 2) son los de
> `comun.md` (`comun.sello.<base>`); aquí se repiten para leerlos en su sitio. Bajo la entrada, `versiones.donde.*`: una lista corta, sin tarjetas, que cada
> sello de base ilustra en pequeño.

## Sellos de base (↺ 2)

<!-- ↺ comun.sello.V2 -->
Edición depositada (V2)

<!-- ↺ comun.sello.v3 -->
Edición del explorador (v3, sin depositar)

<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- ↺ comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, depositada)

## Índice lateral

<!-- versiones.indice.titulo -->
En esta página

<!-- versiones.indice.depositadas -->
Versiones depositadas

<!-- versiones.indice.v3 -->
La edición del explorador

<!-- versiones.indice.resultado -->
Qué cambia en un resultado

<!-- versiones.indice.ids -->
Identificadores

<!-- versiones.indice.bases -->
Qué base usa cada figura

<!-- versiones.indice.citar -->
Cómo citar cada edición

## Cabecera

<!-- versiones.antetitulo -->
Depositada: THQCMI {{dv.version}} · explorador: v3, sin depositar

<!-- versiones.titulo -->
¿Qué edición cito, y por qué hay dos cifras?

<!-- versiones.entrada -->
El CSV que usted descarga y la base que sirve el explorador no son la misma edición. Esta página dice qué cambió, adónde va cada fila y qué base usa cada figura.

<!-- versiones.entrada.2 -->
Ninguna de las dos es «la buena». Una está depositada y se cita con su DOI; la otra corrige defectos de la primera y todavía no lo está.

<!-- versiones.donde.titulo -->
Qué edición ve usted en cada sitio

<!-- versiones.donde.texto -->
- **Harvard Dataverse** entrega la edición depositada, la V2.0.
- **El explorador** sirve la v3, sin depositar.
- **Este sitio** usa la V2 por defecto. Donde usa la v3, lo dice junto a la cifra.
- **La aplicación de Afinidades Elegidas** usa los archivos de CGOCUS V1.1, la versión depositada.
- **Los metadatos de sesión** del proyecto (Diario, páginas, presidente titular y Gobierno) no están depositados ni se ven en el explorador.

---

## 1 · Tres versiones depositadas (F25, `#fechas`)

<!-- versiones.depositadas.titulo -->
{{dv.thqcmi.versiones|letra}} versiones depositadas

<!-- versiones.depositadas.entrada -->
La base tiene {{dv.thqcmi.versiones|letra}} versiones en Harvard Dataverse. La vigente es la {{dv.version}}.

<!-- versiones.depositadas.tabla.col.version -->
Versión

<!-- versiones.depositadas.tabla.col.fecha -->
Publicada

<!-- versiones.depositadas.tabla.col.licencia -->
Licencia

<!-- versiones.depositadas.tabla.col.cambio -->
Qué cambió

<!-- versiones.depositadas.v10 -->
Primera publicación.

<!-- versiones.depositadas.v11 -->
Cambio de licencia. El CSV es el mismo.

<!-- versiones.depositadas.v20 -->
Fechas corregidas. Añade los changelogs en español y en inglés.

<!-- versiones.depositadas.texto -->
De la V1 a la V2 solo cambian dos columnas, `date` y `legislature`. El texto, los identificadores y las demás columnas quedan igual.

Cambiaron {{fechas.sesiones|letra}} sesiones, que suman {{fechas.filas}} filas. En una, la sesión 77, cambió también la legislatura.

**Si trabajó con la V1.** Sus recuentos de filas y de palabras no cambian. Cambian los que dependen de la fecha o de la legislatura.

Por legislatura, {{fechas.filas.legislatura}} filas pasan de la primera a la segunda: son las de la sesión 77. Por mes, cambian los meses de las {{fechas.sesiones|letra}} fechas corregidas.

El README es el mismo desde la primera versión, y describe aquella.

**Lo que la V2 trae sin corregir.** El sitio lo declara y no lo cambia: corregir el depósito es tarea de su autor.

- Diego Martínez Barrio figura en el partido AR en 1931-1933, en {{pendiente.martinez_barrio_ar.filas}} filas.
- La familia «Liberal», con {{familias.liberal.filas}} filas, va aparte de «Liberales»; el explorador las funde.
- La Lliga es CD en {{pendiente.lliga_cd.filas}} filas del CSV, y D en el README.
- El identificador {{rep836.id|id}} lleva dos nombres distintos.
- El README cuenta {{etiquetas.diferencia|letra}} etiquetas más que filas tiene el CSV, sin explicar la diferencia.
- {{v3.turnos}} turnos quedaron dentro de la fila anterior; la v3 los separa.

> [nota de diseño] D-25 (decisión del director, 23-09-2026): los pendientes de datos se declaran aquí, con su cifra,
> y no se corrigen en origen. Método (08, 06) y Usar los datos (`rep_id`) dicen lo mismo en su sitio. Si el autor
> corrige uno en un depósito nuevo, se quita su línea.

<!-- ↺ comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- versiones.depositadas.metodo -->
[Ver cómo se auditaron las fechas]

> [nota de diseño] La tabla de versiones se genera de la instantánea `dv_thqcmi_versiones.json` (versión, fecha de
> publicación con `|fecha_larga`, licencia tal como la da Dataverse) con los textos `versiones.depositadas.v10`, `v11`
> y `v20`. Bajo la tabla va F25. [Ver cómo se auditaron las fechas] → `metodo/#metodo-07`.

<!-- fig.F25.titulo -->
{{fechas.sesiones|letra}} fechas corregidas

<!-- fig.F25.pregunta -->
¿Qué cambió de la V1 a la V2?

<!-- fig.F25.que_mide -->
Cada sesión que la V1 fechaba mal, con su fecha en la V1 y su fecha corregida en la V2.

<!-- fig.F25.denominador -->
Las {{sesiones}} sesiones, auditadas una a una.

<!-- fig.F25.eje -->
Fecha de la sesión

<!-- fig.F25.leyenda.v1 -->
Fecha en la V1

<!-- fig.F25.leyenda.v2 -->
Fecha en la V2

<!-- fig.F25.nota -->
Sesión {{num}} · {{fecha_v1}} → {{fecha_v2}}

<!-- fig.F25.nota.cifras -->
{{filas}} filas · V2 {{ids}}

<!-- fig.F25.nota.legislatura -->
También cambia de legislatura: {{leg_v1}} → {{leg_v2}}.

<!-- fig.F25.prueba.cabeceras -->
Las cabeceras corridas de sus páginas dicen la fecha corregida.

<!-- fig.F25.prueba.errata -->
La cabecera de la sesión tiene una errata de imprenta.

<!-- fig.F25.prueba.danada -->
La cifra del día está dañada en la cabecera de la sesión, y la lectura óptica la leyó mal.

<!-- fig.F25.prueba.portada -->
La fecha de la V1 salía de la portada del tomo, que dice cuándo empezaron esas Cortes.

<!-- fig.F25.prueba.serie -->
El número pertenece a la serie del Diario de 1933-1935, no a la de las Constituyentes.

<!-- fig.F25.dias -->
{{dias}} días

<!-- fig.F25.tabla.col.sesion -->
Sesión

<!-- fig.F25.tabla.col.v1 -->
Fecha en la V1

<!-- fig.F25.tabla.col.v2 -->
Fecha en la V2

<!-- fig.F25.tabla.col.filas -->
Filas

<!-- fig.F25.tabla.col.ids -->
Identificadores

<!-- fig.F25.tabla.col.prueba -->
Por qué

<!-- fig.F25.salvedad -->
La auditoría no detecta un error de fecha coherente con la secuencia. El changelog depositado da los rangos de filas; su tabla de pruebas no está depositada.

<!-- fig.F25.alt -->
Flechas sobre una línea de tiempo, de la fecha que daba la V1 a la fecha corregida en la V2, una por sesión.

> [nota de diseño] **F25**: flechas sobre la línea de tiempo 1931–1934, de la fecha V1 a la V2 (`fechas_corregidas`,
> del exportador: sesión, legislatura V1 y V2, fecha V1 y V2, ids, filas y prueba). Una parada de teclado por sesión.
> Cada sesión lleva una o dos pruebas (`fig.F25.prueba.*`), según `AUDITORIA_FECHAS.md`: s52 y s78, `cabeceras` +
> `danada`; s293, s295 y s311, `cabeceras` + `errata`; s321, `cabeceras` + `portada`; s77, `cabeceras` + `serie`. En
> la tabla, la columna Identificadores va con `|id`, sin agrupar. Pestañas Tabla · Datos (↺ 12).

---

## 2 · La edición del explorador (F18, `#destino-filas`)

<!-- versiones.v3.titulo -->
La edición del explorador

<!-- versiones.v3.entrada -->
El explorador no sirve el CSV depositado. Sirve la v3: la misma fuente, partida de otra manera.

<!-- versiones.v3.texto -->
La v3 parte de la V2 y corrige su segmentación: rescata turnos enterrados y separa lo que no es habla (Método, «Dos ediciones»).

No cambia el texto. Cada pieza de la v3 es un tramo literal de una fila de la V2.

Tiene las mismas {{sesiones}} sesiones, con la misma fecha y el mismo número. Añade el sumario de cada sesión, que la V2 no traía.

Tiene {{filas.v3}} filas. No está depositada, y sus identificadores no son los de la V2.

**Cómo se hizo.** La v3 sale de dos auditorías del proyecto. Una buscó turnos que la V2 no separó; otra, material impreso dentro de las filas.

Las correcciones se aplicaron sobre el texto original, en este orden: las fechas, los cortes de turno y los bloques impresos.

Las palabras de cada fila de la V2 se reparten entre sus piezas en proporción a su texto. Por eso suman lo mismo en las dos ediciones.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- fig.F18.titulo -->
Adónde van las filas de la V2

<!-- fig.F18.pregunta -->
¿Qué diferencia hay entre lo depositado y lo que sirve el explorador?

<!-- fig.F18.tabla.col.que -->
Qué es

<!-- fig.F18.tabla.col.filas -->
Filas de la v3

<!-- fig.F18.tabla.col.origen -->
De dónde sale

<!-- fig.F18.fila.habla -->
Piezas de habla

<!-- fig.F18.fila.habla.origen -->
De las filas de la V2, partidas donde empieza otro turno o un bloque impreso

<!-- fig.F18.fila.turnos -->
Turnos rescatados

<!-- fig.F18.fila.turnos.origen -->
Turnos que la V2 dejaba dentro de la fila anterior

<!-- fig.F18.fila.comentarios -->
Comentarios del Diario

<!-- fig.F18.fila.comentarios.origen -->
Tablas, listas, documentos y relato impresos dentro de las filas de la V2

<!-- fig.F18.fila.sumarios -->
Sumarios

<!-- fig.F18.fila.sumarios.origen -->
Lo que el Diario imprime antes del primer orador, uno por sesión; la V2 no lo traía

<!-- fig.F18.fila.total -->
Total

<!-- fig.F18.nota.piezas -->
Las piezas de habla salen de {{v3.filas_v2_con_habla}} filas de la V2. Las demás, {{v3.filas_v2_solo_comentario}}, eran solo comentario.

<!-- fig.F18.nota.continuaciones -->
Otras {{v3.piezas_extra}} piezas continúan el habla de su orador después de un bloque impreso.

<!-- fig.F18.nota.habla -->
Con «Solo lo que se habla», el explorador deja {{habla.v3}} filas: las piezas de habla y los turnos rescatados.

<!-- fig.F18.nota.palabras -->
Las palabras de la V2 se reparten entre las piezas y suman lo mismo. Los sumarios añaden {{palabras.sumarios.v3}}.

<!-- fig.F18.que_mide -->
Las filas de la edición del explorador, repartidas por lo que son: habla, turnos rescatados, comentarios del Diario y sumarios.

<!-- fig.F18.denominador -->
Las {{filas.v3}} filas de la v3.

<!-- fig.F18.tabla.col.parte -->
Parte

<!-- fig.F18.tabla.col.palabras -->
Palabras

<!-- fig.F18.salvedad -->
Los documentos del proyecto no dan el mismo recuento de turnos rescatados; aquí va el de la v3 que sirve el explorador. La correspondencia fila a fila no está publicada.

<!-- fig.F18.alt -->
Tabla que reparte las filas de la edición del explorador en piezas de habla, turnos rescatados, comentarios del Diario y sumarios.

> [nota de diseño] **F18 va como tabla con nota, no como diagrama de flujo** (plan: C5 y C6 siguen abiertos). Filas y
> valores: `fig.F18.fila.habla` {{v3.piezas_habla}} · `turnos` {{v3.turnos}} · `comentarios` {{v3.comentarios}} ·
> `sumarios` {{v3.sumarios}} · `total` {{filas.v3}}; la compilación falla si los cuatro no suman el total. Debajo, las
> notas `fig.F18.nota.*`. Sin pestañas; [Descargar los datos de la figura] con ↺ 12. Sello ↺ 2 v3.

---

## 3 · Qué cambia en un resultado (F07, `#quien-habla`)

<!-- versiones.resultado.titulo -->
¿Qué cambia en un resultado?

<!-- versiones.resultado.entrada -->
La misma pregunta da otra respuesta en cada edición. Es la mejor prueba de que importa cuál se usa.

<!-- versiones.resultado.texto -->
En la V2, Julián Besteiro suma {{orador.besteiro.palabras.V2}} palabras. De ellas, {{orador.besteiro.presidencia.V2}} están en filas de la Presidencia.

Santiago Alba, Presidente de la Cámara en la segunda legislatura, suma {{orador.alba.palabras.V2}}.

En la v3, Besteiro pierde el {{orador.besteiro.perdida|pct1}} de sus palabras. Alba pierde el {{orador.alba.perdida|pct1}}.

Eran turnos de otros oradores y material impreso que la V2 dejaba en las filas de quien presidía.

Sin la Presidencia, en la V2 encabeza Indalecio Prieto, con {{orador.prieto.sp.V2}} palabras. Pero su fila más larga es, sobre todo, tablas impresas.

En la v3, sin la Presidencia, encabeza Antonio Royo Villanova, con {{orador.royo.sp.v3}}.

Juan Negrín gana en la v3 el {{orador.negrin.ganancia|pct1}}. La v3 le devuelve discursos de la guerra que la V2 ponía a nombre de la Presidencia.

**Qué hacer con la V2.** Cualquier recuento de oradores sobre la V2 debe quitar antes la Presidencia. Y conviene leer sus filas más largas antes de sumarlas.

<!-- fig.F07.titulo -->
¿Quién habla más? Depende de la edición

<!-- fig.F07.pregunta -->
¿Por qué Besteiro y Alba «hablan» más que nadie en la V2?

<!-- fig.F07.que_mide -->
Filas o palabras a nombre de cada diputado en la V2 y en la v3, para los diez que más suman en la V2.

<!-- fig.F07.denominador -->
Todas las filas de cada edición, con la Presidencia incluida.

<!-- fig.F07.conmutador.leyenda -->
Contar

<!-- fig.F07.conmutador.filas -->
Filas

<!-- fig.F07.conmutador.palabras -->
Palabras

<!-- fig.F07.leyenda.v2 -->
Edición depositada (V2)

<!-- fig.F07.leyenda.v3 -->
Edición del explorador (v3)

<!-- fig.F07.leyenda.presidencia -->
De ellas, en filas de la Presidencia

<!-- fig.F07.nota -->
{{nombre}} · V2: {{v2}} · v3: {{v3}} · {{cambio}}

<!-- fig.F07.nota.presidencia -->
En la V2, «El Sr. PRESIDENTE:» va a nombre de quien preside: así empieza, por ejemplo, la fila {{fila.presidencia.id.V2|id}}, de Besteiro.

<!-- fig.F07.tabla.col.nombre -->
Diputado

<!-- fig.F07.tabla.col.v2 -->
V2

<!-- fig.F07.tabla.col.v2_presidencia -->
V2, en la Presidencia

<!-- fig.F07.tabla.col.v3 -->
v3

<!-- fig.F07.tabla.col.cambio -->
Cambio

<!-- fig.F07.salvedad -->
Es la figura de por qué importan las ediciones, no una medida de importancia.

<!-- fig.F07.alt -->
Barras dobles para diez diputados, V2 y v3 lado a lado. Besteiro y Alba encabezan la V2 y caen en la v3; los demás apenas cambian.

> [nota de diseño] **F07**: barras dobles por persona, **en orden fijo por las palabras de la V2** (los diez primeros:
> Besteiro, Alba, Prieto, Royo Villanova, Azaña, Guerra del Río, Balbontín, Lamamié de Clairac, Casanueva y Jiménez
> Fernández, con la grafía de `grafias.json`; nunca el `rep_name` crudo). Conmutación Filas · Palabras (radios). La
> parte en la Presidencia va rayada dentro de la barra V2 (otro trazo, no solo otro color). Nota emergente
> `fig.F07.nota` (`{{cambio}}` con signo y `pct1`); en Besteiro y Alba, además, `fig.F07.nota.presidencia`. Pestañas:
> Tabla · Datos (los {{diputados.V2}} diputados, en la V2 y en la v3). Negrín no está entre los diez: su caso va en
> el texto. Sello doble (↺ 2 v2 y v3); la página lleva `<NotaBases>`. Ningún ranking de este tipo sale de esta página
> ni de las fichas; en Inicio, nunca.

---

## 4 · Identificadores (`#identificadores`)

<!-- versiones.ids.titulo -->
Identificadores

<!-- versiones.ids.entrada -->
La sesión es la clave común de las dos ediciones. La fila, no.

<!-- versiones.ids.texto -->
Las dos ediciones tienen las mismas {{sesiones}} sesiones, con la misma fecha y el mismo número. Cruzarlas por sesión es seguro.

Las filas no coinciden: la v3 las renumera todas. La correspondencia fila a fila existe en el proyecto, pero no está publicada.

Un ejemplo: Campoamor es la fila {{fila.campoamor.id.V2|id}} de la V2 y la {{fila.campoamor.id.v3|id}} de la v3.

Para citar, dé la fecha y el número de sesión, y el id con su edición: «V2, fila…» o «v3, fila…».

Para llevar al CSV una intervención del explorador, busque la sesión por fecha y número. Dentro de ella, localice el comienzo del texto.

<!-- versiones.ids.tabla.titulo -->
Una sesión, dos ediciones

<!-- versiones.ids.tabla.col.que -->
Qué

<!-- versiones.ids.tabla.fila.sesion -->
La sesión, por su fecha y su número

<!-- versiones.ids.tabla.fila.presidencia -->
La Presidencia pide silencio

<!-- versiones.ids.tabla.fila.campoamor -->
Campoamor empieza a hablar

<!-- versiones.ids.tabla.fila.orden -->
Lugar de Campoamor en la sesión

<!-- versiones.ids.tabla.sesion -->
1 de octubre de 1931, sesión 48, en las dos

<!-- versiones.ids.tabla.igual -->
la misma

<!-- versiones.ids.tabla.pantalla -->
«Orden {{fila.campoamor.orden.pantalla|id}}» en la pantalla

<!-- versiones.depositadas.vigente -->
vigente

---

## 5 · Qué base usa cada figura (F35, `#bases`)

<!-- versiones.bases.titulo -->
¿De qué base sale cada figura?

<!-- versiones.bases.entrada -->
Cada figura dice su base junto a su título. Esta tabla las reúne, con la huella de cada base y la fecha de cálculo. Tres conservan su número sin llevar las pestañas Gráfico, Tabla y Datos. F18 y F19 son su propia tabla; F26, en Inicio y en las puertas, es una versión reducida de la de Sesiones.

<!-- fig.F35.titulo -->
Qué base usa cada figura

<!-- fig.F35.tabla.col.figura -->
Figura

<!-- fig.F35.tabla.col.pagina -->
Página

<!-- fig.F35.tabla.col.base -->
Base

<!-- fig.F35.tabla.col.archivo -->
Datos

<!-- fig.F35.tabla.col.huella -->
Huella de la base

<!-- fig.F35.tabla.col.fecha -->
Calculada

<!-- fig.F35.huella.V2 -->
MD5 del CSV depositado

<!-- fig.F35.huella.v3 -->
sha256 de la base del explorador

<!-- fig.F35.huella.proyecto -->
sha256 de los metadatos de sesión

<!-- fig.F35.huella.afin -->
Versión depositada de CGOCUS

<!-- fig.F35.huella.croquis -->
sha256 del croquis

<!-- fig.F35.sin_datos -->
Sin datos descargables

<!-- fig.F35.pagina.inicio -->
Inicio

<!-- fig.F35.pagina.cortes -->
Las Cortes

<!-- fig.F35.pagina.etapa -->
Fichas de etapa

<!-- fig.F35.pagina.sesiones -->
Sesiones y votaciones

<!-- fig.F35.pagina.puerta -->
Puertas de sesión

<!-- fig.F35.pagina.diario -->
El Diario

<!-- fig.F35.pagina.metodo -->
Método

<!-- fig.F35.pagina.datos -->
Usar los datos

<!-- fig.F35.pagina.versiones -->
Versiones

<!-- fig.F35.pagina.explorador -->
El explorador

<!-- fig.F35.pagina.afinidades -->
Afinidades Elegidas

<!-- fig.F35.base.V2 -->
V2

<!-- fig.F35.base.v3 -->
v3

<!-- fig.F35.base.proyecto -->
Proyecto

<!-- fig.F35.base.afin -->
CGOCUS V1.1

<!-- fig.F35.base.croquis -->
Croquis

<!-- fig.F35.huellas.titulo -->
Las huellas de cada base

<!-- fig.F35.alt -->
Tabla con cada figura del sitio, su página, la base de la que sale, sus datos, la huella de esa base y la fecha de cálculo.

> [nota de diseño] Figuras sin pestañas (decisión del director, 23-09-2026): F18, F19 y las variantes ligera y mínima
> de F26 conservan su número F, porque F35 y el LÉAME lo usan; `versiones.bases.entrada` dice cuáles son.
>
> [nota de diseño] **F35** se genera de `lib/figuras.ts` (id, ruta, ancla, base, archivos) y de `src/data/sello.json`
> (huella y fecha). La columna Base usa los sellos ↺ 2 (`comun.sello.*`, más «Croquis» para el hemiciclo). No
> lleva salvedad: es la salvedad de todas. El título de cada figura sale de su `fig.<id>.titulo`, con enlace a su
> ancla.

---

## 6 · Cómo citar cada edición (`#citar`)

<!-- versiones.citar.titulo -->
Cómo citar cada edición

<!-- versiones.citar.texto -->
**La V2.** Con su DOI y su versión, tal como la da Harvard Dataverse. Es la que se debe citar para cualquier cifra calculada sobre el CSV.

**La v3.** No tiene DOI. Cite el explorador con su dirección y la fecha de consulta, y diga que sirve la v3, sin depositar.

La cita que el explorador añade a lo que exporta dice «Harvard Dataverse, V2», pero sus identificadores son de la v3. Corríjala antes de publicar.

**Los metadatos de sesión** (Diario, páginas, presidente titular y Gobierno) no están depositados. Cítelos como metadatos del proyecto.

<!-- versiones.citar.enlace -->
[Ver cómo citar]

> [nota de diseño] [Ver cómo citar] → `datos/#citar`, donde están las citas completas en texto, BibTeX y RIS. D-18
> (la cita del explorador) se resuelve con el aviso: el texto dice el hecho y qué hacer, y no promete un cambio.

---

## LÉAME de las figuras de Versiones (columnas de cada CSV)

<!-- fig.F25.leame.col.num_session -->
Número de la sesión en su legislatura.

<!-- fig.F25.leame.col.legislatura_v1 -->
Legislatura que daba la V1.

<!-- fig.F25.leame.col.legislatura_v2 -->
Legislatura en la V2.

<!-- fig.F25.leame.col.fecha_v1 -->
Fecha que daba la V1 (AAAA-MM-DD).

<!-- fig.F25.leame.col.fecha_v2 -->
Fecha corregida en la V2 (AAAA-MM-DD).

<!-- fig.F25.leame.col.dias -->
Días entre las dos fechas, con signo.

<!-- fig.F25.leame.col.id_min -->
Primer id de la sesión en la V2.

<!-- fig.F25.leame.col.id_max -->
Último id de la sesión en la V2.

<!-- fig.F25.leame.col.filas -->
Filas de la sesión.

<!-- fig.F25.leame.col.prueba -->
Las pruebas de la corrección. `cabeceras`: las cabeceras corridas dicen la fecha corregida. `danada`: la cifra del día está dañada en la cabecera de la sesión. `errata`: esa cabecera trae una errata de imprenta. `portada`: la V1 tomó la fecha de la portada del tomo. `serie`: el número es de la serie de 1933-1935.

<!-- fig.F18.leame.col.clase -->
habla, turnos (turnos rescatados), comentarios (material impreso del Diario), sumarios, o el total.

<!-- fig.F18.leame.col.filas_v3 -->
Filas de la v3 de esa clase.

<!-- fig.F18.leame.col.palabras_v3 -->
Palabras (nwords) de esas filas en la v3.

<!-- fig.F18.leame.col.base -->
Edición de la que sale la cifra.

<!-- fig.F07.leame.col.rep_id -->
Identificador del diputado en la V2 y en la v3.

<!-- fig.F07.leame.col.nombre -->
Nombre del diputado según la tabla de grafías del sitio.

<!-- fig.F07.leame.col.filas_v2 -->
Filas a su nombre en la V2, con la Presidencia incluida.

<!-- fig.F07.leame.col.palabras_v2 -->
Palabras (nwords) de esas filas en la V2.

<!-- fig.F07.leame.col.filas_v2_presidencia -->
De ellas, filas de la Presidencia (según el analizador de fórmulas del explorador).

<!-- fig.F07.leame.col.palabras_v2_presidencia -->
Palabras de esas filas de la Presidencia.

<!-- fig.F07.leame.col.filas_v3 -->
Filas a su nombre en la v3, todas las piezas.

<!-- fig.F07.leame.col.palabras_v3 -->
Palabras de esas filas en la v3.

<!-- fig.F07.leame.col.cambio_palabras -->
`palabras_v3 / palabras_v2 − 1`, como proporción.
