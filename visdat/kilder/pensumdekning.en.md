# Syllabus coverage · TDT4195 H26

The lecture plans and lecturers’ slides define the scope. The sections’ specific calculation and interpretation objectives are educational interpretations of the course information’s broad outcomes. The table says **fully taught** when a student receives a procedure, example and independent application of the skill. **Partially taught** identifies named areas covered in less depth. **Source-limited** means local documentation is missing. PDF pages are one-based; DIP4e uses printed page numbers. Past exams and answer status are in the [exam analysis](eksamensanalyse.en.md).

## Geometric transformations

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Working with points, vectors and bases](../tema.html?k=transformasjoner#vektorer). Calculate unit vectors, lengths, basis representations, dot products and surface normals. | CGVIZ_Chapter_3_2022.pdf p. 2–17 and 72–80 · Transformations.pdf § 1.1–1.3 | Fully taught. |
| [Points, directions and an extra coordinate](../tema.html?k=transformasjoner#koordinater). Homogeneous points, directions and affine mappings. Read a basis and translation from a matrix. | Transformations.pdf § 1.1–1.5, PDF p. 3–15 · CGVIZ_Chapter_3_2022.pdf p. 3–31 | Fully taught. |
| [Which operation comes first?](../tema.html?k=transformasjoner#rekkefolge). Scaling, translation, rotation, shear and reflection. Construct and invert composite transformations using column vectors. | CGVIZ_Chapter_3_2022.pdf p. 10–20, 26–31 and 48–55 · CGVIZ_Chapter_5_2026.pdf p. 12–19 | Fully taught. |
| [Rotation about a different centre](../tema.html?k=transformasjoner#pivot). Rotate or scale about a fixed point. Check the result using an invariant point. | Transformations.pdf § 1.6 and § 1.8, PDF p. 15–17 and 29–36 · CGVIZ_Chapter_3_2022.pdf p. 32–35 and 67–80 | Fully taught. |
| [Rotating about an arbitrary axis](../tema.html?k=transformasjoner#akse). Transform into a local orthonormal basis to rotate about a displaced 3D axis. | CGVIZ_Chapter_3_2022.pdf p. 66–80 · Transformations.pdf § 1.7 | Fully taught. |
| [One matrix for all the vertices](../tema.html?k=transformasjoner#kostnad). Compare multiplication counts for composition and direct application. | Transformations.pdf § 1.4 and § 1.12, PDF p. 10–12 and 46–47 · CGVIZ_Chapter_3_2022.pdf p. 18–20 | Fully taught. |

## Modelling and scene graphs

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Tracing a primitive through the graphics processor](../tema.html?k=scenegrafer#pipeline). Primitives, indices, attributes and the graphics pipeline. Trace data from local geometry to fragments and visible pixels. | CGVIZ_Chapter_1_2026.pdf p. 1–31 · CGVIZ_Chapter_5_2026.pdf p. 3–9, 12–23 and 55–62 | Fully taught. |
| [From local geometry to the world](../tema.html?k=scenegrafer#hierarki). Model using a scene graph. Accumulate parent transformations without affecting siblings. | SceneGraphs.pdf § 9.1–9.2, PDF p. 1–5 · CGVIZ_Chapter_9_2020.pdf p. 2–12 | Fully taught. |
| [Viewing one object from another](../tema.html?k=scenegrafer#referanse). Switch between local reference frames, object space and world space. | CGVIZ_Chapter_9_2020.pdf p. 8–12 · SceneGraphs.pdf § 9.2, PDF p. 4–6 | Fully taught. |

## Camera and projection

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [The world as seen from the camera](../tema.html?k=kamera#view). Derive the world-to-eye matrix from eye, viewing direction and up. Check signs and orthonormality. | Projections_and_Viewing_Transformations.pdf § 1.5, PDF p. 16–17 · CGVIZ_Chapter_4_2022.pdf p. 25–33 | Fully taught. |
| [From the viewing pyramid to the image](../tema.html?k=kamera#perspektiv). Orthographic and perspective projection, frustum, clip space, signed depth, homogeneous division and NDC. | Projections_and_Viewing_Transformations.pdf § 1.2 and § 1.6, PDF p. 5–10 and 18–23, eq. 1.13 · CGVIZ_Chapter_4_2022.pdf p. 34–46 | Fully taught. |
| [Finding a projection onto a plane](../tema.html?k=kamera#planprojeksjon). Derive parallel and central projection by intersecting a ray with a plane. | CGVIZ_Chapter_4_2022.pdf p. 10–21 · Projections_and_Viewing_Transformations.pdf § 1.2 | Fully taught. |
| [From NDC to a viewport](../tema.html?k=kamera#viewport). Transform between window, normalised coordinates and viewport. Handle upward/downward orientation. | Projections_and_Viewing_Transformations.pdf § 1.9, PDF p. 29 · CGVIZ_Chapter_4_2022.pdf p. 56–57 · Transformations.pdf § 1.6, PDF p. 21–24 | Fully taught. |

## Clipping and visibility

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Clipping a line with one parameter interval](../tema.html?k=klipping#liang-barsky). Clip a line segment parametrically, including parallel lines and empty parameter intervals. | Rasterization.pdf § 1.8.1–1.8.2, PDF p. 38–44 · CGVIZ_Chapter_2_2023.pdf p. 62–63 and 68–73 | Fully taught. |
| [Clipping a polygon one boundary at a time](../tema.html?k=klipping#polygon). Apply Sutherland–Hodgman entry/exit cases and retain correct edge order. | Rasterization.pdf § 1.8.3, PDF p. 45–51 · CGVIZ_Chapter_2_2023.pdf p. 74–85 · TDT4195-ClassQuestions.pdf p. 7 | Fully taught. |
| [Tracing intersection contours between two polygons](../tema.html?k=klipping#konkav). Greiner–Hormann: construct linked edge lists, mark crossings, trace multiple contours and handle no crossings. | CGVIZ_Chapter_2_2023.pdf p. 81–85 · Rasterization.pdf § 1.8.3 | Fully taught. |
| [Discarding whole objects or testing depth per pixel](../tema.html?k=klipping#synlighet). Distinguish conservative frustum tests, back-face culling and hidden surfaces. Trace the z-buffer in drawing order. | CGVIZ__Pipeline-s-1.pdf § 1.2.2, 1.2.5 and 1.5.1, PDF p. 11–13, 20–21 and 28–30 · CGVIZ_Chapter_5_2026.pdf p. 20–23, 38 and 55–62 | Fully taught. |

## Rasterisation and antialiasing

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Three signs determine whether a point is inside the triangle](../tema.html?k=rasterisering#kantfunksjon). Test triangle sample points using edge functions, orientation and first differences. | Rasterization.pdf § 1.5–1.6, PDF p. 14–23 · CGVIZ_Chapter_2_2023.pdf p. 25–28 and 36–40 · TDT4195-ClassQuestions.pdf p. 3–4 | Fully taught. |
| [Evaluating a curve incrementally](../tema.html?k=rasterisering#implisitt). Compare parametric and implicit curves. Evaluate the circle's implicit function incrementally. | CGVIZ_Chapter_2_2023.pdf p. 5–15 · Rasterization.pdf § 1.3–1.4 | Fully taught. |
| [Lines, scanlines and filling](../tema.html?k=rasterisering#linjer). Rasterise a line using axis selection, rounding and Bresenham's integer decision. | Rasterization.pdf § 1.2–1.4 and § 1.6, PDF p. 5–13 and 16–24 · CGVIZ_Chapter_2_2023.pdf p. 4–24 and 29–42 | Fully taught. |
| [Filling a polygon one scanline at a time](../tema.html?k=rasterisering#skannelinje). Scanline filling with parity, ET/AET and vertex rules. Compare with seed filling. | CGVIZ_Chapter_2_2023.pdf p. 29–35 and 41–42 · Rasterization.pdf § 1.6 | Fully taught. |
| [Counting coverage and colour computations separately](../tema.html?k=rasterisering#antialiasing). Area coverage (Catmull), subsamples, SSAA and MSAA. Explain reconstruction using DLAA and DLSS. | Rasterization.pdf § 1.7, PDF p. 25–27, 31–34 and 36–37 · CGVIZ_Chapter_2_2023.pdf p. 43–46, 51–55 and 60–61 | Fully taught for the objective in this row. |

## Colour and intensity

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [From a perceptual threshold to a bit count](../tema.html?k=farge#intensitet). Count intensity levels, select bit depth and allocate channel bits. Explain logarithmic perception, halftoning, error diffusion and gamma correction. | color.pdf § 11.2, PDF p. 1–8 · CGVIZ_Chapter_11_2020.pdf p. 3–6 and 12–17 · TDT4195-ClassQuestions.pdf p. 1 and 18–20 | Fully taught for the objective in this row. |
| [Tracing rounding error through an image](../tema.html?k=farge#feildiffusjon). Trace quantisation errors, signs and neighbour weights through two rows. | CGVIZ_Chapter_11_2020.pdf p. 6 and 12–17 · color.pdf § 11.2 | Fully taught. |
| [From a spectrum to a colour space](../tema.html?k=farge#fargesyn). Spectra, cone responses, colour matching and gamut. Distinguish luminance and chromaticity. | CGVIZ_Chapter_11_2020.pdf p. 18–26 and 30–37 · color.pdf § 11.2–11.3 | Fully taught. |
| [Choosing and calculating with colour models](../tema.html?k=farge#modeller). Convert between idealised RGB and CMY. Interpret HSV, CIE XYZ, chromaticity and device dependence. | color.pdf § 11.3, PDF p. 9–20 · CGVIZ_Chapter_11_2020.pdf p. 18–26 and 30–49 | Fully taught. |
| [Converting between RGB and CMYK](../tema.html?k=farge#trykk). Extract black when converting to CMYK and check the pure-black special case. | CGVIZ_Chapter_11_2020.pdf p. 42–49 · color.pdf § 11.3 | Fully taught. |
| [Preserving highlights and shadows](../tema.html?k=farge#hdr). Select measurements from multiple exposures and calculate dynamic range, tone mapping and LogLuv bit allocation. | CGVIZ_Chapter_11_2020.pdf p. 50–56 · color.pdf § 11.5 | Fully taught. |
| [Transparency and high dynamic range](../tema.html?k=farge#alfa). Composite linear colours in order; interpret premultiplied alpha, HDR, exposure and tone mapping. | color.pdf § 11.3.4 and § 11.5, PDF p. 16 and 20–23 · CGVIZ_Chapter_11_2020.pdf p. 37–39 and 50–56 | Fully taught for the objective in this row. |

## Lighting and shading

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Separating illumination, material and viewing direction](../tema.html?k=lys#reflektans). Distinguish lighting, texture, material, viewing direction and BRDF. Compare direct and indirect lighting. | CGVIZ_Chapter_12.pdf p. 1–5, 12–13 and 22–33 · Illumination.pdf § 1.4 and 1.6 | Fully taught. |
| [Building lighting from computable contributions](../tema.html?k=lys#phong). Calculate emissive, ambient, diffuse and specular components. Distinguish reflection and halfway vectors, light sources and distance attenuation. | Illumination.pdf § 1.1 and § 1.4, PDF p. 1–7 and 11–17 · CGVIZ_Chapter_12.pdf p. 1–5, 12–13 and 22–33 | Fully taught. |
| [What is interpolated across the triangle?](../tema.html?k=lys#interpolasjon). Compare flat, Gouraud and Phong shading at vertices and interior samples. | Illumination.pdf § 1.6.1–1.6.3, PDF p. 25–30 · CGVIZ_Chapter_12.pdf p. 55–64 · TDT4195-ClassQuestions.pdf p. 21–23 | Fully taught. |
| [Lighting after the visibility test](../tema.html?k=lys#deferred). Describe the geometry pass, depth test, G-buffer and lighting pass. Calculate memory use and lighting work. | CGVIZ__Pipeline-s-1.pdf § 1.9, PDF p. 34 · CGVIZ_Chapter_5_2026.pdf p. 58 and 67 | Fully taught. |

## From light to histograms

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Image planes, depth and pixels](../tema.html?k=intensitet#bildedannelse). Explain light, sensors and vision; use pinhole cameras, sampling, quantisation, spatial resolution and stereo disparity. | L1-T0-b_Intro, PDF p. 4–8 and 12–36. Gonzalez and Woods (DIP4e), ch. 2.1–2.4, p. 48–80. | Fully taught. |
| [Reading a curve from input to output](../tema.html?k=intensitet#punktoperator). Negatives, contrast and intensity curves, gamma and normalisation. Read input and output values. | L1-T1-a_Spatial-Intuition, PDF p. 8–21. L1-T1-b_Spatial-IntensityTransf, PDF p. 2–7. DIP4e, ch. 3.2. | Fully taught. |
| [Equalising a small image by hand](../tema.html?k=intensitet#histogram). Calculate histograms, probabilities, CDFs and discrete equalisation; check rounding and the output histogram. | L1-T1-a_Spatial-Intuition, PDF p. 22–32. L1-T1-b_Spatial-IntensityTransf, PDF p. 23–29. DIP4e, ch. 3.3, p. 133–153. | Fully taught. |

## Filters in the spatial domain

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Orienting the kernel correctly](../tema.html?k=filtrering#kjerne). Neighbourhood filtering, linear weighted sums, impulse responses, correlation, convolution, orientation, padding and valid support. | L1-T1-c_Spatial-Filter-Intro, PDF p. 3–12. L3-T3-a_Filtering_Average, PDF p. 75–87. L3-T3-b_Filtering_Diff, PDF p. 12–14. DIP4e, ch. 3.4. | Fully taught. |
| [Finding a pattern with normalised correlation](../tema.html?k=filtrering#malsok). Calculate zero-mean normalised cross-correlation and interpret a template-response map. | L3-T3-a_Filtering_Average, PDF p. 142–151 · L3-T3-b_Filtering_Diff p. 16–18 | Fully taught. |
| [Noise, median and Gaussian filtering](../tema.html?k=filtrering#utjevning). Choose mean, Gaussian or median filters considering noise, edges, linearity and normalisation. | L3-T3-a_Filtering_Average, PDF p. 21–53, 93–100 and 135–141. DIP4e, ch. 3.5, p. 164–175. | Fully taught. |
| [Factorising a filter kernel](../tema.html?k=filtrering#separabel). Factorise a separable kernel and calculate two 1D passes with compatible boundary rules. | L3-T3-a_Filtering_Average, PDF p. 93–101 · DIP4e § 3.4–3.5 | Fully taught. |
| [Finding an edge using two different derivatives](../tema.html?k=filtrering#gaussderivert). Explain differentiation of a Gaussian-smoothed signal, scale selection and zero crossings. | L3-T3-b_Filtering_Diff, PDF p. 74–88 and 108–113 · L6-T6-a_Segmentation, PDF p. 23–26 | Fully taught. |
| [Distinguishing an edge from a peak](../tema.html?k=filtrering#derivasjon). First and second differences, Sobel, gradient direction and magnitude, Laplacian, noise suppression and sharpening. | L3-T3-b_Filtering_Diff, PDF p. 25–30, 86–101 and 105–112. DIP4e, ch. 3.6. | Fully taught for the objective in this row. |

## Fourier analysis and frequency filtering

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Reading a spectrum and calculating a DFT](../tema.html?k=frekvens#spektrum). Calculate complex 1D and 2D DFTs, DC, frequency indices, magnitude and inverse normalisation. | L5-T5-a_Frequency, PDF p. 4–9, 17–26 and 32–39. DIP4e, ch. 4.4–4.6. | Fully taught. |
| [Splitting a DFT into even- and odd-indexed samples](../tema.html?k=frekvens#fft). Perform a radix-2 step, interpret phase shifts and compare FFT work with direct DFT evaluation. | L5-T5-a_Frequency, PDF p. 32–39 · DIP4e § 4.4 | Fully taught. |
| [From image to mask and back](../tema.html?k=frekvens#frekvensfilter). Apply the convolution theorem, centring and inverse transformation. Distinguish linear and circular convolution. | L5-T5-a_Frequency, PDF p. 40–51. L6-T6-a_Segmentation, PDF p. 6–9. DIP4e, ch. 4.7, from p. 260. | Fully taught. |
| [Choosing a mask from the spectrum](../tema.html?k=frekvens#frekvensmasker). Choose low-pass, high-pass or notch filters; relate radius, order, ringing and symmetric peaks to image content. | L5-T5-a_Frequency, PDF p. 47–54 and 98–108 · DIP4e ch. 4 | Fully taught. |
| [Sampling and fast computation](../tema.html?k=frekvens#aliasing). Use sample rate, Nyquist limit, alias frequency and low-pass filtering before downsampling. | L5-T5-a_Frequency, PDF p. 52–62. DIP4e, ch. 4.3, p. 215–225 and ch. 4 on FFT. | Fully taught. |

## Segmentation and contours

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Tracing a weak edge](../tema.html?k=segmentering#canny). Smoothing, gradients, non-maximum suppression, double thresholds and hysteresis. | L6-T6-a_Segmentation, PDF p. 15–38. DIP4e, ch. 10.2. | Fully taught. |
| [Voting for a geometric shape](../tema.html?k=segmentering#hough). Let edge points vote for lines; interpret normal parameters and accumulator resolution. | L6-T6-a_Segmentation, PDF p. 39–64. DIP4e, ch. 10.2 on the Hough transform. | Fully taught. |
| [From line votes to circle votes](../tema.html?k=segmentering#sirkel). Find circles with known or unknown radii; constrain centre votes using edge normals. | L6-T6-a_Segmentation, PDF p. 46–60 | Fully taught. |
| [Choosing a threshold from the histogram](../tema.html?k=segmentering#terskel). Global thresholding and Otsu's between-class variance. Handle empty classes and equality at the threshold. | L6-T6-a_Segmentation, PDF p. 75–87. DIP4e, ch. 10.3–10.4, from p. 742. | Fully taught. |
| [Splitting and merging regions](../tema.html?k=segmentering#del-og-sla-sammen). Split regions recursively using a predicate; determine when neighbouring regions may merge. | L6-T6-a_Segmentation, PDF p. 88–95 · lecture_plan_IP.txt, DIP4e § 10.4 | Fully taught. |
| [Keeping track of the frontier](../tema.html?k=segmentering#regionvekst). Choose seeds, intensity criteria, visitation order and 4-/8-neighbour connectivity. | L6-T6-a_Segmentation, PDF p. 94–104. DIP4e, ch. 10.4, from p. 764. | Fully taught. |

## Morphology and shape

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Fit, intersection and operation order](../tema.html?k=morfologi#erosjon-dilasjon). Binary set operations, translation and reflection of structuring elements. Calculate erosion, dilation, opening and closing. | L7-T7-a_Morphology-compressed, PDF p. 6–22. DIP4e, ch. 9.1–9.3, p. 636–648. | Fully taught. |
| [Inner and outer boundaries](../tema.html?k=morfologi#rand). Find inner and outer boundaries using set differences. Interpret holes and boundary effects. | L7-T7-a_Morphology-compressed, PDF p. 24–26. DIP4e, ch. 9.5, from p. 652. | Fully taught. |
| [Reconstructing a connected component](../tema.html?k=morfologi#rekonstruksjon). Apply repeated geodesic dilation with marker and mask until stability. | L7-T7-a_Morphology-compressed, PDF p. 26–27. DIP4e, ch. 9.5–9.6, p. 652–673. | Fully taught. |
| [Filling a hole by constrained growth](../tema.html?k=morfologi#hull). Fill one or more holes by reconstruction in the complement with chosen connectivity. | L7-T7-a_Morphology-compressed, PDF p. 24–31 · DIP4e § 9.5–9.6 | Fully taught. |
| [Labelling objects in two passes](../tema.html?k=morfologi#komponenter). Label connected components using two passes and an equivalence table. | L7-T7-a_Morphology-compressed, PDF p. 143–165 | Fully taught. |
| [Recognising a shape and finding its skeleton](../tema.html?k=morfologi#formtreff). Hit-or-miss, foreground and background templates, thinning and skeletons as shape representations. | L7-T7-a_Morphology-compressed, PDF p. 38–68 and 174–175. DIP4e, ch. 9.4–9.5. | Fully taught for the objective in this row. |
| [Building the skeleton in layers and reconstructing the shape](../tema.html?k=morfologi#skjelett). Calculate skeleton layers and reconstruct the object using repeated dilation. | L7-T7-a_Morphology-compressed, PDF p. 64–67 and 175 · DIP4e § 9.5 | Fully taught. |
| [Watershed segmentation](../tema.html?k=morfologi#vannskille). Use gradient as terrain and minima and markers as basins; interpret oversegmentation. | L7-T7-a_Morphology-compressed, PDF p. 69–72 | Fully taught. |
| [Moving minima and maxima](../tema.html?k=morfologi#graatone). Calculate flat and non-flat greyscale morphology with reflection, minima, maxima and an explicit anchor. | L7-T7-a_Morphology-compressed, PDF p. 28–37 and 176–193. DIP4e, ch. 9.8, from p. 674. | Fully taught. |

## Fully connected networks

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [From labelled examples to generalisation](../tema.html?k=nevrale-nett#trening). Supervised learning, loss, dataset splitting, generalisation and overfitting. | L03a_DL-Intro, PDF p. 52–66 and 88–90 · lecture_plan_IP.txt, FCNN | Fully taught. |
| [From inputs to loss](../tema.html?k=nevrale-nett#forover). Calculate FCNN layers with weight matrices, biases, ReLU, sigmoid and a loss function. | L03a_DL-Intro, PDF p. 45–60. L03b_FCNNs-FBPass, PDF p. 5–18 and 60–80. DLFund_Examples_1-Pre-FCNNs, PDF p. 2 and 2-Post-FCNNs, PDF p. 2–3. | Fully taught. |
| [Following the chain rule backwards](../tema.html?k=nevrale-nett#bakover). Apply the chain rule backwards, sum gradient contributions, and update weights and biases. | L03b_FCNNs-FBPass, PDF p. 20–50 and 88–99. DLFund_Examples_2-Post-FCNNs, PDF p. 4–8. | Fully taught. |
| [Learning from several examples](../tema.html?k=nevrale-nett#minibatch). Calculate the correct gradient for a batch and mean loss. | L03a_DL-Intro, PDF p. 54–66. DLFund_Examples_1-Pre-FCNNs, PDF p. 4 and 2-Post-FCNNs, PDF p. 7–8. | Fully taught. |

## Convolutional networks

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Calculating output size](../tema.html?k=cnn#form). Calculate CNN shapes with filters, channels, stride, padding, pooling and flattening. | L03c_CNNs-FPass, PDF p. 20–35, 54–79 and 131–139. | Fully taught. |
| [Counting stored weights and computational work](../tema.html?k=cnn#parametere). Count parameters and multiplications with weight sharing and channel mixing. | L03c_CNNs-FPass, PDF p. 65–81 and 133–142. | Fully taught. |
| [Calculating responses, activations and class scores](../tema.html?k=cnn#respons). Trace a CNN forward pass with multichannel filters, biases, activations, matrix form and class scores. | L03c_CNNs-FPass, PDF p. 36–61 and 145–154. DLFund_Examples_3-Pre-CNNs, PDF p. 5–7 and 4-Post-CNNs, PDF p. 9–13. | Fully taught. |

## Vision Transformer

| Learning objective and lesson | Source | Coverage |
|---|---|---|
| [Turning the image into a sequence](../tema.html?k=transformer#patcher). Divide an image into patches, project them into tokens, and add positional information and a class token. | L03d_ViTs-FPass, PDF p. 50–59. DLFund_Examples_5-Pre-ViTs, PDF p. 8–10 and 6-Post-ViTs, PDF p. 14–17. | Fully taught. |
| [From Q, K and V to a new token](../tema.html?k=transformer#oppmerksomhet). Calculate Q, K, V, scaled dot products, row-wise softmax and weighted values. | L03d_ViTs-FPass, PDF p. 25–45. DLFund_Examples_5-Pre-ViTs, PDF p. 11–13 and 6-Post-ViTs, PDF p. 18–22. | Fully taught. |
| [Tracing tokens through an encoder block](../tema.html?k=transformer#blokk). Trace multiple heads, output projection, LayerNorm, residual connections and token-wise MLPs. | L03d_ViTs-FPass, PDF p. 20–45 and 50–59 · DLFund_Examples_6-Post-ViTs, PDF p. 14–26 | Fully taught. |
| [Reading out the class](../tema.html?k=transformer#klassifikasjon). Read the class token and calculate logits, class probabilities and cross-entropy. | L03d_ViTs-FPass, PDF p. 50–59. DLFund_Examples_5-Pre-ViTs, PDF p. 14–16 and 6-Post-ViTs, PDF p. 23–26. | Fully taught. |

## Course outcomes, laboratories and source gaps

| Outcome in course_information.txt and plans | Where it is practised | Coverage |
|---|---|---|
| Knowledge of principles and algorithms in image synthesis and image analysis | [Image synthesis](../tema.html?k=scenegrafer#pipeline) and [image analysis](../tema.html?k=segmentering#regionvekst), expanded in the tables above | Status is specified per method. |
| Graphics and image-processing programming, OpenGL with C/C++ or Rust, and image processing with Python | [Transformation chains](../tema.html?k=scenegrafer#hierarki), [pixel calculations](../tema.html?k=filtrering#kjerne) and [component labelling](../tema.html?k=morfologi#komponenter) | Partially taught. Students practise algorithms and intermediate results. Practical coding and assessment take place in the course laboratories. |
| General competence in applying and extending visual methods | [Choosing filtering methods](../tema.html?k=filtrering#utjevning) and [model selection on new images](../tema.html?k=nevrale-nett#trening) | Partially taught. Calculation and interpretation exercises cover bounded problems. A larger independent application forms part of the practical work. |
| CG introduction on 17.8. and ARM guest lecture on 28.9. | [Primitives and the pipeline](../tema.html?k=scenegrafer#pipeline) draw on the available CGVIZ chapters. | Source-limited for the separate TDT4195-2026_info file and ARM lecture. |
| UDL as supporting literature for FCNN, CNN and transformers | [Networks](../tema.html?k=nevrale-nett#forover), [CNN](../tema.html?k=cnn#form), [ViT](../tema.html?k=transformer#oppmerksomhet) | The UDL book itself is missing locally. Teaching uses the H26 slides and six local example files. |

Historical examples, demonstration images and software outputs illustrate their respective methods. The table counts learning objectives, not individual figures. H24 no. 3 and H25 nos. 2 and 13 have question-specific uncertainties described in the exam analysis.
