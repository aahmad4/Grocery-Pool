const express = require("express");
const router = express.Router();
let Post = require("../models/post");

router.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(posts);
    }
  });
});

router.get("/author/:id", (req, res) => {
  Post.find({ author: req.body.user }).exec((err, posts) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(posts);
    }
  });
});

router.post("/", isLoggedIn, (req, res) => {
  const date = new Date(Date.now());
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    author: req.body.user,
    created_at: date.getTime(),
  };

  Post.create(newPost, (err, newlycreatedPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json("Post Created");
    }
  });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .exec((err, foundPost) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        res.json(foundPost);
      }
    });
});

router.put("/:id", checkOwnership, (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const address = req.body.address;

  const newUpdatedPost = {
    title: title,
    description: description,
    address: address,
  };
  Post.findByIdAndUpdate(req.params.id, newUpdatedPost, (err, updatedPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json("Post Updated");
    }
  });
});

router.delete("/:id", checkOwnership, (req, res) => {
  /* Delete the comments first */
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      foundPost.comments.forEach((comment) =>
        Comment.findByIdAndRemove(comment._id, (err) => {
          if (err) {
            console.log("Error: " + err);
          }
        })
      );
    }
  });

  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json("Post Deleted");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("Error: Please login first!");
  }
}

function checkOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Post.findById(req.params.id, (err, foundPost) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        if (foundPost.author.id.equals(req.user._id)) {
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
