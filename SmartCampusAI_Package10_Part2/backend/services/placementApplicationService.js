const repository =
    require("../models/PlacementApplicationRepository");

const STATUSES = new Set([
    "Saved",
    "Applied",
    "Shortlisted",
    "Interview",
    "Selected",
    "Rejected",
    "Withdrawn"
]);

function validate(data) {
    if (!data.companyName) {
        throw new Error("companyName is required");
    }

    if (!data.roleTitle) {
        throw new Error("roleTitle is required");
    }

    if (!data.applicationDate) {
        throw new Error("applicationDate is required");
    }

    if (
        data.applicationStatus &&
        !STATUSES.has(data.applicationStatus)
    ) {
        throw new Error("Invalid application status");
    }
}

async function list(studentUserId, filters) {
    return repository.listByStudent(
        studentUserId,
        filters
    );
}

async function get(id, studentUserId) {
    const application =
        await repository.findById(
            id,
            studentUserId
        );

    if (!application) {
        throw new Error(
            "Application not found"
        );
    }

    return application;
}

async function create(studentUserId, data) {
    validate(data);

    return repository.create(
        studentUserId,
        data
    );
}

async function update(
    id,
    studentUserId,
    data
) {
    validate(data);

    const updated =
        await repository.update(
            id,
            studentUserId,
            data
        );

    if (!updated) {
        throw new Error(
            "Application not found"
        );
    }

    return repository.findById(
        id,
        studentUserId
    );
}

async function remove(id, studentUserId) {
    const removed =
        await repository.remove(
            id,
            studentUserId
        );

    if (!removed) {
        throw new Error(
            "Application not found"
        );
    }

    return true;
}

async function summary(studentUserId) {
    return repository.summary(
        studentUserId
    );
}

module.exports = {
    list,
    get,
    create,
    update,
    remove,
    summary
};
