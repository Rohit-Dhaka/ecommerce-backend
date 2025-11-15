import express from "express";
import {
  createAddress,
  getAllOrders,
  getUserOrders
} from "../controllers/deliveryControllers.js";
import {
  createRazorpayOrder,
  verifyPayment
} from "../controllers/paymetControllers.js";
import authmiddleware from "../middleware/auth.middleware.js";
import razorpay from "../config/razorpay.js";  

const deliveryRoutes = express.Router();

deliveryRoutes.post("/createaddress", authmiddleware, createAddress);
deliveryRoutes.post("/getuserOrders", authmiddleware, getUserOrders);
deliveryRoutes.post("/addpayment", authmiddleware, createRazorpayOrder);
deliveryRoutes.post("/verifypayment", authmiddleware, verifyPayment);


deliveryRoutes.get("/test-razorpay", (req, res) => {
  if (razorpay) {
    res.json({
      message: "Razorpay is configured and working!",
      keyId: process.env.RAZORPAY_KEY_ID,
      status: "ready",
    });
  } else {
    res.json({
      message: "Razorpay is not configured",
      status: "not_configured",
    });
  }
});

export default deliveryRoutes;
