const repository =
    require("../models/StudentPlacementProfileRepository");

async function get(studentUserId) {
    return repository.findByStudent(
        studentUserId
    );
}

async function save(
    studentUserId,
    data
) {
    return repository.upsert(
        studentUserId,
        data
    );
}

module.exports = {
    get,
    save
};
