const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    postal_code: String,
  },
});

module.exports = mongoose.model("User", userSchema);
