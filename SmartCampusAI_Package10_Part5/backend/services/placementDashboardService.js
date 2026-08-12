const repository =
    require("../models/PlacementDashboardRepository");

const notificationService =
    require("./placementNotificationService");

const interviewRepository =
    require("../models/PlacementInterviewRepository");

const driveRepository =
    require("../models/PlacementDriveRepository");

async function get(studentUserId) {
    const [
        stats,
        notifications,
        interviews,
        drives
    ] = await Promise.all([
        repository.getStats(
            studentUserId
        ),
        notificationService.list(
            studentUserId,
            5
        ),
        interviewRepository.listUpcoming(
            studentUserId
        ),
        driveRepository.listOpen({})
    ]);

    return {
        stats,
        notifications,
        upcomingInterviews:
            interviews.slice(0,5),
        openDrives:
            drives.slice(0,5)
    };
}

module.exports = {
    get
};
