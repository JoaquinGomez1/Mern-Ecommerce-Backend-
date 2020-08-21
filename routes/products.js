const router = require("express").Router();

router.get("/products", (req, res) => {
  const { pages } = req.query;

  const productsList = [
    { product: "1", category: "hard-drive" },
    { product: "2", category: "kakaka", price: 1200, qty: 10 },
  ];

  res.status(200).json(productsList);
});

module.exports = router;
