"""aplausos · El juego «El aplausómetro» de El Diario (petición del investigador, 24-09-2026).

Cada ronda es una frase de un diputado tal como está en su fila de la base, seguida de la acotación con que el
taquígrafo anotó la reacción de la Cámara: aplausos, «Muy bien», risas, rumores o protestas. El lector adivina la
acotación. Ninguna se inventa: la frase tiene que estar letra a letra en la fila, la acotación tiene que ir justo
detrás, y la fila no puede ser de la Presidencia. Si algo no cuadra, se para.

No cuenta acotaciones: las cuentas por clase quedan para la edición 0.2 (D-11). Solo da las frases y lo que anotó el
taquígrafo, con su fila.

Escribe `src/data/aplausos.json`. Se puede ejecutar solo, sin el resto del exportador:
    python3 exportador/modulos/aplausos.py [--db ~/.cache/luz_site/corpus.sqlite]
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent))

from comun import RAIZ, exige, leer_json  # noqa: E402

CATEGORIAS = ["aplausos", "muy_bien", "risas", "rumores", "protestas"]
PATRON = {
    "aplausos": re.compile(r"\baplausos\b", re.I), "muy_bien": re.compile(r"\bmuy bien\b", re.I),
    "risas": re.compile(r"\brisas\b", re.I), "rumores": re.compile(r"\brumores\b", re.I),
    "protestas": re.compile(r"\bprotestas\b", re.I),
}
# (clave, categoría, fila, la frase tal como está en la fila, la acotación que la sigue). Cuatro por categoría: cada
# partida saca dos de cada una.
RONDAS = [
    ("maura", "risas", 21037, "Estoy hablando y diciendo mi opinión, si me lo permitís, y si no, también.", "(Risas.)"),
    ("azana", "risas", 50380, "Ya es mucho que haya divorcio, porque supone que ha habido matrimonio", "(Risas.)"),
    ("chapaprieta", "risas", 105702, "Pues no lo pueden saber, porque yo tampoco lo sé", "(Risas.)"),
    ("royo_caspe", "risas", 3622, "Pero aunque no soy religioso, como soy algo creyente, recuerdo que la clave del Compromiso de Caspe fue San Vicente Ferrer, y me cuesta trabajo creer que un santo hiciese tales barbaridades.", "(Grandes risas.)"),
    ("royo_siento", "aplausos", 4319, "Pues yo me siento, pido perdón a la Cámara y hemos terminado.", "(Aplausos.)"),
    ("prieto", "aplausos", 3674, "Consolidar la República hoy es levantar a España, y cumplir el deber de republicanos es cumplir netamente el deber de los españoles.", "(Grandes aplausos.)"),
    ("campoamor_enmienda", "aplausos", 18816, "A ruegos de la Comisión retiro la enmienda.", "(Aplausos.)"),
    ("casares", "aplausos", 116867, "Los enemigos crecen, no es ya que ladren, es que intentan morder; y yo os digo, amigos: cabalguemos; pero a galope y a pasarlos por encima.", "(Aplausos.)"),
    ("asua", "muy_bien", 3006, "Somos nosotros, los socialistas, no un partido político, sino una civilización", "(Muy bien.)"),
    ("unamuno", "muy_bien", 8905, "Nuestros hijos, nuestros nietos, conocerán en España un partido antipedagogista, porque yo temo mucho a la pedantería de los que nos arrogamos el sacerdocio de la cultura.", "(Muy bien, muy bien.)"),
    ("nelken", "muy_bien", 52163, "Por lo visto Cristo, dijo: \"Que vengan a mí los de legítimo matrimonio y los demás que se mueran de hambre\".", "(Muy bien.)"),
    ("gil_robles", "muy_bien", 69230, "Después de esa unanimidad de criterio, ya puede venir el coro de despechados a decir que esta Cámara no es la representación de la voluntad nacional.", "(Muy bien.)"),
    ("companys", "rumores", 6093, "Ya sé que toda España no es Cataluña.", "(Rumores.)"),
    ("ortega", "rumores", 63526, "Deseo, por tanto, hacer constar que este precepto no obliga a ningún español, y que si alguna vez yo publico un periódico, no lo acataré.", "(Rumores.)"),
    ("besteiro", "rumores", 73492, "Yo me figuro que van camino de ser cada vez más fervientes republicanos; pero ¿de qué República?", "(Rumores.)"),
    ("campoamor_ateneo", "rumores", 6077, "¿Quién nutrió la manifestación pro responsabilidad del Ateneo, con motivo del desastre de Annual, más que las mujeres, que iban en mayor número que los hombres?", "(Rumores.)"),
    ("balbontin", "protestas", 68865, "Pido la palabra para una cuestión de orden.", "(Grandes protestas.)"),
    ("fuentes_pila", "protestas", 84218, "Que conste eso en el Diario de Sesiones.", "(Protestas.)"),
    ("calvo_sotelo", "protestas", 83992, "He aludido a las voluntades superiores, de cuyas vacilaciones son reflejo, evidentemente, las del Gobierno.", "(Fuertes protestas.)"),
    ("ibarruri", "protestas", 118178, "Sobre todo, sabiendo cómo se cotizan ciertas defensas.", "(Fuertes protestas.)"),
]
PRESIDENCIA = re.compile(r"PRESIDEN", re.I)
NO_PRESIDENCIA = re.compile(r"CONSEJO|GOBIERNO|COMISI|REP[UÚ]BLICA", re.I)


def exportar(ctx) -> dict:
    db = ctx.v3_db()
    grafias = leer_json(RAIZ / "src" / "data" / "grafias.json")["grafias"]
    for cat in CATEGORIAS:
        exige(sum(r[1] == cat for r in RONDAS) >= 2, f"aplausos: menos de dos rondas de «{cat}»")
    rondas, C = [], {}
    for clave, cat, i, frase, acot in RONDAS:
        r = db.execute("SELECT date, num_session, speaker, rep_id, party, speech FROM speeches WHERE id = ?", (i,)).fetchone()
        exige(r is not None, f"aplausos: la fila {i} no existe")
        fecha, ses, spk, rid, partido, texto = r
        exige(not (PRESIDENCIA.search(spk or "") and not NO_PRESIDENCIA.search(spk or "")), f"aplausos: la fila {i} es de la Presidencia")
        t = re.sub(r"\s+", " ", texto or "")
        k = t.find(frase)
        exige(k >= 0, f"aplausos: la frase de «{clave}» no está letra a letra en la fila {i}")
        exige(t[k + len(frase):].lstrip().startswith(acot), f"aplausos: tras la frase de «{clave}» no va {acot} (fila {i})")
        exige(PATRON[cat].search(acot) and not any(PATRON[o].search(acot) for o in CATEGORIAS if o != cat),
              f"aplausos: {acot} no es solo de «{cat}»")
        g = grafias.get(str(rid))
        exige(g is not None, f"aplausos: el orador de la fila {i} (rep_id {rid}) no tiene grafía")
        rondas.append({"clave": clave, "cat": cat, "id": i, "fecha": fecha, "sesion": ses, "rep_id": rid,
                       "orador": g["uso"], "partido": partido, "frase": frase, "acotacion": acot})
        C[f"aplausos.{clave}.id"] = ctx.cifra(i, "id", "v3", f"corpus.sqlite › speeches.id: frase seguida de {acot}")
    datos = {
        "_meta": {"base": "v3", "fuente": "corpus.sqlite del explorador, columna speech", "fecha": ctx.hoy,
                  "criterio": "frase letra a letra en su fila, acotación justo detrás, fuera de la Presidencia; sin cuentas por clase (D-11)"},
        "categorias": CATEGORIAS,
        "rondas": rondas,
    }
    ctx.escribir_json("aplausos.json", datos)
    return C


if __name__ == "__main__":
    import argparse
    from comun import V3_DB
    from erratas import _CtxSuelto
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--db", type=Path, default=V3_DB)
    ap.add_argument("--data", type=Path, default=RAIZ / "src" / "data")
    a = ap.parse_args()
    for k, c in exportar(_CtxSuelto(a.db, a.data)).items():
        print(f"{k:34} {c['v']:>8}   {c['f']}")
