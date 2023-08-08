const { DataTypes } = require("sequelize");
const db = require("../db");

const PlugRouter = db.generate.define(
  "PlugRouter",
  {
    plug_router_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plug_router_name: {
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
    tableName: "plug_router",
    timestamps: false,
  }
);

module.exports = PlugRouter;
