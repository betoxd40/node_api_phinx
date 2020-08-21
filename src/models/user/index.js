/** 
 * User Model
 */

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        dni: {
            type: Sequelize.INTEGER,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        phone: {
            type: Sequelize.INTEGER,
        },
    });

    return User;
};