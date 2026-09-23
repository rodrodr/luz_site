# Material para la página «Explorador» del sitio de Luz y Taquígrafos

Estudio hecho el **22-09-2026** sobre el explorador publicado (https://rodrodr.github.io/luz_explorer/), con Playwright en Python y Chromium sin interfaz (headless). No he tocado nada del explorador ni del proyecto: todo lo que se guardó (una biblioteca del proyecto y la base «recordada») quedó solo en un perfil de navegador de usar y tirar, dentro del scratchpad.

- Capturas: `/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/capturas_explorador/` (54 PNG)
- Datos leídos de la interfaz para una posible figura interactiva: `…/scratchpad/sitio/datos_tendencia_casas_viejas.json`
- Guiones reproducibles: `…/scratchpad/sitio/lx_work/` (`lx.py` y `s0.py` a `s35.py`), más volcados de texto (`reader_6079.txt`, `sesion_48.txt`, `lexico_sufragio.txt`, `coo_sufragio.txt`, `menciones_sufragio.txt`, `ayuda.txt`)

---

## 0. Resumen

1. **Se han alcanzado los once estados, de (a) a (k).** Todas las cifras de este informe son las que muestra la pantalla, salvo donde digo otra cosa.
2. El explorador **sirve la v3 sin depositar** y lo dice en su propio panel: «v3, matriz resegmentada (local, sin publicar)», `2REP_Diaries_v3.csv`, 121.700 intervenciones, 755 sesiones, SHA-256 `e1906abc…`. Pero **la cita que pone en todo lo que se descarga dice «Harvard Dataverse, V2»**. Un lector que siga un id de un CSV exportado no lo encontrará en la V2 depositada, porque los ids están renumerados. Es la salvedad más seria para la página.
3. Queda confirmado en pantalla lo que el explorador **no hace**. La cabecera de la sesión corrida no da Diario, páginas, Presidencia ni Gobierno, aunque la ayuda lo promete. «Mismo diputado» se declara «coincidencia léxica (bm25)», mientras la ayuda habla de parecido «por significado». El buscador principal rechaza `agrar*` con un mensaje de error.
4. **Menciones tiene errores visibles en la biblioteca de ejemplo.** Las seis «personas externas» más citadas son diputados del corpus escritos con otra grafía: «Ossorio y Gallardo», «Martínez Barrios», «Ruiz de Villa», «Galarz», «A. Azaña» y «Castriillo». En los focos aparecen además «Dipu‑tado» y «Sanipcr» como si fueran personas. Contra lo que dice `investigacion.json`, **los cargos sin nombre no se atribuyen**: la propia pestaña enumera «sr ministro 100, senor ministro 11…» como «aún sin atribuir».
5. **El careo de misma sesión propone como «réplicas» el Sumario (orden 1) y los Comentarios del Diario (orden 61)**. No son habla de nadie.
6. La biblioteca «Debate · Sufragio femenino» reúne **las sesiones enteras** del 30-09 y el 01-10-1931, no solo el debate del sufragio. Por eso su Léxico trae «pena de muerte» en segundo lugar y un tema entero sobre la huelga de Telefónica. Sirve de ejemplo si el pie lo explica.
7. **No es una herramienta para móvil.** A 390 px la página se desborda en horizontal (522 px de ancho sin lector y 776 px con él) y el lector queda fuera de la pantalla. Con emulación de teléfono y los paneles plegados se puede leer, pero sin más. La página debe decir, como ParlaIbero, que pide un ordenador.
8. El explorador **arranca siempre en tema claro**, aunque el sistema pida oscuro. El oscuro existe (◐ o Ajustes) y lo he capturado para las vistas principales.
9. **Recordar la base.** La casilla viene marcada, pero en esta prueba el intento automático falló con el mensaje «No se pudo recordar la base: La base guardada no coincide con la construida y se ha borrado». Con el botón manual funcionó (269 MiB), y en la siguiente carga no se volvió a descargar nada. No puedo saber si el fallo se debe al Chromium sin interfaz: **conviene comprobarlo en un navegador normal antes de prometer que funciona sin conexión**.
10. Contraste con `investigacion.json`: casi todo se confirma. Hay tres errores de hecho: el primer resultado de «España ha dejado de ser católica», la atribución de cargos en Menciones y el guardado automático de la base. Hay además dos cifras que solo valen con una condición que no se dice: 102/108 exige «Solo lo que se habla» más «aplicar filtros», y la frase de las «28 que añade» la segunda expresión se presta a confusión. Detalle en el §5.

---

## 1. Cómo se hicieron las capturas

| | |
|---|---|
| Fecha | 2026-09-22, de 16:15 a 16:54 (hora local) |
| URL | https://rodrodr.github.io/luz_explorer/ (`last-modified: Mon, 21 Sep 2026 00:43:01 GMT`, `etag "6ab07d95-2bc4d3"`) |
| Huella de la página | `build_id` `1857031ae8c04b3d`. La interfaz no muestra número de versión. |
| Corpus servido | `datos/corpus.sqlite.gz.000/.001/.002` (45.011.196 + 44.043.029 + 21.731.188 = **110.785.413 bytes**). Panel: `2REP_Diaries_v3.csv · 173,9 MB (173.873.699 bytes)`, «v3, matriz resegmentada (local, sin publicar)» |
| Navegador | Playwright 1.59 (Python), Chromium headless, perfil persistente propio, `locale es-ES`, `--lang=es-ES` (sin esta opción los campos de fecha salían «mm/dd/yyyy») |
| Ventana | 1440 × 900, densidad 1×. Móvil: 390 × 844 (con y sin emulación de teléfono) |
| Tema y estilo | **Claro** y **Editorial** salvo las `*_oscuro_*` (comprobado en ⚙ Ajustes: «Editorial» y «Claro» marcados) |
| Tiempo de carga observado | Unos 3 s hasta ver la lista, aquí y con esta red. El panel dice «Construido 0,7 s en este navegador (SQLite 3.53.4)». **No son cifras publicables**: dependen del equipo y de la conexión. |

**Dos estados distintos del perfil.** A las 16:23 añadí la biblioteca del proyecto «Debate · Sufragio femenino». Desde entonces el explorador marca con un rombo verde ◆ los resultados que pertenecen a ella y añade en el lector una etiqueta «◆ Debate · Sufragio femenino». Las capturas anteriores están **limpias**: `a_*_1440`, `b_*_1440`, `c_*_1440` salvo `oscuro`, `d_*`, `e_careo_1440`, `e_careo_ancho_1440`, `e_careo_mismo_diputado_1440`, `f_tendencia_casas_viejas_1440` y `f_tendencia_casas_viejas_panel`. Las `*_oscuro_*` y las de 390 px llevan esas marcas.

---

## 2. El modelo: la página «Explorador» de ParlaIbero

Revisado en `/Users/rodrodr/Dropbox/Apps/parlaibero_site/src/pages/[lang]/explorador.astro`, `docs/02_COPY_es.md` §8, `src/components/Captura.astro` y `src/assets/explorador/LEEME.md`.

- **Orden (§8.1–8.8):** cabecera con botón «Abrir el explorador ↗» → «Primero, encontrar» (cuatro preguntas a dos columnas; la captura de Tendencia bajo la cuarta) → «Después, enfocar: las bibliotecas» (la sección central, con más aire y la frase destacada «Un corpus entero no es una pregunta. Una biblioteca sí.»; capturas `bibliotecas.png` y `lexico.png`) → «Coocurrencias» (`coocurrencias-temas.png` a todo lo ancho y `coocurrencias-resumen.png`) → «Menciones» (`menciones-red.png`, `menciones-partidos.png` y un bloque de límites con filete) → «Y llevárselo, citado» → «Cómo empezar» (tres pasos) → «Lo que pide, y lo que no hace» junto a «Lo que se queda en su equipo».
- **`Captura.astro`:** `<figure>` con `<Picture>` avif/webp (anchos 480–1440), pie obligatorio que sirve también de `alt`, y un enlace a la imagen grande que abre otra pestaña (así se amplía sin JavaScript). Las capturas son de interfaz **clara**, sobre una «placa» clara con filete también en el tema oscuro.
- **`LEEME.md`:** fecha, URL, huella, archivo con su sha256, ventana, tema, parámetros de cada vista, qué muestra cada imagen con sus píxeles y sus recortes, y lo que no se pudo hacer (la red de coocurrencias no se dibuja, así que no hay imagen de ella).
- **Regla de nombres de ParlaIbero:** ninguna imagen enseña el texto de una intervención junto al nombre de quien la dijo (son parlamentarios en activo). En LyT son figuras históricas de 1931–1945 y el lector del Diario **es** la función estrella. **Lo tiene que decidir el autor** (§7).
- **Diferencia de fondo:** en ParlaIbero el usuario descarga el CSV de un país y lo arrastra. En LyT el explorador **se abre con el corpus ya cargado**. «Cómo empezar» cambia por completo: no hay formulario de Dataverse ni descompresión.

---

## 3. Inventario de capturas

«Uso» indica mi propuesta para la página. ★ marca las que recomiendo.

| archivo | px | qué se ve realmente | uso |
|---|---|---|---|
| `a_inicial_1440.png` | 1440×900 | Estado inicial: cabecera «Luz y Taquígrafos · Explorador de los Diarios de Sesiones · 121.700 intervenciones · 1931–1945», buscador con el ejemplo «p. ej. reforma + agraria \| "voto femenino"», panel de filtros, «121.700 intervenciones · 2.2 ms · sin texto de búsqueda», barra «Espectro ideológico de los 121.700 resultados» y la lista desde el Sumario de la sesión 1 (14-07-1931) | ★ 8.1 o 8.2 |
| `a_inicial_oscuro_1440.png` | 1440×900 | Lo mismo en tema oscuro (fondo `rgb(23,23,26)`, acento rosado) | variante oscura |
| `a_inicial_390.png` | 390×844 | Móvil sin emulación: el panel de filtros ocupa dos tercios y la lista queda cortada a la derecha | prueba de que no es para móvil |
| `a_inicial_390_movil_panelplegado.png` | 780×1688 (2×) | Con emulación de teléfono y filtros plegados | — |
| `b_busqueda_voto_1440.png` | 1440×900 | Búsqueda `"voto femenino" \| "voto de la mujer"`: «40 intervenciones · 11 ms», línea «Se busca: «voto femenino» O «voto de la mujer» · sin acentos ni mayúsculas · las comillas buscan la frase exacta», espectro de los 40, resultados con fragmentos resaltados e insignias de clima | ★ 8.2 |
| `b_busqueda_voto_oscuro_1440.png` | 1440×900 | Lo mismo en oscuro (con ◆) | variante |
| `b_busqueda_voto_390*.png` | 390 / 780 px | Móvil | — |
| `c_lector_campoamor_1440.png` | 1440×900 | Tres columnas: filtros, lista (Campoamor resaltada) y lector con la ficha y el §1 | — |
| `c_lector_campoamor_sinfiltros_1440.png` | 1440×900 | Lo mismo con los filtros plegados | — |
| `c_lector_campoamor_ancho_1440.png` | 1440×900 | Lector a todo lo ancho (filtros y lista plegados): «La señorita CAMPOAMOR», ficha, «Consta en el diario como: La Srta. CAMPOAMOR:», capital «Y» granate, «(Muy bien. Aplausos.)» en verde cursiva, § 1 y § 2 al margen | ★ 8.3 |
| `c_lector_campoamor_rumores_1440.png` | 1440×900 | § 2–§ 4: «(Señalando a los de la minoría radical socialista.)» en gris dentro del texto y «(Rumores.)» en bloque color teja con filete | ★ 8.3 (acotaciones) |
| `c_lector_campoamor_hilo_1440.png` | 1440×900 | Final (§ 11), «(Muy bien.—Aplausos.)» en bloque verde, y el «Hilo continuo de la sesión (1 de octubre de 1931)», órdenes 27–33 | ★ 8.3 |
| `c_lector_campoamor_oscuro_1440.png`, `c_lector_campoamor_rumores_oscuro_1440.png` | 1440×900 | Lector en oscuro (con la etiqueta ◆) | variante |
| `c_lector_campoamor_390.png` | 390×844 | Sin emulación: el lector queda fuera de la pantalla | prueba |
| `c_lector_campoamor_390_movil_plegado.png` | 780×1688 | Con emulación y paneles plegados: el lector se lee bien | posible pie «también en tableta» (no lo recomiendo) |
| `d_sesion_corrida_1440.png` | 1440×900 | Sesión corrida con paneles plegados, en la intervención de referencia: tarjeta enmarcada en oro «La señorita CAMPOAMOR (Orden 30) · DS · NÚM. 48 · ★ Intervención de referencia · Ver solo este», y arriba «🎯 Ir a la referencia (#30)» y el selector «Orden 30 · CAMPOAMOR» | ★ 8.3 |
| `d_sesion_corrida_cabecera_ancho_1440.png` | 1440×900 | Cabecera de la sesión corrida: «SESIÓN CORRIDA ÍNTEGRA · SESIÓN NÚM. 48 / 415 intervenciones íntegras · 43.766 palabras · Discurso activo: #30 de 415 / 1 de octubre de 1931», y debajo el Sumario (orden 1) | 8.3 (demuestra que la cabecera no trae Diario ni páginas) |
| `d_sesion_corrida_marco_1440.png`, `d_sesion_corrida_marco_ancho_1440.png` | 1440×900 | Variantes del marco (con la lista abierta) | — |
| `e_careo_1440.png` | 1440×900 | Careo con paneles abiertos: solo cabe un pliego | — |
| `e_careo_ancho_1440.png` | 1440×900 | Careo en dos pliegos: CAMPOAMOR (orden 30) ★ Referencia frente a KENT (orden 25) «Réplica propuesta». Arriba, las cinco propuestas con sus motivos y la nota «Heurística… No prueba que exista un diálogo.» | ★ 8.3 |
| `e_careo_mismo_diputado_1440.png` | 1440×900 | «Mismo diputado»: Campoamor 01-10-1931 frente a Campoamor 20-12-1932 (ses. 281, orden 72); propuestas «Coincidencia léxica 0,85 (relativa)…»; la nota dice «sin índice semántico se usa la coincidencia léxica (bm25)…» | 8.3 o límites |
| `e_careo_oscuro_1440.png` | 1440×900 | Careo en oscuro | variante |
| `f_tendencia_casas_viejas_1440.png` | 1440×900 | Panel Tendencia de `"casas viejas"`, «Todo», mensual, /10.000 palabras, 19 hitos numerados y «2 hitos fuera del periodo mostrado»; recesos rayados, «guerra» y «exilio» comprimidos; debajo, el espectro de los 375 resultados | 8.2 |
| `f_tendencia_casas_viejas_panel.png` | 1401×441 | Solo el panel anterior (sin lista) | ★ 8.2 (como la `tendencia.png` de ParlaIbero) |
| `f_tendencia_casas_viejas_constituyentes_tip.png` | 1401×404 | Periodo «Constituyentes» con la ficha del mes fijada en febrero de 1933: «"casas viejas" 8,21 · 492 menciones · 114 interv. · 598.946 palabras · 2.055 intervenciones · 16 sesiones» | ★ 8.2 (alternativa) |
| `f_tendencia_casas_viejas_constituyentes_1440.png` | 1440×900 | Lo mismo en la ventana completa | — |
| `f_tendencia_casas_viejas_agrari_variantes.png` | 1401×441 | Dos series: `"casas viejas"` · 1.193 y `agrari*` · 11.880 (el prefijo funciona aquí) | 8.2 (prefijo) |
| `f_distribucion_casas_viejas.png` | 1401×253 | Pestaña Distribución: «Resultados por año · 375 intervenciones» (1933–1936), familias y oradores | opcional |
| `g_mis_bibliotecas_vacia_1440.png` | 1440×900 | Estado inicial de «Mis bibliotecas»: «Aún no tiene bibliotecas…», botones «+ Nueva biblioteca», «Importar .2replib…», «Añadir bibliotecas del proyecto…» | — |
| `g_dialogo_bibliotecas_proyecto_1440.png` | 1440×900 | Diálogo «Bibliotecas del proyecto» sin marcar | — |
| `g_dialogo_bibliotecas_proyecto_marcada_1440.png` | 1440×900 | El mismo con «Debate · Sufragio femenino · 770 intervenciones» marcado y el botón «Añadir 1» | ★ 8.4 |
| `g_biblioteca_anadida_1440.png` | 1440×900 | La biblioteca ya en la columna izquierda: «770 intervenciones · 2026-09-22» y el comienzo de la nota | — |
| `g_biblioteca_abierta_1440.png` | 1440×900 | Biblioteca abierta, pestaña Intervenciones (770): etiquetas «B2», familia y palabras, con «Añadir nota» y «Quitar» | 8.4 (opcional) |
| `g_lexico_sufragio_1440.png` | 1440×900 | Léxico con la columna de bibliotecas abierta | — |
| `g_lexico_sufragio_sinpanel_1440.png` | 1440×900 | Léxico a todo lo ancho: cuatro cifras (69.640 · 7.565 · 0,109 · +810,9 «mujer»), el párrafo de método y la tabla (mujer, pena de muerte, muerte, voto, mujeres, pena, veintitrés, veintiún años…) | ★ 8.4 |
| `h_coocurrencias_sufragio_1440.png` | 1440×900 | Cabecera de Coocurrencias: controles (Intervención / Fragmentos de 20 palabras · Términos 250 · Vecinos 10 · Temas normal), cinco cifras (9 temas · 250 términos · 1.209 conexiones · modularidad 0,7758 · 7,6 % sin tema), el párrafo de método y «Leer primero» (10 intervenciones) | ★ 8.5 (resumen) |
| `h_coocurrencias_tema1_sufragio.png` | 1369×278 | La tarjeta del **tema 1** «mujer española · mujer · femenina»: 53 términos · 276 intervenciones (35,8 %) · 27 % del texto · G² medio 89, sus píldoras y el eje de partidos ASR 0,4× … PRR 1,8×. Al pie, la línea plegada «▸ Leer primero: Rafael Guerra Del Rio · Mariano Ruiz Funes Garcia y 23 más» | ★ 8.5 (a todo lo ancho) |
| `h_coocurrencias_temas_1440.png` | 1440×900 | Bloque «Temas» con su explicación y los temas 1 y 2 | — |
| `h_lector_desde_leer_primero_1440.png` | 1440×900 | Coocurrencias y el lector abiertos a la vez (Guerra del Río) | — |
| `h_lector_tema_si_1440.png` | 1440×900 | Lector con «Tema: Sí · Fondo»: cada término teñido con el color de su tema (morado el tema 1, rosa otro) | ★ 8.5 |
| `i_menciones_sufragio_1440.png` | 1440×900 | Cabecera de Menciones: 110 con menciones (14 % de 770) · 58 personas (12 externas) · 223 menciones de 44 oradores · 8 focos (modularidad 0,552), y el arranque de la red | 8.6 |
| `i_menciones_red_sufragio.png` | 1367×682 | La red radial agrupada por partido: sectores PRRS, PSOE, DLR, PRR, Personas externas, PRDF, Indep., CEDA, ASR y Otros partidos; anillos ≥1, ≥2, ≥4, ≥9 y núcleo ≥15 | ★ 8.6 |
| `i_menciones_matriz_sufragio.png` | 1367×282 | Matriz «Entre partidos» 8×8 por 10.000 palabras, con «Propio» y «Todas» | ★ 8.6 |
| `i_menciones_personas_sufragio.png` | 818×821 | «Más mencionados»: Barriobero 9 oradores/14 menciones, Campoamor 8/12, Jiménez de Asúa 7/26… con «Ossorio y Gallardo *externa*» y «Martínez Barrios *externa*» | prueba del límite |
| `i_menciones_focos_sufragio.png` | 1369×575 | Ocho focos: aparecen «A. Azaña» junto a «Manuel Azaña Diaz», «Martínez Barrios» junto a «Diego Martinez Barrio», y «Galarz», «Dipu‑tado», «Sanipcr» y «Estébanez» como externas | prueba del límite (no para publicar) |
| `j_exportar_dialogo_1440.png` | 1440×900 | Diálogo Exportar de los 40 resultados: formato CSV, «Incluir el texto completo» marcado, la nota de R/pandas, el recuadro de la cita y «Tamaño estimado: ≈ 365 KB» | ★ 8.7 |
| `k_sobre_corpus_panel.png` | 291×1146 | Panel «Sobre este corpus» en la **primera visita**: cita (V2), DOI, licencia, publicación relacionada, «121.700 intervenciones · 755 sesiones», «Este archivo» (v3 sin publicar, SHA-256) y, en rojo, «No se pudo recordar la base…» | prueba |
| `k_sobre_corpus_panel_recordada.png` | 291×1157 | El mismo panel con la base recordada: «Esta base está recordada en este navegador («2REP_Diaries_v3.csv» (v3) · 269 MiB)…», «Reemplazar por otra versión…», «Olvidar la base» | ★ 8.7 |
| `k_sobre_corpus_1440.png` | 1440×900 | La ventana con el panel desplegado a la izquierda | — |
| `x_ajustes_1440.png` | 1440×900 | Ajustes: Estilo (Editorial ●, Iluminado, Clásico) y Tema (Claro ●, Oscuro) | — |
| `x_ayuda_1440.png` | 1440×900 | Ayuda «Cómo usar el explorador», sección «Cómo citar» | — |

---

## 4. Las funciones, una por una

### (a) Estado inicial y espectro ideológico

**Qué hace (comprobado).** Sin texto de búsqueda, la lista recorre el corpus en orden cronológico («sin texto de búsqueda: Está navegando el corpus con los filtros activos»), de 50 en 50. Encima va la barra «Espectro ideológico de los N resultados». Cada tramo es un botón con el texto «X de N (p %) · clic para filtrar por esta ideología».

**Cifras en pantalla (corpus completo, 121.700):** Extrema izquierda 227 (<1 %) · Izquierda 32.062 (26 %) · Centro-izquierda 17.926 (15 %) · Centro 16.675 (14 %) · Centro-derecha 29.317 (24 %) · Derecha 8.035 (7 %) · Extrema derecha 3.721 (3 %) · Sin identificar 13.737 (11 %). Suman 121.700. Bajo la barra: «Fuente: Rodrigues-Silveira et al. (2026), Luz y Taquígrafos, doi:10.7910/DVN/THQCMI».

**Filtros del panel (comprobado):**
- Qué se busca: «Solo lo que se habla», desmarcado de inicio.
- Fecha y sesión: Desde, Hasta, Nº de sesión.
- Longitud: mínimo y máximo, con los atajos ≥50, ≥100 y ≥300, y la nota «Dos de cada tres intervenciones tienen 50 palabras o menos y son de trámite…».
- Facetas: Legislatura, Familia política, Ideología, Partido, Diputado y Distrito. Tres llevan buscador: «Buscar entre 40…», «Buscar entre 774…» y «Buscar entre 55…». El de 774 es el de Diputado, comprobado; los otros dos son Partido y Distrito por su orden en el panel.
- Además: Restringir a una biblioteca, Búsquedas guardadas, «Guardar esta búsqueda» y «Sobre este corpus».

**Salvedades.**
- **No hay filtro por sexo ni por tipo de sesión.** El copy de ParlaIbero (§8.2, p2) los nombra, así que no se puede trasladar tal cual.
- «Sin identificar» incluye el Sumario y los Comentarios del Diario. Con «Solo lo que se habla», 121.700 pasa a 108.291; la diferencia es 13.409 filas, frente a 13.737 sin identificar.
- Los nombres de la lista van **sin tildes** y con mayúscula en las partículas («Clara Campoamor Y Rodriguez», «Luis Jimenez De Asua», «Niceto Alcala Zamora Y Torres»). Mejor no copiarlos así en el texto del sitio.

### (b) Búsqueda `"voto femenino" | "voto de la mujer"`

**Qué hace.** Búsqueda FTS5 con bm25, sin acentos ni mayúsculas. Las comillas buscan la frase exacta, `|` significa O y `+` (o nada) significa Y. La línea «Se busca» dice cómo se ha entendido la consulta. Cada resultado trae nombre, fecha, número de sesión, fragmento con el término resaltado, familia, partido, palabras y hasta dos insignias de clima. A la derecha lleva una barrita; no he comprobado qué mide.

**En pantalla:**
- «**40** intervenciones · 11 ms».
- «Se busca: «voto femenino» O «voto de la mujer» · sin acentos ni mayúsculas · las comillas buscan la frase exacta».
- Espectro de los 40: Izquierda 18 %, Centro-izquierda 38 %, Centro 30 %, Centro-derecha 8 %, Derecha 8 %.
- Primeros resultados:
  - Eduardo Barriobero Herran, 01-12-1931 (ses. 83), PRDF, 311 pal., «Rumores ×1», «Interjecciones ×1».
  - Victoria Kent Siano, 01-10-1931 (ses. 48), PRRS, 1.053 pal., «Aplausos ×8», «Interjecciones ×2».
  - Matías Peñalba.
  - Julián Besteiro, 20-12-1932, 42 pal.: «En nombre del voto femenino. (Grandes risas.)».
  - Luis Jiménez de Asúa, 01-10-1931, 41 pal.
  - Niceto Alcalá-Zamora, 30-09-1931, 78 pal.

**Comprobaciones:**
- `"voto femenino"` sola: 20. `"voto de la mujer"` sola: 28. Las dos con `+`: **8**. Unión: **40** (20 + 28 − 8).
- Clara Campoamor tiene 6 de las 40, y las 6 contienen «voto de la mujer».
- Las 40 van del 01-09-1931 al 15-12-1933, en 15 fechas distintas.
- Con «Solo lo que se habla» siguen siendo 40.

**Otras cifras que da el buscador el mismo día:** `divorcio` 531 (454 de habla; 421 con ≥100 palabras) · `reforma agraria` 2.125 (1.710 de habla) · `"reforma agraria"` 2.028 · `"estatuto de cataluña"` 724 (493 de habla) · `"España ha dejado de ser católica"` 6. El primero de estos 6 por relevancia **no es Azaña**. Detalle en el §5.

**Salvedades.**
- `agrar*` no se ejecuta. El mensaje dice «No se puede buscar agrar*: El asterisco (*) no se admite en esta búsqueda: escriba la palabra completa o varias formas unidas con | (p. ej. agrario | agraria).»
- No hay NOT ni proximidad (ayuda: «No se admiten el asterisco (agrar*) ni la exclusión (NOT)»).
- La ayuda habla de «los 24 millones de palabras del corpus», pero Tendencia da «Corpus completo · 25.903.736 palabras» y Léxico «25,8 millones». La propia herramienta no coincide consigo misma: en el sitio, mejor no dar la cifra o decir de dónde sale cada una.

### (c) El lector: Clara Campoamor, 01-10-1931 (id v3 6079)

**Qué hace.** Presenta la intervención como un pliego del Diario:
- Título impreso: «La señorita CAMPOAMOR».
- Nombre normalizado: «CLARA CAMPOAMOR Y RODRIGUEZ».
- «DIARIO DE SESIONES · LEGISLATURA 1931-1933», «Sesión núm. 48 · 1 de octubre de 1931».
- Etiquetas: Republicanos · PRR · Centro · Madrid · 1.460 palabras · Orden 30 de 415 · Legislatura 1931-1933.
- «Consta en el diario como: La Srta. CAMPOAMOR:».
- Once párrafos numerados § 1–§ 11 al margen y capital inicial granate (estilo Editorial).
- Botones: 📄 Discurso · 📖 Sesión corrida · ⚔ Carear · + Biblioteca · ⇔ Ensanchar · ✕.

**Acotaciones, leídas del DOM:** 7 acotaciones (8 unidades).
- Verde, `rgb(28,94,49)`: «(Muy bien. Aplausos.)», «(Muy bien.)» y «(Muy bien.—Aplausos.)», esta última en dos unidades.
- Teja, `rgb(150,60,22)`: «(Rumores.)» y «(Rumores)».
- Gris, `rgb(95,90,82)`: «(Señalando a los de la minoría radical socialista.)» y «(Risas)».
- Las que van dentro de una frase salen en cursiva en el propio texto. Las que ocupan párrafo propio van en bloque con filete del color de su clase.
- En la lista, la ficha solo enseña dos insignias: «Aplausos ×4» y «Rumores ×2».
- La clase ámbar (orden, Presidencia) no aparece en esta intervención.

**Hilo continuo de la sesión** (bajo el texto):

| orden | quién | qué muestra |
|---|---|---|
| 27 | Presidencia (Besteiro) | «La tiene S. S.» |
| 28 | Clara Campoamor | PRR · 780 pal. |
| 29 | Presidencia (Besteiro) | «Ruego a la Cámara que guarde silencio.» |
| **30** | **Clara Campoamor** | *Intervención abierta* |
| 31 | Presidencia (Besteiro) | «El Sr. Guerra del Río tiene la palabra para explicar el voto.» |
| 32 | Rafael Guerra del Río | PRR · 819 pal. |
| 33 | Luis Jiménez de Asúa | «Pido la palabra.» |

Debajo, el enlace «Leer la sesión corrida completa · 415 intervenciones →».

**Copiar con cita (comprobado).** Al seleccionar el § 1 y pulsar ⌘C, el portapapeles recibe el párrafo seguido de una línea en blanco y «Fuente: Rodrigues-Silveira et al. (2026), Luz y Taquígrafos, doi:10.7910/DVN/THQCMI».

**Salvedades.**
- El texto es OCR sin corregir a mano: «ironias», «simbolo», «caríneo», «Fitche», «Cousideraut»… La página debe decirlo, como ya hace la ayuda («Una advertencia sobre el texto»).
- La ficha dice «Diario de Sesiones · Legislatura», pero **no da el número de Diario ni las páginas**.

### (d) Sesión corrida (tecla `s`)

**Qué hace.** Muestra la sesión entera. La cabecera dice «**SESIÓN CORRIDA ÍNTEGRA · SESIÓN NÚM. 48** / 415 intervenciones íntegras · 43.766 palabras · Discurso activo: #30 de 415 / 1 de octubre de 1931».

Cada intervención lleva su rótulo impreso y su orden («El señor PRESIDENTE (Orden 3)»), «DS · Núm. 48», el botón «Ver solo este» y sus etiquetas («Presidencia · Besteiro»; «Agrarios · Centro-derecha · Burgos»…). La del lector va **enmarcada en oro** con «★ Intervención de referencia». Arriba están «🎯 Ir a la referencia (#30)» y un selector de orden («Orden 30 · CAMPOAMOR»). La sesión empieza por el «Sumario de la sesión (Orden 1)».

**Salvedad (confirmada).** La cabecera **no muestra Diario, páginas, Presidencia, Gobierno ni avisos del acta**. La ayuda dice lo contrario: «La cabecera da el Diario y sus páginas (solo si están verificadas), la Presidencia, el Gobierno y los avisos del acta.» No debe prometerse.

### (e) Careo (tecla `c`)

**Misma sesión (comprobado).** Pone dos pliegos que se desplazan por separado, con ⇄ para intercambiarlos, «Abrir en el lector» y «📖 Sesión corrida» en cada uno, y «Volver al lector». Desde la intervención de Campoamor propone cinco réplicas:

| propuesta | motivos en pantalla |
|---|---|
| KENT · Orden 25 | Alude a CAMPOAMOR · Interrumpido por CAMPOAMOR |
| GUERRA DEL RIO · Orden 32 | Alude a CAMPOAMOR · Turno contiguo (orden 32) |
| CASTROVIDO · Orden 42 | Alude a CAMPOAMOR · Turno cercano (orden 42, 3 turnos en medio) |
| Sumario de la sesión · Orden 1 | Alude a CAMPOAMOR · Turno cercano (orden 1, 3 turnos en medio) |
| Comentarios del Diario · Orden 61 | Alude a CAMPOAMOR |

La nota fija dice: «Heurística: sugiere réplicas por alusión al apellido o al cargo, interrupciones transcritas, cercanía en el orden del debate y distancia política. No prueba que exista un diálogo.»

El pliego de la derecha es Victoria Kent («SESIÓN NÚM. 48 · 1 OCT 1931 · ORDEN 25 · PRRS · Republicanos · Madrid · 1.053 palabras»). En él se ve la interrupción transcrita «(El Sr. Guerra del Río: *Los cavernícolas hablan de pastel.*)».

**Mismo diputado (comprobado).** Cinco intervenciones de Campoamor en otras sesiones:
- 20-12-1932, ses. 281, orden 72: 0,85.
- 23-06-1933, ses. 359, orden 29: 0,66.
- 15-01-1932, ses. 100, orden 49: 0,60.
- 01-12-1931, ses. 83, orden 58: 0,70.
- 01-09-1931, ses. 30, orden 64: 0,85.

Todas llevan «Coincidencia léxica X (relativa) · Entre las 10 más parecidas (puesto n de 53)». La nota: «sin índice semántico se usa la coincidencia léxica (bm25) con los términos más frecuentes del discurso; de las 10 más parecidas se prefieren las más alejadas en el tiempo (relevancia relativa × log(1 + años))».

**Salvedades.**
- **Propone el Sumario y los Comentarios del Diario como «réplicas».** O se elige un ejemplo en que no pase o se dice.
- «Mismo diputado» es léxico. La ayuda promete «parecidas por significado… con el pasaje parecido en verde»; en la web no vi ningún pasaje en verde.

### (f) Tendencia (tecla `t`) con `"casas viejas"`

**Qué hace (comprobado).**
- Sobre la lista abre una serie mensual o anual de hasta 8 términos: la etiqueta «"casas viejas" · 1.193» y «+ término».
- Métrica: /10.000 palabras, Absoluta o % interv.
- Periodos: Todo, Constituyentes, 1933–35 y 1936–45. Suavizado: no, 3 o 5 meses.
- Casillas: «variantes», «aplicar filtros» y «hitos» (esta última marcada).
- Exporta en CSV y SVG.
- Hitos numerados. En «Todo» se ven 19, con «▸ 2 hitos fuera del periodo mostrado», es decir, 21 en total. Del 1 «Apertura de las Constituyentes 14 jul 1931» al 19 «Gobierno Giral ante las Cortes 7 nov 1945»; el 7 es «Casas Viejas 10 ene 1933».
- Recesos rayados, rachas sin sesiones comprimidas con «//», rótulos «guerra» y «exilio».
- Leyenda: «○ fiabilidad baja · ◌ muy baja… · clic en un mes: sus intervenciones».
- Con las flechas se recorren los meses y la ficha se lee en voz (región `aria-live`).

**Cifras en pantalla** (corpus completo, «Corpus completo · 25.903.736 palabras»):

| mes | /10.000 pal. | menciones | intervenciones con la frase | palabras del mes | sesiones |
|---|---|---|---|---|---|
| enero de 1933 | *Sin sesiones* | | | | |
| febrero de 1933 | 8,21 | 492 | 114 | 598.946 | 16 |
| marzo de 1933 | 7,59 | 479 | 126 | 630.838 | 19 |
| julio de 1933 | 0,38 | 23 | 18 | 608.999 | 16 |
| enero de 1934 | 0,83 | 42 | 15 | 504.660 | 17 |

Con «Solo lo que se habla» y «aplicar filtros» («Con los filtros: 108.291 intervenciones · 22.368.538 palabras»):
- febrero de 1933: 8,70 · 476 menciones · **102** interv.
- marzo de 1933: 7,95 · 450 · **108**
- julio de 1933: 0,43 · 21 · **16**
- enero de 1934: 0,95 · 42 · **15**

Las series completas (84 periodos; suman 375 intervenciones y 1.193 menciones, o 316 y 1.109 con el filtro) están en `datos_tendencia_casas_viejas.json`.

**Prefijo.** Aquí el asterisco sí vale. `agrari*` da «Prefijo · 11.880 menciones en 3.651 intervenciones · 12 formas: agraria (10.117), agrario (872), agrarios (596), agrarias (259), agrarismo (26), agrarista (3)…». Las 12 formas ya salen sin la casilla «variantes»; no he averiguado qué cambia esa casilla.

**Distribución.** «Resultados por año · 375 intervenciones», de 1933 a 1936.
- Familias: Republicanos 177 · Sin identificar 59 · Socialista 51 · Conservadores 35 · Liberales 20 · Derecha autoritaria 12 · **Catizq** 7 · Carlistas 5.
- Oradores: Manuel Azaña 37 · Balbontín 26 · Guerra del Río 13 · Eduardo Ortega y Gasset 12 · Royo Villanova 11 · Besteiro 11 · Botella Asensi 10 · Rodrigo Soriano 10 · José Algora 9.

**Salvedades.**
- Por defecto la serie cuenta **todas** las filas (Sumario y Comentarios incluidos). El 102/108 solo sale con los dos filtros. El pie de la figura tiene que decir cuál se enseña.
- «Catizq» es una etiqueta cruda que la interfaz no traduce.
- En enero de 1933, el mes de los sucesos, **no hubo sesiones**. El debate empieza en febrero, y la figura lo enseña bien, con el hito 7 cayendo en la franja rayada.

### (g) Bibliotecas del proyecto y Léxico

**Mis bibliotecas (comprobado).**
- Estado vacío: «Aún no tiene bibliotecas. Cree una y vaya guardando en ella las intervenciones que le interesen.»
- Botones: «+ Nueva biblioteca», «Importar .2replib…», «Añadir bibliotecas del proyecto…» y «⤓ Exportar todas».
- Aviso: «Sus bibliotecas se guardan en este navegador. Expórtelas como .2replib para compartirlas o tener una copia aparte.»

**Diálogo «Bibliotecas del proyecto».** «Preparadas con el corpus 2REP_Diaries_v3. Se añaden a sus bibliotecas con sus notas y etiquetas; después puede cambiarlas o borrarlas como cualquier otra.» Contiene **31 bibliotecas con 24.029 entradas** (suma comprobada):
- Discursos (1): «Discursos principales (1931-1945)», 29.
- Debates (26): La Cámara se constituye (1931) 676 · La Constitución de 1931 332 · **Sufragio femenino 770** · Cuestión religiosa (art. 26) 486 · Ley de Defensa de la República 387 · Responsabilidades de Alfonso XIII 646 · El primer presidente de la República 126 · Estatuto de Cataluña 307 · Reforma agraria y Sanjurjada 4.497 · **Casas Viejas 943** · Azaña y Lerroux: la ruptura 383 · Ley Electoral de 1933 482 · El final de las Constituyentes 152 · Las Cortes de 1933 se estrenan 273 · Amnistía de 1934 1.085 · Contratos de cultivo y retirada de ERC y PNV 238 · Las Cortes ante la revolución de octubre 290 · Reforma del Reglamento (1934) 873 · Acusación contra Azaña y Casares 602 · Estraperlo y Nombela 705 · Las Cortes de 1936 se constituyen 30 · Comisión de Actas (Cuenca y Granada) 371 · Destitución de Alcalá-Zamora 139 · Orden público en la primavera de 1936 604 · Las Cortes en guerra 280 · Las Cortes en el exilio 211.
- Sesiones (3): decisivas 309 · que estudia la literatura 2.164 · más crispadas 5.585.
- Anécdotas y amenazas (1): 54.

Después de «Añadir 1», la biblioteca aparece como «Debate · Sufragio femenino · 770 intervenciones · 2026-09-22». Tiene las pestañas Intervenciones (770) · Léxico · Coocurrencias · Menciones, y los botones «Exportar biblioteca» y «🗑 Borrar biblioteca». Cada entrada lleva la etiqueta «B2», con «Añadir nota» y «Quitar».

**Léxico (comprobado).**
- Cifras: PALABRAS 69.640 «analizadas de 71.705» · TÉRMINOS DISTINTOS 7.565 · TTR 0,109 «depende del tamaño» · G² MÁXIMO +810,9 «mujer».
- Texto: «Solo discurso: se analizan 69.640 de las 71.705 palabras de 770 intervenciones; se excluyen 2.065 (crónica del acta 37, acotaciones 1.988, notas 40)… frente al resto del corpus (25,8 millones de palabras…)… 373 significativos de 1.424 candidatos.»
- Columnas: término · frec. · ‰ biblioteca · ‰ resto corpus · keyness G² · log-ratio · distintividad.
- Primeras filas: mujer 147 (+810,9; +5,47; Muy distintivo) · **pena de muerte** 88 (+640,1; +6,88; Exclusivo) · muerte · voto · mujeres · pena · veintitrés · veintiún años · veintiún · derecho · mandamiento · edad · palabra · enmienda · **huelga** · votar · **sabotaje**…
- Más abajo: «voto a la mujer» 17 (+145,7), «voto de la mujer» 13, «voto femenino» 8 y «mujer española» 7.
- Al final: «Términos infrausados (31)».

**Salvedades.**
- La nota de la biblioteca remite a un documento interno que el público no tiene: «Sufragio femenino (1931-09-30 – 10-01): las intervenciones de sus sesiones clave. Ficha B2 en docs/discursos_y_debates_2REP.md, parte 3.» Lo mismo pasa en las demás.
- La biblioteca es **la sesión entera**: incluye trámites de Besteiro («Tiene S. S. la palabra.»), la abolición de la pena de muerte y la huelga de Telefónica. Por eso el Léxico no es «el vocabulario del sufragio femenino», sino el de esas dos sesiones.
- Besteiro, como Presidente, sale con la familia «Socialista» en la lista de la biblioteca y como «Presidencia · Besteiro» en la sesión corrida.

### (h) Coocurrencias y temas

**Qué hace (comprobado).**
- Controles: unidad «Intervención» o «Fragmentos de 20 palabras»; Términos 100, 250 o 500; Vecinos 5, 10 o 20; Temas menos, normal o más.
- Cifras: TEMAS **9** «comunidades de Leiden» · TÉRMINOS 250 «de 342 del léxico» · CONEXIONES 1.209 «de 1.573 significativas» · MODULARIDAD **0,7758** · SIN TEMA 7,6 % del texto.
- «Leer primero»: variada por tema o más informativas; muestra 10 de 100.
- «Temas», ordenados por «más característico»: cada tarjeta trae términos, intervenciones, porcentaje del texto y G² medio, más un eje de partidos «en veces la media». Acciones: «Revisar en la lista», «Marcar el tema», «Buscar en todo el corpus…».
- «Método y parámetros» desplegable: Snowball con 308 palabras vacías, G² con signo sobre tablas 2×2, 10 vecinos, peso observado/esperado (van Eck y Waltman, 2009), Leiden (Traag, Waltman y van Eck, 2019), resolución 1, semilla 1, «Mismos parámetros, mismo resultado».
- Exporta temas (CSV), red (GEXF), jerarquía de lectura (CSV) y partidos por tema (CSV).

**Los 9 temas en pantalla:**

| # | rótulo | términos | intervenciones | % del texto | G² medio |
|---|---|---|---|---|---|
| 1 | mujer española · mujer · femenina | 53 | 276 (35,8 %) | 27 % | 89 |
| 2 | abolicionista · penal · abolición | 42 | 128 (16,6 %) | 17,1 % | 82 |
| 3 | admitidos · compañía · huelga | 21 | 43 (5,6 %) | 12,4 % | 66 |
| 4 | evidencia · ordenen · ilegalidad | 25 | 116 (15,1 %) | 7,6 % | 54 |
| 5 | asociación · asociaciones · margen | 34 | 253 (32,9 %) | 16,9 % | 48 |
| 6 | recoger unas palabras · señor ministro de comunicaciones · terminase | 14 | 51 (6,6 %) | 0,7 % | 41 |
| 7 | provincia de jaén · jaén · baeza | 6 | 28 (3,6 %) | 5 % | 36 |
| 8 | coadyuvarán · señores ministros · sustentarse | 15 | 18 (2,3 %) | 1,1 % | 32 |
| 9 | obras del puerto · puerto de alicante · alicante | 9 | 11 (1,4 %) | 4,6 % | 30 |

Eje de partidos del tema 1: ASR 0,4× · PRDF 0,6× · ERC 0,6× · DLR 0,7× · AR 0,8× · PRRS 0,9× · PSOE 1,0× · Indep. 1,1× · **PRR 1,8×**.

**Tema en el lector (comprobado).** Al abrir una intervención desde Coocurrencias aparece «Tema: no · Sí · Fondo · Subrayado». Con «Sí», cada término se tiñe del color de su tema (`h_lector_tema_si_1440.png`, Guerra del Río, 30-09-1931).

**Salvedades.**
- **La red de términos no se dibuja** (no hay ningún SVG en la pestaña): se calcula y se exporta, igual que en ParlaIbero.
- La ayuda (?) no documenta esta pestaña.
- Los temas 3, 4, 6, 7, 8 y 9 no tratan del sufragio. Es la consecuencia de que la biblioteca sea la sesión entera, y hay que decirlo en el pie.

### (i) Menciones

**Qué hace (comprobado).**
- Opciones: Mostrar Todas, Miembros o Externas; Focos menos, normal o más.
- Cifras: CON MENCIONES **110** «14 % de 770» · PERSONAS MENCIONADAS **58** «12 externas a la Cámara» · MENCIONES **223** «de 44 oradores» · FOCOS **8** «modularidad 0,552».
- Red radial agrupada por partido o por foco. Se puede filtrar por menciones Todas, Hechas o Recibidas, usar Modo ego y fijar un mínimo de menciones.
- Tablas: «Más mencionados», «Quién menciona», «Diálogos», co-menciones, «Entre partidos» (matriz por 10.000 palabras), «Personas externas según el partido de quien habla» y «Focos de conversación».
- Exporta Menciones (CSV) y Red (GEXF).

**Datos en pantalla:**
- Más mencionados: Barriobero (PRDF) 9 oradores / 14 menciones · Campoamor (PRR) 8 / 12 · Jiménez de Asúa (PSOE) 7 / 26 · Guerra del Río 6 / 10 · Gomariz 6 / 9…
- Diálogo más cruzado: Gomariz (PRRS) ⇄ Jiménez de Asúa (PSOE), 14 · 1.
- Quién menciona más: Castrillo (DLR), 12 personas y 34 menciones.
- Matriz, fila PRRS: 6,0 al propio partido, 10 a DLR, 15 al PSOE, 7,7 al PRR…
- «Método y límites»:
  - «Menciones a miembros identificadas: 200 de 207 (97 %)…»
  - «Se excluyen los turnos de la Mesa (202 menciones)… las acotaciones entre paréntesis (116)».
  - «**Cargos citados sin nombre, aún sin atribuir: sr ministro 100, senor ministro 11, sr 5, sr presidente 5, senor presidente 2, senor 1. Harían falta tablas de quién ocupaba cada cargo en cada fecha.**»
  - «Los jefes de Estado y de Gobierno salen del registro de hitos».
  - «Precisión: revisada a mano en muestras de los dieciséis parlamentos, alrededor de nueve de cada diez… El recuerdo no está medido».

**Errores visibles en este ejemplo:**
- La tabla de externas trae como columnas OSSORIO Y GALLARDO · MARTÍNEZ BARRIOS · RUIZ DE VILLA · GALARZ · A. AZAÑA · CASTRIILLO.
- Con el buscador de la faceta Diputado comprobé que los seis son diputados del corpus: Angel Osorio Gallardo (Indep., 458 intervenciones), Diego Martinez Barrio (UR, 1.993), Manuel Ruiz De Villa (PRRS, 6), Angel Galarza Gago (PRRS, 318), Manuel Azaña Diaz (AR, 439) y Juan Castrillo Santos (DLR, 838).
- En los focos salen además «Dipu‑tado», «Sanipcr» y «Estébanez» como personas externas. «A. Azaña» y «Manuel Azaña Diaz» figuran como dos personas, igual que «Martínez Barrios» y «Diego Martinez Barrio».
- **Las «12 externas» están infladas.** La precisión del 90 % se midió en otros parlamentos, no en este corpus, y aquí no se sostiene para las externas.
- El texto explicativo usa ejemplos genéricos que vienen de ParlaIbero («Presidenta Gómez», «senador Díaz»), anacrónicos para 1931.
- De paso: la etiqueta de partido de Martínez Barrio es «AR» en sus intervenciones de 1931 y «UR» en las de 1945. Por lo que sé de la historia, en 1931 era del PRR, pero **no lo he verificado contra la fuente**. Si se usa Menciones o Partido en la página, conviene revisarlo.

### (j) Exportar

**Qué hace (comprobado).** El diálogo dice «Resultados de la búsqueda actual · 40 intervenciones en el orden de la lista.»

| formato | tamaño estimado para los 40 resultados |
|---|---|
| CSV (para Excel, Numbers, Stata o R) | ≈ 365 KB |
| Markdown (documento legible con el texto completo) | ≈ 366 KB |
| JSON (para procesar con código) | ≈ 388 KB |
| Referencias (una línea citable por intervención) | ≈ 12 KB, «este formato no lleva el texto» |
| .2replib (compartir la biblioteca) | desactivado para una búsqueda; solo vale para bibliotecas |

- La casilla «Incluir el texto completo de cada intervención» aparece marcada al abrir el diálogo.
- Nota del CSV: «Separador «;» y codificación UTF-8 con BOM… Las 4 primeras líneas (empiezan por #) son la cita; en R, read.csv2(skip = 4); en pandas, comment="#" o skiprows=4.»
- Recuadro: «El archivo incluye la cita de la fuente (Rodrigues-Silveira et al. (2026)…) en las 4 líneas # del principio (cita completa, DOI, licencia y publicación relacionada) y en las columnas fuente_cita y fuente_doi de cada fila.»
- Con `divorcio` (531): ≈ 4,1 MB con texto y ≈ 138 KB sin él.

**Salvedad.** No he descargado ningún archivo; los tamaños son la estimación del diálogo.

### (k) «Sobre este corpus»

Se abre desde el grupo del panel lateral o pulsando el título ▾ de la cabecera. En pantalla:
- «Cómo citar este material», con la cita completa que termina en «**Harvard Dataverse, V2**», el DOI, «Licencia de los datos CC BY 4.0», la publicación relacionada (Afinidades Elegidas, doi:10.7910/DVN/CGOCUS) y los botones Copiar cita · BibTeX · RIS · DOI.
- «121.700 intervenciones · 755 sesiones».
- «Este archivo»: «Matriz resegmentada: cada orador en su fila, el material que no es habla en filas COMENTARIOS y el sumario de cada sesión en una fila SUMARIO con orden 0. Ver tools/RESEGMENTACION.md.» Archivo `2REP_Diaries_v3.csv · 173,9 MB`; Versión «v3, matriz resegmentada (local, sin publicar)»; Huella `e1906abc601795860a2da5835571dc0f10b58e3679aa6867a27d68af843eb5f9`; 121.700 intervenciones; Construido «0,7 s en este navegador (SQLite 3.53.4)».
- «En este navegador»: en la primera visita, «Esta base no está recordada…», el botón «Recordar la base en este navegador (≈260 MB)», la casilla marcada y el error en rojo. Tras recordarla: «Esta base está recordada en este navegador («2REP_Diaries_v3.csv» (v3) · 269 MiB)», con «Reemplazar por otra versión…» y «Olvidar la base».
- Al pie: «Las etiquetas de familia política se normalizaron… El detalle está en tools/normalization.json.»

**Salvedades.**
1. La cita dice V2 y el archivo es la v3.
2. Remite a `tools/RESEGMENTACION.md` y `tools/normalization.json`, que el usuario no puede abrir.
3. Con la base recordada, el panel sigue diciendo «Espacio que ocupa en este navegador: 3 MiB» mientras la frase de arriba habla de 269 MiB.

### Otras cosas comprobadas

- **Ajustes:** Estilo Editorial (por defecto), Iluminado o Clásico; Tema Claro (por defecto) u Oscuro; «Se recuerdan en este navegador». **El tema no sigue la preferencia del sistema**: con `prefers-color-scheme: dark` el explorador arranca en claro.
- **Atajos probados:** `s`, `c`, `t`, `f` (plegar filtros) y `l` (plegar la lista). `Esc` cierra el lector. El plegado se recuerda (`localStorage.panelPlegado` y `listaPlegada`).
- **Ayuda (?):** tiene las secciones Cómo citar · Cómo buscar · Bibliotecas · «Guardar todo» y Exportar · Tendencia y clima de sala · El lector · Sesión corrida y careo · Léxico de una biblioteca · Atajos · Una advertencia sobre el texto. **No trata Coocurrencias ni Menciones.**
- **Móvil:** sin emulación, a 390 px el documento mide 522 px de ancho, y 776 px con el lector abierto. El elemento `#r2-navegador-no-apto` existe, pero no se mostró.

---

## 5. Contraste con la sección «explorador» de `investigacion.json`

✓ confirmado en pantalla · ✗ contradice lo observado · ≈ cierto con una condición que el texto no dice · ○ no comprobado hoy

| función en `investigacion.json` | veredicto | detalle |
|---|---|---|
| Carga, privacidad y uso sin conexión | ✗ / ≈ | Descarga 110.785.413 bytes (≈111 MB) ✓. La frase «guarda la base en el navegador» **no se cumplió sola**: la casilla viene marcada, pero el guardado automático falló («No se pudo recordar la base: La base guardada no coincide con la construida y se ha borrado») y la UI advirtió «si cierra o recarga la pestaña, el corpus se descargará de nuevo». A mano funcionó (269 MiB) y la carga siguiente no descargó nada. Puede ser cosa del modo headless; hay que probarlo en un navegador normal. «Construido 1,5 s» frente a 0,7 s hoy: depende del equipo, no publicar. Navegadores mínimos y 600 MB de memoria: ○. |
| Búsqueda por palabras y frases | ✗ en un punto | `"España ha dejado de ser católica"` = 6 ✓ y los seis oradores ✓. **Pero el primero por relevancia es Royo Villanova, 18-03-1932 (id 24106, 604 pal.)**. Azaña (id 7531, 13-10-1931, 6.009 pal.) sale **cuarto**. Orden completo: Royo Villanova 18-03-1932 · Aizpún 26-04-1933 · Balbontín 01-12-1931 · Azaña 13-10-1931 · Royo Villanova 05-05-1933 · Royo Villanova 20-11-1934. `"voto femenino"` = 20 en 11 fechas, del 29-09-1931 al 02-06-1933 ✓. |
| Operadores + \| ( ) | ≈ | 2.125 / 1.710 / 2.028 ✓; el mensaje de `agrar*` ✓. «La consulta… añade las 28 de la segunda expresión» induce a error: la unión da **40** (20 + 28 − 8 que tienen las dos). «6 de ellas de Campoamor» ✓, 6 de las 40. «1.140 en las Constituyentes»: ○. |
| Filtros | ✓ | 531 / 454 / 421 ✓. «411 de las 454 son de 1931-1933»: ○. |
| Ordenación y navegación sin texto | ○ | No recorrí la legislatura 1936-1939. |
| Espectro ideológico | ✓ | 26 % / 24 % / 11 % ✓, con recuentos exactos (§4a). Que el 11 % sea casi todo Sumario y Comentarios es coherente: 13.409 filas sin habla frente a 13.737 sin identificar. |
| Clima de sala | ✓ | 6079: 8 unidades, 4 de aplauso, 2 de rumores y 2 neutras (gesto y risas) ✓. En la lista solo se ven dos insignias, «Aplausos ×4» y «Rumores ×2»; el rótulo «Gestos» no aparece en ningún sitio. «19.771 filas (16,25 %)»: ○. |
| Tendencia | ≈ | 102 y 108, 16 y 15 ✓ **solo con «Solo lo que se habla» y «aplicar filtros»**. Por defecto se ven 114, 126, 18 y 15. 21 hitos ✓ (19 + 2 fuera del periodo). `agrari*` da 12 formas sin la casilla «variantes». |
| Lector | ✓ | Todo lo citado ✓. |
| Sesión corrida | ✓ | 415 filas ✓; banner ✓; sin Diario, páginas, Presidencia ni Gobierno ✓; Besteiro «Ruego a la Cámara que guarde silencio.» en el orden 29 ✓ (id 6078 no comprobado directamente). «En V2 eran 395»: ○. |
| Careo: misma sesión | ≈ | Los pesos no se ven en la UI (○). El ejemplo de Royo Villanova no lo reproduje. **Falta decir que propone el Sumario y los Comentarios del Diario como réplicas.** |
| Careo: mismo diputado | ✓ | Léxico, bm25, lo dice la propia UI ✓. El ejemplo de Azaña (id 29042) no lo reproduje. |
| Bibliotecas propias | ○ | No probé «Guardar todo», notas, etiquetas ni la exportación .2replib. Sí vi los botones y el aviso de que viven en el navegador. |
| Bibliotecas del proyecto | ✓ | 31, 24.029, grupos 1 / 26 / 3 / 1, 770 y 5.585 ✓; «Discursos principales» con 29 entradas y la nota «Los 17 discursos principales» ✓. Añadir: las notas remiten a `docs/discursos_y_debates_2REP.md`, que no es público. |
| Léxico | ✓ | 69.640 de 71.705, 373 de 1.424 y «voto a la mujer» ✓. |
| Coocurrencias y temas | ✓ | 9 temas y 0,7758 ✓; «Tema: Sí» ✓; la ayuda no la documenta ✓. |
| Menciones | ✗ | «Atribuye los cargos sin nombre («el Presidente del Consejo») a quien los ocupaba en la fecha de la sesión» **no es lo que dice la herramienta**: «Cargos citados sin nombre, aún sin atribuir… Harían falta tablas de quién ocupaba cada cargo en cada fecha». Solo los jefes de Estado y de Gobierno salen del registro de hitos. La precisión del 90 %, medida en otros parlamentos, ✓ como declaración. Hay errores visibles en externas y focos (§4i). |
| Exportación | ✓ | Cinco formatos, `divorcio` ≈ 4,1 MB y `fuente_cita`/`fuente_doi` ✓ (el archivo no lo descargué). |
| Citación y «Sobre este corpus» | ≈ | Todo lo citado ✓. El copiado añade «Fuente: Rodrigues-Silveira et al. (2026)…», con «Fuente:» delante. Hay que añadir que la cita dice **V2** con datos v3. |
| Ajustes y atajos | ✓ | Añadir: el tema por defecto es claro y no sigue al sistema. |

**Incoherencias dentro del propio explorador, útiles para el autor aunque no sean de la página:**
1. La ayuda promete la cabecera de sesión con Diario y páginas, y no está.
2. La ayuda dice «por significado… pasaje en verde» para Mismo diputado, y es léxico.
3. «24 millones de palabras» en la ayuda, frente a 25.903.736 y 25,8 millones en Tendencia y Léxico.
4. La cita dice V2 y los datos son v3.
5. «Espacio que ocupa: 3 MiB» con una base recordada de 269 MiB.
6. Rutas internas a la vista del usuario (`tools/…`, `docs/…`).
7. Ejemplos de ParlaIbero («Presidenta Gómez») en la explicación de Menciones.
8. La etiqueta «Catizq» sin traducir.

---

## 6. Propuesta para la página «Explorador» de LyT

Sigue el esqueleto de §8 de ParlaIbero, con **una sección nueva de lectura** (el lector del Diario es lo que distingue a LyT) y un «Cómo empezar» distinto. Las capturas irían en `src/assets/explorador/` con un `LEEME.md` como el de ParlaIbero; la §1 de este informe sirve de base.

| sección | contenido (comprobado) | capturas | pie propuesto |
|---|---|---|---|
| **8.1 Cabecera** | «Busque, lea y cite lo que se dijo en las Cortes de la República.» El explorador se abre en su navegador con los Diarios ya cargados: **121.700 intervenciones, 1931–1945**. Sin cuenta ni instalación; lo que busca y guarda se queda en su equipo. Nota fija: *sirve la v3, resegmentada y aún sin depositar; la versión depositada en Dataverse es la V2, con 107.551 filas*. Botón «Abrir el explorador ↗». | `a_inicial_1440` (opcional) | «El explorador al abrirse: el corpus entero, repartido por ideología.» |
| **8.2 Primero, encontrar** | Cuatro preguntas. **¿Qué se dijo?** Palabras, frases exactas, + y \|, sin tildes ni mayúsculas. **¿Quién, cuándo, de qué grupo?** Fecha, sesión, legislatura, familia, ideología, partido, diputado, distrito y longitud; «Solo lo que se habla» quita el Sumario y los Comentarios del Diario. *No hay filtro por sexo.* **¿En qué momento del debate?** Enlaza con 8.3. **¿Cuándo se habló de esto?** Serie mensual con 21 hitos numerados. | `b_busqueda_voto_1440` y `f_tendencia_casas_viejas_panel` (o `…constituyentes_tip`) | «"voto femenino" \| "voto de la mujer": 40 intervenciones, del 1 de septiembre de 1931 al 15 de diciembre de 1933.» · «"casas viejas" mes a mes: nada en enero de 1933, porque no hubo sesiones; 114 intervenciones en febrero y 126 en marzo, contando todas las filas.» |
| **8.3 Leer como en el Diario** (nueva) | Pliego del Diario con § para citar, «Consta en el diario como:», acotaciones coloreadas por clase y el hilo de la sesión. Sesión corrida con la intervención enmarcada. Careo en dos pliegos, **como heurística**. | `c_lector_campoamor_ancho`, `c_lector_campoamor_rumores`, `d_sesion_corrida_1440`, `e_careo_ancho` | «Clara Campoamor, 1 de octubre de 1931: los aplausos en verde y los rumores en teja, como los anotó el Diario.» · «La sesión 48 entera: 415 intervenciones y 43.766 palabras.» · «Campoamor frente a Victoria Kent: una réplica propuesta, no un diálogo probado.» |
| **8.4 Después, enfocar: las bibliotecas** | Qué es una biblioteca y dónde vive. **31 bibliotecas preparadas por el proyecto** (26 debates, 3 de sesiones, discursos, anécdotas; 24.029 entradas). Léxico: G² de Dunning y log-ratio. | `g_dialogo_bibliotecas_proyecto_marcada`, `g_lexico_sufragio_sinpanel` | «Las bibliotecas del proyecto: cada debate, con sus sesiones clave.» · «El vocabulario que distingue las sesiones del sufragio femenino (30 de septiembre y 1 de octubre de 1931) del resto del corpus. Son las sesiones enteras: también se discutieron la pena de muerte y la huelga de Telefónica.» |
| **8.5 Coocurrencias** | Qué palabras aparecen juntas y cómo se agrupan en temas candidatos. Un eje de partidos por tema. Método a la vista y reproducible. La red se exporta, no se dibuja. «Tema: Sí» en el lector. | `h_coocurrencias_tema1_sufragio` (ancha), `h_coocurrencias_sufragio_1440` (resumen), `h_lector_tema_si` | «Un tema candidato de esas sesiones y los partidos según cuánto usan su vocabulario: el PRR, 1,8 veces la media.» |
| **8.6 Menciones** | Quién nombra a quién, en red y en tabla entre partidos. **Límites en bloque con filete:** no mide el tono; los focos no son coaliciones; la precisión (~90 %) se midió en otros parlamentos; los cargos sin nombre no se atribuyen; los nombres con errores de OCR pueden contarse como «externas». | `i_menciones_red_sufragio`, `i_menciones_matriz_sufragio` | «Quién nombra a quién en el debate del sufragio, por partido.» · «Menciones entre partidos, por cada diez mil palabras.» |
| **8.7 Y llevárselo, citado** | CSV (con «;» y BOM), Markdown, JSON, Referencias y .2replib. Todo lleva la cita y el DOI, y el copiado con el teclado añade «Fuente: …». **Aviso:** la cita dice V2, pero los ids son de la v3. | `j_exportar_dialogo_1440`, `k_sobre_corpus_panel_recordada` | «Cada descarga lleva la cita en sus cuatro primeras líneas y en cada fila.» |
| **8.8 Cómo empezar** | 1) Abra el explorador. 2) La primera vez descarga unos 111 MB comprimidos y prepara la base. 3) Si marca «Recordar la base» (unos 260 MB), la próxima vez se abre sin descargar nada. **Sin formulario de Dataverse.** | — | — |
| **8.9 Lo que pide, y lo que no hace** | Pide un ordenador, no un teléfono. No busca por significado; en el buscador no admite asterisco, NOT ni proximidad (el prefijo* solo vale en Tendencia). «Mismo diputado» compara palabras, no significados. La sesión corrida no da hoy el número de Diario ni las páginas. El texto es OCR y trae errores. Los nombres van sin tildes. Ante cualquier duda, vale el Diario impreso. | — | — |

**Figuras interactivas posibles**, para responder a «no hay gráficos interactivos». Todas son réplicas de lo que el explorador enseña, con los datos leídos de su interfaz, y así debe decirlo el pie.
1. **Tendencia de «casas viejas»**, con un conmutador entre «todas las filas» y «solo lo que se habla» y los hitos 7 y 8 marcados. Los datos están en `datos_tendencia_casas_viejas.json`: 84 periodos, con cada mes o «Sin sesiones», y su procedencia.
2. **Eje de partidos del tema 1**, nueve puntos de ASR 0,4× a PRR 1,8×. Pocos datos y fáciles de comprobar.
3. **Matriz entre partidos de Menciones**, 8×8. Solo con el aviso de límites; yo no la haría interactiva mientras existan los errores de identificación.

---

## 7. Decisiones pendientes del autor

1. **Regla de nombres.** ParlaIbero no enseña texto junto al nombre de quien lo dijo. En LyT, las capturas del lector, la sesión corrida y el careo lo hacen, y son figuras históricas de 1931. ¿Se mantiene la regla o se acepta?
2. **¿Se enseña Menciones?** Con los errores de la biblioteca de ejemplo, propongo publicar solo la red y la matriz (sin la tabla de externas ni los focos) y un límite explícito. La otra salida es esperar a que se corrija la identificación.
3. **La cita V2 frente a los datos v3.** ¿Se corrige primero en el explorador, o la página lo avisa?
4. **¿Qué tema para las capturas?** Las de ParlaIbero son claras sobre placa clara. Aquí hay claras (limpias, sin ◆) y oscuras (con ◆). Si se quiere el oscuro limpio, hay que repetirlas con un perfil nuevo antes de añadir la biblioteca: el guion `s29.py`, lanzado antes de `s10.py`.
5. **Recordar la base.** Comprobar en Chrome o Safari normales si el guardado automático falla como aquí, antes de escribir «funciona sin conexión».
6. **Documentos internos citados en la interfaz** (`docs/discursos_y_debates_2REP.md`, `tools/RESEGMENTACION.md`, `tools/normalization.json`). O se publican, o se quitan de las notas.
