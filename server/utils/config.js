require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
};
