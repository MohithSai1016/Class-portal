const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/announcementDeliveryController");

router.post(
    "/:id/deliver",
    authenticateToken,
    authorizeRoles("admin"),
    controller.deliver
);

module.exports = router;
