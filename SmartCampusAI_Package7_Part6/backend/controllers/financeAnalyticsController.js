const service = require("../services/financeAnalyticsService");

async function dashboard(req, res) {
    try {
        const data = await service.dashboard();
        res.json({ success: true, ...data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { dashboard };
