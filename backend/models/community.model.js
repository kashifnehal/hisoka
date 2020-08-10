const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
    pic: { type: String },
    name: { type: String, required: false, unique: false, trim: false },
    communityPrivacy: { type: String },
    university: { type: String },
    profileowner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProfileDetails"
    }],
    communityEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    communityPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true,
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;