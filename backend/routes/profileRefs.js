const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

let About = require('../models/about.model')
let ProfileDetails = require('../models/profileDetails.model')


router.post('/add',async function(req,res,next){
    const email = req.body.email;
    const relationship = req.body.relationship;
    const phone = Number(req.body.phone);
    const university = req.body.university;
    const college = req.body.college;
    const course = req.body.course;
    const batchFrom = Date.parse(req.body.batchFrom);
    const batchTo = Date.parse(req.body.batchTo);
    const crush = req.body.name;
    const bunkMates = req.body.name;

    const newAbout = new About({
        email,
        relationship,
        phone,
        university,
        college,
        course,
        batchFrom,
        batchTo,
        crush,
        bunkMates
    })
    ProfileDetails.findOne({username:'cool'})
    .then(foundUser => {
        foundUser.abouts.push(newAbout)
        foundUser.save()
        .then(() => res.json('both updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));


    
    
    // ,function(err,savedAbout){
    //     ProfileDetails.findOne({username:"cool"},function(err,foundProfileDetails){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             foundProfileDetails.abouts.push(savedAbout)
    //             foundProfileDetails.save()
    //             .then(() => res.json('both added'))
    //             .catch(err => res.status(400).json('Error: ' + err));
    //         }
    //     })
    // }

    // router.post('/update/:id',function(req,res){
    //     ProfileDetails.findById(req.params.id)
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

    // newAbout.save()
    // .then(() => res.json('about added'))
    // .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
