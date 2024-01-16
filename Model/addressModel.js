const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a First Name"],
  },
  address: {
    type: String,
    required: [true, "Please provide a Address"],
  },
  city: {
    type: String,
    required: [true, "Please provide a City"],
  },
  state: {
    type: String,
    required: [true, "Please provide a State"],
  },
  zipCode: {
    type: String,
    required: [true, "Please provide a Zip Code"],
  },
  mobile: {
    // +92 0302 1234567
    type: String,
    required: [true, "Please provide a Mobile Number"],
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Address = mongoose.model("addresses", addressSchema);
module.exports = Address;
