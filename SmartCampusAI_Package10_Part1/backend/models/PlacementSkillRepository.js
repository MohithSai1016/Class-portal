const { getPool } = require("../config/db");

async function list(studentUserId) {
    const pool = getPool();
    const [rows] = await pool.execute(
        "SELECT * FROM placement_skills WHERE student_user_id=? ORDER BY skill_name",
        [studentUserId]
    );
    return rows;
}

async function add(studentUserId, data) {
    const pool = getPool();
    await pool.execute(
        `INSERT INTO placement_skills
        (student_user_id,skill_name,proficiency,verified)
        VALUES (?,?,?,?)
        ON DUPLICATE KEY UPDATE
        proficiency=VALUES(proficiency),
        verified=VALUES(verified)`,
        [
            studentUserId,
            data.skillName,
            data.proficiency || "Beginner",
            Boolean(data.verified)
        ]
    );
    return list(studentUserId);
}

async function remove(studentUserId, skillName) {
    const pool = getPool();
    const [result] = await pool.execute(
        "DELETE FROM placement_skills WHERE student_user_id=? AND skill_name=?",
        [studentUserId, skillName]
    );
    return result.affectedRows > 0;
}

module.exports = { list, add, remove };
