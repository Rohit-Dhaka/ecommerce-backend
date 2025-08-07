const express = require("express")
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 3000
const ConnectDB = require('./config/db.js')
const router = require('./routes/index.js')


app.use(express.json())
app.use(cors())
app.use('/api/v1' , router)




ConnectDB()
app.listen(PORT , () =>{
    console.log(`app listening on port ${PORT}`)
})
