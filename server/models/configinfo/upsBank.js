const { DataTypes } = require("sequelize");
const db = require("../db");

const UPS = db.generate.define(
  "UPS",
  {
    ups_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ups_name: {
      type: DataTypes.STRING,
    },
    create_time: {
      type: DataTypes.DATE,
    },
    visible: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "ups_bank",
    timestamps: false,
  }
);

module.exports = UPS;
