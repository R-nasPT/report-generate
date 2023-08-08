const { DataTypes } = require("sequelize");
const db = require("../db");

const TicketDetail = db.generate.define(
  "ticketDetail",
  {
    ticket_file_detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_info_id: {
      type: DataTypes.INTEGER,
    },
    ticket_generate_id: {
      type: DataTypes.INTEGER,
    },
    file_name: {
      type: DataTypes.STRING,
    },
    create_by: {
      type: DataTypes.INTEGER,
    },
    create_time: {
      type: DataTypes.DATE,
    },
    update_by: {
      type: DataTypes.INTEGER,
    },
    update_time: {
      type: DataTypes.DATE,
    },
    visible: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "ticket_file_detail",
    timestamps: false,
  }
);

module.exports = TicketDetail;
