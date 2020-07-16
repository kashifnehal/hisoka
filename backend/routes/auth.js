const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const ProfileDetails = require('./../models/profileDetails.model');
// const { use } = require('./post');
// const { token } = require('morgan');

router.post('/',function(req,res){
    const {username, password} = req.body;

    //simple validation
    if(!username || !password) {
        return res.status(400).json({msg:'Please enter all fields'})
    }

    ProfileDetails.findOne({username})
        .then(profile => {
            if(!profile){
                return res.status(400).json({msg:'user does not exists'})
            }

            //validate password
            bcrypt.compare(password,profile.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'})

                    jwt.sign(
                        {id:profile.id},
                        config.get('jwtSecret'),
                        {expiresIn:3600},
                        (err,token) =>{
                            if(err) throw err
                            res.json({
                                token:token,
                                //or just token,
                                profile:{
                                    id:profile.id,
                                    username:profile.username,
                                    password:profile.password
                                }
                            })
                        }
                    )
                })
        })
})

//=== TO GET THE CORRECT PROFILE FROM THE TOKEN PASSED IN HEADER
router.get('/profile',auth, (req,res)=>{
    ProfileDetails.findById(req.profile.id)
        .select("-password")
        .then(profile => res.json(profile))
})

module.exports = router