const userDirectory = require("../models/UserDirectoryRepository");
const notificationService = require("./notificationService");

async function deliver(announcement) {
    const users = await userDirectory.findUsersByAudience(
        announcement.audience
    );

    let delivered = 0;

    for (const user of users) {
        await notificationService.send({
            recipientUserId: user.id,
            title: announcement.title,
            message: announcement.message,
            notificationType: "Announcement",
            priority: announcement.priority
        });
        delivered++;
    }

    return { delivered };
}

module.exports = { deliver };
