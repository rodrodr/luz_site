# Marcadores · Ficha IV · Las Cortes en guerra (`docs/copy_es/cortes_guerra.md`)

> Generado el 22-09-2026 por el dueño del copy (grupo «cortes_b») con `genmarc.py` sobre la V2 (MD5
> `360332a0ff1327671530f15eed46ac0c` comprobado), la v3 (`corpus.sqlite` del explorador, 121.700 filas) y los metadatos del
> proyecto (`sessions.json`). Formato del contrato: `clave | valor esperado | base | cómo se calcula`. El exportador
> (`exportador/modulos/`) implementa cada clave y **falla** si su valor no es el esperado. Los valores son los de hoy y
> están para comprobar, no para copiarlos en el copy.

> Las claves `etapa.*`, `sesion.*`, `voto.*`, `oradores.*`, `familias.*` y `habla.*` pueden tener otro dueño (base,
> cortes, sesiones): aquí se declaran como consumidor, con el valor que este copy espera. Las `cortes.<etapa>.*` y las
> `fila.<etapa>.*` son de este grupo.

## Cifras

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `cortes.guerra.consulta.confianza.n` | 55 | v3 | FTS5 de corpus.sqlite: MATCH confianza con date entre 1936-10-01 y 1939-02-01, todas las filas (sin «Solo lo que se habla»); comprobado el método con 6/40/531/2.028/724 del explorador |
| `cortes.guerra.consulta.confianza.sesiones` | 9 | v3 | sesiones distintas de esos resultados |
| `cortes.guerra.voto_convalidacion.si` | 168 | V2 | texto de la fila V2 107312 (v3 121427): «por 168 votos en pro y ninguno en contra» |
| `etapa.IV.diputados` | 44 | V2 | rep_id distintos de la etapa, incluido el de quien preside |
| `etapa.IV.meses` | 29 | V2 | meses naturales del primero al último de la etapa (1936-10 → 1939-02) |
| `etapa.IV.meses_con_sesion` | 8 | V2 | meses de la etapa con al menos una sesión (misma clave que cortes.md) |
| `etapa.IV.palabras` | 127709 | V2 | suma de nwords de la etapa |
| `etapa.IV.palabras.pct` | 0.52 | V2 | palabras de la etapa / 24335896 (suma de nwords del CSV) × 100 |
| `etapa.IV.pres.martinez_barrio` | 9 | proyecto | sesiones con sessions.json › presidente.clave = martinez_barrio |
| `etapa.IV.presidencia.pct` | 26.1 | V2 | palabras de la Presidencia / palabras de la etapa × 100 |
| `etapa.IV.serie` | Extracto oficial de las sesiones. Congreso de los Diputados | proyecto | sessions.json › diario (único en la etapa) |
| `etapa.IV.sesiones` | 9 | V2 | sesiones (date, num_session) de legislature 1936-1939 con num_session en el tramo de la etapa |
| `familias.etapa.IV.socialista.pct` | 41.4 | V2 | palabras de «Socialista» / palabras sin Presidencia de la etapa (94377) × 100; familia normalizada como el explorador |
| `oradores.etapa.IV.1.pal` | 31794 | v3 | palabras de habla sin Presidencia del 1.º |
| `sesion.1939-02-01-69.diario` | 69 | proyecto | sessions.json › diario_num (serie «Extracto oficial de las sesiones»; page_status unverified: sin páginas) |
| `sesion.1939-02-01-69.id.desde` | 107326 | V2 | primer id V2 de la sesión |
| `sesion.1939-02-01-69.id.hasta` | 107341 | V2 | último id V2 de la sesión |

## Guardas

> El copy escribe estos nombres (tabla de grafías) o concuerda en letra con estos valores («un debate»): si cambian en la exportación, la compilación falla.

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `oradores.etapa.IV.1.rep_id` | 652 | v3 | rep_id del 1.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `etapa.IV.debates` | 1 | v3 | ídem; el copy dice «un debate» |
| `etapa.IV.vice_ses` | 2 | V2 | ídem, etapa IV (no se pinta en el copy) |

## Anclas (ids de fila y fragmento literal)

> Cada id es un marcador (`{{fila.<nombre>.V2|id}}`, `{{fila.<nombre>.v3|id}}`; tipo `id`, sin agrupar). El aserto de
> citas de la compilación debe encontrar el **fragmento, letra a letra**, dentro del texto de esa fila (espacios
> normalizados) y comprobar la fecha. «solo v3» = la V2 no tiene esa fila (sumarios, cabeceras y notas del volumen).
> Comprobado hoy: 0 fallos.

| clave | valor esperado | t | base | fecha | fragmento literal |
|---|---|---|---|---|---|
| `fila.1936.sedicioso.V2` | 107066 | id | V2 | 1936-10-01 | «ese movimiento sedicioso» |
| `fila.1936.sedicioso.v3` | 121111 | id | v3 | 1936-10-01 | «ese movimiento sedicioso» |
| `fila.guerra.aclamacion.V2` | 107088 | id | V2 | 1936-10-01 | «por aclamación quedó aprobada la proposición» |
| `fila.guerra.aclamacion.v3` | 121135 | id | v3 | 1936-10-01 | «por aclamación quedó aprobada la proposición» |
| `fila.guerra.albornoz.V2` | 107197 | id | V2 | 1937-10-02 | «Pero si el Parlamento no es eso, no será nada» |
| `fila.guerra.albornoz.v3` | 121279 | id | v3 | 1937-10-02 | «Pero si el Parlamento no es eso, no será nada» |
| `fila.guerra.ayuntamiento.V2` | 107116 | id | V2 | 1936-12-01 | «Palacio del Ayuntamiento de Valencia» |
| `fila.guerra.ayuntamiento.v3` | 121170 | id | v3 | 1936-12-01 | «Palacio del Ayuntamiento de Valencia» |
| `fila.guerra.castillo.V2` | 107337 | id | V2 | 1939-02-01 | «Castillo de Figueras, a primero de Febrero» |
| `fila.guerra.castillo.v3` | 121459 | id | v3 | 1939-02-01 | «Castillo de Figueras, a primero de Febrero» |
| `fila.guerra.ciertas_cosas.V2` | 107196 | id | V2 | 1937-10-02 | «de ciertas cosas no se puede hablar en la Cámara» |
| `fila.guerra.ciertas_cosas.v3` | 121278 | id | v3 | 1937-10-02 | «de ciertas cosas no se puede hablar en la Cámara» |
| `fila.guerra.estatuto_vasco.V2` | 107091 | id | V2 | 1936-10-01 | «De Estatuto del País Vasco» |
| `fila.guerra.estatuto_vasco.v3` | 121140 | id | v3 | 1936-10-01 | «De Estatuto del País Vasco» |
| `fila.guerra.fotocopia.V2` | 107341 | id | V2 | 1939-02-01 | «se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión» |
| `fila.guerra.fotocopia.v3` | 121465 | id | v3 | 1939-02-01 | «se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión» |
| `fila.guerra.hora.v3` | 121446 | id | v3 | 1939-02-01 | «Abierta la sesión a las veintidos horas treinta minutos» |
| `fila.guerra.largo_1oct.V2` | 107068 | id | V2 | 1936-10-01 | «Sres. Diputados, vosotros, que me conocéis, sabéis lo parco que soy en palabras» |
| `fila.guerra.largo_1oct.v3` | 121113 | id | v3 | 1936-10-01 | «Sres. Diputados, vosotros, que me conocéis, sabéis lo parco que soy en palabras» |
| `fila.guerra.lonja.V2` | 107148 | id | V2 | 1937-10-01 | «congregarnos en la histórica Lonja» |
| `fila.guerra.lonja.v3` | 121219 | id | v3 | 1937-10-01 | «congregarnos en la histórica Lonja» |
| `fila.guerra.madrid.V2` | 107114 | id | V2 | 1936-12-01 | «nos reunimos en Madrid» |
| `fila.guerra.madrid.v3` | 121167 | id | v3 | 1936-12-01 | «nos reunimos en Madrid» |
| `fila.guerra.monserrat_fecha.V2` | 107248 | id | V2 | 1938-02-01 | «Monserrat, 1 de Febrero de 1938» |
| `fila.guerra.monserrat_fecha.v3` | 121345 | id | v3 | 1938-02-01 | «Monserrat, 1 de Febrero de 1938» |
| `fila.guerra.montserrat.V2` | 107276 | id | V2 | 1938-09-30 | «las Cortes de Montserrat» |
| `fila.guerra.montserrat.v3` | 121384 | id | v3 | 1938-09-30 | «las Cortes de Montserrat» |
| `fila.guerra.negrin_1feb1938.V2` | 107232 | id | V2 | 1938-02-01 | «Los crimenes de los fraciosos» |
| `fila.guerra.negrin_1feb1938.v3` | 121328 | id | v3 | 1938-02-01 | «Los crimenes de los fraciosos» |
| `fila.guerra.negrin_1oct1937.V2` | 107148 | id | V2 | 1937-10-01 | «Señores Diputados, en cumplimiento de un precepto constitucional, comparacemos hoy ante las Cortes» |
| `fila.guerra.negrin_1oct1937.v3` | 121219 | id | v3 | 1937-10-01 | «Señores Diputados, en cumplimiento de un precepto constitucional, comparacemos hoy ante las Cortes» |
| `fila.guerra.negrin_figueres.V2` | 107326 | id | V2 | 1939-02-01 | «Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra» |
| `fila.guerra.negrin_figueres.v3` | 121447 | id | v3 | 1939-02-01 | «Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra» |
| `fila.guerra.no_existe.v3` | 121110 | id | v3 | 1936-10-01 | «NO EXISTE DATO ALGUNO» |
| `fila.guerra.nota_volumen.v3` | 121110 | id | v3 | 1936-10-01 | «CON POSTERIORIDAD AL 18 DE JULIO» |
| `fila.guerra.palacio_congreso.V2` | 107093 | id | V2 | 1936-10-01 | «Palacio del Congreso, 1.° de Octubre de 1936» |
| `fila.guerra.palacio_congreso.v3` | 121143 | id | v3 | 1936-10-01 | «Palacio del Congreso, 1.° de Octubre de 1936» |
| `fila.guerra.pestana_brigadas.V2` | 107193 | id | V2 | 1937-10-02 | «Hay brigadas, en sitios de peligro» |
| `fila.guerra.pestana_brigadas.v3` | 121275 | id | v3 | 1937-10-02 | «Hay brigadas, en sitios de peligro» |
| `fila.guerra.reservas.V2` | 107288 | id | V2 | 1938-09-30 | «El Gobierno no acepta, ni admite votos de confianza condicionados y con reservas» |
| `fila.guerra.reservas.v3` | 121397 | id | v3 | 1938-09-30 | «El Gobierno no acepta, ni admite votos de confianza condicionados y con reservas» |
| `fila.guerra.sabadell.V2` | 107319 | id | V2 | 1938-10-01 | «Sabadell, 1.° de Octubre de 1939» |
| `fila.guerra.sabadell.v3` | 121437 | id | v3 | 1938-10-01 | «Sabadell, 1.° de Octubre de 1939» |
| `fila.guerra.san_cugat.V2` | 107303 | id | V2 | 1938-09-30 | «del antiguo monasterio de San Cugat del Vallés» |
| `fila.guerra.san_cugat.v3` | 121412 | id | v3 | 1938-09-30 | «del antiguo monasterio de San Cugat del Vallés» |
| `fila.guerra.sesenta_y_dos.V2` | 107341 | id | V2 | 1939-02-01 | «Han votado afirmativamente los sesenta y dos señores Diputados» |
| `fila.guerra.sesenta_y_dos.v3` | 121464 | id | v3 | 1939-02-01 | «Han votado afirmativamente los sesenta y dos señores Diputados» |
| `fila.guerra.valencia.V2` | 107095 | id | V2 | 1936-12-01 | «al pueblo de Valencia» |
| `fila.guerra.valencia.v3` | 121147 | id | v3 | 1936-12-01 | «al pueblo de Valencia» |
| `fila.guerra.votacion_nominal_1939.V2` | 107340 | id | V2 | 1939-02-01 | «Se va a votar nominalmente la proposición presentada» |
| `fila.guerra.votacion_nominal_1939.v3` | 121462 | id | v3 | 1939-02-01 | «Se va a votar nominalmente la proposición presentada» |
| `fila.guerra.voto_convalidacion.V2` | 107312 | id | V2 | 1938-10-01 | «por 168 votos en pro y ninguno en contra» |
| `fila.guerra.voto_convalidacion.v3` | 121427 | id | v3 | 1938-10-01 | «por 168 votos en pro y ninguno en contra» |
