const express = require("express");
const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/notificationPreferenceController");

router.get(
    "/",
    authenticateToken,
    controller.get
);

router.patch(
    "/",
    authenticateToken,
    controller.update
);

module.exports = router;
