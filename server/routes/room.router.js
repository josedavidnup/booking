const express = require("express");
const router = express.Router();
const { loginVerification } = require("../middlewares");
const { create, rooms, image } = require("../services/room.service");
const formidableMiddleware = require("express-formidable");

router.post("/create-room", loginVerification, formidableMiddleware(), create);
router.get("/rooms", rooms);
router.get("/room/image/:roomId", image);

module.exports = router;
