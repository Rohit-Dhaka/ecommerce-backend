const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes.js')
const adminRoutes = require('./adminRoutes.js')

router.use('/auth' , authRoutes)
router.use('/admin' , adminRoutes)


module.exports = router