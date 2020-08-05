const express = require('express');
const router = express.Router();
// const router = require('express-promise-router')();
const path = require("path");
const multer = require("multer");
let Post = require('../models/post.model');
let Comment = require('../models/comment.model')
let ProfileDetails = require('../models/profileDetails.model')
const postController = require('../controllers/post')
const auth = require('../../backend/middleware/auth');
const { populate } = require('../models/profileDetails.model');



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
  Post.find().populate("profileowner").sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});


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
      post.likeCount = Number(req.body.likeCount)


      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// =====================

router.get('/:postId/comments', function (req, res) {
  Post.findById(req.params.postId).populate({ path: 'comments', populate: { path: 'profileowner' } })
    .then(post => res.json(post.comments))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/:profileId/:postId/comments', auth, function (req, res) {
  // const newComment = new Comment(req.body)
  const text = req.body.text;
  const likeCount = req.body.likeCount;
  const username = req.body.username;
  const pic = req.body.pic;
  // if (typeof req.file === undefined) {
  //   item.image = "/uploads/no-img.png";
  // } else {
  //   item.image = "/uploads/" + req.file.filename;
  // }
  const newComment = new Comment({
    text,
    likeCount,
    username,
    pic
  });
  Post.findById(req.params.postId)
    .then(foundPost => {
      newComment.ofpost = foundPost
      // newComment.pic = foundPost.pic
      // newComment.username = foundPost.username
      ProfileDetails.findById(req.params.profileId)
        .then(foundProfile => {
          newComment.profileowner = foundProfile

          newComment.save()
            .then(() => res.json(newComment))
            .catch(err => {
              console.log(err)
              res.status(400).json('Error: ' + err)
            });
          foundProfile.commentsdone.push(newComment)
          foundProfile.save()
        })

      // newComment.save()
      //   .then(() => res.json(newComment))
      //   .catch(err => {
      //     console.log(err)
      //     res.status(400).json('Error: ' + err)
      //   });

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

router.patch('/:postId', function (req, res) {
  newLikeCount = {
    likeCount: req.body.newLikeCount
  }
  Post.findByIdAndUpdate(req.params.postId, newLikeCount)
    .then(postDetails => res.json('likes patched'))
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;