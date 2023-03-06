const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utils/config.js");
const Room = require("../schemas/room.schema");

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

const roomOwner = async (req, res, next) => {
  const room = await Room.findById(req.params.roomId).exec();
  const owner = room.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

module.exports = { loginVerification, roomOwner };
