const repository = require("../models/PlacementSkillRepository");

const LEVELS = new Set([
    "Beginner","Intermediate","Advanced","Expert"
]);

async function list(studentUserId) {
    return repository.list(studentUserId);
}

async function add(studentUserId, data) {
    if (!data.skillName) throw new Error("skillName is required");
    if (data.proficiency && !LEVELS.has(data.proficiency)) {
        throw new Error("Invalid proficiency");
    }
    return repository.add(studentUserId, data);
}

async function remove(studentUserId, skillName) {
    return repository.remove(studentUserId, skillName);
}

module.exports = { list, add, remove };
