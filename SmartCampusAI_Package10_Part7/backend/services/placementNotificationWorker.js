const { getPool } =
    require("../config/db");

const notificationService =
    require("./placementNotificationService");

const workerRepository =
    require("../models/PlacementWorkerRepository");

async function createUniqueNotification(data) {
    const exists =
        await workerRepository.eventExists(
            data.eventKey
        );

    if (exists) return false;

    await notificationService.create({
        studentUserId:
            data.studentUserId,
        notificationType:
            data.notificationType,
        title:
            data.title,
        message:
            data.message,
        referenceType:
            data.referenceType,
        referenceId:
            data.referenceId
    });

    await workerRepository.createEvent({
        eventKey:
            data.eventKey,
        studentUserId:
            data.studentUserId,
        eventType:
            data.eventType,
        referenceType:
            data.referenceType,
        referenceId:
            data.referenceId
    });

    return true;
}

async function processDeadlines() {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                a.id,
                a.student_user_id,
                a.drive_id,
                d.company_id,
                d.role_title,
                d.application_deadline,
                c.company_name
             FROM placement_drive_applications a
             INNER JOIN placement_drives d
                ON d.id=a.drive_id
             INNER JOIN placement_companies c
                ON c.id=d.company_id
             WHERE d.application_deadline
                BETWEEN NOW()
                AND DATE_ADD(NOW(), INTERVAL 24 HOUR)`
        );

    let processed = 0;

    for (const row of rows) {
        const eventKey =
            `deadline:${row.id}:${new Date(
                row.application_deadline
            ).toISOString().slice(0,10)}`;

        const created =
            await createUniqueNotification({
                eventKey,
                eventType:
                    "application_deadline",
                studentUserId:
                    row.student_user_id,
                notificationType:
                    "Drive",
                title:
                    "Placement application deadline is near",
                message:
                    `${row.company_name} - ${row.role_title} closes applications within 24 hours.`,
                referenceType:
                    "placement_drive",
                referenceId:
                    row.drive_id
            });

        if (created) processed++;
    }

    return processed;
}

async function processInterviews() {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                i.id,
                i.drive_application_id,
                i.scheduled_at,
                i.interview_round,
                a.student_user_id,
                d.id AS drive_id,
                d.role_title,
                c.company_name
             FROM placement_interviews i
             INNER JOIN placement_drive_applications a
                ON a.id=i.drive_application_id
             INNER JOIN placement_drives d
                ON d.id=a.drive_id
             INNER JOIN placement_companies c
                ON c.id=d.company_id
             WHERE i.interview_status='Scheduled'
               AND i.scheduled_at
                   BETWEEN NOW()
                   AND DATE_ADD(NOW(), INTERVAL 24 HOUR)`
        );

    let processed = 0;

    for (const row of rows) {
        const eventKey =
            `interview:${row.id}:${new Date(
                row.scheduled_at
            ).toISOString().slice(0,13)}`;

        const created =
            await createUniqueNotification({
                eventKey,
                eventType:
                    "interview_reminder",
                studentUserId:
                    row.student_user_id,
                notificationType:
                    "Interview",
                title:
                    "Interview reminder",
                message:
                    `${row.company_name} - ${row.role_title}, ${row.interview_round} is scheduled within 24 hours.`,
                referenceType:
                    "placement_interview",
                referenceId:
                    row.id
            });

        if (created) processed++;
    }

    return processed;
}

async function run() {
    const jobName =
        "placement-notification-worker";

    const runId =
        await workerRepository.start(
            jobName
        );

    let processed = 0;

    try {
        processed +=
            await processDeadlines();

        processed +=
            await processInterviews();

        await workerRepository.finish(
            runId,
            "completed",
            processed,
            "Worker completed successfully."
        );

        return processed;
    } catch(error) {
        await workerRepository.finish(
            runId,
            "failed",
            processed,
            error.message
        );

        throw error;
    }
}

module.exports = {
    run
};
