const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const publicRoute = require("../middlewares/publicRouteOnly");
const path = require("path");

router.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
);

router.post("/api/login", publicRoute, async (req, res) => {
  const { username, password } = req.body;

  if (Object.values(req.body).includes(""))
    return res.status(400).json({ message: "No empty fields" });

  try {
    const userFound = await userModel.findOne({
      username,
    });

    if (userFound) {
      const { _id } = userFound;
      const doPasswordsMatch = await bcrypt.compare(
        password,
        userFound.password
      );
      if (doPasswordsMatch) {
        const {
          username,
          address,
          email,
          country,
          shoppingHistory,
          userFavorites,
          role,
        } = userFound;

        req.session.userId = _id;
        req.session.username = userFound.username;

        return res.status(200).json({
          username,
          address,
          email,
          country,
          shoppingHistory,
          userFavorites,
          role,
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
