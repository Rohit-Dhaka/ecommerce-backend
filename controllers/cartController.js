import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const { size, quantity } = req.body;

    // Product exists?
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Size valid?
    if (!product.size.includes(size)) {
      return res
        .status(400)
        .json({ message: "Selected size is not available for this product" });
    }

    // Check existing cart item
    let cartItem = await Cart.findOne({ userId, productId, size });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem });
    } else {
      const newCartItem = new Cart({
        userId,
        productId,
        size,
        quantity: quantity || 1,
      });
      await newCartItem.save();
      return res
        .status(201)
        .json({ message: "Product added to cart", newCartItem });
    }
  } catch (error) {
    console.log("Add to cart error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCart(req, res) {
  try {
    const userId = req.user.id;

    const cart = await Cart.find({ userId }).populate("productId").exec();

    if (!cart || cart.length === 0) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const deletedItem = await Cart.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCartTotal(req, res) {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId }).populate("productId");

    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    return res.status(200).json({
      subtotal,
      shipping,
      total,
    });
  } catch (error) {
    console.error("Get cart total error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function cartLength(req, res) {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId });

    res.status(200).json({ length: cartItems.length });
  } catch (error) {
    console.log("Cart length error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export  {
  addToCart,
  removeFromCart,
  getCart,
  getCartTotal,
  cartLength,
};
