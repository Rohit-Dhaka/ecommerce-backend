const User = require("../models/User.js")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authmiddleware = async function (req,res,next){
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({message:"token not found"})

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        next();

    }
    catch(error){

    }
}

module.exports = authmiddleware