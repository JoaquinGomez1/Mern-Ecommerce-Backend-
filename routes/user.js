const userSchema = require("../models/userModel");
const router = require("express").Router();

router.post("/user/updateShoppingHistory", async (req, res) => {
  const { shoppingHistory, _id } = req.body;
  if (!shoppingHistory) return res.status(500).json({ message: "Bad request" });
  console.log(shoppingHistory);
  const user = await userSchema.findByIdAndUpdate(_id, { shoppingHistory });
  console.log(user);
  res.status(200).json({ message: user });
});

module.exports = router;
