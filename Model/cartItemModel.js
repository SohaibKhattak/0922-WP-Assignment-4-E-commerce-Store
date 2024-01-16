const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
  ],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  size: {
    type: String,
    required: [true, "Please provide Size"],
  },
  totalPrice: Number,
  totalDiscountPrice: Number,
  quantity: {
    type: Number,
    required: [true, "Please provide Quantity"],
  },
  price: {
    type: Number,
    required: [true, "Please provide Price"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Please provide Discount Price"],
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const CartItem = mongoose.model("cartItems", cartItemSchema);

module.exports = CartItem;
