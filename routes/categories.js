const router = require("express").Router();
const handlePagination = require("../middlewares/pagination");
const handleSearch = require("../middlewares/search");
const categoryModel = require("../models/categoryModel");
const products = require("../models/productModel");

router.get("/categories", handlePagination(categoryModel), (req, res) => {
  // Simply returns a list of every present category
  return res.json(res.pagination);
});

router.get(
  "/categories/search?:searchKey",
  handleSearch(products, "category"),
  (req, res) => {
    return res.json(res.pagination);
  }
);

module.exports = router;
