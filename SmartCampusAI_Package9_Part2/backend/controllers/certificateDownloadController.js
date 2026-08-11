const path = require("path");

const repository =
    require("../models/CertificateRepository");

const fileService =
    require("../services/certificateFileService");

async function download(req, res) {
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

        if (!certificate.file_path) {
            return res.status(404).json({
                success: false,
                message: "Certificate file not available"
            });
        }

        const absolutePath =
            fileService.getAbsolutePath(
                certificate.file_path
            );

        if (!absolutePath) {
            return res.status(404).json({
                success: false,
                message: "Certificate file not available"
            });
        }

        const safeFileName =
            `${certificate.title
                .replace(/[^a-z0-9-_ ]/gi, "")
                .trim()
                .replace(/\s+/g, "-")
                .slice(0, 80) || "certificate"}.pdf`;

        res.download(
            absolutePath,
            safeFileName,
            error => {
                if (
                    error &&
                    !res.headersSent
                ) {
                    res.status(404).json({
                        success: false,
                        message:
                            "Unable to download certificate"
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    download
};
