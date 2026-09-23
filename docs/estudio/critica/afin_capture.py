"""Inventario y capturas de la app publicada Afinidades Elegidas (solo lectura)."""
import json, os
from playwright.sync_api import sync_playwright

BASE = "https://rodrodr.github.io/afinidades/"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "capturas_afinidades")
os.makedirs(OUT, exist_ok=True)
log = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, locale="es-ES", device_scale_factor=1)
    pg = ctx.new_page()
    msgs = []
    pg.on("console", lambda m: msgs.append(f"{m.type}: {m.text}"[:300]))
    reqs = []
    pg.on("request", lambda r: reqs.append(r.url))
    pg.goto(BASE, wait_until="networkidle", timeout=90000)
    pg.wait_for_timeout(2500)
    # cerrar un posible tour de driver.js
    for sel in [".driver-popover-close-btn", "button:has-text('Saltar')", "button:has-text('Cerrar')"]:
        try:
            if pg.locator(sel).first.is_visible():
                pg.locator(sel).first.click(); pg.wait_for_timeout(500)
        except Exception:
            pass
    pg.screenshot(path=f"{OUT}/home_1440.png")
    pg.screenshot(path=f"{OUT}/home_1440_full.png", full_page=True)
    log["nav"] = pg.eval_on_selector_all(".nav-btn", "els=>els.map(e=>({view:e.dataset.view,text:e.innerText.trim(),disabled:e.classList.contains('disabled')}))")
    log["h1h2"] = pg.eval_on_selector_all("h1,h2,h3", "els=>els.filter(e=>e.offsetParent!==null).map(e=>e.tagName+': '+e.innerText.trim().slice(0,120))")
    log["home_text"] = pg.inner_text("#view-home")[:6000] if pg.locator("#view-home").count() else ""
    for v in [n["view"] for n in log["nav"] if n.get("view") and not n.get("disabled")]:
        try:
            pg.evaluate(f"showView('{v}')")
            pg.wait_for_timeout(3500)
            pg.screenshot(path=f"{OUT}/{v}_1440.png")
            sel = f"#view-{v}"
            txt = pg.inner_text(sel) if pg.locator(sel).count() else ""
            log[f"view_{v}"] = {
                "hash": pg.evaluate("location.hash"),
                "text": txt[:4000],
                "controls": pg.eval_on_selector_all(f"{sel} select, {sel} input, {sel} button",
                    "els=>els.filter(e=>e.offsetParent!==null).map(e=>(e.tagName+'#'+(e.id||'')+' '+(e.innerText||e.placeholder||e.value||'').trim()).slice(0,80))")[:60],
                "canvas": pg.eval_on_selector_all(f"{sel} canvas", "els=>els.length"),
                "svg": pg.eval_on_selector_all(f"{sel} svg", "els=>els.length"),
            }
        except Exception as e:
            log[f"view_{v}"] = {"error": str(e)[:300]}
    # enlace profundo a un diputado
    pg.goto(BASE + "#diputados/783", wait_until="networkidle", timeout=90000)
    pg.wait_for_timeout(4000)
    pg.screenshot(path=f"{OUT}/diputado_783_1440.png")
    log["deep_link_783"] = {"hash": pg.evaluate("location.hash"),
                            "profile_visible": pg.evaluate("(()=>{const e=document.getElementById('dip-profile');return !!e && e.style.display!=='none' && e.offsetParent!==null})()"),
                            "text": (pg.inner_text("#dip-profile") if pg.locator("#dip-profile").count() else "")[:1500]}
    # móvil
    ctx2 = b.new_context(viewport={"width": 390, "height": 844}, locale="es-ES", is_mobile=True, has_touch=True, device_scale_factor=2)
    pm = ctx2.new_page()
    pm.goto(BASE, wait_until="networkidle", timeout=90000)
    pm.wait_for_timeout(2500)
    pm.screenshot(path=f"{OUT}/home_390.png")
    log["mobile_scrollWidth"] = pm.evaluate("document.documentElement.scrollWidth")
    # tema: prefers-color-scheme dark
    ctx3 = b.new_context(viewport={"width": 1440, "height": 900}, color_scheme="dark", locale="es-ES")
    pd_ = ctx3.new_page()
    pd_.goto(BASE, wait_until="networkidle", timeout=90000)
    pd_.wait_for_timeout(2000)
    pd_.screenshot(path=f"{OUT}/home_1440_prefers_dark.png")
    log["bg_prefers_dark"] = pd_.evaluate("getComputedStyle(document.body).backgroundColor")
    log["bg_default"] = pg.evaluate("getComputedStyle(document.body).backgroundColor")
    log["console"] = msgs[:40]
    log["third_party_hosts"] = sorted({u.split('/')[2] for u in reqs if u.startswith('http') and 'rodrodr.github.io' not in u})
    b.close()
json.dump(log, open(os.path.join(OUT, "inventario.json"), "w"), ensure_ascii=False, indent=1)
print(json.dumps({k: (v if k in ("nav", "h1h2", "deep_link_783", "mobile_scrollWidth", "bg_prefers_dark", "bg_default", "third_party_hosts", "console") else "…") for k, v in log.items()}, ensure_ascii=False, indent=1)[:6000])
