const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRoles } =
    require("../middleware/authMiddleware");

const controller = require("../controllers/financeAnalyticsController");

router.get(
    "/dashboard",
    authenticateToken,
    authorizeRoles("admin"),
    controller.dashboard
);

module.exports = router;
