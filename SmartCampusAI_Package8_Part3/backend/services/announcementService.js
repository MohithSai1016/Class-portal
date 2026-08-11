const repository = require("../models/AnnouncementRepository");
const delivery = require("./announcementDeliveryService");

async function create(data) {
    if (!data.title || !data.message || !data.publishedBy) {
        throw new Error("title, message and publishedBy are required");
    }

    const id = await repository.create(data);

    if ((data.status || "Published") === "Published") {
        const announcement = await repository.findById(id);
        if (announcement) {
            await delivery.deliver(announcement);
        }
    }

    return id;
}

async function list() {
    return repository.list("Published");
}

async function archive(id) {
    if (!await repository.updateStatus(id, "Archived")) {
        throw new Error("Announcement not found");
    }
    return true;
}

module.exports = { create, list, archive };
