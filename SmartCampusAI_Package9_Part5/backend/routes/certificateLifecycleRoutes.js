const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificateLifecycleController");

router.post(
    "/issue",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.issue
);

router.patch(
    "/:id/revoke",
    authenticateToken,
    authorizeRoles("admin"),
    controller.revoke
);

module.exports = router;
