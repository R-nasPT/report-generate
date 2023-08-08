const { DataTypes } = require("sequelize");
const db = require("../db");

const PlugAtm = db.generate.define(
  "PlugAtm",
  {
    plug_atm_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plug_atm_name: {
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
    tableName: "plug_atm",
    timestamps: false,
  }
);

module.exports = PlugAtm;
