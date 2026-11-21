from manual import assemble

assemble('intensitet','From light to histograms',
 'A digital greyscale image is a grid of measurements. You can change its appearance by assigning a new intensity to each measured value.',
 ['Explain image formation in the eye and a pinhole camera.','Calculate a histogram, cumulative distribution and equalised image from pixel values.','Draw an intensity mapping and predict its effect on light and dark regions.'],
 ['Image planes, depth and pixels','Reading a curve from input to output','Equalising a small image by hand'],[
'''In the retina, rods respond well to small amounts of light. Cones provide colour vision and are densely packed around the fovea. In a pinhole camera, a ray through the aperture determines where a scene point is imaged. With a virtual image plane in front of the camera, similar triangles give 
@@
 and 
@@
. A physical image plane behind the aperture produces an inverted image.
@@
A point 0,4 m to the right of the optical axis and 2 m in front of the camera has x = 10 mm · 0,4/2 = 2 mm with focal length 10 mm. Several points on the same ray give the same x and y. Two parallel, rectified cameras with baseline B can recover depth from 
@@
disparity
@@
 d. With f = 200 pixels, B = 0,1 m and d = 10 pixels, Z = fB/d = 2 m.
@@
A smaller aperture admits less light. In the geometric pinhole model, it concentrates rays from one point into a smaller spot on the image plane. Spatial resolution describes how closely spaced details the system can distinguish. Optics and spacing between measurement locations affect this limit.
@@
Sampling
@@
 determines where we measure. 
@@
Quantisation
@@
 determines which values can be stored. A 4 × 3 greyscale image with 2 bits per pixel contains 12 measurements with 4 possible levels. The pixel data occupy 24 bits without packing overhead.
@@
Sampling chooses the measurement density on the sensor surface. Quantisation chooses the values used to store each measurement. More bits can distinguish smaller intensity differences but cannot recover a pattern that was never sampled densely enough.
@@
Basic practice · What is quantised in a greyscale image?
@@
Distinguish measurement position from measured value.
@@
The pixel intensity is assigned to one of a finite number of levels. Sampling determines which positions are measured.
@@
You have space for 8192 bits. Compare 32 × 32 pixels at 8 bits with 64 × 32 pixels at 4 bits. Which is better for closely spaced vertical stripes with just two known grey levels?
@@
Consider the number of columns and the number of intensity levels separately.
@@
Both use 8192 bits. The second choice provides twice as many samples across the stripes and 16 levels, enough for two well-separated tones. For a smooth grey ramp, 256 levels may matter more. The optics must also resolve the stripes.''',
'''A point operator s = T(r) changes each pixel using only its own value. Read the input on the horizontal axis. A curve above the diagonal makes that level brighter. Where the curve is steep, the separation between nearby levels increases. Flat intervals lose contrast.
@@
Use normalised levels 0 ≤ r ≤ 1 and the gamma curve s = r
@@
. For r = 0,25, γ = ½ gives 0,5. With γ = 2, the result is 0,0625. The negative s = 1 − r swaps light and dark. A piecewise-linear curve can stretch a narrow interval, whereas clipping to 0 or 1 makes different inputs identical.
@@
For a power law on normalised values, 
@@
. The endpoints 0 and 1 remain fixed when γ > 0. For 0 < r < 1, a smaller exponent gives a larger result. Normalise before applying the curve and scale back afterwards.
@@
Basic practice · Does a point operator need neighbouring values?
@@
Write s = T(r).
@@
No. Given the same function T, two pixels with the same r always produce the same s.
@@
An 8-bit image has pixel value 64. Apply γ = ½ with maximum value 255. What do you obtain after rounding, and why?
@@
Write the operation as 255·√(64/255).
@@
(64/255) ≈ 0,251. Its square root is about 0,501. Multiply by 255 and round to 128. Dark values become brighter. Taking the square root of 64 directly would give 8 with the wrong scale.''',
'''A 
@@
histogram
@@
 counts levels without preserving pixel locations. Two images with rearranged pixels have the same histogram. Divide count h(r) by pixel count N to obtain p(r). Sum p from 0 through r, inclusive, to obtain the 
@@
cumulative distribution
@@
Use L = 4 levels and h = [1, 4, 2, 1] with N = 8. Cumulative counts are [1, 5, 7, 8], so F = [⅛, ⅝, ⅞, 1]. With T(r) = round((L − 1)F(r)), round([0,375, 1,875, 2,625, 3]) = [0, 2, 3, 3]. Thus a pixel at level 1 becomes 2.
@@
Recount through the mapping. The new histogram is [1, 0, 4, 3]. The two highest input levels share output level 3. Discrete equalisation can therefore leave empty levels. Here we use the nearest integer and the entire distribution function. Follow the rounding rule specified in the problem.
@@
Histogram equalisation can also predict the entire output histogram. Calculate the lookup table once, then move every count from each input value to its output value. Two different input levels may land in the same bin.
@@
Basic practice · What is the sum of a normalised histogram?
@@
Each pixel is counted once.
@@
The counts sum to the number of pixels. After division by that number, the proportions sum to 1.
@@
Four levels have counts [1,1,6,0]. Use the floor of 3 times the cumulative proportion. Find the output histogram.
@@
Cumulative counts are 1, 2, 8 and 8. The divisor is 8.
@@
The mapping is [0,0,3,3]. The first two counts sum to 2 at level 0. Level 3 receives 6. The output histogram is [2,0,0,6], with the same total pixel count.'''],
 'An image has levels 0 through 3, with four pixels at level 0, two at level 1 and two at level 3. What is the output histogram after equalisation? Round halfway values upwards.',
 'Build a lookup table by multiplying each cumulative count by 3/8 before rounding.',
 'Cumulative counts are [4, 6, 6, 8]. Multiply by 3/8 and round [1,5, 2,25, 2,25, 3] to [2, 2, 2, 3]. Six pixels end up at level 2 and two at level 3. The histogram entries are [0, 0, 6, 2].',
 {'sampling':'Measuring a continuous signal at selected positions, for example on a grid.','quantisation':'Assigning a measured value to one of a finite number of levels.','histogram':'The number of pixels at each intensity level.','cumulative distribution':'The proportion of pixels with intensity less than or equal to a given level.','disparity':'The difference in image position of the same scene point in two camera images.'})

assemble('filtrering','Filters in the spatial domain',
 'A neighbourhood filter replaces a pixel using surrounding values. Smoothing suppresses small variations. Differentiation emphasises rapid transitions.',
 ['Calculate a filter response with the correct kernel orientation and boundary rule.','Choose mean, Gaussian or median filtering based on the noise type.','Recognise separable filters and interpret the sign of a derivative.'],
 ['Orienting the kernel correctly','Finding a pattern with normalised correlation','Noise, median and Gaussian filtering','Factorising a filter kernel','Finding an edge using two different derivatives','Distinguishing an edge from a peak'],[
'''Centre the kernel's origin on the pixel being computed. For 
@@
correlation
@@
, multiply values at corresponding positions. For 
@@
convolution
@@
, first rotate the kernel by 180°. The sum may be negative or exceed the image's level range. Retain signs and precision until rounding or clipping is requested.
@@
For neighbourhood [1, 4, 7] and k = [−1, 0, 1], correlation gives −1·1 + 0·4 + 1·7 = 6. Convolution reverses the kernel to [1, 0, −1] and gives −6. A symmetric kernel gives the same result with either method. The CNN examples usually use correlation under the name convolution.
@@
At the left image boundary, the filter needs a value outside the image. For sequence [3, 6, 9] and a three-pixel mean, the first output is (0 + 3 + 6)/3 = 3 with zero padding. Repeating the edge value gives (3 + 3 + 6)/3 = 4. Valid filtering produces only locations where the entire kernel fits.
@@
For a constant image, the interior output equals its intensity times the kernel sum. This provides a quick check for both smoothing and derivative filters. Boundary handling determines whether the same check holds right to the edge.
@@
Basic practice · How many values are multiplied for one 3 × 3 filter on one channel?
@@
Count positions in one complete window.
@@
Nine value–weight pairs give nine products to sum.
@@
Apply a centred mean of width 3 to [6,6,6]. Find the first value with zero padding, edge replication and valid filtering.
@@
Write down all three neighbours before summing.
@@
Zero padding gives (0+6+6)/3 = 4. Edge replication gives (6+6+6)/3 = 6. Valid filtering has no output centred on the first position. Its only valid output is 6 at the centre.''',
'''Template matching compares the same small pattern with many image windows. An ordinary dot product may be large simply because a window is bright. Subtract the mean from both template and window, then divide their dot product by the product of their vector lengths. This compares their variation patterns. Positive scaling and a constant brightness offset do not change the score.
@@
Template [0,1,2] and window [4,6,8] become [−1,0,1] and [−2,0,2] after centring. The numerator is 4. The denominator is √2·√8=4, so the score is 1. Place the score at the window's anchor, move the window one position, and find local peaks in the response map.
@@
Basic practice · What does a score near +1 mean?
@@
Assume mean-centred windows with positive variance.
@@
Their patterns vary almost proportionally in the same direction. The score can be high even when the windows have different means.
@@
What is the score for [8,6,4] and for [6,6,6]?
@@
Examine both the numerator's sign and the centred vector's length.
@@
The first window gives [2,0,−2] and score −4/4=−1. The constant window has zero norm. Its score is undefined; skip it or state how this case is handled.''',
'''A mean assigns equal weight to each neighbour. A Gaussian filter assigns greatest weight near the centre; larger σ gives broader smoothing. Normalise the weights to sum to one to preserve a constant region. For neighbourhood [10, 11, 99], the mean is 40, whereas the median of the sorted values is 11. The median tolerates a single impulse and is a nonlinear filter.
@@
Let u = [1, 2, 1]/4. The outer product uᵀu gives a 
@@
separable
@@
 kernel with rows [1, 2, 1], [2, 4, 2], [1, 2, 1], all divided by 16. Perform one pass along rows and one along columns. A k × k kernel then needs 2k multiplications per pixel rather than k². For k = 5, you save 15 of 25 multiplications.
@@
The continuous, normalised 2D Gaussian with the same σ along both axes is 
@@
. The exponent splits into an x-term and a y-term. Thus G factorises into two 1D Gaussians. Normalise the discrete, truncated kernel after sampling. Both mean and Gaussian filters with fixed weights are linear. For operator F, F(aI + bJ) = aF(I) + bF(J), because every term in the sum distributes over addition.
@@
The median sorts the neighbourhood and selects the middle value. A single extreme value can pull a mean far away, while the median's rank often remains stable. Small details may nevertheless disappear when they are a minority in the window.
@@
Basic practice · What should the weight sum of a normalised mean be?
@@
Test on a constant surface with value 10.
@@
To obtain 10, the product of 10 and the weight sum must be 10, so the sum must be 1 in the interior.
@@
At an edge, the samples are [8,9,250,10,11]. Compare median and mean. What if the three middle spatial samples actually belong to a bright stripe at 250?
@@
Sort for the median; use the original values' sum for the mean.
@@
The first window sorted is [8,9,10,11,250]. Its median is 10 and mean is 288/5 = 57,6. With [8,250,250,250,11], the median is 250. Structure width relative to window size determines what is preserved.''',
'''A separable filter has weights expressible as a column element times a row element. You can then sum along each row first and along the column afterwards. The distributive law gives exactly the same products as a 2D sum. Two length-k passes use approximately 2k multiplications per output, compared with k² for one dense pass.
@@
Use [1,2,1]/4 in both directions. The kernel's centre weight is 4/16 and a corner weight is 1/16. In a 3 × 3 window with rows [0,0,0], [0,8,0], [0,0,0], the horizontal intermediate values are [0,4,0]. The vertical pass gives 2. The weights sum to one, so a constant surface is preserved. Both passes must use compatible boundary rules, and rounding between passes can change the result.
@@
Basic practice · What centre weight results from two passes with [1,2,1]/4?
@@
Select the middle weight in each direction.
@@
(2/4)·(2/4)=¼. This equals 4/16 in the combined 2D kernel.
@@
For the same window, now with value 8 only at the top left, what is the output?
@@
Find the top row's intermediate value before vertical filtering.
@@
The first pass gives [2,0,0]. The second gives 2/4=½. This matches corner weight 1/16 times 8.''',
'''An abrupt level change has a large first derivative. Small random fluctuations can also have large derivatives, so smooth first. Differentiating a Gaussian-smoothed signal can be implemented by convolving the signal with the derivative of the Gaussian kernel. The filter thus combines two steps. Small σ preserves nearby edges but passes more noise. Large σ suppresses noise and can merge neighbouring contours.
@@
The second derivative measures changes in slope. A slope maximum can produce a positive second derivative on one side and a negative one on the other. For smooth profile [0,1,4,7,8], first neighbour differences are [1,3,3,1]. Second differences are [2,0,−2]. The sign change at the centre is an edge candidate, whereas a zero in a constant region alone is not a crossing. In two dimensions, the Laplacian sums the second derivatives in x and y; applied after Gaussian smoothing, it is called LoG.
@@
Basic practice · Is one zero in the second derivative sufficient?
@@
Test a completely constant image.
@@
No. All second derivatives are then zero without an edge. Look for an actual sign change and consider its magnitude.
@@
A second-derivative profile is [0,0,0,2,−3,0]. Which positions support a zero crossing, and why might an extra strength threshold help?
@@
Look for opposite signs on either side.
@@
A zero crossing lies between 2 and −3. The initial zeros show no positive-to-negative transition. Noise can also create small sign changes; a threshold on the difference across the crossing suppresses weak candidates.''',
'''A first difference measures change between neighbours. Sobel combines a difference in one direction with weighted smoothing in the other. From G
@@
 = 3 and G
@@
 = 4, a 
@@
gradient
@@
 has length √(3² + 4²) = 5. The edge itself is perpendicular to the gradient. Here x points right and y down in the image.
@@
The second derivative measures changes in slope. For a four-neighbour Laplacian with centre −4 and four entries of 1, the response is north + south + east + west − 4·centre. With centre 8 and all neighbours 5, it is −12. Negative curvature marks a bright peak. Sharpening with f − α∇²f and α = ¼ gives 8 − ¼·(−12) = 11. Reversing the kernel's sign also requires reversing the sign in the combination.
@@
The first derivative measures slope, whereas the second measures changes in slope. A symmetric second-derivative filter sums to zero and therefore does not respond to constant fields. When sharpening with a Laplacian kernel, you must know the sign of its centre coefficient.
@@
Basic practice · What does gradient direction measure?
@@
Consider a vertical edge that is dark on the left and light on the right.
@@
Intensity increases most rapidly horizontally to the right. The gradient is normal to the edge itself.
@@
Apply kernel [1,−2,1] to the centre of row [2,5,2]. Find the second difference and the sharpened value using original minus difference.
@@
A local maximum should become larger after sharpening.
@@
The difference is 2 − 10 + 2 = −6. The sharpened centre is 5 − (−6) = 11. Clip only after the calculation if the storage format has a limited range.'''],
 'Convolve row [2, 3, 8] with kernel [1, 0, −1], whose origin is in the centre. Find the centre response and the left-edge response with repeated edge values.',
 'Reverse the kernel once. The left neighbourhood is [2, 2, 3].',
 'The reversed kernel is [−1, 0, 1]. The centre gives −2 + 8 = 6. At the left edge, −2 + 3 = 1. Both are positive because intensity increases to the right.',
 {'correlation':'A weighted sum with the kernel placed over the neighbourhood as given.','convolution':'A weighted sum with the kernel reflected along both axes before placing it over the image.','separable':'A two-dimensional kernel is separable when it can be written as the product of a column vector and a row vector.','gradient':'The vector of first-order partial derivatives, pointing in the direction of fastest local intensity increase.'})
