const { getPool } = require("../config/db");

async function findOrderByGatewayId(gatewayOrderId) {
    const pool = getPool();
    const [rows] = await pool.execute(
        `SELECT * FROM payment_orders WHERE gateway_order_id = ? LIMIT 1`,
        [gatewayOrderId]
    );
    return rows[0] || null;
}

async function markOrderPaid(orderId) {
    const pool = getPool();
    await pool.execute(
        `UPDATE payment_orders SET status='Paid' WHERE id=?`,
        [orderId]
    );
}

async function createTransaction(connection, studentFeeId, reference, amount, method) {
    const [result] = await connection.execute(
        `INSERT INTO fee_transactions
        (student_fee_id, transaction_reference, payment_method, amount, transaction_date, status)
        VALUES (?, ?, ?, ?, NOW(), 'Success')`,
        [studentFeeId, reference, method, amount]
    );
    return result.insertId;
}

async function updateFeeLedger(connection, studentFeeId, amount) {
    await connection.execute(
        `UPDATE student_fees
         SET paid_amount = paid_amount + ?,
             due_amount = GREATEST(total_fee - (paid_amount + ?), 0),
             payment_status =
                CASE
                    WHEN paid_amount + ? >= total_fee THEN 'Paid'
                    WHEN paid_amount + ? > 0 THEN 'Partial'
                    ELSE 'Pending'
                END
         WHERE id = ?`,
        [amount, amount, amount, amount, studentFeeId]
    );
}

async function saveReceipt(connection, transactionId) {
    const receiptNumber =
        `SCA-${new Date().getFullYear()}-${transactionId}-${Date.now()}`;

    await connection.execute(
        `INSERT INTO fee_receipts
        (fee_transaction_id, receipt_number)
        VALUES (?, ?)`,
        [transactionId, receiptNumber]
    );

    return receiptNumber;
}

module.exports = {
    findOrderByGatewayId,
    markOrderPaid,
    createTransaction,
    updateFeeLedger,
    saveReceipt
};
