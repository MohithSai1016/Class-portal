const service =
    require("../services/notificationPreferenceService");

async function get(req, res) {
    try {
        const preferences =
            await service.get(req.user.id);

        res.json({
            success: true,
            preferences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const preferences =
            await service.update(
                req.user.id,
                req.body
            );

        res.json({
            success: true,
            preferences
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { get, update };
