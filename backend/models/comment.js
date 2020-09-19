const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  text: String,
  item_picking_up_comment: [
    {
      item: String,
      status: Boolean,
    }
  ]
});

module.exports = mongoose.model("Comment", commentSchema);
