const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('./../models/user.model');
// const { use } = require('./post');
// const { token } = require('morgan');

router.post('/',function(req,res){
    const {username, password} = req.body;

    //simple validation
    if(!username || !password) {
        return res.status(400).json({msg:'Please enter all fields'})
    }

    User.findOne({username})
        .then(user => {
            if(user){
                return res.status(400).json({msg:'user already exists'})
            }

            const newUser = new User({
                username,
                password
            })

            //create salt & hash password
            // here 10 is no. of rounds of encryption .. 
            // more rounds more safe but takes more time .. 10 is default
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                        
                            jwt.sign(
                                {id:user.id},
                                config.get('jwtSecret'),
                                {expiresIn:3600},
                                (err,token) =>{
                                    if(err) throw err
                                    res.json({
                                        token:token,
                                        //or just token,
                                        user:{
                                            id:user.id,
                                            username:user.username,
                                            password:user.password
                                        }
                                    })
                                }
                            )
                
                        
                    })
                })
            })
        })
})

module.exports = router