const express = require("express"); //comments for later
const app = express(); // more comments

app.use((req, res, next) => {
  console.log("first middle where");
  next();
});

app.use((req, res, next) => {
  console.log("second middle where");
  next();
});

app.use((req, res, next) => {
  res.send("Hello from express, done some changes");

});

module.exports = app;

