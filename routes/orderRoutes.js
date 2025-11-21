import express from 'express'
import {getOrder , updateOrder , getAllOrders} from '../controllers/orderControllers.js'
import authmiddleware from '../middleware/auth.middleware.js'
const orderRoutes = express.Router()

orderRoutes.get('/getorder' ,  authmiddleware , getOrder)
orderRoutes.put('/updateOrder/:orderId'  , updateOrder)
orderRoutes.get('/getallorder'  ,   authmiddleware , getAllOrders)
export default orderRoutes