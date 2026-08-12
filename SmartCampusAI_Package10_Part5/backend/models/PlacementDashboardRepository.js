const { getPool } = require("../config/db");

async function getStats(studentUserId) {
    const pool = getPool();

    const [applications] = await pool.execute(
        `SELECT
            COUNT(*) AS total,
            SUM(application_status='Applied') AS applied,
            SUM(application_status='Shortlisted') AS shortlisted,
            SUM(application_status='Interview') AS interview,
            SUM(application_status='Selected') AS selected,
            SUM(application_status='Rejected') AS rejected
         FROM placement_applications
         WHERE student_user_id=?`,
        [studentUserId]
    );

    const [driveApplications] = await pool.execute(
        `SELECT
            COUNT(*) AS total,
            SUM(application_status='Applied') AS applied,
            SUM(application_status='Shortlisted') AS shortlisted,
            SUM(application_status='Interview') AS interview,
            SUM(application_status='Selected') AS selected
         FROM placement_drive_applications
         WHERE student_user_id=?`,
        [studentUserId]
    );

    const [interviews] = await pool.execute(
        `SELECT COUNT(*) AS total
         FROM placement_interviews i
         INNER JOIN placement_drive_applications a
             ON a.id=i.drive_application_id
         WHERE a.student_user_id=?
           AND i.interview_status='Scheduled'
           AND i.scheduled_at>=NOW()`,
        [studentUserId]
    );

    const [upcomingDrives] = await pool.execute(
        `SELECT COUNT(*) AS total
         FROM placement_drives
         WHERE drive_status='Open'
           AND application_deadline>=NOW()`
    );

    return {
        applications: applications[0],
        driveApplications: driveApplications[0],
        upcomingInterviews: Number(
            interviews[0]?.total || 0
        ),
        openDrives: Number(
            upcomingDrives[0]?.total || 0
        )
    };
}

module.exports = {
    getStats
};
