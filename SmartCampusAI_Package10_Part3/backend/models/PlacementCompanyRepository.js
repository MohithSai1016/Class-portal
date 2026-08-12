const { getPool } = require("../config/db");

async function list() {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM placement_companies
         ORDER BY company_name`
    );

    return rows;
}

async function findById(id) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM placement_companies
         WHERE id=?
         LIMIT 1`,
        [id]
    );

    return rows[0] || null;
}

async function create(data) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO placement_companies
        (
            company_name,
            industry,
            website_url,
            description,
            contact_email,
            contact_phone
        )
        VALUES (?,?,?,?,?,?)`,
        [
            data.companyName,
            data.industry || null,
            data.websiteUrl || null,
            data.description || null,
            data.contactEmail || null,
            data.contactPhone || null
        ]
    );

    return result.insertId;
}

module.exports = {
    list,
    findById,
    create
};
