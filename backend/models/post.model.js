const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  pic: {type:String},
  username: { type: String,required:false,unique:false,trim:false },
  // date: { type: Date, required: true },
  caption: { type: String, required: false },
  media:{type:String},
  likes:{type:Number},
  profileowner:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "About"
    }]
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;