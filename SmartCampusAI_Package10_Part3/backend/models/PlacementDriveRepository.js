const { getPool } = require("../config/db");

async function listOpen(filters = {}) {
    const pool = getPool();

    const conditions = [
        "d.drive_status='Open'"
    ];
    const params = [];

    if (filters.search) {
        conditions.push(
            "(d.drive_title LIKE ? OR " +
            "d.role_title LIKE ? OR " +
            "c.company_name LIKE ?)"
        );

        const value = `%${filters.search}%`;
        params.push(value, value, value);
    }

    const [rows] = await pool.execute(
        `SELECT
            d.*,
            c.company_name,
            c.industry,
            c.website_url
         FROM placement_drives d
         INNER JOIN placement_companies c
             ON c.id=d.company_id
         WHERE ${conditions.join(" AND ")}
         ORDER BY d.application_deadline ASC`,
        params
    );

    return rows;
}

async function findById(id) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            d.*,
            c.company_name,
            c.industry,
            c.website_url
         FROM placement_drives d
         INNER JOIN placement_companies c
             ON c.id=d.company_id
         WHERE d.id=?
         LIMIT 1`,
        [id]
    );

    return rows[0] || null;
}

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO placement_drives
        (
            company_id,
            drive_title,
            role_title,
            description,
            eligibility_min_cgpa,
            eligibility_departments,
            eligibility_backlogs,
            package_lpa,
            job_location,
            drive_date,
            application_deadline,
            drive_status
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            data.companyId,
            data.driveTitle,
            data.roleTitle,
            data.description || null,
            data.eligibilityMinCgpa || null,
            data.eligibilityDepartments || null,
            data.eligibilityBacklogs ?? 0,
            data.packageLpa || null,
            data.jobLocation || null,
            data.driveDate,
            data.applicationDeadline,
            data.driveStatus || "Draft"
        ]
    );

    return result.insertId;
}

async function hasApplied(
    driveId,
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT id
         FROM placement_drive_applications
         WHERE drive_id=?
           AND student_user_id=?
         LIMIT 1`,
        [driveId, studentUserId]
    );

    return rows.length > 0;
}

async function apply(
    driveId,
    studentUserId
) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO placement_drive_applications
        (
            drive_id,
            student_user_id,
            application_status
        )
        VALUES (?,?,?)`,
        [
            driveId,
            studentUserId,
            "Applied"
        ]
    );

    return result.insertId;
}

async function myApplications(
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            a.*,
            d.drive_title,
            d.role_title,
            d.drive_date,
            d.application_deadline,
            d.package_lpa,
            d.job_location,
            c.company_name
         FROM placement_drive_applications a
         INNER JOIN placement_drives d
             ON d.id=a.drive_id
         INNER JOIN placement_companies c
             ON c.id=d.company_id
         WHERE a.student_user_id=?
         ORDER BY a.applied_at DESC`,
        [studentUserId]
    );

    return rows;
}

module.exports = {
    listOpen,
    findById,
    create,
    hasApplied,
    apply,
    myApplications
};
