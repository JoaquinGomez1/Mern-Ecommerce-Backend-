import { Schema, model } from "mongoose";

const productSchema = new Schema({
  // Id already included by default in mongoDB
  name: String,
  description: String,
  category: String,
  quantity: Number,
  isInStock: Boolean, // Added in case the user wants to stop selling a product manually
  price: Number,
  brand: String,
  color: String,
  timesBuyed: Number,
});

const productModel = model("product", productSchema);
export default productModel;
