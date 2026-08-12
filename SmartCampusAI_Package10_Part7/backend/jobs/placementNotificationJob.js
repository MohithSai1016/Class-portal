const worker =
    require("../services/placementNotificationWorker");

async function execute() {
    try {
        const count =
            await worker.run();

        console.log(
            `[placement-worker] processed ${count} notifications`
        );
    } catch(error) {
        console.error(
            "[placement-worker] failed:",
            error.message
        );
    }
}

module.exports = {
    execute
};
