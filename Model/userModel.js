const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    minLength: 3,
  },
  lastName: {  
    type: String,
    required: [true, "Please enter your last name"],
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    // 3rd party package for email validation
    validator: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide  confirm password"],
    validate: {
      validator: function (el) {
        // this will work only on save and creating

        return el === this.password;
      },
      message: "Password does not match ",
    },
  },
  mobile: {
    type: String,
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adresses",
    },
  ],
  paymentInformation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment_information",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  role: {
    type: String,
    default: "CUSTOMER",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Password Hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // as when password it is modified so not run

    return next();
  }
  // console.log(this.password);
  this.password = await bcrypt.hash(this.password, 12);
  // console.log("Saving Password", this.password);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("users", userSchema);
module.exports = User;
