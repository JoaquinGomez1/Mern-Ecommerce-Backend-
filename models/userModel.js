const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: mongoose.Schema.Types.Mixed,
  country: String,
  address: String,
  isLoggedIn: Boolean,
  registerDate: Date,
});

let userModel = mongoose.model("user", userSchema);
module.exports = userModel;
