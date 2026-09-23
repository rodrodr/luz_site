# Peticiones del grupo 2 · fichas de etapa, F05 y F09 (fase 2)

> 23-09-2026. Lo que este grupo necesita de otros dueños, o les avisa. No he tocado nada ajeno: solo lo anoto.
> Míos: `src/pages/[lang]/cortes/[etapa].astro`, `src/components/FigOradores.astro`, `src/components/FigFamilias.astro`,
> `src/viz/geom/oradores.ts`, `src/viz/geom/familias.ts`, `src/lib/margen.ts`, `exportador/modulos/fichas.py` (lo llama
> `cortes.py`), `docs/copy_es/cortes_fichas.md` (+ `cortes_1931…mexico.md`) y `docs/marcadores/cortes_fichas.md`
> (+ `cortes_1931…mexico.md`).

## 1. Al grupo 1 (Las Cortes, `cortes.md`, `cortes.py`, `FigCalendario`)

1. **Gracias por el enganche de `fichas.py` en `cortes.py`.** Funciona: 1.487 marcadores comprobados, 0 sin cifra.
2. **`fig.F05.titulo` repite el H2 de la sección** («Quién tomó la palabra» dos veces seguidas en las cinco fichas).
   Propuesta: un título-respuesta, a lo OWID, p. ej. «Los diez diputados que más hablaron». Mientras tanto, el índice
   lateral usa `cortes.ficha.palabra.indice.f05|f09` (en `cortes_fichas.md`) para no repetirlo.
3. **«No es una medida de importancia»** (plan § «Orden fijo…» y narrativa): va en la leyenda de F05, a la vista antes
   de las barras (`fig.F05.leyenda`, en `cortes_fichas.md`). `fig.F05.salvedad` sigue siendo la de `cortes.md`.
4. **`fig.F05.datos`** dice `{{diputados.V2}}` (773, V2 con Presidencia), pero la descarga de F05 trae los **772**
   `rep_id` de habla sin Presidencia (v3). Ya existe la cifra `oradores.diputados` (772, v3): conviene usarla si esa
   frase se pinta (hoy la pestaña Datos la pone `FiguraMarco` y no la usa).
5. **F01e en el móvil** (etapa V, 375 px): la fila de 1945 sale casi vacía y las bandas de presidente y Gobierno quedan
   muy estrechas (captura `docs/revision_fase2/capturas/g2_ficha-mexico_375_oscuro.png`). En las fichas, la figura ya
   trae su [Ver el calendario completo]: la plantilla solo lo pinta si `FigCalendario` no existe.
6. **Auditoría**: `es/index.html` pinta cifras v3 sin NotaBases (✗ de `audit-cifras.mjs`).

## 2. Al andamiaje / integración (`FiguraMarco`, `figuras.ts`, `base.css`)

1. **El código de figura** («F05», «F09», «F01e») sale en la auditoría como «número sin procedencia» en todas las
   páginas con figura: `.fig-id` de `FiguraMarco` debería llevar `data-audit-exento="código de figura"`.
2. **Margen vivo, contrato con la plantilla C**: la ficha usa las clases `.nota-m` de `base.css` y dos propias
   (`.nota-fila`, `.arranque`), con estilos en la página. Si se quiere para las puertas (plantilla E), `lib/margen.ts`
   (`conMargen`, `partes`) sirve tal cual.
3. En la captura con Playwright, la nota emergente abierta con el puntero enseñó su botón de cerrar (que debería salir
   solo al tocar). Puede ser el `(hover: none)` del navegador sin cabeza; conviene comprobarlo en un navegador real.

## 3. A sesiones (grupo 3)

1. (Resuelto a las 00:28) La compilación real falló un rato en `/es/cortes/sesiones/figueres-1939/` por el aserto de
   cita de `sesiones.figueres-1939.diario.cita.martinezbarrio`; a las 00:28 `npm run build` ya pasa (48 páginas).
2. `es/cortes/sesiones/index.html` pinta cifras v3 sin NotaBases (✗ de la auditoría).
3. Las fichas consumen, sin exportarlas, `voto.178-59.*`, `voto.318-19.*`, `voto.314-24.*`, `voto.238-5.*` y
   `etapa.<E>.listas_nominales.filas|sesiones` (son de F26). La de la ficha III «en filas de la Presidencia» pasó a
   clave propia (`cortes.1936.listas.en_presidencia`, 27) para no duplicar la familia `listas_nominales`.

## 4. Cambios de claves en mi copy (para quien lea las tablas)

| antes | ahora | por qué |
|---|---|---|
| `busquedas.fecha` (fichas I y II) | `cortes.fichas.recuento.fecha` | la de explorador y sesiones es de otro dueño; misma fecha (la de la exportación) |
| `cita.diario.alba.reglamento.V2/v3` (ficha II, corrección P2-6) | `fila.II.alba_reglamento.V2/v3` | ancla propia con aserto letra a letra (V2 71331 · v3 80307) |
| `etapa.I.gob.lerroux_i` | `etapa.I.gob.lerroux_1` | la clave que ya exporta `base.py` |
| `etapa.II.fechas.dobles` | `etapa.II.dobles` | ídem |
| `etapa.III.listas_nominales.en_presidencia` | `cortes.1936.listas.en_presidencia` | § 3.3 |
