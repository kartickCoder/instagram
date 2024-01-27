const express = require("express")
const mongoose = require("mongoose")
const route = express.Router()
const postModel = mongoose.model("post")
const Usermodel = mongoose.model("Usermodel")

const protectedRoute = require("../middlewares/check")

route.get("/postidfind", (req, res) => {
    console.log(req.body)
})

route.post("/createPost", protectedRoute, async (req, res) => {
    const { description, location, image } = req.body
    console.log(req.body)
    const userdata = await Usermodel.findById(req._id)
    if (!description || !location || !image) {
        res.status(400).json({ error: "one or more fields are empty" })
    }
    else {
        const postObj = await postModel.create({
            description,
            location,
            image,
            author: userdata
        })
        // res.status(200).json({success: "the post uploaded successfully"})
        res.send(postObj)

    }
})
route.get("/allposts", protectedRoute, async (req, res) => {
    try {
        const allpost = await postModel.find({})
            .populate("author", "_id name")
        res.status(200).send(allpost)
    } catch (e) {
        console.log(e)
    }
})
route.get("/myposts", protectedRoute, async (req, res) => {
    try {
        const mypost = await postModel.find({ author: req._id })
            .populate("author", "_id name")
        res.status(200).send(mypost)
    }
    catch (e) {
        console.log(e)
    }
})
route.delete("/deletepost/:postId", protectedRoute, async (req, res) => {
    try {
        const deletepost = await postModel.findOne({ _id: req.params.postId })
            .populate("author", "id email name")
        if (deletepost.author._id == req._id) {
            const deleted = await postModel.deleteOne({ _id: deletepost._id })
            res.send("post deleted")
        }
        else if (deletepost) {
            res.send("trying to get unauthorized access...")
        }
        else if (deletepost == "undefined") {
            res.send("post cant be found")
        }
    } catch (err) {
        res.send("post cant be found...")
    }
})
// route.put("/likes", protectedRoute, (req, res) => {
//     postModel.findByIdAndUpdate(req.body._id, {
//         $push: { likes: req.author._id }
//     },
//         {
//             new: true
//         }).exec((err, res) => {
//             if (err) {
//                 res.status(422).json({ error: err })
//             }
//             else {
//                 res.json(result)
//             }
//         })
// })
route.put("/unlike", protectedRoute, async(req, res) => {
    try{
        const unlikepost = await postModel.findByIdAndUpdate(req.body._id,{
            $pull: {likes: req._id}
        },{
            new: true
        })
        res.send(unlikepost)
    }catch(err){
        console.log(err)
    }
})
route.put("/like", protectedRoute, async(req, res) => {
    try{
        // const check_like = (id)=>{
        //     id==req._id
        // }
        console.log(req.body)
        const liked = await (await postModel.find({_id:req.body._id},{likes:1,_id:0})).at(0).likes
        console.log(liked)
        const likeId =await liked.includes(req._id)
        console.log(likeId)
        const likedpost= await postModel.find({likes:req.body._id})
        .populate("author","_id name email")
        console.log(likedpost)
        if(!likeId){
            const likepost = await postModel.findByIdAndUpdate(req.body._id,{
                $push: {likes: req._id}
            },{
                new: true
            })
            res.send(likepost)
        }else{
            res.send("you have already liked the post")
        }
    }catch(err){
        console.log(err)
    }
})
route.put("/comment",protectedRoute,async(req,res)=>{
    try{
        const comments = {commenttext: req.body.comment,commentedBy:req._id} 
        console.log(req.body.comments+"  "+req._id)
        console.log(req.body)
        const comment = await postModel.findByIdAndUpdate(req.body._id,{
            $push:{comments: comments}    
        },{new: true})
        .populate("author","_id name email")
        //.populate("comments.commentedBy","Fname email")
        res.send(comment)
    }catch(e){
        console.log(e)
    }
})
module.exports = route