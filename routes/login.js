const router = require("express").Router();

router.get("/login", (req, res) => {
  res.send("Module working");
});

module.exports = router;
