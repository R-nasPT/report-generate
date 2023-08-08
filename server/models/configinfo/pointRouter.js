const { DataTypes } = require("sequelize");
const db = require("../db");

const PointRouter = db.generate.define(
  "PointRouter",
  {
    point_router_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    point_router_name: {
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
    tableName: "point_router",
    timestamps: false,
  }
);

module.exports = PointRouter;
