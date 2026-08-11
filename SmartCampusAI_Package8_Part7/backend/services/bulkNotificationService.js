const notificationService =
    require("./notificationService");

async function sendBulk(data) {
    const recipients =
        Array.isArray(data.recipientUserIds)
            ? data.recipientUserIds
            : [];

    if (!recipients.length) {
        throw new Error(
            "recipientUserIds must contain at least one user"
        );
    }

    if (!data.title || !data.message) {
        throw new Error(
            "title and message are required"
        );
    }

    let sent = 0;
    const failed = [];

    for (const userId of recipients) {
        try {
            await notificationService.send({
                recipientUserId: userId,
                title: data.title,
                message: data.message,
                notificationType:
                    data.notificationType || "General",
                priority:
                    data.priority || "Normal"
            });

            sent++;
        } catch (error) {
            failed.push({
                userId,
                message: error.message
            });
        }
    }

    return {
        requested: recipients.length,
        sent,
        failed
    };
}

module.exports = { sendBulk };
