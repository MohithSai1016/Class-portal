const { getPool } = require("../config/db");

async function findDueItems() {
    const pool = getPool();
    const [rows] = await pool.execute(`
        SELECT sf.id AS student_fee_id, sf.student_id,
               sf.due_amount, sf.due_date,
               CASE WHEN sf.due_date < CURDATE()
                    THEN 'Overdue' ELSE 'DueSoon' END AS reminder_type
        FROM student_fees sf
        WHERE sf.due_amount > 0
          AND sf.due_date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
    `);
    return rows;
}

async function createReminder(data) {
    const pool = getPool();
    const [result] = await pool.execute(
        `INSERT INTO fee_reminders
         (student_fee_id, reminder_type, scheduled_for)
         VALUES (?, ?, CURDATE())`,
        [data.studentFeeId, data.reminderType]
    );
    return result.insertId;
}

async function logNotification(data) {
    const pool = getPool();
    await pool.execute(
        `INSERT INTO finance_notification_log
         (student_fee_id, notification_type, channel, status, message, sent_at)
         VALUES (?, ?, 'InApp', 'Sent', ?, NOW())`,
        [data.studentFeeId, data.reminderType, data.message]
    );
}

module.exports = { findDueItems, createReminder, logNotification };
