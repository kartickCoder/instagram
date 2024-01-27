const express = require("express")
const route = express.Router()
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req,file,cb)=>{
        if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg")
            cb(null,true)
        else{
            cb(null,false)
            return res.status(400).json({error: "only .png .jpg .jpeg files are allowed"})
        }
    }
})
route.post("/uploadpost",upload.single("file"),(req,res)=>{
    res.json({"fileName": req.file.filename})
})
const downloadfile = (req,res)=>{
    const filename = req.params.filename;
    const path = __basedir + "/uploads/";
    console.log(__basedir)
    res.download(path+filename,(error)=>{
        if(error){
            res.status(500).send({message: "file cannot be downloaded"+error})
        }
    })
}
route.get("/files/:filename",downloadfile)
module.exports = route