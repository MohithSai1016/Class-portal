const express = require("express");
const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    list
} = require("../controllers/receiptController");

router.get(
    "/student/:studentId",
    authenticateToken,
    list
);

module.exports = router;
