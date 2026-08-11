const express = require("express");
const router = express.Router();

const controller =
    require("../controllers/certificateVerificationController");

router.get(
    "/:code",
    controller.verify
);

module.exports = router;
