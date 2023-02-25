const express = require("express");
const router = express.Router();
const { loginVerification } = require("../middlewares");
const {
  createConnectAccount,
  getAccountStatus,
} = require("../services/stripe.service");

router.post("/create-connect-account", loginVerification, createConnectAccount);
router.post("/get-account-status", loginVerification, getAccountStatus);

module.exports = router;
