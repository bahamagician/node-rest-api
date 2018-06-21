const jwt = require("jsonwebtoken");

module.exports = async function(req, res, next) {
  let token = await req.header("Authorization");
  if (!token || !token.includes("Bearer ")) {
    return next();
  }
  token = token.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    next();
  }
};
