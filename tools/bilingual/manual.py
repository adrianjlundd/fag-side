"""Manual translation assembly. This module never reads machine drafts."""
import copy
import json
import re
import subprocess
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
ORIGINAL = json.loads(subprocess.run(['node','-e',
    "const fs=require('node:fs'),vm=require('node:vm');const s={window:{}};vm.createContext(s);for(const f of ['cg','ip'])vm.runInContext(fs.readFileSync('visdat/'+f+'.js','utf8'),s);process.stdout.write(JSON.stringify(s.window));"],
    cwd=ROOT,capture_output=True,text=True,encoding='utf-8',check=True).stdout)
CHAPTERS = {ch['slug']:ch for items in ORIGINAL.values() for ch in items}
COMMON = {'Se svar':'Show answer','Hint':'Hint','Anvendelse · egen treningsoppgave':'Application · our practice exercise',
          'Eksempel.':'Example.','Regn selv underveis.':'Work through the calculation yourself.'}

def nodes(soup):
    return [n for n in soup.find_all(string=True) if n.strip() and not n.find_parent('math')
            and not n.find_parent('aside',lang='en') and str(n).strip() not in COMMON
            and re.search(r'[A-Za-zÆØÅæøå]{2}',str(n))]

def show(slug):
    ch=CHAPTERS[slug]
    print('META', json.dumps({k:v for k,v in ch.items() if k!='sections'},ensure_ascii=False))
    for s in ch['sections']:
        print('\nSECTION',s['id'],s['title'])
        for i,n in enumerate(nodes(BeautifulSoup(s['html'],'html.parser'))): print(i,repr(str(n)))

def assemble(slug, title, intro, focus, titles, blocks, question, hint, answer, terms):
    ch=copy.deepcopy(CHAPTERS[slug])
    ch.update(title=title,intro=intro,focus=focus,question=question,hint=hint,answer=answer,terms=terms)
    ch['termAliases']={a:b for a,b in zip(CHAPTERS[slug].get('terms',{}),terms)}
    assert len(titles)==len(ch['sections'])==len(blocks),slug
    for s,heading,block in zip(ch['sections'],titles,blocks):
        soup=BeautifulSoup(s['html'],'html.parser')
        selected=nodes(soup)
        translated=block.strip('\n').split('\n@@\n')
        assert len(selected)==len(translated),(slug,s['id'],len(selected),len(translated))
        for n,value in zip(selected,translated):
            n.replace_with(value)
        for n in list(soup.find_all(string=True)):
            if n.find_parent('aside',lang='en'):continue
            core=str(n).strip()
            if core in COMMON:n.replace_with(str(n).replace(core,COMMON[core]))
        maths=iter(re.findall(r'<math[\s\S]*?</math>',s['html']))
        s['html']=re.sub(r'<math[\s\S]*?</math>',lambda _:next(maths),str(soup))
        s['title']=heading
        s['source']=s['source'].replace(' s. ',' p. ').replace(' og ',' and ').replace('trykt side','printed page').replace('kap.','ch.').replace('likn.','eq.').replace('fra p.','from p.').replace(' om FFT',' on FFT').replace(' om Hough-transformen',' on the Hough transform')
    path=Path(__file__).with_name('reviewed')
    path.mkdir(exist_ok=True)
    (path/(slug+'.json')).write_text(json.dumps(ch,ensure_ascii=False,indent=2)+'\n','utf-8')
    log=ROOT/'PROGRESS.md'
    text=log.read_text('utf-8')
    marker=f'- [x] `{slug}`'
    if marker not in text:
        with log.open('a',encoding='utf-8') as f:
            f.write(f'\n{marker} · {title}: manuelt oversatt og gjennomgått, {len(ch["sections"])} avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Nettleserkontroll av den integrerte utgaven gjenstår.\n')
    print('Reviewed',slug,len(ch['sections']),'sections')

if __name__=='__main__':
    import sys
    show(sys.argv[1])
