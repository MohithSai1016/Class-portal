const { getPool } = require("../config/db");

async function findByRollNumber(rollNumber) {

    const pool = getPool();

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM students
        WHERE roll_number=?
        `,

        [rollNumber]

    );

    return rows[0];

}

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM students
        ORDER BY roll_number
        `

    );

    return rows;

}

module.exports = {

    findByRollNumber,

    findAll

};