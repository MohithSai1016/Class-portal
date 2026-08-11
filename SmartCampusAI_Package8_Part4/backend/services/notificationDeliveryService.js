const repository =
    require("../models/NotificationDeliveryRepository");

async function queue(notificationId, channel, provider = null) {
    return repository.create({
        notificationId,
        channel,
        provider,
        status: "Queued"
    });
}

async function markSent(id) {
    return repository.updateStatus(id, "Sent");
}

async function markFailed(id, message) {
    return repository.updateStatus(id, "Failed", message);
}

async function markSkipped(id) {
    return repository.updateStatus(id, "Skipped");
}

module.exports = {
    queue,
    markSent,
    markFailed,
    markSkipped
};
