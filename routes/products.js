const router = require("express").Router();
const products = require("../models/productModel");
const handlePagination = require("../middlewares/pagination");
const handleSearch = require("../middlewares/search");
const adminOnly = require("../middlewares/adminOnly");

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

router.post("/products/add", adminOnly, async (req, res) => {
  const { product } = req.body;
  if (!product)
    return res.status(400).json({ message: "product body cannot be empty" });

  const productSchema = new products(product);
  await productSchema.save();
  return res.status(200).json({ message: "Product saved succesfully" });
});

module.exports = router;
