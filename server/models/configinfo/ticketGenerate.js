const { DataTypes } = require('sequelize');
const db = require('../db');

const File = require('./file');
const TicketDetail = require('./ticketDetail');
const Configuration = require('./configuration');
const Customers = require('./customer');

const TicketGenerate = db.generate.define('TicketGenerate', {

    ticket_generate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticket_order: {
        type: DataTypes.STRING,
    },
    ticket_bank: {
        type: DataTypes.STRING,
    },
    onsite_date: {
        type: DataTypes.DATE,
    },
    customer_name: {
        type: DataTypes.STRING,
    },
    site_name: {
        type: DataTypes.STRING,
    },
    stationId: {
        type: DataTypes.STRING,
    },
    circuitId: {
        type: DataTypes.STRING,
    },
    problem: {
        type: DataTypes.STRING,
    },
    atm_type: {
        type: DataTypes.STRING,
    },
    ppot_staff: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    },
    configuration_info_id: {
        type: DataTypes.INTEGER,
    },
    customer_id: {
        type: DataTypes.INTEGER,
    },
    ticket_id: {
        type: DataTypes.BIGINT,
    },
    plug_atm: {
        type: DataTypes.STRING,
    },
    plug_router: {
        type: DataTypes.STRING,
    },
    ups_bank: {
        type: DataTypes.STRING,
    },
    point_router: {
        type: DataTypes.STRING,
    },
    remark: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'ticket_generate',
    timestamps: false
});

TicketGenerate.hasOne(Configuration, { foreignKey: { name: 'configuration_info_id', field: 'configuration_info_id' }, sourceKey: 'configuration_info_id' })
TicketGenerate.hasOne(Customers, { foreignKey: { name: 'customer_id', field: 'customer_id' }, sourceKey: 'customer_id' })

TicketGenerate.belongsToMany(File, { through: TicketDetail, foreignKey: 'ticket_generate_id', sourceKey: 'ticket_generate_id' })
File.belongsToMany(TicketGenerate, { through: TicketDetail, foreignKey: 'file_info_id', sourceKey: 'file_info_id' })
module.exports = TicketGenerate;