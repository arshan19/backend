const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const {} = require("../middlewares/isLoggedIn")

router.post("/signup" ,async(req, res) => {
    try{
        const{emailId, password, username} = req.body
        const flag = validator.isStrongPassword(password)
        if(!flag)
        {
            throw new Error("Please Enter a strong password")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.insertOne({username, emailId, password : hashedPassword})
        res.status(200).json({"msg" : "User registered successfully"})
    } catch(e)
    {
        res.status(400).json({"msg" : e.message})
    }
})

router.post("/login", async(req, res) => {

    try {
        const{username, password} = req.body
        const FoundUser = await User.findOne({username})
        const flag = await bcrypt.compare(password, FoundUser.password)
        if(flag)
        {
            const token = jwt.sign({_id : FoundUser._id}, process.env.JWT_SECRET, {
                expiresIn : "7d"
            })
            res.cookie("token", token)
            res.json({"msg" : "User logged in successfully"})
        }
        else
        {
            res.json({"msg" : "Invalid Credentials"})
        }
    } catch (error) {
        res.json({"error" : "Please enter all the fields"})
    }
    
})

router.get("/logout", async(req,res)=>{
    try {
        res.cookie("token",null)
        res.status(200).json({"msg": "user logged out"})
    } catch (error) {
        res.json({"msg": error.msg})
    }
})


module.exports = {
    authRouter : router
}