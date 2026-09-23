"""Recorta, reduce a ≤ 1.600 px de ancho y guarda las capturas en luz_site/src/assets/explorador/.
Recortes en píxeles de la captura en bruto (densidad 2x: 1 px CSS = 2 px). Sin retoques: solo recorte y reducción."""
import hashlib, json, os, sys
from PIL import Image

BASE = os.environ.get("LUZ_CAPTURAS", os.path.expanduser("~/.cache/luz_site/capturas"))
RAW = BASE + "/raw"
DEST = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # src/assets/explorador
ANCHO_MAX = 1600

# destino (sin extensión) : (captura en bruto sin sufijo de tema, recorte (x0, y0, x1, y1) o None)
PRINCIPALES = {
    "busqueda": ("b_busqueda_voto", None),
    "tendencia": ("f_tendencia_const_tip", None),
    "lector": ("c_lector_campoamor_ancho", None),
    "acotaciones": ("c_lector_campoamor_acotaciones", "ACOT"),
    "corrida": ("d_sesion_corrida", None),
    "careo": ("e_careo_ancho", None),
    "bibliotecas": ("g_dialogo_bibliotecas_marcada", None),
    "lexico": ("g_lexico_sufragio", (0, 0, 2880, 1772)),
    "coocurrencias": ("h_coocurrencias_tema1", (0, 0, None, 496)),
    "menciones": ("i_menciones_matriz", None),
    "exportar": ("j_exportar_dialogo", None),
    "sobre": ("k_sobre_corpus_panel", (0, 0, None, 1487)),
}
OTRAS = {
    "inicio": ("a_inicial", None),
    "tendencia-todo": ("f_tendencia_todo", None),
    "menciones-con-titulo": ("i_menciones_matriz_seccion", None),
    "hilo-de-la-sesion": ("c_lector_campoamor_hilo", None),
    "navegacion-guerra": ("e4_navegacion_guerra", None),
    "biblioteca-propia": ("e4_biblioteca_propia", None),
    "exportar-biblioteca": ("e4_exportar_biblioteca_dialogo", None),
}
# Recorte de «acotaciones»: la hoja del lector, del filete de la barra de herramientas al pie de la ventana.
RECORTES_EXTRA = {"ACOT": [677, 303, 2355, 1800]}


def procesar(dest, fuente, recorte, tema):
    src = f"{RAW}/{fuente}_{tema}.png"
    if not os.path.exists(src):
        return {"dest": dest, "falta": src}
    im = Image.open(src).convert("RGB")
    if isinstance(recorte, str):
        recorte = RECORTES_EXTRA.get(recorte)
    if recorte:
        x0, y0, x1, y1 = recorte
        im = im.crop((x0, y0, x1 or im.width, y1 or im.height))
    w, h = im.size
    if w > ANCHO_MAX:
        im = im.resize((ANCHO_MAX, round(h * ANCHO_MAX / w)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im.save(dest, "PNG", optimize=True)
    return {"dest": dest.replace(DEST + "/", ""), "fuente": os.path.basename(src), "recorte_2x": recorte,
            "px": list(im.size), "bytes": os.path.getsize(dest),
            "sha256": hashlib.sha256(open(dest, "rb").read()).hexdigest()}


if __name__ == "__main__":
    out = []
    for grupo, carpeta in ((PRINCIPALES, ""), (OTRAS, "otras/")):
        for nombre, (fuente, recorte) in grupo.items():
            out.append(procesar(f"{DEST}/{carpeta}{nombre}.png", fuente, recorte, "claro"))
            out.append(procesar(f"{DEST}/oscuro/{carpeta}{nombre}.png", fuente, recorte, "oscuro"))
    json.dump(out, open(BASE + "/manifiesto.json", "w"), ensure_ascii=False, indent=1)  # fuera del sitio
    for r in out:
        print(r)
