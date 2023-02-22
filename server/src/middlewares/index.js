const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../utils/config.js");

const requireSignIn = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ");
    // console.log(token);
    if (!authorization) return res.status(403).send("Access denied.");
    const decoded = jwt.verify(token[1], jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = { requireSignIn };
