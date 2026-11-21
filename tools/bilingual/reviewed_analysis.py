"""Manual English translation of the exam analysis, before its register tables."""
INTRO = '''# TDT4195 · Exam analysis for autumn 2026

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
'''
