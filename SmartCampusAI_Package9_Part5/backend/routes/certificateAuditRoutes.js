const express = require("express");
const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificateAuditController");

router.get(
    "/:id/audit",
    authenticateToken,
    controller.history
);

module.exports = router;
