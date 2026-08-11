const express = require("express");
const router = express.Router();

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificateDownloadController");

router.get(
    "/:id/download",
    authenticateToken,
    controller.download
);

module.exports = router;
