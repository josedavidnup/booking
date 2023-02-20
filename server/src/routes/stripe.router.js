const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middlewares");
const { createConnectAccount } = require("../services/stripe.service");

router.post("/create-connect-account", requireSignIn, createConnectAccount);

module.exports = router;
