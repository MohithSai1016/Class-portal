const authService = require("../services/authService");

async function studentLogin(req, res) {

    try {

        const { username, password } = req.body;

        const result =
            await authService.authenticate(
                username,
                password,
                "student"
            );

        res.json(result);

    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

}

async function adminLogin(req, res) {

    try {

        const { username, password } = req.body;

        const result =
            await authService.authenticate(
                username,
                password,
                "admin"
            );

        res.json(result);

    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

}

module.exports = {

    studentLogin,

    adminLogin

};