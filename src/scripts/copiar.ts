export {};
/**
 * [Copiar la cita] y [Copiar la consulta]. SOLO AÑADE: sin JavaScript el texto está a la vista, en un bloque
 * seleccionable (`user-select: all`), y el botón no existe (nace `hidden`: el sitio no enseña botones inertes).
 *
 * CONTRATO: un contenedor `[data-copiable]` con un botón `[data-copiar]` y el texto en `[data-copiar-texto]`
 * (si hay varios —la cita en texto, BibTeX y RIS—, se copia el del `<details>` abierto o, si no, el primero); el aviso
 * «Copiada» va en `[data-copiar-aviso]` (`role="status"`), con el texto en `data-copiada`.
 */
function textoACopiar(caja: HTMLElement): HTMLElement | null {
  const abierto = caja.querySelector<HTMLElement>('details[open] [data-copiar-texto]');
  return abierto ?? caja.querySelector<HTMLElement>('[data-copiar-texto]');
}

function enlaza(caja: HTMLElement): void {
  if (caja.hasAttribute('data-copiar-listo')) return;
  caja.setAttribute('data-copiar-listo', '');
  const boton = caja.querySelector<HTMLButtonElement>('[data-copiar]');
  const aviso = caja.querySelector<HTMLElement>('[data-copiar-aviso]');
  if (!boton) return;
  boton.hidden = false;
  // «Seleccione la consulta y cópiela» solo vale sin JavaScript.
  caja.querySelectorAll<HTMLElement>('[data-sinjs]').forEach((n) => { n.hidden = true; });
  let reloj = 0;
  boton.addEventListener('click', async () => {
    const nodo = textoACopiar(caja);
    if (!nodo) return;
    const texto = nodo.tagName === 'PRE' || nodo.querySelector('pre') ? (nodo.textContent ?? '').trim() : (nodo.textContent ?? '').replace(/\s+/g, ' ').trim();
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Sin permiso de portapapeles: se selecciona, y basta Ctrl+C.
      const rango = document.createRange();
      rango.selectNodeContents(nodo);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(rango);
      if (!document.execCommand('copy')) {
        if (aviso) aviso.textContent = aviso.dataset.noCopiada ?? '';
        return;
      }
    }
    if (aviso) {
      aviso.textContent = aviso.dataset.copiada ?? '';
      window.clearTimeout(reloj);
      reloj = window.setTimeout(() => { aviso.textContent = ''; }, 4000);
    }
    // El propio botón lo dice durante 1,6 s (DESIGN.md § Buttons · Copiar).
    const etiqueta = boton.querySelector('span');
    if (etiqueta && aviso?.dataset.copiada) {
      const antes = etiqueta.innerHTML;
      etiqueta.textContent = aviso.dataset.copiada;
      window.setTimeout(() => { etiqueta.innerHTML = antes; }, 1600);
    }
  });
}

document.querySelectorAll<HTMLElement>('[data-copiable]').forEach(enlaza);
