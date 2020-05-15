const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

const app = express();

mongoose
  .connect("mongodb+srv://fernando:Crosstown74@cluster0-wq0b6.mongodb.net/MyPosts?retryWrites=true&w=majority")
//  .connect('mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ss=false', {useNewUrlParser: true})
  .then(() => {
    console.log("Connceted to database");
  })
  .catch(() => {
    console.log("Conncetion failed");
  });

// bodyParser.json() -> this will tell only to process json type data from the request body
app.use(bodyParser.json());
//another example showing body-parser can process other types of body other than json
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app;

