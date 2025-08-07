const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  address: {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    pincode: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true   },
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order" , orderSchema)
module.exports = Order