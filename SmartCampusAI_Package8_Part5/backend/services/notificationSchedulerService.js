const { getPool } = require("../config/db");

const dispatcher =
    require("./notificationDispatcherService");

let running = false;

async function processPending() {
    if (running) return { processed: 0 };

    running = true;

    try {
        const pool = getPool();

        const [rows] = await pool.execute(`
            SELECT n.id
            FROM notifications n
            LEFT JOIN notification_delivery_log d
              ON d.notification_id = n.id
            WHERE d.id IS NULL
            ORDER BY n.created_at ASC
            LIMIT 100
        `);

        let processed = 0;

        for (const row of rows) {
            await dispatcher.dispatch(row.id);
            processed++;
        }

        return { processed };
    } finally {
        running = false;
    }
}

function start(intervalMs = 30000) {
    const timer = setInterval(() => {
        processPending().catch(error => {
            console.error(
                "[NotificationScheduler]",
                error.message
            );
        });
    }, intervalMs);

    return timer;
}

module.exports = {
    processPending,
    start
};
