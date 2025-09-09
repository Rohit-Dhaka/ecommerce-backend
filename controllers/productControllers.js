const Product = require("../models/Product.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

async function addproduct(req, res) {
  try {
    const { title, description, price, size, category, subcategory, stock } =
      req.body;
      console.log( title, description, price, size, category, subcategory, stock )
      console.log(req.files)

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
      : size
      ? size.split(",").map((s) => s.trim())
      : [];

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

    return res
      .status(201)
      .json({ message: "Product added successfully", newproduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getallproduct(req, res) {
  try {
    const allproduct = await Product.find();
    if (!allproduct) {
      return res.status(404).json({ message: "product not found" });
    }

    return res
      .status(200)
      .json({ message: "product get successfully", allproduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteproduct(req, res) {
  try {
    const id = req.params.id;
    const deleteproduct = await Product.findByIdAndDelete(id);
    if (!deleteproduct) {
      return res.status(404).json({ message: "product not delete" });
    }

    return res
      .status(200)
      .json({ message: "product delete successfully", deleteproduct });
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
      return res.status(200).json({ message: "productes found successfully" });
    }

    return res
      .status(200)
      .json({ message: " one product get successfully", oneproduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function productesupdate(req, res) {
  try {
    const updateFields = req.body;
    const id = req.params.id;

    const updateproductes = await Product.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updateproductes) {
      return res.status(400).json({ message: "Productes not found" });
    }

    return res.status(200).json({ message: " product update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addproduct,
  getallproduct,
  deleteproduct,
  getOneProduct,
  productesupdate,
};
