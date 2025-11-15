import express from "express";
import { adminSignup, adminLogin } from "../controllers/adminAuthController.js";

const adminRoutes = express.Router();

adminRoutes.post("/signup", adminSignup);
adminRoutes.post("/login", adminLogin);

export default adminRoutes;
