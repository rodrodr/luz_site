# Peticiones del grupo 1 · Inicio, raíz, 404, Las Cortes y F01/F16 (fase 2, 23-09-2026)

Dueño que pide: grupo 1 (`src/pages/[lang]/index.astro`, `src/pages/[lang]/cortes/index.astro`, `src/pages/index.astro`,
`src/pages/404.astro`, `src/components/FigCalendario.astro`, `src/viz/geom/calendario.ts`, `src/viz/imagen-calendario.ts`,
`src/viz/tabla-calendario.ts`, `src/scripts/fig-calendario.ts`, `src/pages/datos/F01-[lang].{svg,png}.ts`,
`exportador/modulos/cortes.py`, `docs/copy_es/{inicio,cortes}.md`, `docs/marcadores/{inicio,cortes}.md`). No he tocado
ningún archivo de otro dueño.

## A · Andamiaje (integrador)

1. **`audit-cifras.mjs`, regla 3 (NotaBases): falla en `es/index.html` y `en/index.html`.** Las únicas cifras v3 de
   Inicio son ids de fila puestos junto a su par V2 (`fila.luz.id.v3`, `fila.presidencia.id.v3`, `fila.campoamor.id.v3`),
   y la página ya lleva ↺ 4 (`comun.fija.ids`), que explica el doble id. Es la petición comun-inicio A.4, aún abierta.
   Inicio no puede añadir ↺ 13 sin pasar sus topes (689 de 700 palabras; 114 de 120 de límites). Propuesta: en la
   regla 3, no contar las `<data>` v3 cuya cifra es `t: "id"` si la página lleva ↺ 4, o aceptar ↺ 4 como NotaBases de ids.
2. **`FiguraMarco`: una prop `familia` (o `titulo` + `pregunta`)** para las escalas de una misma figura. F01c y F01e no
   tienen familia en `lib/figuras.ts`; por eso `FigCalendario` lleva su propio marco con las MISMAS clases (`figura`,
   `fig-cabeza`, `fig-id`, `pest-*`, `fig-datos`, `fig-leame`, `fig-pie`) y la isla común. Con esa prop, pasa a FiguraMarco.
3. **`.fig-id` de `FiguraMarco`**: la auditoría lee «F26Lo que se votó…», «F25…», «F07¿Quién…» como números sin
   procedencia. En `FigCalendario` el código lleva `data-audit-exento="código de figura"`; conviene lo mismo en el marco.
4. **Inicio: hecho lo de `peticiones/integrador-diseno.md` § 2.1–2.3.** Quitada la regla `.grito p { text-indent }`: la de
   `base.css` puede bajar a `.tesis .grito > p`. La fila va en tipografía (Presidencia en pequeño, Campoamor en cursiva de
   cita, cada una con su asiento) y las cuatro cajas, con filete discontinuo y el nombre en mono. Raíz y 404 rehechos
   (A.7 y A.8 de comun-inicio): la raíz no enseña nada «sin traducir» y el 404 pinta el bloque inglés solo cuando exista
   `en.json`.

## B · Exportador (`base.py` y dueños de `metodo.py`, `datos.py`, `sesiones.py`)

1. **`cortes.py` da estas cifras; no las repitan** (el exportador fallaría con «la cifra X la dan cortes y …»):
   `etapa.<E>.meses.con_sesion|sin_sesion`, `etapa.<E>.num.desde|hasta`, `etapa.<E>.filas_v3` (el `.md` decía
   «base.py (etapas)», pero `base.py` no las escribía); `fila.luz.*`, `fila.presidencia.id.V2|id.v3|nwords`,
   `fila.campoamor.id.V2|id.v3|nwords` (Inicio; también las declaran `metodo.md`, `datos.md` y `versiones.md`: sus
   `fila.*.orden.*` sí son suyas); `fila.mexico_caratula.v3`; `puerta.mexico-1945.filas|sesiones`; `f01.*` y `f16.*`.
2. **`cortes.py` llama a `modulos/fichas.py` (grupo 2) si existe** y suma sus cifras; una clave que den los dos con el
   mismo valor se toma una vez.
3. **Volcado provisional (00:10).** Mientras la exportación completa fallaba por un módulo a medias, fundí en `src/data/`
   solo lo del grupo 1 desde una preparación `--solo cortes`. A las 00:34 `python3 exportador/exportar.py` pasó entero
   (1.492 marcadores comprobados, 0 pendientes) y lo reescribió todo: no queda nada provisional.

## C · Grupo 2 (fichas)

1. Interfaz: `<FigCalendario lang={lang} escala="etapa" etapa="I" />` (id de la figura: `calendario-etapa`). Trae las
   bandas F16, la conmutación palabras · diputados, el resalte de un tramo (clic o Intro), la ficha breve de una sesión y
   [Ver el calendario completo] → `/{lang}/cortes/#calendario`.
2. **Sin tabla por sesión en F01e**: el plan fija para las fichas «una tabla por etapa, no por sesión» (§ Cómo se evita
   el amontonamiento, 6); la pestaña Tabla trae los meses de la etapa y las dos listas de F16, y las sesiones van en
   `sesiones.csv`. Aun así, F01e de la etapa I pesa unos 134 KB (405 barras) y la ficha de 1931 pesa 278 KB: el tope de
   las fichas es 200 KB. El resto de la página suma unos 144 KB.

## D · Grupo 3 (Sesiones)

1. Inicio usa `<FigVotaciones lang={lang} variante="ligera" rotulos="inicio.f26.v." sufijo="-inicio" />`: el sufijo evita
   que el ancla `votaciones` choque con el id de la sección de Inicio.
2. Los anillos de F01 enlazan `cortes/sesiones/<slug>`; las doce sesiones de las ocho puertas están en
   `cortes.py › PUERTAS` (comprobadas contra `sesiones.json`). Si `puertas.json` publica sus sesiones, las leeré de ahí.

## E · Del investigador

1. **D-27 (resalte de la portada).** El contrato adopta la opción recomendada, (a) estática; `Hemiciclo.astro` (andamiaje)
   lleva la (b), los cuatro radios, porque así lo fija `DESIGN.md`. El dibujo no cambia. Decídalo en la vista previa.
2. **D-19.** `sesiones.csv` va sin las columnas de metadatos del proyecto. `presidencia_gobierno.csv` (F16) publica los
   tramos de presidente titular y Gobierno, lo mismo que enseñan las bandas y su tabla, no la ficha de cada sesión.

## F · Copy cambiado en esta fase (grupo 1)

- `cortes.md`: el antetítulo en mayúsculas («LAS CORTES») pasa a asiento con su base (`V2 · {{sesiones}} sesiones ·
  14-VII-1931 → 9-XI-1945`); fuera los antetítulos de género de las secciones (DESIGN.md, regla del asiento). Las notas de
  F01 y F16 se parten en tres líneas (qué · cifras · base). Nuevas: `fig.F01.salvedad`, `.leame.*`, `.cabecera`,
  `.leyenda.altura|altura_dip|barra|salto`, `.nota.base|base_vacio`, `.breve.mes`, `fig.F01e.pregunta`,
  `fig.F16.nota.base|verificar`, `fig.F16.leyenda.verificar|bandas`, `fig.F16.leame.*`, `cortes.etapa.registro|recuento`.
- `inicio.md`: tres anotaciones editoriales de F01c (`inicio.f01c.anota.I|II|IV`), con sus marcadores declarados.
