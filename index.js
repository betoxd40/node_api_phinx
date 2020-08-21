const express = require("express");
const app = express();
const db = require("./src/models");
const bodyParser = require("body-parser");
const {
    generatePasswordEncrypted,
    comparePasswordEncrypted,
} = require("./src/utils/encode");
const { generateToken } = require("./src/utils/jwt");
const { authenticateToken } = require("./src/middlewares/auth");

const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route Users
app.get("/users", authenticateToken, async function(req, res) {
    const users = await db.User.findAll();

    res.json(users);
});

// Route Auth
app.post("/login", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    userExist = await _checkIfUserExist(email, password);

    if (!userExist)
        return res.status(401).send({
            error: "User credentials invalid",
        });

    const jwtPayload = _generateJWTPayload(email);
    const token = generateToken(jwtPayload);

    return res.json({
        token: token,
    });
});
app.post("/register", async function(req, res) {
    const passwordEncrypted = await generatePasswordEncrypted(req.body.password);

    let user = {...req.body, password: passwordEncrypted };
    user = await db.User.create(user);

    res.json(user);
});

app.listen(PORT, function() {
    console.log("-------------------- CRUD API STARTING -------------------");
    db.sequelize.sync();
});

const _generateJWTPayload = (email) => {
    return {
        email,
    };
};
const _checkIfUserExist = async(email, password) => {
    const user = await db.User.findOne({
        where: {
            email,
        },
    });

    return user ? comparePasswordEncrypted(password, user.password) : false;
};