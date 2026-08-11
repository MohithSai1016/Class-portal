const service =
    require("../services/certificatePdfService");

async function generate(req, res) {
    try {
        const filePath =
            await service.generateForId(
                Number(req.params.id)
            );

        res.json({
            success: true,
            filePath
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { generate };
