const express = require('express')
const cartRoutes = express.Router()
const {addToCart ,  removeFromCart , getCart ,getCartTotal  ,cartLength  } = require('../controllers/cartController.js')
const authmiddleware = require('../middleware/auth.middleware.js')

cartRoutes.post("/addcart/:id" ,  authmiddleware , addToCart)
cartRoutes.get("/getcart" ,  authmiddleware , getCart)
cartRoutes.delete("/removecart/:productId" ,  authmiddleware , removeFromCart)
cartRoutes.get("/total" ,  authmiddleware , getCartTotal)
cartRoutes.get("/cartlength" ,  authmiddleware , cartLength )


module.exports = cartRoutes