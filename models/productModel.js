const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Id already included by default in mongoDB
  name: String,
  description: String,
  category: String,
  qty: Number,
  isInStock: Boolean, // Added in case the user wants to stop selling a product manually
  price: Number,
  brand: String,
  color: String,
  timesBougth: Number,
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
