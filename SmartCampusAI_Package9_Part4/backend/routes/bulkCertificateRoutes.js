const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/bulkCertificateController");

router.post(
    "/issue",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.issue
);

module.exports = router;
