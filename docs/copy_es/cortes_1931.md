# Copy ES · Ficha I · Las Cortes Constituyentes (1931–1933) (`/[lang]/cortes/1931/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_a**. Sigue la narrativa §8.1
> y la plantilla C del plan (tope: 1.200–1.500 palabras de copy para el lector). Rótulos comunes de la ficha y textos
> de las figuras: `cortes.md` (`cortes.ficha.*`, `fig.*`). Marcadores: `docs/marcadores/cortes_1931.md`.
>
> **Procedencia.** Cada hecho de la Cámara está anclado en su fila, con el id de la V2 (CSV depositado, MD5
> `360332a0…`) y el de la v3 (base del explorador, sha256 `3a0d8b2d…`); las citas se leyeron hoy letra a letra en las
> dos filas (`docs/marcadores/cortes_a_comprobar.py`). Los hechos externos llevan [I] (institucional) o [A]
> (académica), comprobados hoy; están en `02b_BIBLIOGRAFIA.md`, sección «Fichas I y II».
>
> **Cambios respecto a la narrativa, y por qué:**
> 1. **La elección de Alcalá-Zamora como Presidente de la República no es [EXT]:** está en el Diario (V2 13613:
>    «queda elegido Presidente de la República española», 362 votos de 410). Se ancla en su fila.
> 2. **La Sanjurjada tampoco:** el 10-VIII-1932 Azaña cuenta a la Cámara cómo supo que «el general Sanjurjo se ha
>    presentado en Sevilla» (V2 32910). Se ancla en su fila y se evita la palabra «Sanjurjada» como juicio.
> 3. **El final de las Constituyentes se cuenta con el Diario**: el Gobierno Lerroux se presenta el 2-X-1933, pierde la
>    votación nominal de una proposición socialista (187 contra 91, V2 61320) y Besteiro suspende las sesiones
>    (V2 61355). La disolución es [I]: decreto de 9-X-1933 (Gaceta de Madrid, 10-X-1933, pp. 251–252).
> 4. **«Seis votaciones nominales en cinco sesiones» no describe el corpus:** en esta etapa al menos 532 filas
>    de la V2 traen una lista «Señores que dijeron sí/no», en 206 sesiones. La ficha lo dice
>    (`etapa.I.listas_nominales.*`); Sesiones ya presenta F26 como selección. La definición común está en
>    `docs/peticiones/cortes_a.md`.
> 5. **Campalans «responde» a Ortega**: comprobado; abre su discurso hablando «después de hacerlo el ilustre maestro de
>    todos D. José Ortega y Gasset» (V2 25529).
> 6. **Nada sobre el «primer voto de las mujeres en 1933»** aquí: va en la ficha II, con su fuente.

<!-- cortes.1931.meta.titulo --> Las Cortes Constituyentes (1931–1933)
<!-- cortes.1931.meta.descripcion --> La Cámara que escribió la Constitución de 1931, sesión a sesión: qué pasó en ella según su Diario, cuándo se reunió, quién tomó la palabra y cómo citarla.

<!-- cortes.1931.miga --> Las Cortes / I
<!-- cortes.1931.titulo --> Las Cortes Constituyentes (1931–1933)

<!-- cortes.1931.antetitulo -->
{{etapa.I.fecha.desde|fecha_corta}} → {{etapa.I.fecha.hasta|fecha_corta}} · {{etapa.I.sesiones}} sesiones · {{etapa.I.serie}}

> [nota de diseño] La serie lleva a continuación, en cuerpo pequeño, `cortes.ficha.antetitulo.proyecto` («metadatos del
> proyecto»), porque sale de `sessions.json`.

<!-- cortes.1931.entrada -->
¿Qué hizo una Cámara elegida para escribir una Constitución, y qué le pasó después?

<!-- cortes.1931.tension -->
Entre julio y diciembre de 1931 escribió la Constitución; hasta octubre de 1933 legisló y controló al Gobierno con ella. Cada momento está en una fila que usted puede abrir.

## Hoy puede

<!-- cortes.1931.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1931-1933» y escriba su búsqueda.

<!-- cortes.1931.hoy.buscar.consulta --> divorcio

<!-- cortes.1931.hoy.buscar.recuento -->
Con esa faceta, «divorcio» da {{busqueda.divorcio.1931-1933}} intervenciones (v3), contando todas las filas. Recuento del {{cortes.fichas.recuento.fecha|fecha_larga}}.

<!-- cortes.1931.hoy.sesion -->
**Abrir una sesión.** Ponga el 1 de octubre de 1931 en Desde y en Hasta, abra una intervención y pulse `s`: tendrá la sesión corrida.

<!-- cortes.1931.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, pulse «Añadir bibliotecas del proyecto…» y elija «Sufragio femenino»: {{biblioteca.sufragio.entradas}} intervenciones (v3).

<!-- cortes.1931.hoy.tendencia -->
**Seguir una palabra en el tiempo.** Busque «divorcio» (la consulta de la primera tarea), pulse `t` para abrir Tendencia y elija el periodo «Constituyentes».

<!-- cortes.1931.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Debajo de las cinco tareas, ↺ 5 (`comun.fija.enlace`) y ↺ 4 (`comun.fija.ids`), una vez cada una.
> «Mis bibliotecas», «Añadir bibliotecas del proyecto…», «Sufragio femenino», Desde, Hasta, `s` y `t` están
> comprobados en el explorador publicado (`estudio_lyt_explorador.md` §4).

## Cifras

<!-- cortes.1931.cifras.sesiones -->
{{etapa.I.sesiones}} sesiones, numeradas de la {{etapa.I.num.desde|id}} a la {{etapa.I.num.hasta|id}} sin que falte ningún número.

<!-- cortes.1931.cifras.palabras -->
{{etapa.I.palabras}} palabras en la edición depositada: el {{etapa.I.palabras.pct}} del corpus.

<!-- cortes.1931.cifras.diputados -->
{{etapa.I.diputados}} diputados intervienen, contando a quien preside.

## Lo que pasó en la Cámara

### La Cámara se constituye (julio de 1931)

<!-- cortes.1931.contexto.1.titulo --> La Cámara se constituye (julio de 1931)

<!-- cortes.1931.contexto.1.a -->
El 14 de abril de 1931, el comité de las fuerzas políticas coaligadas designó a Niceto Alcalá-Zamora Presidente del Gobierno provisional de la República. Ese Gobierno convocó unas Cortes Constituyentes de una sola Cámara, elegida por sufragio directo, para el 14 de julio. Las elecciones se celebrarían el 28 de junio.

<!-- cortes.1931.contexto.1.b -->
La primera sesión la abre una Mesa de edad, que preside Narciso Vázquez Lemus (V2 {{fila.I.mesa_edad.V2|id}} · v3 {{fila.I.mesa_edad.v3|id}}). Alcalá-Zamora toma la palabra como Presidente del Gobierno provisional; su discurso ocupa {{fila.I.alcala_resigna.palabras}} palabras.

<!-- cortes.1931.contexto.1.c -->
Viene a «resignar sus Poderes en fecha próxima» ante la Cámara (V2 {{fila.I.alcala_resigna.V2|id}} · v3 {{fila.I.alcala_resigna.v3|id}}).

<!-- cortes.1931.contexto.1.d -->
Esa misma sesión elige Presidente interino a Julián Besteiro, con {{eleccion.besteiro1931.votos}} votos de {{eleccion.besteiro1931.votantes}} (V2 {{fila.I.besteiro_elegido.V2|id}} · v3 {{fila.I.besteiro_elegido.v3|id}}). El Diario anota que ocupa su sitial «acogido con una gran ovación» (V2 {{fila.I.besteiro_ovacion.V2|id}} · v3 {{fila.I.besteiro_ovacion.v3|id}}).

<!-- cortes.1931.contexto.1.fuentes -->
[I] Decreto del Comité político, Madrid, 14 de abril de 1931. *Gaceta de Madrid*, núm. 105, 15 de abril de 1931, pp. 193–194. · [I] Decretos del Gobierno provisional sobre las Cortes Constituyentes y las elecciones. *Gaceta de Madrid*, núm. 155, 4 de junio de 1931, pp. 1174–1175 y 1181.

### La Constitución (agosto–diciembre de 1931)

<!-- cortes.1931.contexto.2.titulo --> La Constitución (agosto–diciembre de 1931)

<!-- cortes.1931.contexto.2.a -->
El 27 de agosto, Luis Jiménez de Asúa presenta el proyecto «en nombre de la Comisión», en {{fila.I.asua_proyecto.palabras}} palabras (V2 {{fila.I.asua_proyecto.V2|id}} · v3 {{fila.I.asua_proyecto.v3|id}}). Lo define así: «es una Constitución de izquierda».

<!-- cortes.1931.contexto.2.b -->
El 1 de octubre, la Cámara aprueba el voto de las mujeres.

<!-- cortes.1931.contexto.2.c -->
El 13 de octubre, tras el debate de la cuestión religiosa, el artículo 24 del proyecto sale por {{voto.178-59.si}} votos contra {{voto.178-59.no}} (V2 {{fila.I.art24.V2|id}} · v3 {{fila.I.art24.v3|id}}).

<!-- cortes.1931.contexto.2.d -->
La lista de los que votan no empieza por dos apellidos: Alcalá-Zamora y Maura. Eran el Presidente y el ministro de la Gobernación del Gobierno provisional.

<!-- cortes.1931.contexto.2.e -->
Al día siguiente, Manuel Azaña habla ya como Presidente del Gobierno. Lamenta «la sensible baja que nos ha forzado hoy a este cambio ministerial» (V2 {{fila.I.azana_baja.V2|id}} · v3 {{fila.I.azana_baja.v3|id}}).

<!-- cortes.1931.contexto.2.f -->
El 9 de diciembre se aprueba la Constitución. De los {{voto.constitucion.prometidos}} diputados que habían prometido el cargo, votan {{voto.constitucion.si}}, y todos dicen sí (V2 {{fila.I.constitucion.V2|id}} · v3 {{fila.I.constitucion.v3|id}}).

<!-- cortes.1931.contexto.2.g -->
Al día siguiente, la Cámara elige Presidente de la República a Niceto Alcalá-Zamora, con {{eleccion.presidente1931.votos}} votos de {{eleccion.presidente1931.votantes}} (V2 {{fila.I.presidente_republica.V2|id}} · v3 {{fila.I.presidente_republica.v3|id}}).

> [nota de diseño] `2.b` enlaza con `cortes.ficha.contexto.puerta` a `/es/cortes/sesiones/sufragio-1931/`; `2.c`, a
> `cuestion-religiosa-1931/`. En `2.d`, la lista del Diario da solo apellidos: «Alcalá-Zamora» y «Maura» son los dos
> primeros de «Señores que han dicho no» (V2 6994). En la legislatura 1931-1933 el único diputado apellidado Maura que
> interviene es Miguel Maura Gamazo, y la *Gaceta* del 15-IV-1931 (p. 194) lo nombra ministro de la Gobernación.

<!-- cortes.1931.contexto.2.fuentes -->
[I] *Gaceta de Madrid*, núm. 105, 15 de abril de 1931, p. 194 (nombramiento de Miguel Maura como ministro de la Gobernación).

### Gobernar con la Constitución (1932)

<!-- cortes.1931.contexto.3.titulo --> Gobernar con la Constitución (1932)

<!-- cortes.1931.contexto.3.a -->
El 9 de marzo de 1932 habla Azaña, ya Presidente del Consejo de Ministros (V2 {{fila.I.centro_gravedad.V2|id}} · v3 {{fila.I.centro_gravedad.v3|id}}). Dice: «El centro de gravedad de la política de la República española está en el Parlamento, aquí en este salón».

<!-- cortes.1931.contexto.3.b -->
El 13 de mayo, José Ortega y Gasset dice del problema catalán que «es un problema que no se puede resolver, que sólo se puede conllevar» (V2 {{fila.I.conllevar.V2|id}} · v3 {{fila.I.conllevar.v3|id}}).

<!-- cortes.1931.contexto.3.c -->
En la misma sesión le contesta Rafael Campaláns, que pide la palabra «después de hacerlo el ilustre maestro de todos» (V2 {{fila.I.campalans.V2|id}} · v3 {{fila.I.campalans.v3|id}}).

<!-- cortes.1931.contexto.3.d -->
El 27 de mayo, Azaña defiende el Estatuto de Cataluña en un discurso que tiene su propia puerta de lectura.

<!-- cortes.1931.contexto.3.e -->
El 10 de agosto, Azaña acude a la Cámara por «los sucesos acaecidos esta madrugada en Madrid» (V2 {{fila.I.sanjurjo.V2|id}} · v3 {{fila.I.sanjurjo.v3|id}}). Cuenta cómo supo que el general Sanjurjo se había presentado en Sevilla.

<!-- cortes.1931.contexto.3.f -->
El 9 de septiembre, en votación nominal, la Reforma agraria sale por {{voto.318-19.si}} votos contra {{voto.318-19.no}} (V2 {{fila.I.agraria.V2|id}} · v3 {{fila.I.agraria.v3|id}}).

<!-- cortes.1931.contexto.3.g -->
El mismo día, el Estatuto de Cataluña sale por {{voto.314-24.si}} votos contra {{voto.314-24.no}} (V2 {{fila.I.estatuto_voto.V2|id}} · v3 {{fila.I.estatuto_voto.v3|id}}).

<!-- cortes.1931.contexto.3.h -->
No son excepciones: en esta etapa, al menos {{etapa.I.listas_nominales.filas}} filas de la edición depositada traen una lista de votación nominal, nombre por nombre.

<!-- cortes.1931.contexto.3.i -->
Esas listas están en {{etapa.I.listas_nominales.sesiones}} sesiones. Van dentro del texto de las filas, no en una columna de la base.

> [nota de diseño] `3.d` enlaza con la puerta `estatuto-1932/`, que da la cifra («más de 17.000 palabras») y explica
> que la V2 pone ese discurso a nombre de la Presidencia; esta ficha no repite la cifra. `3.h` cuenta las filas con la cabecera «Señores que dijeron» o «han dicho»,
> seguida de «sí» o «no» (V2, sin acentos ni mayúsculas): la misma definición que `voto.listas.sesiones` de Sesiones.
> Es un mínimo, porque el reconocimiento óptico rompe algunas cabeceras.

### Casas Viejas y el desgaste (1933)

<!-- cortes.1931.contexto.4.titulo --> Casas Viejas y el desgaste (1933)

<!-- cortes.1931.contexto.4.a -->
En enero de 1933 no hubo sesión. El debate sobre Casas Viejas llega el 1 de febrero, en la primera sesión del mes.

<!-- cortes.1931.contexto.4.b -->
El debate preparado del explorador lo sigue durante {{biblioteca.casas_viejas.sesiones|letra}} sesiones, hasta el 16 de marzo (v3).

<!-- cortes.1931.contexto.4.c -->
Del 4 al 6 de julio, la Cámara discute la nueva ley electoral; es el debate preparado «Ley Electoral de 1933».

<!-- cortes.1931.contexto.4.d -->
Cuando las Cortes vuelven a reunirse, el 2 de octubre, gobierna Alejandro Lerroux. Según los metadatos del proyecto, su Gobierno solo pasa por la Cámara en {{etapa.I.gob.lerroux_1|letra}} sesiones.

> [nota de diseño] `4.a` enlaza con la puerta `casas-viejas-1933/`. «En la primera sesión del mes»: el 1-II-1933 es la
> primera sesión de febrero y su Diario ya trae «Casas Viejas» (V2 44797 y siguientes). `etapa.I.gob.lerroux_1` es la
> cuenta de la banda F16 (proyecto).

### El final (octubre de 1933)

<!-- cortes.1931.contexto.5.titulo --> El final (octubre de 1933)

<!-- cortes.1931.contexto.5.a -->
El 2 de octubre, Lerroux presenta su Gobierno a la Cámara (V2 {{fila.I.lerroux_gobierno.V2|id}} · v3 {{fila.I.lerroux_gobierno.v3|id}}). Azaña le contesta en {{fila.I.azana_1933.palabras}} palabras (V2 {{fila.I.azana_1933.V2|id}} · v3 {{fila.I.azana_1933.v3|id}}).

<!-- cortes.1931.contexto.5.b -->
Al día siguiente, Lerroux abre su réplica así: «Señores Diputados, los que van a morir os saludan.» (V2 {{fila.I.van_a_morir.V2|id}} · v3 {{fila.I.van_a_morir.v3|id}}).

<!-- cortes.1931.contexto.5.c -->
La minoría socialista mantiene su proposición, defendida por Indalecio Prieto. El Gobierno abandona el banco azul antes de que se vote (V2 {{fila.I.gobierno_se_retira.V2|id}} · v3 {{fila.I.gobierno_se_retira.v3|id}}).

<!-- cortes.1931.contexto.5.d -->
La proposición sale por {{voto.187-91.si}} votos contra {{voto.187-91.no}}, en votación nominal (V2 {{fila.I.voto_187.V2|id}} · v3 {{fila.I.voto_187.v3|id}}).

<!-- cortes.1931.contexto.5.e -->
Besteiro cierra: «En vista de la declaración del Gobierno, se suspenden las sesiones de Cortes» (V2 {{fila.I.suspenden.V2|id}} · v3 {{fila.I.suspenden.v3|id}}).

<!-- cortes.1931.contexto.5.f -->
Fue la última sesión de las Constituyentes. Un decreto del 9 de octubre, firmado por Alcalá-Zamora y Diego Martínez Barrio, las declaró disueltas.

<!-- cortes.1931.contexto.5.g -->
Otro decreto del mismo día convocó elecciones para el 19 de noviembre, con segunda vuelta el 3 de diciembre.

> [nota de diseño] En `5.c`, «su proposición» es la que el Diario llama «proposición presentada por la minoría
> socialista y defendida por mi amigo el Sr. Prieto» (Castrovido, V2 61322). Martínez Barrio firma el decreto como
> Presidente del Consejo de Ministros.

<!-- cortes.1931.contexto.5.fuentes -->
[I] Decretos de 9 de octubre de 1933. *Gaceta de Madrid*, núm. 283, 10 de octubre de 1933, pp. 251–252.

## Cuándo se reunió

<!-- cortes.1931.calendario.entrada -->
La Cámara se reunió en {{etapa.I.meses.con_sesion}} de sus {{etapa.I.meses}} meses. El que falta es enero de 1933.

<!-- cortes.1931.calendario.presidente -->
Bajo el calendario van dos bandas de los metadatos del proyecto. Julián Besteiro es el presidente titular de {{etapa.I.pres.besteiro}} sesiones.

<!-- cortes.1931.calendario.presidente_otros -->
Francisco Barnés lo es de {{etapa.I.pres.barnes|letra}} y Antonio Lara, de {{etapa.I.pres.lara|letra}}.

<!-- cortes.1931.calendario.vice -->
Aun así, un vicepresidente ocupó la Presidencia algún tramo en {{etapa.I.vice_ses}} sesiones de la etapa (V2).

<!-- cortes.1931.calendario.gobiernos -->
La banda de Gobiernos va del Provisional a Lerroux I, con Azaña I, II y III entre medias.

## Quién tomó la palabra

<!-- cortes.1931.palabra.f05 -->
Sin contar la Presidencia, Manuel Azaña encabeza la palabra de la etapa: {{oradores.etapa.I.1.pal}} palabras de habla (v3).

<!-- cortes.1931.palabra.f05_siguen -->
Le siguen Antonio Royo Villanova, Indalecio Prieto, José Antonio Balbontín y Eduardo Ortega y Gasset.

<!-- cortes.1931.palabra.f09 -->
Por familias, los republicanos se llevan el {{familias.etapa.I.republicanos.pct|pct1}} de las palabras sin Presidencia (V2).

> [nota de diseño] F05 (v3) lleva NotaBases (↺ 13) al pie; F09 (V2), no. Los cinco nombres de `f05_siguen` deben
> coincidir con los puestos 2 a 5 de `oradores_etapa.json` (el exportador lo comprueba). Aquí está Royo Villanova
> segundo: en la V2 con Presidencia saldría Prieto, inflado por un documento leído dentro de su fila (V2 55221).

## Puertas de esta etapa

<!-- cortes.1931.puertas.sufragio --> 1-X-1931 · El voto de las mujeres
<!-- cortes.1931.puertas.religiosa --> 13 y 14-X-1931 · «España ha dejado de ser católica»
<!-- cortes.1931.puertas.estatuto --> 27-V-1932 · El discurso de Azaña, a nombre de otro
<!-- cortes.1931.puertas.casas_viejas --> 2-II-1933 · Casas Viejas

> [nota de diseño] Registro de calendario, fecha en mono, cada línea enlazada a su puerta. Los títulos son los H1 de
> las puertas (narrativa §10); si su dueño los cambia, se toman de sus claves. Las puertas de la edición 0.2 no se
> pintan hasta que existan.

## Debates preparados en el explorador

<!-- cortes.1931.debates.entrada -->
El explorador trae {{etapa.I.debates}} debates preparados de esta etapa (v3):

<!-- cortes.1931.debates.lista -->
- La Cámara se constituye (1931)
- La Constitución de 1931
- Sufragio femenino
- Cuestión religiosa (art. 26)
- Ley de Defensa de la República
- Responsabilidades de Alfonso XIII
- El primer presidente de la República
- Estatuto de Cataluña
- Reforma agraria y Sanjurjada
- Casas Viejas
- Azaña y Lerroux: la ruptura
- Ley Electoral de 1933
- El final de las Constituyentes

> [nota de diseño] Los nombres son los del explorador, sin el prefijo «Debate · » del diálogo (regla común en
> `comun.md` § 3 y en `explorador.bibliotecas.proyecto`), en su orden de fechas; nunca las claves B1…B26, que no son
> cronológicas. Van como lista (`- `), una por línea: `tBloques` la pinta como `<ul>` (REVISION_FASE1 P3-1). Van debajo `cortes.ficha.debates.como` y `cortes.ficha.debates.salvedad`.

## Antes de usarla

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- cortes.1931.antes.bucle -->
La sesión 9 repite una y otra vez el mismo par de nombres, por un bucle del reconocimiento óptico (V2 {{fila.I.bucle9.V2|id}} · v3 {{fila.I.bucle9.v3|id}}).

<!-- cortes.1931.antes.fechas -->
De las {{correcciones.fechas.n|letra}} fechas de sesión que corrigió la V2, {{correcciones.fechas.I|letra}} son de esta etapa.

<!-- cortes.1931.antes.estatuto -->
En la V2, el discurso de Azaña del 27 de mayo de 1932 va dentro de una fila de la Presidencia (V2 {{fila.I.estatuto_presidencia.V2|id}}). La v3 lo separa (v3 {{fila.I.estatuto_presidencia.v3|id}}).

<!-- cortes.1931.antes.listas -->
Las listas de votación dan solo apellidos: para saber quién votó, hay que cotejarlos con el censo de diputados.

<!-- cortes.1931.antes.martinez_barrio -->
El partido de Diego Martínez Barrio figura como AR en esta legislatura, y está pendiente de revisión.

> [nota de diseño] `antes.fechas` enlaza con Versiones (`/es/datos/versiones/#fechas`, F25). `antes.martinez_barrio`
> es un pendiente de datos de D-25: se declara, no se corrige (decisión del 23-09-2026; la lista con su cifra, en
> Versiones). Si el autor lo corrige en un depósito nuevo, la frase se quita.

## Para leer más

<!-- cortes.1931.leer.julia -->
[A] Santos Juliá, *La Constitución de 1931*. Madrid: Iustel, 2009 (Las Constituciones españolas, VIII).

<!-- cortes.1931.leer.casanova -->
[A] Julián Casanova, *República y guerra civil*. Barcelona: Crítica, 2007 (Historia de España, 8).

<!-- cortes.1931.leer.malefakis -->
[A] Edward Malefakis, *Reforma agraria y revolución campesina en la España del siglo XX*. Barcelona: Ariel, 1971.

<!-- cortes.1931.leer.mintz -->
[A] Jerome R. Mintz, *The Anarchists of Casas Viejas*. Chicago: University of Chicago Press, 1982.

<!-- cortes.1931.leer.townson -->
[A] Nigel Townson, *La República que no pudo ser. La política de centro en España (1931-1936)*. Madrid: Taurus, 2002.

<!-- cortes.1931.leer.gaceta -->
[I] *Gaceta de Madrid*, colección histórica del Boletín Oficial del Estado: los decretos y la Constitución citados arriba.

## Cómo citar

<!-- cortes.1931.citar.sesion -->
*Diario de Sesiones de las Cortes Constituyentes de la República Española*, núm. {{sesion.1931-12-09-88.diario|id}}, 9 de diciembre de 1931, pp. {{sesion.1931-12-09-88.pag.desde|id}}–{{sesion.1931-12-09-88.pag.hasta|id}}. En Luz y Taquígrafos (V2), filas {{sesion.1931-12-09-88.id.desde|id}} a {{sesion.1931-12-09-88.id.hasta|id}}.

> [nota de diseño] Debajo, `cortes.ficha.citar.paginas` (el número de Diario y las páginas son del proyecto), ↺ 4, la
> cita del conjunto y [Copiar la cita]. Vecinas: sin anterior; siguiente, la ficha II; en el centro, Todas las etapas.
