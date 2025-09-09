const express = require('express')
const productRoutes = express.Router()
const {addproduct ,getallproduct ,deleteproduct ,getOneProduct ,productesupdate} = require('../controllers/productControllers.js')
const authmiddleware = require('../middleware/auth.middleware.js')
const roleMiddleware = require('../middleware/roleMiddleware.js')
const multer = require('multer')
const upload = multer({dest:'uploads/'})



productRoutes.post("/addproduct",  authmiddleware , roleMiddleware('admin') ,  upload.array('images' ,10),addproduct)
productRoutes.get("/getproduct"  ,  getallproduct)
productRoutes.delete("/deleteproduct/:id",  authmiddleware , roleMiddleware('admin') ,  deleteproduct)
productRoutes.get("/getOneProduct/:id",  authmiddleware  ,  getOneProduct)
productRoutes.put("/productesupdate/:id",  authmiddleware , roleMiddleware('admin') ,  productesupdate)


module.exports = productRoutes



