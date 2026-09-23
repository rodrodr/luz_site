# copy_en · Instrucciones para quien traduce

Esta carpeta recibe el copy inglés del sitio (Puerta 3). Está vacía a propósito: solo tiene esta guía, que
`scripts/copy2i18n.py` no lee. Mientras no haya aquí un archivo de copy, `/en/` sigue pintando el español marcado
(`data-sin-traducir`, `noindex`, fuera del sitemap).

## Antes de empezar

1. Lea **`docs/03a_GLOSARIO_es-en.md`**. Es vinculante: inglés británico (`en-GB`), una redacción por término, las
   frases fijas ↺ y los rótulos ya están escritos allí. Si un contexto no encaja, anótelo en
   `docs/peticiones/glosario.md` y espere la decisión; no invente un sinónimo.
2. El español está **congelado** (`CHANGELOG.md`, huella de `src/i18n/es.json`). No toque `docs/copy_es/`.
3. La versión de lectura del español, entera y en orden, está en `docs/lectura/es.md`.

## Cómo se trabaja

- **Un archivo inglés por cada archivo español, con el mismo nombre**: `docs/copy_es/inicio.md` →
  `docs/copy_en/inicio.md`. Empiece por `comun.md` (frases fijas, rótulos, etapas, glosario de interfaz).
- **Copie el archivo español y traduzca encima.** Conserve, sin cambiar una letra:
  - cada clave `<!-- clave -->` y su orden; no añada ni quite claves (`check-i18n` falla si sobra o falta una);
  - cada repetición `<!-- ↺ clave -->`: su texto debe ser idéntico al de la definición inglesa en `comun.md`;
  - cada marcador `{{clave|formato}}` y cada variable `{{n}}`, `{{fecha}}`…: las cifras las pone el sitio, con formato
    inglés; **no teclee ninguna cifra del corpus**;
  - los corchetes de rótulo `[…]` (el destino lo pone el componente) y la flecha ↗;
  - el formato Markdown: encabezados, reglas `---`, rótulos en negrita de línea entera.
- **Notas de diseño** (`> [nota de diseño] …` y las que empiezan por `>`): no son texto para el lector. Déjelas en
  español o bórrelas; no se traducen ni se publican.
- **Citas del Diario: NO se traducen en el texto.** La clave de la cita conserva el español letra a letra (el sitio la
  comprueba contra `citas.json`). La traducción irá en una clave hermana `<clave>.trad`, al pie y marcada
  «(our translation)»; **no la escriba todavía**: el mecanismo está pedido (`docs/peticiones/glosario.md`). Anote sus
  traducciones aparte, en `docs/copy_en/_trad_pendientes.txt`, con la clave de cada cita.
- Lo que el explorador muestra (botones, diálogos, nombres de biblioteca, consultas) se cita en español entre «»: la
  herramienta está solo en español.
- Los nombres propios (partidos, bibliotecas, Afinidades Elegidas, Luz y Taquígrafos) siguen el glosario, § 2 y § 5.

## Reglas de siempre, también en inglés

- Toda cifra con su marcador, su base y su fuente; nada del prototipo de 1931.
- No prometa lo que el explorador no hace (vetos en inglés: glosario § 7 y `scripts/vetos.mjs`).
- Tono académico claro: sin *innovative*, *unique*, *coming soon*, *groundbreaking*.
- Los textos cortos (rótulos, pestañas, leyendas) no deben superar en mucho la longitud del español: a 360 px nada
  puede desbordar.

## Cómo se comprueba

```sh
python3 scripts/copy2i18n.py en --check   # claves, marcadores y ↺ del inglés
python3 scripts/copy2i18n.py en           # escribe src/i18n/en.json
node scripts/check-i18n.mjs               # mismas claves y marcadores que es.json, vetos
node scripts/check-i18n.mjs --strict      # lo que exige la publicación
npm run build && npx playwright test      # con STRICT=1 se activan las pruebas del inglés
```

Después: retrotraducción de una muestra (Inicio, una ficha, una puerta, Método y Datos) y auditoría de `/en/` a 375
y 1.440 px, en los dos temas.
