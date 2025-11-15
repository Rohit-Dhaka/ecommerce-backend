import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  getCartTotal,
  cartLength,
} from "../controllers/cartController.js";
import authmiddleware from "../middleware/auth.middleware.js";

const cartRoutes = express.Router();

cartRoutes.post("/addcart/:id", authmiddleware, addToCart);
cartRoutes.get("/getcart", authmiddleware, getCart);
cartRoutes.delete("/removecart/:productId", authmiddleware, removeFromCart);
cartRoutes.get("/total", authmiddleware, getCartTotal);
cartRoutes.get("/cartlength", authmiddleware, cartLength);

export default cartRoutes;
