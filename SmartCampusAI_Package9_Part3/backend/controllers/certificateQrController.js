const service =
    require("../services/certificateQrService");

const repository =
    require("../models/CertificateRepository");

async function generate(req, res) {
    try {
        const certificate =
            await repository.findById(
                Number(req.params.id)
            );

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        if (
            req.user.role === "student" &&
            Number(certificate.student_user_id) !==
                Number(req.user.id)
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        const qrDataUrl =
            await service.generateDataUrl(
                certificate.verification_code
            );

        res.json({
            success: true,
            verificationUrl:
                service.getVerificationUrl(
                    certificate.verification_code
                ),
            qrDataUrl
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { generate };
