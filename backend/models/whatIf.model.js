const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const whatifSchema = new Schema({
    ifname: { type: String, required: false, unique: false, trim: false },
    text: { type: String, required: false },
    likeCount: { type: Number },
    profileowner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "About"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true,
});

const Whatif = mongoose.model('Whatif', whatifSchema);

module.exports = Whatif;