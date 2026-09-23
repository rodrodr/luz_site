"""fichas · las cinco fichas de etapa: F05, F09 y los marcadores propios de su copy (dueño: grupo 2, fichas).

Lo llama `cortes.py` (al final de su `exportar`), porque el contrato da a `cortes` las figuras de las fichas y
`exportar.py` solo recorre los módulos de su lista. Aquí no se toca nada de F01 ni de F16 (grupo 1).

Figuras
  F05  Quién tomó la palabra en la etapa. Base v3: filas de habla (role ∉ {summary, remark}) y `chair = false`, por
       `rep_id` y etapa (`ctx.oradores(base="v3")`). Control del plan (H4): 59.938 filas y 21.207.769 palabras, 772
       `rep_id`; por etapa 11.444.854 · 8.116.358 · 1.479.781 · 102.052 · 64.724 palabras.
       Escribe `src/data/oradores_etapa.json` (los diez primeros de cada etapa, con su grafía) y
       `public/datos/oradores_etapa.csv|xlsx` (todos, con `rep_name` tal cual y la columna `grafia`, D-22).
  F09  Qué familias ocupan la palabra. Base V2, sin la Presidencia (`ctx.familias(por="etapa")`, normalización del
       explorador). Orden fijo de familias, de izquierda a derecha por su posición media (ideología del partido,
       ponderada por palabras en todo el corpus): el mismo en las cinco etapas. Escribe `src/data/familias_etapa.json` y
       `public/datos/familias_etapa.csv|xlsx`.

Marcadores del copy de las fichas (`docs/copy_es/cortes_<etapa>.md`, tablas en `docs/marcadores/cortes_<etapa>.md`):
  · anclas `fila.<etapa>.<nombre>.V2|v3`: cada una se comprueba en cada ejecución (misma fecha y sesión; el fragmento
    citado está LETRA A LETRA, con los espacios normalizados, en la fila V2 y en la v3). Si una falla, se para.
  · lecturas del texto de una fila (votos, elecciones, recuentos de listas): base V2 o v3, clave de fuente «L».
  · búsquedas con el índice FTS5 del explorador, bibliotecas del proyecto y correcciones de fecha del changelog.
Las claves que otro grupo declara (`voto.178-59.*`, `voto.318-19.*`, `voto.314-24.*`, `voto.238-5.*`,
`etapa.<E>.listas_nominales.filas|sesiones`: sesiones) NO se exportan aquí, para que no haya dos dueños.
Referencias ejecutables de las que sale esto: `docs/marcadores/cortes_a_comprobar.py` y `comprobar_cortes_b.py`.
"""
from __future__ import annotations

import json
import re

import pandas as pd

from comun import ERRATAS_FECHAS, ETAPA_IDS, FAMILIA_ETIQ, exige, leer_json, plegar

V3_HABLA = "filas de habla v3 (role ∉ {summary, remark}) con chair = false (motor del explorador)"
POSICION = {"EI": 1, "I": 2, "CI": 3, "C": 4, "CD": 5, "D": 6, "ED": 7}
TOKEN = {1: "ei", 2: "i", 3: "ci", 4: "c", 5: "cd", 6: "d", 7: "ed"}
ORDEN_ETAPA = {e: i for i, e in enumerate(ETAPA_IDS)}
UMBRAL_OTRAS = 0.01  # plan § F09: «Las familias por debajo del 1 % se agrupan en «Otras» solo en el gráfico»

# ── anclas: (clave, ids V2, ids v3, fecha, sesión o None, fragmento literal) ───────────────────────────────────────
# Fichas I y II (cortes_a) · III, IV y V (cortes_b). Un fragmento None comprueba solo la fecha y la sesión.
ANCLAS = [
    ("I.mesa_edad", [1], [2], "1931-07-14", 1, "Abrese la sesión"),
    ("I.alcala_resigna", [2], [3], "1931-07-14", 1, "resignar sus Poderes en fecha próxima"),
    ("I.besteiro_elegido", [5], [9], "1931-07-14", 1, "D. Julián Besteiro, 363"),
    ("I.besteiro_ovacion", [10], [18], "1931-07-14", 1, None),
    ("I.asua_proyecto", [2725], [3006], "1931-08-27", 28, "es una Constitución de izquierda"),
    ("I.art24", [6994], [7800], "1931-10-13", 55, "quedó aprobado el artículo 24 por 178 votos contra 59"),
    ("I.azana_baja", [7022], [7833], "1931-10-14", 56, "la sensible baja que nos ha forzado hoy a este cambio ministerial"),
    ("I.constitucion", [13531], [15043], "1931-12-09", 88,
     "Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí"),
    ("I.presidente_republica", [13613], [15140], "1931-12-10", 89,
     "D. Niceto Alcalá-Zamora queda elegido Presidente de la República española"),
    ("I.centro_gravedad", [20689], [23023], "1932-03-09", 132,
     "El centro de gravedad de la política de la República española está en el Parlamento, aquí en este salón"),
    ("I.conllevar", [25527], [28500], "1932-05-13", 165, "es un problema que no se puede resolver, que sólo se puede conllevar"),
    ("I.campalans", [25529], [28502], "1932-05-13", 165, "después de hacerlo el ilustre maestro de todos"),
    ("I.estatuto_presidencia", [25979], [29042], "1932-05-27", 173, None),
    ("I.sanjurjo", [32910], [36780], "1932-08-10", 215, "los sucesos acaecidos esta madrugada en Madrid"),
    ("I.agraria", [37177], [41627], "1932-09-09", 233,
     "votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19"),
    ("I.estatuto_voto", [37178], [41629], "1932-09-09", 233, "Total, 314."),
    ("I.lerroux_gobierno", [61223], [68793], "1933-10-02", 404, "el mejor acto de acatamiento"),
    ("I.azana_1933", [61237], [68809], "1933-10-02", 404, "a ninguno de vosotros se os ocultará"),
    ("I.van_a_morir", [61277], [68855], "1933-10-03", 405, "Señores Diputados, los que van a morir os saludan."),
    ("I.gobierno_se_retira", [61309], [68887], "1933-10-03", 405, "el Gobierno se retira"),
    ("I.voto_187", [61320], [68900], "1933-10-03", 405, "fue aprobada la proposición por 187 votos contra 91"),
    ("I.suspenden", [61355], [68942], "1933-10-03", 405,
     "En vista de la declaración del Gobierno, se suspenden las sesiones de Cortes"),
    ("I.bucle9", [976], [1081], "1931-07-27", 9, "Sánchez Guerra, Ossorio y Gallardo, Sánchez Guerra"),
    ("II.riesgo", [61356], [68945], "1933-12-08", 1, "Abrese la sesión"),
    ("II.alba_interino", [61358], [68949], "1933-12-08", 1, "D. Santiago Alba Bonifaz, 234"),
    ("II.alba_proclamado", [62053], [69744], "1933-12-28", 12, "Queda proclamado Presidente de la Cámara D. Santiago Alba Bonifaz"),
    ("II.lerroux_declaracion", [61596], [69228], "1933-12-19", 6, "cumplimos el grato deber de comparecer a vuestra presencia"),
    ("II.gil_robles_fraccion", [61598], [69230], "1933-12-19", 6, "la fracción numéricamente más importante de la Cámara"),
    ("II.inicuo", [68270], [76798], "1934-04-20", 72,
     "¿Por qué es inicuo el acto que van a realizar las Cortes al aprobar este proyecto de ley?"),
    ("II.amnistia_voto", [68299], [76829], "1934-04-20", 72, "quedó aprobado el artículo y con él el dictamen, por 265 votos contra 45"),
    ("II.samper", [68466], [77029], "1934-05-02", 75, None),
    ("II.tiros", [70714], [79606], "1934-05-31", 91, "Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!"),
    ("II.sesion_secreta", [71329], [80305], "1934-06-08", 96, "han de tratarse en sesión secreta"),
    ("II.luz", [71330], [80306], "1934-06-08", 96, "Luz y taquigrafos."),
    ("II.alba_reglamento", [71331], [80307], "1934-06-08", 96, "no he visto quién ha interrumpido"),
    ("II.esquerra", [71609], [80615], "1934-06-12", 97, "esta minoría catalana, integrada por la Esquerra, federales y Unió Socialista"),
    ("II.se_retiran", [71611], [80617], "1934-06-12", 97, "¿por qué se retiran los Sres. Diputados de la Esquerra catalana?"),
    ("II.vascos", [71613], [80619], "1934-06-12", 97, "La minoría vasca se retira del salón"),
    ("II.cuatro_julio", [74646], [84075], "1934-10-01", 113,
     "dijerase que acaba de transcurrir la noche del 4 de Julio en que el Parlamento acordó suspender sus tareas"),
    ("II.ese_camino", [74648], [84079], "1934-10-01", 113, "ha puesto de relieve que no es posible seguir por ese camino"),
    ("II.huelga", [74669], [84109], "1934-10-09", 114,
     "hasta completar la pacificación y el imperio de la Ley, interrumpida por la huelga revolucionaria"),
    ("II.asturias", [74673], [84113], "1934-10-09", 114, "nuestros compañeros Diputados por Asturias"),
    ("II.vivas", [74703], [84145], "1934-10-09", 114, "son contestados con unánimes aplausos y aclamaciones"),
    ("II.azana_1935", [85330], [96282], "1935-03-20", 173, "un presunto acusado y culpable"),
    ("II.straperlo", [97387], [110040], "1935-10-28", 250, "aparato de juego de salón que ha motivado todo este asunto"),
    ("II.salazar", [97391], [110044], "1935-10-28", 250, "vengo apesadumbrado por una grave acusación"),
    ("II.nombela", [101450], [114599], "1935-12-07", 275, "denuncia del Sr. Nombela"),
    ("II.nuevo_aviso", [101697], [114872], "1935-12-10", 276, "las sesiones hasta nuevo aviso"),
    # etapa III
    ("1936.convocatoria", [], [114890], "1936-03-17", None,
     "Las elecciones generales para Diputados a Cortes se celebrarán en toda España el domingo 16 de Febrero"),
    ("1936.junta_viva", [], [114890], "1936-03-17", None, "solicitó de la Presidencia un viva a la República, negándose el Sr. Presidente"),
    ("1936.presidente_interino", [101701], [114881], "1936-03-16", None, "Queda proclamado Presidente interino del Congreso D. Diego Martínez Barrio"),
    ("1936.viva_cierre", [101705], [114888], "1936-03-16", None, "¡Viva la República! ¡Viva España!"),
    ("1936.retirada", [101915], [115160], "1936-03-31", None,
     "dejamos en vuestras manos, señores de la mayoría, la suerte del sistema parlamentario"),
    ("1936.retirada_re", [101921], [115167], "1936-03-31", None, "la retirada de este salón"),
    ("1936.retirada_ct", [101931], [115177], "1936-03-31", None, "una retirada del Parlamento"),
    ("1936.actas_fin", [102250], [115551], "1936-04-03", None, "la Cámara ha decidido sobre la totalidad de las actas presentadas"),
    ("1936.propuesta_81", [102247], [115547], "1936-04-03", None,
     "procede, con arreglo a lo dispuesto en el art. 81 de la Constitución, examinar y resolver sobre la necesidad del referido decreto"),
    ("1936.articulo_81", [102249], [115549], "1936-04-03", None,
     "el primer acto de las nuevas Cortes será examinar y resolver sobre la necesidad del decreto"),
    ("1936.voto_3abril", [102287], [115595], "1936-04-03", None, "quedó aprobada la proposición por 181 votos contra 88"),
    ("1936.propuesta_destitucion", [102304], [115618], "1936-04-07", None,
     "no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936"),
    ("1936.prieto_7abril", [102323], [115638], "1936-04-07", None, "Señores Diputados, son más sagrados los deberes cuanto más penosos"),
    ("1936.voto_destitucion", [102358], [115674], "1936-04-07", None, "El Reglamento dispone que se haga nominalmente"),
    ("1936.descansando", [102365], [115686], "1936-04-07", None, "se hallaba descansando"),
    ("1936.pasa_a_ser", [102368], [115690], "1936-04-07", None, "pasa a ser Presidente de la República"),
    ("1936.solemne", [103342], [116810], "1936-05-08", None, "para que el Presidente electo preste la promesa"),
    ("1936.acta_solemne", [], [116860], "1936-05-12", None,
     "ocupó la silla de la Presidencia el Vicepresidente en funciones de Presidente D. Luis Jiménez de Asúa"),
    ("1936.crisis", [103383], [116863], "1936-05-12", None, "Encontrándose el Gobierno en crisis se suspenden las sesiones de Cortes"),
    ("1936.incitacion", [102483], [115827], "1936-04-15", None, "Se acaba de hacer una incitación al asesinato"),
    ("1936.no_constaran_15abril", [102484], [115828], "1936-04-15", None, "Esas palabras no constarán en el Diario de Sesiones"),
    ("1936.no_constara_6mayo", [103251], [116698], "1936-05-06", None, "No constará en el Diario de Sesiones"),
    ("1936.no_se_consignan_6mayo", [103182], [116626], "1936-05-06", None, "no se consignan por orden"),
    ("1936.calvo_pide", [104406], [118058], "1936-06-03", None, "no constarán en el Diario de Sesiones"),
    ("1936.no_se_consignan_16junio", [105324], [119098], "1936-06-16", None, "no se consignan por orden"),
    ("1936.galarza", [106289], [120221], "1936-07-01", None, "no se consigna por orden del Sr. Presidente"),
    ("1936.no_constaran_1julio", [106290], [120222], "1936-07-01", None, "no constarán en el Diario de Sesiones"),
    ("1936.cierre_10julio", [107065], [121108], "1936-07-10", None, "Orden del día para el martes"),
    ("1936.sedicioso", [107066], [121111], "1936-10-01", None, "ese movimiento sedicioso"),
    # etapa IV
    ("guerra.nota_volumen", [], [121110], "1936-10-01", None, "CON POSTERIORIDAD AL 18 DE JULIO"),
    ("guerra.no_existe", [], [121110], "1936-10-01", None, "NO EXISTE DATO ALGUNO"),
    ("guerra.palacio_congreso", [107093], [121143], "1936-10-01", None, "Palacio del Congreso, 1.° de Octubre de 1936"),
    ("guerra.aclamacion", [107088], [121135], "1936-10-01", None, "por aclamación quedó aprobada la proposición"),
    ("guerra.estatuto_vasco", [107091], [121140], "1936-10-01", None, "De Estatuto del País Vasco"),
    ("guerra.largo_1oct", [107068], [121113], "1936-10-01", None,
     "Sres. Diputados, vosotros, que me conocéis, sabéis lo parco que soy en palabras"),
    ("guerra.madrid", [107114], [121167], "1936-12-01", None, "nos reunimos en Madrid"),
    ("guerra.valencia", [107095], [121147], "1936-12-01", None, "al pueblo de Valencia"),
    ("guerra.ayuntamiento", [107116], [121170], "1936-12-01", None, "Palacio del Ayuntamiento de Valencia"),
    ("guerra.lonja", [107148], [121219], "1937-10-01", None, "congregarnos en la histórica Lonja"),
    ("guerra.ciertas_cosas", [107196], [121278], "1937-10-02", None, "de ciertas cosas no se puede hablar en la Cámara"),
    ("guerra.albornoz", [107197], [121279], "1937-10-02", None, "Pero si el Parlamento no es eso, no será nada"),
    ("guerra.negrin_1feb1938", [107232], [121328], "1938-02-01", None, "Los crimenes de los fraciosos"),
    ("guerra.reservas", [107288], [121397], "1938-09-30", None, "El Gobierno no acepta, ni admite votos de confianza condicionados y con reservas"),
    ("guerra.monserrat_fecha", [107248], [121345], "1938-02-01", None, "Monserrat, 1 de Febrero de 1938"),
    ("guerra.montserrat", [107276], [121384], "1938-09-30", None, "las Cortes de Montserrat"),
    ("guerra.san_cugat", [107303], [121412], "1938-09-30", None, "del antiguo monasterio de San Cugat del Vallés"),
    ("guerra.voto_convalidacion", [107312], [121427], "1938-10-01", None, "por 168 votos en pro y ninguno en contra"),
    ("guerra.sabadell", [107319], [121437], "1938-10-01", None, "Sabadell, 1.° de Octubre de 1939"),
    ("guerra.hora", [], [121446], "1939-02-01", None, "Abierta la sesión a las veintidos horas treinta minutos"),
    ("guerra.negrin_figueres", [107326], [121447], "1939-02-01", None, "Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra"),
    ("guerra.castillo", [107337], [121459], "1939-02-01", None, "Castillo de Figueras, a primero de Febrero"),
    ("guerra.votacion_nominal_1939", [107340], [121462], "1939-02-01", None, "Se va a votar nominalmente la proposición presentada"),
    ("guerra.sesenta_y_dos", [107341], [121464], "1939-02-01", None, "Han votado afirmativamente los sesenta y dos señores Diputados"),
    ("guerra.fotocopia", [107341], [121465], "1939-02-01", None, "se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión"),
    ("guerra.paris", [107341], [121465], "1939-02-01", None, "las cuatro de la Diputación Permanente, celebradas en París"),
    ("guerra.negrin_1oct1937", [107148], [121219], "1937-10-01", None,
     "Señores Diputados, en cumplimiento de un precepto constitucional, comparacemos hoy ante las Cortes"),
    ("guerra.pestana_brigadas", [107193], [121275], "1937-10-02", None, "Hay brigadas, en sitios de peligro"),
    # etapa V
    ("mexico.relacion", [], [121466], "1945-01-10", None, "de 2 de febrero de 1939 a 9 de enero de 1945"),
    ("mexico.dimision_azana", [], [121466], "1945-01-10", None,
     "Darse por enterada de la dimisión del Excelentísimo señor Presidente de la República, don Manuel Azaña Díaz"),
    ("mexico.costa_amic", [], [121466], "1945-01-10", None, "México D.F.: B. Costa i Amic"),
    ("mexico.dp_sin_textos", [], [121466], "1945-01-10", None, "no se dispone de los textos ni en forma de fotocopia"),
    ("mexico.fallecidos", [107342], [121467], "1945-01-10", None, "relación de señores diputados fallecidos desde julio de 1936 hasta la fecha"),
    ("mexico.exequias", [107344], [121470], "1945-01-10", None, "celebrábamos las exequias temporales de la República Española"),
    ("mexico.orden_promesa", [107371], [121500], "1945-08-17", None,
     "Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española"),
    ("mexico.si_prometo", [107372], [121502], "1945-08-17", None, "Si, prometo"),
    ("mexico.giral", [107375], [121507], "1945-11-07", None,
     "el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente"),
    ("mexico.lamoneda", [107402], [121535], "1945-11-07", None, "No otorgaremos, pues, la confianza al Gobierno"),
    ("mexico.aclamacion", [107425], [121560], "1945-11-07", None, "es aprobada por aclamación la propuesta leida"),
    ("mexico.fuerza_mayor", [107429], [121567], "1945-11-07", None,
     "las circunstancias que impiden con carácter de fuerza mayor la convocatoria de elecciones"),
    ("mexico.voto_8nov", [107442], [121582], "1945-11-08", None, "106 votos a favor y ninguno en contra"),
    ("mexico.prieto_8nov", [107446], [121586], "1945-11-08", None, "En nombre de la Minoria a que pertenezco"),
    ("mexico.prieto_8nov_b", [], [121588], "1945-11-08", None, None),
    ("mexico.comision_estatuto", [107466], [121614], "1945-11-09", None,
     "una Comisión especial para dictamar sobre el Estatuto autónómico de la Región gallega"),
    ("mexico.santiago_chile", [107485], [121633], "1945-11-09", None, "de Santiago de Chile para asistir a estas sesiones"),
    ("mexico.satisfaccion", [107540], [121688], "1945-11-09", None, "dar esta satisfacción moral a nuestros compañeros los Diputados gallegos"),
    ("mexico.accede", [107543], [121691], "1945-11-09", None, "La Minoría Socialista accede muy gustosamente"),
    ("mexico.gracias_mexico", [107551], [121699], "1945-11-09", None,
     "agradecer emocionadamente a México, a su Gobierno, a su Prensa y a su pueblo"),
]
# Frases que el copy cita y que deben estar también en la fila (además del fragmento del ancla). (ancla, campo, frase)
CITAS_EXTRA = [
    ("I.besteiro_ovacion", "speaker", "acogido con una gran ovación"),
    ("I.asua_proyecto", "speech", "en nombre de la Comisión"),
    ("I.presidente_republica", "speech", "Don Niceto Alcalá-Zamora, 362"),
    ("I.presidente_republica", "speech", "La suma total es la de 410"),
    ("I.besteiro_elegido", "speech", "Han tomado parte en la votación 371 señores Diputados"),
    ("I.art24", "speech", "Señores que han dicho no:\n\nAlcalá-Zamora.\n\nMaura."),
    ("I.sanjurjo", "speech", "El general Sanjurjo se ha presentado en Sevilla"),
    ("II.alba_interino", "speech", "Han tomado parte en la votación 248 Diputados"),
    ("II.ese_camino", "speech", "es necesaria una rectificación"),
    ("II.samper", "speaker", "Presidente del CONSEJO DE MINISTROS (Samper)"),
    ("II.straperlo", "speech", 'denominado "Straperlo"'),
]
# Anclas cuya fila V2 da también su número de palabras (igual en la v3, salvo que se diga).
PALABRAS = {"I.alcala_resigna", "I.asua_proyecto", "I.azana_1933", "II.azana_1935"}
# Filtros y rangos de fecha de «Hoy puede» (FTS5 del explorador, todas las filas).
BUSQUEDAS = [
    ("busqueda.divorcio.1931-1933", "divorcio", "1931-1933", None, None, False, "«divorcio» con la faceta Legislatura 1931-1933"),
    ("busqueda.amnistia.1933-1935", "amnistia", "1933-1935", None, None, False, "«amnistía» con la faceta Legislatura 1933-1935"),
    ("busqueda.strauss.1935", "strauss", None, "1935-10-01", "1935-12-31", False, "«strauss», del 1-X al 31-XII-1935"),
    ("busqueda.straperlo.1935", "straperlo", None, "1935-10-01", "1935-12-31", False, "«straperlo», del 1-X al 31-XII-1935"),
    ("cortes.1936.consulta.orden_publico", '"orden publico"', None, "1936-03-16", "1936-07-10", True,
     "«\"orden público\"», del 16-III al 10-VII-1936"),
    ("cortes.guerra.consulta.confianza", "confianza", None, "1936-10-01", "1939-02-01", True, "«confianza», del 1-X-1936 al 1-II-1939"),
    ("cortes.mexico.consulta.diputacion_permanente", '"diputacion permanente"', None, "1945-01-10", "1945-11-09", True,
     "«\"diputación permanente\"», del 10-I al 9-XI-1945"),
]


def _norm(s) -> str:
    return " ".join(str(s or "").split())


def _slug(familia: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", plegar(familia)).strip("_")


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}

    def pon(k, *a, **kw):
        exige(k not in C, f"clave repetida en fichas: {k}")
        C[k] = ctx.cifra(*a, **kw)

    grafias = leer_json(ctx.data / "grafias.json").get("grafias", {})

    def grafia(rep_id) -> dict:
        g = grafias.get(str(int(rep_id))) or {}
        return {"grafia": g.get("grafia"), "uso": g.get("uso") or g.get("grafia"), "corto": g.get("corto")}

    _anclas(ctx, pon)
    _lecturas(ctx, pon)
    _busquedas(ctx, pon)
    _oradores(ctx, pon, grafia)
    _familias(ctx, pon)
    return C


# ── anclas ────────────────────────────────────────────────────────────────────────────────────────────────────────

def _anclas(ctx, pon) -> None:
    fallos = []
    filas = {}
    for clave, v2s, v3s, fecha, sesion, frag in ANCLAS:
        f2 = [ctx.fila_v2(i) for i in v2s]
        f3 = [ctx.fila_v3(i) for i in v3s]
        for r in f2 + f3:
            if r["date"] != fecha or (sesion is not None and int(r["num_session"]) != sesion):
                fallos.append(f"{clave}: la fila {r['id']} es del {r['date']} (sesión {r['num_session']}), no del {fecha}")
        if frag:
            nf = _norm(frag)
            for r in f2:
                if nf not in _norm(r["speech"]):
                    fallos.append(f"{clave}: «{frag[:50]}…» no está letra a letra en la fila V2 {r['id']}")
            if f3 and not any(nf in _norm(r["speech"]) for r in f3):
                fallos.append(f"{clave}: «{frag[:50]}…» no está letra a letra en la fila v3 {v3s[0]}")
        filas[clave] = (f2, f3)
        que = f"fila de {fecha}" + (f" (sesión {sesion})" if sesion else "") + (f" con «{frag[:60]}»" if frag else "")
        if v2s:
            pon(f"fila.{clave}.V2", v2s[0], "id", "V2", que + "; fragmento comprobado letra a letra en cada exportación", clave="L")
        if v3s:
            pon(f"fila.{clave}.v3", v3s[0], "id", "v3", que + ("; misma fila en la v3" if v2s else "; solo en la v3 (fila del sumario o del acta)"),
                clave="L")
    for clave, campo, frase in CITAS_EXTRA:
        f2, f3 = filas[clave]
        nf = _norm(frase)
        if not all(nf in _norm(r[campo]) for r in f2) or not any(nf in _norm(r[campo]) for r in f3):
            fallos.append(f"{clave}: «{frase[:50]}» no está en la columna {campo} de su fila V2 y v3")
    for clave in sorted(PALABRAS):
        f2, f3 = filas[clave]
        n2, n3 = int(f2[0]["nwords"]), int(f3[0]["nwords"])
        exige(n2 == n3, f"fila.{clave}: {n2} palabras en la V2 y {n3} en la v3")
        pon(f"fila.{clave}.palabras", n2, "n", "V2", f"nwords de la fila V2 {f2[0]['id']} (igual en la v3 {f3[0]['id']})", clave="L")
    exige(not fallos, "anclas de las fichas: " + " · ".join(fallos[:6]) + (f" (y {len(fallos) - 6} más)" if len(fallos) > 6 else ""))


# ── lecturas del texto de una fila ───────────────────────────────────────────────────────────────────────────────

def _lecturas(ctx, pon) -> None:
    def txt(i, base="V2"):
        return (ctx.fila_v2(i) if base == "V2" else ctx.fila_v3(i))["speech"] or ""

    def num(i, patron, base="V2", flags=0):
        m = re.search(patron, txt(i, base), flags)
        exige(m is not None, f"fila {base} {i}: no se encuentra «{patron}»")
        return [int(x) for x in m.groups()]

    def lee(k, v, fila, que, base="V2"):
        pon(k, v, "n", base, f"texto de la fila {base} {fila}: {que}", clave="L")

    si, no = num(61320, r"aprobada la proposición por (\d+) votos contra (\d+)")
    lee("voto.187-91.si", si, 61320, "votos a favor"); lee("voto.187-91.no", no, 61320, "votos en contra")
    si, no = num(68299, r"el dictamen, por (\d+) votos contra (\d+)")
    lee("voto.265-45.si", si, 68299, "votos a favor"); lee("voto.265-45.no", no, 68299, "votos en contra")
    (prom,) = num(13531, r"suman (\d+)")
    (vot,) = num(13531, r"votación (\d+) señores Diputados y este mismo número ha votado que sí")
    lee("voto.constitucion.prometidos", prom, 13531, "diputados que han prometido el cargo («suman N»)")
    lee("voto.constitucion.si", vot, 13531, "votantes, todos a favor")
    (v,) = num(13613, r"Don Niceto Alcalá-Zamora, (\d+)"); (n,) = num(13613, r"La suma total es la de (\d+)")
    lee("eleccion.presidente1931.votos", v, 13613, "votos de Alcalá-Zamora"); lee("eleccion.presidente1931.votantes", n, 13613, "suma total")
    (v,) = num(5, r"D\. Julián Besteiro, (\d+)"); (n,) = num(5, r"votación (\d+) señores Diputados")
    lee("eleccion.besteiro1931.votos", v, 5, "votos de Besteiro"); lee("eleccion.besteiro1931.votantes", n, 5, "votantes")
    (v,) = num(61358, r"D\. Santiago Alba Bonifaz, (\d+)"); (n,) = num(61358, r"votación (\d+) Diputados")
    lee("eleccion.alba1933.votos", v, 61358, "votos de Alba"); lee("eleccion.alba1933.votantes", n, 61358, "votantes")
    # etapa III
    (v,) = num(101701, r"D\. Diego Martínez Barrio, (\d+)")
    lee("cortes.1936.votos.presidente_interino", v, 101701, "votos de Martínez Barrio")
    si, no = num(102287, r"por (\d+) votos contra (\d+)")
    lee("cortes.1936.voto_3abril.si", si, 102287, "votos a favor"); lee("cortes.1936.voto_3abril.no", no, 102287, "votos en contra")
    pon("cortes.1936.prieto_7abril.palabras", int(ctx.fila_v2(102323)["nwords"]), "n", "V2", "nwords de la fila V2 102323 (igual en la v3 115638)", clave="L")
    # etapa IV y V
    (v,) = num(107312, r"por (\d+) votos en pro y ninguno en contra")
    lee("cortes.guerra.voto_convalidacion.si", v, 107312, "votos a favor, ninguno en contra")
    acuerdos = len(re.findall(r"\d+\.—\s*ACUERDO", txt(121466, "v3")))
    pon("cortes.mexico.dp.acuerdos", acuerdos, "n", "v3", "acuerdos numerados «N.—ACUERDO» de la relación leída el 10-I-1945 (v3 121466, solo en la v3)", clave="L")
    fallecidos = len(re.findall(r"^[A-ZÁÉÍÓÚÑÜ][A-ZÁÉÍÓÚÑÜ' \-]+\(D\.[^)]*\)\.", txt(107342), re.M))
    pon("cortes.mexico.fallecidos.n", fallecidos, "n", "V2", "líneas «APELLIDOS (D. Nombre).» de la lista de fallecidos (V2 107342; igual en la v3 121467)", clave="L")
    pon("cortes.mexico.giral.palabras", int(ctx.fila_v2(107375)["nwords"]), "n", "V2", "nwords de la fila V2 107375 (igual en la v3 121507)", clave="L")
    (v,) = num(107442, r"(\d+) votos a favor y ninguno en contra")
    lee("cortes.mexico.voto_8nov.si", v, 107442, "votos a favor, ninguno en contra")
    pon("cortes.mexico.prieto_8nov.palabras", int(ctx.fila_v2(107446)["nwords"]), "n", "V2", "nwords de la fila V2 107446 (la v3 la parte en 121586 y 121588)", clave="L")
    # listas nominales de la etapa III que van en filas de la Presidencia (la definición común de las listas es de sesiones)
    v2 = ctx.v2()
    s = ctx.v2_plegado()
    iii = v2[v2["etapa"] == "III"]
    lis = iii[s.loc[iii["id"]].str.contains(r"senores que (?:dijeron|han dicho)\s*:?\s*(?:si|no)\b", regex=True).values]
    pon("cortes.1936.listas.en_presidencia", int(lis["presidencia"].sum()), "n", "V2",
        f"de las {len(lis)} filas de la etapa III con una lista «señores que dijeron|han dicho» + «sí|no», las de la Presidencia (parse_speaker)")
    # correcciones de fecha (changelog depositado)
    er = pd.read_csv(ERRATAS_FECHAS, sep=";")
    pon("correcciones.fechas.n", len(er), "n", "V2", "sesiones con fecha corregida (erratas_fechas_V1.csv del changelog de la V2)", clave="M")
    pon("correcciones.fechas.I", int((er["legislatura_corregida"] == "1931-1933").sum()), "n", "V2",
        "de ellas, en la legislatura 1931-1933 (erratas_fechas_V1.csv)", clave="M")
    r77 = er[er["num_session"] == 77].iloc[0]
    exige((r77["fecha_V1"], r77["fecha_corregida"], r77["legislatura_V1"]) == ("1933-06-01", "1934-05-04", "1931-1933"),
          "erratas_fechas_V1.csv: la sesión 77 ya no es la del 1933-06-01 → 1934-05-04")
    pon("correcciones.sesion77.filas", int(r77["n"]), "n", "V2", f"filas de la sesión 77 con fecha corregida (ids {r77['id_min']}–{r77['id_max']})", clave="M")
    pon("cortes.fichas.recuento.fecha", ctx.hoy, "fecha", "v3", "fecha de los recuentos de «Hoy puede» (la de esta exportación, sobre la v3 del sello)")


# ── búsquedas y bibliotecas del explorador ───────────────────────────────────────────────────────────────────────

def _busquedas(ctx, pon) -> None:
    con = ctx.v3_db()
    for k, q, leg, d1, d2, con_sesiones, que in BUSQUEDAS:
        sql = ("select count(*), count(distinct s.date || '#' || s.num_session) from speeches_fts f "
               "join speeches s on s.id = f.rowid where speeches_fts match ?")
        a = [q]
        if leg:
            sql += " and s.legislature = ?"
            a.append(leg)
        if d1:
            sql += " and s.date between ? and ?"
            a += [d1, d2]
        n, ses = con.execute(sql, a).fetchone()
        f = f"FTS5 del explorador (speeches_fts MATCH {q}), {que}, todas las filas"
        if con_sesiones:
            pon(f"{k}.n", n, "n", "v3", f)
            pon(f"{k}.sesiones", ses, "n", "v3", f + "; sesiones distintas")
        else:
            pon(k, n, "n", "v3", f)
    B = {b["nombre"]: b for b in ctx.bibliotecas()}
    Bc = {b["clave"]: b for b in ctx.bibliotecas()}

    def bib(nombre):
        exige(nombre in B, f"falta la biblioteca del proyecto «{nombre}»")
        return B[nombre]
    pon("biblioteca.sufragio.entradas", bib("Debate · Sufragio femenino")["entradas"], "n", "v3", "entradas de la biblioteca «Debate · Sufragio femenino»", clave="M")
    pon("biblioteca.casas_viejas.sesiones", len(bib("Debate · Casas Viejas")["sesiones"]), "n", "v3", "sesiones de la biblioteca «Debate · Casas Viejas»", clave="M")
    pon("biblioteca.amnistia.entradas", bib("Debate · Amnistía de 1934")["entradas"], "n", "v3", "entradas de la biblioteca «Debate · Amnistía de 1934»", clave="M")
    pon("biblioteca.amnistia.sesiones", len(bib("Debate · Amnistía de 1934")["sesiones"]), "n", "v3", "sesiones de la biblioteca «Debate · Amnistía de 1934»", clave="M")
    exige("L2-B12" in Bc and "Actas" in Bc["L2-B12"]["nombre"], "la biblioteca L2-B12 ya no es la de la Comisión de Actas")
    pon("cortes.1936.biblioteca.actas.n", Bc["L2-B12"]["entradas"], "n", "v3", f"entradas de la biblioteca «{Bc['L2-B12']['nombre']}»", clave="M")


# ── F05 · quién tomó la palabra (v3) ─────────────────────────────────────────────────────────────────────────────

def _oradores(ctx, pon, grafia) -> None:
    v3 = ctx.v3()
    h = v3[v3["habla"] & ~v3["chair"]]
    exige(len(h) == 59_938 and int(h["nwords"].sum()) == 21_207_769,
          f"control de F05 (plan H4): {len(h)} filas y {int(h['nwords'].sum())} palabras de habla sin Presidencia; se esperaban 59.938 y 21.207.769")
    g = ctx.oradores(base="v3", por="etapa", sin_presidencia=True)
    exige(g["rep_id"].nunique() == 772, f"F05: {g['rep_id'].nunique()} rep_id de habla sin Presidencia; el plan da 772")
    pon("oradores.diputados", int(g["rep_id"].nunique()), "n", "v3", f"rep_id distintos con alguna fila de habla sin Presidencia (los de oradores_etapa.csv)")
    salida = {"etapas": {}, "base": "v3", "definicion": V3_HABLA, "control": {"filas": int(len(h)), "palabras": int(h["nwords"].sum()),
                                                                             "diputados": int(g["rep_id"].nunique())}}
    filas_csv = []
    for e in ETAPA_IDS:
        he = h[h["etapa"] == e]
        den = int(he["nwords"].sum())
        ge = g[g["etapa"] == e].sort_values(["palabras", "rep_id"], ascending=[False, True]).reset_index(drop=True)
        pon(f"oradores.etapa.{e}.den", den, "n", "v3", f"palabras de {V3_HABLA} de la etapa {e} (incluidas las filas sin diputado)")
        pon(f"oradores.etapa.{e}.filas", int(len(he)), "n", "v3", f"{V3_HABLA} de la etapa {e}")
        pon(f"oradores.etapa.{e}.diputados", int(len(ge)), "n", "v3", f"rep_id distintos con alguna fila de habla sin Presidencia en la etapa {e}")
        top = []
        for i, r in ge.head(10).iterrows():
            p = i + 1
            gr = grafia(r["rep_id"])
            exige(gr["uso"], f"F05: el rep_id {r['rep_id']} (puesto {p} de la etapa {e}) no tiene grafía (D-22)")
            fam = FAMILIA_ETIQ.get(r["familia"], r["familia"]) if isinstance(r["familia"], str) else None
            top.append({"puesto": p, "rep_id": int(r["rep_id"]), "nombre": gr["uso"], "corto": gr["corto"] or gr["uso"],
                        "partido": r["partido"], "familia": fam, "palabras": int(r["palabras"]), "filas": int(r["filas"]),
                        "pct": int(r["palabras"]) / den})
            pon(f"oradores.etapa.{e}.{p}.pal", int(r["palabras"]), "n", "v3", f"palabras de habla sin Presidencia del puesto {p} de la etapa {e} ({gr['uso']})")
            pon(f"oradores.etapa.{e}.{p}.rep_id", int(r["rep_id"]), "id", "v3", f"rep_id del puesto {p} de la etapa {e} por palabras de habla sin Presidencia")
            pon(f"oradores.etapa.{e}.{p}.pct", int(r["palabras"]) / den, "pct", "v3", f"palabras del puesto {p} / palabras de habla sin Presidencia de la etapa {e}",
                clave="CALC", n=int(r["palabras"]), den=den, dec=1)
        diez = sum(x["palabras"] for x in top)
        pon(f"oradores.etapa.{e}.diez.pct", diez / den, "pct", "v3", f"palabras de los diez primeros / palabras de habla sin Presidencia de la etapa {e}",
            clave="CALC", n=diez, den=den, dec=0)
        salida["etapas"][e] = {"den": den, "filas": int(len(he)), "diputados": int(len(ge)), "diez": diez, "top": top}
        for i, r in ge.iterrows():
            gr = grafia(r["rep_id"])
            filas_csv.append([e, i + 1, int(r["rep_id"]), r["nombre"], gr["grafia"] or "", r["partido"] or "", r["familia"] or "",
                              int(r["filas"]), int(r["palabras"]), round(int(r["palabras"]) / den, 6)])
    ctx.escribir_json("oradores_etapa.json", salida)
    ctx.escribir_datos("oradores_etapa", ["etapa", "puesto", "rep_id", "rep_name", "grafia", "party", "party_family", "filas_habla_v3",
                                          "palabras_habla_v3", "pct_etapa"], filas_csv)


# ── F09 · qué familias ocupan la palabra (V2) ────────────────────────────────────────────────────────────────────

def _familias(ctx, pon) -> None:
    v2 = ctx.v2()
    sp = v2[~v2["presidencia"]]
    # Posición media de cada familia (ideología del partido, ponderada por palabras en todo el corpus sin Presidencia).
    pos = sp.assign(p=sp["ideo"].str.strip().map(POSICION)).dropna(subset=["p"])
    media = (pos["p"] * pos["nwords"]).groupby(pos["familia"]).sum() / pos.groupby("familia")["nwords"].sum()
    g = ctx.familias(por="etapa")
    familias = sorted(g["familia"].unique(), key=lambda f: (f == "Sin identificar", media.get(f, 99), f))
    # «Sin identificar» (filas sin familia) no tiene posición: va la última y sin color de ideología.
    conocida = lambda f: f in media and f != "Sin identificar"  # noqa: E731
    orden = [{"familia": f, "clave": _slug(f), "posicion": round(float(media[f]), 3) if conocida(f) else None,
              "color": TOKEN[int(round(float(media[f])))] if conocida(f) else "nc"} for f in familias]
    salida = {"base": "V2", "definicion": "filas V2 sin la Presidencia (parse_speaker del explorador); familia normalizada como el explorador",
              "orden": orden, "umbral_otras": UMBRAL_OTRAS, "etapas": {}}
    pon("familias.umbral.pct", UMBRAL_OTRAS, "pct", "V2", "regla del plan (F09): en el gráfico, las familias por debajo de este umbral se agrupan en «Otras»; la tabla las da todas",
        clave="R", dec=0)
    filas_csv = []
    for e in ETAPA_IDS:
        ge = g[g["etapa"] == e].set_index("familia")
        den_p, den_f = int(ge["palabras"].sum()), int(ge["filas"].sum())
        spe = sp[sp["etapa"] == e]
        exige(den_p == int(spe["nwords"].sum()) and den_f == len(spe), f"F09 {e}: las familias no suman las filas sin Presidencia")
        pon(f"familias.etapa.{e}.den", den_p, "n", "V2", f"palabras V2 sin la Presidencia de la etapa {e}")
        pon(f"familias.etapa.{e}.den_filas", den_f, "n", "V2", f"filas V2 sin la Presidencia de la etapa {e}")
        lista = []
        for o in orden:
            f = o["familia"]
            if f not in ge.index:
                continue
            p, n = int(ge.loc[f, "palabras"]), int(ge.loc[f, "filas"])
            lista.append({"familia": f, "clave": o["clave"], "palabras": p, "filas": n, "diputados": int(ge.loc[f, "diputados"]),
                          "pct_palabras": p / den_p, "pct_filas": n / den_f})
            pon(f"familias.etapa.{e}.{o['clave']}.pct", p / den_p, "pct", "V2", f"palabras de «{f}» / palabras sin Presidencia de la etapa {e}",
                clave="CALC", n=p, den=den_p, dec=1)
            pon(f"familias.etapa.{e}.{o['clave']}.filas.pct", n / den_f, "pct", "V2", f"filas de «{f}» / filas sin Presidencia de la etapa {e}",
                clave="CALC", n=n, den=den_f, dec=1)
            filas_csv.append([e, f, o["clave"], p, n, int(ge.loc[f, "diputados"]), round(p / den_p, 6), round(n / den_f, 6)])
        mayor = max(lista, key=lambda x: x["palabras"])
        pon(f"familias.etapa.{e}.primera", mayor["familia"], "texto", "V2", f"familia con más palabras sin Presidencia en la etapa {e}")
        # Reparto por ideología del partido: derecha y extrema derecha.
        de = spe[spe["ideo"].str.strip().isin(["D", "ED"])]["nwords"].sum()
        pon(f"ideologia.etapa.{e}.d_ed.pct", int(de) / den_p, "pct", "V2", f"palabras con ideology D o ED / palabras sin Presidencia de la etapa {e}",
            clave="CALC", n=int(de), den=den_p, dec=1)
        salida["etapas"][e] = {"den_palabras": den_p, "den_filas": den_f, "familias": lista}
    ctx.escribir_json("familias_etapa.json", salida)
    ctx.escribir_datos("familias_etapa", ["etapa", "familia", "clave", "palabras_v2", "filas_v2", "diputados", "pct_palabras", "pct_filas"], filas_csv)


if __name__ == "__main__":  # pragma: no cover
    print(json.dumps([a[0] for a in ANCLAS], ensure_ascii=False))
