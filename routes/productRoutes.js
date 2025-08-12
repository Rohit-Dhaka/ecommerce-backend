const express = require('express')
const productRoutes = express.Router()
const {addproduct ,getallproduct ,deleteproduct ,getOneProduct} = require('../controllers/productControllers.js')
const authmiddleware = require('../middleware/auth.middleware.js')
const roleMiddleware = require('../middleware/roleMiddleware.js')
const multer = require('multer')
const upload = multer({dest:'uploades/'})



productRoutes.post("/addproduct",  authmiddleware , roleMiddleware('admin') ,  upload.single('image'),addproduct)
productRoutes.get("/getproduct",  authmiddleware , roleMiddleware('admin') ,  getallproduct)
productRoutes.delete("/deleteproduct/:id",  authmiddleware , roleMiddleware('admin') ,  deleteproduct)
productRoutes.get("/getOneProduct/:id",  authmiddleware , roleMiddleware('admin') ,  getOneProduct)


module.exports = productRoutes