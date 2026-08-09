const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRoles } =
    require("../middleware/authMiddleware");

const controller = require("../controllers/feeReminderController");

router.post(
    "/generate",
    authenticateToken,
    authorizeRoles("admin"),
    controller.generate
);

module.exports = router;
