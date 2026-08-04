const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

function generateToken(user) {

    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

}

async function authenticate(username, password, expectedRole) {

    if (!username || !password) {
        throw new Error("Username and password are required.");
    }

    const user = await User.findByUsername(username);

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.role !== expectedRole) {
        throw new Error("Invalid account type.");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Incorrect password.");
    }

    const token = generateToken(user);

    return {

        success: true,

        token,

        user: {

            id: user.id,

            username: user.username,

            fullName: user.full_name,

            role: user.role

        }

    };

}

module.exports = {

    authenticate

};