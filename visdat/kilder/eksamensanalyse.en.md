# TDT4195 · Exam analysis for autumn 2026

## What was actually tested?

H24 has 28 subject questions and H25 has 27. Both allocate about half their points to each course component. No. 1 in both papers is an optional assumptions field worth 0 points (H24 p. 6, H25 p. 2). The first subject question is therefore no. 2. **Transformations, camera space, rasterisation, bit allocation, Phong, histograms, spatial filters, FFT, region growing, morphology and all three network types appear in both papers.**

[Open exam practice](../eksamen.html) · [Machine-readable question register](eksamen.en.json)

### Which specific CG transformations do the exams test?

The local Graphify server was queried about transformations, learning objectives and syllabus coverage. The broad search also returned lighting and colour questions. A follow-up search using H24-02…04 and H25-02…05 found model matrices, cameras and pivot rotations with source locations. Matrices, figures and green answer markings were checked on rendered PDF pages. The table below includes perspective projection as a separate step after the camera transformation.

**Directly supported by the sources** are what the candidate had to find, points for the whole Inspera question, lecture topics and marked answers. The graph’s `EXTRACTED` links connect these facts to source files and pages. **Educational inference** is the connection from a question type to a particular H26 calculation objective or book section. These connections are labelled `INFERRED`. The course information specifies broader knowledge outcomes about principles and algorithms in image synthesis and image analysis, and programming skills. It does not provide a question-specific list of matrices to reproduce. Source: `course_information.txt`, lines 31–35.

| Question and question-paper PDF page | What the candidate had to do | Inferred practice objective and H26 source |
| --- | --- | --- |
| H24 no. 2, CG1-Q1, p. 7 · 9,94 points | Set up a homogeneous model matrix for scaling followed by rotation. Compare multiplication counts for 1000 vertices with and without precomputation. | Use column matrices, calculate RzS and distinguish one-time from per-vertex cost. CG plan 20., 24. and 27.8., `Transformations.pdf` pp. 10–13 and 27, `CGVIZ_Chapter_3_2022.pdf` pp. 10–20 and 48–55. |
| H24 no. 3, CG1-Q2, pp. 8–9 · 5 points | Read world and eye axes from a drawing and provide a justified WCS→ECS matrix. | Translate the eye to the origin before expressing coordinates in the camera basis. CG plan 31.8., `Projections_and_Viewing_Transformations.pdf` pp. 16–17, `CGVIZ_Chapter_4_2022.pdf` pp. 25–33. |
| H24 no. 4, CG1-Q3, p. 10 · 5 points | Count frustum planes and complete the projection matrix from horizontal field of view, aspect ratio and signed near/far planes. | Calculate scale and depth and check after division by w′=z. CG plan 31.8. and 7.9., `Projections_and_Viewing_Transformations.pdf` pp. 19–23, equation 1.13, and `CGVIZ_Chapter_4_2022.pdf` pp. 34–46. |
| H25 no. 2, CG1-Q1, p. 3 · 5,94 points | Calculate vertices after three steps: scaling, placement of A, and clockwise rotation about B’s new position. | Trace points between steps. Translate to the pivot, rotate, then translate back. CG plan 20. and 24.8., `Transformations.pdf` pp. 10–16 and `CGVIZ_Chapter_3_2022.pdf` pp. 32–40. |
| H25 no. 3, CG1-Q2, p. 4 · 2 points | Select the product representing the chain in no. 2. | Justify right-to-left order by substituting p₁=T₁p. Same CG plan and `Transformations.pdf` pp. 10–13. |
| H25 no. 4, CG1-Q3, pp. 5–6 · 12 points | Set up separate 4×4 matrices for nonuniform 3D scaling, z-rotation about a displaced axis, and translation. Give the row count and final coordinate of the cube’s vertices. | Construct T(c)RzT(−c), check that points on the axis remain fixed, and retain w=1 for points through affine steps. CG plan 20. and 24.8., `Transformations.pdf` pp. 16, 27 and 29–32. |
| H25 no. 5, CG2-Q1, p. 6 · 10,08 points | Derive WCS→ECS from eye, viewing target and up vector. | Write camera axes as rows after T(−E). Check the origin and the target depth’s sign. CG plan 31.8., `Projections_and_Viewing_Transformations.pdf` pp. 16–17 and `CGVIZ_Chapter_4_2022.pdf` pp. 25–33. |

The transformation questions above total 19,94 points in H24 and 30,02 in H25, including camera and projection. These are observed point allocations in two papers. H25 no. 11 also includes pinhole projection, but belongs to IP and is excluded from these CG totals.

### Four details affecting interpretation of the answers

- **H24 no. 3.** The eye is labelled (3,0,0) in the figure but drawn on the world z-axis. Axis arrows and labels must be checked together. Both PDF versions show the same figure. The answer field in Answers pp. 8–9 is empty. The register states assumptions behind two proposed interpretations.
- **H24 no. 4.** The matrix’s final row is [0 0 1 0]. With signed n=−20 and f=−120, the final two entries of the third row are M₃₃=1,4 and M₃₄=48. Depths after division are (1,4·(−20)+48)/(−20)=−1 and (1,4·(−120)+48)/(−120)=1. Answers p. 10.
- **H25 nos. 2 and 5.** Inspera Answers p. 3 gives 1,5 as vertex A’s final y-value. With specified centre B″=(9,5;6), clockwise rotation maps (−4,5;0) to (0;4,5). Adding the centre back gives y=10,5. For the camera in no. 5, the official answer on p. 7 accepts both pure translation and a half-turn about y after translation. Our practice variant specifies negative local z as the viewing direction.
- **H25 no. 13.** The summation line says 417, while the histogram table has 471 pixels at grey level 3. The table’s value gives the stated total 4196 and the official histogram. NoAnswers p. 16 and Inspera Answers p. 17. For H25 no. 7, Inspera also accepts subsample counts either for the whole figure or per pixel (p. 9).

## Reading order and priorities

**Start CG** with homogeneous points, composition and scene graphs. Scene graphs are explicitly scheduled on 27.8. and provide practice in interpreting the same product relative to a parent. Neither paper has a separate scene-graph question. Then continue with cameras and projection, clipping, rasterisation, colour and lighting. Test a model matrix with one actual point before applying it to all vertices.

**Start IP** with sampling and quantisation, then point transformations, histograms and spatial filters. From there, switching between spatial and frequency domains and applying filters to segmentation becomes natural. Region growing and morphology introduce neighbourhoods and supports. Networks progress from one neuron through convolutional layers to the transformer’s patch sequence. FCNN, CNN and ViT are all explicitly included in the H26 plan.

| Study priority | Reasoning and specific practice |
| --- | --- |
| Repeat until the calculations are fluent | Model and camera transformations, triangle tests and antialiasing, histogram equalisation, image filters, FFT, region growing, morphology and network calculations have documented questions in both years. Change the numbers and require intermediate working. |
| Practise explaining a method choice | Conservative visibility tests and clipping have three subject questions in H24. Hough lines and pinhole cameras have numerical and interpretation questions in H25. Colour and Phong are tested in both years using reasoning, bit arithmetic and model parameters. Try justifying a choice without multiple-choice options. |
| Reserve time for the rest of the syllabus | Scene graphs and parent transformations, viewports, z-buffers, alpha/HDR and deferred shading appear in the CG plan. IP slides include multiple threshold methods, opening/closing and network classification. Practise these even without a direct parallel in the exam register. Knowledge and programming outcomes extend beyond what a written school exam captures. |

The H26 weighting of assignments and written exam is 40/60 in `course_information.txt`. These are course assessment weights. The IP plan states that slides define the syllabus, with Gonzalez and Woods and Understanding Deep Learning as supporting literature. Section and slide ranges in the CG plan bound the reading.

## How to read the register

H24 refers to `TDT4195-Autumn2024_NoAnswers.pdf` and `TDT4195-Autumn2024_Answers.pdf`. H25 refers to `TDT4195-Autumn2025_NoAnswers.pdf` and `Exam-H25-with Inspera Answers.pdf`. All four are in local directory `kildemateriale/exam/`. Page references are one-based PDF pages. The answer file may have different page numbers or a different ordering of answer options.

Year and Inspera number form part of a stable ID. A letter suffix identifies an independent subskill in the study register. Cells in one matrix, components in one vector, and fields in one calculation step belong to the entry naming that result. H24 no. 16 is headed IP3-Q3 in the original even though it appears in the IP1 block. The Inspera number identifies the question unambiguously.

`poeng` is set when the full score belongs to the entry. `oppgavepoeng` is the original maximum for the whole question number. When several register entries share one total, subpoints use `null`. Values in the “Maximum” column below belong to the whole Inspera number. Free-text answers with empty fields in the answer PDF are labelled “Our proposed solution”. Our practice variants always have their own solutions. The register identifies the original figures in local source files.

## Register in original order

### Autumn 2024

| ID and practice link | No. · part | Skill | Question page / answer page | Maximum |
| --- | --- | --- | --- | --- |
| [H24-02-a](../eksamen.html?aar=2024&id=H24-02-a) | 2 · CG1-Q1 | Compose scaling and rotation | 7 / 7 | 9,94 |
| [H24-02-b](../eksamen.html?aar=2024&id=H24-02-b) | 2 · CG1-Q1 | Count multiplications with and without composition | 7 / 7 | 9,94 |
| [H24-03](../eksamen.html?aar=2024&id=H24-03) | 3 · CG1-Q2 | Read the camera basis and move the eye to the origin | 8–9 / 8–9 | 5 |
| [H24-04-a](../eksamen.html?aar=2024&id=H24-04-a) | 4 · CG1-Q3 | Count clipping planes in a perspective volume | 10 / 10 | 5 |
| [H24-04-b](../eksamen.html?aar=2024&id=H24-04-b) | 4 · CG1-Q3 | Determine perspective-matrix entries | 10 / 10 | 5 |
| [H24-05-a](../eksamen.html?aar=2024&id=H24-05-a) | 5 · CG2-Q1 | Find first differences of three edge functions | 11–12 / 11–12 | 3,99 |
| [H24-05-b](../eksamen.html?aar=2024&id=H24-05-b) | 5 · CG2-Q1 | Count operations at the first pixel | 11–12 / 11–12 | 3,99 |
| [H24-05-c](../eksamen.html?aar=2024&id=H24-05-c) | 5 · CG2-Q1 | Count updates across the bounding box | 11–12 / 11–12 | 3,99 |
| [H24-06-a](../eksamen.html?aar=2024&id=H24-06-a) | 6 · CG2-Q2 | Select pixels during line rasterisation | 13–14 / 13–14 | 3,99 |
| [H24-06-b](../eksamen.html?aar=2024&id=H24-06-b) | 6 · CG2-Q2 | Trace intersected grid cells | 13–14 / 13–14 | 3,99 |
| [H24-06-c](../eksamen.html?aar=2024&id=H24-06-c) | 6 · CG2-Q2 | Compare rasterisation and traversal sets | 13–14 / 13–14 | 3,99 |
| [H24-07](../eksamen.html?aar=2024&id=H24-07) | 7 · CG2-Q3 | Calculate SSAA and MSAA cost | 15 / 15 | 2 |
| [H24-08](../eksamen.html?aar=2024&id=H24-08) | 8 · CG3-Q1 | Distinguish frustum culling from clipping | 16 / 16 | 3 |
| [H24-09](../eksamen.html?aar=2024&id=H24-09) | 9 · CG3-Q2 | Correct the Liang–Barsky interval test and endpoints | 17–18 / 17–18 | 4 |
| [H24-10](../eksamen.html?aar=2024&id=H24-10) | 10 · CG3-Q3 | Construct a counterexample to clipping polygon edges independently | 19 / 19 | 3 |
| [H24-11-a](../eksamen.html?aar=2024&id=H24-11-a) | 11 · CG4-Q1 | Count distinguishable intensities | 20–21 / 20–21 | 3,99 |
| [H24-11-b](../eksamen.html?aar=2024&id=H24-11-b) | 11 · CG4-Q1 | Allocate bits between colour channels | 20–21 / 20–21 | 3,99 |
| [H24-11-c](../eksamen.html?aar=2024&id=H24-11-c) | 11 · CG4-Q1 | Interpret a minimum visible difference | 20–21 / 20–21 | 3,99 |
| [H24-12-a](../eksamen.html?aar=2024&id=H24-12-a) | 12 · CG4-Q2 | Identify material parameters in Phong | 22–23 / 22–23 | 4 |
| [H24-12-b](../eksamen.html?aar=2024&id=H24-12-b) | 12 · CG4-Q2 | Identify light-source intensity | 22–23 / 22–23 | 4 |
| [H24-12-c](../eksamen.html?aar=2024&id=H24-12-c) | 12 · CG4-Q2 | Determine whether a medium is modelled | 22–23 / 22–23 | 4 |
| [H24-12-d](../eksamen.html?aar=2024&id=H24-12-d) | 12 · CG4-Q2 | Relate direction to the specular term | 22–23 / 22–23 | 4 |
| [H24-13-a](../eksamen.html?aar=2024&id=H24-13-a) | 13 · CG4-Q3 | Explain the information supplied by lighting | 24 / 24 | 2 |
| [H24-13-b](../eksamen.html?aar=2024&id=H24-13-b) | 13 · CG4-Q3 | Interpret an achromatic lighting factor | 24 / 24 | 2 |
| [H24-14-a](../eksamen.html?aar=2024&id=H24-14-a) | 14 · IP1-Q1 | Run a linear neuron through to its loss | 25–26 / 25–26 | 6 |
| [H24-14-b](../eksamen.html?aar=2024&id=H24-14-b) | 14 · IP1-Q1 | Apply the chain rule from loss to parameter gradients | 25–26 / 25–26 | 6 |
| [H24-14-c](../eksamen.html?aar=2024&id=H24-14-c) | 14 · IP1-Q1 | Update both parameters simultaneously | 25–26 / 25–26 | 6 |
| [H24-15-a](../eksamen.html?aar=2024&id=H24-15-a) | 15 · IP1-Q2 | Trace tensor shapes for the first CNN input | 27–28 / 27–28 | 4,8 |
| [H24-15-b](../eksamen.html?aar=2024&id=H24-15-b) | 15 · IP1-Q2 | Trace tensor shapes with different strides and filter counts | 27–28 / 27–28 | 4,8 |
| [H24-16-a](../eksamen.html?aar=2024&id=H24-16-a) | 16 · IP3-Q3 | Divide an image into patches and determine sequence shape | 29 / 29 | 5 |
| [H24-16-b](../eksamen.html?aar=2024&id=H24-16-b) | 16 · IP3-Q3 | Add the position vector | 29 / 29 | 5 |
| [H24-16-c](../eksamen.html?aar=2024&id=H24-16-c) | 16 · IP3-Q3 | Calculate a query using row vectors | 29 / 29 | 5 |
| [H24-16-d](../eksamen.html?aar=2024&id=H24-16-d) | 16 · IP3-Q3 | Scale the query–key dot product | 29 / 29 | 5 |
| [H24-16-e](../eksamen.html?aar=2024&id=H24-16-e) | 16 · IP3-Q3 | Find one token's contribution to the context vector | 29 / 29 | 5 |
| [H24-17](../eksamen.html?aar=2024&id=H24-17) | 17 · IP2-Q1 | Match four tone curves to resulting images | 30–31 / 30–31 | 2 |
| [H24-18-a](../eksamen.html?aar=2024&id=H24-18-a) | 18 · IP2-Q2 | Calculate valid correlation of an impulse | 32 / 32 | 1,8 |
| [H24-18-b](../eksamen.html?aar=2024&id=H24-18-b) | 18 · IP2-Q2 | Calculate valid convolution of the same impulse | 32 / 32 | 1,8 |
| [H24-19-a](../eksamen.html?aar=2024&id=H24-19-a) | 19 · IP2-Q3 | Derive histogram probabilities from areas | 33–34 / 33–34 | 3 |
| [H24-19-b](../eksamen.html?aar=2024&id=H24-19-b) | 19 · IP2-Q3 | Calculate new grey levels using the cumulative distribution | 33–34 / 33–34 | 3 |
| [H24-20](../eksamen.html?aar=2024&id=H24-20) | 20 · IP2-Q4 | Match two histograms to two cumulative curves | 35 / 35 | 2 |
| [H24-21-a](../eksamen.html?aar=2024&id=H24-21-a) | 21 · IP2-Q5 | Recognise a sum of second derivatives | 36–37 / 36–37 | 4 |
| [H24-21-b](../eksamen.html?aar=2024&id=H24-21-b) | 21 · IP2-Q5 | Determine whether a Gaussian kernel is separable | 36–37 / 36–37 | 4 |
| [H24-21-c](../eksamen.html?aar=2024&id=H24-21-c) | 21 · IP2-Q5 | Test whether a mean filter is linear | 36–37 / 36–37 | 4 |
| [H24-21-d](../eksamen.html?aar=2024&id=H24-21-d) | 21 · IP2-Q5 | Identify the normalised two-dimensional Gaussian | 36–37 / 36–37 | 4 |
| [H24-22](../eksamen.html?aar=2024&id=H24-22) | 22 · IP2-Q6 | Explain Canny hysteresis and the benefit of two thresholds | 38 / 38 | 4,15 |
| [H24-23-a](../eksamen.html?aar=2024&id=H24-23-a) | 23 · IP3-Q1 | Explain both forms of the convolution theorem | 39 / 39 | 5 |
| [H24-23-b](../eksamen.html?aar=2024&id=H24-23-b) | 23 · IP3-Q1 | Choose the theorem for frequency filtering | 39 / 39 | 5 |
| [H24-23-c](../eksamen.html?aar=2024&id=H24-23-c) | 23 · IP3-Q1 | Order the filtering steps correctly | 39 / 39 | 5 |
| [H24-23-d](../eksamen.html?aar=2024&id=H24-23-d) | 23 · IP3-Q1 | Evaluate FFT filtering costs and benefits | 39 / 39 | 5 |
| [H24-24](../eksamen.html?aar=2024&id=H24-24) | 24 · IP3-Q2 | Find the new DC position after checkerboard modulation | 40 / 40 | 1 |
| [H24-25](../eksamen.html?aar=2024&id=H24-25) | 25 · IP3-Q3 | Identify filter type from a centred magnitude response | 41 / 41 | 1 |
| [H24-26](../eksamen.html?aar=2024&id=H24-26) | 26 · IP3-Q4 | Predict an image after a frequency mask | 42 / 42 | 1 |
| [H24-27-a](../eksamen.html?aar=2024&id=H24-27-a) | 27 · IP4-Q1 | Trace the first stack-based region-growing iteration | 43–44 / 43–44 | 4,64 |
| [H24-27-b](../eksamen.html?aar=2024&id=H24-27-b) | 27 · IP4-Q1 | Trace the second iteration and mark visited cells | 43–44 / 43–44 | 4,64 |
| [H24-28-a](../eksamen.html?aar=2024&id=H24-28-a) | 28 · IP4-Q2 | Choose a structuring element for four-connectivity | 45 / 45–46 | 2,7 |
| [H24-28-b](../eksamen.html?aar=2024&id=H24-28-b) | 28 · IP4-Q2 | Choose a structuring element for eight-connectivity | 45 / 45–46 | 2,7 |
| [H24-29-a](../eksamen.html?aar=2024&id=H24-29-a) | 29 · IP4-Q3 | Calculate erosion with an asymmetric flat element | 46 / 47 | 2 |
| [H24-29-b](../eksamen.html?aar=2024&id=H24-29-b) | 29 · IP4-Q3 | Calculate dilation using the reflected element | 46 / 47 | 2 |

### Autumn 2025

| ID and practice link | No. · part | Skill | Question page / answer page | Maximum |
| --- | --- | --- | --- | --- |
| [H25-02-a](../eksamen.html?aar=2025&id=H25-02-a) | 2 · CG1-Q1 | Scale the triangle's three column-vector vertices | 3 / 3–4 | 5,94 |
| [H25-02-b](../eksamen.html?aar=2025&id=H25-02-b) | 2 · CG1-Q1 | Place the scaled vertex at a target point | 3 / 3–4 | 5,94 |
| [H25-02-c](../eksamen.html?aar=2025&id=H25-02-c) | 2 · CG1-Q1 | Rotate about the already translated vertex | 3 / 3–4 | 5,94 |
| [H25-03](../eksamen.html?aar=2025&id=H25-03) | 3 · CG1-Q2 | Order three matrices for column vectors | 4 / 4 | 2 |
| [H25-04-a](../eksamen.html?aar=2025&id=H25-04-a) | 4 · CG1-Q3 | Construct the 3D scaling matrix | 5–6 / 5–6 | 12 |
| [H25-04-b](../eksamen.html?aar=2025&id=H25-04-b) | 4 · CG1-Q3 | Construct a 3D rotation about a displaced centre | 5–6 / 5–6 | 12 |
| [H25-04-c](../eksamen.html?aar=2025&id=H25-04-c) | 4 · CG1-Q3 | Construct a homogeneous 3D translation | 5–6 / 5–6 | 12 |
| [H25-04-d](../eksamen.html?aar=2025&id=H25-04-d) | 4 · CG1-Q3 | Determine the dimensions of a homogeneous vertex matrix | 5–6 / 5–6 | 12 |
| [H25-05](../eksamen.html?aar=2025&id=H25-05) | 5 · CG2-Q1 | Derive a camera matrix from eye, target and up vector | 6 / 7 | 10,08 |
| [H25-06-a](../eksamen.html?aar=2025&id=H25-06-a) | 6 · CG3-Q1 | Count incremental operations per triangle sample | 7 / 8–9 | 4,98 |
| [H25-06-b](../eksamen.html?aar=2025&id=H25-06-b) | 6 · CG3-Q1 | Determine whether a point is inside a triangle | 7 / 8–9 | 4,98 |
| [H25-06-c](../eksamen.html?aar=2025&id=H25-06-c) | 6 · CG3-Q1 | Count candidate pixels | 7 / 8–9 | 4,98 |
| [H25-07](../eksamen.html?aar=2025&id=H25-07) | 7 · CG3-Q2 | Count visibility and lighting samples in SSAA and MSAA | 8 / 9 | 5 |
| [H25-08-a](../eksamen.html?aar=2025&id=H25-08-a) | 8 · CG4-Q1 | Count intensity levels from endpoints and step size | 9 / 10 | 3 |
| [H25-08-b](../eksamen.html?aar=2025&id=H25-08-b) | 8 · CG4-Q1 | Allocate bits to intensity and two colour channels | 9 / 10 | 3 |
| [H25-09](../eksamen.html?aar=2025&id=H25-09) | 9 · CG4-Q2 | Justify bit allocation using code counts | 10 / 11 | 2 |
| [H25-10-a](../eksamen.html?aar=2025&id=H25-10-a) | 10 · CG4-Q3 | Classify rough and shiny materials using Phong coefficients | 11 / 12 | 5,04 |
| [H25-10-b](../eksamen.html?aar=2025&id=H25-10-b) | 10 · CG4-Q3 | Read which lighting effects the equation includes | 11 / 12 | 5,04 |
| [H25-11-a](../eksamen.html?aar=2025&id=H25-11-a) | 11 · IP1-Q1 | Relate the eye to a camera sensor | 12–14 / 13–15 | 3,2 |
| [H25-11-b](../eksamen.html?aar=2025&id=H25-11-b) | 11 · IP1-Q1 | Interpret a smaller aperture | 12–14 / 13–15 | 3,2 |
| [H25-11-c](../eksamen.html?aar=2025&id=H25-11-c) | 11 · IP1-Q1 | Explain the virtual image plane | 12–14 / 13–15 | 3,2 |
| [H25-11-d](../eksamen.html?aar=2025&id=H25-11-d) | 11 · IP1-Q1 | Choose the perspective equation for a virtual image plane | 12–14 / 13–15 | 3,2 |
| [H25-11-e](../eksamen.html?aar=2025&id=H25-11-e) | 11 · IP1-Q1 | Calculate a projected x-coordinate | 12–14 / 13–15 | 3,2 |
| [H25-11-f](../eksamen.html?aar=2025&id=H25-11-f) | 11 · IP1-Q1 | Explain depth from stereo | 12–14 / 13–15 | 3,2 |
| [H25-11-g](../eksamen.html?aar=2025&id=H25-11-g) | 11 · IP1-Q1 | Distinguish quantisation from spatial sampling | 12–14 / 13–15 | 3,2 |
| [H25-11-h](../eksamen.html?aar=2025&id=H25-11-h) | 11 · IP1-Q1 | Interpret spatial resolution | 12–14 / 13–15 | 3,2 |
| [H25-12](../eksamen.html?aar=2025&id=H25-12) | 12 · IP2-Q1 | Predict the histogram after clipping and contrast stretching | 15 / 16 | 2 |
| [H25-13-a](../eksamen.html?aar=2025&id=H25-13-a) | 13 · IP2-Q2 | Normalise histogram counts | 16 / 17 | 3,84 |
| [H25-13-b](../eksamen.html?aar=2025&id=H25-13-b) | 13 · IP2-Q2 | Calculate the cumulative distribution | 16 / 17 | 3,84 |
| [H25-13-c](../eksamen.html?aar=2025&id=H25-13-c) | 13 · IP2-Q2 | Round the histogram-equalisation mapping | 16 / 17 | 3,84 |
| [H25-13-d](../eksamen.html?aar=2025&id=H25-13-d) | 13 · IP2-Q2 | Sum counts at the new levels | 16 / 17 | 3,84 |
| [H25-14-a](../eksamen.html?aar=2025&id=H25-14-a) | 14 · IP2-Q3 | Reverse a directional kernel before convolution | 17 / 18 | 2 |
| [H25-14-b](../eksamen.html?aar=2025&id=H25-14-b) | 14 · IP2-Q3 | Apply a scaled Laplacian kernel to a neighbourhood | 17 / 18 | 2 |
| [H25-14-c](../eksamen.html?aar=2025&id=H25-14-c) | 14 · IP2-Q3 | Calculate a weighted directional derivative | 17 / 18 | 2 |
| [H25-14-d](../eksamen.html?aar=2025&id=H25-14-d) | 14 · IP2-Q3 | Find the median in a 3×3 window | 17 / 18 | 2 |
| [H25-15](../eksamen.html?aar=2025&id=H25-15) | 15 · IP2-Q4 | Interpret a positive normalised kernel's effect | 18–19 / 19–20 | 2,16 |
| [H25-16-a](../eksamen.html?aar=2025&id=H25-16-a) | 16 · IP3-Q1 | Calculate activation and loss before updating | 20–21 / 21–22 | 3,75 |
| [H25-16-b](../eksamen.html?aar=2025&id=H25-16-b) | 16 · IP3-Q1 | Backpropagate through ReLU and the affine term | 20–21 / 21–22 | 3,75 |
| [H25-16-c](../eksamen.html?aar=2025&id=H25-16-c) | 16 · IP3-Q1 | Update weight and bias using a learning rate | 20–21 / 21–22 | 3,75 |
| [H25-16-d](../eksamen.html?aar=2025&id=H25-16-d) | 16 · IP3-Q1 | Check loss with a new forward pass | 20–21 / 21–22 | 3,75 |
| [H25-17-a](../eksamen.html?aar=2025&id=H25-17-a) | 17 · IP3-Q2 | Count parameters in three convolutional layers | 22–23 / 23–24 | 4 |
| [H25-17-b](../eksamen.html?aar=2025&id=H25-17-b) | 17 · IP3-Q2 | Count parameters in two dense layers | 22–23 / 23–24 | 4 |
| [H25-17-c](../eksamen.html?aar=2025&id=H25-17-c) | 17 · IP3-Q2 | Count multiplications in two convolutional layers | 22–23 / 23–24 | 4 |
| [H25-17-d](../eksamen.html?aar=2025&id=H25-17-d) | 17 · IP3-Q2 | Count multiplications and additions in the final dense layer | 22–23 / 23–24 | 4 |
| [H25-18-a](../eksamen.html?aar=2025&id=H25-18-a) | 18 · IP3-Q3 | Find the embedding-matrix shape | 24–25 / 25–26 | 2,88 |
| [H25-18-b](../eksamen.html?aar=2025&id=H25-18-b) | 18 · IP3-Q3 | Determine the shapes of W_Q, W_K and W_V | 24–25 / 25–26 | 2,88 |
| [H25-18-c](../eksamen.html?aar=2025&id=H25-18-c) | 18 · IP3-Q3 | Determine projected Q, K and V shapes | 24–25 / 25–26 | 2,88 |
| [H25-18-d](../eksamen.html?aar=2025&id=H25-18-d) | 18 · IP3-Q3 | Find the score-matrix shape | 24–25 / 25–26 | 2,88 |
| [H25-18-e](../eksamen.html?aar=2025&id=H25-18-e) | 18 · IP3-Q3 | Find the shape after row-wise softmax | 24–25 / 25–26 | 2,88 |
| [H25-18-f](../eksamen.html?aar=2025&id=H25-18-f) | 18 · IP3-Q3 | Find the attention-output shape | 24–25 / 25–26 | 2,88 |
| [H25-18-g](../eksamen.html?aar=2025&id=H25-18-g) | 18 · IP3-Q3 | Size the output projection back to embedding space | 24–25 / 25–26 | 2,88 |
| [H25-19](../eksamen.html?aar=2025&id=H25-19) | 19 · IP4-Q1 | Relate impulse noise to Fourier magnitude | 26–27 / 27–28 | 2 |
| [H25-20-a](../eksamen.html?aar=2025&id=H25-20-a) | 20 · IP4-Q2 | Read amplitude, frequency and phase of a sine wave | 28 / 29 | 1,5 |
| [H25-20-b](../eksamen.html?aar=2025&id=H25-20-b) | 20 · IP4-Q2 | Read amplitude, frequency and phase of a cosine wave | 28 / 29 | 1,5 |
| [H25-21](../eksamen.html?aar=2025&id=H25-21) | 21 · IP4-Q3 | Identify spectral replicas after sampling | 29 / 30 | 2 |
| [H25-22-a](../eksamen.html?aar=2025&id=H25-22-a) | 22 · IP4-Q4 | Plan filtering from image to inverse FFT | 30 / 31 | 4,45 |
| [H25-22-b](../eksamen.html?aar=2025&id=H25-22-b) | 22 · IP4-Q4 | Explain sampling artefacts and aliasing | 30 / 31 | 4,45 |
| [H25-23](../eksamen.html?aar=2025&id=H25-23) | 23 · IP5-Q1 | Grow a four-connected region to stability | 31 / 32 | 2,4 |
| [H25-24-a](../eksamen.html?aar=2025&id=H25-24-a) | 24 · IP5-Q2 | Find the Hough normal of a descending diagonal | 32–33 / 33–34 | 2 |
| [H25-24-b](../eksamen.html?aar=2025&id=H25-24-b) | 24 · IP5-Q2 | Find the Hough normal of a vertical line | 32–33 / 33–34 | 2 |
| [H25-24-c](../eksamen.html?aar=2025&id=H25-24-c) | 24 · IP5-Q2 | Find the Hough normal of a line through the origin | 32–33 / 33–34 | 2 |
| [H25-24-d](../eksamen.html?aar=2025&id=H25-24-d) | 24 · IP5-Q2 | Find the Hough normal of a horizontal line | 32–33 / 33–34 | 2 |
| [H25-25-a](../eksamen.html?aar=2025&id=H25-25-a) | 25 · IP5-Q3 | Choose the comparison direction for non-maximum suppression | 34–35 / 35–36 | 1,6 |
| [H25-25-b](../eksamen.html?aar=2025&id=H25-25-b) | 25 · IP5-Q3 | Explain hysteresis as edge linking | 34–35 / 35–36 | 1,6 |
| [H25-25-c](../eksamen.html?aar=2025&id=H25-25-c) | 25 · IP5-Q3 | Justify smoothing before the Canny gradient | 34–35 / 35–36 | 1,6 |
| [H25-25-d](../eksamen.html?aar=2025&id=H25-25-d) | 25 · IP5-Q3 | Count the thresholds in Canny | 34–35 / 35–36 | 1,6 |
| [H25-26-a](../eksamen.html?aar=2025&id=H25-26-a) | 26 · IP6-Q1 | Define a structuring element's anchor | 36–37 / 37–38 | 2,58 |
| [H25-26-b](../eksamen.html?aar=2025&id=H25-26-b) | 26 · IP6-Q1 | Interpret a binary fit test | 36–37 / 37–38 | 2,58 |
| [H25-26-c](../eksamen.html?aar=2025&id=H25-26-c) | 26 · IP6-Q1 | Predict erosion's effect | 36–37 / 37–38 | 2,58 |
| [H25-26-d](../eksamen.html?aar=2025&id=H25-26-d) | 26 · IP6-Q1 | Identify hit-or-miss | 36–37 / 37–38 | 2,58 |
| [H25-26-e](../eksamen.html?aar=2025&id=H25-26-e) | 26 · IP6-Q1 | Define a morphological skeleton | 36–37 / 37–38 | 2,58 |
| [H25-26-f](../eksamen.html?aar=2025&id=H25-26-f) | 26 · IP6-Q1 | Describe flat greyscale dilation | 36–37 / 37–38 | 2,58 |
| [H25-27-a](../eksamen.html?aar=2025&id=H25-27-a) | 27 · IP6-Q2 | Subtract erosion from the object to find the inner boundary | 38–39 / 39–40 | 3,6 |
| [H25-27-b](../eksamen.html?aar=2025&id=H25-27-b) | 27 · IP6-Q2 | Subtract the object from dilation to find the outer boundary | 38–39 / 39–40 | 3,6 |
| [H25-28-a](../eksamen.html?aar=2025&id=H25-28-a) | 28 · IP6-Q3 | Calculate greyscale erosion with valid support and a corner anchor | 40–41 / 41–42 | 4 |
| [H25-28-b](../eksamen.html?aar=2025&id=H25-28-b) | 28 · IP6-Q3 | Calculate greyscale dilation with reflected support | 40–41 / 41–42 | 4 |

