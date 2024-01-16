const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  review: {
    type: String,
    required: [true, "Please provide Review"],
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
