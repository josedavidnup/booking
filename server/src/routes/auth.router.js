const express = require("express");
const { gethotel } = require("../services/auth.service");
const router = express.Router();

// router.get("/", (req, res) => {
//   console.log("Hola mundo");
//   return res.json("Hola mundo");
// });
router.get("/", gethotel);

module.exports = router;
