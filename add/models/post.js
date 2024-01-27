const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const postSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },  
    location:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    likes:[
        {
            type: ObjectId,
            ref: "Usermodel"
        }
    ],
    comments:[
        {
            commenttext: String,
            commentedBy: {type: ObjectId, ref: "Usermodel"}
        }
    ],
    author:{
        type: ObjectId,
        ref: "Usermodel"
    }
})
mongoose.model("post",postSchema)