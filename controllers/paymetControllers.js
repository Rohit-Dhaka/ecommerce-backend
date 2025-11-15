import razorpay from "../config/razorpay.js";
import Payment from "../models/Payment.js";
import Delivery from "../models/Delivery.js";
import Order from "../models/Order.js";
import Cart from '../models/Cart.js'

async function createRazorpayOrder(req, res) {
  try {
    const { total } = req.body;
    const userId = req.user.id;

    if (!total) {
      return res.status(400).json({ message: "Amount is required" });
    }

  
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    
    const formattedItems = cartItems.map(item => ({
      productId: item.productId._id,
      name: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.imagesUrl[0] || null, 
    }));


    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

  
    const payment = new Payment({
      userId,
      amount: total,
      method: "Razorpay",
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    await payment.save();

  
    const order = new Order({
      userId,
      items: formattedItems,
      amount: total,
      paymentId: payment._id,
      orderId: razorpayOrder.id,
      status: "pending",
    });

    await order.save();

    return res.status(201).json({
      message: "Razorpay order created successfully",
      paymentorder: razorpayOrder,
      order,
      paymentId: payment._id,
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


async function verifyPayment(req, res) {
  try {
    const { paymentId, razorpayPaymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.status = "success";
    await payment.save();

    
    if (payment.orderId) {
      await Delivery.findByIdAndUpdate(payment.orderId, {
        paid: true,
        paymentStatus: "success",
      });
    }

    return res.status(200).json({
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export  {
  createRazorpayOrder,
  verifyPayment,
};
