const { getPool } = require("../config/db");

async function search(filters = {}) {
    const pool = getPool();

    const where = [];
    const params = [];

    if (filters.type) {
        where.push("n.notification_type = ?");
        params.push(filters.type);
    }

    if (filters.priority) {
        where.push("n.priority = ?");
        params.push(filters.priority);
    }

    if (filters.status === "read") {
        where.push("n.is_read = TRUE");
    } else if (filters.status === "unread") {
        where.push("n.is_read = FALSE");
    }

    if (filters.from) {
        where.push("n.created_at >= ?");
        params.push(filters.from);
    }

    if (filters.to) {
        where.push("n.created_at <= ?");
        params.push(filters.to);
    }

    const limit = Math.min(
        Math.max(Number(filters.limit) || 100, 1),
        500
    );

    const condition =
        where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [rows] = await pool.query(
        `SELECT
            n.id,
            n.recipient_user_id,
            n.title,
            n.message,
            n.notification_type,
            n.priority,
            n.is_read,
            n.created_at,
            n.read_at
         FROM notifications n
         ${condition}
         ORDER BY n.created_at DESC
         LIMIT ${limit}`,
        params
    );

    return rows;
}

async function statistics() {
    const pool = getPool();

    const [totals] = await pool.query(`
        SELECT
            COUNT(*) AS total,
            SUM(is_read = FALSE) AS unread,
            SUM(is_read = TRUE) AS read_count
        FROM notifications
    `);

    const [types] = await pool.query(`
        SELECT
            notification_type,
            COUNT(*) AS count
        FROM notifications
        GROUP BY notification_type
        ORDER BY count DESC
    `);

    const [delivery] = await pool.query(`
        SELECT
            channel,
            status,
            COUNT(*) AS count
        FROM notification_delivery_log
        GROUP BY channel, status
        ORDER BY channel, status
    `);

    return {
        totals: totals[0],
        byType: types,
        delivery
    };
}

async function deleteOlderThan(days) {
    const pool = getPool();

    const safeDays = Math.min(
        Math.max(Number(days) || 90, 1),
        3650
    );

    const [result] = await pool.query(
        `DELETE FROM notifications
         WHERE created_at < DATE_SUB(NOW(), INTERVAL ${safeDays} DAY)`,
    );

    return result.affectedRows;
}

module.exports = {
    search,
    statistics,
    deleteOlderThan
};
