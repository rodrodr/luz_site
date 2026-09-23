# Peticiones del grupo «capturas» (dueño de `src/assets/explorador/`)

22-09-2026. Las capturas están hechas, con su `LEEME.md`. Esto es lo que necesitan de otros dueños.

## A andamiaje (`Captura.astro`)

1. **Una talla estrecha.** `sobre.png` mide 582 × 1.487 px: es el panel lateral del explorador, de 291 px CSS. Con
   `talla="media"` se estiraría a 720 px de ancho y unos 1.840 de alto. Propuesta: `talla="estrecha"`, con
   `max-width: 22rem`, junto al texto en escritorio.
2. **No agrandar los diálogos.** `bibliotecas.png` (1.040 × 1.440) y `exportar.png` (1.040 × 904) son diálogos a
   densidad 2: su tamaño natural es de 520 px CSS. Mejor `media` que `ancha`.
3. **Variantes oscuras, opcionales.** `oscuro/<nombre>.png` tiene las mismas doce en tema oscuro, sin el rombo ◆. El plan
   pide las claras sobre `--placa` en los dos temas, y así están servidas. Si la integración quiere cambiar de imagen
   con el tema, los nombres coinciden uno a uno.

## A explorador (`copy_es/explorador.md` y la página)

1. **Nombres.** Cada archivo se llama como la clave de su pie: `busqueda`, `tendencia`, `lector`, `acotaciones`,
   `corrida`, `careo`, `bibliotecas`, `lexico`, `coocurrencias`, `menciones`, `exportar` y `sobre` (`.png`). La nota de
   diseño de «Pies y textos alternativos» cita todavía los nombres del estudio; la correspondencia está al final del
   `LEEME.md`.
2. **`acotaciones.png` enseña ahora las tres clases**: aplausos en verde, un gesto en gris y rumores en teja. El pie
   actual sigue siendo cierto, pero no nombra el verde. Propuesta en el `LEEME.md`.
3. **`sobre.png` va recortada antes de «Construido»**, más arriba aún que «En este navegador». No enseña la base
   recordada, ni el error, ni el tiempo de preparación.
4. **«Recordar la base» (C4) sigue sin funcionar.** Hoy falló también con el Chromium completo: «No se pudo recordar la
   base: La base guardada no coincide con la construida y se ha borrado.» En las cinco cargas siguientes, la base no
   estaba recordada. 8.8 no debe prometerlo.
5. **Tamaño de la descarga.** Archivos: 111.733.652 B (106,6 MB en la unidad de Dataverse). Recibido por el navegador,
   con la compresión del transporte: 110.785.413 B. «Unos 107 MB» es la primera.
6. **`tendencia.png`** es la vista Constituyentes con febrero de 1933 fijado, la misma que eligió el copy. La vista
   «Todo» está en `otras/tendencia-todo.png`, pero su leyenda trae «Martínez Barrio, presidente 17 ago 1945» (D-12).

## A base (`exportador/modulos/base.py`, cifras del explorador)

- `explorador.capturas.fecha` = `2026-09-22` (base `explorador`), para `explorador.img.ejemplo`.
- Huellas para la procedencia: `build_id` `1857031ae8c04b3d`; base servida sha256 `3a0d8b2dea42e883…`; CSV de origen
  `e1906abc601795860a2da5835571dc0f10b58e3679aa6867a27d68af843eb5f9`.

## A cortes (fichas IV y V, «Hoy puede»)

- **Comprobado en el explorador (E4):** sin texto, faceta Legislatura 1936-1939 más Desde 18/07/1936 da **591
  intervenciones**, en orden cronológico, desde el sumario de la sesión 61 (1-X-1936). En la base: 14 sesiones, de la 61
  a la 74, del 1-X-1936 al 9-XI-1945. Captura: `otras/navegacion-guerra.png`.
- También funciona guardar esa lista en una biblioteca propia, con nota y etiquetas, y exportarla como `.2replib`
  (solo se abrió el diálogo). Capturas: `otras/biblioteca-propia.png` y `otras/exportar-biblioteca.png`.

## A sesiones y diario (puerta `figueres-1939`, El Diario)

- El sumario de la sesión 61 (v3 121110) abre con la nota de cubierta del volumen: «EN ESTE VOLUMEN FIGURAN LOS
  EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO. DE LA ULTILLA [sic]
  SESION QUE TUVO LUGAR EN LA CIUDAD DE FIGUERAS […] NO EXISTE DATO ALGUNO.» Sigue un añadido mal leído por el OCR
  («Rohan localizada y Febrero 1939»). La sesión del 1-II-1939 sí está en el corpus (v3 121446, «EXTRATO OFICIAL»).
  Conviene leerlo antes de escribir la puerta de Figueres: explica que las sesiones de la guerra son extractos.
  No lo he verificado contra el impreso.
