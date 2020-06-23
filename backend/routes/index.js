const express = require('express');
const router = express.Router();
const multer = require('multer')
let Post = require('../models/post.model');

const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

router.get('/',function(req,res,next){
    res.render("index",{title:"Express"})
})

const upload = multer();
router.post("/add", upload.single("file"),async function(req,res,next){
    console.log(req.file)
    const {
        file,
        body:{name}
    } = req;

    if(file.detectedFileExtension != ".jpg") next(new Error("invalid file type"))
    const fileName = name + Math.floor(Math.random * 1000) + file.detectedFileExtension;
    await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../public/images/${fileName}`)
    )

    res.send("file uploaded as" + fileName)

})


module.exports = router;