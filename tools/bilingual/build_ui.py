"""Assemble manually translated UI literals; identifiers are never translated."""
import json
import re
from manual import ROOT

UI = {
'Kildetabell':'Source table','Ukjent kildedokument.':'Unknown source document.','Last ned Markdown':'Download Markdown','Les eksamensanalysen':'Read the exam analysis','Pensumdekning og læringsmål':'Syllabus coverage and learning objectives',
'Tallnotasjon: Eksemplene beholder originalenes desimalkomma og semikolon mellom komponenter. Noen tilleggseksempler bruker desimalpunkt.':'Number notation: examples retain the originals’ decimal commas and semicolons between components. Some supplementary examples use decimal points.',
'Brødsmulesti':'Breadcrumbs','Fagforsiden':'Course home',
'Oppgaveregisteret kunne ikke lastes. Åpne siden via en lokal HTTP-server eller GitHub Pages og prøv igjen.':'The question register could not be loaded. Open the site through a local HTTP server or GitHub Pages and try again.',
'Ukjent kapittel':'Unknown chapter','Fant ikke kapitlet.':'The chapter was not found.','Åpne pensumoversikten':'Open the syllabus overview','Forkunnskap:':'Prerequisite:',
'Eksamensfokus':'Exam focus','Tidligere oppgaver':'Past exam questions','Prøv selv':'Try it yourself','Henter oppgavereferanser …':'Loading question references …',
'NY TRENINGSOPPGAVE':'NEW PRACTICE EXERCISE','Se svar til originaloppgaven':'Show answer to the original question','Se svar':'Show answer',
'Eget løsningsforslag til varianten':'Our proposed solution to the variant','Eget løsningsforslag':'Our proposed solution',
'Les videre':'Read on','Forrige kapittel':'Previous chapter','Pensumoversikt':'Syllabus overview','Neste kapittel':'Next chapter','Gå til eksamenstrening':'Go to exam practice','I dette kapitlet':'In this chapter',
'Tren med tidligere eksamensoppgaver':'Practise with past exam questions',
'Dette kapitlet følger H26-planen. Du kan øve med oppgaven nedenfor.':'This chapter follows the H26 plan. Practise with the exercise below.',
'Tilbake til oppgaven':'Back to the question','Lukk definisjon':'Close definition','Begreper':'Glossary','OPPSLAGSVERK':'REFERENCE',
'Slå opp en definisjon og åpne kapitlet som bruker begrepet.':'Look up a definition and open the chapter that uses the term.',
'Søk i begreper og definisjoner':'Search terms and definitions','Skriv et fagbegrep':'Enter a technical term','Ingen begreper samsvarer med søket.':'No terms match your search.',
'Høst 2024':'Autumn 2024','Høst 2025':'Autumn 2025','Øv etter tema':'Practise by topic','Egne treningsvarianter':'Our practice variants',
'Eksamenstrening':'Exam practice','OPPGAVEBANK':'QUESTION BANK',
'Velg et eksamenssett for å følge original rekkefølge, eller konsentrer deg om ett tema. Alle løsningsforslag er skjult fra start.':'Choose an exam paper to follow its original order, or focus on one topic. All proposed solutions are initially hidden.',
'Treningsform':'Practice mode','Tema':'Topic','Alle temaer':'All topics',
'Ingen registrerte eksamensoppgaver i dette utvalget.':'There are no registered exam questions in this selection.','Prøv en egen treningsoppgave':'Try one of our practice exercises',
' poeng for hele nr. ':' points for the whole question no. ',' poeng':' points','NY TRENINGSVARIANT':'NEW PRACTICE VARIANT','TIDLIGERE EKSAMENSOPPGAVE':'PAST EXAM QUESTION',
'Bruk originalarket for oppgavetekst og eventuelle figurer.':'Use the original paper for the question wording and any figures.',
'Egen treningsvariant':'Our practice variant','Oppgave ':'Question ',' av ':' of ','Les forklaringen':'Read the explanation','Bla i oppgaver':'Browse questions','Forrige oppgave':'Previous question','Neste oppgave':'Next question',
'Kilder':'Sources','TDT4195 · HØST 2026':'TDT4195 · AUTUMN 2026','Pensum og kilder':'Syllabus and sources',
'Emneinformasjonen gir læringsutbyttet. Forelesningsplanene avgrenser hvilke metoder og bokavsnitt som hører til semesteret.':'The course information defines learning outcomes. The lecture plans specify the methods and book sections belonging to this semester.',
'Hva skal du kunne?':'What should you be able to do?',
'Forklare prinsipper og algoritmer i grunnleggende bildesyntese og bildeanalyse, og bruke verktøy til grafikk- og bildebehandlingsprogrammering. De konkrete regne- og tegneferdighetene under Eksamensfokus er våre presiseringer ut fra planer, fagstoff og tidligere oppgaver.':'Explain principles and algorithms in basic image synthesis and image analysis, and use tools for graphics and image-processing programming. The specific calculation and drawing skills under Exam focus are our interpretations of the plans, teaching material and past questions.',
'«Faglig innhold» og «Læringsutbytte»':'«Faglig innhold» (Course content) and «Læringsutbytte» (Learning outcomes)',
'Leserekkefølgen går fra punkter og koordinatsystemer til kamera, synlighet og det ferdige bildet. Hvert kapittel viser til aktuelle CGVIZ-slides og avsnitt fra Graphics &amp; Visualization.':'The reading path leads from points and coordinate systems to cameras, visibility and the final image. Each chapter references relevant CGVIZ slides and sections of Graphics &amp; Visualization.',
'17. august–28. september 2026':'17 August–28 September 2026',
'Slidene utgjør IP-pensum. Gonzalez og Woods, Digital Image Processing, 4. utgave, gir støtte til de klassiske metodene. Planen kobler dyp læring til Understanding Deep Learning, kapittel 4, 10 og 12, og til forelesningseksemplene om FCNN, CNN og ViT.':'The slides constitute the IP syllabus. Gonzalez and Woods, Digital Image Processing, 4th edition, support the classical methods. The plan links deep learning to Understanding Deep Learning, chapters 4, 10 and 12, and the lecture examples on FCNN, CNN and ViT.',
'Grunnlaget for oppgavene':'Basis of the exercises',
'Årgangene 2024 og 2025 har hver en NoAnswers-fil og en svarfil. Kildene er angitt med PDF-side og oppgavenummer i treningen. Egne oppgaver bruker nye tall og egne forklaringer. Vektingen av temaer for H26 er en faglig vurdering.':'The 2024 and 2025 exams each have a NoAnswers file and an answer file. Practice references specify PDF page and question number. Our exercises use new numbers and our own explanations. The topic priorities for H26 are an educational judgement.',
'Les eksamensanalysen (Markdown)':'Read the exam analysis (Markdown)','Pensumdekning og læringsmål (Markdown)':'Syllabus coverage and learning objectives (Markdown)','Åpne oppgaveregisteret (JSON)':'Open the question register (JSON)',
'Bygg et bilde fra punkter, flater og lys.':'Build an image from points, surfaces and light.','Hent informasjon fra piksler og mønstre.':'Extract information from pixels and patterns.',
}
WIDGET = {
'Prøv matriserekkefølgen':'Try the matrix order',
'Den grå trekanten starter med hjørnet P = (1, 1). Flytt langs x og roter om origo. Den grønne trekanten viser resultatet.':'The grey triangle starts with vertex P = (1, 1). Translate along x and rotate about the origin. The green triangle shows the result.',
'Trekanter i et koordinatsystem med x mot høyre og y opp':'Triangles in a coordinate system with x pointing right and y up',
'Rotasjon':'Rotation','Flytting':'Translation','Rekkefølge':'Order','Roter, så flytt':'Rotate, then translate','Flytt, så roter':'Translate, then rotate','Med kolonnevektorer:':'With column vectors:',
'Flytt filteret til kanten':'Move the filter to the boundary',
'Inndata er et gråtonebilde på 3 × 3. Velg sentrum for å se hvilke verdier den vannrette kjernen bruker.':'The input is a 3 × 3 greyscale image. Choose a centre position to see which values the horizontal kernel uses.',
'Pikselverdier radvis':'Pixel values in row order','Kjerne fra venstre mot høyre:':'Kernel from left to right:','Piksel':'Pixel','Midten':'Centre','Venstre kant':'Left edge','Høyre kant':'Right edge','Operasjon':'Operation','Korrelasjon':'Correlation','Konvolusjon':'Convolution','Utenfor bildet':'Outside the image','Nullutfylling':'Zero padding','Gjenta kantpiksel':'Repeat the edge pixel',
'Fordel oppmerksomheten':'Distribute attention',
'To tokener har verdiene 2 og 8. Den første skåren er 0. Endre den andre skåren og se hvordan softmax vekter verdiene for én query.':'Two tokens have values 2 and 8. The first score is 0. Change the second score to see how softmax weights the values for one query.',
'Skår for token 2':'Score for token 2','Skårer':'Scores','Vekter':'Weights','Ny verdi':'New value',
'Test et asymmetrisk strukturelement':'Test an asymmetric structuring element',
'Endre inngangsraden ved å trykke på pikslene. Indeksene går fra 0 til 6. ':'Change the input row by pressing its pixels. Indices run from 0 to 6. ',
'Elementet B = {0, 1} er forankret til venstre, og utenfor raden er verdien null.':'Element B = {0, 1} is anchored on the left; outside the row, the value is zero.',
'Inngangspiksel':'Input pixel','Inngang':'Input','Erosjon':'Erosion','Dilasjon':'Dilation',
'Forutsi hvilke posisjoner som blir 1, og åpne resultatet.':'Predict which positions become 1, then reveal the result.','Se resultat':'Show result',
'Ved i må både i og i + 1 være på.':'At i, both i and i + 1 must be on.','Ved i holder det med forgrunn i i eller i − 1.':'At i, foreground at i or i − 1 is sufficient.',
}
literal=re.compile(r'//[^\n]*|/\*[\s\S]*?\*/|/(?:\\.|\[(?:\\.|[^\]\\])*\]|[^/\n\\])+/[gimsuy]*|"(?:\\.|[^"\\])*"|\x27(?:\\.|[^\x27\\])*\x27')
def translate(s,mapping):
    def replacement(match):
        raw=match[0]
        if raw.startswith('/'):return raw
        value=raw[1:-1].replace('\\"','"').replace("\\'","'")
        new=value
        for a,b in sorted(mapping.items(),key=lambda item:-len(item[0])):new=new.replace(a,b)
        return json.dumps(new,ensure_ascii=False) if new!=value else raw
    return literal.sub(replacement,s)

side=translate((ROOT/'visdat/side.js').read_text('utf-8'),UI)
side=side.replace('"nb"','"en"').replace('kilder/eksamen.json','kilder/eksamen.en.json').replace('kilder/eksamensanalyse.md','kilder/eksamensanalyse.en.md').replace('kilder/pensumdekning.md','kilder/pensumdekning.en.md')
side=side.replace("slug + '.md'", "slug + '.en.md'")
(ROOT/'visdat/side.en.js').write_text(side,'utf-8')
figures=translate((ROOT/'visdat/figurer.js').read_text('utf-8'),WIDGET).replace('"nb-NO"','"en-GB"')
(ROOT/'visdat/figurer.en.js').write_text(figures,'utf-8')
print('Built manually translated page UI and all four widgets.')
