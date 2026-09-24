"""esta · El juego «¿Esta o esta?» de Las Cortes (petición del investigador, 24-09-2026).

Dos frases dichas en el pleno sobre el mismo asunto, sin autor; el lector elige la que firmaría. Al final, su familia de
partidos, su lugar en el eje de EI a ED y los diputados con los que más coincidió. Las doce parejas son las que aprobó
el investigador (docs/juegos/ESTA_O_ESTA_candidatas.md, las marcadas con ★), con el texto literal de la base, erratas
de lectura incluidas. «…» marca un corte: cada trozo tiene que estar letra a letra en su fila. Partido, familia e
ideología son los que trae la base para esa fila. Si algo no cuadra, se para.

Escribe `src/data/esta.json`. Se puede ejecutar solo, sin el resto del exportador:
    python3 exportador/modulos/esta.py [--db ~/.cache/luz_site/corpus.sqlite]
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent))

from comun import FAMILIA_ETIQ, FAMILIA_NORM, RAIZ, exige, leer_json  # noqa: E402

EJE = ["EI", "I", "CI", "C", "CD", "D", "ED"]
# (clave, [(fila, frase), (fila, frase)]). La primera suele quedar a la izquierda de la segunda; el juego las baraja.
PAREJAS = [
    ("iglesia", [(7531, "España ha dejado de ser católica: el problema político consiguiente es organizar el Estado en forma tal que puede adecuado a esta fase nueva e histórica del pueblo español."),
                 (7280, "Nosotros entendemos que el proyecto constitucional, tal como viene redactado en el dictamen, es un proyecto de persecución religiosa, y por consiguiente, nosotros en esas condiciones no podemos aceptarlo.")]),
    ("ordenes", [(7366, "Expúlsense o no las Ordenes religiosas, la enseñanza debe ser absolutamente laica, debe ser función exclusiva del Estado."),
                 (7557, "Con la disolución de las Ordenes religiosas se quebrantan derechos de unos ciudadanos que nadie es capaz de distinguir de nosotros mismos.")]),
    ("mujer", [(6079, "Yo, Sres. Diputados, me siento ciudadana antes que mujer, y considero que sería un profundo error político dejar a la mujer al margen de ese derecho…"),
               (6074, "…no es cuestión de capacidad; es cuestión de oportunidad para la República.")]),
    ("divorcio", [(8076, "Yo creo que el matrimonio debe sustentarse de una manera intima, porque lo demás son como sepulcros blanqueados con la coacción legal y con la coacción religiosa."),
                  (3356, "Es que el divorcio resulta fuente de todas las debilidades y de todas las pasiones.")]),
    ("renta", [(28240, "La tierra debe ser siempre un instrumento de trabajo; la tierra no debe ser nunca un origen de renta."),
               (90393, "Entiendo que no es justa la renta cuando existen abusos, y nadie que abusa debe tener legítimo derecho a seguir haciéndolo; pero la renta de la tierra es absolutamente indispensable.")]),
    ("tierra", [(29080, "Para construir una verdadera República popular hay que empezar, irremisiblemente, por devolver la tierra al pueblo."),
                (29390, "Nosotros queremos que el mayor número posible de obreros sea convertido en propietarios, de toda clase de propiedad, pero principalmente la rústica; pero por modos justos y convenientes.")]),
    ("cataluna", [(28735, "No se piense que porque Cataluña es un pueblo reducido sea un pequeño pueblo."),
                  (32314, "Nosotros legislamos pensando en la Nación española y ellos ejecutarán pensando en la nación catalana.")]),
    ("parlamento", [(72101, "…nosotros no tendremos más que una manera de morir, que es por un voto contrario en el Parlamento."),
                    (69232, "Los reyes absolutos podían equivocarse; el sufragio popular puede equivocarse; porque nunca es la verdad ni es el bien una cosa que se manifiestan ni se profese por la voluntad.")]),
    ("clases", [(69308, "Pero, cómo es posible hacer una política entre dos enemigos; entre la clase explotadora y la clase explotada?"),
                (99834, "…hay que extirpar el marxismo del obrerismo; de lo contrario, el marxismo matará al obrerismo…")]),
    ("espana", [(114168, "Yo en el Urumea hice una frase que han combatido; dije que preferiría una España roja a una España rota."),
                (114317, "…entre la España roja y la España rota, de que se hablaba ayer, hay otra España, señores del Gobierno, la que nosotros preconizamos, que es la España justa.")]),
    ("octubre", [(86178, "…para evitar la revolución, para evitar otra revolución que pueda venir, que siempre es una calamidad, debemos hacer nosotros la económica."),
                 (84395, "Cuando se hace justicia castigando al perturbador y al rebelde, se debe también recompensar, para estimulo moral, a los hombres que saben cumplir e incluso superar el cumplimiento del deber.")]),
    ("orden", [(115567, "Hay que condenar el desmán, la violencia, el terrorismo, dondequiera que se manifieste y hágalos quien los haga."),
               (115885, "Nosotros abogamos por la subsistencia de un orden social que creemos comprometido gravemente en estas horas por la política vacillante del Gobierno de la República.")]),
]


def exportar(ctx) -> dict:
    db = ctx.v3_db()
    grafias = leer_json(RAIZ / "src" / "data" / "grafias.json")["grafias"]
    parejas, C = [], {}
    for clave, frases in PAREJAS:
        exige(len(frases) == 2 and frases[0][0] != frases[1][0], f"esta: la pareja «{clave}» no son dos filas distintas")
        lados = []
        for lado, (i, frase) in zip("ab", frases):
            r = db.execute("SELECT date, num_session, rep_id, party, party_family, ideology, speech FROM speeches WHERE id = ?", (i,)).fetchone()
            exige(r is not None, f"esta: la fila {i} no existe")
            fecha, ses, rid, partido, familia, ideo, texto = r
            t = re.sub(r"\s+", " ", texto or "")
            trozos = [x.strip() for x in frase.split("…") if x.strip()]
            exige(all(x in t for x in trozos), f"esta: la frase {clave}.{lado} no está letra a letra en la fila {i}")
            exige(ideo in EJE, f"esta: la fila {i} no trae una ideología del eje ({ideo!r})")
            g = grafias.get(str(rid))
            exige(g is not None, f"esta: el orador de la fila {i} (rep_id {rid}) no tiene grafía")
            fam = FAMILIA_NORM.get(familia, familia)
            lados.append({"id": i, "fecha": fecha, "sesion": ses, "rep_id": rid, "orador": g["uso"], "partido": partido,
                          "familia": FAMILIA_ETIQ.get(fam, fam), "ideologia": ideo, "frase": frase})
            C[f"esta.{clave}.{lado}.id"] = ctx.cifra(i, "id", "v3", f"corpus.sqlite › speeches.id: frase {lado} de la pareja «{clave}»")
        parejas.append({"clave": clave, "lados": lados})
    datos = {
        "_meta": {"base": "v3", "fuente": "corpus.sqlite del explorador: speech, party, party_family, ideology", "fecha": ctx.hoy,
                  "criterio": "parejas aprobadas por el investigador (docs/juegos/ESTA_O_ESTA_candidatas.md); texto literal; «…» marca un corte"},
        "eje": EJE,
        "parejas": parejas,
    }
    ctx.escribir_json("esta.json", datos)
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
        print(f"{k:28} {c['v']:>8}   {c['f']}")
