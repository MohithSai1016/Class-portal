const { getPool } = require("../config/db");

async function search(filters = {}) {
    const pool = getPool();

    const conditions = [];
    const params = [];

    if (filters.type) {
        conditions.push("c.certificate_type = ?");
        params.push(filters.type);
    }

    if (filters.status) {
        conditions.push("c.status = ?");
        params.push(filters.status);
    }

    if (filters.studentUserId) {
        conditions.push("c.student_user_id = ?");
        params.push(filters.studentUserId);
    }

    if (filters.search) {
        conditions.push(`(
            c.title LIKE ?
            OR c.certificate_number LIKE ?
            OR c.verification_code LIKE ?
            OR c.issuing_organization LIKE ?
        )`);

        const value = `%${filters.search}%`;
        params.push(value, value, value, value);
    }

    const where =
        conditions.length
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    const [rows] = await pool.execute(
        `SELECT
            c.id,
            c.student_user_id,
            c.certificate_type,
            c.title,
            c.description,
            c.issuing_organization,
            c.issue_date,
            c.certificate_number,
            c.file_path,
            c.verification_code,
            c.status,
            c.created_at
         FROM certificates c
         ${where}
         ORDER BY c.issue_date DESC, c.created_at DESC`,
        params
    );

    return rows;
}

async function countByType() {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            certificate_type,
            COUNT(*) AS count
         FROM certificates
         GROUP BY certificate_type
         ORDER BY count DESC`
    );

    return rows;
}

module.exports = {
    search,
    countByType
};
