const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileDetailsSchema = new Schema({
    coverPic:{type:String},
    profilePic:{type:String},
    name:{type:String},
    bio:{type:String},
    username:{type:String,required:false},
    abouts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "About"
    }]
}, {
timestamps: true,
});

module.exports = mongoose.model('ProfileDetails', profileDetailsSchema);