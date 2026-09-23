# Marcadores del copy · Usar los datos (`docs/copy_es/datos.md`)

**Generado el 2026-09-22** por `docs/marcadores/comprobar_metodo_datos.py`, que lee las fuentes y comprueba sus huellas.
No se edita a mano. Lo implementa `exportador/modulos/datos.py`; la compilación falla si su valor no es el esperado.
`valor esperado` es el valor tal como lo pinta `cifras.ts` en español; `v` es lo que va en `src/data/cifras.json`
(los `pct` se guardan como proporción). Las claves compartidas con otros grupos van marcadas «compartida».

| clave | valor esperado | `v` · `t` | base | cómo se calcula |
|---|---:|---|---|---|
| `columnas.V2` | 14 | 14 · n | V2 | columnas del CSV (sin las derivadas de este cálculo) · compartida |
| `csv.celdas_largas` | 289 | 289 · n | V2 | filas con len(speech) > 32.767 (máximo de una celda de Excel) |
| `csv.fila_mas_larga.caracteres` | 170.413 | 170413 · n | V2 | len(speech) máximo (fila 55221) |
| `distritos.V2` | 54 | 54 · n | V2 | valores distintos de district |
| `distritos.agrarios.filas` | 8 | 8 · n | V2 | filas con district = "Agrarios" |
| `dv.csv.bytes` | 158,1 MB | 165785782 · peso | dv | filesize de 2REP_Diaries.csv (API de Dataverse, 2026-09-22) · compartida |
| `dv.version` | V2.0 | V2.0 · texto | dv | versionNumber.versionMinorNumber · compartida |
| `explorador.gz.bytes` | 106,6 MB | 111733652 · peso | explorador | manifiesto del corpus servido: suma de los tres trozos corpus.sqlite.gz (HEAD: 45.000.000 + 45.000.000 + 21.733.652). El copy lo imprime en unidad decimal, formato `peso_dec0`: «unos 112 MB comprimidos» (plan D-26 (a)) · compartida |
| `familias.V2` | 33 | 33 · n | V2 | valores distintos de party_family, en bruto · compartida |
| `familias.v3` | 24 | 24 · n | v3 | valores distintos de party_family normalizada, sin «Sin identificar» · compartida |
| `familias.vacias` | 151 | 151 · n | V2 | filas con party_family vacía |
| `fechas.filas` | 894 | 894 · n | V2 | filas con otra date o legislature entre la V1 (MD5 0a9adafe…) y la V2 · compartida |
| `fechas.sesiones` | 7 | 7 · n | V2 | sesiones con la fecha cambiada entre la V1 y la V2 (= changelog) · compartida |
| `fila.azana1935.id.V2` | 85330 | 85330 · id | V2 | id de la fila V2 (1935-03-20, El Sr. AZANA:) · compartida |
| `fila.campoamor.id.V2` | 5424 | 5424 · id | V2 | id de la fila (1931-10-01, sesión 48, La Srta. CAMPOAMOR:) · compartida |
| `fila.campoamor.id.v3` | 6079 | 6079 · id | v3 | id v3 de la misma fila (La Srta. CAMPOAMOR:) · compartida |
| `fila.campoamor.orden.V2` | 26 | 26 · id | V2 | order de la fila V2 5424 · compartida |
| `fila.campoamor.orden.pantalla` | 30 | 30 · id | explorador | «Orden 30 de 415» en el lector del explorador (captura c_lector_campoamor_1440): ord + 1 · compartida |
| `fila.campoamor.orden.v3` | 29 | 29 · id | v3 | ord de la fila v3 6079 · compartida |
| `fila.estatuto.id.V2` | 25979 | 25979 · id | V2 | id de la fila V2 (1932-05-27, El Sr. PRESIDENTE:) · compartida |
| `fila.lista.nwords` | 233 | 233 · n | V2 | nwords de la fila V2 5453 · compartida |
| `fila.lista.split` | 522 | 522 · n | V2 | len(speech.split()) de la fila V2 5453 |
| `fila.presidencia.id.V2` | 5423 | 5423 · id | V2 | id de la fila (1931-10-01, sesión 48, El Sr. PRESIDENTE:) · compartida |
| `fila.presidencia.id.v3` | 6078 | 6078 · id | v3 | id v3 de la misma fila (El Sr. PRESIDENTE:) · compartida |
| `fila.presidencia.orden.V2` | 25 | 25 · id | V2 | order de la fila V2 5423 · compartida |
| `fila.presidencia.orden.v3` | 28 | 28 · id | v3 | ord de la fila v3 6078 · compartida |
| `fila.prieto.id.V2` | 55221 | 55221 · id | V2 | id de la fila V2 (1933-07-12, El Sr. Ministro de OBRAS PÚBLICAS:) · compartida |
| `filas.V2` | 107.551 | 107551 · n | V2 | recuento de filas del CSV depositado · compartida |
| `filas.sin_diputado` | 147 | 147 · n | V2 | filas sin rep_id · compartida |
| `fragmentos.fecha` | (la de la exportación) | AAAA-MM-DD · fecha | V2 | fecha de la última ejecución de los dos fragmentos de Datos |
| `ideologia.c_espacio` | 93 | 93 · n | V2 | filas con ideology = "C " (con espacio) |
| `ideologia.partidos_varios` | 5 | 5 · n | V2 | partidos con más de un código de ideology (sin el espacio final); 6 si no se quita · compartida |
| `leg.1931-1933.filas` | 61.355 | 61355 · n | V2 | filas de 1931-1933 |
| `leg.1931-1933.palabras` | 12.966.290 | 12966290 · n | V2 | nwords de 1931-1933 · compartida |
| `leg.1931-1933.palabras.pct` | 53,28 % | 0.532805 · pct | V2 | nwords de 1931-1933 / nwords · compartida |
| `leg.1931-1933.palabras_por_sesion` | 32.016 | 32016 · n | V2 | nwords de 1931-1933 / sus sesiones, redondeado a la unidad |
| `leg.1931-1933.sesiones` | 405 | 405 · n | V2 | claves (date, num_session) de 1931-1933 · compartida |
| `leg.1933-1935.filas` | 40.342 | 40342 · n | V2 | filas de 1933-1935 |
| `leg.1933-1935.palabras` | 9.476.120 | 9476120 · n | V2 | nwords de 1933-1935 · compartida |
| `leg.1933-1935.palabras_por_sesion` | 34.334 | 34334 · n | V2 | nwords de 1933-1935 / sus sesiones, redondeado a la unidad |
| `leg.1933-1935.sesiones` | 276 | 276 · n | V2 | claves (date, num_session) de 1933-1935 · compartida |
| `leg.1936-1939.filas` | 5.854 | 5854 · n | V2 | filas de 1936-1939 |
| `leg.1936-1939.palabras` | 1.893.486 | 1893486 · n | V2 | nwords de 1936-1939 · compartida |
| `leg.1936-1939.palabras_por_sesion` | 25.588 | 25588 · n | V2 | nwords de 1936-1939 / sus sesiones, redondeado a la unidad |
| `leg.1936-1939.sesiones` | 74 | 74 · n | V2 | claves (date, num_session) de 1936-1939 · compartida |
| `longitud.hasta50.pct` | 66,53 % | 0.665266 · pct | V2 | filas con nwords ≤ 50 / filas · compartida |
| `longitud.mas300` | 17.362 | 17362 · n | V2 | filas con nwords > 300 |
| `longitud.mas300.palabras.pct` | 86,18 % | 0.861829 · pct | V2 | nwords de las filas > 300 / nwords |
| `longitud.umbral` | 50 | 50 · n | V2 | umbral de fila breve del sitio (límite del tramo 21–50 de F10) · compartida |
| `longitud.umbral300` | 300 | 300 · n | V2 | umbral de fila larga (límite del tramo 101–300 de F10) |
| `mes.1933-02.filas` | 1.843 | 1843 · n | V2 | filas de febrero de 1933 · compartida |
| `mes.1933-02.palabras` | 574.317 | 574317 · n | V2 | nwords de febrero de 1933 · compartida |
| `mes.1933-02.sesiones` | 16 | 16 · n | V2 | sesiones de febrero de 1933 · compartida |
| `meses.con_sesion` | 64 | 64 · n | V2 | meses AAAA-MM con alguna fila · compartida |
| `palabras.V2` | 24.335.896 | 24335896 · n | V2 | suma de nwords · compartida |
| `palabras.habla.v3` | 22.096.389 | 22096389 · n | v3 | suma de nwords sin SUMARIO ni COMENTARIOS · compartida |
| `palabras.split.V2` | 24.700.474 | 24700474 · n | V2 | suma de len(speech.split()) (separa por cualquier espacio en blanco) |
| `palabras.tendencia.v3` | 25.903.736 | 25903736 · n | v3 | tokens del índice FTS5 (fts5vocab); = meta.expresiones.tokens_corpus, denominador de la Tendencia |
| `palabras.v3` | 25.364.144 | 25364144 · n | v3 | suma de nwords en la v3 · compartida |
| `presidencia.aprox.filas` | 48.203 | 48203 · n | V2 | la línea de datos.decisiones.1.codigo: speaker contiene "PRESIDENTE" y no "CONSEJO|GOBIERNO|REPÚBLICA" |
| `presidencia.filas` | 48.241 | 48241 · n | V2 | filas con rol chair, vicechair o chair_age (parse_speaker) |
| `presidencia.filas.pct` | 44,85 % | 0.448541 · pct | V2 | filas de la Presidencia / filas · compartida |
| `presidencia.palabras.pct` | 10,24 % | 0.102378 · pct | V2 | nwords de la Presidencia / nwords · compartida |
| `rep836.id` | 836 | 836 · id | V2 | único rep_id con dos rep_name distintos (Amos Ruiz Lecina · Mariano Ruiz Funes Garcia) |
| `sesiones` | 755 | 755 · n | V2 | claves distintas (date, num_session) · compartida |
| `sesiones.fechas_dobles` | 3 | 3 · n | V2 | fechas con dos claves de sesión · compartida |
| `sesiones.num1` | 3 | 3 · n | V2 | claves con num_session = 1 · compartida |
| `union.filas.sin_ficha` | 426 | 426 · n | afin | filas V2 de esos pares |
| `union.pares` | 1.060 | 1060 · n | afin | pares (rep_id, legislatura recodificada) de la V2 |
| `union.pares.casan` | 1.047 | 1047 · n | afin | pares con ficha en representative_metadata (CGOCUS V1.1) |
| `union.pares.otro_partido` | 31 | 31 · n | afin | pares cuyo party (moda en la V2) ≠ partido en CGOCUS |
| `union.pares.sin_ficha` | 13 | 13 · n | afin | pares sin ficha |
| `union.solo_id.filas` | 247.327 | 247327 · n | afin | filas tras unir solo por rep_id = id_dip (left join) |
| `v3.comentarios` | 12.654 | 12654 · n | v3 | filas COMENTARIOS (papel remark) · compartida |
| `voto.161-121.V2` | 5453 | 5453 · id | V2 | fila de la Presidencia con la lista nominal del 1-X-1931 (compartida con Inicio) · compartida |

El motivo del formulario (D-20) ya no es un marcador: es texto del copy (`comun.fija.formulario.motivo`).
