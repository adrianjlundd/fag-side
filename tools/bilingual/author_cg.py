"""English teaching text authored and reviewed by the assistant."""
from manual import assemble

assemble('scenegrafer','Modelling and scene graphs',
 'A robot arm can move while its mounting point is translated. A scene graph keeps track of which movements follow one another.',
 ['Trace a local point into world space.',"Find its position as seen from a sibling object by inverting the reference object's matrix."],
 ['Tracing a primitive through the graphics processor','From local geometry to the world','Viewing one object from another'],[
'''A vertex has a position and may have attributes such as colour and a normal. Indices group vertices into primitives. The vertex stage expresses positions in clip space. Clipping may create new vertices along the boundary of the view volume. Raster positions are obtained only after perspective division and the viewport transformation.
@@
Rasterisation finds covered samples and interpolates attributes. A fragment computation proposes a colour and depth. The depth test determines whether the sample may affect the image. The vertex count alone therefore does not determine the workload: one large triangle can cover the entire screen.
@@
A quadrilateral is described by four vertices and the triangle indices (0,1,2), (0,2,3). Local position number 2 is shared by both triangles and receives the same transformation. A flat surface may nevertheless need separate vertex records at a sharp discontinuity in normals or texture coordinates.
@@
Basic practice · What is the difference between a vertex and a fragment?
@@
Follow the triangle through to rasterisation.
@@
A vertex describes a geometric position with attributes. Rasterisation can produce many fragments from the three vertices, with interpolated values at the covered samples.
@@
Two triangles have the same three screen positions. How can their results still differ?
@@
Distinguish positions before rasterisation from attributes and buffer contents.
@@
They may have different depths, materials or vertex colours. Rasterisation then covers the same samples, while interpolation, lighting and the depth test can produce different visible colours.''',
'''A vertex describes one position. Three vertices can form a triangle primitive. A vertex table and an index list let several triangles share the same vertex data. A 
@@
scene graph
@@
 connects this geometry to groups and transformations.
@@
Let A be the matrix from arm space to world space, and H the matrix from hand space to arm space. Then p
@@
world
@@
hand
@@
. A sibling branch for the other hand must start from the same A. During traversal, you can save A on a stack, visit the hand, then restore A.
@@
 H translates two units along local x. A rotates by +90° about z, then translates by (4, 0). The hand's origin (0, 0) becomes (2, 0) in arm space, (0, 2) after rotation, and (4, 2) in world space. Check: its distance from the arm's world position (4, 0) is still 2.
@@
During traversal, each child receives its parent's accumulated matrix. Compute the child's world matrix and pass it only to that child's descendants. When visiting the next sibling, start the calculation again from their shared parent.
@@
Basic practice · Where is a child's origin in its own coordinate system?
@@
Distinguish the coordinate from the world position.
@@
The child's local origin is always (0,0,0). The transformation chain determines where that point lies in the world.
@@
A parent is translated 5 units to the right. Two children have local displacements +2 and −3. An implementation reports world positions 7 and 4. Find the error.
@@
Which matrix was on top of the stack before the second child was visited?
@@
The correct results are 5 + 2 = 7 and 5 − 3 = 2. The value 4 comes from 7 − 3. The program has allowed the first child's transformation to affect its sibling.''',
'''Let M
@@
 and M
@@
 map coordinates from A and B, respectively, to world space. To go from A to B, first go up to world space and then down using B's inverse: p
@@
. Shared ancestors cancel out.
@@
A lamp is at world position (4, 2). A camera at (1, 2) has the same axis directions. The lamp is at (4 − 1, 2 − 2) = (3, 0) in camera space. If the camera is also rotated, express the vector along the rotated camera axes.
@@
To express the same physical point in another reference frame, you need the placement of both frames. World space provides a shared intermediate frame. The inverse maps from world space into the target frame. A zero scale factor makes the general inverse mapping impossible.
@@
Basic practice · In which direction does the inverse map?
@@
Assume B maps local coordinates to world space.
@@
B⁻¹ maps world coordinates to local B-coordinates. B⁻¹B is the identity when B is invertible.
@@
Frame A has its origin at world-x = 4 and an x-unit twice as large as the world's. Frame B has its origin at −1 and the standard unit length. Find the B-coordinate of x = 3 in A.
@@
First calculate the world position. Then find the displacement from B's origin.
@@
The world position is 4 + 2·3 = 10. The B-coordinate is 10 − (−1) = 11. Substitute back into B: −1 + 11 = 10.'''],
 'A cart is at (3, 4), rotated 90° counterclockwise. A lamp is attached at (2, −1) in cart space. Where is the lamp in world space?',
 "Rotate the local displacement before adding the cart's world position.",
 'Rotation about z maps (2, −1) to (1, 2). Add (3, 4) to obtain (4, 6). The matrix from lamp space to world space is T(3,4) R(+90°) T(2,−1).',
 {'scene graph':'A hierarchy in which transformations along a path determine how geometry is placed.'})

assemble('kamera','Camera and projection',
 "A camera converts world positions into coordinates along its own axes. Projection then determines where they appear in the image.",
 ['Construct a view matrix and check that the camera centre maps to the origin.','Calculate the view volume, perspective matrix and coordinates after division by w.','Map normalised coordinates to a viewport.'],
 ['The world as seen from the camera','From the viewing pyramid to the image','Finding a projection onto a plane','From NDC to a viewport'],[
'''WCS is the world coordinate system. ECS is the eye coordinate system, with x pointing right, y up, and the viewing direction along negative z. Given eye position E, viewing direction g and an up vector: set ẑ = −g/‖g‖, x̂ = normalise(up × ẑ), and ŷ = ẑ × x̂. The up vector must not be parallel to the line of sight.
@@
For a world point P, calculate d = P − E. Its ECS coordinates are (x̂ · d, ŷ · d, ẑ · d). In the 
@@
view matrix
@@
, the axes form three rows, each with final entry −axis · E. The bottom row is [0, 0, 0, 1].
@@
Let E = (0, 0, 3), g = (1, 0, 0), and up = (0, 1, 0). Then ẑ = (−1, 0, 0), x̂ = (0, 0, 1), and ŷ = (0, 1, 0). The point (4, 2, 5) gives d = (4, 2, 2) and ECS = (2, 2, −4). Negative depth confirms that the point is in front of the camera. E itself gives (0, 0, 0).
@@
Camera coordinates are projections onto the camera's unit axes. Each row of the rotation part is therefore one of these axes. Normalisation matters: a rightward axis twice as long would double all horizontal distances.
@@
Basic practice · What eye coordinates does the eye itself have?
@@
Subtract the eye position from itself.
@@
All three components are zero. The change of basis leaves the zero vector unchanged.
@@
A camera at (1, 0, 0) looks along world +x with +y up. What are the eye coordinates of (4, 2, 0), with the camera looking along local −z?
@@
The point is ahead of and above the eye. Subtract the eye position first.
@@
P − E = (3, 2, 0). Local right is world +z, local up is +y, and local backward is −x. The dot products give (0, 2, −3). The eye itself gives three zeros.''',
'''In orthographic projection, all rays follow the same direction. In perspective projection, they meet at the eye, and equally sized objects occupy less image space as their distance increases. With image plane z = n < 0, we obtain x
@@
plane
@@
 = nx/z and y
@@
plane
@@
 = ny/z from similar triangles. A 
@@
frustum
@@
 has six bounding planes.
@@
For a symmetric frustum, l = −r and b = −t. With vertical field of view θᵧ, t = |n| tan(θᵧ/2) and r = t · width/height. If the horizontal angle θₓ is given instead, start with r = |n| tan(θₓ/2) and calculate t = r / (width/height).
@@
Our example using the book's convention.
@@
 Choose n = −2, f = −6, a horizontal field of view of 90°, and width/height = 2. Then r = 2 and t = 1. Set the x and y diagonal entries to n/r = −1 and n/t = −2. The z-row uses A = (n + f)/(f − n) = 2 and B = −2nf/(f − n) = 6. The final row gives w = z.
@@
Substitute the depth coefficients and transform the point from eye space to clip space: 
@@
 Divide x, y and z by w to obtain NDC = (0,25; 0,5; 0,5). Check z: at the near plane, (2 · (−2) + 6)/(−2) = −1, and at the far plane, (2 · (−6) + 6)/(−6) = +1. The complete matrix from object space to clip space is P V M.
@@
Perspective division follows from similar triangles. On a virtual image plane one unit in front of the eye, horizontal displacement equals sideways displacement divided by positive forward distance. A projection matrix combines scaling and depth mapping before division. Always check which quantity the final row puts into w.
@@
Basic practice · What happens to image size when distance doubles?
@@
Keep the object's width and the focal length fixed.
@@
On a perspective plane, width scales inversely with depth. Doubling depth halves the image width.
@@
A point has eye coordinates (2, 1, −4). Find its position on the virtual plane. Where does a point twice as far along the same ray appear?
@@
Use x/(−z) and y/(−z) for this plane.
@@
(½, ¼). The point (4, 2, −8) also gives (½, ¼). The depths differ even though the image positions coincide. A point at the eye itself causes division by zero.''',
'''A plane through A with normal n consists of points X for which n·(X−A)=0. The perspective ray from eye E through P is X=E+t(P−E). Substitute this into the plane equation and solve for t: 
@@
. The point then satisfies both conditions.
@@
With E=(0,0,0), P=(4,2,−4), and plane z=−2, t=(−2)/(−4)=½ and X=(2,1,−2). In parallel projection, the ray starts at P and follows the same direction for every point. A direction along the normal gives orthographic projection. Other directions not parallel to the plane give oblique projection.
@@
Basic practice · How do you test whether the answer lies in the plane?
@@
Use a plane through A with normal n.
@@
Substitute X into n·(X−A). The result must be zero, or close to zero with rounding.
@@
Project the same P parallel to (1,0,1). What happens with direction (1,0,0)?
@@
Set −4+t=−2 before calculating x.
@@
t=2 gives (6,2,−2). With a zero z-component, the ray from P never reaches the plane. A zero denominator means that there is no unique intersection.''',
'''NDC ranges from −1 to +1. First find the fraction along each axis: u = (x + 1)/2, v = (y + 1)/2. For a viewport with bottom-left corner (100, 50), width 400 and height 200, NDC (0,25; 0,5) gives u = 0,625 and v = 0,75. The result is (100 + 400 · 0,625; 50 + 200 · 0,75) = (350, 200).
@@
Here y increases upwards. If image row numbers increase downwards from the top of the same viewport, the offset is 200 · (1 − v) = 50. Convert to a specific pixel index only once the problem defines the sample location and rounding rule.
@@
The viewport transformation is an affine mapping from one interval to another. Subtract the lower bound, normalise to a fraction, scale to the new width, and add the new starting value. The outer window boundary may lie immediately beyond the last pixel index.
@@
Basic practice · Where does NDC-x equal to zero map?
@@
Find the fraction between −1 and +1.
@@
The fraction is (0+1)/2 = ½, halfway between the left and right viewport boundaries.
@@
A viewport extends from x = 20 to 220 in continuous screen coordinates. Find NDC-x for a sample at x = 70.
@@
Invert the steps in reverse order.
@@
Fraction = (70 − 20)/200 = ¼. NDC = 2·¼ − 1 = −½. The endpoints 20 and 220 give −1 and +1, respectively.'''],
 'A camera is at (0, 0, 5), looking along −z with +y up. What are the ECS coordinates of world point (2, 0, 1), and where does it project onto image plane z = −2?',
 'Subtract the eye position. Then compare the distances to the point and the image plane.',
 'The axes coincide, so ECS = (2, 0, 1 − 5) = (2, 0, −4). Scale x and y by (−2)/(−4) = 1/2. The image on the plane is (1, 0, −2).',
 {'view matrix':"The matrix that expresses a world point in the camera's coordinate system.",'frustum':'The view volume between the near, far and four side planes. With perspective projection, it is a truncated pyramid.'})
