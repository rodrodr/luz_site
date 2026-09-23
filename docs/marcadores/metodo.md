# Marcadores del copy · Método (`docs/copy_es/metodo.md`)

**Generado el 2026-09-22** por `docs/marcadores/comprobar_metodo_datos.py`, que lee las fuentes y comprueba sus huellas.
No se edita a mano. Lo implementa `exportador/modulos/metodo.py`; la compilación falla si su valor no es el esperado.
`valor esperado` es el valor tal como lo pinta `cifras.ts` en español; `v` es lo que va en `src/data/cifras.json`
(los `pct` se guardan como proporción). Las claves compartidas con otros grupos van marcadas «compartida».

| clave | valor esperado | `v` · `t` | base | cómo se calcula |
|---|---:|---|---|---|
| `columnas.V2` | 14 | 14 · n | V2 | columnas del CSV (sin las derivadas de este cálculo) · compartida |
| `diputados.comparten_apellido` | 317 | 317 · n | proyecto | diputados que intervienen (rep_id de la V2) cuyo primer apellido (diputados_21_06_encode.csv) comparte otro; 538 apellidos distintos entre 773 |
| `etiquetas.diferencia` | 5 | 5 · n | V2 | etiquetas.n − filas.V2 (sin documentar) |
| `etiquetas.falsos_positivos` | 1.532 | 1532 · n | V2 | README depositado, SECTION 4 («filtering 1,532 false positives») |
| `etiquetas.filtro.letras` | 3 | 3 · n | V2 | README SECTION 4 («3-character all-capitals word»); tag_speakers.py [A-ZÁÉÍÓÚÜÑ]{3,} |
| `etiquetas.n` | 107.556 | 107556 · n | V2 | README depositado, SECTION 4 («107,556 tags retained») |
| `familias.V2` | 33 | 33 · n | V2 | valores distintos de party_family, en bruto · compartida |
| `familias.liberal.filas` | 15.364 | 15364 · n | V2 | filas con party_family = "Liberal" |
| `familias.v3` | 24 | 24 · n | v3 | valores distintos de party_family normalizada, sin «Sin identificar» · compartida |
| `fechas.filas` | 894 | 894 · n | V2 | filas con otra date o legislature entre la V1 (MD5 0a9adafe…) y la V2 · compartida |
| `fechas.sesiones` | 7 | 7 · n | V2 | sesiones con la fecha cambiada entre la V1 y la V2 (= changelog) · compartida |
| `fila.azana1935.id.V2` | 85330 | 85330 · id | V2 | id de la fila V2 (1935-03-20, El Sr. AZANA:) · compartida |
| `fila.azana1935.nwords` | 14.131 | 14131 · n | V2 | nwords de la fila V2 85330 (= v3 96282) |
| `fila.bucle9.id.V2` | 976 | 976 · id | V2 | fila del bucle de la sesión 9 (1931-07-27) |
| `fila.campoamor.id.V2` | 5424 | 5424 · id | V2 | id de la fila (1931-10-01, sesión 48, La Srta. CAMPOAMOR:) · compartida |
| `fila.campoamor.id.v3` | 6079 | 6079 · id | v3 | id v3 de la misma fila (La Srta. CAMPOAMOR:) · compartida |
| `fila.campoamor.nwords` | 1.460 | 1460 · n | V2 | nwords de la fila V2 5424 · compartida |
| `fila.campoamor.orden.V2` | 26 | 26 · id | V2 | order de la fila V2 5424 · compartida |
| `fila.campoamor.orden.pantalla` | 30 | 30 · id | explorador | «Orden 30 de 415» en el lector del explorador (captura c_lector_campoamor_1440): ord + 1 · compartida |
| `fila.campoamor.orden.v3` | 29 | 29 · id | v3 | ord de la fila v3 6079 · compartida |
| `fila.estatuto.id.V2` | 25979 | 25979 · id | V2 | id de la fila V2 (1932-05-27, El Sr. PRESIDENTE:) · compartida |
| `fila.estatuto.id.v3` | 29042 | 29042 · id | v3 | turno rescatado de Azaña (27-V-1932) en la v3 |
| `fila.estatuto.nwords.v3` | 17.142 | 17142 · n | v3 | nwords de la fila v3 29042 |
| `fila.lista.nwords` | 233 | 233 · n | V2 | nwords de la fila V2 5453 · compartida |
| `fila.presidencia.id.V2` | 5423 | 5423 · id | V2 | id de la fila (1931-10-01, sesión 48, El Sr. PRESIDENTE:) · compartida |
| `fila.presidencia.id.v3` | 6078 | 6078 · id | v3 | id v3 de la misma fila (El Sr. PRESIDENTE:) · compartida |
| `fila.presidencia.nwords` | 7 | 7 · n | V2 | nwords de la fila V2 5423 · compartida |
| `fila.presidencia.orden.V2` | 25 | 25 · id | V2 | order de la fila V2 5423 · compartida |
| `fila.presidencia.orden.v3` | 28 | 28 · id | v3 | ord de la fila v3 6078 · compartida |
| `fila.prieto.documentos` | 21.638 | 21638 · n | v3 | nwords de las piezas de comentario de V2 55221 (v3 61930 + 61932) |
| `fila.prieto.habla` | 3.733 | 3733 · n | v3 | nwords de las piezas de habla de V2 55221 (v3 61929 + 61931) |
| `fila.prieto.id.V2` | 55221 | 55221 · id | V2 | id de la fila V2 (1933-07-12, El Sr. Ministro de OBRAS PÚBLICAS:) · compartida |
| `fila.prieto.nwords` | 25.371 | 25371 · n | V2 | nwords de la fila V2 55221 (la más larga) |
| `filas.V2` | 107.551 | 107551 · n | V2 | recuento de filas del CSV depositado · compartida |
| `filas.con_diputado` | 107.404 | 107404 · n | V2 | filas con rep_id · compartida |
| `filas.con_diputado.pct` | 99,86 % | 0.998633 · pct | V2 | filas con rep_id / filas |
| `filas.sin_diputado` | 147 | 147 · n | V2 | filas sin rep_id · compartida |
| `filas.sin_diputado.ministerio` | 123 | 123 · n | V2 | filas sin rep_id cuya fórmula el analizador del explorador lee como ministro (rol minister) |
| `filas.v3` | 121.700 | 121700 · n | v3 | count(*) de speeches · compartida |
| `habla.v3` | 108.291 | 108291 · n | v3 | filas con papel ∉ {summary, remark} (lo que deja «Solo lo que se habla») · compartida |
| `ideologia.ceda.C` | 51 | 51 · n | V2 | filas con party = "CEDA" e ideology = "C" |
| `ideologia.ceda.CD` | 255 | 255 · n | V2 | filas con party = "CEDA" e ideology = "CD" |
| `ideologia.ceda.D` | 7.656 | 7656 · n | V2 | filas con party = "CEDA" e ideology = "D" |
| `ideologia.partidos_varios` | 5 | 5 · n | V2 | partidos con más de un código de ideology (sin el espacio final); 6 si no se quita · compartida |
| `leg.1931-1933.palabras.pct` | 53,28 % | 0.532805 · pct | V2 | nwords de 1931-1933 / nwords · compartida |
| `longitud.curva.corte` | 10,00 % | 0.100000 · pct | V2 | punto anotado de F11 (parte de filas, de la más larga a la más corta) |
| `longitud.curva.corte2` | 20,00 % | 0.200000 · pct | V2 | punto anotado de F11 (parte de filas, de la más larga a la más corta) |
| `longitud.curva.palabras` | 74,5 % | 0.744878 · pct · dec 1 | V2 | parte de nwords en el 10 % de filas más largas (curva de F11) |
| `longitud.curva.palabras2` | 90,4 % | 0.903751 · pct · dec 1 | V2 | parte de nwords en el 20 % de filas más largas (curva de F11) |
| `longitud.hasta50` | 71.550 | 71550 · n | V2 | filas con nwords ≤ 50 |
| `longitud.hasta50.pct` | 66,53 % | 0.665266 · pct | V2 | filas con nwords ≤ 50 / filas · compartida |
| `longitud.hasta50.pct.v3` | 69,02 % | 0.690205 · pct | v3 | filas de la v3 con nwords ≤ 50 / filas de la v3 |
| `longitud.hasta50.presidencia.pct` | 58,17 % | 0.581747 · pct | V2 | filas de la Presidencia entre las de nwords ≤ 50 |
| `longitud.mediana` | 14 | 14 · n | V2 | mediana de nwords |
| `longitud.umbral` | 50 | 50 · n | V2 | umbral de fila breve del sitio (límite del tramo 21–50 de F10) · compartida |
| `ocr.bucle9.repeticiones` | 6 | 6 · n | V2 | apariciones de "Sánchez Guerra, Ossorio y Gallardo" en la fila V2 976 |
| `ocr.bucles.paginas` | 276 | 276 · n | proyecto | suma de ocr.loop_pages (páginas releídas por bucle) |
| `ocr.fallidas.paginas` | 153 | 153 · n | proyecto | suma de ocr.failed_pages (sessions.json) |
| `ocr.fallidas.sesiones` | 131 | 131 · n | proyecto | sesiones con ocr.failed_pages |
| `ocr.incidencias` | 2 | 2 · n | proyecto | incidencias declaradas en sessions.json (ocr_loop · truncated_end) |
| `ocr.recuperadas` | 29 | 29 · n | proyecto | páginas en repaired_pages (TXT_OCR_REPAIRED/*.meta.json); modelo: ['glm-ocr'] |
| `ocr.tesseract.paginas` | 124 | 124 · n | proyecto | páginas en tesseract_pages (TXT_OCR_TESSERACT/*.meta.json) |
| `ocr.tesseract.sesiones` | 106 | 106 · n | proyecto | archivos con tesseract_pages |
| `paginas.total` | 28.780 | 28780 · n | proyecto | suma de pdf_pages (sessions.json); = total_pages de TXT_OCR/*.meta.json · compartida |
| `palabras.V2` | 24.335.896 | 24335896 · n | V2 | suma de nwords · compartida |
| `pres.vice_ses` | 586 | 586 · n | V2 | sesiones (date, num_session) con alguna fila de rol vicechair (parse_speaker del explorador); 584 si se cuentan fechas · compartida |
| `ses.s48.cola` | 5 | 5 · n | V2 | filas finales de la sesión 48 que repiten «Pido la palabra» · compartida |
| `ses.s48.cola.V2.desde` | 5788 | 5788 · id | V2 | primera de esas filas en la V2 · compartida |
| `ses.s48.cola.V2.hasta` | 5792 | 5792 · id | V2 | última de esas filas en la V2 · compartida |
| `ses.s48.cola.pantalla.desde` | 411 | 411 · id | explorador | orden en pantalla (ord + 1) de la primera · compartida |
| `ses.s48.cola.pantalla.hasta` | 415 | 415 · id | explorador | orden en pantalla (ord + 1) de la última · compartida |
| `ses.s48.cola.v3.desde` | 6460 | 6460 · id | v3 | primera de las cinco filas finales en la v3 · compartida |
| `ses.s48.cola.v3.hasta` | 6464 | 6464 · id | v3 | última de las cinco filas finales en la v3 · compartida |
| `sesion.1931-10-01-48.filas_v3` | 415 | 415 · n | v3 | filas de la sesión 48 en la v3 · compartida |
| `sesiones` | 755 | 755 · n | V2 | claves distintas (date, num_session) · compartida |
| `v3.comentarios` | 12.654 | 12654 · n | v3 | filas COMENTARIOS (papel remark) · compartida |
| `v3.comentarios.en_presidencia` | 67,14 % | 0.671408 · pct | v3 | bloques de comentario cuya fila V2 de origen es de la Presidencia |
| `v3.turnos` | 735 | 735 · n | v3 | piezas de clase turno (mapa_v2_v3.json) = habla.v3 − piezas de habla · compartida |
| `v3.turnos.en_presidencia` | 66,26 % | 0.662585 · pct | v3 | turnos rescatados cuya fila V2 de origen es de la Presidencia |
| `vinculo.corregidas` | 367 | 367 · n | V2 | README depositado, SECTION 4 («367 assignments were corrected») |
| `vinculo.umbral` | 0,82 | 0.820000 · ratio · dec 2 | V2 | README SECTION 4 (0.82); link_deputies.py, difflib.get_close_matches cutoff 0.82 |
| `voto.161-121.V2` | 5453 | 5453 · id | V2 | fila de la Presidencia con la lista nominal del 1-X-1931 (compartida con Inicio) · compartida |
| `voto.161-121.no` | 121 | 121 · n | V2 | «Total, 121.» en el texto de la fila V2 5453 (compartido con Sesiones) · compartida |
| `voto.161-121.si` | 161 | 161 · n | V2 | «Total, 161.» en el texto de la fila V2 5453 (compartido con Sesiones) · compartida |


## Lista blanca de `check-i18n` para Método

Cadenas con dígitos que no son cifras del corpus (las lee `scripts/vetos.mjs › literalesBlancos`).

- «E1 Sr.»: `metodo.02.texto`: variante de lectura de la fórmula «El Sr.» (el 1 es una l mal leída)
- «escriba 77»: `metodo.07.pruebelo.explorador`: lo que se teclea en «Nº de sesión» para la sesión 77
- «type 77»: lo mismo en el borrador inglés de `metodo.07.pruebelo.explorador`
