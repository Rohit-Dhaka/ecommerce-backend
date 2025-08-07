const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    quantity:{
        type:Number,
        min:0
    }

})

const Cart = mongoose.model("Cart" , cartSchema)