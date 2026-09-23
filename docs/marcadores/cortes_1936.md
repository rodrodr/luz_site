# Marcadores · Ficha III · Las Cortes de 1936, hasta la guerra (`docs/copy_es/cortes_1936.md`)

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
| `cortes.1936.biblioteca.actas.n` | 371 | v3 | entradas de la biblioteca del proyecto «Debate · Comisión de Actas (Cuenca y Granada)» (bibliotecas_v3.json › L2-B12; diálogo del explorador) |
| `cortes.1936.consulta.orden_publico.n` | 160 | v3 | FTS5 de corpus.sqlite: MATCH "orden publico" con date entre 1936-03-16 y 1936-07-10, todas las filas (sin «Solo lo que se habla»); comprobado el método con 6/40/531/2.028/724 del explorador |
| `cortes.1936.consulta.orden_publico.sesiones` | 44 | v3 | sesiones distintas de esos resultados |
| `cortes.1936.prieto_7abril.palabras` | 4796 | V2 | nwords de la fila V2 102323 (igual en v3 115638) |
| `cortes.1936.voto_3abril.no` | 88 | V2 | texto de la fila V2 102287 (v3 115595): votos en contra, «contra 88» |
| `cortes.1936.voto_3abril.si` | 181 | V2 | texto de la fila V2 102287 (v3 115595): «quedó aprobada la proposición por 181 votos contra 88» |
| `cortes.1936.votos.presidente_interino` | 386 | V2 | texto de la fila V2 101701 (v3 114881): «D. Diego Martínez Barrio, 386» |
| `etapa.III.debates` | 4 | v3 | debates preparados (bibliotecas L2) con sesiones en la etapa; declarado en base.md |
| `etapa.III.diputados` | 243 | V2 | rep_id distintos de la etapa, incluido el de quien preside |
| `cortes.1936.listas.en_presidencia` | 27 | V2 | de esas filas, las de la Presidencia (parse_speaker) · módulo: fichas.py (clave propia: la definición común de las listas es de sesiones) |
| `etapa.III.listas_nominales.filas` | 81 | V2 | filas cuyo texto plegado contiene «señores que dijeron\|han dicho» + «sí\|no» (definición común de cortes_a) |
| `etapa.III.listas_nominales.sesiones` | 32 | V2 | sesiones con al menos una de esas filas |
| `etapa.III.meses_con_sesion` | 5 | V2 | meses de la etapa con al menos una sesión (misma clave que cortes.md) |
| `etapa.III.palabras` | 1690319 | V2 | suma de nwords de la etapa |
| `etapa.III.palabras.pct` | 6.95 | V2 | palabras de la etapa / 24335896 (suma de nwords del CSV) × 100 |
| `etapa.III.pres.jimenez_de_asua` | 11 | proyecto | sesiones con sessions.json › presidente.clave = jimenez_de_asua |
| `etapa.III.pres.martinez_barrio` | 49 | proyecto | sesiones con sessions.json › presidente.clave = martinez_barrio |
| `etapa.III.serie` | Diario de las Sesiones de Cortes. Congreso de los Diputados | proyecto | sessions.json › diario (único en la etapa) |
| `etapa.III.sesiones` | 60 | V2 | sesiones (date, num_session) de legislature 1936-1939 con num_session en el tramo de la etapa |
| `etapa.III.vice_ses` | 44 | V2 | sesiones de la etapa III con alguna fila vicechair (parse_speaker del explorador); misma definición que pres.vice_ses de base |
| `familias.etapa.III.conservadores.pct` | 26.1 | V2 | palabras de «Conservadores» / palabras sin Presidencia de la etapa (1539440) × 100; familia normalizada como el explorador |
| `familias.etapa.III.republicanos.pct` | 28.4 | V2 | palabras de «Republicanos» / palabras sin Presidencia de la etapa (1539440) × 100; familia normalizada como el explorador |
| `oradores.etapa.III.1.pal` | 67874 | v3 | palabras de habla sin Presidencia del 1.º |
| `sesion.1936-04-07-15.diario` | 15 | proyecto | sessions.json › diario_num de la sesión 15 (1936-04-07); serie «Diario de las Sesiones de Cortes. Congreso de los Diputados» |
| `sesion.1936-04-07-15.id.desde` | 102289 | V2 | primer id V2 de la sesión (sessions.json › id_min; recontado en el CSV) |
| `sesion.1936-04-07-15.id.hasta` | 102374 | V2 | último id V2 de la sesión (sessions.json › id_max; recontado en el CSV) |
| `sesion.1936-04-07-15.pag.desde` | 237 | proyecto | sessions.json › page_start (page_status contiguous) |
| `sesion.1936-04-07-15.pag.hasta` | 272 | proyecto | sessions.json › page_end |
| `sesion.1936-07-01-54.palabras` | 97055 | V2 | suma de nwords de la sesión 54 (1936-07-01); la mayor de las 755 sesiones |
| `voto.238-5.no` | 5 | V2 | texto de la fila V2 102358 (v3 115675): votos en contra, «en contra 5». Clave de F26: dueño sesiones |
| `voto.238-5.si` | 238 | V2 | texto de la fila V2 102358 (v3 115675): «238 Sres. Diputados y en contra 5». Clave de F26: dueño sesiones |

## Guardas

> El copy escribe estos nombres (tabla de grafías) o concuerda en letra con estos valores («un debate»): si cambian en la exportación, la compilación falla.

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `oradores.etapa.III.1.rep_id` | 170 | v3 | rep_id del 1.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `oradores.etapa.III.2.rep_id` | 456 | v3 | rep_id del 2.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `oradores.etapa.III.3.rep_id` | 423 | v3 | rep_id del 3.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `oradores.etapa.III.4.rep_id` | 130 | v3 | rep_id del 4.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `oradores.etapa.III.5.rep_id` | 993 | v3 | rep_id del 5.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |

## Anclas (ids de fila y fragmento literal)

> Cada id es un marcador (`{{fila.<nombre>.V2|id}}`, `{{fila.<nombre>.v3|id}}`; tipo `id`, sin agrupar). El aserto de
> citas de la compilación debe encontrar el **fragmento, letra a letra**, dentro del texto de esa fila (espacios
> normalizados) y comprobar la fecha. «solo v3» = la V2 no tiene esa fila (sumarios, cabeceras y notas del volumen).
> Comprobado hoy: 0 fallos.

| clave | valor esperado | t | base | fecha | fragmento literal |
|---|---|---|---|---|---|
| `fila.1936.acta_solemne.v3` | 116860 | id | v3 | 1936-05-12 | «ocupó la silla de la Presidencia el Vicepresidente en funciones de Presidente D. Luis Jiménez de Asúa» |
| `fila.1936.actas_fin.V2` | 102250 | id | V2 | 1936-04-03 | «la Cámara ha decidido sobre la totalidad de las actas presentadas» |
| `fila.1936.actas_fin.v3` | 115551 | id | v3 | 1936-04-03 | «la Cámara ha decidido sobre la totalidad de las actas presentadas» |
| `fila.1936.articulo_81.V2` | 102249 | id | V2 | 1936-04-03 | «el primer acto de las nuevas Cortes será examinar y resolver sobre la necesidad del decreto» |
| `fila.1936.articulo_81.v3` | 115549 | id | v3 | 1936-04-03 | «el primer acto de las nuevas Cortes será examinar y resolver sobre la necesidad del decreto» |
| `fila.1936.calvo_pide.V2` | 104406 | id | V2 | 1936-06-03 | «no constarán en el Diario de Sesiones» |
| `fila.1936.calvo_pide.v3` | 118058 | id | v3 | 1936-06-03 | «no constarán en el Diario de Sesiones» |
| `fila.1936.cierre_10julio.V2` | 107065 | id | V2 | 1936-07-10 | «Orden del día para el martes» |
| `fila.1936.cierre_10julio.v3` | 121108 | id | v3 | 1936-07-10 | «Orden del día para el martes» |
| `fila.1936.convocatoria.v3` | 114890 | id | v3 | 1936-03-17 | «Las elecciones generales para Diputados a Cortes se celebrarán en toda España el domingo 16 de Febrero» |
| `fila.1936.crisis.V2` | 103383 | id | V2 | 1936-05-12 | «Encontrándose el Gobierno en crisis se suspenden las sesiones de Cortes» |
| `fila.1936.crisis.v3` | 116863 | id | v3 | 1936-05-12 | «Encontrándose el Gobierno en crisis se suspenden las sesiones de Cortes» |
| `fila.1936.descansando.V2` | 102365 | id | V2 | 1936-04-07 | «se hallaba descansando» |
| `fila.1936.descansando.v3` | 115686 | id | v3 | 1936-04-07 | «se hallaba descansando» |
| `fila.1936.galarza.V2` | 106289 | id | V2 | 1936-07-01 | «no se consigna por orden del Sr. Presidente» |
| `fila.1936.galarza.v3` | 120221 | id | v3 | 1936-07-01 | «no se consigna por orden del Sr. Presidente» |
| `fila.1936.incitacion.V2` | 102483 | id | V2 | 1936-04-15 | «Se acaba de hacer una incitación al asesinato» |
| `fila.1936.incitacion.v3` | 115827 | id | v3 | 1936-04-15 | «Se acaba de hacer una incitación al asesinato» |
| `fila.1936.junta_viva.v3` | 114890 | id | v3 | 1936-03-17 | «solicitó de la Presidencia un viva a la República, negándose el Sr. Presidente» |
| `fila.1936.no_constara_6mayo.V2` | 103251 | id | V2 | 1936-05-06 | «No constará en el Diario de Sesiones» |
| `fila.1936.no_constara_6mayo.v3` | 116698 | id | v3 | 1936-05-06 | «No constará en el Diario de Sesiones» |
| `fila.1936.no_constaran_15abril.V2` | 102484 | id | V2 | 1936-04-15 | «Esas palabras no constarán en el Diario de Sesiones» |
| `fila.1936.no_constaran_15abril.v3` | 115828 | id | v3 | 1936-04-15 | «Esas palabras no constarán en el Diario de Sesiones» |
| `fila.1936.no_constaran_1julio.V2` | 106290 | id | V2 | 1936-07-01 | «no constarán en el Diario de Sesiones» |
| `fila.1936.no_constaran_1julio.v3` | 120222 | id | v3 | 1936-07-01 | «no constarán en el Diario de Sesiones» |
| `fila.1936.no_se_consignan_16junio.V2` | 105324 | id | V2 | 1936-06-16 | «no se consignan por orden» |
| `fila.1936.no_se_consignan_16junio.v3` | 119098 | id | v3 | 1936-06-16 | «no se consignan por orden» |
| `fila.1936.no_se_consignan_6mayo.V2` | 103182 | id | V2 | 1936-05-06 | «no se consignan por orden» |
| `fila.1936.no_se_consignan_6mayo.v3` | 116626 | id | v3 | 1936-05-06 | «no se consignan por orden» |
| `fila.1936.pasa_a_ser.V2` | 102368 | id | V2 | 1936-04-07 | «pasa a ser Presidente de la República» |
| `fila.1936.pasa_a_ser.v3` | 115690 | id | v3 | 1936-04-07 | «pasa a ser Presidente de la República» |
| `fila.1936.presidente_interino.V2` | 101701 | id | V2 | 1936-03-16 | «Queda proclamado Presidente interino del Congreso D. Diego Martínez Barrio» |
| `fila.1936.presidente_interino.v3` | 114881 | id | v3 | 1936-03-16 | «Queda proclamado Presidente interino del Congreso D. Diego Martínez Barrio» |
| `fila.1936.prieto_7abril.V2` | 102323 | id | V2 | 1936-04-07 | «Señores Diputados, son más sagrados los deberes cuanto más penosos» |
| `fila.1936.prieto_7abril.v3` | 115638 | id | v3 | 1936-04-07 | «Señores Diputados, son más sagrados los deberes cuanto más penosos» |
| `fila.1936.propuesta_81.V2` | 102247 | id | V2 | 1936-04-03 | «procede, con arreglo a lo dispuesto en el art. 81 de la Constitución, examinar y resolver sobre la necesidad del referido decreto» |
| `fila.1936.propuesta_81.v3` | 115547 | id | v3 | 1936-04-03 | «procede, con arreglo a lo dispuesto en el art. 81 de la Constitución, examinar y resolver sobre la necesidad del referido decreto» |
| `fila.1936.propuesta_destitucion.V2` | 102304 | id | V2 | 1936-04-07 | «no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936» |
| `fila.1936.propuesta_destitucion.v3` | 115618 | id | v3 | 1936-04-07 | «no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936» |
| `fila.1936.retirada.V2` | 101915 | id | V2 | 1936-03-31 | «dejamos en vuestras manos, señores de la mayoría, la suerte del sistema parlamentario» |
| `fila.1936.retirada.v3` | 115160 | id | v3 | 1936-03-31 | «dejamos en vuestras manos, señores de la mayoría, la suerte del sistema parlamentario» |
| `fila.1936.retirada_ct.V2` | 101931 | id | V2 | 1936-03-31 | «una retirada del Parlamento» |
| `fila.1936.retirada_ct.v3` | 115177 | id | v3 | 1936-03-31 | «una retirada del Parlamento» |
| `fila.1936.retirada_re.V2` | 101921 | id | V2 | 1936-03-31 | «la retirada de este salón» |
| `fila.1936.retirada_re.v3` | 115167 | id | v3 | 1936-03-31 | «la retirada de este salón» |
| `fila.1936.sedicioso.V2` | 107066 | id | V2 | 1936-10-01 | «ese movimiento sedicioso» |
| `fila.1936.sedicioso.v3` | 121111 | id | v3 | 1936-10-01 | «ese movimiento sedicioso» |
| `fila.1936.solemne.V2` | 103342 | id | V2 | 1936-05-08 | «para que el Presidente electo preste la promesa» |
| `fila.1936.solemne.v3` | 116810 | id | v3 | 1936-05-08 | «para que el Presidente electo preste la promesa» |
| `fila.1936.viva_cierre.V2` | 101705 | id | V2 | 1936-03-16 | «¡Viva la República! ¡Viva España!» |
| `fila.1936.viva_cierre.v3` | 114888 | id | v3 | 1936-03-16 | «¡Viva la República! ¡Viva España!» |
| `fila.1936.voto_3abril.V2` | 102287 | id | V2 | 1936-04-03 | «quedó aprobada la proposición por 181 votos contra 88» |
| `fila.1936.voto_3abril.v3` | 115595 | id | v3 | 1936-04-03 | «quedó aprobada la proposición por 181 votos contra 88» |
| `fila.1936.voto_destitucion.V2` | 102358 | id | V2 | 1936-04-07 | «El Reglamento dispone que se haga nominalmente» |
| `fila.1936.voto_destitucion.v3` | 115674 | id | v3 | 1936-04-07 | «El Reglamento dispone que se haga nominalmente» |
