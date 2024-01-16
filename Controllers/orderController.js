const OrderService = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// create Order
exports.createOrder = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    //  req.body will contain the address
    const order = await OrderService.createOrder(user._id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

exports.findOrderById = catchAsync(async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderService.getOrderById(orderId);
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
});

exports.orderHistory = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    // console.log("History");
    const orders = await OrderService.userOrderHistory(user._id);
    // console.log(orders);
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
