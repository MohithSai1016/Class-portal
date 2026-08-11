const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO notification_delivery_log
         (notification_id, channel, status, provider)
         VALUES (?, ?, ?, ?)`,
        [
            data.notificationId,
            data.channel,
            data.status || "Queued",
            data.provider || null
        ]
    );

    return result.insertId;
}

async function updateStatus(id, status, errorMessage = null) {
    const pool = getPool();

    await pool.execute(
        `UPDATE notification_delivery_log
         SET status = ?,
             error_message = ?,
             sent_at = CASE
                 WHEN ? = 'Sent' THEN NOW()
                 ELSE sent_at
             END
         WHERE id = ?`,
        [status, errorMessage, status, id]
    );
}

module.exports = { create, updateStatus };
