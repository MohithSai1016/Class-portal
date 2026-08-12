const { getPool } =
    require("../config/db");

async function generateSnapshot(
    generatedByUserId,
    reportName="Final Placement Report"
) {
    const pool=getPool();

    const [students] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM students`
        );

    const [applications] =
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

    const [joined] =
        await pool.execute(
            `SELECT COUNT(*) AS total
             FROM placement_offers
             WHERE joining_status='Joined'`
        );

    const [companies] =
        await pool.execute(
            `SELECT COUNT(DISTINCT company_id) AS total
             FROM placement_drives`
        );

    const [salary] =
        await pool.execute(
            `SELECT
                AVG(salary_lpa) AS average_salary,
                MAX(salary_lpa) AS highest_salary
             FROM placement_offers
             WHERE salary_lpa IS NOT NULL`
        );

    const [result] =
        await pool.execute(
            `INSERT INTO placement_report_snapshots
            (
                report_name,
                generated_by_user_id,
                total_students,
                total_applications,
                total_selected,
                total_joined,
                total_companies,
                average_salary_lpa,
                highest_salary_lpa
            )
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                reportName,
                generatedByUserId || null,
                Number(
                    students[0]?.total || 0
                ),
                Number(
                    applications[0]?.total || 0
                ),
                Number(
                    selected[0]?.total || 0
                ),
                Number(
                    joined[0]?.total || 0
                ),
                Number(
                    companies[0]?.total || 0
                ),
                salary[0]?.average_salary || null,
                salary[0]?.highest_salary || null
            ]
        );

    return findById(result.insertId);
}

async function findById(id) {
    const pool=getPool();

    const [rows] =
        await pool.execute(
            `SELECT *
             FROM placement_report_snapshots
             WHERE id=?
             LIMIT 1`,
            [id]
        );

    return rows[0] || null;
}

async function list() {
    const pool=getPool();

    const [rows] =
        await pool.execute(
            `SELECT *
             FROM placement_report_snapshots
             ORDER BY generated_at DESC`
        );

    return rows;
}

module.exports={
    generateSnapshot,
    findById,
    list
};
