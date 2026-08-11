const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificatePdfController");

router.post(
    "/:id/generate-pdf",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.generate
);

module.exports = router;
