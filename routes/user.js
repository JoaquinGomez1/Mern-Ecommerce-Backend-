const userSchema = require("../models/userModel");
const router = require("express").Router();
const authUser = require("../middlewares/authUser");
const path = require("path");

router.get("/user", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
);

router.get("/api/user", authUser, async (req, res) => {
  const { userId } = req.session;
  const user = await userSchema.findById(userId);

  // Remove sensitive data from the user object
  const userNoPassword = { ...user._doc };
  delete userNoPassword.password;
  delete userNoPassword._id;
  delete userNoPassword.phoneNumber;

  if (user._id) return res.status(200).json(userNoPassword);
  return res.status(500).json({ message: "Something went wrong" });
});

// Add item at the shopping History
router.post("/api/user/historyy", authUser, async (req, res) => {
  const { userId } = req.session;
  let { shoppingHistory } = req.body;
  if (!shoppingHistory) return res.status(500).json({ message: "Bad request" });

  const user = await userSchema.findByIdAndUpdate(userId, {
    $push: { shoppingHistory },
  });
  res.status(200).json({ history: user.shoppingHistory });
});

router.get("/api/user/history", authUser, async (req, res) => {
  const { userId } = req.session;
  const currentUser = await userSchema.findById(userId);
  res.status(200).json(currentUser.shoppingHistory);
});

module.exports = router;
