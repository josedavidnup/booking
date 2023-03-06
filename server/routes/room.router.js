const express = require("express");
const router = express.Router();
const { loginVerification, roomOwner } = require("../middlewares");
const {
  create,
  rooms,
  image,
  sellerRooms,
  remove,
  read,
  update,
} = require("../services/room.service");
const formidableMiddleware = require("express-formidable");

router.post("/create-room", loginVerification, formidableMiddleware(), create);
router.get("/rooms", rooms);
router.get("/room/image/:roomId", image);
router.get("/seller-rooms", loginVerification, sellerRooms);
router.delete("/delete-room/:roomId", loginVerification, roomOwner, remove);
router.get("/room/:roomId", read);
router.put(
  "/update-room/:roomId",
  loginVerification,
  roomOwner,
  formidableMiddleware(),
  update
);

module.exports = router;
