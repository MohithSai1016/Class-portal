const { getPool } = require("../config/db");

async function getStudentsForAssessment(assessmentId) {

    const pool = getPool();

    const [rows] = await pool.execute(
        `
        SELECT
            e.id AS enrollment_id,
            st.roll_number,
            CONCAT(
                st.first_name,
                ' ',
                st.last_name
            ) AS student_name,
            COALESCE(m.marks_obtained, NULL) AS marks_obtained,
            COALESCE(m.remarks, '') AS remarks
        FROM assessments a
        JOIN enrollments e
            ON a.subject_id = e.subject_id
        JOIN students st
            ON e.student_id = st.id
        LEFT JOIN marks m
            ON e.id = m.enrollment_id
           AND a.id = m.assessment_id
        WHERE a.id = ?
        ORDER BY st.roll_number
        `,
        [assessmentId]
    );

    return rows;
}

module.exports = {
    getStudentsForAssessment
};