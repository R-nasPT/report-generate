const { Sequelize } = require('sequelize');

const generate = new Sequelize(process.env.DB_REPORT_GENERATOR, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
        options: {  
            encrypt: false,
        }
    }
});

const siteInfo = new Sequelize(process.env.DB_SITEINFO, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
        options: {  
            encrypt: false,
        }
    }
});

module.exports = {
    siteInfo: siteInfo , 
    generate : generate
}