const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(`
        SELECT
            a.*,
            s.subject_name,
            s.subject_code
        FROM assessments a
        JOIN subjects s
            ON a.subject_id = s.id
        ORDER BY s.subject_code
    `);

    return rows;
}

async function create(data) {

    const pool = getPool();

    const [result] = await pool.execute(
        `
        INSERT INTO assessments
        (
            subject_id,
            assessment_name,
            assessment_type,
            max_marks,
            weightage
        )
        VALUES (?,?,?,?,?)
        `,
        [
            data.subject_id,
            data.assessment_name,
            data.assessment_type,
            data.max_marks,
            data.weightage
        ]
    );

    return result.insertId;
}

module.exports = {
    findAll,
    create
};