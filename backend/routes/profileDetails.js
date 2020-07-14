const express = require('express');
const router = express.Router();
// const router = require('express-promise-router')();

const path = require("path");
const multer = require("multer");
let ProfileDetails = require('../models/profileDetails.model');
const Post = require('../models/post.model');
// const { post } = require('./post');

const storage = multer.diskStorage({
    destination: "./../public/ProfileImages/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 });

router.get('/',function(req,res){
    ProfileDetails.find()
    .then(profileDetails => res.json(profileDetails))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/', upload.single("media"), function(req,res){
    // const coverPic = req.file.filename;
    // const profilePic = req.file.filename;
    const coverPic = req.body.coverPic;
    const profilePic = req.body.profilePic;
    const name = req.body.name;
    const bio = req.body.bio;
    const username = req.body.username;
    const abouts = req.body.abouts;

    const newProfileDetails = new ProfileDetails({
        coverPic,
        profilePic,
        name,
        bio,
        username,
        abouts
    })

    newProfileDetails.save()
    .then(() => res.json('profileDetails added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:profileId',function(req,res){
    ProfileDetails.findById(req.params.profileId)
    .then(profileDetails => res.json(profileDetails))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:profileId',function(req,res){
    ProfileDetails.findByIdAndDelete(req.params.profileId)
    .then(profileDetails => res.json('profileDetails deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
    
})

router.patch('/:profileId', function(req,res){
    profileData = req.body
    ProfileDetails.findByIdAndUpdate(req.params.profileId,profileData)
    .then(profileDetails => res.json('profileDetails patched'))
    .catch(err => res.status(400).json('Error: ' + err));
})

// router.post('/update/:profileId',function(req,res){
//     ProfileDetails.findById(req.params.profileId)
//     .then(profileDetail =>{
//         profileDetail.coverPic = req.file.filename;
//         profileDetail.profilePic = req.file.filename;
//         profileDetail.name = req.body.name;
//         profileDetail.bio = req.body.bio;
//         profileDetail.username = req.body.username;

//         profileDetail.save()
//         .then(() => res.json('profileDetail updated'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
    
// })



//getting posts only only person with their profileId
// to be used for profile->timeline
router.get('/:profileId/userposts', function(req,res){
    ProfileDetails.findById(req.params.profileId).populate('userposts')
    .then(profile => res.json(profile.userposts))
    .catch(err => res.status(400).json('Error: ' + err));
    
})


//adding a new post will be saved in all posts 
//and in that profile's userpost also post will be saved
router.post('/:profileId/userposts', function(req,res){
    const newPost = new Post(req.body)
    ProfileDetails.findById(req.params.profileId)
    .then(foundProfile => {
        newPost.profileowner = foundProfile
        newPost.pic = foundProfile.profilePic
        newPost.username = foundProfile.username
        newPost.save()
        .then(() => res.json('newPost'))
        .catch(err => res.status(400).json('Error: ' + err));
        
        foundProfile.userposts.push(newPost)
        foundProfile.save()
        .then(() => res.json('post profile'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    // newPost.profileOwner = foundProfile
    // newPost.pic = foundProfile.profilePic
    // newPost.username = foundProfile.username
    // newPost.save()
    // foundProfile.userposts.push(newPost)
    // foundProfile.save()
    // .then(profileDetails => res.json('post added to profile',newPost))
    // .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;