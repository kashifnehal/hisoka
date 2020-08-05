
const express = require('express');
const router = express.Router();
const Chat = require("../models/chat.model");


router.get("/", async (req, res) => {
    await Chat.find()
        .populate("sender")
        .exec((err, chats) => {
            // console.log(chats)
            if (err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const app = express();
// const mongoose = require('mongoose');
// let ProfileDetails = require('../models/profileDetails.model')
// const auth = require('../../backend/middleware/auth');
// const socketio = require('socket.io');
// const Chat = require('../models/chat.model')
// const server = require("http").createServer(app);
// const io = socketio(server);
// const config = require('config')
// const uri = config.get('ATLAS_URI')
// const connect = mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })



// io.on("connection", socket => {

//     socket.on("Input Chat Message", msg => {

//         connect.then(db => {
//             try {
//                 let chat = new Chat({ message: msg.chatMessage, sender: msg.userID, type: msg.type })

//                 chat.save((err, doc) => {
//                     if (err) return res.json({ success: false, err })

//                     Chat.find({ "_id": doc._id })
//                         .populate("sender")
//                         .exec((err, doc) => {

//                             return io.emit("Output Chat Message", doc);
//                         })
//                 })
//             } catch (error) {
//                 console.error(error);
//             }
//         })
//     })

// })

// module.exports = router;