const ratingService = require("../services/reviewService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.addRating = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.params;
    const review = await ratingService.createRating(req.body, user, productId);
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

exports.getAllRatings = catchAsync(async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await reviewService.getAllRatings(productId);
    res.status(200).json({
      status: "success",
      data: {
        ratings,
      },
    });
  } catch (err) {
    throw new Error(err.mssage);
  }
});
