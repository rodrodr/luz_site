/**
 * F26 como IMAGEN descargable (SVG y PNG, plan § F26 · Pestaña Datos; `comun.fig.imagen.nota`: «La imagen, en SVG y en
 * PNG, lleva su cita al pie»). Es la única salida de la figura con texto DENTRO del SVG: es un archivo para llevarse,
 * no la figura de la página (que dibuja en SVG y escribe en HTML). Papel claro del sitio (DESIGN.md › Colors, tema
 * claro), EB Garamond y JetBrains Mono con respaldo de sistema. Los mismos datos que la página: `votaciones.json`.
 */
import { plano, existe } from '../lib/i18n';
import { dato } from '../lib/datos';
import { agrupado, fechaCorta } from '../lib/formato';
import { huella } from '../lib/cita';
import { url } from '../lib/rutas';
import { paginaDe } from '../lib/figuras';
import { tope, marcasEje, type Voto } from './geom/votaciones';
import type { Lang } from '../lib/idiomas';

const C = { fondo: '#F6F2E9', tinta: '#1A1C16', tinta2: '#45483D', apagado: '#676A61', dato: '#805903', ausencia: '#7D7C70', filete: 'rgba(26,28,22,.14)' };
const SERIF = "'EB Garamond', 'EB Garamond Variable', Georgia, 'Times New Roman', serif";
const MONO = "'JetBrains Mono', 'JetBrains Mono Variable', Menlo, Consolas, monospace";
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Parte un texto en líneas de como mucho `max` caracteres (aproximación suficiente para una imagen fija). */
function parte(texto: string, max: number): string[] {
  const out: string[] = [];
  let l = '';
  for (const p of texto.split(/\s+/)) {
    if ((l + ' ' + p).trim().length > max && l) { out.push(l); l = p; } else l = (l + ' ' + p).trim();
  }
  if (l) out.push(l);
  return out;
}

export function imagenVotaciones(lang: Lang, site?: URL): string {
  const F = 'fig.F26';
  const p = (k: string, vars: Record<string, string> = {}) => (existe(k) ? plano(lang, k, { vars }) : '');
  const votos = dato<{ votaciones: Voto[] }>('votaciones')?.votaciones ?? [];
  const T = votos.length ? tope(votos) : 1;
  const n = (x: number) => agrupado(x, lang);
  const W = 1200, M = 56, ROT = 330, VAL = 150;
  const X0 = M + ROT, AN = W - M - VAL - X0 - 24;
  const esc_x = (v: number) => X0 + (v / T) * AN;
  const partes: string[] = [];
  let y = M;
  const txt = (x: number, yy: number, s: string, o: { f?: string; t?: number; c?: string; w?: number; a?: string; i?: boolean } = {}) =>
    partes.push(`<text x="${x}" y="${yy}" font-family="${o.f ?? SERIF}" font-size="${o.t ?? 18}" fill="${o.c ?? C.tinta}"${o.w ? ` font-weight="${o.w}"` : ''}${o.a ? ` text-anchor="${o.a}"` : ''}${o.i ? ' font-style="italic"' : ''}>${esc(s)}</text>`);
  txt(M, y, 'F26', { f: MONO, t: 14, c: C.apagado });
  y += 36;
  txt(M, y, p(`${F}.titulo`), { t: 34, w: 600 });
  y += 32;
  txt(M, y, p(`${F}.pregunta`), { t: 20, c: C.tinta2 });
  y += 30;
  txt(M, y, p(`${F}.asiento`, {}), { f: MONO, t: 13, c: C.apagado });
  y += 34;
  // leyenda
  let lx = M;
  const ley = (dibujo: string, s: string) => { partes.push(`<g transform="translate(${lx},${y - 11})">${dibujo}</g>`); txt(lx + 32, y, s, { t: 15, c: C.tinta2 }); lx += 32 + s.length * 7.2 + 26; };
  ley(`<rect width="24" height="12" fill="${C.dato}"/>`, p(`${F}.leyenda.si`));
  ley(`<rect y="4" width="24" height="4" fill="${C.tinta}"/>`, p(`${F}.leyenda.no`));
  ley(`<rect x=".5" y=".5" width="23" height="11" fill="none" stroke="${C.ausencia}"/><line x1="12" x2="12" y1="-3" y2="15" stroke="${C.tinta}" stroke-width="2"/>`, p(`${F}.leyenda.mitad`));
  y += 22;
  lx = M;
  ley(`<rect x=".5" y=".5" width="23" height="11" fill="none" stroke="${C.ausencia}"/>`, p(`${F}.leyenda.total`));
  ley(`<rect x=".5" y=".5" width="23" height="11" fill="none" stroke="${C.dato}" stroke-width="1.5" stroke-dasharray="4 3"/>`, p(`${F}.leyenda.ordinaria`));
  y += 30;
  partes.push(`<line x1="${M}" x2="${W - M}" y1="${y}" y2="${y}" stroke="${C.filete}"/>`);
  for (const v of votos) {
    const lineas = parte(p(`${F}.v.${v.clave}`), 38);
    const FILA = Math.max(78, 42 + lineas.length * 20);
    const cy = y + FILA / 2 + 4;
    txt(M, y + 24, fechaCorta(v.fecha), { f: MONO, t: 13, c: C.apagado });
    lineas.forEach((l, i) => txt(M, y + 46 + i * 20, l, { t: 17 }));
    const h = 16, top = cy - h / 2;
    if (v.total && v.total > v.si + v.no) partes.push(`<rect x="${esc_x(v.si + v.no)}" y="${top + .5}" width="${esc_x(v.total) - esc_x(v.si + v.no)}" height="${h - 1}" fill="none" stroke="${C.ausencia}"/>`);
    if (v.nominal) {
      partes.push(`<rect x="${X0}" y="${top}" width="${esc_x(v.si) - X0}" height="${h}" fill="${C.dato}"/>`);
      if (v.no) partes.push(`<rect x="${esc_x(v.si)}" y="${top + h * .34}" width="${esc_x(v.si + v.no) - esc_x(v.si)}" height="${h * .32}" fill="${C.tinta}"/>`);
    } else {
      partes.push(`<rect x="${X0 + .75}" y="${top + .75}" width="${esc_x(v.si) - X0 - 1.5}" height="${h - 1.5}" fill="none" stroke="${C.dato}" stroke-width="1.5" stroke-dasharray="4 3"/>`);
      partes.push(`<rect x="${esc_x(v.si) + .75}" y="${top + .75}" width="${esc_x(v.si + v.no) - esc_x(v.si) - 1.5}" height="${h - 1.5}" fill="none" stroke="${C.tinta}" stroke-width="1.5" stroke-dasharray="4 3"/>`);
    }
    if (v.mitad) {
      const mx = esc_x(v.mitad);
      partes.push(`<line x1="${mx}" x2="${mx}" y1="${top - 7}" y2="${top + h + 7}" stroke="${C.tinta}" stroke-width="2"/>`);
      txt(mx + 6, top - 9, p(`${F}.valor.mitad`, { mitad: n(v.mitad) }), { f: MONO, t: 12 });
    }
    const val = v.nominal ? p(`${F}.valor`, { si: n(v.si), no: n(v.no) }) : p(`${F}.valor.ordinaria`, { si: n(v.si), no: n(v.no) });
    txt(W - M - VAL + 8, cy - 2, val, { f: MONO, t: 13, c: C.tinta2 });
    if (v.total) txt(W - M - VAL + 8, cy + 16, p(`${F}.valor.total`, { total: n(v.total) }), { f: MONO, t: 13, c: C.apagado });
    y += FILA;
    partes.push(`<line x1="${M}" x2="${W - M}" y1="${y}" y2="${y}" stroke="${C.filete}"/>`);
  }
  y += 22;
  for (const x of marcasEje(T)) txt(esc_x(x), y, n(x), { f: MONO, t: 12, c: C.apagado, a: x === 0 ? 'start' : 'middle' });
  y += 40;
  const salv = `${p('comun.fig.salvedad')}. ${p(`${F}.salvedad`)}`.replace('..', '.');
  for (const l of parte(salv, 118)) { txt(M, y, l, { t: 15, c: C.tinta2 }); y += 21; }
  y += 14;
  // Cita de la figura: autores · título · URL · base (con huella) · fecha de exportación (comun.cita.figura).
  const hh = huella('V2');
  const href = site ? new URL(url(lang, paginaDe('F26')), site).href : url(lang, paginaDe('F26'));
  const cita = existe('comun.cita.figura') ? plano(lang, 'comun.cita.figura', {
    vars: { titulo: p(`${F}.titulo`), url: href, base: `${p('comun.sello.V2')}${hh.huella ? ` · ${hh.huella}` : ''}`, fecha: hh.fecha ?? '' },
  }) : href;
  for (const l of parte(cita, 130)) { txt(M, y, l, { f: MONO, t: 12, c: C.apagado }); y += 18; }
  const H = y + M - 18;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" lang="${lang}">`
    + `<title>${esc(p(`${F}.titulo`))}</title><desc>${esc(p(`${F}.alt`))}</desc>`
    + `<rect width="${W}" height="${H}" fill="${C.fondo}"/>${partes.join('')}</svg>\n`;
}
