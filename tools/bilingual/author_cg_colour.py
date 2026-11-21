from manual import assemble

assemble('farge','Colour and intensity',
 'A colour value gets its meaning from the model in which it is specified. A display adds light, whereas printing ink absorbs parts of the light.',
 ['Calculate the number of levels, bit depth and memory needed for an uncompressed image.','Convert between RGB, CMY and idealised CMYK.','Interpret chromaticity, alpha, and the difference between physical intensity and perceived brightness.'],
 ['From a perceptual threshold to a bit count','Tracing rounding error through an image','From a spectrum to a colour space','Choosing and calculating with colour models','Converting between RGB and CMYK','Preserving highlights and shadows','Transparency and high dynamic range'],[
'''With d bits, there are 2
@@
 codes. In a model where equal 
@@
differences
@@
 in intensity are equally perceptible, include the endpoints: from 10 to 34 in steps of 3 gives (34 − 10)/3 + 1 = 9 levels. Three bits provide 8 codes, so four are needed. Two independent channels with nine levels each give 9² = 81 combinations.
@@
For a model with equally perceptible 
@@
ratios
@@
 between intensities, use a geometric sequence. With minimum ¼, maximum 1 and five levels, four steps with ratio λ are needed, so λ⁴ = 4 and λ = √2. A 320 × 200 pixel image at 24 bits per pixel requires 320 · 200 · 3 = 192 000 bytes before compression, excluding metadata.
@@
In bit allocation, one extra bit doubles the number of codes. Suppose 14 bits are divided between an intensity with nine levels and two colour channels, where green needs four times as many codes as red. Intensity needs four bits. The remaining ten satisfy g + r = 10 and 2ᵍ/2ʳ = 4, so g − r = 2. Thus g = 6 and r = 4. Check: 64/16 = 4.
@@
Halftoning varies dot coverage to simulate grey levels. Error diffusion passes the quantisation error e = desired − displayed to neighbouring pixels. In the three-neighbour variant on slide 13, e is distributed as 3e/8, 3e/8 and e/4. For e = 8, these are 3, 3 and 2. Gamma correction compensates for a nonlinear intensity response. If the display produces L = v², target L = 0,25 must be encoded with v = √0,25 = 0,5.
@@
When vision distinguishes relative intensity changes, the next level can be modelled as a constant times the preceding one. This gives a geometric sequence. Include the starting level when calculating the required number of bits.
@@
Basic practice · How many distinct codes do five bits provide?
@@
Each bit has two possible values.
@@
2⁵ = 32 possible codes, typically numbered from 0 to 31.
@@
A sensor must represent positive levels 1, 2, 4, …, 64. How many levels and at least how many bits are needed?
@@
Count the exponents from 0 through 6, inclusive.
@@
There are seven levels. Two bits give four codes. Three bits give eight, leaving one unused code that could, for example, represent black.''',
'''Binary pixels can produce an apparent intermediate tone by distributing light and dark samples over an area. Direct thresholding of a uniform grey surface would give the same output everywhere. Error diffusion lets the next pixel account for light just lost or added. Work in a separate buffer with precise intermediate values. Quantise only the current pixel.
@@
Assume display levels 0 and 16, choosing 0 when the distances are exactly equal. Scan a row to the right. The first buffer value 8 is displayed as 0, so the error is +8. In the course variant, distribute +3 to the right, +3 to the next row in the same column, and +2 to the next row one column right. If the right neighbour was originally 8, it is now 11. It is displayed as 16, so its error is −5. Its three future neighbours receive −15/8, −15/8 and −5/4. The sign prevents successive upward roundings from accumulating too much light. At the image boundary, choose a rule for contributions falling outside.
@@
Basic practice · What is the error's sign when 11 is displayed as 16?
@@
Use desired minus displayed value.
@@
11−16=−5. Future buffer values are reduced to compensate.
@@
After these two steps, what is the buffer value in the next row directly below the second pixel if it was originally 8? Ignore other pixels.
@@
This pixel receives a diagonal contribution from the first pixel and a vertical contribution from the second.
@@
8 + 2 − 15/8 = 8,125. It is not rounded until the scan reaches it. The weight sum 3/8 + 3/8 + 1/4 = 1 preserves the distributed error for interior pixels.''',
'''Light may contain many wavelengths. Each cone type weights wavelengths differently and sums its response. Different spectra can therefore produce the same three responses. Three numbers do not determine the original spectrum.
@@
With additive mixing of positive amounts, two primaries can reach only chromaticities on the line segment between them. Three primaries span a triangle. A colour outside it would require a negative mixing weight. In linear RGB, (0,25;0,75;0) is possible, whereas (−0,1;0,8;0,3) requires negative red light.
@@
Basic practice · Can chromaticity alone specify brightness?
@@
Multiply all three XYZ values by two.
@@
Both numerator and denominator double during normalisation. Chromaticity stays the same while luminance doubles.
@@
Light sources have XYZ=(1,2,1) and (2,4,2). What can you say about chromaticity and luminance?
@@
Normalise each by its own sum.
@@
Both give (x,y)=(¼,½), but Y doubles. The lights have the same chromaticity and different luminance. The values do not specify which wavelengths are present.''',
'''In RGB, red plus green produces yellow light. In idealised CMY, cyan absorbs red, magenta absorbs green, and yellow absorbs blue. For normalised values, (C, M, Y) = (1 − R, 1 − G, 1 − B). In CMYK, the shared component can be replaced with black, K = min(C, M, Y).
@@
RGB = (0,6; 0,4; 0,2) gives CMY = (0,4; 0,6; 0,8). Thus K = 0,4. The new components are (CMY − K)/(1 − K), channel by channel, giving (0; ⅓; ⅔). CMYK is (0; ⅓; ⅔; 0,4). For pure black, set the CMY components to zero and K to 1.
@@
CIE XYZ is independent of any particular display. 
@@
Chromaticity
@@
 removes the intensity scale by dividing by X + Y + Z. XYZ = (2, 3, 5) gives x = 0,2 and y = 0,3. To recover the light level, Y is also needed. HSV describes hue as an angle, saturation as the degree of colour, and value as the brightest RGB channel. A neutral grey has saturation 0. Standardised sRGB specifies its primaries, among other properties, so values can be interpreted consistently.
@@
A chromaticity diagram describes proportions between tristimulus values. Normalisation loses their common scale. When luminance Y is known, first reconstruct the sum from y, then each component. Chromaticity is undefined for black.
@@
Basic practice · Which CMY colour ideally corresponds to pure red RGB light?
@@
Subtract each RGB component from one.
@@
(1,0,0) gives CMY=(0,1,1). Magenta and yellow ideally absorb green and blue.
@@
Given x = 0,25, y = 0,50 and Y = 4, reconstruct XYZ.
@@
The sum must be 4/0,5 = 8. X = 0,25·8 = 2 and Z = 8 − 2 − 4 = 2. Normalise (2,4,2) to check.''',
'''RGB describes added light. CMY ideally describes pigments absorbing opposing light components. With all values in [0,1], the first step is (C,M,Y)=(1−R,1−G,1−B). In CMYK, extract the part shared by all three pigment amounts and print it as black. Choose K=min(C,M,Y). The remaining components are (C−K)/(1−K), and similarly for M and Y. At K=1, use only black.
@@
For RGB=(0,2;0,4;0,8), CMY=(0,8;0,6;0,2). Black is 0,2, giving CMYK=(0,75;0,5;0;0,2). Check red backwards: R=(1−0,75)(1−0,2)=0,2. For a particular printer, device profiles must also describe actual pigments and primaries; complement arithmetic is an idealised model.
@@
Basic practice · Which RGB triple gives K=1?
@@
The black component is the minimum of C, M and Y.
@@
All three pigment values must be 1. This corresponds to RGB=(0,0,0).
@@
A neutral grey has RGB=(0,3;0,3;0,3). What is CMYK, and why does black need its own special case?
@@
All three complements are equal.
@@
CMY=(0,7;0,7;0,7), so K=0,7 and the remaining components are zero. At pure black, K=1 and the formula gives 0/0. Use (0,0,0,1).''',
'''Dynamic range measures the ratio between the largest and smallest positive representable intensities. A long exposure can measure dark surfaces well but saturate the sensor in highlights. A short exposure can preserve highlights while losing shadows in noise. With known response and exposure, reliable measurements from both can be mapped to a shared radiometric scale.
@@
With linear response and clipping at 1, a scene with light levels 0,02 and 4 gives signals 0,02 and 1 at exposure time 1. At time ⅛, they become 0,0025 and 0,5. Use the long exposure for the shadow, and divide the short-exposure highlight value 0,5 by ⅛ to recover 4. A simple display curve s=L/(1+L) maps 4 to 0,8 and 0,02 to approximately 0,0196. It compresses contrast while preserving order. The displayed value is no longer proportional to scene light.
@@
Logarithmic encoding can allocate codewords to relative intensity differences. In 32-bit LogLuv, 16 bits describe chromaticity, while intensity receives 15 bits and a sign bit. This storage choice is independent of the selected tone mapping.
@@
Basic practice · What does doubling exposure do for a linear, unsaturated sensor?
@@
Keep scene light constant.
@@
The signal doubles. Once the sensor saturates, this proportionality no longer holds.
@@
Find the example scene's dynamic range. Can one saturated long-exposure value determine how bright the highlight was?
@@
Use the reconstructed light level in the numerator.
@@
4/0,02=200:1. The saturated measurement gives only a lower bound. Both 1 and 4 would produce the same stored value in the long exposure.''',
'''With linear colour values and an opaque background, the composite is 
@@
. A red surface with α = 0,25 in front of blue gives (0,25; 0; 0,75). If both have alpha, the combined alpha is α₁ + (1 − α₁)α₂. Premultiplied colour already includes the factor α.
@@
Dynamic range is the ratio between the highest and lowest positive intensities. Two exposures can provide signal in shadows and highlights, respectively, and be combined into an HDR image. Tone mapping compresses the range so that both shadows and highlights are visible on a display.
@@
Translucent layers also attenuate contributions from layers behind them. Expand the composite from the inside out. With an opaque background, the weights must sum to one.
@@
Basic practice · Which colour do you see when alpha is zero?
@@
Read the foreground and background weights.
@@
The foreground has weight 0 and the background weight 1. A fully transparent foreground gives the background colour.
@@
Put green with alpha ½ over blue, then red with alpha ½ over the result. Find linear RGB.
@@
First composite the layers behind the red layer.
@@
The background composite is (0, ½, ½). At the front, ½(1,0,0) + ½(0,½,½) = (½,¼,¼). Green and blue each retain only half their intermediate values.'''],
 'Suppose a channel distinguishes every fourth intensity step from 8 through 40, inclusive. How many levels and at least how many bits does it require? What if the image has three such independent channels?',
 'Count intervals first. Both endpoints represent levels.',
 'There are (40 − 8)/4 = 8 intervals, hence 9 levels and at least 4 bits per separately encoded channel. Three channels give 9³ = 729 colours. Separate 4-bit fields require 12 bits per pixel. A single dense index over the 729 combinations needs 10 bits.',
 {'Chromaticity':'The relative composition of a colour, independent of a common scaling of light intensity.'})

assemble('lys','Lighting and shading',
 'A red sphere can have a white highlight. Pixel colour depends on light direction, material, viewing direction, and how frequently lighting is evaluated.',
 ['Interpret the terms in a given Phong formula and calculate intensity.','Explain which properties a local model describes.','Predict whether a specular highlight appears with flat, Gouraud or Phong shading.'],
 ['Separating illumination, material and viewing direction','Building lighting from computable contributions','What is interpolated across the triangle?','Lighting after the visibility test'],[
'''A BRDF describes how much incoming light from one direction is reflected towards a chosen outgoing direction. To compute outgoing radiance, sum contributions from incoming directions, weighted by both the material response and the angle at which light strikes the surface. The surface may also emit light. Light arriving via other surfaces requires information about the surroundings. A local Phong calculation sums the modelled light sources and often uses an ambient term as an approximation.
@@
On an ideally diffuse surface, two sources with relative intensities 2 and 1 and incidence angles 60° and 0° contribute equally before the material factor: 2·cos 60° = 1·cos 0° = 1. Moving the eye does not change this diffuse contribution. A highlight, however, moves. A texture can change diffuse colour locally without changing the surface normal.
@@
Basic practice · Which directions enter a BRDF?
@@
Distinguish where light comes from from where it is observed.
@@
The incoming light direction and outgoing viewing direction. The same material may reflect different amounts of light towards different observers.
@@
A red surface with diffuse coefficient (0,8;0,1;0,1) is illuminated head-on by blue light (0,0,1). What is the diffuse RGB contribution?
@@
Multiply componentwise and use cos 0°=1.
@@
(0,8·0;0,1·0;0,1·1)=(0;0;0,1). A material colour value cannot create light in a channel absent from the source.''',
'''A 
@@
normal
@@
 points perpendicularly out from the surface. With unit vectors N pointing outwards, L towards the light, and V towards the eye, N · L measures how directly the light strikes. Diffuse reflection scatters light in many directions. Specular reflection produces a highlight near the mirror-reflection direction. A 
@@
BRDF
@@
 describes how incoming illumination contributes to outgoing radiance in a given direction.
@@
A simple Phong model includes emission Iₑ, ambient light kₐIₐ, diffuse light and specular light. For one illuminated front face with reflection vector R = 2(N · L)N − L, try I = Iₑ + kₐIₐ + Iₗ[k
@@
 max(0,N · L) + k
@@
 max(0,R · V)
@@
]. A larger m narrows the highlight. The Blinn variant uses the halfway vector H = (L + V)/‖L + V‖ and N · H in the specular term. Use the variant stated in the problem.
@@
Let emission be 0, kₐIₐ = 0,1, Iₗ = 1, k
@@
 = 0,2, N · L = 0,5, R · V = 0,5, and m = 2. The diffuse contribution is 0,6 · 0,5 = 0,30 and the specular contribution is 0,2 · 0,5² = 0,05. Total intensity is 0,45. For colour, calculate channel by channel. White incident light can produce a white specular contribution on a coloured material.
@@
Rough materials often have a large diffuse and small specular contribution. Shiny materials may have a large specular contribution and a high exponent for a narrow highlight. A sphere with uniform base colour looks round because normals vary across its surface. If lighting supplies one shared factor 0,5 for RGB, (0,8; 0,4; 0,2) becomes (0,4; 0,2; 0,1). The channel ratio 4 : 2 : 1 is preserved.
@@
The model is local: a shadow cast by another object requires a separate visibility test. Check whether distance attenuation, multiple lights or emission appear in the given formula before attributing these properties to it.
@@
The specular term depends on viewing direction. A large shininess exponent suppresses even small deviations from the ideal reflection direction, because a number between zero and one decreases with repeated multiplication. Test with normalised directions.
@@
Basic practice · When is the diffuse term largest?
@@
Assume a unit normal and one light source.
@@
N·L is largest, equal to 1, when light strikes the surface head-on. At 90°, the dot product is zero.
@@
At the same point, positive R·V = 0,5. Compare the specular term for exponents 2 and 6, with all other factors equal to one.
@@
Calculate two powers. What happens exactly in direction R?
@@
0,5² = ¼ and 0,5⁶ = 1/64. At R·V = 1, both give 1. The higher exponent gives a narrower highlight.''',
'''Flat shading uses one representative normal and intensity for the entire polygon. Gouraud evaluates intensity at the vertices and interpolates it. Phong shading interpolates normals and normalises the result before evaluating lighting again at the sample. The Phong model specifies the lighting formula, whereas Phong shading determines where it is used.
@@
At the midpoint of an edge with vertex intensities 0,2 and 0,6, Gouraud gives (0,2 + 0,6)/2 = 0,4. If both vertices lie outside a narrow highlight, the entire highlight can disappear. With Phong shading, the interpolated midpoint normal can align with the reflection direction and produce a highlight there.
@@
Lighting is not a linear function of the normal. Evaluating it at vertices and then interpolating can therefore differ from interpolating the normal and then evaluating lighting. Normalise after interpolation.
@@
Basic practice · What is interpolated in Gouraud shading?
@@
Identify where the lighting formula is evaluated.
@@
Lighting is evaluated at the vertices. Their colours or intensities are interpolated to the sample.
@@
Two vertex normals are (1,0,0) and (0,1,0). Light arrives from direction (1,1,0)/√2. Find the diffuse response at the edge midpoint using both methods.
@@
Set light intensity and the diffuse coefficient to 1. Normalise the mean normal before taking the dot product.
@@
Both vertices give 1/√2, so Gouraud gives that same value at the midpoint. The mean normal (½,½,0) becomes (1,1,0)/√2 after normalisation. Phong interpolation therefore gives response 1.''',
'''deferred shading
@@
 performs geometry and depth tests in the first pass. A G-buffer stores data such as the visible surface's normal and material. The next pass lights the visible samples. For one pixel overdrawn five times by opaque surfaces, the lighting stage only needs data from the nearest one. The buffer costs memory, and translucent layers require contributions from multiple surfaces.
@@
In deferred lighting, the depth test separates visible and hidden fragments before expensive lighting calculations. The geometry pass must store enough data to reconstruct the material and directional terms. Memory use is part of the cost.
@@
Basic practice · What data does a diffuse lighting pass need?
@@
The light direction is known.
@@
The pass needs, among other data, the visible sample's normal and diffuse material colour. Position may also be required for local lights and can often be reconstructed from depth.
@@
A G-buffer stores 16 bytes per pixel at 1000 × 800. How much extra memory is required, and how many lighting evaluations does a subsequent pass perform with four lights per visible pixel?
@@
Assume every pixel is covered and all four lights affect every pixel.
@@
800 000 · 16 = 12 800 000 bytes. The lighting pass performs 800 000 · 4 = 3 200 000 evaluations. Geometry that failed the depth test does not contribute to these.'''],
 'Two vertices on an edge both have intensity 0,1. At the midpoint, the normal is oriented so that the surface should have a strong specular highlight. What does Gouraud produce there, and how can Phong shading differ?',
 'Trace which quantity is interpolated in each case.',
 'Gouraud gives ½ · 0,1 + ½ · 0,1 = 0,1. Phong shading interpolates and normalises the normal. If this normal makes R · V close to 1, the specular term can be large even though both vertex intensities are small.',
 {'normal':'A vector perpendicular to a surface. Lighting formulas usually use a unit normal.','BRDF':'Bidirectional reflectance distribution function. The ratio of differential reflected radiance to incident irradiance for a pair of directions.','deferred shading':'Lighting performed in a separate pass using stored geometric data from visible surfaces.'})
