const express = require('express')
const adminRoutes = express.Router()
const {adminSignup  , adminLogin} = require('../controllers/adminAuthController.js')



adminRoutes.post("/signup" , adminSignup)
adminRoutes.post('/login' , adminLogin)



module.exports = adminRoutes