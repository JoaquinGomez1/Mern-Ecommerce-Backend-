const userSchema = require("../models/userModel");
const router = require("express").Router();

router.post("/favorites", (req, res) => {
  const { userId, item } = req.body;

  userSchema.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { favoriteProducts: item } },
    function (error, found) {
      if (found) {
        return res.status(200).json({ message: "Success" });
      } else {
        return res.status(500).json({ message: error });
      }
    }
  );
});

module.exports = router;
