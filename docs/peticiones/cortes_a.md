# Peticiones del grupo cortes_a (Las Cortes · fichas I y II)

> 22-09-2026. Lo que este grupo necesita de otros dueños, o les avisa, para que su copy funcione. Nada de esto lo he
> tocado yo: solo lo anoto. Copy: `docs/copy_es/cortes.md`, `cortes_1931.md`, `cortes_1933.md`. Marcadores:
> `docs/marcadores/cortes.md`, `cortes_1931.md`, `cortes_1933.md`, comprobados con `docs/marcadores/cortes_a_comprobar.py`
> (270 cifras, 48 anclas, 0 fallos; y 267 filas de marcadores que pasan `exportador/formatos.coincide`).

## 1. Al grupo cortes_b (fichas III, IV y V)

1. **Plantilla común de la ficha.** Los rótulos de la plantilla C están en `cortes.md` con prefijo `cortes.ficha.*`
   (Hoy puede, Cifras, Lo que pasó en la Cámara, Cuándo se reunió, Quién tomó la palabra, Puertas de esta etapa,
   Debates preparados en el explorador, Antes de usarla, Para leer más, Cómo citar, vecinas, rótulo de fuentes
   externas, «Tiene su puerta de lectura →»). Reutilícenlos sin redefinirlos, o con el mismo texto letra a letra.
2. **Nombres de las etapas.** `cortes.etapa.<I…V>.nombre` (H1 de cada ficha y rótulo de cada bloque de F01),
   `.corto` y `.linea` están en `cortes.md` porque el índice los lista. Las líneas III–V son un borrador mío: si
   prefieren otra redacción, díganlo aquí y la cambio.
3. **Textos genéricos de F01e, F16, F05 y F09** (títulos, notas emergentes, cabeceras de tabla, salvedades) están en
   `cortes.md` (`fig.F01e.*`, `fig.F16.*`, `fig.F05.*`, `fig.F09.*`). Sus fichas solo necesitan su frase propia.
4. **Claves de etapa alineadas con `base.md`.** `base.md` usa `etapa.<E>.meses.con_sesion`, `etapa.<E>.fecha.desde`,
   `etapa.<E>.num.desde`. En `cortes_1936.md` y `cortes_guerra.md` aparecen `etapa.III.meses_con_sesion` y
   `etapa.IV.meses_con_sesion`: convendría usar la forma de `base.md`.
5. **Listas de votación nominal.** Propongo una sola definición para todo el sitio (ver § 3): filas de la V2 cuyo texto,
   sin tildes ni mayúsculas, contiene «señores que dijeron» o «han dicho» seguido de «sí» o «no». Con ella, la etapa III
   da **81 filas en 32 sesiones**; su copy dice 80 filas. Si su expresión es otra, acordemos una.

## 2. Al exportador (`base.py` y `cortes.py`)

1. **Cifras que pide este copy y no están en `base.md`** (valores y fórmula en mis tablas de marcadores):
   `etapa.<E>.serie` (texto, proyecto), `etapa.<E>.filas_v3`, `etapa.<E>.num.desde/.hasta` de las cinco etapas,
   `etapa.<E>.meses`, `.meses.con_sesion`, `.meses.sin_sesion` de todas, `etapa.<E>.fechas`, `etapa.II.fechas.dobles`,
   `etapa.<E>.vice_ses`, `etapa.<E>.pres.*`, `etapa.I.gob.lerroux_i`, `etapa.II.gobiernos`, `legislaturas.V2`,
   `etapas.n`, `meses.salto.desde/.hasta`, `etapa.<E>.listas_nominales.filas/.sesiones`.
2. **Propias de `cortes.py`**: F05 (`oradores.etapa.<E>.1.pal`, `.den`), F09 (`familias.etapa.<E>.*.pct`), el reparto
   por ideología (`ideologia.etapa.<E>.d_ed.pct`), las anclas `fila.I.*` y `fila.II.*` (con el aserto letra a letra del
   fragmento en la fila V2 y en la v3), las votaciones leídas en el texto (`voto.178-59`, `voto.318-19`, `voto.314-24`,
   `voto.187-91`, `voto.265-45`, `voto.constitucion.*`, `eleccion.*`), las búsquedas (`busqueda.*`, v3, fechadas) y las
   bibliotecas (`biblioteca.*`). Si `sesiones.py` ya exporta alguna `voto.*` con la misma clave, que valga la suya:
   los valores coinciden.
3. **Referencia ejecutable.** `docs/marcadores/cortes_a_comprobar.py` calcula todo lo anterior sobre las fuentes (con
   sus huellas) en unos 5 s. Puede portarse tal cual a `exportador/modulos/cortes.py`.
4. **`pres.vice_ses` = 586** (no 584): lo confirman `base.md` y Método. La salvedad de F16 ya usa el marcador.
5. **`cifras.ts` escribe en letra solo hasta veinte** y `formatos.py` hasta treinta. Este copy no pide más de nueve en
   letra, pero conviene igualarlos.

## 3. A Sesiones, Inicio y F26: una sola cifra de votaciones nominales

El plan decía «seis votaciones nominales en cinco sesiones». Es una selección: el Diario imprime muchas más listas.
Hoy circulan tres recuentos distintos:

| grupo | cifra | expresión |
|---|---|---|
| Sesiones (`sesiones.md`) | 405 sesiones | «dijeron sí» o «dijeron no» |
| Inicio (`marcadores/inicio.md`, nota de `voto.n`) | 962 listas «Señores que dijeron sí» en 387 sesiones | solo «sí» (¿con tilde?) |
| cortes_a (esta ficha) | 1.023 filas en 405 sesiones; 994 listas «sí» en 394 sesiones | sin tildes ni mayúsculas |

Propongo la definición de Sesiones, que coincide con la mía: **1.023 filas en 405 sesiones** (V2), por etapa 532/206 (I),
408/165 (II), 81/32 (III), 2/2 (IV), 0/0 (V). Es un mínimo: el reconocimiento óptico rompe algunas cabeceras. Las
listas no siempre van en filas de la Presidencia: en la V2, más de la mitad de las filas con lista son de otro orador
(la lista queda pegada al turno anterior). La salvedad de F26 debe decirlo así si habla de todas, no solo de las seis.

## 4. A `comun.md`

Reutilizo, con su texto exacto: `comun.fija.diario`, `comun.fija.ids`, `comun.fija.enlace`, `comun.fija.notabases`,
`comun.fija.sesion48`, `comun.fija.legislatura`, `comun.fija.tono`, `comun.sello.proyecto` y `comun.boton.ver_sesiones`.
No defino ninguna frase fija nueva.

## 5. Al investigador (pendientes D-22 y D-25, sin tocar los datos)

1. **D-22 · Giménez Fernández.** El Diario imprime «JIMÉNEZ FERNÁNDEZ» en la fila del grito «Luz y taquigrafos.»
   (V2 71330) y «VICEPRESIDENTE (Giménez Fernández)» en las etiquetas de cargo. El copy usa «Manuel Giménez Fernández».
2. **D-25 · Una vinculación dudosa.** «El Sr. VENTOSA» del 9-X-1934 (V2 74696 · v3 84136) va a Juan Ventosa Roig (ERC);
   por contexto parece Juan Ventosa Calvell (Lliga). Detalle en `grafias_cortes_a.md`. No se nombra en el copy.
3. **D-25 · Martínez Barrio, AR en 1931-1933.** La ficha I lo declara pendiente en «Antes de usarla»; si se corrige, la
   frase se quita.

## 6. Lo que dejé fuera, y por qué

- **Reuniones de la Diputación Permanente en 1936 y en París (1939)**: sin referencia [A] o [I] comprobable hoy; se
  recortan (D-12). Queda la carátula de México (v3 121466) y la Constitución (Gaceta, arts. 42 y 62).
- **«Por primera vez» para «¡Tiros a la barriga!»** (narrativa §8.2): no se puede afirmar sin revisar el corpus entero en
  las dos ediciones; se cuenta el grito del 31-V-1934 sin ese adverbio.
- **La puerta del 20-III-1935** es de la edición 0.2: la ficha II no la pinta.
- **Cifras de Afinidades**: ninguna en estas páginas (D-3); solo la frase ↺ 10 y la recodificación del rótulo.
