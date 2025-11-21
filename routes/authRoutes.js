import express from "express";
import { signup, login, getUser , getAllUsers } from "../controllers/userControllers.js";
import authmiddleware from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/getuser", authmiddleware, getUser);
authRoutes.get("/getalluser", authmiddleware, getAllUsers);

export default authRoutes;
