/* ===== src/worker/transformar.js ===== */
/* 2REP_Standalone · worker/transformar.js
 *
 * Transformaciones de tools/build_corpus.py (stage_db, fold, norm_value, split_words) con la semántica de
 * Python 3.12: str.strip/str.isspace, int(), str.isdigit. Funciones puras, sin SQLite.
 *
 * Tablas Unicode de Python 3.12.7 (unicodedata 15.0.0), generadas con:
 *   [cp for cp in range(0x110000) if chr(cp).isspace()]             → esEspacio
 *   bloques de chr(cp).isdecimal() (todos de 10, dígitos 0–9)       → INICIOS_DECIMALES
 *   chr(cp).isdigit() and not chr(cp).isdecimal()                    → RANGOS_DIGITOS_NO_DECIMALES
 *   category(chr(cp)) != 'Cn' y == 'Mn' (tools/make_casos_transformar.py) → TRAMOS_FOLD
 * fold() no depende de la versión Unicode del motor en los caracteres que Unicode 15.0 no tenía: los deja tal
 * cual, como Python, y quita las marcas Mn según la tabla de la 15.0 (no según \p{Mn} del motor). Del motor solo
 * usa normalize('NFD') y toLowerCase() sobre caracteres ya asignados en la 15.0, cuyas descomposiciones y clases
 * combinantes son estables por la política de estabilidad de Unicode. Comprobado en los 1.112.064 puntos de
 * código y en cadenas mezcladas (test/node/transformar.test.mjs). Requiere un motor con Unicode ≥ 15.0.
 */
(function (R2) {
  'use strict';

  const SIN_IDENTIFICAR = 'Sin identificar';

  /** Columnas del CSV, en orden (cabecera exacta). */
  const COLUMNAS_CSV = Object.freeze(['id', 'num_session', 'order', 'date', 'speaker', 'speech', 'rep_id',
    'rep_name', 'district', 'party', 'party_family', 'ideology', 'nwords', 'legislature']);

  /** Columnas de la tabla speeches, en orden (las 19 de SCHEMA). */
  const COLUMNAS_BD = Object.freeze(['id', 'num_session', 'ord', 'date', 'year', 'legislature', 'speaker',
    'speaker_fold', 'rep_id', 'rep_name', 'rep_name_fold', 'district', 'party', 'party_family_raw',
    'party_family', 'ideology_raw', 'ideology', 'nwords', 'speech']);

  /** str.isspace() de Python para un punto de código (todos los espacios están en el BMP). */
  function esEspacio(cp) {
    return (cp >= 0x09 && cp <= 0x0d) || (cp >= 0x1c && cp <= 0x20) || cp === 0x85 || cp === 0xa0 ||
      cp === 0x1680 || (cp >= 0x2000 && cp <= 0x200a) || cp === 0x2028 || cp === 0x2029 ||
      cp === 0x202f || cp === 0x205f || cp === 0x3000;
  }

  /** str.strip() de Python (no String.prototype.trim, que usa otro conjunto de espacios). */
  function pyStrip(s) {
    let a = 0, z = s.length;
    while (a < z && esEspacio(s.charCodeAt(a))) a++;
    while (z > a && esEspacio(s.charCodeAt(z - 1))) z--;
    return a === 0 && z === s.length ? s : s.slice(a, z);
  }

  // Tramos de Unicode 15.0 (Python 3.12.7) en formato compacto: diferencias sucesivas en base 36
  // (a0, b0-a0, a1-b0, b1-a1, …). Los genera tools/make_casos_transformar.py (casos.json → tramos_fold) y el test
  // exige que sean idénticos. `asignados`: categoría distinta de Cn (incluye sustitutos y uso privado).
  const TRAMOS_FOLD = Object.freeze({
    asignados: '0,on,3,5,5,6,2,0,2,j,2,b0,2,11,3,1d,3,2,2,1i,9,q,5,5,c,7h,2,1n,3,2s,f,1m,3,1c,3,e,2,r,3,0,2,a,6,u,2,1,7,6j,2,7,3,1,3,l,2,6,2,0,4,3,3,8,3,1,3,3,9,0,5,1,2,4,3,o,3,2,2,5,5,1,3,l,2,6,2,1,2,1,2,1,3,0,2,4,5,1,3,2,4,0,8,3,2,0,8,g,b,2,2,8,2,2,2,l,2,6,2,1,2,4,3,9,2,2,2,2,3,0,g,3,3,b,8,6,2,2,2,7,3,1,3,l,2,6,2,1,2,4,3,8,3,1,3,2,8,2,5,1,2,4,3,h,b,1,2,5,4,2,2,3,4,1,2,0,2,1,4,1,4,2,4,b,5,4,4,2,2,3,3,0,7,0,f,k,6,c,2,2,2,m,2,f,3,8,2,2,2,3,8,1,2,2,3,0,3,3,3,9,8,l,2,2,2,m,2,9,2,4,3,8,2,2,2,3,8,1,7,1,2,3,3,9,2,2,d,c,2,2,2,1e,2,2,2,5,5,f,3,p,2,2,2,h,4,n,2,8,2,0,3,6,4,0,5,5,2,0,2,7,7,9,3,2,d,1l,5,s,12,1,2,0,2,4,2,n,2,0,2,m,3,4,2,0,2,6,2,9,3,3,x,1z,2,z,5,12,2,z,2,e,2,c,12,5h,2,0,6,0,3,ag,2,3,3,6,2,0,2,3,3,14,2,3,3,w,2,3,3,6,2,0,2,3,3,e,2,1k,2,3,3,1u,3,v,4,p,7,2d,3,5,3,ik,4,2g,8,l,a,n,a,j,d,c,2,2,2,1,d,2l,3,9,7,9,7,p,7,2g,8,16,6,1x,b,u,2,b,5,b,5,0,4,15,3,4,c,17,5,p,7,a,4,1p,3,1s,2,s,3,a,7,9,7,d,3,u,1e,24,4,1a,2,37,9,1n,4,e,4,1n,8,16,3,a,9,16,6,et,3,5,3,11,3,5,3,7,2,0,2,0,2,0,2,u,3,1g,2,e,2,d,3,5,2,i,3,2,2,8,2,2s,2,b,3,q,2,c,4,w,g,w,g,3v,5,ie,q,a,m,1eb,3,v,2,9o,6,18,2,0,6,0,3,1j,8,1,f,n,a,6,2,6,2,6,2,6,2,6,2,6,2,6,2,6,2,3h,z,p,2,2g,d,5x,r,b,5,1r,2,2d,3,2u,6,16,2,2l,2,2b,d,1a,2,mlo,4,1i,a,9n,l,53,9,5m,6,1,2,0,2,4,p,1m,4,9,7,1j,9,1x,9,b,7,37,c,t,4,25,2,a,5,w,2,1i,a,d,3,9,3,2u,p,r,b,5,3,5,3,5,a,6,2,6,2,1n,5,3h,3,9,7,8mb,d,m,5,1c,5,6st,3,2x,13,6,d,4,6,p,2,4,2,0,2,1,2,1,2,3g,h,cc,3,1h,8,0,x,15,7,1e,2,i,2,3,5,4,2,3q,3,0,2,59,4,5,3,5,3,5,3,2,4,6,2,6,b,4,3,b,2,p,2,i,2,1,2,e,3,d,z,3e,6,2,5,18,4,2f,2,c,4,0,1c,19,3n,s,4,1c,g,r,5,z,a,t,6,16,6,t,2,10,5,d,17,4d,3,9,7,z,5,z,5,13,9,1f,c,b,2,e,2,6,2,1,2,a,2,e,2,6,2,1,1w,8m,a,l,b,7,p,5,2,15,2,8,1y,5,3,0,2,17,2,1,4,0,3,m,2,1z,9,8,1d,i,2,1,6,w,4,q,6,0,1t,1j,5,j,3,1d,2,1,6,7,2,2,2,s,3,2,5,9,8,8,8,1r,x,12,5,b,a,1h,4,s,3,q,6,p,8,3,d,6,29,20,1k,1e,e,1e,8,19,9,9,87,u,2,15,2,2,3,1,24,16,9,15,n,p,13,r,l,m,a,25,5,z,a,1v,b,0,3,o,8,9,7,1g,2,h,9,12,a,2n,2,j,c,h,2,1a,1r,6,2,0,2,3,2,e,2,a,7,1m,6,9,7,3,2,7,3,1,3,l,2,6,2,1,2,4,2,9,3,1,3,2,3,0,7,0,6,6,3,6,4,4,3w,2j,2,4,v,1z,9,9,4n,1h,3,11,z,1w,c,9,7,c,k,1l,7,9,1j,q,3,e,5,m,56,1n,2t,2a,d,7,3,0,3,7,2,1,2,t,2,1,3,b,a,9,1z,7,3,19,3,a,s,1z,9,2a,e,20,8,9,6v,8,2,18,2,d,b,s,4,v,3,l,2,d,22,6,2,1,2,17,4,0,2,1,2,8,9,9,7,5,2,1,2,10,2,1,2,5,8,9,8n,o,8,g,2,14,4,r,2f,0,g,1d,e,pm,2v,32,2,4,c,5f,219,2q,e,ut,33f,g6,6nu,fs,8,u,2,9,5,28,2,9,7,t,3,5,b,1x,b,9,2,6,2,k,6,i,j5,2i,2u,22,5,1k,8,g,1t,4,c,1,f,4qf,9,yd,17,8,6w8,3,2,6,2,1,2,82,g,0,u,2,3,0,f,3,9,az,1s5,2y,6,c,4,8,8,9,3,7,3ml,19,3,m,a,37,1p,6t,b,12,3,5d,m,1x,3f,j,d,j,d,2e,a,o,3s,2c,2,1y,2,1,3,0,3,1,3,3,2,b,2,0,2,6,2,1s,2,3,3,7,2,6,2,r,2,3,2,4,2,0,4,6,2,9f,3,83,3,jh,g,4,2,e,up,u,7,5,5y,6,2,g,3,6,2,1,2,4,6,1p,y,0,35,18,4,d,3,9,5,1,8x,u,i,1l,6,0,cx,15,kn,6,2,3,2,1,2,e,2,5g,3,f,16,23,5,9,5,1,lu,1v,25,1o,5f,3,2,q,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,g,6,2,2,4,2,g,1h,1,7j,17,5,2r,d,e,3,e,2,e,2,10,b,4t,1l,s,e,17,5,8,8,1,f,5,4b,rb,5,g,4,c,4,3a,5,2m,7,b,5,0,g,b,5,1j,9,9,7,13,9,t,3,1,27,9f,d,d,3,c,4,8,8,19,2,6,9,d,5,8,8,8,8,42,2,1i,12,9,sn,wyn,x,37d,7,65,3,4g1,f,5rk,2e8,f1,15v,3t6,6,38f,f976,0,v,2n,3l,6n,1e6p,1ekd,3,1ekd',
    mn: 'lc,33,7o,4,7e,18,2,0,2,1,2,1,2,0,21,a,1d,k,h,0,2u,6,3,5,3,1,2,3,10,0,v,q,2k,a,1n,8,a,0,p,3,2,8,2,2,2,4,18,2,1p,7,17,n,2,v,1k,0,2,0,5,7,5,0,4,6,b,1,u,0,1n,0,5,3,9,0,l,1,r,0,3,1,1m,0,5,1,5,1,3,2,4,0,v,1,4,0,c,1,1m,0,5,4,2,1,5,0,l,1,n,5,2,0,1n,0,3,0,2,3,9,0,8,1,c,1,v,0,1q,0,d,0,1f,0,4,0,1k,0,2,2,6,2,2,3,8,1,c,1,u,0,1n,0,3,0,7,0,6,1,l,1,t,1,1m,1,5,3,9,0,l,1,u,0,21,0,8,2,2,0,2j,0,3,6,d,7,2r,0,3,8,c,6,22,1,s,0,2,0,2,0,1k,d,2,4,2,1,6,a,2,z,a,0,2v,3,2,5,2,1,3,1,q,1,5,2,h,3,e,0,3,1,7,0,g,0,jk,2,qb,2,u,1,v,1,v,1,1t,1,2,6,9,0,3,a,a,0,1a,2,2,0,3a,1,z,0,3b,2,5,1,a,0,7,2,64,1,3,0,1n,0,2,6,2,0,2,0,3,7,7,9,3,0,1d,d,2,f,1e,3,1d,0,2,4,2,0,6,0,15,8,d,1,x,3,3,1,2,2,1l,0,2,1,4,0,2,2,1n,7,3,1,49,2,2,c,2,6,5,0,7,0,4,1,5j,1r,k1,c,5,0,4,b,2db,2,3y,0,2p,v,ff,3,30,1,n9x,0,5,9,x,1,29,1,7l,0,4,0,5,0,q,1,6,0,48,1,r,h,e,0,13,7,q,a,1b,2,1d,0,3,3,3,1,14,0,1w,5,3,1,3,1,d,0,9,0,1c,0,1g,0,2,2,3,1,6,1,2,0,17,1,9,0,6n,0,3,0,5,0,fn5,0,ki,f,h,f,r2,0,6b,0,46,4,1af,2,2,1,6,3,15,2,5,0,4m,1,fy,3,as,1,29,2,1z,a,1e,3,3g,0,1j,e,16,0,3,1,b,2,1e,3,3,1,8,0,1q,2,11,4,2,7,1r,0,d,1,1h,8,b,3,3,0,2o,2,3,0,2,1,7,0,3,0,4e,0,4,7,m,1,1m,1,4,0,12,6,4,4,5g,7,3,2,2,0,o,0,2d,5,2,0,5,1,2,1,6n,3,7,1,2,1,s,1,2e,7,3,0,2,1,2z,0,2,0,3,5,2,0,2u,2,3,3,2,4,78,8,2,1,75,1,2,0,5,0,41,3,3,1,5,0,x,9,15,5,3,3,9,0,a,5,3,2,1b,c,2,1,bb,6,2,5,2,0,2b,l,3,6,2,1,2,1,3f,5,4,0,2,1,2,6,2,0,21,1,4,0,2,0,9o,1,c,1,1h,4,6,0,2,0,45a,0,7,e,asb,4,1o,6,t5,0,1s,3,2a,0,f5l,1,3mq,19,3,m,f5,2,i,7,3,6,v,3,45,2,1j0,1i,5,1d,9,0,f,0,n,4,2,e,11t,6,2,g,3,6,2,1,2,4,2t,0,4h,6,ag,0,1q,3,e5,3,rl,6,32,6,gzhy,6n',
  });

  function decodificarTramos(texto) {
    const n = texto.split(',').map((x) => parseInt(x, 36));
    const t = new Int32Array(n.length);
    let v = 0;
    for (let i = 0; i < n.length; i++) { v += n[i]; t[i] = v; }
    return t;
  }
  const ASIGNADOS_15 = decodificarTramos(TRAMOS_FOLD.asignados);
  const MN_15 = decodificarTramos(TRAMOS_FOLD.mn);

  /** ¿Está cp en alguno de los tramos [t[2k], t[2k+1]]? */
  function enTramos(t, cp) {
    let lo = 0, hi = t.length / 2 - 1;
    if (cp < t[0] || cp > t[t.length - 1]) return false;
    while (lo < hi) { // último tramo que empieza en cp o antes
      const m = (lo + hi + 1) >> 1;
      if (t[2 * m] <= cp) lo = m; else hi = m - 1;
    }
    return cp <= t[2 * lo + 1];
  }

  /** NFD, sin marcas Mn de Unicode 15.0 y minúsculas, para un tramo sin caracteres sin asignar en la 15.0. */
  function plegarTramo(x) {
    if (x === '') return x;
    const d = x.normalize('NFD');
    let r = '', desde = 0;
    for (let i = 0; i < d.length;) {
      const cp = d.codePointAt(i), n = cp > 0xffff ? 2 : 1;
      if (cp >= 0x300 && enTramos(MN_15, cp)) { r += d.slice(desde, i); desde = i + n; }
      i += n;
    }
    return (desde === 0 ? d : r + d.slice(desde)).toLowerCase();
  }

  /**
   * fold() de build_corpus.py: NFD, sin marcas Mn, minúsculas y strip, en ese orden. Los caracteres sin asignar en
   * Unicode 15.0 se copian tal cual y parten la cadena en tramos. Es equivalente a hacerlo todo junto: para Python
   * son de clase combinante 0 (la reordenación NFD no los cruza), no son Mn, no tienen minúscula y no son «cased»
   * ni «case-ignorable» (la sigma final mira igual a través de ellos que a través de un fin de tramo).
   */
  function fold(s) {
    const t = s || '';
    let r = '', desde = 0;
    for (let i = 0; i < t.length;) {
      const cp = t.codePointAt(i), n = cp > 0xffff ? 2 : 1;
      if (cp >= 0x378 && !enTramos(ASIGNADOS_15, cp)) { // U+0378 es el primer punto sin asignar
        r += plegarTramo(t.slice(desde, i)) + t.slice(i, i + n);
        desde = i + n;
      }
      i += n;
    }
    return pyStrip(desde === 0 ? plegarTramo(t) : r + plegarTramo(t.slice(desde)));
  }

  // Pares [desde, hasta] de los tramos de dígitos decimales (Nd) de Python 3.12.7. Todos son series de 0–9
  // seguidas (U+1D7CE–1D7FF son cinco), así que el valor es (cp - desde) % 10.
  const RANGOS_DECIMALES = [0x30, 0x39, 0x660, 0x669, 0x6F0, 0x6F9, 0x7C0, 0x7C9, 0x966, 0x96F, 0x9E6, 0x9EF,
    0xA66, 0xA6F, 0xAE6, 0xAEF, 0xB66, 0xB6F, 0xBE6, 0xBEF, 0xC66, 0xC6F, 0xCE6, 0xCEF, 0xD66, 0xD6F, 0xDE6, 0xDEF,
    0xE50, 0xE59, 0xED0, 0xED9, 0xF20, 0xF29, 0x1040, 0x1049, 0x1090, 0x1099, 0x17E0, 0x17E9, 0x1810, 0x1819,
    0x1946, 0x194F, 0x19D0, 0x19D9, 0x1A80, 0x1A89, 0x1A90, 0x1A99, 0x1B50, 0x1B59, 0x1BB0, 0x1BB9, 0x1C40, 0x1C49,
    0x1C50, 0x1C59, 0xA620, 0xA629, 0xA8D0, 0xA8D9, 0xA900, 0xA909, 0xA9D0, 0xA9D9, 0xA9F0, 0xA9F9, 0xAA50, 0xAA59,
    0xABF0, 0xABF9, 0xFF10, 0xFF19, 0x104A0, 0x104A9, 0x10D30, 0x10D39, 0x11066, 0x1106F, 0x110F0, 0x110F9,
    0x11136, 0x1113F, 0x111D0, 0x111D9, 0x112F0, 0x112F9, 0x11450, 0x11459, 0x114D0, 0x114D9, 0x11650, 0x11659,
    0x116C0, 0x116C9, 0x11730, 0x11739, 0x118E0, 0x118E9, 0x11950, 0x11959, 0x11C50, 0x11C59, 0x11D50, 0x11D59,
    0x11DA0, 0x11DA9, 0x11F50, 0x11F59, 0x16A60, 0x16A69, 0x16AC0, 0x16AC9, 0x16B50, 0x16B59, 0x1D7CE, 0x1D7FF,
    0x1E140, 0x1E149, 0x1E2F0, 0x1E2F9, 0x1E4F0, 0x1E4F9, 0x1E950, 0x1E959, 0x1FBF0, 0x1FBF9];

  // Pares [desde, hasta] de caracteres con isdigit() y sin isdecimal() (superíndices, dígitos rodeados…).
  const RANGOS_DIGITOS_NO_DECIMALES = [0xB2, 0xB3, 0xB9, 0xB9, 0x1369, 0x1371, 0x19DA, 0x19DA, 0x2070, 0x2070,
    0x2074, 0x2079, 0x2080, 0x2089, 0x2460, 0x2468, 0x2474, 0x247C, 0x2488, 0x2490, 0x24EA, 0x24EA, 0x24F5,
    0x24FD, 0x24FF, 0x24FF, 0x2776, 0x277E, 0x2780, 0x2788, 0x278A, 0x2792, 0x10A40, 0x10A43, 0x10E60, 0x10E68,
    0x11052, 0x1105A, 0x1F100, 0x1F10A];

  /** Valor 0–9 si el punto de código es un dígito decimal (str.isdecimal), o -1. */
  function valorDecimal(cp) {
    if (cp >= 0x30 && cp <= 0x39) return cp - 0x30;
    if (cp < 0x660) return -1;
    const R = RANGOS_DECIMALES;
    let lo = 0, hi = R.length / 2 - 1; // búsqueda binaria del último tramo que empieza en cp o antes
    while (lo < hi) {
      const m = (lo + hi + 1) >> 1;
      if (R[2 * m] <= cp) lo = m; else hi = m - 1;
    }
    return cp <= R[2 * lo + 1] ? (cp - R[2 * lo]) % 10 : -1;
  }

  /** str.isdigit() de Python para un punto de código. */
  function esDigito(cp) {
    if (valorDecimal(cp) >= 0) return true;
    const R = RANGOS_DIGITOS_NO_DECIMALES;
    for (let i = 0; i < R.length; i += 2) if (cp >= R[i] && cp <= R[i + 1]) return true;
    return false;
  }

  /** Error de conversión de un valor; la ingesta lo convierte en ENTERO_NO_VALIDO con su fila. */
  class ErrorValor extends Error {
    constructor(motivo, valor) {
      super(`valor no válido (${motivo}): ${String(valor).slice(0, 60)}`);
      this.name = 'ErrorValor';
      this.motivo = motivo; // 'literal' | 'limite'
      this.valor = valor;
    }
  }

  const LIMITE_CIFRAS = 4300; // sys.int_info.default_max_str_digits
  const esEspacioAscii = (c) => c === 0x20 || (c >= 0x09 && c <= 0x0d); // Py_ISSPACE

  /**
   * int(s) de Python 3.12 en base 10. Devuelve number si cabe con exactitud y BigInt si no; lanza ErrorValor.
   * Réplica de PyLong_FromUnicodeObject: primero _PyUnicode_TransformDecimalAndSpaceToASCII (espacios
   * Unicode → ' ', dígitos decimales Unicode → ASCII) y luego PyLong_FromString (espacios ASCII alrededor,
   * signo, guiones bajos solo entre cifras y límite de 4.300 cifras).
   */
  function pyInt(s) {
    let t = '';
    for (const ch of s) {
      const cp = ch.codePointAt(0);
      if (cp < 127) t += ch;
      else if (esEspacio(cp)) t += ' ';
      else {
        const d = valorDecimal(cp);
        if (d < 0) throw new ErrorValor('literal', s);
        t += String.fromCharCode(0x30 + d);
      }
    }
    const n = t.length;
    let i = 0;
    while (i < n && esEspacioAscii(t.charCodeAt(i))) i++;
    let negativo = false;
    if (t[i] === '+') i++;
    else if (t[i] === '-') { negativo = true; i++; }
    let cifras = '', anterior = '';
    if (t[i] === '_') throw new ErrorValor('literal', s);
    for (; i < n; i++) {
      const c = t.charCodeAt(i);
      if (c >= 0x30 && c <= 0x39) cifras += t[i];
      else if (c === 0x5f) { if (anterior === '_') throw new ErrorValor('literal', s); }
      else break;
      anterior = t[i];
    }
    if (anterior === '_' || cifras.length === 0) throw new ErrorValor('literal', s);
    while (i < n && esEspacioAscii(t.charCodeAt(i))) i++;
    if (i !== n) throw new ErrorValor('literal', s);
    if (cifras.length > LIMITE_CIFRAS) throw new ErrorValor('limite', s);
    if (cifras.length <= 15) {
      const v = Number(cifras);
      return negativo && v !== 0 ? -v : v;
    }
    const b = negativo ? -BigInt(cifras) : BigInt(cifras);
    return b >= BigInt(Number.MIN_SAFE_INTEGER) && b <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(b) : b;
  }

  /** year = int(date[:4]) if date[:4].isdigit() else None */
  function anio(fecha) {
    const pref = [];
    for (const ch of fecha) {
      if (pref.length === 4) break;
      pref.push(ch);
    }
    if (pref.length === 0) return null;
    for (const ch of pref) if (!esDigito(ch.codePointAt(0))) return null;
    return pyInt(pref.join('')); // lanza con dígitos no decimales («²»), igual que int() en Python
  }

  /** len(split_words(texto)): tramos máximos de caracteres que no son isspace. */
  function contarPalabras(texto) {
    let n = 0, dentro = false;
    for (let i = 0; i < texto.length; i++) {
      const espacio = esEspacio(texto.charCodeAt(i));
      if (!espacio && !dentro) n++;
      dentro = !espacio;
    }
    return n;
  }

  /**
   * contarPalabras sobre bytes UTF-8 válidos, sin crear la cadena. Los espacios multibyte de Python son
   * U+0085, U+00A0 (C2 xx), U+1680 (E1 9A 80), U+2000–200A, U+2028/2029, U+202F (E2 80 xx),
   * U+205F (E2 81 9F) y U+3000 (E3 80 80). Un byte de continuación nunca empieza uno de ellos.
   */
  function contarPalabrasUtf8(b, a, z) {
    let n = 0, dentro = false, i = a;
    while (i < z) {
      const c = b[i];
      let largo = 0; // bytes del espacio que empieza en i (0 = no es espacio)
      if (c < 0x80) {
        if ((c >= 0x09 && c <= 0x0d) || (c >= 0x1c && c <= 0x20)) largo = 1;
      } else if (c === 0xc2) {
        if (b[i + 1] === 0x85 || b[i + 1] === 0xa0) largo = 2;
      } else if (c === 0xe1) {
        if (b[i + 1] === 0x9a && b[i + 2] === 0x80) largo = 3;
      } else if (c === 0xe2) {
        const c1 = b[i + 1], c2 = b[i + 2];
        if (c1 === 0x80 && ((c2 >= 0x80 && c2 <= 0x8a) || c2 === 0xa8 || c2 === 0xa9 || c2 === 0xaf)) largo = 3;
        else if (c1 === 0x81 && c2 === 0x9f) largo = 3;
      } else if (c === 0xe3) {
        if (b[i + 1] === 0x80 && b[i + 2] === 0x80) largo = 3;
      }
      if (largo) { dentro = false; i += largo; }
      else { if (!dentro) { n++; dentro = true; } i++; }
    }
    return n;
  }

  /** norm_value(raw, table): recorta y busca en la tabla; si no está, el valor recortado o «Sin identificar». */
  function normValue(crudo, tabla) {
    const v = pyStrip(crudo || '');
    if (Object.prototype.hasOwnProperty.call(tabla, v)) return tabla[v];
    return v || SIN_IDENTIFICAR;
  }

  // ------------------------------------------------------------------ derivaciones por columna
  // Cada una reproduce una parte de la tupla de stage_db. La ingesta las memoriza por valor distinto.

  /** Valor entero opcional (`int(x) if x else None`). */
  const enteroOpcional = (s) => (s === '' ? null : pyInt(s));

  const derivar = {
    fecha: (date) => ({ date: date || null, year: anio(date) }),
    orador: (speaker) => ({ speaker: pyStrip(speaker), speaker_fold: fold(speaker) }),
    diputado: (repName) => {
      const rep_name = pyStrip(repName) || SIN_IDENTIFICAR;
      return { rep_name, rep_name_fold: fold(rep_name) };
    },
    sinIdentificar: (s) => pyStrip(s) || SIN_IDENTIFICAR, // district, legislature
    crudoYNormalizado: (s, tabla) => ({ raw: pyStrip(s), norm: normValue(s, tabla) }), // party_family, ideology
  };

  // ------------------------------------------------------------------ correcciones de fecha
  // tools/correcciones_fechas.json, la misma tabla que usan tools/build_corpus.py (stage_db) y tools/corregir_fechas_csv.py.
  // Una fila se corrige si su id está en [id_min, id_max], su date es igual a fecha_csv y su legislature es igual a
  // legislatura_csv (los valores tal cual vienen del CSV, sin recortar, como los da csv.reader): entonces date pasa a
  // fecha_real y legislature a legislatura_real. Por esa condición es idempotente: sobre un CSV ya corregido no cambia nada.
  // Se aplica después de descartar los ids repetidos y antes de derivar el año, en el orden de stage_db.
  const CLAVES_CORRECCION = Object.freeze(['id_min', 'id_max', 'fecha_csv', 'legislatura_csv', 'fecha_real', 'legislatura_real']);

  /**
   * Tabla de correcciones (el JSON entero o su lista «correcciones») → lista congelada, en el orden del archivo, de
   * { indice, id_min, id_max, filas, num_session, fecha_csv, legislatura_csv, fecha_real, legislatura_real }.
   * null o undefined → null (sin correcciones). Lanza TypeError si la tabla no tiene la forma esperada.
   */
  function prepararCorrecciones(tabla) {
    if (tabla == null) return null;
    const lista = Array.isArray(tabla) ? tabla : tabla.correcciones;
    if (!Array.isArray(lista)) throw new TypeError('correcciones de fecha: falta la lista «correcciones»');
    return Object.freeze(lista.map((e, i) => {
      if (!e || typeof e !== 'object' || CLAVES_CORRECCION.some((k) => !(k in e))) {
        throw new TypeError(`correcciones de fecha: la entrada ${i} debe tener ${CLAVES_CORRECCION.join(', ')}`);
      }
      if (!Number.isSafeInteger(e.id_min) || !Number.isSafeInteger(e.id_max) || e.id_min > e.id_max) {
        throw new TypeError(`correcciones de fecha: la entrada ${i} tiene un rango de ids no válido`);
      }
      for (const k of CLAVES_CORRECCION.slice(2)) {
        if (typeof e[k] !== 'string') throw new TypeError(`correcciones de fecha: la entrada ${i} tiene «${k}» que no es texto`);
      }
      return Object.freeze({
        indice: i, id_min: e.id_min, id_max: e.id_max, filas: e.id_max - e.id_min + 1,
        num_session: e.num_session != null ? e.num_session : null,
        fecha_csv: e.fecha_csv, legislatura_csv: e.legislatura_csv, fecha_real: e.fecha_real, legislatura_real: e.legislatura_real,
      });
    }));
  }

  /**
   * La corrección que se aplica a una fila, o null. `correcciones`: lista de prepararCorrecciones (o null); `id`: el entero
   * ya convertido (number o BigInt); `date` y `legislature`: los campos del CSV tal cual. La primera que encaja, como stage_db.
   */
  function correccionDe(correcciones, id, date, legislature) {
    if (!correcciones) return null;
    for (let i = 0; i < correcciones.length; i++) {
      const e = correcciones[i];
      if (id >= e.id_min && id <= e.id_max && date === e.fecha_csv && legislature === e.legislatura_csv) return e;
    }
    return null;
  }

  /**
   * Una fila del CSV (14 cadenas, en el orden de COLUMNAS_CSV) → los 19 valores de speeches.
   * Lanza ErrorValor con `columna` si un entero no es válido, en el mismo orden en que falla stage_db
   * (id, date→year, num_session, order, rep_id, nwords). No descarta duplicados: eso depende del archivo.
   * `correcciones` (opcional): lista de prepararCorrecciones; corrige date y legislature antes de derivar el año.
   */
  function fila(c, normalizacion, correcciones = null) {
    const conColumna = (columna, fn) => {
      try { return fn(); } catch (e) { if (e instanceof ErrorValor) e.columna = columna; throw e; }
    };
    const id = conColumna('id', () => pyInt(c[0]));
    const corr = correccionDe(correcciones, id, c[3], c[13]);
    const date = corr ? corr.fecha_real : c[3];
    const legislature = corr ? corr.legislatura_real : c[13];
    const f = conColumna('date', () => derivar.fecha(date));
    const numSession = conColumna('num_session', () => enteroOpcional(c[1]));
    const ord = conColumna('order', () => enteroOpcional(c[2]));
    const o = derivar.orador(c[4]);
    const repId = conColumna('rep_id', () => enteroOpcional(c[6]));
    const d = derivar.diputado(c[7]);
    const fam = derivar.crudoYNormalizado(c[10], normalizacion.party_family || {});
    const ideo = derivar.crudoYNormalizado(c[11], normalizacion.ideology || {});
    const speech = c[5] || '';
    const nwords = conColumna('nwords', () => (c[12] !== '' ? pyInt(c[12]) : contarPalabras(speech)));
    return [id, numSession, ord, f.date, f.year, derivar.sinIdentificar(legislature), o.speaker, o.speaker_fold,
      repId, d.rep_name, d.rep_name_fold, derivar.sinIdentificar(c[8]), normValue(c[9], normalizacion.party || {}),
      fam.raw, fam.norm, ideo.raw, ideo.norm, nwords, speech];
  }

  R2.transformar = {
    SIN_IDENTIFICAR, COLUMNAS_CSV, COLUMNAS_BD, TRAMOS_FOLD,
    esEspacio, pyStrip, fold, valorDecimal, esDigito, pyInt, anio, contarPalabras, contarPalabrasUtf8, normValue,
    enteroOpcional, derivar, fila, ErrorValor, CLAVES_CORRECCION, prepararCorrecciones, correccionDe,
  };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/py/core.js ===== */
/* 2REP_Standalone · engine/py/core.js
 *
 * R2.py.core: semántica de Python 3.12 (unicodedata 15.0.0) que el backend usa y JavaScript no tiene igual.
 *
 * - Números: round() con mitad a par y ndigits (también negativos), repr() de float, str(None), format() con el
 *   minilenguaje de especificaciones (tipos d x X o b f F % y sin tipo; relleno, alineación, signo, z, #, 0, ancho,
 *   «,» y «_», precisión), fmtFixed y miles.
 * - Orden: comparación de Python (números, cadenas por punto de código, tuplas elemento a elemento), sorted()
 *   estable con key y reverse, la clave _clave_sql (NULL primero), bisect_left/bisect_right, max/min con key.
 * - Counter con most_common y desempate por orden de inserción.
 * - Cadenas: strip/lstrip/rstrip, split/rsplit, splitlines, partition/rpartition, startswith/endswith (índices en
 *   puntos de código), translate/maketrans, repr(), len() en puntos de código; predicados isupper, islower,
 *   istitle, isdigit, isdecimal, isnumeric, isalpha, isalnum, isspace, isprintable, isascii; lower, upper, title,
 *   capitalize y casefold con los mapeos completos (ß → SS) y la sigma final.
 * - strftime() con la hora local (locale C).
 *
 * Tablas Unicode: el bloque <tablas-unicode> lo escribe parity/oracle/dump_units_py.py --tablas a partir de los
 * métodos de str de Python 3.12.7, en el formato compacto de M1 (worker/transformar.js). No dependen del Unicode
 * del motor. lower/upper/casefold usan toLowerCase/toUpperCase del motor solo si todos los caracteres de la cadena
 * dan en el motor el mismo mapeo que en Python (comprobado carácter a carácter en el primer uso) y no hay sigma.
 *
 * Convención de tipos (Python → JS):
 *   None → null · bool → boolean · int → number entero (o BigInt) · float → number no entero o PyFloat (F(x))
 *   str → string · list/tuple → Array · dict → Map (orden de inserción y claves no str) u objeto.
 * Un float con valor entero (3.0) debe ir envuelto en PyFloat para que se escriba «3.0».
 */
(function (R2) {
  'use strict';

  // <tablas-unicode>
  // Generado por parity/oracle/dump_units_py.py --tablas con Python 3.12.7 (unicodedata 15.0.0). No editar a mano.
  const TABLAS = Object.freeze({
    upper: '1t,p,2u,m,2,6,y,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,2,0,2,0,4,1,2,0,2,1,2,2,3,3,2,1,2,2,4,1,2,1,2,0,2,0,2,1,2,0,3,0,2,1,2,2,2,0,2,1,4,0,8,0,3,0,3,0,3,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,0,3,0,2,2,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,8,1,2,1,3,0,2,3,2,0,2,0,2,0,2,0,82,0,2,0,4,0,9,0,7,0,2,2,2,0,2,1,2,g,2,8,10,0,3,2,4,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,6,0,3,0,2,1,3,1e,1d,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,a,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,2,0,2,0,2,0,2,0,2,0,2,0,3,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,11,28a,11,2,0,6,0,k3,2d,1p7,16,3,2,8x,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,a,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,a,7,9,5,b,7,9,7,9,5,c,0,2,0,2,0,2,0,9,7,21,3,d,3,d,3,d,4,c,3,7b,0,5,0,4,2,3,2,3,0,4,4,7,0,2,0,2,0,2,3,3,3,b,1,6,0,r,f,k,0,mr,p,1f5,1b,1d,0,2,2,3,0,2,0,2,0,2,3,2,0,3,0,9,2,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,9,0,2,0,5,0,nym,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,k,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3s,0,2,0,2,0,2,0,2,0,2,0,2,0,4,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,b,0,2,0,2,1,2,0,2,0,2,0,2,0,5,0,2,0,3,0,2,0,4,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,4,2,4,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,3,2,0,7,0,6,0,2,0,t,0,h7w,p,xy,13,3t,z,4d,a,2,e,2,6,2,1,1d7,1e,2cu,v,gw1,v,k2p,p,r,p,r,p,r,0,2,1,3,0,3,1,3,3,2,7,r,p,r,1,2,3,3,7,2,6,s,1,2,3,2,4,2,0,4,6,s,p,r,p,r,p,r,p,r,p,r,p,v,o,y,o,y,o,y,o,y,o,y,0,3ee,x,1lb,p,7,p,7,p',
    lower: '2p,p,1c,0,b,0,5,0,11,n,2,7,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,0,2,0,2,2,3,0,2,0,3,0,4,1,5,0,3,0,4,2,3,0,3,0,2,0,2,0,3,0,2,1,2,0,3,0,4,0,2,0,3,1,3,2,7,0,3,0,3,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,3,0,2,0,4,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,6,3,0,3,1,2,0,5,0,2,0,2,0,2,0,2,1w,2,z,8,1,v,4,2p,0,18,0,2,0,4,0,3,3,j,0,s,y,2,1,4,2,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,4,2,0,3,0,3,1,1g,1b,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,a,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,3,0,2,0,2,0,2,0,2,0,2,0,2,1,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,1d,14,288,16,2,3,l5,5,1oj,8,3c,5b,1u,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,8,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,8,9,5,b,7,9,7,9,5,b,7,9,7,9,d,3,7,9,7,9,7,9,4,2,1,7,0,4,2,2,1,9,3,3,1,9,7,b,2,2,1,3e,0,e,0,h,c,32,0,4,1,4,0,s,0,5,0,5,0,3,1,9,3,5,0,y,f,5,0,ng,p,1fr,1b,2,0,4,1,2,0,2,0,2,0,5,0,2,1,2,7,4,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,8,0,2,0,5,0,d,11,2,0,6,0,nx0,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,k,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,2,3q,0,2,0,2,0,2,0,2,0,2,0,2,2,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,9,2,0,2,0,3,0,2,0,2,0,2,0,2,0,5,0,2,0,3,0,2,2,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,6,0,6,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,5,0,2,0,7,0,2,0,2,0,2,0,2,0,p,2,2,0,2,2,mu,16,2,d,7,27,fnl,6,d,4,tm,p,y6,13,3t,z,4c,a,2,e,2,6,2,1,ck,0,3,2,2,15,2,8,zq,1e,2by,v,gw1,v,k2j,p,r,6,2,h,r,p,r,3,2,0,2,6,2,a,r,p,r,p,r,p,r,p,r,p,r,p,r,p,r,p,r,r,t,o,2,5,r,o,2,5,r,o,2,5,r,o,2,5,r,o,2,5,2,0,1f9,9,2,j,7,5,7a,1p,1px,x',
    title: 'cl,0,3,0,3,0,13,0,5ue,7,9,7,9,7,d,0,g,0,1c,0',
    cased: '1t,p,7,p,1c,0,b,0,5,0,6,m,2,u,2,5e,2,3,5,5r,2,z,8,1,v,4,2p,0,17,3,3,1,3,3,2,0,7,0,2,2,2,0,2,j,2,2a,2,3u,9,4l,2,11,a,14,26w,11,2,0,6,0,3,16,2,3,ip,2d,3,5,1oj,8,8,16,3,2,1t,5b,1t,7p,3,5,3,11,3,5,3,7,2,0,2,0,2,0,2,u,3,1g,2,6,2,0,4,2,2,6,4,3,3,5,5,c,6,2,2,6,39,0,e,0,h,c,2u,0,5,0,3,9,2,0,4,4,7,0,2,0,2,0,2,3,2,5,5,0,3,3,6,4,5,0,i,v,4,1,mq,1f,1ef,6c,7,3,4,1,d,11,2,0,6,0,nwz,19,j,t,3p,2t,4,3,2,1m,6,1,2,0,2,4,p,4,2,2,mu,16,2,d,7,27,fnl,6,d,4,sq,p,7,p,x2,27,2p,z,5,z,39,a,2,e,2,6,2,1,2,a,2,e,2,6,2,1,ck,0,3,2,2,15,2,8,xy,1e,e,1e,2b2,1r,gv5,1r,k1t,2c,2,1y,2,1,3,0,3,1,3,3,2,b,2,0,2,6,2,1s,2,3,3,7,2,6,2,r,2,3,2,4,2,0,4,6,2,9f,3,o,2,o,2,u,2,o,2,u,2,o,2,u,2,o,2,u,2,o,2,7,1f9,9,2,j,7,5,7a,1p,1oz,1v,1kd,p,7,p,7,p',
    case_ignorable: '13,0,7,0,c,0,10,0,2,0,20,0,5,0,2,0,5,0,3,1,e0,5b,5,1,5,0,a,1,2,0,70,6,5s,0,6,0,1e,18,2,0,2,1,2,1,2,0,19,0,c,5,b,a,2,0,10,0,b,k,h,0,2u,7,2,9,2,3,y,0,2,0,v,q,2k,a,1n,a,5,0,3,0,p,n,18,2,19,0,8,1,7,7,16,1l,1k,0,2,0,5,7,5,0,4,6,b,1,e,0,g,0,1n,0,5,3,9,0,l,1,r,0,3,1,1m,0,5,1,5,1,3,2,4,0,v,1,4,0,c,1,1m,0,5,4,2,1,5,0,l,1,n,5,2,0,1n,0,3,0,2,3,9,0,8,1,c,1,v,0,1q,0,d,0,1f,0,4,0,1k,0,2,2,6,2,2,3,8,1,c,1,u,0,1n,0,3,0,7,0,6,1,l,1,t,1,1m,1,5,3,9,0,l,1,u,0,21,0,8,2,2,0,2j,0,3,6,c,8,2r,0,3,8,a,0,2,6,22,1,s,0,2,0,2,0,1k,d,2,4,2,1,6,a,2,z,a,0,2v,3,2,5,2,1,3,1,q,1,5,2,h,3,e,0,3,1,7,0,g,0,2n,0,gx,2,qb,2,u,1,v,1,v,1,1t,1,2,6,9,0,3,a,4,0,6,0,1a,4,1g,0,1u,1,z,0,3b,2,5,1,a,0,7,2,64,1,3,0,1n,0,2,6,2,0,2,0,3,7,7,9,3,0,14,0,9,u,1e,3,1d,0,2,4,2,0,6,0,15,8,d,1,x,3,3,1,2,2,1l,0,2,1,4,0,2,2,1n,7,3,1,1t,5,2b,2,2,c,2,6,5,0,7,0,4,1,1f,1q,e,0,z,2s,ce,0,2,2,c,2,e,2,e,2,e,1,d,4,9,1,b,0,3,0,3,4,1e,4,2,9,2,0,e,0,h,c,1g,w,2a4,1,36,2,3i,0,g,0,2p,v,1c,0,d2,0,11,3,4,4,6,0,2m,5,2m,2,lxz,0,yr,5,7j,0,2r,3,2,9,2,0,t,3,29,1,f,x,27,0,o,2,2w,2,4,1,9,0,4,0,5,0,q,1,6,0,48,1,r,h,e,0,13,7,q,a,1b,2,1d,0,3,3,3,1,i,0,m,1,1v,5,3,1,3,1,d,0,9,0,10,0,c,0,1g,0,2,2,3,1,6,1,2,0,s,0,f,1,6,1,2,0,2t,4,a,2,3e,0,3,0,5,0,fn5,0,44,g,fy,f,4,0,d,f,z,0,3,0,4q,0,8,0,7,0,c,0,10,0,2,0,1c,0,1a,1,1w,0,m,2,ea,0,6b,0,46,4,sm,5,2,15,2,8,g7,2,2,1,6,3,15,2,5,0,4m,1,fy,3,as,1,29,2,1z,a,1e,3,3g,0,1j,e,16,0,3,1,b,2,1e,3,3,1,3,0,5,0,b,0,1f,2,11,4,2,7,1r,0,d,1,1h,8,b,3,3,0,2o,2,3,0,2,1,7,0,3,0,4e,0,4,7,m,1,1m,1,4,0,12,6,4,4,5g,7,3,2,2,0,o,0,2d,5,2,0,5,1,2,1,6n,3,7,1,2,1,s,1,2e,7,3,0,2,1,2z,0,2,0,3,5,2,0,2u,2,3,3,2,4,78,8,2,1,75,1,2,0,5,0,41,3,3,1,5,0,x,9,15,5,3,3,9,0,a,5,3,2,1b,c,2,1,bb,6,2,5,2,0,2b,l,3,6,2,1,2,1,3f,5,4,0,2,1,2,6,2,0,21,1,4,0,2,0,9o,1,c,1,1h,4,6,0,2,0,44u,g,7,e,asb,4,1o,6,a,3,ss,0,1s,g,1t,1,2,1,cng,3,2,6,2,1,2hr,1,2,3,3ml,19,3,m,f5,2,a,f,3,6,v,3,45,2,1j0,1i,5,1d,9,0,f,0,n,4,2,e,11t,6,2,g,3,6,2,1,2,4,6,1p,y,0,4h,d,a9,0,1q,3,e4,4,rl,6,32,7,240,4,gx6q,0,v,2n,3l,6n',
    alpha: '1t,p,7,p,1c,0,b,0,5,0,6,m,2,u,2,cp,5,b,f,4,8,0,2,0,3m,4,2,1,3,3,2,0,7,0,2,2,2,0,2,j,2,2a,2,3u,9,4l,2,11,3,0,7,14,20,q,5,3,1a,16,10,1,2,2q,2,0,g,1,8,1,b,2,3,0,h,0,2,t,u,2g,c,0,p,w,a,1,5,0,6,l,5,0,a,0,4,0,o,o,8,a,6,n,2,5,i,15,1n,1h,4,0,j,0,8,9,g,f,5,7,3,1,3,l,2,6,2,0,4,3,4,0,h,0,e,1,2,2,f,1,b,0,9,5,5,1,3,l,2,6,2,1,2,1,2,1,w,3,2,0,k,2,h,8,2,2,2,l,2,6,2,1,2,4,4,0,j,0,g,1,o,0,c,7,3,1,3,l,2,6,2,1,2,4,4,0,v,1,2,2,g,0,i,0,2,5,4,2,2,3,4,1,2,0,2,1,4,1,4,2,4,b,n,0,1h,7,2,2,2,m,2,f,4,0,r,2,3,0,3,1,v,0,5,7,2,2,2,m,2,9,2,4,4,0,w,1,2,1,g,1,i,8,2,2,2,14,3,0,h,0,6,2,9,2,p,5,6,h,4,n,2,8,2,0,3,6,1n,1b,2,1,d,6,1n,1,2,0,2,4,2,n,2,0,2,9,2,1,a,0,3,4,2,0,m,3,x,0,1s,7,2,z,s,4,38,16,l,0,h,5,5,3,4,0,4,1,8,2,5,c,d,0,i,11,2,0,6,0,3,16,2,98,2,3,3,6,2,0,2,3,3,14,2,3,3,w,2,3,3,6,2,0,2,3,3,e,2,1k,2,3,3,1u,12,f,h,2d,3,5,4,h7,3,g,2,p,6,22,7,7,8,h,e,i,f,h,f,c,2,2,g,1f,10,0,5,0,1w,2g,8,4,3,x,2,0,6,1x,b,u,1e,t,3,4,c,17,5,p,1j,m,a,1g,2b,0,2m,1a,i,7,1j,t,e,1,b,17,r,z,16,2,b,z,3,8,8,16,3,2,16,3,2,5,2,1,4,0,6,5b,1t,7p,3,5,3,11,3,5,3,7,2,0,2,0,2,0,2,u,3,1g,2,6,2,0,4,2,2,6,4,3,3,5,5,c,6,2,2,6,39,0,e,0,h,c,2u,0,5,0,3,9,2,0,4,4,7,0,2,0,2,0,2,3,2,a,3,3,6,4,5,0,1h,1,22k,6c,7,3,4,1,d,11,2,0,6,0,3,1j,8,0,h,m,a,6,2,6,2,6,2,6,2,6,2,6,2,6,2,6,29,0,d2,1,17,4,6,1,5,2d,7,2,2,2h,2,3,6,16,2,2l,i,v,1d,f,e9,533,1t,h3g,1w,19,3,7g,4,f,b,1,l,1a,h,u,3,1x,1e,8,3,2u,3,1r,6,1,2,0,2,4,p,f,2,2,2,3,2,m,u,1f,f,1d,1r,5,4,0,2,1,c,r,b,m,q,s,8,1a,t,0,h,4,2,9,b,4,2,14,o,2,2,7,l,m,4,0,4,1d,2,0,4,1,3,4,3,0,2,0,p,2,3,a,8,2,d,5,3,5,3,5,a,6,2,6,2,16,2,d,7,36,u,8mb,d,m,5,1c,6it,a5,3,2x,13,6,d,4,6,0,2,9,2,c,2,4,2,0,2,1,2,1,2,2z,y,a2,j,1r,3,1h,15,b,39,4,2,3q,11,p,7,p,c,2g,4,5,3,5,3,5,3,2,10,b,2,p,2,i,2,1,2,e,3,d,z,3e,au,s,4,1c,1c,v,e,j,2,7,7,11,b,t,3,z,5,7,1d,4d,j,z,5,z,5,13,9,1f,d,a,2,e,2,6,2,1,2,a,2,e,2,6,2,1,1w,8m,a,l,b,7,p,5,2,15,2,8,1y,5,3,0,2,17,2,1,4,0,3,m,b,m,a,u,1u,i,2,1,b,l,b,p,1z,1j,7,1,1t,0,g,3,2,2,2,s,17,s,4,s,10,7,2,r,s,1h,b,l,b,i,e,h,33,20,1k,1e,e,1e,e,z,9p,15,7,1,27,s,b,0,9,l,17,h,1b,k,s,m,d,1g,1m,1,3,0,e,18,x,o,r,z,u,0,3,0,9,y,4,0,d,1b,f,3,m,0,2,0,10,h,2,o,k,1,1s,6,2,0,2,3,2,e,2,9,8,1a,13,7,3,1,3,l,2,6,2,1,2,4,4,0,j,0,d,4,4f,1g,j,3,l,2,v,1b,l,1,2,0,55,1a,16,3,11,1b,l,0,1o,16,e,0,20,q,12,6,56,17,39,1r,w,7,3,0,3,7,2,1,2,n,g,0,2,0,2n,7,3,12,h,0,2,0,t,0,b,13,8,0,m,0,c,19,k,0,j,20,7c,8,2,10,i,0,1e,t,35,6,2,1,2,11,m,0,q,5,2,1,2,v,f,0,94,i,g,0,2,c,2,x,3h,0,28,pl,6f,5f,219,2o,g,tr,i,5,33u,g6,6nu,fs,8,u,i,26,i,t,j,1b,h,3,w,k,6,i,j5,1r,3l,22,6,0,1v,c,1t,1,2,0,t,4qf,9,yd,17,8,6w8,3,2,6,2,1,2,82,g,0,u,2,3,0,f,3,9,az,1s5,2y,6,c,4,8,8,9,4mf,2c,2,1y,2,1,3,0,3,1,3,3,2,b,2,0,2,6,2,1s,2,3,3,7,2,6,2,r,2,3,2,4,2,0,4,6,2,9f,3,o,2,o,2,u,2,o,2,u,2,o,2,u,2,o,2,u,2,o,2,7,1f9,u,7,5,7a,1p,43,18,b,6,h,0,8y,t,j,17,dh,r,l1,6,2,3,2,1,2,e,2,5g,1o,1v,8,0,xh,3,2,q,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,g,6,2,2,4,2,g,3et,wyn,x,37d,7,65,3,4g1,f,5rk,2e8,f1,15v,3t6,6,38f',
    decimal: '1c,9,17r,9,3r,9,5j,9,bh,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,2p,9,3b,9,1z,9,7r,9,1z,9,1fr,9,13,9,8d,9,3l,9,4n,9,7,9,53,9,2f,9,3r,9,7,9,r7r,9,iv,9,13,9,5j,9,n,9,2f,9,bb,9,gev,9,13b,9,1on,9,ml,9,3l,9,1p,9,41,9,7r,9,9j,9,3b,9,af,9,2v,9,2v,9,br,9,2v,9,l3,9,6v,9,1z,9,br,9,etj,9,2f,9,3r,9,lf9,1d,1tt,9,br,9,dz,9,uv,9,3o7,9',
    digit: '1c,9,3d,1,6,0,147,9,3r,9,5j,9,bh,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,3b,9,2p,9,3b,9,1z,9,7r,9,1z,9,k0,8,vj,9,13,9,8d,9,3l,a,4m,9,7,9,53,9,2f,9,3r,9,7,9,t3,0,4,5,7,9,rb,8,c,8,c,8,2i,0,b,8,2,0,hj,8,2,8,2,8,ozy,9,iv,9,13,9,5j,9,n,9,2f,9,bb,9,gev,9,13b,9,13r,3,kt,9,87,8,dm,8,c,9,3l,9,1p,9,41,9,7r,9,9j,9,3b,9,af,9,2v,9,2v,9,br,9,2v,9,l3,9,6v,9,1z,9,br,9,etj,9,2f,9,3r,9,lf9,1d,1tt,9,br,9,dz,9,uv,9,1if,a,25i,9',
    numeric: '1c,9,3d,1,6,0,3,2,142,9,3r,9,5j,9,bh,9,3b,9,5,5,31,9,3b,9,3b,9,3,5,33,c,38,9,9,6,2w,9,2x,6,8,i,32,9,2p,9,3b,9,1z,j,7h,9,1z,9,k0,j,oi,2,6o,9,7,9,n,9,8d,9,3l,a,4m,9,7,9,53,9,2f,9,3r,9,7,9,t3,0,4,5,7,9,5j,1e,3,4,k7,1n,27,l,hj,t,12i,0,lm,0,q,8,f,2,9k,3,3v,9,v,7,2,e,x,9,14,e,92,0,3i,0,pz,0,mb,0,3oz,0,3,0,4,0,2,0,2c,0,1b,0,8,0,2,0,15,1,v,0,9,0,11,0,2r,0,b8,0,1u,0,z,0,2,0,2,0,d0,0,2,2,7,0,39,3,lz,0,eu,0,8,0,135,0,3o,1,d,2,2,0,ry,0,26,0,w6,0,1f8,0,wg,0,ko,0,1zc,0,py,0,1oi,0,5,0,3h,0,1rl,0,11,0,6,0,18,0,3i,0,2zu,9,59,9,8x,5,4b,9,13,9,5j,9,n,9,2f,9,bb,9,faq,0,8,0,5,0,1m,0,v,0,2,0,16,0,103,9,dq,18,d,1k,i,1,9i,q,11,3,u,0,9,0,3r,4,5n,9,q7,7,q,6,14,8,24,4,n,5,4h,1,3,f,3,19,1t,8,1h,1,v,2,24,4,2x,7,p,7,16,6,97,5,1d,9,87,u,4f,9,17,3,35,6,3r,t,3l,9,1p,9,41,9,8,j,70,9,9j,9,3b,9,af,9,2v,9,2v,b,bp,i,2m,9,l3,s,6c,9,1z,9,br,9,2v,k,to,32,dte,9,2f,9,3r,9,2,6,m7,m,jsa,j,d,j,31,o,uu,1d,1tt,9,br,9,dz,9,r2,8,3l,9,m0,1m,2,2,2,3,25,18,2,e,qr,c,25g,9,so,0,2r,0,3i,0,1r,0,1l5,0,2h,0,9,0,g,0,9a,0,j,0,s,0,4tz,0,16w,0,3gj,0,7rm,0,tnn,0',
    space: '9,4,f,4,2t,0,r,0,4bk,0,1vk,a,u,1,6,0,1c,0,335,0',
    printable: 'w,2m,z,b,2,jt,3,5,5,6,2,0,2,j,2,b0,2,11,3,1d,3,2,2,1i,9,q,5,5,i,l,2,5b,2,1b,3,1m,3,2s,f,1m,3,1c,3,e,2,r,3,0,2,a,6,u,a,21,2,4g,2,7,3,1,3,l,2,6,2,0,4,3,3,8,3,1,3,3,9,0,5,1,2,4,3,o,3,2,2,5,5,1,3,l,2,6,2,1,2,1,2,1,3,0,2,4,5,1,3,2,4,0,8,3,2,0,8,g,b,2,2,8,2,2,2,l,2,6,2,1,2,4,3,9,2,2,2,2,3,0,g,3,3,b,8,6,2,2,2,7,3,1,3,l,2,6,2,1,2,4,3,8,3,1,3,2,8,2,5,1,2,4,3,h,b,1,2,5,4,2,2,3,4,1,2,0,2,1,4,1,4,2,4,b,5,4,4,2,2,3,3,0,7,0,f,k,6,c,2,2,2,m,2,f,3,8,2,2,2,3,8,1,2,2,3,0,3,3,3,9,8,l,2,2,2,m,2,9,2,4,3,8,2,2,2,3,8,1,7,1,2,3,3,9,2,2,d,c,2,2,2,1e,2,2,2,5,5,f,3,p,2,2,2,h,4,n,2,8,2,0,3,6,4,0,5,5,2,0,2,7,7,9,3,2,d,1l,5,s,12,1,2,0,2,4,2,n,2,0,2,m,3,4,2,0,2,6,2,9,3,3,x,1z,2,z,5,12,2,z,2,e,2,c,12,5h,2,0,6,0,3,ag,2,3,3,6,2,0,2,3,3,14,2,3,3,w,2,3,3,6,2,0,2,3,3,e,2,1k,2,3,3,1u,3,v,4,p,7,2d,3,5,3,hr,2,r,4,2g,8,l,a,n,a,j,d,c,2,2,2,1,d,2l,3,9,7,9,7,d,2,a,7,2g,8,16,6,1x,b,u,2,b,5,b,5,0,4,15,3,4,c,17,5,p,7,a,4,1p,3,1s,2,s,3,a,7,9,7,d,3,u,1e,24,4,1a,2,37,9,1n,4,e,4,1n,8,16,3,a,9,16,6,et,3,5,3,11,3,5,3,7,2,0,2,0,2,0,2,u,3,1g,2,e,2,d,3,5,2,i,3,2,2,8,i,n,9,1a,i,1,3,q,2,c,4,w,g,w,g,3v,5,ie,q,a,m,1eb,3,v,2,9o,6,18,2,0,6,0,3,1j,8,1,f,n,a,6,2,6,2,6,2,6,2,6,2,6,2,6,2,6,2,3h,z,p,2,2g,d,5x,r,b,6,1q,2,2d,3,2u,6,16,2,2l,2,2b,d,1a,2,mlo,4,1i,a,9n,l,53,9,5m,6,1,2,0,2,4,p,1m,4,9,7,1j,9,1x,9,b,7,37,c,t,4,25,2,a,5,w,2,1i,a,d,3,9,3,2u,p,r,b,5,3,5,3,5,a,6,2,6,2,1n,5,3h,3,9,7,8mb,d,m,5,1c,6it,a5,3,2x,13,6,d,4,6,p,2,4,2,0,2,1,2,1,2,3g,h,cc,3,1h,8,0,x,15,7,1e,2,i,2,3,5,4,2,3q,5,59,4,5,3,5,3,5,3,2,4,6,2,6,e,1,3,b,2,p,2,i,2,1,2,e,3,d,z,3e,6,2,5,18,4,2f,2,c,4,0,1c,19,3n,s,4,1c,g,r,5,z,a,t,6,16,6,t,2,10,5,d,17,4d,3,9,7,z,5,z,5,13,9,1f,c,b,2,e,2,6,2,1,2,a,2,e,2,6,2,1,1w,8m,a,l,b,7,p,5,2,15,2,8,1y,5,3,0,2,17,2,1,4,0,3,m,2,1z,9,8,1d,i,2,1,6,w,4,q,6,0,1t,1j,5,j,3,1d,2,1,6,7,2,2,2,s,3,2,5,9,8,8,8,1r,x,12,5,b,a,1h,4,s,3,q,6,p,8,3,d,6,29,20,1k,1e,e,1e,8,19,9,9,87,u,2,15,2,2,3,1,24,16,9,15,n,p,13,r,l,m,a,25,5,z,a,1p,2,4,e,o,8,9,7,1g,2,h,9,12,a,2n,2,j,c,h,2,1a,1r,6,2,0,2,3,2,e,2,a,7,1m,6,9,7,3,2,7,3,1,3,l,2,6,2,1,2,4,2,9,3,1,3,2,3,0,7,0,6,6,3,6,4,4,3w,2j,2,4,v,1z,9,9,4n,1h,3,11,z,1w,c,9,7,c,k,1l,7,9,1j,q,3,e,5,m,56,1n,2t,2a,d,7,3,0,3,7,2,1,2,t,2,1,3,b,a,9,1z,7,3,19,3,a,s,1z,9,2a,e,20,8,9,6v,8,2,18,2,d,b,s,4,v,3,l,2,d,22,6,2,1,2,17,4,0,2,1,2,8,9,9,7,5,2,1,2,10,2,1,2,5,8,9,8n,o,8,g,2,14,4,r,2f,0,g,1d,e,pm,2v,32,2,4,c,5f,219,2q,e,tr,h,l,33f,g6,6nu,fs,8,u,2,9,5,28,2,9,7,t,3,5,b,1x,b,9,2,6,2,k,6,i,j5,2i,2u,22,5,1k,8,g,1t,4,c,1,f,4qf,9,yd,17,8,6w8,3,2,6,2,1,2,82,g,0,u,2,3,0,f,3,9,az,1s5,2y,6,c,4,8,8,9,3,3,3mp,19,3,m,a,37,1p,6t,b,12,3,21,9,33,m,1x,3f,j,d,j,d,2e,a,o,3s,2c,2,1y,2,1,3,0,3,1,3,3,2,b,2,0,2,6,2,1s,2,3,3,7,2,6,2,r,2,3,2,4,2,0,4,6,2,9f,3,83,3,jh,g,4,2,e,up,u,7,5,5y,6,2,g,3,6,2,1,2,4,6,1p,y,0,35,18,4,d,3,9,5,1,8x,u,i,1l,6,0,cx,15,kn,6,2,3,2,1,2,e,2,5g,3,f,16,23,5,9,5,1,lu,1v,25,1o,5f,3,2,q,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,g,6,2,2,4,2,g,1h,1,7j,17,5,2r,d,e,3,e,2,e,2,10,b,4t,1l,s,e,17,5,8,8,1,f,5,4b,rb,5,g,4,c,4,3a,5,2m,7,b,5,0,g,b,5,1j,9,9,7,13,9,t,3,1,27,9f,d,d,3,c,4,8,8,19,2,6,9,d,5,8,8,8,8,42,2,1i,12,9,sn,wyn,x,37d,7,65,3,4g1,f,5rk,2e8,f1,15v,3t6,6,38f,f9e9,6n',
    map_lower: '1t,q,1,w,2u,n,1,w,2,7,1,w,y,o,2,1,4,3,2,1,3,8,2,1,3,n,2,1,2,1,1,-3d,1,3,2,1,4,1,1,5u,1,2,2,1,2,1,1,5q,1,1,1,1,2,2,1,5p,1,1,1,1,3,1,1,27,1,1,1,5m,1,1,1,5n,1,1,1,1,2,1,1,5p,1,1,1,5r,2,1,1,5v,1,1,1,5t,1,1,1,1,4,1,1,5v,1,1,1,5x,2,1,1,5y,1,3,2,1,2,1,1,62,1,1,1,1,2,1,1,62,3,1,1,1,2,1,1,62,1,1,1,1,2,2,1,61,1,2,2,1,2,1,1,63,1,1,1,1,4,1,1,1,8,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1,9,2,1,3,9,2,1,3,1,1,2,1,2,2,1,2,1,1,-2p,1,1,1,-1k,1,k,2,1,2,1,1,-3m,2,9,2,1,8,1,1,8bv,1,1,1,1,2,1,1,-4j,1,1,1,8bs,3,1,1,1,2,1,1,-5f,1,1,1,1x,1,1,1,1z,1,5,2,1,82,2,2,1,4,1,1,1,9,1,1,38,7,1,1,12,2,3,1,11,2,1,1,1s,2,2,1,1r,2,h,1,w,2,9,1,w,10,1,1,8,9,c,2,1,6,1,1,-1o,3,1,1,1,2,1,1,-7,1,1,1,1,3,3,1,-3m,1,g,1,28,1,w,1,w,1d,h,2,1,a,r,2,1,2,1,1,f,1,7,2,1,3,1c,2,1,3,12,1,1c,28a,12,1,5ls,2,1,1,5ls,6,1,1,5ls,k3,28,1,tzk,1,6,1,8,1p7,17,1,-2bk,3,3,1,-2bk,8x,23,2,1,a,1,1,-5vj,2,1c,2,1,a,8,1,-8,9,6,1,-8,b,8,1,-8,9,8,1,-8,9,6,1,-8,c,4,2,-8,9,8,1,-8,p,8,1,-8,9,8,1,-8,9,8,1,-8,9,2,1,-8,1,2,1,-22,1,1,1,-9,c,4,1,-2e,1,1,1,-9,c,2,1,-8,1,2,1,-2s,d,2,1,-8,1,2,1,-34,1,1,1,-7,c,2,1,-3k,1,2,1,-3i,1,1,1,-9,8a,1,1,-5st,4,1,1,-6gv,1,1,1,-6di,7,1,1,s,1a,g,1,g,k,1,1,1,mr,q,1,q,1f5,1c,1,1c,1d,1,1,1,2,1,1,-8af,1,1,1,-2xy,1,1,1,-89z,3,3,2,1,2,1,1,-8bg,1,1,1,-8al,1,1,1,-8bj,1,1,1,-8bi,2,1,1,1,3,1,1,1,9,2,1,-8cf,1,1e,2,1,9,2,2,1,5,1,1,1,nym,n,2,1,k,e,2,1,3s,7,2,1,4,v,2,1,b,2,2,1,2,1,1,-r9g,1,5,2,1,5,1,1,1,2,1,1,-wmg,3,2,2,1,4,a,2,1,2,1,1,-wn8,1,1,1,-wnj,1,1,1,-wnf,1,1,1,-wn5,1,1,1,-wn8,2,1,1,-wlu,1,1,1,-wmi,1,1,1,-wlx,1,1,1,ps,1,8,2,1,2,1,1,-1c,1,1,1,-wn7,1,1,1,-raw,1,2,2,1,7,1,1,1,6,2,2,1,t,1,1,1,h7w,q,1,w,xy,14,1,14,3t,10,1,14,4d,b,1,13,2,f,1,13,2,7,1,13,2,2,1,13,1d7,1f,1,1s,2cu,w,1,w,gw1,w,1,w,o81,y,1,y',
    multi_lower: '8g=2x.lj',
    map_upper: '2p,q,1,-w,1n,1,1,kn,17,n,1,-w,2,7,1,-w,1,1,1,3d,2,o,2,-1,2,1,1,-6g,2,3,2,-1,3,8,2,-1,3,n,2,-1,3,3,2,-1,1,1,1,-8c,1,1,1,5f,3,2,2,-1,3,1,1,-1,4,1,1,-1,6,1,1,-1,3,1,1,2p,4,1,1,-1,1,1,1,4j,4,1,1,3m,3,3,2,-1,3,1,1,-1,5,1,1,-1,3,1,1,-1,4,2,2,-1,3,1,1,-1,4,1,1,-1,2,1,1,1k,6,1,1,-1,1,1,1,-2,2,1,1,-1,1,1,1,-2,2,1,1,-1,1,1,1,-2,2,8,2,-1,1,1,1,-27,2,9,2,-1,3,1,1,-1,1,1,1,-2,2,1,1,-1,4,k,2,-1,4,9,2,-1,9,1,1,-1,3,2,1,8cf,2,1,1,-1,5,5,2,-1,1,1,1,8bj,1,1,1,8bg,1,1,1,8bi,1,1,1,-5u,1,1,1,-5q,2,2,1,-5p,2,1,1,-5m,2,1,1,-5n,1,1,1,wnj,4,1,1,-5p,1,1,1,wnf,2,1,1,-5r,2,1,1,wmg,1,1,1,wn8,2,1,1,-5t,1,1,1,-5v,1,1,1,wn8,1,1,1,8af,1,1,1,wn5,3,1,1,-5v,2,1,1,8al,1,1,1,-5x,3,1,1,-5y,8,1,1,89z,3,1,1,-62,2,1,1,wn7,1,1,1,-62,4,1,1,wmi,1,1,1,-62,1,1,1,-1x,1,2,1,-61,1,1,1,-1z,6,1,1,-63,b,1,1,wlx,1,1,1,wlu,4n,1,1,2c,18,2,2,-1,4,1,1,-1,4,3,1,3m,1b,1,1,-12,1,3,1,-11,2,h,1,-w,1,1,1,-v,1,9,1,-w,1,1,1,-1s,1,2,1,-1r,2,1,1,-1q,1,1,1,-1l,4,1,1,-1b,1,1,1,-1i,1,1,1,-8,2,c,2,-1,1,1,1,-2e,1,1,1,-28,1,1,1,7,1,1,1,-38,2,1,1,-2o,3,1,1,-1,3,1,1,-1,1h,w,1,-w,1,g,1,-28,2,h,2,-1,a,r,2,-1,3,7,2,-1,1,1,1,-f,2,1c,2,-1,1e,12,1,-1c,28a,17,1,2bk,3,3,1,2bk,l5,6,1,-8,1oj,1,1,-4tq,1,1,1,-4tp,1,1,1,-4tg,1,2,1,-4te,1,1,1,-4tf,1,1,1,-4t8,1,1,1,-4rp,1,1,1,r7m,6p,1,1,r9g,4,1,1,2xy,h,1,1,raw,37,23,2,-1,6,1,1,-1n,6,1c,2,-1,1,8,1,8,9,6,1,8,b,8,1,8,9,8,1,8,9,6,1,8,c,4,2,8,9,8,1,8,9,2,1,22,1,4,1,2e,1,2,1,2s,1,2,1,3k,1,2,1,34,1,2,1,3i,1f,2,1,8,d,1,1,-5k5,i,2,1,8,f,2,1,8,4,1,1,7,a1,1,1,-s,y,g,1,-g,5,1,1,-1,ng,q,1,-q,1fr,1c,1,-1c,2,1,1,-1,4,1,1,-8bv,1,1,1,-8bs,2,3,2,-1,7,1,1,-1,3,1,1,-1,b,1e,2,-1,9,2,2,-1,5,1,1,-1,d,12,1,-5ls,2,1,1,-5ls,6,1,1,-5ls,nx0,n,2,-1,k,e,2,-1,3s,7,2,-1,4,v,2,-1,b,2,2,-1,3,5,2,-1,5,1,1,-1,5,2,2,-1,1,1,1,1c,3,a,2,-1,c,8,2,-1,5,2,2,-1,7,1,1,-1,6,2,2,-1,t,1,1,-1,nx,1,1,-ps,t,28,1,-tzk,ghu,q,1,-w,y6,14,1,-14,3t,10,1,-14,4c,b,1,-13,2,f,1,-13,2,7,1,-13,2,2,1,-13,1dw,1f,1,-1s,2by,w,1,-w,gw1,w,1,-w,o83,y,1,-y',
    multi_upper: '67=2b.2b,95=jg.26,ds=22.lo,pc=pl.lk.ld,q8=px.lk.ld,13b=111.11u,61i=20.mp,61j=2c.lk,61k=2f.lm,61l=2h.lm,61m=1t.ji,66o=px.lv,66q=px.lv.lc,66s=px.lv.ld,66u=px.lv.n6,680=64o.pl,681=64p.pl,682=64q.pl,683=64r.pl,684=64s.pl,685=64t.pl,686=64u.pl,687=64v.pl,688=64o.pl,689=64p.pl,68a=64q.pl,68b=64r.pl,68c=64s.pl,68d=64t.pl,68e=64u.pl,68f=64v.pl,68g=65k.pl,68h=65l.pl,68i=65m.pl,68j=65n.pl,68k=65o.pl,68l=65p.pl,68m=65q.pl,68n=65r.pl,68o=65k.pl,68p=65l.pl,68q=65m.pl,68r=65n.pl,68s=65o.pl,68t=65p.pl,68u=65q.pl,68v=65r.pl,68w=67c.pl,68x=67d.pl,68y=67e.pl,68z=67f.pl,690=67g.pl,691=67h.pl,692=67i.pl,693=67j.pl,694=67c.pl,695=67d.pl,696=67e.pl,697=67f.pl,698=67g.pl,699=67h.pl,69a=67i.pl,69b=67j.pl,69e=69m.pl,69f=pd.pl,69g=p2.pl,69i=pd.n6,69j=pd.n6.pl,69o=pd.pl,69u=6a2.pl,69v=pj.pl,69w=p5.pl,69y=pj.n6,69z=pj.n6.pl,6a4=pj.pl,6aa=pl.lk.lc,6ab=pl.lk.ld,6ae=pl.n6,6af=pl.lk.n6,6aq=px.lk.lc,6ar=px.lk.ld,6as=pt.lv,6au=px.n6,6av=px.lk.n6,6b6=6be.pl,6b7=q1.pl,6b8=pb.pl,6ba=q1.n6,6bb=q1.n6.pl,6bg=q1.pl,1dkw=1y.1y,1dkx=1y.21,1dky=1y.24,1dkz=1y.1y.21,1dl0=1y.1y.24,1dl1=2b.2c,1dl2=2b.2c,1dlf=11g.11i,1dlg=11g.111,1dlh=11g.117,1dli=11q.11i,1dlj=11g.119',
    map_title: '2p,q,1,-w,1n,1,1,kn,17,n,1,-w,2,7,1,-w,1,1,1,3d,2,o,2,-1,2,1,1,-6g,2,3,2,-1,3,8,2,-1,3,n,2,-1,3,3,2,-1,1,1,1,-8c,1,1,1,5f,3,2,2,-1,3,1,1,-1,4,1,1,-1,6,1,1,-1,3,1,1,2p,4,1,1,-1,1,1,1,4j,4,1,1,3m,3,3,2,-1,3,1,1,-1,5,1,1,-1,3,1,1,-1,4,2,2,-1,3,1,1,-1,4,1,1,-1,2,1,1,1k,5,1,1,1,2,1,1,-1,1,1,1,1,2,1,1,-1,1,1,1,1,2,9,2,-1,1,1,1,-27,2,9,2,-1,2,1,1,1,2,2,2,-1,4,k,2,-1,4,9,2,-1,9,1,1,-1,3,2,1,8cf,2,1,1,-1,5,5,2,-1,1,1,1,8bj,1,1,1,8bg,1,1,1,8bi,1,1,1,-5u,1,1,1,-5q,2,2,1,-5p,2,1,1,-5m,2,1,1,-5n,1,1,1,wnj,4,1,1,-5p,1,1,1,wnf,2,1,1,-5r,2,1,1,wmg,1,1,1,wn8,2,1,1,-5t,1,1,1,-5v,1,1,1,wn8,1,1,1,8af,1,1,1,wn5,3,1,1,-5v,2,1,1,8al,1,1,1,-5x,3,1,1,-5y,8,1,1,89z,3,1,1,-62,2,1,1,wn7,1,1,1,-62,4,1,1,wmi,1,1,1,-62,1,1,1,-1x,1,2,1,-61,1,1,1,-1z,6,1,1,-63,b,1,1,wlx,1,1,1,wlu,4n,1,1,2c,18,2,2,-1,4,1,1,-1,4,3,1,3m,1b,1,1,-12,1,3,1,-11,2,h,1,-w,1,1,1,-v,1,9,1,-w,1,1,1,-1s,1,2,1,-1r,2,1,1,-1q,1,1,1,-1l,4,1,1,-1b,1,1,1,-1i,1,1,1,-8,2,c,2,-1,1,1,1,-2e,1,1,1,-28,1,1,1,7,1,1,1,-38,2,1,1,-2o,3,1,1,-1,3,1,1,-1,1h,w,1,-w,1,g,1,-28,2,h,2,-1,a,r,2,-1,3,7,2,-1,1,1,1,-f,2,1c,2,-1,1e,12,1,-1c,2uq,6,1,-8,1oj,1,1,-4tq,1,1,1,-4tp,1,1,1,-4tg,1,2,1,-4te,1,1,1,-4tf,1,1,1,-4t8,1,1,1,-4rp,1,1,1,r7m,6p,1,1,r9g,4,1,1,2xy,h,1,1,raw,37,23,2,-1,6,1,1,-1n,6,1c,2,-1,1,8,1,8,9,6,1,8,b,8,1,8,9,8,1,8,9,6,1,8,c,4,2,8,9,8,1,8,9,2,1,22,1,4,1,2e,1,2,1,2s,1,2,1,3k,1,2,1,34,1,2,1,3i,3,8,1,8,9,8,1,8,9,8,1,8,9,2,1,8,2,1,1,9,b,1,1,-5k5,5,1,1,9,d,2,1,8,f,2,1,8,4,1,1,7,e,1,1,9,9n,1,1,-s,y,g,1,-g,5,1,1,-1,ng,q,1,-q,1fr,1c,1,-1c,2,1,1,-1,4,1,1,-8bv,1,1,1,-8bs,2,3,2,-1,7,1,1,-1,3,1,1,-1,b,1e,2,-1,9,2,2,-1,5,1,1,-1,d,12,1,-5ls,2,1,1,-5ls,6,1,1,-5ls,nx0,n,2,-1,k,e,2,-1,3s,7,2,-1,4,v,2,-1,b,2,2,-1,3,5,2,-1,5,1,1,-1,5,2,2,-1,1,1,1,1c,3,a,2,-1,c,8,2,-1,5,2,2,-1,7,1,1,-1,6,2,2,-1,t,1,1,-1,nx,1,1,-ps,t,28,1,-tzk,ghu,q,1,-w,y6,14,1,-14,3t,10,1,-14,4c,b,1,-13,2,f,1,-13,2,7,1,-13,2,2,1,-13,1dw,1f,1,-1s,2by,w,1,-w,gw1,w,1,-w,o83,y,1,-y',
    multi_title: '67=2b.37,95=jg.26,ds=22.lo,pc=pl.lk.ld,q8=px.lk.ld,13b=111.136,61i=20.mp,61j=2c.lk,61k=2f.lm,61l=2h.lm,61m=1t.ji,66o=px.lv,66q=px.lv.lc,66s=px.lv.ld,66u=px.lv.n6,69e=69m.n9,69g=p2.n9,69i=pd.n6,69j=pd.n6.n9,69u=6a2.n9,69w=p5.n9,69y=pj.n6,69z=pj.n6.n9,6aa=pl.lk.lc,6ab=pl.lk.ld,6ae=pl.n6,6af=pl.lk.n6,6aq=px.lk.lc,6ar=px.lk.ld,6as=pt.lv,6au=px.n6,6av=px.lk.n6,6b6=6be.n9,6b8=pb.n9,6ba=q1.n6,6bb=q1.n6.n9,1dkw=1y.2u,1dkx=1y.2x,1dky=1y.30,1dkz=1y.2u.2x,1dl0=1y.2u.30,1dl1=2b.38,1dl2=2b.38,1dlf=11g.12u,1dlg=11g.12d,1dlh=11g.12j,1dli=11q.12u,1dlj=11g.12l',
    map_casefold: '1t,q,1,w,2j,1,1,lj,b,n,1,w,2,7,1,w,y,o,2,1,4,3,2,1,3,8,2,1,3,n,2,1,2,1,1,-3d,1,3,2,1,2,1,1,-7g,2,1,1,5u,1,2,2,1,2,1,1,5q,1,1,1,1,2,2,1,5p,1,1,1,1,3,1,1,27,1,1,1,5m,1,1,1,5n,1,1,1,1,2,1,1,5p,1,1,1,5r,2,1,1,5v,1,1,1,5t,1,1,1,1,4,1,1,5v,1,1,1,5x,2,1,1,5y,1,3,2,1,2,1,1,62,1,1,1,1,2,1,1,62,3,1,1,1,2,1,1,62,1,1,1,1,2,2,1,61,1,2,2,1,2,1,1,63,1,1,1,1,4,1,1,1,8,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1,9,2,1,3,9,2,1,3,1,1,2,1,2,2,1,2,1,1,-2p,1,1,1,-1k,1,k,2,1,2,1,1,-3m,2,9,2,1,8,1,1,8bv,1,1,1,1,2,1,1,-4j,1,1,1,8bs,3,1,1,1,2,1,1,-5f,1,1,1,1x,1,1,1,1z,1,5,2,1,6v,1,1,38,17,2,2,1,4,1,1,1,9,1,1,38,7,1,1,12,2,3,1,11,2,1,1,1s,2,2,1,1r,2,h,1,w,2,9,1,w,n,1,1,1,d,1,1,8,1,1,1,-u,1,1,1,-p,4,1,1,-f,1,1,1,-m,2,c,2,1,2,1,1,-1i,1,1,1,-1c,3,1,1,-1o,1,1,1,-1s,2,1,1,1,2,1,1,-7,1,1,1,1,3,3,1,-3m,1,g,1,28,1,w,1,w,1d,h,2,1,a,r,2,1,2,1,1,f,1,7,2,1,3,1c,2,1,3,12,1,1c,28a,12,1,5ls,2,1,1,5ls,6,1,1,5ls,mj,6,1,-8,1oj,1,1,-4su,1,1,1,-4st,1,1,1,-4sk,1,2,1,-4si,1,1,1,-4sj,1,1,1,-4sc,1,1,1,-4ro,1,1,1,r7n,8,17,1,-2bk,3,3,1,-2bk,8x,23,2,1,7,1,1,-1m,5,1c,2,1,a,8,1,-8,9,6,1,-8,b,8,1,-8,9,8,1,-8,9,6,1,-8,c,4,2,-8,9,8,1,-8,21,2,1,-8,1,2,1,-22,3,1,1,-5j9,a,4,1,-2e,d,2,1,-8,1,2,1,-2s,d,2,1,-8,1,2,1,-34,1,1,1,-7,c,2,1,-3k,1,2,1,-3i,8b,1,1,-5st,4,1,1,-6gv,1,1,1,-6di,7,1,1,s,1a,g,1,g,k,1,1,1,mr,q,1,q,1f5,1c,1,1c,1d,1,1,1,2,1,1,-8af,1,1,1,-2xy,1,1,1,-89z,3,3,2,1,2,1,1,-8bg,1,1,1,-8al,1,1,1,-8bj,1,1,1,-8bi,2,1,1,1,3,1,1,1,9,2,1,-8cf,1,1e,2,1,9,2,2,1,5,1,1,1,nym,n,2,1,k,e,2,1,3s,7,2,1,4,v,2,1,b,2,2,1,2,1,1,-r9g,1,5,2,1,5,1,1,1,2,1,1,-wmg,3,2,2,1,4,a,2,1,2,1,1,-wn8,1,1,1,-wnj,1,1,1,-wnf,1,1,1,-wn5,1,1,1,-wn8,2,1,1,-wlu,1,1,1,-wmi,1,1,1,-wlx,1,1,1,ps,1,8,2,1,2,1,1,-1c,1,1,1,-wn7,1,1,1,-raw,1,2,2,1,7,1,1,1,6,2,2,1,t,1,1,1,or,28,1,-tzk,ggy,q,1,w,xy,14,1,14,3t,10,1,14,4d,b,1,13,2,f,1,13,2,7,1,13,2,2,1,13,1d7,1f,1,1s,2cu,w,1,w,gw1,w,1,w,o81,y,1,y',
    multi_casefold: '67=37.37,8g=2x.lj,95=jg.32,ds=2y.lo,pc=qh.lk.ld,q8=qt.lk.ld,13b=12d.136,61i=2w.mp,61j=38.lk,61k=3b.lm,61l=3d.lm,61m=2p.ji,61q=37.37,66o=qt.lv,66q=qt.lv.lc,66s=qt.lv.ld,66u=qt.lv.n6,680=64g.qh,681=64h.qh,682=64i.qh,683=64j.qh,684=64k.qh,685=64l.qh,686=64m.qh,687=64n.qh,688=64g.qh,689=64h.qh,68a=64i.qh,68b=64j.qh,68c=64k.qh,68d=64l.qh,68e=64m.qh,68f=64n.qh,68g=65c.qh,68h=65d.qh,68i=65e.qh,68j=65f.qh,68k=65g.qh,68l=65h.qh,68m=65i.qh,68n=65j.qh,68o=65c.qh,68p=65d.qh,68q=65e.qh,68r=65f.qh,68s=65g.qh,68t=65h.qh,68u=65i.qh,68v=65j.qh,68w=674.qh,68x=675.qh,68y=676.qh,68z=677.qh,690=678.qh,691=679.qh,692=67a.qh,693=67b.qh,694=674.qh,695=675.qh,696=676.qh,697=677.qh,698=678.qh,699=679.qh,69a=67a.qh,69b=67b.qh,69e=67k.qh,69f=q9.qh,69g=q4.qh,69i=q9.n6,69j=q9.n6.qh,69o=q9.qh,69u=67o.qh,69v=qf.qh,69w=q6.qh,69y=qf.n6,69z=qf.n6.qh,6a4=qf.qh,6aa=qh.lk.lc,6ab=qh.lk.ld,6ae=qh.n6,6af=qh.lk.n6,6aq=qt.lk.lc,6ar=qt.lk.ld,6as=qp.lv,6au=qt.n6,6av=qt.lk.n6,6b6=67w.qh,6b7=qx.qh,6b8=r2.qh,6ba=qx.n6,6bb=qx.n6.qh,6bg=qx.qh,1dkw=2u.2u,1dkx=2u.2x,1dky=2u.30,1dkz=2u.2u.2x,1dl0=2u.2u.30,1dl1=37.38,1dl2=37.38,1dlf=12s.12u,1dlg=12s.12d,1dlh=12s.12j,1dli=132.12u,1dlj=12s.12l',
  });
  // </tablas-unicode>

  // ------------------------------------------------------------------ errores con el tipo de Python

  /** Error con el nombre de la excepción de Python en `pyTipo` (ValueError, TypeError, OverflowError…). */
  class PyError extends Error {
    constructor(pyTipo, mensaje) {
      super(mensaje);
      this.name = 'PyError';
      this.pyTipo = pyTipo;
    }
  }
  const error = (tipo, msg) => new PyError(tipo, msg);

  // ------------------------------------------------------------------ float

  /**
   * Marca de float de Python para valores que en JS serían enteros (3.0). Compatible con el envoltorio de
   * engine/fuente.js y parity/lib/normalize.mjs ({ [Symbol.for('R2.py.float')]: true, valor }): tiene esa marca y
   * `valor`, y todas las funciones de R2.py aceptan también ese envoltorio.
   */
  const MARCA_FLOAT = Symbol.for('R2.py.float');
  class PyFloat {
    constructor(v) { this.v = +v; }
    get valor() { return this.v; }
    get [MARCA_FLOAT]() { return true; }
    valueOf() { return this.v; }
    toString() { return reprFloat(this.v); }
    toJSON() { return this.v; }
  }
  /** ¿Envoltorio de float (PyFloat o { [MARCA_FLOAT]: true, valor })? */
  const esFloatEnvuelto = (v) => v instanceof PyFloat || (v !== null && typeof v === 'object' && v[MARCA_FLOAT] === true);
  const F = (x) => (x instanceof PyFloat ? x : new PyFloat(esFloatEnvuelto(x) ? x.valor : x));
  const esFloat = (v) => (typeof v === 'number' && !Number.isInteger(v)) || esFloatEnvuelto(v);
  const num = (v) => (v instanceof PyFloat ? v.v : (esFloatEnvuelto(v) ? +v.valor : v));

  /** Descompone un número finito distinto de 0 en |x| = m · 2^e (m BigInt). */
  const DV = new DataView(new ArrayBuffer(8));
  function descomponer(x) {
    DV.setFloat64(0, x);
    const hi = DV.getUint32(0), lo = DV.getUint32(4);
    const exp = (hi >>> 20) & 0x7ff;
    const m = (BigInt(hi & 0xfffff) << 32n) | BigInt(lo);
    if (exp === 0) return [m, -1074];
    return [m | (1n << 52n), exp - 1075];
  }
  const signoNegativo = (x) => x < 0 || (x === 0 && 1 / x < 0);

  const POT10 = new Map();
  function pot10(n) {
    let p = POT10.get(n);
    if (p === undefined) { p = 10n ** BigInt(n); POT10.set(n, p); }
    return p;
  }

  /** |x| · 10^nd redondeado a entero con mitad a par, sobre el valor binario exacto (BigInt). */
  function escaladoExacto(x, nd) {
    if (x === 0) return 0n;
    const [m, e] = descomponer(x);
    let n = m, d = 1n;
    if (e >= 0) n <<= BigInt(e); else d <<= BigInt(-e);
    if (nd >= 0) n *= pot10(nd); else d *= pot10(-nd);
    let q = n / d;
    const dos = (n - q * d) << 1n;
    if (dos > d || (dos === d && (q & 1n) === 1n)) q += 1n;
    return q;
  }

  /**
   * Cifras de |x| redondeado a nd decimales (nd ≥ 0) con mitad a par: cadena «123.45» sin signo. Es lo que dan
   * _Py_dg_dtoa(modo 3) y format(x, '.Nf'). Camino rápido: toFixed es exacto salvo en los empates (redondea
   * hacia arriba), que solo pueden darse si x · 2^(nd+1) es entero.
   */
  function cifrasFijas(x, nd, forzarExacto = false) {
    const a = Math.abs(x);
    if (!forzarExacto && nd <= 100 && a < 1e21 && !Number.isInteger(a * 2 ** (nd + 1))) return a.toFixed(nd);
    const q = escaladoExacto(a, nd).toString();
    if (nd === 0) return q;
    const s = q.length <= nd ? '0'.repeat(nd - q.length + 1) + q : q;
    return s.slice(0, s.length - nd) + '.' + s.slice(s.length - nd);
  }

  const NDIGITS_MAX = 323, NDIGITS_MIN = -308;

  /**
   * round(x) y round(x, ndigits) de Python para float. Sin ndigits (null/undefined) devuelve un entero (number, o
   * BigInt si no cabe exacto) y lanza ValueError/OverflowError con NaN/inf. Con ndigits devuelve number (float):
   * inf/nan se devuelven igual y lanza OverflowError si el resultado se sale de float.
   */
  function pyRound(x, ndigits = null, forzarExacto = false) {
    x = num(x);
    if (ndigits === null || ndigits === undefined) {
      if (x !== x) throw error('ValueError', 'cannot convert float NaN to integer');
      if (!Number.isFinite(x)) throw error('OverflowError', 'cannot convert float infinity to integer');
      let r = Math.trunc(x);
      const d = Math.abs(x - r); // exacto: x y su parte entera comparten exponente
      if (d > 0.5 || (d === 0.5 && r % 2 !== 0)) r += x < 0 ? -1 : 1;
      if (r === 0) return 0;
      return Number.isSafeInteger(r) ? r : BigInt(r);
    }
    if (typeof ndigits !== 'number' || !Number.isInteger(ndigits)) throw error('TypeError', 'ndigits debe ser entero');
    if (!Number.isFinite(x) || x === 0) return x;
    if (ndigits > NDIGITS_MAX) return x;
    if (ndigits < NDIGITS_MIN) return signoNegativo(x) ? -0 : 0;
    let r;
    if (!forzarExacto && ndigits >= 0 && ndigits <= 100 && Math.abs(x) < 1e21 &&
        !Number.isInteger(x * 2 ** (ndigits + 1))) {
      r = Number(x.toFixed(ndigits));
    } else {
      const q = escaladoExacto(Math.abs(x), ndigits);
      r = Number(`${x < 0 ? '-' : ''}${q}e${-ndigits}`);
    }
    if (r === 0) return x < 0 ? -0 : 0;
    if (!Number.isFinite(r)) throw error('OverflowError', 'rounded value too large to represent');
    return r;
  }

  /** round(n, ndigits) de Python para int (number entero o BigInt): mitad a par con ndigits negativos. */
  function pyRoundInt(n, ndigits = null) {
    if (ndigits === null || ndigits === undefined || ndigits >= 0) return n;
    const b = BigInt(n), p = pot10(-ndigits);
    const neg = b < 0n, a = neg ? -b : b;
    let q = a / p;
    const dos = (a - q * p) * 2n;
    if (dos > p || (dos === p && (q & 1n) === 1n)) q += 1n;
    const r = (neg ? -q : q) * p;
    return typeof n === 'bigint' ? r : (r >= BigInt(Number.MIN_SAFE_INTEGER) && r <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(r) : r);
  }

  /** repr(float) de Python: el más corto que vuelve al mismo valor; exponente si decpt ≤ -4 o > 16. */
  function reprFloat(x) {
    x = num(x);
    if (x !== x) return 'nan';
    if (x === Infinity) return 'inf';
    if (x === -Infinity) return '-inf';
    if (x === 0) return 1 / x < 0 ? '-0.0' : '0.0';
    let s = String(x), signo = '';
    if (s[0] === '-') { signo = '-'; s = s.slice(1); }
    let exp = 0;
    const ie = s.indexOf('e');
    if (ie >= 0) { exp = +s.slice(ie + 1); s = s.slice(0, ie); }
    const ip = s.indexOf('.');
    let dig = ip >= 0 ? s.slice(0, ip) + s.slice(ip + 1) : s;
    let decpt = (ip >= 0 ? ip : s.length) + exp;
    let k = 0;
    while (k < dig.length - 1 && dig.charCodeAt(k) === 0x30) k++;
    dig = dig.slice(k);
    decpt -= k;
    let z = dig.length;
    while (z > 1 && dig.charCodeAt(z - 1) === 0x30) z--;
    dig = dig.slice(0, z);
    if (decpt > -4 && decpt <= 16) {
      if (decpt <= 0) return `${signo}0.${'0'.repeat(-decpt)}${dig}`;
      if (decpt >= dig.length) return `${signo}${dig}${'0'.repeat(decpt - dig.length)}.0`;
      return `${signo}${dig.slice(0, decpt)}.${dig.slice(decpt)}`;
    }
    const e = decpt - 1;
    const mant = dig.length > 1 ? `${dig[0]}.${dig.slice(1)}` : dig;
    return `${signo}${mant}e${e < 0 ? '-' : '+'}${String(Math.abs(e)).padStart(2, '0')}`;
  }

  /** str(int) para number entero o BigInt. */
  function intStr(n) {
    if (typeof n === 'bigint') return n.toString();
    if (Math.abs(n) < 1e21) return String(n === 0 ? 0 : n);
    return BigInt(n).toString();
  }

  // ------------------------------------------------------------------ tablas Unicode

  const B = { upper: 1, lower: 2, title: 4, cased: 8, case_ignorable: 16, alpha: 32, decimal: 64, digit: 128,
    numeric: 256, space: 512, printable: 1024 };
  const ALNUM = B.alpha | B.decimal | B.digit | B.numeric;

  function decodificarTramos(texto) {
    if (!texto) return new Int32Array(0);
    const n = texto.split(',');
    const t = new Int32Array(n.length);
    let v = 0;
    for (let i = 0; i < n.length; i++) { v += parseInt(n[i], 36); t[i] = v; }
    return t;
  }

  let U = null; // tablas decodificadas (perezosas)

  function unicode() {
    if (U) return U;
    const tramos = {};
    const bmp = new Uint16Array(0x10000);
    const puntos = new Set([0x10000, 0x110000]);
    for (const k of Object.keys(B)) {
      const t = tramos[k] = decodificarTramos(TABLAS[k]);
      for (let i = 0; i < t.length; i += 2) {
        const a = t[i], b = t[i + 1];
        for (let cp = a; cp <= Math.min(b, 0xffff); cp++) bmp[cp] |= B[k];
        if (b >= 0x10000) { puntos.add(Math.max(a, 0x10000)); puntos.add(b + 1); }
      }
    }
    const ini = Int32Array.from([...puntos].sort((x, y) => x - y));
    const astral = new Uint16Array(ini.length);
    const pos = new Map();
    ini.forEach((p, i) => pos.set(p, i));
    for (const k of Object.keys(B)) {
      const t = tramos[k];
      for (let i = 0; i < t.length; i += 2) {
        if (t[i + 1] < 0x10000) continue;
        for (let j = pos.get(Math.max(t[i], 0x10000)); ini[j] <= t[i + 1]; j++) astral[j] |= B[k];
      }
    }
    const mapas = {};
    for (const k of ['lower', 'upper', 'title', 'casefold']) mapas[k] = decodificarMapa(TABLAS['map_' + k], TABLAS['multi_' + k]);
    U = { tramos, bmp, ini, astral, mapas, nativo: {} };
    return U;
  }

  /** Banderas de un punto de código. */
  function banderas(cp) {
    const u = U || unicode();
    if (cp < 0x10000) return u.bmp[cp];
    const t = u.ini;
    let lo = 0, hi = t.length - 1;
    while (lo < hi) {
      const m = (lo + hi + 1) >> 1;
      if (t[m] <= cp) lo = m; else hi = m - 1;
    }
    return u.astral[lo];
  }

  const MULTI = 0x7fffffff;

  function decodificarMapa(corridas, multiples) {
    const bmp = new Int32Array(0x10000);
    const aIni = [], aN = [], aPaso = [], aDelta = [];
    const toks = corridas ? corridas.split(',') : [];
    let prev = 0;
    for (let i = 0; i < toks.length; i += 4) {
      const c = prev + parseInt(toks[i], 36), n = parseInt(toks[i + 1], 36);
      const paso = parseInt(toks[i + 2], 36), d = parseInt(toks[i + 3], 36);
      for (let j = 0; j < n; j++) {
        const cp = c + j * paso;
        if (cp < 0x10000) bmp[cp] = d;
      }
      if (c + (n - 1) * paso >= 0x10000) { aIni.push(c); aN.push(n); aPaso.push(paso); aDelta.push(d); }
      prev = c + (n - 1) * paso;
    }
    const multi = new Map();
    if (multiples) {
      for (const e of multiples.split(',')) {
        const [cp, s] = e.split('=');
        const c = parseInt(cp, 36);
        multi.set(c, s ? String.fromCodePoint(...s.split('.').map((x) => parseInt(x, 36))) : '');
        if (c < 0x10000) bmp[c] = MULTI;
      }
    }
    return { bmp, aIni, aN, aPaso, aDelta, multi };
  }

  /** Mapeo de un punto de código (cadena) o null si no cambia. */
  function mapearCp(mapa, cp) {
    if (cp < 0x10000) {
      const d = mapa.bmp[cp];
      if (d === 0) return null;
      if (d === MULTI) return mapa.multi.get(cp);
      return String.fromCodePoint(cp + d);
    }
    const m = mapa.multi.get(cp);
    if (m !== undefined) return m;
    const t = mapa.aIni;
    for (let i = 0; i < t.length; i++) { // pocas corridas astrales
      const c = t[i];
      if (cp < c) break;
      const off = cp - c;
      if (off % mapa.aPaso[i] === 0 && off / mapa.aPaso[i] < mapa.aN[i]) return String.fromCodePoint(cp + mapa.aDelta[i]);
    }
    return null;
  }

  /** Rangos [a0, b0, a1, b1, …] (inclusivos) de una propiedad: upper, lower, title, cased, case_ignorable, alpha,
   * decimal, digit, numeric, space, printable. Para construir clases de expresiones regulares iguales a Python. */
  function rangosUnicode(nombre) {
    const t = unicode().tramos[nombre];
    if (!t) throw new Error(`rangosUnicode: propiedad desconocida «${nombre}»`);
    return t.slice();
  }

  // ------------------------------------------------------------------ puntos de código

  const esAlto = (u) => u >= 0xd800 && u <= 0xdbff;
  const esBajo = (u) => u >= 0xdc00 && u <= 0xdfff;
  const SUSTITUTO = /[\uD800-\uDFFF]/;

  /** Puntos de código de una cadena (los sustitutos sueltos cuentan como uno, como en Python). */
  function cps(s) {
    const r = [];
    for (let i = 0; i < s.length;) {
      const cp = s.codePointAt(i);
      r.push(cp);
      i += cp > 0xffff ? 2 : 1;
    }
    return r;
  }

  /** len() de Python. */
  function pyLen(s) {
    if (!SUSTITUTO.test(s)) return s.length;
    let n = 0;
    for (let i = 0; i < s.length; i++) {
      n++;
      if (esAlto(s.charCodeAt(i)) && i + 1 < s.length && esBajo(s.charCodeAt(i + 1))) i++;
    }
    return n;
  }

  /** Punto de código que termina en la posición i (exclusiva) y su longitud en unidades. */
  function cpAntes(s, i) {
    const u = s.charCodeAt(i - 1);
    if (esBajo(u) && i >= 2 && esAlto(s.charCodeAt(i - 2))) return [s.codePointAt(i - 2), 2];
    return [u, 1];
  }

  // ------------------------------------------------------------------ predicados de str

  function predicadoTodos(s, bit) {
    if (s.length === 0) return false;
    for (let i = 0; i < s.length;) {
      const cp = s.codePointAt(i);
      if (!(banderas(cp) & bit)) return false;
      i += cp > 0xffff ? 2 : 1;
    }
    return true;
  }

  /** ¿Es un solo punto de código? Devuelve el cp o -1. */
  function unico(s) {
    if (s.length === 1) return s.charCodeAt(0);
    if (s.length === 2) { const cp = s.codePointAt(0); if (cp > 0xffff) return cp; }
    return -1;
  }

  function isupper(s) {
    const c1 = unico(s);
    if (c1 >= 0) return (banderas(c1) & B.upper) !== 0;
    let cased = false;
    for (let i = 0; i < s.length;) {
      const cp = s.codePointAt(i), f = banderas(cp);
      if (f & (B.lower | B.title)) return false;
      if (!cased && (f & B.upper)) cased = true;
      i += cp > 0xffff ? 2 : 1;
    }
    return cased;
  }

  function islower(s) {
    const c1 = unico(s);
    if (c1 >= 0) return (banderas(c1) & B.lower) !== 0;
    let cased = false;
    for (let i = 0; i < s.length;) {
      const cp = s.codePointAt(i), f = banderas(cp);
      if (f & (B.upper | B.title)) return false;
      if (!cased && (f & B.lower)) cased = true;
      i += cp > 0xffff ? 2 : 1;
    }
    return cased;
  }

  function istitle(s) {
    const c1 = unico(s);
    if (c1 >= 0) return (banderas(c1) & (B.title | B.upper)) !== 0;
    let cased = false, prev = false;
    for (let i = 0; i < s.length;) {
      const cp = s.codePointAt(i), f = banderas(cp);
      if (f & (B.upper | B.title)) {
        if (prev) return false;
        prev = true; cased = true;
      } else if (f & B.lower) {
        if (!prev) return false;
        prev = true; cased = true;
      } else prev = false;
      i += cp > 0xffff ? 2 : 1;
    }
    return cased;
  }

  const isspace = (s) => predicadoTodos(s, B.space);
  const isalpha = (s) => predicadoTodos(s, B.alpha);
  const isdecimal = (s) => predicadoTodos(s, B.decimal);
  const isdigit = (s) => predicadoTodos(s, B.digit | B.decimal);
  const isnumeric = (s) => predicadoTodos(s, B.numeric | B.digit | B.decimal);
  const isalnum = (s) => predicadoTodos(s, ALNUM);
  const isprintable = (s) => s.length === 0 || predicadoTodos(s, B.printable);
  const isascii = (s) => /^[\x00-\x7f]*$/.test(s);

  /** Predicados por punto de código (banderas de Python). */
  const cp = {
    isupper: (c) => (banderas(c) & B.upper) !== 0,
    islower: (c) => (banderas(c) & B.lower) !== 0,
    istitle: (c) => (banderas(c) & (B.title | B.upper)) !== 0,
    iscased: (c) => (banderas(c) & B.cased) !== 0,
    iscaseignorable: (c) => (banderas(c) & B.case_ignorable) !== 0,
    isalpha: (c) => (banderas(c) & B.alpha) !== 0,
    isdecimal: (c) => (banderas(c) & B.decimal) !== 0,
    isdigit: (c) => (banderas(c) & (B.digit | B.decimal)) !== 0,
    isnumeric: (c) => (banderas(c) & (B.numeric | B.digit | B.decimal)) !== 0,
    isalnum: (c) => (banderas(c) & ALNUM) !== 0,
    isspace: (c) => (banderas(c) & B.space) !== 0,
    isprintable: (c) => (banderas(c) & B.printable) !== 0,
  };

  // ------------------------------------------------------------------ mayúsculas y minúsculas

  /** handle_capital_sigma: ¿la Σ en la posición i es final? */
  function sigmaFinal(s, i) {
    let j = i, antes = -1;
    while (j > 0) {
      const [c, n] = cpAntes(s, j);
      j -= n;
      if (!(banderas(c) & B.case_ignorable)) { antes = c; break; }
    }
    if (antes < 0 || !(banderas(antes) & B.cased)) return false;
    for (let k = i + 1; k < s.length;) {
      const c = s.codePointAt(k);
      if (!(banderas(c) & B.case_ignorable)) return !(banderas(c) & B.cased);
      k += c > 0xffff ? 2 : 1;
    }
    return true;
  }

  function mapearCadena(s, mapa, conSigma) {
    let out = '', desde = 0;
    for (let i = 0; i < s.length;) {
      const c = s.codePointAt(i), n = c > 0xffff ? 2 : 1;
      const m = conSigma && c === 0x3a3 ? (sigmaFinal(s, i) ? 'ς' : 'σ') : mapearCp(mapa, c);
      if (m !== null) { out += s.slice(desde, i) + m; desde = i + n; }
      i += n;
    }
    return desde === 0 ? s : out + s.slice(desde);
  }

  /** Tabla por unidad BMP: 1 si el motor da el mismo mapeo que Python y no depende del contexto. */
  function tablaNativa(nombre) {
    const u = unicode();
    if (u.nativo[nombre]) return u.nativo[nombre];
    const mapa = u.mapas[nombre];
    const ok = new Uint8Array(0x10000);
    for (let c = 0; c < 0x10000; c++) {
      if ((c >= 0xd800 && c <= 0xdfff) || c === 0x3a3) continue;
      const ch = String.fromCharCode(c);
      const py = mapearCp(mapa, c) ?? ch;
      const js = nombre === 'upper' ? ch.toUpperCase() : ch.toLowerCase();
      ok[c] = js === py ? 1 : 0;
    }
    return (u.nativo[nombre] = ok);
  }

  function todasNativas(s, ok) {
    for (let i = 0; i < s.length; i++) if (!ok[s.charCodeAt(i)]) return false;
    return true;
  }

  const ASCII = /^[\x00-\x7f]*$/;

  function lower(s) {
    if (ASCII.test(s) || todasNativas(s, tablaNativa('lower'))) return s.toLowerCase();
    return mapearCadena(s, unicode().mapas.lower, true);
  }

  function upper(s) {
    if (ASCII.test(s) || todasNativas(s, tablaNativa('upper'))) return s.toUpperCase();
    return mapearCadena(s, unicode().mapas.upper, false);
  }

  function casefold(s) {
    if (ASCII.test(s) || todasNativas(s, tablaNativa('casefold'))) return s.toLowerCase();
    return mapearCadena(s, unicode().mapas.casefold, false);
  }

  function title(s) {
    const u = unicode();
    let out = '', prev = false;
    for (let i = 0; i < s.length;) {
      const c = s.codePointAt(i), n = c > 0xffff ? 2 : 1;
      let m;
      if (prev) m = c === 0x3a3 ? (sigmaFinal(s, i) ? 'ς' : 'σ') : mapearCp(u.mapas.lower, c);
      else m = mapearCp(u.mapas.title, c);
      out += m === null ? s.slice(i, i + n) : m;
      prev = (banderas(c) & B.cased) !== 0;
      i += n;
    }
    return out;
  }

  function capitalize(s) {
    if (s.length === 0) return s;
    const u = unicode();
    const c = s.codePointAt(0), n = c > 0xffff ? 2 : 1;
    const m = mapearCp(u.mapas.title, c);
    const resto = s.slice(n);
    let r = '';
    let desde = 0;
    for (let i = 0; i < resto.length;) {
      const d = resto.codePointAt(i), k = d > 0xffff ? 2 : 1;
      const x = d === 0x3a3 ? (sigmaFinal(s, i + n) ? 'ς' : 'σ') : mapearCp(u.mapas.lower, d);
      if (x !== null) { r += resto.slice(desde, i) + x; desde = i + k; }
      i += k;
    }
    return (m === null ? s.slice(0, n) : m) + (desde === 0 ? resto : r + resto.slice(desde));
  }

  // ------------------------------------------------------------------ strip, split, partition…

  /** indexOf que no corta un par sustituto (Python compara puntos de código). */
  function buscar(s, sub, desde) {
    const bordeIni = sub.length > 0 && esBajo(sub.charCodeAt(0));
    const bordeFin = sub.length > 0 && esAlto(sub.charCodeAt(sub.length - 1));
    let i = s.indexOf(sub, desde);
    if (!bordeIni && !bordeFin) return i;
    while (i >= 0 && !limpio(s, sub, i, bordeIni, bordeFin)) i = s.indexOf(sub, i + 1);
    return i;
  }

  function buscarAtras(s, sub, hasta) {
    const bordeIni = sub.length > 0 && esBajo(sub.charCodeAt(0));
    const bordeFin = sub.length > 0 && esAlto(sub.charCodeAt(sub.length - 1));
    let i = s.lastIndexOf(sub, hasta);
    if (!bordeIni && !bordeFin) return i;
    while (i >= 0 && !limpio(s, sub, i, bordeIni, bordeFin)) i = i === 0 ? -1 : s.lastIndexOf(sub, i - 1);
    return i;
  }

  function limpio(s, sub, i, bordeIni, bordeFin) {
    if (bordeIni && i > 0 && esAlto(s.charCodeAt(i - 1))) return false;
    if (bordeFin && i + sub.length < s.length && esBajo(s.charCodeAt(i + sub.length))) return false;
    return true;
  }

  function conjuntoCps(chars) {
    return new Set(cps(chars));
  }

  function lstrip(s, chars = null) {
    let i = 0;
    if (chars === null || chars === undefined) {
      while (i < s.length && (banderas(s.charCodeAt(i)) & B.space)) i++;
    } else {
      const set = conjuntoCps(chars);
      while (i < s.length) {
        const c = s.codePointAt(i);
        if (!set.has(c)) break;
        i += c > 0xffff ? 2 : 1;
      }
    }
    return i === 0 ? s : s.slice(i);
  }

  function rstrip(s, chars = null) {
    let z = s.length;
    if (chars === null || chars === undefined) {
      while (z > 0 && (banderas(s.charCodeAt(z - 1)) & B.space)) z--;
    } else {
      const set = conjuntoCps(chars);
      while (z > 0) {
        const [c, n] = cpAntes(s, z);
        if (!set.has(c)) break;
        z -= n;
      }
    }
    return z === s.length ? s : s.slice(0, z);
  }

  const strip = (s, chars = null) => rstrip(lstrip(s, chars), chars);

  const esp = (s, i) => (banderas(s.charCodeAt(i)) & B.space) !== 0;
  const maxCuenta = (maxsplit) => (maxsplit === null || maxsplit === undefined || maxsplit < 0 ? Infinity : maxsplit);

  /** str.split(sep=None, maxsplit=-1). */
  function split(s, sep = null, maxsplit = -1) {
    let cuenta = maxCuenta(maxsplit);
    const r = [];
    if (sep === null || sep === undefined) {
      const n = s.length;
      let i = 0;
      while (cuenta-- > 0) {
        while (i < n && esp(s, i)) i++;
        if (i === n) break;
        const j = i;
        i++;
        while (i < n && !esp(s, i)) i++;
        r.push(s.slice(j, i));
      }
      if (i < n) {
        while (i < n && esp(s, i)) i++;
        if (i !== n) r.push(s.slice(i));
      }
      return r;
    }
    if (sep.length === 0) throw error('ValueError', 'empty separator');
    let desde = 0;
    while (cuenta-- > 0) {
      const k = buscar(s, sep, desde);
      if (k < 0) break;
      r.push(s.slice(desde, k));
      desde = k + sep.length;
    }
    r.push(s.slice(desde));
    return r;
  }

  /** str.rsplit(sep=None, maxsplit=-1). */
  function rsplit(s, sep = null, maxsplit = -1) {
    let cuenta = maxCuenta(maxsplit);
    const r = [];
    if (sep === null || sep === undefined) {
      let i = s.length - 1;
      while (cuenta-- > 0) {
        while (i >= 0 && esp(s, i)) i--;
        if (i < 0) break;
        const j = i;
        i--;
        while (i >= 0 && !esp(s, i)) i--;
        r.push(s.slice(i + 1, j + 1));
      }
      if (i >= 0) {
        while (i >= 0 && esp(s, i)) i--;
        if (i >= 0) r.push(s.slice(0, i + 1));
      }
      return r.reverse();
    }
    if (sep.length === 0) throw error('ValueError', 'empty separator');
    let hasta = s.length;
    while (cuenta-- > 0) {
      if (hasta < sep.length) break;
      const k = buscarAtras(s, sep, hasta - sep.length);
      if (k < 0) break;
      r.push(s.slice(k + sep.length, hasta));
      hasta = k;
    }
    r.push(s.slice(0, hasta));
    return r.reverse();
  }

  const SALTO = (u) => (u >= 0x0a && u <= 0x0d) || (u >= 0x1c && u <= 0x1e) || u === 0x85 || u === 0x2028 || u === 0x2029;

  /** str.splitlines(keepends=False). */
  function splitlines(s, keepends = false) {
    const r = [], n = s.length;
    let i = 0, j = 0;
    while (i < n) {
      while (i < n && !SALTO(s.charCodeAt(i))) i++;
      let eol = i;
      if (i < n) {
        if (s.charCodeAt(i) === 0x0d && i + 1 < n && s.charCodeAt(i + 1) === 0x0a) i += 2; else i++;
        if (keepends) eol = i;
      }
      r.push(s.slice(j, eol));
      j = i;
    }
    return r;
  }

  function partition(s, sep) {
    if (sep.length === 0) throw error('ValueError', 'empty separator');
    const k = buscar(s, sep, 0);
    return k < 0 ? [s, '', ''] : [s.slice(0, k), sep, s.slice(k + sep.length)];
  }

  function rpartition(s, sep) {
    if (sep.length === 0) throw error('ValueError', 'empty separator');
    const k = s.length >= sep.length ? buscarAtras(s, sep, s.length - sep.length) : -1;
    return k < 0 ? ['', '', s] : [s.slice(0, k), sep, s.slice(k + sep.length)];
  }

  /** Vista en puntos de código: [longitud, slice(a, b)]. */
  function vista(s) {
    if (!SUSTITUTO.test(s)) return [s.length, (a, b) => s.slice(a, b)];
    const c = Array.from(s);
    return [c.length, (a, b) => c.slice(a, b).join('')];
  }

  function coincideCola(s, sub, start, end, alFinal) {
    const [n, corte] = vista(s);
    const nsub = pyLen(sub);
    let a = start === null || start === undefined ? 0 : start;
    let z = end === null || end === undefined ? n : end;
    if (z > n) z = n; else if (z < 0) { z += n; if (z < 0) z = 0; }
    if (a < 0) { a += n; if (a < 0) a = 0; }
    if (z - nsub < a) return false;
    if (nsub === 0) return true;
    return alFinal ? corte(z - nsub, z) === sub : corte(a, a + nsub) === sub;
  }

  /** str.startswith(prefijo | [prefijos], start, end): índices en puntos de código. */
  function startswith(s, prefijo, start = null, end = null) {
    if (Array.isArray(prefijo)) return prefijo.some((p) => coincideCola(s, p, start, end, false));
    return coincideCola(s, prefijo, start, end, false);
  }

  function endswith(s, sufijo, start = null, end = null) {
    if (Array.isArray(sufijo)) return sufijo.some((p) => coincideCola(s, p, start, end, true));
    return coincideCola(s, sufijo, start, end, true);
  }

  /**
   * str.maketrans(x[, y[, z]]) → Map de punto de código a cadena, punto de código o null.
   * Con un argumento: Map u objeto con claves de un carácter o números.
   */
  function maketrans(x, y = undefined, z = undefined) {
    const t = new Map();
    if (y === undefined) {
      const pares = x instanceof Map ? [...x.entries()] : Object.entries(x);
      for (const [k, v] of pares) {
        if (typeof k === 'number') { t.set(k, v); continue; }
        const c = cps(k);
        if (c.length !== 1) throw error('ValueError', 'string keys in translate table must be of length 1');
        t.set(c[0], v);
      }
      return t;
    }
    const a = cps(x), b = cps(y);
    if (a.length !== b.length) throw error('ValueError', 'the first two maketrans arguments must have equal length');
    a.forEach((c, i) => t.set(c, b[i]));
    if (z !== undefined) for (const c of cps(z)) t.set(c, null);
    return t;
  }

  /** str.translate(tabla): tabla Map (u objeto) de punto de código → cadena | punto de código | null. */
  function translate(s, tabla) {
    const get = tabla instanceof Map ? (c) => tabla.get(c) : (c) => tabla[c];
    let out = '', desde = 0;
    for (let i = 0; i < s.length;) {
      const c = s.codePointAt(i), n = c > 0xffff ? 2 : 1;
      const v = get(c);
      if (v !== undefined) {
        out += s.slice(desde, i);
        if (v === null) { /* se borra */ } else if (typeof v === 'number') out += String.fromCodePoint(v);
        else out += v;
        desde = i + n;
      }
      i += n;
    }
    return desde === 0 ? s : out + s.slice(desde);
  }

  // ------------------------------------------------------------------ repr y str

  const hex = (n, w) => n.toString(16).padStart(w, '0');

  /** repr(str) de Python. */
  function reprStr(s) {
    const comilla = s.includes("'") && !s.includes('"') ? '"' : "'";
    let r = comilla;
    for (let i = 0; i < s.length;) {
      const c = s.codePointAt(i), n = c > 0xffff ? 2 : 1;
      if (c === 0x27 && comilla === "'") r += "\\'";
      else if (c === 0x5c) r += '\\\\';
      else if (c === 0x09) r += '\\t';
      else if (c === 0x0a) r += '\\n';
      else if (c === 0x0d) r += '\\r';
      else if (c < 0x20 || c === 0x7f) r += '\\x' + hex(c, 2);
      else if (c < 0x7f) r += s[i];
      else if (banderas(c) & B.printable) r += s.slice(i, i + n);
      else if (c <= 0xff) r += '\\x' + hex(c, 2);
      else if (c <= 0xffff) r += '\\u' + hex(c, 4);
      else r += '\\U' + hex(c, 8);
      i += n;
    }
    return r + comilla;
  }

  /** repr() de Python para los tipos de la convención (listas como list; usar {tupla: true} para tuplas). */
  function pyRepr(v, opciones = {}) {
    if (typeof v === 'string') return reprStr(v);
    if (Array.isArray(v)) {
      const items = v.map((x) => pyRepr(x));
      if (opciones.tupla) return items.length === 1 ? `(${items[0]},)` : `(${items.join(', ')})`;
      return `[${items.join(', ')}]`;
    }
    if (v instanceof Map) return `{${[...v].map(([k, x]) => `${pyRepr(k)}: ${pyRepr(x)}`).join(', ')}}`;
    if (v !== null && typeof v === 'object' && !esFloatEnvuelto(v)) {
      return `{${Object.keys(v).map((k) => `${reprStr(k)}: ${pyRepr(v[k])}`).join(', ')}}`;
    }
    return pyStr(v);
  }

  /** str() de Python: None, True/False, int, float (repr), str. */
  function pyStr(v) {
    if (v === null || v === undefined) return 'None';
    if (v === true) return 'True';
    if (v === false) return 'False';
    if (esFloatEnvuelto(v)) return reprFloat(num(v));
    if (typeof v === 'number') return Number.isInteger(v) ? intStr(v) : reprFloat(v);
    if (typeof v === 'bigint') return v.toString();
    if (typeof v === 'string') return v;
    return pyRepr(v);
  }

  // ------------------------------------------------------------------ format()

  const ALINEACION = new Set(['<', '>', '=', '^']);

  function leerEntero(c, pos) {
    let v = 0, n = 0;
    while (pos + n < c.length && c[pos + n] >= '0' && c[pos + n] <= '9') { v = v * 10 + (c[pos + n].charCodeAt(0) - 48); n++; }
    return [n ? v : -1, n];
  }

  /** parse_internal_render_format_spec */
  function leerEspecificacion(spec, tipoDefecto, alineacionDefecto) {
    const c = Array.from(spec);
    const f = { relleno: ' ', alineacion: alineacionDefecto, signo: '', z: false, alterno: false, ancho: -1,
      miles: '', precision: -1, tipo: tipoDefecto };
    let pos = 0, rellenoDado = false, alineacionDada = false;
    if (c.length >= 2 && ALINEACION.has(c[1])) {
      f.alineacion = c[1]; f.relleno = c[0]; rellenoDado = alineacionDada = true; pos = 2;
    } else if (c.length >= 1 && ALINEACION.has(c[0])) {
      f.alineacion = c[0]; alineacionDada = true; pos = 1;
    }
    if (pos < c.length && (c[pos] === '+' || c[pos] === '-' || c[pos] === ' ')) f.signo = c[pos++];
    if (pos < c.length && c[pos] === 'z') { f.z = true; pos++; }
    if (pos < c.length && c[pos] === '#') { f.alterno = true; pos++; }
    if (!rellenoDado && pos < c.length && c[pos] === '0') {
      f.relleno = '0';
      if (!alineacionDada && alineacionDefecto === '>') f.alineacion = '=';
      pos++;
    }
    let [w, n] = leerEntero(c, pos);
    f.ancho = w; pos += n;
    if (pos < c.length && c[pos] === ',') { f.miles = ','; pos++; }
    if (pos < c.length && c[pos] === '_') {
      if (f.miles) throw error('ValueError', "Cannot specify both ',' and '_'.");
      f.miles = '_'; pos++;
    }
    if (pos < c.length && c[pos] === ',' && f.miles === '_') throw error('ValueError', "Cannot specify both ',' and '_'.");
    if (pos < c.length && c[pos] === '.') {
      pos++;
      [w, n] = leerEntero(c, pos);
      if (n === 0) throw error('ValueError', 'Format specifier missing precision');
      f.precision = w; pos += n;
    }
    if (c.length - pos > 1) throw error('ValueError', `Invalid format specifier '${spec}'`);
    if (c.length - pos === 1) f.tipo = c[pos];
    if (f.miles) {
      if ('defgEGF%'.includes(f.tipo) || f.tipo === '') f.agrupar = 3;
      else if ('boxX'.includes(f.tipo) && f.miles === '_') f.agrupar = 4;
      else throw error('ValueError', `Cannot specify '${f.miles}' with '${f.tipo}'.`);
    }
    return f;
  }

  /** _PyUnicode_InsertThousandsGrouping con min_width (relleno de ceros agrupado). */
  function agruparCifras(dig, minAncho, grupo, sep) {
    const partes = [];
    let restantes = dig.length, pos = dig.length, usarSep = false, roto = false;
    let largo;
    const trozo = (len) => { // de derecha a izquierda: separador (salvo el primero), cifras y ceros de relleno
      const ceros = Math.max(0, len - restantes);
      const nChars = Math.max(0, Math.min(restantes, len));
      if (usarSep) partes.push(sep);
      partes.push('0'.repeat(ceros) + dig.slice(pos - nChars, pos));
      pos -= nChars;
      restantes -= nChars;
    };
    if (grupo > 0) {
      for (;;) {
        largo = Math.min(grupo, Math.max(restantes, minAncho, 1));
        trozo(largo);
        usarSep = true;
        minAncho -= largo;
        if (restantes <= 0 && minAncho <= 0) { roto = true; break; }
        minAncho -= sep.length;
      }
    }
    if (!roto) {
      largo = Math.max(restantes, minAncho, 1);
      trozo(largo);
    }
    return partes.reverse().join('');
  }

  /** fill_number: [lpad][signo][prefijo][spad][cifras agrupadas][decimal][resto][rpad]. */
  function componerNumero(f, signoNeg, prefijo, cifras, conDecimal, resto, mayus) {
    let signo = '';
    if (f.signo === '+') signo = signoNeg ? '-' : '+';
    else if (f.signo === ' ') signo = signoNeg ? '-' : ' ';
    else if (signoNeg) signo = '-';
    const nNoCifras = signo.length + prefijo.length + (conDecimal ? 1 : 0) + resto.length;
    const minAncho = f.relleno === '0' && f.alineacion === '=' ? f.ancho - nNoCifras : 0;
    let agrupadas = '';
    if (cifras.length > 0) agrupadas = agruparCifras(cifras, minAncho, f.agrupar || 0, f.miles);
    const cuerpo = agrupadas + (conDecimal ? '.' : '') + resto;
    const relleno = f.ancho - (nNoCifras + agrupadas.length);
    let izq = '', medio = '', der = '';
    if (relleno > 0) {
      const r = (k) => f.relleno.repeat(k);
      if (f.alineacion === '<') der = r(relleno);
      else if (f.alineacion === '^') { izq = r(relleno >> 1); der = r(relleno - (relleno >> 1)); }
      else if (f.alineacion === '=') medio = r(relleno);
      else izq = r(relleno);
    }
    const txt = signo + (mayus ? prefijo.toUpperCase() : prefijo) + medio + (mayus ? cuerpo.toUpperCase() : cuerpo);
    return izq + txt + der;
  }

  function formatoCadena(s, f) {
    if (f.signo) throw error('ValueError', f.signo === ' ' ? 'Space not allowed in string format specifier' : 'Sign not allowed in string format specifier');
    if (f.z) throw error('ValueError', 'Negative zero coercion (z) not allowed in format specifier');
    if (f.alterno) throw error('ValueError', 'Alternate form (#) not allowed in string format specifier');
    if (f.alineacion === '=') throw error('ValueError', "'=' alignment not allowed in string format specifier");
    if (f.tipo !== 's') throw error('ValueError', `Unknown format code '${f.tipo}' for object of type 'str'`);
    const c = Array.from(s);
    let txt = f.precision >= 0 && c.length > f.precision ? c.slice(0, f.precision).join('') : s;
    const largo = Math.min(c.length, f.precision >= 0 ? f.precision : c.length);
    const relleno = f.ancho - largo;
    if (relleno <= 0) return txt;
    if (f.alineacion === '>') return f.relleno.repeat(relleno) + txt;
    if (f.alineacion === '^') return f.relleno.repeat(relleno >> 1) + txt + f.relleno.repeat(relleno - (relleno >> 1));
    return txt + f.relleno.repeat(relleno);
  }

  function formatoFloat(x, f) {
    let tipo = f.tipo, precision = f.precision, porcentaje = false;
    if (tipo === '') {
      if (precision >= 0) throw error('NoSoportado', 'format sin tipo y con precisión (estilo g) no está implementado');
      tipo = 'r';
    }
    if (!'rfF%'.includes(tipo)) {
      if ('eEgGn'.includes(tipo)) throw error('NoSoportado', `format con tipo '${tipo}' no está implementado`);
      throw error('ValueError', `Unknown format code '${tipo}' for object of type 'float'`);
    }
    if (tipo === '%') { tipo = 'f'; x *= 100; porcentaje = true; }
    if (precision < 0) precision = 6;
    let neg = signoNegativo(x), txt;
    if (x !== x) { txt = 'nan'; neg = false; }
    else if (!Number.isFinite(x)) txt = 'inf';
    else if (tipo === 'r') txt = reprFloat(Math.abs(x));
    else {
      txt = cifrasFijas(x, precision);
      if (f.alterno && precision === 0) txt += '.';
    }
    if (neg && f.z && /^[0.]*$/.test(txt)) neg = false;
    if (porcentaje) txt += '%';
    let i = 0;
    while (i < txt.length && txt.charCodeAt(i) >= 48 && txt.charCodeAt(i) <= 57) i++;
    const conDecimal = txt[i] === '.';
    return componerNumero(f, neg, '', txt.slice(0, i), conDecimal, txt.slice(i + (conDecimal ? 1 : 0)), tipo === 'F');
  }

  function formatoEntero(n, f) {
    if ('eEfFgG%'.includes(f.tipo) && f.tipo !== '') return formatoFloat(Number(n), f);
    if (f.precision >= 0) throw error('ValueError', 'Precision not allowed in integer format specifier');
    if (f.z) throw error('ValueError', 'Negative zero coercion (z) not allowed in integer format specifier');
    const base = { b: 2, o: 8, x: 16, X: 16, d: 10, '': 10 }[f.tipo];
    if (base === undefined) {
      if (f.tipo === 'c' || f.tipo === 'n') throw error('NoSoportado', `format con tipo '${f.tipo}' no está implementado`);
      throw error('ValueError', `Unknown format code '${f.tipo}' for object of type 'int'`);
    }
    const b = BigInt(n), neg = b < 0n;
    const cifras = (neg ? -b : b).toString(base);
    const prefijo = f.alterno && base !== 10 ? '0' + f.tipo.toLowerCase() : '';
    return componerNumero(f, neg, prefijo, cifras, false, '', f.tipo === 'X');
  }

  /**
   * format(valor, especificación) de Python. Tipos: int (number entero o BigInt; boolean como int salvo con
   * especificación vacía), float (number no entero o PyFloat) y str. No implementados (lanzan PyError
   * 'NoSoportado'): tipos e E g G n c y float sin tipo con precisión.
   */
  function pyFormat(v, spec = '') {
    if (typeof v === 'string') return formatoCadena(v, leerEspecificacion(spec, 's', '<'));
    if (typeof v === 'boolean') {
      if (spec === '') return v ? 'True' : 'False';
      v = v ? 1 : 0;
    }
    if (v === null || v === undefined) {
      if (spec === '') return 'None';
      throw error('TypeError', 'unsupported format string passed to NoneType.__format__');
    }
    if (esFloat(v)) return formatoFloat(num(v), leerEspecificacion(spec, '', '>'));
    if (typeof v === 'number' && !Number.isFinite(v)) return formatoFloat(v, leerEspecificacion(spec, '', '>'));
    if (typeof v === 'number' || typeof v === 'bigint') return formatoEntero(v, leerEspecificacion(spec, 'd', '>'));
    throw error('TypeError', `format: tipo no admitido (${typeof v})`);
  }

  /** f"{x:.Nf}" y f"{x:,.Nf}". */
  const fmtFixed = (x, n, miles = false) => pyFormat(F(num(x)), `${miles ? ',' : ''}.${n}f`);
  /** f"{n:,}" (entero) con separador de miles opcional distinto de «,» (ngram usa .replace(",", ".")). */
  const fmtMiles = (n, sep = ',') => (sep === ',' ? pyFormat(n, ',') : pyFormat(n, ',').split(',').join(sep));

  // ------------------------------------------------------------------ comparación y orden

  function claseOrden(v) {
    switch (typeof v) {
      case 'number': case 'bigint': case 'boolean': return 1;
      case 'string': return 2;
      case 'object':
        if (v === null) return 0;
        if (esFloatEnvuelto(v)) return 1;
        if (Array.isArray(v)) return 3;
        return 4;
      default: return 5;
    }
  }

  const nombreTipo = (v) => ['NoneType', 'int', 'str', 'tuple', 'object', typeof v][claseOrden(v)];

  /** Comparación de cadenas por punto de código (Python), no por unidad UTF-16. */
  function cmpStr(a, b) {
    if (a === b) return 0;
    const n = Math.min(a.length, b.length);
    let i = 0;
    while (i < n && a.charCodeAt(i) === b.charCodeAt(i)) i++;
    if (i === n) return a.length < b.length ? -1 : (a.length > b.length ? 1 : 0);
    const x = a.charCodeAt(i), y = b.charCodeAt(i);
    if (x < 0xd800 && y < 0xd800) return x < y ? -1 : 1;
    // Puntos de código completos en la primera diferencia (con el alto compartido si i cae en un bajo).
    let ca, cb;
    if (i > 0 && esAlto(a.charCodeAt(i - 1))) {
      const bajoA = esBajo(x), bajoB = esBajo(y);
      if (bajoA && bajoB) return x < y ? -1 : 1;
      if (bajoA !== bajoB) return bajoA ? 1 : -1; // par (≥ U+10000) frente a alto suelto (< U+DC00)
    }
    ca = a.codePointAt(i); cb = b.codePointAt(i);
    if (ca !== cb) return ca < cb ? -1 : 1;
    return x < y ? -1 : 1;
  }

  /** a == b de Python (números con bool, cadenas, tuplas, None). */
  function eq(a, b) {
    const ka = claseOrden(a), kb = claseOrden(b);
    if (ka !== kb) return false;
    switch (ka) {
      case 0: return true;
      case 1: return num(a) == num(b); // eslint-disable-line eqeqeq
      case 2: return a === b;
      case 3:
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false;
        return true;
      default: return a === b;
    }
  }

  /** a < b de Python; TypeError si los tipos no se pueden ordenar (None con otro, str con int…). */
  function lt(a, b) {
    const ka = claseOrden(a), kb = claseOrden(b);
    if (ka === 1 && kb === 1) return num(a) < num(b);
    if (ka === 2 && kb === 2) return cmpStr(a, b) < 0;
    if (ka === 3 && kb === 3) {
      const n = Math.min(a.length, b.length);
      for (let i = 0; i < n; i++) if (!eq(a[i], b[i])) return lt(a[i], b[i]);
      return a.length < b.length;
    }
    throw error('TypeError', `'<' not supported between instances of '${nombreTipo(a)}' and '${nombreTipo(b)}'`);
  }

  /** -1, 0 o 1 con la semántica de < de Python. */
  function cmp(a, b) {
    if (typeof a === 'number' && typeof b === 'number') return a < b ? -1 : (b < a ? 1 : 0);
    if (typeof a === 'string' && typeof b === 'string') return cmpStr(a, b);
    return lt(a, b) ? -1 : (lt(b, a) ? 1 : 0);
  }

  /** sorted(iterable, key=None, reverse=False): estable, la clave se calcula una vez por elemento. */
  function sorted(iterable, opciones = {}) {
    const { key = null, reverse = false } = opciones;
    const d = [];
    let i = 0;
    for (const v of iterable) { d.push([key ? key(v) : v, i++, v]); }
    d.sort(reverse ? (x, y) => cmp(y[0], x[0]) : (x, y) => cmp(x[0], y[0]));
    return d.map((x) => x[2]);
  }

  /** _clave_sql de search.py: (v is not None, v if v is not None else 0) → NULL antes que cualquier valor. */
  const claveSql = (v) => (v === null || v === undefined ? [false, 0] : [true, v]);

  function bisectLeft(a, x, lo = 0, hi = null, key = null) {
    if (lo < 0) throw error('ValueError', 'lo must be non-negative');
    if (hi === null || hi === undefined) hi = a.length;
    if (key === null && typeof x === 'number') {
      while (lo < hi) { const m = (lo + hi) >>> 1; if (cmp(a[m], x) < 0) lo = m + 1; else hi = m; }
      return lo;
    }
    while (lo < hi) { const m = (lo + hi) >>> 1; if (lt(key ? key(a[m]) : a[m], x)) lo = m + 1; else hi = m; }
    return lo;
  }

  function bisectRight(a, x, lo = 0, hi = null, key = null) {
    if (lo < 0) throw error('ValueError', 'lo must be non-negative');
    if (hi === null || hi === undefined) hi = a.length;
    while (lo < hi) { const m = (lo + hi) >>> 1; if (lt(x, key ? key(a[m]) : a[m])) hi = m; else lo = m + 1; }
    return lo;
  }

  /** max(iterable, key=None): el primero de los máximos. */
  function pyMax(iterable, key = null) {
    let mejor, kMejor, hay = false;
    for (const v of iterable) {
      const k = key ? key(v) : v;
      if (!hay || lt(kMejor, k)) { mejor = v; kMejor = k; hay = true; }
    }
    if (!hay) throw error('ValueError', 'max() arg is an empty sequence');
    return mejor;
  }

  function pyMin(iterable, key = null) {
    let mejor, kMejor, hay = false;
    for (const v of iterable) {
      const k = key ? key(v) : v;
      if (!hay || lt(k, kMejor)) { mejor = v; kMejor = k; hay = true; }
    }
    if (!hay) throw error('ValueError', 'min() arg is an empty sequence');
    return mejor;
  }

  // ------------------------------------------------------------------ Counter

  /**
   * collections.Counter sobre un Map (orden de inserción). Claves str o number; para tuplas u otras claves
   * compuestas, pasar `clave` (p. ej. JSON.stringify): se guarda la clave original la primera vez.
   * Diferencia con Python: 1, 1.0 y True son la misma clave en Python y aquí true ≠ 1.
   */
  class Counter {
    constructor(iterable = null, opciones = {}) {
      this.clave = opciones.clave || null;
      this.m = new Map();
      this.orig = this.clave ? new Map() : null;
      if (iterable) this.update(iterable);
    }
    _k(k) {
      if (!this.clave) return k;
      const c = this.clave(k);
      if (!this.orig.has(c)) this.orig.set(c, k);
      return c;
    }
    add(k, n = 1) {
      const c = this._k(k);
      this.m.set(c, (this.m.get(c) || 0) + n);
      return this;
    }
    update(iterable) {
      if (iterable instanceof Counter) { for (const [k, n] of iterable.items()) this.add(k, n); return this; }
      if (iterable instanceof Map) { for (const [k, n] of iterable) this.add(k, n); return this; }
      for (const k of iterable) this.add(k, 1);
      return this;
    }
    get(k) { return this.m.get(this.clave ? this.clave(k) : k) || 0; }
    set(k, n) { this.m.set(this._k(k), n); return this; }
    has(k) { return this.m.has(this.clave ? this.clave(k) : k); }
    delete(k) {
      const c = this.clave ? this.clave(k) : k;
      if (this.orig) this.orig.delete(c);
      return this.m.delete(c);
    }
    get size() { return this.m.size; }
    total() { let t = 0; for (const n of this.m.values()) t += n; return t; }
    keys() { return this.clave ? [...this.m.keys()].map((c) => this.orig.get(c)) : [...this.m.keys()]; }
    values() { return [...this.m.values()]; }
    items() { return this.clave ? [...this.m].map(([c, n]) => [this.orig.get(c), n]) : [...this.m]; }
    /** most_common(n=None): recuento descendente; a igual recuento, orden de inserción. */
    most_common(n = null) {
      if (n !== null && n !== undefined && n <= 0) return [];
      const it = this.items();
      const orden = it.map((x, i) => i).sort((i, j) => (it[j][1] - it[i][1]) || (i - j));
      const r = orden.map((i) => it[i]);
      return n === null || n === undefined ? r : r.slice(0, n);
    }
  }

  // ------------------------------------------------------------------ strftime

  const DIAS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MESES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
  const d2 = (n) => String(n).padStart(2, '0');

  /** time.strftime(formato, time.localtime(t)) con locale C. `fecha`: Date o milisegundos; por defecto, ahora. */
  function strftime(formato, fecha = new Date()) {
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    const Y = d.getFullYear(), mo = d.getMonth(), D = d.getDate(), H = d.getHours(), M = d.getMinutes(),
      S = d.getSeconds(), w = d.getDay();
    const yday = Math.round((Date.UTC(Y, mo, D) - Date.UTC(Y, 0, 1)) / 86400000);
    let r = '';
    for (let i = 0; i < formato.length; i++) {
      const c = formato[i];
      if (c !== '%') { r += c; continue; }
      const k = formato[++i];
      switch (k) {
        case 'Y': r += String(Y); break;
        case 'y': r += d2(((Y % 100) + 100) % 100); break;
        case 'm': r += d2(mo + 1); break;
        case 'd': r += d2(D); break;
        case 'H': r += d2(H); break;
        case 'I': r += d2(H % 12 === 0 ? 12 : H % 12); break;
        case 'M': r += d2(M); break;
        case 'S': r += d2(S); break;
        case 'p': r += H < 12 ? 'AM' : 'PM'; break;
        case 'j': r += String(yday + 1).padStart(3, '0'); break;
        case 'a': r += DIAS[w].slice(0, 3); break;
        case 'A': r += DIAS[w]; break;
        case 'b': r += MESES[mo].slice(0, 3); break;
        case 'B': r += MESES[mo]; break;
        case 'w': r += String(w); break;
        case 'U': r += d2(Math.floor((yday + 7 - w) / 7)); break;
        case 'W': r += d2(Math.floor((yday + 7 - ((w + 6) % 7)) / 7)); break;
        case 'z': {
          const off = -d.getTimezoneOffset();
          r += (off < 0 ? '-' : '+') + d2(Math.floor(Math.abs(off) / 60)) + d2(Math.abs(off) % 60);
          break;
        }
        case '%': r += '%'; break;
        default: throw error('NoSoportado', `strftime: directiva %${k ?? ''} no implementada`);
      }
    }
    return r;
  }

  // ------------------------------------------------------------------ salida

  R2.py = R2.py || {};
  /** Solo para tests: mapeo por la tabla, sin el camino rápido del motor. */
  const mapearConTabla = (s, nombre) => (nombre === 'title' ? title(s)
    : mapearCadena(s, unicode().mapas[nombre], nombre === 'lower'));

  R2.py.core = {
    PyError, PyFloat, MARCA_FLOAT, F, esFloat, esFloatEnvuelto, num,
    pyRound, pyRoundInt, reprFloat, intStr, cifrasFijas, pyStr, pyRepr, reprStr, pyFormat, fmtFixed, fmtMiles,
    cmp, cmpStr, lt, eq, sorted, claveSql, bisectLeft, bisectRight, bisect_left: bisectLeft,
    bisect_right: bisectRight, pyMax, pyMin, Counter,
    strip, lstrip, rstrip, split, rsplit, splitlines, partition, rpartition, startswith, endswith, maketrans,
    translate, pyLen, cps,
    isupper, islower, istitle, isspace, isalpha, isdecimal, isdigit, isnumeric, isalnum, isprintable, isascii,
    lower, upper, title, capitalize, casefold, cp, rangosUnicode, banderas, BANDERAS: Object.freeze({ ...B }),
    mapearConTabla,
    strftime,
    TABLAS,
  };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/py/json.js ===== */
/* 2REP_Standalone · engine/py/json.js
 *
 * R2.py.json: json.dumps de Python 3.12 byte a byte (mismos bytes que el codificador en C sin indent y que el de
 * Python con indent): skipkeys, ensure_ascii, check_circular, allow_nan, indent (número o cadena), separators,
 * default y sort_keys.
 *
 * Tipos (convención de R2.py.core): null → null · boolean → true/false · number entero o BigInt → int ·
 * number no entero, NaN, ±Infinity o PyFloat → float (repr de Python: 1e+16, 1e-05, NaN, Infinity) · string →
 * str · Array → list/tuple · Map → dict (orden de inserción; claves str, int, float, bool o None) · objeto
 * plano → dict con claves str.
 * Límites: un float con valor entero debe ir como PyFloat (F(3) → «3.0»); en un objeto plano JS las claves que
 * parecen enteros se recorren antes que las demás, así que para conservar el orden de inserción hace falta Map.
 * Cualquier otro valor (undefined, Date, clases) pasa por `default` o da TypeError, como en Python.
 */
(function (R2) {
  'use strict';

  const C = R2.py.core;
  const { PyError, esFloatEnvuelto } = C;

  const ESC = { '"': '\\"', '\\': '\\\\', '\n': '\\n', '\r': '\\r', '\t': '\\t', '\b': '\\b', '\f': '\\f' };
  const hex4 = (c) => '\\u' + c.toString(16).padStart(4, '0');
  const reemplazo = (ch) => ESC[ch] || hex4(ch.charCodeAt(0));

  const RE_UNICODE = /[\x00-\x1f"\\]/;
  const RE_UNICODE_G = /[\x00-\x1f"\\]/g;
  const RE_ASCII = /[^\x20-\x7e]|["\\]/;
  const RE_ASCII_G = /[^\x20-\x7e]|["\\]/g; // sin flag u: cada sustituto se escapa por separado, como Python

  /** encode_basestring (ensure_ascii=False): escapa «"», «\» y los controles U+0000–U+001F. */
  function encodeBasestring(s) {
    return '"' + (RE_UNICODE.test(s) ? s.replace(RE_UNICODE_G, reemplazo) : s) + '"';
  }

  /** encode_basestring_ascii (ensure_ascii=True): además, todo lo que no es ASCII imprimible (\u007f incluido). */
  function encodeBasestringAscii(s) {
    return '"' + (RE_ASCII.test(s) ? s.replace(RE_ASCII_G, reemplazo) : s) + '"';
  }

  function floatstr(x, allowNan) {
    let t;
    if (x !== x) t = 'NaN';
    else if (x === Infinity) t = 'Infinity';
    else if (x === -Infinity) t = '-Infinity';
    else return C.reprFloat(x);
    if (!allowNan) throw new PyError('ValueError', 'Out of range float values are not JSON compliant: ' + C.reprFloat(x));
    return t;
  }

  const nombreClase = (o) => {
    if (o === undefined) return 'undefined';
    if (typeof o === 'function') return 'function';
    return (o && o.constructor && o.constructor.name) || typeof o;
  };

  function esObjetoPlano(o) {
    const p = Object.getPrototypeOf(o);
    return p === Object.prototype || p === null;
  }

  /**
   * json.dumps(obj, opciones). Opciones con los nombres de Python: skipkeys, ensure_ascii (true), check_circular
   * (true), allow_nan (true), indent (null), separators ([item, clave] o null), default (función), sort_keys.
   */
  function dumps(obj, opciones = {}) {
    const {
      skipkeys = false, ensure_ascii = true, check_circular = true, allow_nan = true, indent = null,
      separators = null, sort_keys = false,
    } = opciones;
    const porDefecto = opciones.default || null;
    const sangria = indent === null || indent === undefined ? null
      : (typeof indent === 'string' ? indent : ' '.repeat(Math.max(0, indent)));
    let sepItem, sepClave;
    if (separators) [sepItem, sepClave] = separators;
    else { sepItem = sangria !== null ? ',' : ', '; sepClave = ': '; }
    const codificar = ensure_ascii ? encodeBasestringAscii : encodeBasestring;
    const marcas = check_circular ? new Set() : null;
    const partes = [];

    const marcar = (o) => {
      if (!marcas) return;
      if (marcas.has(o)) throw new PyError('ValueError', 'Circular reference detected');
      marcas.add(o);
    };

    function clave(k) {
      switch (typeof k) {
        case 'string': return k;
        case 'boolean': return k ? 'true' : 'false';
        case 'bigint': return k.toString();
        case 'number': return Number.isInteger(k) ? C.intStr(k) : floatstr(k, allow_nan);
        default:
          if (k === null) return 'null';
          if (esFloatEnvuelto(k)) return floatstr(C.num(k), allow_nan);
          return undefined;
      }
    }

    function valor(o, nivel) {
      switch (typeof o) {
        case 'string': partes.push(codificar(o)); return;
        case 'boolean': partes.push(o ? 'true' : 'false'); return;
        case 'bigint': partes.push(o.toString()); return;
        case 'number': partes.push(Number.isInteger(o) ? C.intStr(o) : floatstr(o, allow_nan)); return;
        case 'object':
          if (o === null) { partes.push('null'); return; }
          if (esFloatEnvuelto(o)) { partes.push(floatstr(C.num(o), allow_nan)); return; }
          if (Array.isArray(o)) { lista(o, nivel); return; }
          if (o instanceof Map) { dict([...o], nivel, o); return; }
          if (esObjetoPlano(o)) { dict(Object.keys(o).map((k) => [k, o[k]]), nivel, o); return; }
          break;
        default:
      }
      if (!porDefecto) throw new PyError('TypeError', `Object of type ${nombreClase(o)} is not JSON serializable`);
      const esObj = o !== null && (typeof o === 'object' || typeof o === 'function');
      if (esObj) marcar(o);
      valor(porDefecto(o), nivel);
      if (esObj && marcas) marcas.delete(o);
    }

    function lista(l, nivel) {
      if (l.length === 0) { partes.push('[]'); return; }
      marcar(l);
      partes.push('[');
      let sep = sepItem, nueva = null;
      if (sangria !== null) {
        nivel++;
        nueva = '\n' + sangria.repeat(nivel);
        sep = sepItem + nueva;
        partes.push(nueva);
      }
      for (let i = 0; i < l.length; i++) {
        if (i) partes.push(sep);
        valor(l[i], nivel);
      }
      if (nueva !== null) partes.push('\n' + sangria.repeat(nivel - 1));
      partes.push(']');
      if (marcas) marcas.delete(l);
    }

    function dict(items, nivel, o) {
      if (items.length === 0) { partes.push('{}'); return; }
      marcar(o);
      partes.push('{');
      let sep = sepItem, nueva = null;
      if (sangria !== null) {
        nivel++;
        nueva = '\n' + sangria.repeat(nivel);
        sep = sepItem + nueva;
        partes.push(nueva);
      }
      // sorted(dct.items()): se comparan las tuplas (clave, valor); las claves son distintas.
      if (sort_keys) items = C.sorted(items, { key: (kv) => kv[0] });
      let primero = true;
      for (const [k, v] of items) {
        const ks = clave(k);
        if (ks === undefined) {
          if (skipkeys) continue;
          throw new PyError('TypeError', `keys must be str, int, float, bool or None, not ${Array.isArray(k) ? 'tuple' : nombreClase(k)}`);
        }
        if (primero) primero = false; else partes.push(sep);
        partes.push(codificar(ks), sepClave);
        valor(v, nivel);
      }
      if (nueva !== null) partes.push('\n' + sangria.repeat(nivel - 1));
      partes.push('}');
      if (marcas) marcas.delete(o);
    }

    valor(obj, 0);
    return partes.join('');
  }

  R2.py = R2.py || {};
  R2.py.json = { dumps, encodeBasestring, encodeBasestringAscii };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/py/re.js ===== */
// 2REP_Standalone · src/engine/py/re.js
//
// R2.py.re: el módulo `re` de Python 3.12 (patrones str) sobre RegExp de JS con el flag 'v'
// (Node 22, Chrome ≥ 112, Safari ≥ 17, Firefox ≥ 116).
//
// Cómo funciona:
// 1. El patrón se analiza con un port de re/_parser.py: el árbol es el mismo que el de Python
//    (mismas optimizaciones de prefijo común y de alternativas de un carácter, mismos errores).
// 2. El árbol se traduce a una RegExp 'v' con la semántica de sre:
//    - \w, \d: \p{L}\p{N}_ y \p{Nd} del motor corregidos, la primera vez que se usan, contra las
//      tablas de Python 3.12 (Unicode 15.0) embebidas abajo: se restan los caracteres que el motor
//      clasifica como letra o cifra y Python no (Unicode posterior) y se suman los que falten.
//      \s es el conjunto explícito de str.isspace(). \W \D \S son sus complementos.
//    - \b y \B con miradas atrás y adelante sobre ese \w (en una cadena vacía nunca casan); junto a
//      un átomo que empieza o acaba siempre en carácter de palabra (o nunca) basta una sola mirada.
//    - '.' sin DOTALL = [^\n]; ^ y \A = ^ de JS sin flag 'm' (equivale a (?<![\s\S]));
//      $ = (?=\n?(?![\s\S])); \Z = (?![\s\S]);
//      con MULTILINE, ^ = (?<![^\n]) y $ = (?![^\n]) (solo \n separa líneas, como en sre).
//    - IGNORECASE sin el flag 'i' de JS: cada literal o clase se convierte en el conjunto exacto de
//      caracteres que sre acepta (minúscula simple de sre, _EXTRA_CASES, rangos fuera del BMP).
//    - (?P<n>…), (?P=n), \1, grupos con flags (?i:…) (?-s:…), (?>…) y cuantificadores posesivos
//      (con un grupo oculto: (?=(X))\k).
// 3. Los envoltorios reproducen _sre: match/search/fullmatch con pos y endpos (se casa sobre
//    string[:endpos]; las miradas atrás ven lo anterior a pos y ^ solo casa al principio real),
//    finditer/findall/sub/subn/split con el avance de sre tras una coincidencia vacía (la siguiente
//    búsqueda empieza en el mismo sitio pero no puede volver a dar una coincidencia vacía allí).
//
// No soportado (lanza PyReError con noSoportado = true): grupos condicionales (?(1)…), \N{nombre},
// referencias a grupos que pueden no participar o con IGNORECASE, capturas dentro de una
// repetición que pueden no participar en su última vuelta (sre conserva el valor anterior; JS lo
// borra) o cuyo cuerpo puede casar vacío, y repeticiones voraces cuyo cuerpo prefiere casar vacío
// antes que consumir ((?:|x)+, (?:x*?)+: sre acepta esa vuelta vacía y RegExp no). Ningún patrón del
// backend usa esas construcciones (tools/gen_regex_manifest.py).
// Una repetición posesiva compuesta casa cada vuelta de forma atómica, como sre.
// Si el motor agota la pila o la memoria (Firefox: InternalError «too much recursion»), se lanza
// PyReError con motorAgotado = true y tipo 'RecursionError'.
//
// Posiciones: índices de la cadena JS (unidades UTF-16). Coinciden con los de Python mientras no
// haya caracteres fuera del BMP; el corpus no tiene ninguno. pos no debe caer dentro de un par
// sustituto. Con endpos < pos, search/fullmatch/finditer/findall no casan y match solo casa vacía en pos, como _sre.
// Match.lastindex es el último grupo que sre cerró (el de cierre más tardío en el patrón), no el que acaba más tarde.
(function (R2) {
  'use strict';
  R2.py = R2.py || {};

  // <tablas> Generado por standalone/parity/oracle/dump_units_re.py --tablas-js --actualizar
  // (Python 3.12.7, Unicode 15.0.0). No editar a mano.
  const TABLAS = {
    python: '3.12.7',
    unicode: '15.0.0',
    W: '1c,9,7,p,4,0,1,p,1b,0,7,1,1,0,3,1,1,2,1,m,1,u,1,cp,4,b,e,4,7,0,1,0,3l,4,1,1,2,3,1,0,6,0,1,2,1,0,1,j,1,2a,1,3u,8,4l,1,11,2,0,6,14,1z,q,4,3,19,16,l,9,4,1,1,2q,1,0,f,1,7,e,2,0,g,0,1,t,t,2g,b,0,e,16,9,1,4,0,5,l,4,0,9,0,3,0,n,o,7,a,5,n,1,5,h,15,1m,1h,3,0,i,0,7,9,4,9,1,f,4,7,2,1,2,l,1,6,1,0,3,3,3,0,g,0,d,1,1,2,4,b,2,5,2,0,8,5,4,1,2,l,1,6,1,1,1,1,1,1,v,3,1,0,7,9,2,2,g,8,1,2,1,l,1,6,1,1,1,4,3,0,i,0,f,1,4,9,9,0,b,7,2,1,2,l,1,6,1,1,1,4,3,0,u,1,1,2,4,9,1,6,b,0,1,5,3,2,1,3,3,1,1,0,1,1,3,1,3,2,3,b,m,0,l,c,i,7,1,2,1,m,1,f,3,0,q,2,2,0,2,1,4,9,8,6,1,0,4,7,1,2,1,m,1,9,1,4,3,0,v,1,1,1,4,9,1,1,h,8,1,2,1,14,2,0,g,0,5,2,1,9,4,i,1,5,5,h,3,n,1,8,1,0,2,6,v,9,h,1b,1,1,c,6,9,9,13,1,1,0,1,4,1,n,1,0,1,9,1,1,9,0,2,4,1,0,9,9,2,3,w,0,v,j,c,7,1,z,r,4,37,16,k,a,6,5,4,3,3,0,3,1,7,2,4,c,c,0,1,9,6,11,1,0,5,0,2,16,1,98,1,3,2,6,1,0,1,3,2,14,1,3,2,w,1,3,2,6,1,0,1,3,2,e,1,1k,1,3,2,1u,e,j,3,f,g,2d,2,5,3,h7,2,g,1,p,5,22,3,a,7,h,d,i,e,h,e,c,1,2,f,1f,z,0,4,0,3,9,6,9,m,9,6,2g,7,4,2,x,1,0,5,1x,a,u,13,13,2,4,b,17,4,p,6,a,11,m,9,1g,17,9,6,9,d,0,2l,1a,h,7,3,9,15,t,d,1j,q,z,s,9,3,1c,2,8,7,16,2,2,15,3,1,5,1,1,3,0,5,5b,1s,7p,2,5,2,11,2,5,2,7,1,0,1,0,1,0,1,u,2,1g,1,6,1,0,3,2,1,6,3,3,2,5,4,c,5,2,1,6,37,1,2,5,5,a,6,c,2t,0,4,0,2,9,1,0,3,4,6,0,1,0,1,0,1,3,1,a,2,3,5,4,4,0,1,1l,k6,1n,26,l,hi,t,vg,6c,6,3,3,1,9,0,2,11,1,0,5,0,2,1j,7,0,g,m,9,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,28,0,d1,2,p,8,7,4,2,4,4,2d,6,2,1,2h,1,3,5,16,1,2l,3,3,a,v,1c,f,w,9,u,7,1,e,w,9,13,e,8w,533,1s,h3g,1v,19,2,7g,3,r,k,1a,g,u,2,27,13,8,2,2u,2,1r,5,1,1,0,1,4,o,f,1,2,1,3,1,m,d,5,a,1f,e,1d,s,9,o,5,3,0,1,1,1,11,a,m,p,s,7,1a,s,a,6,4,1,o,1,14,n,2,1,7,4,9,6,m,3,0,3,1d,1,0,3,1,2,4,2,0,1,0,o,2,2,a,7,2,c,5,2,5,2,5,9,6,1,6,1,16,1,d,6,36,d,9,6,8mb,c,m,4,1c,6is,a5,2,2x,12,6,c,4,5,0,1,9,1,c,1,4,1,0,1,1,1,1,1,2z,x,a2,i,1r,2,1h,14,b,38,4,1,3q,j,9,7,p,6,p,b,2g,3,5,2,5,2,5,2,2,z,b,1,p,1,i,1,1,1,e,2,d,y,3e,c,18,c,1k,h,1,6s,s,3,1c,g,q,4,z,9,t,5,11,a,t,2,z,4,7,1,4,16,4d,2,9,6,z,4,z,4,13,8,1f,c,a,1,e,1,6,1,1,1,a,1,e,1,6,1,1,1v,8m,9,l,a,7,o,5,1,15,1,8,1x,5,2,0,1,17,1,1,3,0,2,m,2,u,2,11,8,8,1c,i,1,1,5,w,4,p,1y,1j,4,j,2,1a,f,3,1,2,1,s,a,8,n,u,1,v,w,7,1,r,6,4,g,1h,a,l,2,q,5,p,n,6,28,20,1j,1e,d,1e,7,15,c,9,86,u,1,15,6,1,26,13,8,l,b,3,r,h,1a,r,k,m,c,1g,q,t,1,1,2,0,d,18,w,o,7,9,9,z,f,9,4,0,2,0,8,y,3,0,c,1b,e,3,b,a,1,0,4,j,b,h,1,o,j,1,1r,6,1,0,1,3,1,e,1,9,7,1a,h,9,b,7,2,1,2,l,1,6,1,1,1,4,3,0,i,0,c,4,4e,1g,i,3,5,9,5,2,u,1b,k,1,1,0,8,9,4m,1a,15,3,10,1b,k,0,b,9,12,16,d,0,7,9,1i,q,l,b,4,6,55,17,38,2a,c,7,2,0,2,7,1,1,1,n,f,0,1,0,e,9,1y,7,2,12,g,0,1,0,s,0,a,13,7,0,l,0,b,19,j,0,i,20,7b,8,1,10,h,0,f,s,5,t,34,6,1,1,1,11,l,0,9,9,6,5,1,1,1,v,e,0,7,9,8m,i,f,0,1,c,1,x,s,9,2e,0,f,k,17,pl,2u,32,h,5f,218,2o,f,tr,h,5,33t,g6,6nt,fs,7,u,1,9,6,26,1,9,6,t,i,1b,g,3,c,9,1,6,1,k,5,i,j4,2e,2x,22,5,0,1u,c,1s,1,1,0,s,4qf,8,yd,16,8,6w7,3,1,6,1,1,1,82,f,0,t,2,2,0,e,3,8,az,1s4,2y,5,c,3,8,7,9,4di,j,c,j,30,o,3r,2c,1,1y,1,1,2,0,2,1,2,3,1,b,1,0,1,6,1,1s,1,3,2,7,1,6,1,r,1,3,1,4,1,0,3,6,1,9f,2,o,1,o,1,u,1,o,1,u,1,o,1,u,1,o,1,u,1,o,1,7,2,1d,1ds,u,6,5,79,1p,42,18,a,6,2,9,4,0,8x,t,i,17,4,9,d2,r,4,9,km,6,1,3,1,1,1,e,1,5g,2,8,1c,1v,7,0,4,9,lz,1m,1,2,1,3,24,18,1,e,5e,3,1,q,1,1,1,0,2,0,1,9,1,3,1,0,1,0,6,0,4,0,1,0,1,0,1,2,1,1,1,0,2,0,1,0,1,0,1,0,1,0,1,1,1,0,2,3,1,6,1,3,1,3,1,0,1,9,1,g,5,2,1,4,1,g,g4,c,25f,9,sm,wyn,w,37d,6,65,2,4g1,e,5rk,2e7,f1,15u,3t6,5,38f',
    D: '1c,9,17q,9,3q,9,5i,9,bg,9,3a,9,3a,9,3a,9,3a,9,3a,9,3a,9,3a,9,3a,9,3a,9,2o,9,3a,9,1y,9,7q,9,1y,9,1fq,9,12,9,8c,9,3k,9,4m,9,6,9,52,9,2e,9,3q,9,6,9,r7q,9,iu,9,12,9,5i,9,m,9,2e,9,ba,9,geu,9,13a,9,1om,9,mk,9,3k,9,1o,9,40,9,7q,9,9i,9,3a,9,ae,9,2u,9,2u,9,bq,9,2u,9,l2,9,6u,9,1y,9,bq,9,eti,9,2e,9,3q,9,lf8,1d,1ts,9,bq,9,dy,9,uu,9,3o6,9',
    S: '9,4,e,4,2s,0,q,0,4bj,0,1vj,a,t,1,5,0,1b,0,334,0',
    LOWER: '1t,q,w,1;3j,n,w,1;o,7,w,1;14,o,1,2;1c,1,-5j,1;2,3,1,2;7,8,1,2;h,n,1,2;1a,1,-3d,1;1,3,1,2;8,1,5u,1;1,2,1,2;4,1,5q,1;1,1,1,1;2,2,5p,1;2,1,1,1;3,1,27,1;1,1,5m,1;1,1,5n,1;1,1,1,1;2,1,5p,1;1,1,5r,1;2,1,5v,1;1,1,5t,1;1,1,1,1;4,1,5v,1;1,1,5x,1;2,1,5y,1;1,3,1,2;6,1,62,1;1,1,1,1;2,1,62,1;3,1,1,1;2,1,62,1;1,1,1,1;2,2,61,1;2,2,1,2;4,1,63,1;1,1,1,1;4,1,1,1;8,1,2,1;1,1,1,1;2,1,2,1;1,1,1,1;2,1,2,1;1,9,1,2;j,9,1,2;j,1,2,1;1,2,1,2;4,1,-2p,1;1,1,-1k,1;1,k,1,2;14,1,-3m,1;2,9,1,2;o,1,8bv,1;1,1,1,1;2,1,-4j,1;1,1,8bs,1;3,1,1,1;2,1,-5f,1;1,1,1x,1;1,1,1z,1;1,5,1,2;8a,2,1,2;6,1,1,1;9,1,38,1;7,1,12,1;2,3,11,1;4,1,1s,1;2,2,1r,1;3,h,w,1;i,9,w,1;18,1,8,1;9,c,1,2;s,1,-1o,1;3,1,1,1;2,1,-7,1;1,1,1,1;3,3,-3m,1;3,g,28,1;g,w,w,1;28,h,1,2;16,r,1,2;1i,1,f,1;1,7,1,2;f,1c,1,2;2p,12,1c,1;29b,12,5ls,1;13,1,5ls,1;6,1,5ls,1;k3,28,tzk,1;28,6,8,1;1pc,17,-2bk,1;19,3,-2bk,1;8z,23,1,2;4e,1,-5vj,1;2,1c,1,2;2w,8,-8,1;g,6,-8,1;g,8,-8,1;g,8,-8,1;g,6,-8,1;h,4,-8,2;f,8,-8,1;w,8,-8,1;g,8,-8,1;g,8,-8,1;g,2,-8,1;2,2,-22,1;2,1,-9,1;c,4,-2e,1;4,1,-9,1;c,2,-8,1;2,2,-2s,1;e,2,-8,1;2,2,-34,1;2,1,-7,1;c,2,-3k,1;2,2,-3i,1;2,1,-9,1;8a,1,-5st,1;4,1,-6gv,1;1,1,-6di,1;7,1,s,1;1a,g,g,1;z,1,1,1;mr,q,q,1;1fu,1c,1c,1;2o,1,1,1;2,1,-8af,1;1,1,-2xy,1;1,1,-89z,1;3,3,1,2;6,1,-8bg,1;1,1,-8al,1;1,1,-8bj,1;1,1,-8bi,1;2,1,1,1;3,1,1,1;9,2,-8cf,1;2,1e,1,2;2z,2,1,2;7,1,1,1;nym,n,1,2;1s,e,1,2;4i,7,1,2;g,v,1,2;1z,2,1,2;4,1,-r9g,1;1,5,1,2;d,1,1,1;2,1,-wmg,1;3,2,1,2;6,a,1,2;k,1,-wn8,1;1,1,-wnj,1;1,1,-wnf,1;1,1,-wn5,1;1,1,-wn8,1;2,1,-wlu,1;1,1,-wmi,1;1,1,-wlx,1;1,1,ps,1;1,8,1,2;g,1,-1c,1;1,1,-wn7,1;1,1,-raw,1;1,2,1,2;9,1,1,1;6,2,1,2;v,1,1,1;h7w,q,w,1;yn,14,14,1;4w,10,14,1;5c,b,13,1;c,f,13,1;g,7,13,1;8,2,13,1;1d8,1f,1s,1;2e8,w,w,1;gww,w,w,1;o8w,y,y,1',
    UPPER: '2p,q,-w,1;2c,1,kn,1;16,1,-3w,1;1,n,-w,1;o,7,-w,1;7,1,3d,1;2,o,-1,2;1c,1,-6g,1;2,3,-1,2;7,8,-1,2;f,1,ab,1;2,n,-1,2;1b,3,-1,2;5,1,-8c,1;1,1,5f,1;3,2,-1,2;5,1,-1,1;4,1,-1,1;6,1,-1,1;3,1,2p,1;4,1,-1,1;1,1,4j,1;4,1,3m,1;3,3,-1,2;7,1,-1,1;5,1,-1,1;3,1,-1,1;4,2,-1,2;5,1,-1,1;4,1,-1,1;2,1,1k,1;6,1,-1,1;1,1,-2,1;2,1,-1,1;1,1,-2,1;2,1,-1,1;1,1,-2,1;2,8,-1,2;f,1,-27,1;2,9,-1,2;h,1,-bq,1;2,1,-1,1;1,1,-2,1;2,1,-1,1;4,k,-1,2;16,9,-1,2;p,1,-1,1;3,2,8cf,1;3,1,-1,1;5,5,-1,2;9,1,8bj,1;1,1,8bg,1;1,1,8bi,1;1,1,-5u,1;1,1,-5q,1;2,2,-5p,1;3,1,-5m,1;2,1,-5n,1;1,1,wnj,1;4,1,-5p,1;1,1,wnf,1;2,1,-5r,1;2,1,wmg,1;1,1,wn8,1;2,1,-5t,1;1,1,-5v,1;1,1,wn8,1;1,1,8af,1;1,1,wn5,1;3,1,-5v,1;2,1,8al,1;1,1,-5x,1;3,1,-5y,1;8,1,89z,1;3,1,-62,1;2,1,wn7,1;1,1,-62,1;4,1,wmi,1;1,1,-62,1;1,1,-1x,1;1,2,-61,1;2,1,-1z,1;6,1,-63,1;b,1,wlx,1;1,1,wlu,1;4n,1,2c,1;18,2,-1,2;6,1,-1,1;4,3,3m,1;l,1,9,1;s,1,-12,1;1,3,-11,1;3,1,-b,1;1,h,-w,1;h,1,-v,1;1,9,-w,1;9,1,-1s,1;1,2,-1r,1;3,1,-1q,1;1,1,-1l,1;4,1,-1b,1;1,1,-1i,1;1,1,-8,1;2,c,-1,2;n,1,-2e,1;1,1,-28,1;1,1,7,1;1,1,-38,1;2,1,-2o,1;3,1,-1,1;3,1,-1,1;1h,w,-w,1;w,g,-28,1;h,h,-1,2;16,r,-1,2;1j,7,-1,2;d,1,-f,1;2,1c,-1,2;40,12,-1c,1;12,1,-2a,1;289,17,2bk,1;19,3,2bk,1;l7,6,-8,1;1oo,1,-4tq,1;1,1,-4tp,1;1,1,-4tg,1;1,2,-4te,1;2,1,-4tf,1;1,1,-4t8,1;1,1,-4rp,1;1,1,r7m,1;6p,1,r9g,1;4,1,2xy,1;h,1,raw,1;37,23,-1,2;45,1,-5zi,1;1,1,-5z7,1;1,1,-5z5,1;1,1,-5z4,1;1,1,-5zt,1;1,1,-1n,1;6,1c,-1,2;2n,8,8,1;g,6,8,1;g,8,8,1;g,8,8,1;g,6,8,1;g,1,-5gr,1;1,1,8,1;1,1,-5gt,1;1,1,8,1;1,1,-5gv,1;1,1,8,1;1,1,-5gx,1;1,1,8,1;9,8,8,1;g,2,22,1;2,4,2e,1;4,2,2s,1;2,2,3k,1;2,2,34,1;2,2,3i,1;4,8,-3c,1;8,8,-3k,1;8,8,-2w,1;8,8,-34,1;8,8,-1k,1;8,8,-1s,1;8,3,8,1;3,1,-5k2,1;1,1,-5ke,1;2,1,-5k5,1;1,1,-5k6,1;5,1,-5kb,1;2,1,-5k5,1;4,1,8,1;1,1,-5kc,1;1,1,-5kr,1;2,1,-5kf,1;1,1,-5kg,1;5,1,-5kl,1;4,2,8,1;2,1,-5kp,1;1,1,-5kq,1;3,1,-5kt,1;1,1,-5ku,1;9,2,8,1;2,1,-5kt,1;1,1,-5ku,1;1,1,-5kz,1;1,1,7,1;1,1,-5kx,1;1,1,-5ky,1;b,1,8,1;1,1,-5l6,1;1,1,-5lx,1;2,1,-5l9,1;1,1,-5la,1;5,1,-5lf,1;9e,1,-s,1;y,g,-g,1;k,1,-1,1;ng,q,-q,1;1gg,1c,-1c,1;1d,1,-1,1;4,1,-8bv,1;1,1,-8bs,1;2,3,-1,2;b,1,-1,1;3,1,-1,1;b,1e,-1,2;2z,2,-1,2;7,1,-1,1;d,12,-5ls,1;13,1,-5ls,1;6,1,-5ls,1;nx0,n,-1,2;1s,e,-1,2;4i,7,-1,2;g,v,-1,2;1z,2,-1,2;5,5,-1,2;d,1,-1,1;5,2,-1,2;3,1,1c,1;3,a,-1,2;u,8,-1,2;j,2,-1,2;9,1,-1,1;6,2,-1,2;v,1,-1,1;nx,1,-ps,1;t,28,-tzk,1;fps,1,-1diy,1;1,1,-1diz,1;1,1,-1dj0,1;1,1,-1dj1,1;1,1,-1dj2,1;1,1,-1diq,1;1,1,-1dir,1;d,1,-1cjz,1;1,1,-1ck0,1;1,1,-1ck1,1;1,1,-1cjs,1;1,1,-1ck3,1;tm,q,-w,1;yv,14,-14,1;4w,10,-14,1;5b,b,-13,1;c,f,-13,1;g,7,-13,1;8,2,-13,1;1dx,1f,-1s,1;2dc,w,-w,1;gww,w,-w,1;o8y,y,-y,1',
    FIXES: '2x:8h;37:an;51:qk;8h:2x;an:37;n9:qh.69q;pc:6ab;q8:6ar;qa:r4;qd:s5;qg:r5;qh:n9.69q;qi:s0;qk:51;qo:ra;qp:s1;qq:qr;qr:qq;qu:r9;r4:qa;r5:qg;r9:qu;ra:qo;s0:qi;s1:qp;s5:qd;tu:5mo;tw:5mp;u6:5mq;u9:5mr;ua:5ms.5mt;ui:5mu;v7:5mv;5mo:tu;5mp:tw;5mq:u6;5mr:u9;5ms:ua.5mt;5mt:ua.5ms;5mu:ui;5mv:v7;5mw:wuj;601:61n;61n:601;69q:n9.qh;6ab:pc;6ar:q8;wuj:5mw;1dl1:1dl2;1dl2:1dl1',
  };
  // </tablas>

  const MAX_CP = 0x10FFFF;
  const MAXREPEAT = 4294967295;
  const MAXGROUPS = 1073741823;
  const MAXCODE = 4294967295;
  const MAXWIDTH = 2 ** 64;

  const F = Object.freeze({
    TEMPLATE: 1, IGNORECASE: 2, LOCALE: 4, MULTILINE: 8, DOTALL: 16, UNICODE: 32, VERBOSE: 64, DEBUG: 128, ASCII: 256,
  });
  const TYPE_FLAGS = F.ASCII | F.LOCALE | F.UNICODE;
  const GLOBAL_FLAGS = F.DEBUG | F.TEMPLATE;

  // --------------------------------------------------------------------------------------------
  // Errores
  // --------------------------------------------------------------------------------------------
  class PyReError extends Error {
    constructor(msg, pattern = null, pos = null, opciones = {}) {
      let detalle = msg;
      if (pattern !== null && pos !== null) {
        detalle = `${msg} at position ${pos}`;
        if (pattern.includes('\n')) {
          const antes = Array.from(pattern).slice(0, pos).join('');
          const linea = antes.split('\n').length;
          const col = pos - (antes.lastIndexOf('\n') === -1 ? -1 : Array.from(antes.slice(0, antes.lastIndexOf('\n'))).length);
          detalle = `${detalle} (line ${linea}, column ${col})`;
        }
      }
      super(opciones.noSoportado ? `Expresión regular no soportada en JS: ${msg}`
        : opciones.motorAgotado ? `Expresión regular demasiado costosa para el motor de JS: ${msg}`
          : `Expresión regular no válida: ${detalle}`);
      this.name = 'PyReError';
      this.msg = msg;
      this.pattern = pattern;
      this.pos = pos;
      this.noSoportado = !!opciones.noSoportado;
      this.motorAgotado = !!opciones.motorAgotado;
      this.tipo = opciones.tipo || 'error';
    }
  }
  const noSoportado = (msg, patron) => new PyReError(msg, patron, null, { noSoportado: true });

  // --------------------------------------------------------------------------------------------
  // Conjuntos de caracteres: arrays planos [lo0, hi0, lo1, hi1, …] ordenados y sin solapes
  // --------------------------------------------------------------------------------------------
  const RS = {
    deLista(cps) {
      const v = Array.from(cps).sort((a, b) => a - b);
      const out = [];
      for (const c of v) {
        const n = out.length;
        if (n && c <= out[n - 1] + 1) { if (c > out[n - 1]) out[n - 1] = c; } else out.push(c, c);
      }
      return out;
    },
    normalizar(plano) {
      const pares = [];
      for (let i = 0; i < plano.length; i += 2) pares.push([plano[i], plano[i + 1]]);
      pares.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const out = [];
      for (const [a, b] of pares) {
        const n = out.length;
        if (n && a <= out[n - 1] + 1) { if (b > out[n - 1]) out[n - 1] = b; } else out.push(a, b);
      }
      return out;
    },
    union(a, b) { return a.length === 0 ? b : b.length === 0 ? a : RS.normalizar(a.concat(b)); },
    complemento(a) {
      const out = [];
      let prev = 0;
      for (let i = 0; i < a.length; i += 2) {
        if (a[i] > prev) out.push(prev, a[i] - 1);
        prev = a[i + 1] + 1;
      }
      if (prev <= MAX_CP) out.push(prev, MAX_CP);
      return out;
    },
    interseccion(a, b) {
      const out = [];
      let i = 0, j = 0;
      while (i < a.length && j < b.length) {
        const lo = Math.max(a[i], b[j]), hi = Math.min(a[i + 1], b[j + 1]);
        if (lo <= hi) out.push(lo, hi);
        if (a[i + 1] < b[j + 1]) i += 2; else j += 2;
      }
      return out;
    },
    resta(a, b) { return RS.interseccion(a, RS.complemento(b)); },
    contiene(a, c) {
      let lo = 0, hi = (a.length >> 1) - 1;
      while (lo <= hi) {
        const m = (lo + hi) >> 1;
        if (c < a[2 * m]) hi = m - 1; else if (c > a[2 * m + 1]) lo = m + 1; else return true;
      }
      return false;
    },
    subconjunto(a, b) { return RS.resta(a, b).length === 0; },
    tamano(a) { let n = 0; for (let i = 0; i < a.length; i += 2) n += a[i + 1] - a[i] + 1; return n; },
  };

  // --------------------------------------------------------------------------------------------
  // Tablas de Python (decodificadas bajo demanda)
  // --------------------------------------------------------------------------------------------
  const b36 = (s) => parseInt(s, 36);
  function decRangos(s) {
    const out = [];
    if (!s) return out;
    const p = s.split(',');
    let prev = -1;
    for (let i = 0; i < p.length; i += 2) {
      const a = prev + 1 + b36(p[i]);
      const b = a + b36(p[i + 1]);
      out.push(a, b);
      prev = b;
    }
    return out;
  }
  function decMapa(s) {
    const m = new Map();
    if (!s) return m;
    let prev = 0;
    for (const run of s.split(';')) {
      const [ds, n, d, st] = run.split(',').map(b36);
      const s0 = prev + ds;
      for (let k = 0; k < n; k++) { const c = s0 + k * st; m.set(c, c + d); }
      prev = s0;
    }
    return m;
  }
  function decFixes(s) {
    const m = new Map();
    if (!s) return m;
    for (const par of s.split(';')) {
      const [k, vs] = par.split(':');
      m.set(b36(k), vs.split('.').map(b36));
    }
    return m;
  }

  let TB = null;
  function tb() {
    if (TB) return TB;
    if (!TABLAS.W) throw new Error('re.js: faltan las tablas Unicode (ejecute dump_units_re.py --tablas-js --actualizar)');
    const LOWER = decMapa(TABLAS.LOWER), UPPER = decMapa(TABLAS.UPPER);
    TB = {
      W: decRangos(TABLAS.W), D: decRangos(TABLAS.D), S: decRangos(TABLAS.S),
      LOWER, UPPER, FIXES: decFixes(TABLAS.FIXES),
      dominioLower: RS.deLista(LOWER.keys()), dominioUpper: RS.deLista(UPPER.keys()),
    };
    TB.NW = RS.complemento(TB.W);
    TB.ND = RS.complemento(TB.D);
    TB.NS = RS.complemento(TB.S);
    return TB;
  }

  const ASCII_W = [0x30, 0x39, 0x41, 0x5a, 0x5f, 0x5f, 0x61, 0x7a];
  const ASCII_D = [0x30, 0x39];
  const ASCII_S = [0x09, 0x0d, 0x20, 0x20];

  function conjuntoCategoria(nombre, ascii) {
    const t = ascii ? null : tb();
    switch (nombre) {
      case 'CATEGORY_WORD': return ascii ? ASCII_W : t.W;
      case 'CATEGORY_NOT_WORD': return ascii ? RS.complemento(ASCII_W) : t.NW;
      case 'CATEGORY_DIGIT': return ascii ? ASCII_D : t.D;
      case 'CATEGORY_NOT_DIGIT': return ascii ? RS.complemento(ASCII_D) : t.ND;
      case 'CATEGORY_SPACE': return ascii ? ASCII_S : t.S;
      case 'CATEGORY_NOT_SPACE': return ascii ? RS.complemento(ASCII_S) : t.NS;
      default: throw new PyReError(`categoría no admitida ${nombre}`);
    }
  }

  // --------------------------------------------------------------------------------------------
  // Emisión de caracteres y clases
  // --------------------------------------------------------------------------------------------
  function esc(c) {
    if ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a)) return String.fromCharCode(c);
    if (c < 0x80) return '\\x' + (c < 16 ? '0' : '') + c.toString(16);
    return '\\u{' + c.toString(16) + '}';
  }
  function cuerpo(rs) {
    let s = '';
    for (let i = 0; i < rs.length; i += 2) {
      const a = rs[i], b = rs[i + 1];
      s += a === b ? esc(a) : b === a + 1 ? esc(a) + esc(b) : esc(a) + '-' + esc(b);
    }
    return s;
  }
  function claseDeConjunto(rs) {
    if (rs.length === 2 && rs[0] === rs[1]) return esc(rs[0]);
    if (rs.length === 0) return '[]';
    const comp = RS.complemento(rs);
    if (comp.length === 0) return '[\\s\\S]';
    return comp.length < rs.length ? `[^${cuerpo(comp)}]` : `[${cuerpo(rs)}]`;
  }
  const negarClase = (c) => `[^${c.slice(1, -1)}]`;

  // \w y \d del motor, corregidos contra las tablas de Python (una vez por proceso)
  let MOTOR = null;
  function escanear(rangos, rx) {
    const hallados = [];
    let buf = [];
    const vaciar = () => {
      if (!buf.length) return;
      // Cada candidato va seguido de U+0000 y solo cuentan las coincidencias que empiezan en un candidato.
      // JavaScriptCore (WebKit 26.4) reconoce los pares sustitutos con la máscara 0xDC00: una unidad de
      // U+F800–U+FBFF seguida de otra de U+FC00–U+FFFF se lee como un solo carácter en una RegExp 'u'/'v',
      // así que dos candidatos contiguos (U+FBFF U+FC00) se fundían y la corrección salía mal.
      const intercalado = new Array(buf.length * 2);
      const inicio = new Uint8Array(buf.length * 3);
      let n = 0;
      for (let i = 0; i < buf.length; i++) {
        intercalado[2 * i] = buf[i];
        intercalado[2 * i + 1] = 0;
        inicio[n] = 1;
        n += (buf[i] > 0xFFFF ? 2 : 1) + 1;
      }
      let s = '';
      for (let i = 0; i < intercalado.length; i += 8192) s += String.fromCodePoint.apply(null, intercalado.slice(i, i + 8192));
      rx.lastIndex = 0;
      let m;
      while ((m = rx.exec(s)) !== null) if (inicio[m.index]) hallados.push(m[0].codePointAt(0));
      buf = [];
    };
    for (let i = 0; i < rangos.length; i += 2) {
      for (let c = rangos[i]; c <= rangos[i + 1]; c++) {
        buf.push(c);
        if (buf.length >= 65536) vaciar();
      }
    }
    vaciar();
    return RS.deLista(hallados);
  }
  function motor() {
    if (MOTOR) return MOTOR;
    const t = tb();
    const t0 = (typeof performance !== 'undefined' ? performance : Date).now();
    // Sustitutos y planos de uso privado (Co estable) no pueden ser letras ni cifras.
    const fuera = [0xD800, 0xDFFF, 0xF0000, MAX_CP];
    const siW = RS.resta(t.W, fuera);
    const extraW = escanear(RS.resta(t.NW, fuera), /[\p{L}\p{N}_]/gv);
    const faltaW = escanear(siW, /[^\p{L}\p{N}_]/gv);
    const extraD = escanear(RS.resta(RS.union(siW, extraW), t.D), /\p{Nd}/gv);
    const faltaD = escanear(t.D, /\P{Nd}/gv);
    const corregida = (base, extra, falta) => {
      let c = `[${base}]`;
      if (extra.length) c = `[${c}--[${cuerpo(extra)}]]`;
      if (falta.length) c = `[${c}[${cuerpo(falta)}]]`;
      return c;
    };
    const W = corregida('\\p{L}\\p{N}_', extraW, faltaW);
    const D = corregida('\\p{Nd}', extraD, faltaD);
    MOTOR = {
      W, NW: negarClase(W), D, ND: negarClase(D),
      S: `[${cuerpo(t.S)}]`, NS: `[^${cuerpo(t.S)}]`,
      diagnostico: {
        extraW: RS.tamano(extraW), faltaW: RS.tamano(faltaW), extraD: RS.tamano(extraD), faltaD: RS.tamano(faltaD),
        rangosExtraW: extraW.length / 2, ms: (typeof performance !== 'undefined' ? performance : Date).now() - t0,
      },
    };
    return MOTOR;
  }
  const A_W = `[${cuerpo(ASCII_W)}]`, A_D = `[${cuerpo(ASCII_D)}]`, A_S = `[${cuerpo(ASCII_S)}]`;
  function emisionCategoria(nombre, ascii) {
    if (ascii) {
      switch (nombre) {
        case 'CATEGORY_WORD': return A_W;
        case 'CATEGORY_NOT_WORD': return negarClase(A_W);
        case 'CATEGORY_DIGIT': return A_D;
        case 'CATEGORY_NOT_DIGIT': return negarClase(A_D);
        case 'CATEGORY_SPACE': return A_S;
        case 'CATEGORY_NOT_SPACE': return negarClase(A_S);
      }
    }
    const m = motor();
    switch (nombre) {
      case 'CATEGORY_WORD': return m.W;
      case 'CATEGORY_NOT_WORD': return m.NW;
      case 'CATEGORY_DIGIT': return m.D;
      case 'CATEGORY_NOT_DIGIT': return m.ND;
      case 'CATEGORY_SPACE': return m.S;
      case 'CATEGORY_NOT_SPACE': return m.NS;
    }
    throw new PyReError(`categoría no admitida ${nombre}`);
  }

  // --------------------------------------------------------------------------------------------
  // Mayúsculas y minúsculas de sre
  // --------------------------------------------------------------------------------------------
  const lowerU = (c) => { const v = tb().LOWER.get(c); return v === undefined ? c : v; };
  const upperU = (c) => { const v = tb().UPPER.get(c); return v === undefined ? c : v; };
  const iscasedU = (c) => lowerU(c) !== c || upperU(c) !== c;
  const lowerA = (c) => (c >= 0x41 && c <= 0x5a ? c + 32 : c);
  const iscasedA = (c) => (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a);

  /** {X : lower(X) ∈ C} */
  function preimagen(C, ascii) {
    const extra = [];
    if (ascii) {
      for (let c = 0x41; c <= 0x5a; c++) if (RS.contiene(C, c + 32)) extra.push(c);
      return RS.union(RS.resta(C, [0x41, 0x5a]), RS.deLista(extra));
    }
    const t = tb();
    for (const [x, l] of t.LOWER) if (RS.contiene(C, l)) extra.push(x);
    return RS.union(RS.resta(C, t.dominioLower), RS.deLista(extra));
  }
  /** {Y : upper(Y) ∈ R} */
  function preimagenUpper(R) {
    const t = tb();
    const extra = [];
    for (const [y, u] of t.UPPER) if (RS.contiene(R, u)) extra.push(y);
    return RS.union(RS.resta(R, t.dominioUpper), RS.deLista(extra));
  }

  const cacheLiteralI = new Map();
  /** Conjunto de un literal con IGNORECASE, o null si sre lo compara tal cual. */
  function conjuntoLiteralI(c, ascii) {
    const k = (ascii ? 'a' : 'u') + c;
    if (cacheLiteralI.has(k)) return cacheLiteralI.get(k);
    let r = null;
    if (ascii) {
      if (iscasedA(c)) r = preimagen([lowerA(c), lowerA(c)], true);
    } else if (iscasedU(c)) {
      const lo = lowerU(c);
      r = preimagen(RS.deLista([lo, ...(tb().FIXES.get(lo) || [])]), false);
    }
    cacheLiteralI.set(k, r);
    return r;
  }

  /** Clase de sre → { explicito, cats, negar, ascii } con la semántica de _optimize_charset. */
  function infoClase(items, flags) {
    const ignore = !!(flags & F.IGNORECASE) && !(flags & F.LOCALE);
    const ascii = !(flags & F.UNICODE);
    let negar = false;
    const cats = [];
    const crudos = [];
    for (const [op, av] of items) {
      if (op === 'NEGATE') negar = true;
      else if (op === 'CATEGORY') { if (!cats.includes(av)) cats.push(av); }
      else if (op === 'LITERAL') crudos.push(av, av);
      else if (op === 'RANGE') crudos.push(av[0], av[1]);
      else throw new PyReError(`elemento de clase inesperado ${op}`);
    }
    if (!ignore) return { explicito: RS.normalizar(crudos), cats, negar, ascii };
    const lower = ascii ? lowerA : lowerU;
    const iscased = ascii ? iscasedA : iscasedU;
    const fixes = ascii ? null : tb().FIXES;
    const charmap = new Uint8Array(0x10000);
    let hascased = false;
    const colaLit = [], colaRango = [];
    const marcar = (lo) => {
      charmap[lo] = 1;
      const fx = fixes && fixes.get(lo);
      if (fx) for (const k of fx) charmap[k] = 1;
    };
    for (const [op, av] of items) {
      if (op === 'LITERAL') {
        const lo = lower(av);
        if (lo > 0xFFFF) { colaLit.push(av); hascased = true; } else { marcar(lo); if (iscased(av)) hascased = true; }
      } else if (op === 'RANGE') {
        const [a, b] = av;
        for (let c = a; c <= Math.min(b, 0xFFFF); c++) marcar(lower(c));
        if (b > 0xFFFF) { colaRango.push([a, b]); hascased = true; } else if (!hascased) {
          for (let c = a; c <= b; c++) if (iscased(c)) { hascased = true; break; }
        }
      }
    }
    if (!hascased) return { explicito: RS.normalizar(crudos), cats, negar, ascii };
    const lista = [];
    for (let c = 0; c < 0x10000; c++) if (charmap[c]) lista.push(c);
    let F1 = preimagen(RS.union(RS.deLista(lista), RS.deLista(colaLit)), ascii);
    for (const [a, b] of colaRango) {
      const R = [a, b];
      F1 = RS.union(F1, RS.union(preimagen(R, ascii), preimagen(preimagenUpper(R), ascii)));
    }
    return { explicito: F1, cats, negar, ascii };
  }
  const CATEGORIA_OPUESTA = {
    CATEGORY_WORD: 'CATEGORY_NOT_WORD', CATEGORY_NOT_WORD: 'CATEGORY_WORD',
    CATEGORY_DIGIT: 'CATEGORY_NOT_DIGIT', CATEGORY_NOT_DIGIT: 'CATEGORY_DIGIT',
    CATEGORY_SPACE: 'CATEGORY_NOT_SPACE', CATEGORY_NOT_SPACE: 'CATEGORY_SPACE',
  };
  function emitirClase(info) {
    if (!info.cats.length) return claseDeConjunto(info.negar ? RS.complemento(info.explicito) : info.explicito);
    // Con ASCII todas las categorías son conjuntos pequeños: la clase se emite plana, con el conjunto ya calculado.
    // JavaScriptCore (WebKit 26.4) calcula mal una clase negada anidada de rangos ASCII en modo 'v': [[^0-9A-Z_a-z][0-9]]
    // casa «a» y [^[^0-9][\x09-\x0d\x20]] no casa «0».
    if (info.ascii) return claseDeConjunto(conjuntoClase(info));
    if (info.cats.length === 1 && info.explicito.length === 0) {
      // [^\S] = \s, [^\W] = \w, [^\D] = \d: la categoría opuesta. Negar la emisión con negarClase daría [^^…] cuando la
      // categoría ya se emite negada, y en modo 'v' ese segundo ^ es un literal.
      return emisionCategoria(info.negar ? CATEGORIA_OPUESTA[info.cats[0]] : info.cats[0], info.ascii);
    }
    const partes = cuerpo(info.explicito) + info.cats.map((c) => emisionCategoria(c, info.ascii)).join('');
    return `[${info.negar ? '^' : ''}${partes}]`;
  }
  function conjuntoClase(info) {
    let s = info.explicito;
    for (const c of info.cats) s = RS.union(s, conjuntoCategoria(c, info.ascii));
    return info.negar ? RS.complemento(s) : s;
  }

  // --------------------------------------------------------------------------------------------
  // Analizador: port de re/_parser.py (Python 3.12)
  // --------------------------------------------------------------------------------------------
  const SPECIAL_CHARS = new Set('.\\[{()*+?^$|');
  const REPEAT_CHARS = new Set('*+?{');
  const DIGITS = new Set('0123456789');
  const OCTDIGITS = new Set('01234567');
  const HEXDIGITS = new Set('0123456789abcdefABCDEF');
  const ASCIILETTERS = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const WHITESPACE = new Set(' \t\n\r\v\f');
  const REPEATCODES = new Set(['MIN_REPEAT', 'MAX_REPEAT', 'POSSESSIVE_REPEAT']);
  const UNITCODES = new Set(['ANY', 'RANGE', 'IN', 'LITERAL', 'NOT_LITERAL', 'CATEGORY']);
  const ESCAPES = new Map([['\\a', 7], ['\\b', 8], ['\\f', 12], ['\\n', 10], ['\\r', 13], ['\\t', 9], ['\\v', 11], ['\\\\', 92]]);
  const CATEGORIES = new Map([
    ['\\A', ['AT', 'AT_BEGINNING_STRING']], ['\\b', ['AT', 'AT_BOUNDARY']], ['\\B', ['AT', 'AT_NON_BOUNDARY']],
    ['\\d', ['IN', [['CATEGORY', 'CATEGORY_DIGIT']]]], ['\\D', ['IN', [['CATEGORY', 'CATEGORY_NOT_DIGIT']]]],
    ['\\s', ['IN', [['CATEGORY', 'CATEGORY_SPACE']]]], ['\\S', ['IN', [['CATEGORY', 'CATEGORY_NOT_SPACE']]]],
    ['\\w', ['IN', [['CATEGORY', 'CATEGORY_WORD']]]], ['\\W', ['IN', [['CATEGORY', 'CATEGORY_NOT_WORD']]]],
    ['\\Z', ['AT', 'AT_END_STRING']],
  ]);
  const FLAGS = new Map([['i', F.IGNORECASE], ['L', F.LOCALE], ['m', F.MULTILINE], ['s', F.DOTALL], ['x', F.VERBOSE],
    ['a', F.ASCII], ['t', F.TEMPLATE], ['u', F.UNICODE]]);

  const lenCp = (s) => { let n = 0; for (const _ of s) n++; return n; };
  const esIdentificador = (s) => /^[\p{XID_Start}_]\p{XID_Continue}*$/u.test(s);
  const esAlfa = (s) => /^\p{L}+$/u.test(s);
  const decimalAscii = (s) => /^[0-9]+$/.test(s);
  const cp = (tok) => tok.codePointAt(tok[0] === '\\' ? 1 : 0);
  const repr = (s) => `'${s}'`;

  class Tokenizador {
    constructor(cadena) {
      this.cadena = cadena;
      this.cps = Array.from(cadena);
      this.index = 0;
      this.next = null;
      this.nextLen = 0;
      this._sig();
    }
    _sig() {
      let i = this.index;
      if (i >= this.cps.length) { this.next = null; this.nextLen = 0; return; }
      let ch = this.cps[i];
      let n = 1;
      if (ch === '\\') {
        i++;
        if (i >= this.cps.length) throw new PyReError('bad escape (end of pattern)', this.cadena, this.cps.length - 1);
        ch += this.cps[i];
        n = 2;
      }
      this.index = i + 1;
      this.next = ch;
      this.nextLen = n;
    }
    match(c) { if (c === this.next) { this._sig(); return true; } return false; }
    get() { const t = this.next; this._sig(); return t; }
    getwhile(n, conjunto) {
      let r = '';
      for (let k = 0; k < n; k++) {
        const c = this.next;
        if (c === null || !conjunto.has(c)) break;
        r += c;
        this._sig();
      }
      return r;
    }
    getuntil(terminador, nombre) {
      let r = '';
      while (true) {
        const c = this.next;
        this._sig();
        if (c === null) {
          if (!r) throw this.error('missing ' + nombre);
          throw this.error(`missing ${terminador}, unterminated name`, lenCp(r));
        }
        if (c === terminador) {
          if (!r) throw this.error('missing ' + nombre, 1);
          break;
        }
        r += c;
      }
      return r;
    }
    tell() { return this.index - this.nextLen; }
    seek(index) { this.index = index; this._sig(); }
    error(msg, offset = 0) { return new PyReError(msg, this.cadena, this.tell() - offset); }
    checkgroupname(nombre, offset) {
      if (!esIdentificador(nombre)) throw this.error(`bad character in group name ${repr(nombre)}`, lenCp(nombre) + offset);
    }
  }

  class Estado {
    constructor() {
      this.flags = 0;
      this.groupdict = new Map();
      this.groupwidths = [null];
      this.lookbehindgroups = null;
      this.grouprefpos = new Map();
    }
    get groups() { return this.groupwidths.length; }
    opengroup(nombre = null) {
      const gid = this.groups;
      this.groupwidths.push(null);
      if (this.groups > MAXGROUPS) throw new PyReError('too many groups');
      if (nombre !== null) {
        const ogid = this.groupdict.get(nombre);
        if (ogid !== undefined) throw new PyReError(`redefinition of group name ${repr(nombre)} as group ${gid}; was group ${ogid}`);
        this.groupdict.set(nombre, gid);
      }
      return gid;
    }
    closegroup(gid, p) { this.groupwidths[gid] = anchura(p, this); }
    checkgroup(gid) { return gid < this.groups && this.groupwidths[gid] !== null; }
    checklookbehindgroup(gid, source) {
      if (this.lookbehindgroups !== null) {
        if (!this.checkgroup(gid)) throw source.error('cannot refer to an open group');
        if (gid >= this.lookbehindgroups) throw source.error('cannot refer to group defined in the same lookbehind subpattern');
      }
    }
  }

  function anchura(nodos, estado) {
    let lo = 0, hi = 0;
    for (const [op, av] of nodos) {
      if (op === 'BRANCH') {
        let i = MAXWIDTH, j = 0;
        for (const alt of av) { const [l, h] = anchura(alt, estado); i = Math.min(i, l); j = Math.max(j, h); }
        lo += i; hi += j;
      } else if (op === 'ATOMIC_GROUP') {
        const [i, j] = anchura(av, estado); lo += i; hi += j;
      } else if (op === 'SUBPATTERN') {
        const [i, j] = anchura(av[3], estado); lo += i; hi += j;
      } else if (REPEATCODES.has(op)) {
        const [i, j] = anchura(av[2], estado);
        lo += i * av[0];
        if (av[1] === MAXREPEAT && j) hi = MAXWIDTH; else hi += j * av[1];
      } else if (UNITCODES.has(op)) {
        lo += 1; hi += 1;
      } else if (op === 'GROUPREF') {
        const [i, j] = estado.groupwidths[av]; lo += i; hi += j;
      } else if (op === 'GROUPREF_EXISTS') {
        let [i, j] = anchura(av[1], estado);
        if (av[2] !== null) { const [l, h] = anchura(av[2], estado); i = Math.min(i, l); j = Math.max(j, h); } else i = 0;
        lo += i; hi += j;
      }
    }
    return [Math.min(lo, MAXWIDTH), Math.min(hi, MAXWIDTH)];
  }

  function claveNodo(n) { return JSON.stringify(n); }
  function uniq(items) {
    const vistos = new Set(), out = [];
    for (const it of items) { const k = claveNodo(it); if (!vistos.has(k)) { vistos.add(k); out.push(it); } }
    return out;
  }
  /** Igualdad de tuplas de Python: los SubPattern se comparan por identidad. */
  function igualNodo(a, b) {
    if (a[0] !== b[0]) return false;
    const [op, x] = a, y = b[1];
    switch (op) {
      case 'LITERAL': case 'NOT_LITERAL': case 'GROUPREF': case 'AT': case 'CATEGORY': case 'ANY': case 'NEGATE':
        return x === y;
      case 'RANGE': return x[0] === y[0] && x[1] === y[1];
      case 'IN': return x.length === y.length && x.every((it, i) => igualNodo(it, y[i]));
      case 'SUBPATTERN': return x[0] === y[0] && x[1] === y[1] && x[2] === y[2] && x[3] === y[3];
      case 'MAX_REPEAT': case 'MIN_REPEAT': case 'POSSESSIVE_REPEAT': return x[0] === y[0] && x[1] === y[1] && x[2] === y[2];
      case 'ASSERT': case 'ASSERT_NOT': return x[0] === y[0] && x[1] === y[1];
      case 'ATOMIC_GROUP': return x === y;
      case 'BRANCH': return x.length === y.length && x.every((it, i) => it === y[i]);
      case 'GROUPREF_EXISTS': return x[0] === y[0] && x[1] === y[1] && x[2] === y[2];
      default: return false;
    }
  }

  function escapeClase(source, esc_) {
    const code = ESCAPES.get(esc_);
    if (code !== undefined) return ['LITERAL', code];
    const cat = CATEGORIES.get(esc_);
    if (cat && cat[0] === 'IN') return cat;
    let escape = esc_;
    const c = Array.from(escape)[1];
    if (c === 'x') {
      escape += source.getwhile(2, HEXDIGITS);
      if (escape.length !== 4) throw source.error(`incomplete escape ${escape}`, escape.length);
      return ['LITERAL', parseInt(escape.slice(2), 16)];
    } else if (c === 'u') {
      escape += source.getwhile(4, HEXDIGITS);
      if (escape.length !== 6) throw source.error(`incomplete escape ${escape}`, escape.length);
      return ['LITERAL', parseInt(escape.slice(2), 16)];
    } else if (c === 'U') {
      escape += source.getwhile(8, HEXDIGITS);
      if (escape.length !== 10) throw source.error(`incomplete escape ${escape}`, escape.length);
      const v = parseInt(escape.slice(2), 16);
      if (v > MAX_CP) throw source.error(`bad escape ${escape}`, escape.length);
      return ['LITERAL', v];
    } else if (c === 'N') {
      throw noSoportado('\\N{…} (nombres de caracteres Unicode)', source.cadena);
    } else if (OCTDIGITS.has(c)) {
      escape += source.getwhile(2, OCTDIGITS);
      const v = parseInt(escape.slice(1), 8);
      if (v > 0o377) throw source.error(`octal escape value ${escape} outside of range 0-0o377`, escape.length);
      return ['LITERAL', v];
    } else if (DIGITS.has(c)) {
      throw source.error(`bad escape ${escape}`, escape.length);
    }
    if (lenCp(escape) === 2) {
      if (ASCIILETTERS.has(c)) throw source.error(`bad escape ${escape}`, 2);
      return ['LITERAL', c.codePointAt(0)];
    }
    throw source.error(`bad escape ${escape}`, lenCp(escape));
  }

  function escape_(source, esc_, state) {
    const cat = CATEGORIES.get(esc_);
    if (cat) return cat;
    const code = ESCAPES.get(esc_);
    if (code !== undefined) return ['LITERAL', code];
    let escape = esc_;
    const c = Array.from(escape)[1];
    if (c === 'x') {
      escape += source.getwhile(2, HEXDIGITS);
      if (escape.length !== 4) throw source.error(`incomplete escape ${escape}`, escape.length);
      return ['LITERAL', parseInt(escape.slice(2), 16)];
    } else if (c === 'u') {
      escape += source.getwhile(4, HEXDIGITS);
      if (escape.length !== 6) throw source.error(`incomplete escape ${escape}`, escape.length);
      return ['LITERAL', parseInt(escape.slice(2), 16)];
    } else if (c === 'U') {
      escape += source.getwhile(8, HEXDIGITS);
      if (escape.length !== 10) throw source.error(`incomplete escape ${escape}`, escape.length);
      const v = parseInt(escape.slice(2), 16);
      if (v > MAX_CP) throw source.error(`bad escape ${escape}`, escape.length);
      return ['LITERAL', v];
    } else if (c === 'N') {
      throw noSoportado('\\N{…} (nombres de caracteres Unicode)', source.cadena);
    } else if (c === '0') {
      escape += source.getwhile(2, OCTDIGITS);
      return ['LITERAL', parseInt(escape.slice(1), 8)];
    } else if (DIGITS.has(c)) {
      if (source.next !== null && DIGITS.has(source.next)) {
        escape += source.get();
        if (OCTDIGITS.has(escape[1]) && OCTDIGITS.has(escape[2]) && source.next !== null && OCTDIGITS.has(source.next)) {
          escape += source.get();
          const v = parseInt(escape.slice(1), 8);
          if (v > 0o377) throw source.error(`octal escape value ${escape} outside of range 0-0o377`, escape.length);
          return ['LITERAL', v];
        }
      }
      const group = parseInt(escape.slice(1), 10);
      if (group < state.groups) {
        if (!state.checkgroup(group)) throw source.error('cannot refer to an open group', escape.length);
        state.checklookbehindgroup(group, source);
        return ['GROUPREF', group];
      }
      throw source.error(`invalid group reference ${group}`, escape.length - 1);
    }
    if (lenCp(escape) === 2) {
      if (ASCIILETTERS.has(c)) throw source.error(`bad escape ${escape}`, 2);
      return ['LITERAL', c.codePointAt(0)];
    }
    throw source.error(`bad escape ${escape}`, lenCp(escape));
  }

  function parseSub(source, state, verbose, nested) {
    const items = [];
    while (true) {
      items.push(parse_(source, state, verbose, nested + 1, !nested && items.length === 0));
      if (!source.match('|')) break;
      if (!nested) verbose = state.flags & F.VERBOSE;
    }
    if (items.length === 1) return items[0];
    const sub = [];
    while (true) {
      let prefijo = null, comun = true;
      for (const item of items) {
        if (!item.length) { comun = false; break; }
        if (prefijo === null) prefijo = item[0];
        else if (!igualNodo(item[0], prefijo)) { comun = false; break; }
      }
      if (!comun) break;
      for (const item of items) item.shift();
      sub.push(prefijo);
    }
    const set = [];
    let todos = true;
    for (const item of items) {
      if (item.length !== 1) { todos = false; break; }
      const [op, av] = item[0];
      if (op === 'LITERAL') set.push(item[0]);
      else if (op === 'IN' && av[0][0] !== 'NEGATE') set.push(...av);
      else { todos = false; break; }
    }
    if (todos) { sub.push(['IN', uniq(set)]); return sub; }
    sub.push(['BRANCH', items]);
    return sub;
  }

  function parseFlags(source, state, char) {
    let addFlags = 0, delFlags = 0;
    if (char !== '-') {
      while (true) {
        const flag = FLAGS.get(char);
        if (char === 'L') throw source.error("bad inline flags: cannot use 'L' flag with a str pattern");
        addFlags |= flag;
        if ((flag & TYPE_FLAGS) && (addFlags & TYPE_FLAGS) !== flag) {
          throw source.error("bad inline flags: flags 'a', 'u' and 'L' are incompatible");
        }
        char = source.get();
        if (char === null) throw source.error('missing -, : or )');
        if (char === ')' || char === '-' || char === ':') break;
        if (!FLAGS.has(char)) throw source.error(esAlfa(char) ? 'unknown flag' : 'missing -, : or )', lenCp(char));
      }
    }
    if (char === ')') { state.flags |= addFlags; return null; }
    if (addFlags & GLOBAL_FLAGS) throw source.error('bad inline flags: cannot turn on global flag', 1);
    if (char === '-') {
      char = source.get();
      if (char === null) throw source.error('missing flag');
      if (!FLAGS.has(char)) throw source.error(esAlfa(char) ? 'unknown flag' : 'missing flag', lenCp(char));
      while (true) {
        const flag = FLAGS.get(char);
        if (flag & TYPE_FLAGS) throw source.error("bad inline flags: cannot turn off flags 'a', 'u' and 'L'");
        delFlags |= flag;
        char = source.get();
        if (char === null) throw source.error('missing :');
        if (char === ':') break;
        if (!FLAGS.has(char)) throw source.error(esAlfa(char) ? 'unknown flag' : 'missing :', lenCp(char));
      }
    }
    if (delFlags & GLOBAL_FLAGS) throw source.error('bad inline flags: cannot turn off global flag', 1);
    if (addFlags & delFlags) throw source.error('bad inline flags: flag turned on and off', 1);
    return [addFlags, delFlags];
  }

  function parse_(source, state, verbose, nested, first = false) {
    const sub = [];
    while (true) {
      let esto = source.next;
      if (esto === null) break;
      if (esto === '|' || esto === ')') break;
      source.get();
      if (verbose) {
        if (WHITESPACE.has(esto)) continue;
        if (esto === '#') {
          while (true) { esto = source.get(); if (esto === null || esto === '\n') break; }
          continue;
        }
      }
      if (esto[0] === '\\') {
        sub.push(escape_(source, esto, state));
      } else if (!SPECIAL_CHARS.has(esto)) {
        sub.push(['LITERAL', cp(esto)]);
      } else if (esto === '[') {
        const here = source.tell() - 1;
        const set = [];
        const negate = source.match('^');
        while (true) {
          esto = source.get();
          if (esto === null) throw source.error('unterminated character set', source.tell() - here);
          let code1;
          if (esto === ']' && set.length) break;
          else if (esto[0] === '\\') code1 = escapeClase(source, esto);
          else code1 = ['LITERAL', cp(esto)];
          if (source.match('-')) {
            const that = source.get();
            if (that === null) throw source.error('unterminated character set', source.tell() - here);
            if (that === ']') {
              if (code1[0] === 'IN') code1 = code1[1][0];
              set.push(code1, ['LITERAL', 0x2d]);
              break;
            }
            const code2 = that[0] === '\\' ? escapeClase(source, that) : ['LITERAL', cp(that)];
            if (code1[0] !== 'LITERAL' || code2[0] !== 'LITERAL') {
              throw source.error(`bad character range ${esto}-${that}`, lenCp(esto) + 1 + lenCp(that));
            }
            if (code2[1] < code1[1]) throw source.error(`bad character range ${esto}-${that}`, lenCp(esto) + 1 + lenCp(that));
            set.push(['RANGE', [code1[1], code2[1]]]);
          } else {
            if (code1[0] === 'IN') code1 = code1[1][0];
            set.push(code1);
          }
        }
        const u = uniq(set);
        if (u.length === 1 && u[0][0] === 'LITERAL') sub.push(negate ? ['NOT_LITERAL', u[0][1]] : u[0]);
        else { if (negate) u.unshift(['NEGATE', null]); sub.push(['IN', u]); }
      } else if (REPEAT_CHARS.has(esto)) {
        const here = source.tell();
        let min, max;
        if (esto === '?') { min = 0; max = 1; }
        else if (esto === '*') { min = 0; max = MAXREPEAT; }
        else if (esto === '+') { min = 1; max = MAXREPEAT; }
        else {
          if (source.next === '}') { sub.push(['LITERAL', 0x7b]); continue; }
          min = 0; max = MAXREPEAT;
          let lo = '', hi = '';
          while (source.next !== null && DIGITS.has(source.next)) lo += source.get();
          if (source.match(',')) { while (source.next !== null && DIGITS.has(source.next)) hi += source.get(); } else hi = lo;
          if (!source.match('}')) { sub.push(['LITERAL', 0x7b]); source.seek(here); continue; }
          if (lo) { min = Number(lo); if (min >= MAXREPEAT) throw new PyReError('the repetition number is too large', null, null, { tipo: 'OverflowError' }); }
          if (hi) {
            max = Number(hi);
            if (max >= MAXREPEAT) throw new PyReError('the repetition number is too large', null, null, { tipo: 'OverflowError' });
            if (max < min) throw source.error('min repeat greater than max repeat', source.tell() - here);
          }
        }
        let item = sub.length ? [sub[sub.length - 1]] : null;
        if (!item || item[0][0] === 'AT') throw source.error('nothing to repeat', source.tell() - here + lenCp(esto));
        if (REPEATCODES.has(item[0][0])) throw source.error('multiple repeat', source.tell() - here + lenCp(esto));
        if (item[0][0] === 'SUBPATTERN') {
          const [g, add, del, p] = item[0][1];
          if (g === null && !add && !del) item = p;
        }
        let op = 'MAX_REPEAT';
        if (source.match('?')) op = 'MIN_REPEAT';
        else if (source.match('+')) op = 'POSSESSIVE_REPEAT';
        sub[sub.length - 1] = [op, [min, max, item]];
      } else if (esto === '.') {
        sub.push(['ANY', null]);
      } else if (esto === '(') {
        const start = source.tell() - 1;
        let capture = true, atomic = false, name = null, addFlags = 0, delFlags = 0;
        if (source.match('?')) {
          let char = source.get();
          if (char === null) throw source.error('unexpected end of pattern');
          if (char === 'P') {
            if (source.match('<')) {
              name = source.getuntil('>', 'group name');
              source.checkgroupname(name, 1);
            } else if (source.match('=')) {
              name = source.getuntil(')', 'group name');
              source.checkgroupname(name, 1);
              const gid = state.groupdict.get(name);
              if (gid === undefined) throw source.error(`unknown group name ${repr(name)}`, lenCp(name) + 1);
              if (!state.checkgroup(gid)) throw source.error('cannot refer to an open group', lenCp(name) + 1);
              state.checklookbehindgroup(gid, source);
              sub.push(['GROUPREF', gid]);
              continue;
            } else {
              char = source.get();
              if (char === null) throw source.error('unexpected end of pattern');
              throw source.error('unknown extension ?P' + char, lenCp(char) + 2);
            }
          } else if (char === ':') {
            capture = false;
          } else if (char === '#') {
            while (true) {
              if (source.next === null) throw source.error('missing ), unterminated comment', source.tell() - start);
              if (source.get() === ')') break;
            }
            continue;
          } else if (char === '=' || char === '!' || char === '<') {
            let dir = 1, lookbehindgroups;
            if (char === '<') {
              char = source.get();
              if (char === null) throw source.error('unexpected end of pattern');
              if (char !== '=' && char !== '!') throw source.error('unknown extension ?<' + char, lenCp(char) + 2);
              dir = -1;
              lookbehindgroups = state.lookbehindgroups;
              if (lookbehindgroups === null) state.lookbehindgroups = state.groups;
            }
            const p = parseSub(source, state, verbose, nested + 1);
            if (dir < 0 && lookbehindgroups === null) state.lookbehindgroups = null;
            if (!source.match(')')) throw source.error('missing ), unterminated subpattern', source.tell() - start);
            sub.push([char === '=' ? 'ASSERT' : 'ASSERT_NOT', [dir, p]]);
            continue;
          } else if (char === '(') {
            const condname = source.getuntil(')', 'group name');
            let condgroup;
            if (!decimalAscii(condname)) {
              source.checkgroupname(condname, 1);
              condgroup = state.groupdict.get(condname);
              if (condgroup === undefined) throw source.error(`unknown group name ${repr(condname)}`, lenCp(condname) + 1);
            } else {
              condgroup = Number(condname);
              if (!condgroup) throw source.error('bad group number', lenCp(condname) + 1);
              if (condgroup >= MAXGROUPS) throw source.error(`invalid group reference ${condgroup}`, lenCp(condname) + 1);
              if (!state.grouprefpos.has(condgroup)) state.grouprefpos.set(condgroup, source.tell() - lenCp(condname) - 1);
            }
            state.checklookbehindgroup(condgroup, source);
            const itemYes = parse_(source, state, verbose, nested + 1);
            let itemNo = null;
            if (source.match('|')) {
              itemNo = parse_(source, state, verbose, nested + 1);
              if (source.next === '|') throw source.error('conditional backref with more than two branches');
            }
            if (!source.match(')')) throw source.error('missing ), unterminated subpattern', source.tell() - start);
            sub.push(['GROUPREF_EXISTS', [condgroup, itemYes, itemNo]]);
            continue;
          } else if (char === '>') {
            capture = false;
            atomic = true;
          } else if (FLAGS.has(char) || char === '-') {
            const fl = parseFlags(source, state, char);
            if (fl === null) {
              if (!first || sub.length) throw source.error('global flags not at the start of the expression', source.tell() - start);
              verbose = state.flags & F.VERBOSE;
              continue;
            }
            [addFlags, delFlags] = fl;
            capture = false;
          } else {
            throw source.error('unknown extension ?' + char, lenCp(char) + 1);
          }
        }
        let group = null;
        if (capture) {
          try {
            group = state.opengroup(name);
          } catch (err) {
            if (err instanceof PyReError && !err.noSoportado) throw source.error(err.msg, (name ? lenCp(name) : 0) + 1);
            throw err;
          }
        }
        const subVerbose = (verbose || (addFlags & F.VERBOSE)) && !(delFlags & F.VERBOSE);
        const p = parseSub(source, state, subVerbose, nested + 1);
        if (!source.match(')')) throw source.error('missing ), unterminated subpattern', source.tell() - start);
        if (group !== null) state.closegroup(group, p);
        if (atomic) sub.push(['ATOMIC_GROUP', p]);
        else sub.push(['SUBPATTERN', [group, addFlags, delFlags, p]]);
      } else if (esto === '^') {
        sub.push(['AT', 'AT_BEGINNING']);
      } else if (esto === '$') {
        sub.push(['AT', 'AT_END']);
      } else {
        throw new PyReError(`unsupported special character ${repr(esto)}`);
      }
    }
    for (let i = sub.length - 1; i >= 0; i--) {
      const [op, av] = sub[i];
      if (op === 'SUBPATTERN') {
        const [g, add, del, p] = av;
        if (g === null && !add && !del) sub.splice(i, 1, ...p);
      }
    }
    return sub;
  }

  function fixFlags(flags) {
    if (flags & F.LOCALE) throw new PyReError('cannot use LOCALE flag with a str pattern', null, null, { tipo: 'ValueError' });
    if (!(flags & F.ASCII)) flags |= F.UNICODE;
    else if (flags & F.UNICODE) throw new PyReError('ASCII and UNICODE flags are incompatible', null, null, { tipo: 'ValueError' });
    return flags;
  }

  function parsear(cadena, flags = 0) {
    const source = new Tokenizador(cadena);
    const state = new Estado();
    state.flags = flags;
    const p = parseSub(source, state, flags & F.VERBOSE, 0);
    state.flags = fixFlags(state.flags);
    if (source.next !== null) throw source.error('unbalanced parenthesis');
    for (const [g, pos] of state.grouprefpos) {
      if (g >= state.groups) throw new PyReError(`invalid group reference ${g}`, cadena, pos);
    }
    return { p, state };
  }

  // --------------------------------------------------------------------------------------------
  // Traducción del árbol a RegExp 'v'
  // --------------------------------------------------------------------------------------------
  const combinarFlags = (flags, add, del) => (((add & TYPE_FLAGS) ? flags & ~TYPE_FLAGS : flags) | add) & ~del;

  function tieneCaptura(nodos) {
    for (const [op, av] of nodos) {
      if (op === 'SUBPATTERN' && (av[0] !== null || tieneCaptura(av[3]))) return true;
      if (op === 'BRANCH' && av.some(tieneCaptura)) return true;
      if (REPEATCODES.has(op) && tieneCaptura(av[2])) return true;
      if ((op === 'ASSERT' || op === 'ASSERT_NOT') && tieneCaptura(av[1])) return true;
      if (op === 'ATOMIC_GROUP' && tieneCaptura(av)) return true;
    }
    return false;
  }

  function cuantificador(mn, mx) {
    if (mx === MAXREPEAT) return mn === 0 ? '*' : mn === 1 ? '+' : `{${mn},}`;
    if (mn === 0 && mx === 1) return '?';
    return mn === mx ? `{${mn}}` : `{${mn},${mx}}`;
  }

  class Emisor {
    constructor(patron, state, desplazamiento = 0) {
      this.patron = patron;
      this.state = state;
      this.nJs = desplazamiento;
      this.mapa = [0];
      this.cierres = [0];
      this.nCierre = 0;
      this.pila = [];
      this.idAmbito = 0;
      this.ambitoGrupo = [];
    }
    conAmbito(tipo, fn) {
      this.pila.push({ tipo, id: ++this.idAmbito });
      try { return fn(); } finally { this.pila.pop(); }
    }
    secuencia(nodos, flags) {
      let s = '';
      for (let i = 0; i < nodos.length; i++) s += this.nodo(nodos, i, flags);
      return s;
    }
    atomo(p, flags) {
      if (p.length === 1 && ['LITERAL', 'NOT_LITERAL', 'IN', 'ANY'].includes(p[0][0])) return this.nodo(p, 0, flags);
      return '(?:' + this.secuencia(p, flags) + ')';
    }
    /**
     * true si, en el orden de preferencia del motor, los caminos vacíos de la secuencia van detrás de todos los que
     * consumen. Entonces una repetición voraz de ella casa igual en sre (que acepta una vuelta vacía y para) y en RegExp
     * (que descarta la vuelta vacía y para): las dos siguen con la cola en la misma posición.
     */
    vacioAlFinal(nodos) { return nodos.every((n) => this.vacioAlFinalNodo(n)); }
    vacioAlFinalNodo([op, av]) {
      switch (op) {
        case 'SUBPATTERN': return this.vacioAlFinal(av[3]);
        case 'BRANCH': {
          if (!av.every((alt) => this.vacioAlFinal(alt))) return false;
          for (let i = 0; i < av.length; i++) {
            if (anchura(av[i], this.state)[0] > 0) continue;
            for (let j = i + 1; j < av.length; j++) if (anchura(av[j], this.state)[1] > 0) return false;
          }
          return true;
        }
        case 'MAX_REPEAT': return this.vacioAlFinal(av[2]);
        case 'MIN_REPEAT': {
          const [mn, mx, p] = av;
          const [lo, hi] = anchura(p, this.state);
          if (hi === 0 || mx === 0) return true;
          if (mn === mx) return this.vacioAlFinal(p);
          return mn > 0 && lo > 0;
        }
        // Unidades (nunca vacías), anclas, miradas y referencias (un solo camino), grupos atómicos y repeticiones
        // posesivas (un solo camino: el primer éxito).
        default: return true;
      }
    }
    literal(c, flags, negado) {
      if ((flags & F.IGNORECASE) && !(flags & F.LOCALE)) {
        const s = conjuntoLiteralI(c, !(flags & F.UNICODE));
        if (s) return claseDeConjunto(negado ? RS.complemento(s) : s);
      }
      return negado ? claseDeConjunto(RS.complemento([c, c])) : esc(c);
    }
    nodo(nodos, i, flags) {
      const [op, av] = nodos[i];
      switch (op) {
        case 'LITERAL': return this.literal(av, flags, false);
        case 'NOT_LITERAL': return this.literal(av, flags, true);
        case 'ANY': return (flags & F.DOTALL) ? '[\\s\\S]' : '[^\\n]';
        case 'IN': return emitirClase(infoClase(av, flags));
        case 'AT': return this.ancla(av, flags, nodos, i);
        case 'BRANCH':
          return '(?:' + av.map((alt) => this.conAmbito('opcional', () => this.secuencia(alt, flags))).join('|') + ')';
        case 'SUBPATTERN': {
          const [g, add, del, p] = av;
          const f2 = combinarFlags(flags, add, del);
          if (g === null) return '(?:' + this.secuencia(p, f2) + ')';
          let r = -1;
          for (let k = this.pila.length - 1; k >= 0; k--) if (this.pila[k].tipo === 'repeticion') { r = k; break; }
          if (r >= 0 && this.pila.slice(r + 1).some((a) => a.tipo === 'opcional')) {
            throw noSoportado(`el grupo ${g} está dentro de una repetición y puede no participar en su última vuelta`, this.patron);
          }
          this.ambitoGrupo[g] = this.pila.map((a) => a.id);
          this.mapa[g] = ++this.nJs;
          const cuerpo_ = this.secuencia(p, f2);
          this.cierres[g] = ++this.nCierre;
          return '(' + cuerpo_ + ')';
        }
        case 'MAX_REPEAT': case 'MIN_REPEAT': case 'POSSESSIVE_REPEAT': {
          const [mn, mx, p] = av;
          const puedeVacio = mx >= 1 && anchura(p, this.state)[0] === 0;
          if (puedeVacio && tieneCaptura(p)) {
            // sre admite una vuelta vacía más (también con «?») y actualiza la captura; RegExp prohíbe esa vuelta:
            // (|a)?b sobre «b» da group(1) = '' en Python y None en JS.
            throw noSoportado('grupo de captura dentro de una repetición cuyo cuerpo puede casar vacío', this.patron);
          }
          if (puedeVacio && op === 'MAX_REPEAT' && !this.vacioAlFinal(p)) {
            // sre toma la primera vuelta vacía que encuentra y deja de repetir; RegExp la descarta y prueba el siguiente
            // camino del cuerpo, que puede consumir: (?:|x)+ sobre «x» da (0, 0) en Python y (0, 1) en JS.
            throw noSoportado('repetición voraz cuyo cuerpo prefiere casar vacío antes que consumir', this.patron);
          }
          const q = cuantificador(mn, mx);
          const hidden = op === 'POSSESSIVE_REPEAT' ? ++this.nJs : 0;
          // sre casa cada vuelta de una repetición posesiva compuesta como un grupo atómico (primer éxito del cuerpo, sin
          // volver a vueltas anteriores): (?:a|ab){2}+ no casa en «abab». Un átomo de un carácter no lo necesita.
          const vuelta = op === 'POSSESSIVE_REPEAT' && !esSimple(p) ? ++this.nJs : 0;
          const conRep = () => (mx > 1 ? this.conAmbito('repeticion', () => this.atomo(p, flags)) : this.atomo(p, flags));
          let cuerpo_ = mn === 0 ? this.conAmbito('opcional', conRep) : conRep();
          if (vuelta) cuerpo_ = `(?:(?=(${cuerpo_}))\\${vuelta})`;
          if (op === 'POSSESSIVE_REPEAT') return `(?=(${cuerpo_}${q}))(?:\\${hidden})`;
          return cuerpo_ + q + (op === 'MIN_REPEAT' ? '?' : '');
        }
        case 'ASSERT': case 'ASSERT_NOT': {
          const [dir, p] = av;
          if (dir < 0) {
            const [lo, hi] = anchura(p, this.state);
            if (lo > MAXCODE) throw new PyReError('looks too much behind');
            if (lo !== hi) throw new PyReError('look-behind requires fixed-width pattern');
          }
          const pre = dir > 0 ? (op === 'ASSERT' ? '(?=' : '(?!') : (op === 'ASSERT' ? '(?<=' : '(?<!');
          const cuerpo_ = op === 'ASSERT_NOT'
            ? this.conAmbito('opcional', () => this.secuencia(p, flags)) : this.secuencia(p, flags);
          return pre + cuerpo_ + ')';
        }
        case 'ATOMIC_GROUP': {
          const hidden = ++this.nJs;
          return `(?=(${this.secuencia(av, flags)}))(?:\\${hidden})`;
        }
        case 'GROUPREF': {
          if (flags & F.IGNORECASE) throw noSoportado('referencia a un grupo con IGNORECASE', this.patron);
          const amb = this.ambitoGrupo[av], actual = this.pila.map((a) => a.id);
          if (!amb || amb.length > actual.length || amb.some((id, k) => actual[k] !== id)) {
            throw noSoportado(`referencia al grupo ${av}, que puede no participar`, this.patron);
          }
          return `(?:\\${this.mapa[av]})`;
        }
        case 'GROUPREF_EXISTS':
          throw noSoportado('grupo condicional (?(…)…|…)', this.patron);
        default:
          throw new PyReError(`internal: unsupported operand type ${op}`);
      }
    }
    conjuntoNodo(nodo, flags) {
      const [op, av] = nodo;
      const ascii = !(flags & F.UNICODE);
      const ignore = (flags & F.IGNORECASE) && !(flags & F.LOCALE);
      if (op === 'LITERAL' || op === 'NOT_LITERAL') {
        const s = (ignore && conjuntoLiteralI(av, ascii)) || [av, av];
        return op === 'LITERAL' ? s : RS.complemento(s);
      }
      if (op === 'ANY') return (flags & F.DOTALL) ? [0, MAX_CP] : RS.complemento([10, 10]);
      if (op === 'IN') return conjuntoClase(infoClase(av, flags));
      return null;
    }
    /** [conjunto de primeros caracteres consumidos, puede no consumir nada] de una secuencia. */
    primeros(nodos, flags) {
      let acc = [];
      for (const n of nodos) {
        const [s, nul] = this.primerosNodo(n, flags);
        acc = RS.union(acc, s);
        if (!nul) return [acc, false];
      }
      return [acc, true];
    }
    primerosNodo(nodo, flags) {
      const [op, av] = nodo;
      switch (op) {
        case 'LITERAL': case 'NOT_LITERAL': case 'IN': case 'ANY': return [this.conjuntoNodo(nodo, flags), false];
        case 'AT': case 'ASSERT': case 'ASSERT_NOT': return [[], true];
        case 'SUBPATTERN': return this.primeros(av[3], combinarFlags(flags, av[1], av[2]));
        case 'ATOMIC_GROUP': return this.primeros(av, flags);
        case 'BRANCH': {
          let acc = [], nul = false;
          for (const alt of av) { const [s, n] = this.primeros(alt, flags); acc = RS.union(acc, s); nul = nul || n; }
          return [acc, nul];
        }
        case 'MAX_REPEAT': case 'MIN_REPEAT': case 'POSSESSIVE_REPEAT': {
          if (av[1] === 0) return [[], true];
          const [s, n] = this.primeros(av[2], flags);
          return [s, n || av[0] === 0];
        }
        default: return [[0, MAX_CP], true];
      }
    }
    /** Conjunto del primer (o último) carácter de un nodo que siempre consume, o null. */
    extremo(nodo, flags, final) {
      const [op, av] = nodo;
      switch (op) {
        case 'LITERAL': case 'NOT_LITERAL': case 'IN': case 'ANY': return this.conjuntoNodo(nodo, flags);
        case 'SUBPATTERN': {
          const p = av[3];
          return p.length ? this.extremo(p[final ? p.length - 1 : 0], combinarFlags(flags, av[1], av[2]), final) : null;
        }
        case 'BRANCH': {
          let u = [];
          for (const alt of av) {
            if (!alt.length) return null;
            const s = this.extremo(alt[final ? alt.length - 1 : 0], flags, final);
            if (!s) return null;
            u = RS.union(u, s);
          }
          return u;
        }
        case 'MAX_REPEAT': case 'MIN_REPEAT': case 'POSSESSIVE_REPEAT': {
          const p = av[2];
          return av[0] >= 1 && p.length ? this.extremo(p[final ? p.length - 1 : 0], flags, final) : null;
        }
        case 'ATOMIC_GROUP':
          return av.length ? this.extremo(av[final ? av.length - 1 : 0], flags, final) : null;
        default:
          return null;
      }
    }
    ancla(av, flags, nodos, i) {
      const ml = flags & F.MULTILINE;
      switch (av) {
        // Sin el flag 'm' (las RegExp de este módulo nunca lo llevan), ^ de JS solo casa en el índice 0, también
        // con lastIndex > 0: es exactamente (?<![\s\S]) y no depende de una mirada atrás, que JavaScriptCore
        // (WebKit 26.4) evalúa mal justo detrás de un carácter fuera del BMP.
        case 'AT_BEGINNING': return ml ? '(?<![^\\n])' : '^';
        case 'AT_BEGINNING_STRING': return '^';
        case 'AT_END': return ml ? '(?![^\\n])' : '(?=\\n?(?![\\s\\S]))';
        case 'AT_END_STRING': return '(?![\\s\\S])';
        case 'AT_BOUNDARY': case 'AT_NON_BOUNDARY': {
          const esB = av === 'AT_BOUNDARY';
          const ascii = !(flags & F.UNICODE);
          const W = emisionCategoria('CATEGORY_WORD', ascii);
          const Wset = conjuntoCategoria('CATEGORY_WORD', ascii);
          const sig = i + 1 < nodos.length ? this.extremo(nodos[i + 1], flags, false) : null;
          if (sig) {
            if (RS.subconjunto(sig, Wset)) return esB ? `(?<!${W})` : `(?<=${W})`;
            if (RS.interseccion(sig, Wset).length === 0) return esB ? `(?<=${W})` : `(?<!${W})`;
          }
          const ant = i > 0 ? this.extremo(nodos[i - 1], flags, true) : null;
          if (ant) {
            if (RS.subconjunto(ant, Wset)) return esB ? `(?!${W})` : `(?=${W})`;
            if (RS.interseccion(ant, Wset).length === 0) return esB ? `(?=${W})` : `(?!${W})`;
          }
          return esB
            ? `(?:(?<=${W})(?!${W})|(?<!${W})(?=${W}))`
            : `(?:(?<=${W})(?=${W})|(?<!${W})(?!${W})(?:(?<=[\\s\\S])|(?=[\\s\\S])))`;
        }
        default:
          throw new PyReError(`internal: unsupported AT ${av}`);
      }
    }
  }

  // --------------------------------------------------------------------------------------------
  // Plantillas de reemplazo (re/_parser.py parse_template)
  // --------------------------------------------------------------------------------------------
  function parsePlantilla(fuente, patron) {
    const s = new Tokenizador(fuente);
    const partes = [];
    let literal = '';
    const addGroup = (index, pos) => {
      if (index > patron.groups) throw s.error(`invalid group reference ${index}`, pos);
      if (literal) partes.push(literal);
      literal = '';
      partes.push(index);
    };
    while (true) {
      let esto = s.get();
      if (esto === null) break;
      if (esto[0] === '\\') {
        const c = Array.from(esto)[1];
        if (c === 'g') {
          if (!s.match('<')) throw s.error('missing <');
          const name = s.getuntil('>', 'group name');
          let index;
          if (!decimalAscii(name)) {
            s.checkgroupname(name, 1);
            index = patron._nombres.get(name);
            if (index === undefined) throw new PyReError(`unknown group name ${repr(name)}`, null, null, { tipo: 'IndexError' });
          } else {
            index = Number(name);
            if (index >= MAXGROUPS) throw s.error(`invalid group reference ${index}`, lenCp(name) + 1);
          }
          addGroup(index, lenCp(name) + 1);
        } else if (c === '0') {
          if (s.next !== null && OCTDIGITS.has(s.next)) {
            esto += s.get();
            if (s.next !== null && OCTDIGITS.has(s.next)) esto += s.get();
          }
          literal += String.fromCodePoint(parseInt(esto.slice(1), 8) & 0xff);
        } else if (DIGITS.has(c)) {
          let octal = false;
          if (s.next !== null && DIGITS.has(s.next)) {
            esto += s.get();
            if (OCTDIGITS.has(c) && OCTDIGITS.has(esto[2]) && s.next !== null && OCTDIGITS.has(s.next)) {
              esto += s.get();
              octal = true;
              const v = parseInt(esto.slice(1), 8);
              if (v > 0o377) throw s.error(`octal escape value ${esto} outside of range 0-0o377`, esto.length);
              literal += String.fromCodePoint(v);
            }
          }
          if (!octal) addGroup(Number(esto.slice(1)), esto.length - 1);
        } else {
          const e = ESCAPES.get(esto);
          if (e !== undefined) literal += String.fromCodePoint(e);
          else if (ASCIILETTERS.has(c)) throw s.error(`bad escape ${esto}`, lenCp(esto));
          else literal += esto;
        }
      } else {
        literal += esto;
      }
    }
    if (literal) partes.push(literal);
    return partes;
  }

  // --------------------------------------------------------------------------------------------
  // Pattern y Match
  // --------------------------------------------------------------------------------------------
  const SIN_FIN = '(?![\\s\\S])';

  /**
   * rx.exec(t) con los errores de recursos del motor convertidos en R2.py.re.error (motorAgotado, tipo RecursionError).
   * SpiderMonkey (Firefox 148) lanza InternalError «too much recursion» cuando la pila de retroceso de una RegExp se
   * agota (diario._DASH_UNIT sobre 3.000 espacios); Python sí termina. Así el llamante recibe un error tipado.
   */
  function ejecutar(rx, t, patron) {
    try {
      return rx.exec(t);
    } catch (err) {
      if (err instanceof PyReError || err instanceof TypeError || err instanceof SyntaxError) throw err;
      const msg = String((err && err.message) || err);
      if (err instanceof RangeError || (err && err.name === 'InternalError')
        || /recursion|call stack|stack overflow|out of memory|too (?:big|large)/i.test(msg)) {
        throw new PyReError(`el motor se quedó sin pila o sin memoria (${err && err.name}: ${msg.slice(0, 120)})`, patron,
          null, { tipo: 'RecursionError', motorAgotado: true });
      }
      throw err;
    }
  }

  class Match {
    constructor(re, string, pos, endpos, m, variante) {
      this.re = re;
      this.string = string;
      this.pos = pos;
      this.endpos = endpos;
      this._m = m;
      this._v = variante;
      this._ind = null;
    }
    _js(i) { return i === 0 ? 0 : this.re._mapa[i] + (this._v === 'ne' ? 1 : 0); }
    _valor(i) { const v = this._m[this._js(i)]; return v === undefined ? null : v; }
    group(...args) {
      if (args.length === 0) return this._m[0];
      if (args.length === 1) return this._valor(this.re._indice(args[0]));
      return args.map((a) => this._valor(this.re._indice(a)));
    }
    groups(defecto = null) {
      const out = [];
      for (let g = 1; g <= this.re.groups; g++) { const v = this._valor(g); out.push(v === null ? defecto : v); }
      return out;
    }
    groupdict(defecto = null) {
      const out = {};
      for (const [n, g] of this.re._nombres) { const v = this._valor(g); out[n] = v === null ? defecto : v; }
      return out;
    }
    span(g = 0) {
      const i = this.re._indice(g);
      if (i === 0) return [this._m.index, this._m.index + this._m[0].length];
      const j = this._js(i);
      if (this._m[j] === undefined) return [-1, -1];
      if (!this._ind) {
        const rx = this.re._re(this._v + 'd');
        rx.lastIndex = this._m.index;
        const t = this.endpos < this.string.length ? this.string.slice(0, this.endpos) : this.string;
        this._ind = ejecutar(rx, t, this.re.pattern).indices;
      }
      const par = this._ind[j];
      return par ? [par[0], par[1]] : [-1, -1];
    }
    start(g = 0) { return this.span(g)[0]; }
    end(g = 0) { return this.span(g)[1]; }
    /**
     * Último grupo que sre cerró al ejecutar (no el que acaba más tarde): con las construcciones soportadas es el grupo
     * participante cuyo paréntesis de cierre va más tarde en el patrón. Así (?=(abc))(a) da 2 y (ab)(?<=(a)b) da 2.
     */
    get lastindex() {
      let mejor = null, orden = -1;
      for (let g = 1; g <= this.re.groups; g++) {
        if (this._valor(g) === null) continue;
        if (this.re._cierres[g] > orden) { mejor = g; orden = this.re._cierres[g]; }
      }
      return mejor;
    }
    get lastgroup() {
      const li = this.lastindex;
      if (li === null) return null;
      for (const [n, g] of this.re._nombres) if (g === li) return n;
      return null;
    }
    expand(plantilla) { return expandir(this.re._plantilla(plantilla), this); }
  }

  function expandir(partes, m) {
    let s = '';
    for (const p of partes) {
      if (typeof p === 'string') s += p;
      else { const v = m._valor(p); if (v !== null) s += v; }
    }
    return s;
  }

  /** pos y endpos recortados a [0, len] como en _sre (sin intercambiarlos: endpos puede quedar < pos). */
  function normalizarPos(s, pos, endpos) {
    if (typeof s !== 'string') throw new TypeError('se esperaba una cadena');
    const n = s.length;
    let p = pos == null ? 0 : Math.trunc(pos);
    let e = endpos == null ? n : Math.trunc(endpos);
    p = p < 0 ? 0 : p > n ? n : p;
    e = e < 0 ? 0 : e > n ? n : e;
    return [p, e];
  }

  // --------------------------------------------------------------------------------------------
  // match() con endpos < pos
  // --------------------------------------------------------------------------------------------
  // _sre ejecuta el patrón con el puntero en pos y el final en endpos < pos. Toda operación que consume (literal, clase,
  // '.', referencia no vacía, repetición de un átomo: REPEAT_ONE exige min <= end - ptr) falla, y también una mirada
  // atrás de anchura k ≥ 1 (su último carácter queda en ≥ endpos). Solo casan, en pos, anclas, miradas de anchura cero,
  // grupos vacíos, alternativas y repeticiones de cuerpos compuestos, con la protección de vuelta vacía de MAX_UNTIL,
  // MIN_UNTIL y POSSESSIVE_REPEAT. search, fullmatch, finditer y findall no casan nunca (sre_search sale si ptr > end;
  // fullmatch exige ptr == end).
  function esSimple(p) {
    if (p.length !== 1) return false;
    const [op, av] = p[0];
    if (op === 'SUBPATTERN') return av[0] === null && esSimple(av[3]);
    return UNITCODES.has(op);
  }
  function cpAnterior(s, p) {
    const c = s.charCodeAt(p - 1);
    if (c >= 0xDC00 && c <= 0xDFFF && p >= 2) {
      const h = s.charCodeAt(p - 2);
      if (h >= 0xD800 && h <= 0xDBFF) return (h - 0xD800) * 0x400 + (c - 0xDC00) + 0x10000;
    }
    return c;
  }
  const primero = (it) => { const r = it.next(); return r.done ? null : r.value; };
  /** Estados de captura (lista de grupos cerrados, en orden) con los que la secuencia casa vacía en ctx.p. */
  function* zSec(ctx, nodos, i, flags, caps) {
    if (i === nodos.length) { yield caps; return; }
    for (const c of zNodo(ctx, nodos[i], flags, caps)) yield* zSec(ctx, nodos, i + 1, flags, c);
  }
  function* zRep(ctx, op, mn, mx, p, flags, count, protegido, caps) {
    const cuerpo = (c) => zSec(ctx, p, 0, flags, c);
    if (count < mn) {
      for (const c of cuerpo(caps)) yield* zRep(ctx, op, mn, mx, p, flags, count + 1, protegido, c);
      return;
    }
    const otra = (count < mx || mx === MAXREPEAT) && !protegido;
    if (op === 'MAX_REPEAT') {
      if (otra) for (const c of cuerpo(caps)) yield* zRep(ctx, op, mn, mx, p, flags, count + 1, true, c);
      yield caps;
    } else {
      yield caps;
      if (otra) for (const c of cuerpo(caps)) yield* zRep(ctx, op, mn, mx, p, flags, count + 1, true, c);
    }
  }
  function* zNodo(ctx, nodo, flags, caps) {
    const [op, av] = nodo;
    switch (op) {
      case 'AT': {
        const { s, p, e } = ctx;
        const ascii = !(flags & F.UNICODE);
        const palabra = () => RS.contiene(ascii ? ASCII_W : tb().W, cpAnterior(s, p));
        let ok;
        switch (av) {
          case 'AT_BEGINNING': ok = (flags & F.MULTILINE) ? s.charCodeAt(p - 1) === 10 : false; break;
          case 'AT_BEGINNING_STRING': case 'AT_END_STRING': ok = false; break;
          case 'AT_END': ok = (flags & F.MULTILINE) ? p < s.length && s.charCodeAt(p) === 10 : false; break;
          case 'AT_BOUNDARY': ok = e !== 0 && palabra(); break;
          case 'AT_NON_BOUNDARY': ok = e !== 0 && !palabra(); break;
          default: throw new PyReError(`internal: unsupported AT ${av}`);
        }
        if (ok) yield caps;
        return;
      }
      case 'SUBPATTERN': {
        const [g, add, del, p] = av;
        for (const c of zSec(ctx, p, 0, combinarFlags(flags, add, del), caps)) yield g === null ? c : [...c, g];
        return;
      }
      case 'BRANCH':
        for (const alt of av) yield* zSec(ctx, alt, 0, flags, caps);
        return;
      case 'ATOMIC_GROUP': {
        const c = primero(zSec(ctx, av, 0, flags, caps));
        if (c) yield c;
        return;
      }
      case 'ASSERT': case 'ASSERT_NOT': {
        const [dir, p] = av;
        const c = dir < 0 && anchura(p, ctx.state)[0] >= 1 ? null : primero(zSec(ctx, p, 0, flags, caps));
        if (op === 'ASSERT' && c) yield c;
        else if (op === 'ASSERT_NOT' && !c) yield caps;
        return;
      }
      case 'MAX_REPEAT': case 'MIN_REPEAT': case 'POSSESSIVE_REPEAT': {
        const [mn, mx, p] = av;
        if (esSimple(p)) return;
        if (op !== 'POSSESSIVE_REPEAT') { yield* zRep(ctx, op, mn, mx, p, flags, 0, false, caps); return; }
        let actual = caps, count = 0;
        for (; count < mn; count++) {
          actual = primero(zSec(ctx, p, 0, flags, actual));
          if (!actual) return;
        }
        if (count < mx || mx === MAXREPEAT) {
          const c = primero(zSec(ctx, p, 0, flags, actual));
          if (c) actual = c;
        }
        yield actual;
        return;
      }
      case 'GROUPREF':
        if (caps.includes(av)) yield caps;
        return;
      default:
        return; // LITERAL, NOT_LITERAL, IN, ANY: consumen
    }
  }
  const avance = (t, i) => {
    const c = t.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < t.length) {
      const d = t.charCodeAt(i + 1);
      if (d >= 0xDC00 && d <= 0xDFFF) return 2;
    }
    return 1;
  };

  class Pattern {
    constructor(pattern, flags) {
      const { p, state } = parsear(pattern, flags);
      this.pattern = pattern;
      this.flags = flags | state.flags;
      this.groups = state.groups - 1;
      this._nombres = new Map(state.groupdict);
      this.groupindex = Object.freeze(Object.fromEntries(state.groupdict));
      this._arbol = p;
      this._state = state;
      const em = new Emisor(pattern, state, 0);
      this._fuente = em.secuencia(p, this.flags);
      this._mapa = em.mapa;
      this._cierres = em.cierres;
      this._anchura = anchura(p, state);
      this._rx = Object.create(null);
      this._plantillas = new Map();
      this._re('g');
    }
    _fuenteNe() {
      if (this._fuenteNeCache === undefined) this._fuenteNeCache = new Emisor(this.pattern, this._state, 1).secuencia(this._arbol, this.flags);
      return this._fuenteNeCache;
    }
    _re(tipo) {
      let r = this._rx[tipo];
      if (r) return r;
      const f = this._fuente;
      try {
        switch (tipo) {
          case 'g': r = new RegExp(f, 'gv'); break;
          case 'n': r = new RegExp(f, 'yv'); break;
          case 'nd': r = new RegExp(f, 'dyv'); break;
          case 'f': r = new RegExp(`(?:${f})${SIN_FIN}`, 'yv'); break;
          case 'fd': r = new RegExp(`(?:${f})${SIN_FIN}`, 'dyv'); break;
          case 'ne': r = new RegExp(`(?=([\\s\\S]*))(?:${this._fuenteNe()})(?!\\1)`, 'yv'); break;
          case 'ned': r = new RegExp(`(?=([\\s\\S]*))(?:${this._fuenteNe()})(?!\\1)`, 'dyv'); break;
          default: throw new Error(tipo);
        }
      } catch (err) {
        if (err instanceof SyntaxError) {
          throw new PyReError(`la traducción a RegExp falla (${err.message.slice(0, 200)})`, this.pattern, null, { noSoportado: true });
        }
        throw err;
      }
      this._rx[tipo] = r;
      return r;
    }
    _indice(g) {
      if (typeof g === 'number' && Number.isInteger(g) && g >= 0 && g <= this.groups) return g;
      if (typeof g === 'string' && this._nombres.has(g)) return this._nombres.get(g);
      throw new PyReError('no such group', null, null, { tipo: 'IndexError' });
    }
    _plantilla(repl) {
      let p = this._plantillas.get(repl);
      if (!p) { p = parsePlantilla(repl, this); this._plantillas.set(repl, p); }
      return p;
    }
    /** Primeros caracteres posibles de una coincidencia no vacía (rangos planos). */
    _primeros() {
      if (!this._primerosCache) this._primerosCache = new Emisor(this.pattern, this._state).primeros(this._arbol, this.flags)[0];
      return this._primerosCache;
    }
    /**
     * Búsqueda cruda en t (= string[:endpos]) desde `desde`, como sre_search. Con mustAdvance (la
     * coincidencia anterior fue vacía y acabó en `desde`) no puede volver a casar vacío en `desde`:
     * se prueba allí la variante que exige avanzar (solo si el patrón puede casar vacío y el carácter
     * de `desde` puede empezar una coincidencia no vacía) y, si no, se busca desde el carácter siguiente.
     * Devuelve [exec, variante] o null.
     */
    _buscar(t, desde, mustAdvance) {
      if (desde > t.length) return null;
      if (mustAdvance && this._anchura[0] === 0) {
        if (desde < t.length && RS.contiene(this._primeros(), t.codePointAt(desde))) {
          const ne = this._re('ne');
          ne.lastIndex = desde;
          const m = ejecutar(ne, t, this.pattern);
          if (m) return [m, 'ne'];
        }
        if (desde >= t.length) return null;
        desde += avance(t, desde);
      }
      const g = this._re('g');
      let i = desde;
      while (true) {
        g.lastIndex = i;
        const m = ejecutar(g, t, this.pattern);
        if (!m) return null;
        // V8 prueba también posiciones entre las dos mitades de un par sustituto, donde una mirada
        // atrás o adelante ve un «principio» o un «final» falso. Python no tiene esas posiciones.
        const k = m.index;
        if (k > 0 && k < t.length && (t.charCodeAt(k) & 0xFC00) === 0xDC00 && (t.charCodeAt(k - 1) & 0xFC00) === 0xD800) {
          i = k + 1;
          continue;
        }
        if (mustAdvance && k < desde) throw new Error('re.js: la búsqueda no avanza (error interno)');
        return [m, 'n'];
      }
    }
    _valorCrudo(m, v, g) { const x = m[this._mapa[g] + (v === 'ne' ? 1 : 0)]; return x === undefined ? null : x; }

    /** match() con endpos < pos (ver zSec): solo casa vacía en pos. */
    _matchInvertido(string, p, e) {
      const caps = primero(zSec({ s: string, p, e, state: this._state }, this._arbol, 0, this.flags, []));
      if (!caps) return null;
      const m = [''];
      m.index = p;
      const ind = [[p, p]];
      for (let g = 1; g <= this.groups; g++) {
        if (caps.includes(g)) { m[this._mapa[g]] = ''; ind[this._mapa[g]] = [p, p]; }
      }
      const r = new Match(this, string, p, e, m, 'n');
      r._ind = ind;
      return r;
    }

    search(string, pos, endpos) {
      const [p, e] = normalizarPos(string, pos, endpos);
      if (e < p) return null;
      const t = e < string.length ? string.slice(0, e) : string;
      const r = this._buscar(t, p, false);
      return r ? new Match(this, string, p, e, r[0], r[1]) : null;
    }
    match(string, pos, endpos) {
      const [p, e] = normalizarPos(string, pos, endpos);
      if (e < p) return this._matchInvertido(string, p, e);
      const t = e < string.length ? string.slice(0, e) : string;
      const rx = this._re('n');
      rx.lastIndex = p;
      const m = ejecutar(rx, t, this.pattern);
      return m ? new Match(this, string, p, e, m, 'n') : null;
    }
    fullmatch(string, pos, endpos) {
      const [p, e] = normalizarPos(string, pos, endpos);
      if (e < p) return null;
      const t = e < string.length ? string.slice(0, e) : string;
      const rx = this._re('f');
      rx.lastIndex = p;
      const m = ejecutar(rx, t, this.pattern);
      return m ? new Match(this, string, p, e, m, 'f') : null;
    }
    *finditer(string, pos, endpos) {
      const [p, e] = normalizarPos(string, pos, endpos);
      if (e < p) return;
      const t = e < string.length ? string.slice(0, e) : string;
      let desde = p, must = false;
      while (true) {
        const r = this._buscar(t, desde, must);
        if (!r) return;
        const [m, v] = r;
        const ini = m.index, fin = ini + m[0].length;
        yield new Match(this, string, p, e, m, v);
        must = fin === ini;
        desde = fin;
      }
    }
    findall(string, pos, endpos) {
      const [p, e] = normalizarPos(string, pos, endpos);
      if (e < p) return [];
      const t = e < string.length ? string.slice(0, e) : string;
      const out = [];
      const ng = this.groups;
      let desde = p, must = false;
      while (true) {
        const r = this._buscar(t, desde, must);
        if (!r) break;
        const [m, v] = r;
        if (ng === 0) out.push(m[0]);
        else if (ng === 1) out.push(this._valorCrudo(m, v, 1) ?? '');
        else {
          const tupla = [];
          for (let g = 1; g <= ng; g++) tupla.push(this._valorCrudo(m, v, g) ?? '');
          out.push(tupla);
        }
        const fin = m.index + m[0].length;
        must = fin === m.index;
        desde = fin;
      }
      return out;
    }
    subn(repl, string, count = 0) {
      if (typeof string !== 'string') throw new TypeError('se esperaba una cadena');
      let fn = null, literal = null;
      if (typeof repl === 'function') fn = repl;
      else if (typeof repl !== 'string') throw new TypeError('repl debe ser una cadena o una función');
      else if (!repl.includes('\\')) literal = repl;
      else {
        const partes = this._plantilla(repl);
        if (partes.every((x) => typeof x === 'string')) literal = partes.join('');
        else fn = (m) => expandir(partes, m);
      }
      let out = '', i = 0, n = 0, desde = 0, must = false;
      while (!count || n < count) {
        const r = this._buscar(string, desde, must);
        if (!r) break;
        const [m, v] = r;
        const b = m.index, e = b + m[0].length;
        if (i < b) out += string.slice(i, b);
        if (literal !== null) out += literal;
        else {
          const item = fn(new Match(this, string, 0, string.length, m, v));
          if (item !== null && item !== undefined) {
            if (typeof item !== 'string') throw new TypeError('la función de reemplazo debe devolver una cadena');
            out += item;
          }
        }
        i = e;
        n++;
        must = e === b;
        desde = e;
      }
      if (i < string.length) out += string.slice(i);
      return [out, n];
    }
    sub(repl, string, count = 0) { return this.subn(repl, string, count)[0]; }
    split(string, maxsplit = 0) {
      if (typeof string !== 'string') throw new TypeError('se esperaba una cadena');
      const out = [];
      let last = 0, n = 0, desde = 0, must = false;
      while (!maxsplit || n < maxsplit) {
        const r = this._buscar(string, desde, must);
        if (!r) break;
        const [m, v] = r;
        const b = m.index, e = b + m[0].length;
        out.push(string.slice(last, b));
        for (let g = 1; g <= this.groups; g++) out.push(this._valorCrudo(m, v, g));
        n++;
        must = e === b;
        last = desde = e;
      }
      out.push(string.slice(last));
      return out;
    }
  }

  // --------------------------------------------------------------------------------------------
  // API del módulo
  // --------------------------------------------------------------------------------------------
  const CACHE = new Map();
  const MAX_CACHE = 4096;
  function compile(pattern, flags = 0) {
    if (pattern instanceof Pattern) {
      if (flags) throw new PyReError('cannot process flags argument with a compiled pattern', null, null, { tipo: 'ValueError' });
      return pattern;
    }
    if (typeof pattern !== 'string') throw new TypeError('first argument must be string or compiled pattern');
    const k = flags + ' ' + pattern;
    let p = CACHE.get(k);
    if (p) return p;
    p = new Pattern(pattern, flags);
    if (CACHE.size >= MAX_CACHE) CACHE.delete(CACHE.keys().next().value);
    CACHE.set(k, p);
    return p;
  }

  const ESPECIALES = new Set('()[]{}?*+-|^$\\.&~# \t\n\r\v\f');
  function escape(s) {
    let out = '';
    for (let i = 0; i < s.length; i++) out += ESPECIALES.has(s[i]) ? '\\' + s[i] : s[i];
    return out;
  }

  R2.py.re = {
    ...F,
    I: F.IGNORECASE, L: F.LOCALE, M: F.MULTILINE, S: F.DOTALL, U: F.UNICODE, X: F.VERBOSE, A: F.ASCII,
    error: PyReError,
    Pattern,
    Match,
    compile,
    search: (p, s, flags = 0) => compile(p, flags).search(s),
    match: (p, s, flags = 0) => compile(p, flags).match(s),
    fullmatch: (p, s, flags = 0) => compile(p, flags).fullmatch(s),
    finditer: (p, s, flags = 0) => compile(p, flags).finditer(s),
    findall: (p, s, flags = 0) => compile(p, flags).findall(s),
    sub: (p, repl, s, count = 0, flags = 0) => compile(p, flags).sub(repl, s, count),
    subn: (p, repl, s, count = 0, flags = 0) => compile(p, flags).subn(repl, s, count),
    split: (p, s, maxsplit = 0, flags = 0) => compile(p, flags).split(s, maxsplit),
    escape,
    purge: () => CACHE.clear(),
    /** Para pruebas y diagnóstico. */
    _interno: {
      TABLAS, RS, tablas: tb, motor, parsear, ejecutar,
      arbol: (patron, flags = 0) => parsear(patron, flags).p,
      anchura: (patron, flags = 0) => { const { p, state } = parsear(patron, flags); return anchura(p, state); },
      fuente: (patron, flags = 0) => compile(patron, flags)._fuente,
      /** Conjunto (rangos planos) de un patrón de un solo carácter: literal, clase o '.'. */
      conjuntoAtomo(patron, flags = 0) {
        const { p, state } = parsear(patron, flags);
        if (p.length !== 1) throw new Error(`no es un átomo: ${patron}`);
        const s = new Emisor(patron, state).conjuntoNodo(p[0], flags | state.flags);
        if (!s) throw new Error(`no es un átomo: ${patron}`);
        return s;
      },
    },
  };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/py/difflib.js ===== */
/* 2REP_Standalone · engine/py/difflib.js
 *
 * R2.py.difflib: SequenceMatcher y get_close_matches de difflib (Python 3.12), traducción directa: b2j, basura
 * (isjunk), elementos populares (autojunk con len(b) ≥ 200), find_longest_match, get_matching_blocks con fusión
 * de bloques adyacentes, get_opcodes, ratio, quick_ratio y real_quick_ratio. Los cocientes se calculan con la
 * misma operación (2.0 * M / T), así que son idénticos en bits.
 *
 * Secuencias: una cadena se recorre por puntos de código (como str en Python) y un Array por elementos
 * (comparados con ===). Solo depende de R2.py.core.
 */
(function (R2) {
  'use strict';

  const C = R2.py.core;
  const SUSTITUTO = /[\uD800-\uDFFF]/;

  /** Secuencia indexable con la longitud de Python. */
  const indexable = (s) => (typeof s === 'string' && SUSTITUTO.test(s) ? Array.from(s) : s);
  const ratioDe = (m, t) => (t ? (2.0 * m) / t : 1.0);

  class SequenceMatcher {
    constructor(isjunk = null, a = '', b = '', autojunk = true) {
      this.isjunk = isjunk;
      this.autojunk = autojunk;
      this.a = this.b = undefined;
      this.set_seqs(a, b);
    }

    set_seqs(a, b) { this.set_seq1(a); this.set_seq2(b); }

    set_seq1(a) {
      if (a === this.a) return;
      this.a = a;
      this._a = indexable(a);
      this.matching_blocks = this.opcodes = null;
    }

    set_seq2(b) {
      if (b === this.b) return;
      this.b = b;
      this._b = indexable(b);
      this.matching_blocks = this.opcodes = null;
      this.fullbcount = null;
      this._chain_b();
    }

    _chain_b() {
      const b = this._b;
      const b2j = this.b2j = new Map();
      for (let i = 0; i < b.length; i++) {
        const elt = b[i];
        let idx = b2j.get(elt);
        if (!idx) { idx = []; b2j.set(elt, idx); }
        idx.push(i);
      }
      const junk = this.bjunk = new Set();
      if (this.isjunk) {
        for (const elt of b2j.keys()) if (this.isjunk(elt)) junk.add(elt);
        for (const elt of junk) b2j.delete(elt);
      }
      const popular = this.bpopular = new Set();
      const n = b.length;
      if (this.autojunk && n >= 200) {
        const ntest = Math.floor(n / 100) + 1;
        for (const [elt, idx] of b2j) if (idx.length > ntest) popular.add(elt);
        for (const elt of popular) b2j.delete(elt);
      }
    }

    /** Match [i, j, k]: el bloque común más largo de a[alo:ahi] y b[blo:bhi]. */
    find_longest_match(alo = 0, ahi = null, blo = 0, bhi = null) {
      const a = this._a, b = this._b, b2j = this.b2j, junk = this.bjunk;
      if (ahi === null || ahi === undefined) ahi = a.length;
      if (bhi === null || bhi === undefined) bhi = b.length;
      let besti = alo, bestj = blo, bestsize = 0;
      let j2len = new Map();
      const nada = [];
      for (let i = alo; i < ahi; i++) {
        const nuevo = new Map();
        for (const j of b2j.get(a[i]) || nada) {
          if (j < blo) continue;
          if (j >= bhi) break;
          const k = (j2len.get(j - 1) || 0) + 1;
          nuevo.set(j, k);
          if (k > bestsize) { besti = i - k + 1; bestj = j - k + 1; bestsize = k; }
        }
        j2len = nuevo;
      }
      while (besti > alo && bestj > blo && !junk.has(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
        besti--; bestj--; bestsize++;
      }
      while (besti + bestsize < ahi && bestj + bestsize < bhi && !junk.has(b[bestj + bestsize]) &&
             a[besti + bestsize] === b[bestj + bestsize]) bestsize++;
      while (besti > alo && bestj > blo && junk.has(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
        besti--; bestj--; bestsize++;
      }
      while (besti + bestsize < ahi && bestj + bestsize < bhi && junk.has(b[bestj + bestsize]) &&
             a[besti + bestsize] === b[bestj + bestsize]) bestsize++;
      return [besti, bestj, bestsize];
    }

    get_matching_blocks() {
      if (this.matching_blocks) return this.matching_blocks;
      const la = this._a.length, lb = this._b.length;
      const cola = [[0, la, 0, lb]];
      const bloques = [];
      while (cola.length) {
        const [alo, ahi, blo, bhi] = cola.pop();
        const x = this.find_longest_match(alo, ahi, blo, bhi);
        const [i, j, k] = x;
        if (k) {
          bloques.push(x);
          if (alo < i && blo < j) cola.push([alo, i, blo, j]);
          if (i + k < ahi && j + k < bhi) cola.push([i + k, ahi, j + k, bhi]);
        }
      }
      bloques.sort((x, y) => (x[0] - y[0]) || (x[1] - y[1]) || (x[2] - y[2]));
      let i1 = 0, j1 = 0, k1 = 0;
      const noAdyacentes = [];
      for (const [i2, j2, k2] of bloques) {
        if (i1 + k1 === i2 && j1 + k1 === j2) k1 += k2;
        else {
          if (k1) noAdyacentes.push([i1, j1, k1]);
          i1 = i2; j1 = j2; k1 = k2;
        }
      }
      if (k1) noAdyacentes.push([i1, j1, k1]);
      noAdyacentes.push([la, lb, 0]);
      this.matching_blocks = noAdyacentes;
      return noAdyacentes;
    }

    get_opcodes() {
      if (this.opcodes) return this.opcodes;
      let i = 0, j = 0;
      const r = this.opcodes = [];
      for (const [ai, bj, size] of this.get_matching_blocks()) {
        let tag = '';
        if (i < ai && j < bj) tag = 'replace';
        else if (i < ai) tag = 'delete';
        else if (j < bj) tag = 'insert';
        if (tag) r.push([tag, i, ai, j, bj]);
        i = ai + size; j = bj + size;
        if (size) r.push(['equal', ai, i, bj, j]);
      }
      return r;
    }

    ratio() {
      let m = 0;
      for (const t of this.get_matching_blocks()) m += t[2];
      return ratioDe(m, this._a.length + this._b.length);
    }

    quick_ratio() {
      if (!this.fullbcount) {
        const f = this.fullbcount = new Map();
        for (let i = 0; i < this._b.length; i++) f.set(this._b[i], (f.get(this._b[i]) || 0) + 1);
      }
      const full = this.fullbcount, avail = new Map();
      let m = 0;
      for (let i = 0; i < this._a.length; i++) {
        const elt = this._a[i];
        const numb = avail.has(elt) ? avail.get(elt) : (full.get(elt) || 0);
        avail.set(elt, numb - 1);
        if (numb > 0) m++;
      }
      return ratioDe(m, this._a.length + this._b.length);
    }

    real_quick_ratio() {
      const la = this._a.length, lb = this._b.length;
      return ratioDe(Math.min(la, lb), la + lb);
    }
  }

  /** difflib.get_close_matches(word, possibilities, n=3, cutoff=0.6). */
  function get_close_matches(word, possibilities, n = 3, cutoff = 0.6) {
    if (!(n > 0)) throw new C.PyError('ValueError', `n must be > 0: ${n}`);
    if (!(cutoff >= 0.0 && cutoff <= 1.0)) throw new C.PyError('ValueError', `cutoff must be in [0.0, 1.0]: ${cutoff}`);
    const res = [];
    const s = new SequenceMatcher();
    s.set_seq2(word);
    for (const x of possibilities) {
      s.set_seq1(x);
      if (s.real_quick_ratio() >= cutoff && s.quick_ratio() >= cutoff && s.ratio() >= cutoff) res.push([s.ratio(), x]);
    }
    // _nlargest(n, result): tuplas (puntuación, palabra) de mayor a menor; la palabra desempata por punto de código.
    return C.sorted(res, { reverse: true }).slice(0, n).map((t) => t[1]);
  }

  R2.py = R2.py || {};
  R2.py.difflib = { SequenceMatcher, get_close_matches };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/py/heap.js ===== */
/* 2REP_Standalone · engine/py/heap.js
 *
 * R2.py.heap: heapq de Python 3.12 con el mismo algoritmo (_siftdown/_siftup), así que el montículo queda
 * idéntico elemento a elemento y los empates salen en el mismo orden. Compara con `<` de Python
 * (R2.py.core.lt): números, cadenas por punto de código y tuplas (Array) elemento a elemento.
 * nlargest/nsmallest equivalen a sorted(iterable, key=key, reverse=True)[:n] / sorted(...)[:n], como documenta
 * Python (estables: a igual clave, el primero en aparecer).
 */
(function (R2) {
  'use strict';

  const C = R2.py.core;
  const menor = (a, b) => (typeof a === 'number' && typeof b === 'number' ? a < b : C.lt(a, b));

  function siftdown(heap, inicio, pos) {
    const nuevo = heap[pos];
    while (pos > inicio) {
      const padre = (pos - 1) >> 1;
      const p = heap[padre];
      if (menor(nuevo, p)) { heap[pos] = p; pos = padre; continue; }
      break;
    }
    heap[pos] = nuevo;
  }

  function siftup(heap, pos) {
    const fin = heap.length, inicio = pos, nuevo = heap[pos];
    let hijo = 2 * pos + 1;
    while (hijo < fin) {
      const der = hijo + 1;
      if (der < fin && !menor(heap[hijo], heap[der])) hijo = der;
      heap[pos] = heap[hijo];
      pos = hijo;
      hijo = 2 * pos + 1;
    }
    heap[pos] = nuevo;
    siftdown(heap, inicio, pos);
  }

  const vacio = () => new C.PyError('IndexError', 'index out of range');

  function heappush(heap, item) {
    heap.push(item);
    siftdown(heap, 0, heap.length - 1);
  }

  function heappop(heap) {
    if (heap.length === 0) throw vacio();
    const ultimo = heap.pop();
    if (heap.length) {
      const r = heap[0];
      heap[0] = ultimo;
      siftup(heap, 0);
      return r;
    }
    return ultimo;
  }

  function heapreplace(heap, item) {
    if (heap.length === 0) throw vacio();
    const r = heap[0];
    heap[0] = item;
    siftup(heap, 0);
    return r;
  }

  function heappushpop(heap, item) {
    if (heap.length && menor(heap[0], item)) {
      const r = heap[0];
      heap[0] = item;
      siftup(heap, 0);
      return r;
    }
    return item;
  }

  function heapify(x) {
    for (let i = (x.length >> 1) - 1; i >= 0; i--) siftup(x, i);
  }

  function nlargest(n, iterable, key = null) {
    const items = Array.from(iterable);
    if (n === 1) return items.length ? [C.pyMax(items, key)] : [];
    if (n <= 0) return [];
    return C.sorted(items, { key, reverse: true }).slice(0, n);
  }

  function nsmallest(n, iterable, key = null) {
    const items = Array.from(iterable);
    if (n === 1) return items.length ? [C.pyMin(items, key)] : [];
    if (n <= 0) return [];
    return C.sorted(items, { key }).slice(0, n);
  }

  R2.py = R2.py || {};
  R2.py.heap = { heappush, heappop, heapreplace, heappushpop, heapify, nlargest, nsmallest };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/py/sha1.js ===== */
/* 2REP_Standalone · engine/py/sha1.js
 *
 * R2.py.sha1: SHA-1 síncrono en JavaScript puro (FIPS 180-4), para las huellas del backend:
 *   hashlib.sha1(texto.encode("utf-8")).hexdigest()          → R2.py.sha1.hex(texto)
 *   hashlib.sha1(np.array(ids, int64).tobytes()).hexdigest() → R2.py.sha1.hex(R2.py.sha1.bytesInt64(ids))
 * crypto.subtle no sirve: es asíncrono y no está en todos los contextos de file://.
 * Una cadena con sustitutos sueltos lanza UnicodeEncodeError, como str.encode("utf-8") en Python.
 */
(function (R2) {
  'use strict';

  const { PyError } = R2.py.core;
  const UTF8 = new TextEncoder();
  const SUELTO = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;

  /** str.encode("utf-8") de Python: Uint8Array; lanza con sustitutos sueltos. */
  function utf8(s) {
    const bien = typeof s.isWellFormed === 'function' ? s.isWellFormed() : !SUELTO.test(s);
    if (!bien) throw new PyError('UnicodeEncodeError', "'utf-8' codec can't encode characters: surrogates not allowed");
    return UTF8.encode(s);
  }

  function aBytes(datos) {
    if (typeof datos === 'string') return utf8(datos);
    if (datos instanceof Uint8Array) return datos;
    if (datos instanceof ArrayBuffer) return new Uint8Array(datos);
    if (ArrayBuffer.isView(datos)) return new Uint8Array(datos.buffer, datos.byteOffset, datos.byteLength);
    throw new PyError('TypeError', 'sha1: se esperaban bytes o str');
  }

  class Sha1 {
    constructor() {
      this.h = new Int32Array([0x67452301, 0xefcdab89 | 0, 0x98badcfe | 0, 0x10325476, 0xc3d2e1f0 | 0]);
      this.w = new Int32Array(80);
      this.pendiente = new Uint8Array(64);
      this.nPendiente = 0;
      this.longitud = 0;
      this.terminado = false;
    }

    /** Añade bytes (Uint8Array, ArrayBuffer, vista) o una cadena (UTF-8). Devuelve this. */
    update(datos) {
      if (this.terminado) throw new Error('Sha1: ya se calculó el resumen');
      const b = aBytes(datos);
      const n = b.length;
      let i = 0;
      this.longitud += n;
      if (this.nPendiente > 0) {
        const k = Math.min(64 - this.nPendiente, n);
        this.pendiente.set(b.subarray(0, k), this.nPendiente);
        this.nPendiente += k;
        i = k;
        if (this.nPendiente < 64) return this;
        this._bloque(this.pendiente, 0);
        this.nPendiente = 0;
      }
      for (; i + 64 <= n; i += 64) this._bloque(b, i);
      if (i < n) { this.pendiente.set(b.subarray(i), 0); this.nPendiente = n - i; }
      return this;
    }

    _bloque(b, o) {
      const w = this.w, h = this.h;
      for (let t = 0; t < 16; t++) {
        const j = o + 4 * t;
        w[t] = (b[j] << 24) | (b[j + 1] << 16) | (b[j + 2] << 8) | b[j + 3];
      }
      for (let t = 16; t < 80; t++) {
        const x = w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16];
        w[t] = (x << 1) | (x >>> 31);
      }
      let a = h[0], bb = h[1], c = h[2], d = h[3], e = h[4];
      for (let t = 0; t < 80; t++) {
        let f, k;
        if (t < 20) { f = (bb & c) | (~bb & d); k = 0x5a827999; }
        else if (t < 40) { f = bb ^ c ^ d; k = 0x6ed9eba1; }
        else if (t < 60) { f = (bb & c) | (bb & d) | (c & d); k = 0x8f1bbcdc | 0; }
        else { f = bb ^ c ^ d; k = 0xca62c1d6 | 0; }
        const tmp = (((a << 5) | (a >>> 27)) + f + e + k + w[t]) | 0;
        e = d; d = c; c = (bb << 30) | (bb >>> 2); bb = a; a = tmp;
      }
      h[0] = (h[0] + a) | 0; h[1] = (h[1] + bb) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0;
    }

    /** Resumen de 20 bytes (Uint8Array). */
    digest() {
      if (!this.terminado) {
        const bits = this.longitud * 8;
        const cola = new Uint8Array(((this.nPendiente + 9 + 63) >> 6) * 64 - this.nPendiente);
        cola[0] = 0x80;
        const alto = Math.floor(bits / 0x100000000), bajo = bits >>> 0;
        const z = cola.length;
        cola[z - 8] = alto >>> 24; cola[z - 7] = alto >>> 16; cola[z - 6] = alto >>> 8; cola[z - 5] = alto;
        cola[z - 4] = bajo >>> 24; cola[z - 3] = bajo >>> 16; cola[z - 2] = bajo >>> 8; cola[z - 1] = bajo;
        const longitud = this.longitud;
        this.update(cola);
        this.longitud = longitud;
        this.terminado = true;
        this.resumen = new Uint8Array(20);
        for (let i = 0; i < 5; i++) {
          const v = this.h[i];
          this.resumen[4 * i] = v >>> 24; this.resumen[4 * i + 1] = v >>> 16;
          this.resumen[4 * i + 2] = v >>> 8; this.resumen[4 * i + 3] = v;
        }
      }
      return this.resumen.slice();
    }

    hexdigest() {
      let s = '';
      for (const b of this.digest()) s += (b < 16 ? '0' : '') + b.toString(16);
      return s;
    }
  }

  /** hashlib.sha1(datos).hexdigest(). */
  const hex = (datos) => new Sha1().update(datos).hexdigest();

  /** np.array(valores, dtype=np.int64).tobytes() (little-endian): números enteros o BigInt. */
  function bytesInt64(valores) {
    const a = new BigInt64Array(valores.length);
    for (let i = 0; i < valores.length; i++) a[i] = BigInt(valores[i]);
    const u = new Uint8Array(a.buffer);
    if (new Uint8Array(new Uint16Array([1]).buffer)[0] !== 1) { // máquina big-endian: se invierte cada entero
      for (let i = 0; i < u.length; i += 8) u.subarray(i, i + 8).reverse();
    }
    return u;
  }

  R2.py = R2.py || {};
  R2.py.sha1 = { Sha1, hex, utf8, bytesInt64 };
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/generated/constantes.js ===== */
// GENERADO por standalone/tools/gen_static.py a partir de app/backend/*.py. No editar a mano.
// Regenerar: /opt/anaconda3/bin/python3 standalone/tools/gen_static.py   (comprobar: --check)
// R2.gen.constantes[módulo][NOMBRE] y R2.gen.constantes_meta {tipos, omitidas}.
(function (R2) {
  'use strict';
  const congelar = (o) => { if (o && typeof o === 'object') { Object.values(o).forEach(congelar); Object.freeze(o); } return o; };
  const gen = R2.gen = R2.gen || {};
  gen.constantes = congelar({
 "fuente": {
  "SIN_FUENTE": "Fuente no declarada: el manifest.json de este corpus no tiene la clave «fuente». Cite el conjunto de datos original del que procede.",
  "N_LINEAS": 4,
  "ORIGEN_IMPORTADA": "importada de un paquete .2replib: la cita la declara el archivo y no se ha comprobado con el manifest de ningún corpus",
  "_FORMULA": "=+-@\t\r"
 },
 "search": {
  "INLINE_ID_LIMIT": 900,
  "SESSION_TEXTS_MAX_SPEECHES": 60,
  "SESSION_TEXTS_MAX_CHARS": 250000,
  "DOC_CACHE_MAX_DOCS": 4000,
  "DOC_CACHE_MAX_CHARS": 40000000,
  "IDEOLOGY_ORDER": [
   "EI",
   "I",
   "CI",
   "C",
   "CD",
   "D",
   "ED"
  ],
  "ORDENES": [
   "relevance",
   "date_asc",
   "date_desc",
   "length_desc",
   "length_asc"
  ],
  "_ORDEN_SQL": {
   "date_asc": "s.date ASC, s.num_session ASC, s.ord ASC, s.id ASC",
   "date_desc": "s.date DESC, s.num_session DESC, s.ord DESC, s.id DESC",
   "length_desc": "s.nwords DESC, s.id ASC",
   "length_asc": "s.nwords ASC, s.id ASC"
  },
  "_ORDEN_SQL_PALABRAS": {
   "relevance": "bm25(speeches_fts), s.id ASC",
   "date_asc": "s.date ASC, s.num_session ASC, s.ord ASC, s.id ASC",
   "date_desc": "s.date DESC, s.num_session DESC, s.ord DESC, s.id DESC",
   "length_desc": "s.nwords DESC, s.id ASC",
   "length_asc": "s.nwords ASC, s.id ASC"
  },
  "_ORDEN_SQL_NAVEGAR": {
   "relevance": "s.date ASC, s.num_session ASC, s.ord ASC, s.id ASC",
   "date_asc": "s.date ASC, s.num_session ASC, s.ord ASC, s.id ASC",
   "date_desc": "s.date DESC, s.num_session DESC, s.ord DESC, s.id DESC",
   "length_desc": "s.nwords DESC, s.id ASC",
   "length_asc": "s.nwords ASC, s.id ASC"
  },
  "PUNTUACIONES_CACHE": 4,
  "ENTERO_MAX": 9223372036854775807,
  "FORMAS_MAX_CHARS": 4000000,
  "CATEGORIAS_EXCLUIDAS": [
   "listas",
   "cronica",
   "acotaciones",
   "tablas",
   "notas",
   "cabeceras",
   "etiquetas",
   "otros"
  ],
  "_CAT_BLOQUE": {
   "par": "discurso",
   "turn": "discurso",
   "stage": "acotaciones",
   "chron": "cronica",
   "list": "listas",
   "table": "tablas",
   "note": "notas",
   "art": "cabeceras"
  },
  "_CAT_SEGMENTO": {
   "acot": "acotaciones",
   "note": "notas"
  },
  "_DIACRITICOS_CP": [
   768,
   769,
   770,
   771,
   772,
   774,
   775,
   776,
   777,
   778,
   779,
   780,
   783,
   785,
   795,
   803,
   804,
   805,
   806,
   807,
   808,
   813,
   814,
   816,
   817
  ],
  "_OPS": [
   "AND",
   "NOT",
   "OR"
  ],
  "_AVISO_ORDEN": [
   "date_corrected",
   "legislature_corrected",
   "double_sitting",
   "truncated_end",
   "ocr_loop",
   "government_change_day"
  ]
 },
 "keyness": {
  "KEYNESS_VERSION": 1,
  "MIN_FREQ": 5,
  "UMBRAL_G2": 10.83,
  "P_UMBRAL": 0.001,
  "LIMITE_NEGATIVOS": 50,
  "LOTE_SQL": 500,
  "CORTE_EXCLUSIVO": 6.0,
  "CORTE_MUY_DISTINTIVO": 3.0,
  "CORRECCION_CERO": 0.5,
  "INSIGNIAS": {
   "Exclusivo": "log-ratio ≥ 6 (≥ 64 veces más frecuente que en el resto del corpus) o ausente del resto del corpus",
   "Muy distintivo": "log-ratio entre 3 y 6 (entre 8 y 64 veces más frecuente)",
   "Significativo": "log-ratio < 3 (menos de 8 veces más frecuente), con G² ≥ 10,83"
  },
  "_DIACRITICOS_CP": [
   768,
   769,
   770,
   771,
   772,
   774,
   775,
   776,
   777,
   778,
   779,
   780,
   783,
   785,
   795,
   803,
   804,
   805,
   806,
   807,
   808,
   813,
   814,
   816,
   817
  ],
  "_DIACRITICOS": "̧̨̛̣̤̥̦̭̮̰̱̀́̂̃̄̆̇̈̉̊̋̌̏̑",
  "_USO_PRIVADO": "-󰀀-󿿽􀀀-􏿽",
  "_PLEGADO_ESPECIAL": {
   "µ": "μ",
   "ſ": "s",
   "ẛ": "s",
   "ς": "σ",
   "ϐ": "β",
   "ϑ": "θ",
   "ϕ": "φ",
   "ϖ": "π",
   "ϰ": "κ",
   "ϱ": "ρ",
   "ϵ": "ε",
   "ι": "ι",
   "ǡ": "ǡ"
  }
 },
 "careo": {
  "MIN_WORDS_SYNC": 45,
  "MIN_WORDS_DIAC": 150,
  "MAX_SQL_PARAMS": 900,
  "PESO_ALUSION_NOMBRE": 40.0,
  "PESO_ALUSION_CARGO": 30.0,
  "PESO_INTERRUPCION": 15.0,
  "PESO_MENCION_EXTRA": 3.0,
  "TOPE_MENCION_EXTRA": 9.0,
  "PESO_TURNO": 30.0,
  "DECAIMIENTO_TURNO": 0.6,
  "PESO_OTRA_FAMILIA": 12.0,
  "PESO_PASO_IDEOLOGICO": 4.0,
  "RANGO_DIAC": 10,
  "MAX_PARENTESIS": 3000,
  "IDEOLOGY_SCALE": {
   "EI": 1,
   "I": 2,
   "CI": 3,
   "C": 4,
   "CD": 5,
   "D": 6,
   "ED": 7
  },
  "SIN_DATO": [
   null,
   "",
   "Sin identificar"
  ],
  "PRESIDENCIA_CAMARA": [
   "chair",
   "chair_age",
   "vicechair"
  ],
  "NOTA_SYNC": "Heurística: sugiere réplicas por alusión al apellido o al cargo, interrupciones transcritas, cercanía en el orden del debate y distancia política. No prueba que exista un diálogo.",
  "NOTA_DIAC_FTS": "Heurística: sin índice semántico se usa la coincidencia léxica (bm25) con los términos más frecuentes del discurso; de las 10 más parecidas se prefieren las más alejadas en el tiempo (relevancia relativa × log(1 + años)).",
  "_COLS": [
   "id",
   "date",
   "num_session",
   "ord",
   "year",
   "legislature",
   "speaker",
   "rep_id",
   "rep_name",
   "party",
   "party_family",
   "ideology",
   "nwords"
  ],
  "_SQL_COLS": "id, date, num_session, ord, year, legislature, speaker, rep_id, rep_name, party, party_family, ideology, nwords",
  "_PLEGADO": [
   [
    192,
    "A"
   ],
   [
    193,
    "A"
   ],
   [
    194,
    "A"
   ],
   [
    195,
    "A"
   ],
   [
    196,
    "A"
   ],
   [
    197,
    "A"
   ],
   [
    199,
    "C"
   ],
   [
    200,
    "E"
   ],
   [
    201,
    "E"
   ],
   [
    202,
    "E"
   ],
   [
    203,
    "E"
   ],
   [
    204,
    "I"
   ],
   [
    205,
    "I"
   ],
   [
    206,
    "I"
   ],
   [
    207,
    "I"
   ],
   [
    209,
    "N"
   ],
   [
    210,
    "O"
   ],
   [
    211,
    "O"
   ],
   [
    212,
    "O"
   ],
   [
    213,
    "O"
   ],
   [
    214,
    "O"
   ],
   [
    217,
    "U"
   ],
   [
    218,
    "U"
   ],
   [
    219,
    "U"
   ],
   [
    220,
    "U"
   ],
   [
    221,
    "Y"
   ],
   [
    224,
    "a"
   ],
   [
    225,
    "a"
   ],
   [
    226,
    "a"
   ],
   [
    227,
    "a"
   ],
   [
    228,
    "a"
   ],
   [
    229,
    "a"
   ],
   [
    231,
    "c"
   ],
   [
    232,
    "e"
   ],
   [
    233,
    "e"
   ],
   [
    234,
    "e"
   ],
   [
    235,
    "e"
   ],
   [
    236,
    "i"
   ],
   [
    237,
    "i"
   ],
   [
    238,
    "i"
   ],
   [
    239,
    "i"
   ],
   [
    241,
    "n"
   ],
   [
    242,
    "o"
   ],
   [
    243,
    "o"
   ],
   [
    244,
    "o"
   ],
   [
    245,
    "o"
   ],
   [
    246,
    "o"
   ],
   [
    249,
    "u"
   ],
   [
    250,
    "u"
   ],
   [
    251,
    "u"
   ],
   [
    252,
    "u"
   ],
   [
    253,
    "y"
   ],
   [
    255,
    "y"
   ],
   [
    256,
    "A"
   ],
   [
    257,
    "a"
   ],
   [
    258,
    "A"
   ],
   [
    259,
    "a"
   ],
   [
    260,
    "A"
   ],
   [
    261,
    "a"
   ],
   [
    262,
    "C"
   ],
   [
    263,
    "c"
   ],
   [
    264,
    "C"
   ],
   [
    265,
    "c"
   ],
   [
    266,
    "C"
   ],
   [
    267,
    "c"
   ],
   [
    268,
    "C"
   ],
   [
    269,
    "c"
   ],
   [
    270,
    "D"
   ],
   [
    271,
    "d"
   ],
   [
    274,
    "E"
   ],
   [
    275,
    "e"
   ],
   [
    276,
    "E"
   ],
   [
    277,
    "e"
   ],
   [
    278,
    "E"
   ],
   [
    279,
    "e"
   ],
   [
    280,
    "E"
   ],
   [
    281,
    "e"
   ],
   [
    282,
    "E"
   ],
   [
    283,
    "e"
   ],
   [
    284,
    "G"
   ],
   [
    285,
    "g"
   ],
   [
    286,
    "G"
   ],
   [
    287,
    "g"
   ],
   [
    288,
    "G"
   ],
   [
    289,
    "g"
   ],
   [
    290,
    "G"
   ],
   [
    291,
    "g"
   ],
   [
    292,
    "H"
   ],
   [
    293,
    "h"
   ],
   [
    296,
    "I"
   ],
   [
    297,
    "i"
   ],
   [
    298,
    "I"
   ],
   [
    299,
    "i"
   ],
   [
    300,
    "I"
   ],
   [
    301,
    "i"
   ],
   [
    302,
    "I"
   ],
   [
    303,
    "i"
   ],
   [
    304,
    "I"
   ],
   [
    308,
    "J"
   ],
   [
    309,
    "j"
   ],
   [
    310,
    "K"
   ],
   [
    311,
    "k"
   ],
   [
    313,
    "L"
   ],
   [
    314,
    "l"
   ],
   [
    315,
    "L"
   ],
   [
    316,
    "l"
   ],
   [
    317,
    "L"
   ],
   [
    318,
    "l"
   ],
   [
    323,
    "N"
   ],
   [
    324,
    "n"
   ],
   [
    325,
    "N"
   ],
   [
    326,
    "n"
   ],
   [
    327,
    "N"
   ],
   [
    328,
    "n"
   ],
   [
    332,
    "O"
   ],
   [
    333,
    "o"
   ],
   [
    334,
    "O"
   ],
   [
    335,
    "o"
   ],
   [
    336,
    "O"
   ],
   [
    337,
    "o"
   ],
   [
    340,
    "R"
   ],
   [
    341,
    "r"
   ],
   [
    342,
    "R"
   ],
   [
    343,
    "r"
   ],
   [
    344,
    "R"
   ],
   [
    345,
    "r"
   ],
   [
    346,
    "S"
   ],
   [
    347,
    "s"
   ],
   [
    348,
    "S"
   ],
   [
    349,
    "s"
   ],
   [
    350,
    "S"
   ],
   [
    351,
    "s"
   ],
   [
    352,
    "S"
   ],
   [
    353,
    "s"
   ],
   [
    354,
    "T"
   ],
   [
    355,
    "t"
   ],
   [
    356,
    "T"
   ],
   [
    357,
    "t"
   ],
   [
    360,
    "U"
   ],
   [
    361,
    "u"
   ],
   [
    362,
    "U"
   ],
   [
    363,
    "u"
   ],
   [
    364,
    "U"
   ],
   [
    365,
    "u"
   ],
   [
    366,
    "U"
   ],
   [
    367,
    "u"
   ],
   [
    368,
    "U"
   ],
   [
    369,
    "u"
   ],
   [
    370,
    "U"
   ],
   [
    371,
    "u"
   ],
   [
    372,
    "W"
   ],
   [
    373,
    "w"
   ],
   [
    374,
    "Y"
   ],
   [
    375,
    "y"
   ],
   [
    376,
    "Y"
   ],
   [
    377,
    "Z"
   ],
   [
    378,
    "z"
   ],
   [
    379,
    "Z"
   ],
   [
    380,
    "z"
   ],
   [
    381,
    "Z"
   ],
   [
    382,
    "z"
   ],
   [
    416,
    "O"
   ],
   [
    417,
    "o"
   ],
   [
    431,
    "U"
   ],
   [
    432,
    "u"
   ],
   [
    461,
    "A"
   ],
   [
    462,
    "a"
   ],
   [
    463,
    "I"
   ],
   [
    464,
    "i"
   ],
   [
    465,
    "O"
   ],
   [
    466,
    "o"
   ],
   [
    467,
    "U"
   ],
   [
    468,
    "u"
   ],
   [
    469,
    "U"
   ],
   [
    470,
    "u"
   ],
   [
    471,
    "U"
   ],
   [
    472,
    "u"
   ],
   [
    473,
    "U"
   ],
   [
    474,
    "u"
   ],
   [
    475,
    "U"
   ],
   [
    476,
    "u"
   ],
   [
    478,
    "A"
   ],
   [
    479,
    "a"
   ],
   [
    480,
    "A"
   ],
   [
    481,
    "a"
   ],
   [
    486,
    "G"
   ],
   [
    487,
    "g"
   ],
   [
    488,
    "K"
   ],
   [
    489,
    "k"
   ],
   [
    490,
    "O"
   ],
   [
    491,
    "o"
   ],
   [
    492,
    "O"
   ],
   [
    493,
    "o"
   ],
   [
    496,
    "j"
   ],
   [
    500,
    "G"
   ],
   [
    501,
    "g"
   ],
   [
    504,
    "N"
   ],
   [
    505,
    "n"
   ],
   [
    506,
    "A"
   ],
   [
    507,
    "a"
   ],
   [
    512,
    "A"
   ],
   [
    513,
    "a"
   ],
   [
    514,
    "A"
   ],
   [
    515,
    "a"
   ],
   [
    516,
    "E"
   ],
   [
    517,
    "e"
   ],
   [
    518,
    "E"
   ],
   [
    519,
    "e"
   ],
   [
    520,
    "I"
   ],
   [
    521,
    "i"
   ],
   [
    522,
    "I"
   ],
   [
    523,
    "i"
   ],
   [
    524,
    "O"
   ],
   [
    525,
    "o"
   ],
   [
    526,
    "O"
   ],
   [
    527,
    "o"
   ],
   [
    528,
    "R"
   ],
   [
    529,
    "r"
   ],
   [
    530,
    "R"
   ],
   [
    531,
    "r"
   ],
   [
    532,
    "U"
   ],
   [
    533,
    "u"
   ],
   [
    534,
    "U"
   ],
   [
    535,
    "u"
   ],
   [
    536,
    "S"
   ],
   [
    537,
    "s"
   ],
   [
    538,
    "T"
   ],
   [
    539,
    "t"
   ],
   [
    542,
    "H"
   ],
   [
    543,
    "h"
   ],
   [
    550,
    "A"
   ],
   [
    551,
    "a"
   ],
   [
    552,
    "E"
   ],
   [
    553,
    "e"
   ],
   [
    554,
    "O"
   ],
   [
    555,
    "o"
   ],
   [
    556,
    "O"
   ],
   [
    557,
    "o"
   ],
   [
    558,
    "O"
   ],
   [
    559,
    "o"
   ],
   [
    560,
    "O"
   ],
   [
    561,
    "o"
   ],
   [
    562,
    "Y"
   ],
   [
    563,
    "y"
   ]
  ],
  "_PARTICULAS": [
   "de",
   "del",
   "e",
   "i",
   "la",
   "las",
   "los",
   "san",
   "y"
  ],
  "_HON_PLURAL": [
   "senoras",
   "senores",
   "senoritas",
   "sras",
   "sres",
   "srtas"
  ],
  "_HONOR": "(?:senoritas?|senoras?|senores|senor|srtas?|sras?|sres|sr|dona|don|d)\\.?\\s+(?:[a-z]+\\.?\\s+){0,2}"
 },
 "ngram": {
  "ENGINE_VERSION": 2,
  "MAX_TERMS": 12,
  "MIN_PREFIX_CHARS": 3,
  "MAX_PREFIX_INSTANCES": 1000000,
  "MAX_MS_TERMINO": 250,
  "PRESUPUESTO_MS": 400,
  "UMBRAL_NORMAL": 100000,
  "UMBRAL_BAJA": 20000,
  "CACHE_TERMS": 96,
  "FTS_TABLE": "speeches_fts",
  "_MS_APARICION": 7.2e-05,
  "_MS_APARICION_PREFIJO": 0.00014,
  "_MS_DOC_BM25": 0.0012,
  "_MS_DOC_FRASE": 0.0015,
  "_MS_DOC_HIGHLIGHT": 0.03,
  "_OPS": [
   "AND",
   "NEAR",
   "NOT",
   "OR"
  ],
  "_COMILLAS": [
   [
    171,
    "\""
   ],
   [
    187,
    "\""
   ],
   [
    8220,
    "\""
   ],
   [
    8221,
    "\""
   ],
   [
    8222,
    "\""
   ]
  ],
  "_MARCAS": "̀-ͯ᪰-᫿᷀-᷿︠-︯",
  "_ESPECIALES": {
   "ſ": "s"
  },
  "_SEPARA": " "
 },
 "server": {
  "CONFIRMAR_DESDE": 20000,
  "FORMATOS_EXPORT": [
   "csv",
   "json",
   "markdown",
   "citations",
   "bundle"
  ],
  "EXPORT_BYTES_FILA": {
   "csv": 143,
   "json": 446.09,
   "markdown": 191,
   "citations": 178,
   "bundle": 191
  },
  "EXPORT_BYTES_AVISO": {
   "csv": 0,
   "json": 647.6,
   "markdown": 0,
   "citations": 0,
   "bundle": 0
  },
  "EXPORT_FACTOR_TEXTO": {
   "csv": 1.003,
   "json": 1.02,
   "markdown": 1.0015,
   "citations": 0.0,
   "bundle": 0.0
  },
  "LIBERAR_MEMORIA_DESDE": 5000,
  "SIN_CACHE": {
   "Cache-Control": "no-store, must-revalidate",
   "Pragma": "no-cache"
  },
  "_TEXTO_HTTP": [
   [
    404,
    "No existe ese recurso."
   ],
   [
    405,
    "Método no permitido en esta ruta."
   ]
  ],
  "POLITICA_ARGS_WEBVIEW2": "SOFTWARE\\Policies\\Microsoft\\Edge\\WebView2\\AdditionalBrowserArguments"
 },
 "library": {
  "SCHEMA": "\nCREATE TABLE IF NOT EXISTS collections (\n    id          INTEGER PRIMARY KEY AUTOINCREMENT,\n    name        TEXT NOT NULL,\n    description TEXT DEFAULT '',\n    color       TEXT DEFAULT 'indigo',\n    created_at  TEXT NOT NULL,\n    updated_at  TEXT NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS items (\n    id            INTEGER PRIMARY KEY AUTOINCREMENT,\n    collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,\n    corpus        TEXT NOT NULL,\n    speech_id     INTEGER NOT NULL,\n    note          TEXT DEFAULT '',\n    tags          TEXT DEFAULT '[]',\n    char_start    INTEGER,\n    char_end      INTEGER,\n    added_at      TEXT NOT NULL,\n    position      INTEGER DEFAULT 0,\n    UNIQUE(collection_id, corpus, speech_id)\n);\nCREATE INDEX IF NOT EXISTS idx_items_col ON items(collection_id, position);\n\nCREATE TABLE IF NOT EXISTS saved_searches (\n    id         INTEGER PRIMARY KEY AUTOINCREMENT,\n    name       TEXT NOT NULL,\n    corpus     TEXT NOT NULL,\n    mode       TEXT NOT NULL,\n    query      TEXT DEFAULT '',\n    filters    TEXT DEFAULT '{}',\n    variants   INTEGER DEFAULT 0,\n    created_at TEXT NOT NULL\n);\n",
  "EXPORT_COLUMNS": [
   "id",
   "date",
   "legislature",
   "num_session",
   "ord",
   "speaker",
   "rep_name",
   "rep_id",
   "party",
   "party_family",
   "ideology",
   "district",
   "nwords"
  ],
  "MD_LINEA_FUENTE": "*Fuente: {}*",
  "CIT_TITULO_BIBTEX": "# Cita del conjunto de datos (BibTeX)",
  "CIT_TITULO_RIS": "# Cita del conjunto de datos (RIS)"
 },
 "sessions": {
  "SIDECAR_NAME": "sessions.json",
  "SIDECAR_VERSION": 1,
  "PAGE_VERIFIED": [
   "contiguous",
   "corrected",
   "verso_blank"
  ],
  "_CON_NOMBRE": [
   "presidente",
   "gobierno"
  ]
 },
 "diario": {
  "ENGINE_VERSION": "diario-2",
  "NUMBERING_VERSION": "2",
  "CLASS_RANK": {
   "conflict": 4,
   "order": 3,
   "applause": 2,
   "neutral": 1
  },
  "SPLIT_MIN_WORDS": 300,
  "CHUNK_TAIL": 40,
  "_FOLD": [
   [
    192,
    65
   ],
   [
    193,
    65
   ],
   [
    194,
    65
   ],
   [
    196,
    65
   ],
   [
    199,
    67
   ],
   [
    200,
    69
   ],
   [
    201,
    69
   ],
   [
    202,
    69
   ],
   [
    203,
    69
   ],
   [
    204,
    73
   ],
   [
    205,
    73
   ],
   [
    206,
    73
   ],
   [
    207,
    73
   ],
   [
    209,
    78
   ],
   [
    210,
    79
   ],
   [
    211,
    79
   ],
   [
    212,
    79
   ],
   [
    214,
    79
   ],
   [
    217,
    85
   ],
   [
    218,
    85
   ],
   [
    219,
    85
   ],
   [
    220,
    85
   ],
   [
    224,
    97
   ],
   [
    225,
    97
   ],
   [
    226,
    97
   ],
   [
    228,
    97
   ],
   [
    231,
    99
   ],
   [
    232,
    101
   ],
   [
    233,
    101
   ],
   [
    234,
    101
   ],
   [
    235,
    101
   ],
   [
    236,
    105
   ],
   [
    237,
    105
   ],
   [
    238,
    105
   ],
   [
    239,
    105
   ],
   [
    241,
    110
   ],
   [
    242,
    111
   ],
   [
    243,
    111
   ],
   [
    244,
    111
   ],
   [
    246,
    111
   ],
   [
    249,
    117
   ],
   [
    250,
    117
   ],
   [
    251,
    117
   ],
   [
    252,
    117
   ]
  ],
  "_UPPER": "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ",
  "_CHAIR_NAMES": {
   "julian besteiro fernandez": "Besteiro",
   "santiago alba bonifaz": "Alba",
   "diego martinez barrio": "Martínez Barrio",
   "luis jimenez de asua": "Jiménez de Asúa",
   "manuel jimenez fernandez": "Giménez Fernández",
   "francisco barnes salinas": "Barnés",
   "candido casanueva y gorjon": "Casanueva",
   "antonio lara zarate": "Lara",
   "pedro rahola y molinas": "Rahola",
   "manuel marraco ramon": "Marraco",
   "antonio tunon de lara": "Tuñón de Lara",
   "juan castrillo santos": "Castrillo",
   "emilio baeza medina": "Baeza Medina",
   "jose martinez de velasco escolar": "Martínez de Velasco",
   "luis fernandez clerigo": "Fernández Clérigo",
   "gregorio arranz olalla": "Arranz",
   "laureano gomez paratcha": "Gómez Paratcha",
   "fernando suarez de tangil y angulo": "Suárez de Tangil",
   "claudio sanchez albornoz menduina": "Sánchez Albornoz",
   "alfredo martinez garcia arguelles": "Martínez García Argüelles",
   "jose rosado gil": "Rosado Gil",
   "narciso vazquez lemus": "Vázquez Lemus"
  },
  "_ROLE_TITLE": {
   "chair": "PRESIDENTE",
   "vicechair": "VICEPRESIDENTE",
   "chair_age": "PRESIDENTE DE EDAD",
   "secretary": "SECRETARIO"
  },
  "_LABELS_TUMULT": [
   [
    "protest",
    "Protestas"
   ],
   [
    "interrup",
    "Interrupciones"
   ],
   [
    "interrump",
    "Interrupciones"
   ],
   [
    "no se",
    "Voces"
   ],
   [
    "increp",
    "Protestas"
   ],
   [
    "rumor",
    "Rumores"
   ],
   [
    "murmull",
    "Rumores"
   ]
  ],
  "_LABELS_GESTURE": [
   [
    "asentimiento",
    "Asentimiento"
   ],
   [
    "firmacion",
    "Asentimiento"
   ],
   [
    "denegacion",
    "Denegaciones"
   ],
   [
    "pausa",
    "Pausa"
   ],
   [
    "palabra",
    "Piden la palabra"
   ]
  ],
  "_MESES": "ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|SETIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE",
  "_JOIN_STOP": [
   "a",
   "al",
   "con",
   "de",
   "del",
   "el",
   "en",
   "es",
   "esa",
   "ese",
   "eso",
   "ha",
   "hay",
   "he",
   "la",
   "las",
   "le",
   "les",
   "lo",
   "los",
   "mas",
   "me",
   "mi",
   "ni",
   "no",
   "nos",
   "o",
   "os",
   "por",
   "pues",
   "que",
   "se",
   "si",
   "su",
   "sus",
   "tan",
   "te",
   "un",
   "una",
   "y",
   "ya",
   "yo"
  ],
  "_MAX_PAREN": 900,
  "_MAX_OPEN_WORDS": 30,
  "_MAX_CHAIN": 12,
  "_PRET1_STOP": [
   "bebe",
   "bide",
   "bufe",
   "cabriole",
   "cafe",
   "canape",
   "carne",
   "chale",
   "clise",
   "comite",
   "consome",
   "corse",
   "este",
   "fue",
   "parque",
   "porque",
   "pure",
   "que",
   "rape"
  ],
  "_PL1_STOP": [
   "animos",
   "blasfemos",
   "centimos",
   "decimos",
   "diezmos",
   "extremos",
   "gemos",
   "intimos",
   "legitimos",
   "lemos",
   "maximos",
   "memos",
   "minimos",
   "mismos",
   "optimos",
   "postremos",
   "primos",
   "proximos",
   "quimos",
   "racimos",
   "ramos",
   "remos",
   "supremos",
   "temos",
   "ultimos",
   "unanimos"
  ],
  "_TERM_CHARS": ".!?…:»\"”",
  "_ABBR": [
   "a",
   "aprox",
   "art",
   "arts",
   "c",
   "ca",
   "cap",
   "cit",
   "col",
   "cts",
   "cía",
   "d",
   "dn",
   "dr",
   "dña",
   "e",
   "ee",
   "etc",
   "excma",
   "excmo",
   "fr",
   "gen",
   "gral",
   "hnos",
   "ibíd",
   "id",
   "ilma",
   "ilmo",
   "n",
   "num",
   "nums",
   "núm",
   "núms",
   "o",
   "ob",
   "op",
   "p",
   "pag",
   "pags",
   "pp",
   "ptas",
   "pts",
   "pág",
   "págs",
   "r",
   "s",
   "sig",
   "sigs",
   "sr",
   "sra",
   "sres",
   "srta",
   "ss",
   "tit",
   "tít",
   "ud",
   "uds",
   "uu",
   "v",
   "vd",
   "vds",
   "vol"
  ]
 }
});
  gen.constantes_meta = congelar({
 "tipos": {
  "fuente": {
   "SIN_FUENTE": "str",
   "N_LINEAS": "int",
   "ORIGEN_IMPORTADA": "str",
   "_FORMULA": "str"
  },
  "search": {
   "INLINE_ID_LIMIT": "int",
   "SESSION_TEXTS_MAX_SPEECHES": "int",
   "SESSION_TEXTS_MAX_CHARS": "int",
   "DOC_CACHE_MAX_DOCS": "int",
   "DOC_CACHE_MAX_CHARS": "int",
   "IDEOLOGY_ORDER": {
    "tipo": "tuple",
    "elementos": "str"
   },
   "ORDENES": {
    "tipo": "tuple",
    "elementos": "str"
   },
   "_ORDEN_SQL": {
    "tipo": "dict",
    "valores": {
     "date_asc": "str",
     "date_desc": "str",
     "length_desc": "str",
     "length_asc": "str"
    }
   },
   "_ORDEN_SQL_PALABRAS": {
    "tipo": "dict",
    "valores": {
     "relevance": "str",
     "date_asc": "str",
     "date_desc": "str",
     "length_desc": "str",
     "length_asc": "str"
    }
   },
   "_ORDEN_SQL_NAVEGAR": {
    "tipo": "dict",
    "valores": {
     "relevance": "str",
     "date_asc": "str",
     "date_desc": "str",
     "length_desc": "str",
     "length_asc": "str"
    }
   },
   "PUNTUACIONES_CACHE": "int",
   "ENTERO_MAX": "int",
   "FORMAS_MAX_CHARS": "int",
   "CATEGORIAS_EXCLUIDAS": {
    "tipo": "tuple",
    "elementos": "str"
   },
   "_CAT_BLOQUE": {
    "tipo": "dict",
    "valores": {
     "par": "str",
     "turn": "str",
     "stage": "str",
     "chron": "str",
     "list": "str",
     "table": "str",
     "note": "str",
     "art": "str"
    }
   },
   "_CAT_SEGMENTO": {
    "tipo": "dict",
    "valores": {
     "acot": "str",
     "note": "str"
    }
   },
   "_DIACRITICOS_CP": {
    "tipo": "frozenset",
    "elementos": "int"
   },
   "_OPS": {
    "tipo": "set",
    "elementos": "str"
   },
   "_AVISO_ORDEN": {
    "tipo": "tuple",
    "elementos": "str"
   }
  },
  "keyness": {
   "KEYNESS_VERSION": "int",
   "MIN_FREQ": "int",
   "UMBRAL_G2": "float",
   "P_UMBRAL": "float",
   "LIMITE_NEGATIVOS": "int",
   "LOTE_SQL": "int",
   "CORTE_EXCLUSIVO": "float",
   "CORTE_MUY_DISTINTIVO": "float",
   "CORRECCION_CERO": "float",
   "INSIGNIAS": {
    "tipo": "dict",
    "valores": {
     "Exclusivo": "str",
     "Muy distintivo": "str",
     "Significativo": "str"
    }
   },
   "_DIACRITICOS_CP": {
    "tipo": "frozenset",
    "elementos": "int"
   },
   "_DIACRITICOS": "str",
   "_USO_PRIVADO": "str",
   "_PLEGADO_ESPECIAL": {
    "tipo": "dict",
    "valores": {
     "µ": "str",
     "ſ": "str",
     "ẛ": "str",
     "ς": "str",
     "ϐ": "str",
     "ϑ": "str",
     "ϕ": "str",
     "ϖ": "str",
     "ϰ": "str",
     "ϱ": "str",
     "ϵ": "str",
     "ι": "str",
     "ǡ": "str"
    }
   }
  },
  "careo": {
   "MIN_WORDS_SYNC": "int",
   "MIN_WORDS_DIAC": "int",
   "MAX_SQL_PARAMS": "int",
   "PESO_ALUSION_NOMBRE": "float",
   "PESO_ALUSION_CARGO": "float",
   "PESO_INTERRUPCION": "float",
   "PESO_MENCION_EXTRA": "float",
   "TOPE_MENCION_EXTRA": "float",
   "PESO_TURNO": "float",
   "DECAIMIENTO_TURNO": "float",
   "PESO_OTRA_FAMILIA": "float",
   "PESO_PASO_IDEOLOGICO": "float",
   "RANGO_DIAC": "int",
   "MAX_PARENTESIS": "int",
   "IDEOLOGY_SCALE": {
    "tipo": "dict",
    "valores": {
     "EI": "int",
     "I": "int",
     "CI": "int",
     "C": "int",
     "CD": "int",
     "D": "int",
     "ED": "int"
    }
   },
   "SIN_DATO": {
    "tipo": "set",
    "elementos": "str|None"
   },
   "PRESIDENCIA_CAMARA": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "NOTA_SYNC": "str",
   "NOTA_DIAC_FTS": "str",
   "_COLS": {
    "tipo": "tuple",
    "elementos": "str"
   },
   "_SQL_COLS": "str",
   "_PLEGADO": {
    "tipo": "dict",
    "claves": "int",
    "forma": "lista de pares [clave, valor] ordenada por clave"
   },
   "_PARTICULAS": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "_HON_PLURAL": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "_HONOR": "str"
  },
  "ngram": {
   "ENGINE_VERSION": "int",
   "MAX_TERMS": "int",
   "MIN_PREFIX_CHARS": "int",
   "MAX_PREFIX_INSTANCES": "int",
   "MAX_MS_TERMINO": "int",
   "PRESUPUESTO_MS": "int",
   "UMBRAL_NORMAL": "int",
   "UMBRAL_BAJA": "int",
   "CACHE_TERMS": "int",
   "FTS_TABLE": "str",
   "_MS_APARICION": "float",
   "_MS_APARICION_PREFIJO": "float",
   "_MS_DOC_BM25": "float",
   "_MS_DOC_FRASE": "float",
   "_MS_DOC_HIGHLIGHT": "float",
   "_OPS": {
    "tipo": "set",
    "elementos": "str"
   },
   "_COMILLAS": {
    "tipo": "dict",
    "claves": "int",
    "forma": "lista de pares [clave, valor] ordenada por clave"
   },
   "_MARCAS": "str",
   "_ESPECIALES": {
    "tipo": "dict",
    "valores": {
     "ſ": "str"
    }
   },
   "_SEPARA": "str"
  },
  "server": {
   "CONFIRMAR_DESDE": "int",
   "FORMATOS_EXPORT": {
    "tipo": "tuple",
    "elementos": "str"
   },
   "EXPORT_BYTES_FILA": {
    "tipo": "dict",
    "valores": {
     "csv": "int",
     "json": "float",
     "markdown": "int",
     "citations": "int",
     "bundle": "int"
    }
   },
   "EXPORT_BYTES_AVISO": {
    "tipo": "dict",
    "valores": {
     "csv": "int",
     "json": "float",
     "markdown": "int",
     "citations": "int",
     "bundle": "int"
    }
   },
   "EXPORT_FACTOR_TEXTO": {
    "tipo": "dict",
    "valores": {
     "csv": "float",
     "json": "float",
     "markdown": "float",
     "citations": "float",
     "bundle": "float"
    }
   },
   "LIBERAR_MEMORIA_DESDE": "int",
   "SIN_CACHE": {
    "tipo": "dict",
    "valores": {
     "Cache-Control": "str",
     "Pragma": "str"
    }
   },
   "_TEXTO_HTTP": {
    "tipo": "dict",
    "claves": "int",
    "forma": "lista de pares [clave, valor] ordenada por clave"
   },
   "POLITICA_ARGS_WEBVIEW2": "str"
  },
  "library": {
   "SCHEMA": "str",
   "EXPORT_COLUMNS": {
    "tipo": "list",
    "elementos": "str"
   },
   "MD_LINEA_FUENTE": "str",
   "CIT_TITULO_BIBTEX": "str",
   "CIT_TITULO_RIS": "str"
  },
  "sessions": {
   "SIDECAR_NAME": "str",
   "SIDECAR_VERSION": "int",
   "PAGE_VERIFIED": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "_CON_NOMBRE": {
    "tipo": "tuple",
    "elementos": "str"
   }
  },
  "diario": {
   "ENGINE_VERSION": "str",
   "NUMBERING_VERSION": "str",
   "CLASS_RANK": {
    "tipo": "dict",
    "valores": {
     "conflict": "int",
     "order": "int",
     "applause": "int",
     "neutral": "int"
    }
   },
   "SPLIT_MIN_WORDS": "int",
   "CHUNK_TAIL": "int",
   "_FOLD": {
    "tipo": "dict",
    "claves": "int",
    "forma": "lista de pares [clave, valor] ordenada por clave"
   },
   "_UPPER": "str",
   "_CHAIR_NAMES": {
    "tipo": "dict",
    "valores": {
     "julian besteiro fernandez": "str",
     "santiago alba bonifaz": "str",
     "diego martinez barrio": "str",
     "luis jimenez de asua": "str",
     "manuel jimenez fernandez": "str",
     "francisco barnes salinas": "str",
     "candido casanueva y gorjon": "str",
     "antonio lara zarate": "str",
     "pedro rahola y molinas": "str",
     "manuel marraco ramon": "str",
     "antonio tunon de lara": "str",
     "juan castrillo santos": "str",
     "emilio baeza medina": "str",
     "jose martinez de velasco escolar": "str",
     "luis fernandez clerigo": "str",
     "gregorio arranz olalla": "str",
     "laureano gomez paratcha": "str",
     "fernando suarez de tangil y angulo": "str",
     "claudio sanchez albornoz menduina": "str",
     "alfredo martinez garcia arguelles": "str",
     "jose rosado gil": "str",
     "narciso vazquez lemus": "str"
    }
   },
   "_ROLE_TITLE": {
    "tipo": "dict",
    "valores": {
     "chair": "str",
     "vicechair": "str",
     "chair_age": "str",
     "secretary": "str"
    }
   },
   "_LABELS_TUMULT": {
    "tipo": "tuple",
    "elementos": {
     "tipo": "tuple",
     "elementos": "str"
    }
   },
   "_LABELS_GESTURE": {
    "tipo": "tuple",
    "elementos": {
     "tipo": "tuple",
     "elementos": "str"
    }
   },
   "_MESES": "str",
   "_JOIN_STOP": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "_MAX_PAREN": "int",
   "_MAX_OPEN_WORDS": "int",
   "_MAX_CHAIN": "int",
   "_PRET1_STOP": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "_PL1_STOP": {
    "tipo": "frozenset",
    "elementos": "str"
   },
   "_TERM_CHARS": "str",
   "_ABBR": {
    "tipo": "frozenset",
    "elementos": "str"
   }
  }
 },
 "omitidas": {
  "fuente": {
   "_CONTROL": "expresión regular (regex_manifest.json)",
   "_YAML_NO_IMPRIMIBLE": "expresión regular (regex_manifest.json)"
  },
  "search": {
   "DOC_CACHE": "no serializable: _DocCache",
   "CLIMATE_CACHE": "no serializable: _DocCache",
   "_PALABRA_NO_ASCII": "expresión regular (regex_manifest.json)",
   "PROSE_CACHE": "no serializable: _DocCache",
   "_TOKEN": "expresión regular (regex_manifest.json)",
   "_TIENE_TERMINO": "expresión regular (regex_manifest.json)",
   "VACIAS": "en un archivo propio (vacias.js / hitos.js)",
   "_HUELLAS": "caché mutable"
  },
  "keyness": {
   "_VACIAS_TEXTO": "en un archivo propio (vacias.js / hitos.js)",
   "_TOKEN_SIMPLE": "expresión regular (regex_manifest.json)",
   "_TOKEN_COMPLETO": "expresión regular (regex_manifest.json)",
   "_RAROS": "expresión regular (regex_manifest.json)",
   "_IDENT": "expresión regular (regex_manifest.json)",
   "STOPWORDS": "en un archivo propio (vacias.js / hitos.js)"
  },
  "careo": {
   "_PREFIJO": "expresión regular (regex_manifest.json)",
   "_CORTE_ETIQUETA": "expresión regular (regex_manifest.json)",
   "_COLA_ACOTACION": "expresión regular (regex_manifest.json)",
   "_PAREN": "expresión regular (regex_manifest.json)",
   "_TOK_PAREN": "expresión regular (regex_manifest.json)",
   "_TRAS_ORADOR": "expresión regular (regex_manifest.json)",
   "_VACIAS_SALA": "en un archivo propio (vacias.js / hitos.js)"
  },
  "ngram": {
   "_TOKEN_RE": "expresión regular (regex_manifest.json)",
   "_TABLA": "caché mutable (se rellena bajo demanda)",
   "_TABLA_LOCK": "no serializable: lock",
   "_FTS5_MEMORIA": "estado mutable",
   "_REGISTRO": "no serializable: OrderedDict",
   "_REGISTRO_LOCK": "no serializable: lock",
   "HITOS": "en un archivo propio (vacias.js / hitos.js)"
  },
  "server": {
   "HERE": "ruta local",
   "ROOT": "ruta local",
   "STATIC_DIR": "ruta local",
   "CORPUS_DIR": "ruta local",
   "MODEL_DIR": "ruta local",
   "STATE": "estado mutable del servidor",
   "_EXPORT_LOCK": "no serializable: lock"
  },
  "library": {},
  "sessions": {
   "_CAMPOS_META": "no serializable: type"
  },
  "diario": {
   "_WORD": "expresión regular (regex_manifest.json)",
   "_LOWER_START": "expresión regular (regex_manifest.json)",
   "_HONOR": "expresión regular (regex_manifest.json)",
   "_ROLE_HOG": "expresión regular (regex_manifest.json)",
   "_ROLE_STATE": "expresión regular (regex_manifest.json)",
   "_ROLE_AGE": "expresión regular (regex_manifest.json)",
   "_ROLE_CAMARA": "expresión regular (regex_manifest.json)",
   "_EXCL_NOTE": "expresión regular (regex_manifest.json)",
   "_EXCL_TEXT": "expresión regular (regex_manifest.json)",
   "_UNIT_SEP": "expresión regular (regex_manifest.json)",
   "_INTERJ": "expresión regular (regex_manifest.json)",
   "_WHO_CHAIR": "expresión regular (regex_manifest.json)",
   "_SAY_BRAVO": "expresión regular (regex_manifest.json)",
   "_CHAIR_SUBJ": "expresión regular (regex_manifest.json)",
   "_CHAIR_ACT": "expresión regular (regex_manifest.json)",
   "_CAMPANILLA": "expresión regular (regex_manifest.json)",
   "_APPROVAL": "expresión regular (regex_manifest.json)",
   "_TUMULT": "expresión regular (regex_manifest.json)",
   "_LAUGH": "expresión regular (regex_manifest.json)",
   "_OVATION": "expresión regular (regex_manifest.json)",
   "_GESTURE": "expresión regular (regex_manifest.json)",
   "_UNIT_HINT": "expresión regular (regex_manifest.json)",
   "_PP_SEP": "expresión regular (regex_manifest.json)",
   "_HDR_ONLY": "expresión regular (regex_manifest.json)",
   "_HDR_PREFIX": "expresión regular (regex_manifest.json)",
   "_HDR_DATE": "expresión regular (regex_manifest.json)",
   "_LEAD_SPEAKER": "expresión regular (regex_manifest.json)",
   "_HYPH_END": "expresión regular (regex_manifest.json)",
   "_NEXT_TOKEN": "expresión regular (regex_manifest.json)",
   "_SOFT": "expresión regular (regex_manifest.json)",
   "_BRACKET": "expresión regular (regex_manifest.json)",
   "_DASH_AFTER": "expresión regular (regex_manifest.json)",
   "_DASH_UNIT": "expresión regular (regex_manifest.json)",
   "_LOOSE_SEP": "expresión regular (regex_manifest.json)",
   "_CHRON_START": "expresión regular (regex_manifest.json)",
   "_CHRON_END": "expresión regular (regex_manifest.json)",
   "_HEADING": "expresión regular (regex_manifest.json)",
   "_TURN": "expresión regular (regex_manifest.json)",
   "_VOTE_HEAD": "expresión regular (regex_manifest.json)",
   "_TOTAL": "expresión regular (regex_manifest.json)",
   "_NUM_DEP": "expresión regular (regex_manifest.json)",
   "_DEP": "expresión regular (regex_manifest.json)",
   "_NAME_ITEM": "expresión regular (regex_manifest.json)",
   "_NOTE_PARA": "expresión regular (regex_manifest.json)",
   "_SIGNATURE": "expresión regular (regex_manifest.json)",
   "_READ_DOC": "expresión regular (regex_manifest.json)",
   "_ANNEX": "expresión regular (regex_manifest.json)",
   "_FIRST_PERSON_DOC": "expresión regular (regex_manifest.json)",
   "_VOCATIVE": "expresión regular (regex_manifest.json)",
   "_ABS_START": "expresión regular (regex_manifest.json)",
   "_PROC_NOUN": "expresión regular (regex_manifest.json)",
   "_SPEECH_MARK": "expresión regular (regex_manifest.json)",
   "_PRET1": "expresión regular (regex_manifest.json)",
   "_PL1": "expresión regular (regex_manifest.json)",
   "_PAREN_TXT": "expresión regular (regex_manifest.json)",
   "_QUOTED_TXT": "expresión regular (regex_manifest.json)",
   "_ACTA_VERB": "expresión regular (regex_manifest.json)",
   "_LEADERS": "expresión regular (regex_manifest.json)",
   "_NEXT_CAP": "expresión regular (regex_manifest.json)",
   "_OCR_HYPH": "expresión regular (regex_manifest.json)",
   "_PUNCT_ONLY": "expresión regular (regex_manifest.json)",
   "_HAS_WORD": "expresión regular (regex_manifest.json)",
   "_SENT_END": "expresión regular (regex_manifest.json)"
  }
 },
 "excluidas": {
  "motivo": "búsqueda con vectores o exclusiva del escritorio: no existe en Standalone",
  "por_modulo": {
   "careo": 1,
   "search": 8
  }
 }
});
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/generated/vacias.js ===== */
// GENERADO por standalone/tools/gen_static.py a partir de app/backend/*.py. No editar a mano.
// Regenerar: /opt/anaconda3/bin/python3 standalone/tools/gen_static.py   (comprobar: --check)
// R2.gen.vacias: VACIAS (search), STOPWORDS_KEYNESS (keyness, plegadas) y VACIAS_SALA (careo).
(function (R2) {
  'use strict';
  const congelar = (o) => { if (o && typeof o === 'object') { Object.values(o).forEach(congelar); Object.freeze(o); } return o; };
  const gen = R2.gen = R2.gen || {};
  gen.vacias = congelar({
 "VACIAS": [
  "a",
  "al",
  "algo",
  "alguna",
  "algunas",
  "alguno",
  "algunos",
  "ante",
  "antes",
  "aquel",
  "aquella",
  "aquellas",
  "aquello",
  "aquellos",
  "aqui",
  "asi",
  "aun",
  "aunque",
  "cada",
  "como",
  "con",
  "contra",
  "cual",
  "cuales",
  "cuando",
  "cuanto",
  "de",
  "del",
  "desde",
  "donde",
  "dos",
  "e",
  "el",
  "ella",
  "ellas",
  "ello",
  "ellos",
  "en",
  "entre",
  "era",
  "eran",
  "es",
  "esa",
  "esas",
  "ese",
  "eso",
  "esos",
  "esta",
  "estaba",
  "estan",
  "estar",
  "estas",
  "este",
  "esto",
  "estos",
  "fue",
  "fuera",
  "fueron",
  "ha",
  "habia",
  "han",
  "hasta",
  "hay",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "mas",
  "me",
  "mi",
  "mis",
  "mucho",
  "muchos",
  "muy",
  "nada",
  "ni",
  "no",
  "nos",
  "nuestra",
  "nuestro",
  "o",
  "otra",
  "otras",
  "otro",
  "otros",
  "para",
  "pero",
  "poco",
  "por",
  "porque",
  "pues",
  "que",
  "quien",
  "quienes",
  "se",
  "ser",
  "si",
  "sin",
  "sobre",
  "solo",
  "son",
  "su",
  "sus",
  "tal",
  "tambien",
  "tan",
  "tanto",
  "te",
  "tiene",
  "tienen",
  "toda",
  "todas",
  "todo",
  "todos",
  "tras",
  "un",
  "una",
  "unas",
  "uno",
  "unos",
  "y",
  "ya",
  "yo"
 ],
 "STOPWORDS_KEYNESS": [
  "a",
  "aca",
  "acaso",
  "ademas",
  "adonde",
  "ahi",
  "ahora",
  "al",
  "algo",
  "alguien",
  "algun",
  "alguna",
  "algunas",
  "alguno",
  "algunos",
  "alla",
  "alli",
  "ambas",
  "ambos",
  "ante",
  "antes",
  "aquel",
  "aquella",
  "aquellas",
  "aquello",
  "aquellos",
  "aqui",
  "asi",
  "aun",
  "aunque",
  "bajo",
  "bien",
  "cabe",
  "cada",
  "casi",
  "como",
  "con",
  "conmigo",
  "conque",
  "consigo",
  "contigo",
  "contra",
  "cual",
  "cuales",
  "cualquier",
  "cualquiera",
  "cuando",
  "cuanta",
  "cuantas",
  "cuanto",
  "cuantos",
  "cuya",
  "cuyas",
  "cuyo",
  "cuyos",
  "de",
  "del",
  "demas",
  "desde",
  "despues",
  "donde",
  "dos",
  "durante",
  "e",
  "el",
  "ella",
  "ellas",
  "ello",
  "ellos",
  "en",
  "entonces",
  "entre",
  "era",
  "eran",
  "eres",
  "es",
  "esa",
  "esas",
  "ese",
  "eso",
  "esos",
  "esta",
  "estaba",
  "estaban",
  "estamos",
  "estan",
  "estar",
  "estaria",
  "estarian",
  "estas",
  "este",
  "esten",
  "esto",
  "estos",
  "estoy",
  "estuvieron",
  "estuvo",
  "fue",
  "fuera",
  "fueran",
  "fueron",
  "fuese",
  "fuesen",
  "fui",
  "fuimos",
  "ha",
  "habeis",
  "haber",
  "habia",
  "habian",
  "habido",
  "habiendo",
  "habra",
  "habran",
  "habria",
  "habrian",
  "hacia",
  "han",
  "has",
  "hasta",
  "hay",
  "haya",
  "hayan",
  "he",
  "hemos",
  "hubiera",
  "hubieran",
  "hubiese",
  "hubiesen",
  "hubo",
  "incluso",
  "jamas",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "luego",
  "mas",
  "me",
  "mediante",
  "menos",
  "mi",
  "mia",
  "mias",
  "mientras",
  "mio",
  "mios",
  "mis",
  "misma",
  "mismas",
  "mismo",
  "mismos",
  "mucha",
  "muchas",
  "mucho",
  "muchos",
  "muy",
  "nada",
  "nadie",
  "ni",
  "ningun",
  "ninguna",
  "ninguno",
  "no",
  "nos",
  "nosotras",
  "nosotros",
  "nuestra",
  "nuestras",
  "nuestro",
  "nuestros",
  "nunca",
  "o",
  "os",
  "otra",
  "otras",
  "otro",
  "otros",
  "para",
  "pero",
  "poca",
  "pocas",
  "poco",
  "pocos",
  "por",
  "porque",
  "pues",
  "que",
  "quien",
  "quienes",
  "quiza",
  "quizas",
  "se",
  "sea",
  "sean",
  "segun",
  "ser",
  "sera",
  "seran",
  "sere",
  "seremos",
  "seria",
  "serian",
  "si",
  "sido",
  "siempre",
  "siendo",
  "sin",
  "sino",
  "so",
  "sobre",
  "sois",
  "solamente",
  "solo",
  "somos",
  "son",
  "soy",
  "su",
  "sus",
  "suya",
  "suyas",
  "suyo",
  "suyos",
  "tal",
  "tales",
  "tambien",
  "tampoco",
  "tan",
  "tanta",
  "tantas",
  "tanto",
  "tantos",
  "te",
  "ti",
  "tiene",
  "tienen",
  "toda",
  "todas",
  "todavia",
  "todo",
  "todos",
  "tras",
  "tu",
  "tus",
  "tuya",
  "tuyas",
  "tuyo",
  "tuyos",
  "u",
  "un",
  "una",
  "unas",
  "uno",
  "unos",
  "usted",
  "ustedes",
  "varias",
  "varios",
  "via",
  "vosotras",
  "vosotros",
  "vuestra",
  "vuestras",
  "vuestro",
  "vuestros",
  "y",
  "ya",
  "yo"
 ],
 "VACIAS_SALA": [
  "aqui",
  "articulo",
  "camara",
  "creo",
  "decir",
  "dicho",
  "diputado",
  "diputados",
  "esto",
  "gobierno",
  "haber",
  "hace",
  "hacer",
  "hemos",
  "ministro",
  "minoria",
  "palabra",
  "porque",
  "presidente",
  "puede",
  "pueden",
  "senor",
  "senora",
  "senores",
  "senoria",
  "senorias",
  "senorita",
  "sido",
  "sino",
  "sres",
  "usted",
  "ustedes"
 ]
});
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/generated/hitos.js ===== */
// GENERADO por standalone/tools/gen_static.py a partir de app/backend/*.py. No editar a mano.
// Regenerar: /opt/anaconda3/bin/python3 standalone/tools/gen_static.py   (comprobar: --check)
// R2.gen.hitos: ngram.HITOS.
(function (R2) {
  'use strict';
  const congelar = (o) => { if (o && typeof o === 'object') { Object.values(o).forEach(congelar); Object.freeze(o); } return o; };
  const gen = R2.gen = R2.gen || {};
  gen.hitos = congelar([
 {
  "id": "proclamacion",
  "date": "1931-04-14",
  "label": "Proclamación de la República",
  "desc": "Proclamación de la Segunda República tras las municipales del 12 de abril; fin del reinado de Alfonso XIII.",
  "kind": "politico",
  "fuente": "https://es.wikipedia.org/wiki/Segunda_Rep%C3%BAblica_espa%C3%B1ola",
  "verificar": false
 },
 {
  "id": "elecciones_1931",
  "date": "1931-06-28",
  "label": "Elecciones constituyentes",
  "desc": "Elecciones a Cortes Constituyentes.",
  "kind": "electoral",
  "fuente": "https://es.wikipedia.org/wiki/Constituci%C3%B3n_espa%C3%B1ola_de_1931",
  "verificar": false
 },
 {
  "id": "apertura_constituyentes",
  "date": "1931-07-14",
  "label": "Apertura de las Constituyentes",
  "desc": "Sesión inaugural de las Cortes Constituyentes (primera fecha del corpus).",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Constituci%C3%B3n_espa%C3%B1ola_de_1931",
  "verificar": false
 },
 {
  "id": "sufragio_femenino",
  "date": "1931-10-01",
  "label": "Sufragio femenino",
  "desc": "Se aprueba el texto del artículo 36 (34 del proyecto) por 161 votos contra 121.",
  "kind": "parlamentario",
  "fuente": "https://blog.congreso.es/1-de-octubre-de-1931-la-sesion-en-la-que-las-mujeres-dan-el-gran-paso-hacia-la-plena-ciudadania-politica/",
  "verificar": false
 },
 {
  "id": "articulo_26",
  "date": "1931-10-13",
  "label": "Artículo 26",
  "desc": "Discurso de Azaña «España ha dejado de ser católica» y votación nominal del artículo 24 del proyecto (26 de la Constitución): 178 votos contra 59, según el Diario de la sesión del 13 de octubre.",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Cuesti%C3%B3n_religiosa_en_la_Constituci%C3%B3n_espa%C3%B1ola_de_1931 ; corpus 2REP_Diaries, sesión 55 (1931-10-13), intervención id 6994",
  "verificar": false
 },
 {
  "id": "constitucion",
  "date": "1931-12-09",
  "label": "Constitución de 1931",
  "desc": "Las Cortes Constituyentes aprueban la Constitución.",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Constituci%C3%B3n_espa%C3%B1ola_de_1931",
  "verificar": false
 },
 {
  "id": "sanjurjada",
  "date": "1932-08-10",
  "date_end": "1932-08-11",
  "label": "Sanjurjada",
  "desc": "Golpe de Estado fallido del general Sanjurjo.",
  "kind": "conflicto",
  "fuente": "https://en.wikipedia.org/wiki/Sanjurjada",
  "verificar": false
 },
 {
  "id": "estatut_reforma_agraria",
  "date": "1932-09-09",
  "label": "Estatut y Reforma Agraria",
  "desc": "Las Cortes aprueban el Estatuto de Cataluña (314 a 24) y la Ley de Bases de la Reforma Agraria (318 a 19).",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Ley_de_Reforma_Agraria_de_Espa%C3%B1a_de_1932",
  "verificar": false
 },
 {
  "id": "casas_viejas",
  "date": "1933-01-10",
  "date_end": "1933-01-12",
  "label": "Casas Viejas",
  "desc": "Insurrección anarquista y represión en Casas Viejas (Cádiz). Mes sin sesiones en el corpus.",
  "kind": "conflicto",
  "fuente": "https://en.wikipedia.org/wiki/Casas_Viejas_incident",
  "verificar": false
 },
 {
  "id": "elecciones_1933",
  "date": "1933-11-19",
  "label": "Elecciones de 1933",
  "desc": "Primera vuelta de las generales; primeras con voto de las mujeres.",
  "kind": "electoral",
  "fuente": "https://es.wikipedia.org/wiki/Elecciones_generales_de_Espa%C3%B1a_de_1933",
  "verificar": false
 },
 {
  "id": "revolucion_octubre",
  "date": "1934-10-05",
  "label": "Revolución de Octubre",
  "desc": "Huelga general revolucionaria desde el 5 de octubre, tras la entrada de tres ministros de la CEDA en el Gobierno Lerroux el día 4; insurrección en Asturias y Cataluña.",
  "kind": "conflicto",
  "fuente": "https://es.wikipedia.org/wiki/Revoluci%C3%B3n_de_1934",
  "verificar": false
 },
 {
  "id": "estraperlo",
  "date": "1935-10-28",
  "label": "Estraperlo",
  "desc": "Las Cortes votan la culpabilidad de los acusados por la comisión del estraperlo; Lerroux sale del Gobierno al día siguiente.",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Estraperlo",
  "verificar": false
 },
 {
  "id": "elecciones_1936",
  "date": "1936-02-16",
  "label": "Elecciones de 1936",
  "desc": "Elecciones generales ganadas por el Frente Popular.",
  "kind": "electoral",
  "fuente": "https://www.congreso.es/es/cem/iirep-feb-1936",
  "verificar": false
 },
 {
  "id": "destitucion_alcala_zamora",
  "date": "1936-04-07",
  "label": "Destitución de Alcalá-Zamora",
  "desc": "Las Cortes destituyen al presidente de la República por 238 votos contra 5.",
  "kind": "parlamentario",
  "fuente": "https://www.zendalibros.com/7-de-abril-de-1936-la-destitucion-de-alcala-zamora/",
  "verificar": false
 },
 {
  "id": "calvo_sotelo",
  "date": "1936-07-13",
  "label": "Asesinato de Calvo Sotelo",
  "desc": "Asesinato del líder monárquico José Calvo Sotelo en la madrugada del 13 de julio.",
  "kind": "conflicto",
  "fuente": "https://es.wikipedia.org/wiki/Asesinato_de_Calvo_Sotelo",
  "verificar": false
 },
 {
  "id": "golpe_1936",
  "date": "1936-07-17",
  "date_end": "1936-07-18",
  "label": "Golpe de Estado",
  "desc": "Sublevación militar en Melilla el 17 de julio, extendida a la Península el 18; comienza la Guerra Civil.",
  "kind": "conflicto",
  "fuente": "https://es.wikipedia.org/wiki/Golpe_de_Estado_en_Espa%C3%B1a_de_julio_de_1936",
  "verificar": false
 },
 {
  "id": "figueres",
  "date": "1939-02-01",
  "label": "Sesión de Figueres",
  "desc": "Última sesión de las Cortes en territorio español, en el castillo de San Fernando de Figueres.",
  "kind": "parlamentario",
  "fuente": "https://en.wikipedia.org/wiki/Cortes_republicanas",
  "verificar": false
 },
 {
  "id": "fin_guerra",
  "date": "1939-04-01",
  "label": "Fin de la Guerra Civil",
  "desc": "Fin de la guerra y de la Segunda República en territorio español.",
  "kind": "conflicto",
  "fuente": "https://es.wikipedia.org/wiki/Segunda_Rep%C3%BAblica_espa%C3%B1ola",
  "verificar": false
 },
 {
  "id": "mexico_enero_1945",
  "date": "1945-01-10",
  "label": "Cortes en México",
  "desc": "Primera reunión de las Cortes en el exilio, en el Club France de Ciudad de México.",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Gobierno_en_el_exilio_de_Jos%C3%A9_Giral",
  "verificar": false
 },
 {
  "id": "martinez_barrio_1945",
  "date": "1945-08-17",
  "label": "Martínez Barrio, presidente",
  "desc": "En el Salón de Cabildos de Ciudad de México, Martínez Barrio promete como presidente de la República.",
  "kind": "parlamentario",
  "fuente": "https://www.ecorepublicano.es/2023/08/promesa-diego-martinez-barrio-1945.html",
  "verificar": false
 },
 {
  "id": "gobierno_giral_1945",
  "date": "1945-11-07",
  "label": "Gobierno Giral ante las Cortes",
  "desc": "Presentación del Gobierno Giral ante las Cortes reunidas en México (7-9 de noviembre).",
  "kind": "parlamentario",
  "fuente": "https://es.wikipedia.org/wiki/Gobierno_en_el_exilio_de_Jos%C3%A9_Giral",
  "verificar": false
 }
]);
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/generated/rutas.js ===== */
// GENERADO por standalone/tools/gen_static.py a partir de app/backend/*.py. No editar a mano.
// Regenerar: /opt/anaconda3/bin/python3 standalone/tools/gen_static.py   (comprobar: --check)
// R2.gen.rutas: rutas de server.py con sus parámetros y límites.
(function (R2) {
  'use strict';
  const congelar = (o) => { if (o && typeof o === 'object') { Object.values(o).forEach(congelar); Object.freeze(o); } return o; };
  const gen = R2.gen = R2.gen || {};
  gen.rutas = congelar([
 {
  "metodo": "GET",
  "ruta": "/api/info",
  "funcion": "api_info",
  "parametros": [],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/facets",
  "funcion": "api_facets",
  "parametros": [],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/search",
  "funcion": "api_search",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": [
   {
    "clave": "limit",
    "defecto": 50,
    "min": 1,
    "max": 200
   },
   {
    "clave": "offset",
    "defecto": 0,
    "min": 0,
    "max": 10000000
   },
   {
    "clave": "climate_budget_ms",
    "defecto": 60,
    "min": 0,
    "max": 10000
   }
  ]
 },
 {
  "metodo": "POST",
  "ruta": "/api/climate",
  "funcion": "api_climate",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/stats",
  "funcion": "api_stats",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/speech/{sid}",
  "funcion": "api_speech",
  "parametros": [
   {
    "nombre": "sid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "context",
    "anotacion": "int",
    "en": "query",
    "defecto": 3,
    "ge": 0,
    "le": 50
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/session/outline/{sid}",
  "funcion": "api_session_outline",
  "parametros": [
   {
    "nombre": "sid",
    "anotacion": "int",
    "en": "ruta"
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/session/texts",
  "funcion": "api_session_texts",
  "parametros": [
   {
    "nombre": "from_id",
    "anotacion": "int",
    "en": "query"
   },
   {
    "nombre": "to_id",
    "anotacion": "int",
    "en": "query"
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/ngram",
  "funcion": "api_ngram",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/collections/{cid}/keyness",
  "funcion": "api_collection_keyness",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "min_freq",
    "anotacion": "int",
    "en": "query",
    "defecto": 5,
    "ge": 1,
    "le": 1000
   },
   {
    "nombre": "limit",
    "anotacion": "int",
    "en": "query",
    "defecto": 500,
    "ge": 1,
    "le": 20000
   },
   {
    "nombre": "limit_negative",
    "anotacion": "int",
    "en": "query",
    "defecto": 50,
    "ge": 0,
    "le": 1000
   },
   {
    "nombre": "solo_discurso",
    "anotacion": "bool",
    "en": "query",
    "defecto": true
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/careo/{sid}",
  "funcion": "api_careo",
  "parametros": [
   {
    "nombre": "sid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "mode",
    "anotacion": "str",
    "en": "query",
    "defecto": "synchronic",
    "pattern": "^(synchronic|diachronic)$"
   },
   {
    "nombre": "top",
    "anotacion": "int",
    "en": "query",
    "defecto": 5,
    "ge": 1,
    "le": 20
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/session",
  "funcion": "api_session",
  "parametros": [
   {
    "nombre": "date",
    "anotacion": "str",
    "en": "query"
   },
   {
    "nombre": "num_session",
    "anotacion": "int | None",
    "en": "query",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/collections",
  "funcion": "api_collections",
  "parametros": [],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/collections",
  "funcion": "api_collection_create",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "PATCH",
  "ruta": "/api/collections/{cid}",
  "funcion": "api_collection_update",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "DELETE",
  "ruta": "/api/collections/{cid}",
  "funcion": "api_collection_delete",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/collections/{cid}/items",
  "funcion": "api_collection_items",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "limit",
    "anotacion": "int",
    "en": "query",
    "defecto": 500,
    "ge": 1,
    "le": 5000
   },
   {
    "nombre": "offset",
    "anotacion": "int",
    "en": "query",
    "defecto": 0,
    "ge": 0
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/collections/{cid}/items",
  "funcion": "api_collection_add",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/collections/{cid}/items/remove",
  "funcion": "api_collection_remove",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "PATCH",
  "ruta": "/api/collections/{cid}/items/{sid}",
  "funcion": "api_item_update",
  "parametros": [
   {
    "nombre": "cid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "sid",
    "anotacion": "int",
    "en": "ruta"
   },
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/api/searches",
  "funcion": "api_searches",
  "parametros": [],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/searches",
  "funcion": "api_search_save",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "DELETE",
  "ruta": "/api/searches/{sid}",
  "funcion": "api_search_delete",
  "parametros": [
   {
    "nombre": "sid",
    "anotacion": "int",
    "en": "ruta"
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/export",
  "funcion": "api_export",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/export/estimate",
  "funcion": "api_export_estimate",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "POST",
  "ruta": "/api/import",
  "funcion": "api_import",
  "parametros": [
   {
    "nombre": "body",
    "anotacion": "Any",
    "en": "cuerpo",
    "defecto": null
   }
  ],
  "num_cuerpo": []
 },
 {
  "metodo": "GET",
  "ruta": "/",
  "funcion": "index",
  "parametros": [],
  "num_cuerpo": []
 }
]);
})(globalThis.R2 = globalThis.R2 || {});
/* ===== src/engine/diario.js ===== */
// 2REP_Standalone · src/engine/diario.js
//
// R2.diario: port de app/backend/diario.py (motor de texto parlamentario: párrafos §, acotaciones, oradores y clima de
// sala). Mismas reglas, mismas expresiones regulares (a través de R2.py.re, con la semántica de sre) y mismos textos.
//
//   doc = R2.diario.parse_speech(texto, speaker_raw, rep_name)
//   R2.diario.parse_speaker(raw, rep_name?)   R2.diario.classify_segment(inner)
//   R2.diario.climate(doc | texto)            R2.diario.paragraphs(doc)            R2.diario.plain_text(doc, texto)
//
// El documento es idéntico al de diario.py: json.dumps(doc, sort_keys=True, ensure_ascii=False) da el mismo sha1.
// Posiciones: índices UTF-16 (iguales a los de Python mientras no haya caracteres fuera del BMP; el corpus no tiene).
//
// Los patrones (PAT) son los de src/engine/generated/regex_manifest.json para app/backend/diario.py con sha256
// d257979420e81a398eb49f7c319735573ea661cf1592a9007fecdb33ebc79d7b (clave = nombre o función:línea del backend).
//
// Firefox (SpiderMonkey) agota la pila de retroceso con _DASH_UNIT sobre rachas de ≥ 3.000 blancos
// (R2.py.re.error con motorAgotado): en ese caso se usa un recorrido manual equivalente (_dashUnitManual).
//
// Funciones puras, sin base de datos. Dependencias (src/orden.json): R2.py.core, R2.py.re, R2.gen.constantes.diario.
(function (R2) {
  'use strict';

  const falta = [
    ['R2.py.core', R2.py && R2.py.core], ['R2.py.re', R2.py && R2.py.re],
    ['R2.gen.constantes.diario', R2.gen && R2.gen.constantes && R2.gen.constantes.diario],
  ].filter(([, m]) => !m).map(([n]) => n);
  if (falta.length) throw new Error(`engine/diario.js necesita cargados antes: ${falta.join(', ')} (src/orden.json)`);

  const C = R2.py.core;
  const RE = R2.py.re;
  const K = R2.gen.constantes.diario;

  const ENGINE_VERSION = 'diario-2';
  const NUMBERING_VERSION = '2';
  if (K.ENGINE_VERSION !== ENGINE_VERSION || K.NUMBERING_VERSION !== NUMBERING_VERSION) {
    throw new Error(`engine/diario.js (${ENGINE_VERSION}/${NUMBERING_VERSION}) no coincide con generated/constantes.js `
      + `(${K.ENGINE_VERSION}/${K.NUMBERING_VERSION}): regenerar o actualizar el port`);
  }

  const CLASS_RANK = Object.freeze({ conflict: 4, order: 3, applause: 2, neutral: 1 });
  const SPLIT_MIN_WORDS = 300;
  const CHUNK_MIN = 120, CHUNK_TARGET = 160, CHUNK_MAX = 200;
  const CHUNK_TAIL = 40;
  const _MAX_PAREN = 900;
  const _MAX_OPEN_WORDS = 30;
  const _MAX_CHAIN = 12;
  const _TERM_CHARS = '.!?…:»"”';

  const PAT = {
    "_WORD": ["\\w+", 0],
    "_LOWER_START": ["[a-záéíóúüñ]", 0],
    "_HONOR": ["^\\s*(?P<art>E[lIi1L]|Fl|En|Er\\.?|La|LA|Los|LOS|Las|Una|Un|Varios|Algunos|Muchos|Otros|Otro)\\s*(?P<tr>Srta|Sres|Sra|SR|Sr|Señorita|señorita|Señores|señores|Señora|señora|Señor|señor|SEÑOR)[.,]?\\s*", 0],
    "_ROLE_HOG": ["PRESIDEN?T\\w*\\W+DE+L?\\W+(?:CONSE[JIL1]O|GOBIERNO)", 0],
    "_ROLE_STATE": ["PRESIDENTE\\W+DE\\W+LA\\W+REPUBLICA", 0],
    "_ROLE_AGE": ["PRESIDENTE\\W+DE\\W+EDAD", 0],
    "_ROLE_CAMARA": ["PRESIDENTE\\W+DE\\W+LA\\W+CAMARA", 0],
    "_surname:L150": ["\\s[Yy]\\s", 0],
    "_surname:L168": ["^(?:(?:[Dd]e|[Dd]el|[Ll]a|[Ll]os|[Ll]as)\\s+)+", 0],
    "_parse_speaker_cached:L211": ["\\s*:\\s*$", 0],
    "_parse_speaker_cached:L220": ["^(?:Sres|Varios|Algunos|Muchos)\\b", 0],
    "_parse_speaker_cached:L227": ["\\(([^()]{1,80})\\)\\s*\\.?\\s*(.*)$", 0],
    "_parse_speaker_cached:L235": ["^([^,]+?),\\s+([a-záéíóúñ].*)$", 0],
    "_parse_speaker_cached:L239": ["^(?:D|Don|don|Doña)\\b", 0],
    "_parse_speaker_cached:L241": ["\\s+", 0],
    "_parse_speaker_cached:L244": ["[^A-Z]", 0],
    "_parse_speaker_cached:L260": ["^S\\.\\s*PRESIDENTE$", 0],
    "parse_speaker:L285": ["\\bPresident\\b", 0],
    "parse_speaker:L285#2": [",\\s+del\\b", 0],
    "parse_speaker:L286": ["\\bPRESIDENT\\b", 0],
    "parse_speaker:L292": ["^[A-ZÁÉÍÓÚÑ]", 0],
    "parse_speaker:L292#2": ["^(?:D|Don)\\b\\.?", 0],
    "_EXCL_NOTE": ["^(?:vease|veanse|vid\\.|nota\\b)|\\bapendice\\b", 0],
    "_EXCL_TEXT": ["^(?:d|don|dona|dna|sr|sra|srta|sres|excmo|ilmo)\\.?(?:\\s|$)|^(?:art|arts|articulos?|ley|leyes|decreto|real orden|r\\.\\s*o|gaceta|capitulo|titulo|seccion|base|pagina|pag|pags|num|numero|folio|tomo|libro|parrafo|apartado|inciso|anexo|estado|cuadro|grafico|provincia|capital|distrito|circunscripcion)\\b|^[\\d\\s.,;:º°ª*/\\-]+$|^[a-z]\\)?$|^(?:bis|idem|sic|id\\.)\\b", 0],
    "_UNIT_SEP": ["(?<=[.!?…»\\\"”)])\\s*[—–]+\\s*|\\s+[—–]+\\s+|(?<=\\w)[—–]{1,2}(?=\\s*(?:El|La|Los|Un|Una|Varios|Algunos|Muchos|Otro|Otros|Grandes|Fuertes|Nuevos|Nuevas|Rumores|Risas|Aplausos|Protestas|Muy)\\b)|\\.-\\s*|(?<=[.!?])\\s+(?=(?:El|La|Los|Un|Una|Varios|Algunos|Muchos|Otro|Otros)\\s+(?:Sr|Sra|Srta|Sres|señor|señora|señores|Diputados?)\\b)", 0],
    "_INTERJ": ["^(?P<who>(?:(?:el|la|los|las|un|una|unos|varios|algunos|muchos|otro|otros|el mismo|la misma|diversos|numerosos)\\s+(?:sr|sra|srta|sres|senor|senora|senorita|senores|diputados?|ministros?|presidente|secretario)\\b\\.?|voces|una voz|varias voces|otra voz|el presidente|la presidencia)[^:()]{0,90}?)\\s*:\\s*(?P<say>\\S.*)$", 16],
    "_WHO_CHAIR": ["\\bpresiden(?:te|cia)\\b(?!\\W+(?:del?\\W+)?(?:consejo|gobierno))", 0],
    "_SAY_BRAVO": ["^[¡!\\s\\\"]*(?:muy bien|bravo)\\b", 0],
    "_CHAIR_SUBJ": ["\\b(?:presidente|presidencia|mesa)\\b(?!\\W+(?:del?\\W+)?(?:consejo|gobierno))", 0],
    "_CHAIR_ACT": ["\\b(?:agita|agitando|reclama|reclamando|llama|llamando|impone|imponiendo|ruega|rogando|pide silencio|restablece|toca|tocando|hace sonar|haciendo sonar|requiere|amonesta|apercibe)\\b|campanill", 0],
    "_CAMPANILLA": ["campanill", 0],
    "_APPROVAL": ["\\b(?:rumores?|voces|murmullos?|muestras|manifestaciones|signos|senales|grandes|generales?)\\s+(?:\\w+\\s+)?de\\s+aprobacion|^aprobacion(?:es)?\\b|\\baprobacion(?:es)? (?:en|de)\\b", 0],
    "_TUMULT": ["rumor|protest|interrump|interrup|no se (?:perciben?|oyen?|entienden?|oia|percibian|entendian)|increp|murmull|tumult|alborot|escandalo|siseo|gritos|\\bvoces\\b|exclamacion|contradictori|encontrados|imprecacion|golpes|patea|confusion|agitacion|denuesto|apostrof|desorden|griteria|abucheo|silbidos|se increpan|vociferan|increpan|dicterios|pugilato|incidente|muy mal\\b", 0],
    "_LAUGH": ["\\brisa|\\bsonrisa|hilaridad|carcajada", 0],
    "_OVATION": ["aplau|apiaus|apluo|ovaci|muy bien|\\bbravo|\\bvivas?\\b|vitore|felicitacion|enhorabuena|palmas", 0],
    "_GESTURE": ["asentimiento|a ?i?firmacion|airmacion|negacion|sensacion|\\bpausa\\b|senalando|senala\\b|dirigiendose|se dirige|piden? la palabra|pidiendo la palabra|signos?\\b|\\bgestos?\\b|ademan|leyendo|\\bleyo\\b|\\blee\\b|ocupa(?:ndo)? la presidencia|ocupo la presidencia|entra(?:ndo)? en el salon|entra en la camara|sale(?:n)? del salon|abandona|se (?:levanta|levantan|sienta|sientan|retira|retiran)|mostrando|golpeando|exhibiendo|volviendose|en voz baja|con energia|conversacion|silencio|expectacion|atencion|suficiente numero|asi se hace|aludiendo|refiriendose|continua (?:leyendo|hablando)|sonriendo|riendo|extendiendo|levantando|agitando|en pie|de pie|niega|negando|asintiendo|afirmando|interrumpe|hace uso de la palabra|con el brazo|con la mano|emocion|apostrofando", 0],
    "_classify_unit:L431": ["[^\\W\\d_]", 0],
    "_classify_unit:L435": ["(?:consejo|gobierno)", 0],
    "_UNIT_HINT": ["[—–]|\\.-|[.!?]\\s+[ELUVAMO]", 0],
    "classify_segment:L502": ["[¡¿\\\"]?[A-ZÁÉÍÓÚÑ]", 0],
    "_PP_SEP": ["[ \\t\\r]*\\n[ \\t\\r]*\\n\\s*", 0],
    "_HDR_ONLY": ["\\\"?(?:N[ÚU]MERO\\s+\\d{1,3}(?:\\s+\\d{2,5})?|(?:\\d{1,5}\\)?\\s+)?\\d{1,2}\\s+DE\\s+(?:ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|SETIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)\\s+DE\\s+19\\d\\d|\\d{3,5}(?:\\s*—)?)\\s*$", 0],
    "_HDR_PREFIX": ["\\\"?(?:N[ÚU]MERO\\s+\\d{1,3}\\s+\\d{2,5}\\s+|(?:\\d{1,5}\\)?\\s+)?\\d{1,2}\\s+DE\\s+(?:ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|SETIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)\\s+DE\\s+19\\d\\d\\s+(?=[a-záéíóúñ]))", 0],
    "_HDR_DATE": ["\\d{1,2}\\s+DE\\s+(?:ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|SETIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)\\s+DE\\s+19\\d\\d", 0],
    "_LEAD_SPEAKER": ["^\\s*\\(([^()\\n]{1,40})\\)\\s*:\\s*", 0],
    "_HYPH_END": ["([^\\W\\d_]+)([\\-\\xad]+)$", 0],
    "_NEXT_TOKEN": ["(?:[¡!:<|]\\s?|\\d\\s)?([^\\W\\d_]+)", 0],
    "_SOFT": ["­+", 0],
    "_BRACKET": ["(?<![\\\\\\w$])([\\[{])(?=[^\\W\\d_])", 0],
    "_join_fix:L612": ["[a-záéíóúñ,;]$", 0],
    "_join_fix:L617": ["\\s\\d{4,5}$", 0],
    "_DASH_AFTER": ["\\s*[—–]+\\s*(?=[A-ZÁÉÍÓÚÑ¡¿])", 0],
    "_DASH_UNIT": ["[^—–()\\n]{1,120}?(?:[.!?…]|(?=\\s*[—–)]))", 0],
    "_match_parens:L770": ["[()]", 0],
    "_match_parens:L778": ["(?:^|[\\s(—])(?:[a-zA-Z]|\\d{1,2})$", 0],
    "_LOOSE_SEP": ["(?:(?<=[.!?…])\\s*[—–]+\\s*|\\s+[—–]+\\s+)", 0],
    "_CHRON_START": ["\\\"?(?:Se (?:ley[óo]|leyeron|di[óo] (?:lectura|cuenta)|aprob[óo]|aprobaron|procedi[óo]|anunci[óo]|acord[óo]|entr[óo]|pas[óo] a|tom[óo]|levant[óo]|suspendi[óo]|reanud[óo]|verific[óo]|dieron|expres[óo])|Verificad[oa]s?\\b|Eran las\\b|Era la una\\b|Le[íi]d[oa]s?\\b|Hecha la (?:pregunta|oportuna|aportuna|correspondiente|propuesta|petici[óo]n|consignaci[óo]n|aclaraci[óo]n|votaci[óo]n|declaraci[óo]n)\\b|Hecho (?:as[íi]|el (?:recuento|traspaso|extracto))\\b|Sin (?:m[áa]s )?(?:discusi[óo]n|debate)|Tambi[ée]n (?:se (?:ley|anunci|di[óo]\\b|dio\\b|acord|aprob|tom[óo]|concedi|comunic|pas[óo]|levant|suspendi|remiti)|fu[ée] |fueron |qued)|Asimismo (?:se (?:ley|anunci|di[óo]\\b|dio\\b|acord|aprob|tom[óo]|concedi|comunic|pas[óo]|remiti)|fu[ée] |fueron |qued)|Previa (?:la |el )?(?:venia|lectura|autorizaci[óo]n|declaraci[óo]n|correspondiente|oportuna|pregunta|votaci[óo]n)|Continuando (?:la|el) (?:discusi[óo]n|debate|interpelaci[óo]n|deliberaci[óo]n|votaci[óo]n|lectura)\\b|Reanudad[ao]|Abierta (?:la )?discusi[óo]n|Acto seguido|Qued(?:[óo]|aron) (?:aprobad|pendiente|sobre la mesa|enterad|acordad|desechad|retirad|redactad|en suspenso|admitid|tomad|nombrad|elegid|proclamad)|Las Cortes (?:quedaron|acordaron|aprobaron)|La C[áa]mara (?:acord[óo]|qued[óo]|aprob[óo])|Fu(?:[ée]|eron) (?:aprobad|tomad|desechad|le[íi]d|retirad|rechazad|admitid|proclamad|elegid)|Puest[oa]s? a votaci[óo]n|Tomad[oa] en consideraci[óo]n|Por el (?:Sr\\.|señor) Secretario|El (?:Sr\\.|señor) (?:SECRETARIO|Secretario)(?: \\([^)]{0,60}\\))?,? (?:di[óo]|ley[óo]|lee|anunci[óo]|hizo|dijo así)|Dada cuenta|Concedida la palabra|Ocup[óo] la Presidencia|Orden del d[íi]a para|ORDEN DEL D[IÍ]A|Palacio de las Cortes|Palacio del Congreso|Terminad[ao] la (?:votaci|lectura)|Efectuad[ao] la|Practicad[ao] la|Retirad[ao] (?:la|el|por)|Desechad[ao] (?:la|el)|Aprobad[oa]s? (?:sin|el|la|los|las|definitivamente)|Hecho el escrutinio)", 0],
    "_CHRON_END": ["(?:,|\\)|\\bdij[oe])\\s*dijo\\s*:?\\s*$|\\bdijo\\s*:\\s*$|,\\s*dijo\\s*$", 0],
    "_HEADING": ["^[^a-záéíóúñ]{3,160}$", 0],
    "_TURN": ["(?P<who>(?:El|La|Los|Un|Una|Varios|Algunos|Muchos|Otro)\\s+(?:Sr|Sra|Srta|Sres|señor|señora|señorita|señores)[.,]?\\s+(?:[A-ZÁÉÍÓÚÑ][\\w'´’\\-]*\\.?)(?:\\s+(?:[A-ZÁÉÍÓÚÑ][\\w'´’\\-]*\\.?|de|del|la|las|los|y|e|i|pública|públicas|sin))*(?:\\s+de\\s+la\\s+(?:minoría|mayoría|Comisión)(?:\\s+[a-záéíóúñ]+)?)?(?:\\s*\\([^()]{1,40}\\))?)\\s*:\\s+(?=\\S)", 0],
    "_VOTE_HEAD": ["^Se(?:ñ|n|fi)ores que (?:dijeron|han dicho|votaron|contestaron)\\b", 0],
    "_TOTAL": ["^Total(?:es)?\\s*[,:.]?\\s*\\d[\\d.]*\\s*\\.?\\s*$", 0],
    "_NUM_DEP": ["^N[úu]mero\\s+\\d+\\s*\\.?\\s*[—–\\-]+\\s*D", 0],
    "_DEP": ["^D(?:\\.|oña|\\.ª)\\s+[A-ZÁÉÍÓÚÑ]", 0],
    "_NAME_ITEM": ["^(?:(?:[A-ZÁÉÍÓÚÑ][\\w'´’\\-]*\\.?|de|del|la|las|los|y|i|e|d'|D')(?:\\s*,\\s*|\\s+|$))+(?:\\((?:D|Don|Doña|Sra|Srta)\\.?[^()]{0,30}\\))?\\s*\\.?\\s*$", 0],
    "_NOTE_PARA": ["^(?:\\(\\s*V[ée]ase\\b[^()]*\\)\\.?|Nota\\s*[.:—–])", 0],
    "_SIGNATURE": ["\\\"?Palacio (?:de las Cortes|del Congreso)", 0],
    "_READ_DOC": ["[\\\"“«]?\\s*(?:Excm[oa]s?\\.?\\s+(?:Sres?\\.|Señor)|Ilm[oa]s?\\.?\\s+Sr\\.|A la Mesa del Congreso|A las Cortes(?: Constituyentes)?\\s*[:.—]|Al Congreso\\s*[:.—]|A la C[áa]mara\\s*[:.—]|Al (?:Excmo\\.?\\s+)?(?:Sr\\.|señor) (?:Ministro|Presidente|Director|Subsecretario|Gobernador)|Sr\\. Presidente\\s*:|Señor (?:D\\.|Don) [^:]{3,60}:|Muy señor|Distinguid[oa]s? señor|El Diputado que (?:sus?cribe|firma)|Los Diputados que (?:sus?criben|firman))", 0],
    "_ANNEX": ["(?i)(?:datos|documentos?|cuadros?|estados?|notas?|relaci[óo]n|textos?|cartas?)\\b[^.:]{0,60}?\\ba que (?:se )?(?:ha|han) (?:hecho )?referi\\w*(?:(?!\\b(?:es|son|no|fue|fué|fueron|era|eran|está|están|parece|parecen|resulta|resultan|dice|dicen)\\b)[^;:?!]){0,90}[.:]?\\s*$", 0],
    "_FIRST_PERSON_DOC": ["(?i)ruegos?\\b|preguntas?\\b|cartas?\\b|comunicaci|telegram|escritos?\\b|exposici|instancias?\\b|moci[óo]n|mensajes?\\b|proposici|enmiendas?\\b|votos? particular|documentos?\\b|oficios?\\b|declaraci|manifiesto|dice as[íi]|lo siguiente|referencia", 0],
    "_VOCATIVE": ["(?:^|[,;:.!?]\\s*)(?:[Ss]eñores|Sres\\.)\\s+Diputados\\s*[,:;.!]", 0],
    "_ABS_START": ["\\\"?(?:No (?:habiendo|hall[áa]ndose)|Habiendo|Previo|Concedid[ao]s?|Terminad[ao]s?|Puest[ao]s?|Abiert[ao]|Anunciad[ao]|Suspendid[ao]|Reanudad[ao]|Tomad[ao]s?|Pedid[ao]|Solicitad[ao]|Admitid[ao]s?|Desechad[ao]s?|Rechazad[ao]s?|Seguidamente|A continuaci[óo]n|Acto continuo|Igualmente (?:se|fu[ée]|fueron|qued))\\b", 0],
    "_PROC_NOUN": ["\\b(?:votaci[óo]n|enmiendas?|dictamen|proposici[óo]n|art[íi]culo|art\\.|sesi[óo]n|acta|C[áa]mara|Congreso|Presidencia|Secretar[ií]o|voto particular|Comisi[óo]n|Diario de Sesiones|la palabra|Mesa)\\b", 0],
    "_SPEECH_MARK": ["\\b(?:yo|me|m[ií]|conmigo|nos|nosotr[oa]s|os|vosotr[oa]s|creo|digo|voy|vamos|quiero|queremos|tengo|tenemos|puedo|podemos|debo|debemos|estoy|estamos|soy|somos|he|hemos|pido|pedimos|entiendo|estimo|insisto|supongo|reconozco|agradezco|permitidme|perdonadme)\\b|\\bSS?\\.\\s?SS?\\.|\\b[Ss]us? [Ss]eñor[ií]as?\\b|[¿¡]|(?:^|[,;:.]\\s*)(?:[Ss]eñores|Sres\\.)\\s+Diputados\\s*[,:;!]|,\\s*señores\\s*[,;.!]|\\b[a-záéíóúñ]{2,}(?:áis|éis)\\b", 0],
    "_PRET1": ["\\b[a-záéíóúñ]{2,}é\\b", 0],
    "_PL1": ["\\b[a-zñ]{2,}(?:amos|emos|imos)\\b", 0],
    "_PAREN_TXT": ["\\([^()]*\\)", 0],
    "_QUOTED_TXT": ["\\\"[^\\\"\\n]{1,400}\\\"|“[^”\\n]{1,400}”|«[^»\\n]{1,400}»", 0],
    "_ACTA_VERB": ["\\b(?:qued[óo]|quedaron|fu[ée]|fueron|acord[óo]|acordaron|aprob[óo]|aprobaron|ley[óo]|leyeron|di[óo]|dieron|pasó|pasaron|resultó|anunció|procedió|levantó|suspendió|tomó|concedió|retiró|desechó|declaró|pidió|verificó|hizo|subió|ocupó|designó|nombró|eligió|contestó|entró|reanudó|abrió|terminó|habló|intervino|rectificó)\\b", 0],
    "_LEADERS": ["(?<!\\.)\\.{4,}\\s*[\\d\\\"”]", 0],
    "_tableish:L1132": ["\\d[\\d.,]*", 0],
    "_tableish:L1134": ["[^\\W\\d_]{3,}", 0],
    "_NEXT_CAP": ["\\s*[A-ZÁÉÍÓÚÑ¿¡\\\"«“—(]", 0],
    "_OCR_HYPH": ["[a-záéíóúñ]-[ ][a-záéíóúñ]{2,}", 0],
    "_PUNCT_ONLY": ["[\\s.,;:\\\"”»]*", 0],
    "_HAS_WORD": ["[^\\W_]", 0],
    "_SENT_END": ["[.!?…][\\\"”»)]?\\s+(?=[¿¡\\\"«“(]?[A-ZÁÉÍÓÚÑ])", 0],
    "_quote_events:L1156": ["[\\\"“”«»]", 0],
    "_is_heading:L1172": ["[A-ZÁÉÍÓÚÑ]{3}", 0],
    "_type_paragraphs:L1279": ["[.!?]\\s*[—–]", 0],
    "_sentence_bounds:L1458": ["(\\w+)$", 0],
    "_sentence_bounds:L1464": ["[º°ª]", 0],
  };
  const _compilados = new Map();
  /** Patrón compilado (una vez) por su clave del manifiesto. */
  function r(id) {
    let p = _compilados.get(id);
    if (!p) {
      const def = PAT[id];
      if (!def) throw new Error(`engine/diario.js: patrón desconocido ${id}`);
      p = RE.compile(def[0], def[1]);
      _compilados.set(id, p);
    }
    return p;
  }

  const _JOIN_STOP = new Set(K._JOIN_STOP);
  const _PRET1_STOP = new Set(K._PRET1_STOP);
  const _PL1_STOP = new Set(K._PL1_STOP);
  const _ABBR = new Set(K._ABBR);
  const _CHAIR_NAMES = K._CHAIR_NAMES;
  const _ROLE_TITLE = { chair: 'PRESIDENTE', vicechair: 'VICEPRESIDENTE', chair_age: 'PRESIDENTE DE EDAD', secretary: 'SECRETARIO' };
  // Filas que no son de nadie: el sumario de la sesion y el material que el Diario
  // imprime dentro del acta (2REP_Diaries_v3). No llevan tratamiento.
  const _FILAS_DOC = { SUMARIO: 'summary', COMENTARIOS: 'remark' };
  const _DOC_LABEL = { summary: 'Sumario de la sesión', remark: 'Comentarios del Diario' };
  const _LABELS_TUMULT = [['protest', 'Protestas'], ['interrup', 'Interrupciones'], ['interrump', 'Interrupciones'],
    ['no se', 'Voces'], ['increp', 'Protestas'], ['rumor', 'Rumores'], ['murmull', 'Rumores']];
  const _LABELS_GESTURE = [['asentimiento', 'Asentimiento'], ['firmacion', 'Asentimiento'],
    ['denegacion', 'Denegaciones'], ['pausa', 'Pausa'], ['palabra', 'Piden la palabra']];

  // --------------------------------------------------------------------------------------------------------------
  // Utilidades
  // --------------------------------------------------------------------------------------------------------------
  const _FOLD_DE = 'áéíóúüàèìòùâêîôûäëïöÁÉÍÓÚÜÀÈÌÒÙÂÊÎÔÛÄËÏÖñÑçÇ';
  const _FOLD_A = 'aeiouuaeiouaeiouaeioAEIOUUAEIOUAEIOUAEIOnNcC';
  const _FOLD_MAPA = new Map();
  for (let i = 0; i < _FOLD_DE.length; i++) _FOLD_MAPA.set(_FOLD_DE[i], _FOLD_A[i]);
  const _FOLD_RX = new RegExp(`[${_FOLD_DE}]`, 'g');

  /** Minúsculas sin tildes, con la misma longitud que el original. */
  function _fold(s) {
    s = s || '';
    return C.lower(s.replace(_FOLD_RX, (c) => _FOLD_MAPA.get(c)));
  }

  const _nwords = (s) => r('_WORD').findall(s).length;
  const _esp = (ch) => ch !== undefined && ch !== '' && C.cp.isspace(ch.charCodeAt(0));

  function _rstrip_end(text, lo, e) {
    while (e > lo && C.cp.isspace(text.charCodeAt(e - 1))) e--;
    return e;
  }

  /** [a + blancos iniciales, a + len(seg.rstrip())] de text[a:b], o null si el tramo es blanco. */
  function _recorte(text, a, b) {
    let x = a, y = b;
    while (x < b && C.cp.isspace(text.charCodeAt(x))) x++;
    while (y > a && C.cp.isspace(text.charCodeAt(y - 1))) y--;
    return y > x ? [x, y] : null;
  }

  function _bisectLeft(arr, x) {
    let lo = 0, hi = arr.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] < x) lo = m + 1; else hi = m; }
    return lo;
  }
  function _bisectRight(arr, x) {
    let lo = 0, hi = arr.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (x < arr[m]) hi = m; else lo = m + 1; }
    return lo;
  }

  /** max(clases, key=CLASS_RANK): la primera de rango máximo. */
  function _maxClase(clases) {
    let mejor;
    let rango = -Infinity;
    for (const c of clases) if (CLASS_RANK[c] > rango) { mejor = c; rango = CLASS_RANK[c]; }
    if (mejor === undefined) throw new C.PyError('ValueError', 'max() arg is an empty sequence');
    return mejor;
  }

  /** list.sort() de las correcciones [a, b, reemplazo, tipo]. */
  function _cmpFix(x, y) {
    for (let i = 0; i < 4; i++) {
      const a = x[i], b = y[i];
      if (a === b) continue;
      return a < b ? -1 : 1;
    }
    return 0;
  }
  const _sortFixes = (fixes) => fixes.sort(_cmpFix);

  function _lev_le(a, b, k) {
    if (Math.abs(a.length - b.length) > k) return false;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = new Array(b.length + 1).fill(0);
      cur[0] = i;
      let best = cur[0];
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0));
        best = Math.min(best, cur[j]);
      }
      if (best > k) return false;
      prev = cur;
    }
    return prev[prev.length - 1] <= k;
  }

  // --------------------------------------------------------------------------------------------------------------
  // P6 · Orador
  // --------------------------------------------------------------------------------------------------------------
  function _honor_norm(art, tr) {
    const t = _fold(tr);
    const a = _fold(art);
    if (['un', 'una', 'otro', 'varios', 'algunos', 'muchos', 'otros'].includes(a)) {
      const plural = ['varios', 'algunos', 'muchos', 'otros'].includes(a);
      return [`${C.capitalize(art)} ${plural ? 'señores' : (a === 'una' ? 'señora' : 'señor')}`, plural];
    }
    if (t === 'srta' || t === 'senorita') return ['La señorita', false];
    if (t === 'sra' || t === 'senora') return ['La señora', false];
    if (t === 'sres' || t === 'senores') return ['Los señores', true];
    return ['El señor', false];
  }

  const _PARTICULAS = ['de', 'del', 'la', 'las', 'los'];

  function _surname(rep_name) {
    if (!rep_name || _fold(rep_name).startsWith('sin identificar')) return null;
    const name = C.strip(rep_name);
    const m = r('_surname:L150').search(name);
    let s;
    if (m) {
      const toks = C.split(name.slice(0, m.start()));
      while (toks.length >= 2 && _PARTICULAS.includes(_fold(toks[toks.length - 2]))) {
        const unido = toks[toks.length - 2] + ' ' + toks[toks.length - 1];
        toks.splice(toks.length - 2, 2, unido);
      }
      s = toks.length >= 2 ? toks[toks.length - 1] : null;
    } else {
      const toks = [];
      for (const t of C.split(name)) {
        if (toks.length && _PARTICULAS.includes(_fold(toks[toks.length - 1]))) toks[toks.length - 1] = toks[toks.length - 1] + ' ' + t;
        else toks.push(t);
      }
      s = toks.length >= 3 ? toks[toks.length - 2] : (toks.length === 2 ? toks[toks.length - 1] : null);
    }
    if (!s) return null;
    s = r('_surname:L168').sub('', s);
    return C.upper(s.slice(0, 1)) + s.slice(1);
  }

  function _chair_name(rep_name) {
    const key = C.split(_fold(rep_name || '')).join(' ');
    const v = Object.prototype.hasOwnProperty.call(_CHAIR_NAMES, key) ? _CHAIR_NAMES[key] : null;
    return v || _surname(rep_name);
  }

  const _CACHE_ORADOR = new Map();
  function _parse_speaker_cached(raw) {
    const guardado = _CACHE_ORADOR.get(raw);
    if (guardado) return guardado;
    let s = C.strip(raw || '');
    s = r('_parse_speaker_cached:L211').sub('', s);
    let honor = 'El señor', group = false, body;
    const m = r('_HONOR').match(s);
    if (m) {
      [honor, group] = _honor_norm(m.group('art'), m.group('tr'));
      body = s.slice(m.end());
    } else {
      body = s;
    }
    body = C.strip(body);
    if (r('_parse_speaker_cached:L220').match(s)) group = true;

    let qual = null;
    let note = null;
    const pm = r('_parse_speaker_cached:L227').search(body);
    if (pm) {
      qual = C.rstrip(C.strip(pm.group(1)), '.');
      const rest = C.strip(pm.group(2));
      if (rest) note = rest;
      body = C.strip(body.slice(0, pm.start()));
    }
    const cm = r('_parse_speaker_cached:L235').match(body);
    let acot = null;
    if (cm && !r('_ROLE_HOG').search(C.upper(_fold(body)))) {
      body = C.strip(cm.group(1));
      acot = C.strip(cm.group(2));
    }
    if (qual && classify_segment(qual) !== null && !r('_parse_speaker_cached:L239').match(qual)) {
      acot = qual;
      qual = null;
    }
    body = C.strip(r('_parse_speaker_cached:L241').sub(' ', body));

    const up = C.upper(_fold(body));
    if (Object.prototype.hasOwnProperty.call(_FILAS_DOC, C.upper(s))) {
      const res0 = Object.freeze([s, '', C.upper(s), null, null, null, _FILAS_DOC[C.upper(s)], false]);
      if (_CACHE_ORADOR.size >= 8192) _CACHE_ORADOR.clear();
      _CACHE_ORADOR.set(raw, res0);
      return res0;
    }
    const first = up ? r('_parse_speaker_cached:L244').sub('', up.split(' ')[0]) : '';
    let role;
    if (r('_ROLE_HOG').search(up)) role = 'head_of_government';
    else if (r('_ROLE_STATE').search(up)) role = 'head_of_state';
    else if (r('_ROLE_AGE').search(up)) role = 'chair_age';
    else if (up.includes('MINISTRO')) role = 'minister';
    else if (first.startsWith('SECRETAR') || (first.length >= 7 && first.length <= 12 && _lev_le(first, 'SECRETARIO', 2))) role = 'secretary';
    else if (first.includes('VICE') || (first.length >= 12 && first.endsWith('PRESIDENTE'))
      || (first.length >= 11 && first.length <= 16 && _lev_le(first, 'VICEPRESIDENTE', 2))) role = 'vicechair';
    else if (first === 'PRESIDENTE' || r('_ROLE_CAMARA').search(up)
      || (first.length >= 7 && first.length <= 12 && _lev_le(first, 'PRESIDENTE', 2))
      || r('_parse_speaker_cached:L260').match(up)) role = 'chair';
    else role = 'deputy';
    const res = Object.freeze([s, honor, body, qual, acot, note, role, group]);
    if (_CACHE_ORADOR.size >= 8192) _CACHE_ORADOR.clear();
    _CACHE_ORADOR.set(raw, res);
    return res;
  }

  /**
   * Normaliza la etiqueta de orador del Diario y deduce su papel: chair, vicechair, chair_age (Presidencia), secretary,
   * head_of_government (nunca Presidencia de la Cámara), head_of_state, minister y deputy.
   */
  function parse_speaker(raw, rep_name = null) {
    const [, honor, body0, qual, acot, note, role, group] = _parse_speaker_cached(raw || '');
    if (Object.prototype.hasOwnProperty.call(_DOC_LABEL, role)) {
      const etiqueta = _DOC_LABEL[role];
      return { raw: raw || '', honor: '', body: body0, qual: null, acot: null, note: null,
        role, is_chair: false, group: false, name: null, title: etiqueta, label: etiqueta };
    }
    let body = body0;
    const is_chair = role === 'chair' || role === 'vicechair' || role === 'chair_age';
    if (Object.prototype.hasOwnProperty.call(_ROLE_TITLE, role)) {
      body = _ROLE_TITLE[role];
    } else if (role === 'head_of_government') {
      body = r('parse_speaker:L285').sub('Presidente', r('parse_speaker:L285#2').sub(' del', body));
      body = r('parse_speaker:L286').sub('PRESIDENTE', body);
    }
    let title = body ? C.strip(`${honor} ${body}`) : honor;
    if (qual && !is_chair) title += ` (${qual})`;
    let name = null;
    let label;
    if (is_chair) {
      if (qual && r('parse_speaker:L292').match(qual) && !r('parse_speaker:L292#2').match(qual)) name = qual;
      else name = _chair_name(rep_name);
      label = name ? `Presidencia (${name})` : 'Presidencia';
    } else {
      label = title;
    }
    return {
      raw: raw || '', honor, body, qual, acot, note, role, is_chair,
      group, name, title, label,
    };
  }

  // --------------------------------------------------------------------------------------------------------------
  // P4 · Clasificación de acotaciones
  // --------------------------------------------------------------------------------------------------------------
  function _label_for(kind, f) {
    if (kind === 'interj') return 'Interjecciones';
    if (kind === 'chair') return 'Presidencia';
    if (kind === 'approval') return 'Aprobación';
    if (kind === 'laughter') return 'Risas';
    if (kind === 'ovation') return 'Aplausos';
    if (kind === 'tumult') {
      for (const [stem, lab] of _LABELS_TUMULT) if (f.includes(stem)) return lab;
      return 'Rumores';
    }
    for (const [stem, lab] of _LABELS_GESTURE) if (f.includes(stem)) return lab;
    return 'Gestos';
  }

  /** Clasifica una unidad de acotación. Primera coincidencia gana. */
  function _classify_unit(u) {
    const s = C.strip(C.strip(C.strip(u), '()'));
    if (!s) return null;
    const f = _fold(s);
    const m = r('_INTERJ').match(f);
    if (m) {
      const who = C.strip(s.slice(0, m.group('who').length));
      const say = C.strip(s.slice(m.start('say')));
      let c;
      if (r('_WHO_CHAIR').search(_fold(who))) c = 'order';
      else if (r('_SAY_BRAVO').match(_fold(say))) c = 'applause';
      else c = 'neutral';
      const lab = c === 'order' ? 'Presidencia' : 'Interjecciones';
      return { c, k: 'interj', lab, who };
    }
    const first = r('_classify_unit:L431').search(s);
    if (!first || C.islower(first.group(0)) || _nwords(s) > 40) return null;
    if ((r('_CHAIR_SUBJ').search(f) && r('_CHAIR_ACT').search(f))
      || (r('_CAMPANILLA').search(f) && !r('_classify_unit:L435').search(f))) {
      return { c: 'order', k: 'chair', lab: 'Presidencia' };
    }
    if (r('_APPROVAL').search(f)) return { c: 'applause', k: 'approval', lab: 'Aprobación' };
    if (r('_TUMULT').search(f)) return { c: 'conflict', k: 'tumult', lab: _label_for('tumult', f) };
    if (r('_LAUGH').search(f)) return { c: 'neutral', k: 'laughter', lab: 'Risas' };
    if (r('_OVATION').search(f)) return { c: 'applause', k: 'ovation', lab: 'Aplausos' };
    if (r('_GESTURE').search(f)) return { c: 'neutral', k: 'gesture', lab: _label_for('gesture', f) };
    return null;
  }

  function _unit_spans(inner) {
    if (!r('_UNIT_HINT').search(inner)) {
      const la = inner.length - C.lstrip(inner).length;
      const lb = C.rstrip(inner).length;
      return lb > la ? [[la, lb]] : [];
    }
    const spans = [];
    let pos = 0;
    for (const m of r('_UNIT_SEP').finditer(inner)) {
      const ms = m.start();
      if (ms > pos) spans.push([pos, ms]);
      pos = m.end();
    }
    if (pos < inner.length) spans.push([pos, inner.length]);
    const out = [];
    for (const [a, b] of spans) {
      const rc = _recorte(inner, a, b);
      if (rc) out.push(rc);
    }
    return out;
  }

  /**
   * ¿Es el contenido de un paréntesis una acotación? null si es texto; {c, note, u} con desplazamientos relativos a
   * `inner`; una nota de apéndice da {c: null, note: true, u: []}.
   */
  function classify_segment(inner) {
    const s = inner || '';
    const st = C.strip(s);
    if (!st) return null;
    const f = _fold(st);
    if (r('_EXCL_NOTE').search(f)) return { c: null, note: true, u: [] };
    if (r('_EXCL_TEXT').search(f)) return null;
    const units = [];
    let known = 0;
    const spans = _unit_spans(s);
    for (let i = 0; i < spans.length; i++) {
      const [a, b] = spans[i];
      const res = _classify_unit(s.slice(a, b));
      if (res === null) {
        // Una unidad sin clasificar solo se admite detrás de otra que sí lo está: "(Rumores.—Continúa el orador.)".
        if (i === 0 && (spans.length === 1 || _nwords(s.slice(a, b)) > 4
          || !r('classify_segment:L502').match(s.slice(a, b)))) return null;
        units.push({ a, b, c: null, k: 'other', lab: null });
        continue;
      }
      known += 1;
      res.a = a;
      res.b = b;
      units.push(res);
    }
    if (!known || known * 2 < units.length) return null;
    const c = _maxClase(units.filter((u) => u.c).map((u) => u.c));
    return { c, note: false, u: units };
  }

  // --------------------------------------------------------------------------------------------------------------
  // P0 · Normalización y P1 · unión de párrafos partidos
  // --------------------------------------------------------------------------------------------------------------
  function _raw_spans(text, start) {
    const out = [];
    let pos = start;
    for (const m of r('_PP_SEP').finditer(text, start)) {
      const ms = m.start();
      if (ms > pos) out.push([pos, ms]);
      pos = m.end();
    }
    if (pos < text.length) out.push([pos, text.length]);
    const res = [];
    for (const [a, b] of out) {
      const rc = _recorte(text, a, b);
      if (rc) res.push(rc);
    }
    return res;
  }

  function _last_unclosed(text, a, b) {
    const stack = [];
    for (let i = a; i < b; i++) {
      const ch = text[i];
      if (ch === '(') stack.push(i);
      else if (ch === ')' && stack.length) stack.pop();
    }
    return stack.length ? stack[stack.length - 1] : -1;
  }

  /** ¿Continúa el párrafo `nxt` a `cur` (P0/P1)? Corrección [a, b, reemplazo, tipo] o null. */
  function _join_fix(text, cur, hdrs, nxt, hdr_end) {
    const [pa, pb] = cur;
    const [na, nb] = nxt;
    const ns = hdr_end;
    const prev_tail = text.slice(Math.max(pa, pb - 60), pb);
    const has_hdr = hdrs.length > 0 || hdr_end > na;

    // Guion de fin de línea: "pro-\n\nvincia", "re-\n\nNUMERO 79 2603 sulta".
    const hm = r('_HYPH_END').search(prev_tail);
    if (hm) {
      const hstart = pb - hm.group(2).length;
      const frag = hm.group(1);
      let tm = r('_NEXT_TOKEN').match(text, ns, nb);
      let tk, ts, te;
      if (tm) {
        tk = tm.group(1);
        ts = tm.start(1);
        te = tm.end(1);
        // Solo se admite basura de OCR delante si no hay cabecera.
        if (ts > ns && has_hdr) tm = null;
      }
      if (tm) {
        if (C.islower(tk[0])) return [hstart, ts, '', 'hyphen'];
        if (tk.length > 1 && ((tk[0] === 'I' && 'luoaeó'.includes(tk[1]))
          || (tk[0] === 'J' && 'aeiouó'.includes(tk[1]) && C.islower(frag)))) {
          // I o J por l: "So-\n\nIórzano", "invo-\n\nIuntario", "va-\n\nJor".
          return [hstart, te, 'l' + C.lower(tk.slice(1)), 'hyphen'];
        }
        if (C.isupper(frag[0]) && C.isupper(tk[0]) && tk.length > 4 && !C.isupper(tk)
          && !r('_CHRON_START').match(text, ts)) {
          // Apellido compuesto: "Gil-\n\nRobles" -> "Gil-Robles".
          return [pb, ts, '', 'hyphen'];
        }
        if (C.isupper(frag) && C.isupper(tk)) return [hstart, ts, '', 'hyphen'];
        if (C.isupper(tk[0]) && tk.length <= 4 && !_JOIN_STOP.has(_fold(tk)) && C.islower(frag)) {
          return [hstart, te, C.lower(tk), 'hyphen'];
        }
      }
      return null;
    }

    const nfirst = text.slice(ns, ns + 1);
    const starts_lower = !!r('_LOWER_START').match(nfirst);
    // Párrafo cortado a mitad de frase (o por una cabecera intercalada).
    const mid = r('_join_fix:L612').search(prev_tail);
    if ((starts_lower && (has_hdr || mid)) || (has_hdr && mid && nfirst)) {
      let a = pb;
      if (hdrs.length || hdr_end > na) {
        // Número de página suelto al final del párrafo anterior: "por su 12212".
        const nm = r('_join_fix:L617').search(prev_tail);
        if ((nm && hdrs.some(([x, y]) => r('_HDR_DATE').search(text.slice(x, y))))
          || (nm && r('_HDR_DATE').match(text, na))) {
          a = pb - nm.group(0).length;
        }
      }
      return [a, ns, ' ', 'join'];
    }
    // Acotación partida por la línea en blanco: "(Un Sr. Diputado:\n\nEso...)".
    if (!hdrs.length) {
      const op = _last_unclosed(text, Math.max(pa, pb - _MAX_PAREN), pb);
      if (op >= 0) {
        const lim = Math.min(nb, na + 400);
        const rel = lim > na ? text.slice(na, lim).indexOf(')') : -1;
        const cl = rel >= 0 ? na + rel : -1;
        if (cl > 0 && !text.slice(na, cl).includes('(')) {
          const inner = text.slice(op + 1, pb) + ' ' + text.slice(na, cl);
          const res = classify_segment(inner);
          if (res !== null && !res.note) return [pb, na, ' ', 'join'];
        }
      }
    }
    return null;
  }

  /** P0 + unión de párrafos: [párrafos [[a, b]], cabeceras [[a, b]], correcciones, calificador del orador]. */
  function _normalize(text) {
    const fixes = [];
    let start = 0;
    let lead = null;
    const lm = r('_LEAD_SPEAKER').match(text);
    if (lm && !classify_segment(lm.group(1))) {
      // "(D. Eduardo): Señores Diputados..." -> el paréntesis va al orador.
      lead = C.strip(lm.group(1));
      fixes.push([0, lm.end(), '', 'lead_speaker']);
      start = lm.end();
    }

    const paras = [];
    const arts = [];
    let pending = [];
    let cur = null;
    for (const [a, b] of _raw_spans(text, start)) {
      if (r('_HDR_ONLY').match(text, a, b) && b - a <= 40) {
        pending.push([a, b]);
        continue;
      }
      const hm = r('_HDR_PREFIX').match(text, a, b);
      const hdr_end = hm ? hm.end() : a;
      const fx = cur !== null ? _join_fix(text, cur, pending, [a, b], hdr_end) : null;
      if (fx) {
        fixes.push(fx);
        cur[1] = b;
        pending = [];
        continue;
      }
      if (cur !== null) paras.push(cur);
      for (const p of pending) arts.push(p);
      pending = [];
      if (hm) fixes.push([a, hdr_end, '', 'header']);
      cur = [a, b];
    }
    if (cur !== null) paras.push(cur);
    for (const p of pending) arts.push(p);

    // Guiones blandos y signos de apertura leídos como corchete o llave.
    _sortFixes(fixes);
    const starts = fixes.map((f) => f[0]);
    const free = (a, b) => {
      const i = _bisectRight(starts, a) - 1;
      if (i >= 0 && fixes[i][1] > a) return false;
      const j = _bisectLeft(starts, a);
      return !(j < fixes.length && fixes[j][0] < b);
    };

    const extra = [];
    if (text.includes('\xad')) {
      for (const m of r('_SOFT').finditer(text)) {
        const ms = m.start(), me = m.end();
        if (free(ms, me)) extra.push([ms, me, '', 'soft_hyphen']);
      }
    }
    if (text.includes('[') || text.includes('{')) {
      for (const m of r('_BRACKET').finditer(text)) {
        const p = m.start(1);
        const [close, sign, repl] = m.group(1) === '[' ? [']', '!', '¡'] : ['}', '?', '¿'];
        const ventana = text.slice(p + 1, p + 200);
        const cands = [ventana.indexOf(close), ventana.indexOf('\n')].filter((x) => x >= 0);
        const cut = cands.length ? Math.min(...cands) : ventana.length;
        const antes = ventana.slice(0, cut);
        if (antes.includes(sign) && !antes.includes('$') && free(p, p + 1)) extra.push([p, p + 1, repl, 'bracket']);
      }
    }
    if (extra.length) {
      for (const e of extra) fixes.push(e);
      _sortFixes(fixes);
    }
    return [paras, arts, fixes, lead];
  }

  /**
   * Texto corregido de [a, b) y tabla posición corregida -> posición original (con una entrada final igual a b), o
   * [text[a:b], null] si no hay correcciones. fx = [fixes, starts] o null.
   */
  function _view(text, a, b, fx) {
    if (!fx) return [text.slice(a, b), null];
    const [fixes, starts] = fx;
    let i = _bisectLeft(starts, a);
    if (i >= fixes.length || fixes[i][0] >= b) return [text.slice(a, b), null];
    const parts = [];
    const pmap = [];
    let pos = a;
    while (i < fixes.length && fixes[i][0] < b) {
      const fa = fixes[i][0], fb = fixes[i][1], rp = fixes[i][2];
      if (fb > b) break;
      parts.push(text.slice(pos, fa));
      for (let k = pos; k < fa; k++) pmap.push(k);
      parts.push(rp);
      for (let k = 0; k < rp.length; k++) pmap.push(fa);
      pos = fb;
      i += 1;
    }
    parts.push(text.slice(pos, b));
    for (let k = pos; k < b; k++) pmap.push(k);
    pmap.push(b);
    return [parts.join(''), pmap];
  }

  /** Texto que se muestra del tramo [a, b): el original con sus correcciones. */
  function _apply(text, a, b, fixes, starts) {
    let i = _bisectLeft(starts, a);
    if (i >= fixes.length || fixes[i][0] >= b) return text.slice(a, b);
    const out = [];
    let pos = a;
    while (i < fixes.length && fixes[i][0] < b) {
      const fa = fixes[i][0], fb = fixes[i][1], rep = fixes[i][2];
      out.push(text.slice(pos, fa));
      out.push(rep);
      pos = fb;
      i += 1;
    }
    out.push(text.slice(pos, b));
    return out.join('');
  }

  // --------------------------------------------------------------------------------------------------------------
  // P3 · Escáner de paréntesis y segmentos de un párrafo
  // --------------------------------------------------------------------------------------------------------------
  function _match_parens(text, a, b) {
    const pairs = [], stack = [], loose = [];
    for (const m of r('_match_parens:L770').finditer(text.slice(a, b))) {
      const i = a + m.start();
      if (text[i] === '(') {
        stack.push(i);
      } else if (stack.length) {
        const o = stack.pop();
        pairs.push([o, i, stack.length]);
      } else {
        if (r('_match_parens:L778').search(text.slice(Math.max(a, i - 3), i))) continue;
        loose.push(i);
      }
    }
    return [pairs, stack, loose];
  }

  function _acot_seg(text, a, b, ia, res, extra = null) {
    const units = res.u.map((u) => ({ ...u, a: ia + u.a, b: ia + u.b }));
    const seg = { k: 'acot', a, b, c: res.c, u: units };
    if (extra) Object.assign(seg, extra);
    return seg;
  }

  const _DASH_UNIT_FUERA = '—–()\n';
  /**
   * Equivalente de _DASH_UNIT.match(text, p, limit) — [^—–()\n]{1,120}?(?:[.!?…]|(?=\s*[—–)])) sobre text[:limit] —
   * sin RegExp: [inicio, fin] o null. Lo usa _dashUnit cuando el motor de JS se queda sin pila (Firefox).
   */
  function _dashUnitManual(text, p, limit) {
    let finBlancos = -1;
    for (let k = 1; k <= 120; k++) {
      const q = p + k;
      if (q > limit) return null;
      if (_DASH_UNIT_FUERA.includes(text[q - 1])) return null;
      if (q < limit && '.!?…'.includes(text[q])) return [p, q + 1];
      let e;
      if (finBlancos > q) {
        e = finBlancos;
      } else {
        e = q;
        while (e < limit && C.cp.isspace(text.charCodeAt(e))) e++;
        finBlancos = e;
      }
      if (e < limit && '—–)'.includes(text[e])) return [p, q];
    }
    return null;
  }

  function _dashUnit(text, p, limit) {
    try {
      const um = r('_DASH_UNIT').match(text, p, limit);
      return um ? [um.start(), um.end()] : null;
    } catch (err) {
      if (err instanceof RE.error && err.motorAgotado) return _dashUnitManual(text, p, limit);
      throw err;
    }
  }

  /** ")—Risas.—" detrás de un paréntesis: unidades con raya sin paréntesis. */
  function _extend_dash_chain(text, seg, limit) {
    let pos = seg.b;
    while (pos < limit) {
      const m = r('_DASH_AFTER').match(text, pos, limit);
      if (!m) break;
      const um = _dashUnit(text, m.end(), limit);
      if (!um) break;
      const ut = text.slice(um[0], um[1]);
      const res = _classify_unit(ut);
      if (res === null || (res.k === 'interj' && !ut.endsWith('.'))) break;
      res.a = um[0];
      res.b = um[1];
      seg.u.push(res);
      if (CLASS_RANK[res.c] > CLASS_RANK[seg.c]) seg.c = res.c;
      pos = um[1];
      seg.b = pos;
      seg.dash = true;
    }
    // Cierre sobrante: ".—Grandes aplausos.)"
    if (seg.dash && pos < limit && text[pos] === ')') seg.b = pos + 1;
  }

  /** Tramos ya reconocidos de un párrafo, ordenados y sin solapes (búsquedas por bisección). */
  class _Spans {
    constructor() { this.a = []; this.b = []; this.segs = []; }
    add(seg) {
      const i = _bisectLeft(this.a, seg.a);
      this.a.splice(i, 0, seg.a);
      this.b.splice(i, 0, seg.b);
      this.segs.splice(i, 0, seg);
    }
    covers(p) {
      const i = _bisectRight(this.a, p) - 1;
      return i >= 0 && this.b[i] > p;
    }
    overlaps(a, b) {
      const i = _bisectLeft(this.a, b) - 1;
      return i >= 0 && this.b[i] > a;
    }
    end_before(p, dflt) {
      const j = _bisectRight(this.b, p) - 1;
      return j >= 0 ? Math.max(dflt, this.b[j]) : dflt;
    }
  }

  /** Segmentos de un tramo: acotaciones, notas y texto, en orden y sin solapes. */
  function _scan_segments(text, a, b, fx = null) {
    const tramo = text.slice(a, b);
    if (!tramo.includes('(') && !tramo.includes(')')) return [{ k: 'txt', a, b }];
    const [pairs, unclosed, loose] = _match_parens(text, a, b);
    pairs.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
    const spans = new _Spans();
    let covered_until = -1;
    const cls = new Map();

    const classify_pair = (o, c) => {
      const key = o * 4294967296 + c;
      if (!cls.has(key)) {
        const [inner, pm] = _view(text, o + 1, c, fx);
        const res = classify_segment(inner);
        if (res !== null && pm !== null) {
          for (const u of res.u) {
            const ua = u.a, ub = u.b;
            u.a = pm[ua] - o - 1;
            u.b = pm[ub] - o - 1;
          }
        }
        cls.set(key, res);
      }
      return cls.get(key);
    };

    let rec_opens = null;
    const recognized_pair_after = (pos, lim) => {
      if (rec_opens === null) {
        rec_opens = [];
        for (const [o, c] of pairs) {
          if (c - o <= _MAX_PAREN) {
            const res = classify_pair(o, c);
            if (res !== null && !res.note) rec_opens.push(o);
          }
        }
      }
      const i = _bisectRight(rec_opens, pos);
      if (i < rec_opens.length && rec_opens[i] < lim) return rec_opens[i];
      return null;
    };

    // Pares de fuera hacia dentro: si el de fuera es texto, se miran sus hijos.
    for (const [o, c] of pairs) {
      if (o < covered_until) continue;
      if (c - o > _MAX_PAREN) continue;
      const res = classify_pair(o, c);
      if (res === null) continue;
      let seg;
      if (res.note) {
        seg = { k: 'note', a: o, b: c + 1 };
      } else {
        seg = _acot_seg(text, o, c + 1, o + 1, res);
        _extend_dash_chain(text, seg, b);
      }
      spans.add(seg);
      covered_until = seg.b;
    }

    // Aperturas sin cerrar: solo se cierran si el léxico las reconoce (ventana de _MAX_PAREN caracteres).
    for (const o of unclosed) {
      if (spans.covers(o)) continue;
      const nxt = recognized_pair_after(o, b);
      const lim = nxt !== null ? nxt : b;
      const cap = Math.min(lim, o + 1 + _MAX_PAREN);
      let res = classify_segment(text.slice(o + 1, cap));
      if (res === null || res.note) continue;
      let units = res.u;
      if (cap < lim) units = units.slice(0, -1); // la última unidad quedó cortada por la ventana
      let last = null;
      for (const u of units) {
        if (u.c === null) break;
        last = u;
      }
      if (last === null) continue;
      let end = o + 1 + last.b;
      if (nxt === null && _nwords(text.slice(o + 1, end)) > _MAX_OPEN_WORDS) continue;
      res = { ...res, u: units.filter((u) => u.b <= last.b) };
      res.c = _maxClase(res.u.filter((u) => u.c).map((u) => u.c));
      while (end < lim && '—–- '.includes(text[end])) end += 1;
      end = end > o + 1 ? _rstrip_end(text, o + 1, end) : end;
      if (spans.overlaps(o, end)) continue;
      spans.add(_acot_seg(text, o, end, o + 1, res, { open: 'right' }));
    }

    // Cierres sueltos: cadena de unidades con raya que acaba en ")".
    for (const cpos of loose) {
      if (spans.covers(cpos)) continue;
      const lo = Math.max(spans.end_before(cpos, a), cpos - _MAX_PAREN);
      const ventana = text.slice(lo, cpos);
      let start = null;
      let units = [];
      const seps = Array.from(r('_LOOSE_SEP').finditer(ventana)).reverse().slice(0, _MAX_CHAIN);
      for (const m of seps) {
        const me = m.end();
        const cand = ventana.slice(me);
        const res = classify_segment(cand);
        if (res === null || res.note || res.u.some((u) => u.c === null)) break;
        start = lo + m.start();
        units = res.u.map((u) => ({ ...u, a: lo + me + u.a, b: lo + me + u.b }));
      }
      if (start === null) continue;
      const c = _maxClase(units.map((u) => u.c));
      spans.add({ k: 'acot', a: start, b: cpos + 1, c, u: units, open: 'left' });
    }

    const out = [];
    let pos = a;
    for (const s of spans.segs) {
      if (s.a < pos) continue;
      if (s.a > pos) out.push({ k: 'txt', a: pos, b: s.a });
      out.push(s);
      pos = s.b;
    }
    if (pos < b) out.push({ k: 'txt', a: pos, b });
    // Tramos de texto sin espacios en los bordes; los vacíos desaparecen.
    const res = [];
    for (const s of out) {
      if (s.k === 'txt') {
        const rc = _recorte(text, s.a, s.b);
        if (!rc) continue;
        res.push({ k: 'txt', a: rc[0], b: rc[1] });
      } else {
        res.push(s);
      }
    }
    return res;
  }

  // --------------------------------------------------------------------------------------------------------------
  // P2 · Tipos de párrafo
  // --------------------------------------------------------------------------------------------------------------
  function _is_name_item(s) {
    return s.length <= 60 && _nwords(s) <= 7 && !!r('_NAME_ITEM').match(s) && !!r('_LOWER_START').search(s);
  }

  function _tableish(s) {
    const t = C.lstrip(s);
    if (t.startsWith('|') && t.indexOf('|', 1) > 0) return 'md'; // "|Mamarracho!" no es una tabla
    if (t.includes('<table') || t.includes('<td') || t.includes('<tr')) return 'html';
    if (t.includes('$$') || t.includes('\\frac')) return 'latex';
    if (r('_LEADERS').search(t)) return 'leaders';
    const nums = r('_tableish:L1132').findall(t).length;
    if (nums >= 6) {
      const words = r('_tableish:L1134').findall(t).length;
      if (nums >= 1.5 * words) return 'numbers';
    }
    return null;
  }

  /** Aperturas (+1) y cierres (-1) de comillas de un párrafo, en orden. */
  function _quote_events(s) {
    const out = [];
    for (const m of r('_quote_events:L1156').finditer(s)) {
      const i = m.start(), ch = m.group(0);
      if ('“«'.includes(ch)) {
        out.push([i, 1]);
      } else if ('”»'.includes(ch)) {
        out.push([i, -1]);
      } else {
        const prev = i ? s[i - 1] : ' ';
        const nxt = i + 1 < s.length ? s[i + 1] : ' ';
        if (_esp(prev) || '(:—¡¿«['.includes(prev)) out.push([i, 1]);
        else if (_esp(nxt) || '.,;:)—!?'.includes(nxt)) out.push([i, -1]);
      }
    }
    return out;
  }

  function _is_heading(s) {
    return !!r('_HEADING').match(s) && r('_is_heading:L1172').search(s) !== null;
  }

  function _no_parens(s) {
    return s.includes('(') ? r('_PAREN_TXT').sub(' ', r('_PAREN_TXT').sub(' ', s)) : s;
  }

  /** ¿Habla el párrafo en primera o segunda persona (fuera de paréntesis y comillas)? */
  function _speech_marks(s) {
    s = _no_parens(s);
    if (s.includes('"') || s.includes('“') || s.includes('«')) s = r('_QUOTED_TXT').sub(' ', s);
    if (r('_SPEECH_MARK').search(s)) return true;
    for (const m of r('_PRET1').finditer(s)) if (!_PRET1_STOP.has(_fold(m.group(0)))) return true;
    for (const m of r('_PL1').finditer(s)) if (!_PL1_STOP.has(m.group(0))) return true;
    return false;
  }

  const _ends_colon = (s) => C.rstrip(s, ' "”»').endsWith(':');

  function _reading_kind(s, chair_doc) {
    return chair_doc || r('_FIRST_PERSON_DOC').search(s) ? 'doc' : 'list';
  }

  /** ¿Confirma este párrafo que el anterior cerró las palabras del orador? */
  function _acta_like(s, chair_doc) {
    if (r('_CHRON_END').search(s) || r('_TURN').match(s) || r('_VOTE_HEAD').match(s) || r('_NUM_DEP').match(s)
      || r('_NOTE_PARA').match(s) || _tableish(s) || _is_heading(s) || r('_READ_DOC').match(s)) return true;
    if (_speech_marks(s)) return false;
    if (_nwords(s) <= 25 && r('_ANNEX').match(s)) return true;
    if (chair_doc || r('_CHRON_START').match(s) || r('_ABS_START').match(s) || _nwords(s) <= 12) return true;
    return r('_ACTA_VERB').search(s) !== null && r('_PROC_NOUN').search(s) !== null;
  }

  /** P2: tipo de cada párrafo y máquina de estados habla / acta / lectura (ver diario.py). */
  function _type_paragraphs(text, paras, fixes, chair_doc = false) {
    const starts = fixes.map((f) => f[0]);
    const texts = paras.map(([a, b]) => _apply(text, a, b, fixes, starts));
    const quote_fixes = [];
    const recs = [];
    let speech = true;
    let reading = null;
    let depth = 0;
    for (let idx = 0; idx < paras.length; idx++) {
      const [a, b] = paras[idx];
      const s = texts[idx];
      const rec = { a, b, sub: null };
      const marks = _speech_marks(s);
      const chron_start = !marks && !!r('_CHRON_START').match(s);
      const chron_end = !!r('_CHRON_END').search(s);
      const heading = _is_heading(s);
      const annex = !marks && _nwords(s) <= 25 && !!r('_ANNEX').match(s);
      const doc_start = (!speech && (!!r('_READ_DOC').match(s) || '"“«'.includes(s.slice(0, 1)) || heading)) || annex;
      if (chron_start) depth = 0;
      let stray = null;
      for (const [i, d] of _quote_events(s)) {
        if (d > 0) depth += 1;
        else if (depth > 0) depth -= 1;
        else if (i === s.length - 1 && s[i] === '"') stray = text[b - 1] === '"' ? b - 1 : null;
      }
      const tab = _tableish(s);
      if (tab) {
        rec.kind = 'table';
        rec.fmt = tab;
      } else if (r('_NOTE_PARA').match(s)) {
        rec.kind = 'note';
      } else if (!chron_start && r('_TURN').match(text, a, b)) {
        // Turno incrustado, también en el acta: devuelve el estado de habla.
        rec.kind = 'turn';
      } else if (chron_start || chron_end || heading || annex
        || (!speech && (doc_start || !marks || (reading === 'doc' && !r('_VOCATIVE').search(_no_parens(s)))))) {
        rec.kind = 'chron';
      } else if (!s.includes('(') && r('_type_paragraphs:L1279').search(s)
        && ((res) => res !== null && !res.note && res.u.length > 1 && res.u.every((u) => u.c))(classify_segment(s))) {
        rec.kind = 'stage';
      } else {
        rec.kind = 'par';
      }
      if (r('_VOTE_HEAD').match(s)) rec.sub = 'head';
      else if (r('_TOTAL').match(s)) rec.sub = 'total';
      else if (r('_NUM_DEP').match(s) || (r('_DEP').match(s) && _nwords(s) <= 25)) rec.sub = 'dep';
      else if (_is_name_item(s)) rec.sub = 'name';
      const kind = rec.kind;
      if (kind === 'turn' || chron_end) {
        speech = true;
        reading = null;
      } else if (chron_start && kind === 'chron') {
        speech = false;
        if (_ends_colon(s)) reading = _reading_kind(s, chair_doc);
        else if (!(reading && r('_SIGNATURE').match(s))) reading = null;
      } else if (annex && kind === 'chron') {
        speech = false;
        reading = 'doc';
      } else if (!speech && (kind === 'par' || kind === 'stage')) {
        speech = true; // marcas de habla: vuelve el discurso
        reading = null;
      } else if (!speech && kind === 'chron') {
        if (doc_start) reading = 'doc';
        else if (_ends_colon(s)) reading = _reading_kind(s, chair_doc);
      }
      if (stray !== null && kind !== 'table') {
        if (!speech) {
          quote_fixes.push([stray, stray + 1, '', 'quote']);
        } else if (idx + 1 === texts.length || _acta_like(texts[idx + 1], chair_doc)) {
          quote_fixes.push([stray, stray + 1, '', 'quote']);
          speech = false;
          reading = null;
        }
      }
      recs.push(rec);
    }
    if (quote_fixes.length) {
      for (const q of quote_fixes) fixes.push(q);
      _sortFixes(fixes);
    }
    return recs;
  }

  /** Agrupa listas de votación o de diputados y tablas contiguas. */
  function _group(recs) {
    const out = [];
    let i = 0;
    const n = recs.length;
    while (i < n) {
      const rec = recs[i];
      const sub = rec.sub;
      if (sub === 'head') {
        let j = i + 1;
        while (j < n && (recs[j].sub === 'name' || recs[j].sub === 'dep')) j += 1;
        let total = null;
        if (j < n && recs[j].sub === 'total') {
          total = recs[j];
          j += 1;
        }
        out.push({ kind: 'list', lk: 'vote', head: rec, items: recs.slice(i + 1, j - (total ? 1 : 0)), total });
        i = j;
        continue;
      }
      if (sub === 'dep' || sub === 'name') {
        let j = i;
        while (j < n && recs[j].sub === sub) j += 1;
        if (j - i >= (sub === 'dep' ? 2 : 4)) {
          let total = null;
          if (j < n && recs[j].sub === 'total') {
            total = recs[j];
            j += 1;
          }
          out.push({
            kind: 'list', lk: sub === 'dep' ? 'deputies' : 'names', head: null,
            items: recs.slice(i, j - (total ? 1 : 0)), total,
          });
          i = j;
          continue;
        }
      }
      if (rec.kind === 'table') {
        let j = i;
        while (j < n && recs[j].kind === 'table') j += 1;
        out.push({ kind: 'table', rows: recs.slice(i, j), fmt: rec.fmt });
        i = j;
        continue;
      }
      out.push(rec);
      i += 1;
    }
    return out;
  }

  function _stage_from(seg, inpar) {
    const st = { t: 'stage', a: seg.a, b: seg.b, c: seg.c, u: seg.u };
    if (inpar) st.inpar = true;
    return st;
  }

  /** Párrafo de prosa -> par / stage / par(cont) según la regla en línea/bloque. */
  function _prose_blocks(text, a, b, fx = null) {
    const segs = _scan_segments(text, a, b, fx);
    const out = [];
    let piece = [];
    let piece_prose = false; // ¿hay texto con letras en la pieza en curso?
    let emitted_prose = false;

    const add = (x) => {
      piece.push(x);
      if (x.k === 'txt' && !piece_prose && r('_HAS_WORD').search(text, x.a, x.b)) piece_prose = true;
    };

    const flush = () => {
      if (!piece.length) return;
      if (piece_prose) {
        out.push({ t: 'par', a: piece[0].a, b: piece[piece.length - 1].b, cont: emitted_prose, s: piece });
        emitted_prose = true;
      } else {
        for (const x of piece) {
          if (x.k === 'acot') {
            out.push(_stage_from(x, emitted_prose));
          } else if (x.k === 'note') {
            out.push({ t: 'note', a: x.a, b: x.b, s: [x] });
          } else if (out.length) {
            const ult = out[out.length - 1];
            ult.b = Math.max(ult.b, x.b);
            if (ult.t === 'par' || ult.t === 'note') ult.s.push(x);
          } else {
            out.push({ t: 'note', a: x.a, b: x.b, s: [x] });
          }
        }
      }
      piece = [];
      piece_prose = false;
    };

    let k = 0;
    while (k < segs.length) {
      const s = segs[k];
      if (s.k !== 'acot') {
        add(s);
        k += 1;
        continue;
      }
      const nxt = k + 1 < segs.length ? segs[k + 1] : null;
      const rest_punct = nxt === null || (k + 2 === segs.length && nxt.k === 'txt'
        && r('_PUNCT_ONLY').fullmatch(text, nxt.a, nxt.b) !== null);
      const e = _rstrip_end(text, a, s.a);
      const prev_term = e > a && _TERM_CHARS.includes(text[e - 1]);
      let block;
      if (!piece_prose) block = true;
      else if (rest_punct) block = prev_term;
      else if (prev_term && r('_NEXT_CAP').match(text, s.b)) {
        block = _nwords(text.slice(s.a, s.b)) > 3 || s.u.length > 1 || s.u.some((u) => u.k === 'interj');
      } else block = false;
      if (!block) {
        add(s);
        k += 1;
        continue;
      }
      flush();
      const st = _stage_from(s, emitted_prose);
      if (rest_punct && nxt !== null) {
        st.b = nxt.b;
        k += 1;
      }
      out.push(st);
      k += 1;
    }
    flush();
    return out;
  }

  /** Fronteras de frase de un par: [fin, inicio siguiente, palabras hasta fin]. */
  function _sentence_bounds(text, blk) {
    const res = [];
    let words = 0;
    for (const s of blk.s) {
      if (s.k !== 'txt') {
        words += s.k === 'acot' ? _nwords(text.slice(s.a, s.b)) : 0;
        continue;
      }
      let pos = s.a;
      for (const m of r('_SENT_END').finditer(text, s.a, s.b)) {
        const dot = m.start();
        const wm = r('_sentence_bounds:L1458').search(text.slice(Math.max(s.a, dot - 12), dot));
        const w = wm ? wm.group(1) : '';
        // Abreviatura, inicial o número de uno o dos dígitos ("art. 3. Las"); un año o una cifra larga si cierran frase.
        if (_ABBR.has(_fold(w)) || (w.length === 1 && C.isupper(w)) || (w !== '' && C.isdigit(w) && w.length <= 2)) continue;
        if (r('_sentence_bounds:L1464').match(text.slice(dot + 1, dot + 2))) continue;
        const me = m.end();
        const end = _rstrip_end(text, s.a, me);
        words += _nwords(text.slice(pos, end));
        pos = end;
        res.push([end, me, words]);
      }
      words += _nwords(text.slice(pos, s.b));
    }
    return res;
  }

  /** Reparte un discurso largo de un solo párrafo en trozos de 120-200 palabras. */
  function _split_sentences(text, blocks) {
    const pars = blocks.filter((x) => x.t === 'par');
    const cands = []; // [acumulado, bloque, fin, inicio_siguiente]; fin = null -> frontera entre bloques
    let acc = 0;
    for (const x of pars) {
      const base = acc;
      for (const [end, nstart, w] of _sentence_bounds(text, x)) cands.push([base + w, x, end, nstart]);
      let suma = 0;
      for (const s of x.s) if (s.k === 'txt' || s.k === 'acot') suma += _nwords(text.slice(s.a, s.b));
      acc = base + suma;
      const tail = C.rstrip(text.slice(x.a, x.b));
      if (tail && '.!?…"”»)'.includes(tail[tail.length - 1])) cands.push([acc, x, null, null]);
    }
    const total = acc;
    const cuts = [];
    let last = 0;
    for (let i = 0; i < cands.length; i++) {
      const [cw, bid, end, nstart] = cands[i];
      const run = cw - last;
      if (total - cw < CHUNK_TAIL) continue;
      const nxt_run = i + 1 < cands.length ? cands[i + 1][0] - last : 10 ** 9;
      // Se corta al llegar al tamaño buscado o, si la frase siguiente haría el trozo demasiado largo, antes de ella.
      if ((run >= CHUNK_TARGET && run >= CHUNK_MIN) || (nxt_run > CHUNK_MAX && run >= Math.floor(CHUNK_MIN / 2))) {
        cuts.push([bid, end, nstart]);
        last = cw;
      }
    }
    if (!cuts.length) return blocks;
    const by_block = new Map();
    for (const [bid, end, nstart] of cuts) {
      if (!by_block.has(bid)) by_block.set(bid, []);
      by_block.get(bid).push([end, nstart]);
    }
    const out = [];
    let new_section_next = false;
    for (const x of blocks) {
      if (x.t !== 'par') {
        out.push(x);
        continue;
      }
      x.split = 'sentences';
      if (new_section_next) {
        x.cont = false;
        x.sp = true;
        new_section_next = false;
      }
      const propios = by_block.get(x) || [];
      for (const [end] of propios) if (end === null) new_section_next = true;
      const pts = propios.filter(([e]) => e !== null);
      if (!pts.length) {
        out.push(x);
        continue;
      }
      let cur = x;
      for (const [e, ns] of pts) {
        const left = [], right = [];
        for (const s of cur.s) {
          if (s.b <= e) left.push(s);
          else if (s.a >= ns) right.push(s);
          else { // frase partida dentro de un tramo de texto
            left.push({ k: 'txt', a: s.a, b: e });
            right.push({ k: 'txt', a: ns, b: s.b });
          }
        }
        if (!left.length || !right.length) continue;
        const first = { ...cur, b: left[left.length - 1].b, s: left };
        out.push(first);
        cur = { t: 'par', a: right[0].a, b: cur.b, cont: false, sp: true, split: 'sentences', s: right };
      }
      out.push(cur);
    }
    return out;
  }

  function _finish(text, blocks, fixes) {
    const starts = fixes.map((f) => f[0]);
    const t = (a, b) => _apply(text, a, b, fixes, starts);
    for (const x of blocks) {
      const typ = x.t;
      if (typ === 'par' || typ === 'chron' || typ === 'note' || typ === 'turn') {
        for (const s of x.s) {
          s.t = t(s.a, s.b);
          for (const u of (s.u || [])) u.t = t(u.a, u.b);
        }
        if (typ === 'turn') x.who.t = t(x.who.a, x.who.b);
      } else if (typ === 'stage') {
        if (x.src !== 'speaker') {
          x.tx = t(x.a, x.b);
          for (const u of x.u) u.t = t(u.a, u.b);
        }
      } else if (typ === 'art') {
        x.tx = t(x.a, x.b);
      } else if (typ === 'table') {
        for (const row of x.rows) row.t = t(row.a, row.b);
      } else if (typ === 'list') {
        for (const key of ['head', 'total']) if (x[key]) x[key].t = t(x[key].a, x[key].b);
        for (const row of x.items) row.t = t(row.a, row.b);
      }
    }
  }

  /** Documento estructurado de una intervención (ver cabecera de diario.py). */
  function parse_speech(text, speaker_raw = null, rep_name = null) {
    text = text || '';
    let sp = parse_speaker(speaker_raw, rep_name);
    const [paras, arts, fixes, lead] = _normalize(text);
    if (lead) {
      sp = { ...sp, qual: lead };
      sp.title = `${sp.title} (${lead})`;
      if (!sp.is_chair) sp.label = sp.title;
    }
    const recs = _type_paragraphs(text, paras, fixes,
      ['chair', 'vicechair', 'chair_age', 'secretary'].includes(sp.role));
    const items = _group(recs);
    for (const [a, b] of arts) items.push({ kind: 'art', a, b });
    const clave = (it) => ('a' in it ? it.a
      : (it.kind === 'list' ? (it.head || it.items[0]) : it.rows[0]).a);
    const conClave = items.map((it, i) => [clave(it), i, it]);
    conClave.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    const ordenados = conClave.map((x) => x[2]);
    const fx = [fixes, fixes.map((f) => f[0])];

    let blocks = [];
    if (sp.acot) {
      const ac = sp.acot;
      const res = classify_segment(C.upper(ac.slice(0, 1)) + ac.slice(1));
      const units = res && !res.note
        ? res.u.map((u) => ({ ...u, t: ac.slice(u.a, u.b) }))
        : [{ a: 0, b: ac.length, t: ac, c: 'neutral', k: 'other', lab: null }];
      for (const u of units) {
        delete u.a;
        delete u.b;
      }
      const c = res && !res.note ? res.c : 'neutral';
      blocks.push({ t: 'stage', a: 0, b: 0, c, u: units, src: 'speaker', tx: ac });
    }
    for (const it of ordenados) {
      const k = it.kind;
      if (k === 'list') {
        const rows = (it.head ? [it.head] : []).concat(it.items, it.total ? [it.total] : []);
        blocks.push({
          t: 'list', kind: it.lk, a: rows[0].a, b: rows[rows.length - 1].b,
          head: it.head ? { a: it.head.a, b: it.head.b } : null,
          items: it.items.map((x) => ({ a: x.a, b: x.b })),
          total: it.total ? { a: it.total.a, b: it.total.b } : null,
        });
      } else if (k === 'table') {
        const rows = it.rows;
        blocks.push({
          t: 'table', fmt: it.fmt, a: rows[0].a, b: rows[rows.length - 1].b,
          rows: rows.map((x) => ({ a: x.a, b: x.b })),
        });
      } else if (k === 'art') {
        blocks.push({ t: 'art', a: it.a, b: it.b });
      } else if (k === 'turn') {
        const m = r('_TURN').match(text, it.a, it.b);
        const wb = _rstrip_end(text, it.a, m.end());
        const who = parse_speaker(m.group('who'));
        blocks.push({
          t: 'turn', a: it.a, b: it.b, who: { a: it.a, b: wb }, role: who.role, label: who.label,
          s: _scan_segments(text, m.end(), it.b, fx),
        });
      } else if (k === 'chron' || k === 'note') {
        blocks.push({ t: k, a: it.a, b: it.b, s: _scan_segments(text, it.a, it.b, fx) });
      } else if (k === 'stage' && ((v) => ((res) => res !== null && !res.note && res.u.length > 0)(classify_segment(v[0])))(
        _view(text, it.a, it.b, fx))) {
        const [inner, pm] = _view(text, it.a, it.b, fx);
        const res = classify_segment(inner);
        const pos = pm ? (p) => pm[p] : (p) => it.a + p;
        blocks.push({
          t: 'stage', a: it.a, b: it.b, c: res.c, src: 'dash',
          u: res.u.map((u) => ({ ...u, a: pos(u.a), b: pos(u.b) })),
        });
      } else {
        for (const blk of _prose_blocks(text, it.a, it.b, fx)) blocks.push(blk);
      }
    }

    // Numeración §: prosa y tablas, una sola secuencia 1..N.
    let n_sec = 0;
    let hayTabla = false;
    let words = 0;
    for (const x of blocks) {
      if (x.t === 'par' && !x.cont) n_sec += 1;
      if (x.t === 'table') { n_sec += 1; hayTabla = true; }
      if (x.t === 'par') for (const s of x.s) if (s.k === 'txt') words += _nwords(text.slice(s.a, s.b));
    }
    if (n_sec === 1 && words > SPLIT_MIN_WORDS && !hayTabla) blocks = _split_sentences(text, blocks);
    let n = 0;
    for (const x of blocks) {
      if (x.t === 'table' || (x.t === 'par' && (!x.cont || n === 0))) {
        n += 1;
        if (x.t === 'par') x.cont = false;
      }
      if (x.t === 'par' || x.t === 'table') x.n = n;
    }
    _finish(text, blocks, fixes);
    // Guiones internos de OCR que quedan en la prosa ("incompa- tibilidades"): no se tocan, pero se informan.
    const warn = [];
    for (const x of blocks) {
      if (x.t === 'par' || x.t === 'chron' || x.t === 'turn') {
        for (const s of x.s) {
          if (s.k === 'txt' && s.t.includes('- ')) {
            for (const m of r('_OCR_HYPH').finditer(text, s.a, s.b)) warn.push({ k: 'ocr_hyphen', a: m.start() + 1 });
          }
        }
      }
    }
    const doc = {
      v: ENGINE_VERSION, nv: NUMBERING_VERSION, len: text.length, speaker: sp,
      fix: fixes, blocks, n, words,
    };
    if (warn.length) doc.warn = warn;
    return doc;
  }

  function* _iter_units(doc) {
    for (const x of doc.blocks) {
      if (x.t === 'stage') {
        yield* x.u;
      } else if ('s' in x) {
        for (const s of x.s) if (s.k === 'acot') yield* s.u;
      }
    }
  }

  /** Clima de sala: unidades de acotación por clase y etiqueta (documento de parse_speech o texto crudo). */
  function climate(doc_or_text) {
    const doc = doc_or_text !== null && typeof doc_or_text === 'object' ? doc_or_text : parse_speech(doc_or_text);
    const res = { applause: 0, conflict: 0, order: 0, neutral: 0, labels: {}, n: 0 };
    for (const u of _iter_units(doc)) {
      if (!u.c) continue;
      res[u.c] += 1;
      res.n += 1;
      const lab = u.lab;
      if (lab) res.labels[lab] = (Object.prototype.hasOwnProperty.call(res.labels, lab) ? res.labels[lab] : 0) + 1;
    }
    return res;
  }

  /** Párrafos numerados (§): n, tramos sobre el original y texto sin acotaciones. */
  function paragraphs(doc) {
    const out = [];
    for (const x of doc.blocks) {
      if (x.t !== 'par' && x.t !== 'table') continue;
      const txt = x.t === 'table'
        ? x.rows.map((row) => row.t).join('\n')
        : x.s.filter((s) => s.k === 'txt').map((s) => s.t).join(' ');
      if (out.length && out[out.length - 1].n === x.n) {
        const p = out[out.length - 1];
        p.b = x.b;
        p.pieces.push([x.a, x.b]);
        p.t = C.strip(p.t + ' ' + txt);
      } else {
        const p = { n: x.n, a: x.a, b: x.b, pieces: [[x.a, x.b]], t: txt, kind: x.t };
        if (x.split) p.split = x.split;
        out.push(p);
      }
    }
    return out;
  }

  /** Texto reconstruido desde el documento (correcciones aplicadas, sin cabeceras de página). */
  function plain_text(doc, text) {
    const fixes = doc.fix.filter((f) => f[3] !== 'quote' && f[3] !== 'lead_speaker');
    const starts = fixes.map((f) => f[0]);
    const parts = [];
    for (const x of doc.blocks) {
      const typ = x.t;
      if (typ === 'art' || x.src === 'speaker') continue;
      const chunk = _apply(text, x.a, x.b, fixes, starts);
      const joined = (typ === 'par' && (x.cont || x.sp)) || (typ === 'stage' && x.inpar);
      if (parts.length && joined) {
        parts.push(' ' + chunk);
      } else {
        if (parts.length) parts.push('\n\n');
        parts.push(chunk);
      }
    }
    return parts.join('');
  }

  R2.diario = {
    ENGINE_VERSION, NUMBERING_VERSION, CLASS_RANK, SPLIT_MIN_WORDS,
    parse_speech, parse_speaker, classify_segment, climate, paragraphs, plain_text,
    iter_units: (doc) => Array.from(_iter_units(doc)),
    _iter_units,
    /** Para pruebas y diagnóstico. */
    _interno: {
      PAT, patron: r, _fold, _nwords, _lev_le, _surname, _chair_name, _parse_speaker_cached, _classify_unit, _unit_spans,
      _raw_spans, _join_fix, _normalize, _view, _apply, _match_parens, _scan_segments, _tableish, _is_heading,
      _speech_marks, _reading_kind, _acta_like, _type_paragraphs, _group, _prose_blocks, _sentence_bounds,
      _split_sentences, _finish, _extend_dash_chain, _dashUnit, _dashUnitManual,
    },
  };
})(globalThis.R2 = globalThis.R2 || {});
