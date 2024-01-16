const reviewService = require("../services/reviewService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.addReview = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.params;
    const review = await reviewService.createReview(req.body, user, productId);
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    throw new Error(err.mssage);
  }
});

exports.getAllReviews = catchAsync(async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getAllReviews(productId);
    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (err) {
    throw new Error(err.mssage);
  }
});
