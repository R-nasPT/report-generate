const { DataTypes } = require('sequelize');
const db = require('../db');

const File = db.generate.define('picture', {
    file_info_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        
    },
    name_en: {
        type: DataTypes.STRING,
        
    },
    configuration_info_id: {
        type: DataTypes.INTEGER,
        
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
},{
    tableName: 'file_info',
    timestamps: false,
});

module.exports = File;