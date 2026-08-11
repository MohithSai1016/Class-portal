const { getPool } = require("../config/db");

async function findUsersByAudience(audience) {
    const pool = getPool();
    let sql = "SELECT id, role FROM users";
    const params = [];

    if (audience === "Students") {
        sql += " WHERE role = ?";
        params.push("student");
    } else if (audience === "Faculty") {
        sql += " WHERE role = ?";
        params.push("faculty");
    } else if (audience === "HOD") {
        sql += " WHERE role IN (?, ?)";
        params.push("admin", "hod");
    }

    const [rows] = await pool.execute(sql, params);
    return rows;
}

module.exports = { findUsersByAudience };
