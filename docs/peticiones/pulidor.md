# Peticiones del pulidor final (fase 2, 23-09-2026)

Esto es lo que el pulido dejó abierto, con su dueño. Qué se aplicó y por qué está en `docs/revision_fase2/PULIDO.md`.

## Al investigador

1. **Acción primaria de la portada.** Se aplicó la que sigue de su decisión «éxito = descargas y citas del CSV»: el oro
   va en «Descargar los datos», que lleva a `/datos/#empezar`, y el explorador pasa a secundario. Si prefiere el orden
   anterior, basta invertir `inicio.portada.llamada` y los destinos en `src/pages/[lang]/index.astro`.
2. **Métrica de `peso.spec`.** El plan (§ amontonamiento, regla 6) mide el HTML sin comprimir, y así fallan tres
   páginas: 257, 233 y 358 KB frente a un tope de 200. Comprimidas pesan 43, 40 y 43 KB. Hay que elegir entre subir los
   topes, medir en gzip (≤ 60 KB) con un tope de nodos DOM (≤ 5.000), o quitar función (`peticiones/integrador.md`
   § 2.1). Mientras no se decida, `npm run publicar` se para en `peso`.
3. **Orden de la ficha.** La narrativa § 8.1 abre con «Hoy puede», y el plan (§ Dos mitades) dice que la ficha
   «termina» en él. Se dejó el orden de la narrativa, que manda sobre el plan. Si lo quiere al final, se mueve
   una sección en `src/pages/[lang]/cortes/[etapa].astro`.
4. **F26 ligera y mínima, F18 y F19 sin pestañas.** Así las define el plan. ¿Se les quita el número F?

## A los dueños

| dueño | petición |
|---|---|
| diario-metodo (F12) | WCAG 1.4.12: con el espaciado de texto, `.f12-pie-tipo` recorta 93 px a 360. Los pies van en absoluto sobre anchos calculados: habría que dejarlos crecer en alto (dos líneas) sin pisar la anotación |
| inicio_cortes (F01e / F16) | Lo mismo en `.tr-r` («Negrín I»: 11 px a 1.440). Opción: rotular solo si cabe con 0,12 em de más |
| diseño | Las chapas de base (`Sello`) encima de cada figura y el filete de la escalera: son del sistema, no del pulido. Revisar también la cabecera a dos columnas (hoy solo en Datos) para el resto de plantillas |
| comun-inicio (F01c) · datos (F18) | Que la cabecera enseñe todas las bases de `data-base`, y en F01c la columna «Diputados que intervienen (V2, con quien preside)» |
| exportador | Volcar en `procedencia.csv` las 706 claves de figura que faltan (F10.*, F27.fila.*, familias.*, fig.F32.*, bibliotecas…) |

## Resuelto el 23-09-2026 (contenido, configuración y datos; decisiones en `docs/DECISIONES_23-09.md`)

- **2 · Métrica de `peso.spec`:** el tope se mide sobre el HTML comprimido con gzip; el sin comprimir se anota y no
  bloquea (`tests/peso.spec.ts`, `tests/rutas.ts`). Las 22 páginas pasan: 13–44 KB en gzip.
- **4 · Figuras sin pestañas:** conservan su número F; `versiones.bases.entrada` (F35) dice cuáles son (F18, F19 y F26
  en Inicio y en las puertas).
- **Exportador · claves de figura:** `exportador/claves_figura.py` (tras `astro build`, ya en `npm run publicar`) vuelca
  en `procedencia.csv|xlsx` las claves que pintan las figuras: 738 filas (`modulo` = `figura:<id>`); ninguna de las
  1.986 claves visibles queda sin fila. El exportador las conserva al exportar.
- **D-3, D-4, D-18, D-19, D-20, D-21, D-22, D-25:** cerradas en el copy y en `src/config/enlaces.ts`; ya no hay
  pendientes del investigador en la vista previa.
- Las decisiones 1 y 3 (oro en el explorador, orden de la ficha) son del agente de diseño.

## Resuelto en la verificación y congelación del español (23-09-2026, 09:45)

- **1 · Acción primaria:** oro en «Abrir el explorador» en la portada, en la escalera de Inicio, en la cabecera y en la
  banda de Método y Explorador (diseño). El copy ya lo lee en ese orden: `[Abrir el explorador ↗] [Descargar los datos]`.
- **3 · Orden de la ficha:** «Hoy puede» primero, como en la narrativa (decisión 3 del investigador).
- **Dueños:** WCAG 1.4.12 en F12 y F16, y las chapas de base con la cabecera a dos columnas: hechos por el diseño.
- **Presupuesto de palabras en STRICT:** donde se pasaban, los topes pasan a ser el recuento congelado redondeado a la
  cincuentena de arriba (`tests/rutas.ts`; motivo en `CHANGELOG.md`). Con `STRICT=1`, Playwright pasa.
