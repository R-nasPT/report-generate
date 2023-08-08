const { DataTypes } = require('sequelize');
const db = require('../db');
const File = require('./file')
const Customer = require('./customer');
const Operation = require('./operation');

const Configuration = db.generate.define('config', {
    configuration_info_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    doc_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    doc_name_eng: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
    },
    operation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    getdata_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    getdata_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    getdata_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    getdata_start_time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    getdata_end_time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    getdata_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    getdata_month_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    generate_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    generate_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    generate_next_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    generate_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    generate_month_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    create_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    create_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    tableName: 'configuration_info',
    timestamps: false
});

Configuration.hasMany(File, { foreignKey: "configuration_info_id" })
File.belongsTo(Configuration, { foreignKey: "configuration_info_id" })

Configuration.hasOne(Customer, { foreignKey: { name: 'customer_id', field: 'customer_id' }, sourceKey: 'customer_id' })
Configuration.hasOne(Operation, { foreignKey: { name: 'operation_id', field: 'operation_id' }, sourceKey: 'operation_id' })

module.exports = Configuration;