const {
    verifySignature
} = require("../services/paymentVerificationService");

async function webhook(req, res) {
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

    // Package 7 Part 4 will persist verified events,
    // update the fee ledger, and generate receipts.
    return res.json({
        success: true,
        message: "Webhook verified"
    });
}

module.exports = { webhook };
