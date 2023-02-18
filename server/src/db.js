const { Sequelize } = require("sequelize");
const UserModel = require("./schemas/user.schema");
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require("../utils/config");

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const User = UserModel(sequelize);

module.exports = {
  conn: sequelize,
  User,
};
