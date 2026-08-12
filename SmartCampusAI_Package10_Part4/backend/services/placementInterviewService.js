const repository =
    require("../models/PlacementInterviewRepository");

const STATUSES = new Set([
    "Scheduled",
    "Completed",
    "Rescheduled",
    "Cancelled",
    "Passed",
    "Failed"
]);

async function list(studentUserId) {
    return repository.listByStudent(
        studentUserId
    );
}

async function upcoming(studentUserId) {
    return repository.listUpcoming(
        studentUserId
    );
}

async function get(
    id,
    studentUserId
) {
    const interview =
        await repository.findById(
            id,
            studentUserId
        );

    if (!interview) {
        throw new Error(
            "Interview not found"
        );
    }

    return interview;
}

async function create(data) {
    if (!data.driveApplicationId) {
        throw new Error(
            "driveApplicationId is required"
        );
    }

    if (!data.interviewRound) {
        throw new Error(
            "interviewRound is required"
        );
    }

    if (!data.scheduledAt) {
        throw new Error(
            "scheduledAt is required"
        );
    }

    if (
        data.interviewStatus &&
        !STATUSES.has(
            data.interviewStatus
        )
    ) {
        throw new Error(
            "Invalid interview status"
        );
    }

    const id =
        await repository.create(data);

    return id;
}

module.exports = {
    list,
    upcoming,
    get,
    create
};
