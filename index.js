const express = require("express");

var bodyParser = require("body-parser");

const route = require("./route/route");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://functionupassignment:N6URAStDWDG9CjrZ@functionup.nyvlz.mongodb.net/flurn")
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});