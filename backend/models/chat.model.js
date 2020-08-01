mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type: String
    },
    media: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'ProfileDetails'
    },
    type: {
        type: String
    },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;