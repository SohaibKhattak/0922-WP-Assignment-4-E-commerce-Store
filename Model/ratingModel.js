const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  rating: {
    type: Number,
    required: [true, "Please provide Rating"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Rating = mongoose.model("ratings", ratingSchema);

module.exports = Rating;
