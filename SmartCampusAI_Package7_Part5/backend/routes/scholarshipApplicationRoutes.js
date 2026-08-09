const express = require("express");
const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/scholarshipApplicationController");

router.post(
    "/",
    authenticateToken,
    controller.apply
);

router.get(
    "/student/:studentId",
    authenticateToken,
    controller.list
);

module.exports = router;
