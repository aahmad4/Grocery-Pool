const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");

router.get("/", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(post);
    }
  });
});

router.post("/", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log("Error: " + err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          post.comments.push(comment);
          post.save();
          res.redirect("/posts/" + post._id);
        }
      });
    }
  });
});
