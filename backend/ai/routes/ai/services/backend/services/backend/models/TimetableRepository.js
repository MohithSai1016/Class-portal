const { getPool } =
require("../config/db");

async function save(schedule) {

    const pool = getPool();

    for (const row of schedule) {

        await pool.execute(

            `
            INSERT INTO timetable
            (
                department_id,
                semester,
                section,
                subject_id,
                faculty_id,
                classroom_id,
                day_of_week,
                start_time,
                end_time
            )
            VALUES (?,?,?,?,?,?,?,?,?)
            `,

            [

                row.department_id,

                row.semester,

                row.section,

                row.subject_id,

                row.faculty_id,

                row.classroom_id,

                row.day_of_week,

                row.start_time,

                row.end_time

            ]

        );

    }

}

module.exports = {

    save

};