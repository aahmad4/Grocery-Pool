const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

const isLoggedIn = (request, response, next) => {
  // passport adds this to the request object
  if (request.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "User not found!" });
};

router.post("/register", (req, res) => {
  console.log("registering user");
  const { username, password, email } = req.body;
  // const {street, city, state, postalCode } = address;
  console.log(req.body);
  // console.log(password);
  // Creates and saves a new user with a salt and hashed password
  User.register(new User({ username, email }), password, (err, user) => {
    if (err) {
      console.log("Error: " + err);
      return res.status(500).json({ error: err });
    } else {
      return res.json({ user: user });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Login was successful!");
  res.sendStatus(200);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

module.exports = router;
