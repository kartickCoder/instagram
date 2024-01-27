const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()
app.use(cors())
require("./models/user")
require("./models/post")

const auth_route = require("./routes/auth")
const post_route = require("./routes/post_route")
const file_route = require("./routes/file_route")
const { urlencoded } = require("body-parser")
global.__basedir = __dirname
require("./db/conn")
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(auth_route)
app.use(post_route)
app.use(file_route)
app.listen(2000,()=>{
    console.log("the server is connected at port number 2000")
})