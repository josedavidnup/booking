require("dotenv").config();

module.exports = {
  port: process.env.PORT || "8080",
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET,
  stripeRedirect_Url: process.env.STRIPE_REDIRECT_URL,
};
