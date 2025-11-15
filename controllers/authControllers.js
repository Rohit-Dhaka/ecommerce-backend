import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function usersignup(req, res) {
  try {
    const { name, email, password } = req.body;

    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(404).json({ message: "User already exists" });
    }

    const newuser = await User.create({ name, email, password });

    return res
      .status(201)
      .json({ message: "User signup successfully", newuser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function adminsignup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(404).json({ message: "Admin already exists" });
    }

    const newuser = await User.create({ name, email, password, role });

    return res
      .status(201)
      .json({ message: "Admin signup successfully", newuser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(404).json({ message: "Password wrong" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export  {
  usersignup,
  adminsignup,
  login,
};
