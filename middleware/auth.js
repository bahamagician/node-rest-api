const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) next();
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    next();
  }
};
