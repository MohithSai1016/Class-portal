const express = require("express");

const router = express.Router();

const controller =
require("../controllers/timetableGeneratorController");

const {
authenticateToken,
authorizeRoles
} =
require("../middleware/authMiddleware");

router.post(
"/",
authenticateToken,
authorizeRoles("admin"),
controller.generate
);

module.exports = router;