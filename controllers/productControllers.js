const Product = require('../models/Product.js')


async function addproduct (req,res){
    try{
        

        return res.status(201).json({message:"Product add successfully"})

    }
    catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}


module.exports = {addproduct}