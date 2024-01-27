const express = require("express")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const postman = require("postman")
const { default: mongoose } = require("mongoose")
const Usermodel = mongoose.model("Usermodel")
const app = express()
app.use(cookieParser())
app.use(express.json())
const checker = async(req,res,next)=>{
    const {authorization} = req.headers
    console.log(req.headers)
    try{
        console.log(authorization.split(" ")[1])
        const decode = jwt.verify(authorization.split(" ")[1], "ilovetoeatanddrink")
        if(decode){
            const {email,_id}=jwt.decode(authorization.split(" ")[1])
            req._id=_id
            req.email=email
            console.log(jwt.decode(authorization.split(" ")[1]))
            next()
        }
        else{
            next("authentication failed")
        }
    }catch(error){
        next(error)
    }
}
module.exports = checker