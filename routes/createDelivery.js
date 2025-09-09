const express = require('express')
const deliveryRoutes = express.Router()
const {createAddress  , getAllOrders  , getUserOrders} = require('../controllers/deliveryControllers')
const {createRazorpayOrder ,verifyPayment} = require('../controllers/paymetControllers.js')
const authmiddleware = require('../middleware/auth.middleware')


deliveryRoutes.post("/createaddress" ,  authmiddleware ,  createAddress)
deliveryRoutes.post("/getuserOrders" ,  authmiddleware ,  getUserOrders)
deliveryRoutes.post("/addpayment" ,  authmiddleware ,  createRazorpayOrder)


module.exports = deliveryRoutes



