from manual import assemble

assemble('morfologi','Morphology and shape',
 'Morphological operations test whether a small shape fits inside or intersects an object. The shape you choose determines which details are preserved.',
 ['Draw erosion, dilation, opening and closing with the specified origin.','Extract a boundary and reconstruct a component step by step.','Calculate local minima and maxima for greyscale images.'],
 ['Fit, intersection and operation order','Inner and outer boundaries','Reconstructing a connected component','Filling a hole by constrained growth','Labelling objects in two passes','Recognising a shape and finding its skeleton','Building the skeleton in layers and reconstructing the shape','Watershed segmentation','Moving minima and maxima'],[
'''Let A be the positions with value 1. A 
@@
structuring element
@@
 B is a small set of offsets from an origin. In 
@@
erosion
@@
, x is retained when every x + b belongs to A. In 
@@
dilation
@@
, each a in A adds all a + b. An equivalent intersection test at x uses reflected B. This orientation difference is visible for asymmetric elements.
@@
Use A = {2, 3, 4, 7} on a row and B = {−1, 0, 1}. Background is 0 everywhere else. Only 3 has three foreground pixels around it. Erosion gives {3}. Dilation gives {1, 2, 3, 4, 5, 6, 7, 8}. To check the origin, A = {2} and asymmetric B = {0, 1} give dilation {2, 3}.
@@
Opening is erosion followed by dilation with the same B. On the first row, you obtain {3}, then {2, 3, 4}. The isolated seven disappears. Closing is dilation followed by erosion. Here it gives {2, 3, 4, 5, 6, 7}. The gap has been filled.
@@
Opening is erosion followed by dilation with the same element. Only structures in which the element fits can grow back. Closing reverses the order and can bridge small gaps. Treat the entire number line outside the set as background.
@@
Basic practice · Which operation requires room for the entire element?
@@
Imagine a template that must fit completely inside the object.
@@
Erosion retains anchor positions where the entire element hits foreground. Dilation expands the object by the element's offsets.
@@
A = {1,2,3,6} and B = {−1,0,1}. Find opening and closing.
@@
Compute intermediate results as sets. B is symmetric.
@@
Erosion gives {2}, which dilates to {1,2,3}. For closing, dilation first gives every position from 0 to 7. Eroding the interval gives {1,2,3,4,5,6}. Opening removed the isolated point; closing filled the gap.''',
'''The inner boundary is A ∖ (A ⊖ B). The outer boundary is (A ⊕ B) ∖ A. For a filled 3 × 3 block inside a larger zero image and a full 3 × 3 element with centred origin, erosion leaves only the centre pixel. The inner boundary contains 9 − 1 = 8 pixels. Dilation produces a 5 × 5 block. The outer boundary contains 25 − 9 = 16 pixels.
@@
Subtracting erosion from A asks which foreground points lack full neighbourhood support. A different structuring element gives a different meaning to being on the boundary. Holes therefore also have inner boundaries.
@@
Basic practice · Does A minus its erosion give the inner or outer boundary?
@@
Every point in the difference comes from A.
@@
The inner boundary. These points belonged to the object but were removed by erosion.
@@
A is a 5 × 5 square with its centre pixel removed. Use a full 3 × 3 element and zero background. How many of the 24 foreground pixels survive erosion?
@@
The only possible centres unaffected by the outer edge lie in the inner 3 × 3 square.
@@
Every one of the nine possible windows contains the missing centre. None fits. The inner boundary therefore contains all 24 foreground pixels.''',
'''In binary 
@@
reconstruction
@@
, A is a mask constraining growth. Start with seed X₀ inside the object. Compute Xₖ = (Xₖ₋₁ ⊕ B) ∩ A until two successive sets are equal. A cross-shaped B including its centre gives four-neighbour connectivity. A full 3 × 3 element gives eight neighbours.
@@
On a row with A = {1, 2, 3, 5} and seed {1}, dilation by B = {−1,0,1} first gives {0,1,2}. Intersecting with A gives {1,2}. The next iteration gives {1,2,3}. The third gives the same result. Point 5 is separated by the gap at 4.
@@
The mask constrains every growth step. Clipping to the mask only after the last dilation can allow growth across a background barrier. A stable set is a natural stopping criterion because the next step then has the same input.
@@
Basic practice · Why intersect with the mask?
@@
Ask which positions the marker may grow into.
@@
The intersection removes every candidate outside the allowed region at each step.
@@
On a row, the mask is {1,2,3,5,6}, marker {2}, and B = {−1,0,1}. Find the reconstruction. What changes if 6 is also a marker?
@@
A gap containing a background pixel cannot be crossed.
@@
From {2}, the first step gives {1,2,3}, and the next is unchanged. With marker {2,6}, {5,6} is also included in the first step. The result is then the entire mask.''',
'''A hole is background cut off from the exterior under the chosen neighbourhood definition. Place a marker in the hole and reconstruct in the object's complement. Dilate one neighbour step, intersect with background, and repeat until the marker stops growing. The union of the object and final marker is the filled object.
@@
In a closed 5 × 5 frame, the nine interior pixels are background. With a centre seed and four neighbours, the first step gives five pixels, the next nine, and the third still nine. Marking exterior background from the image boundary instead finds all holes at once: background never reached must be filled.
@@
Basic practice · Where should the marker be placed to fill a specific hole?
@@
Find the background enclosed by the object.
@@
Start inside the hole. A marker in exterior background reconstructs the exterior instead.
@@
A corner of the frame is removed. Does growth from the centre reach the exterior with four or eight neighbours? Assume background around the frame.
@@
Check whether cell (1,1) can reach missing corner (0,0).
@@
Four neighbours cannot reach the corner because the two intervening edge pixels are foreground. Eight neighbours allow a diagonal step, so growth leaks out. A hole must therefore be defined using a specific connectivity.''',
'''A component label identifies all foreground pixels that can reach one another. Scan rows from the left with four-neighbour connectivity. Only the upper and left neighbours have already been processed. Assign a new label if neither has one. Copy an existing label if possible. If the neighbours have different labels, record their equivalence. A second pass replaces provisional labels with their group's representative.
@@
For rows [1,0,1] and [1,1,1], the top row receives [A,0,B]. The second starts with A and A. Its final pixel neighbours A on the left and B above. Merging the groups into A also gives the earlier B at the top right its correct final label. This works even when a connection is discovered long after the group's first pixel.
@@
Basic practice · What do two different provisional labels mean?
@@
Could a connection lie farther down the image?
@@
The labels differ locally during scanning. A later bridge may make them equivalent.
@@
How many components do rows [1,0] and [0,1] form with four and eight neighbours? Which already visited pixels must the scanner inspect for eight-neighbour connectivity?
@@
Remember the two diagonals in the preceding row during the first pass.
@@
Four neighbours give two components. Eight give one. The scanner needs the left neighbour in the same row and the upper-left, directly above and upper-right neighbours in the preceding row. The second pass can then look up labels independently of the neighbourhood.''',
'''Hit-or-miss searches for a specified foreground/background configuration. Require one element to fit foreground and another to fit background at the same origin. A three-position row template [0, 1, *] requires background on the left and foreground at the centre. The asterisk allows either value on the right. The template matches the centre of [0, 1, 1].
@@
A morphological skeleton represents an object using centres of maximal inscribed elements. For a disk, the largest inscribed disk is the object itself, so its skeleton is the centre. Several necessary centres can form branches in more complex shapes. In the discrete algorithm, the structuring element determines which shapes fit during repeated erosion.
@@
Hit-or-miss tests two requirements simultaneously at the same position. The foreground template must be contained in the object and the background template in its complement. Unspecified neighbouring positions may take either value.
@@
Basic practice · What does an unspecified template position mean?
@@
Distinguish requiring zero from imposing no requirement.
@@
It may be zero or one. Replacing all such positions with background requirements may remove valid matches.
@@
Find matches for [0,1,1] in row [0,1,1,1,0,1,1]. Use the middle position as anchor, indices starting at 0, and only complete windows.
@@
Require 0 on the left, 1 at the centre and 1 on the right.
@@
Centres 1 and 5 match. Centre 2 has the correct foreground, but its left neighbour is 1 and fails the background requirement. Erosion using only two ones would therefore give extra matches.''',
'''Let E₀ be the object and Eₖ the object after k erosions by B. A point in Eₖ represents a location where a copy of B dilated up to this level fitted. Some such points are already covered by larger copies at the next level. Remove them by subtracting the opening of Eₖ from Eₖ. The remainder is skeleton layer Sₖ. Retain the level number: it specifies how many dilations are required to reconstruct the object.
@@
On the number line, use A={1,2,3,4,5}, B={−1,0,1}, and zero background. E₁={2,3,4}, E₂={3}, and E₃ is empty. Opening E₀ returns all of E₀; opening E₁ returns E₁. The first two skeleton layers are empty. Opening E₂ is empty, so S₂={3}. Two dilations of {3} give first {2,3,4}, then A. For more complex shapes, take the union of the reconstructed layers. Thinning instead uses patterns to remove boundary points stepwise while respecting connectivity.
@@
Basic practice · Why store a skeleton point's level number?
@@
Two different intervals can have the same centre.
@@
The level determines how many dilations the point must undergo. Without it, the interval's length cannot be reconstructed.
@@
Repeat for A={1,2,3,7} with the same B. Which layers must be stored?
@@
Point 7 cannot belong to a copy of B. Therefore inspect S₀ as well.
@@
E₁={2}, and E₂ is empty. Opening E₀ gives {1,2,3}, so S₀={7}. S₁={2}. Reconstruction is {7} united with the dilation of {2}, namely {1,2,3,7}.''',
'''Interpret the image as terrain height. Flooding from local minima grows basins until they meet. Their meeting boundaries separate regions. Gradient magnitude is often useful as terrain: homogeneous regions are low and clear edges form high barriers. Small random minima can produce many artificial regions. Marker control selects in advance which basins may start.
@@
In profile [0,1,4,1,0], the endpoints give two minima. At height 1, the two low neighbouring points belong to their respective basins. At height 4, the growth fronts meet at the centre, so the peak marks the divide.
@@
Basic practice · Where does water begin to collect?
@@
Think of intensity or gradient as terrain height.
@@
At local minima, or at chosen markers in a marker-controlled variant.
@@
Why can smoothing before gradient calculation change the number of regions?
@@
Consider a small depression inside an otherwise uniform region.
@@
Smoothing can remove shallow local minima that would otherwise start separate basins. Excessive smoothing can also lower a true barrier, allowing different objects to merge.''',
'''For a flat element of height zero, greyscale erosion takes the minimum of f(x + b), and greyscale dilation the maximum of f(x − b). A centred symmetric window uses the same neighbours for both. For neighbourhood [4, 12, 5], erosion is 4 and dilation 12 at the centre.
@@
For opening or closing, the first stage must produce enough neighbouring values for the next. With row [4, 4, 12, 4, 4], three-point erosion gives [4, 4, 4] at the three interior positions. Dilating these gives opening value 4 at the centre. The white top-hat f − opening is 12 − 4 = 8, marking the narrow bright peak.
@@
A non-flat structuring element adds a height to each dilation candidate and subtracts it for erosion. Reflection of the support determines which neighbour pairs with each height. It cannot be ignored for an asymmetric element.
@@
Basic practice · What does flat erosion give on [2,7,4]?
@@
Let the symmetric element cover all three values.
@@
The minimum is 2. Flat dilation would give maximum 7 with the same window.
@@
At index i, f(i−1)=2, f(i)=5 and f(i+1)=8. The element has b(0)=0 and b(1)=2. Find dilation and erosion.
@@
Dilation uses f(i−u)+b(u); erosion uses f(i+u)−b(u).
@@
Dilation is max(5+0,2+2) = 5. Erosion is min(5−0,8−2) = 5. Incorrectly using the right neighbour for dilation would give 10.'''],
 'Foreground positions on a row are {2, 3, 5, 6}. Use B = {0, 1} with origin 0 and background everywhere else. Find erosion and the outer boundary.',
 'Erosion requires both x and x + 1 in A. For dilation, each foreground point adds itself and its right neighbour.',
 'Only 2 and 5 begin a pair of foreground points. Erosion is {2, 5}. Dilation is {2, 3, 4, 5, 6, 7}. Subtract A to obtain outer boundary {4, 7}.',
 {'structuring element':'A set of offsets with a chosen origin, determining which neighbouring positions a morphological operation examines.','erosion':'In a binary image, retaining a position if the entire translated structuring element lies in foreground.','dilation':'The union of copies of the structuring element placed at every foreground pixel.','reconstruction':'Repeated growth from a marker constrained by a mask, until the result no longer changes.'})
