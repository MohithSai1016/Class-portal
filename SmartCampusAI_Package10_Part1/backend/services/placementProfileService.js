const repository = require("../models/PlacementProfileRepository");

const STATUSES = new Set([
    "Not Started","Preparing","Eligible","Applied",
    "Interviewing","Selected","Not Selected"
]);

async function get(studentUserId) {
    return repository.findByStudent(studentUserId);
}

async function update(studentUserId, data) {
    if (data.placementStatus && !STATUSES.has(data.placementStatus)) {
        throw new Error("Invalid placement status");
    }
    return repository.upsert(studentUserId, data);
}

module.exports = { get, update };
