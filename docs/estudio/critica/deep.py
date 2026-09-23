from playwright.sync_api import sync_playwright
import sys
BASE="https://rodrodr.github.io/afinidades/"
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1440,"height":900},locale="es-ES"); pg=ctx.new_page()
    pg.goto(BASE+"#diputados/"+sys.argv[1], wait_until="networkidle", timeout=90000); pg.wait_for_timeout(6000)
    for sel in [".driver-popover-close-btn"]:
        try:
            if pg.locator(sel).first.is_visible(): pg.locator(sel).first.click(); pg.wait_for_timeout(600)
        except Exception: pass
    vis=pg.evaluate("(()=>{const e=document.getElementById('dip-profile');return e?[e.style.display, e.offsetParent!==null, e.innerText.slice(0,400)]:null})()")
    print(pg.evaluate("location.hash"), vis)
    pg.screenshot(path="capturas_afinidades/deeplink_diputado_"+sys.argv[1]+".png")
    b.close()
