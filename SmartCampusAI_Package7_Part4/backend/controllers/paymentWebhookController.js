const {
    verifySignature
} = require("../services/paymentVerificationService");

const {
    settlePayment
} = require("../services/paymentSettlementService");

async function webhook(req, res) {
    try {
        const signature = req.get("x-payment-signature");
        const secret = process.env.PAYMENT_WEBHOOK_SECRET;

        const rawBody =
            Buffer.isBuffer(req.body)
                ? req.body.toString("utf8")
                : JSON.stringify(req.body);

        if (!verifySignature(rawBody, signature, secret)) {
            return res.status(401).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        const event =
            JSON.parse(rawBody);

        if (event.type !== "payment.success") {
            return res.json({
                success: true,
                ignored: true
            });
        }

        const result =
            await settlePayment({
                gatewayOrderId: event.data.orderId,
                paymentReference: event.data.paymentId,
                amount: event.data.amount,
                paymentMethod: event.data.method || "UPI"
            });

        return res.json({
            success: true,
            result
        });
    } catch (error) {
        console.error("Payment webhook error:", error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { webhook };
