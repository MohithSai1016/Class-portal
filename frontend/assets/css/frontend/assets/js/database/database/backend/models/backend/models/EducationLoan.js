const { getPool } = require("../config/db");

async function getStudentLoan(studentId){

    const pool=getPool();

    const [rows]=await pool.execute(

        `
        SELECT *
        FROM education_loans
        WHERE student_id=?
        `,

        [studentId]

    );

    return rows;

}

module.exports={

    getStudentLoan

};