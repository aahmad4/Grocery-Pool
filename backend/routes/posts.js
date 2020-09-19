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

router.post("/", (req, res) => {
  let newPost = {
    title: "Heading out to Harris Teeter",
    description: "I'm going to harris teeter to pick up some stuff lol",
    address_going_to: {
      Street: "12345 Brotato Street",
      City: "Wilmington",
      State: "Virginia",
      Postal_code: "12345",
    },
    author: {
      id: req.user._id,
      username: req.user.username,
    },
  };
  Post.create(newPost, (err, newPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.redirect("/posts");
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

router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(foundPost);
    }
  });
});

router.put("/:id", (req, res) => {
  let newUpdatedPost = {
    title: "Heading out to Harris Teeter",
    description: "I'm going to harris teeter to pick up some stuff lol",
    address_going_to: {
      Street: "12345 Brotato Street",
      City: "Wilmington",
      State: "Virginia",
      Postal_code: "12345",
    },
    author: {
      id: req.user._id,
      username: req.user.username,
    },
  };
  Post.findByIdAndUpdate(req.params.id, newUpdatedPost, (err, updatedPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.redirect("/posts" + req.params.id);
    }
  });
});

router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.redirect("/posts");
    }
  });
});

module.exports = router;
