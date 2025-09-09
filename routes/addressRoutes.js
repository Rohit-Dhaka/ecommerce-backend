const express = require('express')
const addressRotes = express.Router()
const {createAddress} = require('../controllers/addressController.js')
const authmiddleware = require('../middleware/auth.middleware.js')


addressRotes.post('/addaddress' , authmiddleware ,  createAddress)


module.exports  = addressRotes