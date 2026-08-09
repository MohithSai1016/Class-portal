const { getPool } = require("../config/db");

async function summary() {
    const pool = getPool();
    const [rows] = await pool.execute(`
        SELECT
            COALESCE(SUM(total_fee), 0) AS total_assigned,
            COALESCE(SUM(paid_amount), 0) AS total_collected,
            COALESCE(SUM(due_amount), 0) AS total_due,
            SUM(payment_status = 'Paid') AS paid_students,
            SUM(payment_status = 'Partial') AS partial_students,
            SUM(payment_status = 'Pending') AS pending_students
        FROM student_fees
    `);
    return rows[0];
}

async function monthlyCollections() {
    const pool = getPool();
    const [rows] = await pool.execute(`
        SELECT DATE_FORMAT(transaction_date, '%Y-%m') AS month,
               COALESCE(SUM(amount), 0) AS collected
        FROM fee_transactions
        WHERE status = 'Success'
        GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
        ORDER BY month DESC
        LIMIT 12
    `);
    return rows.reverse();
}

async function overdue() {
    const pool = getPool();
    const [rows] = await pool.execute(`
        SELECT id AS student_fee_id, student_id, due_amount,
               due_date, payment_status
        FROM student_fees
        WHERE due_amount > 0 AND due_date < CURDATE()
        ORDER BY due_date ASC
    `);
    return rows;
}

module.exports = { summary, monthlyCollections, overdue };
