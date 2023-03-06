const express = require("express");
const router = express.Router();
const { loginVerification } = require("../middlewares");
const {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
  stripeSuccess,
} = require("../services/stripe.service");

router.post("/create-connect-account", loginVerification, createConnectAccount);
router.post("/get-account-status", loginVerification, getAccountStatus);
router.post("/get-account-balance", loginVerification, getAccountBalance);
router.post("/payout-setting", loginVerification, payoutSetting);
router.post(`/stripe-session-id`, loginVerification, stripeSessionId);

// stripe orders
router.post(`/stripe-success`, loginVerification, stripeSuccess);

module.exports = router;
