# Arbeidslogg for visdat

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
