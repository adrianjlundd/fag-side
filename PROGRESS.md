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

Ved nye kilder: les AGENTS.md og denne fila, kontroller arbeidskopien og grafen, og oppdater berørte deler av register, kapitler og private grafuttrekk. Deretter bygg grafen på nytt og gjenta MCP- og nettleserkontrollene. Eventuelt nytt ARM-materiale, UDL og CG-introfilen kan innarbeides når de foreligger.
