# Marcadores del copy · Versiones (`docs/copy_es/versiones.md`)

**Generado el 2026-09-22** por `docs/marcadores/comprobar_metodo_datos.py`, que lee las fuentes y comprueba sus huellas.
No se edita a mano. Lo implementa `exportador/modulos/datos.py`; la compilación falla si su valor no es el esperado.
`valor esperado` es el valor tal como lo pinta `cifras.ts` en español; `v` es lo que va en `src/data/cifras.json`
(los `pct` se guardan como proporción). Las claves compartidas con otros grupos van marcadas «compartida».

| clave | valor esperado | `v` · `t` | base | cómo se calcula |
|---|---:|---|---|---|
| `diputados.V2` | 773 | 773 · n | V2 | rep_id distintos · compartida |
| `dv.thqcmi.versiones` | 3 | 3 · n | dv | versiones publicadas de THQCMI · compartida |
| `dv.version` | V2.0 | V2.0 · texto | dv | versionNumber.versionMinorNumber · compartida |
| `fechas.filas` | 894 | 894 · n | V2 | filas con otra date o legislature entre la V1 (MD5 0a9adafe…) y la V2 · compartida |
| `fechas.filas.legislatura` | 91 | 91 · n | V2 | filas con otra legislature entre la V1 y la V2 (todas de la sesión 77, 1931-1933 → 1933-1935) |
| `fechas.sesiones` | 7 | 7 · n | V2 | sesiones con la fecha cambiada entre la V1 y la V2 (= changelog) · compartida |
| `fila.campoamor.id.V2` | 5424 | 5424 · id | V2 | id de la fila (1931-10-01, sesión 48, La Srta. CAMPOAMOR:) · compartida |
| `fila.campoamor.id.v3` | 6079 | 6079 · id | v3 | id v3 de la misma fila (La Srta. CAMPOAMOR:) · compartida |
| `fila.presidencia.id.V2` | 5423 | 5423 · id | V2 | id de la fila (1931-10-01, sesión 48, El Sr. PRESIDENTE:) · compartida |
| `fila.presidencia.id.v3` | 6078 | 6078 · id | v3 | id v3 de la misma fila (El Sr. PRESIDENTE:) · compartida |
| `filas.V2` | 107.551 | 107551 · n | V2 | recuento de filas del CSV depositado · compartida |
| `filas.v3` | 121.700 | 121700 · n | v3 | count(*) de speeches · compartida |
| `habla.v3` | 108.291 | 108291 · n | v3 | filas con papel ∉ {summary, remark} (lo que deja «Solo lo que se habla») · compartida |
| `orador.alba.palabras.V2` | 1.024.975 | 1024975 · n | V2 | nwords con rep_name = Santiago Alba Bonifaz (Presidencia incluida) |
| `orador.alba.perdida` | 67,0 % | 0.670449 · pct · dec 1 | v3 | 1 − nwords v3 / nwords V2 de Alba (337782 / 1024975) |
| `orador.besteiro.palabras.V2` | 1.028.999 | 1028999 · n | V2 | nwords con rep_name = Julian Besteiro Fernandez (Presidencia incluida) |
| `orador.besteiro.perdida` | 55,4 % | 0.553828 · pct · dec 1 | v3 | 1 − nwords v3 / nwords V2 de Besteiro (459111 / 1028999) |
| `orador.besteiro.presidencia.V2` | 995.577 | 995577 · n | V2 | las mismas, solo en filas de la Presidencia |
| `orador.negrin.ganancia` | 26,5 % | 0.265385 · pct · dec 1 | v3 | nwords v3 / nwords V2 de Negrín − 1 (55620 / 43955) |
| `orador.prieto.sp.V2` | 554.773 | 554773 · n | V2 | nwords de Prieto sin filas de la Presidencia (primero de la V2) |
| `orador.royo.sp.v3` | 534.408 | 534408 · n | v3 | nwords de Royo Villanova sin Presidencia en la v3 (primero) |
| `palabras.sumarios.v3` | 1.028.248 | 1028248 · n | v3 | nwords de las filas SUMARIO |
| `sesiones` | 755 | 755 · n | V2 | claves distintas (date, num_session) · compartida |
| `v3.comentarios` | 12.654 | 12654 · n | v3 | filas COMENTARIOS (papel remark) · compartida |
| `v3.filas_v2_con_habla` | 107.282 | 107282 · n | v3 | filas V2 con alguna pieza de habla |
| `v3.filas_v2_solo_comentario` | 269 | 269 · n | v3 | filas V2 sin pieza de habla |
| `v3.piezas_extra` | 274 | 274 · n | v3 | piezas de habla − filas V2 con habla (continuaciones) |
| `v3.piezas_habla` | 107.556 | 107556 · n | v3 | piezas de clase habla (mapa_v2_v3.json) |
| `v3.sumarios` | 755 | 755 · n | v3 | filas SUMARIO (papel summary) · compartida |
| `v3.turnos` | 735 | 735 · n | v3 | piezas de clase turno (mapa_v2_v3.json) = habla.v3 − piezas de habla · compartida |
| `pendiente.martinez_barrio_ar.filas` | 111 | 111 · n | V2 | filas del rep_id 550 (Diego Martinez Barrio) con party = "AR" en 1931-1933 (D-25) |
| `pendiente.lliga_cd.filas` | 1.841 | 1841 · n | V2 | filas con party = "Lliga" e ideology = "CD" (D-25) |
| `familias.liberal.filas` | 15.364 | 15364 · n | V2 | filas con party_family = "Liberal" (D-25) · compartida |
| `rep836.id` | 836 | 836 · id | V2 | único rep_id con dos rep_name distintos (D-25) · compartida |
| `etiquetas.diferencia` | 5 | 5 · n | V2 | etiquetas.n − filas.V2, sin documentar (D-25) · compartida |
