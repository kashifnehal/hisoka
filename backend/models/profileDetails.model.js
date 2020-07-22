const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileDetailsSchema = new Schema({
    coverPic: { type: String },
    profilePic: { type: String },
    name: { type: String },
    bio: { type: String },
    username: { type: String, required: false },
    password: { type: String },
    abouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "About"
    }],
    userposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('ProfileDetails', profileDetailsSchema);