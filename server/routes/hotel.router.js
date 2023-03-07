const express = require("express");
const { getHotelByCity } = require("../services/hotel.service");
const router = express.Router();

router.get("/hotel-by-city", getHotelByCity);

module.exports = router;
