const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Id already included by default in mongoDB
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  qty: { type: Number, default: 1 },
  isInStock: { type: Boolean, default: true }, // Added in case the user wants to stop selling a product manually
  price: { type: Number, default: 1 },
  isInFavorites: Boolean,
  img: { type: String, required: true },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
