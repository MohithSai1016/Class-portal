const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        module: "Authentication",
        status: "Ready"
    });
});

module.exports = router;