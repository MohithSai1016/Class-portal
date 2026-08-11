const service =
    require("../services/bulkCertificateService");

async function issue(req, res) {
    try {
        const result =
            await service.issueBulk(
                req.body
            );

        res.status(201).json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { issue };
