const express = require('express');
const router = express.Router();
let About = require('../models/about.model');
// let Profile = require('../models/profile.model');


router.get('/',function(req,res){
    About.find()
    .then(abouts => res.json(abouts))
    .catch(err => res.status(400).json('Error: ' + err));
})


// //tryin addition of about into profile

// router.post('/add',async function(req,res,next){
//     const email = req.body.email;
//     const relationship = req.body.relationship;
//     const phone = Number(req.body.phone);
//     const university = req.body.university;
//     const college = req.body.college;
//     const course = req.body.course;
//     const batchFrom = Date.parse(req.body.batchFrom);
//     const batchTo = Date.parse(req.body.batchTo);
//     const crush = req.body.name;
//     const bunkMates = req.body.name;

//     const newAbout = new About({
//         email,
//         relationship,
//         phone,
//         university,
//         college,
//         course,
//         batchFrom,
//         batchTo,
//         crush,
//         bunkMates
//     },function(err,savedPost){
//         Profile.findOne({username:"hohsj"},function(err,foundProfile){
//             if(err){
//                 console.log(err)
//             } else {
//                 foundProfile.about.push(savedPost)
//                 foundProfile.save()
//                 .then(() => res.json('about added'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//             }
//         })
//     })

//     // newAbout.save()
//     // .then(() => res.json('about added'))
//     // .catch(err => res.status(400).json('Error: ' + err));
// })



// ------------

router.post('/add', function(req,res,next){
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

    newAbout.save()
    .then(() => res.json('about added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:id',function(req,res){
    About.findById(req.params.id)
    .then(about => res.json(about))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id',function(req,res){
    About.findByIdAndDelete(req.params.id)
    .then(about => res.json('about deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
    
})

router.post('/update/:id',function(req,res){
    About.findById(req.params.id)
    .then(about =>{
        about.email = req.body.email;
        about.relationship = req.body.relationship;
        about.phone = Number(req.body.phone);
        about.university = req.body.university;
        about.college = req.body.college;
        about.course = req.body.course;
        about.batchFrom = Date.parse(req.body.name);
        about.batchTo = Date.parse(req.body.name);
        about.crush = req.body.name;
        about.bunkMates = req.body.name;

        about.save()
        .then(() => res.json('about updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
})

module.exports = router;