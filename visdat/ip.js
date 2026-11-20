/* PDF-henvisninger bruker PDF-viserens sidetall. DIP4e bruker trykte sidetall. */
(() => {
  const section = (id, title, source, html) => ({ id, title, source, html });
  const chapters = [];

  chapters.push({
    slug: "intensitet",
    title: "Fra lys til histogram",
    intro:
      "Et digitalt gråtonebilde er et rutenett av målinger. Du kan endre hvordan bildet ser ut ved å gi hver måleverdi en ny intensitet.",
    focus: [
      "Forklar hvordan øyet og et hullkamera danner et bilde.",
      "Regn fra pikselverdier til histogram, kumulativ fordeling og utjevnet bilde.",
      "Tegn en intensitetskurve og forutsi hva den gjør med lyse og mørke partier.",
    ],
    terms: {
      sampling:
        "Å måle et kontinuerlig signal på utvalgte posisjoner, for eksempel i et rutenett.",
      kvantisering:
        "Å tilordne en målt verdi til ett av et endelig antall nivåer.",
      histogram: "Antall piksler som har hvert intensitetsnivå.",
      "kumulativ fordeling":
        "Andelen av pikslene med intensitet mindre enn eller lik et gitt nivå.",
      disparitet:
        "Forskjellen i bildeposisjon for samme scenepunkt i to kamerabilder.",
    },
    sections: [
      section(
        "bildedannelse",
        "Bildeplan, dybde og piksler",
        "L1-T0-b_Intro, PDF s. 4–8 og 12–36. Gonzalez og Woods (DIP4e), kap. 2.1–2.4, s. 48–80.",
        `
        <p>På netthinnen måler staver små lysmengder godt. Tapper gir fargesyn og er tett pakket rundt synsgropen. I et hullkamera bestemmer en stråle gjennom åpningen hvor et scenepunkt avbildes. Med et virtuelt bildeplan foran kameraet gir formlike trekanter <math><mi>x</mi><mo>=</mo><mfrac><mrow><mi>f</mi><mi>X</mi></mrow><mrow><mi>Z</mi></mrow></mfrac></math> og <math><mi>y</mi><mo>=</mo><mfrac><mrow><mi>f</mi><mi>Y</mi></mrow><mrow><mi>Z</mi></mrow></mfrac></math>. Et fysisk bildeplan bak åpningen gir et omvendt bilde.</p>
        <p>Et punkt 0,4 m til høyre for den optiske aksen og 2 m foran kameraet får x = 10 mm · 0,4/2 = 2 mm med brennvidde 10 mm. Flere punkter på samme stråle gir samme x og y. To parallelle, rektifiserte kameraer med grunnlinje B kan finne dybde fra <dfn>disparitet</dfn> d. Med f = 200 piksler, B = 0,1 m og d = 10 piksler blir Z = fB/d = 2 m.</p>
        <p>En mindre lysåpning slipper inn mindre lys. I den geometriske hullkameramodellen samler den strålene fra et punkt i en mindre flekk på bildeplanet. Romlig oppløsning beskriver hvor nærliggende detaljer systemet kan skille. Optikken og avstanden mellom målepunktene påvirker denne grensen.</p>
        <p><dfn>Sampling</dfn> bestemmer hvor vi måler. <dfn>Kvantisering</dfn> bestemmer hvilke verdier som kan lagres. Et 4 × 3 gråtonebilde med 2 bit per piksel inneholder 12 målinger med 4 mulige nivåer. Pikseldataene tar 24 bit uten pakkeoverhead.</p>
          <p>Sampling velger hvor tett vi måler på sensorflaten. Kvantisering velger hvilke verdier hver måling kan lagres som. Flere biter kan skille svakere intensitetsforskjeller, men kan ikke hente tilbake et mønster som aldri ble samplet tett nok.</p>
          <details class="sjekk"><summary>Grunnøving · Hva kvantiseres i et gråtonebilde?</summary><p>Skill måleposisjon fra måleverdi.</p><details><summary>Se svar</summary><p>Pikselens intensitet tilordnes ett av et endelig antall nivåer. Sampling bestemmer hvilke posisjoner som måles.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Du har plass til 8192 bit. Sammenlign 32 × 32 piksler med 8 bit og 64 × 32 piksler med 4 bit. Hvilket passer best til tette loddrette striper med bare to kjente gråtoner?</p>
          <details><summary>Hint</summary><p>Regn separat på antall kolonner og antall intensitetsnivåer.</p></details>
          <details><summary>Se svar</summary><p>Begge bruker 8192 bit. Andre valg gir dobbelt så mange prøver på tvers av stripene og 16 nivåer, nok for to vel adskilte toner. For et jevnt gråtoneforløp kan 256 nivåer være viktigere. Optikken må også kunne oppløse stripene.</p></details></div>`,
      ),
      section(
        "punktoperator",
        "Les kurven fra inngang til utgang",
        "L1-T1-a_Spatial-Intuition, PDF s. 8–21. L1-T1-b_Spatial-IntensityTransf, PDF s. 2–7. DIP4e, kap. 3.2.",
        `
        <p>En punktoperator s = T(r) endrer hver piksel ut fra dens egen verdi. Les inngangen på den vannrette aksen. En kurve over diagonalen gjør nivået lysere. Der kurven er bratt, øker avstanden mellom to nærliggende nivåer. Flate intervaller mister kontrast.</p>
        <p>Bruk normaliserte nivåer 0 ≤ r ≤ 1 og gammakurven s = r<sup>γ</sup>. For r = 0,25 gir γ = ½ verdien 0,5. Med γ = 2 blir verdien 0,0625. Negativet s = 1 − r bytter om lyst og mørkt. En stykkevis lineær kurve kan strekke et trangt intervall, mens klipping til 0 eller 1 gjør flere ulike inngangsverdier like.</p>
          <p>For en potenslov på normaliserte verdier er <math><mi>s</mi><mo>=</mo><msup><mrow><mi>r</mi></mrow><mrow><mi>γ</mi></mrow></msup></math>. Endepunktene 0 og 1 ligger fast når γ > 0. For 0 < r < 1 gir en mindre eksponent større resultat. Normaliser før du bruker kurven og skaler tilbake etterpå.</p>
          <details class="sjekk"><summary>Grunnøving · Trenger en punktoperator naboverdier?</summary><p>Skriv s = T(r).</p><details><summary>Se svar</summary><p>Nei. Gitt samme funksjon T får to piksler med samme r alltid samme s.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et 8-bits bilde har pikselverdi 64. Bruk γ = ½ med maksimalverdi 255. Hva får du etter avrunding, og hvorfor?</p>
          <details><summary>Hint</summary><p>Skriv operasjonen som 255·√(64/255).</p></details>
          <details><summary>Se svar</summary><p>(64/255) ≈ 0,251. Kvadratroten er omtrent 0,501. Gang med 255 og avrund til 128. Mørke verdier blir lysere. Å ta kvadratroten av 64 direkte ville gitt 8 og feil enhet.</p></details></div>`,
      ),
      section(
        "histogram",
        "Utjevn et lite bilde for hånd",
        "L1-T1-a_Spatial-Intuition, PDF s. 22–32. L1-T1-b_Spatial-IntensityTransf, PDF s. 23–29. DIP4e, kap. 3.3, s. 133–153.",
        `
        <p>Et <dfn>histogram</dfn> teller nivåer uten å bevare plasseringen av pikslene. To bilder med ombyttede piksler har samme histogram. Del antall h(r) på pikselantallet N for å få p(r). Summer p fra 0 til og med r for å få <dfn>kumulativ fordeling</dfn> F(r).</p>
        <p>Bruk L = 4 nivåer og h = [1, 4, 2, 1] for N = 8. Den kumulative tellingen er [1, 5, 7, 8], så F = [⅛, ⅝, ⅞, 1]. Med T(r) = avrund((L − 1)F(r)) får vi avrund([0,375, 1,875, 2,625, 3]) = [0, 2, 3, 3]. Dermed blir en piksel med nivå 1 til 2.</p>
        <p>Tell på nytt gjennom avbildningen. Det nye histogrammet blir [1, 0, 4, 3]. De to øverste nivåene deler utgangsnivå 3. Diskret utjevning kan derfor etterlate tomme nivåer. Her bruker vi nærmeste heltall og hele fordelingsfunksjonen. Følg avrundingen som oppgaven oppgir.</p>
          <aside lang="en" class="worked-example"><h3>Build an equalization map</h3><p>Use four levels and counts [1, 1, 2, 4]. Divide cumulative counts by eight to obtain the cumulative probabilities. In this example, multiply by L − 1 and round to nearest, with halves rounded upward.</p>
          <div class="calculation">CDF = [⅛, ¼, ½, 1] &nbsp; ⇒ &nbsp; mapped levels = [0, 1, 2, 3]</div><p>Did equalization force equal counts in the output bins?</p><details><summary>Check your reasoning</summary><p>No. Each discrete level maps back to itself here. A deterministic lookup table moves all pixels of one input level together, so it cannot divide a large bin among multiple output levels.</p></details></aside>
          <p>En histogramutjevning kan også forutsi hele utgangshistogrammet. Beregn oppslagstabellen én gang, og flytt deretter alle tellerne fra hver inngangsverdi til dens utgangsverdi. To ulike inngangsnivåer kan havne i samme bøtte.</p>
          <details class="sjekk"><summary>Grunnøving · Hva er summen av et normalisert histogram?</summary><p>Hver piksel telles én gang.</p><details><summary>Se svar</summary><p>Summen av tellingene er antall piksler. Etter divisjon med dette antallet summerer andelene til 1.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Fire nivåer har tellinger [1,1,6,0]. Bruk gulv av 3 ganger kumulativ andel. Finn utgangshistogrammet.</p>
          <details><summary>Hint</summary><p>Kumulative tellinger er 1, 2, 8 og 8. Divisor er 8.</p></details>
          <details><summary>Se svar</summary><p>Kartet blir [0,0,3,3]. De to første tellerne summeres til 2 ved nivå 0. Nivå 3 får 6. Utgangshistogrammet er [2,0,0,6], med samme totale pikselantall.</p></details></div>`,
      ),
    ],
    question:
      "Et bilde har nivåene 0 til 3 med fire piksler på nivå 0, to på nivå 1 og to på nivå 3. Hva blir utgangshistogrammet etter utjevning? Rund halvverdier opp.",
    hint: "Lag en oppslagstabell ved å gange hvert kumulativt antall med 3/8 før avrunding.",
    answer:
      "Kumulativ telling er [4, 6, 6, 8]. Gang med 3/8 og rund [1,5, 2,25, 2,25, 3] til [2, 2, 2, 3]. Seks piksler ender på nivå 2 og to på nivå 3. Histogrampostene er [0, 0, 6, 2].",
  });

  chapters.push({
    slug: "filtrering",
    title: "Filtre i bilderommet",
    intro:
      "Et nabolagsfilter erstatter en piksel ved å bruke verdiene rundt den. Glatting demper små variasjoner. Derivasjon fremhever raske overganger.",
    focus: [
      "Regn ut en filterrespons med riktig kjerneorientering og kantregel.",
      "Velg middel, Gauss eller median ut fra støytypen.",
      "Gjenkjenn separable filtre og tolk fortegnet til en derivert.",
    ],
    terms: {
      korrelasjon:
        "En vektet sum der kjernen legges over nabolaget slik den er oppgitt.",
      konvolusjon:
        "En vektet sum der kjernen speiles i begge akser før den legges over bildet.",
      separabel:
        "En todimensjonal kjerne er separabel når den kan skrives som produktet av en kolonnevektor og en radvektor.",
      gradient:
        "Vektoren av førsteordens partiellderiverte som peker mot raskest lokal intensitetsøkning.",
    },
    sections: [
      section(
        "kjerne",
        "Legg kjernen riktig vei",
        "L1-T1-c_Spatial-Filter-Intro, PDF s. 3–12. L3-T3-a_Filtering_Average, PDF s. 75–87. L3-T3-b_Filtering_Diff, PDF s. 12–14. DIP4e, kap. 3.4.",
        `
        <p>Sentrer kjernens origo på pikselen du vil beregne. Ved <dfn>korrelasjon</dfn> ganger du sammen verdier i tilsvarende posisjoner. Ved <dfn>konvolusjon</dfn> roterer du først kjernen 180°. Summen kan bli negativ eller større enn bildets nivåområde. Behold fortegn og presisjon til oppgaven ber om avrunding eller klipping.</p>
        <p>For nabolaget [1, 4, 7] og k = [−1, 0, 1] gir korrelasjon −1·1 + 0·4 + 1·7 = 6. Ved konvolusjon blir kjernen [1, 0, −1] og svaret −6. En symmetrisk kjerne gir likt resultat med begge metodene. I CNN-eksemplene brukes vanligvis korrelasjon under navnet convolution.</p>
        <p>Ved venstre bildekant må filteret hente en verdi utenfor bildet. For rekken [3, 6, 9] med middel over tre piksler blir den første utgangen (0 + 3 + 6)/3 = 3 med nullutfylling. Med gjentatt kantverdi får du (3 + 3 + 6)/3 = 4. «Valid» gir bare steder der hele kjernen passer.</p>
        <div data-demo="filter"></div>
          <aside lang="en" class="worked-example"><h3>Track the kernel orientation</h3><p>At an interior pixel, take the horizontal samples [2, 5, 9] and the centred kernel [−1, 0, 1]. Correlation pairs the samples with the weights as written. Convolution reverses their positions.</p>
          <div class="calculation">Correlation: −2 + 0 + 9 = 7. &nbsp; Convolution: 2 + 0 − 9 = −7.</div><p>Would the distinction change a three-point mean?</p><details><summary>Check your reasoning</summary><p>The mean kernel [⅓, ⅓, ⅓] is symmetric, so reversing it gives exactly the same dot product. At the boundary you must still specify how to supply missing samples.</p></details></aside>
          <p>For et konstant bilde er utgangen i det indre lik intensiteten ganger summen av kjernen. Dette gir en rask test av både glattefiltre og derivasjonsfiltre. Randbehandlingen avgjør om samme kontroll virker helt til kanten.</p>
          <details class="sjekk"><summary>Grunnøving · Hvor mange tall multipliseres ved ett 3 × 3-filter på én kanal?</summary><p>Tell posisjonene i ett fullt vindu.</p><details><summary>Se svar</summary><p>Ni par av verdi og vekt gir ni produkter som summeres.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Bruk et sentrert middel med bredde 3 på [6,6,6]. Finn første verdi ved nullutfylling, kopiering av kanten og valid beregning.</p>
          <details><summary>Hint</summary><p>Skriv ned alle tre naboer før du summerer.</p></details>
          <details><summary>Se svar</summary><p>Nullutfylling gir (0+6+6)/3 = 4. Kantkopiering gir (6+6+6)/3 = 6. Ved valid finnes ingen utgang sentrert på første posisjon. Den eneste gyldige utgangen er midtposisjonens 6.</p></details></div>`,
      ),
      section(
        "malsok",
        "Finn et mønster med normalisert korrelasjon",
        "L3-T3-a_Filtering_Average, PDF s. 142–151 · L3-T3-b_Filtering_Diff s. 16–18",
        `<p>I malsøk sammenlikner vi samme lille mønster med mange bildevinduer. Vanlig skalarprodukt kan bli stort bare fordi vinduet er lyst. Trekk middelverdien fra både mal og vindu og divider skalarproduktet på produktet av vektorlengdene. Da sammenliknes variasjonsmønstrene. Positiv skalering og et konstant lystillegg endrer ikke skåren.</p><p>Mal [0,1,2] og vindu [4,6,8] blir [−1,0,1] og [−2,0,2] etter sentrering. Telleren er 4. Nevneren er √2·√8=4, så skåren er 1. Plasser skåren ved vinduets anker, flytt vinduet én posisjon og finn lokale topper i responskartet.</p>
        <details class="sjekk"><summary>Grunnøving · Hva betyr skår nær +1?</summary><p>Anta middelverdisentrerte vinduer med positiv varians.</p><details><summary>Se svar</summary><p>Mønstrene varierer nesten proporsjonalt i samme retning. Skåren kan være stor selv om vinduene har ulik middelverdi.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Hva blir skåren for [8,6,4] og for [6,6,6]?</p><details><summary>Hint</summary><p>Undersøk både fortegnet til telleren og lengden til den sentrerte vektoren.</p></details><details><summary>Se svar</summary><p>Første vindu gir [2,0,−2] og skår −4/4=−1. Det konstante vinduet får norm null. Skåren er udefinert der; hopp over vinduet eller oppgi hvordan tilfellet håndteres.</p></details></div>`,
      ),
      section(
        "utjevning",
        "Støy, median og Gauss",
        "L3-T3-a_Filtering_Average, PDF s. 21–53, 93–100 og 135–141. DIP4e, kap. 3.5, s. 164–175.",
        `
        <p>Et middel gir lik vekt til hver nabo. Et gaussfilter gir størst vekt nær sentrum, og større σ gir bredere utjevning. Normaliser summen av vektene til én for å bevare et konstant område. For nabolaget [10, 11, 99] er middelverdien 40, mens medianen av de sorterte verdiene er 11. Medianen tåler en enkelt impuls og er et ikke-lineært filter.</p>
        <p>La u = [1, 2, 1]/4. Det ytre produktet uᵀu gir en <dfn>separabel</dfn> kjerne med rader [1, 2, 1], [2, 4, 2], [1, 2, 1], alle delt på 16. Utfør én passering langs rader og én langs kolonner. En k × k-kjerne krever da 2k multiplikasjoner per piksel i stedet for k². Ved k = 5 sparer du 15 av 25 multiplikasjoner.</p>
        <p>Den kontinuerlige, normaliserte 2D-Gaussfunksjonen med samme σ langs begge akser er <math><mi>G</mi><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>π</mi><msup><mrow><mi>σ</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mfrac><mi>exp</mi><mo>(</mo><mo>−</mo><mfrac><mrow><msup><mrow><mi>x</mi></mrow><mrow><mn>2</mn></mrow></msup><mo>+</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow><mrow><mn>2</mn><msup><mrow><mi>σ</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mfrac><mo>)</mo></math>. Eksponenten kan deles i et x-ledd og et y-ledd. Derfor kan G faktoriseres i to 1D-Gaussfunksjoner. Normaliser den diskrete, avkuttede kjernen etter sampling. Både middel og Gauss med faste vekter er lineære. For operatoren F gjelder F(aI + bJ) = aF(I) + bF(J) fordi hver term i summen fordeler seg over addisjonen.</p>
          <p>Medianen sorterer nabolaget og velger midtverdien. En enkelt ekstrem verdi kan trekke et gjennomsnitt langt, mens sorteringsplassen til medianen ofte består. Små detaljer kan likevel forsvinne når de er i mindretall i vinduet.</p>
          <details class="sjekk"><summary>Grunnøving · Hva skal vektsummen være i et normalisert middel?</summary><p>Test på en konstant flate med verdi 10.</p><details><summary>Se svar</summary><p>For å få 10 ut må 10 ganger vektsummen være 10, så summen skal være 1 i det indre.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Ved en kant får du prøvene [8,9,250,10,11]. Sammenlign median og middel. Hva om de tre midterste romlige prøvene faktisk tilhører en lys strek på 250?</p>
          <details><summary>Hint</summary><p>Sorter for median, bruk originalverdienes sum for middel.</p></details>
          <details><summary>Se svar</summary><p>Sortert er første vindu [8,9,10,11,250]. Medianen er 10, middel er 288/5 = 57,6. Med [8,250,250,250,11] blir medianen 250. Bredden på strukturen i forhold til vinduet avgjør hva som bevares.</p></details></div>`,
      ),
      section(
        "separabel",
        "Faktoriser en filterkjerne",
        "L3-T3-a_Filtering_Average, PDF s. 93–101 · DIP4e § 3.4–3.5",
        `<p>Et separabelt filter har vekter som kan skrives som et kolonneelement ganger et radelement. Da kan du summere først langs hver rad og deretter langs kolonnen. Den distributive loven gir akkurat de samme produktene som en 2D-sum. To pass med lengde k bruker omtrent 2k multiplikasjoner per utgang, mot k² i ett tett pass.</p><p>Bruk vekter [1,2,1]/4 i begge retninger. Kjernens sentrum har vekt 4/16 og et hjørne 1/16. I et 3 × 3-vindu med rader [0,0,0], [0,8,0], [0,0,0] blir vannrette mellomverdier [0,4,0]. Loddrett pass gir 2. Summen av vektene er én, så en konstant flate består. Begge pass må bruke kompatible randregler, og avrunding mellom passene kan endre resultatet.</p>
        <details class="sjekk"><summary>Grunnøving · Hvilken midtvekt gir to pass med [1,2,1]/4?</summary><p>Velg den midtre vekten i begge retninger.</p><details><summary>Se svar</summary><p>(2/4)·(2/4)=¼. Det er samme som 4/16 i den sammensatte 2D-kjernen.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>For samme vindu med verdi 8 bare øverst til venstre, hva blir utgangen?</p><details><summary>Hint</summary><p>Finn øverste rads mellomverdi før vertikal filtrering.</p></details><details><summary>Se svar</summary><p>Første pass gir [2,0,0]. Andre gir 2/4=½. Dette stemmer med hjørnevekten 1/16 ganger 8.</p></details></div>`,
      ),
      section(
        "gaussderivert",
        "Finn en kant ved to ulike deriverte",
        "L3-T3-b_Filtering_Diff, PDF s. 74–88 og 108–113 · L6-T6-a_Segmentation, PDF s. 23–26",
        `<p>En brå nivåendring får stor førstederivert. Små, tilfeldige svingninger kan også få stor derivert, så glatt først. Derivasjon av et gaussglattet signal kan utføres ved å konvolvere signalet med den deriverte av Gauss-kjernen. Filteret kombinerer dermed to trinn. Liten σ bevarer nære kanter, men lar mer støy slippe gjennom. Stor σ demper støy og kan slå sammen nærliggende konturer.</p><p>Den andrederiverte måler hvordan stigningen endres. Et maksimum i stigningen kan gi positiv andrederivert på én side og negativ på den andre. For den glatte profilen [0,1,4,7,8] gir første nabodifferanser [1,3,3,1]. Andre differanser er [2,0,−2]. Fortegnsskiftet ved midten er en kantkandidat, mens et null i et konstant område ikke alene er et kryss. I to dimensjoner summerer Laplace-operatoren de andrederiverte i x og y; brukt etter gaussglatting kalles operatoren LoG.</p>
        <details class="sjekk"><summary>Grunnøving · Er et enkelt null i den andrederiverte nok?</summary><p>Test et helt konstant bilde.</p><details><summary>Se svar</summary><p>Nei. Alle andrederiverte er da null uten en kant. Se etter et faktisk fortegnsskifte og vurder størrelsen.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>En andrederivert profil er [0,0,0,2,−3,0]. Hvilke posisjoner støtter en nullkryssing, og hvorfor kan en ekstra styrketerskel hjelpe?</p><details><summary>Hint</summary><p>Se etter motsatte fortegn på hver side.</p></details><details><summary>Se svar</summary><p>Mellom 2 og −3 finnes en nullkryssing. De første nullene viser ingen overgang fra pluss til minus. Støy kan også gi små fortegnsskift; en terskel på forskjellen over krysset undertrykker svake kandidater.</p></details></div>`,
      ),
      section(
        "derivasjon",
        "Skille en kant fra en topp",
        "L3-T3-b_Filtering_Diff, PDF s. 25–30, 86–101 og 105–112. DIP4e, kap. 3.6.",
        `
        <p>En første differanse måler endring mellom naboer. Sobel kombinerer differanse i én retning med vektet glatting i den andre. Fra G<sub>x</sub> = 3 og G<sub>y</sub> = 4 får en <dfn>gradient</dfn> lengde √(3² + 4²) = 5. Selve kanten står vinkelrett på gradienten. Her er x mot høyre og y ned i bildet.</p>
        <p>Andrederiverten måler endring i stigning. For fire-nabos Laplace med sentrum −4 og fire 1-tall er responsen nord + sør + øst + vest − 4·sentrum. Med sentrum 8 og alle naboer 5 får du −12. Den negative krumningen markerer en lys topp. Skjerping med f − α∇²f og α = ¼ gir 8 − ¼·(−12) = 11. Ved motsatt kjernefortegn må du også bytte fortegn i kombinasjonen.</p>
          <p>Førstederivert måler stigning, mens andrederivert måler endring i stigning. Et symmetrisk andrederivertfilter summerer til null og reagerer derfor ikke på konstante felt. Når du skjerper med en Laplace-kjerne må fortegnet til midtkoeffisienten være kjent.</p>
          <details class="sjekk"><summary>Grunnøving · Hva måler gradientretningen?</summary><p>Tenk på en vertikal kant som er mørk til venstre og lys til høyre.</p><details><summary>Se svar</summary><p>Intensiteten vokser mest vannrett mot høyre. Gradienten står normalt på selve kanten.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>På raden [2,5,2] brukes kjernen [1,−2,1] ved sentrum. Finn den andre differansen og en skjerpet verdi med original minus differanse.</p>
          <details><summary>Hint</summary><p>Et lokalt maksimum bør få en høyere verdi etter skjerping.</p></details>
          <details><summary>Se svar</summary><p>Differansen er 2 − 10 + 2 = −6. Skjerpet sentrum blir 5 − (−6) = 11. Klipp først etter regningen hvis lagringsformatet har begrenset verdiområde.</p></details></div>`,
      ),
    ],
    question:
      "Bruk konvolusjon på raden [2, 3, 8] med kjernen [1, 0, −1] og origo i midten. Finn senterresponsen og responsen ved venstre kant med gjentatt kantverdi.",
    hint: "Snu kjernen én gang. Venstre nabolag blir [2, 2, 3].",
    answer:
      "Den snudde kjernen er [−1, 0, 1]. Midten gir −2 + 8 = 6. Ved venstre kant får vi −2 + 3 = 1. Begge verdiene er positive fordi intensiteten øker mot høyre.",
  });

  chapters.push({
    slug: "frekvens",
    title: "Fourier og frekvensfiltrering",
    intro:
      "Fourier-transformen beskriver bildet som en sum av bølger. Det gjør det lettere å se og fjerne periodiske mønstre som kan være vanskelige å skille ut i bilderommet.",
    focus: [
      "Finn DC-leddet og tolk plasseringen av et topp-par i spekteret.",
      "Velg frekvensmaske og gjennomfør filtrering med riktig sentrering og padding.",
      "Forutsi når nedprøving gir aliasing og forklar hva FFT beregner.",
    ],
    terms: {
      "DC-ledd":
        "Fourier-koeffisienten for null frekvens. Med en unormalisert forovertransform er den summen av prøvene.",
      amplitudespekter: "Absoluttverdien av hver kompleks Fourier-koeffisient.",
      aliasing:
        "At forskjellige frekvenser gir samme prøver etter sampling og derfor blir umulige å skille.",
      FFT: "En familie av raske algoritmer for å beregne den diskrete Fourier-transformen.",
    },
    sections: [
      section(
        "spektrum",
        "Les et spekter og regn en DFT",
        "L5-T5-a_Frequency, PDF s. 4–9, 17–26 og 32–39. DIP4e, kap. 4.4–4.6.",
        `
        <p>Den diskrete Fourier-transformen (DFT) sammenligner prøvene med periodiske basisbølger. Her bruker vi negativ eksponent i forovertransformen, uten skalering, og positiv eksponent og faktor 1/N i inversen. <math display="block"><mi>F</mi><mo>[</mo><mi>k</mi><mo>]</mo><mo>=</mo><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo><mn>0</mn></mrow><mrow><mi>N</mi><mo>−</mo><mn>1</mn></mrow></munderover><mi>f</mi><mo>[</mo><mi>n</mi><mo>]</mo><msup><mi>e</mi><mfrac><mrow><mo>−</mo><mn>2</mn><mi>π</mi><mi>i</mi><mi>k</mi><mi>n</mi></mrow><mi>N</mi></mfrac></msup></math>, med n fra 0 til N − 1. <dfn>DC-ledd</dfn> F[0] er summen. Del på N for å få middelverdien.</p>
        <p>For f = [4, 2, 4, 2] er F[0] = 12. Ved k = 2 er faktorene [1, −1, 1, −1], så F[2] = 4 − 2 + 4 − 2 = 4. Ved k = 1 gir [1, −i, −1, i] summen 0. F[3] = 0 ved konjugatsymmetri. Signalet er dermed en konstant på 3 pluss et ledd på ±1 som skifter ved hver prøve.</p>
        <p>I et sentrert <dfn>amplitudespekter</dfn> ligger nullfrekvens i midten. To topper symmetrisk om midten kan representere én reell sinus. Avstanden fra sentrum øker med antall perioder. Toppene ligger langs retningen som intensiteten varierer i, vinkelrett på stripene. En vannrett rad med to topper kan derfor komme fra loddrette striper. En enkelt punktimpuls har konstant spektral amplitude. Mange spredte lyse og mørke støypiksler kan dermed spre energi bredt utover spekteret.</p>
        <p>Skriv en bølge som c + A sin(2πft + φ), med A ≥ 0. Avles topp og bunn for å finne A = (topp − bunn)/2. Avstanden T mellom to topper gir f = 1/T. En bølge som varierer mellom −2 og 4 og gjentar seg hver 0,25 s, har c = 1, A = 3 og f = 4 Hz. Starter den på toppen ved t = 0, er φ = π/2 modulo 2π i sinusformen.</p>
          <aside lang="en" class="worked-example"><h3>Interpret a Fourier coefficient</h3><p>For samples [3, 1, 3, 1], use the unscaled forward DFT. At k = 0 every phase factor is one. At k = 2 the factors alternate between +1 and −1.</p>
          <div class="calculation">F[0] = 8, &nbsp; F[2] = 3 − 1 + 3 − 1 = 4</div><p>What signal remains if only the DC coefficient survives?</p><details><summary>Check your reasoning</summary><p>The inverse transform distributes 8/4 = 2 to every sample. The original signal was a constant 2 plus an alternating component of amplitude 1.</p></details></aside>
          <p>En 2D-DFT kan regnes langs én dimensjon om gangen fordi fasefaktoren er et produkt av en radfaktor og en kolonnefaktor. For lengde to er transformen særlig enkel: første utgang er summen og andre er differansen. Behold komplekse verdier mellom passene.</p>
          <details class="sjekk"><summary>Grunnøving · Hva betyr DC før normalisering?</summary><p>Sett frekvensindeksen til null.</p><details><summary>Se svar</summary><p>Alle fasefaktorene er 1. DC blir summen av prøvene, og DC delt på antallet gir middelverdien.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Transformer radene [1,3] og [1,3] som et 2 × 2-bilde. Bruk uskalert forovertransform og DC øverst til venstre.</p>
          <details><summary>Hint</summary><p>Transformer først hver rad, deretter hver kolonne i mellomresultatet.</p></details>
          <details><summary>Se svar</summary><p>Radene blir begge [4,−2]. Kolonnene [4,4] og [−2,−2] gir [8,0] og [−4,0]. Sluttmatrisen har rader [8,−4], [0,0]. Ingen variasjon nedover gir null i siste frekvensrad.</p></details></div>`,
      ),
      section(
        "fft",
        "Del en DFT i partalls- og oddetallsprøver",
        "L5-T5-a_Frequency, PDF s. 32–39 · DIP4e § 4.4",
        `<p>FFT beregner de samme koeffisientene som DFT. For partallslengde deles summen i prøver med indeks 2m og 2m+1. Hver del er en halvlang DFT. Den forskjøvne oddetallsdelen får en fasefaktor W<sub>N</sub><sup>k</sup> = exp(−2πik/N). Den andre halvdelen av utgangen bruker de samme delsummene med minus foran oddetallsbidraget. Gjentatt halvering ved topotenslengde gir log₂N nivåer med arbeid proporsjonalt med N per nivå.</p><p>For [1,2,3,4] gir partallsprøvene [1,3] transformen E=[4,−2] og oddetallsprøvene [2,4] gir O=[6,−2]. Ved k=0 er fasefaktoren 1: F[0]=4+6=10 og F[2]=4−6=−2. Ved k=1 er fasefaktoren −i. Bidraget (−i)(−2)=2i gir F[1]=−2+2i og F[3]=−2−2i. De er komplekskonjugerte fordi inngangen er reell.</p>
        <details class="sjekk"><summary>Grunnøving · Hvilke prøver går til partallsdelen?</summary><p>Bruk indekser fra null i [4,8,6,9].</p><details><summary>Se svar</summary><p>Indeks 0 og 2 gir [4,6]. Å dele listen i to sammenhengende halvdeler ville gitt feil delspektra.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>En impuls [0,1,0,0] forskyves til [0,0,1,0]. Hvordan endres magnitude og fase ved k=1?</p><details><summary>Hint</summary><p>Kun ett ledd i DFT-summen er ulikt null. Bruk W₄=−i.</p></details><details><summary>Se svar</summary><p>Før forskyvning er koeffisienten −i. Etterpå er den (−i)²=−1. Begge har magnitude én. Fasen endres med −π/2 modulo 2π. Magnitude alene forteller dermed ikke hvor impulsen lå.</p></details></div>`,
      ),
      section(
        "frekvensfilter",
        "Fra bilde til maske og tilbake",
        "L5-T5-a_Frequency, PDF s. 40–51. L6-T6-a_Segmentation, PDF s. 6–9. DIP4e, kap. 4.7, fra s. 260.",
        `
        <p>Konvolusjon i bilderommet svarer til multiplikasjon i frekvensrommet. Beregn F, gang elementvis med H, og bruk invers DFT på G = H·F. Skal masken tegnes med lav frekvens i midten, flytt først DC til sentrum, og flytt tilbake før inversen. For partallsdimensjoner gir multiplikasjon av bildet med (−1)<sup>x+y</sup> før transformen den samme spektrumforskyvningen. Gjenta fortegnsbyttet etter inversen.</p>
        <p>Et lavpass bevarer området nær DC og glatter bildet. Et høypass fjerner blant annet middelverdien. Et par smale stoppområder over motsvarende støytopper kan fjerne periodisk støy og bevare detaljer andre steder. Harde kutt kan gi ringer nær kanter. Gauss- og Butterworth-masker har mykere overganger.</p>
        <p>Den andre retningen av konvolusjonsteoremet er at punktvis produkt i bilderommet blir sirkulær konvolusjon i frekvensrommet, med normaliseringsfaktor 1/(MN) for et M × N-bilde med uskalert forovertransform. Store, tette kjerner kan lønne seg å filtrere med FFT. Små eller separable kjerner krever færre lokale regneoperasjoner og kan være raskere å bruke direkte.</p>
        <p>En vanlig DFT behandler grensene som periodiske. En lineær konvolusjon av en rad med 6 prøver og en kjerne med 3 trenger lengde minst 6 + 3 − 1 = 8. Fyll begge med nuller til minst 8, juster for hvor kjernens origo ligger, og beskjær det ønskede utsnittet etter inversen. Uten padding kan verdier vikle rundt til motsatt kant.</p>
          <p>DFT antar periodisk fortsettelse. Produkt med en filtertransform gir derfor sirkulær konvolusjon. For å få lineær konvolusjon må signal og kjerne nullutvides nok til at halen ikke brettes inn i starten. I 2D gjør du dette langs begge akser.</p>
          <details class="sjekk"><summary>Grunnøving · Hva skjer med DC ved et høypass som har H(0)=0?</summary><p>G multipliseres punktvis fra H og F.</p><details><summary>Se svar</summary><p>G(0)=0·F(0)=0. Den inverse transformen får middelverdi null før eventuell klipping av negative verdier.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Finn lineær konvolusjon av [1,2,3] med [1,1]. Hva skjer med trepunkts DFT uten utfylling?</p>
          <details><summary>Hint</summary><p>Hvert element bidrar på sin posisjon og den neste. Lineær lengde er 3 + 2 − 1.</p></details>
          <details><summary>Se svar</summary><p>Bidragene [1,2,3,0] og [0,1,2,3] summeres til [1,3,5,3]. Med periode 3 legges siste 3 til første verdi og gir [4,3,5]. DFT-lengde minst 4 rommer hele halen.</p></details></div>`,
      ),
      section(
        "frekvensmasker",
        "Velg maske ut fra spekteret",
        "L5-T5-a_Frequency, PDF s. 47–54 og 98–108 · DIP4e kap. 4",
        `<p>I et sentrert spektrum er avstanden D til sentrum romlig frekvens. Et sirkulært lavpass lar brede, langsomme variasjoner passere og demper fine detaljer. En ideell hard overgang kan gi ringing rundt kanter. Et Butterworth-lavpass lar overgangen bli gradvis: <math><mi>H</mi><mo>=</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><msup><mrow><mo>(</mo><mfrac><mi>D</mi><msub><mi>D</mi><mn>0</mn></msub></mfrac><mo>)</mo></mrow><mrow><mn>2</mn><mi>n</mi></mrow></msup></mrow></mfrac></math>, med grense D₀ og orden n. Større orden gir skarpere overgang.</p><p>Ved n=1 og D=2D₀ er H=1/(1+4)=0,2. En Fourier-koeffisient 10i blir 2i. Høypass med 1−H ville gitt 8i. Periodiske striper kan heller gi to isolerte topper. Et smalt sperrefilter rundt bare toppene bevarer andre detaljer på samme radius. Plasser speilsymmetriske utsparinger slik at konjugatsymmetrien for reelle bilder bevares.</p>
        <details class="sjekk"><summary>Grunnøving · Hvor sterkt er Butterworth-lavpasset ved D = D₀?</summary><p>Sett radiusforholdet lik 1.</p><details><summary>Se svar</summary><p>H=1/(1+1)=½ for alle positive ordener. Her beskriver H amplitudefaktoren.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et bilde har skarpe periodiske striper, men også nyttige konturer. Hvorfor kan et bredt lavpass være et dårlig valg?</p><details><summary>Hint</summary><p>Se etter hvilke frekvenser metoden vil fjerne utover selve støyen.</p></details><details><summary>Se svar</summary><p>Et bredt stoppområde demper også konturenes høyfrekvente bidrag. Identifiser stripefrekvensens topp-par, demp dem lokalt og kontroller etter invers DFT om konturene består. Hvis nyttig signal ligger i samme topper, kan det også gå tapt.</p></details></div>`,
      ),
      section(
        "aliasing",
        "Prøvetaking og rask beregning",
        "L5-T5-a_Frequency, PDF s. 52–62. DIP4e, kap. 4.3, s. 215–225 og kap. 4 om FFT.",
        `
        <p>En samplingfrekvens f<sub>s</sub> har Nyquist-grense f<sub>s</sub>/2. Legg høyeste signalfrekvens under grensen for entydig rekonstruksjon av et båndbegrenset signal. Ved 100 prøver per sekund kan en cosinus på 70 Hz gi samme prøver som en på 30 Hz fordi 70 = 100 − 30. Lavpassfiltrer før nedprøving for å redusere <dfn>aliasing</dfn>.</p>
        <p>En <dfn>FFT</dfn> beregner DFT-koeffisientene ved å gjenbruke delsummer. Ved N prøver bruker en typisk FFT omtrent N log₂N operasjoner mot størrelsesorden N² ved direkte evaluering. En 2D-transform kan beregnes med 1D-transformer først langs hver rad, så langs hver kolonne.</p>
          <p>Sampling ved fₛ gjør frekvenser som skiller seg med et helt multiplum av fₛ uatskillelige i prøvene. For en reell cosinus gir også positiv og negativ frekvens samme signal. Lavpassfiltrering før nedprøving fjerner innhold som ellers brettes inn.</p>
          <details class="sjekk"><summary>Grunnøving · Hva er Nyquist-frekvensen ved ti prøver per sekund?</summary><p>Del prøveraten på to.</p><details><summary>Se svar</summary><p>5 Hz er grensen. For sikker representasjon må båndgrensen ligge under denne.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et mønster har 7 perioder per lengdeenhet og måles med 10 prøver per enhet. Hvilken lavere cosinusfrekvens passer de samme prøvene?</p>
          <details><summary>Hint</summary><p>Skriv 7 = 10 − 3 og sett prøveposisjonene til n/10.</p></details>
          <details><summary>Se svar</summary><p>cos(2π·7n/10) = cos(2πn − 2π·3n/10) = cos(2π·3n/10). Bildet kan vise 3 perioder. En senere interpolasjon kan ikke avgjøre hvilken av de to som var originalen.</p></details></div>`,
      ),
    ],
    question:
      "Et 8 × 8-bilde har middelverdi 5 og loddrette sinusstriper med to hele perioder over bredden. Hvor ligger DC og toppene i et sentrert spekter med indekser 0 til 7? Bruk (rad, kolonne).",
    hint: "Stripene varierer vannrett. Regn først ut nullfrekvensen fra antall piksler og middelverdien.",
    answer:
      "Med uskalert forovertransform er F[0,0] = 64·5 = 320. Etter sentrering ligger dette leddet ved (4, 4). To perioder vannrett gir plusstopp og minustopp ved (4, 6) og (4, 2).",
  });

  chapters.push({
    slug: "segmentering",
    title: "Segmentering og konturer",
    intro:
      "Segmentering deler et bilde i regioner som har en mening for oppgaven, for eksempel forgrunn og bakgrunn. Du kan lete etter raske overganger ved grensene eller likhet innenfor hver region.",
    focus: [
      "Følg Canny fra gradient til sammenhengende kant.",
      "Tolk stemmer for linjer og sirkler i et Hough-rom.",
      "Regn ut en terskel og spor stakken i regionvekst.",
    ],
    terms: {
      hysterese:
        "En sterk respons starter eller forankrer en kant, mens svakere responser kan bli med via en sammenhengende kjede.",
      akkumulator:
        "En tabell som teller stemmer for ulike parameterverdier i Hough-transformen.",
      regionvekst:
        "En metode som bygger en region ved å legge til godkjente naboer av allerede nådde piksler.",
      stakk: "Datastruktur der det sist innlagte elementet tas ut først.",
    },
    sections: [
      section(
        "canny",
        "Spor en svak kant",
        "L6-T6-a_Segmentation, PDF s. 15–38. DIP4e, kap. 10.2.",
        `
        <p>Canny glatter først med Gauss og finner gradientens størrelse og retning. Behold bare lokale maksimum langs gradientretningen. Dette tynner en bred respons til en smal kant. Bruk to terskler og <dfn>hysterese</dfn> for å avgjøre hvilke svake responser som hører sammen med en sterk.</p>
        <p>Etter tynning er en rad [9, 5, 4, 1, 6]. Sett lav terskel til 4 og høy til 8, med likhet inkludert. Verdien 9 er sterk. 5 og 4 er svake, men kan nås sammenhengende fra 9. Tallet 1 bryter forbindelsen til 6. Sluttmasken er [1, 1, 1, 0, 0] når det ikke finnes forbindelser via andre rader. Oppgi om diagonaler teller i et todimensjonalt bilde.</p>
          <p>Hysterese er et sammenhengsproblem etter tynning. Start i alle sterke kandidater og søk gjennom svake kandidater som grenser til dem. Dermed kan en sammenhengende svak kjede overleve selv om bare det første leddet er nabo til en sterk kandidat.</p>
          <details class="sjekk"><summary>Grunnøving · Hvorfor tynne langs gradienten?</summary><p>Se på en bred respons rundt en kant.</p><details><summary>Se svar</summary><p>Ved å beholde lokale maksimum på tvers av kanten får vi en smal kantlinje. Tynning langs selve kanten kunne brutt sammenhengende kanter.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>En tynnet rad har magnituder [9,5,4,1,5]. Bruk høy terskel 8, lav terskel 3 og bare venstre/høyre nabo. Hvilke beholdes?</p>
          <details><summary>Hint</summary><p>Marker først frøene, så de tillatte posisjonene for vekst.</p></details>
          <details><summary>Se svar</summary><p>9 er sterkt frø. Fra 9 nås 5 og deretter 4. Verdien 1 er under lav terskel og bryter kjeden. Siste 5 må derfor forkastes. De første tre beholdes.</p></details></div>`,
      ),
      section(
        "hough",
        "Stem på en geometrisk form",
        "L6-T6-a_Segmentation, PDF s. 39–64. DIP4e, kap. 10.2 om Hough-transformen.",
        `
        <p>Et kantpunkt kan ligge på mange linjer. La punktet stemme i en <dfn>akkumulator</dfn> for alle linjer gjennom punktet. Bruk normalen til linjen med vinkel θ og avstand <math><mi>ρ</mi><mo>=</mo><mi>x</mi><mi>cos</mi><mi>θ</mi><mo>+</mo><mi>y</mi><mi>sin</mi><mi>θ</mi></math>. Toppene i tabellen er parametere som får støtte fra mange punkter.</p>
        <p>Punktene (2, 0), (2, 1) og (2, 3) gir alle ρ = 2 ved θ = 0°. Tre stemmer samles om den loddrette linjen x = 2. For en sirkel med kjent radius r stemmer hvert kantpunkt (x,y) på sentre (a,b) som oppfyller (a − x)² + (b − y)² = r². Ukjent radius gir en ekstra parameterakse. Kvantisering av parameterrommet bestemmer hvor nær to forslag må være for å telle i samme celle.</p>
          <p>Hvert kantpunkt stemmer for flere mulige linjer. Et maksimum oppstår når flere punkter stemmer i samme parameterbøtte. Grove bøtter samler støy, men kan også slå sammen to nærliggende linjer. Fine bøtter kan dele stemmene for én linje.</p>
          <details class="sjekk"><summary>Grunnøving · Hva beskriver θ ved linjerepresentasjonen ρ, θ?</summary><p>Tenk på x cos θ + y sin θ.</p><details><summary>Se svar</summary><p>θ er vinkelen til normalen. En vertikal linje kan derfor ha θ=0.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Bruk <math><mi>ρ</mi><mo>=</mo><mi>x</mi><mi>cos</mi><mi>θ</mi><mo>+</mo><mi>y</mi><mi>sin</mi><mi>θ</mi></math>. Hvilken bøtte får stemmer fra (2,1), (2,4) og (2,7) ved θ = 0? Hva ved θ = 90°?</p>
          <details><summary>Hint</summary><p>Vinkelen gjelder normalen til linjen.</p></details>
          <details><summary>Se svar</summary><p>Ved 0° er ρ = x = 2 for alle tre. Dette identifiserer den loddrette linjen x = 2. Ved 90° stemmer de i bøttene 1, 4 og 7. En høy topp sier lite om hvor segmentet starter og slutter.</p></details></div>`,
      ),
      section(
        "sirkel",
        "Fra linjestemmer til sirkelstemmer",
        "L6-T6-a_Segmentation, PDF s. 46–60",
        `<p>For kjent radius r kan sentrum (a,b) til en sirkel gjennom kantpunktet (x,y) ligge hvor som helst på sirkelen (a−x)²+(b−y)²=r² i parameterrommet. La hvert kantpunkt stemme på disse mulighetene. Mange slike sirkler gjennom samme parametercelle gir et sannsynlig sentrum. Når radius også er ukjent, trenger vi én sentrumsakkumulator per aktuell radius.</p><p>For r=2 er (4,3), (2,5) og (0,3) alle to enheter fra (2,3). Denne cellen får minst tre stemmer. Støy eller en grov inndeling kan gi en bred topp. Kontroller mot de faktiske kantpunktene før sirkelen godtas.</p>
        <details class="sjekk"><summary>Grunnøving · Hvor mange parametere trenger en sirkel med ukjent radius?</summary><p>Beskriv sentrum og størrelse separat.</p><details><summary>Se svar</summary><p>To sentrumskoordinater og én radius. Kjent radius fjerner én akkumulatorakse.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Hvordan kan kjent gradientretning ved (4,3) spare stemmer når kanten har vannrett normal?</p><details><summary>Hint</summary><p>Radien står normalt på sirkeltangenten.</p></details><details><summary>Se svar</summary><p>Med r=2 er sentrum enten (2,3) eller (6,3). Retningsinformasjon reduserer en hel ring av stemmer til to kandidater. Med kjent kontrastpolaritet kan én retning være tilstrekkelig.</p></details></div>`,
      ),
      section(
        "terskel",
        "Velg terskel med histogrammet",
        "L6-T6-a_Segmentation, PDF s. 75–87. DIP4e, kap. 10.3–10.4, fra s. 742.",
        `
        <p>En global terskel t kan gi forgrunn der intensiteten er større enn t. Otsus metode prøver ulike skiller og maksimerer variansen mellom gruppene, w₀w₁(μ₀ − μ₁)². Vektene w er andelene i gruppene, og μ er gruppegjennomsnittene. Utelat skiller som gir en tom gruppe.</p>
        <p>Med prøver [0, 1, 5, 6] gir t = 1 to like store grupper og middelverdier 0,5 og 5,5. Målet blir ½·½·5² = 6,25. For t = 0 blir det ¼·¾·4² = 3. Skillet etter nivå 1 skiller de mørke og lyse bedre. Hvis belysningen varierer mye, kan lokale terskler fungere bedre. «Split and merge» deler uensartede regioner og slår sammen tilgrensende regioner som oppfyller samme homogenitetskrav.</p>
          <p>Otsus kriterium belønner både avstand mellom gråtonemidlene og at begge grupper inneholder piksler. Beregn vekter som andeler av hele bildet. Tomme klasser må hoppes over fordi klassemiddelet er udefinert.</p>
          <details class="sjekk"><summary>Grunnøving · Hva skjer når en piksel er lik terskelen?</summary><p>Les ulikhetstegnet i oppgaven.</p><details><summary>Se svar</summary><p>Ved forgrunn r > t blir likhet bakgrunn. Ved r ≥ t blir den forgrunn. Oppgi regelen før telling.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>For [0,0,2,3] sammenligner du bakgrunn ≤ 0 med bakgrunn ≤ 2. Hvilken terskel gir størst mellomklassevarians?</p>
          <details><summary>Hint</summary><p>Beregn w₀w₁(μ₀−μ₁)² for hvert skille.</p></details>
          <details><summary>Se svar</summary><p>Ved 0 er vektene ½ og ½ og midlene 0 og 2,5. Kriteriet blir 1,5625. Ved 2 er vektene ¾ og ¼, midlene ⅔ og 3. Da får vi 49/48 ≈ 1,02. Velg første skille. Terskel 1 gir samme partisjon som 0.</p></details></div>`,
      ),
      section(
        "del-og-sla-sammen",
        "Del og slå sammen regioner",
        "L6-T6-a_Segmentation, PDF s. 88–95 · lecture_plan_IP.txt, DIP4e § 10.4",
        `<p>Velg et homogenitetskriterium før du deler bildet. Hvis en blokk oppfyller kriteriet, stopper oppdelingen der. Ellers deles den i fire delblokker. I en sammenslåingsrunde tester du nabolagets forente pikselmengde. Test hele unionen, siden to områder hver for seg kan være homogene selv om de er ulike.</p><p>Et 4 × 4-bilde har konstante 2 × 2-kvadranter med verdier 2, 3, 9 og 9 i leserekkefølge. La maks minus min være høyst 1. Hele bildet har spenn 7, så del én gang. Hver kvadrant består testen. De to øvre kan forenes med spenn 1 og de to nedre med spenn 0. De to resulterende regionene kan ikke forenes.</p>
        <details class="sjekk"><summary>Grunnøving · Hvor mange barn får en kvadratisk blokk ved én firedeling?</summary><p>Halver begge sidelengder.</p><details><summary>Se svar</summary><p>To halvdeler i hver retning gir fire barn, hvert med en firedel av pikslene.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Hvis kvadrantene i stedet er 2, 3, 3 og 4, kan alle fire slås sammen bare fordi nabopar passer?</p><details><summary>Hint</summary><p>Finn største og minste verdi etter en hypotetisk sammenslåing.</p></details><details><summary>Se svar</summary><p>Nei. Unionen har spenn 4−2=2. Etter å ha slått sammen en 2-region og en 3-region vil tillegging av 4 bryte kriteriet. Rekkefølge og tilknytningsregel kan påvirke sluttpartisjonen.</p></details></div>`,
      ),
      section(
        "regionvekst",
        "Hold orden på fronten",
        "L6-T6-a_Segmentation, PDF s. 94–104. DIP4e, kap. 10.4, fra s. 764.",
        `
        <p><dfn>Regionvekst</dfn> starter i et frø. Hvert steg tar ut ett punkt fra fronten og legger inn ubesøkte naboer som tilfredsstiller intensitetskriteriet. Sett status til −1 ved innlegging og 1 ved behandling, så en piksel høyst legges inn én gang. En <dfn>stakk</dfn> tar sist innlagte først, mens en kø tar eldst innlagte først.</p>
        <p>Bruk rad og kolonne fra 1, fire naboer og et 2 × 2-bilde med rader [7, 7] og [7, 0]. Start i (1,1), godta verdi 7, og sjekk opp, høyre, ned, venstre. Første uttak godkjenner (1,2), deretter (2,1). Skriver vi stakktoppen til venstre, er fronten [(2,1), (1,2)]. Andre uttak behandler (2,1). Pikselen (2,2) er 0 og avvises. Fronten har nå kun (1,2). Behandle den, og regionen består av de tre syverne.</p>
          <aside lang="en" class="worked-example"><h3>Specify connectivity before growing a region</h3><p>A 2 × 2 image has intensity 8 at the top-left and bottom-right and 0 elsewhere. Seed the top-left pixel and accept only pixels of intensity 8. Growth requires both an admissible intensity and a path of accepted neighbours.</p>
          <div class="calculation">4-connected area = 1 pixel; 8-connected area = 2 pixels.</div><p>Why does the intensity test alone give the wrong four-connected result?</p><details><summary>Check your reasoning</summary><p>Thresholding selects both bright pixels anywhere in the image. With four-connectivity the only first steps reach dark pixels, so there is no accepted path to the diagonal pixel.</p></details></aside>
          <p>Et kriterium mot fast frøverdi begrenser hele regionens intensitetsområde. Et kriterium mot siste besøkte piksel kan vandre langs en svak gradient og ende langt fra frøet. Definer referansen før du velger naboer.</p>
          <details class="sjekk"><summary>Grunnøving · Hvorfor merke besøkte piksler når de legges i køen?</summary><p>Flere naboer kan oppdage samme punkt.</p><details><summary>Se svar</summary><p>Markeringen hindrer at ett punkt behandles flere ganger uten å endre regionen.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Start ved 10 på raden [10,12,14,16]. Tillat absolutt forskjell ≤ 2. Hvor stopper veksten med de to kriteriene?</p>
          <details><summary>Hint</summary><p>Sammenlign 14 først med 10 og deretter med 12.</p></details>
          <details><summary>Se svar</summary><p>Med fast frø godtas bare 10 og 12. Med gjeldende nabopiksel godtas også 14 fra 12 og 16 fra 14. Samme terskel gir dermed forskjellige masker.</p></details></div>`,
      ),
    ],
    question:
      "Etter tynning er radene [9, 0, 0], [0, 5, 0], [0, 0, 5]. Bruk lav terskel 4 og høy terskel 8. Tegn sluttmasken ved fire og åtte naboer.",
    hint: "De to svake responsene danner en diagonal kjede fra den sterke.",
    answer:
      "Med fire naboer kan ingen av femmerne nå 9. Bare øvre venstre piksel beholdes. Ved åtte naboer når midten 9 direkte, og nederste høyre når 9 via midten. Alle tre diagonalpikslene beholdes.",
  });

  chapters.push({
    slug: "morfologi",
    title: "Morfologi og form",
    intro:
      "Morfologiske operasjoner undersøker om en liten form passer inn i eller treffer et objekt. Formen du velger bestemmer hvilke detaljer som blir bevart.",
    focus: [
      "Tegn erosjon, dilasjon, åpning og lukking med oppgitt origo.",
      "Trekk ut en rand og rekonstruer en komponent trinn for trinn.",
      "Beregn lokale minimum og maksimum for gråtonebilder.",
    ],
    terms: {
      strukturelement:
        "Mengde forskyvninger, med et valgt origo, som bestemmer hvilke naboposisjoner en morfologisk operasjon undersøker.",
      erosjon:
        "I et binærbilde beholdes en posisjon hvis hele det forskjøvne strukturelementet ligger i forgrunnen.",
      dilasjon:
        "Unionen av kopier av strukturelementet plassert ved hver forgrunnspiksel.",
      rekonstruksjon:
        "Gjentatt vekst fra en markør begrenset av en maske, frem til resultatet slutter å endre seg.",
    },
    sections: [
      section(
        "erosjon-dilasjon",
        "Passform, treff og rekkefølge",
        "L7-T7-a_Morphology-compressed, PDF s. 6–22. DIP4e, kap. 9.1–9.3, s. 636–648.",
        `
        <p>La A være posisjonene med verdi 1. Et <dfn>strukturelement</dfn> B er en liten mengde forskyvninger fra origo. Ved <dfn>erosjon</dfn> blir x med når alle x + b er i A. Ved <dfn>dilasjon</dfn> legger hver a i A til alle a + b. En tilsvarende trefftest ved x bruker det reflekterte B. Forskjellen i orientering er synlig for asymmetriske elementer.</p>
        <p>Bruk A = {2, 3, 4, 7} på en rad og B = {−1, 0, 1}. Bakgrunnen er 0 overalt ellers. Bare 3 har tre forgrunnspiksler rundt seg. Erosjonen er {3}. Dilasjonen er {1, 2, 3, 4, 5, 6, 7, 8}. Som kontroll på origo gir A = {2} og asymmetrisk B = {0, 1} dilasjonen {2, 3}.</p>
        <p>Åpning er erosjon fulgt av dilasjon med samme B. På den første raden får du {3} og deretter {2, 3, 4}. Den isolerte syveren forsvinner. Lukking er dilasjon fulgt av erosjon. Her får du {2, 3, 4, 5, 6, 7}. Mellomrommet er fylt.</p>
          <div data-demo="morfologi"></div><p>Åpning er erosjon fulgt av dilasjon med samme element. Bare strukturer der elementet faktisk får plass, kan vokse tilbake. Lukking snur rekkefølgen og kan bygge bro over små mellomrom. Betrakt hele tallinjen som bakgrunn utenfor mengden.</p>
          <details class="sjekk"><summary>Grunnøving · Hvilken operasjon krever plass til hele elementet?</summary><p>Se for deg en mal som må passe helt inni objektet.</p><details><summary>Se svar</summary><p>Erosjon beholder alle ankerposisjoner der hele elementet treffer forgrunn. Dilasjon utvider objektet med elementets forskyvninger.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>A = {1,2,3,6} og B = {−1,0,1}. Finn åpningen og lukkingen.</p>
          <details><summary>Hint</summary><p>Beregn mellomresultatene som mengder. B er symmetrisk.</p></details>
          <details><summary>Se svar</summary><p>Erosjon gir {2}, som dilateres til {1,2,3}. For lukking blir dilasjonen først alle posisjoner 0 til 7. Eroder intervallet og få {1,2,3,4,5,6}. Åpningen fjernet punktet, lukkingen fylte gapet.</p></details></div>`,
      ),
      section(
        "rand",
        "Indre og ytre rand",
        "L7-T7-a_Morphology-compressed, PDF s. 24–26. DIP4e, kap. 9.5, fra s. 652.",
        `
        <p>Den indre randen er A ∖ (A ⊖ B). Den ytre er (A ⊕ B) ∖ A. For en full 3 × 3-blokk midt i et større nullbilde og et fullt 3 × 3-element med sentrert origo, etterlater erosjonen bare midtpikselen. Indre rand har 9 − 1 = 8 piksler. Dilasjonen er en 5 × 5-blokk. Ytre rand har 25 − 9 = 16 piksler.</p>
          <aside lang="en" class="worked-example"><h3>Extract an inner boundary</h3><p>Take a filled 5 × 5 square with background outside and a centred 3 × 3 square structuring element. Erosion keeps positions where the entire element fits. Exactly the middle 3 × 3 block survives.</p>
          <div class="calculation">Inner boundary = A ∖ (A ⊖ B). Area = 25 − 9 = 16 pixels.</div><p>How many pixels form the outer boundary with room around the square?</p><details><summary>Check your reasoning</summary><p>Dilation grows the square to 7 × 7. Removing the original square leaves 49 − 25 = 24 pixels outside.</p></details></aside>
          <p>Operasjonen A minus erosjonen spør hvilke forgrunnspunkter som ikke har full støtte i sitt nabolag. Et annet strukturelement gir en annen betydning av å være på kanten. Hull har derfor også indre rand.</p>
          <details class="sjekk"><summary>Grunnøving · Gir A minus erosjonen indre eller ytre rand?</summary><p>Alle punkter i forskjellen kommer fra A.</p><details><summary>Se svar</summary><p>Indre rand. Punktene tilhørte objektet, men ble fjernet ved erosjon.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>A er en 5 × 5-rute med midtpikselen fjernet. Bruk fullt 3 × 3-element og nullbakgrunn. Hvor mange av de 24 forgrunnspikslene overlever erosjonen?</p>
          <details><summary>Hint</summary><p>De eneste mulige sentrene uten påvirkning fra ytterkanten er den indre 3 × 3-ruten.</p></details>
          <details><summary>Se svar</summary><p>Hvert av de ni mulige vinduene inneholder det manglende sentrumet. Ingen passer. Indre rand utgjør dermed alle 24 forgrunnspiksler.</p></details></div>`,
      ),
      section(
        "rekonstruksjon",
        "Gjenskap en sammenhengende komponent",
        "L7-T7-a_Morphology-compressed, PDF s. 26–27. DIP4e, kap. 9.5–9.6, s. 652–673.",
        `
        <p>Ved binær <dfn>rekonstruksjon</dfn> er A en maske som begrenser veksten. Start med et frø X₀ i objektet. Beregn Xₖ = (Xₖ₋₁ ⊕ B) ∩ A til to påfølgende mengder er like. Med et korsformet B med sentrum velges fire-naboforbindelse. Et fullt 3 × 3-element velger åtte naboer.</p>
        <p>På en rad med A = {1, 2, 3, 5} og frø {1} gir dilasjon med B = {−1,0,1} først {0,1,2}. Snitt med A gir {1,2}. Neste iterasjon gir {1,2,3}. Tredje iterasjon gir samme resultat. Punkt 5 er adskilt av hullet ved 4.</p>
          <p>Masken begrenser hvert eneste vekststeg. Å bare klippe mot masken etter siste dilasjon kan slippe veksten over en bakgrunnsbarriere. En stabil mengde er et naturlig stoppkriterium fordi neste steg da har samme inngang.</p>
          <details class="sjekk"><summary>Grunnøving · Hvorfor ta snitt med masken?</summary><p>Spør hvilke posisjoner markøren kan vokse til.</p><details><summary>Se svar</summary><p>Snittet fjerner alle kandidater utenfor det tillatte området ved hvert steg.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>På en rad er masken {1,2,3,5,6}, markøren {2}, og B = {−1,0,1}. Finn rekonstruksjonen. Hva endres om også 6 er markør?</p>
          <details><summary>Hint</summary><p>Et intervall med en bakgrunnspiksel mellom kan ikke krysses.</p></details>
          <details><summary>Se svar</summary><p>Fra {2} gir første steg {1,2,3}, og neste steg er uendret. Med markør {2,6} kommer også {5,6} med allerede i første steg. Resultatet er da hele masken.</p></details></div>`,
      ),
      section(
        "hull",
        "Fyll et hull ved begrenset vekst",
        "L7-T7-a_Morphology-compressed, PDF s. 24–31 · DIP4e § 9.5–9.6",
        `<p>Et hull består av bakgrunn som er avskåret fra utsiden med den valgte nabodefinisjonen. Sett en markør i hullet og rekonstruer i komplementet til objektet. Dilater ett nabosteg, ta snitt med bakgrunnen og gjenta til markøren slutter å vokse. Unionen av objekt og ferdig markør er det fylte objektet.</p><p>I en lukket 5 × 5-ramme er de ni indre pikslene bakgrunn. Med frø i midten og fire naboer gir første steg fem piksler, neste steg ni og tredje steg fortsatt ni. Å markere utsidebakgrunnen fra bildekanten i stedet finner alle hull samtidig: bakgrunn som aldri nås, skal fylles.</p>
        <details class="sjekk"><summary>Grunnøving · Hvor skal markøren plasseres for å fylle ett bestemt hull?</summary><p>Finn bakgrunnen som er omsluttet av objektet.</p><details><summary>Se svar</summary><p>Start i hullet. En markør i utsidebakgrunnen vil rekonstruere utsiden i stedet.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et hjørne i rammen fjernes. Vil vekst fra midten nå utsiden med fire eller åtte naboer? Anta bakgrunn rundt rammen.</p><details><summary>Hint</summary><p>Undersøk om ruten (1,1) kan gå til det manglende hjørnet (0,0).</p></details><details><summary>Se svar</summary><p>Fire naboer når ikke hjørnet fordi de to mellomliggende kantpikslene er forgrunn. Med åtte naboer finnes et diagonalt steg, og veksten lekker ut. Et hull må derfor defineres med en bestemt konnektivitet.</p></details></div>`,
      ),
      section(
        "komponenter",
        "Merk objektene med to gjennomløp",
        "L7-T7-a_Morphology-compressed, PDF s. 143–165",
        `<p>En komponentetikett identifiserer alle pikslene som kan nå hverandre i forgrunnen. Skann radvis fra venstre med fire naboretninger. Bare over og venstre er allerede behandlet. Gi ny etikett hvis ingen av dem har etikett. Kopier en eksisterende etikett hvis mulig. Har naboene ulike etiketter, registrer at etikettene er ekvivalente. Et andre pass erstatter alle provisoriske etiketter med representanten for gruppen.</p><p>Med rader [1,0,1] og [1,1,1] får øverste rad [A,0,B]. Andre rad starter med A og A. Siste piksel grenser til A fra venstre og B ovenfra. Når gruppene slås sammen til A, får også tidligere B øverst til høyre riktig sluttetikett. Dette virker selv når en forbindelse oppdages lenge etter første piksel i gruppen.</p>
        <details class="sjekk"><summary>Grunnøving · Hva betyr to ulike provisoriske etiketter?</summary><p>Kan en forbindelse ligge lenger ned i bildet?</p><details><summary>Se svar</summary><p>Etikettene er ulike lokalt under skanningen. En senere bro kan gjøre dem ekvivalente.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Hvor mange komponenter får radene [1,0] og [0,1] med fire og åtte naboer? Hvilke allerede besøkte piksler må skanneren undersøke ved åttenabotesten?</p><details><summary>Hint</summary><p>Husk de to diagonalene i forrige rad under første gjennomløp.</p></details><details><summary>Se svar</summary><p>Fire naboer gir to komponenter. Åtte gir én. Skanneren trenger venstre i samme rad og øvre venstre, rett over og øvre høyre i forrige rad. Andre gjennomløp kan deretter slå opp etiketten uavhengig av naboskapet.</p></details></div>`,
      ),
      section(
        "formtreff",
        "Gjenkjenn en form og finn dens skjelett",
        "L7-T7-a_Morphology-compressed, PDF s. 38–68 og 174–175. DIP4e, kap. 9.4–9.5.",
        `
        <p>Hit-or-miss søker etter en bestemt kombinasjon av forgrunn og bakgrunn. Krev at ett element passer i forgrunnen og et annet i bakgrunnen ved samme origo. En tredelt radmal [0, 1, *] krever bakgrunn til venstre og forgrunn i midten. Stjernen tillater begge verdier til høyre. Malen gir treff midt i [0, 1, 1].</p>
        <p>Et morfologisk skjelett representerer objektet ved sentrene til maksimale innskrevne elementer. For en disk er den største innskrevne disken hele objektet, så skjelettet er sentrum. Flere nødvendige sentre kan danne grener i mer sammensatte former. I den diskrete algoritmen bestemmer strukturelementet hvilke former som får plass ved gjentatt erosjon.</p>
          <p>Hit-or-miss tester to krav samtidig ved samme posisjon. Forgrunnsmalen må være en del av objektet og bakgrunnsmalen en del av komplementet. Uspesifiserte naboposisjoner kan ha begge verdier.</p>
          <details class="sjekk"><summary>Grunnøving · Hva betyr en uspesifisert posisjon i en mal?</summary><p>Skill mellom krav om null og fravær av krav.</p><details><summary>Se svar</summary><p>Den kan være både null og én. Å erstatte alle slike posisjoner med bakgrunnskrav kan fjerne gyldige treff.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Finn posisjonene med mønsteret [0,1,1] på raden [0,1,1,1,0,1,1]. Bruk midtre posisjon som anker, 0-basert indeks og bare fullstendige vinduer.</p>
          <details><summary>Hint</summary><p>Krev 0 til venstre, 1 i sentrum og 1 til høyre.</p></details>
          <details><summary>Se svar</summary><p>Sentrene 1 og 5 passer. Sentrum 2 har riktig forgrunn, men venstre nabo er 1 og oppfyller ikke bakgrunnskravet. En ren erosjon med to ettall ville derfor gitt ekstra treff.</p></details></div>`,
      ),
      section(
        "skjelett",
        "Bygg skjelettet lagvis og rekonstruer formen",
        "L7-T7-a_Morphology-compressed, PDF s. 64–67 og 175 · DIP4e § 9.5",
        `<p>La E₀ være objektet, og la Eₖ være objektet etter k erosjoner med B. Et punkt i Eₖ representerer en plass der en kopi av B dilatert opp til dette nivået fikk plass. Noen slike punkter dekkes allerede av større kopier på neste nivå. Fjern dem ved å trekke åpningen av Eₖ fra Eₖ. Resten er skjelettlaget Sₖ. Behold nivånummeret: det forteller hvor mange dilasjoner som kreves for å bygge tilbake objektet.</p><p>På tallinjen, bruk A={1,2,3,4,5}, B={−1,0,1} og nullbakgrunn. E₁={2,3,4}, E₂={3}, E₃ er tom. Åpningen av E₀ gir hele E₀ tilbake, og åpningen av E₁ gir E₁ tilbake. De to første skjelettlagene er tomme. Åpningen av E₂ er tom, så S₂={3}. To dilasjoner av {3} gir først {2,3,4} og deretter A. For mer sammensatte former tar du unionen av de rekonstruerte lagene. Tynning bruker i stedet mønstre for å fjerne randpunkter trinnvis med hensyn til sammenheng.</p>
        <details class="sjekk"><summary>Grunnøving · Hvorfor lagre nivåtallet til et skjelettpunkt?</summary><p>To ulike intervaller kan ha samme sentrum.</p><details><summary>Se svar</summary><p>Nivået bestemmer hvor mange dilasjoner punktet skal gjennom. Uten det kan lengden på intervallet ikke rekonstrueres.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Gjenta for A={1,2,3,7}, med samme B. Hvilke lag må lagres?</p><details><summary>Hint</summary><p>Punktet 7 kan ikke inngå i en kopi av B. Undersøk derfor allerede S₀.</p></details><details><summary>Se svar</summary><p>E₁={2}, E₂ er tom. Åpning av E₀ gir {1,2,3}, så S₀={7}. S₁={2}. Rekonstruksjonen er {7} forent med dilasjonen av {2}, altså {1,2,3,7}.</p></details></div>`,
      ),
      section(
        "vannskille",
        "Segmenter ved vannskille",
        "L7-T7-a_Morphology-compressed, PDF s. 69–72",
        `<p>Tolk bildet som høyde. Når du oversvømmer fra lokale minima, vokser bassenger til de møter hverandre. Møtene skiller regionene. Bruk gjerne gradientmagnitude som terreng: homogene områder er lave, tydelige kanter danner høye barrierer. Små tilfeldige minima kan gi mange kunstige regioner. Med markørstyring velger du på forhånd hvilke bassenger som får starte.</p><p>På profilen [0,1,4,1,0] gir endene to minima. Ved høyde 1 tilhører de to lave nabopunktene hvert sitt basseng. Ved høyde 4 møtes vekstfrontene ved sentrum, slik at toppen markerer skillet.</p>
        <details class="sjekk"><summary>Grunnøving · Hvor begynner vannet å samle seg?</summary><p>Tenk på intensitet eller gradient som terrenghøyde.</p><details><summary>Se svar</summary><p>I lokale minima, eller ved valgte markører i en markørstyrt variant.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Hvorfor kan utjevning før gradientberegning endre antall regioner?</p><details><summary>Hint</summary><p>Tenk på virkningen av én liten grop inne i et ellers jevnt område.</p></details><details><summary>Se svar</summary><p>Glatting kan fjerne grunne lokale minima som ellers ville startet egne bassenger. For kraftig glatting kan også senke en ekte barriere og få ulike objekter til å flyte sammen.</p></details></div>`,
      ),
      section(
        "graatone",
        "Flytt minimum og maksimum",
        "L7-T7-a_Morphology-compressed, PDF s. 28–37 og 176–193. DIP4e, kap. 9.8, fra s. 674.",
        `
        <p>For et flatt element med høyde null bruker gråtoneerosjon minimum av f(x + b), og gråtonedilasjon maksimum av f(x − b). Et sentrert symmetrisk vindu bruker samme naboer i begge operasjoner. For nabolaget [4, 12, 5] blir erosjonen 4 og dilasjonen 12 ved sentrum.</p>
        <p>For å beregne åpning eller lukking må første trinn gi nok naboverdier til neste trinn. Med raden [4, 4, 12, 4, 4] gir trepunkts erosjon [4, 4, 4] ved de tre indre plassene. Dilasjon av disse gir åpningsverdi 4 ved midten. Den hvite topphatten f − åpning blir 12 − 4 = 8 og markerer den smale lyse toppen.</p>
          <p>Et ikke-flatt strukturelement legger en høyde til hver kandidat ved dilasjon og trekker den fra ved erosjon. Refleksjon av støtten bestemmer hvilken naboverdi som pares med høyden. Den kan ikke ignoreres for et asymmetrisk element.</p>
          <details class="sjekk"><summary>Grunnøving · Hva gir flat erosjon på [2,7,4]?</summary><p>La det symmetriske elementet dekke alle tre verdiene.</p><details><summary>Se svar</summary><p>Minimum er 2. Flat dilasjon ville gitt maksimum 7 med samme vindu.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Ved indeks i har du f(i−1)=2, f(i)=5 og f(i+1)=8. Elementet har b(0)=0 og b(1)=2. Finn dilasjon og erosjon.</p>
          <details><summary>Hint</summary><p>Dilasjon bruker f(i−u)+b(u), erosjon bruker f(i+u)−b(u).</p></details>
          <details><summary>Se svar</summary><p>Dilasjon er max(5+0,2+2) = 5. Erosjon er min(5−0,8−2) = 5. Å bruke høyre nabo til dilasjonen ville feilaktig gitt 10.</p></details></div>`,
      ),
    ],
    question:
      "Forgrunnsposisjonene på en rad er {2, 3, 5, 6}. Bruk B = {0, 1} med origo 0 og bakgrunn overalt ellers. Finn erosjon og ytre rand.",
    hint: "Ved erosjon må både x og x + 1 være med i A. Ved dilasjon legger hvert forgrunnspunkt til seg selv og høyre nabo.",
    answer:
      "Bare 2 og 5 starter et par med to forgrunnspunkter. Erosjonen er {2, 5}. Dilasjonen blir {2, 3, 4, 5, 6, 7}. Trekk fra A for å få ytre rand {4, 7}.",
  });

  chapters.push({
    slug: "nevrale-nett",
    title: "Fullt tilkoblede nettverk",
    intro:
      "Et nevralt nett lærer en sammenheng mellom inndata og riktig utdata. Hvert lag beregner en vektet sum, legger til en bias og bruker en aktiveringsfunksjon.",
    focus: [
      "Regn et fremoverpass med vekter, bias, aktivering og tap.",
      "Bruk kjerneregelen til å beregne gradienter i utgangslag og skjulte lag.",
      "Oppdater vekter og bias fra en mini-batch.",
    ],
    terms: {
      bias: "Et trenbart konstantledd som legges til den vektede summen i et nevron.",
      aktiveringsfunksjon:
        "Funksjon som oversetter nevronets vektede sum til en aktivering. Ikke-linearitet gjør at flere lag kan beskrive mer kompliserte funksjoner.",
      tilbakepropagering:
        "Beregning av gradienter fra tapet bakover gjennom lagene ved hjelp av kjerneregelen.",
      kryssentropi:
        "Tap som straffer lav predikert sannsynlighet for riktig klasse.",
    },
    sections: [
      section(
        "trening",
        "Fra merkede eksempler til generalisering",
        "L03a_DL-Intro, PDF s. 52–66 og 88–90 · lecture_plan_IP.txt, FCNN",
        `<p>Ved veiledet læring består et eksempel av en inngang og en kjent målverdi. Fremoverpasset gir en prediksjon, tapsfunksjonen måler avviket og bakoverpasset beregner hvordan vektene påvirker tapet. Gradientsteget endrer vektene med mål om lavere tap på treningsdata. Nye bilder går bare gjennom fremoverpasset.</p><p>Bruk valideringsdata for modellvalg og et separat testsett til sluttkontroll. Nesten identiske bilder av samme objekt i trening og validering kan gi et misvisende inntrykk av generalisering. Del da etter objekt før du lager treningsvarianter. En terskel eller normalisering tilpasset på hele datasettet kan også lekke informasjon.</p><p>Ved epoke 4 er trenings-/valideringstap 0,4/0,5. Ved epoke 8 er de 0,2/0,7. Vektene tilpasser treningssettet bedre, men valideringstapet øker. Med valideringstap som kriterium velger du epoke 4 av disse to.</p>
        <details class="sjekk"><summary>Grunnøving · Hvilket datasett brukes til modellvalg?</summary><p>Hold endelig evaluering separat fra valg underveis.</p><details><summary>Se svar</summary><p>Valideringssettet brukes til blant annet valg av epoke. Testsettet holdes til endelig evaluering.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et treningssett har 90 bilder fra klasse A og 10 fra B. En modell svarer alltid A. Hva skjuler samlet treffsikkerhet?</p><details><summary>Hint</summary><p>Tell riktige separat per klasse.</p></details><details><summary>Se svar</summary><p>90 av 100 er riktige. Treffandel for A er 100 %, for B 0 %. Samlet treffsikkerhet alene viser dermed ikke om modellen gjenkjenner B. Kontroller ytelse per klasse på holdte data.</p></details></div>`,
      ),
      section(
        "forover",
        "Fra inndata til tap",
        "L03a_DL-Intro, PDF s. 45–60. L03b_FCNNs-FBPass, PDF s. 5–18 og 60–80. DLFund_Examples_1-Pre-FCNNs, PDF s. 2 og 2-Post-FCNNs, PDF s. 2–3.",
        `
        <p>Bruk kolonnevektorer og én vektrad per utgang. Et lag med m innganger og n utganger har W med form n × m, og en <dfn>bias</dfn> per utgang. Beregn <math><mi mathvariant="bold">z</mi><mo>=</mo><mi mathvariant="bold">W</mi><mi mathvariant="bold">x</mi><mo>+</mo><mi mathvariant="bold">b</mi></math>, så a = g(z). Valget av <dfn>aktiveringsfunksjon</dfn> avhenger av oppgaven. ReLU gir maks(0, z), og sigmoid <math><mi>σ</mi><mo>(</mo><mi>z</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><mi>z</mi></mrow></msup></mrow></mfrac></math> gir et tall mellom 0 og 1.</p>
        <p>La x = [2, 1]ᵀ, W = [1, −3], b = 1 og riktig binær klasse y = 1. Da er z = 1·2 − 3·1 + 1 = 0 og a = σ(0) = 0,5. Med binær <dfn>kryssentropi</dfn> L = −y ln(a) − (1 − y) ln(1 − a) får vi L = −ln(0,5) ≈ 0,693. Modellen fordeler sannsynligheten likt på de to klassene.</p>
        <p>I regresjon med lineær utgang kan L = ½(a − y)² brukes. For a = 3 og y = 5 blir tapet 2. Tapets derivert med hensyn på a er −2, så en liten økning i a reduserer tapet.</p>
          <p>Tenk på hver rad i vektmatrisen som én detektor: skalarproduktet veier inn trekkene, og bias flytter terskelen der nevronet slår inn. Uten ikke-lineær aktivering kunne to affine lag vært slått sammen til ett, siden produkt og sum av affine avbildninger igjen er affine.</p>
          <details class="sjekk"><summary>Grunnøving · Hvor mange biasverdier får et lag med tre utganger?</summary><p>Hver utgang beregner én vektet sum.</p><details><summary>Se svar</summary><p>Tre, én til hver sum uansett hvor mange innganger laget har.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Bruk x = (2,−1), vektrader (1,2) og (−1,1), og bias (1,1). Send resultatet gjennom ReLU og et siste lag med vekter (2,−3) og bias −1.</p>
          <details><summary>Hint</summary><p>Beregn to skalarprodukter og legg til hver sin bias før du klipper negative verdier.</p></details>
          <details><summary>Se svar</summary><p>Første lag gir 2−2+1 = 1 og −2−1+1 = −2. ReLU gir (1,0). Siste skår er 2·1 − 3·0 − 1 = 1. Denne råskåren er ingen sannsynlighet uten en passende utgangsfunksjon.</p></details></div>`,
      ),
      section(
        "bakover",
        "Følg kjerneregelen baklengs",
        "L03b_FCNNs-FBPass, PDF s. 20–50 og 88–99. DLFund_Examples_2-Post-FCNNs, PDF s. 4–8.",
        `
        <p>Ved <dfn>tilbakepropagering</dfn> betegner <math><mi>δ</mi><mo>=</mo><mfrac><mrow><mo>∂</mo><mi>L</mi></mrow><mrow><mo>∂</mo><mi>z</mi></mrow></mfrac></math> feilfølsomheten før aktiveringen. For binær kryssentropi og sigmoid forenkles produktet (∂L/∂a)(∂a/∂z) til a − y. I eksemplet blir δ = −0,5. For vekt wᵢ er ∂z/∂wᵢ = xᵢ og for bias er ∂z/∂b = 1. Dermed er ∂L/∂W = δxᵀ = [−1, −0,5] og ∂L/∂b = −0,5.</p>
        <p>I et skjult lag summeres bidragene fra alle veier til tapet. Med kolonnevektorer brukes δ<sub>skjult</sub> = (W<sub>neste</sub>ᵀδ<sub>neste</sub>) ⊙ g′(z<sub>skjult</sub>), der ⊙ ganger tilsvarende elementer. For et aktivt ReLU-nevron med utgående vekter 2 og −1 og feilsignaler 0,3 og 0,1 blir det (2·0,3 − 1·0,1)·1 = 0,5. En negativ ReLU-inngang ville gitt null gradient langs denne veien.</p>
        <p>Gradientnedstigning trekker gradienten ganger læringsraten η fra de gamle parameterne. Med η = 0,2 i sigmoid-eksemplet blir første nye vekt 1 − 0,2·(−1) = 1,2, andre vekt −3 − 0,2·(−0,5) = −2,9 og ny bias 1,1. Et nytt fremoverpass gir z = 1,2·2 − 2,9 + 1,1 = 0,6 og σ(z) ≈ 0,646. Tapet −ln(0,646) ≈ 0,437 har falt fra 0,693. Bruk de gamle vektene i hele bakoverpasset før oppdateringen.</p>
          <aside lang="en" class="worked-example"><h3>Follow a gradient through one neuron</h3><p>Let z = wx + b, a = ReLU(z) and L = ½(a − t)². For x = 2, w = 1, b = 0 and target t = 3, the forward pass gives z = a = 2. The active ReLU has derivative one.</p>
          <div class="calculation"><math><mfrac><mrow><mo>∂</mo><mi>L</mi></mrow><mrow><mo>∂</mo><mi>w</mi></mrow></mfrac></math> = (a − t) × 1 × x = (2 − 3) × 2 = −2</div><p>Update only w using gradient descent with learning rate 0.1. Does the loss fall?</p><details><summary>Check your reasoning</summary><p>w becomes 1 − 0.1 × (−2) = 1.2. The output is now 2.4. The loss falls from 0.5 to ½ × 0.6² = 0.18.</p></details></aside>
          <p>Når en skjult aktivering bidrar til flere etterfølgende nevroner, må alle gradientbidragene summeres. Dette følger av kjerneregelen med flere stier fra aktiveringen til samme tap. Bruk vektene fra fremoverpasset til alle gradienter før du oppdaterer.</p>
          <details class="sjekk"><summary>Grunnøving · Hvilken retning skal vekten flyttes når gradienten er positiv?</summary><p>Skriv oppdateringen w ← w − ηg med η > 0.</p><details><summary>Se svar</summary><p>Vekten reduseres. For et tilstrekkelig lite steg reduserer det tapet lokalt med andre vekter holdt fast.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>En skjult ReLU har positivt preaktiveringssignal og sender a videre i z₁ = 2a og z₂ = −3a. Tapets deriverte med hensyn på disse er henholdsvis 4 og 1. Hva får vekten inn til ReLU når dens inngang er 2?</p>
          <details><summary>Hint</summary><p>Regn først ∂L/∂a. Deretter multipliserer du med den lokale ReLU-deriverte og inngangen.</p></details>
          <details><summary>Se svar</summary><p>Tilbake ved a summeres 2·4 + (−3)·1 = 5. ReLU slipper gjennom 5. Vektgradienten er 5·2 = 10 og biasgradienten 5. En inaktiv ReLU ville gitt null til begge.</p></details></div>`,
      ),
      section(
        "minibatch",
        "Lær fra flere eksempler",
        "L03a_DL-Intro, PDF s. 54–66. DLFund_Examples_1-Pre-FCNNs, PDF s. 4 og 2-Post-FCNNs, PDF s. 7–8.",
        `
        <p>For middelverdien av tap over B eksempler tar du middelverdien av de B gradientene. Hvis én vekt får gradientene 4, −1 og 3 i en mini-batch, er batchgradienten (4 − 1 + 3)/3 = 2. Med w = 1 og η = 0,1 får du w ny = 0,8. Ved et summert tap brukes summen i stedet. Valideringsdata måler hvor godt modellen generaliserer til eksempler den ikke trente på.</p>
          <p>En batchgradient er gradienten av det valgte batchtapet. For middel må hvert eksempel telle like mye. Å ta middel av to gruppevise middelverdier virker bare direkte når gruppene er like store.</p>
          <details class="sjekk"><summary>Grunnøving · Hva skjer når to eksempelgradienter er +2 og −2?</summary><p>Bruk lik vekting i middeltapet.</p><details><summary>Se svar</summary><p>Gradienten blir (2−2)/2=0. De to eksemplene trekker denne parameteren like sterkt i hver sin retning.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>To grupper med henholdsvis ett og tre eksempler har middelgradient 8 og 0 for én vekt. Finn gradient for samlet middeltap og oppdater w = 3 med læringsrate 0,1.</p>
          <details><summary>Hint</summary><p>Rekonstruer summen av gradienter før divisjon på fire.</p></details>
          <details><summary>Se svar</summary><p>Summen er 1·8 + 3·0 = 8. Middel er 8/4 = 2. Ny vekt blir 3 − 0,1·2 = 2,8. Uvektet gruppemiddel 4 ville gitt for stort steg.</p></details></div>`,
      ),
    ],
    question:
      "En enkelt sigmoid gir a = 0,8 for x = [1, 3]ᵀ og riktig klasse y = 0. Bruk binær kryssentropi. Finn δ, vektgradientene og endringen i bias ved η = 0,05.",
    hint: "For sigmoid med binær kryssentropi er δ = a − y. Gradientene til vektene får hver sin inngang som faktor.",
    answer:
      "δ = 0,8 − 0 = 0,8. Vektgradientene er [0,8·1, 0,8·3] = [0,8, 2,4]. Biasgradienten er 0,8. Biasen reduseres med 0,05·0,8 = 0,04, slik at logiten og sannsynligheten for klasse 1 trekkes ned for denne prøven.",
  });

  chapters.push({
    slug: "cnn",
    title: "Konvolusjonsnettverk",
    intro:
      "Et CNN bruker det samme lærte filteret flere steder i et bilde. Dermed kan ett filter oppdage et lokalt mønster uavhengig av hvor i bildet det ligger.",
    focus: [
      "Følg bildehøyde, bredde og kanaler gjennom konvolusjon og pooling.",
      "Tell trente parametere og multiplikasjoner separat.",
      "Regn en lokal respons og skriv samme operasjon som matriseprodukt.",
    ],
    terms: {
      trekkart:
        "Samlingen av romlige responser fra ett filter i et nettverkslag.",
      stride:
        "Avstanden i piksler mellom to påfølgende plasseringer av filtervinduet.",
      pooling:
        "Sammendrag av et lokalt område, for eksempel største verdi i hvert 2 × 2-vindu.",
      logit: "Et rått klasseskår før omregning til sannsynlighet.",
    },
    sections: [
      section(
        "form",
        "Beregn utgangens størrelse",
        "L03c_CNNs-FPass, PDF s. 20–35, 54–79 og 131–139.",
        `
        <p>Et filter ser et utsnitt av alle inngangskanalene og lager ett <dfn>trekkart</dfn>. Antall filtre blir derfor antall utgangskanaler. Med filterbredde K, symmetrisk padding P på hver side, <dfn>stride</dfn> S og dilatasjon 1 får du <math><msub><mi>W</mi><mi>ut</mi></msub><mo>=</mo><mo>⌊</mo><mfrac><mrow><msub><mi>W</mi><mi>inn</mi></msub><mo>+</mo><mn>2</mn><mi>P</mi><mo>−</mo><mi>K</mi></mrow><mrow><mi>S</mi></mrow></mfrac><mo>⌋</mo><mo>+</mo><mn>1</mn></math>. Bruk samme formel for høyden. Gulvfunksjonen teller bare plasseringer der hele vinduet passer etter padding.</p>
        <p>For et 9 × 9-bilde med 2 kanaler, tre 3 × 3-filtre, stride 2 og P = 1 er W ut = ⌊(9 + 2 − 3)/2⌋ + 1 = 5. Resultatet er 5 × 5 × 3. ReLU endrer ingen dimensjoner. En 2 × 2 maks-<dfn>pooling</dfn> med stride 2 og uten padding gir 2 × 2 × 3, altså tolv tall ved utflating. Resten ved høyre og nedre kant faller utenfor vinduene.</p>
          <p>Formelen for utgangsstørrelse teller gyldige startposisjoner for filteret. Med polstret bredde W + 2P er siste mulige start W + 2P − K. Fordi første start er null, kommer ett første vindu i tillegg til antall hele steg.</p>
          <details class="sjekk"><summary>Grunnøving · Hvor mange startposisjoner får bredde 5 med kjerne 3, stride 1 og ingen padding?</summary><p>Begynn i kolonne null.</p><details><summary>Se svar</summary><p>Start 0,1,2 passer. Start 3 ville trengt kolonne 5. Det gir bredde 3.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Inngangen er 7 × 8, kjernen 3 × 3, stride 2, ingen padding. List startposisjoner og dimensjoner. Hva skjer med siste kolonne?</p>
          <details><summary>Hint</summary><p>Bruk 0-baserte rader og kolonner. Et vindu må få plass i sin helhet.</p></details>
          <details><summary>Se svar</summary><p>Radstart er 0,2,4 og kolonnestart er 0,2,4. Resultatet er 3 × 3 per filter. Siste vindu dekker kolonne 4–6. Kolonne 7 ligger ubrukt fordi start 6 ville krevd kolonne 8.</p></details></div>`,
      ),
      section(
        "parametere",
        "Tell lagrede vekter og utført arbeid",
        "L03c_CNNs-FPass, PDF s. 65–81 og 133–142.",
        `
        <p>Hvert filter bruker K<sub>h</sub>·K<sub>w</sub>·C<sub>inn</sub> vekter og eventuelt én bias. Gang med C<sub>ut</sub> for antall parametere. I laget over blir det (3·3·2 + 1)·3 = 57. Samme 57 parametere brukes på alle posisjoner. Pooling med fast maks har ingen trenbare parametere.</p>
        <p>Antall multiplikasjoner for direkte beregning er derimot H<sub>ut</sub>·W<sub>ut</sub>·C<sub>ut</sub>·K<sub>h</sub>·K<sub>w</sub>·C<sub>inn</sub> = 5·5·3·18 = 1350. Her telles også operasjoner med padding, og en multiplikasjon og en addisjon teller separat. Hver utverdi summerer 18 produkter med 17 addisjoner, pluss én hvis bias legges til. Et fullt tilkoblet lag fra tolv utflatede tall til fire klasser ville hatt 12·4 + 4 = 52 parametere.</p>
          <aside lang="en" class="worked-example"><h3>Separate weights from multiply operations</h3><p>Apply four 3 × 3 filters to an 8 × 8 image with three channels, unit stride and no padding. Each filter spans all three input channels and has one bias. Six horizontal and six vertical placements fit.</p>
          <div class="calculation">Parameters = 4(3 × 3 × 3 + 1) = 112</div><p>How many weight multiplications does the forward pass use?</p><details><summary>Check your reasoning</summary><p>There are 6 × 6 × 4 output values. Each needs 27 weight multiplications, giving 3,888. Reusing the same filter at every location increases the work while keeping its parameter count fixed.</p></details></aside>
          <p>Vektdeling betyr at samme trekkdetektor brukes ved alle romlige posisjoner. Flere inngangskanaler gir flere vekter i hver detektor. Flere utgangskanaler gir flere detektorer. Et større bilde alene øker antall anvendelser av dem.</p>
          <details class="sjekk"><summary>Grunnøving · Hvor mange trekkart gir fire filtre?</summary><p>Hvert filter summerer over alle inngangskanaler.</p><details><summary>Se svar</summary><p>Fire trekkart. Antall inngangskanaler bestemmer dybden på hvert filter, ikke antall utgangskart.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et 1 × 1-lag går fra 8 til 3 kanaler på et bilde med 10 × 10 posisjoner. Kan det blande farger og kan det se nabopiksler? Beregn antall parametere og multiplikasjoner.</p>
          <details><summary>Hint</summary><p>Hver utgang er et skalarprodukt av alle kanalene i én piksel, pluss en bias.</p></details>
          <details><summary>Se svar</summary><p>Tre vektrader med åtte elementer og tre bias gir 27 parametere. Ved 100 posisjoner kreves 100·3·8 = 2400 multiplikasjoner. Laget kan blande kanaler, men har ingen romlig nabo i sitt eget synsfelt.</p></details></div>`,
      ),
      section(
        "respons",
        "Beregn respons, aktivering og klasseskår",
        "L03c_CNNs-FPass, PDF s. 36–61 og 145–154. DLFund_Examples_3-Pre-CNNs, PDF s. 5–7 og 4-Post-CNNs, PDF s. 9–13.",
        `
        <p>I det vanlige CNN-fremoverpasset ligger filteret i oppgitt retning. På raden [3, 1, 4, 2] med filter [2, −1], stride 1 og ingen padding samler vi vinduene [3,1], [1,4], [4,2] som rader i en matrise. Gang hver rad med [2,−1]ᵀ. Responsene blir [5, −2, 6] før bias. Den alternative matrisen har rader [2,−1,0,0], [0,2,−1,0], [0,0,2,−1]. Gang med bilderaden som kolonne, så får du samme tre resultater.</p>
        <p>Med null bias gir ReLU [5, 0, 6]. En avsluttende klassifikator beregner en <dfn>logit</dfn> per klasse. Softmax av logits [ln 3, ln 2] gir [3/5, 2/5]. Er riktig klasse den andre, blir kategorisk kryssentropi −ln(2/5) ≈ 0,916. Tapet går ned når modellen gir riktig klasse høyere sannsynlighet.</p>
          <p>Et filter har én vektflate per inngangskanal. Summer responsen fra alle flater og legg til én bias før aktivering. Hvis du klipper hver kanal med ReLU før summeringen, fjerner du negative bidrag som skulle kansellert positive.</p>
          <details class="sjekk"><summary>Grunnøving · Når legges bias til et CNN-resultat?</summary><p>Skill kanalbidraget fra samlet respons.</p><details><summary>Se svar</summary><p>Én bias per filter legges til den samlede summen ved hver romlig posisjon, før aktiveringen.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>To kanalvinduer er [1,2] og [3,1]. Vektene er [2,1] og [−2,1]. Bruk korrelasjon, bias 2 og ReLU. Finn én utgang.</p>
          <details><summary>Hint</summary><p>Skriv én sum per kanal. Hvor mange ganger skal bias legges til?</p></details>
          <details><summary>Se svar</summary><p>Første bidrag er 2·1+1·2 = 4. Andre er −2·3+1·1 = −5. Før aktivering er det 4−5+2 = 1, og etter ReLU fortsatt 1. Hver posisjon i dette trekkartet bruker samme vekter og bias.</p></details></div>`,
      ),
    ],
    question:
      "Et 8 × 8 RGB-bilde går gjennom fem 3 × 3-filtre med stride 1, uten padding og med én bias per filter. Finn utgangsform, antall parametere og antall multiplikasjoner i laget.",
    hint: "Hver enkelt utverdi ser 3 × 3 posisjoner i hver av tre kanaler.",
    answer:
      "Bredde og høyde blir (8 − 3)/1 + 1 = 6. Formen er 6 × 6 × 5. Det er (27 + 1)·5 = 140 parametere. De 180 utverdiene krever 27 multiplikasjoner hver, til sammen 4860.",
  });

  chapters.push({
    slug: "transformer",
    title: "Vision Transformer",
    intro:
      "En Vision Transformer deler bildet i små biter og lar hver bit hente informasjon fra andre biter. Slik kan modellen bruke sammenhengen mellom områder som ligger langt fra hverandre.",
    focus: [
      "Finn antall bildebiter og dimensjoner før og etter embedding.",
      "Sett opp Q, K og V og regn én rad med oppmerksomhetsvekter.",
      "Følg flere hoder og klassifikasjonstokenet frem til en sannsynlighet.",
    ],
    terms: {
      patch: "En bildebit som flates ut og projiseres til én tokenvektor.",
      token:
        "En vektor som representerer én enhet i sekvensen, for eksempel én bildebit eller klassifikasjonssymbolet.",
      selvoppmerksomhet:
        "En metode der hver token lager en vektet kombinasjon av verdi-vektorene fra samme sekvens.",
      softmax:
        "Normaliserer en liste av skårer ved å eksponensiere dem og dele hver eksponentialverdi på summen.",
    },
    sections: [
      section(
        "patcher",
        "Gjør bildet til en sekvens",
        "L03d_ViTs-FPass, PDF s. 50–59. DLFund_Examples_5-Pre-ViTs, PDF s. 8–10 og 6-Post-ViTs, PDF s. 14–17.",
        `
        <p>En <dfn>patch</dfn> på P × P piksler med C kanaler har P²C tall. Når begge bildedimensjoner er delelige med P, får vi (H/P)(W/P) ikke-overlappende biter. Bruk én rad per bit, og projiser hver rad med samme vektmatrise til en <dfn>token</dfn> med D trekk. Et lært klassifikasjonstoken kan settes foran bitene. Legg til en posisjonsvektor for hver rad så modellen kan skille plasseringene.</p>
        <p>Et 4 × 6 RGB-bilde med P = 2 gir 2·3 = 6 biter med 2·2·3 = 12 tall hver. En 12 × 8-projeksjon gir 6 × 8. Med ett klassifikasjonstoken blir X en 7 × 8-matrise. En posisjonsmatrise på 7 × 8 kan legges til elementvis.</p>
          <p>En flisprojeksjon lærer en representasjon av lokale piksler, men samme projeksjon brukes overalt. En posisjonsvektor gjør ellers identiske fliser ved ulike posisjoner forskjellige for enkoderen. Posisjonskoden adderes først når dimensjonen stemmer med tokenbredden.</p>
          <details class="sjekk"><summary>Grunnøving · Hvor mange tall har én 4 × 4 RGB-flis?</summary><p>Tell kanaler for hver romlig posisjon.</p><details><summary>Se svar</summary><p>4·4·3=48. Tokenbredden etter projeksjon kan være en annen.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Et 8 × 8 gråtonebilde deles i 2 × 2-fliser. Tokenbredde er 6. Hva er formene til flismatrisen, projeksjonen og posisjonskodene når ett klassetoken brukes?</p>
          <details><summary>Hint</summary><p>Tell romlige fliser og tall per flis separat. Klassetokenet kommer etter flisprojeksjonen.</p></details>
          <details><summary>Se svar</summary><p>4·4 = 16 fliser, hver med fire verdier. Flismatrise 16 × 4 ganger vekter 4 × 6 gir 16 × 6. Legg til én rad for klassetokenet før du adderer posisjonskoder på 17 × 6.</p></details></div>`,
      ),
      section(
        "oppmerksomhet",
        "Fra Q, K og V til én ny token",
        "L03d_ViTs-FPass, PDF s. 25–45. DLFund_Examples_5-Pre-ViTs, PDF s. 11–13 og 6-Post-ViTs, PDF s. 18–22.",
        `
        <p>I <dfn>selvoppmerksomhet</dfn> beregnes <math><mi mathvariant="bold">Q</mi><mo>=</mo><mi mathvariant="bold">X</mi><msub><mi>W</mi><mi>Q</mi></msub></math>, <math><mi mathvariant="bold">K</mi><mo>=</mo><mi mathvariant="bold">X</mi><msub><mi>W</mi><mi>K</mi></msub></math> og <math><mi mathvariant="bold">V</mi><mo>=</mo><mi mathvariant="bold">X</mi><msub><mi>W</mi><mi>V</mi></msub></math>. En query beskriver hva tokenen søker, en key hva hver token tilbyr og en value hvilket innhold som skal kombineres. Med N tokener får Q og K form N × d<sub>k</sub>. Produktenes tabell QKᵀ har form N × N. Verdiene V har form N × d<sub>v</sub>.</p>
        <p>Skaler hver skår med 1/√d<sub>k</sub> og bruk <dfn>softmax</dfn> langs hver rad. Multipliser så vekttabellen med V. Den samlede operasjonen er <math display="block"><mi>Z</mi><mo>=</mo><mi>softmax</mi><mo>(</mo><mfrac><mrow><mi>Q</mi><msup><mi>K</mi><mi>T</mi></msup></mrow><msqrt><msub><mi>d</mi><mi>k</mi></msub></msqrt></mfrac><mo>)</mo><mi>V</mi></math> der radene i Z er de nye representasjonene. Med d<sub>k</sub> = 1, én query q = 1, to nøkler [0, ln 3] og verdier [2, 6] er de skalerte skårene [0, ln 3]. Eksponentialverdiene er [1, 3], så vektene blir [¼, ¾]. Ny verdi er ¼·2 + ¾·6 = 5. Den andre tokenen bidrar mest. Hver vektrad summerer til 1.</p>
        <p>Med flere hoder har hvert hode egne projeksjoner. Sett hodeutgangene ved siden av hverandre langs trekkaksen før utprojeksjonen. To utganger med form 7 × 4 blir til 7 × 8, og en 8 × 8-projeksjon bevarer modellbredden. Antall tokener er fremdeles sju.</p><div data-demo="oppmerksomhet"></div>
          <aside lang="en" class="worked-example"><h3>Read one row of attention</h3><p>For a single query, suppose the scaled dot-product scores for two keys are 0 and ln 3. Softmax exponentiates these scores and divides each result by the same row sum. The resulting weights combine the value vectors.</p>
          <div class="calculation"><math display="block"><msub><mi>α</mi><mn>2</mn></msub><mo>=</mo><mfrac><mn>3</mn><mrow><mn>1</mn><mo>+</mo><mn>3</mn></mrow></mfrac><mo>=</mo><mn>0.75</mn></math></div><p>With scalar values 2 and 10, what does this query read out?</p><details><summary>Check your reasoning</summary><p>The first weight is 0.25. The weighted value is 0.25 × 2 + 0.75 × 10 = 8. It lies between the two values, closer to the one receiving more attention.</p></details></aside>
          <p>Én rad i QKᵀ sammenligner én query med alle keys. Divisjon på √dₖ holder skalaen på skalarproduktet mer stabil når nøkkelbredden øker. For numerisk stabil softmax kan samme konstant trekkes fra alle skårer i en rad fordi den tilhørende faktoren kanselleres i teller og nevner.</p>
          <details class="sjekk"><summary>Grunnøving · Hvorfor summerer en oppmerksomhetsrad til én?</summary><p>Hvilken sum står i nevneren i softmax?</p><details><summary>Se svar</summary><p>Alle positive eksponentialer deles på sin felles sum. Den nye tokenverdien er derfor et vektet gjennomsnitt av verdiene i dette hodet.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>En query er (2,0), nøklene er (1,0) og (0,1), og verdiene er 3 og 9. Finn utgangen med skalert skalarprodukt. Hvilken verdi bør svaret ligge nærmest?</p>
          <details><summary>Hint</summary><p>Dybden er 2. Bruk exp(√2) ≈ 4,11.</p></details>
          <details><summary>Se svar</summary><p>Skårer før skalering er [2,0], etterpå [√2,0]. Vektene blir omtrent [4,11/5,11;1/5,11] = [0,804;0,196]. Summen 0,804·3 + 0,196·9 ≈ 4,18 ligger nærmest 3, som hører til nøkkelen som passer best.</p></details></div>`,
      ),
      section(
        "blokk",
        "Følg tokenene gjennom en enkoderblokk",
        "L03d_ViTs-FPass, PDF s. 20–45 og 50–59 · DLFund_Examples_6-Post-ViTs, PDF s. 14–26",
        `<p>Hvert oppmerksomhetshode bruker egne projeksjoner til Q, K og V. Dermed kan én token veie nabotokens ulikt i hvert hode. Sammenstill utgangene langs trekkaksen og projiser dem tilbake til modellbredden. En restforbindelse legger den opprinnelige tokenmatrisen til grenens resultat. Formene i addisjonen må stemme.</p><p>I en blokk med normalisering før hvert dellag får du først Y = X + Attention(LN(X)), så Z = Y + MLP(LN(Y)). Layer normalization normaliserer trekkene i hver token. Oppmerksomhetsdelen blander informasjon mellom tokenene, mens et fullt tilkoblet nettverk bruker de samme vektene separat på hver rad. Posisjonsinformasjon følger trekkene gjennom blokken.</p><p>Med fem tokener, modellbredde 8 og to hoder med bredde 4 får hvert hode en 5 × 5-vektmatrise og en 5 × 4-utgang. Sammensatt får vi 5 × 8, kompatibelt med restforbindelsen etter utgangsprojeksjon.</p>
        <details class="sjekk"><summary>Grunnøving · Hvorfor må grenen ha samme utgangsform som X?</summary><p>Restforbindelsen adderer elementvis.</p><details><summary>Se svar</summary><p>Hver token og hvert trekk i X må ha et tilhørende element i grenens utgang. Utgangsprojeksjonen tilpasser trekkbredden.</p></details></details>
        <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Dobles bare tokentallet til ti. Hvordan endres antall oppmerksomhetsskårer og utgangens form?</p><details><summary>Hint</summary><p>Hvert hode sammenligner hver query med hver key.</p></details><details><summary>Se svar</summary><p>To hoder går fra 2·5²=50 til 2·10²=200 skårer. Utgangen vokser fra 5 × 8 til 10 × 8. Kvadratisk vekst gjelder sammenligningene, ikke antall tokenrader.</p></details></div>`,
      ),
      section(
        "klassifikasjon",
        "Les ut klassen",
        "L03d_ViTs-FPass, PDF s. 50–59. DLFund_Examples_5-Pre-ViTs, PDF s. 14–16 og 6-Post-ViTs, PDF s. 23–26.",
        `
        <p>Etter enkoderblokkene inneholder det oppdaterte klassifikasjonstokenet informasjon samlet fra bildet. Ta denne ene raden og beregn klasseskår med et fullt tilkoblet lag. Med skår [0, ln 3] får andre klasse sannsynlighet 3/(1 + 3) = 0,75. Er andre klasse riktig, blir tapet −ln(0,75) ≈ 0,288. Her normaliseres det over klasser. I oppmerksomheten normaliserte vi over nøklene for én query.</p>
          <p>Klassifikasjonslaget mottar ett ferdig trekksett fra klassetokenet. Dets softmax fordeler masse over klasser, mens oppmerksomhetens softmax fordelte masse over tokener. Kryssentropi for én riktig klasse bruker nettopp sannsynligheten til den klassens indeks.</p>
          <details class="sjekk"><summary>Grunnøving · Hvilken softmax-akse brukes i klassifikasjonslaget?</summary><p>Én rad representerer ett klassifisert bilde.</p><details><summary>Se svar</summary><p>Normaliser over klasseskårene for bildet. Oppmerksomhetens tidligere normalisering gjaldt nøkkeltokener.</p></details></details>
          <div class="exercise"><strong>Anvendelse · egen treningsoppgave</strong><p>Logitene er [ln 2,0,ln 3]. Finn predikert klasse og tap dersom første klasse var riktig. Hva hvis alle skårene økes med 10?</p>
          <details><summary>Hint</summary><p>Normaliser [2,1,3] med totalsummen. Tapet er negativ naturlig logaritme til riktig klasses sannsynlighet.</p></details>
          <details><summary>Se svar</summary><p>Fordelingen er [⅓,⅙,½]. Modellen velger tredje klasse. Tapet er −ln(⅓) = ln 3 ≈ 1,099. Når vi legger 10 til hvert skår, blir alle eksponentialverdiene multiplisert med exp(10). Faktoren forkortes bort.</p></details></div>`,
      ),
    ],
    question:
      "Et 8 × 8-gråtonebilde deles i 4 × 4-biter. Bruk én klassifikasjonstoken, modellbredde 6 og to hoder med dₖ = dᵥ = 3. Finn formene på X, Q, QKᵀ, én hodeutgang og de sammenføyde hodeutgangene.",
    hint: "Tell sekvenslengden først. Hvert hode ser alle tokenene, selv om trekkbredden er mindre.",
    answer:
      "Bildet gir (8/4)² = 4 biter, og klassifikasjonstokenet gir N = 5. X har form 5 × 6. Ett hode har Q på 5 × 3 og QKᵀ på (5 × 3)(3 × 5) = 5 × 5. Oppmerksomhetsvekter ganger V gir (5 × 5)(5 × 3) = 5 × 3. To hoder satt ved siden av hverandre gir 5 × 6.",
  });

  window.IP = chapters;
})();
