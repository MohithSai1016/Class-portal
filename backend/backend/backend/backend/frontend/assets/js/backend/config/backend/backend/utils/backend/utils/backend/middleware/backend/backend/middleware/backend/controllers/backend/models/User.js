const { getPool } = require("../config/db");

async function findByUsername(username) {

    const pool = getPool();

    const [rows] = await pool.execute(

        `
        SELECT *
        FROM users
        WHERE username = ?
        LIMIT 1
        `,
        [username]

    );

    return rows[0];

}

module.exports = {

    findByUsername

};