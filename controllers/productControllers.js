const Product = require("../models/Product.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

async function addproduct(req, res) {
  try {
    const { title, description, price, size, category, subcategory, stock } =
      req.body;
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
    const deleteproduct = await Product.findByIdAndDelete(id)
    if(!deleteproduct){
        return res.status(404).json({message:"product not delete"})
    }


    return res
      .status(200)
      .json({ message: "product delete successfully" ,deleteproduct});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function getOneProduct(req, res) {
  try {
   
    const id = req.params.id;
    const oneproduct =  await Product.findById(id)
    if(!oneproduct){
        return res.status(200).json({message:"productes found successfully"})
    }


    return res
      .status(200)
      .json({ message: " one product get successfully" , oneproduct});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async function productesupdate(req, res) {
  try {

    const updateFields  = req.body
    const id = req.params.id;


      const updateproductes = await Product.findByIdAndUpdate(id, { $set: updateFields} , {new:true})
    
      if(!updateproductes){
        return res.status(400).json({message:"Productes not found"})
      }
   


    return res
      .status(200)
      .json({ message: " product update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = { addproduct, getallproduct ,deleteproduct ,getOneProduct ,productesupdate };
