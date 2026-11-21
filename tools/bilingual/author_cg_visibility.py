from manual import assemble

assemble('klipping','Clipping and visibility',
 'When an object crosses the edge of the image, its geometry must be clipped. Visibility tests can also eliminate work for entire objects or hidden fragments.',
 ['Clip a segment against a rectangle and explain the signs in Liang–Barsky.','Trace which vertices a polygon clipper outputs.','Determine when a surface, object or fragment can be discarded.'],
 ['Clipping a line with one parameter interval','Clipping a polygon one boundary at a time','Tracing intersection contours between two polygons','Discarding whole objects or testing depth per pixel'],[
'''Clipping
@@
 retains the part of a primitive inside all the boundaries. Write a segment as P(t) = A + t(B − A), with 0 ≤ t ≤ 1. Each boundary in Liang–Barsky gives an inequality pᵢt ≤ qᵢ that narrows the interval.
@@
For the left, right, bottom and top boundaries, p = (−Δx, Δx, −Δy, Δy) and q = (x₀ − x
@@
min
@@
max
@@
min
@@
max
@@
 − y₀). If p < 0, q/p is a lower bound. If p > 0, it is an upper bound. If p = 0, discard the segment when q < 0; otherwise this boundary imposes no new constraint.
@@
 A horizontal segment runs from (−2, 1) to (6, 1). The window is [0, 4] × [0, 3]. Since x(t) = −2 + 8t, the left boundary requires t ≥ 2/8 and the right requires t ≤ 6/8. The value y = 1 satisfies both other boundaries. The retained segment has endpoints P(¼) = (0, 1) and P(¾) = (4, 1).
@@
In pseudocode, update the starting bound with the maximum of the lower bounds and the ending bound with the minimum of the upper bounds. When start > end, the interval is empty. Equality can represent contact at a single point.
@@
When the segment direction is parallel to a clipping plane, its coordinate along the normal is constant. Test that constant directly before attempting division. A parallel line on the inside adds no new constraint to the parameter interval.
@@
Basic practice · What does t = ½ mean?
@@
Use A + t(B − A).
@@
You are halfway from A to B, at the midpoint. The segment's endpoints correspond to 0 and 1.
@@
Clip the vertical line from (2, −1) to (2, 5) against [0, 3] × [0, 2]. What if both x-values are 4?
@@
x is constant. Write y as a function of t.
@@
x = 2 is inside. From 0 ≤ −1 + 6t ≤ 2, we obtain ⅙ ≤ t ≤ ½. The endpoints are (2, 0) and (2, 2). At x = 4, reject the entire line.''',
'''Sutherland–Hodgman traverses the closed polygon and clips against one half-plane at a time for a convex clipping window. Four rules apply to each directed edge A → B. Inside → inside outputs B. Inside → outside outputs the intersection I. Outside → inside outputs I and B. Outside → outside outputs nothing.
@@
Clip triangle A = (−1, 0), B = (1, 0), C = (1, 2) against x ≥ 0. A → B outputs (0, 0) and (1, 0). B → C outputs (1, 2). C → A meets the boundary halfway and outputs (0, 1). The result has four vertices. They become the input when processing the next boundary.
@@
Try line-clipping each edge of the square [−5, 5]² against [−1, 1]². Every edge disappears, although the entire smaller square is inside the larger one. Polygon clipping must also create a contour along the clipping window itself.
@@
Greiner–Hormann can also find the intersection of concave polygons. Insert intersection points in order along the edges of both polygons, link corresponding points, and mark crossings as entry or exit. Follow boundary segments belonging to the intersection, switching polygons at crossings. Each closed walk gives one contour. This traversal description assumes proper crossings without coincident edges.
@@
A clipping pass also processes the edge from the last vertex back to the first. The output list must contain intersections in traversal order; otherwise a new edge may cross the polygon's interior. Use the completed output list as input to the next half-plane.
@@
Basic practice · What is output when an edge goes from inside to outside?
@@
Follow the edge from start to end.
@@
Output the intersection. The endpoint is outside and must not enter the output list.
@@
Clip vertices A=(−1,0), B=(1,0), C=(1,2) against x ≥ 0. Start with edge C→A.
@@
On exit, output only the intersection. On entry, output the intersection and the new vertex.
@@
C→A crosses at (0,1). A→B gives (0,0) and B. B→C gives C. The result is the quadrilateral (0,1), (0,0), (1,0), (1,2). Its area is 1,5, less than the triangle's 2.''',
'''For concave polygons, the intersection may consist of disconnected pieces. Greiner–Hormann therefore constructs contours by following edge lists rather than assuming a single output list. Find edge crossings and insert them in geometric order into both lists. Link each insertion to its copy in the other list. Test whether the starting point lies inside the other polygon. Each proper crossing alternates between entry and exit.
@@
Follow the edge portion inside the intersection to the next crossing, switch lists, and continue along the appropriate interior edge portion. Returning to the start completes one closed contour. Repeat from unused entry points. If there are no crossings, also test whether one polygon is entirely inside the other. Tangencies and overlapping edges require special handling because membership does not necessarily alternate.
@@
A U-shaped polygon has vertices (0,0),(5,0),(5,5),(4,5),(4,1),(1,1),(1,5),(0,5). Clip it with the rectangle from (−1,2) to (6,3). On y=2, the intersection occupies x-intervals [0,1] and [4,5]. On y=3, the intervals are the same. Walking along the interior edge portions yields the rectangle [0,1] × [2,3]. An unused entry point yields the second rectangle [4,5] × [2,3].
@@
Basic practice · Why must insertions along an edge be sorted?
@@
Consider two intersection points on the same edge.
@@
The walk must visit the points in their order along the polygon edge. An incorrect order can connect the wrong boundary portions.
@@
How many edge crossings are there, and what is the intersection's area? What goes wrong if the contours are connected?
@@
Count crossings at both the bottom and top clipping boundaries.
@@
Four crossings on each horizontal boundary give eight in total. Each piece has area 1, giving a total of 2. Connecting them creates an edge through the gap, outside the U.''',
'''With 
@@
frustum culling
@@
, a bounding box entirely outside one view-volume plane can be discarded together with the entire object. A box intersecting the plane requires further processing. Clipping then finds the new vertices.
@@
For a closed, opaque object with consistently oriented triangles, back faces may be discarded. Find n = (B − A) × (C − A). Let v point from the surface towards the eye. If n · v < 0, the outward normal faces away from the eye. The product (0, 0, 1) · (0, 0, −3) = −3 identifies a back face. Swapping two vertices reverses the sign.
@@
A 
@@
depth buffer
@@
 stores the depth of the nearest accepted fragment. With near = −1 and far = +1, initialise the buffer at the far plane. A red surface at z = 0,4 is written, a blue one at z = −0,2 replaces it, and a green one at z = 0,1 is discarded. The image is blue. With another depth representation, larger z may mean closer. Always state which comparison selects the nearest surface.
@@
A depth buffer stores the best depth found so far at each sample. Compare and update colour and depth together. For opaque surfaces with distinct depths, this finds the same nearest surface in either drawing order.
@@
Basic practice · Is the whole object invisible if one vertex is outside?
@@
Consider a triangle crossing the view volume.
@@
No. Early rejection requires proof that the entire object is outside, for example outside one shared clipping plane.
@@
Start with depth 1. Draw red at 0,7, green at 0,2 and blue at 0,6. Smaller depth wins. Trace every write.
@@
Compare against the current buffer value after each fragment.
@@
Red writes 0,7, green writes 0,2, and blue is discarded because 0,6 > 0,2. The final colour is green. Partially transparent surfaces may require contributions from several depths.'''],
 'Clip P(t) = (−1 + 4t, 1 + 2t), 0 ≤ t ≤ 1, against [0, 2] × [0, 2]. Which two endpoints do you retain?',
 'Find the valid interval for each coordinate and intersect them.',
 'x requires ¼ ≤ t ≤ ¾. y requires −½ ≤ t ≤ ½. Together with [0, 1], the interval is [¼, ½]. The endpoints are (0; 1,5) and (1; 2).',
 {'clipping':'Computing the part of a primitive lying inside a specified region.','frustum culling':'A test that can discard entire objects outside the view volume.','depth buffer':'A buffer storing the currently visible depth at each sample location.'})

assemble('rasterisering','Rasterisation and antialiasing',
 'The vertices of a triangle may have non-integer coordinates. Rasterisation must determine which discrete screen samples the triangle covers.',
 ['Perform a sign test and update edge functions using forward differences.','Distinguish pixels selected by line rasterisation from cells visited by grid traversal.','Count samples and shading computations in SSAA and MSAA.'],
 ['Three signs determine whether a point is inside the triangle','Evaluating a curve incrementally','Lines, scanlines and filling','Filling a polygon one scanline at a time','Counting coverage and colour computations separately'],[
'''For the edge from A to B, define the 
@@
edge function
@@
 F(P) = (Bₓ − Aₓ)(y − Aᵧ) − (Bᵧ − Aᵧ)(x − Aₓ). It is positive to the left of the directed edge when x points right and y up. A triangle with counterclockwise vertices has its interior to the left of all three edges.
@@
A = (0, 0), B = (4, 0), C = (0, 3) gives F
@@
AB
@@
BC
@@
 = 12 − 3x − 4y and F
@@
CA
@@
 = 3x. At (1, 1), the values are (4, 5, 3). All are positive, so the sample is covered. At (3, 2), the values are (8, −5, 9), so it is outside. On an edge, one function is zero. Shared edges need a consistent ownership rule so that exactly one triangle owns the sample.
@@
For F = ax + by + c, F(x + 1, y) − F(x, y) = a. One step up gives b. From (1, 1) to (2, 1), the three functions change by (0, −3, +3), giving (4, 2, 6). For a box with 30 sample points, after the first point we can traverse the remaining 29 using three additions per unit step. This gives 87 additions under this counting model, regardless of how many samples pass the test.
@@
An edge function is linear in sample position. One step right changes only the x-term, by a constant. Compute one initial value per edge, then use addition as you traverse the raster.
@@
Basic practice · What does an edge value of zero mean?
@@
Consider the determinant of two parallel vectors.
@@
The sample lies on the edge's infinite supporting line. The other edge tests and shared-edge rule determine coverage.
@@
For A=(1,1) and B=(4,3), find F at (2,2), then at the next sample to the right and the next sample above the starting point.
@@
Use F = 3(y−1) − 2(x−1).
@@
The starting value is 3 − 2 = 1. One step right subtracts 2, giving −1. One step up adds 3, giving 4. The sign change shows that the horizontal sample sequence crosses the edge.''',
'''A parametric curve gives a point for a chosen parameter. An implicit curve tests a position directly. For a circle centred at the origin, 
@@
. A negative value means inside and a positive value outside. No division is required at a vertical tangent.
@@
One step right gives F(x+1,y)−F(x,y)=2x+1. At the next step, this difference increases by 2. With r=5, F(3,3)=9+9−25=−7. Move to (4,3), add 7 and obtain 0: the sample lies on the contour.
@@
Basic practice · Where is (0,0) relative to a circle of radius 2 centred at the origin?
@@
Substitute the coordinates into F.
@@
F=0+0−4=−4. The negative sign shows that the sample is inside.
@@
Find F(5,3) and F(6,3) without squaring again.
@@
From x=4, the next difference is 2·4+1.
@@
Starting from 0, we obtain 9. The next difference is 11, so F(6,3)=20. Both samples are outside. The result provides a sign, not Euclidean distance.''',
'''An implicit line can be written ax + by + c = 0. A parametric line between A and B is A + t(B − A). To draw a shallow line, line rasterisation selects one pixel per x-step, close to the mathematical line. For a steep line, take one y-step at a time. Grid traversal records every cell the line passes through. Specify the rule for contact with a grid corner.
@@
Bresenham can update an integer error. From (0, 0) to (6, 2), Δx = 6, Δy = 2 and the initial error is e = −3. Draw (0, 0), increment x, and add 2 to e. Now e = −1, so the next sample is (1, 0). Next, e = 1: increment y and subtract 6 from e. Draw (2, 1). The remaining samples are (3, 1), (4, 1), (5, 2), (6, 2).
@@
For a simple polygon, a horizontal ray can count edge crossings. An odd number means inside. On a scanline, sort the crossings and fill the intervals between the first and second, third and fourth, and so on. Include the lower y-endpoint, exclude the upper, and skip horizontal edges. Flood filling instead follows connected pixels from a seed. Four-neighbours share an edge; eight-neighbours may also share a corner.
@@
Choose the major axis with the largest absolute change so that successive samples are neighbours without gaps. For a steep line, swap x and y during the calculation, then swap back when writing the pixel.
@@
Basic practice · Which major axis suits Δx = 2 and Δy = 7?
@@
Choose the axis with the most integer steps.
@@
Use y. Each row can then receive a sample while x changes more slowly.
@@
Rasterise from (0,0) to (2,5) by rounding the ideal position to the nearest integer at each major-axis step.
@@
Use y as the major axis and x = 2y/5.
@@
At y = 0,1,2,3,4,5, x = 0; 0,4; 0,8; 1,2; 1,6; 2. The pixels have x = 0,0,1,1,2,2. Visiting only three x-values would leave gaps in the line.''',
'''A horizontal ray starting outside alternates between outside and inside at each proper edge crossing. Sort the intersections' x-coordinates and fill intervals in pairs. Include the lower y-endpoint, exclude the upper, and skip horizontal edges. This counts a vertex through which the boundary passes only once.
@@
For triangle (0,0), (6,0), (2,4), the line y=1 intersects at x=0,5 and 5. With integer samples, left inclusive and right exclusive, fill x=1,2,3,4. On the next row, the left x increases by 2/4 and the right by −4/4. An active edge table stores x, the increment and the ending height. Add new edges, remove expired ones, sort and fill before updating x. This reuses the intersections.
@@
If only a pixel boundary is available, seed filling can instead visit open neighbouring pixels from an interior point. Mark each pixel when it enters the queue. A gap in the boundary may let the queue escape. Four- or eight-neighbour connectivity determines whether diagonal openings connect regions.
@@
Basic practice · How many filled intervals do four proper crossings produce?
@@
Start outside and change status at every crossing.
@@
Entry, exit, entry, exit gives two separate intervals. This assumes that the vertex rule has been applied.
@@
Find the filled samples at y=2 and y=3.
@@
Update both x-values once per row.
@@
At y=2, the interval is [1,4), giving 1,2,3. At y=3, the boundaries are 1,5 and 3, giving only 2. Both edges expire at y=4.''',
'''A slanted edge looks jagged when each pixel has one point sample. Catmull's idea is to clip visible geometry to the pixel square and weight colour by actual area. Another method estimates area using several samples. With three of four samples white over a black background, the average is ¾.
@@
SSAA
@@
 computes coverage, visibility and colour at every subsample. 
@@
MSAA
@@
 also uses multiple coverage and depth samples, but can share one shading computation within the same primitive and pixel. Two different primitives in one pixel may therefore require two shading computations.
@@
Cost.
@@
 For 100 fully covered pixels with one primitive each, four samples, 25 % of the cost for coverage/depth and 75 % for lighting/texture: SSAA costs 100 · 4R = 400R. MSAA costs 100 · (4 · 0,25R + 0,75R) = 175R. Here R is the cost of one ordinary pixel. The advantage decreases when several primitives must be shaded per pixel.
@@
DLAA and DLSS use a trained network to reconstruct the image. DLAA targets antialiasing at the output image's resolution. DLSS can reconstruct a higher-resolution image from lower-resolution input data.
@@
A pixel footprint has area. Subsamples estimate the fraction covered by each surface. Average linear colour values. Regularly spaced samples may all miss the same narrow object.
@@
Basic practice · What do two covered subsamples out of eight mean?
@@
Assume equal weights and a white foreground over black.
@@
Estimated coverage is 2/8 = ¼, and the linear grey level is 0,25.
@@
A white stripe covers one fifth of a black pixel. Four equally weighted samples hit the stripe once. Find the exact value and the estimated value.
@@
Set black to 0 and white to 1.
@@
The area integral gives 0,2. The samples give (1 + 0 + 0 + 0)/4 = 0,25. The error is +0,05. Moving the samples can change the estimate without changing the exact area.
@@
For learned antialiasing, a training pair may contain a synthetic aliased image and a better-sampled reference image of the same scene. The network learns to estimate the reference from the input. At inference time, only the input data are available. Reconstructed details may therefore be wrong when different scenes produce the same samples. DLAA uses the output image's resolution and targets quality. DLSS can start with fewer input pixels to reduce rendering work before reconstruction.
@@
Try the method · our exercise
@@
An image will be displayed at 1920 × 1080. One approach first renders at 960 × 540. What fraction of the pixels is computed before reconstruction, and why does total time not necessarily decrease by the same factor?
@@
Halving both axes affects area. Distinguish rendering from post-processing.
@@
960·540 / (1920·1080)=¼. Reconstruction and geometry also require work. Four times fewer input pixels therefore do not automatically mean four times the frame rate. Two narrow stripes that both fall between samples also cannot be reliably distinguished from those samples alone.'''],
 'For a triangle with edge functions 4y, 12 − 3x − 4y and 3x, the values at (2, 1) are (4, 2, 6). What are the values one step up, and is that point covered?',
 'Read the coefficient of y in each function.',
 'The changes are (+4, −4, 0). The values at (2, 2) are (8, −2, 6). The second sign is negative, so the point lies outside.',
 {'edge function':'A linear function that is zero on a directed edge and has opposite signs on its two sides.','SSAA':'Supersampling antialiasing. The image is sampled and shaded at a higher resolution before filtering.','MSAA':'Multisampling antialiasing. Multiple coverage and depth samples can share one computed colour.'})
