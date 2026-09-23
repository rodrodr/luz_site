# Marcadores · Ficha V · Las Cortes en México (`docs/copy_es/cortes_mexico.md`)

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
| `cortes.mexico.consulta.diputacion_permanente.n` | 16 | v3 | FTS5 de corpus.sqlite: MATCH "diputacion permanente" con date entre 1945-01-10 y 1945-11-09, todas las filas (sin «Solo lo que se habla»); comprobado el método con 6/40/531/2.028/724 del explorador |
| `cortes.mexico.consulta.diputacion_permanente.sesiones` | 3 | v3 | sesiones distintas de esos resultados |
| `cortes.mexico.dp.acuerdos` | 32 | v3 | acuerdos numerados «N.—ACUERDO» en la relación leída el 1945-01-10 (v3 121466, fila del sumario; solo en la v3) |
| `cortes.mexico.fallecidos.n` | 127 | V2 | líneas «APELLIDOS (D. Nombre).» de la lista de fallecidos en la fila V2 107342 (igual en v3 121467) |
| `cortes.mexico.giral.palabras` | 7446 | V2 | nwords de la fila V2 107375 (igual en v3 121507) |
| `cortes.mexico.prieto_8nov.palabras` | 5622 | V2 | nwords de la fila V2 107446; la v3 la parte en 121586 y 121588 |
| `cortes.mexico.voto_8nov.si` | 106 | V2 | texto de la fila V2 107442 (v3 121582): «106 votos a favor y ninguno en contra» |
| `etapa.V.diputados` | 29 | V2 | rep_id distintos de la etapa, incluido el de quien preside |
| `etapa.V.meses_con_sesion` | 3 | V2 | meses de la etapa con al menos una sesión (misma clave que cortes.md) |
| `etapa.V.palabras` | 75458 | V2 | suma de nwords de la etapa |
| `etapa.V.palabras.pct` | 0.31 | V2 | palabras de la etapa / 24335896 (suma de nwords del CSV) × 100 |
| `etapa.V.serie` | Extracto oficial de las sesiones de Cortes celebradas en México (exilio) | proyecto | sessions.json › diario (único en la etapa) |
| `etapa.V.sesiones` | 5 | V2 | sesiones (date, num_session) de legislature 1936-1939 con num_session en el tramo de la etapa |
| `familias.etapa.V.republicanos.pct` | 45.9 | V2 | palabras de «Republicanos» / palabras sin Presidencia de la etapa (64953) × 100; familia normalizada como el explorador |
| `familias.etapa.V.socialista.pct` | 34.4 | V2 | palabras de «Socialista» / palabras sin Presidencia de la etapa (64953) × 100; familia normalizada como el explorador |
| `oradores.etapa.V.1.pal` | 9792 | v3 | palabras de habla sin Presidencia del 1.º |
| `sesion.1945-08-17-71.diario` | 71 | proyecto | sessions.json › diario_num (serie «Extracto oficial de las sesiones de Cortes celebradas en México (exilio)»; sin páginas) |
| `sesion.1945-08-17-71.filas.v3` | 10 | v3 | filas v3 de la sesión 71 (1945-08-17): 121495–121504 |
| `sesion.1945-08-17-71.id.desde` | 107369 | V2 | primer id V2 de la sesión |
| `sesion.1945-08-17-71.id.hasta` | 107373 | V2 | último id V2 de la sesión |

## Guardas

> El copy escribe estos nombres (tabla de grafías) o concuerda en letra con estos valores («un debate»): si cambian en la exportación, la compilación falla.

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `oradores.etapa.V.1.rep_id` | 384 | v3 | rep_id del 1.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `oradores.etapa.V.2.rep_id` | 754 | v3 | rep_id del 2.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `oradores.etapa.V.3.rep_id` | 306 | v3 | rep_id del 3.º por palabras de habla sin Presidencia (guarda del nombre escrito en el copy) |
| `etapa.V.debates` | 1 | v3 | ídem; el copy dice «un debate» |

## Anclas (ids de fila y fragmento literal)

> Cada id es un marcador (`{{fila.<nombre>.V2|id}}`, `{{fila.<nombre>.v3|id}}`; tipo `id`, sin agrupar). El aserto de
> citas de la compilación debe encontrar el **fragmento, letra a letra**, dentro del texto de esa fila (espacios
> normalizados) y comprobar la fecha. «solo v3» = la V2 no tiene esa fila (sumarios, cabeceras y notas del volumen).
> Comprobado hoy: 0 fallos.

| clave | valor esperado | t | base | fecha | fragmento literal |
|---|---|---|---|---|---|
| `fila.guerra.paris.V2` | 107341 | id | V2 | 1939-02-01 | «las cuatro de la Diputación Permanente, celebradas en París» |
| `fila.guerra.paris.v3` | 121465 | id | v3 | 1939-02-01 | «las cuatro de la Diputación Permanente, celebradas en París» |
| `fila.mexico.accede.V2` | 107543 | id | V2 | 1945-11-09 | «La Minoría Socialista accede muy gustosamente» |
| `fila.mexico.accede.v3` | 121691 | id | v3 | 1945-11-09 | «La Minoría Socialista accede muy gustosamente» |
| `fila.mexico.aclamacion.V2` | 107425 | id | V2 | 1945-11-07 | «es aprobada por aclamación la propuesta leida» |
| `fila.mexico.aclamacion.v3` | 121560 | id | v3 | 1945-11-07 | «es aprobada por aclamación la propuesta leida» |
| `fila.mexico.comision_estatuto.V2` | 107466 | id | V2 | 1945-11-09 | «una Comisión especial para dictamar sobre el Estatuto autónómico de la Región gallega» |
| `fila.mexico.comision_estatuto.v3` | 121614 | id | v3 | 1945-11-09 | «una Comisión especial para dictamar sobre el Estatuto autónómico de la Región gallega» |
| `fila.mexico.costa_amic.v3` | 121466 | id | v3 | 1945-01-10 | «México D.F.: B. Costa i Amic» |
| `fila.mexico.dimision_azana.v3` | 121466 | id | v3 | 1945-01-10 | «Darse por enterada de la dimisión del Excelentísimo señor Presidente de la República, don Manuel Azaña Díaz» |
| `fila.mexico.dp_sin_textos.v3` | 121466 | id | v3 | 1945-01-10 | «no se dispone de los textos ni en forma de fotocopia» |
| `fila.mexico.exequias.V2` | 107344 | id | V2 | 1945-01-10 | «celebrábamos las exequias temporales de la República Española» |
| `fila.mexico.exequias.v3` | 121470 | id | v3 | 1945-01-10 | «celebrábamos las exequias temporales de la República Española» |
| `fila.mexico.fallecidos.V2` | 107342 | id | V2 | 1945-01-10 | «relación de señores diputados fallecidos desde julio de 1936 hasta la fecha» |
| `fila.mexico.fallecidos.v3` | 121467 | id | v3 | 1945-01-10 | «relación de señores diputados fallecidos desde julio de 1936 hasta la fecha» |
| `fila.mexico.fuerza_mayor.V2` | 107429 | id | V2 | 1945-11-07 | «las circunstancias que impiden con carácter de fuerza mayor la convocatoria de elecciones» |
| `fila.mexico.fuerza_mayor.v3` | 121567 | id | v3 | 1945-11-07 | «las circunstancias que impiden con carácter de fuerza mayor la convocatoria de elecciones» |
| `fila.mexico.giral.V2` | 107375 | id | V2 | 1945-11-07 | «el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente» |
| `fila.mexico.giral.v3` | 121507 | id | v3 | 1945-11-07 | «el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente» |
| `fila.mexico.gracias_mexico.V2` | 107551 | id | V2 | 1945-11-09 | «agradecer emocionadamente a México, a su Gobierno, a su Prensa y a su pueblo» |
| `fila.mexico.gracias_mexico.v3` | 121699 | id | v3 | 1945-11-09 | «agradecer emocionadamente a México, a su Gobierno, a su Prensa y a su pueblo» |
| `fila.mexico.lamoneda.V2` | 107402 | id | V2 | 1945-11-07 | «No otorgaremos, pues, la confianza al Gobierno» |
| `fila.mexico.lamoneda.v3` | 121535 | id | v3 | 1945-11-07 | «No otorgaremos, pues, la confianza al Gobierno» |
| `fila.mexico.orden_promesa.V2` | 107371 | id | V2 | 1945-08-17 | «Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española» |
| `fila.mexico.orden_promesa.v3` | 121500 | id | v3 | 1945-08-17 | «Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española» |
| `fila.mexico.prieto_8nov.V2` | 107446 | id | V2 | 1945-11-08 | «En nombre de la Minoria a que pertenezco» |
| `fila.mexico.prieto_8nov.v3` | 121586 | id | v3 | 1945-11-08 | «En nombre de la Minoria a que pertenezco» |
| `fila.mexico.prieto_8nov_b.v3` | 121588 | id | v3 |  | «(segunda fila del mismo discurso)» |
| `fila.mexico.relacion.v3` | 121466 | id | v3 | 1945-01-10 | «de 2 de febrero de 1939 a 9 de enero de 1945» |
| `fila.mexico.santiago_chile.V2` | 107485 | id | V2 | 1945-11-09 | «de Santiago de Chile para asistir a estas sesiones» |
| `fila.mexico.santiago_chile.v3` | 121633 | id | v3 | 1945-11-09 | «de Santiago de Chile para asistir a estas sesiones» |
| `fila.mexico.satisfaccion.V2` | 107540 | id | V2 | 1945-11-09 | «dar esta satisfacción moral a nuestros compañeros los Diputados gallegos» |
| `fila.mexico.satisfaccion.v3` | 121688 | id | v3 | 1945-11-09 | «dar esta satisfacción moral a nuestros compañeros los Diputados gallegos» |
| `fila.mexico.si_prometo.V2` | 107372 | id | V2 | 1945-08-17 | «Si, prometo» |
| `fila.mexico.si_prometo.v3` | 121502 | id | v3 | 1945-08-17 | «Si, prometo» |
| `fila.mexico.voto_8nov.V2` | 107442 | id | V2 | 1945-11-08 | «106 votos a favor y ninguno en contra» |
| `fila.mexico.voto_8nov.v3` | 121582 | id | v3 | 1945-11-08 | «106 votos a favor y ninguno en contra» |
