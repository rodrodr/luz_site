# Copy ES · Sesiones y votaciones (índice), plantilla de las puertas, F26 y F30

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el copy de «Sesiones y votaciones», de las
> ocho puertas de lectura de la edición 0.1 (`sesiones_<puerta>.md`) y de «El Diario» (`diario.md`). Sigue la
> narrativa (§ 9 y § 10), que manda sobre el plan (plantillas D y E; fichas de F26 y F30), y el contrato de
> construcción, que manda sobre los dos.
>
> **Cifras.** Ninguna se teclea. Todas están en `docs/marcadores/sesiones.md`, recalculadas hoy sobre la V2 (MD5
> `360332a0…`), la v3 del explorador (sha256 `3a0d8b2d…`), los metadatos del proyecto (sha256 `b3295e99…`) y las
> bibliotecas publicadas del explorador. Las búsquedas se contaron con FTS5 sobre `speeches_fts`, como el explorador
> (misma traducción de la consulta y el mismo filtro «Solo lo que se habla»: `speaker NOT IN ('SUMARIO',
> 'COMENTARIOS')`).
>
> **Citas.** Cada cita va entre «» y es literal, copiada letra a letra de su fila V2 y comprobada en su fila v3:
> fragmentos, ids y notas en `docs/marcadores/citas.md`. Las claves de cita llevan `.cita.` en el nombre: sus cifras
> son texto del Diario, no del proyecto, y `check-i18n` no las trata como cifras tecleadas (petición en
> `docs/peticiones/sesiones.md`). Dentro de una cita solo se añade «…» (corte) y «[sic]» (errata que cambia el
> sentido); las comillas rectas del texto se escriben “ ”.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto y lo cierra la clave siguiente, un
> encabezado, una nota `>` o una regla `---`. `[corchetes]` marcan un rótulo o un enlace. `{{clave|formato}}` es una
> cifra de `src/data/cifras.json`; `{{n}}`, `{{fecha}}`… son variables que rellena el componente. `↺` marca una frase
> fija de `comun.md`, repetida idéntica. Lo que empieza por «[nota de diseño]» no es texto para el lector.
>
> **Correcciones a la narrativa** (verificadas sobre la fuente; detalle en el informe y en `peticiones/sesiones.md`):
> - el Diario imprime listas nominales en al menos 405 de las 755 sesiones (V2): las seis de F26 son una **selección**,
>   y el copy lo dice;
> - el 7-IV-1936 el Diario también imprime la mitad más uno (209 de 417, V2 102359); F26 lleva tres líneas, no dos;
> - «(Campanilla.)» no aparece en la V2: el Diario escribe «El Sr. Presidente agita la campanilla»;
> - las acotaciones «no se consigna(n) por orden» son tres, pero hay otras dos que dicen «no constan por orden»: F28
>   marca cinco acotaciones, no tres;
> - Azaña, 27-V-1932: es la fila de habla más larga en la v3, no en la V2 (en la V2 le gana una fila de Prieto con
>   un documento dentro).

---

## 2 bis. ¿Quién lo dijo? (juego)

> [nota de diseño] Juego de la petición del investigador (24-09-2026): `components/sesiones/QuienLoDijo.astro`. Reutiliza las frases ya comprobadas de «El aplausómetro» y «¿Esta o esta?» (solo las de los oradores más conocidos). Ocho citas por partida. Sin JS, una tabla.

<!-- sesiones.quien.titulo -->
¿Quién lo dijo?

<!-- sesiones.quien.entrada -->
Cada cita sale, letra a letra, de una fila de la base. Elija a su autor entre cuatro diputados.

<!-- sesiones.quien.juego.pregunta -->
¿De quién es?

<!-- sesiones.quien.juego.cuenta -->
Cita {{i}} de {{n}} · Aciertos: {{a}}

<!-- sesiones.quien.juego.bien -->
¡Exacto!

<!-- sesiones.quien.juego.mal -->
No: es de {{orador}}.

<!-- sesiones.quien.juego.quien -->
{{orador}} · {{partido}} · {{fecha}}

<!-- sesiones.quien.juego.fila -->
Fila {{id}}

<!-- sesiones.quien.juego.siguiente -->
[Siguiente]

<!-- sesiones.quien.juego.ver -->
[Ver el resultado]

<!-- sesiones.quien.juego.resumen -->
Ha acertado {{n}} de {{total}}.

<!-- sesiones.quien.juego.puesto -->
Su puesto en la Cámara:

<!-- sesiones.quien.juego.nivel.0 -->
público de la tribuna, que aplaude cuando no toca.

<!-- sesiones.quien.juego.nivel.1 -->
ujier: conoce las caras, no siempre las voces.

<!-- sesiones.quien.juego.nivel.2 -->
cronista de la tribuna de prensa.

<!-- sesiones.quien.juego.nivel.3 -->
taquígrafo: lo ha oído todo.

<!-- sesiones.quien.juego.nivel.4 -->
presidente de la Cámara: sabe quién habla sin mirar.

<!-- sesiones.quien.juego.otra -->
[Otra ronda]

<!-- sesiones.quien.juego.tabla -->
Las citas del juego y su autor

<!-- sesiones.quien.juego.tabla.col.cita -->
Cita

<!-- sesiones.quien.juego.tabla.col.quien -->
Quién y cuándo

---

## 1. Sesiones y votaciones · índice (`/es/cortes/sesiones/`)

> [nota de diseño] Unas 700 palabras de copy en `<main>`, con el registro de puertas (tope de la plantilla D: 500–700;
> recuento en el anexo A).
> Subnavegación de Las Cortes («Etapas · Sesiones y votaciones», `comun.subnav.*`), con esta página marcada. Dos
> figuras: F26 completa, con ancla `#votaciones` (la usa [Ver las votaciones] desde Inicio), y la lista de puertas en
> registro de calendario, que no es una figura. Sin índice lateral.

### 1.0 Cabecera

<!-- sesiones.meta.titulo -->
Sesiones y votaciones

<!-- sesiones.meta.descripcion -->
Lo que se votó con nombre y apellido en las Cortes de la República, momentos del Diario para leer enteros y cómo encontrar cualquier sesión.

<!-- sesiones.antetitulo -->
Las Cortes · Sesiones y votaciones

<!-- sesiones.h1 -->
¿Qué se dijo aquel día, y qué se votó?

<!-- sesiones.entrada -->
La base no trae el voto en una columna. Lo trae el Diario, en el texto de la sesión: quién dijo sí, quién dijo no y cuántos fueron.

<!-- sesiones.entrada.2 -->
Esta página enseña a leer ese texto, abre de par en par algunos momentos del Diario y explica cómo llegar a cualquier otra sesión.

### 1.1 Lo que se votó en voz alta (F26, completa) · ancla `#votaciones`

<!-- sesiones.votos.antetitulo -->
Votaciones nominales

<!-- sesiones.votos.titulo -->
Lo que se votó en voz alta

<!-- sesiones.votos.entrada -->
En una votación nominal, el Diario imprime dos listas, «Señores que dijeron sí» y «Señores que dijeron no», cada una con su total.

<!-- sesiones.votos.cuantas -->
Hay listas así en al menos {{voto.listas.sesiones}} de las {{sesiones.n}} sesiones de la base.

<!-- sesiones.votos.seleccion -->
Aquí van {{voto.n|letra}}, en {{voto.sesiones|letra}} sesiones, escogidas porque cierran debates que este sitio cuenta.

<!-- sesiones.votos.etapas.entrada -->
Estas son todas las filas con lista que encuentra esa búsqueda, etapa por etapa:

<!-- sesiones.votos.etapas -->
- Constituyentes, 1931–1933: {{etapa.I.listas_nominales.filas}} filas, en {{etapa.I.listas_nominales.sesiones}} sesiones.
- 1933–1935: {{etapa.II.listas_nominales.filas}} filas, en {{etapa.II.listas_nominales.sesiones}} sesiones.
- Cortes de 1936: {{etapa.III.listas_nominales.filas}} filas, en {{etapa.III.listas_nominales.sesiones}} sesiones.
- Las Cortes en guerra: {{etapa.IV.listas_nominales.filas|letra}} filas, en {{etapa.IV.listas_nominales.sesiones|letra}} sesiones.
- México, 1945: ninguna.

<!-- sesiones.votos.etapas.salvedad -->
Es una cota inferior: el reconocimiento óptico rompe algún encabezado, y alguno se imprime de otra manera. En Figueres, la lista empieza «Señores Diputados que dijeron SI», y la búsqueda no la ve.

> [nota de diseño] «Al menos»: la cuenta busca el encabezado de la lista sobre el texto sin acentos, y el
> reconocimiento óptico rompe alguno. `sesiones.votos.etapas` es el registro de todas por etapa que piden la narrativa
> (§9, punto 3) y el plan (anexo adversarial, R1): una lista tipográfica, no una figura, con la misma definición que
> `voto.listas.sesiones` (las cinco etapas suman 1.023 filas y 405 sesiones). «Ninguna» en México lo afirma
> `etapa.V.listas_nominales.filas` = 0; la lista de Figueres es la V2 107340 (`cortes_guerra.md`, nota 4). La tabla
> por sesión, con sus totales, va a la pestaña Datos de F26 (la escribe el exportador). F26 va aquí con sus pestañas Gráfico · Tabla · Datos y el rótulo de cada
> votación (§ 3). La ordinaria del 1-X-1931 va dentro de la figura, con otro trazo, y nunca se suma a las seis.

<!-- sesiones.votos.ordinaria -->
El mismo 1 de octubre de 1931, antes de la nominal, una votación ordinaria rechazó una proposición del grupo socialista por {{voto.141-106.si}} votos contra {{voto.141-106.no}}.

<!-- sesiones.votos.ordinaria.2 -->
De esa votación el Diario no da nombres: solo el resultado.

<!-- sesiones.votos.kent -->
En la lista del art. 34, Victoria Kent vota no y Clara Campoamor vota sí.

<!-- sesiones.votos.destitucion -->
El 7 de abril de 1936 la Cámara vota una proposición que declara innecesario el decreto de disolución de enero.

<!-- sesiones.votos.destitucion.2 -->
El artículo del Reglamento que se lee en la sesión la trata como destitución del Presidente de la República, y exige votación nominal.

<!-- sesiones.votos.destitucion.no -->
Votan no {{voto.238-5.no|letra}} diputados, y la lista los nombra: Becerra, Portela, Benítez de Lugo, Canals y Rosado.

<!-- sesiones.votos.mas -->
Las listas completas llegarán a esta misma figura en la edición 0.2, con un punto por nombre impreso.

> [nota de diseño] Los apellidos de la destitución van como los imprime la lista del Diario (V2 102358); no se
> resuelven a nombre completo en la 0.1 (peticiones/grafias_sesiones.md). `sesiones.votos.mas` anuncia lo que ya
> decidió el plan (F26 en la 0.2); no promete fecha. Llamadas bajo la figura: cada barra lleva a su puerta
> (161–121 → `sufragio-1931`; 178–59 → `cuestion-religiosa-1931`) o a su fila de la pestaña Tabla; [Descargar los
> datos de la figura] y [Descargar la imagen], en la pestaña Datos.

### 1.2 Ocho puertas de lectura

<!-- sesiones.puertas.antetitulo -->
Puertas de lectura

<!-- sesiones.puertas.titulo -->
Momentos para leer enteros

<!-- sesiones.puertas.entrada -->
Cada puerta abre un momento del Diario: qué pasó, qué dijeron, cómo se repartió la palabra y cómo encontrarlo en el explorador.

<!-- sesiones.puertas.cobertura -->
Las {{ses.puertas|letra}} puertas cubren {{ses.puertas.sesiones|letra}} sesiones, de 1931 a 1945.

<!-- ↺ comun.fija.novalida -->
Que estén no valida su contenido.

> [nota de diseño] Registro de calendario, como en Inicio: fecha en mono · título (enlace a la puerta) · una línea ·
> filas V2 al margen. Sin tarjetas ni iconos. Las siete puertas de la 0.2 no se pintan hasta que existan.

<!-- sesiones.lista.sufragio-1931.fecha --> 1-X-1931
<!-- sesiones.lista.sufragio-1931.titulo --> El voto de las mujeres
<!-- sesiones.lista.sufragio-1931.linea --> Kent pide aplazarlo; Campoamor, que se reconozca ya. La votación nominal lo aprueba.
<!-- sesiones.lista.sufragio-1931.filas --> {{sesion.1931-10-01-48.filas}} filas

<!-- sesiones.lista.cuestion-religiosa-1931.fecha --> 13-X-1931
<!-- sesiones.lista.cuestion-religiosa-1931.titulo --> «España ha dejado de ser católica»
<!-- sesiones.lista.cuestion-religiosa-1931.linea --> Azaña habla del artículo religioso. La sesión acaba a la mañana siguiente.
<!-- sesiones.lista.cuestion-religiosa-1931.filas --> {{sesion.1931-10-13-55.filas}} filas

<!-- sesiones.lista.estatuto-1932.fecha --> 27-V-1932
<!-- sesiones.lista.estatuto-1932.titulo --> El Estatuto de Cataluña
<!-- sesiones.lista.estatuto-1932.linea --> Azaña lo defiende en la intervención de habla más larga del corpus.
<!-- sesiones.lista.estatuto-1932.filas --> {{sesion.1932-05-27-173.filas}} filas

<!-- sesiones.lista.casas-viejas-1933.fecha --> 2-II-1933
<!-- sesiones.lista.casas-viejas-1933.titulo --> Casas Viejas
<!-- sesiones.lista.casas-viejas-1933.linea --> Azaña responde en la Cámara por los sucesos. Las minorías protestan.
<!-- sesiones.lista.casas-viejas-1933.filas --> {{sesion.1933-02-02-288.filas}} filas

<!-- sesiones.lista.pistola-1934.fecha --> 4-VII-1934
<!-- sesiones.lista.pistola-1934.titulo --> La pistola de Prieto
<!-- sesiones.lista.pistola-1934.linea --> Un incidente acaba en golpes, y Prieto admite que sacó su pistola. Es la última sesión antes del verano.
<!-- sesiones.lista.pistola-1934.filas --> {{sesion.1934-07-04-112.filas}} filas

<!-- sesiones.lista.antesala-1936.fecha --> 16-VI y 1-VII-1936
<!-- sesiones.lista.antesala-1936.titulo --> La antesala
<!-- sesiones.lista.antesala-1936.linea --> Dos debates sobre el orden público, semanas antes de la guerra. Hay palabras que no constan en el Diario.
<!-- sesiones.lista.antesala-1936.filas --> {{sesion.1936-06-16-45.filas}} y {{sesion.1936-07-01-54.filas}} filas

<!-- sesiones.lista.figueres-1939.fecha --> 1-II-1939
<!-- sesiones.lista.figueres-1939.titulo --> Figueres
<!-- sesiones.lista.figueres-1939.linea --> La última sesión de las Cortes en España, en el castillo de Figueras. Solo queda el extracto oficial.
<!-- sesiones.lista.figueres-1939.filas --> {{sesion.1939-02-01-69.filas}} filas

<!-- sesiones.lista.mexico-1945.fecha --> 17-VIII y 7–9-XI-1945
<!-- sesiones.lista.mexico-1945.titulo --> México
<!-- sesiones.lista.mexico-1945.linea --> En {{puerta.mexico-1945.sesiones|letra}} sesiones, Martínez Barrio promete como Presidente interino de la República y Giral presenta su Gobierno.
<!-- sesiones.lista.mexico-1945.filas --> {{puerta.mexico-1945.filas}} filas

> [nota de diseño] Las fechas del registro son de sesión y van tecleadas, como las de ParlaIbero; los números de fila
> salen de marcadores. Los títulos van sin corchetes: toda la fila es el enlace (`RegistroPuertas`).

### 1.3 Cualquier otra sesión

<!-- sesiones.otra.antetitulo -->
Cualquier otra sesión

<!-- sesiones.otra.titulo -->
Cómo encontrar una sesión en el explorador

<!-- sesiones.otra.entrada -->
Las {{sesiones.n}} sesiones están en el explorador, tal como las tiene la base.

<!-- sesiones.otra.pasos -->
Abra Filtros › Fecha y sesión y ponga la misma fecha en Desde y en Hasta. La lista enseña entonces toda la sesión, en su orden.

<!-- sesiones.otra.dobles -->
Algunos días hubo dos sesiones; pasa en {{sesiones.fechas_dobles|letra}} fechas. Para separarlas, escriba además el número en Nº de sesión.

<!-- sesiones.otra.habla -->
Si marca «Solo lo que se habla», desaparecen el sumario y los comentarios del Diario, que van en filas propias.

<!-- sesiones.otra.citar -->
Para citar una sesión, basta con su fecha y su número. Para citar un pasaje, añada el Diario, sus páginas y la fila.

> [nota de diseño] Debajo, [Abrir el explorador ↗] (`comun.boton.explorador`) con `comun.fija.explorador` y
> `comun.fija.enlace` (↺ 5). No hay [Copiar la consulta]: Desde, Hasta y Nº de sesión son filtros, no texto del
> buscador. «Para citar un pasaje» enlaza a la sección «Cómo citar un pasaje» de El Diario (`/{lang}/diario/#citar`).

### 1.4 Que esté no quiere decir que esté entera

<!-- sesiones.entera.antetitulo -->
Límites

<!-- sesiones.entera.titulo -->
Que esté no quiere decir que esté entera

<!-- sesiones.entera.entrada -->
Cada sesión está en la base tal como salió del reconocimiento óptico. Tres casos enseñan lo que eso puede costar.

<!-- sesiones.entera.s48 -->
El acta del 1 de octubre de 1931 perdió su final: las últimas {{ses.s48.cola|letra}} filas repiten «Pido la palabra.», y la última termina en «El Sr. Ministro de».

<!-- sesiones.entera.s9 -->
En la sesión del 27 de julio de 1931, una misma fila repite {{ses.s9.bucle.veces|letra}} veces seguidas «Sánchez Guerra, Ossorio y Gallardo».

<!-- sesiones.entera.paginas -->
En las {{ses.paginas_sin_verificar|letra}} sesiones posteriores a julio de 1936, las páginas del Diario están sin verificar.

<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] Tres párrafos cortos con su pie en mono, sin cajas. `comun.sello.proyecto` va como sello al lado de
> `sesiones.entera.paginas`. ↺ 7 cierra la sección, destacada. Las tres incidencias salen de `sessions.json`
> (`truncated_end`, `ocr_loop`, `page_status`) y están comprobadas en el texto de las dos ediciones.

---

## 2. Plantilla común de las puertas (`/es/cortes/sesiones/<nombre>/`)

> [nota de diseño] Orden (plan, plantilla E, y narrativa § 10): antetítulo en mono · H1 con el hecho · la pregunta
> (`sesiones.<puerta>.entrada`, la misma en todas, en plural en las de varias sesiones) ·
> Qué pasó · Lo que dice el Diario (2–5 citas) · La sesión, turno a turno (F30, con las cifras al margen) · La
> votación (F26 mínima, solo en `sufragio-1931` y `cuestion-religiosa-1931`) · Cómo encontrarla en el explorador
> (CopiarConsulta y el debate preparado) · Lo que no está · Fuentes · Cómo citar un pasaje · vecinas
> (`comun.vecinas.puerta.*`, con [Ver las sesiones y votaciones] en el centro). Tope: 500 palabras de copy por puerta.
> Las puertas de dos o más sesiones (`antesala-1936`, `mexico-1945`) llevan una F30 por sesión, con pestañas por
> fecha. `NotaBases` (↺ 13) al pie: todas las puertas dan cifras de la v3.

<!-- sesiones.puerta.que_paso -->
Qué pasó

<!-- sesiones.puerta.diario -->
Lo que dice el Diario

<!-- sesiones.puerta.turnos -->
La sesión, turno a turno

<!-- sesiones.puerta.votacion -->
La votación

<!-- sesiones.puerta.explorador -->
Cómo encontrarla en el explorador

<!-- sesiones.puerta.no_esta -->
Lo que no está

<!-- sesiones.puerta.fuentes -->
Fuentes

<!-- sesiones.puerta.citar -->
Cómo citar un pasaje

<!-- sesiones.puerta.antetitulo.paginas -->
{{sigla}} núm. {{diario}}, pp. {{paginas}}

<!-- sesiones.puerta.antetitulo.sinpaginas -->
{{serie}}, páginas sin verificar

> [nota de diseño] El antetítulo se compone así: fecha larga · «Sesión núm. {{num}}» · `comun.etapa.<id>.corto` ·
> `sesiones.puerta.antetitulo.paginas` (o `.sinpaginas`) · `comun.sello.proyecto` en cuerpo menor. `{{num}}`,
> `{{diario}}` y `{{paginas}}` salen de `sesion.<fecha>-<num>.num`, `.diario_num` y `.paginas`; `{{sigla}}` es
> «DSCCRE» o «DSC» (metadatos del proyecto, texto). En las sesiones sin páginas verificadas, `{{serie}}` es el nombre
> de la serie (`sesiones.puerta.serie.*`).

<!-- sesiones.puerta.serie.guerra --> Extracto oficial
<!-- sesiones.puerta.serie.mexico --> Extracto oficial de las sesiones celebradas en México

### 2.1 Las cifras al margen de F30

<!-- sesiones.puerta.cifras.titulo --> La sesión en cifras
<!-- sesiones.puerta.cifras.filas --> filas
<!-- sesiones.puerta.cifras.palabras --> palabras
<!-- sesiones.puerta.cifras.diputados --> diputados que hablan fuera de la Presidencia
<!-- sesiones.puerta.cifras.largas --> filas de más de {{ses.umbral.largas}} palabras
> [nota de diseño] Cinco cifras en columna, cada una con su marcador de la sesión: `sesion.<fecha>-<num>.filas`,
> `.palabras`, `.diputados_sp`, `.largas` y `.filas_v3`. La última lleva el sello v3. «Diputados» cuenta `rep_id`
> distintos fuera de la Presidencia, con el analizador de rótulos del explorador.

### 2.2 El pie de cada cita

<!-- sesiones.puerta.cita.pie -->
{{orador}}

<!-- sesiones.puerta.cita.pie.palabras -->
{{orador}} · {{palabras}} palabras

<!-- sesiones.puerta.cita.pie.solo_v3 -->
{{orador}}

<!-- sesiones.puerta.cita.sic -->
[sic]: así en el texto digitalizado.

> [nota de diseño] `{{V2}}` y `{{v3}}` son `cita.<clave>.V2` y `.v3` con formato `|id`; `{{palabras}}`,
> `cita.<clave>.palabras`. El pie `.solo_v3` es para lo que la V2 no trae como fila (sumarios y notas de volumen).
> `sesiones.puerta.cita.sic` es la nota emergente del «[sic]».

### 2.3 Cómo encontrarla

> [nota de diseño] Usa `CopiarConsulta` (`comun.consulta.*`): la consulta literal en `<code>`, los filtros con los
> nombres del explorador, el recuento fechado (`comun.consulta.recuento`, con `{{busquedas.fecha}}`), [Copiar la
> consulta], [Abrir el explorador ↗] y ↺ 5. El debate preparado se nombra como lo nombra el explorador, sin su clave.

<!-- sesiones.puerta.fecha -->
En el explorador: Filtros › Fecha y sesión, Desde y Hasta {{fecha}}.

<!-- sesiones.puerta.fecha.recuento -->
Salen {{n}} intervenciones en el explorador; con «Solo lo que se habla», {{habla}}.

<!-- sesiones.puerta.biblioteca -->
El debate preparado «{{nombre}}» está en Mis bibliotecas › Añadir bibliotecas del proyecto…

<!-- sesiones.puerta.biblioteca.recuento -->
Reúne {{n}} intervenciones de {{sesiones}} sesiones.

<!-- sesiones.puerta.biblioteca.donde -->
Los debates preparados están en el explorador, en Mis bibliotecas › Añadir bibliotecas del proyecto…, con su nombre precedido de «Debate · ».

### 2.4 Cómo citar un pasaje

<!-- sesiones.puerta.citar.entrada -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila.

<!-- sesiones.puerta.citar.sinpaginas -->
{{diario}}, {{fecha}}. Luz y Taquígrafos, {{edicion}}, fila {{id}}.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] El modelo de cita es `comun.cita.pasaje` (de `lib/cita.ts`), rellenado con la cita principal de la
> puerta. Para las sesiones sin páginas verificadas (Figueres y México) va `sesiones.puerta.citar.sinpaginas`:
> petición a `comun` para que la adopte como `comun.cita.pasaje.sinpaginas`.

---

## 3. F26 · Lo que se votó en voz alta (textos de la figura)

> [nota de diseño] Datos: `votaciones.json` (exportador, módulo `sesiones.py`). Una fila por votación, en orden de
> fecha: el tramo macizo son los que dijeron sí; el rayado, los que dijeron no. La ordinaria del 1-X-1931 va con otro
> trazo (discontinuo: el Diario no da nombres). Donde el Diario imprime el número de diputados de la Cámara, un
> contorno llega hasta ese total y una línea marca la mitad más uno: 234 de 466 (Constitución), 232 de 462 (Reforma
> agraria) y 209 de 417 (destitución). La del Estatuto no la imprime: su fila no lleva línea. Ningún texto dentro del
> SVG. Rótulos directos (sí · no) al final de cada fila: la leyenda solo explica el trazo. Tres anotaciones al
> margen de la figura (la ordinaria, Kent y Campoamor, los cinco noes de la destitución), con las claves
> `sesiones.votos.*` que ya son de la sección. En Inicio va la versión ligera (sin la ordinaria), con los rótulos de
> `inicio.md` (`FigVotaciones variante="ligera"`). Las notas emergentes tienen tres líneas: qué · cifras · fuente.

<!-- fig.F26.titulo -->
Lo que se votó en voz alta

<!-- fig.F26.pregunta -->
¿Qué se votó con nombre y apellido, y por cuánto?

<!-- fig.F26.asiento -->
{{voto.n}} votaciones escogidas · listas nominales en al menos {{voto.listas.sesiones}} de las {{sesiones.n}} sesiones

<!-- fig.F26.leyenda.aria --> Cómo se lee cada fila

<!-- fig.F26.leyenda.si --> Dijeron sí

<!-- fig.F26.leyenda.no --> Dijeron no

<!-- fig.F26.leyenda.mitad --> La mitad más uno, donde el Diario la imprime

<!-- fig.F26.leyenda.total --> Hasta el número de diputados que da el Diario

<!-- fig.F26.leyenda.ordinaria --> Votación ordinaria: el Diario da el resultado, no los nombres

<!-- fig.F26.filas.aria --> Las votaciones, por orden de fecha

<!-- fig.F26.v.141-106 --> Proposición del grupo socialista · votación ordinaria
<!-- fig.F26.v.161-121 --> Art. 34 del proyecto de Constitución: el voto de las mujeres
<!-- fig.F26.v.178-59 --> Art. 24 del proyecto de Constitución: la cuestión religiosa
<!-- fig.F26.v.368-466 --> La Constitución, votación definitiva
<!-- fig.F26.v.318-19 --> Proyecto de ley de Bases para la Reforma agraria, votación definitiva
<!-- fig.F26.v.314-24 --> Proyecto de ley de Estatuto de Cataluña, votación definitiva
<!-- fig.F26.v.238-5 --> Proposición del art. 81: la destitución del Presidente de la República

<!-- fig.F26.valor -->
{{si}} sí · {{no}} no

<!-- fig.F26.valor.ordinaria -->
{{si}} a {{no}}

<!-- fig.F26.valor.total -->
de {{total}}

<!-- fig.F26.valor.mitad -->
mitad más uno: {{mitad}}

<!-- fig.F26.nota.t -->
{{votacion}}

<!-- fig.F26.nota -->
{{si}} sí · {{no}} no · {{fecha}}

<!-- fig.F26.nota.mitad -->
{{si}} sí · {{no}} no, de {{total}} diputados; la mitad más uno, {{mitad}} · {{fecha}}

<!-- fig.F26.nota.ordinaria -->
votación ordinaria, sin lista · {{si}} a {{no}} · {{fecha}}

<!-- fig.F26.nota.b -->
«{{literal}}»

> [nota de diseño] `{{literal}}` es el texto del resultado tal como está en la fila, de `citas.json`
> (`voto.<clave>`, en `docs/marcadores/citas.md`); no se reescribe. La fila entera es la marca: clic o segundo
> toque, su puerta (141–106 y 161–121 → `sufragio-1931`; 178–59 → `cuestion-religiosa-1931`) o su fila en la
> pestaña Tabla (`#votaciones-tabla`).

<!-- fig.F26.tabla.caption --> Las votaciones de la figura, con el texto del resultado tal como lo imprime el Diario
<!-- fig.F26.tabla.votacion --> Votación
<!-- fig.F26.tabla.fecha --> Fecha
<!-- fig.F26.tabla.sesion --> Sesión
<!-- fig.F26.tabla.si --> Sí
<!-- fig.F26.tabla.no --> No
<!-- fig.F26.tabla.mitad --> Mitad más uno
<!-- fig.F26.tabla.V2 --> Fila
<!-- fig.F26.tabla.literal --> Texto del resultado en el Diario
<!-- fig.F26.tabla.ordinaria --> ordinaria

<!-- fig.F26.minima.tabla --> La tabla, con el texto del resultado en el Diario

<!-- fig.F26.salvedad -->
Son {{voto.n|letra}} votaciones escogidas, no todas: el Diario imprime listas nominales en al menos {{voto.listas.sesiones}} sesiones. Las listas están en el texto, no en una columna: la base no trae el voto como variable.

<!-- fig.F26.alt -->
Barras de {{voto.n|letra}} votaciones nominales y una ordinaria, de 1931 a 1936, con los votos a favor y en contra de cada una. Los valores están en la pestaña «Tabla».

<!-- fig.F26.datos.votaciones -->
Las votaciones de la figura, con sus totales y el texto del resultado.

<!-- fig.F26.datos.listas -->
Todas las sesiones con listas nominales: fecha, número, filas con lista y sus ids.

<!-- fig.F26.leame.que_mide -->
Los votos a favor y en contra de {{voto.n|letra}} votaciones nominales y una ordinaria, tal como los imprime el Diario de Sesiones.

<!-- fig.F26.leame.denominador -->
No hay denominador común. Donde el Diario imprime el número de diputados y la mitad más uno, van en sus columnas; donde no, quedan vacías.

<!-- fig.F26.leame.columnas -->
votacion, fecha, num_session, legislatura, si, no, total, mitad_mas_uno, nominal (sí/no), id_V2, id_v3, literal.

<!-- fig.F26.leame.salvedad -->
Selección editorial de {{voto.n|letra}} votaciones escogidas: el Diario imprime listas nominales en al menos {{voto.listas.sesiones}} sesiones. Los totales se leen en el texto de la fila; la base no trae el voto como columna.

---

## 4. F30 · La sesión, turno a turno (textos de la figura)

> [nota de diseño] Datos: las filas V2 de la sesión en su orden (`order`, `speaker`, `rep_id`, `nwords`), con el
> papel de la Presidencia calculado por el motor del explorador y el nombre con su grafía (`puertas.json`). Una barra
> por fila, con la altura de sus palabras y la misma escala en toda la puerta. Quien tiene la palabra, encima de la
> línea; la Presidencia, debajo: así la diferencia no depende del color. Una línea fina marca las filas largas (más de
> 300 palabras, `ses.umbral.largas`). En la sesión 48, las filas V2 5788–5792 van con trama. En la del 27-V-1932, la
> barra de V2 25979 cae del lado de la Presidencia, porque así la trae la V2, y su nota lo dice. Las puertas de varias
> sesiones llevan un panel por sesión, con la misma escala. Sin CSV por fila (plan, anexo V10; D-23).

<!-- fig.F30.titulo -->
Las filas de la sesión: quien habla, encima; la Presidencia, debajo

<!-- fig.F30.pregunta -->
¿Cómo se repartió la palabra en esta sesión?

<!-- fig.F30.pregunta.varias -->
¿Cómo se repartió la palabra en estas sesiones?

<!-- fig.F30.leyenda.aria --> Cómo se lee cada panel

<!-- fig.F30.leyenda.orador --> Encima de la línea, cada fila de quien tiene la palabra

<!-- fig.F30.leyenda.presidencia --> Debajo, las de la Presidencia

<!-- fig.F30.leyenda.larga --> Más de {{ses.umbral.largas}} palabras

<!-- fig.F30.leyenda.truncada --> Bajo el corchete, el final repetido del acta digitalizada

<!-- fig.F30.rotulo.truncada --> final repetido

<!-- fig.F30.cifras.aria --> La sesión en cifras

<!-- fig.F30.panel -->
Sesión núm. {{num}}

<!-- fig.F30.eje.orden --> orden {{orden}}

<!-- fig.F30.eje.palabras --> {{n}} palabras

<!-- fig.F30.eje.unidad --> palabras

<!-- fig.F30.presidencia --> Presidencia

<!-- fig.F30.nota.t -->
{{orador}}

<!-- fig.F30.nota -->
orden {{orden}} · {{palabras}} palabras

<!-- fig.F30.nota.truncada -->
Final repetido del acta: «Pido la palabra.»

<!-- fig.F30.nota.estatuto -->
A nombre de «El Sr. PRESIDENTE»: dentro va el discurso de Azaña

<!-- fig.F30.tabla.caption --> Las filas de la sesión, en su orden
<!-- fig.F30.tabla.orden --> Orden
<!-- fig.F30.tabla.orador --> Quién habla
<!-- fig.F30.tabla.palabras --> Palabras
<!-- fig.F30.tabla.V2 --> Fila
<!-- fig.F30.tabla.rotulo --> Sin diputado: rótulo del Diario

<!-- fig.F30.salvedad -->
Una fila cada vez que el etiquetado reconoce la fórmula impresa de un orador.

<!-- fig.F30.alt -->
Barras de las {{n}} filas de la sesión del {{fecha}}, en su orden, con la altura según sus palabras. Los valores están en la pestaña «Tabla».

<!-- fig.F30.datos.texto -->
Esta figura no tiene descarga propia: serían las filas de una sesión, no datos agregados.

<!-- fig.F30.datos.explorador -->
La sesión entera, con su texto, está en el explorador: Filtros › Fecha y sesión, con la misma fecha en Desde y en Hasta. Desde esa lista, Exportar la descarga con su cita; sus ids son los del explorador.

<!-- fig.F30.leame.que_mide -->
Las palabras de cada fila de una sesión, en el orden del Diario, según la base.

<!-- fig.F30.leame.denominador -->
Las filas de la sesión. El papel de la Presidencia sale del mismo analizador de rótulos que usa el explorador.

<!-- fig.F30.leame.salvedad -->
Orden e id de cada fila, tal como están en la base.

> [nota de diseño] La tabla lleva cuatro columnas (plan, anexo V3): orden, quién habla, palabras y fila V2. Quién
> habla: el nombre con su grafía; si la fila es de la Presidencia, «Presidencia · <apellido>»; si no tiene diputado,
> el rótulo del Diario. En las puertas de varias sesiones, una tabla por sesión, plegada. Teclado: la isla recorre las
> barras de una en una.

---

## Anexo A · Recuentos y comprobaciones (no se publica)

- **Palabras de copy en `<main>` del índice** (§ 1, sin rótulos de figura ni pies en mono, con el registro de
  puertas): 699. Tope 500–700. Puertas: entre 371 y 477 cada una (tope 500).
- **Frases de más de 30 palabras:** ninguna (comprobado con `wc` frase a frase).
- **Una magnitud por frase:** sí, salvo los pies en mono (ids V2 · v3), que no son frases.
- **Palabras vetadas** (plan, § Palabras y cifras vetadas): ninguna. «Presidencia» aparece como cargo, nunca como
  promesa de cabecera de sesión del explorador.
- **Marcadores usados en este archivo:** todos declarados en `docs/marcadores/sesiones.md`, salvo los de otros
  dueños, que se listan allí en su sección y con su valor de hoy.
