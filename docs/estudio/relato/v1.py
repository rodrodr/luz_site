import pandas as pd, re
v2=pd.read_pickle('v2.pkl'); v3=pd.read_pickle('v3.pkl')
def row(df,i,n=260):
    r=df[df.id==i].iloc[0]
    return f"id {r.id} | {r.date} ses {r.num_session} ord {r.order} | {r.speaker} | {r.rep_name} ({r.party},{r.ideology}) | nwords {r.nwords} | {r.speech[:n].replace(chr(10),' ')}"
for i in [5419,5422,5423,5424,5453]: print('V2',row(v2,i,300))
print()
r=v2[v2.id==5453].iloc[0]; s=r.speech; m=re.search(r'.{200}161.{200}',s,re.S); print('5453 ctx:', m.group(0).replace('\n',' ') if m else s[-600:])
print()
for i in [6748]: print('V2',row(v2,i,200))
s=v2[v2.id==6748].speech.iloc[0]; m=re.search(r'.{150}dejado de ser cat.lica.{250}',s,re.S); print(m.group(0).replace('\n',' '))
print()
for i in [25979,25981]: print('V2',row(v2,i,300))
print()
# v3 Azaña 1932-05-27
d=v3[(v3.date=='1932-05-27')&(v3.nwords>3000)]
for _,r in d.iterrows(): print('v3',r.id,r.speaker,r.rep_name,r.nwords)
