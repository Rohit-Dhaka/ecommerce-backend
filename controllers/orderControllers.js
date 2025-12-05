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
async function updateOrder(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatus = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    
    if (!validStatus.includes(status)) {
      return res.status(400).json({ 
        message: "Invalid order status",
        allowedStatus: validStatus 
      });
    }

    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder  
    });

  } catch (error) {
    console.error("Update Order error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "title price imagesUrl");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
    

  } catch (error) {
    console.error("Get All Orders Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



export { getOrder , updateOrder , getAllOrders };
