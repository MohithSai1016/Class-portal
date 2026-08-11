const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificateAdminController");

router.get(
    "/search",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.search
);

router.get(
    "/statistics",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.statistics
);

router.post(
    "/issue",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.issue
);

module.exports = router;
