const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    createOrder
} = require("../controllers/paymentOrderController");

const {
    webhook
} = require("../controllers/paymentWebhookController");

router.post(
    "/orders",
    authenticateToken,
    authorizeRoles("student", "admin"),
    createOrder
);

// The webhook must be reachable by the payment provider.
// Signature verification is mandatory.
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
