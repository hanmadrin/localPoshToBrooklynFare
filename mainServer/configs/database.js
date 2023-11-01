const sequelize = require('sequelize');
require('dotenv').config();
// console.log(process.env.DATABASE_NAME);
// console.log(process.env.DATABASE_USERNAME);
// console.log(process.env.DATABASE_PASSWORD);
module.exports = new sequelize(
    "localPosh",
    "root",
    "",
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8',
            multipleStatements: true
        },
        logging: false,
    }
);