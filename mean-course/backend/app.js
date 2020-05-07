const express = require("express"); //comments for later
const app = express(); // more comments

app.use((req, res, next) => {
  console.log("first middle where");
  netx();
});

app.use((req, res, next) => {
  console.log("second middle where");
  netx();
});

