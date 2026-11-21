"""Build a private, manually translated comparison without changing live lessons."""
import copy
import html
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
import reviewed_transformations as reviewed

ROOT = Path(__file__).resolve().parents[2]
# Extract fresh data from the original lesson files first with extract.cjs.
original = json.loads((ROOT/'graphify-out/bilingual-original.json').read_text('utf-8'))['CG'][0]
english = copy.deepcopy(original)
english.update(title=reviewed.TITLE, intro=reviewed.INTRO, focus=reviewed.FOCUS,
               question=reviewed.QUESTION, hint=reviewed.HINT, answer=reviewed.ANSWER, terms=reviewed.TERMS)
for section, title in zip(english['sections'], reviewed.TITLES):
    soup = BeautifulSoup(section['html'], 'html.parser')
    nodes = [n for n in soup.find_all(string=True) if n.strip() and not n.find_parent('math') and not n.find_parent('aside',lang='en')]
    translations = reviewed.TEXT[section['id']]
    assert len(nodes) == len(translations), (section['id'],len(nodes),len(translations))
    for node, value in zip(nodes, translations):
        # Verify every number and mathematical glyph in the translated prose.
        def symbols(s):
            return re.findall(r'\d+(?:[,.]\d+)*|[\u0370-\u03ff\u2070-\u209f\u2190-\u22ffᵀ′²³°−·]', str(s))
        assert symbols(node) == symbols(value), (section['id'],str(node),value)
        node.replace_with(value)
    # Keep the original MathML byte for byte, including matrices and subscripts.
    maths = re.findall(r'<math[\s\S]*?</math>', section['html'])
    serialized = str(soup)
    position = iter(maths)
    serialized = re.sub(r'<math[\s\S]*?</math>', lambda _: next(position), serialized)
    section['html'] = serialized
    section['title'] = title
    section['source'] = section['source'].replace(' s. ',' p. ').replace(' og ',' and ')

# The previously English supplementary example also gets a Norwegian version.
norwegian = copy.deepcopy(original)
section = norwegian['sections'][2]
soup = BeautifulSoup(section['html'],'html.parser')
aside = soup.find('aside',lang='en')
aside['lang'] = 'nb'
example_nb = [
    'Sett sammen en modellmatrise',
    'Start med et kolonnepunkt (1, 2). Skaler med (2, 3), roter 90° mot klokken og flytt deretter med (4, 1). Leser du operasjonene fra punktet og utover, får du M = TRS. Translasjonen står i siste kolonne fordi den multipliseres med den homogene koordinaten.',
    'Hva endres hvis inndata er en retning?',
    'Kontroller resonnementet',
    'Sett w = 0. Første rad gir −3 × 2 = −6, og andre rad gir 2 × 1 = 2. Translasjonen faller bort, så retningen blir (−6, 2).',
]
nodes = [n for n in aside.find_all(string=True) if n.strip() and not n.find_parent('math')]
assert len(nodes)==len(example_nb)
for node,value in zip(nodes,example_nb): node.replace_with(value)
section['html'] = str(soup)

all_rows = json.loads((ROOT/'visdat/kilder/eksamen.json').read_text('utf-8'))
rows = [row for row in all_rows if row['kapittel']==original['slug']]
skills = [
    'Compose scaling and rotation', 'Count multiplications with and without composition',
    "Scale the triangle's three column-vector vertices", 'Place the scaled vertex at a target point',
    'Rotate about the already translated vertex', 'Order three matrices for column vectors',
    'Construct the 3D scaling matrix', 'Construct a 3D rotation about a displaced centre',
    'Construct a homogeneous 3D translation', 'Determine the dimensions of a homogeneous vertex matrix',
]
refs = [{'id':row['id'],'aar':row['aar'],'anker':row['anker'],'nb':row['ferdighet'],'en':skill,
         'sourceNb':row['kilde'],'sourceEn':row['kilde'].replace(' s. ',' p. ').replace(' nr. ',' no. ')} for row,skill in zip(rows,skills)]
payload = json.dumps({'en':english,'nb':norwegian,'refs':refs},ensure_ascii=False).replace('</',r'<\/')

# Reuse the original transformation calculations, with manually translated UI.
figures = (ROOT/'visdat/figurer.js').read_text('utf-8')
helper = figures[figures.index('  function drawing('):figures.index('  function heightfield(')]
transform = figures[figures.index('  function transform('):figures.index('  function filter(')]
widget_nb = re.search(r"widget.innerHTML =\s*'([^']*)';",transform)[1]
widget_en = '<h3>Try the matrix order</h3><p>The grey triangle starts with the vertex P = (1, 1). Translate along x and rotate about the origin. The green triangle shows the result.</p><canvas style="aspect-ratio:1.75" role="img" aria-label="Triangles in a coordinate system with x pointing right and y pointing up"></canvas><div class="controls"><label>Rotation <select class="angle"><option>0</option><option selected>90</option><option>180</option><option>270</option></select> °</label><label>Translation <input class="shift" type="range" min="-3" max="3" value="2"></label><label>Order <select class="order"><option value="tr">Rotate, then translate</option><option value="rt">Translate, then rotate</option></select></label></div><output aria-live="polite"></output>'
transform = transform.replace("'"+widget_nb+"'",'(lang === "en" ? '+json.dumps(widget_en)+' : '+json.dumps(widget_nb)+')')
transform = transform.replace('"). Med kolonnevektorer: "','(lang === "en" ? "). With column vectors: " : "). Med kolonnevektorer: ")')
output = Path(__file__).with_name('lesson-preview.html')
template = Path(__file__).with_name('preview-template.html').read_text('utf-8')
output.write_text(template.replace('/* CHAPTER_DATA */','const data = '+payload+';').replace('/* TRANSFORM_WIDGET */',helper+transform),'utf-8')
Path(__file__).with_name('transformations.en.json').write_text(json.dumps(english,ensure_ascii=False,indent=2)+'\n','utf-8')
print('Built complete manually translated comparison: 6 sections, 10 exam references, 3 glossary definitions.')

