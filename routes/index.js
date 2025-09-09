const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes.js')
const adminRoutes = require('./adminRoutes.js')
const productRoutes = require('./productRoutes.js')
const deliveryRoutes = require('./createDelivery.js')
const cartRoutes = require('./cartRoutes.js')
const addressRotes = require('./addressRoutes.js')


router.use('/auth' , authRoutes)
router.use('/admin' , adminRoutes)
router.use('/products' , productRoutes)
router.use('/cart' , cartRoutes)
router.use('/delivery' , deliveryRoutes)
router.use('/address' , addressRotes)


module.exports = router