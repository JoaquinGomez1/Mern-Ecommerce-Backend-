const orderSchema = require("../models/orders");
const router = require("express").Router();

router.post("/orders/new", async (req, res) => {
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

module.exports = router;
