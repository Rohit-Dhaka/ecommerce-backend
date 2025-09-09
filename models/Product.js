const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true,
        minlength:3
    },
    description:{
        type:String,
        required:true,
        trim: true,        
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    imagesUrl:{
        type:[String],
        required:true
    },
    size:{
        type:[String],
        required:true,
        enum:['s' , 'm' , 'l','xl' , '2xl']
    },
    category:{
        type:[String],
        required:true,
        enum:[ 'Men' , 'Women' ,'Kids']
    },
    subcategory:{
        type:[String],
        required:true,
        enum:['Topwear' ,'Bottomwear' ,'Winterwear']
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",

    }
},{timestamps: true})

const Product = mongoose.model("Product" , productSchema)
module.exports = Product