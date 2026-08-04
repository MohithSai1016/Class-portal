const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

async function login(data) {

    const { username, password } = data;

    if (!username || !password) {

        throw new Error("Username and password are required.");

    }

    const user = await User.findByUsername(username);

    if (!user) {

        throw new Error("User not found.");

    }

    const validPassword = await bcrypt.compare(

        password,

        user.password

    );

    if (!validPassword) {

        throw new Error("Invalid password.");

    }

    const token = jwt.sign(

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

    return {

        success: true,

        token,

        user: {

            id: user.id,

            username: user.username,

            role: user.role

        }

    };

}

module.exports = {

    login

};