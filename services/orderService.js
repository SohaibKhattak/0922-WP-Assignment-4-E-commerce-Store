const Address = require("../Model/addressModel");
const User = require("../Model/userModel");
const Cart = require("../Model/cartModel");
const OrderItem = require("../Model/orderItemModel");
const Order = require("../Model/orderModel");
// Create Order
exports.createOrder = async (userId, shipAddress) => {
  // console.log(shipAddress);
  try {
    let address;
    // if already present Address
    const user = await User.findById(userId);
    if (shipAddress._id) {
      const existingAddress = await Address.findById(shipAddress._id);
      address = existingAddress;
    } else {  
      address = new Address({
        firstName: shipAddress.firstName,
        lastName: shipAddress.lastName,
        address: shipAddress.address,
        city: shipAddress.city,
        state: shipAddress.state,
        zipCode: shipAddress.zipCode,
        mobile: shipAddress.mobile,
      });
      // address.shipAddress = shipAddress;
      address.user = user;
      await address.save({
        validateBeforeSave: false,
      });

      // console.log(address, "address");
      // Now adding in user
      user.address.push(address);
      await user.save({
        validateBeforeSave: false,
      });
    }
    //          Now finding cart with that user
    const cart = await Cart.findOne({ user: userId }).populate("cartItems");
    let orderItems = [];
    console.log(cart);
    for (let cartItem of cart.cartItems) {
      // now creating orderItem
      const orderItem = new OrderItem({
        product: cartItem.products,
        size: cartItem.size,
        quantity: cartItem.quantity,
        price: cartItem.totalPrice,
        discountPrice: cartItem.totalDiscountPrice,
        userId: user._id,
      });
      // console.log(orderItem);
      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    //     For Order Total Price
    let OrderTotalPrice = 0;
    let OrderTotalDiscountPrice = 0;
    let OrderTotalItems = 0;

    for (let orderItem of orderItems) {
      OrderTotalPrice += orderItem.price;
      OrderTotalDiscountPrice += orderItem.discountPrice;
      OrderTotalItems += orderItem.quantity;
    }

    // Now creatinf Order
    const createdOrder = new Order({
      orderItems,
      shippingAddress: address,
      user: user._id,
      totalPrice: OrderTotalPrice,
      totalDiscountPrice: OrderTotalDiscountPrice,
      totalItems: OrderTotalItems,
      discount: cart.discount,
    });
    const savedOrder = await createdOrder.save();
    // console.log(savedOrder);
    return savedOrder;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// Place Oredr
exports.placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.confirmOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.deliverOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);

    order.orderStatus = "DELIVERED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    await order.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

///  User Order History

exports.userOrderHistory = async (userId) => {
  try {
    // console.log("userHistory");
    const order = await Order.find({
      user: userId,
    })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      // lean()  This method call converts the query results into plain JavaScript objects rather than Mongoose documents. This can improve performance and reduce memory consumption, especially when you don't need the full functionality of Mongoose objects.
      .lean();

    return order;
  } catch (err) {
    console.log(error);
    throw new Error(err.message);
  }
};
//   GET ALL ORDERS
exports.getAllOrders = async () => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      //  lean tells to return a js object rather than mongodb docuemnt
      .lean();

    return orders;
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.deleteOrder = async (orderId) => {
  await Order.findByIdAndDelete(orderId);

  return "Order Deleted Successfully";
};
const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    //    in order Items also product
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};
exports.getOrderById = async (orderId) => {
  try {
    // console.log(orderId);
    const order = await Order.findById(orderId)
      .populate("user")
      //    in order Items also product
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");
    return order;
  } catch (err) {
    throw new Error(err.message);
  }
};
