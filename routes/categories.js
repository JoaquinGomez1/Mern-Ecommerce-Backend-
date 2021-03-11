const router = require("express").Router();
const handlePagination = require("../middlewares/pagination");
const handleSearch = require("../middlewares/search");
const categoryModel = require("../models/categoryModel");
const products = require("../models/productModel");
const path = require("path");

router.get("/categories", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
);

router.get("/api/categories", handlePagination(categoryModel), (req, res) => {
  // Simply returns a list of every present category
  return res.json(res.pagination);
});

router.get(
  "/api/categories/search?:searchKey",
  handleSearch(products, "category"),
  (req, res) => {
    return res.json(res.pagination);
  }
);

module.exports = router;
