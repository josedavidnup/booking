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
  userRoomBookings,
  isAlreadyBooked,
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
router.get("/user-room-bookings", loginVerification, userRoomBookings);
router.get("/is-already-booked/:roomId", loginVerification, isAlreadyBooked);

module.exports = router;
