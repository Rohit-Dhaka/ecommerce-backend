import express from "express";
import { signup, login, getUser } from "../controllers/userControllers.js";
import authmiddleware from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/getuser", authmiddleware, getUser);

export default authRoutes;
