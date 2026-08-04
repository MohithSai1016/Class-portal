const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(`
        SELECT
            t.id,
            t.day_of_week,
            t.start_time,
            t.end_time,
            s.subject_name,
            s.subject_code,
            CONCAT(f.first_name,' ',f.last_name) AS faculty_name,
            c.room_number,
            d.name AS department
        FROM timetable t
        JOIN subjects s ON t.subject_id = s.id
        JOIN faculty f ON t.faculty_id = f.id
        JOIN classrooms c ON t.classroom_id = c.id
        JOIN departments d ON t.department_id = d.id
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
            t.start_time;
    `);

    return rows;
}

module.exports = {
    findAll
};