const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  size: {
    type: String,
    required: true,
    enum: ["s", "m", "l", "xl", "2xl"] // only allowed sizes
    
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
