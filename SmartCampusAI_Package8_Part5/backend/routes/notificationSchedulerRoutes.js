const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/notificationSchedulerController");

router.post(
    "/process",
    authenticateToken,
    authorizeRoles("admin"),
    controller.process
);

module.exports = router;
