const express = require("express");

const router = express.Router();

const controller =
require("../controllers/gradebookController");

const {

authenticateToken,

authorizeRoles

} =
require("../middleware/authMiddleware");

router.get(

"/assessments",

authenticateToken,

controller.assessments

);

router.post(

"/marks",

authenticateToken,

authorizeRoles("admin","faculty"),

controller.save

);

module.exports = router;