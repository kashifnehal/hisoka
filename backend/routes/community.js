const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
let Post = require('../models/post.model');
let Comment = require('../models/comment.model')
let ProfileDetails = require('../models/profileDetails.model')
const postController = require('../controllers/post')
const auth = require('../../backend/middleware/auth');
let Community = require('../models/community.model')

const storage = multer.diskStorage({
    destination: "./../public/images/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
});

router.get('/', function (req, res) {
    Community.find().sort({ createdAt: -1 })
        .then(com => res.json(com))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.get('/of/:university', function (req, res) {
    Community.find({ university: req.params.university }).sort({ createdAt: -1 })
        .then(com => res.json(com))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:profileId', function (req, res) {
    ProfileDetails.findById(req.params.profileId).populate({ path: 'communities', populate: { path: 'profileowner' } })
        .then(profile => res.json(profile.communities))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/:profileId', upload.single("pic"), function (req, res, next) {
    const pic = "community.jpg"
    const name = req.body.name;
    const communityPrivacy = req.body.communityPrivacy;
    // if (typeof req.file === "undefined") {
    //     pic = "community.jpg";
    // } else {
    //     pic = req.file.filename
    // }
    const newCommunity = new Community({
        pic,
        name,
        communityPrivacy
    });
    // const newWhatif = new Whatif(req.body)
    ProfileDetails.findById(req.params.profileId)
        .then(foundProfile => {
            newCommunity.profileowner = foundProfile,
                newCommunity.university = foundProfile.university,
                newCommunity.save()
                    .then(() => res.json(newCommunity))
                    .catch(err => {
                        console.log(err)
                        res.status(400).json('Error: ' + err)
                    });

            foundProfile.communities.push(newCommunity)
            foundProfile.save()
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;