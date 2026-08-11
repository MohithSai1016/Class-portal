const service =
    require("../services/certificateAdminService");

async function search(req, res) {
    try {
        const certificates =
            await service.search(req.query);

        res.json({
            success: true,
            certificates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function statistics(req, res) {
    try {
        const data =
            await service.statistics();

        res.json({
            success: true,
            ...data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function issue(req, res) {
    try {
        const id =
            await service.issue(req.body);

        res.status(201).json({
            success: true,
            certificateId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    search,
    statistics,
    issue
};
