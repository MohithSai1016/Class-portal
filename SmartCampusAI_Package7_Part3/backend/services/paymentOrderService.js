const crypto = require("crypto");

/**
 * Creates a gateway-neutral payment order payload.
 * A real gateway SDK should be called from the adapter layer.
 */
function createPaymentOrder({ studentFeeId, amount, currency = "INR" }) {
    if (!studentFeeId) throw new Error("studentFeeId is required");
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
        throw new Error("amount must be greater than zero");
    }

    return {
        orderId: `SCA_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
        studentFeeId,
        amount: Number(amount).toFixed(2),
        currency
    };
}

module.exports = { createPaymentOrder };
