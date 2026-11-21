"""Manually translated Norwegian counterparts to existing English examples."""
EXAMPLES = {
'transformasjoner': [
'Sett sammen en modellmatrise',
'Start med et kolonnepunkt (1, 2). Skaler med (2, 3), roter 90° mot klokken og flytt deretter med (4, 1). Leser du operasjonene fra punktet og utover, får du M = TRS. Translasjonen står i siste kolonne fordi den multipliseres med den homogene koordinaten.',
'Hva endres hvis inndata er en retning?',
'Sett w = 0. Første rad gir −3 × 2 = −6, og andre rad gir 2 × 1 = 2. Translasjonen faller bort, så retningen blir (−6, 2).'],
'scenegrafer': [
'Spor en scenegraf',
'Et barn flyttes to enheter langs forelderens lokale x-akse. Forelderen roterer 90° mot klokken om verdens origo. For å finne barnets origo uttrykker du det først i forelderens koordinater og deretter i verdenskoordinater.',
'Hvor havner barnets lokale punkt (1, 0)?',
'Legger du til den lokale forskyvningen, får du (3, 0) i forelderens system. Rotasjon gir (0, 3) i verden. Vektoren fra barnets origo til dette punktet har lengde én.'],
'kamera': [
'Kontroller en view-matrise',
'Bruk et øye i E = (2, 1, 3), med kameraakser parallelle med verdensaksene og fremover langs negativ z. Trekk fra E før projeksjonen. Da måles hvert punkt relativt til betrakteren.',
'Hvilke to kontroller ville avsløre en fortegnsfeil?',
'Øyet selv må avbildes på (0, 0, 0). Et punkt rett foran dette kameraet må ha negativ kamera-z. Eksempelpunktet ligger fire enheter fremover og to til høyre.'],
'klipping': [
'Klipp et parametrisk segment',
'Skriv P(t) = (−2 + 6t, 1), med 0 ≤ t ≤ 1. Innenfor vinduet [0, 3] × [0, 2] er y-kravet allerede oppfylt. Løs begge x-ulikhetene og ta snittet av de tillatte intervallene.',
'Hvilke endepunkter skal tegnes?',
'Sett inn parametergrensene som består. P(⅓) = (0, 1) og P(⅚) = (3, 1). Et tomt snitt ville forkastet hele segmentet.'],
'rasterisering': [
'Test trekantdekning',
'Bruk hjørner mot klokken A = (0, 0), B = (4, 0), C = (0, 4), med y oppover. For hver rettet kant bruker du det fortegnede kryssproduktet av kanten og forskyvningen til prøven. Et positivt resultat plasserer prøven til venstre.',
'Er P = (1, 1) dekket?',
'De tre kantverdiene er 4, 8 og 4. Alle er positive, så P ligger strengt innenfor. Null ville krevd rasteriseringens regel for inkludering av grenser.'],
'farge': [
'Bland én piksel',
'Anta lineær RGB, ikke-forhåndsmultiplisert alfa og ugjennomsiktig bakgrunn. En rød forgrunn bidrar med andelen α av resultatet. Den udekkede andelen viser fremdeles den blå bakgrunnen.',
'Finn C for α = 0.25. Hva skjer hvis lagenes rekkefølge snus?',
'Resultatet er (0.25, 0, 0.75). En ugjennomsiktig blå forgrunn dekker alt det røde, så omvendt rekkefølge gir (0, 0, 1).'],
'lys': [
'Forutsi et diffust lysbidrag',
'Bruk enhetsvektorer fra flaten mot lyset og langs den utoverrettede normalen. Skalarproduktet måler hvor rett lyset treffer. Klipp negative verdier før du ganger med lysintensitet og materialets reflektans.',
'Hva skjer hvis vinkelen øker til 120°?',
'Cosinus blir −0.5. Det klippede diffuse bidraget er null. Andre ledd, som omgivelseslys, beregnes separat.'],
'intensitet': [
'Bygg et utjevningskart',
'Bruk fire nivåer og tellinger [1, 1, 2, 4]. Del de kumulative tellingene på åtte for å få kumulative sannsynligheter. I dette eksemplet ganger du med L − 1 og avrunder til nærmeste heltall, med halve opp.',
'Tvang utjevningen frem like tellinger i utgangsbøttene?',
'Nei. Hvert diskrete nivå avbildes her på seg selv. En deterministisk oppslagstabell flytter alle piksler med samme inngangsnivå samlet, så den kan ikke fordele en stor bøtte på flere utgangsnivåer.'],
'filtrering': [
'Følg kjerneorienteringen',
'Ved en indre piksel bruker du vannrette prøver [2, 5, 9] og sentrert kjerne [−1, 0, 1]. Korrelasjon parer prøvene med vektene slik de er skrevet. Konvolusjon snur plasseringene deres.',
'Ville forskjellen endret et trepunktsmiddel?',
'Middelkjernen [⅓, ⅓, ⅓] er symmetrisk, så snuing gir nøyaktig samme skalarprodukt. Ved kanten må du fortsatt oppgi hvordan manglende prøver erstattes.'],
'frekvens': [
'Tolk en Fourier-koeffisient',
'Bruk prøvene [3, 1, 3, 1] og uskalert forover-DFT. Ved k = 0 er hver fasefaktor én. Ved k = 2 veksler faktorene mellom +1 og −1.',
'Hvilket signal gjenstår hvis bare DC-koeffisienten beholdes?',
'Den inverse transformen fordeler 8/4 = 2 til hver prøve. Originalsignalet var en konstant 2 pluss en vekslende komponent med amplitude 1.'],
'segmentering': [
'Oppgi konnektivitet før regionvekst',
'Et 2 × 2-bilde har intensitet 8 øverst til venstre og nederst til høyre, og 0 ellers. Bruk øvre venstre piksel som frø og godta bare intensitet 8. Vekst krever både tillatt intensitet og en sti av godkjente naboer.',
'Hvorfor gir intensitetstesten alene feil resultat med fire-sammenheng?',
'Terskling velger begge lyse piksler uansett hvor de ligger. Med fire-sammenheng når alle første steg mørke piksler, så ingen godkjent sti leder til diagonalpikselen.'],
'morfologi': [
'Trekk ut en indre rand',
'Bruk et fylt 5 × 5-kvadrat med bakgrunn utenfor og et sentrert 3 × 3 kvadratisk strukturelement. Erosjon beholder posisjoner der hele elementet passer. Nøyaktig den midtre 3 × 3-blokken overlever.',
'Hvor mange piksler danner ytre rand når det er plass rundt kvadratet?',
'Dilasjon utvider kvadratet til 7 × 7. Trekker du fra originalkvadratet, gjenstår 49 − 25 = 24 piksler utenfor.'],
'nevrale-nett': [
'Følg en gradient gjennom ett nevron',
'La z = wx + b, a = ReLU(z) og L = ½(a − t)². For x = 2, w = 1, b = 0 og mål t = 3 gir fremoverpasset z = a = 2. Aktiv ReLU har derivert én.',
'Oppdater bare w med gradientnedstigning og læringsrate 0.1. Synker tapet?',
'w blir 1 − 0.1 × (−2) = 1.2. Utgangen er nå 2.4. Tapet synker fra 0.5 til ½ × 0.6² = 0.18.'],
'cnn': [
'Skill vekter fra multiplikasjoner',
'Bruk fire 3 × 3-filtre på et 8 × 8-bilde med tre kanaler, steg én og ingen padding. Hvert filter dekker alle tre inngangskanaler og har én bias. Seks vannrette og seks loddrette plasseringer får plass.',
'Hvor mange vektmultiplikasjoner bruker fremoverpasset?',
'Det er 6 × 6 × 4 utverdier. Hver trenger 27 vektmultiplikasjoner, til sammen 3 888. Gjenbruk av samme filter på hver plassering øker arbeidet mens parameterantallet består.'],
'transformer': [
'Les én rad med oppmerksomhet',
'For én query er de skalerte skalarproduktskårene for to keys 0 og ln 3. Softmax eksponensierer skårene og deler hvert resultat på samme radsum. Vektene kombinerer value-vektorene.',
'Med skalarverdier 2 og 10, hva leser denne queryen ut?',
'Første vekt er 0.25. Den vektede verdien er 0.25 × 2 + 0.75 × 10 = 8. Den ligger mellom verdiene, nærmest den som får mest oppmerksomhet.'],
}
