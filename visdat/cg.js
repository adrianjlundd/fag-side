// Fagstoff og selvstendige regneeksempler. Sidetall viser PDF-sider fra én.
window.CG = (() => {
  function del(id, title, source, html) {
    return { id, title, source, html };
  }

  return [
    {
      slug: "transformasjoner",
      title: "Geometriske transformasjoner",
      intro:
        "Et hjørne har koordinater i objektets eget system. Modellmatrisen bestemmer hvor hjørnet havner når objektet plasseres i verden.",
      focus: [
        "Skriv en 2D- eller 3D-matrise fra en beskrivelse, og følg ett hjørne gjennom produktet.",
        "Roter om et valgt punkt. Kontroller fortegn, fast punkt og akseretning.",
        "Tell skalare multiplikasjoner for mange hjørner, med og uten forhåndsberegnet produkt.",
      ],
      sections: [
        del(
          "koordinater",
          "Punkter, retninger og en ekstra koordinat",
          "Transformations.pdf § 1.1–1.5, PDF s. 3–15 · CGVIZ_Chapter_3_2022.pdf s. 3–31",
          `
          <p>En vektor fra A til B er forskjellen B − A. Flytt begge endepunktene like langt, så er forskjellen den samme. I <dfn>homogene koordinater</dfn> får et 2D-punkt formen [x, y, 1]ᵀ og en retning formen [u, v, 0]ᵀ. I 3D setter vi inn z før siste koordinat.</p>
          <p>Bruk kolonnevektorer. Radene i en affin 2D-matrise kan skrives [a, b, tₓ], [c, d, tᵧ], [0, 0, 1]. Punktet får x′ = ax + by + tₓ og y′ = cx + dy + tᵧ. Forskyvningen faller bort når siste koordinat er 0.</p>
          <p><strong>Regn selv underveis.</strong> Med rader [2, 0, 3], [0, 1, −1], [0, 0, 1] får punktet (2, 4) verdien (7, 3). Retningen (2, 4) får verdien (4, 4). En <dfn>affin transformasjon</dfn> bevarer blant annet midtpunkter. Generell skalering kan endre både lengder og vinkler.</p>
          <p>En kube med åtte unike hjørner får en 4 × 8-hjørnematrise, ett homogent punkt per kolonne. Skalering med (2, 3, 4) er en 4 × 4-matrise med diagonal (2, 3, 4, 1) og null ellers. En translasjon har enerdiagonal og forskyvningen (tₓ, tᵧ, t<sub>z</sub>) øverst i siste kolonne. Produktet M · hjørnematrisen har fortsatt fire rader og åtte kolonner. Alle w-verdiene forblir 1 ved disse affine operasjonene.</p>`,
        ),
        del(
          "rekkefolge",
          "Hva skjer først?",
          "CGVIZ_Chapter_3_2022.pdf s. 10–20, 26–31 og 48–55 · CGVIZ_Chapter_5_2026.pdf s. 12–19",
          `
          <p>S angir skalering, R rotasjon, T translasjon. Med x mot høyre og y opp er positiv rotasjon mot klokken, sett fra positiv z mot origo. Rotasjon i xy-planet gir x′ = x cos θ − y sin θ og y′ = x sin θ + y cos θ. Ved +90° får vi (−y, x). I 3D lar R<sub>z</sub> z stå fast.</p>
          <p>Skaler (1, 2) med faktorene (2, 3), roter +90° og flytt med (4, 1). Følg punktet: (1, 2) → (2, 6) → (−6, 2) → (−2, 3). Produktet er M = T R S. Høyre matrise treffer punktet først.</p>
          <p>Kontroll av hele matrisen: (x, y) → (2x, 3y) → (−3y, 2x) → (4 − 3y, 1 + 2x). Les av radene i M som [0, −3, 4], [2, 0, 1], [0, 0, 1]. Omvendt transformasjon er S⁻¹ R⁻¹ T⁻¹. Prøv den på resultatet.</p>
          <p>Skal et ferdig skalert hjørne Q = (4, 3) treffe G = (1, 8), finn forskyvningen G − Q = (−3, 5) og bruk den på alle hjørner. Speiling om x-aksen er derimot skalering med (1, −1). En skjærtransformasjon langs x, x′ = x + ky, y′ = y, flytter (1, 2) til (5, 2) når k = 2.</p>
          <div data-demo="transformasjon"></div>`,
        ),
        del(
          "pivot",
          "Rotasjon om et annet sentrum",
          "Transformations.pdf § 1.6 og § 1.8, PDF s. 15–17 og 29–36 · CGVIZ_Chapter_3_2022.pdf s. 32–35 og 67–80",
          `
          <p>Et <dfn>rotasjonssentrum</dfn> C skal ligge stille. Flytt C til origo med T(−C), roter der og flytt tilbake. Formelen for et punkt er p′ = C + R(p − C). Matrisen er T(C) R T(−C).</p>
          <p>Roter (5, 3) <em>med</em> klokken om (2, 2). Relativ posisjon er (3, 1). Ved −90° blir (x, y) til (y, −x), altså (1, −3). Legg tilbake (2, 2) og få (3, −1). Kontroller at C selv gir null i mellomste steg.</p>
          <p>Rundt en akse parallell med z bruker du samme oppskrift og beholder z. For en vilkårlig 3D-akse gjennom C kan en rotasjon A først rette aksen inn mot z. Hele produktet blir T(C) A⁻¹ R<sub>z</sub>(θ) A T(−C). Når rotasjonen kommer etter en skalering, bruk sentrum i det koordinatsystemet oppgaven oppgir for rotasjonssteget.</p>`,
        ),
        del(
          "kostnad",
          "Én matrise til alle hjørnene",
          "Transformations.pdf § 1.4 og § 1.12, PDF s. 10–12 og 46–47 · CGVIZ_Chapter_3_2022.pdf s. 18–20",
          `
          <p>En tett 4 × 4-matrise ganger én 4-vektor krever 4 · 4 = 16 skalare multiplikasjoner. To tette 4 × 4-matriser krever 4 · 4 · 4 = 64 for å danne produktet. Disse tallene gjelder når en også regner med nuller og enere.</p>
          <p>For 20 hjørner og to transformasjoner: separat bruk koster 20 · 2 · 16 = 640. Med forhåndsprodukt koster det 64 + 20 · 16 = 384. Rekkefølgen er identisk. Besparelsen er 256 multiplikasjoner fordi samme produkt brukes flere ganger. Med N hjørner lønner det seg når 64 + 16N &lt; 32N, altså N &gt; 4.</p>`,
        ),
      ],
      question:
        "Skaler P = (3, 1) med (2, 1), og roter deretter +90° om C = (2, 0). Finn sluttpunktet og skriv matrisefaktorene i rett rekkefølge.",
      hint: "Finn først det skalerte punktet. Trekk fra C før du roterer.",
      answer:
        "Skaleringen gir (6, 1). Relativt til C er dette (4, 1). Kvartdreiningen gir (−1, 4). Legg til C og få (1, 4). Matriseproduktet er T(C) R(+90°) T(−C) S.",
      terms: {
        "homogene koordinater":
          "En ekstra koordinat w gjør blant annet translasjon til matrisemultiplikasjon. For w ≠ 0 får vi vanlige koordinater ved å dele de øvrige på w.",
        "affin transformasjon":
          "En avbildning p′ = Ap + t. En rett linje avbildes på en linje eller, i et degenerert tilfelle, et punkt.",
        rotasjonssentrum:
          "Punktet en 2D-rotasjon dreier rundt. Det beholder sin posisjon.",
      },
    },
    {
      slug: "scenegrafer",
      title: "Modellering og scenegrafer",
      intro:
        "En robotarm kan bevege seg mens festet flyttes. En scenegraf holder styr på hvilke bevegelser som følger hverandre.",
      focus: [
        "Følg et lokalt punkt opp til verdensrommet.",
        "Finn posisjonen sett fra et søskenobjekt ved å invertere referansens matrise.",
      ],
      sections: [
        del(
          "hierarki",
          "Fra lokal geometri til verden",
          "SceneGraphs.pdf § 9.1–9.2, PDF s. 1–5 · CGVIZ_Chapter_9_2020.pdf s. 2–12",
          `
          <p>Et hjørne beskriver én posisjon. Tre hjørner kan danne et trekantprimitiv. Med en tabell over hjørner og en liste med indekser kan flere trekanter dele samme hjørnedata. En <dfn>scenegraf</dfn> knytter slik geometri til grupper og transformasjoner.</p>
          <p>La A være matrisen fra arm til verden og H fra hånd til arm. Da er p<sub>verden</sub> = A H p<sub>hånd</sub>. En søskengren for den andre hånden skal starte fra samme A. Ved traversering kan en lagre A på en stakk, besøke hånden og hente A tilbake.</p>
          <p><strong>Eksempel.</strong> H flytter to enheter langs lokal x. A roterer +90° om z og flytter deretter med (4, 0). Håndens origo (0, 0) blir (2, 0) i armens system, (0, 2) etter rotasjon og (4, 2) i verden. Kontroll: avstanden til armens verdensposisjon (4, 0) er fremdeles 2.</p>`,
        ),
        del(
          "referanse",
          "Se ett objekt fra et annet",
          "CGVIZ_Chapter_9_2020.pdf s. 8–12 · SceneGraphs.pdf § 9.2, PDF s. 4–6",
          `
          <p>La M<sub>A</sub> og M<sub>B</sub> ta koordinater fra henholdsvis A og B til verden. Fra A til B går vi opp til verden og deretter ned med B sin inverse: p<sub>B</sub> = M<sub>B</sub>⁻¹ M<sub>A</sub> p<sub>A</sub>. Felles forfedre kanselleres.</p>
          <p>En lampe sitter i verden på (4, 2). Et kamera på (1, 2) har de samme akseretningene. Lampen ligger på (4 − 1, 2 − 2) = (3, 0) i kameraets system. Roteres også kameraet, må vektoren uttrykkes i de roterte kameraaksene.</p>`,
        ),
      ],
      question:
        "En vogn står ved (3, 4) og er rotert 90° mot klokken. En lykt er festet på (2, −1) i vognen. Hvor er lykten i verden?",
      hint: "Lokal forskyvning roteres før vognens verdensposisjon legges til.",
      answer:
        "Rotasjon om z tar (2, −1) til (1, 2). Legg til (3, 4) og få (4, 6). Matrisen fra lykten til verden er T(3,4) R(+90°) T(2,−1).",
      terms: {
        scenegraf:
          "Et hierarki der transformasjoner langs en sti bestemmer hvordan geometrien er plassert.",
      },
    },
    {
      slug: "kamera",
      title: "Kamera og projeksjon",
      intro:
        "Et kamera gjør verdensposisjoner om til koordinater langs kameraets egne akser. Projeksjonen bestemmer deretter hvor de tegnes i bildet.",
      focus: [
        "Bygg en view-matrise og kontroller at kameraets sentrum blir origo.",
        "Beregn synsvolum, perspektivmatrise og koordinater etter divisjon med w.",
        "Kartlegg normaliserte koordinater til et skjermutsnitt.",
      ],
      sections: [
        del(
          "view",
          "Verden sett fra kameraet",
          "Projections_and_Viewing_Transformations.pdf § 1.5, PDF s. 16–17 · CGVIZ_Chapter_4_2022.pdf s. 25–33",
          `
          <p>WCS er verdenssystemet. ECS er øyesystemet med x mot høyre, y opp og synsretning langs negativ z. Gitt øyeposisjon E, blikkretning g og en oppvektor: sett ẑ = −g/‖g‖, x̂ = normaliser(opp × ẑ) og ŷ = ẑ × x̂. Oppvektoren må peke i en annen retning enn langs siktlinjen.</p>
          <p>For et verdenspunkt P, regn d = P − E. ECS-koordinatene er (x̂ · d, ŷ · d, ẑ · d). I <dfn>view-matrisen</dfn> står aksene som tre rader med siste element −akse · E. Den nederste raden er [0, 0, 0, 1].</p>
          <p>La E = (0, 0, 3), g = (1, 0, 0) og opp = (0, 1, 0). Da blir ẑ = (−1, 0, 0), x̂ = (0, 0, 1) og ŷ = (0, 1, 0). Punktet (4, 2, 5) gir d = (4, 2, 2) og ECS = (2, 2, −4). Negativ dybde bekrefter at punktet ligger foran kameraet. E selv gir (0, 0, 0).</p>`,
        ),
        del(
          "perspektiv",
          "Fra synspyramide til bilde",
          "Projections_and_Viewing_Transformations.pdf § 1.2 og § 1.6, PDF s. 5–10 og 18–23, likn. 1.13 · CGVIZ_Chapter_4_2022.pdf s. 34–46",
          `
          <p>Ved ortografisk projeksjon følger alle stråler samme retning. Ved perspektiv møtes de i øyet, og like store ting opptar mindre plass jo lenger unna de står. Med bildeplan z = n &lt; 0 får vi x<sub>plan</sub> = nx/z og y<sub>plan</sub> = ny/z ved formlike trekanter. Et <dfn>frustum</dfn> har seks grenseplan.</p>
          <p>For et symmetrisk frustum er l = −r og b = −t. Med vertikal synsvinkel θᵧ er t = |n| tan(θᵧ/2) og r = t · bredde/høyde. Oppgis horisontal vinkel θₓ, start med r = |n| tan(θₓ/2) og regn t = r / (bredde/høyde).</p>
          <p><strong>Eget eksempel etter bokas konvensjon.</strong> Velg n = −2, f = −6, horisontal synsvinkel 90° og bredde/høyde = 2. Da er r = 2 og t = 1. Sett diagonalleddene i x og y til n/r = −1 og n/t = −2. I z-raden brukes A = (n + f)/(f − n) = 2 og B = −2nf/(f − n) = 6. Siste rad gir w = z.</p>
          <p>For (1, 1, −4, 1) blir klippkoordinatene (−1, −2, −2, −4). Del x, y og z på w og få NDC = (0,25; 0,5; 0,5). Kontroller z: for nærplanet er (2 · (−2) + 6)/(−2) = −1, og for fjernplanet er (2 · (−6) + 6)/(−6) = +1. Den samlede matrisen fra objekt til klipprom er P V M.</p>`,
        ),
        del(
          "viewport",
          "Fra NDC til et utsnitt på skjermen",
          "Projections_and_Viewing_Transformations.pdf § 1.9, PDF s. 29 · CGVIZ_Chapter_4_2022.pdf s. 56–57 · Transformations.pdf § 1.6, PDF s. 21–24",
          `
          <p>NDC går fra −1 til +1. Finn først andelen langs hver akse: u = (x + 1)/2, v = (y + 1)/2. For et utsnitt med nedre venstre hjørne (100, 50), bredde 400 og høyde 200, gir NDC (0,25; 0,5) verdiene u = 0,625 og v = 0,75. Resultatet er (100 + 400 · 0,625; 50 + 200 · 0,75) = (350, 200).</p>
          <p>Her måles y oppover. Med bildefilens radnummer regnet nedover fra toppen av det samme utsnittet blir forskyvningen 200 · (1 − v) = 50. Konverter til en konkret pikselindeks først når oppgaven har definert prøvested og avrunding.</p>`,
        ),
      ],
      question:
        "Et kamera står på (0, 0, 5), ser langs −z og har +y opp. Hvor kommer verdenspunktet (2, 0, 1) i ECS, og hvor havner det på bildeplanet z = −2?",
      hint: "Trekk fra øyeposisjonen. Sammenlign så avstandene til punktet og bildeplanet.",
      answer:
        "Aksene sammenfaller, så ECS = (2, 0, 1 − 5) = (2, 0, −4). Skaler x og y med (−2)/(−4) = 1/2. Bildet på planet er (1, 0, −2).",
      terms: {
        "view-matrisen":
          "Matrisen som uttrykker et verdenspunkt i kameraets koordinatsystem.",
        frustum:
          "Synsvolumet mellom nær-, fjern- og de fire sideplanene. Med perspektiv er dette en avkortet pyramide.",
      },
    },
    {
      slug: "klipping",
      title: "Klipping og synlighet",
      intro:
        "Når et objekt går gjennom kanten av bildet, må geometrien kuttes. Synlighetstester kan dessuten fjerne arbeid for hele objekter eller skjulte fragmenter.",
      focus: [
        "Klipp et segment mot et rektangel og forklar fortegnene i Liang–Barsky.",
        "Spor hvilke hjørner en polygonklipper sender videre.",
        "Avgjør når en flate, et objekt eller et fragment kan forkastes.",
      ],
      sections: [
        del(
          "liang-barsky",
          "Klipp en linje med ett parameterintervall",
          "Rasterization.pdf § 1.8.1–1.8.2, PDF s. 38–44 · CGVIZ_Chapter_2_2023.pdf s. 62–63 og 68–73",
          `
          <p><dfn>Klipping</dfn> beholder delen av et primitiv som ligger innenfor alle grensene. Skriv et segment som P(t) = A + t(B − A), med 0 ≤ t ≤ 1. Hver grense i Liang–Barsky gir en ulikhet pᵢt ≤ qᵢ som snevrer inn intervallet.</p>
          <p>For venstre, høyre, nedre og øvre vegg er p = (−Δx, Δx, −Δy, Δy) og q = (x₀ − x<sub>min</sub>, x<sub>maks</sub> − x₀, y₀ − y<sub>min</sub>, y<sub>maks</sub> − y₀). Ved p &lt; 0 blir q/p en nedre grense. Ved p &gt; 0 blir den en øvre grense. Ved p = 0 forkastes segmentet hvis q &lt; 0, ellers setter denne veggen ingen ny grense.</p>
          <p><strong>Eksempel.</strong> Et horisontalt segment går fra (−2, 1) til (6, 1). Vinduet er [0, 4] × [0, 3]. Siden x(t) = −2 + 8t, krever venstre vegg t ≥ 2/8 og høyre vegg t ≤ 6/8. y = 1 oppfyller begge andre vegger. Resten av linjen har endepunkter P(¼) = (0, 1) og P(¾) = (4, 1).</p>
          <p>I pseudokode skal startgrensen oppdateres med maksimum av nedre grenser og sluttgrensen med minimum av øvre grenser. Når start &gt; slutt, er intervallet tomt. Likhet kan gi berøring i ett punkt.</p>`,
        ),
        del(
          "polygon",
          "Klipp et polygon, én kant om gangen",
          "Rasterization.pdf § 1.8.3, PDF s. 45–51 · CGVIZ_Chapter_2_2023.pdf s. 74–85 · TDT4195-ClassQuestions.pdf s. 7",
          `
          <p>Sutherland–Hodgman går langs det lukkede polygonet og klipper mot én halvplan om gangen for et konvekst klippevindu. For hvert rettet kantpar A → B gjelder fire regler. Inne → inne sender B. Inne → ute sender skjæringspunktet I. Ute → inne sender I og B. Ute → ute sender ingenting.</p>
          <p>Klipp trekanten A = (−1, 0), B = (1, 0), C = (1, 2) mot x ≥ 0. A → B sender (0, 0) og (1, 0). B → C sender (1, 2). C → A treffer veggen halvveis og sender (0, 1). Resultatet har fire hjørner. Disse er inngangen når neste vegg behandles.</p>
          <p>Prøv å linjeklippe hver av kantene til kvadratet [−5, 5]² mot [−1, 1]². Hver kant forsvinner, selv om hele det minste kvadratet ligger innenfor det store. Polygonklipping må også danne kontur langs selve klippevinduet.</p>
          <p>Greiner–Hormann kan også finne skjæringen mellom konkave polygoner. Sett inn skjæringspunktene i rekkefølge langs begge polygonenes kanter, koble de tilsvarende punktene og merk passeringene som inn eller ut. Følg grensebiter som tilhører skjæringen, og bytt polygon ved passeringene. Hver lukket vandring gir én kontur. Denne beskrivelsen av vandringen forutsetter tydelige kryss uten sammenfallende kanter.</p>`,
        ),
        del(
          "synlighet",
          "Forkast hele objekter eller test dybde per piksel",
          "CGVIZ__Pipeline-s-1.pdf § 1.2.2, 1.2.5 og 1.5.1, PDF s. 11–13, 20–21 og 28–30 · CGVIZ_Chapter_5_2026.pdf s. 20–23, 38 og 55–62",
          `
          <p>Ved <dfn>frustum culling</dfn> kan en omsluttende boks som ligger helt utenfor ett av synsvolumets plan, forkastes sammen med hele objektet. En boks som skjærer planet krever videre behandling. Klipping finner da de nye hjørnene.</p>
          <p>For et lukket, ugjennomsiktig objekt med konsekvent orienterte trekanter kan en forkaste baksider. Finn n = (B − A) × (C − A). La v peke fra flaten mot øyet. Hvis n · v &lt; 0, vender den utoverrettede normalen bort fra øyet. (0, 0, 1) · (0, 0, −3) = −3 gir bakside. Byttes to hjørner, skifter fortegnet.</p>
          <p>En <dfn>dybdebuffer</dfn> lagrer dybden til det nærmeste godkjente fragmentet. Med nær = −1 og fjern = +1 starter bufferverdien ved fjernplanet. En rød flate med z = 0,4 skrives, en blå med z = −0,2 overtar, og en grønn med z = 0,1 forkastes. Bildet blir blått. Ved en annen dybderepresentasjon kan større z bety nærmere. Oppgi alltid hvilken sammenligning som velger nærmest.</p>`,
        ),
      ],
      question:
        "Klipp P(t) = (−1 + 4t, 1 + 2t), 0 ≤ t ≤ 1, mot [0, 2] × [0, 2]. Hvilke to punkter beholder du?",
      hint: "Finn gyldig intervall for hver koordinat og ta snittet.",
      answer:
        "x krever ¼ ≤ t ≤ ¾. y krever −½ ≤ t ≤ ½. Sammen med [0, 1] blir intervallet [¼, ½]. Endepunktene er (0; 1,5) og (1; 2).",
      terms: {
        klipping:
          "Å beregne den delen av et primitiv som ligger innenfor et gitt område.",
        "frustum culling":
          "En test som kan forkaste hele objekter utenfor synsvolumet.",
        dybdebuffer:
          "En buffer som holder den hittil synlige dybden ved hvert prøvested.",
      },
    },
    {
      slug: "rasterisering",
      title: "Rasterisering og kantutjevning",
      intro:
        "Hjørnene til en trekant kan ha desimalkoordinater. Rasteriseringen må avgjøre hvilke diskrete prøver på skjermen trekanten dekker.",
      focus: [
        "Utfør en fortegnstest og oppdater kantfunksjoner med foroverdifferanser.",
        "Skjelne piksler valgt av linjerasterisering og rutenettgjennomgang.",
        "Tell prøver og skyggeberegninger i SSAA og MSAA.",
      ],
      sections: [
        del(
          "kantfunksjon",
          "Tre fortegn avgjør om punktet ligger i trekanten",
          "Rasterization.pdf § 1.5–1.6, PDF s. 14–23 · CGVIZ_Chapter_2_2023.pdf s. 25–28 og 36–40 · TDT4195-ClassQuestions.pdf s. 3–4",
          `
          <p>For kanten fra A til B definerer vi <dfn>kantfunksjon</dfn> F(P) = (Bₓ − Aₓ)(y − Aᵧ) − (Bᵧ − Aᵧ)(x − Aₓ). Den er positiv til venstre for den rettede kanten når x peker mot høyre og y opp. En trekant med hjørner mot klokken har det indre til venstre for alle tre kanter.</p>
          <p>A = (0, 0), B = (4, 0), C = (0, 3) gir F<sub>AB</sub> = 4y, F<sub>BC</sub> = 12 − 3x − 4y og F<sub>CA</sub> = 3x. Ved (1, 1) får vi (4, 5, 3). Alle er positive, så prøven er dekket. Ved (3, 2) får vi (8, −5, 9) og prøven er utenfor. På kanten gir én funksjon null. Ved delte kanter må tilordningen være konsekvent slik at én trekant eier prøven.</p>
          <p>For F = ax + by + c er F(x + 1, y) − F(x, y) = a. Ett steg opp gir b. Fra (1, 1) til (2, 1) endres de tre funksjonene med (0, −3, +3), og verdiene blir (4, 2, 6). For en boks med 30 prøvepunkter kan vi etter første punkt gå gjennom de øvrige 29 med tre addisjoner per enhetssteg. Det gir 87 addisjoner under denne tellemodellen, uavhengig av hvor mange prøver som består testen.</p>`,
        ),
        del(
          "linjer",
          "Linjer, skannlinjer og fylling",
          "Rasterization.pdf § 1.2–1.4 og § 1.6, PDF s. 5–13 og 16–24 · CGVIZ_Chapter_2_2023.pdf s. 4–24 og 29–42",
          `
          <p>En implisitt linje kan skrives ax + by + c = 0. En parametrisk linje mellom A og B er A + t(B − A). For å tegne en slak linje velger linjerasterisering én piksel per x-steg, nær den matematiske linjen. Ved bratt stigning tar vi ett y-steg om gangen. Rutenettgjennomgang registrerer alle celler som linjen passerer. Avklar regelen for berøring av et rutehjørne.</p>
          <p>Bresenham kan oppdatere et heltallsavvik. For (0, 0) til (6, 2) er Δx = 6, Δy = 2 og startavvik e = −3. Tegn (0, 0), øk x og legg 2 til e. Nå er e = −1, så neste prøve er (1, 0). Neste gang blir e = 1: øk y og trekk 6 fra e. Tegn (2, 1). Resten av prøvene blir (3, 1), (4, 1), (5, 2), (6, 2).</p>
          <p>For et enkelt polygon kan en vannrett stråle telle kantkryss. Et oddetall gir innside. På en skannlinje sorteres kryssene, og intervallene mellom første og andre, tredje og fjerde fylles. Bruk nedre y-endepunkt inklusivt og øvre eksklusivt, og hopp over horisontale kanter. Ved flomfylling følger en i stedet sammenhengende piksler fra et frø. Fire naboer deler kant, åtte naboer kan også dele et hjørne.</p>`,
        ),
        del(
          "antialiasing",
          "Tell dekning og fargeberegning hver for seg",
          "Rasterization.pdf § 1.7, PDF s. 25–27, 31–34 og 36–37 · CGVIZ_Chapter_2_2023.pdf s. 43–46, 51–55 og 60–61",
          `
          <p>En skrå kant ser trappet ut når hver piksel får én punktprøve. Catmulls idé er å klippe synlig geometri til pikselfirkanten og vekte fargen med faktisk areal. En annen metode anslår arealet med flere prøver. Med tre av fire hvite prøver over svart bakgrunn blir gjennomsnittet ¾.</p>
          <p><dfn>SSAA</dfn> beregner dekning, synlighet og farge ved hver delprøve. <dfn>MSAA</dfn> bruker også flere prøver for dekning og dybde, men kan dele én skyggeberegning innenfor samme primitiv og piksel. To forskjellige primitiver i én piksel kan derfor kreve to skyggeberegninger.</p>
          <p><strong>Kostnad.</strong> For 100 fullt dekkede piksler med ett primitiv hver, fire prøver, 25 % kostnad til dekning/dybde og 75 % til lys/tekstur: SSAA koster 100 · 4R = 400R. MSAA koster 100 · (4 · 0,25R + 0,75R) = 175R. Her er R kostnaden for én vanlig piksel. Fordelen blir mindre når flere primitiver må skygges per piksel.</p>
          <p>DLAA og DLSS bruker et lært nettverk til å rekonstruere bildet. DLAA sikter mot kantutjevning ved målbildets oppløsning. DLSS kan rekonstruere et bilde med høyere oppløsning fra lavere oppløste inngangsdata.</p>`,
        ),
      ],
      question:
        "For trekanten med kantfunksjoner 4y, 12 − 3x − 4y og 3x er verdiene (4, 2, 6) ved (2, 1). Hvilke verdier får du ett steg opp, og er punktet dekket?",
      hint: "Les av koeffisienten foran y i hver funksjon.",
      answer:
        "Endringene er (+4, −4, 0). Verdiene ved (2, 2) blir (8, −2, 6). Det andre fortegnet er negativt, så punktet ligger utenfor.",
      terms: {
        kantfunksjon:
          "En lineær funksjon med null på en rettet kant og motsatte fortegn på hver side.",
        SSAA: "Supersampling antialiasing. Bildet prøvetas og skygges ved høyere oppløsning før filtrering.",
        MSAA: "Multisampling antialiasing. Flere deknings- og dybdeprøver kan dele en beregnet farge.",
      },
    },
    {
      slug: "farge",
      title: "Farge og intensitet",
      intro:
        "Et fargetall får mening gjennom modellen det er angitt i. En skjerm legger sammen lys, mens trykkfarge absorberer deler av lyset.",
      focus: [
        "Beregn antall nivåer, bitdybde og minne for et ukomprimert bilde.",
        "Konverter mellom RGB, CMY og idealisert CMYK.",
        "Tolk kromatisitet, alfa og forskjellen mellom fysisk intensitet og opplevd lyshet.",
      ],
      sections: [
        del(
          "intensitet",
          "Fra en sansegrense til et antall biter",
          "color.pdf § 11.2, PDF s. 1–8 · CGVIZ_Chapter_11_2020.pdf s. 3–6 og 12–17 · TDT4195-ClassQuestions.pdf s. 1 og 18–20",
          `
          <p>Med d biter finnes 2<sup>d</sup> koder. I en modell der like <em>forskjeller</em> i intensitet oppfattes likt, teller vi endepunktene med: fra 10 til 34 med trinn på 3 får vi (34 − 10)/3 + 1 = 9 nivåer. Tre biter gir 8 koder, så vi trenger fire. To uavhengige kanaler med ni nivåer hver gir 9² = 81 kombinasjoner.</p>
          <p>For en modell med likt merkbare <em>forhold</em> mellom intensiteter bruker vi en geometrisk følge. Med minimum ¼, maksimum 1 og fem nivåer trenger vi fire hopp med forhold λ, så λ⁴ = 4 og λ = √2. Et bilde på 320 × 200 piksler med 24 biter per piksel krever 320 · 200 · 3 = 192 000 byte før kompresjon og uten metadata.</p>
          <p>Ved bitfordeling gir én ekstra bit dobbelt så mange koder. Anta at 14 biter skal fordeles mellom en intensitet med ni nivåer og to fargekanaler, der grønt trenger fire ganger så mange koder som rødt. Intensiteten trenger fire biter. For de ti andre gjelder g + r = 10 og 2ᵍ/2ʳ = 4, altså g − r = 2. Dermed g = 6 og r = 4. Kontroller 64/16 = 4.</p>
          <p>Halvtoning varierer dekningen av prikker for å simulere gråtoner. Feildiffusjon sender kvantiseringsfeilen e = ønsket − vist videre til naboer. I tre-nabovarianten på lysark 13 fordeles e som 3e/8, 3e/8 og e/4. For e = 8 blir dette 3, 3 og 2. Gammakorreksjon kompenserer for en ikke-lineær intensitetsrespons. Hvis skjermen gir L = v², må målet L = 0,25 kodes med v = √0,25 = 0,5.</p>`,
        ),
        del(
          "modeller",
          "Velg og regn mellom fargemodeller",
          "color.pdf § 11.3, PDF s. 9–20 · CGVIZ_Chapter_11_2020.pdf s. 18–26 og 30–49",
          `
          <p>I RGB gir rødt pluss grønt gult lys. I idealisert CMY absorberer cyan rødt, magenta grønt og gult blått. For normaliserte verdier får vi (C, M, Y) = (1 − R, 1 − G, 1 − B). I CMYK kan vi erstatte den felles komponenten med svart K = min(C, M, Y).</p>
          <p>RGB = (0,6; 0,4; 0,2) gir CMY = (0,4; 0,6; 0,8). Da er K = 0,4. De nye komponentene er (CMY − K)/(1 − K) kanalvis, altså (0; ⅓; ⅔). CMYK blir (0; ⅓; ⅔; 0,4). For helt svart settes CMY-andelene til null og K til 1.</p>
          <p>CIE XYZ er uavhengig av en bestemt skjerm. <dfn>Kromatisitet</dfn> tar ut intensitetsskalaen ved å dele på X + Y + Z. XYZ = (2, 3, 5) gir x = 0,2 og y = 0,3. For å finne lysnivået trenger vi også Y. HSV angir fargetone som en vinkel, metning som graden av farge og verdi som lyseste RGB-kanal. En nøytral gråtone har metning 0. Standardisert sRGB spesifiserer blant annet primærfargene, slik at tall kan tolkes konsistent.</p>`,
        ),
        del(
          "alfa",
          "Gjennomsiktighet og stort dynamisk område",
          "color.pdf § 11.3.4 og § 11.5, PDF s. 16 og 20–23 · CGVIZ_Chapter_11_2020.pdf s. 37–39 og 50–56",
          `
          <p>Med lineære fargeverdier og ugjennomsiktig bakgrunn er blandingen C = α C<sub>foran</sub> + (1 − α) C<sub>bak</sub>. En rød flate med α = 0,25 foran blått gir (0,25; 0; 0,75). Hvis begge har alfa, blir samlet alfa α₁ + (1 − α₁)α₂. Forhåndsmultiplisert farge inneholder allerede faktoren α.</p>
          <p>Dynamisk område er forholdet mellom høyeste og laveste positive intensitet. To eksponeringer kan gi signal i henholdsvis skygger og høylys og kombineres til et HDR-bilde. Tone mapping komprimerer området slik at både skyggene og høylysene blir synlige på en skjerm.</p>`,
        ),
      ],
      question:
        "Anta at en kanal kan skille hvert fjerde intensitetstrinn fra 8 til og med 40. Hvor mange nivåer og minst hvor mange biter krever det? Hva om bildet har tre slike uavhengige kanaler?",
      hint: "Tell intervaller først. Begge endepunktene representerer nivåer.",
      answer:
        "Det er (40 − 8)/4 = 8 intervaller, altså 9 nivåer og minst 4 biter per separat kodet kanal. Tre kanaler gir 9³ = 729 farger. Med egne felt på 4 biter blir det 12 biter per piksel. En samlet tett indeks over de 729 kombinasjonene trenger 10 biter.",
      terms: {
        Kromatisitet:
          "Fargens relative sammensetning uavhengig av en felles skalering av lysintensiteten.",
      },
    },
    {
      slug: "lys",
      title: "Belysning og skyggelegging",
      intro:
        "En rød kule kan få et hvitt høylys. Pikselfargen avhenger av lysretning, materiale, synsretning og hvor ofte belysningen beregnes.",
      focus: [
        "Tolk leddene i en oppgitt Phong-formel og regn intensiteten.",
        "Forklar hvilke egenskaper en lokal modell beskriver.",
        "Forutsi om et speilhøylys blir synlig ved flat shading, Gouraud eller Phong shading.",
      ],
      sections: [
        del(
          "phong",
          "Bygg lyset fra bidrag som kan beregnes",
          "Illumination.pdf § 1.1 og § 1.4, PDF s. 1–7 og 11–17 · CGVIZ_Chapter_12.pdf s. 1–5, 12–13 og 22–33",
          `
          <p>En <dfn>normal</dfn> peker vinkelrett ut fra overflaten. Med enhetsvektorer N ut fra flaten, L mot lyskilden og V mot øyet måler N · L hvor rett lyset treffer. Diffus refleksjon sprer lyset i mange retninger. Speilrefleksjon gir et høylys nær speilretningen. En <dfn>BRDF</dfn> beskriver hvordan innkommende belysning bidrar til utgående radians i en gitt retning.</p>
          <p>En enkel Phong-modell har egenutstråling Iₑ, bakgrunnslys kₐIₐ, diffust lys og speillys. For én belyst forside med refleksjonsvektor R = 2(N · L)N − L, prøv formelen I = Iₑ + kₐIₐ + Iₗ[k<sub>d</sub> max(0,N · L) + k<sub>s</sub> max(0,R · V)<sup>m</sup>]. Større m gjør høylyset smalere. Blinn-varianten bruker halvvektoren H = (L + V)/‖L + V‖ og N · H i speilleddet. Bruk varianten som står i oppgaven.</p>
          <p>La egenutstrålingen være 0, kₐIₐ = 0,1, Iₗ = 1, k<sub>d</sub> = 0,6, k<sub>s</sub> = 0,2, N · L = 0,5, R · V = 0,5 og m = 2. Da blir diffusandelen 0,6 · 0,5 = 0,30 og speilandelen 0,2 · 0,5² = 0,05. Total intensitet er 0,45. I farge regner vi kanalvis. Hvitt innfallende lys kan gi et hvitt speilbidrag på et farget materiale.</p>
          <p>Ru materialer har ofte et stort diffust og lite speilende bidrag. Blanke materialer kan ha stort speilbidrag og en høy eksponent for et smalt høylys. En kule med ensartet grunnfarge ser rund ut fordi normalene endrer seg langs overflaten. Hvis lysberegningen gir én felles faktor 0,5 for RGB, blir (0,8; 0,4; 0,2) til (0,4; 0,2; 0,1). Kanalforholdet 4 : 2 : 1 er bevart.</p>
          <p>Modellen er lokal: skygge fra et annet objekt krever en egen synlighetstest. Sjekk om avstandsfall, flere lyskilder eller egenutstråling står i den oppgitte formelen før du tillegger den disse egenskapene.</p>`,
        ),
        del(
          "interpolasjon",
          "Hva interpoleres gjennom trekanten?",
          "Illumination.pdf § 1.6.1–1.6.3, PDF s. 25–30 · CGVIZ_Chapter_12.pdf s. 55–64 · TDT4195-ClassQuestions.pdf s. 21–23",
          `
          <p>Flat shading bruker én representativ normal og intensitet for hele polygonet. Gouraud beregner intensitet i hjørnene og interpolerer den. Phong shading interpolerer normalene og normaliserer resultatet før en ny lysberegning ved prøven. Phong-modellen angir lysformelen, mens Phong shading bestemmer hvor den brukes.</p>
          <p>Ved midtpunktet på en kant med hjørneintensitet 0,2 og 0,6 gir Gouraud (0,2 + 0,6)/2 = 0,4. Hvis begge hjørnene ligger utenfor et smalt høylys, kan hele høylyset forsvinne. Ved Phong shading kan den interpolerte normalen ved midtpunktet treffe speilretningen og skape et høylys der.</p>`,
        ),
        del(
          "deferred",
          "Lysberegning etter synlighetstesten",
          "CGVIZ__Pipeline-s-1.pdf § 1.9, PDF s. 34 · CGVIZ_Chapter_5_2026.pdf s. 58 og 67",
          `
          <p>I <dfn>deferred shading</dfn> utfører første pass geometri- og dybdetester. En G-buffer lagrer data som normal og materiale for den synlige overflaten. I neste pass kan vi belyse de synlige prøvene. For én piksel som overtegnes fem ganger av ugjennomsiktige flater, trenger lyssteget bare data fra den nærmeste. Bufferen koster minne, og gjennomskinnelige lag krever at flere overflater bidrar.</p>`,
        ),
      ],
      question:
        "To hjørner langs en kant får begge intensitet 0,1. Midt på kanten står normalen slik at overflaten skal ha et kraftig speilhøylys. Hva får Gouraud der, og hvordan kan Phong shading gi et annet svar?",
      hint: "Følg hvilken størrelse som interpoleres i hvert tilfelle.",
      answer:
        "Gouraud gir ½ · 0,1 + ½ · 0,1 = 0,1. Phong shading interpolerer og normaliserer normalen. Hvis denne normalen gir R · V nær 1, kan speilleddet bli stort selv om begge hjørneintensitetene er små.",
      terms: {
        normal:
          "En vektor vinkelrett på en flate. I lysformler brukes vanligvis en enhetsnormal.",
        BRDF: "Bidirectional reflectance distribution function. Forholdet mellom differensiell reflektert radians og innfallende irradians for et retningspar.",
        "deferred shading":
          "Belysning utført i et eget pass med lagrede geometridata fra de synlige overflatene.",
      },
    },
  ];
})();
