const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");

router.get("/", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(post.comments);
    }
  });
});

router.get("/author/:id", (req, res) => {
  Comment.find({ author: req.body.user }).exec((err, posts) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(posts.comments);
    }
  });
});

router.post("/", (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      const newComment = {
        description: req.body.description,
        author: req.body.user,
      };

      Comment.create(newComment, (err, comment) => {
        if (err) {
          console.log("Error: " + err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          post.comments.push(comment);
          post.save();
          res.json("Comment Created!");
        }
      });
    }
  });
});

router.put("/:id", checkOwnership, (req, res) => {
  const newUpdatedComment = {
    description: req.body.description,
  };
  Comment.findByIdAndUpdate(
    req.params.id,
    newUpdatedComment,
    (err, updatedComment) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        res.json("Comment Updated");
      }
    }
  );
});

function checkOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.id, (err, foundComment) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          console.log("Error: Permission denied, you don't own that post!");
        }
      }
    });
  } else {
    console.log("Error: please login first!");
  }
}

module.exports = router;
