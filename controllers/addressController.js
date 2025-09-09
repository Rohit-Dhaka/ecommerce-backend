const Address = require('../models/Address.js')

async function createAddress(req, res) {
  try {
    const userId = req.user.id;
    console.log(userId)
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

    // // Save the address only
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

    res.status(201).json({
      message: "✅ Address saved successfully",
    //   address: newAddress,
    });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {createAddress}