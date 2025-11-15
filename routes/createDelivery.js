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

const deliveryRoutes = express.Router();

deliveryRoutes.post("/createaddress", authmiddleware, createAddress);
deliveryRoutes.post("/getuserOrders", authmiddleware, getUserOrders);
deliveryRoutes.post("/addpayment", authmiddleware, createRazorpayOrder);
// deliveryRoutes.post("/verify", authmiddleware, verifyPayment);

export default deliveryRoutes;
