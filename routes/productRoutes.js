const express = require('express')
const productRoutes = express.Router()
const {addproduct} = require('../controllers/productControllers.js')
const authmiddleware = require('../middleware/auth.middleware.js')
const roleMiddleware = require('../middleware/roleMiddleware.js')
const multer = require('multer')
const upload = multer({dest:'uploades/'})



productRoutes.post("/addproduct",  authmiddleware , roleMiddleware('admin') ,  upload.single('image'),addproduct)


module.exports = productRoutes