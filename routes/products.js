const router = require("express").Router();

router.get("/products", (req, res) => {
  const { pages } = req.query;

  res.send("<h1>Working</h1>");
});

module.exports = router;
