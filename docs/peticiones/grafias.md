# Peticiones del grupo de grafías (D-22)

Dueño: grupo de grafías. 22-09-2026. La tabla está en `exportador/grafias.csv` (773 filas, una por `rep_id` de la V2)
y su explicación en `docs/02c_GRAFIAS.md`. Se regenera con `python3 docs/grafias/construir_grafias.py --escribir`.

## A quien pinta nombres en figuras (cortes.py: F05 y F16 · datos.py: F07 · sesiones.py: F30 y F26)

1. **rep_id 836 (D-25).** `grafias.json` da a 836 la grafía de Amós Ruiz Lecina. Pero 92 de sus 184 filas V2 llevan
   `rep_name` «Mariano Ruiz Funes Garcia» y son de Ruiz-Funes. Si su figura agrupa por `rep_id`, separe esas filas por
   `rep_name` y rotúlelas con la grafía de 835: «Mariano Ruiz-Funes García», corto «Ruiz-Funes».
2. **Qué columna usar.** `corto` para barras y notas emergentes («Giménez Fernández», «Trifón Gómez»); `uso` para la
   primera mención en el copy («Manuel Azaña»); `grafia` para el nombre completo. Las tres están en `grafias.json`.
3. **Estado.** 11 grafías están «por revisar» (lista en `02c_GRAFIAS.md` § 1). Se pueden usar ya; si el investigador
   las cambia, basta con volver a exportar.

## A quien escribe copy (todos los grupos)

4. **456 queda confirmada: «Manuel Giménez Fernández».** Donde los borradores dicen «Jiménez Fernández [grafía por
   confirmar]», fuera de las citas, va «Giménez Fernández». Dentro de la cita de V2 71330 se conserva «JIMÉNEZ
   FERNÁNDEZ», como la imprime el Diario.
5. **Las citas no se corrigen.** «Martínez Barrios», «Campaláns», «Ibarruri» o «Leroux» dentro de una cita van tal cual.
6. **Dionisio Cano López es el `rep_id` 184**, como ya corrige `grafias_sesiones.md`.
7. **«José Tomás y Piera» (944) lleva «y»**, como piden `grafias_cortes_a.md` y `grafias_sesiones.md`.

## Al dueño de base.py

8. `grafias.csv` trae dos columnas más que las del contrato, `corto` y `uso`, al final. `_grafias()` ya las pasa a
   `grafias.json` sin cambios; no hace falta tocar nada. Comprobado con la misma lectura (`csv.Sniffer` y
   `DictReader`): 773 filas, ningún `rep_id` repetido, todos en la V2, ninguna grafía vacía.
