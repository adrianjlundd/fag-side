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
        <p>På netthinnen måler staver små lysmengder godt. Tapper gir fargesyn og er tett pakket rundt synsgropen. I et hullkamera bestemmer en stråle gjennom åpningen hvor et scenepunkt avbildes. Med et virtuelt bildeplan foran kameraet gir formlike trekanter <b>x = fX/Z</b> og <b>y = fY/Z</b>. Et fysisk bildeplan bak åpningen gir et omvendt bilde.</p>
        <p>Et punkt 0,4 m til høyre for den optiske aksen og 2 m foran kameraet får x = 10 mm · 0,4/2 = 2 mm med brennvidde 10 mm. Flere punkter på samme stråle gir samme x og y. To parallelle, rektifiserte kameraer med grunnlinje B kan finne dybde fra <dfn>disparitet</dfn> d. Med f = 200 piksler, B = 0,1 m og d = 10 piksler blir Z = fB/d = 2 m.</p>
        <p>En mindre lysåpning slipper inn mindre lys. I den geometriske hullkameramodellen samler den strålene fra et punkt i en mindre flekk på bildeplanet. Romlig oppløsning beskriver hvor nærliggende detaljer systemet kan skille. Optikken og avstanden mellom målepunktene påvirker denne grensen.</p>
        <p><dfn>Sampling</dfn> bestemmer hvor vi måler. <dfn>Kvantisering</dfn> bestemmer hvilke verdier som kan lagres. Et 4 × 3 gråtonebilde med 2 bit per piksel inneholder 12 målinger med 4 mulige nivåer. Pikseldataene tar 24 bit uten pakkeoverhead.</p>`,
      ),
      section(
        "punktoperator",
        "Les kurven fra inngang til utgang",
        "L1-T1-a_Spatial-Intuition, PDF s. 8–21. L1-T1-b_Spatial-IntensityTransf, PDF s. 2–7. DIP4e, kap. 3.2.",
        `
        <p>En punktoperator s = T(r) endrer hver piksel ut fra dens egen verdi. Les inngangen på den vannrette aksen. En kurve over diagonalen gjør nivået lysere. Der kurven er bratt, øker avstanden mellom to nærliggende nivåer. Flate intervaller mister kontrast.</p>
        <p>Bruk normaliserte nivåer 0 ≤ r ≤ 1 og gammakurven s = r<sup>γ</sup>. For r = 0,25 gir γ = ½ verdien 0,5. Med γ = 2 blir verdien 0,0625. Negativet s = 1 − r bytter om lyst og mørkt. En stykkevis lineær kurve kan strekke et trangt intervall, mens klipping til 0 eller 1 gjør flere ulike inngangsverdier like.</p>`,
      ),
      section(
        "histogram",
        "Utjevn et lite bilde for hånd",
        "L1-T1-a_Spatial-Intuition, PDF s. 22–32. L1-T1-b_Spatial-IntensityTransf, PDF s. 23–29. DIP4e, kap. 3.3, s. 133–153.",
        `
        <p>Et <dfn>histogram</dfn> teller nivåer uten å bevare plasseringen av pikslene. To bilder med ombyttede piksler har samme histogram. Del antall h(r) på pikselantallet N for å få p(r). Summer p fra 0 til og med r for å få <dfn>kumulativ fordeling</dfn> F(r).</p>
        <p>Bruk L = 4 nivåer og h = [1, 4, 2, 1] for N = 8. Den kumulative tellingen er [1, 5, 7, 8], så F = [⅛, ⅝, ⅞, 1]. Med T(r) = avrund((L − 1)F(r)) får vi avrund([0,375, 1,875, 2,625, 3]) = [0, 2, 3, 3]. Dermed blir en piksel med nivå 1 til 2.</p>
        <p>Tell på nytt gjennom avbildningen. Det nye histogrammet blir [1, 0, 4, 3]. De to øverste nivåene deler utgangsnivå 3. Diskret utjevning kan derfor etterlate tomme nivåer. Her bruker vi nærmeste heltall og hele fordelingsfunksjonen. Følg avrundingen som oppgaven oppgir.</p>`,
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
        <div data-demo="filter"></div>`,
      ),
      section(
        "utjevning",
        "Støy, median og Gauss",
        "L3-T3-a_Filtering_Average, PDF s. 21–53, 93–100 og 135–141. DIP4e, kap. 3.5, s. 164–175.",
        `
        <p>Et middel gir lik vekt til hver nabo. Et gaussfilter gir størst vekt nær sentrum, og større σ gir bredere utjevning. Normaliser summen av vektene til én for å bevare et konstant område. For nabolaget [10, 11, 99] er middelverdien 40, mens medianen av de sorterte verdiene er 11. Medianen tåler en enkelt impuls og er et ikke-lineært filter.</p>
        <p>La u = [1, 2, 1]/4. Det ytre produktet uᵀu gir en <dfn>separabel</dfn> kjerne med rader [1, 2, 1], [2, 4, 2], [1, 2, 1], alle delt på 16. Utfør én passering langs rader og én langs kolonner. En k × k-kjerne krever da 2k multiplikasjoner per piksel i stedet for k². Ved k = 5 sparer du 15 av 25 multiplikasjoner.</p>
        <p>Den kontinuerlige, normaliserte 2D-Gaussfunksjonen med samme σ langs begge akser er G(x,y) = exp[−(x² + y²)/(2σ²)] / (2πσ²). Eksponenten kan deles i et x-ledd og et y-ledd. Derfor kan G faktoriseres i to 1D-Gaussfunksjoner. Normaliser den diskrete, avkuttede kjernen etter sampling. Både middel og Gauss med faste vekter er lineære. For operatoren F gjelder F(aI + bJ) = aF(I) + bF(J) fordi hver term i summen fordeler seg over addisjonen.</p>`,
      ),
      section(
        "derivasjon",
        "Skille en kant fra en topp",
        "L3-T3-b_Filtering_Diff, PDF s. 25–30, 86–101 og 105–112. DIP4e, kap. 3.6.",
        `
        <p>En første differanse måler endring mellom naboer. Sobel kombinerer differanse i én retning med vektet glatting i den andre. Fra G<sub>x</sub> = 3 og G<sub>y</sub> = 4 får en <dfn>gradient</dfn> lengde √(3² + 4²) = 5. Selve kanten står vinkelrett på gradienten. Her er x mot høyre og y ned i bildet.</p>
        <p>Andrederiverten måler endring i stigning. For fire-nabos Laplace med sentrum −4 og fire 1-tall er responsen nord + sør + øst + vest − 4·sentrum. Med sentrum 8 og alle naboer 5 får du −12. Den negative krumningen markerer en lys topp. Skjerping med f − α∇²f og α = ¼ gir 8 − ¼·(−12) = 11. Ved motsatt kjernefortegn må du også bytte fortegn i kombinasjonen.</p>`,
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
        <p>Den diskrete Fourier-transformen (DFT) sammenligner prøvene med periodiske basisbølger. Her bruker vi negativ eksponent i forovertransformen, uten skalering, og positiv eksponent og faktor 1/N i inversen. <b>F[k] = Σ f[n] exp(−2πikn/N)</b>, med n fra 0 til N − 1. <dfn>DC-ledd</dfn> F[0] er summen. Del på N for å få middelverdien.</p>
        <p>For f = [4, 2, 4, 2] er F[0] = 12. Ved k = 2 er faktorene [1, −1, 1, −1], så F[2] = 4 − 2 + 4 − 2 = 4. Ved k = 1 gir [1, −i, −1, i] summen 0. F[3] = 0 ved konjugatsymmetri. Signalet er dermed en konstant på 3 pluss et ledd på ±1 som skifter ved hver prøve.</p>
        <p>I et sentrert <dfn>amplitudespekter</dfn> ligger nullfrekvens i midten. To topper symmetrisk om midten kan representere én reell sinus. Avstanden fra sentrum øker med antall perioder. Toppene ligger langs retningen som intensiteten varierer i, vinkelrett på stripene. En vannrett rad med to topper kan derfor komme fra loddrette striper. En enkelt punktimpuls har konstant spektral amplitude. Mange spredte lyse og mørke støypiksler kan dermed spre energi bredt utover spekteret.</p>
        <p>Skriv en bølge som c + A sin(2πft + φ), med A ≥ 0. Avles topp og bunn for å finne A = (topp − bunn)/2. Avstanden T mellom to topper gir f = 1/T. En bølge som varierer mellom −2 og 4 og gjentar seg hver 0,25 s, har c = 1, A = 3 og f = 4 Hz. Starter den på toppen ved t = 0, er φ = π/2 modulo 2π i sinusformen.</p>`,
      ),
      section(
        "frekvensfilter",
        "Fra bilde til maske og tilbake",
        "L5-T5-a_Frequency, PDF s. 40–51. L6-T6-a_Segmentation, PDF s. 6–9. DIP4e, kap. 4.7, fra s. 260.",
        `
        <p>Konvolusjon i bilderommet svarer til multiplikasjon i frekvensrommet. Beregn F, gang elementvis med H, og bruk invers DFT på G = H·F. Skal masken tegnes med lav frekvens i midten, flytt først DC til sentrum, og flytt tilbake før inversen. For partallsdimensjoner gir multiplikasjon av bildet med (−1)<sup>x+y</sup> før transformen den samme spektrumforskyvningen. Gjenta fortegnsbyttet etter inversen.</p>
        <p>Et lavpass bevarer området nær DC og glatter bildet. Et høypass fjerner blant annet middelverdien. Et par smale stoppområder over motsvarende støytopper kan fjerne periodisk støy og bevare detaljer andre steder. Harde kutt kan gi ringer nær kanter. Gauss- og Butterworth-masker har mykere overganger.</p>
        <p>Den andre retningen av konvolusjonsteoremet er at punktvis produkt i bilderommet blir sirkulær konvolusjon i frekvensrommet, med normaliseringsfaktor 1/(MN) for et M × N-bilde med uskalert forovertransform. Store, tette kjerner kan lønne seg å filtrere med FFT. Små eller separable kjerner krever færre lokale regneoperasjoner og kan være raskere å bruke direkte.</p>
        <p>En vanlig DFT behandler grensene som periodiske. En lineær konvolusjon av en rad med 6 prøver og en kjerne med 3 trenger lengde minst 6 + 3 − 1 = 8. Fyll begge med nuller til minst 8, juster for hvor kjernens origo ligger, og beskjær det ønskede utsnittet etter inversen. Uten padding kan verdier vikle rundt til motsatt kant.</p>`,
      ),
      section(
        "aliasing",
        "Prøvetaking og rask beregning",
        "L5-T5-a_Frequency, PDF s. 52–62. DIP4e, kap. 4.3, s. 215–225 og kap. 4 om FFT.",
        `
        <p>En samplingfrekvens f<sub>s</sub> har Nyquist-grense f<sub>s</sub>/2. Legg høyeste signalfrekvens under grensen for entydig rekonstruksjon av et båndbegrenset signal. Ved 100 prøver per sekund kan en cosinus på 70 Hz gi samme prøver som en på 30 Hz fordi 70 = 100 − 30. Lavpassfiltrer før nedprøving for å redusere <dfn>aliasing</dfn>.</p>
        <p>En <dfn>FFT</dfn> beregner DFT-koeffisientene ved å gjenbruke delsummer. Ved N prøver bruker en typisk FFT omtrent N log₂N operasjoner mot størrelsesorden N² ved direkte evaluering. En 2D-transform kan beregnes med 1D-transformer først langs hver rad, så langs hver kolonne.</p>`,
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
        <p>Etter tynning er en rad [9, 5, 4, 1, 6]. Sett lav terskel til 4 og høy til 8, med likhet inkludert. Verdien 9 er sterk. 5 og 4 er svake, men kan nås sammenhengende fra 9. Tallet 1 bryter forbindelsen til 6. Sluttmasken er [1, 1, 1, 0, 0] når det ikke finnes forbindelser via andre rader. Oppgi om diagonaler teller i et todimensjonalt bilde.</p>`,
      ),
      section(
        "hough",
        "Stem på en geometrisk form",
        "L6-T6-a_Segmentation, PDF s. 39–64. DIP4e, kap. 10.2 om Hough-transformen.",
        `
        <p>Et kantpunkt kan ligge på mange linjer. La punktet stemme i en <dfn>akkumulator</dfn> for alle linjer gjennom punktet. Bruk normalen til linjen med vinkel θ og avstand ρ = x cos θ + y sin θ. Toppene i tabellen er parametere som får støtte fra mange punkter.</p>
        <p>Punktene (2, 0), (2, 1) og (2, 3) gir alle ρ = 2 ved θ = 0°. Tre stemmer samles om den loddrette linjen x = 2. For en sirkel med kjent radius r stemmer hvert kantpunkt (x,y) på sentre (a,b) som oppfyller (a − x)² + (b − y)² = r². Ukjent radius gir en ekstra parameterakse. Kvantisering av parameterrommet bestemmer hvor nær to forslag må være for å telle i samme celle.</p>`,
      ),
      section(
        "terskel",
        "Velg terskel med histogrammet",
        "L6-T6-a_Segmentation, PDF s. 75–87. DIP4e, kap. 10.3–10.4, fra s. 742.",
        `
        <p>En global terskel t kan gi forgrunn der intensiteten er større enn t. Otsus metode prøver ulike skiller og maksimerer variansen mellom gruppene, w₀w₁(μ₀ − μ₁)². Vektene w er andelene i gruppene, og μ er gruppegjennomsnittene. Utelat skiller som gir en tom gruppe.</p>
        <p>Med prøver [0, 1, 5, 6] gir t = 1 to like store grupper og middelverdier 0,5 og 5,5. Målet blir ½·½·5² = 6,25. For t = 0 blir det ¼·¾·4² = 3. Skillet etter nivå 1 skiller de mørke og lyse bedre. Hvis belysningen varierer mye, kan lokale terskler fungere bedre. «Split and merge» deler uensartede regioner og slår sammen tilgrensende regioner som oppfyller samme homogenitetskrav.</p>`,
      ),
      section(
        "regionvekst",
        "Hold orden på fronten",
        "L6-T6-a_Segmentation, PDF s. 94–104. DIP4e, kap. 10.4, fra s. 764.",
        `
        <p><dfn>Regionvekst</dfn> starter i et frø. Hvert steg tar ut ett punkt fra fronten og legger inn ubesøkte naboer som tilfredsstiller intensitetskriteriet. Sett status til −1 ved innlegging og 1 ved behandling, så en piksel høyst legges inn én gang. En <dfn>stakk</dfn> tar sist innlagte først, mens en kø tar eldst innlagte først.</p>
        <p>Bruk rad og kolonne fra 1, fire naboer og et 2 × 2-bilde med rader [7, 7] og [7, 0]. Start i (1,1), godta verdi 7, og sjekk opp, høyre, ned, venstre. Første uttak godkjenner (1,2), deretter (2,1). Skriver vi stakktoppen til venstre, er fronten [(2,1), (1,2)]. Andre uttak behandler (2,1). Pikselen (2,2) er 0 og avvises. Fronten har nå kun (1,2). Behandle den, og regionen består av de tre syverne.</p>`,
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
        <p>Åpning er erosjon fulgt av dilasjon med samme B. På den første raden får du {3} og deretter {2, 3, 4}. Den isolerte syveren forsvinner. Lukking er dilasjon fulgt av erosjon. Her får du {2, 3, 4, 5, 6, 7}. Mellomrommet er fylt.</p>`,
      ),
      section(
        "rand",
        "Indre og ytre rand",
        "L7-T7-a_Morphology-compressed, PDF s. 24–26. DIP4e, kap. 9.5, fra s. 652.",
        `
        <p>Den indre randen er A ∖ (A ⊖ B). Den ytre er (A ⊕ B) ∖ A. For en full 3 × 3-blokk midt i et større nullbilde og et fullt 3 × 3-element med sentrert origo, etterlater erosjonen bare midtpikselen. Indre rand har 9 − 1 = 8 piksler. Dilasjonen er en 5 × 5-blokk. Ytre rand har 25 − 9 = 16 piksler.</p>`,
      ),
      section(
        "rekonstruksjon",
        "Gjenskap en sammenhengende komponent",
        "L7-T7-a_Morphology-compressed, PDF s. 26–27. DIP4e, kap. 9.5–9.6, s. 652–673.",
        `
        <p>Ved binær <dfn>rekonstruksjon</dfn> er A en maske som begrenser veksten. Start med et frø X₀ i objektet. Beregn Xₖ = (Xₖ₋₁ ⊕ B) ∩ A til to påfølgende mengder er like. Med et korsformet B med sentrum velges fire-naboforbindelse. Et fullt 3 × 3-element velger åtte naboer.</p>
        <p>På en rad med A = {1, 2, 3, 5} og frø {1} gir dilasjon med B = {−1,0,1} først {0,1,2}. Snitt med A gir {1,2}. Neste iterasjon gir {1,2,3}. Tredje iterasjon gir samme resultat. Punkt 5 er adskilt av hullet ved 4.</p>`,
      ),
      section(
        "formtreff",
        "Gjenkjenn en form og finn dens skjelett",
        "L7-T7-a_Morphology-compressed, PDF s. 38–68 og 174–175. DIP4e, kap. 9.4–9.5.",
        `
        <p>Hit-or-miss søker etter en bestemt kombinasjon av forgrunn og bakgrunn. Krev at ett element passer i forgrunnen og et annet i bakgrunnen ved samme origo. En tredelt radmal [0, 1, *] krever bakgrunn til venstre og forgrunn i midten. Stjernen tillater begge verdier til høyre. Malen gir treff midt i [0, 1, 1].</p>
        <p>Et morfologisk skjelett representerer objektet ved sentrene til maksimale innskrevne elementer. For en disk er den største innskrevne disken hele objektet, så skjelettet er sentrum. Flere nødvendige sentre kan danne grener i mer sammensatte former. I den diskrete algoritmen bestemmer strukturelementet hvilke former som får plass ved gjentatt erosjon.</p>`,
      ),
      section(
        "graatone",
        "Flytt minimum og maksimum",
        "L7-T7-a_Morphology-compressed, PDF s. 28–37 og 176–193. DIP4e, kap. 9.8, fra s. 674.",
        `
        <p>For et flatt element med høyde null bruker gråtoneerosjon minimum av f(x + b), og gråtonedilasjon maksimum av f(x − b). Et sentrert symmetrisk vindu bruker samme naboer i begge operasjoner. For nabolaget [4, 12, 5] blir erosjonen 4 og dilasjonen 12 ved sentrum.</p>
        <p>For å beregne åpning eller lukking må første trinn gi nok naboverdier til neste trinn. Med raden [4, 4, 12, 4, 4] gir trepunkts erosjon [4, 4, 4] ved de tre indre plassene. Dilasjon av disse gir åpningsverdi 4 ved midten. Den hvite topphatten f − åpning blir 12 − 4 = 8 og markerer den smale lyse toppen.</p>`,
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
        "forover",
        "Fra inndata til tap",
        "L03a_DL-Intro, PDF s. 45–60. L03b_FCNNs-FBPass, PDF s. 5–18 og 60–80. DLFund_Examples_1-Pre-FCNNs, PDF s. 2 og 2-Post-FCNNs, PDF s. 2–3.",
        `
        <p>Bruk kolonnevektorer og én vektrad per utgang. Et lag med m innganger og n utganger har W med form n × m, og en <dfn>bias</dfn> per utgang. Beregn z = Wx + b, så a = g(z). Valget av <dfn>aktiveringsfunksjon</dfn> avhenger av oppgaven. ReLU gir maks(0, z), og sigmoid σ(z) = 1/(1 + e<sup>−z</sup>) gir et tall mellom 0 og 1.</p>
        <p>La x = [2, 1]ᵀ, W = [1, −3], b = 1 og riktig binær klasse y = 1. Da er z = 1·2 − 3·1 + 1 = 0 og a = σ(0) = 0,5. Med binær <dfn>kryssentropi</dfn> L = −y ln(a) − (1 − y) ln(1 − a) får vi L = −ln(0,5) ≈ 0,693. Modellen fordeler sannsynligheten likt på de to klassene.</p>
        <p>I regresjon med lineær utgang kan L = ½(a − y)² brukes. For a = 3 og y = 5 blir tapet 2. Tapets derivert med hensyn på a er −2, så en liten økning i a reduserer tapet.</p>`,
      ),
      section(
        "bakover",
        "Følg kjerneregelen baklengs",
        "L03b_FCNNs-FBPass, PDF s. 20–50 og 88–99. DLFund_Examples_2-Post-FCNNs, PDF s. 4–8.",
        `
        <p>Ved <dfn>tilbakepropagering</dfn> betegner δ = ∂L/∂z feilfølsomheten før aktiveringen. For binær kryssentropi og sigmoid forenkles produktet (∂L/∂a)(∂a/∂z) til a − y. I eksemplet blir δ = −0,5. For vekt wᵢ er ∂z/∂wᵢ = xᵢ og for bias er ∂z/∂b = 1. Dermed er ∂L/∂W = δxᵀ = [−1, −0,5] og ∂L/∂b = −0,5.</p>
        <p>I et skjult lag summeres bidragene fra alle veier til tapet. Med kolonnevektorer brukes δ<sub>skjult</sub> = (W<sub>neste</sub>ᵀδ<sub>neste</sub>) ⊙ g′(z<sub>skjult</sub>), der ⊙ ganger tilsvarende elementer. For et aktivt ReLU-nevron med utgående vekter 2 og −1 og feilsignaler 0,3 og 0,1 blir det (2·0,3 − 1·0,1)·1 = 0,5. En negativ ReLU-inngang ville gitt null gradient langs denne veien.</p>
        <p>Gradientnedstigning trekker gradienten ganger læringsraten η fra de gamle parameterne. Med η = 0,2 i sigmoid-eksemplet blir første nye vekt 1 − 0,2·(−1) = 1,2, andre vekt −3 − 0,2·(−0,5) = −2,9 og ny bias 1,1. Et nytt fremoverpass gir z = 1,2·2 − 2,9 + 1,1 = 0,6 og σ(z) ≈ 0,646. Tapet −ln(0,646) ≈ 0,437 har falt fra 0,693. Bruk de gamle vektene i hele bakoverpasset før oppdateringen.</p>`,
      ),
      section(
        "minibatch",
        "Lær fra flere eksempler",
        "L03a_DL-Intro, PDF s. 54–66. DLFund_Examples_1-Pre-FCNNs, PDF s. 4 og 2-Post-FCNNs, PDF s. 7–8.",
        `
        <p>For middelverdien av tap over B eksempler tar du middelverdien av de B gradientene. Hvis én vekt får gradientene 4, −1 og 3 i en mini-batch, er batchgradienten (4 − 1 + 3)/3 = 2. Med w = 1 og η = 0,1 får du w ny = 0,8. Ved et summert tap brukes summen i stedet. Valideringsdata måler hvor godt modellen generaliserer til eksempler den ikke trente på.</p>`,
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
        <p>Et filter ser et utsnitt av alle inngangskanalene og lager ett <dfn>trekkart</dfn>. Antall filtre blir derfor antall utgangskanaler. Med filterbredde K, symmetrisk padding P på hver side, <dfn>stride</dfn> S og dilatasjon 1 får du <b>W ut = ⌊(W inn + 2P − K)/S⌋ + 1</b>. Bruk samme formel for høyden. Gulvfunksjonen teller bare plasseringer der hele vinduet passer etter padding.</p>
        <p>For et 9 × 9-bilde med 2 kanaler, tre 3 × 3-filtre, stride 2 og P = 1 er W ut = ⌊(9 + 2 − 3)/2⌋ + 1 = 5. Resultatet er 5 × 5 × 3. ReLU endrer ingen dimensjoner. En 2 × 2 maks-<dfn>pooling</dfn> med stride 2 og uten padding gir 2 × 2 × 3, altså tolv tall ved utflating. Resten ved høyre og nedre kant faller utenfor vinduene.</p>`,
      ),
      section(
        "parametere",
        "Tell lagrede vekter og utført arbeid",
        "L03c_CNNs-FPass, PDF s. 65–81 og 133–142.",
        `
        <p>Hvert filter bruker K<sub>h</sub>·K<sub>w</sub>·C<sub>inn</sub> vekter og eventuelt én bias. Gang med C<sub>ut</sub> for antall parametere. I laget over blir det (3·3·2 + 1)·3 = 57. Samme 57 parametere brukes på alle posisjoner. Pooling med fast maks har ingen trenbare parametere.</p>
        <p>Antall multiplikasjoner for direkte beregning er derimot H<sub>ut</sub>·W<sub>ut</sub>·C<sub>ut</sub>·K<sub>h</sub>·K<sub>w</sub>·C<sub>inn</sub> = 5·5·3·18 = 1350. Her telles også operasjoner med padding, og en multiplikasjon og en addisjon teller separat. Hver utverdi summerer 18 produkter med 17 addisjoner, pluss én hvis bias legges til. Et fullt tilkoblet lag fra tolv utflatede tall til fire klasser ville hatt 12·4 + 4 = 52 parametere.</p>`,
      ),
      section(
        "respons",
        "Beregn respons, aktivering og klasseskår",
        "L03c_CNNs-FPass, PDF s. 36–61 og 145–154. DLFund_Examples_3-Pre-CNNs, PDF s. 5–7 og 4-Post-CNNs, PDF s. 9–13.",
        `
        <p>I det vanlige CNN-fremoverpasset ligger filteret i oppgitt retning. På raden [3, 1, 4, 2] med filter [2, −1], stride 1 og ingen padding samler vi vinduene [3,1], [1,4], [4,2] som rader i en matrise. Gang hver rad med [2,−1]ᵀ. Responsene blir [5, −2, 6] før bias. Den alternative matrisen har rader [2,−1,0,0], [0,2,−1,0], [0,0,2,−1]. Gang med bilderaden som kolonne, så får du samme tre resultater.</p>
        <p>Med null bias gir ReLU [5, 0, 6]. En avsluttende klassifikator beregner en <dfn>logit</dfn> per klasse. Softmax av logits [ln 3, ln 2] gir [3/5, 2/5]. Er riktig klasse den andre, blir kategorisk kryssentropi −ln(2/5) ≈ 0,916. Tapet går ned når modellen gir riktig klasse høyere sannsynlighet.</p>`,
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
        <p>Et 4 × 6 RGB-bilde med P = 2 gir 2·3 = 6 biter med 2·2·3 = 12 tall hver. En 12 × 8-projeksjon gir 6 × 8. Med ett klassifikasjonstoken blir X en 7 × 8-matrise. En posisjonsmatrise på 7 × 8 kan legges til elementvis.</p>`,
      ),
      section(
        "oppmerksomhet",
        "Fra Q, K og V til én ny token",
        "L03d_ViTs-FPass, PDF s. 25–45. DLFund_Examples_5-Pre-ViTs, PDF s. 11–13 og 6-Post-ViTs, PDF s. 18–22.",
        `
        <p>I <dfn>selvoppmerksomhet</dfn> beregnes Q = XW<sub>Q</sub>, K = XW<sub>K</sub> og V = XW<sub>V</sub>. En query beskriver hva tokenen søker, en key hva hver token tilbyr og en value hvilket innhold som skal kombineres. Med N tokener får Q og K form N × d<sub>k</sub>. Produktenes tabell QKᵀ har form N × N. Verdiene V har form N × d<sub>v</sub>.</p>
        <p>Skaler hver skår med 1/√d<sub>k</sub> og bruk <dfn>softmax</dfn> langs hver rad. Multipliser så vekttabellen med V. Med d<sub>k</sub> = 1, én query q = 1, to nøkler [0, ln 3] og verdier [2, 6] er de skalerte skårene [0, ln 3]. Eksponentialverdiene er [1, 3], så vektene blir [¼, ¾]. Ny verdi er ¼·2 + ¾·6 = 5. Den andre tokenen bidrar mest. Hver vektrad summerer til 1.</p>
        <p>Med flere hoder har hvert hode egne projeksjoner. Sett hodeutgangene ved siden av hverandre langs trekkaksen før utprojeksjonen. To utganger med form 7 × 4 blir til 7 × 8, og en 8 × 8-projeksjon bevarer modellbredden. Antall tokener er fremdeles sju.</p><div data-demo="oppmerksomhet"></div>`,
      ),
      section(
        "klassifikasjon",
        "Les ut klassen",
        "L03d_ViTs-FPass, PDF s. 50–59. DLFund_Examples_5-Pre-ViTs, PDF s. 14–16 og 6-Post-ViTs, PDF s. 23–26.",
        `
        <p>Etter enkoderblokkene inneholder det oppdaterte klassifikasjonstokenet informasjon samlet fra bildet. Ta denne ene raden og beregn klasseskår med et fullt tilkoblet lag. Med skår [0, ln 3] får andre klasse sannsynlighet 3/(1 + 3) = 0,75. Er andre klasse riktig, blir tapet −ln(0,75) ≈ 0,288. Her normaliseres det over klasser. I oppmerksomheten normaliserte vi over nøklene for én query.</p>`,
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
