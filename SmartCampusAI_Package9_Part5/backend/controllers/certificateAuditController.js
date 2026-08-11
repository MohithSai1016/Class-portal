const auditService =
    require("../services/certificateAuditService");

const certificateService =
    require("../services/certificateService");

async function history(req, res) {
    try {
        const certificate =
            await certificateService.getById(
                req.params.id
            );

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

        const logs =
            await auditService.history(
                req.params.id
            );

        res.json({
            success: true,
            logs
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { history };
