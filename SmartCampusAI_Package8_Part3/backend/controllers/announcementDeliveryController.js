const delivery = require("../services/announcementDeliveryService");
const repository = require("../models/AnnouncementRepository");

async function deliver(req, res) {
    try {
        const announcement = await repository.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: "Announcement not found"
            });
        }

        const result = await delivery.deliver(announcement);

        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { deliver };
