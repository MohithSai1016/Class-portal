const authService = require("../services/authService");

async function login(req, res) {

    try {

        const result = await authService.login(req.body);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {

    login

};
