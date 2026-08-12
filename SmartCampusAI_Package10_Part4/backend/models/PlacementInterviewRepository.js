const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO placement_interviews
        (
            drive_application_id,
            interview_round,
            interview_type,
            scheduled_at,
            venue,
            meeting_url,
            interviewer_name,
            interview_status,
            notes
        )
        VALUES (?,?,?,?,?,?,?,?,?)`,
        [
            data.driveApplicationId,
            data.interviewRound,
            data.interviewType || "Other",
            data.scheduledAt,
            data.venue || null,
            data.meetingUrl || null,
            data.interviewerName || null,
            data.interviewStatus || "Scheduled",
            data.notes || null
        ]
    );

    return result.insertId;
}

async function findById(
    id,
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            i.*,
            a.student_user_id,
            a.application_status,
            d.drive_title,
            d.role_title,
            c.company_name
         FROM placement_interviews i
         INNER JOIN placement_drive_applications a
             ON a.id=i.drive_application_id
         INNER JOIN placement_drives d
             ON d.id=a.drive_id
         INNER JOIN placement_companies c
             ON c.id=d.company_id
         WHERE i.id=?
           AND a.student_user_id=?
         LIMIT 1`,
        [id, studentUserId]
    );

    return rows[0] || null;
}

async function listByStudent(
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            i.*,
            a.student_user_id,
            a.application_status,
            d.drive_title,
            d.role_title,
            c.company_name
         FROM placement_interviews i
         INNER JOIN placement_drive_applications a
             ON a.id=i.drive_application_id
         INNER JOIN placement_drives d
             ON d.id=a.drive_id
         INNER JOIN placement_companies c
             ON c.id=d.company_id
         WHERE a.student_user_id=?
         ORDER BY i.scheduled_at ASC`,
        [studentUserId]
    );

    return rows;
}

async function listUpcoming(
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            i.*,
            d.drive_title,
            d.role_title,
            c.company_name
         FROM placement_interviews i
         INNER JOIN placement_drive_applications a
             ON a.id=i.drive_application_id
         INNER JOIN placement_drives d
             ON d.id=a.drive_id
         INNER JOIN placement_companies c
             ON c.id=d.company_id
         WHERE a.student_user_id=?
           AND i.scheduled_at >= NOW()
           AND i.interview_status='Scheduled'
         ORDER BY i.scheduled_at ASC`,
        [studentUserId]
    );

    return rows;
}

module.exports = {
    create,
    findById,
    listByStudent,
    listUpcoming
};
