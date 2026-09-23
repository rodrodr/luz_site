#!/usr/bin/env python3
"""Comprueba las cifras y las anclas de las fichas III, IV y V (grupo cortes_b), sobre las fuentes.

- V2: /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv (MD5 comprobado por comun.cargar_v2).
- v3: /Users/rodrodr/.cache/luz_site/corpus.sqlite, con el papel de cada fila de ~/.cache/luz_site/clima/*.jsonl.
- proyecto: 2REP_Explorer/standalone/data/sessions.json.

Hace tres cosas:
1. Recalcula cada marcador de docs/marcadores/cortes_{1936,guerra,mexico}.md y lo compara con el valor esperado.
2. Comprueba cada ancla: el fragmento literal está, letra a letra (espacios normalizados), en la fila V2 y en la
   fila v3 declaradas, y la fecha de la fila es la esperada.
3. Recuenta con FTS5 las consultas de «Hoy puede» (mismo método que el buscador del explorador).

Uso:  python3 docs/marcadores/comprobar_cortes_b.py     (sale con código 1 si algo no cuadra)
Solo lee; no escribe nada fuera de la salida estándar.
"""
import glob, json, re, sqlite3, sys, collections
from pathlib import Path
RAIZ = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RAIZ / 'docs' / 'estudio' / 'datos'))
from comun import cargar_v2, roles_presidencia, normalizar   # noqa: E402

DB = '/Users/rodrodr/.cache/luz_site/corpus.sqlite'
SESS = '/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json'
BIB = RAIZ / 'docs' / 'estudio' / 'datos' / 'bibliotecas_v3.json'

def norm(s): return ' '.join(str(s).split())
etapa = lambda n: 'III' if n <= 60 else ('IV' if n <= 69 else 'V')

print('Cargando la V2 (con texto) y la v3…')
a = cargar_v2(con_texto=True)
TOT = int(a.nwords.sum())
d = normalizar(roles_presidencia(a[a.legislature == '1936-1939'].copy()))
d['etapa'] = d.num_session.map(etapa)
V2 = d.set_index('id')
con = sqlite3.connect(DB)
v = __import__('pandas').read_sql("select id,num_session,date,rep_id,nwords,speech from speeches where legislature='1936-1939'", con)
roles = {}
for f in sorted(glob.glob('/Users/rodrodr/.cache/luz_site/clima/*.jsonl')):
    for line in open(f):
        r = json.loads(line); roles[r['id']] = (r['role'], r['chair'])
v['role'] = v.id.map(lambda i: roles[i][0]); v['chair'] = v.id.map(lambda i: roles[i][1])
v['etapa'] = v.num_session.map(etapa)
S = [s for s in json.load(open(SESS))['sessions'] if s['legislature'] == '1936-1939']

C = {}
rng = {'III': ('1936-03', '1936-07'), 'IV': ('1936-10', '1939-02'), 'V': ('1945-01', '1945-11')}
def nmeses(e):
    y, m = map(int, rng[e][0].split('-')); y1, m1 = map(int, rng[e][1].split('-'))
    return (y1 - y) * 12 + (m1 - m) + 1
for e in ['III', 'IV', 'V']:
    g = d[d.etapa == e]
    C[f'etapa.{e}.sesiones'] = g.groupby(['date', 'num_session']).ngroups
    C[f'etapa.{e}.palabras'] = int(g.nwords.sum())
    C[f'etapa.{e}.palabras.pct'] = round(g.nwords.sum() * 100 / TOT, 2)
    C[f'etapa.{e}.diputados'] = int(g.rep_id.dropna().nunique())
    C[f'etapa.{e}.meses'] = nmeses(e)
    C[f'etapa.{e}.meses_con_sesion'] = g.date.str[:7].nunique()
    ss = [s for s in S if etapa(s['num_session']) == e]
    C[f'etapa.{e}.serie'] = collections.Counter(s['diario'] for s in ss).most_common(1)[0][0]
    for k, n in collections.Counter(s['presidente']['clave'] for s in ss).items(): C[f'etapa.{e}.pres.{k}'] = n
    for k, n in collections.Counter(s['gobierno']['id'] for s in ss).items(): C[f'etapa.{e}.gob.{k}'] = n
    h = v[(v.etapa == e) & (~v.chair) & (~v.role.isin(['summary', 'remark']))]
    t = h[h.rep_id.notna()].groupby('rep_id').nwords.sum().sort_values(ascending=False)
    for i, (rid, p) in enumerate(t.head(5).items(), 1):
        C[f'oradores.etapa.{e}.{i}.rep_id'] = int(rid); C[f'oradores.etapa.{e}.{i}.pal'] = int(p)
    r = g[~g.presidencia]; tp = r.nwords.sum()
    for f, x in (r.groupby('familia').nwords.sum() * 100 / tp).items():
        C[f'familias.etapa.{e}.{f.lower().replace(" ", "_")}.pct'] = round(x, 1)
    C[f'etapa.{e}.presidencia.pct'] = round(g[g.presidencia].nwords.sum() * 100 / g.nwords.sum(), 1)
    fold = g.speech.fillna('').map(lambda t: ''.join(c for c in __import__('unicodedata').normalize('NFD', t.lower()) if __import__('unicodedata').category(c) != 'Mn'))
    lst = g[fold.str.contains(r'senores que (?:dijeron|han dicho)\s*:?\s*(?:si|no)\b')]
    C[f'etapa.{e}.listas_nominales.filas'] = len(lst)
    C[f'etapa.{e}.listas_nominales.sesiones'] = lst.groupby(['date', 'num_session']).ngroups
    C[f'etapa.{e}.listas_nominales.en_presidencia'] = int(lst.presidencia.sum())
    C[f'etapa.{e}.vice_ses'] = g[g.rol == 'vicechair'].groupby(['date', 'num_session']).ngroups
bib = json.load(open(BIB))['bibliotecas']
def ndeb(d1, d2): return sum(1 for b in bib if b['clave'].startswith('L2-') and d1 <= b['desde'] <= d2)
C['etapa.III.debates'] = ndeb('1936-03-16', '1936-07-10'); C['etapa.IV.debates'] = ndeb('1936-10-01', '1939-02-01')
C['etapa.V.debates'] = ndeb('1945-01-10', '1945-11-09')
C['cortes.1936.biblioteca.actas.n'] = next(b['entradas'] for b in bib if b['clave'] == 'L2-B12')
def fts(q, d1, d2):
    return con.execute("select count(*), count(distinct s.date||'#'||s.num_session) from speeches_fts f join speeches s on s.id=f.rowid where speeches_fts match ? and s.date between ? and ?", (q, d1, d2)).fetchone()
for k, q, d1, d2 in [('cortes.1936.consulta.orden_publico', '"orden publico"', '1936-03-16', '1936-07-10'),
                     ('cortes.guerra.consulta.confianza', 'confianza', '1936-10-01', '1939-02-01'),
                     ('cortes.mexico.consulta.diputacion_permanente', '"diputacion permanente"', '1945-01-10', '1945-11-09')]:
    C[k + '.n'], C[k + '.sesiones'] = fts(q, d1, d2)
def v2(i): return norm(V2.loc[i, 'speech'])
def v3(i): return norm(con.execute('select speech from speeches where id=?', (i,)).fetchone()[0])
def sesion(fecha, n): return d[(d.date == fecha) & (d.num_session == n)]
m = re.search(r'D\. Diego Martínez Barrio, (\d+)', v2(101701)); C['cortes.1936.votos.presidente_interino'] = int(m.group(1))
m = re.search(r'por (\d+) votos contra (\d+)', v2(102287)); C['cortes.1936.voto_3abril.si'], C['cortes.1936.voto_3abril.no'] = int(m.group(1)), int(m.group(2))
C['cortes.1936.prieto_7abril.palabras'] = int(V2.loc[102323, 'nwords'])
m = re.search(r'proposición (\d+) Sres\. Diputados y en contra (\d+)', v2(102358)); C['voto.238-5.si'], C['voto.238-5.no'] = int(m.group(1)), int(m.group(2))
C['sesion.1936-07-01-54.palabras'] = int(sesion('1936-07-01', 54).nwords.sum())
sp = {(s['date'], s['num_session']): s for s in S}
for (f, n) in [('1936-04-07', 15), ('1939-02-01', 69), ('1945-08-17', 71)]:
    g = sesion(f, n); s = sp[(f, n)]
    C[f'sesion.{f}-{n}.diario'] = s['diario_num']; C[f'sesion.{f}-{n}.id.desde'] = int(g.id.min()); C[f'sesion.{f}-{n}.id.hasta'] = int(g.id.max())
    if s.get('page_start'): C[f'sesion.{f}-{n}.pag.desde'] = s['page_start']; C[f'sesion.{f}-{n}.pag.hasta'] = s['page_end']
C['sesion.1945-08-17-71.filas.v3'] = int((v.date == '1945-08-17').sum())
m = re.search(r'por (\d+) votos en pro y ninguno en contra', v2(107312)); C['cortes.guerra.voto_convalidacion.si'] = int(m.group(1))
C['cortes.mexico.dp.acuerdos'] = len(re.findall(r'\d+\.—\s*ACUERDO', con.execute('select speech from speeches where id=121466').fetchone()[0]))
C['cortes.mexico.fallecidos.n'] = len(re.findall(r'^[A-ZÁÉÍÓÚÑÜ][A-ZÁÉÍÓÚÑÜ\' \-]+\(D\.[^)]*\)\.', V2.loc[107342, 'speech'], re.M))
C['cortes.mexico.giral.palabras'] = int(V2.loc[107375, 'nwords'])
m = re.search(r'(\d+) votos a favor y ninguno en contra', v2(107442)); C['cortes.mexico.voto_8nov.si'] = int(m.group(1))
C['cortes.mexico.prieto_8nov.palabras'] = int(V2.loc[107446, 'nwords'])

A=[
# clave, v2 ids, v3 ids, fragmento literal (lo que el copy cita o parafrasea), fecha
('1936.convocatoria', [], [114890], 'Las elecciones generales para Diputados a Cortes se celebrarán en toda España el domingo 16 de Febrero','1936-03-17'),
('1936.junta_viva', [], [114890], 'solicitó de la Presidencia un viva a la República, negándose el Sr. Presidente','1936-03-17'),
('1936.presidente_interino', [101701], [114881], 'Queda proclamado Presidente interino del Congreso D. Diego Martínez Barrio','1936-03-16'),
('1936.viva_cierre', [101705], [114888], '¡Viva la República! ¡Viva España!','1936-03-16'),
('1936.retirada', [101915], [115160], 'dejamos en vuestras manos, señores de la mayoría, la suerte del sistema parlamentario','1936-03-31'),
('1936.retirada_re', [101921], [115167], 'la retirada de este salón','1936-03-31'),
('1936.retirada_ct', [101931], [115177], 'una retirada del Parlamento','1936-03-31'),
('1936.actas_fin', [102250], [115551], 'la Cámara ha decidido sobre la totalidad de las actas presentadas','1936-04-03'),
('1936.propuesta_81', [102247], [115547], 'procede, con arreglo a lo dispuesto en el art. 81 de la Constitución, examinar y resolver sobre la necesidad del referido decreto','1936-04-03'),
('1936.articulo_81', [102249], [115549], 'el primer acto de las nuevas Cortes será examinar y resolver sobre la necesidad del decreto','1936-04-03'),
('1936.voto_3abril', [102287], [115595], 'quedó aprobada la proposición por 181 votos contra 88','1936-04-03'),
('1936.propuesta_destitucion', [102304], [115618], 'no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936','1936-04-07'),
('1936.prieto_7abril', [102323], [115638], 'Señores Diputados, son más sagrados los deberes cuanto más penosos','1936-04-07'),
('1936.voto_destitucion', [102358], [115674], 'El Reglamento dispone que se haga nominalmente','1936-04-07'),
('1936.voto_destitucion_lista', [102358], [115675], 'votado a favor de la proposición 238 Sres. Diputados y en contra 5','1936-04-07'),
('1936.descansando', [102365], [115686], 'se hallaba descansando','1936-04-07'),
('1936.pasa_a_ser', [102368], [115690], 'pasa a ser Presidente de la República','1936-04-07'),
('1936.solemne', [103342], [116810], 'para que el Presidente electo preste la promesa','1936-05-08'),
('1936.acta_solemne', [], [116860], 'ocupó la silla de la Presidencia el Vicepresidente en funciones de Presidente D. Luis Jiménez de Asúa','1936-05-12'),
('1936.crisis', [103383], [116863], 'Encontrándose el Gobierno en crisis se suspenden las sesiones de Cortes','1936-05-12'),
('1936.incitacion', [102483], [115827], 'Se acaba de hacer una incitación al asesinato','1936-04-15'),
('1936.no_constaran_15abril', [102484], [115828], 'Esas palabras no constarán en el Diario de Sesiones','1936-04-15'),
('1936.no_constara_6mayo', [103251], [116698], 'No constará en el Diario de Sesiones','1936-05-06'),
('1936.no_se_consignan_6mayo', [103182], [116626], 'no se consignan por orden','1936-05-06'),
('1936.calvo_pide', [104406], [118058], 'no constarán en el Diario de Sesiones','1936-06-03'),
('1936.no_se_consignan_16junio', [105324], [119098], 'no se consignan por orden','1936-06-16'),
('1936.galarza', [106289], [120221], 'no se consigna por orden del Sr. Presidente','1936-07-01'),
('1936.no_constaran_1julio', [106290], [120222], 'no constarán en el Diario de Sesiones','1936-07-01'),
('1936.cierre_10julio', [107065], [121108], 'Orden del día para el martes','1936-07-10'),
('1936.sedicioso', [107066], [121111], 'ese movimiento sedicioso','1936-10-01'),
# guerra
('guerra.nota_volumen', [], [121110], 'CON POSTERIORIDAD AL 18 DE JULIO','1936-10-01'),
('guerra.no_existe', [], [121110], 'NO EXISTE DATO ALGUNO','1936-10-01'),
('guerra.palacio_congreso', [107093], [121143], 'Palacio del Congreso, 1.° de Octubre de 1936','1936-10-01'),
('guerra.aclamacion', [107088], [121135], 'por aclamación quedó aprobada la proposición','1936-10-01'),
('guerra.estatuto_vasco', [107091], [121140], 'De Estatuto del País Vasco','1936-10-01'),
('guerra.largo_1oct', [107068], [121113], 'Sres. Diputados, vosotros, que me conocéis, sabéis lo parco que soy en palabras','1936-10-01'),
('guerra.madrid', [107114], [121167], 'nos reunimos en Madrid','1936-12-01'),
('guerra.valencia', [107095], [121147], 'al pueblo de Valencia','1936-12-01'),
('guerra.ayuntamiento', [107116], [121170], 'Palacio del Ayuntamiento de Valencia','1936-12-01'),
('guerra.vicepresidente_1937', [107128], [121190], 'Vicepresidente tercero de la Cámara','1937-02-01'),
('guerra.lonja', [107148], [121219], 'congregarnos en la histórica Lonja','1937-10-01'),
('guerra.voto_1oct1937', [107162], [121239], 'Total, 172','1937-10-01'),
('guerra.ciertas_cosas', [107196], [121278], 'de ciertas cosas no se puede hablar en la Cámara','1937-10-02'),
('guerra.albornoz', [107197], [121279], 'Pero si el Parlamento no es eso, no será nada','1937-10-02'),
('guerra.lonja_2oct', [107212], [121298], 'Palacio de La Lonja, 2 de Octubre de 1937','1937-10-02'),
('guerra.fallecidos_1938', [107225], [121318], 'Señores Diputados, por vez primera en este año se reúne constitucionalmente el Parlamento','1938-02-01'),
('guerra.negrin_1feb1938', [107232], [121328], 'Los crimenes de los fraciosos','1938-02-01'),
('guerra.ibarruri_vice', [107257], [121360], 'Queda proclamada Vicepresidente cuarto, dona Dolores Ibarruri','1938-09-30'),
('guerra.reservas', [107288], [121397], 'El Gobierno no acepta, ni admite votos de confianza condicionados y con reservas','1938-09-30'),
('guerra.monserrat_fecha', [107248], [121345], 'Monserrat, 1 de Febrero de 1938','1938-02-01'),  # fase 2: plan H1
('guerra.montserrat', [107276], [121384], 'las Cortes de Montserrat','1938-09-30'),
('guerra.san_cugat', [107303], [121412], 'del antiguo monasterio de San Cugat del Vallés','1938-09-30'),
('guerra.voto_convalidacion', [107312], [121427], 'por 168 votos en pro y ninguno en contra','1938-10-01'),
('guerra.sabadell', [107319], [121437], 'Sabadell, 1.° de Octubre de 1939','1938-10-01'),
('guerra.hora', [], [121446], 'Abierta la sesión a las veintidos horas treinta minutos','1939-02-01'),
('guerra.trozo_catalan', [], [121446], 'Lo hacemos en un trozo de la tierra catalana','1939-02-01'),
('guerra.negrin_figueres', [107326], [121447], 'Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra','1939-02-01'),
('guerra.lamoneda_lugares', [107330], [121451], 'en la Lonja de Valencia, en Montserrat, en el Castillo de Fignaras','1939-02-01'),
('guerra.castillo', [107337], [121459], 'Castillo de Figueras, a primero de Febrero','1939-02-01'),
('guerra.votacion_nominal_1939', [107340], [121462], 'Se va a votar nominalmente la proposición presentada','1939-02-01'),
('guerra.sesenta_y_dos', [107341], [121464], 'Han votado afirmativamente los sesenta y dos señores Diputados','1939-02-01'),
('guerra.fotocopia', [107341], [121465], 'se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión','1939-02-01'),
('guerra.paris', [107341], [121465], 'las cuatro de la Diputación Permanente, celebradas en París','1939-02-01'),
('guerra.negrin_1oct1937', [107148], [121219], 'Señores Diputados, en cumplimiento de un precepto constitucional, comparacemos hoy ante las Cortes','1937-10-01'),
('guerra.pestana_brigadas', [107193], [121275], 'Hay brigadas, en sitios de peligro','1937-10-02'),
# mexico
('mexico.relacion', [], [121466], 'de 2 de febrero de 1939 a 9 de enero de 1945','1945-01-10'),
('mexico.dimision_azana', [], [121466], 'Darse por enterada de la dimisión del Excelentísimo señor Presidente de la República, don Manuel Azaña Díaz','1945-01-10'),
('mexico.costa_amic', [], [121466], 'México D.F.: B. Costa i Amic','1945-01-10'),
('mexico.dp_sin_textos', [], [121466], 'no se dispone de los textos ni en forma de fotocopia','1945-01-10'),
('mexico.ciudad_mexico', [], [121466], 'de la sesión celebrada en la Ciudad de México, el miércoles 10 de enero de 1945','1945-01-10'),
('mexico.fallecidos', [107342], [121467], 'relación de señores diputados fallecidos desde julio de 1936 hasta la fecha','1945-01-10'),
('mexico.azana_primero', [107342], [121467], 'AZANA DIAZ (D. Manuel)','1945-01-10'),
('mexico.exequias', [107344], [121470], 'celebrábamos las exequias temporales de la República Española','1945-01-10'),
('mexico.orden_promesa', [107371], [121500], 'Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española','1945-08-17'),
('mexico.si_prometo', [107372], [121502], 'Si, prometo','1945-08-17'),
('mexico.giral', [107375], [121507], 'el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente','1945-11-07'),
('mexico.lamoneda', [107402], [121535], 'No otorgaremos, pues, la confianza al Gobierno','1945-11-07'),
('mexico.aclamacion', [107425], [121560], 'es aprobada por aclamación la propuesta leida','1945-11-07'),
('mexico.fuerza_mayor', [107429], [121567], 'las circunstancias que impiden con carácter de fuerza mayor la convocatoria de elecciones','1945-11-07'),
('mexico.voto_8nov', [107442], [121582], '106 votos a favor y ninguno en contra','1945-11-08'),
('mexico.prieto_8nov', [107446], [121586, 121588], 'En nombre de la Minoria a que pertenezco','1945-11-08'),
('mexico.comision_estatuto', [107466], [121614], 'una Comisión especial para dictamar sobre el Estatuto autónómico de la Región gallega','1945-11-09'),
('mexico.santiago_chile', [107485], [121633], 'de Santiago de Chile para asistir a estas sesiones','1945-11-09'),
('mexico.satisfaccion', [107540], [121688], 'dar esta satisfacción moral a nuestros compañeros los Diputados gallegos','1945-11-09'),
('mexico.accede', [107543], [121691], 'La Minoría Socialista accede muy gustosamente','1945-11-09'),
('mexico.gracias_mexico', [107551], [121699], 'agradecer emocionadamente a México, a su Gobierno, a su Prensa y a su pueblo','1945-11-09'),
]

fallos = 0
for k, i2, i3, frag, fecha in A:
    for i in i2:
        ok = frag in v2(i) and V2.loc[i, 'date'] == fecha
        C[f'fila.{k}.V2'] = i
        if not ok: print('✗ ancla V2', k, i); fallos += 1
    for j, i in enumerate(i3):
        row = con.execute('select date from speeches where id=?', (i,)).fetchone()
        ok = (frag in v3(i) or (k == 'mexico.prieto_8nov' and j == 1)) and row[0] == fecha
        if j == 0: C[f'fila.{k}.v3'] = i
        if not ok: print('✗ ancla v3', k, i); fallos += 1
C['fila.mexico.prieto_8nov_b.v3'] = 121588
print(f'Anclas: {len(A)} comprobadas, {fallos} fallos.')

def valor_md(s):
    s = s.strip()
    try: return int(s)
    except ValueError:
        try: return float(s)
        except ValueError: return s
malos = 0; vistos = 0
for arch in ['cortes_1936', 'cortes_guerra', 'cortes_mexico']:
    for ln in open(RAIZ / 'docs' / 'marcadores' / f'{arch}.md'):
        m = re.match(r'^\| `([^`]+)` \| ([^|]+) \|', ln)
        if not m: continue
        clave, esperado = m.group(1), valor_md(m.group(2))
        vistos += 1
        if clave not in C: print('? sin cálculo', arch, clave); malos += 1; continue
        if C[clave] != esperado: print('✗', arch, clave, 'esperado', esperado, 'calculado', C[clave]); malos += 1
print(f'Marcadores: {vistos} comprobados, {malos} discrepancias.')
sys.exit(1 if (fallos or malos) else 0)
