const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aboutSchema = new Schema({
    email:{type:String,required:false,unique:false},
    relationship:{type:String,required:false},
    phone:{type:Number,required:false},
    university:{type:String,required:false},
    college:{type:String,required:false},
    course:{type:String,required:false},
    batchFrom:{type:Date,required:false},
    batchTo:{type:Date,required:false},
    crush:{type:String,required:false},
    bunkMates:{type:String,required:false},
})

module.exports = mongoose.model('About', aboutSchema);
