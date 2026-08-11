const { getPool } = require("../config/db");

async function get(userId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM notification_preferences
         WHERE user_id = ?
         LIMIT 1`,
        [userId]
    );

    if (rows[0]) return rows[0];

    await pool.execute(
        `INSERT INTO notification_preferences (user_id)
         VALUES (?)`,
        [userId]
    );

    const [created] = await pool.execute(
        `SELECT *
         FROM notification_preferences
         WHERE user_id = ?
         LIMIT 1`,
        [userId]
    );

    return created[0];
}

async function update(userId, data) {
    const pool = getPool();

    await get(userId);

    const fields = [
        "in_app_enabled",
        "email_enabled",
        "push_enabled",
        "attendance_enabled",
        "fees_enabled",
        "academic_enabled",
        "placement_enabled",
        "announcement_enabled"
    ];

    const values = fields.map(field =>
        data[field] === undefined
            ? null
            : Boolean(data[field])
    );

    const updates = [];
    const params = [];

    fields.forEach((field, index) => {
        if (values[index] !== null) {
            updates.push(`${field} = ?`);
            params.push(values[index]);
        }
    });

    if (!updates.length) return get(userId);

    params.push(userId);

    await pool.execute(
        `UPDATE notification_preferences
         SET ${updates.join(", ")}
         WHERE user_id = ?`,
        params
    );

    return get(userId);
}

module.exports = { get, update };
