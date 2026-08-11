const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO certificate_audit_logs
        (certificate_id, actor_user_id, action, details)
        VALUES (?,?,?,?)`,
        [
            data.certificateId,
            data.actorUserId || null,
            data.action,
            data.details
                ? JSON.stringify(data.details)
                : null
        ]
    );

    return result.insertId;
}

async function findByCertificate(certificateId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM certificate_audit_logs
         WHERE certificate_id = ?
         ORDER BY created_at DESC`,
        [certificateId]
    );

    return rows;
}

module.exports = {
    create,
    findByCertificate
};
