const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
let Post = require('../models/post.model');

const storage = multer.diskStorage({
    destination: "./../public/images/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 });
 
//  const upload = multer();


//  router.post("/upload", {
//     upload(req, res) {
//     //    console.log("Request ---", req.body);
//     //    console.log("Request file ---", req.file);//Here you get file.
//        /*Now do where ever you want to do*/
//        if(!err)
//           return res.send(200).end();
//     }
//  })

router.get('/',function(req, res) {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", upload.single("media"), async function(req,res,next){
    console.log(req.file)
    const pic = req.body.pic;
    const name = req.body.name;
    const date = Date.parse(req.body.date);
    const caption = req.body.caption;
    const media = req.file.filename;
    const likes = Number(req.body.likes)

  const newPost = new Post({
    pic,
    name,
    date,
    caption,
    media,
    likes
  });

  newPost.save()
  .then(() => res.json('Post added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', function(req, res) {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', function(req, res) {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', function(req, res) {
  Post.findById(req.params.id)
    .then(post => {
        post.pic = req.body.pic;
        post.name = req.body.name;
        post.date = Date.parse(req.body.date);
        post.caption = req.body.caption;
        post.media = req.body.media
        post.likes = Number(req.body.likes)

      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;