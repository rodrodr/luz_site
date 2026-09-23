# Integración final · fase 2 (23-09-2026, 01:10)

Estado de cada puerta y de cada página del sitio en español después de integrar el trabajo de los seis dueños. Qué se
resolvió de sus peticiones, qué se tocó en archivos ajenos y qué queda abierto: `docs/peticiones/integrador.md`.

**En una línea:** todas las puertas están en verde salvo `peso.spec`, que falla en tres páginas (`/es/explorador/`,
`/es/cortes/1931/` y `/es/cortes/1933/`). Arreglarlas pide quitar función, así que decide el dueño o el investigador.
Las opciones están en `peticiones/integrador.md` § 2.1.

## Puertas

| puerta | orden | resultado |
|---|---|---|
| Exportador, modo estricto | `python3 exportador/exportar.py --estricto` | ✓ 1.492 marcadores declarados y comprobados contra su cifra, ninguno sin cifra; 26 archivos vueltos a volcar; 43 s. Dos avisos conocidos: `dv.thqcmi.cita` no se compara (es un texto) y el control de vicepresidencias (586/10.025/584 frente a 584/10.009 del plan; el copy usa el marcador) |
| Copy → diccionarios | `npm run i18n` | ✓ es: 2.432 claves de 24 archivos. Todavía no hay `docs/copy_en/` (el inglés es la fase siguiente) |
| check-i18n (español) | `node scripts/check-i18n.mjs` | ✓ Mismas claves y marcadores, ningún número tecleado ni palabra vetada. Un aviso de tono: `cortes.1933.contexto.3.d` («revolucionaria»). Con `--strict` falla solo porque falta `en.json` |
| Formatos | `npm run formatos` | ✓ 48 casos, carácter a carácter |
| Tipos | `npx astro check` | ✓ 0 errores y 0 avisos (5 sugerencias). Antes había 11 errores, que se corrigieron: `peticiones/integrador.md` § 1 |
| Compilación | `npm run build` | ✓ 48 páginas. Al terminar, `compacta-cid` quita 686 KB del sitio |
| Auditoría de cifras | `node scripts/audit-cifras.mjs` | ✓ 48 páginas, 8.217 cifras con procedencia. Toda cifra lleva su base, hay NotaBases donde hay v3, no queda nada del prototipo ni ningún recurso de terceros, y no hay avisos. Con `STRICT=1` falla solo por los 8 pendientes del investigador (D-3, D-4, D-18, D-19, D-20, D-21, D-22, D-25) |
| Pruebas de navegador | `npx playwright test` (Chrome del equipo) | ✗ 242 pasan y 3 fallan, todas de `peso` (tabla de páginas). Pasan `humo` (360 y 375 px, dos temas, las dos lenguas, raíz, catálogo y 404), `sinjs`, `solapes` (1.100 y 1.440 px), `guardas`, `nota` (WCAG 1.4.13, teclado, táctil, pestañas ↔ hash) y `movimiento` |
| Capturas | Playwright en Python, `reduced_motion=reduce` | ✓ 96 capturas (24 páginas × 1.440 y 375 px × claro y oscuro): todas responden 200, ninguna desborda en horizontal y ninguna da errores de consola |

No corrieron:
- **axe-core:** solo carga desde un CDN, y la política del sitio veta los recursos de terceros.
- **La matriz de tres motores de la skill maestra:** el Firefox de Playwright no arranca en este equipo, y reinstalarlo es una descarga.

La puerta queda **incompleta** en esos dos puntos, no aprobada.

## Páginas

KB: el HTML sin comprimir, que es lo que mide `peso.spec`. Topes del plan: § Cómo se evita el amontonamiento, regla 6.

«Revisada a ojo» quiere decir que se miraron las cuatro capturas enteras en una hoja de contactos. El resto se
comprobó con las pruebas automáticas y un vistazo a sus miniaturas.

| página | KB | tope | peso | capturas (`capturas/`) | estado |
|---|---|---|---|---|---|
| `/` (raíz) | 56 | — | — | `raiz_*` | ✓ selector de lengua de una pantalla |
| `/es/` | 150 | 300 | ✓ | `es_*` | ✓ revisada a ojo. La auditoría ya no exige NotaBases por los tres ids v3 de la fila (↺ 4) |
| `/es/cortes/` | 230 | 250 | ✓ | `es_cortes_*` | ✓ |
| `/es/cortes/1931/` | 255 | 200 | ✗ | `es_cortes_1931_*` | ✗ peso. F01e (405 barras) ocupa ~130 KB y F09 ~46 KB. Revisada a ojo, sin defectos de maquetación. F05 ya no repite el título de su sección |
| `/es/cortes/1933/` | 230 | 200 | ✗ | `es_cortes_1933_*` | ✗ peso. F01e ocupa ~100 KB y F09 ~55 KB |
| `/es/cortes/1936/` | 160 | 200 | ✓ | `es_cortes_1936_*` | ✓ |
| `/es/cortes/guerra/` | 148 | 200 | ✓ | `es_cortes_guerra_*` | ✓ |
| `/es/cortes/mexico/` | 133 | 200 | ✓ | `es_cortes_mexico_*` | ✓ revisada a ojo. A 375 px, F01e deja la fila de 1945 casi vacía (fichas 1.5, abierto) |
| `/es/cortes/sesiones/` | 58 | 200 | ✓ | `es_cortes_sesiones_*` | ✓ |
| `/es/cortes/sesiones/sufragio-1931/` | 135 | 150 | ✓ | `…_sufragio-1931_*` | ✓ |
| `/es/cortes/sesiones/cuestion-religiosa-1931/` | 128 | 150 | ✓ | `…_cuestion-religiosa-1931_*` | ✓ |
| `/es/cortes/sesiones/estatuto-1932/` | 51 | 150 | ✓ | `…_estatuto-1932_*` | ✓ revisada a ojo. En la V2, F30 pone el discurso de Azaña bajo la línea (Presidencia) |
| `/es/cortes/sesiones/casas-viejas-1933/` | 76 | 150 | ✓ | `…_casas-viejas-1933_*` | ✓ |
| `/es/cortes/sesiones/pistola-1934/` | 95 | 150 | ✓ | `…_pistola-1934_*` | ✓ |
| `/es/cortes/sesiones/antesala-1936/` | 112 | 150 | ✓ | `…_antesala-1936_*` | ✓ F30 hace la pregunta en plural (`fig.F30.pregunta.varias`) |
| `/es/cortes/sesiones/figueres-1939/` | 46 | 150 | ✓ | `…_figueres-1939_*` | ✓ |
| `/es/cortes/sesiones/mexico-1945/` | 94 | 150 | ✓ | `…_mexico-1945_*` | ✓ pregunta en plural |
| `/es/diario/` | 111 | 200 | ✓ | `es_diario_*` | ✓ revisada a ojo. El facsímil se ve bien en los dos temas |
| `/es/metodo/` | 186 | 200 | ✓ | `es_metodo_*` | ✓ revisada a ojo. Bajó de 239 KB. La cabecera pegajosa de F20 es la de una tabla |
| `/es/datos/` | 125 | 200 | ✓ | `es_datos_*` | ✓ |
| `/es/datos/versiones/` | 109 | 200 | ✓ | `es_datos_versiones_*` | ✓ La auditoría ya no avisa por «F18» |
| `/es/explorador/` | 356 | 200 | ✗ | `es_explorador_*` | ✗ peso. F17 ocupa ~250 KB: 31 fichas con sus listas de sesiones y oradores, y 245 espigas. Revisada a ojo, sin defectos de maquetación |
| `/es/afinidades/` | 98 | 250 | ✓ | `es_afinidades_*` | ✓ revisada a ojo. **Corregido en esta ronda:** en tema claro, el póster de F21 se salía del lienzo y tapaba la leyenda (a 375 px, y a cualquier ancho antes de cargar la red) |
| `404` | 12 | — | — | `404_*` | ✓ Solo el bloque español, porque todavía no hay `en.json` |

## Qué cambió en la integración (resumen)

- **Andamiaje:**
  - `FiguraMarco` tiene props nuevas: `titulo`, `pregunta`, `teclado` y `salvedad`. Además pone pestañas cuando la figura trae su ranura `datos`, y exime el código de figura de la auditoría.
  - Otros arreglos: la × de la nota se ocultaba mal; el sello anclado en el copy no tenía estilo global; el rótulo del índice lateral no iba en su `<span>`; `animation-timeline` en regla aparte (el minificador rompía `.entra` en todo el sitio); rótulos de años sin corte (`.nw`).
  - **Auditoría:** nueva regla de ids v3 con ↺ 4.
  - **Pruebas:** el 404 exige el bloque inglés solo cuando haya inglés; la cabecera de figura pegajosa ya no cuenta como solape.
  - **Compilación:** `scripts/compacta-cid.mjs`, enganchado en `astro.config.mjs`.
- **Exportador:** `ctx.dadas` y `ctx.escribir_texto()` como API oficial. Los cuatro módulos que miraban la pila la usan.
- **Figuras de los dueños**, solo para resolver choques o poner una puerta en verde:
  - F19 y F34: se quitan sus reglas locales de teclado.
  - F26 en Inicio: título propio.
  - F30: pregunta en plural y sin CSV.
  - F18: código exento.
  - F10/F11: procedencia en el contenedor, por el peso.
  - F21: póster apilado.
  - F27/F28 y F01: tipos corregidos.
  - Cuatro guiones pasan a módulos (`export {};`).
- **Copy:** `fig.F05.titulo` pasa a «Los diez que más hablaron», el rótulo que ya usaba el índice.

## Notas de método

- **Capturas altas:** Chrome repite la página desde arriba cuando una captura pasa de 16.384 px (salía el principio de la ficha después del pie). Las páginas más altas se capturan por tramos de 8.000 px y se cosen. Todas las capturas de la tabla están hechas así.
- **Capturas de los dueños:** las de fases anteriores siguen en la misma carpeta (`g1_*`, `g2_*`, `copy_*`, `afinidades-*`, `explorador-*`, `componentes_*`). Las de esta integración empiezan por `es_`, `raiz_` y `404_`.
- **Movimiento:** las capturas se hicieron con `reduced_motion=reduce`, así que muestran el estado final. `movimiento.spec` comprueba el caso contrario.
- **Error de Sigma:** una captura con recorrido rápido dio «Container has no width» en F21 a 1.440 px. No se repite si se desplaza como un lector ni esperando 2 s antes de capturar. Es un efecto de la captura a página entera, no del sitio.
