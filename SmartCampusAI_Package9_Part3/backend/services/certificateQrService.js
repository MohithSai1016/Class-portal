const QRCode = require("qrcode");

function getVerificationUrl(code) {
    const baseUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:5500";

    return `${baseUrl}/pages/shared/verify-certificate.html?code=${encodeURIComponent(code)}`;
}

async function generateDataUrl(code) {
    const url =
        getVerificationUrl(code);

    return QRCode.toDataURL(url, {
        width: 300,
        margin: 2
    });
}

module.exports = {
    getVerificationUrl,
    generateDataUrl
};
