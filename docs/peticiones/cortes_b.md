# Peticiones del grupo cortes_b (fichas III, IV y V)

> 22-09-2026. Lo que este grupo necesita de otros dueños, o les avisa, para que su copy funcione. No he tocado nada
> ajeno: solo lo anoto. Copy: `docs/copy_es/cortes_1936.md`, `cortes_guerra.md`, `cortes_mexico.md`. Marcadores y
> anclas: `docs/marcadores/cortes_1936.md`, `cortes_guerra.md`, `cortes_mexico.md`, comprobados con
> `docs/marcadores/comprobar_cortes_b.py` (223 marcadores y 85 anclas, 0 discrepancias; unos 3 s). Grafías:
> `peticiones/grafias_cortes_b.md`. Bibliografía: `02b_BIBLIOGRAFIA.md`, «Fichas III, IV y V».

## 1. A cortes_a (Las Cortes, plantilla de ficha y figuras)

1. **Hecho lo que pedían.** Las tres fichas reutilizan `cortes.ficha.*` y `fig.*` sin redefinirlos, siguen sus
   convenciones de clave (`hoy.*`, `contexto.N.a…`, `contexto.N.fuentes`, `calendario.*`, `palabra.*`, `puertas.*`,
   `debates.*`, `antes.*`, `leer.*`, `citar.sesion`) y usan su definición de `etapa.<E>.listas_nominales.*` (III: 81 filas en
   32 sesiones). **Pero la clave canónica de meses es `etapa.<E>.meses_con_sesion`** (así está en `src/data/cifras.json`
   y en `base.md`; el exportador solo admite como alias `.meses_con`): `etapa.<E>.meses.con_sesion`, la forma de
   `cortes.md` y `cortes_1931.md`, sale hoy sin resolver (⟦⟧) en la compilación. Las fichas III–V usan la canónica. Las líneas `cortes.etapa.III–V.linea` me valen.
2. **Claves nuevas que añado a la plantilla, por si la plantilla las necesita pintar:** `cortes.guerra.sesiones.*` y
   `cortes.mexico.sesiones.*` (la lista de todas las sesiones de IV y V, que pide el plan, movimiento 6, con rótulo
   `…sesiones.titulo` y una línea por sesión con clave `<fecha>-<número>`), `cortes.guerra.palabra.f05_v3` y
   `…f09_salvedad` (por qué F05 va en la v3 en la guerra), `cortes.guerra.citar.sin_paginas` (IV y V no tienen páginas
   verificadas; la ficha V la repite con ↺). Si prefieren otro nombre, lo cambio.
3. **«Lo que no está aquí» (`cortes.ausente.*`): las reuniones de la Diputación Permanente en París sí tienen ancla en
   el corpus**, sin necesidad de [EXT]:
   - la nota final de la sesión 69 dice que el tomo reunió las fotocopias de «las cuatro de la Diputación Permanente,
     celebradas en París» (V2 107341 · v3 121465), que el corpus no trae;
   - la relación de acuerdos leída el 10-I-1945 (v3 121466, solo en la v3) fecha en París sus acuerdos del 3 de marzo al
     31 de julio de 1939, y en México los de 1941 a 1944.
   La ficha V lo dice en `cortes.mexico.antes.paris`; si el índice lo quiere, la frase y sus anclas están comprobadas.
4. **Diputación Permanente en 1936:** el Diario de marzo de 1936 recoge su actividad previa («Suplicatorios tramitados
   por la Diputación permanente de Cortes», sumario del 17-III, v3 114890; «Decretos-leyes dictados previa aprobación
   de la Diputación permanente de Cortes», sumario del 7-IV, v3 115598). Solo en la v3. Y hay una [A] comprobada para su
   reunión del 15-VII-1936: Cabrera Calvo-Sotelo (1995), p. 45 («El día 15 se reunió la Diputación Permanente de las
   Cortes»), ya en `02b_BIBLIOGRAFIA.md` (A-cabrera-1995).
5. **`fig.F16.banda.presidente` dice «Presidente titular».** En la etapa III, del 15 de abril al 8 de mayo, la banda da
   a Jiménez de Asúa, que era vicepresidente en funciones (el acta del 11-V lo llama «Vicepresidente en funciones de
   Presidente», v3 116860). La ficha III lo explica en `calendario.presidente_otros`; no hace falta cambiar el rótulo.

## 2. A sesiones (F26, Sesiones y votaciones, puertas)

1. **Definición de «lista nominal»** (con cortes_a): la expresión común, `senores que (?:dijeron|han dicho)…`, **no ve
   la votación nominal de Figueres**, cuya lista empieza «Señores Diputados que dijeron SI» (V2 107340 · v3 121463;
   resultado en V2 107341: «Han votado afirmativamente los sesenta y dos señores Diputados»). Propuesta: añadir
   «senores diputados que dijeron». Con ella, la etapa IV da 3 filas en 3 sesiones (1-X-1937, «Total, 172»; 1-X-1938,
   «por 168 votos en pro y ninguno en contra»; 1-II-1939) y la III, 81. La cifra de todo el corpus sube en una.
2. **Votaciones nominales de la guerra**, por si F26 o Sesiones las quieren nombrar: 1-X-1937, toma en consideración de
   una reforma del Reglamento (V2 107162 · v3 121239); 1-X-1938, convalidación de decretos del Gobierno (V2 107312 ·
   v3 121426–121427); 1-II-1939, proposición final de Figueres (V2 107340–107341 · v3 121462–121464).
3. **Puerta `antesala-1936`:** el «viva» negado de la narrativa (§8.3) está en el acta de la junta preparatoria del
   15-III-1936 (v3 114890): no afecta a la puerta, pero si alguna página lo usa, el presidente es Carranza.
4. **Puerta `figueres-1939`:**
   - el lugar lo dice la propia sesión: «Castillo de Figueras, a primero de Febrero» (V2 107337 · v3 121459);
   - «en un sótano de una fortaleza del siglo XVIII, bello castillo de Figueras» lo dice Pascual Leone el 7-XI-1945
     (V2 107413 · v3 121547): la narrativa lo daba por [EXT] con la Fundación Juan Negrín;
   - la contradicción de la nota del volumen (B9) la resuelve la nota final (V2 107341 · v3 121465): «se ha podido
     obtener fotocopia del ejemplar del Extracto de dicha sesión»;
   - Martínez Barrio, «Lo hacemos en un trozo de la tierra catalana…», solo en la v3 (fila del sumario 121446).
5. **Puerta `mexico-1945`:** la promesa es «Si, prometo», sin tilde, en las dos filas (V2 107372 · v3 121502). Si la
   cita va con tilde, el aserto letra a letra fallará.
6. **15-IV-1936 (puerta 0.2 `abril-1936`):** el pasaje de «las botas» está en V2 102493 · v3 115838 (Ibárruri: «le
   quitaremos los zapatos y le pondremos las botas»), inmediatamente después de dos órdenes de «no constarán». Hay tres
   filas de la Presidencia con la fórmula ese día (V2 102484, 102486, 102492 · v3 115828, 115830, 115836).

## 3. A El Diario (F28)

1. Las órdenes de «no constarán» de la etapa III, con sus pares V2 · v3: 102484 · 115828, 102486 · 115830 y
   102492 · 115836 (15-IV); 103251 · 116698 (6-V); 106290 · 120222 (1-VII). Petición de Calvo Sotelo: 104406 · 118058
   (3-VI). Acotaciones «no se consigna(n) por orden»: 103182 · 116626 (6-V), 105324 · 119098 (16-VI), 106289 · 120221
   (1-VII). La ficha III no las cuenta: remite a F28 con [Ver qué recoge el Diario].
2. La nota inicial del volumen de la guerra llama «LIBERACION DE BARCELONA» a su caída (v3 121110); la nota final de la
   sesión 69 corrige lo de Figueres (V2 107341 · v3 121465). Las dos son de quien reunió el tomo, no de las Cortes.

## 4. A figuras (F05, F09, F16)

1. **F09 en la etapa IV:** la V2 pone dentro de filas de la Presidencia dos discursos de Negrín (1-X-1937, V2 107148,
   6.378 palabras; 1-II-1938, V2 107232, 7.749). La Presidencia se queda con el 26,1 % de las palabras de la etapa en
   la V2 (`etapa.IV.presidencia.pct`). La ficha lo dice en `cortes.guerra.palabra.f09_salvedad`.
2. **Guardas de nombres de F05** en mis tablas: `oradores.etapa.III.1…5.rep_id` (170, 456, 423, 130, 993),
   `oradores.etapa.IV.1.rep_id` (652) y `oradores.etapa.V.1…3.rep_id` (384, 754, 306).
3. **F16 en la etapa V:** los metadatos del proyecto marcan `verificar = true` para Fernández Clérigo y Jiménez de
   Asúa como presidentes de sesión (los dos, «Vicepresidente de las Cortes») y para el Gobierno Giral. La banda debe
   llevar el sello del proyecto; la ficha V dice que la fecha del cambio de Gobierno está «pendiente de verificar».

## 5. Al exportador (`cortes.py` o `base.py`)

1. **Cifras nuevas de este grupo** (valor esperado y fórmula en mis tablas): `cortes.1936.*`, `cortes.guerra.*`,
   `cortes.mexico.*`, las anclas `fila.1936.*`, `fila.guerra.*`, `fila.mexico.*` (85, con su fragmento para el aserto
   letra a letra) y, de etapa, `etapa.<III|IV|V>.pres.*`, `.gob.*`, `.presidencia.pct`, `.vice_ses`, `.debates`,
   `.listas_nominales.*`, `sesion.<fecha>-<n>.diario|pag.*|id.*|filas.v3`, `oradores.etapa.*`, `familias.etapa.*`.
2. **Referencia ejecutable:** `docs/marcadores/comprobar_cortes_b.py` calcula todo sobre las fuentes y compara con las
   tablas. Se puede portar a `exportador/modulos/cortes.py`.
3. **Recuentos de «Hoy puede»:** FTS5 sobre `corpus.sqlite` con la consulta plegada (`"orden publico"`, `confianza`,
   `"diputacion permanente"`) y el rango de fechas de la etapa. El método reproduce los recuentos publicados del
   explorador (6, 40, 531, 2.028 y 724). Fecha del recuento: 22-09-2026.
4. **`etapa.<E>.serie`** es texto (proyecto); en `citar.sesion` el título de la serie va escrito, como en la ficha II.

## 6. Al andamiaje (`check-i18n`, `cita.ts`, `cifras.ts`)

1. **Lista blanca de `check-i18n`:** en las claves `*.leer.*` y `*.contexto.*.fuentes`, los números de volumen y de
   página de las referencias; en `*.hoy.*`, las fechas de Desde y Hasta en la forma del explorador (`16/03/1936`) y los
   rótulos «1936-1939» y «1936–45», que son valores de la interfaz. Las fechas de sesión («1-X-1936») y los años ya
   están permitidos.
2. **Citas en mayúsculas.** Dos citas de la nota del volumen van tal como están impresas, en mayúsculas («CON
   POSTERIORIDAD AL 18 DE JULIO», «NO EXISTE DATO ALGUNO»): el aserto letra a letra no debe plegar mayúsculas. La
   primera lleva un número dentro de la cita.
3. **`|letra` con valor 1.** «un debate preparado» (IV y V) va escrito en el copy; si `etapa.IV.debates` o
   `etapa.V.debates` dejan de valer 1, la guarda de mis tablas lo detecta.

## 7. A la plantilla de ficha (`src/pages/[lang]/cortes/[etapa].astro`) y a sus componentes

Visto hoy en una compilación de prueba hecha en una copia del sitio (fuera del repositorio), con mis cifras inyectadas
solo allí: las tres fichas compilan, no dan errores de consola y no desbordan a 1.440 ni a 375 px en los dos temas,
salvo lo que sigue, que no es de su copy:

1. **«Debates preparados en el explorador» sale dos veces**: como título de la sección y otra vez en negrita, porque
   `tambien` pinta `cortes.ficha.debates.*` con su `.titulo`. Pasa en las cinco fichas.
2. **Puertas repetidas.** `RegistroPuertas` ya pinta la puerta de la etapa con su título y su línea; las fichas I y II
   añaden además `cortes.<etapa>.puertas.*` y salen dos veces. Las fichas III–V ya no traen esas claves.
3. **Ficha V a 375 px**: la línea de `RegistroPuertas` de `mexico-1945` desborda (492 px) mientras
   `puerta.mexico-1945.filas` y `.sesiones` salen sin resolver (⟦…⟧, dueño: sesiones). Con esos dos marcadores
   resueltos (probado con valores de prueba) ya no desborda; aun así, conviene que el registro parta la línea en móvil.
4. **Las sesiones de IV y V** (`cortes.<etapa>.sesiones.*`) se pintan como párrafos, en el orden del copy. Cada línea
   abre ya con su fecha; si la plantilla quiere un registro de calendario con filas y palabras de `sesiones.json`, la
   clave de cada línea es `<fecha>-<número>` y puede casarse con él.

## 8. Al investigador (pendientes, sin tocar los datos)

1. **D-22, grafías.** Las de este grupo, en `grafias_cortes_b.md`; la más delicada, «Manuel Giménez Fernández»
   (`rep_id` 456, crudo «Manuel Jimenez Fernandez»), la misma que ya pidió cortes_a.
2. **`sessions.json` cita Wikipedia** en dos notas de Gobierno: la fecha del encargo a Giral (21-VIII-1945, con la
   discrepancia es/en de Wikipedia) y la dimisión de Negrín del 17-VIII-1945. El copy no las afirma; la ficha V dice
   que la fecha del cambio es del proyecto y está pendiente de verificar.
3. **Sesión del 8-IV-1936 (núm. 16):** los metadatos dan presidente titular a Martínez Barrio, y la cabecera del Diario
   también, aunque la noche anterior había pasado a ser Presidente de la República (V2 102368–102369). Conviene
   mirarlo en el PDF: puede ser la cabecera impresa de la serie.
4. **Partido de Giral y de Azaña en 1936-1939:** la base los codifica «AR»; en 1936 su partido era Izquierda
   Republicana. El copy no nombra partidos de esta etapa salvo en la frase de F05 (RE, CEDA, Lliga), que no se ve
   afectada.
5. **La proposición de Sabadell** va fechada «1.° de Octubre de 1939» en las dos ediciones (V2 107319 · v3 121437),
   errata del extracto por 1938. El copy cita solo el lugar.
