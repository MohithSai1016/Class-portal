const { getPool } = require("../config/db");

async function findByEmployeeId(employeeId) {

    const pool = getPool();

    const [rows] = await pool.execute(
        `
        SELECT
            t.day_of_week,
            t.start_time,
            t.end_time,
            s.subject_code,
            s.subject_name,
            c.room_number,
            t.semester,
            t.section
        FROM faculty f
        JOIN timetable t
            ON f.id = t.faculty_id
        JOIN subjects s
            ON s.id = t.subject_id
        JOIN classrooms c
            ON c.id = t.classroom_id
        WHERE f.employee_id = ?
        ORDER BY
            FIELD(
                t.day_of_week,
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ),
            t.start_time
        `,
        [employeeId]
    );

    return rows;
}

module.exports = {
    findByEmployeeId
};
