import Order from "../models/Order.js";

async function getOrder(req, res) {
  try {
    const userId = req.user.id; 

    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get Order error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getOrder };
