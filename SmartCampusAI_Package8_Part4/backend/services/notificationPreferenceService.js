const repository =
    require("../models/NotificationPreferenceRepository");

async function get(userId) {
    return repository.get(userId);
}

async function update(userId, data) {
    return repository.update(userId, data);
}

module.exports = { get, update };
