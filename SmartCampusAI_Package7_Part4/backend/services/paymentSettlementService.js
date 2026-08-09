const { getPool } = require("../config/db");
const repository = require("../models/PaymentRepository");

async function settlePayment({
    gatewayOrderId,
    paymentReference,
    amount,
    paymentMethod = "UPI"
}) {
    const pool = getPool();
    const order = await repository.findOrderByGatewayId(gatewayOrderId);

    if (!order) {
        throw new Error("Payment order not found");
    }

    if (order.status === "Paid") {
        return { duplicate: true };
    }

    if (Number(order.amount) !== Number(amount)) {
        throw new Error("Payment amount does not match order");
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const transactionId = await repository.createTransaction(
            connection,
            order.student_fee_id,
            paymentReference,
            amount,
            paymentMethod
        );

        await repository.updateFeeLedger(
            connection,
            order.student_fee_id,
            amount
        );

        const receiptNumber =
            await repository.saveReceipt(
                connection,
                transactionId
            );

        await connection.execute(
            `UPDATE payment_orders SET status='Paid' WHERE id=?`,
            [order.id]
        );

        await connection.commit();

        return {
            duplicate: false,
            transactionId,
            receiptNumber
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { settlePayment };
