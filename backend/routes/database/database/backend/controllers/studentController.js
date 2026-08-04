const api = require("../utils/apiResponse");

async function dashboard(req, res) {

    api.success(

        res,

        "Student Dashboard Loaded",

        {

            user: req.user

        }

    );

}

module.exports = {

    dashboard

};