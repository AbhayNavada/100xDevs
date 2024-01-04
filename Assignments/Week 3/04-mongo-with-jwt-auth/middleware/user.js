const { User } = require("../db/index");

const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(' ')[1];

    try {
        const data = jwt.verify(token, jwtPassword);
        next();
    } catch (err) {
        res.status(401).json({
            message: "Access denied"
        });
    }
}

module.exports = userMiddleware;