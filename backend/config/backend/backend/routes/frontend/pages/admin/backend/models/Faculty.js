const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(
        `
        SELECT
            f.*,
            d.name AS department_name
        FROM faculty f
        LEFT JOIN departments d
            ON f.department_id = d.id
        ORDER BY f.employee_id
        `
    );

    return rows;
}

async function create(faculty) {

    const pool = getPool();

    const [result] = await pool.execute(
        `
        INSERT INTO faculty
        (
            user_id,
            employee_id,
            first_name,
            last_name,
            designation,
            department_id
        )
        VALUES (?,?,?,?,?,?)
        `,
        [
            faculty.user_id,
            faculty.employee_id,
            faculty.first_name,
            faculty.last_name,
            faculty.designation,
            faculty.department_id
        ]
    );

    return result.insertId;
}

module.exports = {
    findAll,
    create
};