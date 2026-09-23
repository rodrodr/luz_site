# Copy ES · Las Cortes, 1931–1945 (`/[lang]/cortes/`), plantilla de ficha y figuras de las fichas

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_a** (índice de Las Cortes y
> fichas I y II). Este archivo trae tres cosas: el índice `/es/cortes/` (narrativa §7), **la plantilla común de las cinco
> fichas** (`cortes.ficha.*`, plan § Plantilla C) y **los textos de sus figuras** (F01 completa, F01e, F16, F05 y F09:
> títulos, entradas, leyendas, plantillas de nota emergente, cabeceras de tabla y salvedades). Las fichas I y II están en
> `cortes_1931.md` y `cortes_1933.md`; las III a V son de otro grupo, que **reutiliza** estas claves comunes sin
> redefinirlas (petición en `docs/peticiones/cortes_a.md`). Marcadores: `docs/marcadores/cortes.md`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `{{marcador}}` (años de un hecho, fechas de sesión y números de artículo van en claro, como en
> ParlaIbero). En las plantillas de nota emergente, `{{nombre}}`, `{{n}}`, `{{den}}`… son variables que rellena la
> figura (`data-v-*`), no cifras de `cifras.json`.
>
> **Correcciones a la narrativa y al plan, recalculadas hoy sobre las fuentes:**
> 1. **«En 584 de 755 sesiones presidió un vicepresidente»** (plan, F16): 584 son **fechas**, contadas con una
>    expresión que no ve las erratas del reconocimiento óptico («VIEPRESIDENTE»). Con el analizador de etiquetas del
>    explorador y por sesión (fecha y número), son **586 sesiones y 10.025 filas** (V2). La salvedad de F16 usa
>    `pres.vice_ses` con ese valor. Coincide con lo que encontró el grupo de Método.
> 2. **«La sesión 48 entera» no se dice**, y la sesión 9 no «repite una línea seis veces»: repite el mismo par de nombres
>    en bucle dentro de una fila de la Presidencia (V2 976). Se dice así, sin cifra.
> 3. **La Diputación Permanente**: la narrativa pedía [EXT] para sus reuniones de 1936 y de París en 1939. No he
>    encontrado una referencia académica o institucional que pueda comprobar hoy, así que **se recorta**. Queda lo que
>    dice la Constitución (Gaceta de Madrid, comprobada) y lo que dice la carátula de México (v3 121466).
> 4. La frase «de julio de 1931 a noviembre de 1945» es un hecho del calendario (primera y última sesión), no una cifra.

---

## 1. Las Cortes · índice (`/[lang]/cortes/`)

<!-- cortes.meta.titulo --> Las Cortes, 1931–1945
<!-- cortes.meta.descripcion --> Las {{sesiones}} sesiones del Congreso entre 1931 y 1945, mes a mes, y las etapas de sus legislaturas: lo que tiene y lo que le falta cada una.

<!-- cortes.antetitulo --> V2 · {{sesiones}} sesiones · {{sesion.primera|fecha_corta}} → {{sesion.ultima|fecha_corta}}
<!-- cortes.titulo --> ¿Qué Cortes están aquí, y cuándo se reunieron?

<!-- cortes.entrada -->
La base reúne {{legislaturas.V2|letra}} legislaturas, partidas aquí en {{etapas.n|letra}} etapas. Son {{sesiones}} sesiones, de julio de 1931 a noviembre de 1945. Cada bloque del calendario abre la ficha de su etapa.

<!-- cortes.subnav.etapas --> Etapas
<!-- cortes.subnav.sesiones --> Sesiones y votaciones

### 1.1 Cómo leer el calendario

> [nota de diseño] Va ANTES de la figura, como instrucción, con una muestra dibujada junto a cada línea (las cuatro
> muestras del plan). Sin color para la ausencia: contorno y rótulo.

<!-- cortes.leer.titulo --> Cómo leer el calendario

<!-- cortes.leer.con_sesion -->
**Mes con sesión.** Lleva tono y, dentro, una barra por sesión. La altura de la barra dice cuántas palabras imprimió el Diario ese día.

<!-- cortes.leer.sin_sesion -->
**Mes sin sesión dentro de su etapa.** Contorno y rótulo, sin color.

<!-- cortes.leer.fuera -->
**Mes fuera de toda etapa.** Vacío.

<!-- cortes.leer.salto -->
**«//».** El salto de marzo de 1939 a diciembre de 1944: el corpus no tiene ninguna sesión en esos meses.

<!-- cortes.leer.regla -->
La ausencia no lleva color, y su causa no se rotula: no sale del corpus.

### 1.2 F01 · El calendario completo

<!-- cortes.calendario.titulo --> Cuándo se reunieron, sesión a sesión

<!-- cortes.calendario.entrada -->
Una marca por sesión, de julio de 1931 a noviembre de 1945. Los anillos señalan las sesiones que tienen puerta de lectura.

> [nota de diseño] Lo que dice la figura, frase a frase, bajo el título y antes del gráfico. Base V2
> (`meses.json`). Cada frase lleva su etapa enlazada.

<!-- cortes.calendario.dice.I -->
Las Constituyentes se reunieron en {{etapa.I.meses.con_sesion}} de sus {{etapa.I.meses}} meses; el que falta es enero de 1933.

<!-- cortes.calendario.dice.II -->
La legislatura elegida en 1933 dejó {{etapa.II.meses.sin_sesion|letra}} meses sin sesión: agosto y septiembre de 1934, abril y agosto de 1935.

<!-- cortes.calendario.dice.III -->
La Cámara de 1936 se reunió en los {{etapa.III.meses|letra}} meses que tuvo antes de la guerra.

<!-- cortes.calendario.dice.IV -->
De la guerra quedan {{etapa.IV.sesiones|letra}} sesiones en {{etapa.IV.meses}} meses.

<!-- cortes.calendario.dice.hueco -->
Después vienen {{meses.salto}} meses sin ninguna sesión en el corpus, hasta enero de 1945.

<!-- cortes.calendario.dice.V -->
En 1945 hay {{etapa.V.sesiones|letra}} sesiones, celebradas en México, en {{etapa.V.meses.con_sesion|letra}} de los {{etapa.V.meses}} meses de la etapa.

<!-- ↺ comun.boton.ver_sesiones --> [Ver las sesiones y votaciones]

> [nota de diseño] Debajo, la pestaña Datos de la figura con [Descargar los datos de la figura] y la frase ↺ 12
> (claves de `comun.md`). En F01, además, SVG y PNG.

### 1.3 De legislaturas a etapas

<!-- cortes.etapas.titulo --> Legislaturas y etapas

<!-- cortes.etapas.entrada -->
El CSV rotula cada fila con su legislatura. La tercera, 1936-1939, reúne tres cosas distintas: la Cámara de 1936, las sesiones de la guerra y las de México.

<!-- cortes.etapas.corte -->
Aquí esa legislatura se parte por su propia numeración: sesiones {{etapa.III.num.desde|id}} a {{etapa.III.num.hasta|id}}, {{etapa.IV.num.desde|id}} a {{etapa.IV.num.hasta|id}} y {{etapa.V.num.desde|id}} a {{etapa.V.num.hasta|id}}.

<!-- cortes.etapas.corte_fechas -->
El corte por número coincide con el corte por fechas: ninguna sesión de un tramo cae entre las de otro.

<!-- cortes.etapas.extractos -->
De la guerra y de México no hay Diario íntegro, sino extractos oficiales. Lo dicen los metadatos del proyecto, que el explorador no muestra.

> [nota de diseño] Tabla tipográfica, una fila por etapa, con el nombre de la etapa enlazado a su ficha. Filas y
> palabras en V2; la columna «Filas (v3)» lleva NotaBases. La serie del Diario lleva el sello ↺ 2 «Metadatos del
> proyecto». Celdas: `etapa.<E>.sesiones` · `etapa.<E>.fecha.desde`–`.hasta` (`|fecha_corta`) · `etapa.<E>.serie` ·
> `etapa.<E>.filas` · `etapa.<E>.palabras` · `etapa.<E>.palabras.pct` · `etapa.<E>.diputados` · `etapa.<E>.filas_v3`.

<!-- cortes.etapas.tabla.titulo --> Las etapas, en cifras
<!-- cortes.etapas.tabla.col.etapa --> Etapa
<!-- cortes.etapas.tabla.col.sesiones --> Sesiones
<!-- cortes.etapas.tabla.col.fechas --> Fechas
<!-- cortes.etapas.tabla.col.serie --> Serie del Diario
<!-- cortes.etapas.tabla.col.filas --> Filas (V2)
<!-- cortes.etapas.tabla.col.palabras --> Palabras (V2)
<!-- cortes.etapas.tabla.col.pct --> Del corpus
<!-- cortes.etapas.tabla.col.diputados --> Diputados que intervienen
<!-- cortes.etapas.tabla.col.filas_v3 --> Filas (v3)

<!-- cortes.etapas.tabla.pie -->
«Diputados que intervienen» cuenta identificadores de diputado distintos, incluido el de quien preside. En todo el corpus son {{diputados.V2}}.

<!-- cortes.etapas.tabla.pie_leg -->
Por legislatura del CSV son {{leg.1931-1933.diputados}}, {{leg.1933-1935.diputados}} y {{leg.1936-1939.diputados}}: la suma por etapas cuenta dos veces a quien habla en más de una.

<!-- ↺ comun.fija.notabases -->
Esta cifra sale de la edición del explorador (v3, {{filas.v3}} filas, sin depositar); la depositada es la V2 ({{filas.V2}} filas). Por qué hay dos →

### 1.4 Lo que no está aquí

<!-- cortes.ausente.titulo --> Lo que no está aquí

<!-- cortes.ausente.permanente -->
La Constitución de 1931 creó una Diputación Permanente de Cortes, en su artículo 62. Con las Cortes disueltas, resolvía en su lugar sobre la suspensión de garantías (artículo 42).

<!-- cortes.ausente.permanente_corpus -->
Sus reuniones no están en el corpus.

<!-- cortes.ausente.caratula -->
La carátula del volumen de México enumera las que celebró allí, de 1939 a 1943. Y añade: «sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia».

<!-- cortes.ausente.caratula_fila -->
Esa carátula abre el sumario del 10 de enero de 1945, y solo está en la edición del explorador (v3 {{fila.mexico_caratula.v3|id}}).

<!-- cortes.ausente.discursos -->
Tampoco están los discursos pronunciados fuera del Parlamento.

<!-- cortes.ausente.fuentes -->
Fuente externa: [I] *Constitución de la República Española*, artículos 42 y 62. *Gaceta de Madrid*, núm. 344, 10 de diciembre de 1931, pp. 1578–1588.

<!-- cortes.margen -->
Que no falte un número no prueba que el último sea el último publicado.

> [nota de diseño] La frase del margen va junto a la tabla de etapas (salvedad al margen, ≤ 40 palabras).

### 1.5 Las etapas, una a una

> [nota de diseño] Registro de calendario, una línea por etapa: fechas en mono · nombre enlazado a su ficha · una línea
> con lo que tiene y lo que le falta. Los nombres son también el H1 de cada ficha y el rótulo de cada bloque de F01;
> las fichas III a V los reutilizan tal cual.

<!-- cortes.etapa.I.nombre --> Las Cortes Constituyentes (1931–1933)
<!-- cortes.etapa.II.nombre --> La legislatura elegida en 1933
<!-- cortes.etapa.III.nombre --> Las Cortes de 1936, hasta la guerra
<!-- cortes.etapa.IV.nombre --> Las Cortes en guerra (1936–1939)
<!-- cortes.etapa.V.nombre --> Las Cortes en México (1945)

<!-- cortes.etapa.registro --> Las {{etapas.n|letra}} etapas, una a una
<!-- cortes.etapa.recuento --> {{n}} sesiones
<!-- cortes.puertas.registro --> Las puertas, sesión a sesión

<!-- cortes.etapa.I.corto --> Constituyentes
<!-- cortes.etapa.II.corto --> 1933-1935
<!-- cortes.etapa.III.corto --> 1936
<!-- cortes.etapa.IV.corto --> Guerra
<!-- cortes.etapa.V.corto --> México

<!-- cortes.etapa.I.linea -->
La Cámara que escribió la Constitución, y que después legisló con ella.

<!-- cortes.etapa.II.linea -->
Otra mayoría, otros oradores; la etapa con más meses sin sesión.

<!-- cortes.etapa.III.linea -->
El Diario de la nueva Cámara, de marzo al 10 de julio de 1936.

<!-- cortes.etapa.IV.linea -->
Extractos oficiales de las sesiones celebradas durante la guerra.

<!-- cortes.etapa.V.linea -->
Las sesiones celebradas en México en 1945.

> [nota de diseño] Las líneas de III a V puede reescribirlas su dueño: están aquí porque el índice es de este grupo;
> basta con avisar en `peticiones/cortes_a.md`.

---

## 2. Plantilla de ficha, común a las cinco etapas (`/[lang]/cortes/<etapa>/`)

> [nota de diseño] Orden fijo del plan (plantilla C): cabecera · Hoy puede · Cifras · Lo que pasó en la Cámara ·
> Cuándo se reunió · Quién tomó la palabra · Puertas de esta etapa · Antes de usarla · Para leer más · Cómo citar ·
> vecinas. Solo entran las secciones que la etapa sostiene. Numeral romano en contorno como marca de agua (es marca,
> no dato). Índice lateral con los H2 y los H3 de «Lo que pasó en la Cámara».

<!-- cortes.ficha.miga --> Las Cortes / {{romano}}

> [nota de diseño] `{{romano}}` es variable de plantilla (I…V), no cifra.

<!-- cortes.ficha.antetitulo.proyecto --> metadatos del proyecto

<!-- cortes.ficha.hoy.titulo --> Hoy puede
<!-- cortes.ficha.hoy.consulta --> Consulta
<!-- cortes.ficha.hoy.recuento --> resultados en el explorador el {{fecha}}

> [nota de diseño] Cada tarea de «Hoy puede» lleva el componente `CopiarConsulta`: la consulta en `<code>`
> seleccionable, [Copiar la consulta] · [Abrir el explorador ↗] y, debajo, ↺ 5 una vez por página. El recuento va con
> su fecha y su base (v3).

<!-- ↺ comun.fija.enlace -->
El explorador no abre una búsqueda desde un enlace: cópiela y péguela en su buscador (tecla /).

<!-- cortes.ficha.cifras.titulo --> Cifras
<!-- cortes.ficha.contexto.titulo --> Lo que pasó en la Cámara

<!-- cortes.ficha.contexto.ids -->
Cada hecho de la Cámara lleva su fila: «V2» es el identificador en la edición depositada; «v3», en la del explorador.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- cortes.ficha.contexto.externas --> Fuentes externas de este apartado
<!-- cortes.ficha.contexto.puerta --> Tiene su puerta de lectura →

> [nota de diseño] Los ids de fila van en mono, en la forma «V2 5423 · v3 6078». Las fuentes [A] e [I] de cada
> apartado van al pie del apartado, en cuerpo pequeño, con el rótulo `cortes.ficha.contexto.externas`.

<!-- cortes.ficha.calendario.titulo --> Cuándo se reunió
<!-- cortes.ficha.palabra.titulo --> Quién tomó la palabra
<!-- cortes.ficha.puertas.titulo --> Puertas de esta etapa
<!-- cortes.ficha.debates.titulo --> Debates preparados en el explorador

<!-- cortes.ficha.debates.como -->
Se añaden desde Mis bibliotecas, con «Añadir bibliotecas del proyecto…».

<!-- cortes.ficha.debates.salvedad -->
Cada debate reúne las intervenciones de sus sesiones clave, no solo las del asunto que le da nombre.

<!-- cortes.ficha.antes.titulo --> Antes de usarla
<!-- cortes.ficha.leer.titulo --> Para leer más

<!-- cortes.ficha.leer.nota -->
Solo obras que hemos comprobado. [A], académica; [I], institucional.

<!-- cortes.ficha.citar.titulo --> Cómo citar

<!-- cortes.ficha.citar.conjunto -->
Cite el conjunto con la referencia de Harvard Dataverse:

<!-- cortes.ficha.citar.sesion -->
Cite una sesión por su fecha y su número, y cotéjela con el Diario:

<!-- cortes.ficha.citar.paginas -->
Número de Diario y páginas: metadatos del proyecto (no depositados; el explorador no los muestra).

> [nota de diseño] La cita del conjunto es `{{dv.thqcmi.cita}}` (de `base.py`), con [Copiar la cita] en texto, BibTeX
> y RIS dentro de un `<details>`. La de la sesión es la plantilla de cada ficha.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

<!-- cortes.ficha.vecinas.anterior --> Etapa anterior
<!-- cortes.ficha.vecinas.siguiente --> Etapa siguiente
<!-- cortes.ficha.vecinas.indice --> Todas las etapas

---

## 3. Figuras de Las Cortes y de las fichas

> [nota de diseño] Contrato común de figuras (plan): texto en HTML sobre el SVG, pestañas Gráfico · Tabla · Datos
> (rótulos de `comun.md`), nota emergente por plantilla con cifra, numerador y denominador, teclado ← → Inicio Fin Esc,
> una conmutación como mucho. Los nombres de meses, etapas, presidentes, Gobiernos, diputados y familias vienen de los
> datos (`grafias.json` para las personas), no del copy.

### F01 · Calendario de las sesiones (completo en Las Cortes; recorte F01e en cada ficha)

<!-- fig.F01.titulo --> Calendario de las sesiones, 1931–1945
<!-- fig.F01.pregunta --> ¿Cuándo se reunieron las Cortes, cuánto se habló en cada sesión y qué falta?
<!-- fig.F01.alt -->
Calendario de {{sesiones}} sesiones, de julio de 1931 a noviembre de 1945, agrupado por etapas, con una barra por sesión. Los meses sin sesión llevan contorno.

<!-- fig.F01.conmuta.titulo --> Altura de la barra
<!-- fig.F01.conmuta.palabras --> Palabras
<!-- fig.F01.conmuta.diputados --> Diputados que intervienen

<!-- fig.F01.leyenda.con_sesion --> Mes con sesión
<!-- fig.F01.leyenda.sin_sesion --> Sin sesión dentro de la etapa
<!-- fig.F01.leyenda.fuera --> Fuera de toda etapa
<!-- fig.F01.leyenda.puerta --> Sesión con puerta de lectura
<!-- fig.F01.leyenda.doble --> Dos sesiones el mismo día
<!-- fig.F01.leyenda.salto --> Salto: ningún mes con sesión entre 1939 y 1944
<!-- fig.F01.leyenda.tono --> Palabras impresas en el mes (V2), en cinco clases de {{f01.clase.4.meses|letra}} o {{f01.clase.0.meses|letra}} meses con sesión
<!-- fig.F01.leyenda.altura --> Altura de la barra: palabras de la sesión (V2). La más alta, {{f01.sesion_max.palabras}}.
<!-- fig.F01.leyenda.altura_dip --> Altura de la barra: diputados que intervienen, con quien preside (V2). La más alta, {{f01.sesion_max.diputados}}.
<!-- fig.F01.leyenda.barra --> Una sesión

<!-- fig.F01.salto -->
{{desde}} → {{hasta}}: {{n}} meses; el corpus no contiene ninguna sesión.

> [nota de diseño] El rótulo del «//» se rellena con `meses.salto.desde` (1939-03, `|mes`), `meses.salto.hasta`
> (1944-12) y `meses.salto`. Ningún otro hueco lleva rótulo de texto: los demás meses sin sesión llevan solo contorno y
> su nota.

> [nota de diseño] Fase 2 (grupo 1): la nota emergente tiene tres líneas (DESIGN.md § Sistema de figuras): qué
> (el mes o la fecha, en garamond), las cifras (mono) y la base con su fuente. Por eso cada plantilla se parte en su
> línea de cifras (`fig.F01.nota.*`) y su línea de base (`*.base`); la primera línea es la variable `{{mes}}` o
> `{{fecha}}`, que pone la figura. Las palabras son las de la fase 1.

<!-- fig.F01.nota.mes -->
{{sesiones}} sesiones · {{filas}} filas · {{palabras}} palabras · {{diputados}} diputados intervienen

<!-- fig.F01.nota.mes_una -->
una sesión · {{filas}} filas · {{palabras}} palabras · {{diputados}} diputados intervienen

<!-- fig.F01.nota.mes_vacio -->
ninguna sesión en el corpus, dentro de su etapa

<!-- fig.F01.nota.base -->
V2 · 2REP_Diaries.csv · los diputados cuentan a quien preside

<!-- fig.F01.nota.base_vacio -->
V2 · 2REP_Diaries.csv · la causa no sale del corpus

<!-- fig.F01.nota.sesion -->
sesión {{num}} · {{filas}} filas · {{palabras}} palabras · {{diputados}} diputados intervienen

<!-- fig.F01.nota.sesion.base -->
V2 · {{sigla}} núm. {{diario}}, pp. {{p1}}–{{p2}} (metadatos del proyecto)

<!-- fig.F01.nota.sesion_sin_paginas.base -->
V2 · {{sigla}} núm. {{diario}}, páginas sin verificar (metadatos del proyecto)

<!-- fig.F01.nota.puerta --> Tiene puerta de lectura: pulse para abrirla.

> [nota de diseño] Ejemplos resueltos, para comprobar la concordancia (valores de hoy, V2 y proyecto):
> «Febrero de 1933 / 16 sesiones · 1.843 filas · 574.317 palabras · … / V2 · 2REP_Diaries.csv…».
> «1-X-1931 / sesión 48 · 395 filas · 41.963 palabras · 48 diputados intervienen / V2 · DSCCRE núm. 48, pp. 1347–1394
> (metadatos del proyecto)». La variante `sesion_sin_paginas` vale para las 14 sesiones con `page_status = unverified`
> (etapas IV y V).
> Un clic en una sesión sin puerta abre bajo la figura su ficha breve: `fig.F01.breve.*`.

<!-- fig.F01.breve.titulo --> {{fecha}} · sesión {{num}}
<!-- fig.F01.breve.como -->
Para abrirla en el explorador, ponga esa fecha en Desde y en Hasta, abra una intervención y pulse `s`.
<!-- fig.F01.breve.cerrar --> Cerrar

<!-- fig.F01.tabla.titulo --> Los meses con sesión, y los huecos
<!-- fig.F01.tabla.col.mes --> Mes
<!-- fig.F01.tabla.col.etapa --> Etapa
<!-- fig.F01.tabla.col.sesiones --> Sesiones
<!-- fig.F01.tabla.col.filas --> Filas (V2)
<!-- fig.F01.tabla.col.palabras --> Palabras (V2)
<!-- fig.F01.tabla.col.diputados --> Diputados que intervienen (V2)
<!-- fig.F01.tabla.hueco --> {{desde}} → {{hasta}} · {{n}} meses sin sesión
<!-- fig.F01.tabla.hueco_uno --> {{mes}} · sin sesión
<!-- fig.F01.tabla.sesiones.resumen --> Las sesiones de esta etapa, una a una
<!-- fig.F01.tabla.sesiones.col.fecha --> Fecha
<!-- fig.F01.tabla.sesiones.col.num --> Sesión
<!-- fig.F01.tabla.sesiones.col.diario --> Diario y páginas (proyecto)

> [nota de diseño] Pestaña Tabla: los {{meses.con_sesion}} meses con sesión, más una fila por hueco con su rango. En F01
> (Las Cortes), la tabla de sesiones de cada etapa va en un `<details>` con `fig.F01.tabla.sesiones.resumen`.

<!-- ↺ comun.fija.tono -->
El tono dice cuántas palabras se imprimieron, no cuánto importó.

<!-- fig.F01.salvedad.causas -->
Las causas de un mes sin sesión —receso, disolución, guerra— no salen del corpus y no se rotulan.

<!-- fig.F01.salvedad.extractos -->
Extractos oficiales, no Diario íntegro; páginas sin verificar.

<!-- fig.F01.salvedad -->
El tono dice cuántas palabras se imprimieron, no cuánto importó. Las causas de un mes sin sesión —receso, disolución, guerra— no salen del corpus y no se rotulan.

<!-- fig.F01.cabecera --> {{n}} sesiones · {{palabras}} palabras

<!-- fig.F01.breve.mes --> Las sesiones de {{mes}}

<!-- fig.F01.leame.que_mide -->
Las sesiones del Congreso de 1931 a 1945, una por fila en sesiones.csv, y los meses con su estado en meses.csv. Cuentan filas, palabras y diputados de la edición depositada (V2).

<!-- fig.F01.leame.denominador -->
Son recuentos, sin denominador: filas, suma de nwords y rep_id distintos por sesión o por mes. La clase del tono reparte los {{meses.con_sesion}} meses con sesión en cinco grupos por cuantiles.

<!-- fig.F16.leame.que_mide -->
Los tramos de sesiones seguidas con el mismo presidente titular y con el mismo Gobierno, etapa a etapa, según los metadatos del proyecto.

<!-- fig.F16.leame.denominador -->
Sesiones de cada tramo; sin denominador. Un tramo marcado «por verificar» lo está en los metadatos del proyecto.

> [nota de diseño] Fase 2 (grupo 1): `fig.F01.salvedad` reúne ↺ `comun.fija.tono` y `fig.F01.salvedad.causas` para el
> LÉAME, que lee `<familia>.salvedad`; la figura pinta la primera frase en 600. `fig.F01.cabecera` es el total de cada
> bloque de etapa (variables de la figura). `fig.F01.breve.mes` titula la lista de sesiones que abre un toque en un mes.

> [nota de diseño] Bajo la figura van ↺ `comun.fija.tono` y `fig.F01.salvedad.causas`. `salvedad.extractos` se añade en F01e de las etapas IV y V, y en F01 junto a esos dos bloques.

### F01e · Recorte de la etapa (fichas)

<!-- fig.F01e.titulo --> Cuándo se reunió esta etapa
<!-- fig.F01e.pregunta --> ¿Cuándo se reunió, cuánto se habló en cada sesión, quién presidía y quién gobernaba?
<!-- fig.F01e.alt -->
Calendario de la etapa, con una barra por sesión y, debajo, dos bandas: el presidente titular de cada sesión y el Gobierno.

<!-- fig.F01e.ver_todo --> [Ver el calendario completo]

### F16 · Presidente titular y Gobierno (bandas bajo F01e)

<!-- fig.F16.titulo --> Quién presidía, y quién gobernaba
<!-- fig.F16.pregunta --> ¿Quién presidía la sesión y quién gobernaba mientras tanto?
<!-- fig.F16.banda.presidente --> Presidente titular
<!-- fig.F16.banda.gobierno --> Gobierno
<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- fig.F16.nota -->
{{desde}} → {{hasta}} · {{n}} sesiones

<!-- fig.F16.nota_una -->
{{fecha}} · una sesión

<!-- fig.F16.nota.base -->
Metadatos del proyecto

<!-- fig.F16.nota.verificar -->
Metadatos del proyecto · por verificar

<!-- fig.F16.leyenda.verificar --> Por verificar en los metadatos del proyecto
<!-- fig.F16.leyenda.bandas --> Bajo cada año, dos bandas: presidente titular y Gobierno

<!-- fig.F16.accion --> Pulse para resaltar sus sesiones en el calendario.

<!-- fig.F16.tabla.presidentes --> Presidentes titulares
<!-- fig.F16.tabla.gobiernos --> Gobiernos
<!-- fig.F16.tabla.col.nombre --> Nombre
<!-- fig.F16.tabla.col.desde --> Primera sesión
<!-- fig.F16.tabla.col.hasta --> Última sesión
<!-- fig.F16.tabla.col.sesiones --> Sesiones

<!-- fig.F16.salvedad -->
La banda da el presidente titular de la sesión (metadatos del proyecto). En {{pres.vice_ses}} de {{sesiones}} sesiones un vicepresidente presidió algún tramo (V2). Los días de cambio de Gobierno cuentan para el entrante.

> [nota de diseño] La salvedad pasa de 30 palabras en dos frases: la primera tiene 26. `pres.vice_ses` es V2 (analizador
> de etiquetas del explorador) y lleva `data-base="V2"`; el resto de la banda es «proyecto».

### F05 · Quién tomó la palabra en la etapa

<!-- fig.F05.titulo --> Los diez que más hablaron
<!-- fig.F05.pregunta --> ¿Quién habló más en esta etapa, sin contar la Presidencia?
<!-- fig.F05.alt -->
Barras horizontales con los diez diputados que más palabras de habla suman en la etapa, sin la Presidencia, en la edición del explorador.

<!-- fig.F05.nota -->
{{nombre}} · {{n}} de {{den}} palabras de habla de la etapa, sin la Presidencia (v3)

<!-- fig.F05.nota_partido --> {{partido}} · {{familia}}

<!-- fig.F05.tabla.col.puesto --> Puesto
<!-- fig.F05.tabla.col.nombre --> Diputado
<!-- fig.F05.tabla.col.partido --> Partido
<!-- fig.F05.tabla.col.palabras --> Palabras de habla (v3)
<!-- fig.F05.tabla.col.pct --> De la etapa

<!-- fig.F05.salvedad -->
Palabras de habla en la edición del explorador, sin la Presidencia, sin sumarios ni documentos. Hablar mucho no es pesar mucho.

<!-- fig.F05.datos -->
Los datos de la figura traen a los {{diputados.V2}} diputados que intervienen, etapa a etapa.

> [nota de diseño] F05 va en la v3, así que la sección lleva NotaBases (↺ 13). El orden es fijo, por palabras; sin
> conmutador. Los nombres, de la tabla de grafías (nunca el `rep_name` crudo).

### F09 · Qué familias ocupan la palabra

<!-- fig.F09.titulo --> Qué familias ocupan la palabra
<!-- fig.F09.pregunta --> ¿Qué familias políticas se llevan la palabra en la etapa, sin contar a la Presidencia?
<!-- fig.F09.alt -->
Una tira al cien por cien, dividida por familias políticas, con la parte de las palabras sin Presidencia que se lleva cada una.

<!-- fig.F09.conmuta.titulo --> Medir por
<!-- fig.F09.conmuta.palabras --> Palabras
<!-- fig.F09.conmuta.filas --> Filas

<!-- fig.F09.nota.palabras -->
{{familia}} · {{pct}} · {{n}} de {{den}} palabras sin Presidencia (V2)

<!-- fig.F09.nota.filas -->
{{familia}} · {{pct}} · {{n}} de {{den}} filas sin Presidencia (V2)

<!-- fig.F09.tabla.col.familia --> Familia
<!-- fig.F09.tabla.col.palabras --> Palabras sin la Presidencia (V2)
<!-- fig.F09.tabla.col.pct_palabras --> De las palabras sin la Presidencia
<!-- fig.F09.tabla.col.filas --> Filas sin la Presidencia (V2)
<!-- fig.F09.tabla.col.pct_filas --> De las filas sin la Presidencia

<!-- fig.F09.salvedad -->
«Republicanos» mezcla posiciones de izquierda, centro y derecha. La ideología y la familia son las del partido.

<!-- fig.F09.salvedad.normalizacion -->
Las familias siguen la normalización del explorador; la fusión de «Liberal» con «Liberales» está pendiente de revisión.

> [nota de diseño] Orden fijo de familias (izquierda → derecha según su posición media), el mismo en las cinco
> etapas. Las familias por debajo del 1 % se agrupan en «Otras» solo en el gráfico; la tabla las da todas. Rótulos de
> familia: los del explorador, con «Catizq» → «Catalanista de izquierda» y «Catder» → «Catalanista de derecha»
> (`comun.py › FAMILIA_ETIQ`).
