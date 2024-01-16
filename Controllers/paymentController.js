const catchAsync = require("../utils/catchAsync");
const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

// console.log(process.env);
const stripe = Stripe(
  "sk_test_51NpY69GSX0P2ssktcadDVo5jJ6DxPV3nmPM91CNwjAvfIsUa9PLeRCx8gASIa4kxlghH0hUPE2ZHsmcaWogvTQyg00r5xo4lqG"
  // process.env.STRIPE_SECRETKEY
);
const Order = require("../Model/orderModel");

exports.getCheckoutSession = async (req, res) => {
  try {
    // console.log(req);
    const order = await Order.findById(req.body.id).populate({
      path: "orderItems",
      populate: { path: "product" },
    });
    order.orderStatus = "CONFIRMED";
    order.paymentDetails.paymentStatus = "PAID";

    await order.save();
    // console.log(order);

    const pricePKR = order.totalPrice - order.totalDiscountPrice;
    const exchangeRate = 0.0039;
    const priceUSD = pricePKR * exchangeRate;
    const priceUSDInCents = priceUSD.toFixed(2) * 100;

    // console.log(process.env.STRIPE_SECRETKEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // success_url: `${req.protocol}://localhost:5173/account/order`,
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get(
        "host"
      )}/checkout?step=3&order_id=${req.body.id}}`,
      customer_email: req.user.email,
      client_reference_id: req.params.orderId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: priceUSDInCents,
            product_data: {
              name: "AL Syed Ecommerce Store",
            },
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      url: session.url,
      session,
    });
  } catch (err) {
    console.log(err);
  }
};
