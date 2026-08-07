const { getPool } = require("../config/db");

async function getStudentFee(studentId){

    const pool = getPool();

    const [rows] = await pool.execute(

        `

        SELECT *

        FROM student_fees

        WHERE student_id = ?

        `,

        [studentId]

    );

    return rows;

}

module.exports = {

    getStudentFee

};