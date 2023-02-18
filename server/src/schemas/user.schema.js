const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize) => {
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
      hooks: {
        beforeCreate: async (user, options) => {
          return bcrypt
            .hash(user.password, 12)
            .then((hash) => {
              user.password = hash;
            })
            .catch((err) => {
              throw Error(`Bcrypt hash error ${err}`);
            });
        },
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
