const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
         required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
         required: true
    },
    method:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["success","pending","failed"]
    }
} ,{timestamps:true})


const Payment = mongoose.model("Payment" , paymentSchema)
module.exports = Payment