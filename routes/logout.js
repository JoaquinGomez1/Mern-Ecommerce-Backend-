const router = require("express").Router();
const authProtected = require("../middlewares/authUser");

router.get("/api/logout", authProtected, (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: "LogedOut" });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
