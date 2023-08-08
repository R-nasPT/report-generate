const { DataTypes } = require('sequelize');
const db = require('../db');

const Customers = db.generate.define('Customers', {
    customer_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    full_name: {
        type:DataTypes.STRING
    },
    initials: {
        type:DataTypes.STRING
    },
    full_name_thai: {
        type:DataTypes.STRING
    },
    address: {
        type:DataTypes.STRING
    },
    tel: {
        type:DataTypes.STRING
    },
    contract: {
        type:DataTypes.STRING
    },
    line_token: {
        type:DataTypes.STRING
    },
    priority: {
        type:DataTypes.STRING
    }
},{
    tableName: 'customer_lists',
    timestamps: false
});

module.exports = Customers;