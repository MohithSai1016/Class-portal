require("dotenv").config();

const {
    execute
} = require("./placementNotificationJob");

const intervalMs =
    Number(
        process.env.PLACEMENT_WORKER_INTERVAL_MS ||
        15 * 60 * 1000
    );

execute();

setInterval(
    execute,
    intervalMs
);

console.log(
    `Placement notification worker started. Interval: ${intervalMs} ms`
);
