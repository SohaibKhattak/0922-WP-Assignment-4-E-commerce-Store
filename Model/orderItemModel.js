const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  size: {
    type: String,
  },
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
    default: 0,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  deliveryDate: {
    type: Date,
  },
});

const OrderItem = mongoose.model("orderItems", orderItemSchema);

module.exports = OrderItem;
