const userModel = require("../models/userModel");

async function adminOnly(req, res, next) {
  const { userId } = req.session;
  if (!userId) return res.status(401).json({ message: "Must be logged in" });
  const user = await userModel.findById(userId);

  if (user.role !== "admin")
    return res.status(401).json({ message: "Unauthorized" });
  else next();
}

module.exports = adminOnly;
