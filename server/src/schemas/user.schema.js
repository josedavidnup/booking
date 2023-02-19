const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const User = (sequelize) => {
  return sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
          notNull: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6,
        max: 64,
      },
    },
    {
      timestamps: true,
    }
  );
};

// stripe_account_id: "",
//   stripe_seller: {},
//   stripeSession: {},

module.exports = User;
