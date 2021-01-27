const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  date: { type: String, default: new Date().toLocaleDateString() },
  products: { type: Array, required: true },
  completed: { type: Boolean, default: false },
  address: { type: String, required: true },
  total: { type: Number, required: true },
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
