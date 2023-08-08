const { DataTypes } = require('sequelize');
const db = require('../db');

const Operation = db.generate.define('op', {
    operation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    operation_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ticketdep_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    create_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    create_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    update_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    update_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{
    tableName: 'operations',
    timestamps: false,
});

module.exports = Operation;