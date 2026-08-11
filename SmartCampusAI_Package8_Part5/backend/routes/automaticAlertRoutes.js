const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/automaticAlertController");

router.post(
    "/attendance",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.attendance
);

router.post(
    "/fees",
    authenticateToken,
    authorizeRoles("admin"),
    controller.fees
);

router.post(
    "/academic",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.academic
);

router.post(
    "/placement",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.placement
);

module.exports = router;
