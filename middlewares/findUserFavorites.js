const userSchema = require("../models/userModel");
const productsSchema = require("../models/productModel");

async function findUserFavorites(req, res, next) {
  const user = await userSchema.findById(req.body._id);
  if (!user) next();

  // Will return an array of every favorite item that user has
  const favorites = await productsSchema.find({
    _id: { $in: user.favoriteProducts },
  });

  res.userFavorites = favorites;
  next();
}

module.exports = findUserFavorites;
