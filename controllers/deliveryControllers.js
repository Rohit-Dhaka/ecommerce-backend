const Delivery = require("../models/Delivery.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

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

    // Validate required fields
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

    // Save the address only
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

    res.status(201).json({
      message: "✅ Address saved successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}




async function getAllOrders (req, res) {
  try {
    const orders = await Delivery.find()
      .populate("userId", "name email")   // user की info भी दिखा सकते हो
      .populate("cartItems.productId", "title price"); // product की info

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get orders by User ID
async function getUserOrders (req, res)  {
  try {
     const userId = req.user.id;

    const orders = await Delivery.find({ userId })
      .populate("cartItems.productId", "title price");

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createAddress  ,getAllOrders  , getUserOrders };
