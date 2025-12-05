import Address from "../models/Address.js";

export async function createAddress(req, res) {
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

    
    const newAddress = new Address({
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
      message: "✅ Address saved successfully",
    });
  } catch (error) {
    console.error("Error saving address:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
