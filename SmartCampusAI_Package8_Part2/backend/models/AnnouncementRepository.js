const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();
    const [result] = await pool.execute(
        `INSERT INTO announcements
        (title,message,audience,priority,published_by,expires_at,status)
        VALUES (?,?,?,?,?,?,?)`,
        [
            data.title,
            data.message,
            data.audience || "All",
            data.priority || "Normal",
            data.publishedBy,
            data.expiresAt || null,
            data.status || "Published"
        ]
    );
    return result.insertId;
}

async function list(status = "Published") {
    const pool = getPool();
    const [rows] = await pool.execute(
        `SELECT * FROM announcements
         WHERE status = ?
           AND (expires_at IS NULL OR expires_at > NOW())
         ORDER BY published_at DESC`,
        [status]
    );
    return rows;
}

async function findById(id) {
    const pool = getPool();
    const [rows] = await pool.execute(
        `SELECT * FROM announcements WHERE id=? LIMIT 1`,
        [id]
    );
    return rows[0] || null;
}

async function updateStatus(id,status) {
    const pool = getPool();
    const [result] = await pool.execute(
        `UPDATE announcements SET status=? WHERE id=?`,
        [status,id]
    );
    return result.affectedRows > 0;
}

module.exports={create,list,findById,updateStatus};
