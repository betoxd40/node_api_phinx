const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
const jwt = require("jsonwebtoken");

const generateToken = payload =>
    jwt.sign(payload, config.jwt.key, {
        expiresIn: config.jwt.expiresIn, // expires in 24 hours
    });

const isTokenValid = token => {
    try {
        jwt.verify(token, config.jwt.key)
        return true
    } catch (error) {
        // We should log the error
        console.log(error)
        return false
    }
}

module.exports = { generateToken, isTokenValid };