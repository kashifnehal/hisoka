const express = require('express');
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../backend/middleware/auth')
const ProfileDetails = require('../models/profileDetails.model');
const Post = require('../models/post.model');
const Whatif = require('../models/whatIf.model')

