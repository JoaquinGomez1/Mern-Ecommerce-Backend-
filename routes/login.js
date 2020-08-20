const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userSchema = userModel(req.body);

  if (Object.values(req.body).includes(""))
    return res.json({ message: "No empty fields" }).status(400);

  try {
    const userFound = await userModel.findOne({
      username,
    });

    const { _id, address, phoneNumber, registerDate } = userFound;

    if (userFound) {
      const doPasswordsMatch = bcrypt.compare(password, userFound.password);
      if (doPasswordsMatch) {
        return res.json({
          _id,
          username: userFound.username,
          address,
          phoneNumber,
          registerDate,
          isLoggedIn: true,
        });
      } else return res.json({ message: "Invalid credentials" }).status(400);
    }
  } catch (err) {
    res.json({ message: "internal server error" }).status(500);
    console.log(err);
  }
});

module.exports = router;
