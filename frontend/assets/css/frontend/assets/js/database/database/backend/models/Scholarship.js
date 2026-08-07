const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(

        "SELECT * FROM scholarships"

    );

    return rows;

}

module.exports = {

    findAll

};