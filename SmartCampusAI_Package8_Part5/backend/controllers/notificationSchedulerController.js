const scheduler =
    require("../services/notificationSchedulerService");

async function process(req, res) {
    try {
        const result =
            await scheduler.processPending();

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

module.exports = { process };
