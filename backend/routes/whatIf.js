const express = require('express');
const router = express.Router();
// const config = require('config')
// const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const ProfileDetails = require('../models/profileDetails.model');
const Post = require('../models/post.model');
const Whatif = require('../models/whatif.model')


router.get('/', auth, function (req, res) {
    Whatif.find().sort({ createdAt: -1 })
        .then(whatif => res.json(whatif))
        .catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;
