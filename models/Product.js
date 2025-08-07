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
    stock:{
        type:Number,
        required:true,
        min:0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",

    }
},{timestamps: true})

const Product = mongoose.model("Product" , productSchema)