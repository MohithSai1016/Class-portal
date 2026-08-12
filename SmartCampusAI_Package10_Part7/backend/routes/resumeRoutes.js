const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    upload
} = require("../config/uploadConfig");

const controller =
    require("../controllers/resumeController");

router.post(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    upload.single("resume"),
    controller.uploadResume
);

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.downloadMine
);

module.exports = router;
