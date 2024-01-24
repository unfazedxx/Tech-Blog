//Configure sequelize library for our database

const sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//allow us to use JAWSDB
if (process.env.JAWSDB_URL) {
    sequelize - new sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3001
        }
    );
}

//export sequelize for us to use 
module.exports = sequelize;