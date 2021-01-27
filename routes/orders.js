const orderSchema = require("../models/orders");
const router = require("express").Router();
const adminOnly = require("../middlewares/adminOnly");

router.post("/orders/new", (req, res) => {
  if (!req || !req.body) return res.status(400).json({ message: "Empty body" });
  const { body } = req;
  new orderSchema(body)
    .save()
    .then((savedData) => {
      return res.json(savedData);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

router.get("/orders", adminOnly, async (req, res) => {
  const orders = await orderSchema.find();
  return res.json({ results: orders });
});

module.exports = router;
