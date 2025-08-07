const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const generateToken  = require("../utils/generateToken.js")


async function signup (req,res){
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fieds are required"})
        }

        const isExists = await User.findOne({email})
        if(isExists){
            return res.status(400).json({message:"User already exists"})
        }
        const newuser = await User.create({name, email, password})        
        return res.status(201).json({message:"User signup successfully" ,newuser})

    }
    catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}
async function login (req,res){
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All filed are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"email not found"})
        }
        const isPassword = await bcrypt.compare(password , user.password)
        if(!isPassword){
            return res.status(401).json({message:"Password are wrong"})
        }
        const token = generateToken(user._id)
        return res.status(200).json({message:"User login successfully" ,token})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {signup , login}