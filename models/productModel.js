const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Id already included by default in mongoDB
  name: String,
  description: String,
  category: String,
  isInStock: Boolean,
  price: Number,
  quantity: Number,
  brand: String,
  color: String,
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
