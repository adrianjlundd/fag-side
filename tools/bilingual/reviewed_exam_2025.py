"""Manually translated H25 skills, original answers, variants and solutions."""
TEXT = '''H25-02-a
Scale the triangle's three column-vector vertices
The scaled vertices are (1,5;2), (6;2) and (1,5;6).
Scale triangle (1,0), (2,0), (1,2) by factors 3 and 2 about the origin. Find the vertices.
Multiply every x by 3 and every y by 2. Results are (3,0), (6,0) and (3,4). The final homogeneous row is unchanged.
@@
H25-02-b
Place the scaled vertex at a target point
The translation vector is (3,5;4), so A, B, C become (5;6), (9,5;6) and (5;10).
Translate triangle (3,0), (6,0), (3,4) so that its first vertex reaches (2,5).
The displacement is (2−3,5−0)=(−1,5). Add it to all vertices, obtaining (2,5), (5,5) and (2,9).
@@
H25-02-c
Rotate about the already translated vertex
Inspera gives A‴=(9,5;1,5). With the specified −90° about B″=(9,5;6), A″−B″=(−4,5;0), which rotates to (0;4,5). Thus A‴=(9,5;10,5). The official B‴ and C‴ agree with this rotation.
Rotate (2,5), (5,5), (2,9) 90° clockwise about B=(5,5).
Relative vectors are (−3,0), (0,0), (−3,4). Rule (x,y)↦(y,−x) gives (0,3), (0,0), (4,3). Add B back to obtain (5,8), (5,5), (9,8).
@@
H25-03
Order three matrices for column vectors
The official answer selects T₃T₂T₁. The rightmost factor acts first.
A point is scaled by S, rotated by R and translated by T. Which matrix do you use?
Compute p₁=Sp, p₂=Rp₁ and p₃=Tp₂. Substitution gives p₃=TRSp.
@@
H25-04-a
Construct the 3D scaling matrix
Scaling gives diagonal (2,3,1,1).
A cube receives scale factors (3,1,½). Where does (2,−1,4,1) move?
The homogeneous scaling matrix has diagonal (3,1,½,1). The point becomes (6,−1,2,1).
@@
H25-04-b
Construct a 3D rotation about a displaced centre
The rotation block maps (x,y,z)↦(−y,x,z), and the translation part is (11,3,0) from c−Rzc at c=(4,7,0).
Rotate by +90° about an axis parallel to z through (2,3,0). Find the translation column.
Use T(c)RT(−c). Since Rc=(−3,2,0), c−Rc=(5,1,0). Check that c stays fixed.
@@
H25-04-c
Construct a homogeneous 3D translation
The identity matrix receives (−3,5,1) in the top three entries of its final column.
Apply T(1,−2,4) to point (3,3,0,1) and direction (3,3,0,0).
The final coordinate multiplies the translation. The point becomes (4,1,4,1). The direction remains (3,3,0,0).
@@
H25-04-d
Determine the dimensions of a homogeneous vertex matrix
Four rows. All eight transformed points have w=1 after the affine operations.
A 3D mesh has five vertices. What are the dimensions after an affine 4×4 matrix acts on all vertices?
Each vertex is a column with four components. Product (4×4)(4×5) gives 4×5, and all w remain 1.
@@
H25-05
Derive a camera matrix from eye, target and up vector
Inspera accepts T(0,0,15) and Rᵧ(180°)T(0,0,15). For a camera looking along local −z, the latter maps (x,y,z)↦(−x,y,−z−15). Both map the eye to the origin.
The camera is at (0,0,−4), looking at the origin with y up. Use a right-handed camera looking along local −z. Where is (1,2,0) in camera space?
Translate by (0,0,4), giving (1,2,4). A half-turn about y gives (−1,2,−4). The target is in front of the camera, with negative camera z.
@@
H25-06-a
Count incremental operations per triangle sample
Three additions update the three edge values.
Two neighbouring pixels are one unit apart in x. How many additions update all four edge functions of a convex quadrilateral?
Each linear edge function needs one update. Four edges give four additions.
@@
H25-06-b
Determine whether a point is inside a triangle
All three edge functions must have the same sign with consistent orientation. Samples exactly on an edge need a boundary rule.
Three edge values are (4,−1,3) for counterclockwise edges with positive interior. Is the sample inside?
No. The negative value puts it outside one edge, even though the other two tests are positive.
@@
H25-06-c
Count candidate pixels
All 1000 pixels in the box are tested, including the 250 found to be outside.
A 12×6 box encloses 33 covered pixels. How many candidates must the simple box loop test?
12·6=72 candidates. 72−33=39 are rejected after the edge test.
@@
H25-07
Count visibility and lighting samples in SSAA and MSAA
For two pixels, the counts are 8, 8, 8 and 2. A comment also accepts 4, 4, 4 and 1 when given per pixel.
Three pixels each have eight subsamples. Count coverage tests and shading computations for SSAA and MSAA in the exam model.
SSAA performs 3·8=24 of each. MSAA also performs 24 coverage tests but only three shading computations.
@@
H25-08-a
Count intensity levels from endpoints and step size
From 20 to 56 in steps of two, there are 19 levels.
Levels run from 12 to 60 in steps of 4. How many levels are there?
Difference 48 gives 12 intervals, and both endpoints count. Thus there are 13 levels.
@@
H25-08-b
Allocate bits to intensity and two colour channels
The official answer has 6 red, 5 green and 5 intensity bits.
A system needs 13 intensity levels and twice as many red as green levels. Allocate 13 bits with the fewest possible intensity bits.
Four intensity bits give 16 codes. The nine remaining bits give five to red and four to green, since 32=2·16.
@@
H25-09
Justify bit allocation using code counts
19 levels require at least 5 bits. Of the remaining 11, one extra red bit gives twice as many red as green codes. Check the numbers against official answer no. 8.
A colleague allocates twice as many bits to red as green to double the number of levels. Show what is needed with four green bits.
Four bits give 16 levels. The target is 32, requiring five red bits. Eight red bits would give 256.
@@
H25-10-a
Classify rough and shiny materials using Phong coefficients
The four pairs are labelled rough, shiny, shiny and rough in the question's order.
Two materials share an exponent, but (k_d,k_s) are (0,9;0,1) and (0,2;0,8). Which has the strongest highlight with the same geometry?
The second material has specular weight 0,8 versus 0,1. With the same positive directional term, it gives a stronger highlight.
@@
H25-10-b
Read which lighting effects the equation includes
The model includes multiple lights, intensity and distance. Interreflections and properties of the transmission medium are absent.
A formula sums Iⱼ/(1+dⱼ²) over lamps. Which of multiple lights, distance attenuation and light reflected via another surface are explicitly modelled?
The sum covers multiple lamps, and the denominator gives distance attenuation. No term follows an extra reflection from a neighbouring surface.
@@
H25-11-a
Relate the eye to a camera sensor
The retina corresponds to the sensor.
Which part of a camera resembles the retina, and where is light detected?
The image sensor receives the light distribution formed by the optics. Similarly, photoreceptors detect light on the retina.
@@
H25-11-b
Interpret a smaller aperture
In the question's geometric model, the image becomes darker and sharper.
Two pinhole cameras have the same sensor distance. One has a smaller hole. Why can this improve geometric sharpness?
Fewer rays from one object point reach different sensor locations. The point spread is smaller, and fewer rays give lower brightness.
@@
H25-11-c
Explain the virtual image plane
In front of the projection centre, projection geometry is preserved and the image is upright.
A point lies above the optical axis. Why does it appear above the axis on a virtual plane in front of the camera?
The ray from the centre towards the point crosses the front plane on the same side of the axis. On a plane behind the centre, its extension would meet the opposite side.
@@
H25-11-d
Choose the perspective equation for a virtual image plane
Alternative C in the figure gives x=fX/Z and y=fY/Z.
On a virtual image plane, f=5, X=3, Y=6 and Z=15. Find both image coordinates.
Similar triangles give x=5·3/15=1 and y=5·6/15=2.
@@
H25-11-e
Calculate a projected x-coordinate
The official answer gives 1 mm.
A point is 80 mm from the optical axis and 800 mm in front of a pinhole camera with f=12 mm. Find its image distance from the axis.
x=fX/Z=12·80/800=1,2 mm.
@@
H25-11-f
Explain depth from stereo
Two different camera positions make disparity measurable.
Two identical parallel cameras view a near and a distant point. Which gives the larger difference in horizontal image position?
In a rectified pair, disparity is fB/Z. The near point has smaller Z and therefore larger disparity.
@@
H25-11-g
Distinguish quantisation from spatial sampling
Quantisation limits the number of permitted intensity levels.
An image keeps its 512×512 pixels but changes from eight to four bits per pixel. What changes?
The number of intensity codes falls from 256 to 16. Spatial sample positions are unchanged.
@@
H25-11-h
Interpret spatial resolution
The official answer relates it to the smallest spatial change the sampling grid can represent.
Pixel spacing halves in both directions over the same sensor area. What happens to the number of sample positions?
It doubles along each axis, giving four times as many overall. Finer spatial variations can be recorded if the optics permit.
@@
H25-12
Predict the histogram after clipping and contrast stretching
The official answer selects figure C. Dark inputs are pushed towards the left endpoint and the most strongly saturated towards the right.
In an image with eight possible grey levels, apply T(r)=min(7,max(0,3r−3)). Where do r=0,1,4 end up?
T(0)=0, T(1)=0 and T(4)=7. Two groups therefore contribute to the same dark bin and one to the brightest.
@@
H25-13-a
Normalise histogram counts
The table's 471 at level 3 gives total 4196. The text line has 417. The official rounded probabilities follow the table: 0,03; 0,02; 0,07; 0,11; 0,15; 0,25; 0,19; 0,18.
Four grey levels have counts [2,3,0,5]. Find the distribution.
The total is 10. Divide each count by 10 to obtain [0,2; 0,3; 0; 0,5]. Probabilities sum to 1.
@@
H25-13-b
Calculate the cumulative distribution
The official answer gives 0,03; 0,05; 0,12; 0,23; 0,38; 0,63; 0,82; 1,00.
Four grey levels have counts [2,3,0,5]. Find the cumulative distribution.
Running counts are 2,5,5,10. Divide by 10, giving F=[0,2;0,5;0,5;1].
@@
H25-13-c
Round the histogram-equalisation mapping
Rounding 7F gives [0,0,1,2,3,4,6,7].
F=[0,2;0,5;0,5;1]. Find the mapping to four levels using s=round(3F), with halves upwards.
3F=[0,6;1,5;1,5;3]. Nearest-integer rounding gives [1,2,2,3].
@@
H25-13-d
Sum counts at the new levels
The official answer has H(s)=[201,281,471,639,1054,0,800,750]. Output level 5 receives no pixels.
Input counts are [2,3,0,5] and the mapping to new levels is [1,2,2,3]. Find the output histogram for levels 0 through 3.
Nothing maps to 0. Level 1 receives 2, level 2 receives 3+0, and level 3 receives 5. The result is [0,2,3,5].
@@
H25-14-a
Reverse a directional kernel before convolution
The first kernel gives −2 at the marked position.
Find convolution at the centre of [1,4,9] with [−1,0,1].
Reverse to [1,0,−1]. The dot product is 1·1+4·0−9=−8. Correlation would give the opposite sign.
@@
H25-14-b
Apply a scaled Laplacian kernel to a neighbourhood
The second kernel gives 1,5.
A kernel has centre 4 and −1 at each of four edge neighbours. Divide the entire kernel by 4. Centre intensity is 6; neighbours are 2,3,4,3. Find the response.
(4·6−2−3−4−3)/4=12/4=3. The symmetric kernel is unchanged by reversal.
@@
H25-14-c
Calculate a weighted directional derivative
The third kernel gives 1.
A window has rows [2,2,2], [0,0,0], [1,1,1]. The kernel has rows [−1,−2,−1], [0,0,0], [1,2,1]. Find convolution at the centre.
After 180° reversal, the top row contributes +4·2=8 and the bottom −4·1=−4. The result is 4.
@@
H25-14-d
Find the median in a 3×3 window
The median at the marked position is 0.
A 3×3 window contains 1,8,2,4,3,7,3,0,9. Find the median.
Sorted values are 0,1,2,3,3,4,7,8,9. The fifth is 3.
@@
H25-15
Interpret a positive normalised kernel's effect
Figure B shows smoothing. The nine weights sum to one, and the centre has the greatest weight.
A flat region has value 10 except for centre 18. A kernel weights the centre by ½ and four direct neighbours by ⅛ each. What is the centre output?
½·18+4·⅛·10=9+5=14. The bright outlier is suppressed.
@@
H25-16-a
Calculate activation and loss before updating
The first three fields give z=3, a=3 and L=0,5.
A ReLU neuron has x=2, w=1,5, b=−1 and target y=4. Find z, a and half squared-error loss.
z=1,5·2−1=2, a=max(0,2)=2, and L=(2−4)²/2=2.
@@
H25-16-b
Backpropagate through ReLU and the affine term
The official local derivatives are −1,1,1,1, followed by δ=−1, ∂L/∂w=−1, ∂L/∂b=−1.
Use x=2, w=1,5, b=−1 and y=4. What are the gradients for L=(ReLU(wx+b)−y)²/2?
z=2>0 gives ReLU′=1. δ=(2−4)·1=−2. Thus ∂L/∂w=−2·2=−4 and ∂L/∂b=−2.
@@
H25-16-c
Update weight and bias using a learning rate
The official answer gives w′=2,5 and b′=1,5.
With gradients −4 and −2, w=1,5, b=−1 and learning rate 0,1, find the new parameters.
Subtract learning rate times each gradient. New w is 1,5+0,4=1,9 and new b is −1+0,2=−0,8.
@@
H25-16-d
Check loss with a new forward pass
After updating, z′=a′=4 and L′=0.
Use x=2, w′=1,9, b′=−0,8 and target 4. Find the new half squared-error loss.
z′=3,8−0,8=3. ReLU gives 3 and L′=(3−4)²/2=0,5, lower than loss 2 before the step.
@@
H25-17-a
Count parameters in three convolutional layers
The layers' (P,F,S,K) are (2,5,1,6), (0,5,1,16) and (0,5,1,120). Parameter counts are 156, 2416 and 48 120 with one bias per output channel.
A 3×3 layer receives five channels and has seven output filters. How many parameters are trained?
Each output filter needs 3·3·5=45 weights and one bias. Total: 7·46=322.
@@
H25-17-b
Count parameters in two dense layers
The fourth layer has (120+1)·84=10 164 parameters. The last has 840 weights and ten biases.
Two dense layers have sizes 20→6→3. Find weights and biases in each.
The first has 20·6=120 weights and six biases. The second has 6·3=18 weights and three biases.
@@
H25-17-c
Count multiplications in two convolutional layers
The first layer uses 117 600 and the second 240 000 multiplications per image under the stated model.
A 3×3 filter-bank layer with 2 input channels and 4 output channels produces a 6×6 map per filter. How many multiplications are performed?
Each of 6·6·4 outputs requires 3·3·2 multiplications. Their product is 2592.
@@
H25-17-d
Count multiplications and additions in the final dense layer
84 inputs and 10 outputs give 840 multiplications and 840 additions including bias.
A dense layer has five inputs and three outputs. Count multiplications and additions, including bias.
Each output has five products, four additions between them and one bias addition. Three outputs give 15 multiplications and 15 additions.
@@
H25-18-a
Find the embedding-matrix shape
X has shape 4×5.
A sequence has three tokens with four components each. Give the shape with tokens as rows.
Three rows and four columns give 3×4.
@@
H25-18-b
Determine the shapes of W_Q, W_K and W_V
W_Q and W_K are 5×3. W_V is 5×2.
Input dimension is 4, query and key dimension 2, and value dimension 3. What are the projection shapes?
Width-4 row vectors multiply 4×2 matrices for query and key. Value needs 4×3.
@@
H25-18-c
Determine projected Q, K and V shapes
Q and K are 4×3, V is 4×2.
X has shape 3×4, W_Q and W_K are 4×2, and W_V is 4×3. Find the three output shapes.
The inner dimensions contract. Q and K are 3×2, V is 3×3.
@@
H25-18-d
Find the score-matrix shape
QKᵀ has shape 4×4.
There are six tokens and two components per query and key. How many pairwise scores result?
Q is 6×2 and Kᵀ is 2×6. The product is 6×6, giving 36 scores.
@@
H25-18-e
Find the shape after row-wise softmax
The weight matrix has shape 4×4.
A matrix with three query rows and five key columns receives row-wise softmax. What is its shape and each row's sum?
Each row retains five probabilities summing to 1. Shape remains 3×5.
@@
H25-18-f
Find the attention-output shape
Attention weights times V gives 4×2.
Weights have shape 3×3 and V shape 3×2. What shape is the weighted sum of value vectors?
Each query receives one length-two vector. Product (3×3)(3×2) is 3×2.
@@
H25-18-g
Size the output projection back to embedding space
W_O has shape 2×5, giving final result 4×5.
Four tokens have three-dimensional context vectors and must return to embedding width six. Which output projection is needed?
Use W_O with shape 3×6. Product (4×3)(3×6) has shape 4×6.
@@
H25-19
Relate impulse noise to Fourier magnitude
Figure B has a bright central structure and broadly distributed noise.
What distinguishes extra energy from random salt-and-pepper noise from energy due to a single sinusoid in an image?
A short impulse has a broad spectrum. Many randomly placed impulses raise the noise floor over many frequencies. One periodic sinusoid gives a symmetric peak pair.
@@
H25-20-a
Read amplitude, frequency and phase of a sine wave
The first wave has A=1, f=1 and phase 0 with sine as reference.
Find A, f and φ in 2sin(6πt+0,4).
Compare with A sin(2πft+φ). Amplitude is 2, f=6π/(2π)=3 and φ=0,4 radians.
@@
H25-20-b
Read amplitude, frequency and phase of a cosine wave
The second wave has A=3, f=2 and phase 0,2 with cosine as reference.
Find A, f and φ in 5cos(πt−0,3) with cosine as reference.
A=5, f=π/(2π)=0,5 and phase is −0,3 radians.
@@
H25-21
Identify spectral replicas after sampling
Figure A shows periodic replicas of the spectrum.
What is the spacing between spectral replicas when a continuous row is sampled every 0,25 mm?
Sampling frequency is 1/0,25=4 samples/mm. The spectrum repeats every 4 cycles/mm.
@@
H25-22-a
Plan filtering from image to inverse FFT
Zero-extend if linear convolution is required, transform, multiply by the filter response in the same frequency order, invert and crop. Undo any centring before the inverse FFT.
A 10×8 image is linearly convolved with a 3×5 kernel. What is the minimum transform size?
The full result requires (10+3−1)×(8+5−1)=12×12. Insert image and kernel with consistent origins, multiply their spectra and invert.
@@
H25-22-b
Explain sampling artefacts and aliasing
Undersampling lets spectral replicas overlap, so different frequencies produce the same samples. Limit frequency content before downsampling.
A 7 Hz sinusoid is sampled at 10 Hz. Which lower frequency can mimic it?
The Nyquist limit is 5 Hz. Its distance from 10 Hz is 3 Hz. A 3 Hz wave with suitable phase gives the same samples.
@@
H25-23
Grow a four-connected region to stability
The official answer includes (2,2), (2,3), (3,3) and (4,3) as (row,column) indexed from 1. Value 5 is included with seed value 7 and threshold 2.
Rows are [4,4,0], [0,5,0], [5,0,4]. Start in the centre, permit differences at most 1 from the seed, and use four neighbours. Which cells enter?
From (2,2), reach (1,2), then (1,1). The two permitted values in the bottom row are not four-connected to the seed. The region has three cells.
@@
H25-24-a
Find the Hough normal of a descending diagonal
For A, θ=45° and ρ≈1,41.
Find (θ,ρ) for x+y=4 with ρ=x cos θ+y sin θ.
Divide both sides by √2 to obtain a unit normal. Then θ=45° and ρ=4/√2≈2,83.
@@
H25-24-b
Find the Hough normal of a vertical line
B gives (0°,3).
A vertical line has x=5. What is (θ,ρ)?
The unit normal is (1,0). Thus θ=0° and ρ=5.
@@
H25-24-c
Find the Hough normal of a line through the origin
Line C has ρ=0 and normal angle approximately 116°.
Find (θ,ρ) for y=x with 0≤θ<180°.
The line passes through the origin, so ρ=0. Its direction angle is 45°, and the perpendicular normal has θ=135°.
@@
H25-24-d
Find the Hough normal of a horizontal line
D gives (90°,1).
A horizontal line has y=4. What is (θ,ρ)?
The normal is (0,1), giving θ=90° and ρ=4.
@@
H25-25-a
Choose the comparison direction for non-maximum suppression
Compare gradient magnitude perpendicular to the edge.
A vertical edge has a rightward gradient. Which two neighbours should thinning compare against?
Use left and right neighbours along the gradient. Retain local maxima across the edge.
@@
H25-25-b
Explain hysteresis as edge linking
The official answer selects joining edge segments.
A weak edge pixel lies between two strong ones along the same edge. What happens after hysteresis?
If the weak response exceeds the low threshold and is connected to a strong response, it remains and links the segments.
@@
H25-25-c
Justify smoothing before the Canny gradient
The purpose is noise reduction.
Why can one very bright noise point create a false edge?
It produces large local differences. Mild Gaussian smoothing spreads the impulse before differentiation, suppressing the gradient response.
@@
H25-25-d
Count the thresholds in Canny
Two thresholds are used.
A response is 6, low threshold 3 and high threshold 8. What role does each threshold play?
6 passes the low test and is a candidate, but fails the high test defining a strong starting pixel.
@@
H25-26-a
Define a structuring element's anchor
The anchor determines the element's placement relative to the output pixel.
A 1×3 element has its anchor in the left cell. What does it cover during erosion at column j?
Place its left cell at j. The rest lies at j+1 and j+2. All three must be valid for complete support.
@@
H25-26-b
Interpret a binary fit test
For erosion, the entire support of the element must lie in foreground.
A cross mask has five active cells. Four lie on foreground and one on background. What is the erosion value?
At least one required cell is missing. The output at the anchor is 0.
@@
H25-26-c
Predict erosion's effect
White foreground shrinks as boundary pixels are lost.
A white 3×3 square lies alone on black background. What remains after erosion with a centred 3×3 box?
Only the centre pixel can cover the entire box with white. The result is one pixel.
@@
H25-26-d
Identify hit-or-miss
The method searches for a particular foreground/background configuration.
You want isolated white pixels with eight black neighbours. Which two requirements are combined?
Require foreground at the centre and background at all eight neighbouring positions. Hit-or-miss tests both at the same placement.
@@
H25-26-e
Define a morphological skeleton
The official answer uses centres of maximal inscribed disks.
Consider a filled circle in continuous geometry. Where is the centre of its only maximal inscribed disk?
At the circle's centre. Every smaller disk is contained in the large disk and is therefore not maximal.
@@
H25-26-f
Describe flat greyscale dilation
The operation finds the local maximum over the element.
A symmetric 1×3 element covers [2,9,4]. What value does the centre receive after flat dilation?
max(2,9,4)=9. A bright value can thus spread to neighbouring positions.
@@
H25-27-a
Subtract erosion from the object to find the inner boundary
Three interior cells (3,3), (3,4) and (4,3) are absent from the boundary image, using indices starting at 1. The remaining original foreground forms the boundary.
A white 5×5 square lies inside a black 9×9 image. How many pixels form its inner boundary with a 3×3 box?
Erosion gives 3×3. Inner boundary is original minus erosion and contains 25−9=16 pixels.
@@
H25-27-b
Subtract the object from dilation to find the outer boundary
The official answer gives a ring outside the object. Cell (5,5) becomes boundary, while (6,6) is background because the nearest foreground is too far away.
A white 5×5 square is centred in a black 9×9 image. How many pixels form its outer boundary with a 3×3 box?
The dilated region is 7×7. Outer boundary contains 49−25=24 pixels.
@@
H25-28-a
Calculate greyscale erosion with valid support and a corner anchor
Take the minimum over centre, right and below. E(1,1)=min(2,4,5)=2. The last row and column have −1.
A 3×3 image has rows [4,1,6], [2,5,3], [7,0,8]. Use an L-mask anchored at the top left, with active positions centre, right and below. Find erosion, using −1 for invalid support.
Row 1 minima are min(4,1,2)=1 and min(1,6,5)=1. Row 2 gives 2 and 0. Output rows are [1,1,−1], [2,0,−1], [−1,−1,−1].
@@
H25-28-b
Calculate greyscale dilation with reflected support
The official answer takes the maximum over centre, left and above. D(2,2)=max(1,5,4)=5. The first row and column receive −1.
A 3×3 image has rows [4,1,6], [2,5,3], [7,0,8]. Dilate with B={(0,0),(0,1),(1,0)} and D(p)=max I(p−b). Use −1 for invalid support.
The first row and column are invalid. D(2,2)=max(5,2,1)=5 and D(2,3)=max(3,5,6)=6. The bottom row gives 7 and 8. Output rows are [−1,−1,−1], [−1,5,6], [−1,7,8].'''
