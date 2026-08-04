const express = require("express");

const router = express.Router();

const attendanceController =
require("../controllers/attendanceController");

const {
    authenticateToken
} =
require("../middleware/authMiddleware");

router.get(

"/student",

authenticateToken,

attendanceController.studentAttendance

);

module.exports = router;