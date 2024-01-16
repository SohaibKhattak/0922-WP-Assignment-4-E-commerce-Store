const Review = require("../Model/reviewModel");
const Product = require("../Model/productModel");

exports.createReview = async (reqData, user, productId) => {
  try {
    const product = await Product.findById(productId);

    const review = new Review({
      user: user._id,
      product: product._id,
      review: reqData.review,
      createdAt: new Date(),
    });

    //     in order to save review in product
    await product.save();

    return await review.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllReviews = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (product) {
      return await Review.find({ product: product._id }).populate("user");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
