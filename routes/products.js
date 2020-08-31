const router = require("express").Router();
const products = require("../json/products.json");
const handlePagination = require("../middlewares/pagination");

router.get("/products", handlePagination(products), (req, res) => {
  res.json(res.pagination); // res.pagination is set by the handlePagination middleware
});

router.get("/products/:id", (req, res) => {
  const searchedProduct = products.find((elem) => elem.id === req.params.id);

  return res.json(searchedProduct);
});

module.exports = router;
