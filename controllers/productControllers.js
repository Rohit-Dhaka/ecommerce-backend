const Product = require("../models/Product.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

async function addproduct(req, res) {
  try {
    const { title, description, price, size, category, subcategory, stock } = req.body;        
    if (
      !title ||
      !description ||
      !price ||
      !size ||
      !category ||
      !subcategory ||
      !stock
    ) {
      return res.status(400).json({ message: "All filed are requird" });
    }
    const resultes = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const newproduct = await Product.create({
      title,
      description,
      price,
      size,
      category,
      subcategory,
      stock,
      userId: req.user.id,
      imagesUrl: resultes.secure_url,
    });

    return res
      .status(201)
      .json({ message: "Product add successfully", newproduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async function getallproduct(req, res) {
  try {
    
    return res.status(200).json({ message: "product get successfully" });

 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { addproduct  ,getallproduct};
