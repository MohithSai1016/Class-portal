const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    certificateUpload
} = require("../config/upload");

const controller =
    require("../controllers/certificateFileController");

router.post(
    "/:id/file",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    certificateUpload.single("certificate"),
    controller.upload
);

router.delete(
    "/:id/file",
    authenticateToken,
    authorizeRoles("admin"),
    controller.remove
);

module.exports = router;
