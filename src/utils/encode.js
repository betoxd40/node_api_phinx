const env = process.env.NODE_ENV || "development";
const bcrypt = require("bcrypt");
const config = require(__dirname + "/../../config/config.json")[env];

const generatePasswordEncrypted = (password) => {
    const salt = bcrypt.genSaltSync(config.bcrypt.salt);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

const comparePasswordEncrypted = (password, hash) =>
    bcrypt.compareSync(password, hash);

module.exports = { generatePasswordEncrypted, comparePasswordEncrypted };