# Peticiones del copy de «El explorador» (22-09-2026)

Lo que necesita `docs/copy_es/explorador.md` de otros dueños, y lo que queda para el investigador. Nada de esto lo he
tocado yo. Estado: las claves ↺ ya coinciden con `comun.md`; las cifras compartidas, con `src/data/cifras.json`
(`filas.*`, `habla.v3`, `v3.huella`, `explorador.gz.bytes`, `bib.*`); los archivos de las capturas, con sus claves.

## A `comun.md`

1. **Tres rótulos nuevos, un destino cada uno** (hoy van como corchete con destino por orden; si entran en § 3, los
   repito con ↺ y no hace falta pasar destinos):
   - [Ver cómo citar cada edición] → `/{lang}/datos/versiones/#citar` (desde `explorador.llevar.enlace`);
   - [Ver cómo se cuentan las palabras] → `/{lang}/datos/#palabra` (desde `explorador.no_hace.enlace`);
   - [Copiar el nombre del debate] → portapapeles (ficha de F17, `fig.F17.ficha.copiar`).

## A la plantilla `src/pages/[lang]/explorador.astro` (versión de las 19:17)

2. **Claves alineadas con la plantilla**: cabecera `explorador.{antetitulo,titulo,entrada,idioma}` con tres ↺ anclados
   tras la entrada (`comun.fija.local`, `comun.boton.explorador`, `comun.fija.notabases`: no hacen falta
   `explorador.garantia` ni `explorador.abrir`); `explorador.indice.*` para el índice lateral; `explorador.p1`…`p4` con
   `.titulo` (H3) y `.texto`; secciones `encontrar`, `busquedas`, `leer`, `bibliotecas`, `coocurrencias`, `menciones`,
   `llevar`, `empezar` y `limites` (con `tambien: no_hace`). Probado en una copia local del sitio con `astro dev`: las
   dos páginas pintan todo el copy, sin claves pendientes propias, sin desborde a 375 px y en los dos temas.
3. **Captura `sobre` en `llevar`, no en `empezar`.** Ilustra el aviso D-18 (la cita dice V2 y el archivo es la v3).
   En `empezar` no hay texto que la explique.
4. **Dos corchetes sin rótulo único** (salen «pendiente» en la vista previa): [Ver cómo citar cada edición]
   (`explorador.llevar.enlace` → `/{lang}/datos/versiones/#citar`) y [Ver cómo se cuentan las palabras]
   (`explorador.no_hace.enlace` → `/{lang}/datos/#palabra`). O la plantilla pasa `destinos` a esas dos secciones, o
   `comun.md` los añade como rótulos únicos (punto 1).
5. **F29** es una lista: `restoDe(lang, 'fig.F29')` ya la pinta con `htmlConsulta` (cada `.consulta` con su
   `.recuento`) y su `.nota`. ↺ 5 va una vez, anclada tras `explorador.busquedas.entrada`. Título, pregunta y salvedad,
   `FiguraMarco`.
6. **Capturas** (clave `explorador.img.<nombre>`, con `.pie` y `.alt` las doce): `busqueda` y `tendencia` en
   `encontrar`; `lector`, `acotaciones`, `corrida` (con ↺ 8 al pie, anclada tras su pie) y `careo` en `leer`;
   `bibliotecas` (media) y `lexico` en `bibliotecas`; `coocurrencias` (ancha); `menciones`; `exportar` (media) y
   `sobre` (estrecha) en `llevar`.
7. `explorador.llevar.aviso` lleva `data-pendiente="D-18"`.

## A `explorador.py` (exportador de F17 y F29)

8. Marcadores, consultas FTS exactas y asertos en `docs/marcadores/explorador.md` (83 filas entre los dos archivos
   míos; comprobadas hoy con `lee_marcadores()` y `formatos.coincide()` del exportador: 83 de 83).
9. `busquedas.json` / `busquedas.csv`: `[{id, consulta_pantalla, consulta_fts, n, habla}]` con los ocho `id` de
   `fig.F29.<id>`, fecha y `v3_sha256`. **Sintaxis comprobada** (lo que pedía el esqueleto): el buscador acepta
   `"voto femenino" | "voto de la mujer"` y da 40, igual que FTS5 con `OR`.
10. `bibliotecas.json` (F17): quitar de las descripciones las rutas internas («Selección y fichas: docs/…», «Ficha B2 en
   docs/…», `docs/BIBLIOTECAS_PROPUESTA.md`) y toda mención del índice de reacción. Nombres tal cual; claves (`L2-B2`…)
   fuera. Los cinco oradores de cada ficha, con la grafía de `grafias.json`.
11. Cifras nuevas de este módulo: `bib.debates_enteros` (25), `bib.sufragio.n` (770), `busqueda.*` y `busquedas.fecha`.

## Para el investigador (van a `PENDIENTES_DEL_INVESTIGADOR` o al informe)

12. **C4 · «Recordar la base» falla sola.** Hoy, con perfiles nuevos, en Chromium (modo nuevo sin interfaz) y en
    WebKit, y el grupo de capturas con el Chromium completo: «No se pudo recordar la base: La base guardada no coincide
    con la construida y se ha borrado. Vuelva a intentarlo.» En la visita siguiente se vuelve a descargar el corpus.
    **El copy no lo promete.**
13. **D-18.** La cita del explorador dice «Harvard Dataverse, V2» y sirve la v3 (`2REP_Diaries_v3.csv`, «sin publicar»).
14. **La ayuda promete lo que la herramienta no hace**: la cabecera de la sesión con Diario, páginas, Presidencia y
    Gobierno; «Mismo diputado» «por significado», con el pasaje en verde. La página lo dice en `explorador.no_hace.*`.
15. **Hitos de Tendencia**: el 18 dice «Martínez Barrio, presidente» (17-VIII-1945), donde el Diario dice «Presidente
    interino de la República». La página dice que los hitos son del explorador y no están revisados por el sitio.
16. **Rutas internas a la vista**: notas de las bibliotecas (`docs/…`) y «Sobre este corpus» (`tools/RESEGMENTACION.md`,
    `tools/normalization.json`).
17. **Menciones**: externas y focos con nombres mal leídos («Galarz», «A. Azaña», «Castriillo», «Dipu‑tado»). Se enseña
    solo la matriz (D-17).
18. Detalles de interfaz: «≈260 MB» en el botón frente a 269 MiB reales; «Espacio que ocupa: 3 MiB» con la base
    recordada; «Catizq» sin traducir; el buscador de la faceta Diputado dice «Buscar entre 774», cifra que el sitio
    veta como número de diputados.
