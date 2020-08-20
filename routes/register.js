const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const dataReceived = req.body;
  const userSchema = userModel(dataReceived);
  const userAlreadyRegistered = await userModel.findOne({
    username: userSchema.username,
  });
  const SALT_ROUNDS = 10;

  // ------------- Validation -------------
  if (dataReceived === undefined || dataReceived === {})
    return res.status(400).json({ message: "No empty requests" });

  if (Object.values(dataReceived).includes(""))
    return res.status(400).json({ message: "No empty fields" });

  if (userAlreadyRegistered)
    return res.status(400).json({ message: "Username already taken" });

  if (dataReceived.password.length < 8)
    return res
      .json({ message: "Password must be at least 8 characters long" })
      .status(400);

  if (
    isNaN(dataReceived.phoneNumber) ||
    dataReceived.length < 10 ||
    dataReceived.length > 15
  )
    return res.json({ message: "Invalid phone number" }).status(400);

  // Save in DB
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(
      dataReceived.password,
      SALT_ROUNDS
    );

    // save item to db with previously hashed password
    userSchema.password = hashedPassword;
    userSchema.registerDate = Date.now();
    await userSchema.save();

    // Create a copy of the schema to send to the user as authentication
    let schemaCopy = { ...userSchema._doc };
    delete schemaCopy.password;
    schemaCopy.isLoggedIn = true;

    // Send back a response
    res.status(200).json(schemaCopy);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Server error" }).status(500);
  }
});

module.exports = router;
