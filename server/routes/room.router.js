const express = require("express");
const router = express.Router();
const { loginVerification } = require("../middlewares");
const {
  create,
  rooms,
  image,
  sellerRooms,
} = require("../services/room.service");
const formidableMiddleware = require("express-formidable");

router.post("/create-room", loginVerification, formidableMiddleware(), create);
router.get("/rooms", rooms);
router.get("/room/image/:roomId", image);
router.get("/seller-rooms", loginVerification, sellerRooms);

module.exports = router;
