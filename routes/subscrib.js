import express from 'express'
const subscribRoutes = express.Router()
import {subscribeemail} from '../controllers/subscribeControllers.js'
import authmiddleware from '../middleware/auth.middleware.js'


subscribRoutes.post('/subscrib',authmiddleware,   subscribeemail)
export default subscribRoutes