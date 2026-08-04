const {getPool}=require("../config/db");

async function findByStudent(studentId){

const pool=getPool();

const [rows]=await pool.execute(

`
SELECT *

FROM attendance

WHERE student_id=?

ORDER BY attendance_date DESC
`,

[studentId]

);

return rows;

}

module.exports={

findByStudent

};