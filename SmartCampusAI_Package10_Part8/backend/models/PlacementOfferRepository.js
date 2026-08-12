const { getPool } =
    require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] =
        await pool.execute(
            `INSERT INTO placement_offers
            (
                drive_application_id,
                offer_title,
                offer_letter_file_name,
                offer_letter_file_path,
                offer_date,
                joining_date,
                salary_lpa,
                offer_status,
                joining_status,
                notes
            )
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.driveApplicationId,
                data.offerTitle || null,
                data.offerLetterFileName || null,
                data.offerLetterFilePath || null,
                data.offerDate || null,
                data.joiningDate || null,
                data.salaryLpa || null,
                data.offerStatus || "Draft",
                data.joiningStatus || "Pending",
                data.notes || null
            ]
        );

    return findById(result.insertId);
}

async function findById(id) {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                o.*,
                a.student_user_id,
                a.drive_id,
                d.role_title,
                c.company_name
             FROM placement_offers o
             INNER JOIN placement_drive_applications a
                ON a.id=o.drive_application_id
             INNER JOIN placement_drives d
                ON d.id=a.drive_id
             INNER JOIN placement_companies c
                ON c.id=d.company_id
             WHERE o.id=?
             LIMIT 1`,
            [id]
        );

    return rows[0] || null;
}

async function listByStudent(studentUserId) {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                o.*,
                a.student_user_id,
                d.role_title,
                c.company_name
             FROM placement_offers o
             INNER JOIN placement_drive_applications a
                ON a.id=o.drive_application_id
             INNER JOIN placement_drives d
                ON d.id=a.drive_id
             INNER JOIN placement_companies c
                ON c.id=d.company_id
             WHERE a.student_user_id=?
             ORDER BY
                COALESCE(o.joining_date,o.offer_date)
                DESC,
                o.id DESC`,
            [studentUserId]
        );

    return rows;
}

async function update(id, data) {
    const pool = getPool();

    await pool.execute(
        `UPDATE placement_offers
         SET offer_title=?,
             offer_date=?,
             joining_date=?,
             salary_lpa=?,
             offer_status=?,
             joining_status=?,
             notes=?
         WHERE id=?`,
        [
            data.offerTitle || null,
            data.offerDate || null,
            data.joiningDate || null,
            data.salaryLpa || null,
            data.offerStatus,
            data.joiningStatus,
            data.notes || null,
            id
        ]
    );

    return findById(id);
}

async function listAll() {
    const pool = getPool();

    const [rows] =
        await pool.execute(
            `SELECT
                o.*,
                a.student_user_id,
                d.role_title,
                c.company_name
             FROM placement_offers o
             INNER JOIN placement_drive_applications a
                ON a.id=o.drive_application_id
             INNER JOIN placement_drives d
                ON d.id=a.drive_id
             INNER JOIN placement_companies c
                ON c.id=d.company_id
             ORDER BY o.created_at DESC`
        );

    return rows;
}

module.exports = {
    create,
    findById,
    listByStudent,
    update,
    listAll
};
