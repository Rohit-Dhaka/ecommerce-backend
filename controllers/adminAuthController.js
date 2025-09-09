const User = require('../../server/models/User.js')
const bcrypt  = require('bcrypt');
const generateToken = require('../utils/generateToken.js');


async function adminSignup(req,res){
    try{
        const {name , email, password } =  req.body;


        if(!name || !email || !password ){
            return res.status(400).json({message:"all filed are required"})
        }
        const isExists = await User.findOne({email})
        if(isExists){
            return res.status(400).json({message:"admin already  exists"})
        }
        const existingAdmin  = await User.findOne({role :'admin'})
        if(existingAdmin){
            return res.status(400).json({message:'admin already exists'})
        }
        const saveadmin = await User.create({name , email , password , role: 'admin'})
        return res.status(201).json({message:"Admin signup successfully" ,saveadmin})
    }
    catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}

async function adminLogin(req,res){
    try{

        const { email, password }  = req.body;
        if(!email || !password ){
            return res.status(404).json({message:"all filed are required"})
        }
        const user = await  User.findOne({email})
        if(!user){
            return res.status(400).json({ message: "email not match" })
        }

           if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied: Not an admin" });
        }
        const isPassword =  await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(400).json(400).json({message:"password wrong"})
        }
        const token = generateToken(user._id)
        return res.status(201).json({message:"Admin login successfully" , token})
    }
    catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {adminSignup  , adminLogin}