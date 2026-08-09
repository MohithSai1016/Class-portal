const { getPool } = require("../config/db");

async function findByStudentId(studentId) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT
            r.receipt_number,
            r.issued_at,
            ft.transaction_reference,
            ft.amount,
            ft.payment_method
         FROM fee_receipts r
         JOIN fee_transactions ft
           ON ft.id = r.fee_transaction_id
         JOIN student_fees sf
           ON sf.id = ft.student_fee_id
         WHERE sf.student_id = ?
         ORDER BY r.issued_at DESC`,
        [studentId]
    );

    return rows;
}

module.exports = { findByStudentId };
