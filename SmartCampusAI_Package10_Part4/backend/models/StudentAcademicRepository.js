const { getPool } = require("../config/db");

/*
 * This repository is intentionally isolated from the existing
 * student schema because different Smart Campus AI versions may
 * use different academic-table names.
 *
 * Set STUDENT_ACADEMIC_TABLE in .env to the existing table name.
 *
 * Expected columns:
 *   user_id
 *   cgpa
 *   department
 *   backlogs
 *
 * Example:
 * STUDENT_ACADEMIC_TABLE=students
 */

function tableName() {
    const table =
        process.env.STUDENT_ACADEMIC_TABLE ||
        "students";

    if (!/^[A-Za-z0-9_]+$/.test(table)) {
        throw new Error(
            "Invalid STUDENT_ACADEMIC_TABLE"
        );
    }

    return table;
}

async function findByUserId(userId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            user_id,
            cgpa,
            department,
            backlogs
         FROM ${tableName()}
         WHERE user_id=?
         LIMIT 1`,
        [userId]
    );

    return rows[0] || null;
}

module.exports = {
    findByUserId
};
