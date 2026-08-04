const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(`
        SELECT
            s.*,
            d.name AS department_name
        FROM subjects s
        LEFT JOIN departments d
        ON s.department_id = d.id
        ORDER BY s.semester, s.subject_code
    `);

    return rows;
}

async function create(subject) {

    const pool = getPool();

    const [result] = await pool.execute(
        `
        INSERT INTO subjects
        (
            subject_code,
            subject_name,
            credits,
            semester,
            department_id
        )
        VALUES (?,?,?,?,?)
        `,
        [
            subject.subject_code,
            subject.subject_name,
            subject.credits,
            subject.semester,
            subject.department_id
        ]
    );

    return result.insertId;
}

module.exports = {

    findAll,

    create

};