const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {

    res.json({

        ai: "Online",

        camera: "Connected",

        recognition: "Ready"

    });

});

module.exports = router;