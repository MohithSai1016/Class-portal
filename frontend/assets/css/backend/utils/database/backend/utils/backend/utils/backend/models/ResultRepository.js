const { getPool } =
require("../config/db");

async function saveSemesterResult(data){

    const pool = getPool();

    await pool.execute(

        `
        INSERT INTO semester_results
        (
            student_id,
            semester,
            total_credits,
            earned_credits,
            gpa,
            cgpa,
            result_status
        )
        VALUES (?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE

        total_credits=VALUES(total_credits),

        earned_credits=VALUES(earned_credits),

        gpa=VALUES(gpa),

        cgpa=VALUES(cgpa),

        result_status=VALUES(result_status)
        `,

        [

            data.student_id,

            data.semester,

            data.total_credits,

            data.earned_credits,

            data.gpa,

            data.cgpa,

            data.result_status

        ]

    );

}

module.exports = {

    saveSemesterResult

};