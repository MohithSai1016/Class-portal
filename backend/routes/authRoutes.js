const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.get("/", (req, res) => {

    res.json({

        module: "Authentication API",

        version: "1.0"

    });

});

module.exports = router;