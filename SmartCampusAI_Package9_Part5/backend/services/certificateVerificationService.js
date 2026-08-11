const repository =
    require("../models/CertificateRepository");

async function verify(code) {
    const certificate =
        await repository.findByVerificationCode(
            String(code || "").trim()
        );

    if (!certificate) {
        return {
            valid: false,
            reason: "Certificate not found"
        };
    }

    if (certificate.status === "Revoked") {
        return {
            valid: false,
            reason: "Certificate has been revoked",
            certificate
        };
    }

    if (certificate.status !== "Issued") {
        return {
            valid: false,
            reason: "Certificate is not currently issued",
            certificate
        };
    }

    return {
        valid: true,
        reason: "Certificate is valid",
        certificate
    };
}

module.exports = { verify };
