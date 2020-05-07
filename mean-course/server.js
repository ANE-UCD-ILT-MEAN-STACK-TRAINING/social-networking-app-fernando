//create server var
var express = require("express");
var app = new express();

const port = process.env.PORT || "3000";

app.get("/", function(req, res) {
  res.send("Hello from Express");
});

app.listen(port, function () {
  console.log('Running on port ' + port);
});



