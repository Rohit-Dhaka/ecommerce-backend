import express from "express";
import { addproducts } from "../controllers/productControllers.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer upload folder
const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
});

const productsRoutes = express.Router();

productsRoutes.post("/addproducts", upload.array("images", 4), addproducts);

export default productsRoutes;
