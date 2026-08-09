const repository =
    require("../models/ScholarshipApplicationRepository");

async function apply(data) {
    if (!data.studentId || !data.scholarshipId) {
        throw new Error("studentId and scholarshipId are required");
    }

    return repository.apply(data);
}

async function list(studentId) {
    return repository.findByStudent(studentId);
}

module.exports = {
    apply,
    list
};
