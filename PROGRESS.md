# Arbeidslogg for visdat

## Full tospråklig utgave · ferdig lokalt · 21. november 2026

- Brukeren godkjente sammenligningskapitlet og bestilte videreføring. Alle 15 kapitler og 73 avsnitt er nå manuelt oversatt og gjennomgått uten bruk av modellutkastene. Kapittelvise ferdigmarkeringer står nederst. Forklaringer, mellomregninger, oppgaver, hint og svar er bevart; ingen leksjoner er forkortet.
- Engelsk er standard ved første besøk, også via rotinngangen. EN/NO finnes på forside, kapitler, eksamen, begreper, kilder og kildedokumenter. Språk lagres i `localStorage`, og `lang` oppdateres. Samme URL, oppgave, fragment, åpne svar og figurvalg beholdes. Leseposisjon ble målt før/etter språkbytte ved pivotavsnittet: forskjellen var under én piksel relativt til avsnittet. Direkte ankerplassering er uten rulleanimasjon.
- Norsk `cg.js`, `ip.js` og `kilder/eksamen.json` er uendret. Aktive `.nb.js`-filer beholder all norsk tekst utenfor de tidligere engelske tilleggseksemplene nøyaktig; tilleggene har fått manuelle norske versjoner. Engelske data ligger separat i `.en.js` og `eksamen.en.json`. Alle 134 ID-er, årganger, rekkefølge, poeng, kapitteltilordninger og ankre er kontrollert. Alle 49 begreper og figurtekster er oversatt.
- Pensumkartets 73 mål og hele eksamensanalysen med 134 registerrader er oversatt med opprinnelige kildeplasseringer og usikkerheter. `dokument.html` viser dem i aktivt språk med stabile avsnitts-ID-er og nedlastingslenker. Publiseringslisten omfatter begge språk. Arbeidsfiler, graf og originalmateriale er fortsatt utelatt.
- Statisk kontroll bestod for avsnitt/elementantall, tekstnodenes tall og matematiske tegn, alle oppgavemetadata og målankre. MathML er identisk bortsett fra engelske tekstetiketter front/back og in/out. Resttekstsøk i HTML, skript, data, dokumenter og gjengitt innhold er gjennomgått; norsk gjenstår bare i norsk versjon, stabile identifikatorer/søkealiaser og opprinnelige kildebetegnelser.
- Nettleserkontroll over HTTP: 134 ordinære eksamens-ID-er i hvert språk (268 sidevisninger), 15 egne kapitteloppgaver i hvert språk, alle kapitler i begge språk ved 1280/375/320 piksler (90 responsive visninger), ingen sidebreddeoverskridelse eller ugyldig/tom MathML. Begrepsknapper er koblet i alle kapitler. Tastaturåpning/-lukking av svar, bevarte åpne svar, søk med språkbytte, popover/Escape, matrise-/filter-/softmax-/morfologiberegning, returreise fra originaloppgave og egen variant, nettleserhistorikk, språkvalg ved navigasjon og kildedokumenter er kontrollert. Ingen JavaScript-feil ble funnet.
- En separat HTTP-kontroll på port 8197 bestod for alle 26 publiserbare filer og seks private 404-stier. Forhåndsvisningsserveren støtter nå eksplisitt `/fag-side/index.html` og valgfri port. JavaScript-syntaks og `git diff --check` er kontrollert. Ingen kjente oversettelseshull gjenstår. UDL-boka, ARM-foredraget og separat CG-introduksjon mangler fortsatt; 13 tomme originale fasitfelt og kjente avvik i H24 nr. 3 og H25 nr. 2 og 13 er fortsatt merket. Ingen commit, push eller publisering er utført.

## Tospråklig utgave · manuelt sammenligningskapittel · 21. november 2026

- Lest AGENTS.md, README, arbeidsloggen, pensumkartet, eksamensanalysen og nettstedets data og skript. Arbeidskopien var ren ved start. Eksisterende Graphify ble brukt via `graph_stats` og `query_graph`; grafen har 4 067 noder og 11 111 forbindelser. Den varsler eldre bygg-commit. Grafen er ikke bygget på nytt, og full kildegjennomgang er ikke gjentatt.
- Brukeren presiserte at oversettelsen skal skrives og gjennomgås med assistentens egne språkkunnskaper. En startet lokal modellkjøring er stoppet. Utkastene under `graphify-out/` er uverifiserte og ikke innarbeidet. Før brukerens valg ble en enkelt testfrase («Geometriske transformasjoner») slått opp via Google; masseoverføring ble avvist av automatisk godkjenningskontroll og ble ikke gjennomført. Ingen leksjonsavsnitt eller registertekster er sendt til en ekstern oversettelsestjeneste.
- Hele transformasjonskapitlet er nå manuelt oversatt i `tools/bilingual/reviewed_transformations.py`: seks leksjonsavsnitt, alle mellomregninger, grunnøvinger, anvendelser, hint og svar, kapitteloppgave, tre begrepsdefinisjoner og figurtekster. Ti opprinnelige eksamensreferanser har uendrede ID-er, år, oppgavenumre og PDF-sider. Det tidligere engelske tilleggseksemplet har også fått en manuelt oversatt norsk versjon i sammenligningen. Opprinnelig `cg.js`, `ip.js` og `eksamen.json` er bevart.
- `tools/bilingual/lesson-preview.html` viser ett språk om gangen med EN/NO, uendret fragment, bevarte åpne svar og figurvalg. Det er et sammenligningseksempel, ikke en ferdig tospråklig produksjonsutgave. Kjør `python tools/bilingual/preview_server.py` for å åpne det på port 8196 under `/fag-side/tools/bilingual/lesson-preview.html`. Eksemplet og arbeidsfilene er utenfor publiseringsartefakten.
- Utført: kontroll av alle oversatte tekstnoders tall og matematiske tegn mot originalen; bevaring av engelsk MathML byte for byte; JavaScript-syntakskontroll; nettleserkontroll over HTTP av seks avsnitt, tre MathML-uttrykk, 32 sammenfoldbare felt, engelsk førstevisning, EN/NO og `lang`, tastaturåpning av grunnøving og svar, bevart åpent svar ved språkbytte, ordensvalg i figuren og begge språk i figurresultatet, begrepsoppslag og Escape. Ingen sidebreddeoverskridelse ved 375 piksler i noen av språkene. Direkte fragment er bevart ved bytte. Nøyaktig rulleposisjon trenger videre kontroll når hele løsningen integreres.
- Gjenstår: oversette og gjennomgå de øvrige 14 kapitlene og alt eksamens-/kildemateriale manuelt, integrere og kontrollere engelsk standardvalg og lagret språk på alle sider, språktilpasset søk, historikk og returreiser, full kontroll av alle 134 oppgaver og mobilformler, samt full resttekstgjennomgang. Språklasteren er foreløpig ikke koblet inn i inngangssidene. Det ordinære nettstedet fungerer fortsatt på norsk. UDL, ARM-materialet og separat CG-introduksjon mangler fortsatt som før. Brukeren har bedt om å se dette sammenligningskapitlet før videre oversettelse. Ingen commit, push eller publisering er gjort.

20. november 2026. Studiesiden, kildearbeidet og den lokale Graphify-integrasjonen er ferdige.

- GitHub Pages-oppsett er klargjort i `.github/workflows/pages.yml`. Workflowen
  bygger en eksplisitt offentlig artefakt med rotens inngang og `visdat/`, uten
  kildemateriale, original-PDF-er, Graphify-filer eller komplette uttrekk.
- 44 lokale fagfiler er gjennomgått. Begge planer, kursinformasjonen, alle fire eksamens-PDF-ene, CGVIZ, Gonzalez og DL-eksemplene inngår. README.md skiller sideindeksering, faglig nærlesing og kildehull.
- visdat/ inneholder 15 kapitler, begrepsoppslag, interaktive figurer og eksamenstrening. visdat/kilder/eksamensanalyse.md og eksamen.json dokumenterer 55 fagoppgaver og 134 stabile del-ID-er. H24 nr. 3 og H25 nr. 2 og 13 krever særlig kildekritikk. 13 deloppføringer har tomt originalt svarfelt.
- AGENTS.md, .gitignore, .graphifyignore, _config.yml, rotens index.html og tools/forhandsvis.py gir konvensjoner, beskyttelse av privat materiale og lokal forhåndsvisning. Alle arbeidsfiler til grafen er private under graphify-out/.
- Testet på /fag-side/ via HTTP med Edge. Alle 134 oppgave–kapittel-lenker, løsninger, begreper, retur til treningsvariant, figurregning og bredder på 320 og 375 piksler er kontrollert. Årgangene summerer hver til 100 poeng.
- Den lokale serveren er registrert med absolutt sti og stdio. Codex har oppdaget graph_stats og query_graph. Kall, spørsmål og svar ligger i graphify-out/mcp-kontroll.json.
- 20. november 2026: GitHub Pages-workflowen fikk en eksplisitt
  `actions/configure-pages@v5`-konfigurasjon i build-jobben. Jobben gir også
  build-artifaktjobbene `pages: write`, slik at Pages-konfigurasjonen og
  publiseringen kan autentiseres før deploy.

Ved nye kilder: les AGENTS.md og denne fila, kontroller arbeidskopien og grafen, og oppdater berørte deler av register, kapitler og private grafuttrekk. Deretter bygg grafen på nytt og gjenta MCP- og nettleserkontrollene. Eventuelt nytt ARM-materiale, UDL og CG-introfilen kan innarbeides når de foreligger.

## Forbedringsrunde · engelske regneforklaringer

Sammenholdt de 15 kapitlene med de 134 del-ID-ene, eksamensanalysen, kildeoversikten og de lagrede Graphify-treffene. Alle kapitler unntatt scenegrafer har minst én direkte oppgavereferanse. Scenegrafer beholdes ut fra CG-planen 27. august. Hvert kapittel har nå et engelsk regneeksempel med metodevalg, kontrollspørsmål og skjult begrunnelse. Endringene ligger i cg.js, ip.js og stil.css. Matriser, DFT-sum, partiell derivert og softmax-brøk bruker nettleserens MathML.

Sjekket begge H26-planene mot eksisterende slidehenvisninger. Stikkprøver i de lagrede sideuttrekkene omfattet CGVIZ kap. 3 PDF s. 18 og 49 (sammensetting og matriseform), Filtering_Average s. 86 (kjerneorientering), Frequency s. 35 (fortegn i DFT), CNNs-FPass s. 66 (filter) og ViTs-FPass s. 33 (selvoppmerksomhet). Den eksisterende visuelle kildekontrollen og grafen ble gjenbrukt.

Edge-testen under /fag-side/ bestod for alle 15 kapitler og 134 eksamenslenker, med skjulte svar, figurer, begreper, returlenker og mobilbredder på 320 og 375 piksler. Register, svarstatus og ankre er bevart. Neste kildeoppdatering følger rutinen ovenfor.

## Pensumrunde · 20. november

- Utvidet alle 21 opprinnelige CG-avsnitt og alle 27 avsnitt i IP og dyp læring. Med 25 nye avsnitt har alle 15 kapitler nå grunnøving og anvendelsesoppgaver. Pensumkartet i `visdat/kilder/pensumdekning.md` kobler 73 avsnitt til kildeplasseringer. Dekningsstatus gjelder det konkrete læringsmålet i hver rad.
- Nye kildekontroller i lokale sideuttrekk omfattet CGVIZ kap. 2 s. 29–42, kap. 3 s. 66–80, kap. 4 s. 10–21, kap. 11 s. 42–56 og kap. 12 s. 12–33. For IP ble blant annet Frequency s. 35, 98 og 106, morfologi s. 64–72 og 143–175 og ViTs-FPass s. 25–59 sammenholdt med leksjonene. Eksisterende graf, spørsmålssvar og eksamensanalyse ble gjenbrukt.
- Kapittelfilene, sidevisningen, stilarket og figurskriptet er oppdatert. Morfologifiguren lar studenten teste et asymmetrisk strukturelement med nullutfylling. README og publiseringslisten omfatter pensumkartet.
- Begge lokale Edge-kontroller bestod under `/fag-side/`. Kontrollert 73 avsnittsankre med grunn- og anvendelsessvar, formelvisning på stor og liten skjerm, begge morfologioperasjoner, alle 134 eksamenslenker, rekkefølge, returreise, glosesøk og sidebredder på 320 og 375 piksler. Eksamensregisteret og analysen har ingen endringer i denne runden.
- Ved tilgang til nye kilder prioriteres ARM-foredraget og separat CG-introduksjon, deretter supplerende UDL-henvisninger. Praktisk programmering og selvstendig metodeutvikling er delvis undervist og krever laboratoriearbeid.

## Kapittelvis oversettelse · 21. november 2026

- [x] `transformasjoner` · Geometric transformations: godkjent sammenligningskapittel, deretter integrert og kontrollert i begge språk ved 1280, 375 og 320 piksler.

- [x] `scenegrafer` · Modelling and scene graphs: manuelt oversatt og gjennomgått, 3 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `kamera` · Camera and projection: manuelt oversatt og gjennomgått, 4 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `klipping` · Clipping and visibility: manuelt oversatt og gjennomgått, 4 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `rasterisering` · Rasterisation and antialiasing: manuelt oversatt og gjennomgått, 5 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `farge` · Colour and intensity: manuelt oversatt og gjennomgått, 7 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `lys` · Lighting and shading: manuelt oversatt og gjennomgått, 4 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `intensitet` · From light to histograms: manuelt oversatt og gjennomgått, 3 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `filtrering` · Filters in the spatial domain: manuelt oversatt og gjennomgått, 6 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `frekvens` · Fourier analysis and frequency filtering: manuelt oversatt og gjennomgått, 5 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `segmentering` · Segmentation and contours: manuelt oversatt og gjennomgått, 6 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `morfologi` · Morphology and shape: manuelt oversatt og gjennomgått, 9 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `nevrale-nett` · Fully connected networks: manuelt oversatt og gjennomgått, 4 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `cnn` · Convolutional networks: manuelt oversatt og gjennomgått, 3 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.

- [x] `transformer` · Vision Transformer: manuelt oversatt og gjennomgått, 4 avsnitt med full forklaring, øving, hint og svar. Opprinnelige ankre, eksempler og kildeplasseringer beholdt. Integrert nettleserkontroll bestod i begge språk ved 1280, 375 og 320 piksler.
