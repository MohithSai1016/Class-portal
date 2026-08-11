const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/notificationAdminController");

router.get(
    "/search",
    authenticateToken,
    authorizeRoles("admin"),
    controller.search
);

router.get(
    "/statistics",
    authenticateToken,
    authorizeRoles("admin"),
    controller.statistics
);

router.post(
    "/cleanup",
    authenticateToken,
    authorizeRoles("admin"),
    controller.cleanup
);

module.exports = router;
