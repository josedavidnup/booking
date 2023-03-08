require("dotenv").config();

module.exports = {
  port: process.env.PORT || "8080",
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET,
  stripeRedirect_Url: process.env.STRIPE_REDIRECT_URL,
  stripe_Setting_Redirect_Url: process.env.STRIPE_SETTING_REDIRECT_URL,
  stripe_success_Url: process.env.STRIPE_SUCCESS_URL,
  stripe_cancel_Url: process.env.STRIPE_CANCEL_URL,
};
