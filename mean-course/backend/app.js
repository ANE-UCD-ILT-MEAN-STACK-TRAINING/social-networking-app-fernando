const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');

const mongoose = require('mongoose');

const app = express();

mongoose
//  .connect("mongodb+srv://fernando:Crosstown74@cluster0-wq0b6.mongodb.net/test?retryWrites=true&w=majority")
  .connect('mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ss=false', {useNewUrlParser: true})
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/post", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });

    post.save();

  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  })
});




app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;

