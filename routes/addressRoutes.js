import express from "express";
import { createAddress } from "../controllers/addressController.js";
import authmiddleware from "../middleware/auth.middleware.js";

const addressRoutes = express.Router();

addressRoutes.post("/addaddress", authmiddleware, createAddress);

export default addressRoutes;
