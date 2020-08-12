const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileDetailsSchema = new Schema({
    coverPic: { type: String },
    profilePic: { type: String },
    name: { type: String },
    bio: { type: String },
    username: { type: String, required: false },
    password: { type: String },
    university: { type: String },
    abouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "About"
    }],
    userWhatif: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Whatif"
    }],
    likedposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    commentsdone: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    yourCommunities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }],
    folCommunities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }],
    userposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('ProfileDetails', profileDetailsSchema);