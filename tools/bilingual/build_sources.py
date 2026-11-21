import json
import re
from urllib.parse import urlsplit,parse_qs
from manual import ROOT,CHAPTERS
from reviewed_coverage import DESCRIPTIONS

english={}
for group in ['cg','ip']:
    text=(ROOT/f'visdat/{group}.en.js').read_text('utf-8')
    english.update({c['slug']:c for c in json.loads(text.split(' = ',1)[1].rstrip(';\n'))})
titles={CHAPTERS[k]['title']:v['title'] for k,v in english.items()}
def citation(s):
    return s.replace(' s. ',' p. ').replace(' og ',' and ').replace('kap.','ch.').replace('likn.','eq.').replace('Gonzalez og Woods','Gonzalez and Woods').replace('fra p.','from p.').replace(' om FFT',' on FFT').replace(' om Hough-transformen',' on the Hough transform')

source=(ROOT/'visdat/kilder/pensumdekning.md').read_text('utf-8')
lines=[]; index=0
for line in source.splitlines():
    if line.startswith('# '):line='# Syllabus coverage · TDT4195 H26'
    elif line.startswith('## ') and line[3:] in titles:line='## '+titles[line[3:]]
    elif line.startswith('| [') and index < 73:
        cells=line.split('|')
        link=re.search(r'\[([^]]+)\]\(([^)]+)\)',cells[1]); url=link[2]
        slug=parse_qs(urlsplit(url).query)['k'][0]; anchor=urlsplit(url).fragment
        section=next(s for s in english[slug]['sections'] if s['id']==anchor)
        cells[1]=f' [{section["title"]}]({url}). {DESCRIPTIONS[index]} '
        cells[2]=citation(cells[2])
        cells[3]=cells[3].replace('Fullt undervist for målet i denne raden.','Fully taught for the objective in this row.').replace('Fullt undervist.','Fully taught.')
        line='|'.join(cells);index+=1
    elif line=='| Læringsmål og leksjon | Kilde | Dekning |':line='| Learning objective and lesson | Source | Coverage |'
    lines.append(line)
assert index==len(DESCRIPTIONS)==73
# Replace the introduction and final outcomes section with a manual translation.
intro='The lecture plans and lecturers’ slides define the scope. The sections’ specific calculation and interpretation objectives are educational interpretations of the course information’s broad outcomes. The table says **fully taught** when a student receives a procedure, example and independent application of the skill. **Partially taught** identifies named areas covered in less depth. **Source-limited** means local documentation is missing. PDF pages are one-based; DIP4e uses printed page numbers. Past exams and answer status are in the [exam analysis](eksamensanalyse.en.md).'
lines[2]=intro
text='\n'.join(lines)
text=text[:text.index('## Kursutbytte')]+'''## Course outcomes, laboratories and source gaps

| Outcome in course_information.txt and plans | Where it is practised | Coverage |
|---|---|---|
| Knowledge of principles and algorithms in image synthesis and image analysis | [Image synthesis](../tema.html?k=scenegrafer#pipeline) and [image analysis](../tema.html?k=segmentering#regionvekst), expanded in the tables above | Status is specified per method. |
| Graphics and image-processing programming, OpenGL with C/C++ or Rust, and image processing with Python | [Transformation chains](../tema.html?k=scenegrafer#hierarki), [pixel calculations](../tema.html?k=filtrering#kjerne) and [component labelling](../tema.html?k=morfologi#komponenter) | Partially taught. Students practise algorithms and intermediate results. Practical coding and assessment take place in the course laboratories. |
| General competence in applying and extending visual methods | [Choosing filtering methods](../tema.html?k=filtrering#utjevning) and [model selection on new images](../tema.html?k=nevrale-nett#trening) | Partially taught. Calculation and interpretation exercises cover bounded problems. A larger independent application forms part of the practical work. |
| CG introduction on 17.8. and ARM guest lecture on 28.9. | [Primitives and the pipeline](../tema.html?k=scenegrafer#pipeline) draw on the available CGVIZ chapters. | Source-limited for the separate TDT4195-2026_info file and ARM lecture. |
| UDL as supporting literature for FCNN, CNN and transformers | [Networks](../tema.html?k=nevrale-nett#forover), [CNN](../tema.html?k=cnn#form), [ViT](../tema.html?k=transformer#oppmerksomhet) | The UDL book itself is missing locally. Teaching uses the H26 slides and six local example files. |

Historical examples, demonstration images and software outputs illustrate their respective methods. The table counts learning objectives, not individual figures. H24 no. 3 and H25 nos. 2 and 13 have question-specific uncertainties described in the exam analysis.
'''
(ROOT/'visdat/kilder/pensumdekning.en.md').write_text(text,'utf-8')
print('Translated coverage audit: 73 aligned objectives, original citations and links.')

from reviewed_analysis import INTRO
rows=json.loads((ROOT/'visdat/kilder/eksamen.en.json').read_text('utf-8'))
skills={r['id']:r['ferdighet'] for r in rows}
original=(ROOT/'visdat/kilder/eksamensanalyse.md').read_text('utf-8')
tables=original[original.index('### Høst 2024'):]
tables=tables.replace('### Høst 2024','### Autumn 2024').replace('### Høst 2025','### Autumn 2025').replace('| ID og øvingslenke | Nr. · del | Ferdighet | Oppgaveside / svarside | Maks |','| ID and practice link | No. · part | Skill | Question page / answer page | Maximum |')
lines=[]
for line in tables.splitlines():
    match=re.match(r'\| \[(H\d\d-[^]]+)\]',line)
    if match:
        cells=line.split('|');cells[3]=' '+skills[match[1]]+' ';line='|'.join(cells)
    lines.append(line)
(ROOT/'visdat/kilder/eksamensanalyse.en.md').write_text(INTRO+'\n'+'\n'.join(lines)+'\n','utf-8')
print('Translated full exam analysis and its 134 original-order table entries.')
