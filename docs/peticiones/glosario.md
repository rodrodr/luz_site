# Peticiones del glosario ES → EN (23-09-2026)

Salen de `docs/03a_GLOSARIO_es-en.md`. Ninguna bloquea escribir el copy inglés; las dos primeras bloquean publicarlo.

## Al andamiaje (i18n y componentes)

1. **Traducción de las citas del Diario al pie, «(our translation)».** Hoy no hay dónde ponerla: `check-i18n.mjs`
   (líneas 79-83) da error si `en.json` tiene una clave que no está en `es.json`, y el español está congelado.
   Propuesta: admitir en inglés las claves `<clave de cita>.trad` (solo si existe la clave base y esta es una cita
   que pinta `CitaDiario`/`Pasaje`), y que `CitaDiario.astro` y `puerta/Pasaje.astro` las pinten bajo el asiento como
   `<p class="trad" lang="en">‘…’ (our translation)</p>`. La marca «(our translation)» la pone el componente, no el
   copy, para que sea una sola redacción. En español la clave no existe y no se pinta nada.
2. **`lang="es"` en lo español dentro de `/en/` (WCAG 3.1.2).** La cita (`blockquote`, la línea de la Presidencia),
   las cadenas del explorador y los nombres de biblioteca deben llevar `lang="es"` cuando la página es inglesa; hoy
   `CitaDiario` no lo pone. En `/es/` no cambia nada.
3. **Frases fijas inglesas en `copy2i18n.py`.** La comprobación letra a letra de las trece (`FIJAS`) solo corre en
   español. Conviene una lista `FIJAS_EN` con las redacciones del glosario § 6, con el mismo aviso/error en `--strict`.

## Hecho en esta ronda

- `scripts/copy2i18n.py` ignora `LEEME.md` y trata una carpeta sin copy como inexistente: `docs/copy_en/` con solo la
  guía no escribe un `en.json` vacío.

## Decisiones del glosario que el director puede revisar

- *session* (no *sitting*), *reading gateway* para «puerta de lectura», *bracketed note* para «acotación» (evita el
  choque con *stage* = etapa), *number* para «cifra» (nunca *figure*), *Source* para el rótulo «Base», *legislature*
  sin *term*.
