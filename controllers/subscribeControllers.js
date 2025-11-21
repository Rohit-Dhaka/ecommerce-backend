import Subscribe from '../models/Subscribe.js'


async function subscribeemail (req,res){
    try{
        const {email} = req.body;
        console.log(email)
        const userId = req.user.id;
        console.log(userId)
        if(!email){
            return res.status(404).json({message:"email not found"})
        }
        const newemail = await Subscribe.create({email , userId  })
         return res.status(202).json({message:"Email subscribe successfully" })

    }
    catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}
export  {subscribeemail}
