const express = require("express");

const router = express.Router();

const authController =
require("../controllers/authController");

router.post(
"/student/login",
authController.studentLogin
);

router.post(
"/admin/login",
authController.adminLogin
);

router.get("/", (req, res) => {

    res.json({

        module: "Authentication",

        version: "2.0"

    });

});

module.exports = router;