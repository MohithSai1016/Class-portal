const express = require("express");

const router = express.Router();

const controller =
require("../controllers/timetablePortalController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

router.get(
    "/student/:rollNumber",
    authenticateToken,
    controller.student
);

router.get(
    "/faculty/:employeeId",
    authenticateToken,
    controller.faculty
);

module.exports = router;