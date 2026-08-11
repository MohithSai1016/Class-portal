const service =
    require("../services/notificationAdminService");

async function search(req, res) {
    try {
        const notifications =
            await service.search(req.query);

        res.json({
            success: true,
            notifications
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

async function cleanup(req, res) {
    try {
        const days =
            Number(req.body.days || 90);

        const deleted =
            await service.cleanup(days);

        res.json({
            success: true,
            deleted
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
    cleanup
};
