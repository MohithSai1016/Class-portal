const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(`
        SELECT
            fs.*,
            d.department_name
        FROM fee_structures fs
        JOIN departments d
            ON d.id = fs.department_id
        ORDER BY
            academic_year DESC,
            semester
    `);

    return rows;
}

module.exports = {

    findAll

};