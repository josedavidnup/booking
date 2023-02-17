require("dotenv").config();

module.exports = {
  port: process.env.PORT || "8080",
  dbName: process.env.DB_NAME || "booking",
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgresql",
  dbPort: process.env.DB_PORT || "5432",
  dbHost: process.env.DB_HOST || "localhost",
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
};
