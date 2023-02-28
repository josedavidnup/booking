const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utils/config.js");

const loginVerification = (req, res, next) => {
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

// const loginVerification = (req, res, next) => {
//   const token = req.cookies.token;
//   try {
//     if (!token) return res.status(403).send("Access denied.");
//     const decoded = jwt.verify(token, jwtSecret);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.clearCookie("token");
//     res.status(400).send("Invalid token");
//   }
// };

module.exports = { loginVerification };
