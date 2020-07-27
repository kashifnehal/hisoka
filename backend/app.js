const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config')

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

// const uri = process.env.ATLAS_URI;

// change uri to this if takes time.. in config/default.json
// "mongodb+srv://kashifnehal:kashif786@@cluster0-5nclg.gcp.mongodb.net/test?retryWrites=true&w=majority&ssl=true"
const uri = config.get('ATLAS_URI')
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);


// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const postRouter = require('./routes/post');
app.use('/postPage', postRouter);

const profileDetailsRouter = require('./routes/profileDetails');
app.use('/ProfileDetails', profileDetailsRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// === NOT USING====
// const profileRefsRouter = require('./routes/profileRefs');
// app.use('/profileRefs', profileRefsRouter);

const aboutRouter = require('./routes/about');
app.use('/aboutDetails', aboutRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});