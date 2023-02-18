const express = require("express");
const { signup } = require("../services/auth.service");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
