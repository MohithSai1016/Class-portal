const repository =
    require("../models/NotificationAdminRepository");

async function search(filters) {
    return repository.search(filters);
}

async function statistics() {
    return repository.statistics();
}

async function cleanup(days) {
    return repository.deleteOlderThan(days);
}

module.exports = {
    search,
    statistics,
    cleanup
};
