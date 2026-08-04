const express = require("express");

const router = express.Router();

const subjectController =
require("../controllers/subjectController");

const {
authenticateToken,
authorizeRoles
} =
require("../middleware/authMiddleware");

router.get(
"/",
authenticateToken,
subjectController.list
);

router.post(
"/",
authenticateToken,
authorizeRoles("admin"),
subjectController.create
);

module.exports = router;