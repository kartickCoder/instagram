const mongoose = require("mongoose")

const mongo = ()=>{
        mongoose.connect("mongodb://localhost:27017/instagram_clone")
        .then(()=>{
            console.log("database connected...")
        })
        .catch((error)=>{
            console.log("not connecting..."+error)
        })
}
mongo()
module.exports = mongo;