import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

async function addproduct(req, res) {
  try {
    const { title, description, price, size, category, subcategory, stock } =
      req.body;
;

    if (
      !title ||
      !description ||
      !price ||
      !size ||
      !category ||
      !subcategory ||
      !stock
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const results = [];
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    for (const file of req.files) {
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });

      results.push(uploaded.secure_url);

      
      await fs.promises.unlink(file.path);
    }

    const sizesArray = Array.isArray(size)
      ? size
      : size.split(",").map((s) => s.trim());

    const newproduct = await Product.create({
      title,
      description,
      price,
      size: sizesArray,
      category,
      subcategory,
      stock,
      userId: req.user.id,
      imagesUrl: results,
    });

    return res.status(201).json({
      message: "Product added successfully",
      newproduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getallproduct(req, res) {
  try {
    const allproduct = await Product.find();

    return res.status(200).json({
      message: "Products fetched successfully",
      allproduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteproduct(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      deleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getOneProduct(req, res) {
  try {
    const id = req.params.id;
    const oneproduct = await Product.findById(id);

    if (!oneproduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      oneproduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function productesupdate(req, res) {
  try {
    const id = req.params.id;

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export  {
  addproduct,
  getallproduct,
  deleteproduct,
  getOneProduct,
  productesupdate,
};
