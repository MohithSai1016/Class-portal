const { getPool } = require("../config/db");

async function findByUsername(username) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT * FROM users WHERE username = ? LIMIT 1`,
        [username]
    );

    return rows[0];
}

async function create(user) {
    const pool = getPool();

    const [result] = await pool.execute(
        `INSERT INTO users
        (
            username,
            password,
            full_name,
            email,
            role,
            department_id
        )
        VALUES (?,?,?,?,?,?)`,
        [
            user.username,
            user.password,
            user.full_name,
            user.email,
            user.role,
            user.department_id
        ]
    );

    return result.insertId;
}

module.exports = {
    findByUsername,
    create
};