const express = require("express");

const router = express.Router();

const facultyController =
require("../controllers/facultyController");

const {
authenticateToken,
authorizeRoles
} =
require("../middleware/authMiddleware");

router.get(
"/",
authenticateToken,
facultyController.list
);

router.post(
"/",
authenticateToken,
authorizeRoles("admin"),
facultyController.create
);

module.exports = router;