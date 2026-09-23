# Copy ES · Ficha III · Las Cortes de 1936, hasta la guerra (`/[lang]/cortes/1936/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_b** (fichas III, IV y V).
> Sigue la narrativa §8.3 y la plantilla C del plan (tope: 1.000–1.200 palabras de copy para el lector). Reutiliza sin
> redefinirlas las claves comunes de la ficha y los textos de las figuras de `cortes.md` (`cortes.ficha.*`, `fig.*`) y
> sigue las mismas convenciones de clave que las fichas I y II (`hoy.*`, `contexto.N.*`, `calendario.*`, `palabra.*`,
> `puertas.*`, `debates.*`, `antes.*`, `leer.*`, `citar.sesion`). Marcadores y anclas: `docs/marcadores/cortes_1936.md`.
> Referencias: `docs/02b_BIBLIOGRAFIA.md`, «Fichas III, IV y V». Grafías: `docs/peticiones/grafias_cortes_b.md`.
>
> **Procedencia.** Cada hecho de la Cámara está anclado en su fila, con el id V2 y el id v3 en mono. **Toda cita se leyó
> hoy letra a letra en las dos filas** (85 anclas de las tres fichas, 0 fallos): la tabla de anclas de
> `docs/marcadores/cortes_1936.md` trae el fragmento exacto que debe encontrar el aserto de citas de la compilación, y
> `docs/marcadores/comprobar_cortes_b.py` lo repite. «Solo en la v3» marca las filas que la V2 no tiene: sumarios,
> cabeceras y actas leídas.
>
> **Cambios respecto a la narrativa (§8.3), medidos hoy:**
> 1. **El «viva» negado tiene sitio y presidente.** Está en el acta de la junta preparatoria del 15 de marzo, leída el 17
>    (v3 114890, fila del sumario, solo en la v3): preside Ramón de Carranza, el diputado de más edad. Se usa.
> 2. **El artículo 81 no es externo:** el Diario lo lee el 3 de abril (V2 102249). **Tampoco la fecha de las
>    elecciones:** el decreto de convocatoria se lee el 17 de marzo (v3 114890). Se recortan dos [EXT].
> 3. **La destitución se votó dos veces con nombre y apellido:** el 3 de abril (181 contra 88, V2 102287) y el 7 (238
>    contra 5). En esta etapa, 81 filas de la V2 traen una lista «Señores que dijeron sí/no», en 32 de las 60 sesiones,
>    con la definición común que propone cortes_a (`etapa.<n>.listas_nominales.*`).
> 4. **«En la V2, las listas de votación van dentro de filas de la Presidencia»** solo vale para 27 de esas 81 filas;
>    las demás van pegadas a la fila de quien habló antes. El copy lo dice así.
> 5. **La controversia sobre las actas** va con sus dos posiciones, en la página exacta (Álvarez Tardío y Villa García,
>    2017; González Calleja y Sánchez Pérez, 2018).
> 6. **Jiménez de Asúa en la banda de presidentes** se explica con el propio Diario: el 7 de abril el Presidente de las
>    Cortes «pasa a ser Presidente de la República» (V2 102368), y del 15 de abril al 8 de mayo la cabecera del Diario
>    pone la Presidencia a nombre de Jiménez de Asúa (sumarios, solo en la v3).
>
> **Palabras para el lector:** unas 1.140, sin títulos, ids ni bibliografía. Ninguna frase pasa de 30 palabras.

---

## Cabecera

<!-- cortes.1936.meta.titulo --> Las Cortes de 1936, hasta la guerra
<!-- cortes.1936.meta.descripcion --> De marzo a julio de 1936: la apertura, las actas, la destitución de Alcalá-Zamora y lo que el Diario mandó borrar, fila a fila.
<!-- cortes.1936.miga --> Las Cortes / III
<!-- cortes.1936.titulo --> Las Cortes de 1936, hasta la guerra

<!-- cortes.1936.antetitulo -->
16-III → 10-VII-1936 · {{etapa.III.sesiones}} sesiones · {{etapa.III.serie}}

> [nota de diseño] La serie lleva detrás `cortes.ficha.antetitulo.proyecto` («metadatos del proyecto»). Numeral «III»
> en contorno como marca de agua.

<!-- cortes.1936.entrada -->
¿Qué se dijo en la Cámara de 1936 antes de la guerra?

<!-- cortes.1936.tension -->
Es la etapa que más se cita, y la que más se ha contado con frases que no están en el Diario. Aquí va lo que el Diario sí recoge, incluidas las órdenes de borrar.

## Hoy puede

<!-- cortes.1936.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1936-1939» y ponga Desde 16/03/1936 y Hasta 10/07/1936: la Legislatura sola traería también la guerra y México.

<!-- cortes.1936.hoy.buscar.consulta --> "orden público"

<!-- cortes.1936.hoy.buscar.recuento -->
Con esos filtros, «orden público» da {{cortes.1936.consulta.orden_publico.n}} intervenciones (v3), contando todas las filas. Salen en {{cortes.1936.consulta.orden_publico.sesiones}} de las {{etapa.III.sesiones}} sesiones.

<!-- cortes.1936.hoy.sesion -->
**Abrir una sesión.** Ponga el 1 de julio de 1936 en Desde y en Hasta, abra una intervención y pulse `s`: tendrá la sesión corrida.

<!-- cortes.1936.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, pulse «Añadir bibliotecas del proyecto…» y elija «Orden público en la primavera de 1936».

<!-- cortes.1936.hoy.tendencia -->
**Seguir una palabra en el tiempo.** Busque «orden público» (la consulta de la primera tarea), pulse `t` para abrir Tendencia y elija el periodo «1936–45». Lea solo hasta julio de 1936: después vienen los extractos de la guerra.

<!-- cortes.1936.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Debajo de las tareas, ↺ 5 (`comun.fija.enlace`) y ↺ 4 (`comun.fija.ids`), una vez cada una, como en
> las fichas I y II. El recuento es de hoy (22-09-2026) y reproduce el método del explorador (FTS5 sobre su
> `corpus.sqlite`; comprobado con «España ha dejado de ser católica» = 6, «voto femenino | voto de la mujer» = 40,
> «divorcio» = 531). En el explorador el debate se llama «Debate · Orden público en la primavera de 1936»; el prefijo
> «Debate ·» es el del diálogo y se omite, como en la ficha I.

## Cifras

<!-- cortes.1936.cifras.sesiones -->
{{etapa.III.sesiones}} sesiones, del 16 de marzo al 10 de julio de 1936, sin que falte ningún número de la serie.

<!-- cortes.1936.cifras.palabras -->
{{etapa.III.palabras}} palabras en la edición depositada: el {{etapa.III.palabras.pct|pct2}} del corpus.

<!-- cortes.1936.cifras.diputados -->
{{etapa.III.diputados}} diputados toman la palabra, contando a quien preside.

## Lo que pasó en la Cámara

> [nota de diseño] Seis apartados H3 que llenan el índice lateral. Los ids van en mono, en la forma «V2 … · v3 …»,
> detrás de la frase que anclan; las fuentes [A] del apartado 2 van al pie, con `cortes.ficha.contexto.externas`.

### La apertura (15 a 17 de marzo)

<!-- cortes.1936.contexto.1.titulo --> La apertura (15 a 17 de marzo)

<!-- cortes.1936.contexto.1.a -->
El decreto de convocatoria, leído el 17 de marzo, fijó las elecciones el 16 de febrero y la reunión de las Cortes el 16 de marzo. Está solo en la v3 (v3 {{fila.1936.convocatoria.v3|id}}).

<!-- cortes.1936.contexto.1.b -->
La víspera de la apertura, en la junta preparatoria, preside Ramón de Carranza, el diputado de más edad. El acta cuenta que Fernández-Osorio y Tafall «solicitó de la Presidencia un viva a la República, negándose el Sr. Presidente» (v3 {{fila.1936.junta_viva.v3|id}}, solo en la v3).

<!-- cortes.1936.contexto.1.c -->
El 16 de marzo, Martínez Barrio sale elegido Presidente interino del Congreso con {{cortes.1936.votos.presidente_interino}} votos (V2 {{fila.1936.presidente_interino.V2|id}} · v3 {{fila.1936.presidente_interino.v3|id}}). Cierra la sesión con «¡Viva la República! ¡Viva España!» (V2 {{fila.1936.viva_cierre.V2|id}} · v3 {{fila.1936.viva_cierre.v3|id}}).

### Las actas (marzo y abril)

<!-- cortes.1936.contexto.2.titulo --> Las actas (marzo y abril)

<!-- cortes.1936.contexto.2.a -->
Hasta el 3 de abril, la Cámara examina las actas de su propia elección (V2 {{fila.1936.actas_fin.V2|id}} · v3 {{fila.1936.actas_fin.v3|id}}). El 31 de marzo se discute el dictamen que propone anular las de Granada.

<!-- cortes.1936.contexto.2.b -->
Giménez Fernández anuncia que su minoría se retira: «dejamos en vuestras manos, señores de la mayoría, la suerte del sistema parlamentario» (V2 {{fila.1936.retirada.V2|id}} · v3 {{fila.1936.retirada.v3|id}}).

<!-- cortes.1936.contexto.2.c -->
Goicoechea y Lamamié de Clairac se retiran con las suyas (V2 {{fila.1936.retirada_re.V2|id}} · v3 {{fila.1936.retirada_re.v3|id}}; V2 {{fila.1936.retirada_ct.V2|id}} · v3 {{fila.1936.retirada_ct.v3|id}}).

<!-- cortes.1936.contexto.2.d -->
El explorador reúne este debate en «Comisión de Actas (Cuenca y Granada)», con {{cortes.1936.biblioteca.actas.n}} intervenciones (v3).

<!-- cortes.1936.contexto.2.e -->
Cómo juzgar esa revisión sigue en discusión. Álvarez Tardío y Villa García sostienen que la nueva mayoría la usó para quitar escaños a la oposición, aunque escriben que no fabricó esa mayoría [A]. González Calleja y Sánchez Pérez discuten su tesis del fraude [A]. Este sitio no toma partido.

<!-- cortes.1936.contexto.2.fuentes -->
[A] Manuel Álvarez Tardío y Roberto Villa García, *1936. Fraude y violencia en las elecciones del Frente Popular*. Barcelona: Espasa, 2017. · [A] Eduardo González Calleja y Francisco Sánchez Pérez, «Revisando el revisionismo. A propósito del libro *1936. Fraude y violencia en las elecciones del Frente Popular*», *Historia Contemporánea*, 58, 2018, pp. 851–881.

> [nota de diseño] La tesis se resume como la lee la crítica (González Calleja y Sánchez Pérez, 2018: 853), y «no
> fabricó esa mayoría» parafrasea la cita de Álvarez Tardío y Villa García (2017: 496) que ellos reproducen (2018:
> 861). La cifra de la biblioteca es de la v3: la página ya lleva NotaBases por F05.

### La destitución (3 y 7 de abril)

<!-- cortes.1936.contexto.3.titulo --> La destitución (3 y 7 de abril)

<!-- cortes.1936.contexto.3.a -->
El 3 de abril, recién constituida la Cámara, el grupo socialista presenta una proposición que invoca el artículo 81 de la Constitución (V2 {{fila.1936.propuesta_81.V2|id}} · v3 {{fila.1936.propuesta_81.v3|id}}).

<!-- cortes.1936.contexto.3.b -->
Se lee el artículo: en una segunda disolución, «el primer acto de las nuevas Cortes será examinar y resolver sobre la necesidad del decreto» (V2 {{fila.1936.articulo_81.V2|id}} · v3 {{fila.1936.articulo_81.v3|id}}).

<!-- cortes.1936.contexto.3.c -->
La proposición sale en votación nominal, por {{cortes.1936.voto_3abril.si}} votos contra {{cortes.1936.voto_3abril.no}} (V2 {{fila.1936.voto_3abril.V2|id}} · v3 {{fila.1936.voto_3abril.v3|id}}).

<!-- cortes.1936.contexto.3.d -->
El 7 de abril se vota que «no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936» (V2 {{fila.1936.propuesta_destitucion.V2|id}} · v3 {{fila.1936.propuesta_destitucion.v3|id}}). Prieto defiende la proposición en {{cortes.1936.prieto_7abril.palabras}} palabras (V2 {{fila.1936.prieto_7abril.V2|id}} · v3 {{fila.1936.prieto_7abril.v3|id}}).

<!-- cortes.1936.contexto.3.e -->
«El Reglamento dispone que se haga nominalmente»: {{voto.238-5.si}} votos contra {{voto.238-5.no}} (V2 {{fila.1936.voto_destitucion.V2|id}} · v3 {{fila.1936.voto_destitucion.v3|id}}).

<!-- cortes.1936.contexto.3.f -->
Esa noche, la Mesa no puede notificar el acuerdo en casa de Alcalá-Zamora: le responden que «se hallaba descansando» (V2 {{fila.1936.descansando.V2|id}} · v3 {{fila.1936.descansando.v3|id}}).

<!-- cortes.1936.contexto.3.g -->
De vuelta en la Cámara se lee el artículo 74, y el Presidente de las Cortes «pasa a ser Presidente de la República» (V2 {{fila.1936.pasa_a_ser.V2|id}} · v3 {{fila.1936.pasa_a_ser.v3|id}}).

> [nota de diseño] `voto.238-5.*` son las claves de F26 (dueño: sesiones); aquí solo se consumen. El 238–5 enlaza con su
> línea de F26 en Sesiones y votaciones; la puerta 0.2 `destitucion-1936` queda oculta mientras no exista.

### Presidencias y Gobiernos (abril y mayo)

<!-- cortes.1936.contexto.4.titulo --> Presidencias y Gobiernos (abril y mayo)

<!-- cortes.1936.contexto.4.a -->
Mientras Martínez Barrio ejerce la Presidencia de la República, la cabecera del Diario pone la de la Cámara a nombre de Jiménez de Asúa, vicepresidente.

<!-- cortes.1936.contexto.4.b -->
El 8 de mayo se acuerda una sesión solemne «para que el Presidente electo preste la promesa» (V2 {{fila.1936.solemne.V2|id}} · v3 {{fila.1936.solemne.v3|id}}). Se celebra el 11 de mayo, y su acta se lee al día siguiente (v3 {{fila.1936.acta_solemne.v3|id}}, solo en la v3).

<!-- cortes.1936.contexto.4.c -->
Ese 12 de mayo, Martínez Barrio vuelve a presidir la Cámara. Llega la crisis del Gobierno de Barcia: «Encontrándose el Gobierno en crisis se suspenden las sesiones de Cortes» (V2 {{fila.1936.crisis.V2|id}} · v3 {{fila.1936.crisis.v3|id}}).

> [nota de diseño] «La cabecera del Diario» es la del sumario de las sesiones 17 a 27 (15 de abril a 8 de mayo), que
> solo está en la v3. Quién ganó la elección presidencial del 10 de mayo no se dice: no está en ninguna fila de esta
> etapa y no hace falta para leer la banda de presidentes.

### Lo que el Diario borra (abril a julio)

<!-- cortes.1936.contexto.5.titulo --> Lo que el Diario borra (abril a julio)

<!-- cortes.1936.contexto.5.a -->
El 15 de abril, Calvo Sotelo protesta: «Se acaba de hacer una incitación al asesinato». La Presidencia contesta: «Esas palabras no constarán en el Diario de Sesiones» (V2 {{fila.1936.incitacion.V2|id}}–{{fila.1936.no_constaran_15abril.V2|id}} · v3 {{fila.1936.incitacion.v3|id}}–{{fila.1936.no_constaran_15abril.v3|id}}).

<!-- cortes.1936.contexto.5.b -->
La orden se repite el 6 de mayo y el 1 de julio (V2 {{fila.1936.no_constara_6mayo.V2|id}} · v3 {{fila.1936.no_constara_6mayo.v3|id}}; V2 {{fila.1936.no_constaran_1julio.V2|id}} · v3 {{fila.1936.no_constaran_1julio.v3|id}}).

<!-- cortes.1936.contexto.5.c -->
Otras veces es el taquígrafo quien anota palabras que «no se consignan por orden» de la Presidencia (V2 {{fila.1936.no_se_consignan_6mayo.V2|id}} · v3 {{fila.1936.no_se_consignan_6mayo.v3|id}}; V2 {{fila.1936.no_se_consignan_16junio.V2|id}} · v3 {{fila.1936.no_se_consignan_16junio.v3|id}}; V2 {{fila.1936.galarza.V2|id}} · v3 {{fila.1936.galarza.v3|id}}).

<!-- cortes.1936.contexto.5.d -->
El 3 de junio es Calvo Sotelo quien pide que no consten unas palabras sobre las Hermanas de la Caridad (V2 {{fila.1936.calvo_pide.V2|id}} · v3 {{fila.1936.calvo_pide.v3|id}}). [Ver qué recoge el Diario]

> [nota de diseño] [Ver qué recoge el Diario] (`comun.boton.ver_diario`) lleva a El Diario, donde F28 recorre todas las
> órdenes del corpus. Aquí no se cuentan: el recuento es de F28 y lo fija su dueño (discrepancia 21 del plan). El 15 de
> abril hay tres filas de la Presidencia con la fórmula (V2 102484, 102486, 102492); se cita la primera.

### La antesala y la última sesión (junio y julio)

<!-- cortes.1936.contexto.6.titulo --> La antesala y la última sesión (junio y julio)

<!-- cortes.1936.contexto.6.a -->
El 16 de junio y el 1 de julio, la Cámara debate el orden público. Ambas sesiones tienen su puerta de lectura.

<!-- cortes.1936.contexto.6.b -->
La del 1 de julio es la más larga del corpus: {{sesion.1936-07-01-54.palabras}} palabras en la edición depositada.

<!-- cortes.1936.contexto.6.c -->
La del 10 de julio termina con el «Orden del día para el martes» (V2 {{fila.1936.cierre_10julio.V2|id}} · v3 {{fila.1936.cierre_10julio.v3|id}}). La sesión siguiente del corpus es la del 1 de octubre, cuando Martínez Barrio condena «ese movimiento sedicioso» (V2 {{fila.1936.sedicioso.V2|id}} · v3 {{fila.1936.sedicioso.v3|id}}).

> [nota de diseño] Debajo, `cortes.ficha.contexto.puerta` → `antesala-1936`. El asesinato de Calvo Sotelo y la
> sublevación no se cuentan aquí: el Diario de esta etapa no los recoge. La frase «Este hombre ha hablado por última
> vez» no está en ninguna fila (lo dice la puerta).

## Cuándo se reunió

<!-- cortes.1936.calendario.entrada -->
La Cámara de 1936 se reunió los {{etapa.III.meses_con_sesion|letra}} meses que tuvo antes de la guerra, de marzo a julio, sin un mes vacío.

<!-- cortes.1936.calendario.presidente -->
Bajo el calendario van dos bandas de los metadatos del proyecto. Diego Martínez Barrio es el presidente titular de {{etapa.III.pres.martinez_barrio}} sesiones.

<!-- cortes.1936.calendario.presidente_otros -->
Luis Jiménez de Asúa, vicepresidente, lo es de las otras {{etapa.III.pres.jimenez_de_asua}}, del 15 de abril al 8 de mayo. El 7 de abril, el Presidente de las Cortes había pasado a ser Presidente de la República.

<!-- cortes.1936.calendario.vice -->
Además, un vicepresidente ocupó la Presidencia algún tramo en {{etapa.III.vice_ses}} sesiones de la etapa (V2).

<!-- cortes.1936.calendario.gobiernos -->
La banda de Gobiernos pasa de Azaña a Barcia, interino, y de este a Casares Quiroga.

## Quién tomó la palabra

<!-- cortes.1936.palabra.f05 -->
Sin contar la Presidencia, José Calvo Sotelo encabeza la palabra de la etapa: {{oradores.etapa.III.1.pal}} palabras de habla (v3).

<!-- cortes.1936.palabra.f05_siguen -->
Le siguen Manuel Giménez Fernández, Juan Bautista Guerra García, Antonio Bermúdez Cañete y Juan Ventosa Calvell. Los cinco son de partidos que la base codifica en la extrema derecha (RE), la derecha (CEDA) o la centro-derecha (Lliga).

<!-- cortes.1936.palabra.f09 -->
Por familias, los republicanos se llevan el {{familias.etapa.III.republicanos.pct|pct1}} de las palabras sin Presidencia (V2), y los conservadores, el {{familias.etapa.III.conservadores.pct|pct1}}.

> [nota de diseño] F05 (v3) lleva NotaBases (↺ 13); F09 (V2), no. Los cinco nombres deben coincidir con los puestos 1
> a 5 de `oradores_etapa.json`: guardas `oradores.etapa.III.1…5.rep_id` en `docs/marcadores/cortes_1936.md`. La
> ideología es la del partido: lo dice `fig.F09.salvedad`. Giménez Fernández lleva la grafía de la tabla (D-22: adoptada).

## Puertas de esta etapa

> [nota de diseño] La sección la pinta `RegistroPuertas` (`antesala-1936`); esta ficha no añade línea propia para no
> repetirla. Las puertas 0.2 `destitucion-1936` y `abril-1936` no se pintan hasta que existan.

## Debates preparados en el explorador

<!-- cortes.1936.debates.entrada -->
El explorador trae {{etapa.III.debates|letra}} debates preparados de esta etapa (v3):

<!-- cortes.1936.debates.lista -->
- Las Cortes de 1936 se constituyen
- Comisión de Actas (Cuenca y Granada)
- Destitución de Alcalá-Zamora
- Orden público en la primavera de 1936

> [nota de diseño] Nombres del diálogo del explorador, sin el prefijo «Debate ·», en orden de fechas. Debajo,
> `cortes.ficha.debates.como` y `cortes.ficha.debates.salvedad`.

## Antes de usarla

<!-- cortes.1936.antes.listas -->
El voto no es una columna. En esta etapa, {{etapa.III.listas_nominales.filas}} filas de la V2 traen una lista de votación nominal, en {{etapa.III.listas_nominales.sesiones}} sesiones.

<!-- cortes.1936.antes.listas_donde -->
En la V2, cada lista va pegada a la fila de quien habló antes de votar: solo {{cortes.1936.listas.en_presidencia}} de esas filas son de la Presidencia. En la v3, cada lista tiene su propia fila.

<!-- cortes.1936.antes.sumario -->
La junta preparatoria, el decreto de convocatoria y la cabecera de cada sesión solo están en la v3, dentro de la fila del sumario. El filtro «Solo lo que se habla» los oculta.

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] La lista cuenta las filas cuyo texto plegado (sin tildes ni mayúsculas) trae «señores que dijeron»
> o «señores que han dicho» seguido de «sí» o «no»: la definición común de `etapa.<n>.listas_nominales.*` (cortes_a). `antes.listas` enlaza con Sesiones y votaciones ([Ver las votaciones]).

## Para leer más

<!-- cortes.1936.leer.cabrera -->
[A] Mercedes Cabrera Calvo-Sotelo, «Las Cortes republicanas», *Ayer*, 20, 1995, pp. 13–47.

<!-- cortes.1936.leer.tusell -->
[A] Javier Tusell, *Las elecciones del Frente Popular en España*. Madrid: Cuadernos para el Diálogo, 1971, 2 vols.

<!-- cortes.1936.leer.alvarez_villa -->
[A] Manuel Álvarez Tardío y Roberto Villa García, *1936. Fraude y violencia en las elecciones del Frente Popular*. Barcelona: Espasa, 2017.

<!-- cortes.1936.leer.gonzalez_sanchez -->
[A] Eduardo González Calleja y Francisco Sánchez Pérez, «Revisando el revisionismo. A propósito del libro *1936. Fraude y violencia en las elecciones del Frente Popular*», *Historia Contemporánea*, 58, 2018, pp. 851–881.

> [nota de diseño] Encima, `cortes.ficha.leer.nota`. Números de volumen y de página: datos bibliográficos, en la lista
> blanca de `check-i18n` para las claves `*.leer.*` y `*.fuentes` (petición en `peticiones/cortes_b.md`).

## Cómo citar

<!-- cortes.1936.citar.sesion -->
*Diario de las Sesiones de Cortes. Congreso de los Diputados*, núm. {{sesion.1936-04-07-15.diario|id}}, 7 de abril de 1936, pp. {{sesion.1936-04-07-15.pag.desde|id}}–{{sesion.1936-04-07-15.pag.hasta|id}}. En Luz y Taquígrafos (V2), filas {{sesion.1936-04-07-15.id.desde|id}} a {{sesion.1936-04-07-15.id.hasta|id}}.

> [nota de diseño] Mismo formato que `cortes.1933.citar.sesion`. Debajo, `cortes.ficha.citar.paginas`, ↺ 4, la cita
> del conjunto y [Copiar la cita]. Vecinas: anterior, la ficha II; siguiente, la ficha IV; en el centro, Todas las
> etapas.
