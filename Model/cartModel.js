// Every user has its own cart

const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItems",
    },
  ],
  totalPrice: {
    type: Number,
    required: [true, "Please provide a total price"],
    default: 0,
  },
  totalItems: {
    type: Number,
    required: [true, "Please provide Total Items"],
    default: 0,
  },
  totalDiscountPrice: {
    type: Number,
    required: [true, "Please provide Total Discount Price"],
    default: 0,
  },
  discount: {
    type: Number,
    // required: [true, "Please provide Discount"],
    default: 0,
  },
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
