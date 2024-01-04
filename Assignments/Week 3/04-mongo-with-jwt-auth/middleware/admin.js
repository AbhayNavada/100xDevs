const { Admin } = require("../db/index");

const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(' ')[1];

    try {
        const admin = jwt.verify(token, jwtPassword);
        next();
    } catch (err) {
        res.status(400).json({
            message: "Access denied"
        });
    }
}

module.exports = adminMiddleware;