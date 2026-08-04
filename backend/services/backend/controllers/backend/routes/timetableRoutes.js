const express = require("express");

const router = express.Router();

const timetableController =
require("../controllers/timetableController");

const {
authenticateToken
} =
require("../middleware/authMiddleware");

router.get(
"/",
authenticateToken,
timetableController.list
);

module.exports = router;