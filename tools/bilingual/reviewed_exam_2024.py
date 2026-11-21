"""Manually translated H24 skills, original answers, variants and solutions."""
TEXT = '''H24-02-a
Compose scaling and rotation
For column points, M = Rz(90°)S. It maps (x,y,z) ↦ (−2y,x,3z), with w = 1.
P=(1,2,3) is scaled by factors (2,1,2) before a positive quarter-turn about z. Find the final point.
Scaling gives (2,2,6). A positive quarter-turn maps (x,y) to (−y,x), giving (−2,2,6).
@@
H24-02-b
Count multiplications with and without composition
Applying two matrices to every vertex costs 2·16·1000 = 32 000. Forming their product first costs 64 + 16·1000 = 16 064.
You have two general 4×4 matrices and 12 vertices. How many multiplications do you save by combining the matrices?
Direct application costs 2·12·16 = 384. Precomputation costs 64 + 12·16 = 256. The saving is 128.
@@
H24-03
Read the camera basis and move the eye to the origin
The arrows depict equally oriented bases. If the handwritten label is E=(3,0,0), this gives T(−3,0,0). Its placement on the drawn z-axis instead gives T(0,0,−3) if the distance is three. State which part of the figure you use.
A camera has the same axes as the world and is at (2,−1,4). Where is world point (3,2,0) in camera space?
Subtract the camera position from the point. (3−2,2−(−1),0−4)=(1,3,−4). The view matrix's translation column is (−2,1,−4).
@@
H24-04-a
Count clipping planes in a perspective volume
Six planes bound the volume: four side planes, one near plane and one far plane.
A point falls inside all four sides in the camera image but lies beyond the far plane. Should it be included?
No. All six half-spaces must contain the point simultaneously.
@@
H24-04-b
Determine perspective-matrix entries
With w′=z and signed n=−20, f=−120, the formula in the question gives diagonal entries −1, −2, 1,4 and z-translation 48.
Use w′=z, n=−2 and f=−6. Find a and b so that z_NDC=(az+b)/z gives −1 at n and +1 at f.
At n, a−b/2=−1. At f, a−b/6=1. Subtracting gives b/3=2, so b=6 and a=2. Checking z=−6 gives 1.
@@
H24-05-a
Find first differences of three edge functions
Increasing y by one gives differences −5, 3 and 1.
Let e(x,y)=7x−2y+5. What is e(x,y+1)−e(x,y)?
Subtract the expressions. All other terms cancel, leaving −2.
@@
H24-05-b
Count operations at the first pixel
Direct evaluation of the three expressions costs six multiplications and six additions under the question's cost model.
What is the cost of two expressions ax+by+c with general coefficients?
Each expression has two products and two sums. Two expressions require four multiplications and four additions.
@@
H24-05-c
Count updates across the bounding box
After the first sample, 22·25−1=549 pixels remain, each requiring three additions. Total: 1647.
A box contains 8×5 pixels. How many additions are required after the first evaluation with three edge functions?
There are 40−1=39 remaining samples. Three updates per sample give 117.
@@
H24-06-a
Select pixels during line rasterisation
Among the marked cells, a, c and d are selected.
Pixel centres lie at integer coordinates. Rasterise the line from (0,0) to (1,3) using the nearest x for each integer y. Find the pixels.
At y=0,1,2,3, x=0,⅓,⅔,1. Rounding gives (0,0), (0,1), (1,2), (1,3).
@@
H24-06-b
Trace intersected grid cells
The line crosses all five marked cells.
A segment runs from (0,2; 0,2) to (1,8; 1,2) in a grid with integer-coordinate boundaries. Which cells are crossed? Give their bottom-left corners.
At x=1, y=0,7. At y=1, x=1,48. The segment therefore passes through (0,0), (1,0) and (1,1).
@@
H24-06-c
Compare rasterisation and traversal sets
The rasterisation set A is a subset of traversal set B. Equality is possible.
A horizontal line passes through pixel centres in one row. Can rasterisation and traversal produce the same pixels?
Yes. The line passes through only one row and selects one centre in each visited column. Thus A=B is possible.
@@
H24-07
Calculate SSAA and MSAA cost
For N=1024², the costs are 9NR and N(9·0,4+0,6)R = 4,2NR.
With four samples, visibility uses 25 % and shading 75 % of R per pixel. Find MSAA cost in the simplified model.
Four coverage samples and one shading computation give (4·0,25+0,75)R=1,75R per pixel. SSAA uses 4R.
@@
H24-08
Distinguish frustum culling from clipping
An object entirely outside the view volume can be rejected by a conservative bounding-volume test. A primitive crossing a clipping plane must be trimmed by intersection.
A sphere enclosing a mesh intersects the near plane, but one triangle is entirely outside. Can the whole mesh be discarded?
No. The sphere does not rule out visible geometry. Continue testing or clipping triangles, discarding those entirely outside.
@@
H24-09
Correct the Liang–Barsky interval test and endpoints
Lines 1 and 2 must initialise bounds to 0 and 1. Line 3 accepts entry ≤ exit. Both output coordinates on lines 6–7 must use starting point in1. Lines 4, 5 and 8 are correct.
Clip P(t)=(−2,1)+t(8,0) to 0≤x≤4 and 0≤y≤2. Give the t-interval and endpoints.
The condition 0≤−2+8t≤4 gives ¼≤t≤¾. y=1 is inside. The points are (0,1) and (4,1).
@@
H24-10
Construct a counterexample to clipping polygon edges independently
A large polygon may surround the clipping window. No polygon edge is then inside the window, although the entire window belongs to the clipped polygon.
Square [−2,2]² is clipped to [−1,1]². How many original edges have a portion inside? What is the result's area?
All four lie outside. The intersection is nevertheless the entire smaller square, with area 2·2=4.
@@
H24-11-a
Count distinguishable intensities
From 20 to 200 with minimum step 10, there are 1+(200−20)/10=19 levels.
A sensor distinguishes 5, 8, …, 35. How many levels and at least how many bits are required?
There are (35−5)/3+1=11 levels. Three bits give 8 codes and four give 16, so four bits are needed.
@@
H24-11-b
Allocate bits between colour channels
12 bits with four times as many green as red levels gives 7 green bits and 5 red bits.
Allocate ten bits so blue receives four times as many codes as red. Find the allocation.
Four times as many codes requires two extra bits. b+r=10 and b−r=2 give b=6 and r=4.
@@
H24-11-c
Interpret a minimum visible difference
The stated difference threshold is constant over the intensity range.
A system has threshold 2 at every background level. Is a difference of 1 perceptible at both low and high brightness?
No. The absolute difference 1 is below the threshold in both cases.
@@
H24-12-a
Identify material parameters in Phong
The model describes material using kₐ, k_d and k_s.
Double k_d while keeping light direction, light intensity and the rest of the material fixed. Which contribution doubles?
The diffuse term is proportional to k_d. The ambient and specular terms have their own coefficients.
@@
H24-12-b
Identify light-source intensity
I_i represents the intensity of light source i.
A single lamp changes intensity from 2 to 6. What happens to direct lighting if distance and direction stay fixed?
The factor is 6/2=3. Direct lighting triples, while any ambient light is unchanged.
@@
H24-12-c
Determine whether a medium is modelled
The transmission medium's type is not a separate parameter in this model.
Does the same local Phong expression automatically change colour if a scene fills with smoke?
No. A description of scattering or absorption in the medium is required.
@@
H24-12-d
Relate direction to the specular term
The official answer marks halfway vector h as indirect directional information. h lies between the light and viewing directions.
Unit vectors L and V are both (0,0,1). Find h and evaluate N·h for N=(0,0,1).
h=(L+V)/‖L+V‖=(0,0,1). Thus N·h=1, giving a maximal directional term.
@@
H24-13-a
Explain the information supplied by lighting
Lighting and surface normals reveal curvature and orientation. A uniformly coloured object drawn using albedo alone lacks these variations.
Why can a disk and sphere with the same silhouette look different under a side light?
The disk has an approximately constant normal. The sphere's normal varies, so N·L and hence diffuse intensity vary across its surface.
@@
H24-13-b
Interpret an achromatic lighting factor
A shared multiplicative lighting factor changes brightness while preserving channel ratios before clipping.
RGB colour (0,8;0,4;0,2) receives a shared lighting factor 0,5. Which colour is displayed?
Each channel halves to (0,4;0,2;0,1). Their ratio remains 4:2:1.
@@
H24-14-a
Run a linear neuron through to its loss
z=0, a=0 and L=0,5.
A linear neuron has x=2, w=1, b=−1, target 3 and L=(a−y)²/2. Find z, a and L.
z=1·2−1=1. Linear activation gives a=1. Loss is (1−3)²/2=2.
@@
H24-14-b
Apply the chain rule from loss to parameter gradients
The four local derivatives in fields 4–7 are −1, 1, 0 and 1. Thus δ=−1, ∂L/∂w=0 and ∂L/∂b=−1.
Use x=2, w=1, b=−1, linear activation and target 3 with half squared-error loss. Find both gradients.
a=1, so δ=(1−3)·1=−2. The weight gradient is δx=−4, and bias gradient δ=−2.
@@
H24-14-c
Update both parameters simultaneously
At learning rate 1, the new weight is 0,5 and new bias 1.
Start with w=1 and b=−1. Gradients are −4 and −2. Take one step with learning rate 0,25.
w′=1−0,25·(−4)=2. b′=−1−0,25·(−2)=−0,5. Both gradients refer to the old parameter point.
@@
H24-15-a
Trace tensor shapes for the first CNN input
The four H×B×D shapes are 10×10×2, 5×5×2, 5×5×3 and 4×4×3.
A 12×12×1 image receives four 3×3 filters, padding 1 and stride 1, followed by 2×2 pooling with stride 2. Find both shapes.
Spatial size after convolution is (12+2−3)/1+1=12. Filter count gives 12×12×4. Pooling gives 6×6×4.
@@
H24-15-b
Trace tensor shapes with different strides and filter counts
Shapes are 10×10×5, 5×5×5, 3×3×4 and 2×2×4.
A 15×15×2 image receives six 3×3 filters with stride 2 and no padding. Then apply 3×3 pooling with stride 2 and no padding. Find the shapes.
First (15−3)/2+1=7, giving 7×7×6. Then (7−3)/2+1=3, giving 3×3×6.
@@
H24-16-a
Divide an image into patches and determine sequence shape
Four patches give four tokens. Each flattened input vector has length four before projection.
How many tokens and values per token come from a 6×8×3 image with non-overlapping 2×2 patches and no class token?
There are (6/2)(8/2)=12 patches. Each contains 2·2·3=12 values.
@@
H24-16-b
Add the position vector
Embedding plus position gives (2,3).
Add position vector (−1,2) to embedding (3,0).
The componentwise sum is (3−1,0+2)=(2,2). Vector length remains two.
@@
H24-16-c
Calculate a query using row vectors
The row vector after W_Q is (1,1).
With x=(2,3) and W_Q having rows (0,1) and (1,2), find q=xW_Q.
The first component is 2·0+3·1=3. The second is 2·1+3·2=8. Thus q=(3,8).
@@
H24-16-d
Scale the query–key dot product
The official answer gives scaled score 2.
With q=(1,2), k=(2,0) and d_k=2, what is the scaled score?
The dot product is 1·2+2·0=2. Divide by √2 to obtain √2.
@@
H24-16-e
Find one token's contribution to the context vector
The stated weight times value gives (0,5;0,5).
An attention weight is 0,25 and value is (4,−8). Find the contribution.
Componentwise scaling gives (1,−2). Summing such contributions over all source tokens produces the output vector.
@@
H24-17
Match four tone curves to resulting images
The matches are A→4, B→2, C→1 and D→3.
Two normalised curves are s=r² and s=1−r. What happens to a surface at r=0,25 and a bright surface at r=1?
The first gives 0,0625 and 1, darkening midtones. The second gives 0,75 and 0, reversing brightness order.
@@
H24-18-a
Calculate valid correlation of an impulse
Correlation gives the question's 3×3 kernel rotated by 180°, with 9 at the top left and 1 at the bottom right.
Find valid correlation of row [0,0,1,0,0] with kernel [2,0,−1], stride 1.
Apply the kernel in its given order to each window. Read the coefficient aligned with the one. The result is [−1,0,2].
@@
H24-18-b
Calculate valid convolution of the same impulse
Convolution gives the kernel in its original orientation, with 1 at the top left and 9 at the bottom right.
Find valid convolution of [0,0,1,0,0] with [2,0,−1].
Reverse the kernel to [−1,0,2] before sliding it. The three windows give [2,0,−1].
@@
H24-19-a
Derive histogram probabilities from areas
In order r₁,r₂,r₃, the probabilities are 0,9375, 0,0156 and 0,0469 after rounding.
An 8×8 image has a centred 4×4 region containing an inner 2×2 square. Find proportions outside, in the ring and at the centre.
Outside there are 64−16=48 pixels, in the ring 16−4=12, and at the centre 4. Divide by 64 to obtain 0,75, 0,1875 and 0,0625.
@@
H24-19-b
Calculate new grey levels using the cumulative distribution
In increasing input-intensity order, r₃, r₂ and r₁ map to outputs 12, 16 and 255.
Three increasing levels have probabilities ¼, ¼, ½. Use eight output levels and nearest-integer rounding with halves upwards. Find the new levels.
F=(¼,½,1). Multiplying by 7 gives (1,75;3,5;7). Rounding gives (2,4,7).
@@
H24-20
Match two histograms to two cumulative curves
T₁ belongs to I₂, and T₂ to I₁.
A CDF is flat between levels 2 and 4 but increases at 1 and 5. Where can the histogram have mass?
The histogram consists of the CDF's jumps. There is mass at 1 and 5 and no increase across the flat interval.
@@
H24-21-a
Recognise a sum of second derivatives
The expression is the Laplacian operator.
A greyscale function is f(x,y)=3x²+y². Find its Laplacian.
fₓₓ=6 and fᵧᵧ=2. The sum is 8.
@@
H24-21-b
Determine whether a Gaussian kernel is separable
The usual isotropic 7×7 kernel is separable.
How many multiplications per interior pixel does a separable 5×5 kernel need directly and in two passes?
Direct evaluation requires 25. Two one-dimensional passes with five coefficients require 5+5=10.
@@
H24-21-c
Test whether a mean filter is linear
Yes. A fixed weighted sum is linear.
The means of windows A and B are 2 and 5, respectively. What is the mean of window 3A+B?
Summation and scaling can be moved outside the mean. The answer is 3·2+5=11.
@@
H24-21-d
Identify the normalised two-dimensional Gaussian
For isotropic standard deviation σ, G(u,v)=exp(−(u²+v²)/(2σ²))/(2πσ²).
With σ=1, what is G(1,0)/G(0,0)?
Normalisation cancels. The exponent changes from 0 to −½, giving ratio exp(−½)≈0,607.
@@
H24-22
Explain Canny hysteresis and the benefit of two thresholds
Classify using low and high thresholds. Keep strong edge pixels and trace connected weak candidates from them. This can preserve weak portions of an edge while removing isolated responses.
After thinning, edge responses in one row are [9,6,5,0,6]. Use four-neighbour connectivity, low threshold 4 and high 8. What remains?
9 is strong. The neighbouring chain 6,5 connects to 9 and remains. The last 6 is separated by 0 and is discarded.
@@
H24-23-a
Explain both forms of the convolution theorem
Spatial convolution corresponds to pointwise frequency multiplication. Spatial multiplication corresponds to frequency convolution, with scaling determined by the DFT convention.
You multiply two images pixel by pixel. How are their spectra combined if the forward DFT is unnormalised?
Convolve the spectra circularly and divide by the pixel count. The opposite form uses pointwise spectral multiplication for spatial circular convolution.
@@
H24-23-b
Choose the theorem for frequency filtering
Use G=FH, multiplying frequency by frequency.
One frequency coefficient in F is 3+4i, and the filter response there is 0,2. Find the output coefficient.
G=0,2(3+4i)=0,6+0,8i. A positive real factor scales magnitude without changing phase.
@@
H24-23-c
Order the filtering steps correctly
Align image and filter sizes and origins. Transform, multiply, invert and extract the correct region. Zero-extend as needed for linear convolution.
You want full linear 1D convolution of lengths 8 and 5 using FFT. How long must the transform be?
Use at least 8+5−1=12. Zero-pad to a common length, FFT both, multiply pointwise and apply the inverse FFT.
@@
H24-23-d
Evaluate FFT filtering costs and benefits
Large kernels make direct filtering expensive. Specific frequencies can also be selected directly in the spectrum.
You want to remove a periodic pattern producing two isolated spectral peaks. What advantage does the frequency domain offer?
Suppress the two peaks with a pair of narrow stopbands. The rest of the spectrum can be preserved.
@@
H24-24
Find the new DC position after checkerboard modulation
For even dimensions, (0,0) shifts to (M/2,N/2).
A 32×48 image is multiplied by (−1)^(x+y) before the DFT. Where does DC appear with zero-based indices?
The shift is half a period along each axis. Thus the index is (16,24).
@@
H24-25
Identify filter type from a centred magnitude response
The bright centre and dark periphery indicate a low-pass filter.
A centred response is zero in the middle and rises towards one at the edges. What happens to a constant image?
A constant image contains only DC. The zero centre removes DC, giving a zero result.
@@
H24-26
Predict an image after a frequency mask
Figure b is the result. The central pass disk retains coarse structure and suppresses sharp detail.
An image is constant with a fine checkerboard pattern added. The mask passes only a small region around DC. What appears after the inverse transform?
The constant term remains. The high-frequency checkerboard disappears when that part of the spectrum is blocked.
@@
H24-27-a
Trace the first stack-based region-growing iteration
Seed (2,4) is marked finished. The four neighbours are pushed in visitation order. From top to bottom: (2,3), (3,4), (2,5), (1,4). Pending cells have value −1 in the region field.
All cells in a 3×3 region are valid. Start at (2,2), use indices starting at 1, and push in order up, right, down, left. What is on top after one iteration?
Push (1,2), (2,3), (3,2), then (2,1). Last in comes out first, so (2,1) is on top.
@@
H24-27-b
Trace the second iteration and mark visited cells
After popping (2,3), both it and the seed are finished. Pending cells from the top are (2,2), (3,3), (3,4), (2,5), (1,4).
Use the same fully valid 3×3 region and stack with seed (2,2). Which new cells can be pushed when (2,1) is removed?
Up gives (1,1). Right is the finished seed, down gives (3,1), and left is outside. Push (1,1), then (3,1), which becomes the new top.
@@
H24-28-a
Choose a structuring element for four-connectivity
The first mask is a 3×3 cross including its centre. Iterated dilation constrained by the original mask follows edge neighbours.
A seed at (1,1) has only one other foreground pixel, at (2,2). Can a cross including its centre reach it during reconstruction?
No. The cross spreads one step along a row or column, and the intervening background blocks every such step.
@@
H24-28-b
Choose a structuring element for eight-connectivity
The second mask is a full 3×3 square.
Three foreground pixels form an unbroken diagonal. How many iterations with a full 3×3 mask are needed to reach the third from the first?
One dilation reaches the middle, the next reaches the end. Intersection with the foreground mask keeps growth on the diagonal.
@@
H24-29-a
Calculate erosion with an asymmetric flat element
The minima at the two specified positions are 0 and 2.
A flat 1D element is anchored on the right and covers the current pixel and left neighbour. Find erosion at the third position of [9,2,7,6].
Erosion uses these two positions directly. min(7,2)=2.
@@
H24-29-b
Calculate dilation using the reflected element
The maxima at the two positions are 16 and 15.
A flat 1D element B={−1,0} is anchored at 0. Find dilation at the third position of [9,2,7,6] using D(i)=max I(i−b).
For b=−1, use the fourth value 6; for b=0, the third value 7. The maximum is 7.'''
