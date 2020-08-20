const router = require("express").Router();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

router.post("/register", async (req, res) => {
  const dataReceived = userModel(req.body);

  try {
    const itemSaved = await dataReceived.save();
    console.log("Saved: ", itemSaved);
  } catch (err) {
    res.json({ message: "Server error" }).status(500);
    console.log(err);
  }

  res.json({ message: "received" }).status(200);
});

module.exports = router;
