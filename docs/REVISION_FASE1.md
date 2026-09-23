# Revisión de coherencia · fase 1 (22-09-2026)

Crítico de coherencia. No corrige el copy de nadie: cada fila dice archivo, clave, problema, corrección propuesta y
dueño. Todo lo que aquí se afirma se ha medido hoy sobre la fuente (V2 MD5 `360332a0…`, v3 sha256 `3a0d8b2d…`,
`sessions.json`, CGOCUS V1.1, `erratas_fechas_V1.csv`, bibliotecas del explorador) o sobre la compilación de hoy.

**Veredicto.** La base es sólida: 0 cifras falsas en 83 comprobadas a mano, 0 citas no literales en 116 fragmentos
de `citas.md` y 264 citas «» del copy. Lo que falla es de **coherencia**: cinco puntos contradicen la narrativa o una
decisión adoptada por el contrato, dos claves distintas nombran la misma cifra, y la plantilla de Versiones y su copy
no casan. La compilación de vista previa pasa; `check-i18n` falla por seis números tecleados.

---

## 1. Compilación

| orden | resultado | nota |
|---|---|---|
| `npm run i18n` | ✓ es: 2.163 claves de 23 archivos · ⚠ en: no existe `docs/copy_en/` | esperado en la fase 1 |
| `python3 scripts/copy2i18n.py es --check` | ✓ sin errores | el `|fecha` de `pistola-1934` que citaba cortes_a ya está corregido |
| `python3 exportador/exportar.py` | ✓ 6 s · 508 cifras · controles 32/32 · 1.415 marcadores declarados, 479 comprobados sin un fallo, 936 sin cifra (módulos de fase 2) | ⚠ 7 avisos «el copy cita `sesion.1931-10-01-48.cola*` y no hay tal sesión, mes o campo» (§ P1-3): con `--estricto` son **fallos** · ⚠ `inicio.md:104 {{dv.thqcmi.cita}}`, valor esperado no comparable |
| `npm run build` | ✓ 46 páginas | 672 cifras pendientes, 7 claves de copy que no existen, 6 claves sin sitio (§ P1-5) |
| `STRICT=1 astro build` | ✗ «Falta comun.404.titulo en en» | esperado: no hay copy inglés |
| `node scripts/check-i18n.mjs` | **✗ 6 problemas** (números tecleados) · 13 avisos (frases largas, un tono) | § P2-9 y P3-1 |
| `node scripts/audit-cifras.mjs` | ✓ toda cifra con base, NotaBases donde hay v3, nada del prototipo · ⚠ 737 pendientes · 2 descripciones > 155 car. · 13 números sin procedencia (los mismos seis de `check-i18n` y «1945Ver») | § P3 |
| `npx astro check` · `npm run formatos` | ✓ 0 errores · ✓ 48/48 | — |

---

## 2. P1 · Contradicen la narrativa, una decisión adoptada o la compilación estricta

| # | archivo · clave | problema (medido) | corrección propuesta | dueño |
|---|---|---|---|---|
| P1-1 | `copy_es/inicio.md:79` · `inicio.tesis.inabarcable` | «Nunca fue secreto: solo inabarcable.» contradice la narrativa §6 mov. 1 («**Casi** nunca fue secreto: **sobre todo**, inabarcable», R2 y H6 del anexo adversarial), la frase anterior de la propia tesis (la Presidencia recuerda que los suplicatorios van en sesión secreta, V2 71329) y El Diario (`diario.entrada`: «la cumple casi siempre»; F28). | «Lo dicho en sesión pública se imprimía en el Diario, salvo lo que la Presidencia mandó borrar. Casi nunca fue secreto: sobre todo, inabarcable.» | copy_inicio |
| P1-2 | `inicio.md:233` `inicio.puertas.estatuto-1932.que` · `sesiones.md:147` `sesiones.lista.estatuto-1932.titulo` · `cortes_1931.md:263` `cortes.1931.puertas.estatuto` · `sesiones_estatuto-1932.md:13,22` `.meta.titulo` y `.titulo` | Título «El discurso más largo, a nombre de otro». La narrativa §10.3 lo titula «El discurso de Azaña, a nombre de otro» y veta «el discurso más largo» sin base (§6 mov. 5 y §10.3; plan R22: «quitado de Inicio y del título de la puerta»). Medido: es la fila de habla más larga solo en la v3 (29042, 17.142); en la V2 es la segunda (25979, 17.152, tras Prieto 55221, 25.371). | «El discurso de Azaña, a nombre de otro» en los cinco sitios. La base («en la v3») se queda en el cuerpo de la puerta, donde ya está. | copy_sesiones · copy_inicio · copy_cortes_a |
| P1-3 | `copy_es/metodo.md:232,234,250` · `metodo.03.texto`, `metodo.03.pruebelo.explorador` · `marcadores/metodo.md:76-82` | La misma cola de la sesión 48 tiene **dos claves**: `ses.s48.cola*` (sesiones) y `sesion.1931-10-01-48.cola*` (metodo). La segunda cae en el espacio de familias `sesion.<clave>.<campo>` del exportador, que no tiene el campo `cola`: hoy son 7 avisos y con `--estricto` son fallos. Valores comprobados: 5 filas, V2 5788–5792, v3 6460–6464, pantalla 411–415 (`ord` + 1). | Método usa `ses.s48.cola`, `.V2.desde/.hasta`, `.v3.desde/.hasta`; se añaden `ses.s48.cola.pantalla.desde/.hasta` (411/415, base `explorador`) a `marcadores/sesiones.md`, o a metodo con ese prefijo. | copy_metodo_datos (+ copy_sesiones) |
| P1-4 | `inicio.md:305` `inicio.empezar.sin_programar` · `datos.md:116` `datos.empezar.s2.peso` · `explorador.md:483` `explorador.empezar.paso2` (marcador `{{explorador.gz.bytes\|peso0}}`) | Imprimen «unos 107 MB». El plan, D-26: «Mientras no decida, rige (a)»: «unos 112 MB comprimidos», unidad decimal dicha junto a la cifra; el contrato adopta todas las recomendadas. Medido: 111.733.652 B = 111,7 MB (decimal) = 106,6 MiB. Además «107 MB» choca a la vista con 107.551 y con «107.000», vetado. | Un formato decimal (`\|peso_dec0` o una cifra `explorador.gz.mb` = 112, unidad «MB» decimal) y el texto «unos 112 MB comprimidos». En Datos pueden ir las dos unidades con los bytes (D-26). | andamiaje + exportador (formato) · copy_inicio, copy_metodo_datos, copy_explorador (texto) |
| P1-5 | `src/pages/[lang]/datos/versiones.astro` ↔ `copy_es/versiones.md` | La plantilla pide claves que el copy no tiene: `versiones.cambia.*`, `versiones.cambia.titulo`, `versiones.indice.cambia`, `fig.F35.col.figura/.base/.archivos/.huella` (salen como ⟦⟧). El copy escribe claves que la plantilla no coloca: `versiones.donde.titulo/.texto`, `versiones.resultado.entrada/.texto/.titulo` (caja «sin sitio»). | Acordar un solo juego de claves: renombrar en el copy o en la plantilla, y escribir `fig.F35.col.*` (cuatro rótulos). | andamiaje + copy_metodo_datos |

---

## 3. P2 · Deben corregirse antes de enseñar la vista previa

| # | archivo · clave | problema (medido) | corrección propuesta | dueño |
|---|---|---|---|---|
| P2-1 | `sesiones_estatuto-1932.md:33,55` · `sesiones.estatuto-1932.que_paso.2`, `.turnos.v2` | Imprimen 17.142 (v3) y 17.152 (V2). La narrativa §10.3: «ninguna de las tres cifras (17.231, 17.152 o 17.142). Se dice "más de 17.000"»; plan R17 las veta. `cortes_1931.md:170` ya remite a la puerta por «más de 17.000». | «más de 17.000 palabras» en las dos frases, con un marcador de umbral (`puerta.estatuto-1932.umbral` = 17.000, con aserto `≥`), o pedir al investigador que levante el veto. | copy_sesiones |
| P2-2 | `inicio.md:323` · `inicio.empezar.remate` | «Hagan sus preguntas.» D-24 recomienda (a) «Haga sus preguntas», con el usted del sitio; el contrato adopta la recomendada. | «Los datos están publicados. Haga sus preguntas.» | copy_inicio |
| P2-3 | `inicio.md:82` · `inicio.tesis.resolucion` · `fig.F30.salvedad` (sesiones) | «una fila cada vez que el Diario anota quién habla». H21: V2 25979 lleva dentro «El Sr. Presidente del CONSEJO DE MINIS…», un turno que el Diario sí anota y no tiene fila. La narrativa: «cada vez que el etiquetado reconoció la fórmula impresa de un orador». | Inicio: «una fila cada vez que el etiquetado reconoce la fórmula impresa de un orador, con su fecha y su sesión». F30: la misma fórmula. | copy_inicio · copy_sesiones |
| P2-4 | `comun.md:110` · `comun.fija.legislatura` (↺ 10) ↔ `afinidades.md:486` · `afinidades.datos.trampa` | ↺ 10 dice que Afinidades llama 1933-1936 a la segunda legislatura. Medido en CGOCUS: `representative_metadata` y el edgelist dicen 1933-1936, pero **`2REP_cosponsorship` dice 1933-1935** (6.528 filas). Afinidades lo cuenta bien; la frase fija, repetida en varias páginas, no. | Pedir al investigador una redacción de ↺ 10 que no generalice, p. ej. «El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; …». Datos §6 ya une por el censo: correcto. | investigador (↺) · copy_inicio (comun) |
| P2-5 | `cortes_1936.md:244` · `cortes.1936.palabra.f05_siguen` | «Juan Ventosa»: el quinto orador es `rep_id` 993, **Juan Ventosa Calvell** (Lliga). «Juan Ventosa» es el `uso` de 994, Ventosa Roig (ERC), en `grafias.csv`. Ambiguo, y precisamente es el par que D-25 tiene abierto. | «Juan Ventosa Calvell». | copy_cortes_b |
| P2-6 | `cortes_1933.md:136` · `cortes.1933.contexto.2.g` | «El Diario atribuye ese grito a Manuel Giménez Fernández.» El Diario imprime «El Sr. JIMÉNEZ FERNÁNDEZ:» y la Presidencia dice no haber visto quién interrumpió (V2 71331). Inicio calla el nombre y El Diario (`diario.luz.escena.3`) dice «La base identifica…». Tres grupos, tres grados de certeza. | «El Diario lo pone a nombre de «JIMÉNEZ FERNÁNDEZ»; la base lo identifica con Manuel Giménez Fernández.» | copy_cortes_a |
| P2-7 | `diario.md:315` `diario.calla.ausencias.barriga` · `sesiones_casas-viejas-1933.md:106` `…no_esta.texto` | «La primera vez que el Diario lo recoge es un grito del 31 de mayo de 1934.» Afirma sobre el impreso lo que solo se sabe del corpus leído por OCR. Plan R24: «se dice "en el corpus, con esa búsqueda"»; cortes_a retiró el «por primera vez». Medido: V2 literal, solo 70714; FTS v3, 2 filas (79606, 31-V-1934, y 112811, 21-XI-1935, «los tiros, a la barriga»). | «En el corpus, esa búsqueda no da nada en 1933. La primera fila es un grito del 31 de mayo de 1934:». | copy_sesiones |
| P2-8 | `cortes_1933.md:157` · `cortes.1933.contexto.3.a` | «El 1 de octubre, Samper abre la sesión». Medido: antes hablan el secretario (V2 74638–74644) y la Presidencia (74645); Samper, Presidente del Consejo, habla en el orden 8 (V2 74646). | «El 1 de octubre, Samper toma la palabra: «…»». | copy_cortes_a |
| P2-9 | `datos.md:479` `datos.decisiones.5.texto` · `metodo.md:174` `metodo.02.texto` · `metodo.md:425` `metodo.07.texto` · `metodo.md:456` `metodo.07.pruebelo.explorador` · `sesiones_cuestion-religiosa-1931.md:106` `…explorador.biblioteca` · `sesiones_mexico-1945.md:34` `…que_paso.3` | `check-i18n` falla: números tecleados «60, 61, 69, 70, 74», «E1», «77», «321», «24.», «8,» «9,». Todos son legítimos, pero con la forma que la lista blanca no reconoce. | «hasta la sesión 60 … de las sesiones 61 a 69 … de las 70 a 74»; «La sesión 77…», «la sesión 321»; «que habla del artículo 24»; «El 8 de noviembre … el 9 de noviembre»; «E1 Sr.» y «77» (en «escriba 77») a la Lista blanca de `marcadores/metodo.md`. | copy_metodo_datos · copy_sesiones |
| P2-10 | `datos.md:626` · `datos.unir.texto` | Cifras exactas de CGOCUS en la prosa de Datos (`union.pares.casan` 1.047, `union.pares` 1.060, 13, 426, 247.327, 31). Plan D-3: mientras siga abierta, «ninguna cifra exacta de Afinidades sale de su página»; las de F34 van **en su pestaña Datos, con el sello CGOCUS V1.1**, y «Datos §6 da la regla y el fragmento, sin cifras». | Sacar las cifras de `datos.unir.texto` (dejar la regla) y dejarlas solo en `fig.F34.paso.*.resultado`, con el sello `comun.sello.afin`. | copy_metodo_datos |
| P2-11 | `metodo.md:599` · `metodo.10.pruebelo.explorador` | «Abra «Sobre el corpus», en la cabecera del explorador.» El panel se llama «Sobre este corpus» y está en el panel lateral (estudio del explorador §k, `LEEME.md` de capturas), no en la cabecera. | «Abra «Sobre este corpus», en el panel lateral del explorador. Dice qué edición sirve: la v3, sin publicar.» | copy_metodo_datos |
| P2-12 | varios | Enlaces sin destino en la vista previa y rótulos fuera de la tabla «un rótulo por destino» (`comun.md` §3): [Ver cómo citar] (Versiones) y [Ver cómo citar cada edición] (Explorador) llevan al mismo sitio con dos rótulos; [Ver qué significa cada columna] (`fig.F20.enlace` → `datos/#columnas`) duplica [Ver qué trae cada columna]; sin destino ni fila en la tabla: [De dónde sale cada cifra], [Ver adónde va cada fila de la V2], [Ver las fechas corregidas], [Ver quién habla más según la edición], [Ver cómo se auditaron las fechas], [Ver cómo se cuentan las palabras], [Ver las figuras de Las Cortes], [Ver el calendario completo], [Copiar el nombre del debate]. [Copiar la cita] en Datos y [Unir con THQCMI] en Afinidades salen sin destino. [Escribirnos] no tiene contacto en ninguna página. | Un rótulo por destino: unificar los duplicados con el de la tabla y dar fila y ancla a los nuevos en `comun.md` §3; cablear en las plantillas. El contacto de [Escribirnos] se pide al investigador. | copy_inicio (comun) · andamiaje · investigador |
| P2-13 | `explorador.astro` · `explorador.img.*` (24 claves) · `explorador.bib.entradas` | Las 12 capturas existen (`src/assets/explorador/`) y el copy tiene pie y texto alternativo para cada una, pero la página no pinta ninguna (`{/* CAPTURA: las pone el dueño de la página */}`). `explorador.bib.entradas` queda «sin sitio». | Colocar las doce `<Captura>` (y la de `sobre` en «Llevárselo, citado», como pide copy_explorador) y dar sitio a `explorador.bib.entradas`. | andamiaje o dueño de la plantilla del explorador |
| P2-14 | `datos.columnas.*` (29), `cortes.etapas.tabla.*`, `afinidades.cifras.tabla.*`, `afinidades.datos.tabla.*`, `sesiones.puerta.cifras.*`, `comun.glosario.*` (15), `comun.fija.tono` | Copy escrito que no llega a ninguna página: son `FigHueco` (F32, tabla de etapas, tablas de Afinidades, «La sesión en cifras») o no tienen sitio decidido (glosario). | Fase 2: construir esas piezas. El glosario necesita una ubicación (Método o notas emergentes). | andamiaje · dueños de figura |

---

## 4. P3 · Pulido y deuda

| # | archivo · clave | problema | corrección propuesta | dueño |
|---|---|---|---|---|
| P3-1 | `cortes.1933.contexto.3.a/.3.d`, `cortes.1933.antes.sesion77`, `cortes.1936.contexto.1.a/.4.c`, `cortes.guerra.palabra.f05_v3`, `cortes.mexico.antes.no_esta/.paris` | Frases de 31 a 35 palabras (tope, 30). Casi siempre las alargan los paréntesis de ids «(V2 … · v3 …)». | Partir la frase o llevar los ids a un pie. Las listas `*.debates.lista` (37 y 40) deben pintarse como lista, no como frase. | copy_cortes_a · copy_cortes_b |
| P3-2 | `cortes.1933.meta.descripcion` (160 car.) · `sesiones.meta.descripcion` (157) | Pasan de 155 caracteres. | Recortar. | copy_cortes_a · copy_sesiones |
| P3-3 | `sesiones.*.que_paso.*` (antesala, casas-viejas, estatuto, figueres) · `versiones.resultado.texto` | «presidente del Consejo de Ministros», «presidente de la Cámara» en minúscula. Regla de estilo: los cargos como los imprime el Diario («Presidente del Consejo»); las fichas lo hacen así. | Mayúscula inicial, como en las fichas. | copy_sesiones · copy_metodo_datos |
| P3-4 | `cortes_1931.md:53` `cortes.1931.hoy.buscar.recuento` · `cortes_1933.md:52` `cortes.1933.hoy.buscar.recuento` | Fecha tecleada («el 22 de septiembre de 2026») y tiempo «daba»; las fichas III–V y las puertas usan «da» y `{{busquedas.fecha\|fecha_larga}}`. Si se vuelve a exportar, la fecha miente. | Usar `comun.consulta.recuento` o `{{busquedas.fecha\|fecha_larga}}`, y «da». | copy_cortes_a |
| P3-5 | nombres de biblioteca en el copy | El copy los cita sin el prefijo «Debate · » («Ley Electoral de 1933», «Estatuto de Cataluña»…), mientras `bib.*.nombre` (sesiones) lleva el nombre exacto con prefijo, que es lo que el lector verá en el diálogo del explorador (H24: «nombres exactos»). | Una regla única: el nombre exacto del diálogo, o sin prefijo en todas partes con una nota. | copy_cortes_a · copy_cortes_b · copy_sesiones · copy_explorador |
| P3-6 | claves duplicadas para el mismo dato | `sesiones.n` = `sesiones` (755); `fuente.serie.constituyentes` = `serie.constituyentes.sesiones`; `fuente.sumarios.v3` = `v3.sumarios`; V2 71330 tiene cuatro claves (`fila.luz.id.V2`, `fila.II.luz.V2`, `cita.f27.6.V2`, `cita.diario.grito.V2`); V2 55221 dos (`fila.prieto.id.V2`, `puerta.estatuto-1932.primera.V2`). Hoy cuadran; mañana pueden divergir. | Reusar la clave de `base.md` y derivar los ids de cita de `citas.json` en el exportador. | exportador · dueños de copy |
| P3-7 | citas con [sic] | «novceientos [sic]», «ULTILLA [sic]», «puede [sic]» y «quieremos [sic]» no cambian el sentido; el plan reserva [sic] para cuando lo cambia («Luz y taquigrafos.» va sin él). «nuancilada [sic]» sí lo justifica. | Quitar los [sic] que no cambian el sentido (↺ 7 ya avisa de las erratas). | copy_sesiones |
| P3-8 | `fig.F27.cita.8`, `sesiones.antesala-1936.diario.cita.calvo`, `sesiones.casas-viejas-1933.diario.cita.martinezbarrio` | El original trae comillas rectas "…"; el copy pone “…”. Es la norma tipográfica del sitio, pero el aserto de citas debe normalizarlas o fallará. | Normalizar " → “” en el aserto, no en el copy. | exportador |
| P3-9 | `cortes.1931.contexto.1.b` | «su intervención ocupa 3.715 palabras» sobre una cifra V2. Regla: «fila» para la V2, «intervención» solo para el explorador. | «su fila ocupa…» o «su discurso ocupa…». | copy_cortes_a |
| P3-10 | `cortes.1931.contexto.1.d` | «acogido con una gran ovación» es literal, pero está en la columna `speaker` de V2 10 («El Sr. PRESIDENTE (Al ocupar su sitial es acogido con una gran ovación.):»), no en `speech`. | Que el aserto de citas busque también en `speaker`, o anotarlo en la tabla de anclas. | exportador · copy_cortes_a |
| P3-11 | `exportador/controles.py` | El control «Votaciones nominales: filas que las contienen, sesiones [6, 5]» mide las seis de F26, no las filas con listas (1.023 filas V2 en 405 sesiones). La etiqueta induce al error que corrigieron cuatro grupos. | Renombrar: «Votaciones de F26 (selección) y sesiones». Añadir el control de las listas: 1.023 · 405 · por etapa 532/408/81/2 filas y 206/165/32/2 sesiones. | exportador |
| P3-12 | `marcadores/inicio.md:47` (nota) | La nota dice «al menos 962 listas en 387 sesiones» (solo «dijeron sí»); `voto.listas.sesiones` = 405 con la definición común («dijeron / han dicho» + «sí / no»). No se imprime, pero es una tercera cifra en circulación. | Citar la definición común y 405. | copy_inicio |
| P3-13 | `Vecinas` (andamiaje) | En `cortes/guerra/` el texto sale pegado: «México 1945Ver las Cortes…»; la auditoría lo lee como número sin procedencia. | Separador entre la vecina y el enlace al índice. | andamiaje |

---

## 5. Qué se comprobó y salió bien

- **Todas las cifras de Inicio (31 marcadores), recalculadas sobre la fuente:** 755 sesiones en 752 fechas; del
  14-VII-1931 al 9-XI-1945; 14 sesiones y el 0,83 % (203.167 / 24.335.896) tras el 18-VII-1936; V2 71330 «Luz y
  taquigrafos.» (3 palabras, `rep_id` 456, CEDA, Badajoz) = v3 80306; V2 5423 (7 palabras) y 5424 (1.460), órdenes
  25 y 26 de la sesión 48 = v3 6078 y 6079; filas de las puertas 395 · 378 · 44 · 155 · 255 · 159 · 125 · 16 · 183
  (México: 5 + 56 + 27 + 95); votos 161–121 y 141–106 (V2 5453), 178–59 (6994), 368 de 466 con mitad 234 (13531; la
  lista en 13525), 318–19 (37177) con 462/232 (37178), 314–24 (37178), 238–5 (102358) con 209 (102359); 158,1 MB
  (165.785.782 B); versiones V2.0 y V1.1 y licencia CC BY 4.0 en la instantánea de Dataverse.
- **Muestra al azar de 52 marcadores de los demás grupos** (semilla 20260922; `docs/revision_fase1/recalcula_muestra.py`):
  **52 de 52 correctos**. Incluye ids de ancla con su fragmento, búsquedas FTS como el explorador (531, 493, 6, 16,
  108, 3 de 5), bibliotecas, `sessions.json` (series, número del Diario, presidente), meses, erratas de fechas, censo de
  CGOCUS, oradores de la v3 (426.392, 534.408), porcentajes por familia e ideología (26,1 %, 6,1 %) y las listas
  nominales por etapa (532 / 206; 81 / 32; 27 de la Presidencia).
- **Citas:** los 116 fragmentos de `marcadores/citas.md` están letra a letra en su fila V2 y v3 (los tres «fallos»
  del recuento son la notación ⏎ de salto de línea). De las 264 citas «» del copy, 187 están en la V2 o solo en la v3,
  y lo dicen; las 77 restantes son rótulos de interfaz, nombres de biblioteca, títulos de obras, etiquetas de
  `speaker`, citas con [sic] intercalado (literales al quitarlo) o la frase atribuida a Ibárruri, que el copy da como
  ausente (comprobado: no está en ninguna edición).
- **Marcadores ↔ copy:** los 966 marcadores del copy tienen fila en `docs/marcadores/` o son variables de plantilla
  (`{{mes}}`, `{{n}}`…); solo `{{D-20}}` queda, que es del investigador. Ninguna clave tiene dos valores esperados
  distintos entre grupos (las 26 claves declaradas en más de un archivo difieren solo en el formato de escritura).
- **Vetos:** ni una palabra ni una cifra del prototipo; ninguna promesa falsa del explorador fuera de
  `explorador.no_hace.*` (los atajos `s`, `t`, «Solo lo que se habla», «Nº de sesión», «Mis bibliotecas › Añadir
  bibliotecas del proyecto…» y las consultas de «Pruébelo» comprobadas se reproducen); sin 584, 649, «unos 730», 17.231, LLaVA ni
  LightOnOCR; las 13 frases fijas ↺ están letra a letra como en el plan.
- **Grafías:** ningún nombre con dos grafías en el copy fuera de las citas (Giménez Fernández, Ossorio, Alcalá-Zamora,
  Gil Robles, Martínez Barrio, Jiménez de Asúa, Pildáin…); «Calvo-Sotelo» solo en el apellido de una autora
  (Cabrera Calvo-Sotelo). La única ambigüedad es Ventosa (P2-5).

---

## 6. Pendientes que no son errores de la fase 1

- 936 marcadores declarados sin cifra: módulos `cortes`, `sesiones`, `diario`, `metodo`, `datos`, `explorador` y
  `afinidades` del exportador (fase 2). Las figuras siguen como `FigHueco`.
- Copy inglés: no existe; la compilación estricta falla por eso.
- Del investigador: D-20 (motivo del formulario), D-22 (11 grafías por revisar), D-25 (836, Ventosa 9-X-1934),
  el contacto de [Escribirnos], la redacción de ↺ 10 (P2-4) y, si lo quiere, levantar el veto de «más de 17.000»
  (P2-1).

## 7. Cómo se hizo

Compilación con las órdenes del contrato. Claves de plantilla frente a copy: rastreo de `⟦…⟧`, `data-pendiente` y
`data-todo-copy` en `dist/es/`. Marcadores: el lector de tablas del propio exportador (`lee_marcadores`) frente a los
`{{…}}` de `src/i18n/es.json`. Cifras y citas: pandas sobre el CSV depositado y `sqlite3` sobre `corpus.sqlite`, sin
reutilizar los guiones de los grupos. El recálculo de la muestra queda en `docs/revision_fase1/recalcula_muestra.py`
(solo lectura, ≈ 40 s).
