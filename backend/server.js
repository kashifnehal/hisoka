const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
// const cookieParser = require('cookieParser')
// const logger = require('morgan')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const postRouter = require('./routes/index');

app.use('/postPage', postRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});