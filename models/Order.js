import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
         image: { type: String }
    },
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" }, 
  paymentId: { type: String },
  orderId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
