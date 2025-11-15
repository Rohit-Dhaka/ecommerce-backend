import Delivery from "../models/Delivery.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


async function createAddress(req, res) {
  try {
    const userId = req.user.id;

    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      zip,
      country,
      streetAddress,
    } = req.body;

    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !zip ||
      !country ||
      !streetAddress
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const newAddress = new Delivery({
      userId,
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      zip,
      country,
      streetAddress,
    });

    await newAddress.save();

    return res.status(201).json({
      message: "Address saved successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Error saving address:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}


async function getAllOrders(req, res) {
  try {
    const orders = await Delivery.find()
      .populate("userId", "name email")
      .populate("cartItems.productId", "title price");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

async function getUserOrders(req, res) {
  try {
    const userId = req.user.id;

    const orders = await Delivery.find({ userId }).populate(
      "cartItems.productId",
      "title price"
    );

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


export  {
  createAddress,
  getAllOrders,
  getUserOrders,
};
