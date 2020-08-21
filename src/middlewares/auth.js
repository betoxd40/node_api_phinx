const { isTokenValid } = require("../utils/jwt");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) // if there isn't any token

    if (isTokenValid()) return next()
    return res.sendStatus(403)
}

module.exports = { authenticateToken }