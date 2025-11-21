import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import addressRoutes from "./addressRoutes.js";
import deliveryRoutes from "./deliveryRoutes.js";
import orderRoutes from './orderRoutes.js'
import subscribRoutes from './subscrib.js'

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/address", addressRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/order", orderRoutes);
router.use("/subscrib", subscribRoutes);

export default router;
