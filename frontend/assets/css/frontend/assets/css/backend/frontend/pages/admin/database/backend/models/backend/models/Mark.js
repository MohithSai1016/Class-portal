const { getPool } = require("../config/db");

async function saveMark(data) {

    const pool = getPool();

    await pool.execute(
        `
        INSERT INTO marks
        (
            enrollment_id,
            assessment_id,
            marks_obtained,
            remarks
        )
        VALUES (?,?,?,?)
        ON DUPLICATE KEY UPDATE

        marks_obtained=VALUES(marks_obtained),

        remarks=VALUES(remarks)
        `,
        [

            data.enrollment_id,

            data.assessment_id,

            data.marks_obtained,

            data.remarks

        ]
    );

}

module.exports = {

    saveMark

};