# Marcadores · Fichas de etapa: piezas propias de la plantilla, F05 y F09 (`docs/copy_es/cortes_fichas.md`)

> Grupo 2 (fichas). Formato del contrato: `clave | valor esperado | base | cómo se calcula`. Módulo:
> `exportador/modulos/fichas.py` (lo llama `cortes.py`). Valores de la exportación del 23-09-2026, comprobados con el
> exportador sobre la V2 (MD5 `360332a0…`) y la v3 (sha256 `3a0d8b2d…`). Las cifras de F05 y F09 que citan las cinco
> fichas se declaran en su tabla (`cortes_<etapa>.md`); aquí, las que pinta la plantilla para las cinco.

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `{{oradores.etapa.I.diez.pct\|pct0}}` | 21 % | v3 | palabras de habla sin Presidencia de los diez primeros / las de la etapa I (2.425.212 / 11.444.854) |
| `{{oradores.etapa.II.diez.pct\|pct0}}` | 19 % | v3 | ídem, etapa II |
| `{{oradores.etapa.III.diez.pct\|pct0}}` | 27 % | v3 | ídem, etapa III |
| `{{oradores.etapa.IV.diez.pct\|pct0}}` | 71 % | v3 | ídem, etapa IV |
| `{{oradores.etapa.V.diez.pct\|pct0}}` | 74 % | v3 | ídem, etapa V |
| `oradores.etapa.I.diputados` | 416 | v3 | rep_id distintos con alguna fila de habla sin Presidencia en la etapa (plan V22: 416 / 390 / 244 / 43 / 27) |
| `oradores.etapa.II.diputados` | 390 | v3 | ídem |
| `oradores.etapa.III.diputados` | 244 | v3 | ídem |
| `oradores.etapa.IV.diputados` | 43 | v3 | ídem |
| `oradores.etapa.V.diputados` | 27 | v3 | ídem |
| `oradores.etapa.III.den` | 1.479.781 | v3 | palabras de habla sin Presidencia de la etapa (plan H4) |
| `oradores.etapa.IV.den` | 102.052 | v3 | ídem |
| `oradores.etapa.V.den` | 64.724 | v3 | ídem |
| `{{familias.umbral.pct\|pct0}}` | 1 % | V2 | regla del plan (F09): por debajo, «Otras» en el gráfico |
| `familias.etapa.I.den` | 11.778.885 | V2 | palabras V2 sin la Presidencia de la etapa I |
| `familias.etapa.II.den` | 8.366.772 | V2 | ídem, etapa II |
| `familias.etapa.III.den` | 1.539.440 | V2 | ídem, etapa III (cortes_1936.md cita este denominador) |
| `familias.etapa.IV.den` | 94.377 | V2 | ídem, etapa IV (cortes_guerra.md) |
| `familias.etapa.V.den` | 64.953 | V2 | ídem, etapa V (cortes_mexico.md) |
| `oradores.diputados` | 772 | v3 | rep_id distintos con alguna fila de habla sin Presidencia: los que trae `oradores_etapa.csv` (plan H4 y V22) |
