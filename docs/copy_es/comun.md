# Copy ES · Común (cabecera, pie, frases fijas, rótulos, componentes, isla, glosario, raíz y 404)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el copy de «comun», «inicio», la raíz y el
> 404. Sigue el contrato de construcción, el plan (§ Reglas editoriales, § Navegación global, § Un rótulo por destino)
> y la narrativa. Cifras: `docs/marcadores/comun.md`, recalculadas hoy sobre la fuente
> (`docs/marcadores/comprobar_comun_inicio.py`, 94 de 94 correctas).
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto y lo cierra la clave siguiente, un
> encabezado, una nota `>` o una regla `---`. `[corchetes]` marcan un rótulo o un enlace: su destino lo pone el
> componente, por orden. `{{clave|formato}}` es una cifra de `src/data/cifras.json`; `{{n}}`, `{{fecha}}`… son
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
---

## 2. Frases fijas ↺

> [nota de diseño] Son las trece del plan (§ Frases fijas), con su redacción exacta. Las cuatro del sello (↺ 2) son una
> por base; `cita.ts` las pide como `comun.sello.<base>`. El número de sesión de ↺ 8, los rótulos de legislatura y la
> fecha de ↺ 10 y las versiones («V2», «v3», «CGOCUS V1.1») son nombres, no cifras: van en la lista blanca de
> `check-i18n` (`docs/marcadores/comun.md`, § Lista blanca).

<!-- comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

<!-- comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

<!-- comun.sello.afin -->
Afinidades Elegidas (CGOCUS)

<!-- comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- comun.fija.formulario.motivo -->
Con esos datos queremos saber quién usa la base y con qué fin, para poder mejorarla y comunicar novedades.

> [nota de diseño] ↺ 3 va SIEMPRE encima del botón que lleva a Dataverse, nunca en una nota emergente. El motivo
> (D-20) lo dio el investigador el 23-09-2026: «conocer a los usuarios y los usos de la base para poder mejorarla y
> comunicar novedades»; esta es su redacción final, una sola frase que no promete más (ni boletín, ni respuesta, ni
> plazo). Es texto para el lector y se traduce. El formulario no se nombra por su título (lleva una errata).

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

<!-- comun.fija.sin_formulario -->
Sin formulario: son datos agregados.

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
Funciona en el navegador de un ordenador.

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
{{dv.thqcmi.autores}} · [Universidad de Salamanca]

<!-- comun.pie.depositos -->
Depositados en Harvard Dataverse: Luz y Taquígrafos ([doi:10.7910/DVN/THQCMI]) y Afinidades Elegidas ([doi:10.7910/DVN/CGOCUS]).

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

<!-- comun.pie.licencias -->
Datos, [CC BY 4.0]. Código del sitio, [MIT].

<!-- comun.pie.ediciones -->
Página, ed. {{edicion_pagina}} · Datos: Luz y Taquígrafos, en Harvard Dataverse

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
<!-- comun.consulta.recuento --> Recuento del {{fecha}}: {{n}} intervenciones en el explorador.
<!-- comun.consulta.recuento.una --> Recuento del {{fecha}}: una intervención en el explorador.
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
<!-- comun.sello.base --> Luz y Taquígrafos
<!-- comun.sello.huella --> Huella
<!-- comun.sello.exportado --> Cifras exportadas el {{fecha}}
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
<!-- comun.cita.cgocus.nota --> Cítela tal como la da Harvard Dataverse.

<!-- comun.cita.figura -->
{{dv.thqcmi.autores}}. «{{titulo}}». Figura de Luz y Taquígrafos. {{url}}. Base: {{base}}. Exportada el {{fecha}}.

<!-- comun.cita.pasaje -->
{{diario}}, núm. {{numero}}, {{fecha}}, pp. {{paginas}} (metadatos del proyecto). Luz y Taquígrafos, fila {{id}}.

> [nota de diseño] `comun.cita.figura` y `comun.cita.pasaje` las rellena `lib/cita.ts`. La base de una figura es
> `comun.sello.base` («Luz y Taquígrafos») o el sello de su otra fuente; el sitio no nombra ediciones (24-09-2026). En
> el pasaje, los cuatro primeros valores son metadatos del proyecto y van rotulados como tales. La cita del conjunto se copia tal como la da Dataverse
> (`{{dv.thqcmi.cita}}`, `{{dv.cgocus.cita}}`), sin retocar su «V2» ni su «V1». Los tres formatos van en `<details>`.

### 5.6 Captura del explorador

<!-- comun.captura.ampliar --> Ampliar la captura
<!-- comun.captura.cerrar --> Cerrar la captura
<!-- comun.captura.pie --> Explorador publicado, capturado el {{fecha}}.
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

<!-- comun.isla.posicion --> {{i}} de {{total}}
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
**Fila.** Una línea del CSV. La mayoría son turnos de palabra, de una fórmula impresa de orador a la siguiente. Las demás guardan lo que el Diario imprime sin que nadie lo diga: el sumario, las listas, los documentos.

<!-- comun.glosario.intervencion -->
**Intervención.** El nombre que da el explorador a cada una de sus filas. Aquí solo se usa al hablar del explorador.

<!-- comun.glosario.sesion -->
**Sesión.** Una reunión del pleno, con su fecha y su número. Fecha y número, juntos, la identifican.

<!-- comun.glosario.etapa -->
**Etapa.** Cada tramo en que este sitio parte las Cortes: las Constituyentes, la legislatura de 1933-1935, las Cortes de 1936 hasta la guerra, la guerra y México.

<!-- comun.glosario.legislatura -->
**Legislatura.** El valor de la columna `legislature`: 1931-1933, 1933-1935 o 1936-1939. La tercera reúne las Cortes de 1936, la guerra y México.

<!-- comun.glosario.presidencia -->
**Presidencia.** El cargo que modera la sesión, lo ocupe el Presidente de las Cortes o un vicepresidente. Quien preside es diputado, y en la base lleva su partido.

<!-- comun.glosario.metadatos -->
**Metadatos del proyecto.** El Diario, el número, las páginas, el presidente titular y el Gobierno de cada sesión. Los reunió el proyecto; no están depositados y el explorador no los muestra.

<!-- comun.glosario.acotacion -->
**Acotación.** Lo que el Diario anota entre paréntesis sin que nadie lo diga como orador: «(Rumores.)», «(Aplausos.)».

<!-- comun.glosario.puerta -->
**Puerta de lectura.** Una página de este sitio sobre un momento del Diario, de una o de varias sesiones, con sus citas comprobadas y el camino para leerlo entero en el explorador.

<!-- comun.glosario.debate -->
**Debate preparado.** Una biblioteca que el explorador ofrece ya hecha, con el nombre de un debate y sus sesiones.

<!-- comun.glosario.palabras -->
**Palabras.** Lo que cuenta la columna `nwords`. Otras maneras de contar dan otras cifras; cada figura dice la suya.

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
