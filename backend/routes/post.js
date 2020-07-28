const express = require('express');
const router = express.Router();
// const router = require('express-promise-router')();
const path = require("path");
const multer = require("multer");
let Post = require('../models/post.model');
let Comment = require('../models/comment.model')
const postController = require('../controllers/post')
const auth = require('../../backend/middleware/auth')


const storage = multer.diskStorage({
  destination: "./../public/images/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  // limits:{fileSize: 1000000},
});

//  const upload = multer();


router.get('/', auth, function (req, res) {
  Post.find().sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.post("/", upload.single("media"), function (req, res, next) {
//   console.log(req.file)
//   // const pic = req.body.pic;
//   // const username = req.body.username;
//   // const date = Date.parse(req.body.date);
//   const caption = req.body.caption;
//   const media = req.file.filename;
//   const likes = Number(req.body.likes);
//   const postPrivacy = req.body.postPrivacy

//   const newPost = new Post({
//     // pic,
//     // username,
//     caption,
//     media,
//     likes,
//     postPrivacy
//   });

//   newPost.save()
//     .then(() => res.json(newPost))
//     .catch(err => {
//       console.log(err)
//       res.status(400).json('Error: ' + err)
//     });
// });

router.get('/:id', function (req, res) {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', function (req, res) {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', function (req, res) {
  Post.findById(req.params.id)
    .then(post => {
      post.pic = req.body.pic;
      post.username = req.body.username;
      // post.date = Date.parse(req.body.date);
      post.caption = req.body.caption;
      post.media = req.file.filename
      post.likes = Number(req.body.likes)


      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// =====================

router.get('/:postId/comments', function (req, res) {
  Post.findById(req.params.postId).populate('comments')
    .then(post => res.json(post.comments))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/:postId/comments', auth, function (req, res) {
  // const newComment = new Comment(req.body)
  const text = req.body.text;
  const likes = req.body.likes;
  const username = req.body.username;
  const pic = req.body.pic;
  // if (typeof req.file === undefined) {
  //   item.image = "/uploads/no-img.png";
  // } else {
  //   item.image = "/uploads/" + req.file.filename;
  // }
  const newComment = new Comment({
    text,
    likes,
    username,
    pic
  });
  Post.findById(req.params.postId)
    .then(foundPost => {
      newComment.ofpost = foundPost
      // newComment.pic = foundPost.pic
      // newComment.username = foundPost.username
      newComment.save()
        .then(() => res.json(newComment))
        .catch(err => {
          console.log(err)
          res.status(400).json('Error: ' + err)
        });

      foundPost.comments.push(newComment)
      foundPost.save()
      // .then(() => res.json('comment pushed'))
      // .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

})

router.get('/profile', auth, (req, res) => {
  ProfileDetails.findById(req.profile.id)
    .select("-password")
    .then(profile => res.json(profile))
})


module.exports = router;