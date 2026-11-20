# Pensumdekning · TDT4195 H26

Forelesningsplanene og forelesernes slides avgrenser stoffet. Avsnittenes konkrete regne- og tolkningsmål er faglige presiseringer av kursinformasjonens brede utbytter. Tabellen viser **fullt undervist** når studenten får både fremgangsmåte, eksempel og egen anvendelse for ferdigheten. **Delvis undervist** beskriver navngitte deler med mindre dybde. **Kildebegrenset** gjelder materiale hvor lokal dokumentasjon mangler. PDF-sider teller fra én; DIP4e bruker trykte sidetall. Tidligere eksamener og fasitstatus finnes i [eksamensanalysen](eksamensanalyse.md).

## Geometriske transformasjoner

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Regn med punkter, vektorer og basis](../tema.html?k=transformasjoner#vektorer). Regn ut enhetsvektor, lengde, basisrepresentasjon, skalarprodukt og flatenormal. | CGVIZ_Chapter_3_2022.pdf s. 2–17 og 72–80 · Transformations.pdf § 1.1–1.3 | Fullt undervist. |
| [Punkter, retninger og en ekstra koordinat](../tema.html?k=transformasjoner#koordinater). Homogene punkter, retninger og affine avbildninger. Les av en basis og en translasjon fra en matrise. | Transformations.pdf § 1.1–1.5, PDF s. 3–15 · CGVIZ_Chapter_3_2022.pdf s. 3–31 | Fullt undervist. |
| [Hva skjer først?](../tema.html?k=transformasjoner#rekkefolge). Skalering, translasjon, rotasjon, skjæring og speiling. Bygg og inverter sammensatte transformasjoner med kolonnevektorer. | CGVIZ_Chapter_3_2022.pdf s. 10–20, 26–31 og 48–55 · CGVIZ_Chapter_5_2026.pdf s. 12–19 | Fullt undervist. |
| [Rotasjon om et annet sentrum](../tema.html?k=transformasjoner#pivot). Roter eller skaler om et fast punkt. Kontroller resultatet med et invariant punkt. | Transformations.pdf § 1.6 og § 1.8, PDF s. 15–17 og 29–36 · CGVIZ_Chapter_3_2022.pdf s. 32–35 og 67–80 | Fullt undervist. |
| [Roter om en vilkårlig akse](../tema.html?k=transformasjoner#akse). Transformer til en lokal ortonormal basis for å rotere rundt en forskjøvet 3D-akse. | CGVIZ_Chapter_3_2022.pdf s. 66–80 · Transformations.pdf § 1.7 | Fullt undervist. |
| [Én matrise til alle hjørnene](../tema.html?k=transformasjoner#kostnad). Sammenlikn antall multiplikasjoner ved sammensetting og direkte anvendelse. | Transformations.pdf § 1.4 og § 1.12, PDF s. 10–12 og 46–47 · CGVIZ_Chapter_3_2022.pdf s. 18–20 | Fullt undervist. |

## Modellering og scenegrafer

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Følg ett primitiv gjennom grafikkprosessoren](../tema.html?k=scenegrafer#pipeline). Primitiver, indekser, attributter og grafikkpipeline. Følg data fra lokal geometri til fragment og synlig piksel. | CGVIZ_Chapter_1_2026.pdf s. 1–31 · CGVIZ_Chapter_5_2026.pdf s. 3–9, 12–23 og 55–62 | Fullt undervist. |
| [Fra lokal geometri til verden](../tema.html?k=scenegrafer#hierarki). Modellering med scenegraf. Akkumuler foreldretransformasjoner uten å påvirke søsken. | SceneGraphs.pdf § 9.1–9.2, PDF s. 1–5 · CGVIZ_Chapter_9_2020.pdf s. 2–12 | Fullt undervist. |
| [Se ett objekt fra et annet](../tema.html?k=scenegrafer#referanse). Bytt mellom lokale referanserammer, objektrom og verden. | CGVIZ_Chapter_9_2020.pdf s. 8–12 · SceneGraphs.pdf § 9.2, PDF s. 4–6 | Fullt undervist. |

## Kamera og projeksjon

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Verden sett fra kameraet](../tema.html?k=kamera#view). Utled verdens-til-øye-matrisen fra øye, blikk og opp. Kontroller fortegn og ortonormalitet. | Projections_and_Viewing_Transformations.pdf § 1.5, PDF s. 16–17 · CGVIZ_Chapter_4_2022.pdf s. 25–33 | Fullt undervist. |
| [Fra synspyramide til bilde](../tema.html?k=kamera#perspektiv). Ortografisk og perspektivisk projeksjon, frustum, klipprom, signert dybde, homogen divisjon og NDC. | Projections_and_Viewing_Transformations.pdf § 1.2 og § 1.6, PDF s. 5–10 og 18–23, likn. 1.13 · CGVIZ_Chapter_4_2022.pdf s. 34–46 | Fullt undervist. |
| [Finn projeksjonen på et plan](../tema.html?k=kamera#planprojeksjon). Utled parallell og sentral projeksjon ved å skjære en stråle med et plan. | CGVIZ_Chapter_4_2022.pdf s. 10–21 · Projections_and_Viewing_Transformations.pdf § 1.2 | Fullt undervist. |
| [Fra NDC til et utsnitt på skjermen](../tema.html?k=kamera#viewport). Transformer mellom vindu, normaliserte koordinater og viewport. Håndter opp/ned-retning. | Projections_and_Viewing_Transformations.pdf § 1.9, PDF s. 29 · CGVIZ_Chapter_4_2022.pdf s. 56–57 · Transformations.pdf § 1.6, PDF s. 21–24 | Fullt undervist. |

## Klipping og synlighet

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Klipp en linje med ett parameterintervall](../tema.html?k=klipping#liang-barsky). Klipp et linjesegment parametrisk, inkludert parallelle linjer og tomt parameterintervall. | Rasterization.pdf § 1.8.1–1.8.2, PDF s. 38–44 · CGVIZ_Chapter_2_2023.pdf s. 62–63 og 68–73 | Fullt undervist. |
| [Klipp et polygon, én kant om gangen](../tema.html?k=klipping#polygon). Bruk Sutherland–Hodgmans inn-/utpasseringer og bevar riktig kantrekkefølge. | Rasterization.pdf § 1.8.3, PDF s. 45–51 · CGVIZ_Chapter_2_2023.pdf s. 74–85 · TDT4195-ClassQuestions.pdf s. 7 | Fullt undervist. |
| [Spor skjæringskonturer mellom to polygoner](../tema.html?k=klipping#konkav). Greiner–Hormann: bygg koblede kantlister, merk kryss, spor flere konturer og håndter null kryss. | CGVIZ_Chapter_2_2023.pdf s. 81–85 · Rasterization.pdf § 1.8.3 | Fullt undervist. |
| [Forkast hele objekter eller test dybde per piksel](../tema.html?k=klipping#synlighet). Skill konservativ frustumtest, baksidefjerning og skjulte flater. Spor z-bufferet i tegnerekkefølge. | CGVIZ__Pipeline-s-1.pdf § 1.2.2, 1.2.5 og 1.5.1, PDF s. 11–13, 20–21 og 28–30 · CGVIZ_Chapter_5_2026.pdf s. 20–23, 38 og 55–62 | Fullt undervist. |

## Rasterisering og kantutjevning

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Tre fortegn avgjør om punktet ligger i trekanten](../tema.html?k=rasterisering#kantfunksjon). Test en trekants prøvepunkter med kantfunksjoner, orientering og første differanser. | Rasterization.pdf § 1.5–1.6, PDF s. 14–23 · CGVIZ_Chapter_2_2023.pdf s. 25–28 og 36–40 · TDT4195-ClassQuestions.pdf s. 3–4 | Fullt undervist. |
| [Evaluer en kurve inkrementelt](../tema.html?k=rasterisering#implisitt). Sammenlikn parametrisk og implisitt kurve. Evaluer sirkelens implisitte funksjon inkrementelt. | CGVIZ_Chapter_2_2023.pdf s. 5–15 · Rasterization.pdf § 1.3–1.4 | Fullt undervist. |
| [Linjer, skannlinjer og fylling](../tema.html?k=rasterisering#linjer). Rasteriser en linje med aksevalg, avrunding og Bresenhams heltallsbeslutning. | Rasterization.pdf § 1.2–1.4 og § 1.6, PDF s. 5–13 og 16–24 · CGVIZ_Chapter_2_2023.pdf s. 4–24 og 29–42 | Fullt undervist. |
| [Fyll et polygon én skannelinje om gangen](../tema.html?k=rasterisering#skannelinje). Skannelinjefylling med paritet, ET/AET og hjørneregler. Sammenlikn med frøfylling. | CGVIZ_Chapter_2_2023.pdf s. 29–35 og 41–42 · Rasterization.pdf § 1.6 | Fullt undervist. |
| [Tell dekning og fargeberegning hver for seg](../tema.html?k=rasterisering#antialiasing). Arealdekning (Catmull), delprøver, SSAA og MSAA. Forklar rekonstruksjon med DLAA og DLSS. | Rasterization.pdf § 1.7, PDF s. 25–27, 31–34 og 36–37 · CGVIZ_Chapter_2_2023.pdf s. 43–46, 51–55 og 60–61 | Fullt undervist for målet i denne raden. |

## Farge og intensitet

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Fra en sansegrense til et antall biter](../tema.html?k=farge#intensitet). Tell intensitetsnivåer, velg bitdybde og fordel kanalbiter. Forklar logaritmisk oppfatning, halvtone, feildiffusjon og gammakorreksjon. | color.pdf § 11.2, PDF s. 1–8 · CGVIZ_Chapter_11_2020.pdf s. 3–6 og 12–17 · TDT4195-ClassQuestions.pdf s. 1 og 18–20 | Fullt undervist for målet i denne raden. |
| [Følg avrundingsfeilen gjennom bildet](../tema.html?k=farge#feildiffusjon). Spor kvantiseringsfeil, fortegn og nabovekter gjennom to rader. | CGVIZ_Chapter_11_2020.pdf s. 6 og 12–17 · color.pdf § 11.2 | Fullt undervist. |
| [Fra spektrum til fargerom](../tema.html?k=farge#fargesyn). Spektrum, tapprespons, fargelikhet og gamut. Skille luminans og kromatisitet. | CGVIZ_Chapter_11_2020.pdf s. 18–26 og 30–37 · color.pdf § 11.2–11.3 | Fullt undervist. |
| [Velg og regn mellom fargemodeller](../tema.html?k=farge#modeller). Konverter mellom idealisert RGB og CMY. Tolke HSV, CIE XYZ, kromatisitet og enhetsavhengighet. | color.pdf § 11.3, PDF s. 9–20 · CGVIZ_Chapter_11_2020.pdf s. 18–26 og 30–49 | Fullt undervist. |
| [Bytt mellom RGB og CMYK](../tema.html?k=farge#trykk). Trekk ut svart ved omregning til CMYK og kontroller det svarte grensetilfellet. | CGVIZ_Chapter_11_2020.pdf s. 42–49 · color.pdf § 11.3 | Fullt undervist. |
| [Bevar høylys og skygger](../tema.html?k=farge#hdr). Velg målinger fra flere eksponeringer og beregn dynamisk område, tone mapping og LogLuv-bitfordeling. | CGVIZ_Chapter_11_2020.pdf s. 50–56 · color.pdf § 11.5 | Fullt undervist. |
| [Gjennomsiktighet og stort dynamisk område](../tema.html?k=farge#alfa). Komponer lineære farger i rekkefølge, tolk forhåndsmultiplisert alfa, HDR, eksponering og tone mapping. | color.pdf § 11.3.4 og § 11.5, PDF s. 16 og 20–23 · CGVIZ_Chapter_11_2020.pdf s. 37–39 og 50–56 | Fullt undervist for målet i denne raden. |

## Belysning og skyggelegging

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Skill belysning, materiale og betraktningsretning](../tema.html?k=lys#reflektans). Skill lys, tekstur, materiale, synsretning og BRDF. Sammenlikn direkte og indirekte belysning. | CGVIZ_Chapter_12.pdf s. 1–5, 12–13 og 22–33 · Illumination.pdf § 1.4 og 1.6 | Fullt undervist. |
| [Bygg lyset fra bidrag som kan beregnes](../tema.html?k=lys#phong). Beregn emissiv, ambient, diffus og speilende komponent. Skill refleksjons- og halvvektor, lyskilder og avstandsfall. | Illumination.pdf § 1.1 og § 1.4, PDF s. 1–7 og 11–17 · CGVIZ_Chapter_12.pdf s. 1–5, 12–13 og 22–33 | Fullt undervist. |
| [Hva interpoleres gjennom trekanten?](../tema.html?k=lys#interpolasjon). Sammenlikn flat, Gouraud og Phong-shading ved hjørner og indre prøver. | Illumination.pdf § 1.6.1–1.6.3, PDF s. 25–30 · CGVIZ_Chapter_12.pdf s. 55–64 · TDT4195-ClassQuestions.pdf s. 21–23 | Fullt undervist. |
| [Lysberegning etter synlighetstesten](../tema.html?k=lys#deferred). Beskriv geometripass, dybdetest, G-buffer og lyspass. Regn på minnebehov og lysarbeid. | CGVIZ__Pipeline-s-1.pdf § 1.9, PDF s. 34 · CGVIZ_Chapter_5_2026.pdf s. 58 og 67 | Fullt undervist. |

## Fra lys til histogram

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Bildeplan, dybde og piksler](../tema.html?k=intensitet#bildedannelse). Forklar lys, sensor og syn; bruk hullkamera, sampling, kvantisering, romlig oppløsning og stereodisparitet. | L1-T0-b_Intro, PDF s. 4–8 og 12–36. Gonzalez og Woods (DIP4e), kap. 2.1–2.4, s. 48–80. | Fullt undervist. |
| [Les kurven fra inngang til utgang](../tema.html?k=intensitet#punktoperator). Negativ, kontrast og intensitetskurver, gamma og normalisering. Les inn- og utverdi. | L1-T1-a_Spatial-Intuition, PDF s. 8–21. L1-T1-b_Spatial-IntensityTransf, PDF s. 2–7. DIP4e, kap. 3.2. | Fullt undervist. |
| [Utjevn et lite bilde for hånd](../tema.html?k=intensitet#histogram). Beregn histogram, sannsynligheter, CDF og diskret utjevning; kontroller avrunding og utgangshistogram. | L1-T1-a_Spatial-Intuition, PDF s. 22–32. L1-T1-b_Spatial-IntensityTransf, PDF s. 23–29. DIP4e, kap. 3.3, s. 133–153. | Fullt undervist. |

## Filtre i bilderommet

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Legg kjernen riktig vei](../tema.html?k=filtrering#kjerne). Nabofiltrering, lineær vektsum, impulsrespons, korrelasjon, konvolusjon, orientering, padding og valid-grense. | L1-T1-c_Spatial-Filter-Intro, PDF s. 3–12. L3-T3-a_Filtering_Average, PDF s. 75–87. L3-T3-b_Filtering_Diff, PDF s. 12–14. DIP4e, kap. 3.4. | Fullt undervist. |
| [Finn et mønster med normalisert korrelasjon](../tema.html?k=filtrering#malsok). Beregn nullmiddel-normalisert krysskorrelasjon og tolk et kart over malrespons. | L3-T3-a_Filtering_Average, PDF s. 142–151 · L3-T3-b_Filtering_Diff s. 16–18 | Fullt undervist. |
| [Støy, median og Gauss](../tema.html?k=filtrering#utjevning). Velg middel-, Gauss- eller medianfilter med hensyn til støy, kanter, linearitet og normalisering. | L3-T3-a_Filtering_Average, PDF s. 21–53, 93–100 og 135–141. DIP4e, kap. 3.5, s. 164–175. | Fullt undervist. |
| [Faktoriser en filterkjerne](../tema.html?k=filtrering#separabel). Faktoriser en separabel kjerne og regn to 1D-pass med kompatibel randregel. | L3-T3-a_Filtering_Average, PDF s. 93–101 · DIP4e § 3.4–3.5 | Fullt undervist. |
| [Finn en kant ved to ulike deriverte](../tema.html?k=filtrering#gaussderivert). Forklar derivasjon av gaussglattet signal, skalavalg og nullkryssing. | L3-T3-b_Filtering_Diff, PDF s. 74–88 og 108–113 · L6-T6-a_Segmentation, PDF s. 23–26 | Fullt undervist. |
| [Skille en kant fra en topp](../tema.html?k=filtrering#derivasjon). Første og andre differanser, Sobel, gradientretning og -magnitude, Laplace, demping av støy og skjerping. | L3-T3-b_Filtering_Diff, PDF s. 25–30, 86–101 og 105–112. DIP4e, kap. 3.6. | Fullt undervist for målet i denne raden. |

## Fourier og frekvensfiltrering

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Les et spekter og regn en DFT](../tema.html?k=frekvens#spektrum). Beregn kompleks 1D- og 2D-DFT, DC, frekvensindeks, magnitude og invers normalisering. | L5-T5-a_Frequency, PDF s. 4–9, 17–26 og 32–39. DIP4e, kap. 4.4–4.6. | Fullt undervist. |
| [Del en DFT i partalls- og oddetallsprøver](../tema.html?k=frekvens#fft). Utfør et radix-2-steg, tolk faseforskyvning og sammenlikn FFT-regnearbeid med direkte DFT. | L5-T5-a_Frequency, PDF s. 32–39 · DIP4e § 4.4 | Fullt undervist. |
| [Fra bilde til maske og tilbake](../tema.html?k=frekvens#frekvensfilter). Anvend konvolusjonsteoremet, sentrering og invers transform. Skill lineær og sirkulær konvolusjon. | L5-T5-a_Frequency, PDF s. 40–51. L6-T6-a_Segmentation, PDF s. 6–9. DIP4e, kap. 4.7, fra s. 260. | Fullt undervist. |
| [Velg maske ut fra spekteret](../tema.html?k=frekvens#frekvensmasker). Velg lavpass, høypass eller notch-filter; relater radius, orden, ringing og symmetriske topper til bildeinnhold. | L5-T5-a_Frequency, PDF s. 47–54 og 98–108 · DIP4e kap. 4 | Fullt undervist. |
| [Prøvetaking og rask beregning](../tema.html?k=frekvens#aliasing). Bruk prøverate, Nyquist-grense, aliasfrekvens og lavpass før nedprøving. | L5-T5-a_Frequency, PDF s. 52–62. DIP4e, kap. 4.3, s. 215–225 og kap. 4 om FFT. | Fullt undervist. |

## Segmentering og konturer

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Spor en svak kant](../tema.html?k=segmentering#canny). Glatting, gradient, ikke-maksimum-undertrykking, dobbel terskel og hysterese. | L6-T6-a_Segmentation, PDF s. 15–38. DIP4e, kap. 10.2. | Fullt undervist. |
| [Stem på en geometrisk form](../tema.html?k=segmentering#hough). La kantpunkter stemme på linjer, tolk normalparametere og oppløsning i akkumulatoren. | L6-T6-a_Segmentation, PDF s. 39–64. DIP4e, kap. 10.2 om Hough-transformen. | Fullt undervist. |
| [Fra linjestemmer til sirkelstemmer](../tema.html?k=segmentering#sirkel). Finn sirkel ved kjente eller ukjente radier; avgrens sentrumsstemmer med kantnormal. | L6-T6-a_Segmentation, PDF s. 46–60 | Fullt undervist. |
| [Velg terskel med histogrammet](../tema.html?k=segmentering#terskel). Global terskling og Otsus mellomklassevarians. Håndter tom klasse og likhet ved terskel. | L6-T6-a_Segmentation, PDF s. 75–87. DIP4e, kap. 10.3–10.4, fra s. 742. | Fullt undervist. |
| [Del og slå sammen regioner](../tema.html?k=segmentering#del-og-sla-sammen). Del regioner rekursivt etter et predikat; avgjør når naboregioner kan slås sammen. | L6-T6-a_Segmentation, PDF s. 88–95 · lecture_plan_IP.txt, DIP4e § 10.4 | Fullt undervist. |
| [Hold orden på fronten](../tema.html?k=segmentering#regionvekst). Velg frø, intensitetskriterium, besøksrekkefølge og 4-/8-naboskap. | L6-T6-a_Segmentation, PDF s. 94–104. DIP4e, kap. 10.4, fra s. 764. | Fullt undervist. |

## Morfologi og form

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Passform, treff og rekkefølge](../tema.html?k=morfologi#erosjon-dilasjon). Binær mengdelære, translasjon og refleksjon av strukturelement. Beregn erosjon, dilasjon, åpning og lukking. | L7-T7-a_Morphology-compressed, PDF s. 6–22. DIP4e, kap. 9.1–9.3, s. 636–648. | Fullt undervist. |
| [Indre og ytre rand](../tema.html?k=morfologi#rand). Finn indre og ytre rand som mengdedifferanser. Tolk hull og kanteffekter. | L7-T7-a_Morphology-compressed, PDF s. 24–26. DIP4e, kap. 9.5, fra s. 652. | Fullt undervist. |
| [Gjenskap en sammenhengende komponent](../tema.html?k=morfologi#rekonstruksjon). Bruk gjentatt geodetisk dilasjon med markør og maske til stabilitet. | L7-T7-a_Morphology-compressed, PDF s. 26–27. DIP4e, kap. 9.5–9.6, s. 652–673. | Fullt undervist. |
| [Fyll et hull ved begrenset vekst](../tema.html?k=morfologi#hull). Fyll ett eller flere hull ved å rekonstruere i komplementet med valgt konnektivitet. | L7-T7-a_Morphology-compressed, PDF s. 24–31 · DIP4e § 9.5–9.6 | Fullt undervist. |
| [Merk objektene med to gjennomløp](../tema.html?k=morfologi#komponenter). Merk sammenhengende komponenter med to gjennomløp og ekvivalenstabell. | L7-T7-a_Morphology-compressed, PDF s. 143–165 | Fullt undervist. |
| [Gjenkjenn en form og finn dens skjelett](../tema.html?k=morfologi#formtreff). Hit-or-miss, forgrunns- og bakgrunnsmaler, tynning og skjelett som representasjon av form. | L7-T7-a_Morphology-compressed, PDF s. 38–68 og 174–175. DIP4e, kap. 9.4–9.5. | Fullt undervist for målet i denne raden. |
| [Bygg skjelettet lagvis og rekonstruer formen](../tema.html?k=morfologi#skjelett). Beregn skjelettlag og rekonstruer objektet med gjentatte dilasjoner. | L7-T7-a_Morphology-compressed, PDF s. 64–67 og 175 · DIP4e § 9.5 | Fullt undervist. |
| [Segmenter ved vannskille](../tema.html?k=morfologi#vannskille). Bruk gradient som landskap, minima og markører som bassenger; tolk oversegmentering. | L7-T7-a_Morphology-compressed, PDF s. 69–72 | Fullt undervist. |
| [Flytt minimum og maksimum](../tema.html?k=morfologi#graatone). Beregn flat og ikke-flat gråtonemorfologi med refleksjon, minimum, maksimum og eksplisitt anker. | L7-T7-a_Morphology-compressed, PDF s. 28–37 og 176–193. DIP4e, kap. 9.8, fra s. 674. | Fullt undervist. |

## Fullt tilkoblede nettverk

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Fra merkede eksempler til generalisering](../tema.html?k=nevrale-nett#trening). Veiledet innlæring, tap, datasettoppdeling, generalisering og overtilpasning. | L03a_DL-Intro, PDF s. 52–66 og 88–90 · lecture_plan_IP.txt, FCNN | Fullt undervist. |
| [Fra inndata til tap](../tema.html?k=nevrale-nett#forover). Beregn FCNN-lag med vektmatriser, bias, ReLU, sigmoid og tapsfunksjon. | L03a_DL-Intro, PDF s. 45–60. L03b_FCNNs-FBPass, PDF s. 5–18 og 60–80. DLFund_Examples_1-Pre-FCNNs, PDF s. 2 og 2-Post-FCNNs, PDF s. 2–3. | Fullt undervist. |
| [Følg kjerneregelen baklengs](../tema.html?k=nevrale-nett#bakover). Bruk kjerneregelen baklengs, summer gradientbidrag og oppdater vekter og bias. | L03b_FCNNs-FBPass, PDF s. 20–50 og 88–99. DLFund_Examples_2-Post-FCNNs, PDF s. 4–8. | Fullt undervist. |
| [Lær fra flere eksempler](../tema.html?k=nevrale-nett#minibatch). Beregn korrekt gradient for batch og middelverditap. | L03a_DL-Intro, PDF s. 54–66. DLFund_Examples_1-Pre-FCNNs, PDF s. 4 og 2-Post-FCNNs, PDF s. 7–8. | Fullt undervist. |

## Konvolusjonsnettverk

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Beregn utgangens størrelse](../tema.html?k=cnn#form). Regn ut CNN-form med filter, kanaler, stride, padding, pooling og utflating. | L03c_CNNs-FPass, PDF s. 20–35, 54–79 og 131–139. | Fullt undervist. |
| [Tell lagrede vekter og utført arbeid](../tema.html?k=cnn#parametere). Tell parametere og multiplikasjoner med vektdeling og kanalblanding. | L03c_CNNs-FPass, PDF s. 65–81 og 133–142. | Fullt undervist. |
| [Beregn respons, aktivering og klasseskår](../tema.html?k=cnn#respons). Følg et CNN-fremoverpass med flerkanalsfilter, bias, aktivering, matriseform og klasseskår. | L03c_CNNs-FPass, PDF s. 36–61 og 145–154. DLFund_Examples_3-Pre-CNNs, PDF s. 5–7 og 4-Post-CNNs, PDF s. 9–13. | Fullt undervist. |

## Vision Transformer

| Læringsmål og leksjon | Kilde | Dekning |
|---|---|---|
| [Gjør bildet til en sekvens](../tema.html?k=transformer#patcher). Del et bilde i fliser, projiser dem til tokener og legg til posisjonsinformasjon og klassetoken. | L03d_ViTs-FPass, PDF s. 50–59. DLFund_Examples_5-Pre-ViTs, PDF s. 8–10 og 6-Post-ViTs, PDF s. 14–17. | Fullt undervist. |
| [Fra Q, K og V til én ny token](../tema.html?k=transformer#oppmerksomhet). Beregn Q, K, V, skalerte skalarprodukter, radvis softmax og vektet verdi. | L03d_ViTs-FPass, PDF s. 25–45. DLFund_Examples_5-Pre-ViTs, PDF s. 11–13 og 6-Post-ViTs, PDF s. 18–22. | Fullt undervist. |
| [Følg tokenene gjennom en enkoderblokk](../tema.html?k=transformer#blokk). Følg flere hoder, utgangsprojeksjon, LayerNorm, restforbindelser og tokenvis MLP. | L03d_ViTs-FPass, PDF s. 20–45 og 50–59 · DLFund_Examples_6-Post-ViTs, PDF s. 14–26 | Fullt undervist. |
| [Les ut klassen](../tema.html?k=transformer#klassifikasjon). Les klassetoken, beregn logits, klassesannsynligheter og kryssentropi. | L03d_ViTs-FPass, PDF s. 50–59. DLFund_Examples_5-Pre-ViTs, PDF s. 14–16 og 6-Post-ViTs, PDF s. 23–26. | Fullt undervist. |

## Kursutbytte, laboratorier og kildemangler

| Utbytte i course_information.txt og planer | Hvor det øves | Dekning |
|---|---|---|
| Kunnskap om prinsipper og algoritmer i bildesyntese og bildeanalyse | [Bildesyntese](../tema.html?k=scenegrafer#pipeline) og [bildeanalyse](../tema.html?k=segmentering#regionvekst), utdypet i tabellene ovenfor | Status er angitt per metode. |
| Programmering i grafikk og bildebehandling, OpenGL med C/C++ eller Rust og bildebehandling med Python | [Transformasjonskjede](../tema.html?k=scenegrafer#hierarki), [pikselberegning](../tema.html?k=filtrering#kjerne) og [komponentmerking](../tema.html?k=morfologi#komponenter) | Delvis undervist. Studenten trener på algoritmene og mellomresultatene. Praktisk kodearbeid og vurdering gjennomføres i fagets laboratorier. |
| Generell kompetanse til å anvende og videreutvikle visuelle metoder | [Metodevalg ved filtrering](../tema.html?k=filtrering#utjevning) og [modellvalg på nye bilder](../tema.html?k=nevrale-nett#trening) | Delvis undervist. Regne- og tolkningsøvingene dekker avgrensede problemer. En selvstendig større anvendelse inngår i det praktiske arbeidet. |
| CG-introduksjon 17.8. og ARM-gjesteforelesning 28.9. | [Primitiver og pipeline](../tema.html?k=scenegrafer#pipeline) bygger på de tilgjengelige CGVIZ-kapitlene. | Kildebegrenset for separat TDT4195-2026_info og ARM-foredraget. |
| UDL som støttelitteratur til FCNN, CNN og transformere | [Nettverk](../tema.html?k=nevrale-nett#forover), [CNN](../tema.html?k=cnn#form), [ViT](../tema.html?k=transformer#oppmerksomhet) | Selve UDL-boka mangler lokalt. Undervisningen bygger på H26-slidene og seks lokale eksempelfiler. |

Historiske eksempler, demonstrasjonsbilder og programvareutskrifter brukes som illustrasjoner av metoden de tilhører. Tabellen teller læringsmål, ikke enkeltstående figurer. H24 nr. 3 og H25 nr. 2 og 13 har oppgavespesifikk usikkerhet beskrevet i eksamensanalysen.
