const { getPool } = require("../config/db");

async function getInstallments(studentFeeId) {
    const pool = getPool();
    const [rows] = await pool.execute(
        `SELECT *
         FROM fee_installment_plans
         WHERE student_fee_id = ?
         ORDER BY installment_number`,
        [studentFeeId]
    );
    return rows;
}

async function createInstallment(data) {
    const pool = getPool();
    const [result] = await pool.execute(
        `INSERT INTO fee_installment_plans
         (student_fee_id, installment_number, due_date, amount)
         VALUES (?, ?, ?, ?)`,
        [
            data.studentFeeId,
            data.installmentNumber,
            data.dueDate,
            data.amount
        ]
    );
    return result.insertId;
}

module.exports = {
    getInstallments,
    createInstallment
};
