const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    pic: { type: Boolean },
    // profileowner: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "ProfileDetails"
    // }],
    ofpost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true,
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;