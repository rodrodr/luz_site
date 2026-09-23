# Plan · Sitio de presentación de Luz y Taquígrafos (multipágina, español e inglés)

> **Estado (22-09-2026).** Plan para la **Puerta 1**. No está aprobado. Etapa 0 hecha: el repositorio `luz_site/` solo
> tiene `docs/`.
> **Nada se construye antes de la Puerta 1.** La narrativa (`01_NARRATIVA_sitio.md`) se aprueba junto con este plan. Si
> la narrativa aprobada corrige algo de aquí, **prevalece la narrativa**, y esta cabecera lo dirá.
>
> **Cómo se hizo.** Siete estudios previos (`docs/estudio/`). De ellos manda `estudio_critica.md` cuando chocan. Sobre
> esa base se escribieron tres propuestas completas, cada una desde un ángulo: «historia», «datos» e «interactivo».
> Tres jueces las puntuaron y recalcularon sus cifras sobre la fuente. Las medias fueron 7,7, 7,0 y 6,8. Este plan
> toma **el esqueleto de «historia»**, que puntuó mejor. Le injerta lo que los jueces mandaron conservar de las otras
> dos:
> - de «datos», **la profundidad de uso**;
> - de «interactivo», **el sistema de figuras**.
>
> También corrige las cifras que los jueces encontraron mal (tabla de discrepancias, filas 20 a 30). Además hice hoy
> once comprobaciones propias sobre la V2 y la v3; están en el anexo y en
> `docs/estudio/sintesis/comprobaciones_sintesis.py`.
>
> **Pendiente para la Puerta 1:** las decisiones D-1, D-3, D-4, D-5 y D-6, más las de este plan que bloquean la
> narrativa (D-8, D-9, D-12 y D-22). Van en «Decisiones abiertas», cada una con la opción recomendada primero.
>
> **Revisión adversarial (22-09-2026) aplicada.** Tres lentes (hechos, reglas, viabilidad) dieron 81 hallazgos. Cada
> uno se comprobó en la fuente antes de tocar nada. La lista de aplicados y rechazados, con el motivo, está en el anexo
> final. Añade tres decisiones (D-22 pasa a bloquear la Puerta 1; D-26 y D-27 son nuevas) y reestima la 0.1.

**Marcas de base**, en todo el documento:

| marca | qué es |
|---|---|
| **V2** | El CSV depositado: THQCMI V2.0 (15-09-2026), 107.551 filas, MD5 `360332a0…`. |
| **v3** | La base que sirve el explorador: 121.700 filas, **sin depositar**, ids renumerados, sha256 `3a0d8b2d…`. |
| **proyecto** | Metadatos de sesión del proyecto (Diario, páginas, presidente titular, Gobierno): `2REP_Explorer/standalone/data/sessions.json`, sha256 `b3295e99…`. No están depositados y el explorador no los muestra. |
| **CGOCUS V1.1** | Afinidades Elegidas tal como está depositada (doi:10.7910/DVN/CGOCUS). |
| **[EXT]** | Hecho externo al corpus. Solo se publica con referencia académica [A] o institucional [I]. |

---

## Contexto

Luz y Taquígrafos (LyT) está publicado en tres sitios:

- **La base**: doi:10.7910/DVN/THQCMI, en su versión V2.0. Es un CSV de 158,1 MB con 107.551 filas y 14 columnas: los
  Diarios de Sesiones del Congreso entre 1931 y 1945, en 755 sesiones.
- **El explorador**: `rodrodr.github.io/luz_explorer/`. Sirve otra edición, la v3 resegmentada, con 121.700 filas y
  sin depositar.
- **Una base derivada**: Afinidades Elegidas, doi:10.7910/DVN/CGOCUS, en su versión V1.1, con su aplicación en
  `rodrodr.github.io/afinidades/`.

Falta la puerta de entrada. El primer intento fue una landing de una sola página (`aecpa2026/out/landing.html`: 4.713
palabras, 15.646 px de alto a 1.440, 4 SVG estáticos y un solo control). El investigador la rechazó el 22-09-2026:

> «¿Por qué estás reduciendo el landing a una sola página? Esto restringe mucho las posibilidades y genera una
> interfaz demasiado cluttered. Se hizo algo mucho mejor en la landing page de ParlaIbero. La actual aún es muy
> pobre. No hay gráficos interactivos, la organización hace con que todo tenga que caber en una sola página y resume
> demasiado cosas que no debería resumir.»

El modelo es el sitio de ParlaIbero (`/Users/rodrodr/Dropbox/Apps/parlaibero_site`). Tiene siete plantillas y 68
páginas. Inicio es solo la puerta, de 700 palabras como mucho, y lo demás vive en páginas de profundidad. Las figuras
son interactivas y funcionan sin JavaScript. Ninguna cifra se teclea. El proceso va por puertas.

**Tres hallazgos de los estudios gobiernan este plan:**

1. **Hay dos ediciones del corpus, y el lector puede toparse con las dos.** La que descarga es la V2. La que ve en el
   explorador es la v3. Comparten las 755 claves de sesión (fecha y número), pero no los ids de fila. Toda cifra lleva
   su base.
2. **El explorador no tiene enlaces profundos.** Una URL no abre una búsqueda, una intervención ni una sesión: se
   comprobó sobre lo publicado (`estudio_critica.md` §3.2). El «Pruébelo» de ParlaIbero se convierte aquí en
   [Copiar la consulta] · [Abrir el explorador ↗].
3. **El contexto histórico está en el propio corpus**, con más detalle del que usaba la landing:
   - votaciones nominales con sus listas de nombres;
   - las palabras que la Presidencia mandó borrar del Diario;
   - la fórmula «luz y taquígrafos», usada diez veces por los diputados;
   - las sesiones de la guerra y de México.

   Eso permite contar la historia **etapa por etapa sobre filas verificadas**, en lugar de resumirla en tres párrafos.

---

## Decisiones del investigador

| decisión | elegido | fecha |
|---|---|---|
| Lenguas | **Español e inglés.** El español se congela antes de traducir | 22-09-2026 |
| Repositorio | **Propio**, en `/Users/rodrodr/Dropbox/Apps/luz_site`, hermano de `parlaibero_site` | 22-09-2026 |
| Financiación | **Sin mención de financiación** en ninguna página | 22-09-2026 |
| Nombres (D-2) | **Se nombra a los diputados**: son figuras históricas, y el lector del Diario es la función estrella del explorador | 22-09-2026 |
| Pila (D-7) | **Astro estático, sin framework de cliente**, sobre el esqueleto de ParlaIbero | 22-09-2026 |
| Portada | **El hemiciclo del Congreso con las minorías de 1936 según Gil Robles** (`aecpa2026/landing/hero_svg.py`), que considera «perfecto». Se conserva sin cambios en el dibujo como portada de Inicio. Añadirle un resalte por bloque es una propuesta aparte (D-27) | 22-09-2026 |
| Prototipo de 1931 | **Fuera, entero**: grafo anotado, libro de códigos, posturas, actos afectivos, ironía, intensidad, 90 sesiones, 3.874 nodos | 22-09-2026 |

Hereda de ParlaIbero **las reglas del proceso**:
- narrativa antes que copy, y copy antes que píxel;
- las cifras salen de ficheros vigentes en la compilación, nunca se teclean;
- el exportador proyecta, no mide.

---

## Decisiones abiertas

Cada decisión llega como opciones, con **la recomendada primero** y su contra.

### Bloquean la Puerta 1

| # | decisión | opciones | qué cambia en el diseño |
|---|---|---|---|
| **D-1** | **Base de las figuras** | **(a) V2 por defecto; la v3 solo donde la V2 distorsiona o donde el objeto solo existe en la v3.** Van en la v3:<br>- quién tomó la palabra por etapa (F05);<br>- el efecto Presidencia, con las dos bases lado a lado (F07);<br>- el despiece de filas (F12) y el destino de las filas (F18);<br>- las bibliotecas (F17) y las búsquedas de muestra (F29);<br>- Palabras, en la edición 0.2.<br>F27 y F28 citan doble id porque son las mismas filas en las dos.<br>*Contra:* dos bases a la vista.<br>**(b) Todo en la v3.** *Contra:* no es lo que descarga el lector y no está depositada.<br>**(c) Todo en la V2.** *Contra:*<br>- Prieto sale inflado por los documentos complementarios impresos dentro de su fila (V2 55221);<br>- Azaña pierde su discurso del Estatuto, que la V2 pone a nombre del Presidente de la Cámara;<br>- los discursos de Negrín del 1-X-1937 y del 1-II-1938 van dentro de filas de la Presidencia (V2 107148 y 107232); la v3 los separa (121219 y 121328). | Con (a):<br>- `base` obligatoria en cada cifra;<br>- `<NotaBases>` en toda página con una cifra v3 **dentro de `<main>`**; la línea de ediciones del pie cumple esa función con `data-nota-bases`;<br>- la auditoría falla si una cifra v3 de `<main>` va sin nota;<br>- la página Versiones lista qué base usa cada figura. |
| **D-3** | **Afinidades: V1.1 depositada o v2 corregida** | **(a) Depositar CGOCUS V2.0 antes de la Puerta 4 y exportar sobre ella.** Hay que resolver los 59 casos de `revisar_manual.csv` y los 11 «revisar» del registro de correcciones. *Contra:* es trabajo suyo, y la v2 declara una salvedad nueva: el 13 % de sus filas de aristas sale de listas de firmas truncadas en el Diario.<br>**(b) Publicar sobre V1.1 con el sello «CGOCUS V1.1, depositada» y volver a exportar al depositar.** *Contra:* son cifras que caducan en semanas. | En los dos casos:<br>- Afinidades se construye **la última**;<br>- sus cifras salen del exportador, así que cambiar de versión es volver a exportar, no reescribir;<br>- **ninguna cifra exacta de Afinidades sale de su página** mientras D-3 siga abierta, tampoco en Inicio;<br>- **F34 (Unir con Afinidades, en Datos) también depende de D-3**: se construye con Afinidades, la última; sus cifras exactas van en su pestaña Datos con el sello «CGOCUS V1.1, depositada» y se vuelven a exportar; hasta entonces, Datos §6 da la regla y el fragmento, sin cifras. |
| **D-4** | **Enlaces profundos** | **(a) Diseñar ya con [Copiar la consulta] · [Abrir el explorador ↗] y pedir a la vez dos cambios de una línea:**<br>- un manejador `#q=` / `#sesion=` en el explorador;<br>- que la app de Afinidades conserve el `/id` en `showView('diputados')`.<br>**(b) Esperar a esos cambios antes de construir.** *Contra:* bloquea sin necesidad. | Con (a):<br>- un solo componente, `CopiarConsulta`, con un interruptor en `config/enlaces.ts` (`ENLACES_PROFUNDOS`);<br>- **el mismo interruptor gobierna las frases que dependen de él**: ↺ 5, la línea «No se abre desde un enlace» de Explorador 8.9 y las instrucciones «pegue en el buscador». Cada una trae **sus dos redacciones aprobadas**, y la llegada de D-4 abre una revisión del copy;<br>- hacia Afinidades, solo `#red` y `#diputados`;<br>- «este enlace abre» es palabra vetada. |
| **D-5** | **Qué abre tras el hemiciclo** | **(a) La tesis en banda, abierta con el grito «Luz y taquigrafos.», letra a letra (8-VI-1934, V2 71330 · v3 80306), y debajo el calendario de sesiones compacto, que sirve de índice de las etapas. Sin portada rotativa en la 0.1.**<br>**(b) Curvas de términos rotativas.** *Contra:*<br>- la lista de términos es editorial y no está aprobada;<br>- cada curva pide un hito con fuente;<br>- la portada rotativa llevó el Inicio de ParlaIbero a 820.217 B.<br>**(c) Las votaciones nominales como apertura.** *Contra:* una votación es el final de un debate, no su puerta.<br>**Variante de (a) para aligerar Inicio:** sacar F26 de Inicio, dejarla en Sesiones y enlazarla desde el calendario; fundir los movimientos 4 a 6 en dos. *Contra:* Inicio pierde su segunda figura interactiva. | Con (a), las votaciones son el movimiento 3 de Inicio, como figura **secundaria** (regla 1 del amontonamiento), y las curvas llegan en la 0.2, en su propia página. |
| **D-6** | **Rótulo de la segunda legislatura** | **(a) «1933-1935» en todo lo de THQCMI y «1933-1936», tal cual, en lo de CGOCUS, con la frase fija ↺ 10.** «1933-1935» es el valor de la columna `legislature` y de la faceta del explorador, y las sesiones terminan el 10-XII-1935. *Contra:* dos rótulos a la vista; la v2 de Afinidades generaliza «1933-1936».<br>**(b) «1933-1936» en todo el sitio.** *Contra:* quien filtre `legislature` con ese valor no encontrará nada. | Las rutas no dependen del rótulo (`/cortes/1933/`). La recodificación va dentro del fragmento de unión de Datos. |
| **D-8** *(nueva)* | **Unidad de ficha** | **(a) Cinco etapas: Constituyentes · 1933-1935 · Cortes de 1936 · guerra · México.** La serie 1936-1939 se corta por su propia numeración (sesiones 1–60, 61–69 y 70–74), y ese corte coincide con el de las fechas (comprobado).<br>**(b) Las tres legislaturas del CSV.** *Contra:* la guerra y México quedarían como apéndice de 1936. Es justo lo que usted llama resumir. | Con (a):<br>- el «Hoy puede» de las etapas III a V usa la faceta Legislatura más Desde y Hasta;<br>- los topes de palabras de cada ficha van en proporción a su material. |
| **D-9** *(nueva)* | **Puertas de lectura** | El criterio es **de calendario y esfuerzo**, no de verificación: tras la revisión, en el corpus solo queda por comprobar el art. 81 [EXT] (7-IV-1936), y la del 14-VII depende de su alcance.<br>**(a) Ocho en la 0.1 y siete en la 0.2.**<br>- **En la 0.1**, una por etapa como mínimo, las más reconocibles: 1-X-1931 · 13/14-X-1931 · 27-V-1932 · 2-II-1933 · 4-VII-1934 · 16-VI y 1-VII-1936 · 1-II-1939 · 1945.<br>- **En la 0.2**: 14-VII-1931 · 9-XII-1931 · 13-V-1932 · 9-IX-1932 · 20-III-1935 · 7-IV-1936 · 15-IV-1936. La cita de Ortega es del 30-VII-1931 (V2 1215 · v3 1337): la del 14-VII solo puede usarla si abarca la biblioteca «Debate · La Cámara se constituye (1931)». Las réplicas del 21-III-1935 (V2 85423 y 85427) y las botas y la horca del 15-IV-1936 (V2 102493 y 102481) ya están localizadas.<br>**(b) Once en la 0.1:** las ocho más 9-XII-1931, 13-V-1932 y 9-IX-1932, que están listas. *Contra:* cerca de 1 jornada más de copy, datos e inglés.<br>**(c) Las quince en la 0.1.** *Contra:* unas 2 jornadas más y el art. 81 [EXT] en la ruta crítica. | Con (a):<br>- una plantilla y ocho instancias;<br>- la ruta de las demás queda oculta hasta que existan, nunca «próximamente»;<br>- la puerta del «Luz y taquígrafos» pasa a El Diario (F27).<br>Figueres se queda en la 0.1: la nota del volumen se explica con el propio corpus (V2 107341 · v3 121465), y solo los sótanos del castillo son [EXT]. |
| **D-22** | **Alcance de la tabla de grafías** | **(a) La grafía es obligatoria en el texto y en los rótulos visibles** (unos 150–250 nombres). Los CSV conservan `rep_name` tal cual, con una columna `grafia` opcional y la salvedad en el LÉAME. El exportador y la auditoría fallan solo ante un nombre visible sin entrada.<br>**(b) Ampliar la tabla a las 1.026 personas de CGOCUS**, que también llegan sin tildes («Andres Maroto Rodriguez De Vera»). *Contra:* 1,5–2 jornadas más, y su revisión. | Con la regla actual, la compilación no pasaría sus propias puertas: F05 descarga 772 diputados (v3), F07 los 773 de la V2, y F21 muestra y busca entre 1.446 fichas.<br>Ejemplo: `rep_id` 456, que la base escribe «Manuel Jimenez Fernandez», CEDA, Badajoz; el Diario imprime «JIMÉNEZ FERNÁNDEZ». Hasta la Puerta 1b, los borradores escriben «Jiménez Fernández [grafía por confirmar]». La entrada 456 de `02c_GRAFIAS.md` se cierra antes del copy 2a. |
| **D-12** *(nueva)* | **Fuentes de lo externo** | **(a) Solo con referencia académica [A] o institucional [I] por afirmación.** Los hitos parlamentarios se anclan en su fila del Diario. Antes de escribir el contexto de las fichas hay una **puerta de bibliografía** (`02b_BIBLIOGRAFIA.md`).<br>**(b) Heredar los hitos de `hitos.js`.** *Contra:*<br>- 17 de sus 21 hitos citan Wikipedia y otros 3, blogs o prensa; solo uno cita una fuente institucional (congreso.es);<br>- el n.º 20 dice «presidente» donde el Diario dice «Presidente interino». | Con (a), lo que no tenga fuente se recorta. Nunca se rellena. |

### Bloquean construir o publicar, no la narrativa

| # | decisión | opciones | nota |
|---|---|---|---|
| **D-10** | **Palabras** (curvas de términos, F03 + F04) | **(a) En la 0.2, recalculada sobre la v3 con el motor del explorador**, para que [Copiar la consulta] reproduzca la curva de Tendencia:<br>- lista de términos revisada por usted;<br>- el hito de cada curva es la sesión del Diario con más apariciones.<br>**(b) En la 0.1, sobre la V2 tal como está** (`terminos_mes_v2.json`). *Contra:* el lector verá otra cifra en la Tendencia. | Ruta reservada: `/es/palabras/`. |
| **D-11** | **Acotaciones del Diario** (F13 + F14) | **(a) En la 0.2, con el rótulo «acotaciones del Diario»**, nunca «intensidad» ni «tono».<br>**(b) No.** | Su vecindad temática con los actos afectivos del prototipo pide su visto bueno explícito.<br>**Esta decisión bloquea también las cifras de «acotaciones de conflicto»** que la narrativa usaba en la 0.1 (163, 110 y 82): salen de las fichas y las puertas. Si se aprueba, vuelven rotuladas «unidades de acotación clasificadas como conflicto por el motor del explorador (V2)», con denominador y sin puesto en un ranking; `clima` entra entonces en `puertas.json`, con su base y su definición. |
| **D-13** | **Página «Docencia y archivos»** | **(a) En la 0.2**, a dos columnas (el aula · el archivo y la redacción), enlazada desde el pie.<br>**(b) No.** | Ruta reservada: `/es/aula/`. |
| **D-14** | **Facsímil de una página del Diario** (la votación del 1-X-1931) | **(a) Solo si los derechos de la digitalización lo permiten.**<br>**(b) No.** | Iría en El Diario. |
| **D-15** | **Tema por defecto** | `prefers-color-scheme` no distingue «sin preferencia»: los navegadores informan `light` por defecto. Así que las opciones reales son dos.<br>**(a) Seguir al sistema**, más ◐ con la elección guardada. Es lo que hace ParlaIbero. *Contra:* en la práctica, casi todos verán primero el claro, aunque la identidad acordada es oscura; el claro se cuida igual que el oscuro.<br>**(b) Oscuro por defecto**, con ◐ y la elección guardada. *Contra:* no sigue al sistema de quien pidió claro. | La portada tiene sus dos paletas (`hero_vars.css`). |
| **D-16** | **Agrupar las cifras de cuatro dígitos** | **(a) Agruparlas, como ParlaIbero** («1.460»): hay coherencia entre proyectos hermanos y las columnas de las tablas se alinean.<br>**(b) No agruparlas** (`useGrouping: 'min2'`, la norma académica). | En los dos casos, **los años, los ids de fila y los números de sesión no se agrupan nunca**. |
| **D-17** | **Menciones**, en la página Explorador | **(a) Solo la matriz entre partidos, con su bloque de límites.** Sin la red, sin «externas» y sin focos, que tienen errores de identificación («Galarz», «A. Azaña»).<br>**(b) Una línea sin captura.**<br>**(c) Esperar a que se corrija.** | — |
| **D-18** | **La cita «V2» que el explorador pone sobre datos v3** | **(a) Corregirla en el explorador.**<br>**(b) Avisarlo en la página Explorador**, como mínimo. | — |
| **D-19** | **Depósito** | **(a) Una V2.1 de THQCMI** con el README actualizado y, dentro, los metadatos de sesión: páginas, presidentes y Gobiernos pasarían a ser dato depositado.<br>**(b) Dejarlo como está**, con la frase fija ↺ 11. | Si llega la V2.1, la marca «proyecto» pasa a «V2.1» sin tocar el copy. |
| **D-20** | **Motivo del formulario** («Nos gustaría conocer…») | Lo redacta usted. | Mientras no exista, es un pendiente que tumba la compilación de publicación. |
| **D-21** | **URL definitiva** | **(a) Repositorio `luz` → `rodrodr.github.io/luz/`**, como `parlaibero_site` → `/parlaibero/`. Hoy da 404.<br>**(b) Otra.** | La crean solo usted y Pages. |
| **D-26** *(nueva)* | **Unidad del peso de la descarga del explorador** | La regla de la crítica, que prevalece, es «unos 112 MB comprimidos» (111.733.652 B) y «unos 282 MB» si se recuerda la base, en unidad decimal. Este plan había propuesto por su cuenta una sola unidad para todo el sitio, la binaria de Dataverse: «unos 107 MB» y «unos 269 MB».<br>**(a) La regla de la crítica**, con la unidad dicha junto a la cifra. *Contra:* dos unidades en el sitio (158,1 MB del CSV es binaria).<br>**(b) Una sola unidad, la de Dataverse.** *Contra:* «107 MB» se confunde a la vista con 107.551 y con «107.000», que está vetado; y el botón del explorador dice «≈260 MB». | **Mientras no decida, rige (a).** En Datos pueden ir las dos unidades con sus bytes. |
| **D-27** *(nueva)* | **Resalte de la portada** | **(a) Dejarla estática**, como la genera `hero_svg.py`, con su leyenda.<br>**(b) Añadir cuatro radios de bloque** (Derechas · Centro · Izquierdas · Gobierno) y la atenuación al pasar el puntero, solo con CSS. El dibujo no cambia. *Contra:* es un cambio sobre algo que usted dio por «perfecto». | Con (b), 0,25 j más en el componente. |

### No bloquean

| # | asunto | recomendación |
|---|---|---|
| D-23 | Muestra sin formulario (una sesión en CSV) | **No.** Sería un producto de datos nuevo, con su cita, que esquiva el formulario. |
| D-24 | Remate de Inicio | **(a) «Los datos están publicados. Haga sus preguntas.»**, con el «usted» del sitio. (b) «Hagan sus preguntas», el cierre de la presentación, como excepción aprobada a la regla del «usted». (c) «La siguiente derivada es suya». |
| D-25 | Pendientes de datos que el sitio declara | Usted decide si se corrigen o se declaran:<br>- la fusión «Liberal» → «Liberales» (15.364 filas);<br>- el partido AR de Martínez Barrio en 1931-1933;<br>- el `rep_id` 836 (§ Discrepancias, fila 23);<br>- la Lliga, que es CD en el CSV y D en el README;<br>- la diferencia de 5 entre etiquetas y filas;<br>- los 729, 731 o 735 turnos rescatados: el copy imprime 735 (`mapa_v2_v3.json`), que cierra la suma de F18, y declara los otros dos. |

---

## Reglas que gobiernan el trabajo

- **Narrativa primero**, con puerta de aprobación explícita entre etapas. La landing se rechazó por resumir: aquí
  **Inicio remite y no resume**, y cada página de profundidad dice su tema completo.
- **Nada del prototipo de 1931.** Una prueba sobre `src/data/` falla si entra cualquier fichero de
  `aecpa2026/figs/data/` distinto de `hemiciclo_1936.json`.
- **Mide, no cites.** Ninguna cifra se teclea. Cada cifra sale de un fichero generado por el exportador, con su base,
  su fuente y su fecha.
- **Una cosa, un archivo.** El sitio vive en `luz_site/`, y el exportador también (`luz_site/exportador/`). Lee en modo
  solo lectura las rutas de los proyectos de datos: escribirlo dentro de `2REP_Explorer/tools/` sería tocar el proyecto
  del explorador. Si usted prefiere esa ubicación, lo autoriza expresamente.
- ⛔ **Nada se toca en Dataverse, en el explorador ni en la app de Afinidades.** Los cambios que les afectan (D-3, D-4,
  D-18, D-19) son peticiones al autor.
- Las tareas largas van en subagentes en segundo plano, y los lotes de más de diez ficheros, en paralelo.

---

## Reglas editoriales

### De contenido

| regla | cómo se aplica en LyT |
|---|---|
| **Narrativa primero, gráfico después** | Cada página abre con su pregunta en el H1. La figura llega cuando la frase ya ha dicho qué buscar en ella. |
| **El fragmento es el argumento, no el número** | Inicio abre con tres palabras del Diario («Luz y taquigrafos.», tal como está en la fila), no con 107.551. |
| **La escala no es portada** | 107.551 y 755 van en la credencial y en el pie, no en un titular. |
| **Ninguna cifra sin su base y su denominador** | «n de N» en cada nota emergente; `base` en cada cifra. |
| **El límite va en la misma frase que la cifra** | Ningún capítulo de «límites». Las 11 advertencias de la landing se reparten, cada una junto a la cifra que matiza (tabla en «Mapa del sitio»). |
| **El contexto histórico no se resume** | Cada etapa tiene su ficha, con 600–1.500 palabras de contexto según su material, ancladas en filas. El tope es del apartado «Lo que pasó en la Cámara»; el de la ficha entera va aparte (plantilla C). |
| **Lo externo lleva referencia o no va** | [A] o [I] por afirmación (D-12). Las valoraciones retóricas de la documentación interna no se presentan como juicio del proyecto. |
| **Se nombra a los diputados, con su grafía** | Con la tabla de grafías, en el texto y en los rótulos visibles (D-22); nunca el `rep_name` crudo sin tildes en pantalla. Los CSV conservan `rep_name`. Las citas conservan las erratas del reconocimiento óptico letra a letra («Luz y taquigrafos.», «Si, prometo.»), con [sic] solo donde cambie el sentido y «[…]» donde se corte. |
| **No se promete lo que el explorador no hace** | «Hoy puede» solo lista tareas comprobadas en `estudio_lyt_explorador.md`. |
| **Las exclusiones se enseñan** | «Lo que no está aquí» (Las Cortes), «Lo que el Diario calla» (El Diario), «Que estén no valida su contenido» (Sesiones). |
| **Orden fijo, nunca por valor, en Inicio** | Ningún ranking de personas en Inicio. Las figuras de oradores viven en las fichas y en Versiones, con base, denominador y la frase «no es una medida de importancia». |
| **La ausencia nunca es un color** | Los meses sin sesión llevan contorno y rótulo; la causa de un hueco no se infiere. |
| **Se enseña la costura** | Hay fragmentos en R y en Python que se vuelven a ejecutar y reproducen cifras del sitio. |
| **No se afirma novedad** | Sin una búsqueda fechada de corpus comparables (hueco B7), el sitio no dice «el primero». |

### De estilo

- «Usted» siempre. El proyecto dice «nosotros».
- Español de España, **sin anglicismos innecesarios**:
  - «nota emergente» y no *tooltip*;
  - «antetítulo» y no *kicker*;
  - «compilación» y no *build*;
  - «archivo» y no *fichero* en el copy.
- Prohibidos «innovador» y el tono de folleto. **Ninguna frase del copy pasa de 30 palabras** y **cada frase lleva una
  sola magnitud**.
- «Diario», con mayúscula, para el Diario de Sesiones. «Presidencia» para el cargo que modera; «Presidente de las
  Cortes», «Presidente del Consejo» y «Presidente interino de la República» como los imprime el Diario.
- **«Fila» para la V2; «intervención» solo al hablar del explorador**, que usa esa palabra, siempre con su base.
- Comillas «» y, dentro, “”. Raya de inciso pegada. Porcentaje con espacio indivisible y artículo: «el 0,83 %».
- Rótulos: botones con infinitivo más objeto ([Descargar los datos]); pestañas con sustantivos; **un rótulo por
  destino**.
- Glosario vinculante de una línea por término: fila, sesión, etapa, legislatura, Presidencia, edición depositada,
  edición del explorador, acotación, puerta de lectura. Es la fuente de las definiciones y de la traducción
  (`03a_GLOSARIO_es-en.md`).

### De cifras: «mide, no cites», con dos bases

- El copy lleva `{{clave|formato}}`. `cifras.ts` resuelve cada marcador contra `src/data/` y emite
  `<data class="cifra" data-k="clave" data-base="V2|v3|proyecto|afin|dv|explorador|readme|ocr|croquis">`.
- **`filas.V2` y `filas.v3` son claves distintas.** Ningún marcador «filas» genérico.
- **Una sola base por frase.** Si una frase compara V2 y v3, las dos van rotuladas (`audit-cifras` lo vigila).
- Los pesos van **en una sola unidad**, la de Dataverse (bytes / 1.024², rotulada MB), con el formateador `|peso`.
- Las discrepancias se cierran antes del copy (§ Discrepancias).
- **Cómo pasa `check-i18n` los números que no son cifras** (se fija en `02a_MARCADORES.md` antes de la Puerta 2a):
  - fechas, con la familia `fecha.*` o un `<time>` generado;
  - ids de fila, con `fila.V2.<id>` y `fila.v3.<id>`;
  - números de sesión, con `sesion.<clave>.num`;
  - artículos y páginas del Diario, con `art.*` y `pag.*`;
  - años sueltos en la prosa: marcador o lista blanca por etapa;
  - la bibliografía [A] e [I] va con `data-audit-exento` y su motivo.

### Frases fijas ↺ (una redacción, idéntica en todo el sitio; `copy2i18n.py` lo comprueba)

1. «Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.»
2. Sello de base: «Edición depositada (V2)» · «Edición del explorador (v3, sin depositar)» · «Metadatos del proyecto
   (no depositados; el explorador no los muestra)» · «Afinidades Elegidas (CGOCUS V1.1, depositada)».
3. «Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.»
4. «Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y
   número— es la misma en las dos.»
5. Bajo el interruptor `ENLACES_PROFUNDOS` (D-4), con dos redacciones aprobadas:
   - apagado: «El explorador no abre una búsqueda desde un enlace: cópiela y péguela en su buscador (tecla /).»
   - encendido: «Este botón abre el explorador con la búsqueda ya escrita.» (redacción por aprobar; hasta entonces,
     «este enlace abre» sigue vetado).
6. «Contar una palabra no dice quién la defiende ni en qué tono.»
7. «El texto sale del reconocimiento óptico y no está corregido a mano.»
8. «La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.»
9. «Que estén no valida su contenido.»
10. «Afinidades Elegidas llama 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario
    terminan el 10 de diciembre de 1935.»
11. «El README depositado describe la primera versión; las diferencias, aquí.»
12. «Sin formulario: son datos agregados.»
13. NotaBases: «Esta cifra sale de la edición del explorador (v3, {{filas.v3}} filas, sin depositar); la depositada es
    la V2 ({{filas.V2}} filas). Por qué hay dos →»

### Un rótulo por destino

| rótulo | destino | nota |
|---|---|---|
| [Descargar los datos] | `/{lang}/datos/#empezar` | Nunca directamente a Dataverse: primero se elige peldaño. |
| [Descargar en Dataverse ↗] | DOI de THQCMI o de CGOCUS | Siempre con la frase ↺ 3 **encima**. |
| [Abrir el explorador ↗] | `rodrodr.github.io/luz_explorer/` | En otra pestaña. El pie lo dice una vez por página. |
| [Copiar la consulta] | portapapeles | Nace oculto y lo destapa la isla. Sin JS, la consulta queda en `<code>` seleccionable. |
| [Abrir Afinidades ↗] | `rodrodr.github.io/afinidades/#red` o `#diputados` | Las únicas vistas que la app restaura. |
| [Descargar los datos de la figura] | `/datos/<fig>.csv` | Con la frase ↺ 12. |
| [Copiar la cita] | portapapeles | Texto, BibTeX y RIS. |
| [Ver …] | página interna | Se dice qué se verá: [Ver las Cortes, etapa a etapa], [Ver las votaciones]. |

### Palabras y cifras vetadas (`check-i18n.mjs` en el copy y `audit-cifras.mjs` en `dist/`)

- **Del prototipo:**
  - las palabras «libro de códigos», «grafo anotado», «defiende/critica/menciona» como categorías, «acto afectivo»,
    «ironía», «hostilidad», «intensidad» e «índice de reacción»;
  - las cifras 3.874, 324 oradores, 90 sesiones del debate constituyente, 23.485, 10.463 y 43 grupos temáticos.
- **Promesas que el explorador no cumple**, fuera de las claves `explorador.no_hace.*` y `limites.*`:
  - «este enlace abre», «búsqueda semántica», «por significado», «semánticamente», «comodín», «NOT», «proximidad»;
  - «Mismo diputado» junto a «significado»;
  - la cabecera de sesión con «Diario», «páginas», «Presidencia» o «Gobierno»;
  - «funciona sin conexión», hasta que se pruebe (C4).
- **Cifras superadas:**
  - «34 millones», «24 millones» (referido al explorador), «107.000», «158 MB» sin decimal, «774 diputados», «80 en
    las tres legislaturas», «94.621», «1.446 diputados»;
  - «sesión 48 entera», «415 íntegras», «elección de Martínez Barrio», «cruza el eje izquierda-derecha».
- **Del tono:** «innovador», «próximamente», «revolucionario», «único».

---

## Argumento y arquitectura (propuesta para la Puerta 1; no es copy)

### Tesis

**Lo que se dijo en sesión pública se imprimió con luz y taquígrafos —salvo lo que la Presidencia mandó borrar—, y
por eso nadie pudo leerlo entero. Luz y Taquígrafos lo convierte en una tabla que se puede contar, leer y citar. Este
sitio enseña, etapa a etapa, qué responde esa tabla, dónde deja de responder y cómo volver al Diario.**

La tesis no dice «todo». Las sesiones secretas no se imprimían (el gancho de Inicio trata de una, V2 71329); F28
documenta al menos siete órdenes de la Presidencia para que unas palabras no constaran; y desde julio de 1936 lo
impreso es extracto, no Diario íntegro.

La espina del relato es la de la presentación aprobada, sin el prototipo:

| paso | contenido |
|---|---|
| **Pregunta** | «¿Cómo discutía una democracia que se estaba inventando?» |
| **Tensión** | Casi nunca fue secreto: sobre todo, inabarcable. Su contrapunto explícito es la tensión de El Diario: hay palabras borradas. |
| **Resolución** | La fila. La lectura no se elimina: se aplaza. |
| **Cierre** | «Los datos están publicados. Haga sus preguntas.» (D-24) |

Alternativas descartadas:
- «…y dónde se equivoca quien cuenta sin mirar» (propuesta «datos»), porque es admonitoria;
- «construido a partir de sus figuras» (propuesta «interactivo»), porque invierte el orden que pide usted;
- «lo convierte en una consulta», porque sobreafirma, como aprendió ParlaIbero.

### Dos mitades: la historia y la base

La navegación separa a la vista **la historia** (Las Cortes · El Diario) de **la base** (Método · Datos · Explorador ·
Afinidades).

- El historiador entra por lo que ya conoce: una etapa, una sesión, una frase.
- **Cada página histórica acaba en la base**:
  - la ficha termina en «Hoy puede» y «Cómo citar»;
  - la puerta, en «Cómo encontrarla en el explorador»;
  - El Diario, en «Cómo citar un pasaje».
- Cada página de la base arranca de un hecho de la historia. Método abre con la fila de Campoamor.

### Respuesta a la crítica, punto por punto

| lo que dijo | respuesta | cómo se comprueba |
|---|---|---|
| «¿Por qué reducir el landing a una sola página? Restringe mucho las posibilidades» | **22 páginas por lengua en la 0.1** (Inicio, Las Cortes, 5 fichas, Sesiones, 8 puertas, El Diario, Método, Datos, Versiones, Explorador y Afinidades). Son **31 en la 0.2**. | `humo.spec` recorre las 44 rutas más la raíz y el 404. |
| «Interfaz demasiado cluttered» | Una pregunta por página, una figura protagonista y un tope de secundarias por plantilla (regla 1 del amontonamiento). Salvedades al margen. Tabla y Datos en pestañas. Listas en registro de calendario, sin tarjetas ni iconos. **Una sola banda invertida en todo el sitio.** Seis pestañas en la cabecera. | `peso.spec` (KB, palabras y figuras por página) y `solapes.spec`. La cabecera cabe a 360 px, con tope de altura, en `humo`. |
| «Se hizo algo mucho mejor en ParlaIbero» | Se reutiliza su esqueleto (Astro, marcadores con procedencia, auditoría de `dist/`, Pestanas, IndiceLateral, BandaCTA, Captura, Cita, Salidas). Se corrigen sus defectos: notas perdidas al rotar, «BORRADOR» a la vista, «Usar» sin índice, Inicio de 820 KB. | Inventario de `estudio_parla_codigo.md` §6.4–6.6. |
| «La actual aún es muy pobre» | De 4.713 palabras en una página a unas 22.000–27.500 en 22. De 4 SVG estáticos a 24 piezas visuales, 15 de ellas figuras interactivas con Gráfico · Tabla · Datos. | Recuento de § Plantilla por plantilla y § Figuras. |
| «No hay gráficos interactivos» | Cada figura interactiva tiene:<br>- nota con cifra, numerador y denominador;<br>- recorrido con teclado;<br>- una conmutación como mucho;<br>- filtro de etapa con radios que funciona sin JS;<br>- [Copiar la consulta] cuando hay una búsqueda de texto; los filtros, como pasos escritos;<br>- datos agregados sin formulario. | § Figuras. `sinjs.spec`. |
| «Todo tiene que caber en una sola página» | Inicio es la puerta (≤ 700 palabras). Cada movimiento remite a su página. | Prueba de palabras de Inicio. |
| «Resume demasiado cosas que no debería resumir» | Se amplía lo que se resumía:<br>- **5 fichas de etapa** con contexto amplio anclado en filas;<br>- **El Diario** con página propia;<br>- **Método** en 10 apartados;<br>- **Usar los datos** con las 14 columnas y sus trampas;<br>- **Versiones** con página propia;<br>- **Explorador** en 9 secciones con capturas reales;<br>- **Afinidades** con página propia. | Tabla «Qué se amplía», en `01_NARRATIVA_sitio.md` §2. |

---

## Mapa del sitio

### Rutas

Se reutiliza la maquinaria `[lang]` de ParlaIbero con `LANGS = ['es', 'en']`. **Los segmentos de ruta son los mismos
en las dos lenguas**, para que ninguna URL citada cambie y `hreflang` sea trivial.

```
/                                   selector de lengua estático, sobre el hemiciclo, sin cifras
/es/  /en/                          Inicio
/es/cortes/                         Las Cortes, 1931–1945 (índice: el calendario ES el índice)
/es/cortes/1931/                    Ficha I   · Las Cortes Constituyentes (1931–1933)
/es/cortes/1933/                    Ficha II  · La legislatura elegida en 1933 (1933-1935 en el CSV)
/es/cortes/1936/                    Ficha III · Las Cortes de 1936, hasta la guerra (marzo–julio)
/es/cortes/guerra/                  Ficha IV  · Las Cortes en guerra (1936–1939)
/es/cortes/mexico/                  Ficha V   · Las Cortes en México (1945)
/es/cortes/sesiones/                Sesiones y votaciones
/es/cortes/sesiones/<nombre>/       Puertas de lectura (una plantilla): 8 en la 0.1, 7 más en la 0.2
/es/diario/                         El Diario de Sesiones
/es/metodo/                         Método
/es/datos/                          Usar los datos
/es/datos/versiones/                Versiones, identificadores y cita
/es/explorador/                     El explorador
/es/afinidades/                     Afinidades Elegidas
/en/…                               las mismas rutas, tras congelar el español
/404.html                           bilingüe apilado
/datos/…                            CSV, XLSX y LÉAME (es, en) de cada figura; SVG y PNG de F01 (completa) y F26; procedencia.csv
/sitemap-index.xml · /robots.txt    mapa del sitio (es, en) y robots
Reservadas y ocultas mientras no existan: /es/palabras/ (D-10) · /es/aula/ (D-13)
```

Las fichas usan **el año de la elección** para las tres Cortes elegidas, y un nombre para las dos etapas que las
continúan. Así las URL no dependen del rótulo pendiente (D-6).

Las puertas usan **un nombre y no una fecha**, porque tres abarcan más de una fecha:

| edición | nombre de ruta | puerta |
|---|---|---|
| 0.1 | `sufragio-1931` | 1-X-1931 |
| 0.1 | `cuestion-religiosa-1931` | 13 y 14-X-1931 (sesiones 55 y 56) |
| 0.1 | `estatuto-1932` | 27-V-1932 |
| 0.1 | `casas-viejas-1933` | 2-II-1933 |
| 0.1 | `pistola-1934` | 4-VII-1934 |
| 0.1 | `antesala-1936` | 16-VI y 1-VII-1936 |
| 0.1 | `figueres-1939` | 1-II-1939 |
| 0.1 | `mexico-1945` | 17-VIII y 7–9-XI-1945 |
| 0.2 | `apertura-1931` | — |
| 0.2 | `constitucion-1931` | — |
| 0.2 | `conllevar-1932` | — |
| 0.2 | `dos-votaciones-1932` | — |
| 0.2 | `acusacion-1935` | — |
| 0.2 | `destitucion-1936` | — |
| 0.2 | `abril-1936` | — |

**Recuento.** En la 0.1 hay 22 páginas por lengua: 44, más la raíz y el 404. Las ocho puertas cubren 13 sesiones:
tres abarcan más de una (cuestión religiosa, 55 y 56; antesala, 45 y 54; México, 71 a 74). La 0.2 añade 7 puertas, Palabras y
Docencia y archivos: 31 por lengua.

### Navegación global

- **Cabecera**, que no es pegajosa:
  - la marca «Luz y Taquígrafos» en Cormorant Garamond cursiva y el descriptor en cuerpo pequeño, sin cifra: «Los
    Diarios de Sesiones del Congreso, 1931–1945»;
  - **seis pestañas en dos grupos**, separados por un filete: **Las Cortes · El Diario** | **Método · Datos ·
    Explorador · Afinidades**;
  - ES · EN, que llevan a la misma página en la otra lengua;
  - el botón de tema ◐, que nace oculto y lo destapa su script;
  - «Saltar al contenido».
  - **Sin botones de acción.** Va en una fila desde 72 rem, y ese umbral se comprueba con el descriptor en la misma
    fila. Por debajo, sin menú hamburguesa: **el descriptor se oculta por debajo de 40 rem** y las seis pestañas
    aceptan dos líneas. A 360 px, las seis ocupan unos 470 px frente a 328 disponibles: sin esa regla saldrían 3 o 4
    líneas, unos 200 px sobre el H1.
  - `humo.spec` comprueba que nada asoma a 360 px **y pone un tope a la altura de la cabecera** (detectar desbordes no
    basta).
- **Subnavegación**, solo donde hace falta: en Las Cortes, «Etapas · Sesiones y votaciones»; en Datos, «Usar los
  datos · Versiones».
- **Índice lateral** (`IndiceLateral.astro`):
  - pegajoso desde 64 rem; en el móvil, un `<details>`;
  - numeración por contador CSS y «dónde estoy» con `view-timeline`, sin JS;
  - va en las fichas de etapa, El Diario, Método, Datos, Versiones, Explorador y Afinidades. Corrige el «Usar» de
    ParlaIbero, que no lo tenía.
- **Banda fija** (`BandaCTA.astro`), **solo en Método y Explorador**:
  - [Descargar los datos], con la frase ↺ 3;
  - [Abrir el explorador ↗], con «Sirve la edición v3, sin depositar; pide un ordenador».
- **Vecinas**: las fichas y las puertas llevan la anterior y la siguiente en orden cronológico, con el índice en el
  centro.
- **Pie**, en orden fijo y **sin mención de financiación**:
  1. autores, tal como la cita de Dataverse, y Universidad de Salamanca;
  2. depósitos: THQCMI V2.0 y CGOCUS V1.1;
  3. frase ↺ 1;
  4. licencias: CC BY 4.0 para los datos, MIT para el código y la del texto del sitio (`LICENSE-CONTENT`); créditos del
     croquis de Gil Robles y del plano de F. Pardo Calvo;
  5. ediciones, en mono: «Página ed. 0.1 · Datos: V2.0 depositada ({{filas.V2}} filas) · Explorador: v3 sin
     depositar ({{filas.v3}} filas)». Lleva `data-nota-bases`: cumple la función de NotaBases para el pie, y la regla
     de NotaBases solo mira `<main>`;
  6. «Este sitio no usa cookies ni analítica; Dataverse pide datos al descargar, y se avisa antes»;
  7. enlaces: Cómo citar · De dónde sale cada cifra (`procedencia.csv`) · Avisar de una errata · Escribirnos ·
     ParlaIbero (proyecto hermano, distinto).

### Cómo se evita el amontonamiento (reglas medibles)

1. **El H1 es una pregunta.** En las fichas y las puertas, el H1 es el nombre de la etapa o el hecho, y la pregunta va
   en la entrada.
   **Figuras.** Una figura **protagonista** va a todo el ancho y con pestañas. Una **secundaria** va en línea, sin
   pestañas (su tabla y sus datos, en un `<details>`), y no compite en tamaño. La portada (H) no cuenta: no es figura
   de datos.

   | plantilla | tope |
   |---|---|
   | Inicio | 1 protagonista (F01c) + 1 secundaria (F26 ligera) |
   | Las Cortes · Sesiones | 1 protagonista (F01 · F26 completa) |
   | Puerta | 1 protagonista (F30) + 1 secundaria (F26 mínima) |
   | Ficha | 1 protagonista (F01e con F16) + 2 secundarias (F05 y F09), cada una en su apartado H3 |
   | Páginas largas con índice (El Diario, Método, Datos, Versiones, Explorador, Afinidades) | una figura por apartado del índice, y una sola protagonista por página |

   `peso.spec` cuenta las figuras por página y por apartado.
2. **La misma gramática en cada sección**, con 200–300 px de aire entre secciones a 1.440:
   1. antetítulo en mono;
   2. H2;
   3. frase de entrada en serif grande;
   4. figura o lista;
   5. salvedad al margen, de 40 palabras como mucho;
   6. una llamada.
3. **Tabla y Datos van en pestañas, nunca debajo del gráfico.** Lo repetitivo va en `<details>`: las citas en tres
   formatos y las listas largas.
4. **Una sola banda invertida en todo el sitio**: la tesis de Inicio. Sin tarjetas, iconos, contadores animados ni
   «banda de cifras».
5. Ninguna sección de más de 350 palabras, salvo el contexto de las fichas, que se parte en apartados H3 con su
   índice.
6. **Presupuestos en la integración continua** (`tests/peso.spec.ts`). **El peso mide solo el HTML** sin comprimir; las
   imágenes y los datos bajo demanda se miden aparte. Calibración en el `dist/` de ParlaIbero: un `rect` con atributos
   `data-*` ocupa unos 119 B y un `<data>` unos 71 B. Por eso ninguna página lleva en el HTML una tabla de 755 sesiones
   ni de 1.446 fichas:

   | página | palabras de copy en `<main>` | peso sin comprimir |
   |---|---|---|
   | Inicio | ≤ 700, de ellas ≤ 120 de límites | ≤ 300 KB |
   | Las Cortes | ≤ 800 | ≤ 250 KB (755 barras, unos 90–150 KB; la tabla por sesión va al CSV; la conmutación, con variables CSS y no con un segundo juego de `rect`) |
   | Fichas | tope por etapa (plantilla C) | ≤ 200 KB (una tabla por etapa, no por sesión) |
   | Puertas | ≤ 500 | ≤ 150 KB (la tabla de F30 en `<details>`, con solo orden, orador y palabras) |
   | Afinidades | ≤ 1.500 | ≤ 250 KB; las redes, bajo demanda; la tabla de grados enseña los primeros 20 y el censo completo va en CSV |
   | resto | tope de su plantilla | ≤ 200 KB |

7. **Una conmutación por figura como mucho.** Sin deslizadores ni paneles de mando.

### Plantilla por plantilla

Palabras de copy para el lector, sin rótulos de figura ni tablas. El detalle de cada figura está en § Figuras; la
narrativa movimiento a movimiento, en `01_NARRATIVA_sitio.md`.

#### A. Inicio · `/es/` · `/en/`

- **Propósito.** Decidir en noventa segundos si este corpus sirve para lo que el lector quiere saber, y por dónde
  entrar.
- **Público.** Todos a la vez. Inicio es uno solo.
- **Palabras.** ≤ 700 de copy; ≤ 120 de límites, todos en la frase de su cifra.
- **Figuras.** Hemiciclo (H, portada), el calendario compacto (F01c, protagonista) y las votaciones en su versión ligera
  (F26, secundaria, sin pestañas). La fila, el registro de puertas y las cajas vacías son tipográficos. Si Inicio se
  siente cargado en la vista previa, se aplica la variante de D-5: F26 sale de Inicio y los movimientos 4 a 6 se funden
  en dos.

| # | movimiento (H2) | qué se ve | base | palabras | llamada |
|---|---|---|---|---|---|
| 0 | **Portada.** H1: «¿Cómo discutía una democracia que se estaba inventando?» | El hemiciclo, sin cambios en el dibujo; el resalte por bloque, solo si se aprueba D-27; pie del croquis | croquis | ≤ 60 | [Abrir el explorador ↗] · [Descargar los datos] |
| 1 | **Tesis**, en banda invertida | El grito «Luz y taquigrafos.», letra a letra (V2 71330 / v3 80306), la tesis y la credencial en mono | V2 | ≤ 90 | — |
| 2 | **¿Cuándo se reunieron las Cortes?** | F01c: cinco filas-enlace, una por etapa | V2 | ≤ 100 | [Ver las Cortes, etapa a etapa] |
| 3 | **¿Qué se decidía allí?** | F26 ligera: **seis votaciones nominales escogidas**, con el total al lado («de las que el Diario imprime con su lista en {{votos.filas}} filas», exportador); cada barra lleva a su puerta o a Sesiones | V2 (texto de la fila) | ≤ 90 | [Ver las votaciones] |
| 4 | **¿Qué es una fila?** | Cita tipográfica: la Presidencia (V2 5423) y Campoamor (V2 5424) | V2 | ≤ 90 | [Ver qué trae cada columna] |
| 5 | **¿Qué sesión leo primero?** | Registro de calendario de las 8 puertas: fecha en mono · qué pasó · «N FILAS» | V2 | ≤ 110 | [Ver las sesiones] |
| 6 | **¿Qué no trae la base?** | Cuatro cajas vacías de raya: Tema · Tono · Posición · Voto. Afinidades, sin cifras | — | ≤ 70 | [Ver Afinidades Elegidas] |
| 7 | **Por dónde empezar** | La escalera, con la frase ↺ 3 encima, la cita y [Copiar la cita] | Dataverse | ≤ 90 | [Descargar los datos] · [Abrir el explorador ↗] |
| | **Total** | | | **≤ 700** (límites ≈ 110) | |

**Lo que Inicio deliberadamente no hace:**
- ni rotación;
- ni ranking de personas;
- ni cifras exactas de Afinidades (D-3);
- ni catálogo de funciones del explorador;
- ni selector de etapa en la portada.

#### B. Las Cortes, 1931–1945 · `/es/cortes/`

- **Propósito.** Qué Cortes hay aquí, cuándo se reunieron y cómo se corta la historia en etapas.
- **Público.** Quien quiere situarse antes de elegir una etapa o una sesión.
- **Palabras.** 600–800.
- **Movimientos:**
  1. Antetítulo LAS CORTES. H1: «¿Qué Cortes están aquí, y cuándo se reunieron?». Entrada: una frase con 755
     sesiones y «cada bloque abre su etapa».
  2. **Cómo leer el calendario**, antes de la figura: cuatro muestras (mes con sesión · mes sin sesión dentro de la
     etapa · fuera de toda etapa · «//» para el salto de 1939 a 1945) y la regla «el tono dice cuántas palabras se
     imprimieron, no cuánto importó».
  3. **F01, completa**: una marca por sesión, y las puertas con anillo.
  4. **Tres legislaturas, cinco etapas.** Una tabla tipográfica con sesiones, fechas, serie del Diario, filas,
     palabras y diputados que intervienen, más las filas v3 rotuladas (NotaBases). Y cómo se corta la serie
     1936-1939 por su numeración.
  5. **Lo que no está aquí.** La Diputación Permanente: la carátula del volumen de México enumera sus reuniones de
     1939 a 1943 y dice que «no se dispone de los textos» (v3 121466, solo en la v3). La nota que cierra la sesión de
     Figueres atestigua «las cuatro de la Diputación Permanente, celebradas en París» (V2 107341 · v3 121465), cuyos
     textos no están. Sus reuniones de 1936 son [EXT], con referencia o no van. Tampoco están los discursos fuera del
     Parlamento.
  6. Al margen: «Que no falte un número no prueba que el último sea el último publicado.»
- **Llamadas.** Cada bloque del calendario → su ficha; cada anillo → su puerta; [Ver las sesiones y votaciones];
  [Descargar los datos de la figura].

#### C. Ficha de etapa ×5 · `/es/cortes/<etapa>/`

Plantilla única. Es la pieza que responde a «el contexto histórico no se resume».

- **Público.** Quien ya eligió periodo: el historiador de la etapa, el docente que prepara una clase, el periodista.
- **Palabras**, en proporción a su material. El primer tope es **solo del apartado «Lo que pasó en la Cámara»**; el
  segundo, de la ficha entera (`peso.spec` mide los dos):

  | ficha | «Lo que pasó en la Cámara» | ficha entera |
  |---|---|---|
  | I · Constituyentes | 1.200–1.500 | 1.800–2.200 |
  | II · 1933-1935 | 1.200–1.500 | 1.800–2.200 |
  | III · 1936 | 1.000–1.200 | 1.500–1.800 |
  | IV · guerra | 600–800 | 1.000–1.300 (con la lista de sus 9 sesiones) |
  | V · México | 600–800 | 1.000–1.300 (con la lista de sus 5 sesiones) |

  Solo entran las secciones que la etapa sostiene. Si el tope fuera de la ficha entera, la I dejaría unas 700–900
  palabras para dos años y medio de Cámara, y volvería el resumen que usted rechazó.
- **Movimientos, en orden:**
  0. **Cabecera.** Miga en mono «LAS CORTES / I». H1 con el nombre de la etapa. Antetítulo en mono: fechas · sesiones
     · serie del Diario (proyecto, rotulada). Numeral romano en contorno como marca de agua (es marca, no dato).
  1. **Hoy puede.** Solo las tareas que el explorador publicado cumple, cada una con [Abrir el explorador ↗].
     [Copiar la consulta] solo aparece cuando hay texto de búsqueda (el buscador entiende comillas, `|` y `+`). Los
     filtros —Desde, Hasta, número de sesión, faceta Legislatura— son controles del panel y van como **pasos escritos
     sin botón** («Desde 01/10/1931 · Hasta 01/10/1931 · Solo lo que se habla: no»):
     - buscar en la etapa: faceta Legislatura, más Desde y Hasta en las etapas III a V;
     - abrir una sesión: Desde y Hasta con su fecha, abrir una intervención y pulsar `s`;
     - añadir la biblioteca del proyecto por su nombre;
     - seguir una palabra en Tendencia (Constituyentes · 1933–35 · 1936–45), solo en las etapas I a III;
     - exportar con su cita.
  2. **Cifras.** Tres cifras grandes, cada una con su salvedad en la misma frase: sesiones, palabras (V2, con su % del
     corpus) y diputados que intervienen.
  3. **Lo que pasó en la Cámara.** Es el contexto amplio: de 3 a 6 apartados H3 cronológicos que llenan el índice
     lateral. Cada párrafo se ancla en una fila, con **doble id V2 · v3** en mono. Cada hecho externo lleva [A] o [I]
     al pie del apartado.
  4. **Cuándo se reunió.** F01e (protagonista): el recorte de la etapa, con las bandas de presidente titular y Gobierno
     (F16) repetidas bajo cada fila de año, y las puertas encendidas.
  5. **Quién tomó la palabra.** Dos apartados H3, cada uno con una figura secundaria: F05, en la v3 y sin Presidencia,
     con NotaBases; y F09, en la V2.
  6. **Puertas de esta etapa.** Un registro con enlaces. En las etapas IV y V, la lista de **todas** sus sesiones
     (9 y 5), una línea cada una.
  7. **Antes de usarla.** Las salvedades propias de la etapa, con su cifra.
  8. **Para leer más.** La bibliografía [A] e [I] de la etapa, de `02b_BIBLIOGRAFIA.md`.
  9. **Cómo citar** el conjunto y una sesión de esta etapa, con [Copiar la cita], y las vecinas.
- **Figuras.** F01e con F16 (protagonista); F05 y F09 (secundarias).
- **Llamadas.** Las de «Hoy puede», [Descargar los datos], puertas y vecinas.

**Datos de las cinco fichas.** Recalculados sobre la V2, los metadatos del proyecto y la v3 por la propuesta
«historia»; los tres jueces los reprodujeron.

| | I Constituyentes | II 1933-1935 | III 1936 | IV Guerra | V México |
|---|---|---|---|---|---|
| Sesiones (numeración) | 405 (1–405) | 276 (1–276) | 60 (1–60 de 1936-1939) | 9 (61–69) | 5 (70–74) |
| Fechas | 14-VII-1931 → 3-X-1933 | 8-XII-1933 → 10-XII-1935 | 16-III → 10-VII-1936 | 1-X-1936 → 1-II-1939 | 10-I → 9-XI-1945 |
| Serie [proyecto] | Diario de Sesiones de las Cortes Constituyentes (405) | Diario de las Sesiones de Cortes (336, junto con III) | ídem | Extracto oficial (9) | Extracto oficial, México (5) |
| Filas [V2] | 61.355 | 40.342 | 5.368 | 276 | 210 |
| Palabras [V2] (% del corpus) | 12.966.290 (53,28 %) | 9.476.120 (38,94 %) | 1.690.319 (6,95 %) | 127.709 (0,52 %) | 75.458 (0,31 %) |
| Diputados que intervienen [V2]* | 417 | 390 | 243 | 44 | 29 |
| Presidente titular [proyecto] | Besteiro 401 · Barnés 3 · Lara 1 | Alba 274 · Casanueva 1 · Jiménez Fernández [grafía por confirmar] 1 | Martínez Barrio 49 · Jiménez de Asúa 11 (por verificar) | Martínez Barrio 9 | Jiménez de Asúa 3 (por verificar) · Martínez Barrio 1 · Fernández Clérigo 1 (por verificar) |
| Gobiernos, en sesiones [proyecto] | Provisional 55 · Azaña I 35 · II 262 · III 51 · Lerroux I 2 | Martínez Barrio 5 · Lerroux II 39 · III 30 · Samper 39 · Lerroux IV 67 · VI 52 · Chapaprieta I 18 · II 26 | Azaña 27 · Barcia (interino) 1 · Casares Quiroga 32 | Largo Caballero I 1 · II 2 · Negrín I 3 · II 3 | Negrín en el exilio 2 · Giral 3 |
| Debates preparados en el explorador [v3] | 13 | 7 | 4 | 1 | 1 |
| Puertas 0.1 | 1-X-1931 · 13/14-X-1931 · 27-V-1932 · 2-II-1933 | 4-VII-1934 | 16-VI y 1-VII-1936 | 1-II-1939 | 1945 |

\* `rep_id` distintos, incluido el de quien preside. Por legislatura son 417 / 390 / 253, y 773 en total.
«(por verificar)»: `sessions.json` marca con `verificar: true` las 14 sesiones de Jiménez de Asúa y la de Fernández
Clérigo, y el Gobierno Giral en sus tres sesiones. La banda y la tabla las pintan con otro trazo y esa nota.

**Los debates preparados se nombran siempre por su nombre exacto**, el de `bibliotecas_v3.json`, porque el lector lo
teclea o lo copia para añadirlo; nunca por su clave, cuya numeración B1…B26 no es cronológica. En tablas y botones van
con su prefijo («Debate · Sufragio femenino»); en la tabla, sin él para abreviar:

| etapa | debates |
|---|---|
| I | La Cámara se constituye (1931) · La Constitución de 1931 · Sufragio femenino · Cuestión religiosa (art. 26) · Ley de Defensa de la República · Responsabilidades de Alfonso XIII · El primer presidente de la República · Estatuto de Cataluña · Reforma agraria y Sanjurjada · Casas Viejas · Azaña y Lerroux: la ruptura · Ley Electoral de 1933 · El final de las Constituyentes |
| II | Las Cortes de 1933 se estrenan · Amnistía de 1934 · Contratos de cultivo y retirada de ERC y PNV · Las Cortes ante la revolución de octubre · Reforma del Reglamento (1934) · Acusación contra Azaña y Casares · Estraperlo y Nombela |
| III | Las Cortes de 1936 se constituyen · Comisión de Actas (Cuenca y Granada) · Destitución de Alcalá-Zamora · Orden público en la primavera de 1936 |
| IV | Las Cortes en guerra |
| V | Las Cortes en el exilio |

Los debates (L2) traen **todas las intervenciones de sus sesiones, sin sumario ni comentarios**: «Sufragio femenino»
tiene 770 entradas de las 837 filas v3 del 30-IX y el 1-X-1931. Nunca se dice que «reúnen las sesiones enteras».

Hay además cinco bibliotecas transversales: Discursos principales (1931-1945), Sesiones decisivas, Sesiones que estudia
la literatura, Sesiones más crispadas y Anécdotas y amenazas. Las tres de sesiones (L3) sí traen el acta entera. **La
segunda y la cuarta se describen sin el índice de reacción del que salen**: «Sesiones decisivas» mezcla el criterio
externo (la bibliografía) y el interno (el índice); «Sesiones más crispadas» sale solo del índice. La tercera sale de
la bibliografía.

#### D. Sesiones y votaciones · `/es/cortes/sesiones/`

- **Propósito.** Saber qué se votó en voz alta y encontrar una sesión.
- **Palabras.** 500–700.
- **Movimientos:**
  1. H1: «¿Qué se dijo aquel día, y qué se votó?».
  2. **F26, completa.** **Seis votaciones nominales escogidas**, en cinco sesiones, con el texto literal del resultado
     y el total al lado: «de las que el Diario imprime con su lista» ({{votos.filas}} filas de {{votos.sesiones}}
     sesiones en la V2; hoy, 969 de 394). Aparte, y rotulada como tal, la votación ordinaria del mismo 1-X-1931
     (141–106).
  3. **Todas las votaciones nominales.** Un registro tipográfico, no una figura: el recuento por etapa (filas con
     lista y sesiones; hoy, en la V2, I 500/200 · II 391/160 · III 76/32 · IV 2/2 · V 0) y, en la pestaña Datos, la
     tabla por sesión con fecha y totales («Total, N» leídos). Lo calcula el exportador con las variantes «dijeron» y
     «han dicho», y declara su base. Solo el 13-X-1931 hay al menos seis (V2 6738, 6812, 6818, 6844, 6923 y 6994).
  4. **Ocho puertas de lectura**, en registro de calendario. Las siete de la 0.2 no se pintan hasta que existan.
  5. **Cualquier otra sesión:** cómo encontrarla en el explorador (Desde y Hasta, Nº de sesión, como pasos escritos
     sin botón: no hay consulta de texto que copiar) y cómo citarla (fecha y número; frase ↺ 4).
  6. **«Que esté no quiere decir que esté entera»**:
     - la sesión 48, truncada al final;
     - la sesión 9, con un bucle del reconocimiento óptico (V2 976);
     - las 14 posteriores a julio de 1936, con las páginas sin verificar.
- **Llamadas.** Cada votación → su puerta, o su fila en la tabla si no tiene puerta; [Descargar los datos de la
  figura].
- En la 0.2, F26 crece a su versión con nombres en esta misma página, sin ruta nueva.

#### E. Puerta de lectura ×8 (+7) · `/es/cortes/sesiones/<nombre>/`

- **Público.** El docente, el historiador y el periodista.
- **Palabras.** 350–500.
- **Datos.** `puertas.json` y `citas.json`, del exportador.
- **Movimientos:**
  1. H1 con el hecho («El voto de las mujeres»). Antetítulo en mono: fecha larga · sesión núm. · etapa · «DSCCRE núm.
     48, pp. 1347–1394 (metadatos del proyecto; el explorador no los muestra)».
  2. **Qué pasó**, en 150–250 palabras, con sus hechos [EXT] referenciados.
  3. **Lo que dice el Diario**: de 2 a 4 citas literales en cursiva, con orador, **V2 id · v3 id** y el [sic] del
     reconocimiento óptico cuando cambia el sentido. **El exportador comprueba cada cita letra a letra en las
     ediciones que declara `citas.json`** (`V2+v3`, `solo_v3` o `atribucion_distinta`), y el copy rotula las dos
     últimas (↺ 2).
  4. **La sesión, turno a turno** (F30), con las cifras al margen: filas y palabras (V2), diputados, filas de más de
     300 palabras y filas v3, rotuladas. Si la puerta abarca varias sesiones, un pequeño múltiplo por sesión, sin
     conmutador.
  5. **Votación**, si la hay: F26 mínima.
  6. **Cómo encontrarla en el explorador**: los filtros exactos como pasos escritos, una consulta de texto con su
     recuento fechado y [Copiar la consulta], y el debate preparado por su nombre exacto.
  7. **Lo que no está**, si procede. Por ejemplo: la frase atribuida a Ibárruri.
  8. **Fuentes** [A] e [I].
  9. **Cómo citar un pasaje**, y las vecinas.
- **Figuras.** F30 y F26 mínima.

#### F. El Diario de Sesiones · `/es/diario/`

- **Propósito.** La fuente como objeto histórico: qué recoge, qué calla, cómo se cita.
- **Público.** El historiador, el archivero, el docente.
- **Palabras.** 1.600–2.000, con índice lateral.
- **Movimientos:**
  1. **¿Qué es un Diario de Sesiones?**:
     - la fórmula impresa del orador («El Sr. APELLIDO:»);
     - las acotaciones;
     - las votaciones nominales con su lista;
     - el sumario;
     - los documentos leídos.
  2. **Cuatro series, dos de ellas extractos.** 405 · 336 · 9 · 5 (proyecto). Páginas verificadas en todas las sesiones
     anteriores a la guerra (741 de 755). 28.780 páginas, solo como «recuento de los archivos del proyecto».
  3. **«Luz y taquígrafos», diez veces** (F27). Abre con el grito del 8-VI-1934. Que Royo Villanova atribuya la
     fórmula a Maura es una atribución suya; su origen es [EXT].
  4. **Lo que el Diario calla** (F28): al menos siete órdenes de la Presidencia y tres acotaciones «no se consigna
     por orden». Además, lo que otras fuentes cuentan y el Diario no recoge.
  5. **La fuente habla de sí misma**:
     - la nota del volumen de guerra sobre Figueres («NO EXISTE DATO ALGUNO», v3 121110) y la nota posterior que la
       corrige: el número 69 se obtuvo después por fotocopia (V2 107341 · v3 121465). El propio extracto nombra el
       «Castillo de Figueras» (V2 107337 · v3 121459). Ya no depende del PDF;
     - 1.508 filas de la V2 mencionan el «Diario de Sesiones»: 1.144 son de diputados desde su escaño y 232 de la
       Presidencia. Sin «como arma» ni «como prueba», que no está medido.
  6. **Cómo citar un pasaje**: Diario, número, fecha y páginas (proyecto), más el id de la fila con su edición.
     Frase ↺ 1.
- **Opcional.** El facsímil (D-14). En la 0.2, F13–F14 si se aprueba (D-11).

#### G. Método · `/es/metodo/`

- **Propósito.** Lo que preguntaría un revisor, con cada límite en la frase de su cifra.
- **Público.** Revisor, investigador, docente de métodos.
- **Palabras.** 2.400–2.800, en 10 apartados de 200–300, con índice lateral y banda fija.
- **Cada apartado se cierra con un «Pruébelo» doble:** [Copiar la consulta] para el explorador y una línea de R o
  Python.

| # | apartado (pregunta de revisor) | pieza visual | Pruébelo |
|---|---|---|---|
| 01 | ¿Qué es una fila? | F20: V2 5423–5424 frente a v3 6078–6079 | `d[d.id == 5424]` · la sesión 48 en el explorador |
| 02 | ¿Cómo se pasa del Diario impreso a la fila? | F19: cinco pasos, con la cifra de cada uno | el changelog depositado |
| 03 | ¿Qué falló en el reconocimiento óptico? | Las cinco filas finales de la sesión 48, literales | la sesión 48, las cinco últimas: «Orden 411» a «Orden 415» en la pantalla del explorador (`ord` 410–414 en la v3) |
| 04 | ¿Quién habla? | — | `d[d.rep_id.isna()].speaker.value_counts()` |
| 05 | ¿Qué es habla y qué no? | F10/F11 | `"casas viejas"` con y sin «Solo lo que se habla» |
| 06 | ¿Por qué hay dos ediciones? | F12 | Azaña, 27-V-1932, en el explorador |
| 07 | ¿Qué fechas se corrigieron? | enlace a F25 (Versiones) | la sesión 77 de 1933-1935 |
| 08 | ¿Qué significan partido, familia e ideología? | — | `d[d.party == "CEDA"].ideology.value_counts()` |
| 09 | ¿Qué no afirma el corpus, y cómo comparar? | cuatro cajas vacías (las de Inicio, en pequeño) | la lista del 161–121 dentro de V2 5453 |
| 10 | ¿Dónde está la documentación completa? | — | el README depositado, con la frase ↺ 11 |

#### H. Usar los datos · `/es/datos/`

- **Propósito.** Pasar de «quiero» a «tengo el archivo abierto, sé qué significa cada columna, sé unirlo y sé
  citarlo».
- **Público.** Quien va a descargar: investigador, estudiante de doctorado, analista.
- **Palabras.** 2.600–3.000, más el diccionario, con índice lateral.
- **Movimientos:**
  1. **Por dónde empezar** (`#empezar`): la escalera.
  2. **El camino hasta el archivo**:
     - la frase ↺ 3 y «158,1 MB»;
     - los cuatro archivos de la V2.0, con sus bytes y su MD5;
     - cómo leerlo: `;`, UTF-8, comillas dobles;
     - **«No lo abra en una hoja de cálculo: 289 filas superan los 32.767 caracteres de una celda de Excel.»**
  3. **Las 14 columnas** (F32): cada una con su ancla, su definición, su valor en las filas 5423 y 5424 y **su trampa
     de significado** al margen.
  4. **Antes de contar: seis decisiones que cambian el resultado**, cada una con su cifra y su línea de código.
  5. **Cinco maneras de contar «palabra»** (F33).
  6. **Unir con Afinidades Elegidas** (F34): la clave correcta, la recodificación, los casos sin ficha y el error de
     unir solo por id. **Depende de D-3**: se construye con Afinidades, la última; hasta entonces, la regla y el
     fragmento, sin cifras.
  7. **Dos fragmentos probados**, en R y en Python. **El exportador los vuelve a ejecutar**, y la compilación falla si
     su salida no coincide con `src/data/`.
  8. **Cómo citar**:
     - THQCMI en texto, BibTeX y RIS;
     - CGOCUS, tal como la da Dataverse;
     - una figura, con su ancla, su base y su fecha;
     - un pasaje.
  9. **Erratas y contacto**: «díganos fecha, número de sesión, id de fila con su edición y lo que dice el Diario
     impreso».

#### I. Versiones · `/es/datos/versiones/`

- **Propósito.** Qué cambió, qué citar y por qué hay dos cifras.
- **Palabras.** 1.100–1.400, con índice lateral.
- **Movimientos:**
  1. **Tres versiones depositadas** (V1.0 · V1.1 · V2.0) y F25, con las siete fechas corregidas.
  2. **La v3 del explorador**: qué es y adónde va cada fila (F18, en tabla).
  3. **Qué cambia en un resultado**: F07, el efecto Presidencia y quién habla más según la base.
  4. **Identificadores**:
     - la clave común (fecha y número de sesión, 755 = 755);
     - `mapa_v2_v3.json`, que no está publicado;
     - la frase ↺ 4.
  5. **Qué base usa cada figura de este sitio** (F35): una tabla generada del registro `lib/figuras.ts`, con la huella
     y la fecha.
  6. **Cómo citar cada edición.** El explorador sirve la v3, pero su cita dice «V2» (D-18).

#### J. El explorador · `/es/explorador/`

- **Propósito.** Qué hace la herramienta, con capturas reales, y qué no hace.
- **Público.** Todos; sobre todo quien no programa.
- **Palabras.** 1.400–1.700, con 10–12 capturas, índice lateral y banda fija.
- **Movimientos** (`estudio_lyt_explorador.md` §6, con los pies corregidos):
  - 8.1 **Cabecera**: «Busque, lea y cite lo que se dijo en las Cortes de la República», con NotaBases. En EN, que la
    herramienta está solo en español.
  - 8.2 **Primero, encontrar**: cuatro preguntas; F29, búsquedas de muestra con recuento fechado.
  - 8.3 **Leer como en el Diario**: lector, sesión corrida (pie ↺ 8) y careo, «una réplica propuesta, no un diálogo
    probado».
  - 8.4 **Después, enfocar: las bibliotecas**: F17 y el Léxico del sufragio femenino, con «son las sesiones
    enteras».
  - 8.5 **Coocurrencias**: «la red se calcula y se exporta; no se dibuja».
  - 8.6 **Menciones** (D-17).
  - 8.7 **Llevárselo, citado**: el aviso de que la cita dice V2 y los ids son de la v3.
  - 8.8 **Cómo empezar**: «unos 112 MB comprimidos la primera vez» (regla de la crítica mientras se decide D-26), sin
    formulario; «Recordar la base» solo si se ha comprobado (C4).
  - 8.9 **Lo que pide, y lo que no hace**: la lista literal. La línea «No se abre desde un enlace» va bajo el
    interruptor `ENLACES_PROFUNDOS`, con sus dos redacciones (D-4).
- **Figuras.** F17, F29 y las capturas.

#### K. Afinidades Elegidas · `/es/afinidades/`

- **Propósito.** La base derivada, con su propia pregunta: ¿con quién estaban dispuestos a firmar?
- **Público.** Quien estudia coaliciones, redes o carreras parlamentarias.
- **Palabras.** 1.200–1.500, con índice lateral. **Se construye la última** (D-3).
- **Movimientos:**
  1. **El nombre**: la *afinidad electiva* de Goethe y Weber; «Elegidas» subraya la agencia de quien firma
     (`METHODOLOGY.md`, «Sobre el nombre»). Sello de edición.
  2. **Firmar no es hablar**: qué es una medida y qué es una arista.
  3. **Tres legislaturas en cifras**: censo, quiénes firman y están en el censo, aislados, firmantes sin ficha en el
     censo de esa legislatura (1 / 6 / 1), medidas y **78** diputados en las tres. El exportador la calcula desde el
     censo y el edgelist, con el aserto de que las partes suman el censo.
  4. **¿Se cruzaba de bloque?** F22, dos series.
  5. **Tres redes.** F21, bajo demanda, y [Abrir Afinidades ↗].
  6. **Personas: los puentes**, con nombre, y el aviso de que el PNV está codificado CD.
  7. **Lo que no mide, y cómo se mide.** Hasta 300 palabras, con enlace a `METHODOLOGY.md`.
  8. **Los datos**: los 8 archivos con su peso, la frase ↺ 3, la cita tal cual y [Unir con THQCMI] → `datos/#unir`.

#### L. Raíz y 404

- **Raíz** (`/`): el hemiciclo en pequeño, «Luz y Taquígrafos» y dos enlaces, «Español» y «English». Sin cifras y sin
  redirección por JS.
- **404**: bilingüe apilado, con enlaces a Inicio, Las Cortes y Datos.

#### Dónde va cada una de las 11 advertencias de la landing

| advertencia | dónde va ahora |
|---|---|
| El texto es OCR | Método 03, Explorador 8.9 y el pie de cada cita (↺ 7) |
| Filas ≠ discurso | Método 05 e Inicio 4 |
| La Presidencia tiene partido | Método 04, Datos (columna `rep_id`) y F05 |
| Errores de segmentación de la V2 | Método 06 y Versiones |
| Explorador y CSV no coinciden | Versiones, Explorador 8.1 y NotaBases (↺ 4, 13) |
| Identificación incompleta | Método 04 |
| Categorías gruesas | Método 08 y Datos (columnas `party_family` e `ideology`) |
| Cobertura desigual | Las Cortes y fichas IV y V |
| Fechas auditadas | Método 07, Versiones (F25) y ficha I |
| Lo que el explorador no hace | Explorador 8.9 |
| «Palabra» se cuenta de varias maneras | Datos (F33) y el denominador de cada figura |

---

## Figuras

### Contrato común (heredado de ParlaIbero, corregido)

- **Cinco capas:**
  1. datos generados;
  2. geometría pura (`src/viz/geom/`);
  3. componente `.astro` que emite las formas en SVG y **todo el texto en HTML encima**, con `fmt.dato()`, `data-k` y
     `data-base`;
  4. estado sin JS (radios y `:has()`);
  5. una isla mínima (`src/scripts/figuras.ts`, ≤ 35 KB gz en total).
- **Pestañas** (`Pestanas.astro`, **configurable por paneles y rótulos**: Gráfico · Tabla · Datos por defecto, y también
  Lista · Datos, solo Tabla o Tabla de grados · Datos), con radios y `:has()`. Sin `:has()`, las vistas se leen
  seguidas. La de ParlaIbero lleva fijos tres paneles y lanza un error con otro número de rótulos: se reescribe.
- **Nota emergente anclada al elemento**, con cifra, numerador y denominador. Se escribe por **plantilla**
  (`data-plantilla` más `data-v-*`), no con 755 frases en el HTML.
- **Teclado.** Una parada por fila o grupo; ← → Inicio Fin recorren; Esc cierra. Región `aria-live` solo al recorrer
  con teclado. **Las dianas son enfocables**, que era el defecto de FigVoz.
- **Táctil.** Un toque en una marca muestra su nota; un segundo toque, o el enlace, navega. Las dianas miden 44 px
  como mínimo, **salvo en las marcas densas** (las barras de sesión de F01, las de F30, las franjas finas de F09 y los
  nodos de F21): ahí la diana es el grupo (el mes, la etapa) y la marca se alcanza por la Tabla, que es su alternativa
  accesible.
- **La isla vuelve a enlazar sus escuchadores** cuando se sustituye una figura, que era el defecto de ParlaIbero.
  La frase «Con el teclado…» nace oculta y solo la enseña la isla.
- **Pestaña Datos:**
  - CSV, XLSX y LÉAME (es, en), con QUÉ MIDE · DENOMINADOR · SALVEDAD · **BASE (huella y fecha)** · CITA;
  - la frase ↺ 12;
  - SVG y PNG solo en F01 (la completa) y F26.
- **Reglas de dibujo:**
  - la ausencia nunca es un color;
  - lo no revisado lleva otro trazo, no solo otro color;
  - rampa en oro validada en los dos temas, con `--atenua` por tema;
  - ningún texto dentro del SVG.
- **Registro único** `lib/figuras.ts`: id, ancla, ruta, base, archivos y huella. De él salen el LÉAME, la cita de
  la figura y la tabla de Versiones (F35).

### Catálogo de la edición 0.1

Hay una correspondencia con los identificadores de las propuestas, para seguir las notas de los jueces:
- F01 reúne N4, F01 y N6 de «historia», N01 de «datos» y F01/F01r de «interactivo»;
- F26 es N1 de «historia»;
- F27 y F28 son N2 y N3;
- F05 es N5;
- F07 es N04 de «datos»;
- F32, F33 y F34 son C, N02 y N03 de «datos».

| id | figura | páginas | base | interactiva |
|---|---|---|---|---|
| H | Hemiciclo de 1936 (croquis de Gil Robles) | Inicio, raíz | croquis | resalte por bloque, solo CSS |
| F01 | Calendario de las 755 sesiones (F01c compacta · F01 completa · F01e recorte de etapa) | Inicio, Las Cortes, fichas | V2 + proyecto | sí |
| F16 | Bandas de presidente titular y Gobierno (dentro de F01e) | fichas | proyecto | sí |
| F26 | Lo que se votó en voz alta (0.1: totales; 0.2: nombres) | Inicio, Sesiones, puertas | V2 (texto) · v3 ids | sí |
| F05 | Quién tomó la palabra en la etapa | fichas | v3 | sí |
| F09 | Qué familias ocupan la palabra | fichas | V2 | sí |
| F30 | La sesión, turno a turno (un múltiplo por sesión de la puerta) | puertas | V2 | sí |
| F27 | «Luz y taquígrafos», diez veces | El Diario | V2 = v3 | sí (línea de tiempo) |
| F28 | Lo que el Diario calla | El Diario | V2 = v3 | sí (línea de tiempo) |
| F20 | Anatomía de una fila | Método 01 | V2 · v3 | sí (conmutador) |
| F19 | Del Diario a la fila, en cinco pasos | Método 02 | V2 + proyecto | pasos desplegables |
| F10/F11 | Trámite frente a discurso | Método 05 | V2 | sí |
| F12 | La fila más larga no es un discurso | Método 06 | V2 → v3 | sí |
| F32 | Las 14 columnas | Datos | V2 | anclas y notas |
| F33 | Cinco maneras de contar «palabra» | Datos | V2 · v3 | nota |
| F34 | Unir con Afinidades | Datos | V2 × CGOCUS V1.1 | tabla |
| F25 | Siete fechas corregidas | Versiones | V2 | sí |
| F18 | Adónde van las 107.551 filas | Versiones | V2 → v3 | tabla con nota |
| F07 | ¿Quién habla más? Depende de la base | Versiones | V2 y v3 | sí |
| F35 | Qué base usa cada figura | Versiones | registro | tabla |
| F17 | Los 31 debates y sesiones preparados, en el tiempo | Explorador | v3 | sí |
| F29 | Búsquedas de muestra | Explorador | v3 | copiar |
| F22 | Dos cruces | Afinidades | CGOCUS | sí |
| F21 | Tres redes | Afinidades | CGOCUS | sí |
| — | Capturas del explorador (10–12) | Explorador | v3 | ampliación sin JS |

### Fichas de figura

Cada ficha dice:
- la pregunta;
- el dato y su fichero;
- la base;
- la codificación;
- la interacción (ratón · teclado · táctil);
- qué hay en cada pestaña;
- cómo se ve sin JS;
- qué se descarga;
- **la salvedad rotulada**, que es el texto que va al pie de la figura, en borrador para la Puerta 2.

#### H · Hemiciclo de 1936

- **Pregunta.** ¿Cómo se sentaba la Cámara de 1936?
- **Dato.** `aecpa2026/figs/data/hemiciclo_1936.json` (27.108 B). Es **el único** archivo que se toma de `figs/data/`.
  Fuentes, en el propio JSON:
  - el plano del Congreso de los Diputados (planta del hemiciclo, propuesta de accesibilidad, F. Pardo Calvo);
  - J. M. Gil Robles, *No fue posible la paz* (Ariel, 1968), p. 524.
- **Base.** Croquis.
- **Codificación.** Un escaño es un punto, coloreado por la minoría del sector del croquis. Hay 18 grupos en cuatro
  bloques: der · cen · izq · gob. **El dibujo no se toca**; se porta `landing/hero_svg.py` a `Hemiciclo.astro`.
- **Interacción: ninguna, salvo que se apruebe D-27.** Hoy `hero_svg.py` genera un SVG estático con leyenda, y así se
  porta. **Propuesta (D-27), solo con CSS:** cuatro radios de bloque (Derechas · Centro · Izquierdas · Gobierno); pasar
  el puntero por la leyenda o darle el foco atenúa el resto con `--atenua` por tema. En táctil, los radios.
- **Lenguas.** El `<title>` y el `<desc>`, escritos a mano en `hero_svg.py`, y los nombres de las 18 minorías salen del
  copy con una clave por entidad, en las dos lenguas.
- **Pestañas.** Ninguna. Es portada, no figura de datos.
- **Sin JS.** Idéntica.
- **Descarga.** Ninguna. La imagen social sale de ella (`og.mjs`).
- **Salvedad rotulada.** «Las minorías de las Cortes de 1936 según el croquis de Gil Robles (*No fue posible la paz*,
  1968, p. 524), llevadas al plano del Congreso. Cada color es un escaño del plano, no un diputado.» **Ninguna cifra en
  la figura.**

#### F01 · Calendario de las 755 sesiones (una sola familia, tres escalas)

- **Pregunta.** ¿Cuándo se reunieron las Cortes, cuánto se habló en cada sesión y qué falta?
- **Dato.**
  - `src/data/sesiones.json`, del exportador, sobre la V2: por sesión, fecha, número, etapa, filas, palabras,
    diputados, filas de más de 300 palabras, rango de ids y `meta` rotulada (con su campo `verificar`). Se aligera a
    unos 150 KB sin el clima.
  - `src/data/meses.json`: 173 meses, con estado, sesiones, filas y palabras (`critica/cobertura_mes_v2.json`).
- **Base.** V2. Los metadatos de sesión, rotulados «proyecto».
- **Codificación.** Rejilla **año × mes, agrupada por etapa**:
  - I: 1931 (VII–XII), 1932 y 1933 (I–X);
  - II: 1933 (XII), 1934 y 1935;
  - III: 1936 (III–VII);
  - IV: 1936 (X–XII), 1937, 1938 y 1939 (I–II);
  - un «//» rotulado «1939-03 → 1944-12: 70 meses; el corpus no contiene ninguna sesión»;
  - V: 1945.

  Son 12 filas de 12 columnas: cabe a 360 px, pero cada mes mide unos 24 px y cada barra de sesión, alrededor de 1 px
  (un mes llega a tener 22 sesiones, 1932-03). **En el móvil la diana es el mes**: un toque abre la lista de sus
  sesiones, y la sesión se alcanza por la Tabla. Los anillos de las puertas se ven desde 48 rem; por debajo, la puerta
  va marcada en la lista del mes.

  Hay cuatro estados de mes:
  - con sesión;
  - sin sesión dentro de la etapa, con contorno y rótulo: 1933-01, 1934-08, 1934-09, 1935-04, 1935-08 y los meses
    vacíos de las etapas IV y V;
  - fuera de toda etapa, vacío: 1933-11, 1936-01, 1936-02, 1936-08, 1936-09;
  - «//».

  - **F01c (Inicio):** cada mes es una celda con el tono de sus palabras, en 5 clases por cuantiles sin interpolar y
    con los cortes impresos. Cada bloque de etapa es un enlace a su ficha.
  - **F01 (Las Cortes):** dentro de cada mes, una barra por sesión, con la altura según sus palabras. Las dobles
    sesiones son medias barras. Las 8 puertas llevan anillo y son enlaces.
  - **F01e (fichas):** el bloque de la etapa a todo el ancho, con las bandas F16 debajo.
- **Conmutación** (solo en F01 y F01e): palabras · diputados que intervienen. Se resuelve con variables CSS por
  barra, no con un segundo juego de `rect`.
- **Interacción.**
  - *Ratón:* nota por plantilla. En mes: «febrero de 1933 · 16 sesiones · 1.843 filas · 574.317 palabras (V2)». En
    sesión: «1 oct. 1931 · sesión 48 · 395 filas · 41.963 palabras (V2) · DSCCRE núm. 48, pp. 1347–1394 (metadatos
    del proyecto)». Un clic en una sesión con puerta lleva a su puerta; en las demás, abre bajo la figura su ficha
    breve con «Cómo encontrarla en el explorador», en pasos escritos (Desde y Hasta con su fecha): no hay consulta de
    texto que copiar.
  - *Teclado:* una parada por etapa; ← → recorren meses o sesiones; Inicio y Fin; Esc.
  - *Táctil:* un toque en un mes, su nota y la lista de sus sesiones; el enlace de etapa navega.
- **Pestañas.**
  - Gráfico.
  - Tabla: 64 meses con sesión, más una fila por hueco con su rango. **La tabla por sesión no va en el HTML**: las
    755 sesiones pesarían unos 300 KB. Va en `sesiones.csv`; en cada ficha, la tabla de su etapa.
  - Datos: `sesiones.csv` (sin las columnas de `meta` mientras D-19 siga abierta: publicarlas sin formulario
    adelantaría esa decisión), `meses.csv` y LÉAME; **SVG y PNG de F01 completa** (una sola imagen exportable, la de
    Las Cortes; F01c es su resumen).
- **Sin JS.** El gráfico se ve entero, cada etapa es un enlace y la Tabla se abre con su radio.
- **Salvedad rotulada.** «El tono dice cuántas palabras se imprimieron, no cuánto importó. Las causas de un mes sin
  sesión —receso, disolución, guerra— no salen del corpus y no se rotulan.» En IV y V: «Extractos oficiales, no Diario
  íntegro; páginas sin verificar.»
- **Riesgos.**
  - Presentar los metadatos del proyecto como si los enseñara el explorador.
  - «Presidente titular» no es «quién presidía»: en 586 de 755 sesiones un vicepresidente presidió algún tramo
    (`parse_speaker`, 10.025 filas; la búsqueda literal da 584 y 10.009).

#### F16 · Presidente titular y Gobierno (bandas de F01e)

- **Pregunta.** ¿Quién era el presidente titular de cada sesión, según los metadatos del proyecto, y qué Gobierno
  había?
- **Dato.** `sesiones.json › meta.presidente/gobierno` (proyecto), **con el campo `verificar`**; `gobierno_v2.json` (22
  Gobiernos).
- **Base.** Proyecto.
- **Codificación.** Dos bandas **repetidas bajo cada fila de año** del recorte, porque F01e parte el tiempo en filas y un
  Gobierno que cruza de año (Lerroux II, de 1933-XII a 1934) no cabe en una banda continua. Cada tramo lleva su nombre
  cuando cabe, y «→» cuando continúa en la fila siguiente. **Los tramos con `verificar: true` van con otro trazo y la
  nota «por verificar»**: las 14 sesiones de Jiménez de Asúa, la de Fernández Clérigo y el Gobierno Giral. Se decide
  antes de estimar F01; la otra opción, un F01e lineal por etapa, se descarta porque rompe la gramática de F01.
- **Interacción.**
  - *Ratón y teclado:* nota con nombre, intervalo y número de sesiones. Un clic resalta sus sesiones en el recorte.
  - *Táctil:* un toque, nota.
- **Pestañas.** Tabla con dos listas en registro.
- **Sin JS.** Bandas y tabla.
- **Salvedad rotulada.** «Presidente titular de la sesión, según los metadatos del proyecto: en {{pres.vice_ses}} de
  755 sesiones un vicepresidente presidió algún tramo. Los días de cambio de Gobierno cuentan para el entrante.»

#### F26 · Lo que se votó en voz alta

- **Pregunta.** ¿Qué se votó con nombre y apellido, y por cuánto?
- **Dato.** El texto de las filas, leído por el exportador (`votaciones.json`). Son **seis votaciones nominales
  escogidas**, en cinco sesiones, de las que el Diario imprime con su lista: 969 filas de la V2, de 394 sesiones,
  contienen «Señores que dijeron sí» o «han dicho sí» (970 de 395 en la v3). El exportador calcula el total de
  votaciones y lo da al lado, con su base. Por votación, `votaciones.json` guarda **por separado** las filas del
  resultado, de la lista y del umbral:

  | votación | V2 | v3 |
  |---|---|---|
  | 161–121 (art. 34 del proyecto) | 5453 | 6110 |
  | 178–59 (art. 24 del proyecto) | 6994 | 7800 |
  | 368 de 466 (Constitución) | 13531 (resultado y umbral) · 13525 (lista) | 15043 · 15037 |
  | 318–19 (Reforma agraria) | 37177 (lista) · 37178 (umbral y resultado, al principio de la fila) | 41627 · 41628 |
  | 314–24 (Estatuto de Cataluña) | 37178 (lista) | 41629 · 41630 |
  | 238–5 (destitución de Alcalá-Zamora) | 102358 (resultado y lista) · 102359 (umbral) | 115675 · 115676 |

  Aparte va el **141–106, que fue votación ordinaria** (V2 5453: «En votación ordinaria fue desechada…»).
- **Base.** V2 (el texto de la fila), con los ids v3 al lado.
- **Codificación.** Barras horizontales sí/no por votación, con una línea en «la mitad más uno» donde el Diario la
  imprime, **tres veces**: 234 de 466 (Constitución, V2 13531), 232 de 462 (Reforma agraria, V2 37178; no el Estatuto,
  aunque va en su fila) y 209 de 417 (destitución, V2 102359). La ordinaria lleva **otro trazo** y su rótulo.
- **Interacción.**
  - *Ratón y teclado:* nota con el resultado literal, por ejemplo «Total, 161 · Total, 121 (V2 5453)». Clic → su
    puerta o su fila.
  - *Táctil:* un toque, nota.
- **Pestañas.** Tabla (votación, fecha, sesión, sí, no, V2, v3, texto literal) · Datos (`votaciones.csv`, SVG y PNG).
- **Sin JS.** Barras y tabla.
- **Salvedad rotulada.** «Seis votaciones nominales escogidas. Las listas de nombres están en el texto de las filas, no
  en una columna: la base no trae el voto como variable. En la V2 van dentro de filas de la Presidencia.»
- **En la 0.2:** un punto por nombre impreso, coloreado por la ideología del diputado resuelto; los no resueltos, en
  contorno. La salvedad añade: «Extracto del proyecto, no dato depositado. No estar en una lista no es abstenerse.»

#### F05 · Quién tomó la palabra en la etapa

- **Pregunta.** ¿Quién habló más en esta etapa, sin contar la Presidencia?
- **Dato.** La v3 (`speeches`), con el papel de cada fila calculado por el motor del explorador. Se toman las filas con
  `chair = false` y `role ∉ {summary, remark}`, y se suman las palabras por `rep_id` y etapa. Salen los diez primeros.
  **El control es de 59.938 filas y 21.207.769 palabras de habla sin Presidencia**, de **772** `rep_id` (108.291 y
  22.096.389 son el habla con la Presidencia). Por etapa, palabras (denominador de la nota) y diputados:
  I 11.444.854 (416) · II 8.116.358 (390) · III 1.479.781 (244) · IV 102.052 (43) · V 64.724 (27). Los cinco primeros
  de cada etapa, que se reproducen, están en `01_NARRATIVA_sitio.md`.
- **Base.** v3, con NotaBases.
- **Codificación.** Barras horizontales **en orden fijo por palabras** y con el nombre de la tabla de grafías. No lleva
  conmutador.
- **Interacción.**
  - *Ratón y teclado:* «Azaña · 426.392 de 11.444.854 palabras de habla sin Presidencia de la etapa (v3)».
  - *Táctil:* un toque, nota.
- **Pestañas.** Figura secundaria: Tabla de los diez y Datos en un `<details>` (`oradores_etapa.csv`, con los 772 que
  intervienen fuera de la Presidencia; `rep_name` tal cual y la columna `grafia`, D-22).
- **Sin JS.** Barras y tabla.
- **Salvedad rotulada.** «Palabras de habla en la edición del explorador, sin la Presidencia, sin sumarios ni
  documentos. Hablar mucho no es pesar mucho.»

#### F09 · Qué familias ocupan la palabra

- **Pregunta.** ¿Qué familias políticas se llevan la palabra en la etapa?
- **Dato.** `reparto_v2.json › familia`, extendido por el exportador al corte por etapa. Excluye la Presidencia.
- **Base.** V2.
- **Codificación.** Una tira apilada al 100 %, en orden fijo de familias (izquierda → derecha según su posición media).
- **Conmutación.** Palabras · filas.
- **Interacción.**
  - *Ratón y teclado:* «Republicanos · 51,3 % · n de N palabras sin Presidencia (V2)».
  - *Táctil:* un toque, nota.
- **Pestañas.** Figura secundaria: Tabla y Datos en un `<details>`.
- **Sin JS.** Tira y tabla.
- **Salvedad rotulada.** «“Republicanos” mezcla posiciones de izquierda, centro y derecha. La ideología y la familia
  son las del partido.»

#### F30 · La sesión, turno a turno

- **Pregunta.** ¿Cómo se repartió la palabra en esta sesión?
- **Dato.** Las filas V2 de cada sesión de la puerta, en orden: `order`, `speaker`, `rep_name` y `nwords`, más el papel
  de la Presidencia (`parse_speaker`). **Tres puertas abarcan varias sesiones**: la antesala (45 y 54: 159 y 125 filas),
  México (71 a 74: 5, 56, 27 y 95) y la cuestión religiosa (55 y 56: 378 y 24). F30 es entonces **un pequeño múltiplo
  por sesión**, sin conmutador.
- **Base.** V2.
- **Codificación.** Una barra por fila en su orden, con la altura según sus palabras. La Presidencia va en otro trazo.
  **Las filas del final truncado de la sesión 48 van marcadas.**
- **Interacción.**
  - *Ratón y teclado:* «orden 26 · Campoamor · 1.460 palabras (V2 5424)».
  - *Táctil:* un toque, nota.
- **Pestañas.** Tabla en `<details>`, con solo orden, orador y palabras. **Sin CSV por fila**: serían datos fila a fila
  de una sesión entera, no agregados (↺ 12 sería falsa), y es la «muestra de una sesión» que D-23 rechaza. Se remite a
  la exportación del explorador, con su cita.
- **Sin JS.** Barras y tabla.
- **Salvedad rotulada.** «Una fila por cada vez que el etiquetado reconoció la fórmula impresa de un orador; en la V2,
  algunas filas contienen documentos o turnos de otros.»

#### F27 · «Luz y taquígrafos», diez veces

- **Pregunta.** ¿Cuándo invocaron los diputados la fórmula?
- **Dato.** Diez filas, las mismas en las dos ediciones:

  | fecha | V2 | v3 |
  |---|---|---|
  | 20-VII-1931 | 420 | 472 |
  | 9-IV-1932 | 23898 | 26612 |
  | 3-V-1932 | 24658 | 27477 |
  | 19-VII-1933 | 55902 | 62718 |
  | 3-VIII-1933 | 57506 | 64595 |
  | 8-VI-1934 | 71330 | 80306 |
  | 13-XI-1934 | 75263 | 84760 |
  | 29-I-1935 | 79803 | 89910 |
  | 22-XI-1935 | 99859 | 112827 |
  | 8-VII-1936 | 106747 | 120751 |

- **Base.** V2 = v3.
- **Codificación.** Línea de tiempo 1931–1936 con diez marcas.
- **Interacción.**
  - *Ratón y teclado:* fragmento, orador y fecha. Un clic despliega la cita con su doble id.
  - *Táctil:* un toque despliega.
- **Pestañas.** Lista · Datos.
- **Sin JS.** Lista.
- **Salvedad rotulada.** «Búsqueda de la expresión sobre el texto sin acentos; las variantes mal leídas por el
  reconocimiento óptico no se cuentan. El origen de la fórmula no se afirma aquí.»

#### F28 · Lo que el Diario calla

- **Pregunta.** ¿Qué ordenó la Presidencia que no constara en el Diario?
- **Dato.** Lo construye la **lectura**, no un recuento. La expresión «no constar(á|án) en el Diario» sobre el texto
  plegado da 9 filas. Leídas una a una:
  - **7 son órdenes de la Presidencia**: V2 13605 · 45115 · 45440 · 102484 · 102492 · 103251 · 106290 / v3 15129 ·
    50466 · 50818 · 115828 · 115836 · 116698 · 120222;
  - **1 es la petición de un diputado**: Calvo Sotelo, 3-VI-1936 (V2 104406 / v3 118058);
  - **1 no tiene relación**: V2 64659 / v3 72690.

  Se suman **3 acotaciones «no se consigna(n) por orden»**: V2 103182 · 105324 · 106289 / v3 116626 · 119098 · 120221.
- **Base.** V2 = v3.
- **Codificación.** Línea de tiempo con diez marcas: las 7 órdenes y las 3 acotaciones, estas en otro trazo. La
  petición va en contorno.
- **Interacción.** Como F27.
- **Pestañas.** Lista · Datos.
- **Sin JS.** Lista.
- **Salvedad rotulada.** «Al menos: las variantes del reconocimiento óptico no se detectan. La búsqueda exacta de la
  frase en plural devuelve 7 filas, que no son las mismas 7.»

#### F20 · Anatomía de una fila

- **Pregunta.** ¿Qué trae cada fila del CSV?
- **Dato.** V2 5423 y 5424; v3 6078 y 6079.
- **Base.** V2, con la v3 rotulada.
- **Codificación.** Las 14 columnas en clave–valor. El texto va en cursiva y cortado con «[…]».
- **Conmutación.** «Como en el CSV» · «como en el explorador». La segunda muestra los campos que añade la v3 y los
  órdenes: 25 y 26 en la V2, 28 y 29 en la v3, «Orden 29» y «Orden 30» en la pantalla del explorador.
- **Interacción.**
  - *Ratón y teclado:* cada columna despliega su definición.
  - *Táctil:* un toque.
- **Pestañas.** Ninguna; es tabla.
- **Sin JS.** Conmutador con radios.
- **Salvedad rotulada.** «El id cambia entre ediciones (↺ 4). La ideología de Campoamor es C porque es la de su
  partido.»

#### F19 · Del Diario a la fila, en cinco pasos

- **Pregunta.** ¿Cómo se pasa de 755 números del Diario a 107.551 filas?
- **Dato.** Los pasos de `estudio_lyt_datos.md` F19, sin la confianza que solo trae el .docx no depositado:
  1. 755 números del Diario;
  2. 28.780 páginas (recuento de los archivos del proyecto), con 153 fallidas en la primera pasada;
  3. 107.556 etiquetas, tras quitar 1.532 falsos positivos;
  4. 107.551 filas;
  5. 107.404 filas con diputado y 367 asignaciones corregidas a mano.
- **Base.** V2 y proyecto, más dos bases propias: `readme` (el README depositado, V1.0, MD5 `f2638800…`, rotulado
  ↺ 11) para 1.532, 107.556 y 367, y `ocr` (la huella de los `TXT_OCR/*.meta.json` locales) para las 153 páginas
  fallidas. Si la huella de `ocr` no se puede fijar, la 153 se quita.
- **Codificación.** Esquema horizontal numerado; en el móvil se apila.
- **Interacción.** Cada paso se despliega (`<details>`) con su procedencia y enlaza a su apartado.
- **Sin JS.** Idéntica.
- **Salvedad rotulada.** «La diferencia de 5 entre etiquetas y filas no está documentada.»

#### F10/F11 · Trámite frente a discurso

- **Pregunta.** ¿Cuántas filas son breves y cuánto texto se llevan las largas?
- **Dato.** `longitud_v2.json`: 10 tramos logarítmicos × papel (Presidencia o resto) × legislatura, más una curva de
  100 puntos.
- **Base.** V2. La v3 va en una línea: 69,0 % de filas de 50 palabras o menos.
- **Codificación.** Histograma. F11 es una curva de concentración con puntos anotados, sin deslizador.
- **Conmutación.** Filas · palabras: la masa se desplaza de izquierda a derecha.
- **Interacción.**
  - *Ratón y teclado:* «≤ 50 palabras · 71.550 de 107.551 filas».
  - *Táctil:* un toque.
- **Pestañas.** Tabla · Datos.
- **Sin JS.** Histograma en filas y tabla.
- **Salvedad rotulada.** «Se mide la longitud; “de trámite” es una interpretación.»

#### F12 · La fila más larga no es un discurso

- **Pregunta.** ¿Por qué hacía falta la v3?
- **Dato.** `mapa_v2_v3.json` (local, sin publicar) para tres filas:
  - V2 55221 → v3 61929–61932;
  - V2 25979 → v3 29041–29042;
  - V2 85330 → v3 96282.
- **Base.** V2 → v3.
- **Codificación.** Una barra por fila V2, partida en tramos (habla · documento · turno rescatado · Presidencia).
- **Interacción.**
  - *Ratón y teclado:* el comienzo del texto de cada tramo, con su id v3.
  - *Táctil:* un toque.
- **Pestañas.** Tabla · Datos.
- **Sin JS.** Barras y tabla.
- **Salvedad rotulada.** «Las palabras de la v3 se prorratean. La correspondencia fila a fila no está publicada.» En
  V2 55221, lo que no es de Prieto son una tabla (527 palabras) y los «DOCUMENTOS COMPLEMENTARIOS DEL DISCURSO DEL
  SEÑOR MINISTRO DE OBRAS PUBLICAS» (21.111): anexos impresos, no un documento leído.

#### F32 · Las 14 columnas

- **Pregunta.** ¿Qué significa cada columna, y dónde engaña?
- **Dato.** Las filas 5423 y 5424 y la trampa de cada columna, verificada:

  | columna | trampa |
  |---|---|
  | `id` | Contiguo del 1 al 107.551. Estable solo dentro de la V2; la v3 renumera (5424 → 6079). No es el orden. |
  | `num_session` | Se reinicia en cada legislatura: la sesión 1 existe tres veces. La sesión se identifica por (`date`, `num_session`): 755 claves en 752 fechas. |
  | `order` | Empieza en 0 y es contiguo en cada sesión. Campoamor es 26 en la V2, `ord` 29 en la v3 y «Orden 30» en la pantalla del explorador. |
  | `date` | 7 sesiones cambiaron de fecha de la V1 a la V2 (F25). |
  | `speaker` | El rótulo impreso, leído por el reconocimiento óptico. Es la única columna que distingue el cargo. |
  | `speech` | Incluye acotaciones, interrupciones transcritas, documentos leídos y listas de votación: el 161–121 va en una fila de la Presidencia (V2 5453). |
  | `rep_id` | Una persona, no un escaño. La Presidencia va al `rep_id` de quien preside. 147 vacíos: 123 de ministros sin identificar (casi todos sin escaño, según el README); el resto, rótulos de Secretaría (11) o Presidencia (7) sin nombre y 6 oradores mal leídos, como Blasco-Ibáñez (V2 97389). El `rep_id` 836 reúne dos nombres (pendiente del autor). |
  | `rep_name` | Grafía normalizada sin tildes («Clara Campoamor Y Rodriguez»): no la copie en un texto. |
  | `district` | 54 valores, uno la errata «Agrarios» (8 filas). Es la circunscripción, no el lugar de nacimiento. |
  | `party` | Por diputado y legislatura. «Indep.» aquí e «Independiente» en CGOCUS. |
  | `party_family` | 33 valores en bruto con variantes de grafía («Repubicanos», «Republicanoses»). 151 vacíos. El explorador los normaliza a 25. |
  | `ideology` | La del partido. En 5 partidos hay más de un código (6 si no se quita el espacio de las 93 filas «C »). La Presidencia lleva la ideología de quien preside. |
  | `nwords` | Trozos separados por el carácter espacio. Con `split()` salen 24.700.474, no 24.335.896. |
  | `legislature` | «1933-1935» aquí y «1933-1936» en CGOCUS. «1936-1939» incluye la guerra y México. |

- **Base.** V2.
- **Codificación.** Tabla ARIA (`Columnas.astro` **sin tira de llenado**, que en LyT no informa: 8 columnas al 100 % y
  6 al 99,73–99,93 %).
- **Interacción.** Anclas `#col-<nombre>` con `:target`.
- **Sin JS.** Idéntica.
- **Salvedad rotulada.** «Definiciones del README depositado, que describe la V1 (↺ 11), corregidas donde la V2
  cambió.»

#### F33 · Cinco maneras de contar «palabra»

- **Pregunta.** ¿Cuántas palabras hay?
- **Dato.**

  | recuento | valor | base |
  |---|---|---|
  | `nwords` | 24.335.896 | V2 |
  | `split()` | 24.700.474 | V2 |
  | total | 25.364.144 | v3 |
  | habla | 22.096.389 | v3 |
  | tokens de la Tendencia | 25.903.736 | v3 |

- **Base.** V2 y v3, rotuladas.
- **Codificación.** Cinco barras con su definición.
- **Interacción.** La nota da la definición y la línea de código.
- **Pestañas.** Tabla.
- **Sin JS.** Tabla.
- **Salvedad rotulada.** «Cada figura de este sitio dice cuál usa. “34 millones” no sale de ninguna.»

#### F34 · Unir con Afinidades

- **Pregunta.** ¿Cómo se une la V2 con CGOCUS sin multiplicar filas?
- **Dato.** La clave es `rep_id` = `id_dip` **más** la legislatura, recodificando «1933-1935» → «1933-1936»:
  - casan 1.047 de los 1.060 pares diputado-legislatura;
  - 13 pares (426 filas) no tienen ficha;
  - si se une solo por id, las filas pasan de 107.551 a 247.327;
  - hay 31 pares con otro rótulo de partido. Casi siempre es «Indep.» frente a «Independiente»; también Giral,
    ACR/AR.
- **Base.** V2 × CGOCUS V1.1.
- **Codificación.** Tabla con los pasos; los 13 casos, en `<details>`.
- **Sin JS.** Idéntica.
- **Salvedad rotulada.** «Cambia con Afinidades v2 (D-3).»
- **Cuándo se construye.** Con Afinidades, la última. Sus cifras exactas van en su pestaña Datos con el sello «CGOCUS
  V1.1, depositada» y salen del exportador; el texto de Datos §6, mientras D-3 siga abierta, da la regla y el fragmento
  sin cifras.

#### F25 · Siete fechas corregidas

- **Pregunta.** ¿Qué cambió de la V1 a la V2?
- **Dato.**
  - El changelog depositado (rangos de id).
  - `erratas_fechas_V1.csv` (local): 7 sesiones y 894 filas. La sesión 77 cambia también de legislatura.
- **Base.** V2.
- **Codificación.** Flechas sobre la línea de tiempo, de la fecha V1 a la V2.
- **Interacción.**
  - *Ratón y teclado:* la prueba (cabecera, fechas del texto, secuencia).
  - *Táctil:* un toque.
- **Pestañas.** Tabla · Datos.
- **Sin JS.** Tabla.
- **Salvedad rotulada.** «La auditoría no detecta un error de fecha coherente con la secuencia.»

#### F18 · Adónde van las 107.551 filas

- **Pregunta.** ¿Qué diferencia hay entre lo depositado y lo que sirve el explorador?
- **Dato.** 121.700 = 107.556 piezas de habla + 735 turnos rescatados + 12.654 COMENTARIOS + 755 SUMARIO
  (`mapa_v2_v3.json › resumen`). La suma cierra, y también la de las 108.291 filas de habla (107.556 + 735). Las 107.556
  son las etiquetas de orador del proceso, resegmentadas; la V2 tiene 107.551 filas.
- **Base.** v3 (`mapa_v2_v3.json`), frente a la V2.
- **Codificación.** **Tabla con nota, no diagrama de flujo**, mientras siga abierta la diferencia de 5.
- **Salvedad rotulada.** «107.556 piezas de habla, no filas de la V2 (que son 107.551): la diferencia de 5 no está
  documentada. Otros documentos del proyecto dan 729 y 731 turnos rescatados; aquí, 735, el de la correspondencia.»

#### F07 · ¿Quién habla más? Depende de la base

- **Pregunta.** ¿Por qué Besteiro y Alba «hablan» más que nadie en la V2?
- **Dato.** `oradores_v2.json` y el ranking completo en la v3 (del exportador).
  - Besteiro: 1.028.999 palabras en la V2, 995.577 de ellas presidiendo.
  - Alba: 1.024.975 palabras en la V2.
  - Cambio V2 → v3: Besteiro −55,4 %, Alba −67,0 %, Negrín +26,5 %.
- **Base.** V2 y v3, lado a lado.
- **Codificación.** Barras dobles por persona, **en orden fijo por la V2**, para diez personas.
- **Conmutación.** Filas · palabras.
- **Interacción.**
  - *Ratón y teclado:* los dos valores y el porcentaje de cambio. La nota de la Presidencia cita V2 5423.
  - *Táctil:* un toque.
- **Pestañas.** Tabla · Datos (los 773).
- **Sin JS.** Barras y tabla.
- **Salvedad rotulada.** «Es la figura de por qué importan las ediciones, no una medida de importancia.»

#### F35 · Qué base usa cada figura

Tabla generada desde `lib/figuras.ts`, con figura, página, base, archivo, huella (MD5 de la V2 o sha256 de la v3) y
fecha de cálculo. No lleva salvedad: es la salvedad de todas.

#### F17 · Los debates y sesiones preparados, en el tiempo

- **Pregunta.** ¿Qué trae el explorador ya preparado, y cuándo ocurrió?
- **Dato.** `bibliotecas_v3.json`: 31 bibliotecas y 24.029 entradas. Cada sesión va como (fecha, número, entradas).
- **Base.** v3.
- **Codificación.** Un carril por biblioteca, en cuatro grupos, sobre el eje 1931–1945. Cada sesión es una marca con
  el tamaño según sus entradas.
- **Interacción.**
  - *Ratón y teclado:* nombre, entradas y sesiones.
  - Un clic abre su ficha: descripción **sin rutas internas** y los cinco oradores sin Presidencia. También ofrece
    [Copiar el nombre del debate], con «Mis bibliotecas › Añadir bibliotecas del proyecto…».
  - *Táctil:* un toque abre la ficha.
- **Pestañas.** Tabla · Datos.
- **Sin JS.** Carriles y tabla.
- **Rótulos.** El nombre exacto de cada biblioteca, entre comillas. «Sesiones más crispadas», la mayor (5.585 entradas,
  35 sesiones), va con la nota «nombre que le da el explorador; su criterio no se describe aquí» y sin destacarla.
- **Salvedad rotulada.** «Cada debate reúne todas las intervenciones de sus sesiones, sin sumario ni comentarios, no solo
  el debate: el del sufragio femenino trae también la pena de muerte y la huelga de Telefónica. Las tres bibliotecas de
  sesiones traen el acta entera.»

#### F29 · Búsquedas de muestra

- **Pregunta.** ¿Qué devuelve el buscador con consultas reales?
- **Dato.** Recontadas por el exportador con el FTS de la v3 y **fechadas**. Valores del 22-09-2026:

  | búsqueda | resultados |
  |---|---|
  | `"voto femenino"` | 20 |
  | `"voto de la mujer"` | 28 |
  | las dos, unidas con `\|` | 40 |
  | `"casas viejas"` | 375 (316 de habla) |
  | `divorcio` | 531 (454) |
  | `"reforma agraria"` | 2.028 |
  | `"estatuto de cataluña"` | 724 (493) |
  | `"España ha dejado de ser católica"` | 6 |

- **Base.** v3.
- **Codificación.** Lista tipográfica con [Copiar la consulta].
- **Sin JS.** La consulta en `<code>`.
- **Salvedad rotulada.** «Recuentos del {{fecha}} sobre la edición {{v3.huella}}; cambian si cambia la base del
  explorador.»

#### F22 · Dos cruces

- **Pregunta.** ¿Se firmaba con el otro bloque?
- **Dato.** `afin_resumen.json` y el cruce estricto, recalculado desde el edgelist:

  | legislatura | cruce de bloque | cruce estricto |
  |---|---|---|
  | 1931-1933 | 35,1 % | 7,1 % |
  | 1933-1936 | 23,0 % | 2,5 % |
  | 1936-1939 | 7,4 % | 5,8 % |

  Los denominadores son 30.345, 27.172 y 5.990 filas par × medida.
- **Base.** CGOCUS V1.1, o V2.0 si D-3 va por (a).
- **Codificación.** Tres paneles con dos barras cada uno.
- **Interacción.**
  - *Ratón y teclado:* el denominador.
  - *Táctil:* un toque.
- **Pestañas.** Tabla · Datos.
- **Sin JS.** Barras y tabla.
- **Salvedad rotulada.** «“De bloque” cuenta cualquier par de izquierda, centro y derecha; “estricto”, solo
  izquierda con derecha. En 1936-1939 hay {{afin.1936.medidas}} medidas y {{afin.1936.aislados}} aislados: no es una
  tercera foto comparable.» Hoy, 89 y 186: los aislados son fichas del censo sin ninguna arista, en la misma base que
  F21.

#### F21 · Tres redes

- **Pregunta.** ¿Quién firmó con quién?
- **Dato.** **Regenerado por el exportador desde el edgelist y el censo de CGOCUS.** Los `afin_red_*.json` actuales
  tienen 476, 476 y 502 nodos, frente a 475, 470 y 501 fichas del censo.
- **Base.** CGOCUS.
- **Disposición.** Se recalcula en el exportador desde el censo, **con una semilla fija**, para que la imagen no cambie
  en cada exportación (las posiciones actuales son de 476/476/502 nodos).
- **Codificación.** Nodos en SVG, con posición precalculada. Las aristas se **rasterizan en la compilación**: **dos PNG
  por legislatura (oscuro y claro)**, seis en total, conmutados con `[data-theme]` y no solo con la media query.
- **Interacción.**
  - Radios por legislatura.
  - *Ratón y teclado:* nombre, partido y familia.
  - Búsqueda de diputado **en la lista del censo**, que resalta a sus vecinos: la adyacencia llega en un JSON bajo
    demanda.
  - *Táctil:* un toque.
- **Pestañas.** Tabla de grados (los primeros 20; el censo completo, en CSV) · Datos.
- **Sin JS.** Una sola legislatura visible, con su imagen y su tabla, y enlaces a las otras dos: meter las tres en el
  HTML rompería el presupuesto.
- **Peso.** Carga bajo demanda (36–74 KB comprimidos por legislatura).
- **Salvedad rotulada.** «Coautoría no es voto ni acuerdo ideológico. Los roles se asignan por percentiles dentro de
  cada legislatura.»

#### Capturas del explorador

Son 10–12 PNG limpios de `docs/estudio/capturas_explorador/`, **en tema claro sobre placa clara**, con su `LEEME.md`:
URL, fecha, `build_id` `1857031ae8c04b3d`, sha256 del corpus servido y ventana. Se amplían sin JS.

- **Las recomendadas:**
  - `b_busqueda_voto_1440`;
  - `f_tendencia_casas_viejas_panel`;
  - `c_lector_campoamor_ancho_1440`;
  - `c_lector_campoamor_rumores_1440`;
  - `d_sesion_corrida_1440`;
  - `e_careo_ancho_1440`;
  - `g_dialogo_bibliotecas_proyecto_marcada_1440`;
  - `g_lexico_sufragio_sinpanel_1440`;
  - `h_coocurrencias_tema1_sufragio`;
  - `j_exportar_dialogo_1440`;
  - `k_sobre_corpus_panel` (no la `…_recordada`, que enseña «Esta base está recordada… 269 MiB» mientras C4 sigue
    abierto).
- **Si se aprueba D-17:** `i_menciones_matriz_sufragio`.
- **Problemas conocidos.** Las `g_*`, `h_*`, `j_*` y `k_*` se tomaron después de añadir la biblioteca y llevan las marcas
  ◆ (estudio del explorador §1): se repiten en claro con un perfil limpio, o se acepta el ◆ y se explica en el pie.
  `b_busqueda_voto_1440` enseña las insignias de clima, que el sitio no explica hasta D-11: se recorta o se repite sin
  ellas.
- **Para oscuro limpio:** repetir `s29.py` con un perfil nuevo (E3).

### Edición 0.2

| id | figura | página | condición |
|---|---|---|---|
| F03 + F04 | Palabras: cuándo se habló de qué y desde qué bancos | `/palabras/` | D-10. Se recalcula sobre la v3; el hito es la sesión con más apariciones |
| F26 con nombres | Votaciones con nombre | Sesiones | Apellidos resueltos a mano contra el censo y validados por usted. La ambigüedad de apellidos la cuantifica el exportador con una definición explícita; no se usa el «649» del .docx no depositado, que son apellidos distintos, no compartidos |
| F13 + F14 | Acotaciones del Diario | El Diario y puertas | D-11 |
| F23 | Familias que firman juntas (lift) | Afinidades | Con el n de cada familia |
| F08 | Voz frente a censo | fichas | Censo de fichas de Afinidades, no escaños |
| F15 | El banco azul | fichas | Revisar antes los extremos de Negrín I (1,3 %) y II (40,2 %) (C9) |

### Lo que no se dibuja, y por qué

- **El índice de reacción por sesión.** Su definición no está publicada y uno de sus indicadores se llama «INT
  Intensidad extrema». Lo sustituye, en la 0.2, el recuento de acotaciones.
- **Las «acotaciones de conflicto» por sesión, en la 0.1.** Ni en las fichas ni en las puertas, ni como puesto en un
  ranking, hasta que se apruebe D-11.
- **El flujo V2 → v3 como diagrama.** Va como tabla mientras sigan abiertos C5 y C6.
- **El mapa de circunscripciones (F24).** La geometría de la app de Afinidades es GADM, con teselas de MapTiler, y
  su licencia está por aclarar.
- **Menciones como figura interactiva.** Tiene errores de identificación visibles.
- **La red de coocurrencias.** El explorador no la dibuja, y aquí no se fabrica.
- **Los roles de Afinidades como «caída».** Es un artefacto de los percentiles.
- **Los hitos de `hitos.js`.** Solo van hitos anclados en su fila del Diario, o externos con [A] o [I].
- **Un ranking de personas en Inicio.**
- **Todo lo del prototipo de 1931**, incluidas las escenas `tabla`, `tomo` y el nodo de 1931 de `derivacion`.

### Orden de recorte, si el calendario aprieta

1. F29.
2. El conmutador de F20.
3. F30, que se queda en tabla.
4. F21. Afinidades queda con F22 y [Abrir Afinidades ↗].
5. Versiones se funde en Datos.

**No se recortan nunca:**
- F01;
- F26;
- las cinco fichas con su contexto;
- El Diario;
- los 10 apartados de Método;
- las 14 columnas;
- la página Explorador.

Son la respuesta directa a «resume demasiado».

---

## La escalera de descarga y el formulario

| peldaño | título (lo que la persona sabe hacer) | qué recibe | peso rotulado | fricción |
|---|---|---|---|---|
| 0 | **Sin programar** | Los datos de cada figura (CSV, XLSX, LÉAME y, para F01 y F26, imagen SVG y PNG con su cita), alojados en el sitio | unos KB | Sin formulario (↺ 12) |
| 0 | **Sin programar, con el texto** | El explorador, con los Diarios ya cargados | «unos 112 MB comprimidos la primera vez» (111.733.652 B); «unos 282 MB» si se recuerda la base (282.316.800 B). Regla de la crítica, mientras se decide D-26 | Sin formulario. ↺ 4. «Pide un ordenador.» |
| 1 | **Con R o Python** | `2REP_Diaries.csv`, THQCMI V2.0: 107.551 filas × 14 columnas, `;`, UTF-8, con los fragmentos probados | **158,1 MB** (165.785.782 B, en la unidad de Dataverse) | Formulario de Dataverse |
| 2 | **Con métodos de redes** | CGOCUS V1.1: 8 archivos (edgelist 5,3 MB · cosponsorship 15,9 MB · métricas 16,9 MB · metadatos · roles · CODEBOOK · METHODOLOGY · README) y la unión con THQCMI | por archivo | El mismo formulario (guestbook 690) |

**Cómo se trata el formulario:**

1. **El aviso va encima de cada botón que lleva a Dataverse, nunca en una nota emergente.** Es la frase ↺ 3, que
   nombra los campos obligatorios; el cargo es opcional y no hay preguntas propias. El motivo lo redacta usted
   (D-20).
2. **El formulario no se nombra por su título**, que trae la errata «Taquígrados».
3. **Los botones van a la página del DOI, no a archivos sueltos.** La descarga directa por la API devuelve 400 sin
   formulario.
4. **El README depositado describe la V1.** Se enlaza con la frase ↺ 11 hasta que exista una V2.1 (D-19).
5. **La cita se copia tal como la da Dataverse**: «V2» para THQCMI y «V1» para CGOCUS, rotulada «CGOCUS V1.1».
6. **[Descargar los datos] lleva siempre a `/datos/#empezar`**; [Descargar en Dataverse ↗], siempre al DOI.
7. **Garantía del explorador**, comprobada en la herramienta: «Se abre en su navegador; lo que busca y guarda se queda
   en su equipo.» «Funciona sin conexión» no se escribe hasta probar «Recordar la base» en Chrome y Safari normales
   (C4, 0,1 j).
8. **Ni «país de prueba» ni muestra** (D-23). **Tampoco métricas de uso** (1.820 visitas y 373 descargas): cambian
   cada día y no responden ninguna pregunta del lector.

---

## Datos: de dónde sale cada cifra

### Bases y claves

`src/data/cifras.json` tiene la forma de ParlaIbero **más `base`**: `{v, t, base, clave, f, d}`.

| base | fuente | huella | ejemplos de clave |
|---|---|---|---|
| `V2` | `2REP_Base/2REP_Diaries.csv` | MD5 `360332a0ff1327671530f15eed46ac0c` | `filas.V2`, `etapa.I.palabras`, `sesion.1931-10-01-48.filas`, `voto.161-121.si` |
| `v3` | `corpus.sqlite` del explorador (la de `luz_explorer/datos/corpus.sqlite.gz.000-.002`) | sha256 `3a0d8b2d…`; el CSV v3 es `e1906abc…` | `filas.v3`, `habla.v3`, `oradores.etapa.I.*`, `busqueda.voto_femenino` |
| `proyecto` | `2REP_Explorer/standalone/data/sessions.json` | sha256 `b3295e99…` | `sesion.*.diario`, `sesion.*.paginas`, `etapa.*.presidentes`, `paginas.total` |
| `afin` | CGOCUS V1.1: los 8 archivos, idénticos a los de la app por MD5 | versión y UNF | `afin.1931.cruce_bloque`, `afin.tres_leg` |
| `dv` | API de Dataverse (`critica/dv_*.json`) | fecha de consulta | `dv.csv.bytes`, `dv.version`, `dv.cita` |
| `explorador` | manifiesto y cabeceras del explorador publicado | `etag` y MD5 del `index.html` | `explorador.gz.bytes`, `explorador.db.bytes` |
| `croquis` | `hemiciclo_1936.json` | tamaño y sha256 | — (sin cifras en pantalla) |
| `readme` | `Luz_y_Taquigrafos_README.txt` depositado (describe la V1; ↺ 11) | MD5 `f2638800977f78a7d8273440c9c806b3` | `readme.etiquetas`, `readme.falsos_positivos`, `readme.corregidas` (F19) |
| `ocr` | `TXT_OCR/*.meta.json` locales | huella del conjunto | `ocr.fallidas` (F19); si no se puede fijar, la cifra se quita |

### Procedencia de las cifras principales

| cifra | valor | base | cómo se obtiene |
|---|---|---|---|
| Filas | 107.551 | V2 | recuento del CSV |
| Filas | 121.700 | v3 | `count(*)` de `speeches` |
| Filas de habla | 108.291 | v3 | `role ∉ {summary, remark}` en el motor del explorador |
| Habla sin Presidencia (F05) | 59.938 filas; 21.207.769 palabras; 772 `rep_id` | v3 | además `chair = false` |
| Turnos rescatados | 735 | v3 | `mapa_v2_v3.json › resumen` |
| Sesiones | 755 en 752 fechas | V2 = v3 | claves (`date`, `num_session`) |
| Por legislatura | 405 / 276 / 74 | V2 | `legislature` |
| Por etapa | 405 / 276 / 60 / 9 / 5 | V2 | `num_session` ≤ 60 / 61–69 / 70–74 en 1936-1939 |
| Palabras | 24.335.896 | V2 | suma de `nwords` |
| Tras el 18-VII-1936 | 14 sesiones, 0,83 % de las palabras | V2 | 203.167 / 24.335.896 |
| Meses | 173; 64 con sesión | V2 | `cobertura_mes_v2.json` |
| Sesiones con vicepresidente en algún tramo | 586 de 755 (10.025 filas) | V2 | `parse_speaker` del explorador. La búsqueda literal de «vicepresidente» en `speaker` da 584 y 10.009: pierde 16 rótulos con erratas («VIEPRESIDENTE», «VICFPRESIDENTE»…) |
| Filas sin `rep_id` | 147: 123 de ministros | V2 | `parse_speaker` sobre las 147 |
| Páginas | 28.780 (15.272 / 11.177 / 2.331) | proyecto | suma de `pdf_pages` |
| Páginas verificadas | 741 de 755 | proyecto | `page_status` |
| Presidencia | 44,85 % de las filas; 10,24 % de las palabras | V2 | `parse_speaker` |
| Filas de 50 palabras o menos | 66,53 % (mediana 14) | V2 | `longitud_v2.json` |
| Votaciones de F26 | seis nominales escogidas, en cinco sesiones | V2 | texto de la fila, leído por el exportador |
| Listas nominales | 969 filas de 394 sesiones (I 500 · II 391 · III 76 · IV 2 · V 0) | V2 | «señores que (dijeron\|han dicho) sí» sobre el texto plegado; 970 de 395 en la v3; el número de votaciones, por los pares «Total, N» |
| «Luz y taquígrafos» | 10 filas | V2 = v3 | expresión sobre el texto plegado; FTS |
| «No constará(n)» | 9 filas; 7 órdenes | V2 = v3 | expresión y lectura (F28) |
| Peso del CSV | 158,1 MB | dv | 165.785.782 / 1.024² |
| Descarga del explorador | unos 112 MB (D-26) | explorador | 111.733.652 B (HEAD), en unidad decimal; en la de Dataverse serían 106,6 MB |
| Coautorías | 63.507 filas par × medida | afin | filas del edgelist |
| En las tres legislaturas | 78 | afin | `id_dip` con tres fichas |

### El exportador

- **Dónde.** `/Users/rodrodr/Dropbox/Apps/luz_site/exportador/exportar_sitio.py`. Lee en modo solo lectura la V2, la
  v3, `sessions.json`, `mapa_v2_v3.json` y CGOCUS; no escribe nada en los proyectos de datos. Escribirlo en
  `2REP_Explorer/tools/`, junto a `build_corpus.py`, sería tocar el proyecto del explorador: solo con su autorización.
- **De dónde parte.** Porta los nueve `calc_*.py` y `comun.py` de `docs/estudio/datos/`, que ya comprueban el MD5 de la
  V2 y usan el motor del explorador (`motor/engine.js`, `roles.mjs`, `clima_v2.mjs`).
- **Principio.** **Proyecta, no inventa**: cada cifra lleva su fuente legible (`f`) y su fecha (`d`).

**Pasos:**

1. **Verifica las entradas.**
   - MD5 de la V2.
   - sha256 de la v3 y de los metadatos del proyecto.
   - Versión y MD5 de CGOCUS.
   - sha256 de `hemiciclo_1936.json`.
   - Si algo no cuadra, se para.
2. **Calcula el papel de cada fila v3** (`chair`, `role`) con el motor del explorador. Puede reutilizar
   `~/.cache/luz_site/clima/*.jsonl` solo si su huella coincide.
3. **Escribe `src/data/`:**

   | archivo | contenido |
   |---|---|
   | `cifras.json` | todas las cifras, con `base` |
   | `etapas.json` | las cinco etapas: sesiones, filas, palabras, diputados, presidentes, Gobiernos, debates |
   | `sesiones.json` | las 755 sesiones |
   | `meses.json` | los 173 meses |
   | `votaciones.json` | las votaciones de F26, **con las filas del resultado, de la lista y del umbral por separado** (V2 37177 y 37178 para el 318–19; 102358 y 102359 para el 238–5), y el registro de todas las nominales por etapa y por sesión |
   | `puertas.json` | por puerta: sus sesiones (una o varias), cifras, anclas V2 · v3 y consulta de texto con su recuento. Sin `clima` hasta D-11 |
   | `citas.json` | el texto literal de cada cita, con su campo **`ediciones`**: `V2+v3`, `solo_v3` (sumarios, notas del volumen, carátula de México) o `atribucion_distinta` (V2 25979 a nombre de la Presidencia frente a v3 29041–29042) |
   | `etiquetas.json` | los rótulos que viven en los datos, **en es y en**: 22 Gobiernos, familias, ideologías, 31 bibliotecas con su descripción (sus nombres se quedan en español, como en el explorador), 18 minorías del hemiciclo, pasos de F19, trampas de F32 y pruebas de F25 |
   | `diario.json` | F27 y F28 |
   | `oradores_etapa.json` | F05 |
   | `familias_etapa.json` | F09 |
   | `longitud.json` | F10/F11 |
   | `ediciones.json` | F12, F18 y F07 |
   | `columnas.json` | F32 |
   | `fila_ejemplo.json` | F20 |
   | `bibliotecas.json` | F17 |
   | `busquedas.json` | F29, con fecha |
   | `afinidades/*.json` | F21 regenerado (disposición con semilla fija, adyacencia bajo demanda), F22 y las cifras, con el aserto de que firmantes en el censo + aislados = censo |
   | `hemiciclo_1936.json` | la portada |
   | `grafias.json` | la tabla de grafías |
   | `jsonld/{thqcmi,cgocus}.json` | los metadatos para JSON-LD |
   | `sello.json` | `{exportado, v2_md5, v3_sha256, proyecto_sha256, afin_version, puertas, citas_ok, citas_sha256}` |

4. **Escribe `public/datos/`**: CSV y XLSX de cada figura, `procedencia.csv` con todas las cifras (`cifra, valor,
   base, clave, fuente, fecha`) y las cabeceras de columna que leerá el LÉAME.
5. **Ejecuta los fragmentos de Datos** (Python con pandas y R con `read.csv2`) sobre la V2 y guarda su salida con
   fecha y MD5.
6. **Comprueba en local cada cita** contra sus filas, en las ediciones que declara, y deja el resultado y la huella de
   `citas.json` en el sello. La integración continua no tiene la V2 (158,1 MB, tras el formulario) ni la v3 (282 MB):
   allí se comprueba el copy contra `citas.json` y la huella del sello.

**Puertas del exportador** (cualquiera de ellas lo hace fallar):
- una huella que no cuadra;
- una cifra sin `base`, `f` o `d`;
- la suma de etapas distinta del total;
- una cita de `citas.json` que no está **letra a letra** en las filas de las ediciones que declara;
- un archivo de `figs/data/` distinto del hemiciclo;
- la salida de un fragmento distinta de `src/data/`;
- un nombre **visible** (texto o rótulo) sin entrada en `grafias.json` (D-22); los CSV llevan `rep_name` tal cual;
- una tabla de Afinidades cuyas partes no suman el censo.

### Fragmentos que se vuelven a ejecutar

Van dos fragmentos, en R y en Python, sobre el CSV depositado.
- **Cargan y comprueban** las 107.551 filas.
- **Reproducen:**
  - la tabla por legislatura: 405 / 276 / 74 sesiones y 12.966.290 / 9.476.120 / 1.893.486 palabras;
  - los 64 meses con sesión;
  - febrero de 1933: 16 sesiones, 1.843 filas y 574.317 palabras.
- **Hacen la unión con CGOCUS**, la correcta y la incorrecta.

La propuesta «datos» los ejecutó el 22-09-2026 con pandas 3.0.3 y R 4.5.2. La salvedad va en un comentario dentro del
código.

---

## Discrepancias cerradas antes del copy

Recoge la tabla de `estudio_critica.md` §3.5, las correcciones de los jueces y lo comprobado hoy. La última columna es
lo que el copy puede decir.

| # | cifra o afirmación | valores que circulan (dónde) | verificado | regla para el copy |
|---|---|---|---|---|
| 1 | Filas | 107.551 (V2) · 121.700 (v3) · 108.291 de habla (v3) · 107.556 etiquetas | sí | Dos claves distintas. Nunca «107.000». Nunca 107.556 como filas |
| 2 | Palabras | 24.335.896 (`nwords`, V2) · 24.700.474 (`split()`, V2) · 25.364.144 (v3) · 22.096.389 (habla, v3) · 25.903.736 (Tendencia) · «25,8 millones» (Léxico) · «24 millones» (ayuda del explorador) · «34 millones» (presentación) | sí | Cada figura dice su denominador; F33 los explica. «34 millones» queda vetado, y «24 millones» referido al explorador también |
| 3 | Peso del CSV | «158 MB» (README) · 165.785.782 B | API | «158,1 MB», en la unidad de Dataverse |
| 4 | Descarga del explorador | 110.785.413 B (`lyt_explorador`) · 111.733.652 B (HEAD) · «≈260 MB» y «269 MiB» (interfaz) · «unos 112 MB» (regla de la crítica, en unidad decimal) | HEAD | Rige la regla de la crítica, que prevalece: «unos 112 MB comprimidos» y «unos 282 MB» si se recuerda la base. La propuesta de una sola unidad («unos 107 MB», que además se confunde a la vista con 107.551) va a usted como D-26 |
| 5 | Sesiones | 755 · 754 (README V1) | sí | 755 en 752 fechas (3 dobles) |
| 6 | Sesiones por unidad | 405/276/74 por legislatura · 405/276/60/9/5 por etapa | sí | Cada cifra con su unidad dicha |
| 7 | Sesión 48 | «entera», «415 íntegras» · 395 filas V2 | `truncated_end` | ↺ 8 |
| 8 | «Casas viejas», II y III de 1933 | 107/112 (V2, expresión) · 114/126 (v3, todas las filas) · 102/108 (v3, habla y filtros) | las tres | El pie dice base y filtro. En Inicio no va |
| 9 | Diputados | 773 · 774 (faceta) · 910 (app) · 1.026 personas y 1.446 fichas (CGOCUS) · 475/470/501 (censo) · 417/390/253 por legislatura · 417/390/243/44/29 por etapa | sí | «773 diputados intervienen» (V2) frente a «1.026 personas en el censo de Afinidades»; esta, solo en Afinidades y en F34, con el sello «CGOCUS V1.1» (D-3). Nunca 1.446 como personas. Los de etapa incluyen el `rep_id` de quien preside, y se dice. Sin Presidencia (F05, v3) son 772 |
| 10 | En las tres legislaturas | 80 (`afin_roles`) · 78 (censo) | sí | 78 |
| 11 | Distritos, partidos, familias | 52/54/55 · 39/40 · 33/25/15 | sí | Base declarada |
| 12 | Quién habla más | Besteiro y Alba (V2 con Presidencia) · Prieto (V2 sin) · Royo Villanova (v3) | sí | Solo en F07 y F05, con base y «sin Presidencia». Nunca en Inicio |
| 13 | Filas con acotación | 18,27 % (V2) · 16,25 % (v3) | sí | Denominador explícito. Nunca «intensidad» |
| 14 | Turnos rescatados | 729 · 731 · 735 | `mapa_v2_v3.json`: 735 | 735 donde una suma debe cuadrar (F18, Versiones, Método 06), con la nota de los otros dos; «unos 730» solo en prosa sin suma |
| 15 | Azaña, Estatuto | 17.231 · 17.152 · 17.142 | sí | «Más de 17.000 palabras» |
| 16 | Coautorías | 63.507 · 63.508 · 94.621 · 13.452 · 35.883 · 34.640 | sí | «63.507 relaciones par-medida». 94.621 queda vetado |
| 17 | Cruce | «cruza el eje izquierda-derecha» | sí | «Cruza de bloque (izquierda, centro, derecha)», más el estricto |
| 18 | Versión de Afinidades | 1.0 · 1.1 · «V1» en la cita | sí | «CGOCUS V1.1», con la cita tal cual |
| 19 | Segunda legislatura | 1933-1935 · 1933-1936 | — | D-6 |
| 20 | **Votaciones nominales** | «7 resultados en 6 sesiones», con el 141–106 entre las nominales (propuesta «historia») · «seis nominales en cinco sesiones» como si fueran todas · 960 filas COMENTARIOS en 392 sesiones (crítica, v3, solo «dijeron») | V2 5453; recuento de listas, hoy | **Seis nominales escogidas, en cinco sesiones**, siempre con «escogidas» y el total al lado: hay listas en 969 filas V2 de 394 sesiones (970 de 395 en la v3, con «dijeron» y «han dicho»). El 141–106 fue **ordinaria**, y se rotula aparte. Sesiones y votaciones lleva el registro de todas por etapa |
| 21 | **«No constará(n) en el Diario»** | «9 filas de la Presidencia» (historia) · 7 por FTS exacta (interactivo) | lectura de las 9, hoy | **9 filas con la fórmula: 7 órdenes de la Presidencia, 1 petición y 1 ajena**, más 3 acotaciones. «Al menos siete» |
| 22 | **Autor de «Luz y taquígrafos.»** (V2 71330) | «Jiménez Fernández» (Diario y base) · «Giménez Fernández» | `rep_id` 456, CEDA, Badajoz, hoy | «El Diario lo atribuye a» + la grafía de la tabla (D-22). Se dice que la Presidencia afirmó no haber visto quién interrumpía |
| 23 | **Partido distinto en la unión** | «Ruiz Funes (AR/PSOE)» (propuesta «datos») | hoy | El `rep_id` 836 (Amós Ruiz Lecina, PSOE) reúne también 92 filas a nombre de Mariano Ruiz Funes García (AR). **Es una errata de datos para el autor (D-25)**, y nunca se cita como ejemplo |
| 24 | **Orden de Campoamor** | «26 → 30» (propuesta «datos») | hoy | V2 `order` 26; v3 `ord` 29; pantalla del explorador «Orden 30» |
| 25 | **Claves de biblioteca** | «B1…B13 en 1931; B14…B21 en 1933» (propuesta «interactivo») | hoy | La numeración no es cronológica. **El copy usa nombres**, nunca claves. Por etapa: 13 / 7 / 4 / 1 / 1 debates |
| 26 | **Nodos de la red** | 476 / 476 / 502 (`afin_red_*`) frente a 475 / 470 / 501 (censo) | hoy | F21 se regenera desde CGOCUS |
| 27 | **Peso de CGOCUS** | «hasta 17,7 MB» (unidad decimal) | hoy | 16,9 MB, en la unidad de Dataverse |
| 28 | **«Voto femenino»** | «95 veces en toda la V2» | jueces | 95 es la familia de tres expresiones (`terminos_mes_v2.json`). La frase sola da 20 filas en la v3 |
| 29 | **«Intervenciones»** | usada para filas de la V2 (propuesta «interactivo») | — | «Filas» en la V2; «intervenciones» solo para el explorador, con su base |
| 30 | **Hitos** | 21 de `hitos.js` (17 citan Wikipedia; el n.º 20 dice «presidente») | jueces | No se usan. Hitos del Diario con su fila, o [A]/[I] |
| 31 | Martínez Barrio, 17-VIII-1945 | «elección como presidente de la República» (documentación interna) | V2 107371 | «Promesa… como Presidente interino de la República» |
| 32 | Exilio | «exile sessions, 1937-1945», Valencia y Barcelona (README) | sí | Exilio son solo las 5 sesiones de México (1945). Valencia, Monserrat y Sant Cugat están nombradas en el texto de la guerra; Figueres, en el propio extracto («Castillo de Figueras», V2 107337 · v3 121459) y en las notas del volumen (v3 121110; V2 107341 · v3 121465) |
| 33 | Montserrat | como lugar de la sesión del 1-II-1938 | **está en el texto, con la grafía «Monserrat»**: V2 107245 · v3 121341 (Lamoneda, «aquí, en Monserrat») y V2 107248, 107251 · v3 121345, 121350 (dos proposiciones fechadas en Monserrat) | Se dice, con la grafía del Diario y su fila. La búsqueda anterior falló porque buscaba «Montserrat» |
| 34 | Presidente de la sesión 1 | Besteiro (metadatos del proyecto) · Vázquez Lemus hasta V2 9 | sí | «Presidente titular (metadatos del proyecto)» |
| 35 | Derecha y extrema derecha | 6,1 → 30,0 → 32,3 % sin Presidencia | V2 y v3 | Rotulado V2 por defecto |
| 36 | Puertas frente a sesiones | «dieciséis sesiones» (propuesta «historia») | hoy | «Puertas», no sesiones: las 8 de la 0.1 cubren 13 sesiones (la cuestión religiosa abarca la 55 y la 56) |
| 37 | Inicio | ≤ 700 · ≈ 1.500 palabras | — | ≤ 700 de copy y ≤ 120 de límites |
| 38 | Páginas | 28.780 | proyecto | Solo en Método y El Diario, como «recuento de los archivos del proyecto» |
| 39 | Nombres | «Clara Campoamor Y Rodriguez» | — | Tabla de grafías |
| 40 | Métodos del proceso | «structured prompt» para GLM-OCR y «Jaro-Winkler» (README depositado, MD5 `f2638800…`) · «LLaVA» (estudios previos; no está en el README) | código y README | GLM-OCR sin prompt, LightOnOCR de reserva y Tesseract; «emparejamiento difuso» (`difflib`, 0,82). «LLaVA» no se menciona |
| 41 | Sesiones con vicepresidente | 584 y 10.009 (crítica, búsqueda literal) · 586 y 10.025 (`parse_speaker`) | hoy | 586 y 10.025, el método que declara el sitio |
| 42 | Apellidos | «649 primeros apellidos compartidos» (narrativa) · «649 distinct first-surname strings» (.docx no depositado) | .docx | No va en la 0.1. Si el exportador lo recuenta con una definición explícita, entra con su base |
| 43 | Filas sin `rep_id` | «147: ministros sin escaño» (README) | hoy | 123 de ministros; el resto, rótulos de Secretaría o Presidencia sin nombre y 6 oradores mal leídos |
| 44 | Firmantes de Afinidades | 454 / 446 / 316 (incluye 1 / 6 / 1 sin ficha en el censo) · 453 / 440 / 315 (en el censo) | hoy, CGOCUS V1.1 | «Firman y están en el censo», más la fila de los que no tienen ficha. Aislados 22 / 30 / 186, que suman el censo |
| 45 | Control de F05 | 108.291 filas y 22.096.389 palabras (habla con Presidencia) · 59.938 y 21.207.769 (sin Presidencia) | hoy | 59.938 y 21.207.769, con 772 `rep_id` |
| 46 | Cruce estricto, 1936-1939 | «casi todo con el PNV» (`estudio_lyt_relato` §6.3) · 85 de 347 filas par-medida | hoy | «Una cuarta parte con el PNV»; el resto, con la CEDA, la Lliga e independientes |
| 47 | Umbral de la mitad más uno | 234 y 232 · también 209 de 417 (V2 102359) | hoy | Tres líneas, cada una en su votación; el 232 es de la Reforma agraria, aunque va en la fila del Estatuto |
| 48 | «Diario de Sesiones» en el texto | 1.508 filas «de diputados que citan el Diario como arma» | hoy | 1.508 filas; 1.144 de diputados desde su escaño y 232 de la Presidencia. Sin «como arma» |
| 49 | «Luz y taquígrafos» en las citas | con tilde en el copy · «taquigrafos», sin tilde, en las 10 filas | hoy | Letra a letra, como en la fila |

---

## Diseño visual

**Identidad.** Es la de la presentación y la landing: **oscuro editorial**, con crema sobre casi negro, oro de acento
y serif cursiva de display, y **tema claro** derivado con el método de la presentación. El claro no es una inversión:
cada color conserva matiz y croma y baja de luminosidad hasta el contraste exigido. Las atenuaciones no se transportan
entre temas.

| token | oscuro | claro | uso |
|---|---|---|---|
| `--bg` / `--bg-2` / `--bg-3` | `#0F110E` / `#161913` / `#1C2019` | `#F6F2E9` / `#EFE9DB` / `#E6DFCD` | fondo, superficie de nota, banda |
| `--ink` / `--ink-2` / `--mute` | `#EFE7D8` / `#C9C3B4` / `#8E8F86` | `#1A1C16` / `#45483D` / `#676A61` | texto |
| `--hair` / `--hair-2` | crema al 12 % / 22 % | tinta al 14 % / 28 % | filetes |
| `--accent` | `#C9A24E` (7,9:1 sobre `--bg`) | `#8C6100` (4,9:1) | marca, enlace activo, llamada, dato resaltado |
| `--focus` *(nuevo)* | `#9EC1FF` (10,4:1) | `#1558D6` (5,5:1) | foco, distinto del oro |
| `--rampa-0…4` *(nuevo)* | `#8A6705 #A78129 #C49D49 #E1B966 #FFDB91` (3,6 · 5,3 · 7,5 · 10,2 · 14,3:1) | `#AC8031 #976B16 #805903 #684702 #513601` (3,2 · 4,2 · 5,6 · 7,5 · 10,0:1) | calendario y series únicas: más palabras, más contraste |
| ideología | `--ei #D9433F --i #E8705F --ci #F2A48F --c #A9A89C --cd #93B6EE --d #5F8EE3 --ed #3F62C6 --nc #6E7169` | `--ei #92000F --i #B24133 --ci #CA6F58 --c #8C8B7F --cd #5F8CD5 --d #3768C1 --ed #213FA6 --nc #565A51` | F09, F26 con nombres, F21 |
| hemiciclo | `--g-*` de `hero_vars.css`: 18 minorías | las mismas, en su versión clara | solo la portada |
| `--ausencia` *(nuevo)* | transparente con filete `--hair-2` | ídem | meses sin sesión |
| `--dato` / `--dato-2` *(nuevo)* | crema / oro | tinta / oro oscuro | serie única / serie resaltada |
| `--atenua` *(nuevo)* | por tema, calibrado aparte | ídem | resalte del hemiciclo y de las figuras |
| `--placa` *(nuevo)* | `#F6F2E9` con filete | ídem | capturas del explorador |

- **Rampa en oro.** Se calcula en OKLCH con el matiz y el croma del acento de cada tema. Los contrastes son los
  impresos; el guion es `docs/estudio/sintesis/rampa_oro.py`. **Son valores tentativos**: se validan con el validador
  de la guía de visualización antes de congelarlos en `tokens.json`.
- **Se quitan** `--def --cri --men --neg --amb --pos`, que son del libro de códigos del prototipo.
- **Los tokens se generan desde `src/config/tokens.json`**, que es decisión de diseño y no sale del exportador. Así `og.mjs` y las figuras exportables no leen CSS con
  expresiones regulares, que era un defecto de ParlaIbero.

**Tipografías**, autoalojadas con `@fontsource-variable`, sin Google Fonts: la auditoría rechaza recursos de terceros.
El exportador comprueba los glifos ñ á é í ó ú ü « » ¿ ¡ – —.

- **Cormorant Garamond**, cursiva 500: marca, H1 y cifras grandes de las fichas.
- **EB Garamond**: lectura. **La cursiva se reserva a lo que alguien dijo**, es decir, a las citas del Diario.
- **JetBrains Mono**: tablas, ejes, ids, fechas de registro, antetítulos y credencial, con `tabular-nums`.
- En la prosa, las cifras van en EB Garamond con `lining-nums tabular-nums`: la mono en mitad de un párrafo de Garamond
  rompe el tono.

**Maquetación.**
- Medida de lectura de unos 38 rem.
- Rejilla editorial de 12 columnas, con asimetrías solo en escritorio.
- Radio de 2 px y sin sombras.
- **Lo interactivo se distingue por la forma**: enlaces subrayados, botones en caja y foco azul.
- Márgenes laterales de 16 px en el móvil y nada que desborde a 360 px.

**Movimiento.**
- Solo con `prefers-reduced-motion: no-preference`: 120 ms al pasar el puntero, 240 ms en un cambio de estado y una
  única entrada `.entra` de 900 ms o menos, atada al desplazamiento (`animation-timeline: view()`).
- `@supports not` la anula, y la impresión la fuerza visible.
- Ninguna librería de animación en el cliente.

**Marca.**
- «Luz y Taquígrafos» en Cormorant cursiva.
- El icono de pestaña es un hemiciclo mínimo sacado de la geometría del JSON. Es marca, no dato. Una sola tinta
  desaparece en las pestañas oscuras: lleva placa o `prefers-color-scheme` dentro del SVG, más PNG y apple-touch de
  reserva, todo generado por `scripts/favicon.mjs`.

---

## Arquitectura técnica

### Árbol

```
/Users/rodrodr/Dropbox/Apps/luz_site/     (hermano de parlaibero_site · git propio · node_modules con com.dropbox.ignored)
├── docs/        estudio/ · 00_PLAN_sitio.md · 01_NARRATIVA_sitio.md · 02b_BIBLIOGRAFIA.md · 02_COPY_es.md (fuente)
│                · 02_COPY_es.lectura.md (generado) · 02a_MARCADORES.md · 02c_GRAFIAS.md · 03a_GLOSARIO_es-en.md
│                · 03_COPY_en.md · CHANGELOG.md
├── exportador/ exportar_sitio.py y los calc_*.py portados (lee los proyectos de datos en modo solo lectura)
├── public/      datos/ (del exportador: CSV, XLSX, procedencia.csv) · og-es.png · og-en.png · favicon.svg
│                · favicon.png · apple-touch-icon.png · robots.txt
├── src/
│   ├── data/    GENERADO por el exportador · se versiona · nunca se edita a mano (lista en § El exportador)
│   ├── i18n/    es.json · en.json (generados por copy2i18n.py)
│   ├── config/  enlaces.ts (DOI, explorador, app, ENLACES_PROFUNDOS = false, PENDIENTES_DEL_INVESTIGADOR)
│   │            · tokens.json (decisión de diseño, no dato)
│   ├── layouts/ Base.astro
│   ├── lib/     cifras.ts · i18n.ts · idiomas.ts · rutas.ts · remata.ts · figuras.ts · cita.ts · grafias.ts
│   ├── viz/geom/ calendario.ts · barras.ts · linea.ts · red.ts · rejilla.ts (de ParlaIbero: cuantiles sin interpolar)
│   ├── viz/     figuraExportable.ts (SVG y PNG de F01 completa y F26)
│   ├── scripts/ figuras.ts (la isla)
│   ├── components/ Hemiciclo · FigCalendario · FigVotaciones · FigOradores · FigFamilias · FigTurnos · FigLinea
│   │               · FigFila · FigPasos · FigLongitud · FigEdiciones · FigBibliotecas · FigCruces · FigRed
│   │               · FigRecuentos (F33) · FigLinea cubre F27, F28 y F25 (variante con flechas)
│   │               · Pestanas · IndiceLateral · BandaCTA · SubNav · Captura · Columnas · Cita · Salidas
│   │               · NotaBases · CopiarConsulta · Sello · ficha/{Tareas,Vecinas,Cifras} · puerta/{Pasaje,Encontrarla}
│   ├── assets/explorador/  capturas + LEEME.md
│   ├── styles/  base.css (tokens generados) · figuras.css (una sola hoja para todas las figuras)
│   └── pages/   index.astro (raíz) · 404.astro · [lang]/{index, cortes/index, cortes/[etapa], cortes/sesiones/index,
│                cortes/sesiones/[puerta], diario, metodo, datos/index, datos/versiones, explorador, afinidades}.astro
│                · datos/leame-[fig]-[lang].txt.ts · datos/[fig]-[lang].{svg,png}.ts
├── scripts/     copy2i18n.py · copy_lectura.py · check-i18n.mjs · audit-cifras.mjs · tokens.mjs · og.mjs · favicon.mjs
├── tests/       humo · sinjs · solapes · peso · guardas · citas · enlaces-internos · a11y (axe) · teclado · jsonld (Playwright)
├── .github/workflows/  deploy.yml · enlaces.yml (semanal)
├── LICENSE (MIT) · LICENSE-CONTENT (texto del sitio) · CITATION.cff · README.md
└── .claude/launch.json  astro dev / astro preview
```

### Qué se copia, qué se adapta y qué sobra de ParlaIbero

| | piezas |
|---|---|
| **Se copia tal cual** | `tsconfig.json`, `playwright.config.ts`, `package.json` (con **`sharp` declarado**), `Captura.astro`, `BandaCTA.astro`, `lib/remata.ts`, `viz/geom/rejilla.ts`, `scripts/copy2i18n.py`, `scripts/copy_lectura.py`, las utilidades HTML de `audit-cifras.mjs`, `tests/humo`, `sinjs` y `solapes` |
| **Se adapta** | Ver la lista que sigue a esta tabla. |
| **Se reescribe**, con su motivo | `Pestanas.astro` (lleva fijos tres paneles y lanza un error con otro número de rótulos; aquí hacen falta Lista · Datos, solo Tabla, Tabla de grados · Datos) · `Salidas.astro` (cableado a `inicio.empezar.salida1-3`, a la ficha de El Salvador y a `voz_por_camara.xlsx`, con tres peldaños; LyT tiene cuatro filas) · `ficha/Tareas.astro` (importa `./contexto`, que sobra, además de `Pais` y los eventos) · `ficha/Vecinas.astro` (depende de `PAISES`) · `Cita.astro` (solo copia un texto; aquí, texto, BibTeX y RIS) · `IndiceLateral.astro` (lista plana; las fichas quieren apartados H3) · `pages/datos/leame-[fig]-[lang].txt.ts` (el LÉAME necesita el campo BASE con su huella) |
| **Sobra** | Lo de la AEI (`FundingNotice`, `check-funding`, `aei.spec`) · `AperturaRotativa`, `FigTermino`, `config/portada.ts` · `Escalera.astro` · `instituciones.astro` · `ficha/contexto.ts` y los `dePais()` duplicados · el control de nombres (`nombres_vetados.json`) · el pt-BR |

**Qué se adapta:**
- `astro.config.mjs`: `SITE_URL`/`BASE_PATH` nuevos y `sitemap` con `locales: { es, en }` (el de ParlaIbero lleva
  `pt: 'pt-BR'`).
- `src/layouts/Base.astro`: marca, seis pestañas en dos grupos, subnavegación, pie sin financiación, `hreflang` con
  `x-default` a la raíz y el JSON-LD de la página.
- `cifras.ts`: el campo `base` y las familias `etapa.*`, `sesion.*`, `puerta.*`, `voto.*`, `afin.*` y `fila.*`.
- `i18n.ts`: **se arregla el escape en origen** (los marcadores se resuelven sobre el texto crudo y solo se escapa lo
  de fuera).
- `audit-cifras.mjs`: `data-base` obligatorio; NotaBases en toda página con una cifra v3; lista negra del prototipo;
  valores recalculados desde `src/data/`.
- `check-i18n.mjs`: dos lenguas y los vetos de LyT.
- `Columnas.astro`: sin tira de llenado, con notas al margen.
- La isla: plantilla genérica, `[data-fila]`, dianas enfocables y un nuevo enlace de escuchadores tras cada
  sustitución.
- `og.mjs`: con el hemiciclo.

### Dos lenguas

- `LANGS = ['es', 'en']`, con prefijo. La raíz es un selector estático. `hreflang` es recíproco, más `x-default`, que
  apunta a la raíz (ParlaIbero lo apunta a /es/). Mapa del sitio con es y en, y `robots.txt`.
- **JSON-LD por página:** el `Dataset` de THQCMI en Inicio y en Datos; el de CGOCUS, con su versión (D-3) e `isBasedOn`
  THQCMI, en Afinidades.
- El inglés se traduce **después de congelar el español** (Puerta 3), con el glosario vinculante
  `03a_GLOSARIO_es-en.md`:
  - *Diario de Sesiones* se conserva, con su glosa;
  - Cortes Constituyentes;
  - *minoría* → parliamentary minority;
  - Presidencia → the Chair;
  - banco azul → government bench.
- **Las citas del Diario van en español**, con la traducción al pie marcada «(our translation)».
- La página del explorador dice que la herramienta está solo en español.
- `check-i18n` exige en las dos lenguas las mismas claves, los mismos marcadores con su formato y las mismas frases
  fijas. Una clave sin traducir se pinta en español con `data-sin-traducir`, y falla en publicación.
- **Rótulos que viven en los datos.** El i18n no cubre solo el copy: los Gobiernos, las familias, las ideologías, las
  bibliotecas y sus descripciones, las minorías del hemiciclo (y el `<title>`/`<desc>` de `hero_svg.py`), los pasos de
  F19, las trampas de F32 y las pruebas de F25 salen de `etiquetas.json` en las dos lenguas, como hacía ParlaIbero con
  `nombre[lang]`. Los nombres de las bibliotecas se quedan en español, porque deben coincidir con la interfaz del
  explorador.
- **Vetos también en inglés:** «semantic search», «wildcard», «proximity», «this link opens», «codebook», «irony»,
  «intensity», «innovative», «coming soon», «unique» y «34 million».

### Pruebas y puertas de la compilación

| puerta | archivo | qué comprueba | bloquea |
|---|---|---|---|
| tipos | `astro check` | TypeScript estricto | integración continua |
| diccionarios | `check-i18n.mjs` (`--strict` solo en publicación) | claves y marcadores iguales en es/en; ningún número tecleado fuera de las familias de § De cifras; palabras vetadas en las dos lenguas; frases fijas idénticas | integración continua; en PR y vista previa, sin `--strict` hasta la Puerta 3 |
| compilación de publicación | `STRICT=1 npm run build` | marcadores sin resolver, claves sin traducir, pendientes del investigador, corchetes sin destino, asertos de coherencia (celdas del calendario = meses con sesión; suma de etapas = total; F26 = votaciones de `votaciones.json`), descripción de más de 155 caracteres | integración continua |
| citas | el exportador, en local; `tests/citas.spec.ts` en la integración continua | en local, cada cita letra a letra en las filas de las ediciones que declara `citas.json`; en la integración continua, que el copy coincide con `citas.json` y que la huella coincide con el sello | exportador · integración continua |
| cifras | `audit-cifras.mjs` | ningún dígito sin procedencia en `dist/`; `data-base` en cada cifra; NotaBases donde hay v3; valores recalculados; ningún recurso de terceros; lista negra del prototipo y de cifras vetadas | integración continua |
| humo | `tests/humo.spec.ts` | todas las rutas × 2 lenguas: 200, un `h1`, un `main`, `lang`, **nada asoma a 360 px (cabecera incluida)**, cero errores de consola | integración continua |
| sin JS | `tests/sinjs.spec.ts` | Inicio, Las Cortes, una ficha, una puerta y Método: las tablas se alcanzan marcando su pestaña | integración continua |
| solapes | `tests/solapes.spec.ts` | ningún elemento pegajoso monta sobre texto, con control positivo | integración continua |
| peso | `tests/peso.spec.ts` | KB del HTML, palabras en `<main>` (y en «Lo que pasó en la Cámara») y figuras por página y por apartado (tablas de § Amontonamiento) | integración continua |
| guardas | `tests/guardas.spec.ts` | nada de `figs/data/` salvo el hemiciclo, contra una lista versionada de huellas (`aecpa2026` no está en la integración continua); «este enlace abre» ausente; sello con huellas | integración continua |
| enlaces internos | `tests/enlaces-internos.spec.ts` | ninguna barra de F26 ni enlace de Vecinas apunta a una ruta de la 0.2 oculta; cada archivo de `/datos/` enlazado existe | integración continua |
| accesibilidad | `tests/a11y.spec.ts` (axe) y `tests/teclado.spec.ts` | axe en los dos temas; recorrido con teclado de las figuras, dianas enfocables y escuchadores tras cada sustitución | integración continua |
| metadatos | `tests/jsonld.spec.ts` | reciprocidad de `hreflang`, `x-default` y validez del JSON-LD | integración continua |
| enlaces | `enlaces.yml` | cada lunes: DOIs, explorador (compara el sha256 del manifiesto con `sello.v3_sha256`: si cambia, las cifras v3 quedan caducadas y se avisa) y app de Afinidades | aviso semanal |

Orden de la integración continua (`deploy.yml`), solo desde `main`:
1. `npm ci`;
2. `copy2i18n`;
3. `check-i18n` (`--strict` solo al publicar desde `main`);
4. `astro check`;
5. `tokens.mjs`;
6. `og.mjs` y `favicon.mjs`, con Cormorant y EB Garamond registradas en fontconfig (TTF autoalojados) y los colores
   resueltos desde `tokens.json`: `fill=var(--g-*)` no se resuelve en sharp;
7. `STRICT=1 build`;
8. `audit-cifras`;
9. Playwright;
10. Pages.

---

## Etapas, puertas y estimación

| etapa | qué se hace | qué se aprueba |
|---|---|---|
| **0** | Repositorio con solo `docs/` | — (hecho) |
| **Puerta 1 · Narrativa y mapa** | Este plan y `01_NARRATIVA_sitio.md`, revisados por cuatro lectores adversariales: un verificador de cifras, un historiador escéptico, una docente y una editora | D-1, D-3, D-4, D-5, D-6, D-8, D-9 y D-12; tesis, espina y mapa |
| **Puerta 1b · Fuentes de lo externo** | `02b_BIBLIOGRAFIA.md`: cada afirmación [EXT] de las fichas y las puertas, con su referencia [A] o [I], o marcada «se recorta». `02c_GRAFIAS.md`: la tabla de grafías | Las referencias y la tabla de grafías |
| **Puerta 2a · Copy ES (historia y base)** | `02_COPY_es.md` con marcadores: Inicio, Las Cortes, 5 fichas, Sesiones, El Diario, Método, Datos, Versiones y Explorador. Van con su versión de lectura y el catálogo de marcadores | El texto y las pruebas de rechazo:<br>- primera pregunta en la pantalla 1;<br>- ningún límite antes del primer hallazgo;<br>- Inicio ≤ 700 y ≤ 120 de límites;<br>- ninguna frase de más de 30 palabras. |
| **3 · Construcción** (en paralelo desde 2a) | Exportador, andamiaje, tokens, componentes, figuras y plantillas | — |
| **Puerta 2b · Copy ES (puertas y Afinidades)** | Las 8 puertas y Afinidades (tras D-3). **El español queda congelado** | El texto |
| **Puerta 3 · Inglés** | Glosario primero; `03_COPY_en.md`; retrotraducción de muestras | Revisión por quien usted designe, o por máquina con corrección a posteriori, como en ParlaIbero |
| **Puerta 4 · Vista previa** | Inicio, Las Cortes, una ficha, una puerta, Método y Datos a 375 y 1.440 px, en los dos temas y en las dos lenguas; diff de `src/data/` | Lo que ve. Sus cambios se anotan en `CHANGELOG.md` |
| **Puerta 5 · Publicación** | Informe de verificación y prueba del camino con tres personas ajenas | Acciones **solo suyas**:<br>- crear el repositorio y activar Pages;<br>- autorizar el `push`;<br>- enlazar desde la descripción de Dataverse y desde el explorador. |

**Estimación de la edición 0.1**, en jornadas de trabajo con agente, con la verificación incluida. Reestimada tras la
revisión adversarial: la anterior (≈ 36,75 j) infravaloraba el exportador, F01, F21, los componentes heredados, las
auditorías, el copy y la bibliografía, y dejaba sin partida el favicon, el mapa del sitio, el JSON-LD, las licencias, los
LÉAME y las imágenes de la red por tema. Margen de ±10 % para el error de estimación, y **una reserva aparte para las
dependencias abiertas**.

| pieza | jornadas |
|---|---|
| Andamiaje: Astro `[lang]` es/en, raíz, 404, integración continua, launch | 0,75 |
| Tokens (`tokens.json` → CSS, rampa validada, foco, `--atenua`, placa) y fuentes autoalojadas | 0,75 |
| Exportador (verificación de entradas, papel v3, 22 archivos de datos, F21 con disposición nueva, umbrales en filas vecinas, citas en las ediciones declaradas, semántica de búsqueda del explorador, fragmentos de R y Python, XLSX, etiquetas bilingües) | 4,5 |
| `cifras.ts` e `i18n.ts` (familias de marcadores, `base`, arreglo del escape) | 0,75 |
| Auditorías y guardas (`audit-cifras`, `check-i18n` en dos lenguas, citas, grafías visibles) | 1,75 |
| Componentes heredados (reescritos: Pestanas, Salidas, Tareas, Vecinas, Cita, IndiceLateral) y nuevos (NotaBases, CopiarConsulta, SubNav, Sello) | 2 |
| Isla generalizada | 0,5 |
| Hemiciclo como componente | 0,5 |
| **Figuras**:<br>- F01 con sus tres escalas, F16, el móvil y la figura exportable: 2,75;<br>- F26, con tres umbrales y el registro de todas: 0,75;<br>- F05 + F09: 0,75;<br>- F30, con múltiplos por sesión: 0,75;<br>- F27 + F28: 0,25;<br>- F20: 0,25;<br>- F19: 0,25;<br>- F10/F11: 0,5;<br>- F12: 0,25;<br>- F32: 0,25;<br>- F33: 0,25;<br>- F34: 0,25;<br>- F25: 0,25;<br>- F18: 0,25;<br>- F07: 0,5;<br>- F17: 0,5;<br>- F29: 0,25;<br>- F22: 0,25;<br>- F21 (disposición, imagen por tema, búsqueda, carga bajo demanda): 2 | 11,25 |
| **Plantillas**:<br>- Inicio: 0,75;<br>- Las Cortes: 0,5;<br>- ficha: 0,75;<br>- Sesiones: 0,25;<br>- puerta: 0,5;<br>- El Diario: 0,5;<br>- Método: 0,5;<br>- Datos: 0,5;<br>- Versiones: 0,25;<br>- Explorador: 0,5;<br>- Afinidades: 0,5 | 5,5 |
| Datos descargables (LÉAME de unas 18 figuras en dos lenguas; SVG y PNG de F01 y F26) | 1 |
| Capturas del explorador, limpias (g, h, j y k repetidas), con LEEME | 0,75 |
| Pruebas (humo, sin JS, solapes, peso, guardas, citas, enlaces internos, axe, teclado, JSON-LD) y enlaces semanales | 1,5 |
| `og.mjs` con el hemiciclo, fuentes registradas y colores resueltos | 0,5 |
| Favicon (`favicon.mjs`, con placa y reservas PNG) | 0,25 |
| Mapa del sitio, `robots.txt`, `x-default` y JSON-LD por página | 0,25 |
| Licencias y cita (`LICENSE`, `LICENSE-CONTENT`, `CITATION.cff`, `README.md`) | 0,25 |
| **Técnico** | **32,75** |
| Cierre de la Puerta 1 (fusión de los lectores) | 0,5 |
| Bibliografía [A]/[I] de lo externo (Puerta 1b), más lo que aporte usted | 2,5 |
| Tabla de grafías, con D-22 (a): texto y rótulos visibles | 0,75 |
| Copy ES 2a (unas 18.000–22.000 palabras, con marcadores y doble id; las fichas crecen con los topes nuevos) | 7 |
| Copy ES 2b (unas 4.000–5.500 palabras) | 1,5 |
| Lectores adversariales y fusión | 1 |
| Inglés, con glosario, retrotraducción de muestras y las etiquetas de los datos | 3,5 |
| **Contenido** | **16,75** |
| **Total de la edición 0.1** | **≈ 49,5** (45–54 con el margen), más el tiempo de revisión suyo |
| **Reserva para dependencias abiertas**, aparte: D-3 (volver a exportar Afinidades y F34) 0,75 · D-11 (si entra antes) 0,5 · D-19 (rótulos) 0,25 · D-22 (b) 1,25 · D-27 (b) 0,25 · D-9 (b) 1 | hasta 4 |

**Edición 0.2**, cuando la 0.1 esté publicada:

| pieza | jornadas |
|---|---|
| Palabras recalculada sobre la v3: exportador 0,75, figura 1, página 0,25 y copy 0,5 | 2,5 |
| F26 con nombres: resolución de apellidos 1,5 y figura 0,5 | 2 |
| Las siete puertas restantes: verificación, copy, datos e inglés | 2 |
| F13 + F14 | 0,75 |
| Docencia y archivos | 0,75 |
| F23 | 0,25 |
| F15, con la revisión de Negrín | 0,5 |
| **Total de la 0.2** | **8,75** |

**Trabajo suyo, en paralelo**, sin contar arriba:
- D-3: depositar CGOCUS V2.0;
- D-4: el manejador `#q=`;
- D-19: la V2.1;
- D-20: el motivo del formulario;
- revisar la tabla de grafías y la bibliografía.

**La ruta crítica son las puertas, no el código.** El copy de 2a (≈ 7 j) y la bibliografía van antes de las plantillas;
el exportador y los componentes, en paralelo.

---

## Verificación

**Automática**, en `deploy.yml` y en local: la tabla de § Pruebas.

**Manual:**
- el camino real: formulario → descarga → apertura del CSV → fragmento de R;
- Safari 17 y Firefox;
- lector de pantalla sobre F01 y F26;
- Rich Results Test sobre el JSON-LD `Dataset` de THQCMI y CGOCUS;
- lectura nativa del inglés;
- **«Recordar la base» en Chrome y Safari normales (C4)** antes de escribir nada sobre el uso sin conexión.

**Del corpus:** el exportador vuelve a comprobar, en cada ejecución, las cifras de control de § Procedencia.

---

## Fuera de la edición 0.1, con el gancho puesto

- **Edición 0.2** (tabla de § Estimación): Palabras, votaciones con nombres, las siete puertas, acotaciones, Docencia y
  archivos, F23 y F15. **Las rutas quedan reservadas y ocultas; nunca «próximamente».**
- **Más adelante:**
  - la portada rotativa con curvas, solo si la 0.2 de Palabras funciona y se corrigen los tres defectos de ParlaIbero;
  - el mapa de circunscripciones, cuando se aclare la licencia;
  - F08;
  - un PDF de dos páginas;
  - la búsqueda fechada de corpus comparables (B7), si se quiere afirmar novedad.
- **Si llega D-4 (a):** el interruptor `ENLACES_PROFUNDOS` convierte [Copiar la consulta] en un enlace y activa la
  segunda redacción, ya aprobada, de ↺ 5 y de la línea de Explorador 8.9. La llegada abre además una revisión del copy:
  las instrucciones «pegue en el buscador» dejan de ser ciertas.
- **Si llega D-19 (a):** los metadatos del proyecto pasan a ser dato depositado y su rótulo cambia en un solo sitio.

---

## Riesgos principales

| riesgo | mitigación |
|---|---|
| El contexto histórico mete hechos externos sin respaldo, y un historiador lo detecta | Puerta 1b; lector «historiador escéptico»; lo que no tiene fuente se recorta |
| Una cita mal copiada o «corregida» | Aserto letra a letra contra la fila V2 y la v3; se conserva el [sic] |
| Confundir la V2 con la v3 al seguir un id | Doble id en cada cita, `data-base`, NotaBases, frase ↺ 4 y la página Versiones |
| Prometer lo que el explorador no hace | Vetos en `check-i18n`; «Hoy puede» solo con funciones comprobadas; capturas con LEEME y huella |
| Metadatos no depositados leídos como depositados | Rótulo ↺ 2; petición de la V2.1 (D-19) |
| La sesión 48 y otras sesiones incompletas | Frase ↺ 8; el bloque «Que esté no quiere decir que esté entera»; F30 marca las filas truncadas |
| Las cifras de Afinidades caducan | D-3; Afinidades la última; ninguna cifra exacta fuera de su página |
| El explorador cambia de corpus | sha256 de la v3 en el sello y comprobación semanal |
| Vuelve el prototipo | Palabras y cifras vetadas; prueba sobre `src/data/` |
| Vuelve el amontonamiento o el peso | Reglas medibles, `peso.spec` (KB del HTML, palabras y figuras), una protagonista y un tope de secundarias por plantilla, redes bajo demanda, ninguna tabla de 755 sesiones en el HTML |
| El volumen de copy (≈ 22.000–27.500 palabras) atasca la Puerta 2 | La Puerta 2 se parte en 2a y 2b; las puertas son datos estructurados; siete puertas pasan a la 0.2 |
| Los nombres mal escritos, ahora que se nombra | Tabla de grafías con revisión suya (D-22); la auditoría falla ante un `rep_name` crudo en pantalla; los CSV lo conservan, con la columna `grafia` |
| Traducir citas históricas | Original siempre a la vista; traducción marcada; glosario vinculante |
| La cifra de un juez o de una propuesta no se reproduce | Ninguna cifra entra en el copy si no la escribe el exportador |

---

## Anexo · Comprobaciones hechas hoy para este plan

Guion: `docs/estudio/sintesis/comprobaciones_sintesis.py`, sobre la V2 (MD5 comprobado) y la v3 (`corpus.sqlite`).

1. **Votaciones.** V2 5453 dice «En votación ordinaria fue desechada la proposición del grupo socialista por 141
   votos contra 106». Después se pide votación nominal para el art. 34: «Total, 161 … Total, 121». Las filas 6994
   (178–59, «Se procede a la votación nominal»), 37177 (318–19, «preceptivo que sea nominal») y 102358 (238–5, «que se
   haga nominalmente») lo confirman. La 13531 da 466, 234 y 368. **Son seis nominales escogidas, en cinco sesiones**,
   no todas: la revisión adversarial contó listas en 969 filas V2 de 394 sesiones.
2. **«No constará(n) en el Diario».** 9 filas en la V2 y en la v3, con ids emparejados y leídas una a una: 7 órdenes
   de la Presidencia, la petición de Calvo Sotelo (V2 104406) y una frase ajena de Rodríguez de Viguri (V2 64659). Hay
   3 acotaciones «no se consigna(n) por orden». La búsqueda FTS exacta en plural da 7.
3. **«Luz y taquígrafos».** 10 filas V2 (ids en F27) y 10 en la v3. La V2 71330 va a `rep_id` 456, «Manuel Jimenez
   Fernandez», CEDA, Badajoz. La fila anterior (V2 71329, Alba) recuerda la sesión secreta.
4. **Orden de Campoamor.** V2 `order` 26 (5423 es 25); v3 `ord` 29 (6078 es 28).
5. **`rep_id` 836.** «Amos Ruiz Lecina», PSOE, con 46/39/7 filas por legislatura. También lleva 90 + 2 filas a nombre
   de «Mariano Ruiz Funes Garcia», AR.
6. **Debates preparados por etapa**: 13 / 7 / 4 / 1 / 1, según las fechas de sus sesiones. La numeración de las claves
   no es cronológica.
7. **Red de Afinidades**: 476 / 476 / 502 nodos frente a 475 / 470 / 501 fichas del censo.
8. **Pesos en la unidad de Dataverse**: CSV 158,1 MB · explorador comprimido 106,6 MB · base recordada 269,2 MB ·
   `representatives_metrics.json` 16,9 MB.
9. **Anclas de las ocho puertas de la 0.1**, leídas en las ediciones que declara `citas.json` (corregido tras la
   revisión adversarial):
   - Azaña, V2 6748 / v3 7531;
   - Azaña, V2 44922 / v3 50255;
   - Prieto, V2 74619 / v3 84039; Oriol de la Puerta, V2 74621 / v3 84041;
   - Azaña en el Estatuto: V2 25979, a nombre de la Presidencia (Besteiro), frente a v3 29041–29042, a nombre de Azaña
     (`atribucion_distinta`);
   - Calvo Sotelo, V2 105356 / v3 119131;
   - Casares Quiroga, V2 105330 / v3 119104;
   - Galarza y la Presidencia, V2 106289–106291 / v3 120221–120223;
   - Martínez Barrio en el sumario del 1-II-1939, v3 121446, solo en la v3;
   - «Si, prometo.», V2 107372 / v3 121502, dentro de una fila de la Presidencia en las dos;
   - la nota del volumen de la guerra (v3 121110) y la carátula de México (v3 121466), solo en la v3; la nota que cierra
     Figueres, V2 107341 / v3 121465; «Castillo de Figueras», V2 107337 / v3 121459;
   - «Presidente interino», V2 107371 / v3 121500;
   - Giral, V2 107375 / v3 121507;
   - Kent, V2 5419 / v3 6074;
   - Campoamor, V2 5422 y 5424 / v3 6077 y 6079.
10. **Meses de la etapa IV**: 8 meses con sesión de 29 (1936-10 → 1939-02). Del 1939-03 al 1944-12 van 70 meses sin
    sesión.
11. **Rampa en oro**: contrastes de la tabla de § Diseño (`rampa_oro.py`).

---

## Anexo · Revisión adversarial (22-09-2026)

Tres lentes (hechos, reglas y viabilidad) dieron 81 hallazgos sobre este plan y sobre `01_NARRATIVA_sitio.md`. **Antes
de aplicar cada uno se comprobó en la fuente**: la V2 depositada (MD5 comprobado), la v3 (`corpus.sqlite` y el papel de
cada fila en `clima/*.jsonl`), CGOCUS V1.1 (censo y edgelist), `sessions.json`, `mapa_v2_v3.json`,
`bibliotecas_v3.json`, el README depositado, `hitos.js`, `erratas_fechas_V1.csv` y `AUDITORIA_FECHAS.md`, y el código de
ParlaIbero. El guion que reproduce las comprobaciones de datos es `docs/estudio/sintesis/comprobaciones_revision.py`
(≈ 25 s).

**Balance:** 76 aplicados, 4 aplicados en parte (se aplica el fondo y se corrige una cifra o un dato del propio
hallazgo) y 1 rechazado. Varios hallazgos se repetían
entre lentes; se indica con «= H…».

### Lente de hechos

| n.º | gravedad | hallazgo | resultado | comprobación y cambio |
|---|---|---|---|---|
| H1 | alta | «Montserrat no aparece en el texto» | **aplicado** | El Diario escribe «Monserrat»: V2 107245 · v3 121341 (Lamoneda) y V2 107248, 107251 · v3 121345, 121350 (proposiciones fechadas). Ficha IV, §17 y discrepancia 33 corregidas |
| H2 | alta | Figueres «está en la nota del volumen, no en el extracto»; «pendiente del PDF» | **aplicado** | «Castillo de Figueras» en V2 107337 · v3 121459; la nota posterior (V2 107341, fila de la Presidencia · v3 121465) explica la fotocopia del n.º 69 y atestigua las cuatro reuniones de París. Plantillas B y F, D-9, ficha IV, puerta 10.7 y El Diario |
| H3 | alta | «Seis votaciones nominales» leído como todas | **aplicado** | 969 filas V2 con listas («dijeron» o «han dicho») de 394 sesiones; 970 de 395 en la v3. «Escogidas» y el total al lado en Inicio, Sesiones, F26, Procedencia y discrepancia 20 |
| H4 | media | El control de F05 no corresponde a su filtro | **aplicado** | Con `chair = false`: 59.938 filas y 21.207.769 palabras; por etapa, 11.444.854 · 8.116.358 · 1.479.781 · 102.052 · 64.724. Los cinco primeros se reproducen |
| H5 | media | «Los discursos de Negrín van a nombre de la Presidencia» | **aplicado** | Solo dos: V2 107148 (6.378) y 107232 (7.749); la v3 los separa (121219, 121328). 107268 y 107326 ya van a su nombre. D-1 y ficha IV |
| H6 | media | La tesis dice «todo» | **aplicado** (= R2) | V2 71329 recuerda la sesión secreta; F28 documenta las órdenes de borrar. Tesis con «sesión pública» y «salvo lo que la Presidencia mandó borrar» |
| H7 | media | La fórmula, «casi siempre contra la puerta cerrada» | **aplicado** | Leídas las diez filas: solo V2 71330 va contra una sesión secreta, y 23898 en parte. El Diario §3 lo dice así |
| H8 | media | La tabla de Afinidades no suma el censo | **aplicado** (= R5) | Firman y están en el censo 453 / 440 / 315; sin ficha 1 / 6 / 1; aislados 22 / 30 / 186, que suman 475 / 470 / 501 |
| H9 | media | «Casi todo el cruce estricto con el PNV» | **aplicado** | 85 de 347 filas par-medida; en el lado derecho, CEDA 97, PNV 85, Lliga 74, Independiente 68. «Una cuarta parte» |
| H10 | media | El README no menciona LLaVA | **aplicado** | MD5 `f2638800…`: dice «GLM-OCR, via Ollama, with a structured prompt» y «Jaro-Winkler»; nada de LLaVA. Método 10 y discrepancia 40 |
| H11 | media | «649 apellidos compartidos» | **aplicado** (con R6) | El .docx no depositado dice «649 distinct first-surname strings». La frase sale de la 0.1 hasta que el exportador la recuente |
| H12 | media | «147 vacíos: ministros sin escaño» | **aplicado** | Con `parse_speaker`: 123 ministros, 11 secretarios, 5 «El Sr. VICEPRESIDENTE:», 2 de la Presidencia y 6 diputados mal leídos (V2 97389, Blasco-Ibáñez). F32 y Método 04 |
| H13 | media | La sesión 321 no es «otra»; la portada dio la fecha errónea | **aplicado** | `erratas_fechas_V1.csv`: 1931-07-14 → 1933-03-31; `AUDITORIA_FECHAS.md` lo atribuye a la portada del Tomo XX. Método 07 |
| H14 | media | Tres de las cuatro verificaciones de la 0.2 se cierran | **aplicado** | Ortega, V2 1215 · v3 1337, 30-VII-1931 (el 14-VII tiene 10 filas); botas V2 102493, horca V2 102481; réplicas V2 85423 y 85427. Ficha I, 10.9 y D-9 |
| H15 | media | Qué bibliotecas salen del índice | **aplicado** (= R19) | `bibliotecas_v3.json`: «Sesiones decisivas» (externo más interno) y «Sesiones más crispadas» (IRP); la tercera es de la bibliografía. «La segunda y la cuarta» |
| H16 | media | Prieto: «unas 21.000 de un documento leído» | **aplicado** | v3 61929–61932: 2.654 + 1.079 de Prieto; 527 (tabla) y 21.111 («DOCUMENTOS COMPLEMENTARIOS…»). 21.638 y «documentos complementarios impresos». Método 06, Versiones, D-1 y F12 |
| H17 | baja | Citas que no coinciden letra a letra | **aplicado** (= R4) | Las once comprobadas en su fila: «Luz y taquigrafos.», «Si, prometo.», «Diputados—no he visto», «…—Aplausos.—Rumores.)», «(Muy bien); […]», «mas uno son 232», «veintidos», «Tiros a la barriga, a la barriga!», el sumario en mayúsculas |
| H18 | baja | «nuevo aviso» no es de sumario ni solo de la v3 | **aplicado** | V2 101697 · v3 114872 (Presidencia, Alba); también V2 97549 (29-X-1935). Añadidos V2 107095, 107303 y 6999 a sus citas |
| H19 | baja | 584 / 10.009 no se reproduce con `parse_speaker` | **aplicado** | `parse_speaker`: 586 sesiones y 10.025 filas; la búsqueda literal da 584 y 10.009. Se usa 586 con su método, y se anota el otro |
| H20 | baja | «17 de 21 citan Wikipedia, blogs o prensa» | **aplicado** | `hitos.js`: 17 Wikipedia, 3 blog o prensa, 1 congreso.es. D-12 |
| H21 | baja | «Una fila cada vez que el taquígrafo anotó un orador» | **aplicado** | V2 25979 contiene «El Sr. Presidente del CONSEJO DE MINIS…» dentro de una fila de la Presidencia. «Cada vez que el etiquetado reconoció la fórmula impresa». Inicio, Método 01, El Diario §1 y F30 |
| H22 | baja | 1.508 filas «de diputados» | **aplicado** (= R7) | Por papel: 1.144 diputados, 232 Presidencia, 125 Gobierno, 7 secretarios. Sin «como prueba» ni «como arma» |
| H23 | baja | «Cuatro series y dos extractos» | **aplicado** (= R16) | «Cuatro series, dos de ellas extractos» |
| H24 | baja | Nombres de los debates y «sesiones enteras» | **aplicado** | Nombres exactos de `bibliotecas_v3.json`; «Sufragio femenino» tiene 770 entradas de 837 filas v3 (faltan 65 comentarios y 2 sumarios). Solo las L3 traen el acta entera |
| H25 | baja | Falta el id V2 de la lista del 368 | **aplicado** | V2 13525 («Conviene que se lean las listas de votantes…»). F26 y Sesiones |
| H26 | baja | «La parte de las firmas» no es el denominador | **aplicado** | Filas par × medida del edgelist: 30.345, 27.172 y 5.990 |

### Lente de reglas

| n.º | gravedad | hallazgo | resultado | comprobación y cambio |
|---|---|---|---|---|
| R1 | alta | Seis votaciones como todas | **aplicado** (= H3) | Además, Sesiones y votaciones gana el registro de todas por etapa (hoy, V2: I 500/200 · II 391/160 · III 76/32 · IV 2/2) y la tabla por sesión en Datos |
| R2 | alta | «Nunca fue secreto» | **aplicado** (= H6) | Espina: «Casi nunca fue secreto: sobre todo, inabarcable», con la tensión de El Diario como contrapunto |
| R3 | alta | Acotaciones de conflicto (163, 110, 82) en la 0.1 | **aplicado** | La fuente cuenta «unidades» (`clima_sesiones_v2.json › _meta`). Salen de las fichas, las puertas y Procedencia; D-11 dice que también las bloquea |
| R4 | media | Citas «corregidas» e ids equivocados | **aplicado** (= H17) | «Mitad mas uno son 232» en V2 37178; «El Reglamento dispone…» en v3 115674; Comín nombrado; el gancho, «Luz y taquigrafos.» letra a letra |
| R5 | media | Tabla de Afinidades | **aplicado** (= H8) | Con aserto en el exportador: las partes suman el censo |
| R6 | media | «649 compartidos» es imposible | **aplicado en parte** | La imposibilidad es cierta. Su recuento alternativo (538 / 82 / 317) es heurístico y sin definición: no se usa. La frase sale de la 0.1 |
| R7 | media | 1.508 mezcla trámite y uso | **aplicado** (= H22) | Su «al menos 207 de la Presidencia» es en realidad 232 (206 + 26 vicepresidentes) |
| R8 | media | El plan anula la regla de pesos de la crítica | **aplicado** | La crítica prevalece: rige «unos 112 MB comprimidos» y «unos 282 MB» mientras usted decide D-26 (nueva). Quitado «Sustituye la regla de la crítica» |
| R9 | media | F16 infla la Presidencia; faltan las marcas `verificar` | **aplicado** | `sessions.json`: 15 presidentes con `verificar: true` (14 Jiménez de Asúa, 1 Fernández Clérigo) y el Gobierno Giral en 3 sesiones. Pregunta de F16 nueva; otro trazo y «por verificar» |
| R10 | media | D-3 frente a F34 | **aplicado** (= V7) | F34 depende de D-3: se construye con Afinidades, con el sello; Datos §6 da la regla sin cifras mientras tanto |
| R11 | media | ¿El tope es del contexto o de la ficha? | **aplicado** | Dos topes en la plantilla C: el de «Lo que pasó en la Cámara» y el de la ficha entera. Copy 2a reestimado |
| R12 | media | La regla de una protagonista no se cumple | **aplicado** (= V27) | Protagonista frente a secundaria, tope por plantilla, `peso.spec` cuenta figuras. La variante de sacar F26 de Inicio va en D-5 |
| R13 | media | El criterio de D-9 es falso | **aplicado** | Tras H14, en el corpus solo queda el art. 81 [EXT]. D-9 dice su criterio real (calendario y esfuerzo) y añade la opción de once puertas |
| R14 | baja | ↺ 5 queda falsa si llegan los enlaces | **aplicado** | ↺ 5 y la línea de 8.9 bajo `ENLACES_PROFUNDOS`, con dos redacciones; la llegada de D-4 abre revisión del copy |
| R15 | baja | «Giménez Fernández» dado por fijado | **aplicado** | «Jiménez Fernández [grafía por confirmar]» en los borradores; la entrada 456 se cierra antes del copy 2a |
| R16 | baja | «Cuatro series y dos extractos» | **aplicado** (= H23) | — |
| R17 | baja | 17.152 contra la regla «más de 17.000» | **aplicado** | La puerta del Estatuto dice «más de 17.000» y veta las tres cifras |
| R18 | baja | La portada «sin cambios» con controles añadidos | **aplicado** | `hero_svg.py` es estático. El resalte pasa a propuesta explícita (D-27, nueva), con la opción de dejarla estática recomendada |
| R19 | baja | Plan y narrativa no coinciden en las bibliotecas del índice | **aplicado** (= H15) | Fijado en la plantilla C. En F17, «Sesiones más crispadas» con su nombre entre comillas y sin destacar |
| R20 | baja | «órdenes 410–414» frente a la pantalla | **aplicado** | El explorador enseña `ord` + 1: «Orden 411» a «Orden 415» |
| R21 | baja | Cuatro o cinco meses en 1936; «Mayo y junio» | **aplicado** | «Del 16 de marzo al 10 de julio»; «cuatro meses de Cámara en paz y nueve sesiones en guerra»; «De abril a julio: el Diario borra» |
| R22 | baja | «El discurso más largo» sin base | **aplicado** | Solo vale en la v3 (29042, 17.142); en la V2 la fila más larga es 55221 (25.371). Quitado de Inicio y del título de la puerta |
| R23 | baja | «107.556 piezas de habla de la V2» | **aplicado** | «Etiquetas de orador del proceso; la V2 tiene 107.551 filas», con la diferencia de 5 al lado |
| R24 | baja | «Por primera vez en el Diario» | **aplicado** | V2 70714 es la única fila con «tiros a la barriga»; se dice «en el corpus, con esa búsqueda» |
| R25 | baja | «Hagan», «beat», «OCR», cargos en minúscula, frases largas | **aplicado** | «Haga» por defecto y el «Hagan» como excepción en D-24; «movimiento»; «reconocimiento óptico»; «Presidente del Gobierno provisional»; frases partidas |

### Lente de viabilidad

| n.º | gravedad | hallazgo | resultado | comprobación y cambio |
|---|---|---|---|---|
| V1 | alta | Seis votaciones como recuento | **aplicado en parte** (= H3) | Solo el 13-X-1931 hay seis (V2 6738, 6812, 6818, 6844, 6923, 6994), comprobado. Su cifra «964 filas en 395 sesiones» no se reproduce: son 959 en 391 con «dijeron» y 969 en 394 con las dos variantes |
| V2 | alta | La tabla de grafías no cubre lo que exponen los CSV y F21 | **aplicado** | D-22 pasa a bloquear la Puerta 1, con (a) grafía en texto y rótulos visibles, y `rep_name` en los CSV, recomendada |
| V3 | alta | Los presupuestos de peso chocan con las figuras | **aplicado** | Tabla por sesión al CSV, conmutación con variables CSS, F30 en `<details>` con tres columnas, grados de F21 en CSV; `peso` mide solo el HTML. La calibración en bytes no se volvió a medir: el orden de magnitud basta |
| V4 | alta | Anclas que solo existen en la v3 | **aplicado en parte** | `citas.json` con `ediciones` (`V2+v3`, `solo_v3`, `atribucion_distinta`); Estatuto añadido al anexo 9. Corrección: la réplica de Oriol sí está en la V2 (74621) |
| V5 | media | Dianas de 44 px imposibles; F16 en una rejilla | **aplicado** | En el móvil la diana es el mes; excepción declarada para marcas densas; bandas F16 repetidas bajo cada fila de año |
| V6 | media | Piezas «tal cual» que no se pueden copiar | **aplicado** | Comprobado en ParlaIbero (tres paneles fijos con `throw`, `Salidas` cableado a El Salvador, `Tareas` importa `./contexto`, `Vecinas` usa `PAISES`). Pasan a «Se reescribe»; componentes, de 1 a 2 j |
| V7 | media | D-3 frente a F34 | **aplicado** (= R10) | — |
| V8 | media | Aislados 22 / 30 / 186 deberían ser 21 / 24 / 185 | **rechazado** | Resta a los censos firmantes que no tienen ficha (1 / 6 / 1). Los aislados, fichas del censo sin arista, son 22 / 30 / 186, y suman el censo con 453 / 440 / 315. Sí se aplica lo de fondo: la cifra sale del exportador (marcador en F22) |
| V9 | media | Cifras de conflicto sin fuente en el exportador | **aplicado** (= R3) | Opción (a): fuera de la 0.1 |
| V10 | media | CSV por fila de F30 y `meta` en `sesiones.csv` | **aplicado** | F30 sin CSV por fila; `sesiones.csv` sin `meta` hasta D-19 |
| V11 | media | [Copiar la consulta] donde no hay consulta | **aplicado** | El buscador solo entiende texto (estudio del explorador §4a). Los filtros van como pasos escritos sin botón |
| V12 | media | Huecos del i18n | **aplicado** | `etiquetas.json` bilingüe; vetos en inglés; `--strict` solo en publicación |
| V13 | media | `check-i18n` y los números que no son cifras | **aplicado** | Familias `fecha.*`, `fila.*`, `sesion.*.num`, `art.*`, `pag.*`; bibliografía con `data-audit-exento` |
| V14 | media | Estimación irreal | **aplicado** | De ≈ 36,75 a ≈ 49,5 j (45–54), más una reserva de hasta 4 j para dependencias abiertas |
| V15 | media | Pruebas que no pueden correr en la integración continua | **aplicado** | Citas en local por el exportador, con huella en el sello; lista de huellas de `figs/data/`; pruebas nuevas de enlaces, axe, teclado y JSON-LD; `sinjs` ampliado |
| V16 | media | Mapa del sitio, JSON-LD, `x-default`, favicon, fuentes de og, licencias | **aplicado** | `astro.config.mjs` de ParlaIbero lleva `pt-BR` en el mapa: se adapta. Todo al árbol y a la estimación |
| V17 | media | F21 sin resolver | **aplicado** | Dos PNG por legislatura, semilla fija, vecinos bajo demanda, una legislatura sin JS |
| V18 | media | Umbrales de F26 | **aplicado** | 417 / 209 en V2 102359; el 232 / 462 es de la Reforma agraria, al principio de V2 37178. Tres líneas y filas separadas en `votaciones.json` |
| V19 | baja | F30 para una sola sesión; 12 frente a 13 | **aplicado** | Sesión 56 (14-X-1931, 24 filas V2) contiene V2 7022. Múltiplos por sesión; «13 sesiones»; filtros 13–14/10/1931 |
| V20 | baja | «Unos 730» no cierra la suma | **aplicado** | `mapa_v2_v3.json`: 735; 107.556 + 735 = 108.291 |
| V21 | baja | F19 sin base | **aplicado** | Bases `readme` y `ocr`; si la de `ocr` no se fija, la 153 se quita |
| V22 | baja | Denominadores propios de F05 | **aplicado en parte** | 772 `rep_id` y 416 / 390 / 244 / 43 / 27 se confirman. Su ejemplo «11.435.820 palabras en la I» no se reproduce: son 11.444.854 (= H4) |
| V23 | baja | NotaBases y el pie | **aplicado** | La regla mira `<main>`; el pie lleva `data-nota-bases` |
| V24 | baja | Capturas con problemas | **aplicado** | Comprobado en el estudio del explorador: g, h, j y k llevan ◆; `k_…_recordada` enseña 269 MiB; `b_busqueda` enseña el clima |
| V25 | baja | D-15 no se puede implementar | **aplicado** | `prefers-color-scheme` no tiene «sin preferencia»: D-15 queda en seguir al sistema u oscuro por defecto |
| V26 | baja | La cabecera no cabe a 360 px | **aplicado** | No se midió en ParlaIbero; el razonamiento es plausible y la corrección, barata: descriptor oculto por debajo de 40 rem y tope de altura en `humo` |
| V27 | baja | La regla 1 no se puede comprobar | **aplicado** (= R12) | — |
| V28 | baja | Escala exportable, `tokens.json`, componentes de F25 y F33 | **aplicado** | Se exporta F01 completa; `tokens.json` a `src/config/`; `FigLinea` cubre F25 y `FigRecuentos` F33 |
| V29 | baja | El exportador dentro del proyecto del explorador | **aplicado** | A `luz_site/exportador/`, leyendo en modo solo lectura; la otra ubicación, solo con su autorización |
| V30 | baja | Dos H2 casi iguales en Inicio | **aplicado** | El movimiento 5 pasa a «¿Qué sesión leo primero?» |

### Decisiones nuevas o cambiadas por la revisión

- **D-22** (grafías) sube a «Bloquean la Puerta 1», con su alcance.
- **D-26** *(nueva)*: unidad del peso de la descarga del explorador. Rige la regla de la crítica mientras tanto.
- **D-27** *(nueva)*: resalte de la portada; se recomienda dejarla estática.
- **D-9**: criterio real y opción (b) de once puertas.
- **D-11**: bloquea también las cifras de conflicto de la 0.1.
- **D-15** y **D-24**: redactadas de nuevo.
