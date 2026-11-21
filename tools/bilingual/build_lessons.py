import copy
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
from manual import ROOT, ORIGINAL
from norwegian_examples import EXAMPLES

out=Path(__file__).with_name('reviewed')
for group,chapters in ORIGINAL.items():
    en=[]; nb=[]
    for original in chapters:
        slug=original['slug']
        path=out/(slug+'.json') if slug!='transformasjoner' else Path(__file__).with_name('transformations.en.json')
        ch=json.loads(path.read_text('utf-8'))
        for section in ch['sections']:
            section['source']=section['source'].replace('fra p.','from p.').replace(' om FFT',' on FFT').replace(' om Hough-transformen',' on the Hough transform')
            section['html']=section['html'].replace('<p>I <dfn>self-attention</dfn> computes','<p><dfn>Self-attention</dfn> computes').replace('<p>I <dfn>deferred shading</dfn> performs','<p><dfn>Deferred shading</dfn> performs')
            for old,new in [('foran','front'),('bak','back'),('inn','in'),('ut','out')]:
                section['html']=section['html'].replace('<mi>'+old+'</mi>','<mi>'+new+'</mi>')
        ch['termAliases']={a:b for a,b in zip(original.get('terms',{}),ch.get('terms',{}))}
        en.append(ch)
        no=copy.deepcopy(original)
        no['termAliases']={a:b for a,b in zip(ch.get('terms',{}),original.get('terms',{}))}
        for section in no['sections']:
            # Replace only the English supplementary example. All Norwegian
            # prose outside it remains byte-for-byte identical to the original.
            def replace(match):
                soup=BeautifulSoup(match[0],'html.parser')
                aside=soup.find('aside');aside['lang']='nb'
                nodes=[n for n in aside.find_all(string=True) if n.strip() and not n.find_parent('math') and not n.find_parent(class_='calculation')]
                values=EXAMPLES[slug]
                assert len(nodes)==5
                for n,value in zip(nodes,[*values[:3],'Kontroller resonnementet',values[3]]):n.replace_with(value)
                # Calculation labels are prose too; keep the equations intact.
                for node in aside.select('.calculation'):
                    for n in list(node.find_all(string=True)):
                        if n.find_parent('math'):continue
                        value=str(n).replace('4-connected area = 1 pixel; 8-connected area = 2 pixels.','4-sammenhengende areal = 1 piksel; 8-sammenhengende areal = 2 piksler.').replace('Inner boundary =','Indre rand =').replace('Area =','Areal =').replace(' pixels.',' piksler.').replace('Parameters =','Parametere =')
                        n.replace_with(value)
                maths=iter(re.findall(r'<math[\s\S]*?</math>',match[0]))
                return re.sub(r'<math[\s\S]*?</math>',lambda _:next(maths),str(aside))
            section['html']=re.sub(r'<aside lang="en"[\s\S]*?</aside>',replace,section['html'])
        nb.append(no)
    for code,rows in [('en',en),('nb',nb)]:
        (ROOT/f'visdat/{group.lower()}.{code}.js').write_text('window.'+group+' = '+json.dumps(rows,ensure_ascii=False,indent=2)+';\n','utf-8')
print('Built complete aligned EN/NO data: 15 chapters and 73 sections.')
