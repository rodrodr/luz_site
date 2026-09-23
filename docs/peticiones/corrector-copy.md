# Peticiones del corrector del copy (fase 2, 22-09-2026)

Dueño que pide: el corrector del copy (`docs/copy_es/*.md`, `docs/marcadores/*.md`). Cada punto dice a quién va, qué
se pide y por qué. Lo que ya está hecho en el copy se dice al lado.

## A · Andamiaje y exportador: formato de peso en unidad decimal (REVISION_FASE1 P1-4, plan D-26 (a))

**Urgente: el copy ya lo usa.** D-26 (a), la regla de la crítica que rige mientras el investigador decide, pide «unos
112 MB comprimidos» para la descarga del explorador, **en unidad decimal**. La cifra no cambia
(`explorador.gz.bytes` = 111.733.652 B); cambia el formato del marcador.

Se pide un formato nuevo, **`peso_dec0`** (y, si se quiere, la familia `peso_dec<N>` con N decimales):
bytes / 1.000.000, rotulado «MB» (KB por debajo de 1 MB decimal, GB desde 1.000 MB), con el separador de cada lengua.

| dónde | qué |
|---|---|
| `scripts/copy2i18n.py › FORMATOS` | añadir `peso_dec0` (hoy el copy fallaría con «formato desconocido») |
| `src/lib/formato.ts › formatea` | `if (/^peso_dec[0-2]$/.test(fmt)) return pesoDecimal(Number(v), lang, Number(fmt.slice(8)))` |
| `exportador/formatos.py › formatear` y `coincide` | la misma función; en `coincide`, con `fmt` `peso_dec*` la unidad «MB» de la celda se lee como 10⁶ |
| `exportador/formatos.py › PRUEBAS` → `src/data/formatos.json › pruebas` | `({"v": 111733652, "t": "peso"}, "peso_dec0")` → «112 MB» · en: «112 MB» |

Copy que lo usa: `inicio.empezar.sin_programar`, `datos.empezar.s2.peso`, `explorador.empezar.paso2`
(«unos {{explorador.gz.bytes|peso_dec0}} comprimidos»). El valor esperado en `docs/marcadores/{inicio,comun,datos,
explorador,base}.md` va en bytes crudos (111733652), que `coincide()` compara sin unidad.

Mientras el formato no exista, el copy lleva el marcador con `|peso_dec0` solo si `copy2i18n.py` lo admite; si no, el
corrector deja `|peso0` y este punto sigue abierto (véase el informe final de este archivo).

## B · Andamiaje: frase fija ↺ 10 (REVISION_FASE1 P2-4)

`scripts/copy2i18n.py › FIJAS` compara las trece frases del plan letra a letra. ↺ 10 cambia porque la antigua
generalizaba: en CGOCUS V1.1, `representative_metadata` (censo: 475 / 470 / 501) y `2REP_coauthor_edgelist`
(relaciones: 30.345 / 27.172 / 5.990 filas) dicen «1933-1936», pero **`2REP_cosponsorship` dice «1933-1935»**
(6.528 filas). Medido hoy sobre las copias locales cuyo MD5 comprueba el exportador.

Sustituir en `FIJAS`:

- antes: «Afinidades Elegidas llama 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.»
- ahora: «El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.»

Sin el cambio, `copy2i18n.py` avisa (y con `--strict` falla) de que falta la frase antigua.

## Estado de A y B (22-09-2026, 23:55)

- **A** hecho por el integrador: `peso_dec*` ya está en `copy2i18n.py › FORMATOS` y en `src/lib/formato.ts`. El copy
  imprime «unos {{explorador.gz.bytes|peso_dec0}} comprimidos» en Inicio, Datos y Explorador; `comprobar_comun_inicio.py`
  controla ya «112 MB» (94 de 94).
- **B** hecho: `copy2i18n.py › FIJAS` lleva la redacción nueva de ↺ 10; `copy2i18n.py es --check --strict` pasa.

## C · Exportador: marcadores nuevos del copy (fase 2)

Declarados en `docs/marcadores/` con su valor recalculado hoy sobre la V2 (MD5 `360332a0…`) y la v3 (sha256
`3a0d8b2d…`); los guiones de comprobación los calculan y pasan. Falta que los escriba su módulo:

| módulo | claves | valor |
|---|---|---|
| `sesiones.py` | `puerta.estatuto-1932.umbral` | 17000 = ⌊min(17.152, 17.142) / 1.000⌋ × 1.000 («más de 17.000», P2-1) |
| `sesiones.py` | `ses.s48.cola.pantalla.desde` · `.hasta` | 411 · 415 (`ord` + 1 de v3 6460 y 6464; Método los usa, P1-3) |
| `sesiones.py` | `puerta.figueres-1939.lista.V2` · `.v3` | 107340 · 121463 (la lista nominal de Figueres existe) |
| `base.py` (etapas) | `etapa.<I…V>.listas_nominales.filas` · `.sesiones` | 532/206 · 408/165 · 81/32 · 2/2 · 0 (suman 1.023 y 405) |
| `cortes.py` | `fila.guerra.monserrat_fecha.V2` · `.v3` | 107248 · 121345, fragmento «Monserrat, 1 de Febrero de 1938» (plan H1) |

Las claves `sesion.1931-10-01-48.cola*` ya no existen: Método usa `ses.s48.cola*` (los siete avisos del exportador
desaparecen; `exportar.py --comprobar` pasa).

## D · Exportador: aserto de citas (REVISION_FASE1 P3-8 y P3-10, sin cambio en el copy)

- Normalizar " → “ ” al comparar, no en el copy (`fig.F27.cita.8`, `sesiones.antesala-1936.diario.cita.calvo`,
  `sesiones.casas-viejas-1933.diario.cita.martinezbarrio`).
- Buscar también en `speaker`: «acogido con una gran ovación» (`cortes.1931.contexto.1.d`) está en la etiqueta de
  V2 10 · v3 18, no en `speech`. Anotado en `docs/marcadores/cortes_1931.md`.
- Las citas pueden ser un tramo del fragmento de `citas.md`: la de Giral (`sesiones.mexico-1945.diario.cita.giral`)
  acaba ahora en «…cruzar la frontera…» para no pasar de 30 palabras.

## E · Plantillas (dueños de página; ningún cambio genérico)

- **Sesiones** (`cortes/sesiones/index.astro`): `sesiones.votos.etapas.entrada`, `sesiones.votos.etapas` (lista) y
  `sesiones.votos.etapas.salvedad` son el registro de todas las listas por etapa (narrativa §9.3, plan R1). `Seccion`
  ya los pinta tras `sesiones.votos.seleccion`; si la plantilla quiere otro sitio, que sea antes de F26.
- **Fichas** (`cortes/[etapa].astro`): `cortes.<etapa>.debates.lista` es ahora una lista `- ` (13, 7 y 4 debates);
  `tBloques` la pinta como `<ul>` (comprobado en la compilación: 13 · 7 · 4 `li` en `#debates`).
- **Versiones**: sus claves no se han tocado (P1-5 lo resuelve el dueño de la plantilla); solo «Presidente de la
  Cámara» con mayúscula (P3-3).

## F · Del investigador (no los resuelve el copy)

El contacto de [Escribirnos] (P2-12) · D-20 · D-22 · D-25 (Ventosa: el copy dice «Juan Ventosa Calvell», `rep_id`
993, Lliga, que es el quinto orador de F05 en 1936) · si quiere levantar el veto de «más de 17.000».
