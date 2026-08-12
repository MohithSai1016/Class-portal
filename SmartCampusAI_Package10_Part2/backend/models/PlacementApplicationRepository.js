const { getPool } = require("../config/db");

async function listByStudent(studentUserId, filters = {}) {
    const pool = getPool();
    const conditions = ["student_user_id = ?"];
    const params = [studentUserId];

    if (filters.status) {
        conditions.push("application_status = ?");
        params.push(filters.status);
    }

    if (filters.search) {
        conditions.push(
            "(company_name LIKE ? OR role_title LIKE ?)"
        );
        const value = `%${filters.search}%`;
        params.push(value, value);
    }

    const [rows] = await pool.execute(
        `SELECT *
         FROM placement_applications
         WHERE ${conditions.join(" AND ")}
         ORDER BY application_date DESC, id DESC`,
        params
    );

    return rows;
}

async function findById(id, studentUserId = null) {
    const pool = getPool();
    const conditions = ["id = ?"];
    const params = [id];

    if (studentUserId !== null) {
        conditions.push("student_user_id = ?");
        params.push(studentUserId);
    }

    const [rows] = await pool.execute(
        `SELECT *
         FROM placement_applications
         WHERE ${conditions.join(" AND ")}
         LIMIT 1`,
        params
    );

    return rows[0] || null;
}

async function create(studentUserId, data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO placement_applications
        (
            student_user_id,
            company_name,
            role_title,
            application_date,
            application_status,
            job_url,
            notes
        )
        VALUES (?,?,?,?,?,?,?)`,
        [
            studentUserId,
            data.companyName,
            data.roleTitle,
            data.applicationDate,
            data.applicationStatus || "Saved",
            data.jobUrl || null,
            data.notes || null
        ]
    );

    return result.insertId;
}

async function update(id, studentUserId, data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `UPDATE placement_applications
         SET
            company_name=?,
            role_title=?,
            application_date=?,
            application_status=?,
            job_url=?,
            notes=?
         WHERE id=? AND student_user_id=?`,
        [
            data.companyName,
            data.roleTitle,
            data.applicationDate,
            data.applicationStatus,
            data.jobUrl || null,
            data.notes || null,
            id,
            studentUserId
        ]
    );

    return result.affectedRows > 0;
}

async function remove(id, studentUserId) {
    const pool = getPool();

    const [result] = await pool.execute(
        `DELETE FROM placement_applications
         WHERE id=? AND student_user_id=?`,
        [id, studentUserId]
    );

    return result.affectedRows > 0;
}

async function summary(studentUserId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            COUNT(*) AS total,
            SUM(application_status='Applied') AS applied,
            SUM(application_status='Shortlisted') AS shortlisted,
            SUM(application_status='Interview') AS interview,
            SUM(application_status='Selected') AS selected,
            SUM(application_status='Rejected') AS rejected
         FROM placement_applications
         WHERE student_user_id=?`,
        [studentUserId]
    );

    return rows[0];
}

module.exports = {
    listByStudent,
    findById,
    create,
    update,
    remove,
    summary
};
