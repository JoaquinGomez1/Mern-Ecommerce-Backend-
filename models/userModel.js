const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Id already included by default in mongoDB
  username: String,
  email: String,
  password: String,
  country: String,
  address: String,
  isLoggedIn: Boolean,
  registerDate: Date,
  phoneNumber: String,
  favoriteProducts: Array,
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
