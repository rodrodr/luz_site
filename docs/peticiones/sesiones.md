# Peticiones del copy de «Sesiones y votaciones», las ocho puertas y «El Diario» (22-09-2026)

Lo que necesitan `docs/copy_es/sesiones.md`, `sesiones_<puerta>.md` y `diario.md` de otros dueños, y lo que queda para
el investigador. No he tocado nada fuera de esos archivos, de `docs/marcadores/{sesiones,diario,citas}.md`,
`docs/marcadores/comprobar_sesiones_diario.py` y de esta carpeta.

**Estado.** `python3 scripts/copy2i18n.py es` pasa; `npm run build` pasa; las diez páginas abren a 1.440 y 375 px, en
los dos temas, sin desbordes ni errores de consola, y sin copy «sin sitio en la plantilla». Lo único pendiente en la
vista previa son las cifras que aún no exporta `sesiones.py`/`diario.py` (se ven como ⟦clave⟧) y los huecos de figura.
`python3 docs/marcadores/comprobar_sesiones_diario.py` recalcula todo sobre la fuente en unos 15 s: 334 marcadores,
104 citas (115 fragmentos) y 416 filas de las tablas de marcadores, sin diferencias.

## 1. Al exportador (`exportador/modulos/sesiones.py` y `diario.py`)

1. **Cifras.** Todas las claves de `docs/marcadores/sesiones.md` y `diario.md`, con su valor esperado, base y fórmula.
   El guion de comprobación hace exactamente cada cálculo (FTS5 como el explorador, `parse_speaker` para la
   Presidencia, bibliotecas desde los `.2replib`); puede copiarse la lógica. Familias nuevas: `voto.<sí>-<no>.*`
   (también `.total`, `.mitad`, `.mitad.V2|v3`, `.lista.V2|v3`, `.proposicion.*`, `.reglamento.*`), `puerta.*`,
   `ses.*`, `busqueda.ses.*`, `bib.<clave>.{nombre,entradas,sesiones}`, `fuente.*`, `f27.*`, `f28.*` y
   `cita.<clave>.{V2,v3,palabras}` (una terna por cita de `citas.md`).
2. **`citas.json`.** Mi registro (`docs/marcadores/citas.md`, bloque JSON al final) da cada cita como **lista de
   fragmentos**, porque el copy corta con «…» e inserta «[sic]». Propuesta para `valida_citas`: una entrada por
   fragmento, `id = "<clave>#<n>"`, `texto = fragmento`. Tres cosas que el aserto debe admitir:
   - `v2` o `v3` a `null` cuando la otra edición no trae la fila (sumarios y notas de volumen, solo v3; un rótulo
     cortado, solo V2): se comprueba en la que hay;
   - saltos de línea dentro del fragmento (dos casos);
   - las comillas: el fragmento lleva las del texto (rectas o “ ”); el copy escribe “ ” donde el texto trae rectas.
3. **F26 (`votaciones.json`).** Siete filas: las seis nominales y la ordinaria (`nominal: false`, otro trazo). Campos:
   clave (`161-121`…), fecha, num_session, legislatura, si, no, total y mitad (solo donde el Diario los imprime:
   `368-466` → 466/234, `318-19` → 462/232, `238-5` → 417/209; **tres** líneas, no dos como decía el plan), V2, v3 y
   `literal` = los fragmentos de `cita.voto.<clave>` unidos por « … ». El rótulo de cada barra es `fig.F26.v.<clave>`.
4. **F27.** Las diez filas de `f27.*` / `cita.f27.1`–`10`, con fecha, orador (grafía) y fragmento.
5. **F28 (cambio sobre el plan).** Trece marcas y no diez: **ocho órdenes** (la fórmula se busca como «no
   constará(n)» seguida de «diario» en la misma frase, ≤ 60 caracteres; así entra V2 102486, «no constarán esas
   palabras en el Diario») y **cinco acotaciones** (tres «no se consigna(n) por orden», dos «no constan por orden»:
   V2 103250 y 105310). La petición de Calvo Sotelo va en contorno; la fila ajena (V2 64659), solo en la tabla. Ids en
   `citas.md › f28.*`. En la v3 la misma búsqueda es `NEAR("no constaran" "diario", 10) OR NEAR("no constara"
   "diario", 10)` (diez filas).
6. **F30.** `public/datos/sesion_<fecha>.csv` para las doce sesiones de las puertas. Marcas propias: la cola truncada
   de la sesión 48 (V2 5788–5792) y la fila V2 25979 (27-V-1932), que lleva la nota `fig.F30.nota.estatuto`.
7. **`puerta.mexico-1945.filas_v3` / `.habla_v3`**: filas v3 con `date >= 1945-08-17` (206 / 184); es lo que da el
   filtro «Desde 17/08/1945» sin Hasta.

## 2. A las plantillas y al andamiaje

1. **Claves de las puertas.** Siguen las secciones de `[puerta].astro`: `sesiones.<slug>.<que_paso|diario|turnos|
   votacion|explorador|no_esta|fuentes|citar>.*`; `.titulo`, `.antetitulo` y `.entrada` (la pregunta) en la cabecera.
   `sesiones.estatuto-1932.turnos.titulo` sustituye al título común de esa sección («Dos ediciones, dos oradores»).
   La consulta de cada puerta es `…explorador.consulta` con sus hermanos `.filtros` y `.recuento`; el modelo de cita,
   `…citar.cita` (se pinta copiable), con ↺ `comun.fija.ids` y ↺ `comun.fija.diario` detrás.
2. **Las citas del Diario** son las claves `….cita.<nombre>` (texto entre «») con su `.pie`. Hoy el pintor genérico
   las pone como párrafos. El plan pide cursiva y el doble id: si el componente `Pasaje` (hueco «pasajes») las pinta
   él, que excluya el segmento `cita` del resto de la sección para no duplicarlas. Los pies van al margen, bien.
3. **El Diario.** Claves bajo las secciones de `diario.astro` (`que_es`, `series`, `luz`, `calla`, `habla`, `citar`);
   `diario.citar.cita` es el modelo copiable. El ancla `#citar` la usa `sesiones.otra.citar`.
4. **`RegistroPuertas`.** `sesiones.lista.<slug>.titulo` va sin corchetes (toda la fila es el enlace). La línea de
   México lleva el número de sesiones para que `.filas` quepa a 375 px.
5. **`check-i18n` y `audit-cifras`.** Tres excepciones que este copy necesita:
   - los dígitos dentro de las claves con `.cita.` (y dentro de `<q>`/`<blockquote>` que las pinten): son texto del
     Diario, comprobado letra a letra por `citas.md` («Total, 161.», «las 22 horas 39»…);
   - las fechas en el formato de los filtros del explorador («01/10/1931», «Desde 17/08/1945»), que son lo que el
     lector teclea;
   - «edición 0.2» y el nombre de biblioteca «Cuestión religiosa (art. 26)».
6. **Figuras.** Los textos de F26, F30, F27 y F28 (`fig.F26.*`, `fig.F30.*` en `sesiones.md`; `fig.F27.*`,
   `fig.F28.*` en `diario.md`) son de este grupo: que `figuras.md` no los repita (si lo hace con otra redacción,
   `copy2i18n.py` falla). Las etiquetas de las cifras al margen de F30 son `sesiones.puerta.cifras.*`.

## 3. A otros dueños de copy

1. **Inicio** (`inicio.md`). F26 es una selección: vuestra salvedad ya lo dice. Si Inicio da el número de sesiones
   con listas, usad `voto.listas.sesiones` (405, «señores que dijeron / han dicho sí / no», V2): es la definición que
   han adoptado las fichas (`etapa.<n>.listas_nominales.*`). Vuestro control cuenta 962 encabezados «sí» con dos
   puntos en 387 sesiones: otra definición, sin marcador en el copy, así que no choca.
2. **Fichas (cortes_a, cortes_b).** Si alguna cita el número de órdenes de F28, que use `{{f28.ordenes}}` (ahora 8).
   La puerta de Figueres cuenta que el extracto está fechado en el «Castillo de Figueras» (V2 107337 · v3 121459) y
   que una nota final explica cómo se obtuvo (V2 107341 · v3 121465): la ficha IV puede enlazarla.
3. **Explorador.** Uso vuestros `busqueda.voto_union.n`, `busqueda.catolica.n`, `busqueda.catolica.puesto_azana`,
   `busqueda.casas_viejas.{n,habla,m1933_02,m1933_02_habla}` y `busquedas.fecha`, con los mismos valores (40, 6, 4,
   375, 316, 114, 102). Las mías llevan el prefijo `busqueda.ses.*` para no chocar; marzo de 1933 es
   `busqueda.ses.casas_viejas.m1933_03` (126) y `…_habla` (108).

## 4. A la puerta de bibliografía (referencias [A] o [I], D-12)

Nada de esto está en el copy como afirmación; entra si llega su referencia:
- el número definitivo del artículo del voto femenino en la Constitución (36) y del religioso (26);
- las primeras elecciones con voto de las mujeres (1933);
- la atribución a Ibárruri de «Este hombre ha hablado por última vez» (el copy dice «que a veces se atribuye»: si no
  llega referencia, se queda en «no aparece en ninguna fila»);
- lo que otras fuentes cuentan del 9 de octubre de 1934 (narrativa § 11.4);
- el lugar exacto de la sesión de Figueres dentro del castillo (el extracto solo dice «Castillo de Figueras»);
- el origen de la fórmula «luz y taquígrafos» (el copy lo deja sin afirmar).

## 5. Al investigador

1. **D-22.** «Manuel Giménez Fernández» (`rep_id` 456): el propio Diario lo escribe con G en sus rótulos de cargo
   («VICEPRESIDENTE (Giménez Fernández)», «Ministro de AGRICULTURA (Giménez Fernández)»), aunque el grito de
   8-VI-1934 lo rotula «JIMÉNEZ FERNÁNDEZ». Tabla completa en `grafias_sesiones.md`.
2. **D-11.** He dejado fuera las cuentas de «acotaciones de conflicto» que traía la narrativa (163 el 13-X-1931, 82 el
   4-VII-1934): salen de la clasificación del explorador, que el plan deja para la 0.2.
3. **Correcciones a la narrativa que el copy ya aplica** (todas con su fila):
   - las seis votaciones de F26 son una selección: hay listas nominales en al menos 405 de las 755 sesiones;
   - el 7-IV-1936 también imprime la mitad más uno (209 de 417);
   - «(Campanilla.)» no aparece en la V2;
   - F28: ocho órdenes y cinco acotaciones (no siete y tres);
   - Azaña, 27-V-1932: es la intervención de habla más larga en la v3; en la V2 es la segunda fila más larga;
   - Figueres: el extracto sí nombra el lugar («Castillo de Figueras») y el corpus explica la nota «NO EXISTE DATO
     ALGUNO»; hubo votación nominal (62 a favor, sin lista);
   - México: el 9-XI-1945 no se debate la declaración del Gobierno, sino otros asuntos (entre ellos, el Estatuto de
     Galicia); la declaración se aprueba el 8, en votación ordinaria;
   - «Sí, prometo» es «Si, prometo» en el texto; «Luz y taquígrafos», «recogerán» y «Pobres taquígrafos» van sin
     tilde; la raya de Alba va pegada; «veintidos» sin tilde;
   - la sesión del 4-VII-1934 sí describe la pelea (acotación en la fila de Gil Robles) y se suspende a las once y
     cuarenta de la noche.
4. **D-18.** `diario.citar.explorador` avisa de que la cita que el explorador añade al copiar no dice la edición; si
   usted corrige el explorador, la frase se quita.

---

# Fase 2 · construcción del grupo 3 (Sesiones, las ocho puertas, F26 y F30) · 23-09-2026

Lo hecho está en `exportador/modulos/sesiones.py`, `src/components/FigVotaciones.astro`, `src/components/FigTurnos.astro`,
`src/components/puerta/{Pasaje.astro,aserto.ts}`, `src/viz/geom/{votaciones,turnos}.ts`, `src/viz/imagen-votaciones.ts`,
`src/scripts/fig-turnos.ts`, `src/pages/datos/F26-[lang].{svg,png}.ts` y las dos plantillas
`src/pages/[lang]/cortes/sesiones/{index,[puerta]}.astro`. Lo que sigue lo necesito de otros dueños.

## 6. Al andamiaje (integrador)

1. **F30 no tiene CSV** (plan, anexo V10 y D-23: serían las filas de una sesión, no datos agregados, y ↺ 12 sería falsa).
   `lib/figuras.ts` le da `archivos: ['turnos']` para que `FiguraMarco` pinte las pestañas; la pestaña Datos la pongo yo
   (ranura `datos`: LÉAME abreviado y cómo exportar la sesión desde el explorador). Pido: en `FiguraMarco`,
   `conPestanas = !ligera && (f.archivos.length > 0 || Astro.slots.has('datos'))`, y F30 con `archivos: []`. Hasta
   entonces `datos/leame-F30-<lang>.txt` nombra `turnos.csv|xlsx`, que no existen (no lo enlazo).
2. **`FiguraMarco`: dos props de copy.** `pregunta` (clave que sustituye a `fig.<id>.pregunta`): las puertas de varias
   sesiones (antesala, México) necesitan `fig.F30.pregunta.varias` («…en estas sesiones?»). `titulo` (clave que
   sustituye a `fig.<id>.titulo`): la versión ligera de F26 en Inicio se titula `inicio.f26.titulo`.
3. **Imagen de F26.** `src/pages/datos/F26-[lang].svg.ts` y `.png.ts` son de este grupo (sharp en la compilación, con la
   cita al pie, `comun.fig.imagen.nota`). Si F01 hace las suyas, que no use una ruta genérica `[fig]-[lang]` (chocaría).
4. **Compilaciones simultáneas.** Varios dueños compilan a la vez en `dist/`: una compilación borra la de otro y las
   capturas fallan. Yo compilo en `.cache/g3-dist` (`astro build --outDir`, ignorado por git); propongo que cada dueño
   haga lo mismo hasta la integración.

## 7. Al exportador y a los demás módulos

1. `citas.json` lo escribe **sesiones.py** con TODAS las citas de `docs/marcadores/citas.md` (también las de El Diario,
   F27 y F28): `citas` (un fragmento por entrada, lo que comprueba `valida_citas`) y `pasajes` (cada cita entera, con su
   `tramo`, `ediciones` y `palabras`). diario.py no debe escribirlo. Las cifras `cita.<diario|f27|f28>.*` son de
   diario.py; las de las puertas y las de F26, de sesiones.py.
2. sesiones.py no repite una cifra que ya dio un módulo anterior **con el mismo valor y la misma base** (lee el `C` de
   `exportar.py › main`, como diario.py): hoy, `puerta.mexico-1945.filas|sesiones` (cortes.py). Con otro valor, falla.
   Los módulos que corren después (diario, metodo, datos…) deben hacer lo mismo con `voto.*`, `etapa.*.listas_nominales.*`
   y `cita.*` de las puertas.
3. `etapa.<I…V>.listas_nominales.filas|sesiones` los da sesiones.py (la marcadores/sesiones.md los atribuía a base.py, que
   no tiene dueño en esta fase): 532/206 · 408/165 · 81/32 · 2/2 · 0/0, con la definición común de `voto.listas.sesiones`.
4. Nuevos archivos: `src/data/votaciones.json`, `src/data/puertas.json`, `src/data/citas.json`,
   `public/datos/votaciones.csv|xlsx` y `public/datos/listas_nominales.csv|xlsx` (todas las sesiones con lista nominal:
   fecha, número, filas con lista e ids V2; es la «tabla por sesión en la pestaña Datos» de la narrativa § 9.3).

## 8. A otros dueños de página

1. **Inicio** (grupo 1): `<FigVotaciones lang variante="ligera" rotulos="inicio.f26.v." />` da las seis nominales sin
   pestañas, con los rótulos cortos de `inicio.md`. El título propio espera la prop `titulo` de `FiguraMarco` (§ 6.2).
2. **El Diario** (grupo 4): «Para citar un pasaje» del índice de Sesiones enlaza a `/<lengua>/diario/#citar`: esa
   sección debe conservar `id="citar"`.

## 9. Decisiones de copy tomadas en esta fase (dueño: este grupo)

- F26: los síes, tramo grueso en oro; los noes, tramo fino en tinta (el grosor distingue sin el color); el contorno llega
  al total de la Cámara donde el Diario lo imprime; la ordinaria, discontinua. Leyenda en cinco rótulos cortos
  (`fig.F26.leyenda.*`), asiento con el total de listas (`fig.F26.asiento`, «escogidas y el total al lado», H3), notas
  emergentes en tres líneas (`fig.F26.nota.t` · `.nota` · `.nota.b`). En una puerta, F26 es secundaria: sin pestañas y
  con su tabla plegada (plan, regla 1).
- F30: quien tiene la palabra encima de la línea y la Presidencia debajo, en vez de «otro trazo» (con barras de 1–2 px,
  un trazo no se ve; la posición sí, y no depende del color). La cola de la sesión 48 va bajo un corchete rotulado.
  Leyenda, notas y tabla reescritas en `sesiones.md` § 4; la tabla, con cuatro columnas (plan, anexo V3).
- La puerta de la cuestión religiosa se queda en la sesión del 13-X-1931 (doce sesiones, `ses.puertas.sesiones`), como
  la escribió su copy: el anexo V19 del plan pedía sumar la del 14-X (sesión 56, 24 filas, V2 7022). Si el investigador la
  quiere, basta con añadir `("1931-10-14", 56)` en `sesiones.py › PUERTAS` y ajustar el copy y el marcador (13).
