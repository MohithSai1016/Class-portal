const express = require("express");
const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificateQrController");

router.get(
    "/:id/qr",
    authenticateToken,
    controller.generate
);

module.exports = router;
