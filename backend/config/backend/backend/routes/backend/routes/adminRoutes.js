const express = require("express");

const router = express.Router();

const adminController =
require("../controllers/adminController");

const {
authenticateToken,
authorizeRoles
} =
require("../middleware/authMiddleware");

router.get(

"/dashboard",

authenticateToken,

authorizeRoles("admin"),

adminController.dashboard

);

module.exports = router;
