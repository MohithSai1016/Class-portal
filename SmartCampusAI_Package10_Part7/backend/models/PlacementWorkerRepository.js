const { getPool } =
    require("../config/db");

async function start(jobName) {
    const pool = getPool();

    const [result] =
        await pool.execute(
            `INSERT INTO placement_worker_runs
             (job_name, started_at, status)
             VALUES (?, NOW(), 'running')`,
            [jobName]
        );

    return result.insertId;
}

async function finish(
    id,
    status,
    processedCount,
    message
) {
    const pool = getPool();

    await pool.execute(
        `UPDATE placement_worker_runs
         SET finished_at=NOW(),
             status=?,
             processed_count=?,
             message=?
         WHERE id=?`,
        [
            status,
            processedCount,
            message || null,
            id
        ]
    );
}

async function eventExists(eventKey) {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT id
             FROM placement_notification_events
             WHERE event_key=?
             LIMIT 1`,
            [eventKey]
        );

    return Boolean(rows.length);
}

async function createEvent(data) {
    const pool = getPool();

    await pool.execute(
        `INSERT IGNORE INTO
         placement_notification_events
         (
            event_key,
            student_user_id,
            event_type,
            reference_type,
            reference_id
         )
         VALUES (?,?,?,?,?)`,
        [
            data.eventKey,
            data.studentUserId,
            data.eventType,
            data.referenceType || null,
            data.referenceId || null
        ]
    );
}

module.exports = {
    start,
    finish,
    eventExists,
    createEvent
};
