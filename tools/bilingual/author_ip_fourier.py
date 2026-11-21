from manual import assemble

assemble('frekvens','Fourier analysis and frequency filtering',
 'The Fourier transform describes an image as a sum of waves. This makes it easier to detect and remove periodic patterns that may be difficult to isolate in the spatial domain.',
 ['Find the DC term and interpret the location of a pair of spectral peaks.','Choose a frequency mask and filter with correct centring and padding.','Predict when downsampling causes aliasing and explain what the FFT computes.'],
 ['Reading a spectrum and calculating a DFT','Splitting a DFT into even- and odd-indexed samples','From image to mask and back','Choosing a mask from the spectrum','Sampling and fast computation'],[
'''The discrete Fourier transform (DFT) compares samples with periodic basis waves. Here we use a negative exponent without scaling in the forward transform, and a positive exponent with factor 1/N in the inverse. 
@@
, with n from 0 to N − 1. The 
@@
DC term
@@
 F[0] is the sum. Divide by N to obtain the mean.
@@
For f = [4, 2, 4, 2], F[0] = 12. At k = 2, the factors are [1, −1, 1, −1], so F[2] = 4 − 2 + 4 − 2 = 4. At k = 1, [1, −i, −1, i] sums to 0. F[3] = 0 by conjugate symmetry. The signal is therefore a constant 3 plus a ±1 term alternating at each sample.
@@
In a centred 
@@
magnitude spectrum
@@
, zero frequency lies in the middle. Two peaks symmetric about the centre can represent one real sinusoid. Distance from the centre increases with the number of periods. Peaks lie along the direction of intensity variation, perpendicular to the stripes. A horizontal pair of peaks may therefore come from vertical stripes. A single point impulse has constant spectral magnitude. Many scattered bright and dark noise pixels can thus spread energy broadly across the spectrum.
@@
Write a wave as c + A sin(2πft + φ), with A ≥ 0. Read its maximum and minimum to find A = (maximum − minimum)/2. The spacing T between peaks gives f = 1/T. A wave ranging from −2 to 4 and repeating every 0,25 s has c = 1, A = 3 and f = 4 Hz. If it starts at its maximum at t = 0, φ = π/2 modulo 2π in sine form.
@@
A 2D DFT can be calculated one dimension at a time because the phase factor is a product of row and column factors. For length two, the transform is especially simple: the first output is the sum and the second the difference. Retain complex values between passes.
@@
Basic practice · What does DC mean before normalisation?
@@
Set the frequency index to zero.
@@
All phase factors are 1. DC is the sum of the samples; dividing DC by their count gives the mean.
@@
Transform rows [1,3] and [1,3] as a 2 × 2 image. Use an unscaled forward transform with DC at the top left.
@@
Transform each row first, then each column of the intermediate result.
@@
Both rows become [4,−2]. Columns [4,4] and [−2,−2] give [8,0] and [−4,0]. The final matrix has rows [8,−4], [0,0]. No vertical variation gives zero in the final frequency row.''',
'''The FFT computes exactly the same coefficients as the DFT. For even length, split the sum into samples indexed 2m and 2m+1. Each part is a half-length DFT. The shifted odd-indexed part receives a phase factor W
@@
 = exp(−2πik/N). The second half of the output uses the same partial sums but subtracts the odd-indexed contribution. Repeated halving for power-of-two lengths gives log₂N levels, each with work proportional to N.
@@
For [1,2,3,4], even-indexed samples [1,3] give E=[4,−2], and odd-indexed samples [2,4] give O=[6,−2]. At k=0, the phase factor is 1: F[0]=4+6=10 and F[2]=4−6=−2. At k=1, it is −i. The contribution (−i)(−2)=2i gives F[1]=−2+2i and F[3]=−2−2i. They are complex conjugates because the input is real.
@@
Basic practice · Which samples enter the even-indexed part?
@@
Use zero-based indices in [4,8,6,9].
@@
Indices 0 and 2 give [4,6]. Splitting into two consecutive halves would give incorrect partial spectra.
@@
An impulse [0,1,0,0] is shifted to [0,0,1,0]. How do magnitude and phase change at k=1?
@@
Only one term in the DFT sum is nonzero. Use W₄=−i.
@@
Before the shift, the coefficient is −i. Afterwards it is (−i)²=−1. Both have magnitude one. Phase changes by −π/2 modulo 2π. Magnitude alone therefore does not reveal the impulse's location.''',
'''Convolution in the spatial domain corresponds to multiplication in the frequency domain. Compute F, multiply elementwise by H, and apply the inverse DFT to G = H·F. If the mask is drawn with low frequencies in the middle, first shift DC to the centre, then shift back before the inverse. For even dimensions, multiplying the image by (−1)
@@
 before transforming produces the same spectral shift. Repeat the sign change after the inverse.
@@
A low-pass filter preserves the region near DC and smooths the image. A high-pass filter removes, among other components, the mean. A pair of narrow stop regions over corresponding noise peaks can remove periodic noise while preserving detail elsewhere. Hard cutoffs may cause ringing near edges. Gaussian and Butterworth masks have smoother transitions.
@@
The other direction of the convolution theorem states that a pointwise product in the spatial domain becomes circular convolution in the frequency domain, with normalisation factor 1/(MN) for an M × N image using an unscaled forward transform. Large dense kernels may benefit from FFT filtering. Small or separable kernels require fewer local arithmetic operations and may be faster to apply directly.
@@
An ordinary DFT treats boundaries as periodic. Linear convolution of a row of 6 samples with a kernel of 3 requires length at least 6 + 3 − 1 = 8. Zero-pad both to at least 8, account for the kernel origin, and crop the required region after the inverse. Without padding, values may wrap around to the opposite edge.
@@
The DFT assumes periodic extension. Multiplication by a filter transform therefore produces circular convolution. For linear convolution, zero-extend signal and kernel far enough that the tail does not wrap into the beginning. In 2D, do this along both axes.
@@
Basic practice · What happens to DC with a high-pass filter having H(0)=0?
@@
G is the pointwise product of H and F.
@@
G(0)=0·F(0)=0. The inverse transform has zero mean before any clipping of negative values.
@@
Find the linear convolution of [1,2,3] with [1,1]. What happens with an unpadded three-point DFT?
@@
Each element contributes at its own position and the next. Linear length is 3 + 2 − 1.
@@
Contributions [1,2,3,0] and [0,1,2,3] sum to [1,3,5,3]. With period 3, the final 3 is added to the first value, giving [4,3,5]. A DFT length of at least 4 accommodates the entire tail.''',
'''In a centred spectrum, distance D from the centre represents spatial frequency. A circular low-pass filter passes broad, slow variations and suppresses fine detail. An ideal hard transition may cause ringing around edges. A Butterworth low-pass filter makes the transition gradual: 
@@
, with cutoff D₀ and order n. A larger order gives a sharper transition.
@@
At n=1 and D=2D₀, H=1/(1+4)=0,2. A Fourier coefficient 10i becomes 2i. A high-pass filter 1−H would give 8i. Periodic stripes may instead produce two isolated peaks. A narrow notch around just those peaks preserves other detail at the same radius. Place notches symmetrically to preserve conjugate symmetry for real images.
@@
Basic practice · What is the Butterworth low-pass response at D = D₀?
@@
Set the radius ratio to 1.
@@
H=1/(1+1)=½ for every positive order. Here H specifies the magnitude multiplier.
@@
An image contains sharp periodic stripes but also useful contours. Why might a broad low-pass filter be a poor choice?
@@
Identify which frequencies it removes beyond the noise itself.
@@
A broad stop region also suppresses high-frequency contributions from contours. Identify the stripe frequency's peak pair, suppress them locally, and inspect whether contours remain after the inverse DFT. Useful signal occupying those same peaks may also be lost.''',
'''A sampling frequency f
@@
 has Nyquist limit f
@@
/2. Keep the highest signal frequency below this limit for unique reconstruction of a band-limited signal. At 100 samples per second, a 70 Hz cosine can give the same samples as a 30 Hz cosine because 70 = 100 − 30. Low-pass filter before downsampling to reduce 
@@
aliasing
@@
An 
@@
FFT
@@
 computes DFT coefficients by reusing partial sums. For N samples, a typical FFT uses about N log₂N operations, compared with order N² for direct evaluation. A 2D transform can be computed using 1D transforms first along each row, then each column.
@@
Sampling at fₛ makes frequencies differing by an integer multiple of fₛ indistinguishable in the samples. For a real cosine, positive and negative frequencies also give the same signal. Low-pass filtering before downsampling removes content that would otherwise fold into lower frequencies.
@@
Basic practice · What is the Nyquist frequency at ten samples per second?
@@
Divide the sample rate by two.
@@
5 Hz is the limit. For reliable representation, the band limit must lie below it.
@@
A pattern has 7 periods per unit length and is measured at 10 samples per unit. Which lower cosine frequency fits the same samples?
@@
Write 7 = 10 − 3 and set sample positions to n/10.
@@
cos(2π·7n/10) = cos(2πn − 2π·3n/10) = cos(2π·3n/10). The image may show 3 periods. Subsequent interpolation cannot determine which of the two was the original.'''],
 'An 8 × 8 image has mean 5 and vertical sinusoidal stripes with two complete periods across its width. Where are DC and the peaks in a centred spectrum indexed 0 through 7? Use (row, column).',
 'The stripes vary horizontally. First calculate zero frequency from the pixel count and mean.',
 'With an unscaled forward transform, F[0,0] = 64·5 = 320. After centring, this term lies at (4, 4). Two horizontal periods produce positive- and negative-frequency peaks at (4, 6) and (4, 2).',
 {'DC term':'The zero-frequency Fourier coefficient. With an unnormalised forward transform, it is the sum of the samples.','magnitude spectrum':'The absolute value of each complex Fourier coefficient.','aliasing':'Different frequencies producing the same samples after sampling, making them impossible to distinguish.','FFT':'A family of fast algorithms for computing the discrete Fourier transform.'})

assemble('segmentering','Segmentation and contours',
 'Segmentation divides an image into regions meaningful for the task, such as foreground and background. You can look for rapid transitions at boundaries or similarity within each region.',
 ['Trace Canny from gradient to connected edge.','Interpret votes for lines and circles in Hough space.','Calculate a threshold and trace the stack during region growing.'],
 ['Tracing a weak edge','Voting for a geometric shape','From line votes to circle votes','Choosing a threshold from the histogram','Splitting and merging regions','Keeping track of the frontier'],[
'''Canny first smooths with a Gaussian and finds gradient magnitude and direction. Retain only local maxima along the gradient direction. This thins a broad response into a narrow edge. Use two thresholds and 
@@
hysteresis
@@
 to determine which weak responses belong to a strong one.
@@
After thinning, a row is [9, 5, 4, 1, 6]. Set the low threshold to 4 and the high to 8, including equality. The value 9 is strong. Values 5 and 4 are weak but connected to 9. The value 1 breaks the connection to 6. The final mask is [1, 1, 1, 0, 0] if there are no connections through other rows. State whether diagonals count in a two-dimensional image.
@@
Hysteresis is a connectivity problem after thinning. Start at all strong candidates and search through adjacent weak candidates. A connected weak chain can therefore survive even if only its first member neighbours a strong candidate.
@@
Basic practice · Why thin along the gradient?
@@
Consider a broad response around an edge.
@@
Retaining local maxima across the edge gives a narrow edge line. Thinning along the edge itself could break connected edges.
@@
A thinned row has magnitudes [9,5,4,1,5]. Use high threshold 8, low threshold 3, and only left/right neighbours. Which responses are retained?
@@
Mark seeds first, then positions through which growth is allowed.
@@
9 is a strong seed. From 9, reach 5 and then 4. The value 1 is below the low threshold and breaks the chain. The final 5 must therefore be discarded. The first three remain.''',
'''An edge point may lie on many lines. Let it vote in an 
@@
accumulator
@@
 for all lines through it. Use the line's normal with angle θ and distance 
@@
. Peaks in the table identify parameters supported by many points.
@@
Points (2, 0), (2, 1) and (2, 3) all give ρ = 2 at θ = 0°. Three votes accumulate for vertical line x = 2. For a circle of known radius r, each edge point (x,y) votes for centres (a,b) satisfying (a − x)² + (b − y)² = r². Unknown radius adds another parameter axis. Quantisation of parameter space determines how close two proposals must be to count in the same cell.
@@
Each edge point votes for several possible lines. A maximum occurs when several points vote into the same parameter bin. Coarse bins collect noisy votes but can merge nearby lines. Fine bins may split the votes for one line.
@@
Basic practice · What does θ describe in the ρ, θ line representation?
@@
Consider x cos θ + y sin θ.
@@
θ is the normal's angle. A vertical line can therefore have θ=0.
@@
Use 
@@
. Which bin receives votes from (2,1), (2,4) and (2,7) at θ = 0? What happens at θ = 90°?
@@
The angle refers to the line's normal.
@@
At 0°, ρ = x = 2 for all three. This identifies vertical line x = 2. At 90°, they vote into bins 1, 4 and 7. A high peak says little about the segment's starting and ending positions.''',
'''For known radius r, the centre (a,b) of a circle through edge point (x,y) can lie anywhere on circle (a−x)²+(b−y)²=r² in parameter space. Let each edge point vote for these possibilities. Many such circles passing through one parameter cell indicate a likely centre. When radius is also unknown, use one centre accumulator for each candidate radius.
@@
For r=2, points (4,3), (2,5) and (0,3) are all two units from (2,3). That cell receives at least three votes. Noise or coarse bins may produce a broad peak. Check against the actual edge points before accepting the circle.
@@
Basic practice · How many parameters does a circle with unknown radius need?
@@
Describe centre and size separately.
@@
Two centre coordinates and one radius. Knowing the radius removes one accumulator axis.
@@
How can a known gradient direction at (4,3) save votes if the edge has a horizontal normal?
@@
The radius is normal to the circle's tangent.
@@
With r=2, the centre is either (2,3) or (6,3). Directional information reduces a whole ring of votes to two candidates. With known contrast polarity, one direction may suffice.''',
'''A global threshold t may assign foreground where intensity exceeds t. Otsu's method tests different splits and maximises between-class variance, w₀w₁(μ₀ − μ₁)². The weights w are class proportions, and μ are class means. Exclude splits that leave an empty class.
@@
With samples [0, 1, 5, 6], t = 1 gives equally sized classes with means 0,5 and 5,5. The objective is ½·½·5² = 6,25. For t = 0, it is ¼·¾·4² = 3. Splitting after level 1 separates dark and light better. If illumination varies substantially, local thresholds may work better. Split and merge divides heterogeneous regions and merges adjacent regions satisfying the same homogeneity criterion.
@@
Otsu's criterion rewards both separation between grey-level means and having pixels in both classes. Compute weights as proportions of the entire image. Skip empty classes because their means are undefined.
@@
Basic practice · What happens when a pixel equals the threshold?
@@
Read the inequality in the problem.
@@
With foreground r > t, equality is background. With r ≥ t, it is foreground. State the rule before counting.
@@
For [0,0,2,3], compare background ≤ 0 with background ≤ 2. Which threshold gives the larger between-class variance?
@@
Calculate w₀w₁(μ₀−μ₁)² for each split.
@@
At 0, the weights are ½ and ½ and means 0 and 2,5. The criterion is 1,5625. At 2, weights are ¾ and ¼, means ⅔ and 3, giving 49/48 ≈ 1,02. Choose the first split. Threshold 1 gives the same partition as 0.''',
'''Choose a homogeneity criterion before splitting the image. If a block satisfies it, stop splitting there. Otherwise divide it into four subblocks. During merging, test the combined pixel set of neighbouring regions. Test the entire union: two individually homogeneous regions can still differ from each other.
@@
A 4 × 4 image has constant 2 × 2 quadrants with values 2, 3, 9 and 9 in reading order. Require maximum minus minimum to be at most 1. The entire image has range 7, so split once. Every quadrant passes. The two upper quadrants can merge with range 1, and the two lower with range 0. The two resulting regions cannot merge.
@@
Basic practice · How many children does one quadtree split of a square block produce?
@@
Halve both side lengths.
@@
Two halves in each direction give four children, each with one quarter of the pixels.
@@
If the quadrants instead have values 2, 3, 3 and 4, can all four merge just because neighbouring pairs satisfy the criterion?
@@
Find the largest and smallest values after a hypothetical merge.
@@
No. The union has range 4−2=2. After merging a 2-region and a 3-region, adding 4 violates the criterion. Order and adjacency rules can affect the final partition.''',
'''Region growing
@@
 starts at a seed. Each step removes one point from the frontier and inserts unvisited neighbours satisfying the intensity criterion. Set status to −1 on insertion and 1 on processing, so a pixel is inserted at most once. A 
@@
stack
@@
 removes the most recently inserted item first, whereas a queue removes the oldest first.
@@
Use row and column indices starting at 1, four neighbours, and a 2 × 2 image with rows [7, 7] and [7, 0]. Start at (1,1), accept value 7, and inspect up, right, down, left. The first removal accepts (1,2), then (2,1). Writing the stack top on the left, the frontier is [(2,1), (1,2)]. The second removal processes (2,1). Pixel (2,2) is 0 and is rejected. The frontier now contains only (1,2). Process it, leaving a region containing the three sevens.
@@
A criterion relative to a fixed seed value constrains the entire region's intensity range. A criterion relative to the last visited pixel can follow a gradual intensity ramp and end far from the seed value. Define the reference before selecting neighbours.
@@
Basic practice · Why mark visited pixels when they enter the queue?
@@
Several neighbours may discover the same point.
@@
Marking prevents processing one point repeatedly without changing the region.
@@
Start at 10 in row [10,12,14,16]. Allow absolute difference ≤ 2. Where does growth stop with each criterion?
@@
Compare 14 first with 10, then with 12.
@@
With a fixed seed, only 10 and 12 are accepted. Relative to the current neighbouring pixel, 14 is accepted from 12 and 16 from 14. The same threshold therefore gives different masks.'''],
 'After thinning, the rows are [9, 0, 0], [0, 5, 0], [0, 0, 5]. Use low threshold 4 and high threshold 8. Draw the final mask with four- and eight-neighbour connectivity.',
 'The two weak responses form a diagonal chain from the strong one.',
 'With four neighbours, neither five can reach 9. Only the top-left pixel remains. With eight neighbours, the centre reaches 9 directly, and the bottom-right reaches 9 through the centre. All three diagonal pixels remain.',
 {'hysteresis':'A strong response starts or anchors an edge, while weaker responses may join it through a connected chain.','accumulator':'A table counting votes for different parameter values in the Hough transform.','region growing':'A method building a region by adding accepted neighbours of already reached pixels.','stack':'A data structure in which the most recently inserted item is removed first.'})
