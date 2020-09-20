const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  passportLocalMongoose = require("passport-local-mongoose");

const authenticationRoutes = require("./routes/authentication"),
  locationRoutes = require("./routes/location"),
  postsRoutes = require("./routes/posts"),
  commentRoutes = require("./routes/comments");

require("custom-env").env("staging");

const url = process.env.DATABASE_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(
  require("express-session")({
    secret: "totally secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", authenticationRoutes);
app.use("/", locationRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
  console.log("Server started on port " + port.toString());
});
