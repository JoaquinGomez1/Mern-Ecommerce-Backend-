import { Schema, model } from "mongoose";

const productSchema = new Schema({
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

const productModel = model("product", productSchema);
export default productModel;
