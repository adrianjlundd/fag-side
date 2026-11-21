from manual import assemble

assemble('nevrale-nett','Fully connected networks',
 'A neural network learns a relationship between inputs and correct outputs. Each layer computes a weighted sum, adds a bias, and applies an activation function.',
 ['Calculate a forward pass with weights, biases, activations and loss.','Use the chain rule to calculate gradients in output and hidden layers.','Update weights and biases from a mini-batch.'],
 ['From labelled examples to generalisation','From inputs to loss','Following the chain rule backwards','Learning from several examples'],[
'''In supervised learning, an example consists of an input and a known target. The forward pass produces a prediction, the loss function measures its error, and the backward pass calculates how weights affect the loss. The gradient step changes weights to reduce training loss. New images pass only through the forward computation.
@@
Use validation data for model selection and a separate test set for final evaluation. Nearly identical images of the same object in training and validation can give a misleading impression of generalisation. In that case, split by object before creating training variants. A threshold or normalisation fitted on the entire dataset can also leak information.
@@
At epoch 4, training/validation losses are 0,4/0,5. At epoch 8, they are 0,2/0,7. The weights fit the training set better, but validation loss rises. Using validation loss as the criterion, choose epoch 4 out of these two.
@@
Basic practice · Which dataset is used for model selection?
@@
Keep final evaluation separate from choices made during development.
@@
The validation set is used for choices such as the epoch. Reserve the test set for final evaluation.
@@
A training set has 90 images from class A and 10 from B. A model always predicts A. What does overall accuracy conceal?
@@
Count correct predictions separately for each class.
@@
90 of 100 are correct. Accuracy for A is 100 %, for B 0 %. Overall accuracy alone therefore does not show whether the model recognises B. Check per-class performance on held-out data.''',
'''Use column vectors and one weight row per output. A layer with m inputs and n outputs has W of shape n × m and one 
@@
bias
@@
 per output. Calculate 
@@
, then a = g(z). The choice of 
@@
activation function
@@
 depends on the task. ReLU gives max(0, z), and sigmoid 
@@
 gives a value between 0 and 1.
@@
Let x = [2, 1]ᵀ, W = [1, −3], b = 1, and correct binary class y = 1. Then z = 1·2 − 3·1 + 1 = 0 and a = σ(0) = 0,5. With binary 
@@
cross-entropy
@@
 L = −y ln(a) − (1 − y) ln(1 − a), L = −ln(0,5) ≈ 0,693. The model assigns equal probability to the two classes.
@@
For regression with a linear output, one may use L = ½(a − y)². For a = 3 and y = 5, loss is 2. Its derivative with respect to a is −2, so a small increase in a reduces the loss.
@@
Think of each weight-matrix row as one detector: its dot product weights the features, and bias shifts the threshold at which the neuron activates. Without nonlinear activation, two affine layers could be combined into one, since composing affine mappings gives another affine mapping.
@@
Basic practice · How many biases does a layer with three outputs have?
@@
Each output computes one weighted sum.
@@
Three, one per sum, regardless of the number of inputs.
@@
Use x = (2,−1), weight rows (1,2) and (−1,1), and bias (1,1). Pass the result through ReLU, then a final layer with weights (2,−3) and bias −1.
@@
Calculate two dot products and add their respective biases before clipping negative values.
@@
The first layer gives 2−2+1 = 1 and −2−1+1 = −2. ReLU gives (1,0). The final score is 2·1 − 3·0 − 1 = 1. This raw score is not a probability without an appropriate output function.''',
'''In 
@@
backpropagation
@@
, 
@@
 denotes sensitivity of the loss before activation. For binary cross-entropy and sigmoid, (∂L/∂a)(∂a/∂z) simplifies to a − y. In this example, δ = −0,5. For weight wᵢ, ∂z/∂wᵢ = xᵢ; for bias, ∂z/∂b = 1. Thus ∂L/∂W = δxᵀ = [−1, −0,5] and ∂L/∂b = −0,5.
@@
In a hidden layer, sum contributions from every path to the loss. With column vectors, use δ
@@
hidden
@@
next
@@
next
@@
hidden
@@
), where ⊙ multiplies corresponding elements. For an active ReLU neuron with outgoing weights 2 and −1 and error signals 0,3 and 0,1, this gives (2·0,3 − 1·0,1)·1 = 0,5. A negative ReLU input would give zero gradient along this path.
@@
Gradient descent subtracts the gradient times learning rate η from the old parameters. With η = 0,2 in the sigmoid example, the first new weight is 1 − 0,2·(−1) = 1,2, the second is −3 − 0,2·(−0,5) = −2,9, and the new bias is 1,1. A new forward pass gives z = 1,2·2 − 2,9 + 1,1 = 0,6 and σ(z) ≈ 0,646. Loss −ln(0,646) ≈ 0,437 has decreased from 0,693. Use the old weights throughout the backward pass before updating.
@@
When a hidden activation contributes to several subsequent neurons, sum all gradient contributions. This follows from the chain rule with multiple paths from the activation to the same loss. Use forward-pass weights for every gradient before updating.
@@
Basic practice · Which way should a weight move when its gradient is positive?
@@
Write w ← w − ηg with η > 0.
@@
The weight decreases. For a sufficiently small step, this reduces loss locally with other weights fixed.
@@
A hidden ReLU has positive preactivation and sends a into z₁ = 2a and z₂ = −3a. The loss derivatives with respect to these are 4 and 1. What gradient reaches the weight into the ReLU when its input is 2?
@@
First calculate ∂L/∂a. Then multiply by the local ReLU derivative and the input.
@@
At a, sum 2·4 + (−3)·1 = 5. ReLU passes 5 through. The weight gradient is 5·2 = 10 and the bias gradient is 5. An inactive ReLU would give zero for both.''',
'''For mean loss over B examples, average the B gradients. If one weight receives gradients 4, −1 and 3 in a mini-batch, its batch gradient is (4 − 1 + 3)/3 = 2. With w = 1 and η = 0,1, the new w is 0,8. A summed loss uses the sum instead. Validation data measure generalisation to examples not used for training.
@@
A batch gradient is the gradient of the chosen batch loss. For a mean, each example must count equally. Averaging two group means directly works only when the groups have equal size.
@@
Basic practice · What happens with example gradients +2 and −2?
@@
Use equal weighting in mean loss.
@@
The gradient is (2−2)/2=0. The two examples pull this parameter equally strongly in opposite directions.
@@
Two groups containing one and three examples have mean gradients 8 and 0 for one weight. Find the gradient of the combined mean loss and update w = 3 with learning rate 0,1.
@@
Reconstruct the gradient sum before dividing by four.
@@
The sum is 1·8 + 3·0 = 8. The mean is 8/4 = 2. The new weight is 3 − 0,1·2 = 2,8. An unweighted group mean of 4 would give too large a step.'''],
 'A single sigmoid gives a = 0,8 for x = [1, 3]ᵀ and correct class y = 0. Use binary cross-entropy. Find δ, the weight gradients, and the bias change with η = 0,05.',
 'For sigmoid with binary cross-entropy, δ = a − y. Each weight gradient includes its corresponding input as a factor.',
 'δ = 0,8 − 0 = 0,8. Weight gradients are [0,8·1, 0,8·3] = [0,8, 2,4]. The bias gradient is 0,8. Bias decreases by 0,05·0,8 = 0,04, reducing the logit and probability of class 1 for this sample.',
 {'bias':"A trainable constant added to a neuron's weighted sum.",'activation function':"A function mapping a neuron's weighted sum to an activation. Nonlinearity lets multiple layers describe more complex functions.",'backpropagation':'Computing gradients backwards from the loss through the layers using the chain rule.','cross-entropy':'A loss penalising low predicted probability for the correct class.'})

assemble('cnn','Convolutional networks',
 'A CNN applies the same learned filter at multiple image locations. One filter can thus detect a local pattern regardless of where it occurs in the image.',
 ['Trace image height, width and channels through convolution and pooling.','Count trained parameters and multiplications separately.','Calculate a local response and express the same operation as a matrix product.'],
 ['Calculating output size','Counting stored weights and computational work','Calculating responses, activations and class scores'],[
'''A filter sees a window across all input channels and produces one 
@@
feature map
@@
. The number of filters therefore equals the number of output channels. With filter width K, symmetric padding P on each side, 
@@
stride
@@
 S and dilation 1, 
@@
. Use the same formula for height. The floor counts only placements where the whole window fits after padding.
@@
For a 9 × 9 image with 2 channels, three 3 × 3 filters, stride 2 and P = 1, output W = ⌊(9 + 2 − 3)/2⌋ + 1 = 5. The result is 5 × 5 × 3. ReLU changes no dimensions. A 2 × 2 max-
@@
pooling
@@
 operation with stride 2 and no padding gives 2 × 2 × 3, or twelve values when flattened. The remainders at the right and bottom lie outside the windows.
@@
The output-size formula counts valid filter starting positions. With padded width W + 2P, the final possible start is W + 2P − K. Because the first start is zero, one initial window is added to the number of complete steps.
@@
Basic practice · How many starts fit width 5 with kernel 3, stride 1 and no padding?
@@
Start at column zero.
@@
Starts 0,1,2 fit. Start 3 would require column 5. Output width is 3.
@@
Input is 7 × 8, kernel 3 × 3, stride 2, no padding. List starting positions and dimensions. What happens to the final column?
@@
Use rows and columns indexed from 0. Each window must fit completely.
@@
Row starts are 0,2,4 and column starts are 0,2,4. The result is 3 × 3 per filter. The final window covers columns 4–6. Column 7 is unused because start 6 would require column 8.''',
'''Each filter uses K
@@
in
@@
 weights and optionally one bias. Multiply by C
@@
out
@@
 to count parameters. In the layer above, (3·3·2 + 1)·3 = 57. The same 57 parameters are reused at every position. Fixed max pooling has no trainable parameters.
@@
The number of multiplications for direct evaluation, however, is H
@@
out
@@
out
@@
out
@@
in
@@
 = 5·5·3·18 = 1350. This counts operations on padding, and counts a multiplication and addition separately. Each output sums 18 products using 17 additions, plus one if bias is added. A fully connected layer from twelve flattened values to four classes would have 12·4 + 4 = 52 parameters.
@@
Weight sharing means applying the same feature detector at all spatial positions. More input channels give more weights per detector. More output channels give more detectors. A larger image alone increases how often they are applied.
@@
Basic practice · How many feature maps do four filters produce?
@@
Each filter sums across all input channels.
@@
Four feature maps. Input channel count determines each filter's depth, not the number of output maps.
@@
A 1 × 1 layer maps 8 channels to 3 over 10 × 10 image positions. Can it mix colours, and can it see neighbouring pixels? Calculate parameters and multiplications.
@@
Each output is a dot product across all channels of one pixel, plus a bias.
@@
Three weight rows with eight entries and three biases give 27 parameters. At 100 positions, 100·3·8 = 2400 multiplications are required. The layer mixes channels but has no spatial neighbour in its own receptive field.''',
'''In the usual CNN forward pass, the filter has its stated orientation. For row [3, 1, 4, 2], filter [2, −1], stride 1 and no padding, collect windows [3,1], [1,4], [4,2] as matrix rows. Multiply each row by [2,−1]ᵀ. Responses are [5, −2, 6] before bias. An alternative matrix has rows [2,−1,0,0], [0,2,−1,0], [0,0,2,−1]. Multiplying it by the image row as a column gives the same three results.
@@
With zero bias, ReLU gives [5, 0, 6]. A final classifier computes one 
@@
logit
@@
 per class. Softmax of logits [ln 3, ln 2] gives [3/5, 2/5]. If the second class is correct, categorical cross-entropy is −ln(2/5) ≈ 0,916. Loss decreases when the model assigns higher probability to the correct class.
@@
A filter has one weight plane per input channel. Sum responses from all planes and add one bias before activation. Applying ReLU separately to each channel before summing removes negative contributions that should cancel positive ones.
@@
Basic practice · When is bias added to a CNN result?
@@
Distinguish individual channel contributions from the total response.
@@
One bias per filter is added to the total sum at every spatial position, before activation.
@@
Two channel windows are [1,2] and [3,1]. Weights are [2,1] and [−2,1]. Use correlation, bias 2 and ReLU. Find one output.
@@
Write one sum per channel. How many times should bias be added?
@@
The first contribution is 2·1+1·2 = 4. The second is −2·3+1·1 = −5. Before activation, 4−5+2 = 1; after ReLU, it remains 1. Every position in this feature map uses the same weights and bias.'''],
 'An 8 × 8 RGB image passes through five 3 × 3 filters with stride 1, no padding and one bias per filter. Find output shape, parameter count and multiplication count.',
 'Each output value sees 3 × 3 positions in each of three channels.',
 'Width and height are (8 − 3)/1 + 1 = 6. Shape is 6 × 6 × 5. There are (27 + 1)·5 = 140 parameters. The 180 outputs require 27 multiplications each, totalling 4860.',
 {'feature map':'The spatial responses from one filter in a network layer.','stride':'The pixel distance between successive placements of the filter window.','pooling':'Summarising a local region, for example by taking the maximum in each 2 × 2 window.','logit':'A raw class score before conversion into a probability.'})

assemble('transformer','Vision Transformer',
 'A Vision Transformer divides an image into small patches and lets each patch retrieve information from other patches. The model can thus use relationships between distant image regions.',
 ['Find the number of patches and dimensions before and after embedding.','Set up Q, K and V and calculate one row of attention weights.','Trace multiple heads and the classification token through to a probability.'],
 ['Turning the image into a sequence','From Q, K and V to a new token','Tracing tokens through an encoder block','Reading out the class'],[
'''A 
@@
patch
@@
 of P × P pixels with C channels contains P²C values. When both image dimensions are divisible by P, there are (H/P)(W/P) non-overlapping patches. Use one row per patch and project each row with the same weight matrix into a 
@@
token
@@
 with D features. A learned classification token may be prepended. Add a position vector to each row so the model can distinguish locations.
@@
A 4 × 6 RGB image with P = 2 gives 2·3 = 6 patches, each containing 2·2·3 = 12 values. A 12 × 8 projection gives 6 × 8. With one classification token, X is a 7 × 8 matrix. A 7 × 8 positional matrix can be added elementwise.
@@
A patch projection learns a representation of local pixels, but the same projection is used everywhere. A position vector makes otherwise identical patches at different locations distinguishable to the encoder. Add positional encoding only once its dimension matches the token width.
@@
Basic practice · How many values are in one 4 × 4 RGB patch?
@@
Count channels at every spatial position.
@@
4·4·3=48. Token width after projection may differ.
@@
An 8 × 8 greyscale image is divided into 2 × 2 patches. Token width is 6. What are the shapes of the patch matrix, projection and positional encodings with one class token?
@@
Count spatial patches and values per patch separately. The class token is added after patch projection.
@@
4·4 = 16 patches, each with four values. A 16 × 4 patch matrix times 4 × 6 weights gives 16 × 6. Add one class-token row before adding 17 × 6 positional encodings.''',
'''self-attention
@@
 computes 
@@
 and 
@@
. A query describes what the token seeks, a key what each token offers, and a value what content is combined. With N tokens, Q and K have shape N × d
@@
. Their product QKᵀ has shape N × N. Values V have shape N × d
@@
Scale each score by 1/√d
@@
 and apply 
@@
softmax
@@
 along each row. Then multiply the weight table by V. The combined operation is 
@@
, where rows of Z are the new representations. With d
@@
 = 1, one query q = 1, keys [0, ln 3] and values [2, 6], the scaled scores are [0, ln 3]. Exponentials are [1, 3], so weights are [¼, ¾]. The new value is ¼·2 + ¾·6 = 5. The second token contributes more. Every weight row sums to 1.
@@
With multiple heads, each head has its own projections. Concatenate head outputs along the feature axis before the output projection. Two outputs of shape 7 × 4 become 7 × 8, and an 8 × 8 projection preserves model width. There are still seven tokens.
@@
One row of QKᵀ compares one query with all keys. Division by √dₖ keeps the dot-product scale more stable as key width increases. For numerically stable softmax, subtract the same constant from all scores in a row: the corresponding factor cancels between numerator and denominator.
@@
Basic practice · Why does an attention row sum to one?
@@
Which sum appears in the softmax denominator?
@@
All positive exponentials are divided by their shared sum. The new token value is therefore a weighted average of this head's values.
@@
A query is (2,0), keys are (1,0) and (0,1), and values are 3 and 9. Find the scaled dot-product output. Which value should it be closest to?
@@
Depth is 2. Use exp(√2) ≈ 4,11.
@@
Scores before scaling are [2,0], afterwards [√2,0]. Weights are approximately [4,11/5,11;1/5,11] = [0,804;0,196]. The sum 0,804·3 + 0,196·9 ≈ 4,18 is closest to 3, belonging to the best-matching key.''',
'''Each attention head uses its own Q, K and V projections. A token can therefore weight neighbouring tokens differently in each head. Concatenate outputs along the feature axis and project back to model width. A residual connection adds the original token matrix to the branch result. The shapes in the addition must match.
@@
In a block with normalisation before each sublayer, first Y = X + Attention(LN(X)), then Z = Y + MLP(LN(Y)). Layer normalisation normalises features within each token. Attention mixes information between tokens, whereas a fully connected network applies the same weights independently to each row. Positional information travels with the features through the block.
@@
With five tokens, model width 8 and two heads of width 4, each head has a 5 × 5 weight matrix and a 5 × 4 output. Concatenation gives 5 × 8, compatible with the residual connection after output projection.
@@
Basic practice · Why must the branch have the same output shape as X?
@@
The residual connection adds elementwise.
@@
Every token and feature in X must have a corresponding element in the branch output. The output projection adjusts feature width.
@@
Only the token count doubles to ten. How do the number of attention scores and output shape change?
@@
Each head compares every query with every key.
@@
Two heads go from 2·5²=50 to 2·10²=200 scores. Output grows from 5 × 8 to 10 × 8. Quadratic growth applies to comparisons, not the number of token rows.''',
'''After the encoder blocks, the updated classification token contains information collected from the image. Take this one row and compute class scores using a fully connected layer. With scores [0, ln 3], the second class has probability 3/(1 + 3) = 0,75. If it is correct, loss is −ln(0,75) ≈ 0,288. Here normalisation is across classes. In attention, normalisation was across keys for one query.
@@
The classification layer receives one completed feature vector from the class token. Its softmax distributes probability across classes, whereas attention softmax distributed weight across tokens. Cross-entropy for one correct class uses the probability at that class index.
@@
Basic practice · Which softmax axis is used in the classification layer?
@@
One row represents one classified image.
@@
Normalise across the image's class scores. The earlier attention normalisation was over key tokens.
@@
Logits are [ln 2,0,ln 3]. Find the predicted class and loss if the first class is correct. What if every score increases by 10?
@@
Normalise [2,1,3] by the total sum. Loss is the negative natural logarithm of the correct class probability.
@@
The distribution is [⅓,⅙,½]. The model chooses the third class. Loss is −ln(⅓) = ln 3 ≈ 1,099. Adding 10 to every score multiplies all exponentials by exp(10). That factor cancels.'''],
 'An 8 × 8 greyscale image is divided into 4 × 4 patches. Use one classification token, model width 6 and two heads with dₖ = dᵥ = 3. Find the shapes of X, Q, QKᵀ, one head output and the concatenated outputs.',
 'Count sequence length first. Every head sees all tokens, even though its feature width is smaller.',
 'The image gives (8/4)² = 4 patches, and the classification token gives N = 5. X has shape 5 × 6. One head has Q of shape 5 × 3 and QKᵀ of shape (5 × 3)(3 × 5) = 5 × 5. Attention weights times V give (5 × 5)(5 × 3) = 5 × 3. Concatenating two heads gives 5 × 6.',
 {'patch':'An image region flattened and projected into one token vector.','token':'A vector representing one sequence unit, such as an image patch or the classification symbol.','self-attention':'A method in which each token forms a weighted combination of value vectors from the same sequence.','softmax':'Normalises scores by exponentiating them and dividing each exponential by their sum.'})
