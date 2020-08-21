const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const Sequelize = require("sequelize");


const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    define: {
        timestamps: false
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const userModel = require("./user")(sequelize, Sequelize);

db.User = userModel;

module.exports = db;