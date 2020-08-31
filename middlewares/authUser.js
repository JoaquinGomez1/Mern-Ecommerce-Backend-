const userSchema = require("../models/userModel");

// User will be authenticated if it's id matches with anyone on the database
export function authUser(req, res, next) {
  // model.findById will throw an error if the id passed it's not a valid ObjectId.
  try {
    const user = userSchema.findById(req.body.user._id);
    if (user) {
      next();
    }

    return;
  } catch (err) {
    console.log(err);
    return;
  }
}
