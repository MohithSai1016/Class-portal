const { getPool } = require("../config/db");

async function apply(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO scholarship_applications
         (student_id, scholarship_id, application_note)
         VALUES (?, ?, ?)`,
        [
            data.studentId,
            data.scholarshipId,
            data.applicationNote || null
        ]
    );

    return result.insertId;
}

async function findByStudent(studentId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            sa.*,
            s.scholarship_name,
            s.provider,
            s.amount
         FROM scholarship_applications sa
         JOIN scholarships s
           ON s.id = sa.scholarship_id
         WHERE sa.student_id = ?
         ORDER BY sa.applied_at DESC`,
        [studentId]
    );

    return rows;
}

module.exports = {
    apply,
    findByStudent
};
