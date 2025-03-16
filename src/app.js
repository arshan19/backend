const express = require("express")
const {authRouter} = require('./Routes/authRoutes')
const {connectDB} = require('./config/DB')
const app = express()
require('dotenv').config()
const {profileRouter} = require('./Routes/profileRoutes')
const cookieParser = require('cookie-parser')

connectDB()
.then(()=>{
    console.log("DB connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server is runing on ${process.env.PORT}`); 
    }) 
})
.catch((error)=>{
    console.log(error);
    
})

app.use(express.json())
app.use(cookieParser())
app.use('/auth',authRouter)
app.use('/profile',profileRouter)
