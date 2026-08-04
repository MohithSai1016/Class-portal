const mysql = require("mysql2/promise");
require("dotenv").config();

let pool = null;

async function initializeDatabase() {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,

            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,

            namedPlaceholders: true
        });

        const connection = await pool.getConnection();

        console.log("==================================");
        console.log(" MySQL Connected Successfully");
        console.log("==================================");

        connection.release();

    } catch (error) {

        console.error("Database Connection Failed");
        console.error(error.message);

        process.exit(1);

    }
}

function getPool() {

    if (!pool) {

        throw new Error("Database not initialized.");

    }

    return pool;
}

module.exports = {

    initializeDatabase,

    getPool

};