const express = require("express");
const app= express()
const bodyParser = require("body-parser")
let a,b;
function sum(a,b){
    a= parseInt(a)
    b= parseInt(b)
    return (a+b)
}
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.post("/addNumbers",(req,res)=>{
    a = Number(req.body);
    b = Number(req.body);
})
app.get("/addNumbers",(req,res)=>{
    let s=sum(a,b)
    res.send(s.toString())
})

app.listen(3000,()=>{
    console.log("server started at port 3000")
})