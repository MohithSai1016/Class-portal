const { getPool } = require("../config/db");

async function overview() {
    const pool = getPool();

    const [totalApplications] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM placement_drive_applications`
        );

    const [selected] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM placement_drive_applications
             WHERE application_status='Selected'`
        );

    const [shortlisted] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM placement_drive_applications
             WHERE application_status='Shortlisted'`
        );

    const [interviews] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM placement_interviews
             WHERE interview_status IN
                 ('Scheduled','Completed','Passed')`
        );

    const [openDrives] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM placement_drives
             WHERE drive_status='Open'`
        );

    return {
        totalApplications:
            Number(
                totalApplications[0]?.total || 0
            ),
        selected:
            Number(
                selected[0]?.total || 0
            ),
        shortlisted:
            Number(
                shortlisted[0]?.total || 0
            ),
        interviews:
            Number(
                interviews[0]?.total || 0
            ),
        openDrives:
            Number(
                openDrives[0]?.total || 0
            )
    };
}

async function companyStats() {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                c.company_name,
                COUNT(a.id) AS applications,
                SUM(
                    a.application_status='Selected'
                ) AS selected,
                SUM(
                    a.application_status='Shortlisted'
                ) AS shortlisted
             FROM placement_companies c
             INNER JOIN placement_drives d
                 ON d.company_id=c.id
             LEFT JOIN placement_drive_applications a
                 ON a.drive_id=d.id
             GROUP BY c.id, c.company_name
             ORDER BY selected DESC,
                      applications DESC`
        );

    return rows;
}

async function departmentStats() {
    const pool = getPool();

    const table =
        process.env.STUDENT_ACADEMIC_TABLE ||
        "students";

    if (!/^[A-Za-z0-9_]+$/.test(table)) {
        throw new Error(
            "Invalid STUDENT_ACADEMIC_TABLE"
        );
    }

    const [rows] =
        await pool.execute(
            `SELECT
                s.department,
                COUNT(a.id) AS applications,
                SUM(
                    a.application_status='Selected'
                ) AS selected
             FROM ${table} s
             LEFT JOIN placement_drive_applications a
                 ON a.student_user_id=s.user_id
             GROUP BY s.department
             ORDER BY selected DESC`
        );

    return rows;
}

async function statusStats() {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                application_status,
                COUNT(*) AS total
             FROM placement_drive_applications
             GROUP BY application_status
             ORDER BY total DESC`
        );

    return rows;
}

module.exports = {
    overview,
    companyStats,
    departmentStats,
    statusStats
};
