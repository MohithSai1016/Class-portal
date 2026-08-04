const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(`

SELECT

fs.id,

f.employee_id,

CONCAT(
f.first_name,
' ',
f.last_name
) faculty,

s.subject_code,

s.subject_name,

fs.semester,

fs.section,

fs.academic_year

FROM faculty_subjects fs

JOIN faculty f

ON fs.faculty_id=f.id

JOIN subjects s

ON fs.subject_id=s.id

ORDER BY

faculty

`);

    return rows;

}

async function create(data){

const pool=getPool();

const [result]=await pool.execute(

`

INSERT INTO faculty_subjects(

faculty_id,

subject_id,

semester,

section,

academic_year

)

VALUES(?,?,?,?,?)

`,

[

data.faculty_id,

data.subject_id,

data.semester,

data.section,

data.academic_year

]

);

return result.insertId;

}

module.exports={

findAll,

create

};