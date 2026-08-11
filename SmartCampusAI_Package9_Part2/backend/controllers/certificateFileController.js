const service =
    require("../services/certificateFileService");

async function upload(req, res) {
    try {
        const certificateId =
            Number(req.params.id);

        if (!Number.isInteger(certificateId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid certificate ID"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF certificate file is required"
            });
        }

        const path =
            await service.attachFile(
                certificateId,
                req.file
            );

        res.json({
            success: true,
            filePath: path
        });
    } catch (error) {
        if (req.file) {
            try {
                const fs = require("fs");

                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            } catch (_) {}
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function remove(req, res) {
    try {
        await service.removeFile(
            Number(req.params.id)
        );

        res.json({
            success: true
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    upload,
    remove
};
