// Check whether an id exits or not is the most perfomant solution for this demo project
function authUser(req, res, next) {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "Access denied, must be logged in" });
  } else next();
}

module.exports = authUser;
