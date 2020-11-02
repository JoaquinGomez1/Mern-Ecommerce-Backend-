const userSchema = require("../models/userModel");
const router = require("express").Router();
const findUserFavorites = require("../middlewares/findUserFavorites");

// Add favorite
router.post("/favorites", (req, res) => {
  const { userId, item } = req.body;
  let itemNoQty = { ...item };
  delete itemNoQty.qty;

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
router.post("/user/favorites", findUserFavorites, async (req, res) => {
  res.json(res.userFavorites);
});

// // For testing purposes only. Delete later
// router.get("/usersAll", async (req, res) => {
//   const users = await userSchema.find();
//   res.json(users);
// });

module.exports = router;
