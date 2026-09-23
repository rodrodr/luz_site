> ⚠ **VERSIÓN DE LECTURA — GENERADA, NO SE EDITA** (`python3 scripts/copy_lectura.py es`). Es el copy de `docs/copy_es/` con las cifras de `src/data/cifras.json` ya puestas (exportadas el 2026-09-23). Lo que sigue entre ⟦corchetes dobles⟧ aún no tiene valor. Las correcciones se hacen en el copy.

<!-- ═══ comun.md ═══ -->

# Copy ES · Común (cabecera, pie, frases fijas, rótulos, componentes, isla, glosario, raíz y 404)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el copy de «comun», «inicio», la raíz y el
> 404. Sigue el contrato de construcción, el plan (§ Reglas editoriales, § Navegación global, § Un rótulo por destino)
> y la narrativa. Cifras: `docs/marcadores/comun.md`, recalculadas hoy sobre la fuente
> (`docs/marcadores/comprobar_comun_inicio.py`, 94 de 94 correctas).
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto y lo cierra la clave siguiente, un
> encabezado, una nota `>` o una regla `---`. `[corchetes]` marcan un rótulo o un enlace: su destino lo pone el
> componente, por orden. `⟦clave⟧` es una cifra de `src/data/cifras.json`; `⟦n⟧`, `⟦fecha⟧`… son
> variables que rellena el componente. Lo que empieza por «[nota de diseño]» no es texto para el lector.
>
> **Frases fijas.** Se escriben AQUÍ, una vez. Las páginas las repiten idénticas con `<!-- ↺ clave -->`, y
> `copy2i18n.py` falla si una repetición difiere en una sola letra. Los nombres de clave siguen los que ya usaban el
> andamiaje (`Base.astro`, `SubNav`, `Pestanas`, `cita.ts`) y el copy del explorador; los cambios que eso pide a otros
> dueños están en `docs/peticiones/comun-inicio.md`.

---

## 1. Cabecera y navegación

<!-- comun.nav.saltar --> [Saltar al contenido]
<!-- comun.cabecera.nombre --> Luz y Taquígrafos
<!-- comun.cabecera.descriptor --> Los Diarios de Sesiones del Congreso, 1931–1945
<!-- comun.cabecera.inicio.aria --> Luz y Taquígrafos: ir a Inicio
<!-- comun.nav.aria --> Navegación principal
<!-- comun.nav.historia.aria --> La historia
<!-- comun.nav.base.aria --> La base
<!-- comun.nav.cortes --> [Las Cortes]
<!-- comun.nav.diario --> [El Diario]
<!-- comun.nav.metodo --> [Método]
<!-- comun.nav.datos --> [Datos]
<!-- comun.nav.explorador --> [Explorador]
<!-- comun.nav.afinidades --> [Afinidades]
<!-- comun.idioma.aria --> Lengua
<!-- comun.idioma.es --> [Español]
<!-- comun.idioma.en --> [English]
<!-- comun.nav.tema.oscuro --> Tema oscuro
<!-- comun.nav.tema.claro --> Tema claro

> [nota de diseño] El descriptor va en cuerpo pequeño junto a la marca y no lleva cifra: los años son el título del
> conjunto depositado. Seis pestañas en dos grupos separados por un filete: `comun.nav.historia.aria` nombra el grupo
> de Las Cortes y El Diario; `comun.nav.base.aria`, el de Método, Datos, Explorador y Afinidades. La pestaña
> «Explorador» lleva a la página del sitio; la herramienta se abre con [Abrir el explorador ↗]. Sin botones de acción en
> la cabecera. ES · EN se pintan en mayúsculas visibles; `comun.idioma.*` es su nombre accesible.

### 1.1 Subnavegación

<!-- comun.subnav.cortes.aria --> Las Cortes, por secciones
<!-- comun.subnav.cortes.etapas --> [Etapas]
<!-- comun.subnav.cortes.sesiones --> [Sesiones y votaciones]
<!-- comun.subnav.datos.aria --> Datos, por secciones
<!-- comun.subnav.datos.usar --> [Usar los datos]
<!-- comun.subnav.datos.versiones --> [Versiones]

---

## 2. Frases fijas ↺

> [nota de diseño] Son las trece del plan (§ Frases fijas), con su redacción exacta. Las cuatro del sello (↺ 2) son una
> por base; `cita.ts` las pide como `comun.sello.<base>`. El número de sesión de ↺ 8, los rótulos de legislatura y la
> fecha de ↺ 10 y las versiones («V2», «v3», «CGOCUS V1.1») son nombres, no cifras: van en la lista blanca de
> `check-i18n` (`docs/marcadores/comun.md`, § Lista blanca).

<!-- comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

<!-- comun.sello.V2 -->
Edición depositada (V2)

<!-- comun.sello.v3 -->
Edición del explorador (v3, sin depositar)

<!-- comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, depositada)

<!-- comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- comun.fija.formulario.motivo -->
Con esos datos queremos saber quién usa la base y con qué fin, para poder mejorarla y comunicar novedades.

> [nota de diseño] ↺ 3 va SIEMPRE encima del botón que lleva a Dataverse, nunca en una nota emergente. El motivo
> (D-20) lo dio el investigador el 23-09-2026: «conocer a los usuarios y los usos de la base para poder mejorarla y
> comunicar novedades»; esta es su redacción final, una sola frase que no promete más (ni boletín, ni respuesta, ni
> plazo). Es texto para el lector y se traduce. El formulario no se nombra por su título (lleva una errata).

<!-- comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- comun.fija.enlace -->
El explorador no abre una búsqueda desde un enlace: cópiela y péguela en su buscador (tecla /).

<!-- comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

<!-- comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

<!-- comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- comun.fija.novalida -->
Que estén no valida su contenido.

<!-- comun.fija.legislatura -->
El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.

<!-- comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- comun.fija.sin_formulario -->
Sin formulario: son datos agregados.

<!-- comun.fija.notabases -->
Esta cifra sale de la edición del explorador (v3, 121.700 filas, sin depositar); la depositada es la V2 (107.551 filas). Por qué hay dos →

<!-- comun.fija.notabases.ids -->
Los números v3 de estas citas son filas de la edición del explorador (v3, 121.700 filas, sin depositar); los V2 son de la depositada (107.551 filas). Por qué hay dos →

> [nota de diseño] ↺ 11 y ↺ 13 van tal cual el plan, sin corchetes, porque así las repiten ya las demás páginas. El
> enlace lo pone el componente: en ↺ 13 (`NotaBases`), «Por qué hay dos →» lleva a `/{lang}/datos/versiones/`; en
> ↺ 11, «aquí» lleva a la misma página. ↺ 6 usa «defiende» como verbo, no como categoría del prototipo: `check-i18n`
> exime esta clave.

### 2.1 Tres frases fijas más, compartidas entre páginas

> [nota de diseño] No están entre las trece del plan, pero se repiten en varias páginas y deben decir lo mismo. La del
> tono es la leyenda de F01 en sus tres escalas (Inicio, Las Cortes, fichas). Las dos del explorador salen del plan
> (§ Navegación global, banda fija; § La escalera, regla 7) y están comprobadas en la herramienta publicada
> (`estudio_lyt_explorador.md`: a 390 px se desborda; las bibliotecas «se guardan en este navegador»). «Funciona sin
> conexión» no se escribe (C4).

<!-- comun.fija.tono -->
El tono dice cuántas palabras se imprimieron, no cuánto importó.

<!-- comun.fija.explorador -->
Sirve la edición v3, sin depositar; pide un ordenador.

<!-- comun.fija.local -->
Se abre en su navegador; lo que busca y guarda se queda en su equipo.

---

## 3. Rótulos: un rótulo por destino

> [nota de diseño] Botones con infinitivo y objeto; pestañas con sustantivos. Cada destino tiene UN rótulo y cada
> rótulo, UN destino. «↗» marca lo que se abre en otra pestaña (el explorador, la app de Afinidades, Dataverse).
>
> | clave | rótulo | destino |
> |---|---|---|
> | `comun.boton.descargar` | [Descargar los datos] | `/{lang}/datos/#empezar`, nunca Dataverse directo |
> | `comun.boton.dataverse` | [Descargar en Dataverse ↗] | la página del DOI (THQCMI o CGOCUS), con ↺ 3 ENCIMA |
> | `comun.boton.explorador` | [Abrir el explorador ↗] | `rodrodr.github.io/luz_explorer/` |
> | `comun.boton.consulta` | [Copiar la consulta] | portapapeles; nace oculto y lo destapa la isla |
> | `comun.boton.afinidades` | [Abrir Afinidades ↗] | la app, `#red` o `#diputados` |
> | `comun.boton.datos_figura` | [Descargar los datos de la figura] | `/datos/<figura>…`, con ↺ 12 |
> | `comun.boton.imagen` | [Descargar la imagen] | SVG y PNG, solo F01 y F26 |
> | `comun.boton.cita` | [Copiar la cita] | portapapeles |
> | `comun.boton.ver_cortes` | [Ver las Cortes, etapa a etapa] | `/{lang}/cortes/` |
> | `comun.boton.ver_sesiones` | [Ver las sesiones y votaciones] | `/{lang}/cortes/sesiones/` |
> | `comun.boton.ver_votaciones` | [Ver las votaciones] | `/{lang}/cortes/sesiones/#votaciones` |
> | `comun.boton.ver_diario` | [Ver qué recoge el Diario] | `/{lang}/diario/` |
> | `comun.boton.ver_metodo` | [Ver cómo se hizo] | `/{lang}/metodo/` |
> | `comun.boton.ver_columnas` | [Ver qué trae cada columna] | `/{lang}/datos/#columnas` |
> | `comun.boton.ver_versiones` | [Ver por qué hay dos ediciones] | `/{lang}/datos/versiones/` |
> | `comun.boton.ver_explorador` | [Ver qué hace el explorador] | `/{lang}/explorador/` |
> | `comun.boton.ver_afinidades` | [Ver Afinidades Elegidas] | `/{lang}/afinidades/` |
> | `comun.boton.unir` | [Unir con THQCMI] | `/{lang}/datos/#unir` |
> | `comun.boton.ir_inicio` | [Ir a Inicio] | `/{lang}/` |
> | `comun.boton.errata` | [Avisar de una errata] | incidencias del repositorio (D-21) |
> | `comun.boton.escribirnos` | [Escribirnos] | `hrefContacto()` |
> | `comun.boton.cargar` | [Cargar la figura] | carga bajo demanda (las redes de Afinidades) |
>
> **Rótulos de una sola página** (fase 2, REVISION_FASE1 P2-12). No son claves `comun.boton.*`: los escribe la página
> en su propia clave, pero el rótulo y el destino son estos y no se reutilizan para otro sitio.
>
> | clave de la página | rótulo | destino |
> |---|---|---|
> | `versiones.citar.enlace` | [Ver cómo citar] | `/{lang}/datos/#citar` (las citas completas en texto, BibTeX y RIS) |
> | `explorador.llevar.enlace` | [Ver cómo citar cada edición] | `/{lang}/datos/versiones/#citar` |
> | `metodo.10.enlace` (y el pie) | [De dónde sale cada cifra] | `/datos/procedencia.csv` |
> | `metodo.04.enlace` | [Ver quién habla más según la edición] | `/{lang}/datos/versiones/#quien-habla` (F07) |
> | `metodo.06.enlace` | [Ver adónde va cada fila de la V2] | `/{lang}/datos/versiones/#destino-filas` (F18) |
> | `metodo.07.enlace` | [Ver las fechas corregidas] | `/{lang}/datos/versiones/#fechas` (F25) |
> | `versiones.depositadas.metodo` | [Ver cómo se auditaron las fechas] | `/{lang}/metodo/#metodo-07` |
> | `explorador.no_hace.enlace` | [Ver cómo se cuentan las palabras] | `/{lang}/datos/#palabra` (F33) |
> | `datos.empezar.s1.accion` | [Ver los datos de cada figura] | `/{lang}/datos/versiones/#bases` (F35: cada figura, su base y sus archivos) |
> | `fig.F01e.ver_todo` | [Ver el calendario completo] | `/{lang}/cortes/#calendario` (F01) |
> | `fig.F17.ficha.copiar` | [Copiar el nombre del debate] | portapapeles (el nombre exacto de la biblioteca) |
> | `fig.F20.enlace` | [Ver qué trae cada columna] | `/{lang}/datos/#columnas`: el mismo rótulo que `comun.boton.ver_columnas` |
> | `datos.citar.copiar` | [Copiar la cita] | portapapeles: el mismo rótulo y la misma acción que `comun.boton.cita` |
> | `afinidades.datos.llamada` | [Unir con THQCMI] | `/{lang}/datos/#unir`: el mismo que `comun.boton.unir` |
>
> Los anclajes `#votaciones`, `#columnas`, `#empezar`, `#citar`, `#unir`, `#palabra`, `#calendario`, `#metodo-07` y los
> de Versiones (`#fechas`, `#destino-filas`, `#quien-habla`, `#bases`, `#citar`, los de `versiones.md`) los fijan las
> páginas de destino; si una cambia el suyo, se cambia aquí el destino, no el rótulo. [Ver las votaciones] y [Ver las
> sesiones y votaciones] llevan a la misma página, pero a sitios distintos de ella: por eso tienen dos rótulos. Lo mismo
> [Ver las Cortes, etapa a etapa] (`/cortes/`) y [Ver el calendario completo] (`/cortes/#calendario`). Los enlaces del
> pie y de la cabecera son navegación y van con sustantivo ([Cómo citar], [Datos]): no cuentan como un segundo rótulo.
>
> **Nombres de los debates preparados** (fase 2, REVISION_FASE1 P3-5; plan H24). Una sola regla en todo el sitio: el
> nombre exacto de `bibliotecas_v3.json`, **sin** el prefijo «Debate · » con que los lista el diálogo «Añadir
> bibliotecas del proyecto…» («Sufragio femenino», «Estatuto de Cataluña», «Cuestión religiosa (art. 26)»). La página
> Explorador lo dice una vez al lector (`explorador.bibliotecas.proyecto`). Las selecciones de sesiones, los discursos
> y las anécdotas no llevan prefijo y van con su nombre entero («Sesiones más crispadas», entre comillas y sin
> destacar). Las claves `bib.*.nombre` de Sesiones guardan el nombre con prefijo, para el aserto.

<!-- comun.boton.descargar --> [Descargar los datos]
<!-- comun.boton.dataverse --> [Descargar en Dataverse ↗]
<!-- comun.boton.explorador --> [Abrir el explorador ↗]
<!-- comun.boton.consulta --> [Copiar la consulta]
<!-- comun.boton.afinidades --> [Abrir Afinidades ↗]
<!-- comun.boton.datos_figura --> [Descargar los datos de la figura]
<!-- comun.boton.imagen --> [Descargar la imagen]
<!-- comun.boton.cita --> [Copiar la cita]
<!-- comun.boton.ver_cortes --> [Ver las Cortes, etapa a etapa]
<!-- comun.boton.ver_sesiones --> [Ver las sesiones y votaciones]
<!-- comun.boton.ver_votaciones --> [Ver las votaciones]
<!-- comun.boton.ver_diario --> [Ver qué recoge el Diario]
<!-- comun.boton.ver_metodo --> [Ver cómo se hizo]
<!-- comun.boton.ver_columnas --> [Ver qué trae cada columna]
<!-- comun.boton.ver_versiones --> [Ver por qué hay dos ediciones]
<!-- comun.boton.ver_explorador --> [Ver qué hace el explorador]
<!-- comun.boton.ver_afinidades --> [Ver Afinidades Elegidas]
<!-- comun.boton.unir --> [Unir con THQCMI]
<!-- comun.boton.ir_inicio --> [Ir a Inicio]
<!-- comun.boton.errata --> [Avisar de una errata]
<!-- comun.boton.escribirnos --> [Escribirnos]
<!-- comun.boton.cargar --> [Cargar la figura]

---

## 4. Pie

> [nota de diseño] Orden fijo y SIN mención de financiación: autoría · depósitos · ↺ 1 · licencias · ediciones (en
> mono) · privacidad · enlaces. Cada corchete recibe su destino por orden (`Base.astro`): la autoría, la Universidad de
> Salamanca; los depósitos, los dos DOI; las licencias, CC BY 4.0 y MIT; los enlaces, Cómo citar
> (`/datos/#citar`) · De dónde sale cada cifra (`procedencia.csv`) · Avisar de una errata · Escribirnos · ParlaIbero.
> Los autores se pintan como los da la cita de Dataverse. La frase de privacidad solo es cierta si ningún recurso sale
> de un tercero: fuentes autoalojadas y sin analítica (la auditoría lo comprueba).

<!-- comun.pie.autoria -->
Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo · [Universidad de Salamanca]

<!-- comun.pie.depositos -->
Depositados en Harvard Dataverse: Luz y Taquígrafos, THQCMI V2.0 ([doi:10.7910/DVN/THQCMI]), y Afinidades Elegidas, CGOCUS V1.1 ([doi:10.7910/DVN/CGOCUS]).

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

<!-- comun.pie.licencias -->
Datos, [CC BY 4.0]. Código del sitio, [MIT].

<!-- comun.pie.ediciones -->
Página, ed. ⟦edicion_pagina⟧ · Datos: V2.0 depositada (107.551 filas) · Explorador: v3 sin depositar (121.700 filas)

<!-- comun.pie.privacidad -->
Este sitio no usa cookies ni analítica; Dataverse pide datos al descargar, y se lo avisamos antes.

<!-- comun.pie.enlaces -->
[Cómo citar] [De dónde sale cada cifra] [Avisar de una errata] [Escribirnos] [ParlaIbero], proyecto hermano y distinto

<!-- comun.enlace.otra_pestana -->
Los enlaces marcados con ↗ se abren en otra pestaña.

<!-- comun.vista_previa.pendientes -->
Vista previa. Pendiente de decisión del investigador:

---

## 5. Componentes comunes

### 5.1 Banda fija (`BandaCTA`, solo en Método y Explorador)

<!-- comun.banda.aria --> Descargar los datos o abrir el explorador

> [nota de diseño] Dos columnas: ↺ 3 (`comun.fija.formulario`) encima de [Descargar los datos]
> (`comun.boton.descargar`), y [Abrir el explorador ↗] (`comun.boton.explorador`) con `comun.fija.explorador` debajo.
> [Descargar los datos] no lleva a Dataverse, pero ↺ 3 va encima porque es el primer paso hacia el formulario.

### 5.2 NotaBases

> [nota de diseño] Es ↺ 13 (`comun.fija.notabases`) tal cual, al pie de toda página con una cifra de la v3. El
> componente convierte su final, «Por qué hay dos →», en el enlace a Versiones. Un identificador de fila v3 junto a su par V2 (el doble id de las citas) no es una
> cifra: lo explica ↺ 4, y no obliga a pintar NotaBases (petición a la auditoría en `peticiones/comun-inicio.md`).

### 5.3 CopiarConsulta

<!-- comun.consulta.etiqueta --> Consulta para el buscador del explorador
<!-- comun.consulta.filtros --> Filtros
<!-- comun.consulta.recuento --> Recuento del ⟦fecha⟧: ⟦n⟧ intervenciones en la edición del explorador (v3).
<!-- comun.consulta.recuento.una --> Recuento del ⟦fecha⟧: una intervención en la edición del explorador (v3).
<!-- comun.consulta.copiada --> Consulta copiada. En el explorador, pulse / y péguela.
<!-- comun.consulta.sinjs --> Seleccione la consulta y cópiela.

> [nota de diseño] Orden: la consulta en `<code>` seleccionable · los filtros, si los hay, con los nombres del
> explorador (Legislatura, Desde, Hasta, Nº de sesión) · el recuento fechado · [Copiar la consulta] · [Abrir el
> explorador ↗] · ↺ 5 (`comun.fija.enlace`). [Copiar la consulta] nace oculto y lo destapa la isla; sin JS queda
> `comun.consulta.sinjs`. «Intervención» es la palabra del explorador y aquí va siempre con su base. Si algún día
> `ENLACES_PROFUNDOS` pasa a `true`, ↺ 5 deja de ser cierta y se reescribe con el autor: no hay rótulo preparado para un
> enlace que hoy no funciona.

### 5.4 Sello de base

<!-- comun.sello.titulo --> Base
<!-- comun.sello.huella --> Huella
<!-- comun.sello.exportado --> Cifras exportadas el ⟦fecha⟧
<!-- comun.sello.dv --> Metadatos de Harvard Dataverse, leídos en su API
<!-- comun.sello.explorador --> Explorador publicado: su manifiesto y sus cabeceras
<!-- comun.sello.croquis --> Croquis de Gil Robles, llevado al plano del Congreso

> [nota de diseño] Las cuatro bases de datos llevan su frase fija ↺ 2 (§ 2). Las tres últimas claves no son frases
> fijas del plan: sirven a las figuras cuya base es la API de Dataverse, el explorador publicado o el hemiciclo.

### 5.5 Cita

<!-- comun.cita.titulo --> Cómo citar
<!-- comun.cita.formatos.aria --> Formato de la cita
<!-- comun.cita.texto --> Texto
<!-- comun.cita.bibtex --> BibTeX
<!-- comun.cita.ris --> RIS
<!-- comun.cita.copiada --> Cita copiada.
<!-- comun.cita.dataverse --> Tal como la da Harvard Dataverse.
<!-- comun.cita.cgocus.nota --> Harvard Dataverse cita la versión mayor, «V1»; la vigente es la V1.1.

<!-- comun.cita.figura -->
Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo. «⟦titulo⟧». Figura de Luz y Taquígrafos. ⟦url⟧. Base: ⟦base⟧. Exportada el ⟦fecha⟧.

<!-- comun.cita.pasaje -->
⟦diario⟧, núm. ⟦numero⟧, ⟦fecha⟧, pp. ⟦paginas⟧ (metadatos del proyecto). Luz y Taquígrafos, ⟦edicion⟧, fila ⟦id⟧.

> [nota de diseño] `comun.cita.figura` y `comun.cita.pasaje` las rellena `lib/cita.ts`. En el pasaje, `⟦edicion⟧`
> es `comun.sello.V2` o `comun.sello.v3` en minúscula inicial («edición depositada (V2)»); los otros cuatro valores son
> metadatos del proyecto y van rotulados como tales. La cita del conjunto se copia tal como la da Dataverse
> (`Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic, 1931–1945", https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2`, `Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Afinidades Elegidas: Parliamentary Cosponsorship Networks of the Spanish Second Republic (1931-1939)", https://doi.org/10.7910/DVN/CGOCUS, Harvard Dataverse, V1, UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]`), sin retocar su «V2» ni su «V1». Los tres formatos van en `<details>`.

### 5.6 Captura del explorador

<!-- comun.captura.ampliar --> Ampliar la captura
<!-- comun.captura.cerrar --> Cerrar la captura
<!-- comun.captura.pie --> Explorador publicado, capturado el ⟦fecha⟧.
<!-- comun.enlace.ampliar --> Abre la captura a tamaño completo, en otra pestaña.

### 5.7 Índice lateral, vecinas y salidas

<!-- comun.indice.titulo --> En esta página
<!-- comun.indice.volver --> Volver al índice
<!-- comun.vecinas.aria --> Anterior y siguiente
<!-- comun.vecinas.etapa.anterior --> Etapa anterior
<!-- comun.vecinas.etapa.siguiente --> Etapa siguiente
<!-- comun.vecinas.puerta.anterior --> Puerta anterior
<!-- comun.vecinas.puerta.siguiente --> Puerta siguiente
<!-- comun.salidas.titulo --> Para seguir
<!-- comun.vecinas.cortes --> [Ver las Cortes, etapa a etapa]
<!-- comun.vecinas.sesiones --> [Ver las sesiones y votaciones]
<!-- comun.pruebelo --> Pruébelo

> [nota de diseño] En el centro de las vecinas va el índice con su rótulo único: [Ver las Cortes, etapa a etapa] en las
> fichas (`comun.vecinas.cortes`) y [Ver las sesiones y votaciones] en las puertas (`comun.vecinas.sesiones`). Las vecinas siguen el orden cronológico y nombran su destino
> con el nombre corto de la etapa (§ 7) o el título de la puerta.

---

## 6. Figuras: pestañas, datos y la isla

<!-- comun.fig.pestanas --> [Gráfico] [Tabla] [Datos]
<!-- comun.fig.datos.nota --> CSV y Excel, con su LÉAME en español y en inglés.
<!-- comun.fig.imagen.nota --> La imagen, en SVG y en PNG, lleva su cita al pie.
<!-- comun.fig.tabla.nota --> Los mismos datos que el gráfico, en filas.
<!-- comun.fig.filtro.etapa --> Etapa
<!-- comun.fig.filtro.todas --> Todas
<!-- comun.fig.medida.aria --> Qué se mide
<!-- comun.fig.base --> Base
<!-- comun.fig.salvedad --> Antes de leerla

> [nota de diseño] La pestaña Datos lleva, en este orden: [Descargar los datos de la figura] · `comun.fig.datos.nota` ·
> ↺ 12 (`comun.fija.sin_formulario`) · la cita de la figura (`comun.cita.figura`); en F01 y F26, además,
> [Descargar la imagen] con `comun.fig.imagen.nota`. `comun.fig.salvedad` es el antetítulo de la salvedad al margen
> (40 palabras como mucho). Los rótulos, leyendas y notas de cada figura son de su dueño (`figuras.md`; las de Inicio,
> en `inicio.md`).

<!-- comun.leame.que_mide --> Qué mide
<!-- comun.leame.denominador --> Denominador
<!-- comun.leame.salvedad --> Salvedad
<!-- comun.leame.base --> Base
<!-- comun.leame.cita --> Cómo citar

> [nota de diseño] Los cinco rótulos del LÉAME a la vista en la pestaña Datos (`FiguraMarco`) y en el `.txt`
> descargable: QUÉ MIDE · DENOMINADOR · SALVEDAD · BASE (con huella y fecha) · CÓMO CITAR. Las versalitas las pone el
> estilo, no el copy.

### 6.1 La isla (`scripts/figuras.ts`)

<!-- comun.fig.teclado -->
Con el teclado: Tab lleva a la figura; ← y → recorren sus marcas; Inicio y Fin van a la primera y a la última; Esc cierra la nota.

<!-- comun.isla.tactil -->
Toque una marca para ver su nota; tóquela otra vez para abrir su página.

<!-- comun.isla.posicion --> ⟦i⟧ de ⟦total⟧
<!-- comun.isla.cerrar --> Cerrar la nota
<!-- comun.isla.cargando --> Cargando la figura…
<!-- comun.isla.error --> La figura no se pudo cargar. Sus datos siguen en la pestaña Tabla.
<!-- comun.isla.copiado --> Copiado.
<!-- comun.isla.no_copiado --> No se pudo copiar. Seleccione el texto y cópielo a mano.

> [nota de diseño] `comun.fig.teclado` y `comun.isla.tactil` nacen ocultas y solo las enseña la isla, cuando la figura
> ya responde. `comun.isla.posicion` precede a la nota en la región `aria-live`, que solo habla al recorrer con el
> teclado. `comun.isla.tactil` solo vale en figuras cuyas marcas llevan a una página (F01c, F26); en las demás, la isla
> enseña solo la primera mitad, hasta el punto y coma, o nada.

---

## 7. Las cinco etapas: nombres compartidos

> [nota de diseño] Los usan el calendario (F01 en sus tres escalas), las vecinas, los antetítulos de las puertas y los
> filtros de etapa. El H1 de cada ficha es de su dueño (`cortes.md`) y debe coincidir con `comun.etapa.<id>.nombre`.
> El corto de la II es el rótulo de la columna `legislature` (D-6); los años son los de sus fechas en la V2.

<!-- comun.etapa.I.nombre --> Las Cortes Constituyentes
<!-- comun.etapa.I.corto --> Constituyentes
<!-- comun.etapa.I.anos --> 1931–1933
<!-- comun.etapa.II.nombre --> La legislatura elegida en 1933
<!-- comun.etapa.II.corto --> 1933-1935
<!-- comun.etapa.II.anos --> 1933–1935
<!-- comun.etapa.III.nombre --> Las Cortes de 1936, hasta la guerra
<!-- comun.etapa.III.corto --> Cortes de 1936
<!-- comun.etapa.III.anos --> 1936
<!-- comun.etapa.IV.nombre --> Las Cortes en guerra
<!-- comun.etapa.IV.corto --> Guerra
<!-- comun.etapa.IV.anos --> 1936–1939
<!-- comun.etapa.V.nombre --> Las Cortes en México
<!-- comun.etapa.V.corto --> México
<!-- comun.etapa.V.anos --> 1945

---

## 8. El hemiciclo de 1936 (portada de Inicio y raíz)

<!-- comun.hemiciclo.titulo --> Hemiciclo del Congreso de los Diputados

<!-- comun.hemiciclo.desc -->
Planta del hemiciclo con la situación de las minorías de las Cortes de 1936 según el croquis de José María Gil Robles.

<!-- comun.hemiciclo.pie -->
Las minorías de las Cortes de 1936 según el croquis de Gil Robles (*No fue posible la paz*, 1968, p. 524), llevadas al plano del Congreso. Cada color es un escaño del plano, no un diputado.

<!-- comun.hemiciclo.plano -->
Plano: Congreso de los Diputados, planta del hemiciclo (propuesta de accesibilidad de F. Pardo Calvo).

<!-- comun.hemiciclo.bloques.aria --> Resaltar un bloque del hemiciclo
<!-- comun.hemiciclo.bloque.todos --> Todos
<!-- comun.hemiciclo.bloque.der --> Derechas
<!-- comun.hemiciclo.bloque.cen --> Centro
<!-- comun.hemiciclo.bloque.izq --> Izquierdas
<!-- comun.hemiciclo.bloque.gob --> Gobierno

> [nota de diseño] El dibujo no se toca (`landing/hero_svg.py` → `Hemiciclo.astro`). NINGUNA cifra en la figura ni en su
> pie: ni recuentos por color ni «composición». Los cinco radios (Todos y los cuatro bloques) atenúan el resto solo con
> CSS; la leyenda nombra las dieciocho minorías con las claves de abajo, que repiten los nombres de
> `hemiciclo_1936.json` para que se puedan traducir. En la raíz va en pequeño, sin radios y sin pie.

<!-- comun.hemiciclo.g.trad --> Tradicionalistas
<!-- comun.hemiciclo.g.bn --> Bloque Nacional
<!-- comun.hemiciclo.g.ceda --> CEDA
<!-- comun.hemiciclo.g.agr --> Agrarios
<!-- comun.hemiciclo.g.indder --> Independientes de derecha
<!-- comun.hemiciclo.g.lliga --> Lliga Regionalista
<!-- comun.hemiciclo.g.centro --> Centro
<!-- comun.hemiciclo.g.indcons --> Independientes y conservadores
<!-- comun.hemiciclo.g.prog --> Progresistas
<!-- comun.hemiciclo.g.rad --> Radicales
<!-- comun.hemiciclo.g.pnv --> Nacionalistas vascos
<!-- comun.hemiciclo.g.esq --> Esquerra y otros partidos catalanes
<!-- comun.hemiciclo.g.soc --> Socialistas
<!-- comun.hemiciclo.g.pce --> Comunistas
<!-- comun.hemiciclo.g.repind --> Republicanos independientes
<!-- comun.hemiciclo.g.ur --> Unión Republicana
<!-- comun.hemiciclo.g.ir --> Izquierda Republicana
<!-- comun.hemiciclo.g.banco --> Banco azul (Gobierno)

---

## 9. Glosario de interfaz

> [nota de diseño] Una línea por término. Es la fuente de las definiciones emergentes y de la traducción
> (`03a_GLOSARIO_es-en.md`). Todas las definiciones se comprobaron sobre la V2, la v3 y los metadatos del proyecto.

<!-- comun.glosario.diario -->
**Diario.** El Diario de Sesiones impreso de las Cortes. Va con mayúscula y manda sobre la base.

<!-- comun.glosario.fila -->
**Fila.** Una línea del CSV depositado (V2). Empieza donde el etiquetado reconoce la fórmula impresa de un orador y acaba en la siguiente que reconoce. A veces lleva dentro un documento leído o la réplica de otro orador.

<!-- comun.glosario.intervencion -->
**Intervención.** El nombre que da el explorador a cada una de sus filas (v3). Aquí solo se usa al hablar del explorador, y con su base.

<!-- comun.glosario.sesion -->
**Sesión.** Una reunión del pleno, con su fecha y su número. Fecha y número son la clave común de las dos ediciones.

<!-- comun.glosario.etapa -->
**Etapa.** Cada tramo en que este sitio parte las Cortes: las Constituyentes, la legislatura de 1933-1935, las Cortes de 1936 hasta la guerra, la guerra y México.

<!-- comun.glosario.legislatura -->
**Legislatura.** El valor de la columna `legislature`: 1931-1933, 1933-1935 o 1936-1939. La tercera reúne las Cortes de 1936, la guerra y México.

<!-- comun.glosario.presidencia -->
**Presidencia.** El cargo que modera la sesión, lo ocupe el Presidente de las Cortes o un vicepresidente. Quien preside es diputado, y en la base lleva su partido.

<!-- comun.glosario.edicion_depositada -->
**Edición depositada.** La V2 de Luz y Taquígrafos en Harvard Dataverse: el CSV que se descarga y se cita.

<!-- comun.glosario.edicion_explorador -->
**Edición del explorador.** La v3 que sirve el explorador: las mismas sesiones, partidas en más filas y con otros identificadores. No está depositada.

<!-- comun.glosario.metadatos -->
**Metadatos del proyecto.** El Diario, el número, las páginas, el presidente titular y el Gobierno de cada sesión. Los reunió el proyecto; no están depositados y el explorador no los muestra.

<!-- comun.glosario.acotacion -->
**Acotación.** Lo que el Diario anota entre paréntesis sin que nadie lo diga como orador: «(Rumores.)», «(Aplausos.)».

<!-- comun.glosario.puerta -->
**Puerta de lectura.** Una página de este sitio sobre un momento del Diario, de una o de varias sesiones, con sus citas comprobadas y el camino para leerlo entero en el explorador.

<!-- comun.glosario.debate -->
**Debate preparado.** Una biblioteca que el explorador ofrece ya hecha, con el nombre de un debate y sus sesiones.

<!-- comun.glosario.palabras -->
**Palabras.** Lo que cuenta la columna `nwords` de la V2. Otras maneras de contar dan otras cifras; cada figura dice la suya.

<!-- comun.glosario.diputados -->
**Diputados que intervienen.** Los `rep_id` distintos con al menos una fila en el periodo. Incluyen a quien preside.

> [nota de diseño] «Debate preparado» no dice «sesiones enteras»: el copy del explorador comprobó que uno de los
> veintiséis, «Reforma agraria y Sanjurjada», es una selección. «Presidencia»: en la V2 las filas de quien preside
> llevan su `rep_id` y su partido (Besteiro, PSOE; Alba, independiente).

---

## 10. Raíz (`/`)

<!-- comun.raiz.titulo --> Luz y Taquígrafos · Elija lengua · Choose a language
<!-- comun.raiz.aria --> Lengua · Language

> [nota de diseño] Selector estático, sin redirección por JS y sin cifras: el hemiciclo en pequeño
> (`comun.hemiciclo.titulo` como nombre accesible), la marca (`comun.cabecera.nombre`), el descriptor en las dos
> lenguas (`comun.cabecera.descriptor` de `es.json` y de `en.json`) y dos enlaces, [Español] y [English]
> (`comun.idioma.es`, `comun.idioma.en`), cada uno con su `lang`. Mientras no exista `en.json`, el descriptor inglés no
> se pinta: la raíz no muestra nada «sin traducir».

---

## 11. Página no encontrada (`/404.html`)

<!-- comun.404.titulo --> Esta página no está.

<!-- comun.404.texto -->
El enlace puede ser antiguo o tener una errata. Los datos no se han movido: siguen en su DOI.

<!-- comun.404.salidas -->
[Ir a Inicio] [Ver las Cortes, etapa a etapa] [Descargar los datos]

<!-- comun.404.errata -->
Si llegó aquí desde un enlace de este mismo sitio, avísenos: [Avisar de una errata]

> [nota de diseño] GitHub Pages sirve un solo `404.html`, que no sabe en qué lengua venía el lector: van las dos
> lenguas apiladas, el español primero, un solo `h1` y cada bloque con su `lang`. Los destinos, por orden: `/{lang}/`,
> `/{lang}/cortes/`, `/{lang}/datos/#empezar` y las incidencias del repositorio. La cabecera lleva a los Inicios.

## Anexo A · Comprobaciones de este archivo (22-09-2026)

- **Cifras.** Nueve marcadores de datos (`filas.V2`, `filas.v3`, `dv.thqcmi.autores`, `dv.thqcmi.cita`,
  `dv.cgocus.cita`, `dv.version`, `dv.cgocus.version`, `dv.csv.bytes`, `explorador.gz.bytes`) y dos de configuración
  (`edicion_pagina`; el motivo del formulario, D-20, ya es texto). Valores esperados y cálculo: `docs/marcadores/comun.md`. Recalculados sobre la V2 (MD5
  comprobado), la v3 (sha256 comprobado), la API de Dataverse y el manifiesto del explorador con
  `docs/marcadores/comprobar_comun_inicio.py`; los nueve ya están en `src/data/cifras.json` con ese valor.
- **Frases fijas.** Las trece del plan, letra a letra, más tres compartidas (§ 2.1).
- **Palabras vetadas.** Ninguna de la lista del plan. «Defiende» solo en ↺ 6, como verbo.
- **Frases de más de 30 palabras.** Ninguna; la más larga es ↺ 10 (29, desde la fase 2).
- **Prototipo de 1931.** Nada.


<!-- ═══ afinidades.md ═══ -->

# Copy ES · Afinidades Elegidas (`/[lang]/afinidades/`)

> **Fase 2 (23-09-2026, grupo 6).** Antetítulos de sección convertidos en asientos con su base; claves nuevas de F21
> (leyenda de las siete ideologías, cofirmantes, buscador, grafías) y de F22 (tramo del centro); `fig.F21.titulo` cambia
> para no repetir el H2 de su sección; F22 pasa a una barra por legislatura con el tramo estricto desde el cero.
> Peticiones: `docs/peticiones/grupo6-explorador-afinidades.md`.
>
> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Afinidades Elegidas». Sigue la
> narrativa §16 y la plantilla K del plan. **Todas las cifras son de CGOCUS V1.1, depositada** (D-3, decidida el 23-09-2026:
> se publica sobre la V1.1 con su sello y la corrección v2 se nombra «en preparación», sin cifras). Se recalcularon hoy sobre los archivos
> originales de CGOCUS V1.1, con su MD5 de Dataverse comprobado. Marcadores: `docs/marcadores/afinidades.md`.
>
> **Cómo se lee.** Como `explorador.md`: `<!-- clave -->`, `<!-- ↺ clave -->` para las frases fijas y los rótulos de
> `comun.md`, y `> [nota de diseño]` para lo que no es texto del lector. Ninguna cifra va tecleada. Las claves cuelgan
> del prefijo de su sección en la plantilla (`afinidades.firmar.*`, `afinidades.cruce.*`, `afinidades.limites.*`…); la
> cabecera lleva `afinidades.que_es`, `afinidades.nombre` y `afinidades.abrir`.
>
> **Lo que cambia respecto a la narrativa, y por qué** (recalculado hoy):
> 1. **«Firman»: 453 / 440 / 315, no 454 / 446 / 316.** La cifra antigua cuenta también a firmantes que el censo sitúa
>    en otra legislatura (1 / 6 / 1). Con ella, censo ≠ firman + aislados (475 ≠ 454 + 22). Ahora cuadra, y esos
>    firmantes van en su propia fila de la tabla.
> 2. **«En 1936-1939, casi todo el cruce estricto es de la izquierda con el PNV» es falso.** El PNV está en el 24,5 % de
>    esas relaciones (85 de 347); la CEDA, en 97. Se sustituye por dos hechos medidos: el peso del centro en el cruce
>    (79,8 % → 89,0 % → 21,5 %) y la concentración del cruce estricto de 1936-1939 en 16 de las 89 medidas.
> 3. **«Cuatro meses de Cámara y después la guerra»** se ancla en la base: 85 de las 89 medidas de 1936-1939 son
>    anteriores al 18 de julio de 1936.
> 4. **Nueva salvedad, ya presente en V1.1:** 175 de las 1.530 medidas llegan al Diario con la lista de firmas cortada
>    («Siguen las firmas hasta…»). Es el 13,2 % de las relaciones. Y 781 de las 13.452 firmas no se atribuyeron.
> 5. **Dentro de CGOCUS V1.1**, `2REP_cosponsorship` rotula la segunda legislatura «1933-1935» y los demás archivos
>    «1933-1936». Va en «Los datos», porque es una trampa al unir.

---

## Metadatos

<!-- afinidades.meta.titulo -->
Afinidades Elegidas

<!-- afinidades.meta.descripcion -->
Quién firmó con quién en el Congreso de la República, 1931–1939: tres redes de coautoría, dos maneras de medir el cruce y lo que la firma no dice.

> [nota de diseño] Índice lateral con las ocho secciones (sus `*.titulo`). **Se construye la última** (D-3). Ninguna
> cifra de esta página sale de ella, tampoco a Inicio. La plantilla pone el sello `comun.sello.afin` (↺ 2) bajo el H1,
> sin marca de pendiente (D-3 cerrada). Si se deposita CGOCUS V2.0, el exportador vuelve a calcular y el sello cambia;
> entonces se quita de `afinidades.que_es` la frase «en preparación».

## Cabecera

<!-- afinidades.antetitulo -->
doi:10.7910/DVN/CGOCUS · V1.1 · 6-V-2026

<!-- afinidades.titulo -->
¿Con quién estaban dispuestos a firmar?

<!-- afinidades.entrada -->
Hablar en contra es público y barato; firmar una medida con otro exige un acuerdo previo, casi siempre fuera del acta.

<!-- ↺ comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, depositada)

<!-- afinidades.que_es -->
Afinidades Elegidas es una base derivada de Luz y Taquígrafos, con su propio depósito. Reúne quién firmó con quién en el Congreso, de 1931 a 1939. Las cifras de esta página son de la V1.1 depositada; hay una versión corregida en preparación.

<!-- afinidades.nombre -->
El nombre viene de la afinidad electiva de Goethe, que Max Weber llevó a la sociología. «Elegidas», y no «electivas», subraya la decisión de quien firma. Y deja oír otra lectura: las afinidades de los electos.

<!-- afinidades.abrir -->
[Abrir Afinidades ↗]

> [nota de diseño] La cabecera pinta `afinidades.que_es`, `afinidades.nombre` y `afinidades.abrir` (sus `extras`), con
> el sello ↺ 2 anclado tras la entrada. `afinidades.nombre` resume «Sobre el nombre» de `METHODOLOGY.md` (CGOCUS): es la
> explicación del proyecto, no un hecho externo. [Abrir Afinidades ↗] va a `#red`, en otra pestaña.

<!-- afinidades.indice.firmar -->
Firmar no es hablar

<!-- afinidades.indice.cifras -->
Tres legislaturas

<!-- afinidades.indice.cruce -->
¿Se cruzaba de bloque?

<!-- afinidades.indice.redes -->
Tres redes

<!-- afinidades.indice.puentes -->
Los puentes

<!-- afinidades.indice.limites -->
Lo que no mide

<!-- afinidades.indice.datos -->
Los datos

## 2. Firmar no es hablar

<!-- afinidades.firmar.antetitulo -->
CGOCUS V1.1 · 63.507 relaciones par-medida · 1.530 medidas

<!-- afinidades.firmar.titulo -->
Firmar no es hablar

<!-- afinidades.firmar.medida -->
Una medida es una proposición de ley, una enmienda, un ruego colectivo, una interpelación u otro documento que firman dos o más diputados. Afinidades las saca de los mismos Diarios de Sesiones y reconoce a cada firmante.

<!-- afinidades.firmar.relacion -->
Dos diputados que firman la misma medida forman una relación. Su peso es el número de medidas que comparten.

<!-- afinidades.firmar.total -->
La base reúne 63.507 relaciones par-medida: una por cada par de firmantes de cada medida.

<!-- afinidades.firmar.identificar -->
Cada firma se atribuye a un diputado por su nombre, de forma automática y con revisión de los casos dudosos. De las 13.452 firmas, 781 se quedaron sin atribuir.

<!-- afinidades.firmar.sin_relacion -->
Hay 65 medidas que no llegan a dos firmantes identificados; no forman ninguna relación.

<!-- afinidades.firmar.periodo -->
Cubre las tres legislaturas de la República, de 1931 a 1939. Las sesiones de México, en 1945, no entran.

## 3. Tres legislaturas en cifras

<!-- afinidades.cifras.antetitulo -->
CGOCUS V1.1 · 1.026 personas · 78 en las tres legislaturas

<!-- afinidades.cifras.titulo -->
Tres legislaturas en cifras

<!-- afinidades.cifras.entrada -->
El censo de Afinidades tiene una ficha por diputado y legislatura. Reúne 1.026 personas.

<!-- afinidades.cifras.tabla.titulo -->
Diputados, firmas y medidas por legislatura

<!-- afinidades.cifras.tabla.col.leg -->
Legislatura

<!-- afinidades.cifras.tabla.censo -->
Diputados en el censo

<!-- afinidades.cifras.tabla.firman -->
Firman al menos una medida

<!-- afinidades.cifras.tabla.aislados -->
No firman ninguna (aislados)

<!-- afinidades.cifras.tabla.medidas -->
Medidas firmadas por dos o más

<!-- afinidades.cifras.tabla.relaciones -->
Relaciones par-medida

<!-- afinidades.cifras.tabla.fuera -->
Firmantes sin ficha en esa legislatura

<!-- afinidades.cifras.tabla.nota -->
La última fila cuenta a firmantes que el censo sitúa en otra legislatura. No entran en las filas de arriba.

> [nota de diseño] Tabla que pinta la plantilla (filas = claves; celdas = marcadores). Las claves con el segmento
> `tabla` no las pinta `lectura.ts`: son de la tabla.
>
> | | 1931-1933 | 1933-1936 | 1936-1939 |
> |---|---:|---:|---:|
> | `afinidades.cifras.tabla.censo` | 475 | 470 | 501 |
> | `afinidades.cifras.tabla.firman` | 453 | 440 | 315 |
> | `afinidades.cifras.tabla.aislados` | 22 | 30 | 186 |
> | `afinidades.cifras.tabla.medidas` | 674 | 767 | 89 |
> | `afinidades.cifras.tabla.relaciones` | 30.345 | 27.172 | 5.990 |
> | `afinidades.cifras.tabla.fuera` | 1 | 6 | 1 |
>
> Las cabeceras de columna son los rótulos de legislatura de CGOCUS, tal cual (D-6). Aserto de compilación: censo =
> firman + aislados en cada columna.

<!-- afinidades.cifras.tres -->
En las tres legislaturas están 78 diputados.

<!-- afinidades.cifras.guerra -->
La legislatura de 1936-1939 dejó 89 medidas firmadas por dos o más diputados, frente a 767 en la anterior.

<!-- ↺ comun.fija.legislatura -->
El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.

## 4. ¿Se cruzaba de bloque?

<!-- afinidades.cruce.antetitulo -->
CGOCUS V1.1 · denominador: las filas del edgelist de cada legislatura

<!-- afinidades.cruce.titulo -->
¿Se cruzaba de bloque?

<!-- afinidades.cruce.entrada -->
Hay dos maneras de medir si se firmaba con el otro lado de la Cámara, y cuentan historias distintas.

<!-- afinidades.cruce.bloques -->
Cada diputado cae en un bloque según la ideología de su ficha. Izquierda reúne la extrema izquierda, la izquierda y el centro-izquierda; derecha, el centro-derecha, la derecha y la extrema derecha. Entre las dos queda el centro.

<!-- afinidades.cruce.dos -->
El cruce de bloque cuenta cualquier par de bloques distintos, centro incluido. El estricto cuenta solo la izquierda con la derecha.

<!-- afinidades.cruce.bloque -->
La parte de las relaciones que cruza de bloque cae del 35,1 % en 1931-1933 al 7,4 % en 1936-1939.

<!-- afinidades.cruce.estricto -->
El cruce estricto no cae de forma continua: 7,1 %, 2,5 % y 5,8 %, legislatura a legislatura.

<!-- afinidades.cruce.centro -->
Hasta la guerra, la mayor parte del cruce pasa por el centro. En la Constituyente, el 79,8 % de las relaciones que cruzan de bloque tiene un firmante del centro. En 1933-1936, el 89,0 %.

<!-- afinidades.cruce.centro_1936 -->
En 1936-1939 el centro casi desaparece: está en el 21,5 % del cruce. Lo que queda es cruce estricto.

<!-- afinidades.cruce.concentrado -->
Y ese cruce estricto se reúne en 16 de las 89 medidas de la legislatura.

<!-- afinidades.cruce.pnv -->
El PNV cuenta en la derecha, porque el censo lo codifica en el centro-derecha. En 1936-1939 está en el 24,5 % de las relaciones de cruce estricto.

<!-- afinidades.cruce.lectura -->
Es una lectura de los datos por bloques, hecha para esta página; los bloques no son una categoría de CGOCUS.

> [nota de diseño] F22 va tras `afinidades.cruce.estricto` si la plantilla la coloca a mano; si pinta «lo que haya», al
> final de la sección. Las frases del centro, de la concentración y del PNV son su lectura.

### F22 · Dos cruces

<!-- fig.F22.titulo -->
Dos cruces

<!-- fig.F22.pregunta -->
¿Se firmaba con el otro bloque?

<!-- fig.F22.que_mide -->
En cada legislatura, la parte de las relaciones par-medida que une a firmantes de bloques distintos, y la parte que une izquierda con derecha.

<!-- fig.F22.denominador -->
Las relaciones par-medida de cada legislatura: 30.345, 27.172 y 5.990.

<!-- fig.F22.leyenda.bloque -->
De bloque

<!-- fig.F22.leyenda.estricto -->
Estricto: izquierda con derecha

<!-- fig.F22.nota -->
⟦legislatura⟧ · ⟦serie⟧: ⟦pct⟧ · ⟦n⟧ de ⟦den⟧ relaciones par-medida

<!-- fig.F22.leyenda.centro -->
De bloque, con un firmante del centro

<!-- fig.F22.leyenda.lectura -->
Cada barra es el cruce de bloque de su legislatura. Su tramo en oro, el estricto, sale siempre del cero: se puede comparar de una legislatura a otra.

<!-- fig.F22.nota.centro -->
Con un firmante del centro: ⟦pct⟧ del cruce de bloque · ⟦n⟧ de ⟦den⟧

<!-- fig.F22.tabla.col.centro -->
Con el centro, dentro del cruce

<!-- fig.F22.tabla.col.leg -->
Legislatura

<!-- fig.F22.tabla.col.bloque -->
De bloque

<!-- fig.F22.tabla.col.estricto -->
Estricto

<!-- fig.F22.tabla.col.relaciones -->
Relaciones par-medida

<!-- fig.F22.salvedad -->
«De bloque» cuenta cualquier par de izquierda, centro y derecha; «estricto», solo izquierda con derecha. En 1936-1939 hay solo 89 medidas: no es una tercera foto comparable.

<!-- fig.F22.alt -->
Una barra por legislatura: la parte de las relaciones que cruza de bloque, con su tramo de izquierda con derecha (el cruce estricto) marcado desde el cero.

> [nota de diseño] F22: tres paneles con dos barras (serie única en `--dato` y resaltada en `--dato-2`, sin colores de
> ideología). Nota emergente con el numerador y el denominador (`n`, `den` de cada cifra). Tabla y Datos en pestañas;
> sin JS, barras y tabla. ⚠ No escribir en la figura que el cruce estricto de 1936-1939 es «casi todo con el PNV»:
> es falso con V1.1.

## 5. Tres redes

<!-- afinidades.redes.antetitulo -->
CGOCUS V1.1 · 475 · 470 · 501 diputados en el censo

<!-- afinidades.redes.titulo -->
Tres redes

<!-- afinidades.redes.entrada -->
Cada legislatura tiene su red: un punto por diputado del censo y una línea por cada par que firmó junto.

<!-- afinidades.redes.buscar -->
Busque a un diputado en la lista del censo: la red resalta a quienes firmaron con él.

<!-- afinidades.redes.aislados -->
La red de 1936-1939 tiene muchos puntos sueltos. Son los 186 diputados que no firmaron ninguna medida.

<!-- afinidades.redes.una -->
En 1931-1933 y en 1933-1936, todos los que firman forman una sola red: cualquiera llega a cualquiera a través de cofirmantes. En 1936-1939, cinco firmantes quedan en grupos sueltos, sin enlace con la red principal.

<!-- afinidades.redes.partidos -->
En 1936-1939 las firmas se encierran más en cada partido. La modularidad por partidos, que mide esa concentración, sube a 0,503, frente a 0,377 en la Constituyente.

<!-- afinidades.redes.app -->
La aplicación de Afinidades dibuja las redes con filtros por legislatura, ideología, partido, distrito, familia y rol.

<!-- afinidades.redes.llamada -->
[Abrir Afinidades ↗]

> [nota de diseño] F21 se carga bajo demanda ([Cargar la figura], `comun.boton.cargar`), una legislatura cada vez.
> [Abrir Afinidades ↗] va a `#red`.

### F21 · Tres redes

<!-- fig.F21.titulo -->
Las redes de coautoría, legislatura a legislatura

<!-- fig.F21.pregunta -->
¿Quién firmó con quién?

<!-- fig.F21.que_mide -->
Quién firmó alguna medida con quién, en cada legislatura. Cada línea une a dos diputados que firmaron juntos.

<!-- fig.F21.denominador -->
Los diputados del censo de cada legislatura: 475, 470 y 501.

<!-- fig.F21.conmuta.titulo -->
Legislatura

<!-- fig.F21.buscar -->
Buscar a un diputado del censo

<!-- fig.F21.buscar.vacio -->
Nadie con ese nombre en el censo de esta legislatura.

<!-- fig.F21.nota -->
⟦nombre⟧ · ⟦partido⟧ · ⟦familia⟧ · firmó con ⟦grado⟧ diputados

<!-- fig.F21.nota.aislado -->
⟦nombre⟧ · ⟦partido⟧ · ⟦familia⟧ · no firmó ninguna medida con otro diputado

<!-- fig.F21.leyenda.titulo -->
Ideología, según su ficha

<!-- fig.F21.leyenda.aislados -->
Sueltos, en el anillo exterior: los que no firmaron con nadie

<!-- fig.F21.leyenda.EI -->
Extrema izquierda

<!-- fig.F21.leyenda.I -->
Izquierda

<!-- fig.F21.leyenda.CI -->
Centro-izquierda

<!-- fig.F21.leyenda.C -->
Centro

<!-- fig.F21.leyenda.CD -->
Centro-derecha

<!-- fig.F21.leyenda.D -->
Derecha

<!-- fig.F21.leyenda.ED -->
Extrema derecha

<!-- fig.F21.rotulo.1936.izquierda -->
Las izquierdas

<!-- fig.F21.rotulo.1936.derecha -->
Las derechas

<!-- fig.F21.leyenda.tamano -->
El tamaño del punto crece con el número de diputados con que firmó.

<!-- fig.F21.nota.uno -->
⟦nombre⟧ · ⟦partido⟧ · ⟦familia⟧ · firmó con un diputado

<!-- fig.F21.coautores.titulo -->
Con quién firmó más

<!-- fig.F21.coautores.medidas -->
⟦n⟧ medidas

<!-- fig.F21.coautores.una -->
una medida

<!-- fig.F21.coautores.resto -->
y ⟦n⟧ diputados más

<!-- fig.F21.buscar.limpiar -->
Quitar la selección

<!-- fig.F21.teclado -->
Con el teclado: Tab lleva a la red; ← y → recorren a los diputados, de más a menos cofirmantes; Inicio y Fin, al primero y al último; Esc suelta.

<!-- fig.F21.cargar.nota -->
La red se puede recorrer y buscar en un ordenador o una tableta. Aquí va su imagen fija, con la tabla de grados en la pestaña Tabla.

<!-- fig.F21.tabla.titulo -->
Los veinte diputados que firmaron con más compañeros, en ⟦legislatura⟧

<!-- fig.F21.tabla.nota -->
El censo completo, con el grado de cada diputado en las tres legislaturas, va en la pestaña Datos.

<!-- fig.F21.sin_grafia -->
De las 1.026 personas del censo, 253 aún no tienen su grafía revisada: su nombre va como lo escribe CGOCUS, sin tildes.

<!-- fig.F21.tabla.col.nombre -->
Diputado

<!-- fig.F21.tabla.col.partido -->
Partido

<!-- fig.F21.tabla.col.familia -->
Familia

<!-- fig.F21.tabla.col.grado -->
Firmó con

<!-- fig.F21.salvedad -->
Coautoría no es voto ni acuerdo ideológico. Faltan las firmas sin atribuir y las de firmantes sin ficha en esa legislatura.

<!-- fig.F21.alt -->
Tres redes de coautoría, una por legislatura: cada punto es un diputado del censo y cada línea une a dos que firmaron juntos; los que no firmaron quedan sueltos.

> [nota de diseño] F21: nodos = censo de la legislatura (475 · 470 · 501), color por ideología (tokens de ideología del
> plan; los nombres de las siete categorías, los del glosario), posición precalculada y aristas rasterizadas en la
> compilación. Radios por legislatura con los rótulos de CGOCUS (1931-1933 · 1933-1936 · 1936-1939). La búsqueda
> resalta a los vecinos. Nombres con la grafía de `grafias.json`. Pestañas: Tabla de grados · Datos.

## 6. Personas: los puentes

<!-- afinidades.puentes.antetitulo -->
CGOCUS V1.1 · índice de transversalidad, por legislatura

<!-- afinidades.puentes.titulo -->
Personas: los puentes

<!-- afinidades.puentes.indice -->
Afinidades mide también a cada diputado. Su índice de transversalidad combina varias medidas de cuánto firma con otros partidos, dentro de cada legislatura.

<!-- afinidades.puentes.que_mide -->
No mide si sus ideas eran moderadas, sino si su manera de firmar saltaba las fronteras de su partido.

<!-- afinidades.puentes.1931 -->
En 1931-1933, los tres primeros son Melquíades Álvarez, Estelrich y Unamuno.

<!-- afinidades.puentes.1933 -->
En 1933-1936, encabezan la lista Chapaprieta, Cano López e Iranzo.

<!-- afinidades.puentes.1936 -->
En 1936-1939, entre los cinco primeros están Aguirre e Irujo, del PNV, que el censo codifica en el centro-derecha.

<!-- afinidades.puentes.lectura -->
El índice dice con quién firmaron, no qué defendían.

<!-- afinidades.puentes.roles -->
La aplicación da además a cada diputado un rol, de «diputado aislado» a «líder de Cámara», según su actividad, su influencia y su transversalidad.

<!-- afinidades.puentes.ficha -->
Su vista Diputados busca a cada uno por su nombre y filtra por familia, partido, distrito y rol.

<!-- afinidades.puentes.llamada -->
[Abrir Afinidades ↗]

> [nota de diseño] Nombres con la grafía de la tabla (`exportador/grafias.csv`; D-22: se adoptan las confirmadas y probables, y en las once por revisar, la forma que imprime el Diario). [Abrir Afinidades ↗] va a
> `#diputados`: la aplicación no abre una ficha concreta desde un enlace.

## 7. Lo que no mide

<!-- afinidades.limites.antetitulo -->
CGOCUS V1.1 · 175 de 1.530 medidas con la lista de firmas cortada

<!-- afinidades.limites.titulo -->
Lo que no mide, y cómo se mide

<!-- afinidades.limites.voto -->
Coautoría no es voto ni acuerdo ideológico. Firmar juntos una enmienda no dice cómo votó cada uno.

<!-- afinidades.limites.guerra -->
La legislatura de 1936-1939 no es una tercera foto comparable. De sus 89 medidas, 85 se firmaron antes del 18 de julio de 1936.

<!-- afinidades.limites.truncadas -->
De las 1.530 medidas, 175 llegan al Diario con la lista de firmas cortada: «Siguen las firmas hasta…». Solo cuentan las firmas impresas.

<!-- afinidades.limites.emparejamiento -->
El emparejamiento de nombres también se equivoca a veces. La fila de firmantes sin ficha en su legislatura lo deja ver.

<!-- afinidades.limites.roles -->
Los roles de la aplicación se asignan por percentiles dentro de cada legislatura. Que bajen de una a otra no es un hallazgo; que crezcan los aislados, sí.

<!-- afinidades.limites.ideologia -->
La ideología de cada diputado es la de su ficha, una por legislatura. Los bloques de esta página son una agrupación nuestra.

<!-- afinidades.limites.metodologia -->
Cada métrica, con su fórmula, está en la metodología del depósito (`METHODOLOGY.md`).

## 8. Los datos

<!-- afinidades.datos.antetitulo -->
Harvard Dataverse · doi:10.7910/DVN/CGOCUS · 8 archivos

<!-- afinidades.datos.titulo -->
Los datos

<!-- afinidades.datos.entrada -->
Afinidades Elegidas se descarga en Harvard Dataverse, con el mismo formulario que Luz y Taquígrafos. Son ocho archivos.

<!-- afinidades.datos.tabla.col.archivo -->
Archivo

<!-- afinidades.datos.tabla.col.que -->
Qué trae

<!-- afinidades.datos.tabla.col.peso -->
Peso

<!-- afinidades.datos.tabla.readme -->
El léame del depósito.

<!-- afinidades.datos.tabla.edgelist -->
Las relaciones par-medida, una por fila, con la ideología de los dos firmantes.

<!-- afinidades.datos.tabla.cosponsorship -->
Las firmas: una fila por diputado y medida, con el texto de la medida.

<!-- afinidades.datos.tabla.metadata -->
El censo: una ficha por diputado y legislatura, con partido, familia, ideología y distrito.

<!-- afinidades.datos.tabla.metrics -->
Las métricas de cada diputado, por legislatura y en total.

<!-- afinidades.datos.tabla.roles -->
El rol de cada diputado en cada legislatura.

<!-- afinidades.datos.tabla.methodology -->
La metodología, en español y en inglés.

<!-- afinidades.datos.tabla.codebook -->
La descripción de cada campo.

> [nota de diseño] Tabla de archivos, en el orden del depósito (celdas = claves y marcadores; el nombre de archivo es
> un literal de código):
>
> | `afinidades.datos.tabla.col.archivo` | `afinidades.datos.tabla.col.que` | `afinidades.datos.tabla.col.peso` |
> |---|---|---:|
> | `00_README.txt` | `afinidades.datos.tabla.readme` | 14,6 KB |
> | `2REP_coauthor_edgelist.tab` | `afinidades.datos.tabla.edgelist` | 5,3 MB |
> | `2REP_cosponsorship.tab` | `afinidades.datos.tabla.cosponsorship` | 15,9 MB |
> | `representative_metadata.tab` | `afinidades.datos.tabla.metadata` | 153,1 KB |
> | `representatives_metrics.json` | `afinidades.datos.tabla.metrics` | 16,9 MB |
> | `representatives_roles.json` | `afinidades.datos.tabla.roles` | 82,4 KB |
> | `METHODOLOGY.md` | `afinidades.datos.tabla.methodology` | 76,3 KB |
> | `CODEBOOK.md` | `afinidades.datos.tabla.codebook` | 30,5 KB |
>
> Pesos en la unidad de Dataverse (bytes / 1.024², MB o KB), con `|peso`. Los nombres de archivo salen de
> `dv.cgocus.<archivo>.nombre`.

<!-- afinidades.datos.texto -->
El archivo de firmas trae el texto de cada medida: sirve para leer qué se firmó, no solo quién.

<!-- afinidades.datos.trampa -->
Una trampa al unir: `2REP_cosponsorship` llama «1933-1935» a la segunda legislatura, y los demás archivos, «1933-1936».

<!-- ↺ comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- afinidades.datos.descargar -->
[Descargar en Dataverse ↗]

<!-- afinidades.datos.unir -->
Para unirla con las filas de Luz y Taquígrafos, la clave es el diputado y la legislatura. Usar los datos lo explica, con el error que hay que evitar.

<!-- afinidades.datos.llamada -->
[Unir con THQCMI]

> [nota de diseño] ↺ 3 va **encima** de [Descargar en Dataverse ↗], que lleva al DOI de CGOCUS
> (`https://doi.org/10.7910/DVN/CGOCUS`), nunca a un archivo suelto: la plantilla no debe pintar ↺ 3 otra vez a mano.
> La cita la pone el componente `Cita` con `Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Afinidades Elegidas: Parliamentary Cosponsorship Networks of the Spanish Second Republic (1931-1939)", https://doi.org/10.7910/DVN/CGOCUS, Harvard Dataverse, V1, UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]` tal cual, `comun.cita.dataverse` y
> `comun.cita.cgocus.nota` (texto; BibTeX y RIS en `<details>`). [Unir con THQCMI] va a `/{lang}/datos/#unir`: es el
> único corchete de la sección sin rótulo único, así que los `destinos` de la plantilla deben ser solo ese.


<!-- ═══ cortes.md ═══ -->

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
> tecleada: todas son `⟦marcador⟧` (años de un hecho, fechas de sesión y números de artículo van en claro, como en
> ParlaIbero). En las plantillas de nota emergente, `⟦nombre⟧`, `⟦n⟧`, `⟦den⟧`… son variables que rellena la
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
<!-- cortes.meta.descripcion --> Las 755 sesiones del Congreso entre 1931 y 1945, mes a mes, y las etapas de sus legislaturas: lo que tiene y lo que le falta cada una.

<!-- cortes.antetitulo --> V2 · 755 sesiones · 14-VII-1931 → 9-XI-1945
<!-- cortes.titulo --> ¿Qué Cortes están aquí, y cuándo se reunieron?

<!-- cortes.entrada -->
La base reúne tres legislaturas, partidas aquí en cinco etapas. Son 755 sesiones, de julio de 1931 a noviembre de 1945. Cada bloque del calendario abre la ficha de su etapa.

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
Las Constituyentes se reunieron en 27 de sus 28 meses; el que falta es enero de 1933.

<!-- cortes.calendario.dice.II -->
La legislatura elegida en 1933 dejó cuatro meses sin sesión: agosto y septiembre de 1934, abril y agosto de 1935.

<!-- cortes.calendario.dice.III -->
La Cámara de 1936 se reunió en los cinco meses que tuvo antes de la guerra.

<!-- cortes.calendario.dice.IV -->
De la guerra quedan nueve sesiones en 29 meses.

<!-- cortes.calendario.dice.hueco -->
Después vienen 70 meses sin ninguna sesión en el corpus, hasta enero de 1945.

<!-- cortes.calendario.dice.V -->
En 1945 hay cinco sesiones, celebradas en México, en tres de los 11 meses de la etapa.

<!-- ↺ comun.boton.ver_sesiones --> [Ver las sesiones y votaciones]

> [nota de diseño] Debajo, la pestaña Datos de la figura con [Descargar los datos de la figura] y la frase ↺ 12
> (claves de `comun.md`). En F01, además, SVG y PNG.

### 1.3 De legislaturas a etapas

<!-- cortes.etapas.titulo --> Legislaturas y etapas

<!-- cortes.etapas.entrada -->
El CSV rotula cada fila con su legislatura. La tercera, 1936-1939, reúne tres cosas distintas: la Cámara de 1936, las sesiones de la guerra y las de México.

<!-- cortes.etapas.corte -->
Aquí esa legislatura se parte por su propia numeración: sesiones 1 a 60, 61 a 69 y 70 a 74.

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
«Diputados que intervienen» cuenta identificadores de diputado distintos, incluido el de quien preside. En todo el corpus son 773.

<!-- cortes.etapas.tabla.pie_leg -->
Por legislatura del CSV son 417, 390 y 253: la suma por etapas cuenta dos veces a quien habla en más de una.

<!-- ↺ comun.fija.notabases -->
Esta cifra sale de la edición del explorador (v3, 121.700 filas, sin depositar); la depositada es la V2 (107.551 filas). Por qué hay dos →

### 1.4 Lo que no está aquí

<!-- cortes.ausente.titulo --> Lo que no está aquí

<!-- cortes.ausente.permanente -->
La Constitución de 1931 creó una Diputación Permanente de Cortes, en su artículo 62. Con las Cortes disueltas, resolvía en su lugar sobre la suspensión de garantías (artículo 42).

<!-- cortes.ausente.permanente_corpus -->
Sus reuniones no están en el corpus.

<!-- cortes.ausente.caratula -->
La carátula del volumen de México enumera las que celebró allí, de 1939 a 1943. Y añade: «sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia».

<!-- cortes.ausente.caratula_fila -->
Esa carátula abre el sumario del 10 de enero de 1945, y solo está en la edición del explorador (v3 121466).

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

<!-- cortes.etapa.registro --> Las cinco etapas, una a una
<!-- cortes.etapa.recuento --> ⟦n⟧ sesiones
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

<!-- cortes.ficha.miga --> Las Cortes / ⟦romano⟧

> [nota de diseño] `⟦romano⟧` es variable de plantilla (I…V), no cifra.

<!-- cortes.ficha.antetitulo.proyecto --> metadatos del proyecto

<!-- cortes.ficha.hoy.titulo --> Hoy puede
<!-- cortes.ficha.hoy.consulta --> Consulta
<!-- cortes.ficha.hoy.recuento --> resultados en el explorador el ⟦fecha⟧

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

> [nota de diseño] La cita del conjunto es `Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic, 1931–1945", https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2` (de `base.py`), con [Copiar la cita] en texto, BibTeX
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
Calendario de 755 sesiones, de julio de 1931 a noviembre de 1945, agrupado por etapas, con una barra por sesión. Los meses sin sesión llevan contorno.

<!-- fig.F01.conmuta.titulo --> Altura de la barra
<!-- fig.F01.conmuta.palabras --> Palabras
<!-- fig.F01.conmuta.diputados --> Diputados que intervienen

<!-- fig.F01.leyenda.con_sesion --> Mes con sesión
<!-- fig.F01.leyenda.sin_sesion --> Sin sesión dentro de la etapa
<!-- fig.F01.leyenda.fuera --> Fuera de toda etapa
<!-- fig.F01.leyenda.puerta --> Sesión con puerta de lectura
<!-- fig.F01.leyenda.doble --> Dos sesiones el mismo día
<!-- fig.F01.leyenda.salto --> Salto: ningún mes con sesión entre 1939 y 1944
<!-- fig.F01.leyenda.tono --> Palabras impresas en el mes (V2), en cinco clases de doce o trece meses con sesión
<!-- fig.F01.leyenda.altura --> Altura de la barra: palabras de la sesión (V2). La más alta, 97.055.
<!-- fig.F01.leyenda.altura_dip --> Altura de la barra: diputados que intervienen, con quien preside (V2). La más alta, 61.
<!-- fig.F01.leyenda.barra --> Una sesión

<!-- fig.F01.salto -->
⟦desde⟧ → ⟦hasta⟧: ⟦n⟧ meses; el corpus no contiene ninguna sesión.

> [nota de diseño] El rótulo del «//» se rellena con `meses.salto.desde` (1939-03, `|mes`), `meses.salto.hasta`
> (1944-12) y `meses.salto`. Ningún otro hueco lleva rótulo de texto: los demás meses sin sesión llevan solo contorno y
> su nota.

> [nota de diseño] Fase 2 (grupo 1): la nota emergente tiene tres líneas (DESIGN.md § Sistema de figuras): qué
> (el mes o la fecha, en garamond), las cifras (mono) y la base con su fuente. Por eso cada plantilla se parte en su
> línea de cifras (`fig.F01.nota.*`) y su línea de base (`*.base`); la primera línea es la variable `⟦mes⟧` o
> `⟦fecha⟧`, que pone la figura. Las palabras son las de la fase 1.

<!-- fig.F01.nota.mes -->
755 sesiones · ⟦filas⟧ filas · ⟦palabras⟧ palabras · ⟦diputados⟧ diputados intervienen

<!-- fig.F01.nota.mes_una -->
una sesión · ⟦filas⟧ filas · ⟦palabras⟧ palabras · ⟦diputados⟧ diputados intervienen

<!-- fig.F01.nota.mes_vacio -->
ninguna sesión en el corpus, dentro de su etapa

<!-- fig.F01.nota.base -->
V2 · 2REP_Diaries.csv · los diputados cuentan a quien preside

<!-- fig.F01.nota.base_vacio -->
V2 · 2REP_Diaries.csv · la causa no sale del corpus

<!-- fig.F01.nota.sesion -->
sesión ⟦num⟧ · ⟦filas⟧ filas · ⟦palabras⟧ palabras · ⟦diputados⟧ diputados intervienen

<!-- fig.F01.nota.sesion.base -->
V2 · ⟦sigla⟧ núm. ⟦diario⟧, pp. ⟦p1⟧–⟦p2⟧ (metadatos del proyecto)

<!-- fig.F01.nota.sesion_sin_paginas.base -->
V2 · ⟦sigla⟧ núm. ⟦diario⟧, páginas sin verificar (metadatos del proyecto)

<!-- fig.F01.nota.puerta --> Tiene puerta de lectura: pulse para abrirla.

> [nota de diseño] Ejemplos resueltos, para comprobar la concordancia (valores de hoy, V2 y proyecto):
> «Febrero de 1933 / 16 sesiones · 1.843 filas · 574.317 palabras · … / V2 · 2REP_Diaries.csv…».
> «1-X-1931 / sesión 48 · 395 filas · 41.963 palabras · 48 diputados intervienen / V2 · DSCCRE núm. 48, pp. 1347–1394
> (metadatos del proyecto)». La variante `sesion_sin_paginas` vale para las 14 sesiones con `page_status = unverified`
> (etapas IV y V).
> Un clic en una sesión sin puerta abre bajo la figura su ficha breve: `fig.F01.breve.*`.

<!-- fig.F01.breve.titulo --> ⟦fecha⟧ · sesión ⟦num⟧
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
<!-- fig.F01.tabla.hueco --> ⟦desde⟧ → ⟦hasta⟧ · ⟦n⟧ meses sin sesión
<!-- fig.F01.tabla.hueco_uno --> ⟦mes⟧ · sin sesión
<!-- fig.F01.tabla.sesiones.resumen --> Las sesiones de esta etapa, una a una
<!-- fig.F01.tabla.sesiones.col.fecha --> Fecha
<!-- fig.F01.tabla.sesiones.col.num --> Sesión
<!-- fig.F01.tabla.sesiones.col.diario --> Diario y páginas (proyecto)

> [nota de diseño] Pestaña Tabla: los 64 meses con sesión, más una fila por hueco con su rango. En F01
> (Las Cortes), la tabla de sesiones de cada etapa va en un `<details>` con `fig.F01.tabla.sesiones.resumen`.

<!-- ↺ comun.fija.tono -->
El tono dice cuántas palabras se imprimieron, no cuánto importó.

<!-- fig.F01.salvedad.causas -->
Las causas de un mes sin sesión —receso, disolución, guerra— no salen del corpus y no se rotulan.

<!-- fig.F01.salvedad.extractos -->
Extractos oficiales, no Diario íntegro; páginas sin verificar.

<!-- fig.F01.salvedad -->
El tono dice cuántas palabras se imprimieron, no cuánto importó. Las causas de un mes sin sesión —receso, disolución, guerra— no salen del corpus y no se rotulan.

<!-- fig.F01.cabecera --> ⟦n⟧ sesiones · ⟦palabras⟧ palabras

<!-- fig.F01.breve.mes --> Las sesiones de ⟦mes⟧

<!-- fig.F01.leame.que_mide -->
Las sesiones del Congreso de 1931 a 1945, una por fila en sesiones.csv, y los meses con su estado en meses.csv. Cuentan filas, palabras y diputados de la edición depositada (V2).

<!-- fig.F01.leame.denominador -->
Son recuentos, sin denominador: filas, suma de nwords y rep_id distintos por sesión o por mes. La clase del tono reparte los 64 meses con sesión en cinco grupos por cuantiles.

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
⟦desde⟧ → ⟦hasta⟧ · ⟦n⟧ sesiones

<!-- fig.F16.nota_una -->
⟦fecha⟧ · una sesión

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
La banda da el presidente titular de la sesión (metadatos del proyecto). En 586 de 755 sesiones un vicepresidente presidió algún tramo (V2). Los días de cambio de Gobierno cuentan para el entrante.

> [nota de diseño] La salvedad pasa de 30 palabras en dos frases: la primera tiene 26. `pres.vice_ses` es V2 (analizador
> de etiquetas del explorador) y lleva `data-base="V2"`; el resto de la banda es «proyecto».

### F05 · Quién tomó la palabra en la etapa

<!-- fig.F05.titulo --> Los diez que más hablaron
<!-- fig.F05.pregunta --> ¿Quién habló más en esta etapa, sin contar la Presidencia?
<!-- fig.F05.alt -->
Barras horizontales con los diez diputados que más palabras de habla suman en la etapa, sin la Presidencia, en la edición del explorador.

<!-- fig.F05.nota -->
⟦nombre⟧ · ⟦n⟧ de ⟦den⟧ palabras de habla de la etapa, sin la Presidencia (v3)

<!-- fig.F05.nota_partido --> ⟦partido⟧ · ⟦familia⟧

<!-- fig.F05.tabla.col.puesto --> Puesto
<!-- fig.F05.tabla.col.nombre --> Diputado
<!-- fig.F05.tabla.col.partido --> Partido
<!-- fig.F05.tabla.col.palabras --> Palabras de habla (v3)
<!-- fig.F05.tabla.col.pct --> De la etapa

<!-- fig.F05.salvedad -->
Palabras de habla en la edición del explorador, sin la Presidencia, sin sumarios ni documentos. Hablar mucho no es pesar mucho.

<!-- fig.F05.datos -->
Los datos de la figura traen a los 773 diputados que intervienen, etapa a etapa.

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
⟦familia⟧ · ⟦pct⟧ · ⟦n⟧ de ⟦den⟧ palabras sin Presidencia (V2)

<!-- fig.F09.nota.filas -->
⟦familia⟧ · ⟦pct⟧ · ⟦n⟧ de ⟦den⟧ filas sin Presidencia (V2)

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


<!-- ═══ cortes_1931.md ═══ -->

# Copy ES · Ficha I · Las Cortes Constituyentes (1931–1933) (`/[lang]/cortes/1931/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_a**. Sigue la narrativa §8.1
> y la plantilla C del plan (tope: 1.200–1.500 palabras de copy para el lector). Rótulos comunes de la ficha y textos
> de las figuras: `cortes.md` (`cortes.ficha.*`, `fig.*`). Marcadores: `docs/marcadores/cortes_1931.md`.
>
> **Procedencia.** Cada hecho de la Cámara está anclado en su fila, con el id de la V2 (CSV depositado, MD5
> `360332a0…`) y el de la v3 (base del explorador, sha256 `3a0d8b2d…`); las citas se leyeron hoy letra a letra en las
> dos filas (`docs/marcadores/cortes_a_comprobar.py`). Los hechos externos llevan [I] (institucional) o [A]
> (académica), comprobados hoy; están en `02b_BIBLIOGRAFIA.md`, sección «Fichas I y II».
>
> **Cambios respecto a la narrativa, y por qué:**
> 1. **La elección de Alcalá-Zamora como Presidente de la República no es [EXT]:** está en el Diario (V2 13613:
>    «queda elegido Presidente de la República española», 362 votos de 410). Se ancla en su fila.
> 2. **La Sanjurjada tampoco:** el 10-VIII-1932 Azaña cuenta a la Cámara cómo supo que «el general Sanjurjo se ha
>    presentado en Sevilla» (V2 32910). Se ancla en su fila y se evita la palabra «Sanjurjada» como juicio.
> 3. **El final de las Constituyentes se cuenta con el Diario**: el Gobierno Lerroux se presenta el 2-X-1933, pierde la
>    votación nominal de una proposición socialista (187 contra 91, V2 61320) y Besteiro suspende las sesiones
>    (V2 61355). La disolución es [I]: decreto de 9-X-1933 (Gaceta de Madrid, 10-X-1933, pp. 251–252).
> 4. **«Seis votaciones nominales en cinco sesiones» no describe el corpus:** en esta etapa al menos 532 filas
>    de la V2 traen una lista «Señores que dijeron sí/no», en 206 sesiones. La ficha lo dice
>    (`etapa.I.listas_nominales.*`); Sesiones ya presenta F26 como selección. La definición común está en
>    `docs/peticiones/cortes_a.md`.
> 5. **Campalans «responde» a Ortega**: comprobado; abre su discurso hablando «después de hacerlo el ilustre maestro de
>    todos D. José Ortega y Gasset» (V2 25529).
> 6. **Nada sobre el «primer voto de las mujeres en 1933»** aquí: va en la ficha II, con su fuente.

<!-- cortes.1931.meta.titulo --> Las Cortes Constituyentes (1931–1933)
<!-- cortes.1931.meta.descripcion --> La Cámara que escribió la Constitución de 1931, sesión a sesión: qué pasó en ella según su Diario, cuándo se reunió, quién tomó la palabra y cómo citarla.

<!-- cortes.1931.miga --> Las Cortes / I
<!-- cortes.1931.titulo --> Las Cortes Constituyentes (1931–1933)

<!-- cortes.1931.antetitulo -->
14-VII-1931 → 3-X-1933 · 405 sesiones · Diario de Sesiones de las Cortes Constituyentes de la República Española

> [nota de diseño] La serie lleva a continuación, en cuerpo pequeño, `cortes.ficha.antetitulo.proyecto` («metadatos del
> proyecto»), porque sale de `sessions.json`.

<!-- cortes.1931.entrada -->
¿Qué hizo una Cámara elegida para escribir una Constitución, y qué le pasó después?

<!-- cortes.1931.tension -->
Entre julio y diciembre de 1931 escribió la Constitución; hasta octubre de 1933 legisló y controló al Gobierno con ella. Cada momento está en una fila que usted puede abrir.

## Hoy puede

<!-- cortes.1931.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1931-1933» y escriba su búsqueda.

<!-- cortes.1931.hoy.buscar.consulta --> divorcio

<!-- cortes.1931.hoy.buscar.recuento -->
Con esa faceta, «divorcio» da 485 intervenciones (v3), contando todas las filas. Recuento del 23 de septiembre de 2026.

<!-- cortes.1931.hoy.sesion -->
**Abrir una sesión.** Ponga el 1 de octubre de 1931 en Desde y en Hasta, abra una intervención y pulse `s`: tendrá la sesión corrida.

<!-- cortes.1931.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, pulse «Añadir bibliotecas del proyecto…» y elija «Sufragio femenino»: 770 intervenciones (v3).

<!-- cortes.1931.hoy.tendencia -->
**Seguir una palabra en el tiempo.** Busque «divorcio» (la consulta de la primera tarea), pulse `t` para abrir Tendencia y elija el periodo «Constituyentes».

<!-- cortes.1931.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Debajo de las cinco tareas, ↺ 5 (`comun.fija.enlace`) y ↺ 4 (`comun.fija.ids`), una vez cada una.
> «Mis bibliotecas», «Añadir bibliotecas del proyecto…», «Sufragio femenino», Desde, Hasta, `s` y `t` están
> comprobados en el explorador publicado (`estudio_lyt_explorador.md` §4).

## Cifras

<!-- cortes.1931.cifras.sesiones -->
405 sesiones, numeradas de la 1 a la 405 sin que falte ningún número.

<!-- cortes.1931.cifras.palabras -->
12.966.290 palabras en la edición depositada: el 53,28 % del corpus.

<!-- cortes.1931.cifras.diputados -->
417 diputados intervienen, contando a quien preside.

## Lo que pasó en la Cámara

### La Cámara se constituye (julio de 1931)

<!-- cortes.1931.contexto.1.titulo --> La Cámara se constituye (julio de 1931)

<!-- cortes.1931.contexto.1.a -->
El 14 de abril de 1931, el comité de las fuerzas políticas coaligadas designó a Niceto Alcalá-Zamora Presidente del Gobierno provisional de la República. Ese Gobierno convocó unas Cortes Constituyentes de una sola Cámara, elegida por sufragio directo, para el 14 de julio. Las elecciones se celebrarían el 28 de junio.

<!-- cortes.1931.contexto.1.b -->
La primera sesión la abre una Mesa de edad, que preside Narciso Vázquez Lemus (V2 1 · v3 2). Alcalá-Zamora toma la palabra como Presidente del Gobierno provisional; su discurso ocupa 3.715 palabras.

<!-- cortes.1931.contexto.1.c -->
Viene a «resignar sus Poderes en fecha próxima» ante la Cámara (V2 2 · v3 3).

<!-- cortes.1931.contexto.1.d -->
Esa misma sesión elige Presidente interino a Julián Besteiro, con 363 votos de 371 (V2 5 · v3 9). El Diario anota que ocupa su sitial «acogido con una gran ovación» (V2 10 · v3 18).

<!-- cortes.1931.contexto.1.fuentes -->
[I] Decreto del Comité político, Madrid, 14 de abril de 1931. *Gaceta de Madrid*, núm. 105, 15 de abril de 1931, pp. 193–194. · [I] Decretos del Gobierno provisional sobre las Cortes Constituyentes y las elecciones. *Gaceta de Madrid*, núm. 155, 4 de junio de 1931, pp. 1174–1175 y 1181.

### La Constitución (agosto–diciembre de 1931)

<!-- cortes.1931.contexto.2.titulo --> La Constitución (agosto–diciembre de 1931)

<!-- cortes.1931.contexto.2.a -->
El 27 de agosto, Luis Jiménez de Asúa presenta el proyecto «en nombre de la Comisión», en 5.188 palabras (V2 2725 · v3 3006). Lo define así: «es una Constitución de izquierda».

<!-- cortes.1931.contexto.2.b -->
El 1 de octubre, la Cámara aprueba el voto de las mujeres.

<!-- cortes.1931.contexto.2.c -->
El 13 de octubre, tras el debate de la cuestión religiosa, el artículo 24 del proyecto sale por 178 votos contra 59 (V2 6994 · v3 7800).

<!-- cortes.1931.contexto.2.d -->
La lista de los que votan no empieza por dos apellidos: Alcalá-Zamora y Maura. Eran el Presidente y el ministro de la Gobernación del Gobierno provisional.

<!-- cortes.1931.contexto.2.e -->
Al día siguiente, Manuel Azaña habla ya como Presidente del Gobierno. Lamenta «la sensible baja que nos ha forzado hoy a este cambio ministerial» (V2 7022 · v3 7833).

<!-- cortes.1931.contexto.2.f -->
El 9 de diciembre se aprueba la Constitución. De los 466 diputados que habían prometido el cargo, votan 368, y todos dicen sí (V2 13531 · v3 15043).

<!-- cortes.1931.contexto.2.g -->
Al día siguiente, la Cámara elige Presidente de la República a Niceto Alcalá-Zamora, con 362 votos de 410 (V2 13613 · v3 15140).

> [nota de diseño] `2.b` enlaza con `cortes.ficha.contexto.puerta` a `/es/cortes/sesiones/sufragio-1931/`; `2.c`, a
> `cuestion-religiosa-1931/`. En `2.d`, la lista del Diario da solo apellidos: «Alcalá-Zamora» y «Maura» son los dos
> primeros de «Señores que han dicho no» (V2 6994). En la legislatura 1931-1933 el único diputado apellidado Maura que
> interviene es Miguel Maura Gamazo, y la *Gaceta* del 15-IV-1931 (p. 194) lo nombra ministro de la Gobernación.

<!-- cortes.1931.contexto.2.fuentes -->
[I] *Gaceta de Madrid*, núm. 105, 15 de abril de 1931, p. 194 (nombramiento de Miguel Maura como ministro de la Gobernación).

### Gobernar con la Constitución (1932)

<!-- cortes.1931.contexto.3.titulo --> Gobernar con la Constitución (1932)

<!-- cortes.1931.contexto.3.a -->
El 9 de marzo de 1932 habla Azaña, ya Presidente del Consejo de Ministros (V2 20689 · v3 23023). Dice: «El centro de gravedad de la política de la República española está en el Parlamento, aquí en este salón».

<!-- cortes.1931.contexto.3.b -->
El 13 de mayo, José Ortega y Gasset dice del problema catalán que «es un problema que no se puede resolver, que sólo se puede conllevar» (V2 25527 · v3 28500).

<!-- cortes.1931.contexto.3.c -->
En la misma sesión le contesta Rafael Campaláns, que pide la palabra «después de hacerlo el ilustre maestro de todos» (V2 25529 · v3 28502).

<!-- cortes.1931.contexto.3.d -->
El 27 de mayo, Azaña defiende el Estatuto de Cataluña en un discurso que tiene su propia puerta de lectura.

<!-- cortes.1931.contexto.3.e -->
El 10 de agosto, Azaña acude a la Cámara por «los sucesos acaecidos esta madrugada en Madrid» (V2 32910 · v3 36780). Cuenta cómo supo que el general Sanjurjo se había presentado en Sevilla.

<!-- cortes.1931.contexto.3.f -->
El 9 de septiembre, en votación nominal, la Reforma agraria sale por 318 votos contra 19 (V2 37177 · v3 41627).

<!-- cortes.1931.contexto.3.g -->
El mismo día, el Estatuto de Cataluña sale por 314 votos contra 24 (V2 37178 · v3 41629).

<!-- cortes.1931.contexto.3.h -->
No son excepciones: en esta etapa, al menos 532 filas de la edición depositada traen una lista de votación nominal, nombre por nombre.

<!-- cortes.1931.contexto.3.i -->
Esas listas están en 206 sesiones. Van dentro del texto de las filas, no en una columna de la base.

> [nota de diseño] `3.d` enlaza con la puerta `estatuto-1932/`, que da la cifra («más de 17.000 palabras») y explica
> que la V2 pone ese discurso a nombre de la Presidencia; esta ficha no repite la cifra. `3.h` cuenta las filas con la cabecera «Señores que dijeron» o «han dicho»,
> seguida de «sí» o «no» (V2, sin acentos ni mayúsculas): la misma definición que `voto.listas.sesiones` de Sesiones.
> Es un mínimo, porque el reconocimiento óptico rompe algunas cabeceras.

### Casas Viejas y el desgaste (1933)

<!-- cortes.1931.contexto.4.titulo --> Casas Viejas y el desgaste (1933)

<!-- cortes.1931.contexto.4.a -->
En enero de 1933 no hubo sesión. El debate sobre Casas Viejas llega el 1 de febrero, en la primera sesión del mes.

<!-- cortes.1931.contexto.4.b -->
El debate preparado del explorador lo sigue durante nueve sesiones, hasta el 16 de marzo (v3).

<!-- cortes.1931.contexto.4.c -->
Del 4 al 6 de julio, la Cámara discute la nueva ley electoral; es el debate preparado «Ley Electoral de 1933».

<!-- cortes.1931.contexto.4.d -->
Cuando las Cortes vuelven a reunirse, el 2 de octubre, gobierna Alejandro Lerroux. Según los metadatos del proyecto, su Gobierno solo pasa por la Cámara en dos sesiones.

> [nota de diseño] `4.a` enlaza con la puerta `casas-viejas-1933/`. «En la primera sesión del mes»: el 1-II-1933 es la
> primera sesión de febrero y su Diario ya trae «Casas Viejas» (V2 44797 y siguientes). `etapa.I.gob.lerroux_1` es la
> cuenta de la banda F16 (proyecto).

### El final (octubre de 1933)

<!-- cortes.1931.contexto.5.titulo --> El final (octubre de 1933)

<!-- cortes.1931.contexto.5.a -->
El 2 de octubre, Lerroux presenta su Gobierno a la Cámara (V2 61223 · v3 68793). Azaña le contesta en 12.127 palabras (V2 61237 · v3 68809).

<!-- cortes.1931.contexto.5.b -->
Al día siguiente, Lerroux abre su réplica así: «Señores Diputados, los que van a morir os saludan.» (V2 61277 · v3 68855).

<!-- cortes.1931.contexto.5.c -->
La minoría socialista mantiene su proposición, defendida por Indalecio Prieto. El Gobierno abandona el banco azul antes de que se vote (V2 61309 · v3 68887).

<!-- cortes.1931.contexto.5.d -->
La proposición sale por 187 votos contra 91, en votación nominal (V2 61320 · v3 68900).

<!-- cortes.1931.contexto.5.e -->
Besteiro cierra: «En vista de la declaración del Gobierno, se suspenden las sesiones de Cortes» (V2 61355 · v3 68942).

<!-- cortes.1931.contexto.5.f -->
Fue la última sesión de las Constituyentes. Un decreto del 9 de octubre, firmado por Alcalá-Zamora y Diego Martínez Barrio, las declaró disueltas.

<!-- cortes.1931.contexto.5.g -->
Otro decreto del mismo día convocó elecciones para el 19 de noviembre, con segunda vuelta el 3 de diciembre.

> [nota de diseño] En `5.c`, «su proposición» es la que el Diario llama «proposición presentada por la minoría
> socialista y defendida por mi amigo el Sr. Prieto» (Castrovido, V2 61322). Martínez Barrio firma el decreto como
> Presidente del Consejo de Ministros.

<!-- cortes.1931.contexto.5.fuentes -->
[I] Decretos de 9 de octubre de 1933. *Gaceta de Madrid*, núm. 283, 10 de octubre de 1933, pp. 251–252.

## Cuándo se reunió

<!-- cortes.1931.calendario.entrada -->
La Cámara se reunió en 27 de sus 28 meses. El que falta es enero de 1933.

<!-- cortes.1931.calendario.presidente -->
Bajo el calendario van dos bandas de los metadatos del proyecto. Julián Besteiro es el presidente titular de 401 sesiones.

<!-- cortes.1931.calendario.presidente_otros -->
Francisco Barnés lo es de tres y Antonio Lara, de una.

<!-- cortes.1931.calendario.vice -->
Aun así, un vicepresidente ocupó la Presidencia algún tramo en 322 sesiones de la etapa (V2).

<!-- cortes.1931.calendario.gobiernos -->
La banda de Gobiernos va del Provisional a Lerroux I, con Azaña I, II y III entre medias.

## Quién tomó la palabra

<!-- cortes.1931.palabra.f05 -->
Sin contar la Presidencia, Manuel Azaña encabeza la palabra de la etapa: 426.392 palabras de habla (v3).

<!-- cortes.1931.palabra.f05_siguen -->
Le siguen Antonio Royo Villanova, Indalecio Prieto, José Antonio Balbontín y Eduardo Ortega y Gasset.

<!-- cortes.1931.palabra.f09 -->
Por familias, los republicanos se llevan el 51,3 % de las palabras sin Presidencia (V2).

> [nota de diseño] F05 (v3) lleva NotaBases (↺ 13) al pie; F09 (V2), no. Los cinco nombres de `f05_siguen` deben
> coincidir con los puestos 2 a 5 de `oradores_etapa.json` (el exportador lo comprueba). Aquí está Royo Villanova
> segundo: en la V2 con Presidencia saldría Prieto, inflado por un documento leído dentro de su fila (V2 55221).

## Puertas de esta etapa

<!-- cortes.1931.puertas.sufragio --> 1-X-1931 · El voto de las mujeres
<!-- cortes.1931.puertas.religiosa --> 13 y 14-X-1931 · «España ha dejado de ser católica»
<!-- cortes.1931.puertas.estatuto --> 27-V-1932 · El discurso de Azaña, a nombre de otro
<!-- cortes.1931.puertas.casas_viejas --> 2-II-1933 · Casas Viejas

> [nota de diseño] Registro de calendario, fecha en mono, cada línea enlazada a su puerta. Los títulos son los H1 de
> las puertas (narrativa §10); si su dueño los cambia, se toman de sus claves. Las puertas de la edición 0.2 no se
> pintan hasta que existan.

## Debates preparados en el explorador

<!-- cortes.1931.debates.entrada -->
El explorador trae 13 debates preparados de esta etapa (v3):

<!-- cortes.1931.debates.lista -->
- La Cámara se constituye (1931)
- La Constitución de 1931
- Sufragio femenino
- Cuestión religiosa (art. 26)
- Ley de Defensa de la República
- Responsabilidades de Alfonso XIII
- El primer presidente de la República
- Estatuto de Cataluña
- Reforma agraria y Sanjurjada
- Casas Viejas
- Azaña y Lerroux: la ruptura
- Ley Electoral de 1933
- El final de las Constituyentes

> [nota de diseño] Los nombres son los del explorador, sin el prefijo «Debate · » del diálogo (regla común en
> `comun.md` § 3 y en `explorador.bibliotecas.proyecto`), en su orden de fechas; nunca las claves B1…B26, que no son
> cronológicas. Van como lista (`- `), una por línea: `tBloques` la pinta como `<ul>` (REVISION_FASE1 P3-1). Van debajo `cortes.ficha.debates.como` y `cortes.ficha.debates.salvedad`.

## Antes de usarla

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- cortes.1931.antes.bucle -->
La sesión 9 repite una y otra vez el mismo par de nombres, por un bucle del reconocimiento óptico (V2 976 · v3 1081).

<!-- cortes.1931.antes.fechas -->
De las siete fechas de sesión que corrigió la V2, seis son de esta etapa.

<!-- cortes.1931.antes.estatuto -->
En la V2, el discurso de Azaña del 27 de mayo de 1932 va dentro de una fila de la Presidencia (V2 25979). La v3 lo separa (v3 29042).

<!-- cortes.1931.antes.listas -->
Las listas de votación dan solo apellidos: para saber quién votó, hay que cotejarlos con el censo de diputados.

<!-- cortes.1931.antes.martinez_barrio -->
El partido de Diego Martínez Barrio figura como AR en esta legislatura, y está pendiente de revisión.

> [nota de diseño] `antes.fechas` enlaza con Versiones (`/es/datos/versiones/#fechas`, F25). `antes.martinez_barrio`
> es un pendiente de datos de D-25: se declara, no se corrige (decisión del 23-09-2026; la lista con su cifra, en
> Versiones). Si el autor lo corrige en un depósito nuevo, la frase se quita.

## Para leer más

<!-- cortes.1931.leer.julia -->
[A] Santos Juliá, *La Constitución de 1931*. Madrid: Iustel, 2009 (Las Constituciones españolas, VIII).

<!-- cortes.1931.leer.casanova -->
[A] Julián Casanova, *República y guerra civil*. Barcelona: Crítica, 2007 (Historia de España, 8).

<!-- cortes.1931.leer.malefakis -->
[A] Edward Malefakis, *Reforma agraria y revolución campesina en la España del siglo XX*. Barcelona: Ariel, 1971.

<!-- cortes.1931.leer.mintz -->
[A] Jerome R. Mintz, *The Anarchists of Casas Viejas*. Chicago: University of Chicago Press, 1982.

<!-- cortes.1931.leer.townson -->
[A] Nigel Townson, *La República que no pudo ser. La política de centro en España (1931-1936)*. Madrid: Taurus, 2002.

<!-- cortes.1931.leer.gaceta -->
[I] *Gaceta de Madrid*, colección histórica del Boletín Oficial del Estado: los decretos y la Constitución citados arriba.

## Cómo citar

<!-- cortes.1931.citar.sesion -->
*Diario de Sesiones de las Cortes Constituyentes de la República Española*, núm. 88, 9 de diciembre de 1931, pp. 2895–2913. En Luz y Taquígrafos (V2), filas 13471 a 13554.

> [nota de diseño] Debajo, `cortes.ficha.citar.paginas` (el número de Diario y las páginas son del proyecto), ↺ 4, la
> cita del conjunto y [Copiar la cita]. Vecinas: sin anterior; siguiente, la ficha II; en el centro, Todas las etapas.


<!-- ═══ cortes_1933.md ═══ -->

# Copy ES · Ficha II · La legislatura elegida en 1933 (`/[lang]/cortes/1933/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_a**. Sigue la narrativa §8.2
> y la plantilla C del plan (tope: 1.200–1.500 palabras de copy para el lector). Rótulos comunes y textos de las
> figuras: `cortes.md`. Marcadores: `docs/marcadores/cortes_1933.md`.
>
> **Procedencia.** Como en la ficha I: cada hecho de la Cámara con su fila V2 y v3, leídas hoy letra a letra; cada
> hecho externo con [I] o [A], comprobado hoy (`02b_BIBLIOGRAFIA.md`, «Fichas I y II»).
>
> **Cambios respecto a la narrativa, y por qué:**
> 1. **«¡Tiros a la barriga!» no aparece «por primera vez» el 31-V-1934**: en la V2 solo esa fila trae la expresión, y
>    en la v3 la búsqueda da dos. Sin comprobar las ediciones anteriores del Diario, no se dice «por primera vez».
> 2. **El 20-III-1935 Azaña no «se defiende»** en sentido estricto: dice que no va a «defender tesis ninguna» y se
>    presenta como «un presunto acusado y culpable» (V2 85330). Se cuenta con su propia fórmula.
> 3. **El 9-X-1934 se ancla en el Diario**: la proposición de Gil Robles para suspender las sesiones «hasta completar la
>    pacificación y el imperio de la Ley, interrumpida por la huelga revolucionaria» (V2 74669) y la mención de
>    «nuestros compañeros Diputados por Asturias» (V2 74673). La revolución de octubre, como hecho, va solo en «Para
>    leer más» [A].
> 4. **Se quita la intervención de «Ventosa» del 9-X-1934** (V2 74696): la base la vincula a Juan Ventosa Roig (ERC),
>    pero habla en nombre de una minoría que apoya la proposición del Gobierno; parece Juan Ventosa Calvell (Lliga). Es
>    una errata de datos para el autor (D-25), anotada en `peticiones/cortes_a.md`.
> 5. **La declaración ministerial de Lerroux del 19-XII-1933** va, en las dos ediciones, dentro de una fila de la
>    Presidencia (V2 61596 · v3 69228). Se dice en «Antes de usarla».
> 6. **«Luz y taquígrafos.»** se cita como la imprime la fila: «Luz y taquigrafos.», sin tilde (V2 71330 · v3 80306).
>    El Diario la pone en boca de «JIMÉNEZ FERNÁNDEZ»; la tabla de grafías da Manuel Giménez Fernández (D-22: adoptada).

<!-- cortes.1933.meta.titulo --> La legislatura elegida en 1933
<!-- cortes.1933.meta.descripcion --> Qué cambió en el Congreso cuando cambió la mayoría, de diciembre de 1933 a diciembre de 1935: el Diario fila a fila, sus oradores y cómo citarlo.

<!-- cortes.1933.miga --> Las Cortes / II
<!-- cortes.1933.titulo --> La legislatura elegida en 1933

<!-- cortes.1933.antetitulo -->
8-XII-1933 → 10-XII-1935 · 276 sesiones · Diario de las Sesiones de Cortes. Congreso de los Diputados

<!-- cortes.1933.entrada -->
¿Qué cambió en la Cámara cuando cambió la mayoría?

<!-- cortes.1933.tension -->
Otra Cámara, otros oradores y un año, 1934, que se oye en el propio Diario. El cambio se mide en quién toma la palabra, y se lee en filas concretas.

<!-- ↺ comun.fija.legislatura -->
El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.

## Hoy puede

<!-- cortes.1933.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1933-1935» y escriba su búsqueda.

<!-- cortes.1933.hoy.buscar.consulta --> amnistía

<!-- cortes.1933.hoy.buscar.recuento -->
Con esa faceta, «amnistía» da 351 intervenciones (v3), contando todas las filas. Recuento del 23 de septiembre de 2026.

<!-- cortes.1933.hoy.sesion -->
**Abrir una sesión.** Ponga el 4 de julio de 1934 en Desde y en Hasta, abra una intervención y pulse `s`.

<!-- cortes.1933.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, «Añadir bibliotecas del proyecto…» y elija «Amnistía de 1934»: 1.085 intervenciones (v3).

<!-- cortes.1933.hoy.tendencia -->
**Seguir una palabra en el tiempo.** Busque «Strauss», pulse `t` y elija el periodo «1933–35». En el Diario, el estraperlo se nombra más por ese apellido que por el aparato.

<!-- cortes.1933.hoy.tendencia.consulta --> strauss

<!-- cortes.1933.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Como en la ficha I: ↺ 5 y ↺ 4 bajo las tareas. «1933–35» es el rótulo del periodo en Tendencia
> (con raya), y «1933-1935» el de la faceta (con guion), tal como los escribe el explorador. La frase del estraperlo
> descansa en `busqueda.strauss.1935` y `busqueda.straperlo.1935`, que se dan en «Lo que pasó en la Cámara».

## Cifras

<!-- cortes.1933.cifras.sesiones -->
276 sesiones, numeradas de la 1 a la 276 sin que falte ningún número.

<!-- cortes.1933.cifras.palabras -->
9.476.120 palabras en la edición depositada: el 38,94 % del corpus.

<!-- cortes.1933.cifras.diputados -->
390 diputados intervienen, contando a quien preside.

## Lo que pasó en la Cámara

### La nueva Cámara (diciembre de 1933)

<!-- cortes.1933.contexto.1.titulo --> La nueva Cámara (diciembre de 1933)

<!-- cortes.1933.contexto.1.a -->
Las elecciones se celebraron el 19 de noviembre de 1933, con segunda vuelta el 3 de diciembre. Fueron las primeras elecciones generales con el artículo 36 de la Constitución, que igualaba el voto de mujeres y hombres.

<!-- cortes.1933.contexto.1.b -->
El 8 de diciembre abre la sesión un Presidente de edad, Honorio Riesgo (V2 61356 · v3 68945).

<!-- cortes.1933.contexto.1.c -->
Santiago Alba sale elegido Presidente interino con 234 votos de 248 (V2 61358 · v3 68949). El 28 de diciembre queda proclamado Presidente de la Cámara (V2 62053 · v3 69744).

<!-- cortes.1933.contexto.1.d -->
El 19 de diciembre, Alejandro Lerroux lee la declaración de su Gobierno. Le contesta primero José María Gil Robles, en nombre de «la fracción numéricamente más importante de la Cámara» (V2 61598 · v3 69230).

<!-- cortes.1933.contexto.1.e -->
Cambia quién habla. Sin la Presidencia, la derecha y la extrema derecha pasan del 6,1 % de las palabras en 1931-1933 al 30,0 % en esta legislatura (V2).

> [nota de diseño] «Derecha» y «extrema derecha» son las posiciones D y ED de la columna `ideology`, que es la del
> partido. `1.a`: la fecha de la segunda vuelta y la de reunión de las Cortes (8-XII) están en el decreto de
> convocatoria; «igualaba el voto de mujeres y hombres» resume el artículo 36 («Los ciudadanos de uno y de otro sexo,
> mayores de veintitrés años, tendrán los mismos derechos electorales»). «Primeras elecciones generales» se apoya en
> que entre la Constitución (9-XII-1931) y la disolución de 1933 no hubo otras, y en Villa García (2011).

<!-- cortes.1933.contexto.1.fuentes -->
[I] Decreto de 9 de octubre de 1933. *Gaceta de Madrid*, núm. 283, 10 de octubre de 1933, p. 252. · [I] *Constitución de la República Española*, artículo 36. *Gaceta de Madrid*, núm. 344, 10 de diciembre de 1931, p. 1581. · [A] Roberto Villa García, *La República en las urnas*. Madrid: Marcial Pons, 2011.

### De la amnistía al verano (1934)

<!-- cortes.1933.contexto.2.titulo --> De la amnistía al verano (1934)

<!-- cortes.1933.contexto.2.a -->
En abril, la Cámara debate la amnistía; el debate preparado del explorador reúne seis sesiones, del 11 al 19 de abril (v3).

<!-- cortes.1933.contexto.2.b -->
El 20 de abril, Indalecio Prieto pregunta: «¿Por qué es inicuo el acto que van a realizar las Cortes al aprobar este proyecto de ley?» (V2 68270 · v3 76798).

<!-- cortes.1933.contexto.2.c -->
Ese mismo día la amnistía sale por 265 votos contra 45, en votación nominal (V2 68299 · v3 76829).

<!-- cortes.1933.contexto.2.d -->
El 2 de mayo, Ricardo Samper habla ya como Presidente del Consejo de Ministros (V2 68466 · v3 77029).

<!-- cortes.1933.contexto.2.e -->
El 31 de mayo, en pleno turno de José Tomás y Piera, varios diputados gritan: «Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!» (V2 70714 · v3 79606).

<!-- cortes.1933.contexto.2.f -->
El 8 de junio, Alba recuerda que los suplicatorios «han de tratarse en sesión secreta» (V2 71329 · v3 80305). La fila siguiente dice solo: «Luz y taquigrafos.» (V2 71330 · v3 80306).

<!-- cortes.1933.contexto.2.g -->
El Diario lo pone a nombre de «JIMÉNEZ FERNÁNDEZ»; la base lo identifica con Manuel Giménez Fernández. La Presidencia dice no haber visto quién interrumpió (V2 71331 · v3 80307). La página El Diario reúne todas las veces que se oyó la fórmula en la Cámara.

<!-- cortes.1933.contexto.2.h -->
El 12 de junio, la minoría de la Esquerra lee su posición y se retira de la Cámara (V2 71609 · v3 80615). Samper pregunta: «¿por qué se retiran los Sres. Diputados de la Esquerra catalana?» (V2 71611 · v3 80617).

<!-- cortes.1933.contexto.2.i -->
Tras el turno de José Antonio Aguirre, el Diario anota: «La minoría vasca se retira del salón» (V2 71613 · v3 80619).

<!-- cortes.1933.contexto.2.j -->
El 4 de julio llega la sesión de la pistola de Prieto. Después, la Cámara no vuelve a reunirse hasta el 1 de octubre.

> [nota de diseño] `2.e` conserva el texto tal como lo imprime la fila, sin los signos de apertura. `2.f`: la cita sin
> tilde es la de la fila; el Diario imprime «JIMÉNEZ FERNÁNDEZ» y la tabla de grafías da «Giménez Fernández»
> (D-22: adoptada). `2.g` enlaza con `/es/diario/` (F27). `2.j` enlaza con la puerta `pistola-1934/`. `2.i`: la acotación cierra la fila de Aguirre;
> Ventosa habla después de «el gesto de retirada de la minoría vasca» (V2 71615).

### Octubre de 1934

<!-- cortes.1933.contexto.3.titulo --> Octubre de 1934

<!-- cortes.1933.contexto.3.a -->
El 1 de octubre habla Samper: «dijerase que acaba de transcurrir la noche del 4 de Julio en que el Parlamento acordó suspender sus tareas» (V2 74646 · v3 84075).

<!-- cortes.1933.contexto.3.b -->
Gil Robles pide «una rectificación»: Samper, dice, «ha puesto de relieve que no es posible seguir por ese camino» (V2 74648 · v3 84079).

<!-- cortes.1933.contexto.3.c -->
La sesión siguiente, el 9 de octubre, ya es del Gobierno Lerroux IV, según los metadatos del proyecto.

<!-- cortes.1933.contexto.3.d -->
Esa tarde, una proposición de Gil Robles pide suspender las sesiones «hasta completar la pacificación y el imperio de la Ley, interrumpida por la huelga revolucionaria» (V2 74669 · v3 84109).

<!-- cortes.1933.contexto.3.e -->
Gil Robles evoca a «nuestros compañeros Diputados por Asturias» (V2 74673 · v3 84113). La Cámara aprueba la proposición por aclamación.

<!-- cortes.1933.contexto.3.f -->
Al final, Lerroux da vivas a España y a la República. El Diario anota que «son contestados con unánimes aplausos y aclamaciones» (V2 74703 · v3 84145).

<!-- cortes.1933.contexto.3.g -->
En noviembre, la Cámara vuelve sobre los sucesos de octubre y debate la reforma de su Reglamento. Los dos debates están preparados en el explorador.

> [nota de diseño] `3.a` cita la fila tal cual («dijerase», sin tilde; «4 de Julio», con mayúscula). «La Cámara aprueba
> la proposición por aclamación»: «quedó igualmente aprobada esta proposición, por aclamación» (V2 74701). Lo que otras fuentes cuentan de esta sesión y
> el Diario no recoge va en El Diario, con su referencia.

### 1935

<!-- cortes.1933.contexto.4.titulo --> 1935: acusaciones y escándalos

<!-- cortes.1933.contexto.4.a -->
El 20 de marzo, ante la propuesta de acusarle, habla Azaña. Se presenta como «un presunto acusado y culpable» (V2 85330 · v3 96282).

<!-- cortes.1933.contexto.4.b -->
En las dos ediciones, ese discurso es una sola fila de 14.131 palabras.

<!-- cortes.1933.contexto.4.c -->
En abril de 1935 no hay sesión. En agosto, tampoco.

<!-- cortes.1933.contexto.4.d -->
El 28 de octubre, la comisión que investigó la denuncia de Strauss da cuenta a la Cámara (V2 97387 · v3 110040).

<!-- cortes.1933.contexto.4.e -->
Todo gira en torno a un «aparato de juego de salón que ha motivado todo este asunto», llamado «Straperlo».

<!-- cortes.1933.contexto.4.f -->
Ese día responde Rafael Salazar Alonso: «vengo apesadumbrado por una grave acusación» (V2 97391 · v3 110044).

<!-- cortes.1933.contexto.4.g -->
De octubre a diciembre de 1935, «Strauss» sale en 32 intervenciones y «straperlo», en 11 (v3).

<!-- cortes.1933.contexto.4.h -->
El 7 de diciembre se discute el dictamen sobre la denuncia de Nombela (V2 101450 · v3 114599). La sesión suma 89.870 palabras; solo la del 1 de julio de 1936 imprime más.

<!-- cortes.1933.contexto.4.i -->
El 10 de diciembre se lee la crisis del Gobierno Chapaprieta, y Alba suspende «las sesiones hasta nuevo aviso» (V2 101697 · v3 114872).

<!-- cortes.1933.contexto.4.j -->
No volvieron a reunirse. El 7 de enero de 1936, un decreto disolvió «las primeras Cortes ordinarias de la República» y convocó elecciones para el 16 de febrero.

> [nota de diseño] `4.c` no rotula la causa de los meses sin sesión (regla del calendario). `4.e`: la fila escribe
> «denominado "Straperlo"»; se cita la primera parte literal y el nombre del aparato va entre comillas. `4.g` usa
> la búsqueda de palabra del explorador, sin tildes ni mayúsculas, del 1-X al 31-XII-1935; las dos cifras son de la
> v3. `4.h`: «solo la del 1 de julio de 1936 imprime más» está comprobado sobre la V2 (97.055 palabras) y vale mientras
> la sesión del 1-VII-1936 sea la primera del corpus por palabras; si cambia, se sustituye por el marcador de rango.
> Los debates preparados de `3.g` y `4.d`–`4.h` son «Las Cortes ante la revolución de octubre», «Reforma del
> Reglamento (1934)» y «Estraperlo y Nombela».

<!-- cortes.1933.contexto.4.fuentes -->
[I] Decreto de 7 de enero de 1936. *Gaceta de Madrid*, núm. 8, 8 de enero de 1936, pp. 203–204.

## Cuándo se reunió

<!-- cortes.1933.calendario.entrada -->
La legislatura dejó cuatro meses sin sesión: agosto y septiembre de 1934, abril y agosto de 1935. El calendario los dibuja en contorno, sin causa.

<!-- cortes.1933.calendario.presidente -->
Santiago Alba es el presidente titular de 274 de sus 276 sesiones, según los metadatos del proyecto.

<!-- cortes.1933.calendario.presidente_otros -->
Cándido Casanueva y Manuel Giménez Fernández lo son de una sesión cada uno.

<!-- cortes.1933.calendario.vice -->
Un vicepresidente ocupó la Presidencia algún tramo en 218 sesiones de la etapa (V2).

<!-- cortes.1933.calendario.gobiernos -->
La banda de Gobiernos cuenta ocho: Martínez Barrio, Lerroux II, III, IV y VI, Samper, y Chapaprieta I y II.

> [nota de diseño] `presidente_otros` vale porque `etapa.II.pres.casanueva` y `etapa.II.pres.gimenez_fernandez` son
> iguales (1); el exportador lo comprueba. Lerroux V no aparece porque no tuvo ninguna sesión en el corpus; no se dice
> por qué.

## Quién tomó la palabra

<!-- cortes.1933.palabra.f05 -->
Sin contar la Presidencia, Augusto Barcia encabeza la palabra de la etapa: 233.136 palabras de habla (v3).

<!-- cortes.1933.palabra.f05_siguen -->
Le siguen Indalecio Prieto, José Calvo Sotelo, Joaquín Chapaprieta y Manuel Giménez Fernández.

<!-- cortes.1933.palabra.f09 -->
Por familias, los conservadores pasan a ser la primera en palabras sin Presidencia: el 27,7 % (V2).

## Puertas de esta etapa

<!-- cortes.1933.puertas.pistola --> 4-VII-1934 · La pistola de Prieto

> [nota de diseño] La puerta del 20-III-1935 («acusacion-1935») es de la edición 0.2 y no se pinta hasta que exista.

## Debates preparados en el explorador

<!-- cortes.1933.debates.entrada -->
El explorador trae 7 debates preparados de esta etapa (v3):

<!-- cortes.1933.debates.lista -->
- Las Cortes de 1933 se estrenan
- Amnistía de 1934
- Contratos de cultivo y retirada de ERC y PNV
- Las Cortes ante la revolución de octubre
- Reforma del Reglamento (1934)
- Acusación contra Azaña y Casares
- Estraperlo y Nombela

## Antes de usarla

<!-- cortes.1933.antes.sesion77 -->
La sesión 77 cambió de fecha y de legislatura en la V2. La V1 la ponía el 1 de junio de 1933, en las Constituyentes; es del 4 de mayo de 1934. Son 91 filas.

<!-- cortes.1933.antes.dobles -->
Hay tres fechas con dos sesiones: el 19 de diciembre de 1934 y el 8 de octubre y el 13 de noviembre de 1935.

<!-- cortes.1933.antes.declaracion -->
La declaración ministerial de Lerroux del 19 de diciembre de 1933 va, en las dos ediciones, dentro de una fila de la Presidencia (V2 61596 · v3 69228).

<!-- cortes.1933.antes.afinidades -->
Si une esta etapa con el censo de Afinidades Elegidas, recodifique la legislatura: allí se llama 1933-1936.

> [nota de diseño] `antes.sesion77` enlaza con Versiones (F25). La recodificación de `antes.afinidades` está en el
> fragmento de unión de Datos (D-6). ↺ 10 va arriba, bajo la entrada, como pide la narrativa.

## Para leer más

<!-- cortes.1933.leer.villa -->
[A] Roberto Villa García, *La República en las urnas. El despertar de la democracia en España*. Madrid: Marcial Pons, 2011.

<!-- cortes.1933.leer.townson -->
[A] Nigel Townson, *La República que no pudo ser. La política de centro en España (1931-1936)*. Madrid: Taurus, 2002.

<!-- cortes.1933.leer.ruiz -->
[A] David Ruiz, *Octubre de 1934. Revolución en la República española*. Madrid: Síntesis, 2008.

<!-- cortes.1933.leer.casanova -->
[A] Julián Casanova, *República y guerra civil*. Barcelona: Crítica, 2007 (Historia de España, 8).

<!-- cortes.1933.leer.gaceta -->
[I] *Gaceta de Madrid*, colección histórica del Boletín Oficial del Estado: los decretos de convocatoria y de disolución citados arriba.

## Cómo citar

<!-- cortes.1933.citar.sesion -->
*Diario de las Sesiones de Cortes. Congreso de los Diputados*, núm. 72, 20 de abril de 1934, pp. 2435–2473. En Luz y Taquígrafos (V2), filas 68253 a 68346.

> [nota de diseño] Debajo, `cortes.ficha.citar.paginas`, ↺ 4, la cita del conjunto y [Copiar la cita]. Vecinas:
> anterior, la ficha I; siguiente, la ficha III; en el centro, Todas las etapas.


<!-- ═══ cortes_1936.md ═══ -->

# Copy ES · Ficha III · Las Cortes de 1936, hasta la guerra (`/[lang]/cortes/1936/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_b** (fichas III, IV y V).
> Sigue la narrativa §8.3 y la plantilla C del plan (tope: 1.000–1.200 palabras de copy para el lector). Reutiliza sin
> redefinirlas las claves comunes de la ficha y los textos de las figuras de `cortes.md` (`cortes.ficha.*`, `fig.*`) y
> sigue las mismas convenciones de clave que las fichas I y II (`hoy.*`, `contexto.N.*`, `calendario.*`, `palabra.*`,
> `puertas.*`, `debates.*`, `antes.*`, `leer.*`, `citar.sesion`). Marcadores y anclas: `docs/marcadores/cortes_1936.md`.
> Referencias: `docs/02b_BIBLIOGRAFIA.md`, «Fichas III, IV y V». Grafías: `docs/peticiones/grafias_cortes_b.md`.
>
> **Procedencia.** Cada hecho de la Cámara está anclado en su fila, con el id V2 y el id v3 en mono. **Toda cita se leyó
> hoy letra a letra en las dos filas** (85 anclas de las tres fichas, 0 fallos): la tabla de anclas de
> `docs/marcadores/cortes_1936.md` trae el fragmento exacto que debe encontrar el aserto de citas de la compilación, y
> `docs/marcadores/comprobar_cortes_b.py` lo repite. «Solo en la v3» marca las filas que la V2 no tiene: sumarios,
> cabeceras y actas leídas.
>
> **Cambios respecto a la narrativa (§8.3), medidos hoy:**
> 1. **El «viva» negado tiene sitio y presidente.** Está en el acta de la junta preparatoria del 15 de marzo, leída el 17
>    (v3 114890, fila del sumario, solo en la v3): preside Ramón de Carranza, el diputado de más edad. Se usa.
> 2. **El artículo 81 no es externo:** el Diario lo lee el 3 de abril (V2 102249). **Tampoco la fecha de las
>    elecciones:** el decreto de convocatoria se lee el 17 de marzo (v3 114890). Se recortan dos [EXT].
> 3. **La destitución se votó dos veces con nombre y apellido:** el 3 de abril (181 contra 88, V2 102287) y el 7 (238
>    contra 5). En esta etapa, 81 filas de la V2 traen una lista «Señores que dijeron sí/no», en 32 de las 60 sesiones,
>    con la definición común que propone cortes_a (`etapa.<n>.listas_nominales.*`).
> 4. **«En la V2, las listas de votación van dentro de filas de la Presidencia»** solo vale para 27 de esas 81 filas;
>    las demás van pegadas a la fila de quien habló antes. El copy lo dice así.
> 5. **La controversia sobre las actas** va con sus dos posiciones, en la página exacta (Álvarez Tardío y Villa García,
>    2017; González Calleja y Sánchez Pérez, 2018).
> 6. **Jiménez de Asúa en la banda de presidentes** se explica con el propio Diario: el 7 de abril el Presidente de las
>    Cortes «pasa a ser Presidente de la República» (V2 102368), y del 15 de abril al 8 de mayo la cabecera del Diario
>    pone la Presidencia a nombre de Jiménez de Asúa (sumarios, solo en la v3).
>
> **Palabras para el lector:** unas 1.140, sin títulos, ids ni bibliografía. Ninguna frase pasa de 30 palabras.

---

## Cabecera

<!-- cortes.1936.meta.titulo --> Las Cortes de 1936, hasta la guerra
<!-- cortes.1936.meta.descripcion --> De marzo a julio de 1936: la apertura, las actas, la destitución de Alcalá-Zamora y lo que el Diario mandó borrar, fila a fila.
<!-- cortes.1936.miga --> Las Cortes / III
<!-- cortes.1936.titulo --> Las Cortes de 1936, hasta la guerra

<!-- cortes.1936.antetitulo -->
16-III → 10-VII-1936 · 60 sesiones · Diario de las Sesiones de Cortes. Congreso de los Diputados

> [nota de diseño] La serie lleva detrás `cortes.ficha.antetitulo.proyecto` («metadatos del proyecto»). Numeral «III»
> en contorno como marca de agua.

<!-- cortes.1936.entrada -->
¿Qué se dijo en la Cámara de 1936 antes de la guerra?

<!-- cortes.1936.tension -->
Es la etapa que más se cita, y la que más se ha contado con frases que no están en el Diario. Aquí va lo que el Diario sí recoge, incluidas las órdenes de borrar.

## Hoy puede

<!-- cortes.1936.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1936-1939» y ponga Desde 16/03/1936 y Hasta 10/07/1936: la Legislatura sola traería también la guerra y México.

<!-- cortes.1936.hoy.buscar.consulta --> "orden público"

<!-- cortes.1936.hoy.buscar.recuento -->
Con esos filtros, «orden público» da 160 intervenciones (v3), contando todas las filas. Salen en 44 de las 60 sesiones.

<!-- cortes.1936.hoy.sesion -->
**Abrir una sesión.** Ponga el 1 de julio de 1936 en Desde y en Hasta, abra una intervención y pulse `s`: tendrá la sesión corrida.

<!-- cortes.1936.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, pulse «Añadir bibliotecas del proyecto…» y elija «Orden público en la primavera de 1936».

<!-- cortes.1936.hoy.tendencia -->
**Seguir una palabra en el tiempo.** Busque «orden público» (la consulta de la primera tarea), pulse `t` para abrir Tendencia y elija el periodo «1936–45». Lea solo hasta julio de 1936: después vienen los extractos de la guerra.

<!-- cortes.1936.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Debajo de las tareas, ↺ 5 (`comun.fija.enlace`) y ↺ 4 (`comun.fija.ids`), una vez cada una, como en
> las fichas I y II. El recuento es de hoy (22-09-2026) y reproduce el método del explorador (FTS5 sobre su
> `corpus.sqlite`; comprobado con «España ha dejado de ser católica» = 6, «voto femenino | voto de la mujer» = 40,
> «divorcio» = 531). En el explorador el debate se llama «Debate · Orden público en la primavera de 1936»; el prefijo
> «Debate ·» es el del diálogo y se omite, como en la ficha I.

## Cifras

<!-- cortes.1936.cifras.sesiones -->
60 sesiones, del 16 de marzo al 10 de julio de 1936, sin que falte ningún número de la serie.

<!-- cortes.1936.cifras.palabras -->
1.690.319 palabras en la edición depositada: el 6,95 % del corpus.

<!-- cortes.1936.cifras.diputados -->
243 diputados toman la palabra, contando a quien preside.

## Lo que pasó en la Cámara

> [nota de diseño] Seis apartados H3 que llenan el índice lateral. Los ids van en mono, en la forma «V2 … · v3 …»,
> detrás de la frase que anclan; las fuentes [A] del apartado 2 van al pie, con `cortes.ficha.contexto.externas`.

### La apertura (15 a 17 de marzo)

<!-- cortes.1936.contexto.1.titulo --> La apertura (15 a 17 de marzo)

<!-- cortes.1936.contexto.1.a -->
El decreto de convocatoria, leído el 17 de marzo, fijó las elecciones el 16 de febrero y la reunión de las Cortes el 16 de marzo. Está solo en la v3 (v3 114890).

<!-- cortes.1936.contexto.1.b -->
La víspera de la apertura, en la junta preparatoria, preside Ramón de Carranza, el diputado de más edad. El acta cuenta que Fernández-Osorio y Tafall «solicitó de la Presidencia un viva a la República, negándose el Sr. Presidente» (v3 114890, solo en la v3).

<!-- cortes.1936.contexto.1.c -->
El 16 de marzo, Martínez Barrio sale elegido Presidente interino del Congreso con 386 votos (V2 101701 · v3 114881). Cierra la sesión con «¡Viva la República! ¡Viva España!» (V2 101705 · v3 114888).

### Las actas (marzo y abril)

<!-- cortes.1936.contexto.2.titulo --> Las actas (marzo y abril)

<!-- cortes.1936.contexto.2.a -->
Hasta el 3 de abril, la Cámara examina las actas de su propia elección (V2 102250 · v3 115551). El 31 de marzo se discute el dictamen que propone anular las de Granada.

<!-- cortes.1936.contexto.2.b -->
Giménez Fernández anuncia que su minoría se retira: «dejamos en vuestras manos, señores de la mayoría, la suerte del sistema parlamentario» (V2 101915 · v3 115160).

<!-- cortes.1936.contexto.2.c -->
Goicoechea y Lamamié de Clairac se retiran con las suyas (V2 101921 · v3 115167; V2 101931 · v3 115177).

<!-- cortes.1936.contexto.2.d -->
El explorador reúne este debate en «Comisión de Actas (Cuenca y Granada)», con 371 intervenciones (v3).

<!-- cortes.1936.contexto.2.e -->
Cómo juzgar esa revisión sigue en discusión. Álvarez Tardío y Villa García sostienen que la nueva mayoría la usó para quitar escaños a la oposición, aunque escriben que no fabricó esa mayoría [A]. González Calleja y Sánchez Pérez discuten su tesis del fraude [A]. Este sitio no toma partido.

<!-- cortes.1936.contexto.2.fuentes -->
[A] Manuel Álvarez Tardío y Roberto Villa García, *1936. Fraude y violencia en las elecciones del Frente Popular*. Barcelona: Espasa, 2017. · [A] Eduardo González Calleja y Francisco Sánchez Pérez, «Revisando el revisionismo. A propósito del libro *1936. Fraude y violencia en las elecciones del Frente Popular*», *Historia Contemporánea*, 58, 2018, pp. 851–881.

> [nota de diseño] La tesis se resume como la lee la crítica (González Calleja y Sánchez Pérez, 2018: 853), y «no
> fabricó esa mayoría» parafrasea la cita de Álvarez Tardío y Villa García (2017: 496) que ellos reproducen (2018:
> 861). La cifra de la biblioteca es de la v3: la página ya lleva NotaBases por F05.

### La destitución (3 y 7 de abril)

<!-- cortes.1936.contexto.3.titulo --> La destitución (3 y 7 de abril)

<!-- cortes.1936.contexto.3.a -->
El 3 de abril, recién constituida la Cámara, el grupo socialista presenta una proposición que invoca el artículo 81 de la Constitución (V2 102247 · v3 115547).

<!-- cortes.1936.contexto.3.b -->
Se lee el artículo: en una segunda disolución, «el primer acto de las nuevas Cortes será examinar y resolver sobre la necesidad del decreto» (V2 102249 · v3 115549).

<!-- cortes.1936.contexto.3.c -->
La proposición sale en votación nominal, por 181 votos contra 88 (V2 102287 · v3 115595).

<!-- cortes.1936.contexto.3.d -->
El 7 de abril se vota que «no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936» (V2 102304 · v3 115618). Prieto defiende la proposición en 4.796 palabras (V2 102323 · v3 115638).

<!-- cortes.1936.contexto.3.e -->
«El Reglamento dispone que se haga nominalmente»: 238 votos contra 5 (V2 102358 · v3 115674).

<!-- cortes.1936.contexto.3.f -->
Esa noche, la Mesa no puede notificar el acuerdo en casa de Alcalá-Zamora: le responden que «se hallaba descansando» (V2 102365 · v3 115686).

<!-- cortes.1936.contexto.3.g -->
De vuelta en la Cámara se lee el artículo 74, y el Presidente de las Cortes «pasa a ser Presidente de la República» (V2 102368 · v3 115690).

> [nota de diseño] `voto.238-5.*` son las claves de F26 (dueño: sesiones); aquí solo se consumen. El 238–5 enlaza con su
> línea de F26 en Sesiones y votaciones; la puerta 0.2 `destitucion-1936` queda oculta mientras no exista.

### Presidencias y Gobiernos (abril y mayo)

<!-- cortes.1936.contexto.4.titulo --> Presidencias y Gobiernos (abril y mayo)

<!-- cortes.1936.contexto.4.a -->
Mientras Martínez Barrio ejerce la Presidencia de la República, la cabecera del Diario pone la de la Cámara a nombre de Jiménez de Asúa, vicepresidente.

<!-- cortes.1936.contexto.4.b -->
El 8 de mayo se acuerda una sesión solemne «para que el Presidente electo preste la promesa» (V2 103342 · v3 116810). Se celebra el 11 de mayo, y su acta se lee al día siguiente (v3 116860, solo en la v3).

<!-- cortes.1936.contexto.4.c -->
Ese 12 de mayo, Martínez Barrio vuelve a presidir la Cámara. Llega la crisis del Gobierno de Barcia: «Encontrándose el Gobierno en crisis se suspenden las sesiones de Cortes» (V2 103383 · v3 116863).

> [nota de diseño] «La cabecera del Diario» es la del sumario de las sesiones 17 a 27 (15 de abril a 8 de mayo), que
> solo está en la v3. Quién ganó la elección presidencial del 10 de mayo no se dice: no está en ninguna fila de esta
> etapa y no hace falta para leer la banda de presidentes.

### Lo que el Diario borra (abril a julio)

<!-- cortes.1936.contexto.5.titulo --> Lo que el Diario borra (abril a julio)

<!-- cortes.1936.contexto.5.a -->
El 15 de abril, Calvo Sotelo protesta: «Se acaba de hacer una incitación al asesinato». La Presidencia contesta: «Esas palabras no constarán en el Diario de Sesiones» (V2 102483–102484 · v3 115827–115828).

<!-- cortes.1936.contexto.5.b -->
La orden se repite el 6 de mayo y el 1 de julio (V2 103251 · v3 116698; V2 106290 · v3 120222).

<!-- cortes.1936.contexto.5.c -->
Otras veces es el taquígrafo quien anota palabras que «no se consignan por orden» de la Presidencia (V2 103182 · v3 116626; V2 105324 · v3 119098; V2 106289 · v3 120221).

<!-- cortes.1936.contexto.5.d -->
El 3 de junio es Calvo Sotelo quien pide que no consten unas palabras sobre las Hermanas de la Caridad (V2 104406 · v3 118058). [Ver qué recoge el Diario]

> [nota de diseño] [Ver qué recoge el Diario] (`comun.boton.ver_diario`) lleva a El Diario, donde F28 recorre todas las
> órdenes del corpus. Aquí no se cuentan: el recuento es de F28 y lo fija su dueño (discrepancia 21 del plan). El 15 de
> abril hay tres filas de la Presidencia con la fórmula (V2 102484, 102486, 102492); se cita la primera.

### La antesala y la última sesión (junio y julio)

<!-- cortes.1936.contexto.6.titulo --> La antesala y la última sesión (junio y julio)

<!-- cortes.1936.contexto.6.a -->
El 16 de junio y el 1 de julio, la Cámara debate el orden público. Ambas sesiones tienen su puerta de lectura.

<!-- cortes.1936.contexto.6.b -->
La del 1 de julio es la más larga del corpus: 97.055 palabras en la edición depositada.

<!-- cortes.1936.contexto.6.c -->
La del 10 de julio termina con el «Orden del día para el martes» (V2 107065 · v3 121108). La sesión siguiente del corpus es la del 1 de octubre, cuando Martínez Barrio condena «ese movimiento sedicioso» (V2 107066 · v3 121111).

> [nota de diseño] Debajo, `cortes.ficha.contexto.puerta` → `antesala-1936`. El asesinato de Calvo Sotelo y la
> sublevación no se cuentan aquí: el Diario de esta etapa no los recoge. La frase «Este hombre ha hablado por última
> vez» no está en ninguna fila (lo dice la puerta).

## Cuándo se reunió

<!-- cortes.1936.calendario.entrada -->
La Cámara de 1936 se reunió los cinco meses que tuvo antes de la guerra, de marzo a julio, sin un mes vacío.

<!-- cortes.1936.calendario.presidente -->
Bajo el calendario van dos bandas de los metadatos del proyecto. Diego Martínez Barrio es el presidente titular de 49 sesiones.

<!-- cortes.1936.calendario.presidente_otros -->
Luis Jiménez de Asúa, vicepresidente, lo es de las otras 11, del 15 de abril al 8 de mayo. El 7 de abril, el Presidente de las Cortes había pasado a ser Presidente de la República.

<!-- cortes.1936.calendario.vice -->
Además, un vicepresidente ocupó la Presidencia algún tramo en 44 sesiones de la etapa (V2).

<!-- cortes.1936.calendario.gobiernos -->
La banda de Gobiernos pasa de Azaña a Barcia, interino, y de este a Casares Quiroga.

## Quién tomó la palabra

<!-- cortes.1936.palabra.f05 -->
Sin contar la Presidencia, José Calvo Sotelo encabeza la palabra de la etapa: 67.874 palabras de habla (v3).

<!-- cortes.1936.palabra.f05_siguen -->
Le siguen Manuel Giménez Fernández, Juan Bautista Guerra García, Antonio Bermúdez Cañete y Juan Ventosa Calvell. Los cinco son de partidos que la base codifica en la extrema derecha (RE), la derecha (CEDA) o la centro-derecha (Lliga).

<!-- cortes.1936.palabra.f09 -->
Por familias, los republicanos se llevan el 28,4 % de las palabras sin Presidencia (V2), y los conservadores, el 26,1 %.

> [nota de diseño] F05 (v3) lleva NotaBases (↺ 13); F09 (V2), no. Los cinco nombres deben coincidir con los puestos 1
> a 5 de `oradores_etapa.json`: guardas `oradores.etapa.III.1…5.rep_id` en `docs/marcadores/cortes_1936.md`. La
> ideología es la del partido: lo dice `fig.F09.salvedad`. Giménez Fernández lleva la grafía de la tabla (D-22: adoptada).

## Puertas de esta etapa

> [nota de diseño] La sección la pinta `RegistroPuertas` (`antesala-1936`); esta ficha no añade línea propia para no
> repetirla. Las puertas 0.2 `destitucion-1936` y `abril-1936` no se pintan hasta que existan.

## Debates preparados en el explorador

<!-- cortes.1936.debates.entrada -->
El explorador trae cuatro debates preparados de esta etapa (v3):

<!-- cortes.1936.debates.lista -->
- Las Cortes de 1936 se constituyen
- Comisión de Actas (Cuenca y Granada)
- Destitución de Alcalá-Zamora
- Orden público en la primavera de 1936

> [nota de diseño] Nombres del diálogo del explorador, sin el prefijo «Debate ·», en orden de fechas. Debajo,
> `cortes.ficha.debates.como` y `cortes.ficha.debates.salvedad`.

## Antes de usarla

<!-- cortes.1936.antes.listas -->
El voto no es una columna. En esta etapa, 81 filas de la V2 traen una lista de votación nominal, en 32 sesiones.

<!-- cortes.1936.antes.listas_donde -->
En la V2, cada lista va pegada a la fila de quien habló antes de votar: solo 27 de esas filas son de la Presidencia. En la v3, cada lista tiene su propia fila.

<!-- cortes.1936.antes.sumario -->
La junta preparatoria, el decreto de convocatoria y la cabecera de cada sesión solo están en la v3, dentro de la fila del sumario. El filtro «Solo lo que se habla» los oculta.

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] La lista cuenta las filas cuyo texto plegado (sin tildes ni mayúsculas) trae «señores que dijeron»
> o «señores que han dicho» seguido de «sí» o «no»: la definición común de `etapa.<n>.listas_nominales.*` (cortes_a). `antes.listas` enlaza con Sesiones y votaciones ([Ver las votaciones]).

## Para leer más

<!-- cortes.1936.leer.cabrera -->
[A] Mercedes Cabrera Calvo-Sotelo, «Las Cortes republicanas», *Ayer*, 20, 1995, pp. 13–47.

<!-- cortes.1936.leer.tusell -->
[A] Javier Tusell, *Las elecciones del Frente Popular en España*. Madrid: Cuadernos para el Diálogo, 1971, 2 vols.

<!-- cortes.1936.leer.alvarez_villa -->
[A] Manuel Álvarez Tardío y Roberto Villa García, *1936. Fraude y violencia en las elecciones del Frente Popular*. Barcelona: Espasa, 2017.

<!-- cortes.1936.leer.gonzalez_sanchez -->
[A] Eduardo González Calleja y Francisco Sánchez Pérez, «Revisando el revisionismo. A propósito del libro *1936. Fraude y violencia en las elecciones del Frente Popular*», *Historia Contemporánea*, 58, 2018, pp. 851–881.

> [nota de diseño] Encima, `cortes.ficha.leer.nota`. Números de volumen y de página: datos bibliográficos, en la lista
> blanca de `check-i18n` para las claves `*.leer.*` y `*.fuentes` (petición en `peticiones/cortes_b.md`).

## Cómo citar

<!-- cortes.1936.citar.sesion -->
*Diario de las Sesiones de Cortes. Congreso de los Diputados*, núm. 15, 7 de abril de 1936, pp. 237–272. En Luz y Taquígrafos (V2), filas 102289 a 102374.

> [nota de diseño] Mismo formato que `cortes.1933.citar.sesion`. Debajo, `cortes.ficha.citar.paginas`, ↺ 4, la cita
> del conjunto y [Copiar la cita]. Vecinas: anterior, la ficha II; siguiente, la ficha IV; en el centro, Todas las
> etapas.


<!-- ═══ cortes_fichas.md ═══ -->

# Copy ES · Fichas de etapa: piezas propias de la plantilla y de F05 y F09 (grupo 2 · fichas)

> **Estado (23-09-2026).** Dueño: grupo 2 (fichas de etapa, F05 y F09). Solo trae lo que la plantilla de ficha y las
> dos figuras necesitan y no estaba en `cortes.md` (dueño: grupo 1), que se reutiliza sin redefinir: `cortes.ficha.*`,
> `fig.F05.*`, `fig.F09.*`. Marcadores: `docs/marcadores/cortes_fichas.md`. Ninguna cifra va tecleada.
>
> Plan § Qué no se afirma: las figuras de oradores dicen su base y que no miden importancia (plan, «Orden fijo, nunca
> por valor, en Inicio»; narrativa § Reglas). Esa frase va en la leyenda de F05, a la vista, antes de las barras.

## Plantilla de ficha

<!-- cortes.ficha.nota.fila --> Fila

> [nota de diseño] Rótulo de accesibilidad de la llamada volada que lleva cada párrafo con ids a su nota al margen
> («Fila 3»). El número es el orden de la llamada en la página, no una cifra.

<!-- cortes.ficha.cifras.base -->
Las tres cifras son de la edición depositada, la que se descarga.

<!-- cortes.ficha.sesiones.entrada -->
Cada línea es una sesión: su fecha, dónde se reunió la Cámara si el texto lo dice, y qué pasó.

<!-- cortes.ficha.sesiones.filas --> filas V2

## F05 · Quién tomó la palabra

<!-- fig.F05.leyenda -->
Cada barra, las palabras de habla de un diputado en la edición del explorador. Cuenta palabras: no es una medida de importancia.

<!-- fig.F05.anotacion -->
Los diez primeros suman el ⟦oradores.etapa.<etapa>.diez.pct⟧ de las palabras de habla de la etapa, sin la Presidencia.

## F09 · Qué familias ocupan la palabra

<!-- fig.F09.orden -->
De izquierda a derecha, las familias van por su posición media, la misma en las cinco etapas. El color es esa posición.

<!-- fig.F09.color.izq --> extrema izquierda
<!-- fig.F09.color.der --> extrema derecha

<!-- fig.F09.otras --> Otras

<!-- fig.F09.otras.nota -->
«Otras» reúne las familias que no llegan al 1 % cada una; la tabla las da todas.

<!-- fig.F09.cinco.titulo --> Las cinco etapas, en el mismo orden

<!-- fig.F09.cinco.esta --> esta etapa

## Índice de la ficha

<!-- cortes.ficha.palabra.indice.f05 --> Los diez que más hablaron
<!-- cortes.ficha.palabra.indice.f09 --> Las familias políticas

> [nota de diseño] Subapartados de «Quién tomó la palabra» en el índice lateral: el título de las figuras repetía el del
> apartado («Quién tomó la palabra» dos veces).


<!-- ═══ cortes_guerra.md ═══ -->

# Copy ES · Ficha IV · Las Cortes en guerra, 1936–1939 (`/[lang]/cortes/guerra/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_b** (fichas III, IV y V).
> Sigue la narrativa §8.4 y la plantilla C del plan (tope: 600–800 palabras). Reutiliza sin redefinirlas las claves
> comunes de `cortes.md` (`cortes.ficha.*`, `fig.*`) y las convenciones de clave de las fichas I y II. Marcadores y
> anclas: `docs/marcadores/cortes_guerra.md`. Referencias: `docs/02b_BIBLIOGRAFIA.md`, «Fichas III, IV y V».
>
> **Procedencia.** Como la ficha III. Las 276 filas V2 y las 356 filas v3 de las nueve sesiones se leyeron hoy una a una
> (fórmula del orador, comienzo y final de cada fila; sumarios, comentarios y notas del volumen, completos).
>
> **Cambios respecto a la narrativa (§8.4), medidos hoy:**
> 1. **El texto nombra los lugares.** Madrid («Palacio del Congreso», V2 107093; «nos reunimos en Madrid», V2 107114),
>    Valencia («Palacio del Ayuntamiento de Valencia», V2 107116; «la histórica Lonja», V2 107148), Sant Cugat
>    («monasterio de San Cugat del Vallés», V2 107303), Sabadell (fecha de una proposición, V2 107319) y Figueres
>    («Castillo de Figueras», V2 107337, en la propia sesión) y Montserrat: el 1-II-1938 dos proposiciones van fechadas
>    en «Monserrat, 1 de Febrero de 1938», así, sin t (V2 107248 y 107251 · v3 121345 y 121350), y Lamoneda dice
>    «aquí, en Monserrat» (V2 107245). Irujo recuerda después «las Cortes de Montserrat» (V2 107276). Se recortan los
>    [EXT] de lugar. **Fase 2 (corrector del copy):** la fase 1 decía que Montserrat solo aparecía «después, sin
>    fecha»; el anexo adversarial del plan (H1) lo corrige, y el corrector lo ha comprobado hoy en la V2 y la v3.
> 2. **La nota del volumen se contradice y el corpus lo resuelve.** La nota de apertura dice de Figueres «NO EXISTE DATO
>    ALGUNO» (v3 121110); otra, al final de la sesión 69, explica que después se obtuvo una fotocopia del extracto (V2
>    107341 · v3 121465). Se cierra el pendiente B9 de la narrativa sin mirar el PDF.
> 3. **«En la V2, sus discursos de 1937 y 1938 van a nombre de la Presidencia»** vale para dos de los tres: el del 1 de
>    octubre de 1937 (V2 107148, 6.378 palabras) y el del 1 de febrero de 1938 (V2 107232, 7.749). El del 30 de
>    septiembre de 1938 va bien atribuido (V2 107268). El copy lo dice así y F09 lleva la salvedad.
> 4. **La guerra también vota con nombre y apellido:** el 1 de octubre de 1937 (172 votos), el 1 de octubre de 1938 (168)
>    y el 1 de febrero de 1939. La definición común de `etapa.<n>.listas_nominales.*` da aquí 2 filas: no ve la
>    lista de Figueres («Señores Diputados que dijeron SI», V2 107340). Petición en `peticiones/cortes_b.md`.
>
> **Palabras para el lector:** unas 780, sin títulos, ids, bibliografía ni la tabla de sesiones. Ninguna frase pasa de
> 30 palabras.

---

## Cabecera

<!-- cortes.guerra.meta.titulo --> Las Cortes en guerra, 1936–1939
<!-- cortes.guerra.meta.descripcion --> Las sesiones de las Cortes durante la guerra, de Madrid a Figueres: dónde se reunieron, qué votaron y qué dice de ellas el propio extracto.
<!-- cortes.guerra.miga --> Las Cortes / IV
<!-- cortes.guerra.titulo --> Las Cortes en guerra

<!-- cortes.guerra.antetitulo -->
1-X-1936 → 1-II-1939 · 9 sesiones · Extracto oficial de las sesiones. Congreso de los Diputados

> [nota de diseño] La serie lleva detrás `cortes.ficha.antetitulo.proyecto`. Numeral «IV» en contorno.

<!-- cortes.guerra.entrada -->
¿Qué queda de unas Cortes que siguieron reuniéndose en guerra?

<!-- cortes.guerra.tension -->
Quedan extractos oficiales, no el Diario íntegro. Aquí están todas sus sesiones, una a una, y lo que falta.

## Hoy puede

<!-- cortes.guerra.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1936-1939» y ponga Desde 01/10/1936 y Hasta 01/02/1939.

<!-- cortes.guerra.hoy.buscar.consulta --> confianza

<!-- cortes.guerra.hoy.buscar.recuento -->
Con esos filtros, «confianza» da 55 intervenciones (v3), contando todas las filas. Sale en 9 de las 9 sesiones.

<!-- cortes.guerra.hoy.sesion -->
**Abrir una sesión.** Ponga el 30 de septiembre de 1938 en Desde y en Hasta, abra una intervención y pulse `s`: tendrá la sesión corrida.

<!-- cortes.guerra.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, pulse «Añadir bibliotecas del proyecto…» y elija «Las Cortes en guerra».

<!-- cortes.guerra.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Sin tarea de Tendencia (narrativa §8.4): con tan pocos meses con sesión, la serie mensual no se
> sostiene. Debajo, ↺ 5 y ↺ 4, una vez cada una.

## Cifras

<!-- cortes.guerra.cifras.sesiones -->
9 sesiones, de octubre de 1936 a febrero de 1939.

<!-- cortes.guerra.cifras.palabras -->
127.709 palabras en la edición depositada: el 0,52 % del corpus.

<!-- cortes.guerra.cifras.diputados -->
44 diputados toman la palabra, contando a quien preside.

## Lo que pasó en la Cámara

### Dónde se reunieron: lo dice el texto

<!-- cortes.guerra.contexto.1.titulo --> Dónde se reunieron: lo dice el texto

<!-- cortes.guerra.contexto.1.a -->
El volumen se abre con una nota: reúne los extractos de las sesiones «CON POSTERIORIDAD AL 18 DE JULIO» (v3 121110, solo en la v3). Los lugares no los da la nota: los nombra el propio texto.

<!-- cortes.guerra.contexto.1.b -->
El 1 de octubre de 1936, una proposición va fechada en el «Palacio del Congreso» (V2 107093 · v3 121143). En diciembre, Albornoz recordará que ese día «nos reunimos en Madrid» (V2 107114 · v3 121167).

<!-- cortes.guerra.contexto.1.c -->
El 1 de diciembre, Martínez Barrio da las gracias «al pueblo de Valencia» (V2 107095 · v3 121147). Una proposición de ese día se firma en el «Palacio del Ayuntamiento de Valencia» (V2 107116 · v3 121170).

<!-- cortes.guerra.contexto.1.d -->
En octubre de 1937, Negrín agradece al municipio de Valencia que les haya permitido «congregarnos en la histórica Lonja» (V2 107148 · v3 121219). El 1 de febrero de 1938, una proposición va fechada en «Monserrat», así escrito (V2 107248 · v3 121345).

<!-- cortes.guerra.contexto.1.e -->
El 30 de septiembre de 1938, Trabal habla «del antiguo monasterio de San Cugat del Vallés» (V2 107303 · v3 121412). Ese día, Irujo recuerda «las Cortes de Montserrat» (V2 107276 · v3 121384). Al día siguiente, la proposición que suspende las sesiones va fechada en «Sabadell» (V2 107319 · v3 121437).

<!-- cortes.guerra.contexto.1.f -->
La última proposición de la guerra se firma en el «Castillo de Figueras» (V2 107337 · v3 121459).

> [nota de diseño] Las citas conservan la grafía impresa: «San Cugat del Vallés», «Castillo de Figueras», «Monserrat»
> (el 1-II-1938) y «Montserrat» (Irujo); el texto del sitio dice Sant Cugat, Figueres y Montserrat. «Así escrito»
> avisa de que la falta de la t es del Diario (plan H1; narrativa: «Montserrat» con t, «el Diario escribe «Monserrat»,
> y así se cita»). La proposición de Sabadell trae la fecha «1.° de Octubre de 1939», errata del
> extracto por 1938: por eso se cita solo el lugar. No se dice «exilio» de Valencia ni de Sant Cugat.

### La confianza, sesión tras sesión

<!-- cortes.guerra.contexto.2.titulo --> La confianza, sesión tras sesión

<!-- cortes.guerra.contexto.2.a -->
El 1 de octubre de 1936, Martínez Barrio abre con la condena de «ese movimiento sedicioso» (V2 107066 · v3 121111). Largo Caballero presenta su Gobierno (V2 107068 · v3 121113).

<!-- cortes.guerra.contexto.2.b -->
La proposición de adhesión al Gobierno se aprueba «por aclamación» (V2 107088 · v3 121135). Ese mismo día se aprueba definitivamente el Estatuto del País Vasco (V2 107091 · v3 121140).

<!-- cortes.guerra.contexto.2.c -->
Algunas sesiones votan con nombre y apellido. El 1 de octubre de 1938, la convalidación de los decretos del Gobierno sale por 168 votos a favor y ninguno en contra (V2 107312 · v3 121427).

### La palabra vigilada (1937 y 1938)

<!-- cortes.guerra.contexto.3.titulo --> La palabra vigilada (1937 y 1938)

<!-- cortes.guerra.contexto.3.a -->
El 2 de octubre de 1937, Pestaña denuncia la falta de armas de algunas brigadas (V2 107193 · v3 121275). La Presidencia le advierte que «de ciertas cosas no se puede hablar en la Cámara» (V2 107196 · v3 121278).

<!-- cortes.guerra.contexto.3.b -->
Albornoz replica: «Pero si el Parlamento no es eso, no será nada» (V2 107197 · v3 121279).

<!-- cortes.guerra.contexto.3.c -->
Un año después, Negrín avisa: «El Gobierno no acepta, ni admite votos de confianza condicionados y con reservas» (V2 107288 · v3 121397).

### Figueres (1 de febrero de 1939)

<!-- cortes.guerra.contexto.4.titulo --> Figueres (1 de febrero de 1939)

<!-- cortes.guerra.contexto.4.a -->
Según el sumario, la sesión se abre «a las veintidos horas treinta minutos» (v3 121446, solo en la v3). Negrín empieza: «Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra» (V2 107326 · v3 121447).

<!-- cortes.guerra.contexto.4.b -->
La proposición final se vota nominalmente. El extracto cierra: «Han votado afirmativamente los sesenta y dos señores Diputados» (V2 107340–107341 · v3 121462–121464).

<!-- cortes.guerra.contexto.4.c -->
La nota que abre el volumen dice que de esta sesión «NO EXISTE DATO ALGUNO» (v3 121110, solo en la v3). Otra nota, al final, explica que después «se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión» (V2 107341 · v3 121465).

> [nota de diseño] «veintidos» va sin tilde, como en la fila. Debajo, `cortes.ficha.contexto.puerta` →
> `figueres-1939`. La misma nota inicial llama «liberación de Barcelona» a su caída: eso lo trata El Diario («La fuente
> habla de sí misma»), no esta ficha.

## Las sesiones, una a una

> [nota de diseño] Una línea por sesión, en registro de calendario (narrativa §8.4; plan, plantilla C, movimiento 6):
> cada línea abre con la fecha de la sesión (las fechas se escriben, como en las puertas) y dice qué contiene; filas y
> palabras (V2), si la plantilla las pinta, salen de `sesiones.json`. Rótulo de la sección:
> `cortes.guerra.sesiones.titulo`. Anclas comprobadas en el texto: 1-II-1937, «Vicepresidente tercero de la Cámara»
> (V2 107128); 1-X-1937, reforma del Reglamento tomada en consideración en votación nominal (V2 107162); 1-II-1938,
> pésame por Pestaña y Sentís (V2 107225); 30-IX-1938, «Queda proclamada Vicepresidente cuarto, dona Dolores Ibarruri»
> (V2 107257); 1-X-1938, suspensión «hasta nuevo aviso» (V2 107319). «Vicepresidenta» es la forma del sitio.

<!-- cortes.guerra.sesiones.titulo --> Las sesiones, una a una

<!-- cortes.guerra.sesiones.1936-10-01-61 --> 1-X-1936 · Madrid. Largo Caballero presenta su Gobierno; se aprueba el Estatuto del País Vasco.
<!-- cortes.guerra.sesiones.1936-12-01-62 --> 1-XII-1936 · Valencia. Martínez Barrio agradece la acogida de la ciudad; Largo Caballero vuelve ante la Cámara.
<!-- cortes.guerra.sesiones.1937-02-01-63 --> 1-II-1937 · Se eligen vicepresidente tercero y secretario cuarto; habla Largo Caballero.
<!-- cortes.guerra.sesiones.1937-10-01-64 --> 1-X-1937 · Valencia, en la Lonja. Negrín presenta su Gobierno; se toma en consideración una reforma del Reglamento.
<!-- cortes.guerra.sesiones.1937-10-02-65 --> 2-X-1937 · Pestaña y Albornoz chocan con la Presidencia; hablan Ibárruri, Corominas y Lasarte.
<!-- cortes.guerra.sesiones.1938-02-01-66 --> 1-II-1938 · La Cámara recuerda a Pestaña y Sentís, fallecidos; Negrín comparece ante ella.
<!-- cortes.guerra.sesiones.1938-09-30-67 --> 30-IX-1938 · Sant Cugat. Ibárruri sale elegida vicepresidenta cuarta; Negrín rechaza la confianza «con reservas».
<!-- cortes.guerra.sesiones.1938-10-01-68 --> 1-X-1938 · Presupuestos y convalidación de decretos; se suspenden las sesiones «hasta nuevo aviso».
<!-- cortes.guerra.sesiones.1939-02-01-69 --> 1-II-1939 · Figueres, en el castillo. Negrín; votación nominal final.

## Cuándo se reunió

<!-- cortes.guerra.calendario.entrada -->
De los 29 meses de la etapa, 8 tienen alguna sesión. Los demás llevan contorno; su causa no sale del corpus.

<!-- cortes.guerra.calendario.presidente -->
Bajo el calendario van dos bandas de los metadatos del proyecto. Diego Martínez Barrio es el presidente titular de las nueve.

<!-- cortes.guerra.calendario.gobiernos -->
La banda de Gobiernos va de Largo Caballero a Negrín.

> [nota de diseño] Bajo F01e van ↺ `comun.fija.tono`, `fig.F01.salvedad.causas` y `fig.F01.salvedad.extractos` (etapas
> IV y V). Sin `calendario.vice`: solo dos sesiones de la etapa tienen un tramo presidido por un vicepresidente
> (`etapa.IV.vice_ses`), y la banda ya lo muestra en la tabla.

## Quién tomó la palabra

<!-- cortes.guerra.palabra.f05 -->
Sin contar la Presidencia, Juan Negrín encabeza la palabra de la etapa: 31.794 palabras de habla (v3).

<!-- cortes.guerra.palabra.f05_v3 -->
Aquí la edición del explorador es imprescindible. En la V2, sus discursos del 1 de octubre de 1937 y del 1 de febrero de 1938 van dentro de filas de la Presidencia. Son las filas V2 107148 y 107232 (v3 121219 y 121328).

<!-- cortes.guerra.palabra.f09 -->
Por familias, los socialistas se llevan el 41,4 % de las palabras sin Presidencia (V2).

<!-- cortes.guerra.palabra.f09_salvedad -->
Esa cuenta deja fuera los dos discursos de Negrín que la V2 atribuye a la Presidencia. La Presidencia se queda aquí con el 26,1 % de las palabras.

> [nota de diseño] F05 (v3) lleva NotaBases (↺ 13). Guarda del nombre: `oradores.etapa.IV.1.rep_id`.

## Puertas de esta etapa

> [nota de diseño] La sección la pinta `RegistroPuertas` (`figueres-1939`); esta ficha no añade línea propia para no
> repetirla.

## Debates preparados en el explorador

<!-- cortes.guerra.debates.entrada -->
El explorador trae un debate preparado de esta etapa (v3):

<!-- cortes.guerra.debates.lista -->
Las Cortes en guerra

> [nota de diseño] `etapa.IV.debates` vale 1 (base.md); «un debate» concuerda con ese valor y el exportador lo comprueba.

## Antes de usarla

<!-- cortes.guerra.antes.extracto -->
Son extractos oficiales, no el Diario íntegro: parte de cada sesión se cuenta en frases del redactor.

<!-- cortes.guerra.antes.paginas -->
Las páginas de estas sesiones no están verificadas en los metadatos del proyecto.

<!-- cortes.guerra.antes.sumario -->
La nota del volumen y el sumario de cada extracto solo están en la v3. El filtro «Solo lo que se habla» los oculta.

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] «Frases del redactor»: «Se leyeron, y sin discusión quedaron aprobados…» (V2 107089), «Verificada
> la votación por papeletas, dijo» (v3 121208). Páginas: los nueve extractos tienen `page_status = unverified`.

## Para leer más

<!-- cortes.guerra.leer.torre -->
[A] Matilde de la Torre, *Las Cortes republicanas durante la Guerra Civil. Madrid 1936, Valencia 1937 y Barcelona 1938*, edición de Francisca Vilches-de Frutos. Madrid: Fondo de Cultura Económica de España, 2015.

<!-- cortes.guerra.leer.moradiellos -->
[A] Enrique Moradiellos, *Don Juan Negrín*. Barcelona: Península, 2006.

<!-- cortes.guerra.leer.cabrera -->
[A] Mercedes Cabrera Calvo-Sotelo, «Las Cortes republicanas», *Ayer*, 20, 1995, pp. 13–47.

> [nota de diseño] Matilde de la Torre fue diputada de estas Cortes: sus recuerdos, escritos en México, son fuente y no
> estudio; la edición crítica es de Vilches-de Frutos. Cabrera cierra su artículo con estas sesiones (pp. 46–47).

## Cómo citar

<!-- cortes.guerra.citar.sesion -->
*Extracto oficial de las sesiones. Congreso de los Diputados*, núm. 69, 1 de febrero de 1939. En Luz y Taquígrafos (V2), filas 107326 a 107341.

<!-- cortes.guerra.citar.sin_paginas -->
Estos extractos no tienen páginas verificadas: cítelos por su número y su fecha.

> [nota de diseño] Mismo formato que `cortes.1933.citar.sesion`, sin páginas. Debajo, ↺ 4, la cita del conjunto y
> [Copiar la cita]; `cortes.ficha.citar.paginas` no se pinta. Vecinas: ficha III y ficha V.


<!-- ═══ cortes_mexico.md ═══ -->

# Copy ES · Ficha V · Las Cortes en México, 1945 (`/[lang]/cortes/mexico/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: grupo **cortes_b** (fichas III, IV y V).
> Sigue la narrativa §8.5 y la plantilla C del plan (tope: 600–800 palabras). Reutiliza sin redefinirlas las claves
> comunes de `cortes.md` (`cortes.ficha.*`, `fig.*`) y las convenciones de clave de las fichas I y II. Marcadores y
> anclas: `docs/marcadores/cortes_mexico.md`. Referencias: `docs/02b_BIBLIOGRAFIA.md`, «Fichas III, IV y V».
>
> **Procedencia.** Como la ficha III. Las 210 filas V2 y las 235 filas v3 de las cinco sesiones se leyeron hoy una a
> una; los cinco sumarios y la carátula del volumen (v3 121466, 4.259 palabras), completos.
>
> **Cambios respecto a la narrativa (§8.5), medidos hoy:**
> 1. **La relación de acuerdos de la Diputación Permanente es texto del corpus**, solo en la v3 (fila del sumario del
>    10 de enero, v3 121466): 32 acuerdos numerados, de París (3 de marzo de 1939) a México (29 de noviembre de 1944).
>    En el primero se da «por enterada» de la dimisión de Azaña. Se usa, rotulado «solo en la v3».
> 2. **La lista de diputados fallecidos** desde julio de 1936 está en las dos ediciones (V2 107342 · v3 121467): 127
>    nombres, el primero el de Azaña.
> 3. **«Sí, prometo»**: las dos filas dicen «Si, prometo», sin tilde (V2 107372 · v3 121502). La cita va como está.
> 4. **La imprenta.** La carátula da «B. Costa i Amic» en cada cuadernillo (v3 121466). El colofón de la V2 dice «B.
>    Costa 1 Amic» (V2 107551), con un «1» del reconocimiento óptico: se cita la carátula.
> 5. **Lo votado el 8 de noviembre** es la propuesta que aprueba la declaración del Gobierno sobre el segundo punto del
>    orden del día (sumario, v3 121568), en votación ordinaria: 106 a favor, ninguno en contra (V2 107442).
> 6. **No se dice** que Negrín dimitiera el 17 de agosto (es [EXT]; la nota del proyecto que lo afirma cita Wikipedia),
>    ni «elección» de Martínez Barrio, ni «México y París».
>
> **Palabras para el lector:** unas 740, sin títulos, ids, bibliografía ni la tabla de sesiones. Ninguna frase pasa de
> 30 palabras.

---

## Cabecera

<!-- cortes.mexico.meta.titulo --> Las Cortes en México, 1945
<!-- cortes.mexico.meta.descripcion --> Las Cortes reunidas en México en 1945: una promesa, un Gobierno y la lista de quienes ya no estaban, con las palabras del extracto.
<!-- cortes.mexico.miga --> Las Cortes / V
<!-- cortes.mexico.titulo --> Las Cortes en México

<!-- cortes.mexico.antetitulo -->
10-I → 9-XI-1945 · 5 sesiones · Extracto oficial de las sesiones de Cortes celebradas en México (exilio)

> [nota de diseño] La serie lleva detrás `cortes.ficha.antetitulo.proyecto`. Numeral «V» en contorno.

<!-- cortes.mexico.entrada -->
¿Qué hicieron las Cortes cuando volvieron a reunirse, en México, en 1945?

<!-- cortes.mexico.tension -->
Una promesa, un Gobierno y la lista de quienes ya no estaban, dichos con las palabras del extracto.

## Hoy puede

<!-- cortes.mexico.hoy.buscar -->
**Buscar en esta etapa.** En Facetas, marque la Legislatura «1936-1939» y ponga Desde 10/01/1945 y Hasta 09/11/1945: el explorador guarda estas sesiones bajo esa legislatura.

<!-- cortes.mexico.hoy.buscar.consulta --> "Diputación Permanente"

<!-- cortes.mexico.hoy.buscar.recuento -->
Con esos filtros, la consulta da 16 intervenciones (v3), contando todas las filas. Salen en tres de las cinco sesiones.

<!-- cortes.mexico.hoy.sesion -->
**Abrir una sesión.** Ponga el 17 de agosto de 1945 en Desde y en Hasta, abra una intervención y pulse `s`: tendrá la sesión de la promesa entera.

<!-- cortes.mexico.hoy.debate -->
**Añadir un debate preparado.** En Mis bibliotecas, pulse «Añadir bibliotecas del proyecto…» y elija «Las Cortes en el exilio».

<!-- cortes.mexico.hoy.exportar -->
**Exportar con su cita.** Lo que exporta el explorador lleva la cita en sus primeras líneas.

> [nota de diseño] Sin Tendencia. Debajo, ↺ 5 y ↺ 4, una vez cada una. La sesión del 17 de agosto tiene
> diez filas en la v3.

## Cifras

<!-- cortes.mexico.cifras.sesiones -->
5 sesiones, de enero a noviembre de 1945, en la Ciudad de México.

<!-- cortes.mexico.cifras.palabras -->
75.458 palabras en la edición depositada: el 0,31 % del corpus.

<!-- cortes.mexico.cifras.diputados -->
29 diputados toman la palabra, contando a quien preside.

> [nota de diseño] «En la Ciudad de México» sale del sumario de cada sesión («sesión celebrada en la Ciudad de
> México»: v3 121466, 121495, 121505, 121568, 121601).

## Lo que pasó en la Cámara

### Volver a reunirse (10 de enero)

<!-- cortes.mexico.contexto.1.titulo --> Volver a reunirse (10 de enero)

<!-- cortes.mexico.contexto.1.a -->
La primera sesión escucha la relación de acuerdos de la Diputación Permanente «de 2 de febrero de 1939 a 9 de enero de 1945». Son 32 acuerdos, de París a México (v3 121466, solo en la v3).

<!-- cortes.mexico.contexto.1.b -->
En el primero, la Diputación se da «por enterada» de la dimisión de Azaña como Presidente de la República (v3 121466, solo en la v3).

<!-- cortes.mexico.contexto.1.c -->
Después se lee la lista de diputados fallecidos desde julio de 1936: 127 nombres. El primero es el de Azaña (V2 107342 · v3 121467).

<!-- cortes.mexico.contexto.1.d -->
Martínez Barrio recuerda la noche de Figueres: «celebrábamos las exequias temporales de la República Española» (V2 107344 · v3 121470).

> [nota de diseño] El primer acuerdo dice «Darse por enterada de la dimisión del Excelentísimo señor Presidente de la
> República, don Manuel Azaña Díaz» (París, 3 de marzo de 1939): el copy cita solo «por enterada». Los acuerdos se
> cuentan por su numeración impresa, de «1.—ACUERDO» a «32.—ACUERDO».

### Una promesa (17 de agosto)

<!-- cortes.mexico.contexto.2.titulo --> Una promesa (17 de agosto)

<!-- cortes.mexico.contexto.2.a -->
Preside Fernández Clérigo. El orden del día dice: «Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española» (V2 107371 · v3 121500).

<!-- cortes.mexico.contexto.2.b -->
A la fórmula de la promesa, Martínez Barrio responde: «Si, prometo» (V2 107372 · v3 121502).

> [nota de diseño] Nunca «elección»: el Diario dice «promesa … como Presidente interino» (discrepancia 31 del plan).
> «Si, prometo» va sin tilde, como en las dos filas. Debajo, `cortes.ficha.contexto.puerta` → `mexico-1945`.

### Un Gobierno (7 y 8 de noviembre)

<!-- cortes.mexico.contexto.3.titulo --> Un Gobierno (7 y 8 de noviembre)

<!-- cortes.mexico.contexto.3.a -->
Giral presenta «el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente» desde que salieron de España. Habla 7.446 palabras (V2 107375 · v3 121507).

<!-- cortes.mexico.contexto.3.b -->
Lamoneda anuncia su voto contrario: «No otorgaremos, pues, la confianza al Gobierno» (V2 107402 · v3 121535). La confianza se aprueba «por aclamación» (V2 107425 · v3 121560).

<!-- cortes.mexico.contexto.3.c -->
Al día siguiente se debate el segundo punto del orden del día: «las circunstancias que impiden con carácter de fuerza mayor la convocatoria de elecciones» presidenciales (V2 107429 · v3 121567).

<!-- cortes.mexico.contexto.3.d -->
La propuesta que aprueba la declaración del Gobierno sobre ese punto sale por 106 votos a favor y ninguno en contra, en votación ordinaria (V2 107442 · v3 121582).

> [nota de diseño] «Desde que salieron de España» resume la frase de Giral en la misma fila: «desde el día en que el
> infortunio nos hizo cruzar la frontera de nuestra patria amada».

### El Estatuto gallego y el cierre (9 de noviembre)

<!-- cortes.mexico.contexto.4.titulo --> El Estatuto gallego y el cierre (9 de noviembre)

<!-- cortes.mexico.contexto.4.a -->
La última sesión discute si se forma una comisión para el Estatuto de Galicia (V2 107466 · v3 121614). Suárez Picallo cuenta que salió «de Santiago de Chile para asistir a estas sesiones» (V2 107485 · v3 121633).

<!-- cortes.mexico.contexto.4.b -->
Prieto se opone a formarla. Al final, Giral pide dar «esta satisfacción moral a nuestros compañeros los Diputados gallegos», y la minoría socialista accede (V2 107540 · v3 121688; V2 107543 · v3 121691).

<!-- cortes.mexico.contexto.4.c -->
Jiménez de Asúa cierra agradeciendo «a México, a su Gobierno, a su Prensa y a su pueblo» (V2 107551 · v3 121699).

> [nota de diseño] La comisión: «una Comisión especial para dictamar [sic] sobre el Estatuto autónómico de la Región
> gallega» (V2 107466); el copy la resume. Quien cierra es la Presidencia de la sesión, que el sumario da a Jiménez de
> Asúa (v3 121601).

## Las sesiones, una a una

> [nota de diseño] Como en la ficha IV: cada línea abre con la fecha. Comprobado: el 8 de
> noviembre explican el voto Prieto (V2 107444–107446), Fernández Clérigo (107448) y Galarza (107450); el 9 se eligen
> cargos de la Mesa y la Comisión de Gobierno Interior (V2 107461–107464) y se da cuenta de la Diputación Permanente
> (V2 107465).

<!-- cortes.mexico.sesiones.titulo --> Las sesiones, una a una

<!-- cortes.mexico.sesiones.1945-01-10-70 --> 10-I-1945 · Preside Martínez Barrio. Relación de acuerdos de la Diputación Permanente y lista de diputados fallecidos.
<!-- cortes.mexico.sesiones.1945-08-17-71 --> 17-VIII-1945 · Preside Fernández Clérigo. Promesa de Martínez Barrio como Presidente interino de la República.
<!-- cortes.mexico.sesiones.1945-11-07-72 --> 7-XI-1945 · Preside Jiménez de Asúa. Giral presenta su Gobierno; la confianza, por aclamación.
<!-- cortes.mexico.sesiones.1945-11-08-73 --> 8-XI-1945 · Se aprueba la declaración del Gobierno sobre la elección presidencial; explican su voto Prieto, Fernández Clérigo y Galarza.
<!-- cortes.mexico.sesiones.1945-11-09-74 --> 9-XI-1945 · Mesa, Diputación Permanente y comisión del Estatuto de Galicia; cierre de las sesiones.

## Cuándo se reunió

<!-- cortes.mexico.calendario.entrada -->
Tras el salto de 1939 a 1945, tres meses de 1945 tienen sesión: enero, agosto y noviembre.

<!-- cortes.mexico.calendario.presidente -->
Bajo el calendario van dos bandas de los metadatos del proyecto. Martínez Barrio preside la primera sesión; Fernández Clérigo, la de la promesa; Jiménez de Asúa, las de noviembre.

<!-- cortes.mexico.calendario.gobiernos -->
La banda de Gobiernos pasa del de Negrín al de Giral. El corpus solo dice que Giral recibió el encargo del Presidente interino; la fecha del cambio es del proyecto, pendiente de verificar.

> [nota de diseño] Bajo F01e van ↺ `comun.fija.tono`, `fig.F01.salvedad.causas` y `fig.F01.salvedad.extractos`.
> «Recibió el encargo»: Giral, «cuando recibió del Excelentísimo Señor Presidente Interino de la República el honroso
> encargo de formarlo» (V2 107375 · v3 121507). La fecha (21-VIII-1945) y la dimisión de Negrín son [EXT]:
> `sessions.json` las toma de Wikipedia y lleva `verificar = true` para el Gobierno Giral (petición al autor).

## Quién tomó la palabra

<!-- cortes.mexico.palabra.f05 -->
Sin contar la Presidencia, José Giral encabeza la palabra de la etapa: 9.792 palabras de habla (v3).

<!-- cortes.mexico.palabra.f05_siguen -->
Le siguen Indalecio Prieto y Luis Fernández Clérigo.

<!-- cortes.mexico.palabra.f09 -->
Por familias, los republicanos se llevan el 45,9 % de las palabras sin Presidencia (V2), y los socialistas, el 34,4 %.

> [nota de diseño] F05 (v3) lleva NotaBases (↺ 13). Guardas: `oradores.etapa.V.1…3.rep_id`.

## Puertas de esta etapa

> [nota de diseño] La sección la pinta `RegistroPuertas` (`mexico-1945`); esta ficha no añade línea propia.

## Debates preparados en el explorador

<!-- cortes.mexico.debates.entrada -->
El explorador trae un debate preparado de esta etapa (v3):

<!-- cortes.mexico.debates.lista -->
Las Cortes en el exilio

> [nota de diseño] `etapa.V.debates` vale 1 (base.md). El nombre es el del explorador: «exilio» es suyo y aquí es exacto.

## Antes de usarla

<!-- cortes.mexico.antes.cuadernillos -->
Son extractos oficiales, impresos en cuadernillos en México por «B. Costa i Amic», según la carátula del volumen (v3 121466, solo en la v3). Sus páginas no están verificadas.

<!-- cortes.mexico.antes.prieto -->
El discurso de Prieto del 8 de noviembre es una sola fila en la V2, con 5.622 palabras. La v3 lo parte en dos (V2 107446 · v3 121586 y 121588).

<!-- cortes.mexico.antes.no_esta -->
Lo que no está: la carátula enumera reuniones de la Diputación Permanente en México. Avisa de que «no se dispone de los textos ni en forma de fotocopia» (v3 121466, solo en la v3).

<!-- cortes.mexico.antes.paris -->
Tampoco están las que celebró en París. Una nota del volumen de la guerra dice que el tomo reunía «las cuatro de la Diputación Permanente, celebradas en París» (V2 107341 · v3 121465).

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] `antes.no_esta` y `antes.paris` también sirven a «Lo que no está aquí» de Las Cortes (narrativa
> §7.5; cortes_a recortó allí las reuniones de París por falta de fuente externa): la nota final de la sesión 69 las
> ancla en el corpus. Petición en `peticiones/cortes_b.md`.

## Para leer más

<!-- cortes.mexico.leer.cabeza -->
[A] Sonsoles Cabeza Sánchez-Albornoz, *Historia política de la Segunda República en el exilio*. Madrid: Fundación Universitaria Española, 1997.

<!-- cortes.mexico.leer.valle -->
[A] José María del Valle, *Las instituciones de la República española en exilio*. París: Ruedo Ibérico, 1976.

## Cómo citar

<!-- cortes.mexico.citar.sesion -->
*Extracto oficial de las sesiones de Cortes celebradas en México*, núm. 71, 17 de agosto de 1945. En Luz y Taquígrafos (V2), filas 107369 a 107373.

<!-- ↺ cortes.guerra.citar.sin_paginas -->
Estos extractos no tienen páginas verificadas: cítelos por su número y su fecha.

> [nota de diseño] Mismo formato que `cortes.guerra.citar.sesion`. Debajo, ↺ 4, la cita del conjunto y [Copiar la cita].
> Vecinas: anterior, la ficha IV; en el centro, Todas las etapas; no hay siguiente.


<!-- ═══ datos.md ═══ -->

# Copy ES · Usar los datos (`/[lang]/datos/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Método», «Usar los datos» y
> «Versiones». Sigue la narrativa §13 y la plantilla H del plan. «Versiones» va en su propio archivo,
> `docs/copy_es/versiones.md` (el contrato decía `datos.md` para las dos; `copy2i18n.py` concatena todos los `.md`, así
> que no cambia nada para la compilación). Marcadores: `docs/marcadores/datos.md`. Los dos fragmentos se ejecutaron
> hoy sobre el CSV V2 depositado (MD5 comprobado) y la tabla de diputados de CGOCUS V1.1; salida en
> `docs/marcadores/fragmentos_salida.txt`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `⟦marcador⟧`. El código es literal (`<code>` y `<pre>` quedan fuera de la auditoría de cifras).
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (recalculado hoy sobre las fuentes):
> 1. **`id`: «No es el orden»** (plan, F32) ya no vale en la V2: con las fechas corregidas, el id sigue la fecha sin un
>    solo retroceso (0 de 107.550 pasos). La trampa del id es otra: solo vale dentro de la V2.
> 2. **«“34 millones” no sale de ninguna»** (salvedad de F33 en el plan) choca con la lista de cifras vetadas. La
>    salvedad dice lo mismo sin repetir la cifra.
> 3. **«No lo abra en una hoja de cálculo: 289 filas superan los 32.767 caracteres…»**: el límite de Excel es un dato
>    externo, sin base del proyecto. La frase dice «el máximo de una celda de Excel» y da la fila más larga.
> 4. **La unión con Afinidades** se probó con la tabla depositada de CGOCUS V1.1: el original
>    (`representative_metadata.csv`, MD5 `c9e66013…`, el mismo que declara Dataverse) convertido al formato `.tab` en
>    que lo sirve Dataverse. La copia de prueba mide exactamente lo que el `.tab` depositado: 156.736 bytes.
> 5. **La Presidencia en una línea de código.** El sitio la reconoce con el analizador de fórmulas del explorador. Una
>    línea de pandas se queda cerca (48.203 filas frente a 48.241) y el copy lo dice, en vez de dar una línea que no
>    reproduce la cifra.

---

## Metadatos

<!-- datos.meta.titulo -->
Usar los datos

<!-- datos.meta.descripcion -->
Por dónde empezar, cómo abrir el CSV, qué significa cada columna y dónde engaña, cómo unirlo con Afinidades Elegidas y cómo citarlo.

> [nota de diseño] Subnavegación «Usar los datos · Versiones» (`comun.md`). Índice lateral con los nueve apartados
> (`datos.indice.*`). Sin banda fija (solo Método y Explorador). La página lleva `<NotaBases>`: F33 y la decisión 4
> citan cifras de la v3. El ancla `#empezar` es el destino único de [Descargar los datos] en todo el sitio.

## Índice lateral

<!-- datos.indice.titulo -->
En esta página

<!-- datos.indice.empezar -->
Por dónde empezar

<!-- datos.indice.camino -->
El camino hasta el archivo

<!-- datos.indice.columnas -->
Las columnas

<!-- datos.indice.decisiones -->
Antes de contar

<!-- datos.indice.palabra -->
Contar «palabra»

<!-- datos.indice.unir -->
Unir con Afinidades

<!-- datos.indice.codigo -->
Dos fragmentos

<!-- datos.indice.citar -->
Cómo citar

<!-- datos.indice.erratas -->
Erratas y contacto

## Cabecera

<!-- datos.antetitulo -->
THQCMI V2.0 · 107.551 filas · 14 columnas · 158,1 MB

<!-- datos.titulo -->
¿Cómo lo abro, qué significa cada columna, cómo lo uno y cómo lo cito?

<!-- datos.entrada -->
Quien descarga quiere contar. Antes conviene saber dónde engañan las columnas: el orden empieza en cero, la sesión se reinicia, la Presidencia tiene partido y la palabra se cuenta de cinco maneras.

<!-- datos.entrada.2 -->
Cada trampa va aquí con su cifra y con la línea de código que la resuelve.

---

## 1 · Por dónde empezar (`#empezar`)

<!-- datos.empezar.titulo -->
Por dónde empezar

<!-- datos.empezar.entrada -->
Elija por lo que ya sabe hacer.

<!-- datos.empezar.s1.titulo -->
Sin programar

<!-- datos.empezar.s1.texto -->
Llévese los datos de cada figura de este sitio, en CSV y en Excel, con su LÉAME y su cita. Pesan unos KB.

<!-- ↺ comun.fija.sin_formulario -->
Sin formulario: son datos agregados.

<!-- datos.empezar.s1.accion -->
[Ver los datos de cada figura]

<!-- datos.empezar.s2.titulo -->
Sin programar, con el texto

<!-- datos.empezar.s2.texto -->
Abra el explorador: trae los Diarios ya cargados. Busque, lea cada sesión como en el Diario y exporte lo que encuentre, con su cita.

<!-- datos.empezar.s2.peso -->
La primera vez descarga unos 106,6 MB comprimidos, sin formulario.

<!-- ↺ comun.fija.explorador -->
Sirve la edición v3, sin depositar; pide un ordenador.

<!-- ↺ comun.fija.local -->
Se abre en su navegador; lo que busca y guarda se queda en su equipo.

<!-- datos.empezar.s2.accion -->
[Abrir el explorador ↗]

<!-- datos.empezar.s3.titulo -->
Con R o Python

<!-- datos.empezar.s3.texto -->
El CSV depositado, THQCMI V2.0: 107.551 filas y 14 columnas. Los dos fragmentos de esta página lo cargan, lo cuentan y lo unen.

<!-- datos.empezar.s3.peso -->
Un archivo de 158,1 MB.

<!-- datos.empezar.s3.accion -->
[Descargar en Dataverse ↗]

<!-- datos.empezar.s4.titulo -->
Con métodos de redes

<!-- datos.empezar.s4.texto -->
Afinidades Elegidas: quién firmó con quién cada proposición, enmienda, ruego o interpelación. Es una base derivada, con su propio depósito, que se une a esta por diputado y legislatura.

<!-- datos.empezar.s4.accion -->
[Ver Afinidades Elegidas]

<!-- datos.empezar.cierre -->
Dos personas con la misma base pueden llegar a resultados distintos sin que ninguna se haya equivocado. Las decisiones de análisis son suyas, y esta página las enseña.

<!-- ↺ comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

> [nota de diseño] La escalera va en registro de calendario, sin tarjetas: cuatro peldaños a dos columnas desde 64 rem.
> Peldaño 1: `s1.*` + ↺ 12 (`comun.fija.sin_formulario`); [Ver los datos de cada figura] → `datos/versiones/#bases`
> (F35: cada figura con su base y sus archivos; `comun.boton.ver_datos_figuras`). El rótulo anterior, [Ver las figuras
> de Las Cortes], llevaba a `cortes/#calendario`, el mismo destino que [Ver el calendario completo] (REVISION_FASE1 P2-12).
> Peldaño 2: `s2.*` + `comun.fija.explorador` + `comun.fija.local` + ↺ 4 (`comun.fija.ids`); [Abrir el explorador ↗]
> → `ENLACES.explorador`.
> Peldaño 3: ↺ 3 (`comun.fija.formulario`) **encima** del botón, nunca en una nota emergente; [Descargar en Dataverse ↗]
> → `ENLACES.thqcmi` (la página del DOI). Peldaño 4: [Ver Afinidades Elegidas] → `afinidades/`; sus archivos y su
> peso viven en esa página (D-3: ninguna cifra de Afinidades sale de su página salvo la unión de F34).
> «Unos KB» no es una cifra del corpus. El tamaño recordado de la base del explorador no se da: «Recordar la base»
> no se ha podido comprobar (C4).

---

## 2 · El camino hasta el archivo (`#camino`)

<!-- datos.camino.titulo -->
El camino hasta el archivo

<!-- datos.camino.entrada -->
Tres pasos: la página del DOI, un solo archivo y una lectura con los parámetros correctos.

<!-- ↺ comun.fija.formulario.motivo -->
Con esos datos queremos saber quién usa la base y con qué fin, para poder mejorarla y comunicar novedades.

> [nota de diseño] Encima de todo, ↺ 3 (`comun.fija.formulario`). Debajo, `comun.fija.formulario.motivo`: el motivo
> del formulario que dio el investigador (D-20, cerrada el 23-09-2026), en una sola frase. El formulario **no se nombra
> por su título**, que trae una errata.

<!-- datos.camino.texto -->
**Vaya a la página del DOI.** Los botones de este sitio llevan allí, no a un archivo suelto.

**Descargue solo el CSV.** Se llama `2REP_Diaries.csv` y pesa 158,1 MB. Los demás archivos de la versión son documentación.

**Léalo con estos parámetros.** Punto y coma como separador, UTF-8 sin marca de orden de bytes y todos los campos entre comillas dobles.

Las comillas internas van duplicadas. Cada registro acaba en CRLF, y el texto conserva sus saltos de línea dentro de las comillas.

Un campo vacío es un valor perdido. Python lo lee como `NaN`; R, como `NA` en las columnas numéricas y como texto vacío en las demás.

**Compruebe su copia.** Si la ha leído bien, debe darle las cifras de esta tabla, legislatura a legislatura. Son las que imprimen los dos fragmentos de esta página.

<!-- datos.camino.comprobar.col.legislatura -->
Legislatura

<!-- datos.camino.comprobar.col.sesiones -->
Sesiones

<!-- datos.camino.comprobar.col.filas -->
Filas

<!-- datos.camino.comprobar.col.palabras -->
Palabras (`nwords`)

<!-- datos.camino.comprobar.total -->
Las tres

<!-- datos.camino.comprobar.aria -->
Sesiones, filas y palabras de cada legislatura en el CSV depositado

<!-- datos.camino.no_trae -->
**Lo que el archivo no trae.** Ni las páginas del Diario, ni quién presidía cada sesión, ni el Gobierno. Son metadatos del proyecto, sin depositar, y el explorador tampoco los muestra.

<!-- datos.camino.accion -->
[Descargar en Dataverse ↗]

<!-- datos.camino.tabla.titulo -->
Los archivos de la versión V2.0

<!-- datos.camino.tabla.col.archivo -->
Archivo

<!-- datos.camino.tabla.col.bytes -->
Bytes

<!-- datos.camino.tabla.col.md5 -->
MD5

<!-- datos.camino.tabla.col.que -->
Qué es

<!-- datos.camino.archivo.csv -->
Los datos: una fila por turno impreso.

<!-- datos.camino.archivo.changelog_es -->
Qué cambió de la V1 a la V2, en español.

<!-- datos.camino.archivo.changelog_en -->
Lo mismo, en inglés.

<!-- datos.camino.archivo.readme -->
La documentación, en inglés. Describe la primera versión.

<!-- ↺ comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- datos.camino.integridad -->
Si quiere comprobar que su copia es la depositada, compare su MD5 con el de la tabla.

<!-- datos.camino.excel -->
**No lo abra en una hoja de cálculo.** 289 filas superan el máximo de caracteres de una celda de Excel. La más larga tiene 170.413.

> [nota de diseño] La tabla de comprobación (`datos.camino.comprobar.col.*`) tiene una fila por legislatura, con
> `⟦leg.<leg>.sesiones⟧`, `.filas` y `.palabras` (sustitución `<leg>` = 1931-1933 · 1933-1935 · 1936-1939,
> rótulos tal como están en la columna `legislature`). `datos.camino.no_trae` lleva el sello ↺ 2 de los metadatos del
> proyecto (`comun.sello.proyecto`).
>
> La tabla de archivos se genera de la instantánea de Dataverse (`dv_thqcmi.json`): nombre, `filesize` (con
> `fmt.n`, sin unidad) y MD5 completo, en mono. `datos.camino.archivo.*` describe cada archivo. [Descargar en
> Dataverse ↗] lleva ↺ 3 encima (ya está al principio de la sección, en la misma vista). Bajo la tabla, ↺ 11
> (`comun.fija.readme`), que enlaza a `datos/versiones/`.

---

## 3 · Las columnas (F32, `#columnas`)

<!-- datos.columnas.titulo -->
Las 14 columnas

<!-- datos.columnas.entrada -->
Cada columna, con su definición, su valor en dos filas reales y su trampa.

<!-- datos.columnas.texto -->
Las filas de ejemplo son la 5423 y la 5424, seguidas en la sesión del 1 de octubre de 1931. En la primera, la Presidencia pide silencio; en la segunda, Clara Campoamor empieza a hablar.

<!-- datos.columnas.id.definicion -->
Número de la fila en la V2, del uno al 107.551, sin huecos. Sigue el orden de lectura: fecha, sesión y lugar en la sesión.

<!-- datos.columnas.id.trampa -->
Solo vale dentro de la V2. La v3 renumera: la 5424 es allí la 6079. Para citar, dé también la fecha y el número de sesión.

<!-- datos.columnas.num_session.definicion -->
Número de la sesión dentro de su legislatura, como lo imprime el Diario.

<!-- datos.columnas.num_session.trampa -->
Vuelve a empezar en cada legislatura: la sesión 1 existe tres veces. Una sesión se identifica por la fecha y el número juntos.

<!-- datos.columnas.order.definicion -->
Lugar de la fila en su sesión.

<!-- datos.columnas.order.trampa -->
Empieza en cero. Campoamor es la 26 en la V2, la 29 en la v3 y «Orden 30» en la pantalla del explorador.

<!-- datos.columnas.date.definicion -->
Fecha de la sesión, en formato AAAA-MM-DD.

<!-- datos.columnas.date.trampa -->
siete sesiones cambiaron de fecha de la V1 a la V2. Hay tres días con dos sesiones, así que la fecha sola no identifica una sesión.

<!-- datos.columnas.speaker.definicion -->
La fórmula impresa del orador, tal como la leyó el reconocimiento óptico.

<!-- datos.columnas.speaker.trampa -->
Solo esta columna dice el cargo: «El Sr. PRESIDENTE:», «El Sr. Ministro de HACIENDA:». Conserva las erratas de lectura, como «PERSIDENTE».

<!-- datos.columnas.speech.definicion -->
El texto de la fila, sin resumir ni corregir a mano.

<!-- datos.columnas.speech.trampa -->
Incluye acotaciones, interrupciones, documentos y listas de votación. La lista nominal del 1 de octubre de 1931 va dentro de una fila de la Presidencia, la 5453.

<!-- datos.columnas.rep_id.definicion -->
El diputado, según la tabla de diputados del proyecto.

<!-- datos.columnas.rep_id.trampa -->
Es una persona, no un escaño. La Presidencia va al diputado que preside. Hay 147 filas vacías, y el identificador 836 lleva dos nombres distintos, pendiente del autor.

<!-- datos.columnas.rep_name.definicion -->
Nombre completo del diputado.

<!-- datos.columnas.rep_name.trampa -->
Va sin tildes y con mayúscula en cada palabra: «Clara Campoamor Y Rodriguez». No lo copie en un texto; use la grafía del Diario o de la bibliografía.

<!-- datos.columnas.district.definicion -->
Circunscripción por la que salió elegido el diputado.

<!-- datos.columnas.district.trampa -->
Tiene 54 valores. Uno, «Agrarios», es una errata en ocho filas. Es el distrito electoral, no el lugar de nacimiento.

<!-- datos.columnas.party.definicion -->
Siglas del partido del diputado en esa legislatura.

<!-- datos.columnas.party.trampa -->
Va por diputado y legislatura, no por fila. «Indep.» aquí es «Independiente» en Afinidades Elegidas.

<!-- datos.columnas.party_family.definicion -->
Familia de partidos del diputado.

<!-- datos.columnas.party_family.trampa -->
Tiene 33 valores escritos a mano, con variantes como «Repubicanos» o «Republicanoses». Faltan en 151 filas. El explorador los reduce a 24 familias.

<!-- datos.columnas.ideology.definicion -->
Posición del partido, de EI, extrema izquierda, a ED, extrema derecha.

<!-- datos.columnas.ideology.trampa -->
Es la del partido del diputado, no la de la persona. En cinco partidos conviven códigos distintos. Además, 93 filas llevan «C » con un espacio detrás.

<!-- datos.columnas.nwords.definicion -->
Palabras del texto.

<!-- datos.columnas.nwords.trampa -->
Cuenta trozos separados por el carácter espacio: un salto de línea no separa. Con `split()` salen 24.700.474, no 24.335.896.

<!-- datos.columnas.legislature.definicion -->
Legislatura: 1931-1933, 1933-1935 o 1936-1939.

<!-- datos.columnas.legislature.trampa -->
La segunda no se llama igual en Afinidades Elegidas. La tercera incluye las sesiones de la guerra y las de México.

> [nota de diseño] **F32** es la tabla ARIA `Columnas.astro` **sin tira de llenado**. Filas en el orden del CSV; cada
> una con ancla `#col-<columna>` (`:target` la resalta), su `.definicion`, sus valores en V2 5423 y 5424 (de
> `columnas.json`, recortados con el componente de corte) y su `.trampa` al margen. `fig.F20` reutiliza las
> `.definicion`. En `legislature.trampa` va a continuación ↺ 10 (`comun.fija.legislatura`), en pequeño. Los rótulos de
> legislatura son valores de la columna, como los años de un hecho. Bajo la tabla, `datos.columnas.speech.dentro`.

<!-- datos.columnas.speech.dentro -->
**Dentro del texto.** Los párrafos del Diario van separados por una línea en blanco. Las acotaciones del taquígrafo van entre paréntesis, como en el papel: «(Muy bien.—Aplausos.)».

Las palabras que el Diario partía con guion al final de línea están recompuestas. Las erratas de lectura, no.

<!-- ↺ comun.fija.legislatura -->
El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.

<!-- fig.F32.titulo -->
Cada columna, con su trampa

<!-- fig.F32.pregunta -->
¿Qué significa cada columna, y dónde engaña?

<!-- fig.F32.tabla.col.columna -->
Columna

<!-- fig.F32.tabla.col.definicion -->
Qué es

<!-- fig.F32.tabla.col.silencio -->
Fila 5423

<!-- fig.F32.tabla.col.campoamor -->
Fila 5424

<!-- fig.F32.tabla.col.trampa -->
Dónde engaña

<!-- fig.F32.vacio -->
vacío

<!-- fig.F32.tipo.entero -->
entero

<!-- fig.F32.tipo.texto -->
texto

<!-- fig.F32.tipo.fecha -->
fecha

<!-- fig.F32.vacios -->
⟦n⟧ vacíos

<!-- fig.F32.sin_vacios -->
sin vacíos

<!-- fig.F32.distintos -->
⟦n⟧ valores distintos

<!-- fig.F32.tabla.col.tipo -->
Tipo

<!-- fig.F32.tabla.col.vacios -->
Vacíos

<!-- fig.F32.tabla.col.distintos -->
Distintos

<!-- fig.F32.cortado -->
⟦n⟧ caracteres en total

<!-- fig.F32.nota -->
⟦columna⟧ · ⟦vacios⟧ vacíos de ⟦den⟧ filas

<!-- fig.F32.que_mide -->
Las 14 columnas del CSV depositado: su tipo, sus celdas vacías, sus valores distintos y su valor en dos filas reales.

<!-- fig.F32.denominador -->
Las 107.551 filas de la V2.

<!-- fig.F32.salvedad -->
Definiciones del README depositado, que describe la V1, corregidas donde la V2 cambió.

<!-- fig.F32.alt -->
Tabla de las columnas del CSV depositado, con su definición, su valor en dos filas de ejemplo y su trampa.

---

## 4 · Antes de contar (`#decisiones`)

<!-- datos.decisiones.titulo -->
Antes de contar: seis decisiones que cambian el resultado

<!-- datos.decisiones.entrada -->
Ninguna tiene una respuesta correcta para todos. Cada una lleva su cifra y la línea que la aplica.

<!-- datos.decisiones.1.titulo -->
La Presidencia

<!-- datos.decisiones.1.texto -->
El 44,85 % de las filas es de la Presidencia. Se lleva el 10,24 % de las palabras.

Para contar oradores, quítela. Consérvela si estudia cómo se dirigía el debate: quién daba la palabra, quién llamaba al orden.

El sitio la reconoce con el analizador de fórmulas del explorador, que lee también las erratas.

Una línea de pandas se le acerca: marca 48.203 filas. El analizador marca 48.241, porque lee además fórmulas como «PERSIDENTE».

<!-- datos.decisiones.1.codigo -->
```python
pres = d.speaker.str.contains("PRESIDENTE") & ~d.speaker.str.contains("CONSEJO|GOBIERNO|REPÚBLICA")
oradores = d[~pres]
```

<!-- datos.decisiones.2.titulo -->
Filas no es discurso

<!-- datos.decisiones.2.texto -->
El 66,53 % de las filas tiene 50 palabras o menos. Hay 17.362 filas de más de 300 palabras.

Esas filas largas reúnen el 86,18 % de todas las palabras. Si estudia discursos, fije un mínimo y dígalo.

Si estudia interrupciones o trámite, las filas breves son justo su dato.

<!-- datos.decisiones.2.codigo -->
```python
largas = d[d.nwords > 300]
```

<!-- datos.decisiones.3.titulo -->
Qué es una palabra

<!-- datos.decisiones.3.texto -->
Hay otras maneras de contar que `nwords`, y cada una da otra cifra. Se explica justo debajo.

<!-- datos.decisiones.3.codigo -->
```python
d.speech.str.split().str.len().sum()   # frente a d.nwords.sum()
```

<!-- datos.decisiones.4.titulo -->
El material impreso dentro de las filas

<!-- datos.decisiones.4.texto -->
En la V2, las listas de votación, las tablas y los documentos van dentro de la fila anterior. La v3 separó 12.654 bloques de ese material.

La fila más larga de la V2, la 55221, es sobre todo tablas. Antes de elegir las filas más largas, léalas.

El explorador separa ese material con la casilla «Solo lo que se habla». El CSV depositado no lo separa.

<!-- datos.decisiones.4.codigo -->
```python
print(d.loc[d.id == 5453, "speech"].iloc[0][:600])   # una votación nominal, dentro de la Presidencia
```

<!-- datos.decisiones.5.titulo -->
Las legislaturas desiguales

<!-- datos.decisiones.5.texto -->
La primera legislatura reúne el 53,28 % de las palabras. Compare tasas, no volúmenes: palabras por sesión, o la parte de cada grupo dentro de su legislatura.

La tasa puede invertir el orden. Por sesión, la primera legislatura suma 32.016 palabras.

La segunda, con menos palabras en total, suma 34.334 por sesión.

La tercera legislatura, 1936-1939, reúne tres etapas muy distintas. Para separarlas, corte por número de sesión: hasta la sesión 60, las Cortes de 1936, hasta el 10 de julio.

Las sesiones 61 a 69 son las Cortes en guerra, de octubre de 1936 a febrero de 1939. Las sesiones 70 a 74 son las de México, en 1945.

<!-- datos.decisiones.5.codigo -->
```python
d.groupby("legislature").nwords.sum() / d.nwords.sum()
etapa = pd.cut(d.num_session, [0, 60, 69, 74], labels=["1936", "guerra", "México"])
d[d.legislature == "1936-1939"].groupby(etapa).nwords.sum()
```

<!-- datos.decisiones.6.titulo -->
Los ids entre ediciones

<!-- datos.decisiones.6.texto -->
Un id de la V2 no sirve en el explorador. Para cruzar ediciones o citar, use la fecha y el número de sesión.

Para llevar al CSV algo que encontró en el explorador, busque la sesión por fecha y número. Dentro de ella, localice el comienzo del texto.

<!-- datos.decisiones.6.codigo -->
```python
d.groupby(["date", "num_session"]).ngroups   # una clave por sesión, igual en la v3
```

> [nota de diseño] Las seis decisiones van como lista numerada de seis bloques cortos (título en mono, texto y código
> en `<details>` abierto a 1.440 y cerrado en el móvil). Bajo la sexta, ↺ 4 (`comun.fija.ids`). «Seis» es la
> estructura de la sección, no una cifra del corpus. La decisión 4 cita una cifra v3: la página ya lleva `<NotaBases>`.

---

## 5 · Cinco maneras de contar «palabra» (F33, `#palabra`)

<!-- datos.palabra.titulo -->
Cinco maneras de contar «palabra»

<!-- datos.palabra.entrada -->
¿Cuántas palabras hay? Depende de qué cuente y en qué edición.

<!-- datos.palabra.texto -->
`nwords` separa por el carácter espacio. `split()` separa también por saltos de línea, y por eso da más: 24.700.474.

La diferencia se concentra en las listas, con un nombre por línea. En la votación nominal del 1 de octubre de 1931, `nwords` marca 233 palabras.

En esa misma fila, `split()` cuenta 522.

El explorador cuenta sobre la v3, que reparte las palabras de la V2 y añade los sumarios. Su Tendencia divide por otra cifra: los tokens de su índice de búsqueda.

<!-- fig.F33.titulo -->
La misma base, cinco cifras de palabras

<!-- fig.F33.pregunta -->
¿Cuántas palabras hay?

<!-- fig.F33.nwords.rotulo -->
`nwords` · V2

<!-- fig.F33.nwords.valor -->
24.335.896

<!-- fig.F33.nwords.def -->
La columna del CSV: trozos separados por el carácter espacio.

<!-- fig.F33.nwords.codigo -->
d.nwords.sum()

<!-- fig.F33.split.rotulo -->
`split()` · V2

<!-- fig.F33.split.valor -->
24.700.474

<!-- fig.F33.split.def -->
Trozos separados por cualquier espacio en blanco, saltos de línea incluidos.

<!-- fig.F33.split.codigo -->
d.speech.str.split().str.len().sum()

<!-- fig.F33.total.rotulo -->
Todas las filas · v3

<!-- fig.F33.total.valor -->
25.364.144

<!-- fig.F33.total.def -->
Las palabras de la V2, repartidas entre las piezas de la v3, más las de los sumarios que la V2 no traía.

<!-- fig.F33.habla.rotulo -->
Solo lo que se habla · v3

<!-- fig.F33.habla.valor -->
22.096.389

<!-- fig.F33.habla.def -->
Lo mismo sin sumarios ni comentarios del Diario: lo que cuenta el explorador con la casilla «Solo lo que se habla».

<!-- fig.F33.tendencia.rotulo -->
Tokens del índice · v3

<!-- fig.F33.tendencia.valor -->
25.903.736

<!-- fig.F33.tendencia.def -->
Lo que cuenta el índice de búsqueda del explorador. Es el denominador de su Tendencia.

<!-- fig.F33.eje -->
Millones de palabras

<!-- fig.F33.nota -->
⟦rotulo⟧ · ⟦valor⟧ · ⟦def⟧

<!-- fig.F33.tabla.col.recuento -->
Recuento

<!-- fig.F33.tabla.col.valor -->
Palabras

<!-- fig.F33.tabla.col.edicion -->
Edición

<!-- fig.F33.tabla.col.def -->
Qué cuenta

<!-- fig.F33.tabla.col.diferencia -->
Frente a `nwords`

<!-- fig.F33.que_mide -->
Palabras del corpus contadas de cinco maneras: dos sobre la edición depositada y tres sobre la del explorador.

<!-- fig.F33.denominador -->
Ninguno: son totales. Cada fila del CSV dice su edición y cómo se cuenta.

<!-- fig.F33.salvedad -->
Cada figura de este sitio dice cuál usa. Una cifra de palabras sin su definición no se compara con otra.

<!-- fig.F33.alt -->
Cinco barras horizontales con cinco recuentos de palabras: dos sobre la edición depositada y tres sobre la del explorador.

> [nota de diseño] **F33**: cinco barras horizontales con su rótulo y su valor en HTML encima; la nota emergente
> (`fig.F33.nota`) da la definición y, en las dos de la V2, la línea de código (`fig.F33.<k>.codigo`, en `<code>`).
> Las barras de la v3 llevan otro trazo y el sello «Edición del explorador» (↺ 2). Pestaña Tabla. Sin JS: la tabla.
> Una sola base por frase: `datos.palabra.texto` rotula V2 y v3 donde las compara.

---

## 6 · Unir con Afinidades Elegidas (F34, `#unir`)

<!-- datos.unir.titulo -->
Unir con Afinidades Elegidas

<!-- datos.unir.entrada -->
Afinidades Elegidas trae una ficha por diputado y legislatura. Se une a esta base por los dos, nunca solo por el diputado.

<!-- datos.unir.texto -->
La clave es el diputado, `rep_id`, que allí se llama `id_dip`, más la legislatura. Antes de unir, recodifique la segunda legislatura como la llama el censo: 1933-1935 pasa a ser 1933-1936.

Unos pocos pares de diputado y legislatura no tienen ficha en el censo de Afinidades: sus filas quedan sin atributos de Afinidades. La tabla de abajo los cuenta, con la versión de la que salen.

Si une solo por el diputado, cada fila se repite una vez por legislatura de su diputado, y cualquier suma sale inflada.

La tabla de Afinidades trae, por diputado y legislatura, su nombre, su distrito, su partido, su familia y su ideología, con los códigos de Afinidades.

No siempre coinciden con los de esta base: a veces el partido se escribe distinto, casi siempre «Indep.» frente a «Independiente».

Si usa esos atributos, diga de qué base salen.

<!-- datos.unir.archivo -->
La tabla de diputados de Afinidades Elegidas se descarga como `representative_metadata.tab`, separada por tabuladores, del depósito CGOCUS V1.1.

<!-- datos.unir.accion -->
[Descargar en Dataverse ↗]

<!-- fig.F34.titulo -->
Por diputado y legislatura, nunca solo por el diputado

<!-- fig.F34.pregunta -->
¿Cómo se une la V2 con Afinidades Elegidas sin multiplicar filas?

<!-- fig.F34.tabla.col.paso -->
Paso

<!-- fig.F34.tabla.col.resultado -->
Resultado

<!-- fig.F34.paso.recodificar -->
Recodificar la legislatura 1933-1935 como 1933-1936

<!-- fig.F34.paso.recodificar.resultado -->
Las dos bases hablan de la misma legislatura

<!-- fig.F34.paso.unir -->
Unir por diputado y legislatura

<!-- fig.F34.paso.unir.resultado -->
107.551 filas, las mismas que antes

<!-- fig.F34.paso.casan -->
Pares de diputado y legislatura que casan

<!-- fig.F34.paso.casan.resultado -->
1.047 de 1.060

<!-- fig.F34.paso.sin_ficha -->
Pares sin ficha en Afinidades

<!-- fig.F34.paso.sin_ficha.resultado -->
13 pares, 426 filas

<!-- fig.F34.paso.mal -->
Unir solo por el diputado (mal)

<!-- fig.F34.paso.mal.resultado -->
247.327 filas

<!-- fig.F34.paso.partido -->
Pares con otro rótulo de partido

<!-- fig.F34.paso.partido.resultado -->
31

<!-- fig.F34.barra.v2 -->
El CSV depositado, antes de unir

<!-- fig.F34.barra.bien -->
Unido por diputado y legislatura

<!-- fig.F34.barra.mal -->
Unido solo por el diputado

<!-- fig.F34.barra.repetidas -->
⟦n⟧ filas repetidas

<!-- fig.F34.barra.sin_ficha -->
De ellas, sin ficha en Afinidades

<!-- fig.F34.que_mide -->
Los pares de diputado y legislatura de la V2 que no tienen ficha en Afinidades Elegidas y los que la tienen con otro rótulo de partido.

<!-- fig.F34.denominador -->
Los 1.060 pares de diputado y legislatura de la V2, con la legislatura recodificada como la llama el censo.

<!-- fig.F34.otros.resumen -->
Los pares con otro rótulo de partido, uno a uno

<!-- fig.F34.otros.col.v2 -->
Partido en la V2

<!-- fig.F34.otros.col.afin -->
Partido en Afinidades

<!-- fig.F34.casos.resumen -->
Los pares sin ficha, uno a uno

<!-- fig.F34.casos.col.diputado -->
Diputado

<!-- fig.F34.casos.col.legislatura -->
Legislatura

<!-- fig.F34.casos.col.filas -->
Filas

<!-- fig.F34.salvedad -->
Cifras de la versión depositada de Afinidades Elegidas, CGOCUS V1.1. Cambiarán si se deposita otra.

<!-- fig.F34.alt -->
Tabla con los pasos para unir las dos bases: recodificar la legislatura, unir por diputado y legislatura, y lo que pasa si se une solo por el diputado.

> [nota de diseño] **F34** es una tabla (no interactiva). Los pares sin ficha van en `<details>`
> (`fig.F34.casos.*`), generados por el exportador (`union.json`) con el nombre según la tabla de grafías; nunca el
> `rep_name` crudo. El `rep_id` 836, con dos nombres, **no se cita como ejemplo** (discrepancia 23). Bajo la tabla,
> ↺ 10 (`comun.fija.legislatura`) y ↺ 3 encima de [Descargar en Dataverse ↗] → `ENLACES.cgocus`. Sello: «Afinidades
> Elegidas (CGOCUS V1.1, depositada)» (↺ 2). El código de la unión está en los fragmentos (sección 7).

---

## 7 · Dos fragmentos (`#codigo`)

<!-- datos.codigo.titulo -->
Dos fragmentos, en R y en Python

<!-- datos.codigo.entrada -->
Cargan el CSV, comprueban sus filas, cuentan cada legislatura y hacen las dos uniones con Afinidades, la buena y la mala. Dan lo mismo en los dos lenguajes.

<!-- datos.codigo.reproduce -->
Reproducen cifras de este sitio: las sesiones, filas y palabras de cada legislatura, y los 64 meses con sesión.

También reproducen febrero de 1933, el mes de Casas Viejas: 16 sesiones. Ese mes suma 1.843 filas.

Sus filas reúnen 574.317 palabras.

<!-- datos.codigo.archivos -->
Necesitan dos archivos en la misma carpeta: `2REP_Diaries.csv`, de THQCMI, y `representative_metadata.tab`, de CGOCUS. Los dos piden el formulario de Dataverse.

<!-- datos.codigo.r.rotulo -->
R, sin paquetes

<!-- datos.codigo.r -->
```r
# El CSV depositado (THQCMI V2.0): «;» de separador, UTF-8, todos los campos entre comillas.
d <- read.csv2("2REP_Diaries.csv", fileEncoding = "UTF-8")
stopifnot(nrow(d) == 107551)

# SALVEDAD. Una fila es lo que el Diario imprime entre dos fórmulas de orador, no un discurso.
# La Presidencia va a nombre de quien preside. nwords cuenta trozos separados por el carácter
# espacio. Una sesión es (date, num_session): num_session vuelve a 1 en cada legislatura.
ses <- unique(d[, c("legislature", "date", "num_session")])
t <- data.frame(sesiones = c(table(ses$legislature)),
                filas    = c(table(d$legislature)),
                palabras = c(tapply(d$nwords, d$legislature, sum)))
print(t)

mes <- substr(d$date, 1, 7)
cat("meses con sesión:", length(unique(mes)), "\n")
feb <- d[mes == "1933-02", ]
cat("febrero de 1933:", nrow(unique(feb[, c("date", "num_session")])), "sesiones,",
    nrow(feb), "filas,", sum(feb$nwords), "palabras\n")

# Afinidades Elegidas (CGOCUS V1.1): una ficha por diputado Y legislatura.
a <- read.delim("representative_metadata.tab", fileEncoding = "UTF-8")
names(a)[names(a) == "id_dip"] <- "rep_id"

# MAL: solo por el diputado. Cada fila se repite una vez por legislatura de su diputado.
mal <- merge(d, a, by = "rep_id", all.x = TRUE)
cat("unión solo por el id:", nrow(mal), "filas\n")

# BIEN: por diputado y legislatura. El censo de CGOCUS llama 1933-1936 a la que aquí es 1933-1935.
d$legislatura <- ifelse(d$legislature == "1933-1935", "1933-1936", d$legislature)
bien <- merge(d, a, by = c("rep_id", "legislatura"), all.x = TRUE)
sin <- bien[!is.na(bien$rep_id) & is.na(bien$nombre_completo), ]
cat("unión por id y legislatura:", nrow(bien), "filas;", nrow(sin), "filas y",
    nrow(unique(sin[, c("rep_id", "legislatura")])), "pares sin ficha en CGOCUS\n")
```

<!-- datos.codigo.python.rotulo -->
Python, con pandas

<!-- datos.codigo.python -->
```python
import pandas as pd

# El CSV depositado (THQCMI V2.0): «;» de separador, UTF-8, todos los campos entre comillas.
d = pd.read_csv("2REP_Diaries.csv", sep=";", dtype={"rep_id": "Int64"})
assert len(d) == 107551

# SALVEDAD. Una fila es lo que el Diario imprime entre dos fórmulas de orador, no un discurso.
# La Presidencia va a nombre de quien preside. nwords cuenta trozos separados por el carácter
# espacio. Una sesión es (date, num_session): num_session vuelve a 1 en cada legislatura.
ses = d[["legislature", "date", "num_session"]].drop_duplicates()
t = pd.DataFrame({"sesiones": ses.groupby("legislature").size(),
                  "filas": d.groupby("legislature").size(),
                  "palabras": d.groupby("legislature")["nwords"].sum()})
print(t)

mes = d["date"].str[:7]
print("meses con sesión:", mes.nunique())
feb = d[mes == "1933-02"]
print("febrero de 1933:", len(feb[["date", "num_session"]].drop_duplicates()), "sesiones,",
      len(feb), "filas,", feb["nwords"].sum(), "palabras")

# Afinidades Elegidas (CGOCUS V1.1): una ficha por diputado Y legislatura.
a = pd.read_csv("representative_metadata.tab", sep="\t").rename(columns={"id_dip": "rep_id"})

# MAL: solo por el diputado. Cada fila se repite una vez por legislatura de su diputado.
mal = d.merge(a, on="rep_id", how="left")
print("unión solo por el id:", len(mal), "filas")

# BIEN: por diputado y legislatura. El censo de CGOCUS llama 1933-1936 a la que aquí es 1933-1935.
d["legislatura"] = d["legislature"].replace({"1933-1935": "1933-1936"})
bien = d.merge(a, on=["rep_id", "legislatura"], how="left", validate="many_to_one")
sin = bien[bien["rep_id"].notna() & bien["nombre_completo"].isna()]
print("unión por id y legislatura:", len(bien), "filas;", len(sin), "filas y",
      len(sin[["rep_id", "legislatura"]].drop_duplicates()), "pares sin ficha en CGOCUS")
```

<!-- datos.codigo.copiar -->
[Copiar el código]

<!-- datos.codigo.salida.archivo -->
[Descargar la salida de los dos fragmentos]

<!-- datos.codigo.salida.rotulo -->
Salida, la misma en los dos, ejecutada el 23 de septiembre de 2026

<!-- datos.codigo.reejecuta -->
El exportador del sitio vuelve a ejecutar los dos fragmentos en cada compilación. Si su salida deja de coincidir con las cifras de estas páginas, la compilación falla.

> [nota de diseño] Los dos bloques se pintan en pestañas «R · Python» (`Pestanas`), con [Copiar] en cada una. La
> salida **no se teclea**: el exportador ejecuta estos dos bloques (los extrae de este archivo, entre las claves
> `datos.codigo.r` y `datos.codigo.python`), guarda su salida en `public/datos/fragmentos_salida.txt` con fecha,
> versiones y MD5, y la plantilla la pinta en `<pre>` bajo `datos.codigo.salida.rotulo`. Hoy corrieron con pandas
> 3.0.3 (con los avisos elevados a error) y R 4.5.2; salida en `docs/marcadores/fragmentos_salida.txt`. Las
> salvedades van dentro del código, como comentario. Los comentarios se traducen; el código, no.

---

## 8 · Cómo citar (`#citar`)

<!-- datos.citar.titulo -->
Cómo citar

<!-- datos.citar.entrada -->
Cite lo que usó y su edición. La cita de una figura lleva, además, su base y su fecha.

<!-- datos.citar.thqcmi -->
**La base.** La cita oficial de Harvard Dataverse, en texto, BibTeX o RIS. Termina en «Harvard Dataverse, V2».

<!-- datos.citar.cgocus -->
**Afinidades Elegidas.** Cópiela tal como la da Dataverse: dice «V1» y lleva un UNF, pero corresponde a la versión depositada, CGOCUS V1.1.

<!-- datos.citar.figura -->
**Una figura.** Su título, la dirección de su ancla, la edición de sus datos y la fecha de cálculo. Cada figura trae la suya en la pestaña Datos.

<!-- datos.citar.pasaje -->
**Un pasaje.** La fecha y el número de la sesión, y el id de la fila con su edición. Por ejemplo: Diario de Sesiones, 1 de octubre de 1931, sesión 48; THQCMI V2, fila 5424.

<!-- datos.citar.pasaje.2 -->
Si cita el Diario impreso, añada su número y la página. El explorador no da ni lo uno ni lo otro.

<!-- datos.citar.explorador -->
**El explorador.** Diga que sirve la edición v3, sin depositar. Su cita automática dice «V2», pero sus identificadores son de la v3.

<!-- datos.citar.pestana.texto -->
Texto

<!-- datos.citar.pestana.bibtex -->
BibTeX

<!-- datos.citar.pestana.ris -->
RIS

<!-- datos.citar.copiar -->
[Copiar la cita]

<!-- datos.citar.licencia -->
Las dos bases tienen licencia CC BY 4.0: puede usar, adaptar y redistribuir los datos si cita la fuente.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] Las citas **no se teclean**: `lib/cita.ts` las toma de la instantánea de Dataverse
> (`dv_thqcmi_cita.json`, `dv_cgocus_cita.json`, ya descargadas por `exportador/instantanea.py`). Formatos de
> referencia, comprobados hoy en la API pública (`…/versions/:latest-published/citation`, `/citation/BibTeX`,
> `/citation/RIS`): texto «Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona,
> Elena; Barreto Martín, Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic,
> 1931–1945", https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2»; BibTeX `@data{DVN/THQCMI_2026, …, version =
> {V2}, …}`; RIS `TY - DATA … ET - V2 … ER -`. La de CGOCUS termina en «Harvard Dataverse, V1,
> UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]». Pestañas Texto · BibTeX · RIS y [Copiar la cita]; sin JS, las tres en
> `<details>`. El ejemplo de pasaje usa la fila de Campoamor; el número y la fecha de sesión son literales permitidos.
> ↺ 1 (`comun.fija.diario`) cierra la sección.

---

## LÉAME de las figuras de Datos y Versiones (columnas de cada CSV)

> [nota de diseño] Las lee `src/pages/datos/leame-[fig]-[lang].txt.ts`: bajo COLUMNAS, cada columna del CSV de la
> figura con su definición (`fig.<id>.leame.col.<columna>`); una columna sin clave sale solo con su nombre.

<!-- datos.leame.columnas -->
Columnas

<!-- datos.leame.procedencia -->
Cada cifra del sitio, con su base, su fórmula y su fecha, está en procedencia.csv.

<!-- fig.F32.leame.col.columna -->
Nombre de la columna en el CSV depositado.

<!-- fig.F32.leame.col.tipo -->
Entero, texto o fecha (AAAA-MM-DD).

<!-- fig.F32.leame.col.vacios -->
Filas con la celda vacía.

<!-- fig.F32.leame.col.distintos -->
Valores distintos, sin contar el vacío.

<!-- fig.F32.leame.col.filas -->
Filas del CSV depositado.

<!-- fig.F32.leame.col.fila_5423 -->
Valor en la fila 5423: la Presidencia pide silencio (1 de octubre de 1931, sesión 48).

<!-- fig.F32.leame.col.fila_5424 -->
Valor en la fila 5424: Clara Campoamor empieza a hablar, en la misma sesión.

<!-- fig.F33.leame.col.recuento -->
Manera de contar: nwords, split, total, habla o tendencia.

<!-- fig.F33.leame.col.palabras -->
Palabras que da ese recuento.

<!-- fig.F33.leame.col.edicion -->
Edición sobre la que se cuenta: V2 (depositada) o v3 (explorador, sin depositar).

<!-- fig.F33.leame.col.diferencia_con_nwords -->
Diferencia con la suma de la columna nwords de la V2.

<!-- fig.F33.leame.col.codigo -->
Línea de pandas que lo reproduce sobre el CSV depositado, cuando la hay.

<!-- fig.F34.leame.col.caso -->
sin_ficha: el par no tiene ficha en Afinidades Elegidas; otro_partido: la tiene, con otro rótulo de partido.

<!-- fig.F34.leame.col.rep_id -->
Identificador del diputado (rep_id en la V2, id_dip en Afinidades Elegidas).

<!-- fig.F34.leame.col.nombre -->
Nombre del diputado según la tabla de grafías del sitio.

<!-- fig.F34.leame.col.legislatura_cgocus -->
Legislatura con el rótulo del censo de Afinidades Elegidas (1933-1936 donde la V2 dice 1933-1935).

<!-- fig.F34.leame.col.filas_v2 -->
Filas de la V2 de ese par que quedan sin atributos de Afinidades.

<!-- fig.F34.leame.col.party_v2 -->
Partido más frecuente del diputado en esa legislatura, en la V2.

<!-- fig.F34.leame.col.partido_cgocus -->
Partido del diputado en esa legislatura, en Afinidades Elegidas.

---

## 9 · Erratas y contacto (`#erratas`)

<!-- datos.erratas.titulo -->
Erratas y contacto

<!-- datos.erratas.texto -->
Si encuentra un error, díganos la fecha, el número de sesión, el id de la fila con su edición y lo que dice el Diario impreso. Si no sabe por dónde empezar, escriba también.

<!-- datos.erratas.acciones -->
[Avisar de una errata] [Escribirnos]

> [nota de diseño] [Avisar de una errata] → `ENLACES.erratas`; [Escribirnos] → `hrefContacto()`. Las dos dependen de
> decisiones del investigador: D-21 (repositorio `luz`, sitio en `rodrodr.github.io/luz/`, 23-09-2026) y `contacto`
> (`src/config/enlaces.ts`). Si faltara una, `tEnlaces` marcaría el enlace sin destino y la publicación fallaría. **No se dice** en esta página: «filtre por el campo de confianza»
> (el CSV no lo tiene), el título del formulario ni que exista una muestra.


<!-- ═══ diario.md ═══ -->

# Copy ES · El Diario de Sesiones (`/es/diario/`), F27 y F28

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el mismo de `sesiones.md`. Sigue la
> narrativa § 11 (manda sobre el plan, plantilla F) y el contrato de construcción. Unas 1.500 palabras de copy en
> `<main>` sin contar las listas de F27 y F28 (tope 1.600–2.000; con ellas, unas 1.850), en seis apartados con índice
> lateral.
>
> **Cifras** en `docs/marcadores/diario.md`; **citas** en `docs/marcadores/citas.md` (claves `diario.*`, `f27.*`,
> `f28.*` y dos de `figueres.*`), cada una comprobada letra a letra en su fila V2 y en su fila v3. Las claves con
> `.cita.` son texto del Diario (ver la cabecera de `sesiones.md`).
>
> **Correcciones y ampliaciones sobre la narrativa, comprobadas hoy:**
> - «(Campanilla.)» no está en la V2; se ponen «(Rumores.)», «(Risas.)» y «(Muy bien.)», que sí están;
> - las acotaciones de palabras quitadas por orden de la Presidencia son **cinco**, no tres: tres dicen «no se
>   consigna(n) por orden» y dos «no constan por orden» (V2 103250 y 105310). F28 marca cinco;
> - las órdenes con la fórmula son **ocho**, no siete: el 15-IV-1936 la Presidencia la da tres veces, y una dice «no
>   constarán esas palabras en el Diario» (V2 102486), que la búsqueda pegada no veía. F28 busca «no constará(n)» con
>   «el Diario» en la misma frase: diez filas (ocho órdenes, una petición y una ajena);
> - la cita de Maurín va sin tildes, como en el texto («Hay luz y taquigrafos, los taquigrafos recogeran eso»), y quien
>   apostilla «Pobres taquigrafos» es Comín, que el Diario nombra;
> - la raya de la Presidencia del 8-VI-1934 va pegada, como en el texto: «señores Diputados—no he visto…»;
> - la contradicción de Figueres la resuelve el propio corpus: una nota final dice que el extracto se obtuvo después,
>   en fotocopia (V2 107341 · v3 121465). Ya no queda pendiente del PDF;
> - no se dice que la de Galarza sea «la más conocida» (juicio sin fuente).

---

## 0. Cabecera

<!-- diario.meta.titulo -->
El Diario de Sesiones

<!-- diario.meta.descripcion -->
Qué recoge el Diario de Sesiones de las Cortes de la República, qué calla y cómo citar un pasaje: la fuente de Luz y Taquígrafos, dicha con sus límites.

<!-- diario.antetitulo -->
La fuente

<!-- diario.titulo -->
¿Qué recoge el Diario, y qué calla?

<!-- diario.entrada -->
«Luz y taquígrafos» es la promesa de que lo dicho en el pleno queda escrito. El Diario de Sesiones la cumple casi siempre.

<!-- diario.entrada.2 -->
Casi: la Presidencia podía mandar que unas palabras no constaran, y el taquígrafo no escribe lo que no oye. Esta página cuenta la fuente con sus límites, y cómo citarla.

> [nota de diseño] Índice lateral con los seis apartados (`diario.<sección>.titulo`: `que_es`, `series`, `luz`, `calla`, `habla`, `citar`, las de la plantilla). Figuras: F27 en el apartado 3 y F28 en
> el 4, con sus pestañas Lista · Datos. `NotaBases` (↺ 13) al pie: hay cifras de la v3.

---

## 1. ¿Qué es un Diario de Sesiones?

<!-- diario.que_es.titulo -->
¿Qué es un Diario de Sesiones?

<!-- diario.que_es.entrada -->
Es la versión impresa de cada sesión del pleno, turno a turno. De ella sale cada fila de la base.

> [nota de diseño] Fase 2 (grupo 4): bajo la entrada va el momento «Del Diario impreso a la fila» (`DiarioAFila`): un
> detalle de la p. 1353 del núm. 48, el escaneo del proyecto sin retocar (la tinta, en el color de tinta del sitio), con
> cuatro anotaciones al margen sacadas de la capa de texto del PDF, y las dos filas que salen de ese trozo de papel.
> Sustituye al prototipo P2 de three.js (véase `docs/peticiones/diario-metodo.md`). Claves `diario.que_es.facsimil.*`.

<!-- diario.que_es.facsimil.titulo -->
Del Diario impreso a la fila

<!-- diario.que_es.facsimil.pie -->
Diario de Sesiones de las Cortes Constituyentes, núm. 48, 1 de octubre de 1931, p. 1353 (detalle). El escaneo del proyecto, sin retocar: solo se ha quitado la columna de la izquierda.

<!-- diario.que_es.facsimil.alt -->
Detalle de una página impresa del Diario de Sesiones: la Presidencia pide a la Cámara que guarde silencio, y Clara Campoamor le pide que la escuche en silencio.

<!-- diario.que_es.facsimil.pagina -->
El número del Diario y su página: lo que se cita.

<!-- diario.que_es.facsimil.interrupcion -->
Una interrupción, dentro del turno de quien habla.

<!-- diario.que_es.facsimil.rotulo -->
El rótulo del orador abre el turno y corta la fila.

<!-- diario.que_es.facsimil.acotacion -->
Una acotación: lo que el taquígrafo oye en la sala.

<!-- diario.que_es.facsimil.filas -->
Las dos filas que salen de ese trozo de papel

<!-- diario.que_es.facsimil.filas.nota -->
Mismo texto, letra a letra, en la edición depositada y en la del explorador. Método cuenta qué trae cada columna.

<!-- diario.que_es.facsimil.col.id -->
Fila

<!-- diario.que_es.facsimil.col.speaker -->
Rótulo impreso

<!-- diario.que_es.facsimil.col.rep_name -->
Diputado, según la base

<!-- diario.que_es.facsimil.col.speech -->
Texto

<!-- diario.que_es.facsimil.col.nwords -->
Palabras

<!-- diario.que_es.rotulo -->
Cada turno empieza con el rótulo impreso del orador: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». Ese rótulo es el que corta las filas, cuando el etiquetado lo reconoce.

<!-- diario.que_es.acotaciones -->
Entre paréntesis, el taquígrafo anota lo que oye en la sala y no dice ningún orador: «(Rumores.)», «(Risas.)», «(Muy bien.)».

<!-- diario.que_es.interrupcion -->
Si alguien interrumpe, el taquígrafo lo anota entre paréntesis dentro del turno de quien habla:

<!-- diario.que_es.cita.interrupcion -->
«(El Sr. Guerra del Rio: Los cavernicolas hablan de pastel.)»

<!-- diario.que_es.cita.interrupcion.pie -->
En la fila de Victoria Kent, 1 de octubre de 1931 · V2 5419 · v3 6074

<!-- diario.que_es.interrupcion.2 -->
Por eso una fila puede llevar dentro la voz de otros.

<!-- diario.que_es.votaciones -->
En las votaciones nominales, el Diario imprime la lista de quién dijo sí y quién dijo no, con su total.

<!-- diario.que_es.sumario -->
Cada sesión lleva su sumario, y el Diario imprime también documentos leídos o adjuntos: proposiciones, dictámenes, cartas.

<!-- diario.que_es.v3 -->
La edición del explorador pone ese material en filas propias: 755 sumarios y 12.654 filas de comentarios del Diario (v3).

<!-- diario.que_es.v2 -->
La edición depositada no tiene filas de sumario; el resto de ese material va dentro de las filas de los oradores, a menudo de la Presidencia.

> [nota de diseño] «Las votaciones nominales» enlaza a `/{lang}/cortes/sesiones/#votaciones` ([Ver las votaciones],
> `comun.boton.ver_votaciones`). Ejemplo al margen, en mono: «V2 5453 · la lista del 1 de octubre de 1931, dentro de
> una fila de la Presidencia» (`diario.que_es.ejemplo`).

<!-- diario.que_es.ejemplo -->
Ejemplo: la lista del 1 de octubre de 1931 va, en la V2, dentro de una fila de la Presidencia (V2 5453). En la v3 tiene fila propia, de comentarios (v3 6110).

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

---

## 2. Las series del Diario

<!-- diario.series.titulo -->
Las series del Diario

<!-- diario.series.entrada -->
El corpus reúne cuatro series impresas: dos del Diario completo y dos de extractos oficiales.

<!-- diario.series.serie.constituyentes -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, del 14 de julio de 1931 al 3 de octubre de 1933: 405 sesiones.

<!-- diario.series.serie.cortes -->
Diario de las Sesiones de Cortes. Congreso de los Diputados, del 8 de diciembre de 1933 al 10 de julio de 1936: 336 sesiones.

<!-- diario.series.serie.guerra -->
Extracto oficial de las sesiones, del 1 de octubre de 1936 al 1 de febrero de 1939: nueve sesiones.

<!-- diario.series.serie.mexico -->
Extracto oficial de las sesiones de Cortes celebradas en México, de enero a noviembre de 1945: cinco sesiones.

<!-- diario.series.numero -->
Dentro de cada legislatura, el número del Diario es el de la sesión: el Diario núm. 48 de las Constituyentes es la sesión 48.

<!-- diario.series.verificada -->
Las páginas de una sesión se dan por verificadas cuando su numeración enlaza con la del Diario anterior y la del siguiente; si no enlaza, no se dan.

<!-- diario.series.extractos -->
Después de julio de 1936 no hay Diario completo, solo extractos oficiales.

<!-- diario.series.paginas -->
Las páginas del Diario están verificadas en 741 de las 755 sesiones: todas las anteriores a la guerra.

<!-- diario.series.total -->
Los archivos del proyecto suman 28.780 páginas digitalizadas.

<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

> [nota de diseño] Las cuatro series van como lista de calendario (nombre de la serie · recuento al margen), sin
> tarjetas. El sello `comun.sello.proyecto` va junto al apartado entero: series, páginas y recuento salen de
> `sessions.json`. «Comprobadas»: los estados `contiguous`, `verso_blank` y `corrected`; las catorce restantes,
> de octubre de 1936 a 1945, están `unverified`.

---

## 3. «Luz y taquígrafos», diez veces (F27)

<!-- diario.indice.luz -->
«Luz y taquígrafos»

<!-- diario.luz.titulo -->
«Luz y taquígrafos», diez veces

<!-- diario.luz.entrada -->
La fórmula pide que algo se trate en público y quede escrito. Aparece en diez filas de la base, entre 1931 y 1936.

<!-- diario.luz.escena -->
El 8 de junio de 1934 se discute un suplicatorio. La Presidencia recuerda la regla:

<!-- diario.luz.cita.secreta -->
«Con arreglo al Reglamento, los suplicatorios han de tratarse en sesión secreta;»

<!-- diario.luz.cita.secreta.pie -->
La Presidencia (Alba) · V2 71329 · v3 80305

<!-- diario.luz.escena.2 -->
Una voz interrumpe con tres palabras, que son una fila entera:

<!-- diario.luz.cita.grito -->
«Luz y taquigrafos.»

<!-- diario.luz.cita.grito.pie -->
El Diario la atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ» · V2 71330 · v3 80306. Sin tilde, como en la fila: así salió del reconocimiento óptico.

<!-- diario.luz.escena.3 -->
La base identifica a ese orador con el diputado de la CEDA por Badajoz Manuel Giménez Fernández. La Presidencia contesta:

<!-- diario.luz.cita.reglamento -->
«El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías…»

<!-- diario.luz.cita.reglamento.pie -->
La Presidencia (Alba) · V2 71331 · v3 80307

<!-- diario.luz.escena.4 -->
Prieto responde por los socialistas:

<!-- diario.luz.cita.prieto -->
«La minoría socialista no tiene inconveniente en que esto se discuta públicamente.»

<!-- diario.luz.cita.prieto.pie -->
Indalecio Prieto · V2 71332 · v3 80308

> [nota de diseño] La escena va entera, en cuatro filas seguidas del Diario (V2 71329–71332 · v3 80305–80308), con un
> filete fino entre ellas. El nombre de `diario.luz.escena.3` sale de la tabla de grafías (`rep_id` 456; D-22, adoptada
> el 23-09-2026): la base escribe «Manuel Jimenez Fernandez» y el Diario imprime «JIMÉNEZ FERNÁNDEZ»; la tabla da
> «Manuel Giménez Fernández», grafía probable, que se adopta. Que Alba diga no haber visto quién interrumpe es la
> salvedad de la atribución: se deja a la vista.

<!-- diario.luz.royo -->
En agosto de 1933, Royo Villanova la había atribuido a Maura:

<!-- diario.luz.cita.royo -->
«…aquí se liquida todo con luz y taquigrafos, como decía Maura…»

<!-- diario.luz.cita.royo.pie -->
Antonio Royo Villanova, 3 de agosto de 1933 · V2 57506 · v3 64595

<!-- diario.luz.royo.salvedad -->
La atribución es suya. De dónde viene la fórmula, este sitio no lo afirma.

<!-- diario.luz.maurin -->
La última vez es del 8 de julio de 1936, y la contestan desde los escaños:

<!-- diario.luz.cita.maurin -->
«Hay luz y taquigrafos, los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)»

<!-- diario.luz.cita.maurin.pie -->
Joaquín Maurín · V2 106747 · v3 120751

<!-- diario.luz.balbontin -->
Nadie la repite tanto como José Antonio Balbontín: tres de las diez filas son suyas.

<!-- diario.luz.lectura -->
Leídas una a una, en las diez la fórmula pide lo mismo: que algo se diga o se haga a la vista, y quede escrito.

> [nota de diseño] Aquí va F27 (§ 7 de este archivo). Las citas van sin tildes en «taquigrafos», como en el texto
> digitalizado; el título y la prosa las llevan.

---

## 4. Lo que el Diario calla (F28)

<!-- diario.calla.titulo -->
Lo que el Diario calla

<!-- diario.calla.entrada -->
Un diputado lo recuerda en 1934, al hablar del Reglamento de la Cámara:

<!-- diario.calla.cita.sainz -->
«…ese Reglamento determina que el Presidente puede incluso mandar callar a un Diputado, puede ordenar que no consten en el Diario de Sesiones sus palabras…»

<!-- diario.calla.cita.sainz.pie -->
Pedro Sainz Rodríguez, 5 de diciembre de 1934 · V2 77318 · v3 87096

<!-- diario.calla.formula -->
«No constará» o «no constarán», seguidas de «el Diario» en la misma frase, aparecen en diez filas de la base.

<!-- diario.calla.ordenes -->
De ellas, ocho son órdenes de la Presidencia.

<!-- diario.calla.ordenes.1936 -->
De esas órdenes, cinco son de abril a julio de 1936.

<!-- diario.calla.abril -->
El 15 de abril de 1936, tras una protesta de Calvo Sotelo, la Presidencia da la orden tres veces en pocos turnos. Varios diputados contestan:

<!-- diario.calla.cita.abril -->
«Eso no basta.»

<!-- diario.calla.cita.abril.pie -->
Varios diputados · V2 102492, dentro de la fila de la Presidencia · v3 115837

<!-- diario.calla.peticion -->
Otra es la petición de un diputado: Calvo Sotelo, el 3 de junio de 1936, pide que no consten unas palabras contra las «hermanas de la Caridad».

<!-- diario.calla.ajena -->
La que queda usa la fórmula en otro sentido, y no cuenta.

<!-- diario.calla.acotaciones -->
El taquígrafo lo anota también entre paréntesis. En cinco acotaciones, todas de mayo a julio de 1936, escribe que unas palabras «no se consignan» o «no constan» por orden de la Presidencia.

<!-- diario.calla.galarza -->
La del 1 de julio de 1936 corta a Galarza a media frase: la cuenta la puerta «La antesala».

<!-- diario.calla.prieto -->
No todos querían ese silencio. El 7 de febrero de 1933, Besteiro ordena que unas palabras no consten, y Prieto contesta:

<!-- diario.calla.cita.prieto -->
«Por mí, que consten.»

<!-- diario.calla.cita.prieto.pie -->
Indalecio Prieto · V2 45116 · v3 50467

> [nota de diseño] Aquí va F28 (§ 8 de este archivo). «La antesala» enlaza a `/{lang}/cortes/sesiones/antesala-1936/` (sin corchetes: no es un rótulo único).

<!-- diario.calla.tachado -->
No todo lo que se quita deja rastro. En febrero de 1935, un diputado protesta porque no encuentra en el Diario lo que dijo:

<!-- diario.calla.cita.tachado -->
«…eso se ha tachado en el Diario de Sesiones.»

<!-- diario.calla.cita.tachado.pie -->
Dionisio Cano López, 19 de febrero de 1935 · V2 82129 · v3 92599

<!-- diario.calla.tachado.2 -->
Es su queja; el Diario no permite comprobarla.

<!-- diario.calla.no_oye -->
Lo que el taquígrafo no oye tampoco queda. En 1.521 filas de la base, el Diario anota que alguien «pronuncia palabras que no se perciben».

<!-- diario.calla.no_oye.ejemplo -->
El 6 de mayo de 1936 pasan las dos cosas en un mismo pasaje:

<!-- diario.calla.cita.no_oye -->
«(Un Sr. Diputado pronuncia palabras que no se perciben)» … «Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.»

<!-- diario.calla.cita.no_oye.pie -->
Acotaciones en la fila de Calvo Sotelo · V2 103250 · v3 116697

<!-- diario.calla.ausencias -->
Lo que el Diario no recoge no existe para ninguna cuenta de la base.

<!-- diario.calla.ausencias.ibarruri -->
La frase que a veces se atribuye a Dolores Ibárruri el 16 de junio de 1936, «Este hombre ha hablado por última vez», no aparece en ninguna fila.

<!-- diario.calla.ausencias.barriga -->
Buscada en el corpus, «tiros a la barriga» no sale en 1933: la primera fila que la trae es un grito del 31 de mayo de 1934.

> [nota de diseño] Las dos ausencias enlazan a sus puertas (`antesala-1936` y `casas-viejas-1933`), donde van con su
> pie. «A veces se atribuye» espera su referencia [A] en la puerta de bibliografía; sin ella, la frase se queda en lo
> que prueba el corpus. Lo que otras fuentes cuentan del 9 de octubre de 1934 (narrativa § 11.4) NO va en la 0.1: no
> tiene aún referencia (`peticiones/sesiones.md`).

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

---

## 5. La fuente habla de sí misma

<!-- diario.habla.titulo -->
La fuente habla de sí misma

<!-- diario.habla.entrada -->
El Diario no solo recoge lo que se dice: también deja notas sobre sí mismo, y los diputados lo usan como registro.

<!-- diario.habla.nota -->
El volumen de la guerra se abre con una nota:

<!-- diario.habla.cita.volumen -->
«EN ESTE VOLUMEN FIGURAN LOS EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO.»

<!-- diario.habla.cita.volumen.pie -->
Nota del volumen, en el sumario del 1 de octubre de 1936 · solo en la edición del explorador, v3 121110

<!-- diario.habla.figueras -->
Sigue diciendo que de la sesión de Figueras «NO EXISTE DATO ALGUNO». Otra nota, al final del extracto de esa sesión, lo corrige:

<!-- diario.habla.cita.fotocopia -->
«Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión…»

<!-- diario.habla.cita.fotocopia.pie -->
Nota final del extracto del 1 de febrero de 1939 · V2 107341 · v3 121465

<!-- diario.habla.liberacion -->
La primera nota habla además de la «LIBERACION DE BARCELONA» del 26 de enero de 1939. Quién la escribió, y cuándo, está por cotejar en el volumen impreso.

<!-- diario.habla.mexico -->
La carátula del volumen de México avisa de lo que falta: de las reuniones de la Diputación Permanente allí, «no se dispone de los textos ni en forma de fotocopia».

<!-- diario.habla.mexico.pie -->
Carátula del volumen de México · solo en la edición del explorador, v3 121466

<!-- diario.habla.censura -->
Los diputados también defendían el Diario fuera de la Cámara. En febrero de 1935, Honorio Maura pide por escrito al ministro de la Gobernación que la censura cumpla un acuerdo de las Cortes:

<!-- diario.habla.cita.censura -->
«…que los textos integros tomados del Diario de Sesiones no sean tachados ni mutilados por aquélla…»

<!-- diario.habla.cita.censura.pie -->
Ruego escrito de Honorio Maura, 20 de febrero de 1935 · V2 82369, dentro de una fila de la Presidencia · v3 92880

<!-- diario.habla.registro -->
Los diputados también leen el Diario y lo citan: el «Diario de Sesiones» aparece en 1.508 filas de la base.

<!-- diario.habla.campoamor -->
Campoamor, el 1 de octubre de 1931, responde a un discurso que no oyó:

<!-- diario.habla.cita.campoamor -->
«En ausencia mía y leyendo el Diario de Sesiones, pude ver en él que un doctor hablaba aquí de que no había ecuación posible…»

<!-- diario.habla.cita.campoamor.pie -->
Clara Campoamor · V2 5424 · v3 6079

> [nota de diseño] Las dos notas del volumen se pintan una frente a otra, en mayúsculas como en el original. La
> puerta «Figueres» cuenta la sesión. `diario.habla.registro` cuenta filas V2 con «diario de sesiones» sobre el texto sin
> acentos: incluye también las órdenes de F28, que nombran el Diario.

---

## 6. Cómo citar un pasaje · ancla `#citar`

<!-- diario.citar.titulo -->
Cómo citar un pasaje

<!-- diario.citar.entrada -->
Cite el Diario, no la base. Dé la serie, el número, la fecha y las páginas. Si ha trabajado con la base, añada el id de la fila y su edición.

<!-- diario.citar.paginas -->
Número y páginas salen de los metadatos del proyecto. El explorador no los muestra, y después de julio de 1936 las páginas están sin verificar.

<!-- diario.citar.explorador -->
Si copia un pasaje desde el explorador, anote que la fila es de la v3: la cita que el explorador añade al copiar no dice la edición.

<!-- diario.citar.ejemplo -->
Ejemplo, con la fila de Campoamor:

<!-- diario.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, núm. 48, 1 de octubre de 1931, pp. 1347–1394 (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 5424.

> [nota de diseño] `diario.citar.cita` se pinta como cita copiable. Es `comun.cita.pasaje` rellenado con: diario = «Diario de Sesiones de
> las Cortes Constituyentes de la República Española»; numero = `sesion.1931-10-01-48.diario_num`; fecha = «1 de
> octubre de 1931»; paginas = `sesion.1931-10-01-48.paginas`; edicion = «edición depositada (V2)»; id =
> `cita.sufragio.campoamor.ciudadana.V2`. Con [Copiar la cita] (`comun.boton.cita`). Debajo, ↺ 4 y ↺ 1.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

---

## 7. F27 · «Luz y taquígrafos», diez veces (textos de la figura)

> [nota de diseño] Datos: `diario.json › f27` (exportador, módulo `diario.py`): las diez filas V2 con su par v3, fecha,
> orador según la base y el fragmento literal (`citas.md`, claves `f27.1`–`f27.10`). Línea de tiempo 1931–1936 con
> una marca por fila; los años sin marca no se colorean. Sin JS, la lista. Pestañas Gráfico · Tabla · Datos (la Tabla es
> la lista, con las citas enteras); la nota emergente va en tres líneas (`.nota.t` · `.nota` · `.nota.b`).

<!-- fig.F27.titulo -->
«Luz y taquígrafos», diez veces

<!-- fig.F27.pregunta -->
¿Cuándo invocaron los diputados la fórmula?

<!-- fig.F27.leyenda -->
Una marca por fila del Diario en que aparece «luz y taquígrafos», de 1931 a 1936.

<!-- fig.F27.nota.t -->
«⟦fragmento⟧»

<!-- fig.F27.nota -->
⟦fecha⟧ · ⟦orador⟧

<!-- fig.F27.nota.b -->
V2 ⟦v2⟧ · v3 ⟦v3⟧

<!-- fig.F27.orador.atribuido -->
«El Sr. JIMÉNEZ FERNÁNDEZ», según el Diario

<!-- fig.F27.meses.con -->
Mes con sesiones del pleno

<!-- fig.F27.meses.sin -->
Mes sin sesión

<!-- fig.F27.anota.grito -->
El 8 de junio de 1934, la fórmula es una fila entera: tres palabras.

<!-- fig.F27.anota.balbontin -->
tres de las diez son de José Antonio Balbontín, de 1932 y 1933.

<!-- fig.F27.anota.guerra -->
Ninguna después de julio de 1936: ni los extractos de la guerra ni los de México la traen.

<!-- fig.F27.tabla.col.fecha -->
Fecha

<!-- fig.F27.tabla.col.orador -->
Quién, según la base

<!-- fig.F27.tabla.col.fragmento -->
Lo que dice

<!-- fig.F27.tabla.col.filas -->
Filas V2 · v3

<!-- fig.F27.cita.1 --> «…fechorias, que no suelen hacerse con luz y taquigrafos…»
<!-- fig.F27.cita.1.pie --> 20-VII-1931 · Gabriel Franco · V2 420 · v3 472
<!-- fig.F27.cita.2 --> «…se discutiese ampliamente con luz y taquigrafos y en presencia de todos los Sres. Diputados de las demás minorías…»
<!-- fig.F27.cita.2.pie --> 9-IV-1932 · José Antonio Balbontín · V2 23898 · v3 26612
<!-- fig.F27.cita.3 --> «…la máxima garantía es la oposición libre, con luz y taquigrafos…»
<!-- fig.F27.cita.3.pie --> 3-V-1932 · José Antonio Balbontín · V2 24658 · v3 27477
<!-- fig.F27.cita.4 --> «…yo aquí he levantado mi voz, con luz y taquigrafos, contra los pistoleros…»
<!-- fig.F27.cita.4.pie --> 19-VII-1933 · José Antonio Balbontín · V2 55902 · v3 62718
<!-- fig.F27.cita.5 --> «…aquí se liquida todo con luz y taquigrafos, como decía Maura…»
<!-- fig.F27.cita.5.pie --> 3-VIII-1933 · Antonio Royo Villanova · V2 57506 · v3 64595
<!-- fig.F27.cita.6 --> «Luz y taquigrafos.»
<!-- fig.F27.cita.6.pie --> 8-VI-1934 · el Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ» · V2 71330 · v3 80306
<!-- fig.F27.cita.7 --> «…no hay ningún reparo, ningún obstaculo ni ninguna dificultad para que se examine el presupuesto con luz y taquigrafos…»
<!-- fig.F27.cita.7.pie --> 13-XI-1934 · Abilio Calderón · V2 75263 · v3 84760
<!-- fig.F27.cita.8 --> «…que realiza el Parlamento suele decir que hacen falta “luz y taquigrafos”…»
<!-- fig.F27.cita.8.pie --> 29-I-1935 · Santiago Fuentes Pila · V2 79803 · v3 89910
<!-- fig.F27.cita.9 --> «El que está agazapado en su escaño, con luz y taquigrafos, naturalmente que no quiere valerse de nocturnidad ni de obscuridad de ninguna clase.»
<!-- fig.F27.cita.9.pie --> 22-XI-1935 · José Calvo Sotelo · V2 99859 · v3 112827
<!-- fig.F27.cita.10 --> «Hay luz y taquigrafos, los taquigrafos recogeran eso.»
<!-- fig.F27.cita.10.pie --> 8-VII-1936 · Joaquín Maurín · V2 106747 · v3 120751

<!-- fig.F27.salvedad -->
Búsqueda de la expresión sobre el texto sin acentos; las variantes mal leídas por el reconocimiento óptico no se cuentan. El origen de la fórmula no se afirma aquí.

<!-- fig.F27.alt -->
Línea de tiempo de 1931 a 1936 con diez marcas, una por cada fila en que un diputado dice «luz y taquígrafos». La lista está en la pestaña «Lista».

<!-- fig.F27.leame.que_mide -->
Las filas de la base en que aparece la expresión «luz y taquígrafos», con su fecha, su orador según la base y el fragmento.

<!-- fig.F27.leame.denominador -->
No hay denominador: es una lista. Las mismas filas en las dos ediciones, con sus dos ids.

<!-- fig.F27.leame.columnas -->
fecha, num_session, orador_rotulo, rep_id, rep_name, party, fragmento, id_V2, id_v3.

<!-- fig.F27.leame.salvedad -->
Expresión buscada sobre el texto sin acentos ni mayúsculas. El reconocimiento óptico puede haber roto alguna aparición: es una cota inferior.

---

## 8. F28 · Lo que el Diario calla (textos de la figura)

> [nota de diseño] Datos: `diario.json › f28` (módulo `diario.py`). Línea de tiempo 1931–1936 con trece marcas: las
> ocho órdenes (relleno), las cinco acotaciones (otro trazo, no solo otro color) y, en contorno, la petición de Calvo
> Sotelo. La fila ajena (V2 64659) NO se dibuja; va en la tabla, rotulada. Cambio sobre el plan, que decía diez
> marcas: son trece, porque las órdenes son ocho (la fórmula se busca con «el Diario» en la misma frase, no pegado:
> así entra «no constarán esas palabras en el Diario», V2 102486) y las acotaciones, cinco (tres «no se consigna(n)» y
> dos «no constan»).

<!-- fig.F28.titulo -->
Lo que el Diario calla

<!-- fig.F28.pregunta -->
¿Qué ordenó la Presidencia que no constara en el Diario?

<!-- fig.F28.leyenda.orden -->
Orden de la Presidencia: «no constarán en el Diario».

<!-- fig.F28.leyenda.acotacion -->
Acotación del taquígrafo: palabras que «no se consignan» o «no constan» por orden de la Presidencia.

<!-- fig.F28.leyenda.peticion -->
En contorno, un diputado que lo pide.

<!-- fig.F28.nota.t -->
«⟦fragmento⟧»

<!-- fig.F28.nota.orden -->
⟦fecha⟧ · orden de la Presidencia (⟦preside⟧)

<!-- fig.F28.nota.acotacion -->
⟦fecha⟧ · acotación del taquígrafo, en la fila de ⟦orador⟧

<!-- fig.F28.nota.peticion -->
⟦fecha⟧ · lo pide ⟦orador⟧

<!-- fig.F28.nota.b -->
V2 ⟦v2⟧ · v3 ⟦v3⟧

<!-- fig.F28.lupa -->
Del 16 de marzo al 10 de julio de 1936, día a día

<!-- fig.F28.anota.abril -->
El 15 de abril de 1936, la Presidencia da la orden tres veces en la misma sesión.

<!-- fig.F28.anota.primavera -->
De abril a julio de 1936: cinco de las ocho órdenes y las cinco acotaciones.

<!-- fig.F28.tabla.col.fecha -->
Fecha

<!-- fig.F28.tabla.col.tipo -->
Qué es

<!-- fig.F28.tabla.col.quien -->
Preside · en la fila de

<!-- fig.F28.tabla.col.fragmento -->
Lo que dice el Diario

<!-- fig.F28.tabla.col.filas -->
Filas V2 · v3

<!-- fig.F28.tipo.orden -->
Orden de la Presidencia

<!-- fig.F28.tipo.acotacion -->
Acotación del taquígrafo

<!-- fig.F28.tipo.peticion -->
Petición de un diputado

<!-- fig.F28.tipo.ajena -->
La fórmula en otro sentido; no se dibuja

<!-- fig.F28.cita.orden.1 --> «Que no constaran en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.1.pie --> 10-XII-1931 · Besteiro · V2 13605 · v3 15129
<!-- fig.F28.cita.orden.2 --> «Esas palabras, que no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.2.pie --> 7-II-1933 · Besteiro · V2 45115 · v3 50466
<!-- fig.F28.cita.orden.3 --> «…le aseguro que las palabras que ha pronunciado no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.3.pie --> 9-II-1933 · Besteiro · V2 45440 · v3 50818
<!-- fig.F28.cita.orden.4 --> «Esas palabras no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.4.pie --> 15-IV-1936 · Jiménez de Asúa · V2 102484 · v3 115828
<!-- fig.F28.cita.orden.5 --> «Ya se ha dicho que no constarán esas palabras en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.5.pie --> 15-IV-1936 · Jiménez de Asúa · V2 102486 · v3 115830
<!-- fig.F28.cita.orden.6 --> «Ya ha advertido la Presidencia que no constarán en el Diario de Sesiones esas palabras.»
<!-- fig.F28.cita.orden.6.pie --> 15-IV-1936 · Jiménez de Asúa · V2 102492 · v3 115836
<!-- fig.F28.cita.orden.7 --> «No constará en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.7.pie --> 6-V-1936 · Jiménez de Asúa · V2 103251 · v3 116698
<!-- fig.F28.cita.orden.8 --> «Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.8.pie --> 1-VII-1936 · Martínez Barrio · V2 106290 · v3 120222
<!-- fig.F28.cita.acotacion.1 --> «(El Sr. Muñoz de Zafra pronuncia palabras que no se consignan por orden del Sr. Presidente…»
<!-- fig.F28.cita.acotacion.1.pie --> 6-V-1936 · en la fila de Jesús Pabón · V2 103182 · v3 116626
<!-- fig.F28.cita.acotacion.2 --> «Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.»
<!-- fig.F28.cita.acotacion.2.pie --> 6-V-1936 · en la fila de Calvo Sotelo · V2 103250 · v3 116697
<!-- fig.F28.cita.acotacion.3 --> «(El orador pronuncia palabras que no constan por orden del Sr. Presidente…»
<!-- fig.F28.cita.acotacion.3.pie --> 16-VI-1936 · en la fila de Calvo Sotelo · V2 105310 · v3 119084
<!-- fig.F28.cita.acotacion.4 --> «(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)»
<!-- fig.F28.cita.acotacion.4.pie --> 16-VI-1936 · en la fila de Fernando Suárez de Tangil · V2 105324 · v3 119098
<!-- fig.F28.cita.acotacion.5 --> «(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)»
<!-- fig.F28.cita.acotacion.5.pie --> 1-VII-1936 · en la fila de Ángel Galarza · V2 106289 · v3 120221
<!-- fig.F28.cita.peticion --> «…ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.peticion.pie --> 3-VI-1936 · José Calvo Sotelo · V2 104406 · v3 118058
<!-- fig.F28.cita.ajena --> «…por parecerne injusto que no constara en el Diario de Sesión…»
<!-- fig.F28.cita.ajena.pie --> 21-II-1934 · Luis Rodríguez de Viguri · la fórmula en otro sentido; no se dibuja · V2 64659 · v3 72690

<!-- fig.F28.salvedad -->
Al menos: las variantes del reconocimiento óptico no se detectan. La búsqueda exacta de la frase en plural devuelve siete filas, que no son las mismas ocho.

<!-- fig.F28.alt -->
Línea de tiempo de 1931 a 1936 con ocho órdenes de la Presidencia, cinco acotaciones del taquígrafo y una petición de un diputado. La lista está en la pestaña «Lista».

<!-- fig.F28.leame.que_mide -->
Las filas en que la Presidencia ordena que unas palabras no consten en el Diario, las acotaciones que lo anotan y una petición de un diputado.

<!-- fig.F28.leame.denominador -->
No hay denominador: es una lista construida leyendo las filas una a una. La columna `tipo` dice orden, acotación, petición o ajena.

<!-- fig.F28.leame.columnas -->
fecha, num_session, tipo, preside, orador_fila, fragmento, id_V2, id_v3.

<!-- fig.F28.leame.salvedad -->
Cota inferior: la búsqueda no ve las variantes que el reconocimiento óptico escribió mal, ni otras fórmulas para lo mismo.

---

## Anexo A · Recuentos y comprobaciones (no se publica)

- **Palabras de copy en `<main>`** (§ 0–6, sin rótulos de figura ni pies en mono): unas 1.500; con las listas de F27
  y F28, que se leen sin JS, unas 1.850. Tope 1.600–2.000.
- **Frases de más de 30 palabras:** ninguna en la prosa; las citas largas del Diario no cuentan.
- **Palabras vetadas:** ninguna. «Presidencia» se usa como cargo. «Defiende» solo aparece dentro de ↺ 6.
- **Cifras tecleadas en prosa:** ninguna fuera de las citas; las series, las palabras del grito y las órdenes de 1936
  van con marcador (`fuente.series.*`, `cita.diario.grito.palabras`, `f28.ordenes.1936`).


<!-- ═══ explorador.md ═══ -->

# Copy ES · El explorador (`/[lang]/explorador/`)

> **Fase 2 (23-09-2026, grupo 6).** Antetítulos de sección convertidos en asientos con su base (regla del asiento de
> DESIGN.md); claves nuevas de figura (`fig.F17.leyenda.marca`, `.leyenda.salto`, `.ficha.*`, `fig.F29.leyenda.*`,
> `.nota`, `.tabla.col.*`). La captura `busqueda` abre la página, junto a la cabecera. Peticiones:
> `docs/peticiones/grupo6-explorador-afinidades.md`.
>
> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «El explorador». Sigue la
> narrativa §15 y la plantilla J del plan. Cada función que se describe está comprobada en el explorador publicado
> (`estudio/estudio_lyt_explorador.md`, el `LEEME.md` de las capturas y comprobaciones de hoy). Marcadores:
> `docs/marcadores/explorador.md`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `<!-- ↺ clave -->` repite una frase fija
> o un rótulo de `comun.md`, idéntico, en el sitio donde se pinta; `> [nota de diseño]` no es texto para el lector.
> Ninguna cifra va tecleada: todas van con marcador. Las claves cuelgan del prefijo de su sección en la plantilla
> (`explorador.encontrar.*`, `explorador.leer.*`…), para que `Seccion` las pinte en este orden.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (medido hoy, 22-09-2026):
> 1. **Tendencia.** La captura es la vista Constituyentes con febrero de 1933 fijado (`tendencia.png`). La del plan,
>    la vista «Todo», enseña el hito 18 del explorador, «Martínez Barrio, presidente» (discrepancia 31).
> 2. **Bibliotecas.** Las 31 reúnen 24.029 **entradas**, no intervenciones: son 20.443 intervenciones distintas,
>    porque una puede estar en varias. El copy dice «entradas».
> 3. **«Cada debate reúne sesiones enteras».** Vale para 25 de los 26 debates (todo lo que se habla en sus sesiones).
>    «Reforma agraria y Sanjurjada» es una selección. El copy lo dice con marcadores.
> 4. **«Recordar la base» no se promete (C4).** Falla el guardado automático en Chromium y en WebKit con perfiles
>    nuevos (prueba de hoy, repetida por el grupo de capturas con el Chromium completo).
> 5. **H1 en pregunta** (regla 1 del amontonamiento). La frase de la narrativa, «Busque, lea y cite…», abre la entrada.
> 6. **F29 va como lista de consultas copiables** (`fig.F29.*`), con el recuento de cada una y la fecha una sola vez.

---

## Metadatos

<!-- explorador.meta.titulo -->
El explorador

<!-- explorador.meta.descripcion -->
Busque, lea y cite lo que se dijo en las Cortes de la República, sin programar: qué hace el explorador, con capturas reales, y qué no hace.

> [nota de diseño] Índice lateral con las secciones (sus `*.titulo`) y banda fija (`BandaCTA`: ↺ 3 + [Descargar los
> datos]; [Abrir el explorador ↗] + `comun.fija.explorador`). La cabecera lleva el sello v3 y `<NotaBases>` (↺ 13): las
> cifras de búsqueda y de bibliotecas de esta página son de la v3.

## 8.1 Cabecera

<!-- explorador.antetitulo -->
v3 · 121.700 intervenciones · unos 106,6 MB comprimidos · base construida el 16-IX-2026

<!-- explorador.titulo -->
¿Qué hace el explorador, y qué no?

<!-- explorador.entrada -->
Busque, lea y cite lo que se dijo en las Cortes de la República. El explorador llega con los Diarios ya cargados, sin cuenta ni instalación.

<!-- ↺ comun.fija.local -->
Se abre en su navegador; lo que busca y guarda se queda en su equipo.

<!-- ↺ comun.boton.explorador -->
[Abrir el explorador ↗]

<!-- ↺ comun.fija.notabases -->
Esta cifra sale de la edición del explorador (v3, 121.700 filas, sin depositar); la depositada es la V2 (107.551 filas). Por qué hay dos →

<!-- explorador.idioma -->
El explorador está solo en español.

> [nota de diseño] La cabecera pinta, tras la entrada, las tres ↺ ancladas (garantía, botón y NotaBases). No hacen
> falta `explorador.garantia` ni `explorador.abrir`: son ↺ de `comun.md`. `explorador.idioma` se pinta solo en `/en/`;
> existe en las dos lenguas para que `check-i18n` vea las mismas claves.

<!-- explorador.indice.encontrar -->
Encontrar

<!-- explorador.indice.busquedas -->
Búsquedas de muestra

<!-- explorador.indice.leer -->
Leer

<!-- explorador.indice.bibliotecas -->
Bibliotecas

<!-- explorador.indice.coocurrencias -->
Coocurrencias

<!-- explorador.indice.menciones -->
Menciones

<!-- explorador.indice.llevar -->
Llevárselo, citado

<!-- explorador.indice.empezar -->
Cómo empezar

<!-- explorador.indice.limites -->
Lo que no hace

## 8.2 Primero, encontrar

<!-- explorador.encontrar.antetitulo -->
v3 · 108.291 de las 121.700 intervenciones son de habla

<!-- explorador.encontrar.titulo -->
Primero, encontrar

<!-- explorador.encontrar.entrada -->
Antes de leer hay que encontrar. El explorador busca por el texto, por quién habla y por el calendario.

<!-- explorador.p1.titulo -->
¿Qué se dijo?

<!-- explorador.p1.texto -->
Busca en el texto completo de cada intervención, sin distinguir tildes ni mayúsculas. Las comillas buscan la frase exacta; `+` exige las dos palabras y `|` admite cualquiera de ellas. Una línea bajo el buscador dice cómo ha entendido la consulta.

<!-- explorador.p2.titulo -->
¿Quién, cuándo y de qué grupo?

<!-- explorador.p2.texto -->
Filtra por fecha, número de sesión, legislatura, familia política, ideología, partido, diputado, distrito y longitud. «Solo lo que se habla» deja fuera el sumario de cada sesión. También lo que el Diario imprime sin que nadie lo diga: listas de votación, dictámenes leídos, el relato de la Mesa. Una barra reparte los resultados por ideología, y un clic en un tramo filtra.

<!-- explorador.p3.titulo -->
¿En qué momento del debate?

<!-- explorador.p3.texto -->
Cada resultado se abre como una página del Diario, con los turnos que la rodean o con la sesión entera. Lo cuenta el apartado siguiente.

<!-- explorador.p4.titulo -->
¿Cuándo se habló de esto?

<!-- explorador.p4.texto -->
Tendencia dibuja la frecuencia de uno o varios términos, mes a mes o año a año, por cada diez mil palabras. Los meses sin sesión salen rayados, y un clic en un mes lista sus intervenciones. Aquí el asterisco sí vale: `agrari*` reúne agraria, agrario, agrarios y las demás formas.

<!-- explorador.p4.hitos -->
Los hitos numerados los pone el explorador; no son una cronología revisada por este sitio.

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

> [nota de diseño] Las cuatro preguntas son `explorador.p1` a `p4` (la plantilla las pinta con `tambien`: el
> `.titulo` como H3). A dos columnas en escritorio, sin iconos. Capturas: `busqueda.png` bajo la primera;
> `tendencia.png` bajo la cuarta.

## 8.2 bis · Búsquedas de muestra (F29)

<!-- explorador.busquedas.antetitulo -->
v3 3a0d8b2d · recuentos del 22-IX-2026

<!-- explorador.busquedas.titulo -->
Búsquedas de muestra

<!-- explorador.busquedas.entrada -->
Son consultas reales, contadas en la edición del explorador. Cópielas, péguelas en el buscador y compare el recuento.

<!-- ↺ comun.fija.enlace -->
El explorador no abre una búsqueda desde un enlace: cópiela y péguela en su buscador (tecla /).

<!-- fig.F29.titulo -->
Consultas y recuentos

<!-- fig.F29.pregunta -->
¿Qué devuelve el buscador con consultas reales?

<!-- fig.F29.que_mide -->
Cuántas intervenciones devuelve cada consulta en el buscador del explorador, con y sin «Solo lo que se habla».

<!-- fig.F29.denominador -->
Las 121.700 intervenciones de la edición del explorador (v3); con «Solo lo que se habla», 108.291.

<!-- fig.F29.voto_femenino.consulta -->
"voto femenino"

<!-- fig.F29.voto_femenino.recuento -->
20 intervenciones.

<!-- fig.F29.voto_femenino.nota -->
La frase exacta, entre comillas.

<!-- fig.F29.voto_mujer.consulta -->
"voto de la mujer"

<!-- fig.F29.voto_mujer.recuento -->
28 intervenciones.

<!-- fig.F29.voto_mujer.nota -->
La misma idea, con otras palabras.

<!-- fig.F29.voto_union.consulta -->
"voto femenino" | "voto de la mujer"

<!-- fig.F29.voto_union.recuento -->
40 intervenciones.

<!-- fig.F29.voto_union.nota -->
Las dos frases, unidas con `|`. No suman sin más: 8 intervenciones traen las dos.

<!-- fig.F29.casas_viejas.consulta -->
"casas viejas"

<!-- fig.F29.casas_viejas.recuento -->
375 intervenciones.

<!-- fig.F29.casas_viejas.nota -->
El nombre aparece por primera vez el 1 de febrero de 1933. Con «Solo lo que se habla», 316.

<!-- fig.F29.divorcio.consulta -->
divorcio

<!-- fig.F29.divorcio.recuento -->
531 intervenciones.

<!-- fig.F29.divorcio.nota -->
Una sola palabra. Con «Solo lo que se habla», 454.

<!-- fig.F29.reforma_agraria.consulta -->
"reforma agraria"

<!-- fig.F29.reforma_agraria.recuento -->
2.028 intervenciones.

<!-- fig.F29.reforma_agraria.nota -->
Con comillas, la frase exacta. Sin comillas basta con que estén las dos palabras: 2.125.

<!-- fig.F29.estatuto.consulta -->
"estatuto de cataluña"

<!-- fig.F29.estatuto.recuento -->
724 intervenciones.

<!-- fig.F29.estatuto.nota -->
Con «Solo lo que se habla», 493: el resto son sumarios y comentarios del Diario.

<!-- fig.F29.catolica.consulta -->
"España ha dejado de ser católica"

<!-- fig.F29.catolica.recuento -->
6 intervenciones.

<!-- fig.F29.catolica.nota -->
La de Azaña, del 13 de octubre de 1931, sale en el puesto 4: la lista se ordena por relevancia, salvo que usted elija la fecha.

<!-- fig.F29.salvedad -->
Recuentos del 22 de septiembre de 2026 sobre la base del explorador con huella 3a0d8b2d; cambian si cambia esa base.

<!-- fig.F29.alt -->
Lista de consultas para el buscador del explorador, cada una con su número de intervenciones y una nota.

<!-- fig.F29.leyenda.habla -->
Lo que se habla

<!-- fig.F29.leyenda.resto -->
Sumarios y comentarios del Diario

<!-- fig.F29.leyenda.lectura -->
La barra entera es el recuento del buscador; su tramo en oro, lo que queda con «Solo lo que se habla». Todas van a la misma escala.

<!-- fig.F29.nota -->
⟦n⟧ intervenciones · ⟦habla⟧ con «Solo lo que se habla» · ⟦resto⟧ de sumarios y comentarios

<!-- fig.F29.tabla.col.consulta -->
Consulta

<!-- fig.F29.tabla.col.n -->
Intervenciones

<!-- fig.F29.tabla.col.habla -->
Solo lo que se habla

<!-- fig.F29.tabla.col.resto -->
Sumarios y comentarios

<!-- fig.F29.tabla.col.fechas -->
Primera y última

> [nota de diseño] F29 es una **lista tipográfica**, no un gráfico. Cada entrada: la consulta en `<code>` seleccionable
> (`.consulta`, un literal de código que se copia tal cual), su `.recuento`, [Copiar la consulta] (nace oculto; lo
> destapa la isla) y su `.nota`. ↺ 5 va **una vez**, sobre la lista (arriba, tras `explorador.busquedas.entrada`), no en
> cada entrada. La fecha va una vez, en la salvedad. Datos descargables: `busquedas.csv` (id, consulta, n, habla) con su
> LÉAME (`fig.F29.que_mide`, `.denominador`, `.salvedad`). Si el componente usa `restoDe(lang, 'fig.F29')`, estas
> claves ya salen en su orden.

## 8.3 Leer como en el Diario

<!-- explorador.leer.antetitulo -->
Capturas del 22-IX-2026 · sesión 48, 1-X-1931

<!-- explorador.leer.titulo -->
Leer como en el Diario

<!-- explorador.leer.entrada -->
Encontrar es la mitad del trabajo; la otra mitad es leer. El explorador enseña cada intervención como una página del Diario, dentro de su sesión.

<!-- explorador.leer.lector -->
El lector trae el rótulo del orador, desarrollado («La señorita CAMPOAMOR»), y aparte el literal que imprimió el Diario («La Srta. CAMPOAMOR:»); además, la sesión, la fecha, el partido y el distrito. Los párrafos van numerados para poder citarlos. Debajo, el hilo de la sesión enseña los turnos anteriores y los siguientes.

<!-- explorador.leer.acotaciones -->
Las acotaciones del Diario van señaladas por clase: los aplausos en verde, los rumores en teja, los gestos y las risas en gris.

<!-- explorador.leer.corrida -->
«Sesión corrida» abre la sesión entera, de principio a fin, con la intervención enmarcada en su sitio.

<!-- explorador.leer.careo -->
«Carear» pone dos intervenciones frente a frente, cada una con su propio desplazamiento. En la misma sesión propone réplicas por alusión al apellido o al cargo, por interrupción transcrita, por cercanía en el debate y por distancia política.

<!-- explorador.leer.careo_limite -->
Son propuestas, no diálogos probados, y el propio explorador lo advierte. A veces propone como réplica el sumario de la sesión o los comentarios del Diario, que no son palabras de nadie.

<!-- explorador.leer.mismo -->
«Mismo diputado» busca intervenciones del mismo orador, en otras sesiones, con un vocabulario parecido.

> [nota de diseño] Es la sección central: más aire y las cuatro capturas de lectura (`lector`, `acotaciones`,
> `corrida`, `careo`) en fila de dos en escritorio. ↺ 8 va pegada al pie de `corrida` (se repite abajo, tras su pie).

## 8.4 Después, enfocar: las bibliotecas

<!-- explorador.bibliotecas.antetitulo -->
v3 · 31 bibliotecas · 24.029 entradas

<!-- explorador.bibliotecas.titulo -->
Después, enfocar: las bibliotecas

<!-- explorador.bibliotecas.entrada -->
Un corpus entero no es una pregunta. Una biblioteca sí.

<!-- explorador.bibliotecas.que_es -->
Una biblioteca es su propia selección de intervenciones sobre un asunto. La reúne con búsquedas, la afina leyendo y la guarda con sus notas y etiquetas.

<!-- explorador.bibliotecas.guardar -->
Se guarda en su navegador. Para compartirla o tener una copia aparte, se exporta a un archivo `.2replib`.

<!-- explorador.bibliotecas.proyecto -->
El explorador trae 31 bibliotecas preparadas por el proyecto. Son debates, selecciones de sesiones, los discursos principales y una de anécdotas y amenazas. Se añaden desde «Mis bibliotecas › Añadir bibliotecas del proyecto…». En ese diálogo, cada debate lleva delante «Debate · »; este sitio lo nombra sin él.

<!-- explorador.bib.entradas -->
Reúnen 24.029 entradas; una misma intervención puede estar en más de una biblioteca.

<!-- explorador.bibliotecas.f17 -->
El gráfico las sitúa en el tiempo: un carril por biblioteca y una marca por sesión, mayor cuantas más entradas trae.

<!-- explorador.bibliotecas.enteras -->
veinticinco de los 26 debates reúnen sus sesiones enteras, todo lo que se habla en ellas. Por eso el del sufragio femenino trae también la pena de muerte y la huelga de Telefónica.

<!-- explorador.bibliotecas.lexico -->
Sobre una biblioteca se calcula su léxico: las palabras que la distinguen del resto del corpus, medidas con el G² de Dunning y el log-ratio.

> [nota de diseño] F17 (base v3) va tras `explorador.bibliotecas.f17`; las capturas `bibliotecas` (talla media) y
> `lexico`, tras `explorador.bibliotecas.lexico`.

### F17 · Las bibliotecas del proyecto, en el tiempo

<!-- fig.F17.titulo -->
Las bibliotecas del proyecto, en el tiempo

<!-- fig.F17.pregunta -->
¿Qué trae el explorador ya preparado, y cuándo ocurrió?

<!-- fig.F17.que_mide -->
Las sesiones que reúne cada biblioteca del proyecto, con sus entradas por sesión.

<!-- fig.F17.denominador -->
Las 31 bibliotecas que ofrece el explorador, con 24.029 entradas.

<!-- fig.F17.leyenda.discursos -->
Discursos

<!-- fig.F17.leyenda.debates -->
Debates

<!-- fig.F17.leyenda.sesiones -->
Sesiones

<!-- fig.F17.leyenda.anecdotas -->
Anécdotas y amenazas

<!-- fig.F17.nota -->
⟦nombre⟧ · ⟦entradas⟧ entradas en 755 sesiones · del ⟦desde⟧ al ⟦hasta⟧

<!-- fig.F17.nota.sesion -->
⟦nombre⟧ · ⟦fecha⟧, sesión ⟦num⟧ · ⟦entradas⟧ entradas

<!-- fig.F17.ficha.oradores -->
Quién tiene más palabras, sin la Presidencia

<!-- fig.F17.ficha.copiar -->
[Copiar el nombre del debate]

<!-- fig.F17.ficha.copiar_bib -->
[Copiar el nombre de la biblioteca]

<!-- fig.F17.ficha.como -->
En el explorador: «Mis bibliotecas › Añadir bibliotecas del proyecto…», y marque esta.

<!-- fig.F17.tabla.col.nombre -->
Biblioteca

<!-- fig.F17.tabla.col.grupo -->
Grupo

<!-- fig.F17.tabla.col.entradas -->
Entradas

<!-- fig.F17.tabla.col.sesiones -->
Sesiones

<!-- fig.F17.tabla.col.desde -->
Desde

<!-- fig.F17.tabla.col.hasta -->
Hasta

<!-- fig.F17.salvedad -->
Una intervención puede estar en más de una biblioteca. Las selecciones de sesiones traen también los sumarios y los comentarios del Diario; los debates, no.

<!-- fig.F17.alt -->
Carriles horizontales sobre los años 1931 a 1945, uno por biblioteca del proyecto, agrupados en discursos, debates, sesiones y anécdotas; cada sesión es una marca, mayor cuantas más entradas trae.

<!-- fig.F17.leyenda.marca -->
Cada marca es una sesión; su altura crece con las entradas que trae (con su raíz cuadrada), y las sesiones con pocas entradas llevan una altura mínima. La más alta, ⟦max⟧.

<!-- fig.F17.leyenda.salto -->
De marzo de 1939 a diciembre de 1944, sin sesiones: el eje se corta.

<!-- fig.F17.abrir -->
Ver su ficha

<!-- fig.F17.ficha.resumen -->
⟦entradas⟧ entradas en 755 sesiones, del ⟦desde⟧ al ⟦hasta⟧.

<!-- fig.F17.ficha.enteras -->
Reúne sus sesiones enteras: todo lo que se habla en ellas.

<!-- fig.F17.ficha.seleccion -->
Es una selección: solo los tramos de cada sesión que tratan del asunto.

<!-- fig.F17.ficha.acta -->
Trae el acta entera: también el sumario y los comentarios del Diario (⟦n⟧ entradas).

<!-- fig.F17.ficha.descripcion -->
Lo que dice el explorador, sin sus referencias internas

<!-- fig.F17.ficha.criterio -->
Es el nombre que le da el explorador; su criterio no se describe aquí.

<!-- fig.F17.ficha.en_explorador -->
En el explorador se llama «⟦nombre⟧».

<!-- fig.F17.ficha.palabras -->
⟦n⟧ palabras

<!-- fig.F17.ficha.cerrar -->
Cerrar la ficha

> [nota de diseño] F17: un carril por biblioteca, en cuatro grupos (`fig.F17.leyenda.*`, en ese orden), sobre el eje
> 1931–1945; marca por sesión con tamaño por entradas. Nota emergente con `fig.F17.nota` (carril) o
> `fig.F17.nota.sesion` (marca). Un clic abre la ficha: descripción **sin rutas internas** (el exportador quita las
> frases «Selección y fichas: docs/…» y «Ficha B2 en docs/…»), los cinco con más palabras sin la Presidencia
> (`fig.F17.ficha.oradores`, con la grafía de `grafias.json`) y [Copiar el nombre del debate] con `fig.F17.ficha.como`.
> Los nombres de las bibliotecas van tal cual los da el explorador; sus claves (`L2-B2`…) no se enseñan. Tabla y Datos
> en pestañas; sin JS, carriles y tabla. Comprobado: las tres selecciones de sesiones traen 226, 493 y 25 filas de
> sumario o comentarios; los 26 debates, ninguna.

## 8.5 Coocurrencias

<!-- explorador.coocurrencias.titulo -->
Coocurrencias: de qué se habla dentro de una biblioteca

<!-- explorador.coocurrencias.que_es -->
¿Qué palabras aparecen juntas? El explorador toma el vocabulario característico de la biblioteca y calcula qué términos comparten intervención. Donde esa red se agrupa, propone un tema candidato.

<!-- explorador.coocurrencias.temas -->
Cada tema trae sus términos, cuántas intervenciones lo contienen y qué parte del texto ocupa. Usted lo revisa en la lista, lo marca o lo busca en todo el corpus.

<!-- explorador.coocurrencias.partidos -->
Cada tema lleva también un eje de partidos: cuánto usa cada uno ese vocabulario, en veces la media. Es un eje de temas, no un eje ideológico.

<!-- explorador.coocurrencias.lector -->
En el lector, la opción «Tema» tiñe cada término del color de su tema.

<!-- explorador.coocurrencias.metodo -->
El método está a la vista, con sus parámetros, y los mismos parámetros dan el mismo resultado. La red se calcula y se exporta; no se dibuja.

<!-- explorador.coocurrencias.aviso -->
En una biblioteca de sesiones enteras, no todos los temas son del debate: en las del sufragio salen también la pena de muerte y la huelga.

> [nota de diseño] Captura `coocurrencias` a todo lo ancho, tras `explorador.coocurrencias.partidos`.

## 8.6 Menciones

<!-- explorador.menciones.titulo -->
Menciones: quién nombra a quién

<!-- explorador.menciones.que_es -->
En un debate, los oradores se nombran unos a otros. El explorador reconoce esas menciones y las cuenta entre partidos, por cada diez mil palabras.

<!-- explorador.menciones.solo_matriz -->
También dibuja una red y unos focos de conversación. Aquí no los enseñamos: en este ejemplo toman nombres mal leídos por personas distintas.

<!-- explorador.menciones.limites.titulo -->
Antes de leer la tabla

<!-- explorador.menciones.limites.tono -->
Dice quién nombra a quién, no si lo hace a favor o en contra.

<!-- explorador.menciones.limites.focos -->
Los focos de conversación no son coaliciones.

<!-- explorador.menciones.limites.precision -->
La precisión que declara se midió a mano en otros parlamentos, no en este corpus. No cuenta las referencias indirectas, como «su señoría».

<!-- explorador.menciones.limites.cargos -->
Los cargos citados sin nombre, como «el señor ministro», se quedan sin atribuir.

<!-- explorador.menciones.limites.externos -->
Un nombre mal leído, o escrito de otra forma, cuenta como una persona «externa» a la Cámara.

> [nota de diseño] Decisión D-17 (a): solo la matriz entre partidos (captura `menciones`), con este bloque de límites
> en recuadro con filete. Sin la red, sin «externas» y sin focos. Ninguna figura interactiva.

## 8.7 Llevárselo, citado

<!-- explorador.llevar.titulo -->
Llevárselo, citado

<!-- explorador.llevar.formatos -->
Exporta los resultados a CSV, a un documento legible en Markdown, a JSON y a una lista de referencias. Las bibliotecas se exportan, además, en `.2replib`.

<!-- explorador.llevar.en_cada -->
Cada archivo lleva la cita del corpus. En el CSV va en las líneas de cabecera y en dos columnas de cada fila.

<!-- explorador.llevar.copiar_pasaje -->
Si copia un pasaje con el teclado, el portapapeles se lleva también la fuente.

<!-- explorador.llevar.aviso -->
La cita que pone el explorador dice «V2», pero sus datos y sus identificadores son de la v3. Para volver al archivo depositado, anote la fecha y el número de sesión.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- explorador.llevar.enlace -->
[Ver cómo citar cada edición]

> [nota de diseño] `explorador.llevar.aviso` es el aviso de D-18, decidida el 23-09-2026 (opción b): el aviso se queda
> en esta página, sin marca de pendiente, porque cambiar el explorador está fuera de este trabajo. Se retira solo si el
> autor corrige un día la cita del explorador. [Ver cómo citar cada edición] →
> `/{lang}/datos/versiones/#citar`. Capturas `exportar` (talla media) y `sobre` (talla estrecha, recortada antes de
> «Construido»). Los segmentos finales evitan `cita` y `copiar`, que `lectura.ts` pinta como cita y como botón.

## 8.8 Cómo empezar

<!-- explorador.empezar.titulo -->
Cómo empezar

<!-- explorador.empezar.paso1 -->
**Abra el explorador en un ordenador.** No pide cuenta ni formulario: los Diarios vienen con él.

<!-- explorador.empezar.paso2 -->
**Espere a que prepare la base.** Descarga unos 106,6 MB comprimidos y construye la base en su navegador.

<!-- explorador.empezar.paso3 -->
**Busque.** La tecla / lleva al buscador, e Intro lanza la consulta.

<!-- explorador.empezar.botones -->
[Abrir el explorador ↗] [Descargar los datos]

> [nota de diseño] Tres pasos en fila en escritorio y en columna en el móvil. Sin tiempos de carga: dependen del
> equipo. **Sin «Recordar la base»** mientras no se cierre C4. [Descargar los datos] va a `/{lang}/datos/#empezar`.

## 8.9 Lo que pide, y lo que no hace

<!-- explorador.limites.titulo -->
Lo que pide, y lo que no hace

<!-- explorador.no_hace.equipo -->
Pide un ordenador, no un teléfono: en una pantalla estrecha, el lector no cabe.

<!-- explorador.no_hace.significado -->
No busca por significado: encuentra las palabras tal como están escritas. Para las variantes, únalas con `|`.

<!-- explorador.no_hace.operadores -->
El buscador no admite el asterisco, NOT ni la búsqueda por proximidad. El asterisco solo vale en Tendencia.

<!-- explorador.no_hace.mismo_diputado -->
«Mismo diputado» compara palabras, no significados, aunque la ayuda hable de parecido por significado.

<!-- explorador.no_hace.cabecera -->
La sesión corrida no da el número del Diario, las páginas, la Presidencia ni el Gobierno, aunque la ayuda lo anuncie.

<!-- explorador.no_hace.filtros -->
No filtra por sexo ni por tipo de sesión.

<!-- explorador.no_hace.nombres -->
Escribe los nombres de los diputados sin tildes, como están en la base.

<!-- explorador.no_hace.palabras -->
La ayuda, Tendencia y el Léxico dan totales de palabras distintos, porque cuentan de maneras distintas.

<!-- explorador.no_hace.enlace -->
[Ver cómo se cuentan las palabras]

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] Sección `explorador.limites` (su título) con `tambien: no_hace`. Lista literal, sin iconos. Las
> claves `explorador.no_hace.*` son las únicas donde `check-i18n`
> admite «por significado», «NOT», «proximidad» y la cabecera de sesión con «Diario», «páginas», «Presidencia» o
> «Gobierno». [Ver cómo se cuentan las palabras] → `/{lang}/datos/#palabra` (F33). ↺ 7 y ↺ 1 cierran la página: la
> plantilla no debe pintarlas otra vez a mano.

## Pies y textos alternativos de las capturas

> [nota de diseño] Doce capturas de `src/assets/explorador/` (grupo «capturas»; `LEEME.md` con URL, fecha, `build_id`
> `1857031ae8c04b3d` y sha256 del corpus servido), en tema claro sobre `--placa`. El archivo se llama como su clave:
> `busqueda`, `tendencia`, `lector`, `acotaciones`, `corrida`, `careo`, `bibliotecas`, `lexico`, `coocurrencias`,
> `menciones`, `exportar`, `sobre`. Tallas: `bibliotecas` y `exportar`, media; `sobre`, estrecha; el resto, ancha. La
> fecha común de las capturas la pone `comun.captura.pie`.

<!-- explorador.img.busqueda.pie -->
`"voto femenino" | "voto de la mujer"`: 40 intervenciones, del 1 de septiembre de 1931 al 15 de diciembre de 1933. Encima de la lista, su reparto por ideología.

<!-- explorador.img.busqueda.alt -->
La búsqueda de «voto femenino» o «voto de la mujer» en el explorador: 40 intervenciones, su reparto por ideología y los resultados con la frase resaltada.

<!-- explorador.img.tendencia.pie -->
«Casas viejas» mes a mes en las Constituyentes: nada en enero de 1933, porque no hubo sesiones. En febrero, 114 intervenciones, contando sumarios y comentarios. Con «Solo lo que se habla» y «aplicar filtros», 102.

<!-- explorador.img.tendencia.alt -->
El panel Tendencia con «casas viejas» mes a mes en las Constituyentes: enero de 1933 rayado, sin sesiones, y la nota de febrero de 1933 con 114 intervenciones.

<!-- explorador.img.lector.pie -->
Clara Campoamor, 1 de octubre de 1931, en el lector: el rótulo del Diario, la ficha de la intervención y los párrafos numerados.

<!-- explorador.img.lector.alt -->
El lector del explorador con la intervención de Clara Campoamor del 1 de octubre de 1931: el rótulo «La señorita CAMPOAMOR», su ficha y el primer párrafo numerado.

<!-- explorador.img.acotaciones.pie -->
La misma intervención, de cerca: los aplausos en verde, un gesto en gris y los rumores en teja, como los anotó el Diario.

<!-- explorador.img.acotaciones.alt -->
Tres párrafos de la intervención de Campoamor en el lector: una acotación de aplausos en verde, un gesto en gris y un bloque de rumores en teja.

<!-- explorador.img.corrida.pie -->
La sesión corrida, con la intervención de Campoamor enmarcada en su sitio.

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- explorador.img.corrida.alt -->
La sesión corrida del 1 de octubre de 1931 en el explorador, con la intervención de Clara Campoamor enmarcada en oro como intervención de referencia.

<!-- explorador.img.careo.pie -->
Campoamor frente a Victoria Kent: una réplica propuesta, no un diálogo probado. Arriba, las demás propuestas, entre ellas el sumario y los comentarios del Diario.

<!-- explorador.img.careo.alt -->
El careo del explorador: a la izquierda, la intervención de Clara Campoamor; a la derecha, la de Victoria Kent, marcada como réplica propuesta; arriba, las demás propuestas.

<!-- explorador.img.bibliotecas.pie -->
Las bibliotecas del proyecto, en el diálogo que las añade a las suyas.

<!-- explorador.img.bibliotecas.alt -->
El diálogo del explorador que añade las bibliotecas preparadas por el proyecto, con la del sufragio femenino, de 770 intervenciones, marcada.

<!-- explorador.img.lexico.pie -->
El léxico de las sesiones del sufragio femenino, 30 de septiembre y 1 de octubre de 1931, frente al resto del corpus. «Pena de muerte» sale justo detrás de «mujer»: son las sesiones enteras.

<!-- explorador.img.lexico.alt -->
La tabla de léxico de la biblioteca del sufragio femenino: «mujer» encabeza la lista y «pena de muerte» va justo detrás.

<!-- explorador.img.coocurrencias.pie -->
Un tema candidato de las sesiones del sufragio, con sus términos y los partidos según cuánto usan ese vocabulario.

<!-- explorador.img.coocurrencias.alt -->
Un tema candidato de las sesiones del sufragio, «mujer española, mujer, femenina»: sus términos y un eje con los partidos según cuánto usan ese vocabulario.

<!-- explorador.img.menciones.pie -->
Menciones entre partidos en las sesiones del sufragio, por cada diez mil palabras. La diagonal es lo que cada partido se nombra a sí mismo.

<!-- explorador.img.menciones.alt -->
Tabla de menciones entre partidos en las sesiones del sufragio, por cada diez mil palabras, con la casilla de cada partido consigo mismo recuadrada.

<!-- explorador.img.exportar.pie -->
Exportar una búsqueda: el CSV lleva la cita en sus líneas de cabecera y en cada fila.

<!-- explorador.img.exportar.alt -->
El diálogo de exportar del explorador: CSV con el texto completo, y un recuadro que explica que el archivo lleva la cita al principio y en cada fila.

<!-- explorador.img.sobre.pie -->
El panel «Sobre este corpus»: la cita dice V2, y el archivo que sirve es la v3, sin publicar.

<!-- explorador.img.sobre.alt -->
El panel «Sobre este corpus» del explorador: la cita termina en «Harvard Dataverse, V2» y, debajo, el archivo servido es la versión v3, resegmentada y sin publicar.


<!-- ═══ inicio.md ═══ -->

# Copy ES · Inicio (`/[lang]/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el copy de «comun», «inicio», la raíz y el
> 404. Sigue la narrativa §6 (beats 0–7) y la plantilla A del plan. Cifras: `docs/marcadores/inicio.md`, recalculadas
> hoy sobre la V2, la v3, los metadatos del proyecto y la API de Dataverse
> (`docs/marcadores/comprobar_comun_inicio.py`: 94 de 94 correctas).
>
> **Cómo se lee.** Formato de ParlaIbero (véase la cabecera de `comun.md`). Las claves son las que pinta
> `src/pages/[lang]/index.astro`: `inicio.portada.*`, `inicio.tesis.*` e `inicio.credencial`, y una sección por prefijo
> (`inicio.calendario`, `.votaciones`, `.fila`, `.puertas`, `.falta`, `.empezar`) que `Seccion` pinta en el orden del
> copy. `<!-- ↺ clave -->` repite una frase fija o un rótulo de `comun.md` justo donde debe caer; la redacción que manda
> es la de allí. Los botones finales de cada sección los pone la plantilla (`botones`), tras la figura.
>
> **Tests de rechazo (anexo A):** 700 palabras de copy de 700 (23-09-2026, con la nota al margen del grito; el anexo es del 22-09) · 114 de límites de 120 · la pregunta, en la primera
> pantalla · ningún límite antes del primer hallazgo · ninguna frase de más de 30 palabras.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (comprobado hoy sobre la fuente):
> 1. **El grito va sin tilde: «Luz y taquigrafos.»** Así está en la V2 71330 y en la v3 80306 (`speech` =
>    `Luz y taquigrafos.`). Las citas conservan las erratas del reconocimiento óptico y la tilde no cambia el sentido:
>    no lleva [sic]; para que no parezca errata del sitio, su asiento al margen lo explica (decisión 4 del
>    investigador, 23-09-2026). La marca del sitio, «Luz y Taquígrafos», conserva la suya.
> 2. **«Seis votaciones nominales» es una selección, no el total.** El texto de la V2 trae al menos 962 listas
>    encabezadas por «Señores que dijeron sí», en 387 sesiones. Inicio dice «cientos» y «aquí van seis».
>    **Fase 2 (corrector):** con la definición común de Sesiones («señores que dijeron / han dicho» + «sí / no», sobre
>    el texto sin acentos), son 1.023 filas en 405 sesiones. Inicio da ese total (`voto.listas.sesiones`) y dice que
>    las seis están «escogidas» (plan, anexo adversarial H3 y R1).
> 3. **La destitución del 7-IV-1936 sí sale del corpus.** La proposición pide declarar, «para los fines del último
>    párrafo del artículo 81», que no era necesario el decreto de disolución (V2 102304). Tras la votación, el Diario
>    dice que el Presidente de las Cortes «pasa a ser Presidente de la República» (V2 102368). El rótulo es el de
>    Sesiones.
> 4. **«Todo lo que se dijo en sesión pública quedó impreso» pasa a «se imprimía».** El propio sitio cuenta lo que la
>    Presidencia mandó borrar (F28, El Diario).
> 5. **«Posición»: la ideología no es siempre la del partido.** En la V2, las filas de la CEDA llevan D (7.656), CD
>    (255) y C (51); en 10 de 81 pares partido y legislatura hay más de un valor. La caja dice lo que sí es cierto: la
>    ideología clasifica al diputado, no lo que dijo.
> 6. **«Dentro de cada serie del Diario» pasa a «en cada legislatura».** La numeración recomienza por legislatura
>    (1–405, 1–276, 1–74) y una serie del proyecto, la del Diario de las Sesiones de Cortes, abarca dos.
> 7. **El movimiento 5 se titula «¿Qué sesión leo primero?»**, como la narrativa tras el anexo adversarial (V30): así
>    no casi repite el H1 de Sesiones, «¿Qué se dijo aquel día, y qué se votó?». Su botón es [Ver las sesiones y
>    votaciones]: [Ver las sesiones] llevaba al mismo destino con otro rótulo.
>
> **Fase 2 (corrector del copy, 22-09-2026).** Tesis como la narrativa §6 mov. 1: «Casi nunca fue secreto: sobre todo,
> inabarcable», con «salvo lo que la Presidencia mandó borrar» (P1-1), y la fila definida por lo que reconoce el
> etiquetado, con su fecha y su sesión (P2-3, H21); la puerta del Estatuto, «El discurso de Azaña, a nombre de otro»
> (P1-2); las votaciones, «escogidas» y con su total al lado (H3); «unos 112 MB comprimidos» en unidad decimal
> (P1-4, D-26 (a)); «Haga sus preguntas» (P2-2).
> 8. **Una magnitud por frase.** «Seis votaciones en cinco sesiones» se parte; «siete palabras y 1.460» se queda,
>    porque compara una sola magnitud.

---

## Metadatos

<!-- inicio.meta.titulo -->
Los Diarios de Sesiones de las Cortes, 1931–1945

<!-- inicio.meta.descripcion -->
Los Diarios de Sesiones de las Cortes de la Segunda República, 1931–1945, en una tabla abierta: 755 sesiones para contar, leer y citar.

> [nota de diseño] `Base.astro` antepone la marca en Inicio: «Luz y Taquígrafos · Los Diarios de Sesiones de las
> Cortes, 1931–1945». La descripción resuelta mide 135 caracteres (tope, 155).

## 0 · Portada

<!-- inicio.portada.pregunta -->
¿Cómo discutía una democracia que se estaba inventando?

<!-- inicio.portada.entrada -->
Lo que se dijo en las Cortes de la República, sesión a sesión, de 1931 a 1945.

<!-- inicio.portada.llamada -->
[Abrir el explorador ↗] [Descargar los datos]

<!-- inicio.portada.asiento -->
V2 · un CSV de 158,1 MB · CC BY 4.0 · Harvard Dataverse

> [nota de diseño] El H1 va en la primera pantalla, con el hemiciclo sin cambios al lado (textos en `comun.md` § 8:
> título, descripción, pie, crédito del plano, radios y minorías). Sin antetítulo ni `comun.hemiciclo.rotulo`.
> NINGUNA cifra sobre la figura. Destinos de la llamada, por orden: el explorador (el primario, en oro: decisión 2 del
> investigador, 23-09-2026) y `/{lang}/datos/#empezar`. Bajo los botones, el asiento de lo que se descarga con el
> secundario (pulido de la fase 2, `docs/revision_fase2/PULIDO.md`); 107.551 sigue fuera de la portada. Sin portada rotativa (D-5).

## 1 · Tesis (banda invertida: no hay otra en el sitio)

<!-- inicio.tesis.grito -->
«Luz y taquigrafos.»

<!-- inicio.tesis.grito.pie -->
8 de junio de 1934 · V2 71330 · v3 80306. Sin tilde, como en la fila: así salió del reconocimiento óptico.

<!-- inicio.tesis.contexto -->
tres palabras con que un diputado interrumpió a la Presidencia, que recordaba que los suplicatorios se tratan en sesión secreta.

<!-- inicio.tesis.inabarcable -->
Lo dicho en sesión pública se imprimía en el Diario, salvo lo que la Presidencia mandó borrar. Casi nunca fue secreto: sobre todo, inabarcable.

<!-- inicio.tesis.resolucion -->
Ahora el Diario es una tabla: una fila cada vez que el etiquetado reconoce la fórmula impresa de un orador, con su fecha y su sesión para volver al impreso.

<!-- inicio.tesis.remate -->
La lectura no se elimina: se aplaza.

<!-- inicio.credencial -->
755 sesiones · 1931–1945 · doi:10.7910/DVN/THQCMI · CC BY 4.0 · Universidad de Salamanca · Harvard Dataverse

> [nota de diseño] El grito, en cursiva grande (es lo que alguien dijo); su pie y la credencial, en mono. El aserto de
> citas compara el grito letra a letra, sin las comillas angulares, con la V2 71330 y la v3 80306. No se dice quién
> gritó: el Diario lo atribuye a «JIMÉNEZ FERNÁNDEZ», pero la Presidencia contesta que no ha visto quién interrumpía
> (V2 71331), y eso se cuenta en El Diario. Tampoco va 107.551 (la escala no es portada) ni «cada turno es una fila»:
> en la V2 hay turnos dentro de filas ajenas y documentos dentro de filas.

## 2 · ¿Cuándo se reunieron las Cortes?

<!-- inicio.calendario.titulo -->
¿Cuándo se reunieron las Cortes?

<!-- inicio.calendario.entrada -->
Hay 755 sesiones, del 14 de julio de 1931 al 9 de noviembre de 1945.

<!-- inicio.calendario.como -->
Cada bloque del calendario es una etapa y abre su página.

<!-- inicio.calendario.numeracion -->
En cada legislatura, la numeración de las sesiones no se salta ningún número.

<!-- inicio.calendario.cotejo -->
Que la última sesión del corpus sea la última que se imprimió no lo hemos cotejado.

<!-- inicio.calendario.guerra -->
Después del 18 de julio de 1936 quedan catorce sesiones, y son extractos oficiales, no el Diario íntegro.

<!-- inicio.calendario.palabras -->
Suman el 0,83 % de las palabras del corpus.

> [nota de diseño] El texto va antes de la figura (F01c): la frase dice qué buscar antes de que llegue el gráfico. El
> botón, [Ver las Cortes, etapa a etapa], lo pone la plantilla al final. Lo que la figura enseña sin decirlo: la Cámara
> constituyente se reunió casi todos los meses, la de 1933 tuvo huecos, tras julio de 1936 quedan marcas sueltas y
> entre 1939 y 1945 hay un salto rotulado. NO se dicen las causas de un mes vacío (receso, disolución, guerra): no
> salen del corpus. «Extractos oficiales» es la serie de esas catorce sesiones en los metadatos del proyecto (9 y 5).

### F01c · el calendario compacto (rótulos propios de Inicio)

<!-- inicio.f01c.titulo --> Las sesiones, mes a mes, por etapa
<!-- inicio.f01c.nota.etapa --> ⟦etapa⟧ · ⟦n⟧ sesiones · abre su página

<!-- inicio.f01c.alt -->
Calendario en rejilla de año por mes, agrupado por etapas. Cada mes con sesión lleva un tono según las palabras impresas; los meses sin sesión llevan contorno. Los mismos datos están en la pestaña Tabla.

<!-- inicio.f01c.anota.I --> El único mes sin sesión de las Constituyentes: enero de 1933.
<!-- inicio.f01c.anota.II --> El mes con más palabras: junio de 1934, con 870.822 en 19 sesiones.
<!-- inicio.f01c.anota.IV --> De la guerra quedan nueve sesiones en 29 meses, y son extractos oficiales.

> [nota de diseño] Fase 2 (grupo 1): tres anotaciones editoriales como mucho (DESIGN.md § Sistema de figuras), en la
> columna derecha de la figura en escritorio y entre filas en el móvil, cada una junto a la fila de año de la que habla:
> la del único mes vacío de la etapa I (1933), la del mes con más palabras (1934) y la de la guerra (1936). Solo dicen lo
> que el dato sostiene (`meses.json`, V2; `etapa.I.meses.sin_sesion` = 1). No cuentan en el tope de palabras de Inicio.

> [nota de diseño] F01c comparte familia con F01: sus leyendas, su nota de mes, el rótulo del salto y su tabla son los
> de `cortes.md` (`fig.F01.leyenda.*`, `fig.F01.nota.mes*`, `fig.F01.salto`, `fig.F01.tabla.*`), y la leyenda del tono
> es ↺ `comun.fija.tono`. Aquí van solo el título de Inicio, la nota del bloque de etapa (variables `⟦etapa⟧` y
> `⟦n⟧`) y el texto alternativo. Cinco bloques rotulados con `comun.etapa.<id>.corto` y `.anos`, con numeral romano;
> cada bloque es un enlace a su ficha. Cinco clases por cuantiles sin interpolar, con los cortes impresos. La ausencia
> nunca es un color. Sin barras por sesión y sin conmutador: eso es F01, en Las Cortes.

## 3 · ¿Qué se decidía allí?

<!-- inicio.votaciones.titulo -->
¿Qué se decidía allí?

<!-- inicio.votaciones.entrada -->
En al menos 405 sesiones, el Diario imprime votaciones nominales, con la lista de quien dijo sí y de quien dijo no.

<!-- inicio.votaciones.seleccion -->
Aquí van seis, escogidas, de 1931 a 1936.

<!-- inicio.votaciones.mujeres -->
El 1 de octubre de 1931, el artículo 34 del proyecto de Constitución, el del voto de las mujeres, se aprobó por 161 votos contra 121.

<!-- inicio.votaciones.salvedad -->
La base no trae el voto como variable: las listas están en el texto.

> [nota de diseño] «Al menos 405 sesiones»: las que tienen una fila con «señores que dijeron / han dicho» seguido de
> «sí» o «no» en el texto sin acentos de la V2 (1.023 filas; la misma definición que Sesiones). Es cota inferior: el
> reconocimiento óptico rompe algún encabezado, como el de la lista del Estatuto. NO se dice «siete
> votaciones»: el 141–106 del mismo 1 de octubre fue ordinaria y se cuenta en Sesiones. Tampoco la equivalencia con el
> art. 36 de la Constitución [EXT], ni quién votó qué (llega en la 0.2). La salvedad va al margen, tras la figura, y
> hace también de salvedad de F26 en Inicio. Botón final: [Ver las votaciones].

### F26 · las votaciones, en su versión de Inicio (rótulos propios)

<!-- inicio.f26.titulo --> Votaciones nominales, con el resultado que imprime el Diario
<!-- inicio.f26.v.161-121 --> Art. 34: el voto de las mujeres
<!-- inicio.f26.v.178-59 --> Art. 24: la cuestión religiosa
<!-- inicio.f26.v.368-466 --> La Constitución
<!-- inicio.f26.v.318-19 --> La Reforma agraria
<!-- inicio.f26.v.314-24 --> El Estatuto de Cataluña
<!-- inicio.f26.v.238-5 --> Art. 81: la destitución del Presidente de la República

<!-- inicio.f26.alt -->
Barras horizontales con los síes y los noes de cada votación nominal, por orden de fecha. Los mismos datos, con el texto literal del Diario, están en la pestaña Tabla.

> [nota de diseño] Es F26 sin la votación ordinaria del 141–106 y con rótulos cortos (`inicio.f26.v.<clave>` en lugar
> de `fig.F26.v.<clave>`); sus notas, su leyenda y su tabla son las de `sesiones.md` (`fig.F26.*`). Seis barras en
> orden de fecha: 1-X-1931, 13-X-1931, 9-XII-1931, 9-IX-1932 (dos) y 7-IV-1936. Línea de «mitad más uno» donde el
> Diario la imprime: 234 de 466, 232 de 462 y 209 de 417. Cada barra enlaza a su puerta si la tiene en la 0.1 (161–121
> → `sufragio-1931`; 178–59 → `cuestion-religiosa-1931`) y, si no, a su fila en la tabla de Sesiones.

## 4 · ¿Qué es una fila?

<!-- inicio.fila.titulo -->
¿Qué es una fila?

<!-- inicio.fila.presidencia -->
«Ruego a la Cámara que guarde silencio.»

<!-- inicio.fila.presidencia.pie -->
La Presidencia · V2 5423 · v3 6078

<!-- inicio.fila.campoamor -->
«Yo ruego a la Cámara que me escuche en silencio…»

<!-- inicio.fila.campoamor.pie -->
Clara Campoamor · V2 5424 · v3 6079

<!-- inicio.fila.dos -->
Son dos de las 107.551 filas de la edición depositada, una detrás de otra en la sesión del 1 de octubre de 1931.

<!-- inicio.fila.palabras -->
La de la Presidencia tiene siete palabras; la de Campoamor, 1.460.

<!-- inicio.fila.leccion -->
Contar filas no es contar discurso.

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] Composición tipográfica, sin figura: arriba, en pequeño, la Presidencia; debajo, en cursiva
> grande, Campoamor; cada una con su pie en mono (petición a la plantilla: hoy el pintor genérico las deja como
> párrafos). El aserto de citas compara las dos, sin comillas ni «…», con la V2 5423 y 5424 y la v3 6078 y 6079. NO se
> dice el orden en la sesión: cambia entre ediciones (V2 `order` 26; v3 `ord` 29; pantalla del explorador, «Orden 30»)
> y se explica en Datos. Botón final: [Ver qué trae cada columna].

## 5 · ¿Qué sesión leo primero?

<!-- inicio.puertas.titulo -->
¿Qué sesión leo primero?

<!-- inicio.puertas.entrada -->
Cada momento tiene su página, con sus citas y cómo leerlo entero en el explorador.

<!-- inicio.puertas.sufragio-1931.fecha --> 1-X-1931
<!-- inicio.puertas.sufragio-1931.que --> El voto de las mujeres
<!-- inicio.puertas.sufragio-1931.filas --> 395 filas (V2)
<!-- inicio.puertas.cuestion-religiosa-1931.fecha --> 13-X-1931
<!-- inicio.puertas.cuestion-religiosa-1931.que --> «España ha dejado de ser católica»
<!-- inicio.puertas.cuestion-religiosa-1931.filas --> 378 filas (V2)
<!-- inicio.puertas.estatuto-1932.fecha --> 27-V-1932
<!-- inicio.puertas.estatuto-1932.que --> El discurso de Azaña, a nombre de otro
<!-- inicio.puertas.estatuto-1932.filas --> 44 filas (V2)
<!-- inicio.puertas.casas-viejas-1933.fecha --> 2-II-1933
<!-- inicio.puertas.casas-viejas-1933.que --> Casas Viejas
<!-- inicio.puertas.casas-viejas-1933.filas --> 155 filas (V2)
<!-- inicio.puertas.pistola-1934.fecha --> 4-VII-1934
<!-- inicio.puertas.pistola-1934.que --> La pistola de Prieto
<!-- inicio.puertas.pistola-1934.filas --> 255 filas (V2)
<!-- inicio.puertas.antesala-1936.fecha --> 16-VI y 1-VII-1936
<!-- inicio.puertas.antesala-1936.que --> La antesala
<!-- inicio.puertas.antesala-1936.filas --> 159 y 125 filas (V2)
<!-- inicio.puertas.figueres-1939.fecha --> 1-II-1939
<!-- inicio.puertas.figueres-1939.que --> Figueres
<!-- inicio.puertas.figueres-1939.filas --> 16 filas (V2)
<!-- inicio.puertas.mexico-1945.fecha --> 17-VIII y 7–9-XI-1945
<!-- inicio.puertas.mexico-1945.que --> México
<!-- inicio.puertas.mexico-1945.filas --> 183 filas (V2)

<!-- inicio.puertas.salvedad -->
Que estén no valida su contenido: el acta digitalizada del 1 de octubre de 1931 perdió su final en el reconocimiento óptico.

> [nota de diseño] Registro de calendario (`RegistroPuertas`, familia «inicio»), no tarjetas: fecha en mono · qué
> pasó · filas en versalitas; cada línea enlaza a su puerta. Títulos y fechas iguales a los de `sesiones.md`
> (`sesiones.lista.<ruta>.*`), sin la línea de resumen. El título es el de la narrativa §10.3, «El discurso de Azaña, a
> nombre de otro»: «el discurso más largo» solo vale en la v3 y va, con su base, en el cuerpo de la puerta. La salvedad
> empieza por ↺ 9 letra a letra y la ata al ejemplo comprobado: filas V2 5788–5792 (cinco «Pido la palabra.»; la
> última acaba en «El Sr. Ministro de»), incidencia `truncated_end`. Las ocho puertas cubren doce sesiones: nunca
> «dieciséis sesiones». En México, la línea de filas no dice «en cuatro sesiones»: las cuatro fechas ya lo dicen, y a
> 375 px la columna de filas, que no se parte, desbordaba la página. Botón final: [Ver las sesiones y votaciones].

## 6 · ¿Qué no trae la base?

<!-- inicio.falta.titulo -->
¿Qué no trae la base?

<!-- inicio.falta.entrada -->
No trae estas columnas; habría que construirlas.

<!-- inicio.falta.tema -->
**Tema.** No hay columna de tema: cada búsqueda es una hipótesis suya.

<!-- inicio.falta.tono -->
**Tono.** Las acotaciones están en el texto; el tono no se mide.

<!-- inicio.falta.posicion -->
**Posición.** La ideología clasifica al diputado, no lo que dijo.

<!-- inicio.falta.voto -->
**Voto.** Las listas nominales están en el texto, no en una columna.

<!-- inicio.falta.afinidades -->
Una base derivada ya existe: Afinidades Elegidas, quién firmó con quién.

<!-- inicio.falta.usted -->
Aquí entra usted.

> [nota de diseño] Cuatro cajas vacías con filete discontinuo: el vacío es el contenido; el nombre en negrita, en mono
> (petición a la plantilla: hoy son párrafos). Sin iconos. Las cajas dicen lo que falta, no lo que se hizo con el
> prototipo de 1931. NINGUNA cifra de Afinidades en Inicio mientras siga abierta la D-3. Botón final: [Ver Afinidades
> Elegidas].

## 7 · ¿Por dónde empiezo?

<!-- inicio.empezar.titulo -->
¿Por dónde empiezo?

<!-- inicio.empezar.entrada -->
Elija por lo que ya sabe hacer.

<!-- ↺ comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- ↺ comun.fija.formulario.motivo -->
Con esos datos queremos saber quién usa la base y con qué fin, para poder mejorarla y comunicar novedades.

<!-- inicio.empezar.sin_programar -->
**Sin programar.** Los datos de cada figura, en su pestaña Datos, o el explorador: unos 106,6 MB comprimidos la primera vez, sin formulario.

<!-- ↺ comun.fija.explorador -->
Sirve la edición v3, sin depositar; pide un ordenador.

<!-- ↺ comun.boton.explorador --> [Abrir el explorador ↗]

<!-- inicio.empezar.programar -->
**Con R o Python.** El CSV depositado: 158,1 MB.

<!-- ↺ comun.boton.descargar --> [Descargar los datos]

<!-- inicio.empezar.redes -->
**Con métodos de redes.** Afinidades Elegidas: quién firmó con quién.

<!-- ↺ comun.boton.ver_afinidades --> [Ver Afinidades Elegidas]

<!-- inicio.empezar.remate -->
Los datos están publicados. Haga sus preguntas.

<!-- inicio.empezar.salvedad -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

> [nota de diseño] ↺ 3 y el motivo del formulario (D-20) van ENCIMA de la escalera. Tres peldaños, titulados
> por lo que la persona sabe hacer (`Salidas`: la negrita es el título), cada uno con su botón de rótulo único; el de
> «Con R o Python» lleva a Usar los datos (`#empezar`), donde se elige el archivo antes del formulario. Tras la
> escalera, la cita oficial tal como la da Dataverse, con su «V2», y [Copiar la cita] (la pinta la plantilla); luego
> el remate (D-24) y, al margen, ↺ 4 con la misma redacción: explica el doble id de la tesis y de la fila. «Unos
> 112 MB comprimidos» es lo que descarga el explorador (111.733.652 B), en unidad decimal: regla de la crítica mientras
> el investigador decide D-26, opción (a). En la unidad de Dataverse serían 106,6 MB. NO se dicen
> visitas ni descargas, ni «funciona sin conexión».

## Anexo A · Tests de rechazo (recuento del 22-09-2026)

Recuento con `docs/marcadores/contar_inicio.py` (rehecho por el corrector de la fase 2), sobre el texto resuelto con los valores de
`docs/marcadores/inicio.md`. Cuenta el copy de `<main>`: títulos, entradas, frases, citas con su pie, credencial,
registro de puertas, cajas, escalera, frases fijas y remate. No cuenta los rótulos de botón, los rótulos y notas de
las figuras, los textos alternativos, la cita oficial ni el motivo del formulario (D-20).

| movimiento | palabras | tope del plan | de ellas, límites |
|---|---:|---:|---:|
| 0 · Portada (con el pie del hemiciclo) | 61 | 60 | 0 |
| 1 · Tesis (con su pie y la credencial) | 105 | 90 | 7 |
| 2 · ¿Cuándo se reunieron las Cortes? | 86 | 100 | 24 |
| 3 · ¿Qué se decidía allí? | 74 | 90 | 14 |
| 4 · ¿Qué es una fila? | 85 | 90 | 12 |
| 5 · ¿Qué sesión leo primero? (con el registro) | 108 | 110 | 22 |
| 6 · ¿Qué no trae la base? | 72 | 70 | 0 |
| 7 · ¿Por dónde empiezo? (con la escalera) | 98 | 90 | 35 |
| **Total** | **689** | **700** | **114 de 120** |

- **Límites contados:** «salvo lo que la Presidencia mandó borrar», en la tesis; el cotejo de la numeración; «y son extractos oficiales, no el Diario íntegro»; la salvedad de
  las listas; ↺ 7; la salvedad de las puertas (↺ 9 con el acta truncada); ↺ 4 y ↺ «Sirve la edición v3, sin
  depositar; pide un ordenador». Ninguno va antes del primer hallazgo, que es el grito de la tesis.
- **Varios movimientos rozan su tope, y la página no lo pasa.** La tesis cuenta su pie (fecha e ids, 9 palabras) y la
  credencial (13), que son líneas de datos en mono; sin ellas son 83, y su texto es el de la narrativa §6. El 5 cuenta el registro de las ocho puertas y queda en su tope. El
  7 lleva enteras ↺ 3 y ↺ 4 (38 palabras de frases fijas que la narrativa pone ahí).
- **La primera pregunta**, el H1, va en la primera pantalla a 1.440 y a 375 px (comprobado con Playwright).
- **Ninguna frase pasa de 30 palabras.** La más larga es `inicio.tesis.resolucion` (30, con los dos puntos: la frase de la narrativa).
- **La descripción** resuelta mide 135 caracteres (tope, 155).


<!-- ═══ metodo.md ═══ -->

# Copy ES · Método (`/[lang]/metodo/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Método», «Usar los datos» y
> «Versiones». Sigue la narrativa §12 (diez preguntas de revisor) y la plantilla G del plan. Cubre, sin resumir, los
> diez temas del encargo: la fuente, la lectura óptica con sus recuentos, la limpieza y los turnos (apartado 02), el
> reconocimiento óptico (03), la vinculación en cascada y la revisión manual (04), habla y no habla (05), la
> resegmentación v3 (06), la auditoría de fechas de la V2 (07), los atributos (08) y lo que no afirma el corpus (09).
> Marcadores: `docs/marcadores/metodo.md`. Salida de las comprobaciones: `docs/marcadores/comprobaciones_metodo_datos.txt`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `⟦marcador⟧`. Las líneas de código son literales (como en ParlaIbero, `<code>` y `<pre>` quedan
> fuera de la auditoría de cifras). Los textos con varios párrafos o listas se pintan con `tBloques`; los que llevan
> [corchetes] de enlace, con `tEnlaces`, y por eso ninguna clave con enlace lleva código con corchetes.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (recalculado hoy sobre las fuentes):
> 1. **«649 primeros apellidos compartidos entre 773 diputados»** (04) sale del .docx no depositado y no se reproduce:
>    los 773 diputados que intervienen tienen 538 primeros apellidos distintos. Lo sustituye una cifra comprobada: 317
>    de los 773 comparten su primer apellido con otro diputado que interviene.
> 2. **«En 584 de las 755 sesiones presidió un vicepresidente»** (04): 584 son **fechas**. Por sesión (fecha y número),
>    son 586, con 10.025 filas, según el mismo analizador de etiquetas del explorador.
> 3. **«Las 147 restantes son ministros sin escaño»** (04) es la frase del README. Leídas una a una, 123 llevan la
>    fórmula de un ministerio; las demás son de secretarios, de la Presidencia sin nombre y fórmulas dañadas. Se dice así.
> 4. **«Unos 21.000 de un documento leído»** (06): la fila 55221 son 3.733 palabras de Prieto y 21.638 de tablas y
>    «documentos complementarios del discurso» que el Diario imprime con él. No se leyeron en voz alta.
> 5. **«Unos 730 turnos rescatados»** (06): la v3 servida (sha256 `3a0d8b2d…`) tiene exactamente 735 filas de esa clase
>    (108.291 de habla − 107.556 piezas de la V2). Se usa la cifra comprobada, la misma que declara Versiones (D-25).
> 6. **La reserva LightOnOCR** no se nombra: estaba configurada, pero las 29 páginas recuperadas al reintentar las
>    recuperó GLM-OCR y las 124 restantes fueron a Tesseract. El README no nombra LLaVA (lo nombra el .docx no
>    depositado); lo que el README dice y el código no hace es la «instrucción estructurada» al modelo y Jaro-Winkler.
> 7. **Casi siempre la Presidencia** (05, 06): los bloques que la v3 separa venían de una fila de la Presidencia en el
>    67 % de los casos, y los turnos rescatados en el 66 %. El copy dice «la mayoría», con el porcentaje en marcador.
>
> **Fase 2 (corrector del copy, 22-09-2026; REVISION_FASE1 y anexo adversarial del plan):**
> - la cola de la sesión 48 usa las claves de Sesiones, `ses.s48.cola*`, con su orden en pantalla (411–415, plan R20):
>   la familia `sesion.<clave>.cola*` no existe en el exportador (P1-3);
> - números tecleados (P2-9): «la sesión 77», «la sesión 321»; «E1 Sr.» y «escriba 77» van a la lista blanca de
>   `docs/marcadores/metodo.md`, que escribe `comprobar_metodo_datos.py`;
> - la sesión 321 (H13): la V1 la fechaba el 14 de julio de 1931 porque tomó la fecha de la portada del Tomo XX
>   (`erratas_fechas_V1.csv`, `AUDITORIA_FECHAS.md`); se dice así, no «la fecha de otra»;
> - la fila (01, H21): lo que el Diario imprime entre dos fórmulas de orador **que el etiquetado reconoce**;
> - «Sobre este corpus», en el panel lateral del explorador (P2-11);
> - [Ver qué trae cada columna] en F20: el rótulo único de ese destino (P2-12).

---

## Metadatos

<!-- metodo.meta.titulo -->
Método

<!-- metodo.meta.descripcion -->
Cómo se pasó del Diario impreso a 107.551 filas, qué falló, qué es habla y qué no, y qué no afirma la base. Cada apartado se puede comprobar.

> [nota de diseño] Índice lateral con los diez apartados (`metodo.indice.*`) y banda fija (`BandaCTA`): [Descargar los
> datos] con ↺ 3 y [Abrir el explorador ↗] con «Sirve la edición v3, sin depositar; pide un ordenador» (textos de
> `comun.md`). La página lleva `<NotaBases>` (↺ 13): los apartados 03, 05 y 06 citan cifras de la v3. Gramática de
> cada apartado (plan, «Cómo se evita el amontonamiento»): antetítulo en mono con su número (`NN`, lo da
> `apartados('metodo.')` a partir de las claves; no es copy) · H2 (`.titulo`) · entrada en
> serif grande (`.entrada`) · texto (`.texto`) · figura · salvedad al margen (`.salvedad`, ≤ 40 palabras) · Pruébelo
> doble (`.pruebelo.*`).

## Índice lateral

<!-- metodo.indice.titulo -->
En esta página

<!-- metodo.indice.01 -->
Qué es una fila

<!-- metodo.indice.02 -->
Del Diario a la fila

<!-- metodo.indice.03 -->
El reconocimiento óptico

<!-- metodo.indice.04 -->
Quién habla

<!-- metodo.indice.05 -->
Habla y no habla

<!-- metodo.indice.06 -->
Dos ediciones

<!-- metodo.indice.07 -->
Fechas corregidas

<!-- metodo.indice.08 -->
Partido, familia e ideología

<!-- metodo.indice.09 -->
Lo que no afirma

<!-- metodo.indice.10 -->
Documentación

## Cabecera

<!-- metodo.antetitulo -->
Método

<!-- metodo.titulo -->
¿Cómo se hizo, y dónde puede fallar?

<!-- metodo.entrada -->
Esta página no recorre el proceso etapa por etapa. Responde lo que preguntaría un revisor, y cada apartado acaba en algo que usted puede comprobar.

<!-- metodo.entrada.2 -->
Empieza por una fila concreta: la de Clara Campoamor el 1 de octubre de 1931, el día que se votó el sufragio de las mujeres.

<!-- metodo.pruebelo.rotulo -->
Pruébelo

<!-- metodo.pruebelo.rotulo.explorador -->
En el explorador

<!-- metodo.pruebelo.rotulo.codigo -->
En Python, sobre el CSV depositado

<!-- metodo.pruebelo.carga.texto -->
Cómo se carga el CSV depositado: las líneas de código lo suponen cargado como `d`

<!-- metodo.pruebelo.carga.codigo -->
```python
import pandas as pd
d = pd.read_csv("2REP_Diaries.csv", sep=";", dtype={"rep_id": "Int64"})
```

> [nota de diseño] `metodo.pruebelo.carga.*` va una sola vez, bajo la entrada, en un `<details>` rotulado «Cómo cargar
> el CSV». Cada Pruébelo tiene dos mitades: `.consulta` (literal que copia `CopiarConsulta`; si no hay consulta, la
> clave no existe y el componente solo pinta `.explorador`) con `.explorador` (instrucción, pintada con `tEnlaces`
> cuando lleva [Abrir el explorador ↗]) y `.codigo` (bloque de código, pintado con `tBloques`). La frase ↺ 5 la pone
> `CopiarConsulta`, una vez por página. Las consultas cuentan sobre la v3 y ninguna promete un recuento en pantalla.

---

## 01 · ¿Qué es una fila?

<!-- metodo.01.titulo -->
¿Qué es una fila?

<!-- metodo.01.entrada -->
Una fila es lo que el Diario imprime entre una fórmula de orador que el etiquetado reconoce y la siguiente.

<!-- metodo.01.texto -->
La fórmula es la que abre cada turno en el papel: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». Lo que va detrás, hasta la siguiente que el etiquetado reconoce, es el texto de una fila.

Las dos filas de la figura van seguidas en la sesión del 1 de octubre de 1931. En la primera, la Presidencia dice siete palabras: «Ruego a la Cámara que guarde silencio.»

En la segunda, Clara Campoamor dice 1.460. Empieza así: «Yo ruego a la Cámara que me escuche en silencio». Contar filas no es contar discurso.

El texto no está resumido ni lematizado. El orden se conserva, y el orden es información: primero la Presidencia pide silencio, después Campoamor lo pide para sí.

Cada fila lleva catorce columnas. Dicen la sesión y el lugar de la fila en ella, la fórmula impresa y el texto. Si se identificó al orador, añaden su diputado, su partido y su distrito.

> [nota de diseño] Aquí va **F20** (`fig.F20.*`): V2 5423 y 5424 frente a v3
> 6078 y 6079. Al pie de la figura, `fig.F20.enlace` → `datos/#columnas`.

<!-- metodo.01.salvedad -->
Una fila puede llevar dentro más de un turno, o un documento que nadie leyó en voz alta. Lo explica «Dos ediciones», más abajo.

<!-- metodo.01.pruebelo.consulta -->
"me escuche en silencio"

<!-- metodo.01.pruebelo.explorador -->
Busque la frase entre comillas y abra el resultado. El lector la numera «Orden 30 de 415»: es la misma fila, contada en la edición del explorador. [Abrir el explorador ↗]

<!-- metodo.01.pruebelo.codigo -->
```python
d[d.id.isin([5423, 5424])].T
```

---

## 02 · ¿Cómo se pasa del Diario impreso a la fila?

<!-- metodo.02.titulo -->
¿Cómo se pasa del Diario impreso a la fila?

<!-- metodo.02.entrada -->
En cinco pasos, cada uno con su cifra. Ninguno corrige a mano el texto.

<!-- metodo.02.texto -->
**La fuente.** Son 755 números del Diario de Sesiones del Congreso, escaneados en PDF desde su archivo histórico. Suman 28.780 páginas, según el recuento de los archivos del proyecto.

**La lectura.** Cada página se convirtió en imagen y la leyó un modelo de reconocimiento óptico, GLM-OCR. Lo que falló, y cómo se recuperó, se cuenta más abajo.

**La limpieza.** Un programa quitó de cada página la cabecera corrida, con su folio y su fecha, y el folio del pie. Después recompuso las palabras partidas por guion al final de línea.

También unió en párrafos las líneas cortas de las columnas del Diario. Ninguno de estos pasos corrige erratas de lectura.

**Los turnos.** Una expresión regular busca la fórmula impresa del orador: «El Sr.», «La Sra.», «La Srta.», «Los Sres.». También admite las variantes de lectura, como «Ei Sr.» o «E1 Sr.».

Cada fórmula debe llevar al menos una palabra de tres letras en mayúsculas. Ese filtro descartó 1.532 falsos positivos.

Quedaron 107.556 etiquetas de orador. El CSV tiene 107.551 filas; la diferencia de cinco no está documentada.

**La vinculación.** Cada fórmula se unió a un diputado, con su partido, su distrito y su ideología. Se cuenta en «Quién habla» y en «Partido, familia e ideología».

> [nota de diseño] Aquí va **F19** (`fig.F19.*`), cinco pasos en esquema horizontal numerado (apilado en el móvil),
> cada uno con su `<details>`. «Cinco pasos» es la estructura de la figura, no una cifra del corpus.

<!-- metodo.02.salvedad -->
Las páginas y los fallos de lectura salen de los archivos de trabajo del proyecto, que no están depositados.

<!-- metodo.02.pruebelo.explorador -->
Abra cualquier intervención. Bajo el nombre del diputado, «Consta en el diario como» da la fórmula impresa que abrió la fila. [Abrir el explorador ↗]

<!-- metodo.02.pruebelo.codigo -->
```python
d.speaker.value_counts().head(10)   # las fórmulas impresas más frecuentes
```

---

## 03 · ¿Qué falló en el reconocimiento óptico?

<!-- metodo.03.titulo -->
¿Qué falló en el reconocimiento óptico?

<!-- metodo.03.entrada -->
Ninguna página se quedó sin texto, pero no todas salieron a la primera.

<!-- metodo.03.texto -->
Cada página la leyó GLM-OCR, un modelo de visión que el proyecto ejecutó en sus propios equipos. Mientras el modelo escribía, un vigilante comprobaba si entraba en bucle, repitiendo el mismo texto.

Si entraba, la página se repetía con más variación. Pasó en 276 páginas.

En la primera pasada fallaron 153 páginas. Estaban repartidas en 131 sesiones.

GLM-OCR recuperó 29 al reintentarlas. Las 124 restantes se leyeron con Tesseract, un programa de reconocimiento clásico, con sus modelos de español moderno y antiguo.

Esas páginas de Tesseract están en 106 sesiones. Ninguna pasó después por una corrección automática.

<!-- metodo.03.texto.2 -->
Las erratas de lectura están en el texto y también en las fórmulas de orador: «El Sr. PERSIDENTE:», «El Sr. VICFPRESIDENTE».

Los metadatos de sesión del proyecto declaran dos incidencias. Las dos se ven en el corpus:

- La sesión 9, del 27 de julio de 1931, acaba en un bucle: repite «Sánchez Guerra, Ossorio y Gallardo» seis veces, dentro de la fila 976 de la V2.
- La sesión 48, del 1 de octubre de 1931, perdió el final. Sus cinco últimas filas repiten «Pido la palabra», y la última se corta en «El Sr. Ministro de».

Esas filas son las 5788–5792 de la V2 y las 6460–6464 de la v3. La resegmentación de la v3 no arregla ese final.

> [nota de diseño] Orden de la plantilla: `metodo.03.texto` · ↺ `comun.fija.ocr` (destacada) · `metodo.03.texto.2`
> · cita tipográfica con el texto literal de las cinco filas finales (de `citas.json`, leído letra a letra en V2 y
> v3) · pie ↺ 8 (`comun.fija.sesion48`).

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- metodo.03.cola.rotulo -->
Las cinco últimas filas de la sesión 48, tal como están en las dos ediciones

<!-- metodo.03.salvedad -->
Estas cifras salen de los archivos de trabajo del proyecto, que no están depositados. Las incidencias constan en sus metadatos de sesión.

<!-- metodo.03.pruebelo.explorador -->
Abra la sesión corrida de cualquier intervención del 1 de octubre de 1931 y baje hasta el final. Las órdenes 411 a 415 repiten la misma petición. [Abrir el explorador ↗]

<!-- metodo.03.pruebelo.codigo -->
```python
s48 = d[(d.date == "1931-10-01") & (d.num_session == 48)]
s48.tail(5)[["id", "speaker", "speech"]]
```

---

## 04 · ¿Quién habla?

<!-- metodo.04.titulo -->
¿Quién habla?

<!-- metodo.04.entrada -->
El Diario imprime el apellido del orador, casi nunca su nombre ni su partido. Unir cada fórmula a una persona es el paso más delicado.

<!-- metodo.04.texto -->
La dificultad se mide en la tabla de diputados del proyecto: 317 de los que intervienen comparten su primer apellido con otro.

Cada fórmula se buscó en la tabla de diputados del proyecto por pasos, del más estricto al más flexible:

1. los apellidos idénticos;
2. los apellidos impresos como comienzo de los completos;
3. el primer apellido;
4. un parecido aproximado entre apellidos, con un umbral de 0,82;
5. el mismo parecido, sobre el primer apellido.

Si coincidían varios diputados, decidía la legislatura. La Presidencia, los vicepresidentes y los ministros se resolvieron aparte, con el contexto de cada sesión.

El README depositado llama Jaro-Winkler a ese parecido. El código usa el de la biblioteca `difflib` de Python.

Después se revisaron a mano todas las filas. La revisión corrigió 367 asignaciones.

Así, el 99,86 % de las filas tiene diputado. Quedan 147 sin él.

El README dice que esas filas son de ministros sin escaño. Leídas una a una, 123 llevan, en efecto, la fórmula de un ministerio.

Las demás son de secretarios, de la Presidencia sin nombre o de fórmulas que la lectura dañó.

**La Presidencia tiene partido.** «El Sr. PRESIDENTE:» va al diputado que presidía, con su partido y su ideología. En 586 de las 755 sesiones, un vicepresidente ocupó la Presidencia algún tramo.

Por eso los presidentes de la Cámara encabezan cualquier recuento de palabras sin filtrar.

<!-- metodo.04.enlace -->
[Ver quién habla más según la edición]

> [nota de diseño] `metodo.04.enlace` → `datos/versiones/#quien-habla` (F07). La cifra de
> vicepresidentes cuenta sesiones por (fecha, número); son 584 fechas (nota 2 de la cabecera).

<!-- metodo.04.salvedad -->
Quien preside ordena el debate, no lo sostiene. Para contar oradores, quite antes la Presidencia.

<!-- metodo.04.pruebelo.consulta -->
"guarde silencio"

<!-- metodo.04.pruebelo.explorador -->
Busque la frase y abra un resultado de la Presidencia. La ficha la atribuye al diputado que presidía; «Consta en el diario como» dice solo «El Sr. PRESIDENTE:». [Abrir el explorador ↗]

<!-- metodo.04.pruebelo.codigo -->
```python
d[d.rep_id.isna()].speaker.value_counts()   # las filas sin diputado
```

---

## 05 · ¿Qué es habla y qué no?

<!-- metodo.05.titulo -->
¿Qué es habla y qué no?

<!-- metodo.05.entrada -->
Una fila corta suele ser trámite; una fila larga puede no ser habla.

<!-- metodo.05.texto -->
El 66,53 % de las filas de la V2 tiene 50 palabras o menos. La mediana es de catorce palabras.

Más de la mitad de esas filas breves son de la Presidencia: el 58,17 %.

En el otro extremo, ordene las filas de la más larga a la más corta y tome el primer 10 %. Ese tramo reúne el 74,5 % de las palabras.

Longitud no es importancia. Una fila breve puede ser una votación o una interrupción decisiva.

**Lo que no es habla.** El Diario imprime también lo que nadie dijo en voz alta: listas de votación, dictámenes, ruegos por escrito, tablas y el relato de la sesión.

La V2 deja ese material dentro de la fila anterior. La mayoría de las veces es la fila de quien presidía: el 67 %.

La v3 lo separa en 12.654 filas de «Comentarios del Diario». Añade además al principio de cada sesión su sumario, que la V2 no traía.

En el explorador, la casilla «Solo lo que se habla» deja fuera sumarios y comentarios. Quedan 108.291 de las 121.700 intervenciones.

La separación sigue una auditoría del proyecto. Que una fila quede como habla no prueba que todo su texto se dijera en el pleno.

> [nota de diseño] Aquí va **F10/F11** (`fig.F10.*`). Las cifras de este apartado son de la V2 salvo las de la v3,
> rotuladas en su frase; la página lleva `<NotaBases>`.

<!-- metodo.05.salvedad -->
Con la v3, la proporción de filas breves cambia: el 69,02 % tiene 50 palabras o menos. Cada figura dice qué edición cuenta.

<!-- metodo.05.pruebelo.consulta -->
"casas viejas"

<!-- metodo.05.pruebelo.explorador -->
Busque la frase dos veces, con la casilla «Solo lo que se habla» y sin ella. La diferencia son sumarios y comentarios del Diario, no habla de nadie. [Abrir el explorador ↗]

<!-- metodo.05.pruebelo.codigo -->
```python
(d.nwords <= 50).mean()   # la parte de filas breves en la V2
```

---

## 06 · ¿Por qué hay dos ediciones?

<!-- metodo.06.titulo -->
¿Por qué hay dos ediciones?

<!-- metodo.06.entrada -->
La V2 depositada tiene dos defectos de segmentación. La v3 del explorador los corrige sin cambiar una letra del texto.

<!-- metodo.06.texto -->
**Turnos enterrados.** Cuando el etiquetador no reconoció una fórmula, el turno siguiente quedó dentro de la fila anterior. La v3 rescata 735 turnos.

La mayoría estaban dentro de una fila de la Presidencia: el 66 %.

**Material impreso dentro de las filas.** Tablas, listas de votación y documentos iban en la fila de quien hablaba antes. La v3 los pasa a filas de comentarios del Diario.

Las tres filas de la figura lo enseñan.

- La fila más larga de la V2, la 55221, suma 25.371 palabras a nombre de Indalecio Prieto, el 12 de julio de 1933.
- Su discurso son 3.733 palabras. El resto, 21.638, son tablas y «documentos complementarios» que el Diario imprime con él.
- El discurso de Manuel Azaña sobre el Estatuto de Cataluña, el 27 de mayo de 1932, va en la V2 dentro de una fila de la Presidencia, la 25979.
- La v3 le da fila propia, la 29042, con 17.142 palabras.
- El discurso de Azaña del 20 de marzo de 1935 ya estaba bien en la V2: 14.131 palabras en una sola fila, igual en las dos ediciones.

**El texto no cambia.** Cada pieza de la v3 es un tramo literal de una fila de la V2. Juntas, en orden y con las fórmulas que se separaron, reconstruyen las 107.551 filas.

Las palabras de cada fila de la V2 se reparten entre sus piezas y suman lo mismo: 24.335.896. Lo que añade la v3 son los sumarios.

La v3 no está depositada.

<!-- metodo.06.enlace -->
[Ver adónde va cada fila de la V2]

> [nota de diseño] Aquí va **F12** (`fig.F12.*`). Orden de la plantilla: `metodo.06.texto` · F12 · ↺
> `comun.fija.ids` · `metodo.06.enlace`, que va a `datos/versiones/#destino-filas` (F18).

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- metodo.06.salvedad -->
La correspondencia fila a fila entre las dos ediciones no está publicada. Las cifras de la v3 de este apartado se leyeron en ella, con su huella.

<!-- metodo.06.pruebelo.consulta -->
"es preciso reconocer sres diputados que en esta campaña"

<!-- metodo.06.pruebelo.explorador -->
Busque la frase y abra el resultado: es Azaña, el 27 de mayo de 1932, en fila propia. En la V2, ese texto va a nombre de la Presidencia. [Abrir el explorador ↗]

<!-- metodo.06.pruebelo.codigo -->
```python
print(d.loc[d.id == 25979, "speech"].iloc[0][:400])   # Presidencia y, dentro, Azaña
```

---

## 07 · ¿Qué fechas se corrigieron?

<!-- metodo.07.titulo -->
¿Qué fechas se corrigieron?

<!-- metodo.07.entrada -->
La primera versión fechaba mal algunas sesiones. La V2 las corrigió después de auditar todas, una a una.

<!-- metodo.07.texto -->
La auditoría cruzó cuatro fuentes independientes para cada sesión:

- las cabeceras corridas de cada página impresa;
- la cabecera de la sesión, «SESIÓN CELEBRADA…»;
- las fechas que cita el propio texto;
- la secuencia de números del Diario, con el día de la semana.

Para corregir una fecha pidió dos indicios independientes, o una cabecera impresa sin ambigüedad.

Cambiaron siete sesiones. Suman 894 filas.

Solo cambian las columnas `date` y `legislature`; el texto y las demás columnas quedan igual.

Una sesión cambió también de legislatura. La sesión 77, que la V1 fechaba el 1 de junio de 1933, es del 4 de mayo de 1934.

La V1 fechaba la sesión 321 el 14 de julio de 1931: tomó la fecha de la portada del Tomo XX, que dice cuándo empezaron esas Cortes. Es del 31 de marzo de 1933.

En varias, el error venía de la cabecera de la sesión: una errata de imprenta o una cifra dañada que la lectura óptica leyó mal.

La auditoría tiene un límite: no detecta un error de fecha coherente con la secuencia.

<!-- metodo.07.enlace -->
[Ver las fechas corregidas]

> [nota de diseño] `metodo.07.enlace` → `datos/versiones/#fechas` (F25). «Cuatro fuentes» es la estructura
> del método de la auditoría (`AUDITORIA_FECHAS.md`, proyecto), no una cifra del corpus.

<!-- metodo.07.salvedad -->
El changelog depositado da los rangos de filas corregidas. La tabla de pruebas que cita, `erratas_fechas_V1.csv`, no está depositada.

<!-- metodo.07.pruebelo.explorador -->
Sin texto de búsqueda, elija la legislatura 1933-1935 y escriba 77 en «Nº de sesión». Todas sus intervenciones son del 4 de mayo de 1934. [Abrir el explorador ↗]

<!-- metodo.07.pruebelo.codigo -->
```python
d[(d.legislature == "1933-1935") & (d.num_session == 77)].date.unique()
```

---

## 08 · ¿Qué significan partido, familia e ideología?

<!-- metodo.08.titulo -->
¿Qué significan partido, familia e ideología?

<!-- metodo.08.entrada -->
Las tres columnas describen al diputado, no la fila. Vienen de la tabla de diputados del proyecto.

<!-- metodo.08.texto -->
**El partido** va por diputado y legislatura. Quien cambió de partido entre legislaturas cambia también en la base.

**La familia** agrupa partidos. En el CSV tiene 33 valores distintos, con variantes de grafía como «Repubicanos» o «Republicanoses».

El explorador los reduce a 24 familias.

**La ideología** se codifica de EI, extrema izquierda, a ED, extrema derecha, con C en el centro. Se asigna al diputado según su partido; no mide lo que dijo.

No siempre es uniforme dentro de un partido. En cinco partidos conviven códigos distintos.

La CEDA, por ejemplo, es D en 7.656 filas. Pero es CD en 255. Y es C en 51.

«Republicanos» reúne partidos codificados desde la izquierda hasta el centro-derecha.

La Presidencia lleva el partido y la ideología de quien preside.

Quedan etiquetas pendientes de revisión por el autor:

- Diego Martínez Barrio figura en el partido AR en 1931-1933;
- la familia «Liberal», con 15.364 filas, que el explorador funde con «Liberales»;
- la Lliga, que es CD en el CSV y D en el README.

<!-- metodo.08.salvedad -->
Una categoría gruesa sirve para comparar bloques, no para clasificar a una persona.

<!-- metodo.08.pruebelo.explorador -->
Elija el partido CEDA en los filtros y despliegue la faceta Ideología. Verá más de un código. [Abrir el explorador ↗]

<!-- metodo.08.pruebelo.codigo -->
```python
d[d.party == "CEDA"].ideology.value_counts()
```

---

## 09 · ¿Qué no afirma el corpus, y cómo comparar?

<!-- metodo.09.titulo -->
¿Qué no afirma el corpus, y cómo comparar?

<!-- metodo.09.entrada -->
La base dice quién habló, cuándo y cuánto. No dice de qué, en qué tono, desde qué posición ni qué votó.

> [nota de diseño] Tras el texto, las cuatro cajas vacías de Inicio, en pequeño, con las mismas claves:
> `inicio.falta.tema` · `.tono` · `.posicion` · `.voto`. Aquí no se redactan.

<!-- metodo.09.texto -->
**Las legislaturas son desiguales.** La primera reúne el 53,28 % de las palabras de la V2.

Compare tasas, no volúmenes: palabras por sesión, o la parte de cada grupo dentro de su legislatura.

**El voto no es una columna.** Las votaciones nominales van en el texto, como listas de nombres.

En la V2, la lista del 161 a 121 del 1 de octubre de 1931 va dentro de una fila de la Presidencia, la 5453.

Esa fila marca 233 palabras en `nwords`. Los nombres van en líneas separadas, y `nwords` solo corta por espacios (Datos, «Cinco maneras de contar “palabra”»).

**El tono no se mide.** Las acotaciones del taquígrafo, «(Rumores.)», «(Aplausos.)», están en el texto. Nadie las ha convertido en una variable de la base.

> [nota de diseño] Tras `metodo.09.texto` va ↺ `comun.fija.contar`, destacada. «Cinco maneras…» enlaza a
> `datos/#palabra`.

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

<!-- metodo.09.salvedad -->
Que el Diario lo recoja no lo hace cierto: la base transcribe lo impreso, no lo verifica.

<!-- metodo.09.pruebelo.consulta -->
"total 161"

<!-- metodo.09.pruebelo.explorador -->
Busque la frase con la casilla «Solo lo que se habla» y sin ella. Con la casilla marcada, la lista desaparece: la v3 la guarda como comentario del Diario. [Abrir el explorador ↗]

<!-- metodo.09.pruebelo.codigo -->
```python
print(d.loc[d.id == 5453, "speech"].iloc[0])   # la lista, dentro de la Presidencia
```

---

## 10 · ¿Dónde está la documentación completa?

<!-- metodo.10.titulo -->
¿Dónde está la documentación completa?

<!-- metodo.10.entrada -->
Lo depositado, lo que no lo está y lo que publica este sitio.

<!-- metodo.10.texto -->
**Depositado en Harvard Dataverse**, con la V2.0: el CSV, los changelogs en español y en inglés, y el README.

<!-- metodo.10.texto.2 -->
Su tabla de cobertura es la de la V1. Llama Jaro-Winkler al parecido entre apellidos, que el código calcula con `difflib`.

Habla de una instrucción estructurada al modelo de lectura, que el código no envía: GLM-OCR usa su propia plantilla.

Y llama exilio a las sesiones de Valencia y Barcelona. En esta base, el exilio son las sesiones de México, en 1945.

**Sin depositar.** Estas piezas del proyecto no están en Dataverse:

- la v3 que sirve el explorador;
- la correspondencia fila a fila entre la V2 y la v3;
- los metadatos de sesión: Diario, páginas, presidente titular y Gobierno;
- la tabla de diputados con la que se vinculó cada fórmula, que el README ofrece a petición.

**En este sitio:** el exportador que calcula cada cifra y un archivo, `procedencia.csv`, con la base, la fórmula y la fecha de todas.

Lo que no tiene dirección pública no se enlaza.

<!-- metodo.10.enlace -->
[De dónde sale cada cifra]

> [nota de diseño] Orden: `metodo.10.texto` · ↺ `comun.fija.readme` · `metodo.10.texto.2` · `metodo.10.enlace` →
> `datos/procedencia.csv` (el mismo destino que el pie). Sin URL pública, no se pinta nada más.

<!-- ↺ comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `comun.fija.diario` es la salvedad al margen del apartado 10.

<!-- metodo.10.pruebelo.explorador -->
Abra «Sobre este corpus», en el panel lateral del explorador. Dice qué edición sirve: la v3, sin publicar. [Abrir el explorador ↗]

<!-- metodo.10.pruebelo.codigo -->
```python
d.shape   # compárelo con el README: filas y columnas
```

---

## Figuras de Método

### F20 · Anatomía de una fila (apartado 01)

<!-- fig.F20.titulo -->
Anatomía de una fila

<!-- fig.F20.pregunta -->
¿Qué trae cada fila del CSV?

<!-- fig.F20.que_mide -->
Dos filas seguidas de la sesión del 1 de octubre de 1931, con sus 14 columnas, tal como están en el CSV depositado.

<!-- fig.F20.conmutador.csv -->
Como en el CSV

<!-- fig.F20.conmutador.explorador -->
Como en el explorador

<!-- fig.F20.conmutador.leyenda -->
Ver la fila

<!-- fig.F20.nota.columna -->
⟦columna⟧ · ⟦definicion⟧

<!-- fig.F20.explorador.texto -->
La edición del explorador guarda las mismas filas con otro número y otro orden. Añade la fórmula y el nombre sin tildes ni mayúsculas, para buscar, y conserva la familia y la ideología tal como venían.

<!-- fig.F20.explorador.ordenes -->
En la V2, las órdenes son 25 y 26, porque empiezan en cero. En la v3 son 28 y 29: la sesión abre con su sumario y la v3 rescata turnos anteriores.

<!-- fig.F20.explorador.pantalla -->
La pantalla del explorador cuenta desde uno: «Orden 30».

<!-- fig.F20.campo.ord -->
Posición en la sesión, en la v3. Cuenta desde cero; la pantalla, desde uno.

<!-- fig.F20.campo.speaker_fold -->
La fórmula impresa, sin tildes ni mayúsculas, para buscar.

<!-- fig.F20.campo.rep_name_fold -->
El nombre del diputado, sin tildes ni mayúsculas, para buscar.

<!-- fig.F20.campo.party_family_raw -->
La familia tal como viene en el CSV, antes de normalizar la grafía.

<!-- fig.F20.campo.ideology_raw -->
La ideología tal como viene en el CSV, con sus espacios.

<!-- fig.F20.campo.year -->
El año de la sesión, para filtrar.

<!-- fig.F20.enlace -->
[Ver qué trae cada columna]

<!-- fig.F20.texto.cortado -->
El texto sigue; aquí va solo su comienzo.

<!-- fig.F20.salvedad -->
El número de fila cambia entre ediciones; la sesión, no. La ideología de Campoamor es C porque es la de su partido, el radical.

> [nota de diseño] F20 es una tabla ARIA clave–valor, dos columnas de datos (5423 · 5424). La definición de cada
> columna **no se redacta aquí**: se reutiliza `datos.columnas.<columna>.definicion` (F32), para que las dos figuras
> digan lo mismo. `fig.F20.nota.columna` es la plantilla de la nota (`⟦columna⟧`, `⟦definicion⟧` los pone la
> isla). El texto va en cursiva y cortado con el componente de corte; `fig.F20.texto.cortado` es su rótulo, sin
> corchetes. El conmutador son radios (sin JS funciona); la vista «Como en el explorador» enseña además los campos
> `fig.F20.campo.*` y los ids v3 6078 y 6079.

<!-- fig.F20.alt -->
Dos filas del CSV desplegadas en sus columnas: la Presidencia pide silencio en siete palabras y Clara Campoamor empieza su discurso, de 1.460 palabras.

<!-- fig.F20.grupo.sesion -->
La sesión y el lugar de la fila

<!-- fig.F20.grupo.texto -->
Lo impreso

<!-- fig.F20.grupo.diputado -->
El diputado, si se identificó

<!-- fig.F20.solo_v3 -->
solo en la v3

<!-- fig.F20.tabla.col.columna -->
Columna

<!-- fig.F20.tabla.col.definicion -->
Qué dice

> [nota de diseño] Fase 2 (grupo 4): la vista «Como en el CSV» agrupa las catorce columnas en tres bandas
> (`fig.F20.grupo.*`), como las nombra `metodo.01.texto`; la vista «Como en el explorador» añade los campos de la v3,
> marcados «solo en la v3». Cada clave de columna es una marca: su nota da la definición (la de F32).

### F19 · Del Diario a la fila, en cinco pasos (apartado 02)

<!-- fig.F19.titulo -->
Del Diario a la fila, en cinco pasos

<!-- fig.F19.pregunta -->
¿Cómo se pasa de 755 números del Diario a 107.551 filas?

<!-- fig.F19.paso1.titulo -->
Los números del Diario

<!-- fig.F19.paso1.cifra -->
755 números, uno por sesión

<!-- fig.F19.paso1.detalle -->
Escaneados en PDF desde el archivo histórico del Congreso. Son las sesiones de las tres legislaturas y las de México, en 1945. Base: V2.

<!-- fig.F19.paso2.titulo -->
Las páginas, leídas

<!-- fig.F19.paso2.cifra -->
28.780 páginas

<!-- fig.F19.paso2.detalle -->
Recuento de los archivos del proyecto, no depositados. En la primera pasada fallaron 153; todas se recuperaron después.

<!-- fig.F19.paso3.titulo -->
Las fórmulas de orador

<!-- fig.F19.paso3.cifra -->
107.556 etiquetas

<!-- fig.F19.paso3.detalle -->
Tras descartar 1.532 falsos positivos con el filtro de las mayúsculas. Cifra del README depositado.

<!-- fig.F19.paso4.titulo -->
Las filas

<!-- fig.F19.paso4.cifra -->
107.551 filas

<!-- fig.F19.paso4.detalle -->
El CSV depositado. La diferencia de cinco con las etiquetas no está documentada.

<!-- fig.F19.paso5.titulo -->
El orador, identificado

<!-- fig.F19.paso5.cifra -->
107.404 filas con diputado

<!-- fig.F19.paso5.detalle -->
Tras revisar a mano todas las filas y corregir 367 asignaciones.

<!-- fig.F19.salvedad -->
La diferencia de cinco entre etiquetas y filas no está documentada. Las páginas no están depositadas.

<!-- fig.F19.alt -->
Cinco pasos en fila: los números del Diario, las páginas leídas, las fórmulas de orador, las filas y las filas con diputado identificado, cada uno con su cifra.

> [nota de diseño] Cada paso es un `<details>` cuyo `summary` lleva `.titulo` y `.cifra`; dentro, `.detalle` y el
> enlace a su apartado (ancla `#metodo-NN`: pasos 1–2 → 02, paso 2 → 03, paso 3 → 02, paso 5 → 04). Sin pestañas: la figura es su propia tabla. Base V2 + proyecto: la
> página ya lleva `<NotaBases>`, pero aquí no hay cifras v3.

### F10/F11 · Trámite frente a discurso (apartado 05)

<!-- fig.F10.titulo -->
Trámite frente a discurso

<!-- fig.F10.pregunta -->
¿Cuántas filas son breves, y cuánto texto se llevan las largas?

<!-- fig.F10.que_mide -->
Cuántas filas de la V2 caen en cada tramo de longitud, o cuántas palabras suman, separando las de la Presidencia.

<!-- fig.F10.denominador -->
Las 107.551 filas de la V2, o sus 24.335.896 palabras contadas con `nwords`.

<!-- fig.F10.conmutador.leyenda -->
Contar

<!-- fig.F10.conmutador.filas -->
Filas

<!-- fig.F10.conmutador.palabras -->
Palabras

<!-- fig.F10.eje.x -->
Palabras por fila, en tramos cada vez más anchos

<!-- fig.F10.eje.y.filas -->
Filas

<!-- fig.F10.eje.y.palabras -->
Palabras

<!-- fig.F10.leyenda.presidencia -->
De la Presidencia

<!-- fig.F10.leyenda.resto -->
Del resto de oradores

<!-- fig.F10.filtro.leyenda -->
Legislatura

<!-- fig.F10.filtro.todas -->
Todas

<!-- fig.F10.nota.filas -->
⟦tramo⟧ palabras · ⟦n⟧ de ⟦den⟧ filas · ⟦pres⟧ de la Presidencia

<!-- fig.F10.nota.palabras -->
⟦tramo⟧ palabras · ⟦n⟧ de ⟦den⟧ palabras · ⟦pres⟧ de la Presidencia

<!-- fig.F10.tramo.mas -->
más de

<!-- fig.F10.umbral -->
Hasta 50 palabras: 71.550 de 107.551 filas.

<!-- fig.F11.titulo -->
Dónde se concentran las palabras

<!-- fig.F11.que_mide -->
Qué parte de todas las palabras reúnen las filas más largas, de la más larga a la más corta.

<!-- fig.F11.eje.x -->
Filas, de la más larga a la más corta

<!-- fig.F11.eje.y -->
Parte de todas las palabras

<!-- fig.F11.punto.p10 -->
El primer 10 % de las filas reúne el 74,5 % de las palabras.

<!-- fig.F11.punto.p20 -->
El primer 20 % reúne el 90,4 %.

<!-- fig.F11.nota -->
⟦pct_filas⟧ de las filas más largas · ⟦pct_palabras⟧ de las palabras

<!-- fig.F10.tabla.col.tramo -->
Palabras por fila

<!-- fig.F10.tabla.col.presidencia -->
Filas de la Presidencia

<!-- fig.F10.tabla.col.resto -->
Filas del resto

<!-- fig.F10.tabla.col.pal_presidencia -->
Palabras de la Presidencia

<!-- fig.F10.tabla.col.pal_resto -->
Palabras del resto

<!-- fig.F10.v3 -->
En la v3, que separa sumarios y comentarios, el 69,02 % de las filas tiene 50 palabras o menos.

<!-- fig.F10.salvedad -->
Se mide la longitud; «de trámite» es una interpretación. La Presidencia se reconoce por su fórmula impresa, con el analizador del explorador.

<!-- fig.F10.alt -->
Histograma de la longitud de las filas de la V2. La mayoría son breves y de la Presidencia; al contar palabras, la masa pasa a las filas largas.

> [nota de diseño] Diez tramos (`longitud.json`, del exportador): 0–5 · 6–10 · 11–20 · 21–50 · 51–100 · 101–300 ·
> 301–1.000 · 1.001–3.000 · 3.001–10.000 · más de 10.000; sus rótulos los escribe el componente con `fmt.n`. La
> conmutación Filas · Palabras son radios; el filtro de legislatura, radios que funcionan sin JS (`fig.F10.filtro.*`
> más los rótulos de legislatura del CSV). F11 es una curva de concentración con dos puntos anotados, sin
> deslizador. `⟦tramo⟧`, `⟦n⟧`, `⟦den⟧`, `⟦pres⟧`, `⟦pct_filas⟧` y `⟦pct_palabras⟧` los pone la isla.
> Pestañas: Gráfico · Tabla · Datos; Datos lleva ↺ 12.

### F12 · La fila más larga no es un discurso (apartado 06)

<!-- fig.F12.titulo -->
La fila más larga no es un discurso

<!-- fig.F12.pregunta -->
¿Por qué hacía falta la v3?

<!-- fig.F12.que_mide -->
Tres filas de la V2, partidas en las piezas en que las divide la v3, con las palabras de cada pieza.

<!-- fig.F12.denominador -->
Las palabras de cada fila de la V2, repartidas entre sus piezas de la v3.

<!-- fig.F12.fila.prieto -->
Prieto, 12 de julio de 1933 · fila 55221 de la V2

<!-- fig.F12.fila.estatuto -->
Azaña, 27 de mayo de 1932 · fila 25979 de la V2

<!-- fig.F12.fila.azana1935 -->
Azaña, 20 de marzo de 1935 · fila 85330 de la V2

<!-- fig.F12.leyenda.habla -->
Habla del orador

<!-- fig.F12.leyenda.documento -->
Comentario del Diario: tablas, documentos, listas

<!-- fig.F12.leyenda.turno -->
Turno rescatado

<!-- fig.F12.leyenda.presidencia -->
Presidencia

<!-- fig.F12.nota -->
⟦tipo⟧ · fila ⟦id_v3⟧ de la v3 · ⟦n⟧ palabras · «⟦comienzo⟧»

<!-- fig.F12.tabla.col.v2 -->
Fila de la V2

<!-- fig.F12.tabla.col.v3 -->
Pieza en la v3

<!-- fig.F12.tabla.col.tipo -->
Qué es

<!-- fig.F12.tabla.col.orador -->
A nombre de

<!-- fig.F12.tabla.col.palabras -->
Palabras

<!-- fig.F12.anota.prieto -->
De las 25.371 palabras de la fila de Prieto, 21.638 son tablas y documentos que el Diario imprime con su discurso.

<!-- fig.F12.anota.estatuto -->
El discurso de Azaña iba a nombre de la Presidencia.

<!-- fig.F12.anota.azana1935 -->
Un discurso largo de verdad: la misma fila en las dos ediciones.

<!-- fig.F12.salvedad -->
Las palabras de la v3 se reparten en proporción al texto de cada pieza. La correspondencia fila a fila no está publicada.

<!-- fig.F12.alt -->
Tres barras, una por fila de la V2. La de Prieto se parte en discurso y documentos; la del Estatuto, en Presidencia y el discurso de Azaña; la de 1935 queda entera.

> [nota de diseño] Datos de `ediciones.json › F12` (el exportador lee `mapa_v2_v3.json`, local, y la v3): V2 55221 →
> v3 61929 habla · 61930 comentario · 61931 habla · 61932 comentario; V2 25979 → v3 29041 Presidencia · 29042
> turno rescatado; V2 85330 → v3 96282. `⟦tipo⟧` es uno de los rótulos `fig.F12.leyenda.*`; `⟦comienzo⟧`, las
> primeras palabras de la pieza. Pestañas: Gráfico · Tabla · Datos (↺ 12). Base V2 → v3: `<NotaBases>`.


<!-- ═══ sesiones.md ═══ -->

# Copy ES · Sesiones y votaciones (índice), plantilla de las puertas, F26 y F30

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el copy de «Sesiones y votaciones», de las
> ocho puertas de lectura de la edición 0.1 (`sesiones_<puerta>.md`) y de «El Diario» (`diario.md`). Sigue la
> narrativa (§ 9 y § 10), que manda sobre el plan (plantillas D y E; fichas de F26 y F30), y el contrato de
> construcción, que manda sobre los dos.
>
> **Cifras.** Ninguna se teclea. Todas están en `docs/marcadores/sesiones.md`, recalculadas hoy sobre la V2 (MD5
> `360332a0…`), la v3 del explorador (sha256 `3a0d8b2d…`), los metadatos del proyecto (sha256 `b3295e99…`) y las
> bibliotecas publicadas del explorador. Las búsquedas se contaron con FTS5 sobre `speeches_fts`, como el explorador
> (misma traducción de la consulta y el mismo filtro «Solo lo que se habla»: `speaker NOT IN ('SUMARIO',
> 'COMENTARIOS')`).
>
> **Citas.** Cada cita va entre «» y es literal, copiada letra a letra de su fila V2 y comprobada en su fila v3:
> fragmentos, ids y notas en `docs/marcadores/citas.md`. Las claves de cita llevan `.cita.` en el nombre: sus cifras
> son texto del Diario, no del proyecto, y `check-i18n` no las trata como cifras tecleadas (petición en
> `docs/peticiones/sesiones.md`). Dentro de una cita solo se añade «…» (corte) y «[sic]» (errata que cambia el
> sentido); las comillas rectas del texto se escriben “ ”.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto y lo cierra la clave siguiente, un
> encabezado, una nota `>` o una regla `---`. `[corchetes]` marcan un rótulo o un enlace. `⟦clave⟧` es una
> cifra de `src/data/cifras.json`; `⟦n⟧`, `⟦fecha⟧`… son variables que rellena el componente. `↺` marca una frase
> fija de `comun.md`, repetida idéntica. Lo que empieza por «[nota de diseño]» no es texto para el lector.
>
> **Correcciones a la narrativa** (verificadas sobre la fuente; detalle en el informe y en `peticiones/sesiones.md`):
> - el Diario imprime listas nominales en al menos 405 de las 755 sesiones (V2): las seis de F26 son una **selección**,
>   y el copy lo dice;
> - el 7-IV-1936 el Diario también imprime la mitad más uno (209 de 417, V2 102359); F26 lleva tres líneas, no dos;
> - «(Campanilla.)» no aparece en la V2: el Diario escribe «El Sr. Presidente agita la campanilla»;
> - las acotaciones «no se consigna(n) por orden» son tres, pero hay otras dos que dicen «no constan por orden»: F28
>   marca cinco acotaciones, no tres;
> - Azaña, 27-V-1932: es la fila de habla más larga en la v3, no en la V2 (en la V2 le gana una fila de Prieto con
>   un documento dentro).

---

## 1. Sesiones y votaciones · índice (`/es/cortes/sesiones/`)

> [nota de diseño] Unas 700 palabras de copy en `<main>`, con el registro de puertas (tope de la plantilla D: 500–700;
> recuento en el anexo A).
> Subnavegación de Las Cortes («Etapas · Sesiones y votaciones», `comun.subnav.*`), con esta página marcada. Dos
> figuras: F26 completa, con ancla `#votaciones` (la usa [Ver las votaciones] desde Inicio), y la lista de puertas en
> registro de calendario, que no es una figura. Sin índice lateral.

### 1.0 Cabecera

<!-- sesiones.meta.titulo -->
Sesiones y votaciones

<!-- sesiones.meta.descripcion -->
Lo que se votó con nombre y apellido en las Cortes de la República, momentos del Diario para leer enteros y cómo encontrar cualquier sesión.

<!-- sesiones.antetitulo -->
Las Cortes · Sesiones y votaciones

<!-- sesiones.h1 -->
¿Qué se dijo aquel día, y qué se votó?

<!-- sesiones.entrada -->
La base no trae el voto en una columna. Lo trae el Diario, en el texto de la sesión: quién dijo sí, quién dijo no y cuántos fueron.

<!-- sesiones.entrada.2 -->
Esta página enseña a leer ese texto, abre de par en par algunos momentos del Diario y explica cómo llegar a cualquier otra sesión.

### 1.1 Lo que se votó en voz alta (F26, completa) · ancla `#votaciones`

<!-- sesiones.votos.antetitulo -->
Votaciones nominales

<!-- sesiones.votos.titulo -->
Lo que se votó en voz alta

<!-- sesiones.votos.entrada -->
En una votación nominal, el Diario imprime dos listas, «Señores que dijeron sí» y «Señores que dijeron no», cada una con su total.

<!-- sesiones.votos.cuantas -->
Hay listas así en al menos 405 de las 755 sesiones de la edición depositada.

<!-- sesiones.votos.seleccion -->
Aquí van seis, en cinco sesiones, escogidas porque cierran debates que este sitio cuenta.

<!-- sesiones.votos.etapas.entrada -->
Estas son todas las filas con lista que encuentra esa búsqueda, etapa por etapa:

<!-- sesiones.votos.etapas -->
- Constituyentes, 1931–1933: 532 filas, en 206 sesiones.
- 1933–1935: 408 filas, en 165 sesiones.
- Cortes de 1936: 81 filas, en 32 sesiones.
- Las Cortes en guerra: dos filas, en dos sesiones.
- México, 1945: ninguna.

<!-- sesiones.votos.etapas.salvedad -->
Es una cota inferior: el reconocimiento óptico rompe algún encabezado, y alguno se imprime de otra manera. En Figueres, la lista empieza «Señores Diputados que dijeron SI», y la búsqueda no la ve.

> [nota de diseño] «Al menos»: la cuenta busca el encabezado de la lista sobre el texto sin acentos, y el
> reconocimiento óptico rompe alguno. `sesiones.votos.etapas` es el registro de todas por etapa que piden la narrativa
> (§9, punto 3) y el plan (anexo adversarial, R1): una lista tipográfica, no una figura, con la misma definición que
> `voto.listas.sesiones` (las cinco etapas suman 1.023 filas y 405 sesiones). «Ninguna» en México lo afirma
> `etapa.V.listas_nominales.filas` = 0; la lista de Figueres es la V2 107340 (`cortes_guerra.md`, nota 4). La tabla
> por sesión, con sus totales, va a la pestaña Datos de F26 (la escribe el exportador). F26 va aquí con sus pestañas Gráfico · Tabla · Datos y el rótulo de cada
> votación (§ 3). La ordinaria del 1-X-1931 va dentro de la figura, con otro trazo, y nunca se suma a las seis.

<!-- sesiones.votos.ordinaria -->
El mismo 1 de octubre de 1931, antes de la nominal, una votación ordinaria rechazó una proposición del grupo socialista por 141 votos contra 106.

<!-- sesiones.votos.ordinaria.2 -->
De esa votación el Diario no da nombres: solo el resultado.

<!-- sesiones.votos.kent -->
En la lista del art. 34, Victoria Kent vota no y Clara Campoamor vota sí.

<!-- sesiones.votos.destitucion -->
El 7 de abril de 1936 la Cámara vota una proposición que declara innecesario el decreto de disolución de enero.

<!-- sesiones.votos.destitucion.2 -->
El artículo del Reglamento que se lee en la sesión la trata como destitución del Presidente de la República, y exige votación nominal.

<!-- sesiones.votos.destitucion.no -->
Votan no cinco diputados, y la lista los nombra: Becerra, Portela, Benítez de Lugo, Canals y Rosado.

<!-- sesiones.votos.destitucion.pie -->
Proposición: V2 102304 · v3 115618. Reglamento: V2 102309 · v3 115623. Lista: V2 102358 · v3 115675.

<!-- sesiones.votos.mas -->
Las listas completas llegarán a esta misma figura en la edición 0.2, con un punto por nombre impreso.

> [nota de diseño] Los apellidos de la destitución van como los imprime la lista del Diario (V2 102358); no se
> resuelven a nombre completo en la 0.1 (peticiones/grafias_sesiones.md). `sesiones.votos.mas` anuncia lo que ya
> decidió el plan (F26 en la 0.2); no promete fecha. Llamadas bajo la figura: cada barra lleva a su puerta
> (161–121 → `sufragio-1931`; 178–59 → `cuestion-religiosa-1931`) o a su fila de la pestaña Tabla; [Descargar los
> datos de la figura] y [Descargar la imagen], en la pestaña Datos.

### 1.2 Ocho puertas de lectura

<!-- sesiones.puertas.antetitulo -->
Puertas de lectura

<!-- sesiones.puertas.titulo -->
Momentos para leer enteros

<!-- sesiones.puertas.entrada -->
Cada puerta abre un momento del Diario: qué pasó, qué dijeron, cómo se repartió la palabra y cómo encontrarlo en el explorador.

<!-- sesiones.puertas.cobertura -->
Las ocho puertas cubren doce sesiones, de 1931 a 1945.

<!-- ↺ comun.fija.novalida -->
Que estén no valida su contenido.

> [nota de diseño] Registro de calendario, como en Inicio: fecha en mono · título (enlace a la puerta) · una línea ·
> filas V2 al margen. Sin tarjetas ni iconos. Las siete puertas de la 0.2 no se pintan hasta que existan.

<!-- sesiones.lista.sufragio-1931.fecha --> 1-X-1931
<!-- sesiones.lista.sufragio-1931.titulo --> El voto de las mujeres
<!-- sesiones.lista.sufragio-1931.linea --> Kent pide aplazarlo; Campoamor, que se reconozca ya. La votación nominal lo aprueba.
<!-- sesiones.lista.sufragio-1931.filas --> 395 filas (V2)

<!-- sesiones.lista.cuestion-religiosa-1931.fecha --> 13-X-1931
<!-- sesiones.lista.cuestion-religiosa-1931.titulo --> «España ha dejado de ser católica»
<!-- sesiones.lista.cuestion-religiosa-1931.linea --> Azaña habla del artículo religioso. La sesión acaba a la mañana siguiente.
<!-- sesiones.lista.cuestion-religiosa-1931.filas --> 378 filas (V2)

<!-- sesiones.lista.estatuto-1932.fecha --> 27-V-1932
<!-- sesiones.lista.estatuto-1932.titulo --> El discurso de Azaña, a nombre de otro
<!-- sesiones.lista.estatuto-1932.linea --> Azaña defiende el Estatuto de Cataluña. En la V2, su discurso va dentro de una fila de la Presidencia.
<!-- sesiones.lista.estatuto-1932.filas --> 44 filas (V2)

<!-- sesiones.lista.casas-viejas-1933.fecha --> 2-II-1933
<!-- sesiones.lista.casas-viejas-1933.titulo --> Casas Viejas
<!-- sesiones.lista.casas-viejas-1933.linea --> Azaña responde en la Cámara por los sucesos. Las minorías protestan.
<!-- sesiones.lista.casas-viejas-1933.filas --> 155 filas (V2)

<!-- sesiones.lista.pistola-1934.fecha --> 4-VII-1934
<!-- sesiones.lista.pistola-1934.titulo --> La pistola de Prieto
<!-- sesiones.lista.pistola-1934.linea --> Un incidente acaba en golpes, y Prieto admite que sacó su pistola. Es la última sesión antes del verano.
<!-- sesiones.lista.pistola-1934.filas --> 255 filas (V2)

<!-- sesiones.lista.antesala-1936.fecha --> 16-VI y 1-VII-1936
<!-- sesiones.lista.antesala-1936.titulo --> La antesala
<!-- sesiones.lista.antesala-1936.linea --> Dos debates sobre el orden público, semanas antes de la guerra. Hay palabras que no constan en el Diario.
<!-- sesiones.lista.antesala-1936.filas --> 159 y 125 filas (V2)

<!-- sesiones.lista.figueres-1939.fecha --> 1-II-1939
<!-- sesiones.lista.figueres-1939.titulo --> Figueres
<!-- sesiones.lista.figueres-1939.linea --> La última sesión de las Cortes en España, en el castillo de Figueras. Solo queda el extracto oficial.
<!-- sesiones.lista.figueres-1939.filas --> 16 filas (V2)

<!-- sesiones.lista.mexico-1945.fecha --> 17-VIII y 7–9-XI-1945
<!-- sesiones.lista.mexico-1945.titulo --> México
<!-- sesiones.lista.mexico-1945.linea --> En cuatro sesiones, Martínez Barrio promete como Presidente interino de la República y Giral presenta su Gobierno.
<!-- sesiones.lista.mexico-1945.filas --> 183 filas (V2)

> [nota de diseño] Las fechas del registro son de sesión y van tecleadas, como las de ParlaIbero; los números de fila
> salen de marcadores. Los títulos van sin corchetes: toda la fila es el enlace (`RegistroPuertas`).

### 1.3 Cualquier otra sesión

<!-- sesiones.otra.antetitulo -->
Cualquier otra sesión

<!-- sesiones.otra.titulo -->
Cómo encontrar una sesión en el explorador

<!-- sesiones.otra.entrada -->
Las 755 sesiones están en el explorador, tal como las tiene la base.

<!-- sesiones.otra.pasos -->
Abra Filtros › Fecha y sesión y ponga la misma fecha en Desde y en Hasta. La lista enseña entonces toda la sesión, en su orden.

<!-- sesiones.otra.dobles -->
Algunos días hubo dos sesiones; pasa en tres fechas. Para separarlas, escriba además el número en Nº de sesión.

<!-- sesiones.otra.habla -->
Si marca «Solo lo que se habla», desaparecen el sumario y los comentarios del Diario, que en esa edición van en filas propias.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- sesiones.otra.citar -->
Para citar una sesión, basta con su fecha y su número. Para citar un pasaje, añada el Diario, sus páginas y la fila.

> [nota de diseño] Debajo, [Abrir el explorador ↗] (`comun.boton.explorador`) con `comun.fija.explorador` y
> `comun.fija.enlace` (↺ 5). No hay [Copiar la consulta]: Desde, Hasta y Nº de sesión son filtros, no texto del
> buscador. «Para citar un pasaje» enlaza a la sección «Cómo citar un pasaje» de El Diario (`/{lang}/diario/#citar`).

### 1.4 Que esté no quiere decir que esté entera

<!-- sesiones.entera.antetitulo -->
Límites

<!-- sesiones.entera.titulo -->
Que esté no quiere decir que esté entera

<!-- sesiones.entera.entrada -->
Cada sesión está en la base tal como salió del reconocimiento óptico. Tres casos enseñan lo que eso puede costar.

<!-- sesiones.entera.s48 -->
El acta del 1 de octubre de 1931 perdió su final: las últimas cinco filas repiten «Pido la palabra.», y la última termina en «El Sr. Ministro de».

<!-- sesiones.entera.s48.pie -->
V2 5788–5792 · v3 6460–6464

<!-- sesiones.entera.s9 -->
En la sesión del 27 de julio de 1931, una misma fila repite seis veces seguidas «Sánchez Guerra, Ossorio y Gallardo».

<!-- sesiones.entera.s9.pie -->
V2 976 · v3 1081

<!-- sesiones.entera.paginas -->
En las catorce sesiones posteriores a julio de 1936, las páginas del Diario están sin verificar.

<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] Tres párrafos cortos con su pie en mono, sin cajas. `comun.sello.proyecto` va como sello al lado de
> `sesiones.entera.paginas`. ↺ 7 cierra la sección, destacada. Las tres incidencias salen de `sessions.json`
> (`truncated_end`, `ocr_loop`, `page_status`) y están comprobadas en el texto de las dos ediciones.

---

## 2. Plantilla común de las puertas (`/es/cortes/sesiones/<nombre>/`)

> [nota de diseño] Orden (plan, plantilla E, y narrativa § 10): antetítulo en mono · H1 con el hecho · la pregunta
> (`sesiones.<puerta>.entrada`, la misma en todas, en plural en las de varias sesiones) ·
> Qué pasó · Lo que dice el Diario (2–5 citas) · La sesión, turno a turno (F30, con las cifras al margen) · La
> votación (F26 mínima, solo en `sufragio-1931` y `cuestion-religiosa-1931`) · Cómo encontrarla en el explorador
> (CopiarConsulta y el debate preparado) · Lo que no está · Fuentes · Cómo citar un pasaje · vecinas
> (`comun.vecinas.puerta.*`, con [Ver las sesiones y votaciones] en el centro). Tope: 500 palabras de copy por puerta.
> Las puertas de dos o más sesiones (`antesala-1936`, `mexico-1945`) llevan una F30 por sesión, con pestañas por
> fecha. `NotaBases` (↺ 13) al pie: todas las puertas dan cifras de la v3.

<!-- sesiones.puerta.que_paso -->
Qué pasó

<!-- sesiones.puerta.diario -->
Lo que dice el Diario

<!-- sesiones.puerta.turnos -->
La sesión, turno a turno

<!-- sesiones.puerta.votacion -->
La votación

<!-- sesiones.puerta.explorador -->
Cómo encontrarla en el explorador

<!-- sesiones.puerta.no_esta -->
Lo que no está

<!-- sesiones.puerta.fuentes -->
Fuentes

<!-- sesiones.puerta.citar -->
Cómo citar un pasaje

<!-- sesiones.puerta.antetitulo.paginas -->
⟦sigla⟧ núm. ⟦diario⟧, pp. ⟦paginas⟧

<!-- sesiones.puerta.antetitulo.sinpaginas -->
⟦serie⟧, páginas sin verificar

> [nota de diseño] El antetítulo se compone así: fecha larga · «Sesión núm. ⟦num⟧» · `comun.etapa.<id>.corto` ·
> `sesiones.puerta.antetitulo.paginas` (o `.sinpaginas`) · `comun.sello.proyecto` en cuerpo menor. `⟦num⟧`,
> `⟦diario⟧` y `⟦paginas⟧` salen de `sesion.<fecha>-<num>.num`, `.diario_num` y `.paginas`; `⟦sigla⟧` es
> «DSCCRE» o «DSC» (metadatos del proyecto, texto). En las sesiones sin páginas verificadas, `⟦serie⟧` es el nombre
> de la serie (`sesiones.puerta.serie.*`).

<!-- sesiones.puerta.serie.guerra --> Extracto oficial
<!-- sesiones.puerta.serie.mexico --> Extracto oficial de las sesiones celebradas en México

### 2.1 Las cifras al margen de F30

<!-- sesiones.puerta.cifras.titulo --> La sesión en cifras
<!-- sesiones.puerta.cifras.filas --> filas (V2)
<!-- sesiones.puerta.cifras.palabras --> palabras (V2)
<!-- sesiones.puerta.cifras.diputados --> diputados que hablan fuera de la Presidencia (V2)
<!-- sesiones.puerta.cifras.largas --> filas de más de 300 palabras (V2)
<!-- sesiones.puerta.cifras.v3 --> filas en la edición del explorador (v3)

> [nota de diseño] Cinco cifras en columna, cada una con su marcador de la sesión: `sesion.<fecha>-<num>.filas`,
> `.palabras`, `.diputados_sp`, `.largas` y `.filas_v3`. La última lleva el sello v3. «Diputados» cuenta `rep_id`
> distintos fuera de la Presidencia, con el analizador de rótulos del explorador.

### 2.2 El pie de cada cita

<!-- sesiones.puerta.cita.pie -->
⟦orador⟧ · V2 ⟦V2⟧ · v3 ⟦v3⟧

<!-- sesiones.puerta.cita.pie.palabras -->
⟦orador⟧ · V2 ⟦V2⟧ · v3 ⟦v3⟧ · ⟦palabras⟧ palabras (V2)

<!-- sesiones.puerta.cita.pie.solo_v3 -->
⟦orador⟧ · solo en la edición del explorador, v3 ⟦v3⟧

<!-- sesiones.puerta.cita.sic -->
[sic]: así en el texto digitalizado.

> [nota de diseño] `⟦V2⟧` y `⟦v3⟧` son `cita.<clave>.V2` y `.v3` con formato `|id`; `⟦palabras⟧`,
> `cita.<clave>.palabras`. El pie `.solo_v3` es para lo que la V2 no trae como fila (sumarios y notas de volumen).
> `sesiones.puerta.cita.sic` es la nota emergente del «[sic]».

### 2.3 Cómo encontrarla

> [nota de diseño] Usa `CopiarConsulta` (`comun.consulta.*`): la consulta literal en `<code>`, los filtros con los
> nombres del explorador, el recuento fechado (`comun.consulta.recuento`, con `22 de septiembre de 2026`), [Copiar la
> consulta], [Abrir el explorador ↗] y ↺ 5. El debate preparado se nombra como lo nombra el explorador, sin su clave.

<!-- sesiones.puerta.fecha -->
En el explorador: Filtros › Fecha y sesión, Desde y Hasta ⟦fecha⟧.

<!-- sesiones.puerta.fecha.recuento -->
Salen ⟦n⟧ intervenciones en la edición del explorador (v3); con «Solo lo que se habla», ⟦habla⟧.

<!-- sesiones.puerta.biblioteca -->
El debate preparado «⟦nombre⟧» está en Mis bibliotecas › Añadir bibliotecas del proyecto…

<!-- sesiones.puerta.biblioteca.recuento -->
Reúne ⟦n⟧ intervenciones de 755 sesiones (v3).

<!-- sesiones.puerta.biblioteca.donde -->
Los debates preparados están en el explorador, en Mis bibliotecas › Añadir bibliotecas del proyecto…, con su nombre precedido de «Debate · ».

### 2.4 Cómo citar un pasaje

<!-- sesiones.puerta.citar.entrada -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.puerta.citar.sinpaginas -->
⟦diario⟧, ⟦fecha⟧. Luz y Taquígrafos, ⟦edicion⟧, fila ⟦id⟧.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] El modelo de cita es `comun.cita.pasaje` (de `lib/cita.ts`), rellenado con la cita principal de la
> puerta. Para las sesiones sin páginas verificadas (Figueres y México) va `sesiones.puerta.citar.sinpaginas`:
> petición a `comun` para que la adopte como `comun.cita.pasaje.sinpaginas`.

---

## 3. F26 · Lo que se votó en voz alta (textos de la figura)

> [nota de diseño] Datos: `votaciones.json` (exportador, módulo `sesiones.py`). Una fila por votación, en orden de
> fecha: el tramo macizo son los que dijeron sí; el rayado, los que dijeron no. La ordinaria del 1-X-1931 va con otro
> trazo (discontinuo: el Diario no da nombres). Donde el Diario imprime el número de diputados de la Cámara, un
> contorno llega hasta ese total y una línea marca la mitad más uno: 234 de 466 (Constitución), 232 de 462 (Reforma
> agraria) y 209 de 417 (destitución). La del Estatuto no la imprime: su fila no lleva línea. Ningún texto dentro del
> SVG. Rótulos directos (sí · no) al final de cada fila: la leyenda solo explica el trazo. Tres anotaciones al
> margen de la figura (la ordinaria, Kent y Campoamor, los cinco noes de la destitución), con las claves
> `sesiones.votos.*` que ya son de la sección. En Inicio va la versión ligera (sin la ordinaria), con los rótulos de
> `inicio.md` (`FigVotaciones variante="ligera"`). Las notas emergentes tienen tres líneas: qué · cifras · fuente.

<!-- fig.F26.titulo -->
Lo que se votó en voz alta

<!-- fig.F26.pregunta -->
¿Qué se votó con nombre y apellido, y por cuánto?

<!-- fig.F26.asiento -->
6 votaciones escogidas · listas nominales en al menos 405 de las 755 sesiones (V2)

<!-- fig.F26.leyenda.aria --> Cómo se lee cada fila

<!-- fig.F26.leyenda.si --> Dijeron sí

<!-- fig.F26.leyenda.no --> Dijeron no

<!-- fig.F26.leyenda.mitad --> La mitad más uno, donde el Diario la imprime

<!-- fig.F26.leyenda.total --> Hasta el número de diputados que da el Diario

<!-- fig.F26.leyenda.ordinaria --> Votación ordinaria: el Diario da el resultado, no los nombres

<!-- fig.F26.filas.aria --> Las votaciones, por orden de fecha

<!-- fig.F26.v.141-106 --> Proposición del grupo socialista · votación ordinaria
<!-- fig.F26.v.161-121 --> Art. 34 del proyecto de Constitución: el voto de las mujeres
<!-- fig.F26.v.178-59 --> Art. 24 del proyecto de Constitución: la cuestión religiosa
<!-- fig.F26.v.368-466 --> La Constitución, votación definitiva
<!-- fig.F26.v.318-19 --> Proyecto de ley de Bases para la Reforma agraria, votación definitiva
<!-- fig.F26.v.314-24 --> Proyecto de ley de Estatuto de Cataluña, votación definitiva
<!-- fig.F26.v.238-5 --> Proposición del art. 81: la destitución del Presidente de la República

<!-- fig.F26.valor -->
⟦si⟧ sí · ⟦no⟧ no

<!-- fig.F26.valor.ordinaria -->
⟦si⟧ a ⟦no⟧

<!-- fig.F26.valor.total -->
de ⟦total⟧

<!-- fig.F26.valor.mitad -->
mitad más uno: ⟦mitad⟧

<!-- fig.F26.nota.t -->
⟦votacion⟧

<!-- fig.F26.nota -->
⟦si⟧ sí · ⟦no⟧ no · ⟦fecha⟧

<!-- fig.F26.nota.mitad -->
⟦si⟧ sí · ⟦no⟧ no, de ⟦total⟧ diputados; la mitad más uno, ⟦mitad⟧ · ⟦fecha⟧

<!-- fig.F26.nota.ordinaria -->
votación ordinaria, sin lista · ⟦si⟧ a ⟦no⟧ · ⟦fecha⟧

<!-- fig.F26.nota.b -->
«⟦literal⟧» · V2 ⟦v2⟧ · v3 ⟦v3⟧

> [nota de diseño] `⟦literal⟧` es el texto del resultado tal como está en la fila, de `citas.json`
> (`voto.<clave>`, en `docs/marcadores/citas.md`); no se reescribe. La fila entera es la marca: clic o segundo
> toque, su puerta (141–106 y 161–121 → `sufragio-1931`; 178–59 → `cuestion-religiosa-1931`) o su fila en la
> pestaña Tabla (`#votaciones-tabla`).

<!-- fig.F26.tabla.caption --> Las votaciones de la figura, con el texto del resultado tal como lo imprime el Diario
<!-- fig.F26.tabla.votacion --> Votación
<!-- fig.F26.tabla.fecha --> Fecha
<!-- fig.F26.tabla.sesion --> Sesión
<!-- fig.F26.tabla.si --> Sí
<!-- fig.F26.tabla.no --> No
<!-- fig.F26.tabla.mitad --> Mitad más uno
<!-- fig.F26.tabla.V2 --> Fila V2
<!-- fig.F26.tabla.v3 --> Fila v3
<!-- fig.F26.tabla.literal --> Texto del resultado en el Diario
<!-- fig.F26.tabla.ordinaria --> ordinaria

<!-- fig.F26.minima.tabla --> La tabla, con el texto del resultado en el Diario

<!-- fig.F26.salvedad -->
Son seis votaciones escogidas, no todas: el Diario imprime listas nominales en al menos 405 sesiones. Las listas están en el texto de las filas, no en una columna: la base no trae el voto como variable. En la V2, las de estas seis van dentro de filas de la Presidencia.

<!-- fig.F26.alt -->
Barras de seis votaciones nominales y una ordinaria, de 1931 a 1936, con los votos a favor y en contra de cada una. Los valores están en la pestaña «Tabla».

<!-- fig.F26.datos.votaciones -->
Las votaciones de la figura, con sus totales y el texto del resultado.

<!-- fig.F26.datos.listas -->
Todas las sesiones con listas nominales: fecha, número, filas con lista y sus ids en la V2.

<!-- fig.F26.leame.que_mide -->
Los votos a favor y en contra de seis votaciones nominales y una ordinaria, tal como los imprime el Diario de Sesiones.

<!-- fig.F26.leame.denominador -->
No hay denominador común. Donde el Diario imprime el número de diputados y la mitad más uno, van en sus columnas; donde no, quedan vacías.

<!-- fig.F26.leame.columnas -->
votacion, fecha, num_session, legislatura, si, no, total, mitad_mas_uno, nominal (sí/no), id_V2, id_v3, literal.

<!-- fig.F26.leame.salvedad -->
Selección editorial de seis votaciones escogidas: el Diario imprime listas nominales en al menos 405 sesiones. Los totales se leen en el texto de la fila; la base no trae el voto como columna. Los ids V2 y v3 no son intercambiables.

---

## 4. F30 · La sesión, turno a turno (textos de la figura)

> [nota de diseño] Datos: las filas V2 de la sesión en su orden (`order`, `speaker`, `rep_id`, `nwords`), con el
> papel de la Presidencia calculado por el motor del explorador y el nombre con su grafía (`puertas.json`). Una barra
> por fila, con la altura de sus palabras y la misma escala en toda la puerta. Quien tiene la palabra, encima de la
> línea; la Presidencia, debajo: así la diferencia no depende del color. Una línea fina marca las filas largas (más de
> 300 palabras, `ses.umbral.largas`). En la sesión 48, las filas V2 5788–5792 van con trama. En la del 27-V-1932, la
> barra de V2 25979 cae del lado de la Presidencia, porque así la trae la V2, y su nota lo dice. Las puertas de varias
> sesiones llevan un panel por sesión, con la misma escala. Sin CSV por fila (plan, anexo V10; D-23).

<!-- fig.F30.titulo -->
Las filas de la sesión: quien habla, encima; la Presidencia, debajo

<!-- fig.F30.pregunta -->
¿Cómo se repartió la palabra en esta sesión?

<!-- fig.F30.pregunta.varias -->
¿Cómo se repartió la palabra en estas sesiones?

<!-- fig.F30.leyenda.aria --> Cómo se lee cada panel

<!-- fig.F30.leyenda.orador --> Encima de la línea, cada fila de quien tiene la palabra

<!-- fig.F30.leyenda.presidencia --> Debajo, las de la Presidencia

<!-- fig.F30.leyenda.larga --> Más de 300 palabras

<!-- fig.F30.leyenda.truncada --> Bajo el corchete, el final repetido del acta digitalizada

<!-- fig.F30.rotulo.truncada --> final repetido

<!-- fig.F30.rotulo.estatuto --> Presidencia en la V2: el discurso de Azaña

<!-- fig.F30.cifras.aria --> La sesión en cifras

<!-- fig.F30.panel -->
Sesión núm. ⟦num⟧

<!-- fig.F30.eje.orden --> orden ⟦orden⟧

<!-- fig.F30.eje.palabras --> ⟦n⟧ palabras

<!-- fig.F30.eje.unidad --> palabras

<!-- fig.F30.presidencia --> Presidencia

<!-- fig.F30.nota.t -->
⟦orador⟧

<!-- fig.F30.nota -->
orden ⟦orden⟧ · ⟦palabras⟧ palabras

<!-- fig.F30.nota.b -->
V2 ⟦fila⟧

<!-- fig.F30.nota.truncada -->
Final repetido del acta: «Pido la palabra.»

<!-- fig.F30.nota.estatuto -->
A nombre de «El Sr. PRESIDENTE»: dentro va el discurso de Azaña

<!-- fig.F30.tabla.caption --> Las filas de la sesión, en su orden
<!-- fig.F30.tabla.orden --> Orden (V2)
<!-- fig.F30.tabla.orador --> Quién habla
<!-- fig.F30.tabla.palabras --> Palabras
<!-- fig.F30.tabla.V2 --> Fila V2
<!-- fig.F30.tabla.rotulo --> Sin diputado: rótulo del Diario

<!-- fig.F30.salvedad -->
Una fila cada vez que el etiquetado reconoce la fórmula impresa de un orador. En la V2, algunas filas contienen documentos o turnos de otros; el orden cambia entre ediciones.

<!-- fig.F30.alt -->
Barras de las ⟦n⟧ filas de la sesión del ⟦fecha⟧, en su orden, con la altura según sus palabras. Los valores están en la pestaña «Tabla».

<!-- fig.F30.datos.texto -->
Esta figura no tiene descarga propia: serían las filas de una sesión, no datos agregados.

<!-- fig.F30.datos.explorador -->
La sesión entera, con su texto, está en el explorador: Filtros › Fecha y sesión, con la misma fecha en Desde y en Hasta. Desde esa lista, Exportar la descarga con su cita; sus ids son los de la edición del explorador (v3).

<!-- fig.F30.leame.que_mide -->
Las palabras de cada fila de una sesión, en el orden del Diario, según la edición depositada (V2).

<!-- fig.F30.leame.denominador -->
Las filas V2 de la sesión. El papel de la Presidencia sale del mismo analizador de rótulos que usa el explorador.

<!-- fig.F30.leame.salvedad -->
Orden y id son los de la V2; en el explorador (v3) cambian. Una fila larga puede llevar dentro un documento leído o la réplica de otro orador.

> [nota de diseño] La tabla lleva cuatro columnas (plan, anexo V3): orden, quién habla, palabras y fila V2. Quién
> habla: el nombre con su grafía; si la fila es de la Presidencia, «Presidencia · <apellido>»; si no tiene diputado,
> el rótulo del Diario. En las puertas de varias sesiones, una tabla por sesión, plegada. Teclado: la isla recorre las
> barras de una en una.

---

## Anexo A · Recuentos y comprobaciones (no se publica)

- **Palabras de copy en `<main>` del índice** (§ 1, sin rótulos de figura ni pies en mono, con el registro de
  puertas): 699. Tope 500–700. Puertas: entre 371 y 477 cada una (tope 500).
- **Frases de más de 30 palabras:** ninguna (comprobado con `wc` frase a frase).
- **Una magnitud por frase:** sí, salvo los pies en mono (ids V2 · v3), que no son frases.
- **Palabras vetadas** (plan, § Palabras y cifras vetadas): ninguna. «Presidencia» aparece como cargo, nunca como
  promesa de cabecera de sesión del explorador.
- **Marcadores usados en este archivo:** todos declarados en `docs/marcadores/sesiones.md`, salvo los de otros
  dueños, que se listan allí en su sección y con su valor de hoy.


<!-- ═══ sesiones_antesala-1936.md ═══ -->

# Copy ES · Puerta `antesala-1936` · 16 de junio y 1 de julio de 1936 · La antesala

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.6.
> Citas en `docs/marcadores/citas.md` (claves `antesala.*`). Cifras: sesiones `1936-06-16-45` y `1936-07-01-54`, y
> `puerta.antesala-1936.*`. Dos sesiones: F30 con una pestaña por fecha. Unas 490 palabras de copy. Ruta:
> `/es/cortes/sesiones/antesala-1936/`. Vecinas: `pistola-1934` · `figueres-1939`.
>
> **Ampliación sobre la narrativa, comprobada hoy.** El 16-VI-1936 el Diario anota DOS veces palabras que «no constan»
> por orden de la Presidencia (V2 105310 y 105324). **No se dice** un juicio sobre la responsabilidad de nadie en lo
> que vino después, ni se describe la biblioteca «Sesiones decisivas» (sale de un índice que no se publica).

<!-- sesiones.antesala-1936.meta.titulo -->
La antesala · 16 de junio y 1 de julio de 1936

<!-- sesiones.antesala-1936.meta.descripcion -->
Dos sesiones de 1936 sobre el orden público: lo que dijeron Calvo Sotelo, Casares Quiroga y Galarza, y lo que el Diario no recoge.

<!-- sesiones.antesala-1936.antetitulo -->
16 de junio y 1 de julio de 1936 · Sesiones núm. 45 y 54 · Cortes de 1936 · DSC núm. 45, pp. 1359–1413, y núm. 54, pp. 1721–1821 (metadatos del proyecto)

<!-- sesiones.antesala-1936.titulo -->
La antesala

<!-- sesiones.antesala-1936.entrada -->
¿Qué pasó en estas sesiones, y cómo las leo enteras?

## Qué pasó

<!-- sesiones.antesala-1936.que_paso.texto -->
Dos sesiones sobre el orden público, pocas semanas antes de la guerra. Preside las dos Diego Martínez Barrio.

<!-- sesiones.antesala-1936.que_paso.2 -->
El 16 de junio se enfrentan Calvo Sotelo y el Presidente del Consejo de Ministros, Casares Quiroga. Ese día, el Diario anota dos veces palabras que no constan por orden de la Presidencia.

<!-- sesiones.antesala-1936.que_paso.3 -->
El 1 de julio, la Presidencia corta a Galarza a media frase y ordena que sus palabras no consten.

<!-- sesiones.antesala-1936.que_paso.4 -->
Es la sesión con más palabras de todo el corpus: 97.055 en la edición depositada.

> [nota de diseño] «Pocas semanas antes de la guerra»: la nota que abre el volumen de la guerra fecha el corte en el
> 18 de julio (v3 121110). «Con más palabras»: lo es en la V2 y en la v3 (comprobado). Martínez Barrio preside según
> los metadatos del proyecto.

## Lo que dice el Diario

<!-- sesiones.antesala-1936.diario.cita.calvo -->
«Yo digo lo que Santo Domingo de Silos contestó a un rey castellano: “Señor, la vida podéis quitarme, pero más no podéis.”»

<!-- sesiones.antesala-1936.diario.cita.calvo.pie -->
José Calvo Sotelo, 16 de junio · V2 105356 · v3 119131 · 1.718 palabras (V2)

<!-- sesiones.antesala-1936.diario.cita.casares -->
«…haré responsable ante el país a S. S.»

<!-- sesiones.antesala-1936.diario.cita.casares.pie -->
Santiago Casares Quiroga, 16 de junio · V2 105330 · v3 119104

<!-- sesiones.antesala-1936.diario.cita.galarza -->
«¡Ah!, pero yo proclamo una cosa: la violencia... (El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)»

<!-- sesiones.antesala-1936.diario.cita.galarza.pie -->
Ángel Galarza, 1 de julio · V2 106289 · v3 120221

<!-- sesiones.antesala-1936.diario.cita.presidencia -->
«Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones.»

<!-- sesiones.antesala-1936.diario.cita.presidencia.pie -->
La Presidencia (Martínez Barrio), en la fila siguiente · V2 106290 · v3 120222

<!-- sesiones.antesala-1936.diario.cita.galarza2 -->
«…esas palabras, que en el Diario de Sesiones no figurarán, el país las conocerá…»

<!-- sesiones.antesala-1936.diario.cita.galarza2.pie -->
Ángel Galarza, en la fila siguiente · V2 106291 · v3 120223

> [nota de diseño] Los tres «...» de la cita de Galarza son del texto, no un corte nuestro. Las tres filas del
> 1 de julio van seguidas, como en el Diario, con un filete fino entre ellas.

## La sesión, turno a turno

<!-- sesiones.antesala-1936.turnos.texto -->
Dos figuras, una por sesión. Entre las dos suman 284 filas de la edición depositada.

## Cómo encontrarla en el explorador

<!-- sesiones.antesala-1936.explorador.fecha.1 -->
Filtros › Fecha y sesión: Desde y Hasta 16/06/1936. Salen 172 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 159.

<!-- sesiones.antesala-1936.explorador.fecha.2 -->
Para la segunda, Desde y Hasta 01/07/1936: 137 intervenciones; con «Solo lo que se habla», 125.

<!-- sesiones.antesala-1936.explorador.consulta -->
"no constan por orden" | "no se consigna por orden" | "no se consignan por orden"

<!-- sesiones.antesala-1936.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 5 intervenciones en la edición del explorador (v3).

<!-- sesiones.antesala-1936.explorador.consulta.nota -->
Busca las acotaciones de palabras suprimidas por la Presidencia. En todo el corpus salen cinco, y tres son de estas dos sesiones.

<!-- sesiones.antesala-1936.explorador.biblioteca -->
El debate preparado «Orden público en la primavera de 1936» reúne 604 intervenciones de cinco sesiones, de abril a julio de 1936.

> [nota de diseño] `CopiarConsulta` sin filtros, recuento `5`. Las otras dos acotaciones
> son del 6-V-1936 y están en El Diario (F28). [Ver qué recoge el Diario] (`comun.boton.ver_diario`) va debajo.

## Lo que no está

<!-- sesiones.antesala-1936.no_esta.texto -->
La frase que a veces se atribuye a Dolores Ibárruri el 16 de junio no aparece en ninguna fila: «Este hombre ha hablado por última vez». Ella sí habló ese día.

> [nota de diseño] «A veces se atribuye» es un hecho externo: pendiente de su referencia [A] en la puerta de
> bibliografía (`peticiones/sesiones.md`). Si no llega, la frase se queda en lo que el corpus prueba: «“Este hombre ha
> hablado por última vez” no aparece en ninguna fila».

<!-- sesiones.antesala-1936.no_esta.pie -->
Dolores Ibárruri, 16 de junio · V2 105336

<!-- sesiones.antesala-1936.no_esta.2 -->
Lo que la Presidencia mandó quitar tampoco está: el Diario solo deja constancia de que se quitó.

## Fuentes

<!-- sesiones.antesala-1936.fuentes.texto -->
Todo lo que dice esta página sale del Diario de Sesiones, leído en las dos ediciones de la base. No se afirma aquí ningún hecho que el Diario no recoja.

## Cómo citar un pasaje

<!-- sesiones.antesala-1936.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.antesala-1936.citar.cita -->
Diario de las Sesiones de Cortes. Congreso de los Diputados, núm. 54, 1 de julio de 1936, pp. 1721–1821 (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 106289.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `comun.cita.pasaje` con: diario = «Diario de las Sesiones de Cortes. Congreso de los Diputados»;
> numero = `sesion.1936-07-01-54.diario_num`; fecha = «1 de julio de 1936»; paginas =
> `sesion.1936-07-01-54.paginas`; edicion = «edición depositada (V2)»; id = `cita.antesala.galarza.V2`. Debajo, ↺ 4
> y ↺ 1.


<!-- ═══ sesiones_casas-viejas-1933.md ═══ -->

# Copy ES · Puerta `casas-viejas-1933` · 2 de febrero de 1933 · Casas Viejas

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.4.
> Citas en `docs/marcadores/citas.md` (claves `casasviejas.*`). Cifras: sesión `1933-02-02-288` y búsquedas de
> «casas viejas» (las de febrero y del total son marcadores compartidos con la página Explorador). Unas 450 palabras
> de copy. Ruta: `/es/cortes/sesiones/casas-viejas-1933/`. Vecinas: `estatuto-1932` · `pistola-1934`.
>
> **No se dice** la fecha de los sucesos (es externa y no tiene aún referencia) ni una sola cifra de «casas viejas»
> sin su base y su filtro.

<!-- sesiones.casas-viejas-1933.meta.titulo -->
Casas Viejas · 2 de febrero de 1933

<!-- sesiones.casas-viejas-1933.meta.descripcion -->
Azaña responde en las Constituyentes por los sucesos de Casas Viejas: lo que dice el Diario y cómo seguir el nombre del pueblo en el explorador.

<!-- sesiones.casas-viejas-1933.antetitulo -->
2 de febrero de 1933 · Sesión núm. 288 · Constituyentes · DSCCRE núm. 288, pp. 10883–10916 (metadatos del proyecto)

<!-- sesiones.casas-viejas-1933.titulo -->
Casas Viejas

<!-- sesiones.casas-viejas-1933.entrada -->
¿Qué pasó en esta sesión, y cómo la leo entera?

## Qué pasó

<!-- sesiones.casas-viejas-1933.que_paso.texto -->
Entre el 28 de diciembre de 1932 y el 1 de febrero de 1933 las Cortes no se reúnen: los números del Diario van seguidos.

<!-- sesiones.casas-viejas-1933.que_paso.2 -->
En su segunda sesión de febrero, Manuel Azaña, Presidente del Consejo de Ministros, responde por los sucesos de Casas Viejas.

<!-- sesiones.casas-viejas-1933.que_paso.3 -->
Niega toda responsabilidad del Gobierno, y las minorías protestan. Tres semanas después, Martínez Barrio le recuerda sus palabras en la Cámara.

<!-- sesiones.casas-viejas-1933.que_paso.4 -->
El nombre del pueblo vuelve una y otra vez: la búsqueda lo encuentra desde febrero de 1933 hasta julio de 1936.

> [nota de diseño] «Los números del Diario van seguidos»: DSCCRE 286 (28-XII-1932) y 287 (1-II-1933), metadatos del
> proyecto; en la V2 no hay ninguna fila de enero de 1933. «Segunda sesión de febrero»: la 287 es del día 1 y la 288,
> del 2. Martínez Barrio cita la frase el 23-II-1933 (`cita.casasviejas.martinezbarrio`). Primera y última fecha de
> la búsqueda: 1-II-1933 y 3-VII-1936 (v3).

## Lo que dice el Diario

<!-- sesiones.casas-viejas-1933.diario.cita.hurgue -->
«…por mucho que se hurgue no se encontrará un atisbo de responsabilidad para el Gobierno.»

<!-- sesiones.casas-viejas-1933.diario.cita.hurgue.pie -->
Manuel Azaña · V2 44922 · v3 50255 · 528 palabras (V2)

<!-- sesiones.casas-viejas-1933.diario.cita.azana -->
«En Casas Viejas no ha ocurrido sino lo que tenía que ocurrir. (Fuertes rumores y protestas en los bancos de las minorías; contraprotestas en la mayoría.)»

<!-- sesiones.casas-viejas-1933.diario.cita.azana.pie -->
Manuel Azaña, en la misma fila, con la acotación del taquígrafo

<!-- sesiones.casas-viejas-1933.diario.cita.martinezbarrio -->
«…nos dijo: “En los sucesos de Casas Viejas, Sres. Diputados, por mucho que se hurgue…”»

<!-- sesiones.casas-viejas-1933.diario.cita.martinezbarrio.pie -->
Diego Martínez Barrio, 23 de febrero de 1933 · V2 46426 · v3 51919

## La sesión, turno a turno

<!-- sesiones.casas-viejas-1933.turnos.texto -->
La fila más alta es de Azaña, que interviene varias veces en la sesión.

## Cómo encontrarla en el explorador

<!-- sesiones.casas-viejas-1933.explorador.fecha -->
Filtros › Fecha y sesión: Desde y Hasta 02/02/1933. Salen 166 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 156.

<!-- sesiones.casas-viejas-1933.explorador.consulta -->
"casas viejas"

<!-- sesiones.casas-viejas-1933.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 375 intervenciones en la edición del explorador (v3).

<!-- sesiones.casas-viejas-1933.explorador.consulta.meses -->
Contando todas las filas, salen 114 intervenciones en febrero de 1933 y 126 en marzo.

<!-- sesiones.casas-viejas-1933.explorador.consulta.meses.habla -->
Con «Solo lo que se habla», que deja fuera sumarios y comentarios, son 102 y 108.

<!-- sesiones.casas-viejas-1933.explorador.consulta.frase -->
La frase de Azaña, entre comillas, sale en dos intervenciones: la suya y la de Martínez Barrio.

<!-- sesiones.casas-viejas-1933.explorador.frase.consulta -->
"no ha ocurrido sino lo que tenía que ocurrir"

<!-- sesiones.casas-viejas-1933.explorador.frase.recuento -->
Recuento del 22 de septiembre de 2026: dos intervenciones en la edición del explorador (v3).

<!-- sesiones.casas-viejas-1933.explorador.biblioteca -->
El debate preparado «Casas Viejas» reúne 943 intervenciones de nueve sesiones, de febrero y marzo de 1933.

> [nota de diseño] `CopiarConsulta` sin filtros, recuento `375` (todo el corpus, todas las
> filas); los meses van con Desde y Hasta de cada mes. Una segunda `CopiarConsulta` lleva
> `"no ha ocurrido sino lo que tenía que ocurrir"`. Las cifras de febrero son las mismas que da la Tendencia del
> explorador con y sin «aplicar filtros» (página Explorador).

## Lo que no está

<!-- sesiones.casas-viejas-1933.no_esta.texto -->
Buscada en el corpus, «tiros a la barriga» no sale en 1933. La primera fila que la trae es un grito del 31 de mayo de 1934:

<!-- sesiones.casas-viejas-1933.no_esta.cita.barriga -->
«Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!»

<!-- sesiones.casas-viejas-1933.no_esta.cita.barriga.pie -->
Varios diputados, en una acotación de la fila de José Tomás y Piera · V2 70714 · v3 79606

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

## Fuentes

<!-- sesiones.casas-viejas-1933.fuentes.texto -->
Todo lo que dice esta página sale del Diario de Sesiones, leído en las dos ediciones de la base. No se afirma aquí ningún hecho que el Diario no recoja.

## Cómo citar un pasaje

<!-- sesiones.casas-viejas-1933.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.casas-viejas-1933.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, núm. 288, 2 de febrero de 1933, pp. 10883–10916 (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 44922.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `comun.cita.pasaje` con: diario = «Diario de Sesiones de las Cortes Constituyentes de la República
> Española»; numero = `sesion.1933-02-02-288.diario_num`; fecha = «2 de febrero de 1933»; paginas =
> `sesion.1933-02-02-288.paginas`; edicion = «edición depositada (V2)»; id = `cita.casasviejas.azana.V2`. Debajo,
> ↺ 4 y ↺ 1.


<!-- ═══ sesiones_cuestion-religiosa-1931.md ═══ -->

# Copy ES · Puerta `cuestion-religiosa-1931` · 13 de octubre de 1931 · «España ha dejado de ser católica»

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.2.
> Citas en `docs/marcadores/citas.md` (claves `religiosa.*`). Cifras: sesión `1931-10-13-55`. Unas 430 palabras de
> copy. Ruta: `/es/cortes/sesiones/cuestion-religiosa-1931/`. Vecinas: `sufragio-1931` · `estatuto-1932`.
>
> **No se dice** «la más crispada» ni ninguna cuenta de acotaciones «de conflicto»: esas cifras salen de una
> clasificación que el plan deja para la edición 0.2 (D-11).

<!-- sesiones.cuestion-religiosa-1931.meta.titulo -->
«España ha dejado de ser católica» · 13 de octubre de 1931

<!-- sesiones.cuestion-religiosa-1931.meta.descripcion -->
La sesión del artículo religioso de la Constitución en el Diario: el discurso de Azaña, la votación nominal y la noche en que se debatió.

<!-- sesiones.cuestion-religiosa-1931.antetitulo -->
13 de octubre de 1931 · Sesión núm. 55 · Constituyentes · DSCCRE núm. 55, pp. 1641–1721 (metadatos del proyecto)

<!-- sesiones.cuestion-religiosa-1931.titulo -->
«España ha dejado de ser católica»

<!-- sesiones.cuestion-religiosa-1931.entrada -->
¿Qué pasó en esta sesión, y cómo la leo entera?

## Qué pasó

<!-- sesiones.cuestion-religiosa-1931.que_paso.texto -->
Las Constituyentes debaten el artículo 24 del proyecto de Constitución. El Secretario lee su nueva redacción, que empieza así:

<!-- sesiones.cuestion-religiosa-1931.que_paso.cita.articulo -->
«Art. 24. Todas las confesiones religiosas serán consideradas como Asociaciones sometidas a una ley especial.»

<!-- sesiones.cuestion-religiosa-1931.que_paso.cita.articulo.pie -->
El Secretario (Ramos) · V2 6628 · v3 7398

<!-- sesiones.cuestion-religiosa-1931.que_paso.2 -->
La sesión empieza por la tarde y dura toda la noche. Habla Manuel Azaña, entonces ministro de la Guerra.

<!-- sesiones.cuestion-religiosa-1931.que_paso.3 -->
Al final, el artículo se aprueba en votación nominal. En la lista del no están Alcalá-Zamora y Maura, los dos del Gobierno provisional.

<!-- sesiones.cuestion-religiosa-1931.que_paso.4 -->
Al día siguiente, el Diario ya rotula a Azaña como «Presidente del Gobierno».

> [nota de diseño] «Los dos del Gobierno provisional»: el Gobierno de la sesión es el provisional de Alcalá-Zamora
> (metadatos del proyecto), y Maura habla en esas semanas como ministro de la Gobernación (V2 5788, rótulo «El Sr.
> Ministro de la GOBERNACION (Maura)»). El rótulo de Azaña del 14-X-1931 es el de V2 7022 · v3 7833
> (`cita.religiosa.presidente_gobierno`). Por qué cambia de cargo no lo cuenta el Diario: no se dice.

## Lo que dice el Diario

<!-- sesiones.cuestion-religiosa-1931.diario.cita.azana -->
«España ha dejado de ser católica: el problema político consiguiente es organizar el Estado en forma tal que puede adecuado a esta fase nueva e histórica del pueblo español.»

<!-- sesiones.cuestion-religiosa-1931.diario.cita.azana.pie -->
Manuel Azaña, ministro de la Guerra · V2 6748 · v3 7531 · 6.009 palabras (V2)

<!-- sesiones.cuestion-religiosa-1931.diario.cita.resultado -->
«…quedó aprobado el artículo 24 por 178 votos contra 59…»

<!-- sesiones.cuestion-religiosa-1931.diario.cita.resultado.pie -->
Diario · V2 6994 · v3 7800

<!-- sesiones.cuestion-religiosa-1931.diario.cita.apertura -->
«Abierta la sesión a las cuatro y treinta minutos de la tarde…»

<!-- sesiones.cuestion-religiosa-1931.diario.cita.apertura.pie -->
Sumario de la sesión · solo en la edición del explorador, v3 7387

<!-- sesiones.cuestion-religiosa-1931.diario.cita.cierre -->
«Eran las siete y treinta y cinco minutos de la mañana del día 14.»

<!-- sesiones.cuestion-religiosa-1931.diario.cita.cierre.pie -->
Diario, al final de la sesión · V2 6999 · v3 7807

> [nota de diseño] El [sic] marca «puede» donde el sentido pide otra palabra; la nota emergente es
> `sesiones.puerta.cita.sic`. La apertura solo está en el sumario, que la V2 no trae como fila.

## La sesión, turno a turno

<!-- sesiones.cuestion-religiosa-1931.turnos.texto -->
Es una sesión larga, con muchas filas cortas de la Presidencia entre los discursos. La barra más alta es la de Azaña.

## La votación

<!-- sesiones.cuestion-religiosa-1931.votacion.texto -->
Una sola barra: el artículo 24, aprobado por 178 votos contra 59.

> [nota de diseño] F26 mínima con la barra del 178–59. Esa noche el Diario imprime otras cinco listas nominales (otro
> artículo y varias enmiendas: V2 6738, 6812, 6818, 6844, 6923); la figura solo lleva la del artículo 24.

## Cómo encontrarla en el explorador

<!-- sesiones.cuestion-religiosa-1931.explorador.fecha -->
Filtros › Fecha y sesión: Desde y Hasta 13/10/1931. Salen 421 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 380.

<!-- sesiones.cuestion-religiosa-1931.explorador.consulta -->
"España ha dejado de ser católica"

<!-- sesiones.cuestion-religiosa-1931.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 6 intervenciones en la edición del explorador (v3).

<!-- sesiones.cuestion-religiosa-1931.explorador.consulta.nota -->
La de Azaña sale en el puesto 4 por relevancia. Las demás son de diputados que repiten la frase después, entre 1931 y 1934.

<!-- sesiones.cuestion-religiosa-1931.explorador.biblioteca -->
El debate preparado «Cuestión religiosa (art. 26)» reúne 486 intervenciones de cuatro sesiones. Su nombre usa otro número de artículo que el Diario de aquel día, que habla del artículo 24.

> [nota de diseño] `CopiarConsulta` sin filtros, recuento `6` (marcador compartido con la página
> Explorador). Las demás apariciones: Balbontín (1-XII-1931), Royo Villanova (18-III-1932, 5-V-1933, 20-XI-1934) y
> Aizpún (26-IV-1933), en la v3.

## Lo que no está

<!-- sesiones.cuestion-religiosa-1931.no_esta.texto -->
Por qué Azaña pasa a presidir el Gobierno no lo cuenta esta sesión. El Diario solo registra el cambio de rótulo al día siguiente.

## Fuentes

<!-- sesiones.cuestion-religiosa-1931.fuentes.texto -->
Todo lo que dice esta página sale del Diario de Sesiones, leído en las dos ediciones de la base. No se afirma aquí ningún hecho que el Diario no recoja.

## Cómo citar un pasaje

<!-- sesiones.cuestion-religiosa-1931.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.cuestion-religiosa-1931.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, núm. 55, 13 de octubre de 1931, pp. 1641–1721 (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 6748.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `comun.cita.pasaje` con: diario = «Diario de Sesiones de las Cortes Constituyentes de la República
> Española»; numero = `sesion.1931-10-13-55.diario_num`; fecha = «13 de octubre de 1931»; paginas =
> `sesion.1931-10-13-55.paginas`; edicion = «edición depositada (V2)»; id = `cita.religiosa.azana.V2`. Debajo, ↺ 4
> y ↺ 1.


<!-- ═══ sesiones_estatuto-1932.md ═══ -->

# Copy ES · Puerta `estatuto-1932` · 27 de mayo de 1932 · El discurso de Azaña, a nombre de otro

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.3.
> Citas en `docs/marcadores/citas.md` (claves `estatuto.*`). Cifras: sesión `1932-05-27-173` y `puerta.estatuto-1932.*`.
> Unas 440 palabras de copy. Ruta: `/es/cortes/sesiones/estatuto-1932/`. Vecinas: `cuestion-religiosa-1931` ·
> `casas-viejas-1933`.
>
> **Corrección a la narrativa.** «El discurso más largo» es cierto en la edición del explorador, sin contar sumarios ni
> comentarios (v3 29042, la intervención de habla más larga). En la V2 es la SEGUNDA fila más larga: la primera es
> V2 55221 (Prieto, 12-VII-1933, 25.371 palabras), que lleva dentro «DOCUMENTOS COMPLEMENTARIOS DEL DISCURSO» y que la
> v3 parte (v3 61932, comentarios). El copy lo dice con su base, en el cuerpo de la puerta, no en el título.
>
> **Fase 2 (corrector del copy, REVISION_FASE1 P1-2 y P2-1; plan R17 y R22):** el título es el de la narrativa §10.3,
> «El discurso de Azaña, a nombre de otro». Las palabras del discurso no se dan exactas: ninguna de las tres cifras
> (17.231, 17.152 o 17.142). Se dice «más de 17.000», con el marcador `puerta.estatuto-1932.umbral`, que el exportador
> calcula como el millar entero por debajo de la menor de las dos filas (V2 25979 y v3 29042): si una bajara, falla.

<!-- sesiones.estatuto-1932.meta.titulo -->
El discurso de Azaña, a nombre de otro · 27 de mayo de 1932

<!-- sesiones.estatuto-1932.meta.descripcion -->
Azaña defiende el Estatuto de Cataluña en las Constituyentes, y cada edición de la base pone su discurso a nombre de un orador distinto.

<!-- sesiones.estatuto-1932.antetitulo -->
27 de mayo de 1932 · Sesión núm. 173 · Constituyentes · DSCCRE núm. 173, pp. 5835–5877 (metadatos del proyecto)

<!-- sesiones.estatuto-1932.titulo -->
El discurso de Azaña, a nombre de otro

<!-- sesiones.estatuto-1932.entrada -->
¿Qué pasó en esta sesión, y cómo la leo entera?

## Qué pasó

<!-- sesiones.estatuto-1932.que_paso.texto -->
Manuel Azaña, Presidente del Consejo de Ministros, defiende en la Cámara el proyecto de Estatuto de Cataluña, en un discurso de más de 17.000 palabras.

<!-- sesiones.estatuto-1932.que_paso.2 -->
En la edición del explorador (v3) es la intervención de habla más larga del corpus.

<!-- sesiones.estatuto-1932.que_paso.3 -->
La edición depositada la cuenta de otra manera, y esta puerta enseña por qué.

## Lo que dice el Diario

<!-- sesiones.estatuto-1932.diario.cita.azana -->
«Cataluña dice, los catalanes dicen: “quieremos vivir de otra manera dentro del Estado español”. La pretensión es legítima; es legítima porque la autoriza la ley, nada menos que la ley constitucional.»

<!-- sesiones.estatuto-1932.diario.cita.azana.pie -->
Manuel Azaña · V2 25979 · v3 29042

## Dos ediciones, dos oradores

> [nota de diseño] Sustituye aquí a «La sesión, turno a turno» como entrada de F30: es la razón de ser de la puerta.
> Su título propio, `sesiones.estatuto-1932.turnos.titulo`, sustituye al común de la plantilla; luego va F30.

<!-- sesiones.estatuto-1932.turnos.titulo -->
Dos ediciones, dos oradores

<!-- sesiones.estatuto-1932.turnos.v2 -->
En la V2, el discurso va dentro de una fila de más de 17.000 palabras a nombre de «El Sr. PRESIDENTE».

<!-- sesiones.estatuto-1932.turnos.v2.2 -->
La fila empieza con la Presidencia dando la palabra y sigue con un rótulo cortado a media palabra:

<!-- sesiones.estatuto-1932.turnos.cita.rotulo -->
«El Sr. Presidente del Consejo de Ministros tiene la palabra.» … «El Sr. Presidente del CONSEJO DE MINIS»

<!-- sesiones.estatuto-1932.turnos.cita.rotulo.pie -->
V2 25979, a nombre de Julián Besteiro, que presidía

<!-- sesiones.estatuto-1932.turnos.v3 -->
En la v3 son dos filas: diez palabras de la Presidencia y el discurso, a nombre de Azaña.

<!-- sesiones.estatuto-1932.turnos.v3.pie -->
v3 29041 y 29042

<!-- sesiones.estatuto-1932.turnos.efecto -->
Por eso, quien cuente palabras por orador en la V2 le da este discurso a Besteiro.

<!-- sesiones.estatuto-1932.turnos.rango -->
En la V2 es la segunda fila más larga. La primera, de Prieto, lleva dentro los «DOCUMENTOS COMPLEMENTARIOS» de su discurso, que la v3 pasa a una fila aparte.

<!-- sesiones.estatuto-1932.turnos.rango.pie -->
Prieto, 12 de julio de 1933 · V2 55221 · documentos en v3 61932

<!-- sesiones.estatuto-1932.turnos.texto -->
En la figura, la barra del discurso sale como Presidencia, porque así la trae la V2.

> [nota de diseño] F30 con la barra de V2 25979 en el trazo de la Presidencia y su nota propia
> (`fig.F30.nota.estatuto`). Debajo, [Ver por qué hay dos ediciones] (`comun.boton.ver_versiones`).

## Cómo encontrarla en el explorador

<!-- sesiones.estatuto-1932.explorador.fecha -->
Filtros › Fecha y sesión: Desde y Hasta 27/05/1932. Salen 49 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 45.

<!-- sesiones.estatuto-1932.explorador.consulta -->
"vivir de otra manera"

<!-- sesiones.estatuto-1932.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 2 intervenciones en la edición del explorador (v3).

<!-- sesiones.estatuto-1932.explorador.consulta.nota -->
La otra intervención que la trae es de Pedro Martín y Martín, el 27 de julio de 1933.

<!-- sesiones.estatuto-1932.explorador.biblioteca -->
El debate preparado «Estatuto de Cataluña» reúne 307 intervenciones de seis sesiones, de mayo a septiembre de 1932.

> [nota de diseño] `CopiarConsulta` sin filtros; recuento `2` («dos intervenciones»: la
> frase de la nota solo vale mientras el recuento sea 2, y el exportador lo comprueba).

## Lo que no está

<!-- sesiones.estatuto-1932.no_esta.texto -->
La votación del Estatuto no es de este día: llega el 9 de septiembre de 1932, por 314 votos contra 24.

> [nota de diseño] «La votación del Estatuto» enlaza a su fila en la tabla de F26 (`/{lang}/cortes/sesiones/#votaciones`).

## Fuentes

<!-- sesiones.estatuto-1932.fuentes.texto -->
Todo lo que dice esta página sale del Diario de Sesiones, leído en las dos ediciones de la base. No se afirma aquí ningún hecho que el Diario no recoja.

## Cómo citar un pasaje

<!-- sesiones.estatuto-1932.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.estatuto-1932.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, núm. 173, 27 de mayo de 1932, pp. 5835–5877 (metadatos del proyecto). Luz y Taquígrafos, edición del explorador (v3, sin depositar), fila 29042.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

<!-- sesiones.estatuto-1932.citar.nota -->
Si cita el discurso por su fila, diga la edición: en la V2 está a nombre de la Presidencia.

> [nota de diseño] `comun.cita.pasaje` con: diario = «Diario de Sesiones de las Cortes Constituyentes de la República
> Española»; numero = `sesion.1932-05-27-173.diario_num`; fecha = «27 de mayo de 1932»; paginas =
> `sesion.1932-05-27-173.paginas`; edicion = «edición del explorador (v3, sin depositar)»; id =
> `cita.estatuto.azana.v3`. Aquí, excepcionalmente, el modelo cita la v3: es la que atribuye bien el discurso. Debajo,
> ↺ 4 y ↺ 1.


<!-- ═══ sesiones_figueres-1939.md ═══ -->

# Copy ES · Puerta `figueres-1939` · 1 de febrero de 1939 · Figueres

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.7.
> Citas en `docs/marcadores/citas.md` (claves `figueres.*`). Cifras: sesión `1939-02-01-69`. Unas 480 palabras de
> copy. Ruta: `/es/cortes/sesiones/figueres-1939/`. Vecinas: `antesala-1936` · `mexico-1945`.
>
> **Corrección a la narrativa, comprobada hoy.** El extracto SÍ nombra el lugar: la proposición leída en la sesión
> está fechada en el «Castillo de Figueras» (V2 107337 · v3 121459), y una nota al final explica que el extracto se
> consiguió después, en fotocopia (V2 107341 · v3 121465). Ya no queda «pendiente del PDF» la contradicción con la nota
> del volumen de la guerra: el propio corpus la explica. Hubo además una votación nominal (62 votos a favor). El título
> usa el nombre de hoy, Figueres; las citas conservan «Figueras».

<!-- sesiones.figueres-1939.meta.titulo -->
Figueres · 1 de febrero de 1939

<!-- sesiones.figueres-1939.meta.descripcion -->
La última sesión de las Cortes en España, en el castillo de Figueras, según el extracto oficial: Negrín, Martínez Barrio y dos notas que se contradicen.

<!-- sesiones.figueres-1939.antetitulo -->
1 de febrero de 1939 · Sesión núm. 69 · Guerra · Extracto oficial, páginas sin verificar (metadatos del proyecto)

<!-- sesiones.figueres-1939.titulo -->
Figueres

<!-- sesiones.figueres-1939.entrada -->
¿Qué pasó en esta sesión, y cómo la leo entera?

## Qué pasó

<!-- sesiones.figueres-1939.que_paso.texto -->
Es la última sesión de las Cortes en España. La siguiente será en México, casi seis años después.

<!-- sesiones.figueres-1939.que_paso.2 -->
El corpus no tiene el Diario de esa noche, sino un extracto oficial. La proposición que se lee en la sesión está fechada en el «Castillo de Figueras».

<!-- sesiones.figueres-1939.que_paso.3 -->
Preside Diego Martínez Barrio. Juan Negrín, Presidente del Consejo de Ministros, hace su declaración ante la Cámara.

<!-- sesiones.figueres-1939.que_paso.4 -->
La proposición se aprueba en votación nominal. El extracto imprime la lista de los que dijeron sí (V2 107340 · v3 121463) y, después, el resultado:

<!-- sesiones.figueres-1939.que_paso.cita.votacion -->
«Han votado afirmativamente los sesenta y dos señores Diputados.»

<!-- sesiones.figueres-1939.que_paso.cita.votacion.pie -->
La Presidencia (Martínez Barrio) · V2 107341 · v3 121464

> [nota de diseño] «La siguiente será en México»: la sesión 70, del 10-I-1945 (V2). Esta votación no entra en F26,
> que es una selección de 1931 a 1936. **Fase 2 (corrector del copy):** la fase 1 decía que el extracto no imprime la
> lista; sí la imprime, encabezada «Señores Diputados que dijeron SI:» (V2 107340 · v3 121463, leídas hoy). La
> búsqueda común de listas no la ve (`sesiones.votos.etapas.salvedad`).

## Lo que dice el Diario

<!-- sesiones.figueres-1939.diario.cita.negrin -->
«Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra.»

<!-- sesiones.figueres-1939.diario.cita.negrin.pie -->
Juan Negrín · V2 107326 · v3 121447 · 5.291 palabras (V2)

<!-- sesiones.figueres-1939.diario.cita.martinezbarrio -->
«Lo hacemos en un trozo de la tierra catalana que, como otras distintas de España, se encuentra actualmente nuancilada [sic] y hollada por la planta de los invasores extranjeros…»

<!-- sesiones.figueres-1939.diario.cita.martinezbarrio.pie -->
Diego Martínez Barrio, dentro de la fila del sumario · solo en la edición del explorador, v3 121446

<!-- sesiones.figueres-1939.diario.cita.castillo -->
«Castillo de Figueras, a primero de Febrero, de mil novceientos treinta y nueve.»

<!-- sesiones.figueres-1939.diario.cita.castillo.pie -->
Al pie de la proposición · V2 107337 · v3 121459

<!-- sesiones.figueres-1939.diario.cita.horas -->
El extracto no coincide consigo mismo en la hora: el sumario abre la sesión «a las veintidos horas treinta minutos», y el texto, «a las 22 horas 39».

> [nota de diseño] Las dos horas están en v3 121446, la fila del sumario (solo v3). Van como `sesiones.figueres-1939.cita.horas`,
> con su pie `sesiones.puerta.cita.pie.solo_v3`.

## La sesión, turno a turno

<!-- sesiones.figueres-1939.turnos.texto -->
En la V2 son dieciséis filas. La más alta es la de Negrín; la de Martínez Barrio no está, porque va dentro del sumario, que la V2 no trae.

## Cómo encontrarla en el explorador

<!-- sesiones.figueres-1939.explorador.fecha -->
Filtros › Fecha y sesión: Desde y Hasta 01/02/1939, sin «Solo lo que se habla». Salen veinte intervenciones en la edición del explorador (v3); con el filtro, dieciséis, y el discurso de Martínez Barrio desaparece.

<!-- sesiones.figueres-1939.explorador.consulta -->
"trozo de la tierra catalana"

<!-- sesiones.figueres-1939.explorador.recuento -->
Recuento del 22 de septiembre de 2026: una intervención en la edición del explorador (v3).

<!-- sesiones.figueres-1939.explorador.consulta.nota -->
Sin filtros sale una intervención: el sumario. Con «Solo lo que se habla», ninguna.

<!-- sesiones.figueres-1939.explorador.biblioteca -->
El debate preparado «Las Cortes en guerra» reúne 280 intervenciones de nueve sesiones, de octubre de 1936 a esta.

> [nota de diseño] `CopiarConsulta` sin filtros, con `comun.consulta.recuento.una`. «Ninguna» no lleva marcador
> propio: es `busqueda.ses.tierra_catalana.habla`, que vale 0 y el exportador lo comprueba.

## Lo que no está

<!-- sesiones.figueres-1939.no_esta.texto -->
La nota que abre el volumen de la guerra dice de esta sesión:

<!-- sesiones.figueres-1939.no_esta.cita.nota -->
«DE LA ULTILLA SESION QUE TUVO LUGAR EN LA CIUDAD DE FIGUERAS A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939, NO EXISTE DATO ALGUNO.»

<!-- sesiones.figueres-1939.no_esta.cita.nota.pie -->
Nota del volumen, en el sumario del 1 de octubre de 1936 · solo en la edición del explorador, v3 121110

<!-- sesiones.figueres-1939.no_esta.2 -->
Otra nota, al final del extracto, lo explica: el número no se había podido obtener, y apareció después.

<!-- sesiones.figueres-1939.no_esta.cita.fotocopia -->
«Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión…»

<!-- sesiones.figueres-1939.no_esta.cita.fotocopia.pie -->
Nota final · V2 107341, dentro de la última fila de la Presidencia · v3 121465

<!-- sesiones.figueres-1939.no_esta.3 -->
Quién escribió cada nota, y cuándo, no lo dice el corpus.

## Fuentes

<!-- sesiones.figueres-1939.fuentes.texto -->
Todo lo que dice esta página sale del extracto oficial y de las notas del volumen, leídos en las dos ediciones de la base. No se afirma aquí ningún hecho que no recojan.

## Cómo citar un pasaje

<!-- sesiones.figueres-1939.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.figueres-1939.citar.cita -->
Extracto oficial de las sesiones. Congreso de los Diputados, núm. 69, 1 de febrero de 1939, páginas sin verificar (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 107326.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `sesiones.puerta.citar.sinpaginas` (páginas sin verificar) con: diario = «Extracto oficial de las
> sesiones. Congreso de los Diputados, núm. 69»; fecha = «1 de febrero de 1939»;
> edicion = «edición depositada (V2)»; id = `cita.figueres.negrin.V2`. Debajo, ↺ 4 y ↺ 1.


<!-- ═══ sesiones_mexico-1945.md ═══ -->

# Copy ES · Puerta `mexico-1945` · 17 de agosto y 7 a 9 de noviembre de 1945 · México

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.8.
> Citas en `docs/marcadores/citas.md` (claves `mexico.*`). Cifras: sesiones `1945-08-17-71`, `1945-11-07-72`,
> `1945-11-08-73` y `1945-11-09-74`, y `puerta.mexico-1945.*`. Cuatro sesiones: F30 con una pestaña por fecha. Unas
> 430 palabras de copy. Ruta: `/es/cortes/sesiones/mexico-1945/`. Vecinas: `figueres-1939` · ninguna después.
>
> **No se dice** «elección» (es una promesa, V2 107371), ni «México y París»: el corpus solo trae las sesiones de
> Cortes celebradas en México. El editor del extracto se escribe como en la carátula: «B. Costa i Amic».

<!-- sesiones.mexico-1945.meta.titulo -->
México · 1945

<!-- sesiones.mexico-1945.meta.descripcion -->
Las Cortes reunidas en la Ciudad de México en 1945: la promesa de Martínez Barrio como Presidente interino de la República y el Gobierno de Giral.

<!-- sesiones.mexico-1945.antetitulo -->
17 de agosto y 7 a 9 de noviembre de 1945 · Sesiones núm. 71 a 74 · México · Extracto oficial de las sesiones celebradas en México, páginas sin verificar (metadatos del proyecto)

<!-- sesiones.mexico-1945.titulo -->
México

<!-- sesiones.mexico-1945.entrada -->
¿Qué pasó en estas sesiones, y cómo las leo enteras?

## Qué pasó

<!-- sesiones.mexico-1945.que_paso.texto -->
En 1945 las Cortes se reúnen en la Ciudad de México. Esta puerta abre cuatro de sus cinco sesiones.

<!-- sesiones.mexico-1945.que_paso.2 -->
El 17 de agosto, Diego Martínez Barrio, Presidente de las Cortes, promete como Presidente interino de la República. Preside la sesión el vicepresidente Luis Fernández Clérigo.

<!-- sesiones.mexico-1945.que_paso.3 -->
El 7 de noviembre, José Giral presenta su Gobierno a la Cámara. Al día siguiente, la Cámara aprueba su declaración en votación ordinaria. El 9 de noviembre, entre otros asuntos, debate el Estatuto de Galicia.

<!-- sesiones.mexico-1945.que_paso.4 -->
La primera de las sesiones de México, la del 10 de enero de 1945, está en la ficha de la etapa.

> [nota de diseño] «La ficha de la etapa» enlaza a `/{lang}/cortes/mexico/`. Presidencias según los metadatos del
> proyecto: Fernández Clérigo (vicepresidente) el 17-VIII; Jiménez de Asúa (vicepresidente) del 7 al 9-XI. Los días
> 8 y 9 salen de sus sumarios, que solo trae la v3: «Se aprueba, en votación ordinaria, la propuesta sobre la
> declaración del Gobierno de la República.» (v3 121568) y «Debate sobre el Estatuto de Galicia.» (v3 121601).

## Lo que dice el Diario

<!-- sesiones.mexico-1945.diario.cita.lugar -->
«…de la sesión extraordinaria celebrada en la Ciudad de México el viernes 17 de agosto de 1945»

<!-- sesiones.mexico-1945.diario.cita.lugar.pie -->
Carátula del extracto · solo en la edición del explorador, v3 121495

<!-- sesiones.mexico-1945.diario.cita.orden -->
«Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española.»

<!-- sesiones.mexico-1945.diario.cita.orden.pie -->
La Presidencia lee el orden del día · V2 107371 · v3 121500

<!-- sesiones.mexico-1945.diario.cita.promesa -->
«¿Prometéis solemnemente fidelidad a la República y a la Constitución?» … «Si, prometo.»

<!-- sesiones.mexico-1945.diario.cita.promesa.pie -->
La Presidencia y Martínez Barrio, en la misma fila · V2 107372 · v3 121502

<!-- sesiones.mexico-1945.diario.cita.giral -->
«…al presentarse ante las Cortes españolas el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente desde el día en que el infortunio nos hizo cruzar la frontera…»

<!-- sesiones.mexico-1945.diario.cita.giral.pie -->
José Giral, 7 de noviembre · V2 107375 · v3 121507 · 7.446 palabras (V2)

> [nota de diseño] «Si, prometo.» va sin tilde, como en el texto digitalizado; no lleva [sic] porque el sentido no
> cambia. La promesa y la pregunta están en la misma fila V2, a nombre de la Presidencia.

## La sesión, turno a turno

<!-- sesiones.mexico-1945.turnos.texto -->
Cuatro figuras, una por sesión. La del 17 de agosto tiene cinco filas, todas de la Presidencia.

<!-- sesiones.mexico-1945.turnos.total -->
Entre las cuatro suman 183 filas de la edición depositada.

## Cómo encontrarla en el explorador

<!-- sesiones.mexico-1945.explorador.fecha -->
Filtros › Fecha y sesión: Desde 17/08/1945, sin Hasta. Salen 206 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 184.

<!-- sesiones.mexico-1945.explorador.consulta -->
"presidente interino de la república"

<!-- sesiones.mexico-1945.explorador.filtros -->
Desde 01/01/1945

<!-- sesiones.mexico-1945.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 6 intervenciones en la edición del explorador (v3).

<!-- sesiones.mexico-1945.explorador.consulta.nota -->
Con Desde 01/01/1945, salen seis intervenciones, de agosto y noviembre de 1945.

<!-- sesiones.mexico-1945.explorador.biblioteca -->
El debate preparado «Las Cortes en el exilio» reúne 211 intervenciones de las cinco sesiones de México.

> [nota de diseño] `CopiarConsulta` con el filtro Desde 01/01/1945 y el recuento `6`.
> El nombre de la biblioteca es el del explorador; el sitio no llama «exilio» a nada más que a estas sesiones.

## Lo que no está

<!-- sesiones.mexico-1945.no_esta.texto -->
Entre Figueres y México también se reunió la Diputación Permanente. Sus reuniones no están en el corpus; de las celebradas en México, la carátula del volumen dice:

<!-- sesiones.mexico-1945.no_esta.cita.permanente -->
«…sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia.»

<!-- sesiones.mexico-1945.no_esta.cita.permanente.pie -->
Carátula del volumen, en el sumario del 10 de enero de 1945 · solo en la edición del explorador, v3 121466

## Fuentes

<!-- sesiones.mexico-1945.fuentes.texto -->
Todo lo que dice esta página sale del extracto oficial de las sesiones celebradas en México, editado en la Ciudad de México por B. Costa i Amic, leído en las dos ediciones de la base.

## Cómo citar un pasaje

<!-- sesiones.mexico-1945.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.mexico-1945.citar.cita -->
Extracto oficial de las sesiones de Cortes celebradas en México, núm. 71, 17 de agosto de 1945, páginas sin verificar (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 107372.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `sesiones.puerta.citar.sinpaginas` con: diario = «Extracto oficial de las sesiones de Cortes
> celebradas en México, núm. 71»; fecha = «17 de agosto de 1945»; edicion =
> «edición depositada (V2)»; id = `cita.mexico.promesa.V2`. Debajo, ↺ 4 y ↺ 1.


<!-- ═══ sesiones_pistola-1934.md ═══ -->

# Copy ES · Puerta `pistola-1934` · 4 de julio de 1934 · La pistola de Prieto

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.5. Citas en `docs/marcadores/citas.md` (claves `pistola.*`). Cifras: sesión `1934-07-04-112`. Unas 430
> palabras de copy. Ruta: `/es/cortes/sesiones/pistola-1934/`. Vecinas: `casas-viejas-1933` · `antesala-1936`.
>
> **Ampliación sobre la narrativa, comprobada hoy.** El Diario sí describe la pelea: una acotación dentro de la fila de
> Gil Robles (V2 74608 · v3 84026) y la suspensión de la sesión (V2 74609 · v3 84029). **No se dice** el percentil
> de ningún índice de reacción, ni que la biblioteca «Sesiones más crispadas» la incluya.

<!-- sesiones.pistola-1934.meta.titulo -->
La pistola de Prieto · 4 de julio de 1934

<!-- sesiones.pistola-1934.meta.descripcion -->
Una sesión de las Cortes de 1933 que acaba en golpes: lo que anota el taquígrafo, la versión de Prieto y la de Oriol de la Puerta.

<!-- sesiones.pistola-1934.antetitulo -->
4 de julio de 1934 · Sesión núm. 112 · 1933-1935 · DSC núm. 112, pp. 4405–4468 (metadatos del proyecto)

<!-- sesiones.pistola-1934.titulo -->
La pistola de Prieto

<!-- sesiones.pistola-1934.entrada -->
¿Qué pasó en esta sesión, y cómo la leo entera?

## Qué pasó

<!-- sesiones.pistola-1934.que_paso.texto -->
Es de noche y la Cámara discute sobre Cataluña. Preside Santiago Alba.

<!-- sesiones.pistola-1934.que_paso.2 -->
Mientras habla Gil Robles, dos diputados llegan a las manos: Tirado, socialista, y Oriol de la Puerta, agrario. La Presidencia suspende la sesión unos minutos.

<!-- sesiones.pistola-1934.que_paso.3 -->
Al volver, Prieto da su versión y admite que sacó su pistola. Oriol de la Puerta le contesta.

<!-- sesiones.pistola-1934.que_paso.4 -->
Es la última sesión antes del verano: la siguiente es la del 1 de octubre de 1934.

> [nota de diseño] Alba preside según los metadatos del proyecto (`comun.sello.proyecto` en cuerpo menor). «Tirado,
> socialista»: la base pone a Juan Tirado en el PSOE y a Oriol de la Puerta en Agrarios; Prieto habla de «nuestros
> correligionarios» (V2 74619). La hora sale de V2 74609 («Eran las once y cuarenta minutos de la noche.»).

## Lo que dice el Diario

<!-- sesiones.pistola-1934.diario.cita.tumulto -->
«Entre los Sres. Tirado y Oriol de la Puerta se produjo un violento altercado, llegando a agredirse dichos Sres. Diputados.—Esto determinó un verdadero tumulto en la Cámara.»

<!-- sesiones.pistola-1934.diario.cita.tumulto.pie -->
Acotación del taquígrafo, dentro de la fila de Gil Robles · V2 74608 · v3 84026

<!-- sesiones.pistola-1934.diario.cita.golpes -->
«Estos incidentes limitados a palabras son corrientes; el de hoy se ha convertido en golpes.»

<!-- sesiones.pistola-1934.diario.cita.golpes.pie -->
Indalecio Prieto · V2 74619 · v3 84039 · 293 palabras (V2)

<!-- sesiones.pistola-1934.diario.cita.pistola -->
«…es exacto, Sr. Presidente, que ha salido a luz alguna pistola, por lo menos la mía…»

<!-- sesiones.pistola-1934.diario.cita.pistola.pie -->
Indalecio Prieto, en la misma fila

<!-- sesiones.pistola-1934.diario.cita.oriol -->
«Invito al Sr. Prieto a que diga quien ha sacado la pistola; lo que es un hecho completamente cierto, que saben todos los presentes, es que el Sr. Prieto la tenía.»

<!-- sesiones.pistola-1934.diario.cita.oriol.pie -->
Jaime Oriol de la Puerta · V2 74621 · v3 84041

## La sesión, turno a turno

<!-- sesiones.pistola-1934.turnos.texto -->
Tras la suspensión, la figura enseña los turnos seguidos de la Presidencia, Prieto, Oriol de la Puerta y Tirado.

## Cómo encontrarla en el explorador

<!-- sesiones.pistola-1934.explorador.fecha -->
Filtros › Fecha y sesión: Desde y Hasta 04/07/1934. Salen 282 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 255.

<!-- sesiones.pistola-1934.explorador.consulta -->
pistola

<!-- sesiones.pistola-1934.explorador.filtros -->
Desde 04/07/1934 · Hasta 04/07/1934

<!-- sesiones.pistola-1934.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 3 intervenciones en la edición del explorador (v3).

<!-- sesiones.pistola-1934.explorador.consulta.nota -->
Con Desde y Hasta 04/07/1934, salen tres intervenciones: Prieto, Oriol de la Puerta y Muñoz Martínez. Sin fechas, 164 en todo el corpus.

> [nota de diseño] `CopiarConsulta` con los filtros Desde y Hasta 04/07/1934 y el recuento
> `3`. La de Muñoz Martínez es la acotación «Su señoría fue el primero que en cierta
> ocasión sacó una pistola» (V2 74613 · v3 84033). Esta sesión no tiene debate preparado propio.

## Lo que no está

<!-- sesiones.pistola-1934.no_esta.texto -->
El Diario no dice quién sacó primero una pistola. Da dos versiones: la de Prieto, que la sacó después de ver otra, y la de Oriol de la Puerta.

## Fuentes

<!-- sesiones.pistola-1934.fuentes.texto -->
Todo lo que dice esta página sale del Diario de Sesiones, leído en las dos ediciones de la base. No se afirma aquí ningún hecho que el Diario no recoja.

## Cómo citar un pasaje

<!-- sesiones.pistola-1934.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.pistola-1934.citar.cita -->
Diario de las Sesiones de Cortes. Congreso de los Diputados, núm. 112, 4 de julio de 1934, pp. 4405–4468 (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 74619.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `comun.cita.pasaje` con: diario = «Diario de las Sesiones de Cortes. Congreso de los Diputados»;
> numero = `sesion.1934-07-04-112.diario_num`; fecha = «4 de julio de 1934»; paginas =
> `sesion.1934-07-04-112.paginas`; edicion = «edición depositada (V2)»; id = `cita.pistola.prieto.V2`. Debajo, ↺ 4
> y ↺ 1.


<!-- ═══ sesiones_sufragio-1931.md ═══ -->

# Copy ES · Puerta `sufragio-1931` · 1 de octubre de 1931 · El voto de las mujeres

> **Estado (22-09-2026).** Borrador para la vista previa. Plantilla común en `sesiones.md` § 2. Narrativa § 10.1.
> Citas comprobadas letra a letra en su fila V2 y en su fila v3 (`docs/marcadores/citas.md`, claves `sufragio.*`).
> Cifras en `docs/marcadores/sesiones.md` (sesión `1931-10-01-48`). Unas 470 palabras de copy (tope 500).
> Ruta: `/es/cortes/sesiones/sufragio-1931/`. Vecinas: ninguna antes · `cuestion-religiosa-1931` después.

<!-- sesiones.sufragio-1931.meta.titulo -->
El voto de las mujeres · 1 de octubre de 1931

<!-- sesiones.sufragio-1931.meta.descripcion -->
La sesión del 1 de octubre de 1931 en el Diario: Victoria Kent, Clara Campoamor y la votación nominal del artículo sobre el derecho de voto.

<!-- sesiones.sufragio-1931.antetitulo -->
1 de octubre de 1931 · Sesión núm. 48 · Constituyentes · DSCCRE núm. 48, pp. 1347–1394 (metadatos del proyecto)

<!-- sesiones.sufragio-1931.titulo -->
El voto de las mujeres

<!-- sesiones.sufragio-1931.entrada -->
¿Qué pasó en esta sesión, y cómo la leo entera?

## Qué pasó

<!-- sesiones.sufragio-1931.que_paso.texto -->
Las Cortes Constituyentes votan el derecho de voto del proyecto de Constitución. El Diario lo llama «art. 34 (numeración antigua) del dictamen de la Comisión».

<!-- sesiones.sufragio-1931.que_paso.2 -->
El debate enfrenta a dos diputadas republicanas elegidas por Madrid. Victoria Kent, del PRRS, pide que el voto de la mujer se aplace. Clara Campoamor, del PRR, pide que se reconozca ya.

<!-- sesiones.sufragio-1931.que_paso.3 -->
Antes de votar el artículo, una votación ordinaria rechaza una proposición del grupo socialista. Después, varios diputados piden votación nominal, y el artículo sale adelante.

<!-- sesiones.sufragio-1931.que_paso.4 -->
Kent vota no; Campoamor, sí. Dos meses después, Campoamor lee en la Cámara el artículo votado:

<!-- sesiones.sufragio-1931.que_paso.cita.articulo -->
«Los ciudadanos de uno y otro sexo, mayores de veintitrés años, tendrán los mismos derechos electorales…»

<!-- sesiones.sufragio-1931.que_paso.cita.articulo.pie -->
Clara Campoamor, 1 de diciembre de 1931 · V2 12785 · v3 14216

## Lo que dice el Diario

<!-- sesiones.sufragio-1931.diario.cita.kent -->
«…que creo que el voto femenino debe aplazarse.»

<!-- sesiones.sufragio-1931.diario.cita.kent.pie -->
Victoria Kent · V2 5419 · v3 6074 · 1.053 palabras (V2)

<!-- sesiones.sufragio-1931.diario.cita.presidencia -->
«Ruego a la Cámara que guarde silencio.»

<!-- sesiones.sufragio-1931.diario.cita.presidencia.pie -->
La Presidencia (Besteiro) · V2 5423 · v3 6078

<!-- sesiones.sufragio-1931.diario.cita.silencio -->
«Yo ruego a la Cámara que me escuche en silencio…»

<!-- sesiones.sufragio-1931.diario.cita.silencio.pie -->
Clara Campoamor · V2 5424 · v3 6079 · 1.460 palabras (V2)

<!-- sesiones.sufragio-1931.diario.cita.ciudadana -->
«Yo, Sres. Diputados, me siento ciudadana antes que mujer, y considero que sería un profundo error político dejar a la mujer al margen de ese derecho…»

<!-- sesiones.sufragio-1931.diario.cita.ciudadana.pie -->
Clara Campoamor, en la misma fila

<!-- sesiones.sufragio-1931.diario.cita.resultado -->
«Total, 161.» … «Total, 121.»

<!-- sesiones.sufragio-1931.diario.cita.resultado.pie -->
Los totales de las dos listas · V2 5453 · v3 6110

> [nota de diseño] Las dos primeras de Campoamor van seguidas de la de la Presidencia, como en el Diario: son dos
> filas consecutivas (V2 5423 y 5424), la misma pareja que abre la fila en Inicio. Campoamor ya había contestado a
> Kent unos turnos antes (`sesiones.sufragio-1931.diario.nota`).

<!-- sesiones.sufragio-1931.diario.nota -->
Campoamor ya había contestado a Kent unos turnos antes, en la fila V2 5422 · v3 6077.

## La sesión, turno a turno

<!-- sesiones.sufragio-1931.turnos.texto -->
La figura enseña el debate entre las dos diputadas y también el final de la sesión, que el acta digitalizada perdió.

## La votación

<!-- sesiones.sufragio-1931.votacion.texto -->
El mismo día hubo dos votaciones: la ordinaria, que el Diario da sin nombres, y la nominal, con su lista.

<!-- sesiones.sufragio-1931.votacion.cita.ordinaria -->
«En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106.»

<!-- sesiones.sufragio-1931.votacion.cita.ordinaria.pie -->
Diario · V2 5453 · v3 6110

> [nota de diseño] F26 mínima: la barra del 161–121 y, con otro trazo, la ordinaria. En la V2 las dos van dentro de
> una fila de la Presidencia; en la v3, en una fila de comentarios del Diario.

## Cómo encontrarla en el explorador

<!-- sesiones.sufragio-1931.explorador.fecha -->
Filtros › Fecha y sesión: Desde y Hasta 01/10/1931. Salen 415 intervenciones en la edición del explorador (v3); con «Solo lo que se habla», 395.

<!-- sesiones.sufragio-1931.explorador.consulta -->
"voto femenino" | "voto de la mujer"

<!-- sesiones.sufragio-1931.explorador.recuento -->
Recuento del 22 de septiembre de 2026: 40 intervenciones en la edición del explorador (v3).

<!-- sesiones.sufragio-1931.explorador.consulta.nota -->
Busca en todo el corpus. De esas intervenciones, seis son de Campoamor.

<!-- sesiones.sufragio-1931.explorador.biblioteca -->
El debate preparado «Sufragio femenino» reúne 770 intervenciones: todo lo que se habla en dos sesiones, la del 30 de septiembre y esta. Por eso trae también lo que no es sufragio.

> [nota de diseño] La consulta va en `CopiarConsulta` sin filtros, con `comun.consulta.recuento` y
> `40` (el mismo marcador que usa la página Explorador). La biblioteca se añade desde «Mis
> bibliotecas › Añadir bibliotecas del proyecto…» (`sesiones.puerta.biblioteca`).

## Lo que no está

<!-- sesiones.sufragio-1931.no_esta.texto -->
Las últimas cinco filas repiten «Pido la palabra.», y la última termina en «El Sr. Ministro de».

<!-- sesiones.sufragio-1931.no_esta.pie -->
V2 5788–5792 · v3 6460–6464

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.


## Fuentes

<!-- sesiones.sufragio-1931.fuentes.texto -->
Todo lo que dice esta página sale del Diario de Sesiones, leído en las dos ediciones de la base. No se afirma aquí ningún hecho que el Diario no recoja.

> [nota de diseño] Lo externo que pedía la narrativa (el número definitivo del artículo en la Constitución y las
> primeras elecciones con voto femenino) queda fuera hasta que la puerta de bibliografía dé su referencia [A] o [I]
> (`peticiones/sesiones.md`). No se rellena.

## Cómo citar un pasaje

<!-- sesiones.sufragio-1931.citar.texto -->
Dé el Diario, su número, la fecha y las páginas. Si trabaja con la base, añada el id de la fila y su edición.

<!-- sesiones.sufragio-1931.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, núm. 48, 1 de octubre de 1931, pp. 1347–1394 (metadatos del proyecto). Luz y Taquígrafos, edición depositada (V2), fila 5424.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] `sesiones.puerta.citar.entrada` y el modelo `comun.cita.pasaje` con: diario = «Diario de Sesiones
> de las Cortes Constituyentes de la República Española»; numero = `sesion.1931-10-01-48.diario_num`; fecha = «1 de
> octubre de 1931»; paginas = `sesion.1931-10-01-48.paginas`; edicion = «edición depositada (V2)»; id =
> `cita.sufragio.campoamor.ciudadana.V2`. Debajo, ↺ 4 (`comun.fija.ids`) y ↺ 1 (`comun.fija.diario`).


<!-- ═══ versiones.md ═══ -->

# Copy ES · Versiones (`/[lang]/datos/versiones/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Método», «Usar los datos» y
> «Versiones». Sigue la narrativa §14 y la plantilla I del plan. Marcadores: `docs/marcadores/versiones.md` (los
> implementa `exportador/modulos/datos.py`, dueño de F25, F18 y F07).
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `↺` marca una frase fija de `comun.md`,
> repetida aquí solo para leerla en su sitio; `> [nota de diseño]` no es texto para el lector. Ninguna cifra va
> tecleada: todas son `⟦marcador⟧`.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (recalculado hoy sobre las fuentes):
> 1. **F25** se comprobó comparando el CSV de la V1 depositada (MD5 `0a9adafe…`, copia local idéntica) con el de la
>    V2: solo cambian `date` (894 filas) y `legislature` (91 filas), en las siete sesiones del changelog. El texto no
>    cambia. La V1.1 no tocó el CSV (el mismo MD5 que la V1.0): solo la licencia.
> 2. **F18**: 121.700 = 107.556 piezas de habla + 735 turnos rescatados + 12.654 comentarios + 755 sumarios, leído en
>    `mapa_v2_v3.json` y en la v3 servida. Las 107.556 piezas salen de 107.282 filas de la V2 (269 filas eran solo
>    comentario) más 274 continuaciones. Se da la cifra exacta de turnos (ver `metodo.md`, nota 5).
> 3. **F07**, recalculado en la v3 servida: Besteiro −55,4 %, Alba −67,0 %, Negrín +26,5 %. El documento del proyecto
>    (`RESEGMENTACION.md`) da otros valores para Besteiro y Alba (−55 % y −66 %, sobre una versión anterior de la v3);
>    manda la v3 que sirve el explorador. Lo de Negrín se comprobó: sus cinco turnos rescatados salen de filas de la
>    Presidencia del 1-X-1937 y del 1-II-1938.
> 4. **«Hemos pedido al autor que corrija la cita del explorador»** no se escribe: D-18 se decidió (23-09-2026) como
>    aviso en la página, sin tocar el explorador. La página dice el hecho y qué hacer.

---

## Metadatos

<!-- versiones.meta.titulo -->
Versiones

<!-- versiones.meta.descripcion -->
Qué cambió en cada versión depositada, qué es la edición del explorador, adónde va cada fila y qué base usa cada figura del sitio.

> [nota de diseño] Subnavegación «Usar los datos · Versiones». Índice lateral con los seis apartados
> (`versiones.indice.*`). La página lleva `<NotaBases>`: F18 y F07 citan la v3. Los cuatro sellos (↺ 2) son los de
> `comun.md` (`comun.sello.<base>`); aquí se repiten para leerlos en su sitio. Bajo la entrada, `versiones.donde.*`: una lista corta, sin tarjetas, que cada
> sello de base ilustra en pequeño.

## Sellos de base (↺ 2)

<!-- ↺ comun.sello.V2 -->
Edición depositada (V2)

<!-- ↺ comun.sello.v3 -->
Edición del explorador (v3, sin depositar)

<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- ↺ comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, depositada)

## Índice lateral

<!-- versiones.indice.titulo -->
En esta página

<!-- versiones.indice.depositadas -->
Versiones depositadas

<!-- versiones.indice.v3 -->
La edición del explorador

<!-- versiones.indice.resultado -->
Qué cambia en un resultado

<!-- versiones.indice.ids -->
Identificadores

<!-- versiones.indice.bases -->
Qué base usa cada figura

<!-- versiones.indice.citar -->
Cómo citar cada edición

## Cabecera

<!-- versiones.antetitulo -->
Depositada: THQCMI V2.0 · explorador: v3, sin depositar

<!-- versiones.titulo -->
¿Qué edición cito, y por qué hay dos cifras?

<!-- versiones.entrada -->
El CSV que usted descarga y la base que sirve el explorador no son la misma edición. Esta página dice qué cambió, adónde va cada fila y qué base usa cada figura.

<!-- versiones.entrada.2 -->
Ninguna de las dos es «la buena». Una está depositada y se cita con su DOI; la otra corrige defectos de la primera y todavía no lo está.

<!-- versiones.donde.titulo -->
Qué edición ve usted en cada sitio

<!-- versiones.donde.texto -->
- **Harvard Dataverse** entrega la edición depositada, la V2.0.
- **El explorador** sirve la v3, sin depositar.
- **Este sitio** usa la V2 por defecto. Donde usa la v3, lo dice junto a la cifra.
- **La aplicación de Afinidades Elegidas** usa los archivos de CGOCUS V1.1, la versión depositada.
- **Los metadatos de sesión** del proyecto (Diario, páginas, presidente titular y Gobierno) no están depositados ni se ven en el explorador.

---

## 1 · Tres versiones depositadas (F25, `#fechas`)

<!-- versiones.depositadas.titulo -->
tres versiones depositadas

<!-- versiones.depositadas.entrada -->
La base tiene tres versiones en Harvard Dataverse. La vigente es la V2.0.

<!-- versiones.depositadas.tabla.col.version -->
Versión

<!-- versiones.depositadas.tabla.col.fecha -->
Publicada

<!-- versiones.depositadas.tabla.col.licencia -->
Licencia

<!-- versiones.depositadas.tabla.col.cambio -->
Qué cambió

<!-- versiones.depositadas.v10 -->
Primera publicación.

<!-- versiones.depositadas.v11 -->
Cambio de licencia. El CSV es el mismo.

<!-- versiones.depositadas.v20 -->
Fechas corregidas. Añade los changelogs en español y en inglés.

<!-- versiones.depositadas.texto -->
De la V1 a la V2 solo cambian dos columnas, `date` y `legislature`. El texto, los identificadores y las demás columnas quedan igual.

Cambiaron siete sesiones, que suman 894 filas. En una, la sesión 77, cambió también la legislatura.

**Si trabajó con la V1.** Sus recuentos de filas y de palabras no cambian. Cambian los que dependen de la fecha o de la legislatura.

Por legislatura, 91 filas pasan de la primera a la segunda: son las de la sesión 77. Por mes, cambian los meses de las siete fechas corregidas.

El README es el mismo desde la primera versión, y describe aquella.

**Lo que la V2 trae sin corregir.** El sitio lo declara y no lo cambia: corregir el depósito es tarea de su autor.

- Diego Martínez Barrio figura en el partido AR en 1931-1933, en 111 filas.
- La familia «Liberal», con 15.364 filas, va aparte de «Liberales»; el explorador las funde.
- La Lliga es CD en 1.841 filas del CSV, y D en el README.
- El identificador 836 lleva dos nombres distintos.
- El README cuenta cinco etiquetas más que filas tiene el CSV, sin explicar la diferencia.
- 735 turnos quedaron dentro de la fila anterior; la v3 los separa.

> [nota de diseño] D-25 (decisión del director, 23-09-2026): los pendientes de datos se declaran aquí, con su cifra,
> y no se corrigen en origen. Método (08, 06) y Usar los datos (`rep_id`) dicen lo mismo en su sitio. Si el autor
> corrige uno en un depósito nuevo, se quita su línea.

<!-- ↺ comun.fija.readme -->
El README depositado describe la primera versión; las diferencias, aquí.

<!-- versiones.depositadas.metodo -->
[Ver cómo se auditaron las fechas]

> [nota de diseño] La tabla de versiones se genera de la instantánea `dv_thqcmi_versiones.json` (versión, fecha de
> publicación con `|fecha_larga`, licencia tal como la da Dataverse) con los textos `versiones.depositadas.v10`, `v11`
> y `v20`. Bajo la tabla va F25. [Ver cómo se auditaron las fechas] → `metodo/#metodo-07`.

<!-- fig.F25.titulo -->
siete fechas corregidas

<!-- fig.F25.pregunta -->
¿Qué cambió de la V1 a la V2?

<!-- fig.F25.que_mide -->
Cada sesión que la V1 fechaba mal, con su fecha en la V1 y su fecha corregida en la V2.

<!-- fig.F25.denominador -->
Las 755 sesiones, auditadas una a una.

<!-- fig.F25.eje -->
Fecha de la sesión

<!-- fig.F25.leyenda.v1 -->
Fecha en la V1

<!-- fig.F25.leyenda.v2 -->
Fecha en la V2

<!-- fig.F25.nota -->
Sesión ⟦num⟧ · ⟦fecha_v1⟧ → ⟦fecha_v2⟧

<!-- fig.F25.nota.cifras -->
⟦filas⟧ filas · V2 ⟦ids⟧

<!-- fig.F25.nota.legislatura -->
También cambia de legislatura: ⟦leg_v1⟧ → ⟦leg_v2⟧.

<!-- fig.F25.prueba.cabeceras -->
Las cabeceras corridas de sus páginas dicen la fecha corregida.

<!-- fig.F25.prueba.errata -->
La cabecera de la sesión tiene una errata de imprenta.

<!-- fig.F25.prueba.danada -->
La cifra del día está dañada en la cabecera de la sesión, y la lectura óptica la leyó mal.

<!-- fig.F25.prueba.portada -->
La fecha de la V1 salía de la portada del tomo, que dice cuándo empezaron esas Cortes.

<!-- fig.F25.prueba.serie -->
El número pertenece a la serie del Diario de 1933-1935, no a la de las Constituyentes.

<!-- fig.F25.dias -->
⟦dias⟧ días

<!-- fig.F25.tabla.col.sesion -->
Sesión

<!-- fig.F25.tabla.col.v1 -->
Fecha en la V1

<!-- fig.F25.tabla.col.v2 -->
Fecha en la V2

<!-- fig.F25.tabla.col.filas -->
Filas

<!-- fig.F25.tabla.col.ids -->
Identificadores

<!-- fig.F25.tabla.col.prueba -->
Por qué

<!-- fig.F25.salvedad -->
La auditoría no detecta un error de fecha coherente con la secuencia. El changelog depositado da los rangos de filas; su tabla de pruebas no está depositada.

<!-- fig.F25.alt -->
Flechas sobre una línea de tiempo, de la fecha que daba la V1 a la fecha corregida en la V2, una por sesión.

> [nota de diseño] **F25**: flechas sobre la línea de tiempo 1931–1934, de la fecha V1 a la V2 (`fechas_corregidas`,
> del exportador: sesión, legislatura V1 y V2, fecha V1 y V2, ids, filas y prueba). Una parada de teclado por sesión.
> Cada sesión lleva una o dos pruebas (`fig.F25.prueba.*`), según `AUDITORIA_FECHAS.md`: s52 y s78, `cabeceras` +
> `danada`; s293, s295 y s311, `cabeceras` + `errata`; s321, `cabeceras` + `portada`; s77, `cabeceras` + `serie`. En
> la tabla, la columna Identificadores va con `|id`, sin agrupar. Pestañas Tabla · Datos (↺ 12).

---

## 2 · La edición del explorador (F18, `#destino-filas`)

<!-- versiones.v3.titulo -->
La edición del explorador

<!-- versiones.v3.entrada -->
El explorador no sirve el CSV depositado. Sirve la v3: la misma fuente, partida de otra manera.

<!-- versiones.v3.texto -->
La v3 parte de la V2 y corrige su segmentación: rescata turnos enterrados y separa lo que no es habla (Método, «Dos ediciones»).

No cambia el texto. Cada pieza de la v3 es un tramo literal de una fila de la V2.

Tiene las mismas 755 sesiones, con la misma fecha y el mismo número. Añade el sumario de cada sesión, que la V2 no traía.

Tiene 121.700 filas. No está depositada, y sus identificadores no son los de la V2.

**Cómo se hizo.** La v3 sale de dos auditorías del proyecto. Una buscó turnos que la V2 no separó; otra, material impreso dentro de las filas.

Las correcciones se aplicaron sobre el texto original, en este orden: las fechas, los cortes de turno y los bloques impresos.

Las palabras de cada fila de la V2 se reparten entre sus piezas en proporción a su texto. Por eso suman lo mismo en las dos ediciones.

<!-- ↺ comun.fija.ids -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

<!-- fig.F18.titulo -->
Adónde van las filas de la V2

<!-- fig.F18.pregunta -->
¿Qué diferencia hay entre lo depositado y lo que sirve el explorador?

<!-- fig.F18.tabla.col.que -->
Qué es

<!-- fig.F18.tabla.col.filas -->
Filas de la v3

<!-- fig.F18.tabla.col.origen -->
De dónde sale

<!-- fig.F18.fila.habla -->
Piezas de habla

<!-- fig.F18.fila.habla.origen -->
De las filas de la V2, partidas donde empieza otro turno o un bloque impreso

<!-- fig.F18.fila.turnos -->
Turnos rescatados

<!-- fig.F18.fila.turnos.origen -->
Turnos que la V2 dejaba dentro de la fila anterior

<!-- fig.F18.fila.comentarios -->
Comentarios del Diario

<!-- fig.F18.fila.comentarios.origen -->
Tablas, listas, documentos y relato impresos dentro de las filas de la V2

<!-- fig.F18.fila.sumarios -->
Sumarios

<!-- fig.F18.fila.sumarios.origen -->
Lo que el Diario imprime antes del primer orador, uno por sesión; la V2 no lo traía

<!-- fig.F18.fila.total -->
Total

<!-- fig.F18.nota.piezas -->
Las piezas de habla salen de 107.282 filas de la V2. Las demás, 269, eran solo comentario.

<!-- fig.F18.nota.continuaciones -->
Otras 274 piezas continúan el habla de su orador después de un bloque impreso.

<!-- fig.F18.nota.habla -->
Con «Solo lo que se habla», el explorador deja 108.291 filas: las piezas de habla y los turnos rescatados.

<!-- fig.F18.nota.palabras -->
Las palabras de la V2 se reparten entre las piezas y suman lo mismo. Los sumarios añaden 1.028.248.

<!-- fig.F18.que_mide -->
Las filas de la edición del explorador, repartidas por lo que son: habla, turnos rescatados, comentarios del Diario y sumarios.

<!-- fig.F18.denominador -->
Las 121.700 filas de la v3.

<!-- fig.F18.tabla.col.parte -->
Parte

<!-- fig.F18.tabla.col.palabras -->
Palabras

<!-- fig.F18.salvedad -->
Los documentos del proyecto no dan el mismo recuento de turnos rescatados; aquí va el de la v3 que sirve el explorador. La correspondencia fila a fila no está publicada.

<!-- fig.F18.alt -->
Tabla que reparte las filas de la edición del explorador en piezas de habla, turnos rescatados, comentarios del Diario y sumarios.

> [nota de diseño] **F18 va como tabla con nota, no como diagrama de flujo** (plan: C5 y C6 siguen abiertos). Filas y
> valores: `fig.F18.fila.habla` 107.556 · `turnos` 735 · `comentarios` 12.654 ·
> `sumarios` 755 · `total` 121.700; la compilación falla si los cuatro no suman el total. Debajo, las
> notas `fig.F18.nota.*`. Sin pestañas; [Descargar los datos de la figura] con ↺ 12. Sello ↺ 2 v3.

---

## 3 · Qué cambia en un resultado (F07, `#quien-habla`)

<!-- versiones.resultado.titulo -->
¿Qué cambia en un resultado?

<!-- versiones.resultado.entrada -->
La misma pregunta da otra respuesta en cada edición. Es la mejor prueba de que importa cuál se usa.

<!-- versiones.resultado.texto -->
En la V2, Julián Besteiro suma 1.028.999 palabras. De ellas, 995.577 están en filas de la Presidencia.

Santiago Alba, Presidente de la Cámara en la segunda legislatura, suma 1.024.975.

En la v3, Besteiro pierde el 55,4 % de sus palabras. Alba pierde el 67,0 %.

Eran turnos de otros oradores y material impreso que la V2 dejaba en las filas de quien presidía.

Sin la Presidencia, en la V2 encabeza Indalecio Prieto, con 554.773 palabras. Pero su fila más larga es, sobre todo, tablas impresas.

En la v3, sin la Presidencia, encabeza Antonio Royo Villanova, con 534.408.

Juan Negrín gana en la v3 el 26,5 %. La v3 le devuelve discursos de la guerra que la V2 ponía a nombre de la Presidencia.

**Qué hacer con la V2.** Cualquier recuento de oradores sobre la V2 debe quitar antes la Presidencia. Y conviene leer sus filas más largas antes de sumarlas.

<!-- fig.F07.titulo -->
¿Quién habla más? Depende de la edición

<!-- fig.F07.pregunta -->
¿Por qué Besteiro y Alba «hablan» más que nadie en la V2?

<!-- fig.F07.que_mide -->
Filas o palabras a nombre de cada diputado en la V2 y en la v3, para los diez que más suman en la V2.

<!-- fig.F07.denominador -->
Todas las filas de cada edición, con la Presidencia incluida.

<!-- fig.F07.conmutador.leyenda -->
Contar

<!-- fig.F07.conmutador.filas -->
Filas

<!-- fig.F07.conmutador.palabras -->
Palabras

<!-- fig.F07.leyenda.v2 -->
Edición depositada (V2)

<!-- fig.F07.leyenda.v3 -->
Edición del explorador (v3)

<!-- fig.F07.leyenda.presidencia -->
De ellas, en filas de la Presidencia

<!-- fig.F07.nota -->
⟦nombre⟧ · V2: ⟦v2⟧ · v3: ⟦v3⟧ · ⟦cambio⟧

<!-- fig.F07.nota.presidencia -->
En la V2, «El Sr. PRESIDENTE:» va a nombre de quien preside: así empieza, por ejemplo, la fila 5423, de Besteiro.

<!-- fig.F07.tabla.col.nombre -->
Diputado

<!-- fig.F07.tabla.col.v2 -->
V2

<!-- fig.F07.tabla.col.v2_presidencia -->
V2, en la Presidencia

<!-- fig.F07.tabla.col.v3 -->
v3

<!-- fig.F07.tabla.col.cambio -->
Cambio

<!-- fig.F07.salvedad -->
Es la figura de por qué importan las ediciones, no una medida de importancia.

<!-- fig.F07.alt -->
Barras dobles para diez diputados, V2 y v3 lado a lado. Besteiro y Alba encabezan la V2 y caen en la v3; los demás apenas cambian.

> [nota de diseño] **F07**: barras dobles por persona, **en orden fijo por las palabras de la V2** (los diez primeros:
> Besteiro, Alba, Prieto, Royo Villanova, Azaña, Guerra del Río, Balbontín, Lamamié de Clairac, Casanueva y Jiménez
> Fernández, con la grafía de `grafias.json`; nunca el `rep_name` crudo). Conmutación Filas · Palabras (radios). La
> parte en la Presidencia va rayada dentro de la barra V2 (otro trazo, no solo otro color). Nota emergente
> `fig.F07.nota` (`⟦cambio⟧` con signo y `pct1`); en Besteiro y Alba, además, `fig.F07.nota.presidencia`. Pestañas:
> Tabla · Datos (los 773 diputados, en la V2 y en la v3). Negrín no está entre los diez: su caso va en
> el texto. Sello doble (↺ 2 v2 y v3); la página lleva `<NotaBases>`. Ningún ranking de este tipo sale de esta página
> ni de las fichas; en Inicio, nunca.

---

## 4 · Identificadores (`#identificadores`)

<!-- versiones.ids.titulo -->
Identificadores

<!-- versiones.ids.entrada -->
La sesión es la clave común de las dos ediciones. La fila, no.

<!-- versiones.ids.texto -->
Las dos ediciones tienen las mismas 755 sesiones, con la misma fecha y el mismo número. Cruzarlas por sesión es seguro.

Las filas no coinciden: la v3 las renumera todas. La correspondencia fila a fila existe en el proyecto, pero no está publicada.

Un ejemplo: Campoamor es la fila 5424 de la V2 y la 6079 de la v3.

Para citar, dé la fecha y el número de sesión, y el id con su edición: «V2, fila…» o «v3, fila…».

Para llevar al CSV una intervención del explorador, busque la sesión por fecha y número. Dentro de ella, localice el comienzo del texto.

<!-- versiones.ids.tabla.titulo -->
Una sesión, dos ediciones

<!-- versiones.ids.tabla.col.que -->
Qué

<!-- versiones.ids.tabla.fila.sesion -->
La sesión, por su fecha y su número

<!-- versiones.ids.tabla.fila.presidencia -->
La Presidencia pide silencio

<!-- versiones.ids.tabla.fila.campoamor -->
Campoamor empieza a hablar

<!-- versiones.ids.tabla.fila.orden -->
Lugar de Campoamor en la sesión

<!-- versiones.ids.tabla.sesion -->
1 de octubre de 1931, sesión 48, en las dos

<!-- versiones.ids.tabla.igual -->
la misma

<!-- versiones.ids.tabla.pantalla -->
«Orden 30» en la pantalla

<!-- versiones.depositadas.vigente -->
vigente

---

## 5 · Qué base usa cada figura (F35, `#bases`)

<!-- versiones.bases.titulo -->
¿De qué base sale cada figura?

<!-- versiones.bases.entrada -->
Cada figura dice su base junto a su título. Esta tabla las reúne, con la huella de cada base y la fecha de cálculo. Tres conservan su número sin llevar las pestañas Gráfico, Tabla y Datos. F18 y F19 son su propia tabla; F26, en Inicio y en las puertas, es una versión reducida de la de Sesiones.

<!-- fig.F35.titulo -->
Qué base usa cada figura

<!-- fig.F35.tabla.col.figura -->
Figura

<!-- fig.F35.tabla.col.pagina -->
Página

<!-- fig.F35.tabla.col.base -->
Base

<!-- fig.F35.tabla.col.archivo -->
Datos

<!-- fig.F35.tabla.col.huella -->
Huella de la base

<!-- fig.F35.tabla.col.fecha -->
Calculada

<!-- fig.F35.huella.V2 -->
MD5 del CSV depositado

<!-- fig.F35.huella.v3 -->
sha256 de la base del explorador

<!-- fig.F35.huella.proyecto -->
sha256 de los metadatos de sesión

<!-- fig.F35.huella.afin -->
Versión depositada de CGOCUS

<!-- fig.F35.huella.croquis -->
sha256 del croquis

<!-- fig.F35.sin_datos -->
Sin datos descargables

<!-- fig.F35.pagina.inicio -->
Inicio

<!-- fig.F35.pagina.cortes -->
Las Cortes

<!-- fig.F35.pagina.etapa -->
Fichas de etapa

<!-- fig.F35.pagina.sesiones -->
Sesiones y votaciones

<!-- fig.F35.pagina.puerta -->
Puertas de sesión

<!-- fig.F35.pagina.diario -->
El Diario

<!-- fig.F35.pagina.metodo -->
Método

<!-- fig.F35.pagina.datos -->
Usar los datos

<!-- fig.F35.pagina.versiones -->
Versiones

<!-- fig.F35.pagina.explorador -->
El explorador

<!-- fig.F35.pagina.afinidades -->
Afinidades Elegidas

<!-- fig.F35.base.V2 -->
V2

<!-- fig.F35.base.v3 -->
v3

<!-- fig.F35.base.proyecto -->
Proyecto

<!-- fig.F35.base.afin -->
CGOCUS V1.1

<!-- fig.F35.base.croquis -->
Croquis

<!-- fig.F35.huellas.titulo -->
Las huellas de cada base

<!-- fig.F35.alt -->
Tabla con cada figura del sitio, su página, la base de la que sale, sus datos, la huella de esa base y la fecha de cálculo.

> [nota de diseño] Figuras sin pestañas (decisión del director, 23-09-2026): F18, F19 y las variantes ligera y mínima
> de F26 conservan su número F, porque F35 y el LÉAME lo usan; `versiones.bases.entrada` dice cuáles son.
>
> [nota de diseño] **F35** se genera de `lib/figuras.ts` (id, ruta, ancla, base, archivos) y de `src/data/sello.json`
> (huella y fecha). La columna Base usa los sellos ↺ 2 (`comun.sello.*`, más «Croquis» para el hemiciclo). No
> lleva salvedad: es la salvedad de todas. El título de cada figura sale de su `fig.<id>.titulo`, con enlace a su
> ancla.

---

## 6 · Cómo citar cada edición (`#citar`)

<!-- versiones.citar.titulo -->
Cómo citar cada edición

<!-- versiones.citar.texto -->
**La V2.** Con su DOI y su versión, tal como la da Harvard Dataverse. Es la que se debe citar para cualquier cifra calculada sobre el CSV.

**La v3.** No tiene DOI. Cite el explorador con su dirección y la fecha de consulta, y diga que sirve la v3, sin depositar.

La cita que el explorador añade a lo que exporta dice «Harvard Dataverse, V2», pero sus identificadores son de la v3. Corríjala antes de publicar.

**Los metadatos de sesión** (Diario, páginas, presidente titular y Gobierno) no están depositados. Cítelos como metadatos del proyecto.

<!-- versiones.citar.enlace -->
[Ver cómo citar]

> [nota de diseño] [Ver cómo citar] → `datos/#citar`, donde están las citas completas en texto, BibTeX y RIS. D-18
> (la cita del explorador) se resuelve con el aviso: el texto dice el hecho y qué hacer, y no promete un cambio.

---

## LÉAME de las figuras de Versiones (columnas de cada CSV)

<!-- fig.F25.leame.col.num_session -->
Número de la sesión en su legislatura.

<!-- fig.F25.leame.col.legislatura_v1 -->
Legislatura que daba la V1.

<!-- fig.F25.leame.col.legislatura_v2 -->
Legislatura en la V2.

<!-- fig.F25.leame.col.fecha_v1 -->
Fecha que daba la V1 (AAAA-MM-DD).

<!-- fig.F25.leame.col.fecha_v2 -->
Fecha corregida en la V2 (AAAA-MM-DD).

<!-- fig.F25.leame.col.dias -->
Días entre las dos fechas, con signo.

<!-- fig.F25.leame.col.id_min -->
Primer id de la sesión en la V2.

<!-- fig.F25.leame.col.id_max -->
Último id de la sesión en la V2.

<!-- fig.F25.leame.col.filas -->
Filas de la sesión.

<!-- fig.F25.leame.col.prueba -->
Las pruebas de la corrección. `cabeceras`: las cabeceras corridas dicen la fecha corregida. `danada`: la cifra del día está dañada en la cabecera de la sesión. `errata`: esa cabecera trae una errata de imprenta. `portada`: la V1 tomó la fecha de la portada del tomo. `serie`: el número es de la serie de 1933-1935.

<!-- fig.F18.leame.col.clase -->
habla, turnos (turnos rescatados), comentarios (material impreso del Diario), sumarios, o el total.

<!-- fig.F18.leame.col.filas_v3 -->
Filas de la v3 de esa clase.

<!-- fig.F18.leame.col.palabras_v3 -->
Palabras (nwords) de esas filas en la v3.

<!-- fig.F18.leame.col.base -->
Edición de la que sale la cifra.

<!-- fig.F07.leame.col.rep_id -->
Identificador del diputado en la V2 y en la v3.

<!-- fig.F07.leame.col.nombre -->
Nombre del diputado según la tabla de grafías del sitio.

<!-- fig.F07.leame.col.filas_v2 -->
Filas a su nombre en la V2, con la Presidencia incluida.

<!-- fig.F07.leame.col.palabras_v2 -->
Palabras (nwords) de esas filas en la V2.

<!-- fig.F07.leame.col.filas_v2_presidencia -->
De ellas, filas de la Presidencia (según el analizador de fórmulas del explorador).

<!-- fig.F07.leame.col.palabras_v2_presidencia -->
Palabras de esas filas de la Presidencia.

<!-- fig.F07.leame.col.filas_v3 -->
Filas a su nombre en la v3, todas las piezas.

<!-- fig.F07.leame.col.palabras_v3 -->
Palabras de esas filas en la v3.

<!-- fig.F07.leame.col.cambio_palabras -->
`palabras_v3 / palabras_v2 − 1`, como proporción.
