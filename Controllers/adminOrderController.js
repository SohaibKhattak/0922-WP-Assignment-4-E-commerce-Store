const OrderService = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//  All Orders
exports.getAllOrder = catchAsync(async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
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

exports.confirmOrder = catchAsync(async (req, res) => {
  const productId = req.params.id;
  try {
    const order = await OrderService.confirmOrder(productId);
    res.status(200).json({
      status: "success",
      data: {
        order: "Order Confirmed Successfully!",
      },
    });
  } catch (err) {
    throw new Error(err.message, 500);
  }
});
exports.deliverOrder = catchAsync(async (req, res) => {
  const productId = req.params.id;
  try {
    const order = await OrderService.deliverOrder(productId);
    res.status(200).json({
      status: "success",
      data: {
        order: "Order Delivered Successfully!",
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
exports.shipOrder = catchAsync(async (req, res) => {
  const productId = req.params.id;
  try {
    const order = await OrderService.shipOrder(productId);
    res.status(200).json({
      status: "success",
      data: {
        order: "Order Shipped Successfully!",
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
exports.deleteOrder = catchAsync(async (req, res) => {
  const productId = req.params.id;
  try {
    const order = await OrderService.deleteOrder(productId);
    res.status(200).json({
      status: "success",
      data: {
        order: "Order DELETED Successfully!",
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
exports.cancelOrder = catchAsync(async (req, res) => {
  const productId = req.params.id;
  try {
    const order = await OrderService.cancelOrder(productId);
    res.status(200).json({
      status: "success",
      data: {
        order: "Order Cancelled Successfully!",
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
