const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Title"],
  },
  description: {
    type: String,
    required: [true, "Please provide Description"],
  },
  price: {
    type: Number,  
    required: [true, "Please provide Price"],
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
  },
  brand: {
    type: String,
  },
  sizes: [
    {
      // just like L size quantity
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  color: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "categories",
    // },
    {
      name: { type: String },
      level: { type: Number },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
productSchema.index({ price: 1 });

const Product = mongoose.model("products", productSchema);

module.exports = Product;
