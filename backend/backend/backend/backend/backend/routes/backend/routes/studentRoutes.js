const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        module: "Student API",
        status: "Ready"
    });
});

module.exports = router;