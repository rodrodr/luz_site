# Peticiones del copy de Método, Usar los datos y Versiones (22-09-2026)

Dueño: copy de `docs/copy_es/metodo.md`, `datos.md` y `versiones.md`, y sus marcadores (`docs/marcadores/metodo.md`,
`datos.md`, `versiones.md`, generados por `docs/marcadores/comprobar_metodo_datos.py`). Nada de lo que sigue lo he
tocado yo: son peticiones a su dueño.

## Al exportador (`exportador/modulos/metodo.py` y `datos.py`)

1. **Marcadores.** Los 148 de `docs/marcadores/marcadores_metodo_datos.json` (mismo formato que `cifras.json`: `v`,
   `t`, `base`, `f`, `d`, y `dec` donde hace falta). `comprobar_metodo_datos.py` es la implementación de referencia:
   comprueba las huellas y calcula cada uno sobre su fuente en unos 10 s. Los nombres ya están alineados con
   `base.md` e `inicio.md` (`sesiones`, `pres.vice_ses`, `leg.<leg>.*`, `fila.presidencia.*`, `fila.campoamor.*`,
   `voto.161-121.*`, `sesion.1931-10-01-48.filas_v3`, `dv.thqcmi.versiones`…): mismo nombre, mismo valor.
2. **Fragmentos.** `docs/marcadores/ejecutar_fragmentos.py` extrae los dos bloques de `datos.md` (claves
   `datos.codigo.r` y `datos.codigo.python`), los ejecuta junto al CSV V2 y a `representative_metadata.tab`
   (reconstruido del original depositado de CGOCUS V1.1, 156.736 bytes como el `.tab` de Dataverse), comprueba que R y
   Python dan lo mismo y que reproducen los marcadores. Pido que el exportador lo llame y copie la salida a
   `public/datos/fragmentos_salida.txt`, y que **falle** si cambia: el copy promete que «la compilación falla si su
   salida deja de coincidir».
3. **Datos de figura** (nombres de `src/lib/figuras.ts`):
   - `pasos` (F19): los cinco pasos con `sesiones`, `paginas.total`, `ocr.fallidas.paginas`, `etiquetas.n`,
     `etiquetas.falsos_positivos`, `filas.V2`, `filas.con_diputado`, `vinculo.corregidas`.
   - `fila_ejemplo` (F20): las 14 columnas de V2 5423 y 5424, y de v3 6078 y 6079 los campos `ord`, `speaker_fold`,
     `rep_name_fold`, `party_family_raw`, `ideology_raw`, `year`.
   - `longitud` (F10/F11): diez tramos (0–5 · 6–10 · 11–20 · 21–50 · 51–100 · 101–300 · 301–1.000 · 1.001–3.000 ·
     3.001–10.000 · más de 10.000) × Presidencia/resto × legislatura, en filas y en palabras, más la curva de 100 puntos
     (`docs/estudio/datos/calc_longitud.py` ya lo hace).
   - `fila_larga` (F12): V2 55221 → v3 61929 habla · 61930 comentario · 61931 habla · 61932 comentario; V2 25979 →
     29041 Presidencia · 29042 turno; V2 85330 → 96282; con `nwords` y las primeras palabras de cada pieza.
   - `columnas` (F32): nombre, tipo, vacíos (147/151/0) y valores en 5423 y 5424.
   - `palabras` (F33): los cinco recuentos (`palabras.V2`, `palabras.split.V2`, `palabras.v3`, `palabras.habla.v3`,
     `palabras.tendencia.v3`).
   - `union` (F34): los pasos y los 13 pares sin ficha (rep_id, legislatura, filas) con el nombre de `grafias.json`.
   - `fechas_corregidas` (F25): de `erratas_fechas_V1.csv` (sesión, legislatura V1/V2, fecha V1/V2, ids, filas) más la
     clave de prueba por sesión: s52 y s78 `cabeceras`+`danada`; s293, s295 y s311 `cabeceras`+`errata`; s321
     `cabeceras`+`portada`; s77 `cabeceras`+`serie` (`AUDITORIA_FECHAS.md`). Comprobado: la V1 depositada y la V2 solo
     difieren en `date` (894 filas) y `legislature` (91).
   - `destino_filas` (F18): 107.556 habla · 735 turnos · 12.654 comentarios · 755 sumarios = 121.700; la compilación
     debe fallar si no suman.
   - `quien_habla` (F07): los diez primeros por `nwords` en la V2 (Besteiro, Alba, Prieto, Royo Villanova, Azaña,
     Guerra del Río, Balbontín, Lamamié de Clairac, Casanueva, Jiménez Fernández), con filas y palabras en V2 y v3 y la
     parte en la Presidencia; la tabla completa de los 773 en la pestaña Datos.

## A `comun.md`

4. Uso sus claves tal cual: `comun.fija.diario`, `.formulario`, `.formulario.motivo` (D-20), `.ids`, `.contar`,
   `.ocr`, `.sesion48`, `.legislatura`, `.readme`, `.sin_formulario`, `.explorador`, `.local`, y los sellos
   `comun.sello.V2 · v3 · proyecto · afin`. Si cambia una redacción, cambia sola en mis páginas.
5. Aviso: `afinidades.md` repite `comun.fija.sello.afin`, que no existe; el sello es `comun.sello.afin`.

## A Inicio

6. Método 09 pinta en pequeño las cuatro cajas de Inicio con sus claves (`inicio.no_trae.cajas`,
   `inicio.no_trae.caja.*`): si cambian de nombre, avíseme.

## A figuras (`figuras.md`)

7. Los textos de F19, F20, F10/F11, F12, F32, F33, F34, F25, F18, F07 y F35 viven en `metodo.md`, `datos.md` y
   `versiones.md` (`fig.F19.*`, `fig.F20.*`, `fig.F10.*`, `fig.F11.*`, `fig.F12.*`, `fig.F32.*`…). No los duplique
   en `figuras.md`: `copy2i18n.py` fallaría con dos redacciones.

## A andamiaje y plantillas (Método, Datos, Versiones)

8. Método numera sus diez apartados con `apartados('metodo.')`; el antetítulo `01`…`10` no es copy.
9. Pruébelo: `metodo.NN.pruebelo.consulta` (literal para `CopiarConsulta`; si no existe, solo instrucción),
   `.explorador` (con `tEnlaces`: lleva [Abrir el explorador ↗]) y `.codigo` (bloque de código, con `tBloques`).
   `metodo.pruebelo.carga.*` va una vez, en `<details>`. Los enlaces van siempre en claves propias (`.enlace`,
   `.accion`), nunca dentro de un texto en bloques.
10. `fig.F20` reutiliza `datos.columnas.<columna>.definicion`; no hay definiciones propias de F20.
11. `datos.camino.comprobar.*` es una tabla con `{{leg.<leg>.sesiones}}`, `.filas`, `.palabras` y sustitución `<leg>`.
12. `<code>` y `<pre>` quedan fuera de `audit-cifras` y de la comprobación de números tecleados, como en ParlaIbero.

## Al investigador (no bloquean el copy; el copy dice el hecho)

13. **D-20**: el motivo del formulario sigue pendiente (`{{D-20}}` en `comun.fija.formulario.motivo`).
14. **D-25**, con lo que he medido hoy:
    - turnos rescatados: la v3 servida tiene 735 (108.291 − 107.556); `AUDITORIA_SEGMENTACION.md` dice 729 y la
      cabecera de `RESEGMENTACION.md`, 731. El copy usa 735.
    - las 147 filas sin diputado no son todas «ministros sin escaño», como dice el README: 123 llevan fórmula de
      ministerio; 11, de secretario; 7, de la Presidencia sin nombre («El Sr. VICEPRESIDENTE:», «El señor PRESIDENTE
      DE LA CAMARA:»…), y 6 son fórmulas dañadas o sin diputado reconocible («El Sr. SAN ANDENTE:», «El Sr. VIANCE:»,
      «El Sr. DIPUTADO:»…). Recuento con el analizador de fórmulas del explorador.
    - `party_family` falta en 4 filas con diputado (Ruperto González Negrín), además de las 147.
    - `district` = «Agrarios» en 8 filas (José Martínez de Velasco): errata.
    - `ideology` = «C » con espacio en 93 filas del PRR.
    - `rep_id` 836 (Amós Ruiz Lecina / Mariano Ruiz Funes García), Martínez Barrio AR en 1931-1933, «Liberal» →
      «Liberales» (15.364 filas) y la Lliga (CD en el CSV, D en el README): el copy los declara pendientes.
15. **README depositado**: no dice «LLaVA» (eso está en el .docx no depositado); dice «Jaro-Winkler ≥ 0.82» (el código
    usa `difflib`, corte 0,82), «structured prompt» (GLM-OCR corre sin instrucción), la tabla de cobertura de la V1 y
    «exile (Valencia, Barcelona, Mexico City)». El copy lo dice con la frase ↺ 11.
16. **«649 primeros apellidos compartidos»** (del .docx) no se reproduce: los 773 diputados que intervienen tienen 538
    primeros apellidos distintos, y 317 comparten el suyo con otro. El copy usa 317.
17. **D-18**: el explorador pone «Harvard Dataverse, V2» en lo que exporta, con ids de la v3. Versiones lo dice y
    aconseja corregir la cita; no promete un cambio.
