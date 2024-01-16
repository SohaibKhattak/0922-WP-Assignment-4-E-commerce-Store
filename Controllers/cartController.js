const CartService = require("../services/cartService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getUserCart = catchAsync(async (req, res) => {
  //    user will come from middleware
  const user = req.user;
  try {
    const cart = await CartService.findUserCartById(user._id);
    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    throw new AppError(err.mssage, 500);
  }
});

exports.addItemToCart = catchAsync(async (req, res) => {
  const user = req.user;
  try {
    const cart = await CartService.addItemCart(user._id, req.body);
    // console.log("controller" + cart);
    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    console.log(err);
    throw new AppError(err.mssage, 500);
  }
});
