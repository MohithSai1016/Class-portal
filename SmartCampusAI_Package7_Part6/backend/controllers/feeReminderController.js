const service = require("../services/feeReminderService");

async function generate(req, res) {
    try {
        const result = await service.generateReminders();
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { generate };
