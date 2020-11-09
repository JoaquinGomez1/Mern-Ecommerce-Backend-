const router = require("express").Router();
const products = require("../models/productModel");
const handlePagination = require("../middlewares/pagination");
const handleSearch = require("../middlewares/search");
const adminOnly = require("../middlewares/adminOnly");
const removeEmptyFields = require("../utils/removeEmptyFields");

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

// --------------------------------- Add products
router.post("/products/add", adminOnly, async (req, res) => {
  const { product } = req.body;
  if (!product)
    return res.status(400).json({ message: "product body cannot be empty" });

  const productSchema = new products(product);
  await productSchema.save();
  return res.status(200).json({ message: "Product saved succesfully" });
});

// --------------------------------- Update products
router.post("/products/modify", adminOnly, async (req, res) => {
  const { fields } = req.body;

  if (!fields)
    return res.status(400).json({ message: "product body cannot be empty" });

  if (!fields._id)
    return res.status(400).json({ message: "No product id was provided" });

  const noEmptyValuesObject = removeEmptyFields(fields);

  await products.findByIdAndUpdate(fields._id, {
    $set: noEmptyValuesObject,
  });
  res.json({ message: "Product updated Succesfully" });
});

// --------------------------------- Delete products
// (same 'update products's route but using delete method instead)
router.delete("/products/modify", adminOnly, async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res.status(400).json({ message: "No product id was provided" });

  await products.findByIdAndDelete(productId);
  res.status(200).json({ message: "Product deleted succesfully" });
});

module.exports = router;
