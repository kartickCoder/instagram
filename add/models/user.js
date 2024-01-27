const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Fname:{
        type: String,
        required: true
    },
    Lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
})
mongoose.model("Usermodel",userSchema)