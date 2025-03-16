const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        trim: true,
        minLength:2,
        maxLength: 15,

    },
    lastName:{
        type : String,
        trim: true,
        minLength:2,
        maxLength: 15,
    },
    email:{
        type : String,
        trim:true,
        required: true,
        lowercase: true,
        unique:true,
        minLength:10,
        maxLength:40,
        validate(val)
        {
            let flag = validator.isEmail(val)
            if(!flag){
                throw new Error("please enter a valid email!");
                
            }
        }
    },
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        minLength:6,
        maxLength:15
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:8
    },
    DOB :{
        type: String,
        trim:true,
        validate(val){
            const flag = validator.isDate(val)
            if(!flag){
                throw new Error("please enter valid Date of Birth");
                
            }
        }
    },
    interest : [],

},{timestamps: true})

const User = mongoose.model("User",userSchema)

module.exports = {User}