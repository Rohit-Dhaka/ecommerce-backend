import mongoose from 'mongoose'
import dotenv  from 'dotenv'
dotenv.config();


 const ConnectDB = async function (t){
    try{
        await mongoose.connect(process.env.MONGODB_URL).then(() =>{
            console.log("App connect to database")
        })

    }
    catch(error){
        process.exit(1)
    }
}

export default ConnectDB
