# Peticiones del exportador

- **De:** exportador (`exportador/`, `src/data/`, `public/datos/`).
- **Fecha:** 22-09-2026.
- **Estado:** `python3 exportador/exportar.py` corre entero (unos 5 s; en frío, unos 9 s). Escribe `src/data/` y
  `public/datos/procedencia.csv|xlsx`. Pasan los 32 controles del plan y los 342 marcadores de otros grupos que ya
  tienen cifra. Quedan 460 marcadores declarados sin cifra: son de los módulos de la fase 2. La lista está en
  `~/.cache/luz_site/exportador/marcadores_pendientes.txt`.

## 1. Para el andamiaje (`src/lib/cifras.ts`, `src/lib/datos.ts`, `Base.astro`)

1. **`src/data/formatos.json › pruebas`** trae 24 casos `{v, t, fmt, es, en}`. `cifras.ts` debe reproducirlos carácter
   a carácter; conviene que un test los recorra. Hoy difieren tres cosas:
   - Por debajo de 1 MB, `peso` va en KB: «14,6 KB». `cifras.ts` pinta «0,0 MB» para el README de CGOCUS (14.919 B).
   - `letra` llega hasta 30 (`formatos.py › LETRA`); `cifras.ts`, hasta 20.
   - Los formatos `fecha` (sinónimo de `fecha_larga`), `anio` y `texto` también se usan.
2. **Tipos.** Se adoptan los de `cifras.ts`: `n · pct · peso · fecha · texto · id · anio`. Los ids de fila, los números
   de sesión, del Diario y de página, y el guestbook van como `id`. No hay campo `agrupa`.
3. **Alias.** Algunas cifras llevan `alias_de: "<clave canónica>"`, con el mismo valor y la misma procedencia. Así
   se aceptan dos nombres que el copy ya usaba, por ejemplo `sesiones.n` y `sesiones.V2` para `sesiones`.
   `audit-cifras.mjs` puede tratarlas como una sola.
4. **Familias.** `sesion.<AAAA-MM-DD>-<n>.<campo>` y `mes.<AAAA-MM>.<campo>` **ya llegan escritas en `cifras.json`**.
   El exportador las busca en `docs/copy_es/` y `docs/marcadores/`. No hace falta resolverlas en `cifras.ts`. Los
   componentes leen `sesiones.json` y `meses.json`; los campos admitidos están en `formatos.json › familias`.
5. **JSON-LD.** `jsonld/thqcmi.json` y `jsonld/cgocus.json` son `{es, en}`: `Base.astro` debe usar `[lang]`. Las
   descripciones salen de cifras verificadas y **no** copian la descripción de Dataverse. Esa descripción dice
   «exile (1939–)», «94,621» y «the first systematic reconstruction»: son cifras y afirmaciones vetadas.
6. **`sello.json`** trae además `v3_csv_sha256`, `afin_unf`, `hemiciclo_sha256`, `motor_sha256`, `instantanea` (fecha
   de la consulta a Dataverse y al explorador), `explorador_md5` y `explorador_etag`. `puertas` es `null` hasta que
   `sesiones.py` escriba `puertas.json`.
7. `tokens.json` no lo escribe el exportador: está en su lista de archivos ajenos y no se toca.

## 2. Para los grupos de copy

1. **Nombres de base.** Las canónicas están en `docs/marcadores/base.md`. Estos otros nombres también valen, como alias:
   - `sesiones.n` y `sesiones.V2` → `sesiones`;
   - `presidencia.vice.sesiones` → `pres.vice_ses`;
   - `hueco.1939_1944.meses` y `meses.sin_sesion_1939_1944` → `meses.salto`;
   - `dv.version`, `dv.versiones` y `dv.cita` → `dv.thqcmi.*`;
   - `legislatura.<leg>.palabras.pct` → `leg.<leg>.palabras.pct`;
   - `etapa.<E>.desde` y `.hasta` → `etapa.<E>.fecha.desde` y `.hasta`;
   - `etapa.<E>.meses_con` y `.meses_sin` → `.meses_con_sesion` y `.meses_sin_sesion`.
2. **Gobiernos y presidentes por etapa.** Las claves son `etapa.<E>.gob.<id>` y `etapa.<E>.pres.<clave>`, con los ids
   de `sessions.json`:
   - Gobiernos: provisional · azana_1 · azana_2 · azana_3 · lerroux_1 · martinez_barrio_1 · lerroux_2 · lerroux_3 ·
     samper · lerroux_4 · lerroux_6 · chapaprieta_1 · chapaprieta_2 · azana_4 · barcia · casares_quiroga ·
     largo_caballero_1 · largo_caballero_2 · negrin_1 · negrin_2 · negrin_exilio · giral_exilio.
   - Presidentes: besteiro · barnes · lara · alba · casanueva · gimenez_fernandez · martinez_barrio · jimenez_de_asua ·
     fernandez_clerigo.

   **`cortes_1931.md` usa `etapa.I.gob.lerroux_i`, que no existe: es `etapa.I.gob.lerroux_1` (2 sesiones).**
3. **Vicepresidentes: 584 o 586.** Con `parse_speaker` del explorador son 586 sesiones (`{{pres.vice_ses}}`), 584 fechas
   (`{{pres.vice_fechas}}`) y 10.025 filas (`{{pres.vice_filas}}`). El «584 (10.009 filas)» del plan cuenta la cadena
   «VICEPRESIDENTE» y pierde 17 filas con erratas en la etiqueta. Ningún «584» tecleado.
4. **`inicio.md:104`** declara `dv.thqcmi.cita` con el valor «la cita entera», que no se puede comprobar. Escriba la
   cita entre «», o un trozo con «…». En la tabla de `comun.md` ya está.
5. **Formato de las tablas de marcadores.** El exportador lee toda tabla cuya cabecera tenga «clave», «valor…» y
   «base»; si tiene «t» o «tipo», saca de ahí el formato («formato `letra`»). En «valor esperado» vale:
   - el texto que verá el lector («158,1 MB», «0,83 %», «seis»);
   - el valor crudo («165785782», «0,0083484»);
   - el porcentaje ×100 («6.95»);
   - las dos formas («107551 → «107.551»»).

   Todo número de la celda tiene que ser una lectura correcta de la cifra, a la precisión con que está escrito. Si
   la fecha es la de la ejecución, escriba «(la de la exportación)» y no se compara. Varias claves en una fila:
   «`a.si` · `.no`» con «161 · 121».

## 3. Para los dueños de los módulos (fase 2)

1. **API.** El `ctx` y lo que ya está calculado aparecen en el docstring de `exportador/comun.py` y en el de cada
   esqueleto de `exportador/modulos/`. Todo agregado común está en `ctx`:
   - las filas con papel, etapa y clave: `ctx.v2()` y `ctx.v3()`;
   - el texto plegado: `ctx.buscar_v2`, `ctx.buscar_v3` y `ctx.fts_v3`;
   - `ctx.oradores`, `ctx.familias`, `ctx.bibliotecas`, `ctx.mapa_v2_v3`, `ctx.v3_de_v2`, `ctx.clima_v2` y
     `ctx.clima_v3`;
   - Afinidades comprobada: `ctx.afin(...)`;
   - lo que deja `base.py`: `ctx.compartido['sesiones'|'etapas'|'meses']`.

   **No lo recalcule por su cuenta.**
2. **Un archivo, un dueño.** El plan metía F12, F18 y F07 en `ediciones.json`. `ediciones.json` es de `datos.py`
   (F18 y F07). F12 va en `despiece.json` (`metodo.py`). Si dos módulos escriben el mismo archivo, la exportación
   falla.
3. **Puertas ya activas** sobre lo que escriban:
   - cifra sin `base`, `f` o `d`;
   - clave repetida entre módulos;
   - cita de `citas.json` que no está letra a letra en su fila V2 y en su fila v3;
   - `rep_id` sin grafía, cuando exista `grafias.csv`;
   - archivo de `aecpa2026/figs/data/`, comparado por contenido;
   - palabras del prototipo.
4. **Para trabajar en un módulo**: `python3 exportador/exportar.py --solo <modulo>`. No vuelca nada y avisa de lo que
   falta de los demás. Para publicar: `--estricto`, donde un marcador sin cifra también falla.

## 4. Para el dueño de las grafías

`exportador/grafias.csv` (UTF-8, separador «,» o «;», con cabecera). Columnas obligatorias: `rep_id` y `grafia`
(también vale `nombre`); las demás se copian tal cual, por ejemplo `rep_name`, `estado` o `fuente`. Cada `rep_id`
debe existir en la V2 y no repetirse. Mientras falte el archivo, `grafias.json` sale vacío y solo hay un aviso.
Desde que exista, todo `rep_id` que llegue a `src/data/` sin grafía hace fallar la exportación.

## 5. Para el investigador (decisiones del plan)

- **Vicepresidentes: 586, no 584.** Es el punto 2.3. La narrativa (§ 12.04) y el plan (F01, F16, § Procedencia) dicen
  584 con el método de `parse_speaker`, que da 586. El sitio usará el marcador.
- **Métricas de uso** (1.820 visitas, 373 descargas): se exportan con su fecha (`dv.thqcmi.visitas`…), pero el plan no
  las publica (§ La escalera, regla 8).
