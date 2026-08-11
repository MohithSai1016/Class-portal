const service =
    require("../services/certificateVerificationService");

async function verify(req, res) {
    try {
        const result =
            await service.verify(
                req.params.code
            );

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { verify };
