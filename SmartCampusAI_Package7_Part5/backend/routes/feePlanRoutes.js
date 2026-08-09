const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/feePlanController");

router.get(
    "/installments/:studentFeeId",
    authenticateToken,
    controller.installments
);

router.post(
    "/installments",
    authenticateToken,
    authorizeRoles("admin"),
    controller.create
);

module.exports = router;
