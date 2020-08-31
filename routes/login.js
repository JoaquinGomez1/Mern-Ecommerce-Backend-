const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (Object.values(req.body).includes(""))
    return res.status(400).json({ message: "No empty fields" });

  try {
    const userFound = await userModel.findOne({
      username,
    });

    if (userFound) {
      const { _id, address, phoneNumber, registerDate } = userFound;
      const doPasswordsMatch = await bcrypt.compare(
        password,
        userFound.password
      );
      if (doPasswordsMatch) {
        return res.status(200).json({
          _id,
          username: userFound.username,
          address,
          phoneNumber,
          registerDate,
          isLoggedIn: true,
        });
      }
    }
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    res.json({ message: "internal server error" }).status(500);
    console.log(err);
  }
});

module.exports = router;
