const express = require("express");

const router = express.Router();

const controller =
require("../controllers/aiSchedulerController");

const {

authenticateToken,

authorizeRoles

} =
require("../middleware/authMiddleware");

router.post(

"/generate",

authenticateToken,

authorizeRoles("admin"),

controller.generate

);

module.exports = router;