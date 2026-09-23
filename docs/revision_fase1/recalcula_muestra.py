"""Revisión de coherencia, fase 1 (22-09-2026): recálculo independiente de una muestra de marcadores.
Lee las fuentes primarias en modo solo lectura (V2 depositada, v3 del explorador, sessions.json, erratas de fechas,
CGOCUS V1.1 y bibliotecas del explorador) y compara con el valor esperado de docs/marcadores/. No escribe nada.
Uso: python3 docs/revision_fase1/recalcula_muestra.py   (≈ 40 s)
"""
import pandas as pd, sqlite3, hashlib
P='/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv'
assert hashlib.md5(open(P,'rb').read()).hexdigest()=='360332a0ff1327671530f15eed46ac0c', 'huella V2'
V3='/Users/rodrodr/.cache/luz_site/corpus.sqlite'
assert hashlib.sha256(open(V3,'rb').read()).hexdigest().startswith('3a0d8b2d'), 'huella v3'
_v2=pd.read_csv(P,sep=';',dtype=str,keep_default_na=False)
_v3=pd.read_sql('select * from speeches',sqlite3.connect(f'file:{V3}?mode=ro',uri=True))
import json, re, unicodedata
v2=_v2.copy(); v3=_v3.copy()
v2['idn']=v2.id.astype(int); v2['nw']=v2.nwords.astype(int); v2['ns']=v2.num_session.astype(int)
db=sqlite3.connect('file:/Users/rodrodr/.cache/luz_site/corpus.sqlite?mode=ro',uri=True)
S=json.load(open('/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json'))['sessions']
def fold(s): return ''.join(c for c in unicodedata.normalize('NFD',s) if unicodedata.category(c)!='Mn').lower()
def row2(i): return v2[v2.idn==i].iloc[0]
def row3(i): return v3[v3.id==i].iloc[0]
def has2(i,frag): return frag in row2(i).speech
def has3(i,frag): return frag in row3(i).speech
HABLA="s.speaker NOT IN ('SUMARIO','COMENTARIOS')"
def n(match, extra='',args=()):
    return db.execute(f"SELECT count(*) FROM speeches_fts f JOIN speeches s ON s.id=f.rowid WHERE speeches_fts MATCH ? {extra}",(match,)+args).fetchone()[0]
def etapa(r):
    if r.legislature=='1931-1933': return 'I'
    if r.legislature=='1933-1935': return 'II'
    return 'III' if r.ns<=60 else ('IV' if r.ns<=69 else 'V')
v2['et']=[etapa(r) for r in v2.itertuples()]
PRES=re.compile(r'(VICE)?PRESIDENTE\s*(DE EDAD)?\s*:?$|^El Sr\. (VICE)?PRESIDENTE',re.I)
def chair(sp):
    s=sp.upper()
    return bool(re.search(r'\b(VICE)?PRESIDENTE\b',s)) and not re.search(r'CONSEJO|GOBIERNO|REP[UÚ]BLICA|COMISI[OÓ]N|MINIS',s)
v2['chair']=v2.speaker.map(chair)
R=[]
def chk(k,esp,got):
    ok = str(esp)==str(got)
    R.append((k,esp,got,ok)); print(('OK ' if ok else 'XX ')+k, 'esp',esp,'calc',got)
# 1 ses.s48.cola / sesion...cola
s48=v2[(v2.date=='1931-10-01')&(v2.ns==48)].sort_values('idn')
tail=s48.tail(6); print(tail[['idn','speaker','speech']].values.tolist())
chk('ses.s48.cola.V2.desde',5788,5788 if all('Pido la palabra' in x for x in s48[s48.idn.between(5788,5791)].speech) else '?')
t3=v3[(v3.date=='1931-10-01')&(v3.num_session==48)].sort_values('ord'); print(t3.tail(6)[['id','ord','speaker','speech']].values.tolist())
chk('sesion.1931-10-01-48.cola.pantalla (ord+1 de 6460..6464)',"411-415",f"{int(row3(6460).ord)+1}-{int(row3(6464).ord)+1}")
# ocr bucle
chk('ocr.bucle9.repeticiones',6,row2(976).speech.count('Sánchez Guerra, Ossorio y Gallardo'))
# familias etapa III conservadores
e3=v2[(v2.et=='III')&(~v2.chair)]
print('den etapa III sin pres',e3.nw.sum())
fam=v3[['party_family']].copy()
# normalize family like explorer: use v3 party_family mapping via rep_id? use V2 party_family raw
cons=e3[e3.party_family.str.contains('Conservador',case=False)].nw.sum()
chk('familias.etapa.III.conservadores.pct','26.1',round(100*cons/e3.nw.sum(),1))
# ideologia etapa I D/ED
e1=v2[(v2.et=='I')&(~v2.chair)]
chk('ideologia.etapa.I.d_ed.pct','6.1',round(100*e1[e1.ideology.isin(['D','ED'])].nw.sum()/e1.nw.sum(),1))
# row anchors
anch=[('cita.casasviejas.azana.hurgue.v3',50255,3,'por mucho que se hurgue no se encontrará un atisbo de responsabilidad para el Gobierno.'),
('fila.II.salazar.v3',110044,3,None),
('fila.II.sesion_secreta.V2',71329,2,'han de tratarse en sesión secreta'),
('fila.guerra.negrin_1feb1938.v3',121328,3,'Los crimenes de los fraciosos'),
('fila.II.vivas.V2',74703,2,'son contestados con unánimes aplausos y aclamaciones'),
('fila.mexico.prieto_8nov_b.v3',121588,3,None),
('fila.1936.retirada_re.v3',115167,3,'la retirada de este salón'),
('fila.II.tiros.V2',70714,2,'Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!'),
('fila.mexico.gracias_mexico.v3',121699,3,'agradecer emocionadamente a México, a su Gobierno, a su Prensa y a su pueblo'),
('cita.religiosa.apertura.v3',7387,3,'Abierta la sesión a las cuatro y treinta minutos de la tarde'),
('cita.f27.6.V2',71330,2,'Luz y taquigrafos.'),
('fila.guerra.ayuntamiento.v3',121170,3,'Palacio del Ayuntamiento de Valencia'),
('cita.diario.alba.reglamento.v3',80307,3,'El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías'),
('fila.guerra.fotocopia.V2',107341,2,'se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión'),
('cita.mexico.orden.v3',121500,3,'Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española.'),
('fila.1936.incitacion.V2',102483,2,'Se acaba de hacer una incitación al asesinato'),
('cita.f28.orden.1.V2',13605,2,'Que no constaran en el Diario de Sesiones.'),
('fila.1936.no_constara_6mayo.v3',116698,3,'No constará en el Diario de Sesiones'),
('cita.diario.eso_no_basta.V2',102492,2,'Eso no basta.'),
('cita.diario.grito.v3',80306,3,'Luz y taquigrafos.'),
('fila.1936.retirada_ct.V2',101931,2,'una retirada del Parlamento'),
('fila.II.luz.V2',71330,2,'Luz y taquigrafos.'),
('cita.mexico.permanente.v3',121466,3,'sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia.'),
]
for k,i,ed,frag in anch:
    if frag is None: 
        r=row2(i) if ed==2 else row3(i); print('   (sin fragmento)',k,i,r.date,r.speaker,r.speech[:120].replace('\n',' ')); continue
    ok=has2(i,frag) if ed==2 else has3(i,frag)
    # uniqueness in same edition
    df=v2 if ed==2 else v3
    hits=df[df.speech.str.contains(re.escape(frag))]['idn' if ed==2 else 'id'].tolist()
    chk(k,i, i if ok else f'NO está; aparece en {hits[:5]}')
    if len(hits)>1: print('    (también en',hits[:6],')')
# fila.I.gobierno_se_retira.v3 68887
r=row3(68887); print('   68887',r.date,r.speaker,r.speech[:200].replace('\n',' '))
# fila.azana1935.nwords
chk('fila.azana1935.nwords',14131,int(row2(85330).nw)); print('   v3 96282 nwords',row3(96282).nwords, row2(85330).speaker, row2(85330).date)
chk('cita.casasviejas.azana.hurgue.palabras',528,int(row2(44922).nw))
# searches
chk('busqueda.ses.suprimidas.puerta',3,db.execute("SELECT count(*) FROM speeches_fts f JOIN speeches s ON s.id=f.rowid WHERE speeches_fts MATCH ? AND s.date IN ('1936-06-16','1936-07-01')",('"no constan por orden" OR "no se consigna por orden" OR "no se consignan por orden"',)).fetchone()[0])
print('   suprimidas total',n('"no constan por orden" OR "no se consigna por orden" OR "no se consignan por orden"'))
chk('busqueda.estatuto.habla',493,n('"estatuto de cataluña"',f'AND {HABLA}'))
chk('busqueda.catolica.n',6,n('"España ha dejado de ser católica"'))
chk('busqueda.divorcio.n',531,n('divorcio'))
chk('cortes.mexico.consulta.diputacion_permanente.n',16,n('"diputacion permanente"',"AND s.date BETWEEN '1945-01-10' AND '1945-11-09'"))
chk('busqueda.ses.casas_viejas.m1933_03_habla',108,n('"casas viejas"',f"AND s.date BETWEEN '1933-03-01' AND '1933-03-31' AND {HABLA}"))
# sessions.json
chk('sesion.1931-10-01-48.diario_num',48,[s['diario_num'] for s in S if s['date']=='1931-10-01' and s['num_session']==48][0])
chk('sesion.1933-02-02-288.diario_num',288,[s['diario_num'] for s in S if s['date']=='1933-02-02' and s['num_session']==288][0])
chk('fuente.serie.constituyentes',405,sum(1 for s in S if s['diario']=='Diario de Sesiones de las Cortes Constituyentes de la República Española'))
import collections
print('   diarios',collections.Counter(s['diario'] for s in S))
chk('fuente.series.diarios',2,len({s['diario'] for s in S if s['diario'].startswith('Diario')}))
chk('etapa.I.pres.lara',1,sum(1 for s in S if s['legislature']=='1931-1933' and (s.get('presidente') or {}).get('nombre','').startswith('Antonio Lara')))
# meses
v2['mes']=v2.date.str[:7]
chk('meses.con_sesion',64,v2.mes.nunique())
chk('mes.1933-02.palabras',574317,int(v2[v2.mes=='1933-02'].nw.sum()))
# familias vacias
chk('familias.vacias',151,int((v2.party_family=='').sum()))
chk('voto.141-106.si',141,int(re.search(r'(\d+) votos contra 106',row2(5453).speech).group(1)))
# listas nominales
pat=re.compile(r'senores que (dijeron|han dicho)\s*:?\s*(si|no)\b')
v2['lista']=v2.speech.map(lambda s: bool(pat.search(fold(s))))
L=v2[v2.lista]
chk('etapa.I.listas_nominales.filas',532,int((L.et=='I').sum()))
chk('etapa.III.listas_nominales.filas',81,int((L.et=='III').sum()))
chk('etapa.III.listas_nominales.sesiones',32,L[L.et=='III'].groupby(['date','ns']).ngroups)
chk('etapa.III.listas_nominales.en_presidencia',27,int(L[(L.et=='III')&L.chair].shape[0]))
print('   voto.listas.sesiones (esp 405)',L.groupby(['date','ns']).ngroups,'filas',len(L), 'por etapa',L.groupby('et').size().to_dict(), L.groupby('et').apply(lambda d:d.groupby(['date','ns']).ngroups).to_dict())
# correcciones fechas I
E=pd.read_csv('/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/Dataverse_V2_2026-09-15/erratas_fechas_V1.csv',sep=';')
print(E)
chk('correcciones.fechas.I',6,int((E.legislatura_corregida=='1931-1933').sum()))
# afin censo 1933
A=pd.read_csv('/Users/rodrodr/Dropbox/Apps/luz_site/docs/estudio/critica/afin_diputados_basico.csv',sep=';')
print('   afin legislaturas',A.legislatura.value_counts().to_dict())
chk('afin.1933.censo',470,int((A.legislatura=='1933-1936').sum()))
# bib estatuto sesiones
d=json.load(open('/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/dist/bibliotecas/L2-B5_debate-estatuto-de-cataluna.2replib'))
ids=[it['speech_id'] for it in d['items']]
chk('bib.estatuto.sesiones',6,v3[v3.id.isin(ids)].groupby(['date','num_session']).ngroups)
# oradores v3
h=v3[~v3.speaker.isin(['SUMARIO','COMENTARIOS'])].copy()
h['chair']=h.speaker.map(chair)
def et3(r):
    if r.legislature=='1931-1933': return 'I'
    if r.legislature=='1933-1935': return 'II'
    return 'III' if r.num_session<=60 else ('IV' if r.num_session<=69 else 'V')
h['et']=[et3(r) for r in h.itertuples()]
g=h[(h.et=='I')&(~h.chair)&h.rep_id.notna()].groupby(['rep_id','rep_name']).nwords.sum().sort_values(ascending=False)
print(g.head(3))
chk('oradores.etapa.I.1.pal',426392,int(g.iloc[0]))
roy=h[(~h.chair)&h.rep_name.str.contains('Royo Villanova',na=False)].nwords.sum()
chk('orador.royo.sp.v3',534408,int(roy))
print('\nOK',sum(r[3] for r in R),'de',len(R))
