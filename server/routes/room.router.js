const express = require("express");
const router = express.Router();
const { loginVerification } = require("../middlewares");
const { create, rooms } = require("../services/room.service");
const formidableMiddleware = require("express-formidable");

router.post("/create-room", loginVerification, formidableMiddleware(), create);
router.get("/rooms", loginVerification, formidableMiddleware(), rooms);

module.exports = router;
