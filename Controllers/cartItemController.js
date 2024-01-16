const CartItemService = require("../services/cartItemService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.updateCartItem = catchAsync(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;

  // console.log("Form " + req.body);
  try {
    const cartItem = await CartItemService.updateCartItem(
      user._id,
      productId,
      req.body
    );
  
    res.status(200).json({
      status: "success",
      data: {
        cartItem,
      },
    });
  } catch (err) {
    console.log(err);
    throw new AppError(err.message, 400);
  }
});

exports.removeCartItem = catchAsync(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  try {
    const cartItem = await CartItemService.removeCartItem(user._id, productId);

    res.status(200).json({
      status: "success",
      data: {
        cartItem,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
