"""Create the English-first HTML shell and its exact Norwegian text map."""
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
ROOT = Path(__file__).resolve().parents[2]
NB = Path(__file__).with_name('shell-originals.json')
originals = json.loads(NB.read_text('utf-8'))
originals['visdat/dokument.html'] = next(content for name,content in originals.items() if name.endswith('kilder.html')).replace('data-page="sources"','data-page="source-document"')
translations = {
 'Grunnleggende visuell databehandling · Visdat TDT4195':'Introduction to Visual Computing · Visdat TDT4195',
 'Temakapittel · Visdat TDT4195':'Topic chapter · Visdat TDT4195',
 'Eksamenstrening · Visdat TDT4195':'Exam practice · Visdat TDT4195',
 'Begreper · Visdat TDT4195':'Glossary · Visdat TDT4195',
 'Pensum og kilder · Visdat TDT4195':'Syllabus and sources · Visdat TDT4195',
 'Kilder · Visdat TDT4195':'Sources · Visdat TDT4195',
 'TDT4195 · Grunnleggende visuell databehandling':'TDT4195 · Introduction to Visual Computing',
 'Åpne studiesiden for TDT4195':'Open the TDT4195 study site',
 'Hopp til innhold':'Skip to content', 'Visdat, fagforsiden':'Visdat, course home',
 'Hovedmeny':'Main navigation', 'Pensum':'Syllabus', 'Eksamenstrening':'Exam practice',
 'Begreper':'Glossary', 'Om pensum og kilder':'About the syllabus and sources',
 'Slå på JavaScript for å vise kapitler, begreper og oppgaver.':'Enable JavaScript to display chapters, glossary entries and exercises.',
 'NTNU / HØST 2026':'NTNU / AUTUMN 2026', 'Grunnleggende':'Introduction to', 'visuell':'visual', 'databehandling':'computing',
 'Fra geometri til piksler, fra piksler til mening. Lær pensum steg for steg og prøv metodene på eksamensoppgaver.':'From geometry to pixels, from pixels to meaning. Learn the syllabus step by step and apply the methods to exam questions.',
 'Start læringsstien':'Start learning', 'HØYDEFELT':'HEIGHT FIELD',
 'Et høydefelt av punkter og trekanter. Flere prøver viser terrenget mer detaljert.':'A height field of points and triangles. More samples reveal the terrain in greater detail.',
 'Prøvetetthet':'Sampling density', 'LÆRINGSSTIEN':'LEARNING PATH', 'Pensum i to deler':'A syllabus in two parts',
 'Velg et tema eller følg kapitlene i rekkefølge.':'Choose a topic or follow the chapters in order.',
 'EKSAMENSTRENING':'EXAM PRACTICE', 'Prøv deg på tidligere eksamener':'Practise with past exams',
 'Følg et helt sett i original rekkefølge, eller tren på én ferdighet om gangen.':'Work through a complete paper in its original order, or practise one skill at a time.',
 'Høst 2024':'Autumn 2024', 'Høst 2025':'Autumn 2025',
}
normalize = lambda s: re.sub(r'\s+',' ',s).strip()
reverse = {}
for name, original in originals.items():
    soup = BeautifulSoup(original, 'html.parser')
    soup.html['lang'] = 'en'
    for node in list(soup.find_all(string=True)):
        key = normalize(str(node))
        if key in translations:
            reverse[translations[key]] = key
            node.replace_with(translations[key])
    for el in soup.find_all(True):
        for attr in ['aria-label','title','alt','placeholder']:
            key = normalize(el.get(attr,''))
            if key in translations:
                reverse[translations[key]] = key
                el[attr] = translations[key]
    if name != 'index.html':
        for el in soup.find_all('script'): el.decompose()
        script = soup.new_tag('script',src='language.js'); soup.head.append(script)
    else:
        # The root remains a fallback entry and immediately redirects to the
        # full landing page, where the same preference and toggle apply.
        script = soup.new_tag('script')
        script.string = "try { if (localStorage.getItem('visdat.language') === 'nb') { document.documentElement.lang = 'nb'; document.title = 'TDT4195 · Grunnleggende visuell databehandling'; document.querySelector('a').textContent = 'Åpne studiesiden for TDT4195'; } } catch {} const destination = new URL('visdat/', location.href); destination.search = location.search; destination.hash = location.hash; location.replace(destination);"
        soup.body.append(script) if soup.body else soup.html.append(script)
    (ROOT/name).write_text(str(soup),'utf-8')
(ROOT/'visdat/shell.js').write_text('window.visdatNorwegianShell = '+json.dumps(reverse,ensure_ascii=False,indent=2)+';\n','utf-8')
print(f'Wrote {len(originals)} English shells with {len(reverse)} Norwegian text mappings.')
