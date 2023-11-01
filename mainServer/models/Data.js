const sequelize = require('sequelize');
const db = require('../configs/database.js');

const Data = db.define('data',{
    position: {
        primaryKey: true,
        type: sequelize.INTEGER(30),
        autoIncrement: true,
    },
    item_id: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    user :{
        type: sequelize.STRING(200),
        allowNull: true
    },
    status:{
        type: sequelize.STRING(100),
        allowNull: false,
        default: 'new'
    },
    key: {
        type: sequelize.STRING(1000),
        unique: true,
        allowNull: false
    },
    data: {
        type: sequelize.STRING(1000),
        // get: function() {
        //     return JSON.parse(this.getDataValue('options'));
        // },
        // set: function(val) {
        //     return this.setDataValue('options', JSON.stringify(val));
        // },
        allowNull: false
    },
},{
    timestamps: true,
    // freezeTableName: true,
    // tableName: 'actions'
});
// Data.sync({force: true});
module.exports = Data;