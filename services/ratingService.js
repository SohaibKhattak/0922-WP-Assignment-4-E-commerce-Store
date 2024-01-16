const Rating = require("../Model/ratingModel");
const Product = require("../Model/productModel");

exports.createRating = async (reqData, user, productId) => {
  try {
    const product = await Product.findById(productId);

    const rating = new Rating({
      user: user._id,
      product: product._id,
      rating: reqData.rating,
      createdAt: new Date(),
    });

    //     in order to save review in product
    await product.save();

    return await rating.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllRatings = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (product) {
      return await Rating.find({ product: product._id }).populate("user");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
