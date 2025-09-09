const razorpay = require("../config/razorpay.js");


const Payment =  require('../models/Payment.js')
const Delivery = require('../models/Delivery.js')

async function createRazorpayOrder(req, res) {
  try {
    const {  total } = req.body;
    const userId = req.user.id;

    if (!total) return res.status(400).json({ message: "Amount is required" });

    // amount in paise
    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save payment in DB with pending status
    const payment = new Payment({
      userId,
      
      amount,
      method: "Razorpay",
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    await payment.save();

    res.status(201).json({
      message: "Razorpay order created",
      order: razorpayOrder,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


async function verifyPayment(req, res) {
  try {
    const { paymentId, razorpayPaymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.razorpayPaymentId = razorpayPaymentId;
    payment.status = "success";
    await payment.save();

    // Update order as paid
    if (payment.orderId) {
      await Delivery.findByIdAndUpdate(payment.orderId, { paid: true, paymentStatus: "success" });
    }

    res.status(200).json({ message: "Payment verified successfully", payment });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { createRazorpayOrder ,verifyPayment };
