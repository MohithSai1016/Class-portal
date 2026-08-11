const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO certificates
        (
            student_user_id,
            certificate_type,
            title,
            description,
            issuing_organization,
            issue_date,
            certificate_number,
            file_path,
            verification_code,
            status
        )
        VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [
            data.studentUserId,
            data.certificateType,
            data.title,
            data.description || null,
            data.issuingOrganization,
            data.issueDate,
            data.certificateNumber || null,
            data.filePath || null,
            data.verificationCode || null,
            data.status || "Issued"
        ]
    );

    return result.insertId;
}

async function findById(id) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM certificates
         WHERE id = ?
         LIMIT 1`,
        [id]
    );

    return rows[0] || null;
}

async function findByStudent(studentUserId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM certificates
         WHERE student_user_id = ?
         ORDER BY issue_date DESC, created_at DESC`,
        [studentUserId]
    );

    return rows;
}

async function findAll(filters = {}) {
    const pool = getPool();

    const conditions = [];
    const params = [];

    if (filters.studentUserId) {
        conditions.push("student_user_id = ?");
        params.push(filters.studentUserId);
    }

    if (filters.status) {
        conditions.push("status = ?");
        params.push(filters.status);
    }

    if (filters.type) {
        conditions.push("certificate_type = ?");
        params.push(filters.type);
    }

    const where =
        conditions.length
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    const [rows] = await pool.execute(
        `SELECT *
         FROM certificates
         ${where}
         ORDER BY issue_date DESC, created_at DESC`,
        params
    );

    return rows;
}

async function updateStatus(id, status) {
    const pool = getPool();

    const [result] = await pool.execute(
        `UPDATE certificates
         SET status = ?
         WHERE id = ?`,
        [status, id]
    );

    return result.affectedRows > 0;
}

async function findByVerificationCode(code) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM certificates
         WHERE verification_code = ?
         LIMIT 1`,
        [code]
    );

    return rows[0] || null;
}

module.exports = {
    create,
    findById,
    findByStudent,
    findAll,
    updateStatus,
    findByVerificationCode
};
