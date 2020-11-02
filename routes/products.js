const router = require("express").Router();
const products = require("../models/productModel");
const handlePagination = require("../middlewares/pagination");
const handleSearch = require("../middlewares/search");

router.get(
  "/products",
  handlePagination(products),
  handleSearch(products, "name"),
  (req, res) => {
    res.json(res.pagination); // res.pagination is set by the handlePagination middleware
  }
);

router.get("/products/:_id", async (req, res) => {
  const searchedProduct = await products.findById(req.params._id);
  return res.json(searchedProduct);
});

module.exports = router;
