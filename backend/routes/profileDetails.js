const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
let ProfileDetails = require('../models/profileDetails.model');

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

router.post('/add', upload.single("media"), async function(req,res,next){
    // const coverPic = req.file.filename;
    // const profilePic = req.file.filename;
    const coverPic = req.body.coverPic;
    const profilePic = req.body.profilePic;
    const name = req.body.name;
    const bio = req.body.bio;
    const username = req.body.username;
    const abouts = req.body.abouts

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

router.get('/:id',function(req,res){
    ProfileDetails.findById(req.params.id)
    .then(profileDetails => res.json(profileDetails))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id',function(req,res){
    ProfileDetails.findByIdAndDelete(req.params.id)
    .then(profileDetails => res.json('profileDetails deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
    
})

router.post('/update/:id',function(req,res){
    ProfileDetails.findById(req.params.id)
    .then(profileDetail =>{
        profileDetail.coverPic = req.file.filename;
        profileDetail.profilePic = req.file.filename;
        profileDetail.name = req.body.name;
        profileDetail.bio = req.body.bio;
        profileDetail.username = req.body.username;

        profileDetail.save()
        .then(() => res.json('profileDetail updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
})

module.exports = router;