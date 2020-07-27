const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../backend/middleware/auth')
// const router = require('express-promise-router')();

const path = require("path");
const multer = require("multer");
let ProfileDetails = require('../models/profileDetails.model');
const Post = require('../models/post.model');
const About = require('../models/about.model')
const Whatif = require('../models/whatif.model')
// const { post } = require('./post');


const storage = multer.diskStorage({
    destination: "./../public/images/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

// ============= GOOD CATCH FORMAT ============
// .catch(err => {
//     res.status(500).json({
//       message: "There was an error retrieving all users"
//     });
//   });
//   ============================================

const upload = multer({
    storage: storage,
    // limits:{fileSize: 1000000},
});


router.get('/', auth, function (req, res) {
    ProfileDetails.find()
        .then(profileDetails => res.json(profileDetails))
        .catch(err => res.status(400).json('Error: ' + err));
})

// === ADDING A NEW PROFILE== OR SIGN UP
router.post('/', function (req, res) {
    const { username, password } = req.body;

    //simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    ProfileDetails.findOne({ username })
        .then(profile => {
            if (profile) {
                return res.status(400).json({ msg: 'user already exists' })
            }

            const newProfileDetails = new ProfileDetails(req.body)

            //create salt & hash password
            // here 10 is no. of rounds of encryption .. 
            // more rounds more safe but takes more time .. 10 is default
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newProfileDetails.password, salt, (err, hash) => {
                    if (err) throw err;
                    newProfileDetails.password = hash;
                    newProfileDetails.save()
                        .then(profile => {

                            jwt.sign(
                                { id: profile.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err
                                    res.json({
                                        token: token,
                                        //or just token,
                                        profile
                                    })
                                }
                            )


                        })
                })
            })
        })
})

// router.post('/', upload.single("media"), function(req,res){
//     // const coverPic = req.file.filename;
//     // const profilePic = req.file.filename;
//     // const coverPic = req.body.coverPic;
//     // const profilePic = req.body.profilePic;
//     // const name = req.body.name;
//     // const bio = req.body.bio;
//     // const username = req.body.username;
//     // const abouts = req.body.abouts;

//     const newProfileDetails = new ProfileDetails(req.body)

//     newProfileDetails.save()
//     .then(() => res.json('profileDetails added'))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

router.get('/:profileId', function (req, res) {
    ProfileDetails.findById(req.params.profileId)
        .then(profileDetails => res.json(profileDetails))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:profileId', function (req, res) {
    ProfileDetails.findByIdAndDelete(req.params.profileId)
        .then(profileDetails => res.json('profileDetails deleted'))
        .catch(err => res.status(400).json('Error: ' + err));

})


//update profile details
router.patch('/:profileId', upload.single("profilePic"), function (req, res) {
    profileData = {
        name: req.body.name,
        bio: req.body.bio,
        // coverPic: req.file.filename,
        profilePic: req.file.filename
    }
    ProfileDetails.findByIdAndUpdate(req.params.profileId, profileData)
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
router.get('/:profileId/userposts', auth, function (req, res) {
    ProfileDetails.findById(req.params.profileId).populate('userposts')
        .then(profile => res.json(profile.userposts))
        .catch(err => res.status(400).json('Error: ' + err));

})

//adding a new post will be saved in all posts 
//and in that profile's userpost also post will be saved
router.post('/:profileId/userposts', upload.single("media"), auth, function (req, res, next) {
    // const newPost = new Post(req.body)
    const caption = req.body.caption;
    const media = req.file.filename;
    const likes = Number(req.body.likes);
    const postPrivacy = req.body.postPrivacy;

    const newPost = new Post({
        caption,
        media,
        likes,
        postPrivacy,
    });

    // ProfileDetails.findById(req.params.profileId).populate("profileowner").execPopulate()
    ProfileDetails.findById(req.params.profileId).populate('profileowner')
        .then(foundProfile => {
            newPost.profileowner = foundProfile
            newPost.pic = foundProfile.profilePic
            newPost.username = foundProfile.username
            newPost.university = foundProfile.university
            newPost.save()
                .then(() => res.json(newPost))
                .catch(err => {
                    console.log(err)
                    res.status(400).json('Error: ' + err)
                });

            foundProfile.userposts.push(newPost)
            foundProfile.save()
            // .then(() => res.json('post profile'))
            // .catch(err => res.status(400).json('Error: ' + err));
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


//adding a new whatif will be saved in all whatif 
//and in that profile's userWhatif also whatif will be saved
router.post('/:profileId/userWhatif', function (req, res, next) {
    const ifname = req.body.ifname;
    const text = req.body.text;
    const likes = Number(req.body.likes);
    const newWhatif = new Whatif({
        ifname,
        text,
        likes,

    });
    // const newWhatif = new Whatif(req.body)
    ProfileDetails.findById(req.params.profileId)
        .then(foundProfile => {
            newWhatif.profileowner = foundProfile
            newWhatif.save()
                .then(() => res.json(newWhatif))

                .catch(err => {
                    console.log(err)
                    res.status(400).json('Error: ' + err)
                });

            foundProfile.userWhatif.push(newWhatif)
            foundProfile.save()
        })
        .catch(err => res.status(400).json('Error: ' + err));
})




router.post('/:profileId/about', function (req, res) {

    const newAbout = new About(req.body)
    ProfileDetails.findById(req.params.profileId)
        .then(foundUser => {
            foundUser.abouts.push(newAbout)
            foundUser.save()
                .then(() => res.json('both updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;