export {};
/**
 * Isla PROPIA del calendario F01 (la común, `figuras.ts`, pone la nota emergente, el teclado y el toque). Solo añade lo
 * que el calendario hace además (plan § F01 · F16):
 *  · clic en una sesión sin puerta (ratón) → bajo la figura, su ficha breve: fecha y número, sus cifras y cómo
 *    encontrarla en el explorador (pasos escritos: el explorador no abre una sesión desde un enlace);
 *  · toque en un mes (pantalla táctil) → la lista de sus sesiones, con las puertas enlazadas (la diana es el mes);
 *  · clic, Intro o Espacio en un tramo de F16 → resalta sus sesiones (otro clic, o Esc dentro de la figura, lo quita);
 *  · Intro en una sesión recorrida con el teclado → su puerta o su ficha breve.
 * Sin este script la figura está completa: cada puerta es un enlace y la Tabla trae cada mes y cada sesión.
 */

const tactil = () => matchMedia('(hover: none)').matches;

function rellena(plantilla: string, el: Element): string {
  return plantilla.replace(/\{(\w+)\}/g, (_x, k: string) => el.getAttribute(`data-v-${k}`) ?? '').replace(/\s+·\s+(?=·|$)/g, '').trim();
}
const cerca = (el: Element, a: string) => el.closest(`[${a}]`)?.getAttribute(a) ?? '';

function panelCierre(breve: HTMLElement): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'boton sec';
  b.textContent = breve.dataset.tCerrar ?? '';
  b.addEventListener('click', () => { breve.hidden = true; breve.replaceChildren(); });
  return b;
}

function fichaBreve(fig: HTMLElement, barra: Element, conFoco: boolean): void {
  const breve = fig.querySelector<HTMLElement>('[data-breve]');
  if (!breve) return;
  const h = document.createElement('h4');
  h.textContent = rellena(breve.dataset.tTitulo ?? '', barra);
  h.tabIndex = -1;
  const d = document.createElement('p');
  d.className = 'breve-datos';
  d.textContent = rellena(cerca(barra, 'data-plantilla'), barra);
  const b = document.createElement('p');
  b.className = 'breve-datos';
  b.textContent = rellena(cerca(barra, 'data-plantilla-b'), barra);
  const como = document.createElement('p');
  como.innerHTML = breve.dataset.tComo ?? ''; // HTML del copy, escrito en la compilación
  breve.replaceChildren(h, d, b, como, panelCierre(breve));
  breve.hidden = false;
  if (conFoco) h.focus();
}

function listaMes(fig: HTMLElement, celda: Element): void {
  const breve = fig.querySelector<HTMLElement>('[data-breve]');
  if (!breve) return;
  const barras = Array.from(celda.querySelectorAll('.b'));
  if (!barras.length) return;
  const h = document.createElement('h4');
  h.textContent = rellena(breve.dataset.tMes ?? '', celda);
  const ul = document.createElement('ul');
  const plantilla = cerca(barras[0], 'data-plantilla');
  for (const x of barras) {
    const li = document.createElement('li');
    const texto = `${x.getAttribute('data-v-f') ?? ''} · ${rellena(plantilla, x)}`;
    if (x instanceof HTMLAnchorElement) {
      const a = document.createElement('a');
      a.href = x.href;
      a.textContent = texto;
      li.append(a);
      const p = document.createElement('span');
      p.textContent = ` · ${x.getAttribute('aria-label')?.split(' · ').slice(1).join(' · ') ?? ''}`;
      li.append(p);
    } else li.textContent = texto;
    ul.append(li);
  }
  breve.replaceChildren(h, ul, panelCierre(breve));
  breve.hidden = false;
}

function resalta(fig: HTMLElement, tramo: Element): void {
  const k = tramo.getAttribute('data-resalta') ?? '';
  if (fig.dataset.resaltado === k) delete fig.dataset.resaltado;
  else fig.dataset.resaltado = k;
}

function enlaza(fig: HTMLElement): void {
  if (fig.hasAttribute('data-isla-cal')) return;
  fig.setAttribute('data-isla-cal', '');
  const escala = fig.dataset.escala;

  fig.addEventListener('click', (e) => {
    const t = e.target as Element;
    const tramo = t.closest('.tr');
    if (tramo) { resalta(fig, tramo); return; }
    if (escala === 'compacta') return;
    const celda = t.closest('.c[data-mes]');
    if (!celda) return;
    if (tactil()) {
      // En el móvil la diana es el mes: su nota (la pone la isla común) y la lista de sus sesiones.
      if (t.closest('a.b') && !celda.classList.contains('lista-abierta')) e.preventDefault();
      fig.querySelectorAll('.lista-abierta').forEach((x) => x.classList.remove('lista-abierta'));
      celda.classList.add('lista-abierta');
      listaMes(fig, celda);
      return;
    }
    const barra = t.closest('.b');
    if (barra && !(barra instanceof HTMLAnchorElement)) fichaBreve(fig, barra, false);
  });

  fig.addEventListener('keydown', (e) => {
    const grupo = (e.target as Element).closest?.('[data-recorre]');
    if (grupo && (e.key === 'Enter' || e.key === ' ')) {
      const activa = grupo.querySelector('.fig-activa');
      if (!activa) return;
      e.preventDefault();
      if (activa.classList.contains('tr')) resalta(fig, activa);
      else if (activa instanceof HTMLAnchorElement) activa.click();
      else if (activa.classList.contains('b')) fichaBreve(fig, activa, true);
      return;
    }
    if (e.key === 'Escape' && fig.dataset.resaltado) delete fig.dataset.resaltado;
  });
}

function arranca(): void {
  document.querySelectorAll<HTMLElement>('[data-figura="F01"][data-escala]').forEach(enlaza);
}
arranca();
