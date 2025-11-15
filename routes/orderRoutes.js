import express from 'express'
import {getOrder} from '../controllers/orderControllers.js'
import authmiddleware from '../middleware/auth.middleware.js'
const orderRoutes = express.Router()

orderRoutes.get('/getorder' ,  authmiddleware , getOrder)
export default orderRoutes