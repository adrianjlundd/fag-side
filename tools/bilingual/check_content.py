"""Structural, numerical and remaining-prose audit of both static languages."""
from collections import Counter
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
from manual import ROOT,ORIGINAL

def read(group,lang):
    return json.loads((ROOT/f'visdat/{group}.{lang}.js').read_text('utf-8').split(' = ',1)[1].rstrip(';\n'))
def prose(html):return BeautifulSoup(html,'html.parser').get_text(' ')
def numbers(text):
    return Counter(re.findall(r'\d+(?:[,.]\d+)*',text))
def symbols(text):
    return Counter(re.findall(r'[\u0370-\u03ff\u2070-\u209f\u2190-\u22ffᵀ′²³°−·]',text))
issues=[]; sections=0
for group,originals in ORIGINAL.items():
    for original,en,no in zip(originals,read(group.lower(),'en'),read(group.lower(),'nb')):
        assert en['slug']==no['slug']==original['slug']
        assert [s['id'] for s in en['sections']]==[s['id'] for s in original['sections']]
        assert len(en['terms'])==len(no['terms'])==len(original['terms'])
        for key in ['question','hint','answer']:
            if numbers(original[key])!=numbers(en[key]):issues.append((original['slug'],key,'numbers',original[key],en[key]))
        for before,after,nb in zip(original['sections'],en['sections'],no['sections']):
            sections+=1
            a,b,c=map(lambda x:BeautifulSoup(x['html'],'html.parser'),[before,after,nb])
            for tag in ['p','details','summary','dfn','math','table','tr','td']:
                assert len(a.find_all(tag))==len(b.find_all(tag))==len(c.find_all(tag)),(en['slug'],before['id'],tag)
            # Explicit localisation of four textual subscript labels is the only
            # MathML change: the mathematical structure remains identical.
            ma=re.findall(r'<math[\s\S]*?</math>',before['html'])
            mb=re.findall(r'<math[\s\S]*?</math>',after['html'])
            def localise(m):
                for old,new in [('foran','front'),('bak','back'),('inn','in'),('ut','out')]:m=m.replace('<mi>'+old+'</mi>','<mi>'+new+'</mi>')
                return m
            assert list(map(localise,ma))==mb
            if numbers(a.get_text())!=numbers(b.get_text()):issues.append((en['slug'],before['id'],'numbers',str(numbers(a.get_text())-numbers(b.get_text())),str(numbers(b.get_text())-numbers(a.get_text()))))
            if symbols(a.get_text())!=symbols(b.get_text()):issues.append((en['slug'],before['id'],'mathematical symbols'))
            # Ignore all IDs/attributes and scan only text actually delivered.
            for node in b.find_all(string=True):
                if re.search(r'[æøåÆØÅ]|\b(?:Grunnøving|Anvendelse|svar|foran|bak|når|hvor|hvilken|og|gir|får|ikke|deretter|først|eller|beregn|finn|velg|utgang|inngang)\b',str(node),re.I):
                    issues.append((en['slug'],before['id'],'prose',str(node)))
            # All Norwegian text outside the formerly English aside is exact.
            strip=lambda s:re.sub(r'<aside lang="en"[\s\S]*?</aside>|<aside[^>]*lang="nb"[\s\S]*?</aside>','',s)
            assert strip(before['html'])==strip(nb['html']),(en['slug'],before['id'],'Norwegian changed')
original=json.loads((ROOT/'visdat/kilder/eksamen.json').read_text('utf-8'))
en=json.loads((ROOT/'visdat/kilder/eksamen.en.json').read_text('utf-8'))
assert len(original)==len(en)==134
for a,b in zip(original,en):
    for key in ['id','aar','nummer','deloppgave','kurskode','del','kapittel','poeng','oppgavepoeng','anker']:assert a[key]==b[key],(a['id'],key)
    for key in ['originalSvar','variant','losning']:
        if numbers(a[key])!=numbers(b[key]):issues.append((a['id'],key,'numbers',str(numbers(a[key])-numbers(b[key])),str(numbers(b[key])-numbers(a[key]))))
        if symbols(a[key])!=symbols(b[key]):issues.append((a['id'],key,'mathematical symbols'))
    ch=next(ch for cs in ORIGINAL.values() for ch in cs if ch['slug']==b['kapittel'])
    assert b['anker'] in [s['id'] for s in ch['sections']]
report={'chapters':15,'sections':sections,'examEntries':len(en),'issues':issues}
(ROOT/'graphify-out/bilingual-content-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),'utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
if issues:raise SystemExit(1)
