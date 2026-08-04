const { getPool } = require("../config/db");

async function findAll() {

    const pool = getPool();

    const [rows] = await pool.execute(
        `
        SELECT *
        FROM departments
        ORDER BY name
        `
    );

    return rows;

}

async function create(name) {

    const pool = getPool();

    const [result] = await pool.execute(
        `
        INSERT INTO departments(name)
        VALUES(?)
        `,
        [name]
    );

    return result.insertId;

}

async function update(id, name) {

    const pool = getPool();

    await pool.execute(
        `
        UPDATE departments
        SET name=?
        WHERE id=?
        `,
        [name, id]
    );

}

async function remove(id) {

    const pool = getPool();

    await pool.execute(
        `
        DELETE FROM departments
        WHERE id=?
        `,
        [id]
    );

}

module.exports = {

    findAll,

    create,

    update,

    remove

};