import express from "express";
import {
  addproduct,
  getallproduct,
  deleteproduct,
  getOneProduct,
  productesupdate
} from "../controllers/productControllers.js";
import authmiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const productRoutes = express.Router();

productRoutes.post(
  "/addproduct",
  authmiddleware,
  roleMiddleware("admin"),
  upload.array("images", 10),
  addproduct
);

productRoutes.get("/getproduct", getallproduct);

productRoutes.delete(
  "/deleteproduct/:id",
  authmiddleware,
  roleMiddleware("admin"),
  deleteproduct
);

productRoutes.get("/getOneProduct/:id", getOneProduct);

productRoutes.put(
  "/productesupdate/:id",
  authmiddleware,
  roleMiddleware("admin"),
  productesupdate
);

export default productRoutes;
