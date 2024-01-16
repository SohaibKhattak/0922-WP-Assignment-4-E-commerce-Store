const productService = require("../services/productService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createProduct = catchAsync(async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
});

exports.updateProduct = catchAsync(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.updateProduct(productId, req.body);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

exports.deleteProduct = catchAsync(async (req, res) => {
  try {
    // console.log(req.body);
    const { productId } = req.params;
    const product = await productService.deleteProduct(productId);
    res.status(200).json({
      status: "success",
      data: {
        message: "Successfully Deleted !",
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
exports.getProductById = catchAsync(async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.findProductById(productId);

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

//  Get All Products

exports.getAllProducts = catchAsync(async (req, res) => {
  try {
    // console.log(req.query);
    let products = await productService.getProductsAll(req.query);
    // console.log(products);
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

// create multiple products for DB
exports.createMultipleProducts = catchAsync(async (req, res) => {
  try {
    const products = await productService.createMultipleProduct(req.body);

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
