# construir-lyt-fase1 (wf_6a60df64-e1a) · 11 resultados · 23-09 03:02

## Resultado 1

The 12 explorer captures the plan asks for are done and saved. I remade them all today in a fresh browser profile, so none of them carry the ◆ marks left over from the earlier study. I looked at every final image to check it shows what its entry says.

**What I made** (all in `/Users/rodrodr/Dropbox/Apps/luz_site/src/assets/explorador/`)
- **The 12 main captures**, light theme, 1,600 px wide at most, 4.1 MB in all. Each file is named after its caption key in `docs/copy_es/explorador.md`, so the page can match them one to one: `busqueda`, `tendencia`, `lector`, `acotaciones`, `corrida`, `careo`, `bibliotecas`, `lexico`, `coocurrencias`, `menciones` (per D-17, only the party-to-party table), `exportar` and `sobre`, all `.png`.
- **`oscuro/`**: the same 12 in dark theme. This closes E3.
- **`otras/`**: 7 spare captures, each with a light and a dark version. Three of them record E4 (the 1936–1939 browsing and a library of one's own). Their warnings are in `LEEME.md`.
- **`guion/capturar.py` and `guion/recortar.py`**: the scripts that reproduce all of this.
- **`LEEME.md`**: for each capture it gives the file, what it shows, the state it was taken in (query, filters, id, keys pressed, theme), any crop in pixels, the figures on screen, alt text and a caption. It also records the date, URL, `build_id` and the hash of the database the explorer serves.
- **`/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/capturas.md`**: requests to the other groups.

**Changes from the plan's list**
- **Tendencia:** I used the Constituyentes view with February 1933 pinned. It shows January 1933 hatched, with no sessions, and the 114 interventions in February. The "Todo" view is in `otras/`. Its legend includes a milestone reading "Martínez Barrio, presidente", which the plan flags under D-12.
- **Colour-coded bracketed notes:** the new image shows all three colours at once: applause in green, a gesture in grey and murmurs in terracotta. The caption in the copy doesn't mention the green yet.
- **`sobre.png`:** cropped just above "Construido". It leaves out the setup time (which depends on the computer), the "remembered" state and its error message.
- **Other crops:** the card in `coocurrencias.png` stops before the "Leer primero" line, which shows names with their accents stripped. `corrida.png` doesn't show the "415 intervenciones íntegras" header, because session 48 is truncated.

**What I checked on the v3 database the explorer serves (hash `3a0d8b2d…`)**
- The search gives 40 results (20 + 28 − 8), from 1‑IX‑1931 to 15‑XII‑1933, across 15 dates, with the same ideology split as on screen.
- "Casas viejas" in February 1933: 114 interventions (102 speech plus 12 summary and commentary rows), 492 mentions, 16 sessions. No sessions in January 1933. 1,193 mentions over the whole series.
- The Campoamor intervention is v3 id 6079. The screen says "orden 30" but the database says `ord` 29, because the tool counts from 1.
- The five reply suggestions in the side-by-side view are Kent, Guerra del Río, Castrovido, the session summary and the Diario's comments.
- The project's libraries: 31 of them, 24,029 interventions. The women's-suffrage library holds 770: the two sessions' 837 rows minus 2 summary and 65 commentary rows.
- The 1936–1939 browsing: 591 interventions across sessions 61 to 74.

The word counts (598,946 in February 1933; 25,903,736 in the whole corpus) and the figures in Léxico, Coocurrencias and Menciones are the tool's own, and I couldn't recalculate them. I label them "de la pantalla" in `LEEME.md`.

**Still open**
- **"Recordar la base" still doesn't work.** It failed again with the full version of the Chromium browser and gave the same error. In each of the five loads after that, the database had not been remembered. Section 8.8 shouldn't promise it. You'd need to try it in a normal browser window to be sure.
- **Download size:** the three files add up to 111,733,652 bytes, and the browser received 110,785,413 with transfer compression. The study's figure was the second one. "Unos 107 MB" matches the first.
- **For the andamiaje group:** `sobre.png` needs a narrow size in `Captura.astro`. At the medium size it would stretch to about 1,840 px tall.
- **For the base group:** the marker `explorador.capturas.fecha` should be 2026‑09‑22.
- **For the Figueres door and El Diario:** the summary of session 61 opens with the volume's cover note. It says there is "no data" on the last session in Figueres. Yet the session of 1‑II‑1939 is in the corpus. I haven't checked this against the printed Diario.
- Nothing was downloaded as a file: I only opened the export dialogs. The test library existed only in the throwaway profile.

## Resultado 2

Informe del exportador de Luz y Taquígrafos, 22-09-2026.

`python3 exportador/exportar.py` corre de principio a fin: tarda unos 6 s con caché y 9 s sin ella. Escribe 458 cifras en `src/data/cifras.json`. Pasan los 32 controles del plan y los 355 marcadores que los demás grupos ya declararon con cifra. Una cifra del plan no se reproduce con el método que el plan cita (punto 1 de pendientes).

**Qué hay en `exportador/`**
- **`exportar.py`**:
  - Comprueba las huellas: MD5 de la V2; sha256 de la v3 y de su CSV; sha256 de `sessions.json` y del hemiciclo; versión, UNF y MD5 de los cinco archivos de datos de CGOCUS V1.1 contra la API de Dataverse; y que el explorador publicado sirve la v3 que tenemos.
  - Ejecuta los ocho módulos, fusiona sus cifras y aplica las puertas. Puertas: cifra sin `base`, `f` o `d`; suma de etapas distinta del total; archivo de `figs/data` distinto del hemiciclo, comparado por contenido; palabras del prototipo; cita que no está letra a letra en su fila; `rep_id` sin grafía; marcadores con otro valor u otra base.
  - Lo prepara todo en `~/.cache/luz_site/exportador/staging/` y solo lo vuelca en `src/data/` y `public/datos/` si todo pasa.
  - Opciones: `--comprobar`, `--solo <módulo>` para trabajar en uno, `--estricto` para publicar y `--red` para refrescar la instantánea.
- **`comun.py`**: los agregados comunes, ya calculados, para que ningún dueño los repita:
  - las filas V2 y v3 con el papel del orador (motor del explorador), la etapa y la clave de sesión;
  - búsquedas sobre texto plegado y sobre el FTS de la v3;
  - `oradores`, `familias`, `bibliotecas`, la correspondencia V2 → v3, las acotaciones y los archivos de Afinidades comprobados.
  - La caché `clima/*.jsonl` se reutiliza porque su huella cuadra: mismos 121.700 ids, ningún error, mismo papel.
- **`formatos.py`**: el espejo en Python de `cifras.ts`, con 24 casos de prueba en `formatos.json`.
- **`controles.py`**: las cifras de control del plan, recalculadas en cada ejecución.
- **`instantanea.py`** e `instantaneas/2026-09-22/`: la consulta fechada a Dataverse y al explorador; el exportador trabaja sin red.
- **`motor/`**: el motor del explorador (`engine.js`, sha256 fijado), más `papel.mjs` y `clima.mjs`.
- **`modulos/base.py`, completo**. Los otros siete módulos son esqueletos que devuelven `{}`; su docstring lista sus figuras, archivos y claves.

**Qué escribe en el sitio**
- En `src/data/`: `cifras.json`, `formatos.json`, `sello.json`, `sesiones.json` (755), `meses.json` (173, con estado), `etapas.json`, `grafias.json` (vacío), `hemiciclo_1936.json` y `jsonld/{thqcmi,cgocus}.json`.
- En `public/datos/`: `procedencia.csv` y `.xlsx`.
- En `docs/`: `marcadores/base.md` (las cifras de control, que el exportador verifica en cada ejecución) y `peticiones/exportador.md`.

**Qué verifiqué sobre la fuente**
Todas cuadran con el plan:
- 107.551 y 121.700 filas; 108.291 de habla.
- 755 sesiones en 752 fechas: 405/276/74 por legislatura y 405/276/60/9/5 por etapa.
- 24.335.896 palabras; 14 sesiones y el 0,83 % tras el 18-VII-1936.
- 173 meses, 64 con sesión: iguales mes a mes a `cobertura_mes_v2.json`.
- 28.780 páginas y 741 sesiones verificadas; Presidencia, 44,85 % de las filas y 10,24 % de las palabras.
- 158,1 MB del CSV y 106,6 MB de la descarga del explorador.
- Seis votaciones nominales en cinco sesiones; «luz y taquígrafos» y «no constará» con sus ids V2 y v3; 63.507 filas del edgelist y 78 diputados en las tres legislaturas.

Además comprobé que cada puerta falla cuando debe, con casos preparados para fallar.

**Pendiente, y por qué**
1. **584 frente a 586.** Con `parse_speaker`, el método que cita el plan, un vicepresidente preside algún tramo en 586 sesiones y 10.025 filas; 584 son las fechas. El «584 (10.009 filas)» del plan contaba la cadena «VICEPRESIDENTE» y pierde las etiquetas con erratas. El copy debe usar `{{pres.vice_ses}}`; el plan y la narrativa lo dicen mal.
2. **465 marcadores sin cifra.** Son de los módulos de la fase 2. Por ahora solo avisan; con `--estricto` fallan. La lista está en `~/.cache/luz_site/exportador/marcadores_pendientes.txt`.
3. **Grafías (D-22).** `exportador/grafias.csv` aún no existe. Desde que exista, un `rep_id` sin grafía hará fallar la exportación.
4. **Peticiones anotadas** en `docs/peticiones/exportador.md`:
   - para el andamiaje: `cifras.ts` debe pintar en KB los pesos de menos de 1 MB y llevar `letra` hasta 30; `Base.astro` debe usar `jsonld[lang]`;
   - para el copy: `cortes_1931.md` usa `etapa.I.gob.lerroux_i`, que no existe (es `lerroux_1`);
   - para los módulos: F12 va en `despiece.json`, porque `ediciones.json` es de `datos.py`.
5. **Decisiones tomadas:**
   - Adopté los nombres de clave que el copy ya usaba, y otros van como alias con `alias_de`.
   - Las descripciones del JSON-LD no copian la de Dataverse, que trae cifras y afirmaciones vetadas.
   - Las visitas y descargas se exportan con su fecha, pero el plan no las publica.
   - `calc_terminos` (Palabras) y el banco azul de `calc_gobierno` no están portados: son de la edición 0.2.

Todo está en `/Users/rodrodr/Dropbox/Apps/luz_site/exportador/`, `/Users/rodrodr/Dropbox/Apps/luz_site/src/data/` y `/Users/rodrodr/Dropbox/Apps/luz_site/public/datos/`, más `docs/marcadores/base.md` y `docs/peticiones/exportador.md`.

## Resultado 3

I've written the copy for Las Cortes (the index) and for fichas I and II, with their markers, the bibliography section and the notes to other owners. Every figure and every quote was recalculated today on the sources. My checking script reports 0 failures, and all 267 expected values also pass the exporter's own formatter. I did not run `npm run i18n` or `npm run build`, and I did not check the pages at 1.440 and 375 px: those pages are built by another owner. `copy2i18n --check` currently fails, but the only error is in another group's file (`sesiones.pistola-1934.que_paso.4` uses an unknown format `|fecha`). My files give no errors.

**Files created** (all under `/Users/rodrodr/Dropbox/Apps/luz_site/docs/`)
- `copy_es/cortes.md`: the index page (669 words, limit 600–800). It also holds the section labels shared by all five fichas (`cortes.ficha.*`), the five stage names, and the texts of F01 complete, F01e, F16, F05 and F09: titles, legends, tooltip templates, table headers and caveats.
- `copy_es/cortes_1931.md`: ficha I, 1.491 words (limit 1.500). The context runs in five chronological sections anchored in 23 rows.
- `copy_es/cortes_1933.md`: ficha II, 1.417 words. Four sections anchored in 25 rows.
- `marcadores/cortes.md`, `cortes_1931.md`, `cortes_1933.md`: 267 marker rows. Key names follow `base.md` where that file already defines them.
- `marcadores/cortes_a_comprobar.py`: recalculates every figure and checks each quote letter by letter in its V2 row and its v3 row, after checking the source fingerprints. It takes about 5 seconds. Result: 270 figures, 48 anchors, 0 failures.
- `02b_BIBLIOGRAFIA.md`: the file did not exist, so I created it with my section only. It has five institutional sources (Gaceta de Madrid issues, read in the full-issue PDFs from the BOE) and seven academic books checked against publisher or library catalogues. No page numbers are cited for books I did not have in hand.
- `peticiones/cortes_a.md` and `peticiones/grafias_cortes_a.md` (37 names with their correct spelling).

**Corrections to the plan and the narrative**
- **Nominal votes:** "seis votaciones nominales en cinco sesiones" does not describe the corpus. At least 1.023 V2 rows in 405 sessions carry a printed list of names. Three different counts are circulating between groups; I proposed one shared definition in `peticiones/cortes_a.md`.
- **Vice-presidents:** they chaired part of the session in 586 sessions, not 584. The old count missed labels damaged by the OCR.
- **Facts the narrative marked as external are in the Diario itself**, so they are anchored in their row instead of a reference: Alcalá-Zamora's election as President of the Republic (V2 13613), Azaña recounting Sanjurjo's arrival in Seville (V2 32910), the suspension of sessions "por la huelga revolucionaria" (V2 74669), and the Strauss inquiry (V2 97387).
- **Two claims dropped:**
  - "¡Tiros a la barriga!" appearing "por primera vez": the v3 has two rows with the phrase.
  - The Diputación Permanente meetings of 1936 and Paris 1939: I found no reference I could verify today.
- **New anchors added**, all verified:
  - the vote that brought down the Constituent Cortes (187–91, V2 61320);
  - Besteiro's election in the first session (363 votes of 371);
  - Alba's election in December 1933 (234 of 248);
  - the ERC and Basque minorities walking out on 12-VI-1934.

**Pending**
- **Ventosa, 9-X-1934:** the database links "El Sr. VENTOSA" (V2 74696) to Ventosa Roig of ERC. From the context it looks like Ventosa Calvell of the Lliga. It is left for Rodrigo (D-25) and not named in the copy.
- **Giménez Fernández (D-22):** the copy uses this spelling; the Diario prints both "Jiménez" and "Giménez". Rodrigo still has to confirm it.
- **Other groups:**
  - the exporter owner has to implement my markers, and can port the checking script directly;
  - the group writing fichas III–V should reuse my shared labels rather than redefine them, and align two stage keys with `base.md`;
  - Inicio and Sesiones need to settle on one count of nominal votes.
- **Ficha I caveat:** Martínez Barrio's party code (AR) is flagged as pending review; the sentence goes if Rodrigo corrects it.

## Resultado 4

He escrito los tres copys: Método, Usar los datos y Versiones. Cada cifra va con marcador y se ha recalculado sobre su fuente, con las huellas comprobadas. Los dos fragmentos, en R y en Python, se han ejecutado de verdad y dan lo mismo. `copy2i18n.py es --check` no da ningún error en mis archivos. Tampoco hay palabras vetadas, frases de más de 30 palabras ni marcadores sin declarar.

**Archivos creados** (todo dentro de `/Users/rodrodr/Dropbox/Apps/luz_site`):
- **Copy:**
  - `docs/copy_es/metodo.md`: 10 apartados, unas 2.780 palabras. También los textos de F19, F20, F10/F11 y F12.
  - `docs/copy_es/datos.md`: 9 apartados, unas 2.200 palabras. También F32, F33 y F34, y los dos fragmentos.
  - `docs/copy_es/versiones.md`: unas 950 palabras. También F25, F18, F07 y F35.
  - Versiones va en su propio archivo, como pedía el encargo; el contrato la metía en `datos.md`. Para la compilación no cambia nada.
- **Marcadores** (148 en total):
  - `docs/marcadores/metodo.md`, `datos.md` y `versiones.md`, con sus tablas.
  - `docs/marcadores/marcadores_metodo_datos.json`, los mismos valores en el formato de `cifras.json`.
- **Scripts de comprobación:**
  - `docs/marcadores/comprobar_metodo_datos.py` calcula cada marcador sobre su fuente. Tarda unos 10 s y deja su registro en `docs/marcadores/comprobaciones_metodo_datos.txt`.
  - `docs/marcadores/ejecutar_fragmentos.py` saca los fragmentos del copy, los ejecuta y escribe `docs/marcadores/fragmentos_salida.txt`. Usé pandas 3.0.3 con los avisos como error y R 4.5.2.
- **Peticiones a otros dueños:** `docs/peticiones/metodo-datos.md`.

**Qué verifiqué:**
- **Lectura óptica:** 28.780 páginas y 153 fallidas en la primera pasada, en 131 sesiones. GLM-OCR recuperó 29 al reintentar y las 124 restantes se leyeron con Tesseract, en 106 sesiones. La reserva LightOnOCR no recuperó ninguna página, así que el copy no la nombra. Ninguna página de Tesseract pasó por corrección posterior.
- **F25:** comparé el CSV de la V1 depositada con el de la V2. Solo cambian `date` (894 filas) y `legislature` (91). La V1.1 no tocó el CSV, solo la licencia.
- **Texto de la v3:** las 120.945 piezas que vienen de la V2 son tramos literales de su fila.
- **Unión con Afinidades:**
  - Probada con el original depositado de CGOCUS V1.1: su MD5 es el que declara Dataverse.
  - Lo pasé al formato `.tab` de Dataverse; la copia mide lo mismo que el depositado, 156.736 bytes.
  - Resultado: casan 1.047 de 1.060 pares, 13 pares no tienen ficha (426 filas) y la unión solo por id da 247.327 filas.
- **Citas:** texto, BibTeX y RIS leídos hoy en la API pública de Dataverse.

**Correcciones al plan y a la narrativa** (el copy usa la cifra verificada):
- **Vicepresidentes:** «584 sesiones» son en realidad 584 fechas; por sesión son 586, con 10.025 filas.
- **Apellidos:** «649 apellidos compartidos» no se reproduce. Los 773 diputados tienen 538 primeros apellidos distintos, y 317 comparten el suyo con otro; el copy usa 317.
- **Filas sin diputado:** no son todas «ministros sin escaño». De las 147, 123 llevan la fórmula de un ministerio; las demás son de secretarios, de la Presidencia sin nombre o fórmulas dañadas.
- **La fila de Prieto:** no son «unas 21.000 palabras de un documento leído». Son 21.638 palabras de tablas y documentos complementarios que el Diario imprime con su discurso, que ocupa 3.733.
- **Turnos rescatados:** en lugar de «unos 730», la v3 que sirve el explorador tiene exactamente 735.
- **El `id`:** la trampa «no es el orden» ya no vale en la V2; el id sigue la fecha sin un solo retroceso.
- **El README:** no nombra LLaVA; eso sale del .docx, que no está depositado.

He cambiado los nombres de mis marcadores para que coincidan con los de `base.md`, `inicio.md` y `comun.md`. Las frases fijas, los sellos y el motivo del formulario salen de las claves de `comun.md`.

**Pendiente, y por qué:**
- **D-20**, el motivo del formulario: va como `{{D-20}}` hasta que lo redacte el investigador, y hasta entonces tumba la compilación de publicación.
- **Exportador:** `metodo.py` y `datos.py` son de otro dueño. Les he pedido que implementen los marcadores y los datos de cada figura, y que ejecuten los fragmentos en cada compilación. El copy promete que la compilación falla si su salida cambia.
- **D-25**, para el investigador: los 735 turnos frente a los 729 y 731 de otros documentos, y varias erratas de datos. Por ejemplo, el `rep_id` 836 lleva dos nombres, el distrito «Agrarios» aparece en 8 filas y 93 filas llevan «C » con espacio.
- **D-18:** la cita del explorador dice «V2» con ids de la v3. Versiones lo cuenta y aconseja corregirla, sin prometer un cambio.
- **Compilación:** no he ejecutado `npm run build` ni Playwright. Las plantillas de estas páginas aún no existen y son de otro dueño.

## Resultado 5

Informe · grupo cortes_b (fichas III, IV y V)

Las tres fichas están escritas y todas sus cifras y citas se comprobaron contra la fuente: 223 marcadores y 85 anclas de fila, 0 discrepancias.

**Archivos creados**
- Copy:
  - `/Users/rodrodr/Dropbox/Apps/luz_site/docs/copy_es/cortes_1936.md` (unas 1.140 palabras)
  - `/Users/rodrodr/Dropbox/Apps/luz_site/docs/copy_es/cortes_guerra.md` (unas 775)
  - `/Users/rodrodr/Dropbox/Apps/luz_site/docs/copy_es/cortes_mexico.md` (unas 740)
  - Todas cumplen su tope de palabras. Reutilizan `cortes.ficha.*` y `fig.*` y siguen las mismas claves que las fichas I y II (`hoy`, `contexto.N`, `calendario`, `palabra`, `sesiones`, `debates`, `antes`, `leer`, `citar`).
- Marcadores:
  - `/Users/rodrodr/Dropbox/Apps/luz_site/docs/marcadores/cortes_1936.md`, `cortes_guerra.md` y `cortes_mexico.md`: cifras con su valor esperado, base y fórmula; guardas de nombres; anclas `fila.*` con el fragmento literal que debe encontrar el aserto de citas.
  - `/Users/rodrodr/Dropbox/Apps/luz_site/docs/marcadores/comprobar_cortes_b.py`: recalcula todo sobre la V2, la v3 y `sessions.json` en unos 3 s.
- Peticiones: `/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/cortes_b.md` y `/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/grafias_cortes_b.md` (31 nombres).
- Bibliografía: sección «Fichas III, IV y V» añadida al final de `/Users/rodrodr/Dropbox/Apps/luz_site/docs/02b_BIBLIOGRAFIA.md`, sin tocar la de cortes_a. Son 8 referencias [A], todas comprobadas en la web.

**Qué verifiqué**
- **Las filas:** leí una a una las 486 filas V2 y las 591 v3 de la guerra y de México, más los 74 sumarios.
- **Las citas:** cada cita y cada id está comprobado letra a letra en su fila V2 y en su fila v3. Cuando una fila solo existe en la v3, el copy lo dice («solo en la v3»).
- **Las consultas de «Hoy puede»:** los recuentos siguen el método del explorador. Lo comprobé reproduciendo cifras publicadas por el propio explorador: 6, 40, 531, 2.028 y 724.
- **El exportador:** `exportar.py --solo cortes` lee mis tablas y dice «todo pasa». Lo ejecuté en una copia del sitio en el scratchpad; escribe su caché en `~/.cache/luz_site`.
- **La compilación:** hice una compilación de prueba en esa copia, con mis cifras inyectadas solo allí. Las tres páginas salen a 1.440 y a 375 px, en los dos temas, sin errores de consola. La única excepción es un desborde en México a 375 px, que causan dos marcadores de sesiones sin resolver; con valores de prueba desaparece.

**Correcciones a la narrativa, medidas hoy**
- **Hechos que se daban por externos están en el propio corpus:**
  - la fecha de las elecciones de 1936 (el decreto de convocatoria);
  - los artículos 81 y 74 de la Constitución;
  - los lugares de las sesiones de la guerra: Madrid, Valencia y la Lonja, Sant Cugat, Sabadell y Figueres (el Castillo, en la propia sesión); Montserrat aparece, pero sin fecha;
  - el sótano del castillo de Figueres (lo cuenta Pascual Leone en 1945);
  - la dimisión de Azaña y las reuniones de la Diputación Permanente en París.
- **Dos pendientes cerrados con el propio corpus:**
  - el «viva» negado se explica: está en el acta de la junta preparatoria y quien preside es Carranza;
  - la nota «no existe dato alguno» sobre Figueres queda desmentida por otra nota del mismo volumen (se obtuvo después una fotocopia del extracto).
- **Las listas de votación nominal** en la V2 van pegadas a la fila de quien habló antes: solo 27 de 81 son de la Presidencia. «Seis votaciones nominales en cinco sesiones» no describe el corpus.
- **Los discursos de Negrín:** solo dos de los tres van a nombre de la Presidencia en la V2. F09 de la guerra lleva esa salvedad (la Presidencia se queda con el 26,1 % de las palabras).

**Pendiente, y por qué**
- **Exportador:** las cifras y anclas propias de este grupo aún no se calculan en el sitio. Las tiene que implementar el dueño de `cortes.py`; mis tablas y el script sirven de referencia.
- **Otros grupos:** en `peticiones/cortes_b.md`:
  - cortes_a usa `etapa.<E>.meses.con_sesion`, que sale sin resolver en la compilación; la forma canónica es `meses_con_sesion`;
  - la definición común de «lista nominal» no ve la votación de Figueres;
  - en la plantilla de ficha, el título de «Debates preparados» sale dos veces y las puertas se repiten en las fichas I y II.
- **Investigador:**
  - revisar las grafías (D-22);
  - las notas de `sessions.json` citan Wikipedia para Giral y Negrín en 1945, así que el copy no afirma esas fechas;
  - comprobar en el PDF quién presidió la sesión del 8-IV-1936.
- **Error ajeno:** `copy2i18n` falla hoy por un formato `|fecha` en `sesiones_pistola-1934.md`, de otro grupo. No lo toqué en el repositorio; solo lo parcheé en la copia de prueba.

## Resultado 6

The copy for `comun`, Inicio, the root page and the 404 is written, and the pages build and render with all of it. `npm run build` produced 46 pages. At 1,440 and 375 px, in both themes, the Inicio page (ES and EN), the root and the 404 show no console errors, no horizontal scroll and no missing `comun.*` or `inicio.*` keys.

**Files I created (all under `/Users/rodrodr/Dropbox/Apps/luz_site/docs/`)**
- `copy_es/comun.md`:
  - header: brand, descriptor, six tabs in two groups, ES · EN, theme button, skip link;
  - subnavigation and footer (no mention of funding);
  - the 13 fixed phrases ↺ exactly as in the plan, plus 3 shared ones (the calendar tone legend, and two for the explorer: what it serves and that it keeps searches on your machine);
  - one label per destination, with a table of destinations;
  - shared components: NotaBases, CopiarConsulta, Sello, citations, screenshots, side index and neighbour links;
  - figure tabs and figure-data labels, and the keyboard and touch texts for the figures;
  - the names of the five stages, the hemicycle texts, the interface glossary, the root and the 404.
- `copy_es/inicio.md`: beats 0–7, using the keys the Inicio template already reads, plus Inicio's own labels for F01c and F26.
  - **682 words of copy (limit 700), 114 words of limits (limit 120), no sentence over 30 words.**
  - The meta description is 135 characters.
  - The file lists each change from the narrative and why.
- `marcadores/comun.md` and `marcadores/inicio.md`: key · expected value · base · how it is calculated. Key names are the ones `base.py` already exports.
- `marcadores/comprobar_comun_inicio.py`: recalculates every figure from the sources after checking their hashes (V2 MD5, v3 and project sha256, Dataverse API, explorer manifest). **93 of 93 correct.**
- `marcadores/contar_inicio.py`: the word-count and limits tests for Inicio.
- `peticiones/comun-inicio.md`: requests to the other owners.

**What I checked, and what I changed from the plan and narrative because of it**
- **V2 71330 reads «Luz y taquigrafos.», with no accent**, and so does v3 80306. The banner quotes it that way, without [sic], because quotes keep OCR errors when the meaning is unchanged. You may want to see how it looks next to the brand name.
- **The six roll-call votes are a selection, not the total.** The V2 text has at least 962 «Señores que dijeron sí» lists in 387 sessions, so Inicio says «cientos» and «aquí van seis».
- **Two corrections for F26 (Sesiones group):**
  - the Constitution's name list is in V2 13525, not 13531;
  - the 7-IV-1936 vote also prints a majority line («209 de 417», V2 102359), which the plan missed.
- **The destitution label comes from the corpus.** V2 102368 says the President of the Cortes «pasa a ser Presidente de la República», so Inicio uses the same label as Sesiones.
- **Wording I changed:**
  - «Todo lo que se dijo quedó impreso» became «se imprimía», because the site itself shows what the Presidency had struck from the Diario.
  - The «Posición» box no longer says ideology is the party's: CEDA rows carry three ideology codes (D, CD, C).
  - «En cada serie del Diario» became «en cada legislatura», because session numbering restarts by legislature.
- The session of 1-X-1931 is described as truncated at the end of the digitised record (V2 5788–5792, flagged `truncated_end` in the project metadata).

**Still pending, and why**
- **D-20** (the reason text for the download form): only you can write it. It shows as ⟦D-20⟧ in the preview and will stop the publication build until it exists.
- **Figures not yet exported:**
  - `fila.luz.*`, `fila.presidencia.*` and `fila.campoamor.*`;
  - `voto.n`, `voto.161-121.si` and `voto.161-121.no`;
  - `puerta.mexico-1945.filas` and `puerta.mexico-1945.sesiones`.
  They show as pending in the preview; expected values are in the marker file.
- **English:** the root and the 404 are bilingual but no English copy exists yet, so the English half falls back to Spanish.
- **Template and component work** (in the requests file):
  - set the two quotes in «¿Qué es una fila?» typographically, and draw the four «¿Qué no trae la base?» items as empty dashed boxes;
  - drop the trailing full stop from the ladder step titles;
  - give «Unir con THQCMI» its destination;
  - keep the BibTeX/RIS blocks from overflowing at 375 px;
  - the 404 does not show the «Avisar de una errata» line yet;
  - the hemicycle showed only three coloured seats in today's capture.
- **Two small conflicts in other groups' copy:**
  - Versiones and Afinidades repeat the seal phrase under `comun.fija.sello.*`, while the code reads `comun.sello.*`;
  - the Explorador copy uses a second key for the 107 MB download size.

To regenerate `src/i18n/es.json` for my check I once had to tolerate an unknown `|fecha` format in `sesiones_pistola-1934.md`. Its owner has since fixed it, and `copy2i18n.py es --check` now passes for all 23 files.

## Resultado 7

Terminé el copy de «El explorador» y de «Afinidades Elegidas», con sus marcadores. `copy2i18n.py es --check` pasa sin avisos en mis dos archivos. Todas las cifras están recalculadas hoy sobre la fuente. Encontré dos afirmaciones de la narrativa §16 que son falsas y las he corregido en el copy.

## Archivos creados

- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/copy_es/explorador.md`: las 9 secciones, `fig.F29.*` (una lista de consultas copiables) y `fig.F17.*`. Las 12 capturas llevan pie y texto alternativo. Las claves siguen los prefijos de la plantilla actual.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/copy_es/afinidades.md`: la cabecera con el sello CGOCUS V1.1, las 7 secciones, `fig.F22.*` y `fig.F21.*`.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/marcadores/explorador.md` y `/Users/rodrodr/Dropbox/Apps/luz_site/docs/marcadores/afinidades.md`: cada cifra con su consulta o regla de cálculo, sus asertos y las huellas de la fuente. Los nombres de clave coinciden con los que ya usa `cifras.json` (`bib.*`, `dv.cgocus.*`, `explorador.gz.bytes|peso0`).
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/explorador.md`, `/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/afinidades.md` y `/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/grafias_explorador.md` (11 nombres para D-22).

## Qué verifiqué

- **Búsquedas de muestra (F29), sobre la v3** (sha256 `3a0d8b2d…`): 20, 28, 40 (8 intervenciones traen las dos frases), 375/316, 531/454, 2.028 y 2.125, 724/493 y 6. En la última, la de Azaña sale cuarta por relevancia.
  - Los meses de «casas viejas»: enero de 1933 sin sesiones; febrero, 114 intervenciones (102 solo de habla).
  - En el explorador comprobé la tecla `/`, que Intro lanza la búsqueda y que la unión con `|` da 40.
  - Leí el bloque «Método y límites» de Menciones en pantalla.
- **Bibliotecas:** 31 con 24.029 entradas, pero son 20.443 intervenciones distintas, así que el copy dice «entradas». 25 de los 26 debates reúnen sus sesiones enteras; «Reforma agraria y Sanjurjada» es una selección.
- **«Recordar la base» (C4):** falla sola en Chromium y en WebKit con perfiles nuevos. No se promete.
- **CGOCUS V1.1:** comprobé el MD5 de los 5 archivos de datos contra la API de Dataverse. Cita oficial descargada hoy de la API.
  - 78 diputados en las tres legislaturas; 63.507 relaciones par-medida.
  - Cruce de bloque: 35,1 / 23,0 / 7,4 %. Cruce estricto: 7,1 / 2,5 / 5,8 %.
- **Correcciones a la narrativa §16:**
  - «Firman 454 / 446 / 316» incluye a firmantes sin ficha en esa legislatura. Dentro del censo son 453 / 440 / 315, y así censo = firman + aislados.
  - «Casi todo el cruce estricto de 1936-1939 es con el PNV» es falso: el PNV está en el 24,5 % y la CEDA pesa más. Lo sustituyen tres hechos medidos: el peso del centro en el cruce (79,8 → 89,0 → 21,5 %), que ese cruce se concentra en 16 de las 89 medidas y que 85 de ellas son anteriores al 18 de julio de 1936.
- **Salvedades nuevas en la página:** 175 medidas con la lista de firmas cortada en el Diario y 781 firmas sin atribuir.
- **Marcadores:** las 83 filas de mis dos tablas coinciden con el comprobador del propio exportador.
- **Vista en el navegador:** con `astro dev` en una copia en el scratchpad, las dos páginas pintan todo el copy, en los dos temas, sin desbordar a 375 px.
- **Estilo:** ninguna palabra vetada, ninguna frase de más de 30 palabras, ninguna cifra tecleada.

## Pendiente, y por qué

- **Plantillas y `comun.md`** (anotado en peticiones):
  - Tres enlaces salen «pendiente» porque no tienen rótulo único ni destino: [Ver cómo citar cada edición], [Ver cómo se cuentan las palabras] y [Unir con THQCMI].
  - La captura `sobre` debe ir en «Llevárselo, citado», no en «Cómo empezar».
  - La sección «datos» de Afinidades no tiene todavía hueco para la tabla de archivos.
- **Exportador:** `explorador.py` y `afinidades.py` siguen vacíos. Faltan en `cifras.json` las cifras `busqueda.*`, `bib.debates_enteros` y `afin.*`.
- **Investigador:**
  - C4, D-18 y D-3.
  - Los 448 emparejamientos falsos con Marial en V1.1: decidir si se declaran con nombre.
  - La documentación depositada no cuadra con los archivos (94.621 y 63.508).
  - El hito 18 del explorador dice «Martínez Barrio, presidente».
  - Las rutas internas visibles en la interfaz del explorador.
  - Revisar las grafías (D-22).
- **Inglés:** queda para la Puerta 3.

## Resultado 8

I've built the spelling table (D-22). It covers all 773 deputies who speak in the V2, not only the core you asked for. 265 spellings are confirmed, 497 are probable and 11 are left for the researcher to review. The core list has 223 names: 138 confirmed, 77 probable and 8 to review.

I went beyond the core because figures F30, F05 and F07 can label any deputy. The exporter's `valida_grafias` fails on any `rep_id` without an entry. The table stops at the V2, though: `base.py` rejects a `rep_id` that is not in the V2, so the CGOCUS people who never speak can't go in.

**Files I created**
- `/Users/rodrodr/Dropbox/Apps/luz_site/exportador/grafias.csv`: one row per `rep_id`, with the contract's five columns plus two more at the end:
  - `corto`: the name as the Diario's speaker labels print it, for figure labels.
  - `uso`: first name plus that label form, for first mention in the copy.

  I loaded it with `base._grafias()` without writing anything: 773 entries, no repeated ids, all in the V2, none empty.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/02c_GRAFIAS.md`: the 11 names to review with their evidence, four decision criteria for the researcher, the six letter changes against the base, base errors found, my reply to the four `grafias_*.md` requests, the non-deputy names and the core table.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/grafias/construir_grafias.py`: rebuilds the CSV and the doc with `--escribir`; case-by-case decisions are in `DECISION`, each with its reason.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/grafias/fuentes/`: the downloaded Congreso records (1,449 entries for the 1931, 1933 and 1936 elections) and the RAH matches, both fetched 22-09-2026.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/peticiones/grafias.md`: requests to other owners (the 836 split, which column to use, the confirmed 456).

**What I verified**
- **Diario:** I read how each name is printed in the speaker labels and running text of the V2 (MD5 checked) and in the v3 summary and comment rows (sha256 checked). All figures in the notes were recounted.
- **Name composition:** it follows the Congreso's historic-deputies record, which is the base's own source.
- **RAH:** a biography counts only if the first name, the surnames in order and the birth year all match. That took out several namesakes, and 270 deputies have a matching biography. Where the RAH disagrees, the name is marked "por revisar".
- **Main result:** `rep_id` 456 is confirmed as «Manuel Giménez Fernández». The Diario prints G in 97.9 % of his speaker labels and the RAH agrees. The quote in V2 71330 still reads «JIMÉNEZ FERNÁNDEZ» as printed.
- **Letter changes against the base:** Giménez ×2, Ossorio, Trabal y Sans (never "Saus" in the Diario), Bilbao Castellanos and Blasco-Ibáñez.

**Left for the researcher, and why**
- **The 11 "por revisar":** these are where the sources disagree (Ansó, Campalans, Nicolau d'Olwer, Serrano Suñer, Comín Sagües, Pildáin, Romá y Rubíes) or where the base has an error (836, Trabal, Bilbao Castellanos, Blasco-Ibáñez).
- **Four criteria I applied that he may want to change:**
  - **Composition:** keep the Congreso's «y» and «de», or use current usage.
  - **Catalan, Basque and Galician names:** Spanish forms as the Diario prints them, or the forms in their own language.
  - **Accents the Diario adds:** it puts accents on some Catalan surnames («Campaláns», «Xiráu»); I dropped them.
  - **Hyphens:** as the Diario prints them, or as the RAH does.
- **Base errors for the author:**
  - `rep_id` 836 (D-25): 92 of its rows belong to Ruiz-Funes (835).
  - V2 97389 has no `rep_id`; it is probably Sigfrido Blasco-Ibáñez (143).
  - The Ventosa row V2 74696 flagged by the cortes_a group is only recorded, not checked.

I did not run the full `exportar.py`, since it writes other owners' data. The table's cache lives in `~/.cache/luz_site/grafias/`, the cache folder the contract names.

## Resultado 9

The Sesiones index, the eight doors and El Diario are fully written, and every figure and quotation in them has been checked against the source. The site builds, and all ten pages open at 1.440 and 375 px in both themes with no overflow, console errors or unplaced copy. Until `sesiones.py` and `diario.py` export the figures, the preview shows them as ⟦clave⟧.

**Files created** (all in `/Users/rodrodr/Dropbox/Apps/luz_site/docs/`)
- `copy_es/sesiones.md`: index page, the shared door template, and the F26 and F30 texts.
- `copy_es/sesiones_<puerta>.md`: one per door (sufragio-1931, cuestion-religiosa-1931, estatuto-1932, casas-viejas-1933, pistola-1934, antesala-1936, figueres-1939, mexico-1945).
- `copy_es/diario.md`: the Diario page, plus F27 and F28 texts and their lists.
- `marcadores/sesiones.md` and `marcadores/diario.md`: every figure with its expected value, base and formula.
- `marcadores/citas.md`: 105 quotations (116 fragments) with V2 and v3 ids, plus a JSON block for the build check.
- `marcadores/comprobar_sesiones_diario.py`: recalculates everything from the sources and fails on any mismatch.
- `peticiones/sesiones.md` and `peticiones/grafias_sesiones.md` (about 40 names).

**What was verified**
- **Source files:** fingerprints of V2, v3 and the project metadata match.
- **Figures:** 334 recalculated, and 418 table rows match with no differences.
- **Quotations:** every fragment is letter for letter in its V2 row and its v3 row, or in one edition only where the other lacks the row (e.g. v3 summaries), and flagged as such. Every quotation shown in the copy is a substring of its row.
- **Explorer counts:** all nine queries (one per door, two for Casas Viejas) were recounted on v3 exactly as the explorer does it, with filters and date.
- **F26:** the six vote totals were read in the row text, with 161–121 and the ordinary 141–106 (a vote without names) kept apart.
- **F27:** the ten rows are the same in both editions.
- **Style:** `copy2i18n` passes, no vetoed words, no typed counts, no sentence over 30 words outside quotations. Doors run 371–477 words, the index 699, the Diario about 1.500 (1.850 with the F27/F28 lists).

**Corrections to the narrative, all checked against the rows**
- F26 is a selection: the Diario prints nominal-vote lists in at least 405 of the 755 sessions. The 7-IV-1936 vote also prints the "mitad más uno" (209 of 417), so F26 has three such lines, not two.
- F28 has eight Presidencia orders, not seven. On 15-IV-1936 the Presidencia gave the order three times, and one wording ("no constarán esas palabras en el Diario", V2 102486) was missed by the original search.
- There are five taquígrafo notes of words removed by order, not three: two say "no constan" (V2 103250, 105310). F28 therefore has 13 marks.
- Azaña, 27-V-1932: his is the longest speech in v3 only; in V2 his row is the second longest.
- Figueres: the extract does name the place ("Castillo de Figueras"). A note at its end explains the earlier "NO EXISTE DATO ALGUNO": the extract was obtained later as a photocopy. There was also a nominal vote (62 in favour, no list).
- 4-VII-1934: the Diario does describe the fight (Tirado and Oriol de la Puerta), and the session was suspended.
- 9-XI-1945 did not debate Giral's declaration; it was approved on the 8th in an ordinary vote.
- Several quotations in the narrative were not literal and are fixed: "Si, prometo", "taquigrafos" without accents, "veintidos", and the dash in Alba's words. "(Campanilla.)" does not appear in V2 at all.

**Still pending, and why**
- **The exporter** needs to implement the figures and adapt the build check: quotations are lists of fragments, one edition may be null, and two fragments contain line breaks. Details are in `peticiones/sesiones.md`.
- **Bibliography gate (D-12):** outside facts are left out until they have a reference: articles 36 and 26 of the Constitution, the 1933 women's vote, 9-X-1934, and where in the castle Figueres met. The Ibárruri attribution is kept as "a veces se atribuye" and marked pending.
- **D-22:** "Manuel Giménez Fernández". The Diario's own post labels spell it with G ("VICEPRESIDENTE (Giménez Fernández)"), which supports the proposed spelling.
- **D-11:** I left out the "acotaciones de conflicto" counts (163 and 82) that the narrative gave for two sessions; the plan keeps that classification for 0.2.
- **Unresolved names:** the five "no" voters of 7-IV-1936 and "Muñoz de Zafra" stay as printed in the Diario; resolving them needs the 1936 deputy list (0.2).
- **Other owners:** `figuras.md` must not repeat the F26–F30 keys. `check-i18n` needs to exempt digits inside quotation keys and the explorer's date filters. The Pasaje component should exclude quotation keys if it renders them itself.

## Resultado 10

**Scaffolding report (Luz y Taquígrafos, Astro)**

The Astro project in `/Users/rodrodr/Dropbox/Apps/luz_site` builds 46 pages: 22 per language, plus the root page and the 404. Missing copy, data and figures show as ⟦placeholders⟧ in the preview instead of breaking the build. The 144 Playwright tests pass, and so do the conformance checks listed below.

**Files created**
- **Project files:** `package.json` (Astro 7.3, sitemap, the three self-hosted font families, sharp, Playwright, TypeScript, astro check), `astro.config.mjs` (default site `https://rodrodr.github.io`, base `/luz`, trailing slash always, es/en), `tsconfig.json`, `playwright.config.ts`, `.gitignore`, `.claude/launch.json` (dev server on 4321, preview on 4322).
  - `npm install` done, and `node_modules` is marked `com.dropbox.ignored`.
  - Git is broken on this Mac (the `git` binaries are x86 and don't run), so I created the repository structure (`.git`, branch `main`, no commits) by hand.
- **`src/lib`:**
  - `cifras.ts` emits every number with its `data-k` and `data-base`.
  - `formato.ts` does the number formatting and reproduces all 48 test cases in `formatos.json`.
  - `i18n.ts` has the escape fix and shows ⟦key⟧ for missing copy.
  - Also: `idiomas.ts`, `rutas.ts`, `remata.ts`, `figuras.ts` (figure registry), `cita.ts`, `datos.ts`, `lectura.ts`, `piezas.ts`, `pagina.ts`.
  - `src/config/enlaces.ts` holds the DOIs, `ENLACES_PROFUNDOS = false` and `PENDIENTES_DEL_INVESTIGADOR`.
- **Styles:** `src/styles/tokens.json` is the single source; `scripts/tokens.mjs` generates `tokens.css` and a latin-only `fuentes.css`, and checks 42 contrast pairs. Also `base.css`, `figuras.css`, `piezas.css`.
- **Layout and components:**
  - `Base.astro`: header, six tabs in two groups, ES·EN, theme button, skip link, footer without funding, hreflang, JSON-LD, og tags.
  - Components: Pestanas, IndiceLateral, BandaCTA, SubNav, Captura, Cita, Salidas, NotaBases, CopiarConsulta, Sello, Hemiciclo (ported from `hero_svg.py`), ficha/Vecinas, ficha/Tareas.
  - Extra helpers: Seccion, CabezaPagina, FiguraMarco, FigHueco, RegistroPuertas, TablaFiguras (F35), SinSitio, Sprite, plus the design team's requested NotaMargen, CitaDiario, FilaDatos, Registro and CifraFrase.
- **Scripts in `src/scripts`:** `figuras.ts` (the generic figure island), `copiar.ts`, `pesado.ts` (lazy loader for heavy pieces).
- **Pages:** every route in the plan for es and en, the root language selector over the hemicycle, the bilingual 404, and a LÉAME text endpoint per figure. Each figure slot has a `<!-- FIG Fxx -->` comment and a `<FigHueco>`.
  - The templates already read the copy the other groups have written, in the order they wrote it, and place fixed phrases where the copy put them. Anything not yet placed appears at the end of the page in a "sin sitio" box (preview only).
- **Scripts in `scripts/`:** `copy2i18n.py`, `copy_lectura.py`, `check-i18n.mjs`, `audit-cifras.mjs`, `check-formatos.mjs`, `vetos.mjs`, `tokens.mjs`, `og.mjs` (writes `og-es.png`, `og-en.png` and `favicon.svg`).
- **Tests:** humo, sinjs, solapes, peso, guardas and movimiento.
- **Requests file:** `docs/peticiones/andamiaje.md`, with what the other groups need to know and what I need from them.

**Verified**
- The preview build passes. The strict build (`STRICT=1`) fails as it should: the English copy doesn't exist yet.
- `astro check`: 0 errors. `check-formatos`: 48 of 48 cases match.
- `audit-cifras`: all 838 numbers carry their base, NotaBases appears wherever there is a v3 number, nothing from the 1931 prototype, no third-party resources. It lists 737 pending items.
- Playwright (Node, using the installed Chrome, no downloads): 144 of 144 pass.
  - Every route in both languages at 360 px dark and 375 px light, with no overflow.
  - Tables reachable without JS; no sticky overlaps; weight budgets; prototype-file guards by hash; reduced motion.
- Playwright in Python: Inicio, Las Cortes, Método and `/en/` open at 1440 and 375 px in both themes with one h1, no overflow and no console errors.
- `docs/peticiones` requests addressed to me are applied:
  - From "diseño": nearly all points, with the deviations listed below.
  - From "exportador": formats and per-language JSON-LD.
  - From "capturas": a narrow size for `Captura`.

**Deviations from the design request**
- The theme is stored under `lyt-tema` rather than `tema`, because `rodrodr.github.io` is one origin shared with ParlaIbero and the explorer.
- The hemicycle keeps a "Todos" radio button, because without JS a radio can't be unchecked.
- The header, footer and thesis band live inside `Base.astro` and the Inicio page rather than as separate component files.

**Pending, and why**
- **Other owners:** English copy (Puerta 3), the figure components (every `FigHueco`), the D-20 form wording, and the rest of the copy.
- **Six typed numbers in other groups' copy** are flagged by `check-i18n`; they are listed in `docs/peticiones/andamiaje.md`.
- **Your decisions:** D-3, D-4, D-18, D-19, D-20, D-21, D-22, D-25, and the "Escribirnos" contact. It is `null` for now; in ParlaIbero you used your institutional email.
- **Git:** reinstall the Xcode command-line tools so `git` works again.
- **Not built:** `.github/workflows` (not part of this task).

## Resultado 11

He escrito la revisión de coherencia de la fase 1. En lo esencial, el contenido está bien: no he encontrado ninguna cifra falsa ni ninguna cita que no sea literal. Los problemas son de coherencia: cinco puntos contradicen la narrativa, una decisión adoptada o la exportación estricta. Además, Versiones y su copy no comparten claves, y `check-i18n` falla.

**Archivos que he creado**
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/REVISION_FASE1.md`: la lista priorizada (5 P1, 14 P2 y 13 P3), con archivo, clave, problema, corrección propuesta y dueño.
- `/Users/rodrodr/Dropbox/Apps/luz_site/docs/revision_fase1/recalcula_muestra.py`: vuelve a calcular la muestra al azar sobre las fuentes. Solo lee, tarda unos 40 s y hoy da 52 de 52.

**Compilación**
- `npm run i18n`: pasa (2.163 claves; no hay copy inglés).
- `copy2i18n --check`: pasa.
- `exportar.py`: pasa, con 508 cifras y los 32 controles. Deja 7 avisos por `sesion.1931-10-01-48.cola*`, que con `--estricto` serían fallos.
- `npm run build`: pasa (46 páginas). La compilación estricta falla porque falta el inglés, como se esperaba.
- `check-i18n`: **falla** por seis números tecleados.
- `audit-cifras`, `astro check` y `formatos`: pasan.

**Qué he verificado**
- **Inicio:** recalculé sobre la V2, la v3, `sessions.json` y Dataverse los 29 marcadores de cifra de la página (hay otros dos, `{{etapa}}` y `{{n}}`, que son variables de plantilla). Todos coinciden: los ids, las filas de las puertas, los seis votos con sus mitades, 0,83 %, 158,1 MB y la licencia.
- **Resto de grupos:** 52 marcadores al azar (semilla 20260922), 52 correctos.
- **Citas:** los 116 fragmentos de `citas.md` están letra a letra en su fila. De las 264 citas «» del copy no queda ninguna inventada: las que no aparecen en ninguna edición son rótulos, nombres de biblioteca, citas con [sic] intercalado o la frase de Ibárruri, que el copy ya da por ausente.
- **Marcadores:** todos tienen su fila en `docs/marcadores/`, salvo D-20. Ninguna clave tiene dos valores esperados distintos entre grupos.
- **Vetos y grafías:** no queda nada del prototipo ni promesas falsas del explorador. Las 13 frases fijas ↺ están letra a letra. Los nombres son coherentes, salvo Ventosa.

**P1**
1. **`inicio.tesis.inabarcable`:** dice «Nunca fue secreto: solo inabarcable.» La narrativa dice «Casi nunca fue secreto: sobre todo, inabarcable», con «salvo lo que la Presidencia mandó borrar». Así contradice la frase anterior de la propia tesis (V2 71329) y la página El Diario.
2. **Título «El discurso más largo, a nombre de otro»:** aparece en Inicio, Sesiones, la ficha I y la puerta. La narrativa §10.3 lo titula «El discurso de Azaña, a nombre de otro» y veta esa frase sin base. Solo es cierta en la v3; en la V2 es la segunda fila más larga.
3. **La cola de la sesión 48 tiene dos claves:** `ses.s48.cola*` y `sesion.1931-10-01-48.cola*`. La segunda choca con las familias del exportador y rompe la exportación estricta. Método debe usar `ses.s48.cola*`.
4. **«unos 107 MB»** (marcador `explorador.gz.bytes|peso0`, en Inicio, Datos y Explorador): contradice D-26 (a), la opción que rige y que el contrato adopta: «unos 112 MB comprimidos», en unidad decimal.
5. **Versiones:** la plantilla pide `versiones.cambia.*`, `versiones.indice.cambia` y `fig.F35.col.*`, que el copy no tiene. El copy escribe `versiones.donde.*` y `versiones.resultado.*`, que la plantilla no coloca.

**P2, los más importantes**
- **Puerta del Estatuto:** imprime 17.142 y 17.152. La narrativa pide «más de 17.000» y veta las tres cifras.
- **«Hagan sus preguntas»:** D-24 (a) es «Haga».
- **«una fila cada vez que el Diario anota quién habla»:** no es exacto (H21). Pasa en Inicio y en F30.
- **Frase fija ↺ 10:** no es exacta. `2REP_cosponsorship` usa «1933-1935»; lo he medido en 6.528 filas.
- **«Juan Ventosa»:** el quinto orador de F05 en 1936 es el `rep_id` 993, Ventosa Calvell.
- **Grito de «Luz y taquigrafos.»:** Cortes I-II lo atribuye sin matices a Giménez Fernández.
- **«Tiros a la barriga»:** la frase «la primera vez que el Diario lo recoge» afirma sobre el impreso algo que solo se sabe del corpus (plan R24).
- **«Samper abre la sesión»:** es falso; habla en el orden 8, tras el secretario y la Presidencia.
- **Números tecleados:** son los seis que hacen fallar `check-i18n`.
- **Datos:** `datos.unir.texto` pone cifras exactas de CGOCUS en la prosa, contra D-3.
- **Método:** llama «Sobre el corpus, en la cabecera» al panel que en el explorador es «Sobre este corpus», en el panel lateral.
- **Rótulos y enlaces:** hay rótulos duplicados o sin destino y [Escribirnos] no tiene contacto.
- **Capturas:** las 12 existen, pero la página del explorador no pinta ninguna.
- **Copy sin sitio:** hay texto escrito que ninguna página pinta, como el glosario y las tablas que aún son `FigHueco`.

**Pendiente, y por qué**
- **Correcciones:** no he tocado el copy de nadie; cada corrección tiene su dueño en el informe.
- **Fase 2:** 936 marcadores esperan a los módulos de fase 2 del exportador, y las figuras siguen como `FigHueco`.
- **Inglés:** no existe copy inglés.
- **Del investigador:** D-20, D-22, D-25, el contacto de [Escribirnos], la nueva redacción de ↺ 10 y, si lo quiere, levantar el veto de las cifras del Estatuto.
