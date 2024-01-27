const express = require("express")
const route = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checker = require("../middlewares/check")
require("../models/user")
const User = mongoose.model("Usermodel")

route.get("/",(req,res)=>{
    res.send("it is the home page..................")
})
route.post("/signup",async(req,res)=>{
    const {Fname,Lname,phone,email,password} = req.body;
    if(!Fname || !Lname || !email || !password || !phone){
        res.status(422).json({error: "kindly fill all the mandetory fields"})
    }
    else{
        try{
            const datacollected = await User.findOne({email:email})
            if(datacollected){
                res.send("this email id already exists")
            }
            else{
                const password_save = await bcrypt.hash(req.body.password,10)
                User.create({
                    phone: req.body.phone,
                    Fname: req.body.Fname,
                    Lname: req.body.Lname,
                    email: req.body.email,
                    password: password_save

                })
                res.status(200).send("successfully added...")
            }
        }catch(e){
            console.log(e)
        }
    }
})
route.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const userEmail = await User.findOne({email})
    console.log(userEmail)
    if(userEmail){
        try{
            const password_check =await bcrypt.compare(password,userEmail.password)
            console.log(password_check)
            if(password_check){
                const token = jwt.sign({email:email,_id:userEmail._id},"ilovetoeatanddrink",{
                    expiresIn: "1h"
                })
                const userInfo = {_id:userEmail._id,email:userEmail.email}
                try{
                    const jwet = res.cookie('jwt',token,{httpOnly: true,secure: false,maxAge:120000})
                }catch(e){
                    console.log(e)
                }
                res.status(200).json({mydata:{token:token,userInfo:userInfo}})
            }
            else{
                res.status(422).send("invalid credentials")
            }
        }catch(e){
            console.log(e)
        }
    }
    else{
        res.status(422).send("invalid credentials")
    }
})
route.get("/post",checker,(req,res)=>{
    res.send("view posts")
})

module.exports = route