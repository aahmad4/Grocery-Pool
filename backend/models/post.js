const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  address_going_to: {
    Street: String,
    City: String,
    State: String,
    Postal_code: String,
  },
});

module.exports = mongoose.model("Ppst", postSchema);

