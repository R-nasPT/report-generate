const { DataTypes } = require('sequelize');
const db = require('../db');

const Member = db.siteInfo.define('Member', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IsAdmin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'EmployeeEncryp', 
  timestamps: false, 
});

module.exports = Member;

