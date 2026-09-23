# Marcadores · Afinidades Elegidas (`docs/copy_es/afinidades.md`)

Recalculados el **22-09-2026** sobre **CGOCUS V1.1** (doi:10.7910/DVN/CGOCUS, versión 1.1 del 06-05-2026, UNF
`UNF:6:CMFrKjuOq5l9fBChyzsMsQ==`), no copiados de los informes. El exportador (`afinidades.py`) los implementa y
**falla** si el valor calculado no es el esperado. Ninguno sale de la página de Afinidades mientras D-3 siga abierta.

**Entradas, con el MD5 del original que da la API de Dataverse** (comprobado hoy, byte a byte):

| archivo en CGOCUS | copia legible | MD5 |
|---|---|---|
| `2REP_coauthor_edgelist.tab` | `2REP/2REP_Coautorias/data/dataverse/2REP_coauthor_edgelist.csv` (= `docs/estudio/critica/afin_coauthor_edgelist.csv`) | `b70d64da33a723973851ebbb18a32f85` |
| `representative_metadata.tab` | `…/data/dataverse/representative_metadata.csv` (separador «,») | `c9e660131cbfbe0ac96e56e59c94837d` |
| `2REP_cosponsorship.tab` | `…/data/dataverse/2REP_cosponsorship.csv` | `30732c9d4415f6cb6d734004c03ee657` |
| `representatives_metrics.json` | `…/data/dataverse/representatives_metrics.json` | `5c24a3b8f9eb9d6d2b251a88a51e8ea9` |
| `representatives_roles.json` | `…/data/dataverse/representatives_roles.json` | `1c9d30f94c56cc7a2ae9e27313094b59` |

`afin_diputados_basico.csv` (MD5 `27b39239…`) es el mismo censo con «;». **No se usa** `corregido/` (v2, sin
depositar) ni `figs/afinidades/data/afin_*.json` (red con 476/476/502 nodos y 80 trayectorias).

**Reglas de cálculo**

- Legislaturas: `1931-1933`, `1933-1936`, `1936-1939` (claves `1931`, `1933`, `1936`). Rótulo tal cual (D-6).
- Censo de la legislatura = fichas de `representative_metadata` con esa `legislatura`.
- Firmantes = `id_dip1 ∪ id_dip2` del edgelist de la legislatura. **Firman** = firmantes ∩ censo; **aislados** = censo
  − firmantes; **fuera del censo** = firmantes − censo. Aserto: censo = firman + aislados.
- Bloque: `EI, I, CI` → izquierda; `C` → centro; `CD, D, ED` → derecha, sobre la `ideologia` de la ficha de esa
  legislatura; si el firmante no tiene ficha en ella, la `ideologia` de `representatives_metrics.json › deputies`.
  Con esa regla ninguna fila queda sin bloque.
- Denominador de los cruces: **filas del edgelist** de la legislatura (relaciones par-medida), no pares distintos.
- Transversalidad: `metrics[leg].transversality_score` de `representatives_metrics.json`, ordenado de mayor a menor
  entre todos los diputados con métricas en esa legislatura (476 / 476 / 502), **sin filtro de grado**.

## Censo, firmas y medidas

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `afin.relaciones` | 63.507 | n | afin | filas del edgelist (la metodología dice 63.508 «aristas»: son filas par × medida, y hay una menos) |
| `afin.personas` | 1.026 | n | afin | `id_dip` distintos del censo |
| `afin.medidas` | 1.530 | n | afin | `id_medida` distintos del edgelist (medidas con dos firmantes identificados o más) · aserto: 674 + 767 + 89 |
| `afin.tres_leg` | 78 | n | afin | `id_dip` con fichas en las tres legislaturas (no 80: `representatives_roles.json` suma a Suárez Picallo y a Marial Mundet, que el censo no tiene en las tres) |
| `afin.1931.censo` · `afin.1933.censo` · `afin.1936.censo` | 475 · 470 · 501 | n | afin | fichas por legislatura |
| `afin.1931.firman` · `.1933.` · `.1936.` | 453 · 440 · 315 | n | afin | firmantes ∩ censo (**no** 454 · 446 · 316, que incluyen a los de fuera del censo) |
| `afin.1931.aislados` · `.1933.` · `.1936.` | 22 · 30 · 186 | n | afin | censo − firmantes |
| `afin.1931.fuera_censo` · `.1933.` · `.1936.` | 1 · 6 · 1 | n | afin | firmantes − censo (1931: Félix Fernández Vega; 1933: Valdés, Azorín, Alberca, Crespo, Suárez Picallo y Espada; 1936: Marial Mundet) |
| `afin.1931.medidas` · `.1933.` · `.1936.` | 674 · 767 · 89 | n | afin | `id_medida` distintos por legislatura |
| `afin.1931.relaciones` · `.1933.` · `.1936.` | 30.345 · 27.172 · 5.990 | n | afin | filas del edgelist por `id_legislature` |
| `afin.firmas` | 13.452 | n | afin | filas de `2REP_cosponsorship` (una por firma de una medida; la metodología dice 94.621, cifra vetada) |
| `afin.firmas_sin_diputado` | 781 | n | afin | filas de `2REP_cosponsorship` con `id_dip` vacío (5,8 %) |
| `afin.medidas_sin_relacion` | 65 | n | afin | `id_medida` de `2REP_cosponsorship` con menos de dos `id_dip` distintos (1.595 − 1.530) |

## Cruces (F22 y su lectura)

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `afin.1931.cruce_bloque` · `.1933.` · `.1936.` | 35,1 % · 23,0 % · 7,4 % (0,3506 · 0,2304 · 0,0738) | pct · formato `pct1` | afin | filas con los dos firmantes en bloques distintos / filas (10.639 / 30.345 · 6.260 / 27.172 · 442 / 5.990) |
| `afin.1931.cruce_estricto` · `.1933.` · `.1936.` | 7,1 % · 2,5 % · 5,8 % (0,0709 · 0,0254 · 0,0579) | pct · formato `pct1` | afin | filas izquierda–derecha / filas (2.150 · 689 · 347) |
| `afin.1931.cruce_centro` · `.1933.` · `.1936.` | 79,8 % · 89,0 % · 21,5 % (0,7979 · 0,8899 · 0,2149) | pct · formato `pct1` | afin | filas que cruzan de bloque con un firmante del centro / filas que cruzan de bloque (8.489 / 10.639 · 5.571 / 6.260 · 95 / 442) |
| `afin.1936.medidas_estricto` | 16 | n | afin | `id_medida` con al menos una fila izquierda–derecha en 1936-1939 (en 1931: 196 de 674; en 1933: 78 de 767) |
| `afin.1936.estricto_pnv` | 24,5 % (0,2450) | pct · formato `pct1` | afin | filas izquierda–derecha de 1936-1939 cuyo firmante de derecha tiene `partido` = `PNV` en su ficha / filas izquierda–derecha (85 / 347). La CEDA suma 97. **Desmiente** «casi todo el cruce estricto es con el PNV» |
| — (aserto) | CD | texto | afin | `ideologia` de todas las fichas del PNV: CD en las tres legislaturas (7 · 12 · 9 fichas) |

## Redes (F21 y su lectura)

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| — (aserto) | 1 · 1 | n | afin | componentes conexas del grafo de 1931-1933 y de 1933-1936 restringido a los firmantes del censo (453 y 440 nodos) |
| `afin.1936.fuera_principal` | 5 → «cinco» | n · formato `letra` | afin | firmantes del censo de 1936-1939 fuera de la componente mayor (componentes de 310, 3 y 2 nodos: 315 − 310) |
| `afin.1931.modularidad` | 0,377 | n · dec 3 | afin | `party_communities['1931-1933'].modularity` de `representatives_metrics.json` |
| `afin.1936.modularidad` | 0,503 | n · dec 3 | afin | `party_communities['1936-1939'].modularity` (0,5029); la de 1933-1936 es 0,335 y no se cita |

## Personas

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `afin.1931.puentes.n` | 3 → «tres» | n · formato `letra` | afin | tamaño del grupo nombrado; aserto: los puestos 1 a 3 de 1931-1933 son `id_dip` 50 (Melquíades Álvarez, 0,933), 290 (Estelrich, 0,929) y 960 (Unamuno, 0,919) |
| — (aserto) | 229 · 184 · 446 | texto | afin | `afinidades.puentes.1933` («encabezan la lista»): puestos 1 a 3 de 1933-1936 = `id_dip` 229 (Chapaprieta, 0,898), 184 (Cano López, 0,896) y 446 (Iranzo, 0,894) |
| `afin.1936.puentes.n` | 5 → «cinco» | n · formato `letra` | afin | aserto: en 1936-1939, `id_dip` 16 (Aguirre, 0,883) es 2.º e `id_dip` 448 (Irujo, 0,870) es 5.º; los dos, `partido` PNV, `ideologia` CD |

## Grafías (F21)

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `afin.sin_grafia` | 253 | n | afin | `id_dip` distintos del censo que no están en `src/data/grafias.json` (la tabla cubre a los 773 oradores de la V2; los demás no hablaron). Su nombre va como lo escribe CGOCUS, con las partículas en minúscula |

## Límites

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `afin.1936.medidas_antes` | 85 | n | afin | medidas de 1936-1939 del edgelist cuya `fecha_sesion` (primera fila de la medida en `2REP_cosponsorship`) es anterior a 1936-07-18; las 4 restantes son del 1-X-1936 (2), 1-II-1937 y 30-IX-1938 |
| `afin.truncadas.medidas` | 175 | n | afin | medidas del edgelist cuyo `texto_medida` (en `2REP_cosponsorship`) casa con `siguen\s+(?:las\s+)?firmas` sin distinguir mayúsculas («Siguen las firmas hasta 47») · aserto: son el 13,2 % de las relaciones (8.379 de 63.507) |

## De `base.py` (dv; ya están en `src/data/cifras.json`, el copy solo los usa)

| clave | valor esperado | tipo | base | cómo se calcula |
|---|---|---|---|---|
| `dv.cgocus.archivos` | 8 → «ocho» | n · formato `letra` | dv | `latestVersion.files` de la API de Dataverse para doi:10.7910/DVN/CGOCUS |
| `dv.cgocus.version` | V1.1 | texto | dv | `latestVersion` (versionNumber.versionMinorNumber) de la API; los asientos de la página la citan |
| `dv.cgocus.version.fecha` | 2026-05-06 | fecha | dv | `latestVersion.releaseTime` de la API |
| `dv.cgocus.readme.bytes` | 14.919 | peso | dv | `filesize` de `00_README.txt` |
| `dv.cgocus.edgelist.bytes` | 5.515.047 (5,3 MB) | peso | dv | `2REP_coauthor_edgelist.tab` (el original, 4.943.485) |
| `dv.cgocus.cosponsorship.bytes` | 16.650.794 (15,9 MB) | peso | dv | `2REP_cosponsorship.tab` |
| `dv.cgocus.metadata.bytes` | 156.736 | peso | dv | `representative_metadata.tab` |
| `dv.cgocus.metrics.bytes` | 17.748.967 (16,9 MB) | peso | dv | `representatives_metrics.json` |
| `dv.cgocus.roles.bytes` | 84.347 | peso | dv | `representatives_roles.json` |
| `dv.cgocus.methodology.bytes` | 78.085 | peso | dv | `METHODOLOGY.md` |
| `dv.cgocus.codebook.bytes` | 31.236 | peso | dv | `CODEBOOK.md` |
| `dv.cgocus.cita` | «Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Afinidades Elegidas: Parliamentary Cosponsorship Networks of the Spanish Second Republic (1931-1939)", https://doi.org/10.7910/DVN/CGOCUS, Harvard Dataverse, V1, UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]» | texto | dv | la API (`versions/:latest-published/citation`), desescapada y sin `<a>`; consultada hoy y ya igual en `cifras.json`. La pinta el componente `Cita` |

**Formatos en el copy.** Los porcentajes van con `|pct1` (un decimal: «35,1 %»); el valor es la fracción (0,3506). Las
modularidades, `t: n` con `dec: 3` («0,503»). Los recuentos, `n` por omisión.

**Pendiente del investigador (D-3).** Si deposita CGOCUS V2.0, todos estos valores cambian (con la v2 local, por
ejemplo: cruce de bloque 35,4 · 22,7 · 7,1 %; estricto 7,6 · 2,5 · 5,5 %). Entonces se vuelve a exportar sobre la V2.0 y
se sustituyen los valores esperados; el copy no cambia, salvo `afinidades.datos.cita_version`.
