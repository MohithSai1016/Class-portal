const crypto = require("crypto");

/**
 * Generic HMAC verification helper.
 * Configure the gateway-specific signing algorithm/secret through
 * environment variables. Never trust payment success from the browser alone.
 */
function verifySignature(payload, signature, secret) {
    if (!payload || !signature || !secret) return false;

    const expected = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

    const a = Buffer.from(expected);
    const b = Buffer.from(signature);

    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

module.exports = { verifySignature };
