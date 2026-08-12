const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO placement_notifications
        (
            student_user_id,
            notification_type,
            title,
            message,
            reference_type,
            reference_id
        )
        VALUES (?,?,?,?,?,?)`,
        [
            data.studentUserId,
            data.notificationType || "System",
            data.title,
            data.message,
            data.referenceType || null,
            data.referenceId || null
        ]
    );

    return result.insertId;
}

async function listByStudent(
    studentUserId,
    limit = 50
) {
    const pool = getPool();

    const safeLimit = Math.min(
        Math.max(Number(limit) || 50, 1),
        100
    );

    const [rows] = await pool.execute(
        `SELECT *
         FROM placement_notifications
         WHERE student_user_id=?
         ORDER BY created_at DESC
         LIMIT ${safeLimit}`,
        [studentUserId]
    );

    return rows;
}

async function unreadCount(
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT COUNT(*) AS count
         FROM placement_notifications
         WHERE student_user_id=?
           AND is_read=FALSE`,
        [studentUserId]
    );

    return Number(rows[0]?.count || 0);
}

async function markRead(
    id,
    studentUserId
) {
    const pool = getPool();

    const [result] = await pool.execute(
        `UPDATE placement_notifications
         SET is_read=TRUE,
             read_at=NOW()
         WHERE id=?
           AND student_user_id=?`,
        [id, studentUserId]
    );

    return result.affectedRows > 0;
}

async function markAllRead(
    studentUserId
) {
    const pool = getPool();

    const [result] = await pool.execute(
        `UPDATE placement_notifications
         SET is_read=TRUE,
             read_at=NOW()
         WHERE student_user_id=?
           AND is_read=FALSE`,
        [studentUserId]
    );

    return result.affectedRows;
}

module.exports = {
    create,
    listByStudent,
    unreadCount,
    markRead,
    markAllRead
};
