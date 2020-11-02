const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  type: String, // Something like pc component, periferals
});

const categoryModel = new mongoose.model("category", categorySchema);
module.exports = categoryModel;
