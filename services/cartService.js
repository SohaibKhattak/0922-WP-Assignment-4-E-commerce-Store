const CartItem = require("../Model/cartItemModel");
const Cart = require("../Model/cartModel");
const Product = require("../Model/productModel");

exports.createCart = async (user) => {
  try {
    // console.log("From Cart Service ", user);
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Find Cart by ID
exports.findUserCartById = async (userId) => {
  try {
    // if(req.user)
    // console.log(req.user);
    const cart = await Cart.findOne({ user: userId });
    const cartItems = await CartItem.find({ cart: cart._id })
      .populate("products")
      .populate({
        path: "userId",
        select: "firstName lastName email",
      });

    // Now assigning in database
    cart.cartItems = cartItems;
    // console.log(cart);
    // now adding price
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    // Counting for cartItems
    for (let cartItem of cart.cartItems) {
      // console.log(cartItem.discountPrice);
      totalPrice += cartItem.totalPrice;
      totalDiscountedPrice += cartItem.totalDiscountPrice;
      totalItems += cartItem.quantity;
    }

    // Now assigning in DB
    // Now Cart
    cart.totalPrice = totalPrice;
    cart.totalDiscountPrice = totalDiscountedPrice;
    cart.totalItems = totalItems;

    return cart;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// add Cart Item
exports.addItemCart = async (userId, req) => {
  // console.log(req);
  try {
    const cart = await Cart.findOne({ user: userId });
    // Now finding product by using Id
    const product = await Product.findById(req.productId);
    // Checking if it is already present then not add
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      products: product._id,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        cart: cart._id,
        products: product._id,
        size: req.size,
        quantity: req.quantity,
        totalPrice: product.price * req.quantity,
        price: product.price,
        discountPrice: product.discountPrice,
        totalDiscountPrice: product.discountPrice * req.quantity,
        userId: userId,
      });
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);

      await cart.save();
      // console.log("Added" + cart);

      return cart;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
