import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// -------------------------------------------
// User Signup
// -------------------------------------------
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newuser = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User signup successfully",
      newuser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// -------------------------------------------
// User Login
// -------------------------------------------
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Password is wrong" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "User login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// -------------------------------------------
// Get Logged-in User
// -------------------------------------------
async function getUser(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
}

// -------------------------------------------
// EXPORT AS OBJECT
// -------------------------------------------
export  {
  signup,
  login,
  getUser,
};
