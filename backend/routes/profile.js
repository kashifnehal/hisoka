const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
let Profile = require('../models/profile.model');

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
    Profile.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', upload.single("media"), async function(req,res,next){
    const coverPic = req.file.filename;
    const profilePic = req.file.filename;
    const name = req.body.name;
    const bio = req.body.bio;
    const username = req.body.username;

    const newProfile = new Profile({
        coverPic,
        profilePic,
        name,
        bio,
        username
    })

    newProfile.save()
    .then(() => res.json('profile added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:id',function(req,res){
    Profile.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id',function(req,res){
    Profile.findByIdAndDelete(req.params.id)
    .then(profile => res.json('profile deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
    
})

router.post('/update/:id',function(req,res){
    Profile.findById(req.params.id)
    .then(profile =>{
        profile.coverPic = req.file.filename;
        profile.profilePic = req.file.filename;
        profile.name = req.body.name;
        profile.bio = req.body.bio;
        profile.username = req.body.username;

        profile.save()
        .then(() => res.json('profile updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
})

module.exports = router;