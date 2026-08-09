const repository = require("../models/FeeReminderRepository");

async function generateReminders() {
    const items = await repository.findDueItems();
    let created = 0;

    for (const item of items) {
        const message = item.reminder_type === "Overdue"
            ? `Your fee balance of ₹${Number(item.due_amount).toFixed(2)} is overdue.`
            : `Your fee balance of ₹${Number(item.due_amount).toFixed(2)} is due by ${item.due_date}.`;

        await repository.createReminder({
            studentFeeId: item.student_fee_id,
            reminderType: item.reminder_type
        });

        await repository.logNotification({
            studentFeeId: item.student_fee_id,
            reminderType: item.reminder_type,
            message
        });

        created++;
    }

    return { created };
}

module.exports = { generateReminders };
