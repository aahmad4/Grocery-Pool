const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

const authenticationRoutes = require("./routes/authentication"),
  locationRoutes = require("./routes/location"),
  postsRoutes = require("./routes/posts");

const url = process.env.DATABASEURL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authenticationRoutes);
app.use("/", locationRoutes);
app.use("/", postsRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log("Server started on port " + port.toString());
});
