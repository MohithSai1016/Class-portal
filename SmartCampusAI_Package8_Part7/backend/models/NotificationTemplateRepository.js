const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO notification_templates
        (template_key,title_template,message_template,
         notification_type,priority)
        VALUES (?,?,?,?,?)`,
        [
            data.templateKey,
            data.titleTemplate,
            data.messageTemplate,
            data.notificationType || "General",
            data.priority || "Normal"
        ]
    );

    return result.insertId;
}

async function findByKey(key) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM notification_templates
         WHERE template_key=? AND is_active=TRUE
         LIMIT 1`,
        [key]
    );

    return rows[0] || null;
}

async function list() {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM notification_templates
         ORDER BY template_key`
    );

    return rows;
}

module.exports = { create, findByKey, list };
