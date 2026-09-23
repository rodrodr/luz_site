"""Capturas del explorador de Luz y Taquígrafos para luz_site/src/assets/explorador/ (solo lectura).

Perfil de navegador NUEVO y de usar y tirar (scratchpad). Densidad 2x; ventana 1440 x 900; es-ES.
Uso (en este orden, con un perfil vacío): python3 capturar.py f1 · f2 · f4 · f3 · c4
  f1 carga y estados limpios, antes de añadir ninguna biblioteca · f2 bibliotecas del proyecto (B2) ·
  f4 lector con las tres clases de acotación · f3 (E4) navegación 1936-1939 y biblioteca propia · c4 recarga: ¿se recordó la base?
Nada se descarga como archivo: los diálogos de exportar se abren y se cierran sin pulsar «Descargar».
"""
import json, os, sys, time, re
from playwright.sync_api import sync_playwright

URL = "https://rodrodr.github.io/luz_explorer/"
# Trabajo (perfil de navegador de usar y tirar, capturas en bruto, registros) fuera de Dropbox:
BASE = os.environ.get("LUZ_CAPTURAS", os.path.expanduser("~/.cache/luz_site/capturas"))
os.makedirs(BASE, exist_ok=True)
RAW = BASE + "/raw"
PROFILE = BASE + "/profile"
LOG = BASE + "/log_%s.json"
Q_VOTO = '"voto femenino" | "voto de la mujer"'
Q_CV = '"casas viejas"'
os.makedirs(RAW, exist_ok=True)
REG = {"fase": None, "inicio": time.strftime("%Y-%m-%d %H:%M:%S"), "pasos": []}


def log(*a):
    print(time.strftime("%H:%M:%S"), *a, flush=True)


def reg(clave, valor):
    REG["pasos"].append({"t": time.strftime("%H:%M:%S"), "k": clave, "v": valor})
    log(clave, "→", (valor if isinstance(valor, str) else json.dumps(valor, ensure_ascii=False))[:600])


def guardar_reg():
    json.dump(REG, open(LOG % REG["fase"], "w"), ensure_ascii=False, indent=1)


def launch(p, w=1440, h=900):
    ctx = p.chromium.launch_persistent_context(
        PROFILE, channel="chromium", headless=True, viewport={"width": w, "height": h},
        device_scale_factor=2, locale="es-ES", color_scheme="light", args=["--lang=es-ES"],
        accept_downloads=False,
    )
    page = ctx.pages[0] if ctx.pages else ctx.new_page()
    page.on("console", lambda m: open(BASE + "/console.log", "a").write(f"[{m.type}] {m.text}\n"))
    page.on("pageerror", lambda e: open(BASE + "/console.log", "a").write(f"[pageerror] {e}\n"))
    return ctx, page


def open_explorer(page, timeout_s=1200):
    reqs = []
    page.on("response", lambda r: reqs.append((r.url, r.status, r.headers.get("content-length"))) if "sqlite" in r.url else None)
    t0 = time.time()
    page.goto(URL, wait_until="domcontentloaded", timeout=180000)
    last = ""
    while time.time() - t0 < timeout_s:
        n = page.evaluate("() => document.querySelectorAll('#hits > *').length")
        stat = page.evaluate("() => (document.querySelector('#resultMeta')||{}).innerText || ''")
        if n and n > 3 and stat:
            reg("carga", {"segundos": round(time.time() - t0), "meta": stat, "peticiones_sqlite": reqs})
            return
        prog = page.evaluate("() => (document.body.innerText||'').match(/\\d+ ?%[^\\n]{0,60}/)?.[0] || ''")
        if prog != last:
            log(f"{time.time()-t0:.0f}s progreso: {prog!r}")
            last = prog
        time.sleep(3)
    raise RuntimeError("no aparece la lista de resultados")


def blur(page):
    page.evaluate("() => document.activeElement && document.activeElement.blur()")


def tema(page, t):
    """Lo mismo que hace el botón ◐ (dataset.theme + localStorage 'tema'), sin tocar el foco."""
    page.evaluate("t => { document.documentElement.dataset.theme = t; try{localStorage.setItem('tema', t)}catch(e){} }", t)
    time.sleep(0.5)


def shot(page, name, el=None, full=False):
    path = f"{RAW}/{name}.png"
    if el is not None:
        page.locator(el).first.screenshot(path=path)
    else:
        page.screenshot(path=path, full_page=full)
    log("captura", name)
    return path


def dos_temas(page, name, el=None, prep=None):
    """Captura en claro y en oscuro el mismo estado."""
    for t in ("light", "dark"):
        tema(page, t)
        if prep:
            prep()
        shot(page, f"{name}_{'claro' if t == 'light' else 'oscuro'}", el=el)
    tema(page, "light")


def txt(page, sel, n=3000):
    try:
        return page.locator(sel).first.inner_text(timeout=4000)[:n]
    except Exception as e:
        return f"<{sel}: {e.__class__.__name__}>"


def buscar(page, q):
    page.fill("#q", q)
    page.press("#q", "Enter")
    time.sleep(2.5)
    blur(page)


def estado_pliegues(page):
    return page.evaluate("() => ({app: document.querySelector('#app').className, lsP: localStorage.panelPlegado, lsL: localStorage.listaPlegada})")


def plegar(page, filtros=None, lista=None):
    """Pliega o despliega el panel de filtros (f) y la lista (l) hasta el estado pedido."""
    for _ in range(3):
        st = estado_pliegues(page)
        cambia = False
        if filtros is not None and (st["lsP"] == "1") != filtros:
            blur(page); page.keyboard.press("f"); time.sleep(0.6); cambia = True
        st = estado_pliegues(page)
        if lista is not None and (st["lsL"] == "1") != lista:
            blur(page); page.keyboard.press("l"); time.sleep(0.6); cambia = True
        if not cambia:
            break
    return estado_pliegues(page)


def sobre_corpus(page):
    return page.evaluate("() => { const g=document.querySelector('#fg-fuente'); return g ? g.innerText : '' }")


# ---------------------------------------------------------------- fases

def f1(p):
    ctx, page = launch(p)
    page.add_init_script("try{localStorage.setItem('panelPlegado','0');localStorage.setItem('listaPlegada','0')}catch(e){}")
    open_explorer(page)
    reg("tema_inicial", page.evaluate("() => document.documentElement.dataset.theme"))
    reg("cabecera", txt(page, "header", 400))
    time.sleep(1)
    # --- (a) inicial
    dos_temas(page, "a_inicial")
    reg("a_meta", txt(page, "#resultMeta"))
    # --- (b) búsqueda
    buscar(page, Q_VOTO)
    reg("b_meta", txt(page, "#resultMeta"))
    reg("b_qexp", txt(page, "#qexp"))
    reg("b_hits", page.evaluate("() => [...document.querySelectorAll('article.hit')].map(a => a.dataset.id + ' ' + (a.querySelector('.hmeta, .meta, header')||a).innerText.split('\\n').slice(0,2).join(' | ')).slice(0,60)"))
    reg("b_espectro", txt(page, "#spectrum, .spectrum, [id*=espectro]", 800))
    dos_temas(page, "b_busqueda_voto")
    # --- (j) exportar: el diálogo, sin descargar
    page.click("#exportBtn"); time.sleep(1.5)
    reg("j_dialogo", txt(page, "#dlgExport", 2500))
    reg("j_checked", page.evaluate("() => { const c=document.querySelector('#dlgExport input[type=checkbox]'); return c ? c.checked : null }"))
    dos_temas(page, "j_exportar_dialogo", el="#dlgExport")
    dos_temas(page, "j_exportar_ventana")
    page.keyboard.press("Escape"); time.sleep(0.8)
    # --- (c) lector
    page.click('article.hit[data-id="6079"]'); time.sleep(2.5)
    reg("c_lector_cabeza", txt(page, "#reader", 900))
    st = plegar(page, filtros=True, lista=True); reg("c_pliegues", st)
    page.evaluate("() => { const r=document.querySelector('#reader'); r && (r.scrollTop=0); }"); time.sleep(0.6)
    dos_temas(page, "c_lector_campoamor_ancho")
    page.evaluate("() => { const r=document.querySelector('#reader .acot.conflict'); r && r.scrollIntoView({block:'center'}); }"); time.sleep(0.8)
    reg("c_acotaciones", page.evaluate("() => [...document.querySelectorAll('#reader .acot, #reader .acot-inline')].map(e=>e.className.split(' ').pop()+':'+e.innerText.replace(/\\s+/g,' ')).join(' || ')"))
    dos_temas(page, "c_lector_campoamor_rumores")
    # hilo de la sesión (al final del lector)
    page.evaluate("() => { const r=document.querySelector('#reader'); r && (r.scrollTop=r.scrollHeight); }"); time.sleep(0.8)
    reg("c_hilo", txt(page, "#reader", 20000)[-1800:])
    dos_temas(page, "c_lector_campoamor_hilo")
    # --- (d) sesión corrida
    blur(page); page.keyboard.press("s"); time.sleep(3.5)
    reg("d_tools", txt(page, "#sessTools", 600))
    try:
        page.click("#sessRef"); time.sleep(1.5)
    except Exception as e:
        reg("d_sessRef", str(e)[:200])
    dos_temas(page, "d_sesion_corrida")
    page.evaluate("() => { const r=document.querySelector('#reader'); r && (r.scrollTop=0); }"); time.sleep(0.8)
    reg("d_cabecera", txt(page, "#reader", 700))
    dos_temas(page, "d_sesion_corrida_cabecera")
    # volver al discurso
    try:
        page.locator("#read button, #readTools button, button").filter(has_text="Discurso").first.click(); time.sleep(2)
    except Exception as e:
        blur(page); page.keyboard.press("s"); time.sleep(2)
    # --- (e) careo
    blur(page); page.keyboard.press("c"); time.sleep(4.5)
    reg("e_propuestas", txt(page, "#careoTools", 1500))
    reg("e_pick", page.evaluate("() => { const s=document.querySelector('#careoPick'); return s ? [...s.options].map(o=>o.text).join(' || ') : 'no select' }"))
    dos_temas(page, "e_careo_ancho")
    blur(page); page.keyboard.press("c"); time.sleep(1.5)
    page.keyboard.press("Escape"); time.sleep(1)
    # --- (f) tendencia
    st = plegar(page, filtros=True, lista=False); reg("f_pliegues", st)
    buscar(page, Q_CV)
    reg("f_meta", txt(page, "#resultMeta"))
    blur(page); page.keyboard.press("t"); time.sleep(6)
    reg("f_panel", txt(page, "#trendPanel", 3000))

    def fijar_mes(objetivo="febrero de 1933", maxn=260):
        page.focus("#trendChart"); page.keyboard.press("Home"); time.sleep(0.3)
        for i in range(maxn):
            live = page.evaluate("() => (document.querySelector('#trendLive')||{}).textContent || ''")
            if objetivo in live:
                time.sleep(0.4)
                return live
            page.keyboard.press("ArrowRight"); time.sleep(0.04)
        return None

    for t in ("light", "dark"):
        if page.evaluate("() => document.documentElement.dataset.theme") != t:
            page.click("#themeBtn"); time.sleep(1.2)
        blur(page)
        page.mouse.move(5, 5); time.sleep(0.3)
        suf = "claro" if t == "light" else "oscuro"
        shot(page, f"f_tendencia_todo_{suf}", el="#trendPanel")
        live = fijar_mes()
        reg(f"f_tip_todo_{suf}", {"live": live, "tip": txt(page, "#trendChart .trend-tip", 500)})
        shot(page, f"f_tendencia_todo_tip_{suf}", el="#trendPanel")
        page.locator("#trendPanel button", has_text="Constituyentes").first.click(); time.sleep(3)
        live = fijar_mes()
        reg(f"f_tip_const_{suf}", {"live": live, "tip": txt(page, "#trendChart .trend-tip", 500), "panel": txt(page, "#trendPanel", 1500)})
        shot(page, f"f_tendencia_const_tip_{suf}", el="#trendPanel")
        # enero de 1933, sin sesiones
        live = fijar_mes("enero de 1933")
        reg(f"f_tip_enero_{suf}", {"live": live, "tip": txt(page, "#trendChart .trend-tip", 500)})
        page.locator("#trendPanel button", has_text="Todo").first.click(); time.sleep(3)
    if page.evaluate("() => document.documentElement.dataset.theme") != "light":
        page.click("#themeBtn"); time.sleep(1)
    blur(page); page.keyboard.press("t"); time.sleep(1.5)
    # --- (k) Sobre este corpus (estado de «Recordar la base» en la primera visita)
    plegar(page, filtros=False, lista=False)
    page.get_by_text("Sobre este corpus").first.click(); time.sleep(2)
    reg("k_primera_visita", sobre_corpus(page))
    for i in range(90):  # esperar a que termine el guardado automático, si lo hay
        s = sobre_corpus(page)
        if "Guardando" not in s and "%" not in s.split("EN ESTE NAVEGADOR")[-1][:300]:
            break
        time.sleep(2)
    reg("k_tras_espera", sobre_corpus(page))
    page.locator("#fg-fuente").first.scroll_into_view_if_needed(); time.sleep(0.6)
    dos_temas(page, "k_sobre_corpus_panel", el="#fg-fuente")
    reg("storage", page.evaluate("async () => JSON.stringify({persisted: navigator.storage.persisted ? await navigator.storage.persisted() : null, estimate: await navigator.storage.estimate()})"))
    ctx.close()


def abrir_biblioteca(page, nombre="Debate · Sufragio femenino"):
    page.get_by_role("button", name="Mis bibliotecas").click(); time.sleep(2)
    page.get_by_text(nombre, exact=True).first.click(); time.sleep(3)


def esperar(page, js, maxs=240):
    for i in range(maxs):
        if page.evaluate(js):
            return i
        time.sleep(1)
    return -1


def f2(p):
    ctx, page = launch(p)
    open_explorer(page)
    plegar(page, filtros=False, lista=False)
    page.get_by_role("button", name="Mis bibliotecas").click(); time.sleep(2)
    reg("g_side_vacia", txt(page, "#side", 1500))
    page.click("#projLibBtn"); time.sleep(1.5)
    page.check('#proyLista input[data-clave="L2-B2"]'); time.sleep(0.6)
    reg("g_dialogo", txt(page, "#dlgProyecto", 5000))
    dos_temas(page, "g_dialogo_bibliotecas_marcada", el="#dlgProyecto")
    dos_temas(page, "g_dialogo_bibliotecas_ventana")
    page.click("#proyAnadir"); time.sleep(6)
    reg("g_side_anadida", txt(page, "#side", 2000))
    page.get_by_text("Debate · Sufragio femenino", exact=True).first.click(); time.sleep(3)
    reg("g_lista", txt(page, "#list", 1200))
    page.locator("#list").get_by_text("Léxico", exact=True).first.click()
    esperar(page, "() => /G²/.test(document.querySelector('#list').innerText) && !/Calculando/i.test(document.querySelector('#list').innerText)")
    time.sleep(2)
    plegar(page, filtros=True)
    reg("g_lexico", txt(page, "#list", 2500))
    dos_temas(page, "g_lexico_sufragio")
    # coocurrencias
    page.locator("#list").get_by_text("Coocurrencias", exact=True).first.click()
    esperar(page, "() => /modularidad/i.test(document.querySelector('#list').innerText) && !/calculando/i.test(document.querySelector('#list').innerText.slice(0,2000))")
    time.sleep(2.5)
    reg("h_coo", txt(page, "#list", 2500))
    card = page.evaluate("""() => { const hs=[...document.querySelectorAll('#list *')].filter(e=>e.children.length==0 && /^mujer española · mujer · femenina$/.test(e.textContent.trim()));
        return hs.map(h=>{let c=h; for(let i=0;i<8;i++){ if(c.parentElement && c.parentElement.innerText.includes('Leer primero:')) {c=c.parentElement; break;} c=c.parentElement;} c.setAttribute('data-cap','tema1'); return c.tagName+'.'+c.className+' '+Math.round(c.getBoundingClientRect().height)}) }""")
    reg("h_card", card)
    page.locator("[data-cap=tema1]").first.scroll_into_view_if_needed(); time.sleep(0.8)
    reg("h_tema1", txt(page, "[data-cap=tema1]", 2500))
    dos_temas(page, "h_coocurrencias_tema1", el="[data-cap=tema1]")
    # menciones
    page.locator("#list").get_by_text("Menciones", exact=True).first.click()
    esperar(page, "() => { const r=document.querySelector('#menRed'); return r && r.querySelector('svg, canvas') && !/calculando|analizando/i.test(document.querySelector('#list').innerText.slice(0,1500)) }")
    time.sleep(3)
    reg("i_cabeza", txt(page, "#list", 1500))
    sec = page.evaluate("""() => { const m=document.querySelector('#menMatriz'); if(!m) return 'no #menMatriz';
        let s=m; for(let i=0;i<5 && s.parentElement;i++){ s=s.parentElement; if(/Entre partidos/.test(s.innerText.slice(0,200))) break; }
        s.setAttribute('data-cap','matriz'); const b=s.getBoundingClientRect(); return s.tagName+'.'+s.className+' '+Math.round(b.width)+'x'+Math.round(b.height)+' :: '+s.innerText.slice(0,500) }""")
    reg("i_matriz_seccion", sec)
    page.locator("[data-cap=matriz]").first.scroll_into_view_if_needed(); time.sleep(0.8)
    dos_temas(page, "i_menciones_matriz_seccion", el="[data-cap=matriz]")
    page.locator("#menMatriz").first.scroll_into_view_if_needed(); time.sleep(0.5)
    dos_temas(page, "i_menciones_matriz", el="#menMatriz")
    ctx.close()


def f3(p):
    """E4: navegación sin texto en 1936-1939 y una biblioteca propia (nota, etiquetas, .2replib sin descargar)."""
    ctx, page = launch(p)
    open_explorer(page)
    plegar(page, filtros=False, lista=False)
    reg("e4_fkeys", page.evaluate("() => [...new Set([...document.querySelectorAll('input[data-fkey]')].map(i=>i.dataset.fkey))]"))
    # abrir el grupo Legislatura si está plegado
    page.evaluate("() => { for (const d of document.querySelectorAll('details.fgroup')) { if (/Legislatura/.test(d.querySelector('summary').innerText)) d.open = true; } }")
    time.sleep(0.5)
    reg("e4_legs", page.evaluate("() => [...document.querySelectorAll('input[data-fkey=legislatures]')].map(i=>i.value+' '+i.closest('label').innerText.replace(/\\s+/g,' '))"))
    page.check('input[data-fkey="legislatures"][value="1936-1939"]'); time.sleep(2.5)
    reg("e4_meta_leg", txt(page, "#resultMeta"))
    page.fill("#fDesde", "1936-07-18"); page.press("#fDesde", "Tab"); time.sleep(2.5)
    reg("e4_meta_desde", txt(page, "#resultMeta"))
    reg("e4_primeros", page.evaluate("() => [...document.querySelectorAll('article.hit')].slice(0,6).map(a=>a.innerText.split('\\n').slice(0,2).join(' | '))"))
    page.evaluate("() => { const r=document.querySelector('#fDesde'); r && r.scrollIntoView({block:'center'}); }")
    dos_temas(page, "e4_navegacion_guerra")
    # ordenar: ¿qué opciones hay sin texto?
    reg("e4_orden", page.evaluate("() => { const s=document.querySelector('#sortSel, select'); return s ? [...s.options].map(o=>(o.selected?'*':'')+o.text).join(' | ') : null }"))
    # --- biblioteca propia desde «Guardar todo»
    page.click("#saveAllBtn"); time.sleep(1.5)
    reg("e4_guardar_dialogo", txt(page, "#dlgAdd", 1500))
    page.fill("#newColName", "Las Cortes en guerra (prueba)")
    page.fill("#addNote", "Intervenciones de la legislatura 1936-1939 desde el 18 de julio de 1936.")
    page.fill("#addTags", "guerra, prueba")
    time.sleep(0.5)
    dos_temas(page, "e4_guardar_todo_dialogo", el="#dlgAdd")
    page.click("#addConfirm"); time.sleep(3)
    try:
        if page.locator("#addBig").is_visible():
            reg("e4_addBig", txt(page, "#addBig", 600))
            page.check("#addBigOk"); page.click("#addConfirm"); time.sleep(3)
    except Exception as e:
        reg("e4_addBig_err", str(e)[:200])
    reg("e4_toast", page.evaluate("() => [...document.querySelectorAll('.toast, [role=status]')].map(e=>e.innerText).join(' | ')"))
    page.get_by_role("button", name="Mis bibliotecas").click(); time.sleep(2)
    reg("e4_side", txt(page, "#side", 2000))
    page.get_by_text("Las Cortes en guerra (prueba)", exact=True).first.click(); time.sleep(3)
    reg("e4_lista", txt(page, "#list", 2000))
    dos_temas(page, "e4_biblioteca_propia")
    # exportar biblioteca: solo el diálogo
    try:
        page.get_by_role("button", name="Exportar biblioteca").first.click(); time.sleep(1.5)
        reg("e4_exportar_bib", txt(page, "#dlgExport", 2000))
        reg("e4_formatos", page.evaluate("() => [...document.querySelectorAll('#expFormat option')].map(o=>(o.disabled?'-':'')+(o.selected?'*':'')+o.value).join(' | ')"))
        dos_temas(page, "e4_exportar_biblioteca_dialogo", el="#dlgExport")
        page.keyboard.press("Escape"); time.sleep(0.8)
    except Exception as e:
        reg("e4_exportar_err", str(e)[:300])
    ctx.close()


def f4(p):
    """Lector de Campoamor con las tres clases de acotación a la vista (verde, gris y teja)."""
    ctx, page = launch(p)
    page.add_init_script("try{localStorage.setItem('panelPlegado','0');localStorage.setItem('listaPlegada','0')}catch(e){}")
    open_explorer(page)
    buscar(page, Q_VOTO)
    page.click('article.hit[data-id="6079"]'); time.sleep(2.5)
    plegar(page, filtros=True, lista=True)
    pos = page.evaluate("""() => { const r=document.querySelector('#reader');
        const a=[...r.querySelectorAll('.acot, .acot-inline')].find(e=>/Muy bien\\. Aplausos/.test(e.innerText));
        if(!a) return 'no';
        a.scrollIntoView({block:'start'}); r.scrollTop -= 150;
        const q=[...r.querySelectorAll('.acot, .acot-inline')].map(e=>e.className.split(' ').pop()+':'+e.innerText.replace(/\\s+/g,' ')+' y='+Math.round(e.getBoundingClientRect().top));
        return q.join(' || ') }""")
    time.sleep(0.8)
    reg("f4_acotaciones", pos)
    dos_temas(page, "c_lector_campoamor_acotaciones")
    ctx.close()


def c4(p):
    """¿La carga siguiente vuelve a descargar el corpus?"""
    ctx, page = launch(p)
    open_explorer(page)
    plegar(page, filtros=False, lista=False)
    page.get_by_text("Sobre este corpus").first.click(); time.sleep(2)
    reg("c4_panel", sobre_corpus(page))
    ctx.close()


if __name__ == "__main__":
    fase = sys.argv[1]
    REG["fase"] = fase
    with sync_playwright() as p:
        try:
            globals()[fase](p)
        except Exception as e:
            reg("ERROR", repr(e)[:1500])
            raise
        finally:
            guardar_reg()
    log("fin", fase)
