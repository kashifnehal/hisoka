const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  pic: {type:String},
  name: { type: String },
  date: { type: Date, required: true },
  caption: { type: String, required: true },
  media:{type:String},
  likes:{type:Number}
// }, {
//   timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;