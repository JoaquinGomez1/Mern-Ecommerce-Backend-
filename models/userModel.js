const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Id already included by default in mongoDB
  username: String,
  role: { type: String, default: "member" },
  email: String,
  password: String,
  gender: String,
  address: String,
  isLoggedIn: Boolean,
  registerDate: Date,
  favoriteProducts: Array,
  shoppingHistory: Array,
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
