# Visdat · TDT4195

Studieside for Grunnleggende visuell databehandling ved NTNU, høsten 2026. De 15 kapitlene knytter sammen forklaringer, regneeksempler, figurer og eksamenstrening. Årgangene H24 og H25 har til sammen 55 fagoppgaver fordelt på 134 oppføringer i studieregisteret.

## Åpne siden

Kjør dette fra repo-roten i PowerShell. Forhåndsvisningen bruker Python-standardbiblioteket.

```powershell
python tools/forhandsvis.py
```

Åpne [fagforsiden på den lokale serveren](http://127.0.0.1:8195/fag-side/visdat/). Serveren lytter på loopback og leverer rotens inngangsfil og de offentlige sidene under `visdat/`. Avslutt med Ctrl+C. Nettstedet kjører uten byggesteg, eksterne skript eller nettfonter.

På GitHub Pages er prosjektstien `/fag-side/`. Ved eventuell artefaktpublisering skal rotens `index.html` og mappen `visdat/` inngå. Ved Jekyll-publisering fra gren angir `_config.yml` unntakene for privat materiale. Den eksisterende Git-regelen for `kildemateriale/` og de nye reglene for lokale grafresultater beskytter arbeidskopien.

## Publisering på GitHub Pages

Workflowen `.github/workflows/pages.yml` bygger og publiserer Pages-artifakten ved
push til `main`, eller manuelt fra Actions. Den kopierer bare rotens
`index.html`, nettstedfilene under `visdat/` og det offentlige registeret og
analysen under `visdat/kilder/`. Kildemateriale, original-PDF-er,
`graphify-out/` og komplette tekstuttrekk blir ikke med i artifakten.

Aktiver Pages én gang i repository settings: velg **Settings → Pages → Source:
GitHub Actions**. Siden får prosjektadressen
`https://<bruker>.github.io/fag-side/`; nettstedets relative lenker er laget for
denne stien.

## Læringssti og eksamensbelegg

Start med geometriske transformasjoner. Prøv å bytte rekkefølge på flytting og rotasjon, løs oppgaven uten hint og gå videre til en registrert eksamensdel. Lenken «Les forklaringen» går til avsnittet om metoden. Derfra kan du gå tilbake til den valgte oppgaven.

På IP-siden går stien fra måling og kvantisering til bildefiltre, Fourier-metoder, segmentering og morfologi. Den ender med fullt tilkoblede nettverk, CNN og Vision Transformer. Forsøkene med kantbehandling og softmax viser mellomregningen når du endrer en verdi.

[Eksamensanalysen](visdat/kilder/eksamensanalyse.md) begrunner leserekkefølgen og besvarer spørsmålet om transformasjoner med oppgavenumre, sider og H26-kilder. [Oppgaveregisteret](visdat/kilder/eksamen.json) er datagrunnlag for både kapitlene og treningen. Registeret skiller maks for hele Inspera-oppgaven fra eventuelle kjente delpoeng.

## Lokal Graphify i Codex

Grafen ligger i `graphify-out/graph.json`. Den er laget med den offisielle pakken `graphifyy`, lokal dokument- og kodeuttrekking, sideindeksering og semantisk analyse i Codex. Søk og statistikk går over stdio. Grafen dekker hele prosjektet, inkludert den git-ignorerte kildemappen. Store PDF-er er med til siste side. Se også metoden og usikkerhetene i kildeoversikten nedenfor.

På denne maskinen er pakken og Codex-registreringen satt opp. Tilsvarende oppsett i en ny PowerShell, fra repo-roten med en ferdig graf, er

```powershell
uv tool install "graphifyy[mcp,pdf]"
$graphifyBin = (uv tool dir --bin).Trim()
$graphPath = (Resolve-Path 'graphify-out/graph.json').Path
codex mcp add graphify -- (Join-Path $graphifyBin 'graphify-mcp.exe') $graphPath
codex mcp get graphify --json
```

For en ny graf med lokal Codex-assistert uttrekking, installer Graphifys Codex-ferdighet med `graphify install --platform codex`, åpne repoet i Codex og be Graphify kartlegge **hele repo-roten med dokumenter og alle PDF-sider**. Filen `.graphifyignore` inkluderer kildemappen for grafen. Kontroller faktisk dekning mot kildeoversikten. Den lokale sammenslåingen fra denne arbeidsøkten ligger i `graphify-out/assembler.py` sammen med kildefragmentene. Etter rene nettstedendringer kan samme semantiske materiale brukes igjen:

```powershell
$graphPython = (Get-Content -Raw graphify-out/.graphify_python).Trim()
& $graphPython graphify-out/assembler.py
& $graphPython graphify-out/probe.py
```

Ved faglige endringer må også de berørte kildefragmentene fornyes. Kontroller koblingen i Codex med `graph_stats` og deretter `query_graph`. Søk først på spørsmålet om transformasjoner i 2024 og 2025. Avgrens deretter med oppgave-ID-er og uttrykk som «pivotrotasjon» og «kamerabasis». Det brede spørsmålet gir også treff på farge og lys. Den lokale kontrollen leser Codex-konfigurasjonen og lagrer faktiske MCP-svar i `graphify-out/mcp-kontroll.json`.

Fremgangsmåten følger [Graphifys lokale MCP-oppsett](https://docs.graphify.com/open-source/mcp-server) og [integrasjonsoversikten for Codex](https://docs.graphify.com/integrations/overview).

## Samlet kildeoversikt

De tre tekstfilene og alle 41 PDF-ene under `kildemateriale/` kunne åpnes. Totalt 3 412 PDF-sider inngår i kildegjennomgangen. Hele filer er indeksert. Den faglige nærlesingen av boka og CGVIZ-kapitlene følger H26-planenes temaer. Klikkbare kilder på nettstedet peker til egen analyse og register. Originalfilene identifiseres med filnavn og sidetall.

| Gjennomgått materiale | Bruk |
| --- | --- |
| `course_information.txt`, `lecture_plan_CG.txt`, `lecture_plan_IP.txt` | Læringsutbytte, vurdering og avgrensning. Konkrete eksamensferdigheter er utledet når planen bare angir emne og sideintervall. |
| H24 og H25, to NoAnswers-filer og to svarfiler | Oppgavetekst og original rekkefølge fra NoAnswers. Figurer, matriser og fargemarkeringer kontrollert på gjengitte sider. Svarfilen for 2025 er `Exam-H25-with Inspera Answers.pdf`. |
| `forelesningCG/`, åtte CGVIZ-kapittelfiler (1, 2, 3, 4, 5, 9, 11 og 12) og `TDT4195-ClassQuestions.pdf` | Forelesningsstoff og oppgavetyper. |
| `pensum/`, CGVIZ Pipeline, Transformations, SceneGraphs, Projections and Viewing Transformations, Rasterization, color og Illumination | Metoder, bokfigurer og konvensjoner. De to skannede kapitlene om transformasjoner og projeksjon ble OCR-behandlet i sin helhet. |
| `forelesningIP/`, ti klassiske IP-slidefiler (T0–T7), fire DL-slidefiler (L03a–d) og seks DLFund Examples (1–6) | Slidene avgrenser IP-pensum. Oppgavesider og løsningssider støtter regneeksemplene om FCNN, CNN og ViT. |
| `Digital_Image_Processing,_4th Edition-Rafael Gonzalez.pdf` | Hele boka på 1 022 PDF-sider er indeksert. Kapittel 2, 3, 4, 9 og 10 er brukt til fagforklaringer. Henvisninger merket «trykt side» følger bokens paginering. |
| `referanser/CLAUDE.md` og `referanser/NYTT-FAG.md` | Pedagogisk mønster for eksamensfokus, korte forklaringer, oppgaver og begrepsoppslag. |

**Materiale som mangler.** UDL-boka som IP-planen nevner som støttelitteratur, eget materiale fra ARM-gjesteforelesningen og en separat CG-fil kalt `TDT4195-2026_info` finnes ikke i kildemappen. De lokale introduksjonsslidene og DL-eksemplene gir dekning av de øvrige oppgitte temaene.

**Usikkerhet.** OCR gir støy på symboler og rene illustrasjoner. En sidenode eller et tematisk teksttreff dokumenterer plassering. Konkrete matriser, figurer og markerte svar krever visuell kontroll. H24 nr. 3 har en konflikt mellom koordinatetikett og akseplassering. H25 nr. 2 har et avvik i én fasitkoordinat, og H25 nr. 13 oppgir ulike tall i histogramtabellen og summeringslinjen. 13 oppføringer har eget løsningsforslag fordi svarfeltet i originalen er tomt. Analysen forklarer også hvilke konvensjoner Inspera godtar.

**Testet lokalt.** Alle 134 oppgavelenker og deres fagankre, årgangenes rekkefølge og summer på 100 poeng, begrepssøk, skjulte svar, retur til valgt treningsvariant og de interaktive beregningene er kontrollert. Nettlesertesten ble kjørt via HTTP under `/fag-side/`, med skrivebordsvisning og mobilbredder på 320 og 375 piksler. Graf og originalfiler ga 404 på forhåndsvisningsserveren.

Privat filoversikt med side- og linjetall ligger i `graphify-out/corpus-coverage.json`. `graphify-out/cg-review.md` og `graphify-out/ip-review.md` dokumenterer OCR, nærlesing og visuell kontroll per kildegruppe.
