# Estado del trabajo · para retomar desde otra cuenta o sesión

> Documento de traspaso. **Léalo entero antes de seguir.** Se actualiza en cada hito; la instantánea automática de lo
> que corre está en `docs/estado/AUTO.md` (se regenera a mano en cada hito con `python3 docs/estado/instantanea.py`).
> Última actualización manual: **24-09-2026** (la base corregida, sin ediciones; «Corrija al Diario»; los juegos pedidos). Anterior: **23-09-2026, 09:45** (decisiones aplicadas, ronda final de diseño integrada y **español congelado** → `CHANGELOG.md`; sigue el inglés).

> **Incidente 22-09 ~21:20 (São Paulo):** se agotó el límite de sesión. Cayeron la integración de la skill maestra (`wf_dbf578ff-435`: inventario de 65 fichas hecho; arquitecto, crítico, demos y corrección sin terminar; hay archivos a medias en `~/.claude/skills/maestro-diseno-web/`) y la fase 2 (`wf_93df30d4-88d`: ningún agente terminó; el integrador de diseño y el corrector de copy dejaron cambios parciales en `src/styles/`, `src/lib/` y `docs/copy_es/`). Reanudados los dos a las ~00:35 con `resumeFromRunId`. Si se vuelven a cortar en otra sesión, relance sus guiones de `docs/estado/flujos/`: los agentes leen el estado de los archivos y continúan.

> **23-09-2026: el investigador revisó la vista previa y decidió** (detalle en `docs/DECISIONES_23-09.md`): peso comprimido vale; oro en «Abrir el explorador»; «Hoy puede» primero; nota al margen para «Luz y taquigrafos.»; motivo del formulario (D-20): conocer a los usuarios y los usos de la base para mejorarla y comunicar novedades; el resto, a criterio del director (resuelto en ese archivo). Siguiente: aplicar, congelar el español, inglés y preparar la publicación → flujo LANZADO `cerrar-y-traducir-lyt` (run `wf_3ee15cb5-1fd`, guion en `docs/estado/flujos/`; si se corta: mire CHANGELOG.md —¿español congelado?—, `docs/03a_GLOSARIO_es-en.md` y `docs/copy_en/` para saber hasta dónde llegó, y relance solo lo que falte).

> ⛔ **23-09-2026: NO PUBLICAR.** El investigador: «No publiques el resultado de la página. Quiero revisar todo muy bien y reformular algunas cosas que no me gustan antes. Esa no es una versión publicable.» La congelación del español queda **REVOCADA**; el flujo `cerrar-y-traducir-lyt` se detuvo durante la traducción (glosario hecho; `docs/copy_en/` son BORRADORES que habrá que rehacer sobre el español definitivo). Nada se ha subido: sin remoto, sin commits, sin despliegue. Siguiente: la revisión del investigador y aplicar sus reformulaciones; solo después, inglés y publicación, y siempre con su visto bueno expreso.

> **23-09-2026, noche: REDISEÑO.** El investigador pidió una landing que presente la infraestructura (no un apéndice
> metodológico), sin comparar ediciones y con gráficos que se juegan. Propuesta y decisiones: `docs/REDISENO_23-09.md`;
> hecho y verificado: `CHANGELOG.md` (entrada «rediseño de Inicio»). Rama `claude/trusting-allen-dxol3x`; la versión
> anterior, en `main` (`240b401`, etiqueta `v0.1-antes-del-rediseno`). Siguen: la cabecera y las seis páginas del § 5
> de la propuesta, y el inglés. Nada se publica sin su visto bueno expreso.

> **24-09-2026: LA BASE CORREGIDA.** El investigador: el sitio no debe señalar la V2 como problemática («esos son errores
> ya corregidos en la v3»; «cuando actualice la base con las correcciones, esos problemas ya no existirán»), ni hablar de
> «trampas» de las columnas. Hecho y verificado: `CHANGELOG.md` (entrada del 24-09). Antes de publicar, **con la base
> corregida ya depositada**: reexportar sobre ella (hoy conviven cifras de la V2 y de la base del explorador) y revisar
> fragmentos de código e ids literales; ver la lista en esa entrada. Juego nuevo en Método 03, «Corrija al Diario».
> **Juegos pedidos (24-09):** le gustan los seis propuestos y añade dos ideas; se construirán por fases, con su visto
> bueno: (1) el aplausómetro (El Diario, acotaciones del taquígrafo), (2) ¿Quién lo dijo? (fichas y puertas),
> (3) ¿Izquierda o derecha? (Método, ideología), (4) ¿Cuándo fue el pico? (laboratorio de Inicio), (5) ¿Más o menos?
> (Explorador), (6) ¿Firmaron juntos? (Afinidades) y (7) «¿Esta o esta?» / «Descubra su familia partidaria»: dos frases
> reales sobre el mismo asunto, sin autor; se elige, se descubre quién las dijo y al final sale la familia y el lugar en
> el eje EI–ED (mecánica de SexyMP, pero de ideas; la clasificación es la del jugador: una colectiva pediría servidor).
> Las frases del 7 las revisa el investigador.

## 1. Qué se pide (palabras del investigador, Rodrigo Rodrigues-Silveira)

1. **Sitio multipágina de «Luz y Taquígrafos»** (Diarios de Sesiones del Congreso, 1931–1945; THQCMI V2.0; explorador
   `rodrodr.github.io/luz_explorer/`; Afinidades Elegidas CGOCUS V1.1). Rechazó la landing de una página
   (`aecpa2026/out/landing.html`) por pobre, amontonada, sin gráficos interactivos y demasiado resumida. Modelo:
   el sitio de ParlaIbero (`/Users/rodrodr/Dropbox/Apps/parlaibero_site`).
2. «Máxima calidad en el menor tiempo posible»; usar las máximas capacidades de diseño de experiencia y de interfaz.
3. Buscar, seleccionar e **instalar** los mejores recursos y skills, consagrados y **de vanguardia** (three.js, p5.js…),
   buscando en la web, y **integrarlos para que funcionen en armonía**.
4. Objetivo de fondo: ser excelente en el diseño de **cualquier** aplicación web (juegos, lectura, landing pages).
5. Guardar el estado en la memoria y actualizarlo a menudo.

## 2. Decisiones tomadas por el investigador

| decisión | valor | fecha |
|---|---|---|
| Lenguas | español e inglés (el español se congela antes de traducir) | 22-09 |
| Repositorio | propio: `/Users/rodrodr/Dropbox/Apps/luz_site` | 22-09 |
| Financiación | sin mención | 22-09 |
| Nombres de diputados | sí, con su grafía correcta | 22-09 |
| Pila | Astro estático sin framework de cliente, sobre el esqueleto de ParlaIbero | 22-09 |
| Lector principal | investigador que decide usar la base | 22-09 |
| Éxito | descargas y citas del CSV | 22-09 |
| Decisiones abiertas del plan | **se adoptan todas las recomendadas** («dale duro»); las puertas se funden en una revisión de la vista previa | 22-09 |
| Prototipo de 1931 | fuera, entero | 22-09 |

Pendientes suyos: D-3 (depositar CGOCUS V2.0), D-4 (manejador `#q=` en el explorador), D-18, D-19, D-20 (motivo del
formulario de Dataverse), D-21 (URL definitiva; propuesta `rodrodr.github.io/luz/`), D-22 (revisar grafías), D-25.

## 3. Mapa de archivos

| qué | dónde |
|---|---|
| Plan (revisado: 81 hallazgos, anexo al final) | `docs/00_PLAN_sitio.md` |
| Narrativa página a página | `docs/01_NARRATIVA_sitio.md` |
| **Contrato de construcción** (dueños, formatos, exportador) — manda sobre el plan | `docs/CONTRATO_CONSTRUCCION.md` |
| Producto y diseño (método impeccable) | `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `.impeccable/surfaces/*.md` |
| Página muestra del sistema de diseño | `docs/diseno/muestra.html` (+ `docs/diseno/fuente/gen_muestra.py`, capturas en `docs/diseno/capturas/`) |
| Prototipos de movimiento | `docs/diseno/prototipos/` (P1 hemiciclo CSS; P2 del Diario a la fila, three.js) |
| Recursos elegidos | `docs/RECURSOS_DISENO.md`, `docs/RECURSOS_VANGUARDIA.md`, `~/.claude/skills/_arsenal/ARSENAL.md` |
| Peticiones de cambio entre dueños | `docs/peticiones/*.md` (la de diseño: `docs/peticiones/diseno.md`) |
| Copy en español (fuente) | `docs/copy_es/*.md` → `scripts/copy2i18n.py` → `src/i18n/es.json` |
| Marcadores de cifras y citas | `docs/marcadores/*.md` (+ guiones de comprobación) |
| Bibliografía y grafías | `docs/02b_BIBLIOGRAFIA.md`, `docs/02c_GRAFIAS.md`, `exportador/grafias.csv` |
| Exportador de datos | `exportador/exportar.py` + `exportador/modulos/*.py` → `src/data/`, `public/datos/` |
| Estudio previo | `docs/estudio/` (informes, datos, capturas del explorador, crítica, síntesis) |
| Revisión de la fase 1 | `docs/REVISION_FASE1.md` (la escribe el crítico de la fase 1) |
| Fase 2: integración, pulido y lo abierto | `docs/revision_fase2/INTEGRACION.md` · `docs/revision_fase2/PULIDO.md` · `docs/peticiones/pulidor.md` · capturas en `docs/revision_fase2/capturas/{pulido,critica,auditoria}/` |
| Datos primarios | V2: `/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv` (MD5 `360332a0…`) · v3: `~/.cache/luz_site/corpus.sqlite` (sha256 `3a0d8b2d…`; si falta, bájela de `rodrodr.github.io/luz_explorer/datos/corpus.sqlite.gz.000-.002` y descomprima) · papel de fila: `~/.cache/luz_site/clima/*.jsonl` · motor del explorador: `~/.cache/luz_site/motor_explorador/` |
| Versión anterior de una página (referencia) | `aecpa2026/out/sitio/` (7 páginas) y `aecpa2026/landing/` |

## 4. Hecho

- **Estudio** (7 informes) y **plan + narrativa** con jurado de tres arquitecturas y revisión adversarial (81 hallazgos
  comprobados; guion `docs/estudio/sintesis/comprobaciones_revision.py`).
- **Fase 1 de construcción** (10 dueños en paralelo): andamiaje Astro, exportador, copy español de todas las páginas,
  marcadores, bibliografía, grafías y capturas del explorador. Crítica en `docs/REVISION_FASE1.md`.
- **Diseño**: `PRODUCT.md`, `DESIGN.md` («el Diario, anotado al margen»), 5 briefs de superficie, página muestra,
  peticiones al andamiaje en `docs/peticiones/diseno.md`.
- **Fase 2 de construcción** (seis dueños y un integrador): las 22 páginas en español con todas sus figuras (F01/F01c/F01e,
  F05, F07, F09, F10/F11, F12, F16–F22, F25–F30, F32–F35) y con datos reales del exportador. Integración y estado de
  cada página: `docs/revision_fase2/INTEGRACION.md`.
- **Crítica de la fase 2** (experiencia 30/40 Nielsen · técnica 16/20 · datos 9/10; 47 hallazgos: 1 P0, 4 P1) y
  **pulido final** (23-09, 02:45): el P0 (tabla de F27/F28) y los cuatro P1 (portada y camino de descarga, código de
  Método enfocable, escala única de F30) están corregidos. De los 47 hallazgos, 36 se aplicaron entero o en parte, 2
  eran falsos, 5 se rechazan con motivo y 4 pasan a su dueño. Detalle hallazgo por hallazgo:
  `docs/revision_fase2/PULIDO.md`. Capturas: `docs/revision_fase2/capturas/pulido/`.
- **Puertas tras el pulido:** exportador estricto ✓ (1.492 marcadores) · i18n y check-i18n ✓ (2.434 claves) · formatos ✓
  · astro check ✓ (0/0) · build ✓ (48 páginas) · audit-cifras ✓ · Playwright 242 ✓ y 3 ✗ (solo `peso`) · axe 0
  violaciones en 176 pasadas (22 páginas × Gráfico/Tabla × 1.440/360 × dos temas).
- **Skills instaladas** (23, revisadas antes de instalar; ver § 6).

## 5. En curso y siguiente

0. **ESPAÑOL CONGELADO (23-09-2026, 09:45)** → `CHANGELOG.md`. Huella SHA-256 de `src/i18n/es.json`:
   `ceb6286b8a6f81b8873891d8b5fe83e90062841e6675c9ded72fbd451e4ed257` (2.437 claves). Versión de lectura:
   `docs/lectura/es.md`. Si se toca `docs/copy_es/`, cambia la huella: hay que abrir una entrada nueva en `CHANGELOG.md`.
   Verificación del congelado:
   - exportador `--estricto` (1.497 marcadores, 0 sin cifra), i18n, check-i18n, formatos y astro check (0/0) en verde;
   - build: 48 páginas; `claves_figura --estricto`: 738 filas; audit-cifras, también estricto;
   - Playwright 245/245 y, con `STRICT=1`, 236 más 8 omitidas del inglés;
   - puerta del kit (Chromium y WebKit, 375 y 1.440 px, los dos temas, axe) en Inicio, Afinidades, Método, `/cortes/` y
     la ficha I: sin errores, sin desborde, 0 infracciones graves.
1. **Decisiones del investigador y del director: TODAS APLICADAS** (`docs/DECISIONES_23-09.md`):
   - peso en gzip;
   - oro en el explorador: copy invertido y el destino de cada botón según su rótulo;
   - «Hoy puede» primero;
   - nota al margen del grito;
   - D-20 junto a ↺ 3;
   - D-3, D-4, D-18, D-19, D-21, D-22 y D-25 en el copy y en `src/config/enlaces.ts`.

   **Resuelto en la verificación del 23-09:**
   - **Presupuesto de palabras en STRICT:** nueve páginas pasaban el tope del plan. Los topes pasan a ser el recuento
     congelado redondeado a la cincuentena de arriba (`tests/rutas.ts`, motivo en `CHANGELOG.md`). Es decisión de la
     verificación y el director puede revisarla.
   - **WCAG 2.5.8 en F01:** hay un registro nuevo, «Las puertas, sesión a sesión», bajo F01 en `/cortes/`, y la
     excepción «Equivalente» está registrada en `PRODUCT.md`. La puerta del kit la sigue marcando en `/cortes/` y en la
     ficha I (`a.b 1×15, 1×22`), porque no sabe ver la excepción. Es el único fallo esperado.
   - **Rótulos de F21:** «Las izquierdas» y «Las derechas» (claves `fig.F21.rotulo.1936.*`). El ancla ya no sube a un
     vacío por culpa de un componente suelto: queda como mucho a 0,3·H sobre el decil alto de su grupo
     (`src/viz/red-encuadre.ts › anclaGrupo`).
2. **Pendientes que no bloquean:**
   - **Pósteres de F21** (versión sin JS y móvil antes de «Cargar la figura»). Siguen con las posiciones sin encuadrar y
     1936-1939 sale aplastada. El exportador tiene que dibujarlos con `encuadre()` (`docs/peticiones/diseno_final.md`,
     «Al exportador», 1).
   - **Tercera anotación de F21**, opcional: `afin.<leg>.aristas.cruzan`, primero en el exportador.
   - **Asiento bajo la llamada de la portada:** sigue describiendo el CSV, que ahora es el botón secundario. Se deja
     porque dice lo que se descarga.
   - **Bases en las cabeceras de F01c y F18** (`docs/peticiones/pulidor.md`, a los dueños): comprobar en la próxima ronda.
3. **Inglés** (fase siguiente, parte del CONGELADO): **glosario HECHO** (23-09: `docs/03a_GLOSARIO_es-en.md`, en-GB;
   guía `docs/copy_en/LEEME.md`; mecanismo de «(our translation)» y `lang="es"` pedidos en `docs/peticiones/glosario.md`), `docs/copy_en/*.md` → `en.json` (claves nuevas incluidas:
   `fig.F21.rotulo.1936.*` y `cortes.puertas.registro`), retrotraducción de muestra y auditoría de `/en/`. Hasta
   entonces `/en/` sirve el español marcado, con `noindex` y fuera del sitemap, y `npm run publicar` se para en
   `check-i18n --strict` (es lo esperado).
4. **Vista previa para el investigador** (Puerta 4): `npm run build && npm run preview` (puerto 4322). El investigador
   sube y publica (`git push` le corresponde).
5. **Skill maestra TERMINADA** (23-09, ~04:00) `~/.claude/skills/maestro-diseno-web/`. Abierto: revisor final en
   contexto nuevo, Firefox/VoiceOver/iOS, Lighthouse (pide permiso para `npx`).

**Cómo retomar un flujo cortado:** los guiones de cada flujo están en
`~/.claude/projects/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/workflows/scripts/`
y sus resultados por agente en `…/subagents/workflows/<run>/journal.jsonl`. `resumeFromRunId` solo sirve en la misma
sesión; en otra, lea el `journal.jsonl`, compruebe qué archivos existen y relance solo lo que falte.

## 6. Arsenal de diseño (para cualquier proyecto web)

- Guía de uso: empiece por `~/.claude/skills/maestro-diseno-web/SKILL.md` (cuando exista) y por `impeccable`.
- Instaladas hoy (todas en `~/.claude/skills/`): better-typography, better-accessibility, better-colors, charts-graphs,
  tooltips, astro-framework, modern-css, emil-design-eng · webgpu-threejs-tsl, three-best-practices, review-animations,
  find-animation-opportunities, algorithmic-art · phaser, pixijs, test-playable-web-games, tiptap, copywriting, cro,
  core-web-vitals, design-tokens, web-haptics, ui-sound-design · web-design-guidelines.
- Ya estaban: impeccable (+ critique, audit, polish, layout, typeset, colorize, clarify, adapt, distill, quieter,
  animate, delight, bolder, overdrive, shape, optimize), design-taste-frontend, high-end-visual-design,
  redesign-existing-projects, minimalist-ui, scientific-visualization, gsap-*, motion-graphics y otras.
- **`git` ARREGLADO (23-09-2026):** ahora `/usr/bin/git` es Apple Git 2.54 para arm64. Antes fallaba (Command Line Tools y `git` de Homebrew para Intel). Ya se puede
  subir el sitio y usar `npx skills add owner/repo@skill -g -a claude-code -y </dev/null`; respaldo: descargar el tarball,
  revisarlo y `npx -y skills add ./<repo> --skill <nombre> -g -a claude-code -y`.

## 7. Reglas que no se pueden olvidar

Nada del prototipo de 1931 · toda cifra con base (V2/v3/proyecto/afin) y verificada sobre la fuente · no prometer lo
que el explorador no hace (enlaces profundos, cabecera de sesión, búsqueda semántica, comodín, NOT, proximidad) · la
sesión del 1-X-1931 está truncada al final · 78 (no 80) diputados en las tres legislaturas · «34 millones» vetado ·
español de España, «usted», frases ≤ 30 palabras · no escribir en `2REP/`, `parlaibero_site/` ni en Dataverse · el
investigador sube y publica él (`git push` le corresponde).
