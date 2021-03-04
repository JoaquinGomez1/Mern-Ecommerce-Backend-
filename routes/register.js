const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");

router.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
);

router.post("/api/register", async (req, res) => {
  const dataReceived = req.body;
  const userSchema = userModel(dataReceived);
  const userAlreadyRegistered = await userModel.findOne({
    username: userSchema.username,
  });
  const SALT_ROUNDS = 10;

  // ------------- Validation -------------
  if (Object.values(dataReceived).includes(""))
    return res.status(400).json({ message: "No empty fields" });

  if (userAlreadyRegistered)
    return res.status(400).json({ message: "Username already taken" });

  if (dataReceived.password.length < 8)
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });

  if (
    isNaN(dataReceived.phoneNumber) ||
    dataReceived.length < 10 ||
    dataReceived.length > 15
  )
    return res.status(400).json({ message: "Invalid phone number" });

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

    const { _id, username } = userSchema;

    // Save data into session (login user)
    req.session.userId = _id;
    req.session.username = username;

    // Send back a response
    res.status(200).json(schemaCopy);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Server error" }).status(500);
  }
});

module.exports = router;
