const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middlewares");
const {
  createConnectAccount,
  getAccountStatus,
} = require("../services/stripe.service");

router.post("/create-connect-account", requireSignIn, createConnectAccount);
router.post("/get-account-status", requireSignIn, getAccountStatus);

module.exports = router;
