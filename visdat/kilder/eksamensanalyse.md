# TDT4195 · Eksamensanalyse for høsten 2026

## Hva ble faktisk prøvd?

H24 har 28 fagoppgaver og H25 har 27. Begge setter av omtrent halvparten av poengene til hver fagdel. Nr. 1 i begge sett er et frivillig antakelsesfelt på 0 poeng (H24 s. 6, H25 s. 2). Første fagoppgave er derfor nr. 2. **Transformasjoner, kamerarom, rasterisering, bitfordeling, Phong, histogram, romlige filtre, FFT, regionvekst, morfologi og alle tre nettverkstypene forekommer i begge sett.**

[Åpne eksamenstreningen](../eksamen.html) · [Maskinlesbart oppgaveregister](eksamen.json)

### Hvilke konkrete CG-transformasjoner tester eksamenene?

Den lokale Graphify-serveren ble spurt om transformasjoner, læringsmål og pensum. Det brede søket returnerte også lys- og fargeoppgaver. Et oppfølgingssøk med H24-02…04 og H25-02…05 fant modellmatriser, kamera og pivotrotasjon med kildeplasseringer. Vi kontrollerte matrisene, figurene og de grønne svarmarkeringene på gjengitte PDF-sider. Tabellen nedenfor inkluderer perspektivprojeksjon som et eget steg etter kameratransformasjonen.

**Direkte i kildene** er hva kandidaten skulle finne, poeng for hele Inspera-oppgaven, forelesningstemaene og de markerte svarene. Grafens `EXTRACTED`-forbindelser knytter disse opplysningene til kildefiler og sider. **Faglig utledning** er koblingen fra oppgavetypen til et bestemt H26-regnemål eller bokavsnitt. Disse forbindelsene er merket `INFERRED`. Kursinformasjonen angir bredere kunnskapsmål om prinsipper og algoritmer i bildesyntese og bildeanalyse, og ferdighetsmål om programmering. Den gir ingen oppgavespesifikk liste over matriser som skal kunne gjengis. Kilde: `course_information.txt`, linje 31–35.

| Oppgave og oppgavearkets PDF-side | Hva kandidaten måtte gjøre | Utledet treningsmål og H26-kilde |
| --- | --- | --- |
| H24 nr. 2, CG1-Q1, s. 7 · 9,94 p | Sette opp en homogen modellmatrise for skalering etterfulgt av rotasjon. Sammenlikne antall multiplikasjoner for 1000 hjørner med og uten forhåndsberegning. | Bruk kolonnematriser, regn RzS og skill engangskostnad fra kostnad per hjørne. CG-plan 20., 24. og 27.8., `Transformations.pdf` s. 10–13 og 27, `CGVIZ_Chapter_3_2022.pdf` s. 10–20 og 48–55. |
| H24 nr. 3, CG1-Q2, s. 8–9 · 5 p | Lese verdens- og øyeaksene i en tegning og oppgi en begrunnet WCS→ECS-matrise. | Flytt øyepunktet til origo før koordinatene uttrykkes i kamerabasisen. CG-plan 31.8., `Projections_and_Viewing_Transformations.pdf` s. 16–17, `CGVIZ_Chapter_4_2022.pdf` s. 25–33. |
| H24 nr. 4, CG1-Q3, s. 10 · 5 p | Telle plan i frustum og fylle ut projeksjonsmatrisen fra horisontal synsvinkel, sideforhold og signert nær-/fjernplan. | Beregn skala og dybde og kontroller etter divisjon med w′=z. CG-plan 31.8. og 7.9., `Projections_and_Viewing_Transformations.pdf` s. 19–23, likning 1.13, og `CGVIZ_Chapter_4_2022.pdf` s. 34–46. |
| H25 nr. 2, CG1-Q1, s. 3 · 5,94 p | Beregne hjørnene etter tre steg: skalering, plassering av A og rotasjon med klokken om den nye posisjonen til B. | Følg punktene mellom stegene. Flytt til pivot, roter og flytt tilbake. CG-plan 20. og 24.8., `Transformations.pdf` s. 10–16 og `CGVIZ_Chapter_3_2022.pdf` s. 32–40. |
| H25 nr. 3, CG1-Q2, s. 4 · 2 p | Velge produktet som representerer kjeden i nr. 2. | Begrunn høyre-til-venstre-rekkefølge ved innsetting av p₁=T₁p. Samme CG-plan og `Transformations.pdf` s. 10–13. |
| H25 nr. 4, CG1-Q3, s. 5–6 · 12 p | Sette opp separate 4×4-matriser for ulik 3D-skalering, z-rotasjon omkring en forskjøvet akse og translasjon. Oppgi radtall og siste koordinat for kubens hjørner. | Bygg T(c)RzT(−c), kontroller at aksens punkter står stille, og hold w=1 for punkter gjennom affine steg. CG-plan 20. og 24.8., `Transformations.pdf` s. 16, 27 og 29–32. |
| H25 nr. 5, CG2-Q1, s. 6 · 10,08 p | Utlede WCS→ECS fra øye, blikkmål og oppvektor. | Skriv kameraets akser som rader etter T(−E). Kontroller origo og fortegn på dybden til målet. CG-plan 31.8., `Projections_and_Viewing_Transformations.pdf` s. 16–17 og `CGVIZ_Chapter_4_2022.pdf` s. 25–33. |

Transformasjonsoppgavene ovenfor utgjør 19,94 poeng i H24 og 30,02 poeng i H25 inklusive kamera og projeksjon. Dette er observerte poeng i to sett. H25 nr. 11 inneholder også pinhole-projeksjon, men ligger i IP-delen og inngår derfor ikke i disse CG-summene.

### Fire detaljer som påvirker fasitlesingen

- **H24 nr. 3.** Øyepunktet er merket (3,0,0) i figuren, men ligger tegnet på verdens z-akse. Aksepiler og akseetiketter må kontrolleres sammen. Begge PDF-versjonene viser den samme figuren. Svarfeltet i Answers s. 8–9 er tomt. Registeret viser forutsetningene bak to egne tolkninger.
- **H24 nr. 4.** Matriseformen har siste rad [0 0 1 0]. Med signerte n=−20 og f=−120 blir de to siste elementene i tredje rad M₃₃=1,4 og M₃₄=48. Dybdeverdiene etter divisjonen er (1,4·(−20)+48)/(−20)=−1 og (1,4·(−120)+48)/(−120)=1. Answers s. 10.
- **H25 nr. 2 og 5.** Inspera Answers s. 3 har 1,5 som siste y-verdi for hjørnet A. Med det oppgitte sentrumet B″=(9,5;6) roteres (−4,5;0) til (0;4,5) med klokken. Tilbakelegging gir y=10,5. For kameraet i nr. 5 godtar fasiten på s. 7 både ren translasjon og en halv omdreining om y etter translasjonen. En egen variant på siden fastsetter negativ lokal z som blikkretning.
- **H25 nr. 13.** I summeringslinjen står 417, mens histogramtabellen har 471 piksler ved grånivå 3. Tabellens verdi gir oppgitt total 4196 og fasitens histogram. NoAnswers s. 16 og Inspera Answers s. 17. For H25 nr. 7 godtar Inspera dessuten telling av delprøver enten for hele figuren eller per piksel (s. 9).

## Leserekkefølge og prioritering

**Først i CG** kommer homogene punkter, sammensetting og scenegrafer. Scenegrafer er eksplisitt satt opp 27.8. og gir trening i å tolke samme produkt relativt til en forelder. De to settene har ingen egen scenegrafoppgave. Deretter følger kamera og projeksjon, klipping, rasterisering, farge og lys. Test en modellmatrise med ett faktisk punkt før du bruker den på alle hjørnene.

**Først i IP** kommer sampling og kvantisering, så punkttransformasjoner, histogram og romlige filtre. Derfra gir det mening å bytte mellom rom- og frekvensdomenet og å bruke filtre til segmentering. Regionvekst og morfologi innfører naboskap og støttemengder. Nettverksdelen går fra ett nevron via konvolusjonslag til transformerens sekvens av bildefliser. Hele rekken FCNN, CNN og ViT inngår uttrykkelig i H26-planen.

| Arbeidsprioritet | Begrunnelse og konkret øving |
| --- | --- |
| Gjenta til regningen sitter | Modell- og kameratransformasjoner, triangeltesting og kantutjevning, histogramutjevning, bildefiltre, FFT, regionvekst, morfologi og nettverksberegninger har dokumenterte oppgaver i begge år. Bytt tall og krev mellomregning. |
| Øv på å forklare et metodevalg | Konservative synlighetstester og klipping har tre fagoppgaver i H24. Hough-linjer og hullkamera har tall- og tolkningsoppgaver i H25. Farge og Phong testes begge år med logikk, bitregning og modellparametere. Se om du kan begrunne et valg uten svaralternativer. |
| Sett av egen pensumtid | Scenegraf og foreldretransformasjon, viewport, z-buffer, alfa/HDR og utsatt skyggelegging er oppført i CG-planen. IP-slidene dekker blant annet flere terskelmetoder, åpning/lukking og nettverksklassifikasjon. Tren disse også når oppgaveregisteret ikke har en direkte parallell. Kunnskaps- og programmeringsmålene omfatter mer enn det en skriftlig skoleeksamen fanger opp. |

H26-vektingen mellom innleveringer og skriftlig eksamen er oppgitt som 40/60 i `course_information.txt`. Dette er vurderingsvekter for emnet. IP-planen angir at slidene er pensum, med Gonzalez og Woods og Understanding Deep Learning som støttelitteratur. CG-planens avsnitts- og slideintervaller avgrenser lesingen.

## Hvordan lese registeret

H24 viser til `TDT4195-Autumn2024_NoAnswers.pdf` og `TDT4195-Autumn2024_Answers.pdf`. H25 viser til `TDT4195-Autumn2025_NoAnswers.pdf` og `Exam-H25-with Inspera Answers.pdf`. Alle fire ligger under den lokale mappen `kildemateriale/exam/`. Sidene er 1-baserte PDF-sider. Svarfilen kan ha andre sidetall eller en annen rekkefølge på svaralternativene.

År og Inspera-nummer er del av en stabil ID. Bokstavsuffiks betegner en selvstendig delferdighet i studieregisteret. Celler i samme matrise, komponentene i en vektor og felter i samme beregningstrinn hører til den oppføringen som navngir resultatet. H24 nr. 16 har overskriften IP3-Q3 i originalen selv om den står i IP1-blokken. Inspera-nummer gjør oppgaven entydig.

`poeng` er satt når hele poengsummen hører til oppføringen. `oppgavepoeng` er originalens maksimale poeng for hele nummeret. Når flere registeroppføringer deler én sum, brukes `null` for delpoeng. Tallene i kolonnen «Maks» nedenfor tilhører hele Inspera-nummeret. Fritekstsvar med tomt felt i svar-PDF-en er merket «Eget løsningsforslag». Egne treningsvarianter har alltid egen løsning. Registeret viser til originalfigurene lokalt.

## Register i original rekkefølge

### Høst 2024

| ID og øvingslenke | Nr. · del | Ferdighet | Oppgaveside / svarside | Maks |
| --- | --- | --- | --- | --- |
| [H24-02-a](../eksamen.html?aar=2024&id=H24-02-a) | 2 · CG1-Q1 | Sett sammen skalering og rotasjon | 7 / 7 | 9,94 |
| [H24-02-b](../eksamen.html?aar=2024&id=H24-02-b) | 2 · CG1-Q1 | Tell multiplikasjoner med og uten sammensetting | 7 / 7 | 9,94 |
| [H24-03](../eksamen.html?aar=2024&id=H24-03) | 3 · CG1-Q2 | Les kamerabasisen og flytt øyepunktet til origo | 8–9 / 8–9 | 5 |
| [H24-04-a](../eksamen.html?aar=2024&id=H24-04-a) | 4 · CG1-Q3 | Tell klippeplan i et perspektivvolum | 10 / 10 | 5 |
| [H24-04-b](../eksamen.html?aar=2024&id=H24-04-b) | 4 · CG1-Q3 | Bestem elementene i perspektivmatrisen | 10 / 10 | 5 |
| [H24-05-a](../eksamen.html?aar=2024&id=H24-05-a) | 5 · CG2-Q1 | Finn første differanse av tre kantfunksjoner | 11–12 / 11–12 | 3,99 |
| [H24-05-b](../eksamen.html?aar=2024&id=H24-05-b) | 5 · CG2-Q1 | Tell operasjoner ved første piksel | 11–12 / 11–12 | 3,99 |
| [H24-05-c](../eksamen.html?aar=2024&id=H24-05-c) | 5 · CG2-Q1 | Tell oppdateringer over avgrensningsboksen | 11–12 / 11–12 | 3,99 |
| [H24-06-a](../eksamen.html?aar=2024&id=H24-06-a) | 6 · CG2-Q2 | Velg piksler ved linjerasterisering | 13–14 / 13–14 | 3,99 |
| [H24-06-b](../eksamen.html?aar=2024&id=H24-06-b) | 6 · CG2-Q2 | Spor gjennomskårne ruter | 13–14 / 13–14 | 3,99 |
| [H24-06-c](../eksamen.html?aar=2024&id=H24-06-c) | 6 · CG2-Q2 | Sammenlikn mengdene ved rasterisering og traversering | 13–14 / 13–14 | 3,99 |
| [H24-07](../eksamen.html?aar=2024&id=H24-07) | 7 · CG2-Q3 | Regn kostnad ved SSAA og MSAA | 15 / 15 | 2 |
| [H24-08](../eksamen.html?aar=2024&id=H24-08) | 8 · CG3-Q1 | Skill frustum culling fra klipping | 16 / 16 | 3 |
| [H24-09](../eksamen.html?aar=2024&id=H24-09) | 9 · CG3-Q2 | Rett intervalltesten og endepunktene i Liang–Barsky | 17–18 / 17–18 | 4 |
| [H24-10](../eksamen.html?aar=2024&id=H24-10) | 10 · CG3-Q3 | Konstruer et moteksempel for kantvis linjeklipping | 19 / 19 | 3 |
| [H24-11-a](../eksamen.html?aar=2024&id=H24-11-a) | 11 · CG4-Q1 | Tell skjelnbare intensiteter | 20–21 / 20–21 | 3,99 |
| [H24-11-b](../eksamen.html?aar=2024&id=H24-11-b) | 11 · CG4-Q1 | Fordel bit mellom fargekanaler | 20–21 / 20–21 | 3,99 |
| [H24-11-c](../eksamen.html?aar=2024&id=H24-11-c) | 11 · CG4-Q1 | Tolk en minste synlig forskjell | 20–21 / 20–21 | 3,99 |
| [H24-12-a](../eksamen.html?aar=2024&id=H24-12-a) | 12 · CG4-Q2 | Identifiser materialets parametere i Phong | 22–23 / 22–23 | 4 |
| [H24-12-b](../eksamen.html?aar=2024&id=H24-12-b) | 12 · CG4-Q2 | Pek ut lyskildens intensitet | 22–23 / 22–23 | 4 |
| [H24-12-c](../eksamen.html?aar=2024&id=H24-12-c) | 12 · CG4-Q2 | Avgjør om et medium er modellert | 22–23 / 22–23 | 4 |
| [H24-12-d](../eksamen.html?aar=2024&id=H24-12-d) | 12 · CG4-Q2 | Knytt retning til det speilende leddet | 22–23 / 22–23 | 4 |
| [H24-13-a](../eksamen.html?aar=2024&id=H24-13-a) | 13 · CG4-Q3 | Forklar hvilken informasjon belysning tilfører | 24 / 24 | 2 |
| [H24-13-b](../eksamen.html?aar=2024&id=H24-13-b) | 13 · CG4-Q3 | Tolk en akromatisk lysfaktor | 24 / 24 | 2 |
| [H24-14-a](../eksamen.html?aar=2024&id=H24-14-a) | 14 · IP1-Q1 | Kjør et lineært nevron fram til tapet | 25–26 / 25–26 | 6 |
| [H24-14-b](../eksamen.html?aar=2024&id=H24-14-b) | 14 · IP1-Q1 | Bruk kjerneregelen fra tap til parametergradienter | 25–26 / 25–26 | 6 |
| [H24-14-c](../eksamen.html?aar=2024&id=H24-14-c) | 14 · IP1-Q1 | Oppdater begge parameterne samtidig | 25–26 / 25–26 | 6 |
| [H24-15-a](../eksamen.html?aar=2024&id=H24-15-a) | 15 · IP1-Q2 | Spor tensorformene for første CNN-inngang | 27–28 / 27–28 | 4,8 |
| [H24-15-b](../eksamen.html?aar=2024&id=H24-15-b) | 15 · IP1-Q2 | Spor tensorformene med andre steg og filterantall | 27–28 / 27–28 | 4,8 |
| [H24-16-a](../eksamen.html?aar=2024&id=H24-16-a) | 16 · IP3-Q3 | Del et bilde i fliser og bestem sekvensens form | 29 / 29 | 5 |
| [H24-16-b](../eksamen.html?aar=2024&id=H24-16-b) | 16 · IP3-Q3 | Legg til posisjonsvektoren | 29 / 29 | 5 |
| [H24-16-c](../eksamen.html?aar=2024&id=H24-16-c) | 16 · IP3-Q3 | Beregn query med radvektorer | 29 / 29 | 5 |
| [H24-16-d](../eksamen.html?aar=2024&id=H24-16-d) | 16 · IP3-Q3 | Skaler skalarproduktet mellom query og key | 29 / 29 | 5 |
| [H24-16-e](../eksamen.html?aar=2024&id=H24-16-e) | 16 · IP3-Q3 | Finn ett tokens bidrag til kontekstvektoren | 29 / 29 | 5 |
| [H24-17](../eksamen.html?aar=2024&id=H24-17) | 17 · IP2-Q1 | Koble fire tonekurver til resultatbilder | 30–31 / 30–31 | 2 |
| [H24-18-a](../eksamen.html?aar=2024&id=H24-18-a) | 18 · IP2-Q2 | Beregn gyldig korrelasjon på en impuls | 32 / 32 | 1,8 |
| [H24-18-b](../eksamen.html?aar=2024&id=H24-18-b) | 18 · IP2-Q2 | Beregn gyldig konvolusjon på samme impuls | 32 / 32 | 1,8 |
| [H24-19-a](../eksamen.html?aar=2024&id=H24-19-a) | 19 · IP2-Q3 | Utled histogrammets sannsynligheter fra arealer | 33–34 / 33–34 | 3 |
| [H24-19-b](../eksamen.html?aar=2024&id=H24-19-b) | 19 · IP2-Q3 | Regn nye gråtoner med kumulativ fordeling | 33–34 / 33–34 | 3 |
| [H24-20](../eksamen.html?aar=2024&id=H24-20) | 20 · IP2-Q4 | Match to histogram med to kumulative kurver | 35 / 35 | 2 |
| [H24-21-a](../eksamen.html?aar=2024&id=H24-21-a) | 21 · IP2-Q5 | Kjenn igjen sum av andrederiverte | 36–37 / 36–37 | 4 |
| [H24-21-b](../eksamen.html?aar=2024&id=H24-21-b) | 21 · IP2-Q5 | Avgjør om en Gauss-kjerne er separabel | 36–37 / 36–37 | 4 |
| [H24-21-c](../eksamen.html?aar=2024&id=H24-21-c) | 21 · IP2-Q5 | Test om et gjennomsnittsfilter er lineært | 36–37 / 36–37 | 4 |
| [H24-21-d](../eksamen.html?aar=2024&id=H24-21-d) | 21 · IP2-Q5 | Identifiser normalisert todimensjonal Gauss-funksjon | 36–37 / 36–37 | 4 |
| [H24-22](../eksamen.html?aar=2024&id=H24-22) | 22 · IP2-Q6 | Forklar Canny-hysterese og fordelen ved to terskler | 38 / 38 | 4,15 |
| [H24-23-a](../eksamen.html?aar=2024&id=H24-23-a) | 23 · IP3-Q1 | Forklar de to formene av konvolusjonsteoremet | 39 / 39 | 5 |
| [H24-23-b](../eksamen.html?aar=2024&id=H24-23-b) | 23 · IP3-Q1 | Velg teorem for frekvensfiltrering | 39 / 39 | 5 |
| [H24-23-c](../eksamen.html?aar=2024&id=H24-23-c) | 23 · IP3-Q1 | Sett filtreringstrinnene i rett rekkefølge | 39 / 39 | 5 |
| [H24-23-d](../eksamen.html?aar=2024&id=H24-23-d) | 23 · IP3-Q1 | Vurder kostnad og nytte ved FFT-filtrering | 39 / 39 | 5 |
| [H24-24](../eksamen.html?aar=2024&id=H24-24) | 24 · IP3-Q2 | Finn nytt DC-punkt etter sjakkbrettmodulasjon | 40 / 40 | 1 |
| [H24-25](../eksamen.html?aar=2024&id=H24-25) | 25 · IP3-Q3 | Identifiser filtertype fra sentrert amplituderespons | 41 / 41 | 1 |
| [H24-26](../eksamen.html?aar=2024&id=H24-26) | 26 · IP3-Q4 | Forutsi bildet etter en frekvensmaske | 42 / 42 | 1 |
| [H24-27-a](../eksamen.html?aar=2024&id=H24-27-a) | 27 · IP4-Q1 | Spor første regionvekstiterasjon med stakk | 43–44 / 43–44 | 4,64 |
| [H24-27-b](../eksamen.html?aar=2024&id=H24-27-b) | 27 · IP4-Q1 | Spor andre iterasjon og marker besøkte ruter | 43–44 / 43–44 | 4,64 |
| [H24-28-a](../eksamen.html?aar=2024&id=H24-28-a) | 28 · IP4-Q2 | Velg strukturelement for fire-sammenheng | 45 / 45–46 | 2,7 |
| [H24-28-b](../eksamen.html?aar=2024&id=H24-28-b) | 28 · IP4-Q2 | Velg strukturelement for åtte-sammenheng | 45 / 45–46 | 2,7 |
| [H24-29-a](../eksamen.html?aar=2024&id=H24-29-a) | 29 · IP4-Q3 | Beregn erosjon med asymmetrisk flatt element | 46 / 47 | 2 |
| [H24-29-b](../eksamen.html?aar=2024&id=H24-29-b) | 29 · IP4-Q3 | Beregn dilasjon med reflektert element | 46 / 47 | 2 |

### Høst 2025

| ID og øvingslenke | Nr. · del | Ferdighet | Oppgaveside / svarside | Maks |
| --- | --- | --- | --- | --- |
| [H25-02-a](../eksamen.html?aar=2025&id=H25-02-a) | 2 · CG1-Q1 | Skaler trekantens tre kolonnepunkter | 3 / 3–4 | 5,94 |
| [H25-02-b](../eksamen.html?aar=2025&id=H25-02-b) | 2 · CG1-Q1 | Plasser det skalerte hjørnet ved et målpunkt | 3 / 3–4 | 5,94 |
| [H25-02-c](../eksamen.html?aar=2025&id=H25-02-c) | 2 · CG1-Q1 | Roter om det allerede flyttede hjørnet | 3 / 3–4 | 5,94 |
| [H25-03](../eksamen.html?aar=2025&id=H25-03) | 3 · CG1-Q2 | Ordne tre matriser for kolonnevektorer | 4 / 4 | 2 |
| [H25-04-a](../eksamen.html?aar=2025&id=H25-04-a) | 4 · CG1-Q3 | Bygg 3D-skaleringsmatrisen | 5–6 / 5–6 | 12 |
| [H25-04-b](../eksamen.html?aar=2025&id=H25-04-b) | 4 · CG1-Q3 | Bygg 3D-rotasjon rundt forskjøvet sentrum | 5–6 / 5–6 | 12 |
| [H25-04-c](../eksamen.html?aar=2025&id=H25-04-c) | 4 · CG1-Q3 | Bygg homogen 3D-translasjon | 5–6 / 5–6 | 12 |
| [H25-04-d](../eksamen.html?aar=2025&id=H25-04-d) | 4 · CG1-Q3 | Les størrelsen på en homogen hjørnematrise | 5–6 / 5–6 | 12 |
| [H25-05](../eksamen.html?aar=2025&id=H25-05) | 5 · CG2-Q1 | Utled kameramatrise fra øye, mål og oppvektor | 6 / 7 | 10,08 |
| [H25-06-a](../eksamen.html?aar=2025&id=H25-06-a) | 6 · CG3-Q1 | Tell inkrementelle operasjoner per trekantprøve | 7 / 8–9 | 4,98 |
| [H25-06-b](../eksamen.html?aar=2025&id=H25-06-b) | 6 · CG3-Q1 | Avgjør om et punkt er innenfor en trekant | 7 / 8–9 | 4,98 |
| [H25-06-c](../eksamen.html?aar=2025&id=H25-06-c) | 6 · CG3-Q1 | Tell kandidatpiksler | 7 / 8–9 | 4,98 |
| [H25-07](../eksamen.html?aar=2025&id=H25-07) | 7 · CG3-Q2 | Tell prøver for synlighet og lys ved SSAA og MSAA | 8 / 9 | 5 |
| [H25-08-a](../eksamen.html?aar=2025&id=H25-08-a) | 8 · CG4-Q1 | Tell intensitetsnivåer fra endepunkter og trinn | 9 / 10 | 3 |
| [H25-08-b](../eksamen.html?aar=2025&id=H25-08-b) | 8 · CG4-Q1 | Fordel bit til intensitet og to fargekanaler | 9 / 10 | 3 |
| [H25-09](../eksamen.html?aar=2025&id=H25-09) | 9 · CG4-Q2 | Begrunn bitfordelingen med antall koder | 10 / 11 | 2 |
| [H25-10-a](../eksamen.html?aar=2025&id=H25-10-a) | 10 · CG4-Q3 | Klassifiser ru og blanke materialer med Phong-koeffisienter | 11 / 12 | 5,04 |
| [H25-10-b](../eksamen.html?aar=2025&id=H25-10-b) | 10 · CG4-Q3 | Les hvilke lyseffekter som inngår i den gitte likningen | 11 / 12 | 5,04 |
| [H25-11-a](../eksamen.html?aar=2025&id=H25-11-a) | 11 · IP1-Q1 | Koble øyet til kamerasensoren | 12–14 / 13–15 | 3,2 |
| [H25-11-b](../eksamen.html?aar=2025&id=H25-11-b) | 11 · IP1-Q1 | Tolk en mindre lysåpning | 12–14 / 13–15 | 3,2 |
| [H25-11-c](../eksamen.html?aar=2025&id=H25-11-c) | 11 · IP1-Q1 | Forklar det virtuelle bildeplanet | 12–14 / 13–15 | 3,2 |
| [H25-11-d](../eksamen.html?aar=2025&id=H25-11-d) | 11 · IP1-Q1 | Velg perspektivlikningen for et virtuelt bildeplan | 12–14 / 13–15 | 3,2 |
| [H25-11-e](../eksamen.html?aar=2025&id=H25-11-e) | 11 · IP1-Q1 | Regn en projisert x-koordinat | 12–14 / 13–15 | 3,2 |
| [H25-11-f](../eksamen.html?aar=2025&id=H25-11-f) | 11 · IP1-Q1 | Forklar dybde fra stereo | 12–14 / 13–15 | 3,2 |
| [H25-11-g](../eksamen.html?aar=2025&id=H25-11-g) | 11 · IP1-Q1 | Skill kvantisering fra romlig sampling | 12–14 / 13–15 | 3,2 |
| [H25-11-h](../eksamen.html?aar=2025&id=H25-11-h) | 11 · IP1-Q1 | Tolk romlig oppløsning | 12–14 / 13–15 | 3,2 |
| [H25-12](../eksamen.html?aar=2025&id=H25-12) | 12 · IP2-Q1 | Forutsi histogrammet etter klipping og kontraststrekk | 15 / 16 | 2 |
| [H25-13-a](../eksamen.html?aar=2025&id=H25-13-a) | 13 · IP2-Q2 | Normaliser histogrammets tellinger | 16 / 17 | 3,84 |
| [H25-13-b](../eksamen.html?aar=2025&id=H25-13-b) | 13 · IP2-Q2 | Beregn kumulativ fordeling | 16 / 17 | 3,84 |
| [H25-13-c](../eksamen.html?aar=2025&id=H25-13-c) | 13 · IP2-Q2 | Avrund histogramutjevningskartet | 16 / 17 | 3,84 |
| [H25-13-d](../eksamen.html?aar=2025&id=H25-13-d) | 13 · IP2-Q2 | Summer tellingene på de nye nivåene | 16 / 17 | 3,84 |
| [H25-14-a](../eksamen.html?aar=2025&id=H25-14-a) | 14 · IP2-Q3 | Snu en retningsfølsom kjerne før konvolusjon | 17 / 18 | 2 |
| [H25-14-b](../eksamen.html?aar=2025&id=H25-14-b) | 14 · IP2-Q3 | Bruk skalert Laplace-kjerne i et nabolag | 17 / 18 | 2 |
| [H25-14-c](../eksamen.html?aar=2025&id=H25-14-c) | 14 · IP2-Q3 | Beregn en vektet retningsderivert | 17 / 18 | 2 |
| [H25-14-d](../eksamen.html?aar=2025&id=H25-14-d) | 14 · IP2-Q3 | Finn medianen i et 3×3-vindu | 17 / 18 | 2 |
| [H25-15](../eksamen.html?aar=2025&id=H25-15) | 15 · IP2-Q4 | Tolk effekten av en positiv, normalisert kjerne | 18–19 / 19–20 | 2,16 |
| [H25-16-a](../eksamen.html?aar=2025&id=H25-16-a) | 16 · IP3-Q1 | Beregn aktivering og tap før oppdateringen | 20–21 / 21–22 | 3,75 |
| [H25-16-b](../eksamen.html?aar=2025&id=H25-16-b) | 16 · IP3-Q1 | Tilbakepropager gjennom ReLU og det affine leddet | 20–21 / 21–22 | 3,75 |
| [H25-16-c](../eksamen.html?aar=2025&id=H25-16-c) | 16 · IP3-Q1 | Oppdater vekt og bias med læringsrate | 20–21 / 21–22 | 3,75 |
| [H25-16-d](../eksamen.html?aar=2025&id=H25-16-d) | 16 · IP3-Q1 | Kontroller tapet etter et nytt foroverpass | 20–21 / 21–22 | 3,75 |
| [H25-17-a](../eksamen.html?aar=2025&id=H25-17-a) | 17 · IP3-Q2 | Tell parametere i tre konvolusjonslag | 22–23 / 23–24 | 4 |
| [H25-17-b](../eksamen.html?aar=2025&id=H25-17-b) | 17 · IP3-Q2 | Tell parametere i to tette lag | 22–23 / 23–24 | 4 |
| [H25-17-c](../eksamen.html?aar=2025&id=H25-17-c) | 17 · IP3-Q2 | Tell multiplikasjoner i to konvolusjonslag | 22–23 / 23–24 | 4 |
| [H25-17-d](../eksamen.html?aar=2025&id=H25-17-d) | 17 · IP3-Q2 | Tell multiplikasjoner og addisjoner i siste tette lag | 22–23 / 23–24 | 4 |
| [H25-18-a](../eksamen.html?aar=2025&id=H25-18-a) | 18 · IP3-Q3 | Finn formen til embeddingmatrisen | 24–25 / 25–26 | 2,88 |
| [H25-18-b](../eksamen.html?aar=2025&id=H25-18-b) | 18 · IP3-Q3 | Bestem formene til W_Q, W_K og W_V | 24–25 / 25–26 | 2,88 |
| [H25-18-c](../eksamen.html?aar=2025&id=H25-18-c) | 18 · IP3-Q3 | Bestem formene til projiserte Q, K og V | 24–25 / 25–26 | 2,88 |
| [H25-18-d](../eksamen.html?aar=2025&id=H25-18-d) | 18 · IP3-Q3 | Finn formen til skårmatrisen | 24–25 / 25–26 | 2,88 |
| [H25-18-e](../eksamen.html?aar=2025&id=H25-18-e) | 18 · IP3-Q3 | Finn formen etter radvis softmax | 24–25 / 25–26 | 2,88 |
| [H25-18-f](../eksamen.html?aar=2025&id=H25-18-f) | 18 · IP3-Q3 | Finn formen til attention-utgangen | 24–25 / 25–26 | 2,88 |
| [H25-18-g](../eksamen.html?aar=2025&id=H25-18-g) | 18 · IP3-Q3 | Dimensjoner utprojeksjonen tilbake til embeddingrommet | 24–25 / 25–26 | 2,88 |
| [H25-19](../eksamen.html?aar=2025&id=H25-19) | 19 · IP4-Q1 | Koble impulsstøy til Fourier-amplitude | 26–27 / 27–28 | 2 |
| [H25-20-a](../eksamen.html?aar=2025&id=H25-20-a) | 20 · IP4-Q2 | Les amplitude, frekvens og fase i sinus | 28 / 29 | 1,5 |
| [H25-20-b](../eksamen.html?aar=2025&id=H25-20-b) | 20 · IP4-Q2 | Les amplitude, frekvens og fase i cosinus | 28 / 29 | 1,5 |
| [H25-21](../eksamen.html?aar=2025&id=H25-21) | 21 · IP4-Q3 | Identifiser spektrale kopier etter sampling | 29 / 30 | 2 |
| [H25-22-a](../eksamen.html?aar=2025&id=H25-22-a) | 22 · IP4-Q4 | Planlegg filtrering fra bilde til invers FFT | 30 / 31 | 4,45 |
| [H25-22-b](../eksamen.html?aar=2025&id=H25-22-b) | 22 · IP4-Q4 | Forklar samplingartefakter og aliasing | 30 / 31 | 4,45 |
| [H25-23](../eksamen.html?aar=2025&id=H25-23) | 23 · IP5-Q1 | Dyrk en fire-sammenhengende region til stabilitet | 31 / 32 | 2,4 |
| [H25-24-a](../eksamen.html?aar=2025&id=H25-24-a) | 24 · IP5-Q2 | Finn Hough-normal for en fallende diagonal | 32–33 / 33–34 | 2 |
| [H25-24-b](../eksamen.html?aar=2025&id=H25-24-b) | 24 · IP5-Q2 | Finn Hough-normal for en loddrett linje | 32–33 / 33–34 | 2 |
| [H25-24-c](../eksamen.html?aar=2025&id=H25-24-c) | 24 · IP5-Q2 | Finn Hough-normal når linjen går gjennom origo | 32–33 / 33–34 | 2 |
| [H25-24-d](../eksamen.html?aar=2025&id=H25-24-d) | 24 · IP5-Q2 | Finn Hough-normal for en vannrett linje | 32–33 / 33–34 | 2 |
| [H25-25-a](../eksamen.html?aar=2025&id=H25-25-a) | 25 · IP5-Q3 | Velg sammenlikningsretning ved ikke-maksimumsundertrykking | 34–35 / 35–36 | 1,6 |
| [H25-25-b](../eksamen.html?aar=2025&id=H25-25-b) | 25 · IP5-Q3 | Forklar hysterese som kantkobling | 34–35 / 35–36 | 1,6 |
| [H25-25-c](../eksamen.html?aar=2025&id=H25-25-c) | 25 · IP5-Q3 | Begrunn glatting før Canny-gradienten | 34–35 / 35–36 | 1,6 |
| [H25-25-d](../eksamen.html?aar=2025&id=H25-25-d) | 25 · IP5-Q3 | Tell tersklene i Canny | 34–35 / 35–36 | 1,6 |
| [H25-26-a](../eksamen.html?aar=2025&id=H25-26-a) | 26 · IP6-Q1 | Definer ankeret i et strukturelement | 36–37 / 37–38 | 2,58 |
| [H25-26-b](../eksamen.html?aar=2025&id=H25-26-b) | 26 · IP6-Q1 | Tolk en binær passformtest | 36–37 / 37–38 | 2,58 |
| [H25-26-c](../eksamen.html?aar=2025&id=H25-26-c) | 26 · IP6-Q1 | Forutsi erosjonens virkning | 36–37 / 37–38 | 2,58 |
| [H25-26-d](../eksamen.html?aar=2025&id=H25-26-d) | 26 · IP6-Q1 | Identifiser hit-or-miss | 36–37 / 37–38 | 2,58 |
| [H25-26-e](../eksamen.html?aar=2025&id=H25-26-e) | 26 · IP6-Q1 | Definer et morfologisk skjelett | 36–37 / 37–38 | 2,58 |
| [H25-26-f](../eksamen.html?aar=2025&id=H25-26-f) | 26 · IP6-Q1 | Beskriv flat gråtonedilasjon | 36–37 / 37–38 | 2,58 |
| [H25-27-a](../eksamen.html?aar=2025&id=H25-27-a) | 27 · IP6-Q2 | Trekk erosjonen fra objektet for å finne indre rand | 38–39 / 39–40 | 3,6 |
| [H25-27-b](../eksamen.html?aar=2025&id=H25-27-b) | 27 · IP6-Q2 | Trekk objektet fra dilasjonen for å finne ytre rand | 38–39 / 39–40 | 3,6 |
| [H25-28-a](../eksamen.html?aar=2025&id=H25-28-a) | 28 · IP6-Q3 | Beregn gråtoneerosjon med valid-grense og hjørneanker | 40–41 / 41–42 | 4 |
| [H25-28-b](../eksamen.html?aar=2025&id=H25-28-b) | 28 · IP6-Q3 | Beregn gråtonedilasjon med reflektert støtte | 40–41 / 41–42 | 4 |

