const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    coverPic:{type:String},
    profilePic:{type:String},
    name:{type:String},
    bio:{type:String},
    username:{type:String,required:false},
    
    // posts:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"post"
    //     }
    // ]
}, {
timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);