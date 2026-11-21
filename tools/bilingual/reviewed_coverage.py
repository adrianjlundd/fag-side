"""Manual translation of the 73 coverage objectives, in original row order."""
DESCRIPTIONS = '''Calculate unit vectors, lengths, basis representations, dot products and surface normals.
Homogeneous points, directions and affine mappings. Read a basis and translation from a matrix.
Scaling, translation, rotation, shear and reflection. Construct and invert composite transformations using column vectors.
Rotate or scale about a fixed point. Check the result using an invariant point.
Transform into a local orthonormal basis to rotate about a displaced 3D axis.
Compare multiplication counts for composition and direct application.
Primitives, indices, attributes and the graphics pipeline. Trace data from local geometry to fragments and visible pixels.
Model using a scene graph. Accumulate parent transformations without affecting siblings.
Switch between local reference frames, object space and world space.
Derive the world-to-eye matrix from eye, viewing direction and up. Check signs and orthonormality.
Orthographic and perspective projection, frustum, clip space, signed depth, homogeneous division and NDC.
Derive parallel and central projection by intersecting a ray with a plane.
Transform between window, normalised coordinates and viewport. Handle upward/downward orientation.
Clip a line segment parametrically, including parallel lines and empty parameter intervals.
Apply Sutherland–Hodgman entry/exit cases and retain correct edge order.
Greiner–Hormann: construct linked edge lists, mark crossings, trace multiple contours and handle no crossings.
Distinguish conservative frustum tests, back-face culling and hidden surfaces. Trace the z-buffer in drawing order.
Test triangle sample points using edge functions, orientation and first differences.
Compare parametric and implicit curves. Evaluate the circle's implicit function incrementally.
Rasterise a line using axis selection, rounding and Bresenham's integer decision.
Scanline filling with parity, ET/AET and vertex rules. Compare with seed filling.
Area coverage (Catmull), subsamples, SSAA and MSAA. Explain reconstruction using DLAA and DLSS.
Count intensity levels, select bit depth and allocate channel bits. Explain logarithmic perception, halftoning, error diffusion and gamma correction.
Trace quantisation errors, signs and neighbour weights through two rows.
Spectra, cone responses, colour matching and gamut. Distinguish luminance and chromaticity.
Convert between idealised RGB and CMY. Interpret HSV, CIE XYZ, chromaticity and device dependence.
Extract black when converting to CMYK and check the pure-black special case.
Select measurements from multiple exposures and calculate dynamic range, tone mapping and LogLuv bit allocation.
Composite linear colours in order; interpret premultiplied alpha, HDR, exposure and tone mapping.
Distinguish lighting, texture, material, viewing direction and BRDF. Compare direct and indirect lighting.
Calculate emissive, ambient, diffuse and specular components. Distinguish reflection and halfway vectors, light sources and distance attenuation.
Compare flat, Gouraud and Phong shading at vertices and interior samples.
Describe the geometry pass, depth test, G-buffer and lighting pass. Calculate memory use and lighting work.
Explain light, sensors and vision; use pinhole cameras, sampling, quantisation, spatial resolution and stereo disparity.
Negatives, contrast and intensity curves, gamma and normalisation. Read input and output values.
Calculate histograms, probabilities, CDFs and discrete equalisation; check rounding and the output histogram.
Neighbourhood filtering, linear weighted sums, impulse responses, correlation, convolution, orientation, padding and valid support.
Calculate zero-mean normalised cross-correlation and interpret a template-response map.
Choose mean, Gaussian or median filters considering noise, edges, linearity and normalisation.
Factorise a separable kernel and calculate two 1D passes with compatible boundary rules.
Explain differentiation of a Gaussian-smoothed signal, scale selection and zero crossings.
First and second differences, Sobel, gradient direction and magnitude, Laplacian, noise suppression and sharpening.
Calculate complex 1D and 2D DFTs, DC, frequency indices, magnitude and inverse normalisation.
Perform a radix-2 step, interpret phase shifts and compare FFT work with direct DFT evaluation.
Apply the convolution theorem, centring and inverse transformation. Distinguish linear and circular convolution.
Choose low-pass, high-pass or notch filters; relate radius, order, ringing and symmetric peaks to image content.
Use sample rate, Nyquist limit, alias frequency and low-pass filtering before downsampling.
Smoothing, gradients, non-maximum suppression, double thresholds and hysteresis.
Let edge points vote for lines; interpret normal parameters and accumulator resolution.
Find circles with known or unknown radii; constrain centre votes using edge normals.
Global thresholding and Otsu's between-class variance. Handle empty classes and equality at the threshold.
Split regions recursively using a predicate; determine when neighbouring regions may merge.
Choose seeds, intensity criteria, visitation order and 4-/8-neighbour connectivity.
Binary set operations, translation and reflection of structuring elements. Calculate erosion, dilation, opening and closing.
Find inner and outer boundaries using set differences. Interpret holes and boundary effects.
Apply repeated geodesic dilation with marker and mask until stability.
Fill one or more holes by reconstruction in the complement with chosen connectivity.
Label connected components using two passes and an equivalence table.
Hit-or-miss, foreground and background templates, thinning and skeletons as shape representations.
Calculate skeleton layers and reconstruct the object using repeated dilation.
Use gradient as terrain and minima and markers as basins; interpret oversegmentation.
Calculate flat and non-flat greyscale morphology with reflection, minima, maxima and an explicit anchor.
Supervised learning, loss, dataset splitting, generalisation and overfitting.
Calculate FCNN layers with weight matrices, biases, ReLU, sigmoid and a loss function.
Apply the chain rule backwards, sum gradient contributions, and update weights and biases.
Calculate the correct gradient for a batch and mean loss.
Calculate CNN shapes with filters, channels, stride, padding, pooling and flattening.
Count parameters and multiplications with weight sharing and channel mixing.
Trace a CNN forward pass with multichannel filters, biases, activations, matrix form and class scores.
Divide an image into patches, project them into tokens, and add positional information and a class token.
Calculate Q, K, V, scaled dot products, row-wise softmax and weighted values.
Trace multiple heads, output projection, LayerNorm, residual connections and token-wise MLPs.
Read the class token and calculate logits, class probabilities and cross-entropy.'''.splitlines()
