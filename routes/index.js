const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes.js')
const adminRoutes = require('./adminRoutes.js')
const productRoutes = require('./productRoutes.js')

router.use('/auth' , authRoutes)
router.use('/admin' , adminRoutes)
router.use('/products' , productRoutes)


module.exports = router