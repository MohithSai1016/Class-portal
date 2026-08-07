const express = require("express");

const router = express.Router();

const controller =
require("../controllers/feeController");

const {

authenticateToken

} =
require("../middleware/authMiddleware");

router.get(

"/student/:studentId",

authenticateToken,

controller.student

);

module.exports = router;