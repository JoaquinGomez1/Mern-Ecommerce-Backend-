const userSchema = require("../models/userModel");
const router = require("express").Router();
const findUserFavorites = require("../middlewares/findUserFavorites");
const authUser = require("../middlewares/authUser");

// Add favorite
router.post("/api/favorites", authUser, (req, res) => {
  const { userId } = req.session;
  const { item } = req.body;
  let itemNoQty = { ...item };
  delete itemNoQty.qty;

  if (!item || !item._id)
    return res
      .status(400)
      .json({ message: "Cannot post null favorite product" });

  userSchema.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { favoriteProducts: { _id: item._id } } },
    function (error, found) {
      if (found) {
        return res.status(200).json({ message: "Success" });
      } else {
        return res.status(500).json({ message: error });
      }
    }
  );
});

// Get favorites list
router.get(
  "/api/user/favorites",
  authUser,
  findUserFavorites,
  async (req, res) => {
    res.json(res.userFavorites);
  }
);

router.delete("/api/user/favorites", authUser, (req, res) => {
  const { productId } = req.body;
  const { userId } = req.session;
  userSchema
    .findOneAndUpdate(
      { _id: userId },
      { $pull: { favoriteProducts: { _id: productId } } }
    )
    .then((message) => {
      res.json({ message });
    })
    .catch((message) => {
      res.json({ message });
    });
});
module.exports = router;
