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

router.get('/:profileId', function (req, res) {
    ProfileDetails.findById(req.params.profileId).populate("communities")
        .then(profile => res.json(profile.communities))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/:profileId', function (req, res, next) {
    const pic = req.body.pic
    const name = req.body.name;
    const communityPrivacy = req.body.communityPrivacy;
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