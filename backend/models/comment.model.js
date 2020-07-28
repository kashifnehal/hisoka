const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  pic: { type: String },
  username: { type: String, required: false, unique: false, trim: false },
  // date: { type: Date, required: true },
  text: { type: String },
  likes: { type: Number },
  profileowner: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfileDetails"
  }],
  ofpost: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;