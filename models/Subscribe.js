import mongoose from "mongoose";


const subscribeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
})
const Subscribe = mongoose.model("Subscribe" , subscribeSchema)
export default Subscribe