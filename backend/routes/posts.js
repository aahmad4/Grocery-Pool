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
  const title = req.body.title;
  const description = req.body.description;
  const address_going_to = {
    Street: req.body.address_going_to.street,
    City: req.body.address_going_to.city,
    State: req.body.address_going_to.state,
    Postal_code: req.body.address_going_to.postal_code,
  };

  const newPost = {
    title: title,
    description: description,
    address_going_to: address_going_to,
  };

  Post.create(newPost, (err, newlycreatedPost) => {
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

router.get("/:id/edit", checkOwnership, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
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
  const address_going_to = {
    Street: req.body.address_going_to.street,
    City: req.body.address_going_to.city,
    State: req.body.address_going_to.state,
    Postal_code: req.body.address_going_to.postal_code,
  };

  const newUpdatedPost = {
    title: title,
    description: description,
    address_going_to: address_going_to,
  };
  Post.findByIdAndUpdate(req.params.id, newUpdatedPost, (err, updatedPost) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.redirect("/posts" + req.params.id);
    }
  });
});

router.delete("/:id", checkOwnership, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.redirect("/posts");
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
