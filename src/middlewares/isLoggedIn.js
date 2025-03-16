const jwt = require("jsonwebtoken")
const {User} = require("../models/user")

const isLoggedIn = async(req,res,next)=>{
    
    try {
        const {token} = req.cookies
        const obj = await jwt.verify(token,process.env.JWT_SECRET)
        const foundUser = await User.findOne({_id:obj._id})
    
        if(!foundUser){
            throw new Error("Please Login");
            
        }
        req.User = foundUser
        req.ID = obj._id
        next()
        
    } catch (error) {
        res.json({"msg":"please login"})
    }
}

module.exports = {
    isLoggedIn
}