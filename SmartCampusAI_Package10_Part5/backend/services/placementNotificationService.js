const repository =
    require("../models/PlacementNotificationRepository");

async function create(data) {
    if (!data.studentUserId) {
        throw new Error(
            "studentUserId is required"
        );
    }

    if (!data.title) {
        throw new Error(
            "title is required"
        );
    }

    if (!data.message) {
        throw new Error(
            "message is required"
        );
    }

    return repository.create(data);
}

async function list(
    studentUserId,
    limit
) {
    return repository.listByStudent(
        studentUserId,
        limit
    );
}

async function unreadCount(
    studentUserId
) {
    return repository.unreadCount(
        studentUserId
    );
}

async function markRead(
    id,
    studentUserId
) {
    const changed =
        await repository.markRead(
            id,
            studentUserId
        );

    if (!changed) {
        throw new Error(
            "Notification not found"
        );
    }

    return true;
}

async function markAllRead(
    studentUserId
) {
    return repository.markAllRead(
        studentUserId
    );
}

module.exports = {
    create,
    list,
    unreadCount,
    markRead,
    markAllRead
};
