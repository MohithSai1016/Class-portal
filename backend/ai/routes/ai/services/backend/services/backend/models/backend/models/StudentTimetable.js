const { getPool } = require("../config/db");

async function findByRollNumber(rollNumber) {

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
            CONCAT(f.first_name,' ',f.last_name) AS faculty_name
        FROM students st
        JOIN timetable t
            ON st.department_id = t.department_id
           AND st.semester = t.semester
           AND st.section = t.section
        JOIN subjects s
            ON t.subject_id = s.id
        JOIN faculty f
            ON t.faculty_id = f.id
        JOIN classrooms c
            ON t.classroom_id = c.id
        WHERE st.roll_number = ?
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
        [rollNumber]
    );

    return rows;
}

module.exports = {
    findByRollNumber
};