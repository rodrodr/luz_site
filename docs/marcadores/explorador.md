# Marcadores · El explorador (`docs/copy_es/explorador.md`)

Recalculados el **22-09-2026** sobre la fuente, no copiados de los informes. El exportador los implementa y **falla** si
el valor calculado no es el esperado (salvo las fechas de ejecución, que solo se comprueban de forma).

**Fuentes y huellas**

- **v3**: `/Users/rodrodr/.cache/luz_site/corpus.sqlite`, sha256 `3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15`
  (la que sirve `luz_explorer/datos/corpus.sqlite.gz.000-.002`). Tabla `speeches` y su índice `speeches_fts`
  (FTS5, `unicode61 remove_diacritics 2`: sin tildes ni mayúsculas, como el buscador del explorador).
- **Bibliotecas del proyecto**: `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/dist/bibliotecas/*.2replib`
  (31 archivos del 20-09-2026; `corpus` = `2REP_Diaries_v3`), cruzados con la v3 por `speech_id` = `speeches.id`.
- **explorador**: cabeceras HEAD de `https://rodrodr.github.io/luz_explorer/datos/corpus.sqlite.gz.00{0,1,2}`, pedidas
  hoy: 45.000.000 + 45.000.000 + 21.733.652 = 111.733.652 B (`last-modified: Mon, 21 Sep 2026 00:43:01 GMT`).

**Definiciones que usa todo el archivo**

- «Solo lo que se habla» = `speaker NOT IN ('SUMARIO','COMENTARIOS')` (108.291 filas; coincide con `role ∉ {summary,
  remark}` del motor del explorador).
- Consulta del explorador → FTS5: `"frase"` igual; `a | b` → `a OR b`; `a + b` → `a AND b`; palabras sueltas sin
  comillas → AND implícito. Comprobado contra la pantalla: `"voto femenino" | "voto de la mujer"` da 40 en los dos.
- Orden «Relevancia» = `ORDER BY bm25(speeches_fts)` (reproduce el orden de la pantalla para `catolica`).

Plantilla de cálculo (Python, `sqlite3` de la biblioteca estándar):

```python
db = sqlite3.connect('file:…/corpus.sqlite?mode=ro', uri=True)
HABLA = "s.speaker NOT IN ('SUMARIO','COMENTARIOS')"
def n(match, extra=''):
    return db.execute(f"SELECT count(*) FROM speeches_fts f JOIN speeches s ON s.id = f.rowid "
                      f"WHERE speeches_fts MATCH ? {extra}", (match,)).fetchone()[0]
```

## De `base.py` (compartidos; ya están en `src/data/cifras.json`, el copy solo los usa)

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `filas.v3` | 121.700 | n | v3 | `SELECT count(*) FROM speeches` |
| `filas.V2` | 107.551 | n | V2 | filas de `2REP_Diaries.csv` (MD5 `360332a0…`) |
| `habla.v3` | 108.291 | n | v3 | filas con `speaker NOT IN ('SUMARIO','COMENTARIOS')` (= `role ∉ {summary, remark}`) |
| `v3.huella` | 3a0d8b2d | texto | v3 | ocho primeros hexadecimales del sha256 de `corpus.sqlite` |
| `explorador.gz.bytes` | 111733652 | peso · formato `peso_dec0` | explorador | suma de los tres trozos `corpus.sqlite.gz` (manifiesto; HEAD de hoy: 45.000.000 + 45.000.000 + 21.733.652). Se imprime en unidad decimal: «unos 112 MB comprimidos» (D-26 (a)); en la de Dataverse serían 106,6 MB |
| `bib.n` | 31 | n | v3 | archivos `*.2replib` |
| `bib.entradas` | 24.029 | n | v3 | suma de `len(items)` · aserto: 20.443 `speech_id` distintos (el copy dice «entradas», nunca «intervenciones») |
| `explorador.construido` | 2026-09-16 | fecha | explorador | manifiesto del explorador publicado: fecha en que se construyó la base servida (asiento de la cabecera) |
| `v3.sumarios` | 755 | n | v3 | filas `SUMARIO` (role summary) |
| `explorador.capturas.fecha` | 2026-09-22 | fecha | explorador | fecha de las capturas, del `LEEME.md` de `src/assets/explorador/` (explorador.py; la pidió «capturas» a base.py) |

## De `explorador.py` (F29 y bibliotecas)

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `busquedas.fecha` | 2026-09-22 (la de la exportación) | fecha | v3 | fecha de ejecución; se comprueba solo que exista y que la huella de la v3 sea la del sello |
| `busqueda.voto_femenino.n` | 20 | n | v3 | `n('"voto femenino"')` |
| `busqueda.voto_mujer.n` | 28 | n | v3 | `n('"voto de la mujer"')` |
| `busqueda.voto_union.n` | 40 | n | v3 | `n('"voto femenino" OR "voto de la mujer"')` |
| `busqueda.voto_ambas.n` | 8 | n | v3 | `n('"voto femenino" AND "voto de la mujer"')` · aserto: 20 + 28 − 8 = 40 |
| `busqueda.voto_union.desde` | 1931-09-01 | fecha | v3 | `min(s.date)` de la unión |
| `busqueda.voto_union.hasta` | 1933-12-15 | fecha | v3 | `max(s.date)` de la unión |
| `busqueda.casas_viejas.n` | 375 | n | v3 | `n('"casas viejas"')` |
| `busqueda.casas_viejas.habla` | 316 | n | v3 | `n('"casas viejas"', 'AND ' + HABLA)` |
| `busqueda.casas_viejas.primera` | 1933-02-01 | fecha | v3 | `min(s.date)`; la primera fila es de habla (Eduardo Ortega y Gasset, v3 50124) |
| `busqueda.casas_viejas.m1933_02` | 114 | n | v3 | `n('"casas viejas"', "AND substr(s.date,1,7)='1933-02'")` · es la cifra de la nota de Tendencia en la captura |
| `busqueda.casas_viejas.m1933_02_habla` | 102 | n | v3 | lo mismo con `AND ` + HABLA (Tendencia con «Solo lo que se habla» y «aplicar filtros») |
| — (aserto, sin marcador) | 0 | n | v3 | sesiones de enero de 1933: `count(DISTINCT date||num_session) WHERE substr(date,1,7)='1933-01'`; el pie dice «no hubo sesiones» |
| `busqueda.divorcio.n` | 531 | n | v3 | `n('divorcio')` |
| `busqueda.divorcio.habla` | 454 | n | v3 | con HABLA |
| `busqueda.reforma_agraria.n` | 2.028 | n | v3 | `n('"reforma agraria"')` |
| `busqueda.reforma_agraria_y.n` | 2.125 | n | v3 | `n('reforma agraria')` (sin comillas: las dos palabras, en cualquier orden) |
| `busqueda.estatuto.n` | 724 | n | v3 | `n('"estatuto de cataluña"')` |
| `busqueda.estatuto.habla` | 493 | n | v3 | con HABLA · aserto: las 231 restantes son `COMENTARIOS` (147) y `SUMARIO` (84) |
| `busqueda.catolica.n` | 6 | n | v3 | `n('"España ha dejado de ser católica"')` |
| `busqueda.catolica.puesto_azana` | 4 | n | v3 | posición (desde 1) de la fila v3 **7531** (Azaña, 13-X-1931) en `ORDER BY bm25(speeches_fts)`; la primera es Royo Villanova, v3 24106 |
| `bib.debates` | 26 | n | v3 | bibliotecas cuya clave (`generado.biblioteca`) empieza por `L2` |
| `bib.debates_enteros` | 25 → «veinticinco» | n · formato `letra` | v3 | debates cuyas entradas = todas las filas de habla de sus sesiones (clave de sesión `(date, num_session)`); la excepción es `L2-B6` «Reforma agraria y Sanjurjada» (4.497 de 9.036) |
| `bib.sufragio.n` | 770 | n | v3 | `len(items)` de `L2-B2_debate-sufragio-femenino.2replib` (lo usa el texto alternativo de `bibliotecas.png`) |

**Datos de F29 para `busquedas.json` / `busquedas.csv`**: `[{id, consulta_pantalla, consulta_fts, n, habla}]` con los
ocho `id` de `explorador.md` (`fig.F29.<id>.*`), la fecha y la huella de la v3. La consulta de pantalla es la de
`fig.F29.<id>.consulta` (con `|`); la de FTS, la de esta tabla (con `OR`).

**Comprobaciones de hoy que no son marcadores** (sirven al copy, no se pintan):
- Tecla `/` → el foco va a `INPUT#q`; `Intro` lanza la búsqueda (40 resultados). Orden: Relevancia · Fecha ↑ · Fecha ↓
  · Más largas · Más cortas.
- Menciones, «Método y límites» (biblioteca del sufragio): cargos sin nombre «aún sin atribuir»; precisión «revisada a
  mano en muestras de los dieciséis parlamentos»; «El recuerdo no está medido» («su señoría»…).
- Sesiones del 30-IX y 1-X-1931 (v3): «pena de muerte» en 16 filas de la sesión 47; «telefónica» en 21 y «huelga» en
  11 de la sesión 48. Respaldan el pie del léxico y `explorador.bibliotecas.enteras`.
- «Recordar la base» (C4): falla el guardado automático en Chromium (modo nuevo sin interfaz) y en WebKit, con perfiles
  nuevos, el 22-09-2026. Por eso no hay marcador ni frase.
