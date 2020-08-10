const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config')
const socketio = require('socket.io');
const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: "./../public/images/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  // limits:{fileSize: 1000000},
}).single("file")

//==SAW THIS SOMEWHERE====
// app.use(methodOverride('_method'));
// app.use(methodOverride('X-HTTP-Method'));
// app.use(methodOverride('X-HTTP-Method-Override')); 
// app.use(methodOverride('X-Method-Override')); 

mongoose.set('useFindAndModify', false);
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const Chat = require('./models/chat.model')


const server = require("http").createServer(app);
const io = socketio(server);

// change uri to this if takes time.. in config/default.json
// "mongodb+srv://kashifnehal:kashif786@@cluster0-5nclg.gcp.mongodb.net/test?retryWrites=true&w=majority&ssl=true"
const uri = config.get('ATLAS_URI')
const connect = mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err));


// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.post("/chat/uploadfiles", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.filename });
  })
});

io.on("connection", socket => {

  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {
        let chat = new Chat({ message: msg.chatMessage, sender: msg.userId, type: msg.type })

        chat.save((err, doc) => {
          if (err) return res.json({ success: false, err })

          Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc) => {

              return io.emit("Output Chat Message", doc);
            })
        })
      } catch (error) {
        console.error(error);
      }
    })
  })

})


// app.use('/chat', require('./routes/chat'));
app.use('/uploads', express.static('uploads'));

const postRouter = require('./routes/post');
app.use('/postPage', postRouter);

const profileDetailsRouter = require('./routes/profileDetails');
app.use('/ProfileDetails', profileDetailsRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const whatifRouter = require('./routes/whatif');
app.use('/whatif', whatifRouter);

const chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);

const communityRouter = require('./routes/community');
app.use('/community', communityRouter);

const aboutRouter = require('./routes/about');
app.use('/aboutDetails', aboutRouter);


server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});