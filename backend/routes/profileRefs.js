const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const path = require("path");
const multer = require("multer");

// ============================  NOT USING ===============================

let About = require('../models/about.model')
let ProfileDetails = require('../models/profileDetails.model')
let Post = require('../models/post.model');

const storage = multer.diskStorage({
    destination: "./../public/images/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    // limits:{fileSize: 1000000},
 });


// router.post('/:profileId/about', function(req,res){

//     const newAbout = new About(req.body)
//     ProfileDetails.findById(req.params.profileId)
//     .then(foundUser => {
//         foundUser.abouts.push(newAbout)
//         foundUser.save()
//         .then(() => res.json('both updated'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));

//     // ,function(err,savedAbout){
//     //     ProfileDetails.findOne({username:"cool"},function(err,foundProfileDetails){
//     //         if(err){
//     //             console.log(err);
//     //         } else {
//     //             foundProfileDetails.abouts.push(savedAbout)
//     //             foundProfileDetails.save()
//     //             .then(() => res.json('both added'))
//     //             .catch(err => res.status(400).json('Error: ' + err));
//     //         }
//     //     })
//     // }

//     // router.post('/update/:id',function(req,res){
//     //     ProfileDetails.findById(req.params.id)
//     //     .then(profileDetail =>{
//     //         profileDetail.coverPic = req.file.filename;
//     //         profileDetail.profilePic = req.file.filename;
//     //         profileDetail.name = req.body.name;
//     //         profileDetail.bio = req.body.bio;
//     //         profileDetail.username = req.body.username;
    
//     //         profileDetail.save()
//     //         .then(() => res.json('profileDetail updated'))
//     //         .catch(err => res.status(400).json('Error: ' + err));
//     //     })
//     //     .catch(err => res.status(400).json('Error: ' + err));
        
//     // })

//     // newAbout.save()
//     // .then(() => res.json('about added'))
//     // .catch(err => res.status(400).json('Error: ' + err));
// })
// router.post("/addpost", upload.single("media"), function(req,res){
//     console.log(req.file)
//     const pic = req.body.pic;
//     const name = req.body.name;
//     // const date = Date.parse(req.body.date);
//     const caption = req.body.caption;
//     const media = req.file.filename;
//     const likes = Number(req.body.likes)

//   const newPost = new Post({
//     pic,
//     name,
//     // date,
//     caption,
//     media,
//     likes
//   });

//   ProfileDetails.findOne({username:'forpost'})
//     .then(foundUser => {
//         foundUser.userposts.push(newPost)
//         foundUser.save()
//         .then(() => res.json('post updated in user profile'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));

// })

module.exports = router;
